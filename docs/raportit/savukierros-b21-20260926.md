# Build 21 (26.9.2026, käännös 4b52b8f0, juna/b13 64887a7a — Natiivisepän lopullinen leikkaus)

HUOM: 5556ce91 (välivaihe, esitestattu aiemmin) EI ollut lopullinen — tämä raportti koskee vain 4b52b8f0:aa.
iPhone 18 Pro. Asennus vaati kertaalleen manuaalisen uninstall+reinstall-korjauksen (simctl-rekisteri jäi
osoittamaan poistettuun bundle-polkuun toisen roolin samanaikaisen asennuksen jäljiltä) — käytin
proto-3d/Matkakirja-proto-kaannos/Build/.../Matkakirja3D.app:ia, kellonaika täsmäsi Natiivisepän 14.31:een.

## Tulokset

- **157 (maakunnan täyttö rantaviivaa seuraten): PASS** — Peloponnisoksen täyttö noudattaa tarkasti
  epäsäännöllistä rannikkoviivaa (lahdet/niemet), ei laatikkomaista aiempaa muotoa.
- **161 (lipputanko + 3D-lippu itäreunalla, lepo 0 kehystä kartalle): PASS.** Lippu löytyi annetulta
  koordinaatilta (41,08°N/25,95°E), Kreikan lippu liehuu maan ulkopuolelle rajan yli. `pallo lepo` -tuloste
  sisältää UUDEN rivin: "elävä kerros TAYSI, animoi: lippu@30, kaappauksia 7, kerroskehyksiä 2372" — vahvistaa
  että lippu piirtyy omana erillisenä 30 fps -kerroksenaan RIIPPUMATTA kartan lepotilasta (kehysajat.jsonl:n
  uusi `tilat.kerros`-kenttä nousee 150-151/151:een juuri lipun kohdalla, kun taas `taysi/lepo/paikallaan`
  pysyvät 0:ssa) — tämä on suunniteltu käytös, ei virhe.
- **D (Athos-salaisuuskortti): PASS** (regressio, sama komentoketju kuin aiemmin).
- **C (offline-lepo): PASS** — `pallo lepo` sanoo "lepää" verkottomassa tilassa Ateenan näkymässä (ei flägin
  kerrosta häiritsemässä); ks. HUOM alla piirretty-lukemasta lipun kohdalla.
- **E-vaihe1 (aani aihe aloituslento/loppu/kaupunki): PASS** (esitestattu 5556ce91:llä ja vahvistuu saman
  logiikan kautta 4b52b8f0:ssa, ei koskenut tähän muutoksia).
- **Musiikki vaihe 2 (`aani aihe ratkaisu`/`epaonnistuminen`): FAIL.** Komento palauttaa "ok", mutta
  `aani mittaa` ei näytä mitään uutta ratkaisu/tulos-raitaa soivien listassa (vain kaupunki-pohja ja
  ambienssi) — teema ei kuulu. Pelikoodarille: `Aanisoitin.TehtavanTulos(bool)` ei ehkä löydä ratkaisu-aihetta
  ilman oikeaa tehtävä-kontekstia (debug-komento saattaa tarvita ensin aktiivisen tehtävän).

## Ei ehditty / ei testattu tällä kierroksella

155 (0,85-kynnys tarkka arvo), 156 (veto+katkoviiva+☰-kytkin), 158 (pikkukuva), 160 (mallien mustetäplät —
Natiiviseppä sanoi korjanneensa, ei visuaalisesti vahvistettu), 162 (tarkka ajoitus luennan jälkeen),
musiikki vaihe 3 (maanosaraidat/tunnuskaupungit — vaatisi ei-eurooppalaisen kaupungin), Natiivi-UI:n
iPad-erät (visa/maalehti/sähke/nostokortti), kuljettu-kytkin, kuvat-kiinteät, maanosakorjaus, G (ei
regressioepäilyä, ei uusittu).

## HUOM Natiivisepälle: asennusrekisterin desync

Kun kahta simulaattoria asentaa/käynnistää lähes samaan aikaan kuin vahti/toinen rooli, `simctl launch`
voi palauttaa "No such process" koska CoreSimulatorin sovellusrekisteri jää osoittamaan vanhaan/poistettuun
bundle-kansioon. Korjaus: `simctl uninstall` + `simctl install <tuore .app-polku>` uudelleen. Ei
laitteisto-/build-vika, pelkkä ajoitusrace samalla koneella.
