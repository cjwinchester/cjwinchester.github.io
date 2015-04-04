from bs4 import BeautifulSoup

travel = [{'name':'cody','lived':['TX','WY','SD','NE','CO'],'visited':['OR','WA','ID','MT','ND','MN','UT','NM','OK','KS','IA','MO','MA','TN','FL','VA','KY']},{'name':'laurel','lived':['TX','WY','SD','NE','CO','FL'],'visited':['WA','OR','ID','MN','OK','IA','KS','TN','KY','GA','AL','MO','NM']},{'name':'julian','lived':['TX','WY','SD','NE'],'visited':['MN','OK','IA','CO','KS','NM']},{'name':'lucy','lived':['SD','NE'],'visited':['WY','MN','IA','OK','KS']}]

for person in travel:
    svg = open('states.svg', 'rb').read()
    soup = BeautifulSoup(svg, "html.parser")
    paths = soup.findAll('path')
    for p in paths:
        for l in person['lived']:
            if l == p['id']:
                p['style'] = "fill:#ffff99"
        for v in person['visited']:
            if v == p['id']:
                p['style'] = "fill:#386cb0"
    output = open(person['name'] + '_visit.svg', 'wb')
    output.write(soup.prettify())
    output.flush()
    output.close()