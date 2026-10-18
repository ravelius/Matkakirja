# Valoseppä – luovutus 18.10.2026 klo 11.3x (Postivahdin KOVA RAJA 35 %)

Luovuttaja: Valoseppä (Opus, high). Edellinen: viesti-valoseppa-luovutus-20261018-aamupaiva2.md (0b8aa1a87).
Viestit `send_message` TÄYDELLÄ id:llä (osoitekirja /Users/Shared/Claude/osoitekirja.md): PT local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc (≤ 3 riviä),
JU local_1325b8e8-c39c-49f0-9ba2-7cabd4f44629, LR local_2cf16574-67b6-40c0-928e-68bf36c72db0, KK local_febfd152-516e-488f-b0ae-cb302e725365,
Postivahti local_63227b57-d045-4b93-ab52-cddc04e3b90f.
D=/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2 (päiväkirja $D/JONO.md), L=$D/louvre-pilotti, K=$D/nakyvyys-202.
Omistajan päätös 09.37: työn alla VAIN Louvren pilotti + ISS (sininen maa, ISS-kuvan alueen nimi); k74, valas k9, raketin meri, Mapterhorn,
tavoiteluuppi ym. TAUOLLA. JU:n sääntö: L2/simu vain JU:n KÄÄNNÖS NYT / SIMU NYT -viestillä, heti SIMU VAPAA.

## 0. KÄYNNISSÄ LUOVUTUSHETKELLÄ: Louvren v2m-pariajo (JU:n SIMU NYT 11.28)
- `zsh $D/simu-louvre2.zsh` irrotettuna (pid 29022, alkoi 11.33, ~9 min): ennen = $D/kyyti-diag-app (vanha sali), jälkeen = $D/louvre-app
  14fa7a721 (= 3abdabee9: pilotti + LR v2m). Kuvat $L/ennen/, $L/jalkeen/ (vanhat ajot ennen-1/-2, jalkeen-1/-2).
- KUN VALMIS (JONO.md "SIMU-AJO Louvren v2m-parit valmis"): SIMU VAPAA JU:lle HETI. Tarkista kuvat TÄYSIKOKOISINA ja tee parit kuten
  $L/parit/ (ffmpeg hstack, oikea kuva $L/refe/{gg1,se1,sc1}.jpg | peli). Skenaariot ovat nyt VAAKA, se-kamera 18.1 −26.6, sc 3 −13.5 kääntö 200,
  j6: Pulu lennätetään penkille 2 ja kamera sen eteen. Jos jokin kuva jää näyttelysivun alle tai osuu väärin, korjaa sk-louvre-*.txt.
  Parit + lyhyt arvio PT:lle (3 riviä, polku). Päivänvalo tulee nyt gg:n 6 m lasinauhasta (LR v2k/v2l/v2m), se:ssä ruudutettu lasikatto.

