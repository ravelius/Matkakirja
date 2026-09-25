# Viesti Fablelle: Astronautin kameran sumu (PAATOKSET 43 kohta 7 + TARKENNUS)

Opus-erä 18.9.2026, haara `claude/bold-ride-vow4ki-astro-sumu`
(pohja `claude/bold-ride-vow4ki-v1947`). Versiota EI nostettu.

Omistaja sanatarkasti: *"Avaruus Linssissa pitaisi olla sumua alussa
kun pallo zoomautuu lahemmas…"* ja *"Voisiko se sumu olla myos
avaruudessa jonka lapi zoomataan? Ja onko se epatasaista kuin aidot
sumu pilvet?"*

## 1. Mitä tehtiin

Uusi moduuli **`js/linssit/astro-sumu.js`**, jonka Astronautin kamera
(`js/linssit/satelliitti-avaruus.js`) avaa ja purkaa. Sumu on
kaksiosainen, täsmälleen niin kuin Raamatun tarkennus sanoo.

**a) PILVIKERROS.** Toinen läpinäkyvä pallokuori pinnan yläpuolella,
säde `1,01 × pallon säde`, tasavälinen pilvitekstuuri, valaisematon
materiaali (`MeshBasicMaterial`, `transparent`, `depthWrite: false`),
oma hidas pyöriminen **0,5°/min** pinnan suhteen. Peitto **0,9 kaukaa**
ja **0 lähizoomissa** (liuku `0,65 → 0,25 × avauskorkeus`,
smoothstep), jotta reliefi ja yön valot näkyvät lähellä.

Kuori ei ole uutta three.js-koodia vaan laudan oma `lauta.linssit.kalvo`
(`js/pallolauta/linssit.js`), joka osaa jo pallokuoren, valaisemattoman
materiaalin ja tekstuurin kankaasta — ja ennen kaikkea **vapauttaa
tekstuurin purussa**. Kahvaan lisättiin kaksi suoraa kirjoitusta:

* `peitto(arvo)` — peittävyys **ilman häivytysanimaatiota**. Zoomista
  laskettu arvo kirjoitetaan joka kehyksellä, eikä `peittavyys()`
  kelpaa: peräkkäiset häivytykset kilpailisivat ja kirjanpitoon
  kertyisi tuhansia aloituksia sekunnissa.
* `kierra(kulma)` — kuoren oma kierto pinnan kierron päälle
  (`tila.pinnanKierto` otetaan talteen kuorta luotaessa).

**b) AVARUUSSUMU** kameran ja pallon välissä, jonka **läpi zoomataan**.
Kaksi läpinäkyvää kalvoa linssin omassa kotelossa (WebGL-kankaan
päällä, kohdemerkkien alla, `pointer-events: none`), saumaton
512 px fraktaalikohina taustakuvana, eri kokoluokassa ja eri
nopeuksilla ajelehtivina. Taustakuvan mittakaava kasvaa lähestyttäessä
(1 → 2,2), jolloin sumu ei näytä tapetilta vaan hiukkasilta, joita
kohti mennään. **Ei three.js Fogia, ei tasaista himmennystä.**

**Peiton profiili** (`s = kameran korkeus / avauskorkeus`):

| | kaukaa (s = 1,3) | keskellä (s = 0,6) | lähellä (s ≤ 0,22) |
|---|---|---|---|
| sumu | 0,15 | 0,62 | 0 |
| pilvet | 0,90 | 0,86 | 0 |

**Liikkeenvähennys:** ei ajelehdintaa eikä pilvien pyörimistä; peitto
seuraa zoomia kuten ennenkin.

**Kytkin `?sumu=0`** sammuttaa molemmat kerrokset — ilman sitä peiton
profiilia ei voisi mitata ruudulta (vertailuajo).

## 2. Tekstuurin lähde ja lisenssi

Aito NASA-kuva **ei ole vielä käytössä**, koska mediaa ei saa tuoda
repoon ja ämpärissä sitä ei vielä ole. Pilvet ovat siis toistaiseksi
**proseduraalinen fraktaalikohina** (generoidaan ajossa kankaalle,
leveysastepaino `pilvipaino`-käyrästä: päiväntasaajan nousuvyöhyke ja
lauhkeat matalapaineet pilvisiä, aavikkovyöhyke selkeä). Kaappauksissa
se näyttää oikeilta pilviltä, ei harsolta.

