# Lontoon 9 uutta tarinapaikkaa: ehdokaslista, valinta ja dataluonnos (SK 14.11.2026, KK 23.00 työ 1)

Tila: LUONNOS, vain docs. Ei koske js/-tiedostoja. Data-PR vasta KK:n sanalla ja tekstien tarkistuksen (lahteet-ja-tarkistus 10) jälkeen.
Korvaa aiemman, ennen KK:n 23.00-ohjetta tehdyn luonnoksen (PR 6768, lontoo-9-tarinapaikkaa-dataluonnos-20261114.md): siitä Baird, Cooke–Wheatstone ja Handel ja Hendrix jatkavat tässä; Perkin, Kristallipalatsi, Rosetta ja Big Benin kello ovat varalla.

Menetelmä (KK 23.00): painotus lehden juttuihin ilman karttapaikkaa. Lehden juttu on `js/packs/maa-kategoriat.js` Lontoon lohkossa (rivit 2648–3700); tarinapaikan teksti on lehtijutun teksti, tarkistettuna ja korjattuna (Pariisin malli). Tarkistus: kaksi itsenäistä lähdettä per väite, Wikipedian kieliversiot eivät laske kahdeksi; kaikki haut Wikipedia/Commons-rajapinnoista tai sivuilta, joiden robots.txt sallii (tarkistettu 14.11.: drjohnsonshouse.org, handelhendrix.org, english-heritage.org.uk, nps.gov, collection.sciencemuseumgroup.org.uk polku /objects/, spitalfieldslife.com, Gutenberg, wiltons.org.uk, museumslondon.org, sherlock-holmes.co.uk, vam.ac.uk (/articles/), thefa.com, britishlistedbuildings.co.uk; epi-snow.ph.ucla.edu ja ushistory.org: ei robots.txt-tiedostoa; ei Disallow koskien käytettyjä polkuja; Britannica, BM, Historic England, Parliament UK, Pepys-päiväkirja antoivat 403 eikä niitä kierretty).

## 1. Ehdokaslista (15)

| # | Ehdokas | Vuosi | Miksi kiinnostava 13-vuotiaalle | Lehdessä | Valittu |
|---|---|---|---|---|---|
| 1 | John Snow ja pumpun kahva | 1854 | kartta ratkaisi rikoksen kaltaisen mysteerin | JUTTU "Kartta, joka paljasti pumpun" (Tiede), ei karttapaikkaa | KYLLÄ |
| 2 | Johnsonin sanakirja | 1755 | yksi mies, kissa ja kaikki englannin sanat | JUTTU "42 773 sanaa yhdestä talosta", ei karttapaikkaa | KYLLÄ |
| 3 | 221B Baker Street | 1890/1990 | osoite, jota ei ollut | JUTTU "Osoite, jota ei ollut olemassa", ei karttapaikkaa | KYLLÄ |
| 4 | Punch ja Pepys, Covent Garden | 1662 | nukke, joka kirkuu swazzlella | JUTTU "Nukke, jolla on syntymäpäivä", ei karttapaikkaa | KYLLÄ |
| 5 | Wilton's Music Hall | 1859 | kristallikruunu, kaasuliekit, pelastettu purulta | JUTTU "Viimeinen suuri music hall", ei karttapaikkaa | KYLLÄ |
| 6 | Football Association 1863 | 1863 | jalkapallon säännöt sovittiin pubissa | JUTTU "Säännöt kirjoitettiin pubin takahuoneessa", ei karttapaikkaa | KYLLÄ |
| 7 | Händel ja Hendrix, Brook Street | 1723–1969 | kaksi taloa, 200 vuotta, yksi seinä | JUTTU "Orkesteri soitti proomulla" (Händel, ei Brook Streetiä) | KYLLÄ |
| 8 | Baird ja televisio | 1926 | ensimmäinen tv-kuva nuken päästä | maininta kulttuurisivulla, ei omaa juttua | KYLLÄ |
| 9 | Cooke ja Wheatstone: sähkötin | 1837 | sähkösanoma kulki ennen kuin juna | ei | KYLLÄ |
| 10 | Perkin ja mauveiini | 1856 | teini keksi värin vahingossa | ei | varalla |
| 11 | Kristallipalatsi | 1851 | lasitalo ilman muuria | maininta Albert Memorialin tekstissä | varalla (vain Wikipedia) |
| 12 | Rosettan kivi | 1802 | kivi avaa hieroglyfit | ei Lontoossa | varalla (BM 403) |
| 13 | Big Benin kello | 1858 | kello halkesi kahdesti | ei | varalla (heikoin lähde) |
| 14 | Chaplin | 1889 | köyhä poika, tunnetuin kasvo | JUTTU "Chaplin oli lontoolainen köyhä poika" | varalla: syntymäpaikka epävarma, Brixtonin laatta kartan etelärajan ulkopuolella |
| 15 | Bow Bells ja cockney | 1941/1961 | kuka on cockney? | JUTTU "Kellot ratkaisevat…", lähellä Cheapsiden kätkön nostoa | varalla: tarkistamatta, päällekkäisyys Cheapsiden kanssa |

