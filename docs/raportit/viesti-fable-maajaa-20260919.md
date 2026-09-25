# Opus → Fable: pohjoisen maajää jäätikkömaskista ja tundrasävy (19.9.2026)

Erä `opus-local-maajaa`, Matkakirja Opus local (Mac Studio), 16.27–16.50 Suomen aikaa.
Pohja `origin/opus-local-jaameri` (Jäämeren neljä committia) + suunnitelma
(`viesti-fable-maajaa-suunnitelma-20260919.md`). Päätös: Fable klo 16.55
(a) tundrasävy.

## Tulos

| Lohko 47, puhelin, kamera navan yllä, korkeus 3 | Ennen (20260919) | Jälkeen (20260919b) |
| --- | --- | --- |
| kiekon (0–70 px) levypikselit | 21,2 % | **21,1 %** |
| kiekon kirkkaus / kehän (90–115 px) kirkkaus | 82,4 / 90,0 | 80,9 / 75,6 |
| kiekon ja kehän kirkkausero | 7,6 | **5,3** |
| kehän levypikselit | 64,6 % | 64,4 % |
| savuke-astro-pallo puhelin | 53/53 | 53/53 |

Koeala 64–90° N, lähdekuva (samasta 1′-ruudukosta): yli 70°:n MAAN
vaaleat pikselit (kaikki kanavat > 180) **86,3 % → 32,3 %**.

Kuvat:
- `docs/raportit/kaappaukset/maajaa-20260919/pelissa-ennen-jalkeen-390.jpg`
  (pelin ruutu, vasemmalla ennen ja oikealla jälkeen, sama koodi ja vain
  kuva vaihdettu). Navan ympärille maan päälle jäänyt vaalea utu on
  poissa. Siperian ja Kanadan rannikot erottuvat terävästi, ja tundra on
  vihertävän harmaanruskeaa. Grönlanti, Ellesmere ja Huippuvuoret
  pysyvät valkoisina.
- `…/koeala-ennen-jalkeen.jpg` (lähdekuva napaprojektiona).

**Levypikselien < 10 % tavoite EI täyttynyt, ja edellinen raporttini oli
siinä väärässä.** Kirjoitin, että kiekon jäljellä olevat 21 % ovat
tundran jäätä. Mittaus näyttää toista: maajään rajaus muutti KEHÄÄ
(kirkkaus 90 → 75,6), mutta kiekko pysyi 21 %:ssa. Kiekko (noin yli
78° N) on lähes kokonaan Jäämerta. Sen levypikselit ovat vaaleaa
mannerjalustan merijäätä (Barentsin ja Karan meri, matalat
rannikkomeret) sekä oikeaa jäätikköä (Pohjois-Grönlanti, Ellesmere),
eivät tundraa. Seuraava askel olisi merijään sävy matalalla
mannerjalustalla, mutta se on toimituksellinen päätös, ei vika.

## Muutokset

1. **`tools/jaatikkomaski.mjs`** (uusi) + **`tools/reliefivarit.mjs`**
   + **`tools/tee-pallotopografia-koko.mjs`** + **`tests/jaatikkomaski.test.mjs`**
   (commit 0dcf9835):
   - Maski: Natural Earth 10m `ne_10m_glaciated_areas` (public domain,
     1 886 aluetta, välimuisti tmpdirissä). Rasteroitu 1′-hilaan 45° N:stä
     pohjoiseen parillisuussäännöllä ja pehmennetty ±2′ laatikolla.
     Kattaa 4,15 % pohjoisen hilasta. Rakentaminen vie 1,4 s.
   - `jaapaino(lat, korkeus, maski)`: pohjoisen maalla `maaKatto × maski`.
     Ilman maskia (null) käytetään vanhaa leveysastesääntöä, ja etelä
     käyttää sitä aina. Merijää ei muuttunut.
   - `tundrapaino` + `TUNDRAN_VARI [150,145,125]`, `TUNDRA { kaista: [64, 76],
     katto: 0,35 }`: vain pohjoisen maalla ja jäätikön ulkopuolella.
   - Testit: rasterointi (neliö ja reikä), pehmennys, maskin ja etelän
     säännöt sekä tundran rajat (4 testiä).
2. **Raportti ja kaappaukset** (erillinen commit).
3. **`js/linssit/reliefikuva.js`**, TUNNISTE 20260919b (+ testin odotus
   ja muototesti sallii kirjainliitteen `\d{8}[a-z]?`). **Viimeisenä,
   jätä pois kunnes vienti on tehty.**

## Poltto

- `SHARP_JS=…/Matkakirja-fable/node_modules/sharp node tools/tee-pallotopografia-koko.mjs --tunniste 20260919b`
- Kesto **12,9 s** (real). Kaikki 8 koetinta ok.
- `/Users/samireivinen/Matkakirja-opus-tulokset/`:
  - `topografia-pallo-koko-4k-20260919b.webp`: 780 896 tavua, 4096 × 2048, alfa 255
  - `topografia-pallo-koko-8k-20260919b.webp`: 2 878 016 tavua, 8192 × 4096
  - `poltto-b.log`
- Työkalun oma mittari, pohjoinen yli 70°: maan keskikirkkaus 205 → 151.
  Etelässä (yli 70° S) sama kuin ennen (maa 222, meri 180).
- EI viety ämpäriin.

## Vartiot

- `savuke-astro-pallo NAKYMAT=puhelin` ennen ja jälkeen 53/53
  (mustuusvartiot 43/43b ja 45a–c vihreinä).
- `NAKYMAT=tyopoyta,ei-vartija` uudella 8k-kuvalla 49/49
  (`reliefinOsoite …-8k-20260919b.webp`).
- `savuke-astro-sumu` 8/8.
- `node --test tests/*.test.mjs`: pass 3654, fail 0.
- Kuorma: selainmittaukset ajettiin vasta, kun Savukkeet-CI (v1957, run
  35445339970) oli päättynyt. Tulos oli failure; sitä en tutkinut.

## Mitä jäi

- Kiekon levypikselit 21 % (ks. yllä). Ne ovat merijäätä ja oikeaa
  jäätikköä, eivät tundraa.
- Tundran sävy 0,35 jättää tundran vielä selvästi vihreäksi (koealan
  kuvassa Kanadan saaret ja Siperia 70–76°). Jos halutaan ruskeampi,
  katto 0,5 on yhden vakion muutos, mutta uusi poltto ja vienti.
- Etelässä Natural Earthin 180 Etelämantereen rengasta ei käytetty, ja
  leveysastesääntö säilyi (tehtävänanto).

## Vienti (Fable)

```
aws s3 cp /Users/samireivinen/Matkakirja-opus-tulokset/topografia-pallo-koko-4k-20260919b.webp s3://$AMPARI/matkakirja/linssit/ --endpoint-url $PAATE --content-type image/webp
aws s3 cp /Users/samireivinen/Matkakirja-opus-tulokset/topografia-pallo-koko-8k-20260919b.webp s3://$AMPARI/matkakirja/linssit/ --endpoint-url $PAATE --content-type image/webp
```
