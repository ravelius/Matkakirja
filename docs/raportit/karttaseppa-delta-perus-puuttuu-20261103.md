# Pelin pallopohjan delta-perus puuttuu CDN:stä (Karttaseppä 3.11.2026 klo 06.55)

## Havainto
- Pelissä olevat `julisteet/pallo/laatat/2026-10-26-pohja-20261027` (juna 214) ja `2026-11-03-pohja-valitaso` ovat
  DELTASARJOJA: laatat.json `delta.perus = 2026-09-30-pohja-20261015`; ämpärissä vain muuttuneet palat
  (27.10.: z0–z5 kokonaan, z6 1809/4096, z7 5757/16384, z8 19438/65536, z9 68256/262144 …).
- Cloudflare-säästöpaketti (docs/raportit/cloudflare-kayttamattomat-20261031.md rivi 29) poisti perussarjan
  `2026-09-30-pohja-20261015` (6,85 Gt) "natiivin edellinen pohja" -merkinnällä.
- Tarkistus curlilla (User-Agent) 06.5x: perus 0/0/0, 5/17/9, 6/35/19 → 404; muuttumaton valtamerilaatta
  (esim. 6/2/30, 7/5/60, 8/10/120) → 404 perussa, tasankosarjassa ja välitasossa. Muuttuneet → 200.
- Siis pelissä muuttumattomat palat z6–z10 eivät lataudu (natiivi joko näyttää karkeamman tason tai tyhjää).

## Korjaus (ehdotus, JU)
Perussarja on tallessa: `/Volumes/T7 4TB/Matkakirja-karttaseppa/ruudukko-20261015/pohja` (9,1 Gt; purku q95 4:4:4,
sama josta 2026-09-30-pohja-20261015 vietiin 15.10.). Vienti takaisin samaan osoitteeseen palauttaa delta-ketjun:
  aws s3 sync "/Volumes/T7 4TB/Matkakirja-karttaseppa/ruudukko-20261015/pohja/" s3://$AMPARI/julisteet/pallo/laatat/2026-09-30-pohja-20261015/ --endpoint-url $PAATE --cache-control "public, max-age=31536000, immutable"
(JU varmistaa ensin, että kansio vastaa 15.10. vientiä: laatat.json ja tiedostomäärä; delta/perus-20261015.json.gz
tasangot-poltto-20261027:ssa on perussarjan tiivisteet vertailuun: `node tools/vie-delta.mjs tiivisteet`.)

## Vaikutus tasankopolttoon (2026-11-03)
Uusi pohja viedään joko deltana samaa perusta vasten (vaatii perusan palautuksen) tai täytenä sarjana (~9 Gt).
