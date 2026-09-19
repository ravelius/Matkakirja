# Opus 2 → Fable: pelikaupunkien merkkien siirtymät (erä H)

19.9.2026 klo 19.45–19.55 Suomen aikaa. Haara `opus2-kaupunkisiirtymat`
(pohja origin/main). **Koodimuutoksia ei ole.** Tämä on mittausraportti
ja ehdotus.

## Tulos lyhyesti

- **Budapest ei ole pallolla väärässä paikassa.** Sonnet 2 mittasi
  laudan x/y:n (europe.js 591/658 → maailmankartta 6492,7/1519,3), ja
  se todella on 32,5 lautayksikköä (79 km) Kecskemétiin päin. Pallolauta
  ei kuitenkaan piirrä kaupunkia siihen. Budapestilla on oma pallopiste
  `PALLON_KAUPUNKIPISTEET.budapest = 47,492 / 19,051` (Wikidata).
  - Lukija: `js/pallolauta/lauta.js` → `js/pallo.js pallonOmatPisteet`.
  - Mitattu 14.9.: vihreä piste on 0,2 px:n päässä merkistä
    (`js/fokuspiste.js`).
  - Pallolla Budapest on siis 0 km:n päässä todellisesta paikastaan.
- **Laudan x/y:tä ei siirretä.** Päätoimittajan päätös 7.9.2026
  (`js/packs/maailmankartta-pallopisteet.js`) linjaa, että laudan x/y ei
  muutu, koska reittien pituus, välipisteet, satamat ja vähimmäisväli
  riippuvat siitä. Kuvavirhe korjataan pallopisteellä.
- Mitattu 251 kaupunkia (10 ilman Wikidata-koordinaattia).
  - 122 on alle 7 lautayksikön päässä.
  - 129 on yli: näistä **90:llä on pallopiste**, joten pallolla ne ovat
    0 km:n päässä.
  - **39:llä ei ole pallopistettä**, ja pallo piirtää ne laudan x/y:hin.
- Ne 39 ovat 7.9:n kahdella kierroksella nimettyjä ALUEITA (Wikidatan
  piste on alueen keskipiste, ei laudan tarkoittama kohta), sekä Mosambik
  ja Orjarannikko, jotka jätettiin tarinan ratkaistaviksi. **Yksikään ei
  ole uusi.** Lista on sama kuin 7.9.

## Menetelmä

`tools/tarkista-laudan-pisteet.mjs --lauta maailmankartta` (Wikidata
P625 kaupungin `wiki`-kentän fi-artikkelin kautta, välimuisti; mediaani
2,0 km). Lautayksiköt: Wikidatan lat/lon → `laudat()`
(`tools/johda-maastokohteet.mjs`, Miller, 12000 yksikköä / 360°) ja
etäisyys laudan x/y:hin (kiertosauma huomioitu). "Piirretty" on
etäisyys siitä kohdasta, johon pallo merkin oikeasti piirtää:
pallopiste, jos sellainen on, muuten laudan x/y.

## Ehdotus (päätös sinulle, en tehnyt)

Näissä 39:ssä on kuusi pistemäistä kohdetta, joissa Wikidatan
koordinaatti ON se paikka, jota lauta tarkoittaa. Ne voisi siirtää
pallolla oikeaan kohtaan lisäämällä rivin `PALLON_KAUPUNKIPISTEET`-
tauluun. Samaa mekanismia 7.9. käytti 97 kaupungille, eikä laudan x/y
muutu.

| Kohde | Piirretty nyt | Huomio |
|---|---|---|
| Sansibar | **531 km** | laudan piste on avomerellä (−9,28 / 42,70); Stone Town −6,16 / 39,19 |
| Viktorian putoukset | 233 km | putous on piste |
| Mount Rushmore | 162 km | monumentti on piste |
| Kilimandžaro | 140 km | huippu on piste (vuori) |
| Uluru | 108 km | kallio on piste |
| Milford Sound | 81 km | vuono, pieni ala |

Alueet (Sahara, Sumatra, Borneo, Kamtšatka, järvet ja aavikot) kannattaa
jättää. Niiden keskipiste ei ole parempi kuin laudan valinta.

## Taulukko: kaikki yli 7 lautayksikön poikkeamat (129)

