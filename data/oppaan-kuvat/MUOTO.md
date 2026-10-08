# Elävän oppaan kuvalista (Sisältökirjuri, 6.10.2026)

Per kaupunki yksi tiedosto `data/oppaan-kuvat/kaupungit/<kaupunki-id>.json`:

```json
{
  "kaupunki": "pariisi", "kaupunkiQ": "Q90",
  "kohteet": [
    { "q": "Q243", "nimi": "Eiffel-torni", "peruste": "pelin nosto", "lat": 48.858296, "lon": 2.294479,
      "kuvat": [
        { "jarjestys": 1, "tiedosto": "Tour Eiffel Wikimedia Commons.jpg",
          "url": "https://commons.wikimedia.org/wiki/Special:FilePath/Tour_Eiffel_Wikimedia_Commons.jpg?width=1280",
          "tekija": "...", "lisenssi": "CC BY-SA 4.0", "lisenssiUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
          "lahdeUrl": "https://commons.wikimedia.org/wiki/File:Tour_Eiffel_Wikimedia_Commons.jpg",
          "selite": "Yksi virke suomeksi.", "leveys": 2900, "korkeus": 5367, "tarkistettu": true }
      ] }
  ],
  "kaupunginKuvat": [ { "jarjestys": 1, "tiedosto": "...", "...": "kuvakentät kuten kohteilla" } ],
  "jarjestys": ["Q243", "..."],
  "eiKuvaa": [ { "q": "Q...", "nimi": "...", "lat": 0, "lon": 0, "syy": "ei kelvollista kuvaa / kadonnut / rappeutunut" } ]
}
```

- Lukittu kohdelista 6–20 kohdetta kaupungin koon mukaan (omistaja 6.10.): `kohteet` (1–5 kuvaa, järjestys 1 = paras, vaakakuva ensin; suuret maamerkit 4–5, tavalliset 2–3, pienet 1) + `eiKuvaa`, merkittävyysjärjestyksessä. Jokaisella kohteella `peruste`: "pelin nosto" | "UNESCO" (P757) | "sitelinks" (≥ 15 kieliversiota) | "kaupungin päänähtävyys" (Päätoimittajan päätös 7.10.: oikea nähtävyys ilman kielirajaa, ei Wikidata-tarkistusta). Kaupunkikierros käyttää 8–10 ensimmäistä, Liiku kaikkia.
- `nimi` suomeksi, `lat`/`lon` Wikidatan P625:stä (validointi sallii 0,002°).
- Kuvaehdot: PD / CC0 / CC BY / CC BY-SA, leveys ≥ 1 200 px, ei karttaa, logoa, lippua, vaakunaa, pohjapiirrosta eikä vesileimaa.
- `tarkistettu: true` vasta silmätarkistuksen jälkeen (kuvataulu `node tools/oppaan-kuvat.mjs taulu`).
- Validointi: `node tools/oppaan-kuvat.mjs tarkista <id>` (livenä Commonsia ja Wikidataa vasten).

Vientitiedosto `oppaan-kuvat.json` (`node tools/oppaan-kuvat.mjs kokoa`): `{"skeema":1,"versio":"<pvm>","kohteet":{"Q243":{"nimi","kaupunki","kaupunkiQ","lat","lon","kuvat":[{jarjestys,url,tekija,lisenssi,lisenssiUrl,lahdeUrl,selite,leveys,korkeus,tarkistettu}]}}}`.
`ei-kuvaa.json` listaa kohteet ilman kuvaa (Codexille).

Lisäkentät: kohteella valinnaiset `koko_m` (halkaisija metreinä kameraa varten, oletus 150) ja `aliakset` (muut Q-tunnukset). `kaupunginKuvat` 1–2 kuvaa
(kaupungin oma kuva, Pelikoodarin kaupunkipysähdystä varten). `kokoa` kirjoittaa vientitiedostoon `kaupungit.<id> = {nimi, Q, lat, lon, kohteet:[12 Q tärkeysjärjestyksessä], kuvat:[kaupungin kuvat]}`;
kuvakentissä säilyy `tiedosto` (Commonsin tiedostonimi), ja Pelikoodarin vientityökalu peilaa kuvan ja kirjoittaa `url`-kenttään media.matkakirja.app-osoitteen.

Kuvattomat kohteet (eiKuvaa) ovat vientitiedostossa mukana kohteet-osiossa tyhjällä `kuvat`-listalla (koordinaatit ja järjestys säilyvät); lisäksi ei-kuvaa.json Codexille.
