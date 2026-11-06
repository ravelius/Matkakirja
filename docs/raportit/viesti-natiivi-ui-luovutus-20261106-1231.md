# Natiivi-UI: luovutus 6.11.2026 klo 12.31 (pehmeä kontekstiraja, 7.37)

Korvaa -1207:n "Ajon jälkeen" -kohdat; avoimet asiat -1150:stä ja -1140:stä ovat voimassa. Lukulista 7.47: lue itse.

## Tila
Worktree /Users/Shared/Claude/wt/proto-natiivi-ui-vesinimi, haara natiivi-ui/ui-sarja-219, kärki aa359f8d6, ei muutoksia. Ajo aa359f8d6 ajettu ja katsottu.
Tulos ja mittarivit: /Users/Shared/Claude/proto-3d/lokit/nui-ui-aa359f8d6/tulos-nui.md (lue ensin). PT:lle kerrottu 12.3x.
Mitään PT:n alla olevasta ei ole aloitettu.

## PT:n sana 12.3x (sellaisenaan)
"F kyllä: korjaa Rakenne.NaytaHeti juuresta ja ota nostokortti ja selain testiin. A, C ja D kyllä, samoin bd998aa59:n peruslinjan ja ✓-muunnoksen kumous, koska ne eivät auttaneet.
B: ota valikkorivistä täysikokoinen kuva. Toleranssi vain tälle riville ja vain, jos eroa ei näe; ✓ jää mittaukseen. E: älä siirrä vipua. Aja D:n jälkeen oikea vapaa lento ja tila, jossa kierros on keskeytetty, ja vie kuva ja yksi suositus KK:lle, koska vivun paikka on omistajan hyväksymä.
Intro 2 ja 3: yksi havainto, katso seuraavasta ajosta. Kaikki omaan haaraan yhdellä ajolla (5 varausta), tulos 3 rivinä; ei junaan ennen PT:n kuittausta. Täysi sarja ennen junaa pysyy."

## Työ (ui-sarja-219:n päälle, ajo JU:lta 5 varauksella)
1. F, NaytaHeti: Assets/Matkakirja/UI/Rakenne.cs:196. Vika: PiilotaHaivyttaen (205) palauttaa USS-siirtymän ja poistaa mk-auki; NaytaHeti kesken häivytyksen asettaa siirtymän 0 ja mk-auki, ja kerroksen opacity jää 0:aan. Syy Unityn sisällä ei ole todistettu; todiste on loki: kerros opacity 0.00, mk-auki True, 20 s. Korjauksen pitää näkyä "-- aarretehtävä" -riveillä (opacity 1.00, uutta > 0). Käyttäjät: Nostokortti 587 ja 1283, Aarretehtavakortti 171, Nostoselain (grep NaytaHeti). Testiin nosto ja selain: sulje ja avaa heti näkyvästä tilasta. Vuorottelu lokissa: arvio OK, aikajana vika, salakirjoitus OK (myös 0,17 s sulusta!), katso vika. Pelkkä aika ei selitä.
2. A: "Kysy Pululta" dy +0,60. .mk-astroTaulu__linkki (Linssit.uss:1960 ja 2005) padding-bottom 1 px, arvio noin +0,1 (+1 = 0,5 pt ylös, sama kuin Ohitan kokeessa). Saman muutoksen kumous kohdassa 3.
3. Kumous bd998aa59:stä: Optisen peruslinjamuutos (alleviivaus) ja ✓:n mittakaavamuunnos (Optinen, Glyyfi + lahde). Katso bd998aa59:n diffi AsetteluTesti.Keskitys.cs:stä. Muut bd998aa59:n asiat jäävät (varaukset, selitetesti pois, TiiviiKysyRivi 42,4 %). Kumouksen jälkeen Kysy-arvo ja A:n vaikutus näkyvät vasta ajossa.
4. B: Päivä ✓ +0,77 (LIVE +0,02, Yö +0,10, Äänentasot +0,04). Kuva "oppaan aika" -valikkorivistä täysikokoisena: Kuvattava(...)-lista AsetteluTesti.cs, kuvamuuttuja ajossa. Toleranssi vain tälle riville ja vain, jos eroa ei näe. ✓ jää mittaukseen.
5. C: kosketusala sisällön mukaan: OpasMetrolinja.cs:206–209 ja 371 (osuma), TestiOsuma 253. Nyt pysty sisältö alas 338, ala 298; vaaka 190 ja 179.
6. D: AsetteluTesti.cs Vaihe.Pallo (noin rivi 340): komento "mika" asettaa testiMika → VapaaTila (OpasValikko 1513, 3083), "metro 0" pakottaa listan (572). Testi: lista kierroksen tilassa ilman "mika"; vipu TestiPallonOhjaimet-listaan (OpasValikko 1345), jolloin vipu ja tappi vaakana tulee VIKAna. Omistaja 17.10. klo 07.06: vapaassa lennossa ei listaa.
7. E: ÄLÄ siirrä vipua. D:n jälkeen aja oikea vapaa lento ja keskeytetty kierros (OpasSilmukka.KeskeytaKierros → Odottaa, KierrosKeskeytetty; chat suljettu). Kuva ja yksi suositus KK:lle (poikkeus 2.214-tapaan: PT määräsi). Kysy, voiko testiajo tehdä nämä oikeilla tiloilla vai tarvitaanko oma varaus; 5 varauksen raja pysyy.
8. Intro 2 ja 3: katso seuraavasta ajosta, ei koodia nyt.

## Ajo ja tulos
Ajo JU:lta, 5 varausta (pysty keskitys x3, vaaka keskitys, vaaka kuvat, kuten aa359f8d6). Kansio lokit/nui-ui-<sha>, skripti tyokalut/ui-asettelutesti.sh. JU:n viesti kertoo lokit; nimessä lukee "tuntematon".
Tulos PT:lle 3 rivinä, yksityiskohdat tiedostoon. Ei junaan ennen PT:n kuittausta. Täysi sarja ennen junaa pysyy.
Kestot nyt: 200–229 s varaus. Testin kasvu ei saa viedä yli 6 min.

## Ei todennettu
Unityn syy opacity-vikaan. Ohitan aiemman vaihtelun syy (ei toistunut 4 ajossa). Radion musteen puuttuminen; radio mitataan laatikosta. Vipu ja tappi yhdessä oikeassa vapaassa lennossa: vain koodi ja testin kuva. Lista ja tappi keskeytetyssä kierroksessa: vain koodi. Nostokortin ja selaimen vika: ei testattu.

Kuvat vain PT:lle, paitsi kohta 7 KK:lle.
