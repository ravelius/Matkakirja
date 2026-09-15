# Luennan huntu näkyviin kartan päälle (korjaus)

*(Sonnet-työsessio, 15.9.2026. Haara `claude/bold-ride-vow4ki-huntu-korjaus`.
Ei versionostoa, ei mergeä, ei Raamattua. Työskennelty erillisessä
worktreessä `/home/user/wt-huntu`. Omistajan vikailmoitus: Luennan
huntu (v1891) ei näy — Dubrovnikin saapumisluennan iPhone-kuvakaappaus,
kaiutin näkyy (luenta käynnissä) mutta kartta pysyy terävänä ja
vaaleana isoisän kuvan takana.)*

## 1. Lyhyesti

Huntu-mekanismi itse (`body.luenta-huntu .map-pane::after`,
css/fokusvirta.css) oli oikein — se ei koskaan aktivoitunut, koska
**JS:n laukaisin katsoi väärää elementtiä**. `js/ui.js`:n
`kaynnistaLuentavahti` nosti `luenta-huntu`-luokan vain kun ruudulla oli
pieni, kartalle ANKKUROITU luentakuva (`.fokusvirta-luentakuva.nakyy`)
— mutta se elementti syntyy vasta SARJAN LOPUKSI
(`js/fokusvirta.js` `nostaPieniPakka`), kun isoisä on jo vaiennut.
Isoisän ÄÄNEN aikana ruudulla on aina eri elementti: ISO keskipäällys
`.fokusvirta-isokuva` (`avaaIsokuvaPaallys`), joka asuu `.stage`:ssa
`.map-panen` VIERESSÄ. Koska vahti ei koskaan nähnyt tätä elementtiä,
ehto `kertoja && kuvaRuudulla` ei ikinä toteutunut isoisän luennan
aikana, ja huntu jäi aina pois — juuri se, minkä omistaja kuvasi.

Korjaus on yhden kyselyn laajennus: `kuvaRuudulla` tarkistaa nyt
molemmat kuvakerrokset. CSS ei tarvinnut muutoksia.

## 2. Juurisyy

`js/ui.js`, `kaynnistaLuentavahti` (~rivi 11529), ENNEN:

```js
const kuvaRuudulla = Boolean(document.querySelector('.fokusvirta-luentakuva.nakyy'));
document.body.classList.toggle('luenta-huntu', kertoja && kuvaRuudulla);
```

`.fokusvirta-luentakuva` on `js/fokusvirta.js`:n `rakennaLuentakuvanPaneeli`
piirtämä PIENI, kartalle ankkuroitu paneeli — sen kutsuu `naytaLuentakuva`,
joka puolestaan kutsutaan vain `nostaPieniPakka`:sta, JOKA AJETAAN VASTA
KUN KOKO KUVASARJA ON PÄÄTTYNYT (`paataLuentakuvasarja`). Siihen
mennessä isoisän ääni (`kertoja-aanessa`) on jo lähes aina vaiennut.

Isoisän ÄÄNEN aikana näkyvä elementti on eri asia: ISO keskipäällys
`.fokusvirta-isokuva` (`avaaIsokuvaPaallys`, kutsuu `naytaLuentakuvasarja`
→ `odotaLuennanAlku` → `avaaIsoisanSarja`). Se elementti EI koskaan saa
luokkaa `fokusvirta-luentakuva` — se on eri komponentti, eri kotelo
(`.stage`, ei `.map-pane`) ja eri elinkaari.

Lopputulos: `kuvaRuudulla` ja `kertoja` eivät koskaan olleet totta
samaan aikaan. Huntu ei siis "unohtunut pois" vaan sen ehto ei koskaan
lauennut kertaakaan koko luennan aikana.

## 3. Korjaus

`js/ui.js`, `kaynnistaLuentavahti`, JÄLKEEN:

```js
const kuvaRuudulla = Boolean(document.querySelector(
  '.fokusvirta-luentakuva.nakyy, .fokusvirta-isokuva.nakyy',
));
document.body.classList.toggle('luenta-huntu', kertoja && kuvaRuudulla);
```

