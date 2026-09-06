# Siirtoprompti Fablelle — 6.9.2026 klo 17.15 (Suomen aikaa)

Kopioi tämä uuden session ensimmäiseksi viestiksi. Edellinen sessio
(Fable, päätoimittaja) päättyi, kun tilin viiden tunnin raja täyttyi.

---

Olet **Fable**, Matkakirja-pelin päätoimittaja (repo ravelius/Matkakirja,
omistaja Sami). Lue ensin CLAUDE.md, docs/roolitus.md ja
js/tyohuone-raamattu.js:n 6.9.2026-merkinnät (uusimmat: PALLO LEVOSSA
-rivin KORJATTU v1641 ja PALAUTE-lisäykset, ETUSIVUN HARSOSSA EI SUORAA
RAJAA, IHMISEN MATKA ON VARIVIRTOJA → PAATOKSET, MAAILMA VALMIIKSI → TAHTI
ja TAUKO, PULUN AANI → TARKENNUS, AIKAJANAN AJO → LISAYS kellon
liike-epäterävyys). Työskentelet itsenäisesti omistajan ohjeilla;
kysymykset omistajalle AskUserQuestion-kortteina; ajat Suomen aikaa
(UTC+3). Postikierros-rutiini: poista vanha trig_01FLyvmcP7eqSS4uddjzsvxf
ja luo uusi tähän sessioon (tunneittain; sisältö sama kuin ennen).

## 1. Tila

