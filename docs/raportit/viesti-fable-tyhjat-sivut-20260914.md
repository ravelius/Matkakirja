# Tyhjentyneiden aihesivujen johdannot ohjaavat kartalle (13 sivua)

*(Opus-työsessio → Fable, 14.9.2026. Haara `claude/era-tyhjat-sivut`.
Ei versionostoa, ei dist/:iä. Lähteet: tehtävänanto, CLAUDE.md,
docs/roolitus.md, docs/tarina.md, docs/isoisan-raamattu.md,
docs/moduulit/kaupunkilehti.md, Raamattu "Kaupungit" KARTTAUUDISTUS +
PÄÄTÖKSET 1–6, docs/raportit/viesti-fable-nostokortti-20260914.md luku
8.1, docs/raportit/viesti-fable-karttauudistus-era5-20260913.md ja
-era10-20260913.md.)*

## 0. Lyhyesti

Karttauudistuksen erien 5 ja 10 tyhjentämistä **14 aihesivusta** oli
korjaamatta **13**: niiden johdanto lupasi yhä juttuja, jotka olivat jo
siirtyneet kartalle. Kaikki 13 on nyt kirjoitettu Wienin Musiikki-sivun
mallilla (v1861): **vanha virke säilyi sanatarkasti**, perään lisättiin
vain reitti kartalle, **uutta faktaa ei kirjoitettu**, ja jatke on joka
sivulla omassa muodossaan — ei 13 kertaa samaa lausetta.

Vartio `tests/lehdet.test.mjs` kattaa nyt **kaikki 14 sivua** ja lisäksi
valvoo, ettei listan ulkopuolelle jää yhtään nostoista tyhjentynyttä
sivua.

`npm test` **# tests 3361, # pass 3348, # fail 0** (skipped 13).
Kaksoisavaimet, niputus ja savukkeet vihreinä. Kaksi punaista
vastakoetta ajettu ja kirjattu (luku 4).

## 1. Miten lista mitattiin (en luottanut muistiin)

Raportti `viesti-fable-nostokortti-20260914.md` luku 8.1 nimeää 13
sivua. **Mittasin listan itse ennen työtä** ja sain saman.

Menetelmä: erää 5 edeltävä `js/packs/kulttuuri-kategoriat.js` on
commitissa **09b1c625** (v1713); erä 5 on 721efc3c ja erä 10 on
92e55048. Vertasin vanhaa ja nykyistä taulua sivu sivulta ja poimin ne,
joilla oli nostoja ennen ja **nolla** nyt:

```
TYHJENTYNEET: 14
lontoo/nykytaide      siirtyi 4
lontoo/luonto         siirtyi 2
wien/musiikki         siirtyi 2   <- korjattu jo v1861:ssä
wien/tiede            siirtyi 3
wien/luonto           siirtyi 2
madrid/urheilu        siirtyi 2
madrid/rakennukset    siirtyi 2
berliini/rakennukset  siirtyi 2
berliini/historia     siirtyi 4
pariisi/musiikki      siirtyi 3
pariisi/historia      siirtyi 7
amsterdam/taide       siirtyi 2
rooma/arki            siirtyi 2
rooma/historia        siirtyi 3
```

14 sivua, 40 siirtynyttä nostoa; Wien/musiikki oli jo korjattu, joten
tämän erän työ on **13 sivua ja 38 nostoa**. Luku täsmää raportin
lukuun (Pariisi 2, Lontoo 2, Rooma 2, Berliini 2, Madrid 2, Wien 3,
Amsterdam 1 = 14).

## 2. LÖYDÖS, JOKA OHJASI SANAVALINTOJA: kaikki eivät ole KOHDEkartalla

Siirtyneet jutut ovat kahdessa eri paikassa, ja ero näkyy johdannon
sanavalinnassa:

- **Kohdekartan piste** (kaupunkilehden oma kartta) — valtaosa.
- **Pääkartan merkki** (`kattoVapaa: true`) — 7 juttua, joiden paikka
  jää kohdekartan rajauksen ulkopuolelle: Richmond Park, Wienin
  Konehalli (Prater) ja Keskushautausmaa, Kirahvi ja muoti, Näyttely ja
  pörssi, Köpenickin kapteeni, Aventinuksen avaimenreikä. Nämä ovat
  erän 10 raportin luvun 4 kirjaamia, ja tarkistin lipun koneellisesti
  (`SYVENNYSPAIKAT` / `FOKUSVIRRAT.takynostot`).

Siksi viidellä sivulla jatke sanoo **"kartalla" / "kartalle"** ilman
sanaa *kaupungin*: lontoo/luonto, wien/tiede, wien/luonto,
berliini/historia, rooma/historia. Kahdeksalla muulla sivulla kaikki
jutut ovat kaupungin omalla kohdekartalla, ja jatke sanoo sen.
**Yksikään johdanto ei siis lupaa juttua paikasta, jossa sitä ei ole.**

## 3. Kaikki 13 sivua — VANHA/UUSI sanatarkasti

Kaikissa muutos on **pelkkä lisäys**: vanha teksti on merkki merkiltä
sama, paitsi että ajatusviivalla jatketuissa lopun piste vaihtui
ajatusviivaksi (sama tapa kuin Wienin mallissa v1861).

### 1. lontoo/nykytaide — Nykytaide · 4 nostoa siirtyi

Kohde: kohdekartan pisteet Leake Streetin tunneli, Neljäs jalusta,
Turbiinihalli, Liukumäkiveistos.

> **VANHA:** Lontoossa nykytaide ei pysy museon seinällä: sitä maalataan junatunnelin kattoon, nostetaan tyhjälle patsasjalustalle ja kiedotaan liukumäeksi olympiapuiston veistoksen ympärille.
>
> **UUSI:** Lontoossa nykytaide ei pysy museon seinällä: sitä maalataan junatunnelin kattoon, nostetaan tyhjälle patsasjalustalle ja kiedotaan liukumäeksi olympiapuiston veistoksen ympärille. **Kaikki neljä ovat nyt omina pisteinään kaupungin kartalla.**

### 2. lontoo/luonto — Joki ja puisto · 2 nostoa siirtyi

Kohde: kohdekartan piste Thamesin vuorovesi (`syvennys-lontoo-vuorovesi`)
ja pääkartan merkki Richmond Park (syvennys `hirvet`, kattoVapaa).

> **VANHA:** Thames on vuorovesijoki, ja laskuveden aikaan sen kivinen ranta paljastuu keskellä miljoonakaupunkia. Kulman takana on toinen maailma: aidattu puisto, jossa kulkee vapaana lauma hirviä.
>
> **UUSI:** Thames on vuorovesijoki, ja laskuveden aikaan sen kivinen ranta paljastuu keskellä miljoonakaupunkia. Kulman takana on toinen maailma: aidattu puisto, jossa kulkee vapaana lauma hirviä. **Molemmat on merkitty kartalle omina pisteinään.**

### 3. wien/tiede — Tiede ja tekniikka · 3 nostoa siirtyi

Kohde: kohdekartan piste Vuoristovesijohto; pääkartan merkit Konehalli
(syvennys `sahko`) ja Näyttely ja pörssi (täkynosto
`maailmannayttely-1873`).

> **VANHA:** Isoisän matkavuonna Wien avasi maailmannäyttelyn ja vuoristovesijohdon. Näyttelyhallissa sattui myös vahinko, joka muutti tehtaat: kone pyörähti väärään suuntaan.
>
> **UUSI:** Isoisän matkavuonna Wien avasi maailmannäyttelyn ja vuoristovesijohdon. Näyttelyhallissa sattui myös vahinko, joka muutti tehtaat: kone pyörähti väärään suuntaan. **Näyttely, vesijohto ja konehalli löytyvät nyt kartalta omina merkkeinään.**

Nimet ovat kartan omat nimiöt ("Näyttely ja pörssi",
"Vuoristovesijohto", "Konehalli") — ei uutta faktaa.

### 4. wien/luonto — Eläimet kaupungissa · 2 nostoa siirtyi

