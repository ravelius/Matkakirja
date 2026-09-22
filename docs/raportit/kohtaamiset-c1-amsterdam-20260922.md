# Kohtaamiset-raportti: Amsterdam (c1)

Tämä on sisällöntuotantoraportti Fablen (päätoimittajan) tarkastettavaksi.
**Ei kosketettu** `js/packs/kohtaamiset.js`-tiedostoa — rivi lisätään
sinne vasta hyväksynnän jälkeen.

## Amsterdam — muuttotyöntekijä Yara

**hahmo:** "muuttotyöntekijä Yara"
**nappi:** "Tapaa Yara"
**frame:** "Yara pysäyttää nostoköyden hetkeksi ja kysyy"
**tervehdys:** "Yara nojaa kärryyn ja vilkaisee kirjaasi: \"Pääty on yhä yhtä kapea kuin sata viisikymmentä vuotta sitten. Näytä että tunnet mitat kuten minä, niin kerron mistä koukku löytyy.\"" (175 merkkiä)
**tervehdysLuenta:**
```
[
  { rooli: 'kertoja', teksti: 'Yara nojaa kärryyn ja vilkaisee kirjaasi:' },
  { rooli: 'hahmo', teksti: '[curious] "Pääty on yhä yhtä kapea kuin sata '
    + 'viisikymmentä vuotta sitten. [warmly] Näytä että tunnet mitat kuten '
    + 'minä, niin kerron mistä koukku löytyy."' },
]
```
(sanasta sanaan sama kuin tervehdys, vain tunnetagit lisätty — talon sääntö)

**loyto:** "Yara nostaa rasian kämmenelleen ja hihkaisee yläkertaan: \"Löytyi! Ei tänään lipu ovesta, mutta pääty piti paikkansa.\"" (117 merkkiä)
**loytoLuenta:**
```
[
  { rooli: 'kertoja', teksti: 'Yara nostaa rasian kämmenelleen ja hihkaisee '
    + 'yläkertaan:' },
  { rooli: 'hahmo', teksti: '[surprised] "Löytyi! [pleased] Ei tänään lipu '
    + 'ovesta, mutta pääty piti paikkansa."' },
]
```

**tyhja:** "Yara koputtaa koukun kohdalle ja pudistaa päätään: \"Tyhjä. Tässä päädyssä vaihtuu tavaraa useammin kuin luulisi.\"" (113 merkkiä)

**vaarin:** "Yara laskee köyden hetkeksi: \"Ei ihan. Minäkin luin nuo mitat väärin, kunnes joku opetti katsomaan koukusta asti.\"" (114 merkkiä)

**tunnetagit:**
```
tunneTervehdys: { tunne: 'utelias', voimakkuus: 0.5 }
  // Yara tarkistaa kirjan mitat ammattisilmällä eikä esittele kaupunkia —
  // uteliaisuus kohdistuu kirjaan, ei lämpöön (sama rekisteripoikkeus kuin
  // Leilalla/Maralla, docs/pulu-reaktiot.md E2).
tunneLoyto: { tunne: 'ilo', voimakkuus: 0.65 }
  // Löytö on pelin iloinen hetki, mutta Yara on kiireinen ammattilainen
  // kesken työpäivän — hieman hillitympi kuin rekisterin oletus 0.7.
tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 }
  // Rekisterin oletus: Yara jää pohtimaan kiertoa eikä moiti pelaajan
  // oikeaa vastausta.
tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 }
  // Yara lohduttaa omalla erehdyksellään — sama lohduttava malli kuin
  // muissa kaupungeissa (Lontoo, Dubrovnik).
```

## 1873-fakta ja lähde

