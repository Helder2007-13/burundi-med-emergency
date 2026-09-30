from fastapi import FastAPI
from app.routers import triage

app = FastAPI(
    title="Burundi Med Emergency API",
    description="Système de triage d'urgence médicale basé sur le protocole OMS IITT",
    version="1.0.0"
)

# Inclusion des routes
app.include_router(triage.router)

@app.get("/")
def read_root():
    return {"message": "API Burundi Med Emergency opérationnelle"}