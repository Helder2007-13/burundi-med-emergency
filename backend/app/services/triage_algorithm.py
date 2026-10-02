# backend/app/services/triage_algorithm.py

def evaluer_triage_algorithmique(age: int, symptomes: str, constantes: dict | None = None) -> dict | None:
    """
    Algorithme de décision déterministe basé sur les règles de sécurité OMS IITT.
    Renoie une évaluation immédiate si un signe de danger vital est détecté.
    """
    symptomes_lower = symptomes.lower()
    
    # 1. Signes de danger critique majeurs
    mots_cles_rouge = [
        "inconscient", "arret respiratoire", "convulsion", "choc", 
        "douleur thoracique", "inconsciente", "detresse respiratoire", "hemorragie"
    ]
    
    for mot in mots_cles_rouge:
        if mot in symptomes_lower:
            return {
                "categorie": "ROUGE",
                "priorite": 1,
                "source": "algorithme_regles",
                "justification": f"Urgence vitale détectée par l'algorithme : présence du symptôme critique '{mot}'.",
                "actions_immediates": [
                    "Acheminement immédiat en salle de déchoquage / réanimation",
                    "Alerter l'équipe médicale de garde sans délai"
                ]
            }

    # 2. Seuils critiques sur les constantes vitales
    if constantes:
        spo2 = constantes.get("spo2")
        pouls = constantes.get("pouls")
        
        # Hypoxie sévère (SpO2 < 90%)
        if spo2 and float(spo2) < 90:
            return {
                "categorie": "ROUGE",
                "priorite": 1,
                "source": "algorithme_regles",
                "justification": f"Urgence vitale détectée par l'algorithme : Saturation en oxygène critique ({spo2}% < 90%).",
                "actions_immediates": [
                    "Oxygénothérapie immédiate à fort débit",
                    "Alerter l'équipe médicale d'urgence"
                ]
            }
            
        # Tachycardie / Bradycardie extrême
        if pouls and (float(pouls) > 130 or float(pouls) < 40):
            return {
                "categorie": "ROUGE",
                "priorite": 1,
                "source": "algorithme_regles",
                "justification": f"Urgence vitale détectée par l'algorithme : Fréquence cardiaque anormale ({pouls} bpm).",
                "actions_immediates": [
                    "Mise sous scope ECG immédiate",
                    "Évaluation clinique prioritaire"
                ]
            }

    # Aucun signe d'urgence vitale stricte déclenché par l'algorithme -> Passer à l'IA
    return None