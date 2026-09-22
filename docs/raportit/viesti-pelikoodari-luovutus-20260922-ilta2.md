# Pelikoodarin luovutus 22.9.2026 (ilta 2)

Työhakemisto `/Users/samireivinen/Matkakirja-pelikoodari` (rooli-worktree;
erät omiin haaroihin temp-worktreissä `/Users/koodaus/wt-pelikoodari-*`).
Node 22: `node --test "tests/*.test.mjs"`. Savukkeet paikallisesti:
`CHROMIUM="" PLAYWRIGHT_JS=/Users/samireivinen/Matkakirja-fable/node_modules/playwright/index.js NODE_USE_ENV_PROXY=1 node tools/savukkeet/<x>.mjs [--webkit]`.
Edellinen luovutus: `viesti-pelikoodari-luovutus-20260922-yo.md`.

## Tuotantoon tämän session aikana

| versio | sisältö |
| --- | --- |
| v2107 | Lepopiirto tickin tasolle (välke korjattu) |
| v2109 | Lepopiirto oletukseksi (omistaja todensi iPhonella) |
| v2110 | Syöte ilmoittaa lepopiirrolle (vedon alku 1 kehys) |
| v2111 | GL-atlas värihallintaan (kulta oli oranssi) |
| v2113 | Atlaksen osapäivitys atlaskankaasta (läpinäkyvä oli liian kirkas) |
| v2114 | **A: kohdemerkit GL-kerrokseen** |

## Syöteputki (sulavuuskatsaus kohta 13) — PR-haara, EI mainissa

Haara `pelikoodari-syote-interpolointi`, PR **#2821**.

**Tärkein asia, joka uuden session on tiedettävä: mittaus, joka tämän
työn tilasi, oli pätemätön.** Laitetestaajan harness luki kameran omasta
rAF-silmukastaan, joka voi ajautua kirjaston tickin kummalle puolelle
tahansa. Siitä syntyy mittariin 0/2×-kuvio, jota pelissä ei ole — myös
se "p10 = 0 kaikissa 16 kierroksessa", jonka perusteella interpolointi
tilattiin. Fablen fysiikka-argumentti paljasti sen: interpoloitua polkua
seuraava kamera ei voi liikkua 8× osoitinta yhdessä kehyksessä.

Siksi peliin lisättiin **oma syöteloki** (`?koe=syoteloki`): jokainen
kamerakirjoitus kirjataan `ui.pallonSyote.loki`in — käytetty osoittimen
paikka ja kamera HETI kirjoituksen jälkeen, samassa kohdassa jossa
kirjoitus tehdään. Lukujärjestys ei voi mennä väärin. Rivi:
`{ t, x, y, lat, lng, alt, ohitus }`, missä ohitus 0 = kirjoitettiin,
1 = ei tartuntaa, 2 = ei pintapistettä, 3 = vedon katto.

Mitattu tällä lokilla (Chromium, synteettinen veto): p90 = 1,113,
p50 ≈ 1,1, **ei piikkejä**; ohituksista kaikki olivat "ei tartuntaa"
eli vetojen välisiä kehyksiä. HUOM: omiin absoluuttisiin suhteisiin ei
pidä luottaa — asteet→pikselit-muunnos olettaa pisteen ruudun keskellä
ja p50 heitteli ajojen välillä 1,102 → 0,281. Vain piikkien puuttuminen
on vahva havainto.

### Dokumentoitu syy (Fable löysi)

Nolan Lawson, *Browsers, input events, and frame throttling*
(nolanlawson.com/2019/08/14/): Chrome **tahdistaa** pointermoven,
mousemoven ja wheelin rAF:iin, macOS:n Safari **ei tahdista** niistä
yhtäkään, ja iOS:n Safari tahdistaa **touchmoven** mutta ei
pointermovea. Pallolauta kuuntelee vain pointer-tapahtumia, joten
Safareissa syöte tulee kehyksistä riippumatta. `getCoalescedEvents` on
Safarissa vasta iOS 18.2:sta ja vajaana; `pointerrawupdate`a ei ole.

### Viisi tapaa, kaikki samassa rakennuksessa lippuina

| lippu | tapa | tila |
| --- | --- | --- |
| *(oletus)* | aikaleimainterpolointi, viive ≤ 1 kehys | **valmis** |
| `?koe=interpvanha` | v2097: viimeisin näyte kerran kehyksessä | **valmis** |
| `?koe=syoteennakko` | ekstrapolointi ilman viivettä, kiihtyvyyskatto | **valmis** |
| `?koe=syotejousi` | kriittisesti vaimennettu jousi, τ ≈ 1 kehys | **valmis** |
| `?koe=syotetouch` | näytteet touchmovesta (vain kosketuslaite) | **valmis** |
| `?koe=syoteloki` | mittausloki päälle (yhdistettävissä muihin) | **valmis** |

`syotetouch` on ortogonaalinen: se vaihtaa näytteiden LÄHTEEN, joten sen
voi yhdistää interpolointiin, ennakkoon tai jouseen.

**Jousesta opittua:** eksplisiittinen integrointi räjähti, kun dt ≈ 2τ
(testi antoi 1999 tavoitteen 100 sijaan). Nyt käytössä on suljettu muoto
`x(t) = (A + B t) e^(-ωt)`, joka on vakaa millä tahansa dt:llä — pitkä
tauko (välilehti taustalla) on juuri se tilanne. Testi vahtii tätä.

### TEKEMÄTTÄ: ratasvalikko

