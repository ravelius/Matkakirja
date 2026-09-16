# Topografialinssi tökkii: vaalea välivaihe pois, jäänteet pois

*(Opus-työsessio → Fable, 16.9.2026. Haara
`claude/bold-ride-vow4ki-topo-tokkii`, pohja `origin/main` (v1923,
70267f5c). Ei versionostoa, ei muutoslokiriviä, ei PR:ää, ei
Raamattu-riviä. Lähde: omistajan vikailmoitus puhelimelta, sanatarkasti:
*"Topografia linssi tökkii (vaalea kartta piirtyy ilmeisesti ensin ja
sitten Topografia sen päälle) lisäksi näytölle jää ilmeisesti kuvia sekä
ainakin pulun mini puhekupla jossa plus merkki"*.)*

## 0. Lyhyesti

- **Molemmat havainnot pitivät paikkansa, ja molemmat ovat nyt
  mitattuja.** Mittaus ajettiin 390 × 844 dpr 2 -ruudulla OIKEALLA
  pelitallenteella Ateenaan, saapumiskortti auki ja isoisän luenta
  soimassa — eli juuri siinä tilassa, jossa omistaja linssin avasi.
- **"Vaalea kartta ensin" oli kahden sekunnin välivaihe.** Linssi
  riisui kartan (pelin kerrokset, saapumiskuva, tasoituskerma) heti
  napautuksesta, mutta reliefi tuli ruudulle vasta 3,8 sekunnin
  kuluttua. Väliin jäi paljas pelikartta. Mitattu aikajana luvussa 2.
- **"Tökkii" oli 1,3 sekunnin pitkä tehtävä pääsäikeessä**, kun
  4096 × 2048 -pohjakuva purettiin ja vietiin näytönohjaimelle
  `<img>`-oliona. Sama työ ImageBitmapina maksaa **63 ms eli 4,6×
  vähemmän** (mitattu erikseen, luku 3.2).
- **Jäänteitä oli kaksi, molemmat nimeltä:** pulun **pluskupla**
  (`button.pollo-kuplapalautus`, 44 × 44 px) ja **luentakuvapakka**
  kartalla (`div.fokusvirta-luentakuva.pieni` + `.pulucam-kortti` ja
  kaksi `<img>`, 62 × 52 px). Ne ovat ne "kuvat" ja se "mini puhekupla
  jossa plus merkki". Luku 4.
- **Korjaus on kolme asiaa:** odotuspeite (linssi avautuu yhdellä
  siirtymällä, ei paljasta karttaa), purku työsäikeeseen
  (`createImageBitmap`) ja kaksi CSS-sääntöä.
- **Miksi 1400 pikselin savuke ei nähnyt jäänteitä:** se ajoi pelin
  toimintavaiheessa Pariisissa ilman luentaa — silloin pulu ei ole
  puhunut eikä kuvapakkaa ole nostettu kartalle. Lisäksi pluskupla on
  PUHELIMEN oma ilmiö: leveällä ruudulla kuplat jäävät pinoon.
  Savukkeeseen tuli siksi kokonaan uusi ajo (390 px + luenta, luku 5).

## 1. Mitä muutettiin ja missä

| tiedosto | muutos |
| --- | --- |
| `js/linssit/topografia.js` | **Odotuspeite**: tumma kalvo kotelon päälle avauksen ajaksi, pois vasta kun reliefi on oikeasti ruudulla. Linssien yhteinen portti asetetaan vasta kun peite on perillä. `?topopeite=0` ottaa peitteen pois (vartijan vastakoe). `tila()` raportoi peitteen. |
| `js/pallolauta/linssit.js` | `lataaKuva` purkaa kuvan `createImageBitmap`illa työsäikeessä ja kääntää sen valmiiksi (`imageOrientation: 'flipY'`); `teeTekstuuri` saa `kaannetty`-lipun ja asettaa `flipY = false`. `<img>` jää varapoluksi. Purettu bittikartta suljetaan kalvon vapautuksessa. Uusi `siirtymaMs()`. |
| `css/styles.css` | `body.linssi-topografia`: pluskupla, kuplapino, pöllöpaneeli, luentakuvapakka ja fokusvirran kuplat/kortit piiloon (`visibility` + `pointer-events`). |
| `tools/savukkeet/savuke-topografialinssi.mjs` | **Uusi ajo**: 390 px, luenta käynnissä, avauksen aikajana kompositorin kehyksistä. 10 uutta väitettä vastakokeineen. |