`.fokusvirta-isokuva.nakyy` kattaa koko sarjan ajan (isoisän kuva JA
pulun PuluCam-kuvat), mutta `kertoja`-ehto (isoisä äänessä, ei pulu)
rajaa hunnun oikein: se nousee vain isoisän ÄÄNEN aikana, ei pulun
omien kuvien aikana. CSS (css/fokusvirta.css, `body.luenta-huntu
.map-pane::after`, staattinen suodatin, iOS-sääntö tests/rules.test.mjs)
ei tarvinnut muutoksia — mekanismi oli oikein, laukaisin oli väärä.

"Kaupunkietusivun vaaleampi huntu" tarkistettu koodihaulla: koko
repossa `luenta-huntu`-luokkaa käyttää ainoastaan tämä yksi mekanismi
(`js/ui.js` + `css/fokusvirta.css`) — mitään erillistä kaupunkietusivun
kevyempää huntua, joka jakaisi tämän luokan, ei ole.

## 4. Mittaukset (Playwright, Chromium `/opt/pw-browsers/chromium`, 390×844, Dubrovnik)

**Ennen korjausta** (`js/ui.js` alkuperäisenä):

| Mittari | Arvo |
|---|---|
| `body.kertoja-aanessa` | `true` |
| `body.luenta-huntu` | `false` |
| `.map-pane::after` computed `content` | `none` |
| `.map-pane::after` computed `z-index` | `auto` |
| `.map-pane::after` computed `backdrop-filter` | `none` |
| Oman mittausskriptin vartiot | 2/6 läpi |

**Jälkeen korjauksen**:

| Mittari | Arvo |
|---|---|
| `body.kertoja-aanessa` | `true` |
| `body.luenta-huntu` | `true` |
| `.map-pane::after` computed `content` | `""` |
| `.map-pane::after` computed `z-index` | `4` |
| `.map-pane::after` computed `backdrop-filter` | `blur(3.5px)` |
| `.map-pane::after` computed `background-color` | `rgba(30, 22, 12, 0.42)` |
| Oman mittausskriptin vartiot | 5/6 läpi (kuudes tarkisti väärää, vanhaa `.fokusvirta-luentakuva`-elementtiä — odotettu, ei virhe) |

**Pikselimittaus** (kartan kirkkaus RGB-keskiarvona, canvas-decodattuna
CDP-kuvakaappauksesta, samasta pisteestä kartalla ennen/jälkeen):

- Ennen (huntu pois): **≈236** (kirkas pergamentti)
- Jälkeen (huntu päällä): **≈146**

Kirkkaus putosi noin **236 → 146** — silmin ja mittarein havaittava
tummennus + sumennus juuri siinä kohdassa, missä omistajan
kuvakaappauksessa kartta oli yhä terävä ja vaalea.

Kuvat: `docs/raportit/kuvat/huntu-korjaus-390-ennen-20260915.jpg` ja
`-jalkeen-20260915.jpg`.

## 5. Vastakoe

`git stash` korjauksesta (`js/ui.js` palautettu alkuperäiseksi), samat
mittaukset uudelleen samalla Dubrovnik-ajolla: `luenta-huntu` palasi
`false`:ksi ja `.map-pane::after` `content: none`:ksi — vika toistui
täsmälleen. `git stash pop` palautti korjauksen. Tämä vahvistaa, että
juuri tämä yksi rivi (`kuvaRuudulla`-kysely) on koko vian aiheuttaja,
ei mikään muu samanaikainen tila.

Toinen vastakoe on nyt kiinteä osa savukevartiota
(`tools/savukkeet/savuke-luentakuvan-kerros.mjs`, osio 5): sama ajo
poistaa `luenta-huntu`-luokan hetkeksi TARJOILTAVASTA RUUDUSTA (ei
koodimuutos), ottaa kuvakaappauksen, ja vaatii mitattavan
kirkkauseron ennen luokan palauttamista.

## 6. Savukevartio

`tools/savukkeet/savuke-luentakuvan-kerros.mjs` sai uuden osion 5
"LUENNAN HUNTU": odottaa `kertoja-aanessa` + kuva ruudulla, tarkistaa
`body.luenta-huntu`:n ja `::after`:n computed-arvot, ja tekee edellä
kuvatun pikselivastakokeen samassa ajossa. Piste kartalle valitaan
AJOSSA (ei kiinteänä koordinaattina), koska kiinteä piste osui aluksi
korttiin ja sitten kartan omaan yläpalkin nappiin — molemmat
harhauttavat vastakokeen väärään nollatulokseen. Kelpaava piste vaatii
osuman `.kartta-kuori`-elementtiin ja sulkee pois napit, kiikarin,
karttaselitteen, fokusmitat, fact-cardin ja isokuvan.

