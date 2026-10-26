# Päätoimittajan luovutus 24.10.2026 klo 18.56 (konteksti 30 %; tili vvi@vvi.fi)

Id:t: /Users/Shared/Claude/osoitekirja.md. PT local_5df52e10. Edellinen -20261024-1658 (lue vain tämä).
ALOITA: tuotannonohjauksen osio 0, node tools/raamattu-luku.mjs 7.47, luvut 7, 8, 9, 12, 14. Asemataulu ensin (Artifact open).
Keskustelu: /Users/Shared/Claude/keskustelut/Paatoimittaja-2026-10-24-klo-1700-1856.md. Codex-posti: scratchpad/posti-laheta.sh.
Seuranta: Monitorit odottajat-vahti.py ja codex-posti-vahti.sh (30 min, uusi vanhetessa). Työlistan päivitys scratchpad/paatoimittaja/tl-paivita.py.

## 0. OMISTAJAN PÄÄTÖKSET TÄNÄÄN (kaikki kirjattu, PR #5208 kärki tämä luovutus; JU mergeää)
- 18.18 HAVAINNEKUVASTA IDENTTISEKSI kaikkiin peleihin: B 3d-ja-kuvat.md kohta 11, historiapeli-resepti, Raamattu 7.20, loki.
- 18.26 kuvakulma = havainnekuva 810 (korvaa B:n), värit havainnekuvan tasolle, laatat kolmiulotteisiksi: Raamattu 2.177, loki.
- 18.45 "tee vain kaikki mahdollinen 210 junaan. sanon sitten kun julkaistaan": juna 211 yhdistetty 210:een; TF vasta omistajan sanasta.

## 1. JUNA 210 (kärki NS natiiviseppa/juna-210 8d889760b, vihreä 18.55; sis. LR v37/v22/v26/v36-koristeet, PK kuja-211, VS grafiikka-211)
Ämpärissä odottaa kokoamista: LR rakennukset-v23 (porraskaiteet, 18.55) → NS kokoaa.
- PK: 810-kuvakulma (yksi valinta, ei vaihtoehtoja omistajalle) ~22.00 → kuvapari PT:lle (810 | peli: 01, 02, 05, aukio). Sitten
  lähipuut 938–940 instansseina (LR antaa GLB + puut.json), sitten juoksureitti (kapeat kujat + portit).
- VS: värit k17 (mittaus varivertailu.py: mediaani, mustat ≥ 25, punainen 0,67/0,54) – seuraava sarja ~19.35; varjoväläys korjattu
  5ba6f65bc (varmistusajo jonossa); laattojen paksuus varjostimessa. Muuripari 5 palautettu: kivijalka kimaltaa (graniittikohina),
  kivireunus liian leveä/valkoinen. Uusi pari 810-kulmalla.
- LR: kysytty kujaportti 810/02–05 (punamuurikujan päähän katollinen portti, jos ei reitillä); v38 kaukopuut ristikortteina ajossa.
- VIDEOT: vanhan kulma B:n videot (lokit/omistaja-videot-210-kulma-b-v3) EIVÄT mene omistajalle. Uudet vasta kun 810 + värit +
  väläyskorjaus rungossa → PT mittaa (9.5: leima 2,0–2,2 s, ääni, YAVG-väläyshaku valahdys-yavg.zsh) → KK. Arvio KK:lle ~23.30.
- Kuvaparit omistajalle KK:n kautta valmistuessa: kuvakulma ja värit ensin (KK pyysi).

## 2. CODEX
- 938–940 puut hyväksytty (posti 5e7cd3aa8). 942 laattatekstuuri hylätty → 942b kivipinta ilman saumoja tilattu (e8ab75c18):
  tarkista toimitus täysikokoisena (saumattomuus 4 × 4, native ≥ 1024) ennen VS:lle.

## 3. MUUT
- KK nollattu 18.21 (Postivahti), etäkäyttö päällä. Natiivi-UI ja Äänittäjä levossa ilman jonoa (ei hälytystä).
- kirjattavat-20261024.md: Raamattu 9.5:n valahdys.py-viite vanhentunut → VS:n /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/
  valahdys-yavg.zsh tools/:iin ja 9.5 päivitys.
- Asemataulu: junan 211 rivit siirretty 210:een; päivitä junarivi, kun kuvaparit/videot omistajalla.

## 4. Opit
- Kuittaa paketti vasta pelikuvasta, kun mahdollista; Blender-kuva vain sisäiseen etenemiseen.
- Codexin tileable-tekstuuri saumoineen ei onnistu generoimalla: ladonta varjostimeen, Codexilta vain pintamateriaali.
