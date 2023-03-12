from fastapi import FastAPI
from pydantic import BaseModel

import datetime

class SearchParams(BaseModel):
    
    departure: str
    arrival: str
    date: datetime.date = datetime.date.today()

    adults: int = 1
    students: int = 0

    youths12_17: int = 0
    children2_11: int = 0
    toddlers_on_lapunder: int = 0
    toddlers_in_own_seatunder: int = 0

    cabin_class: str = "economy"

class Changes(BaseModel):
    airport_IATA: str
    airport_name: str

    waiting_time: str

class Route(BaseModel):

    stops: int
    transfers: list[Changes] = []


class FlightsResult(BaseModel):

    date_time_from: datetime.datetime
    date_time_in: datetime.datetime

    price: int

    airport_departure_IATA: str
    airport_departure_name: str
    airport_arrival_IATA: str
    airport_arrival_name: str

    route: str | Route

    duration: str
    cabin_class: str
    company: str

    url: str






