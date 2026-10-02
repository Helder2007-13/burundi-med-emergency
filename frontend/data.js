/* ============================================
   URGENCES BURUNDI — Base de données simulée
   ------------------------------------------------------------
   Toutes les valeurs de ce fichier sont des données de
   DÉMONSTRATION. Elles seront remplacées par les appels
   Supabase au moment du branchement du backend.

   Pour brancher le backend, chaque fonction de `UB.data`
   doit renvoyer les données réelles. Les appelants des
   pages ne changent pas : seule la source change.

   Les champs portent `demo: true` tant qu'ils sont fictifs,
   ce qui permet d'afficher un marqueur de démonstration
   tant que le backend n'est pas branché.
   ============================================ */
window.UB = window.UB || {};

UB.data = (function () {
  "use strict";

  /* ---------- Utilitaires ---------- */
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  /* Les valeurs numériques sont réactives : une page peut les
     relire après un rafraîchissement sans recharger le DOM. */
  const now = () => new Date().toISOString();

  /* ---------- Prochaines valeurs de démonstration ---------- */
  const DEMO = {
    hospital: "hopital-bujumbura.jpg",
    soins: "hopital-soins.jpg",
    ruyigi: "hopital-ruyigi.jpg",
  };

  /* ============================================================
     ONBOARDING
     Les trois ecrans d'accueil sont decrits ici plutot que
     dupliques dans le HTML : une seule source pour le texte,
     les pastilles, les images et la chaine de navigation.
     Cible : table `onboarding` si le texte doit venir du CMS
     du Ministere.
     ============================================================ */
  const onboarding = [
    {
      id: 1,
      variante: "ob1",
      ton: "neutre",
      etape: 0,
      total: 3,
      meta: {
        titre: "Urgences Burundi — Votre santé, notre priorité au Burundi",
        description: "Trouvez un hôpital disponible en quelques secondes.",
      },
      /* L'ecran 1 est minimaliste : un titre, un chapo, la photo. */
      titre: "Votre santé, <em>notre priorité</em> au Burundi",
      chapo: "Trouvez un hôpital disponible en quelques secondes.",
      image: {
        src: DEMO.hospital,
        alt: "Hôpital Prince Régent Charles à Bujumbura, Burundi : entrée principale, palmiers et patients arrivant à pied",
        largeur: 1200,
        hauteur: 896,
      },
      pastilles: [],
      lienSuivant: "onboarding-2.html",
      libelleSuivant: "",
      libellePasser: "Passer",
      lienPrecedent: null,
      libellePrecedent: null,
    },
    {
      id: 2,
      variante: "obf",
      ton: "red",
      etape: 2,
      total: 3,
      meta: {
        titre: "Urgences Burundi — Démarche Guidée",
        description: "Suivez les étapes guidées pour signaler une urgence en quelques clics. Notre régulation connecte instantanément votre position aux hôpitaux disponibles.",
      },
      titre: "Démarche Guidée",
      chapo: "Suivez les étapes guidées pour signaler une urgence en quelques clics. Notre régulation connecte instantanément votre position aux hôpitaux disponibles.",
      pastilles: [
        { libelle: "Coordination intelligente", ton: "red", icone: "layers" },
        { libelle: "Actif", ton: "green", icone: "check" },
      ],
      image: {
        src: DEMO.ruyigi,
        alt: "Façade de l'hôpital de Ruyigi au Burundi, drapeau national hissé devant l'entrée",
        largeur: 1280,
        hauteur: 960,
        legende: "Coordination avec les hôpitaux disponibles",
      },
      lienSuivant: "onboarding-3.html",
      libelleSuivant: "Suivant",
      libellePasser: null,
      lienPrecedent: "onboarding-1.html",
      libellePrecedent: "Revenir à l'étape précédente",
    },
    {
      id: 3,
      variante: "obf",
      ton: "green",
      etape: 3,
      total: 3,
      meta: {
        titre: "Urgences Burundi — Restez Protégé",
        description: "Accédez en temps réel aux alertes sanitaires, à la disponibilité des lits et à vos consultations pour préserver votre santé au quotidien.",
      },
      titre: "Restez Protégé",
      chapo: "Accédez en temps réel aux alertes sanitaires, à la disponibilité des lits et à vos consultations pour préserver votre santé au quotidien.",
      pastilles: [
        { libelle: "Protection & Santé", ton: "green", icone: "shield" },
      ],
      image: {
        src: DEMO.soins,
        alt: "Un soignant ausculte un enfant hospitalisé dans un hôpital du Burundi",
        largeur: 1280,
        hauteur: 853,
        legende: "Suivi de vos consultations et de vos soins",
      },
      lienSuivant: "accueil.html",
      libelleSuivant: "Commencer",
      libellePasser: null,
      lienPrecedent: "onboarding-2.html",
      libellePrecedent: "Revenir à l'étape précédente",
    },
  ];

  /* ============================================================
     PATIENTS
     Source temporaire : jeu de démonstration local.
     Cible : table `profiles` (Supabase).
     ============================================================ */
  const patients = [
    {
      demo: true,
      id: "UB-2024-0891",
      initials: "JN",
      nom: "Jean Ndayishimiye",
      groupeSanguin: "O+",
      patientDepuis: 2024,
      province: "Bujumbura Mairie",
      telephone: "+257 79 12 34 56",
    },
    {
      demo: true,
      id: "UB-2024-0907",
      initials: "AM",
      nom: "Aline Mukamana",
      groupeSanguin: "A+",
      patientDepuis: 2025,
      province: "Gitega",
      telephone: "+257 72 45 67 89",
    },
  ];

  /* ============================================================
     RENDEZ-VOUS
     Cible : table `rendez_vous`.
     ============================================================ */
  const rendezVous = [
    {
      demo: true,
      reference: "RDV-2026-1042",
      patientId: "UB-2024-0891",
      specialite: "Cardiologie",
      etablissement: "CHR Ruziba",
      commune: "Bujumbura (Commune Muha)",
      praticien: "Dr. Ilunga Nadine",
      date: "2026-10-05",
      heure: "09:30",
      salle: "Salle 2",
      statut: "confirme",
    },
    {
      demo: true,
      reference: "RDV-2026-1058",
      patientId: "UB-2024-0891",
      specialite: "Médecine générale",
      etablissement: "Hôpital Régional de Gitega",
      commune: "Gitega",
      praticien: "Dr. Nshimirimana A.",
      date: "2026-10-12",
      heure: "10:15",
      salle: "Salle 1",
      statut: "en_attente",
    },
    {
      demo: true,
      reference: "RDV-2026-1071",
      patientId: "UB-2024-0891",
      specialite: "Pédiatrie",
      etablissement: "Centre Hospitalier de Ngozi",
      commune: "Ngozi",
      praticien: "Dr. Mwakamé J.",
      date: "2026-10-19",
      heure: "14:00",
      salle: "Salle 4",
      statut: "a_confirmer",
    },
    {
      demo: true,
      reference: "RDV-2026-0814",
      patientId: "UB-2024-0891",
      specialite: "Médecine générale",
      etablissement: "Hôpital Régional de Gitega",
      commune: "Gitega",
      praticien: "Dr. Nshimirimana A.",
      date: "2026-08-12",
      heure: "08:30",
      salle: "Salle 1",
      statut: "termine",
    },
    {
      demo: true,
      reference: "RDV-2026-0643",
      patientId: "UB-2024-0891",
      specialite: "Médecine générale",
      etablissement: "CHR Ruziba",
      commune: "Bujumbura",
      praticien: "Dr. Ilunga Nadine",
      date: "2026-06-28",
      heure: "11:00",
      salle: "Salle 2",
      statut: "termine",
    },
    {
      demo: true,
      reference: "RDV-2026-0512",
      patientId: "UB-2024-0891",
      specialite: "Dermatologie",
      etablissement: "Hôpital Prince Louis",
      commune: "Bujumbura",
      praticien: "Dr. Kamana B.",
      date: "2026-05-14",
      heure: "09:00",
      salle: "Salle 5",
      statut: "termine",
    },
  ];

  /* ============================================================
     ÉTABLISSEMENTS DU RÉSEAU
     Cible : table `etablissements`.
     ============================================================ */
  const etablissements = [
    {
      demo: true,
      id: "CHR-RUZIBA",
      nom: "CHR Ruziba",
      type: "public",
      reference: "Poste de garde #3",
      ville: "Bujumbura",
      commune: "Commune de Muha",
      gps: { lat: -3.3883, lng: 29.3644 },
      specialites: ["Cardiologie", "Urgences"],
      lits: { libres: 6, total: 15 },
      statut: "disponible",
      personnel: 142,
    },
    {
      demo: true,
      id: "CHU-NATIONAL",
      nom: "Hôpital Prince Louis",
      type: "public",
      reference: "CHU National",
      ville: "Bujumbura",
      commune: "Commune de Mukike",
      gps: { lat: -3.377, lng: 29.3619 },
      specialites: ["Pédiatrie", "Chirurgie"],
      lits: { libres: 11, total: 24 },
      statut: "disponible",
      personnel: 98,
    },
    {
      demo: true,
      id: "HR-GITEGA",
      nom: "Hôpital Régional de Gitega",
      type: "public",
      reference: "Capitale politique",
      ville: "Gitega",
      commune: "Centre-ville",
      gps: { lat: -3.4264, lng: 29.9256 },
      specialites: ["Médecine générale"],
      lits: { libres: 0, total: 30 },
      statut: "sature",
      personnel: 156,
    },
    {
      demo: true,
      id: "CH-NGOZI",
      nom: "Centre Hospitalier de Ngozi",
      type: "public",
      reference: "Région Nord",
      ville: "Ngozi",
      commune: "Centre-ville",
      gps: { lat: -3.0975, lng: 29.83 },
      specialites: ["Gynécologie"],
      lits: { libres: 9, total: 18 },
      statut: "disponible",
      personnel: 64,
    },
    {
      demo: true,
      id: "H-RUMONGE",
      nom: "Hôpital de Rumonge",
      type: "public",
      reference: "Région Sud (Lac)",
      ville: "Rumonge",
      commune: "Centre-ville",
      gps: { lat: -3.9763, lng: 29.4467 },
      specialites: ["Urgences", "Traumatologie"],
      lits: { libres: 0, total: 10 },
      statut: "sature",
      personnel: 41,
    },
    {
      demo: true,
      id: "CLIN-BUYENGERO",
      nom: "Clinique de Buyengero",
      type: "conventionne",
      reference: "Poste rural",
      ville: "Buyengero",
      commune: "Buyengero",
      gps: { lat: -3.855, lng: 29.62 },
      specialites: ["Pédiatrie"],
      lits: { libres: 0, total: 8 },
      statut: "ferme",
      personnel: 12,
    },
  ];

  /* ============================================================
     URGENCES
     Cible : table `urgences`.
     ============================================================ */
  const urgences = [
    {
      demo: true,
      reference: "URG-2026-3311",
      categorie: "Détresse respiratoire",
      description:
        "Homme, 47 ans. Dyspnée aiguë depuis 20 minutes, conscient, pale.",
      quartier: "Nyakabiga",
      etablissement: "CHR Ruziba",
      acuite: 1,
      statut: "ambulance_mobilisee",
      minutes: 4,
      avance: 85,
    },
    {
      demo: true,
      reference: "URG-2026-3312",
      categorie: "Traumatisme routier",
      description:
        "Femme, 32 ans. Collision sur l'avenue du Large, plaie au genou.",
      quartier: "Avenue du Large",
      etablissement: "Hôpital Prince Louis",
      acuite: 2,
      statut: "en_salle_de_soins",
      minutes: 11,
      avance: 52,
    },
    {
      demo: true,
      reference: "URG-2026-3313",
      categorie: "Céphalées persistantes",
      description:
        "Femme, 61 ans. Céphalées depuis deux jours, pas de perte de connaissance.",
      quartier: "Rohero",
      etablissement: "CHR Ruziba",
      acuite: 3,
      statut: "triage_effectue",
      minutes: 23,
      avance: 28,
    },
  ];

  /* ============================================================
     SUIVI D'UNE URGENCE
     Cible : table `suivis` + statut temps réel (canal Supabase).
     ============================================================ */
  const suivi = {
    demo: true,
    reference: "UB-2024-8942",
    etapeCourante: 1,
    etapes: [
      {
        num: 1,
        titre: "Analyse IA",
        detail: "Triage intelligent en cours.",
        statut: "en_cours",
      },
      {
        num: 2,
        titre: "Transmis au centre",
        detail: "Garde médicale prévenue.",
        statut: "fait",
      },
      {
        num: 3,
        titre: "Validé · ambulance en route",
        detail: "Départ de l'ambulance vers le patient.",
        statut: "a_venir",
      },
    ],
    trajet: {
      demo: true,
      distanceKm: 2.4,
      tempsMinutes: 8,
      transport: "Transport ambulance",
      patient: { quartier: "Nyakabiga" },
      hopital: "Hôpital de Ruziba",
    },
    services: ["Réanimation", "Bloc opératoire", "Imagerie médicale", "Laboratoire"],
  };

  /* ============================================================
     TABLEAU DE BORD HÔPITAL
     Cible : agrégats calculés côté serveur (vues SQL).
     ============================================================ */
  const dashboardHopital = {
    demo: true,
    etablissement: etablissements[0],
    postes: {
      id: "MSPLS-RUZ-9844",
      medecin: "Dr. Nadine Ilunga",
      garde: "Poste de garde #3",
    },
    compteurs: {
      urgencesEntrantes: 3,
      rendezVousJour: 5,
      litsLibres: 6,
      litsTotal: 15,
      ambulances: 2,
    },
    salleAttente: { patients: 8, capacite: 20, tension: "moderee" },
    filesTriage: [
      { label: "Acuités hautes", nombre: 3, delaiMoyenMin: 6 },
      { label: "Acuités moyennes", nombre: 5, delaiMoyenMin: 22 },
    ],
    planning: rendezVous.slice(0, 3),
    synchronisation: { active: true, zone: "Burundi-Nord / Bujumbura" },
  };

  /* ============================================================
     TABLEAU DE BORD ADMINISTRATION
     Cible : vues d'administration + table `zones_tension`.
     ============================================================ */
  const dashboardAdmin = {
    demo: true,
    superviseur: {
      nom: "Séraphine Ndayishimiye",
      id: "MSPLS-ADM-0492",
      role: "Superviseur National",
    },
    compteurs: {
      hopitaux: { valeur: 12, partConnectes: 100,partPublics: 8, prives: 4 },
      urgences24h: { valeur: 142, variation: 18, note: "vs J-1", vitales: 17 },
      tempsMoyen: {
        valeurMin: 8.5,
        variationMin: -1.2,
        objectifMin: 12,
        note: "Avant prise en charge",
      },
    },
    /* Seuils de tension : le backend fournira le comptage réel
       par zone ; ces bornes servent de légende et de seuils. */
    seuilsTension: [
      { niveau: "faible", maxCas: 10, tone: "ok" },
      { niveau: "modere", minCas: 10, maxCas: 25, tone: "soft" },
      { niveau: "eleve", minCas: 26, maxCas: 45, tone: "urgent" },
      { niveau: "critique", minCas: 46, tone: "critique" },
    ],
    /* Positions relevees sur l'agglomeration ; la carte reste
       illustrative, mais les quartiers ne se chevauchent plus. */
    zonesTension: [
      { nom: "Bwiza", cas: 58, lat: -3.3615, lng: 29.3555 },
      { nom: "Rohero", cas: 22, lat: -3.3905, lng: 29.3705 },
      { nom: "Musaga", cas: 18, lat: -3.3735, lng: 29.3775 },
      { nom: "Cibitoke", cas: 9, lat: -3.3845, lng: 29.3585 },
      { nom: "Kanyosha", cas: 4, lat: -3.3965, lng: 29.3455 },
    ],
    /* Axes routiers et repères du fond de carte (démonstration) */
    reperes: [
      "LAC TANGANYIKA",
      "RN1 (vers Ngozi / Bugarama)",
      "RN3 (Axe Rumonge / Muha)",
      "RN5 / Aéroport",
      "Bd de l'Uprona",
      "Bd du 28 Novembre",
      "Centre-ville",
    ],
    hopitaux: etablissements,
    langues: [
      { code: "RN", nom: "Kirundi (Ikirundi)", part: 65, usage: "Langue majoritaire nationale", alertesJour: 92 },
      { code: "FR", nom: "Français", part: 25, usage: "Usage institutionnel et urbain", alertesJour: 36 },
      { code: "EN", nom: "English", part: 10, usage: "Expatriés et communauté EAC", alertesJour: 14 },
    ],
    actualisationSecondes: 30,
  };

  /* ============================================================
     API publique
     Chaque fonction est le point de remplacement unique
     lorsque le backend sera branché.
     ============================================================ */
  return {
    demo: true,
    assets: DEMO,

    now,
    wait,

    /* Onboarding : les trois ecrans, dans l'ordre */
    async onboarding() {
      return onboarding;
    },
    /* Un ecran par son numero (1, 2 ou 3) */
    async onboardingEtape(numero) {
      return onboarding.find((o) => o.id === Number(numero)) || onboarding[0];
    },

    async patients() {
      return patients;
    },
    async patient(id) {
      return patients.find((p) => p.id === id) || patients[0];
    },

    async rendezVous({ patientId, statut } = {}) {
      let out = rendezVous;
      if (patientId) out = out.filter((r) => r.patientId === patientId);
      if (statut) out = out.filter((r) => r.statut === statut);
      return out;
    },

    async etablissements({ statut } = {}) {
      const out = etablissements;
      return statut ? out.filter((e) => e.statut === statut) : out;
    },
    async etablissement(id) {
      return etablissements.find((e) => e.id === id) || null;
    },

    async urgences({ etablissement } = {}) {
      return etablissement
        ? urgences.filter((u) => u.etablissement === etablissement)
        : urgences;
    },

    async suivi(reference) {
      return reference === suivi.reference ? suivi : null;
    },

    async dashboardHopital() {
      return dashboardHopital;
    },

    async dashboardAdmin() {
      return dashboardAdmin;
    },

    /* ---------- Aides d'affichage ---------- */

    /* Libellé lisible d'un statut */
    statutLabel(statut) {
      const map = {
        confirme: "Confirmé",
        en_attente: "En attente",
        a_confirmer: "À confirmer",
        termine: "Terminé",
        disponible: "Disponible",
        sature: "Saturé",
        ferme: "Fermé",
        ambulance_mobilisee: "Ambulance mobilisée",
        en_salle_de_soins: "En salle de soins",
        triage_effectue: "Triage effectué",
      };
      return map[statut] || statut;
    },

    /* Classe CSS du ton associé à un statut */
    statutTone(statut) {
      const map = {
        confirme: "ok",
        disponible: "ok",
        termine: "ink",
        en_attente: "urgent",
        sature: "urgent",
        ambulance_mobilisee: "urgent",
        a_confirmer: "soft",
        en_salle_de_soins: "soft",
        triage_effectue: "soft",
        ferme: "ink",
      };
      return map[statut] || "ink";
    },

    /* Classe CSS du niveau de tension à partir du nombre de cas */
    tensionTone(cas) {
      if (cas > 45) return "critique";
      if (cas >= 26) return "eleve";
      if (cas >= 10) return "modere";
      return "faible";
    },

    tensionLabel(cas) {
      return {
        critique: "Critique",
        eleve: "Élevé",
        modere: "Modéré",
        faible: "Faible",
      }[this.tensionTone(cas)];
    },

    /* Formate une date ISO en « lundi 5 octobre » */
    dateCourte(iso) {
      const d = new Date(iso + "T00:00:00");
      if (isNaN(d)) return iso;
      return d.toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
      });
    },

    /* Formate une date ISO en « 12 août 2026 » */
    dateLongue(iso) {
      const d = new Date(iso + "T00:00:00");
      if (isNaN(d)) return iso;
      return d.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    },

    /* Nombre formaté à la française : 142, 8.5 -> 8,5 */
    nombre(n, decimales = 0) {
      return Number(n).toLocaleString("fr-FR", {
        minimumFractionDigits: decimales,
        maximumFractionDigits: decimales,
      });
    },
  };
})();