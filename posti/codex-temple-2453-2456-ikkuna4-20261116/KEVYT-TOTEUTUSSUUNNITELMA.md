# Temple2403: valmistelu CODEX-IKKUNA4:lle

Raskas työ on sallittu vain 16.11.2026 klo18.15–20.15 EET (16.15–18.15 UTC), vasta JU:n tämän ikkunan ”kone vapaa” -merkinnän jälkeen. Unity, xcodebuild, dotnet ja simulaattori eivät saa olla käynnissä, load5<16. Varauksen päättymistä ei pidennetä itse. Suunnitelma, tiedostojen lukeminen ja aikarajan tarkistus ovat kevyttä valmistelua; korjausta tai renderöintiä ei vielä ole tehty.

## Syöte ja säilytettävät asiat

- Muuttumaton paikallinen baseline `../baseline/temple-2271-original.glb`, SHA256 `843ec7a3e22f952299e91af8c59d199ba7d6678fe540198e86959ff79424b74e`.
- Kaikki kerrokset käsitellään, Kuninkaan kerros lähitarkastelun pääkohteena. Yläraja74999 kolmiota. Uudet UV-saumat voivat lisätä vertex-tietueita, eivät kolmioita.
- Ulkokuori, sen tekstuuri/normaalikartta, origon sijainti, GLB-akselit, mittakaava, mitat ja paikka säilyvät. Käsittelyalueet nimetään ja lukitaan ennen muuttamista; epävarmaa ulko-/sisäpintaa ei tasoiteta summittaisesti.
- GLB-leikkaustaso z=5,37 ja sama puoli kuin NS:n vahvistamassa n1-tilassa. Roof B:n mitat säilyvät. Alkuperäistä tiedostoa ei korvata.
- NUKET1:n oikea ennen-kuva, kameratiedot ja saumaluettelo ovat baseline-kansiossa. Paikallinen renderi ei korvaa vastaanottajan pelikuvaa; kameran vastaavuus kirjataan erikseen.

## Työjärjestys ikkunassa

1. **Aloitus ja paikannus, noin15min:** varmista aikaportti, JU:n vapautus ja prosessit; tarkista baseline-SHA. Tuo kopio Blenderiin. Paikanna Kuninkaan lattian musta kiila oikean n1-kulman avulla. Tutki diagnostiset kolmiot22930/22931/30422 ja niiden naapurit. Erottele tekstuuri-, normaali-, päällekkäisyys- ja topologiavirhe. Niitä ei ole vielä todistettu avoimeksi reiäksi.
2. **Sisägeometria, noin45min:** rajaa lattioiden, seinien, pilarien, kaarien ja syvennysten sisäpinnat. Suorista tasopinnat paikallisesti, säilytä holvien ja kaarien tarkoitettu muoto ja terävät rajat. Tee sama käsittely kaikille kerroksille; älä käytä koko mallin sokkotasoitusta. Korjaa kiila vahvistetun syyn mukaan ja pidä kolmiobudjetti.
3. **UV ja pinnat, noin25min:** enintään kolme omaa toistuvaa512² sisäpintaa: hillitty lämmin rapattu/kalkittu seinä, vaalea hakattu kivi pilareihin/kaariin, ruskea lankku lattioihin. Materiaalivalinnat merkitään SK:n B2-arvioiksi, eivät Cléryn varmennetuiksi väitteiksi. Ulkoatlas ja ulkonormaalit säilytetään. Sisäpintoihin ei leivota voimakasta valoa. Väliseinät/kalusteet ovat erillisiä pelin kerroksia; niihin ei tehdä muutoksia eikä koko tornia tapetoida esihuonetta koskevan lähteen nojalla.
4. **Vienti ja QA, noin25min:** vie uusi GLB ja tuo se uudelleen. Tarkista kolmiomäärä, säilytettävän ulkokuoren geometria ja tekstuurisidokset, transform, rajat sekä Floor/Roof B -yhteensopivuus. Renderöi1000px Kuninkaan kerros ennen/jälkeen samalla kameralla sekä koko avattu torni; tarvittaessa tekstuuriton sisäkuva virheen paikantamiseksi. Tutki kaikki kerrokset silmämääräisesti. Pelin integraatiota ei tehdä.
5. **Vara10min:** raskas työ lopetetaan viimeistään20.15. Jos kaikki QA-ehdot eivät täyty, säilytä keskeneräinen kandidaatti työaineistona ja raportoi puute PT:lle. Älä nimeä osittaista tulosta valmiiksi koko tornin korjaukseksi. Kevyt manifesti/postitoimitus voi seurata raskaan työn loppua.

## Ajankäyttö ja turvallinen pysäytys

Kahden tunnin varaus säilytetään. Työ ja QA mitoitetaan tähän ikkunaan; uusi riskihavainto ilmoitetaan PT:lle ennen18.00, jos valmistelu osoittaa pidemmän ajan tarpeen. Täydellistä hyväksyttyä tulosta ei luvata ennen korjauksen ja QA:n havaintoja.

`window_guard.py` tekee vain tämän ikkunan hetkellisen read-only-tarkistuksen. Sitä ei ajasteta eikä se käynnistä työtä. Ennen jokaista raskasta vaihetta tarkistus uusitaan. Varsinainen prosessi käynnistetään omistettuna lapsiprosessina; ohjaaja rajoittaa sen jäljellä olevaan aikaan, seuraa resursseja ja pysäyttää vain oman prosessinsa tarvittaessa. Varalla tallennetaan checkpoint ennen pitkää vaihetta. Jaettua JU-lukkoa tai loppuaikatiedostoa ei muuteta.

## Päätökset2453–2455

- Turku odottaa Temple2403:n valmistumista. Sen jälkeen PT→KK saa yhden rivin ehdotuksen Turku A2336:n ulkokuoren säilyttävästä omasta geometriareseptistä. Turun kuvaa tai Tripoa ei tehdä nyt.
- GC A/B/C:n Codex-osuus on vahvistetusti valmis ja suljettu; NS vastaa lataustiestä. Sitä ei avata uudelleen tässä työssä.
- Lopputulos ja1000px tarkistuskuvat toimitetaan PT:n kautta KK:lle. Mallin hyväksyntä ja NS:n peliin vaihto ovat erillisiä vaiheita.
