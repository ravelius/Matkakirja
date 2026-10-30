# Valosepän luovutus 30.10.2026 klo 23.45

Syy: kontekstivahti 30 %, luonteva tauko (odotan PT:n päätöstä). Loki: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (lue rivit 22.5x–23.5x). Proto-repo on vain paikallinen. Edellinen luovutus: viesti-valoseppa-luovutus-20261030-2240.md (pysyvä sääntö 2.177 ja omistajan 22.27 linjaus ovat yhä voimassa).

## VARJOVIKA KORJATTU JA VARMISTETTU (juna 216)
- **Juurisyy:** Unity 6.7:n URP (MainLightShadowCasterPass.FillMainLightShadowReceiverVars) kirjoittaa `_MainLightShadowmapSize`:n vain, kun `supportsSoftShadows` on päällä. Mobile_RPAsset: `m_SoftShadowsSupported 0`, joten koko jäi tyhjän kartan arvoon 1. JuoksuVarjon pehmennysnäytteet osuivat silloin koko kartan päähän (clamp), ja reunan arvo levisi kaikkialle: tuloksena tasainen ~0,88-kertainen tummuminen ilman varjojen muotoja.
- **Korjaus:** `linssiseppa2/valo-216` **02953bc6e** (4b4a6d947:n päällä). Teksel luetaan `GetDimensions`illa ja pelivalon loki näyttää todellisen suunnan (30°/188°). PT kuittasi, ja NS ottaa sen junaan 216.
- **Varmistus:**
  - METAL 444/0, PIPELINE 436/0; tarkista 0, 46/46, 3/3, Linssit 2217/2217.
  - Pari esikatselu-20261030-231742: aurinkoiset alueet v1 = v0 (220/225/232; ennen 195 → 221), elävät varjot näkyvät, ja hahmo heittää varjon, kun aurinko on sivulla (e06-hahmo98).
  - iPad (LT, 0cbe0ffbf + 02953bc6e, `varjot-koko/varjo216b/`): vertailu 0 näyttää muurien varjot laitteella. Vertailu 1 on vertailuvalo ilman varjoja tarkoituksella; PT luki sen ensin viaksi, ja oikaisu on lähetetty.
- **Diagnoosihaara** `linssiseppa2/varjo-diag3` 972650080 (QA `valo varjodiag 0|1|2`: raaka näyte / koordinaattiruudukko): ei junaan, mutta hyödyllinen jatkossa. Skenaariot `tyokalut/varjo-diag3.txt` ja `varjo-korjaus.txt`.

## AVOIMET
1. **Hahmon varjo heikko (PT, valon kärki):**
   - Editorissa varjo näkyy, kun aurinko on sivulla, mutta 1024-kartalla se on sumea. iPadilla näkyy vain häivähdys (kuja 02).
   - 2048 HYLÄTTY (LT): kujalla 02 yli 20 ms:n ruutuja 0 % → 14 % ja GPU 18,2 → 28,5 ms; aukiolla 03 yli 20 ms:n ruutuja 22 % → 40 %. Valmis commit `linssiseppa2/varjo-2048` 7a44499cb jää junan ulkopuolelle.
   - **Ehdotus PT:llä, päätös odottaa:** lähikaskadi 25 → ~15 m (`ValoKohteet.JuoksuVarjoLahiOsuus` 0,125 → ~0,075). Se tihentää lähitekseliä ~1,7-kertaiseksi ilman muisti- tai GPU-kulua. Splitille ei ole QA-komentoa (`varjomatka` asettaa 25/m), joten se vaatii pienen koodimuutoksen ja parin (e06 30°/98° sekä e03/e06 oletusaurinko).
   - Tummuus on sama kaikilla kartoilla, joten heikkous on osin sävyä (ambient/täyttö).
   - Kaskadivertailu: esikatselu-20261030-232626 (`hahmo-kaskadit-lahi.png`).
2. **Leivonnalla ei vaikutusta – ei koodivika:** juuri-216 lataa leivottomat kielletty-tausta-v81 ja kielletty-rakennukset-v85, eikä unity.logissa ole yhtään riviä "leivottu valo". Leivottu pari ajetaan, kun LAV:n tausta-v82 (VIKA 3520 korjauksessa) ja rakennukset-v86 (~05.30) ovat juuressa.
3. **Kujan 02 ohuet vaaleat viivat (iPad):** näkyvät myös vertailu 1:ssä, joten ne eivät ole varjoa. Ne ovat tunnettu lattiapalojen T-liitos tai rako (JONO 28.10. 16.05, v98m) → LAV. Kuva: `varjot-koko/varjo216b/kuja02-viivat-vert0-vert1.png`.
4. **STP vs MSAA ja kaskadit:** ennallaan (laitearvio NS:n L1-vuorolla LT:n kanssa).

## Työpuut
- `wt/proto-linssiseppa2-leivonta`: `linssiseppa2/valo-216` 02953bc6e (puhdas).
- `wt/proto-linssiseppa2-p11`: irrotettu 02953bc6e:hen. Ajot: `zsh tyokalut/esikatselu.sh <sha> <skenaario> ipad --batch`.
- Ajoskriptit odottavat Unityn vapautumista: `while pgrep -f Unity.app/Contents/MacOS/Unity` (yksi Unity kerrallaan, PT). Levyraja: keskeytä alle 82 Gi:n (PT 23.0x; 95 Gi:n ehto on poistettu).

## Linja 2
Vapaa klo 23.30 alkaen (viimeisin ajo valmis 23.29). PK:lle on ilmoitettu.

## Osoitteet
PT local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc, NS local_c7344e20-fba8-433d-ba8e-184a325037ef, PK local_601d33fc-1c61-4ccd-8389-fa425417fafb, LT local_ede7e965-02ff-40a0-a77d-44f3218ca146, LAV local_beb68834-6c4f-4839-ac75-7876b45052c3, Postivahti local_d8d003f6-1ae3-4a1b-854a-e0c018ed19f5.
