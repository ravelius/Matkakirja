# Kaupunkilehti — moduuliohje

*(Moduuli: Kaupunkilehti — docs/moduulirakenne-suunnitelma.md luku 3.
Linjaukset: Raamattu › Kaupungit. Tämä dokumentti kertoo vain MITEN.
Koottu tiedostosta docs/tutki-aiheet.md 17.8.2026, dokumentti-
remontin D3; maalehden osuudet: docs/moduulit/maalehti.md.
Data: js/packs/kulttuuri-kategoriat.js, saatiedot.js,
uutislahteet.js, kohtaamiset.js · Koodi: js/ui.js (lehtikoneisto),
js/saa.js, js/uutiset.js · Työkalu: tools/kirjoita-kategoriat.mjs.)*

## Tutki on paikallislehti

*(Omistajan visio 5.8.2026, v270; linjaus Raamatussa: Kaupungit.)*

Omistajan visio: kansisivullinen kaupunki taittuu paikallislehdeksi.
Kaikki kolme mekanismia ovat datavetoisia — uusi maa tai kaupunki ei
vaadi koodimuutoksia:

- **Lehtitaitto (tarkennettu v277):** kun kaupungilla on aihe id:llä
  `kaupunki`, etusivu rakentuu esittelytekstin ja isojen kuvien
  varaan: masto (ylärivi, kaupungin nimi, päiväysrivi), sää, iso
  pääkuva, esittely, pienempien kuvien pari ja maa omana osastonaan —
  ilman Lue lisää -nappeja ja wikin kuvakarusellia (tekstien pitää
  riittää itsenään, kuvat ovat omia tarkistettuja valintoja
  kategorian `kansikuvat`-listasta). Kansiosion nostot saavat OMAN
  sivunsa heti etusivun jälkeen ja maan aiheet jatkuvat niiden
  perään. Ensimmäinen versio (v270) taittoi nostot etusivulle — sivu
  venyi liian pitkäksi ja maan ydintiedot hukkuivat; älä palaa
  siihen. Lehtimaan intro (esim. Italia europe-artikkelit.js:ssä)
  kirjoitetaan muita pidemmäksi, koska se kantaa maaosaston yksin.
  Muut kaupungit näyttävät etusivun entiseen tapaan
  (`.dialog.lehti`-luokka ohjaa kaiken).
- **Teosgalleria:** nosto voi kantaa `galleria: [{ otsikko, tiedosto,
  selite, lahde }]` -listan (pilotti: Venetsian Canaletto, 6 teosta).
  Noston kuva saa selailunuolet ja laskurin; selite- ja lähderivit
  vaihtuvat teoksen mukana. Suurennos avaa kohdalla olevan teoksen ja
  KOKO SARJAN selattavana täydellä ruudulla (v277) — sama koskee
  etusivun kansikuvia. Peilityökalu poimii galleria- ja kansikuvien
  `tiedosto:`-kentät automaattisesti.
- **Sää (v272):** lehtikaupunki saa mastoon päivän ennusteen ja
  napautuksesta koko vuoden graafin, kun sille on rivi
  `js/packs/saatiedot.js`:ssä (lat/lon + kuukausinormaalit; normaalien
  laskutapa kerrotaan tiedoston alussa). Ilman riviä lehti näkyy
  ilman säätä — mitään ei tarvitse koodata.
- **Kohtaaminen (v274):** "Etsi kätkö" -napin tilalla kohtaamis-
  kaupungissa on hahmon kutsu (esim. "Tapaa gondolieeri"), ja hahmo
  kehystää aarretehtävän tervehdyksineen ja repliikkeineen. Data:
  `js/packs/kohtaamiset.js` (hahmo, nappi, frame, tervehdys, loyto,
  tyhja, vaarin) — uusi kaupunki ei vaadi koodia.
- **Uutiset (v276, hiottu v280):** maaosastossa "Uutisissa tänään" —
  kolme tuoretta otsikkoa paikallisella kielellä pienellä kirjaimella
  maan kartan oikealla puolella (leveällä ruudulla), kun maalla on
  lähde `js/packs/uutislahteet.js`:ssä ja omistajan uutisvälitys on
  käytössä (tools/uutisproxy/OHJE.md; workerin sallitut ovat
  ETULIITTEITÄ, koska myös artikkelisivut haetaan sen kautta).
  Otsikoita ei lyhennetä eikä mukailla. Popup EI tummenna taustaa:
  otsikko, suomennos heti sen alla kevyellä kursiivilla (ilman
  etikettiä), KOKO artikkelin leipäteksti uutissivulta
  ([itemprop="articleBody"]; syötteen kuvaus on varateksti) ja
  "Käännä suomeksi" -nappi, jonka käännös KORVAA alkuperäisen (nappi
  vaihtaa niiden välillä — molemmat eivät mahdu kortille). Sähkeillä
  on suomennos otsikon alla ja artikkelin pikkukuva vieressä.