| Kaupunki | Laudan x / y | Oikea (Wikidata → laudat) | Poikkeama (yks.) | Pallopiste | Piirretty (km) |
|---|---|---|---|---|---|
| Mosambik | 6986.2 / 3871.2 | 7191.1 / 3716.4 | 256.8 | **ei** | 823 |
| Iqaluit | 3366.7 / 824.5 | 3549.3 / 733.2 | 204.2 | kyllä | 0 (pallopiste) |
| Sumatra | 9086.7 / 3071.4 | 9209.0 / 3221.5 | 193.6 | **ei** | 645 |
| Kamtšatka | 11124.0 / 1257.3 | 11166.7 / 1071.8 | 190.4 | **ei** | 452 |
| Sahara | 6116.7 / 2305.1 | 6253.7 / 2428.5 | 184.4 | **ei** | 567 |
| Sansibar | 7256.7 / 3521.7 | 7143.3 / 3408.4 | 160.3 | **ei** | 531 |
| Kanton | 9543.7 / 2290.1 | 9608.7 / 2426.7 | 151.3 | kyllä | 0 (pallopiste) |
| Borneo | 9510.0 / 3159.8 | 9633.3 / 3244.8 | 149.8 | **ei** | 500 |
| Nairobi | 7086.7 / 3131.5 | 7060.6 / 3254.4 | 125.6 | kyllä | 0 (pallopiste) |
| Lagos | 6066.7 / 3030.0 | 5946.5 / 2996.0 | 124.9 | kyllä | 0 (pallopiste) |
| Riika | 6543.7 / 1142.6 | 6636.9 / 1074.3 | 115.5 | kyllä | 0 (pallopiste) |
| Islanti | 5106.0 / 711.9 | 5200.0 / 666.2 | 104.5 | **ei** | 164 |
| Ahaggar | 5946.7 / 2485.9 | 6027.8 / 2425.4 | 101.2 | **ei** | 315 |
| Marrakech | 5649.2 / 2172.1 | 5567.3 / 2121.1 | 96.5 | kyllä | 0 (pallopiste) |
| Havanna | 3010.0 / 2470.0 | 3088.0 / 2426.5 | 89.3 | kyllä | 0 (pallopiste) |
| Orjarannikko | 5961.7 / 2933.5 | 5902.8 / 2999.0 | 88.1 | **ei** | 292 |
| Varanasi | 8538.3 / 2406.0 | 8600.4 / 2349.4 | 84.0 | kyllä | 0 (pallopiste) |
| St. Helena | 5679.2 / 3673.0 | 5642.8 / 3747.6 | 83.0 | **ei** | 270 |
| Darfur | 6604.2 / 2722.8 | 6666.7 / 2775.8 | 81.9 | **ei** | 267 |
| Tallinna | 6654.2 / 1034.5 | 6658.2 / 953.6 | 81.0 | kyllä | 0 (pallopiste) |
| Havaiji | 623.3 / 2536.0 | 566.7 / 2483.8 | 77.0 | **ei** | 243 |
| Kamerun | 6186.7 / 3126.1 | 6139.1 / 3070.9 | 72.9 | **ei** | 243 |
| Viktorian putoukset | 6666.7 / 3749.3 | 6695.3 / 3815.3 | 71.9 | **ei** | 233 |
| Karthago | 6108.1 / 1921.9 | 6177.4 / 1925.0 | 69.4 | kyllä | 0 (pallopiste) |
| Kioto | 10294.0 / 2015.4 | 10358.9 / 1995.0 | 68.0 | kyllä | 0 (pallopiste) |
| St. John’s | 4016.7 / 1463.4 | 4076.3 / 1494.8 | 67.4 | kyllä | 0 (pallopiste) |
| Madagaskar | 7463.4 / 3867.1 | 7400.0 / 3887.0 | 66.4 | **ei** | 209 |
| Alpit | 6077.8 / 1490.4 | 6120.5 / 1536.2 | 62.6 | **ei** | 155 |
| Labrador | 3820.0 / 1243.7 | 3766.7 / 1211.8 | 62.1 | **ei** | 131 |
| Mount Rushmore | 2400.0 / 1589.4 | 2384.7 / 1647.7 | 60.3 | **ei** | 162 |
| São Paulo | 4230.0 / 3977.6 | 4278.9 / 4011.0 | 59.2 | kyllä | 0 (pallopiste) |
| Appalakit | 3150.0 / 1900.1 | 3200.0 / 1880.8 | 53.6 | **ei** | 143 |
| Ouro Preto | 4377.0 / 3848.2 | 4383.2 / 3900.4 | 52.6 | kyllä | 0 (pallopiste) |
| Sepik | 10606.7 / 3361.6 | 10651.3 / 3339.6 | 49.7 | **ei** | 165 |
| Kano | 6151.7 / 2771.7 | 6119.7 / 2809.5 | 49.5 | kyllä | 0 (pallopiste) |
| Sarajevo | 6440.6 / 1601.6 | 6447.1 / 1648.6 | 47.4 | kyllä | 0 (pallopiste) |
| Townsville | 10746.7 / 3904.4 | 10727.2 / 3861.5 | 47.1 | kyllä | 0 (pallopiste) |
| Angola | 6366.7 / 3613.4 | 6411.7 / 3625.2 | 46.5 | **ei** | 152 |
| Kongo | 6266.7 / 3371.6 | 6248.3 / 3414.2 | 46.4 | **ei** | 154 |
| Lhasa | 8890.0 / 2151.6 | 8871.4 / 2193.8 | 46.1 | kyllä | 0 (pallopiste) |
| Tanganjika | 6804.2 / 3457.3 | 6816.7 / 3415.1 | 44.0 | **ei** | 146 |
| Ulan Bator | 9396.7 / 1522.7 | 9396.9 / 1479.6 | 43.1 | kyllä | 0 (pallopiste) |
| Kilimandžaro | 7111.7 / 3339.6 | 7078.6 / 3313.7 | 42.0 | **ei** | 140 |
| Kapkaupunki | 6479.2 / 4360.1 | 6447.5 / 4387.2 | 41.7 | kyllä | 0 (pallopiste) |
| Nullarbor | 10166.7 / 4293.4 | 10132.3 / 4270.2 | 41.5 | **ei** | 121 |
| Taipei | 9866.7 / 2396.1 | 9885.4 / 2359.4 | 41.2 | kyllä | 0 (pallopiste) |
| Santa Fe | 2293.3 / 2010.5 | 2301.1 / 1970.2 | 41.0 | kyllä | 0 (pallopiste) |
| Timbuktu | 5696.7 / 2632.6 | 5733.4 / 2647.2 | 39.5 | kyllä | 0 (pallopiste) |
| Geraldton | 9653.3 / 4158.7 | 9653.8 / 4197.7 | 39.0 | kyllä | 0 (pallopiste) |
| Kumasi | 5791.7 / 3024.6 | 5779.2 / 2987.8 | 38.9 | kyllä | 0 (pallopiste) |
| Nuuk | 4146.7 / 703.9 | 4108.9 / 710.6 | 38.4 | kyllä | 0 (pallopiste) |
| Sitka | 1319.0 / 1107.4 | 1322.2 / 1069.3 | 38.2 | kyllä | 0 (pallopiste) |
| Rub al-Khali | 7533.3 / 2518.8 | 7500.0 / 2536.0 | 37.5 | **ei** | 118 |
| Sisilia | 6279.2 / 1876.1 | 6308.9 / 1897.6 | 36.7 | **ei** | 100 |
| Uluru | 10166.7 / 4083.6 | 10201.2 / 4074.5 | 35.7 | **ei** | 108 |
| Mérida | 2856.7 / 2535.0 | 2846.0 / 2502.3 | 34.4 | kyllä | 0 (pallopiste) |
| Siinai | 6965.3 / 2233.3 | 6966.7 / 2199.1 | 34.2 | **ei** | 105 |
| Punta Arenas | 3453.3 / 5143.2 | 3469.7 / 5173.1 | 34.1 | kyllä | 0 (pallopiste) |
| Budapest | 6492.7 / 1519.3 | 6468.0 / 1497.5 | 32.9 | kyllä | 0 (pallopiste) |
| Shanghai | 9853.3 / 2122.2 | 9882.3 / 2135.8 | 32.0 | kyllä | 0 (pallopiste) |
| Manila | 9866.7 / 2690.7 | 9865.9 / 2721.6 | 30.9 | kyllä | 0 (pallopiste) |
| Milford Sound | 11416.7 / 4833.6 | 11428.9 / 4805.4 | 30.7 | **ei** | 81 |
| Namib | 6354.2 / 4012.8 | 6333.3 / 3991.7 | 29.7 | **ei** | 92 |
| Montreal | 3386.7 / 1552.0 | 3380.4 / 1581.0 | 29.7 | kyllä | 0 (pallopiste) |
| Tšad-järvi | 6341.7 / 2755.4 | 6317.8 / 2772.4 | 29.3 | **ei** | 96 |
| Petra | 7036.0 / 2188.8 | 7014.7 / 2168.9 | 29.1 | kyllä | 0 (pallopiste) |
| Colombo | 8516.7 / 2961.0 | 8495.4 / 2980.2 | 28.7 | kyllä | 0 (pallopiste) |
| Vilna | 6687.2 / 1205.9 | 6676.0 / 1180.3 | 27.9 | kyllä | 0 (pallopiste) |
| Dakar | 5279.2 / 2722.8 | 5252.3 / 2719.0 | 27.2 | kyllä | 0 (pallopiste) |
| Nome | 346.7 / 687.8 | 320.0 / 693.2 | 27.2 | kyllä | 0 (pallopiste) |
| Sierra Leone | 5404.2 / 2922.8 | 5430.0 / 2927.5 | 26.2 | **ei** | 87 |
| Christchurch | 11566.7 / 4776.1 | 11587.9 / 4761.1 | 26.0 | kyllä | 0 (pallopiste) |
| Kathmandu | 8666.7 / 2285.8 | 8677.3 / 2263.9 | 24.3 | kyllä | 0 (pallopiste) |
| Sahalin | 10590.0 / 1390.2 | 10600.0 / 1368.4 | 24.0 | **ei** | 60 |
| Delhi | 8383.3 / 2231.8 | 8407.2 / 2229.4 | 24.0 | kyllä | 0 (pallopiste) |
| Miami | 3143.3 / 2318.0 | 3160.2 / 2333.2 | 22.7 | kyllä | 0 (pallopiste) |
| Suva | 11773.3 / 3804.2 | 11781.1 / 3822.5 | 19.9 | kyllä | 0 (pallopiste) |
| São Luís | 4344.7 / 3311.7 | 4356.6 / 3295.8 | 19.9 | kyllä | 0 (pallopiste) |
| Hongkong | 9633.3 / 2438.3 | 9638.6 / 2456.6 | 19.1 | kyllä | 0 (pallopiste) |
| Ilha do Bananal | 4161.3 / 3572.9 | 4158.8 / 3591.6 | 18.9 | **ei** | 62 |
| Lima | 3280.0 / 3626.9 | 3265.4 / 3615.4 | 18.6 | kyllä | 0 (pallopiste) |
| Jerusalem | 6990.7 / 2121.5 | 7007.8 / 2115.7 | 18.1 | kyllä | 0 (pallopiste) |
| Singapore | 9286.7 / 3151.5 | 9293.3 / 3168.2 | 18.0 | kyllä | 0 (pallopiste) |
| Barcelona | 5890.3 / 1740.3 | 5905.9 / 1748.2 | 17.5 | kyllä | 0 (pallopiste) |
| Marseille | 6008.3 / 1654.5 | 6012.5 / 1671.4 | 17.4 | kyllä | 0 (pallopiste) |
| Dubai | 7676.0 / 2368.4 | 7677.0 / 2351.1 | 17.3 | kyllä | 0 (pallopiste) |
| Vladivostok | 10216.7 / 1667.2 | 10229.5 / 1678.7 | 17.2 | kyllä | 0 (pallopiste) |
| Chennai | 8496.7 / 2762.2 | 8509.2 / 2773.0 | 16.5 | kyllä | 0 (pallopiste) |
| Melbourne | 10666.7 / 4519.0 | 10665.4 / 4535.0 | 16.1 | kyllä | 0 (pallopiste) |
| Helsinki | 6661.1 / 901.8 | 6664.6 / 917.2 | 15.8 | kyllä | 0 (pallopiste) |
| Perth | 9710.0 / 4308.1 | 9695.3 / 4313.9 | 15.8 | kyllä | 0 (pallopiste) |
| Porto Alegre | 4113.3 / 4234.8 | 4125.7 / 4243.3 | 15.0 | kyllä | 0 (pallopiste) |
| New Orleans | 2819.8 / 2171.9 | 2830.7 / 2181.8 | 14.7 | kyllä | 0 (pallopiste) |
| Cayenne | 4076.7 / 3054.7 | 4088.8 / 3046.7 | 14.5 | kyllä | 0 (pallopiste) |
| Brisbane | 10920.0 / 4148.0 | 10934.3 / 4150.4 | 14.5 | kyllä | 0 (pallopiste) |
| Valparaíso | 3460.0 / 4352.6 | 3446.0 / 4354.3 | 14.1 | kyllä | 0 (pallopiste) |
| Kappadokia | 7001.3 / 1867.1 | 6994.6 / 1854.9 | 13.9 | **ei** | 39 |
| Kreeta | 6676.8 / 1984.3 | 6663.1 / 1983.7 | 13.7 | **ei** | 37 |
| Antofagasta | 3500.0 / 4012.8 | 3486.7 / 4014.4 | 13.4 | kyllä | 0 (pallopiste) |
| San Juan | 3620.0 / 2598.2 | 3629.4 / 2589.0 | 13.2 | kyllä | 0 (pallopiste) |
| Vancouver | 1736.7 / 1411.9 | 1729.5 / 1422.2 | 12.6 | kyllä | 0 (pallopiste) |
| Adelaide | 10453.3 / 4412.5 | 10453.3 / 4424.8 | 12.3 | kyllä | 0 (pallopiste) |
| Sydney | 10866.7 / 4375.0 | 10873.7 / 4385.0 | 12.2 | kyllä | 0 (pallopiste) |
| Buenos Aires | 3883.3 / 4423.8 | 3887.3 / 4412.5 | 12.0 | kyllä | 0 (pallopiste) |
| Hobart | 10740.0 / 4723.5 | 10743.9 / 4734.9 | 12.0 | kyllä | 0 (pallopiste) |
| Halifax | 3720.0 / 1605.9 | 3714.3 / 1616.3 | 11.9 | kyllä | 0 (pallopiste) |
| Houston | 2651.0 / 2178.0 | 2653.9 / 2189.5 | 11.9 | kyllä | 0 (pallopiste) |
| Salvador | 4540.0 / 3640.5 | 4550.2 / 3646.7 | 11.9 | kyllä | 0 (pallopiste) |
| Puerto Montt | 3413.3 / 4675.5 | 3402.0 / 4678.3 | 11.6 | kyllä | 0 (pallopiste) |
| João Pessoa | 4660.0 / 3451.9 | 4670.7 / 3449.2 | 11.0 | kyllä | 0 (pallopiste) |
| Port Moresby | 10733.3 / 3519.0 | 10738.3 / 3528.4 | 10.6 | kyllä | 0 (pallopiste) |
| Caracas | 3603.3 / 2870.3 | 3602.9 / 2860.0 | 10.3 | kyllä | 0 (pallopiste) |
| Tromssa | 6468.4 / 412.6 | 6465.2 / 403.2 | 9.9 | kyllä | 0 (pallopiste) |
| New York | 3360.0 / 1767.4 | 3366.5 / 1774.8 | 9.8 | kyllä | 0 (pallopiste) |
| Rio de Janeiro | 4386.7 / 3981.2 | 4393.1 / 3988.6 | 9.8 | kyllä | 0 (pallopiste) |
| Macapá | 4123.3 / 3204.8 | 4131.2 / 3210.4 | 9.7 | kyllä | 0 (pallopiste) |
| Jakarta | 9400.0 / 3425.1 | 9394.2 / 3417.6 | 9.5 | kyllä | 0 (pallopiste) |
| Panama | 3176.7 / 2904.0 | 3182.2 / 2911.7 | 9.5 | kyllä | 0 (pallopiste) |
| Churchill | 2703.5 / 986.9 | 2694.4 / 986.4 | 9.1 | kyllä | 0 (pallopiste) |
| Guatemala | 2816.7 / 2711.2 | 2816.2 / 2720.0 | 8.8 | kyllä | 0 (pallopiste) |
| Galápagos | 2823.3 / 3236.2 | 2815.0 / 3233.7 | 8.7 | **ei** | 29 |
| Mexico City | 2530.0 / 2549.8 | 2528.8 / 2558.4 | 8.7 | kyllä | 0 (pallopiste) |
| San Francisco | 1760.0 / 1884.7 | 1752.7 / 1889.5 | 8.7 | kyllä | 0 (pallopiste) |
| Managua | 2956.7 / 2796.1 | 2957.5 / 2804.4 | 8.3 | kyllä | 0 (pallopiste) |
| Dili | 10020.0 / 3505.6 | 10019.3 / 3497.3 | 8.3 | kyllä | 0 (pallopiste) |
| Wellington | 11666.7 / 4667.5 | 11659.2 / 4671.0 | 8.3 | kyllä | 0 (pallopiste) |
| Machu Picchu | 3413.3 / 3660.8 | 3415.1 / 3652.8 | 8.2 | kyllä | 0 (pallopiste) |
| Darwin | 10200.7 / 3633.7 | 10194.7 / 3628.2 | 8.1 | kyllä | 0 (pallopiste) |
| Falkland | 3863.9 / 5115.5 | 3859.3 / 5108.9 | 8.0 | **ei** | 19 |