Valintaperusteet: kuusi lehtijuttua ilman karttapaikkaa (1–6) ensin; Händel (7) lehdessä mutta Brook Streetin talo vain uutena; Baird ja Cooke (8–9) täydentävät tiedepuolta ja pohjoisen/Soho-jakauman; ei päällekkäisyyttä 26 nähtävyyden, kadonneiden eikä lehtinostojen (Metro, Exchange Alley, Canaletto, George, Abbey Road, Leake, Neljäs jalusta, Turbiinihalli) kanssa; Faraday, Fleming, Brunel, palo, Shakespeare ja Savusumu ovat jo tarinapaikkoja. Alueet: Soho, Fleet/Holborn, Marylebone, Covent Garden, Shadwell, Mayfair, Euston. Kartan raja pohjoinen 51,5291 / etelä 51,4884 / länsi −0,1725 / itä −0,0475; kaikki pisteet sisällä.

## 2. Korjattavaa lehden teksteissä (sääntö 11: sama kaava)

Tarkistus löysi pelissä jo olevista lehtijutuista väitteitä, jotka eivät täyty. Korjaus ehdotetaan samassa data-PR:ssä kuin tarinapaikat:
- Johnson (maa-kategoriat 2909): "muutti 1748" (lähteet 1747/1748/1749), "ilmestyi 15. huhtikuuta 1755" (vain Wikipedian tietolaatikko; sama artikkeli sanoo toisaalla 4.4.), "kuusi apulaista" ja "noin viideltäsadalta kirjailijalta" (ei lähteessä), osteritarina (ei vahvistettu).
- Snow (3406): "616 ihmistä" on yksi arvio; lähteet antavat 420–616 ("yli 500" laatassa).
- 221B (2964): "vuonna 1890 katu loppui numeroon 85" (Wikipedia 85, Museums London "100 asti"); "vakiovastaus: mehiläiset Sussexissa" (ei vahvistu); "vuodesta 1932 aina 2002" (vain Abbey House oli käytössä 1932–2002; sihteerin työvuodet ei lähteessä).
- Punch (3539): "virallinen syntymäpäivä" → "perinteinen"; päivä 9.5.1662 ja sitaatti vain Wikipedia.
- Wilton's (3637): "1 500 työläistä istumaan" (WP: mahtui 1 500, kaikki eivät istuneet); palojälki-väite epävarma (palo 1877); Sellers vain Wikipediassa.
- FA (3678): "kaksitoista seuraa" → noin 12 edustusta, 11 liittyi; "äänestettiin pois" (ei lähteessä); "pubin takahuone" (ei lähteessä).
- Chaplin (3619): "Lambethin vaivaistaloon" (English Heritage: Newington), "koottiin studiolla" (EH: nähtiin ensi kerran elokuvassa 1914).