## 2. Juurisyy 1: vaalea välivaihe — mitattu aikajana

Mittaus: Chromium, 390 × 844, dpr 2, oikea tallenne Ateenaan,
saapumiskortti auki, isoisän matkakirjaluenta soi. Kehykset otettiin
**kompositorilta** (`Page.startScreencast`), ei
`Page.captureScreenshot`illa — jälkimmäinen jonottaa pääsäikeen taakse,
ja mitattuna kaappausväli venyi avauksen aikana **2,4 sekuntiin**, eli
mittari olisi mitannut itseään. Tilat luettiin sivun omasta
kehyssilmukasta.

### 2.1 Ennen korjausta

| t (ms) | mitä ruudulla | ruudun keskipisteen kirkkaus |
| --- | --- | --- |
| < 0 | peli: saapumiskuva, kartta, pulu, pluskupla | **96,9** |
| 0 | linssi valitaan; portti päälle | 96,9 |
| ~1 700 | **PALJAS VAALEA PELIKARTTA** (kuva, kyltit ja kerma poissa, reliefiä ei vielä) | **68,7** |
| ~2 500 | pohjakuva ladattu (`ladattu = true`) | 68,7 |
| 2 190–3 295 | **pitkä tehtävä 1 105 ms** (purku + vienti näytönohjaimelle) | 68,7 |
| ~3 800 | kalvon häivytys valmis, reliefi ruudulla | **91,5** |

Eli pelaaja näki **kolme näkymää peräkkäin**: pelinsä, paljaan kartan ja
vasta sitten linssin. Keskimmäinen kesti noin kaksi sekuntia. Juuri se on
omistajan *"vaalea kartta piirtyy ilmeisesti ensin"*.

Huomaa, että **paljas kartta ei ole pelinäkymää kirkkaampi** (96,9 →
68,7): pelkkä kirkkausraja ei siis riitä vartijaksi. Ks. luku 5.2.

### 2.2 Jälkeen

| t (ms) | mitä ruudulla | kirkkaus |
| --- | --- | --- |
| < 0 | peli | 96,9 |
| 0 | linssi valitaan; **odotuspeite alkaa häipyä näkyviin** | 96,9 |
| 0–290 | peitteen siirtymä; portti EI vielä päällä, kartta pysyy pelinä | 96,9 → 4,4 (monotoninen) |
| 290 | portti päälle peitteen alla — pelaaja ei näe riisumista | 4,4 |
| 290 … valmis | tumma lasi; reliefi latautuu ja viedään näytönohjaimelle | 4,4 |
| valmis | peite häipyy pois, **valmis reliefi paljastuu** | 91,5 |

Ruutu ei nouse kertaakaan pelinäkymää vaaleammaksi (mitattu savukkeessa:
huippu 82,7 vs. ennen-taso 93,6), eikä paljaan kartan näytteitä ole
yhtään. Vastakoe `?topopeite=0` antaa samassa ajossa **8 paljasta
näytettä 11:stä**.

**Miksi tumma eikä "pidetään nykyinen kartta".** Kokeiltiin molempia.
Nykyisen kartan pitäminen tarkoittaisi, että napautus ei tee mitään
sekuntikausiin — ja puhelimella saapumisen valokuva peittää kolmanneksen
ruudusta, joten alle häivytettyä reliefiä ei näkisi. Tumma peite antaa
napautukselle heti vastauksen ("lasi menee silmille") ja on se, mitä
tehtävänantokin ehdotti. Sävy on linssiperheen oma tumma seepia
`rgba(20, 16, 10, 0.96)`.

