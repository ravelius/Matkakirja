# Lontoon 9 uutta tarinapaikkaa: dataluonnos (SK 14.11.2026, KK 22.48 kohta 2)

Tila: LUONNOS, ei data-PR. Ei koske js/-tiedostoja. Data-PR vasta KK:n sanalla ja tekstien tarkistuksen (lahteet-ja-tarkistus 10) jälkeen.
Tavoite: Lontoolla 6 tarinapaikkaa, Pariisilla 15; 9 uutta tuo Lontoon samalle tasolle (15).

## Valinta ja perusteet

- Ei päällekkäisyyttä olemassa olevien kanssa: Faraday, Fleming, Brunel, Lontoon palo, Shakespeare, Savusumu ovat jo tarinapaikkoja; Euston Arch, Westminster, Whitehall, Newgate, Greenwich ovat kadonneita; Metro, Exchange Alley, Canaletto, Dickensin pubi, Abbey Road, Leake Street, Neljäs jalusta, Turbiinihalli ovat lehtinostoja.
- Mukana vain paikat kartan rajojen sisällä (pohjoinen 51,5291, etelä 51,4884, länsi −0,1725, itä −0,0475). Harrisonin kronometri (Greenwich) putosi pois: paikka kartan ulkopuolella.
- Pariisin malli: tyyppi `henkilo`/`esine`/`ilmio`/`taide`, `merkki` (lamppu = tiede, lyyra = taide ja musiikki, tiimalasi = ilmiö, skandaali), `tarinapaikka: true`, `nosto: 'nosto-…'`. Teksti kolmena kappaleena, viimeinen sidotaan vuoteen 1873 vain jos lähde kantaa.
- Sävy: tieteen/keksinnön neljä (Snow, Perkin, Cooke–Wheatstone, Baird), kaksi rakennetta/esinettä (Kristallipalatsi, Rosetta), kolme kulttuuria (Johnson, Big Ben -kello, Handel ja Hendrix).

## Tarkistustila (rehellinen)

Raamatun sääntö 2 vaatii kaksi itsenäistä lähdettä. Tutkimus (14.11., web-fetch-apulaiset) täytti sen kunnolla vain Handel ja Hendrix -tarinalle (English Heritage + Handel Hendrix House). Muissa osa lähteistä on Wikipedia tai samaan ryhmään kuuluvia museosivustoja. Britannica, British Museum, Historic England, parliament.uk ja useat muut antoivat 403/404. Tekstit on kirjoitettu niin, että ne sisältävät vain väitteet, joille on vähintään kaksi lähdettä tai jotka ovat pyöristettyjä ja ristiriidattomia; jokaisen tarinan alla on "Avoin" -rivi: mitä pitää vielä vahvistaa ennen dataa. Merkintä [1L] = vain yksi lähde, ei käytetty tekstissä.

---

## 1. Snow 1854 (Broad Streetin pumppu)

- Data: `nimi: 'Snow 1854', tarinapaikka: true, merkki: 'lamppu', tyyppi: 'henkilo', lat: 51.5133, lon: -0.1367, nosto: 'nosto-snow-broad-street-1854'`, `nimiPuoli: 'vasen'` (Baird 1926 on 370 m itäkaakossa).
- aika: `1854`
- Teksti:
  > Elokuun lopussa 1854 Sohon Broad Streetillä alkoi koleraepidemia, joka tappoi satoja ihmisiä muutamassa viikossa. Lääkäri John Snow merkitsi kuolemat kartalle talo talolta ja huomasi, että ne kasautuivat yhden vesipumpun ympärille. Syyskuun 8. päivänä pumpun kahva otettiin pois käytöstä. Epidemia oli silloin jo laantumassa, joten kahvan irrotus ei yksin sitä lopettanut, mutta Snow'n kartta alkoi muuttaa käsitystä siitä, mistä tauti leviää.
  >
  > Panimon yli seitsemänkymmentä työntekijää ei sairastunut. Panimolla oli oma kaivo, ja työntekijät saivat työssä olutta. Snow ei tuntenut tautia aiheuttavaa bakteeria eikä tiennyt, mikä vedessä oli: Vibrio cholerae viljeltiin vasta vuonna 1884.
  >
  > Isoisäsi matkavuonna 1873 Snow oli ollut kuolleena viisitoista vuotta, ja hänen vastustajansa William Farr oli hyväksynyt veden roolin jo vuonna 1866. Pumpun paikalla Broadwick Streetin ja Lexington Streetin kulmassa on nykyään kahvaton replika ja John Snow -pubi.
