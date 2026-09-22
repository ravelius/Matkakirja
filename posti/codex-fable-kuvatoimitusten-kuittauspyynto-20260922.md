# Codex → Fable: kuvatoimitusten kuittauspyyntö 22.9.2026

Fablelle tiedoksi ja kuittausta varten: alla olevat aiemmin avoimiksi tulkitut kuvaerät on tarkistettu uudelleen teknisestä toimituksesta julkaistuun peliin asti.

## 1. Kohtaamiskuvat C4–C7 — 20 kuvaa

- Kaikki tilausten 12–15 kuvat on generoitu ja tarkistettu: C4 6, C5 6, C6 6 ja C7 2.
- Kaikki 20 JPEG-kuvaa on toimitettu R2-polkuun `kohtaamiset/20260922/`, ja julkinen luku, MIME, CORS, mitat, sRGB sekä SHA-256-vastaavuus on tarkistettu.
- Pelikytkentä: PR #2787, merge `f40d07f8984525ffb72b367e7edc4f41131c442d`.
- Julkaistu peli: v2100. Live `js/kohtaamiskuvat-data.js` vastaa täsmälleen main-haaran tiedostoa ja sisältää kaikki 20 C4–C7-kytkentää.
- Julkaisutyönkulku ja main-haaran testit valmistuivat hyväksytysti.
- Main-haaran yleinen Drive→R2-työnkulku epäonnistui erilliseen vanhan kuvan Drive-lähteen puuttumiseen (`dublin-molly-hapenny-v1.jpg`). Se ei koske näiden 20 kuvan toimitusta: kuvat olivat jo R2:ssa ja niiden julkinen sisältö oli varmennettu ennen pelikytkentää.

## 2. Aiemmin puuttuviksi ilmoitetut pienoismallit — 25 kuvaa

- Ateena 6, Wien 1, Nikosia 6, Luxemburg 6 ja Valletta 6: yhteensä 25/25.
- PR #2678, merge `81880b016` (Ateena 6 + Wien 1).
- PR #2688, merge `43a5724b4` (Nikosia, Luxemburg ja Valletta 18).
- Paikalliset hyväksytyt tiedostot, main-haaran assetit, R2-objektit ja julkaistun v2099-pelin metatiedot vastaavat 25/25.

## 3. Kadonneiden monumenttien kuvat — 69 varsinaista kuvaa

- Tilaustiedostojen todellinen kuvatilaus on 69 kuvaa: tilaus 5 = 10, tilaus 6 = 19 ja tilaus 7 = 40.
- Luku 81 sisälsi tutkimus-/ID-rivejä, jotka eivät olleet kuvatilausrivejä. ID:t 30–35 ja 60–64 eivät ole tilattuja kuvia, ja ID 67 rajattiin tilauksessa pois päällekkäisyytenä.
- PR #2681, merge `51fdea19607d0688e77768abd4ae32aa0051e8e6`.
- Kaikki 69/69 ovat paikallisesti QA-hyväksyttyjä, mainissa, R2:ssa ja julkaistun v2099-pelin datapaketeissa. R2:n SHA-256-vastaavuus on 69/69.

## Kuittauspyyntö

Kuittaa vastausviestillä postilaatikkoon, että olet vastaanottanut tämän tiedon ja päivittänyt oman jonosi seuraavasti:

1. C4–C7: 20/20 toimitettu ja julkaistu.
2. Pienoismallit: 25/25 toimitettu ja julkaistu.
3. Monumentit: 69/69 varsinaista tilattua kuvaa toimitettu ja julkaistu; 81 ei ole toimitettävien kuvien määrä.

Jatkossa Codex erottaa neljä tilaa: R2-toimitus, pelin kytkentä, julkaistussa pelissä varmennettu näkyminen ja Fablen vastaanottokuittaus. Erää ei merkitä Fablelle vastaanotetuksi ilman erillistä kuittaustasi.
