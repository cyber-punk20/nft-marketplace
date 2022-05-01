### **Install**

To use this machine learning model, you should install the packages in the requirements by running:

```
pip install -r requirements.txt
```

# **Dataset Properties:**

In this project we assumed that the dataset properties could be deduced from 5 different properties. These properties are:


*   Location
*   Background
*   Label Type
*   Label Content
*   Number of Images per Label


### *Location:* 

For simplicity, we will assume the data comes from 4 different cities: 

Austin, San Francisco, New York, Miami.

### *Background:* 

It describes the part of the city in which data is collected. We limit the parts of the city to three parts. These parts are: 

Rural, Urban, Suburban.

### *Label Type:* 

The most important information about the pricing of the data is label type. Based on the label for the following task, the pricing changes a lot:

Segmentation, Classification, Object Detection.

### *Label Content:* 

It refers to the content of the dataset. To simplify our model, we limit the content options to:

Weather, Cars, Pedestrian, Background.

### *Number of Images per Label:* 

The user should also enter the number of images in the dataset for each label or project. For example, a basic input would be 
[100,200,300,400,500,600,700,800,900,1000]


These properties can be extended a lot more. However, we will utilize these properties for now.


# **Pricing Parameters:**

The coefficient for the categories can be listed as follows:

**Location:**
* Austin: 1.05
* Miami: 1.25
* San Francisco: 1
* New York: 1

**Background**
* Rural: 1.2
* Urban: 1
* Suburban: 1.15

**Label Type:** 
* Classification: 0.035
* Detection 0.063
* Segmentation: 0.87


**Label Content:** 
* Weather: 1.15
* Cars: 1.01
* Pedestrian: 1.2
* Background: 1.3

The label type prices are obtained from the google cloud labeling service https://cloud.google.com/ai-platform/data-labeling/pricing

**Number of Images per Label**

The price with the price coefficient is stored based on the total number of images. Also, an additional entropy term is introduced to assess the quality of the Data. The logarithm of the dataset size weights the entropy parameter.
Finally, We can give the synthesized pricing formula as:

 **Total Number of Images \* Location \* Background \* Label Type \* Label Content /10 + Entropy(Number of Images) \* Log(Total Number of Images)**
