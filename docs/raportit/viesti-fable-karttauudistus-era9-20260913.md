# Karttauudistus erä 9: maapaneeli entiseen asuun ja pienemmäksi, panoroinnin rajaus, Etsi aarre pois

*(Opus-työsessio → Fable, 13.9.2026. Haara
`claude/karttauudistus-era9-korjaukset`, origin/mainista (v1851).
Versiota EI nostettu, dist/ ei mukana. Lähteet: tehtävänanto,
`docs/raportit/karttauudistus-suunnitelma-pallo-20260913.md` luvut 1.2,
1.3 ja 3.0–3.2, `viesti-fable-karttauudistus-era3-20260913.md`,
`-era1c-...md` luku 9.6, `-era7-...md`, `-era8-...md`, Raamattu
"Kaupungit": KARTTAUUDISTUS ja PAATOKSET 1–5.)*

> **Miksi tämä ei ole `docs/viesti-fable.md`.** Sama syy kuin erissä
> 1–8: se polku ei ole Raamatun ohjedokumenttikartalla ja
> tests/dokumentit.test.mjs kaatuisi siihen. Tehtävänanto ohjasi tähän
> polkuun erikseen.

## Lyhyesti

Omistajan pilottipalautteen kolme kohtaa on tehty.

1. **Maapaneeli on entisessä asussaan ja paljon pienempi.** Kortin
   typografia ja kentät ovat nurkkataulun (v1847): versaali harvennettu
   nimi, alleviivaus, maan oma nimi, yksi palstapari lukuja
   sijalukuineen, kielirivi lippuineen ja **paljas plus**. Kiinnitys
   karttaan säilyy erän 3 tapaan. Koko: peruskoko 300 × 96 → **190 ×
   148**, ja leveys on nyt korkeintaan **0,35 maan laatikon
   leveydestä** (ennen koko laatikon levyinen). Mitattu Ranskassa
   390 px:n ruudulla **114 px** uloimmalla sallitulla zoomilla ja
   **167 px** saapumisnäkymässä — erässä 3 sama mitta oli **233 px**.
2. **Panorointi on rajattu.** Kameran keskipiste pysyy
   saapumislaatikossa (maa + paneeli) × 1,3. Ohjelmallinen ~2000 px:n
   veto ei enää vie kohdemaata ruudulta. Linssi, kehittäjän
   maailmanappi ja matka (erä 8) ohittavat rajauksen.
3. **"Etsi aarre" -nappi on poistettu** kokonaan (moduuli, CSS, testit,
   savuke). Aarteen ovi kartalla on erän 7 vihreä piste.

Savuke `savuke-era9.mjs` on **TULOS_VIHREA** vastakokeineen. Portit:
`npm test` 3305/0 fail, kaksoisavaimet, niputus, savukevartija,
build-standalone.

## 1. Mitä tehtiin

| Tiedosto | Muutos |
| --- | --- |
| `js/pallolauta/maapaneeli.js` | Kortin asu nurkkataulun mukaiseksi (otsake, viiva, alarivi, kielirivi, paljas plus); `MAAPANEELIN_LEVEYS_OSUUS = 0,35`; peruskoko 190 × 148; oma leikkaava `.maapaneeli-sisus` |
| `js/fokusmitat.js` | `kieliOsat` vietäväksi (sama kieliriviladonta kuin nurkkataulussa) |
| `css/styles.css` | Maapaneelin lohko kirjoitettu uusiksi (kartuutsityypografia, plussan palkit, kapeampi valikko); Etsi aarre -napin lohko poistettu |
| `js/pallolauta/kamera.js` | `PANOROINNIN_KERROIN = 1,3`, `panoraja(bbox)`, `rajaaPanorointi(raja, lat, lng)` |
| `js/pallolauta/lauta.js` | `maanPanoraja()` (ohitukset: linssi, kehittäjän maailmanappi, matka, tuntematon laatikko) ja kahva `ui.pallonPanorajaus`; kahva puretaan laudan mukana |
| `js/pallo.js` | `rajaaKohta` ja sen kolme kutsupaikkaa: veto, liuku, rullapanorointi; pehmeä pysäytys (vauhti nollataan rajatussa suunnassa) |
| `js/fokusvirta.js` | `naytaEtsiAarreNappi`/`piilotaEtsiAarreNappi` pois (tuonti ja kaksi kutsua) |
| `js/etsi-aarre-nappi.js`, `tests/etsi-aarre-nappi.test.mjs`, `tools/savukkeet/savuke-etsi-aarre.mjs` | **poistettu** |
| `sw.js`, `tools/build-standalone.mjs` | Poistettu moduuli pois kori- ja niputusluettelosta |
| `css/aikajana.css`, `css/satelliitti.css`, `tests/aikajana.test.mjs`, `tools/savukkeet/savuke-linssi-teksti-keskella.mjs` | Napin piilotussäännöt ja niiden vartijat pois |
| `tools/savukkeet/savuke-era9.mjs` | **uusi** savuke, kolme väitettä + kaksi vastakoetta |