Omistaja pyysi (klo 18.05) vaihtoehdot ratasvalikkoon ⚙ → Kartta, samaan
tapaan kuin "Tarkkuus liikkeessä": otsikko **"Vedon seuranta"**,
vaihtoehdot Interpolointi (oletus) / Vanha / Ennakointi / Jousi /
Kosketusnäytteet (vain kosketuslaitteella). Valinta localStorageen,
vaikuttaa heti jos mahdollista (muuten vihje "tulee voimaan seuraavassa
latauksessa"), ja sama valinta ohjaa syötelokin kenttää, jotta mittaus
näkee kumpi oli päällä. URL-liput jäävät mittaukseen.
Malli: `js/tarkkuus-asetus.js` (v2099, "Tarkkuus liikkeessä").

**Tämä on uuden session ensimmäinen työ.**

### Mittausohje

1. `?lauta=pallo&koe=syoteloki` + haluttu tapalippu.
2. Veto, sitten lue `window.matkakirja.ui.pallonSyote.loki` ja laskurit
   (`interpolointeja`, `ekstrapolointeja`, `viiveMs`, `sovelluksia`,
   `tapa`, `touchLahde`). Tyhjennä `loki.length = 0` kierrosten välissä.
3. Peräkkäisistä riveistä saa kameran ja osoittimen siirtymän samalta
   väliltä → suhde. Tavoite p10 > 0,7 ja p90 < 1,4.
4. **Älä lue kameraa omasta rAF:sta.** Se oli koko sotkun syy.
5. Laitetestaaja korjaa harnessinsa lukemaan pelin lokista; omistajan
   aidot vedot Safarilla ja Chromella ratkaisevat, iPhone erikseen
   kohdalle `syotetouch`.

## Jono A–E

| kohta | tila |
| --- | --- |
| A kohdekaupunkien pallot | **tuotannossa v2114** |
| B likakuviot zoomissa | **poistettu jonosta** — Karttaseppä mittasi: lika on laatassa, ei häiveessä (crossfade-poikkeama 0,60 vs sekoitettu 5,68) |
| C karttaselite: linssin alta paistava numero + vipu reaaliajassa | **tekemättä** |
| D nostosymbolien valkoinen halo pois maailmatilassa | **tekemättä** |
| E nostojen pisteet harmaiksi + `?koe=symbolitkaukana` | **tekemättä** |

## Muut avoimet

- **Ruutuavaruuden paperirae: JÄISSÄ.** Karttaseppä mittasi, että
  poltettu hieno rae on vain ~3 % meren hienorakenteen energiasta, joten
  ruutukerros ei toisi tähän juuri mitään. Älä aloita ilman uutta
  pyyntöä. Parametrit (PAPERI_KEVYT) ovat Karttasepän viestissä, jos
  asiaan palataan.
- **Pohjapallo-shaderin WIP** (haara `pelikoodari-kermashader-pohja`,
  3d8288c1f) on yhä RIKKI ja vanhentunut. Jos siihen palataan:
  bisektoi, palauta laattakerroksen fragmentti nykyiseen ja lisää
  pohjavariantti erillisenä.
- Lähtövalinnan **huomiokohde jää CSS2D:hen** (A:n rajaus): sen rengas
  sykkii 2,6 s, eikä se mahdu rungon 2,4 s:n syke-uniformiin. GL:ään
  siirto vaatisi toisen syke-kanavan runkoon = Karttasepän päätös.

## Paluuliput (tämän session lisäämät)

`?koe=levovanha` (lepopiirto pois), `?koe=kohteetcss2d` (kohdemerkit
CSS2D:hen), `?koe=interpvanha`, `?koe=syoteennakko`, `?koe=syotejousi`,
`?koe=syotetouch`, `?koe=syoteloki`, `?koe=atlaskoko` (koko atlaksen
vienti).

## Opit, jotka maksoivat aikaa

1. **Mittaa se polku, joka näyttää kuvan.** Välke näkyi vain
   sommittelijan kautta otetussa kaappauksessa, ei readPixelsillä.
   Seuraamisvirhe näkyy vain pelin omasta kirjauksesta, ei ulkoisesta
   rAF:sta. Molemmat sotkut olivat samaa lajia.
2. **Älä ilmoita vikaa lukemalla.** Ennustin lepopiirrosta 250 ms:n
   jumin vedon alkuun ja pyysin kiirekorjausta; mittaus näytti 29 ms ja
   52 ms. Korjaus jäi silti hyödylliseksi (14–15 ms, deterministinen),
   mutta perustelu piti vaihtaa.
3. **Iso läpinäkyvä pinta paljastaa väriviat.** Kohdemerkin kultalevy
   löysi kaksi rungon vikaa, jotka olivat piilossa mustassa musteessa
   ja valkoisessa halossa vuosia.
4. **Push laukaisee CI:n samalle Macille** — omistajan mittausikkunassa
   ei pushata eikä ajeta savukkeita.
5. **Älä aja savukesarjaa puuhun, jota muokkaat.** Tein sen kerran ja
   koko 57 savukkeen tulos oli pätemätön.

## Uusi sessio tekee ensin

1. **Ratasvalikko "Vedon seuranta"** (ks. yllä) → PR. Malli
   `js/tarkkuus-asetus.js`.
2. Kun Laitetestaajan korjattu mittaus on ajettu: valitse oletus
   mittauksen perusteella, palauta häviäjät lipuiksi tai poista.
   **Jos ero ei ole todellinen, palauta interpolointi** — se on luvattu.
3. Sitten jono C, D, E.
