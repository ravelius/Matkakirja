# TILANNE 8.10. klo 08.06

- **PT hyväksyi näytteen 4 linjan (08.0x) ja tilasi näytteen 5:** lumettoman värin sovitus naapuriruutuun (27° E:n pystyreuna) ja jyrkempi S-käyrä (puolivälin utu).
  **Jos pystyreuna katoaa eikä uusia virheitä tule, koko ajo käynnistetään ilman uutta kysymystä.** Ajetaan rinnakkain muistin sallimissa rajoissa: PhysMem unused > 20 Gt, nice 15, ei junakäännösten aikana.
  PT:lle lähetetään näytteen 5 kuvapari ja koko ajon arvioitu valmistumisaika.
- **Koodi valmis** (`TALVI_P5=1`, kopio ennen muutosta `-talvip4-20261008.mjs`):
  1. Ruudun lumeton väri sovitetaan jo kerättyyn lumettomaan väriin päällekkäisalueella (kvantiilit 20/80, a 0,85–1,18, |b| ≤ 0,03). Tulos tallennetaan `T.paljas`-kenttään; ruutu ilman päällekkäisyyttä on ankkuri.
  2. S-käyrä: smootherstep 0,40–0,60.
- **ODOTTAA TF 164:ää** (Julkaisija ilmoittaa). Sitten `kaudet/aja-talvip-nayte5.sh` irrotettuna (perl setsid), noin 40 min, ja vertailu:
  `python3 kaudet/vertaa-talvip.py kuvapari-talvip-nayte5-20261008.jpg "näyte 4" s2-eurooppa-talvip-nayte4 "näyte 5" s2-eurooppa-talvip-nayte5`.
- **Koko ajo:** `kaudet/aja-talvi3-osa.sh <osa> <x0> <x1>`, kaistat 1: 27–31, 2: 32–35, 3: 36–39 → `s2-eurooppa-talvi3-osaN/`. Ajo on jatkettava ja uusii 3 kertaa. Noin 54 lohkoa × 15 min ≈ 13–14 h.
  Valmistuttua: tarkista kaistarajojen saumat (x = 32 ja 36), koska `T.paljas` on prosessikohtainen. Paketti: `kokoa-kausi.py talvi v1 <p> "<osa1/laatat>:<osa2/laatat>:<osa3/laatat>"`, sitten LAHTEET.md ja Julkaisija.

---

# TILANNE 8.10. klo 08.0x

- **Näyte 4 VALMIS 08.03** (`s2-eurooppa-talvip-nayte4/`, kuva `kuvapari-talvip-nayte4-20261008.jpg`, näyte 3 | 4). TALVI_PKAIKKI=1: p 43–63 kuvasta per ruutu.
  Lumirajan suorakulmiot ovat suurimmaksi osaksi poissa. Jäljellä yksi suora pystyreuna lumettomalla alueella (n. 27° E, 51–52° N). Se on lumettoman värin ero, koska 12 värinäkymää ovat ruuduittain eri päiviltä. Puolivälin p näyttää paikoin utuiselta.
  PT:lle on raportoitu ja kysytty: näyte 5 (lumettoman värin sovitus naapuriin) vai koko ajo näytteen 4 linjalla (169 lohkoa, ~15 min/lohko, ~40 h yhdellä prosessilla).
  Julkaisijalle on ilmoitettu "valmis".
- **EI uusia ajoja ennen kuin Julkaisija ilmoittaa TF 164:n ladatuksi** (käännös 08.15–08.30).
- Vertailu: `python3 kaudet/vertaa-talvip.py <ulos.jpg> "<nimi A>" <kansio A> "<nimi B>" <kansio B>` (T7 iss-eurooppa-s2, z8-rajaus lohkoille 36_21, 37_21, 37_20).

---

# TILANNE 8.10. klo 07.2x

- **Näyte 3 valmis 07.23** (`s2-eurooppa-talvip-nayte3/`, kuva `kuvapari-talvip-nayte3-20261008.jpg`): suorakulmiot jäivät lähes ennalleen.
  Juurisyy: p lasketaan joka ruudulle eri päivistä (top-32 vähäpilvisintä), joten naapuriruutujen p hyppää. PT:lle on raportoitu.
- **AJOSSA: näyte 4** (`kaudet/aja-talvip-nayte4.sh`, PGID 41823, 07.25 alkaen, noin 45 min) → `s2-eurooppa-talvip-nayte4/`. Julkaisija antoi vuoron.
  Uusi lippu `TALVI_PKAIKKI=1`: p kaikista talvikuvista (pilvisyys < 80 %, ei top-N:ää), laskurit Uint16, SCL-luku 8 rinnakkain. Edellinen versio on tallessa (`-talvip3-20261008.mjs`).
  **Juna 164 käännös noin 08.15–08.30: EI uusia ajoja ennen kuin Julkaisija ilmoittaa TF 164:n ladatuksi.**
  Valmistuttua: kuvapari (näyte 3 | 4, `python3 kaudet/vertaa-talvip.py <ulos.jpg> "näyte 3" s2-eurooppa-talvip-nayte3 "näyte 4" s2-eurooppa-talvip-nayte4`), yksi rivi PT:lle ja "valmis" Julkaisijalle. Jos swap > 15 Gt, keskeytä.

---

# TILANNE 8.10. klo 07.1x (tilinvaihto)

- **Näyte 2 VALMIS 06.51** (`s2-eurooppa-talvip-nayte2/`, kuva `kuvapari-talvip-nayte2-20261008.jpg`): p SCL-kaistasta kaikista talvikuvista. PT hyväksyi linjan 06.xx.
  Muutama suorakulmio jäi. Syy: kun ruudun 12 näkymästä puuttui joko luminen tai lumeton näkymä, väri pakotettiin.
- **Korjaus tehty** `kausimosaiikki.mjs`:ään: puuttuva väri täydennetään ympäristöstä (normalisoitu sumennus r 40 × 2), ja sekoitus tehdään aina p:n mukaan.
  Testi (3 lohkoa: 36_21, 37_21, 37_20) oli ajossa tilinvaihdossa ilman setsidiä → todennäköisesti katkesi.
  **Aja uudelleen irrotettuna** (noin 40 min; tarkista lukko, ei junakäännöksen aikana):
  `TALVI2=1 TALVI_P=1 TALVI_ITA=1 KAUSI=talvi ULOS=<T7>/iss-eurooppa-s2/s2-eurooppa-talvip-nayte3 LOHKOT=36_21,37_21,37_20` (tila.json kopiona talvi2:sta, valmiit tyhjänä).
  Vertaa näyte 2:een (sama alue), lähetä yksi rivi PT:lle, ja koko ajo (169 lohkoa, noin 13 min/lohko → arvioi uudelleen, ehkä 20+ h; harkitse rinnakkaisuutta tai ovS-kerrointa) vasta kuittauksen jälkeen ja junien väliin.

---

# TILANNE 8.10. klo 05.4x

