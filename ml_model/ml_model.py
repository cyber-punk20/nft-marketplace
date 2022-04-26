# Necessary libraries for Machine Learning Model

import lightgbm
import numpy as np
from sklearn.datasets import make_regression
import numpy as np
from lightgbm import LGBMRegressor
from sklearn.model_selection import cross_val_score
from sklearn.model_selection import RepeatedKFold

# Function to create target for the features model
def create_target(features):
  # Feature coeficients described in the pricing model
  feature_coefs = np.array([1.05,1,1,1.25,1.2,1,1.15,0.87,0.035,0.063,1.15,1.01,1.2,1.3])
  prices = np.zeros(len(features))   
  for i in range(len(features)):
    feats = feature_coefs[features[i,:14]==1]
    k = np.prod(feats)
    dataset_size = np.sum(features[i,14:])
    data_p = features[i,14:]/dataset_size
    prices[i] = k*dataset_size/10 - np.sum(np.log(data_p+1e-4)*data_p)*np.log(dataset_size+1e-4)
  # Synthetic Price for the generated data
  return prices
  
# Function to convert categorical variables to onehot vectors
def convert_to_onehot(ins_str,ins_list):
  a = np.zeros(len(ins_list))
  if ins_str in ins_list:
    a[ins_list.index(ins_str)] = 1
    return a
  else:
    print("The input is not in the list.")
    
# Function to train ML model with more samples takes the number of samples for synthetic training and the saving location of the trained model.
# Call th function like 
# train_predictor(10000,"./data/lgbr_model")

def train_predictor(length,save_loc='lgbr_model.txt'):
  # Creating samples
  n_f = 24
  features = np.zeros((length,n_f))
  citys = np.random.randint(0,4,size=length).reshape(-1,1)
  backs = np.random.randint(0,3,size=length).reshape(-1,1)+4
  tasks = np.random.randint(0,3,size=length).reshape(-1,1)+7
  contents = np.random.randint(0,4,size=length).reshape(-1,1)+10
  class_dists = np.random.randint(0,1000,size=(length,10))
  for i in range(length):
    features[i,[citys[i],backs[i],tasks[i],contents[i]]] = 1
    features[i,14:] = class_dists[i,:]
  
  # Creating targets using the hypothetical pricing formula
  y = create_target(features)
  
  # Fitting a machine learning model
  model = LGBMRegressor()
  model.fit(features, y)
  
  # Testing the performance of the model
  cv = RepeatedKFold(n_splits=10, n_repeats=3, random_state=1)
  n_scores = cross_val_score(model, features, y, scoring='neg_mean_absolute_error', cv=cv, n_jobs=-1, error_score='raise')
  print('Mean Absolute Error: %.3f (%.3f)' % (-np.mean(n_scores), np.std(n_scores)))
  
  # Saving the model weights
  model.booster_.save_model(save_loc)

  
  
# function to predict price based on the meta data. The model takes the input parameters as a dictionary, which can be given as below:
# input_params = {"city":"San Francisco","back":"Suburban","task":"Segmentation","content":"Cars","class_dist":[10,20,30,400,500,600,700,800,90,10]}
# if it is a test then the function will print the actual price and the prediction 

# The function should be called as:
# predict_price(input_params,False,"./data/lgbr_model.txt")

def predict_price(input_params,test=False,file_loc='lgbr_model.txt'):

  # List of the cities background etc, change if necessary, 
  # If it is changed the ML model should be trained again
  city_list = ["Austin","San Francisco","New York","Miami"]
  back_list = ["Rural", "Urban", "Suburban"]
  task_list = ["Segmentation", "Classification", "Object Detection"] 
  content_list = ["Weather", "Cars", "Pedestrian", "Background"]
  
  # Creates one-hotvectors  
  city_arr = convert_to_onehot(input_params["city"],city_list).reshape(1,-1)
  back_arr = convert_to_onehot(input_params["back"],back_list).reshape(1,-1)
  task_arr = convert_to_onehot(input_params["task"],task_list).reshape(1,-1)
  content_arr = convert_to_onehot(input_params["content"],content_list).reshape(1,-1)
  class_arr = np.array(input_params["class_dist"]).reshape(1,-1)
  
  # Creates feature vector for the data
  inp_features = np.concatenate((city_arr,back_arr,task_arr,content_arr,class_arr),1)
  
  # Loads model from the saved location
  model = lightgbm.Booster(model_file=file_loc)
  prediction = model.predict(inp_features)
  
  # If test print the Real and the Prediction targets
  if test:
    real_target = create_target(inp_features)
    print("Real Target: " +str(real_target[0])+" Prediction: "+str(prediction[0]))
    return prediction[0]
  else:
    return prediction[0]
