# Linnanrakentajan luovutus 29.9.2026 klo 14.0x (erä 2b valmis, tunnelmavalo toimii, merge-pyyntö odottaa OK:ta)

Rooli: **Linnanrakentaja (Opus, max)**, Poikkileikkaus-linssi (id `poikkileikkaus`, moottori dioraama, hiomassa).
Päätoimittaja johtaa. Omistajan toive: Sonnet-agentit mahdollisimman laajasti, tulokset ≤ 15 riviä + polku.
Aiempi luovutus (erät 2 ja 2b, käytännöt): `viesti-linnanrakentaja-luovutus-20260929-b.md`.

## Omistajan päätökset tänään

1. **Klo 07.5x:** vapaasti pyöriteltävä 3D, kaarilennot ja ei pahvia. Keittiön v1 A|B-vertailuna. Hahmot ovat 3D-pienoisfiguureja.
2. **Klo 12.3x, kortti "B + tummempi valo":** jatketaan Codexin pinnoilla (B).
   - Valaistus kuten referenssissä: tumma yleisvalo, ja tulisija, kynttilät sekä ikkunan aurinko tekevät tunnelman.
   - Liekin hehku pienemmäksi.
   - **Uusi kuvapari Päätoimittajalle ennen proton merge-pyyntöä Natiivisepälle.**

## TILA KLO 14.0x (uusin, lue tämä ensin)

- **Proto** `linnanrakentaja/keittio` = **573ccecc** (worktree `/Users/Shared/Claude/wt/proto-linnanrakentaja-keittio`).
  - Simulaattorikäännös 16f8a161 (= master-juna + 573ccecc): tunnelmavalo toimii, ei poikkeuksia.
  - Kuvapari Päätoimittajalle ja omistajalle lähetetty: `docs/raportit/kuvat/linnanrakentaja-era2b/keittio-tunnelma-*.png`
    (5ce1c36ca).
  - `git merge-tree master HEAD`: ei konflikteja nykyisen masterin (1c4a7eff) kanssa.
- **Pelin repo:** ravelius/Matkakirja#3621 (`linnanrakentaja-keittio-2b` = dcc264192) Julkaisijan junassa.
  - Tarkista: `gh pr view 3621 --json state` ja `curl -s https://media.matkakirja.app/dioraama/olavinlinna/uusin.json`
    (hash vaihtuu mergen jälkeen; nyt f8db6536de6715ec = erä 2).
- **Kärki:**
  1. Odota Päätoimittajan OK kuvapariin.
  2. Kun #3621 on ämpärissä: lyhyt simulaattoriajo ILMAN peiliä (Julkaisijan NYT; ajo-poikki.sh:lle `PEILI=` tyhjä →
     skripti antaa `poikki peili` ilman arvoa = pois), ja tarkista että paketti tulee ämpäristä, 3D-hahmot ja valot näkyvät.
  3. **Merge-pyyntö Natiivisepälle** (SendMessage "Natiiviseppä (max)"):
     - haara `linnanrakentaja/keittio`, kärki SHA, 16 committia, 62 tiedostoa
     - jaetut tiedostot: Aanisoitin +217, LinssiSopimus +28, LinssiOhjain +23, PeliOhjain.Aanet +3,
       IhmisenMatka2Ymparisto +2, LinssiUi +3, ValeYmparisto +31, AanisoitinTestit +25
     - testit Linssit 440/440, Peli 358/358, unity-tarkistus 0
     - linssi Kesken = true (vain kehittäjätila)
     - DioraamaValot muuttaa linssin ajaksi URP-varjot, lisävalorajan, ambientin, RenderSettings.sunin ja muiden valojen
       dioraamakerroksen maskin, ja kaikki palautetaan sulkiessa.
- **Käynnissä olevia ajoja ei ole.** Simulaattorit ovat sammuksissa, eikä agentteja ole käynnissä.

## Tila

- **Pelin repo:**
  - ravelius/Matkakirja#3601 (erä 2) on mainissa.
  - ravelius/Matkakirja#3621 (erä 2b, haara `linnanrakentaja-keittio-2b`) on Julkaisijan junassa. Mergen jälkeen
    vie-dioraama vie paketin ämpäriin, ja Julkaisija ilmoittaa.
  - #3596 (vie-dioraama.yml) on mainissa, ja keittiön 31 ääntä ovat ämpärissä `dioraama/olavinlinna/aanet/v1/`.
- **Proto:** `linnanrakentaja/keittio` 573ccecc. Ei vielä merge-pyyntöä.
  - Tunnelmavalon data: ikkunan keila (voima 120), sisalla-kertoimet, tulisija 1,8.
  - Diagnoosi: `poikki valaistus 0|1` ja `valo aurinko 0` eivät muuttaneet kirkkautta, koska **pallon suuntavalo oli
    dioraaman päävalo**.
  - Korjaus 573ccecc: oma aurinko on `RenderSettings.sun`, ja muut valot rajataan pois dioraaman kerroksesta linssin
    ajaksi (palautus sulkiessa).
  - **Kärki: seitsemäs käännös (Julkaisijan NYT, jonossa TF 1.0.48:n jälkeen).**
    - Ajo: `APPNIMI=<nimi> VAIHEET=129 MAXSIM=3 ajo-poikki.sh`, ensin iPad (`UDID=F75C92E7…`, `LAITE=ipad`,
      `KIERTO=vaaka`) ja sitten iPhone.
    - Tarkista, että keittiö on tumma ja tunnelmallinen ja ikkunan läikkä näkyy. Keila 120 on iteroitu three.js:ssä:
      säädä, jos URP:ssä poikkeaa.
    - Sitten kuvapari Päätoimittajalle (`merkitse.py`, kulma ja SHA kuvaan).
- **Diagnostiikka ilman käännöstä:** `proto-3d/tyokalut/linnanrakentaja-ajot/diag-valo.sh` (kytkinkuvat valaistus,
  aurinko, lamput ja tuli). Vaatii simulaattorivuoron.
- **Esikatselu:** `node tools/dioraama/rakenna.mjs olavinlinna && node tools/dioraama/esikatselu-kuvat.mjs <kansio>`.
  Esikatselussa ACES, natiivissa Neutral-tonemappaus.

## Seuraavat askeleet

1. Seitsemäs ajo, sitten kuvapari Päätoimittajalle ja hänen OK:nsa.
2. **Merge-pyyntö Natiivisepälle:**
   - Haara `linnanrakentaja/keittio`. Jaettu äänipooli on commitissa b2aac83a. Natiiviseppä hyväksyi linjan A ja
     tarkistaa Aanisoittimen.
   - Kerro myös: DioraamaValot muuttaa linssin ajaksi URP-assetin varjoasetukset, lisävalorajan, ambientin, sunin ja
     muiden valojen cullingMaskin, ja kaikki palautetaan.
   - Kun paketti on ämpärissä: poista peili ajoskriptistä (`PEILI=pois` tai `poikki peili pois`) ja savusta ilman peiliä.
3. **Erä 3 (linna auki):**
   - 8 tilaa ja yleisnäkymän linnan yksityiskohdat (massa on karkea).
   - Nimet: kellari = Kellotornin fatabuuri, sali = Keskushalli (väentupa), kappeli Kirkkotornin 3. krs.
   - Tornit n1500: Kellotorni, Kirkkotorni, Pyhän Eerikin torni.
4. **Avoimia:**
   - Forward+-tuki varjostimeen (vain PC-renderöijä).
   - JS:n kierto-muoto (`atsimuutti:[a,b]` vs `atsimuuttiMin/Max`).
   - "1475"-äänen kuuntelu.
