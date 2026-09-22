# Kohtaaminen: Helsinki (luonnos, ei vielä koodissa)

Tämä on sisällöntuotannon raportti, EI koodimuutos. `js/packs/kohtaamiset.js`
ei ole muokattu — helsinki-rivi lisätään sinne vasta Fablen hyväksynnän
jälkeen (sama rakenne kuin `lontoo`).

## Helsinki — telakkahitsaaja Saana

**hahmo:** "telakkahitsaaja Saana"

**nappi:** "Tapaa Saana"

**frame:** "telakkahitsaaja Saana nostaa visiirin ja kysyy"

**tervehdys:** "Saana nostaa hitsausvisiirin ja vilkaisee kirjaasi:
'Höyrylaiva Tähti rakennettiin tässä telakassa 1873. Minä hitsaan nyt
jäänmurtajaa samalla laiturilla. Näytä että tunnet maailmaa kuten
piirtäjä — niin kerron, minne se vanha laiva päätyi.'" (241 merkkiä)

**tervehdysLuenta:**
```
[
  { rooli: 'kertoja', teksti: 'Saana nostaa hitsausvisiirin ja vilkaisee '
    + 'kirjaasi:' },
  { rooli: 'hahmo', teksti: '[proud] "Höyrylaiva Tähti rakennettiin '
    + 'tässä telakassa 1873. [curious] Näytä että tunnet maailmaa kuten '
    + 'piirtäjä — niin kerron, minne se vanha laiva päätyi."' },
]
```

**loyto:** "Saana kaivaa rasian telakan arkistolaatikosta: 'Tämä on
odottanut täällä pidempään kuin minun jäänmurtajani.'" (109 merkkiä)

**loytoLuenta:**
```
[
  { rooli: 'kertoja', teksti: 'Saana kaivaa rasian telakan '
    + 'arkistolaatikosta:' },
  { rooli: 'hahmo', teksti: '[warmly] "Tämä on odottanut täällä '
    + 'pidempään kuin minun jäänmurtajani."' },
]
```

**tyhja:** "Saana katsoo tyhjää koloa laiturin alta: 'Ei mitään. Tätä
telakkaa on revitty ja rakennettu niin monesti.'" (106 merkkiä)

**vaarin:** "Saana tarttuu takaisin hitsauspoltittimeen: 'Ei vielä.
Sekin laiva vaati minulta monta yritystä.'" (97 merkkiä)

**tunnetagit:**
```
tunneTervehdys: { tunne: 'ylpea', voimakkuus: 0.5 }
  // Poikkeus rekisterin oletuksesta (utelias): Saana ei ole ensisijaisesti
  // utelias kirjasta vaan ylpeä työstään — hän rinnastaa oman
  // jäänmurtajansa suoraan 1873 rakennettuun höyrylaivaan samalla
  // laiturilla. Sama telakka, 150 vuotta väliä.
tunneLoyto: { tunne: 'ilo', voimakkuus: 0.7 }
  // Rekisterin oletus: löytö on pelin suuri hetki muissakin kaupungeissa.
tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 }
  // Rekisterin oletus: "Ei mitään" jää pohtimaan eikä moiti pelaajaa.
tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 }
  // Rekisterin oletus: väärä vastaus saa lohduttavan "Ei vielä" -sävyn.
```

**1873-fakta ja lähde:** Höyrylaiva **Tähti** rakennettiin vuonna 1873
Helsingin Hietalahden telakalla (silloin Helsingfors Skeppsdocka /
Hietalahden laivatelakka, perustettu 1865, ensimmäinen laiva
valmistui 1868). Sama telakka-alue on ollut yhtäjaksoisesti käytössä
laivanrakennukseen yli 160 vuotta, ja siellä on rakennettu muun muassa
merkittävä osa maailman toimivista jäänmurtajista — nykyään nimellä
Helsinki Shipyard. Lähteet (englanninkielinen Wikipedia, tarkistettu
tässä sessiossa 22.9.2026):
- "List of ships built at Hietalahti shipyard (1–200)" — Tähti,
  höyryvene, 1873.
- "Hietalahti shipyard" — perustettu 1865, ensimmäinen laiva 1868,
  nykyään osa Helsinki Shipyardia, rakentanut jäänmurtajia yli
  160 vuoden ajan samalla paikalla.

Huom: en löytänyt Tähti-laivasta tarkempia teknisiä yksityiskohtia
(esim. käyttötarkoitus, kohtalo) luotettavasta lähteestä tässä
sessiossa — tervehdyksen repliikki ("niin kerron, minne se vanha laiva
päätyi") jättää tarkoituksella auki, minne laiva päätyi, koska en voi
vahvistaa sitä. Jos Fable haluaa tarkemman kohtalon laivalle, se pitää
tarkistaa erikseen ennen kuin sitä väitetään pelissä.

**Kuvatilaus Codexille:**

Nainen, noin 30–35-vuotias, telakkahitsaaja Helsingin Hietalahdessa,
nykyaika. Yllä palonkestävä työhaalari (tummansininen/harmaa),
hihat käärittynä, kädessä paksut nahkakäsineet, hitsausvisiiri
nostettuna otsalle niin että kasvot näkyvät kokonaan. Hiukset
sidottu taakse huivilla tai lippalakilla suojan alla. Poskessa kevyt
noki-/pölytahra, kasvoilla hikeä — kesken aidon työn, ei poseeraa.
Toiminta: on juuri lopettanut hitsaussauman ja kääntynyt katsomaan
suoraan kameraan; toisessa kädessä hitsauspoltin roikkuu alaspäin,
hitsauskipinöitä vielä ilmassa/sammumassa taustalla. Kaksi
aikakerrosta samassa kuvassa: etualalla/taustalla moderni
jäänmurtajan tai suuren teräsrungon kylki telakalla (nykyaikaiset
telineet, valokaaren hohde), ja jossain kuvan reunalla vanha,
patinoitunut rautainen kiinnityspollari tai vanha puinen laiturin
paalu 1800-luvulta, joka on yhä käytössä samalla telakka-alueella —
ei irrallinen rekvisiitta vaan osa toimivaa satamaa. Ilme: ylpeä,
puoliksi huvittunut hymy, kun hän vertaa vanhaa kuvaa/piirrosta
(pelaajan kirjaa) omaan työhönsä — ei hämmästys vaan tunnistava
"tiedän tarkalleen mistä puhut" -katse suoraan objektiiviin. Valo/sää:
pilvinen Itämeren iltapäivä, telakkahallin avoimesta ovesta lankeava
kylmä, viileänsininen päivänvalo sekoittuu hitsauskaaren
oranssinkeltaiseen hehkuun kasvoilla — kontrastivalotus, tausta
pehmeämpi mutta telakka-alue vielä tunnistettava. Rajaus
puolivartalokuva. Ei kuvansisäistä tekstiä eikä logoja.

Valmis: ei valmis (odottaa Fablen tarkastusta ja hyväksyntää ennen
`js/packs/kohtaamiset.js`-riviä ja kuvatilauksen lähettämistä
Codexille).
