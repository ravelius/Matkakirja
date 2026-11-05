# Eiffel24c: tarkistuspaketti, ei hyväksytty peliin

Tilaukset #2108 ja korjaus #2109. **Suhdeportti ei läpäise: kaksi alinta tasannetta ovat liian leveitä.** Kaksi mallin generointia on käytetty. En tee kolmatta ennen Karttasepän ohjetta. Vastaanotto, omistajan hyväksyntä ja pelikytkentä ovat vielä tekemättä. Tämä paketti on mitattava päätöspohja, ei valmis hyväksytty assetti.

LIIKE: ei liikettä. Kartan esine; ei luurankoa eikä animaatioita.

## Mitä tehtiin

Front=pohjoinen.png, Left=ita.png, Right=lansi.png, Back=pohjoinen.png. Tripo hyväksyi saman pohjoiskuvan kahteen paikkaan. Etelää, viistoja, yläkuvaa tai oikea.jpg:tä ei käytetty generoinnin syötteenä. Syötteen esikatselussa ei näkynyt peilattuja tai kahdennettuja jalkoja.

Otto 1: H3.1 HD, Ultra Mesh, Triangle, 50k tavoite, PBR, 2K, Remove Lighting, ei Parts/8K. 48 866 kolmiota. Hylätty: antenni puuttuu ja pohjan 300 m yhtenäisskaalauksessa korkeus jää 715,69 m:iin. Ei kevennetty.

Otto 2: samat syötekuvat/asetukset, tavoite 100k. Antenni säilyi. Neljä jalkaa ja neljä suurta alakaarta ovat näkyvissä. Suuret aukot ovat geometriaa; yläosan pienempi ristikko on osin umpinaista teksturoitua pintaa, kuten tilaus sallii pienille aukoille. Ei näkyviä ylimääräisiä maatasoja, ihmisiä tai kelluvia osia. Ensimmäinen tasanne on yhtenäinen eikä koillisen lähdekuvan virheaukkoa ole kopioitu.

Tripo-kevennys: Triangle, Smart Mesh pois lähetyshetkellä, tavoite 28k; tulos 28 098. Antenni, neljä jalkaa, kaaret ja suurimmat aukot säilyvät. Tarkassa katselussa tasanteisiin ja jalkojen ristikoihin tulee venyneitä kolmionmuotoisia tekstuurilaikkuja. Kevennetty ei ole automaattinen suositus päämalliksi. **eiffel.glb on oton 2 raaka; eiffel-kevyt.glb on erillinen vertailu.** Molemmat jäävät suhteiden vuoksi hyväksymättä.

Paikallisesti tehtiin vain yhtenäinen skaalaus ja pohjan keskitys (positiivinen sama kerroin kaikille akseleille). Muotoa, UV:tä, kolmioita tai upotettuja tekstuureja ei muokattu. +Y ylös; minY=0; X/Z-pohjakeskus=0; skaala sovellettuna. Raaka: 300 × 297,336 m pohja, korkeus 794,763 m. Kevyt: 300 × 297,308 m pohja, korkeus 795,517 m. Neliöpohjan noin 0,9 % ero säilytettiin; akseleita ei venytetty erikseen.

## Sitovat suhteet ja havaittu ristiriita

B on X/Z-pohjaleveyden keskiarvo 298,668 m; H on koko korkeus antennin kärkeen. Tasanteiden korkeus mitattu pääosin ylöspäin suuntautuvista tasannepinnoista; leveys on tasanteen ulkoreunan kaistan X/Z-keskiarvo. Kolmas tasanne on Y≈670,85 m. Sen alapuolinen rengas Y≈610 m ei ole kolmas tasanne. JSON sisältää menetelmän, kaistat ja mitat.

| Suhde | Tilaus | Otto 2 | Suhteellinen ero | ±5 % |
|---|---:|---:|---:|---|
| B/H | 0,38 | 0,3758 | −1,1 % | OK |
| 1. tasanteen korkeus/H | 0,17 | 0,1758 | +3,4 % | OK |
| 2. tasanteen korkeus/H | 0,35 | 0,3426 | −2,1 % | OK |
| 3. tasanteen korkeus/H | 0,84 | 0,8441 | +0,5 % | OK |
| 1. tasanteen leveys/B | 0,52 | 0,6469 | +24,4 % | EI |
| 2. tasanteen leveys/B | 0,32 | 0,3883 | +21,3 % | EI |
| 3. tasanteen leveys/B | 0,14 | 0,1418 | +1,3 % | OK |