**Ei koskettu** (tehtävänannon kielto): `js/pollo.js`, `js/livia-*.js`,
`js/luentareaktiot.js`, `js/media.js`, `js/pallolauta/merkit.js`.
Merkkien näkyvyyslogiikkaan ei tarvinnut koskea.

## 2. Maapaneeli: mikä palasi ja mikä ei

### 2.1 Asu on nurkkataulun

Erä 3 oli tehnyt paneelista oman kalusteensa: tiivis kaksipalstainen
lukuruudukko ja tekstinappi "Lisää". Omistaja ei pyytänyt uutta
kalustetta vaan **vanhan kalusteen kartalle**. Kortti latoo nyt
täsmälleen ne kentät ja sen typografian, jotka nurkkataululla oli
ennen erää 3 (`js/fokusmitat.js` `rakennaMaataulu` + `.fokus-kartuutsi-*`,
v1847 = commit 6e8c7d6e):

| Kenttä | Lähde | Ero erään 3 |
| --- | --- | --- |
| Maan nimi versaalina, harvennettuna | `maanNimi` | oli pieni ja kapea; nyt 13 px / 0,18 em kuten kartuutsissa |
| Alleviivaus | — | **oli poissa**, palasi |
| Maan oma nimi + aikakauden valtiomuoto | `FOKUS_MAANIMET` | valtiomuoto **oli poissa**, palasi; sama sääntö kuin kartuutsissa (valtiomuoto vain oman nimen kanssa) |
| Väkiluku, pinta-ala, demokratia, keskitulo + sijaluvut | `maanRivit` | oli kaksipalstainen ruudukko; nyt yksi palstapari (otsikko vasemmalla, arvo oikealla) |
| Kielet tervehdyksineen ja lippuineen | `kieliOsat` (uusi vienti) | **oli kokonaan poissa**, palasi |
| Plus | — | oli tekstinappi "Lisää"; nyt paljas plus kuten nurkkataulussa |

Lisää-valikko plussan takana on erän 3 oma eikä muuttunut (värit,
otsikot, sivutunnukset, ylöspäin kääntyminen). Valikko kavennettiin
250 px → 210 px, koska kortti kapeni.

### 2.2 Mikä EI palannut, ja miksi — kirjattava ristiriita

Tehtävänanto sanoi *"sama typografia ja tumma pergamenttitausta"*.
Nurkkataulu oli itse asiassa **pohjaton**: tummaa mustetta kartan
päällä, ja luettavuus tuli halosta sekä erillisestä
`backdrop-filter`-hunnusta (`.fokus-maatauluhuntu`, omistajan päätös
27.8.2026 *"ei enää omaa pohjaa"*). Huntu on karttaruudun
**ruutuankkuroitu** lapsi, jonka mitat js laskee kartuutsista ja
taulusta; se ei voi seurata karttaan kiinnitettyä, zoomin mukana
skaalautuvaa korttia, eikä suodattimia saa animoida (iOS-sääntö,
tests/rules.test.mjs).

Kortti pitää siis **erän 3 tumman pergamenttipohjan**
(`--overlay-card`, rgba(46,33,20,0.88)) ja vaalean musteen, ja
typografia on nurkkataulun. Tulkitsin tehtävänannon "tumma
pergamenttitausta" tarkoittavan juuri tätä pohjaa. **Jos omistaja
tarkoitti pohjatonta mustetta**, se on oma pieni eränsä (halo +
kartan oma tummennus merkkikerroksessa) — kirjattu tähän eikä tehty.

### 2.3 Koko: mitatut luvut ja tehtävänannon kaksi tavoitetta

Tehtävänanto antoi kaksi lukua, jotka eivät osu yhteen: *"korkeintaan
noin 20 % ruudun leveydestä"* (= 78 px 390 px:n ruudulla) ja
*"390 px -ruudulla uloimmalla zoomilla paneelin leveys ≈ 150–200
css-px"* (= 38–51 % ruudusta). Mitoitin **jälkimmäisen mukaan**, koska
se on se luku, jota savuke mittaa ja jonka tehtävänanto antaa
lautayksikköohjeena. Lopputulos asettuu lukujen väliin:

| Näkymä (Ranska, 390 × 844) | Erä 3 | Erä 9 |
| --- | --- | --- |
| Saapumisnäkymä | 233 × 164 px | **167 × 118 px** (43 % leveydestä) |
| Uloin sallittu zoomi | — | **114 × 89 px** (29 % leveydestä) |
| Työpöytä 1400 × 900, uloin zoomi | — | **223 × 174 px** (16 % leveydestä) |

Mitoitus on lautayksiköissä kuten PÄÄTÖKSET 2 vaatii: paneelin leveys
on `min(0,35 × laatikon leveys, 0,42 × laatikon korkeus × kuvasuhde)`
lautayksikköinä, ja ruutukoko seuraa kamerasta. Ranskalla leveysosuus
on tiukempi raja; korkeusosuus sitoo leveillä ja matalilla mailla
(Venäjä, Kazakstan).

**Teksti uloimmalla zoomilla.** Nimi on 13 px × skaala ≈ 0,6 = ~8 px ja
lukurivit ~6 px 390 px:n ruudulla: **luettavissa vasta lähemmällä
zoomilla**, kuten tehtävänanto sallii. Kaksi zoomiporrasta sisään (ks.
kuva) ja teksti on täysin luettavaa. Tämä on tietoinen vaihtokauppa
sille, että paneeli on "paljon pienempi".

### 2.4 Avoin löydös: saapumisnäkymän korkeus ei ole yksikäsitteinen

Mitatessa selvisi, että **sama koodi päätyy samalla ruudulla kahteen
eri saapumiskorkeuteen**: Ranska 390 × 844, kolme peräkkäistä ajoa →
`altitude` 0,4465 / 0,6268 / 0,6268 (paneelin leveys vastaavasti 167 /
119 / 119 px). Ero on 40 %, ja se näkyy kaikessa, mikä skaalautuu
kartan mukana. Tämä **ei ole erän 9 tekemä** — se on erän 2/3
saapumisajon ja uloszoomausrajan välinen kilpajuoksu (saapumisketju
ajaa kameraa vielä sekunteja `saavu`-kutsun jälkeen). En korjannut
sitä: se on oma eränsä ja koskee erien 2, 3 ja 8 koodia.

Savuke kiertää asian mittaamalla **uloimmalta sallitulta zoomilta**
(OrbitControlsin `maxDistance`), joka on yksikäsitteinen. Suosittelen
erää, joka tekee saapumiskorkeudesta deterministisen.

## 3. Panoroinnin rajaus

### 3.1 Sääntö

Erän 1c luku 9.6 oli kirjannut: uloszoomauksen esto on pelkkä
korkeusraja, pituusasteella ei ollut mitään rajaa, ja Ranskasta pääsi
vetämällä Japaniin. Nyt:

- Sallittu ala on **saapumislaatikko (maa + maapaneeli) × 1,3**
  laatikon keskipisteen ympäri, ja siihen puristetaan **kameran
  KESKIPISTE** — ei näkyvää alaa. Näkyvä ala saa ulottua laatikon yli
  (muuten uloin zoomi ei mahtuisi liikkumaan lainkaan), mutta
  kohdemaa ei voi kadota ruudulta.
- Kerroin on isompi kuin uloszoomauksen 1,15, koska se rajaa eri
  asiaa: 1,15 rajaa korkeutta (koko laatikko ruudulla), 1,3
  keskipisteen liikettä. Samalla luvulla maan reunaa ei saisi
  lähemmällä zoomilla ruudun keskelle.

### 3.2 Toteutus: sääntö laudalla, noudatus eleissä

`js/pallolauta/kamera.js` muuntaa laatikon asteiksi (`panoraja`) ja
puristaa pisteen (`rajaaPanorointi`) — samalla `laudaltaAsteiksi`-
kaavalla kuin koko lauta, ei omaa projektiota.
`js/pallolauta/lauta.js` päättää, onko rajaa juuri nyt
(`maanPanoraja`), ja asentaa kahvan `ui.pallonPanorajaus` — sama
työnjako kuin `ui.pallonVauhti`lla. `js/pallo.js` noudattaa sitä
**kolmessa** kirjoituskohdassa: veto (`pointermove`), irrotuksen
jälkeinen liuku (`liu`) ja rullapanorointi (`siirraPalloa`). Yhdenkin
puuttuminen vuotaisi juuri siinä eleessä.

**Ohitukset** ovat samat kuin uloszoomauksen estolla ja yksi lisää:

1. **Linssi** (`zoomirajaSyrjaytys`) — satelliittilinssin
   avaruusnäkymä katsoo koko palloa.
