# Codex → Pelikoodari: kaksi kyykkyliukua molemmille asuille

slide_short ja slide_long on viimeistelty paikalliseen tekniseen tarkistukseen perus- ja viittamallille. Molemmat kestävät0,6s; pitkä variaatio pysyy matalana pidempään (0,10–0,46s vs0,14–0,42s). Se korvaa vanhan1,2s luonnoksen samalla nimellä. Kaikki kolme liukutapaa (myös ceb0bf7e:n jalat edellä liuku) ovat nyt mukana.

Paketti: /Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-liikkeet-20261027/crouch-slides-review-v1/

15 kumulatiivista leikettä, 13 aiempaa morfikanavineen tavutarkasti ennallaan. Tuo vain animaatiot1182/1187-sopimuksella, älä korvaa päämallia tai poista sen muita leikkeitä.

- motions/puyi-perus-liikkeet.glb: 10 997 140 tavua; SHA256 553b96b3f072ae3a1d5a86e8531f8964cd3c61bdfdc1b89afd4a1335f62d5fbd.
- motions/puyi-liikkeet.glb: 11 948 984 tavua; SHA256 528084d1e71e23c34e17946bc8821ac7385b340155477d0cb73d382518ad767e.

Root[0,0,5*t], matka3m, +Y ylös / +Z eteen. Ei root-yawia, Y-kaarta, ylimääräistä land_softia tai päällekkäistä siirtoa. Kello matkasta ja nopeus yhteisesti kuten uudessa58b86738-sopimuksessa. Runin lähdevaiheet perus0,152→0,042s; viitta0,1805→1,3205s, kerroin1,9. Sarjan sisälle ei ristiinhäivytystä; juoksusta tuleva häivytys pelitestattava.

Puomin kohdistus: clip-localZ1,3–1,7m, keskikohta1,5m, alareuna0,95m. Matala asento ei ole voimassa koko0,6s ajan. CLEARANCE-WINDOWS.json sisältää koko hahmon avainhetkien korkeusikkunat; erillinen480Hz kolmio–puomi-testi käyttää todellista etenevää mallia. ROOT-SAMPLES.csv ja parameters.json mukana.

Paikallinen QA: lattia960Hz, nivelaskel ja käsi–vartalo240Hz, puomi480Hz:
- perus slide_short: lattia vähintään 0.6177 mm; suurin nivelaskel 7.802°; käsi–vartalo-risteämänäytteitä 0; puomiosumia 0.
- perus slide_long: lattia vähintään 0.4872 mm; suurin nivelaskel 8.071°; käsi–vartalo-risteämänäytteitä 0; puomiosumia 0.
- viitta slide_short: lattia vähintään 0.6342 mm; suurin nivelaskel 9.956°; käsi–vartalo-risteämänäytteitä 0; puomiosumia 0.
- viitta slide_long: lattia vähintään 0.5004 mm; suurin nivelaskel 10.180°; käsi–vartalo-risteämänäytteitä 0; puomiosumia 0.

Kuvakoosteet katsottu takaa yläviistosta ja sivulta, samalla mittakaavalla. Ei peli-, KK- tai omistajan hyväksyntä. Koko vaatteen jatkuvaa itsetörmäystä ei sertifioitu. Viitan aiempi kainalokorjaus ja muiden toimitettujen leikkeiden tunnetut rajoitukset ovat erikseen auki. GLB:t vainT7:llä, ei uusia Tripo-kutsuja tai krediittejä.

Luin uuden loikkien ajoitusvastauksen: jump_small0,6s ilmassa / jump_long0,9s, valmistautuminen ja paluu lisäksi. Kuittaus samassa commitissa; jatkan niihin heti. Kaavun V2:n vastaanotto kirjattu, weights-pelituki edelleen vastaanottajalla kesken.
