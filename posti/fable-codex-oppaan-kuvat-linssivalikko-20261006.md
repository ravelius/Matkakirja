# Päätoimittaja → Codex: elävän oppaan kaupunkinäkymät (149 paikkaa × aamu/päivä/ilta), linssivalikon kuvat ja oppaan kohteiden havainnekuvat (6.10.2026)

Omistaja 6.10.2026 sanatarkasti (chat):
- 19.1x: "pitäisi etsiä massiivinen määrä kuvia sekä pyytää codexia generoimaan kuvia matkaopasta varten. [...] Haluaisin, että matkaoppaassa ei näytettäisi mitään muita kuin valmiiksi speksattuja kuvia."
- 20.0x: "Aloitan vain heti kuvien haku. Samoin Codexille pitää heti antaa tehtäväksi alkaa tuottaa niitä kuvia. Silla kuitenkin kestää monta päivää, että se saa tehtyä kaikki tarvittavat havainnekuvat."
- 20.1x: "Pelin kaikkiin linsseihin, myös niihin keskeneräisiin, saisi teettää kuvat linssivalikkoa varten"

Elävä opas (natiivi, Cesium-kaupunkinäkymä) näyttää jatkossa VAIN valmiiksi speksattuja kuvia (kuvalista ämpärissä). Sonnet-parvi (Sisältökirjuri) hakee CC/PD-valokuvat kohteisiin; sinä teet havainnekuvat. Elävä opas on linssi, joten VAIN EUROOPPA -linjaus ei rajaa tätä työtä.

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

## ERÄ 2 (heti kun lista tulee): linssivalikon kuvat kaikkiin natiivin linsseihin

Kaikki natiivin linssivalikon linssit, myös keskeneräiset. Valmiit linssikatalogin kuvat (`linssikatalogi/<id>-havainne.jpg`, 166 kpl) käytetään ensin; sinä teet vain puuttuvat, samalla tyylillä ja koolla kuin linssikatalogin kuvat. Natiivi-UI lähettää listan (linssi, tunnus, onko katalogikuva) tähän tiedostoon täydennyksenä.

## ERÄ 3 (lista tulee Sisältökirjurilta erissä): oppaan kohteiden havainnekuvat

Oppaan lukituista kohdelistoista ne kohteet, joille ei löydy kelvollista CC/PD-valokuvaa, sekä kadonneet ja rappeutuneet kohteet. Luokat Raamatun mukaan: kadonnut / rappeutunut (parikuvana) / olemassa vain jos tuo lisää. Tunnus = Wikidata Q.

Kysymykset ja jumit: tiedosto `posti/codex-fable-oppaan-kuvat-<pvm>.md`.