- Lähteet: UCLA Snow-sivusto (Stream2_BSPoutbreak_a, _c, _e; Snow 1855 ja Summers); Wikipedia 1854 Broad Street cholera outbreak, John Snow, John Snow (public house); laatta 1992 ("over 500 people died in Soho").
- Avoin: Snow'n ja UCLA-sivuston lähteet ovat riippuvaisia toisistaan; toiseksi lähteeksi London Museum / LSHTM / RSC-laatta. Uhrimäärää ei kirjoiteta (lähteet 420–616). Pumpun paikalla 1873 TUNT. (siksi vain "nykyään").
- Kuvat (Commons): `Pump Handle - John Snow .jpg` (CC BY-SA 4.0, Jamzze), `John Snow memorial and pub.jpg` (CC BY-SA 2.0, Justinc); muotokuva `Portrait of John Snow by Thomas Jones Barker.jpg` (PD, T. J. Barker 1847).

## 2. Perkin 1856 (mauveiini)

- Data: `nimi: 'Perkin 1856', tarinapaikka: true, merkki: 'lamppu', tyyppi: 'henkilo', lat: 51.5112, lon: -0.056, nosto: 'nosto-perkin-mauveiini-1856'`. Piste on Cable Streetin keskipiste [Wikipedia, Cable Street]; laatan tarkka paikka (King David Lanen kulma) vahvistettava.
- aika: `1856`
- Teksti:
  > Pääsiäislomalla 1856 kahdeksantoistavuotias William Perkin yritti kotilaboratoriossaan Itä-Lontoossa valmistaa kiniiniä, malarian lääkettä. Koe epäonnistui: aniliinin hapetus jätti pohjalle mustan sakan. Kun Perkin puhdisti sen alkoholilla, liuos värjäytyikin purppuranpunaiseksi, ja kangas otti värin.
  >
  > Hän haki patenttia 26. elokuuta 1856. Mauveiini oli ensimmäinen synteettinen väriaine, ja sillä värjättyjä kankaita näkyi muotipiireissä: keisarinna Eugénie ja kuningatar Victoria esiintyivät värissä. Väri haalistui kuitenkin nopeasti valossa.
  >
  > Ei kemisti, vaan nuori poika kotikellarissa: kiniinin sijaan syntyi väri, joka muutti vaatteet ja värjäysteollisuuden.
- Lähteet: Science Museum Group (esinekortti co67835; blogi "Mauve mania"); Science and Industry Museum (blogi "World's first synthetic dye"); Wikipedia William Henry Perkin, Mauveine, Cable Street.
- Avoin: kolme museosivua ovat saman ryhmän; toinen riippumaton lähde (RSC / Royal Society biografia). Laboratorion tarkka paikka (ylin kerros / puutarhamökki) jätetty pois, koska lähteet eroavat. Viimeinen kappale on tyyliluonnos, ei faktaa: KK päättää.
- Kuvat: `Portrait of William Henry Perkin (1838-1907) - DPLA - a2d95d7d49f34a7232a56e6c1c0b6030.jpg` (PD, Elliott & Fry), `Mauvinfärgad klänning.jpg` (CC BY-SA 4.0).

## 3. Cooke ja Wheatstone 1837 (sähkötin)

- Data: `nimi: 'Sähkötin 1837', tarinapaikka: true, merkki: 'lamppu', tyyppi: 'esine', lat: 51.5284, lon: -0.1331, nosto: 'nosto-sahkotin-euston-1837'`, `nimiPuoli: 'oikea', siirto: { x: 26, y: 0 }` (Euston Arch -tähti 110 m lounaassa).
- aika: `1837`
- Teksti:
  > Heinäkuun 25. päivänä 1837 Euston-aseman ja Camden Townin välille vedettiin johdot, ja kaksi miestä pystyi puhumaan toisilleen ilman ääntä. William Cooke ja Charles Wheatstone olivat sopineet yhteistyöstä saman vuoden toukokuussa ja ottaneet yhteisen patentin.
  >
  > Rautatiellä sähköttimelle oli todellinen tarve: Eustonista Camden Towniin nouseva rinne oli niin jyrkkä, että junat vedettiin kaapelilla, ja koneistolle piti saada käsky vedosta. Rautatieyhtiö suhtautui kokeeseen välinpitämättömästi, mutta Great Western Railway otti laitteen käyttöön Paddingtonin ja West Draytonin välillä.
  >
  > Isoisäsi matkavuonna 1873 sähkötin oli rautateillä jo arkea. Cooke ja Wheatstone olivat vielä elossa.
