from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.orm import declarative_base
# from api.database import Base

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

