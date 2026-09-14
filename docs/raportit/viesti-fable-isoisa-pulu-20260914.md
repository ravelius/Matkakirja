# Viesti Fablelle: isoisän ja pulun kuvat kaupungin yläpuolelle, isommiksi

Karttauudistuksen PAATOKSET 12 kohta 2 (omistaja 14.9.2026, sanatarkasti):
*"isoisan ja pulun kuvat ovat liian pienella ja vaarassa paikassa
(pitaisi olla hieman pariisin ylapuolella)."*

Ei versionostoa, ei muutoslokiriviä, ei Raamattua — ne jäävät Fablelle.

## 1. MITATTU LÄHTÖTILA — kaksi eri vikaa, ei yhtä

Savuke `tools/savukkeet/savuke-isoisa-pulu.mjs` (Chromium, pelitallenne,
saapumisnäkymä, kolme kaupunkia × kaksi ruutua). Luku on **valokuvan oma
laatikko** (`img`), ei paneelin — paneelissa on myös kuvatekstilappu, joka
on pienenä läpinäkyvä mutta varaa yhä tilaa.

| ruutu / kaupunki | isoisän VALOKUVA | paikka kaupungista | pulun nappi |
|---|---|---|---|
| 390 × 844 / **Pariisi** | **15,9 × 11,0** | +48 px oikealle, alareuna **14 px ALAS** | 48 × 48, ruudun oikea alanurkka (368 px kaupungin alapuolella) |
| 390 × 844 / Marseille | 48,2 × 33,1 | yläpuolella, 79 px sivussa | sama nurkka |
| 390 × 844 / Ateena | 18,8 × 12,9 | +47 px oikealle | sama nurkka |
| 1400 × 900 / Pariisi | 17,9 × 12,4 | +199 px oikealle | sama nurkka |
| 1400 × 900 / Marseille | **128,7 × 88,4** | yläpuolella | sama nurkka |
| 1400 × 900 / Ateena | 69,9 × 48,0 | +173 px oikealle | sama nurkka |

### Vika 1: KOKO OLI SATTUMAN VARASSA, EI VALITTU

Pienen kuvan koko oli kiinteä osuus (`--luentakuva-pienennys` 0,16)
**ISON kuvan leveydestä**, ja ison kuvan leveys on se, mikä sattuu
mahtumaan matkakirjakortin ja kaupungin laatan väliin
(`js/saapumisasento.js luentakuvanSijainti`). Sama kuva oli siis
Pariisissa **11,0 px** ja Marseillessa **88,4 px** korkea — **kahdeksankertainen
ero, jota kukaan ei ollut valinnut.** Kolme kuutta mittauksesta jäi alle
24 css-pikselin.

Edellinen mittaus (nimet/merkit-erän raportti) arveli, että kuva kasvaa
itsestään, kun saapumiskorkeus korjataan. **Mittaus ei tue sitä:** ero
kaupunkien välillä ei tule zoomista vaan siitä, paljonko kortin ja laatan
väliin jää tilaa, ja se vaihtelee kaupungeittain samallakin zoomilla.

### Vika 2: PIENI KUVA PERI ISON KUVAN PAIKAN

Ankkuri jäi siihen, mihin ISO kuva mahtui. Saapumisnäkymän ollessa tiukka
(v1872, maa lähes ruudun reunoihin) se oli Pariisissa **kaupungin
alapuolella ja sivussa** — täsmälleen omistajan *"vaarassa paikassa"*.