- **TALVI_P (lumitodennäköisyys) toteutettu** `kausimosaiikki.mjs`:ään lipun TALVI_P=1 taakse. Kopiot: `-talvip-20261008.mjs` (näyte 1) ja `-talvip2-20261008.mjs` (näyte 2).
  Näyte 1 (Puola–Ukraina–Karpaatit 3 × 3, x35–37 × rivit 20–22, 05.33): lumiraja on luonnollinen, mutta muutama ruudun muotoinen läikkä jää, koska p laskettiin 12 näkymästä.
  Kuva `kuvapari-talvip-nayte-20261008.jpg`, ja PT:lle on raportoitu.
- **AJOSSA: näyte 2** (`kaudet/aja-talvip-nayte2.sh`, PGID 92429, 05.34 alkaen, noin 1,5 h) → `s2-eurooppa-talvip-nayte2/`.
  p luetaan SCL-kaistasta kaikista talvikuvista (≤ 32 per ruutu), ja värit tulevat 12 näkymästä.
  Valmistuttua: kuvapari (talvi2e | näyte 1 | näyte 2) ja yksi rivi PT:lle.
  Koko ajo vasta PT:n kuittauksen jälkeen, junien väliin ja Natiivisepän kanssa sovittuna: `TALVI2=1 TALVI_P=1 TALVI_ITA=1 KAUSI=talvi ULOS=s2-eurooppa-talvi3`, kaikki 169 lohkoa, noin 10 h.
  Talvella ei rengasta. Paketti: `kokoa-kausi.py talvi v1 <p> "<talvi3/laatat>"`.

---

# TILANNE 8.10. klo 04.5x

**TALVI EI VIENTIIN (PT 04.4x).** Talvi2e (03.58) korjasi Itä-Euroopan ruutukuvion ja Mezeninlahden, mutta lumirajalla on MGRS-portaikko
(Tanska–Puola–Karpaatit), Mustanmeren pohjoispuolella lumi päättyy suoraan vaakaviivaan noin 46° N:ssä, ja Volgan suunnalla on ruskeita suorakulmioita.
Viemätön talvipaketti on poistettu. Kokeillut, toimimattomat korjaukset (ympäristöliput, oletuksena pois):
- `TALVI_JATKUVA=1`: lumipaino liukuman mukaan
- `TALVI_KAKSOIS=1`: 4 lumista + 4 paljasta näkymää

Molemmat jättävät ruuturajat.

## SEURAAVA TYÖ (PT): pikselikohtainen lumitodennäköisyyskooste

Tavoite: luonnollinen, epäsäännöllinen lumiraja ilman ruuturajoja.

1. **Kuvajoukko ruudulle:** kaikki talvien (2022–2025) näkymät, joissa pilviä < 50 %, enintään 16, ilman lumipainotusta. Sama säännöstö kaikkialla (ei lumiRaja- eikä TLUMI-sääntöä).
2. **Pikselikohtaiset arvot** kelpoista näkymistä:
   - `p` = lumisten (SCL 11) osuus
   - paljas väri = alempi mediaani lumettomista
   - luminen väri = mediaani lumisista
3. **Kertymä ruutujen yli:** p, paljas RGB ja luminen RGB kertyvät painotettuina samaan A-kertymään kuin nyt (uudet kanavat), joten päällekkäiset ruudut sulautuvat.
4. **Lohkon kokoamisessa:** p sumennetaan noin 3–5 km:n säteellä (normalisoitu laatikko × 3). Väri = mix(paljas, luminen, smoothstep(0,35; 0,65; p)). Jos toinen väri puuttuu, käytetään toista.
5. **Säilyvät:** järvijää (NE-järvet, nyt lumiT; vaihdetaan p:hen tai pidetään leveysasteena), Itämeren ja Vienanmeren merijää sekä reikätäyttö, vuonojen rantasääntö.

**Arvio:**
- Koodi ja testit noin 3–4 h: 3 testilohkoa rajalta (34_20, 36_21, 38_22) sekä pohjoinen (35_16) ja etelä (33_22).
- Koko talven uusinta 169 lohkoa 16 näkymällä noin 8–10 h. Muisti: keko 6 Gt, sisäistä levyä 36 Gi; yksi prosessi kerrallaan, ja levyvahti STOP alle 30 Gi:n.
- Ei junakäännöksen aikana: `cat /tmp/matkakirja-kaannospalvelu.lukko/kuka`.

Koodi: `kaudet/kausimosaiikki.mjs`. Talvi2e:n versio on tallessa (`-talvi2e-20261008.mjs`). Nykyisessä tiedostossa on lisäksi TALVI_JATKUVA- ja TALVI_KAKSOIS-liput (pois päältä).
Talven tulokset T7:llä: s2-eurooppa-talvi2(e/d/c/b), yleiskuvat `yleiskuva-talvi2*-z6.jpg`.

- **Valmiit:** syksy v1 ja kevät v1 ovat ämpärissä (kevät junassa 164, LS2). Worldview on tuotannossa.

---

# TILANNE 8.10. klo 02.1x

- **AJOSSA: TALVI2E** (`kaudet/aja-talvi2e.sh`, PGID 23889, 02.09 alkaen, 28 lohkoa, arvio noin 04) → `s2-eurooppa-talvi2e/`. Koodi: `kausimosaiikki-talvi2e-20261008.mjs`.
  PT kuittasi 02.2x: A = mannerilmaston lumiraja (TALVI_ITA=1: 54° N ≤ 15° E → 48° N ≥ 30° E), jolla Itä-Euroopan ruutukuvio korjataan, sekä Mezeninlahden merijään rajaus 42° E:hen.
  Talvi2d valmis 02.04: Grönlanti kunnossa (`yleiskuva-talvi2d-z6.jpg`).
  **Lopulliset kerrokset: talvi2e → talvi2d → talvi2c → talvi2.** Valmistuttua:
  1) Yleiskuva (neljännekset, erityisesti 48–57° N Puola–Venäjä ja Mezeninlahti).
  2) Yksi rivi PT:lle.
  3) Talvipaketti kokoa-kausi.py:llä (kerrokset yllä), LAHTEET.md ja Julkaisija.
  Jos ajo venyy yli klo 08:n, ilmoita Natiivisepälle (junakäännös).
- Syksy v1 ja kevät v1 ovat ämpärissä. Worldview on tuotannossa.

---

# TILANNE 7.10. klo 23.4x (TILINVAIHTO, VAIHTO NYT)

