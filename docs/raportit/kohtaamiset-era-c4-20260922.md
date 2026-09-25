# Kohtaamiset erä C4: seuraavat 6 eurooppalaista kaupunkia eniten nostoja (2026-09-22)

Sisältökirjuri (Sonnet), jatkoa erille C1–C3. Rajaus vahvistettu Fablelta:
vain Euroopan lauta on valmis, joten C4 = seuraavat 6 eurooppalaista
kaupunkia nostojen mukaan (js/packs/maakartat.js KAUPUNKIKARTAT) — muut
mantereet vasta kun niiden lauta tulee. Kirjoitettu Sonnet-parvella
(kuusi rinnakkaista agenttia, yksi per kaupunki):

| Kaupunki | Nostoja | Huomio |
| --- | ---: | --- |
| Tallinna | 9 | Kaaren opas Leena (raatihuoneen torni, vanhankaupungin päivät) varattu, ei olemassa olevaa kuvaa kummallekaan hahmolle. Uusi hahmo lyhdynsytyttäjä Miina. Isoisä-koukku: ensimmäinen kaasulyhty Tallinnassa 17.12.1865, siis ~8 vuotta vanha 1873. Uusi kuva tarpeen. |
| Vilna | 9 | Kaaren yövartija Rasa (rautainen susi, Gediminasin torni, yö) ja hänen kuvansa varattuja kaarelle. Uusi hahmo kirjansitoja Aldona, päiväsaikaan. Isoisä-koukku: 1873 kiristetty lehdistökielto (gootilainen kirjasin). Uusi kuva tarpeen. |
| Barcelona | 8 | Kaaren kirjansitoja Mercè (Sant Jordi, ruusut) ja hänen kuvansa varattuja kaarelle. Uusi hahmo kivenveistäjä Pau, katedraalin julkisivulla. Isoisä-koukku: nykyinen uusgoottilainen julkisivu valmistui vasta 1913, isoisä näki paljaan kiven. Uusi kuva tarpeen. |
| Praha | 8 | Kaaren lyhdynsytyttäjä Tomáš (kynttilät, museon kehys) ja MOLEMMAT olemassa olevat kuvaversiot varattuja kaarelle. Uusi hahmo kellonvartija Věra, Orloj-kellon koneistossa. Isoisä-koukku: apostolit/kukko/kalenterikiekko olivat 1873 vasta ~7-vuotiaita (1865–66 korjaus). Uusi kuva tarpeen. |
| Moskova | 8 | Kaaren kellonvalajan jälkeläinen Vera (Tsaarinkello, Kreml) ja hänen kuvansa varattuja kaarelle. Uusi hahmo lukkoseppä Stepan, GUM:n käytävässä. Isoisä-koukku: nykyinen GUM-rakennus valmistui vasta 1893, isoisä näki Bovén 1815 rivistön. Uusi kuva tarpeen. |
| Ljubljana | 8 | Ei kaarta, ei olemassa olevaa kuvaa — täysin puhdas kaupunki. Uusi hahmo kukkakauppias Vesna, Kolmisillan kupeessa. Isoisä-koukku: 1873 silta oli vielä yksiosainen, Plečnikin kaksi lisäsiltaa tulivat vasta 1931–32. Uusi kuva tarpeen. |

Rakenne sama kuin erät C1–C3. Ei vielä kirjoitettu js/packs/kohtaamiset.js:ään
— tarkastukseesi ensin.

## Läpikäyvät huomiot

1. Viisi kuudesta kaupungista on tarinakaarikaupunkeja (kaikki paitsi
   Ljubljana). Jokaisessa agentti tunnisti itsenäisesti kaaren varatun
   hahmon ja kuvan (js/tyohuone-kehitys-data.js KAARI_PAKETIT) ja
   kirjoitti tarkoituksella eri hahmon, ammatin, paikan ja motiivin —
   sama sääntö kuin aiemmissa erissä.
2. Praha-agentti tunnisti KAKSI olemassa olevaa kuvariviä samalle kaaren
   Tomáš-hahmolle (kehys-konsepti kahdessa tuotantokierroksessa) — kumpikaan
   ei kelpaa, molemmat varattu.
3. Kaikki inline-luentatagit tarkistettu englanniksi (ElevenLabs-sanasto).
   Luennoissa vain roolit 'kertoja' ja 'hahmo' — ei kertaakaan
   'pelaaja'-riviä (nuori Fogg ei puhu, docs/tarina.md 21.9.2026).
4. tunneLoyto/tunneTyhja/tunneVaarin täsmälleen rekisterin pakolliset
   arvot kaikissa kuudessa (ilo 0,7 / miettiva 0,45 / hämmentynyt 0,4).
   tunneTervehdys on kaikissa kuudessa 'utelias' 0,5 (rekisterin oletus).
5. Kaikki merkkimäärät alle rajojen (tervehdys ≤280, loyto/tyhja/vaarin
   ≤130). Vilnan tervehdys on rajan tuntumassa (279/280) — tarkistettu
   erikseen merkki kerrallaan datankirjoitusvaiheessa.
6. Kaikilla kuudella on tarkistettu, lähteillä varustettu 1873-fakta,
   eikä yksikään toista toisen kaupungin faktaa (Barcelona-agentti
   tarkisti erikseen, ettei toista Granadan C3-faktaa Espanjan
   tasavallasta). Kaikki kuusi tarvitsevat UUDEN kuvan Codexilta —
   tilausbriiffit valmiina jokaisen kaupungin omassa raportissa.
7. Yksikään uusi hahmo, paikka tai teema ei toista mitään aiempien
   erien tai tämän erän muiden kaupunkien hahmoa/teemaa.

---

# Kohtaaminen erä C4: Tallinna

Sisältökirjuri-sessio, 22.9.2026. Sisällöntuotantoa `docs/raportit/`-tiedostoon
Fablen/Sisältökirjurin tarkastettavaksi — `js/packs/kohtaamiset.js`-,
`js/kohtaamiskuvat-data.js`- ja `js/tyohuone-kehitys-data.js`-tiedostoja
**ei** ole muokattu.

## RISTIRIITATARKISTUS ENSIN

