# Viesti Fablelle — linssivika: pelin kerrokset linssin päällä, reunan väreily, äänet

**Opus-työagentti, 14.9.2026.** Haara
`claude/bold-ride-vow4ki-linssivika`, pohjana `origin/main` (v1882).
Toimeksianto: omistajan havainto iPadilla (Ihmisen matka -linssi),
sanatarkasti: *"Linssissa nakyy kartan korostus seka infolaatikko seka
valilla kartan pienta vareilee meinaten pudottaa topografian"* — ja
samana päivänä *"Muut aanet eivat myoskaan pysahdy kun linssi
aktivoituu"*.

**Lyhyesti.** Mittasin kaikki kerrokset linssin päältä. Pelin lappuset
ovat jo piilossa (css `body.aikajana-paalla`), mutta **kaksi kerrosta
jää CSS:n ulottumattomiin**: kohdemaan korostuskehä (kolmiulotteinen
viiva pallon vektorikerroksessa) ja maapaneeli (luetaan pallolaudan
`paivita`-ohjauksesta, jota linssin kytkin ei aja). Molemmat on nyt
kytketty samaan porttiin kuin kaupunkipisteet. Äänipuoli: linssin oma
äänimaailma sammuttaa jo maiseman, luennan ja lukijan — mutta **Livian
kaupunkirepliikkien AJASTIMET** jäivät käyntiin, ja ne kutsuttiin nyt
pelin omalla lähtöportilla. Väreilystä: juurisyy **ei** ollut
z-fighting vaan **laattajonon nälkiintyminen linssin kamera-arojen
aikana** — mitattu alla.

---

## 1. Menetelmä

Playwright, Chromium `/opt/pw-browsers/chromium`, oma palvelin repon
juuresta, ämpäri Noden kautta (`NODE_USE_ENV_PROXY=1`). Näkymä
**1180 × 820, dpr 2** (omistajan iPad vaakaan). Peli pallolaudalle,
Fogg Pariisissa (`phase: action`), Ihmisen matka -linssi matkalaukusta,
Käynnistä painettuna. Mittarit luetaan DOMista ja näyttämöstä:
`ui.pallolauta.vektorit().mittarit()` (korostus),
`ui.pallolauta.lepokerros().mittarit()` (laattakerros),
`pallo.pointsData()[].__threeObjPoint.scale` (kaupunkipiste) ja
elementtien todellinen näkyvyys (laatikko + `display`/`visibility`/
`opacity`). Mittausskripti on kertaluontoinen; vartijaksi jäi savuke
`tools/savukkeet/savuke-linssivika.mjs`.

## 2. Kerrostaulukko (mitattu, ENNEN korjausta)

| Kerros | Näkyi linssissä | Pitäisi | Mistä |
|---|---|---|---|
| **Kohdemaan korostuskehä** | **KYLLÄ** — `korostus: "FRA"`, 2116 janaa | ei | `js/pallovektorit.js korostaMaa`, ei DOM → css ei yllä |
| **Maapaneeli** (infolaatikko) | **KYLLÄ** omistajan kuvassa (Biskajanlahti); harnessissa 0, koska maan laatikkoa ei saatu verkosta | ei | `js/pallolauta/lauta.js paivita` → `maapaneeli.paivita` |
| Kaupunkien nimet `.pallolauta-nimi` | ei (5 → 0) | ei | css `aikajana.css` |
| Nostot `.pallolauta-nosto` | ei (0) | ei | css |
| Kohdemerkit / vesinimet / nappula | ei (0) | ei | css |
| Maan kartuutsi `.fokus-kartuutsi` | ei (0) | ei | css `styles.css` |
| Kaupunkipisteet | ei (skaala 0) | ei | `tahdistaPisteidenKoko`, linssivahti |
| Tasoituskerma / värilaatasto (`variMaa: "FRA"`) | kyllä | **kyllä** — se ON linssin topografia | `js/laattapyramidi.js` |

Ratkaiseva löydös kehästä: se **rakennettiin uudelleen** linssin
aikana (`korostusJanoja` 2110 → 2116), eli kehä ei vain jäänyt näkyviin
vaan latoi geometriansa uusiksi jokaisella kameran harvennusmuutoksella
linssin ajon ajan.

## 3. Väreily — mitä 30 s mittaus näytti

Näyte sekunnin välein linssin ajon aikana (laattakerroksen omat
mittarit; `nakyvia` = laattoja, joiden pitäisi olla ruudulla,
`scenessa` = laattoja, jotka ovat näyttämöllä):