Kohde: pääkartan merkit Keskushautausmaa (syvennys `kauriit`) ja
Kirahvi ja muoti (täkynosto `kirahvimuoti`). Kumpikaan ei mahdu
kohdekartan rajaukseen.

> **VANHA:** Wienin keskushautausmaalla laiduntaa parikymmentä kaurista vanhojen hautakivien lomassa, ja Schönbrunniin tuotu kirahvi muutti aikoinaan kaupungin kampaukset, kankaat ja seuraelämän.
>
> **UUSI:** Wienin keskushautausmaalla laiduntaa parikymmentä kaurista vanhojen hautakivien lomassa, ja Schönbrunniin tuotu kirahvi muutti aikoinaan kaupungin kampaukset, kankaat ja seuraelämän **— kumpikin tarina odottaa kartalla omalla merkillään.**

### 5. madrid/urheilu — Urheilu · 2 nostoa siirtyi, YKSI kortti

Kohde: kohdekartan piste Kaksi joukkuetta
(`nosto-madridin-kaksi-joukkuetta`). Erän 10 ainoa yhdistetty kortti —
siksi jatke puhuu **yhdestä** pisteestä.

> **VANHA:** Kaupungissa on kaksi suurta jalkapalloseuraa, ja kummallakin on oma suihkulähde, jonka päälle mestaruus kiivetään juhlimaan.
>
> **UUSI:** Kaupungissa on kaksi suurta jalkapalloseuraa, ja kummallakin on oma suihkulähde, jonka päälle mestaruus kiivetään juhlimaan **— molemmat seurat jakavat nyt yhden pisteen kaupungin kartalla.**

### 6. madrid/rakennukset — Kadut ja talot · 2 nostoa siirtyi

Kohde: kohdekartan pisteet Gran Vía ja Palamaton linna.

> **VANHA:** Kaupungin läpi murrettiin katu hopeisella hakulla, ja palaneen linnan tilalle rakennettiin sellainen, joka ei voisi palaa.
>
> **UUSI:** Kaupungin läpi murrettiin katu hopeisella hakulla, ja palaneen linnan tilalle rakennettiin sellainen, joka ei voisi palaa. **Katu ja linna ovat nyt kaupungin kartalla, kumpikin omalla paikallaan.**

### 7. berliini/rakennukset — Tornit ja torit · 2 nostoa siirtyi

Kohde: kohdekartan pisteet Maailmankello ja Paavin kosto.

> **VANHA:** Syksyllä 1969 Alexanderplatzille valmistui neljän päivän välein kaksi asiaa: kello, joka näyttää maailman ajat, ja torni, joka näkyy kaikkialle kaupunkiin.
>
> **UUSI:** Syksyllä 1969 Alexanderplatzille valmistui neljän päivän välein kaksi asiaa: kello, joka näyttää maailman ajat, ja torni, joka näkyy kaikkialle kaupunkiin **— ja kumpikin seisoo nyt omana pisteenään kaupungin kartalla.**

### 8. berliini/historia — Historia · 4 nostoa siirtyi

Kohde: kohdekartan pisteet Brandenburgin portti, Berliinin karhu,
Lehmän hinnalla; pääkartan merkki Köpenickin kapteeni (täkynosto,
kattoVapaa).

> **VANHA:** Portti, josta alkaa Unter den Linden, sinetin karhu vuodelta 1280, univormu joka valtasi kaupungintalon — ja kivilaatta, josta museo maksoi 20 000 kultamarkkaa.
>
> **UUSI:** Portti, josta alkaa Unter den Linden, sinetin karhu vuodelta 1280, univormu joka valtasi kaupungintalon — ja kivilaatta, josta museo maksoi 20 000 kultamarkkaa. **Jokainen neljästä on nyt oma merkkinsä kartalla.**

Vanhassa virkkeessä on jo ajatusviiva, joten jatke on oma virkkeensä.

### 9. pariisi/musiikki — Musiikki · 3 nostoa siirtyi, 2 pistettä

Kohde: kohdekartan pisteet Pariisi soi (Palais Garnier; Piaf ja Django
samassa kortissa) ja Carmenin ensi-ilta.