- **Mediarivi (v284):** maan radio ja tv-kanavan suora lähetys
  vierekkäin uutisten alla (`TV_KANAVAT` uutislahteet.js:ssä;
  YouTuben kanavaupotus live_stream?channel=... seuraa aina
  kulloistakin lähetystä). Tv aukeaa popupiin 16:9-upotuksena.
- **Minitehtävä:** aihe voi kantaa `tehtava: { kysymys, vaihtoehdot,
  oikea, fakta }` (pilotti: Italian Ruoka). Se piirtyy sivun loppuun
  kuponkimaisena tehtäväpalstana, ja vastaus LÖYTYY SAMAN SIVUN
  TEKSTISTÄ — se on lukemisen palkinto, ei tietovisa. Palkkio 10
  puntaa, kerran per lehti (game.actionMinitehtava, avain
  pakka:kaupunki:aihe). Vähintään yksi tehtävä lehteä kohti; sivu saa
  vaihdella maasta toiseen kuin ristikko lehden eri sivuilla.

*Kirjattu v220:ssä, kun Lontoon pilotti (9 aihetta, 54 nostoa) hiottiin
monistettavaksi. Tämä on resepti seuraaville kaupungeille — Lontoo on
mallikappale, jota vasten uutta kaupunkia verrataan.*

## Rakenne

Kaupungin aiheet asuvat `js/packs/kulttuuri-kategoriat.js`:ssä avaimella
`KULTTUURI_KATEGORIAT[cityId]` (paljas kaupunki-id, ei laudan tunnusta —
toimii siksi kaikilla laudoilla automaattisesti). Kategoria:

```js
{
  id: 'historia',          // pieni kirjain, ei ääkkösiä eikä välejä
  nimi: 'Historia',        // näkyy avatun aiheen otsikkona ja aria-labelina
  johdanto: '…',           // 1–2 virkettä: mitä täältä löytyy (154–232 mrk)
  ikoni: '<path …/>',      // VALINNAINEN: oma viivakuvake (24×24, pelkkä ääriviiva)
  nostot: [ { otsikko, teksti, tiedosto, selite, lahde, wiki?,
              musiikki?, musiikkiNimi?, musiikkiNayte?, musiikkiNayteNimi?,
              esikuuntelu?, aani?, aaniLahde? } ],
}
```

Musiikin kuunteluun on kaksi reittiä (7.8.2026): `musiikkiNayte` on
vapaasti lisensoitu äänite (Commons/archive.org; ogg/opus ei soi
iPadilla — käytä mp3:a tai Commonsin transcoded-mp3-osoitetta ja
tarkista se curlilla). Kun vapaata äänitettä ei ole (pop, iskelmä),
anna `esikuuntelu`-kenttään iTunes-hakutermi (esim. `'ABBA Waterloo'`)
— peli hakee Applen 30 s esikuuntelun lennossa. Esikuuntelunostolla on
oltava myös `musiikki`-linkki (Applen ehto). Tarkista termi ennen
julkaisua: `curl 'https://itunes.apple.com/search?term=…&entity=song&limit=1'`
— ensimmäisen osuman pitää olla oikea esittäjä ja kappale.

Kuvake katsotaan järjestyksessä: `kategoria.ikoni` → `AIHE_IKONIT[id]`
(ui.js: vakioaiheet historia, kuvataide, kirjallisuus, musiikki, ruoka,
luonto, tiede, nykytaide, huumori) → yleiskuvake (kirjanmerkki). Uusi
kaupunki ei siis koskaan vaadi koodimuutosta — mutta **käytä vakioaiheita
aina kun voit**, jotta kuvakkeet pysyvät tuttuina kaupungista toiseen.

## Mitat, jotka pitävät

- **Aiheita enintään 9** — yhdeksän kuvaketta mahtuu yhdelle riville
  kapeimmallakin puhelimella (360 px). Kymmenes rikkoo rivin.
