# Opus → Fable: Jäämeren merijää kevyemmäksi ja reliefi poltettu uudelleen (19.9.2026)

Erä `opus-local-jaameri`, Matkakirja Opus local (Mac Studio), 15.42–16.00 Suomen aikaa.
Pohja `origin/claude/bold-ride-vow4ki-astro-napa-2` (lohko 47). Omistajan päätös
klo 15.40 Suomen aikaa: vaihtoehto 1, uudelleenpoltto.

## Tulos

| Mitta (lohko 47, puhelin, kamera navan yllä, korkeus 3) | Ennen (20260916) | Jälkeen (20260919) | Tavoite |
| --- | --- | --- | --- |
| kiekon levypikselit (sinisyys < 20) | 100 % | **21,2 %** | < 10 % ✗ |
| kiekon ja kehän kirkkausero | 3,7 | **7,6** | < 8 ✓ |
| kiekon sinisyys | 12,3 | 21,4 | – |
| kiekon hajonta (tekstuuri) | 6,1 | 10,5 | – |
| savuke-astro-pallo puhelin | 53/53 | 53/53 | ennallaan |

Levy on nyt tekstuuria: Kanadan allas, Euraasian allas ja Lomonosovin
selänne erottuvat (kuva `docs/raportit/kaappaukset/jaameri-20260919/pelissa-ennen-jalkeen-390.jpg`,
vasemmalla ennen ja oikealla jälkeen, sama koodi ja vain kuva vaihdettu).
Levypikselien tavoite < 10 % EI täyttynyt. Jäljelle jääneet 21 % ovat
maan jäätä, ei merijäätä (ks. "Mitä jäi").

## Muutokset (neljä committia, tunniste viimeisenä)

1. **`tools/reliefivarit.mjs`** (00f58388): `JAA.meriPohjoinen [72, 84]`
   ja `JAA.meriPohjoinenKatto 0,4`, joita `jaapaino` käyttää vain
   pohjoisella pallonpuoliskolla (lat > 0). Etelän merijää (`meri [66, 78]`,
   `meriKatto 0,72`) ja kaikki mannerjää (`maa`, `maaKatto`) ovat ennallaan.
   `tests/satelliitti-avaruus.test.mjs`: pohjoisen ja etelän katot
   erikseen, ja pohjoisen merijää alkaa vasta 72°:ssa.
   `tools/tee-pallotopografia-koko.mjs`: napakoetin odottaa nyt
   `merijaa` (sininen johtaa, vaalennettu), ei puhdasta jäätä. Poltto
   antoi pisteelle rgb(116,140,181).
2. **`tools/tee-pallotopografia-koko.mjs`** (d1df642f): sharp-varapakkaus.
   Macilla ei ole Pillow'ta missään Pythonissa (Homebrew 3.14 eikä
   /usr/bin), joten polttotyökalu kaatui pakkaukseen. Varapolku pakkaa
   WebP:n sharpilla (laatu 76, effort 6) ja pienentää 2 × 2 -keskiarvolla,
   joka on täsmälleen Pillow'n BOX. Worktreessä `SHARP_JS=<polku>/node_modules/sharp`.
3. **`tools/savukkeet/savuke-astro-pallo.mjs` ja `savuke-astro-sumu.mjs`**:
   `SAVUKE_AMPARI_PAIKALLINEN=<kansio>` palvelee ämpäriosoitteen
   levyltä, jos kansiossa on samanniminen tiedosto; näin uusi kuva
   mitataan ennen vientiä. Oletuksena pois päältä. Lohkoon 47 on lisätty
   diagnostiikkarivi `NAPA-ILMAN-SUMUA` (sama kiekko ja kehä
   avaruussumu piilotettuna, ei väitettä) ja kaappaus
   `astro-napa-ilman-sumua-*`.
4. **`js/linssit/reliefikuva.js`**, TUNNISTE 20260919: osoitteet
   `topografia-pallo-koko-{4k,8k}-20260919.webp` ja testin odotus.
   **Tämän voi jättää pois, kunnes vienti on tehty.** Muuten linssi
   hakee 404:n ja putoaa generoituun Maahan. SHA:t ovat viestissä.

## Poltto

- Komento: `SHARP_JS=/Users/samireivinen/Matkakirja-fable/node_modules/sharp node tools/tee-pallotopografia-koko.mjs --tunniste 20260919`
- **Kesto 12,1 s** (real; korkeuspalat olivat Macin tmpdir-välimuistissa,
  laskenta noin 7 s ja sharp-pakkaus noin 4 s).
- **Tiedostot** (EI viety ämpäriin), `/Users/samireivinen/Matkakirja-opus-tulokset/`:
  - `topografia-pallo-koko-4k-20260919.webp`: 775 546 tavua, 4096 × 2048,
    alfa 255…255 (vanha 770 066)
  - `topografia-pallo-koko-8k-20260919.webp`: 2 878 422 tavua, 8192 × 4096
    (vanha 2 872 604)
  - `poltto.log`