> **VANHA:** Kaksi muusikkoa aloitti Pariisin kaduilta ja kaupungin laidan asuntovaunuleiriltä — ja yksi ooppera kaatui täällä ensi-illassaan ennen kuin se nousi maineeseen muualla.
>
> **UUSI:** Kaksi muusikkoa aloitti Pariisin kaduilta ja kaupungin laidan asuntovaunuleiriltä — ja yksi ooppera kaatui täällä ensi-illassaan ennen kuin se nousi maineeseen muualla. **Muusikot ja ooppera ovat nyt omilla pisteillään kaupungin kartalla.**

### 10. pariisi/historia — Historia · 7 nostoa siirtyi

Johdanto nimeää kolme, ja juuri ne kolme ovat kohdekartan pisteitä:
Kyyhkyposti, Tuileriain rauniot, Impressionistit. (Loput neljä ovat
myös kartalla: Kirahvin kävelymatka, Torni romuraudaksi, Pariisin
vuosisadat — jatke ei kuitenkaan lupaa enempää kuin mitä johdanto
nimeää.)

> **VANHA:** Isoisän matkavuoden Pariisi oli yhä piirityksen ja palon jäljiltä auki. Samat vuodet jättivät kaupunkiin kyyhkypostin, palatsin rauniot ja maalaussuunnan, jonka nimi oli alun perin pilkkaa.
>
> **UUSI:** Isoisän matkavuoden Pariisi oli yhä piirityksen ja palon jäljiltä auki. Samat vuodet jättivät kaupunkiin kyyhkypostin, palatsin rauniot ja maalaussuunnan, jonka nimi oli alun perin pilkkaa. **Kaikki kolme on nyt merkitty kaupungin kartalle.**

### 11. amsterdam/taide — Taide · 2 nostoa siirtyi

Kohde: kohdekartan pisteet Yövartio ja Maitotyttö.

> **VANHA:** Kaksi maalausta samassa museossa: toisesta sahattiin palat pois, toisen alta löytyi tavaroita, jotka maalari itse peitti.
>
> **UUSI:** Kaksi maalausta samassa museossa: toisesta sahattiin palat pois, toisen alta löytyi tavaroita, jotka maalari itse peitti. **Kumpikin maalaus on nyt oma pisteensä kaupungin kartalla.**

### 12. rooma/arki — Arki ja vesi · 2 nostoa siirtyi

Kohde: kohdekartan pisteet Aqua Virgo ja Nasone.

> **VANHA:** Roomassa vesi ei ole koskaan loppunut kesken: sama vuorilta tuleva virta, joka täytti keisarien kylpylät, tulee yhä ilmaiseksi kadunkulman rautapylväästä.
>
> **UUSI:** Roomassa vesi ei ole koskaan loppunut kesken: sama vuorilta tuleva virta, joka täytti keisarien kylpylät, tulee yhä ilmaiseksi kadunkulman rautapylväästä **— vesijohto ja pylväs ovat molemmat kaupungin kartalla.**

### 13. rooma/historia — Historia · 3 nostoa siirtyi

Kohde: kohdekartan pisteet Vatikaanin palatsi ja Torre Argentina;
pääkartan merkki Avaimenreikä (syvennys `avaimenreika`, kattoVapaa —
Aventinus 41,8836 N jää kohdekartan eteläreunan 41,8845 alapuolelle).

> **VANHA:** Paavi jäi Vatikaaniin vangiksi kolme vuotta ennen isoisän käyntiä, Aventinuksella katsotaan avaimenreiästä kolmen valtion läpi, ja Caesarin murhapaikalla asuu kissalauma.
>
> **UUSI:** Paavi jäi Vatikaaniin vangiksi kolme vuotta ennen isoisän käyntiä, Aventinuksella katsotaan avaimenreiästä kolmen valtion läpi, ja Caesarin murhapaikalla asuu kissalauma. **Kaikki kolme paikkaa on merkitty kartalle.**

## 4. Vartio: yhdestä sivusta neljääntoista

`tests/lehdet.test.mjs`, testi **"kartalle ohjaava johdanto pitää
lupauksensa"**. Ennen: **1 sivu** (wien/musiikki). Nyt: **14 sivua**,
ja kolme uutta vaatimusta.

