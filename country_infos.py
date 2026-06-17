import requests
import pandas as pd
import plotly.express as px

def get_and_prepare_data():
    # 1. the source
    url = "https://raw.githubusercontent.com/mledoze/countries/master/countries.json"
    print("fetching the data from API..")
    try:
        headers = {'User-Agent': 'Mozilla/5.0'}
        response = requests.get(url, headers=headers)
    except requests.exceptions.RequestException as e:
        print(f"Connection Error: {e}")
        return None

    if response.status_code != 200:    # this is to check if data is fetching
        print("Error: could not fetch data.")
        return None
    raw_data = response.json()  # we get data in standard format of json form API

    # 2. preparing the data
    # in the mess of all the data we have to pick what we need
    clean_data = []
    for country in raw_data:
        try:
            code = country.get('cca3') # cca3 is standard code of countries of 3 letters which is 
                                       # imp for ploting on map, also known as ISO 3-letter code
            name = country.get('name', {}).get('common') # data is actually stored in nested dictionary in rest country api, we need name of country if not we return empty dictionary than we are asking for common name of countries like India is common name and republic of India might be the formal name.
            area = country.get('area', 0)
            region = country.get('region', 'Unknown')
            if code and name:
                clean_data.append({
                    "ISO_code" : code,
                    "Country"  : name,
                    "Area" : area,
                    "Region" : region
                })
        except Exception as e:
            # skip any weird entry that causes errors
            continue
    return pd.DataFrame(clean_data)
# main execution
df = get_and_prepare_data()
if df is not None:
    print(f"successfully prepared data for {len(df)} countries")
    #3. plotting
    fig = px.choropleth(
        df,
        locations = "ISO_code",
        color = "Area",
        hover_name = "Country",
        color_continuous_scale = px.colors.sequential.Plasma,
        title = "GLOBAL Area BY COUNTRY",
        projection = "natural earth"
    )
    fig.show()