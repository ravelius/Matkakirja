# Viesti Fablelle — kaiutin VU-mittariksi samalle riville, luentakuvat vinoon pakaksi

**Opus-työagentti, 15.9.2026.** Haara `claude/bold-ride-vow4ki-kaiutin`,
pohjana `origin/main` (v1906). Toimeksianto: Raamatun osio
*"KAIUTIN SAMALLE RIVILLE JA VU-MITTARIKSI; LUENTAKUVAT VINOON PAKAKSI
ILMAN HAIVYTYSTA"* (omistaja 15.9.2026 klo 05.10 UTC, iPhone-kuva
Dubrovnikin saapumisluennasta), sanatarkasti:

> *"Tasaa kaiutin symboli tekstin kanssa samalle riville. Ja onko
> mahdollista animoida kaiuttimen kolmea kaarta elamaan Vu mittarin
> tapaan ja ottaa feidaus animaatio siita pois? Ota isoisan ja pulun
> valokuvista haivytykset pois ja lado ne hieman vinottain toistensa
> paalle vuorotellen vasemmalle ja oikealle kallistettuina. Pida kartta
> pehmennettyna ja tummennettuna."*

**Lyhyesti.** Kaikki neljä tilausta on tehty ja mitattu. Kaiutin on nyt
otsikkotekstin kanssa samalla rivillä (ero **1,59 px → 0,80 px**
puhelimella, **0,09 px** työpöydällä), koko kuvakkeen sykeanimaatio on
poistettu ja tilalle tulivat kolme omaa kaarta, jotka elävät
VU-mittarin tapaan. Isojen luentakuvien reunahäivytys (maski) on
poissa, kuvilla on terävä reuna ja paperireunus, ja ne ladotaan pakaksi
vuorotellen vasemmalle ja oikealle (**−2,0° / +2,4° / −2,8° …**).

**Yksi löydös, jota EN korjannut:** luennan karttahuntu
(`body.luenta-huntu`, KARTTATAUSTA-linjaus) **ei kytkeydy koskaan
päälle v1906:ssa**. Ks. osio 5 — tämä ei kuulunut toimeksiantoon
("kartta pysyy ennallaan"), mutta se selittää, miksi oheiset
kuvakaappaukset eivät ole yhtä tummia kuin omistajan iPhone-kuva.

---

## 1. Kaiutin samalle riville

Mitta: otsikon **ensimmäisen tekstirivin** keskilinja (Range-
asiakaslaatikko) vs. kaiutinkuvakkeen SVG:n keskilinja. Chromium
`/opt/pw-browsers/chromium`, Dubrovnikin saapumisluenta, pallolauta.

| Ruutu | Otsikkorivin keskilinja | Kuvakkeen keskilinja | **Ero ENNEN** | **Ero JÄLKEEN** |
| --- | --- | --- | --- | --- |
| 390 × 844 | 77,36 px | 78,16 px | **1,59 px** | **0,80 px** |
| 1400 × 900 | 86,05 px | 86,14 px | 0,09 px | **0,09 px** |

**Juurisyy oli kaksiosainen ja se näkyi vain puhelimella.**

1. Kutistetulla lapulla (`.fact-card.pieni`) nappi oli yhä
   `position: absolute`. Absoluuttisen ruudukkolapsen `top` mitataan
   sen omasta ruudukkoalueesta, jolloin `align-self: center` jää
   käyttämättä — kuvake istui `--kortti-pehmuste-y`:n verran rivin
   ylälaidan alapuolella. Korjaus: `position: relative; top: auto;
   right: auto;`, jolloin `align-self: center` pätee.
2. `.fact-card h2.paikka-aika` varaa kaiuttimelle `min-height: 1,2 rem`,
   mutta lapun oma rivi on 1,05 rem. Erotus jäi rivilaatikon
   **alapuolelle**, joten teksti istui laatikkonsa yläreunassa.
   Korjaus: lapun otsikolle `min-height: 0`.

Auki olevalla kortilla otsikon rivimitta sidottiin samaan lukuun kuin
kaiuttimen laatikko (`line-height: var(--kaiutin-koko)`), jolloin
keskilinjat osuvat yhteen myös kahdelle riville kiertyvällä otsikolla.

---

## 2. Kolme kaarta VU-mittarina — sykeanimaatio pois

`@keyframes fact-kaiutin-syke` (koko kuvakkeen `scale` + `opacity`) on
**poistettu**. Mitattu: `animation-name: none`, `transform: none`,
`opacity: 1` molemmilla ruuduilla.

Kaiuttimen kaaret ovat nyt **kolme erillistä SVG-polkua**
(`index.html`, `.kaiutin-kaari` + `data-kaari="1|2|3"`), ja
`js/kaiutinmittari.js` sytyttää ne yksitellen luokalla `palaa`.