---

## 3. Dataluonnokset

Kenttä `nosto` uusille: `nosto-<tunniste>`; `merkki` Pariisin joukosta (lamppu = tiede, lyyra = taide ja musiikki, tiimalasi = ilmiö/esine, skandaali).

### 1. Snow 1854
- `nimi: 'Snow 1854', tarinapaikka: true, merkki: 'lamppu', tyyppi: 'henkilo', lat: 51.5133, lon: -0.1367, nosto: 'nosto-snow-broad-street-1854', nimiPuoli: 'vasen'` · aika `1854`
- Teksti:
  > Elokuun lopulla 1854 Sohossa puhkesi koleraepidemia, joka tappoi satoja ihmisiä. Lääkäri John Snow ei uskonut taudin leviävän pahasta hajusta, vaan kiersi ovelta ovelle ja merkitsi jokaisen kuolleen mustana palkkina sen talon kohdalle, jossa tämä oli asunut. Palkit kasautuivat yhden vesipumpun ympärille Broad Streetillä; pumpun kahva irrotettiin 8. syyskuuta, ja myöhemmin selvisi, että kaivon reunasta oli vajaa metri vuotavaan likakaivoon.
  >
  > Läheisen panimon yli seitsemänkymmentä työntekijää ei sairastunut: panimolla oli oma kaivo. Snow ei tuntenut tautia aiheuttavaa bakteeria; se viljeltiin vasta vuonna 1884.
  >
  > Isoisäsi matkavuonna 1873 Snow oli ollut kuolleena viisitoista vuotta. Pumpun paikalla Broadwick Streetin ja Lexington Streetin kulmassa on nykyään kahvaton jäljennös ja John Snow -pubi.
- Lähteet: UCLA Snow-sivusto (epi-snow.ph.ucla.edu, Stream2_BSPoutbreak_a/c/e); Wikipedia 1854 Broad Street cholera outbreak, John Snow, John Snow (public house); laatta 1992. Snow'n ja UCLA:n lähteet ovat osin riippuvaisia (UCLA lainaa Snow'n omaa tekstiä).
- Avoin: toinen riippumaton lähde (London Museum, LSHTM). Kuolinluku jätetty pois. Koordinaatti Wikipedia 51,51333 / −0,13667.
- Kuvat: `Snow-cholera-map-1.jpg` (PD, John Snow; Commons-tarkistettu), `Pump Handle - John Snow .jpg` (CC BY-SA 4.0, Jamzze), `John Snow memorial and pub.jpg` (CC BY-SA 2.0, Justinc).

### 2. Johnson 1755
- `nimi: 'Johnson 1755', tarinapaikka: true, merkki: 'lyyra', tyyppi: 'henkilo', lat: 51.515, lon: -0.1081, nosto: 'nosto-johnsonin-sanakirja-1755'` · aika `1746–1755`
- Teksti:
  > Samuel Johnson allekirjoitti sanakirjasopimuksen kesäkuussa 1746 ja sai palkkioksi 1 500 guineaa. Työ tehtiin talossa numero 17 Gough Squarella Fleet Streetin takana, ja kirja ilmestyi 1755. Siinä oli 42 773 hakusanaa ja noin 114 000 lainausta. Johnson oli luvannut valmistua kolmessa vuodessa; sopimuksesta julkaisuun kului yhdeksän.
  >
  > Hän ei ollut aina vakava. "Lexicographer", sanakirjan tekijä, on hänen mukaansa "vaaraton rehkijä", joka puuhaa sanojen alkuperän jäljillä. "Oats" eli kaura on vilja, jota Englannissa annetaan yleensä hevosille, mutta joka Skotlannissa elättää ihmiset.
  >
  > Talo on ainoa säilynyt Johnsonin Lontoon asunnoista. Nykyään sen edessä istuu pronssinen kissa, Johnsonin Hodge.
