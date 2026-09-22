# Sofia — lähteenvartija Nadia

Ennakkotarkistus (pyydetty ennen kirjoitusta): `js/kohtaamiskuvat-data.js`
sisältää jo hyväksytyn ("tila: tarkistettu") kuvakonseptin Sofialle —
`sofia-nadia-mineraalilahde-v2.jpg`, hahmo Nadia — ja koodikommentti
(rivit 376–379) toteaa nimenomaisesti: *"MILA JÄÄ ARKISTOON:
tarinakaaressa Sofian kohtaamisen hahmo on lähteenvartija Nadia... pelin
kohtaamiskortille menee Sofiassa Nadia."* Lisäksi `js/tyohuone-kehitys-
data.js` (KAARI_PAKETIT, id `'sofia'`) sisältää jo täyden, hyväksytyn
tarinakaaren Nadialle lämpölähteellä. `docs/kuvatuotanto-kohtaamiset.md`:ssä
ei ole Sofia-mainintaa (taulukko ei vielä kata sitä).

**Tämä raportti käyttää siis olemassa olevaa hyväksyttyä hahmoa (Nadia,
lähteenvartija) eikä keksi uutta.** Alla on `js/packs/kohtaamiset.js`-
tyylinen kohtaaminen-rivi Sofialle — tätä tarvitaan kaupungin
*myöhempien tavallisten visojen* avaukseksi (sama rooli kuin Dubrovnik/
Venetsia-riveillä: tarinakaaren oma `kohtaaminen`-kenttä hoitaa
ensimmäisen, tämä rivi hoitaa loput).

**hahmo:** "lähteenvartija Nadia"
**nappi:** "Tapaa Nadia"
**frame:** "Nadia kääntyy lähteeltä kauhaa käsissään ja kysyy"
**tervehdys:** "Nadia laskee kauhansa altaan reunalle ja vilkaisee vanhaa vihkoasi. \"Tämä vesi kupli täällä jo isoisäsi aikaan, kun kaupunki kuului vielä toiselle valtakunnalle. Näytä että tunnet maailmaa kuten piirtäjä — niin kerron, mitä lähde muistaa.\"" (239 merkkiä)

**tervehdysLuenta:**
```
[
  { rooli: 'kertoja', teksti: 'Nadia laskee kauhansa altaan reunalle ja vilkaisee vihkoasi:' },
  { rooli: 'hahmo', teksti: '[curious] "Tämä vesi kupli täällä jo isoisäsi aikaan. [warmly] Näytä että tunnet maailmaa kuten piirtäjä — niin kerron, mitä lähde muistaa."' },
]
```
(hahmon repliikki 140 merkkiä)

**loyto:** "Nadia nostaa rasian kauhan vierestä: \"Tämä on täyttynyt höyryssä vuosia. Kukaan ei tullut hakemaan sitä.\"" (105 merkkiä)

**loytoLuenta:**
```
[
  { rooli: 'kertoja', teksti: 'Nadia nostaa rasian kauhan vierestä:' },
  { rooli: 'hahmo', teksti: '[softly] "Tämä on täyttynyt höyryssä vuosia. [surprised] Kukaan ei tullut hakemaan sitä."' },
]
```

**tyhja:** "Nadia kääntää tyhjän kauhan ylösalaisin: \"Ei mitään. Höyry vie täältä yhtä paljon kuin vesi tuo.\"" (97 merkkiä)

**vaarin:** "Nadia täyttää kannun uudelleen: \"Ei vielä. Lähde ei ehdy — voit tulla kysymään huomennakin.\"" (92 merkkiä)

**tunnetagit:**
```
tunneTervehdys: { tunne: 'lammin', voimakkuus: 0.5 }   // Nadia on lämmin heti alusta (ei epäluuloinen tai etäinen kuin monet muut hahmot); sama linja kuin arc:n omassa tunneKohtaaminen ('lammin', 0.5) js/tyohuone-kehitys-data.js:ssä — jatkuvuus hahmon äänessä.
tunneLoyto: { tunne: 'ilo', voimakkuus: 0.7 }
tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 }
tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 }
```

**1873-fakta ja lähde:** Sofia oli 1873 yhä osa Osmanien valtakuntaa
(Bulgaria itsenäistyi vasta 1878, Sofiasta tuli pääkaupunki 1879).
Kaupungin keskustan kuumat mineraalilähteet (n. 46 °C) olivat kuitenkin
jo tuolloin arkipäiväisessä käytössä: roomalaisajan Serdican jälkeen
osmanit rakensivat lähteiden päälle hamamin (julkisen kylpylän), joka
palveli kaupunkilaisia päivittäin aina 1800-luvun lopulle asti, jolloin
se rappeutui ja korvattiin vasta 1905–1913 nykyisellä kylpyläraken-
nuksella. Sama vesi kuplii samassa paikassa yhä. Tämä on juuri se
konkreettinen, isoisän ajan ja nykyhetken yhdistävä asia, johon
tervehdys viittaa ("Tämä vesi kupli täällä jo isoisäsi aikaan") —
ilman kärjistystä osmanikaudesta, vain arkinen infrastruktuurifakta.
Lähteet: en.wikipedia.org/wiki/Banya_Bashi_Mosque (moskeija valmistui
1566 suoraan lähteiden päälle, yhä toiminnassa); en.wikipedia.org/wiki/
Sofia_Central_Mineral_Baths (osmanien hamami palveli asukkaita "until
it fell into disrepair in the late 19th century", ennen 1905–1913
rakennusta). Tarinakaaren oma kysymys (Roomalaiset rakensivat Serdican
kylpylät, keisari Konstantinuksen "Serdica on minun Roomani" -sitaatti)
säilyy koskemattomana — tämä uusi tervehdys ei muuta sitä eikä paljasta
vastausta.

**Olemassa oleva kuvamateriaali:** `sofia-nadia-mineraalilahde-v2.jpg`
(tila: tarkistettu/hyväksytty) kuvaa jo täsmälleen tämän hahmon ja
paikan: Nadia säikähtää vierasta ja pärskäyttää vettä rinnuksilleen
mineraalilähteellä, lapsenlapsi purskahtaa nauruun vierestä. Kuva sopii
suoraan tämän kohtaamisen kortti- ja galleriakuvaksi — **uutta kuvaa ei
tarvita**, ellei Fable halua erillistä toista kuvakulmaa tavallisen
(ei-kaari-) kohtaamisen omaan käyttöön.

**Kuvatilaus Codexille (valinnainen, jos halutaan toinen kulma):**
Nadia, n. 55–65-vuotias bulgarialainen nainen, käytännölliset työvaatteet
ja esiliina kosteudensietävästä kankaasta, hihat käärittynä, hiukset
huivissa höyryn vuoksi. Tekeminen kesken: hän on juuri laskemassa
metallikauhaa altaan reunalle, kädet vielä märät kuumasta lähteestä.
Kaksi aikakerrosta: taustalla vanha kivinen kylpyläallas ja siitä
nouseva höyry (ikivanha, ajaton elementti — sama vesi kuin 1800-luvulla),
edustalla nykyaikainen muovikannu tai retkipullo täyttöä odottamassa
sekä ehkä kännykkä taskussa. Ilme/reaktio: yllättynyt mutta lämmin
sivukatsahdus vieraaseen — ei epäluuloinen, vaan hyväntahtoisen utelias,
katse suoraan kameraan/pelaajaan. Valo/sää: sisätila tai katettu allas,
pehmeä diffuusi valo höyryn läpi, lämmin sävy (kellertävä/oranssi
hehku vastapainona harmaalle kivelle). Ei antiikin Serdicaa, ei
roomalaishahmoja, ei kysymyksen vastausta (Roomalaiset) näkyviin.

valmis