```
grep -n -i "tallinna\|leena" js/tyohuone-kehitys-data.js js/kohtaamiskuvat-data.js docs/kuvatuotanto-kohtaamiset.md
```

**1. Tallinnalla on jo tarinakaari** (`js/tyohuone-kehitys-data.js`,
`KAARI_PAKETIT.kohteet`, id `'tallinna'`, rivit 1961–2034). Kaaren oma
`henkilo`-kenttä (rivi 2009–2010):

> "Opas Leena luotsaa ryhmäänsä vanhankaupungin päivien tungoksessa ja
> tuntee raatihuoneen tornin tarinat."

Kaaren oma `kohtaaminen`-teksti (rivi 2011–2014) tapahtuu keskellä
vanhankaupungin päivien tungosta, ja `aarre`-teksti (rivi 2030–2033)
päättyy raatihuoneen tornin tasanteelle avattuun huoltoluukkuun. Tiedoston
oma kommentti (rivit 1973–2008) kertoo, että henkilö vaihdettiin oppaasta
"Evestä" oppaaksi "Leenaksi" 7.9.2026 kuvaputken palautteen jälkeen, ja
että kohtaaminen siirrettiin nimenomaan tornin kierreportaista
vanhankaupungin päivien tungokseen. `js/packs/kohtaamiset.js`:n oma
rakennesääntö (rivit 1–68, erityisesti "kaarikaupungissa VISAKORTIN
avaustekstin omistaa KAARI_PAKETIT:in oma kohtaaminen ENSIMMÄISELLÄ
visalla") ja jo tiedostossa olevat esimerkit (Rooma: kaari=Enzo
suihkulähteellä / tavallinen visa=mopokorjaaja Fabrizio) vahvistavat:
tämän raportin rivi on kaupungin **myöhempien tavallisten visojen** avaus,
ja sen hahmon on oltava Leenasta ERI hahmo, eri ammatti, eri paikka — ei
opas, ei raatihuoneen torni, ei vanhankaupungin päivien tungos.

**2. Kuvatarkistus:** `js/kohtaamiskuvat-data.js`:ssä ei ole yhtään riviä,
joka sisältäisi merkkijonon "tallinna" tai "Leena" (grep ei löydä
osumaa kummastakaan tiedostosta lukuun ottamatta yllä lainattua kaaren
omaa `henkilo`-kenttää `tyohuone-kehitys-data.js`:ssä). Myöskään
`docs/kuvatuotanto-kohtaamiset.md`:ssä ei ole yhtään Tallinna- tai
Leena-riviä. Tallinnalle ei siis ole yhtään kohtaamiskuvakonseptia
olemassa — ei kaarelle eikä tälle riville.

**Johtopäätös:** Leena, opas-ammatti, raatihuoneen torni ja vanhankaupungin
päivien tungos ovat kaikki varattuja kaaren omaan kohtaamiseen. Tälle
riville tarvitaan kokonaan uusi hahmo, uusi ammatti ja uusi paikka — ja
koska olemassa olevaa kuvaa ei ole kummallekaan Tallinna-hahmolle,
kuva pitää tilata uutena joka tapauksessa (ks. kuvatilausbriiffi alla).

Kirjoitin siis kokonaan uuden hahmon: lyhdynsytyttäjä Miinan, joka
kiertää vanhan kaupungin kaasulyhtyjä — ei opastusta, ei tornia, ei
festivaalitungosta.

## Tallinna — lyhdynsytyttäjä Miina

**hahmo:** `'lyhdynsytyttäjä Miina'`

**nappi:** `'Tapaa Miina'`

**frame:** `'Miina nostaa tikapuut lyhdyn juurelle ja kysyy'`

**tervehdys** (253 merkkiä, raja ~280):
`'Miina nojaa tikapuihin ja sytyttää kaasulyhdyn liekin: "Isoisäsi aikaan nämä paloivat vasta kahdeksatta vuotta — ennen sitä täällä oli vain öljyä ja pimeää. Näytä että tunnet maailmaa kuten piirtäjä — niin kerron, montako lyhtyä minä sytytän joka ilta."'`

**tervehdysLuenta** (sama teksti sanasta sanaan, tagit ja ajatusviiva
lisätty, roolit vain kertoja/hahmo):
```js
[
  { rooli: 'kertoja', teksti: 'Miina nojaa tikapuihin ja sytyttää '
    + 'kaasulyhdyn liekin:' },
  { rooli: 'hahmo', teksti: '[curious] "Isoisäsi aikaan nämä paloivat '
    + 'vasta kahdeksatta vuotta — ennen sitä täällä oli vain öljyä ja '
    + 'pimeää. [warmly] Näytä että tunnet maailmaa kuten piirtäjä — '
    + 'niin kerron, montako lyhtyä minä sytytän joka ilta."' },
]
```

**loyto** (120 merkkiä, raja 130):
`'Miina nostaa rasian lyhdyn juuresta valon kajossa: "Tämä on maannut pimeässä kauemmin kuin yksikään lyhtyni on palanut."'`

**loytoLuenta:**
```js
[
  { rooli: 'kertoja', teksti: 'Miina nostaa rasian lyhdyn juuresta '
    + 'valon kajossa:' },
  { rooli: 'hahmo', teksti: '[surprised] "Tämä on maannut pimeässä '
    + 'kauemmin kuin yksikään lyhtyni on palanut."' },
]
```

**tyhja** (117 merkkiä, raja 130):
`'Miina valaisee kolon lyhdyllään: "Tyhjä. Tätä katua on siivottu niin monta kertaa, ettei mikään pysy kivien välissä."'`

**vaarin** (120 merkkiä, raja 130):
`'Miina jatkaa tikkailla seuraavaan lyhtyyn: "Ei vielä. Minä ehdin kadun päähän ennen kuin sinä löydät oikean vastauksen."'`

**tunnetagit:**
```js
tunneTervehdys: { tunne: 'utelias', voimakkuus: 0.5 }
tunneLoyto: { tunne: 'ilo', voimakkuus: 0.7 }
tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 }
tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 }
```

## 1873-fakta ja lähteet

