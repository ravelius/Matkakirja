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

## Ilta jatkui: v791–v794

**iPadin kaksi vikaa korjattu (v791).** Alanapit katosivat maasivulla,
koska turva-alueen (`env(safe-area-inset-bottom)`) varaus oli vain
puhelinkokojen media queryssä — iPadilla kotipalkki peitti napit.
Varaus siirtyi kortin perussääntöön. Samassa versiossa juttujen
pystykuvan kokokatto nousi, koska Palais Garnier näkyi liian pienenä.

**Kuvien haku onnistuu ajurilla.** Omistaja kysyi, voiko kuvia hakea
muuta kautta — kyllä: `.github/workflows/` ajaa GitHubin ajurilla, ja
repon salaisuudet (GOOGLE_API_KEY, EUROPEANA_API) ovat siellä
käytettävissä. Kehityskontissa niitä ei ole. Ajo tehdään
työhaarasta, ja tulos on artefakti, joka ladataan ja katsotaan silmin
ennen committia.

**Pariisin kolme uutta kohdetta saivat piirrokset (v792–v793).**
Miniatyyrigeneraattorin kohdelista on käsin ylläpidetty, joten uudet
kohteet piti lisätä sinne ensin — ilman sitä ajo kaatuu heti
"Ei kohteita". Orsay vaati kolme yritystä: prompti kuvasi vain
julkisivun, ja piirtäjä täytti loput omillaan. Vasta kun promptiin
tuli talon oma tunnusmerkki (koko pituudelta kaartuva lasikatto),
kuvasta tuli Orsay eikä yleinen pikkuasema. **Opetus promptiin:
kerro se yksi asia, jota kohteella on ja muilla ei.**

**Kolme kaupunkia sai pystykuvan etusivulle (v794):** Wien
(Stephansdomin kuvioitu katto), Rooma (Trevin suihkulähde) ja
Kööpenhamina (Nyhavn). Vapautuneet kuvat eivät kadonneet vaan
siirtyivät siihen oppaan jaksoon, jonka teksti kertoo samasta
aiheesta — sama temppu kuin Lontoossa, ja se toimii joka kerta.

**Helsinki jäi kesken** ja **oppaiden kolmen kuvan karusellit
samoin.** Syy on sama: Commons alkoi vastata "You are making too many
requests" ja jatkoi sitä viiden minuutin tauonkin jälkeen. Vaarallinen
piirre: virhevastaus on HTML-sivu, ja jos sen tallentaa kuvaksi,
tiedosto näyttää jpg:ltä. Tarkista ladatut kuvat `file`-komennolla.

**Hakutapa, joka toimi** ja kannattaa monistaa: Featured picture
-kategoriat ovat näissä maissa luonto- ja tapahtumapainotteisia
eivätkä sisällä maamerkkejä. Sen sijaan
`gsrsearch=<kohde> incategory:"Quality images"` ja suodatus
`korkeus > leveys × 1,2` tuotti kaikissa kolmessa kaupungissa
kelvollisen pystykuvan ensimmäisellä yrityksellä.

---

# KAPULANVAIHTO TAKAISIN FABLELLE (17.8.2026)

Omistaja 17.8.2026: *"Fable on takaisin. Raportoi jatkossa vain
fablelle."* Tämä osio on koko sijaisvuoron yhteenveto. Sen jälkeen
raportoin roolituksen mukaisesti vain tähän tiedostoon gitillä — en
trigger-työkaluilla enkä omistajalle.

## Julkaistu sijaisvuorolla: v791–v805 (15 versiota, kaikki mainissa)

**Sisältö**

| Versio | Mitä |
| --- | --- |
| v792–v793 | Pariisin kolmelle uudelle kohteelle miniatyyripiirrokset |
| v794 | Wien, Rooma, Kööpenhamina: pystykuva etusivulle |
| v795 | Helsinki: Uspenskin katedraali etusivulle |
| v796 | Viiden oppaan avauskuva kolmen kuvan karuselliksi (paketti O5 valmis) |
| v804 | **Matkailijan Bagdad** — paketin O6 ensimmäinen |
| v805 | **Matkailijan Teheran** — toinen |

**Käyttöliittymä (omistajan iPad- ja iPhone-havainnot)**

| Versio | Vika ja juurisyy |
| --- | --- |
| v791 | Maasivun alanapit kotipalkin alla; turva-alue oli vain puhelimen media queryssä |
| v797 | Oppaan otsikko loveuksen alla; JS:n inline-katto voitti CSS:n eikä vähentänyt turva-alueita |
| v798 | Pöllön kuvapopup 320 px riippumatta ruudusta → 640 px, lähde 1024 px |
| v799 | **Oma regressio v797:stä:** kavensin dialogin kattoa mutta en kortin, jolloin kortti kasvoi dialoginsa yli 32 px |
| v800 | Etusivun avausteksti tummalla pohjalla; se on aina ollut `--map-ink` eli pergamenttityyli |
| v801 | Kohdekortin kaiutin otsikon perään, 5/6-laskuri pois kokonaan |
| v802 | **Sama alanappivika kolmatta kertaa:** v791:n vara oli perussäännössä, mutta `@media (min-width: 700px)` ylikirjoitti sen — ja 700 px on juuri iPadin raja |
| v803 | Kaiuttimen kuvake otsikon kokoiseksi (18 → 22 px) |

## Kolme asiaa, jotka kannattaa muistaa

