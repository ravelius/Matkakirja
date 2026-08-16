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
2. **`tools/kuvateksti-audit.mjs` ei kata `jaksot[].kuva`** — ja kenttä
   voi nyt olla myös LISTA (Luxembourg 3, Seine 4). Työkalun laajennus
   on omistajan listalla ehto oppaan monistukselle.
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