| t (s) | korkeus | taso | `nakyvia` | `scenessa` | `purettuja` | `pyyntoja` |
|---|---|---|---|---|---|---|
| 0 | 13,60 | z6 | 24 | 12 | 49 | 99 |
| 3 | 0,186 | **z4** | 15 | 10 | 130 | 109 |
| 9 | 0,186 | z6 | 24 | 15 | 220 | 135 |
| 14 | 0,186 | z6 | 15 | 7 | 322 | 146 |
| 23 | 2,50 | z6 | 35 | 5 | 362 | 155 |
| 29 | 0,897 | **z5** | 24 | **0** | **417** | 165 |
| kiinni | 0,186 | z5 | 24 | **0** | 437 | 170 |

Linssin kertomuskamera lentää jatkuvasti (korkeus heilahtelee
0,19 → 2,5 ja takaisin), ja laattakerros laskee näkyvän joukon
uudelleen jokaisella liikkeellä. **Laattoja purettiin 30 sekunnissa 368
kappaletta, mutta pyyntöjä ehdittiin lähettää vain 66** — eli laatta
puretaan ennen kuin se ehtii latautua, ja `scenessa` valuu 12 → 0,
vaikka `nakyvia` pysyy 15–40:ssä. Silloin reliefi putoaa takaisin
sumeaan pohjaan ja palaa taas: juuri se, mitä omistaja kuvaa sanoilla
*"meinaten pudottaa topografian"*. Zoomitaso ehti myös vaihtua
kesken ajon (z6 → z4 → z6 → z5), mikä vaihtaa koko tekstuuriston
kerralla. **Yhtään laattapyyntöä ei epäonnistunut (ei 404:iä), eikä
`variMaa` vaihtunut** — värilaatastoa ei siis mitätöidä.

Reunan väreilyn toinen puoli on kehä: korostus piirtyy
syvyyssiirrolla −12 (`VEKTORIT_SYVYYSSIIRTO`) samaan syvyysluokkaan
kuin linssin oma kalvo (`KALVON_SYVYYSSIIRTO` −12), laattakerros −8:aan.
Kun kehä vielä latoo geometriansa uusiksi joka liikkeellä, maan reuna
välkkyy. Kehän sammuttaminen linssin ajaksi poistaa tämän puolen
kokonaan.

> **Väreilyn juurisyy yhdellä lauseella:** linssin kertomuskamera lentää
> koko ajon ajan, jolloin laattakerros purkaa laattansa (368 / 30 s)
> nopeammin kuin ehtii ladata uudet (66 pyyntöä / 30 s) ja näyttämölle
> jää 0–15 laattaa tarvitusta 15–40:stä — kartta putoaa toistuvasti
> sumeaan pohjaan, ja pelin korostuskehä, joka latoi geometriansa
> uusiksi samassa tahdissa ja samassa syvyysluokassa kuin linssin oma
> kalvo, teki siitä reunalla näkyvän välkkeen.

## 4. Korjaus (pienin muutos)

**`js/pallolauta/lauta.js`** — kaksi kohtaa:

1. `linssivahti` (MutationObserver `body.aikajana-paalla`) ajaa nyt
   kaupunkipisteiden lisäksi koko `paivita`-ohjauksen ja **nollaa
   ensin `merkkiAvain`**. Ilman nollausta kutsu palasi heti, koska
   linssin kytkin ei muuta yhtään pelin tila-avaimen osaa — tämä oli
   mitattu virhe: ensimmäinen korjausyritys jätti kehän yhä FRA:ksi.
2. Korostuskehä saa linssiportin: `iso: linssiPaalla() ? null :
   korostusIso`. **`korostusIso` itse ei nollaudu**, koska sama luku
   ohjaa väritason maata (`asetaVaritasonMaa`) ja uloszoomauksen rajaa
   — maan vaihtuminen nulliksi mitätöisi KAIKKI värilaatat
   (`js/pallolaatat.js`: `variMaa !== variMaaEdellinen` → jono tyhjäksi,
   laatat puretaan), eli aiheuttaisi juuri sen topografian putoamisen,
   jota korjataan.

Maapaneeli tuli mukana ilman omaa riviä: `paivita` lukee jo
`linssiPaalla() ? null : pallolaudanMaa(ui)`; puuttui vain kutsu.

**`tests/maakorostus.test.mjs`** — tekstivartija salli vain
`iso: korostusIso,`; laajensin sen sallimaan linssiportin ja kirjasin
kommenttiin, miksi nollaus ei saa levitä `korostusIso`:oon.

## 5. Äänet (lisätehtävä)

**Mitattu linssin avauksen jälkeen 1 s ja 5 s** (kaikki `Audio.play`
-soittimet kirjattiin koukulla): soivat vain **linssin omat** —
`puhe/ihmisen-matka-kertomus.mp3`, `aanet/linssi-ihmisen-matka-lyria.mp3`
ja Livian **linssirepliikki** `pulu/livia-ihmisen-matka-2.mp3`. Pelin
kaupunkimaisema (`aporee_…/parisruemontorgueil.mp3`) lähti soimaan
vasta linssin **sulkeuduttua** — eli `js/aikajana.js avaaAanimaailma`
tekee jo työnsä (`hiljennaAmbienssi`, `stopPlaceStream`,
`stopDiaryVoice`, `pysaytaLukija`).