- **main = v1642** (PR #2110). Työhaara `claude/matkakirja-v1637-release-so5jxs`
  on nollattu mainiin (tämä tiedosto sen päällä). Päivän julkaisut:
  v1637 (aikajanan ajo, 6 maalehteä, Ihmisen matka -suunnitelma), v1638
  (etusivun harso ilman rajaa, SLE/PAN-tekstit), v1639 (pallon
  lepokerros), v1640 (15 maalehteä, 4 kaupunkilehteä, pulu v2/Dr. Von),
  v1641 (lepokerros ilman hyppyä ja nykimistä), v1642 (pulu puhuu
  Ateenassa ja Sofiassa).
- **Pulun ääni**: "Dr. Von - Quirky, Mad Scientist", voice_id
  yjJ45q8TVCrtMhEKurxY (tools/generoi-pulu.mjs PULU_AANI_OLETUS), malli
  eleven_multilingual_v2 ilman tageja, stability 0,5 / similarity 0,75 /
  style 0 / speed 1,05 / speaker boost. Generoitu ja ämpärissä: avaus
  1–5, paljastus 1–2, mannerivihje, ateena-1, sofia-1…7 (+ kaiut).
  Lukijan ääni on "Viisas Kertoja" (Sz0tRTEpybtDJ9ru2kgD, eleven_v3).
  OMISTAJA: "saat generoida kaikki muut paitsi uuden linssin äänet" —
  Ihmisen matka -linssin luentoja ja pulun kommentteja siihen EI generoida.
- **Lehtiagentit TAUOLLA** (omistaja: "laita kaupunki- ja maalehti
  agentit tauolle … ilmoitan kun ne voi laittaa taas käyntiin"; myös
  "hidasta noin 25 % maailman lehtien tekemistä" → enintään 5 agenttia
  kerrallaan ja seuraava erä vasta edellisen julkaisun jälkeen). Tauolle
  jääneiden kuuden agentin checkpointit on jo poimittu ja julkaistu
  v1640:ssä — niitä ei tarvitse herättää. Jäljellä (kun omistaja
  ilmoittaa): maalehdet AFG AGO BOL CMR COD GRL HKG KAZ LBR LBY LKA MDG
  MLI MMR MNG NAM NPL SGP SHN SLE SOM TCD TLS TWN UZB VUT ZAF ZWE;
  kaupunkilehdet (ohje tools/parvi/kaupunkilehti-ohje.md; tehty nyt myös
  Miami, Halifax, Kapkaupunki, Nairobi); kohdekartat 38 (tools/parvi/).
  Tekemättä v1640:n eristä: faktapohjat GTM/NIC/PAN ja Etelä-Sudan;
  ETH ilman uutislähdettä; säärivit puuttuvat (Open-Meteo 429; tools/
  hae-saanormaalit.mjs täyttää vain ylin/alin — kokonaiset rivit
  tarvitsevat keskilämmön ja sateen → oma pieni työkalu tai agentti):
  Dunedin, Suva, Porto Alegre, Asunción, Cairns, Panamá, Honiara, Port
  Vila, Denver, Houston, Miami, Halifax, Kapkaupunki, Nairobi.
  Tunnusluvut (MAATIEDOT) puuttuvat: URY PRY VEN FJI PNG SLB GTM NIC PAN
  (tests/maatiedot.test.mjs VIELA_ILMAN_TUNNUSLUKUJA).
- **Kuvaputki**: postitettu (claude/postilaatikko, posti/fable-vanha.md)
  miniatyyritilaus 29 kuvaa (11:05), vastaukset SDN/SLE/PAN (11:10) ja
  lehtierän v1640 kuvatilaus (13:20: 61 kuvatonta nostoa + 32
  miniatyyriä; ETH/SDN/SDS:n 29 kuvatonta nostoa listaamatta — ne näkyvät
  maa-kategoriat.js:ssä kuva-kentän puuttumisena). Kuvaputki kuittasi
  kaikki aiemmat; uusia kuvia ei ole toimitettu. Kopio tilauksesta
  tools/parvi/kuvatilaus-kertyma-2026-09-06-ilta.md.

## 2. KESKEN JÄÄNEET AGENTIT (työ voi olla kadonnut kontin mukana)

Kolme agenttia oli työssä session päättyessä. Niiden worktreet ja
commitit olivat vain kontissa; jos tätä tiedostoa ei ole päivitetty
"POIMITTU"-merkinnällä, työ on aloitettava uudestaan:

1. **Ihmisen matka -hionta (fablemax)** — prototyyppi (commit
   1df6fce3 edellisen kontin worktreessä; SISÄLTÖ kuvattu
   docs/moduulit/ihmisen-matka-virrat.md luvussa 12, jos se ehti
   mainiin — muuten luku 11 päätökset) + hionta: puhelimen loppusanojen
   ja kuvakehysten päällekkäisyys, 0,5° ruutureunat pehmeiksi ja
   Tiibet/jää polygoneina, maskin saumat (Malakka, Beringia 175°W),
   laskenta Workeriin, savuke-aikajana media.matkakirja.app-reititys,
   UUDET TEKSTIT virroille (Fable kirjoitti; ks. alla) ja LISÄTEHTÄVÄ:
   kellon 2–3 nopeimman rullan liike-epäterävyys (omistaja: "kuin
   elokuvakamerassa numerot blurrautuvat yhteen"). Omistaja: "Hio ensin,
   julkaise sitten" → julkaisu vasta kun omistaja on katsonut hiotut
   kuvakaappaukset (työpöytä + puhelin, 300/40/15 ka ja loppu).
2. **Pallon pisteet (fablemax)** — omistaja v1641:stä: "piste venyy kun
   karttaa panoroi" (kaupunkipiste venyy kapseliksi liikkeessä) ja
   "aarteen piste syttyy liian lähelle ateenaa, ei pysty painamaan …
   sama ongelma myös sofiassa" (aarrepiste jää nappulan alle pallolla;
   tasokartalla toimii). Molemmat mitattava Playwrightilla, yksi commit.
3. **Nimet korttien päällä (Opus)** — omistaja: "kaupunkien nimet
   näkyvät popup sivujen päällä" (pallon CSS2D-nimet piirtyvät
   kohdekortin päälle). Yksi sääntö CSS2D-kerrokselle, ei korttikohtaisia
   paikkauksia.

Kaikki kolme: omistajan sanat ovat jo Raamatussa (PALLO LEVOSSA -rivin
PALAUTE-lisäykset, AIKAJANAN AJO → LISAYS). Julkaise yhdessä v1643:na.

### Ihmisen matka -tekstit virroille (Fable 6.9.2026; js/linssit/ihmisen-matka-data.js)

- IHMISEN_MATKA_ESITTELY: "Ihmisen matka Afrikasta koko maapallolle:
  kaksikymmentä paikkaa, joista on löytynyt luu, jälki tai helmi. Kello
  juoksee kolmestasadastatuhannesta vuodesta tähän päivään, ja kartta
  värjäytyy sitä mukaa kuin ihminen levisi — maata pitkin, ranta
  rannalta."
