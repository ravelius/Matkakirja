# Elävän oppaan kuvalista (Sisältökirjuri, 6.10.2026)

Per kaupunki yksi tiedosto `data/oppaan-kuvat/kaupungit/<kaupunki-id>.json`:

```json
{
  "kaupunki": "pariisi", "kaupunkiQ": "Q90",
  "kohteet": [
    { "q": "Q243", "nimi": "Eiffel-torni", "lat": 48.858296, "lon": 2.294479,
      "kuvat": [
        { "jarjestys": 1, "tiedosto": "Tour Eiffel Wikimedia Commons.jpg",
          "url": "https://commons.wikimedia.org/wiki/Special:FilePath/Tour_Eiffel_Wikimedia_Commons.jpg?width=1280",
          "tekija": "...", "lisenssi": "CC BY-SA 4.0", "lisenssiUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
          "lahdeUrl": "https://commons.wikimedia.org/wiki/File:Tour_Eiffel_Wikimedia_Commons.jpg",
          "selite": "Yksi virke suomeksi.", "leveys": 2900, "korkeus": 5367, "tarkistettu": true }
      ] }
  ],
  "eiKuvaa": [ { "q": "Q...", "nimi": "...", "lat": 0, "lon": 0, "syy": "ei kelvollista kuvaa / kadonnut / rappeutunut" } ]
}
```

- Lukittu kohdelista on tasan 12: `kohteet` (2–3 kuvaa, järjestys 1 = paras, vaakakuva ensin) + `eiKuvaa` = 12.
- `nimi` suomeksi, `lat`/`lon` Wikidatan P625:stä (validointi sallii 0,002°).
- Kuvaehdot: PD / CC0 / CC BY / CC BY-SA, leveys ≥ 1 200 px, ei karttaa, logoa, lippua, vaakunaa, pohjapiirrosta eikä vesileimaa.
- `tarkistettu: true` vasta silmätarkistuksen jälkeen (kuvataulu `node tools/oppaan-kuvat.mjs taulu`).
- Validointi: `node tools/oppaan-kuvat.mjs tarkista <id>` (livenä Commonsia ja Wikidataa vasten).

Vientitiedosto `oppaan-kuvat.json` (`node tools/oppaan-kuvat.mjs kokoa`): `{"skeema":1,"versio":"<pvm>","kohteet":{"Q243":{"nimi","kaupunki","kaupunkiQ","lat","lon","kuvat":[{jarjestys,url,tekija,lisenssi,lisenssiUrl,lahdeUrl,selite,leveys,korkeus,tarkistettu}]}}}`.
`ei-kuvaa.json` listaa kohteet ilman kuvaa (Codexille).
