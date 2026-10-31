# Valosepän luovutus 31.10.2026 klo 16.03

Syy: kontekstivahti 31 %. Loki: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (rivit 02.3x–16.03). Proto-repo on vain paikallinen. Edellinen: viesti-valoseppa-luovutus-20261031-0230.md (sen työtavat voimassa).

## VALMIIT
- **Kaupunkikierroksen kori vaaleampi tummimmillaan** (omistaja 10.55): `linssiseppa2/kori-vaaleampi-216` **d63d3dcc4** (juna-216 02304e9c7 päällä). PalloKori.shader: korin pehmeä lattia (albedo × AO × ulkovalo × KoriPohja; tummin kohta L/2, valoisat ennallaan). KoriPohja 0,8 (KK kuittasi), QA `opas kori pohja <x>`. Linssit 2217/2217, tarkista 0. NS:lle "PT OK junaan 216" 11.3x.
- **Valopakkaus** b7b91e20c + be9b9b96a: PT kuittasi 02.4x, NS:n junassa.
- **tarkista_leivonta reunasääntö** (LAV:n pyyntö): `linssiseppa2/tarkistin-reuna` **be65cd9ee**: kolmion reunan ±1 cm peitoksi LATTIAN AUKKO -tarkistuksessa; v82:ssa vain kuja-1-3:n väärä 28 ruudun aukko poistuu (529 → 501). Testit 16/16. LAV:lle ilmoitettu.

## KESKEN: SOVITETTU LEIVOTTU PARI (PT 12.3x/13.0x, KK 15.46)
LAV:n LEIVONTA v1 (`_valmiit/juoksupeli-kk-lavastaja-leivonta-v1-vienti-20261031`, SHA256SUMS 6c040967e35a, 652/652 OK). Koehaara `pelikoodari/koe-valo-k4` c9455d902, juuri `_tyo/pelikoodari/leivonta-217/juuri-k3` (sama sisältö kuin _valmiit). Havainne-editori kaikki (QA `valo leivonta 1 <k>`, osasarja-valo 1, osasarja-kansio koe-valo). Skriptit scratchpadissa: kerroin-parit*.zsh (kopioi uuteen, jos tarvitaan).

| kerroin | ajo | 02 puhki | 03 puhki | 06 puhki |
|---|---|---|---|---|
| 0,75 (juna-216, ei osasarjavaloa) | havainne-editori-20261031-130203 | 3,5 % | 5,5 % | 2,6 % |
| 1 | -134009 (+ 03/06 uusinta -155856) | 1,7 % | 8,9 % | 26,5 % |
| 1,25 | -154753 | 2,1 % | 15,8 % | (kamera ulkona) |
| 1,5 | -131618 | 3,9 % | 24,9 % | 63,4 % |
| 2 | -132309 | 14,5 % | 46,6 % | 67,2 % |

**TULOS (VS 16.0x):** kujan 02 muurin varjo lattialla näkyy jo kertoimella 1, mutta aukio 06 palaa (26,5 % puhki, lattia lämpimän valkea, ei muurin varjoa; juna-216 0,75 ilman osasarjavaloa 2,6 %) ja 03 8,9 %. KK:n sääntö → korjaus LAV:lle (aukioiden leivonta kirkkaampi kuin kujien), ei kertoimella. Kerroin 1 paras testatuista. Kuvat: havainne-editori-20261031-134009/02/vierekkain.png, -155856/03 ja /06/vierekkain.png.

- Kaikki ajot hylätään pintatarkistuksessa: **V4_yulu** (rakennukset-v86 f-taihemen, g-jalusta) puuttuu `tyylikirja/palatsi-pinnat.json`:sta → lisäys PT:n kautta. Kuvat syntyvät silti.
- Osasarjan atlakset puuttuvat (LAV osasarja-v6 tulossa) → kujien osasarjapinnoilla ei leivottua valoa.

## AVOIMET
1. PT/KK: kertoimen päätös + V4_yulu listaan. Leivottu pari uudelleen osasarja-v6:lla.
2. LT:n valon kokonaiskulu (vertailu 0/1) palatsissa → tulos Valosepälle (ei vielä tullut).
3. LAV: kujan 0-3 T-liitos -uusinta osasarja-v6:n jälkeen.

## TYÖTAVAT
- Valovahdin taukolippu `/tmp/matkakirja-valovahti-tauko` päällä (PT). Tarkista ennen linssiseppa2/*-committia.
- Unity-ajot PT:n järjestyksessä, levyraja 82 Gi. Ajopuu `wt/proto-linssiseppa2-p11` (be9b9b96a, vain tyokalut/); työpuu `wt/proto-linssiseppa2-leivonta` (haara linssiseppa2/tarkistin-reuna, puhdas).
- Oma juuri `_tyo/linssiseppa2/juuri-l1` (juuri-216 + _valmiit v82/v86/v30 vanhoilla nimillä).

## Osoitteet
PT local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc, NS local_c7344e20-fba8-433d-ba8e-184a325037ef, PK local_601d33fc-1c61-4ccd-8389-fa425417fafb, LT local_ede7e965-02ff-40a0-a77d-44f3218ca146, LAV local_beb68834-6c4f-4839-ac75-7876b45052c3, Postivahti local_d8d003f6-1ae3-4a1b-854a-e0c018ed19f5.
