# Opus (sijaispäätoimittaja) → Fable: päivän 16.8.2026 luovutus

Hoidin orkestroinnin sinun sijastasi 16.8. iltapäivän, kun viikkolimiitti
loppui. Omistaja ohjasi minua suoraan tässä sessiossa. Neljä julkaisua
mainissa (v782–v784 + roolitus), kaikki Pages-ajot vihreitä.

Omistajan linjaus kesken päivän: **työtä ei tarvitse enää siirtää uusille
sessioille** — se oli sinun tapasi säästää kreditejä. Tein loput itse.

---

## Mitä julkaistiin

| Versio | PR | Sisältö |
| --- | --- | --- |
| — | #1172 | Roolitusrivi sijaispäätoimittajalle |
| v782 | #1173 | **Paketti O3 kokonaisuudessaan** (Opus 27, opas 2.2) |
| v783 | #1174 | Säägraafi lehden tyyliin, Seinen karuselli, paperi ehyeksi |
| v784 | #1175 | iPad: kortin alanapit eivät katoa taustapaluun jälkeen |

### v782 — paketti O3

Opus 27 toimitti kaikki viisi osaa yhdessä vuorossa neljällä
checkpoint-committilla ja poikkeuksellisen hyvän raportin. Katselmoin
diffin merge-basea vasten, todensin ilmastoluvut itse en-Wikipedian
`Template:Paris weatherbox` -wikitekstistä (24/24 lukua täsmäsi
Météo-Francen 1991–2020 normaaleihin) ja kaikki kolme uutta kuvaa
Commonsin API:sta + silmin. Rajaus piti täsmälleen.

Löysin katselmoinnissa yhden vian, jonka korjasin julkaisuun: pelin
yleinen `button:hover:not(:disabled) { background: #43331f }` voitti
uusien painikkeiden oman taustan, joten kainalotaulun rivi ja säägraafi
maalautuivat osoittimella tummaksi laatikoksi lämpimän paperin päälle.
Ei näkynyt Opus 27:n kaappauksissa, koska hover ei ollut päällä.

Opus 27:n oma raportti on PR #1173:n historiassa (`viesti-fable.md`
poistettiin julkaisussa kaavan mukaan) — sen havainnot alla.

### v783 — omistajan palaute iPad-kuvakaappauksista

- **Säägraafi maalehden vuosiennusteen tyyliin** (omistajan tilaus).
  Lainasin `js/saa.js`:n `piirraVuosiSaa`-graafista viisi elävöittävää
  asiaa: pehmeän Catmull–Rom-käyrän, liukutäytön, kuukausipisteet,
  ääripäiden lukemat halolla ja kuluvan kuukauden kaistan. Paletti pysyy
  oppaan petroolina — tyyli lainataan, väri ei. Sadepalkkeja EI tullut:
  oppaan data on lämpötila, eikä keksittyä sadetta piirretä. Pikkugraafi
  ei ole enää mykkä (kertoo 26° ja 3° ilman suurennusta).
- **Seinen jaksoon 4 kuvan karuselli** (omistajan tilaus). Kolme uutta
  kuvaa; lisenssit API:sta, sijainti kuvauksesta ja kategorioista,
  jokainen katsottu silmin. Sillan nimi kuvatekstissä tulee
  kategoriasta (*Details of the Pont Neuf*), ei arvauksesta.
- **Kaksi paperivikaa.** Omistaja näki oppaassa rajan, jossa paperin sävy
  vaihtuu. Syy oli aito kaskadivirhe: arkin oma
  `.dialog.arkki .dialog-card` (0,3,0) on tarkempi kuin
  `.nahtavyys-kortti.opas-kortti` (0,2,0), joten **opas 2.1:n lämmin
  paperi ei ollut koskaan ollut voimassa** — kortti oli lehden viileää
  paperia ja oppaan laatikot loistivat sitä vasten. Etusivulla sama oire
  oli eri asia: Matkailijalle-paneelin vaaleampi pohja loppui ilman
  reunaviivaa keskelle paperia. Paneeli sai hiusviivan ja kevyen varjon.
  Samalla poistui paneelin `overflow: hidden`, joka leikkasi hiljaa
  ylivuotavan sisällön (iPadilla kuvan lähderiviltä katosi "4.0)").

### v784 — iPad-bugi taustapaluun jälkeen

Omistaja: *"alareunasta puuttuu navigointi näppäimet jotka jäävät jonkun
vaalean laatikon taakse. Bugi alkaa kun käy jossain toisessa
sovelluksessa ja palaa takaisin."* Omistaja arvasi oikein: sama perhe
kuin aiemmat iPad-leveysoireet, mutta **pystysuunnassa**. WKWebView
pitää taustalta palatessa vanhan viewportin voimassa; jos vanha oli
nykyistä ruutua korkeampi, `max-height: 100dvh` venyttää kortin ruudun
ali ja alanapit jäävät näkymättömiin. Vierittäminen ei auta, koska
sisältö mahtuu venyneeseen korttiin eikä kortti enää vieri.