**Portti odottaa peitettä.** Ensimmäisessä korjausyrityksessä portti
meni päälle samassa kehyksessä kuin peite luotiin, ja koska peite on
CSS-siirtymä joka lähtee nollasta, paljas kartta välähti sen alta juuri
siirtymän ajan (mitattu: keskipiste 100,9 → 68,7 → 4,4 kolmen
kymmenesosasekunnin aikana). Portin asetus viivästettiin siirtymän yli,
ja kesto kysytään moottorilta (`linssit.siirtymaMs()`) eikä kopioida
linssiin.

## 3. Juurisyy 2: tökkiminen — purku pääsäikeessä

### 3.1 Mistä nykäys tuli

`js/pallolauta/linssit.js` latasi kalvon kuvan `<img>`-oliona ja antoi
sen three.js:lle tekstuuriksi. `<img>`:n `load` EI tarkoita, että kuva
olisi purettu: purku tapahtuu vasta kun WebGL pyytää sitä
`texImage2D`:llä — **keskellä pääsäikeen kehystä**. Mitattuna se näkyi
yhtenä 1,1–1,3 sekunnin pitkänä tehtävänä juuri sillä hetkellä, kun
`ladattu` kääntyi todeksi.

### 3.2 Mitä se maksaa, mitattuna

Chromium, sama kontti, 4096 × 2048 WebP (pallon 4k-pohja):

| vaihe | `<img>` | `createImageBitmap` |
| --- | --- | --- |
| haku | 657–908 ms (`load`) | 259–272 ms (`fetch` → blob) |
| purku | **tapahtuu vasta viennissä** | 279–289 ms **työsäikeessä** |
| vienti näytönohjaimelle (`texImage2D` + `finish`) | **287–353 ms** | **57–86 ms** |
| sama + `generateMipmap` | 304–377 ms | 59–86 ms |

Pääsäikeelle jäävä hinta putoaa siis **noin 290 ms:stä noin 60 ms:iin
(4,6×)**, ja purku siirtyy kokonaan pois pääsäikeeltä. Mipmapien
generointi ei ole syyllinen — se ei näy mittauksessa lainkaan.

Savuke mittaa tämän joka ajolla samalla sivulla (viimeisimmät luvut
`<img>` 257 ms, ImageBitmap 57 ms) ja vaatii bittikartan hinnaksi
korkeintaan puolet.

### 3.3 Kääntö tehdään purussa, ei viennissä

`createImageBitmap(blob, { imageOrientation: 'flipY' })` kääntää kuvan
valmiiksi työsäikeessä, ja tekstuuri saa `flipY = false`. Silloin
lopputulos ei riipu siitä, kunnioittaako selain
`UNPACK_FLIP_Y_WEBGL`-lippua ImageBitmapille — se on historiallisesti
vaihdellut, ja väärä kääntö panisi mantereet ylösalaisin ilman yhtään
virhettä lokissa. Savuke tarkistaa linssin OMAN tekstuurin: sen on
oltava `ImageBitmap` ja `flipY === false`. Kalvo tunnistetaan
näyttämöltä syvyyssiirrosta (`KALVON_SYVYYSSIIRTO`), koska näyttämöllä
on muitakin 4096 pikselin tekstuureja — ensimmäinen osuma oli mitattuna
väärä.

Varapolku on ennallaan: jos `fetch` tai `createImageBitmap` ei onnistu,
palataan `<img>`:iin. Kuva tulee silloin hitaammin mutta tulee.

### 3.4 Mitä pitkille tehtäville EI voi luvata tässä kontissa

