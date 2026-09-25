# Ohita saapumisluennassa: kortti ei enää peitä, Liiku ei enää osu

Opus-erä 19.9.2026 klo 14.13–14.45 Suomen aikaa. Haara
`claude/bold-ride-vow4ki-ohita-kortti`. Ei PR:ää, ei versionostoa, ei
Raamattu-muutoksia (PAATOKSET 43 kohta 10 pysyy sellaisenaan — tämä erä
vain toteuttaa sen loppuun).

Lähtökohta: Sonnetin testipeli 5 (iPhone 18 Pro, tuotanto v1952,
19.9.2026 klo 14.05–14.07), löydökset 2 ja 3.

## 1. Mitä mitattiin ja millä

Playwright, Chromium (`Google Chrome for Testing`, ms-playwright-1234) ja
vertailuna WebKit (2336), ruudut 390 × 844 ja 1400 × 900, pelitila
`matkakirja-save-v1`:stä (Pariisi, saapuminen), ämpäri- ja Commons-kuvat
route-välityksellä paikallisesta PNG:stä. Luennan elinkaari ajetaan
oikealla ketjulla (`merkitsePuhuja` → `naytaLuentakuvasarja` →
`aloitaPuluCamSarja`), kartan napautus on oikea hiiren napautus.

Mittari: `tools/savukkeet/savuke-luentakuvat.mjs`, uudet vartiot 17–21
(väitteet i–v). Vanhat 1–16 jäivät koskematta.

## 2. Ennen korjausta (vastakoe: uudet vartiot, vanha koodi)

`93/99 vartiota läpi`, kuusi punaista — kolme kummallakin ruudulla:

| Väite | 390 px | 1400 px |
| --- | --- | --- |
| iii Ohita kortin päällä | FAIL `ohitaPaalla:false` | FAIL `ohitaPaalla:false` |
| iv Ohita ei osu Liiku-nappiin | FAIL (3/3 nostoa) | FAIL (3/3 nostoa) |
| iv Ohita ei osu Liiku-sanaan | FAIL (3/3 nostoa) | FAIL (3/3 nostoa) |

**iii — luentakuvakortti Ohitan päällä.** Pulun oma sarja avaa kartan
napautuksen jälkeen TOISEN päällyksen (`aloitaPuluCamSarja` →
`aloitaMyohastynytPuluSarja` → `avaaIsokuvaPaallys`). Päällys ja nappi
ovat samassa pinossa (`.stage`) samalla luvulla (z-index 3), joten
järjestyksen ratkaisee DOM — ja vain ENSIMMÄINEN päällys ladotaan ennen
nappia. Mitattu: `paallysEnnen:false`, `ohitaPaalla:false` molemmilla
ruuduilla (kortin alareuna 539 px / 754 px, Ohitan yläreuna 726 px /
777 px, eli tässä kuvasuhteessa laatikot eivät vielä leikkaa — pystympi
kuva ja matalampi näkyvä ruutu tuovat ne päällekkäin, ja juuri sen
omistajan puhelin näytti). `elementFromPoint` antoi Ohitan koko ajan,
koska päällys on `pointer-events: none` — napautus siis meni läpi, mutta
silmä näki kortin. Siksi vartio mittaa PINOJÄRJESTYSTÄ, ei osumaa.

**iv — Ohita Liiku-sanan päällä.** Liiku ei ole kiinteässä kohdassa:
maapaneelin kortti nostaa sitä `--liiku-pohja`-mitalla
(js/pallolauta/maapaneeli.js `mittaaLiikunPohja` = kortin yläreuna
ruudun alareunasta + 2 px). Ohitan kiinteä `max(9vh, 56px)` osui siihen
heti kun kortti nousi:

- 390 px, Ohita 726–768: Liiku 748–784 (pohja 60), 728–764 (80),
  708–744 (100) — **leikkaus kaikilla kolmella**, myös Liiku-sanan
  (`.icon-label`) laatikon kanssa.
- 1400 px, Ohita 777–819: Liiku 804–840 / 784–820 / 764–800 — sama.

