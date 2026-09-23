# Lisenssi-inventaario: NC- ja ND-ehtoinen media (Siirtoseppä 23.9.2026)

Fablen kiireellinen tilaus 23.9.2026 klo 10.10: omistajan päätöksellä
pelistä tulee maksullinen, joten NC-aineistot korvataan heti. Pohjana
ovat sisällön viennin `media.json` (20 391 mediaviitettä, haara
`siirtoseppa-vienti`, PR #2890) ja jokaisen viitteen sisarkentät
`nimi`, `lahde`, `lisenssi`, `tekija` ja `musiikkiNayteNimi`. Tulos on
tarkistettu grepillä koko js/-puusta. Lähde: main `eaeda81cf`.

## Tulos lyhyesti

- **Kuvat: 0 NC- tai ND-tapausta.** `js/kuvagalleria.js:156–172`
  `lisenssiKelpaa()` hylkää NC:n ja ND:n ennen muita tarkistuksia, joten
  väite suodatuksesta pitää. Myöskään käsin kuratoitujen Commons-kuvien
  `lahde`-teksteissä ei ole NC- tai ND-merkintää: tarkistettiin 9 360
  Commons-kuvaa, 183 lippua ja 53 Flickr-kuvaa. Seitsemän automaattiosumaa
  oli vääriä: ne tulivat samassa kortissa olevasta NC-äänitteestä.
- **Äänet: 23 NC- tai ND-tiedostoa, ja kaikki soivat oletuksena.** Yksikään
  ei ole pelkkä ehdokas. Suodatus kuten kuvissa puuttuu äänistä kokonaan.
- **Tehosteet, visamusiikki, Lyria-musiikki, Horatio, Livia ja
  saapumispuheet ovat puhtaita.** Ne ovat joko omaa tuotantoa
  (ElevenLabs, Lyria, textdesk) tai CC0- ja CC BY -lähteitä (`sound.js`
  REAL_SAMPLES, `aani-ehdokkaat.js` EHDOKKAAT-oletukset).

| Tyyppi | NC/ND | Missä |
|---|---|---|
| äänimaisema (ambienssikori) | 14 | A: 3 tiedostoa neljässä maisematyypissä, B: 11 Euroopan kaupunkikorissa |
| kenttä-äänite "Kuuntele kieltä" | 3 | C |
| musiikkinäyte "Kuuntele musiikkia" | 6 | D |
| tehoste | 0 | — |
| musiikki (pelin oma) | 0 | — |
| puhe | 0 | — |
| kuva | 0 | — |
| **yhteensä** | **23** | |

## Taulukko: jokainen NC- ja ND-ääni

Peilattu osoite on muotoa `https://media.matkakirja.app/aanet/<nimi>.mp3`
(`peiliAaniPolku`). Alkuperäinen osoite on lähdetiedoston rivillä.

### A. Maisematyyppien korit (`TYYPPI_EHDOKKAAT`, soivat `OLETUSKORIT`-taulun kautta kaikille)

| Lähde:rivi | Nimi | Alkuperäinen | Lisenssi | Käyttö |
|---|---|---|---|---|
| js/aani-ehdokkaat.js:89 | Kaupungin yö (Kairo), rucisko | freesound 723081 | CC BY-NC | `OLETUSKORIT.basaari` (rivi 628) |
| js/aani-ehdokkaat.js:142 | sama tiedosto | freesound 723081 | CC BY-NC | `OLETUSKORIT.kaupunki` (rivi 665) |
| js/aani-ehdokkaat.js:101 | Rantatyrsky, Benson_Arizona | freesound 848927 | CC BY-NC | `OLETUSKORIT.meri` (rivi 639) |
| js/aani-ehdokkaat.js:123 | Ukkosmyrsky Etelä-Afrikassa, tim.kahn | freesound 411996 | CC BY-NC | `OLETUSKORIT.savanni` (rivi 659, alku 52 s) |

Kolme tiedostoa neljässä käyttökohdassa. Nämä soivat kaikissa sen tyypin
kaupungeissa kaikilla mantereilla.

### B. Euroopan kaupunkien korit (`KAUPUNKI_EHDOKKAAT.europe`)

`kaupunkiKori()` (js/aani-ehdokkaat.js:1038–1048) soittaa koko listaa,
joten jokainen rivi soi.

| Lähde:rivi | Nimi | Kaupunki | Lisenssi | Muuta korissa |
|---|---|---|---|---|
| js/aani-ehdokkaat.js:770 | Vanha satama, veneiden narinaa, OR poiesis | Marseille | CC BY-NC-ND | ei muita, joten kori tyhjenee |
| js/aani-ehdokkaat.js:782 | La Rambla ja lintutori, Andrzej Maciejewski | Barcelona | CC BY-NC-SA | ei muita |
| js/aani-ehdokkaat.js:786 | Plaza de Santa Ana, Paz Tornero | Granada | CC BY-NC-ND | molemmat NC |
| js/aani-ehdokkaat.js:788 | Plaza de las Pasiegas, Paz Tornero | Granada | CC BY-NC-ND | molemmat NC |
| js/aani-ehdokkaat.js:820 | Plac Zbawiciela, raitiovaunut, Andrzej Maciejewski | Varsova | CC BY-NC | molemmat NC |
| js/aani-ehdokkaat.js:822 | Leikkipuisto ja katu, Andrzej Maciejewski | Varsova | CC BY-NC | molemmat NC |
| js/aani-ehdokkaat.js:826 | Kahvila vanhassakaupungissa, Andrzej Maciejewski | Krakova | CC BY-NC | toinen on CC BY-SA |
| js/aani-ehdokkaat.js:838 | Piazza San Marco, Flavien Gillié | Venetsia | CC BY-NC-SA | toinen on CC BY-SA |
| js/aani-ehdokkaat.js:850 | Roccazzellen ranta, Andrea Gianessi | Sisilia | CC BY-NC-SA | toinen on PD |
| js/aani-ehdokkaat.js:969 | Kemijoen ranta, Rovaniemi, patrick mcginley | Lappi | CC BY-NC-SA | ei muita |
| js/aani-ehdokkaat.js:981 | Tröllafossin vesiputous, john grzinich | Islanti | CC BY-NC-ND | toinen on CC BY-SA |

Kuudelta kaupungilta kori tyhjenee kokonaan, kun NC-äänitteet poistetaan:
Marseille, Barcelona, Granada, Varsova, Lappi ja Islanti. Näille tarvitaan
korvaaja ennen poistoa, tai niissä soi maisematyypin yleinen kori.

### C. "Kuuntele kieltä" (`EUROPE_KIELET`, yksi kiinteä tiedosto per kaupunki)

| Lähde:rivi | Nimi | Kaupunki | Lisenssi |
|---|---|---|---|
| js/packs/europe-kielet.js:37 | Näyttelyn avajaiset, Andrzej Maciejewski (aporee_51947_59319) | Varsova | CC BY-NC |
| js/packs/europe-kielet.js:41 | Kulkukauppias Gelassa, Andrea Gianessi (aporee_46724_53068) | Sisilia | CC BY-NC |
| js/packs/europe-kielet.js:55 | Nyhavnin rantakatu, weitere (aporee_28276_32572) | Kööpenhamina | CC BY-NC-SA |

Käyttö: `js/sisaltotaulut.js:169–171` (laudat europe, maailmankartta ja
maailma) ja saapumiskortin nappi.

### D. "Kuuntele musiikkia" (`musiikkiNayte`, soi pelissä: js/ui.js:16275–16286)

| Lähde:rivi | Nimi | Nosto | Lisenssi |
|---|---|---|---|
| js/packs/maa-kategoriat.js:3894 | Pipe band, Edinburgh Castle | GBR, "Yhdeksän säveltä, ei yhtään taukoa" | CC BY-NC-SA |
| js/packs/maa-kategoriat.js:13967 | Sibelius: Finlandia, Artur Rodzinski | FIN, "Suomi herää" | CC BY-NC-SA |
| js/packs/maa-kategoriat.js:15296 | Irlantilainen jigi ja reel, Tradschool | IRL, uilleann-pilli | CC BY-NC-SA |
| js/packs/kulttuuri-kategoriat.js:10983 | Cobla soittaa, Tarannà + Cobla | Barcelona, "Sardana tanssitaan piirissä" | CC BY-NC |
| js/packs/kulttuuri-kategoriat.js:15578 | Ukrainalainen sävelmä "Ivanko", Nataliya Bermas | Kiova, "Kobzari lauloi, ja sali vaikeni" | CC BY-NC |
| js/packs/kulttuuri-kategoriat.js:15884 | Šostakovitš: 5. sinfonia, Leopold Stokowski | Pietari, "Sinfonia piiritetyssä kaupungissa" | CC BY-NC-SA |

Näiden nostojen kuvat ovat puhtaita (PD tai CC BY-SA). NC koskee vain
äänitettä, joten korvaukseen riittää `musiikkiNayte`- ja
`musiikkiNayteNimi`-kenttien vaihto tai poisto.

### Lähdeluettelo

`js/lahteet.js:245` ja `:251` kertovat pelaajalle, että äänissä on
"CC BY-NC kohteittain". Kun NC-äänitteet on korvattu, nämä rivit pitää
päivittää.

## Lisenssi tuntematon

- **Kolmannen osapuolen äänet: 0.** Tarkistin kaikki `aani-peilattu`- ja
  `aani-url`-viitteet radiovirtoja lukuun ottamatta. Jokaisen rivin
  nimessä tai lisenssikentässä on lisenssi. Poikkeuksina ovat oma tuotanto
  eli `saapumispuheet.js` (45, textdesk) ja `tyohuone-musiikki.js` (9,
  Lyria ja omat tehosteet).
- **Radiovirrat** (`radiot.js`, 78 asemaa): suoria lähetyksiä, joita ei
  tallenneta eikä jaeta. Tämä on eri lisenssiluokka kuin CC. Maksullisessa
  versiossa pitää silti tarkistaa asemien käyttöehdot: saako virtaa soittaa
  kaupallisessa sovelluksessa?
- **Liput:** 34 lippua on ilman rivikohtaista lisenssiä. Valtaosa lipuista
  on PD:tä (`lippu-tekijat.js`), ja 8 CC BY-SA -lippua on listattu siellä.
- **Ulkoiset kuvaosoitteet:** 24 `kuva-url`-riviä on ilman lisenssiä.
  Tarkistettavaksi Commonsin extmetadatalla.
- **Julisteet:** 114 riviä ilman lähderiviä. Ne ovat oletettavasti omaa
  painoa ("Matkakirjan oma paino", `JULISTE_LAHDE`), mutta tämä on
  varmistamatta.
- **Karttadata** (`repo`, 213 riviä): OpenStreetMapin karttakuvat
  (ODbL). Kaupallinen käyttö on sallittua, jos attribuutio näytetään.

## Menetelmä ja rajat

- Lisenssi on luettu pelin omista kentistä, joihin se on kirjattu
  hakuhetkellä. Lähteen sivuja (Freesound, archive.org) ei haettu. Kun
  korvaaja valitaan, lisenssi tarkistetaan lähteestä.
- Grep-ristitarkistus `grep -rniE "by-nc|nc-sa|nc-nd|noncommercial|by-nd"
  js/` antaa 28 osumaa: 24 äänitteen riviä (23 tiedostoa, koska Kairon yö on
  kahdessa korissa), 2 `lahteet.js`-riviä ja 2
  `kuvagalleria.js`-suodatinriviä, eli kaikki on katettu.
- Muut kaupallisen version kysymykset kuuluvat raporttiin
  docs/raportit/sisallon-siirtoputki-20260923.md, kohta 5.6. Niitä ovat
  CC BY- ja CC BY-SA -attribuutiot, ElevenLabsin ehdot ja tekoälykuvat.

## Suositus

1. Sisältökirjuri korvaa 23 NC-ääntä PD-, CC0- tai CC BY -äänitteillä
   (Freesound-haku lisenssisuodattimella, archive.org ja Commons).
   Järjestys:
   - ensin A-korit, koska ne soivat kaikilla mantereilla
   - sitten D:n kuusi musiikkinäytettä: klassisille teoksille
     (Sibelius, Šostakovitš) kannattaa etsiä PD-levytys
   - lopuksi C ja B.
2. Äänille lisätään sama portti kuin kuville. Testi hylkää `nimi`-kentän
   NC- ja ND-merkinnät `aani-ehdokkaat.js`:ssä, `europe-kielet.js`:ssä ja
   `musiikkiNayteNimi`-kentissä käyttäen samaa `lisenssiKelpaa()`-
   sääntöä. Näin NC ei palaa huomaamatta. Tämä on Pelikoodarin erä.
3. `lahteet.js`:n kaksi riviä päivitetään, kun korvaukset ovat valmiit.

## Jatko 23.9.2026: radiot, liput, ulkoiset kuvat ja julisteet

Fablen jatkotilaus. Yksityiskohdat ovat liitteissä:
[radiot](lisenssi-inventaario-20260923-liite-radiot.md) (115 asemaa
lähteineen) ja
[liput, kuvat ja julisteet](lisenssi-inventaario-20260923-liite-kuvat.md).
Molemmat ovat Sonnet-agenttien verkkoselvityksiä.

### Radiovirrat: yksikään asema ei ole sallittu kaupalliseen käyttöön

Peli soittaa `js/packs/radiot.js`:n 115 asemaa suoraan asemalta
(`js/linssit/radio.js`, `new Audio(url)`, ei välityspalvelinta eikä
tallennusta). Aiempi luku 78 koski vain niitä rivejä, joilta lisenssi
puuttui. Asemia on kaikkiaan 115.

- **Radio Browser** jakaa asemaluettelon vapaasti, mutta palvelu ei anna
  mitään oikeuksia itse lähetyksiin.
- **Kielletty, 16 asemaa.** Tarkistetut suuret yleisradiot kieltävät
  ehdoissaan kolmannen osapuolen kaupallisen käytön ilman sopimusta: BBC
  (GBR ja UGA), Yle, Radio France, ARD/Deutschlandradio, RTVE, NRK,
  Sveriges Radio, ORF, SRG SSR, NPO, CBC, ABC, RTHK, RTP ja VRT. BBC:n ja
  ABC:n sivuja ei saatu auki, joten niiden tieto perustuu hakutuloksiin.
- **Epäselvä, 99 asemaa.** Näistä ei löytynyt julkisia ehtoja, joten
  oletus on, että käyttö vaatii luvan. Ryhmään kuuluvat RAI, DR, TRT ja
  RTÉ sekä kaikki kaupalliset ja paikalliset asemat.
- **Sallittu: 0.**
- **Musiikin välityskorvaukset** (Teosto ja Gramex) jäivät ratkaisematta.
  Suora virta sovelluksessa voi synnyttää oman korvausvelvoitteen, joten
  asiaa on kysyttävä järjestöiltä ennen kaupallista julkaisua.

**Suositus:** maksullisessa versiossa radiolinssi joko poistetaan tai
korvataan omalla äänisisällöllä, kunnes lupia on. Todennäköisesti
halvin vaihtoehto on pitää radio vain ilmaisessa web-versiossa, mutta
epävarmaa on, onko sekään "ei-kaupallista", jos sama peli on myynnissä.
Kaupallisen välittäjän (esim. Radio Garden -tyyppinen palvelu, jolla on
neuvotellut oikeudet) mahdollisuutta ei selvitetty.

### Liput: kaikki kunnossa

183 lipusta 131:llä on lisenssi jo datassa (`lippu-tekijat.js` 8 ja
`lipputiedot.js` 124). Loput 52 haettiin Commonsin rajapinnasta, ja
kaikki ovat Public Domain tai CC0 ilman attribuutiovaatimusta. Aiempi
luku 34 laski sisarkenttiä eri rajauksella. Toimenpiteitä ei tarvita.

### Ulkoiset kuvat: ei yhtään aidosti lisensoimatonta

Ne 24 kuvaa, joilta lisenssi näytti puuttuvan, ovat joko jo
dokumentoituja tai pelin omia:

- Satelliittikuvat (NASA PD), yö- ja reliefikartat sekä kookoskrapu ovat
  kaikki dokumentoituja. Lisenssi on vain objektipuussa syvemmällä kuin
  rivitason tarkistus katsoi.
- Fokusvirtojen `lahteet[]` ovat taustaviitteitä, joita ei näytetä
  pelaajalle.
- **29 isoisän kuvaa ovat pelin omaa kuvaputkea** eivätkä Commonsista:
  `etusivun-isoisakuvat.js` (27 riviä) ja `isoisan-valokuvat.js:43` ja
  `:55`. Niiltä puuttuu vain `lahde`-kenttä, ja naapuririveillä on jo
  vakiintunut ilmaus (`'Matkakirjan havainnekuva'` tai `'Kuvaputken
  generoitu valokuva'`). Korjaukseen riittää kentän täydennys, eikä
  lisenssi ole ongelma.

### Julisteet: selvä, yksi avoin kohta

- **114 julistetta** (`julisteet.js`) ovat tekstistä generoituja OpenAI
  `gpt-image-2` -mallilla (`tools/juliste-ajuri.mjs` →
  `tools/pollo/worker.js`), eivät Commons-johdannaisia. Lähderivi on
  moduulitason vakio `JULISTE_LAHDE = 'Matkakirjan oma paino'`
  (rivi 69), ei rivikohtainen kenttä, ja siksi rivitason tarkistus
  merkitsi ne tuntemattomiksi. Suositus lähderiviksi: *"Matkakirjan oma
  paino, tuotettu OpenAI gpt-image-2:lla"* ja tuotantopäivä.
- **Avoin: kaupunkilehden 394 herokuvaa** (`kulttuuri-kategoriat.js`
  `ampari`). Kun kohdassa on `tarkkaKohde: true`, hero-ajuri lähettää
  mallille 2–4 Commonsin viitekuvaa (PD, CC0, CC BY tai CC BY-SA;
  docs/moduulit/viitekuvat.md). Jos lopputulos katsotaan viitekuvan
  johdannaiseksi, BY- ja BY-SA-ehdot periytyvät. Viitteiden loki
  (`viitekuvat-loki.txt`) on ollut generointiajon paikallinen tiedosto,
  eikä sitä ole repossa. Selvitettävä ennen maksullista versiota:
  1. Kuinka moni heroista käytti viitekuvia? Työlistoista
     `tools/hero-tyolista-*.mjs` saa `tarkkaKohde`-kohteet.
  2. Kirjataan niiden viitteet lähderiville.
  3. Linjataan, riittääkö attribuutio.

### Korvausten tilanne

Sisältökirjurin tiedon mukaan C (kolme kielinäytettä) ja D:n kolme
näytettä (GBR, IRL ja Pietari) ovat PR #2895:ssä, ja D:n loput kolme
(FIN, Barcelona ja Kiova) ovat PR #2897:ssä. **Korit A ja B eivät ole
vielä kenenkään työlistalla.** Niissä on 14 ambienssiääntä
`js/aani-ehdokkaat.js`-tiedostossa.
