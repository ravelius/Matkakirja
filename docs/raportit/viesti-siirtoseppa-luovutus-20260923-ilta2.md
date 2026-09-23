# Luovutus: Siirtoseppä, 23.9.2026 ilta (ilta2)

Luovuttaja on Siirtoseppä (Opus). Syy: konteksti on 70 %, ja Fable nollaa
session. Tämä korvaa luovutukset `-b.md` ja `-ilta.md`. Niiden opit ovat
yhä voimassa, ja niihin viitataan tässä.

## Lue ensin

1. `CLAUDE.md` ja Raamatun Ydinajatus kohta 2 (vain se osio).
2. Tämä raportti.
3. `docs/raportit/sisallon-siirtoputki-20260923.md`, osat 5.3 ja 5.4
   (skeeman historia 1.0–1.10), sekä `docs/raportit/natiivi-siirtosuunnitelma-20260923.md`
   (natiivin inventaario ja korjauslista, PR #2948).
4. Proto-git `/Users/Shared/Claude/proto-3d/Matkakirja-proto`,
   `Assets/Matkakirja/RAJAPINTA.md` osio 10 (sisältöpaketti, offline.json,
   palvelinrajapinnat, natiivin tunnistuspäätös).

## Tila

- **Skeema 1.10.** Versiot verrataan **numeroina** (1.10 > 1.9). Tämä on
  kirjattu RAJAPINTA 10.1:een ja `vie-sisalto.mjs`:n historiaan.
- **Tuotannossa** (`https://media.matkakirja.app/sisalto/1/uusin.json`) on
  v3, skeema 1.1. Mikään tämän päivän työstä ei ole vielä mainissa.
- **Nippu 3 (lukittu, skeema 1.9)**, Julkaisijan haara
  `julkaisija-julkaise-nippu3`. Siinä ovat Siirtosepän haarat järjestyksessä
  skeema12 → funktiot-kaupungit → lehti-riippuvuudet → saannot-saapuminen →
  logiikka → saannot-tapahtumat → linssiaineisto → aanitaulut →
  kysymyskuvat → offline. Nippu odottaa polttoa, koko testisarjaa ja nippu 2:n
  savuketta.
- **Nippu 4 (auki, skeema 1.10)**: haara `siirtoseppa-nippu4-kartta`, joka
  sisältää haaran `siirtoseppa-nippu4-kuvat`, ja siihen on yhdistetty
  origin/main (527e72768: tools/maasto ja iso2-korjaus #2960). Commitit:
  - f203df7ff: muotokuvat (kohtaamiset, tarinakaari), laatta- ja
    paikallisaarrekuvat, karttamerkit, linssiluennat, saannot KATKOKUVA
  - f83e25013: karttavalot (2672), maastonimet (213), maarajat (135)
  - 071063939: skeema 1.10
  - a8c1fc4d9: luennat[].reaktiot ja tekstiSha256; vanhentuneet aikaleimat pois
  - 39d0582d8: kaupungit[].korkeus (Copernicus GLO-30; 59/266, muut null)

  Julkaisijalle on kerrottu nipusta 4 (commitit a8c1fc4d9 asti). Kerro sille
  uusimmista (527e72768, 39d0582d8).
- **Koepaketti natiivisessioille:** `/Users/Shared/Claude/sisalto-koe/`
  (uusin.json → v11, skeema 1.10). Rakennettu paikallisessa worktreessä
  `/Users/Shared/Claude/wt/siirtoseppa-koepaketti` (paikallinen merge
  nippu4-kartta 071063939 + linssiseppa-iso2, 90800dd8a, ei pushattu).
  **v11:stä puuttuvat a8c1fc4d9 ja 39d0582d8**, joten rakenna v12 ensin.
  Päivitys:
  ```
  cd /Users/Shared/Claude/wt/siirtoseppa-koepaketti && git fetch -q origin \
    && git merge --no-edit origin/siirtoseppa-nippu4-kartta
  node tools/vienti/vie-sisalto.mjs
  node tools/vienti/julkaise-sisalto.mjs --ulos /Users/Shared/Claude/sisalto-koe \
    --edellinen /Users/Shared/Claude/sisalto-koe/uusin.json --suurin 11 --commit $(git rev-parse --short HEAD)
  ```
  Testikonflikti tests/sisaltopaketti.test.mjs:ssä (kaksi lisättyä testiä
  samaan kohtaan): pidä molemmat ja lisää ensimmäisen perään `});`.

## Tee nämä ensin

1. **Koepaketti v12** (yllä) ja lyhyt viesti natiivisessioille (Natiiviseppä,
   Pelikoodari, Linssiseppä, Natiivi-UI): luennat.reaktiot ja kaupungit.korkeus.
2. **CI-paketin tarkistus nippu 3:n mergen jälkeen:** `gh run list --workflow
   vie-sisalto.yml --limit 3`, sitten `curl -s
   https://media.matkakirja.app/sisalto/1/uusin.json` (odotus: skeemaversio
   1.9, versio ≥ 4) ja `node tools/vienti/tarkista-media.mjs --kaikki`. Ilmoita
   Fablelle yhdellä rivillä vasta tarkistuksen jälkeen tai jos jumiudut.
3. **Nippu 4:n merge:** Julkaisija käsittelee sen TestFlight-kiireen jälkeen.
   Seuraa, ja yhdistä main uudelleen, jos se liikkuu.

## Odottaa omistajan päätöstä

- **Ämpärilataus sisalto/koe/.** Tämän session lupatarkistus esti
  avainmuuttujien lukemisen (Credential Exploration). Estoa ei kierretty CI:llä
  eikä muiden sessioiden kautta. Julkaisija sai välitetyn pyynnön ladata
  koepaketti minun nimissäni. En ollut lähettänyt sitä, ja Julkaisija
  kieltäytyi oikein. Päätös on omistajan.
- **Kaupunkien korkeudet, 207 puuttuvaa.** NAS:n DEM-arkisto
  (`/Volumes/NAS-Homes/koodaus/Claude/Matkakirja-arkisto/dem/copernicus-glo30`)
  kattaa vain Euroopan. Muut ruudut vaativat Copernicus GLO-30 -ruutujen
  latauksen AWS:n avoimesta arkistosta (noin 200 ruutua, gigatavuja). Se on
  tiedostolataus, joten kysy omistajalta. Luvan jälkeen: lisää ruudut arkistoon
  tai `--dem`-kansioon ja aja `node tools/vienti/korkeudet.mjs --paivita`.

## Avoimet (muiden vastuulla, seuraa)

- **Luentojen aikaleimat:** kaikki 45 `assets/aikaleimat`-tiedostoa ovat
  vanhentuneita (teksti uusittu 14.9.), ja ämpärin kopio puuttuu (404).
  Fable antoi kohdistusajon Sisältökirjurille. Kun aikaleimat on kohdistettu,
  `luennat[].reaktioHetket` ja `aikaleimaTiedosto` täyttyvät vientiin
  automaattisesti (tools/vienti/lahteet.mjs voimassaOlevatAikaleimat).
- **Natiivin tunnistus (RAJAPINTA 10.3, Fablen päätös):** kaikkiin workereihin
  tarvitaan tarkistus `x-matkakirja-natiivi` + bundle id User-Agentissa
  (pollo-worker #2956 on malli). Toteutus ei kuulu Siirtosepälle.
- **Natiivi-UI:** pulun kuvat, spritet ja eleiden data sekä isoisän luentojen
  kuvasarjat tulevat, kun Natiivi-UI tarkentaa tarpeen.
- **Pages-only-kuvat** (karttamerkit, kätkökuva) osoittavat matkakirja.app:iin.
  Fablen mukaan osoitteet sovitaan Julkaisijan kanssa nipun mergessä.

## Työkalut (tools/vienti)

| Tiedosto | Tehtävä |
|---|---|
| `vie-sisalto.mjs` | koko vienti; `SKEEMAVERSIO_TARKKA` + historia |
| `kokoelmat.mjs` | kaikki kokoelmat (33 kpl) |
| `logiikka.mjs` | jokaisen paketin funktion luokitus; vartija kaatuu uudesta |
| `offline.mjs` | offline.json; `--paivita-koot` (julkiset HEAD-otokset → offline-koot.json) |
| `korkeudet.mjs` | `--paivita` (NAS-DEM → kaupunkien-korkeudet.json) |
| `maarajat.mjs` | Natural Earth → maarajat asteina (DP 0,05°) |
| `web-riippuvuudet.mjs` | web/lehti.json (lehtikuori, juuri main.js) |
| `paakaupungit.mjs`, `iso2.mjs` | staattiset taulut |

## Opetukset tästä vuorosta

- Ennen kuin viet webin apufunktion tuloksen pakettiin, **käytä pelin omaa
  funktiota** (aaniUrl, livianAaniOsoite, kohtaamiskuvaKohteelle,
  luennanOsoite…). Kaksi kertaa oma rekonstruktio olisi antanut väärän osoitteen
  (Livian versioitu polku, aikaleimojen vanhentuneisuus).
- **Datatiedosto ei ole voimassa vain siksi, että se on repossa:** tarkista
  sama ehto kuin peli (esim. tekstiSha256).
- **Mac-kuorma yli 400 polton aikana:** aja kohdennetut testit
  (`tests/sisaltopaketti.test.mjs tests/vienti.test.mjs` + moduulia koskevat)
  ja jätä koko sarja Julkaisijalle. Pitkät node-ajot: `timeout`, ja joihinkin
  -e-ajoihin `process.exit(0)`.
- **GeoTIFF-lukijan** (tools/maasto/geotiff.mjs) metodi on `korkeus(lon, lat,
  taso)`. Kommentin `naytteenKorkeus` on vanha nimi.
- **Parvet:** Sonnet-agentit lukevat ja luokittelevat (inventaario,
  rajapinnat, karttavalot), ja Siirtoseppä toteuttaa keskitetysti. Tarkista
  agenttien väitteet paketista ennen raporttia (esim. saannot oli jo tehty).
