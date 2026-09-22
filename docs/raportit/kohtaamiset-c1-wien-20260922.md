# Kohtaamisehdotus: Wien

Sisällöntuotannon raportti — EI muokattu js/packs/kohtaamiset.js:ää.
Odottaa Fablen (päätoimittajan) hyväksyntää ennen kuin tämä siirretään
peliin.

Huomio taustatyöstä: docs/kuvatuotanto-kohtaamiset.md:n taulukossa Wienin
rivillä lukee "64-vuotias Anton jatkaa juoksuaskelta ... Vanha
pörssirakennus bokehissa", mutta js/kohtaamiskuvat-data.js:ssä on jo
TARKISTETTU (hyväksytty) kuva `wien-anton-katakombit-v2.jpg`, jossa Anton
on katakombiopas/suntio kynttilöineen (myös docs/arkisto/fable-tilanne.md:
"Anton (Wien, suntio)"). Nämä kaksi kuvausta eivät täsmää keskenään —
alla oleva kohtaaminen on kirjoitettu KATAKOMBI-Antonin mukaan, koska
sillä on jo hyväksytty kuva. Pörssirakennus-juoksija vaikuttaa
vanhentuneelta/hylätyltä konseptilta; Fable päättänee kumpi jää voimaan.

## Wien — suntio Anton

**hahmo:** "suntio Anton"

**nappi:** "Tapaa Anton"

**frame:** "suntio Anton pysäyttää kynttilän ja kysyy"

**tervehdys:** "Anton nostaa kynttilän kirjaasi kohti pimenevässä
käytävässä. \"Isoisäsi taisi ihailla näyttelyn ihmeitä, samana kesänä
kun kolera kulki kaupungilla nopeammin kuin sana siitä. Näytä että
tunnet maailmaa kuten piirtäjä — niin näytän, minne historia täällä
oikeasti katosi.\"" (271 merkkiä)

**tervehdysLuenta:**
```
[
  { rooli: 'kertoja', teksti: 'Anton nostaa kynttilän kirjaasi kohti '
    + 'pimenevässä käytävässä.' },
  { rooli: 'hahmo', teksti: '[gravely] "Isoisäsi taisi ihailla näyttelyn '
    + 'ihmeitä, samana kesänä kun kolera kulki kaupungilla nopeammin '
    + 'kuin sana siitä. [warmly] Näytä että tunnet maailmaa kuten '
    + 'piirtäjä — niin näytän, minne historia täällä oikeasti katosi."' },
]
```

**loyto:** "Anton harjaa pölyn esineeltä kynttilänvalossa: \"Tämä ei
kuulu tähän holviin. Joku toi sen tänne aikoja sitten, piiloon.\""
(120 merkkiä)

**loytoLuenta:**
```
[
  { rooli: 'kertoja', teksti: 'Anton harjaa pölyn esineeltä '
    + 'kynttilänvalossa:' },
  { rooli: 'hahmo', teksti: '[softly] "Tämä ei kuulu tähän holviin. '
    + 'Joku toi sen tänne aikoja sitten, piiloon."' },
]
```

**tyhja:** "Anton siirtää kynttilää syvemmälle koloon: \"Tyhjä. Nämä
holvit ovat vaihtaneet omistajaa monta kertaa vuosisatojen varrella.\""
(125 merkkiä)

**vaarin:** "Anton pudistaa päätään, kynttilä yhä pystyssä: \"Ei tuo.
Täällä alhaalla vastaukset odottavat, kunnes joku katsoo tarkemmin.\""
(124 merkkiä)

