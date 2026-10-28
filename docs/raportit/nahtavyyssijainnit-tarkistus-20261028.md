# Nähtävyyskohteiden sijaintien tarkistus Wikidataa vasten (28.10.2026)

NUI:n pyyntö (omistajan päätös 12.28: nostot striimikartalle oikeille paikoilleen). Lähde: js/packs/maakartat.js KAUPUNKIKARTAT[kaupunki].kohteet (lat/lon) vertailtuna Wikidatan P625-koordinaattiin kohteen wiki-kentän artikkelin (fi, muuten en Wikipedia) kautta. Työkalu: tools/sisalto/kohdesijainnit.mjs (ajettavissa uudelleen).

Kaupunkeja 313, kohteita 1996; Wikidata-koordinaatti löytyi 314 kohteelle; yli 100 m pielessä 47. Kohteet, joilla on wiki mutta ei löytynyt Wikidatan koordinaattia tai artikkelia: 11 (lista alla). Nostokohteet ilman omaa wikiä (kuratoitu piste) jäävät vertailun ulkopuolelle. Korjaukset tekee kohdekarttojen omistaja. Huom: yli ~1 km erot voivat olla Wikidatan virheitä (esim. Eagle Square 19 km), joten tarkista kohde kartalta ennen siirtoa.

## Yli 100 m pielessä (suurin ero ensin)

