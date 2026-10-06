# Päätoimittaja → Codex: elävän oppaan kaupunkinäkymät (149 paikkaa, yksi kuva kustakin — MUUTETTU 20.2x), linssivalikon kuvat ja oppaan kohteiden havainnekuvat (6.10.2026)

Omistaja 6.10.2026 sanatarkasti (chat):
- 19.1x: "pitäisi etsiä massiivinen määrä kuvia sekä pyytää codexia generoimaan kuvia matkaopasta varten. [...] Haluaisin, että matkaoppaassa ei näytettäisi mitään muita kuin valmiiksi speksattuja kuvia."
- 20.0x: "Aloitan vain heti kuvien haku. Samoin Codexille pitää heti antaa tehtäväksi alkaa tuottaa niitä kuvia. Silla kuitenkin kestää monta päivää, että se saa tehtyä kaikki tarvittavat havainnekuvat."
- 20.1x: "Pelin kaikkiin linsseihin, myös niihin keskeneräisiin, saisi teettää kuvat linssivalikkoa varten"

Elävä opas (natiivi, Cesium-kaupunkinäkymä) näyttää jatkossa VAIN valmiiksi speksattuja kuvia (kuvalista ämpärissä). Sonnet-parvi (Sisältökirjuri) hakee CC/PD-valokuvat kohteisiin; sinä teet havainnekuvat. Elävä opas on linssi, joten VAIN EUROOPPA -linjaus ei rajaa tätä työtä.

## MUUTOS 6.10.2026 klo 20.2x (omistaja) — EI vuorokausiversioita, YKSI kuva per paikka

Omistaja sanatarkasti: "Miksi Codexilta on tilattu aamupäivä- ja iltakuvat? Se on minusta liioittelua. Käytetään ennemmin resurssit siihen, että saadaan mielenkiintoisennäköisiä kuvia mahdollisimman monesta paikkaa, mutta ei tilata samoja kuvia eri vuorokauden aikoina."

- ERÄ 1 on nyt **149 paikkaa × 1 kuva**. Tiedostonimi `julisteet/herokoe/hero-<id>.png`, ei -aamu/-keskipaiva/-ilta-päätteitä. Jos olet jo tehnyt kolmen kuvan sarjoja, toimita ne, mutta älä tee uusia vuorokausiversioita.
- Valitse jokaiselle paikalle sille edullisin, mielenkiintoisen näköinen hetki ja kuvakulma (esim. kultainen tunti, sininen hetki tai kirkas päivä). Vaihtele paikasta toiseen, kunhan kuva on paikan tunnistettava ja näyttävä tunnuskuva.
- Vapautuva kapasiteetti käytetään useampiin paikkoihin. ERÄ 1B (lista tulee Sisältökirjurilta): maailman pääkaupungit ja 50 suosikkikohteen kaupungit, joita pelissä ei ole (noin 150), yksi kuva kustakin samalla periaatteella. Sen jälkeen ERÄT 2 ja 3 ennallaan.

## ERÄ 1 (aloita heti): kaupunkinäkymät, 149 paikkaa × 3 vuorokaudenaikaa = 447 kuvaa

Paikat ovat pelin 266 kaupungista ja paikasta ne 149, joilta puuttuu herokoe-sarja (`julisteet/herokoe/hero-<id>-aamu|keskipaiva|ilta.png`; valmiina 117, esim. `hero-petra-*`, `hero-adelaide-*`). Tunnus = pelin kaupunkitunnus (`js/packs/kulttuuri-kategoriat.js`, KULTTUURI_KATEGORIAT). Osa tunnuksista on alueita tai maisemia (esim. kapadokia, siinai, rubalkhali, borneo, kamtsatka) — tee niistä alueen tunnusmaisema samalla periaatteella.