Leveys kirjoitettiin jo pikseleinä (`mitoitaArkki`); korkeus saa nyt
saman turvan. Mitta on **pienempi** kahdesta kelvollisesta lukemasta, ja
katto päivittyy vahdin jokaisesta heräämisestä — myös kun leveys ei
muutu lainkaan, mikä oli juuri tämän vian sokea piste.
`tests/rules.test.mjs` vartioi mittauksen suunnan ja vahdin kutsun.

**Tämä on omistajan testattavana** — en pysty toistamaan iOS-oiretta
kontissa, joten korjaus on perusteltu tiukennus eikä todennettu ruudulla.

---

## Sinulle päätettäväksi 17.8.

1. **`matkailu.hyvaTietaa` on rikkova muutos monistukselle.** Kenttä on
   nyt `[{otsikko, teksti}]`, ei `[teksti]`. Pariisi on ainoa kaupunki,
   jolla kenttä on, joten mitään ei hajonnut — mutta vanhalla mallilla
   kirjoitettu rivi renderöityy TYHJÄNÄ. Opus 27 harkitsi
   yhteensopivuushaaraa ja jätti sen pois perustellusti (hiljainen vika
   olisi pahempi). **Sano tämä monistuserän tehtävänannossa suoraan.**
2. ~~`tools/kuvateksti-audit.mjs` ei kata `jaksot[].kuva`~~ **TEHTY
   illalla** (v786:n yhteydessä): audit kattaa nyt
   `matkailijalle.kuva`, `artikkeli.kuvat` ja `jaksot[].kuva` myös
   listamuodossa. Tämä oli omistajan ehto monistukselle, joten se
   tehtiin ensin.
3. **`tools/hae-commons.mjs` kaatuu kuristusvastaukseen.** Commons
   vastaa ruuhkassa tekstillä "You are making too many requests", ja
   työkalu yrittää jäsentää sen JSONina. Yhden `if`-lauseen korjaus.
   Kontissa peräytys 20/40/60 s ei riittänyt tänään — tarvittiin
   8 yritystä ja 15–75 s välit.
4. **Kolme uutta kuvaa puuttuu R2-peilistä** (Seinen kolme + Opus 27:n
   kaksi Luxembourgista). Varareitti Commonsiin toimii, mutta tarkista
   että `peilaa.yml` on ajettu.
5. **Kainalorivien perustelut eivät ole enää sivun tekstissä** — ne
   syntyvät DOMiin vasta napautuksesta. Tilattua käytöstä, mutta
   tekstihaku tai pituusaudit ei näe niitä.
6. **€€€-asteikkoa ei ole yhä selitetty missään** (Opus 26:n havainto 3).
   Nyt kun kainalotaulussa on miniponnahdus, hintaluokalle olisi
   luonteva paikka samanlaisen takana.
7. **Etusivun paneelin sävyratkaisu on minun tulkintani.** Pidin
   omistajan tilaaman vaaleamman pohjan ja tein siitä selvästi kehystetyn
   paneelin. Jos hän tarkoitti, että paneelin pitäisi olla samaa paperia
   kuin lehti, se on yhden rivin muutos toiseen suuntaan.

## Odottaa yhä omistajaa

Ennallaan siitä, mihin jäit: opas 2.x:n monistus muihin kaupunkeihin
(ensin kohta 2 yllä), Pariisin etusivukuvien (v771) hyväksyntä → kuvahaut
9 kaupunkiin, v775-äänten kuuntelutesti. En aloittanut Maxin työlistaa
(moduulirakenne + dokumenttiremontti) — se on varattu sinulle.

## Roolitus

Opus 27 on kuitattu VALMIS-tilaan. Sen sessio on yhä auki valmiudessa;
en arkistoinut sitä ilman omistajan lupaa.

---

# JATKO-OSA: illan työt (v783–v787)

Omistaja jatkoi ohjaamista illalla, ja päivä venyi. Yhteenveto siitä,
mitä luovutuksen kirjoittamisen JÄLKEEN tapahtui.

## Julkaisut

| Versio | PR | Sisältö |
| --- | --- | --- |
| v785 | #1177 | Sääennuste 32 lehteen, oppaan graafi lehden omaksi, maasivun nimiö |
| v786 | #1178 | Matkailijan opas viiteen kaupunkiin |
| v787 | #1179 | Lippu maasivun otsikkoon, Eiffel etusivulle, etusivukuvan kaava |

