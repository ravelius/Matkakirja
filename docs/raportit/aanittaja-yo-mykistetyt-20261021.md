# Mykistetyt-kentät (Äänittäjä 21.10.2026, yöjono kohta 10)
Lähde: `js/tyohuone-kehitys-data.js` (origin/main). Mykistys poistuu vasta kun uusi luenta on kytketty (tuotantopohja kertojan-teksti-ja-aani, kultainen polku 9).

17 kohdetta mykistyksellä, 34 ilman.

| rivi | kohde | mykistetyt osat |
|---|---|---|
| 1501 | sarajevo | 'kohtaaminen', 'aarre' |
| 1632 | kiova | 'saapuminen', 'kohtaaminen', 'aarre' |
| 1829 | pietari | 'kohtaaminen', 'aarre' |
| 1964 | tallinna | 'kohtaaminen', 'aarre' |
| 2176 | oslo | 'kohtaaminen', 'aarre' |
| 2364 | lappi | 'kohtaaminen', 'aarre' |
| 2430 | tromssa | 'kohtaaminen', 'aarre' |
| 2579 | bryssel | 'saapuminen' |
| 2618 | kosice | 'saapuminen' |
| 2656 | ljubljana | 'saapuminen' |
| 2694 | luxemburg | 'saapuminen' |
| 2733 | valletta | 'saapuminen' |
| 2773 | bergen | 'saapuminen' |
| 2813 | firenze | 'saapuminen' |
| 2851 | sevilla | 'saapuminen' |
| 2889 | tampere | 'saapuminen' |
| 3760 | nikosia | 'saapuminen', 'kohtaaminen', 'aarre' |

Toimenpide: kullekin riville tarkista ämpärin manifestista, onko mykistettyjen osien uusi luenta jo viety (esim. `taidemuseo-kertoja-*`, `kiina-*`, `luennat-v1-*`); jos on ja kytketty, kytkijä poistaa mykistyksen. Äänittäjän puolella uusia otoja ei tehdä ilman lupaa.

Huom (lupapyyntöehdokas PT:lle): 17 kohteen mykistettyjen osien uusi luenta puuttuu, jos ämpärissä ei ole uutta; ne ovat luonteva seuraava generointierä (William, `eleven_v4_turbo`, `fi`), kun omistaja antaa luvan. Merkkimäärä lasketaan vasta kun SK:n uudet tekstit on kiinnitetty.