- **AJOSSA: TALVI2D** (`kaudet/aja-talvi2d.sh`, PGID 68005, 23.22 alkaen, 80 lohkoa, klo 23.4x tilanne 1/80, valmis noin 02.30; tila `kaudet/aja-talvi2d.out`) → `s2-eurooppa-talvi2d/`. Koodi: `kausimosaiikki-talvi2d-20261007.mjs`.
  Talvi2c (23.15) on muuten kunnossa: porrasneliöt ovat poissa, Perämeren reiät täyttyneet, eikä pilviä näy (`yleiskuva-talvi2c-z6.jpg`).
  Vika oli Grönlannin itärannikolla: koko meri oli jäätä, ja reunat seurasivat suorakulmaisesti S2-kattavuutta. Syy: dRanta-katto 36, joten ehto `dRanta <= 90` oli aina tosi.
  Talvi2d pitää merijään (ja reikätäytön) vain alueella 9–45° E, 53–67° N (Itämeri ja Vienanmeri). x34–39 × rivit 16–19 pysyvät talvi2c:ssä (kokonaan alueen sisällä).
  **Lopulliset kerrokset: talvi2d → talvi2c → talvi2.** Valmistuttua:
  1) Yleiskuva (sama skripti kuin talvi2c:lle, kerrokset yllä): tarkista Grönlanti (27_13–15), Jan Mayen, Norjan vuonot, Turun saaristo ja Perämeri.
  2) Yksi rivi PT:lle.
  3) Kuittauksen jälkeen `kokoa-kausi.py talvi v1 <_valmiit/s2-eurooppa-talvi-vienti-<pvm>> "<talvi2d/laatat>:<talvi2c/laatat>:<talvi2/laatat>" "<kuvaus>"`, LAHTEET.md (pohjana kevät) ja Julkaisija.
- Syksy v1 ja kevät v1 ovat ämpärissä (LS2:lle ilmoitettu). Worldview on tuotannossa.
- Ennen uusia polttoja: `cat /tmp/matkakirja-kaannospalvelu.lukko/kuka` (tyhjä = vapaa).

---

# TILANNE 7.10. klo 20.0x

- **AJOSSA: TALVI2C** (`kaudet/aja-talvi2c.sh`, PGID 50483, 19.09 alkaen, noin 4 h): rivit 13–20 → `s2-eurooppa-talvi2c/`. Koodi: `kausimosaiikki-talvi2c-20261007.mjs`.
  Talvi2b (18.57) HYLÄTTY: merijään laatikkosulkeminen teki porrasneliöitä ja levitti jäätä saaristoon. Talvi2c täyttää vain aidot reiät
  (komponentti ei koske reunaa ja on ≤ 20 000 px); reuna liukuu 8 px.
  Valmistuttua:
  1) Koko Euroopan yleiskuva kerroksista talvi2c → talvi2 (vertaa `yleiskuva-talvi2b-z6.jpg`): saumat, pilvet ja porrasneliöt (Turun saaristo, Vienanmeren itäranta 39_14–16).
  2) Yksi rivi PT:lle, kuittauksen jälkeen `kokoa-kausi.py talvi v1 <_valmiit/s2-eurooppa-talvi-vienti-<pvm>> "<talvi2c/laatat>:<talvi2/laatat>" "<kuvaus>"`, LAHTEET.md (pohjana kevät) ja Julkaisija.
- **KEVÄT v1 ÄMPÄRISSÄ** 20.02 (57 630 tarkistettu), ja LS2:lle on ilmoitettu. Syksy ja kevät ovat valmiit; jäljellä on talvi.
- Worldview on tuotannossa, ja syksy v1 on ämpärissä (LS2:lle ilmoitettu).
- **Omistaja 21.5x:** raskaat poltot eivät käynnisty junakäännöksen aikana. Ennen uutta polttoa tarkista `cat /tmp/matkakirja-kaannospalvelu.lukko/kuka` (tyhjä = vapaa). Käynnissä olevaa ajoa ei keskeytetä.

---

# TILANNE 7.10. klo 16.2x

- **WORLDVIEW TUOTANNOSSA:** #4140 mergetty 15.41 (00d33d4f), viivataso-osoitin 2026-10-07-viivat, natiivin aineistot ämpärissä (LS2 95cf8eb97 → juna 161). #4145 (Kyproksen pohjoisosa, Sisältökirjuri) mergetään perään. Worktreet poistettu.
- **SYKSY v1 ÄMPÄRISSÄ** (57 630, 14.48), ja LS2:lle on ilmoitettu (natiivin kausivalinta).
- **KEVÄT KUITATTU 16.0x, VIENTI KÄYNNISSÄ** (Julkaisija 16.0x, 6 osaa): `_valmiit/s2-eurooppa-kevat-vienti-20261007` → `s2-eurooppa/kevat/v1/`.
  Kun Julkaisija ilmoittaa: `aws s3 ls … kevat/v1 --recursive | wc -l` = 57 630, sitten viesti LS2:lle.
- **Uusi linja (PT 16.0x):** kuittaus yhdellä rivillä ilman kuvaparia. Laadun yleiskuvat (saumat, pilvet) tehdään silti.
- **TILINVAIHTO illalla 22–24:** luovutus pushattuna viimeistään 21.30. VAIHTO NYT -viestiin luovutus 10 minuutissa ja kuittaus yhdellä rivillä.
- **TALVI2B** ajossa (PGID 43109), rivit 13–20. Valmistuttua: z5-yleiskuva (saumat + pilvilaikut) ja kuvapari PT:lle, sitten paketti `kokoa-kausi.py talvi v1 <p> "<talvi2b/laatat>:<talvi2/laatat>"`.
- Omistaja 15.5x: natiivin testaus kevyemmin (koskee junia), karttaseppää ei muuta.

---

# TILANNE 7.10. klo 14.5x

- **AJOSSA (irralliset):**
  1) `kaudet/aja-talvi2b.sh` (PGID 43109, 14.45 alkaen, noin 6 h): rivit 13–20 → `s2-eurooppa-talvi2b/`.
  2) `aja-kevat-pohjoinen2.sh` (PGID 4649, 13.46 alkaen): rivit 13–17 → `s2-eurooppa-kevat-pohjoinen2/` + `kausi-rengas/kevat-pohjoinen2`.
- **Talvi2b, PT 13.5x:** Perämeren jää säilyy, mutta reiät täytetään ja reuna liukuu MERI-väriin. Värmlandin tumma ruutu korjataan ottamalla pohjoisessa pikseliin kirkkain luminäkymä, tai kirkkain näkymä jos lumikuvaa ei ole.
  Koodi: `kausimosaiikki-talvi2b-20261007.mjs` (kopio; talvi2-versio on `-talvi2-20261007.mjs`).
  Valmistuttua: z5-yleiskuva koko Euroopasta (saumahaku) + kuvapari PT:lle (`kuvapari.py`, sarake: kerrokset talvi2b → talvi2), PT kuittaa → `kokoa-kausi.py talvi v1 <paketti> "<talvi2b/laatat>:<talvi2/laatat>"`.
- **Worldview:** natiivin aineistot ovat ämpärissä (korkeus 1 531/1 531, geojsonit 200, maakunnat 2026-10-07a). Natiiviseppä/LS2: 95cf8eb97 junaan 161.
  Raja-paketin webosa on vielä viennissä. PR #4140:n merge ja viivatason osoitinvaihto tulevat Julkaisijalta. --paivita-commit fab6701c0 on tehty.