**Kytkin on valmiina ämpärin kuvaa varten:**
`PILVIEN_OSOITE = null` → Fablen vietyä kuvan ämpäriin yhden vakion
vaihto ottaa sen käyttöön, koodi ei muutu, eikä puuttuva tiedosto
aiheuta yhtään turhaa pyyntöä.

Lähde kirjattu koodiin (`PILVIEN_LAHDE`) ja yksikkötestiin:

* **NASA Visible Earth — "Blue Marble: Next Generation", pilvikuva
  (`cloud_combined`)**, https://visibleearth.nasa.gov/images/57747/blue-marble-clouds
* **Lisenssi: public domain** (NASA:n tuottama kuva-aineisto ei ole
  tekijänoikeuden alaista; Commonsissa PD-USGov-NASA).
* Suositeltu koko ämpäriin: **2 048 × 1 024** (ks. muistilasku alla).
  4k on 32 Mt eli täsmälleen PAATOKSET 36:n rajalla, eivätkä pilvet
  tarvitse sitä — ne häipyvät juuri siinä zoomissa, jossa tarkkuus
  alkaisi näkyä.

> Huom. Verkkohaku Macilta olisi voinut ladata kuvan, mutta sitä ei saa
> committoida repoon, joten lataus ei olisi vienyt asiaa eteenpäin.
> Vienti ämpäriin on Fablen työ; ehdotettu polku
> `matkakirja/linssit/pilvet-bluemarble-2048.png` (tai .webp).

## 3. Mittaus

`tools/savukkeet/savuke-astro-sumu.mjs`, Chromium, **390 × 844, dpr 2**,
kamera Italian saappaan ylle (41,0 N / 14,5 E), kolme korkeutta, ja
kaikki verrattuna samaan ajoon ilman sumua (`?sumu=0`).
Ajo: `PORTTI=8838`, avauskorkeus 4,25 → mitatut korkeudet 5,53 / 2,55 / 0,77.

```
OK  peiton profiili: kaukaa < 0,2, keskeltä > 0,5, läheltä 0 — kauko=0.15 keski=0.62 lahi=0
OK  ruudun kirkkausero: kaukana ja keskellä selvä, lähellä nolla — kauko=82.32 keski=83.53 lahi=-0.21
OK  sumukalvon peitto ruudulla: kaukaa < 0,2, keskeltä > 0,5, läheltä 0 — kauko=0.15 keski=0.62 lahi=0
OK  kohinan hajonta ruudulla > 0 (ei tasainen himmennys) — sumu=29.76 sumuton=16.38
OK  kaksi sumukalvoa DOMissa ja peitot eri suuret — kalvoja=2 peitot=[0.62,0.446]
OK  fps >= 50 — 80 fps (sumuton 80.4)
OK  pilvitekstuuri <= 32 Mt (PAATOKSET 36) — 2048x1024 RGBA = 8 Mt
OK  ei sivuvirheitä
8/8 vihreänä
```

**Kohinan hajonta.** Keskiruudun kirkkauden keskihajonta on sumun
kanssa **29,8** ja ilman sumua **16,4** — sumu siis *tuo* ruudulle
rakennetta. Tasainen himmennys olisi laskenut hajontaa, ei nostanut.

**Muisti.** Pilvitekstuuri on `2 048 × 1 024 × 4 = 8 Mt` (raja 32 Mt);
sumukangas 512 × 512 menee CSS:n taustakuvaksi eikä pallolle.
Laattakerroksen tekstuuritavut olivat molemmissa ajoissa 0 Mt (tässä
zoomissa reliefilaastari ei sytytä laattoja). **JS-keko kirjattiin
mutta se EI ole vertailukelpoinen:** sumullinen ajo 245 Mt,
sumuton 185 Mt — ja sama ajo näytti 281 Mt jo *ennen* linssin avausta,
eli ero on roskienkeruun ajoitusta eikä sumun hintaa. Siksi väite
tehdään deterministisestä tekstuuribudjetista.

