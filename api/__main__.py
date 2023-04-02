import uvicorn

uvicorn.run(app='api:init_app', host='0.0.0.0', reload=True, factory=True)