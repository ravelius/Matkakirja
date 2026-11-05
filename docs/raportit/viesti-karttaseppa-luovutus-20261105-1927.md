# Karttaseppä: luovutus 5.11.2026 klo 19.27 (KS)
Syy: konteksti 26 % (7.37), tauko omistajan ja Tripon odotuksessa. **Lue tämä; Invalidien tausta -1911:stä (kärki 7c7dea0d3), Panthéon -1900:sta (8e7eb1201), Riemukaaren maapohja -1834:stä (7ab3a6399).** Tämä voittaa ristiriidassa. W = /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219, haara karttaseppa/nahtavyydet-219, etäpää natiivi-backup, kärki 0906b3c15. Python /opt/homebrew/opt/python@3.14/bin/python3.

## ENSIN
1. Remote päälle. Vahti Monitorilla: `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh`.
2. Tarkista viestit: **KK:n sana Montparnassesta.**

## Valmis tässä vuorossa
- **Grand Palais:** lähiajo 0906b3c15 katsottu, suunta oikein ja rantatie ehjä. Kuvat `grand-palais-asennus/peli-etela.png` ja `peli-ita.png` KK:lla, tunnettu usvavika kerrottu. Ei muuta tehtävää.
- **Sarjan koot ovat tarkoituksella suurempia kuin oikeat:** `nahtavyyssarja/LUE.md` rivi 14 (Louvren hyväksytty suhde). `koko_m` voittaa `oikea_m`:n. Älä hälytä, vaikka malli on kartan rakennusta noin 30–100 % suurempi.

## Riemukaari 24g: otto 2 valittu (posti e1980ef06)
Otin kantaa Tripon postiin 51d99ee30. H/W 0,98 ja D/W 0,54 hyväksytty, koska oikea kaari on noin 1,10 ja 0,50 ja tilauksen 0,90 tuli kuvista. Tripo avaa kapeat kaaret paikallisesti, siistii jalustan ja ajaa aukkotestin uudelleen. Ei kolmatta generointia. KK:lle kerrottu, että malli on omistajan kuvaa korkeampi.
Odotetaan `riemukaari-3d-v1/`. Asennus: `riemukaari/pohja-siisti.png` omalla alfallaan. Kuva pelistä KK:lle.

## Montparnasse otto 2 (24h): KK:lla, suositus kelpaa
Arkki `sarja24-opera-pantheon-montparnasse/montparnasse/arkki-omistajalle.jpg`, kuvat `_review-sarja-24/montparnasse-otto2/`, huomiot postissa da5a8a8f2. `tee-arkit.py` lukee nyt otto 2:n. Codexin QA FAIL: koillinen 12,8 % kapea, viistot kalibroimatta. Viat kerrottu KK:lle.
**Jos omistaja sanoo kelpaa:** tilaus Tripolle, Raamatun ja 24g-tilauksen pohjalla. Syöte: Front `etela`, Back `pohjoinen`, Left ja Right **molemmat `lansi`**, koska `ita` on kapea. Mittakaava tilauksesta 62 × 39 × 210 m suhteina, pelikoko 177 × 111 m, jolloin korkeus noin 600 m, ellei tilausta 24 / LUE.md:tä lue toisin: **tarkista korkeus ensin** ja kerro se KK:lle. Suunta 129,4 alue.json:sta; laske Suunta Grand Palais'n säännöllä (etuosan atsimuutti = 180 + Suunta). Pohja `montparnasse/pohja-siisti.png` omalla alfallaan.

## Invalidit 24l: Tripolla, maapohja valmis
Pohja **`_tyo/karttaseppa/invalides-asennus/pohja-siisti.png`, käytä omaa alfaa, älä maski.png:tä** (`tee-pohja.py`, tarkistus `tarkistus.jpg`, `kartalla.png`, katsottu kartan päällä, ei pelissä). Esplanadin laikut nurmeksi, kiveys rakennuksen alle, itäreuna Boulevard des Invalidesin länsireunaan, joten oikea tie ja korttelit jäävät kartasta. Pelissä tarkista länsireunan porras (x 540, y 688) ja eteläsiiven kohta (x 752).
Asennus: kupoli kartan px (706, 802), leveys 363 m, rakennus 543–858 × 561–919, Suunta noin 4,1. Korjaa `alue.json` ja jalanjälki (`jalanjalki-uusi.png`). Kuva pelistä KK:lle. Kansion `katso*`- ja `zoom*`-tiedostot ovat tilapäisiä.

## Odotetaan
- **Tripo:** Riemukaari 24g, Panthéon 24i (saa ohittaa Riemukaaren, Suunta 18,4 on pitkän sivun normaali, portiikki noin 288°), Opéra 24j (Suunta noin -16, pohja `opera/pohja-siisti.png` omalla alfallaan, kupoli ja näyttämötorni 15–20 % korkealla, katso valmiista), Invalidit 24l.
- **Codex:** Sacré-Cœur 24k, `_review-sarja-24/sacre-coeur-otto2/`. Mäki 420 × 200 m, kirkko noin 200 × 100 m. Kirkon koon muutos kerrottu KK:lle vasta tilauksen jälkeen; jos omistaja haluaa toisin, korjaa tilaus heti. Reunan sopivuus litteään karttaan on kokeilematta: katso arkissa ja kerro. Arkki KK:lle (`tee-arkit.py`), ennen Tripoa omistajan sana.
- Tuileries'n leike NUI:lla. Pieni iPad JU:lla. ND:n tornit: ei tehdä. Eiffelin kyltin napautus testaamatta, ND:n, Louvren ja Eiffelin pohjat eivät häivy usvaan, Vrain-Lucasin ja Louvren kyltit 3D:n jälkeen. Hook toistaa työlistan rivejä, joita en tiedä omikseni: PT kuittaa.

## Opit
- Lue uusin versio luovutuksesta: pyydetty sha voi olla vanhentunut (`git log -- <tiedosto>`).
- Laatan vaara: katso ensimmäisestä peliajosta jokaisen uuden pohjan rantatiet ja reunat.
- Vertaa ensin kartan omaan pohjaan. Tilausluvun kumpikin puoli voi olla väärin: tarkista, mistä luku tuli.
- Pihat eivät näy sivukuvista: pihallisille Tripon syöte viistoista.
