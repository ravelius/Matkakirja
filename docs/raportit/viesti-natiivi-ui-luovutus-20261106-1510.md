# Natiivi-UI: luovutus 6.11.2026 klo 15.10 (pehmeä kontekstiraja, 7.37)

Korvaa -1414:n työlistan. -1306:n Havainnot sekä -1150:n ja -1140:n avoimet ovat voimassa. Lukulista 7.47: lue itse.

## Lue ensin
proto-3d/lokit/nui-ui-a8c94fbe0/tulos-nui.md (15 varauksen sarja: 7 läpi, 8 VIKAA, viat A-E)

## Tila
Worktree /Users/Shared/Claude/wt/proto-natiivi-ui-vesinimi, haara natiivi-ui/ui-sarja-219, kärki 61cbc0856 (peilissä natiivi-backup), ei muutoksia. KÄÄNTÄMÄTTÄ JA AJAMATTA.
Uudet commitit a8c94fbe0:n päällä:
- 2dd7ea819 B: Linnan äänet -rivit ScrollViewiin kuten huoneissa (LinnaValikko.cs)
- 793392378 C: unen palstan maxWidth turva-alueen mukaan, SovitaUniPalsta (Aloitusnakyma.cs)
- 61cbc0856 A + E: testi ja Kuvanakyma.cs:n testiluvut
Kaatokoe: haara natiivi-ui/ui-sarja-219-kaatokoe, fd07faea6 = 61cbc0856 + luennan tilalla auto-pois. EI liitetä. Poista haara, kun koe on luettu.

## JU:n ajo pyydetty 15.10 (rivit tähän sessioon: varaus, rc, kesto, VIKA-määrä; JU kertoo myös, onko runko yhä d092f48cc)
1. Kaatokoe linna mac-1280: lokit/nui-kaatokoe-fd07faea6/. Odotettu VIKA: "astronautin kuva luenta: luenta ei käynnissä" ja "astronautin kuva hiljainen: luenta ei käynnissä". Jos niitä ei tule, testi ei kelpaa, eikä PT:n ehto täyty. Lue myös, ettei tule muita uusia vikoja.
2. 61cbc0856 iphone-pysty pallo keskitys x3: lokit/nui-ui-61cbc0856/pysty-keskitys-N.txt.
3. 61cbc0856, 8 kaatunutta: lokit/nui-ui-61cbc0856/sarja-kaatuneet.txt.
Jos ei käänny: korjaa ja pyydä uudelleen. Kaatokoe pitää silloin tehdä uudelleen uuden kärjen päälle.

## PT 15.0x, sellaisenaan
"sopii, näillä ehdoilla (luin tulos-nui.md:n, en diffiä enkä lokeja).
A: tulkinta on vasta koodista luettu. Testin pitää mitata ennen auto-piiloa ja pystyä yhä kaatumaan, jos luenta ei avaudu: osoita tämä yhdellä ajolla, jossa kohta tarkoituksella kaatuu, tai perustele, miksi sitä ei tarvita. Pelkkä "luenta alkaa" -rivi ei riitä.
E: syy on auki, joten tämä ei ole korjaus vaan mittari. Raja on VIKA, kesto lokiin. Aja iphone-pysty keskitys 3 kertaa, koska vika tuli 1 ajossa viidestä. Jos raja ylittyy tai kestot hajoavat, E pysyy auki eikä liitosta tehdä.
B ja C: syy ensin ja korjaus asetteluun, ei toleranssia. Vertailuajoa ei tarvita, viat korjataan vanhoinakin.
Uusinta: JU ajaa kaikki 8 kaatunutta varausta omalla vuorollaan. Jos B:n tai C:n korjaus koskee jaettua USS:ää tai koodia, aja koko 15 (myös Mac- ja iPad-koot).
D: jää, jos -1306:n päätös on kuten kirjoitit (en tarkistanut, viittaa riviin tuloksessa). Hyväksyn tasan ne kolme riviä, neljäs on uusi vika.
Liitos vasta, kun muuta ei ole jäljellä kuin D. Tarkista ennen liitosta runko JU:lta: tuloksessa on 84872eaa9, PT:n tilassa d092f48cc. Jos runko on liikkunut, haara sen päälle ja JU kertoo, riittääkö ajo vai pitääkö ajaa uudelleen."

## Mitä muutin, ja mitä lukea tuloksesta
A. "astronautin kuva luenta" ei enää aja auto-piiloa, ja se kaatuu, jos TestiLuentaKaynnissa on false. Uusi kohta "astronautin kuva hiljainen" tekee auto-piilon ja tarkistaa suoraan: luenta käynnissä, otsikko näkyy turva-alueella, NaytaAutoNapitin napit piilossa (TarkistaKuvaHiljainen). Kohdat "astronautin kuva*" kirjaavat uudet elementit: "-- <nimi>: N uutta: …".
Lisäksi Vaihe.Nakyma odottaa enintään 2 s, että edellisen kuvanäkymän sulkuhäivytys loppuu (TestiSulkeutuu), ennen kuin ennen-joukko otetaan. Tämä on oma hypoteesini, ei todistettu: ajossa a8c94fbe0 uusia oli kuva 6, selain 6, auto 2, luenta 0, napautus 2, eli häivyttyvät elementit näyttivät jäävän ennen-joukkoon. Vertaa lukuja uudessa ajossa. Muista: peli piilottaa napit myös itse luennan alkaessa (Kuvanakyma.cs:775), joten luentakohdan mittaus ei välttämättä näe nappeja. Kerro se PT:lle sellaisena kuin näet.
Jos "otsikko ei näy": se on aito pelin vika, koska luennan aikana otsikon kuuluu näkyä (14.10.). Listaa PT:lle, älä pehmennä testiä.

