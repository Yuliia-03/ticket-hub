import schemas

class GetUrl():

    def __init__(self, serchParam: schemas.SearchParams) -> None:
        self.departure = serchParam.departure
        self.arrival = serchParam.arrival

        #self.day = serchParam.date.day
        #self.month = '%B'.format(serchParam.date.month)
        #self.year = serchParam.date.year
        self.date = '{:%Y-%m-%d}'.format(serchParam.date)

        self.adults = serchParam.adults
        self.students = serchParam.students
        self.youths12_17 = serchParam.youths12_17
        self.children2_11 = serchParam.children2_11
        
        self.toddlers_on_lapunder = serchParam.toddlers_on_lapunder
        self.toddlers_in_own_seatunder = serchParam.toddlers_in_own_seatunder

        self.cabin_class = serchParam.cabin_class


    def children(self) -> str:
        return self.toddlers_in_own_seatunder * str('-1S') + self.toddlers_on_lapunder * str('-1L') + self.children2_11 * str('-11') + self.youths12_17 * str('-15')

    
    def url(self) -> str:

        self.url = f'https://www.kayak.co.uk/flights/{self.departure}-{self.arrival}/{self.date}/{self.cabin_class}/{self.adults}adults/{self.students}students/{self.children()}?sort=price_a'
        return self.url


    def get_IATA(self):
        pass
