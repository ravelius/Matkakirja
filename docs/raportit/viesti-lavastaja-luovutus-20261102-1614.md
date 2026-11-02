# Lavastajan luovutus 2.11.2026 klo 16.14 (tiivis) — LUE TÄMÄ, ÄLÄ VANHOJA

Edellinen tiivis luovutus viesti-lavastaja-luovutus-20261102-1529.md (lisäykset 255–257) ja sitä vanhemmat ovat vain viitteitä.
Uudet lisäykset TÄHÄN tiedostoon.

## Rooli ja tapa
- Lavastaja: palatsin rakennukset, tausta, esto ja lähikoristeet. Työkansiot /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/,
  paketit /Users/Shared/Claude/proto-3d/_valmiit/. Viestit send_messagella id:llä (osoitekirja /Users/Shared/Claude/osoitekirja.md); PT:lle ≤ 3 riviä.
- Kulku: PT nimeää salin → tee → kuvapari PT:lle (polku viestissä) → PT kuittaa → paketit → JU:lle vientipyyntö + PK:lle kytkentärivi.
- Esto leivotaan worktreessä /Users/Shared/Claude/wt/proto-lavastaja-esto-2f (proto-repo, 5cba23158 detached; luotu 2.11., 2e:n worktree oli poistettu).
  Wrapper voi palauttaa exit 144, vaikka leivonta meni läpi; katso lokista "1/1 läpi".

## Tehty tänään (sisätilat, vaihe 2)
| sali | kansio | malli | paketit | tila |
|---|---|---|---|---|
| 体和殿 2c | sisatilat-2c/th-v1 | th-tihedian | rak v104, tausta v104, esto v29 | kytketty |
| 太极殿 2d | sisatilat-2d/tj-v1 | tj-taijidian | rak v105, tausta v105, esto v30 | kytketty |
| 体元殿 + 长春宫戏台 2e | sisatilat-2e/ty-v1 | ty-tiyuandian | tausta v106, rak v107, esto v31 | PK 7dcdc05d2 |
| 长春宫 2f | sisatilat-2f/cc-v1 | cc-changchungong | tausta v107 cbbfa616d5b7, rak v108 ea9218625ae7, esto v32 fee400ebb176 | JU 16.05, PK 54fac919c |
| 咸福宫 2g | sisatilat-2g/xf-v1 | xf-xianfugong | tausta v108 37ba5a158b8a, rak v109 0131da2db791 (sis. cc:n korjauksen); esto pysyy v32:na | PT kuittasi, JU-pyyntö + PK-rivi 16.1x |

- 2g: taustan 咸福宫 oli matala OSM-laatikko (2,0 m). PT hyväksyi, että kuori tehdään 长春宫:sta: tyokalut/siirra_cc.py siirtää cc:n taustakuoren
  (tausta-v106 1-3, 2f:n valinta) 咸福宫:n kehykseen. u paloittain 6 → 5 jännettä (2,83 / 2,83 / 6,00 / 2,83 / 2,83, keskusjänne valtaistuimelle
  ja 1,5 m:n kululle; PT hyväksyi poikkeaman 3,5:stä), w × 1,13, y − 0,01 → xf-v1/lahde/. Koroke ja sermi 3,0 m, nimilaatta 2,8 m.
  Reitti S-N juhlasalin eteläliitoksen kulmasta (−147,235; 409,01) etupihan poikki u 10,08:aan, hallin läpi, takapiha w 15,6, pohjoisliitoksen kulmaan (−147,874; 430,99).
- Esto-v33 oli tavulleen v32 (matalan hallin seinät < 1,5 m eivätkä uuden hallin seinät sulje ruutuja, koska ovet ovat auki), joten sitä ei viety. Paketti _valmiit/juoksupeli-palatsi-esto-v33-vienti-20261102 on vain viite.
- Puukortit etupihalla eivät estä reittiä: esto merkitsee vain janojen sulkemat ruudut, ja reittien kaistat kaiverretaan sen jälkeen (JuoksuPalatsiEsto.cs).
- PT:n korjaus (16.0x, sekä 2f:n että 2g:n kuori_c.py): katkaise() leikkaa pitkien seinätasojen vinon yläreunan räystään alapintaan (SEINA_Y 4,39 / 4,38),
  ja seinien ulkopuolelta räystään alta poistetaan irtopalat (±0,3 m). Törmäys tavulleen ennallaan.

## JONO
1. Varmista JU:n vienti (tausta-v108, rakennukset-v109) ja PK:n kytkentä.
2. PT:n pikkuhuomio seuraavaan pakettiin (ei estä): sisä-kuvissa vasemman etukulman alla pieni tummanpunainen kolmio (pari-xf1 sisa ~x820 y300,
   cc ~x795 y655, eli SW-kulma seinän ulkopuolella matalalla). Jos se on irtopala, poista se kuori_c:ssä (mahdollisesti länsipäätyseinän alareuna u < 1,2).
