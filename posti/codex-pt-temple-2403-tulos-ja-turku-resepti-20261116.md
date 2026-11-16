# Codex → PT → KK: Temple 2403, koko tornin sisäpintakorjaus katselmukseen

Temple 2403:n Codex-tuotanto ja paikallinen QA ovat valmiit. Yksi koko tornin GLB on liitteessä. KK:n katselmus ja NS:n koehaaran vaihto ovat vielä tekemättä; peliä ei muutettu.

**GLB:** [temple-2403-clean-interior.glb](codex-temple-2403-result-20261116/temple-2403-clean-interior.glb), 74 999 kolmiota, 4 493 216 tavua. SHA256 `afd2c044782b1b64897e8b9dcae9c7b0767710c5968dc69872bec89fff8ba0d2`.

**Katsottavat kuvat, pisin sivu 1000 px:**
- [Kuninkaan kerros ennen](codex-temple-2403-result-20261116/king-before-local-1000.png) / [jälkeen](codex-temple-2403-result-20261116/king-after-local-1000.png).
- [Koko torni, suoraan](codex-temple-2403-result-20261116/whole-cutaway-front-1000.png) / [viistosta](codex-temple-2403-result-20261116/whole-cutaway-oblique-1000.png).
- [Ulkopuoli takaa](codex-temple-2403-result-20261116/exterior-back-1000.png).

Ennen/jälkeen on lopullisen GLB:n uudelleentuonnista samalla paikallisella kameralla ja valolla. Avattu etupuoli, 15° vaakatasosta vastaa NS:n ilmoittamaa n1-suuntaa/75° kallistusta. Nämä eivät ole n1-peliruudun pikselitarkka rekonstruktio: nuket, UI, pelivalot ja runtime-leikkausvarjostin puuttuvat. Alkuperäistä n1-viitettä ei korvata paikallisella kuvalla.

Neljä pääkerrosta käyttävät samaa reseptiä. Lattioiden kiila-/taitoskohdat ja sisäseinien tasot oikaistiin; sisäpinnoille omat UV:t ja siistit normaalit. Kolme käsin tehtyä toistuvaa pintaa: rappaus/kalkkiseinä, hillitty kivi, lankkulattia, kukin 512 × 512. **Kaikki materiaalit ovat PT2404:n sallimia B2-arvioita**, eivät Cléryn nimeämiä materiaaleja. Tapetoituihin erillisiin väliseiniin ei koskettu. Katon puuosat ja ullakon alkuperäinen kansi säilyvät.

Ulkokuori, mitat, origo, akselit, sijoituksen ja halkaisun parametrit sekä Roof B:n edellyttämä kattogeometria säilyvät. Tiedosto-QA todentaa ulkopinnan sijainnit/normaalit/UV:t sekä alkuperäiset kuvat muuttumattomiksi. Ei uusia kääntyneitä tai romahtaneita kolmioita; 1 mm:n reunalaskenta 23 → 23. Kiila ei näy jälkeen-kuvissa. Riippumaton kuvatarkistus ei löytänyt estävää virhettä. [QA](codex-temple-2403-result-20261116/QA.json), [toteutus ja rajat](codex-temple-2403-result-20261116/README.md).

**NS:lle:** yksi mesh, neljä materiaali-primitiveä. Uusien UV-pintojen sampler on REPEAT, mittakaava 2,56 m. Alkuperäinen ulkopinnan normaalikartta säilyy; sisäpinnoilla käytetään geometrian vertexnormaaleja ilman uutta normaalikarttaa. Muuntimen pitää käsitellä kaikki neljä materiaalia ja UV-toisto; pelkkä ensimmäisen materiaalin poiminta ei riitä. 71 514 kärkitietuetta UV-/normaalirajoineen. Puhelimen suorituskykyä tai muunninta ei tässä ajettu. KK:n katse → NS:n vaihto koehaaraan → alkuperäinen n1-ruutu ja omistajan kuva.

**JU / ikkuna 2456:** tuotanto alkoi 18.19 EET; viimeinen raskas prosessi päättyi 18.39.23 EET, etuajassa ennen 20.15 rajaa. Tästä toimituksesta ei ole enää Blender-/renderityötä käynnissä. Jonon aikarajaa tai lukkoja ei muutettu. Kaikki raskaat komennot ajettiin vapaan koneen ja load5 < 16 -ehdon vartioimina. Uusia Tripo/ImageGen-kutsuja 0, palvelukulu 0.

**Turku 2451/2453, vain pyydetty ehdotusrivi seuraavaan vaiheeseen:** Säilytetään valittu Turku A (#2336) alkuperäisenä ja erotetaan kopioon rajatut sisäpihan puoleiset avauspinnat kolmesta siivestä; avauksien taakse rakennetaan viisi lähteenmukaista huonetta, väliin kerros 4 ja M303 pieneksi itäulokkeeksi RHS 203/205:n mukaan, muuttamatta muun ulkokuoren muotoa tai mittakaavaa.

Turun tuotantoa, kuvaa tai Tripoa ei ole aloitettu; ehdotus odottaa PT → KK:n päätöstä. Jos Temple 2403:n valmistumisen riippuvuus tarkoittaa vasta KK:n sulkua, pitäkää tämä ehdotus siihen asti pysäköitynä. Grand Châtelet'n suljettua osuutta ei avata.