- **Nostoja 4–7 per aihe**, tekstit 440–660 merkkiä. Johdanto kursiivilla
  aiheen ylle.
- **Yksi kuva esiintyy kaupungissa vain kerran.** Sama tarina ei saa
  toistua kahdessa aiheessa (Lontoosta siivottiin kaksi tällaista paria).

## Kuvat

- Commons-tiedosto, leveys ≥ 1200 px, lisenssi PD/CC0/CC BY/CC BY-SA,
  ja kuvan SISÄLTÖ tarkistettu silmin selitettä vasten.
- Lähdemerkintä aina muodossa `Tekijä, Wikimedia Commons (LISENSSI)` —
  lisenssiin `(PD)`, ei `(public domain)`. Lisenssi käskee nimetä tekijän.
- Kuvat päätyvät R2-peiliin itsestään: push mainiin käynnistää
  `.github/workflows/peilaa.yml`:n, joka peilaa uudet viittaukset.

### Flickr täydentävänä lähteenä

*(Työkalu: `tools/hae-flickr.mjs` + `.github/workflows/hae-flickr.yml`.)*

Commons, Library of Congress ja Europeana (ks. `tools/hae-kaupunkikuvat.mjs`)
painottuvat vanhaan arkistomateriaaliin ja institutionaaliseen kuvastoon.
Käytä Flickriä TÄYDENTÄVÄNÄ lähteenä silloin kun ne eivät riitä —
erityisesti kahdessa tilanteessa:

1. **Nykyaikainen katukuva.** Commonsin kaupunkikategoriat ovat usein
   vanhoja tai virastomaisia; Flickrissä on tuoretta, elävää katukuvaa.
2. **Ruokakuvat.** Tämä on juuri se aihe, jossa nykyiset kuvat ovat
   esteettisesti heikkoja — arkistokuvissa ruokaa on tuskin ollenkaan,
   ja Flickr on paras vapaasti lisensoitu lähde sille.

**Todennusputki** (kaksivaiheinen, samaan tapaan kuin Commons-haku):
`flickr.photos.search` hakee ehdokkaat lisenssirajattuna (id:t 4, 5, 9,
10 — CC BY 2.0, CC BY-SA 2.0, CC0, PDM; EI koskaan NC- tai
ND-lisenssejä), mutta lisenssi VARMISTETAAN jokaiselle kuvalle vielä
erikseen `flickr.photos.getInfo`-kutsulla ennen latausta. Tekijä
poimitaan `owner.realname`:sta (tai `username`, jos realname puuttuu) —
EI tiedostonimestä. Alle 1200 px kuvat hylätään kuten Commonsissakin.

**Miten Flickr-kuva liitetään lehteen** (18.8.2026, ensimmäinen erä:
Tampere 6 + Firenze 13). Commons-kuvasta poiketen Flickr-kuvalla ei ole
peiliä: pelin kuvamalli laskee sekä peilipolun että alkuperäisen
osoitteen `tiedosto:`-nimestä olettaen sen Commonsin nimeksi, eikä
Flickr-kuva ole kummassakaan. Siksi reitti on toinen — ja se on
saatavuuden kannalta yhtä vahva, koska ensimmäinen porras on repo:

1. **Repokopio on ENSISIJAINEN.** Kuva ladataan Flickrin `_b`-koossa
   (1024 px pitkä sivu) kansioon `assets/valokuvat` nimellä
   `flickr-<id>.jpg`, ja sama nimi kirjataan
   `js/packs/valokuvat-paikalliset.js`:ään. Alkuperäistä `_o`-osoitetta
   EI käytetä missään: se on usein 6000 px ja monta megatavua.
2. **Lähdetaulu** `js/packs/valokuvat-flickr.js`: tiedostonimi →
   `{ osoite, sivu, tekija, lisenssi }`. Taulu antaa varareitin ja
   suurennoksen (`_h`, 1600 px) ja säilyttää lähdemaininnan repossa
   samaan tapaan kuin peilin manifesti.
3. **Työkalut ohittavat nämä nimet**: `tools/peilaa-media.mjs`,
   `tools/fetch-photos.mjs` ja `tools/tarkista-tekijat.mjs` suodattavat
   taulun nimet pois — muuten jokainen ajo hakisi niitä Commonsista ja
   tulostaisi saman 404-rivistön.
4. **Lähdemerkintä** on `Tekijä, Flickr (LISENSSI)` — sama muoto kuin
   Commons-kuvilla, sama tekijänimi kuin `flickr.photos.getInfo`
   antaa. Flickr-sivun osoite jää lähdetauluun.