- Lähteet: Munro, Heroes of the Telegraph (1891, Gutenberg); DNB-artikkeli Cooke (Wikisource); IET-arkisto (Cooke); Wikipedia Cooke and Wheatstone telegraph, Euston railway station.
- Avoin: neulojen määrä (4/5) ja GWR:n vuosi (1838/1839) jätetty pois; koe-päivälle 25.7. toinen itsenäinen lähde (Science Museum / ETHW). Kaapelivedon väite (Wikipedia Euston) vahvistettava toisesta lähteestä. "Kuka missä" (Wheatstone Eustonissa, Cooke Camden Townissa) on vain Munrolla [1L], ei tekstissä. Laattaa ei löytynyt.
- Kuvat: `Charles Wheatstone later years.jpg` (PD), `WmFCooke1837FingerKey-AlfredVailLever1844-RWLipack-Owner.jpg` (CC BY-SA 4.0, Richard Warren Lipack), `Cooke and Wheatstone electric telegraph.jpg` (CC BY-SA 4.0, Geni).

## 4. Kristallipalatsi 1851

- Data: `nimi: 'Kristallipalatsi 1851', tarinapaikka: true, merkki: 'tiimalasi', tyyppi: 'ilmio', lat: 51.5031, lon: -0.17, nosto: 'nosto-kristallipalatsi-1851'`, `nimiPuoli: 'oikea'` (kartan länsireuna −0,1725). Piste Wikipedian Great Exhibition -infolaatikosta; W-CP:n mukaan "lähellä Princes Gatea" (sama alue).
- aika: `1851–1936`
- Teksti:
  > Toukokuun 1. päivänä 1851 kuningatar Victoria avasi Hyde Parkissa maailmannäyttelyn rakennuksessa, jota lehdet kutsuivat kristallipalatsiksi: rautarunkoa ja lasia, jonka Joseph Paxton, entinen Chatsworthin puutarhuri, oli suunnitellut kasvihuoneiden mallista. Rakennus koottiin valmiista, samanlaisista osista, ja puiston täysikasvuiset jalavat jäivät katon alle.
  >
  > Näyttely päättyi 15. lokakuuta 1851, ja siellä kävi yli kuusi miljoonaa kävijää. Palatsi purettiin ja pystytettiin uudelleen Sydenhamin kukkulalle, missä kuningatar avasi sen kesäkuussa 1854.
  >
  > Isoisäsi vuonna 1873 se seisoi yhä Sydenhamissa. Hyde Parkin paikalla ei ollut enää mitään. Marraskuun 30. päivänä 1936 palatsi paloi tuhkaksi.
- Lähteet: Wikipedia The Crystal Palace, Great Exhibition; Royal Parks / V&A / Museum of London (hakematta, 403-ongelmat).
- Avoin: kaikki kohdat vain Wikipedia [1L]; toinen lähde ennen dataa (Historic England, V&A, Royal Parks tai Britannica selaimella). Mitat ja hinnat jätetty pois (lähteet eroavat: 1 848/1 851 ft ym.). "Jalavat" ja "valmiista osista" vahvistettava.
- Kuvat: `Crystal Palace - interior.jpg` (PD, J. McNeven), `Crystal Palace - Queen Victoria opens the Great Exhibition.jpg` (PD, Louis Haghe), `Crystal Palace Great Exhibition tree 1851.png` (PD).

## 5. Baird 1926 (Frith Street)

- Data: `nimi: 'Baird 1926', tarinapaikka: true, merkki: 'lamppu', tyyppi: 'henkilo', lat: 51.5134, lon: -0.1313, nosto: 'nosto-baird-televisio-1926'`, `nimiPuoli: 'oikea'`.
- aika: `1926`
- Teksti:
  > Tammikuun 26. päivänä 1926 Soon Frith Streetin ullakkolaboratoriossa skotlantilainen John Logie Baird näytti Royal Institutionin jäsenille ja The Timesin toimittajalle liikkuvaa kuvaa, joka kulki langattomasti huoneesta toiseen. Se oli ensimmäinen todellisten televisiokuvien näytös valikoidulle yleisölle. Times kirjoitti siitä 28. tammikuuta.
  >
  > Televisio oli mekaaninen: kuva piirrettiin pyörivällä kiekolla, jonka saksalainen Paul Nipkow oli keksinyt jo 1884. Kokeissaan Baird käytti ventriloquistin nukkea, Stooky Billiä, koska valot olivat liian kuumia ihmiselle.
  >
  > Isoisäsi matkavuonna 1873 televisiota ei ollut vielä edes ajatuksena: Baird syntyi vasta 1888. Nykyään talossa on Bar Italia.
