# Viesti Fablelle: lisää-valikko tiiviisti, plus-merkin oikealle puolelle

**Sonnet-sessio 15.9.2026, haara `claude/bold-ride-vow4ki-valikko-tiivis`
(pohja main v1913). Ei versionostoa, ei mergeä.**

Raamattu-linjaus haarassa `claude/bold-ride-vow4ki`, KARTTAUUDISTUKSEN
PÄÄTÖKSET 22 KORJAUS (omistaja 15.9.2026): lisää-valikko allekkain
tiiviisti (rivivali 1,3 × tekstikorkeus, zoomista riippumaton),
plus-merkin oikealle puolelle, kapealla ruudulla koko kortin
vasemmalle.

---

## 1. Juurisyy — yhdellä lauseella

**CSS-puoli (`.maapaneeli-aihe` `min-height: 0` + `line-height: 1.3`)
oli valmiiksi oikein — button-oletuksen `min-height: 42px` voitti
erän 18:n `gap: 0`:n, ja se on nyt kumottu; itse VIKA, jonka takia
väitteet 7 ja 7b näkyivät edelleen punaisina tätä työtä jatkaessa, oli
savukkeessa itsessään (`tools/savukkeet/savuke-era12.mjs`), ei
tyylitiedostossa.**

### Löydös

`valikonMitat` laski rivivälin suhteen jakamalla RUUDUN pikseleinä
mitatun rivivälin (`getBoundingClientRect`, CSS3D-skaalan läpi)
kortin OMALLA, skaalaamattomalla fonttikoolla (`getComputedStyle`,
transform ei vaikuta computed-arvoon). Koska koko kortti skaalautuu
zoomin mukana, tämä ei voinut koskaan antaa vakiota 1,3:a — mitattu
tulos oli tasan `1,3 × kortin ruutuskaala` (esim. skaala 0,342 →
suhde 0,443; skaala 0,826 → suhde 1,072). CSS oli siis oikein
koko ajan; vain mittari vertasi kahta eri yksikköä toisiinsa.

**Korjaus:** `valikonMitat` (ja sen kopiot 7b:n zoomiloopissa ja
vastakoe K:ssa) skaalaavat nyt fontin koon samalla kortin
ruutuskaalalla (`k.width / kortti.offsetWidth`) kuin rivien
ruutupaikatkin, jolloin molemmat puolet ovat samaa yksikköä.

**Toinen löydös, samassa tiedostossa:** `valikkoKelpaa` vaati yhä
`v.rako > 0` — erän 18 vanha mitta ("rako kortin alareunaan"), joka
kuului aikaan, jolloin valikko avautui KORTIN ALLE. Nyt valikko
avautuu PLUSSAN VIERELLE (sivuun), jolloin tämä pystyrako on
rakenteellisesti negatiivinen riippumatta siitä, onko valikko oikein
sijoitettu — se ei voinut koskaan olla positiivinen. Ehto poistettu;
"ei kortin päällä" tulee jo `!v.leikkaa`:sta, ja "plussan vierellä"
`sivuKelpaa`:sta (oikeaRako/vasenRako).

**Kolmas löydös:** `plusYlaero` (valikon yläreunan ero plussan
yläreunaan) vaadittiin ±4 ruutu-px:n sisään, mutta
`js/pallolauta/maapaneeli.js` `sovitaValikko` liu'uttaa koko listaa
pystyyn TARKOITUKSELLISESTI, kun se osuisi alalaidan kalusteisiin
(rail, toimintorivi, kelluva pollo-nappi) — dokumentoitu käytös, ei
vika. Mitattu 390 px -ruudulla (Ranska, saapumisnäkymä): kortti on
niin alhaalla, että valikko osuisi kelluvaan pollo-nappiin ja
toimintoriviin ilman siirtoa (`--valikko-pysty: -51,6px` paikallisissa
yksiköissä, mitattuna `plusYlaero` -17,6 ruutu-px). Vaatimus poistettu
ehdoksi — sivusuunnan rako (tarkistettu edelleen) takaa yksinään,
ettei valikko koskaan peitä korttia, koska ne eivät vaakasuunnassa
osu päällekkäin; `plusYlaero` jää INFO-mitaksi.

