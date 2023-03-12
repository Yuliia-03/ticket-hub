from fastapi import FastAPI
from typing import List
import schemas
from create_url import GetUrl
from get_info import Scraping

app = FastAPI()

@app.post("/flight/search", response_model=List[schemas.FlightsResult])
def form_url(searchParams: schemas.SearchParams):
    get_url = GetUrl(searchParams)
    #get_url.url()
    parsing = Scraping(get_url.url(), searchParams.date)
    parsing.close_cookies()

    return parsing.get_data()

#@app.get("/flight/search/{airport_from}-{airport_to}/{date}", response_model=schemas.FlightsResult)
#def get_():
'''

@app.get("/flight/search/{airpott_from}-{airpott_to}/{date}", response_model=List[schemas.FlightsResult])
def list_of_flights(searchParams: schemas.FlightsResult):
    
    #rooms_found = db_room.room_search(searchParams)
    # словник із отриманими даними
    rooms_found_list = []
    for room in rooms_found:
        rooms_found_list.append({
            "id": room[0],
            "hotel_id": room[1],
            "room_type": room[2],
            "bed_type": room[3],
            "price": room[4],
            "room_number": room[5],
            "hotel_name": room[6]
        })
    return rooms_found_list
'''