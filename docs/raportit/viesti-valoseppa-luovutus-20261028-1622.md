# Valosepän luovutus 28.10.2026 klo 16.22

Lue ensin tämä, sitten loki `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (rivit 28.10. 12.42 →).
Worktree `/Users/Shared/Claude/wt/proto-linssiseppa2-p11`, haara **linssiseppa2/seinat-211**, kärki **8885a9f54** (natiivi-backup).
METAL 395/0, PIPELINE 392/0 (8885a9f54). Muut haarat ennallaan (esineet-metalli-213 f7fd394da, j4-pari 2855d8478).
Parit: `REF=<sha> MALLIT=file://<juuri>/ zsh /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/tyokalut/editori-vs.sh 02 05 01`.
Metal: p11:ssä `METAL_ETULIITE="Matkakirja/Juoksupeli/Maail" zsh tyokalut/metal-tarkistus.sh <scratchpad-kansio>`.
MAC-UUDELLEENKÄYNNISTYS: ei omia taustaajoja; keskeytynyt pari tai Metal ajetaan samalla komennolla uudelleen.

## Linja (PT 12.4x)
Aurinkoa ja aukion valoa EI tehdä (omistaja 27.10. 10.56 "valo pois ensin"). Materiaalit tasaisessa valossa LR:n parien kautta KK:lle.

## Tehty 12.42–16.22 (kaikki seinat-211:ssä)
- **Palatsin katot** (LR, KK): V4_palatsi_katto → `_PalatsiKatto`, `ValoKohteet.JuoksuPalatsiKattoSavy` 0,53/0,40/1,0
  (41c4e55b3, ac8b06780). Sitruuna 40–42° → 34–36° (havainne 31–32°). QA `valo savy palatsikatto r g b`.
  Jäljellä: valo/varjopuolen ero (R-suhde 1,56 vs 2,23) = valo, tauolla. Kultalista ja alalika LR leipoo albedoon.
- **glTF-normaalikartan Y** (65b736b1b): kuvat "…normal-opengl" → `_NormaaliY` +1 (vanha −1 lähipuille/koristeille).
- **Kujakivet v5** (Codexin v02, LR v99m/v100m; 288f6c7b8 → 8885a9f54):
  - sokkeli-v02: sävy kivittäin SEAMS.json-taulukosta (`_KiviMuoto` 4, `SokkeliV02Saumat`), ei tyynyreunaa (pyöristys leivottu
    normaaliin, KAYTTO.md). v4b:n mip 5 -pakkaus pois (teki kerrosten yli jatkuvat vaaleat juovat).
  - reunakivi V4_kujakivi_reuna → `_KujaKivi` 3: ei pystykerrointa (etupinta oli tumma).
  - Sävyt: lattia `JuoksuKujaKiviSavy` 0,58/0,50/0,45 (lämpimämpi), kivijalka `JuoksuKujaKiviSokkeli` 1,25/1,25/1,32,
    `JuoksuKujaKiviKivet.x` 0,5 (sävyvaihtelu).
  - JuoksuLattia `ReunusRaja` = k·1,4 + (frac(k·0,618034) − 0,5)·0,4 (LR:n v101m-geometria; v100m:ssä laji 18 ei vielä osu).
- Lattian "kaksoisviiva" ei ollut varjostimessa (natiivikuvassa yksi heikko reuna). LR:n lähikuvan kaksoisviiva on todennäköisesti
  suurennuksen halo. v98m:n poikkiviiva oli geometrian rako, ja LR korjasi sen v100m:ssä.

## Kesken (seuraava Valoseppä)
1. **LR:n KK-pari juuri-v101m REF 8885a9f54** (reunakivi pitkinä, kivijalka, lattia). KK:n palautteen mukaan säädä sävyjä
   (QA `valo savy kujakivi|kujakivijalka|kujakivikivet …`). Pilarien v02 pystykerroin 0,60/0,58/0,66 on vielä tarkistamatta.
2. Kun KK hyväksyy: NS:lle seinat-211 (kärki 8885a9f54) junaan. Riippuvuus: LR:n mallit (v101m) samaan junaan; katon kerroin
   vaatii V4_palatsi_katto-mallit.
3. J4 ja esineet-metalli-213: ennallaan (odottaa Codexin J4-v3:a).

## Opit
- p11:ssä EI `git add -A Assets` (seuraamattomia museo-.meta-jäämiä → 145 vierasta tiedostoa commitiin; poistettu b59dcc37c/8885a9f54).
  Lisää vain omat polut.
- Codexin v5-kuvien nimet ovat -v02-: `KiviJako` tunnistaa vain nimetyt kuvat → uusi versio = uusi rivi `KiviJako`:on.
- Sävykerroin ei tehoa lineaarisesti, kun kirkas kanava leikkautuu (katto: R 0,71 → vain ×0,9) → iteroi parilla.
