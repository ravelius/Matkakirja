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

## Fablen päätökset 23.9.2026

1. **Mosambik, Orjarannikko ja Kamerun:** koordinaatti annetaan laudan
   (1873) merkityksen mukaan, ei wiki-sivun. Mosambik on Ilha de
   Moçambique, eli kaupunkisaari (Q331099; pallolla siirtyy 823 km).
   Orjarannikko on alue, joten sille käytetään laudan pistettä
   (Ouidah–Lagosin rannikko). Kamerun on Kamerun-joen suisto eli Douala
   (Q132830). Wiki-kenttä korjataan osoittamaan samaan kohteeseen, ja
   Sisältökirjuri tarkistaa tarinatekstistä, että merkitys täsmää.
2. **Kap Palmas ja Ras Hafun:** niemet ovat pistemäisiä, joten niille
   käytetään niemen kärjen pistettä. Syyskuun 7. päivän (7.9.) alue-sääntö ei
   koske niemiä.
3. **Gao ja Exmouth:** pallopiste korjataan tässä erässä. Gaon
   laudan piste ilmoitetaan Karttasepälle erikseen.
4. **Vartio** (`tools/tarkista-laudan-pisteet.mjs`) ilmoittaa nyt
   wiki-kentät, joita ei löydy fi-Wikipediasta, ja fi-sivut, joilla ei
   ole koordinaattia (täsmennyssivut). Kummastakin seuraa koodi 1.
   Fi-sivuttomat mitataan samannimisen en-artikkelin kautta. Wiki-kenttää
   ei voi vaihtaa en-nimeksi, koska peli käyttää sitä artikkelien
   avaimena. Nykytila: 9 fi-sivutonta (mukana `murzuk`, jolla on jo
   pallopiste; sen fi-artikkeli on "Murzuq") ja 1 täsmennyssivu (`gao`:
   "Gao" → "Gao (kaupunki)"). Victoria-järven ja Bahr el Ghazalin nimiä
   ei löydy en-Wikipediastakaan. Victoria-järven fi-artikkeli on
   "Victorianjärvi".

## Luokat

| Luokka | Kpl | Ehdotus |
|---|---|---|
| `piste` | 129 | Wikidatan P625. Asutus tai pistemäinen kohde (Grand Canyon, Iguazú, Kap Horn, Yellowstone…). 122 on alle 15 km laudan pisteestä (poikkeukset Gao, Exmouth, Salala sekä päätösten 1–2 Mosambik, Kamerun, Kap Palmas ja Ras Hafun), joten pallolla ne siirtyvät vain vähän. |
| `alue` | 34 | **Laudan piste**, koska se on laudan tarkoittama kohta. Wikidatan keskipiste on lähdesarakkeessa viitteeksi. Linjaus 7.9.2026: alueita ei siirretä pallolla. Jos ne kirjataan tauluun laudan pisteellä, pallo ei muutu, mutta vienti saa pisteen. |

Luokkiin `piste` ja `alue` on jo sisällytetty päätösten 1–2 kohteet:
Mosambik, Kamerun, Kap Palmas ja Ras Hafun kuuluvat pisteisiin,
Orjarannikko alueisiin. Alkuperäisessä versiossa ne olivat luokissa
`tarkistettava` ja `tarina`.

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