| Ruutu | Kaaret hetkellä 0 | +320 ms | +640 ms | Eri tiloja |
| --- | --- | --- | --- | --- |
| 390 × 844 | `110` | `100` | `111` | 3 |
| 1400 × 900 | `100` | `100` | `000` | 2 |

(`1` = kaari palaa, `opacity: 1`; `0` = sammuksissa, `opacity: 0.2`.)

**Lähde.** Jos luenta kulkee Web Audion läpi (iOS, `js/luenta.js`
`liitaLuennanVahvistin` → `js/musiikkivahvistin.js`), ketjussa on jo
`AnalyserNode` (`audio.aaniMittari`) — kaaret ohjataan sen RMS-tasosta
`requestAnimationFrame`-silmukassa, eikä äänigraafiin lisätä mitään.
Muuten (Chromium-työpöytä; mitattu `aaniMittari: false`) ajetaan
hillitty ajastettu kuvio.

**Kaksi mitattua korjausta matkan varrella.** (a) Kuvion kuvaaminen
RMS:n kynnyksille jumitti mittarin kahteen kaareen (`110 → 110 → 110`);
kuviolle annettiin omat, tasavälisemmät kynnykset. (b) Kehyskohtainen
tasoitus (0,35) litisti kuvion keskiarvokseen, koska kartta pudottaa
ruudunpäivityksen 5–10 kehykseen sekunnissa — tasoitus jätettiin
koskemaan vain analysaattoria.

**Ei suodattimia** (iOS-sääntö, `tests/rules.test.mjs`): kaaret
vaihtavat vain `opacity`-arvoa. `tests/rules.test.mjs` 334/334 läpi.

**Mykistys ja luennan loppu:** mittari pysähtyy ja kaikki kaaret
sammuvat. Mykistys tarkistetaan erikseen (`.mykistetty`), koska
mykistetty luenta voi silti olla "äänessä" vaimennettuna.

---

## 3. Luentakuvien reunahäivytys pois

`.fokusvirta-isokuva-kuva`:n kahden suunnan `mask-image`-liukuvärit (7 %
joka reunasta) on poistettu kokonaan.

| Ruutu | `mask-image` | `-webkit-mask-image` | Paperireuna |
| --- | --- | --- | --- |
| 390 × 844 | `none` | `none` | `6px rgb(247, 241, 226)` |
| 1400 × 900 | `none` | `none` | `6px rgb(247, 241, 226)` |

Kulmapyöristys 22 px → 3 px, ja tilalle tuli vanhan valokuvan oma
paperireuna ja pehmeä varjo (`box-shadow`, **ei** `filter:
drop-shadow` — iOS-sääntö).

---

## 4. Kuvat pakaksi, vuorotellen vasemmalle ja oikealle

Kuvat eivät enää ristihäivy toistensa tilalle: **edellinen jää**, ja
uusi laskeutuu sen päälle vastakkaiseen kallistukseen. Kuvateksti on
kortin oma `figcaption`, joten se kallistuu kuvan mukana.

| Kortti | Kallistus | Siirto (x, y) | Mitattu matriisi |
| --- | --- | --- | --- |
| 1 (isoisä) | **−2,0°** | −14 px, 0 px | `matrix(0.999391, -0.0348995, 0.0348995, 0.999391, -14, 0)` |
| 2 (isoisä) | **+2,4°** | +14 px, 8 px | `matrix(0.999123, 0.0418757, -0.0418757, 0.999123, 14, 8)` |
| 3 (PuluCam) | **−2,8°** | −14 px, 16 px | `matrix(0.998806, -0.0488498, 0.0488498, 0.998806, -14, 16)` |

Samat arvot molemmilla ruuduilla. Kulma kasvaa 0,4° korttia kohti
(katto 4 korttia), jottei kolmas ja neljäs kortti peittäisi kahta
ensimmäistä täysin. Pakan katto on 7 korttia (2 isoisän + 5 PuluCamin).

**Yksi lisäys mittauksen perusteella:** kolmen kortin pakassa alempien
korttien kuvatekstit osuivat päällekkäin ja kartan päälle jäi kolme
riviä sekaisin (390 × 844). Peittyneen kortin kuvateksti on nyt
piilossa — teksti on yhä kortin oma, se vain odottaa kuvansa vuoroa.

Linssin piilotussääntö ja raahaus eivät muuttuneet: koskin vain
`.fokusvirta-isokuva-*`-kerrokseen ja kaiutinnappiin.

---

## 5. Kartta kuvien takana — MITATTU LÖYDÖS