**tunnetagit:**
```
tunneTervehdys: { tunne: 'vakava', voimakkuus: 0.5 }
  // Anton ei tervehdi lämpimästi vaan totisesti — kolera-viittaus on
  // dekkarisävyinen kontrasti isoisän innostukseen (rekisterin
  // poikkeus, kuten Lontoon ja Venetsian tervehdyksissä).
tunneLoyto: { tunne: 'ilo', voimakkuus: 0.7 }
  // Rekisterin oletus: löytö on pelin suuri hetki.
tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 }
  // Rekisterin oletus: "Tyhjä…" jää pohtimaan, ei moiti.
tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 }
  // Rekisterin oletus: väärä vastaus saa lohduttavan sävyn.
```

**1873-fakta ja lähde:** Wienin maailmannäyttely (Weltausstellung)
pidettiin 1.5.–31.10.1873 Praterissa; kävijöitä oli n. 7,2 miljoonaa
odotetun 20 miljoonan sijaan. Näyttelyn avaamisen jälkeen, 9.5.1873
("musta perjantai"), Wienin pörssi romahti (Gründerkrach). Kesäkuussa
1873 kaupunkia riepotteli vakava koleraepidemia, joka vaati kesän
aikana lähes 3000 kuolonuhria Wienissä ja karkotti näyttelyvieraita.
Kohtaamisen kytkös käyttää koleraepidemiaa (ei väitetä, että uhrit
haudattiin nimenomaan Antonin oppaana kiertämiin katakombeihin — tätä
ei lähteistä vahvistu, joten teksti pitää sen yleisenä ajallisena
kontrastina isoisän innostuneeseen näyttelykuvaukseen).
- en.wikipedia.org/wiki/1873_Vienna_World%27s_Fair
- habsburger.net/en/events/stock-exchange-crash-1873
- en.wikipedia.org/wiki/Panic_of_1873

**Kuvatilaus Codexille:**
Suositus: tarkista ensin, riittääkö jo TARKISTETTU
`wien-anton-katakombit-v2.jpg` (js/kohtaamiskuvat-data.js) sellaisenaan
— sen kuvateksti ("Anton pysähtyy kynttilät kädessään katakombien
portaille... siristää silmänsä vierasta kohti eikä väisty") vastaa jo
tätä kohtaamista, eikä uutta kuvaa välttämättä tarvita. Jos silti
tilataan uusi tai täydentävä kuva, briiffi:
- Hahmo: mies, n. 55–60-vuotias, kirkon suntio/oppaan olemus; siisti
  tummanharmaa virkatakki tai vanhahtava villatakki ja solmio, hieman
  kulunut kangas, iso vanha avainkimppu vyöllä.
- Tekeminen kesken kuvaa: pysähtynyt askel kesken katakombikierroksen
  kivisessä holvikäytävässä; nostaa vahakynttilän tai vanhan lyhdyn
  pelaajan matkakirjaa kohti, toinen käsi vasten kylmää kiviseinää
  tasapainoksi.
- Kaksi aikakerrosta: satoja vuosia vanhat kivi- ja luuholvit taustalla
  (hämärä, ei näy suoraan kalloja lähikuvassa) vs. nykyaikainen pieni
  vihje suntion arjesta (esim. muovinen avainkortti taskussa,
  taskulampun moderni klipsivalo vyöllä) — kirja tuo isoisän ajan.
- Ilme/reaktio aarrekysymykseen: totinen, tutkiva puolihymy — vakava
  muttei pelokas eikä vihamielinen; katsoo suoraan kameran linssiin
  (pelaajaan), ei ohi.
- Valo/sää: sisätila, ei säätä; lämmin, matala kynttilän/lyhdyn valo
  viistosti alhaalta tai sivulta, tausta pehmeästi sumea ja pimeä,
  silmät ja kasvojen keskiosa terävinä. Ei kuvatekstiä, logoja eikä
  luettavissa olevia hautakirjoituksia tai vuosilukuja kuvassa.

Ei valmis: odottaa Fablen tarkistusta (mm. kumpi Anton-konsepti —
katakombit vai pörssirakennuksen juoksija — jää voimaan) ennen siirtoa
js/packs/kohtaamiset.js:ään.
