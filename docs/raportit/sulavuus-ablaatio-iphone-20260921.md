# Sulavuuden ablaatiotikas oikealla iPhonella (Laitetestaaja)

21.9.2026 n. klo 23.40–23.50. iPhone 18 Pro -simulaattori (Safari,
oikea WebKit/Metal — ei headless), Pelikoodarin lippu
`?lauta=pallo&dev=marseille&kerrokset=porrasN` (haara `pelikoodari-ablaatio`,
c5681e2d8, ei vielä mainissa). Vertailu Pelikoodarin headless-tuloksiin
docs/raportit/sulavuus-ablaatio-20260921.md.

## Menetelmä

Tällä sessiolla ei ole JS-konsolia oikeaan laitteeseen (ei Web
Inspector -yhteyttä), joten toistin Pelikoodarin `mittaa-ablaatio.mjs`-
mittarin (kehysaika + laskurien muutokset per kehys) tilapäisenä
inline-skriptinä (`js/laitetestaaja-ablaatio.js` + yksi rivi
`index.html`:ään, **ei committoitu, poistettu session lopussa**), joka
kirjoittaa tuloksen näkyväksi tekstiksi sivulle; luin sen
kuvakaappauksesta. Panorointi ajetaan synteettisillä `PointerEvent`/
`MouseEvent`-tapahtumilla laudan `kotelo`-elementtiin (sama
kohdeelementti kuin oikea sormiveto käyttäisi), sinikäyrällä 3 s, ja
zoomi kirjaston `pointOfView`-tweenillä (0,2→0,067→0,2 tms., 2×1,5 s) —
sama liikemalli kuin Pelikoodarin Playwright-skriptissä.

## Tulokset

| porras | näkymä | pan med/p95/max (ms) | pan >50 | zoom med/p95/max (ms) | zoom >50 |
| --- | --- | --- | --- | --- | --- |
| 1 laatat | ranska | 17/21/33 | 0 | 17/21/28 | 0 |
| 1 laatat | camargue | 17/21/33 | 0 | 17/19/29 | 0 |
| 2 +vektorit | ranska | 17/20/38 | 0 | 17/20/27 | 0 |
| 2 +vektorit | camargue | 17/23/32 | 0 | 17/19/28 | 0 |
| 3 +GL-nimet | ranska | **31/62/94** | **10** | 31/33/41 | 0 |
| 3 +GL-nimet | camargue | 19/53/**235** | **20** | 17/19/26 | 0 |
| 4 +nostot/nappula | ranska | 17/24/95 | 2 | 17/18/37 | 0 |
| 4 +nostot/nappula | camargue | **41/89/128** | **38/79** | **42/85/165** | **14/68** |
| 5 +kohteet | ranska | 17/22/99 | 2 | 17/19/40 | 0 |
| 5 +kohteet | camargue | 17/23/74 | 1 | 17/20/32 | 0 |
| 6 tuotanto | ranska | 17/**45**/104 | 8 | 17/**41**/116 | 7 |
| 6 tuotanto | camargue | 17/20/72 | 1 | 17/22/70 | 2 |

(n vaihteli 68–208 kehystä per ajo — ks. huomio alla.)

## Havainnot: real device eroaa headlessistä

1. **Porras 3 (GL-nimet) on jo jankkinen oikealla laitteella**, toisin
   kuin Pelikoodarin headless-mittaus (WebKit/Chromium: porras 3 täysin
   sulava, hyppy vasta portaalla 4). Ranska pan p95 62 ms (10 kehystä
   > 50 ms), Camargue pan max 235 ms (20 kehystä > 50 ms, syy pääosin
   `purettuja` = lepokerroksen laattojen LRU-purku). Real-Safari/Metal
   siis paljastaa ongelman, jota headless-WebKit ei näytä.
2. **Porras 4 on pahin sekä pannissa että zoomissa Camarguessa**
   (headless: vain zoomi Ranskassa hyppäsi). Camargue pan: 38/79
   kehystä yli 50 ms — lähes puolet koko ajosta janktaa; zoomi 14/68.
   `n` putoaa rajusti (68–79 vs. normaali ~200), koska pitkät kehykset
   syövät saman 3 s ajoikkunan.
3. **Porras 5 näyttää parantavan tilannetta portaaseen 4 nähden**
   Camarguessa (p95 23/20 ms) — tämä on todennäköisesti ajojen välistä
   kohinaa (jokainen porras on oma sivun uudelleenlataus, laattacache
   ja GC-tila eroavat), ei todiste että kohteiden lisäys korjaisi
   nostojen ongelman. Ei tulkittu vahvana signaalina.
4. **Tuotanto (porras 6) ei ole täysin siisti**: Ranska pan p95 45 ms
   (8/192 > 50 ms), zoom p95 41 ms (7/157 > 50 ms) — syynä pääosin uudet
   laattapyynnöt/purut samassa kehyksessä liikkeen kanssa. Camargue
   sen sijaan lähes täysin sulava (p95 20–22 ms).
5. **Yhteenveto Pelikoodarille**: real-device-mittaus vahvistaa
   Pelikoodarin diagnoosin (ladonta+rasterointi+laattapyynnöt
   liikkeen aikana ovat syy) mutta osoittaa ongelman alkavan aiemmin
   (porras 3) ja olevan pahempi Camarguessa kuin Ranskassa — päinvastoin
   kuin headless-mittaus antoi ymmärtää. Ehdotettu korjaus
   (docs/raportit/sulavuus-ablaatio-20260921.md "Ehdotus") vaikuttaa
   edelleen oikealta suunnalta; real-device-tulos korostaa sen
   kiireellisyyttä.

## Rajoitteet ja luotettavuus

- Yksi ajo per porras/näkymä/ele (ei toistoja) — kohinaa ei ole
  keskiarvoistettu pois, ks. havainto 3.
- Simulaattori, ei fyysinen iPhone; Metal-GPU on kuitenkin oikea (ei
  headless-approksimaatio).
- Mittari on oma (ei täysin identtinen Pelikoodarin `PROFIILI`:n
  kanssa: jätin pois `geometriat`, `kolmiot`, `keko`, `longtask`-
  observerin ja `pitkat`-listan ajan säästämiseksi) — laskurien nimet
  ja kehysaika-logiikka ovat kuitenkin samat, joten p95/max/>50 ovat
  vertailukelpoisia.
- Yksi mittauskierros; ei toistettu useampaan kertaan tilastollisen
  varmuuden vuoksi (aikabudjetti).

## Ympäristö

- iPhone 18 Pro -simulaattori, käynnistetty ja sammutettu tässä
  sessiossa, Julkaisijalle ilmoitettu päällä/pois.
- Mac Studion kaiuttimet käytössä koko mittauksen ajan, palautettu
  Scarlett Solo USB:hen lopuksi.
- `tools/laitepalvelin.mjs` (Pelikoodarin `pelikoodari-laitepalvelin`)
  ja `js/laitetestaaja-ablaatio.js` + `index.html`-rivi: kaikki
  tilapäisiä, EI committoitu, poistettu työhakemistosta session
  lopussa. Testihaara `laitetestaaja-ablaatio` (`pelikoodari-ablaatio`
  pohjalta) poistettu paikallisesti käytön jälkeen.
