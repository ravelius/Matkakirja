# testit · vastuu NS · tarkistettu 12.11.2026

TAVOITE: Kone tarkistaa jokaisen muutoksen ennen junaa, ja laitteella ajetaan vasta valmis kokonaisuus. Testaaja näkee testaajatilassa koko sisällön, ja kehittäjä pääsee testattavaan kohtaan suoraan.

SÄÄNNÖT:
1. Junaan vaaditaan vain automaattiset testit ja virheetön käännös. Varjostinten Metal-variantit käännetään aina, kun varjostimia on muutettu, ja aina ennen TestFlightia. Pieni virhe korjataan seuraavassa junassa. [R-9.1] [R-9.2]
2. Sääntö, jonka kone voi valvoa, kirjataan testiksi. Työkalun alkukommentti on sen käyttöohje. [R-13.50]
3. Simulaattoria käytetään vain uuteen tekniikkaan (varjostin, valo, ohjaus, kosketus, laitteen toiminnot, suorituskyky, muisti, käännösputki), pyydettyihin kuviin ja TestFlight-junan laitekierrokseen. Muu kulkee testien ja Macin esikatselun kautta. [R-9.11] [R-9.3]
4. Laitteella ajetaan vain KK:n nimeämä valmis kokonaisuus. Kokeita, välivaiheita eikä poistuvaa tai keskeneräistä koodia mitata. [R-12.26] [R-2.209]
5. Tarkistusajosta ennen linkin versiota päättää KK; ennen TestFlightia se ajetaan aina. [P-261111-5] [R-9.11]
6. Vika toistetaan oikealla polulla ennen korjausta, ja sama ajo menee korjattuna läpi; mittarin on ensin erotettava toimiva tila. Ämpärin sisältö todennetaan puhtaalla asennuksella tuotannon osoittimen kautta. [R-9.7]
7. Ääni todetaan soivaksi toiston etenemisestä kahtena hetkenä. Kun kaikki äänivartiot kaatuvat kerralla, tarkistetaan ensin Macin äänilaite. [R-9.7] [R-12.15]
8. Kuvat katsotaan kahdesti suurennettuina ja välit mitataan pikseleinä; video käydään ruutu ruudulta ja välähdykset haetaan skriptillä. Ajoitusehdon mittaa hyväksyjä itse. [R-9.5]
9. Sulavuusehto kuitataan avatusta todistusraportista, ei kuorma-ajosta. Muistiajo todistaa vain, jos loki näyttää korjatun haaran ja kaatumisen ehdon; kaatunut sarja toistetaan lyhentämättä. [R-9.6] [P-261112-8]
10. Laiteajo alkaa nimetystä aloituksesta, ei intron läpi, ja päättyy riviin OK tai VIKA heti, kun tulos on selvä. [R-9.13]
11. Kehittäjäkoodi avaa kehittäjätilan kaikissa käännöksissä ja toinen koodi testaajatilan: kaikki linssit ja vapaa liikkuminen, ei äänisäätimiä eikä syvempiä toimintoja. Koodeista repoon vain tiiviste. [R-6.17]
12. Kehittäjätilassa ovat testien suorat aloitukset, kohtaamislista maanosittain ja pelin saapumiszoom. Kävijälaskuri ohittaa omistajan laitteen vain erillisellä merkillä, ei kehittäjätilasta. [R-9.13] [R-6.17]

EI VIKA:
- Juna lähtee ilman simulaattori- tai laitekuvia.
- Sisäisessä TestFlightissa kehittäjätila on oletuksena päällä.

TEKOTAPA:
- Ennen junaa: Matkakirja-proto/tyokalut/tarkista.sh, ennen-junaa.sh, metal-tarkistus.sh. Tarkistusajo: tuotantoputken-tarkistukset.md.
- Todistusajo: Matkakirja-proto/tyokalut/todistusajo/OHJE.md. Välähdykset: tools/valahdys-yavg.py.
- Muut kortit: kamera (kameratestit), laitteet-ja-simulaattorit (laiteajojen menettely), valmiin-maaritelma.