Vartija on `tests/media.test.mjs`: jokaisella paketeissa käytetyllä
`flickr-*.jpg`-nimellä on oltava taulurivi JA repokopio levyllä, eikä
varareitti saa osoittaa Commonsiin.

**Etusija instituutioille ja vakiintuneille kuvaajille.** Flickrissä
lisenssin merkitsee lataaja itse, ei mikään yhteisövalvottu
mekanismi — toisin kuin Commonsissa. Siksi käyttäjän ilmoittamaan
lisenssiin luotetaan lähtökohtaisesti vain vakiintuneilta tileiltä
(kaupungin matkailuvirasto, tunnettu valokuvaaja, Flickr Commons
-osallistuja tms.), ja JOKAINEN Flickr-kuva katsotaan silmin ennen
peliin liittämistä, aivan kuten Commons-kuvatkin.

### Ruokakuvien laatukriteerit

Nykyiset ruokakuvat ovat heikkoja — näitä kriteerejä käytetään sekä
Flickr-ehdokkaita valittaessa että Commons-ehdokkaita seulottaessa:

- **Luonnonvalo, ei salamavälähdystä.** Salama litistää ruoan ja
  tekee siitä keinotekoisen näköisen; päivänvalo tai pehmeä
  sisävalo toimii aina paremmin.
- **Läheltä kuvattu**, annos tai valmistustyö täyttää kuva-alan —
  ei kaukaa otettua ravintolan yleiskuvaa, josta ruoka erottuu
  vaivoin.
- **Annos tai tekeminen pääosassa.** Käsi joka muotoilee taikinaa,
  wokki joka savuaa, tori jolla kauppias punnitsee — tekeminen
  kertoo yhtä paljon kuin lopputulos.
- **EI laminoituja ruokalistoja, hintakylttejä tai pöytäasetelmia**
  ilman ruokaa. Ne eivät ole ruokakuvia vaan kuvia ruokalistoista.
- **Tori, keittiö ja käsityö ovat parempia kuin studiomainen
  ravintola-annos.** Isoisän matkapäiväkirjan henki on paikan päällä
  nähtyä arkea, ei ravintola-arvostelun kansikuvaa.

## Kulttuurivisa ja litteä taulu

Kulttuurivisa (`kysymys`) asuu yhä litteässä taulussa
(esim. `EUROPE_KULTTUURI[cityId].kysymys`) ja piirtyy saapumiskortille.
Kun kaupunki saa kategoriat, sen litteät `nostot` eivät enää näy —
siirrä niiden ainutlaatuinen sisältö (etenkin musiikkilinkit ja
ääninäytteet) kategorioihin ja jätä litteään tauluun vain `kysymys`.
Varmista, että visan opettava nosto on kategorioissa näkyvillä.

## Työkalu

```
node tools/kirjoita-kategoriat.mjs <sisaan.json> js/packs/kulttuuri-kategoriat.js KULTTUURI_KATEGORIAT <kaupunki>
```

Kirjoitus on yhdistävä: muut kaupungit säilyvät, oma korvautuu.
Työkalu hylkää nostot, joiden kuva on alle 1200 px tai joiden
lähdemerkinnästä puuttuu tekijä — hylkäykset listataan ajon lopuksi.

**ÄLÄ aja tätä `js/packs/maa-kategoriat.js`:lle.** (Opittu v347:ssä
kantapään kautta.) Työkalu kirjoittaa kohdetiedoston KOKONAAN uusiksi
omalla otsakkeellaan, ja siinä katoaa kaksi asiaa kerralla:

1. **Tiedoston muut viennit.** maa-kategoriat.js sisältää myös
   `MAAN_GENETIIVIT`-taulun sekä funktiot `maanGenetiivi` ja
   `maanAiheOtsikko`. Ne katoavat, ja peli kaatuu tuontivirheeseen.
2. **Kentät, joita työkalu ei tunne.** Uudelleensarjallistus kirjoittaa
   vain otsikko/teksti/tiedosto/selite/lahde/wiki/musiikki*-kentät —
   `aika`, `tehtava`, `esikuuntelu`, `kansikuvat` ja `galleria` putoavat
   pois KAIKILTA mailta, myös niiltä joita ei ollut muuttamassa.