**Ehdoton 150 ms:n raja ei ole täällä mitattavissa.** Sama mittaus
osoitti, että ohjelmistorenderöity pallo tuottaa **lepotilassakin, ilman
mitään linssiä**, 0,5–1,3 sekunnin pitkiä tehtäviä: mediaani 568 ms ja
maksimi 652 ms kevyellä kuormalla, 1 316–1 690 ms silloin kun rinnalla
ajoi toinen työsessio. Sitä taustaa vasten "≤ 150 ms" kertoisi kontin
kuormasta eikä linssistä.

Vartijaksi jäi siksi kaksi asiaa, jotka ovat mitattavissa:

1. **Mekanismi**: ImageBitmapin vienti ≤ puolet `<img>`:n hinnasta,
   samalla sivulla samasta kuvasta (mitattu suhde 0,22–0,38).
2. **Romahdusvartija**: avauksen pisin tehtävä ei saa kolminkertaistaa
   sivun omaa lepotason pisintä tehtävää (mitattu 1 979 / 1 627 ms =
   1,22× ja 3 368 / 1 690 ms = 1,99×). Raja on väljä tarkoituksella —
   se pysäyttää esimerkiksi synkronisen purun, joka veisi kymmenen
   sekuntia, ei hienosäädä millisekunteja.

Lisäksi kannattaa huomata, että nykäys tapahtuu nyt **odotuspeitteen
takana**, jossa mikään ei liiku. Pelaaja ei näe tökkivää siirtymää,
koska siirtymää ei ole käynnissä.

## 4. Jäänteet: mitä ruudulle jäi ja miksi

Mittaus kävi läpi **koko DOM-puun** (ei nimilistaa) ja poimi kaikki
näkyvät elementit, joiden pinta-ala on yli 400 px² ja jotka eivät kuulu
sovelluksen omaan kehykseen (yläpalkki, sivupalkki) eivätkä linssiin.

| elementti | koko | mistä tuli | miksi jäi |
| --- | --- | --- | --- |
| `button.pollo-kuplapalautus` | 44 × 44 px (1 936 px²) | js/pollo.js `varmistaKuplanPalautus` | `position: fixed`, body:n suora lapsi. Ei ollut yhdenkään linssiportin säännössä — ei edes satelliittilinssin `aikajana-pulu-piilossa`-listassa, joka piilottaa pulun ja kuplapinon. |
| `div.fokusvirta-luentakuva.ankkuroitu.pieni` | 62 × 52 px (3 231 px²) | js/fokusvirta.js `naytaPulunKuvapakka` | Sääntö `body.aikajana-paalla .fokusvirta-luentakuva { display: none }` on olemassa — mutta **`css/aikajana.css`:ssä**, jota ei ladata topografialinssin kanssa. Sama vika kuin nimikylteillä ja nostoilla edellisessä erässä. |
| `div.fokusvirta-kuvatila`, `button.fokusvirta-kuva`, `img`, `div.pulucam-pakka`, `div.pulucam-kortti.pulucam-paalla`, `button.pulucam-kuva`, `img` | 2 367–2 586 px² kukin | pakan lapsia | tulevat pakan mukana |

Ne kaksi viimeistä riviä ovat omistajan *"kuvia"*: isoisän luentakuva ja
pulun PuluCam-kortti kaupungin kohdalla kartalla. Saapumisen ISO valokuva
(`.fokusvirta-isokuva`) oli jo edellisessä erässä listalla ja piiloutui
oikein — pieni pakka on eri elementti eikä tule sen mukana.

**Korjaus** on yksi sääntö `css/styles.css`:ssä (aina ladattu):

