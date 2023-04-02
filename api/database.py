from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from api.config import get_config

settings = get_config()

# SQLALCHEMY_DATABASE_URL = "postgresql://postgres:2905@localhost/diploma"

engine = create_engine(
    settings.SQLALCHEMY_DATABASE_URL, echo=settings.SQLALCHEMY_ECHO
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base = declarative_base()