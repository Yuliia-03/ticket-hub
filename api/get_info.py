from selenium import webdriver
#from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service 
#from selenium.webdriver.chrome.options import Options
from time import sleep
#import re
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
#from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
#import requests
from datetime import date, datetime, timedelta


from api import models
from sqlalchemy.orm import Session

class Scraping:


    def __init__(self, url: str, date: date) -> None:
        self.data = []
        self.url = url
        self.date = date

        service = Service(executable_path="C:\\Users\\acer\Downloads\\chromedriver-win64\\chromedriver-win64\\chromedriver.exe")  # Windows path example
        self.driver = webdriver.Chrome(service=service)
        #
        #options = webdriver.ChromeOptions()
        #options.add_experimental_option('excludeSwitches', ['enable-logging'])

        #self.driver = webdriver.Chrome(ChromeDriverManager().install())
        sleep(0.5)
        self.driver.get(url)

    def close_cookies(self):

        xp_popup_close = '/html/body/div[6]/div/div[2]/div/div/div[3]/div/div[1]/button[1]'
        button = WebDriverWait(self.driver, 10).until(EC.element_to_be_clickable((By.XPATH, xp_popup_close)))
        button.click()
        print('Cookies closed')
        sleep(0.5)

        
    def get_date_time(self):

        time = [
            self.pageSource[i].find_element(By.CLASS_NAME, 'vmXl').text
            for i in range(len(self.pageSource))]

        #print(time)
        for i in range(len(self.pageSource)):
            time_from = time[i].split('–')[0].split(':')
            self.data[i]['date_time_from'] = datetime(int(self.date.year), int(self.date.month), int(self.date.day), int(time_from[0]), int(time_from[1]))

        for i in range(len(self.pageSource)):
            time_in = time[i].split('–')[1].split(':')

            if time_in[1][-2] != '+':
                self.data[i]['date_time_in'] = datetime(int(self.date.year), int(self.date.month), int(self.date.day), int(time_in[0]), int(time_in[1]))
            else:
                new_date = date(int(self.date.year), int(self.date.month), int(self.date.day)) + timedelta(int(time_in[1].split('+')[1]))
                self.data[i]['date_time_in'] = datetime(year= new_date.year, month=new_date.month, day=new_date.day, hour=int(time_in[0]), minute=int(time_in[1][:-2]))

    def get_price(self):

        for i in range(len(self.pageSource)):
            self.data[i]['total_price'] = self.pageSource[i].find_element(By.CLASS_NAME, 'f8F1-price-text').text
            print(self.data[i]['total_price'])

    def get_from_to(self):
        departure = [self.pageSource[i].find_element(By.CLASS_NAME, 'EFvI').text.split('\n')[0] for i in range(len(self.pageSource))]
        arrival = [self.pageSource[i].find_element(By.CLASS_NAME, 'EFvI').text.split('\n')[2] for i in range(len(self.pageSource))]

        for i in range(len(departure)):
            self.data[i]['airport_departure_IATA'] = departure[i][0:3]
            self.data[i]['airport_arrival_IATA'] = arrival[i][0:3]

            self.data[i]['airport_departure_name'] = departure[i][3:]
            self.data[i]['airport_arrival_name'] = arrival[i][3:]
            #print(self.data[i]['airport_departure_IATA'] + " " + self.data[i]['airport_arrival_IATA'])
            #print(self.data[i]['airport_departure_name'] + " " + self.data[i]['airport_arrival_name'])

    def get_route(self, db: Session):

        routes = [self.pageSource[i].find_element(By.CLASS_NAME, 'JWEO').text for i in range(len(self.pageSource))]


        for i in range(len(self.pageSource)):

            if routes[i] == 'direct':
                self.data[i]['route'] = {'stops' : "direct", }
            
            else:

                stops = routes[i].split('\n')
                stops_str = str(stops[0][0]) + " stop(s)"

                self.data[i]['route'] = {'stops' : stops_str, }
                time = self.pageSource[i].find_elements(By.CSS_SELECTOR, 'div.c_cgF.c_cgF-mod-variant-full-airport > span')
                route = []

                for t in time:
                    airport = t.text.split(",")[0]

                    info = t.find_element(By.TAG_NAME, 'span').get_attribute('title')
                    time = info.split('stopover')[0]
                    change = ''
                    if (len(airport) == 3):
                        change = models.get_city_by_iata(db, airport)
                    else:
                        change1 = models.get_city_by_iata(db, airport.split('-')[0])
                        change2 = models.get_city_by_iata(db, airport.split('-')[1])
                        change = str(change1) + " " + str(change2)
                    route.append({'airport_IATA': airport, 'airport_name': change, 'waiting_time': time})

                self.data[i]['route']['transfers'] = route

    def company(self):
        for i in range(len(self.pageSource)):
            self.data[i]['company'] = self.pageSource[i].find_element(By.CLASS_NAME, 'J0g6-operator-text').text


    def get_duration(self):
        duration = [self.pageSource[i].find_element(By.CLASS_NAME, 'xdW8').text for i in range(len(self.pageSource))]

        
        for i in range(len(self.pageSource)):
            self.data[i]['duration'] = duration[i]


    def cabin_class(self):
        cabin_class = [self.pageSource[i].find_element(By.XPATH, '//div[@class="aC3z"]').text for i in range(len(self.pageSource))]

        
        for i in range(len(self.pageSource)):
            self.data[i]['cabin_class'] = cabin_class[i]

    def get_url(self):
        
        for i in range(len(self.pageSource)):
            css_selector = 'div.M_JD-booking-btn > div > div > div > div > a'
            self.data[i]['url'] = self.pageSource[i].find_element(By.CSS_SELECTOR, css_selector).get_attribute('href')
        
    
    def more_url(self, i):

        more_info_link = f'//div[@class="nrc6-content-section"]'
        element=self.pageSource[i].find_elements(By.XPATH, more_info_link)
        more_data = WebDriverWait(self.driver, 15).until(EC.element_to_be_clickable(element[i-1]))
        more_data.click()
        print('clicked')
        sleep(1)
        
        get_new_info = '//div[@class="RBZl"]/ul[@class="RBZl-table-section"]'
        #list of variants
        data = more_data.find_element(By.XPATH, get_new_info)
        
        text_data = data.text.split('\n')[0:-1]
        companies_list = text_data[0::3]
        prices = text_data[1::3]
        
        css_selector = 'div.a1U1-booking-button > div > a'
        links=data.find_elements(By.CSS_SELECTOR, css_selector)


        #print(companies_list, prices)
        #!!!працює через раз!!!
        list_of_data=[{} for _ in range(len(companies_list))]
        
        for i in range(len(companies_list)):
            list_of_data[i]['company'] = companies_list[i]
            list_of_data[i]['price'] = prices[i]
            list_of_data[i]['price'] = links[i].get_attribute('href')
        
        #print(list_of_data)
        #print('\n')
        return list_of_data


    def get_data(self, db: Session):

        self.pageSource = self.driver.find_elements(By.CLASS_NAME, "nrc6-inner")
        self.data = [{} for _ in range(len(self.pageSource))]


        #time = [self.pageSource[i].text for i in range(len(self.pageSource))]
        #print(time)
        #print(len(self.pageSource))

        self.get_date_time()
        self.get_price()
        self.get_from_to()
        self.get_route(db)
        self.get_duration()
        self.cabin_class()
        self.company()
        self.get_url()

        for i in range(len(self.data)):
            print(self.data[i])

        # return more booking options
        # i - number of flight from the list
        #self.more_url(3)

        return self.data

if __name__ == '__main__':

    parsing = Scraping()
    parsing.close_cookies()

    for i in parsing.get_data():
        print(i)