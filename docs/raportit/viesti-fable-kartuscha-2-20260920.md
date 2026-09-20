# Opus 2 → Fable: Kartuschan toinen kierros 20.9.2026

Haara `opus2-kartuscha-2` (pohja `origin/v1973-prep`). Omistajan tilaus
klo 13.20, kaappaus
`docs/raportit/kaappaukset/omistaja-20260920/kartuscha-v1976.png`.

## 1. Radionappi isommaksi ja otsikon kanssa keskelle

Valo 0,46 rem → 0,66 rem (7,4 px → 10,6 px) ja teksti 0,46 → 0,56 rem.
Nappi venytetään otsikkorivin korkuiseksi ja sen sisältö keskitetään,
joten valo asettuu otsikon keskiviivalle ilman mitattua lukua.

**Otsikon koko on nyt muuttuja** `--maapaneeli-otsikko`, jota käyttävät
sekä otsikko itse että napin korkeus. Ilman sitä korkeus olisi toisinto,
joka jää jälkeen heti kun otsikko pienenee breakpointissa — mitattuna
keskitysero oli **9,6 px** 390 px:n ruudulla ja 4,3 px 1400 px:llä.

**Juurisyy oli `min-height`.** Pelin napeilla on sormenpään
vähimmäiskorkeus 42 px, ja se voitti asettamani korkeuden: nappi oli
otsikkoa korkeampi ja valo jäi keskiviivan alapuolelle. `min-height: 0`
napille; napautusala ei kärsi, koska kaluste on `pointer-events: none`
ja napautus tulee osumatestistä.

## 2. Lippu otsikon perään, tekstin korkuisena

`.maapaneeli-lippu` otsikkonapin sisällä, korkeus `0,62em` eli sidottu
otsikon omaan kirjasinkokoon. Lähde on sama kuin maalehden
otsikkolipulla (`pack.map.countryShapes[iso].lippu`).

**`span` eikä `button`:** lippu on otsikkonapin sisällä, ja nappi napin
sisällä on virheellistä html:ää. Napautus tulee osumatestistä, joka
poimii lipun **ennen** otsikkoa — muuten lipun napautus avaisi ja
sulkisi kartuschan.

## 3. Lipun napautus avaa lippuikkunan

`avaaLippuikkuna` on jo olemassa (`js/liput.js`), eli tämä on sama ikkuna
kuin muualla pelissä. Lippu on napautettava **vain** niillä mailla,
joilla on `LIPPUTIEDOT`-kirjaus — sama sääntö kuin maalehdessä. Muilla
lippu on pelkkä kuva.

## 4. Valo vilkkuu kanavan haun ajan + virityskohina

Haku kestää napautuksesta siihen, kun lähetys alkaa kuulua tai se
epäonnistuu. Tila luetaan soittimen omasta audio-elementistä: `playing`
päättää haun onnistuneena, `error` ja `emptied` epäonnistuneena, ja
12 s:n aikakatkaisu varmistaa, ettei valo jää vilkkumaan lähetykselle
jota ei tule.

Virityskohina on **maailmanradion oma** (`js/linssit/viritin.js`).
Lisäsin `js/linssit/radio.js`:ään kaksi ohutta vientiä
(`viritysaaniPaalle`, `viritysaaniPois`), jotka käyttävät sen **samaa
viritintä** — kartuscha ja radiolinssi eivät siis voi soittaa kahta
kohinaa päällekkäin. Jos radiolinssi on päällä, se omistaa äänen eikä
kartuscha katkaise sen kohinaa kesken haun.

## 5. Väli vasempaan reunaan sama kuin alareunaan

**Mittasin ensin, ja välit OLIVAT jo samat** työpöytäselaimessa:
390 px 14,6 / 14,6 ja 1400 px 17,0 / 17,0. Kumpikin reuna laski saman
peruskaavan.

Ero syntyy vasta **laitteella**, jossa turva-alueet eivät ole samat:
`safe-area-inset-bottom` on kotipainikepalkin verran suurempi kuin
`-left`, joten kartuscha istui liian vasemmalla ja liian ylhäällä — juuri
se, minkä näit. Korjaus on **yksi luku molempiin**: väli on suurempi
kahdesta turva-alueesta, ja sama muuttuja menee sekä `left`iin että
`bottom`iin. Ne eivät voi enää ajautua erilleen millään laitteella.

**Alareunan turva-aluetta en pienentänyt** — se on laitteen vaatimus,
ei tyylivalinta. Siksi kortti siirtyy **oikealle mutta ei alas**. Jos
haluat sen myös alemmas, se tarkoittaa turva-alueen syömistä, ja se on
oma päätöksensä. **Tätä puolta en pystynyt mittaamaan** tällä koneella,
koska työpöytäselaimessa turva-alueet ovat nollia: vahvistus tarvitaan
omistajan laitteelta.

## Savuke

`tools/savukkeet/savuke-kartuscha-2.mjs`, ruudut 390 ja 1400:
**18/18 vartiota läpi**, ei sivuvirheitä. Väitteet: radio isompi ja
otsikon keskellä (< 4 px) · lippu otsikon oikealla samalla rivillä ja
tekstin korkuisena · lipun napautus avaa ikkunan eikä sulje kartuschaa ·
valo vilkkuu haun ajan ja vilkku päättyy · välit reunoihin samat.
Vastakokeet: **A** maa ilman lipputietoja → lippu ei ole nappi (väite 3
kaatuu); **B** v1976:n asemointi takaisin → nappi ei ole keskellä eikä
isompi (väite 1 kaatuu).

`node --test tests/*.test.mjs`: **3 750 testiä, 0 punaista**.

Kuvat: `docs/raportit/kaappaukset/kartuscha-2-20260920/`.

## Savukkeen rajoite

Hiljainen koe-wav alkaisi soida heti, jolloin `etsii`-luokka ehtisi
syttyä ja sammua kahden mittauksen välissä — savuke luulisi, ettei
vilkkua ole. Siksi koelähetys vastaa **1,5 s viiveellä**, mikä on sama
luokka kuin oikean aseman avautuminen. Tämä on savukkeen asetelma, ei
tuotantokoodin käytös.

## Mitä jäi tekemättä

- **Turva-alueiden puoli (kohta 5)** on päätelty, ei mitattu: tarvitsee
  vahvistuksen omistajan laitteelta.
- **Virityskohina savukkeessa**: mitattu on vilkku, ei ääni. Kohina
  tulee samasta virittimestä kuin radiolinssillä, jolla on omat
  vartijansa.
- **Muut maat kuin Ranska**: lippu ja radio on mitattu FRA:lla;
  lipputiedottoman maan haara on katettu vastakokeella A.
