# e11 — alkuperäinen sääpoiminta

Päivitetty 2026-10-11T21:37:12.005088+00:00

Alkuperäinen `tyokalu.mjs saa e11` ajettiin muuttamatta numeropoimintaa tai tarkistusalgoritmia. Estettyjen rajapintareittien sijasta käytettiin omistajan hyväksymiä alkuperäisiä robots-sallittuja Wikipedia-lähdesivuja ja muuttumatonta yhteistä lähdesovitusta. Kaupunkien en-Wiki-artikkelit varmennettiin niiden Wikidata-entiteeteistä; maa-fallbackia ei käytetty. Kaikki tuotanto/väliaineisto NASilla.

Poiminta 7/9 kaupunkia. Tämä on vaiheen 0 valmistelu: lähdeviitteiden todellinen normaalikausi, asema ja mahdolliset eri sarjat tarkistetaan vielä A/C/D:ssä ennen lukujen käyttöä pelaajatekstissä. Poimintaa ei lasketa valmiiksi A–F-vaiheeksi. Alkuperäinen loki: `valiaikainen/e11/saa/alkuperainen-saa-ajo.txt`. Ei käsin korjattuja numeroita eikä hylättyjen rivien palautusta.

| id | kausi | alkuperäinen taulukon otsikko | tila/rajaukset |
|---|---|---|---|
| washington | null | — | Poimija ei tunnista otsikon U+2212-erotinta (1991−2020), vaikka kausi näkyy otsikossa; ei käsin täytettyä sääriviä. |
| ottawa | 1991–2020 | Climate data for Ottawa International Airport, 1991–2020 normals, extremes 1938–present | poimittu; alkuperäislähteiden kausi/asema vielä auditoitava |
| belmopan | 1991–2020 | Climate data for Belmopan (1991–2020) | poimittu; alkuperäislähteiden kausi/asema vielä auditoitava |
| sansalvador | 1991–2020 | Climate data for San Salvador (Ilopango International Airport) 1991–2020, extremes 1957–present | poimittu; alkuperäislähteiden kausi/asema vielä auditoitava |
| tegucigalpa | 1991–2020 | Climate data for Tegucigalpa (Tegucigalpa Airport) 1991–2020, extremes 1951–present | poimittu; alkuperäislähteiden kausi/asema vielä auditoitava |
| sanjose | null | — | Otsikosta ei löytynyt poimijan hyväksymää normaalikautta; ei arvattua vuosiväliä. |
| santodomingo | 1991–2020 | Climate data for Santo Domingo (1991–2020, extremes 1909–present) | poimittu; alkuperäislähteiden kausi/asema vielä auditoitava |
| portauprince | 1991–2020 | Climate data for Port-au-Prince (1991-2020) | poimittu; alkuperäislähteiden kausi/asema vielä auditoitava |
| kingston | 1991–2020 | Climate data for Kingston, Jamaica (Norman Manley International Airport) 1991–2020, extremes 1852–present | poimittu; alkuperäislähteiden kausi/asema vielä auditoitava |

## Alkuperäisen ajon loki

```text
EI SÄÄRIVIÄ washington: Washington, D.C.: "Climate data for Washington, D.C. (Reagan National Airport), 1991−2020 normals, extremes 1872−present": otsikossa ei normaalikautta (vuosiväliä ei arvata) · Washington, D.C.: "Climate data for Washington, D.C. (Reagan National Airport), 1991−2020 normals, extremes 1872−present": otsikossa ei normaalikautta (vuosiväliä ei arvata) → saatiedot: null ja syy TILANNE.md:hen (tai saa-syote.json: "artikkeli"/"taulukko")
ottawa: Climate data for Ottawa International Airport, 1991–2020 normals, extremes 1938–present [Ottawa] → kausi 1991–2020, keskilämpö -10…21.2 °C, vuosisade 930 mm
belmopan: Climate data for Belmopan (1991–2020) [Belmopan] → kausi 1991–2020, keskilämpö 23.7…28.6 °C, vuosisade 1929 mm · HUOM: sade = vain vesisade (Average rainfall)
sansalvador: Climate data for San Salvador (Ilopango International Airport) 1991–2020, extremes 1957–present [San Salvador] → kausi 1991–2020, keskilämpö 23.1…25.4 °C, vuosisade 1783 mm · HUOM: sade = vain vesisade (Average rainfall)
tegucigalpa: Climate data for Tegucigalpa (Tegucigalpa Airport) 1991–2020, extremes 1951–present [Tegucigalpa] → kausi 1991–2020, keskilämpö 19.7…24.4 °C, vuosisade 819 mm
EI SÄÄRIVIÄ sanjose: San José, Costa Rica: "Climate data for San José (Juan Santamaría International Airport)": otsikossa ei normaalikautta (vuosiväliä ei arvata) · San José, Costa Rica: "Climate data for San José (Juan Santamaría International Airport)": otsikossa ei normaalikautta (vuosiväliä ei arvata) → saatiedot: null ja syy TILANNE.md:hen (tai saa-syote.json: "artikkeli"/"taulukko")
santodomingo: Climate data for Santo Domingo (1991–2020, extremes 1909–present) [Santo Domingo] → kausi 1991–2020, keskilämpö 25.6…28.3 °C, vuosisade 1483 mm
portauprince: Climate data for Port-au-Prince (1991-2020) [Port-au-Prince] → kausi 1991–2020, keskilämpö 25.6…28.9 °C, vuosisade 1295 mm · HUOM: sade = vain vesisade (Average rainfall)
kingston: Climate data for Kingston, Jamaica (Norman Manley International Airport) 1991–2020, extremes 1852–present [Kingston, Jamaica] → kausi 1991–2020, keskilämpö 26.6…29.4 °C, vuosisade 875 mm
7/9 säärivia → e11/<id>/saa.json (saatiedot = saa.json ilman tausta-kenttää + luonnehdinta)
```
