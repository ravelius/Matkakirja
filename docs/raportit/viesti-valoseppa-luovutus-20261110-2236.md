# Valosepän luovutus 10.11.2026 klo 22.36. Itsenäinen: vanhoja ei tarvitse lukea (korvaa 20261110-2055:n)

Syy: konteksti. Tili sami.reivinen@vvi.fi. Natiivirepo `/Users/Shared/Claude/proto-3d/Matkakirja-proto`, etä `natiivi-backup` (natiivin "main" = `julkaisija/juna-224`). Ainoa worktree: k33 = `/Users/Shared/Claude/wt/proto-linssiseppa2-k33`, nyt haarassa `linssiseppa2/erottuvuus-1-1` **398f974e2**, puhdas ja pushattu (k31, k32, msaa poistettu PT:n pyynnöstä; haarat tallessa). Kuvat vain JU:n vuorolla. Id:t: PT `local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31` ≤ 3 riviä; KK `local_d5f31591-21fa-4cb0-bab3-bcd3435d075a`; JU `local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd`; KS `local_7b57e35a-3a8e-4943-aba1-c960b9eb4671`; Postivahti `local_1f31f830-9df5-41c1-8992-172e100af57f`. Viestit send_messagella id:llä. JU:n jonoloki `/Users/Shared/Claude/julkaisija-tyokalut/jono-20261103-ilta.txt`.

## UUSI LINJA (omistaja 21.38, PT:n kautta; muistissa nakyva-tyo-kk-palaute-suoraan.md)
Näkyvä työ (3D, merkit, ilme, valikot, VALO): karkea kuva ensin KK:lle suoraan, PT kopiona; junaan vasta KK:n katsottua. OMISTAJAN PÄÄTÖS 21.59: nähtävyydet 1:1-mittasuhteessa (ei K 2), erottuvuus kaukaa värillä, ääriviivalla ja kylteillä.

## TEHTY TÄNÄÄN (valmis)
- Erottuvuus v3 61780e8be JUNASSA 224.45 (KK 22.0x kelpaa, 22.31 "jää peliin"). v3 = v1 593d09722 + v2 (vaalennus kertoimena, viiva ylöspäin ≥ 1 px) + v3 (vaaleat pinnat lum > 0,40 ennallaan). Parit `_tyo/linssiseppa2/erottuvuus/parit-v3vesi-61780e8be/` (LUE.md).
- Mac-esikatselun MSAA 594ffb203 (vain Editor/Esikatselu.cs; kuvan tekstuuri oli 1-näytteinen → Mac-kuvat rosoisia, iPad Ultra = MSAA 4) junaan MR36:ssa. Lokin kuva-riveillä "MSAA 4".
- Skenaarioiden odotus elävälle kerrokselle: `oleta 300 piirretty [1-9][0-9][0-9] levyltä` alussa (ilman sitä Seine ja korttelit voivat puuttua, ajo v3 21.15). "PUUTE oleta elävä kesken" = tilarivi ei tulostu levossa, EI latausvika.

## AVOIN 1: EROTTUVUUS 1:1-KOOLLE (PT 22.3x; KK: RK ja ND katoavat kaukaa 1:1:ssä)
- 398f974e2 (`linssiseppa2/erottuvuus-1-1` = KS:n 6d82a050c [224.46-pohja: 1:1 + talot v3 + RK/ND kivi 0xF6F0E3, ND katto 0x484C51] + merge v3 e17a0fb36 + pienten mallien viiva lerp(0.65,1, osuus/0.04) eli ≥ noin 2 px). unity-tarkistus 0.
- Sovittu KS:n kanssa: KS:n vaalea kivi (lum noin 0,85) ja tumma katto (< 0,22) jäävät vaalennukseni ulkopuolelle → ei tuplaannu; minä säädän vain viivaa.
- JU:lle pyydetty 22.4x Mac-ajo: skenaario `_tyo/linssiseppa2/erottuvuus/sk-mac-erottuvuus-1-1.txt` (16 kuvaa: yleis, yleis-pohjoiseen, rk-viisto, sc-viisto, sc-kaukaa, nd-kaukaa, rk-lahi, nd-lahi; pois|viiva) → `lokit/linssiseppa2-erottuvuus-1-1-398f974e2`.
- Seuraavaksi: `parit.py <loki> parit-1-1-398f974e2` (HUOM rajausten paikat: 1:1-mallit pienempiä kuin 224.35 → tarkista RAJ-koordinaatit koko ruudun kuvista ja korjaa), lisäksi pari-rk-lahi/nd-lahi. Arvioi: erottuuko RK/ND kaukaa? Karkea pari (kaukaa + lähi) KK:lle, kopio PT:lle.

