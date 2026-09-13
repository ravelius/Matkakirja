# Viesti Fablelle: karttauudistuksen suunnitelma PALLOLLE (13.9.2026)

*(Opus-työsessio. Haara `claude/karttauudistus-suunnitelma-pallo`, pohja
origin/main. Docs-only: ei versionostoa, ei js/-, css/-, tests/- eikä
tools/-muutoksia. `npm test`: **3306 testiä, 3293 pass, 0 fail, 13 skipped**.)*

## Mitä tehtiin

`docs/raportit/karttauudistus-suunnitelma-pallo-20260913.md` (767 riviä):
suunnitelman erät 2–8 kirjoitettu uudelleen PALLOLLE, koska peli avautuu
pallolle (`js/ui-apurit.js:2102 VANHA_KARTTA_KAYTOSSA = false`) ja Raamatun
PÄÄTÖS 3 sanoo, ettei tasokartta palaa. Lisäksi erä 1b (värikerros pallolle)
murretulla paletilla ja feidauksella PÄÄTÖKSET 2:n mukaan.

## Seitsemän tärkeintä löydöstä

1. **`pyramidinKerrostasot` (js/laattapyramidi.js:1921–1932) on koko
   uudistuksen sauma.** Pallon laattakerros lataa ja piirtää sen, mitä tuo
   funktio palauttaa, ja yhdistää kaikki kerrostasot YHDELLE kankaalle
   `drawImage`illa (js/pallolaatat.js:1223–1231). Värikerros on siis uusi
   rivi listaan, ei uusi moottori.
2. **Siksi suositus on: leikkuri POLTETAAN laattaan (alfa), ei clipPath eikä
   `destination-in`.** Tasokartalla värikerros lisäsi laattoja +54 %;
   pallolla lisäys on **0 %** (sama kangas, sama verkko, sama tekstuuri,
   yksi lisähaku). Samalla iOS-webappin suodatin/maskiriski poistuu pallolta
   kokonaan.
3. **"Maa niin suureksi kuin mahdollista" ON JO TEHTY pallolla** (omistajan
   pyyntö 11.9., `saapumisrajaus` js/pallolauta/lauta.js:2644–2661 +
   `kamera.kotiin`). Suunnitelman erä 2 kutistuu M:stä **S**:ksi: jäljelle
   jää uloszoomauksen esto (`zoomirajaSyrjaytys`, lauta.js:1303–1312) ja
   punainen kehä.
4. **Punainen kehä ei ole pallolla.** Erä 1 vaihtoi tasokartan kehän
   (js/maatummennus.js + css/styles.css); pallon kehä on
   `js/pallovektorit.js:231 KOROSTUS_MUSTE '#4a3320'` → `'#b03a2b'`.
5. **Muiden maiden feidausta ei ole pallolla lainkaan** (js/maatummennus.js
   on tasokartan kerros). Suositus: feidaus poltetaan SAMAAN värilaattaan
   sen alfaan, ja laatasto kattaa maan laatikon × 1,15 — sama kerroin kuin
   uloszoomauksen esto, joten feidattu laatikko on kaikki mitä pelaaja näkee.
   **Tästä seuraa: erät 1b ja 2 samassa PR:ssä tai peräkkäin ilman julkaisua
   välissä** — ilman estoa feidaus näkyisi suorakaiteena.
6. **STAATTINEN KARTTA (PÄÄTÖKSET 2) on osin ristiriidassa nykytilan
   kanssa.** Pallon merkit ovat maantieteellisesti ankkuroituja mutta
   RUUTUVAKIOKOKOISIA (`scale(0.7727)`, js/pallolauta/nostot.js:308), ja
   maataulu on ruudun nurkassa **omistajan omasta pyynnöstä 11.9.2026**
   (js/fokusmitat.js:321–326). Skaalautuminen on yksi CSS-muunnos rajoineen;
   maataulun siirto on omistajan varmistettava asia (kysymys 2).
7. **Liftauksen autokyytianimaatio on kolmen rivin sauma.** Kuljettajan
   `hyppaa(a, b, kesto, { vaihe })` (js/pallolauta/siirto.js:382) tukee jo
   omaa vaihekäyrää — **mutta vain koneelle** (:302); nappula lukee aina
   `hypynVaihe`n (:222). Kun `vaihe` annetaan, pystykaari jätetään pois ja
   käyrä ajetaan koko nopan matkalle kertaalleen.

## Uudet mittaukset (eivät suunnitelmassa)

- Saapumisrajauksen katon (2000 yks) ylittävien maiden määrä **riippuu
  kuvasuhteesta**: puhelimella 5 (RUS, USA, CAN, GRL, CHN — kuten
  js/pallolauta/kamera.js:135 sanoo), **työpöydällä 1440 × 900 yhdeksän**
  (lisäksi CHL, BRA, ARG, AUS). Tästä syntyi kysymys 1.
- Murrettu paletti on **vähemmän kylläinen kuin pelin nykyinen
  seepiakartta**: kroma ka. 39,1 vs. seepian 68,4 ja täysvärin 77,8. Se on
  se luku, joka vastaa omistajan huoleen *"sotkeeko liiallinen värikkyys
  pelin tyylia"* — uutta on sävykulmien vaihtelu (48° → 83°), ei kirkkaus.
  Konkreettiset asteikot ovat raportin luvussa 2.3 valmiina
  `VARI_ASTEIKKO`/`VARI_SYVYYS_ANKKURIT`-muodossa.
