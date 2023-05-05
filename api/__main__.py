import uvicorn

uvicorn.run(app='api:init_app', host='localhost', reload=True, factory=True)