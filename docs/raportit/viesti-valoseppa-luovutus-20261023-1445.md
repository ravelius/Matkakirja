# Valoseppä: luovutus 23.10.2026 klo 14.45 (kova raja 40 %, Postivahti)

Tili vvi＠vvi.fi. PT: local_5df52e10-10e4-4b72-9554-0049db300dfe. Päiväkirja `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md`
(rivit 13.2x–14.4x). Lue tämä kokonaan ennen jatkoa.

## Valmiina tänään (13.15–14.45)

- **Grafiikka k5–k7 junaan 210:** PT hyväksyi k7:n **c58151fce** (`linssiseppa2/grafiikka-210`, worktree
  `/Users/Shared/Claude/wt/proto-linssiseppa2-grafiikka`). NS kirjasi sen junan 210 jonoon (yhdistyy runkoon 560dd9cd8). NS oli
  kovalla rajalla, joten seuraava NS yhdistää ja vie LT:lle.
  - k6 16ff8c5c8: päivän varjo 3×3-teltalla (QA `valo teltta 0|1`). k3/k5:n neljä kierrettyä näytettä 2 tx:n välein piirsivät reunaan
    kopiot.
  - k7: kirkas päivä latauskuvan mukaan (QA `valo k7 0|1`).
  - Proto-repossa ei ole originia: haarat ovat paikallisia.
- **Varjodiagnoosi** (`/Users/Shared/Claude/proto-3d/lokit/todistus-grafiikka-varjo-20261023-1406`):
  - Salin lattian porraslaikut olivat lattian pinnassa, eivät varjoissa. Lavastaja korjasi ne (v16).
  - Alkulennon kaarta ei synny simulla. LT tarkistaa sen iPadilla junan 210 jälkeen.
- JU sulki grafiikka-210:n vahdista (vahti teki tuplakäännöksiä). Käännökset tehdään käsin:
  `zsh _tyo/linssiseppa2/kierros2/kaanna-l2.zsh <sha>`.

## Jono

1. **AUKIOIDEN LÄISKÄT (PT 14.3x, pieni lisä junaan 210 ennen rakettierää):** k8 **ca4aa9f7b** muutti PIHA-lajin tahrakohinan
   pitkäaaltoiseksi (QA `valo k8 0|1`), mutta pari `kierros2/k8-ca4aa9f7b/pari-05-*.png` on identtinen. Läiskät eivät siis tule
   PIHA-tahrasta.
   - Selvitä pinta `ui juoksupeli mika X Y` -luotauksella läiskän kohdalta (05 sillan kiveys, 06 Meridiaaniportin eteläpuoli). Muita
     ehdokkaita ovat sillan glb:n tekstuuri, laji 11/16 (kivi/marmori: `Kohina` k3-suonet tai `lohko`) ja SokkelonPinta.
   - Korjaa, aja `zsh kierros2/aja-k8.zsh <sha>` (b = k8 0) ja lähetä pari PT:lle.
   - **k8 ei mene junaan, ennen kuin läiskät oikeasti katoavat** (PT:lle kerrottu 14.4x).
2. **RAKETTIVIDEO, OMISTAJAN PÄÄTÖS 13.5x "Kyllä kaikkiin" (PT):** supernäytteistys, maasto tarkimmalla tasolla, savu ja liekin valo,
   väreily ja syväterävyys, roiske, vaahto ja meri, alku sinisessä hetkessä, NASA-vertailu, peli vs. video -pari, valaan rajaus.
   - Haara `linssiseppa2/rakettivideo-210` (wt `/Users/Shared/Claude/wt/proto-linssiseppa2-rakettivideo`):
     - f65cb6cad: videon rajaus, `linssi raketti videorajaus valas|raketti|pois [osuus]`.
     - 6aa04d066: `video-kokoa.sh --skaala`.
     - **870e873ce** (apuagentti): video-tilan tehosteet. Kytkimet `linssi raketti video maasto|valo|vareily|syvyys|valas|meri|maapilvi
       0|1`, `valokerroin <x>`, `tila`.
     - RakettiRunko- ja RakettiMeri-varjostimet on muutettu ilman editoria.
     - Raketin kohtauksessa ei ole URP-varjokarttoja, joten varjoja ei muutettu (tarkat varjot olisivat oma erä).
   - **JU kääntää Mac-käännöksen 870e873ce** (14.4x, jonossa PK:n L2:n perään) kansioon `_tyo/julkaisija/rakettivideo-mac-app`.
     Odota JU:n "LUKKO VAPAA" ja mahdolliset varjostinvirheet.
   - Ajo: `zsh _tyo/linssiseppa2/rakettivideo/odota-sha.zsh 870e873c pysty`.
     - Odottaa käännöksen, joutilaisuuden ja vapaan simun, sitten ajaa `aja-mac.zsh`.
     - `aja-mac.zsh` käyttää SS=2 (piirto 2358×5112, lanczos 1179×2556) ja kelloa SININEN=15.28 UTC (aurinko −4,5°), rajaa valaan 0,35
       ja raketin 0,3.
     - Taustalla käynnistetty 14.4x tämän session alaisena. Jos sessio nollautuu, käynnistä uudelleen.
   - Video kestää SS 2:lla ~4× pidempään (raketti ~10 min). Tarkista ruuduista, näkyykö valas, erottuuko raketti lopussa, näkyykö
     sininen hetki ja liekin valo. Säädä `valokerroin`- ja `video`-kytkimillä.
   - **Peli vs. video -pari:** `rakettivideo/pari/aja-pari.zsh 15.28` (iPad-simu, sama sininen hetki; kuvat peli-valas-huippu, peli-t6,
     peli-t9) on jonossa k8-ketjun perässä (taustatehtävä). Tulos tiedostossa `rakettivideo/pari/viimeisin.txt`.
     - Videon vastaavat ruudut: valaan huippu ~2,45 s valasvideossa; T+6/T+9 lasketaan raketti-videon Player.logista (aloituksen ja
       "video T0 kehys" -rivin erotus).
     - Kokoa parit PT:lle. Omistajalle ne menevät vain, jos video on selvästi parempi.
   - NASA-viitteet ja suurimmat erot: `rakettivideo/nasa-viite-20261023/VERTAILU.md` (maapilvi, liekin valo, vesiheijastus, sininen
     hetki). Vertaa uutta videota niihin ennen näytettä.
   - Näyte PT:lle ja KK:lle: video, ruudut-4.jpg ja vertailupari.
3. Harjakoristeet: Codexin mallit eivät ole vielä tulleet (posti `wt/fable-posti-0945/posti/harjakoristeet-20261023/`: vain
   lähdekuvat). Lavastaja kokoaa, Valoseppä asettaa harjoille.
4. A taide.md PR [ravelius/Matkakirja#5186](https://github.com/ravelius/Matkakirja/pull/5186) ennallaan.

## Opit

- PIHA-tahran muutos ei vaikuttanut läiskiin → **luotaa pinta mika-rivillä ennen kuin muutat varjostinta**.
- Salin laikut eivät reagoineet varjokytkimiin, eli ne olivat pinnassa. A/B kaikilla varjokytkimillä erottaa varjon pinnasta yhdellä
  ajolla (`varjo/sk-varjo.txt`).
- `ev`-delta ei vaikuta Juoksu-profiiliin, koska käyrä on None (ev vain AgX-käyrän kanssa). Valotus lasketaan auringon voimalla.
- Simuajot jonoon peräkkäin yhteen ketjuun. Erillisinä ne kisaavat joutilaisuusehdosta.