- **Täsmälleen sama muoto kuin valmiissa herokoe-kuvissa:** koko, kuvasuhde, tiedostomuoto, rajaus ja kuvakulman logiikka. Tarkista kolme valmista sarjaa ennen aloitusta ja kirjaa havaitsemasi mitat manifestiin.
- Fotorealistinen valokuvan näköinen kuva (Raamattu: kaikki havainnekuvat fotorealistisia), NYKYAJAN kaupunki (AIKA-sääntö), tunnistettavat maamerkit oikeilla paikoillaan 2–4 Commons-viitekuvan avulla (`docs/moduulit/viitekuvat.md`, `tools/hero-kuvakulmat.mjs`). Ei tekstiä, logoja, vesileimoja eikä tunnistettavia ihmisiä.
- **Vuorokaudenajat** vastaavat oppaan vuorokausinappia: aamu = kultainen matala valo, keskipäivä = neutraali kirkas, ilta = lämmin auringonlasku ja syttyvät valot. Sama kuvakulma kaikissa kolmessa.
- **Toimitus erissä** noin 25 paikkaa (75 kuvaa) listan järjestyksessä: R2 `julisteet/herokoe/`, manifesti `posti/kuvatoimitus-oppaan-kaupunkinakymat-<erä>-<pvm>.json` (url, r2Key, sha256, mitat, generationPrompt, viitteet), kuittaus `posti/codex-fable-oppaan-kaupunkinakymat-<pvm>.md`. Lähderivi: "Tekoälyllä tuotettu havainnekuva." Ei mergeä mainiin (25.9.).
- Päätoimittaja katsoo kunkin erän ensimmäiset kolme paikkaa ennen kuin erä kytketään.

Lista (järjestys = toimitusjärjestys):

1. lontoo
2. praha
3. wien
4. venetsia
5. pariisi
6. budapest
7. helsinki
8. medina
9. kapadokia
10. persepolis
11. siinai
12. rubalkhali
13. luxemburg
14. halab
15. sana
16. aden
17. salalah
18. mosul
19. novosibirsk
20. irkutsk
21. jakutsk
22. magadan
23. kamtsatka
24. sahalin
25. borneo
26. sumatra
27. bryssel
28. ljubljana
29. kosice
30. valletta
31. christchurch
32. manaus
33. caracas
34. salvador
35. portoalegre
36. asuncion
37. dunedin
38. suva
39. cairns
40. dili
41. alicesprings
42. panama
43. honiara
44. portvila
45. denver
46. houston
47. kapkaupunki
48. nairobi
49. miami
50. halifax
51. tanger
52. marrakech
53. addisabeba
54. guatemala
55. lagos
56. sansibar
57. fes
58. dakar
59. salta
60. antofagasta
61. nuuk
62. anchorage
63. puntaarenas
64. santacruz
65. monterrey
66. merida
67. winnipeg
68. stjohns
69. kumasi
70. kano
71. timbuktu
72. lalibela
73. townsville
74. iquitos
75. whitehorse
76. yellowknife
77. iqaluit
78. santafe
79. kilimandzaro
80. viktorianputoukset
81. sitka
82. bermuda
83. falkland
84. caphorn
85. namib
86. robinsoncrusoe
87. norfolk
88. angola
89. karthago
90. tanganjika
91. churchill
92. sierraleone
93. appalakit
94. sthelena
95. kimberley
96. labrador
97. kappalmas
98. boavista
99. viktoria
100. gao
101. kamerun
102. suakin
103. ahaggar
104. mosambik
105. darfur
106. tshadjarvi
107. rashafun
108. cayenne
109. orjarannikko
110. bahrelghazal
111. sepik
112. broome
113. santarem
114. murzuk
115. nullarbor
116. geraldton
117. joaopessoa
118. bananal
119. alkufra
120. macapa
121. campogrande
122. exmouth
123. sanambrosio
124. nome
125. portovelho
126. kalgoorlie
127. birdsville
128. mountisa
129. cooberpedy
130. managua
131. saoluis
132. sanjuan
133. noumea
134. puertomontt
135. yellowstone
136. grandcanyon
137. uluru
138. iguazu
139. titicaca
140. mountrushmore
141. hawaii
142. bali
143. milfordsound
144. ouropreto
145. galapagos
146. kongo
147. machupicchu
148. madagaskar
149. sahara

## ERÄ 2: linssivalikon kuvat, 7 puuttuvaa (lista Natiivi-UI 6.10.2026, lokit/natiivi-ui-1035/linssilista-20261006.md)

Natiivin linssivalikossa on 17 linssiä; 10:lle on jo linssikatalogin kuva (X2, Q1, X3, B1, C7, X4, X5, X6, X7, E11), ja ne kytketään junaan 154. Tee puuttuvat 7 SAMALLA tyylillä, koolla ja rajauksella kuin valmiit `linssikatalogi/<id>-havainne.jpg`-kuvat (katso esim. X2, X4, X5 ja E11 ennen aloitusta). Tiedostonimi `linssikatalogi/natiivi-<tunnus>-havainne.jpg`. Yksi kuva per linssi. Tee ERÄ 2 ennen ERÄ 1B:tä, koska se on pieni ja menee junaan 154.

