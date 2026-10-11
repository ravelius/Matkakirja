# e12 — alkuperäinen sääpoiminta

Päivitetty 2026-10-11T21:37:12.005088+00:00

Alkuperäinen `tyokalu.mjs saa e12` ajettiin muuttamatta numeropoimintaa tai tarkistusalgoritmia. Estettyjen rajapintareittien sijasta käytettiin omistajan hyväksymiä alkuperäisiä robots-sallittuja Wikipedia-lähdesivuja ja muuttumatonta yhteistä lähdesovitusta. Kaupunkien en-Wiki-artikkelit varmennettiin niiden Wikidata-entiteeteistä; maa-fallbackia ei käytetty. Kaikki tuotanto/väliaineisto NASilla.

Poiminta 7/9 kaupunkia. Tämä on vaiheen 0 valmistelu: lähdeviitteiden todellinen normaalikausi, asema ja mahdolliset eri sarjat tarkistetaan vielä A/C/D:ssä ennen lukujen käyttöä pelaajatekstissä. Poimintaa ei lasketa valmiiksi A–F-vaiheeksi. Alkuperäinen loki: `valiaikainen/e12/saa/alkuperainen-saa-ajo.txt`. Ei käsin korjattuja numeroita eikä hylättyjen rivien palautusta.

| id | kausi | alkuperäinen taulukon otsikko | tila/rajaukset |
|---|---|---|---|
| nassau | 1991–2020 | Climate data for Nassau (Lynden Pindling International Airport) 1991–2020, elevation: 7 metres or 23 feet, extremes 1980–present | poimittu; alkuperäislähteiden kausi/asema vielä auditoitava |
| saintjohns | null | — | Otsikosta ei löytynyt poimijan hyväksymää normaalikautta; ei arvattua vuosiväliä. |
| basseterre | 1991–2020 | Climate data for Basseterre (Robert L. Bradshaw International Airport) (1991–2020) | poimittu; alkuperäislähteiden kausi/asema vielä auditoitava |
| roseau | 1982–2011 | Climate data for Roseau (Canefield Airport) 1982-2011 | poimittu; alkuperäislähteiden kausi/asema vielä auditoitava |
| castries | 1991–2020 | Climate data for George F. L. Charles Airport (1991–2020) | poimittu; alkuperäislähteiden kausi/asema vielä auditoitava |
| kingstown | null | — | Poimija ei tunnista otsikon ～-erottimia ja eri havaintosuureiden kausia; ei väitettä kaikkien lähdekausien puuttumisesta. |
| bridgetown | 1991–2020 | Climate data for Bridgetown (Grantley Adams International Airport) 1991–2020, extremes 1944–present | poimittu; alkuperäislähteiden kausi/asema vielä auditoitava |
| stgeorges | 1991–2020 | Climate data for St. George's, Grenada (Maurice Bishop International Airport) (1991-2020) | poimittu; alkuperäislähteiden kausi/asema vielä auditoitava |
| portofspain | 1991–2020 | Climate data for Port of Spain (Piarco International Airport) (1991-2020 normals, extremes 1961-2020) | poimittu; alkuperäislähteiden kausi/asema vielä auditoitava |

## Alkuperäisen ajon loki

```text
nassau: Climate data for Nassau (Lynden Pindling International Airport) 1991–2020, elevation: 7 metres or 23 feet, extremes 1980–present [Nassau, Bahamas] → kausi 1991–2020, keskilämpö 22.2…28.9 °C, vuosisade 1426 mm
EI SÄÄRIVIÄ saintjohns: St. John's, Antigua and Barbuda: "Climate data for St. John's, Antigua and Barbuda (V. C. Bird International Airport)": otsikossa ei normaalikautta (vuosiväliä ei arvata) · St. John's, Antigua and Barbuda: "Climate data for St. John's, Antigua and Barbuda (V. C. Bird International Airport)": otsikossa ei normaalikautta (vuosiväliä ei arvata) → saatiedot: null ja syy TILANNE.md:hen (tai saa-syote.json: "artikkeli"/"taulukko")
basseterre: Climate data for Basseterre (Robert L. Bradshaw International Airport) (1991–2020) [Basseterre] → kausi 1991–2020, keskilämpö 25.9…28.9 °C, vuosisade 900 mm
roseau: Climate data for Roseau (Canefield Airport) 1982-2011 [Roseau] → kausi 1982–2011, keskilämpö 25.6…28.1 °C, vuosisade 1759 mm · HUOM: sade = vain vesisade (Average rainfall)
castries: Climate data for George F. L. Charles Airport (1991–2020) [Castries] → kausi 1991–2020, keskilämpö 26.1…28.2 °C, vuosisade 1829 mm
EI SÄÄRIVIÄ kingstown: Kingstown: "Climate data for Kingstown（temperature, precipitation, humidity 1991～2021/sunshine hours 1999～2019）": otsikossa ei normaalikautta (vuosiväliä ei arvata) · Kingstown: "Climate data for Kingstown（temperature, precipitation, humidity 1991～2021/sunshine hours 1999～2019）": otsikossa ei normaalikautta (vuosiväliä ei arvata) → saatiedot: null ja syy TILANNE.md:hen (tai saa-syote.json: "artikkeli"/"taulukko")
bridgetown: Climate data for Bridgetown (Grantley Adams International Airport) 1991–2020, extremes 1944–present [Bridgetown] → kausi 1991–2020, keskilämpö 25.9…27.9 °C, vuosisade 1262 mm · HUOM: sade = vain vesisade (Average rainfall)
stgeorges: Climate data for St. George's, Grenada (Maurice Bishop International Airport) (1991-2020) [St. George's, Grenada] → kausi 1991–2020, keskilämpö 26.5…28.3 °C, vuosisade 1152 mm
portofspain: Climate data for Port of Spain (Piarco International Airport) (1991-2020 normals, extremes 1961-2020) [Port of Spain] → kausi 1991–2020, keskilämpö 26.6…28.5 °C, vuosisade 1802 mm
7/9 säärivia → e12/<id>/saa.json (saatiedot = saa.json ilman tausta-kenttää + luonnehdinta)
```