kaupunki | nimi | nykyinen (lat, lon) | Wikidata (lat, lon) | Q-id | ero m
--- | --- | --- | --- | --- | ---
abuja | Eagle Square | 9.06095, 7.49982 | 9.23465, 7.49052 | Q55610352 | 19342
nouakchott | Nouakchottin yliopisto | 18.08934, -15.96764 | 18.16111, -15.99286 | Q3119358 | 8414
freetown | Fourah Bay College | 8.4779, -13.221 | 8.49222, -13.20944 | Q1506926 | 2038
bamako | Koulouban palatsi | 12.66, -8.00667 | 12.67032, -8.01326 | Q18332088 | 1352
istanbul | Üsküdar | 41.0254, 29.0156 | 41.01667, 29.01667 | Q326339 | 975
abuja | State House (Aso Rock Villa) | 9.06227, 7.51853 | 9.05711, 7.52478 | Q7033006 | 895
maseru | Basotho Hat Shop | -29.31301, 27.47842 | -29.31361, 27.48667 | Q138606103 | 803
tampere | Tampereen tuomiokirkko | 61.4966, 23.7744 | 61.5025, 23.76972 | Q1236638 | 701
tampere | Pyynikin näkötorni | 61.4936, 23.7208 | 61.49633, 23.732 | Q3533268 | 667
berliini | Museosaari | 52.5169, 13.401 | 52.52139, 13.39556 | Q151963 | 620
lappi | Rovaniemen kaupungintalo | 66.49642, 25.72501 | 66.5, 25.7333 | Q19407034 | 542
granada | Albaicínin näköalapaikka | 37.181, -3.5927 | 37.1817, -3.5983 | Q576339 | 502
tampere | Finlaysonin tehdasalue | 61.4996, 23.753 | 61.50168, 23.75977 | Q15846380 | 427
helsinki | Suomenlinna | 60.1472, 24.9864 | 60.14361, 24.98444 | Q1292442 | 414
tromssa | Jäämerenkatedraali | 69.6489, 18.9976 | 69.64807, 18.9874 | Q1319441 | 405
berliini | East Side Gallery | 52.505, 13.4399 | 52.50306, 13.44472 | Q313746 | 391
ateena | Lykavittós | 37.9819, 23.7432 | 37.98306, 23.74694 | Q1357713 | 352
abuja | Kansallinen kristillinen keskus | 9.0484, 7.49488 | 9.05139, 7.49472 | Q268445 | 333
abuja | Abujan kansallismoskeija | 9.0602, 7.48964 | 9.06083, 7.4925 | Q1430127 | 322
tampere | Museokeskus Vapriikki | 61.5022, 23.7657 | 61.50301, 23.76036 | Q18346706 | 297
nouakchott | Saudien moskeija | 18.09, -15.97556 | 18.09042, -15.97822 | Q6916429 | 285
tallinna | Matkustajasatama | 59.4448, 24.7618 | 59.44444, 24.76667 | Q11133776 | 278
amsterdam | Artis-eläintarha | 52.367, 4.913 | 52.36611, 4.91667 | Q713124 | 268
dublin | Trinity College | 53.3437, -6.2545 | 53.3444, -6.2577 | Q258464 | 226
sisilia | Piazza Marina | 38.1176, 13.3708 | 38.11722, 13.36833 | Q1595905 | 220
venetsia | Arsenaali | 45.4344, 12.3506 | 45.43528, 12.35306 | Q1262248 | 215
lome | Lomén suuri tori | 6.12603, 1.2273 | 6.12561, 1.22542 | Q6669569 | 213
wien | Belvedere | 48.1915, 16.3809 | 48.1934, 16.38052 | Q211818 | 213
tromssa | Polaria | 69.6455, 18.9515 | 69.64369, 18.94987 | Q28888 | 211
venetsia | San Giorgio Maggiore | 45.4294, 12.3433 | 45.42775, 12.34417 | Q126327 | 196
tukholma | Skansen | 59.3255, 18.1035 | 59.32445, 18.101 | Q725108 | 184
abuja | Kansalliskokouksen rakennus | 9.06912, 7.51013 | 9.06804, 7.51122 | Q25042800 | 170
venetsia | Canal Grande | 45.4415, 12.3283 | 45.44222, 12.32639 | Q309243 | 169
kairo | Saladinin linnoitus | 30.0287, 31.2599 | 30.0294, 31.2614 | Q1988240 | 164
oslo | Oslon tuomiokirkko | 59.9128, 10.7442 | 59.91232, 10.74696 | Q1063209 | 163
ouagadougou | Ouagadougoun suurmoskeija | 12.36622, -1.52139 | 12.36631, -1.52288 | Q107273736 | 162
helsinki | Linnanmäki | 60.1869, 24.9401 | 60.18833, 24.94028 | Q1635596 | 159
pariisi | Luxembourgin puisto | 48.8467, 2.3352 | 48.84694, 2.33722 | Q309458 | 150
vatikaanivaltio | Vatikaanin museot | 41.90627, 12.45274 | 41.90639, 12.45444 | Q182955 | 141
djibouti | Hamoudin moskeija | 11.59231, 43.14612 | 11.59111, 43.14583 | Q10856947 | 137
marseille | Vanhasatama | 43.2946, 5.3693 | 43.29472, 5.37083 | Q437959 | 125
sevilla | Alcázar | 37.385, -5.9924 | 37.38443, -5.99119 | Q498261 | 124
lappi | Lappia-talo | 66.49701, 25.72043 | 66.49654, 25.72278 | Q17382129 | 117
budapest | Gellértinvuori | 47.4869, 19.0446 | 47.48639, 19.04583 | Q577122 | 108
praha | Kansallismuseo | 50.0789, 14.4308 | 50.07984, 14.43042 | Q188112 | 108
tromssa | Tromssan tuomiokirkko | 69.6497, 18.956 | 69.64877, 18.95682 | Q2296475 | 108
oslo | Karl Johans gate | 59.9139, 10.74 | 59.91306, 10.74083 | Q1490775 | 104

## Wiki-kenttä ilman Wikidatan koordinaattia (tarkista kentän otsikko)

- bangui: Boganda-kansallismuseo
- bryssel: Brysselin pörssi
- bukarest: Vanha ruhtinaanhovi
- dubai: Dhow-satama
- edinburgh: Greyfriars Bobby
- granada: Manuel de Fallan talo
- juba: Nyakuron kulttuurikeskus
- lontoo: Pyhän Paavalin katedraali
- lusaka: Lusakan kansallismuseo
- madrid: Plaza Mayor
- maseru: Lesothon valtionkirjasto ja -arkisto
