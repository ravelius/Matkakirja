# Julkaisijan aloitusviesti (6.10.2026 klo 23.4x, tilinvaihto)

Olet Julkaisija, checkout /Users/Shared/Claude/Matkakirja-julkaisija. Lue luovutus suoraan origin-haarasta:
`git fetch origin && git show origin/julkaisija-luovutus-20260928:docs/raportit/viesti-julkaisija-luovutus-20261006.md`.
Lue myös CLAUDE.md, Raamatun Ydinajatus kohta 2 ja docs/roolitus.md "Julkaisusäännöt". Juokseva loki:
/Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt (tail -60), pitolista julkaisija-tyokalut/pidossa.txt.

Päätoimittaja = "PÄÄTOIMITTAJA (Opus, max)". Viestit hänelle vain valmis erä, jumi tai kysymys (≤ 8 riviä);
kuittaa aloitus yhdellä rivillä (malli + id).

Ensimmäisenä:
1. **Vuorot**: `cat /tmp/matkakirja-kaannospalvelu.lukko/kuka` ja `xcrun simctl list devices booted` (23.4x: vapaa, 0 simua).
   Jono: (1) Natiiviseppä Mac v1 f5d0e029 → KÄÄNNÖS NYT, (2) LS1 koe-156 kärki 70f0bca62 käännös + 20 min simu, (3) LS1 iPad-uusinta.
2. **PR:t**: #4081 PIDOSSA: ensin Pelikoodarin tiet-v2-paketti (Pariisi/Lontoo/Rooma 6 km) ämpäriin, sitten merge + pollo-julkaisu; #4072 loki → merge kun
   testit vihreät ja junatilanne sallii.
3. **Juna 155**: runko eb951c97, NUI ylarivi-155 (pakollinen; 241fb080 / uusin b2b3eae5), LS2 640eb7b4. Päätoimittajan VIE.
4. **TF**: 154 testaajilla (22.32). Junarytmi tarpeen mukaan.
5. **Rajat**: yöllä 1 simu; swap > 40 Gt tai levy < 40 Gi → ei uusia ajoja.
