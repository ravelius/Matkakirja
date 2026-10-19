# Historiaosioiden kuvat (Sisältökirjuri 15.10.2026, PT:n erä)

Tehtävä: jokaiselle kaupungin historiaosiolle 1–2 Commons-kuvaa kuten Pariisille ja Tukholmalle (ref/pariisi.json, ref/tukholma.json = valmiit mallit; lue ne ensin).
Osiot ja tekstit: ref/<kaupunki>-historia.json (osiot[].tunnus, otsikko, teksti). Historia soi lennon ajan, ja kuva ilmestyy ruudulle, kun ANKKURI-fraasi kuullaan.

## Säännöt
- Lisenssi vain PD, CC0, CC BY tai CC BY-SA (kuva.py haku merkitsee OK/EI; EI = ei käyttöön, ei NC/ND). BY-SA: tekijä mainitaan kuten CC BY, ja muokattu (rajattu) kuva pidetään samalla lisenssillä. Ei vesileimoja, ei logoja, ei kuvia, joissa pääasia on ihminen lähikuvassa (yksityisyys), ei Wikipedian karttaikoneita.
- Kuvan on esitettävä juuri sitä, mistä teksti sillä hetkellä puhuu (kuva–teksti-osuma); vanhat piirrokset, kaiverrukset ja maalaukset (PD) ovat parhaita historiaosioon. Jos osiolle ei löydy kelvollista, 1 kuva tai 0 kuvaa kelpaa — älä arvaa.
- Enintään 2 kuvaa per osio; sama kuva ei kahdesti. Ankkuri = tarkka, yksiselitteinen fraasi osion tekstistä (3–6 sanaa, kopioi merkki merkiltä, ääkköset ja välimerkit mukaan lukien). Kahden kuvan ankkureiden väli vähintään 15 sanaa; ensimmäinen ankkuri ei ole aivan tekstin alussa (kuva ilmestyy, kun asia sanotaan) ja ankkuri osuu kohtaan, josta kuva kertoo.
- `rajaus` [x0,y0,x1,y1] suhteina 0–1 vain jos kuvassa on tyhjää tai häiriötä reunoilla (esim. kehys, kuvateksti, tausta); muuten jätä pois. Kuvan pitkä sivu saa olla vaaka tai pysty.
- Kuvateksti suomeksi, ≤ 70 merkkiä, kuvaa sen mitä kuvassa on (ei pidempiä väitteitä kuin Commons-sivu tukee).
- Faktat: kuvatekstin vuosiluku/nimi vain jos Commonsin kuvaus tukee sitä. Jos kuva–teksti-osuma on epävarma, kerro perustelussa.

## Työkalut (aja aina `python3 -I /Users/Shared/Claude/proto-3d/_tyo/sisaltokirjuri/historiakuvat-20261015/kuva.py ...`, ei cd, ei &&)
- `haku "<englanninkielinen kysely>"` — Commons-haku (25 osumaa); kokeile useita kyselyjä (aihe + paikka + aika).
- `esikatsele "File:Nimi.jpg"` — tallentaa 800 px esikatselun hakemistoon esikatselu/; AVAA se Read-työkalulla ja katso kuva oikeasti ennen valintaa.
- `rakenna <kaupunki>` — lukee <kaupunki>/ehdotus.json, validoi ankkurit ja lisenssit, lataa ja rajaa kuvat ja kirjoittaa <kaupunki>/<kaupunki>-historia-yksityiskohdat.json + <kaupunki>/kuvat/. Korjaa VIRHE-rivit ja aja uudelleen, kunnes tulee "kirjoitettu N kuvaa".
Verkkoon vain näillä työkaluilla (tauko 1 s per pyyntö on sisäänrakennettu). Älä poista tiedostoja. Kirjoita ehdotus.json kerralla Write-työkalulla (lista) tiedostoon <kaupunki>/ehdotus.json:
`[{"kohde_id":"praha-historia-kaarle-iv","ankkuri":"...","commons_tiedosto":"File:...","kuvateksti":"...","rajaus":[0,0,1,0.9],"perustelu":"Katsoin esikatselun: ... (mitä kuvassa on ja miksi se osuu ankkuriin)"}, ...]`
Perustelu: oikeasti katsotun esikatselun kuvaus (kuten ref-malleissa).
