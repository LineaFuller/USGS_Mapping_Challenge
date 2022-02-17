# Leaflet Mapping Challenge
<img width="909" alt="Screen Shot 2022-02-16 at 7 03 20 PM" src="https://user-images.githubusercontent.com/86134771/154396845-095a1cfd-5dab-4ab9-bac8-348c8b4edefd.png">

Welcome to the United States Geological Survey, or USGS for short. The USGS is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment; and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes. As a new hire, you will be helping them out with an exciting new project!

The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. My goal is to create visualizations of their data to allow them to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.

Welcome to the United States Geological Survey, or USGS for short. The USGS is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment; and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes. As a new hire, you will be helping them out with an exciting new project!

## First, I acquired my data set

The USGS provides earthquake data in a number of different formats, updated every 5 minutes. I picked the "All Earthquakes from the Past 7 Days" data set to visualize from the USGS GeoJSON Feed page. I used the URL of this JSON to pull in the data for our visualization.

## Next, I imported & visualized my data

I create a map using Leaflet that plots all of the earthquakes from my data set based on their longitude and latitude. My data markers reflect the magnitude of the earthquake by their size and and depth of the earthquake by color. Earthquakes with higher magnitudes appear larger and earthquakes with greater depth appear darker in color.

