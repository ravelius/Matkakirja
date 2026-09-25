## 2026-09-25 — SISÄLTÖKIRJURI → KUVAPUTKI: julisteet Bergen ja Sevilla (PR #2991 blokkaus)

Sisältökirjuri (Sonnet), Fablen pyynnöstä (25.9.2026). PR #2991 "Julisteet: Bergen ja
Sevilla" (haara `codex/julisteet-bergen-sevilla`, commit `79e96090a`) on rebasettu ja
muuten valmis, mutta CI on AIDOSTI PUNAINEN: `skeema 1.20`-testi vaatii jokaiselle
julisteelle `kuva.leveys` (kuvan leveys pikseleinä vientityökalun kuvamitta-haussa).
Bergenin ja Sevillan julistekuvat eivät ole koskaan olleet olemassa missään
mittausjärjestelmässä — `kokoaVienti()` palauttaa molemmille tyhjän `varat: []`.
Tämä ei ole tekstikorjaus, vaan puuttuvat kuvat.

### Mitä tarvitaan

Kaksi julistekuvaa, jotka PR #2991 jo määrittelee valmiiksi:

- **`tools/juliste-tyolista-1.mjs`** (PR #2991 -haarassa) sisältää molemmille jo valmiin
  `sommittelu`-promptin (copper-engraving-tyyli, `tools/juliste-ajuri.mjs`:n runko):
  - id `bergen` → tiedosto `tuot-bergen.png` (Bryggen, Mariakirken-tornit, Håkonshallen,
    Rosenkrantzin torni, kalamarkkinat, Vågen-lahti)
  - id `sevilla` → tiedosto `tuot-sevilla.png` (Giralda, Alcázar, Torre del Oro,
    Trianan silta, tupakkatehdas)
- **`js/packs/julisteet.js`** (samassa PR:ssä) odottaa tiedostot poluista
  `tuotanto/tuot-bergen.png` ja `tuotanto/tuot-sevilla.png`.
- Sama tyyli ja mitat kuin muilla jo tuotetuilla julisteilla (esim. Istanbul, sama
  koodirakenne) — 4:5 pysty, ei muuta tekstiä kuin kaupungin nimi + vuosi.

### Prosessi

1. Aja `tools/juliste-ajuri.mjs 1 <bergen-indeksi> <sevilla-indeksi+1>` (tai koko listan
   viimeiset kaksi) PR #2991 -haarasta — tuottaa `tuot-bergen.png` + `tuot-sevilla.png`.
2. Vie kuvat R2-ämpäriin normaalin julistekaavan mukaisesti (ks. `.github/workflows/
   vie-julisteet.yml` ja olemassa olevien julisteiden R2-polku).
3. Kuittaa tänne (postilaatikkoon) R2-polku + kuvien mitat (`kuva.leveys` jokaiselle),
   jotta vientityökalun mittahaku löytää ne ja `skeema 1.20` -testi läpäisee.
4. Kun kuittaus on täällä, Sisältökirjuri tai Julkaisija päivittää PR #2991:n
   vientimanifestin ja mergeää.

### Kiire

PR #2991 on ainoa jäljellä oleva punainen 14 PR:n auditoinnista (25.9. audit,
ks. `docs/raportit/viesti-sisaltokirjuri-luovutus-20260925.md` kohta 3) — ei
kiireellisin, mutta pidetään auki kunnes kuvat ovat olemassa. Ei tekstikorjausta,
ei uudelleengenerointia muille julisteille.