E. Odotus enintään 10 s (IntroKuvaRajaS), kuvalle 2,8 s lepoa näkymisen jälkeen ennen laatikon mittausta. Lokiin "-- kuvan odotus aloitusintro N: x s", rajan ylitys "kuva ei näy 10 s:n rajassa" = VIKA. Normaali aiemmin noin 0,12-0,19 s. Tulos PT:lle: kaikki kestot ja rinnakkaiset käännökset. Jos raja ylittyy tai kestot hajoavat, E on auki eikä liitosta tehdä.
Vika tuli ajossa 14.41-14.44, joka meni L2:n laitekäännöksen kanssa päällekkäin (JU:n oikaisu); seuraava varaus 14.44 meni läpi, vaikka käännös jatkui.

B. Syy: Äänet-näkymällä ei ollut vieritystä, ja vaaka-iPhonella neljä kytkintä ja kaksi kehittäjän komentoa eivät mahdu. Valikon maxHeight oli oikein, mutta sisältö valui yli. Riveistä ei ole kuvaa; jos PT pyytää, kuva JU:lta.
C. Syy: USS:n palsta 90 % lasketaan koko arkista, 874 pt:n ruudulla 758 pt. Korjaus rajaa maxWidthin turva-alueen leveyteen (750 pt, x 62), päivittyy GeometryChangedEventillä ja nollautuu unen lopussa. Testi: Vara 0,5 pt, joten x 62,0 riittää; tarkista luku lokista.

Kumpikaan ei koske jaettua USS:ää tai koodia: LinnaValikko ja Aloitusnakyma ovat omia näkymiään. Siksi pyysin 8 varausta, en 15:tä.

## Kun ajot on luettu
1. Lue jokaisen varauksen loki ja luvut, ei vain VIKA-rivejä.
2. Hyväksyttävissä vain D:n kolme riviä. Neljäs rivi = uusi vika, listaa PT:lle.
3. PT:lle 3 riviä + polku proto-3d/lokit/nui-ui-61cbc0856/tulos-nui.md: kaatokoe, E:n kestot, B ja C, D.
4. Vasta kun jäljellä on vain D: runko JU:lta, liitos omana haarana. 84872eaa9 on d092f48cc:n vanhempi, ero 1 commit (dither). Jos runko on liikkunut, haara sen päälle ja JU kertoo, riittääkö ajo. Näytä git diff --stat PT:lle. JU yhdistää.

## Opit
- Lokissa VIKA 1 varauksissa 10.54, 11.07 ja 11.26 oli aikaraja, ei viat: siksi linnaosasta ei ole vertailuajoa ennen tätä sarjaa.
- Älä kirjoita rinnakkaisen kuorman arviota tarkistamatta JU:lta: väitin tuloksessa, ettei iPad 3 selitä E:tä, ja JU:n oikaisu osoitti sen vajaaksi. Tulos on korjattu.
- JU:n kestot ovat aloitusten välejä. Tuloksessa kestot ovat lokin luonnin ja viimeisen kirjoituksen väli.

## Ei todennettu
Koko 61cbc0856 kääntymättä. Ennen-joukon hypoteesi. E:n syy. Kaikkien Mac-kokojen keskitys (sarjassa ei ole varausta). -1414:n Ei todennettu -lista on voimassa: Mylly ja Shakki lautapelikokeen skenaariolla, oikea iOS-laite, palaute-kuva, Ohita y 116 / y 241, ND-nimi ja museokyltit seuraavassa rungon ajossa ilman lentopiiloa.

## Muuta
Remote Control ei päällä: työkalu vain omistajan omasta pyynnöstä. Postivahti toistaa pyynnön aloitusviestissä "ÄLÄ pyydä".

## Odottaa, aloittamatta
Tappien lasku vaakapuhelimelle kokeena omaan committiin, kun UI-sarja on yhdistetty (-1306, PT 13.1x): OpasValikko.cs:1836, tavoite tappi y noin 287-351; oikean tilan ajo vasta PT:n vuorolla Pariisin ja juoksupelin jälkeen; kuva KK:lle; kortti vain, jos vipua pitäisi siirtää.

## Lisäys 15.1x (JU)
Kaatokoe, pysty x3 ja 7 varausta ajossa L1:llä. Rivit /Users/Shared/Claude/julkaisija-tyokalut/nui-61cbc.log (varaus, rc, kesto, VIKA, rinnakkaiset L2-ajot). Runko yhä d092f48cc. JU lähettää rivin, kun valmis.
