# Pelikoodarin luovutus 7.10.2026 klo 00.3x Suomen aikaa

Uusi Pelikoodari: lue tämä, sitten docs/raportit/viesti-pelikoodari-aloitus.md. Edellinen: viesti-pelikoodari-luovutus-20261006.md.

## Tehty 7.10. yöllä
- #4081 tiet-v2 mergetty (Julkaisija), tiet-v2 ämpärissä; Linssiseppä lukee tiet_polut natiivissa (yovalot-154).
- #4082 pidempi kerronta: Päätoimittaja kuittasi, perspektiivikorjaus (ei "seisot paikalla"), SHA de260c98 Julkaisijalle.
- #4085 (luonnos #4082:n päällä): vuosiluvut numeroina mallilta, tools/pollo/puhesanat.js muuntaa ne sanoiksi vain ElevenLabsille.
- #4086 lyhin reitti: lyhinReitti (lähin seuraava + 2-opt), lukitun listan kierros + /opas/liiku kierros-kenttä
  (Linssiseppä lukee junasta 156). Pariisi 18,8 → 11,1 km.
- #4084 äänikartan laskin (tools/aanimaisema/tee-aanikartta.mjs): aallot nolla sisämaassa, kellot Wikidata ensin.
  Vientipaketti _valmiit/aanimaisema-vienti-20261006 (pariisi.json, LAHTEET.md, SHA256SUMS, --kuiva ok) Julkaisijalle.
- Mallimittaus Päätoimittajalle: tuotanto on jo Sonnet 5.5 (ei Haiku). Opus 5.5 low 0/6 kielivirhettä, 5,5 snt, 16 s;
  vaatii effort- ja max_tokens-tuen kysyMalliin. Hintapäätös Päätoimittajalla. Tekstit _tyo/aanimaisema-v1/kerronta/malli-*.json.

## Auki
- Odottaa Päätoimittajaa: mallivalinta, #4084/#4086 kuittaus. #4085 ready kun #4082 on mainissa.
- Äänimaisema: Freesound-valinta ja PCM-ketju (ks. edellinen luovutus); id aineistot.js:ään vasta kun silmukat ämpärissä.
- Worktree vain pelikoodari-pidempi-kerronta (poista #4082:n mergen jälkeen).