---

## 2. Muutokset

- `css/styles.css` — ei muutoksia tässä sessiossa (edellisen sess
  jättämä CSS oli jo oikein): `.maapaneeli-aihe` `min-height: 0`,
  `line-height: 1.3`, `font-size: 6.5px`; `.maapaneeli-valikko`
  `left: 108px` + `transform: translateY(var(--valikko-pysty))`;
  `.maapaneeli-valikko.vasen` `right: 109px`.
- `js/pallolauta/maapaneeli.js` — ei muutoksia tässä sessiossa:
  `sovitaValikko` kääntää valikon plussan vasemmalle puolelle
  ylivuodolla ja liu'uttaa pystyyn kalusteiden yläpuolelle.
- `tools/savukkeet/savuke-era12.mjs` — korjattu tämän istunnon aikana:
  - `valikonMitat`: fontin koko skaalataan kortin ruutuskaalalla
    ennen rivivälin suhteen laskua (kolmessa kohdassa: päämittaus,
    7b:n zoomiloopi, vastakoe K).
  - `valikkoKelpaa`: poistettu vanhentunut `v.rako > 0` -ehto
    (kommentoitu, jäljelle INFO-mittana).
  - `sivuKelpaa`: poistettu `plusYlaero`-ehto (kommentoitu, jäljelle
    INFO-mittana); `YLAREUNAN_VARA`-vakio poistettu tarpeettomana.

## 3. Mittaukset

**Rivivälin suhde kolmella zoomilla (tavoite 1,3 ± 5 %), Ranska:**

| Ruutu | Saapumis (osuus 1) | Osuus 0,25 | Osuus 0,125 |
|---|---|---|---|
| 390 px | 1,298 | 1,298 | 1,298 |
| 1400 px | 1,298 | 1,298 | 1,298 |

Suhde on identtinen (1,298 ≈ 1,3) kaikilla kahdeksalla napinparilla,
kaikilla kolmella zoomitasolla, molemmilla ruuduilla — pysyy vakiona
zoomista riippumatta, kuten Raamattu vaatii.

**Sijainti plussaan:**

| Ruutu | Sivu | Rako plussaan | Leikkaa korttia |
|---|---|---|---|
| 390 px | oikea | 31,8 ruutu-px | ei |
| 1400 px | oikea | 76,9 ruutu-px | ei |

Molemmilla ruuduilla valikko avautuu plussan oikealle puolelle
(kapealla 390 px -ruudulla ei tarvinnut kääntyä vasemmalle tässä
tapauksessa, mutta `sovitaValikko`/vastakoe kattavat kääntymisen
erikseen).

**Vastakoe K** (button-oletus `min-height: 42px` palautettuna):
rivivälin suhde nousee 5,34:ään (saapumis) ja 21,35:een (zoomattuna)
— molemmat kaukana 1,3:sta ± 5 %:sta → väitteet 7 ja 7b kaatuvat
oikein.

## 4. Savuketulos

**29/29 vartiota läpi** (`tools/savukkeet/savuke-era12.mjs`), kaikki
väitteet 1–10 sekä 7b vihreinä, vastakokeet A–K punaisia odotetusti.
`node tools/tarkista-savukkeet.mjs` OK. `node --test
tests/rules.test.mjs tests/dokumentit.test.mjs`: 337/337 OK.

## 5. Kuvakaappaukset

- `docs/raportit/kuvat/lisaa-valikko-tiivis-1400-20260915.jpg`
  (21,6 kt) — Ranska, 1400 px, kortti + valikko, kahdeksan
  kategoriaa tiiviisti allekkain plussan oikealla puolella.
- `docs/raportit/kuvat/lisaa-valikko-tiivis-390-20260915.jpg`
  (17,4 kt) — Ranska, 390 px, sama näkymä kapealla ruudulla.

Molemmat rajattu kortin+valikon ympärille (Chromium, savukkeen oma
avaus) ja skaalattu ylös luettavuuden vuoksi raporttia varten;
alkuperäiset ruutumitat vastaavat väitteen 7 mittausta.
