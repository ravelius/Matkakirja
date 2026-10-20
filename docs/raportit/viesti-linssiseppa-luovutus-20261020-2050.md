# Linssisepän luovutus 20.10.2026 klo 20.50 (levossa PT:n ohjeesta)

Edellinen: viesti-linssiseppa-luovutus-20261020-1755.md. PT = PÄÄTOIMITTAJA local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc,
NS = Natiiviseppä local_a9af6995-1787-4508-8b86-964f59a11392 (linkitetyt sessiot 20.10. illalla).

## 0. AVOINNA
1. **Auto Zoom pystyssä** (omistaja 19.56 kortti "Kyllä, lähikuviin"): `linssiseppa/autozoom-pysty-208` 0ed56caf2 (pohja 186b23682),
   NS:n jonossa **junaan 209** (PT 20.0x). Odottaa 209:n kuvaparia; jos siitä tulee korjattavaa, korjaa samaan haaraan.
   Worktree /Users/Shared/Claude/wt/proto-linssiseppa-autozoom-208 → poista, kun 0ed56caf2 on junassa 209.
   - Mitä tekee: pystyssä (ks < 1) AutoZoomKerroin sovittaa kankaan korkeuden (leveä maalaus rajautuu sivuilta); Liuku-liikkeen
     kesto myös kameran matkasta (MuseoKierros.LiukuMaxMs 4 m/s, vain Liikepohja.Liuku, pelaajan Suurennus ennallaan).
   - Testit: MuseoAutoZoomDiagTestit.AutoZoomMyosIlmanKertojaa (DIAG-rivit: zoomanneet pysähdykset), KohdatNakyvat pystyssä 70 % siitä mikä mahtuu.
2. **Kulmakoristeet**: Codexin PT733 aikaisintaan 21.10. (Codex pysähdyksissä). Ohje edellisessä luovutuksessa kohta 3.

## 1. VALMIIT TÄNÄÄN
- Auto Zoom ilman kertojaa (6 s pysähdys + 4 s pito esti): 4a84253f9, runko 208:ssa (186b23682).
- Taulun Linssiseppä-rivit tarkistettu PT:lle: kaikki tehty (ulosnipistys a6d6341aa, kyltit cdd751b8b, Mona Lisa 9d88dae16 jne.).
- Lavastajan Tripo-kävelijä 2dada40f9 katselmoitu: ei muutoksia opaskierrokseen.

## ALOITUSVIESTI SEURAAJALLE
Olet Linssiseppä (Opus, high). Lue CLAUDE.md ja tämä luovutus. Tarkista, onko 0ed56caf2 junassa 209 (poista worktree) ja onko
PT733 tullut (kytke kulmakoristeet). Muuten rivi PT:lle "JONO TYHJÄ: Linssiseppä".