Petollisinta on, että ajo näyttää onnistuneen: se tulostaa "0
kategoriaa, 0 nostoa" (koska JSON on eri muotoa kuin se odottaa) ja
kirjoittaa silti tiedoston. Vahinko näkyy vasta testeissä.

Maan aiheet lisätään käsin. Muotoilun saa talon näköiseksi
generoimalla pelkän lohkon ja liittämällä sen paikalleen — vertaa
naapurimaan lohkoon ennen kuin liität.

## Tarkistuslista ennen julkaisua

1. `node tools/tarkista-kaksoisavaimet.mjs` ja koko testistö.
2. Avaa kaupunki selaimessa: aiherivi yhdellä rivillä (myös 360 px),
   jokainen aihe aukeaa, kuvat latautuvat, Lue lisää -napit toimivat.
3. Kuvien tekijämerkinnät näkyvät jokaisessa nostossa.
4. Kulttuurivisa aukeaa saapumiskortilta ja sen aihe löytyy aiheista.
5. **Uudet taustaäänet mitataan HETI luotaessa** (omistajan linjaus
   15.8.2026): jokainen `js/aani-ehdokkaat.js`:ään lisätty äänite
   ajetaan `node tools/mittaa-aanet.mjs --kirjoita` -komennolla ENNEN
   PR:ää, jotta sen voima-kerroin on LUFS-mitattu eikä korvakuulolta.
   Tausta: mittaamattomat raidat kasvattivat tasohaitarin 35 dB:iin ja
   osa hukkui puheväistön alle (korjattu v692). Testi
   `tests/aanitasot.test.mjs` hylkää mittaamattoman äänitteen
   automaattisesti — sääntö ei siis jää muistin varaan.

## Loppu-QA:n tarkistuslista: tunnetut kuvatoistot

Nämä on löydetty työn aikana ja jätetty TARKOITUKSELLA korjaamatta
(Fablen ohje 8.8.2026: kirjaa listalle, korjaus tehdään QA-kierroksella
jos omistaja pitää niitä ongelmana). Molemmat ovat toistoa, eivät
virhettä — kuva on oikea ja lisenssi kunnossa kummassakin paikassa.

1. **Vasa-laiva kahdessa paikassa.**
   `Lateral view of the Vasa ship, Vasa Museum, Stockholm, Sweden
   julesvernex2.jpg` on sekä Ruotsin Historia-aiheessa
   (maa-kategoriat.js SWE) että Tukholman kannessa
   (kulttuuri-kategoriat.js). Vanha, ei tämän kirin tekemä. Sama
   pelaaja näkee molemmat, koska Tukholmassa käydessä maalehti on
   yhden napautuksen päässä.

2. **Kattohaikara pesällä kahdessa maassa.**
   Ukrainan menovinkkien `Family of White storks (35609152356).jpg` ja
   Bulgarian `White stork (Ciconia ciconia) Yastrebets.jpg`. Eri
   tiedostot ja eri maiden lehdet, mutta aihe on sama. Etsin
   Bulgarialle korvaajaa (lentävä pikkukorppikotka, Musalan huippu);
   molemmat olivat mitattavasti heikompia 84 pikselissä, joten kuva
   jäi ennalleen. Jos tämä korjataan, korvaajan pitää olla yhtä
   luettava pienenä — huono kuva on pahempi kuin toisto.

3. **Surun maski kahdesti Magadanissa** (Fablen päätös 15.8.2026,
   Siperian erä 2). Lehden nosto käyttää tiedostoa `Маска Скорби.jpg`
   ja asia-valokuvat.js:n magadan-lohkossa on `Memorial magadan -
   panoramio.jpg` samasta muistomerkistä. Eri tiedostot, sama kohde.
   Noston kuvan on pakko olla maski (teksti kertoo juuri siitä),
   joten toisto hyväksytään samalla linjalla kuin Vasa ja
   kattohaikara.

Tarkistus, joka kannattaa ajaa QA:ssa: koko paketin duplikaattihaku
(kansikuvat + nostot + galleriat + listat) löytää nämä ja kaikki
myöhemmin syntyvät. Skripti on scratchpadissa, mutta sen voi kirjoittaa
uusiksi kymmenessä rivissä — olennaista on, että se katsoo KAIKKI
kuvakentät eikä vain nostojen tiedostoja. Ajettu v407:ssa: 314 kuvaa,
ei yhtään uutta duplikaattia.

## Kolme vikaa, jotka toistuvat agenttien tuottamassa lehtityössä

