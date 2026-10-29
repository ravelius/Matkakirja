# Karttaseppä: luovutus 29.10.2026 klo 18.41

Edellinen luovutus: 13f147592 (viesti-karttaseppa-luovutus-20261029-1535.md, PR 5600 auki). Postivahti pyysi nollausta
(konteksti 31 %). **Taustalla ei ole käynnissä olevia ajoja, palvelimia eikä simulaattoria.** Simulaattori on suljettu, ja
"SIMU VAPAA" on lähetetty.

## Tila kohdittain

1. **Alppien sauma Torinon yllä: KORJATTU, PT on kuitannut, ja osa on viety ämpäriin.**
   - **Syy:** RTIN-virheraja oli z7:llä noin 301 m (virhekerroin 0,5). Monferraton kukkulat jäivät laatassa 7/133/95
     litteiksi, mutta laatassa 7/134/95 niillä on kohokuvio, joten natiivin valossa näkyi pystysauma 8,4375° E.
   - **Korjaus:** tasot 0–9 poltettiin uudelleen virhekertoimella 0,25 sarjaan `julisteet/maasto/2026-10-29-maailma/`.
     Tasot 10–12 ovat ennallaan.
   - **Työkalun kommentti:** PR 5601 (tee-maasto.mjs) on yhdistetty mainiin.
   - **Pari ja mittaus:** `proto-3d/_tyo/karttaseppa/maastosauma-214/pt/RAPORTTI.md`. Ruutuaika ennallaan,
     muisti ennallaan tai pienempi.
   - **Paketti:** `T7 koodaus/proto-3d/_valmiit/maasto-2026-10-29-maailma-vienti-20261029/` (LAHTEET.md, SHA256SUMS).
   - **Ämpäri:** JU vei z0–9 klo 17.01. Pistokokeet 0/0/0, 7/133/95 ja 9/536/383 ovat tavulleen samat kuin paketissa.
   - **Kesken:** JU kopioi z10–12:n ämpärissä sarjasta 2026-10-16-maailma ja vie layer.jsonin viimeisenä.
     JU:n valmis-ilmoitusta ei ollut tullut klo 18.41 mennessä.
2. **Salamasymboli Pariisissa:** PT sulki (omistaja hyväksyi 28.10.).
3. **Elävien nimien kaksoisrivit:** PT sulki.
4. **Karttasaumojen korjaus (SSE):** omistaja sanoi "Kelpaa" klo 17.13 ja pyysi julkaisua klo 17.20, jolloin PT käski
   viemään korjauksen junaan 214 heti.
   - **Pyydetty NS:ltä:** yhdistää `peili/proto/karttaseppa/siirtyma-sse-214` = 5767441da runkoon. Rungossa ei vielä ole
     committeja 8ac9ac545, 0c14f6d80 eikä 5767441da. Merge-tree rungon 26d2971e9 päälle on puhdas, Kartta-testit 574/574.
   - **Viestin tila:** viesti meni NS:lle jonoon. Yhdistämistä ei ole vielä varmistettu: tarkista NS:n juna 214
     (`git branch -r --contains 5767441da` peilissä).
   - **Pienen iPadin mittaus:** tehdään myöhemmin.

## SEURAAVA (järjestyksessä)

1. **Odota JU:n ilmoitusta**, että z10–12 ja layer.json ovat ämpärissä. Älä kysele perään.
2. **Tarkista CDN:** `curl --compressed`, polku
   `https://media.matkakirja.app/julisteet/maasto/2026-10-29-maailma/…`.
   - layer.json: maxzoom 12, ei parentUrl:ia, tiles `{z}/{x}/{y}.terrain?v=2026-10-29-maailma`.
   - Pistokokeet z10, z11 ja z12: purettu verkko sama kuin 2026-10-16-maailmassa.
   - Lisäksi yksi z7-laatta.
3. **Lähetä NS:lle (local_c7344e20-…):** yhdistä maaston osoitin `peili/proto/karttaseppa/maasto-214` = 4486eb40b
   junaan 214.
   - Muutos: vain Pallo.unity:n maastoLayer/_url ja Rakennus.cs:n MaastoUrl → `2026-10-29-maailma/layer.json`.
   - Worktree: `/Users/Shared/Claude/wt/proto-karttaseppa-maasto-214`. Pohja on juna-214 26d2971e9, testit 574/574.
4. **Lähetä PT:lle ≤ 3 riviä:** SSE- ja maastoerä NS:llä, SHA:t mukaan.

## Muistettavaa

- **Paikallinen pari ja mittaus:** `maastosauma-214/palvelin.py` (portti 8790, gzip-otsake .terrain-laatoille),
  `ajo.zsh` ja `ajo-mittaus.zsh`. Natiivin dev-komento on `maasto url <layer.json>`. Nimet pienenevät uudelleenlatauksen
  jälkeen tasolla 6, mutta vain dev-komennolla (kerrottu PT:lle).
- **Polttokansio:** `T7 Matkakirja-karttaseppa/maasto-20261029-virhe025/`. layer-koe.json on vain paria varten,
  sitä ei viedä.
- **PR 5600** (edellinen luovutus) on auki. Sen voi yhdistää tämän kanssa tai sulkea.
