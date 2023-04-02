from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.config import get_config
from api.main import main_router
# from api.routes import hotel, book


def init_app():
    app = FastAPI()
    settings = get_config()

    app.debug = settings.DEBUG

    # app.add_middleware(
    #     CORSMiddleware,
    #     allow_origins=["*"],
    #     allow_credentials=True,
    #     allow_methods=["*"],
    #     allow_headers=["*"]
    # )

    app.include_router(main_router)

    return app