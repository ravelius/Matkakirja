# Natiivisepän luovutus 9.11.2026 klo 13.27

Edellinen: git show edf32726d:docs/raportit/viesti-natiiviseppa-luovutus-20261109-1249.md (tausta: p-5a-portaat, FPV, Mont Blanc -syy).
Sessio Natiiviseppä, kansio Matkakirja-3d-selvittaja, tili sami.reivinen@vvi.fi. Nollauksen syy: PT:n kontekstilinja 25–35 % (7.37), luonteva tauko.
Id:t /Users/Shared/Claude/osoitekirja.md (PT local_8d8ebf72-…, JU local_2a7d6c96-…, NUI local_4b84cd90-…, PK local_d3bb1f78-…).
Cron "4 9 * * *" unity-julkaisut.py: LUO UUDELLEEN (prompt: git show 9d77cf4dd:docs/raportit/viesti-natiiviseppa-luovutus-20261108-2320.md rivit 6–7).

## TEHTY 12.50–13.27 (kaikki pushattu natiivi-backup natiiviseppa/noston-lento, wt/proto-natiiviseppa-nostolento, kärki fb77e12b1)
- MAISEMAKAARI 7a560e725 (PT hyväksyi): kohde ilman 3D-mallia ja ilman piirrosta → NahtavyysEsittely.MaisemaKaari 0,2° ja
  MaisemaKallistusAst 65° (ennen 0,012°/50°). Yksi funktio NahtavyysEsittely.Katselu(k, id, lat, lon) → Esittele ja NostonLento.cs:109.
  Malli tunnistetaan Nahtavyysalue.Kylttikohteet-luettelosta (ei vaadi ladattua mallia). Testikomento `ui nahtavyysesittely maisema <kaari> [kallistus]`.
  Mac-kuvat KATSOTTU ja PT:lle 13.2x: lokit/natiiviseppa-maisemakaari-2-iphone-fb77e12b1/mb-{1-ennen,2-jalkeen}.png (mb-2 Alppien
  kohokuva, Mont Blanc + Chamonix, kuten omistajan kuva2) ja lokit/natiiviseppa-maisemakaari-1-iphone-7a560e725/co-{1,2}.png (Calanques).
  Mac: 0,2° → 51,9 km etäisyys (iPhonen kapea suunta). Ajo 1:n mb-kuvat virheelliset: `ui nostonlento merkki kohde:montblanc` ei löydä
  karttavalokohdetta → fb77e12b1 testikomento `ui nahtavyysesittely kohde <id> <lat> <lon>` (skenaario _tyo/natiiviseppa/sk-maisemakaari-2.txt).
- P-5A YHÄ PEHMEÄ 100–500 km:ssä (NUI ef151b8fa, portaat ≤ 107 km) → 7f3d35cd6: KameraEleet.KorkeusPortaat(loppu: true), kutsu
  kattoM ∞, PalloKierto.PaluuPortaitaEnintaan 9 → Cosquer 3,4 … 429 km + loppu 835 km. Testi PaluuPortaatKokoPaluuJaLoppu, 880/880.
  Lokin 664 ms "ulkona" p-5a:ssa = kuvankaappaus itse (NUI:lle kerrottu).

## ODOTTAA
1. NUI yhdistää fb77e12b1 paikkapalkki-paluuhun ja pyytää JU-ajon p-4 + p-5a → katso p-5a terävä? + "paluun esilataus: osuudet 9" +
   muistihuippu (ennen 2528 → 2743 Mt). Jos yhä pehmeä: tarkista ehtiikö 9 kameraa ladata (esiladattu N s) ja muistijarru.
2. PK tekee sauvan kierron (TappiOhjaa) haaran päälle: kerro PK:lle rivillä jokaisesta PalloKierto.cs-commitista.
3. FPV-latauskuva puhelimelle: Codexin puhelinmuodot (git ls-tree -r --name-only origin/claude/postilaatikko | grep drone-vastavalo-puhelin); PT ilmoittaa.
- unity-tarkistus: `sh Peli-testit/unity-tarkistus.sh` (EI zsh); testit `sh Peli-testit/kaanna.sh [nimi]`.
