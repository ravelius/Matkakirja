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
