from selenium import webdriver
from time import sleep
import re
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
import requests
from datetime import date, datetime, timedelta


class Scraping():


    def __init__(self, url: str, date: date) -> None:
        # options = webdriver.ChromeOptions();
        # chrome_options = Options()
        # chrome_options.add_argument('--headless')
        # chrome_options.add_argument('--no-sandbox')
        # chrome_options.add_argument('--disable-dev-shm-usage')
        # d = webdriver.Chrome('/home/<user>/chromedriver',chrome_options=chrome_options)
        # d.get('https://www.google.nl/')
        self.data = []
        self.url = url
        self.date = date
        self.driver = webdriver.Firefox()
        sleep(0.5)
        self.driver.get(url)

    def close_cookies(self):

        xp_popup_close = '//button[@class="Iqt3 Iqt3-mod-stretch Iqt3-mod-bold Button-No-Standard-Style Iqt3-mod-variant-outline Iqt3-mod-theme-base Iqt3-mod-shape-rounded-small Iqt3-mod-shape-mod-default Iqt3-mod-spacing-default Iqt3-mod-size-small"]'
        button = WebDriverWait(self.driver, 10).until(EC.element_to_be_clickable((By.XPATH, xp_popup_close)))
        button.click()
        print('Cookies closed')
        sleep(0.2)

        
    def get_date_time(self):

        time = [self.pageSource[i].find_element(By.CLASS_NAME, 'VY2U').text.split('\n')[0] for i in range(len(self.pageSource))]

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
            self.data[i]['price'] = self.pageSource[i].find_element(By.CLASS_NAME, 'f8F1-price-text').text

    def get_from_to(self):
        departure = [self.pageSource[i].find_element(By.CLASS_NAME, 'VY2U').text.split('\n')[1] for i in range(len(self.pageSource))]
        arrival = [self.pageSource[i].find_element(By.CLASS_NAME, 'VY2U').text.split('\n')[3] for i in range(len(self.pageSource))]

        for i in range(len(departure)):
            self.data[i]['airport_departure_IATA'] = departure[i][0:3]
            self.data[i]['airport_arrival_IATA'] = arrival[i][0:3]

            self.data[i]['airport_departure_name'] = departure[i][3:]
            self.data[i]['airport_arrival_name'] = arrival[i][3:]

    def get_route(self):

        routes = [self.pageSource[i].find_element(By.CLASS_NAME, 'JWEO').text for i in range(len(self.pageSource))]


        for i in range(len(self.pageSource)):
            
            if routes[i] == 'direct' or routes[i].split(' ')[0] == 0:
                self.data[i]['route'] = 'direct'
            
            else:

                stops = routes[i].split('\n')
                self.data[i]['route'] = {'stops' : stops[0][0], }
                
                time = self.pageSource[i].find_elements(By.CSS_SELECTOR, 'div.c_cgF.c_cgF-mod-variant-full-airport > span')

                route = []

                for t in time:
                    airport = t.text
                    
                    info = t.find_element(By.TAG_NAME, 'span').get_attribute('title')
                    time = info.split('stopover')[0]
                    change = re.search(r'<b>(.*?)</b>', info).group(1)
                    route.append({'airport_IATA': airport, 'airport_name': change, 'waiting_time' : time})
                
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


    def get_data(self):

        self.pageSource = self.driver.find_elements(By.CLASS_NAME, "nrc6") 
        self.data = [{} for _ in range(len(self.pageSource))]

        self.get_date_time()
        self.get_price()
        self.get_from_to()
        self.get_route()
        self.get_duration()
        self.cabin_class()
        self.company()
        self.get_url()

        # return more booking options
        # i - number of flight from the list
        #self.more_url(3)

        return self.data

if __name__ == '__main__':

    parsing = Scraping()
    parsing.close_cookies()

    for i in parsing.get_data():
        print(i)