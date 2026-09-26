# Savukierros: build 19 (juna/b13 fdc47632, käännös 343ca803), iPhone + iPad

26.9.2026 08.1x–08.3x. PASS-commit ehdotus: **fdc47632** (juna/b13; käännös 343ca803), kaksi osittaista/avointa
kohtaa (kylmäkäynnistys rajatapaus, kohta 3 väri). Kuvat PNG: `docs/raportit/kaappaukset/savukierros-b19-20260926/`.

## PASS
1. **Taustapäivitys (iPhone, ensikäynnistystila):** poistin `Documents/sisalto` (puhdas tila). **1. käynnistys**: `kaytossa.txt`
   tyhjä (käyttää paketin tilannekuvaa), tausta lataa **v151** (`viimeisin.txt` = sisalto/1/v151/, hakemisto v151 25 s kuluttua).
   **2. käynnistys**: `kaytossa` = **v151** ✓. **3. käynnistys** (kylmä): `kaytossa` = v151 — ladattu versio EI poistu siivouksessa ✓.
   (Versionumero luettu `Documents/sisalto/*.txt`:stä; kehittäjärivin numeroa en löytänyt UI:sta — tiedostot varmempi todiste.)
2. **`verkko raja` (saapuminen, verkoton testitila):** "RAJA saapuminen 0 ms verkko-odotusta: **PASS** (0 ms, 0 odotusta)".
   `verkko`-yhteenveto: odotukset vain "lento" n=1 2017 ms (ei saapuminen).
3. **Elävä kartta, kohta 1:** saapuminen "valmis **4,8 s**" (iPad ja iPhone; loki `elävä: valmis 4,8 s`, mediaani 16,7 ms, p95 33 ms);
   **napautus Ohita ohittaa lennon** (kuva 1: Ateena-verho → esittely heti); **toimii verkottomassa tilassa** (`ui offline verkoton`,
   banneri "Ei verkkoa · ei ladattuja maita"), kuvake/kuva ym. latautuvat.
4. **Lepopiirto saapumisen jälkeen (verkon kanssa):** Paikallaan, fps 30, piirretty **2–3 / 150** (16 riviä; ajoittainen pulssi ~25 s välein).
5. **Perussavuke (osin):** lento + Ohita ✓, saapuminen ✓, nosto (Marathon) aukeaa heti ✓. Äänet/II soitin ajettu b18:ssa, ei toistettu.

## Rajatapaus / avoinna
- **Kylmäkäynnistys → aloitusverho ≤ 5,3 s:** simulaattorissa ensimmäinen ei-musta kuva 5,4–6,1 s `simctl launch`:sta (kuvaväli 0,7 s,
  sisältää käynnistysoverheadin) → **rajatapaus**; oikea arvo mitattava laitteella (Natiiviseppä).
- **Lepopiirto verkottomassa testitilassa EI laske:** `ui offline verkoton` -tilassa piirretty 30–114 / 150 (Paikallaan, piirtoväli 60
  mutta piirtoja 20–75 %); `ui offline pois` → 2–3/150. Offline-banneri/uudelleenyritys pitää piirron käynnissä → onko tarkoituksellista?
- **Kohta 3 (Marathon → Attika):** iPad: Marathon-nimiön napautus avaa kortin (Soros, kuva 2); loki: "herätys jonossa GRC:Attiki (nosto kohde:marathon)"
  klo 41 s ja **"herää GRC:Attiki, 1/1, tulva 83 km"** klo 59 s ✓ (mekanismi käynnistyy), mutta **näkyvää pysyvää Attikan väriä en
  havainnut** stillistä ~25 s myöhemmin (kuvat 3–4). Ei todennettu — tarvitaan Natiivi-UI:n kuva/odotusarvo (mikä väri, miltä alueelta).
  `huntu paljastus <lat> <lon> <km>` ei mennyt läpi missään komentokanavassa (linssi/peli-komento: "tuntematon komento"; `komento.txt` ei kirjaudu).
- **Kohta 6 salaisuuskortti (Athos):** ei ajettu — en löytänyt laukaisukomentoa/dataa; kysy Natiivi-UI:lta.

Simulaattorit sammutettu.
