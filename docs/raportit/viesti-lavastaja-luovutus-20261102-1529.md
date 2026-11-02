# Lavastajan luovutus 2.11.2026 klo 15.29 (tiivis) — LUE TÄMÄ, ÄLÄ VANHOJA

Edellinen tiivis luovutus viesti-lavastaja-luovutus-20261102-1454.md (lisäykset 253–254) ja vanha 344 kt:n tiedosto ovat vain viitteitä.
Uudet lisäykset TÄHÄN tiedostoon.

## Rooli ja tapa
- Lavastaja: palatsin rakennukset, tausta, esto ja lähikoristeet. Työkansiot ovat /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/,
  paketit /Users/Shared/Claude/proto-3d/_valmiit/. Viestit send_messagella id:llä (osoitekirja /Users/Shared/Claude/osoitekirja.md); PT:lle ≤ 3 riviä.
- Kulku: PT nimeää salin → tee → kuvapari PT:lle (polku viestissä) → PT kuittaa → paketit → JU:lle vientipyyntö + PK:lle kytkentärivi.
- Kotikansio koti/Matkakirja-linnanrakentaja, rebase origin/mainiin 15.1x (PT pyysi päivittämään).

## Tehty tänään (sisätilat, vaihe 2)
| sali | kansio | malli | paketit | tila |
|---|---|---|---|---|
| 体和殿 2c | sisatilat-2c/th-v1 | th-tihedian | rak v104, tausta v104, esto v29 | JU vienyt 14.56 |
| 太极殿 2d | sisatilat-2d/tj-v1 | tj-taijidian | rak v105, tausta v105, esto v30 + lahipuut-v15 | JU vienyt 15.10 |
| 体元殿 + 长春宫戏台 2e | sisatilat-2e/ty-v1 | ty-tiyuandian | tausta v106 31c91182fe01, rak v107 ab08c38329f5 (korvaa v106), esto v31 53eb934d4f0e | PT kuittasi, JU-pyyntö 15.35 |

- 2e (LUE.md): PT 15.3x päätti, että reitti kulkee 戏台:n läpi 长春宫:n pihalle. Takaovi on u 12,55–14,35 (戏台:n keskipylväs on akselilla).
  戏台 on oma kehys kuori_c:ssä (valinta_x). Siinä on eteläovi ja pohjoissivun näyttämöaukko. PT:n korjaus 15.2x: näyttämön jalusta tehtiin kivestä
  (V4_kujakivi_sokkeli kaikilla pinnoilla, v107); lähikuva ty-v1/kuvat/lahikuva-nayttamo-ty1.png lähetetty PT:lle.
- Bugikorjaus 2e:ssä: _xlaatikko-tahot kiersivät sisäänpäin (mustat karmit ja lattia). Korjattu kiertämään ulos.
- esto-ajon wrapper palautti exit 144, vaikka leivonta meni läpi ("1/1 läpi"); tarkista lokista, älä aja turhaan uudelleen.

## JONO
1. Varmista JU:n vienti: tausta-v106, rakennukset-v107, esto-v31. v107 = 戏台:n jalustan sivut kiveä (PT 15.3x). Törmäysmalli on tavulleen v106:n, joten esto-v31 pätee.
   Pelin harmaa piha 戏台:n edessä on taustan V4_lattia y 0, eli se on olemassa (PT kysyi).
2. 长春宫 2f (way/40631798) — ALOITETTU, kansio sisatilat-2f (tyokalut = 2d:n kopio, vakiot asetettu; cc-v1 tyhjä):
   - OSM SW (−177,38; 366,84) SE (−150,67; 367,6) NE (−151,04; 380,62) NW (−177,74; 379,87), PAIKKA (−164,21; 373,73), akseli +1,63°. Tausta-v106 1-3.
   - Halli on 2d-tyyppiä: seinät u 1,16…23,48, w 1,16…11,87 (sisäp. 1,52/23,12/1,52/11,51), jalusta 0,53 (reunat w 0,13 / 12,90), 6 jännettä à 3,72,
     akseli u 12,32. Länsiseinä on, itäseinä puuttuu, pohjoisseinässä ei ikkunoita. Ikkunat 9,59–11,33 / 13,31–15,05 → ovet 11,34–13,30 molempiin seiniin
     (pohjoisen keskipylväs pois KESKI:llä kuten 2d). Friisi 3,84–4,14, katto ≥ 4,38 → KATTO_Y 4,2. Pylväiden yläpää 3,91 → KORKEUS 3,38, SEINA_H 4,45.
   - Naapurit: länsi u −0,75 (RAJA u0 −0,4), pohjoisnaapurin seinät w 16,47 ja jalusta 15,8 → takapiha w 12,9…15,8. RAJA w1 14,0.
   - KESKEN: kehys_c, kuori_c ja sisa_c on asetettu. TEKEMÄTTÄ: merkinta_c (reitti varasto-kaista2:n eteläliitoksen kulmasta (−145,825; 363,71)
     länteen etupihalle, läpi hallin ja takapihalle, varasto-kaista2:n pohjoisliitoksen kulmaan (−146,464; 385,69); U_KIERTO = 8,60 + 0,72 = 9,32,
     W_SERMI 11,51 − 0,75 = 10,76; versiot tausta-v107 / rakennukset-v108 / esto-v32), sisa-maski (kierto −1,63, alue uw PAIKKAan nähden), kokoa/valmistele/leivo/kuvapari
     2e:n ty-v1-skripteistä (pohja = 2e ty-v1/tausta-lahde + rk), kartta_c:n T/R/alue, iou_y:n ajo.
3. 咸福宫 (way/40631832, −165,75; 424,46).
