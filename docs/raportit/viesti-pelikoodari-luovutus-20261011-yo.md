# Pelikoodarin luovutus 11.10.2026 klo 00.3x (nollaus 51 %, PT)

Edellinen: viesti-pelikoodari-luovutus-20261010-yo.md. Viestit SendMessage nimellä: "PÄÄTOIMITTAJA (Opus, max)", "Julkaisija (Opus, high)",
"Linssiseppä (Opus, high)" (LS1), "Linssiseppä 2 (Opus, high)" (LS2), "Natiiviseppä (Opus, high)", "Sisältökirjuri (Sonnet 5.5, high)".

## Tehty 10.10. 22.1x – 11.10. 00.3x
- **Juna 181 KUITATTU ja MITATTU**: proto pelikoodari/latausmusiikki 04d98a0b9 (linnan ristihäivytys dB + pallon omat latausraidat
  Pariisi "bassoriffi ja harjat" ja Tukholma "kontrabasso ja marimba", AaniTaulut.Latausraidat, kerroin 1,70/1,68 vain latauskanavalla).
  Simu 23.38 (käännös 2a61094c2): linna ristiin 0,9 dB/100 ms, pallo Pariisi taso 0,60, ramppi 0,8 dB/100 ms, poikkeuksia 0.
  Lokit proto-3d/lokit/pelikoodari-latausmusiikki-2338-juna181. Äänet audio/musa-pallo-*-lyria-v2.mp3 VIETY.
- **Soundly (kippi)**: aukkohaku erä pallo2 (NAS erapallo2) + portti → raportti docs/raportit/soundly-kippi-aukot-20261010.md.
  Paketti aanet/pallo-soundly-v2/ (37 ääntä LS1:n tunnuksilla, tuuli-tasainen-01 = SND115731 PT:n poikkeuksella) VIETY → LS1 kytkee junaan 182.
  Lisenssi: tilauksen päätyttyä uusista pääversioista Soundly-äänet pois (PT kertoi omistajalle).
- **Äänisivu** (aanisivu-sivusto, julkaisu julkaisija-tyokalut/aanisivu-julkaise.zsh; varmuuskopiot index.html.ennen-*):
  Musiikki = Odottaa valintaasi (auki) / Pelissä / Arkisto (details). Odottaa: kipin soittolista 8 tyylinäytettä (_tyo/kippi-musiikki-20261010;
  omistaja valitsi Pariisi harppu + Tukholma piano; EI uusintoja sellolle/kitaralle), kaupunkimusiikin 7 hidasta yhden soittimen koetta
  (_tyo/kaupunkimusiikki-kokeet-20261010), kipin ensimmäiset 4. Perinnetyylin 16 arkistossa. TF179:ssä kartalla vain kaupunkikappaleet →
  alue-/maanosa-/saapumis-/siirtymä-/pohjaraidat + aloituslento arkistossa ilman Pelissä-merkkiä.
- **Taidemuseon kertoja** (omistajan lupa 00.2x): 33 tekstiä William turbo, _tyo/taidemuseo-kertoja-20261011 (tee.py, luvut sanoina).
  v1 VIETY (35–53 s, liian pitkä); v2 = tempo 1,10× (32–48 s, 16/33 yli 40 s) → Julkaisija vie aanet/taidemuseo-kertoja-v2/, LS2 kytkee
  (juna 181). PT kysyy omistajalta aamulla, lyhennetäänkö pisimmät (SK lyhentää → uusi generointi vain luvalla).
- **Peili-404**: #4378 MERGED (paakaupungit, poiminta, Nouméa). Jatko #4379 (fokusnosto poimintaan, \p{L}-raja, yksirivinen arvo):
  reitti vihreä, testit ajossa 00.29 → Julkaisija mergeää ja seuraa peilausta. #4370 (Pulun eleet) MERGED.

## KESKEN / JONO
1. **#4379** Julkaisijalla: jos CI punainen tai peilaus näyttää yhä NAMA-404:n tai tyhjiä lippunimiä, korjaa (wt/pelikoodari-peili-404,
   haara pelikoodari/peili-404-2); poista worktree mergen jälkeen `sh tools/uusi-worktree.sh --poista pelikoodari-peili-404`.
2. **Soundly-kippiäänet juna 182**: LS1:n kytkentä; vastaa LS1:n kysymyksiin (paketti _valmiit/pallo-soundly-v2-vienti-20261010,
   tekijä _tyo/soundly-pallo-v2/kasittele.py).
3. **Kipin soittolista** (~20 kpl satunnaisena kaikissa kipeissä) odottaa omistajan valintaa 8 näytteestä; seuraavat kehotteet
   _tyo/kippi-musiikki-20261010/generoi.mjs:n mallilla, MUTTA tunnelmaan ei soitinnimiä (ne päätyvät soittimiksi). Kaupunkimusiikin
   7 koetta odottavat myös valintaa. Peliin vasta valinnan jälkeen; generointi vain luvalla (määrä).
4. Taidemuseon kertoja: omistajan päätös pisimmistä aamulla (PT).
5. Vanhat: Freesound odottaa omistajan kirjautumista ti 13.10.; kaupunkikappaleiden erä 2 korvautunut uusilla kokeilla.

## Opit
- Lyria: kehotteen yhteinen tunnelmalause ei saa nimetä soittimia. Googlen suodatin esti "intimate … single unaccompanied voice".
- Lyria-kuoro: tools/lyria.mjs lisää aina "no vocals" → kuoro omalla kutsulla (kaupunkimusiikki-kokeet generoi.mjs haeSellaisenaan).
- Ämpärin polkua ei ylikirjoiteta: tarkista curl -sI ennen paketin nimeä (pallo-soundly-v1 oli jo pelissä → v2).
- Ei pkill -f: lopeta oma prosessi pid:llä.

## Worktreet
wt/proto-pelikoodari-lataus (juna 181, kuitattu; poista kun juna 181 on lukittu), wt/pelikoodari-peili-404 (#4379),
wt/proto-pelikoodari-pulu, wt/pelikoodari-louvre (#4365).
