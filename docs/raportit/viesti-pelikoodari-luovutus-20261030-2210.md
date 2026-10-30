# Pelikoodari: luovutus 30.10.2026 klo 22.10 (konteksti 30 %, pehmeä raja)

Edellinen luovutus: -20261030-2152. Muistin tilatiedosto: pelikoodari-tila-20261018-aamu.md.
- Uusi työkansio P2 = /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/leivonta-217 (vanha P = …/piirrokset-20261030).
- Proto-worktree: /Users/Shared/Claude/wt/proto-pelikoodari-v98c, nyt haaralla pelikoodari/leivonta-217. Proto-haaroja ei pushata.

## KESKEN: osasarjan leivottu valo junaan 217 (PT:n lupa 21.5x; ehto: ei Blenderiä, kun LAV:n leivonta pyörii)
| proto-haara | sisältö |
|---|---|
| pelikoodari/leivonta-217 **45b5492df** | Pohja a2d9e0c7b (v5) + merge linssiseppa2/leivonta-217 (VS d420087dc + 4b54413d7; ristiriidassa TaustaKansio v81 pidetty) + 3 committia. |

- **2861fbce7 (puhdas):** JuoksuOsasarjaKokoaja.LueValo, KarkiAlut ja Kaukotasot(…, karki, …); UV1 osamalleihin.
  - Tarkisteessa verrataan nimeä, x/z:aa (≤ 5 cm) ja ruutua; poikkeama → Virhe.
  - Testi LavastajanValo (MK_OSASARJA_VALO = LAV:n koe/osasarja, v4): tarkiste läpi, 289 644 kärkeä = karki.bin, karkia_per_osa täsmää. 11/11.
- **8732a8a1c (peli):** LataaOsasarja lukee valo.json:n, karki.bin:n ja LAV:n pursotukset.glb:n (oman pursotuksen tilalle).
  - Ruudun atlas ladataan, kun ruutu on OsasarjaLahi + 40 m:n päässä, ja puretaan + 100 m:ssä. Purku tehdään taustasäikeessä UnityWebRequestTexturella (lineaarinen, mip, clamp), ja ämpärin atlakset esiladataan levylle.
  - Instanssit: ruutukohtaiset materiaalikopiot ja MPB-taulukot _LeivottuST (LOD0- ja LOD1-osajoukoilla omat).
  - Rakenna: osasarjan osille UV1, kaukonipuille colors32 + _LeivottuKarki.
  - Muut: QA `palatsi osasarja-valo 0|1`, ajaja Kaynnista (Hahmot.StartCoroutine) ja leivotun variantin lämmitys.
- **45b5492df (VS:n kuittaus 22.0x):**
  - Leivottu instanssi ei heitä varjoa (receive elävän varjon mukaan), ja kaukonipuilla varjot ovat Off/Off.
  - Jos instanssi piirretään ilman atlasta, lokiin tulee varoitus kerran per ruutu.
  - Esikatselun odota-maailma vaatii OsasarjaAtlasKesken = 0.
  - Virheen sattuessa avainsana ei ole päällä missään.
  - unity-tarkistus 0 virhettä (Editor-kansiota se ei käännä: Esikatselu.cs on tarkistettu vain käsin).
- **VS:n avoin kohta 1b:** onko ST v-käännetty? LAV:n TILA sanoo, että ST on jo pelin UV1-kehyksessä, ja peli käyttää sitä sellaisenaan. Varmista parissa: jos valo on lohkoissa väärin, käytä oy' = 1 − sy − oy.

## SEURAAVAKSI
1. **Koeajo, kun linja 2 on vapaa** (VS ilmoittaa; `pgrep -fl esikatselu.sh`):
   - `zsh /Users/Shared/Claude/wt/proto-pelikoodari-v98c/tyokalut/esikatselu.sh 45b5492df P2/skenaariot/koe-valo1.txt ipad --batch` ja sama koe-valo0.txt:llä.
   - Koepaketti: P/juuri-216/kielletty-osasarja-koe-valo → LAV:n koe/osasarja (v4, atlakset vain ruuduille (−3,−5), (−5,−1) ja (−5,−4); muista tulee "atlas puuttuu").
   - Kuvat ovat kohdista sijoita −180 280 (0/180) ja −300 30 (90/270); tarkista suunnat.
   - Lokista tarkistettavat: "leivottu valo: 86 atlasta" ja varoitukset.
   - Vertaa valo1/valo0 ja Blenderin tarkistuskuvia (koe/osasarja/valo/tarkistus-r_*.png).
2. **LAV:lle pyydetty 22.0x:** leivottu paketti v5:n pohjalta (kielletty-osasarja-v6: UV1, valo.json, valo/, pursotukset.glb), kun LAV:n nykyinen Blender on valmis (~05.30).
   - Kun paketti on valmis: OsasarjaKansio v6:ksi, MK_OSASARJA_VALO-testi, esto (osasarja muuttuu? geometria sama → esto ennallaan, tarkista) ja pari `valo vertailu 0` (VS ajaa myös tarkista_leivonnan).
   - Sitten PT:lle 3 riviä: sha + kuvien polku.
3. **A6:** kun Codexin 7-välinen GLB on LR:n paketissa, tarkista läikät.

## LISÄYS 22.1x (LAV)
- osasarja-v6 (= v5 + UV1 + valo.json) leivotaan heti LAV:n nykyisten leivontojen jälkeen: rakennukset ~05, tausta ~06.30, sitten osasarja (86 ruutua, 96 näytettä + karki.bin). Arvio: aamupäivä 31.10.
  - Kansio: /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/kielletty-rakennukset/osasarja-v6/kielletty-osasarja-v6. LAV ilmoittaa, kun paketti on valmis.
- Pursotukset.glb ei tule tässä erässä (työkalu on tekemättä), joten käytössä on pelin oma pursotus ilman leivottua valoa.

## Huomiot
- Muut junan 216 asiat ennallaan (-2152): osasarja-v5 a2d9e0c7b + esto-v23 NS:llä.
- Peli-testit: `MK_OSASARJA_VALO=/Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/leivonta-216/koe/osasarja ./kaanna.sh JuoksuOsasarja`.
