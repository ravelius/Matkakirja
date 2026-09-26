# Luovutus: Sisältökirjuri — 26.9.2026 ilta (n. 22.5x Suomen aikaa, konteksti 70 % → nollaus)

Edellinen: `viesti-sisaltokirjuri-luovutus-20260926-c.md`. Tämä vuoro (ilta):
löydös 170 valmis (Eurooppa + CYP/RUS/TUR), maakunta-erä 2 valmis (CHE/PRT/
HUN/SWE/NOR/IRL pitkä-teksti), maakuntien pikkukuvat erä A ja koko erä B
(15 maata) valmis, ja löydös 178 aloitettu mutta supistui kesken vuoron.

## 1. Lue ensin

- `CLAUDE.md`, `docs/roolitus.md`.
- Raamattu: "TYÖTAPA JA SESSIOT".
- Ei uusia Raamattu-linjauksia tässä vuorossa.

## 2. Tila

**main = v2284** (`b221c546c`, PR #3350). Tämän vuoron julkaisut:

| Versio | PR | Sisältö |
| --- | --- | --- |
| v2278 | — | (edellisen vuoron loppu, katso -c.md) |
| v2279 | #3343 | Löydös 170: Euroopan 26 maakuntanoston kuvat (+CYP/RUS/TUR, 27 nostoa) |
| v2280 | #3346 | Maakunta-erä 2: HUN/SWE/NOR/IRL pitkä-teksti (92 aluetta) |
| v2281 | #3344 | PRT: maakuntien pitkä-teksti (20/20) |
| v2282 | #3348 | Maakunta-erä A: CHE/PRT/HUN/SWE/NOR/IRL pikkukuvat (138 aluetta) |
| v2283 | #3349 | Maakunta-erä B1: CZE/HRV/BIH/MNE/ALB/MKD/LUX pikkukuvat (96 aluetta) |
| v2284 | #3350 | Maakunta-erä B2: SRB/BGR/MLT/ISL pikkukuvat (67 aluetta) |

**PR #3351 auki, testit vihreät, mergeable** — Maakunta-erä B3: MDA/UKR
pikkukuvat (64 aluetta, v2285). Tämä on erä B:n viimeinen osa — kaikki
15 maata (ALB/BGR/BIH/BLR ei ollut mukana/CZE/HRV/ISL/LUX/MDA/MKD/MLT/
MNE/ROU ei ollut mukana/SRB/UKR — huom: tarkista Fablelta kuuluvatko
BLR ja ROU vielä erikseen, ei olleet mukana Fablen lopullisessa 15 maan
erittelyssä) saivat aidon Wikimedia Commons -kuvan + pikkukuvan.

**Yhteensä tässä vuorossa lisätty maakuntakuvia: 138 (erä A) + 227 (erä B,
kaikki kolme osaa) = 365 aluetta**, kaikki lisenssi tarkistettu suoraan
Commonsin API:sta ennen commitointia.

## 3. Löydös 178 — supistui kesken vuoron, EI ALOITETTU käytännössä

Fable pienensi löydöksen laajuutta viestissä kesken tutkimustyön:
- **70 tarinakohdetta** (HENKILÖ/TAPAHTUMA/MUU-kategoriat) siirtyvät
  suoraan kaupungin nostoihin **Pelikoodarin data-työnä** — EI Sisältökirjurin
  työtä enää.
- Jäljelle jää Sisältökirjurille **11 ei-tarinakohdetta**: maalaukset ja
  esineet (MAALAUS+ESINE-kategoriat, alkuperäisestä 28:sta karsittu 11:ksi
  — tarkka lista tulee Fablelta, EI vielä tiedossa tässä vuorossa) siirretään
  sen museon/rakennuksen nähtävyysjuttuun kuvagalleriana.
- **Santarém ja Broome** jäävät ilman kohdetta poiston jälkeen → kumpaankin
  2-3 uutta rakennuskohdetta.

**Alkuperäinen raportti** (laajempi, 81 kohteen erittely ennen supistusta):
`docs/raportit/nahtavyydet-ei-rakennukset-20260926.md` haarassa
`origin/claude/bold-ride-vow4ki` (Fablen Raamattu-haara — EI mainissa,
hae sieltä `git show origin/claude/bold-ride-vow4ki:docs/raportit/
nahtavyydet-ei-rakennukset-20260926.md`). Tämä raportti kattaa KAIKKI
250 ei-rakennus-kohdetta (MAALAUS 8, VEISTOS 9, ESINE 20, LUONTO 78,
AUKIO 91, HENKILÖ 39, MUU 5) — uusi, supistettu 11 kohteen lista on
Fablella, ei vielä kirjoitettu tiedostoon tämän vuoron aikana.

**Kesken olevat tutkimusagentit** (käynnistetty ennen supistusviestiä,
tuloksia ei ehditty käyttää — saattavat silti olla hyödyllisiä, koska
osa niiden kattamista kohteista voi olla mukana lopullisessa 11:ssä):
1. Agentti kartoitti MAALAUS+VEISTOS+ESINE-kohteiden (20 eurooppalaista,
   ks. lista alla) nykyisen sisällön js/packs/nahtavyysjutut.js:stä ja
   kaupunkilehti-galleriaformaatin (js/packs/kulttuuri-kategoriat.js,
   docs/moduulit/kaupunkilehti.md).
2. Agentti kartoitti HENKILÖ+MUU-kohteiden (43 kpl) nykyisen sisällön —
   TÄMÄ ON NYT SUURELTA OSIN TARPEETON, koska Pelikoodari hoitaa nämä
   datana. Älä käytä tätä tutkimusta ellei Fable vahvista, että jokin
   näistä on silti Sisältökirjurin 11:n joukossa.
3. Agentti tutki Santarémin ja Broomen korvaavat rakennuskohteet
   (2-3 kumpaankin) — TÄMÄ ON YHÄ TARPEELLINEN, käytä sen tuloksia.

Jos nämä agentit ehtivät vastata ennen kuin uusi sessio lukee tämän:
niiden vastaukset näkyvät tämän session transkriptissä, mutta UUSI
sessio ei näe niitä (agentit ovat sidottu tähän sessioon). **Uuden
session pitää käynnistää tutkimus uudelleen tarvittaessa**, mutta
Santarém/Broome-tutkimus kannattaa toistaa vain jos edellinen ei ehtinyt
valmistua (tarkista tämän session transkriptistä jos mahdollista, muuten
aja uudelleen — se on halpa, ~1 agentti).

## 4. Kesken — tee nämä ensin

1. **PR #3351 seuranta**: tarkista onko mainissa. Jos ei, ja main on
   liikkunut, rebasoi (`git checkout sisalto-kuva-maakunta-era-b3-20260926
   && git fetch origin main && git rebase origin/main`), aja
   `node tools/uusi-versio.mjs "..."` uudelleen JOS versio kollisoi,
   testaa, force-with-lease-pushaa.
2. **Löydös 178, tarkka 11 kohteen lista**: kysy tai odota Fablelta
   täsmällinen 11 kohteen lista (kaupunki + otsikko) ennen aloitusta.
   Menetelmä kummallekin kohteelle (maalaus/esine → galleria):
   a. Etsi kohteen nykyinen sisältö js/packs/nahtavyysjutut.js:stä
      (kortti/teksti/kuva-kentät).
   b. Etsi saman kaupungin lähin museo/rakennus-nähtävyysjuttu, johon
      kohde liittyy asiasisällöltään (esim. "Maitotyttö"-maalaus →
      Amsterdamin Rijksmuseum-nähtävyysjuttu).
   c. Lisää kohteen kuva + selite kyseisen rakennuksen `kuvat`-listaan
      (tarkista tarkka kenttämuoto lukemalla olemassa oleva moni-
      kuvainen esimerkki tiedostosta ennen kirjoittamista — sama
      `{ osoite | tiedosto, selite, lahde }` -kaava kuin skandaalit.js:ssä
      on todennäköinen, mutta VARMISTA nahtavyysjutut.js:n omasta
      skeemasta, älä oleta).
   d. Poista/merkitse alkuperäinen kartkohde (TARKISTA Fablelta/
      Pelikoodarilta kumpi tekee varsinaisen poiston maakartat.js:stä —
      todennäköisesti Pelikoodari, koska hän tekee tyyppikentän+suodatuksen).
3. **Santarém + Broome**: js/packs/maakartat.js, avaimet `santarem:` ja
   `broome:` (rivit noin 3185 ja 3252 tämän vuoron lopussa — tarkista
   uudelleen, rivit ovat voineet siirtyä). Nykyinen `kohteet`-skeema:
   `{ nimi, lat, lon, teksti }` suoraan (EI erillistä nahtavyysjuttua).
   Lisää 2-3 oikeaa, todennettua rakennuskohdetta kumpaankin (ei patsas/
   aukio/luonto) WebSearch-tarkistettuna, samalla tyylillä kuin
   olemassa olevat Porto Velho / Gao / muut pienten kaupunkien kohteet
   samassa tiedostossa. Tutkimusagentti (kohta 3 yllä) saattoi jo löytää
   ehdokkaat — tarkista transkriptistä.

## 5. Odottaa omistajan päätöstä

- Ei suoraan omistajalta odottavaa, mutta Fablelta odottaa: löydös 178:n
  tarkka 11 kohteen lista ja vahvistus, kuuluvatko BLR/ROU vielä erä
  B:hen (ks. kohta 2, PR #3351 kuvaus).

## 6. Voimassa olevat työtavat — mikä muuttui tässä vuorossa

- **Maakuntien kuva-pikkukuva-pipeline vakiintui täysin**: tutkimus-
  agenttiparvi (yksi/muutama agentti per maa, "kuten löydöksessä 170")
  hakee Commons-kuvaehdokkaan per alue (suosien alueen `lyhyt`/`pitka`-
  tekstissä jo mainittua maamerkkiä), MINÄ (pääsessio) teen KAIKKI
  lataukset+lisenssitarkistus+ämpärivienti itse yhdellä skriptillä
  (scratchpad, EI repossa: `vie-maakuntakuvat.mjs` — lataa Commonsista,
  tarkistaa lisenssin API:sta backoffilla, `aws s3 cp` ämpäriin
  `karttanostot/<pvm>/`, varmistaa julkisen luvun). Agentit EIVÄT saa
  AWS-tunnuksia — kaikki ulkoiseen palveluun kirjoittava työ pääsession
  käsissä.
- **AWS/R2-tunnukset ovat jo ympäristössä** tällä Macilla:
  `source ~/.zshrc` lataa `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`,
  `AMPARI` (ämpärin nimi), `PAATE` (R2-loppupiste). Ei kysytä omistajalta,
  ei tutkita `env`/`.aws` (auto mode -classifier estää credential-
  tutkimuksen, mutta itse `aws s3 cp` -komentojen AJAMINEN näillä
  muuttujilla on sallittu ja odotettu tässä roolissa).
- **`liita-kuvat.mjs`-skripti** (scratchpad, ei repossa) lisää
  `kuva`+`pikkukuva`-kentät annetun tulokset+avaimet-JSON:in perusteella,
  ankkuroituna joko `lyhyt`- tai `pitka`-kentän jälkeen. KAKSI BUGIA
  löytyi ja korjattiin tämän vuoron aikana:
  1. Avain ei tunnistanut kaksoislainausmerkein kirjoitettuja `lyhyt`-
     arvoja (esim. `lyhyt: "...'..."`) — korjattu hyväksymään `'...'`,
     `"..."` ja `` `...` ``.
  2. Avain ei tunnistanut kaksoislainausmerkein kirjoitettuja AVAIMIA
     (esim. `"Dnipropetrovs'k": {`, koska avaimessa on heittomerkki) —
     korjattu hyväksymään `'avain'`, `"avain"` ja paljas `avain`.
  Molemmat bugit aiheuttivat SKRIPTIN KAATUMISEN ENNEN kirjoitusta
  (ei kirjoittanut korruptoitunutta dataa levylle) PAITSI bugi 1, joka
  aiheutti yhden kohteen (ALB Tiranë) datan valumisen VÄÄRÄÄN kohteeseen
  (Vlorë) ennen kaatumista — löytyi `tarkista-kaksoisavaimet.mjs`:llä,
  korjattu käsin. **AJA AINA `node tools/tarkista-kaksoisavaimet.mjs`
  jokaisen liitä-kuvat-ajon jälkeen**, älä luota pelkkään "liitetty N/N"
  -tulosteeseen.
- **`git reset --soft HEAD~N` on vaarallinen usean commitin sekvenssissä**
  kun N ei ole tarkasti laskettu — PR #3351:n ensimmäinen versio jäi
  vahingossa ilman versionostoa, koska `reset --soft HEAD~2` meni yhden
  commitin liian pitkälle (unohti että rebase oli tuonut kaksi ulkoista
  committia ketjuun, ei yhtä). Löytyi `git diff origin/main HEAD --stat`
  -tarkistuksella ennen kuin ehdittiin ilmoittaa PR valmiiksi. KORJAUS:
  jos epäilet reset-komennon menneen väärin, tarkista AINA
  `git log --oneline origin/main..HEAD` (pitäisi näyttää vain omat uudet
  commitit) JA `git diff origin/main HEAD --stat` (pitäisi näyttää vain
  oman erän muutokset) ennen `gh pr create`/pushia. Turvallisempi
  vaihtoehto: älä käytä `reset --soft` ollenkaan committien yhdistämiseen
  — käytä `git commit --amend` (yksi commit kerrallaan) tai kirjoita
  koko committi uudelleen `git add -A && git commit` ilman resetiä.

## 7. Julkaisukaava

Ei muutoksia (`docs/roolitus.md` "Julkaisusäännöt"). Versionumerot
kollisoivat toistuvasti rinnakkaisten maakunta-PR:ien välillä (v2283,
v2284, v2285 jokainen jouduttiin ajamaan `uusi-versio.mjs`:llä uudelleen
kun edellinen PR ehti mainiin ensin) — tämä on odotettua "yksi maakunta-
PR kerrallaan" -säännön kanssa, ei virhe.

## 8. Ympäristö ja infra

- Työkansio: `/Users/Shared/Claude/Matkakirja-sisaltokirjuri` (haara
  `sisalto-kuva-maakunta-era-b3-20260926`, PR #3351).
- Ämpäri (R2): `karttanostot/20260926/` +365 maakuntakuvaa tämän vuoron
  aikana (erä A 138 + erä B 227).
- Scratchpad-skriptit (EIVÄT repossa, uuden session pitää kirjoittaa
  uudelleen jos tarvitsee): `vie-maakuntakuvat.mjs` (lataa+tarkista+vie),
  `liita-kuvat.mjs` (liitä kuva+pikkukuva dataan, molemmat bugit
  korjattuina lopullisessa versiossa — ks. kohta 6). Näiden logiikka on
  yksinkertainen, ei kriittistä säilyttää, mutta säästää aikaa jos
  löytyvät vielä tallessa `/private/tmp/claude-502/.../scratchpad/`.
- Ei uusia avaimia, ei muutoksia rutiineihin/ajastuksiin.

## 9. Avoimet velat ja opetukset

**Velat:**
1. PR #3351 (B3) avoinna, odottaa Julkaisijan junaa.
2. Löydös 178 käytännössä aloittamatta (vain tutkimus kesken, osa
   tarpeetonta laajuuden supistuttua) — ks. kohta 3-4.
3. Astronautin kameran erät 2-4 (isoisän reitin maisemat, luonnonkohteet,
   "sama paikka eri vuosina" -parit, ~100 kohdetta) — TÄYSIN
   ALOITTAMATTA, siirretty löydös 178:n jälkeen. Pipeline-kartoitus TEHTY
   tässä vuorossa (ks. tämän session transkripti tai kysy: build-questions
   pipeline, tools/hae-satelliittihavainnot.mjs, tools/astronaut/qa-*.json)
   — ei tarvitse kartoittaa uudelleen, mutta itse ~100 kohteen kuratointi
   on tekemättä.

**Opetukset:**
- Ks. kohta 6 kokonaan — kaksi skriptibugia ja yksi git reset -sudenkuoppa,
  kaikki dokumentoitu tarkasti korjauksineen.
- Maakuntien pikkukuva-pipeline (agenttiparvi + keskitetty lataus/vienti)
  toimi hyvin 365 alueen läpi ilman yhtään hylättyä lisenssiä tai
  epäonnistunutta vientiä — käytä samaa mallia jos vastaavia erä-tehtäviä
  tulee jatkossa (esim. jos erä C/D maakuntakuville tai kuvitusta muille
  kokoelmille tarvitaan).
- UKR:n sota-alttiiden alueiden (Donets'k, Luhans'k, Kherson, Zaporizhzhya)
  kuvavalinnassa ohjeistin agenttia nimenomaisesti rauhallisiin, ei-
  konfliktiin liittyviin kuviin — toimi hyvin, ei yhtään ongelmallista
  kuvaa löytynyt tarkistuksessa.

## 10. Aloitusviesti uudelle sessiolle

```
Olet Sisältökirjuri (Sonnet), checkout /Users/Shared/Claude/Matkakirja-sisaltokirjuri.
Ensimmäinen komento: git fetch origin && git checkout -B sisalto-tyo-$(date +%Y%m%d-%H%M) origin/main.
Lue CLAUDE.md, docs/roolitus.md ja docs/raportit/viesti-sisaltokirjuri-luovutus-20260926-d.md
kokonaan ja toimi niiden mukaan.

TILA lyhyesti: erä A (138 aluetta) ja erä B (227 aluetta, 3 PR:ää) maakuntien
kuvat+pikkukuvat VALMIIT (B3/#3351 vielä auki, tarkista onko mainissa).
Löydös 178 supistui kesken edellisen vuoron: vain 11 ei-tarinakohdetta
(maalaus/esine → museon galleriaan) + Santarém/Broome (2-3 rakennuskohdetta
kumpaankin) jäävät Sisältökirjurille; 70 muuta hoitaa Pelikoodari datana.

ENSIMMÄINEN TEHTÄVÄ:
1. Tarkista PR #3351:n tila (mainissa? rebase tarvitaanko?).
2. Kysy Fablelta löydös 178:n tarkka 11 kohteen lista jos ei vielä saapunut.
3. Santarém + Broome: lisää 2-3 todennettua rakennuskohdetta kumpaankin
   (js/packs/maakartat.js, kohteet-kenttä). Tutkimusagentti saattoi jo
   löytää ehdokkaat edellisen session lopussa — tarkista onko dataa
   talteen otettu, muuten aja tutkimus uudelleen.
4. Sen jälkeen astronautin kameran erät 2-4 (Fable priorisoi järjestyksen).

SITOVAT KÄYTÄNNÖT:
- JUMI → FABLE: jumissa yksi viesti Fablelle, ei korttia; muu jono jatkuu.
- VIESTIRAJA: SendMessage ~10/vuoro; varakanava mcp send_message session id:llä.
- Maakunta-PR:t yksi kerrallaan mainiin; Julkaisija automerges kun testit vihreät.
- Agentit vain Sonnet/Opus, enintään 3-4 rinnan, KÄYTÄ AINA WEBSEARCHIA faktojen tarkistukseen.
- Kuvat (maakunta/nähtävyys) vain PD/CC0/CC BY/CC BY-SA Commonsista,
  tarkistettuina API:sta suoraan; AJA AINA tarkista-kaksoisavaimet.mjs
  jokaisen data-ajon jälkeen.
- Maakuntakuvien lataus+vienti tehdään AINA pääsessiossa itse (ei agenteille
  AWS-tunnuksia); `source ~/.zshrc` lataa tarvittavat R2-muuttujat.
- ÄLÄ käytä `git reset --soft HEAD~N` committien yhdistämiseen ilman
  tarkkaa N:n laskemista — tarkista aina `git log --oneline origin/main..HEAD`
  ja `git diff origin/main HEAD --stat` ennen PR:n avaamista.
```