| tunnus | nimi | aihe kuvaan |
|---|---|---|
| opas | Elävä opas | kaupunki ylhäältä viistosti kultaisessa valossa, tunnistettava kaupunkinäkymä ja yksi korostettu maamerkki; tunnelma: matkaopas vie kierrokselle (ÄLÄ käytä mitään todellista karttapalvelun ulkoasua tai logoa) |
| ihmisen-matka-2 | Ihmisen matka II | ihmiskunnan matkan jatko-osa: kaupunkien ja kulkuvälineiden aika (laivat, rautatiet, lentokoneet) yhtenä panoraamana |
| maapallon-vuosi | Maapallon vuosi | maapallo avaruudesta, jossa vuodenajat näkyvät vyöhykkeinä (lumi pohjoisessa, vihreä kesä etelämpänä), tähtitaivas taustalla |
| ajattelijat | Ajattelijat | antiikin pylväskäytävä (stoa) iltavalossa, marmoripäät tai kaksi viittaan pukeutunutta ajattelijaa keskustelemassa selin tai sivuttain; ei tunnistettavia todellisia kasvoja |
| yokartta | Yökartta | Eurooppa yöllä avaruudesta: kaupunkien valot verkostoina, kuun valaisema pilviharso |
| tahdet | Tähtitaivas | tumma maisema ja Linnunrata sekä tähtikuviot kirkkaana; pieni ihminen kaukoputken kanssa siluettina |
| lontoo | Lontoo | viktoriaaninen Lontoo 1873: Thames, höyrylaivoja, Westminsterin siluetti sumussa kaasulyhtyjen valossa |

## ERÄ 3 (lista tulee Sisältökirjurilta erissä): oppaan kohteiden havainnekuvat

Oppaan lukituista kohdelistoista ne kohteet, joille ei löydy kelvollista CC/PD-valokuvaa, sekä kadonneet ja rappeutuneet kohteet. Luokat Raamatun mukaan: kadonnut / rappeutunut (parikuvana) / olemassa vain jos tuo lisää. Tunnus = Wikidata Q.

Kysymykset ja jumit: tiedosto `posti/codex-fable-oppaan-kuvat-<pvm>.md`.

## ERÄ 1B (Sisältökirjuri 6.10.2026): 162 kaupunkia × 1 kuva

Maailman pääkaupungit ja suosikkikaupungit, joita pelissä ei ole (ei päällekkäisiä: yksikään ei ole 35 km:n sisällä pelin 266 kaupungista). YKSI kuva per kaupunki, ei vuorokausiversioita (omistaja 20.2x), valitse kaupungille edullisin hetki ja kuvakulma. Tiedostonimi `julisteet/herokoe/hero-<tunnus>.png`, sama muoto kuin ERÄ 1:ssä. Tunnus on tässä listassa uusi (ei pelin kaupunkitunnus); nimi on suomeksi (Wikidatan fi-label), maa suomeksi. Koordinaatit ja Wikidata Q: `data/oppaan-kuvat/kaupungit-vaihe2.json` (Sisältökirjurin haara sisaltokirjuri-oppaan-kuvat). Lista on järjestyksessä: ensin pääkaupungit, sitten suosikkikaupungit (Osaka, Hiroshima, Cusco, Cartagena, Boston, Zürich ym.).

