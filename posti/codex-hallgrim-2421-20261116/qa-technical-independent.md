# Hallgrímskirkja 2421 — riippumaton tekninen tarkistus

Tarkistin lukemalla `measure_osm_tower.py`, `correct_proportions.py`, `correction-report.json` sekä lähde- ja ehdokas-GLB:n rakenteen. En ajanut korjausskriptiä enkä muuttanut mallia.

## OSM-mitta

Pääskriptin mittaustapa on toistettavampi kuin aiempi käsilaskuni: se käyttää samasta koko rakennuksen footprintista johdettua WGS84-tangenttitason akseliprojektiota ja kaikkia torneihin kuuluvien outer-way-jäsenten solmuja. Arvot ovat 9,398963496 m syvyyttä ja 9,548284490 m poikittain. Korjasin aiemman lähdemuistiinpanoni vastaamaan näitä arvoja; sen 9,6 × 9,9 m oli karkea paikallinen asteapproksimaatio.

## Korjausskriptin logiikka

- Ehdokas on sama yksimeshinen, yksiprimitivinen glTF kuin lähde: POSITION=accessor 0, NORMAL=1, TEXCOORD_0=2, indices=3. Skripti päivittää vain POSITION- ja NORMAL-tavut; tarkistaa muiden BIN-alueiden identtisyyden; ei muuta indeksejä, UV:ita, materiaaleja tai tekstuuritavuja.
- Root-node skaalaus ja siirto huomioidaan: pisteet muunnetaan world-koordinaatteihin, muokataan, ja viedään takaisin local-koordinaatteihin. Raportin XYZ-rajat säilyvät.
- Syvyyden paloittainen muunnos on jatkuva ankkurissa `z=24.8` ja etuankkurissa `z=31.75`; raportin samojen viitepisteiden syvyys osuu OSM-tavoitteeseen 9,398963496 m. Nave-harjan muunnos tavoittaa 27,9375 m (= 74,5 × 0,375) ja yhtyy jatkuvasti muuttumattomaan yläalueeseen kohdassa y=40.
- Y- ja Z-venymät sekä Z-riippuvainen Y-muunnos muodostavat Jacobin, jonka determinantti on `dy*dz`. Skriptin koodissa normaalit muunnetaan sen käänteistranspoosilla world-avaruudessa, sitten skaalataan takaisin local-avaruuteen. Raportin pienimmät diagonaaliderivaatat ovat positiiviset (0,8049 ja 0,92268), joten ilmoitettu muunnos ei käännä orientaatiota.
- Raportin mukaan aiempi 2387/2418 ja uusi Tripo-ajo säilyvät koskemattomina; lähdehash on lukittu ja tarkistetaan uudelleen. Ehdokkaan SHA ja geometriaarvot ovat raportissa, mutta tässä tarkastuksessa niitä ei varmennettu ajamalla skriptiä.

## Rajaukset / KK:lle seurattavat kohdat

- OSM-tornin 9,399 m on erillisen building-part-polygonin koko pohjajalanjäljen akseliulottuma. Skripti sovittaa saman leveyden mallin vertex-joukon korkeustasoon y=40–45 m. Se on käyttökelpoinen paikallinen mittatavoite, mutta polygonin ja tämän ylemmän korkeuskaistan vastaavuus on mallinnusoletus; OSM ei määritä erillistä poikkileikkausta tuolla korkeudella.
- UV:t pysyvät samoina, vaikka geometriaa siirretään epäuniformisti. Koodissa ei ole matemaattista estettä tai virhettä, mutta lopullinen tekstuurin venymä ja alempien torniseinien/naven liitos on tarkistettava renderistä. Tämä jää visuaalisen QA:n vastuulle.
- Raportissa `orientationPreservingJacobian=true` on koodin ehtojen perusteella oikein, mutta se tarkoittaa paikallisen muunnoksen orientaation säilymistä; se ei yksin todista pinnan laatua, detaljien mittasuhteita tai visuaalista saumattomuutta.

En löytänyt lukemastani skriptistä selvää koordinaatti-, jatkuvuus-, normaalimuunnos- tai alkuperäisdatan ylikirjoitusvirhettä. Visuaalinen tarkastus ja KK:n päätös ovat yhä tarpeen.