**1. Turva-alueperhe puri neljä kertaa illassa.** Aina samasta syystä:
mitta asetettiin yhdelle tasolle mutta ei kaikille. Jos jokin reuna
käyttäytyy oudosti iPadilla, epäile ensimmäisenä sitä, että jokin
media query tai sisempi laatikko ylikirjoittaa varauksen. Testit
`tests/rules.test.mjs`:ssä vartioivat nyt tätä: katto luetaan
`--turva-yla`/`--turva-ala`-muuttujista, se kirjoitetaan myös
kortille, ja JOKAISEN arkin kortin padding-säännön on varattava
`safe-area-inset-bottom`.

**2. Commonsin kaksi ansaa.** Rate limit (8 s pyyntöjen väliin,
uusinnat 15/30/45 s) ja `upload.wikimedia.org`:n robottikäytäntö.
Lataa `commons.wikimedia.org/w/thumb.php?f=<nimi>&w=…` ja **korvaa
välilyönnit alaviivoilla**. Molemmat palauttavat HTML-sivun, joka
`.jpg`-nimellä tallennettuna näyttää kuvalta.

**3. Hae kategorioilla, älä hakusanoilla,** kun kaupunki on arabian-,
persian-, korean-, kiinan- tai japaninkielinen. Bagdadissa hakusanat
`Al-Rashid Street`, `Baghdad coffeehouse` ja `Baghdad market`
palauttivat kaikki NOLLA osumaa; `Category:Coffeehouses in Baghdad`
antoi viisi kuvaa.

## Agenttiparvi: mitä opin, ja miksi se oli hidas

Ajoin 10 agentin parven (6 opasta + 4 nähtävyyslistaa). **Se oli
väärä työkalu, ja sanon sen suoraan.**

- Koneessa on 4 ydintä, ja rinnakkaisuuden katto on ytimet − 2 = **2
  agenttia kerrallaan**. Kymmenen agenttia jonotti pareittain viitenä
  kierroksena, 15–27 min kukin: 85 minuuttia.
- Commonsin rajoitus on IP-kohtainen, ja kaikki agentit jakavat saman
  IP:n. Rinnakkaisuus ei siis voinut auttaa pullonkaulaan alunperin.

**Mikä toimi sen sijaan:** kun otin tulokset itselleni, tarkistin 86
kuvaehdokkaan lisenssit **kahdella** API-kutsulla (`titles=` ottaa 50
nimeä kerralla) — 20 sekuntia. Ja katsoin kuvat kontaktiarkkeina
(3×3-ruudukko, jossa kaupunki, kohta ja lisenssi kunkin alla), jolloin
86 kuvaa mahtui kymmeneen katseluun. Tahti nousi noin 15 minuuttiin
per kaupunki.

**Suositus:** teksti kannattaa tehdä agenteilla tai itse (ei tarvitse
rajapintaa; repon nostot ovat valmis faktapohja), mutta kuvahaku
yhteen tahdistettuun jonoon.

## Kesken ja seuraavaksi

**Paketti O6, neljä kaupunkia jäljellä:** Tokio, Soul, Shanghai,
Tripoli. Kaikkien tekstit ja kuvaehdokkaat ovat valmiina — agenttien
tuotokset ja lisenssitarkistus talteen otettuna. **Kuvia ei ole
katsottu silmin** näiden neljän osalta, joten ne eivät ole
julkaisukelpoisia sellaisenaan.

**Omistaja hyväksyi 17.8.2026 kaksi asiaa (eivät siis enää auki):**

1. `js/packs/asia-questions.js:681` maglev-fakta korjataan: väittää
   431 km/h ja alle 8 min, mutta matkanopeus laskettiin toukokuussa
   2021 kolmeensataan ja matka kestää 8 min 10 s.
2. Tripolille tehdään **koko kaupunkiosio** (johdanto, kansikuvat,
   nostot) eikä vain opasta — sillä ei ole avainta
   `kulttuuri-kategoriat.js`:ssä lainkaan.

**Paketti O4 kesken:** Lontoo, Berliini, Wien ja Rooma ovat yhä
kuudessa nähtävyydessä eli haarukan alarajalla. Parven neljä
nähtävyysagenttia ehtivät tuottaa ehdotuksia; ne ovat journalissa
`wf_7c6db5a1-b6f`.

**Paketti O7 odottaa (omistajan tilaus):** Afrikan kaupungit
valmiiksi. Mitattu tilanne: 39 kaupunkia, lehti yhdellä (Kairo).
Kirjattu `docs/tyolista-opukselle.md`:hen.

**PÄÄTÖSTÄ VAATIVA KYSYMYS (kysyin omistajalta, vastausta ei ole
tullut):** Afrikan 38:sta noin kymmenen ei ole kaupunkeja vaan
alueita — Sahara, Ahaggar, Namib, Tšad-järvi, Tanganjika,
Kilimandžaro, Viktorian putoukset, Orjarannikko, Bahr el-Ghazal,
Darfur. Euroopassa vastaava ratkaistiin niin, että Islanti, Lappi,
Kreeta, Sisilia ja Alpit saivat lehden mutta ei kohdekarttaa. Käykö
sama Afrikassa? Vastaus muuttaa noin neljänneksen paketin O7 työstä.

## Raamattuun kuuluvat linjaukset (en kirjoita sinne)

Aiemmassa osiossa mainitut kaksi ovat yhä kirjaamatta: maalehden
nimiö (pelkkä maan nimi + lippu) ja etusivukuvan kaava. Niiden
lisäksi kolmas tältä vuorolta:

**Oppaan avauskuva on aina kolmen kuvan karuselli, ja kuvat valitaan
JAKSON TEKSTIN mukaan** eikä kaupungin yleisistä maamerkeistä.
Pariisin teksti mainitsee emaloidun kadunnimikyltin, Rooman nimeää
kiveyksen sanpietriniksi — ja nyt ne myös näkyvät. Tämä on se ero,
joka tekee karusellista sisältöä eikä koristetta.
