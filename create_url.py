import schemas

class GetUrl():

    def __init__(self, serchParam: schemas.SearchParams) -> None:
        self.departure = "%{}%".format(serchParam.departure)
        self.arrival = "%{}%".format(serchParam.arrival)

        self.day = "%{}%".format(serchParam.date.day)
        self.month = "%{}%".format(serchParam.date.month)
        self.year = "%{}%".format(serchParam.date.year)

        self.adults = "%{}%".format(serchParam.adults)
        self.students = "%{}%".format(serchParam.students)
        self.youths12_17 = "%{}%".format(serchParam.youths12_17)
        self.children2_11 = "%{}%".format(serchParam.children2_11)
        
        self.toddlers_on_lapunder = "%{}%".format(serchParam.toddlers_on_lapunder)
        self.toddlers_in_own_seatunder = "%{}%".format(serchParam.toddlers_in_own_seatunder)

        self.cabin_class = "%{}%".format(serchParam.cabin_class)


    def children(self) -> str:
        return self.toddlers_in_own_seatunder * '-1S' + self.toddlers_on_lapunder * '-1L' + self.children2_11 * '-11' + self.youths12_17 * '-15'

    
    def url(self) -> str:

        self.url = f'https://www.kayak.co.uk/flights/{self.departure}-{self.arrival}/{self.year}-{self.month}-{self.day}/{self.cabin_class}?{self.adults}adults/{self.students}students/{self.children()}?sort=price_a'
        return self.url


    def get_IATA(self):
        pass