- Värilaataston koko laatikolla × 1,15 (arvio, malli yliarvioi erän 1
  mitatun FRA 84:n 96:ksi): ALB 26 laattaa · GRC 65 · DEU 78 · ESP 96 ·
  ITA 110 · FRA 128 (~4,8 Mt RGBA) · CHN 1168 (~44 Mt) · RUS 4718 (~177 Mt).
  Eurooppa on 1–5 Mt maata kohti.
- Lähin zoomi: `PALLOLAUDAN_LAHIN_LEVEYS 60` yks = 1,80° → 1,35× venytys
  pyramidin 480 px/aste -tasolla. **Pikkuvaltion raja on rasterin raja, ei
  koodin** — suunnitelman `ZOOMI_LAHIN`-muutos ei siirry pallolle.

## Pallon oma riski, jota tasokartalla ei ole

`lepokerroksenKerrokset` (js/pallolaatat.js:351–372) **sammuttaa koko
laattakerroksen**, jos pallon sarjan (laatat.json) ja pyramidin versiot
eroavat tai jos viiva-, nosto- tai rantatason versio ei täsmää. Jokainen
laattoja polttava erä (1b ja 5) on siksi ajettava niin, että molemmat
luettelot päivittyvät samassa julkaisussa, ja savukkeen on luettava
`mittarit().syy`. Erän 5 toinen vastakoe on ainoa kone, joka näkee tämän.

## Erien koot pallolla (muutos suunnitelmaan)

| erä | suunnitelma | pallolla | miksi |
| --- | --- | --- | --- |
| 1b värikerros | (uusi) | **L** | poltettu alfa, `varitasot`-taulu, maanvaihdon mitätöinti |
| 2 zoomi ja punainen | M | **S** | saapumisrajaus on jo tehty |
| 3 maapaneeli | M | **M** | perustiedot ja plus-nappi ovat jo pallolla; uutta on valikko + karttaan kiinnitys |
| 4 kaupungin pop-up | L | **L** | js/lehti.js:n osien irrotus; pallolla ankkuri merkin ruutupisteestä |
| 5 sivut nostoiksi | L | **L** | datatyötä; pallolla versioportti on ankarampi |
| 6 minikysymykset | M | **M** | ei mitään lautakohtaista |
| 7 aarrepiste | S | **S** | piste on jo pallolla |
| 8 Liiku | L | **L** | + nappulan `vaihe`-tuki, syrjäytyksen kumoaminen siirron ajaksi |

## Kysymykset omistajalle (raportin luku 5, neljä kappaletta)

1. Uloszoomauksen kerroin 1,15 — **poikkeus isoille maille** (RUS, USA, CHN,
   BRA osuvat kattoon jo saapumisessa; ilman poikkeusta kamera lukkiutuu
   maailmankuvaan). *Suositus: ei syrjäytystä niille.*
2. Siirretäänkö maataulu ja kartuutsi ruudun nurkasta karttaan? *Suositus:
   siirretään, mutta nurkkatila jää yhden vakion taakse.*
3. Veden peittävyys (suositus 0,70–0,75, erä 1 käytti 0,9) ja feidauksen
   määrä (suositus 0,35) — *mitataan pilottikuvasta, näytetään kolmena
   vaihtoehtona ennen Euroopan ajoa.*
4. Mitkä maat saavat värit ensimmäisessä aallossa? *Suositus: Ranska ja sen
   jälkeen Euroopan kaupunkimaat; RUS, USA, CAN, CHN, BRA, AUS jäävät.*

## Huomiot Fablelle (ei korjattu tässä erässä)

- **Punainen kehä on kahdessa paikassa kahdella arvolla**, kun erä 1 on
  mainissa mutta 1b ei. Ne ovat eri laudoilla eikä pelaaja näe molempia,
  mutta arvo kannattaa lukea yhdestä lähteestä (riski 4.3).
- **`avaaMaalehti(ui, iso, { nimi })` (js/lehti.js:719) ei ota
  sivunumeroa.** Erä 3 tarvitsee `{ sivu }`-parametrin.
- **Merentakaiset osat jäävät ilman väriä ja feidausta** (`SAARIVARA 0.2`,
  js/maanaariviivat.js). Jos pelissä on kaupunki merentakaisella alueella,
  se näkyy seepiana — tarkistettava kaupunkilistasta ennen monistusta.
- **Laitetodennus iPadilla on yhä avoin** (erän 1 luku 7.6). Suositus (A)
  poistaa `clipPath`in pallolta, joten se riski pienenee, mutta
  `LAATTAKATTO_TAVUT` (96 Mt) on yhä mitattava pilotissa.
- **Raportin pituus on 767 riviä**, ei tehtävänannon ~500. Ylitys on
  mitatuissa taulukoissa ja kahdeksan erän vastakokeissa; luku 1 (taustaa)
  voi pudottaa puoleen, jos haluat lyhyemmän version.

## Portit

| portti | tulos |
| --- | --- |
| `npm test` | **3306 testiä, 3293 pass, 0 fail, 13 skipped** |
| docs-only | `git diff --stat origin/main` = vain kaksi tiedostoa docs/raportit/:ssa |
| versionosto | ei tehty (docs-muutos ei nosta versiota) |
