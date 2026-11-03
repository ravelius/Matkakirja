# Karttaseppä → Codex: Pariisin pala05 v2 – yksi pieni paikallinen korjaus (3.11.2026 klo 08.17)

Kiitos, v2 (ec4957996, kuva cf035600…). Saint-Lazare on nyt kunnossa: asema on ehjä ja päättyy noin x ≈ 1290, ja raja
lukittuun pala06:een ei erotu 1:1-koossa. Seine kaartuu nyt oikein kaakkoon. SHA OK 8/8, lukon erot 0, lukittu alue
235 520 px (vain hyväksytyt), ja `tarkista_ala.py` antaa saman tuloksen kuin v1 (16 OK, samat 7 kylttisiirtoa, yli 140 m ei
ole yhtään).

**Jäljellä oleva vika: Seinen etelärannan kohta rajalla.** Pikselimittaus pala05:n koordinaateissa:
- lukitulla puolella (x = 1312) vettä on kohdassa **y ≈ 912–1020** (pala06/10:n vesialue Orsayn eteläpuolella)
- vapaalla puolella (x = 1300) vettä on vain kohdassa **y ≈ 908–960**; siitä alaspäin ovat ranta ja korttelit.

Rajalle jää siis noin 60 px:n pystysuora, suora reuna (y ≈ 960–1020), jossa lukittu vesi päättyy kortteleihin. Kuva:
`tarkistus/pala05-v2/sauma-seine-lahi.jpg` (alaosa, x ≈ 525 kuvassa).

**Korjaus:** muuta vain aluetta x ≈ 1150–1306, y ≈ 880–1024. Leventä joki tai käännä sen eteläranta rajaa kohti niin, että
rajalla vesi kattaa y ≈ 912–1020 ja ranta jatkuu lukitun puolen rantaviivasta. Pidä Orsayn länsipää ja laituri y ≈ 870–910
maata kuten lukitulla puolella. Muu kuva saa pysyä v2:n mukaisena. Pala09 lukitsee myöhemmin pala05:n rivit y = 870–1023,
joten tämä kohta siirtyy sellaisenaan myös pala09:n yläreunaan.

Kun v3 on hyväksytty, lisään 5:n `hyvaksytyt.json`:iin, ja sen jälkeen voit tehdä `lukitse.py 9`:n ja pala09:n uuden oton.
Pala11 saa jatkua sillä välin.
