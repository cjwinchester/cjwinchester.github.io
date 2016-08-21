from bs4 import BeautifulSoup
import json

with open("travel_data.json", "rb") as data, \
        open("states.svg", "rb") as geo:
    travel_data = json.loads(data.read())
    svg = geo.read()

for person in travel_data:
    soup = BeautifulSoup(svg, "html.parser")
    paths = soup.find_all('path')
    for p in paths:
        if p['id'] in travel_data[person]['lived']:
            p['style'] = "fill:#ffff99"
        if p['id'] in travel_data[person]['visited']:
            p['style'] = "fill:#386cb0"
    with open(person + '_visit.svg', 'wb') as out:
        out.write(soup.prettify())