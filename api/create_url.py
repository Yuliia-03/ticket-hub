from api import schemas
from api import models

from sqlalchemy.orm import Session

class GetUrl():

    def __init__(self, serchParam: schemas.SearchParams, db: Session) -> None:
        #self.departure = serchParam.departure
        print("Stage1")
        self.departure = models.get_iata_by_city(db, serchParam.departure)
        print("Stage2")
        #self.arrival = serchParam.arrival
        self.arrival = models.get_iata_by_city(db, serchParam.arrival)
        print("Stage3")

        #self.day = serchParam.date.day
        #self.month = serchParam.date.month
        #self.year = serchParam.date.year
        self.date = '{:%Y-%m-%d}'.format(serchParam.date)

        self.adults = serchParam.adults
        self.students = serchParam.students
        self.youths12_17 = serchParam.youths12_17
        self.children2_11 = serchParam.children2_11
        
        self.toddlers_on_lap = serchParam.toddlers_on_lap
        self.toddlers_in_own_seat = serchParam.toddlers_in_own_seat

        self.cabin_class = serchParam.cabin_class


    def children(self) -> str:
        if self.youths12_17 + self.children2_11 + self.toddlers_on_lap + self.toddlers_in_own_seat != 0:
            return 'children' + self.toddlers_in_own_seat * str('-1S') + self.toddlers_on_lap * str('-1L') + self.children2_11 * str('-11') + self.youths12_17 * str('-15')
        else:
            return ''
    
    def url(self) -> str:



        self.url = f'https://www.kayak.co.uk/flights/{self.departure}-{self.arrival}/{self.date}/{self.cabin_class}/{self.adults}adults/{self.students}students/{self.children()}?sort=bestflight_a'
        print(self.url)
        return self.url


    def get_IATA(self):
        pass
        
