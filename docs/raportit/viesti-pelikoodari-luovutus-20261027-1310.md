# Pelikoodari: luovutus 27.10.2026 klo 13.10

Konteksti ~46 %. Seuraava Pelikoodari jatkaa tästä. Muisti: pelikoodari-tila-20261018-aamu.md (UUSIN 13.10).

## Haara ja tila
Proto-haara `pelikoodari/juoksu-taso1-212` (worktree /Users/Shared/Claude/wt/proto-pelikoodari-fpv-211), pää b2af4d379, ei junassa.
Proto-gitillä ei ole etärepoa (esikatselu ajaa SHA:lla). Testit 121/121 (Peli-testit/kaanna.sh Juoksu), tyokalut/tarkista.sh 0 virhettä.
Tarkistuksen jälkeen palauta generoidut tyylikirjatiedostot (git checkout -- Tyylikirja.uss Tyylikirja.cs tyylikirja/tyylikirja.json).

## Tehty tässä vuorossa
- Taso 1: kamerakaari oven vastakkaiselle puolelle (abafab942), kaarto huutaa+1,0 s, KURKISTUKSEN LÄHIKUVA (JuoksuAvaus.KurkistusKuva:
  kasvot ~1/10 kuvasta, sisään 0,8 s / ulos 1,4 s). Eunukki lehden kärjen takana saranoista (AlkuOvenSaranat). KK hyväksyi lähikuvan ja ajoituksen.
- Väliasento idle (call ja peek kävivät lehden läpi / käsivarsi kasvojen edessä). Codexilta tilattu peek_call (f8ccf9377, claude/postilaatikko),
  peli ottaa nimellä käyttöön (JuoksuV4Maailma.KurkistusLeike, ote OteSivu/OteEteen/OteTakana).
- Palatsin LOD: etäisyys kamerasta mallin rajauslaatikkoon (be88e5c99; NUI poimi 146cc6183).
- Hahmoäänet v1 kytketty (22002725e; ämpäri audio/juoksupeli/hahmoaanet-v1/, eunukki-sergio käyttämättä).
- Takaa kiinniotto parina (Codex 675899501): koejuuri _tyo/pelikoodari/hahmot-v5-koe/, väli 0,38 m, skaalat 1,00 (b2af4d379).
  Codexille kuittaukset 7d101a56c (eunukit) ja 252bfbb18 (kiinniotto, kontaktit tarkistamatta).

## Odottaa
1. KK/PT: kiinnioton sivukuva (kamera takana, eunukki peittää Puyin; suositus 1 s sivukuva) → sitten kontaktit, viitta ja Codexin hyväksyntä.
2. Codexin peek_call → vastaanotto, ruudut 1–2 (kurkistus, eunukin huudon alku) KK:lle (skripti sk-taso1-kurkistus9.txt).

## SEURAAVA ISO ERÄ (PT 27.10. 13.0x): muurikate-v17 C3 GPU-instansseina
- Lähde: LR /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/kielletty-rakennukset/muurikate-v17/c3-sijoitukset.json: 2455 palaa
  {p, kierto_y_deg, sx}, glTF-kehys kuten muurikatteen glb (solmu = T(p)·R_y·S(sx,1,1), pivot pohja-keski, x toistosuunta). Unityssä z peilattu:
  p → (x, y, −z), kierto → −kierto. Malli 1057-c3-muurikate-2m.glb (2794 kolmiota): T7 …/output/juoksupeli-rakennusmoduulit-20261027/review-modules-v2/
  (ei vielä proto-juuressa; kopioi koejuureen tai pyydä LR:ää).
- Toteutus: Graphics.RenderMeshInstanced (malli: Assets/Matkakirja/Kartta/RadioMastot.cs) palatsin juuren kehyksessä. JuoksuMaailma.shader EI tue
  instansointia (ei multi_compile_instancing / instance ID -makroja): lisättävä, myös valo_rgbm (TEXCOORD_1), häivytys ja katto-ominaisuudet.
- LOD: lähellä 1057 (rajauslaatikkoetäisyys kuten be88e5c99), LOD1 (~300 kolm.) Codexilta tulossa, kauempana nykyinen kevyt kk-muurikate-v16.
  Pidä instanssit ruuduittain (esim. 50 m) ja valitse ruudut kameran etäisyyden mukaan; mittaa GPU (LT) ennen junaa.
- Lopuksi ilmoitus LR:lle + NUI:lle juuri parien ajoon.
