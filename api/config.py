from functools import lru_cache

from pydantic import BaseSettings
import toml

toml_config = toml.load("config.toml")
class Settings(BaseSettings):
    SECRET_KEY = toml_config['SECRET_KEY']
    SQLALCHEMY_ECHO = toml_config['SQLALCHEMY_ECHO']
    ENVIRONMENT = toml_config['ENVIRONMENT']

class DevSettings(Settings):
    DEBUG = True

    DB_HOST = toml_config['DB_HOST']
    DB_USER = toml_config['DB_USER']
    DB_PASS = toml_config['DB_PASS']
    DB_PORT = toml_config['DB_PORT']
    DB_NAME = toml_config['DB_NAME']
    SQLALCHEMY_DATABASE_URL = f"postgresql+psycopg2://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}"


@lru_cache()
def get_config():
    if Settings().ENVIRONMENT == "development":
        return DevSettings()
    
    else:
        return DevSettings()
