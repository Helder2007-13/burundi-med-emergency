import json
import os
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from groq import Groq
from supabase import create_client, Client
from dotenv import load_dotenv

# Importation du moteur algorithmique
from app.services.triage_algorithm import evaluer_triage_algorithmique

load_dotenv()

router = APIRouter(prefix="/api/v1/triage", tags=["Triage OMS IITT"])

client_groq = Groq(api_key=os.getenv("GROQ_API_KEY"))
MODEL_NAME = os.getenv("GROQ_MODEL", "allam-2-7b")

supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(supabase_url, supabase_key) if supabase_url and supabase_key else None

class PatientData(BaseModel):
    age: int
    symptomes: str
    constantes: dict | None = None

SYSTEM_PROMPT_IITT = """
Tu es un expert médical certifié en triage d'urgence selon le protocole OMS IITT.
Analyse les données du patient et attribue une catégorie : ROUGE, JAUNE ou VERT.

Réponds UNIQUEMENT sous forme d'un objet JSON valide au format :
{
  "categorie": "ROUGE",
  "priorite": 1,
  "justification": "Explication concise",
  "actions_immediates": ["Action 1", "Action 2"]
}
"""

@router.post("/")
async def effectuer_triage(patient: PatientData):
    try:
        # 1. ÉVALUATION ALGORITHMIQUE PRIORITAIRE (Instantanée & Déterministe)
        resultat_algo = evaluer_triage_algorithmique(patient.age, patient.symptomes, patient.constantes)
        
        if resultat_algo:
            resultat_json = resultat_algo
        else:
            # 2. SI L'ALGORITHME NE DÉTECTE PAS D'URGENCE CRITIQUE, L'IA ANALYSE
            user_message = f"Patient de {patient.age} ans. Symptômes : {patient.symptomes}."
            if patient.constantes:
                user_message += f" Constantes : {patient.constantes}"

            response = client_groq.chat.completions.create(
                messages=[
                    {"role": "system", "content": SYSTEM_PROMPT_IITT},
                    {"role": "user", "content": user_message}
                ],
                model=MODEL_NAME,
                temperature=0.2,
            )

            raw_content = response.choices[0].message.content.strip()
            if raw_content.startswith("```json"):
                raw_content = raw_content[7:]
            if raw_content.startswith("```"):
                raw_content = raw_content[3:]
            if raw_content.endswith("```"):
                raw_content = raw_content[:-3]

            resultat_json = json.loads(raw_content.strip())
            resultat_json["source"] = "ia_groq"

        # 3. ENREGISTREMENT SYSTÉMATIQUE DANS SUPABASE
        if supabase:
            record_data = {
                "age": patient.age,
                "symptomes": patient.symptomes,
                "constantes": patient.constantes,
                "categorie": resultat_json.get("categorie"),
                "priorite": resultat_json.get("priorite"),
                "justification": resultat_json.get("justification"),
                "actions_immediates": resultat_json.get("actions_immediates"),
            }
            supabase.table("triage_records").insert(record_data).execute()

        return {
            "status": "success",
            "resultat": resultat_json
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur de triage / enregistrement : {str(e)}")