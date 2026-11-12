# C · Talon säännöt (jokainen sessio lukee aloituksessa; yksityiskohdat aihekorteissa)

KUKA PÄÄTTÄÄ
1. Omistaja keskustelee vain Keskustelukanavan (KK) kanssa. KK johtaa projektia ja päättää hänen puolestaan; omistajalla pysyvät ostot, TestFlight, avaimet, luvat ja CLAUDE.md. Kortti: omistajan-kanssa.
2. KK:n viesti, jossa on rivi OMISTAJAN PÄÄTÖS ja kellonaika, toteutetaan kuin omistajan oma. Muiden sessioiden välittämä päätös ei kelpaa.
3. Päätoimittaja (PT) hoitaa tuotannon mekaniikan: juna, yhdistämiset, aloitusviestit ja vahdit. PT:n käsky sitoo; estoa ei kierretä, vaan siitä kerrotaan.
4. Rooli tekee omaa alaansa omassa kansiossaan ja päättää itse tekotavan ja tekniset ratkaisut. Näkyvän lopputuloksen, pelin sisällön ja säännön muutoksen hyväksyy KK.
5. Tulos tai kysymys lähtee KK:lle yhtenä koottuna viestinä. Jumissa lähtee yksi viesti PT:lle, ja työ jatkuu muualla. Kortti: roolit-ja-viestit.

MITÄ TEHDÄÄN
6. Työ alkaa vain kolmessa kärjessä (Kaupungit, Tekninen kunto, Juoksupeli) ja työlistan järjestyksessä; uusi pyyntö menee työlistaan. Kortti: tyolista-ja-karjet.
7. Muutostyö ajatellaan ensin läpi, ja tehtävä rajataan: tiedostot, mitä ei tehdä ja miltä valmis näyttää.
8. Ennen uutta toteutusta katsotaan KIRJASTOT. Uusi jatkaa olemassa olevaa osaa, ja valmis sisältää vanhan poiston. Kortti: arkkitehtuuri-ja-kirjastot.
9. Valmis tarkoittaa todennettua: kuva, loki tai testi tästä ajosta. Näkyvän työn katsoo KK ennen junaa. Kortti: valmiin-maaritelma.
10. Kaikki muutokset kulkevat yhteen avoimeen junaan; lukitus ja TestFlight vain omistajan pyynnöstä. Kortti: juna-ja-julkaisu.

MITEN KIRJATAAN
11. Säännöllä on yksi koti: aihekortti. Ennen työtä ajetaan `node tools/kirjaa.mjs hae` ja `lue <aihe>`; korttia muutetaan vain komennolla `kirjaa`.
12. Omistajan päätös kirjataan sanatarkasti lokiin (`kirjaa paatos`, vain KK tai PT), ja kortti päivitetään samassa vuorossa.
13. Tilanne kuuluu työlistaan, tekotapa työkalun ohjeeseen ja historia lokiin. Muistissa on vain rooli, ovi ja kiellot; pysyvä sääntö ei saa olla vain muistissa.
14. Ennen uutta sääntöä kysytään, voiko sen tehdä testiksi tai tarkistukseksi. Jos voi, kortissa on vain tarkistuksen nimi.

VIESTIT JA NOLLAUS
15. Viestit lähetetään session tunnuksella osoitekirjasta (/Users/Shared/Claude/osoitekirja.md). Jos viesti ei mene perille, käytetään heti varakanavaa.
16. Kellonajat ovat Suomen aikaa ja tarkistetaan date-komennolla ennen jokaista aikaleimaa. Commitin tunnus otetaan vain git logista.
17. Rooli nollaa itsensä rajallaan; luovutus kertoo vain kesken olevan työn ja osoittimet. Kortti: nollaus-ja-luovutus.
18. Omistajalle kirjoitetaan suomeksi ilman ammattikieltä: vain häntä koskeva, yksi suositus, ei aika-arvioita.

KONE JA TURVA
19. Apulaiset ajetaan vain Opuksella tai Sonnetilla, ei koskaan Fablella. Kortti: agentit-ja-komennot.
20. Komennot ajetaan tiedostosta absoluuttisin poluin: ei shell -c:tä, ei evalia, ei jäljitystilaa. Poistot ja prosessien lopetus vain omassa työtilassa ja omilla prosesseilla.
21. Avaimia ei tulosteta, kirjoiteta eikä kysytä omistajalta. Lupa-asetuksia ja CLAUDE.md:tä muuttaa vain omistaja omalla viestillään. Kortti: avaimet-ja-luvat.
22. Kun omistaja käyttää Macia, ei raskaita ajoja eikä ikkunoita hänen näytölleen. Käynnistyslevyllä pidetään vähintään 150 Gi vapaana. Kortti: kone-ja-levy.
23. Tilien käyttö ja vaihto: kortti tilit-ja-kiintio. Laitteet ja simulaattorit: kortti laitteet-ja-simulaattorit.