| # | tunnus | nimi | maa |
|---|---|---|---|
| 1 | juba | Juba | Etelä-Sudan |
| 2 | bern | Bern | Sveitsi |
| 3 | ngerulmud | Ngerulmud | Palau |
| 4 | taskent | Taškent | Uzbekistan |
| 5 | washington | Washington | Yhdysvallat |
| 6 | dhaka | Dhaka | Bangladesh |
| 7 | islamabad | Islamabad | Pakistan |
| 8 | lapaz | La Paz | Bolivia |
| 9 | abudhabi | Abu Dhabi | Yhdistyneet arabiemiraatit |
| 10 | monaco | Monaco | Monaco |
| 11 | vaduz | Vaduz | Liechtenstein |
| 12 | nassau | Nassau | Bahama |
| 13 | kualalumpur | Kuala Lumpur | Malesia |
| 14 | phnompenh | Phnom Penh | Kambodža |
| 15 | skopje | Skopje | Pohjois-Makedonia |
| 16 | santiagodechile | Santiago de Chile | Chile |
| 17 | tbilisi | Tbilisi | Georgia |
| 18 | zagreb | Zagreb | Kroatia |
| 19 | jerevan | Jerevan | Armenia |
| 20 | paramaribo | Paramaribo | Suriname |
| 21 | tegucigalpa | Tegucigalpa | Honduras |
| 22 | sucre | Sucre | Bolivia |
| 23 | sansalvador | San Salvador | El Salvador |
| 24 | canberra | Canberra | Australia |
| 25 | ndjamena | N’Djamena | Tšad |
| 26 | alger | Alger | Algeria |
| 27 | sanjose | San José | Costa Rica |
| 28 | belgrad | Belgrad | Serbia |
| 29 | bamako | Bamako | Mali |
| 30 | khartum | Khartum | Sudan |
| 31 | brasilia | Brasília | Brasilia |
| 32 | bratislava | Bratislava | Slovakia |
| 33 | bangui | Bangui | Keski-Afrikan tasavalta |
| 34 | lome | Lomé | Togo |
| 35 | minsk | Minsk | Valko-Venäjä |
| 36 | amman | Amman | Jordania |
| 37 | andorralavella | Andorra la Vella | Andorra |
| 38 | sanmarino | San Marino | San Marino |
| 39 | luanda | Luanda | Angola |
| 40 | lusaka | Lusaka | Sambia |
| 41 | beirut | Beirut | Libanon |
| 42 | manama | Manama | Bahrain |
| 43 | belmopan | Belmopan | Belize |
| 44 | ottawa | Ottawa | Kanada |
| 45 | pretoria | Pretoria | Etelä-Afrikka |
| 46 | rabat | Rabat | Marokko |
| 47 | harare | Harare | Zimbabwe |
| 48 | mogadishu | Mogadishu | Somalia |
| 49 | nouakchott | Nouakchott | Mauritania |
| 50 | dodoma | Dodoma | Tansania |
| 51 | biskek | Biškek | Kirgisia |
| 52 | bandarseribegawan | Bandar Seri Begawan | Brunei |
| 53 | male | Malé | Malediivit |
| 54 | niamey | Niamey | Niger |
| 55 | dusanbe | Dušanbe | Tadžikistan |
| 56 | asmara | Asmara | Eritrea |
| 57 | djibouti | Djibouti | Djibouti |
| 58 | bissau | Bissau | Guinea-Bissau |
| 59 | majuro | Majuro | Marshallinsaaret |
| 60 | georgetown | Georgetown | Guyana |
| 61 | vientiane | Vientiane | Laos |
| 62 | monrovia | Monrovia | Liberia |
| 63 | thimphu | Thimphu | Bhutan |
| 64 | pjongjang | Pjongjang | Korean demokraattinen kansantasavalta |
| 65 | yaounde | Yaoundé | Kamerun |
| 66 | portauprince | Port-au-Prince | Haiti |
| 67 | yaren | Yaren | Nauru |
| 68 | apia | Apia | Samoa |
| 69 | banjul | Banjul | Gambia |
| 70 | ouagadougou | Ouagadougou | Burkina Faso |
| 71 | abuja | Abuja | Nigeria |
| 72 | praia | Praia | Kap Verde |
| 73 | yamoussoukro | Yamoussoukro | Norsunluurannikko |
| 74 | kingston | Kingston | Jamaika |
| 75 | libreville | Libreville | Gabon |
| 76 | freetown | Freetown | Sierra Leone |
| 77 | kinshasa | Kinshasa | Kongon demokraattinen tasavalta |
| 78 | asgabat | Ašgabat | Turkmenistan |
| 79 | portonovo | Porto-Novo | Benin |
| 80 | naypyidaw | Naypyidaw | Myanmar |
| 81 | bloemfontein | Bloemfontein | Etelä-Afrikka |
| 82 | conakry | Conakry | Guinea |
| 83 | funafuti | Funafuti | Tuvalu |
| 84 | accra | Accra | Ghana |
| 85 | nukualofa | Nukuʻalofa | Tonga |
| 86 | brazzaville | Brazzaville | Kongon tasavalta |
| 87 | kingstown | Kingstown | Saint Vincent ja Grenadiinit |
| 88 | roseau | Roseau | Dominica |
| 89 | moroni | Moroni | Komorit |
| 90 | kampala | Kampala | Uganda |
| 91 | santodomingo | Santo Domingo | Dominikaaninen tasavalta |
| 92 | maputo | Maputo | Mosambik |
| 93 | stgeorges | St. George’s | Grenada |
| 94 | mbabane | Mbabane | Swazimaa |
| 95 | basseterre | Basseterre | Saint Kitts ja Nevis |
| 96 | lilongwe | Lilongwe | Malawi |
| 97 | baku | Baku | Azerbaidžan |
| 98 | kigali | Kigali | Ruanda |
| 99 | castries | Castries | Saint Lucia |
| 100 | windhoek | Windhoek | Namibia |
| 101 | antananarivo | Antananarivo | Madagaskar |
| 102 | victoria | Victoria | Seychellit |
| 103 | rawalpindi | Rawalpindi | Pakistan |
| 104 | portofspain | Port of Spain | Trinidad ja Tobago |
| 105 | gaborone | Gaborone | Botswana |
| 106 | palikir | Palikir | Mikronesia |
| 107 | tirana | Tirana | Albania |
| 108 | pristina | Pristina | Kosovo |
| 109 | saotome | São Tomé | São Tomé ja Príncipe |
| 110 | portlouis | Port Louis | Mauritius |
| 111 | southtarawa | South Tarawa | Kiribati |
| 112 | bridgetown | Bridgetown | Barbados |
| 113 | maseru | Maseru | Lesotho |
| 114 | gitega | Gitega | Burundi |
| 115 | lobamba | Lobamba | Swazimaa |
| 116 | chisinau | Chișinău | Moldova |
| 117 | podgorica | Podgorica | Montenegro |
| 118 | ciudaddelapaz | Ciudad de la Paz | Päiväntasaajan Guinea |
| 119 | hiroshima | Hiroshima | Japani |
| 120 | sapporo | Sapporo | Japani |
| 121 | nagoya | Nagoya | Japani |
| 122 | busan | Busan | Etelä-Korea |
| 123 | chengdu | Chengdu | Kiina |
| 124 | hangzhou | Hangzhou | Kiina |
| 125 | siemreab | Siĕm Réab | Kambodža |
| 126 | louangphabang | Louangphabang | Laos |
| 127 | chiangmai | Chiang Mai | Thaimaa |
| 128 | phuket | Phuket | Thaimaa |
| 129 | agra | Agra | Intia |
| 130 | jaipur | Jaipur | Intia |
| 131 | udaipur | Udaipur | Intia |
| 132 | cusco | Cusco | Peru |
| 133 | cartagena | Cartagena | Kolumbia |
| 134 | medellin | Medellín | Kolumbia |
| 135 | florianopolis | Florianópolis | Brasilia |
| 136 | boston | Boston | Yhdysvallat |
| 137 | philadelphia | Philadelphia | Yhdysvallat |
| 138 | seattle | Seattle | Yhdysvallat |
| 139 | lasvegas | Las Vegas | Yhdysvallat |
| 140 | sandiego | San Diego | Yhdysvallat |
| 141 | orlando | Orlando | Yhdysvallat |
| 142 | quebec | Quebec | Kanada |
| 143 | cancun | Cancún | Meksiko |
| 144 | oaxaca | Oaxaca | Meksiko |
| 145 | casablanca | Casablanca | Marokko |
| 146 | munchen | München | Saksa |
| 147 | hampuri | Hampuri | Saksa |
| 148 | frankfurtammain | Frankfurt am Main | Saksa |
| 149 | salzburg | Salzburg | Itävalta |
| 150 | zurich | Zürich | Sveitsi |
| 151 | milano | Milano | Italia |
| 152 | torino | Torino | Italia |
| 153 | lyon | Lyon | Ranska |
| 154 | nizza | Nizza | Ranska |
| 155 | gdansk | Gdańsk | Puola |
| 156 | split | Split | Kroatia |
| 157 | thessaloniki | Thessaloniki | Kreikka |
| 158 | antalya | Antalya | Turkki |
| 159 | glasgow | Glasgow | Britannia |
| 160 | manchester | Manchester | Britannia |
| 161 | osaka | Osaka | Japani |
| 162 | valencia | Valencia | Espanja |