Amsterdamin kanavatalojen kapeus juontuu 1600-luvulta lähtien käytössä
olleesta kiinteistöverosta, joka laskettiin julkisivun leveyden mukaan —
mitä kapeampi pääty kadulle päin, sitä pienempi vero. Samalta ajalta ovat
peräisin päätyjen **hijsbalk**-nostopuut/-koukut: kauppiaat halusivat
nostaa tavaransa suoraan kanavaveneestä ullakolle, koska portaat olivat
liian jyrkät ja kapeat huonekaluille. Monet talot rakennettiin myös
tarkoituksella hieman etukenoon, jottei nostettava tavara hankaa
julkisivua vasten noustessaan. Vuonna 1873 (isoisän matkavuonna) tämä
järjestelmä oli jo yli 200 vuotta vanha eikä mikään uutuus — ja se on
sanatarkasti sama tänään: koukut ovat yhä käytössä huonekalujen nostoon,
koska portaat eivät edelleenkään mahdu niille. Tämä on siis kontrasti,
jossa isoisän kirja olisi *edelleen täysin oikeassa* eikä vanhentunut —
Yaran repliikki nojaa juuri tähän (”yhä yhtä kapea kuin sata
viisikymmentä vuotta sitten”).

Lähteet: [Canal house — Wikipedia](https://en.wikipedia.org/wiki/Canal_house);
[Why Dutch Houses Have Those Hooks on the Facades — Amsterdamian](https://amsterdamian.com/see/amsterdam/why-dutch-houses-have-those-hooks-on-the-facades/);
[Amsterdam canal houses: why are they so wonderfully weird? — DutchReview](https://dutchreview.com/culture/amsterdam-canal-houses/).

Sama fakta (leveysvero, nostokoukku huonekaluille) on jo pelin omassa
tarkistetussa aineistossa: `js/packs/europe-kulttuuri.js` (amsterdam-kysymys
"Miksi Amsterdamin vanhat kanavatalot ovat niin kapeita?") ja
`js/packs/kulttuuri-kategoriat.js` (nosto "Verotettiin julkisivun
leveydestä") sekä tarinakaaren Amsterdam-kohtaamisen kysymyksenä
(`js/tyohuone-kehitys-data.js` KAARI_PAKETIT / `js/packs/
fokusvirta-amsterdam.js`: "Amsterdamin vanhojen talojen päädyssä on
melkein aina koukku katonrajassa. Mitä varten?" → "Huonekalut nostetaan
sisään ikkunoista, koska portaat ovat liian kapeat"). Tämän rivin teksti
ei siis keksi uutta faktaa vaan viittaa samaan, jo hyväksyttyyn asiaan
eri sanoin paljastamatta sitä suoraan.

## Hyväksytyt6-pohja käytetty: KYLLÄ

`posti/kohtaamiset-hyvaksytyt6-pelitoimitus-2026-09-05.json` (rivi
`amsterdam-yara-feedback-r20260905-v2`) sisälsi jo omistajan hyväksymän
hahmon **Yara — muuttoryhmän vetäjä**, kuvatekstin ja -promptin. Tämä on
myös sama hahmo, jonka Fable on jo ottanut tarinakaaren viralliseksi
Amsterdam-kohtaamiseksi (`js/tyohuone-kehitys-data.js` KAARI_PAKETIT,
kommentti: "HAHMO VAIHDETTU: siltavahti Willem → muuttotyöntekijä Yara
… Fablen päätös klo 20:05 UTC"). Käytin siis Yaraa pohjana enkä keksinyt
uutta hahmoa: sama nimi, ammatti (kanavatalojen muuttokuormat, kaappien
mittaaminen, nostoköysi/-koukku) ja sama tapa puhua nopeasti ja hävitä
kesken lauseen nostamaan jotain raskasta (kuvattu KAARI-paketin
`teksti`-kentässä). Tämä `kohtaamiset.js`-rivi on tarkoitettu kaupungin
**myöhempien** tavallisten visojen avaukseksi (sama rooli kuin Leilalla
Lontoossa ja Maralla Dubrovnikissa) — tervehdys ja repliikit on kirjoitettu
kokonaan uusina, ei kopioitu KAARI-paketin omasta dialogista, jottei
sanasta sanaan -sääntö riko kaarikohtaamisen omaa tekstiä.

Huom: `docs/kuvatuotanto-kohtaamiset.md`-taulukon Amsterdam-rivi on
vanhentunut ja mainitsee yhä vanhan Willem-hahmon
("Willem pysähtyy nykyajan kaupunkipyörällä kanaalisillalle") — sitä ei
ole päivitetty Yara-vaihdoksen jälkeen. En muokannut taulukkoa, koska se
ei kuulunut tähän tehtävään, mutta Fable tai Opus voi haluta korjata sen
erikseen.

## Kuvatilaus Codexille

**Kuva on jo olemassa ja hyväksytty — suositus: käytä sitä sellaisenaan,
älä tilaa uutta.** `amsterdam-yara-feedback-r20260905-v2.jpg` on
merkitty `js/kohtaamiskuvat-data.js`:ssä tilaan `tarkistettu` (rivi 507)
ja sen kuvateksti/`kuvateksti`-kenttä on jo sanatarkasti:

> "Yara on keskeyttänyt kanavatalon muuton vastatakseen matkaajalle.
> Yläikkunasta kurkistava työpari odottaa lupaa jatkaa, kun aarrekysymys
> muuttaa tilanteen suunnan."

Koska `kohtaamiset.js`:n hahmokuva haetaan kaupunkitasolla
(`kohtaamiskuvaKohteelle(quiz.cityId)` — yksi kuva per kaupunki, ei per
repliikki), tämä sama Yara-kuva kelpaa myös tälle uudelle
myöhemmän-vision rivil­le sellaisenaan. **Ehdotan kuvatekstin
säilyttämistä muuttamattomana.**

Jos Fable silti haluaa TOISEN, vaihtoehtoisen kuvan (esim. jos
alkuperäistä ei aktivoida peliin muusta syystä, tai halutaan visuaalista
vaihtelua eri kohtaamishetkille), tässä varabriiffi samalle,
kanonisoidulle hahmolle:

- **Hahmo:** Yara, n. 35 vuotta, tumma iho, lihaksikas/tukeva vartalo,
  epäsymmetriset lyhyet mustat kiharat, pieni hopeinen rengaskorvakoru.
  Vaatetus: violetti t-paita ja farkkuhaalarit (sama kuin hyväksytyssä
  kuvassa — säilytä hahmon jatkuvuus).
- **Tekeminen kesken kuvan:** Yara on tauolla kanavan varrella kesken
  muuttopäivän — nojaa käsikärryyn tai laskee juuri nostoköyden alas,
  kädessä taitettu siirtohuopa. Ei poseerausta: paino yhdellä jalalla,
  vartalo hieman kiertyneenä kohti kameraa.
- **Kaksi aikakerrosta:** taustalla aito, satoja vuosia vanha kanavatalon
  kapea pääty ja siitä työntyvä puinen hijsbalk-nostokoukku (yhä samassa
  käytössä kuin 1800-luvulla); etualalla nykyaikainen muuttokärry,
  pahvilaatikko ja modernit vaatteet.
- **Ilme/reaktio aarrekysymykseen:** puoliksi epäileväinen, puoliksi
  huvittunut suora katse kameraan — kulmakarva koholla, suu tiukasti
  kiinni pidätellyn hymyn ympärillä. Ei stock-photo-hymyä.
- **Valo/sää:** lämmin aamuaurinko sivulta, viileä heijastus
  kanavavedestä ja -taivaasta varjoissa; selkeä sää, ei sadetta.
- Sivuhahmo (työpari) saa olla taustassa ikkunassa, ei katso kameraan.
- Rajaus enintään puolivartalo, molemmat kädet ja koko pää mukana,
  ei kuvatekstiä/logoa kuvassa.

## Yhteenveto

Käytin Yaraa (hyväksytyt6-pohja, sama kuin tarinakaaren kanoninen
Amsterdam-hahmo) enkä keksinyt uutta henkilöä. 1873-fakta (leveysvero,
hijsbalk-nostokoukku) on tarkistettu Wikipediasta ja tukee jo pelin omaa
hyväksyttyä sisältöä. Kuvaa ei tarvitse tilata uudestaan — olemassa oleva
hyväksytty Yara-kuva ja sen kuvateksti riittävät.

valmis