## Isoin asia: opas on nyt kuudessa kaupungissa

Omistaja hyväksyi monistuksen ja tilasi sen viiteen kaupunkiin
(Lontoo, Wien, Berliini, Rooma, Kööpenhamina) omaa tsekkiään varten.
Ne on tehty. **Teksti ei ole uutta**: jokaisen artikkelin viisi
kappaletta olivat jo aiheittain jaettuja ja oppaan jaksomitassa, joten
ne siirtyivät jaksoihin sanatarkasti ja kuvat seurasivat aiheitaan.
Uutta ovat ingressi, nosto ja matkailu-lohko.

**Matkakassa puuttuu kaikista viidestä** ja se on tietoinen aukko:
Pariisin hinnat ovat operaattorin ja museon omilta sivuilta
päivämäärällä tarkistettuina, enkä päässyt vastaaviin lähteisiin
näille kaupungeille (TfL 403, Wikivoyagessa ei ajantasaisia hintoja).
Keksittyjä hintoja en kirjoita. Laatikko ilmestyy heti kun
`matkailu.hinnat` täytetään — viisi riviä per kaupunki.

## Sääennuste puuttui 41 lehtikaupungista

Ei kahdesta, kuten omistaja arveli. 32 sai rivinsä `SAATIEDOT`-
pakettiin; normaalit laskettu ERA5:stä (1991–2020) samalla
menetelmällä kuin paketin vanhat rivit, ja menetelmä varmistettiin
ajamalla se Lontoolle, jonka rivi oli jo olemassa. **Yhdeksän kohdetta
jäi ilman**: islanti, lappi, kreeta, sisilia, alpit, sana, aden,
salalah, mosul — niillä ei ole kohdekarttaa, josta koordinaatit
lukisi. Ne tarvitsevat päätöksen.

## Oppaan graafi on nyt kirjaimellisesti lehden graafi

Omistaja: *"käytä juuri samaa."* Oma käyräpiirrin (208 riviä JS,
135 riviä CSS) ja oppaan oma ilmastodata poistettiin; opas kutsuu nyt
`piirraVuosiSaa`ta. Kaupungin luvut ovat yhdessä paikassa, ja
monistuksessa graafi tulee mukana ilman uutta dataa.

## Kaksi bugia, jotka kannattaa tietää

1. **Opas 2.1:n lämmin paperi ei ollut koskaan voimassa.** Arkin oma
   `.dialog.arkki .dialog-card` on tarkempi valitsin kuin
   `.nahtavyys-kortti.opas-kortti`. Kaskadi voitti hiljaa.
2. **Maan karttasivu piirtyy omalla koodillaan.** Lisäsin lipun
   dataan (v785) ja se ei näkynyt (v787 korjasi): `piirraMaaEtusivu`
   rakensi otsikkonsa itse. Otsikkorivi on nyt yhteinen apuri.
   Tämä on hyvä muistaa aina kun maan sivuille lisätään jotain.

## Uusi paketti työlistalla: O4, nähtävyyksiä lisää

Omistajan linjaus: nähtävyyksiä saa olla 6–15 per kaupunki. Mittasin:
**53 kaupungista 46:lla on tasan kuusi** eli haarukan alaraja — kuutonen
ei ole harkittu määrä vaan lähtötaso. Pariisi on paketissa pilottina
(8 → 12–14), ja samalla korjataan kaksi kohdetta, jotka ovat kartalla
ilman omaa juttuaan: Wienin Schönbrunn ja Budapestin Sankarien aukio.

## Linjaukset, jotka kuuluvat Raamattuun

Omistaja pyysi kirjaamaan maasivun otsikkolinjauksen Raamattuun. En
kirjoita sinne, koska tämän session sitova raja on että vain sinä
kirjoitat Raamattuun — kerroin sen omistajalle. **Kirjaa nämä kaksi:**

1. **Maalehden nimiö** on pelkkä maan nimi ja lippu sen perässä.
   Aiemmin luki "Ranska kartalla", vaikka kartta näkyy sivulla
   itsestään.
2. **Etusivukuvan kaava** (kuuluu osioon "Kuvat ja lähteet"):
   Matkailijalle-osion kuva on osion myyntikuva. Yksi aihe joka
   täyttää ruudun, paikan oma erikoisuus, Featured/Quality image jos
   sellainen on, selkeä valo ja pääaihe pois nauhan alta. Omistajan
   sanoin: *"yksinkertainen, laadukas ja houkutteleva eli wow efekti
   jostain maan erikoisuudesta."* Kaava on nyt työlistassa; Raamattuun
   siitä kuuluu tiivistelmä.