- **CYP:** linja D tehty. PT:lle kerrottu, että C:n lisenssiä ei löytynyt.

---

# TILANNE 7.10. klo 14.xx

- **Worldview + CYP admin-1 VALMIIT, viennit Julkaisijalla.** PR #4140 (haara karttaseppa-raja-worldview, kärki ab0e9d136). Paketit:
  - `_valmiit/raja-worldview-vienti-20261007` (ajossa 13.03 alkaen, noin 2–3 h)
  - `natiivi-maarajat-vienti-20261007` (.geojson-MIME lisätty)
  - `maakunnat-cyp-vienti-20261007` (2026-10-07a: Pohjois-Kypros CYP:n alueeksi "Kyproksen pohjoisosa", linja D; vaihtoehto C:n lisenssiä ei löytynyt)
  **Kun Julkaisija ilmoittaa:**
  1) Tarkista ämpäri (taustavahdin neljä polkua) ja ilmoita LS2:lle (vakiot proto linssiseppa2/swe-rajat 95cf8eb97 junaan 161; jos LS2 on poissa, Natiivisepälle).
  2) Maakuntapaketin jälkeen `node tools/vienti/maakuntarajat.mjs --paivita` worktreessä ja commit #4140:ään.
  3) Viivatason osoitinvaihto (viivataso-2026-10-07.json) Julkaisijalla.
  Sisältökirjurille [de21d1] on pyydetty CYP "Kyproksen pohjoisosa" -luonnehdinta ja pulu omaan PR:äänsä.
- **Talvi2 VALMIS 13.46**, kuvapari PT:lle (`kuvapari-talvi2-20261007.jpg`). Odottaa PT:n kuittausta, jonka jälkeen talvipaketti: `kokoa-kausi.py talvi v1 <paketti> <talvi2/laatat> "<kuvaus>"` (talvella ei rengasta).
  Kysytty PT:ltä: pidetäänkö Perämeren jää vai palautetaanko avomeri MERI-väriin.
- **Kevät rivit 13–17** ajossa (alkoi 13.46, noin 2,5 h) → `s2-eurooppa-kevat-pohjoinen2` + `kausi-rengas/kevat-pohjoinen2`. Sitten kuvapari (sarake kevat2) ja kevätpaketti.

---

# TILANNE 7.10. klo 13.1x (TAUKO 13.45–15.00)

- **WORLDVIEW KUITATTU (PT 13.0x, koko _swe).** PR https://github.com/ravelius/Matkakirja/pull/4140 (haara karttaseppa-raja-worldview).
  Vientipyyntö Julkaisijalle 13.0x:
  1) `_valmiit/raja-worldview-vienti-20261007` (--kuiva ok).
  2) Tuotannon `julisteet/pyramidi/pyramidi.json`:n viivataso-kenttä = `pyramidi-poltto/worldview-2026-10-07/viivataso-2026-10-07.json`.
  3) `_valmiit/natiivi-maarajat-vienti-20261007` (.geojson-MIME puuttuu vie-paketti.sh:sta).
  4) PR #4140:n merge vientien jälkeen.
  LS2:lle lähetetty 13.0x vakiot junaan 161 (KorkeusVersio/WebVersio 2026-10-07-swe(-korkeus), Maaraja-polut 2026-10-07).
  Kun Julkaisija ilmoittaa viennin valmistuneen: viesti LS2:lle, että sarjat ovat ämpärissä.
- **SEURAAVA TYÖ (PT): admin-1 CYP.** Kyrenia omaksi alueekseen, pohjoiset osat Famagustan ja Nikosian alueisiin, Kyrenian sisältö Sisältökirjurille.
  MAR ja SOM myöhemmin (VAIN EUROOPPA). Tarkista lisäksi, että maahaku käyttää admin-0:aa (worldview) eikä maakuntadata ohita sitä.
  **PT 13.1x:** ensin C = Kyproksen avoin data (CC BY 4.0, piirikuntarajat). Jos sitä ei löydy, D = NE:n pohjoinen alue yhtenä CYP-alueena nimellä "Kyproksen pohjoisosa". A (ODbL) ja B (SALB) EIVÄT KÄY.
  LS2:n natiivivakiot ovat valmiina: proto linssiseppa2/swe-rajat 95cf8eb97. Kun sarjat ovat ämpärissä, viesti LS2:lle; jos LS2 on tauolla, SHA Natiivisepälle junaan 161.
  Tilanne 13.07: 2026-10-07-swe-korkeus on ämpärissä, swe ja geojsonit eivät vielä.
  **LÄHDEONGELMA (13.0x):** NE admin-1:ssä Pohjois-Kypros on yksi alue ilman piirikuntia. geoBoundaries gbOpen (OSM) on ODbL, gbAuthoritative on UN SALB.
  Ensin etsitään Kyproksen avoin data (CC BY 4.0, Department of Lands and Surveys); data.gov.cy:n CKAN-API ei vastannut.
  Lähteet: `tools/vienti/maakuntarajat.json.gz` (NE admin-1, CYP 5 aluetta), `tools/tee-maakuntavektorit.mjs`, `tools/krim-ukrainalle.mjs` (admin-1-malli: krimUkrainalleAdmin1).
- **Talvi2 VALMIS 13.46** (169/169, `s2-eurooppa-talvi2/`): seuraavaksi ennen–jälkeen-kuvapari PT:lle (`kaudet/kuvapari.py nyt,talvi,talvi2 …`, rivit tukholma, laatokka, alta, skane, skandi, alpit), ja tarkista Tukholman sauma, lumeton laikku ja Laatokan reuna. Kevät rivit 13–17 alkoi 13.46 (irralliset, jatkuvat tauon yli). **Syksyn vienti** Julkaisijalla (51 109 / 57 630 klo 13.0x).

---

# TILANNE 7.10. klo 13.0x

- **WORLDVIEW-KORJAUS (PT 7.10., korkea prioriteetti), odottaa PT:n kuittausta, EI VIETY.** Juurisyy: natiivin
  `Vektorikerros.KorkeusVersio` "2026-09-25-gshhs-korkeus" on tehty ennen 30.9. Krim-korjausta, joten Perekopin viiva oli mukana.
  Uusi lähde on NE `_swe` (`tools/worldview.mjs`). Haara `karttaseppa-raja-worldview` fe4112c9b (worktree /Users/Shared/Claude/wt/).
  Aineistot ovat kansiossa `pyramidi-poltto/worldview-2026-10-07/`:
  vektorit-2026-10-07-swe (web), vektorit-2026-10-07-swe-korkeus (natiivi), maapolygonit.geojson, maamaa.geojson,
  lavastus-viivat (2 181 deltalaattaa → julisteet/pyramidi/2026-10-07-viivat/viivat/) ja viivataso-2026-10-07.json
  (luettelon uusi viivataso-kenttä: delta-perus 2026-09-27-viivat, laatastoon +2 bittiä). Kuvat ja laattalista: MUUTOKSET.md.
  Viivataso poltettiin worktreellä /Users/Shared/Claude/wt/karttaseppa-viivat-20261007 (30.9. koodi 9ec231e0c + uusi rajaviivasto, `--eipiirit`).
  Kohinalaatat (piirron reunanpehmennys) jätettiin vanhoiksi: rajaa-delta.py.
  Avoin kysymys PT:lle: maakunnat (admin-1) CYP (Kyrenia) ja MAR (Länsi-Sahara). Kuittauksen jälkeen: paketit _valmiit-kansioon,
  .geojson-MIME Julkaisijalle, JS-PR (PALLOVEKTORIT_VERSIO, maapolygonit.json) ja natiivin vakiot LS2:lle.