Jokaisesta listan sivusta tarkistetaan:

1. sivulla on **nolla** omaa nostoa (jos juttuja palaa, johdanto on
   tarkistettava uudelleen);
2. **vanha virke on sanatarkasti tallella** (`johdanto.includes`);
3. johdanto **ohjaa kartalle** (`/kartal/i`);
4. johdantoon on **lisätty** jotain vanhan virkkeen perään (pituusvertailu
   — pelkkä vanhan virkkeen jättäminen ei riitä);
5. jokainen **kohdekartta**-tunnus on oikeasti `KAUPUNKIKARTAT`-pisteenä;
6. jokainen **pooli**-tunnus on kaupungin täkynostoissa;
7. jokainen **pääkartta**-tunnus löytyy `SYVENNYSPAIKAT`- tai
   täkynostotaulusta **ja kantaa `kattoVapaa`-lipun** — ilman lippua
   juttu ei näy kartalla lainkaan.

**Lisäksi vartio valvoo listan täydellisyyttä.** Se kerää kaikki
aihesivut, joilla on nolla nostoa, ja vaatii, että jokainen on
OHJAAVAT-listassa. Jos joku tyhjentää uuden sivun tulevassa erässä,
testi kaatuu ja nimeää sivun — juuri se vika, joka pääsi syntymään
erissä 5 ja 10, ei siis enää pääse syntymään hiljaa.

Vartion nimeämiä karttaankkureita on **34**: **27 kohdekartan pistettä**
(joista **18** on tarkistettu myös kaupungin täkynostopoolista) ja
**7 pääkartan merkkiä**. Ankkureita on vähemmän kuin siirtyneitä nostoja
(38), koska osa nostoista yhdistettiin samaan korttiin (Madridin kaksi
joukkuetta, Pariisin "Pariisi soi" ja "Pariisin vuosisadat") ja koska
jatke lupaa vain sen, minkä johdanto nimeää.

## 5. VASTAKOKEET — numerot

Vartion piti kaatua, ja se kaatuu. Kaksi erillistä koetta:

### Vastakoe 1 (tehtävänannon vaatima): vanha johdanto takaisin

Palautin `lontoo/nykytaide`-sivun johdannon eran 5 edeltävään muotoon
(jatke pois, muu ennallaan) ja ajoin `node --test tests/lehdet.test.mjs`:

```
KORJATTUNA          VANHA JOHDANTO PALAUTETTUNA
# tests 10          # tests 10
# pass  10          # pass   9
# fail   0          # fail   1
```

Kaatunut väite:

```
not ok 7 - kartalle ohjaava johdanto pitää lupauksensa
  error: 'lontoo/nykytaide: tyhjentynyt sivu ei ohjaa lukijaa kartalle'
  actual: 'Lontoossa nykytaide ei pysy museon seinällä: … veistoksen ympärille.'
```

### Vastakoe 2: karttapiste pois

Nimesin ajossa uudelleen Rooman kohdekartan pisteen
`nosto-aqua-virgo` (yksi osuma `js/packs/maakartat.js`:ssä) — eli
simuloin tilannetta, jossa juttu katoaa kartalta mutta johdanto lupaa
sen yhä:

```
NYKYTILA            PISTE POISTETTU AJOSSA
# pass 10           # pass  9
# fail  0           # fail  1
  error: 'rooma/arki: johdanto lupaa kartan, mutta nosto-aqua-virgo ei ole kohdekartalla'
```

Molemmat muutokset palautettiin heti; haaralla on vain luvun 3
johdannot ja tämän luvun vartio.

## 6. Portit

| portti | tulos |
| --- | --- |
| `npm test` | **# tests 3361, # pass 3348, # fail 0** (skipped 13) |
| `node tools/tarkista-kaksoisavaimet.mjs` | `ei kaksoisavaimia` |
| `node tools/tarkista-niputus.mjs` | `niputus kunnossa: 387 moduulia, 4211 top-level-julistusta, ei törmäyksiä` |
| `node tools/tarkista-savukkeet.mjs` | `savukkeet kunnossa: 1604 ui-viittausta, 404 metodia, 533 kenttää, 31 lehtitilan kenttää` |
| `grep -rn '^<<<<<<<' js css tests tools` | ei osumia |

