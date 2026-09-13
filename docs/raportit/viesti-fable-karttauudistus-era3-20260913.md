# Karttauudistus, erä 3 — maan perustiedot ja Lisää-valikko pallolle

*(Opus-työsessio Fablelle 13.9.2026. Haara
`claude/karttauudistus-era3-maapaneeli`. EI versionostoa, ei
dist/-committia — tehtävänannon mukaan.)*

> **Miksi tämä ei ole `docs/viesti-fable.md`.** Sama syy kuin erissä 1
> ja 2: se polku ei ole Raamatun ohjedokumenttikartalla ja
> tests/dokumentit.test.mjs kaatuisi siihen. Tehtävänanto ohjasi tähän
> polkuun erikseen.

## 1. Mitä tehtiin

Pallosuunnitelman **erä 3** (luvut 3.0 ja 3.2) kokonaisuudessaan: maan
perustiedot ja plussan tilalle tullut **Lisää-valikko** ovat nyt PALLON
MERKKIKERROKSESSA, karttaan kiinnitettynä — eivät ruudun nurkassa.

| Tiedosto | Muutos |
| --- | --- |
| `js/pallolauta/maapaneeli.js` (uusi, 490 r) | Koko kerros: ankkuri, lautamitat, valikko, värikoodi |
| `js/pallolauta/lauta.js` | Kerroksen luonti, päivitys piirrossa ja zoomissa, saapumislaatikko |
| `js/fokusmitat.js` | `MAAPANEELI_KARTASSA` + `?maapaneeli=nurkka`, nurkkakalusteen portti, `maanNimi`/`maanRivit` vietäväksi |
| `js/lehti.js` | `avaaMaalehti(ui, iso, { sivu })` — sivutunnus → sivunumero |
| `css/styles.css` | Kortti, luvut, Lisää-nappi, värikoodattu valikko (+210 r) |
| `sw.js` | Uusi moduuli SHELL-koriin |
| `tools/savukkeet/savuke-maapaneeli.mjs` (uusi, 460 r) | Savuke kahdella vastakokeella |
| `tests/maakartuutsi.test.mjs` | Kaksi tekstivartiota uuteen muotoon |

**Ei koskettu**: js/pollo.js, js/livia-*.js, js/pallolaatat.js,
js/laattapyramidi.js, tools/generoi-laattapyramidi.mjs. js/lehti.js:stä
vain `avaaMaalehti` ja sen välitön ympäristö (erä 4 työstää ETUSIVUN
osia samassa tiedostossa). Ei kaupunkilehteen, ei nostoihin, ei
aarteeseen, ei kulkutapoihin, ei laattoihin.

### 1.1 Karttaan kiinnitys (PÄÄTÖKSET 2, kohta 2)

Paneeli on **yksi datum merkkikerroksessa** (`merkit.aseta('maapaneeli',
…)`) `lat`/`lng`-ankkurilla kuten kaupungin nimi ja nosto. Kirjasto
liikuttaa sen pallon mukana; koodi ei kirjoita ruutupikseleitä.

**Koko on kartan mitta, ei ruudun.** Paneelilla on kiinteä koko LAUDAN
YKSIKÖISSÄ, ja ruutukoko tulee kamerasta (`skaala = perusta ×
px_per_lautayksikkö`, rajat 0,45…3,0). Lautamitta johdetaan **maan
laatikosta** (`maanLautalaatikko`, sama laatikko kuin
saapumisrajauksessa): korkeintaan laatikon levyinen ja korkeintaan
35 % sen korkeudesta. Se on koko mitoituksen ydin — sama sääntö antaa
Ranskalle ja Chilelle saman osuuden ruudusta, koska kamera sovittaa
juuri sen laatikon.

**Paikka: maan laatikon ETELÄREUNAN alapuolella**, raon (2 % laatikon
korkeudesta) verran sen ulkopuolella. Perustelu (moduulin alussa
pitkästi): se on rajan ulkopuolella joka maalla myös silloin kun maa ei
ole suorakaide; se ei peitä maata eikä sen kaupunkeja; ja
saapumisrajaus voi ottaa sen mukaan yhdellä laatikon laajennuksella.
Sivulle sijoitettu paneeli olisi uloimmalla zoomilla ruudun laidan yli
juuri sillä ruudulla (pysty, 390 px), jolla leveys loppuu ensin.

**Saapumisrajaus laajennettiin** (`paneelinLaatikko`): kamera sovittaa
maan JA paneelin. Tämä on suunnitelman luvun 3.0 kohta (a) — ilman sitä
paneeli jäisi saapumisnäkymässä ruudun alalaidan alle.

### 1.2 Lisää-nappi ja värikoodattu valikko

- Otsikot luetaan **`MAA_KATEGORIAT[iso]`-taulusta** — ei yhtään
  kovakoodattua otsikkoa. Ranskalla kahdeksan.
