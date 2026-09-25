# Viesti Fablelle: välipisteet päätepisteen kokoisina ilman punaista

Opus-erä 18.9.2026, haara `claude/bold-ride-vow4ki-valipisteet`.
Lähtökohta: Raamattu **KARTTAUUDISTUKSEN PAATOKSET 39** (omistaja
18.9.2026 klo 20.40, puhelintestin v1944 löydös 3, kuva Marseillen
siirtovaiheesta): *"valipisteet saisi nakya isommalla. saman kokoinen
ympyra kuin paatepiste, mutta ilman punaista korostusta"*.

## 1. Mikä päätepiste, ja miksi

Kohdemerkkejä on kaksi kokoa (js/pallolauta/merkit.js):

| merkki | luokka | ympyrän halkaisija |
| --- | --- | --- |
| kaupunkikohde | `.target-piste` | `KOHDEMERKIN_PX` **24 px** |
| reitin varren askelpiste | `.target-piste.far` | `KOHDEMERKIN_PISTE_PX` **15 px** |

Välipiste **on** reitin askel — täsmälleen sama olio kuin jälkimmäinen,
ja ainoa ero on, onko se juuri nyt valittavissa. Siksi mitaksi otettiin
15 px: kun askel on valittavissa, sen päälle tulee punainen katkorengas;
kun ei ole, jäljelle jää sama ympyrä ilman korostusta. **Punainen jää
näin yksin valinnan merkiksi**, mikä on juuri se, mitä omistaja pyysi.
(Kaappauksessa näkyy, että kohdemerkki piirtyy suoraan helmen päälle
samassa pisteessä — sama ympyrä, korostus lisänä.)

Jos haluat isomman (24 px), muutos on yhden vakion vaihto:
`REITTIHELMEN_HALKAISIJA_PX` tiedostossa js/pallolauta/reitit.js.

## 2. Toteutus (kevyin tapa, WebGL-pisteinä)

- **Ruutuvakio.** Helmen säde luetaan nyt samasta `sadeRuudulta`-
  kaavasta kuin kaupunkipisteellä, mutta **ilman kartan mittakaavaa**
  (`kartanMittakaavanHalkaisija`). Kaupunkipiste on 12.9.2026 alkaen
  kartan mitassa (YKSI SÄÄNTÖ -lohko), mutta päätepiste on DOM-merkki
  kiinteässä ruutumitassa — jos helmi olisi kartan mitassa, se karkaisi
  päätepisteen koosta heti zoomin muuttuessa. Koko kirjoitetaan sekä
  `pointRadius`-luennassa että `tahdistaPisteidenKoko`-tahdistuksessa
  (joka ennen ohitti helmet kokonaan).
- **Reunus kahdella sisäkkäisellä levyllä.** Globe.gl:n pisteellä on
  yksi materiaali eikä lainkaan viivaa, joten reunus on oma levynsä:
  tumma 15 px alempana (`REITTIHELMEN_REUNAN_KORKEUS` 0,0024) ja
  pergamentti 10,6 px sen päällä (0,0025). Levyt ovat katsesäteellä,
  joten alempi korkeus = kauempana kamerasta → reunus jää varmasti
  pergamentin taakse. Molemmat ovat lajia `helmi` (lippu `reuna`),
  jotta napautus, piilotukset ja laskurit kohtelevat niitä yhtenä
  merkkinä — uusi `laji` olisi rikkonut ne savukkeet, jotka etsivät
  kaupunkipistettä ehdolla `laji !== 'helmi' && laji !== 'valo'`.
