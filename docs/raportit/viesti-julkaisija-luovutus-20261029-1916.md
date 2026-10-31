# Julkaisijan luovutus 29.10.2026 klo 19.16 (konteksti 30 %, uusi tili)

Käytännöt: `docs/raportit/viesti-julkaisija-luovutus-20261026-1601.md` (luku 1) voimassa. Viestit SendMessage id:llä (osoitekirja).
Kaikki ajot kirjattu `julkaisija-tyokalut/tf-jono-20261002.txt`. Irrotettu ajo: `python3 julkaisija-tyokalut/irrota.py <loki> zsh <skripti>`.
KK:n uusi id local_231e4bad-b9fe-41b8-8b45-02e35c45ebbe (omistaja 13.11).

## KÄYNNISSÄ: OMISTAJAN JULKAISUPYYNTÖ 17.20 (PT)
"julkaise TestFlightissa ilman testejä sitten kun valmistuu": juna 214 kokonaisena TF:ään, kun kujat + Alppien sauma +
karttasaumat ovat rungossa; ei laite-/simukierrosta. PT:n järjestys: **maasto z10–12 → layer.json → KS tarkistaa ja vie
osoittimen NS:lle → NS lukitus (L1 varattu NS:lle) → TF 214 → LR v71 -vienti (junaan 215).**

1. **Maasto 2026-10-29-maailma** (PT kuittasi Alppien maastosauman; KS:n RAPORTTI `_tyo/karttaseppa/maastosauma-214/pt/`):
   - z0–9 ämpärissä 17.01 (306 557/306 557, CDN 6/6) `vie-maasto-massa.zsh` uudella `ILMAN_LAYER=1`-tilalla.
   - z10–12 palvelinkopiot 2026-10-16-maailmasta **rinnakkain 19.10 alkaen** (`vie-maasto-taydennys.zsh`, VAIHE=kopio,
     sync --size-only; odotetut 872 786 / 218 044 / 866 496); arvio valmis ~20.00–20.30. Loki `vie-maasto-20261029.log`,
     rivit `MAASTO 2026-10-29` jonotiedostossa. Skripti vie lopuksi layer.jsonin ja tarkistaa kokonaismäärän 2 263 884 + CDN.
   - Jos katkeaa: `VAIHE=kopio KOPIO_KLO=$(date +%H.%M) python3 irrota.py vie-maasto-20261029.log zsh vie-maasto-taydennys.zsh
     "/Volumes/T7 4TB/koodaus/proto-3d/_valmiit/maasto-2026-10-29-maailma-vienti-20261029"` (sync jatkaa).
   - Valmis → rivi KS:lle (local_ddd980b0) ja PT:lle.
2. **TF 214**: NS:n lukitus-SHA → TF kuten 213 (iOS + Mac: `MATKAKIRJA_APPSTORE=1 MATKAKIRJA_BUNDLE_ID=fi.matkakirja.peli`).
3. **LR v71** `_valmiit/juoksupeli-kk-lavastaja-v71-vienti-20261029` (SHA256SUMS 6161f49c, 298) PT kuittasi junaan 215 → vie
   `vie-paketti.sh`:llä vasta TF 214:n jälkeen; osoitin NS:lle ja PK:lle.

## Tehty tänään (uusi tili 13.0x →)
- Mainiin: 5585, 5586, 5587 (konflikti → PT teki uudelleen), 5588, 5589, 5591, 5592, 5590, 5593 (LR-lisäys 74 cherry-pick),
  5594, 5595, 5597 (merinimet → sisältöpaketti osoitin v904 / 2.0 v661), 5599, 5601, 5604, 5605, 5606, 5607.
- **LR v70** ämpärissä 18.38 (288 uutta + 10, a64166c9 = PT:n 677bca43 − .tuplavahennys-jäänne; PT: kuittaus pysyy) → NS.
- PK:n simut (iPad 00CF62C2, L1): drone m 284cfe49e, n 8289a55fe, v66-koe 4f97eeb2e, v67b 9bbf39e25 (a8da3d73f keskeytetty),
  v68 8cec19dc0; kaikki exit 0, 0 exceptionia; vanhat drone-app-kansiot poistettu PK:n luvalla.
- KS:n vuorot (iPhone DA0AAEEA, L2) ja NS:n peruttu pienen iPadin käännös (omistaja 13.22: vasta kun kartan työt valmiit).

## Huomiot
- Lavastajan havainne-editorin esikatselut varaavat L2:n parin minuutin välein; lukkovahti suodattaa ne (`grep -v esikatselu|juna/b37|VAPAA`).
- Haaraa fable-loki-1714 (355da10aa, ristiriitamerkit) EI mergetä (PT).