- Otsikon painallus → `avaaMaalehti(ui, iso, { sivu })`. **Parametri on
  SIVUTUNNUS, ei numero** (`historia`, `menovinkit`, …): sivunumero
  riippuu siitä, onko maalla karttasivu, ja sen laskeminen
  kutsupuolella tuottaisi kahden taulun rinnakkaisen järjestyksen.
  Numeronkin saa antaa; tuntematon tunnus palaa lehden ensimmäiselle
  sivulle (turvallinen tila).
- **Väripaletti on pelin oma**: `--sym-*`-muuttujat css/styles.css:stä
  (Raamattu, SYMBOLITAKSONOMIA) — samat sävyt kuin kartan nostoilla.
  Yhtään uutta väriä ei lisätty; savuke todentaa tämän vertaamalla
  jokaisen rivin laskettua väriä juuren muuttujiin.
- Aihetunnus → symboliperhe on taulussa `AIHEEN_PERHE`. Maalehtien
  tunnuksia on yli 70, valtaosa kertaesiintymiä (`vuoret`, `keidas`,
  `sadut`); ne palautuvat kahteentoista perheeseen, jotka pelaaja jo
  tuntee kartalta. Tuntematon tunnus saa perheen `silma`.
- **Valikko aukeaa ylöspäin, jos alle ei mahdu.** Merkkikerros on
  tarkoituksella kaiken pelin UI:n ALLA (`z-index: 0`), joten
  alanappirivin tai vuorokortin alle jäävä rivi ei ota napautusta
  vastaan. Tämä löytyi savukkeesta: Ranskan viides rivi (Urheilu) jäi
  `.rail`-kortin alle 390 px:n ruudulla. Valikko ei kavenna itseään
  eikä siirrä kalusteita, vaan kääntyy napin yläpuolelle.

### 1.3 Nurkkatila yhden vakion takana

`js/fokusmitat.js` → `export const MAAPANEELI_KARTASSA = true`. `false`
(tai osoitteessa `?maapaneeli=nurkka`) palauttaa kartuutsin ja
maataulun ruudun vasempaan alanurkkaan täsmälleen entisellään, ja
maapaneeli jää pois kartalta. Sama vipu on savukkeen vastakoe B.

**Tasokartalla ei muutu mitään** — kartuutsi, mittajana ja
asteviivaimet ovat sen omia kalusteita, ja niiden ruutuankkurointi on
perusteltu js/fokusmitat.js:n alussa.

## 2. Savuke: vihreä ajo ja vastakokeet

`tools/savukkeet/savuke-maapaneeli.mjs` (tarkista-savukkeet löytää
kansiosta). Peli: Fogg Pariisissa, `?lauta=pallo`; saapumisajo ajetaan
laudan omalla `saavu`-kutsulla, jotta mitta otetaan siltä **uloimmalta
zoomilta**, jolle luettavuus on mitoitettu.

```
PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers node tools/savukkeet/savuke-maapaneeli.mjs
```

**VIHREÄ AJO — 9/9 vartiota läpi.**

```
OK  pallolauta aukesi (390 px)
OK  pallolauta aukesi (1400 px)
OK  1. paneeli on kartalla maan laatikon ETELÄREUNAN ULKOPUOLELLA ja kokonaan
       ruudulla (390 px ja 1400 px)
OK  2. paneeli skaalautuu kuin painettu kartta (lähempänä leveämpi kuin uloimmalla)
OK  3. jokainen valikon otsikko avaa maalehden OMAN sivunsa
OK  4. valikon värit ovat kartan omia --sym-sävyjä (ei uusia kirkkaita)
OK  5. pääajo ei tuottanut sivuvirheitä
OK  VASTAKOE A: maa ilman aiheita → paneeli on, valikkoa ei, peli ei kaadu
OK  VASTAKOE B: ilman karttaan kiinnitystä sijainti- ja skaalausväite kaatuvat
```

### 2.1 Punaiset ajot (vastakokeet)

**A. Maa ilman `MAA_KATEGORIAT`-riviä.** Savukkeen oma palvelin
tarjoilee `js/packs/maa-kategoriat.js`:n niin, että moduulin loppuun on
kirjoitettu `delete MAA_KATEGORIAT["FRA"]` — rivi on siis OIKEASTI
poissa, ei piilotettu. Mitattu:

```
INFO vastakoe A (Ranska ilman MAA_KATEGORIAT-riviä):
     kortti true ("RANSKA"), Lisää-nappi false, valikkorivejä 0, virheitä 0
```

Perustiedot ovat siis yhä kartalla, Lisää-nappia ei ole lainkaan
(painike joka ei tee mitään on lupaus jota ei ole), eikä sivulle tule
yhtään virhettä.