- IHMISEN_MATKA_ALOITUS: "Tulet seuraavaksi näkemään, miten yksi laji
  levisi yhdestä maanosasta kaikkiin. Kukaan ei suunnitellut matkaa:
  jokainen sukupolvi siirtyi vain vähän kauemmas kuin edellinen, ja tuhat
  sukupolvea myöhemmin oltiin toisella puolella maapalloa. Väri leviää
  kartalla samaa vauhtia kuin ihminen — meripihka Afrikasta Aasiaan ja
  Australiaan, sininen Eurooppaan, sinivihreä Siperiaan ja siitä
  turkoosina Amerikkoihin, ruusu saarelta saarelle Tyynellämerellä.
  Harmaa on vanha väestö, neandertalilaiset ja denisovalaiset, joka
  väistyy tulijoiden tieltä. Kuva poksahtaa kartalle aina, kun jostakin
  löytyy jälki siitä, että täällä oli joku ennen muita."
- IHMISEN_MATKA_LOPPU: "Koko maailma on nyt värissä, Marokon kukkulalta
  Tyynenmeren yli Uuteen-Seelantiin, ja kaksikymmentä kuvaa merkitsee
  paikat, joista löytö on kertonut matkasta. Matkaan meni
  kolmesataatuhatta vuotta eikä yksikään kulkija tiennyt olevansa
  matkalla — jokainen vain siirsi leirinsä seuraavan rannan taakse.
  Ihminen oli siis kiertänyt maapallon kerran jo kauan ennen kuin kukaan
  keksi laskea päiviä; Fogg teki saman uudelleen, kello kädessä."

## 3. Julkaisukaava

`git fetch origin main` → `node tools/uusi-versio.mjs "rivi"` (≤ 60 ASCII)
→ `node --test tests/*.test.mjs` (fail 0) → tools/tarkista-{kaksoisavaimet,
niputus,savukkeet,nimiolimitys}.mjs (+ -nostopaikat ja -karttapisteet
<kaupunki> jos merkit/kartat muuttuivat) → `node tools/build-standalone.mjs`
(dist/ EI committoida) → commit (Co-Authored-By + Claude-Session) → push →
PR (mcp__github__create_pull_request, runko päättyy 🤖-riviin ja
session-URL:iin) → CI: `bash tools/parvi/tarkista-ci.sh` (lukee HEADin
ajon alussa — jos pushaat lisää, aja uudestaan) → merge squash
(expectedHeadSha 40 merkkiä) → `git fetch origin main && git reset --hard
origin/main && git push -f`. Parven poiminta: cherry-pick; konfliktit
tools/parvi/liita-lisays.py <tiedosto> 9d17556b <sha> (nyt base =
mainin sha, jonka päällä agentti työskenteli) ja liita-loppuun.py;
rivitetyt tiedostonimet yhdistetään yhdelle riville (tests/media.test.mjs).

## 4. Muut avoimet asiat

- Pyramidin z8-tason poltto (generoi-laattapyramidi TASOJA 8 → 9) antaisi
  aidosti tarkemman lähikuvan pallolle; omistaja ei ole vastannut —
  kysy kortilla sopivassa kohdassa. Sarjat poltetaan yhdessä
  (lepokerroksen versiovahti).
- Nairobin anakronismi: js/packs/africa-saapumiset.js ja
  africa-questions.js antavat isoisän tulla Nairobiin junalla 1873
  (rata 1899, kaupunkia ei ollut) — matkakirjatekstit ovat tauolla,
  korjaus Fablen tarinatyöhön (tarkistus-nairobi.md kohta G).
- Bo-Kaapin värit: africa-kulttuuri.js väittää värien olleen vapauden
  merkki; en-Wikipedia: perinne 1900-luvun lopulta. Lehti kirjoittaa
  ristiriidan auki, vanha Tutki-nosto ennallaan.
- Cloudflare: sahke-worker.yml deploy epäonnistuu, kunnes omistaja lisää
  tokeniin Account · D1 · Edit (muistutettu kerran 6.9.).
- Kuuba, Fidži ja Etiopia ilman uutislähdettä (kirjattu koodiin).
- Pulun repliikit muissa kaupungeissa (LIVIAN_SAAPUMISET) ja linssien
  kommentit: odottavat omistajan päätöstä; Sofian oikein-repliikki
  lyhennettiin 139 merkkiin, jotta se mahtuu sähkelentoon.
- Eläintäky puuttuu teknisistä syistä FJI, SLB, VUT, SHN.
- Reittikuvat etusivulla haaleita (KOKO_OSUUS 0,14) — omistaja ei ole
  kommentoinut. Pariisin reittikuva, Kalkutta, varustekuvakkeet
  kuvaputkella jonossa.
- Päivän raportti docs/raportit/ (tämä tiedosto toimii sellaisena).