Nämä eivät ole yksittäistapauksia vaan sama vika eri kaupungeissa.
Kannattaa tarkistaa jokaisesta erästä erikseen.

1. **Käyttäjänimen takaa arvattu oikea nimi.** Barcelonan kansikuvan
   lähteeksi oli kirjoitettu "Pere López", vaikka Commons nimeää
   tekijäksi käyttäjänimen `pere prlpz`. Arvaus näyttää siistimmältä ja
   on tekijänoikeusvirhe. CC BY -kuvissa tekijä on kirjoitettava juuri
   niin kuin `extmetadata.Artist` sen antaa. Lyhenteen saa avata vain
   tarkistettuna (CNG = Classical Numismatic Group).

2. **Minitehtävä osuu kaupungin omaan kulttuurivisaan.** Ateenan
   ensimmäinen tehtävä kysyi foustanella-hameen 400 laskosta — ja
   `europe-kulttuuri.js`:n ateena-visa kysyy jo "Mitä evzonin puvun 400
   laskosta esittävät?" eli antaa luvun kysymyksessään. Kirjoittaja ei
   lukenut visaa, vaikka ohje käskee. Tarkista aina kaupungin
   `kysymys`-kenttä ennen kuin hyväksyt tehtävän.

3. **Fakta on lähdevirke sanasta sanaan, tai siihen on lisätty
   syy-yhteys.** Istanbulin ja Dublinin faktoista oli vaihdettu vain
   sidesana. Istanbulin bozafakta väitti, että juoma saa paksuutensa
   viljasta — lähde ei sano niin. Kumpikin menee helposti läpi, koska
   teksti kuulostaa oikealta.

Kahdeksasta v407:n uudesta minitehtävästä kaikki kahdeksan hylättiin
ensimmäisellä kierroksella. Riippumaton tarkistaja, joka ei näe
kirjoittajan perusteluja ja jolle sanotaan "oleta että jotain on
pielessä", löytää nämä. Pelkkä kirjoittajan oma tarkistus ei löydä.

4. **Tyhjä tai muodollinen katsottu-kenttä** (Siperian erät 1–2,
   Opus 6:n havainto 14.–15.8.2026). Kirjoittaja-agentti merkitsee
   kuvan katsotuksi kirjaamalla pelkän pikselileveyden tai
   päivämäärän — eli ei ole oikeasti katsonut kuvaa, ja selitteeseen
   jää näkemättä jääneitä asioita (Martynovin pyssyt, kotkan saalis).
   Sääntö: katsottu-kenttään kirjataan MITÄ KUVASSA NÄKYY omin
   sanoin; koneellinen tarkistin hylkää tyhjän tai muodollisen
   merkinnän vikana, ja erävastaava katsoo kuvat silti itse ennen
   PR:ää. Sama silmätarkistus paljasti myöhästyneiden linssien
   15 kuvatekstivirhettä erässä 1 — linssit ajetaan LOPPUUN ennen
   PR:ää, ei sen jälkeen.

## Venäjän kaupungit ja Kabul: mukaan, mutta ilman uutisosiota (omistajan linjaus 13.8.2026)

Aasian laudalla on kahdeksan venäläistä kaupunkia (Jekaterinburg,
Novosibirsk, Irkutsk, Jakutsk, Magadan, Kamtšatka, Sahalin,
Vladivostok) sekä Kabul. Ne tehdään normaalisti, neljällä ehdolla:

1. **Ei nykysotasisältöä eikä nykypolitiikkaa missään muodossa.** Sama
   sääntö kuin muualla pelissä. Historialliset tapahtumat ja taistelut
   ovat tavallista historiaa ja sallittuja.
2. **Painotus 1873-henkiseen historiaan, kulttuuriin, maantieteeseen
   ja arkkitehtuuriin.** Isoisän aikakauden näkökulma kantaa nämä
   kaupungit luontevasti.
3. **Uutisosio jätetään pois** Venäjän kaupungeista ja Kabulista:
   valtiollista tai sensuroitua mediaa ei oteta uutislähteeksi, eikä
   korvaavaa riippumatonta paikallislähdettä ole. Lehti toimii ilman
   uutisosiota täsmälleen kuten ei-lehtimaissakin.
4. **Neutraalit maantieteelliset nykytosiasiat saavat näkyä**
   wiki-tiivisteissä, esimerkiksi hallinnollinen asema — sama
   ennakkopäätös kuin Nikosiassa ("Antaa olla").