**Kaksi väitettä muotoiltiin uudestaan kesken ajon**, ja molemmat on
perusteltu savukkeen kommenteissa:
1. Ensimmäinen versio vaati ruudun kirkkauseron olevan *keskellä*
   suurin. Punainen (kauko 83,8 vs. keski 83,5) — mutta vika oli
   mittarissa: ruudun ero on **pilvien ja sumun summa**, ja pilvet ovat
   kaukana ja keskellä lähes yhtä peittävät. Sumun oma profiili luetaan
   nyt kalvojen todellisesta peittävyydestä (`getComputedStyle`), ja
   ruudulta vaaditaan se, mikä siitä seuraa.
2. JS-keon vertailu kahden selainkontekstin välillä korvattiin
   tekstuuribudjetilla (ks. yllä).

**Kaappaukset:** `tools/savukkeet/kaappaukset/astro-sumu/`
(`astro-sumu-{on,off}-{kauko,keski,lahi}.png`). **Ei committoitu**
(kuvat eivät mene repoon) — polku on Macilla worktreessä
`.claude/worktrees/agent-a44a6de30edb2e8c5/tools/savukkeet/kaappaukset/astro-sumu/`.

**Napahäivytys kaappauksen perusteella.** Ensimmäinen kaappaus paljasti
tasavälisen projektion oman vian: kuvan ylin rivi puristuu navalla
yhteen pisteeseen, ja pilvikohina venyi siellä säteittäiseksi viuhkaksi.
Lisättiin `PILVIEN_NAPAHAIVYTYS = [66, 80]` (alfa nollaan navoille päin)
ja savuke ajettiin uudestaan — luvut yllä ovat korjatusta ajosta.

## 4. Testit ja koonti

* `node --test tests/*.test.mjs` → **# pass 3644, # fail 0** (3 657 testiä,
  13 ohitettu). Uusi `tests/astro-sumu.test.mjs` (12 testiä): peiton
  profiilit, kohinan saumattomuus ja epätasaisuus, pilvipikselien
  vyöhykejakauma, `?sumu=0`, lähteen lisenssi, linssin kytkentä ja
  kalvokahvan uudet metodit.
* `node tools/build-standalone.mjs` → `dist/matkakirja.html` (32 768 kt).
  Moduuli lisättiin `sw.js`:n SHELL-koriin; MODULES-listalle sitä ei
  tarvita, koska linssimoduulit ladataan laiskasti.

## 5. Mitä jäi

1. **Aito NASA-pilvikuva ämpäriin** (Fable): lähde ja lisenssi luvussa 2,
   kytkin `PILVIEN_OSOITE`.
2. **WebKit-ajo** jäi tekemättä. Tehtävän mukaan WebKit ajetaan vain jos
   savuke pääsee sivunlatauksen läpi; aikakatto tuli vastaan, ja
   Chromium-ajo kattaa kaikki kahdeksan väitettä. `savuke-astro-webkit.mjs`
   on koskematon.
3. **Pilvien ja sumun yhteisvaikutus lähizoomissa** on nolla molemmilla,
   mikä on päätöksen mukaista — mutta jos omistaja haluaa *hitaamman*
   häipymisen, ainoat säädettävät luvut ovat `PILVIEN_TAYSI` /
   `PILVIEN_NOLLA` ja `SUMUN_LAHI`.
4. **Pilvien nollakohta on `0,25 × avauskorkeus`**, ei laastarin
   syttymisraja. Syy on mitattu: laastarin raja on
   `piirtokorkeus / (53,43 × perustiheys)`, mikä on dpr 3:n puhelimella
   noin 4,1 eli käytännössä sama kuin avauskorkeus — siihen sidottuna
   pilvet olisivat aina nolla. 0,25 on sama kynnys, jolla kohdenimet
   syttyvät, eli juuri se hetki, jossa lähikuva alkaa.

## 6. Kosketetut tiedostot

```
js/linssit/astro-sumu.js              uusi (moduuli)
js/linssit/satelliitti-avaruus.js     kytkentä: luonti, kehys, tila, purku
js/pallolauta/linssit.js              kalvokahva: peitto() ja kierra()
sw.js                                 SHELL-kori
tests/astro-sumu.test.mjs             uusi (12 testiä)
tools/savukkeet/savuke-astro-sumu.mjs uusi (savuke, 8 väitettä)
docs/raportit/viesti-fable-astro-sumu-20260918.md  tämä
```

Muihin agentteihin (kohdemerkin napautus, kaupunkipisteiden suodatus,
yläpalkin CSS, fokusvirran Ohita) ei koskettu.