**B. Karttaan kiinnitys pois** (`?maapaneeli=nurkka`). Mitattu:

```
INFO vastakoe B (?maapaneeli=nurkka): kartalla kortti false,
     nurkkakaluste true, väite 1 PUNAINEN, väite 2 PUNAINEN
```

Eli **sijaintiväite ja skaalausväite kaatuvat molemmat**, kun kaluste
on ruutuvakio. Ilman tätä koetta väitteet eivät mittaisi mitään.

Kolmas punainen ajo kirjattakoon myös, koska se johti korjaukseen:
ensimmäisessä ajossa **valikon viides rivi ei ottanut napautusta**
390 px:n ruudulla (`page.click` aikakatkaisu, `<section class="card
turn-card"> … intercepts pointer events`). Se oli aito vika, ei
testin vika — merkkikerros on pelin UI:n alla — ja korjaus on luvun 1.2
ylöspäin aukeava valikko.

## 3. Mitatut luvut

**Ranskan laatikko** (`maanLautalaatikko`, lautayksikköä):
489,8 × 406,3. **Paneelin lautamitta**: perusta 1,4813 yks/css-px →
444,4 × 142,2 yks, rako maan reunaan 8,13 yks. Ankkuri 41,161° N ·
2,213° I.

| | 390 × 844 | 1400 × 900 |
| --- | --- | --- |
| kameran korkeus (saapumisnäkymä) | 0,6268 | 0,3438 |
| paneelin skaala | 1,028 | 1,986 |
| **kortti ruudulla** | **308 × 99 px** | **596 × 191 px** |
| kortti y | 526…625 | 628…819 |
| kortti x | 41…349 | 402…998 |
| karttaruutu | x 8…382, y 61…836 | x 11…1389, y 68…889 |
| maan laatikon eteläreuna (y) | 461 | 500 |
| kortti lähemmällä zoomilla | 617 × 197 px (skaala 2,057) | 900 × 288 px (skaala 3,000 = katto) |

**Luettavuus:** suunnitelman luku 3.0 kohta 3 vaatii uloimmalla
zoomilla vähintään 240 css-px 400 px:n ruudulla. Mitattu **308 px
390 px:n ruudulla** — reilusti yli. Kortti on kokonaan karttaruudun
sisällä molemmilla kuvasuhteilla, ja sen yläreuna on maan laatikon
eteläreunan alapuolella (390 px: 526 > 461; 1400 px: 628 > 500).

**Ranskan kahdeksan otsikkoa ja niiden sivut** (kaikki napautettu
oikealla hiiren napautuksella, sivu luettu `ui.lehtitila`sta):

| otsikko | sivutunnus | maalehden sivu |
| --- | --- | --- |
| Historia | historia | 2 |
| Ruokaa ja tapoja | ruoka | 3 |
| Keksinnöt | keksinnot | 4 |
| Luonto | luonto | 5 |
| Urheilu | urheilu | 6 |
| Arki ja tavat | arki | 7 |
| Tavat | tavat | 8 |
| Menovinkit | menovinkit | 9 |

Sivu 1 on Ranskan karttasivu (maa-etusivu), joten aiheet alkavat
kakkosesta — juuri niin kuin `avaaMaalehti` latoo pinonsa.

## 4. Mitä kuvissa NÄIN

`docs/raportit/kuvat/karttauudistus-3-390.png` ja
`…-1400.png` (rajattu maan eteläreunaan ja paneeliin; koko ruutu olisi
PNG:nä yli kuvakaton).

**390 px.** Paneeli on kartan päällä Ranskan eteläpuolella, Pyreneiden
ja Baleaarien korkeudella, ja se on selvästi pelin muuta pergamenttia
tummempi läpikuultava laatta. Vasemmassa reunassa lukee **RANSKA**
kullanvärisenä; sen alla neljä lukua kahdessa sarakkeessa (VÄKILUKU
69 milj. · 23./195, PINTA-ALA 610 000 km² · 45./1…, DEMOKRATIA 0,80 ·
V-Dem 9./…, KESKITULO 45 000 $/v 23./189) ja oikeassa alanurkassa
**Lisää**-nappi. Teksti on luettavaa ilman zoomausta. Kartalla näkyvät
samaan aikaan Lontoo, Dublin, Madrid, Barcelona ja Tanger omine
niminaan, eli paneeli ei ole vienyt tilaa kaupunkinimiltä.

**Se mitä NÄIN ja mikä on ongelma:** samassa kuvassa on pelin oma
saapumiskortti — iso seepiavalokuva Pariisin Oopperasta ja kuvateksti
*"Pariisi 1873: Ooppera harjoitteli juhlapukuaan."* — ja se peittää
Ranskan kokonaan sekä osuu paneelin yläreunan päälle. Kortti on pelin
UI:ta (`.rail`), joka on merkkikerroksen PÄÄLLÄ. Paneeli itse on
näkyvissä ja luettavissa, mutta kapealla ruudulla nämä kaksi ovat
päällekkäin. Ks. luku 6, avoin asia 1.