**a/b — piilottaako napautus Ohitan? EI.** Mitattu molemmilla ruuduilla
ja molemmilla moottoreilla: kartan napautuksen jälkeen heti (160 ms),
kuvien lennon jälkeen (1,4 s) ja toisen napautuksen jälkeen Ohita on
DOMissa, `opacity 1`, ei `disabled`, eikä sen y-koordinaatti muutu.
Nappi katoaa vasta luentojen loputtua: **6 866 ms (390 px) ja 6 600 ms
(1400 px)** luentojen lopusta savukkeessa, tutkimusajossa 3 950 ms
(Chromium) ja 3 955 ms (WebKit) kun pulun vuoro oli nähty. Syy on
`vahtiOhitanLoppua`-vahdin oma hiljaisuuslaskuri
(`PULUN_KUVAN_HILJAISUUSKATTO_MS` 1,5 s / `OHITAN_PULUN_ODOTUS_MS` 6 s +
700 ms häivytys), **ei napautus**. Sonnetin havainto b (»katosi ≤ 5 s
napautuksen kanssa samaan aikaan«) on sama vahti: ilman kertojan ääntä
(mykistys, puuttuva äänite) `luentaKesken` on epätosi alusta asti,
jolloin `SARJAN_LUENNAN_ALKUKATTO_MS` (4 s) täyttyy ja hiljaisuus alkaa
kertyä heti — napautuksen ajankohta oli yhteensattuma.

## 3. Korjaukset (pieni, rajattu muutos)

1. **js/fokusvirta.js `naytaOhitaNappi`** — idempotentti haara ei enää
   vain palauta nappia vaan siirtää sen kodin (`.stage`) viimeiseksi
   (`isokuvanKoti().appendChild(ui.ohitaNappi)`). Sama elementti, sama
   vahti, sama kuuntelija, sama `nakyy`-luokka: vain pinojärjestys
   korjaantuu, eikä vahtia nollata (idempotenssi on haaran koko idea).
   Luennan äänilogiikkaan ei kosketa.
2. **css/fokusvirta.css `.fokusvirta-isokuva-ohita`** —
   `bottom: max(9vh, 56px, calc(var(--liiku-pohja, 0px) + 44px))`, jossa
   44 px = mitattu Liiku-napin laatikko (36 px) + 8 px rako. Ilman
   muuttujaa luku on 44 < 56, joten Ohita pysyy pikselilleen entisellä
   paikallaan (mitattu: yläreuna 726 px / 777 px ennen ja jälkeen).

## 4. Jälkeen

`99/99 vartiota läpi` (Chromium, 390 ja 1400 px, `savuke-luentakuvat.mjs`).

- iii: `paallysEnnen:true`, `ohitaPaalla:true`, `alla:0`, `opacity 1`,
  `elementFromPoint` = Ohita — molemmilla ruuduilla.
- iv: ei leikkausta yhdelläkään nostolla. 390 px, pohja 60: Ohita
  698–740, Liiku 748–784 (rako 8 px). 1400 px, pohja 60: Ohita 754–796,
  Liiku 804–840.
- i–ii: `opacity 1` luennan alusta loppuun, napautusten yli.
- v: Ohita poistuu vasta luentojen loputtua (6 866 / 6 600 ms) tai
  painalluksesta (vartio 16 ennallaan).

WebKit-vertailu (sama tutkimusajo): pinojärjestys korjaantui myös siellä
(`paallysEnnen:true` pulun kortin kanssa), Liikun laatikot eivät leikkaa
millään nostolla 60–120 px kummallakaan ruudulla, Ohita katosi 3 955 ms
luentojen lopusta, opacity 1 koko ajan.

`node --test tests/*.test.mjs`: **3 650 pass / 0 fail** (13 skipped,
3 663 testiä).

## 5. Fablelle: yksi mitattu asia, jota EI korjattu

Kuvan suurennos (`.fokuszoom`) on `document.bodyn` lapsi z-indexillä 46,
kun Ohita on `.stagessa` luvulla 3 — suurennos siis peittää Ohitan
kokonaan. Se on koko ruudun oma näkymä, jonka mikä tahansa napautus
sulkee, ja sen nostaminen Ohitan alle (tai Ohitan nostaminen rungon
tasolle) rikkoisi »iso kuva jää matkakirjakortin alle« -linjauksen, joten
en koskenut siihen tässä erässä. Sonnetin kuvaus (»toinen napautus sulki
kortin«) sopii juuri tähän: pienen kuvapakan napautus kartalla avaa
suurennoksen. Jos omistaja haluaa Ohitan näkyvän myös suurennoksen
päällä, se on oma pieni eränsä ja oma Raamattu-tarkennuksensa.

Pieni kartan kuvapakka (`.fokusvirta-luentakuva`, z-index 5) EI voi
peittää Ohitaa: se asuu `.map-panessa`, joka on `isolation: isolate`
eli oma pinonsa kartan tasolla.
