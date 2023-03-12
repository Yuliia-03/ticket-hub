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
