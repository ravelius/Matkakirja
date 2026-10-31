# Pelikoodari: luovutus 31.10.2026 klo 20.45 (konteksti 39 %)

Edellinen: -20261031-2000 (lisäykset 1–2). Muistin tila: pelikoodari-tila-20261018-aamu.md. Proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto.
Worktreet: wt/proto-pelikoodari-reitti-216 (pelikoodari/reitti-216), wt/proto-pelikoodari-v98c (pelikoodari/valo-k1-216),
wt/proto-pelikoodari-lod-216 (pelikoodari/tausta-lod-216).

## Valmista tässä vuorossa
- **Reitti-216, KK:n kohta 1 (kamera), haara pelikoodari/reitti-216:**
  - 1277498b2 palauttaa a70bf3382:n (nosto kauemmas) ja e5772ddbe:n (kenttä ei kapene). Räystäsnosto on enintään korkeus, jonka nimellisetäisyys
    sallii kulmalla YhtKulmaMax 72° (rKatto = yEt · sin 72°). Kamera tulee samalla lähemmäs (NostoLahemmas), joten etäisyys ja kapennus pysyvät.
    Syy 13–17 m:n nostoon: Meridiaaniportin käytävien häivytetty räystäs 11,9–13,9 m, ja ennakoiva räystäsnosto nosti kameran jo kujalla.
    Kameraväli-lokiin "rennakko" (suurin ennakoitu räystäs / aika / pisteiden määrä). Ajossa c3 kameran suurin etäisyys on 8,9 m ja korkeus 8,8 m (c2: 23 / 15,5).
- **KK:n kohta 3 (sivukujien eunukit), d63293429:** ennakko arpoi kujan sisällön yhteen suuntaan, ja vastasuuntaan juostessa `Ota` pudotti
  sivukujan vartijan. Nyt `Sisalto` arpoo verkossa vastasuuntaa varten oman sivuvartijan kujan alkupään risteykseen (V4Vartijapaikka.VainPeili,
  40 %, oma siemen). JuoksuReittivalintaTestit vaatii verkossa lähtöjä sivulta. Palatsi 216: 6 lähtöä sivulta (ennen 1), kaikki näkyivät ≥ 2,5 s.
  Ajossa c3 sivulta lähti 13. kaanna.sh 781/781, unity-tarkistus 0.
- 59e5d8218: esikatselun osumat myös kuvan kulmiin ja alareunaan; skenaariossa `ui juoksupeli palatsi kopiot 1`, jolloin osumat toimivat palatsin verkoissa.
- **Ajo c3** (lokit/esikatselu-20261031-202240): arkki ja video _tyo/pelikoodari/reitti-216/c3/ (arkki-c3.jpg 10×9, video-c3.mp4).
  PT:lle ilmoitettu 20.45. **KK:lle EI vielä lähetetty**: KK haluaa kaikki kolme kohtaa samaan arkkiin, ja kohta 2 vaatii VS:n.
- **Kohta 2 diagnosoitu:** harmaa teksturoimaton lattia = kk-tausta-1-2 lod0:n korotettu terassi (y 0,70, vaakapinta, `_Laji 16` marmori),
  joka piirtyy tasaisen harmaana (b-12/b-13 osumat). Kyse on VS:n varjostimesta (JuoksuLattia, laji 16) tai LAV:n materiaalista; PT päättää.
  Turkoosi kaista näkyy yhä taivaalla c3-arkin riveillä 1–2 ja 8 (palkisto tai portin kannatinrivi, tunnistamatta).
- **Leivottu valo junaan 216, haara pelikoodari/valo-k1-216 8bcfebdf2** (d41ae2a47 + leivonta-217 45b5492df, varjostimissa VS:n float4,
  EI koekerrointa 3): OsasarjaKansio v6, TaustaKansio v87, RakennusKansio v88, MuurikateC3Kansio v32. Esto: uusilla paketeilla leivottu esto on
  tavulleen sama kuin vanhoilla (972db67e…), joten palatsi-esto-v23 jää. 782/782, unity-tarkistus 0. Paketit eivät ole vielä ämpärissä (404).
  **PT:ltä pyydetty kuittaus 20.3x** JU:n vientiin: osasarja-v6 (SUMS 12ea9337), leivonta-v3 (79b448a1), tausta-v87 (a1e090c3); SHA256SUMS OK.
