# Kohtaamiset erä C6: seuraavat 6 eurooppalaista kaupunkia eniten nostoja (2026-09-22)

Sisältökirjuri (Sonnet), jatkoa erille C1–C5. Rajaus edelleen Eurooppaan.
Kirjoitettu Sonnet-parvella (kuusi rinnakkaista agenttia, yksi per
kaupunki):

| Kaupunki | Nostoja | Huomio |
| --- | ---: | --- |
| Sevilla | 7 | Puhdas kaupunki (agentti vältti myös fokusvirran ei-kanonisen "Amparo"-ehdotuksen). Uusi hahmo keramiikkamaalari Remedios. Isoisä-koukku: Pickmanin keramiikkatehtaan omistaja aateloitiin 11.2.1873 — sama päivä kuin Espanjan tasavallan julistus (jo käytetty Granadassa/C3), mutta ERI tapahtuma, tasavaltaa ei mainita tekstissä. Uusi kuva tarpeen. |
| Bryssel | 7 | Puhdas kaupunki. Uusi hahmo kivenveistäjä Aline. Isoisä-koukku: Brysselin pörssitalo oli isoisän kesäkuun 1873 käynnin aikaan yhä telineiden takana, avattiin vasta 27.12.1873. Uusi kuva tarpeen. |
| Marseille | 6 | Kaaren soutaja Baptiste (satama, Ifin saari/Monte Cristo) ja dokumentoitu tyylikoekuva varattuja kaarelle; myös kaupunkilehden/maalehden laajasti kattamat aiheet (saippua, Notre-Dame de la Garde, kalatori) vältetty. Uusi hahmo santontekijä Rosine, kokonaan uusi aihepiiri (santonimessut, perustettu 1803). Uusi kuva tarpeen. |
| Kiova | 6 | Kaaren näyttelymestari Danylo (Kultainen portti) varattu kaarelle; myös laattakysymysten/lehden kattamat aiheet (Petšerskin luostari, Kiovan Rus) vältetty. Uusi hahmo sillanvartija Oksana, Nikolain ketjusillalla (1853, aikansa Euroopan suurin riippusilta) — fakta pidetty tiukasti 1873-aikakaudessa, ei viittausta myöhempään historiaan tai nykypolitiikkaan. Uusi kuva tarpeen. |
| Luxemburg | 6 | Puhdas kaupunki. Uusi hahmo kivenhakkaaja Nic. Isoisä-koukku: 1867 Lontoon sopimuksen määräämä linnoituksen purku (1867–1883) oli 1873 tarkalleen puolivälissä. Uusi kuva tarpeen. |
| Riika | 6 | Kaaren kultaaja Ilze (tornikukot, kultaus) ja hänen kuvansa varattuja kaarelle — lisäksi fokusvirrassa TOINEN, eri "apteekkari Ilze" -hahmo, joten nimeä ei käytetä kolmatta kertaa. Uusi hahmo sillanrahastaja Valdis, Daugavan kelluvalla ponttonisillalla. Isoisä-koukku: Riian ensimmäinen pysyvä rautatiesilta avattiin vasta 1.1.1873, puoli vuotta ennen isoisän heinäkuun käyntiä. Uusi kuva tarpeen. |

**Valletta vaihdettu Riikaan Fablen päätöksellä (22.9.2026):** Valletta on
KEVYET_FOKUSVIRRAT-joukossa eikä sillä ole vielä täyttä kaupunkilehteä
(kohtaamiskortit pois käytöstä koodissa) — sisältöä ei saa jättää dataan
kytkemättömänä. Teatterin lipunmyyjä Rita -teksti on valmis ja säilytetty
tämän raportin lopussa omassa "Valmisteltu, ei vielä kytketty" -osiossa
tulevaa käyttöä varten, kun Valletta saa täyden fokusvirtapinon.

Rakenne sama kuin erät C1–C5. Ei vielä kirjoitettu js/packs/kohtaamiset.js:ään
— tarkastukseesi ensin.

## Läpikäyvät huomiot

1. Kolme kuudesta aktiivisesta kaupungista on tarinakaarikaupunkeja
   (Marseille, Kiova, Riika); kolme on puhtaita (Sevilla, Bryssel,
   Luxemburg).
2. Sekä Sevilla- että Bryssel-agentit tarkistivat erikseen fokusvirran
   EI-KANONISIA ehdotettuja hahmonimiä (Amparo Sevillassa) ja vältivät
   niitä varmuuden vuoksi, samaan tapaan kuin Bergen-agentti teki
   erässä C5.
3. Marseille-agentti löysi tyylikoekuvan, joka on dokumentoitu mutta ei
   vielä kuvakatalogissa (sama tilanne kuin Edinburgh/Ewan ja
   Kraków/Stanisław aiemmissa erissä) — silti kiistatta varattu kaaren
   hahmolle riippumatta katalogitilanteesta.
4. Kiova-agentti noudatti erityistä varovaisuutta: 1873-fakta pysyy
   tiukasti insinööritiedossa, ei viittausta myöhempään historiaan tai
   nykypolitiikkaan missään kohdassa (sama ohje kuin Moskovalle C4:ssä).
5. Sevilla-agentti varmisti, ettei 1873-faktan päivämäärä (11.2.1873)
   aiheuta ristiriitaa Granadan/Barcelonan jo käyttämän Espanjan
   tasavallan julistuksen kanssa — sama päivä, mutta täysin eri
   tapahtuma, eikä tasavaltaa mainita tekstissä lainkaan.
6. Kaikki inline-luentatagit englanniksi, luennoissa vain roolit
   'kertoja' ja 'hahmo', tunneLoyto/Tyhja/Vaarin rekisterin pakolliset
   arvot, kaikki merkkimäärät rajoissa. Kaikki kuusi tarvitsevat UUDEN
   kuvan Codexilta.

---

# Kohtaaminen erä C6: Sevilla

Sisältökirjuri-sessio, 22.9.2026. Sisällöntuotantoa `docs/raportit/`-tiedostoon
Fablen/Sisältökirjurin tarkastettavaksi — `js/packs/kohtaamiset.js`-,
`js/kohtaamiskuvat-data.js`- eikä `js/tyohuone-kehitys-data.js`-tiedostoja
**ei** ole muokattu.

## RISTIRIITATARKISTUS ENSIN

Ei yhtään osumaa kolmesta tiedostosta. Sevillalla ei siis ole
tarinakaarta, ei olemassa olevaa kohtaamiskuvaa eikä dokumentaatioriviä
— puhdas kaupunki, kuten Košice ja Bergen olivat erässä C5.

**Lisähuomiot:**