- Lähteet: Wikipedia John Logie Baird, Stooky Bill, Bar Italia; Science Museum Group (Stooky Bill, co8067247).
- Avoin: päivä ja paikka vain Wikipedia [1L], toinen lähde IEEE/ETHW tai Science Museum; "ensimmäinen todellisten televisiokuvien näytös" -rajaus on Wikipedian sanamuoto, superlatiivi vaatii kaksi lähdettä (sääntö 5): jos ei, muotoon "valikoidulle yleisölle näytetty televisiokuva". Stooky Billin yhteys juuri 26.1. näytökseen ei ole lähteissä (ei väitetä). Päivämäärä 1873-kappaleessa "ei ollut ajatuksena" on tyylillinen; KK arvioi.
- Kuvat: `John Logie Baird and Stooky Bill.png` (PD, Orrin Dunlap Jr. 1926; Commons-tarkistettu), `Bar Italia 22 Frith Street Soho London W1D 4RF.jpg` (CC BY-SA 4.0).

## 6. Rosetta 1802 (British Museum)

- Data: `nimi: 'Rosetta 1802', tarinapaikka: true, merkki: 'tiimalasi', tyyppi: 'esine', lat: 51.5194, lon: -0.1269, nosto: 'nosto-rosettan-kivi-1802'` (British Museum, Wikipedia-koordinaatti).
- aika: `1799–1822`
- Teksti:
  > Heinäkuussa 1799 ranskalaiset sotilaat purkivat linnoitusta Rashidin (Rosetta) lähellä Egyptissä ja löysivät kiven, jossa sama teksti oli kolmella kirjoitusjärjestelmällä: hieroglyfeinä, demoottisena ja antiikin kreikkana. Britit saivat kiven käsiinsä Egyptin sotaretkellä, ja se saapui Lontooseen helmikuussa 1802. Sen kylkeen maalattiin: "Captured in Egypt by the British Army in 1801" (britit valtasivat Egyptissä 1801).
  >
  > Kreikkaa osattiin lukea, joten kivi antoi avaimen hieroglyfeihin. Thomas Young tunnisti nimen "Ptolemaios" vuonna 1814, ja ranskalainen Jean-François Champollion esitteli hieroglyfien äänneperiaatteen syyskuussa 1822.
  >
  > Isoisäsi matkavuonna 1873 kivi oli ollut British Museumissa esillä jo yli kuusikymmentä vuotta. Se on tänäkin päivänä museon suosituin yksittäinen esine; Egypti on vaatinut sitä takaisin vuodesta 2003.
- Lähteet: Wikipedia Rosetta Stone; British Museum (esinesivu Y_EA24), Britannica (molemmat 403, hakematta).
- Avoin: KAIKKI vain Wikipedia [1L]; ei kirjoiteta ennen kuin BM tai Britannica avattu. Kiven tarkka siirtotapa (Aleksandrian antautumisen ehdot / Turner) on lähteissä epäselvä, tekstissä vain "britit saivat". "Suosituin esine" -superlatiivi vaatii kaksi lähdettä. Kolmas tarina-aihe (Champollion/Young) on tavallista yleistietoa, mutta vuosiluvut tarkistettava.
- Kuvat: `Rosetta Stone.JPG` (CC BY-SA 4.0, Hans Hillewaert), `Rosetta Stone, British Museum.jpg` (CC BY 4.0, APK).

## 7. Johnson 1755 (Gough Square)

