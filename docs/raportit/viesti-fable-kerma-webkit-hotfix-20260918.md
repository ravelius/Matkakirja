# Viesti Fablelle: kerman WebKit-hotfix (18.9.2026)

**Haara:** `claude/bold-ride-vow4ki-kerma-webkit-hotfix` (pohja `origin/main` 720a985f, v1942).
**Ei PR:ää, ei versionnostoa, ei Raamattua eikä sarjat.jsonia.**
**Varapolkua EI otettu käyttöön — juurisyy löytyi ja korjattiin.**

## 1. Vika

Omistajan iPhone (Safari/WebKit, 390 px), Ranskan saapumisnäkymä v1942:ssa:
kohdemaan sisus maalattu tasaiseksi (merensävyinen / kermainen) reliefin
sijaan, ja kohdemaan ulkopuolella kerma näkyi vaakaraitoina. Chromium-savuke
(`savuke-kerma-reuna.mjs`, 390 ja 1400) oli vihreä, joten vika oli
WebKit-kohtainen.

## 2. Juurisyy

v1942:n `js/pallolaatat.js` `maalaaKermaRenkaidenUlkopuolelle` teki työn
KOLMESSA vaiheessa:

1. **talteenotto** — laatan kangas kopioitiin tilapäiselle kankaalle
   (`apu.drawImage(ctx.canvas, 0, 0)`, molemmat `OffscreenCanvas`),
2. **maalaus** — kerma koko laatalle maamaskilla,
3. **palautus** — kohdemaan renkaiden sisus piirrettiin takaisin
   `ctx.clip()`in läpi (`renkaidenPolku` → 32 alipolkua) `drawImage(kangas)`.

**WebKitissä vaihe 3 ei tee mitään** — hiljaa, ilman poikkeusta. Silloin
kohdemaan sisus jää siihen tasaiseen kermaan, joka vaiheessa 2 maalattiin
sen päälle, eikä `false`-varapolku laukea koskaan, koska mikään ei heittänyt.

Mitattu WebKitillä `savuke-kerma-reuna.mjs --webkit --vanha`
(vanha = `origin/main`, eli v1942):

| ruutu | Ranska σ | Ranska rgb | Saksa (kerma) rgb |
|---|---|---|---|
| työpöytä 1400×900 dpr 2 | **0,19** | 159, 151, 129 | 161, 154, 131 |
| puhelin 390×844 dpr 3 | **0,15** | 159, 151, 129 | 161, 154, 131 |

Ranskan sisus on siis sävy sävyltä sama kuin naapurin kerma ja σ on litteä:
reliefiä ei ole jäljellä. Chromiumilla samalla koodilla Ranska σ ≈ 3.

Erillinen WebKit-koe (`about:blank`, 512 × 512 OffscreenCanvas, yksi
suorakaide-alipolku) osoitti, että `drawImage` + `clip` + `getImageData`
toimivat WebKitissä sinänsä oikein. Kaatuva tapaus on siis pelin oma
ketju: kiihdytetyn `OffscreenCanvas`in oma kuva lähteenä ja
32 alipolun clip, jonka pisteistä valtaosa on kaukana kankaan ulkopuolella
(`renkaidenPolku` piirtää renkaan kaikki pisteet, myös miljoonien
pikselien päässä olevat). Kumpaakaan ei voi WebKitissä varmistaa
etukäteen, eikä epäonnistuminen näy mitenkään — siksi ketju poistettiin
kokonaan sen sijaan, että sitä olisi yritetty kiertää.

## 3. Korjaus (ei varapolku)

`js/pallolaatat.js`: talteenotto + clip-palautus korvattiin **peitemaskilla**.

* uusi `renkaidenMaski()` rasteroi kohdemaan renkaat **tyhjälle**
  tilapäiskankaalle ja lukee alfan kerran (`getImageData`),
* `maalaaKermaMaamaskilla()` sai valinnaisen `maski`-parametrin: peitto
  kerrotaan maskin ULKOPUOLISELLA osuudella (`1 − alfa/255`), joten
  kohdemaan sisällä kerroin on 0 eikä pikseliin kosketa lainkaan, ja
  reunalla peitto häipyy pehmeästi (antialiasointi säilyy),