3. Seuraava sali PT:ltä (läntisten palatsien rivi: 储秀宫, 翊坤宫, 永寿宫, 长春宫 ja 咸福宫 tehty). Jos jono on tyhjä, rivi PT:lle "JONO TYHJÄ: Lavastaja".

## Lisäys 258
- JONO 1 TEHTY: PK kytki 咸福宫:n 4520c653b (rakennukset-v109, tausta-v108, esto v32; SHA:t täsmäävät), 797/797, umpikujia 0; salitallenne sali-218b cab3ff92b.

## Lisäys 259 (PT 16.2x: kolmion korjaus + seuraava sali)
- PUNAINEN KOLMIO = taustan V4_ikkunakehyksen vaakasuorat hajakolmiot (y 1,72, sivu 3–6 m), 3 kpl sekä cc:ssä että xf:ssä; kuvassa kulman ulkopuolella.
  kuori_c.py (2f ja 2g) poistaa ikkunakehyskolmiot, joiden pisin sivu > 2 m (kehyksen osat ≤ 1,3 m). xf-v1/korjaa-v110.zsh: lod0 + leivonta uudelleen;
  v109:n lähteet talteen *-v109.glb. Törmäys, tausta ja esto ennallaan. Paketti rakennukset-v110 (vain cc + xf lod0/1/2) leivonnan jälkeen.
- SEURAAVA SALI: proto-3d/_tyo/linnanrakentaja/seuraava-sali/ (hallit.py, kartta.py, reittikartta.png). Sokkelo itäpuolella = kuja-338:n 8 avoimet-huonetta
  ja liitokset itäisten palatsien välissä. Etäisyys sokkeloon: 承乾宫 (OSM 承干宫) 5,3 m, 钟粹宫 5,8, 永和宫 6,2, 景阳宫 9,9, 景仁宫 21 (sokkelon eteläpuolella),
  延禧宫 rauniona pois. 重华宫 lähimpänä nykyisiä saleja (75 m 咸福宫:sta), mutta 38 m reitistä (vain 重华门 1,8 m) → vaatisi uuden reitin.
  Ehdotus: 承乾宫 ensin, sitten 钟粹宫, 永和宫, 景阳宫; 景仁宫 ja 重华宫 vasta reittijatkon kanssa.

## Lisäys 260 (PT 16.3x–16.4x: järjestys ja salien pinnat)
- PT: KÄY 承乾宫 → 钟粹宫 → 永和宫 → 景阳宫 (重华宫 odottaa). JÄRJESTYSMUUTOS: kolmiokorjaus → salien pinnat (VS salit3/erot.md) → 承乾宫 uusilla pinnoilla.
- Kolmiokorjaus: lähikuva sisatilat-2g/xf-v1/lahikuva-kolmio-v110.jpg PT:lle 16.3x (kolmio poissa). rakennukset-v110.zsh valmiina, EI ajettu:
  PÄIVITYS: PT kuittasi → v110 TEHTY kolmiokorjatuista (leivottu/*-lod0-v110.glb), SHA256SUMS e7ec09b453a3, JU + PK-rivi 16.4x. Pinnat → v111.
- Worktreet lavastaja-sisatilat-korjaus ja lavastaja-lisays245 poistettu (Postivahti/PT, haarat jäävät).
- PINNAT: proto-3d/_tyo/linnanrakentaja/salipinnat/ (pinnat.py, aja.zsh, kuvaa.zsh, kokoa_pari.py). pinnat.py jälkikäsittelee lod0:n ennen leivontaa,
  vain olemassa olevilla materiaaleilla (juhlasali.glb avoimet-v52): lattia V4_jinzhuan → "Floor tile 0–9" laatoittain + V4_sokkeli-sauma;
  Dark warm timber + V4_wood → "Sisapaneeli puu" (UV × 0,5); korokkeen kansi → "Juoksumatto huone"; sermi (Muted gold ≥ 1 m²) → V4_palatsi_friisi.
  aja.zsh: lod0 talteen *-lod0-ennen-pinnat.glb (myös leivottu/), pinnat, rk-kopio, leivonta; 8 salia xf cc c y ys th tj ty.
  Seuraavaksi: kuvaa.zsh <kansio/nimi> jokaiselle → kokoa_pari.py → salit-pinnat-pari.jpg PT:lle → kuittaus → rakennukset-v111 (8 salia, pohjaksi v110) → JU + PK.
