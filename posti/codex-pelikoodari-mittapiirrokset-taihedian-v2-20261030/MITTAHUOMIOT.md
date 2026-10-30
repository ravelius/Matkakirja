# Taihedian 太和殿 — mittapiirrokset v2

30.10.2026. Korjaustilaukset #1312–1313, lähde `pelikoodari-codex-mittapiirrokset-taihedian-paivitys-20261030.md`, commit `0000134685c398ecedd2ad95414169b0cf0035c4`. V2 korvaa #1303–1304:n nykyisenä omistajakorttiehdokkaana. V1-toimitus ja sen vastaanottokuittaus säilyvät historiassa. PT:n myönteinen tyyliarvio ei ole lopullinen omistajahyväksyntä.

## Kehys ja lukutapa

Pohja on 1350 × 1570 px, 8 px/m, marginaalit 70/120 px, x −75…75 ja z −95…45 m. Muunnos `u=670+8x`, `v=480−8z`.

Eteläjulkisivu on 1660 × 870 px, 10 px/m, marginaalit 80/120 px, x −75…75 ja y −2…40 m. Muunnos `u=830+10x`, `v=520−10y`.

Kuvakoko, mittakaava ja 1 m / 10 m ruudukko säilyvät. Akselikehystä ei kierretä uudelleen. SVG sisältää viivapiirroksen ja PNG saman kokoisen viennin. Palkkimaalaukset, tiilijako, ovien pintakuviot ja kaiteet ovat mitattuihin rajoihin leikattua kaaviomaista ulkoasua.

## Uudet K-rajat

| Kohde | Rajat / leveys | Lähde |
|---|---|---|
| Etupylväsrivi | 12 pylvästä, 11 tasaväliä yhteensä 63,96 m | leveys [2], tasajako tilauksen mukaan |
| Pylväskerros | y 8,95…13,6 m | alapää A, yläpää K |
| Alapalkkivyö | y 13,6…16,3 m, leveys 65,4 m, x ±32,7 | K |
| Alakatto | y 15,5…20,1 m | K; räystään x-laajuus edelleen A |
| Yläpalkkivyö | y 20,1…21,3 m, leveys 57,6 m, x ±28,8 | K |
| Yläkatto ja harja | y 20,8…35,05 m | K, pääharja myös [1] |
| Harjanauha | y 33,45…35,05 m | tilaajan uusi mittapohja |
| Chiwen-koristeen yläpää | noin 37,7 m | K |

K-arvot ovat Pelikoodarin toimittamia kuvamittauksia, tarkkuus noin ±0,6 m. Mittakaava on sidottu etupylväsrivin 63,96 metriin ja korkeusmalli harjan 35,05 metriin. Kameran etäisyyttä ja korkeutta koskevat luvut ovat lähteen menetelmäparametreja, eivät tässä erikseen varmennettuja rakennusmittoja.

Alapalkkivyö jatkuu 0,8 m alakaton alareunan yläpuolelle (15,5…16,3), yläpalkkivyö 0,5 m yläkaton alareunan yläpuolelle (20,8…21,3). Vyöt piirretään täysinä kattojen alle; peittyminen ei lyhennä niiden K-mittoja. Kattojen siluetit seuraavat uutta mittapohjaa. Rasteritarkkuus on julkisivussa 0,1 m ja pohjassa 0,125 m/pikseli; mahdolliset pyöristyserot ovat QA:ssa.

Pylväskeskiviivat ulottuvat x −31,98…31,98 m, välit ovat 63,96/11 ≈ 5,814545 m. Alapalkkivyön ulkonema uloimman pylvään keskiviivan yli on (65,4−63,96)/2 = 0,72 m, tilauksen noin 0,7 m. Yläkerroksen sivusisäänveto on (63,96−57,6)/2 = 3,18 m, lähteen noin 3,2 m. Näistä ei johdeta uutta pohjan syvyysmittaa.

## Säilyvät lähde-erot ja arviot

- Hallin 63,96 × 37,0 m koko ja 11 × 5 jännettä [2]/[1] säilyvät. Näiden tulo on 2366,52 m²; Palatsimuseon rakennusala on 2377 m². Ero ilmoitetaan, eikä hallia skaalata rakennusalan mukaan.
- Terassi on 8,13 m [1], hallin korkeus terassilta 26,92 m [1] ja pääharja 35,05 m [1]. Lattia 8,95 m on A; selitteen 8,13+0,8 tuottaisi 8,93 m. Tätä 0,02 m lähde-eroa ei korjata hiljaisesti.
- Chiwenin 3,40 × 2,68 m [2] on koko osan korkeus ja leveys. Sitä ei lisätä kokonaisena 35,05 m harjan päälle. Uusi noin 37,7 m yläpää on K; noin 2,65 m näkyvä ylitys ei ole sama kuin koko osan 3,40 m korkeus.
- Räystään ja harjan x-laajuudet pysyvät A-arvoina. Alaräystään nimellinen 68,6 × 41,9 m, pohjan x −34,7…34,0 ja z −21,8…20,1 sekä julkisivun x±34,3 eivät ole keskenään täysin samat keskus-/leveysarvot. Pohjan lähtökohtaa ei siirretä uuden palkkivyön keskityksen vuoksi.
- OSM-katon nimelliskoko on 67,3 × 39,6 m, mutta rajat x±33,7 ja z±20,1 antavat 67,4 × 40,2 m. Rajakoordinaatit säilyvät omana OSM-vertailunaan; niitä ei sekoiteta A-räystääseen.
- Terassin ylätason etuosa [3] koostuu rajoista x −33,0…32,5, z −59,7…−28,9 ja x −53,3…53,7, z −28,9…−12,5. Leveämpi osa on 107,0 m, vaikka lähtökuvan vanha mittalappu sanoo 107,5 m. JSON-rajoja käytetään kuten V1:ssä. Alemmat terassitasot ja etelän portaat z−92 ovat A.
- Terassin esineiden määrät ovat [1]: aurinkokello 1, mitta-astia 1, pronssikilpikonnat 2, pronssikurjet 2 ja pronssikattilat 18. Tarkkoja paikkoja ei ole lähteistetty, joten niitä ei keksitä pohjakoordinaatteihin.
- Lähteen 72 pylvästä ja korkein 12,7 m pylväs [2] koskevat koko hallia ja sisäpylväitä. Niitä ei käytetä 12 näkyvän etupylvään ulkokorkeutena.

