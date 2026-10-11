# e09 — alkuperäinen sääpoiminta

Päivitetty 2026-10-11T21:37:12.005088+00:00

Alkuperäinen `tyokalu.mjs saa e09` ajettiin muuttamatta numeropoimintaa tai tarkistusalgoritmia. Estettyjen rajapintareittien sijasta käytettiin omistajan hyväksymiä alkuperäisiä robots-sallittuja Wikipedia-lähdesivuja ja muuttumatonta yhteistä lähdesovitusta. Kaupunkien en-Wiki-artikkelit varmennettiin niiden Wikidata-entiteeteistä; maa-fallbackia ei käytetty. Kaikki tuotanto/väliaineisto NASilla.

Poiminta 6/7 kaupunkia. Tämä on vaiheen 0 valmistelu: lähdeviitteiden todellinen normaalikausi, asema ja mahdolliset eri sarjat tarkistetaan vielä A/C/D:ssä ennen lukujen käyttöä pelaajatekstissä. Poimintaa ei lasketa valmiiksi A–F-vaiheeksi. Alkuperäinen loki: `valiaikainen/e09/saa/alkuperainen-saa-ajo.txt`. Ei käsin korjattuja numeroita eikä hylättyjen rivien palautusta.

| id | kausi | alkuperäinen taulukon otsikko | tila/rajaukset |
|---|---|---|---|
| taskent | 1991–2020 | Climate data for Tashkent (1991–2020 normals, extremes 1867–present) | poimittu; alkuperäislähteiden kausi/asema vielä auditoitava |
| biskek | 1991–2020 | Climate data for Bishkek (1991–2020, extremes 1936–present) | poimittu; alkuperäislähteiden kausi/asema vielä auditoitava |
| dusanbe | 1991–2020 | Climate data for Dushanbe (1991–2020, extremes 1926–present) | poimittu; alkuperäislähteiden kausi/asema vielä auditoitava |
| asgabat | null | — | Alkuperäinen tarkistin hylkäsi vuosisarakkeen ja kuukausisumman ristiriidan. |
| islamabad | 1991–2020 | Climate data for Islamabad (1991–2020 normals) | poimittu; alkuperäislähteiden kausi/asema vielä auditoitava |
| thimphu | 1996–2017 | Climate data for Thimphu-Simtokha, elevation 2,310 m (7,580 ft), (1996–2017 normals) | poimittu; alkuperäislähteiden kausi/asema vielä auditoitava |
| dhaka | 1991–2020 | Climate data for Dhaka (1991–2020 normals, extremes 1949–present) | poimittu; alkuperäislähteiden kausi/asema vielä auditoitava |

## Alkuperäisen ajon loki

```text
taskent: Climate data for Tashkent (1991–2020 normals, extremes 1867–present) [Tashkent] → kausi 1991–2020, keskilämpö 2.3…28.3 °C, vuosisade 457 mm
biskek: Climate data for Bishkek (1991–2020, extremes 1936–present) [Bishkek] → kausi 1991–2020, keskilämpö -2.7…25.5 °C, vuosisade 447 mm
dusanbe: Climate data for Dushanbe (1991–2020, extremes 1926–present) [Dushanbe] → kausi 1991–2020, keskilämpö 3.1…27.4 °C, vuosisade 618 mm
EI SÄÄRIVIÄ asgabat: Ashgabat: "Climate data for Ashgabat (1991–2020, extremes 1893–present)": vuosisarake 221 mm ≠ kuukausien summa 208 mm (taulukossa virhe) · Ashgabat: "Climate data for Ashgabat (1991–2020, extremes 1893–present)": vuosisarake 221 mm ≠ kuukausien summa 208 mm (taulukossa virhe) → saatiedot: null ja syy TILANNE.md:hen (tai saa-syote.json: "artikkeli"/"taulukko")
islamabad: Climate data for Islamabad (1991–2020 normals) [Islamabad] → kausi 1991–2020, keskilämpö 10.7…31.4 °C, vuosisade 1260 mm
thimphu: Climate data for Thimphu-Simtokha, elevation 2,310 m (7,580 ft), (1996–2017 normals) [Thimphu] → kausi 1996–2017, keskilämpö 6.3…21.8 °C, vuosisade 609 mm · HUOM: sade = vain vesisade (Average rainfall)
dhaka: Climate data for Dhaka (1991–2020 normals, extremes 1949–present) [Dhaka] → kausi 1991–2020, keskilämpö 18.4…29.1 °C, vuosisade 1990 mm
6/7 säärivia → e09/<id>/saa.json (saatiedot = saa.json ilman tausta-kenttää + luonnehdinta)
```
