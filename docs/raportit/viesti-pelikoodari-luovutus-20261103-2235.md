# Pelikoodari: luovutus 3.11.2026 klo 22.35 – junat 218/219

Edellinen: -20261103-2155 (0ae7bdd54, kohta 0A korjattu PERUTUKSI), voimassa ellei alla toisin. Syy: kontekstiraja 28 % (7.37).
Proto-haarat paikallisia (repo /Users/Shared/Claude/proto-3d/Matkakirja-proto). Ei omia taustaketjuja (kaikki ajot JU:n linjoilla).

## Tehty 21.55–22.35
- **0A PERUTTU** (KK 22.1x, PT 22.2x): 21.48-tulkinta oli väärä (omistaja tarkoitti Puyin tarinakortteja). Haara
  pelikoodari/ei-opetusta-219 (c2eea58ea) HYLÄTTY, ei junaan, ei käytetä. Opetus, hidastus ja kehotteet ennallaan.
  Oikea linja Raamattu 2.200 (1eb131604): Puyin tarina vain ☰:stä tauolla ja lopetusruudusta – 6119d4a12/7ac89ff33 täyttää jo.
  Työlistan rivi "Juoksupeli ilman opetuskortteja" suljettu (peruttu).
- **JALKI v3 9d02ae999 KUITATTU JUNAAN** (PT 22.2x, PT välittää JU:lle): taso1b pito 11,20 "(nykysuunta)", kamera ≤ 3,5 m
  (v2 5,5), hypyt 4 → 0, reuna 8 → 2; ys polkukamera 4,61/9,73/12,39 ennallaan, hypyt 20 = 20. SEURANTA: ys massan reunassa
  63 → 85, kääntyilyt 8 → 10 (sessioaika 160–200 s, en erotellut). Havainnot _tyo/pelikoodari/jalki-218/havainnot-v3.md.
- **LAV tausta-v121 → runko 65282422e** (pelikoodari/saumat-v1-219 = 5733b689d + TaustaKansio v119 → v121): SHA256SUMS
  9323d408970a täsmää, vain kk-tausta-1-3-lod0.glb eroaa v119:stä; JU vienyt 22.20; LAV:n kuvat 5/5d JU:n L2-jonossa.
- **PALVELIJAT v5** (JU 22.31, esikatselu-20261103-222245): 1 osuma (#1 Ruokaeunukki 10 m vasemmalla, "tavara irti 0.40 s"),
  mutta botti kääntyi oikealle 0,1 s:ssa (z287) → reaktio kuvan ulkopuolella (osuma1-060 eri suunta; video 50,0–51,1 s
  _tyo/pelikoodari/palvelijat-v5/video-v5/). Toista osumaa ei: 238 säikähtämätöntä, kaikki > 12 m tai takana. osuma2-kuvat
  turhia (v5:n regex `#[0-9]+` täyttyi #1:stä, hyppy-jos katsoo koko lokin). PT:lle 22.3x.
- **PALVELIJAT v6** (_tyo/pelikoodari/palvelijat-v6/aja-v6.zsh, sk-palvelijat-v6.txt): = v5 + `ui juoksupeli botti 0`
  merkki osumaN -rivin jälkeen ja `botti 1` kuvan -250 jälkeen; osuma2-ehto `säikähdytetty #([2-9]|[1-9][0-9])`. Runko
  c35e3d150 ennallaan. **JU-jonossa L1 VS k10:n jälkeen** (pk-palvelijat-v6-l1.zsh, loki julkaisija-tyokalut/pk-palvelijat-v6.log;
  PT:n yötyö voi ohittaa). JU lähettää valmis-rivin.

## SEURAAVA
1. **PALVELIJAT v6** (JU ilmoittaa): grep "=säikähdytetty" ja "säikähti" lokista (lokit/esikatselu-<aika>/unity.log), kuvat
   osuma1-*.png (ja osuma2-*, jos #2) → reaktio näkyykö (tavara irti, pose). Jos näkyy: pelikuvapari PT:lle (≤ 3 riviä + polku).
   Jos ei: botti 0 ei pysäytä käännöstä (pakkokäännös?) → harkitse `ui juoksupeli palvelijat saikahda` vain kun palvelija
   kameran näkökentässä (koodimuutos arkihahmot-218:aan) tai kuvat heti 0,2/0,4 s.
2. Vedenkantajan WATER-POUR-CONTRACT vasta PT:n pelikuvaparikuittauksen jälkeen.
3. Yhdistys: arkihahmot-218 (86476dd60) junaan vasta PT:n pelikuvaparikuittauksen jälkeen. jalki-massa-218 (9d02ae999) kuitattu
   (JU yhdistää; yhdistyy ristiriidatta c35e3d150:n kanssa).
4. POHJAVAHTI-huomio JuoksuAvausJuliste.cs (vari 1 > 0) tulee pohjasta a592f6e28, ei omasta muutoksesta.
5. Testiajo oikealla palatsilla: MK_JUURI=/Users/Shared/Claude/proto-3d/_tyo/pelikoodari/juuri-t114 MK_RAKENNUKSET=kielletty-rakennukset-v117
   MK_TAUSTA=kielletty-tausta-v114 MK_ESTO=palatsi-esto-v37 ./kaanna.sh (Peli-testit; 811/811 1ab6dfa38-pohjalla).
6. Checkout /Users/Shared/Claude/Matkakirja-pelikoodari: luovutushaara koti/Matkakirja-pelikoodari (tämä tiedosto sen kärjessä).

## Lisäys 22.5x
- LAV tausta-v122 → runko **088a6ca28** (saumat-v1-219 = 65282422e + v121 → v122; SHA256SUMS 49e4e2f069ef täsmää, vain kk-tausta-1-3-lod0 eroaa v119:stä). Runko-SHA JU:lle (vienti ensin) ja LAV:lle.
