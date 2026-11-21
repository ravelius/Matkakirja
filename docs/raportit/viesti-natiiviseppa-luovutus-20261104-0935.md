# Natiivisepän luovutus 4.11.2026 klo 09.35 (konteksti 25 %, 7.37)

Korvaa luovutuksen -20261104-0652. Siitä yhä voimassa Tila-osion kohdat: suora häivytys 8d66b5865 jää haaraan, vieritys k33 mitattu, työpuu wt/proto-natiiviseppa-maskik4 (haara natiiviseppa/haivytys-aalto, puhdas). -0504:n LISÄYS 06.08 ja sen kautta -0255:n Päätökset ja HAARAT yhä voimassa (`git show 62cbff578:docs/raportit/viesti-natiiviseppa-luovutus-20261104-0504.md`). KK:n listan kohdat 2–4 (-0129) yhä aloittamatta; ND:n kermakiila on nyt KS:llä.
Id:t: /Users/Shared/Claude/osoitekirja.md. Cron Unity-beeta: luo uudelleen ("4 9 * * *", muisti unity67-paivitysseuranta); ajettu 4.11. klo 9.34, ei uutta. Vuoro aina JU:lta.

## PT:n päätökset tässä sessiossa (sitovat)
- **z13-koetta EI tehdä nyt** (PT): se korjaa vain yhden kaistan. Tämä ohittaa -0652:n seuraavan kierroksen kohdan 2.
- **Jos ennuste pitää:** selvitä yleinen korjaus koehaarassa: rasterin taso irti maastopalasta (tapa 3 CesiumTileExcluder tai muu keino). API ensin, sitten muisti ja vieritys. Jos ei onnistu kohtuudella: z13-koe palaa ja rivi PT:lle.
- **Jos ennuste ei pidä:** palataan vaihtumattomaan palaan.
- Lohkot katsotaan lopuksi k44:n kuvasta (k44 muuttaa tyylieroa z15 | z16). k34:n paikka jonossa ei muutu.
- **1,75 km koealueelle on KK:n päätös,** PT vei sen sinne suosituksella "kyllä, jos terävyys kelpaa". Ei koodia ennen sitä; mahdollinen koe vasta k34:n jälkeen.

## Odottaa JU:ta
1. **Rivi 168 -ajo ff97c7f8c, kuvia 0 klo 09.34.** Kolme ajoa kaatui launch error 22:een (CoreDeviceError 10002), myös esikäynnistyksellä; syy auki, paketti kunnossa. Uusi ajo JU:n jonossa yhd5:n ja pk-koe-laitteen jälkeen, rivi kun kuvat on katsottu. Kansio lokit/julkaisija-rivi168-ff97c7f8c (vanha-* ovat mitättömiä), skenaario _tyo/natiiviseppa/aluekuva-koko/sk-rivi168-todiste.txt. Skenaarion lopussa uudet kuvat m-lohko-0-027, -030, -034.
   - **Vertaa rivi 168:** rivi168-ennuste.txt (malli-ennuste.py), saumat pysyvät maantieteellisillä rajoilla, kun keskus siirtyy.
   - **Vertaa lohkot, Jussieun keskus:** 0,027 ei lohkoja, 0,030 neljä kulmaa, 0,034 enemmän ja koko alarivi. Tarkistus: lohko-malli.py (kuvat ja keskukset koodissa, zoom toisena argumenttina; muuta KUVAT uusille kuville).
   - Rivi PT:lle.
2. **Vieritys k34** (JU, PT:n käsky: yhd5 → c3ba9742c → k34 → yhd6; sk-vieritys-k34.txt, piikit ≥ 33 ms). Erittele pitkät ruudut 0,05:llä ja 0,13:lla: lataus vai piirto (fps60/vieritys-osat.py, piikit.py kopioi tarvittaessa). Runko on eri kuin k33:ssa, ja JU:n mukaan piikit-ikkuna voi jäädä viimeisen heiton lopusta vajaaksi. Ei korjausta ennen erittelyä (PT).
3. **Samalla k34:n kanssa (PT):** palan piirtokulu: rivi PT:lle ja VS:lle, mikä sen tekee. Ei omaa ajoa ennen k34:ää.

## Tehty tässä sessiossa (koodia ei muutettu; tiedostot _tyo/natiiviseppa/aluekuva-koko/)
- **Lähin zoom, lahin-zoom-havainto.md (KORJAUSLISTA yhd2/12):** kuvissa kamera pysähtyy noin 0,014:ään (2,09 km iPadilla), koska skenaariossa on `karikatyyri pois` → 0,625. Pienemmät zoomit (0,012, 0,005, 0,004) ovat sama mittakaava. Mitattu 1 kuvaparilla noin 2,0 km (lahin-mittakaava.py). **Pelaajalla (Karikatyyri oletuksena päällä, koealue päällä) keskustassa 0,525 = 1,75 km, itään lon 2,4216:sta 2,09 km** (PiirrosKerros.cs:305 ei katso Koealuetta; vain koodista, ajamatta). KK on arvioinut lähizoomin 2,09 km:llä; 1,75 km:n terävyyttä ei ole nähty. Koe ei vaadi koodia: sama ajo ilman riviä `karikatyyri pois`. Kerrottu PT:lle.
- **Sumeat kulmalohkot z16:lla (VS k45/yhd5), lohko-havainto.md:** maastopala jää kulmassa L14:lle, sama syy kuin rivi 168, ei latausjono. Kaava ilman sovitusta: SSE ≤ 2,45 kulmat 10/10 sumeita; ecole ja pitie ilman lohkoja kuten ennustettu. Kaksi poikkeamaa rajan tuntumassa (2,47 ja 2,49 terävät), käytännön raja noin 2,46. Rasterin taso päätelty, ajolla ei vielä todistettu. Sama toistuu kaistoilla 0,11–0,14, 0,055–0,07, 0,0275–0,035, 0,014–0,0175 (toinen ja neljäs katsomatta; lähin zoom 0,0141 on neljännen reunalla).
- **Piirtokulu (KS:n havainto):** yhd2 → yhd5 ei ole hidastuma: yhd2:n 30/95 ms on n = 3/8. Sama sha a6c11c1d2 ensiajossa 467/687 ms (n 52/149), yhd5 459/684 (n 35/118). z13/z14 mediaani: k24 46/236, f5c1 42/87, k28 235/685. Ehdokas k28:n korttelipinta, ei todistettu (seinäkelloa, rinnakkaisia piirtoja ei vakioitu). Kerrottu PT:lle ja VS:lle.

## Avoimet API-tiedot yleiseen korjaukseen (ei vielä katsottu)
Cesium-paketti ei ole proto-3d:n Library/PackageCachessa, etsi muualta. Muistista, tarkistamatta: rasterin taso lasketaan maastopalan geometrisesta virheestä ja koosta (RasterOverlayUtilities.computeDesiredScreenPixels, overlayn maximumScreenSpaceError), joten sen muuttaminen siirtää kaistaa eikä poista sitä. Tile-kohtainen vaihtoehto CesiumTileExcluder. Laattapalvelin on oma paikallinen palvelin, joten se voi vastata mihin tahansa z/x/y-pyyntöön.

## Sen jälkeen
-0504:n järjestyksessä: sävyero (vasta TF 217 -kuvan jälkeen), puut laajoissa zoomeissa (KS; KK: ei vielä NS:lle), KK:n listan kohdat 3–4.
