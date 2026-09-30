# Livian avaruuskävelyasu (30.9.2026)

Pulun nykyinen SVG-pää ja `livia-astronauttikypara-2x.png` säilyvät. `js/livia-eva.js` piirtää puvun, repun, rintapaneelin, turvaköyden ja kolme erillistä valoryhmää samoihin `js/livia-svg.js`-paperinuken koordinaatteihin. Varjossa oleva peruskuva sisältää puvun, nykyiset kasvot ja visiirin, mutta ei valoja tai köyttä.

Webin `astronautti: true` pukee EVA-asun. Ryhmien voimakkuutta voi säätää `.livia-lentonayttamo`-elementin CSS-muuttujilla `--livia-eva-kasvovalo`, `--livia-eva-kyparalamput` ja `--livia-eva-maavalo` (0–1). `evaValot: false` sammuttaa kaikki valoryhmät ja `evaTether: false` jättää turvaköyden pois, esimerkiksi kerrosvientiä varten. Nykyinen viiden sekunnin, 5 px:n ja ±3°:n leijunta sekä puheen aikainen pysähdys jäävät `css/satelliitti.css`:ään.

Natiivin läpinäkyvät 2× PNG:t ovat kaikki 304 × 608 pikseliä ja vastaavat samaa 152 × 304 SVG-näkymää. Aseta kerrokset samaan suorakulmioon ilman omaa siirtoa tai skaalaeroa tässä järjestyksessä:

1. `assets/livia/livia-eva-turvakoysi-2x.png` hahmon taakse.
2. `assets/livia/livia-eva-perus-2x.png`.
3. `assets/livia/livia-eva-kasvovalo-2x.png`.
4. `assets/livia/livia-eva-kyparalamput-2x.png`.
5. `assets/livia/livia-eva-maavalo-2x.png`.

Valot ovat itsenäisiä alpha-kerroksia päivä/yö-säätöä varten. Köysi on oma alpha-kerroksensa. Natiivin Cupola-kytkentä kuuluu Linssisepälle; webin tilakytkentä kuuluu Päätoimittajalle. Tässä haarassa ei nosteta versiota eikä julkaista peliä. Puku ja valot ovat omaa vektoripiirrosta, eikä niissä ole tekstiä tai kolmannen osapuolen kuvia.
