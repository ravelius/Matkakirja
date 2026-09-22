# Budapest — kylpylänvartija Márta

**hahmo:** "kylpylänvartija Márta"
**nappi:** "Tapaa Márta"
**frame:** "Márta nojaa kylpylän porttiin ja kysyy"
**tervehdys:** "Márta nojaa Széchenyin kylpylän porttiin sulkemisaikaan, kädet puuskassa: \"Isoisäsi kirja puhuu varmaan Budasta ja Pestistä kahtena eri kaupunkina. Näytä että tunnet maailmaa kuten piirtäjä — niin kerron, milloin niistä tuli yksi.\"" (231 merkkiä)
**tervehdysLuenta:**
```
[
  { rooli: 'kertoja', teksti: 'Márta nojaa Széchenyin kylpylän porttiin '
    + 'sulkemisaikaan, kädet puuskassa:' },
  { rooli: 'hahmo', teksti: '[curious] "Isoisäsi kirja puhuu varmaan '
    + 'Budasta ja Pestistä kahtena eri kaupunkina. [warmly] Näytä että '
    + 'tunnet maailmaa kuten piirtäjä — niin kerron, milloin niistä tuli '
    + 'yksi."' },
]
```
**loyto:** "Márta ojentaa rasian höyryn läpi: \"Tämä lojui kylpylän kellarissa vuosikymmeniä. Kolme kaupunkia, yksi rasia — sopivaa, eikö?\"" (126 merkkiä)
**loytoLuenta:**
```
[
  { rooli: 'kertoja', teksti: 'Márta ojentaa rasian höyryn läpi:' },
  { rooli: 'hahmo', teksti: '[warmly] "Tämä lojui kylpylän kellarissa '
    + 'vuosikymmeniä. [excited] Kolme kaupunkia, yksi rasia — sopivaa, '
    + 'eikö?"' },
]
```
**tyhja:** "Márta pudistaa päätään altaan reunalla: \"Tyhjä. Kylpylää on remontoitu niin monesti, ettei mikään pysy paikallaan.\"" (115 merkkiä)
**vaarin:** "Márta virnistää ja ravistaa vettä käsistään: \"Ei vielä. Höyry hämärtää näön — kokeile toista kulmaa.\"" (101 merkkiä)
**tunnetagit:**
```
tunneTervehdys: { tunne: 'utelias', voimakkuus: 0.55 }  // Márta testaa tulijaa kädet puuskassa ja virnistäen — sama uteliaan haastava rekisterin poikkeus kuin Leilalla/Colettella, ei vielä lämmin
tunneLoyto: { tunne: 'ilo', voimakkuus: 0.7 }
tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 }
tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 }
```

**1873-fakta ja lähde:** Budapest syntyi virallisesti 17.11.1873, kun kolme erillistä kaupunkia — Buda, Pest ja Óbuda — yhdistettiin yhdeksi kaupungiksi. Tämä on täsmälleen isoisän matkavuosi 1873, joten isoisän päiväkirjassa kaupungit esiintyvät todennäköisesti vielä erillisinä (Buda ja Pest), mikä antaa luontevan kontrastin Mártan repliikille. Lähde: en-Wikipedia "Budapest" (Formation-osio) ja "History of Budapest" (Unification 1873) — yleisesti tunnettu, laajasti dokumentoitu päivämäärä; ei suoraa web-hakua tehty tässä ajossa, koska fakta on vakiintunut ja yksiselitteinen, mutta suosittelen QA-sessiolle pikaa varmistusta ennen tuotantoon vientiä.

**Olemassa olevat Budapest-kuvakonseptit (ristiriitatarkistus):**

`js/kohtaamiskuvat-data.js`:sta löytyi KAKSI Budapest-riviä:

1. `budapest-aiti-tytar-smoothie` — hahmo "Äiti ja tytär", kauppakeskuksen lasiatrium, smoothiehetki, tila `tarkistettu`, **`aktiivinen: false`** (nimenomaisesti pois pelistä).
2. `budapest-marta-kylpyla-a` — hahmo "Márta", Széchenyin kylpylä, sininen iltavalo, kädet puuskassa, virne, tila `tarkistettu`, **ei `aktiivinen`-kenttää lainkaan** (eli oletuksena `aktiivinen !== false` — pelin oma sääntö js/kohtaamiskuvat-data.js:n rivillä 15: "VAIN TILA 'tarkistettu' JA aktiivinen !== false PÄÄTYY PELIIN").

Näiden vertailun perusteella **Márta/kylpylä on se, jota peli oikeasti käyttäisi** — äiti-tytär-smoothie-konsepti on aktiivisesti poistettu käytöstä.

Lisäksi `docs/kuvatuotanto-kohtaamiset.md`:n taulukossa (rivi "Budapest") on KOLMAS, ristiriitainen kuvaus: *"Márta ja aikuinen tytär Réka juovat smoothieita modernissa lasiatriumissa"* — tämä sekoittaa Mártan nimen (kuuluu kylpylä-konseptiin) ja smoothie/atrium-yksityiskohdat (kuuluvat äiti-tytär-konseptiin) yhteen olemattomaan kolmanteen hahmoon "Réka". Tätä taulukkoriviä ei pidä käyttää sellaisenaan — se on dokumentaatiovirhe, ei kolmas aito konsepti.

**Kohtaaminen on kirjoitettu YKSINOMAAN Mártan/kylpylän mukaan** (ei smoothie/atrium-yksityiskohtia, ei tytärtä/Rékaa).

**Kuva:** olemassa oleva — `budapest-marta-kylpyla-a` (`tiedosto: 'kasvo-budapest-marta-kylpyla-a.jpg'`, `js/kohtaamiskuvat-data.js` rivi 216). Kuva sopii tekstiin suoraan: Széchenyin kylpylä, sininen iltavalo, kädet puuskassa, virne — sama hetki kuin tervehdyksessä. Ei tarvetta uudelle kuvatilaukselle.

**Fablelle raportoitava ristiriita (lyhyesti):** docs/kuvatuotanto-kohtaamiset.md:n Budapest-rivi sekoittaa kaksi eri hyväksyttyä kuvakonseptia (Márta/kylpylä ja äiti-tytär/smoothie) yhdeksi olemattomaksi "Márta ja tytär Réka" -kuvaukseksi. Todellisuudessa toinen konsepti (äiti-tytär) on jo merkitty `aktiivinen: false` eli pois käytöstä, ja vain Márta/kylpylä on aktiivinen. Taulukkorivi kannattaa korjata tai poistaa, ettei se johda jatkossa harhaan.

valmis