- **Talvi2** 146/169 (13.0x), kevät rivit 13–17 perässä. **Syksyn vienti** ämpärissä 51 109 / 57 630 (Julkaisija jatkaa).

---

# TILANNE 7.10. klo 12.0x (uudelleenkäynnistyksen jälkeen)

- **AJOSSA:** `kaudet/aja-talvi2.sh` (PGID 4645) jatkoi 11.56 tilasta 120/169. `aja-kevat-pohjoinen2.sh` (PGID 4649) odottaa sen VALMIS-merkkiä.
  Varmuuskopio `s2-eurooppa-talvi2/tila.varmuus.json` minuutin välein.
- **Syksyn vienti KESKEN:** ämpärissä 50 505 / 57 630 (osat 2/6 ja 3/6 puuttuvat lokista). Julkaisijaa pyydetty 12.0x ajamaan vie-paketti uudelleen.
  Valmistuttua: tarkista määrä (`aws s3 ls … syksy/v1 --recursive | wc -l` = 57 630), sitten viesti LS2:lle (natiivin kausivalinta).

---

# TILANNE 7.10. klo 10.5x (Macin uudelleenkäynnistys noin 11.05)

- **Talvi2 keskeytyy uudelleenkäynnistyksessä tilassa 97/169** (`s2-eurooppa-talvi2/`). Jatkuu `tila.json`:sta. Varmuuskopio `tila.varmuus.json` minuutin välein:
  jos `tila.json` ei ole ehjä JSON, kopioi varmuus sen päälle. **Uudelleenkäynnistyksen jälkeen** (T7 kiinni, `ps`: ei omia ajoja) käynnistä molemmat perl setsid -kaavalla kansiossa `kaudet/`:
  `aja-talvi2.sh` (ehdot täyttyvät heti → jatkaa) ja `aja-kevat-pohjoinen2.sh` (odottaa talvi2:n VALMIS-merkkiä). Talvi2:ta on jäljellä noin 3–4 h.
- **Syksyn vienti** `s2-eurooppa/syksy/v1/` ajettiin Julkaisijan taustalla 04.0x alkaen. Varmista Julkaisijalta, että se valmistui (laatat.json 200), ja ilmoita sitten LS2:lle.
  LS2 hyväksyi polun `s2-eurooppa/<kausi>/v1` (kaudet syksy, talvi, kevat) ja tekee natiivin kausivalinnan.
- Talvi- ja kevätpaketit: `kaudet/kokoa-kausi.py talvi v1 …` ja `kevat v1 …` kuvaparien ja PT:n kuittauksen jälkeen.

---

# TILANNE 7.10. klo 04.1x

- **AJOSSA (irralliset, perl setsid):**
  1) `kaudet/aja-talvi2.sh` (PGID 75430) alkoi 04.03 → `s2-eurooppa-talvi2/` (169 lohkoa, ei rengasta), valmis noin klo 10 (`aja-talvi2.out`).
  2) `kaudet/aja-kevat-pohjoinen2.sh` (PGID 76237) odottaa talvi2:n VALMIS-merkkiä ja ajaa sitten kevään rivit 13–17 (JÄRVI) →
     `s2-eurooppa-kevat-pohjoinen2/` + `kausi-rengas/kevat-pohjoinen2/` (PT 7.10. 02.xx). Arvio noin 2,5 h.
- **Syksy A2 VALMIS 04.02** (`s2-eurooppa-syksy-A2/` + `kausi-rengas/syksy-A2/`), kuvapari `kuvapari-syksy-A2-20261007.jpg` lähetetty PT:lle.
  Järvet ovat kunnossa. Tilkkuja on vielä vähän (Pohjois-Lappi 67,5° N, Ruotsin keskiosa), ja Lokka on ruskea. Ehdotettu vientiä, tilkut seuraavalle kierrokselle.
- **SYKSYN VIENTIPAKETTI VALMIS (PT kuittasi vientiin 04.xx):** `proto-3d/_valmiit/s2-eurooppa-syksy-vienti-20261007`
  → `linssit/astronautin-kamera/s2-eurooppa/syksy/v1/` (sama jako kuin v2; 57 629 laattaa + laatat.json; --kuiva ok).
  Polku kysytty LS2:lta 04.4x. Kun LS2 kuittaa (tai PT hyväksyy), Julkaisija vie. Työkalu `kaudet/kokoa-kausi.py <kausi> v1 <paketti> <kerrokset> "<kuvaus>"`.
- **TALVI2-koodi (testattu 4 + 2 lohkolla):** lumi ensin (> 53° N) ja lumen mediaani leveysasteliukumalla 54→57° N.
  Isot järvet jäätyvät kokonaan NE-järvimaskilla (`ne_10m_lakes`; 0,9 × JAA + 0,1 × S2). Pienet järvet: tumma pikseli → JAA.
  Jäätyviin järviin ei sumeaa vesiväriä. Vuonoissa jää-sääntö ohitetaan S2-maalle 3 km:n päähän rannasta, ja talven rantasumennus on 0,2–1,2 km.
  Kuvat `kuvapari-talvi2-testi-20261007.jpg` ja `kuvapari-talvi2-jarvijaa-20261007.jpg`.
- **Valmistuttua:** kuvaparit ennen ja jälkeen PT:lle (`kaudet/kuvapari.py`; sarakkeet talvi, talvi2, kevat; kevät-pohjoinen2-sarake lisättävä).
  PT:n tarkistettavat talvi2:ssa: Tukholman z7-pystysauma, lumeton laikku vasemmassa alakulmassa ja Laatokan reuna. Jäännökset kirjataan seuraavaan kierrokseen, eivätkä ne estä vientiä.
- PT 7.10.: junakäännökset ajavat nice 0/10, eikä karttaajoja tarvitse enää pysäyttää käännösten ajaksi.
- Hylätyt kansiot (talvi 6.10., syksy-sovitus, syksy-sovitusA) poistetaan vain luvalla.

---

# TILANNE 6.10. klo 23.4x (TILINVAIHTO, omistaja)

Euroopan kaudet (kevät/syksy/talvi), PT:n kuvaparierä. **Mitään ei ole viety.** T7 = `/Volumes/T7 4TB/Matkakirja-karttaseppa`.

