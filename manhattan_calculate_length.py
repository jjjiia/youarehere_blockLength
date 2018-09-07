##make dictionaries for all columns
import csv
import json
import collections
import operator
from pprint import pprint
 
filePath = 'cincinatti.geojson'
json_data=open(filePath)
data = json.load(json_data)
#pprint(data)	

#calculate distance between 2 points or 2 coordinate pairs	
def calculateDistance(lat1,lng1,lat2,lng2):
	from math import sin, cos, sqrt, atan2, radians
	R = 6373.0

	lat1 = radians(lat1)
	lng1 = radians(lng1)
	lat2 = radians(lat2)
	lng2 = radians(lng2)

	dlng = lng2 - lng1
	dlat = lat2 - lat1
	a = (sin(dlat/2))**2 + cos(lat1) * cos(lat2) * (sin(dlng/2))**2
	c = 2 * atan2(sqrt(a), sqrt(1-a))
	distance = R * c

	return distance


outputfile = open("streetDistances_cincinatti.csv", "w")
csvwriter = csv.writer(outputfile)
csvwriter.writerow(["street","lat1","lng1","lat2","lng2","distance"])


#make a list of coordinate pairs, 2 points each
for item in data["features"]:
	street = item["properties"]["Full_Name"]
	#pprint(street)
	coordinatesArray = item["geometry"]["coordinates"]
	for item in range(len(coordinatesArray)-1):
		lat1 = coordinatesArray[item][1]
		lng1 = coordinatesArray[item][0]
		lat2 = coordinatesArray[item+1][1]
		lng2 = coordinatesArray[item+1][0]
		distance = calculateDistance(lat1,lng1,lat2,lng2)
		outputRow = [street,lat1,lng1,lat2,lng2, distance]
		#print outputRow
		csvwriter.writerow(outputRow)
