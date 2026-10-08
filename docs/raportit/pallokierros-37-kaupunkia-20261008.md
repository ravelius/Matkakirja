# Pallokierros 37 kaupungissa (Linssiseppä 8.10.2026, juna 168)

Päätoimittajan erä: LS2:n Pariisin pallotestit datavetoisesti kaikkiin 37 oppaan esittelykaupunkiin Ydin-tasolla (OpasSilmukka pallotilassa, ei simulaattoria). Proto-haara `linssiseppa/pallo-kaupungit-168` d90c99f1e (7df28c8c4:n päällä), testi `Linssit-testit/Testit/PalloKaupungitTestit.cs`, data `Linssit-testit/kultaiset/opas-kierrokset-20261008.json`:
- järjestys: workerin /opas/liiku "kierros" (#4196)
- paikat: liiku-kohteet
- koko, korkeus ja luokka: esittely
- kerronnan kesto: lyhyen tekstin pituus

Kaksi verkkoa kuten Pariisissa (nopea; hidas = laatat 95 %, kohde valmis 2,5 s lennon jälkeen). Taulukossa pahin kahdesta.

Rajat:
- taaksepäin enintään 1 m
- seisahdus enintään 3 s, kun seuraava on tiedossa (leijunta kaaren päässä ei ole seisahdus, omistaja 18.4x)
- kehys enintään 1,05 × saapumisetäisyys
- sauman nopeushyppy enintään 0,1 m/s ja kiihtyvyyshyppy enintään 1 m/s²
- nykäys pysähdyksellä enintään 5 m/s
- kääntö enintään 10 °/s

## Tulos: kaikki 37 kaupunkia virheettä

| Kaupunki | kohteita | taaksepäin m | seisahdus s | kehys × | sauma Δv m/s | Δa m/s² | nykäys m/s | kääntö °/s | kierto ° | viat |
| Pariisi | 8/8 | 0,0 | 1,0 | 1,00 | 0,00 | 0,36 | 4,3 | 6,9 | 289 | 0 |
| Praha | 8/8 | 0,0 | 1,9 | 1,00 | 0,00 | 0,31 | 4,3 | 5,9 | 280 | 0 |
| Wien | 8/8 | 0,0 | 1,2 | 1,00 | 0,00 | 0,31 | 4,3 | 7,0 | 258 | 0 |
| Rooma | 8/8 | 0,0 | 1,1 | 1,00 | 0,00 | 0,32 | 4,3 | 6,1 | 300 | 0 |
| Lontoo | 8/8 | 0,0 | 1,5 | 1,00 | 0,00 | 0,31 | 4,3 | 5,6 | 266 | 0 |
| Kööpenhamina | 8/8 | 0,0 | 0,9 | 1,00 | 0,00 | 0,29 | 4,3 | 6,7 | 279 | 0 |
| Amsterdam | 8/8 | 0,0 | 1,0 | 1,00 | 0,00 | 0,28 | 4,3 | 4,9 | 265 | 0 |
| Ateena | 8/8 | 0,0 | 1,1 | 1,00 | 0,00 | 0,29 | 4,3 | 5,8 | 243 | 0 |
| Barcelona | 8/8 | 0,0 | 1,0 | 1,00 | 0,00 | 0,32 | 4,3 | 8,0 | 297 | 0 |
| Bergen | 8/8 | 0,0 | 1,2 | 1,00 | 0,00 | 0,32 | 4,3 | 7,8 | 297 | 0 |
| Berliini | 8/8 | 0,0 | 0,9 | 1,00 | 0,00 | 0,33 | 4,3 | 7,3 | 279 | 0 |
| Bryssel | 8/8 | 0,0 | 1,3 | 1,00 | 0,00 | 0,18 | 3,1 | 8,9 | 283 | 0 |
| Budapest | 8/8 | 0,0 | 0,8 | 1,00 | 0,00 | 0,29 | 4,3 | 6,6 | 287 | 0 |
| Bukarest | 8/8 | 0,0 | 1,0 | 1,00 | 0,00 | 0,29 | 4,0 | 8,1 | 266 | 0 |
| Dublin | 8/8 | 0,0 | 1,0 | 1,00 | 0,00 | 0,28 | 4,3 | 5,8 | 278 | 0 |
| Edinburgh | 8/8 | 0,0 | 1,2 | 1,00 | 0,00 | 0,33 | 4,3 | 4,4 | 269 | 0 |
| Firenze | 8/8 | 0,0 | 1,2 | 1,00 | 0,00 | 0,19 | 3,0 | 7,5 | 298 | 0 |
| Granada | 8/8 | 0,0 | 1,4 | 1,00 | 0,00 | 0,28 | 4,3 | 6,6 | 253 | 0 |
| Helsinki | 8/8 | 0,0 | 0,9 | 1,00 | 0,00 | 0,22 | 2,9 | 6,9 | 300 | 0 |
| Islanti | 8/8 | 0,0 | 1,1 | 1,00 | 0,00 | 0,32 | 4,3 | 8,1 | 248 | 0 |
| Košice | 8/8 | 0,0 | 2,2 | 1,00 | 0,00 | 0,22 | 4,3 | 7,3 | 245 | 0 |
| Krakova | 8/8 | 0,0 | 1,3 | 1,00 | 0,00 | 0,29 | 4,3 | 5,8 | 265 | 0 |
| Kreeta | 8/8 | 0,0 | 1,0 | 1,00 | 0,00 | 0,25 | 4,3 | 9,6 | 228 | 0 |
| Lissabon | 8/8 | 0,0 | 1,4 | 1,00 | 0,00 | 0,27 | 4,3 | 8,1 | 296 | 0 |
| Ljubljana | 8/8 | 0,0 | 1,1 | 1,00 | 0,01 | 0,34 | 4,1 | 5,9 | 254 | 0 |
| Luxemburg | 7/7 | 0,0 | 1,1 | 1,00 | 0,00 | 0,20 | 3,6 | 6,8 | 256 | 0 |
| Madrid | 8/8 | 0,0 | 1,0 | 1,00 | 0,00 | 0,31 | 4,3 | 5,8 | 282 | 0 |
| Marseille | 8/8 | 0,0 | 1,2 | 1,00 | 0,00 | 0,31 | 4,3 | 7,6 | 265 | 0 |
| Oslo | 8/8 | 0,0 | 0,8 | 1,00 | 0,00 | 0,30 | 4,3 | 7,5 | 297 | 0 |
| Sevilla | 8/8 | 0,0 | 1,7 | 1,00 | 0,00 | 0,29 | 4,3 | 8,0 | 280 | 0 |
| Sisilia | 8/8 | 0,0 | 2,0 | 1,00 | 0,00 | 0,18 | 2,9 | 4,4 | 256 | 0 |
| Sofia | 8/8 | 0,0 | 1,1 | 1,00 | 0,00 | 0,25 | 3,7 | 8,2 | 289 | 0 |
| Tampere | 8/8 | 0,0 | 0,9 | 1,00 | 0,00 | 0,30 | 4,3 | 6,0 | 237 | 0 |
| Tukholma | 8/8 | 0,0 | 0,9 | 1,00 | 0,00 | 0,31 | 4,3 | 6,5 | 288 | 0 |
| Valletta | 8/8 | 0,0 | 1,2 | 1,00 | 0,00 | 0,13 | 4,3 | 8,0 | 299 | 0 |
| Venetsia | 8/8 | 0,0 | 1,4 | 1,00 | 0,00 | 0,33 | 4,3 | 6,5 | 259 | 0 |
| Vilna | 8/8 | 0,0 | 1,2 | 1,00 | 0,00 | 0,29 | 4,3 | 7,3 | 294 | 0 |

## Löydökset ja korjaukset

Ensimmäisellä ajolla 36 kaupungissa oli vikoja. Pariisi oli ainoa lähes puhdas, koska sen datassa on kohteiden korkeudet.

1. **Hyppy saapuessa** (1,5–14,5 m yhdessä ruudussa, 30 kaupunkia): katon korkeusraja (OpasOhjaus.Sovella) tuli voimaan vasta pysähdyksellä. Korjaus: lennon kohdekehys samoissa rajoissa (OpasOhjaus.Rajoita).
2. **Taaksepäin lennon aikana** (1–75 m): kaaren jälkeen pallo lähtee katsoen kohteesta poispäin tai saapuu kääntörajan takia sivuttain, ja zoomauskaari työnsi silmää katseen suuntaan. Korjaus: zoomauksen lisäetäisyys pystysuunnassa, ja vaakaetäisyys muuttuu suoraan kehysten välillä. Lyhyillä lennoilla (alle 1,5 km) silmä kulkee suoraan ja katsoo kohteeseen.
3. **Lyhyet hypyt** (75–172 m, kehys muuttuu paljon; Praha, Granada, Sevilla, Ateena):
   - seuraavan kehyksen vaakaetäisyys rajataan niin, ettei silmä kulje hypyn suunnassa taaksepäin
   - kaari päättyy seuraavan tasalle
   - jos silmä on jo seuraavan ohi, kehys katsoo seuraavaan nykyisestä silmän paikasta
4. **Kääntö 14–17 °/s**: avauksen arviokehys kääntyi rajoittamatta (jopa 190°), ja kohteen vaihto kesken lennon heilutti suuntaa. Lisäksi van Wijk–Nuij-polulla kääntö kasautuu lennon keskelle. Korjaus:
   - kääntöraja myös avauksessa
   - kohteen vaihto pitää suunnan
   - jakaja 3,2 → 5,5 (mitattu)
5. **Seisahdus samassa paikassa jatkuvalla kohteella** (Košice, Tampere, Sisilia, Granada): lipumisen ja ohjauksen tila ei nollautunut, ja pallo seisoi koko kerronnan. Korjaus: nollaus, ja leijunta, kun seuraava on alle 50 m:n päässä.

## Huomio datasta (Pelikoodarille)

Kierroksilla on lähes päällekkäisiä kohteita:
- Granadan katedraali ja Kuninkaallinen kappeli 0 m
- Pyhän Elisabetin katedraali ja Urbanin torni 0 m (Košice)
- Knossoksen valtaistuinsali ja Knossos 11 m
- Hämeensilta ja Tammerkoski 22 m

Pallo leijuu niissä paikallaan, mikä on oikein, mutta koordinaatit kannattaa tarkistaa. Islannilla ei ole OPAS_SALLITUT-keskipistettä (testi käyttää ensimmäistä kohdetta).

Tarkistukset ovat vain automaattisia. Simulaattori- ja laitetestit puuttuvat junasääntöjen mukaisesti.
