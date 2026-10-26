# Karttasepän luovutus 26.10.2026 klo 10.3x (Postivahti: kova raja 46 %)

Lue ensin CLAUDE.md, tuotannonohjauksen osio 0 (`git show origin/main:docs/tuotanto/tuotannonohjaus.md`) ja
`node tools/raamattu-luku.mjs 7.47` (Karttaseppä: luvut 2 ja 6, erityisesti 6.9 LÄHITASOT ELÄVINÄ, PR 5231).
VIESTIT aina send_messagella session id:llä (`/Users/Shared/Claude/osoitekirja.md`), PT:lle ≤ 3 riviä. Käännökset ja simut
vain Julkaisijan jonon kautta (KÄÄNNÖSPYYNTÖ → KÄÄNNETTY → SIMU NYT → SIMU VAPAA). Ei screencapturea.

## Tehtävä: ELÄVÄ KARTTA (omistajan kortti 25.10. klo 14.28 "Elävä kartta mieluummin")

Omistajan sanat: "Pystyykö meidän karttaa tarkentamaan yhtä lähelle kuin tätä [kanahiro antique #12.63/51.44959/0.63814] ja onko
tästä siihen apua ja miten iso työ olisi tarkentaa lähemmäs. Ja kannattaisiko nykyistä lähemmillä tarkkuuksilla siirtyä ei
esipoltettuun karttaan ja olisiko se mahdollista ja mitä haittaa siitä olisi?" PT: pergamenttityyli omaksi, ei saumaa,
palat eivät jää tyhjiksi, iPad ei lämpene, OSM-maininta, lataus sama kaikilla verkoilla.

### Tehty
- **Suunnitelma** 6ec34b25c (tämä haara, `docs/raportit/elava-kartta-suunnitelma-20261026.md`), PT hyväksyi 10.3x.
- **Koekolmikko** `proto-3d/_tyo/karttaseppa/elava-kartta-20261025/kolmikko-thames.png` (esimerkki | nyt | koe), koottu
  uudelleen 10.32 isommilla nimillä; PT vei KK:lle. Saumatarkistus koe-sauma-z11/z12.png, nimet koe-1to1-nimet.png.
  Python-viitepiirtäjä `tyokalut/piirra.py` (ympäristömuuttujat LEV_KM KORK_KM DZ Z NIMI JAKO ALFA; aja `python3 piirra.py`
  ilman -I:tä), haku `tyokalut/hae.py` (OpenFreeMap vaatii User-Agentin), kolmikko `tyokalut/kolmikko.py`.
- **C# proto-haarassa `karttaseppa/elava-kartta`** (wt `/Users/Shared/Claude/wt/proto-karttaseppa-elava-kartta`, pohja master
  e51c33e0f, peili `peili/proto/karttaseppa/elava-kartta`):
  - 4ce29c0fc ElavaMvt (MVT-purku), ElavaPiirto (ElavaMaski: nonzero-täyttö, viivat, 4×4 ylinäytteistys, chamfer-rannat),
    ElavaTyyli (Z10/Z9-vanhempi + vektorikerros, tasosäännöt, 16 px reunavara, kiinteä meri/maa-sävy) + ElavaKarttaTestit (9).
  - e784a6f12 Laattapalvelin.Elava.cs (partial; HaeSisalto-koukku Z11–15, OhjaaCesium maximumLevel 15, Update → ElavaAskel),
    PalloKierto.MinKorkeus (lähin 4 lautayksikköä ≈ 8 km), kytkin PlayerPrefs `matkakirja-elava-kartta`. .meta-tiedostot.
  - Kartta-testit 527/527, tarkista.sh 0 (HUOM: tarkista.sh muuttaa tyylikirjatiedostoja → `git checkout` ennen committia).
  - C#-koe: `ELAVA_KOE=<_tyo-kansio> bash Kartta-testit/kaanna.sh ElavaKoe` + `python3 tyokalut/cs-kolmikko.py` →
    vertailu-py-cs.png (vastaa Python-koetta, ~60 ms/pala, ei palarajoja).

### SEURAAVAKSI
1. **KÄÄNNÖSPYYNTÖ on JU:lla** (e784a6f12 → `_tyo/karttaseppa/elava-kartta-app`, PT pyysi vuoron PK:n jälkeen). Ensimmäinen
   Unity-käännös näille tiedostoille: korjaa käännösvirheet heti. KÄÄNNETTY → kirjoita `<app>/kaannos.out`
   "KÄÄNNETTY e784a6f12 karttaseppa/elava-kartta (käännös-sha …)". SIMU NYT → taustalle
   `zsh _tyo/karttaseppa/elava-kartta-20261025/ajo-elava.zsh` (skenaario sk-elava.txt: Lontoo-peli, `komento aja 51.44959
   0.63814 <kaari>`: 1.6 / 0.42 / 0.11) → SIMU VAPAA heti → kuvat E1–E3 täysikokoisina → PT 3 riviä.
2. **Nimet nimikerrokseen** (ei palaan): place-tason kylät/kaupungit (Z11 kaupungit, Z13 kylät, Z14 pikkukylät; koot iPadilla
   kylä ≈ 18 pt) olemassa olevaan Nimikerros/NimiLadonta-järjestelmään.
3. **Tekijämaininta** "© OpenMapTiles © OpenStreetMap -tekijät" Tietoja-sivulle → Natiivi-UI:n kansio (UI/**), pyydä NUI:lta.
4. Myöhemmin: esilataus (saapumisalue z11–14), Euroopan PMTiles omaan ämpäriin jos käyttö kasvaa, DEM-varjostus lähitasoille,
   suorituskyky (piirto ~60 ms Macilla: SS 4 → 3 tai rannat vain vesipaloille).

### Avoimet
- Natiiviseppä sai tiedon Laattapalvelin-koukuista (e784a6f12). Junaan vasta simukokeen ja PT:n kuittauksen jälkeen.
- Paikallinen `.claude/settings.local.json` roolikansiossa muutettu (ei omani, ei commitoida).