Pulun nappi taas oli **ruudun kaluste**, ei kartan: oikea alanurkka
(`.pollo-kelluu-kartalla`, omistajan linjaus 24.8.2026 *"pöllö pysyvästi
leijuvana sivuelementtinä"*). Se linjaus koski sitä, ettei nappi asu
alanappirivissä; uusi sana siirtää sen kaupungin päälle, ja nappi kelluu
yhä — vain kiinnityskohta vaihtuu. Kirjattu tähän, kuten pyysit.

## 2. KOKO: KAKSI EHDOKASTA MITATTU, PIENEMPI VALITTU

Vanha Pariisi/puhelin oli paneelin laatikkona 25,2 px. Ehdokkaat olivat
1,6 × (**40 px**) ja 2,0 × (**50 px**), ja molemmat ajettiin läpi samalla
savukkeella:

| ehdokas | valokuva puhelimella | savuke | mitä hajosi |
|---|---|---|---|
| **40 px (valittu)** | 42–43 px | **71/71** | — |
| 50 px | 53–54 px | 70/71 | Ateenan nimikyltti jäi 89,6 px² kuvan alle puhelimella: isompi kuva ei enää mahtunut kyltin ja kaupungin väliin |

Sääntö oli valita pienempi, ellei se jää puhelimella alle 24 css-pikselin —
40 px ei jää (mitattu 42–43 px). 40 px on myös omistajan aiemman linjauksen
mukainen (11.9.2026: pieni pino on *"vain vähän pelinappulaa korkeampi"*;
pelinappula on 36 px). Kuvat: `isoisa-pulu-puhelin.jpg` (40 px) ja
`isoisa-pulu-koko50-puhelin.jpg` (50 px).

**Koko on nyt MITTA, ei osuus.** `PIENEN_KUVAN_KORKEUS_PX` on valokuvan
korkeus, ja pienennyskerroin lasketaan siitä. Kartan mittakaava
(`--luentakuva-karttaskaala`) kertautuu siihen kuten ennenkin, joten
omistajan 11.9.2026 linjaus *"pienenevät jos zoomataan ulos kartalla"*
pätee sellaisenaan.

## 3. MITATTU LOPPUTILA

| ruutu / kaupunki | isoisän VALOKUVA | kuvan alareuna kaupungin yläpuolella | pulu |
|---|---|---|---|
| 390 × 844 / **Pariisi** | **62,0 × 43,1** | **26,4 px** | 48 × 48 kuvan oikealla puolella, sama korkeus |
| 390 × 844 / Marseille | 61,5 × 42,2 | 26,9 px | sama |
| 390 × 844 / Ateena | 61,3 × 42,1 | **73,2 px** (nimikyltin väistö) | sama |
| 1400 × 900 / Pariisi | 61,9 × 43,0 | 26,9 px | sama |
| 1400 × 900 / Marseille | 61,4 × 42,2 | 15,7 px | sama |
| 1400 × 900 / Ateena | 65,7 × 45,1 | **63,6 px** (nimikyltin väistö) | sama |

Kuvien koko on nyt sama kaikilla kuudella (42–45 px; hajonta on kartan
mittakaava ja kuvan oma kallistus) — ennen 11–88 px.

**Päällekkäisyys nimikyltin ja turisti-info-merkin kanssa on 0 px² kaikissa
kuudessa**, ja pulun napautus avaa chatin molemmilla ruuduilla (mitattu).

Kuvat: `docs/raportit/kuvat/isoisa-pulu-ennen-puhelin.jpg` (ennen),
`isoisa-pulu-puhelin.jpg` ja `isoisa-pulu-tyopoyta.jpg` (jälkeen).
Jälkimmäisissä chat-paneeli on auki, koska savuke mittaa samassa ajossa
myös pulun napautuksen.

### NIMIKYLTTI EI VÄISTÄ, JOTEN PARI VÄISTÄÄ

Ateenassa kaupungin nimikyltti ladotaan kaupungin YLÄPUOLELLE (mitattu
55 px), eli tasan siihen, mihin pari asettuu. Kyltti on kartan omaa
mustetta eikä tunne DOM-kerrosta, joten pari nousee sen yli. Nosto
1. lasketaan kyltin paikasta, 2. **korjataan mitatusta peitosta**
(takaisinkytkentä: jos piirretty valokuva yhä koskettaa kylttiä, nosto
kasvaa juuri sen verran) ja 3. **ei koskaan laske kesken kaupungin** —
ladonta ajaa viisi kertaa sekunnissa, ja molempiin suuntiin seuraava kuva
nykisi lakkaamatta. Katto on neljännes näkymän korkeudesta.

## 4. MUUTOS

- **`js/saapumisasento.js`** (uusi, testattava geometria ilman DOMia):
  `PIENEN_KUVAN_KORKEUS_PX` (40), `PIENEN_KUVAN_NOSTO_PX` (29 = puolet
  kaupungin laatasta + sama ilmarako kuin isolla kuvalla),
  `PULUN_NAPIN_KOKO_PX`, `PARIN_RAKO_PX` ja `pienenKuvanParinPaikat`:
  pari (kuva + rako + pulu) keskitetään kaupungin pystylinjalle.
- **`js/fokusvirta.js`**: pienennyskerroin lasketaan luvatusta
  korkeudesta; `asetaParinAnkkuri` siirtää pienen kuvan ankkurin kaupungin
  yläpuolelle (ja uusintamittaus ei enää vie sitä takaisin ison kuvan
  kohtaan); kehyssilmukka kirjoittaa pulun napin keskipisteen
  ikkunakoordinaatteina kahteen css-muuttujaan.
- **`css/styles.css`**: yksi sääntö,
  `body.pulu-kaupungin-paalla .pollo-nappi.pollo-kelluu.pollo-kelluu-kartalla`
  — nappi keskitetään kirjoitettuun pisteeseen. Koko, väri, napautusala ja
  kuplien ankkurointi ennallaan.
- **`js/pollo.js`: EI MUUTOKSIA.** Tämä on Codexin omistama tiedosto, ja
  sijoitus saatiin tehtyä kokonaan sen ulkopuolelta: nappi pysyy
  `position: fixed` -kalusteena, vain kiinnityskohta tulee kartalta.
  Pulun eleisiin, chattiin tai ääneen ei koskettu. **Codexille tiedoksi:**
  kun `body.pulu-kaupungin-paalla` on päällä, napin `left`/`top` tulevat
  muuttujista `--pulu-kartalla-x` / `--pulu-kartalla-y`; luokka on päällä
  vain silloin, kun isoisän pieni kuva on kartalla, ja lähtee
  `irrotaLuentakuvanAnkkuri`ssa.

Pelaajan oma siirto voittaa yhä (Raamattu, LUENTAKUVAA VOI ITSE
LIIKUTTAA): raahattua kuvaa ei napata takaisin kaupungin päälle, ja pulu
kulkee kuvan mukana sinne, mihin se raahattiin.

## 5. VASTAKOE (pakollinen, tehty)

Korjaus kumottiin väliaikaisesti (`git stash` js/fokusvirta.js,
js/saapumisasento.js, css/styles.css) ja **sama savuke ja samat testit**
ajettiin uudelleen. Muuta ei muutettu.

| | korjattuna | korjaus kumottuna |
|---|---|---|
| savuke `savuke-isoisa-pulu.mjs` | **71/71** | **55/71** |
| Pariisi/puhelin, valokuvan korkeus | **43,1 px** | **11,0 px** |
| Pariisi/puhelin, kuvan alareuna | **26,4 px kaupungin YLÄPUOLELLA** | **14,3 px kaupungin ALAPUOLELLA** |
| pulu Pariisissa/puhelimella | kuvan vieressä, 71 px kaupungin yläpuolella | ruudun alanurkassa, 368 px kaupungin alapuolella |
| kuvan korkeuden vaihteluväli kuudessa mittauksessa | **42,1–45,1 px** | **11,0–88,4 px** |
| `tests/luentakuva.test.mjs` | **# pass 24, # fail 0** | # pass 23, # fail 1 (uusi vartio) |

Punaisiksi kääntyivät täsmälleen ne vartiot, jotka mittaavat kokoa ja
paikkaa; chat-, päällekkäisyys- ja JS-virhevartiot pysyivät vihreinä
kumotussakin ajossa, kuten pitääkin.

## 6. TESTIT JA SAVUKE

- **`tests/saapumisasento.test.mjs`** (5 uutta vartiota): pari on
  kaupungin yläpuolella, pulu on kuvan oikealla puolella luvatun raon
  päässä, pari on keskitetty kaupungin pystylinjalle, nimikyltin väistö
  nostaa eikä laske (**vastakoe**: puuttuva nosto ei pudota paria
  kaupungin päälle) ja valittu korkeus on vähintään 24 px.
- **`tests/luentakuva.test.mjs`**: vanha vartio *"pienennetty kuva pysyy
  ankkurissaan"* **kääntyi päinvastoin** — juuri se sääntö piti pienen
  kuvan ison kuvan paikassa eli kaupungin alapuolella. Tilalla kaksi
  vartiota: pienennys siirtää ankkurin kaupungin yläpuolelle (ja se on yhä
  LAUDAN piste, ei ruudun kulma), ja raahattua kuvaa pienennys ei siirrä.
- **`tools/savukkeet/savuke-isoisa-pulu.mjs`** (uusi, 71 vartiota):
  oikea peli pallolaudalla, kolme kaupunkia × kaksi ruutua, mitat
  valokuvan ja kaupungin piirretystä pisteestä (`getScreenCoords`).
  Ajettu kolme kertaa peräkkäin, **71/71 joka kerta.**

## 7. PORTIT

| portti | tulos |
|---|---|
| `npm test` | # pass 3352, # fail 0 (13 skipped, ennallaan) |
| `tools/tarkista-kaksoisavaimet.mjs` | ei kaksoisavaimia |
| `tools/tarkista-niputus.mjs` | 387 moduulia, ei törmäyksiä |
| `tools/tarkista-savukkeet.mjs` | 1660 ui-viittausta, kunnossa |
| `savuke-isoisa-pulu.mjs` | 71/71 (×3) |

## 8. MITÄ EI TEHTY

Ei versionostoa, ei muutoslokia, ei Raamattua, ei mergeä, ei dist/:iä.
Ei koskettu tiedostoihin `js/pallolauta/nimet.js`, `js/nostot.js`,
`js/pallolauta/maapaneeli.js`, `js/luenta.js` eikä Ranskan nostodataan —
ne ovat muilla agenteilla.

**Yksi asia jäi auki Fablelle:** kaupungeissa, joissa nimikyltti ladotaan
kaupungin yläpuolelle, pari nousee 60–75 px kaupungin yläpuolelle eikä
29 px:n päähän. Se on yhä *"hieman yläpuolella"*, mutta ero näkyy, jos
omistaja vertaa Pariisia ja Ateenaa vierekkäin. Vaihtoehto olisi antaa
nimen ladonnan väistää paria — se on `js/pallolauta/nimet.js`, eli toisen
agentin tiedosto, eikä sitä tehty tässä.