## Loppupiirroksen rasteritulkinta

Uuden mittapohjan alakaton maalattu rajaus on `[487,319,687,47]` px ja yläkaton `[525,185,611,128]` px. Mittaviivojen peittämät reunakohdat palautetaan ehjiin riveihin sopivilla suorilla sivuilla; tarkat rivit ja polygonit on talletettu QA:han. Rasterin yläkaton harjanpuoli vastaa 33,50 m ja alareuna 20,70 m, kun nimelliset K-rajat ovat 33,45 ja 20,80 m. Nämä 0,05/0,10 m erot eivät muuta erikseen piirrettyjä tarkkoja palkkivyö- ja harjakoordinaatteja.

Chiwenin lähderasterin ylimmän rivin 142 ääriviiva vastaa 37,80 m; nimellinen K-huippu on 37,70 m. Lähdekuvan maalattu koriste on noin 4,4 × 2,8 m, mikä poikkeaa nimellisestä koko osan 3,40 × 2,68 m mitasta. Lähteen nostettu huippu ja ennallaan oleva alaraja säilytetään siluetissa; puuttuvaa uutta alarajaa ei keksitä. Kuvan nimellinen osakokomerkintä ja tämä rasteriristiriita ovat erillisiä tietoja.

Terassin 1,20 m A-kaiteen yläreuna on tässä 9,33 m (8,13+1,20); JSONin historiallinen 9,60 m A-kaidehuomio poikkeaa siitä. Kaide peittää etupylväiden alinta 0,38 m osuutta, mutta pylväskerros säilyy täytenä y 8,95…13,60 m kaiteen takana. Palkkivöiden syvyyttä ei ole uudessa lähteessä määrätty: pohjassa 65,40 ja 57,60 m leveydet näkyvät vihreinä selitetietoina. Niille ei ole keksitty uusia pohjapolygoneja; pohjan seitsemän V1-rakennegeometriaa säilyvät.

## Tilaajan ilmoittamat mittausmenetelmät

Alla säilytetään jokaisen K-kentän `tapa`. Pikseliluvut viittaavat tilaajan alkuperäiseen h04-työkuvaan ja rajauksiin; toimitettu kokonaisvalokuva on pienennetty 2880 px:iin. Pikselilukuja ei siirretä suoraan SVG:n koordinaateiksi. Mittausskriptit eivät ole tässä liitteenä.

- **palkkivöiden leveys:** kuva h04: päätyjen rajaus (h04-paadyt.png), alavyö x 1082–4355, yläkerroksen kulmapylväät x 1297/4131; yläkerroksen syvyys ratkaistu ehdosta sivu- = syvyyssisäänveto.
- **pylväskerros y:** kuva h04: pylväiden punainen alkaa y 2277 (pystyprofiilit x 1601/2184/2722); syvyys 188 m.
- **alaräystään palkkivyö y:** kuva h04: palkiston yläreuna päätypylväillä y 2143, alareuna y 2277; syvyys 188 m.
- **alakatto y:** kuva h04: räystään reuna keskellä y 2172 (syvyys 184,5), yläraja = yläpalkkivyön alareuna.
- **yläkerroksen seinä ja palkkivyö y:** kuva h04: vyö y 1906–1968 kulmapylväillä; syvyys 191,2 (sisäänveto 3,2 m).
- **yläkatto harjaan y:** kuva h04: yläräystään reuna keskellä y 1918 (syvyys 188,2); harja y 1346 on mallin ankkuri.

Chiwenin yläpään erillinen menetelmähuomio lähteessä: kuva h04 y=1227, syvyys 206,5. Tämäkin on tilaajan antama menetelmätieto.

## Valokuva ja lähteet

**Balon Greyjoy, “20200110 Hall of Supreme Harmony courtyard-1.jpg”, Wikimedia Commons, CC0.** Lähdesivu: <https://commons.wikimedia.org/wiki/File:20200110_Hall_of_Supreme_Harmony_courtyard-1.jpg>. CC0: <https://creativecommons.org/publicdomain/zero/1.0/>. Liitetty kokonaiskuva, päätyjen rajaus ja peli-/kuvavertailu on katsottu. Julkisivun palkkimaalausten ja ovien ulkoasu tulkitaan niistä viivapiirrokseksi; valokuvaa ei upoteta SVG:hen.

Muut lähteet: [1] Palatsimuseon 太和殿-rakennussivu, [2] Wikipedia zh 太和殿, [3] OpenStreetMap way/638449347 ja way/638449432, © OpenStreetMap contributors, ODbL 1.0, [A] pelimallin arviot. QA tarkastaa annettujen lähteiden ja toimituksen vastaavuutta, ei uutta paikan päällä tehtyä mittausta.

PK:n vertailu, PT:n arvio, omistajan julkisivukortin hyväksyntä, 3D-työ, runtime-integraatio ja julkaisu ovat erillisiä vaiheita.