Pohjoisen lähdekuvan likimääräinen pikselimittaus antaa tasanteille noin 0,634/0,343/0,126 B. Se ei ole kalibroitu geometrinen mittaus, mutta etenkin alin tasanne on lähteessäkin selvästi tekstin 0,52 B:tä leveämpi. Tripo levennätti lisäksi toista tasannetta suhteessa tähän kuva-arvioon. **Ei väitetä, että malli seuraisi kaikkia lähdesuhteita tarkasti.** Pelkkä uusi saman syötteen generointi ei ratkaise kuvan ja tekstin ristiriitaa luotettavasti.

Karttasepältä tarvitaan rajattu ratkaisu: hyväksytäänkö nämä mitatut leveydet poikkeamina, vai korjataanko kuvalähteet kirjallisiin suhteisiin ennen mahdollista uutta sallittua ottoa? Suosittelen ratkaisemaan ensin tämän, ei kolmatta samanlaista generointia.

## Tekniikka ja UV

| Asia | Raaka | Kevyt |
|---|---:|---:|
| Kolmiot | 97184 | 28098 |
| Kärjet (GLB) | 84396 | 35805 |
| Tavut | 6821068 | 3669448 |
| Materiaalit | 1 | 1 |
| Primitiivit | 1 | 1 |
| Nolla-UV-kolmiot | 271 | 158 |
| Nolla-UV-kolmioiden 3D-ala | 76.3008274065651 | 815.9413598372364 |
| Koko 3D-pinta-ala | 506882.5469563464 | 514236.1402739753 |
| Nolla-UV-alan osuus | 0.01505 % | 0.15867 % |

Raaka: 3 upotettua 2048² tekstuuria. Kevyt: 2048², 1024² ja 512². Opaque, ei Draco/meshoptia, ei ulkoisia tiedostoja. UV-nolla määritelty |2D-ristitulo|≤1e−12. Kevennyksessä nolla-UV-pinta-ala kasvoi noin 10,7-kertaiseksi, vaikka nollakolmioiden lukumäärä pieneni. Ei Louvren kaltaista laajaa mustaa romahdusta; pieni määrä tummia pikseleitä ja tekstuurin venymistä on todellinen laatuhuomio.

Mustat pikselit = kaikki RGB-kanavat <16, 1100×1100 pikselin esikatselu, sama kevyt teksturoitu CPU-rasterointi molemmille. Tämä ei simuloi pelimoottorin PBR-materiaaleja; vastaanottajan on tarkistettava pelissä. Numero ei yksin todista UV:n tai valaistuksen virheettömyyttä. Kaikki 14 oton 2 kuvaa katsottiin täysikokoisina. Myös ensimmäisen oton 7 kuvaa katsottiin.

| Kuvakulma | Raaka mustat px | Kevyt mustat px |
|---|---:|---:|
| etela | 0 | 31 |
| pohjoinen | 0 | 65 |
| ita | 0 | 1 |
| lansi | 0 | 46 |
| ylhaalta | 0 | 6 |
| pelikulma-lounas | 0 | 4 |
| pelikulma-koillinen | 0 | 2 |

Neljä sivukuvaa ovat ortografisia. Lounas ja koillinen on renderöity 60° horisontista; lähdeviistojen noin 46°/58° ero ei ole mallin suhdevirhe. Näiden kuvat ovat mallin esikatseluja, eivät pelistä otettuja kuvia.

## Jobit ja kustannukset

| Vaihe | Job ID | Krediitit |
|---|---|---:|
| Otto 1 | 6affa7b4-d490-435a-9aa7-653ed2652e3d | 45 |
| Otto 2 | 44b64a26-5de4-4501-891d-5a28f344d5cb | 45 |
| Oton 2 kevennys | sama työtila; erillistä job-ID:tä ei näytetty | 5 |
| Yhteensä | saldo 16115 → 16020 | 95 |

Työ alkoi 5.11.2026 klo 14.16 UTC. Otot käynnistyivät 14.19 ja 14.23 UTC; raakaversiot ladattu 14.21 ja 14.26 UTC. Kevennys valmis ja ladattu viimeistään 14.34 UTC. Kaikki tiedostot T7:llä, selaimen tunnetut lataukset siirretty sinne tiivisteet tarkistaen. Ei ostoja, muita Pariisin kohteita, peli-/git-työpuumuutoksia eikä raskaita Blender-renderöintejä.

Tekninen portti ajetaan pakettiin ennen postitoimitusta. Portin tulos tallennetaan technical-check.json:iin; se ei arvioi yllä kirjattuja suhteita, UV-laatua eikä hyväksy mallia peliin.
