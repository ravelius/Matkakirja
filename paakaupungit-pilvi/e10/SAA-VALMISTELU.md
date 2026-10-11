# e10 — alkuperäinen sääpoiminta

Päivitetty 2026-10-11T21:37:12.005088+00:00

Alkuperäinen `tyokalu.mjs saa e10` ajettiin muuttamatta numeropoimintaa tai tarkistusalgoritmia. Estettyjen rajapintareittien sijasta käytettiin omistajan hyväksymiä alkuperäisiä robots-sallittuja Wikipedia-lähdesivuja ja muuttumatonta yhteistä lähdesovitusta. Kaupunkien en-Wiki-artikkelit varmennettiin niiden Wikidata-entiteeteistä; maa-fallbackia ei käytetty. Kaikki tuotanto/väliaineisto NASilla.

Poiminta 6/7 kaupunkia. Tämä on vaiheen 0 valmistelu: lähdeviitteiden todellinen normaalikausi, asema ja mahdolliset eri sarjat tarkistetaan vielä A/C/D:ssä ennen lukujen käyttöä pelaajatekstissä. Poimintaa ei lasketa valmiiksi A–F-vaiheeksi. Alkuperäinen loki: `valiaikainen/e10/saa/alkuperainen-saa-ajo.txt`. Ei käsin korjattuja numeroita eikä hylättyjen rivien palautusta.

| id | kausi | alkuperäinen taulukon otsikko | tila/rajaukset |
|---|---|---|---|
| male | 1991–2020 | Climate data for Malé (Velana International Airport) 1991–2020, extremes 1966–present | poimittu; alkuperäislähteiden kausi/asema vielä auditoitava |
| vientiane | 1991–2020 | Climate data for Vientiane (1991–2020, extremes 1907–) | poimittu; alkuperäislähteiden kausi/asema vielä auditoitava |
| phnompenh | 1988–2013 | Climate data for Phnom Penh (temperature: 1988–2013, extremes: 1906–2013) | poimittu; alkuperäislähteiden kausi/asema vielä auditoitava |
| kualalumpur | 1991–2020 | Climate data for Kuala Lumpur (Sultan Abdul Aziz Shah Airport) (1991–2020 normals, extremes 1963–2020) | poimittu; alkuperäislähteiden kausi/asema vielä auditoitava |
| bandarseribegawan | 1991–2020 | Climate data for Bandar Seri Begawan (Brunei Airport) (1991–2020 normals, extremes 1972–2020) | poimittu; alkuperäislähteiden kausi/asema vielä auditoitava |
| naypyidaw | null | — | Otsikosta ei löytynyt poimijan hyväksymää normaalikautta; ei arvattua vuosiväliä. |
| pjongjang | 1991–2020 | Climate data for Pyongyang (1991–2020 normals, extremes 1961–present) | poimittu; alkuperäislähteiden kausi/asema vielä auditoitava |

## Alkuperäisen ajon loki

```text
male: Climate data for Malé (Velana International Airport) 1991–2020, extremes 1966–present [Malé] → kausi 1991–2020, keskilämpö 28…29.6 °C, vuosisade 1983 mm · HUOM: sade = vain vesisade (Average rainfall)
vientiane: Climate data for Vientiane (1991–2020, extremes 1907–) [Vientiane] → kausi 1991–2020, keskilämpö 22.9…29.1 °C, vuosisade 1660 mm
phnompenh: Climate data for Phnom Penh (temperature: 1988–2013, extremes: 1906–2013) [Phnom Penh] → kausi 1988–2013, keskilämpö 26.3…30.2 °C, vuosisade 1413 mm
kualalumpur: Climate data for Kuala Lumpur (Sultan Abdul Aziz Shah Airport) (1991–2020 normals, extremes 1963–2020) [Kuala Lumpur] → kausi 1991–2020, keskilämpö 27.1…28.5 °C, vuosisade 2848 mm
bandarseribegawan: Climate data for Bandar Seri Begawan (Brunei Airport) (1991–2020 normals, extremes 1972–2020) [Bandar Seri Begawan] → kausi 1991–2020, keskilämpö 27…28.1 °C, vuosisade 3072 mm
EI SÄÄRIVIÄ naypyidaw: Naypyidaw: "Climate data for Naypyidaw, Myanmar": otsikossa ei normaalikautta (vuosiväliä ei arvata) · Naypyidaw: "Climate data for Naypyidaw, Myanmar": otsikossa ei normaalikautta (vuosiväliä ei arvata) → saatiedot: null ja syy TILANNE.md:hen (tai saa-syote.json: "artikkeli"/"taulukko")
pjongjang: Climate data for Pyongyang (1991–2020 normals, extremes 1961–present) [Pyongyang] → kausi 1991–2020, keskilämpö -5.4…25 °C, vuosisade 938 mm
6/7 säärivia → e10/<id>/saa.json (saatiedot = saa.json ilman tausta-kenttää + luonnehdinta)
```