- **Ei punaista.** Reunuksen väri on maareitin mustetta
  `rgba(74, 58, 36, 0.88)`, ei `--mark` (#b03a2b). Täyte on entinen
  pergamentti `HELMEN_VARI`.
- **Korkeusjärjestys ennallaan:** viiva 0,002 < varjo-alue < reunus
  0,0024 < helmi 0,0025 < kaupunkipiste 0,003 < nappula ja kohdemerkki
  (merkkikerros).
- Poistettu: `REITTIHELMEN_SADE` (vanha karttavakio 0,014).

Muutetut tiedostot: `js/pallolauta/reitit.js`, `js/pallolauta/lauta.js`,
`tests/pallolauta.test.mjs`, `tools/savukkeet/sarjat.json`, uusi
`tools/savukkeet/savuke-reittihelmet.mjs`.

## 3. Mitat ennen ja jälkeen

**Ennen** (karttavakio 0,014 pallon yksikköä, käänteinen
`kaupunkipisteenSade`, 390 × 844):

| kameran korkeus | helmen halkaisija |
| --- | --- |
| 0,35 (kaappauksen näkymä) | ~1,3 px |
| 0,15 | ~2,9 px |
| 0,05 (lähin) | ~8,8 px |

Eli helmi oli alle kaksi pikseliä juuri siinä näkymässä, josta omistajan
kuva on — "pieniä valkoisia tappeja", ja koko muuttui zoomin mukana.

**Jälkeen** (mitattu piirretystä geometriasta: levyn reunapiste
projisoitu kameralla ruudulle, ei kaavasta):

| ruutu | zoom | helmen ulkohalkaisija (ka / min / max) | päätepisteen ympyrä (`.far`) |
| --- | --- | --- | --- |
| 390 × 844 | 0,35 | 15,04 / 14,85 / 15,13 px | 15,00 px |
| 390 × 844 | 0,15 | 15,06 / 14,80 / 15,18 px | 15,00 px |
| 1400 × 900 | 0,35 | 15,05 / 14,87 / 15,14 px | 15,00 px |
| 1400 × 900 | 0,15 | 15,07 / 14,81 / 15,20 px | 15,00 px |

Ero päätepisteeseen on joka mittauksessa alle 0,25 px, ja koko on sama
molemmilla zoomeilla — ruutuvakio siis pitää. Hajonta ±0,2 px helmien
kesken on perspektiiviä (ruudun reunan helmi on kauempana kamerasta);
DOM-merkillä sitä ei olisi, mutta se on silmälle näkymätön.
Pergamenttitäyte on 10,6 px ja tumma reunus 2,2 px kummallakin puolella
(sama viivanpaksuus kuin `.target-piste.far`:n katkorenkaalla).

**Punainen:** helmen alueelta (ympyrämaski, säde 6 px keskeltä)
`R − max(G, B)` suurin arvo oli 21 (390) ja 19 (1400) — raja 40 ei
ylity yhdessäkään pikselissä, punaisia 0/441 ja 0/113. Päätepisteessä
punainen on yhä tallella: suurin 118 ja 311/1793 (390) sekä 84/441
(1400) pikseliä ylittää rajan, ja `.target-piste`-katkoviiva
(`stroke-dasharray`) on ennallaan.

## 4. Kehysnopeus

Kolmen sekunnin panorointi helmet ruudulla, Chromium (GPU), Mac Studio:

| ruutu | fps |
| --- | --- |
| 390 × 844 (dpr 2) | 75–83 (viimeisin ajo 79,6) |
| 1400 × 900 | 74–82 (viimeisin ajo 80,7) |

Portti on ≥ 50, ja mitta on selvästi sen yli, vaikka pistemäärä
kaksinkertaistui (7 helmeä → 14 levyä Marseillessa). **WebKitillä ei
mitattu** — savuke ajaa Chromiumilla, kuten muutkin pallosavukkeet;
kirjaan tämän avoimeksi kohdaksi.

## 5. Kaappaukset (Fablelle katsottavaksi)

- `tools/savukkeet/kaappaukset/reittihelmet/ennen-390.png`
- `tools/savukkeet/kaappaukset/reittihelmet/jalkeen-390.png`

Molemmat 390 × 844, Marseillen siirtovaihe, sama kamera (korkeus 0,35),
kolmonen maateitse: kohteina Alpit, Barcelona ja Pariisin reitin
askelpiste. "Ennen" tehdään palauttamalla vanha karttavakio suoraan
levyjen skaalaan ja piilottamalla reunuslevyt, joten kuvat ovat muuten
identtiset — ero on vain helmissä. Ennen-kuvassa helmiä ei käytännössä
erota reitistä; jälkeen-kuvassa ne ovat sama ympyrä kuin kohdemerkki,
ilman punaista.

## 6. Savukkeen tila

Uusi `tools/savukkeet/savuke-reittihelmet.mjs`, lisätty julkaisusarjaan
(`tools/savukkeet/sarjat.json`, `julkaisu` + `asetukset`).

```
18/18 läpi
```

Seitsemän vartiota kummallakin ruudulla: helmiä on ja jokaisella on
reunuslevy; ulkohalkaisija 15 px ± 1 molemmilla zoomeilla; helmi =
reitin varren päätepisteen ympyrä ± 1 px; ei punaista helmessä; punainen
katkorengas yhä päätepisteessä; korkeusjärjestys ennallaan; fps ≥ 50.

Ajo:
```
NODE_USE_ENV_PROXY=1 PORTTI=8825 node tools/savukkeet/savuke-reittihelmet.mjs
```

Ennen committia: `node --test tests/*.test.mjs` → **# pass 3628,
# fail 0** (3641 testiä, 13 skipattua), ja `node tools/build-standalone.mjs`
meni läpi (dist/matkakirja.html 32 719 kt). Versiota EI nostettu.

## 7. Viereiset havainnot (en koskenut)

1. **Ulos zoomatessa helmet limittyvät.** Koska helmi on nyt ruudun
   vakio ja reitti kartan mitta, kaukaa katsottuna peräkkäiset helmet
   menevät päällekkäin "toukaksi". Käytännössä tämä ei osu peliin,
   koska reittiviuhka näkyy vain matkan ajan ja silloin kamera on
   lähellä — mutta jos omistaja zoomaa ulos kesken matkan, se näkyy.
   Lääke olisi lattia/katto kuten kaupunkipisteellä
   (`kartanMittakaavanHalkaisija`), mutta se rikkoisi vartion 2, joten
   jätin sen Fablen päätettäväksi.
2. **Savukkeen kohdeympyrä on `.far` (15 px), ei kaupunkikohde
   (24 px).** Jos omistaja tarkoitti kuvassaan Alppien/Barcelonan
   kaupunkimerkkiä, helmi jää sitä pienemmäksi. Yhden vakion muutos,
   ks. luku 1.
3. **WebKit-mittaus puuttuu** (luku 4). Repossa ei ole
   pallosavuketta, joka ajaisi WebKitillä; `savuke-astro-webkit.mjs`
   ajaa eri näkymää. Jos fps halutaan WebKitiltä, se on oma pieni erä.
4. **`savuke-siirtokohteet.mjs` on yhä vanhan tasokartan savuke**
   (`ohitaVanhanKartanSavuke`), eli nopanheiton kohdemerkkien mitat
   eivät ole minkään ajossa olevan savukkeen vartioimia pallolaudalla.
   Uusi savuke mittaa ne nyt sivutuotteena (kohdeYmpyrat-INFO), mutta
   varsinainen vartio niille puuttuu.
5. **Marseillen naapurit paketissa** ovat Pariisi (4 askelta),
   Barcelona (3) ja Alpit (3) — omistajan kuvassa mainittu "Lyon" on
   kartalle poltettu kaupunginnimi, ei pelin solmu tällä reitillä.
   Ei toimenpiteitä, mutta selittää, miksi savukkeen kohteet ovat
   Alpit ja Barcelona.
