# Laatta-ajot 25 maalle: ajoraportti (2026-09-14)

Tilaus: Fable, viesti-fable-laattapolku-20260914.md-jatko. FRA ja AUT oli jo
ajettu ja varmennettu ennen tätä erää (versio `2026-09-14-tasoitus`).
Tässä raportissa ajetut 25 maata `.github/workflows/generoi-varitaso.yml`
-työnkululla PERÄKKÄIN (ei rinnakkain — pyramidi.json on yhteinen luettelo).

Inputit joka maalle (vain `maa` vaihtuu):
`paletti=tasoitus peitto=0.85 variversio=2026-09-14-tasoitus tasot=4-8
laatikko_nakyma=true korkeus=1 kuiva=false vie=true ref=main`

Tarkistus jokaisen ajon jälkeen:
`curl -sS https://media.matkakirja.app/julisteet/pyramidi/pyramidi.json`
→ vaaditaan `"versio": "2026-09-14-tasoitus"` JA `"maaPolussa": true` maan
kirjauksessa.

## Tulokset

| # | Maa | Ajon ID | Tila | Versio kirjauksessa | maaPolassa |
|---|-----|---------|------|----------------------|------------|
| 1 | BGR | 34801820758 | success | 2026-09-14-tasoitus | true |
| 2 | BIH | 34801941355 | success | 2026-09-14-tasoitus | true |
| 3 | CHE | 34802060183 | success | 2026-09-14-tasoitus | true |
| 4 | CZE | 34802162958 | success | 2026-09-14-tasoitus | true |
| 5 | DEU | 34802268527 | success | 2026-09-14-tasoitus | true |
| 6 | DNK | 34802412698 | success | 2026-09-14-tasoitus | true |
| 7 | ESP | 34802536771 | success | 2026-09-14-tasoitus | true |
| 8 | EST | 34802677063 | success | 2026-09-14-tasoitus | true |
| 9 | FIN | 34802773668 | success | 2026-09-14-tasoitus | true |
| 10 | GBR | 34802981342 | success | 2026-09-14-tasoitus | true |
| 11 | GRC | 34803149164 | success | 2026-09-14-tasoitus | true |
| 12 | HRV | 34803273145 | success | 2026-09-14-tasoitus | true |
| 13 | HUN | 34803390056 | success | 2026-09-14-tasoitus | true |
| 14 | IRL | 34803511901 | success | 2026-09-14-tasoitus | true |
| 15 | ITA | 34803610669 | success | 2026-09-14-tasoitus | true |
| 16 | LTU | 34803776066 | success | 2026-09-14-tasoitus | true |
| 17 | LVA | 34803897447 | success | 2026-09-14-tasoitus | true |
| 18 | NLD | 34804015482 | success | 2026-09-14-tasoitus | true |