**1400 px.** Sama kaluste kaksinkertaisena (596 px), maan eteläreunan
alla, ja työpöytäruudulla saapumiskortti on sivussa eikä osu paneeliin.
Kortin typografia kestää skaalauksen: teksti on 2× isompaa eikä sumene,
koska kyseessä on CSS-muunnos oikealle tekstille eikä bittikartta.

## 5. Portit

| portti | tulos |
| --- | --- |
| `npm test` | **# pass 3293 · # fail 0** |
| `node tools/tarkista-kaksoisavaimet.mjs` | ei kaksoisavaimia |
| `node tools/tarkista-niputus.mjs` | kunnossa: 388 moduulia, 4169 top-level-julistusta |
| `node tools/tarkista-savukkeet.mjs` | kunnossa: 1503 ui-viittausta, 399 metodia, 532 kenttää |
| `node tools/build-standalone.mjs` | dist/matkakirja.html syntyy (ei committoitu) |
| `grep -rn '^<<<<<<<' js css tests tools` | tyhjä |
| savuke | 9/9 |

Kaksi tekstivartiota tests/maakartuutsi.test.mjs:ssä päivitettiin, koska
ne lukevat lähdekoodia merkkijonona ja koodi muuttui. Molempien VÄITE
säilyi ennallaan ja sai lisäksi uuden osan: pallolaudan kartuutsiehto
on yhä *pelkkä maa* (nyt nurkkavivun kanssa), ja saapumisajo lukee
laatikon yhä maapolygoneista (nyt paneeli mukaan laajennettuna).

## 6. Avoimet asiat ja rajapinnat muihin eriin

1. **Saapumiskortti peittää maan kapealla ruudulla** (ks. luku 4). Tämä
   ei ole erän 3 aiheuttama — kortti oli siinä ennenkin — mutta
   karttauudistuksessa se on nyt ristiriita: kartta on uusi
   käyttöliittymä, ja iso kortti sen päällä vie sen. **Erä 4** (kaupungin
   pop-up) ja **erä 5** (kaupunkilehden sivut nostoiksi) koskevat
   täsmälleen tätä sisältöä, joten korjaus kuuluu niihin, ei tänne.
   Fablelle päätettäväksi.
2. **Uloszoomauksen esto (erä 2) ei ole vielä pelissä.** Paneelin
   mitoitus on tehty sitä varten: "uloin zoomi" on tässä
   saapumisnäkymä, jonka kamera laskee samasta laatikosta (× 1,05).
   Kun erä 2 asettaa `zoomirajaSyrjaytys`in, sen on käytettävä
   **`saapumislaatikko`a** (paneeli mukana) eikä pelkkää maan laatikkoa
   — muuten pelaaja voi zoomata ulos vain siihen asti, että paneeli
   leikkautuu. Rajapinta on valmis: `paneelinLaatikko(bbox)` on
   viety js/pallolauta/maapaneeli.js:stä.
3. **Erä 4 ja js/lehti.js.** Kosketin vain `avaaMaalehti`-funktiota ja
   lisäsin sen eteen apurin `maalehdenSivunumero`. ETUSIVUN osien
   irrotus (erä 4) on eri kohdassa tiedostoa; mergekonfliktia ei
   pitäisi tulla.
4. **Kielirivi jäi pois paneelista.** Nurkan maataulussa on lisäksi
   kielet lippuineen; kartalla ne eivät mahdu 96 px:n korkuiseen
   korttiin ilman että luvut kutistuvat lukukelvottomiksi uloimmalla
   zoomilla. Kielet ovat maalehden "Maa numeroina" -sivulla, johon
   Lisää-valikko vie. Jos omistaja haluaa ne kartalle, kortti tarvitsee
   toisen rivin ja `MAAPANEELIN_KORKEUS_PX`:n noston (yksi vakio).
5. **Paneeli peittää merta maan eteläpuolella.** Ranskalla se osuu
   Välimereen ja Espanjan pohjoisosaan. Jos jollain maalla se osuu
   naapurimaan päälle häiritsevästi, vaihtoehto on siirtää ankkuri
   sille kyljelle, jolla on eniten tilaa — se on yksi funktio
   (`paneelinAnkkuri`), mutta se pitäisi tehdä vasta kun omistaja on
   nähnyt tämän muutamalla maalla.
6. **Piirroskuvitukset ja murrettu paletti** (PÄÄTÖKSET 2 kohta 1) ovat
   erän 1b asia; tämä erä ei koskenut laattoihin eikä väriasteikkoon.
