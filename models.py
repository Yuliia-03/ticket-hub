from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from database import Base

from sqlalchemy.orm import Session

class Airports(Base):
    __tablename__ = "airports_data"

    iata_code = Column(String, primary_key=True, unique=True)
    city_airport = Column(String, nullable=False)
    country = Column(String, nullable=False)

def get_iata_by_city(db: Session, city: str):
    return db.query(Airports.iata_code).filter(Airports.city_airport == city).first()[0]

