# Laitekierros 21 — v1985 tuotanto

21.9.2026 n. klo 06.48–07.10. Testattu matkakirja.app (tuotanto, v1985
vahvistettu päivitysdialogista ja `js/main.js`). **Menetelmä
sekoitettu**, kuten aiemmilla kierroksilla: visuaaliset tarkistukset
(joet, rannikko, meri, nimiöt, nostotasot) iPhone 18 Pro
-simulaattorilla oikeasti; interaktioita vaativat kohdat (huntu
liikkeen aikana, nostokortti 2:n suurennos, ESP/DEU-pistokoe)
Playwright/WebKit paikallista palvelinta vasten — "Liiku"-tyyppiset
napit eivät edelleenkään reagoi simulaattorin synteettiseen
kosketukseen (tunnettu, jo aiemmin raportoitu työkalurajoite).
Kaappaukset `docs/raportit/kaappaukset/laitekierros-21-20260921/`.

## Vahvistettu toimivaksi (Ranska, simulaattori)

- **Joet näkyvät levossa**: `joki-levossa-simulaattori.png` — ohut
  jokiviiva Chambordin linnan luona, ei tarvinnut liikettä
  näkyäkseen. Suuri parannus aiempiin kierroksiin (18.–19.), joissa
  joet eivät näkyneet lainkaan.
- **Meri: vyöhykkeet, viivoitus, laivat, kompassiruusu**:
  `meri-kompassi-laiva-simulaattori.png` — rannikolla useita
  yhdensuuntaisia ääriviivoja (syvyysvyöhykkeet), aaltoviivakuvio,
  purjelaiva-ikoni ja koristeellinen kompassiruusu kaikki samassa
  näkymässä (Lioninlahti).
- **1873-maakunnat ja meret kapiteelein**: `ranska-yleiskuva-
  simulaattori.png` — PICARDIE, NORMANDIA, CHAMPAGNE, LORRAINE,
  BURGUNDI, POITOU, AUVERGNE, DAUPHINÉ, GUYENNE, GASCOGNE, LANGUEDOC,
  PROVENCE, ROUSSILLON kaikki näkyvät versaaleina; merten nimet
  (LIONINLAHTI, JUUTINRAUMA Saksan puolella) samoin.
- **Rannikko sileä lähizoomilla**: en löytänyt kaksoisviivoja
  millään zoomilla, jota tällä laitteella pääsin tarkastelemaan
  (Lioninlahti, Normandian rannikko). En saanut kameraa juuri Gironden
  kohdalle tällä kierroksella (kamera pysyy pelaajakeskeisenä eikä
  panoroi vapaasti) — kierros 20:ssa Gironde vahvistettiin jo kertaalleen
  yhdeksi viivaksi, ei syytä epäillä regressiota.
- **Nostotasot, 8 ykköstasoa isommalla nimiöllä ja kuvamerkillä**:
  vahvistettu — Chambordin linna, Lascaux, Carcassonne, Pont du Gard
  saivat kaikki omat pienet kuvakemerkit (torni, luola, portti,
  akvedukti) ja isokokoisen nimen, selvästi erottuvia pelkistä
  väripisteistä.
- **Kolmostaso vasta lähizoomilla**: en löytänyt yhtään UUTTA
  nostoa ilmestymässä maksimizoomissa (Carcassonne/Canal du Midi
  -alueella) — joko aluetta ei ole varustettu kolmostason nostoilla,
  tai en osunut oikeaan kohtaan. Ei vahvistettu eikä kumottu.

## Vahvistettu toimivaksi (Playwright/WebKit)

- **Huntu liikkeen ajan**: `1-huntu-liikkeen-aikana.png`,
  `2-liike-0.png`, `2-liike-3.png` — Belgiasta lyhyen liftaus-siirron
  aikana sekä lähtö- että läpikuljettu alue pysyivät kirkkaina koko
  animaation ajan, ei tummaa huntua näkyvissä. **Rajoite**: siirto oli
  lyhyt (Bryssel → naapurialue samassa maassa), joten en nähnyt huntua
  KAUEMPANA olevien maiden päällä — jos huntu tarkoittaa juuri
  kaukaisten maiden peittämistä, tätä ei testattu kunnolla.
- **Nostokortti 2: väkäset**: `3-nostokortti2-lisaa.png` — kuvan
  selausnuolet ovat nyt selvät tummat neliöpainikkeet ("‹" "›")
  laskurin ("1 / 3") molemmin puolin, aiempaa napimaisemmat. Kuva on
  edelleen iso. Ei lähderiviä (pysyvästi korjattu, vrt. kierros 20b).
- **Suurennoksen selaus**: EI TESTATTU LUOTETTAVASTI — kuvan
  napautus suurennokseen epäonnistui skriptissäni (kuvaelementin
  valitsin ei osunut oikein), joten `4-suurennos.png` näyttää
  vahingossa kartan eikä suurennosnäkymää. Jää avoimeksi.
- **Kaupunkiliuska avautuu napautuksesta**: EI EHDITTY TESTATA
  erikseen tällä kierroksella.

## ESP/DEU-pistokoe

- **Espanja** (`6-espanja.png`, Madrid): Granada näkyy nimellä,
  "Gibraltarinsalmi" (osittain leikkautuneena kuvakaappauksen reunaan,
  ei pelissä) näkyy versaaleina. Ei havaittuja ongelmia.
- **Saksa** (`7-saksa.png`, Berliini): saapumisteksti vielä auki,
  mutta "JUUTINRAUMA" näkyy versaaleina pohjoisessa ja jokiviiva idässä
  Berliinistä. Ei havaittuja ongelmia, mutta en ehtinyt sulkea
  saapumiskorttia ja tarkistaa nostotasoja/merta samalla tarkkuudella
  kuin Ranskassa.

## Ei ehditty / ei luotettavasti testattu

- Nostotaso 3 (lähizoomi) — epävarma
- Nostokortti 2:n suurennoksen selaus — tekninen virhe testissä
- Kaupunkiliuskan avautuminen napautuksesta
- Huntu kaukaisten maiden päällä (vain lyhyt siirto testattu)
- ESP/DEU:n laattojen nostotaso ja meri samalla tarkkuudella kuin Ranska

## Yhteenveto

| Kohta | Tulos |
| --- | --- |
| Joet levossa | OK |
| Rannikko sileä (Gironde) | OK (ei regressiota, ei uudelleenvahvistettu tarkasti) |
| Meri: vyöhykkeet/viivoitus/laivat/kompassi | OK |
| Maakunnat + meret versaaleina | OK |
| Nostotaso 1 (iso nimiö+kuvamerkki) | OK |
| Nostotaso 3 (vain lähizoomilla) | Ei vahvistettu |
| Huntu liikkeen ajan | OK lyhyellä siirrolla, kaukaista ei testattu |
| Nostokortti 2 väkäset | OK |
| Suurennoksen selaus | Ei testattu (tekninen virhe) |
| Kaupunkiliuska | Ei testattu |
| ESP pistokoe | Ei havaittuja ongelmia (suppea tarkistus) |
| DEU pistokoe | Ei havaittuja ongelmia (suppea tarkistus) |

Ei vakavuus 1–2 -löydöksiä tällä kierroksella.
