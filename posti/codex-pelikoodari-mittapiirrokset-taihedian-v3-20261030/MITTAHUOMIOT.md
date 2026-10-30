# Taihedian 太和殿 — mittapiirrokset v3

30.10.2026. Korjaustilaus #1319, lähde `pelikoodari-codex-mittapiirrokset-taihemen-taihedian-v3-20261030.md`, commit `2ebad2c2edf326deeffd73f7796bd12fbe969bfa`. KK palautti V2-julkisivun terassin etuosan porrastuksen vuoksi. V2-toimitus `0cb0755c6e0273ce26f7ab9ac41291452d9960b4` ja aiempi historia säilyvät; V2 ei ole lopullisesti omistajan hyväksymä. Hallin ja kattojen V2-mitat sekä kehykset säilyvät. Pohjaan lisätään mahtuva porraskaavio.

## Kehys ja lukutapa

Pohja on 1350 × 1570 px, 8 px/m, marginaalit 70/120 px, x −75…75 ja z −95…45 m. Muunnos `u=670+8x`, `v=480−8z`.

Eteläjulkisivu on 1660 × 870 px, 10 px/m, marginaalit 80/120 px, x −75…75 ja y −2…40 m. Muunnos `u=830+10x`, `v=520−10y`.

Kuvakoko, mittakaava ja 1 m / 10 m ruudukko säilyvät. Akselikehystä ei kierretä uudelleen. SVG sisältää viivapiirroksen ja PNG saman kokoisen viennin. Palkkimaalaukset, tiilijako, ovien pintakuviot ja kaiteet ovat mitattuihin rajoihin leikattua kaaviomaista ulkoasua.

## V2:sta säilyvät hallin K-rajat

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

## Kolme terassitasoa, kaiteet ja portaat

Terassin etupinnat esitetään kolmena selvästi näkyvänä porrastettuna tasona. Alin pinta ulottuu maasta y 3,10 m [A]:iin, keskimmäinen y 3,10…5,30 m [A] ja ylin y 5,30…8,13 m [1]. Hallin ylimmän terassin 8,13 m kokonaiskorkeus säilyy. Uudet alemmat korkeudet korvaavat V2:n 3,0/5,2 m A-tasot.

Leveydet säilyvät V2:n mukaisina: alatason x −67,8…67,1, keskitason −60,1…59,5 [A] ja yläetuosan −53,3…53,7. Jälkimmäinen perustuu V2:n OSM-etuosan koordinaatteihin [3], mutta sen soveltaminen julkisivun tason etupinnaksi on piirrosmallin valinta; koko terassiprofiilia ei esitetä uutena mitattuna OSM-korkeusmallina. Tilaus nimeää säilyvät leveydet A:ksi. Jokainen etupinta piirretään vain oman tasonsa korkeuserolle, jotta ylempi pinta ei peitä kahta alempaa.

Jokaisella reunalla on tilauksen 1,10 m marmorikaide ja pylväät noin 2 m välein. Kaiteiden ylärajat ovat 4,20 / 6,40 / 9,23 m. Ne korvaavat V2:n 1,20 m kaiteet; lähde-JSONin vanha historiallinen 9,60 m kaidehuomio ei ole uusi yläraja. Yläkaide peittää etupylväiden alinta 0,28 m (9,23−8,95), mutta täysi hallin pylväsrakenne säilyy kaiteen takana. Pylväsjako ja kivipinnan kaavioviivat eivät ole uusia tarkasti mitattuja osia.

Portaat ja ramppi kulkevat maasta 8,13 m:iin kaikkien tasojen läpi. Niiden x-välit ovat:

| Osa | x-väli m | Tulkinta |
|---|---|---|
| Lännen sivuporras | −16,00…−10,50 | 5,50 m [K] |
| Keskiryhmän länsiporras | −3,80…−1,50 | 2,30 m [K] |
| 御路-keskiramppi | −1,50…1,50 | 3,00 m kivilaatta [K], ei askelmia |
| Keskiryhmän itäporras | 1,50…3,80 | 2,30 m [K] |
| Idän sivuporras | 10,50…16,00 | 5,50 m [K] |

Keskiryhmä on yhteensä 7,60 m. Portaat merkitään vaakaviivoin, mutta 御路 on yhtenäinen veistetty kivilaatta; sen pinnassa ei ole askelviivoja. Kulkukaistat eivät sulkeudu tasanteiden poikittaisiin kaiteisiin. Porraskaistojen K-tarkkuus on noin ±1 m, erillään hallin ±0,6 m arviosta. Askelmäärää tai tarkkaa askelkorkeutta ei lähteessä anneta, joten viivajako on kaavio.

Pohjaan porraskaistat mahtuvat. Niiden K-x-rajat sijoitetaan A-alareunan z −92,0 ja OSM-yläetuosan z −59,7 väliin **A/OSM-sijoituskaaviona**. Tämä 32,3 m graafinen väli ei ole uusi mitattu porrassyvyys tai kaltevuus. Välitasojen z-paikkoja ei päätellä eikä uutta mitattua pitkittäisprofiilia väitetä. Muut pohjan V2-rakennegeometriat säilyvät.

Uusi menetelmä: kuva h04: ryhmien reunat rivillä y ≈ 2900 (orig. px), tasojen etutason syvyys ≈ 150 m → 0,0159 m/px; ±1 m. Viivaimellinen `h04-terassi.png` on katsottu; sen pysty-/syvyysperspektiiviä ei siirretä sellaisenaan ortografiseen piirrokseen.

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

V3:n kaiteet ja niiden uusi 9,23 m yläraja on kuvattu edellä. Palkkivöiden syvyyttä ei ole uudessa lähteessä määrätty: pohjassa 65,40 ja 57,60 m leveydet näkyvät vihreinä selitetietoina. Niille ei ole keksitty uusia pohjapolygoneja; pohjan seitsemän V2-rakennegeometriaa säilyvät.

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

**Balon Greyjoy, “20200110 Hall of Supreme Harmony courtyard-1.jpg”, Wikimedia Commons, CC0.** Lähdesivu: <https://commons.wikimedia.org/wiki/File:20200110_Hall_of_Supreme_Harmony_courtyard-1.jpg>. CC0: <https://creativecommons.org/publicdomain/zero/1.0/>. V2:n kokonaiskuva, päätyjen rajaus ja peli-/kuvavertailu sekä V3:n uusi viivaimellinen terassirajaus on katsottu. V3:ssa lisätään terassin etupintojen porrastus, kaiteet, portaat ja 御路-kivilaatta. Julkisivun palkkimaalausten ja ovien ulkoasu tulkitaan niistä viivapiirrokseksi; valokuvaa ei upoteta SVG:hen.

Muut lähteet: [1] Palatsimuseon 太和殿-rakennussivu, [2] Wikipedia zh 太和殿, [3] OpenStreetMap way/638449347 ja way/638449432, © OpenStreetMap contributors, ODbL 1.0, [A] pelimallin arviot. QA tarkastaa annettujen lähteiden ja toimituksen vastaavuutta, ei uutta paikan päällä tehtyä mittausta.

PK:n vertailu, PT:n arvio, omistajan julkisivukortin hyväksyntä, 3D-työ, runtime-integraatio ja julkaisu ovat erillisiä vaiheita.