## 1. TRIPO (omistaja 10.46 "tripo ostettu max tilaus kuukaudeksi", 10.52 Pulu) – TASAN 4 MALLIA, KAIKKI GENEROITU
- Macin Chrome (Claude in Chrome, omistaja kirjautunut), studio.tripo3d.ai › 3D Workspace, välilehti jäi auki. Private, H3.1.
- k1 8d4bae4d, k2 7c048280, vartija e8f91566 (multiview edestä/vasen/takaa), Pulu a1a9e725 (teksti → malli, ei Codexia, ilman pukua).
  Krediitit 25090 → 24895. Kuvat $L/tripo/kuvat/, koosteet $L/tripo/*-3-kulmaa.png, $L/tripo/ARVIO.md. PT:lle lähetetty 11.3x → KK näyttää omistajalle.
- EI VIELÄ LADATTU. Kun KK/PT kertoo omistajan katsoneen: Tripossa Export GLB kevennettynä (~20–50 k kolmiota, 2K-tekstuuri; mallit ~1,9 M
  kolmiota) → $L/tripo/<nimi>.glb → MuseoHenkilot (82c454afe, paikat gg k1/k2 + se vartija) ja MuseoPulu (vaihda koodikyyhky Tripo-Puluun:
  lento ja istuminen kuten nyt, napautus → chat). Uusia malleja EI ilman omistajan uutta lupaa.

## 2. LOUVREN PILOTTI – haara proto linssiseppa2/louvre-pilotti-202 (wt /Users/Shared/Claude/wt/proto-linssiseppa2-louvre)
- Kärki 3abdabee9 = d31b23a35 (päivänvalo + Pulu + NUI-chat) + LR yhdistetty-202 (4dc4ebad5, v2l) + testi 898423ae0 + LR v2m bde8fd1a5.
  Museotestit 183/183, tarkista 0. Käännetty JU:lla → 14fa7a721 (louvre-app). LR ajaa samasta käännöksestä omat parinsa.
- Uudet LR-paketit (sali-v2n tms.) yhdistetään tähän haaraan ennen seuraavaa käännöstä ja SHA JU:lle.
- Pulun koodikyyhky näytti lelulta → Tripo-Pulu korvaa sen (kohta 1). Äänet aanet/pulu-museo-v1/ kytketään Pulun kuvaparin hyväksynnän jälkeen.

## 3. SININEN MAA (opas Pariisi → ISS) – haara linssiseppa2/kyyti-sininen-diag (wt /Users/Shared/Claude/wt/proto-linssiseppa2-nakyvyys)
- Diag 2 (10.15): iPhone (opas → ISS) Pariisi sininen, iPad (suoraan) maa näkyy; materiaali ja ylikerrokset samat.
- Korjausyritys a7c0afa1a (S2 odottaa s2-maailman laatat.jsonia ≤ 6 s) → diag 3 (10.48, app kyyti-diag3-app 187f10c5): EI AUTTANUT.
  S2 lisättiin suoraan maailmana, silti sininen, mutta PILVET NÄKYVÄT → S2 piirtyy, väri vääristyy (ei latausongelma).
- DIAG 4 07a7a538f: lokiin pallon varjostimen globaalit (_s2MeriKynnys/_s2MeriVari = kyydin meren värjäys, _s2Savy, _s2Reuna, alfat,
  keilat, _pallonTummuus, _Ilm*) ja 3 näkyvän laatan rasterit. JU kääntää L1:llä → $D/kyyti-diag4-app. Aja:
  `DIAG_APP=$D/kyyti-diag4-app zsh $K/aja-diag.zsh --kuvat` (JU:n SIMU NYT; $K/diag/iphone|ipad; diag 2/3 talteen -diag2-kansioissa)
  ja vertaa `grep -a "kyyti-diagnoosi .* globaalit"` iPhone vs iPad. Pääepäilty _s2MeriKynnys (KarttaKerrokset.KyydinMeri /
  PaivitaLennonVarjostin): jos kynnys/väri eroaa, korjaa oppaan polun jättämä tila; ei junaan ennen PT:tä. a7c0afa1a ei haittaa, mutta ei NS:lle.

## 4. JONO
1. Kohta 0 (parit) → 2. Tripo-lataus kun katsottu (kohta 1) → 3. Diag 4 (kohta 3) → 4. ISS-kuvan alueen nimi (admin1-fi-eurooppa.json;
NE-lataus vain omistajan vahvistuksella). Vanhat appit t217–t220 siirretty T7:lle (_tyo/_siirretyt/linssiseppa2/).

## 5. LISÄYS 11.35 (PT): TRIPO 2 MALLIA LUURANKOINEN 19.10. – JUOKSUPELIN PUYI + VARTIJA
- Omistajan lupa 11.34: Tripo 2 mallia luurankoineen (juoksupelin Puyi + vartija) 19.10., VASTA kun KK on hyväksynyt Louvren mallit pelissä.
  Lähdekuvat Codexilta (1de736c41).
- KK:n laatuohje: tasainen valo lähdekuviin; 2–3 ehdokasta → paras; verkko pelille (päähahmo 15–20 k kolmiota + kevyt vartija);
  nivelet tarkistetaan liikkeessä; samat valot/varjostimet kuin muilla malleilla.
- Olavinlinnan väki myöhemmin (pidossa) – ei tehdä.
- Jonoon kohdan 4 Tripo-latauksen jälkeen.