- `js/packs/fokusvirta-sevilla.js` sisältää oman, ERI JÄRJESTELMÄN
  EHDOTUKSEN kohtaamiseen: **jokiluotsi Amparo**, kohtaamispiste Torre
  del Oro joen rannalla. Tiedoston oma kommentti merkitsee tämän
  ehdotukseksi, ei kaanoniksi. Varmuuden vuoksi kirjoitin silti
  kokonaan eri hahmon.
- Tarkistin myös kaupunkilehden nykyisen sisällön, jotta tervehdys ei
  kertaisi mitään jo luettua: lehti kattaa katedraalin/Giraldan,
  Alcázarin, Torre del Oron, kaupunginmuurit, Intian arkiston,
  Amerikan-kaupan yksinoikeuden ja appelsiinimarmeladin. Yksikään
  näistä ei toistu tässä kohtaamisessa.
- Granada (C3) ja Barcelona (C4) käyttivät Espanjan ensimmäistä
  tasavaltaa (julistettiin 11.2.1873) isoisä-koukkunaan. Tämän
  kohtaamisen 1873-fakta osuu historiallisesti samalle päivälle
  (11.2.1873) mutta on **eri tapahtuma** — ei valtakunnan hallintomuodon
  vaihdos vaan yhden tehtaanomistajan aateloiminen — enkä mainitse
  tasavaltaa tervehdyksessä lainkaan.

## Sevilla — keramiikkamaalari Remedios

**hahmo:** `'keramiikkamaalari Remedios'`

**nappi:** `'Tapaa Remedios'`

**frame:** `'Remedios nostaa siveltimensä lautasen yllä ja kysyy'`

**tervehdys** (268 merkkiä, raja ~280):
`'Remedios katsoo kirjaasi savenvärisin sormin siveltimen yllä: "Pomomme — se englantilainen, joka osti luostarin saviastioiksi — sai juuri markiisin arvonimen kuninkaalta. Näytä että tunnet maailmaa kuten piirtäjä — niin maalaan sinulle kuvion, jota kukaan muu ei saa."'`

**tervehdysLuenta:**
```js
[
  { rooli: 'kertoja', teksti: 'Remedios katsoo kirjaasi savenvärisin '
    + 'sormin siveltimen yllä:' },
  { rooli: 'hahmo', teksti: '[curious] "Pomomme — se englantilainen, '
    + 'joka osti luostarin saviastioiksi — sai juuri markiisin '
    + 'arvonimen kuninkaalta. [warmly] Näytä että tunnet maailmaa '
    + 'kuten piirtäjä — niin maalaan sinulle kuvion, jota kukaan muu '
    + 'ei saa."' },
]
```

**loyto** (125 merkkiä, raja 130):
`'Remedios löytää rasian glaseerisäkkien takaa: "Tämä ei ole savea eikä lasitetta — jätän sen tähän muiden aarteiden joukkoon."'`

**loytoLuenta:**
```js
[
  { rooli: 'kertoja', teksti: 'Remedios löytää rasian glaseerisäkkien '
    + 'takaa:' },
  { rooli: 'hahmo', teksti: '[surprised] "Tämä ei ole savea eikä '
    + 'lasitetta — jätän sen tähän muiden aarteiden joukkoon."' },
]
```

**tyhja** (98 merkkiä, raja 130):
`'Remedios pyyhkii hyllyn tyhjäksi: "Tyhjä. Työpaja siivotaan joka ilta ennen uunien sammuttamista."'`

**vaarin** (107 merkkiä, raja 130):
`'Remedios kääntää lautasen takaisin pöydälle: "Ei vielä. Kuvio vaatii monta kertaa ennen kuin se on oikein."'`

**tunnetagit:**
```js
tunneTervehdys: { tunne: 'utelias', voimakkuus: 0.5 }
tunneLoyto: { tunne: 'ilo', voimakkuus: 0.7 }
tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 }
tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 }
```

## 1873-fakta ja lähteet

Englantilaissyntyinen liikemies Charles Pickman Jones perusti
1837–1841 Sevillaan keramiikkatehtaan vanhan kartusiaaniluostarin,
Cartuja de Sevillan, tiloihin. **11. helmikuuta 1873** kuningas
Amadeo I myönsi Pickmanille **markiisin arvonimen** tunnustuksena
hänen yritystoiminnalleen. Tämä on eri tapahtuma kuin Granadan/
Barcelonan käyttämä tasavallan julistus (joka historiallisesti osuu
samalle päivälle, mutta ei esiinny tässä tekstissä).

