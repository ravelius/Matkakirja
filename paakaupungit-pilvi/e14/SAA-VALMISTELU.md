# e14 — alkuperäinen sääpoiminta

Päivitetty 2026-10-11T21:37:12.005088+00:00

Alkuperäinen `tyokalu.mjs saa e14` ajettiin muuttamatta numeropoimintaa tai tarkistusalgoritmia. Estettyjen rajapintareittien sijasta käytettiin omistajan hyväksymiä alkuperäisiä robots-sallittuja Wikipedia-lähdesivuja ja muuttumatonta yhteistä lähdesovitusta. Kaupunkien en-Wiki-artikkelit varmennettiin niiden Wikidata-entiteeteistä; maa-fallbackia ei käytetty. Kaikki tuotanto/väliaineisto NASilla.

Poiminta 4/9 kaupunkia. Tämä on vaiheen 0 valmistelu: lähdeviitteiden todellinen normaalikausi, asema ja mahdolliset eri sarjat tarkistetaan vielä A/C/D:ssä ennen lukujen käyttöä pelaajatekstissä. Poimintaa ei lasketa valmiiksi A–F-vaiheeksi. Alkuperäinen loki: `valiaikainen/e14/saa/alkuperainen-saa-ajo.txt`. Ei käsin korjattuja numeroita eikä hylättyjen rivien palautusta.

| id | kausi | alkuperäinen taulukon otsikko | tila/rajaukset |
|---|---|---|---|
| canberra | 1991–2010 | Climate data for Canberra Airport Comparison (1991–2010 averages, extremes 1939–2023); 578 m AMSL; 35.30° S, 149.20° E | poimittu; alkuperäislähteiden kausi/asema vielä auditoitava |
| apia | 1991–2020 | Climate data for Apia (Elevation: 2 m or 6.6 ft) (1991–2020 normals, extremes 1971–2020) | poimittu; alkuperäislähteiden kausi/asema vielä auditoitava |
| nukualofa | null | — | Otsikosta ei löytynyt poimijan hyväksymää normaalikautta; ei arvattua vuosiväliä. |
| funafuti | 1991–2020 | Climate data for Funafuti International Airport (1991–2020 normals, extremes 1936–2020) | poimittu; alkuperäislähteiden kausi/asema vielä auditoitava |
| southtarawa | null | — | Otsikosta ei löytynyt poimijan hyväksymää normaalikautta; ei arvattua vuosiväliä. |
| majuro | 1991–2020 | Climate data for Majuro (Marshall Islands International Airport) 1991–2020 normals, extremes 1955–present | poimittu; alkuperäislähteiden kausi/asema vielä auditoitava |
| palikir | null | — | Otsikosta ei löytynyt poimijan hyväksymää normaalikautta; ei arvattua vuosiväliä. |
| yaren | null | — | Otsikosta ei löytynyt poimijan hyväksymää normaalikautta; ei arvattua vuosiväliä. |
| ngerulmud | null | — | Poimija ei tunnista otsikon ~-erotinta (1985~2015), vaikka kausi näkyy; ei käsin täytettyä sääriviä. |

## Alkuperäisen ajon loki

```text
canberra: Climate data for Canberra Airport Comparison (1991–2010 averages, extremes 1939–2023); 578 m AMSL; 35.30° S, 149.20° E [Canberra] → kausi 1991–2010, keskilämpö 6.2…21.4 °C, vuosisade 579 mm
apia: Climate data for Apia (Elevation: 2 m or 6.6 ft) (1991–2020 normals, extremes 1971–2020) [Apia] → kausi 1991–2020, keskilämpö 26.6…27.8 °C, vuosisade 3091 mm
EI SÄÄRIVIÄ nukualofa: Nukuʻalofa: "Climate data for Nukuʻalofa (Elevation: 2m)": otsikossa ei normaalikautta (vuosiväliä ei arvata) · Nukuʻalofa: "Climate data for Nukuʻalofa (Elevation: 2m)": otsikossa ei normaalikautta (vuosiväliä ei arvata) → saatiedot: null ja syy TILANNE.md:hen (tai saa-syote.json: "artikkeli"/"taulukko")
funafuti: Climate data for Funafuti International Airport (1991–2020 normals, extremes 1936–2020) [Funafuti] → kausi 1991–2020, keskilämpö 28.4…28.9 °C, vuosisade 3397 mm
EI SÄÄRIVIÄ southtarawa: South Tarawa: "Climate data for Tarawa Airport (South Tarawa)": otsikossa ei normaalikautta (vuosiväliä ei arvata) · South Tarawa: "Climate data for Tarawa Airport (South Tarawa)": otsikossa ei normaalikautta (vuosiväliä ei arvata) → saatiedot: null ja syy TILANNE.md:hen (tai saa-syote.json: "artikkeli"/"taulukko")
majuro: Climate data for Majuro (Marshall Islands International Airport) 1991–2020 normals, extremes 1955–present [Majuro] → kausi 1991–2020, keskilämpö 27.7…28.1 °C, vuosisade 3334 mm
EI SÄÄRIVIÄ palikir: Palikir: "Climate data for Palikir": otsikossa ei normaalikautta (vuosiväliä ei arvata) · Palikir: "Climate data for Palikir": otsikossa ei normaalikautta (vuosiväliä ei arvata) → saatiedot: null ja syy TILANNE.md:hen (tai saa-syote.json: "artikkeli"/"taulukko")
EI SÄÄRIVIÄ yaren: Yaren: "Climate data for Yaren District, Nauru": otsikossa ei normaalikautta (vuosiväliä ei arvata) · Yaren: "Climate data for Yaren District, Nauru": otsikossa ei normaalikautta (vuosiväliä ei arvata) → saatiedot: null ja syy TILANNE.md:hen (tai saa-syote.json: "artikkeli"/"taulukko")
EI SÄÄRIVIÄ ngerulmud: Ngerulmud: "Climate data for Ngerulmud (1985~2015)": otsikossa ei normaalikautta (vuosiväliä ei arvata) · Ngerulmud: "Climate data for Ngerulmud (1985~2015)": otsikossa ei normaalikautta (vuosiväliä ei arvata) → saatiedot: null ja syy TILANNE.md:hen (tai saa-syote.json: "artikkeli"/"taulukko")
4/9 säärivia → e14/<id>/saa.json (saatiedot = saa.json ilman tausta-kenttää + luonnehdinta)
```
