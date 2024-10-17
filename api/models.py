from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.orm import declarative_base

from sqlalchemy.orm import Session

Base = declarative_base()

class Airports(Base):
    __tablename__ = "airports_data"

    iata_code = Column(String, primary_key=True, unique=True)
    city_airport = Column(String, nullable=False)
    country = Column(String, nullable=False)

def get_iata_by_city(db: Session, city: str):
    citi_iata = db.query(Airports.iata_code).filter(Airports.city_airport == city).first()
    if citi_iata == None:
        return None
    return citi_iata[0]

def get_city_by_iata(db: Session, iata: str):
    city = db.query(Airports.city_airport).filter(Airports.iata_code == iata).first()
    if city == None:
        return None
    return city[0]

def get_all_airports(db: Session) -> list:
    airports = db.query(Airports.city_airport).all()
    if airports == None:
        return ""
    return airports

#def get_all_airports_data(db: Session) -> list:
#    airports = db.query(Airports.city_airport, Airports.country).all()
#    if airports == None:
#        return None
#    return airports