Toimeksianto: *"kartta kuvien takana pysyy pehmennettynä ja
tummennettuna (ei muutosta)"*. **En muuttanut mitään** — mutta mittaus
kertoo, ettei huntu ole päällä v1906:ssa lainkaan:

| Hetki saapumisesta | `.fokusvirta-isokuva` kortteja | `body.luenta-huntu` | `.map-pane::after` |
| --- | --- | --- | --- |
| 8–29 s (isoisän luenta, kuvat ruudulla) | 1–2 | **ei** | `backdrop-filter: none`, peite `rgba(0,0,0,0)` |
| 31–43 s (PuluCam-kuvat) | 3–5 | **ei** | sama |
| 44 s → (pieni pakka kartalla) | 0 | **ei** | sama |

Syy on ehdossa: `js/ui.js` nostaa hunnun vain kun ruudulla on
`.fokusvirta-luentakuva.nakyy` eli **pieni karttapaneeli**, mutta isojen
kuvien aikana ruudulla on `.fokusvirta-isokuva` — ja kun pieni paneeli
vihdoin nousee (44 s), kertoja on jo vaiennut. Ehdon kaksi puolta eivät
siis ole koskaan tosia yhtä aikaa.

Tämä selittää, miksi oheiset kuvakaappaukset eivät ole yhtä tummia kuin
omistajan iPhone-kuva. Korjaus olisi yhden ehdon levennys
(`.fokusvirta-isokuva.nakyy` mukaan), mutta se kuuluu KARTTATAUSTA-
linjauksen tekijälle — jätin sen koskematta, koska toimeksiannossa luki
"ei muutosta".

---

## 6. Vastakoe

Vartio *"VU-mittari elää"* pitää kaatua, jos animaatio otetaan pois.
Koe: luentavahti pysäytetään (se käynnistäisi mittarin 200 ms:n välein
uudestaan) ja mittari sammutetaan, mutta luennan merkki
(`body.kertoja-aanessa`) jätetään päälle.

| | Hetki 0 | +320 ms | +640 ms | Eri tiloja | Vartio |
| --- | --- | --- | --- | --- | --- |
| Normaali (1400 × 900) | `100` | `100` | `000` | 2 | **vihreä** |
| Animaatio pois | `000` | `000` | `000` | 1 | **punainen** |

Vartio mittaa siis animaatiota eikä pelkkää luokan olemassaoloa.

---

## 7. Portit

| Portti | Tulos |
| --- | --- |
| `NODE_USE_ENV_PROXY=1 npm test` | **3440 testiä, 0 vikaa** (13 skip) |
| `tests/rules.test.mjs` (iOS-suodatinsääntö) | 334/334 |
| `tests/dokumentit.test.mjs` | 3/3 |
| `tools/tarkista-kaksoisavaimet.mjs` | ei kaksoisavaimia |
| `tools/tarkista-niputus.mjs` | 391 moduulia, ei törmäyksiä |
| `tools/tarkista-savukkeet.mjs` | kunnossa |
| `tools/build-standalone.mjs` | dist 32 284 kt, `js/kaiutinmittari.js` mukana (ei committoitu) |
| `tools/savukkeet/savuke-kaiutin-luentakuvat.mjs` | uusi savuke, 20/20 |

Kaksi porttia vaati oman korjauksensa, ja molemmat olivat oikeita
huomioita:

- `tests/sw.test.mjs`: uusi moduuli puuttui `sw.js`:n SHELL-listalta —
  offline olisi hajonnut. Lisätty.
- `tests/luentakuvasarja.test.mjs`: kaksi vartiota laski ruutuja
  ristihäivytyksen mukaan (*"vanha ruutu jää hetkeksi
  ristihäivytykseen"*). Ne kertovat nyt pakasta; väitteet
  (PuluCam ei ala luennan aikana, pakka ei nouse kesken luennan) ovat
  ennallaan. Samalla paljastui yksi todellinen järjestysvika: isoisän
  kakkoskuvan 9 sekunnin ajastin olisi laskenut kuvan PuluCam-kuvien
  **päälle**, jos pulun kommentti ehti ensin — pakassa järjestys olisi
  ollut isoisä, pulu, isoisä. Kakkoskuva jää nyt pois, jos pulun sarja
  on jo alkanut; karusellissa se on yhä mukana.

---

## 8. Kuvat omistajalle

- `docs/raportit/kuvat/kaiutin-luentakuvat-390-20260915.jpg`
- `docs/raportit/kuvat/kaiutin-luentakuvat-1400-20260915.jpg`

Molemmat Dubrovnikin saapumisluennasta, kolmen kortin pakka ruudulla.

**Ei versionostoa, ei mergeä, ei Raamatun muokkausta.**