```
body.linssi-topografia .pollo-kuplapalautus,
body.linssi-topografia .pollo-kuplapino,
body.linssi-topografia .pollo-kuplapino-kehys,
body.linssi-topografia .pollo-paneeli,
body.linssi-topografia .fokusvirta-luentakuva,
body.linssi-topografia .fokusvirta-luentakuva-ankkuri,
body.linssi-topografia .fokusvirta-kupla,
body.linssi-topografia .fokusvirta-kortti,
body.linssi-topografia .fokusvirta-huudahdus {
  visibility: hidden;
  pointer-events: none;
}
```

`visibility` eikä `display`: pakka on ankkuroitu kartalle ja sen paikka
lasketaan kameran mukaan, joten `display: none` veisi siltä mitat ja kuva
ilmestyisi linssin sulkeuduttua hetkeksi väärään kohtaan.

**Puhelimen omia variantteja ei tarvittu.** Läpikäynti ei löytänyt
yhtään `@media`-sääntöä, joka palauttaisi näkyvyyden näille
valitsimille; pluskuplan puhelinkohtaisuus on pelin omassa logiikassa
(js/pollo.js `lisaaPinoon`), ei tyylitiedostossa.

**Mitä ruudulle JÄÄ tarkoituksella:** yläpalkki (logo, kello,
vuorokapseli, valikot), sivupalkin alanappirivi ja linssin oma
selitekortti. Linssi suljetaan niistä, eikä omistaja maininnut niitä.

### 4.1 Sama aukko on muissakin linsseissä

`button.pollo-kuplapalautus` puuttuu myös
`body.aikajana-pulu-piilossa`-listasta (`css/satelliitti.css`,
`css/aikajana.css`, `js/linssit/satelliitti.js`,
`js/linssit/ihmisen-matka-esitys.js`). Satelliitti- ja Ihmisen matka
-linsseissä pluskupla jää siis puhelimella samalla tavalla ruudulle.
**Tätä ei korjattu tässä erässä**, koska satelliittilinssin tiedostoissa
työskenteli samaan aikaan toinen sessio. Yhden valitsimen lisäys niihin
kolmeen listaan riittää.

## 5. Vartiot

Savukkeeseen `tools/savukkeet/savuke-topografialinssi.mjs` tuli kokonaan
uusi ajo: **390 × 844 dpr 2, oikea tallenne Ateenaan, saapumiskortti
auki, isoisän luenta soimassa**, pulun pluskupla ja luentakuvapakka
ruudulla. Vanha ajo pakotti pelin toimintavaiheeseen Pariisiin — siinä
tilassa mitään omistajan näkemistä jäänteistä ei ole olemassa, ja juuri
siksi 28 vanhaa väitettä meni läpi vian kanssa.

| väite | mitä mittaa | mitattu |
| --- | --- | --- |
| omistajan tila toistui | luenta soi, saapumiskuva, pluskupla JA kuvapakka olivat ruudulla ennen linssiä | kaikki neljä |
| avauksen aikana ruutu ei ole ennen-linssiä-tasoa vaaleampi | ruudun keskipiste kompositorin kehyksistä, ≥ 20 kehystä | huippu 82,7 vs. raja 103,0 (34–61 kehystä) |
| paljaan kartan näytteitä 0 | sivun kehyssilmukasta: portti päällä, ei peitettä eikä reliefiä | 0 / 11 |
| kartan päällä ei yhtään jäännettä (> 400 px²) | koko DOM-puu, ei nimilista | 0 kpl |
| avaus ei kolminkertaista lepotason pisintä tehtävää | longtask-tarkkailija | 1 979 / 1 627 ms |
| ImageBitmapin vienti ≤ puolet `<img>`:n hinnasta | `texImage2D` + `finish` samalla sivulla | 57 / 257 ms |
| pohjatekstuuri on valmiiksi käännetty ImageBitmap | linssin oma kalvo näyttämöltä | `ImageBitmap`, `flipY false` |
| ei sivuvirheitä | | 0 |
| **vastakoe** `?topopeite=0` | ilman peitettä kartta ON paljaana | 8 / 11 näytettä |
| **vastakoe** | jäänteiden piilotus ei riipu peitteestä | 0 kpl |