2. **Kehittäjän maailmanappi** — sama ehto kuin maailmahypyllä.
3. **Matka** (`matkallaVapaana`, erä 8) — kulkutapa vie kahden maan
   yli; rajaus vapautuu matkan ajaksi ja palaa perillä.
4. **Tuntematon laatikko** — ilman laatikkoa ei rajaa (turvallinen
   tila, sama kuin uloszoomauksella).

### 3.3 Pehmeä pysäytys

Raja ei kimmota eikä nykäise: se pysäyttää liikkeen seinään. Kun raja
puree, **sen suunnan** vauhti nollataan (`vauhti.lat/lng`,
`rulla.lat/lng`) — muuten liuku jatkaisi seinää vasten painamista
sekunnin ajan ja sormen irrotus tuntuisi jumilta. Toinen suunta jää
vapaaksi, joten reunaa pitkin voi liukua. Sama nollaus tehdään myös
vedon aikana mitatulle vauhdille, jottei irrotus lähetä liukua suoraan
rajaa vasten.

### 3.4 Mitattu

MITTA_PANOROINTI

## 4. "Etsi aarre" -nappi pois

Omistaja: *"Ota Etsi aarre nappi pois."* Moduuli
`js/etsi-aarre-nappi.js` on poistettu kokonaan, samoin sen CSS-lohko,
linssien piilotussäännöt, yksikkötesti, savuke ja luettelomerkinnät
(`sw.js`, `tools/build-standalone.mjs`).

**Tarkistettu: yksikään tila ei jää ilman aarteen avaajaa.** Napilla
oli yksi oma reitti, jota muilla ei ollut: `ui.avaaTutkinta(city, {
ohitaLehtilukko: true })`. Lehtilukko on kuitenkin **purettu
lopullisesti** (omistaja 2.9.2026; `js/fokusvirta.js`
`fokusvirtaOhittaaLehden` palauttaa aina `false`), joten sama
kaupunkilehti aukeaa ilman lippua:

| Polku | Ovi | Kunnossa |
| --- | --- | --- |
| Kartta → aarre | Erän 7 **vihreä piste** (`js/fokuspiste.js`) — kartalla alusta asti, lukittu kunnes kaksi nostotehtävää ratkaistu | kyllä |
| Kartta → kaupunkilehti | Kaupungin laatan/pisteen napautus ja alarivin Tutki-nappi (`avaaTutkinta`) | kyllä |
| Lehti → aarre | Lehden AARTEEN AVAUS -kysymys (vanha TAI-ehto, erä 7) | kyllä |
| Pulu | Pulun kommentti ei enää nosta nappia; ohje aarrepisteestä tulee pulun omasta lukkoviestistä (erä 7) | kyllä |
| Tallennuksen palautus | Vihreä piste piirtyy pelitilasta (`nostotehtavatRatkaistu`, `aarrepisteOhjeNahty`), ei napin elinkaaresta | kyllä |

`ohitaLehtilukko`-lippu jätettiin `avaaTutkinta`an ja `openArrival`iin
kytkentäkohdaksi (lukko voidaan kytkeä takaisin päälle); sen kommentit
kertovat nyt, että ainoa käyttäjä poistui.

## 5. Savuke ja portit

SAVUKE_TULOS

## 6. Kuvat

`docs/raportit/kuvat/karttauudistus-9-390.png` (Ranska 390 × 844) ja
`karttauudistus-9-1400.png` (1400 × 900), molemmat uloimmalla
sallitulla zoomilla. Isoisän saapumisvalokuva (`.fokusvirta-isokuva`)
on kuvista piilotettu — se peittää Ranskan muutamaksi sekunniksi
saapumisen jälkeen eikä ole paneelin asia.

## 7. Avoimet asiat Fablelle

1. **Saapumiskorkeus ei ole yksikäsitteinen** (luku 2.4). Suositan omaa
   erää; se vaikuttaa kaikkeen karttaan kiinnitettyyn.
2. **Pohjaton vai tumma pohja** (luku 2.2). Jos omistaja tarkoitti
   nurkkataulun pohjatonta mustetta, se on oma pieni eränsä.
3. **Kaksi kokotavoitetta** (luku 2.3): 20 % ruudun leveydestä vs.
   150–200 css-px. Valitsin jälkimmäisen; jos omistaja haluaa vielä
   pienemmän, `MAAPANEELIN_LEVEYS_OSUUS` on yksi luku.
4. **Panoroinnin kerroin 1,3** on ilmeen valinta. Jos ala tuntuu yhä
   liian väljältä tai liian ahtaalta, `PANOROINNIN_KERROIN`
   (js/pallolauta/kamera.js) on yksi luku.
