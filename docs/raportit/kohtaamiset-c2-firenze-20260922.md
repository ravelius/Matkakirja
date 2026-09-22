# Kohtaaminen Firenzelle (erä C2) — luonnos Fablen tarkastukseen

Sisältökirjuri, 22.9.2026. Ei olemassa olevaa kohtaamista eikä kuva-
konseptia löytynyt (grep js/kohtaamiskuvat-data.js ja
docs/kuvatuotanto-kohtaamiset.md — molemmat tyhjät Firenzen osalta),
joten hahmo on kokonaan uusi. `js/packs/kohtaamiset.js`:ää EI ole
muokattu — tämä on vain sisältöluonnos hyväksyntää varten, samaan
tapaan kuin C1-erän kuvatilausraportti.

## Firenze — kultaseppä Ilaria

**hahmo:** "kultaseppä Ilaria"
**nappi:** "Tapaa Ilaria"
**frame:** "Ilaria nostaa katseensa suurennuslasin takaa ja kysyy"
**tervehdys:** Ilaria nostaa katseensa suurennuslasin takaa: "Kirjasi mukaan tämä on yhä pääkaupunki — Rooma vei sen jo. Näytä että tunnet maailmaa kuten isoisäsi — niin kerron, mikä ikkunan takana ei ole muuttunut."
**tervehdysLuenta:**
```
[
  { rooli: 'kertoja', teksti: 'Ilaria nostaa katseensa suurennuslasin '
    + 'takaa:' },
  { rooli: 'hahmo', teksti: '[curious] "Kirjasi mukaan tämä on yhä '
    + 'pääkaupunki — Rooma vei sen jo. [warmly] Näytä että tunnet '
    + 'maailmaa kuten isoisäsi — niin kerron, mikä ikkunan takana ei '
    + 'ole muuttunut."' },
]
```
**loyto:** Ilaria pyyhkii rasian liinalla ennen kuin ojentaa sen: "Tämä on ollut lukossa kauemmin kuin minä olen elänyt. Nyt se aukeaa!"
**loytoLuenta:**
```
[
  { rooli: 'kertoja', teksti: 'Ilaria pyyhkii rasian liinalla ennen '
    + 'kuin ojentaa sen:' },
  { rooli: 'hahmo', teksti: '[softly] "Tämä on ollut lukossa kauemmin '
    + 'kuin minä olen elänyt. [excited] Nyt se aukeaa!"' },
]
```
**tyhja:** Ilaria kääntää vanhan laatikon ylösalaisin: "Tyhjä. Tässä työpajassa on siivottu satakunta kertaa isoisäni jälkeen."
**vaarin:** Ilaria laskee suurennuslasin pöydälle: "Ei vielä. Kulta ei paljasta itseään kiireessä, eikä tämäkään."
**tunnetagit:**
```
tunneTervehdys: { tunne: 'utelias', voimakkuus: 0.5 }  // rekisterin oletus — Ilaria on kiinnostunut kirjasta ja sen vanhentuneesta tiedosta, ei vielä lämmin eikä varautunut
tunneLoyto: { tunne: 'ilo', voimakkuus: 0.7 }
tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 }
tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 }
```

Merkkimäärät: tervehdys 201 (raja 280), loyto 125 (raja 130), tyhja
116 (raja 130), vaarin 102 (raja 130) — kaikki rajoissa.

**Hahmo ja paikka:** Ilaria on nuori kultaseppä, jonka perheen pieni
työpaja on yksi Ponte Vecchion "sporteista" — sillan 1500-luvulta
periytyvistä, joen ylle ulkonevista puukojuista, joihin kultasepät
asetettiin vuonna 1593 (Ferdinando I de' Medici häätämän lihakauppojen
tilalle). Kulma ei ole "käy Ponte Vecchiolla" -tason yleisyys vaan yksi
nimetön, konkreettinen putiikki sillan kyljessä, jonka ikkunasta näkyy
Arno.

**1873-fakta ja lähde:** Firenze oli Italian kuningaskunnan
väliaikainen pääkaupunki 1865–1871 (Torinon jälkeen); pääkaupunki-
asema siirtyi Roomaan heinäkuussa 1871 sen jälkeen kun Rooma oli
valloitettu ja liitetty Italiaan syyskuussa 1870. Isoisän 1873-
matkapäiväkirja siis kuvaa Firenzeä yhä ikään kuin se olisi
pääkaupunki, vaikka asema oli vaihtunut jo kaksi vuotta aiemmin —
tämä on suora esimerkki isoisän äänen "toivottomasta vanhenemisesta"
(docs/tarina.md, Kaksi ääntä), ei nuoren Foggin kommentti. Yleisesti
tunnettu ja helposti tarkistettava Italian yhdistymishistorian faktatieto
(Firenze pääkaupunkina, "Firenze capitale" -kausi).

**Olemassa oleva kuvamateriaali:** ei löytynyt. js/kohtaamiskuvat-
data.js ja docs/kuvatuotanto-kohtaamiset.md eivät sisällä Firenzeä;
tarvitaan uusi kuvatilaus.

**Kuvatilaus Codexille:**

Nainen, noin 28–34-vuotias, italialainen kultaseppä. Tumma, hieman
kihartuva olkapäänmittainen tukka sidottu löyhälle nutturalle, ohuet
kultakorvakorut, iho vaalean oliivinsävyinen. Yllään tummanvihreä tai
viininpunainen työessu paksun puuvillapaidan päällä, hihat
kyynärpäihin käärittynä; ranteessa nahkainen työhihna ja pieni
suurennuslasi (loupe) otsalla ylösnostettuna. Paikka: kapea,
puuseinäinen työpaja-koju rakennettu Ponte Vecchion vanhaan "sporttiin"
— joen ylle ulkonevaan puurakenteeseen — jossa on juuri ja juuri tilaa
pienelle työpöydälle ikkunan alla. Kaksi aikakerrosta: pöydällä
nykyaikainen LED-suurennuslamppu, kannettava vaaka ja tabletti
tilauskirjaa varten, kun taas ikkunan karmit, vanhat rautaiset
saranat ja patinoitunut puinen luukku ovat vuosisatoja vanhoja — ikkunan
takaa siintää Arno-joki ja vastarannan vanhat julkisivut. Kesken
aitoa tekemistä: hän on juuri nostanut hehkuvan kultalangan pihdeillä
liekin äärestä ja kääntää katseensa suoraan kameraan pihdit vielä
kädessä, toinen käsi vaistomaisesti suojaamassa liekkiä. Ilme
aarrekysymykseen: utelias, puoliksi huvittunut virne — tietävä
sivukatsahdus, joka lämpenee hymyksi. Valo: myöhäisiltapäivän lämmin
kultainen valo tulvii pienestä ikkunasta suoraan hänen kasvoilleen
ja työpöydälle, sekoittuu polttimen oranssiin hehkuun; joen suunnalta
tuleva viileämpi heijastusvalo pehmentää taustaa. Rajaus enintään
puolivartalo, ei kuvansisäistä tekstiä eikä logoa; rasian tai kätkön
tarkkaa sijaintia ei näytetä.

Valmis.