**En siis saanut omistajan vikaa toistumaan tässä ympäristössä** —
harnessissa pelaaja teleportataan Pariisiin, joten saapumisluenta ja
Livian saapumiskuplat eivät olleet lennossa linssin alkaessa. Koodista
puuttui silti selvä reikä: `stopDiaryVoice` pysäyttää **soivat**
luennat, mutta Livian repliikkijono on **ajastimia**
(`saapumiskuplaAjastin`, `huudahdusAjastin`, `polloKuplasarjaAjastin`
…), ja ne olisivat laukaisseet uuden kuplan ja äänitteen linssin mustan
päälle. Kutsun nyt pelin omaa lähtöporttia **`ui.vaiennaPaikanPuhe()`**
(= `haivytaLuenta` + `vaiennaLivianKaupunkipuhe` + `polloKuplatPois`),
eli sitä samaa reittiä, jolla kaupungista lähteminen vaientaa molemmat
puhujat. Uutta äänilogiikkaa ei kirjoitettu `luenta.js`:ään eikä
`liviapuhe.js`:ään.

**Sulkeutuminen:** musiikki ja maisema palaavat ennallaan
(`suljeAanimaailma` → `syncAmbience`); **luenta ei jatku** kesken
jääneestä kohdasta — tämä on pelin vanha linjaus (`stopDiaryVoice`
tyhjentää `ui.luennat`), enkä muuttanut sitä.

**Jos vika toistuu iPadilla**, seuraava epäilty on `js/lukija.js`:n
laitelukija (`pysaytaLukija` ei ulotu natiivikuoreen,
`window.matkakirjaNatiivi.luenta`) — omistaja ilmoittaa, ja se
mitataan erikseen.

## 6. Savuke ja vastakoe

Uusi vartija **`tools/savukkeet/savuke-linssivika.mjs`** (iPad
1180 × 820, dpr 2) väittää kuusi asiaa: kehä päällä ennen linssiä; kehä
sammutettu linssin aikana; maapaneeli, nimet, nostot, kartuutsi ja
kaupunkipisteet poissa; **pelin omat äänet tauolla 1 s ja 5 s
kuluttua**; sulku palauttaa kehän ja kaupunkipisteet; ei sivuvirheitä.

**Vastakoe tehtiin oikeasti, ei jälkikäteen:** ensimmäinen ajo
korjauksen ensimmäisellä versiolla **kaatui** väitteeseen 2
(`{"linssi":true,"korostus":"FRA","janoja":2116}`) — juuri se paljasti
`merkkiAvain`-portin. Toinen ajo koko korjauksella menee läpi.

## 7. Portit

| Portti | Tulos |
|---|---|
| `npm test` | **# pass 3353, # fail 0** |
| `tools/tarkista-kaksoisavaimet.mjs` | ei kaksoisavaimia |
| `tools/tarkista-niputus.mjs` | 387 moduulia, 4221 julistusta, ei törmäyksiä |
| `tools/tarkista-savukkeet.mjs` | 1657 ui-viittausta, 405 metodia, 534 kenttää |
| `savuke-linssivika.mjs` | **6/6 väitettä läpi** (vastakoe: korjauksen vajaa versio kaatui väitteeseen 2) |

## 8. Mitä EI tehty — ja mitä Fablelta tarvitaan

* **Laattajonon nälkiintyminen (luku 3) jäi korjaamatta.** Se on
  `js/pallolaatat.js`:n purkubudjetin ja jonon asia, jota muut agentit
  työstävät rinnalla, eikä siihen ole pientä muutosta: kysymys on
  linjaus, ei bugi. Kaksi vaihtoehtoa Fablelle päätettäväksi:
  (a) linssin ajaksi laattojen **pito** päälle (ei pureta mitään, mitä
  linssin kamera on kerran näyttänyt) tai (b) linssin kamera-ajon
  ajaksi **taso lukitaan** yhteen z:aan, jolloin tekstuuristo ei vaihdu
  kesken tarinan. Suosittelen (b):tä — se on halvempi muistille ja
  poistaa myös z6 → z4 → z5 -vaihdot.
* Linssien sisältöön, aikajanan ajoon, Raamattuun, versionumeroon,
  `dist/`:iin tai muiden agenttien tiedostoihin ei koskettu.

## 9. Kuvat

* `docs/raportit/kuvat/linssivika-avaus-20260914.jpg` — linssin
  avausjakso (musta ruutu, paperi ja Käynnistä), mittauksen lähtökohta.
* `docs/raportit/kuvat/linssivika-lahikuva-20260914.jpg` — linssin ajo
  korkeudella 0,186: kartta on sumeaa pohjaa, koska laattoja on
  näyttämöllä 7 tarvitusta 15:stä (luku 3).