- Data: `nimi: 'Johnson 1755', tarinapaikka: true, merkki: 'lyyra', tyyppi: 'henkilo', lat: 51.515, lon: -0.1081, nosto: 'nosto-johnsonin-sanakirja-1755'`. Piste Wikipedia (Dr Johnson's House) [1L]; vahvistettava.
- aika: `1746–1755`
- Teksti:
  > Vuonna 1746 kustantajat sopivat kirjailija Samuel Johnsonin kanssa englannin kielen sanakirjasta: palkka oli 1 500 guineaa, ja Johnson lupasi valmistua kolmessa vuodessa. Valmista tuli vasta 1755. Hän asui ja teki työtä Fleet Streetin pohjoispuolella, talossa 17 Gough Squarella; muut Johnsonin Lontoon asunnot ovat kadonneet.
  >
  > Sanakirjassa oli 42 773 hakusanaa ja noin 114 000 lainausta kirjailijoilta. Johnson ei ollut aina vakava. "Lexicographer", sanakirjan tekijä, on hänen mukaansa "vaaraton rehkijä", joka puuhaa sanojen alkuperän jäljillä. "Oats" eli kaura on vilja, jota Englannissa annetaan yleensä hevosille, mutta joka Skotlannissa elättää ihmiset.
  >
  > Isoisäsi vuonna 1873 talo seisoi vielä Gough Squarella, mutta ei museona: se oli vuokrattuna majoitukseen, kirjapainoksi tai varastoksi. Cecil Harmsworth osti sen rappiotilassa vuonna 1911 ja kunnosti sen.
- Lähteet: Dr Johnson's House (drjohnsonshouse.org: Johnson's Dictionary, 17 Gough Square, Timeline); Wikipedia A Dictionary of the English Language, Dr Johnson's House.
- Avoin: DJH ja Wikipedia ovat osin samaa tekstiä (42 773 ja 114 000 lainausta), toinen itsenäinen lähde (British Library tai Britannica). Julkaisupäivä (15.4. / 4.4.) jätetty pois; talon käyttö 1873 on TUNT. ("vuokrattu"), joten tämä virke vahvistettava tai poistettava. Kolme vuotta -lupaus on DJH:n lause [1L]. Harmsworthin ammattia ei kirjoiteta (lähteissä vain nimi).
- Kuvat: `Dr Johnson's House, Gough Square - geograph.org.uk - 5590547.jpg` (CC BY-SA 2.0), `Samuel Johnson's House, Gough Square EC4 - geograph.org.uk - 1272450.jpg` (CC BY-SA 2.0).

## 8. Big Benin kello 1858 (Whitechapelin valimo)

- Data: `nimi: 'Big Ben 1858', tarinapaikka: true, merkki: 'tiimalasi', tyyppi: 'esine', lat: 51.5169, lon: -0.0672, nosto: 'nosto-whitechapelin-kello-1858'`. Piste Wikipedia (Whitechapel Bell Foundry) [1L].
- aika: `1858`
- Teksti:
  > Whitechapel Roadin varrella, talossa numero 32–34, toimi vuodesta 1570 kellovalimo, joka oli samalla paikalla yli kaksisataa vuotta. Siellä valettiin vuonna 1858 Westminsterin kellotornin suuri kello, jonka kaikki tuntevat nimellä Big Ben. Kello painaa noin kolmetoista tonnia. Ensimmäinen, Teessidessa valettu kello oli haljennut koekäytössä.
  >
  > Vuonna 1859 uusi kello halkesi vasaran alla: vasara oli liian painava. Kelloa käännettiin, jotta vasara osui uuteen kohtaan, ja se soi siitä lähtien hieman rikkinäisellä äänellä.
  >
  > Valimo suljettiin vuonna 2017. Sen kuuluisin vientituote oli Yhdysvaltain Liberty Bell: vuonna 1751 tilattu kello halkesi ensimmäisessä koesoitossa, ja nykyinen kello valettiin uudelleen Philadelphiassa.
- Lähteet: Wikipedia Big Ben, Whitechapel Bell Foundry; Spitalfields Life 2.12.2016 (vahvistaa vain: "valmistettu täällä", suljetaan 2017); National Park Service (Liberty Bell), ushistory.org (Liberty Bell).
- Avoin: Big Benin tiedot ovat vain Wikipedian tiivistelmän varassa [1L]; EI SAA kirjoittaa dataan ennen kuin Parliament UK tai Britannica avattu. Ensisoitto 31.5. / 11.7.1859 ja nimen alkuperä (Hall / Caunt) jätetty pois. "Hieman rikkinäinen ääni" ja "noin kolmetoista tonnia" tarkistettava. Ayrton Light 1873 (Wikipedia) olisi hyvä 1873-kohta, kun toinen lähde löytyy. Liberty Bell -kappale on NPS:n mukainen; "kuuluisin vientituote" on tyyliluonnos, poistetaan jos ei lähdettä.
- Kuvat: `Whitechapel bell foundry - geograph.org.uk - 194941.jpg` (CC BY-SA 2.0), `Cast Bells Whitechapel Bell Foundry 01.jpg` (PD).