- Lähteet: Dr Johnson's House (drjohnsonshouse.org: johnsons-dictionary, 17-gough-square, timeline); Wikipedia A Dictionary of the English Language, Dr Johnson's House.
- Avoin: DJH ja Wikipedia osin samaa tekstiä (42 773 / 114 000); toiseksi British Library tai British Museum. Muuttovuosi ja julkaisupäivä jätetty pois (lähteet eroavat). Koordinaatti Wikipedia 51,515 / −0,10806 [1L].
- Kuvat: `Dr Johnson's House, Gough Square - geograph.org.uk - 5590547.jpg` (CC BY-SA 2.0, Paul Farmer; Commons-tarkistettu).

### 3. 221B Baker Street
- `nimi: '221B Baker Street', tarinapaikka: true, merkki: 'tiimalasi', tyyppi: 'ilmio', lat: 51.5237, lon: -0.1585, nosto: 'nosto-221b-baker-street'` · aika `1887–1990`
- Teksti:
  > Arthur Conan Doyle antoi Sherlock Holmesille osoitteen 221B Baker Street, vaikka sellaista ei vielä ollut: vuonna 1890 kadun numerot loppuivat alle sataan. Vasta 1930-luvulla Baker Streetiä pidennettiin ja talot numeroitiin uudelleen. Numerot 219–229 osuivat rakennusyhtiön uuteen pääkonttoriin, jonne alkoi tulla kirjeitä Holmesille, ja yhtiö palkkasi sihteerin vastaamaan niihin.
  >
  > Vuonna 1990 avattu Sherlock Holmes -museo sai Westminsterin kaupungilta luvan käyttää osoitetta 221b, vaikka sen talo on oikeasti numeroiden 237 ja 241 välissä.
- Lähteet: Wikipedia 221B Baker Street, Sherlock Holmes Museum, Abbey National; Museums London (museumslondon.org/museum/90); Sherlock Holmes Museum (sherlock-holmes.co.uk).
- Avoin: uudelleennumerointi ja yhtiön osoite (219–229) vain Wikipedia [1L]; toinen lähde Westminsterin kaupunki tai Sherlock Holmes Society. Vakiovastaus "mehiläiset" ja sihteerin vuodet pois. Koordinaatti Wikipedia 51,5237 / −0,1585.
- Kuvat: `Sherlock Holmes Museum, Baker Street, London (2).jpg` (CC BY-SA 4.0, MOs810; Commons-tarkistettu).

### 4. Punch 1662
- `nimi: 'Punch 1662', tarinapaikka: true, merkki: 'tiimalasi', tyyppi: 'ilmio', lat: 51.5114, lon: -0.1242, nosto: 'nosto-punch-pepys-1662'` · aika `1662`
- Teksti:
  > Samuel Pepys kirjoitti päiväkirjaansa 9. toukokuuta 1662 nähneensä Covent Gardenissa italialaisen nukketeatterin, joka oli hänen mielestään hyvin sievä. Nukettaja oli italialainen Pietro Gimonde, ja Napolin Pulcinellasta tuli Englannissa Mr Punch. Tuota päivää pidetään perinteisesti Punchin syntymäpäivänä.
  >
  > Punchin kimeä kirkuna syntyy swazzlesta, kahdesta metalliliuskasta ja niiden välisestä nauhasta, jota nukettaja pitää suussaan. Punchista on jäänyt englantiin sanonta: "pleased as Punch" tarkoittaa hyvin tyytyväistä.
