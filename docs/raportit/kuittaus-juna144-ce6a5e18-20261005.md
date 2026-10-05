# Junan 144 lopullinen koe ce6a5e18 (app 66516269) — napautuspolku, PUUTE yksi kohta (5.10.2026 20.42–20.52, iPhone-sim 1572C658)

TODISTUS.md: `/Users/Shared/Claude/proto-3d/lokit/todistus-juna144-ce6a5e18-20261005-2048/TODISTUS.md` (kopio `todistus-juna144-ce6a5e18-20261005.md`). Muut ajot samalta illalta: a418b443 (`…-1068bd0e-20261005-2041`, `…-iss-20261005-2045`).
Kone kuormassa (load 20–92 > 16, Unity-käännökset) → toimintatesti, ei fps/laatu/A-V. 0 Exception, 0 VIRHE-riviä ce6a5e18-ajossa.
**Korjaus aiempiin kuittauksiini (0eb27a05, 5f257c20, 3607fe70, a418b443):** skenaarioissani oli virhe — `linssi satelliitti` ja `linssi pois` annettiin ilman kanavaetuliitettä (`linssi linssi satelliitti` / `linssi linssi pois`), joten lokissa "tuntematon komento: satelliitti/pois". Siksi **"ISS-ohjaamo ei avaudu / opas ei sulkeudu `linssi pois`:lla" ei ollut koodivika.** Tyhjä kartta oppaan sulkemisen jälkeen on sen sijaan toistunut.

**Kuittausrivi: `juna144-koe ce6a5e18 (66516269): PUUTE (1 kohta) — kartta jää tyhjäksi oppaan sulkemisen (Poistu linssistä) jälkeen; muut OK; chat/puhu/kirjoita, Vaihda kohde maa→kaupunki→vaihto ja ISS-äänen mittaus testaamatta.`**

| Kohta | Tulos |
|---|---|
| Natiivi testimykistys | OK: `aani mykistys 1` → "unity päällä, natiivi päällä" |
| Asetukset datana | OK: "oletukset (ei tiedostoa)" |
| ISS-ohjaamo (satelliitti → taulu → ISS-ohjaamo oikealla tap'illä) | OK: Cupola-ikkuna, LCD "TYYNI VALTAMERI", suunta-ohjain, kamera-nappi, kiihdytys 1×…1000×, mikseri-ikoni, astronautti-Pulu (`juna144-ce6a5e18-iss-ohjaamo.png`); sulku `linssi linssi pois` → kartta palaa ehjänä (`…-kartta-iss-jalkeen.png`) |
| Elävä opas (kehittäjätila, testitila, Kööpenhamina) | OK: `opas: auki, data Google, TESTI`; kevennetty näkymä: 3D-kaupunki, vain mikki + ≡ + lehti-kuvake, ei chat-korttia/✕:ää, Google/Cesium-krediitit kapeaan ruutuun "Data sources" (`…-opas-kevennetty.png`, a418b443: `…-opas-kortti.png`) |
| Kartussi "ISO-BRITANNIA" / matkakirjakortti oppaan aikana | OK: ei näy (ui-puu + stillit) |
| Oppaan ≡-valikko | OK: Vaihda kohde ›, Poistu linssistä (rivipohja uusi); Vaihda kohde → maanosat → Euroopan maat aukeavat |
| Poistu linssistä | OSITTAIN: opas sulkeutuu, `Liiku` näkyy, MUTTA **kartta on tyhjä** (vain taustaväri, ei laattoja/paikkoja) (`…-opas-poistettu-tyhja-kartta.png`); toistunut kaikissa neljässä koeversiossa (≥8–18 s sulun jälkeen) → PUUTE |
| Pöllön 429 (a418b443, työ worker) | KIRJATTU: oppaan oikea worker → 5× `429 Too Many Requests`, backoff 2/4/8/16 s, "luovutti, 5 virhettä, linssi kiinni" — odotettu, ei toistettu (`juna144-a418b443-virherivit-429.txt`). Luovutus/backoff toimii |
| Ääni | HUOM: `aani mittaa` ISS-ohjaamossa rms 0 (Unity-mikseri), mutta soivia 1 [Silmukka] (natiivi silmukka, testimykistys päällä); ääntä ei mitata kaiuttimista |
| Maalistan koodit ALD/AND/FRO/GIB/IMN | HUOM (a418b443/3607fe70 stillit): nimet puuttuvat Euroopan maalistasta |
| EI TESTATTU | chat-vastaukset (kaksi sirua), puhu/kirjoita, tunnus Pöllöstä, Vaihda kohde maa → kaupunki → vaihto, vaaka-asento (simu), A/V-ajoitus/fps |

iPad 00008103:n 10 min opas-ajo (VIE-ehto) tekemättä: tarvitsee IPAD NYT -vuoron.