Tallinnan (Revalin) kaasulaitos ja katujen kaasuvalaistus olivat isoisän
matkan aikaan vielä tuoreita: Riikalaisen liikemiehen William Weir & Comp
-yhtiön ja Revalin kaupungin välinen konsessiosopimus kaasulaitoksen ja
vesijohdon rakentamisesta allekirjoitettiin 15.12.1864 ja vahvistettiin
keisari Aleksanteri II:n toimesta. Laitos valmistui 1865, ja **ensimmäinen
kaasulyhty sytytettiin Tallinnan raatihuoneentorilla 17.12.1865** —
ennen sitä kadut valaisi öljy. Isoisän matkavuonna 1873 kaasuvalaistus
oli siis vasta noin kahdeksan vuotta vanha uutuus, ei vielä
itsestäänselvyys.

Lähteet (tarkistettu 22.9.2026, WebSearch):
- [Elenger — History](https://elenger.ee/en/company/history/)
- [Timeline of Reval — Wikipedia](https://en.wikipedia.org/wiki/Timeline_of_Reval)

## Olemassa olevat Tallinna-kuvakonseptit (ristiriitatarkistus)

- Ei yhtään Tallinna- tai Leena-riviä `js/kohtaamiskuvat-data.js`:ssä
  eikä `docs/kuvatuotanto-kohtaamiset.md`:ssä. Kaaren omalla
  kohtaamisellakaan ei ole vielä kuvaa tässä katalogissa.
- Ei olemassa olevaa kuvaa lyhdynsytyttäjä Miinalle — uusi tilaus.

## Kuvatarve: uusi tilaus Codexille

> **Tallinna — lyhdynsytyttäjä Miina.** Virolainen nainen, noin 50–60-
> vuotias, tanakka ja ryhdikäs vartalo, harmaantuvat hiukset kiinni
> huivin tai lakin alla. Yllään tumma, paksu villatakki tai
> turkisreunainen liivi paidan päällä, sormettomat villakäsineet.
> Paikka: kapea, kivetty vanhan kaupungin katu illalla (ei
> raatihuoneentori eikä raatihuoneen torni), taustalla hämärästi
> erottuvia hansaporvaristotaloja. Kesken aidon tekemisen: seisoo
> nojatikkaiden askelmalla, sytytintanko juuri koskettamassa kaasulyhdyn
> liekkiä. Valo/sää: hämärä syysilta, lämmin kaasuliekin hehku,
> kylmempi sinertävä iltataivas. Rajaus enintään puolivartalo. **Ei
> näytetä:** raatihuoneen tornia eikä raatihuoneentoria tunnistettavana
> maamerkkinä (varattu kaaren Leenalle), ei festivaaliväkijoukkoa.

---

# Kohtaaminen erä C4: Vilna

Sisältökirjuri-sessio, 22.9.2026. Sisällöntuotantoa `docs/raportit/`-tiedostoon
Fablen/Sisältökirjurin tarkastettavaksi — `js/packs/kohtaamiset.js`-,
`js/kohtaamiskuvat-data.js`- ja `js/tyohuone-kehitys-data.js`-tiedostoja
**ei** ole muokattu.

## RISTIRIITATARKISTUS ENSIN

1. **Vilnalla on jo tarinakaari** (`js/tyohuone-kehitys-data.js`,
   `KAARI_PAKETIT.kohteet`, id `'vilna'`, rivit 2075–2113, otsikko
   *"Vilna — susi joka ulvoi sadan äänellä"*). Kaaren oma `henkilo`-kenttä
   (rivi 2087): *"Yövartija Rasa kiertää vanhankaupungin kujat lyhtyineen
   ja tervehtii rautaista sutta joka kierroksella."* Kaaren `kohtaaminen`-
   ja `aarre`-kentät (rivit 2089, 2112) tapahtuvat illalla/yöllä Gediminasin
   tornin kivijalalla.
2. **`js/kohtaamiskuvat-data.js` sisältää yhden Vilna-rivin**: id
   `vilna-rasa-myrskytorni` (rivit 339–349), hahmo **Rasa**, tila
   `tarkistettu` (aktiivinen). Sama hahmo kuin kaaren `henkilo`-kentässä
   (nimi, ammatti, kaupunki täsmäävät) — sama päättelyketju kuin C3:n
   Bukarest-Ana-tapauksessa.
3. `docs/kuvatuotanto-kohtaamiset.md`:ssä ei ole yhtään Vilna-riviä.
4. `js/packs/fokusvirta-vilna.js` on olemassa, mutta se on eri järjestelmä
   (Livian fokusvirta), ei kosketa Rasaa eikä tätä riviä.
5. `js/packs/kohtaamiset.js`:ssä ei ole vielä `vilna`-riviä lainkaan.

**Johtopäätös:** Rasa (yövartija, vanhakaupungin kujat, rautaisen suden
legenda, Gediminasin torni, ilta/yö) ja hänen kuvansa `vilna-rasa-
myrskytorni` ovat kokonaan varattuja kaaren omaan kohtaamiseen. Kirjoitin
siis kokonaan uuden hahmon, uuden ammatin, uuden paikan ja uuden teeman —
ei yötä, ei vartiointia, ei rautaista sutta, ei Gediminasin tornia — ja
sijoitin kohtaamisen päiväsaikaan.

## Vilna — kirjansitoja Aldona

**hahmo:** `'kirjansitoja Aldona'`

**nappi:** `'Tapaa Aldona'`

**frame:** `'Aldona laskee sidontaveitsen pöydälle ja kysyy'`

**tervehdys** (279 merkkiä, raja 280):
`'Aldona kääntää tuoretta kirjankantta valoon: "Tämän alla on toinen kirja — vain minä tiedän, mikä. Juuri isoisäsi matkan vuonna kiellettiin tuomasta tänne gootilaisinkin kirjaimin painettuja. Näytä että tunnet maailmaa kuten piirtäjä — niin näytän, mitä kannen alla oikeasti on."'`

**tervehdysLuenta** (sama teksti sanasta sanaan, tagit ja ajatusviiva
lisätty, roolit vain kertoja/hahmo):
```js
[
  { rooli: 'kertoja', teksti: 'Aldona kääntää tuoretta kirjankantta '
    + 'valoon:' },
  { rooli: 'hahmo', teksti: '[curious] "Tämän alla on toinen kirja — '
    + 'vain minä tiedän, mikä. Juuri isoisäsi matkan vuonna kiellettiin '
    + 'tuomasta tänne gootilaisinkin kirjaimin painettuja. [warmly] '
    + 'Näytä että tunnet maailmaa kuten piirtäjä — niin näytän, mitä '
    + 'kannen alla oikeasti on."' },
]
```

**loyto** (128 merkkiä, raja 130):
`'Aldona nostaa rasian kirjapinon alta: "Tämä ei ole yhtään kirjaa, jonka olen sitonut — mutta joku on halunnut piilottaa senkin."'`

**loytoLuenta:**
```js
[
  { rooli: 'kertoja', teksti: 'Aldona nostaa rasian kirjapinon alta:' },
  { rooli: 'hahmo', teksti: '[surprised] "Tämä ei ole yhtään kirjaa, '
    + 'jonka olen sitonut — mutta joku on halunnut piilottaa senkin."' },
]
```

**tyhja** (116 merkkiä, raja 130):
`'Aldona pyyhkäisee kädellä hyllyn taakse: "Tyhjä. Täällä on käyty ennen sinua — kannen alla ei ole muuta kuin pölyä."'`

**vaarin** (109 merkkiä, raja 130):
`'Aldona laskee sidontaveitsen kädestään: "Ei vielä. Luetaan selkämys uudestaan — kiire ei auta sidontatyössä."'`

**tunnetagit:**
```js
tunneTervehdys: { tunne: 'utelias', voimakkuus: 0.5 }
tunneLoyto: { tunne: 'ilo', voimakkuus: 0.7 }
tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 }
tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 }
```

## 1873-fakta ja lähde

Liettuan kielinen lehdistökielto (**spaudos draudimas**) oli voimassa
1864/1865–1904. **Isoisän matkavuonna 1873** kielto tiukkeni juuri tässä
kohtaa: Venäjän Vyriausioji spaudos reikalų valdyba (päälehdistöhallinto)
antoi kuvernööreille kiertokirjeen, joka kielsi myös **gootilaisin
kirjaimin** painettujen liettuankielisten julkaisujen tuonnin ulkomailta
ja levityksen — tukkien aiemman porsaanreiän.

Lähteet (tarkistettu 22.9.2026):
- [Lietuvių spaudos draudimas – Visuotinė lietuvių enciklopedija](https://www.vle.lt/straipsnis/lietuviu-spaudos-draudimas/)
- [Lithuanian press ban – Wikipedia](https://en.wikipedia.org/wiki/Lithuanian_press_ban)
- [Lithuanian book smugglers – Wikipedia](https://en.wikipedia.org/wiki/Lithuanian_book_smugglers)

## Olemassa olevat Vilna-kuvakonseptit (ristiriitatarkistus)

- `vilna-rasa-myrskytorni` — yövartija Rasa, kattoluukku, myrskypuuska,
  tila `tarkistettu`, aktiivinen. **Varattu kaaren omaan kohtaamiseen.**
- Ei olemassa olevaa kuvaa kirjansitoja Aldonalle — uusi tilaus.

## Kuvatarve: uusi tilaus Codexille

> **Vilna — kirjansitoja Aldona.** Liettualainen nainen, noin 45–55-
> vuotias, harmaantuvat hiukset kevyesti taakse sidottuina. Yllään
> tumma villahame tai -mekko, nahkainen käsityöesiliina. Paikka: pieni
> kirjansitomoverstas Vilnan vanhankaupungin Literatų-kadulla — ei
> kirkontorneja, ei kattoja eikä patsaita näkyvissä, pelkkä sisätila
> päivänvalossa. Kesken aidon tekemisen: istuu työpöydän ääressä,
> sidontaveitsi kädessä, avoin kirja jonka kansi on juuri vaihdettu
> toiseen. Valo: päiväsaikaan, lämmin ikkunavalo, ei kynttilää eikä
> lyhtyä. Rajaus enintään puolivartalo. **Ei näytetä:** minkään sivun
> tekstiä luettavana, eikä mitään rautaista sutta, tornia, lyhtyä tai
> muuta viittausta kaaren Rasa-hahmoon.

---

# Kohtaaminen erä C4: Barcelona

Sisältökirjuri-sessio, 22.9.2026. Sisällöntuotantoa `docs/raportit/`-tiedostoon
Fablen/Sisältökirjurin tarkastettavaksi — `js/packs/kohtaamiset.js`-,
`js/kohtaamiskuvat-data.js`- ja `js/tyohuone-kehitys-data.js`-tiedostoja
**ei** ole muokattu.

## RISTIRIITATARKISTUS ENSIN

Barcelonalla on jo tarinakaari (`js/tyohuone-kehitys-data.js`, `KAARI_PAKETIT.kohteet`,
id `'barcelona'`, rivit 920–959):

1. **Kaaren `henkilo`-kenttä** (rivi 933–935): *"Kirjansitoja Mercè sitoo kirjoja
   kujalla, jolla hänen sukunsa on myynyt ruusuja ja kirjoja pyhän Jordin päivänä
   sata vuotta."* Aihepiiri: kirjansidonta, ruusut ja Sant Jordin päivä (23.4.).
2. **`js/kohtaamiskuvat-data.js`** sisältää rivin `barcelona-merce-konfetti`
   (rivit 185–196): hahmo **Mercè**, tila `tarkistettu` (aktiivinen). `tests/
   kohtaamiskuvat.test.mjs` -testin logiikka kytkee tämän kuvan kaaren omaan
   Mercèen — kuva menee automaattisesti kaaren omalle kohtaamiskortille.
3. **`docs/kuvatuotanto-kohtaamiset.md` rivi 88** kuvaa saman Mercè-konseptin,
   tila "Tyylikoe valmis" — ei ristiriitaa datan kanssa, molemmat kuvaavat
   samaa hyväksyttyä tyylikoetta.

**Johtopäätös: Mercè ja hänen kuvansa ovat varattuja kaaren omaan
kohtaamiseen.** Kirjoitin siis kokonaan uuden hahmon: kivenveistäjä Pau,
joka työskentelee Barcelonan katedraalin (La Seu, Gotiikan korttelin
toinen keskeinen maamerkki) julkisivun kivitöissä — ei kujaa, ei ruusua,
ei kirjaa sidottavana.

## Barcelona — kivenveistäjä Pau

**hahmo:** `'kivenveistäjä Pau'`

**nappi:** `'Tapaa Pau'`

**frame:** `'Pau puhaltaa kivipölyn pois piirustukselta ja kysyy'`

**tervehdys** (232 merkkiä, raja ~280):
`'Pau puhaltaa kivipölyn pois vanhasta piirustuksesta: "Tämä julkisivu on piirretty jo 1408, mutta isoisäsi näki vielä paljaan kiven. Näytä että tunnet maailmaa kuten piirtäjä — niin näytän kiven, jota hän ei koskaan nähnyt valmiina."'`

**tervehdysLuenta:**
```js
[
  { rooli: 'kertoja', teksti: 'Pau puhaltaa kivipölyn pois vanhasta '
    + 'piirustuksesta:' },
  { rooli: 'hahmo', teksti: '[curious] "Tämä julkisivu on piirretty jo '
    + '1408, mutta isoisäsi näki vielä paljaan kiven. [warmly] Näytä '
    + 'että tunnet maailmaa kuten piirtäjä — niin näytän kiven, jota '
    + 'hän ei koskaan nähnyt valmiina."' },
]
```

**loyto** (109 merkkiä, raja 130):
`'Pau nostaa rasian irtokivien joukosta: "Viisisataa vuotta piirustusta odottaneena — tämä ehti perille ensin."'`

**loytoLuenta:**
```js
[
  { rooli: 'kertoja', teksti: 'Pau nostaa rasian irtokivien joukosta:' },
  { rooli: 'hahmo', teksti: '[surprised] "Viisisataa vuotta piirustusta '
    + 'odottaneena — tämä ehti perille ensin."' },
]
```

**tyhja** (91 merkkiä, raja 130):
`'Pau koputtaa uutta kiveä: "Tyhjä. Telineet vaihtavat paikkaa täällä useammin kuin luulisi."'`

**vaarin** (109 merkkiä, raja 130):
`'Pau puhaltaa pölyä piirustukselta katsomatta ylös: "Ei vielä. Kivikin odottaa satoja vuosia — ehdit sinäkin."'`

**tunnetagit:**
```js
tunneTervehdys: { tunne: 'utelias', voimakkuus: 0.5 }
tunneLoyto: { tunne: 'ilo', voimakkuus: 0.7 }
tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 }
tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 }
```

## 1873-fakta ja lähde

Barcelonan katedraalin (La Seu) länsijulkisivu — se piikikäs, koristeellinen
uusgoottilainen kivijulkisivu, joka nykyään näkyy jokaisessa
Barcelona-postikortissa — **ei ollut olemassa isoisän matkan aikaan 1873**.
Julkisivu oli suunniteltu jo 1400-luvulla (Charles Galtésin piirustus
vuodelta 1408), mutta katedraalin länsipääty jäi paljaaksi kiveksi
vuosisatoihin. Teollisuusmies Manuel Girona rahoitti julkisivun rakentamisen
vasta 1880-luvun lopulla, arkkitehti Josep Oriol Mestres suunnitteli sen
1408 piirustuksen pohjalta, ja August Font i Carreras viimeisteli 70-metrisen
kupolin vasta **1913** — 40 vuotta isoisän käynnin jälkeen.

Lähteet (tarkistettu 22.9.2026, WebSearch):
- [Barcelona Cathedral – Wikipedia](https://en.wikipedia.org/wiki/Barcelona_Cathedral)
- [An exhibition shows how the neo-gothic façade of the Barcelona cathedral
  was built – Universitat de Barcelona](https://web.ub.edu/en/web/actualitat/w/an-exhibition-shows-how-the-neo-gothic-facade-of-the-barcelona-cathedral-was-built)

Huom: Granadan C3-erässä käytettiin jo Espanjan ensimmäistä tasavaltaa
isoisä-koukkuna — tämä Barcelona-fakta on eri ja paikkakohtainen, ei sama
fakta toistettuna.

## Olemassa olevat Barcelona-kuvakonseptit (ristiriitatarkistus)

- `barcelona-merce-konfetti` — hahmo Mercè, festivaalikonfetti,
  tila `tarkistettu`, aktiivinen. **Varattu kaaren omaan kohtaamiseen.**
- Ei olemassa olevaa kuvaa kivenveistäjä Paulle — uusi tilaus.

## Kuvatarve: uusi tilaus Codexille

> **Barcelona — kivenveistäjä Pau.** Katalonialainen/espanjalainen mies, noin
> 40–50-vuotias, tanakka käsityöläisvartalo, kivipölyä hiuksissa. Yllään
> haalistunut työtakki tai nahkaesiliina. Paikka: Barcelonan katedraalin
> (La Seu) länsijulkisivun työtelineet — taustalla tunnistettavat
> uusgoottilaiset piikit ja ikkunaruusuke, mutta ei koko rakennusta
> kerralla. Kesken aidon tekemisen: puhaltaa kivipölyä pois vanhasta,
> kellastuneesta piirustuksesta. Valo: aamuvalo viistosti sivulta. Rajaus
> enintään puolivartalo. **Ei näytetä:** piirustuksen tekstiä tai
> vuosilukua luettavana, eikä mitään ruusua, kirjaa tai lohikäärmekoristetta
> (ne kuuluvat kaaren Mercè-kuvaan).

---

# Kohtaaminen erä C4: Praha

Sisältökirjuri-sessio, 22.9.2026. Sisällöntuotantoa `docs/raportit/`-tiedostoon
Fablen/Sisältökirjurin tarkastettavaksi — `js/packs/kohtaamiset.js`-,
`js/kohtaamiskuvat-data.js`- eikä `js/tyohuone-kehitys-data.js`-tiedostoja
**ei** ole muokattu.

## RISTIRIITATARKISTUS ENSIN

Prahalla on jo tarinakaari (`js/tyohuone-kehitys-data.js`, `KAARI_PAKETIT.kohteet`,
id `'praha'`, rivit 33–104). Kaaren oma `henkilo`-kenttä (rivi 50–51):

> "Lyhdynsytyttäjä Tomáš pitää sukunsa lupauksen: talon kahdeksan kynttilä
> palaa, kunnes etsijä palaa."

`js/kohtaamiskuvat-data.js` sisältää **kaksi** Praha/Tomáš-riviä:

1. `praha-tomas-kehys` (rivit 43–51): hahmo Tomáš, museon huoltokäytävä,
   Tomáš pujottautuu suuren kultaisen taulunkehyksen alta ahtaassa ovessa.
2. `praha-tomas-round2-r20260905-v1` (rivit 584–594): sama kehys-aihe
   tarkennettuna kuvana — uudempi, kuvatuotannon toisen kierroksen versio
   samasta konseptista, ei uusi rinnakkainen hahmo.

`docs/kuvatuotanto-kohtaamiset.md` rivi 93 vahvistaa saman konseptin.

**Johtopäätös: molemmat kuvarivit ovat saman kaaren Tomášin kaksi
kuvaversiota, ja molemmat ovat varattuja kaaren omaan kohtaamiseen.**
Kirjoitin siis kokonaan uuden hahmon, ammatin, paikan ja motiivin:
astronomisen kellon (Orloj) parissa työskentelevä kellonvartija, ei
kynttilää eikä kehystä lähelläkään.

## Praha — kellonvartija Věra

**hahmo:** `'kellonvartija Věra'`

**nappi:** `'Tapaa Věra'`

**frame:** `'Věra pysäyttää käyntipyörän ja kysyy'`

**tervehdys** (249 merkkiä, raja ~280):
`'Věra pysäyttää käyntipyörän ja katsoo kirjaasi tornin ikkunasta: "Apostolit tuolla ylhäällä ovat vasta seitsemän vuotta vanhoja — näin jokaisen paikoilleen. Näytä että tunnet maailmaa kuten piirtäjä — niin päästän sinut katsomaan koneistoa sisältä."'`

**tervehdysLuenta:**
```js
[
  { rooli: 'kertoja', teksti: 'Věra pysäyttää käyntipyörän ja katsoo '
    + 'kirjaasi tornin ikkunasta:' },
  { rooli: 'hahmo', teksti: '[curious] "Apostolit tuolla ylhäällä ovat '
    + 'vasta seitsemän vuotta vanhoja — näin jokaisen paikoilleen. '
    + '[warmly] Näytä että tunnet maailmaa kuten piirtäjä — niin '
    + 'päästän sinut katsomaan koneistoa sisältä."' },
]
```

**loyto** (111 merkkiä, raja 130):
`'Věra nostaa rasian hammasrattaiden välistä: "Tämä on piiloutunut koneistoon kauemmin kuin olen sitä huoltanut."'`

**loytoLuenta:**
```js
[
  { rooli: 'kertoja', teksti: 'Věra nostaa rasian hammasrattaiden '
    + 'välistä:' },
  { rooli: 'hahmo', teksti: '[softly] "Tämä on piiloutunut koneistoon '
    + 'kauemmin kuin olen sitä huoltanut."' },
]
```

**tyhja** (101 merkkiä, raja 130):
`'Věra sulkee tornin luukun: "Tyhjä. Koneistoa on korjattu niin monesti, ettei mikään pysy paikallaan."'`

**vaarin** (101 merkkiä, raja 130):
`'Věra pysäyttää käden vipuun tarttumasta: "Ei vielä. Kello käy huomennakin — ehdit yrittää uudelleen."'`

**tunnetagit:**
```js
tunneTervehdys: { tunne: 'utelias', voimakkuus: 0.5 }
tunneLoyto: { tunne: 'ilo', voimakkuus: 0.7 }
tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 }
tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 }
```

## 1873-fakta ja lähteet

Prahan astronomisen kellon (Orloj) Vanhankaupungintalon tornissa käytiin
läpi laaja korjaus 1865–1866: silloin lisättiin kultainen kiekuva kukko,
kaksitoista puuveistettyä apostolihahmoa yläikkunoihin ja Josef Mánesin
uusi, maalattu kalenterikiekko. Kello vihittiin uudelleen käyttöön
18.8.1866, ja koko koneisto oli täydessä toiminnassa 14.9.1866 mennessä.
Kun isoisä matkusti Prahan läpi vuonna 1873, apostolit, kukko ja
kalenterikiekko olivat siis vasta noin seitsemän vuotta vanhoja.

Lähteet (tarkistettu 22.9.2026, WebSearch):
- [Prague astronomical clock – Wikipedia](https://en.wikipedia.org/wiki/Prague_astronomical_clock)
- [History of Prague Orloj – Radio Prague International](https://archiv.radio.cz/en/static/orloj/history)

## Olemassa olevat Praha-kuvakonseptit (ristiriitatarkistus)

- `praha-tomas-kehys` ja `praha-tomas-round2-r20260905-v1` — sama kaaren
  Tomáš, kehys/museo-aihe. **Molemmat varattu kaaren omaan kohtaamiseen.**
- Ei olemassa olevaa kuvaa kellonvartija Věralle — uusi tilaus.

## Kuvatilaus Codexille

> **Praha — kellonvartija Věra.** Tšekkiläinen nainen, noin 40–50-vuotias,
> tukeva ja käytännöllinen olemus, tummat harmaantuvat hiukset kiinni
> huivilla. Paikka: Vanhankaupungintalon tornin sisätila astronomisen
> kellon (Orloj) koneiston takana — suuret puiset/rautaiset hammasrattaat,
> kapea kivinen tornihuone. Kesken aidon tekemisen: seisoo ison
> käyntipyörän/vivun ääressä, toinen käsi pysäyttämässä pyörän liikettä.
> Valo: kapeasta tornin ikkunasta tuleva viisto päivänvalo — EI kynttilän
> tai öljylampun hehkua (varattu kaaren Tomáš-kuvalle), käytä sen sijaan
> pientä metallista käsilyhtyä ilman liekkiä tai pelkkää ikkunavaloa.
> Rajaus enintään puolivartalo. **Ei näytetä:** apostolihahmoja tai
> kalenterikiekkoa suoraan tunnistettavina, eikä kultaista taulunkehystä
> tai museokäytävää (kaaren Tomáš-kuva).

---

# Kohtaaminen erä C4: Moskova

Sisältökirjuri (Sonnet), 22.9.2026. Sisällöntuotantoa `docs/raportit/`-tiedostoon
Fablen/Sisältökirjurin tarkastettavaksi — `js/packs/kohtaamiset.js`-, `js/kohtaamiskuvat-data.js`-
eikä `js/tyohuone-kehitys-data.js`-tiedostoa ei ole muokattu.

## RISTIRIITATARKISTUS ENSIN

Moskovalla on jo tarinakaari (`js/tyohuone-kehitys-data.js`, `KAARI_PAKETIT.kohteet`,
id `'moskova'`, rivit 1781–1820, otsikko *"Moskova — kello joka ei koskaan soinut"*):

1. **Kaaren `henkilo`-kenttä** (rivi 1797–1798): *"Kellonvalajan jälkeläinen Vera
   tuntee suuren kellon pronssin jokaisen sävyn ja lohkeaman koko tarinan."*
   Kaaren kohtaaminen tapahtuu Tsaarinkellon varjossa Kremlissä.
2. **`js/kohtaamiskuvat-data.js`**: id `moskova-vera-tsaarinkello`
   (rivi 395–406), hahmo **Vera**, tila `tarkistettu`, lähde Moscow Kremlin
   Museums. `tests/kohtaamiskuvat.test.mjs` sitoo kuvan kaaren omalle
   kohtaamiskortille.
3. `docs/kuvatuotanto-kohtaamiset.md`:ssä ei ole yhtään Moskova- eikä
   Vera-riviä.

**Johtopäätös: Vera ja hänen kuvansa (Tsaarinkello, Kreml, kellonvalu) ovat
varattuja kaaren omaan kohtaamiseen.** Kirjoitin kokonaan uuden hahmon,
ammatin, paikan ja motiivin — ei Tsaarinkelloa, ei Kremliä, ei kellonvalua.
Paikaksi valitsin Punaisen torin vanhat Kauppirivit (nyk. GUM), jota lehti
ei ole vielä kattanut, ja vältin myös Moskovan kaksi muuta jo käytettyä
syvennysaihetta (Polytekninen näyttely 1872, karavaanitee).

## Moskova — lukkoseppä Stepan

**hahmo:** `'lukkoseppä Stepan'`

**nappi:** `'Tapaa Stepan'`

**frame:** `'Stepan nostaa katseensa vanhasta lukosta ja kysyy'`

**tervehdys** (270 merkkiä, raja ~280):
`'Stepan kääntää vanhaa lukkoa valoon puotinsa nykyisissä seinissä: "Isoisäsi näki tässä Bovén rakentaman rivistön vuodelta 1815 — tämä uusi avattiin vasta 1893. Näytä että tunnet maailmaa kuten piirtäjä — niin avaan sinulle lukon, joka on vanhempi kuin talo ympärilläni."'`

**tervehdysLuenta:**
```js
[
  { rooli: 'kertoja', teksti: 'Stepan kääntää vanhaa lukkoa valoon '
    + 'puotinsa nykyisissä seinissä:' },
  { rooli: 'hahmo', teksti: '[curious] "Isoisäsi näki tässä Bovén '
    + 'rakentaman rivistön vuodelta 1815 — tämä uusi avattiin vasta '
    + '1893. [warmly] Näytä että tunnet maailmaa kuten piirtäjä — niin '
    + 'avaan sinulle lukon, joka on vanhempi kuin talo ympärilläni."' },
]
```

**loyto** (119 merkkiä, raja 130):
`'Stepan kaivaa rasian puodin lattian alta vanhalla avaimella: "Tämä lukko oli minulle tuttu — isäni teki sen aikoinaan."'`

**loytoLuenta:**
```js
[
  { rooli: 'kertoja', teksti: 'Stepan kaivaa rasian puodin lattian alta '
    + 'vanhalla avaimella:' },
  { rooli: 'hahmo', teksti: '[softly] "Tämä lukko oli minulle tuttu — '
    + 'isäni teki sen aikoinaan."' },
]
```

**tyhja** (106 merkkiä, raja 130):
`'Stepan koputtaa tyhjää koloa: "Tyhjä. Puotia on siivottu niin monta kertaa, ettei mikään pysy paikallaan."'`

**vaarin** (112 merkkiä, raja 130):
`'Stepan asettaa avaimen takaisin naulaan: "Ei vielä. Lukko avautuu vain oikealla vastauksella — yritä uudestaan."'`

**tunnetagit:**
```js
tunneTervehdys: { tunne: 'utelias', voimakkuus: 0.5 }
tunneLoyto: { tunne: 'ilo', voimakkuus: 0.7 }
tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 }
tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 }
```

## 1873-fakta ja lähteet

Isoisän matkavuonna 1873 Punaisella torilla ei seissyt nykyinen GUM-
tavaratalo. Torin nykyinen Kauppirivien rakennus (arkkitehti Alexander
Pomerantsev, insinööri Vladimir Šuhov) rakennettiin vasta 1890–1893 ja
avattiin 2.12.1893. Isoisä näki paikalla edeltäjän: arkkitehti Osip
Bovén vuosina 1815–1816 rakennuttaman rivistön, joka purettiin vasta
1880-luvun lopulla.

Lähteet (tarkistettu 22.9.2026, WebSearch/WebFetch):
- [GUM (department store) – Wikipedia](https://en.wikipedia.org/wiki/GUM_(department_store))
- [GUM Russia — history & contemporaneity](https://gumrussia.com/history/)

## Olemassa olevat Moskova-kuvakonseptit (ristiriitatarkistus)

- `moskova-vera-tsaarinkello` — hahmo Vera, Tsaarinkello, Kreml, tila
  `tarkistettu`. **Varattu kaaren omaan kohtaamiseen.**
- Ei olemassa olevaa kuvaa lukkoseppä Stepanille — uusi tilaus.

## Kuvatarve: uusi tilaus Codexille

> **Moskova — lukkoseppä Stepan.** Venäläinen mies, noin 50–60-vuotias,
> tanakka, harmaantuva lyhyt parta. Yllään tumma, kulunut liivi tai
> esiliina. Paikka: pieni, ahdas lukkosepän puoti GUM-tavaratalon
> historiallisessa käytävässä Punaisella torilla — taustalla tunnistettavat
> holvikäytävät ja lasikatto, mutta rakennus ei ole kuvan pääosassa.
> Kesken aidon tekemisen: pitää vanhaa, koristeellisesti taottua
> rautalukkoa valoa vasten. Rajaus enintään puolivartalo. **Ei näytetä:**
> Tsaarinkelloa, Kremliä tai muuta kaaren omaan kohtaamiseen (Vera)
> kuuluvaa yksityiskohtaa.

---

# Kohtaaminen erä C4: Ljubljana

Sisältökirjuri-sessio, 22.9.2026. Sisällöntuotantoa `docs/raportit/`-tiedostoon
Fablen/Sisältökirjurin tarkastettavaksi — `js/packs/kohtaamiset.js`-,
`js/kohtaamiskuvat-data.js`- eikä `js/tyohuone-kehitys-data.js`-tiedostoja
**ei** ole muokattu.

## RISTIRIITATARKISTUS ENSIN

Ei yhtään osumaa kolmesta tiedostosta grepillä ("Ljubljana"). Ljubljanalla
ei siis ole tarinakaarta eikä olemassa olevaa kohtaamiskuvaa eikä
dokumentaatioriviä — puhdas kaupunki, kuten Tampere oli erässä C3.

## Ljubljana — kukkakauppias Vesna

**hahmo:** `'kukkakauppias Vesna'`

**nappi:** `'Tapaa Vesna'`

**frame:** `'Vesna nostaa katseensa kukkakimpuista ja kysyy'`

**tervehdys** (270 merkkiä, raja ~280):
`'Vesna sitoo kukkakimppua sillan kupeessa ja vilkaisee kirjaasi: "Isoisäsi aikaan tässä oli vain yksi silta, ei kolmea — kaksi vierussiltaa tulivat vasta vuosikymmeniä myöhemmin. Näytä että tunnet maailmaa kuten piirtäjä — niin kerron, mistä ne kaksi oikein ilmestyivät."'`

**tervehdysLuenta:**
```js
[
  { rooli: 'kertoja', teksti: 'Vesna sitoo kukkakimppua sillan kupeessa '
    + 'ja vilkaisee kirjaasi:' },
  { rooli: 'hahmo', teksti: '[curious] "Isoisäsi aikaan tässä oli vain '
    + 'yksi silta, ei kolmea — kaksi vierussiltaa tulivat vasta '
    + 'vuosikymmeniä myöhemmin. [warmly] Näytä että tunnet maailmaa '
    + 'kuten piirtäjä — niin kerron, mistä ne kaksi oikein '
    + 'ilmestyivät."' },
]
```

**loyto** (127 merkkiä, raja 130):
`'Vesna nostaa rasian ämpärin alta ja pyyhkii kädet esiliinaan: "Tämä on maannut täällä kauemmin kuin yksikään kukka tiskilläni."'`

**loytoLuenta:**
```js
[
  { rooli: 'kertoja', teksti: 'Vesna nostaa rasian ämpärin alta ja '
    + 'pyyhkii kädet esiliinaan:' },
  { rooli: 'hahmo', teksti: '[softly] "Tämä on maannut täällä kauemmin '
    + 'kuin yksikään kukka tiskilläni."' },
]
```

**tyhja** (113 merkkiä, raja 130):
`'Vesna tyhjentää ämpärin pohjaa katsomatta: "Tyhjä. Tämä tori vaihtaa käsiä joka aamu — joku ehti jo ennen sinua."'`

**vaarin** (106 merkkiä, raja 130):
`'Vesna sitoo uutta kimppua kuuntelematta tarkkaan: "Ei vielä. Kukatkin erehtyvät väristä ennen aukeamista."'`

**tunnetagit:**
```js
tunneTervehdys: { tunne: 'utelias', voimakkuus: 0.5 }
tunneLoyto: { tunne: 'ilo', voimakkuus: 0.7 }
tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 }
tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 }
```

## 1873-fakta ja lähde

Ljubljanan tunnetuin maamerkki, Kolmisilta (Tromostovje) yli Ljubljanica-
joen, EI ollut isoisän matkan aikaan kolmiosainen. Paikalla seisoi tuolloin
yksi ainoa kivisilta — italialaisen arkkitehti Giovanni Piccon vuonna 1842
suunnittelema ja rakentama "Frančev most". Arkkitehti Jože Plečnik lisäsi
sillan molemmille puolille kaksi kevyempää jalankulkusiltaa vasta 1931
laaditun suunnitelman pohjalta; laajennettu silta avattiin liikenteelle
huhtikuussa 1932 — lähes 60 vuotta isoisän vierailun jälkeen.

Lähde (tarkistettu 22.9.2026, WebSearch/WebFetch):
- [Triple Bridge – Wikipedia](https://en.wikipedia.org/wiki/Triple_Bridge)

## Olemassa olevat Ljubljana-kuvakonseptit (ristiriitatarkistus)

- Ei yhtään riviä `js/kohtaamiskuvat-data.js`:ssä eikä
  `docs/kuvatuotanto-kohtaamiset.md`:ssä.
- Ei olemassa olevaa kuvaa kukkakauppias Vesnalle — uusi tilaus.

## Kuvatarve: uusi tilaus Codexille

> **Ljubljana — kukkakauppias Vesna.** Slovenialainen nainen, noin
> 45–55-vuotias, tumma tukka sidottu löyhälle nutturalle. Paikka:
> Ljubljanica-joen rantatori aivan kolmisillan (Tromostovje) kupeessa,
> kukkastandi täynnä värikkäitä leikkokukkia, taustalla joen toisella
> puolen kaupunkirivistö ja etäältä Ljubljanan linnan siluetti. Kesken
> aidon tekemisen: sitoo kukkakimppua molemmin käsin. Valo: aamuaurinko
> viistosti joen suunnasta. Rajaus enintään puolivartalo. **Ei näytetä:**
> sillankaaren rakennevuotta tai muuta kysymyksen vastaukseen viittaavaa
> yksityiskohtaa — silta saa näkyä vain yleisenä, epätarkkana maamerkkinä.

---

valmis