- Lähteet: Wikipedia Punch and Judy, Swazzle; V&A "That's the way to do it" (vam.ac.uk).
- Avoin: päivä 9.5. ja sitaatti vain Wikipedia [1L] (Pepysin päiväkirja 403). Laatan tarkka paikka (St Paul's Church, Bedford Street) ei vahvistunut. Koordinaatti Wikipedia St Paul's 51,51139 / −0,12417.
- Kuvat: `Near this spot Punch's Puppet Show was first performed in England and witnessed by Samuel Pepys 1662.jpg` (CC BY-SA 4.0, Spudgun67; Commons-tarkistettu).

### 5. Wilton's 1859
- `nimi: "Wilton's 1859", tarinapaikka: true, merkki: 'lyyra', tyyppi: 'taide', lat: 51.5107, lon: -0.0669, nosto: 'nosto-wiltons-music-hall-1859'` · aika `1859`
- Teksti:
  > John Wilton rakensi vuonna 1859 pubinsa, Mahogany Barin, taakse Tower Hamletsiin salin työväen varieteeta varten. Katosta riippui valtava kristallikruunu, jossa oli noin 300 kaasuliekkiä ja 27 000 hiottua kristallia.
  >
  > Sali ehti olla metodistien lähetysasema vuoteen 1956 asti ja sen jälkeen lumppuvarasto, ja 1960-luvun alussa sille oli tehty purkusuunnitelmat. Talo pelastettiin: yleisökokous 1964, koomikko Spike Milligan mukana kampanjassa. Se suojeltiin 1971, ja nykyään siellä on taas teatteri.
- Lähteet: Wilton's Music Hall (wiltons.org.uk/about-us/history); Wikipedia Wilton's Music Hall.
- Avoin: Wilton'sin sivu ja Wikipedia lähes sama teksti (ei täysin itsenäinen); kruunun luvut vain Wikipedia (Building News 1859) [1L]; Sellers jätetty pois (vain Wikipedia); luokitus Grade II* ja kuukausi huhtikuu vain Wikipedia. Koordinaatti Wikipedia 51,51068 / −0,06693.
- Kuvat: `Wilton's Music Hall - Interior.jpg` (CC BY 3.0, Kbthompson; Commons-tarkistettu).

### 6. Football Association 1863
- `nimi: 'Jalkapallo 1863', tarinapaikka: true, merkki: 'tiimalasi', tyyppi: 'ilmio', lat: 51.5157, lon: -0.1208, nosto: 'nosto-jalkapallon-saannot-1863'` · aika `1863`
- Teksti:
  > Maanantai-iltana 26. lokakuuta 1863 Lontoon Freemasons' Tavernissa kokoontui noin kaksitoista seuraa sopimaan yhteisistä säännöistä; yksitoista liittyi uuteen Football Associationiin. Siihen asti koulut ja seurat pelasivat omilla sääntöillään. Kiistakohta oli "hacking", vastustajan potkiminen sääreen: Blackheath halusi pitää sen, mutta joulukuun 8. päivänä hyväksytyissä säännöissä sitä ei ollut.
  >
  > Blackheath erosi liitosta, ja muut rugbyseurat perustivat myöhemmin, vuonna 1871, oman liittonsa. Tavernin tilalla on nykyään Grand Connaught Rooms, ja seinässä on FA:n laatta.
- Lähteet: The FA (thefa.com, history); Wikipedia The Football Association, Freemasons' Tavern; Historic England -luettelo 1393970 (luettu British Listed Buildings -peilistä).
- Avoin: käsin kantaminen pois: vain Wikipedia [1L], jätetty pois; RFU 1871: vain Wikipedia [1L]; laatan teksti: Open Plaques #31583 / Commons. Koordinaatti laatan Commons-piste 51,5157 / −0,1208.
- Kuvat: `Original laws of the game 1863.jpg` (CC BY-SA 3.0, Adrian Roebuck; lisenssi tarkistettava, lehdessä jo käytössä); laatta: `The Football Association was formed on the proposal of Ebenezer Cobb Morley at the Freemasons' Tavern, which stood on this site.jpg` (Commons; lisenssi tarkistettava).

### 7. Händel ja Hendrix — kaksi lähdettä täyttyy
- `nimi: 'Händel ja Hendrix', tarinapaikka: true, merkki: 'lyyra', tyyppi: 'henkilo', lat: 51.5131, lon: -0.146, nosto: 'nosto-handel-hendrix-brook-street'` · aika `1723–1969`
- Teksti:
  > Mayfairin Brook Streetillä on kaksi vierekkäistä taloa, joissa asuivat kaksi maailman kuuluisinta muusikkoa. Säveltäjä Georg Friedrich Händel muutti numeroon 25 vuonna 1723 ja asui siellä kuolemaansa saakka 14. huhtikuuta 1759. Elokuun 22. ja syyskuun 14. päivän välillä 1741 hän sävelsi 24 päivässä Messias-oratorion, ja English Heritagen mukaan se syntyi tässä talossa.
  >
  > Kaksisataa vuotta myöhemmin viereisessä talossa, numerossa 23, asui vuosina 1968–69 kitaristi Jimi Hendrix. Kerrotaan, että kun hän sai tietää Händelin asuneen viereisessä talossa, hän osti levyn Messiaasta.
  >
  > Isoisäsi matkavuonna 1873 Händel oli ollut kuolleena jo 114 vuotta. Nykyään talot ovat yhdessä museo.
- Lähteet: English Heritage (blue-plaques/george-frideric-handel, jimi-hendrix); Handel Hendrix House (handelhendrix.org); Wikipedia Handel & Hendrix in London, Messiah (Handel). EH ja HHH ovat kaksi erillistä lähdettä.
- Avoin: "syntyi tässä talossa" vain EH sanoo suoraan (Wikipedia "believed"), siksi lähdemaininta tekstissä. Lehden Händel-juttu (Vesimusiikki 1717) jää omaksi lehtijutukseen. Koordinaatti EH 51,5131 / −0,14606.
- Kuvat: `Hendrix and Handel houses, Brook Street.jpg` (CC BY-SA 3.0, Oosoom), `Handel Hendrix House Museum, Jimi Hendrix's bedroom.jpg` (CC0, AndyScott); Händel-muotokuva `George Frideric Handel by Thomas Hudson.jpg` (PD; lehdessä käytössä).

### 8. Baird 1926
- `nimi: 'Baird 1926', tarinapaikka: true, merkki: 'lamppu', tyyppi: 'henkilo', lat: 51.5134, lon: -0.1313, nosto: 'nosto-baird-televisio-1926', nimiPuoli: 'oikea'` · aika `1926`
- Teksti:
  > Tammikuun 26. päivänä 1926 Soon Frith Streetin laboratoriossa skotlantilainen John Logie Baird näytti Royal Institutionin jäsenille ja The Timesin toimittajalle liikkuvaa kuvaa, joka kulki langattomasti huoneesta toiseen. Se oli televisioesityksen alku: kuva piirrettiin pyörivällä kiekolla, jonka saksalainen Paul Nipkow oli keksinyt jo 1884. Times kirjoitti siitä 28. tammikuuta.
  >
  > Kokeissaan Baird käytti ventriloquistin nukkea, Stooky Billiä, koska valot olivat liian kuumia ihmiselle. Isoisäsi matkavuonna 1873 televisiota ei ollut vielä edes ajatuksena: Baird syntyi vasta 1888. Nykyään talossa on Bar Italia.
- Lähteet: Wikipedia John Logie Baird, Stooky Bill, Bar Italia; Science Museum Group (Stooky Bill, co8067247, polku /objects/ sallittu).
- Avoin: päivä ja paikka vain Wikipedia [1L], toinen lähde IEEE/ETHW tai Science Museum; "ensimmäinen"-väitettä ei kirjoiteta (sääntö 5). Stooky Billin yhteys juuri 26.1. näytökseen ei ole lähteissä (ei väitetä). Koordinaatti Wikipedia Bar Italia 51,51339 / −0,13135.
- Kuvat: `John Logie Baird and Stooky Bill.png` (PD, Orrin Dunlap Jr. 1926; Commons-tarkistettu), `Bar Italia 22 Frith Street Soho London W1D 4RF.jpg` (CC BY-SA 4.0).

### 9. Sähkötin 1837
- `nimi: 'Sähkötin 1837', tarinapaikka: true, merkki: 'lamppu', tyyppi: 'esine', lat: 51.5284, lon: -0.1331, nosto: 'nosto-sahkotin-euston-1837', nimiPuoli: 'oikea', siirto: { x: 26, y: 0 }` · aika `1837` (Euston Arch -tähti 110 m lounaassa)
- Teksti:
  > Heinäkuun 25. päivänä 1837 Euston-aseman ja Camden Townin välille vedettiin johdot, ja kaksi miestä pystyi puhumaan toisilleen ilman ääntä. William Cooke ja Charles Wheatstone olivat sopineet yhteistyöstä saman vuoden toukokuussa ja ottaneet yhteisen patentin.
  >
  > Rautatiellä sähköttimelle oli todellinen tarve: Eustonista Camden Towniin nouseva rinne oli niin jyrkkä, että junat vedettiin kaapelilla, ja koneistolle piti saada käsky vedosta. Rautatieyhtiö suhtautui kokeeseen välinpitämättömästi, mutta Great Western Railway otti laitteen käyttöön Paddingtonin ja West Draytonin välillä. Isoisäsi matkavuonna 1873 sähkötin oli rautateillä jo arkea.
- Lähteet: Munro, Heroes of the Telegraph (1891, Gutenberg); Dictionary of National Biography, Cooke (Wikisource); IET-arkisto (Cooke); Wikipedia Cooke and Wheatstone telegraph, Euston railway station.
- Avoin: koepäivä 25.7. ja kaapelivedon väite vain Munro/Wikipedia; toinen lähde Science Museum / ETHW. Neulojen määrä (4/5) ja GWR:n vuosi (1838/1839) jätetty pois; laattaa ei löytynyt. Koordinaatti Wikipedia 51,5284 / −0,1331.
- Kuvat: `Charles Wheatstone later years.jpg` (PD; Commons-tarkistettu), `WmFCooke1837FingerKey-AlfredVailLever1844-RWLipack-Owner.jpg` (CC BY-SA 4.0, Richard Warren Lipack), `Cooke and Wheatstone electric telegraph.jpg` (CC BY-SA 4.0, Geni).

---

## 4. Yhteenveto

| # | Paikka | Lehti | Lähdetila | Ennen dataa |
|---|---|---|---|---|
| 7 | Händel ja Hendrix | osa | 2 lähdettä täyttyy | KK hyväksyy |
| 1 | Snow | juttu | hyvä | London Museum/LSHTM |
| 2 | Johnson | juttu | keskitaso, 5 korjattavaa lehdessä | British Library |
| 6 | FA 1863 | juttu | keskitaso | RFU 1871, laattakuva |
| 5 | Wilton's | juttu | keskitaso | Historic England luokitus |
| 3 | 221B | juttu | keskitaso | uudelleennumerointi 2. lähde |
| 4 | Punch | juttu | keskitaso | Pepys-merkintä 2. lähde |
| 8 | Baird | maininta | keskitaso | IEEE/ETHW |
| 9 | Sähkötin | ei | keskitaso | Science Museum/ETHW |

Seuraavat askeleet (KK:n sanalla): 1) aiheiden hyväksyntä tai vaihto, 2) lehtitekstien korjaukset (kohta 2) samaan data-PR:ään, 3) kuvien lisenssitunnisteet (FA-kuvat tarkistettava), 4) data-PR (maakartat.js 9 kohdetta + nahtavyysjutut.js 9 tekstiä + tarkista.mjs-jonorivit), 5) tarkistaja ja KK:n faktahyväksyntä ennen ääntä.