Muutetut tiedostot: `js/packs/kulttuuri-kategoriat.js`,
`tests/lehdet.test.mjs`, tämä raportti. Ei muuta.

## 7. Mitä EI tehty

1. **Versiota ei nostettu.** `tools/uusi-versio.mjs` ei ajettu;
   `js/main.js`, `sw.js` ja `js/muutokset.js` ovat koskematta. Fable
   versioi ja julkaisee.
2. **Raamattuun ei kirjoitettu.** Tämän erän linjaus (johdanto ohjaa
   kartalle) on Fablen päätös 14.9.2026, ja sen kirjaaminen Raamattuun
   kuuluu Fablelle.
3. **Nostoja ei siirretty takaisin lehteen eikä uusia kirjoitettu.**
   Sivut pysyvät tyhjinä; jatke vain kertoo, minne jutut menivät.
4. **Yhtään faktaa ei lisätty.** Jokainen jatke käyttää vain sivun oman
   johdannon sanoja ja kartan omia nimiöitä.
5. **Pelin logiikkaan ei koskettu.** Ei `js/lehti.js`, ei
   `js/fokusnosto.js`, ei `js/ui.js`.
6. **Kohdekartan rajauksia ei laajennettu.** Seitsemän juttua on yhä
   pääkartalla, koska paikka jää rajauksen ulkopuolelle (erän 10 luku 4
   ja avoin kohta 11.3). Se on kuvatyötä, ei tämän erän tilausta —
   johdannot on kirjoitettu tämän tosiasian mukaisiksi, ei sen ympäri.
7. **Amsterdamin ohuutta ei korjattu** (erän 10 avoin kohta 11.4). Vain
   `taide`-sivun johdanto korjattiin.
8. **Wienin kainalokartan nosto** (erän 10 avoin kohta 11.3) jäi
   ennalleen — se on työkalumuutos.

## 8. Kohdat, joissa jouduin tulkitsemaan

Kolme, kaikki pieniä, ja jokaisessa valitsin varovaisemman lukutavan:

1. **"Kartalla" vai "kaupungin kartalla".** Wienin malli sanoo
   "kaupungin kartalla", ja siinä molemmat jutut ovat kohdekartalla.
   Viidellä sivulla osa jutuista on pääkartalla (`kattoVapaa`), joten
   mallin sanamuoto olisi ollut **väärä lupaus**. Pudotin niiltä sivuilta
   sanan *kaupungin* ja jätin pelkän "kartalla/kartalle". Jos Fable
   haluaa tähän toisen ratkaisun (esim. rajausten laajentaminen tai
   selkeämpi ero pää- ja kohdekartan välillä), sivut on helppo
   kirjoittaa uusiksi — vartio nimeää täsmälleen, mikä juttu on missä.
2. **Mitä johdanto "lupaa" pariisi/historiassa.** Sivulta siirtyi
   seitsemän nostoa, mutta johdanto nimeää kolme. Kirjoitin jatkeen
   koskemaan niitä kolmea ("Kaikki kolme…"), en seitsemää — muuten
   jatke olisi luvannut enemmän kuin johdanto sanoo. Sama valinta on
   erän 5 raportin luvussa 1: kolmikon valintaperuste on osaston oma
   johdanto.
3. **Madridin urheilusivun luku.** Sivulta siirtyi kaksi nostoa, mutta
   ne yhdistettiin **yhdeksi** kortiksi. Kirjoitin jatkeen yhden pisteen
   mukaan ("molemmat seurat jakavat nyt yhden pisteen"), koska kahden
   pisteen lupaus olisi ollut väärä. Tehtävänannon yksikkö/monikko-sääntö
   luettuna pisteiden eikä juttujen mukaan.

---

*Raportti pushattu haaralle `claude/era-tyhjat-sivut`; PR auki mainiin.
Jään valmiuteen.*
