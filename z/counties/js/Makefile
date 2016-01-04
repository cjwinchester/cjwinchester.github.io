counties.zip:
	curl -o counties.zip 'http://www2.census.gov/geo/tiger/GENZ2010/gz_2010_us_050_00_20m.zip'

gz_2010_us_050_00_20m.shp: counties.zip
	unzip counties.zip
	touch gz_2010_us_050_00_20m.shp

counties.json: gz_2010_us_050_00_20m.shp
	topojson -o counties.json -p name=NAME,state=STATE,county=COUNTY -- counties=gz_2010_us_050_00_20m.shp
	
clean:
	rm -f *.zip *.shp *.shx *.xml *.prj *.dbf
