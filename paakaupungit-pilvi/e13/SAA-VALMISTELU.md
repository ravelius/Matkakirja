# e13 — alkuperäinen sääpoiminta

Päivitetty 2026-10-11T21:37:12.005088+00:00

Alkuperäinen `tyokalu.mjs saa e13` ajettiin muuttamatta numeropoimintaa tai tarkistusalgoritmia. Estettyjen rajapintareittien sijasta käytettiin omistajan hyväksymiä alkuperäisiä robots-sallittuja Wikipedia-lähdesivuja ja muuttumatonta yhteistä lähdesovitusta. Kaupunkien en-Wiki-artikkelit varmennettiin niiden Wikidata-entiteeteistä; maa-fallbackia ei käytetty. Kaikki tuotanto/väliaineisto NASilla.

Poiminta 5/5 kaupunkia. Tämä on vaiheen 0 valmistelu: lähdeviitteiden todellinen normaalikausi, asema ja mahdolliset eri sarjat tarkistetaan vielä A/C/D:ssä ennen lukujen käyttöä pelaajatekstissä. Poimintaa ei lasketa valmiiksi A–F-vaiheeksi. Alkuperäinen loki: `valiaikainen/e13/saa/alkuperainen-saa-ajo.txt`. Ei käsin korjattuja numeroita eikä hylättyjen rivien palautusta.

| id | kausi | alkuperäinen taulukon otsikko | tila/rajaukset |
|---|---|---|---|
| georgetown | 1991–2020 | Climate data for Cheddi Jagan Airport (1991–2020) | poimittu; alkuperäislähteiden kausi/asema vielä auditoitava |
| paramaribo | 1991–2020 | Climate data for Paramaribo (Zorg en Hoop Airport) (1991–2020) | poimittu; alkuperäislähteiden kausi/asema vielä auditoitava |
| brasilia | 1991–2020 | Climate data for Brasília (1991–2020, extremes 1961–present) | poimittu; alkuperäislähteiden kausi/asema vielä auditoitava |
| lapaz | 1991–2020 | Climate data for El Alto, Bolivia (El Alto International Airport), elevation 4,058 m (13,314 ft), (1991–2020 normals, extremes 1942–present) | poimittu; alkuperäislähteiden kausi/asema vielä auditoitava |
| santiagodechile | 1991–2020 | Climate data for Quinta Normal, Santiago (1991–2020 normals, extremes 1911–present) | poimittu; alkuperäislähteiden kausi/asema vielä auditoitava |

## Alkuperäisen ajon loki

```text
georgetown: Climate data for Cheddi Jagan Airport (1991–2020) [Georgetown, Guyana] → kausi 1991–2020, keskilämpö 25.8…27.7 °C, vuosisade 2640 mm
paramaribo: Climate data for Paramaribo (Zorg en Hoop Airport) (1991–2020) [Paramaribo] → kausi 1991–2020, keskilämpö 27.1…29.3 °C, vuosisade 2138 mm
brasilia: Climate data for Brasília (1991–2020, extremes 1961–present) [Brasília] → kausi 1991–2020, keskilämpö 19.3…23.1 °C, vuosisade 1479 mm
lapaz: Climate data for El Alto, Bolivia (El Alto International Airport), elevation 4,058 m (13,314 ft), (1991–2020 normals, extremes 1942–present) [La Paz] → kausi 1991–2020, keskilämpö 5.1…9.9 °C, vuosisade 604 mm
santiagodechile: Climate data for Quinta Normal, Santiago (1991–2020 normals, extremes 1911–present) [Santiago] → kausi 1991–2020, keskilämpö 9.8…22 °C, vuosisade 286 mm
5/5 säärivia → e13/<id>/saa.json (saatiedot = saa.json ilman tausta-kenttää + luonnehdinta)
```