- Kaikki kahdeksan sijoittelukoetinta ok. Kaksi polttoa samoilla arvoilla
  tuottivat tavu tavulta saman 4k-tiedoston.
- Vertailu vanhaan 4k-kuvaan (keskimääräinen kanavaero; sinisyys
  = sininen − punainen):

  | Kaista | Keskiero | Sinisyys vanha → uusi |
  | --- | --- | --- |
  | −90…−60° (Etelämanner) | 1,07 | 32,6 → 32,5 |
  | −60…60° | 1,91 | 56,6 → 56,6 |
  | 60…72° N | 4,29 | 11,1 → 13,7 |
  | 72…90° N | 33,41 | 30,5 → 60,4 |

  Etelän ja keskileveyksien pieni ero on pakkaimen kohinaa (sharp vs.
  Pillow): sisältö ei muuttunut. Etelämantereen jääpeite ja lumiraja
  ovat ennallaan.

## Koeala ennen koko polttoa

Tehtiin samasta 1′-ruudukosta, samalla väriasteikolla ja samalla
varjostuksella 64–90° N napaprojektiona
(`docs/raportit/kaappaukset/jaameri-20260919/koeala-lahdekuva-ennen-k040-k050.jpg`:
vasemmalla ennen, keskellä 0,40 [72, 84] ja oikealla 0,50 [72, 84]).
Yli 80°:n meren sinisyys lähdekuvassa: 34,3 → 66,7 (0,40) / 57,8 (0,50).

Huomio: jo VANHASSA lähdekuvassa altaat näkyvät. Pelissä ne katosivat,
koska linssi himmentää kuvaa (`RELIEFIN_SATURAATIO` 0,8 ja
`valoLiuku`n kompensaatio navalla noin 0,63). Kevyempi jää antaa sävyerolle
tilaa selvitä himmennyksen läpi.

## Kokeiltu ja hylätty: 0,25 [74, 86]

Levypikselit 21 → 18,8 % (vain 2 prosenttiyksikköä), mutta kiekko
tummui kehää tummemmaksi: kirkkausero 12,8 eli yli rajan 8. Hylätty ja
palautettu 0,40 [72, 84]:ään.

## Mitä jäi (levypikselit 21 %)

Diagnostiikka ilman avaruussumua: kiekon levypikselit 25,4 %, eli
jäännös ei ole sumua. Sumu vaalentaa koko ruutua tasaisesti (kirkkaus
+14). Jäännös on MAAN jäätä: `JAA.maa [62, 70]` ja `maaKatto 0,88`
tekevät KAIKESTA yli 70°:n maasta lähes jäänvalkoista. Tähän kuuluvat
Kanadan arktiset saaret, Pohjois-Grönlanti ja myös Taimyrin ja
Siperian rannikon tundra, joka ei ole jäätikköä. Kuvassa se näkyy
vaaleana renkaana 70–80°:ssa myös maan päällä. Tehtävänanto rajasi
mannerjään pois. Jos tavoite < 10 % halutaan, seuraava askel on maajään
rajaus todellisiin jäätiköihin (Grönlanti, Etelämanner, arktiset
jäätiköt), esimerkiksi korkeuden tai jäätikkömaskin avulla. Se vaatii
aineiston ja Fablen päätöksen.

## Tarvitseeko reliefipyramidi (topografialinssi) saman muutoksen?

**Ei.** `jaapaino` on käytössä vain tiedostossa `tools/tee-pallotopografia-koko.mjs`
(grep: tools/, js/, tests/). Reliefipyramidi (`tools/tee-reliefipyramidi.mjs`,
`varjostaJaVarita`) ei sekoita jäätä lainkaan, eli Jäämeri on siellä
puhdasta syvyysasteikkoa, ja PAATOKSET 41:n napakansi on MERIVARI 85°:n
yläpuolella. Topografialinssissä ei siis ole tätä levyä.

## Mittarit

- `savuke-astro-pallo NAKYMAT=puhelin`: ennen 53/53 ja jälkeen 53/53
  (paikallinen ämpäri; mustuusvartiot 43/43b ja 45a–c vihreinä).
- `savuke-astro-pallo NAKYMAT=tyopoyta,ei-vartija` uudella 8k-kuvalla:
  49/49 (`reliefinOsoite …-8k-20260919.webp`).
- `savuke-astro-sumu` uudella kuvalla: 8/8.
- `node --test tests/*.test.mjs`: pass 3650, fail 0.
  `node tools/tarkista-savukkeet.mjs`: kunnossa.

## Vienti (Fable)

```
aws s3 cp /Users/samireivinen/Matkakirja-opus-tulokset/topografia-pallo-koko-4k-20260919.webp s3://$AMPARI/matkakirja/linssit/ --endpoint-url $PAATE --content-type image/webp
aws s3 cp /Users/samireivinen/Matkakirja-opus-tulokset/topografia-pallo-koko-8k-20260919.webp s3://$AMPARI/matkakirja/linssit/ --endpoint-url $PAATE --content-type image/webp
```
sitten HEAD 200 ja commit 4 mukaan.
