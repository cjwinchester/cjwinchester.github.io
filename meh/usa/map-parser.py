from bs4 import BeautifulSoup
import json

with open('travel_data.json', 'r') as data, \
        open('states.svg', 'r') as geo:

    travel_data = json.loads(data.read())
    svg = geo.read()

    for person in travel_data:
        soup = BeautifulSoup(svg, 'html.parser')
        paths = soup.find_all('path')
        for p in paths:
            if p['id'] in travel_data[person]['lived']:
                p['style'] = 'fill:#ffff99'
            elif p['id'] in travel_data[person]['visited']:
                p['style'] = 'fill:#386cb0'
        with open(person + '_visit.svg', 'w') as out:
            out.write(soup.prettify())
