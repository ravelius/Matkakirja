# Päätoimittajan luovutus 16.10.2026 klo 18.4x (konteksti 29 %, juna 196 lähti; tili vvi@vvi.fi)

PT local_5df52e10-10e4-4b72-9554-0049db300dfe, KK local_dfa7296a-d3d3-41ef-a2b1-dbc42a652589. Id:t /Users/Shared/Claude/osoitekirja.md. Asemataulu https://claude.ai/artifact/Qo5w6Wk4JSYRwYbyf2fJrm. Paikallinen talo/junat.json + tyolista.json: scratchpad/asemataulu/data/talo/ (ajan tasalla 18.46: rivi "Juna 197" avattu, "TF 196" Uutta-listana).

## 0. Heti aluksi
RC päälle, odottajavahti-Monitor, get_usage self. Asemataulu nollattu 18.37 → KK:lle ilmoitettu (hoitajan cronit tarvitsevat KK:n päätösrivin).
PR #4711 (haara fable-codex-tahti, worktree /Users/Shared/Claude/wt/fable-codex-tahti) AUKI: Raamattu CODEXIN TAHTI + lokit 18.05, 18.14, 18.18, 18.3x + tämä luovutus → Julkaisija mergeää CI:n jälkeen; worktree pois mergen jälkeen (`tools/uusi-worktree.sh --poista fable-codex-tahti`).

## 1. Juna 196 VALMIS
TF 196 sisäisillä 18.42, ulkoisilla 18.43 (BUILD cbf1d288b). Savu k5 omistajan 17.45 päätöksellä ("junan voi julkaista jo ilman näitä"), museotekstit dcdffd0d4.

## 2. Juna 197 (runko NS 80c4976b0 vihreä = 196 + salilista a60097fef)
PT kuittaa NS:lle vasta kun valmis:
- SAVU k7 (Valoseppä, nollattu 18.44 – avoimet lähetetty viestinä): video + arkki → KK/omistaja ENNEN kytkentää (omistaja 18.20 "Oikea suunta": harmaampi savu, märkä kiilto, voimakkaampi oranssi). NS:lle sanottu: k6 EI junaan.
- VARJOPUOLI f23d46f7f (Valoseppä): kaupunkiarkki Notre-Dame/Tukholma ei huononnusta → PT → SHA NS:lle.
- LOUVRE k48 (omistaja 18.27 "Junaan 197 nyt"): v6k20 Valoseppä → Julkaisija R2 + osoitin yhdessä varjopuolen kanssa. Pyramidimöhkäle = Googlen pyramidi, näkyy vain L1-testikamerasta; LR siirtää testikameran, Valoseppä varmistaa kulma B. Veistoskoristelu/kirkkaus jatkuu (LR) → uusi kuva omistajalle.
- MUSEOTEKSTIT (omistaja 18.10: liikaa tekstiä, tummennus huono): NUI c5dff5d39 (haara natiivi-ui/museo-nimi-197; kevyt-kytkin pois myös metrosta, vain nimi+tekijä/vuosi, ei taustaliukuja), kuvat ~19.15. Korkeat teokset nimi seinälle: LS 90b7a67b3 (koodi valmis), Salon Carré -kuvapari LS:n seuraajalta. Kuvapari PT → KK ennen kytkentää.
- 7 PÄÄKAUPUNKIA (omistaja 18.14 "Avataan, kun hyväksyn esittelyt"): Monaco (3 km), Bern, Bratislava, Podgorica, Tirana, Belgrad, Zagreb. Karttasepän draft-PR #4713 (CI punainen tarkoituksella). Odottaa: omistajan Hyvä ×7 kartan esittelyille (#4712, Tekstit-osasto) + Sisältökirjurin OPPAAN esittelyt (7 × ~8 kohdetta, ~1,5–2 h ~20.30). Vaduz/Skopje/Chișinău/Minsk kehityskaupunkeja.

## 3. Muut käynnissä
- PEKING (omistaja 18.05 CODEXIN TAHTI, pysyvä): Codexilla #361 pinnat + #362 sävy (addcc8ac1). #360-pelitesti ajossa irrotettuna (ajo-peking360b) → LS:n seuraaja arvioi Codexille < 30 min. Postivahti hälyttää "CODEX ODOTTAA" (KIERROS.md, ei ledger.jsonia – postilaatikon commit-ajat). Arvioitu Peking-paketti → ämpäri ilman junaa omistajan piilotettuun kippiin + rivi KK:lle.
- JUOKSUPELI (omistaja 18.18): suunnitelma #4714/#4715 (kesä, näköala 1914). Codex 3 kuvaa tilattu (Pelikoodari arvioi < 30 min) → kuvat KK:lle. Sisältökirjuri: Puyin lapsuuden faktapohja oppaan esittelyjen jälkeen. Rakentaminen vasta kun Codexin Peking valmis.
- KIINAN DYNASTIAT -LINSSI (omistaja 18.3x): suunnitelma + lähdeselvitys mergetty #4716 (18 avainvuotta; omat CC0-piirrokset, Cliopatria CC BY viitteenä). Rajojen piirto (1–2 pv) odottaa PT:n tilausta – päätä järjestys junan 197 ja Pekingin rinnalla (Karttaseppä muuten vapaa).
- KESKUSTELUSSA, EI PÄÄTÖSTÄ: kesä 1923 esityksenä vs peli; Taiwanin palatsimuseo (VAIN EUROOPPA -poikkeus). Älä tee mitään ennen omistajaa.
- Prahan ja Ateenan historiaosiot 8+8 Tekstit-osastossa omistajan hyväksyttävänä → sitten Äänittäjä.

## 4. Levy
29–32 Gi. TF 196 -arkistointi söi ~10 Gt (siivottu). Valoseppä siirsi ~8 Gt T7:lle. PT:n checkoutissa .git/objects/pack 5,9 Gt pack klo 17.45 (sovelluksen git add -prosessi) – ei koskettu. Postivahti: < 22 Gi pysäyttää L2-jonon, < 20 hätä.

## 5. Roolit nyt
Valoseppä (nollattu): k7, varjopuoli, Louvre-paketti. LS (nollattu 18.46): Peking #360-arvio, museon korkeat teokset. NUI: museo-nimi kuvat. LR: Louvre-koristelu + testikamera. Karttaseppä: dynastiat-suunnitelma. Sisältökirjuri: oppaan esittelyt 7. Pelikoodari: juoksupelin Codex-kuvien arvio. NS: runko 197. JU: TF 196 valmis, Mac 196 L2. Lepäävät oikeutetusti: Äänittäjä (odottaa hyväksyntää), Siirtoseppä (34 %).