### 5.1 Uusi kehittäjän vipu

`?topopeite=0` ottaa odotuspeitteen pois. Sama kuvio kuin
`?tarkennus=0`. Se on vartijan vastakoetta varten: ilman sitä väite
"paljaan kartan näytteitä 0" kertoisi vain, että jokin on tummaa.

### 5.2 Miksi pelkkä kirkkausraja ei riitä

Tehtävänannon väite (a) — keskipisteen kirkkaus ei ylitä
ennen-linssiä-tasoa +10 % — on toteutettu ja se pitää. Mutta se **ei
yksin erota korjattua avausta rikkinäisestä**, koska mitattuna paljas
pelikartta ei ole saapumisnäkymää vaaleampi (96,9 → 68,7 → 91,5).
Väite (b), paljaan kartan näytteet, on se joka erottaa — ja sillä on
vastakoe, joka todistaa sen mittaavan oikeaa asiaa.

## 6. Portit

| portti | tulos |
| --- | --- |
| `savuke-topografialinssi.mjs` | **38/38** (28 vanhaa + 10 uutta, kaksi ruutua + avausajo vastakokeineen) |
| `savuke-linssivika.mjs` | **6/6** |
| `savuke-maailma-ei-kermaa.mjs` | **6/6** |
| `savuke-astro-pallo.mjs` (`NAKYMAT=puhelin`) | **31/31** |
| `node --test tests/pallolinssit.test.mjs tests/satelliitti.test.mjs tests/satelliitti-avaruus.test.mjs tests/rules.test.mjs tests/dokumentit.test.mjs` | **450/450** |
| `node --check` (kaikki muutetut) | puhdas |

Savukkeet ajettiin yksi kerrallaan etualalla.

## 7. Kuva

`docs/raportit/kuvat/topografialinssi-390-luenta-20260916.jpg`
(390 × 844 dpr 2, 84 kt) — linssi auki Ateenassa isoisän luennan aikana:
reliefi ruudulla, ei pluskuplaa, ei luentakuvapakkaa, ei saapumiskuvaa,
ei nimikylttejä. Vertaa: ennen linssiä samassa tilassa ruudulla oli
saapumisen valokuva, pulu, pluskupla ja kartalla kuvapakka.

## 8. Mitä sinun on hyvä tietää

1. **Linssin avaus on nyt tumma pari sekuntia.** Puhelimella 4k-pohja
   (0,77 Mt) on haettuna ja purettuna noin sekunnissa; tässä kontissa
   sama kestää 12–15 sekuntia, koska pallo renderöidään ohjelmistolla.
   Peitteellä on ehdoton katto **15 sekuntia**: jos kuvaa ei kuulu,
   peite lähtee joka tapauksessa, eikä pelaaja jää tumman ruudun
   taakse.
2. **Peitteen kesto on mitattavissa**: linssin `tila()` kertoo
   `peiteMs`, eli kuinka kauan se oli ruudulla — se on täsmälleen se
   aika, joka ennen oli paljasta karttaa.
3. **Purettu bittikartta suljetaan** (`ImageBitmap.close`) kalvoa
   vapautettaessa. Se ei ollut pakko mutta on: 4096 × 2048 RGBA on
   33 Mt, eikä `dispose()` vapauta sitä vaan pelkän GPU-kopion.
4. **Pluskupla jää yhä satelliitti- ja Ihmisen matka -linsseihin**
   (luku 4.1). Se on yhden rivin korjaus kolmeen listaan, ja se
   kannattaa tehdä kun satelliittitiedostot ovat vapaina.
5. **Odotuspeite koskee vain topografialinssiä.** Muut pallolinssit
   avautuvat kuten ennen; jos sama välivaihe näkyy niissä, sama
   `kalvoRuudulle`-kuvio siirtyy sinne sellaisenaan.
