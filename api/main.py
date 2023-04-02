from fastapi import Depends, FastAPI, HTTPException, APIRouter
from typing import List
from api import schemas
from api.create_url import GetUrl
from api.get_info import Scraping

from sqlalchemy.orm import Session



from api.database import SessionLocal

#models.Base.metadata.create_all(bind=engine)

main_router = APIRouter()
app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@main_router.post("/flight/search", response_model=List[schemas.FlightsResult])
def form_url(searchParams: schemas.SearchParams, db: Session = Depends(get_db)):
    get_url = GetUrl(searchParams, db)

    parsing = Scraping(get_url.url(), searchParams.date)
    parsing.close_cookies()

    return parsing.get_data()
