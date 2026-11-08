# Natiivisepän luovutus 8.11.2026 klo 23.20

KAIKKI VANHEMMAT LUOVUTUKSET; edellinen git show 2451f32c4:docs/raportit/viesti-natiiviseppa-luovutus-20261108-2138.md (tausta: FPV osa 4,
FPV-taivas, pohjapallo-juna). Sessio Natiiviseppä, kansio Matkakirja-3d-selvittaja, tili vvi@vvi.fi.
Nollauksen syy: konteksti pehmeällä rajalla 25 % (7.37). PT local_5df52e10-10e4-4b72-9554-0049db300dfe, JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7.
Cron "4 9 * * *" (/opt/homebrew/bin/python3.14 /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py, ILMAN -I:tä;
UUSI-rivit → PT:lle "UNITY UUSI: …") luotu 22.3x (46c97ee3): LUO UUDELLEEN. Numpy/PIL: /opt/homebrew/bin/python3.14 -P skripti.py.
Varjostimen regenerointi: python3 -I Assets/Matkakirja/Shaders/Cesium/Lahde~/tee_tileset.py
/Users/Shared/Claude/wt/proto-natiiviseppa-unity67/Library/PackageCache/com.cesium.unity@D454711FBE38/Source/Runtime/Resources Assets/Matkakirja/Shaders/Cesium
(Cesium 1.26.0); MatkakirjaRasteri.shadersubgraph palautetaan git checkoutilla (vain satunnaiset tunnisteet). Tunnisteet ovat satunnaisia → iso diff on normaali.

## TEHTY TÄLLÄ VUOROLLA (8.11. 22.3x–23.20)
1. POHJAPALLO-JUNA 3413b4565 KUITATTU (PT 22.4x), JU vei junaan 223. Kytkin pois = 84a91d530 (max ero 1/255, peruskartassa vain liehuva lippu),
   päällä = f7cf0bd7c:n pallo. Kuittaus _tyo/natiiviseppa/pohjapallo-juna/kuittaus/. PT:n kysymys pehmeydestä: Mac-ajon laattataso 640×480:sta,
   ei vika. PT: omistajalle menevät kuvat Macilta `ui kamerasuhde laite` + `komento maasto siirtyma 5 0 30` (12.26).
2. RUSKEA KIVI KORJATTU c7df37d49 (natiivi-backup natiiviseppa/fpv-viat, wt /Users/Shared/Claude/wt/proto-natiiviseppa-fpv; KOE, ei junaan),
   PT KUITTASI 22.5x. Syy: fpvlahi korvasi poltetun värin omalla MCOL-paletillaan ja harmaannutti ×15-rinteet. Nyt poltettu väri säilyy,
   keksitty kalliopinta vain valona (auringon termin suhde kohouma/geometria 0,6–1,45 + ±9 % raidat). Vanha tila "fpvlahi paletti 1"
   (_fpvLahi.x ≥ 2). Kuittaus _tyo/natiiviseppa/fpv-ruskea/kuittaus/.
3. MERENPOHJAN REUNAPIIKIT KORJATTU b2761f67b (natiivi-backup natiiviseppa/reunapiikit, pohja 3413b4565; wt /Users/Shared/Claude/wt/proto-natiiviseppa-pohjapallo).
   Syy (selvitysajo lokit/natiiviseppa-reunapiikit-a): ×15:ssä merenpohjan laattarajojen tasoerot ja merivuoret ääriviivalla; kerroin 5 pienentää,
   sse ei poista; Cesium for Unity 1.26 ei tunne liioittelua tasovalinnassa. Korjaus vain _MERI_PAINUU-haarassa: alle 0 m:n kerroin
   liukuu k → 1, kun pinta nähdään syrjittäin (smoothstep(0, 0.25, cos katsomiskulma)); maa ja kytkin pois ennallaan.
   Ajot lokit/natiiviseppa-reunapiikit-b/ (b2761) ja -b-3413/: piikit pois, kytkin pois 1 px kohinaa, shader 0.
   Pari ja MITTAUS _tyo/natiiviseppa/reunapiikit/kuittaus/. LÄHETETTY PT:LLE 23.19 kysymyksellä "junaan 223 kuittauksellasi?".

## JONO SEURAAVALLE NS:LLE
1. Odota PT:n vastaus reunapiikeistä b2761f67b: kuittauksella JU:lle "b2761f67b junaan 223 (PT:n kuittaus)" (natiivi-backup natiiviseppa/reunapiikit).
   Jos PT haluaa säätöä: kaista smoothstep(0.0, 0.25, …) tee_tileset.py KORKEUS_RUNKO (khMeri) – regeneroi, unity-tarkistus sh:lla, ajo sk-reunapiikit-b.txt.
2. Muuten jono tyhjä → rivi PT:lle "JONO TYHJÄ: Natiiviseppä".
Huom. JU:n ajot: skenaarioihin `komento maasto siirtyma 5 0 30` ennen ensimmäistä ajaa, kun laattataso ratkaisee (muisti mac-batch-tarkkuus).
FPV (koe): kameran kulma 15–20° leijunnassa = PT/kortti, ei itse (osa 4b: maa vain alareunassa 30° ylös + horisontti −11°).