* laatan omia pikseleitä ei enää kopioida minnekään eikä piirretä takaisin:
  ei `drawImage(ctx.canvas)`, ei `clip()`, ei `save/restore`.

Kohdemaan sisus on nyt koskematta siksi, että sitä **ei kirjoiteta** —
ei siksi, että se kirjoitettaisiin ja palautettaisiin. Jos maskia ei saada
(vanha konteksti, tainted kangas), palautetaan `false` ja kutsuja tekee
saman v1941-varapolun kuin ennenkin.

Suorituskyky: maski tarvitaan vain laatoille, joihin kohdemaa osuu
(mitattu WebKitillä 91 / 351 valmistelua); muille kerma maalataan suoraan
kuten ennen. Yksi ylimääräinen `getImageData` niitä laattoja kohti,
vastineeksi poistuneesta kankaan kopiosta.

## 4. Vartija

`tools/savukkeet/savuke-kerma-reuna.mjs` ajetaan nyt myös WebKitillä:
lippu `--webkit` valitsee moottorin (`MOOTTORI`), käynnistys ilman
Chromium-polkua, `isMobile` pois (Playwright ei tue sitä WebKitissä), ja
kuvakaappaus sivun omalla `screenshot()`illa, koska CDP on Chromiumin oma.
Kaappausten nimiin tuli moottorin etuliite. Erillistä
`savuke-kerma-webkit.mjs`-tiedostoa ei tarvittu — väitteet ovat samat,
vain moottori vaihtuu, ja V5 (*Ranskan sisällä reliefi säilyy*) on
täsmälleen se väite, joka tämän vian nappaa.

Ajo:

```
PLAYWRIGHT_JS=…/node_modules/playwright/index.js \
  node tools/savukkeet/savuke-kerma-reuna.mjs --webkit
```

## 5. Mittaus

| ajo | tulos |
|---|---|
| WebKit, v1942 (`--webkit --vanha`) | **14/16** — V5 kaatuu molemmilla ruuduilla (Ranska σ 0,19 / 0,15) |
| WebKit, korjattu (`--webkit`) | **16/16** — Ranska σ 2,96 / 2,96, rgb 153,127,83 |
| Chromium, korjattu | **16/16** (V1, V2, V4, V5 vihreitä molemmilla ruuduilla) |

Muut luvut korjatulla WebKitillä: V1 reunan pari Δ 0,0–0,1; V2 leveä pari
Δ 0,0–0,2; V4 Kanaali vs. Pohjanmeri suurin kanavaero 3; V7 musteen
kontrasti 1,7 (Sveitsi) ja 2,6 (Italia) — nostotason maittainen jako pitää
musteen yhä piilossa.

`node --test tests/*.test.mjs` 3623 läpi, 0 kaatunutta.
`node tools/tarkista-savukkeet.mjs` kunnossa. Tuonnit eivät muuttuneet.

## 6. Kaappaukset

`docs/raportit/kuvat/kerma-webkit-20260918/`

* `ennen-webkit-390.png` — WebKit-toiston ensimmäinen ajo (reliefilinssi auki)
* `webkit-vanha-*.png` — v1942 WebKitillä: Ranskan sisus tasaista kermaa
* `webkit-uusi-*.png` — korjattu WebKitillä: reliefi näkyy, naapurit kermaa
* `chromium-uusi-*.png` — Chromium korjattuna

## 7. Mitä jäi

* Omistajan kuvassa kohdemaan sisus oli **merensininen** ja kerma
  vaakaraitoina; savukkeen mittaama WebKit-tila on sama juurisyy mutta
  lievempi ilmiasu (litteä kerma). Aitoa iOS-Safaria ei tässä erässä
  ajettu — jos raidat näkyvät vielä korjatussa v-julkaisussa, ne ovat
  oma vikansa (todennäköinen epäilty: varapolun `fillRect`-kaistat).
* V7:n muste ja V3:n tiukka pohjoispari ovat ennallaan, tähän erään ei
  koskettu.