- **AJOSSA (irrallinen, perl setsid, PGID 6564):** `iss-eurooppa-s2/kaudet/aja-syksy-sovitusA.sh` → syksyn rivit 13–19 (91 lohkoa)
  kansioon `s2-eurooppa-syksy-sovitusA/`, sitten rengas → `iss-maailma-s2/kausi-rengas/syksy-sovitusA/`. Valmis noin klo 0.30.
  Tila: `kaudet/aja-syksy-sovitusA.out` (VALMIS/VIRHE). Uusintakierrokset sisältyvät skriptiin.
- **Seuraava askel:** kuvapari PT:lle samoilla riveillä kuin `iss-eurooppa-s2/kuvapari-kaudet-20261006-b.jpg`
  (Alpit z7, Skandinavia z6, Pohjois-Lappi z7 (23, 69,3), Lappi z8 (20, 68,5); nyt/kevät/syksy). Syksyn kerrokset:
  `kausi-rengas/syksy-sovitusA : s2-eurooppa-syksy-sovitusA/laatat : kausi-rengas/syksy : s2-eurooppa-syksy/laatat`.
  Kevään kerrokset: `kausi-rengas/kevat-pohjoinen : s2-eurooppa-kevat-pohjoinen/laatat : kausi-rengas/kevat : s2-eurooppa-kevat/laatat`.
  Kuvaparin teko-ohjelma löytyy transkriptista. Lyhyesti: z(L, zoom, lon, lat, nx, ny, T) liittää laatat ensimmäisestä kerroksesta, josta laatta löytyy.
  `kaudet/nak.py` piirtää alueen lon/lat-ruudukolla.
- **Tehty 6.10.:**
  - `kausimosaiikki.mjs`: POHJ-sääntö. Yli 65° N:n ruuduissa keväällä ja syksyllä haetaan vähälumiset näkymät myös kauden jatkeelta, ja lumi painaa kolminkertaisesti.
  - Kevät ja syksy, rivit 13–16 → `s2-eurooppa-<kausi>-pohjoinen` + `kausi-rengas/<kausi>-pohjoinen`. Kevään Lapin lumineliöt ja jäinen Torneträsk ovat poissa; PT hyväksyi kevään.
  - MAASOVITUS (`MAASOVITUS=1 RUUDUT=…`): A sovittaa ruudun näkymät ruudun mediaaniin (poistaa ratarajat). B on ruutujen välinen ketjusovitus.
    B ajelehti itään (Venäjä punaruskea, Laatokka purppura), joten se HYLÄTTIIN; ajetaan vain `SOVITUS_B=0`.
    Hylätyt kansiot `s2-eurooppa-syksy-sovitus/` ja `kausi-rengas/syksy-sovitus`; poistetaan vain luvalla.
  - Jälkikäteinen `kaudet/ruututasaus.mjs` (kerroin/affiini) HYLÄTTIIN: UTM-päällekkäisalueet katkaisevat ketjun, ja syntyi pystyraitoja.
- **Talvi:** uusinta valmis 6.10. klo 22.27 (169/169, `s2-eurooppa-talvi/`). Talvea ei ole vielä katsottu eikä kuvaparitettu.
- **Kanadan meri (korjaus5):** jäi viemättä (PT). LS2 sävyttää sovelluksessa BMNG:n meren S2:n MERI-väriin (haara linssiseppa2/s2-meri 0f6e4e89).
  Paketti on arkistoitu T7:lle `iss-maailma-s2/korjaus5-ei-viety-20261006/` (pois `_valmiit`-kansiosta).
- **Avoimet:** PT:n päätös syksyn kuvaparista, ja sitten omistajan päätös kausista. Kausien vienti on suunnittelematta (polut, LS2).

---

# TILANNE 6.10. klo 11.0x

- **VIETY 5.–6.10.:** S2-maailma v2 kaikki alueet + laatat.json (tropiikki 5.10. 18.04); v2-korjaus (rengas) 5.10. 19.04;
  s2-eurooppa/v2 (rengas) 5.10. 19.42; **s2-maailma/v2-korjaus2** 6.10. 11.01 (4 aluetta, 303 496 laattaa: WorldCover-tasaus,
  järvisääntö, rengas + PIKKU). S2-indeksi v2b, v2c, v2d, v2e (Meksikon suisto rata X).
- **Paikalliset:** v2-korjaus2b/ (viety sarja), v2t2/ (tasaus 2), v2-rengas3/; tasaus.mjs, tasaus-kentta.mjs, rengas.mjs.
  Vanha kesken jäänyt kansio v2-korjaus2/ jäi T7:lle, ja sen poisto odottaa lupaa (turvatarkistus esti rm:n).
- **Korjauskerrokset (6.10. 11.36, Julkaisija):** s2-maailma/v2-korjaus3/ (Eyre, 14) ja s2-eurooppa/v2-korjaus1/ (Madeira, 10).
  LS2:n natiivi lukee ketjun v2-korjaus3 → v2-korjaus2 → v2 ja Euroopan kerroksen (9479a9ee), joten pienet korjaukset menevät
  jatkossa uutena kerroksena (v2-korjaus4, v2-korjaus2 jne.) vie-paketti.sh:lla.
  Työkalut: paikka-otto.mjs (selkeät otot, pikselikohtainen valinta) ja PIL-viimeistely, koska jpeg-js tummentaa noin 1 DN per kierros.
- **6.10. 12.08 viety (Julkaisija):** s2-maailma/v2-korjaus4/ (Amazonin itäkaista + Sumbawa: sauma.mjs ja kaista.mjs, 161 laattaa) ja
  S2-indeksi v2f (11RQQ:n varakuvan savy). v2f:n osoitinvaihto (LS2) vasta junan 147 VIE:n jälkeen; v2-korjaus4 LS2:n ketjuun junassa 149.
- **Jäännökset (PT: ei uusia kierroksia):** Amazonin ja Sumbawan ohuet saumaviivat (mosaiikin reunajuova). S2-erät ovat suljettu.
- **Työkalut:** tasaus.mjs, tasaus-kentta.mjs, rengas.mjs, paikka-otto.mjs (selkeät otot), sauma.mjs (saumapehmennys),
  kaista.mjs (monikulmiotasaus) ja viimeistele-png.py (PIL-pakkaus ilman 1 DN:n vinoumaa, aina viimeinen vaihe).

---

# TILANNE 5.10. klo 06.5x (LOPULLINEN, tilinvaihto 99 %)

- **Tropiikki v2e:** osa-ajot PID 45738/45742/45745/45748, kukin noin 12/47 lohkoa (yhteensä 8 + 47 = 55/196). Noin 14 min per lohko per osa → valmis noin klo 15–16.
  Valmistuttua: tilat yhteen, tarkistus, kuvapari Karibia + Indonesia PT:lle, sitten `touch iss-maailma-s2/v2/tropiikki/tarkistettu.ok` → omistajan vienti (PID 4918) vie ja kirjoittaa laatat.json → ilmoita LS2:lle (polun vaihto luvallinen) ja rivi PT:lle.