- **Taustan LOD (VS-ehdotus, PT hyväksyi arkin jälkeen), haara pelikoodari/tausta-lod-216 06fed34e2** juna-216:n päällä: taustapalan
  LOD lasketaan lähimmästä pisteestä rajoihin (rajat_xz → osaRajat), ei keskipisteestä. Muisti: kaikki LOD-tasot ladataan alussa
  (LOD2 puretaan LOD1:n jälkeen), joten valinta muuttaa vain piirtoa. QA `ui juoksupeli palatsi taustalod 0|1` (heti) ja `valo lodtieto` (LOD0 tausta x/y, mallit).

## Kesken / seuraava
1. **PT:n vastaus kohtaan 2** (VS korjaa marmoriterassin, vai jätetäänkö). Kun kohta 2 on kunnossa: uusi ajo c4 samalla skenaariolla
   (c3/sk-c3.txt, aja-c3.zsh mallina), arkki ja video KK:lle ja merge-pyyntö NS:lle (pelikoodari/reitti-216: 1277498b2, d63293429, 59e5d8218).
   Tarkista c4:ssä c3-arkin rivi 3 sarakkeet 8–10 ja rivi 4 sarakkeet 1–2: keisari pieni ja kuvassa vain lattiaa (Meridiaaniportin käytävä?), lokista b-27…b-31.
   Leijuvat oranssit koristeet (chiwen) näkyvät edelleen rivien 1–2 yläreunassa; harjakoriste ei häivy katon mukana (KK:n TARKISTA).
2. **Valo:** kun PT kuittaa → JU vie paketit ämpäriin → esikatselupari (koekohtaus 06 + kujat 02/05) valo-k1-216:lla → merge-pyyntö NS:lle.
   VS vaihtaa JuoksuLeivottuKerroin 0,75 → 1 omana muutoksenaan.
3. **Taustan LOD -mittaus:** esikatseluajo tausta-lod-216:lla, `valo lodtieto` kujilla ja 06:ssa, `taustalod 0` ja `1` samassa ajossa;
   kirjaa LOD0-taustapalojen määrä ja muisti (esikatselun muistirivi) ennen ja jälkeen. Kuvapari 06:n saumasta (VS:n kuva _tyo/linssiseppa2/k06-f0-sauma.png)
   VS:lle ja PT:lle, commit NS:lle junaan 216.

## Huomiot
- Linja 2 vapaa (`pgrep -fl esikatselu.sh`). c3-ajo kesti 1 294 s.
- MK_JUURI testeille: /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/leivonta-217/juuri-k3 (ei v87/v88-kansioita).

## LISÄYS 20.4x (PT ja JU)
- **PT:** c3-arkki ja video lähetetty KK:lle 20.46 kohtien 1 ja 3 osalta. **Kohta 2 on työn alla, ja PT ohjaa sen:** harmaa terassi menee LAV:lle tai VS:lle,
  turkoosi taivaskaista VS:lle. Pelikoodari ei tee kohtaa 2, ellei PT anna erää.
- **PT:** LOD-erä 06fed34e2 menee NS:lle junaan 216, kun mittausajo on ok (Kesken-kohta 3).
- **JU 20.45:** valo-k1:n paketit ovat ämpärissä PT:n kuittauksella (osasarja-v6, rakennukset-v88, muurikate-v32, tausta-v86 ja tausta-v87; tarkistettu
  SHA256SUMSia vasten). Tarkistettu klo 20.46, kaikki palauttavat 200. Valo-k1-216:n esikatselupari voidaan ajaa heti (Kesken-kohta 2).

## LISÄYS 2, 20.5x (PT, kohta 2: VS:n löydös) – PK:n TEHTÄVÄ, ENSIMMÄISENÄ
- **Keisari juoksee kk-tausta-1-2 lod0:n terassin SISÄLLÄ** (terassin yläpinta y 0,70, laji 16; c3:n b-12/b-13, osumat-rivit:
  lokit/esikatselu-20261031-202240/unity.log). Selvitä, onko vika reittiverkossa (JuoksuPalatsiVerkko: kulkupinta ja korkeus terassin kohdalla,
  pohja kk-pohja-v1d-pk8 ja profiilit) vai terassin törmäyskopiossa tai peittokartan maanpinnassa (MaanPinta, avoimet-sijoitus.json, rakennusten
  -tormays.glb), ja korjaa se. Kuvapari PT:lle (ennen ja jälkeen samasta kohdasta, skenaario c3/sk-c3.txt b-11…b-14).
- LAV korjaa terassin materiaalin, turkoosin palkkivyön ja puuttuvan katon; ne eivät ole PK:n työtä.
