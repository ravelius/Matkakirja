# Lähteet ja jäljitettävyys

- Tilaus: `context/TILAUS-24j-opera-tripo.md` (SHA256 `b08422c0d83ae7c0fd13998fb42b62517cc360d82073320421a5f3520eb74e9c`).
- Intake: `context/intake.json`; omistajan hyväksyntä ja jono ovat sen mukaiset. Lähdekuvat on tilauksen mukaisesti varmennettu ennen generointia; diagnostinen paketti ei kopioi niitä uudelleen.
- Syötemanifesti: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/opera-24j-20261105/sources/tripo-syote/SHA256SUMS`.
- Lähdekuvat: `etela.png` SHA256 `233730947f39ba510ed17c2c0384ac1378a083ccb516b3c6dfd6ac7e3e87bdca`; `pohjoinen.png` `3df2bc457ebf64f891e1547c44b316250e3151d499b6ca3c72ee286897053a76`; `lansi.png` `76b44720888186ed89e84e96bda3ee738924e6df3b92158db78089ac762c52d6`; `lansi-peilattu.png` `804dd10a837c7c5b5092bd3c6f6784b5671f0e0ceaaf8a4d66125eefcc3b2acf`.
- Raakamallit: `work/attempt01-raw.glb` ja `work/attempt02-raw.glb`, kopioitu työtilan `output/opera-24j-20261105/work/`-tiedostoista. SHA:t löytyvät mukana olevasta `SHA256SUMS`-tiedostosta.
- Seitsemän ortoesikatselua kummastakin otosta ja alkuperäiset numeeriset QA JSONit on kopioitu `previews/` ja `qa/`-kansioihin. Otto 1:n shape-gate on `qa/attempt01-shape-gate.json`.
- Ottojen mitat ja UV-luvut ovat attempt-kohtaisissa QA JSONeissa; tämän paketin `huomiot.md` kokoaa oleelliset vertailut.
- Ei vanhoja malleja, review-sarjan sivukuvia tai kuvamuunnoksia käytetty diagnostisten mittausten lähteenä.
