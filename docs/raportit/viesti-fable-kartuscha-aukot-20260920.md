# Maalehden kartuschan aukot: juurisyy ja mittaus (Sonnet 2, 20.9.2026)

Haara `sonnet-kartuscha-aukot` (pohja origin/v1973-prep). Koodia ei ole muutettu; muutokset ovat sisältöä (`js/packs/maa-kategoriat.js`, `js/packs/europe-maatiedot.js`, `js/packs/historian-hetket.js`) ja generaattorin (`tools/paivita-hetkisivut.mjs`) yksi rivi.

## Juurisyy

Kartuschan rivit tulevat funktiosta `maanAiheet(iso)` (js/pallolauta/maapaneeli.js), joka lukee `MAA_KATEGORIAT[iso]`:n (js/packs/maa-kategoriat.js) ja näyttää jokaisen aiheen `nimi`-kentän. Koodissa ei ole rajausta eikä kovakoodattuja otsikoita (paitsi Tavat piiloutuu, kun maalla on Arki). Vika oli sisällössä kahdella tavalla:

1. **Aiheita ei ollut lainkaan**: BEL, LUX, MLT, SVK ja SVN (sekä ALB, AND, BLR, MDA, MKD, MNE, SRB ja XKX) eivät olleet MAA_KATEGORIAT-taulussa, joten kartuschaan jäi vain 1873-lohkon VALTIOMUOTO-rivi.
2. **Sama nimi toistui**: kaikki historian hetki -aiheet kirjoitetaan generaattorilla tools/paivita-hetkisivut.mjs, joka kovakoodasi kaikille `nimi: 'Historian hetki'`. GBR:llä hetkiä on 4, DEU:lla 3, EGY:llä 2 ja USA:lla 3, joten rivi toistui.

Seitsemän kategoriaa ei "näkynyt" GBR:llä, koska GBR:n aiheet ovat Historia, Kuvataide, Kirjallisuus, Musiikki, Ruoka, Tiede, Huumori, Urheilu, Luonto, Soittajat, hetket ja Menovinkit: Arki ja Keksinnöt puuttuvat (maalla on omat aiheensa, ei Ranskan seitsemän vakiota). Sisältövika sekin, ei koodivika.

## Korjaukset

- **Hetkien omat nimet** (yleisnimi, jotta `tests/maa-otsikot.test.mjs` pysyy vihreänä): historian-hetket.js-pakkiin uusi valinnainen `aihe`-kenttä ja generaattoriin `nimi: hetki.aihe ?? 'Historian hetki'`; sivun `otsikko` (Historian hetki: Endeavour 1768) ei muutu. GBR: Löytöretki, Haaksirikko, Valon tutkimus, Rokotus; DEU: Röntgenkuva, Kirjapaino, Uskonpuhdistus; EGY: Kirjoitus, Kanava; USA: Lento, Salama, Sähkövalo.
- **Maatiedot** BEL, LUX, MLT, SVK, SVN (`europe-maatiedot.js`; `tests/maatiedot.test.mjs` vaatii sen jokaiselle maalle, jolla on maalehti): World Bank (väkiluku 2024, pinta-ala 2022, keskitulo tuoreimman mukaan), V-Dem 2025, sijat samalla menetelmällä kuin NLD:llä (NLD-rivi toistui tarkasti), tervehdykset Wiktionary-yhteensopivina, liput Commonsista tarkistettu.
- **Maalehden aiheet** BEL, LUX, MLT, SVK, SVN: viisi eri aihetta × 4 nostoa jokaiselle maalle (100 nostoa), jokaisella aiheella visa; kuvat Commonsista (PD/CC0/CC BY/CC BY-SA, ≥ 1200 px, katsottu silmällä), faktat en-Wikipediasta.

## Mittaustaulukko (kaikki 43 Euroopan maata)

| Maa | Aiheita ennen | Erinimisiä ennen | Aiheita nyt | Erinimisiä nyt |
|---|---|---|---|---|
| ALB | 0 | 0 | 0 | 0 | alle 5
| AND | 0 | 0 | 0 | 0 | alle 5
| AUT (EU) | 6 | 6 | 6 | 6 |
| BEL (EU) | 0 | 0 | 5 | 5 |
| BGR (EU) | 2 | 2 | 2 | 2 | alle 5
| BIH | 2 | 2 | 2 | 2 | alle 5
| BLR | 0 | 0 | 0 | 0 | alle 5
| CHE | 5 | 5 | 5 | 5 |
| CYP (EU) | 5 | 5 | 5 | 5 |
| CZE (EU) | 6 | 6 | 6 | 6 |
| DEU (EU) | 11 | 9 | 11 | 11 |
| DNK (EU) | 4 | 4 | 4 | 4 | alle 5
| ESP (EU) | 8 | 8 | 8 | 8 |
| EST (EU) | 2 | 2 | 2 | 2 | alle 5
| FIN (EU) | 3 | 3 | 3 | 3 | alle 5
| FRA (EU) | 7 | 7 | 7 | 7 |
| GBR | 15 | 12 | 15 | 15 |
| GRC (EU) | 6 | 6 | 6 | 6 |
| HRV (EU) | 3 | 3 | 3 | 3 | alle 5
| HUN (EU) | 6 | 6 | 6 | 6 |
| IRL (EU) | 6 | 6 | 6 | 6 |
| ISL | 4 | 4 | 4 | 4 | alle 5
| ITA (EU) | 8 | 8 | 8 | 8 |
| LTU (EU) | 3 | 3 | 3 | 3 | alle 5
| LUX (EU) | 0 | 0 | 5 | 5 |
| LVA (EU) | 3 | 3 | 3 | 3 | alle 5
| MDA | 0 | 0 | 0 | 0 | alle 5
| MKD | 0 | 0 | 0 | 0 | alle 5
| MLT (EU) | 0 | 0 | 5 | 5 |
| MNE | 0 | 0 | 0 | 0 | alle 5
| NLD (EU) | 6 | 6 | 6 | 6 |
| NOR | 5 | 5 | 5 | 5 |
| POL (EU) | 3 | 3 | 3 | 3 | alle 5
| PRT (EU) | 6 | 6 | 6 | 6 |
| ROU (EU) | 2 | 2 | 2 | 2 | alle 5
| RUS | 3 | 3 | 3 | 3 | alle 5
| SRB | 0 | 0 | 0 | 0 | alle 5
| SVK (EU) | 0 | 0 | 5 | 5 |
| SVN (EU) | 0 | 0 | 5 | 5 |
| SWE (EU) | 8 | 8 | 8 | 8 |
| TUR | 7 | 7 | 7 | 7 |
| UKR | 3 | 3 | 3 | 3 | alle 5
| XKX | 0 | 0 | 0 | 0 | alle 5

**EU-maat, joilla on nyt alle 5 erinimistä riviä:** BGR 2, DNK 4, EST 2, FIN 3, HRV 3, LTU 3, LVA 3, POL 3, ROU 2. (Fablen sopimus: vain BEL, LUX, MLT, SVK ja SVN tässä erässä; loput jonoon.) Ei-EU-maat ilman aiheita: ALB, AND, BLR, MDA, MKD, MNE, SRB, XKX.

## Testit

`node --test tests/*.test.mjs`: 3741 testiä, 3728 läpi, 0 kaatunut, 13 ohitettu.