## AVOIN 2: KYNÄKOE (KK:n tyyliohje `/Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261110-pariisin-nahtavyydet-tyyliohje.md`)
- 462e1f42f (`linssiseppa2/kyna-pantheon` = KS:n Panthéon b357fdfc1 + v3 + MSAA + kynäkoe efa695dbb). Komento `kyna 0|1` (globaali _Kyna, oletus 0), vain OhjelmaKohde.shader: läheltä ohut kynäviiva 0,0007 (noin 1,4 px) peitolla 0,85, taakse 1,5 m (sisäiset hahmoviivat), kerrosvyöt 5 m välein seiniin (fwidth-pehmennys, häviää alle 6 px:n väleillä).
- TULOS (ajot lokit/linssiseppa2-kyna-pantheon-462e1f42f ja -lahi-462e1f42f): pelin lähin kamera näyttää 1:1-Panthéonin vain noin 5 % ruudusta (aja 0,0004–0,004 ei mene lähemmäs; lähin korkeus rajattu), joten kynä (kytkeytyi osuus 0,08–0,2) EI näy. KK:lle kerrottu 22.36, suositus: kytke kynä jo lähimpään näkymään.
- Seuraavaksi: kyna = _Kyna × smoothstep(0.02, 0.05, osuus) (ei 0.08–0.2), vyöväli tarkista (Panthéon 83 m ≈ 100 px → 5 m ≈ 6 px, raja), ehkä 0,5 × KaukoVoiman viiva; rebasaa uusimman KS:n Panthéonin päälle (kysy KS:ltä sha; KK:n KJ8 voi muuttaa muotoa), Mac-ajo `_tyo/linssiseppa2/kyna/sk-mac-kyna-pantheon-lahi.txt` → pari KK:lle, kopio PT:lle.

## AVOIN 3: VESITÄYTTÖ (erä B) – iso iPad huomenna (omistajan päätös 20.23)
0829caa4e (`linssiseppa2/vesi-taytto-tausta-224b`, laitekäännös JU:lla 19.10). iPad-ajo → `lokit/linssiseppa2-vesitaytto-ipad-0829caa4e`; grep "pilarireiät täytetty" + kehysajat; hyväksyntä pääsäikeessä ≤ 20 ms, ei > 100 ms ruutua → PT:lle + MR-pyyntö JU:lle. Perustelut `_tyo/linssiseppa2/vesitaytto/LUE.md`.

## MUUT (ennallaan)
- KK jatkoon: Riemukaaren korostus sovitetaan KS:n vaalean kiven kanssa (tehty 1:1-haarassa).
- Pariisin saumat ja mäkien varjostus (KK: suunnitelma tekotavasta). Merenpohjan puristus 97b4f29a9 KS:n koelaatoilla. Kohokartan aurinko cd74573cd: syvyyskuva laiteajossa.

## TEKNIIKKA
PIL `/opt/homebrew/bin/python3 -I`. Parit: `_tyo/linssiseppa2/erottuvuus/parit.py <loki> <ulos>` (rajaukset 1000 px:n koordinaateista × 2,752). v1|vX-vertailu: `parit-v3vesi-61780e8be/v1-v3.py <lokiA> <lokiB> <ulos>` (RAJ-lista skriptissä). Viivan leveys = osuus ruudun korkeudesta (Leveys 0,0016 ≈ 3,3 px iPadilla); KaukoVoima 1 alle 10 %, 0 yli 25 % ruudun korkeudesta. URP ottaa MSAA:n targetTexturesta. `sh Peli-testit/unity-tarkistus.sh`. Luovutus plumbingilla origin/mainin päälle omaan haaraan.