Lähteet (tarkistettu 22.9.2026, WebSearch/WebFetch):
- [La Cartuja de Sevilla-Pickman – Wikipedia (es)](https://es.wikipedia.org/wiki/La_Cartuja_de_Sevilla-Pickman)
- [Charles Pickman Jones – Wikipedia (en)](https://en.wikipedia.org/wiki/Charles_Pickman_Jones)

## Olemassa olevat Sevilla-kuvakonseptit (ristiriitatarkistus)

- Ei yhtään riviä `js/kohtaamiskuvat-data.js`:ssä eikä
  `docs/kuvatuotanto-kohtaamiset.md`:ssä.
- Ei olemassa olevaa kuvaa keramiikkamaalari Remediokselle — uusi tilaus.

## Kuvatarve: uusi tilaus Codexille

> **Sevilla — keramiikkamaalari Remedios.** Andalusialainen nainen, noin
> 30–45-vuotias. Paikka: La Cartujan keramiikkatehtaan maalaamo vanhan
> luostarin holvatussa huoneessa — työpöytä täynnä posliinilautasia,
> **ei Giraldaa, katedraalia, Alcázaria, Torre del Oroa eikä
> härkätaisteluareenaa näkyvissä**. Kesken aidon tekemisen: sivellin
> pysähtyneenä lautasen reunalle. Valo/sää: lämmin, pehmeä sisävalo
> holvi-ikkunasta. Rajaus enintään puolivartalo. **Ei näytetä:**
> tehtaanomistajaa tai arvonimeen viittaavaa asiakirjaa, ei valmista
> kuviota täysin luettavana, ei jokiluotsia, venettä eikä Torre del Oroa.

---

# Kohtaaminen erä C6: Bryssel

Sisältökirjuri-sessio, 22.9.2026. Sisällöntuotantoa `docs/raportit/`-tiedostoon
Fablen/Sisältökirjurin tarkastettavaksi — `js/packs/kohtaamiset.js`-,
`js/kohtaamiskuvat-data.js`- eikä `js/tyohuone-kehitys-data.js`-tiedostoja
**ei** ole muokattu.

## RISTIRIITATARKISTUS ENSIN

Ei yhtään osumaa. Brysselillä ei siis ole tarinakaarta, ei olemassa
olevaa kohtaamiskuvaa eikä dokumentaatioriviä — puhdas kaupunki.

**Lisätarkistus (lehden jo kattamat aiheet):** fokusvirta ja
maa-artikkeli kattavat jo Grand-Placen, Manneken Pisin, Galeries
Royales Saint-Hubertin, Palais de Justicen, brysseliläisen pitsin ja
Sennejoen kattamisen — kaikki nämä on siis vältettävä. Sen sijaan
kartan miniatyyrinimi "Brysselin pörssi" on aidosti käyttämätön aihe.
Valitsin kohtaamisen paikaksi pörssitalon (La Bourse), joka oli
isoisän kesäkuun 1873 käynnin aikaan vielä rakenteilla.

## Bryssel — kivenveistäjä Aline

**hahmo:** `'kivenveistäjä Aline'`

**nappi:** `'Tapaa Aline'`

**frame:** `'Aline laskee taltan hetkeksi kädestään ja kysyy'`

**tervehdys** (278 merkkiä, raja ~280):
`'Aline pyyhkii kivipölyn hihaansa ja vilkaisee kirjaasi: "Isoisäsi näki tämän vielä telineiden takana — sali avataan juhlallisesti vasta joulun alla, puoli vuotta hänen käyntinsä jälkeen. Näytä että tunnet maailmaa kuten piirtäjä — niin näytän, mikä kuvista on minun käsialaani."'`

**tervehdysLuenta:**
```js
[
  { rooli: 'kertoja', teksti: 'Aline pyyhkii kivipölyn hihaansa ja '
    + 'vilkaisee kirjaasi:' },
  { rooli: 'hahmo', teksti: '[curious] "Isoisäsi näki tämän vielä '
    + 'telineiden takana — sali avataan juhlallisesti vasta joulun '
    + 'alla, puoli vuotta hänen käyntinsä jälkeen. [warmly] Näytä '
    + 'että tunnet maailmaa kuten piirtäjä — niin näytän, mikä '
    + 'kuvista on minun käsialaani."' },
]
```

**loyto** (121 merkkiä, raja 130):
`'Aline nostaa rasian kivilastujen alta: "Tämä ei ole minun taltallani tehty — mutta kivipölyn alle mahtuu moni salaisuus."'`

**loytoLuenta:**
```js
[
  { rooli: 'kertoja', teksti: 'Aline nostaa rasian kivilastujen '
    + 'alta:' },
  { rooli: 'hahmo', teksti: '[surprised] "Tämä ei ole minun '
    + 'taltallani tehty — mutta kivipölyn alle mahtuu moni '
    + 'salaisuus."' },
]
```

**tyhja** (113 merkkiä, raja 130):
`'Aline koputtaa tyhjää koloa telineen takana: "Tyhjä. Työmaalla kulkee liikaa käsiä joka päivä — joku ehti ensin."'`

**vaarin** (105 merkkiä, raja 130):
`'Aline pyyhkii pölyn taltaltaan: "Ei vielä. Kivi ei anna periksi ensimmäisellä iskulla — yritä uudestaan."'`

**tunnetagit:**
```js
tunneTervehdys: { tunne: 'utelias', voimakkuus: 0.5 }
tunneLoyto: { tunne: 'ilo', voimakkuus: 0.7 }
tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 }
tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 }
```

## 1873-fakta ja lähteet

Brysselin pörssitalo (La Bourse) rakennettiin vuosina 1868–1873
arkkitehti Léon-Pierre Suysin suunnitelmien mukaan. Rakennus vihittiin
käyttöön juhlallisin menoin **27.12.1873** — puoli vuotta isoisän
kesäkuisen Bryssel-käynnin jälkeen. Julkisivun kuvanveisto-ohjelmaa
toteutti mm. Carrier-Belleusen ateljee, jossa työskenteli tuolloin
myös nuori Auguste Rodin.

Lähteet (tarkistettu 22.9.2026, WebSearch/WebFetch):
- [Bourse Palace – Wikipedia](https://en.wikipedia.org/wiki/Bourse_Palace)
- [Place de la Bourse, Brussels – Wikipedia](https://en.wikipedia.org/wiki/Place_de_la_Bourse,_Brussels)

## Olemassa olevat Bryssel-kuvakonseptit (ristiriitatarkistus)

- Ei yhtään riviä millään tiedostolla.
- Ei olemassa olevaa kuvaa kivenveistäjä Alinelle — uusi tilaus.

## Kuvatarve: uusi tilaus Codexille

> **Bryssel — kivenveistäjä Aline.** Belgialainen nainen, noin 25–35-
> vuotias. Paikka: keskeneräisen pörssirakennuksen työmaa — puiset
> telineet, puolivalmis kivireliefi julkisivussa — **ei Grand-Placea,
> ei Manneken Pisiä, ei Galeries Royales Saint-Hubertia eikä Palais de
> Justicea näkyvissä**. Kesken aidon tekemisen: taltta ja nuija
> käsissä. Valo/sää: kesäkuinen iltapäivä. Rajaus enintään
> puolivartalo. **Ei näytetä:** valmista pörssirakennusta
> kokonaisuudessaan, eikä mitään Grand-Placen, Manneken Pisin tai
> Palais de Justicen tunnisteita.

---

# Kohtaaminen erä C6: Marseille

Sisältökirjuri-sessio, 22.9.2026. Sisällöntuotantoa `docs/raportit/`-tiedostoon
Fablen/Sisältökirjurin tarkastettavaksi — `js/packs/kohtaamiset.js`-,
`js/kohtaamiskuvat-data.js`- eikä `js/tyohuone-kehitys-data.js`-tiedostoja
**ei** ole muokattu.

## RISTIRIITATARKISTUS ENSIN

Marseillella on jo tarinakaari. Kaaren oma `henkilo`-kenttä:

> "Soutaja Baptiste kuljettaa kalastajia satamasta ja tuntee Ifin saaren
> virtaukset paremmin kuin kukaan."

Fokusvirta nimeää kohtaamispaikan eksplisiittisesti Vieux-Portiksi.
Baptiste, soutaminen, kalastus, Vieux-Port ja Ifin saari/Monte Cristo
ovat siis kiistatta varattuja kaaren omaan kohtaamiseen.

**Kuvatarkistus:** `docs/kuvatuotanto-kohtaamiset.md` rivillä 90 on
dokumentoitu tyylikoe: Baptiste keskeyttää verkonvedon, Château d'If
bokehissa, tila "Tyylikoe valmis" — sama tilanne kuin Edinburghin
Ewanilla ja Krakovan Stanisławilla, vasta dokumentoitu muttei
kuvakatalogissa, mutta kiistatta varattu Baptistelle.

**Lehti-/maalehtitarkistus:** kaupunkilehti ja Ranskan maalehti
kattavat jo laajasti Vanhan sataman, Notre-Dame de la Garden,
Marseillen saippuan, bouillabaissen, navette-keksin ja marseljeesin.

**Johtopäätös:** kirjoitin kokonaan uuden hahmon, uudella ammatilla,
paikalla ja isoisä-koukulla: **santontekijä Rosine**, joka maalaa
pieniä savihahmoja marraskuun santonimessuille.

## Marseille — santontekijä Rosine

**hahmo:** `'santontekijä Rosine'`

**nappi:** `'Tapaa Rosine'`

**frame:** `'Rosine nostaa pienen siveltimen ja kysyy'`

**tervehdys** (271 merkkiä, raja ~280):
`'Rosine maalaa hiuksenohuella siveltimellä savihahmon kasvoja pöydällä täynnä muita keskeneräisiä: "Marraskuun torille tarvitaan vielä satoja näitä, ennen kuin yksikään myydään. Näytä että tunnet maailmaa kuten piirtäjä — niin annan sinulle yhden, jota kukaan muu ei saa."'`

**tervehdysLuenta:**
```js
[
  { rooli: 'kertoja', teksti: 'Rosine maalaa hiuksenohuella siveltimellä '
    + 'savihahmon kasvoja pöydällä täynnä muita keskeneräisiä:' },
  { rooli: 'hahmo', teksti: '[curious] "Marraskuun torille tarvitaan '
    + 'vielä satoja näitä, ennen kuin yksikään myydään. [warmly] Näytä '
    + 'että tunnet maailmaa kuten piirtäjä — niin annan sinulle yhden, '
    + 'jota kukaan muu ei saa."' },
]
```

**loyto** (120 merkkiä, raja 130):
`'Rosine löytää rasian keskeneräisten hahmojen joukosta: "Tämä ei ole savea eikä maalia — tämä on jonkun toisen käsialaa."'`

**loytoLuenta:**
```js
[
  { rooli: 'kertoja', teksti: 'Rosine löytää rasian keskeneräisten '
    + 'hahmojen joukosta:' },
  { rooli: 'hahmo', teksti: '[surprised] "Tämä ei ole savea eikä '
    + 'maalia — tämä on jonkun toisen käsialaa."' },
]
```

**tyhja** (102 merkkiä, raja 130):
`'Rosine pyyhkii pölyn tyhjältä hyllyltä: "Tyhjä. Tätä verstasta siivotaan ennen jokaista syksyn toria."'`

**vaarin** (111 merkkiä, raja 130):
`'Rosine jatkaa maalaamista katsomatta ylös: "Ei vielä. Yksikään hahmo ei synny ensimmäisellä siveltimenvedolla."'`

**tunnetagit:**
```js
tunneTervehdys: { tunne: 'utelias', voimakkuus: 0.5 }
tunneLoyto: { tunne: 'ilo', voimakkuus: 0.7 }
tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 }
tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 }
```

## 1873-fakta ja lähteet

Marseillen Foire aux santons -messut perustettiin vuonna **1803**.
Isoisän matkavuonna 1873 (hän kirjoittaa matkakirjaansa "Marseille,
syyskuussa 1873") messu oli jo 70 vuotta vanha perinne, ja santonien
valmistus itsessään oli tuolloinkin jo tuttu käsityö: marseillelainen
Jean-Louis Lagnel keksi kipsimuotit savihahmojen valmistukseen vuonna
1798.

Lähteet (tarkistettu 22.9.2026, WebSearch/WebFetch):
- [Foire aux santons – Wikipédia (ranska)](https://fr.wikipedia.org/wiki/Foire_aux_santons)
- [Foire aux santons et santonniers à Marseille – marseille-tourisme.com](https://www.marseille-tourisme.com/en/vivez-marseille/blog-marseille/santon-fair-and-santon-makers-in-marseille/)

## Olemassa olevat Marseille-kuvakonseptit (ristiriitatarkistus)

- `docs/kuvatuotanto-kohtaamiset.md` rivi 90: Baptiste-tyylikoe.
  **Varattu kokonaan kaaren omaan kohtaamiseen.**
- Ei olemassa olevaa kuvaa santontekijä Rosinelle — uusi tilaus.

## Kuvatarve: uusi tilaus Codexille

> **Marseille — santontekijä Rosine.** Ranskalainen (provencelainen)
> nainen, noin 40–55-vuotias. Paikka: pieni santonverstas — puinen
> työpöytä täynnä pieniä keskeneräisiä savihahmoja — **ei Vieux-Portia,
> ei venettä, ei Notre-Dame de la Gardea eikä saippuaa näkyvissä**.
> Kesken aidon tekemisen: maalaamassa savihahmon kasvoja. Valo/sää:
> syksyinen iltapäivä. Rajaus enintään puolivartalo. **Ei näytetä:**
> satamaa, venettä, verkkoa tai Ifin saarta, ei Notre-Dame de la
> Gardea, ei saippuaa.

---

# Kohtaaminen erä C6: Kiova

Sisältökirjuri-sessio, 22.9.2026. Sisällöntuotantoa `docs/raportit/`-tiedostoon
Fablen/Sisältökirjurin tarkastettavaksi — `js/packs/kohtaamiset.js`-,
`js/kohtaamiskuvat-data.js`- eikä `js/tyohuone-kehitys-data.js`-tiedostoja
**ei** ole muokattu.

## RISTIRIITATARKISTUS ENSIN

Kiovalla on jo tarinakaari. Kaaren oma `henkilo`-kenttä:

> "Näyttelymestari Danylo järjestää Kultaisen portin museon
> dokumentointia ja erottaa vanhat muurijäänteet myöhemmistä
> rekonstruktioista."

Ei olemassa olevaa kuvaa Danylolle eikä millekään muulle Kiova-hahmolle.

**Lehti-/sisältötarkistus:** Kiovan laattakysymykset ja lehtitekstit
kattavat jo Petšerskin luostarin luolat, Kiovan Rusin ja kobzari Ostap
Veresain vuoden 1873 vierailun.

**Johtopäätös:** Danylo, Kultainen portti ja arkeologinen dokumentointi
ovat kokonaan varattuja kaaren omaan kohtaamiseen, eikä Petšerskin
luostaria tai Kiovan Rusia pidä nostaa tämän rivin keskiöön. Kirjoitin
kokonaan uuden hahmon: **sillanvartija Oksana** Dneprin ketjusillalla.

## Kiova — sillanvartija Oksana

**hahmo:** `'sillanvartija Oksana'`

**nappi:** `'Tapaa Oksana'`

**frame:** `'Oksana nostaa katseensa vartijakirjasta ja kysyy'`

**tervehdys** (276 merkkiä, raja ~280):
`'Oksana laskee ketjun renkaita vasten vartijakirjaa Dneprin sillalla: "Isoisäsi aikaan tämä oli koko Euroopan suurin riippusilta — hän kulki juuri näiden ketjujen alla kaupunkiin. Näytä että tunnet maailmaa kuten piirtäjä — niin lasken sinullekin, monesko rengas pettää ensin."'`

**tervehdysLuenta:**
```js
[
  { rooli: 'kertoja', teksti: 'Oksana laskee ketjun renkaita vasten '
    + 'vartijakirjaa Dneprin sillalla:' },
  { rooli: 'hahmo', teksti: '[curious] "Isoisäsi aikaan tämä oli koko '
    + 'Euroopan suurin riippusilta — hän kulki juuri näiden ketjujen '
    + 'alla kaupunkiin. [warmly] Näytä että tunnet maailmaa kuten '
    + 'piirtäjä — niin lasken sinullekin, monesko rengas pettää '
    + 'ensin."' },
]
```

**loyto** (123 merkkiä, raja 130):
`'Oksana nostaa rasian ketjupylvään juurelta: "Tämä ei ole minun laskukirjani väliin pudonnut — mutta merkitsen senkin ylös."'`

**loytoLuenta:**
```js
[
  { rooli: 'kertoja', teksti: 'Oksana nostaa rasian ketjupylvään '
    + 'juurelta:' },
  { rooli: 'hahmo', teksti: '[surprised] "Tämä ei ole minun '
    + 'laskukirjani väliin pudonnut — mutta merkitsen senkin ylös."' },
]
```

**tyhja** (117 merkkiä, raja 130):
`'Oksana koputtaa tyhjää pylvästä: "Tyhjä. Silta tärisee satojen askelten alla joka päivä — jokin siirtyy täällä aina."'`

**vaarin** (108 merkkiä, raja 130):
`'Oksana katsoo listaansa uudelleen: "Ei vielä. Ketjukin lasketaan kolmesti ennen kuin luku kirjataan oikein."'`

**tunnetagit:**
```js
tunneTervehdys: { tunne: 'utelias', voimakkuus: 0.5 }
tunneLoyto: { tunne: 'ilo', voimakkuus: 0.7 }
tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 }
tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 }
```

## 1873-fakta ja lähteet

Tsaari Nikolai I tilasi vuonna 1846 brittiläis-irlantilaiselta
insinööriltä Charles Blacker Vignolesilta pysyvän sillan Dneprin yli
Kiovaan. **Nikolain ketjusilta valmistui vuonna 1853** — 776 metriä
pitkä, ja rakennusaikanaan koko Euroopan suurin (ensimmäinen
monijänteinen) riippusilta. Isoisän matkavuonna 1873 silta oli siis jo
kaksikymmentä vuotta vanha, vakiintunut osa kaupunkiin saapumista.

Lähteet (tarkistettu 22.9.2026, WebSearch):
- [Nicholas Chain Bridge – Wikipedia](https://en.wikipedia.org/wiki/Nicholas_Chain_Bridge)
- [Nicholas Chain Bridge (Kyiv, 1853) – Structurae](https://structurae.net/en/structures/nicholas-chain-bridge)

Huom. varovaisuudesta: fakta pysyy tiukasti vuoden 1853–1873
insinööritiedossa. Sillan myöhempi tuho vuonna 1920 mainitaan
lähteissä, mutta ei ole otettu mukaan kohtaamistekstiin — ei viittausta
nykypolitiikkaan tai -konfliktiin missään kohdassa.

## Olemassa olevat Kiova-kuvakonseptit (ristiriitatarkistus)

- Ei yhtään riviä millekään Kiova-hahmolle.
- Ei olemassa olevaa kuvaa sillanvartija Oksanalle — uusi tilaus.

## Kuvatarve: uusi tilaus Codexille

> **Kiova — sillanvartija Oksana.** Ukrainalainen nainen, noin
> 40–55-vuotias. Paikka: Dneprin ketjusillan kiovanpuoleinen sillanpää
> — massiiviset rautaiset ketjut ja kivinen pylväs — **ei Kultaista
> porttia, ei museorakennusta eikä muurijäänteitä näkyvissä**. Kesken
> aidon tekemisen: nojaa avonaiseen vartijakirjaan, sormi ketjun
> renkaalla. Valo/sää: aamuinen kevätvalo. Rajaus enintään
> puolivartalo. **Ei näytetä:** vartijakirjan tekstiä luettavana, ei
> Kultaista porttia, ei luostaria, kirkkoa tai muuta tunnistettavaa
> Kiova-maamerkkiä.

---

# Kohtaaminen erä C6: Luxemburg

Sisältökirjuri-sessio, 22.9.2026. Sisällöntuotantoa `docs/raportit/`-tiedostoon
Fablen/Sisältökirjurin tarkastettavaksi — `js/packs/kohtaamiset.js`-,
`js/kohtaamiskuvat-data.js`- eikä `js/tyohuone-kehitys-data.js`-tiedostoja
**ei** ole muokattu.

## RISTIRIITATARKISTUS ENSIN

Ei yhtään osumaa kolmesta tiedostosta. Luxemburgilla ei siis ole
tarinakaarta, ei olemassa olevaa kohtaamiskuvaa eikä dokumentaatioriviä
— puhdas kaupunki.

## Luxemburg — kivenhakkaaja Nic

**hahmo:** `'kivenhakkaaja Nic'`

**nappi:** `'Tapaa Nic'`

**frame:** `'Nic pysäyttää talttansa kesken lyönnin ja kysyy'`

**tervehdys** (273 merkkiä, raja ~280):
`'Nic pysäyttää talttansa ja osoittaa muurinrippeitä ympärillään: "Nämä vallit purettiin kuusi vuotta sitten — kymmenen jää vielä, ennen kuin koko linnoitus on poissa. Näytä että tunnet maailmaa kuten piirtäjä — niin annan sinulle kiven, joka piti sitä pystyssä vuosisatoja."'`

**tervehdysLuenta:**
```js
[
  { rooli: 'kertoja', teksti: 'Nic pysäyttää talttansa ja osoittaa '
    + 'muurinrippeitä ympärillään:' },
  { rooli: 'hahmo', teksti: '[curious] "Nämä vallit purettiin kuusi '
    + 'vuotta sitten — kymmenen jää vielä, ennen kuin koko linnoitus '
    + 'on poissa. [warmly] Näytä että tunnet maailmaa kuten piirtäjä '
    + '— niin annan sinulle kiven, joka piti sitä pystyssä '
    + 'vuosisatoja."' },
]
```

**loyto** (105 merkkiä, raja 130):
`'Nic nostaa rasian irtokiven takaa: "Tämä ei ole purkujätettä — joku on kätkenyt tämän tänne ennen minua."'`

**loytoLuenta:**
```js
[
  { rooli: 'kertoja', teksti: 'Nic nostaa rasian irtokiven takaa:' },
  { rooli: 'hahmo', teksti: '[surprised] "Tämä ei ole purkujätettä — '
    + 'joku on kätkenyt tämän tänne ennen minua."' },
]
```

**tyhja** (92 merkkiä, raja 130):
`'Nic potkaisee soraa syrjään: "Tyhjä. Täältä on kannettu kiveä pois joka päivä kuusi vuotta."'`

**vaarin** (103 merkkiä, raja 130):
`'Nic jatkaa talttausta katsomatta ylös: "Ei vielä. Kivi ei liiku, ennen kuin isku osuu oikeaan kohtaan."'`

**tunnetagit:**
```js
tunneTervehdys: { tunne: 'utelias', voimakkuus: 0.5 }
tunneLoyto: { tunne: 'ilo', voimakkuus: 0.7 }
tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 }
tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 }
```

## 1873-fakta ja lähteet

Vuoden 1867 Lontoon sopimus määräsi Luxemburgin linnoituksen
purettavaksi. Purkutyö kesti **16 vuotta, vuodesta 1867 vuoteen 1883**.
Isoisän matkavuonna 1873 purkutyö oli siis puolivälin tienoilla:
kuusi vuotta takana, kymmenen vielä edessä.

Lähteet (tarkistettu 22.9.2026, WebSearch/WebFetch):
- [Fortress of Luxembourg – Wikipedia](https://en.wikipedia.org/wiki/Fortress_of_Luxembourg)
- [Treaty of London (1867) – Military Wiki](https://military-history.fandom.com/wiki/Treaty_of_London_(1867))

## Olemassa olevat Luxemburg-kuvakonseptit (ristiriitatarkistus)

- Ei yhtään riviä millään tiedostolla.
- Ei olemassa olevaa kuvaa kivenhakkaaja Nicille — uusi tilaus.

## Kuvatarve: uusi tilaus Codexille

> **Luxemburg — kivenhakkaaja Nic.** Luxemburgilainen mies, noin 30–45-
> vuotias. Paikka: puretun linnoitusmuurin reuna — irtokivikasoja,
> osittain revitty vanha muuri — **ei nykyaikaisia siltoja, ei
> tunnistettavia katedraalin tai palatsin torneja etualalla**. Kesken
> aidon tekemisen: taltta yhtä iskua vaille pysähtyneenä. Valo/sää:
> syksyinen iltapäivä, pölyinen, harmaa valo. Rajaus enintään
> puolivartalo. **Ei näytetä:** rasian sisältöä, eikä mitään myöhemmän
> ajan rakennelmaa taustalla.

---

# Kohtaaminen erä C6: Riika

Sisältökirjuri-sessio, 22.9.2026. Sisällöntuotantoa `docs/raportit/`-tiedostoon
Fablen/Sisältökirjurin tarkastettavaksi — `js/packs/kohtaamiset.js`-,
`js/kohtaamiskuvat-data.js`- eikä `js/tyohuone-kehitys-data.js`-tiedostoja
**ei** ole muokattu. Kuudes kaupunki, korvaa Valletan (ks. lopussa oleva
"Valmisteltu, ei vielä kytketty" -osio).

## RISTIRIITATARKISTUS ENSIN

Riialla ON tarinakaari (`js/tyohuone-kehitys-data.js`, `KAARI_PAKETIT.kohteet`,
id `'riika'`). Kaaren oma `henkilo`-kenttä:

> "Kultaaja Ilze uudistaa tornikukkojen kultauksen, kun myrskyt ovat sen
> syöneet — sukunsa viidentenä."

Kultaaja Ilze, tornikukot ja kultaus ovat siis kiistatta varattuja
kaaren omaan kohtaamiseen. **Kuvatarkistus:** `js/kohtaamiskuvat-data.js`
rivillä 421 on `riika-ilze-kultalehti` — sama Ilze, molemmissa
kultalehti, kultaustyö ja torninkukko — myös varattu kaarelle.

**Toinen, ERI Ilze samassa tiedostossa:** `js/packs/fokusvirta-riika.js`
sisältää Riian fokusvirran oman, kaaresta erillisen kevyen
kohtaamisjärjestelmän, jonka hahmo on **"Apteekkari Ilze"** (apteekkivihko,
ilmanpaine/lämpötila, sairaan lapsen valvominen) — jo toinen, samanniminen
mutta eri ammatin ja tarinan Ilze samassa kaupungissa. Nimeä "Ilze" ei
siis käytetä kolmatta kertaa, ja aiheet apteekki/vihko/ilmanpaine sekä
tornikukot/kultaus/myrsky on molemmat vältetty.

**Lehti-/maalehtitarkistus:** kaupunkilehti ja maalehti kattavat jo
laajasti laulujuhlat, musta balsami -juoman, Riian jugend-arkkitehtuurin,
zeppelin-hallit, Kissatalon kissat, Kuramaan siirtomaat, Kuldīgan
putouksen ja Kolkan niemen. Yksikään näistä ei toistu tässä
kohtaamisessa.

**Johtopäätös:** kirjoitin kokonaan uuden hahmon, uudella nimellä,
ammatilla, paikalla ja isoisä-koukulla: **sillanrahastaja Valdis**
Daugava-joen kelluvalla sillalla, rinnallaan vasta puoli vuotta aiemmin
avattu rautatiesilta.

## Riika — sillanrahastaja Valdis

**hahmo:** `'sillanrahastaja Valdis'`

**nappi:** `'Tapaa Valdis'`

**frame:** `'Valdis pysäyttää rahastuslaatikkonsa kannen ja kysyy'`

**tervehdys** (265 merkkiä, raja ~280) — KORJATTU 22.9.2026 Fablen
pyynnöstä: tarkka päivämäärä (1.1.1873) ei löytänyt kahdesta
riippumattomasta lähteestä (Wikipedia-artikkelit "Railway Bridge, Riga"
ja "Iron Bridge, Riga" mainitsevat vain rakennusvuodet 1871–1872, ei
avauspäivää; kolmas lähde antoi ristiriitaisen linjan nimen). Muotoiltu
varovaisemmin ilman kuukautta:
`'Valdis pysäyttää rahastuslaatikkonsa kannen: "Tuo rautasilta kantoi ensimmäisen junansa vasta äskettäin — minun siltani on kannattanut kärryjä jo isäni isän ajoista. Näytä että tunnet maailmaa kuten piirtäjä — niin näytän, mikä laudan alle on jäänyt vuosikausiksi."'`

**tervehdysLuenta:**
```js
[
  { rooli: 'kertoja', teksti: 'Valdis pysäyttää rahastuslaatikkonsa '
    + 'kannen:' },
  { rooli: 'hahmo', teksti: '[curious] "Tuo rautasilta kantoi '
    + 'ensimmäisen junansa vasta äskettäin — minun siltani on '
    + 'kannattanut kärryjä jo isäni isän ajoista. [warmly] Näytä että '
    + 'tunnet maailmaa kuten piirtäjä — niin näytän, mikä laudan alle '
    + 'on jäänyt vuosikausiksi."' },
]
```

**loyto** (123 merkkiä, raja 130):
`'Valdis nostaa rasian sillan lautojen raosta: "Tämä ei ole tullimaksu eikä hukkunut nappi — tämä on jäänyt tänne tahallaan."'`

**loytoLuenta:**
```js
[
  { rooli: 'kertoja', teksti: 'Valdis nostaa rasian sillan lautojen '
    + 'raosta:' },
  { rooli: 'hahmo', teksti: '[surprised] "Tämä ei ole tullimaksu eikä '
    + 'hukkunut nappi — tämä on jäänyt tänne tahallaan."' },
]
```

**tyhja** (119 merkkiä, raja 130):
`'Valdis koputtaa tyhjää lautarakoa: "Tyhjä. Silta puretaan joka syksy jäiden tieltä — kaikki irtonainen katoaa silloin."'`

**vaarin** (102 merkkiä, raja 130):
`'Valdis laskee kolikot takaisin laatikkoon: "Ei vielä. Silta kestää vain, kun luku on laskettu oikein."'`

**tunnetagit:**
```js
tunneTervehdys: { tunne: 'utelias', voimakkuus: 0.5 }
tunneLoyto: { tunne: 'ilo', voimakkuus: 0.7 }
tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 }
tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 }
```

## 1873-fakta ja lähteet

**KORJATTU 22.9.2026** (Fablen pyynnöstä toisen tarkistuksen jälkeen):
alkuperäinen raportti väitti tarkkaa avauspäivää 1.1.1873, mutta
kaksi Wikipedia-lähdettä ("Railway Bridge, Riga" ja "Iron Bridge, Riga")
mainitsevat itse artikkelitekstissä vain rakennusvuodet, eivät
avauspäivää, ja kolmas (ei-Wikipedia) lähde, josta päivämäärä oli
peräisin, nimesi väärän radan (Riika–Bolderāja, ei Riika–Jelgava) —
ristiriitainen eikä siis luotettava. Varmistettu, kahdella
riippumattomalla lähteellä tuettu fakta on:

Riian ensimmäinen pysyvä rautasilta Väinäjoen (Daugavan) yli —
rautatiesilta Riika–Jelgava-radalle — **rakennettiin vuosina
1871–1872**. Isoisän heinäkuun 1873 käynnin aikaan silta oli siis
vasta äskettäin valmistunut, korkeintaan pari vuotta vanha. Ennen
tätä ja vielä sen rinnalla Riiassa kulki pitkään perinteinen kelluva
ponttonisilta ("bridge of boats"), joka kannatteli tavallista kärry-
ja jalankulkuliikennettä.

Lähteet (tarkistettu 22.9.2026, WebFetch, molemmat artikkelit luettu
suoraan):
- [Railway Bridge, Riga – Wikipedia](https://en.wikipedia.org/wiki/Railway_Bridge,_Riga)
  ("erected in 1871–1872 for the Riga–Jelgava Railway")
- [Iron Bridge, Riga – Wikipedia](https://en.wikipedia.org/wiki/Iron_Bridge,_Riga)
  ("built in 1871–72")
- [Pontoon Bridge (Riga) – Wikidata](https://www.wikidata.org/wiki/Q25553955)

Huom. varovaisuudesta: en väitä tekstissä, että uusi rautatiesilta olisi
korvannut kelluvan sillan tai uhannut Valdisin toimeentuloa — lähteet
eivät vahvista syy-seuraussuhdetta, vain kahden erityyppisen sillan
samanaikaisen olemassaolon. Tervehdyksestä on nyt poistettu tarkka
kuukausi ("äskettäin" korvaa "tammikuussa"), koska sitä ei voitu
vahvistaa kahdesta riippumattomasta lähteestä.

## Olemassa olevat Riika-kuvakonseptit (ristiriitatarkistus)

- `riika-ilze-kultalehti` (hahmo Ilze, kultalehti leijumassa).
  **Varattu kokonaan kaaren omaan kohtaamiseen.**
- Ei olemassa olevaa kuvaa sillanrahastaja Valdisille — uusi tilaus.

## Kuvatarve: uusi tilaus Codexille

> **Riika — sillanrahastaja Valdis.** Latvialainen mies, noin 45–60-
> vuotias. Paikka: Daugavan kelluvan (ponttoni-) sillan kansi,
> puulankkuja ja köysiä, taustalla joen toisella rannalla siintää
> uuden rautatiesillan rautarakenne kaukana — **ei Riian tuomiokirkkoa,
> ei Pyhän Pietarin kirkkoa, ei Kolmea veljestä, ei Vapaudenpatsasta
> eikä Mustapäiden taloa näkyvissä lähikuvassa**. Kesken aidon
> tekemisen: kämmenessä muutama kolikko, toinen käsi rahastuslaatikon
> kannella. Valo/sää: heinäkuinen aamu, joelta nouseva kevyt usva.
> Rajaus enintään puolivartalo. **Ei näytetä:** rasian sisältöä, junaa
> tai veturia lähikuvassa, eikä mitään tekstiä tai numeroa, joka voisi
> vihjata kysymyksen vastaukseen.

---

# Valmisteltu, ei vielä kytketty: Valletta — teatterin lipunmyyjä Rita

**Fablen päätös 22.9.2026:** Valletta ei tähän erään — kohtaamiskortit
ovat kevyissä fokusvirroissa pois käytöstä, eikä sisältöä saa jättää
dataan kytkemättömänä. Teksti säilytetään tässä valmiina siihen asti,
kun Valletta saa täyden fokusvirtapinon (kaupunkilehden sivut, täky,
oppitunti). EI kirjoiteta js/packs/kohtaamiset.js:ään tässä erässä.

Sisältökirjuri-sessio, 22.9.2026. Sisällöntuotantoa `docs/raportit/`-tiedostoon
Fablen/Sisältökirjurin tarkastettavaksi — `js/packs/kohtaamiset.js`-,
`js/kohtaamiskuvat-data.js`- eikä `js/tyohuone-kehitys-data.js`-tiedostoja
**ei** ole muokattu.

## RISTIRIITATARKISTUS ENSIN

Ei yhtään osumaa. Vallettalla ei ole tarinakaarta, olemassa olevaa
kohtaamiskuvaa eikä dokumentaatioriviä.

**Maltan nostotaso:** todellinen tilanne (`js/packs/hahmotelma-mlt.js`):
Valletta ja Sininen luola/Blue Grotto ovat KAKSI ERI, RINNAKKAISTA
nostoa saman maapaketin sisällä — Blue Grotto ei ole korvannut
Valettaa. `js/muutokset.js` vahvistaa Vallettan olevan Maltan
pelikaupunki. Ei siis ristiriitaa.

**TÄRKEÄ RAKENNEHAVAINTO (koskee ajoitusta, ei sisältöä):** Valletta
on tällä hetkellä `KEVYET_FOKUSVIRRAT`-joukossa yhdessä Brysselin,
Ljubljanan, Košicen ja Luxemburgin kanssa. Kevyillä pakeilla kortit
ovat pois käytöstä (`FOKUSVIRTA_KORTIT === false`), joten täkyjä,
oppituntia, **kohtaamista** ja lehtitehtäviä ei ole kirjoitettu.
`js/packs/fokusvirta-valletta.js` sisältää siis vain matkakirjan ja
Livian kuplan — ei täyttä kaupunkilehteä. Tämä kohtaaminen on siis
valmisteltua sisältöä tulevaa täyttä pakkia varten — skeema ja
rakennesääntö pätevät sellaisenaan, mutta itse "Tapaa henkilö" -nappi
ei näy pelissä ennen kuin Valletta saa täyden fokusvirtapinon. Ei
ristiriita, vaan aikataulukysymys.

**Faktapäällekkäisyydet vältetty:** fokusvirran (kalkkikivi, Grand
Harbour, ritarikunnan muurit) ja maalehden noston (peruskivi 1566,
Pyhän Johanneksen konkatedraali, Britannian haltuunotto 1800,
linnoitusten purkamisehdotukset) aiheet on kaikki vältetty. Valittu
aihe: **Vallettan kuninkaallisen oopperatalon tulipalo 25.5.1873**.

## Valletta — teatterin lipunmyyjä Rita

**hahmo:** `'teatterin lipunmyyjä Rita'`

**nappi:** `'Tapaa Rita'`

**frame:** `'Rita avaa lippukopin luukun ja kysyy'`

**tervehdys** (243 merkkiä, raja ~280):
`'Rita nojaa lippukoppiin vanhan oopperatalon paikalla: "Isoisäsi käyntivuonna talo oli juuri palanut sisältä tyhjäksi — se pysyi kiinni lähes viisi vuotta. Näytä että tunnet maailmaa kuten piirtäjä — niin kerron, mistä liekit silloin lähtivät."'`

**tervehdysLuenta:**
```js
[
  { rooli: 'kertoja', teksti: 'Rita nojaa lippukoppiin vanhan '
    + 'oopperatalon paikalla:' },
  { rooli: 'hahmo', teksti: '[curious] "Isoisäsi käyntivuonna talo oli '
    + 'juuri palanut sisältä tyhjäksi — se pysyi kiinni lähes viisi '
    + 'vuotta. [warmly] Näytä että tunnet maailmaa kuten piirtäjä — '
    + 'niin kerron, mistä liekit silloin lähtivät."' },
]
```

**loyto** (117 merkkiä, raja 130):
`'Rita nostaa rasian lippukopin lattian raosta: "Tämä ei ole palon jälkeä. Joku on piilottanut tämän paljon myöhemmin."'`

**loytoLuenta:**
```js
[
  { rooli: 'kertoja', teksti: 'Rita nostaa rasian lippukopin lattian '
    + 'raosta:' },
  { rooli: 'hahmo', teksti: '[surprised] "Tämä ei ole palon jälkeä. '
    + 'Joku on piilottanut tämän paljon myöhemmin."' },
]
```

**tyhja** (110 merkkiä, raja 130):
`'Rita koputtaa tyhjää rakoa vanhassa muurissa: "Tyhjä. Tätä paikkaa on rakennettu uudelleen niin monta kertaa."'`

**vaarin** (94 merkkiä, raja 130):
`'Rita sulkee luukun hetkeksi: "Ei vielä. Esitys alkaa vasta illalla — ehdit yrittää uudelleen."'`

**tunnetagit:**
```js
tunneTervehdys: { tunne: 'utelias', voimakkuus: 0.5 }
tunneLoyto: { tunne: 'ilo', voimakkuus: 0.7 }
tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 }
tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 }
```

## 1873-fakta ja lähteet

Vallettan kuninkaallinen oopperatalo suunniteltiin arkkitehti Edward
Middleton Barryn toimesta ja avattiin 9.10.1866. **25.5.1873 —
isoisän matkavuonna, vain kuukausia ennen hänen syyskuun käyntiään
Vallettassa — rakennuksessa syttyi tulipalo.** Sisätilat tuhoutuivat
pahoin, ja teatteri pysyi suljettuna lähes neljä ja puoli vuotta,
avautuen uudelleen vasta 11.10.1877. Syyskuussa 1873 Vallettassa
käydessään isoisä ei siis olisi voinut nähdä yhtään esitystä siellä.

Lähteet (tarkistettu 22.9.2026, WebSearch/WebFetch):
- [Royal Opera House, Valletta – Wikipedia](https://en.wikipedia.org/wiki/Royal_Opera_House,_Valletta)
- [The Royal Opera House in Valletta – whitemad.pl](https://www.whitemad.pl/en/the-royal-opera-house-in-valletta-a-gem-that-was-never-rebuilt/)

## Olemassa olevat Valletta-kuvakonseptit (ristiriitatarkistus)

- Ei yhtään riviä `js/kohtaamiskuvat-data.js`:ssä eikä
  `docs/kuvatuotanto-kohtaamiset.md`:ssä.
- `js/packs/hahmotelma-mlt.js` sisältää kaksi olemassa olevaa Valletta-
  nostokuvaa — kumpikaan ei liity oopperataloon eikä ole vapaa
  käytettäväksi tähän.
- Ei olemassa olevaa kuvaa teatterin lipunmyyjä Ritalle — uusi tilaus.

## Kuvatarve: uusi tilaus Codexille

> **Valletta — teatterin lipunmyyjä Rita.** Maltalainen nainen, noin
> 40–55-vuotias. Paikka: Pjazza Teatru Rjalin pieni lippukoppi —
> **ei St. Johanneksen konkatedraalia, ei Grand Harbouria, ei
> Triton-suihkulähdettä eikä muita Vallettan maamerkkejä
> tunnistettavina**. Kesken aidon tekemisen: nojaa avoimeen
> lippuluukkuun. Valo/sää: iltapäivän lämmin, kultainen Välimeren
> valo. Rajaus enintään puolivartalo. **Ei näytetä:** itse tulipaloa
> tai liekkejä missään muodossa, ei sotapommitusten jälkiä tai
> raunioita pääaiheena, ei lipun tekstiä luettavana.

---

valmis
