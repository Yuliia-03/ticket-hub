from fastapi import Depends, FastAPI, HTTPException
from typing import List
import schemas
from create_url import GetUrl
from get_info import Scraping

from sqlalchemy.orm import Session



from database import SessionLocal

#models.Base.metadata.create_all(bind=engine)

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/flight/search", response_model=List[schemas.FlightsResult])
def form_url(searchParams: schemas.SearchParams, db: Session = Depends(get_db)):
    get_url = GetUrl(searchParams, db)

    parsing = Scraping(get_url.url(), searchParams.date)
    parsing.close_cookies()

    return parsing.get_data()
