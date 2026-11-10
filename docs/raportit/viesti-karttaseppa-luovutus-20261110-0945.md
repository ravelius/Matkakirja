# Karttaseppä: luovutus 10.11.2026 klo 09.45 (KS)
Syy: konteksti 25 % (hook, Raamattu 7.37). Korvaa -0925:n.
Työlista on jono: `python3 -I /Users/Shared/Claude/Matkakirja-fable/tools/asemataulu/tyolista.py seuraava KS` (rivit PT kirjoittaa).
HUOM kello: aja `date` ennen jokaista aikaleimaa.

## SUUNNANMUUTOS (omistajan kortti 09.36, PT:n JAKO 09.3x)
Pariisin nähtävyydet KOODILLA oikeassa koossa, Pariisi ensin; Tripo-mallit talteen kytkimen taakse, EI poistoja.
Suunnitelma (lue kokonaan): /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261110-pariisin-nahtavyydet-koodilla.md.
RAUKESIVAT: pino 6 Sacré-Cœurin puisto (rajauskoe tehty `_tyo/karttaseppa/sc-rajaus/`, proto 78bba4703, ajo 38 PERUTTU; ei jatketa)
ja Louvren kirkon kaista. Ei liioittelua ilman korttia. Lontoo vain yhteisen koneen osalta (talokone, katot). Eiffel = VS.
KS:n jono: 1 Tripo talteen + kytkin (TEHTY), 2 Riemukaari koodilla vertailuun, 3 Notre-Dame koodilla vertailuun
(oikea koko, sama Id/paikka, ympäristö täyteen; pari nykyinen | koodi lähi + viisto + kaukaa, laite kerrottuna → PT → KK; ND:n levenevät tornit kysytään parin yhteydessä).

## TEHTY TÄSSÄ VUOROSSA
1. **Tripo talteen** `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-tripo-talteen-20261110/INVENTAARIO.md` (+ NAS
   /Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/karttaseppa/pariisi-tripo-talteen-20261110, 382 Mt). 10 aluetta, 12 mallia,
   23 GLB:tä; raaka-GLB puuttuu ND, Louvre, Invalidit, Montparnasse (.bytes kopiossa). PT:lle raportoitu 09.43.
2. **Kytkin** proto 205649e5f, haara `karttaseppa/koodimallit-kytkin` (worktree /Users/Shared/Claude/wt/proto-karttaseppa-kytkin) = juna 224
   68d365e65 + `Nahtavyysalue.Koodilla(id)`, `KoodillaKaikki`, komento `koodimallit <id|kaikki> 0|1`: Tripo-mallit piiloon, pohja/puut/kyltti jäävät.
   unity-tarkistus (sh) 0 virhettä. VS:lle kerrottu (VS tekee Eiffelin OhjelmaKohteet-kohteena, Kohde.Korvaa = "eiffel", kytkee tähän).
   Ei vielä junassa: NS:lle/PT:lle junaan vietäväksi, kun koeparit tarvitsevat sen laitteella.
3. **Lontoo koe10** (BM-sahalaita): `$K/aja-lontoo-koe10.zsh`, skripti `$K/skriptit/tee-palat-lontoo-luuranko-k10.py` (KATOT_NB_NAAPURI=1:
   naapurireuna päädyksi myös korkeuserolla), aineisto `$K/lontoo/palat-d11-katot-koe10`, 0 katkoa, päätyjä 32 834 → 44 831.
   Mac-ajo 37 JU:lla jonossa (ajopyynto-mac.md, skenaario sk-lontoo-koe10.txt, loki proto-3d/lokit/karttaseppa-katot-a-lontoo-koe10).
   `K=/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/katot-luuranko`.

## KESKEN
- **Riemukaari koodilla (jarj 2)**: Opus-agentti teki geometriaa haaraan `karttaseppa/riemukaari-koodi`
  (worktree /Users/Shared/Claude/wt/proto-karttaseppa-riemukaari, pohja 205649e5f): OhjelmaKohdePariisiRiemukaari.cs
  (`OhjelmaKohdeGeometria.Riemukaari()`, 50 × 45 × 22 m) + Pariisin kohde OhjelmaKohteet.cs:ään näkyvissä vain kun Koodilla("riemukaari").
  TULOS: katso LISÄYS alla. Sitten: Mac-pari JU:lla (skenaario: koodimallit riemukaari 0 → kuvat lähi/viisto/kaukaa → koodimallit riemukaari 1 →
  samat kuvat; Riemukaari 48.87378, 2.29504), kuvat täysikoossa itse ennen PT:tä, pari PT:lle → KK. Huom. VS:n Korvaa-kenttä samaan
  OhjelmaKohteet.cs:ään → yhdistä VS:n haaran kanssa ennen junaa.

## SEURAAVAKSI
1. Koe10:n Mac-kuvat (ajo 37): bm-45 täysikoossa koe9 vs koe10 (`$K/kuvat/a/lontoo8/`), muut 6 sivuvaikutuksiin → PT, sitten iPad-pari.
2. Riemukaari-pari (yllä).
3. Notre-Dame koodilla (jarj 3).
4. Odottaa (ennallaan): koe7 iPad-pari, Louvren korttelit, nimiotto Lontoolle.

## Vahdit
- Postilaatikko: Monitor `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min, viritä uudelleen).

## LISÄYS 09.5x: Riemukaari-agentin tulos (EI vielä katsottu kuvina)
proto **9a4ad1c68** (haara karttaseppa/riemukaari-koodi, ei pushattu): OhjelmaKohdePariisiRiemukaari.cs (1 842 kolmiota; x ±22,5 leveys,
y 0–50, z ±12,4 läpi pääkaaren Champs-Élysées'n akselilla), OhjelmaKohteet.cs +7/−2 (uusi `Kohde.KoodiId`; näkyy vain kun
Nahtavyysalue.Koodilla(KoodiId)), MaaH 45 (× kerroin 2 = 90 m kuten Tripo), Akseli 64,6 (= −Suunta). Testi RiemukaarenMitat + 22 OhjelmaKohde-testiä
läpi, unity-tarkistus 0 virhettä. Korkeusjaot (karniisit, attika) arvioitu kuvista.
Yhdistys VS:n Eiffel-haaran kanssa: OhjelmaKohteet.cs menee puhtaasti; Nahtavyysalue.cs ristiriita = VS:n oma väliaikainen lippu vs. 205649e5f
→ VS poimii 205649e5f:n (viesti lähetetty). HUOM kaksi nimeä samalle: agentin `KoodiId` vs VS:n `Korvaa` → yhtenäistä yhdistyksessä.
SEURAAVAKSI: Mac-pari JU:lle (KESKEN-kohdan skenaario), kuvat täysikoossa itse, sitten PT.
