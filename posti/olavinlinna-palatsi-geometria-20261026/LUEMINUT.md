# Palatsi 6–7, rakenteellinen toimitus #1003

`palatsi.glb` sisältää palatsin alemman linnantuvan ja ylemmän salin seinät, pohjoisen tulokäytävän, alkuperäiset muurinsisäiset portaat, matalan kalkkiholvin, yläkerroksen puupalkit sekä kolme täysin auki seinäpintaan upotettua ovilehteä rautavöineen. Ovilehdet ovat staattinen avoin rakennusosa; tästä toimituksesta ei ole tilattu ovianimaatiota. Ikkunoita, huonekaluja, hahmoja tai muita linnaosia ei lisätty.

## Sitova lähde ja säilytetty peli

- Sama glTF-koordinaatisto: x itä, y ylös, z etelä; metri, linnan yhteinen origo. Ei koko mallin siirtoa tai skaalausta.
- Kaikki 63 logiikkamerkkiä ovat omilla alkuperäisillä nimillään tyhjinä solmuina, transformit ja `extras.merkki` ennallaan. Värilliset asettelupallot ja -laatikot eivät näy mallissa.
- Lattiatasot syötteen todellisen geometrian mukaan +3,4000001 m ja +7,5 m. Ohjeen pyöristetty +3,5 m ei syrjäytä asettelumallin tarkkaa lattiaa. Portaiden askelmat ja sijainnit säilyvät.
- Pelin alkuperäiset v49a-kävely- ja törmäysmesh-tiedostot käytetään ennallaan. Tämä GLB korvaa näkyvän rakenteen, ei pelin reititystä. Asettelun kalusteita kuvaavat törmäyslaatikot eivät ole valmiita kalusteita eivätkä sisälly näkyvään palatsimalliin. Lavastaja kokoaa aiemmat hyväksytyt CC0-esineet merkkien kohdille.
- Täysi vienti tuotiin uudelleen Blenderiin: 63/63 merkkiä säilyi. Kävelyalueen 4 285 näytepistettä verrattiin lähtömalliin; ei uusia pään liikeradan esteitä, puuttuvia lattiapintoja eikä yli 15 mm:n uusia kavennuksia alkuperäiseen 0,8 m kulkuvaippaan. Ovikohtaiset seinänsuuntaiset aukkomittaukset ovat qa/geometry-verification.jsonissa.
- Alaportaan kahdessa aukon lattianrajassa olevassa säteessä on jo lähtömallin ensimmäinen askelma. Tätä ei poistettu eikä peitetty. Raaka reittimerkkitesti havaitsee saman askelman pelaajan kohdissa 54 ja 60; mallin vertailutesti erottaa vanhan askelman uudesta esteestä.

## Lähteestä ja tulkinnasta

Lähteestä ovat seinien paikat, kerros- ja porrasgeometria, oviaukkojen sijainnit ja koot sekä logiikkamerkit. Toimitettu lähde on peliasettelu, ei vuoden 1499 rakennusarkeologinen mittaus. Natiivisepän tilauksen kivi-, kalkki- ja puumateriaalivaatimus sitoo ilmettä.

Tulkintaa ovat kalkkiholvin tarkka profiili (holvin kanta y=6,25 m, laki y=7,0 m), rappauksen määrä ja sävy, kiven ja puun pintakartat, yläkerran seitsemän puupalkin paikat, porraskuilun tasainen kattopinta y=9,8 m sekä avoimien ovilehtien yksityiskohdat. Yläkerran palkkien alin pinta on y=9,94 m eli 2,44 m lattiasta. Holvi ei lisää keskipylväitä eikä muuta huoneen reittiä. Näitä yksityiskohtia ei väitetä dokumentoiduksi vuoden 1499 huoneeksi; PT tarkistaa tulkinnan ennen pelikytkentää.

Havainnekuva on materiaalien ja tunnelman tavoite, ei sitova mittapiirustus. Sen kuvitteellisia sivusyvennyksiä tai portaan kamerasta näyttämää sijaintia ei siirretä geometriaan: aukkojen ja portaiden osalta asettelu on määräävä. Havainnekuvan valoa ei ole leivottu mallin tekstuureihin.

## Vastaanotto

Natiiviseppä/PT tarkistaa rakenteen, Lavastaja kokoaa sen ja aiemmat CC0-esineet. Vertaa havainnekuvaa ja todellista pelikuvaa täysikokoisina. Kansio qa/ on sisäinen mallin tarkistus, ei omistajalle esitettävä pelikuva. Tiedostomuodon tarkistus ja paikallinen geometria-QA eivät ole vastaanottajan tai omistajan hyväksyntä eivätkä peli-integraatio tai julkaisu.

Muut Olavinlinnan rakennusosat odottavat tämän palatsin PT-kuittausta. Kokki ja portinvartija #1004–1005 kuuluvat erilliselle Tripo 3D -sessiolle; niitä ei tehty tässä uudelleen.