## 9. Handel ja Hendrix (Brook Street) — kaksi lähdettä täyttyy

- Data: `nimi: 'Handel ja Hendrix', tarinapaikka: true, merkki: 'lyyra', tyyppi: 'henkilo', lat: 51.5131, lon: -0.146, nosto: 'nosto-handel-hendrix-brook-street'`. Koordinaatti: English Heritage 51,5131/−0,14606 ja Wikipedia 51,513/−0,1459 sopivat.
- aika: `1723–1969`
- Teksti:
  > Mayfairin Brook Streetillä on kaksi vierekkäistä taloa, joissa asuivat kaksi maailman kuuluisinta muusikkoa. Säveltäjä Georg Friedrich Händel muutti numeroon 25 vuonna 1723 ja asui siellä kuolemaansa saakka 14. huhtikuuta 1759. Elokuun 22. ja syyskuun 14. päivän välillä 1741 hän sävelsi 24 päivässä Messias-oratorion, ja English Heritagen mukaan se syntyi tässä talossa.
  >
  > Kaksisataa vuotta myöhemmin viereisessä talossa, numerossa 23, asui vuosina 1968–69 kitaristi Jimi Hendrix. Kerrotaan, että kun hän sai tietää Händelin asuneen viereisessä talossa, hän osti levyn Messiaasta.
  >
  > Isoisäsi matkavuonna 1873 Händel oli ollut kuolleena jo 114 vuotta. Hendrixin laatta paljastettiin seinälle 1997, ja nykyään talot ovat yhdessä museo.
- Lähteet: English Heritage: Handel ja Hendrix -siniset laatat (english-heritage.org.uk/visit/blue-plaques/george-frideric-handel ja …/jimi-hendrix); Handel Hendrix House (handelhendrix.org: Learn about Handel, Learn about Hendrix); Wikipedia Handel & Hendrix in London, Messiah (Handel).
- Avoin: Messiah-päivät ovat HHH ja Wikipedia (Messiah) [kaksi lähdettä]; "tässä talossa" -väite vain EH sanoo suoraan ([1L], WP: "believed"), joten tekstissä lähdemaininta "English Heritagen mukaan". Hendrix-levy-lause: HHH sanoo, EH osin; "kerrotaan" on varovainen muoto. Museo avattu 2001, Hendrixin asunto yleisölle 10.2.2016 (EH, HHH) mahdollinen lisäys. Handelin laatta Society of Arts n. 1870 [1L].
- Kuvat: `Hendrix and Handel houses, Brook Street.jpg` (CC BY-SA 3.0, Oosoom), `Handel Hendrix House Museum, Jimi Hendrix's bedroom.jpg` (CC0, AndyScott).

---

## Yhteenveto KK:lle

| # | Paikka | Tila | Ennen dataa |
|---|---|---|---|
| 9 | Handel ja Hendrix | kaksi lähdettä täyttyy | KK hyväksyy tekstin |
| 1 | Snow 1854 | hyvä, osin yhden ryhmän lähteitä | toinen lähde (London Museum/LSHTM) |
| 2 | Perkin 1856 | hyvä, museosivut samaa ryhmää | RSC-lähde, laatan paikka |
| 3 | Cooke–Wheatstone | keskitaso | Science Museum/ETHW |
| 5 | Baird 1926 | keskitaso | IEEE/ETHW, "ensimmäinen"-rajaus |
| 7 | Johnson 1755 | keskitaso | British Library, 1873-virke |
| 4 | Kristallipalatsi | vain Wikipedia | Historic England/V&A/Royal Parks |
| 6 | Rosetta | vain Wikipedia | British Museum, Britannica |
| 8 | Big Ben -kello | heikoin, vain Wikipedian tiivistelmä | Parliament UK, Britannica |

Seuraava askel (KK:n sanalla): 1) luonnoksen hyväksyntä tai korvaavat aiheet, 2) toinen lähde jokaiselle (selaimella; Chrome-työkalut 403-sivuille), 3) kuvien lataus ja lisenssitunnisteet, 4) data-PR (maakartat.js 9 kohdetta + nahtavyysjutut.js 9 tekstiä + tarkista.mjs-jonorivit), 5) tarkistaja ja KK:n faktahyväksyntä ennen ääntä.