- **Korjaussarja v2e:** P-Afrikka 10/10 ja Aasia 28/28 valmiit; Amerikka 48/68 (PID 34664).
- **S2-indeksi v2b (sävytasaus):** `aja-v2b.sh` PID 80467, tropiikki 1 600/1 802, sitten eurooppa → P-Afrikka → amerikka → aasia (valmis noin klo 8–9).
  Sitten `VERSIO=v2b python3 maailma-json.py`, kuvapari v2 vs. v2b (`tci-kooste.mjs` soveltaa savy-kenttää) PT:lle ja vienti vie-paketti.sh:lla polkuun `s2-indeksi/v2b/` (LAHTEET.md). LS2:n koodi on valmis, ja hän vaihtaa version kuittauksen jälkeen.
- **S2-indeksi v2c vaihe 1 (ehdokkaat):** `aja-v2c-ehdokkaat.sh` PID 25172, eurooppa 400/2 177, valmis noin klo 10–11. Vaihe 2 (naapurisovitus + avomeren himmein kohtaus) on kirjoittamatta, ks. alla.
- **Euroopan kausiketju:** syksy 48/169 (PID 13778), sitten talvi uudella koodilla.

---

# Karttasepän luovutus 5.10.2026 klo 06.0x (viikkoraja 97 %, tilinvaihto noin 07.15)

Ajot jatkuvat ilman sessiota. Ne on käynnistetty perl fork+setsid -kaavalla. Tarkista `ps` ennen uudelleenkäynnistystä, ja lopeta prosessi vain omalla PID:llä.
Vanhemmat vaiheet: `viesti-karttaseppa-luovutus-20261002.md` (päivitykset 2.–4.10.).

## VALMIIT JA VIEDYT (ei toimia)

- **Kuvauspaikat v1:** 25 paikkaa, `linssit/astronautin-kamera/kuvauspaikat/v1/`. LS2:n natiivi käyttää niitä.
- **S2-indeksi v1:** `s2-indeksi/v1/maailma.json` + 5 alueindeksiä.
- **S2-indeksi v2 (5.10. 06.3x):** `s2-indeksi/v2/`. Aukollisiin ruutuihin lisätty toisen radan kuva (rata luetaan tuotenimestä `_R###_`). Aukollisia ruutuja 3 269 → 1 215. LS2 vaihtaa `S2Maailma.Versio` → v2.
- **S2-maailma v2 (BOA-offset v2d + merijää v2c):** Amerikka, P-Afrikka ja Aasia+Australia viety polkuun `s2-maailma/v2/` omistajan skriptillä `pyramidi-poltto/vie-s2-maailma-v2.sh` (PID 4918). Skripti odottaa tropiikin tarkistusmerkkiä `iss-maailma-s2/v2/tropiikki/tarkistettu.ok` ja kirjoittaa sen jälkeen `laatat.json`:n.
  - Päätoimittaja hyväksyi lopputarkistuksen.
  - LS2 saa vaihtaa polun, kun tropiikki ja laatat.json ovat ämpärissä. Ilmoita silloin LS2:lle suoraan ja rivi Päätoimittajalle.
- **Eurooppa:** s2-eurooppa/v1 on ehjä (v2 = v1 pikseleittäin), ei uutta vientiä.

## KÄYNNISSÄ

- **Tropiikki v2e** (koko alue uudelleen, PT:n päätös): 4 osa-ajoa, PID:t 45738, 45742, 45745 ja 45748. Ne kirjoittavat kansioon `iss-maailma-s2/v2/tropiikki`.
  - Osat: `osa{0..3}.txt` ja tilat `tila-osa{0..3}.json` (env `TILATIEDOSTO`); 8 ensimmäistä lohkoa ovat `tila.json`:ssa.
  - Tilanne klo 06: noin 7–8/47 per osa; yksi lohko kestää noin 14 min, valmis noin klo 17–18.
  - Valmistuttua: tarkistus (`esik.py`-malli + z8-otokset Karibia ja Indonesia), kuvapari Karibia + Indonesia PT:lle, sitten `touch v2/tropiikki/tarkistettu.ok`, jolloin vienti jatkuu automaattisesti.
- **Korjaussarja v2e** (läikkäkorjaus jo viedyille alueille): `iss-maailma-s2/v2e/<alue>`, lohkolistat `koe-laikka/listat/<alue>-10.txt`.
  - P-Afrikka 10/10 valmis. Amerikka (PID 34664, 35/68) ja Aasia (PID 34672, 22/28) ajavat nice 19:llä.
  - Valmistuttua: kuvapari PT:lle, sitten `touch v2e/tarkistettu.ok` ja omistajan Run-rivi `pyramidi-poltto/vie-s2-maailma-v2-korjaus.sh`. Skripti vie polkuun `s2-maailma/v2-korjaus/` ja kirjoittaa `korjaus.json`:n (bittikartta, `v2e/korjaus-json.py`).
  - Run-rivi: `cd /Users/Shared/Claude/pyramidi-poltto && perl -e 'use POSIX "setsid"; exit if fork; setsid(); open STDIN,"</dev/null"; open STDOUT,">>","vie-s2-maailma-v2-korjaus.log"; open STDERR,">&STDOUT"; exec "zsh","vie-s2-maailma-v2-korjaus.sh"'`
- **S2-indeksi v2b** (täytekiilan sävytasaus, PT 5.10.): `iss-s2-indeksi/aja-v2b.sh` (PID 80467) → `savytasaus.mjs <alue>` → `iss-s2-indeksi/v2b/`.
  - Valmistuttua: `VERSIO=v2b python3 maailma-json.py`, kuvapari v2 vs. v2b (20MRB, 20MRC, 28SCA + yksi Euroopan ruutu) PT:lle.
  - `tci-kooste.mjs` pitää laajentaa soveltamaan `savy`-kenttää ennen kuvaparia.
  - **Odota LS2:n laitekuvia (20MRC ja Kanaria) ennen vientiä.**
