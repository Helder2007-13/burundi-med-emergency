/* ============================================
   URGENCES BURUNDI — Composants Vue 3
   Enregistrés globalement : les pages les utilisent
   directement dans leur template HTML.

   Palette : Design.md uniquement (via ui.css)
   Source de données : data.js (démonstration, à
   remplacer par Supabase au branchement du backend)
   ============================================ */
(function () {
  "use strict";

  const { computed, ref, onMounted } = Vue;
  const D = window.UB.data;

  /* ---------- Icônes (SVG inline, trait unique) ---------- */
  const ICONS = {
    plus: '<path d="M12 5.5v13M5.5 12h13"/>',
    ambulance:
      '<path d="M2.5 16V9.5h11V16h-11Z"/><path d="M13.5 11h3l3 3.2V16h-6v-5Z"/><circle cx="6.5" cy="17.5" r="1.8"/><circle cx="16.5" cy="17.5" r="1.8"/><path d="M8 9.5V7h4v2.5M20 10.5h1.5"/>',
    stethoscope:
      '<path d="M6 3v5a4 4 0 0 0 8 0V3"/><path d="M6 3H4.5M14 3h1.5"/><path d="M10 12v2.5a4.5 4.5 0 0 0 9 0v-1.2"/><circle cx="19" cy="11" r="2"/>',
    search:
      '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 4.5 4.5"/>',
    calendar:
      '<path d="M3.5 8.5h17v12h-17v-12ZM7.5 4v4.5M16.5 4v4.5M3.5 12.5h17"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5.2l3.4 2"/>',
    shield:
      '<path d="M12 3 5 6v6c0 4.4 3.6 7.8 7 8.3 3.4-.5 7-3.9 7-8.3V6l-7-3Z"/>',
    lock:
      '<rect x="4.5" y="10.5" width="15" height="10" rx="2"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/>',
    check:
      '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    checkCircle:
      '<circle cx="12" cy="12" r="8.5"/><path d="m8.5 12.3 2.5 2.5 4.5-5"/>',
    arrowRight: '<path d="M2.8 8h10.4M9.4 4.2 13.2 8l-3.8 3.8"/>',
    arrowLeft: '<path d="M13.2 8H2.8M6.6 4.2 2.8 8l3.8 3.8"/>',
    chevronRight: '<path d="M6 3.5 10.5 8 6 12.5"/>',
    chevronDown: '<path d="m4 6.5 4 4 4-4"/>',
    pin: '<path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/>',
    hospital:
      '<path d="M4 19V9l8-5 8 5v10"/><path d="M9.5 19v-5h5v5"/>',
    doc:
      '<path d="M6 3.5h9l4 4v13H6v-17Z"/><path d="M9 11h7M9 15h5"/>',
    users:
      '<circle cx="9" cy="8" r="3.2"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 5.5a3.2 3.2 0 0 1 0 6.4M17 14.5a6.5 6.5 0 0 1 4.5 5.5"/>',
    person:
      '<circle cx="12" cy="8" r="3.5"/><path d="M5 20a7 7 0 0 1 14 0"/>',
    userPlus:
      '<circle cx="10" cy="8" r="3.5"/><path d="M3.5 20a6.5 6.5 0 0 1 13 0M19 8v6M16 11h6"/>',
    bed: '<path d="M3.5 18V8M3.5 12h13a4 4 0 0 1 4 4v2"/><circle cx="7.5" cy="10.5" r="1.8"/>',
    activity: '<path d="M3.5 13h3.2l1.8-3 2.4 5 2-4 1.6 2h5"/>',
    grid: '<rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.5"/>',
    globe:
      '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.2 2.4 3.4 5.4 3.4 8.5S14.2 18.1 12 20.5c-2.2-2.4-3.4-5.4-3.4-8.5S9.8 5.9 12 3.5Z"/>',
    alert:
      '<path d="M12 3 5 6v6c0 4.4 3.6 7.8 7 8.3 3.4-.5 7-3.9 7-8.3V6l-7-3Z"/><path d="M12 9v4M12 15.5v.2"/>',
    info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5M12 7.5v.2"/>',
    logout: '<path d="M14 7V5.5a1.5 1.5 0 0 0-1.5-1.5h-6A1.5 1.5 0 0 0 5 5.5v13A1.5 1.5 0 0 0 6.5 20h6a1.5 1.5 0 0 0 1.5-1.5V17"/><path d="M10 12h10M17 9l3 3-3 3"/>',
    refresh:
      '<path d="M20 12a8 8 0 1 1-2.6-5.9"/><path d="M20 4.5V10h-5.5"/>',
    sync: '<path d="M3.5 12a8.5 8.5 0 0 1 14.6-5.9M20.5 12a8.5 8.5 0 0 1-14.6 5.9"/><path d="M18 3v3.5h-3.5M6 21v-3.5h3.5"/>',
    brain:
      '<path d="M9.5 4.5A3 3 0 0 0 6.5 7a2.8 2.8 0 0 0-1 5.3A3 3 0 0 0 8 17a3 3 0 0 0 4.5 2.6V4.8A3 3 0 0 0 9.5 4.5Z"/><path d="M14.5 4.5A3 3 0 0 1 17.5 7a2.8 2.8 0 0 1 1 5.3A3 3 0 0 1 16 17a3 3 0 0 1-3.5 2.6"/>',
    list: '<path d="M8 6.5h12M8 12h12M8 17.5h12M4 6.5h.01M4 12h.01M4 17.5h.01"/>',
    filter: '<path d="M3.5 5.5h17l-6.5 8v6l-4 2v-8l-6.5-8Z"/>',
    eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="3"/>',
    edit: '<path d="M4 20h4l10.5-10.5a2.1 2.1 0 0 0-3-3L5 17v3Z"/><path d="m14.5 6 3 3"/>',
    file: '<path d="M7 3.5h7l4 4V20.5H7v-17Z"/><path d="M14 3.5v4h4"/>',
    trendUp: '<path d="M3.5 17 9 11l4 4 7.5-8"/><path d="M15.5 7h5v5"/>',
    building:
      '<path d="M4 20V6.5L12 3l8 3.5V20"/><path d="M9 20v-5h6v5"/><path d="M4 10.5h16"/>',
    trendDown: '<path d="M3.5 7 9 13l4-4 7.5 8"/><path d="M15.5 17h5v-5"/>',
    plusSquare: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M12 9v6M9 12h6"/>',
    layers:
      '<path d="m12 3 8.5 4.5L12 12 3.5 7.5 12 3Z"/><path d="m3.5 12.5 8.5 4.5 8.5-4.5M3.5 17 12 21.5l8.5-4.5"/>',
    arrow: '<path d="M5 12h14M12 5l7 7-7 7"/>',
    /* Menu mobile */
    menu: '<path d="M4 7h16M4 12h16M4 17h11"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
  };

  /* ---------- Composant <ub-icon> ---------- */
  const UbIcon = {
    props: { name: { type: String, required: true }, size: { type: [Number, String], default: null } },
    computed: {
      path() { return ICONS[this.name] || ""; },
      dim() { return this.size ? { width: this.size, height: this.size } : null; },
    },
    template: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2" stroke-linecap="round"
           stroke-linejoin="round" aria-hidden="true" focusable="false"
           v-bind="dim" v-html="path"></svg>`,
  };

  /* ---------- En-tête ---------- */
  const UbHeader = {
    props: {
      section: { type: String, default: "" },
      produit: { type: String, default: "Santé Publique 24/7" },
    },
    setup() {
      const lang = ref(localStorage.getItem("ub-lang") === "fr" ? "fr" : "kr");
      function setLang(l) {
        lang.value = l;
        try { localStorage.setItem("ub-lang", l); } catch (e) {}
        document.documentElement.lang = l === "fr" ? "fr" : "rn";
      }

      /* Menu mobile : ouvert/ferme, et referme a chaque navigation.
         Sans cela, six liens forces a defiler horizontalement restent
         illisibles sur un telephone. */
      const ouvert = ref(false);
      function basculer() { ouvert.value = !ouvert.value; }
      function fermer() { ouvert.value = false; }

      onMounted(function () {
        if (typeof document === "undefined") return;
        document.addEventListener("keydown", function (e) {
          if (e.key === "Escape" && ouvert.value) { ouvert.value = false; }
        });
      });

      return { lang, setLang, ouvert, basculer, fermer };
    },
    template: `
      <header class="ub-head">
        <div class="ub-head-in">
          <a class="ub-brand" href="accueil.html">
            <span class="ub-brand-mark" aria-hidden="true"><ub-icon name="plus" :size="24"></ub-icon></span>
            <span class="ub-brand-txt"><b>Urgences Burundi</b><span>{{ produit }}</span></span>
          </a>

          <nav class="ub-nav" aria-label="Navigation principale">
            <a href="accueil.html" :aria-current="section === 'accueil' ? 'page' : false">Accueil</a>
            <a href="signaler-un-cas.html" :aria-current="section === 'services' ? 'page' : false">Services</a>
            <a href="dashboard-hopital.html" :aria-current="section === 'hopitaux' ? 'page' : false">Hôpitaux</a>
            <a href="mes-rendez-vous.html" :aria-current="section === 'rdv' ? 'page' : false">Mes rendez-vous</a>
            <a href="dashboard-admin.html" :aria-current="section === 'admin' ? 'page' : false">Administration</a>
            <a href="accueil.html#a-propos" :aria-current="section === 'contact' ? 'page' : false">À propos</a>
          </nav>

          <div class="ub-head-actions">
            <button class="ub-lang" type="button" @click="setLang(lang === 'kr' ? 'fr' : 'kr')"
                    aria-label="Changer de langue">
              <span :class="{ on: lang === 'fr' }">FR</span>
              <span class="sep" aria-hidden="true">/</span>
              <span :class="{ on: lang === 'kr' }">RN</span>
            </button>
            <a class="ub-urgent-btn" href="signaler-une-urgence.html">
              <ub-icon name="plus" :size="16"></ub-icon><span>Urgence Médicale</span>
            </a>
            <button class="ub-burger" type="button" @click="basculer()"
                    :aria-expanded="String(ouvert)" aria-controls="ub-menu-mobile">
              <span class="ub-sr-only">{{ ouvert ? 'Fermer le menu' : 'Ouvrir le menu' }}</span>
              <ub-icon :name="ouvert ? 'close' : 'menu'" :size="22"></ub-icon>
            </button>
          </div>
        </div>

        <div id="ub-menu-mobile" class="ub-menu" :hidden="!ouvert">
          <nav aria-label="Navigation mobile">
            <a href="accueil.html" :aria-current="section === 'accueil' ? 'page' : false" @click="fermer()">Accueil</a>
            <a href="signaler-un-cas.html" :aria-current="section === 'services' ? 'page' : false" @click="fermer()">Services</a>
            <a href="dashboard-hopital.html" :aria-current="section === 'hopitaux' ? 'page' : false" @click="fermer()">Hôpitaux</a>
            <a href="dashboard-admin.html" :aria-current="section === 'admin' ? 'page' : false" @click="fermer()">Administration</a>
            <a href="mes-rendez-vous.html" :aria-current="section === 'rdv' ? 'page' : false" @click="fermer()">Mes rendez-vous</a>
            <a href="mon-espace-patient.html" @click="fermer()">Mon espace patient</a>
            <a href="accueil.html#a-propos" :aria-current="section === 'contact' ? 'page' : false" @click="fermer()">À propos</a>
          </nav>
          <div class="ub-menu__foot">
            <a class="ub-btn ub-btn--urgent" href="signaler-une-urgence.html" @click="fermer()">
              <ub-icon name="plus" :size="16"></ub-icon>Signaler une urgence
            </a>
            <div class="ub-menu__row">
              <a class="ub-btn" href="connexion.html" @click="fermer()">Se connecter</a>
              <button class="ub-lang" type="button" @click="setLang(lang === 'kr' ? 'fr' : 'kr')"
                      aria-label="Changer de langue">
                <span :class="{ on: lang === 'fr' }">FR</span>
                <span class="sep" aria-hidden="true">/</span>
                <span :class="{ on: lang === 'kr' }">RN</span>
              </button>
            </div>
          </div>
        </div>
      </header>`,
  };

  /* ---------- Pied de page ---------- */
  const UbFooter = {
    props: { compact: { type: Boolean, default: false } },
    template: `
      <footer class="ub-foot">
        <div class="ub-wrap">
          <div v-if="!compact" class="ub-foot-grid">
            <div>
              <a class="ub-brand" href="accueil.html" style="margin-bottom:1rem">
                <span class="ub-brand-mark" aria-hidden="true"><ub-icon name="plus" :size="24"></ub-icon></span>
                <span class="ub-brand-txt"><b>Urgences Burundi</b><span>Santé Publique 24/7</span></span>
              </a>
              <p>Portail officiel de coordination des soins d'urgence et d'orientation
                 hospitalière de la République du Burundi.</p>
            </div>
            <div>
              <h4>Services</h4>
              <ul>
                <li><a href="signaler-une-urgence.html">Signaler une urgence</a></li>
                <li><a href="signaler-un-cas.html">Signaler un cas</a></li>
                <li><a href="mes-rendez-vous.html">Mes rendez-vous</a></li>
                <li><a href="mon-espace-patient.html">Mon espace patient</a></li>
              </ul>
            </div>
            <div>
              <h4>Professionnels</h4>
              <ul>
                <li><a href="portail-hopital.html">Portail Hôpital</a></li>
                <li><a href="dashboard-hopital.html">Tableau de bord</a></li>
                <li><a href="dashboard-admin.html">Administration</a></li>
              </ul>
            </div>
            <div>
              <h4>Compte</h4>
              <ul>
                <li><a href="connexion.html">Se connecter</a></li>
                <li><a href="creer-un-compte.html">Créer un compte</a></li>
              </ul>
            </div>
          </div>
          <div class="ub-foot-bottom">
            <span>© 2026 Ministère de la Santé Publique — République du Burundi</span>
            <span class="ub-demo-tag" v-if="!compact">Données de démonstration</span>
          </div>
        </div>
      </footer>`,
  };

  /* ---------- Carte de statistique ---------- */
  const UbStat = {
    props: {
      valeur: [String, Number], label: String, detail: String,
      ton: { type: String, default: "ok" }, cible: Number,
    },
    setup(props) {
      /* Compteur animé jusqu'à la valeur cible au montage */
      const affiche = ref(0);
      const cible = computed(() => props.cible ?? parseFloat(props.valeur));
      let timer = null;
      function animer() {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          affiche.value = cible.value; return;
        }
        const t0 = performance.now(), duree = 1000;
        const pas = (ts) => {
          const p = Math.min(1, (ts - t0) / duree);
          affiche.value = cible.value * (1 - Math.pow(1 - p, 3));
          if (p < 1) timer = requestAnimationFrame(pas);
          else affiche.value = cible.value;
        };
        timer = requestAnimationFrame(pas);
      }
      Vue.onMounted(animer);
      Vue.onUnmounted(() => timer && cancelAnimationFrame(timer));
      return { affiche };
    },
    template: `
      <div class="ub-stat">
        <p class="ub-stat__n" :class="'ub-stat__n--' + ton">
          <template v-if="Number.isFinite(cible)">{{ D.nombre(Math.round(affiche)) }}</template>
          <template v-else>{{ valeur }}</template>
        </p>
        <p class="ub-stat__t">{{ label }}</p>
        <p v-if="detail" class="ub-stat__d">{{ detail }}</p>
      </div>`,
    computed: { D: () => D },
  };

  /* ---------- Marqueur de démonstration ---------- */
  const UbDemo = {
    props: { texte: { type: String, default: "Démonstration" } },
    template: `<span class="ub-demo"><ub-icon name="info" :size="14"></ub-icon>{{ texte }}</span>`,
  };

  /* ---------- Pastille de statut ---------- */
  const UbStatut = {
    props: { statut: String, libelle: String },
    setup(props) {
      return {
        libelle: computed(() => props.libelle || D.statutLabel(props.statut)),
        ton: computed(() => D.statutTone(props.statut)),
      };
    },
    template: `
      <span class="ub-chip" :class="'ub-chip--' + ton">
        <span v-if="statut !== 'ferme'" class="ub-live" :style="{ width:'5px', height:'5px', borderRadius:'9999px', background:'currentColor', display:'block' }"></span>
        {{ libelle }}
      </span>`,
  };

  /* ---------- Champ de formulaire ---------- */
  const UbField = {
    props: {
      label: String, modelValue: [String, Number],
      type: { type: String, default: "text" }, required: Boolean,
      placeholder: String, options: Array, hint: String, prefix: String,
      id: String, rows: Number,
    },
    emits: ["update:modelValue"],
    template: `
      <div class="ub-field">
        <label :for="id">{{ label }} <span v-if="required" class="req" aria-hidden="true">*</span>
          <span v-else-if="hint && !prefix" class="ub-hint">(facultatif)</span></label>

        <div v-if="prefix" class="ub-input-wrap">
          <span class="ub-prefix">{{ prefix }}</span>
          <input class="ub-input" :id="id" :type="type" :value="modelValue"
                 :required="required" :placeholder="placeholder"
                 @input="$emit('update:modelValue', $event.target.value)">
        </div>

        <select v-else-if="options" class="ub-select" :id="id" :required="required"
                :value="modelValue" @change="$emit('update:modelValue', $event.target.value)">
          <option value="">{{ placeholder || 'Sélectionnez' }}</option>
          <option v-for="o in options" :key="o" :value="o">{{ o }}</option>
        </select>

        <textarea v-else-if="rows" class="ub-textarea" :id="id" :value="modelValue"
                  :required="required" :placeholder="placeholder" :rows="rows"
                  @input="$emit('update:modelValue', $event.target.value)"></textarea>

        <input v-else class="ub-input" :id="id" :type="type" :value="modelValue"
               :required="required" :placeholder="placeholder"
               @input="$emit('update:modelValue', $event.target.value)">

        <p v-if="hint && prefix" class="ub-hint">{{ hint }}</p>
      </div>`,
  };

  /* ---------- Barre de progression ---------- */
  const UbBar = {
    props: { valeur: { type: Number, default: 0 }, ton: { type: String, default: "ok" } },
    template: `
      <div class="ub-bar" :class="'ub-bar--' + ton" role="progressbar"
           :aria-valuenow="valeur" aria-valuemin="0" aria-valuemax="100">
        <i :style="{ width: Math.min(100, Math.max(0, valeur)) + '%' }"></i>
      </div>`,
  };

  /* ---------- Ligne de temps ---------- */
  const UbTimeline = {
    props: { etapes: { type: Array, required: true } },
    template: `
      <ol class="ub-tl">
        <li v-for="e in etapes" :key="e.num"
            :class="{ 'is-done': e.statut === 'fait', 'is-now': e.statut === 'en_cours' }">
          <span class="ub-tl__rail">
            <span class="ub-tl__dot">
              <ub-icon v-if="e.statut === 'fait'" name="check" :size="18" />
              <ub-icon v-else-if="e.statut === 'en_cours'" name="refresh" :size="18" class="ub-spin" />
              <ub-icon v-else name="check" :size="18" />
            </span>
            <span class="ub-tl__line"></span>
          </span>
          <div class="ub-tl__body">
            <h3>Étape {{ e.num }} : {{ e.titre }}</h3>
            <p>{{ e.detail }}</p>
            <span v-if="e.statut === 'en_cours'" class="ub-chip">En cours</span>
          </div>
        </li>
      </ol>`,
  };

  /* ---------- Tuile de compteur (tableau de bord) ---------- */
  const UbTile = {
    props: {
      titre: String, valeur: [String, Number], icone: String,
      ton: { type: String, default: "ok" }, unite: String,
      progression: Number, note: String, compteur: Number,
    },
    template: `
      <div class="ub-tile" :class="{ 'ub-tile--urgent': ton === 'urgent' }">
        <p class="ub-tile__t"><ub-icon :name="icone" :size="16"></ub-icon>{{ titre }}</p>
        <p class="ub-tile__n">
          {{ compteur ? D.nombre(compteur) : valeur }}
          <span v-if="unite" style="font-size:1rem;font-weight:600;color:var(--ub-ink-40)">{{ unite }}</span>
        </p>
        <ub-bar v-if="progression !== undefined" :valeur="progression" :ton="ton" class="ub-tile__bar"></ub-bar>
        <p v-if="note" class="ub-tile__n">{{ note }}</p>
      </div>`,
    computed: { D: () => D },
  };

  /* ---------- Sélecteur de langue simple ---------- */
  const UbLang = {
    setup() {
      const lang = ref(localStorage.getItem("ub-lang") === "fr" ? "fr" : "kr");
      function setLang(l) {
        lang.value = l;
        try { localStorage.setItem("ub-lang", l); } catch (e) {}
      }
      return { lang, setLang };
    },
    template: `
      <button class="ub-lang" type="button" @click="setLang(lang === 'kr' ? 'fr' : 'kr')"
              :aria-label="'Changer de langue'">
        <span :class="{ on: lang === 'kr' }">RN</span><span class="sep">/</span><span :class="{ on: lang === 'fr' }">FR</span>
      </button>`,
  };

  /* ---------- Message de démonstration en pied de section ---------- */
  const UbDisclaimer = {
    props: { texte: { type: String, default: "Données de démonstration — seront remplacées par les données réelles." } },
    template: `<p class="ub-disclaimer"><ub-icon name="info" :size="15"></ub-icon>{{ texte }}</p>`,
  };

  /* ---------- Composant <ub-onboarding> ----------
     Un seul composant pour les trois ecrans d'accueil. Le contenu
     vient de data.js (donc d'un point unique a remplacer quand le
     CMS du Ministere sera branche) ; la page ne fait que passer
     son numero d'etape.

     Le design prevoit deux mises en page : l'ecran 1 est
     minimaliste (titre + photo), les ecrans 2 et 3 partagent le
     gabarit complet (etape, pastilles, titre, texte, points,
     boutons). Le champ `variante` decide laquelle s'affiche. */
  const UbOnboarding = {
    props: { etape: { type: Number, required: true } },
    setup(props) {
      const donnees = ref(null);

      /* L'API est asynchrone : elle le sera aussi face au backend.
         On charge AVANT le premier rendu pour eviter un ecran vide.
         Le titre et la description du document suivent l'etape, ce
         qu'aucune page statique ne pouvait faire. */
      onMounted(function () {
        D.onboardingEtape(props.etape).then(function (o) {
          donnees.value = o;
          document.title = o.meta.titre;
          var desc = document.querySelector('meta[name="description"]');
          if (desc) desc.setAttribute("content", o.meta.description);
        });
      });

      /* Progression : terminee / courante / a venir */
      function etatPastille(i) {
        if (i + 1 < donnees.value.etape) return "is-done";
        if (i + 1 === donnees.value.etape) return "is-now";
        return "";
      }

      /* Le chemin du repli JPEG et celui du WebP derives du meme nom */
      function webp(o) {
        return "assets/img/" + o.src.replace(".jpg", "-800.webp");
      }
      function jpg(o) {
        return "assets/img/" + o.src;
      }

      return { d: donnees, etatPastille, webp, jpg };
    },
    template: `
      <div v-if="d" :class="d.variante === 'ob1' ? 'ob1' : 'obf obf--' + d.ton">

        <!-- ============ ECRAN 1 : minimaliste ============ -->
        <main v-if="d.variante === 'ob1'" class="ob1-main">
          <div class="ob1-copy">
            <!-- v-html est justifie ici : la chaine vient de data.js,
                 pas d'une saisie utilisateur, et c'est le seul moyen de
                 garder la balise <em> d'emphase sans dupliquer le
                 gabarit pour un second cas. -->
            <h1 class="ob1-title" v-html="d.titre"></h1>
            <p class="ob1-lead">{{ d.chapo }}</p>
          </div>

          <div class="ob1-visual">
            <figure class="ob1-frame" style="margin:0">
              <picture>
                <source :srcset="webp(d.image)" type="image/webp">
                <img :src="jpg(d.image)" :alt="d.image.alt"
                     :width="d.image.largeur" :height="d.image.hauteur"
                     fetchpriority="high" decoding="async">
              </picture>
            </figure>
          </div>
        </main>

        <footer v-if="d.variante === 'ob1'" class="ob1-foot">
          <a class="ob1-skip" href="accueil.html">{{ d.libellePasser }}</a>
          <a class="ob1-next" :href="d.lienSuivant" aria-label="Continuer vers l'application">
            <ub-icon name="arrow" :size="24"></ub-icon>
          </a>
        </footer>

        <!-- ============ ECRANS 2 ET 3 : gabarit complet ============ -->
        <main v-else class="obf-main">
          <div class="obf-copy">
            <p class="obf-step">
              <span class="dot" aria-hidden="true"></span>
              Étape {{ d.etape }} sur {{ d.total }}
            </p>

            <div v-if="d.pastilles.length" class="obf-pills">
              <span v-for="(p, i) in d.pastilles" :key="i"
                    class="obf-chip" :class="p.ton === 'green' ? 'obf-chip--green' : ''">
                <ub-icon :name="p.icone" :size="16"></ub-icon>
                {{ p.libelle }}
              </span>
            </div>

            <h1 class="obf-title">{{ d.titre }}</h1>

            <p class="obf-text">{{ d.chapo }}</p>

            <div class="obf-dots" role="img" :aria-label="'Étape ' + d.etape + ' sur ' + d.total">
              <span v-for="i in d.total" :key="i" :class="etatPastille(i - 1)"></span>
            </div>

            <div class="obf-actions">
              <a class="obf-btn" :href="d.lienSuivant">
                <span>{{ d.libelleSuivant }}</span>
                <ub-icon :name="d.etape === d.total ? 'check' : 'arrow'" :size="18"
                         class="arrow"></ub-icon>
              </a>
              <a v-if="d.lienPrecedent" class="obf-back" :href="d.lienPrecedent">
                {{ d.libellePrecedent }}
              </a>
            </div>
          </div>

          <div class="obf-visual">
            <figure class="obf-frame" style="margin:0">
              <picture>
                <source :srcset="webp(d.image)" type="image/webp">
                <img :src="jpg(d.image)" :alt="d.image.alt"
                     :width="d.image.largeur" :height="d.image.hauteur"
                     fetchpriority="high" decoding="async">
              </picture>
              <figcaption v-if="d.image.legende" class="obf-cap">
                <span class="pulse" aria-hidden="true"></span>
                <span>{{ d.image.legende }}</span>
              </figcaption>
            </figure>
          </div>
        </main>

      </div>`,
  };

  /* ---------- Enregistrement des composants ---------- */
  var COMPONENTS = {
    "ub-icon": UbIcon,
    "ub-header": UbHeader,
    "ub-footer": UbFooter,
    "ub-stat": UbStat,
    "ub-demo": UbDemo,
    "ub-statut": UbStatut,
    "ub-field": UbField,
    "ub-bar": UbBar,
    "ub-timeline": UbTimeline,
    "ub-tile": UbTile,
    "ub-lang": UbLang,
    "ub-disclaimer": UbDisclaimer,
    "ub-onboarding": UbOnboarding,
  };

  /* ---------- Ajout d'un composant propre a une page ---------- */
  UB.component = function (nom, definition) {
    COMPONENTS[nom] = definition;
    return definition;
  };

  /* ---------- Amorçage d'une page ----------
     Le `setup` de la page est COMPOSE avec celui de base, jamais
     remplacé : sans cela, un `setup` de page qui retourne ses
     propres valeurs fait perdre `D` et `data`, et le template
     echoue sur `undefined` au premier rendu. */
  UB.mount = function (options) {
    var el = document.getElementById("app");
    if (!el) return null;
    el.removeAttribute("v-cloak");

    var opts = Object.assign({}, options || {});
    var baseSetup = function () {
      return { D: D, data: D };
    };
    var pageSetup = opts.setup;

    opts.setup = function () {
      var base = baseSetup();
      if (!pageSetup) return base;
      var extra = pageSetup() || {};
      return Object.assign({}, base, extra);
    };

    var app = Vue.createApp(opts);
    Object.keys(COMPONENTS).forEach(function (name) {
      app.component(name, COMPONENTS[name]);
    });
    app.mount(el);
    return app;
  };
})();