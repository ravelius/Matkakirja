# Laudan 163 kaupungin lat/lon-ehdotukset (Siirtoseppä 23.9.2026)

Fablen tilaus 23.9.2026: tuota ehdotetut koordinaatit lähteineen niille
maailmankartan kaupungeille, joilla ei ole pallopistettä
(`PALLON_KAUPUNKIPISTEET`, `js/packs/maailmankartta-pallopisteet.js`).
Sisältökirjuri tarkistaa ja kirjaa. Aineisto on tiedostossa
[kaupunkien-latlon-20260923.tsv](kaupunkien-latlon-20260923.tsv), yksi
rivi per kaupunki (163).

## Menetelmä

Lähde on sama kuin nykyisissä pallopisteissä, eli
`tools/tarkista-laudan-pisteet.mjs`: kaupungin `wiki`-kenttä
(fi-Wikipedia) → Wikidata-kohde → `wdt:P625`. Yhdeksällä kaupungilla
fi-Wikipedian nimeä ei löydy, joten ne haettiin en-Wikipedian nimellä, ja
Bahr el Ghazal Wikidatan haulla (Q803639). Laudan piste on
`laudaltaAsteiksi('maailmankartta', x, y)`, ja poikkeama on isoympyrän
etäisyys. Koordinaatit on pyöristetty kolmeen desimaaliin (~100 m), kuten
taulussa.

## Luokat

| Luokka | Kpl | Ehdotus |
|---|---|---|
| `piste` | 125 | Wikidatan P625. Asutus tai pistemäinen kohde (Grand Canyon, Iguazú, Kap Horn, Yellowstone…). 122 on alle 15 km laudan pisteestä (poikkeukset Gao, Exmouth ja Salala), joten pallolla ne siirtyvät vain vähän. |
| `alue` | 33 | **Laudan piste**, koska se on laudan tarkoittama kohta. Wikidatan keskipiste on lähdesarakkeessa viitteeksi. Linjaus 7.9.2026: alueita ei siirretä pallolla. Jos ne kirjataan tauluun laudan pisteellä, pallo ei muutu, mutta vienti saa pisteen. |
| `tarkistettava` | 2 | Kap Palmas ja Ras Hafun ovat niemiä eli pistemäisiä kohteita. Kap Palmas oli 7.9. listattu alueeksi. Wikidatan piste on 86–97 km laudan pisteestä. |
| `tarina` | 3 | Mosambik, Orjarannikko ja Kamerun. Laudan nimi ja wiki-sivu tarkoittavat eri asiaa, joten nämä ratkaisee Fable. Ehdotuksena on laudan piste. |

## Huomiot Fablelle ja Karttasepälle

1. **Gao (374 km) ja Exmouth (89 km)** ovat asutuksia, jotka ovat pallolla
   kaukana oikeasta paikasta. Vartio ei ole huomannut niitä, koska niiden
   `wiki`-arvo ei löydy fi-Wikipediasta. Gaon laudan piste (14,56° N,
   2,95° E) on lähempänä Niameytä kuin Gaota (16,27° N, 0,05° W).
   Pallopiste korjaa pallon, mutta tasolaudan paikka on laudan asia.
2. **Yhdeksän `wiki`-kenttää ei osu fi-Wikipediaan**: gao, kappalmas,
   viktoria, bahrelghazal, rashafun, sanambrosio, birdsville, exmouth ja
   cooberpedy. Niiden takia `tools/tarkista-laudan-pisteet.mjs` ei mittaa
   näitä kaupunkeja lainkaan. Korjaus: kentän arvoksi olemassa oleva
   fi-sivu, tai työkaluun en-varareitti.
3. Salala on täsmälleen 15 km:n rajalla. Sisilian (100 km) ja Kreetan
   (37 km) Wikidata-piste on saaren keskipiste. Ne on luokiteltu alueiksi
   kuten 7.9.
