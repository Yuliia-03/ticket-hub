from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.config import get_config
from api.main import main_router
# from api.routes import hotel, book


def init_app():
    app = FastAPI()


    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*", "http://0.0.0.0:4200"],
        allow_credentials=True,
        allow_methods=["POST", "GET", "PUT", "DELETE"],
        allow_headers=["*"]
    )
    settings = get_config()

    app.debug = settings.DEBUG
    app.include_router(main_router)

    return app