## 6b. Julkaisuagentin havaitsema 19/20 — vartion oma ajoitusvirhe, ei uusi korjausvirhe

Julkaisuhaarassa `claude/julkaisu-huntu-liiku` (PR #2505) savuke antoi
19/20 kahdesti: hilan suurin kirkkausero oli **0,0** JOKAISESSA 63
pisteessä — ei pieni ero väärässä pisteessä, vaan täydellinen
nollatulos. Sama toistui puhtaassa worktreessä suoraan haarasta
`claude/bold-ride-vow4ki-huntu-korjaus`.

**Juurisyy on vartion omassa mittaustavassa, ei itse korjauksessa.**
`kaynnistaLuentavahti` (js/ui.js) ajaa `setInterval`-kyselyn
`LUENTAVAHDIN_VALI_MS` (200 ms) välein. Vartion vastakoe poisti
`luenta-huntu`-luokan käsin ja odotti 450 ms ennen "huntu pois"
-kuvakaappausta — mutta vahti näki koko ajan `kertoja && kuvaRuudulla`
totena ja **palautti luokan takaisin jo ennen kuvakaappausta**, 1–2
kertaa 200 ms:n välein. Molemmat kuvakaappaukset ("päällä" ja "pois")
olivat siis todellisuudessa SAMAA tilaa — ei ajoitusta kuormassa eikä
backdrop-filterin puutetta headlessissä (`.map-pane::after`:n
computed-arvot olivat koko ajan oikein: `content`, `z-index: 4`,
`backdrop-filter: blur(3.5px)`), vaan vartion oma käsinkosketus hävisi
elävälle ajastimelle.

**Korjaus vartioon** (`tools/savukkeet/savuke-luentakuvan-kerros.mjs`):
pysäytetään `ui.luentavahti`-ajastin (`clearInterval`) ENNEN luokan
poistoa, jotta manuaalinen "pois"-tila pysyy koko mittauksen ajan.
Ajoa ei tarvitse käynnistää uudelleen, koska sama selainkonteksti
suljetaan lohkon lopussa. Ajettu kahdesti korjauksen jälkeen samassa
worktreessä: kirkkausero **119,7** molemmilla kerroilla (kynnys 20) —
20/20 vartiota läpi kahdesti peräkkäin.

Itse tuotantokorjaus (`js/ui.js` `kuvaRuudulla`-kyselyn laajennus) oli
koko ajan oikein — `body.luenta-huntu` oli mitatusti `true` isoisän
luennan aikana jo ensimmäisessä PR #2502:n mittauksessa, ja
`.map-pane::after`:n computed-arvot olivat oikein myös julkaisuhaaran
epäonnistuneissa ajoissa. Vain vastakoe mittasi väärin.

## 7. Portit (kaikki ajettu 15.9.2026, `/home/user/wt-huntu`)

- `tools/savukkeet/savuke-luentakuvan-kerros.mjs`: **20/20 vartiota
  läpi**, huntu-vastakoe mukana (osio 5: hilan suurin kirkkausero
  23,7 ≥ kynnys 20, `body.luenta-huntu` ja `.map-pane::after`
  computed-arvot oikein).
- `NODE_USE_ENV_PROXY=1 npm test`: **# tests 3440, # pass 3427,
  # fail 0, # cancelled 0, # skipped 13** — vihreä ensimmäisellä
  ajolla, ei tarvinnut uusintaa.
- `tools/tarkista-kaksoisavaimet.mjs`: PASS ("ei kaksoisavaimia").
- `tools/tarkista-niputus.mjs`: PASS ("niputus kunnossa: 390
  moduulia, 4309 top-level-julistusta, ei törmäyksiä").
- `tools/tarkista-savukkeet.mjs`: PASS ("savukkeet kunnossa: 1702
  ui-viittausta, 407 metodia, 536 kenttää, 31 lehtitilan kenttää").
- `tests/dokumentit.test.mjs`: PASS (3/3) — tämä raportti ei tarvitse
  Raamatun karttamerkintää (docs/raportit/ on kartan ulkopuolella).