- **S2-indeksi v2b LAAJENNETTU (PT 5.10. 06.2x, LS2:n laitekuvat `lokit/linssiseppa2-maailma-10c31692/kuvat`).** Ongelmat: 20MRC lievä pystysauma ja samea täyte, 28SCA suorat heijastussaumat avomerellä, Meksikon suisto 11SPR (2024-08-27) vs. 11SQR (2023-07-01) vaalea suorakulmio.
  **PT:n järjestys 06.3x:** v2b = vain sävytasaus (osa 1, valmis noin 08), sitten v2c = osat 2 ja 3 (uusi polku `s2-indeksi/v2c/`, naapurin sama datatake, pisteet enintään noin 25 % huonommat). Kuvapari kummastakin PT:lle ennen LS2:n juuren vaihtoa (11SPR/11SQR, 20MRC, 28SCA + yksi Eurooppa).
  Osat:
  1) **Sävytasaus** täytekuvalle (käynnissä, `savytasaus.mjs`, kenttä `valinta.savy`).
  2) **Naapuriruuduille sama ottopäivä tai rata:** ehdokaslistat haetaan uudelleen (`s2-indeksi-v2.mjs`:n `ruutu()`-ehdokkaat tallennettava välimuistiin), sitten naapurisovitus. Valinta 0 vaihdetaan naapurin kanssa samaan datatakeen (sama päivä + satelliitti, tai sama rata), jos pisteet ovat enintään noin 25 % huonommat. Arvio 3–4 h STAC-hakuja.
  3) **Avomeren ruuduille vähäheijasteinen kohtaus:** mittaa TCI-yleiskuvan vesipikselien kirkkaus (tai käytä aurinkogeometriaa `view:sun_elevation`/`view:sun_azimuth`) ja valitse himmein.
  **v2c vaihe 1 KÄYNNISSÄ (06.3x):** `iss-s2-indeksi/aja-v2c-ehdokkaat.sh` → `s2-indeksi-v2c.mjs` (tallentaa `ehdokkaat` 20 kpl/ruutu) → `v2c/valinnat3*.json`, valmis-merkki `ajo-v2c-ehdokkaat.valmis` (noin 3–4 h). Vaihe 2 (kirjoitettava): naapurisovitus ehdokkaista ja avomeren himmein kohtaus → `v2c/indeksi*.json` + `VERSIO=v2c python3 maailma-json.py`.
  Lopuksi kuvapari v2 vs. v2b PT:lle (20MRB, 20MRC, 28SCA, 11SPR/11SQR + yksi Euroopan ruutu), sitten vienti vie-paketti.sh:lla. LS2 vaihtaa version.
- **Euroopan kaudet:** `iss-eurooppa-s2/kaudet/ketju-kaudet.sh` (PID 52116); syksy käynnissä (PID 13778, 41/169), sen jälkeen talvi.
  - Kausiskriptiin lisätty 5.10.: merimaski, napasäännöt, v2e ja kevään lumenvälttely.
  - Kevät valmis (169/169) ja pohjoiskorjaus (65 lohkoa) tehty. Tarkistettu: lumineliöt ja merijää poissa. Avoin: yksi Onegan suunnan järvi punertava.
  - Syksy ajaa vanhalla koodilla, joten sen napalohkot tarkistetaan valmistumisen jälkeen.
  - Talven käyttöönotosta päättää omistaja kuvaparin perusteella.

## SKRIPTIT JA OPIT

- **BOA-offset (v2d):** Earth Searchin 04.00-näkymistä osa on +1000 DN, eikä lippu ole luotettava, joten offset mitataan näkymäkohtaisesti. Muistissa: `s2-earth-search-baseline-04-offset`. TCI:hin vika ei vaikuta.
- **maailmamosaiikki-v2e.mjs** = v2d + v2c (merijää) + v2e (alle 200 px:n saaret eivät ole rannikkoa). Lisätilat: `DIAG04`, `MGRSLISTA`, `PIKKUSAARET` ja env `TILATIEDOSTO`.
- **vie-paketti.sh** ei ylikirjoita mitään, joten jokainen päivitys menee uuteen polkuun tai tiedostoon.
- **Isot laattasarjat** viedään omistajan Run-skriptillä (aws s3 sync). vie-paketti on liian hidas 91 000 laatalle.
- **Heredocit,** jotka kirjoittavat JS-koodia: aina lainattu `<<'PY'` ja `node --check` heti muokkauksen jälkeen (muisti `heredoc-js-lainaus`).

## AVOIMET

- **Tropiikki v2e, tunnetut jäännökset (PT hyväksyi vientiin 5.10. 17.0x, ei korjata nyt):**
  - Amazonin itäosan vaalea ratakaista (z8, noin 58–57° W, 1–2° N): tasauksen viite ESA WorldCover 2021 on itse usvaisempi itään päin.
  - Sumbawan suora maasauma (z8).
  - Palataan, jos löytyy parempi viite (esim. tuoreempi pilvetön S2-vuosikomposiitti).
  - Menetelmä: `iss-maailma-s2/tasaus.mjs` (k7-asetukset: SIGMA_M 1500, ALA 0,6, YLA 1,6, USVA 1,6, SINI 99, varakorjaus) ja K-kenttä `tasaus-kentta.mjs` (σ 250 km).
    Lisäksi järvet MERI-väriin, `rengas.mjs` (KYNNYS 0, pilvet merellä vedeksi) ja aukkotäyttö kahdella näkymällä (`maailmamosaiikki-v2e.mjs`, POISSULJE-env).
  - Alkuperäiset laatat: `v2/tropiikki/laatat-v2e-alkuperainen`.
- **S2-indeksi v2c (17.48) ja v2d (17.58) viety** (Julkaisija). v2d = v2c + Colorado-suisto: 11SPR ja 11RPQ valinta 0 = S2B 2025-07-30.
  11SPR:n maalle jää radan reunan sauma (märkä muta vs. kuiva suola), eikä savy (v2e) auta. LS2 tarkistaa simukuvasta.
  Jos sauma näkyy: koko 11SPR:n ja 11SQR:n länsiosan kattavat datatakit, esim. S2A 2022-10-22, S2B 2025-11-30 ja S2A 2025-01-09 (11SPR nodata 0, 11SQR 55 %);
  sauma siirtyisi Gran Desierton dyyneille. Tarkista myös 11RPQ ja 11RQQ.
- **Rengaskorjaus viety (PT hyväksyi 18.2x; omistajan Run `pyramidi-poltto/vie-rengaskorjaus-20261005.sh`):** s2-maailma/v2-korjaus/ + korjaus.json
  (P-Afrikka, Amerikka, Aasia, myös v2e-läikkäkorjaus) ja s2-eurooppa/v2/ (Euroopan jako, 36 167 korjattua). LS2:lle Euroopan polku vasta viennin jälkeen.
  Varmuuskopiot: v2e/<alue>/laatat-ennen-rengas.
- **SEURAAVA ERÄ (PT 18.2x, ei pidätä vientiä):**
  1) Madeiran itäosan paksu pilvi saarella: etsi selkeä otto ja ruudun uusinta Euroopan mosaiikkiin.
  2) Lanzaroten pohjoispuolen pistejono ja kaksi täplää: pilvihaamujen jäänteet. Rengaskorjaukseen pienet "maa"-komponentit merimaskin sisällä vedeksi.

- Bahaman suurten matalikkojen turkoosi puuttuu. PT toivoo batymetriaan perustuvaa ratkaisua myöhemmin.
- Aluekohtainen tci_lut (aavikko) tehdään LS2:n esimerkkikuvien perusteella.
- Saaret-haara ja Euroopan pyramidi z11: ennallaan, ks. 2.10. luovutus.
