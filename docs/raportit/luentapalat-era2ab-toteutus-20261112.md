# Luentapalat erä 2a ja 2b: korjausten vienti koodiin (12.11.2026)

Lähde: KK:n päätökset osio D (15 ei-ok-palaa), seulonta `tarkistukset/luenta-era2ab-seulonta-20261112.md`, faktatarkistuksen tulos-JSONit (era2a, era2b). Vietiin 15 palaa 15:stä, "ei koodissa" -paloja 0.

## Yhteenveto

- 6 palaa vietiin sellaisenaan (tulos-JSONin `korjattu_teksti`): Greenwich, British Museum 2, Albert Memorial 1, Victoria Memorial 2, Westminster Bridge, Westminsterin palatsi.
- 9 palaa korjattiin KK:n/seulonnan virkkeillä: Old Tolbooth, Cheapside 2, Cheapsiden kätkö 1, Albert Memorial 3, Whitehall 1, Whitehall 2, Globe 1599 pala 1, Shakespeare-Globe 2, Palo 1666 pala 1.
- Muutetut tiedostot: `js/packs/monumentit-eurooppa.js`, `js/packs/nahtavyysjutut.js`, `js/packs/fokusvirta-lontoo.js`, `js/packs/historian-hetket.js`, `js/packs/kulttuuri-kategoriat.js`. Kulttuuri-kategoriat.js:n Palo 1666- ja Globe-lehtisivut ovat generoituja historian-hetket.js:stä, ja ne päivitettiin `node tools/paivita-hetkisivut.mjs`:llä.
- `data/aanitysjono.tsv` ei muutu (siinä on vain avaimet, ei tekstiä).
- Tekstit vaihdettiin skriptillä: jokainen pala haettiin kaikista js- ja data-tiedostoista tokenitasolla (string-liitokset `' + '` huomioiden), muutettiin vain eroavat sanat ja jokainen osuma vaihdettiin yhdenmukaisesti. Lopuksi tarkistettiin, että jokaisen palan lopullinen teksti löytyy koodista.
- Otsikkolause ("Albert Memorial.") on Äänittäjän tekstissä mutta ei koodissa; koodissa pala on kappale.

## Haettu vahvistus

### Whitehall pala 1: "Euroopan suurin"

Kolme lähdettä sanoo palatsin olleen aikanaan Euroopan suurin: Wikipedia ("at one time the largest palace in Europe", yli 1 500 huonetta, enimmillään noin 23 eekkeriä = 9,3 ha; Versailles ohitti myöhemmin), Historic Royal Palaces (Google Arts & Culture, Banqueting House: "At its peak, Whitehall was probably the largest palace in Europe") ja Tudor Times (The Lost Palace of Whitehall: "once the largest palace in Europe"). Ratkaisu: väite jää KK:n ohjeen mukaan omana virkkeenään ja varovasti, ei "joten": "Palatsissa oli yli 1 500 huonetta, ja se peitti suurimmillaan noin yhdeksän hehtaaria. Se oli aikansa Euroopan suurimpia palatseja." Palon kesto ("noin 15 tunnissa") on poistettu. Huom: HRP sanoo "probably", Wikipedia "at one time"; siksi "yksi suurimmista" eikä "suurin".

### Globe 1599 pala 1: The Theatren purku talvella ja vuokraisäntä

Vahvistettu kolmesta lähteestä, joten kohta jää ennalleen:
1. Wikipedia, Globe Theatre: Burbaget omistivat rakennuksen ja vuokrasivat maan 21 vuodeksi; vuokran päätyttyä vuokraisäntä Giles Allen vaati rakennusta itselleen; 28.12.1598 Allenin ollessa poissa jouluna Peter Street ja näyttelijät purkivat The Theatren; puut kuljetettiin Thamesin yli Globen rakentamiseen.
2. Wikipedia, The Theatre: purku talvella (28.12.1598), vuokraisäntä Giles Allen, purku vuokraisännän vastustuksesta huolimatta, puutavara viedään Thamesin yli ja käytetään Globeen Bankside-rannalla.
3. Folger Shakespeare Library (Raising the Globe): purku joulun aikaan 28.12.1598, vuokraisäntä Giles Allen, puutavara varastoitiin Bridewellin lähelle, kunnes Globen rakentaminen voitiin aloittaa.

Siis "purettiin talvella" ja "vuokraisäntä yritti pitää rakennuksen itsellään" kestävät, eikä niitä muotoiltu varovammin.

## Testit

- `node --test tests/kuvatekstit.test.mjs tests/vanha-maailma.test.mjs tests/sisaltopaketti.test.mjs tests/fokusvirta.test.mjs`: 167/167 läpi.
- Kaikki testit, jotka tuovat muutetut pakit (27 tiedostoa, mm. historian-hetket, nahtavyydet, lehdet, kaupunkiliuska-hetket): läpi. Aluksi `historian-hetket.test.mjs` "lehtisivut ovat generoituja" kaatui, koska kulttuuri-kategoriat.js:n Palo 1666 ja Globe -sivut olivat eriytyneet pakasta; korjattu ajamalla `node tools/paivita-hetkisivut.mjs`.
- Koko suite (`node --test "tests/*.test.mjs"`): 5727 testiä, 0 kaatunutta.

## Huomioita

- `js/packs/kulttuuri-kategoriat.js` rivillä ~564 on koodikommentti (vanha vastineen tarkistusmuistiinpano), jossa lukee yhä "rubiini Burmasta". Se on kommentti, ei lukijalle näkyvä teksti, eikä sitä muutettu.
- Westminster Bridgen `korjattu_teksti` oli tulos-JSONissa ilman otsikkolausetta "Westminster Bridge."; Äänittäjän tiedostoon se on palautettu otsikon kanssa (kuten alkuperäisessä ja muissa pala 1 -teksteissä). Koodissa muutos on vain "Satoja venemiehiä" -> "Venemiehet".
- Cheapsiden kätkö 1:n ja Cheapside 2:n sekä Globe 1599 pala 1:n ja Shakespeare-Globe 2:n tekstit ovat koodissa samassa kappaleessa (pala 2 on osa pala 1:n tekstiä), joten ne vaihdettiin kerralla.
- Whitehall 2: seulonnan ehdotus korvaa koko palan, joten kolmas virke "Paikalla on nykyään valtionhallinnon rakennuksia." poistui (sisältö on nyt Cabinet Office -virkkeessä).
- Westminsterin palatsin jutun "Paloon säilyi" -kirjoitusvirhe on PR 6596:ssa, ei tässä.

## Palat

### hahmotelma-greenwich-palatsi (GBR, pala 1)

- avain: `d5248ce5545dec69148a1c9e82ae7e3e`
- tapa: sellaisenaan (korjattu_teksti)
- tiedostot: `js/packs/monumentit-eurooppa.js`
- lopullinen teksti:

> Greenwichin palatsi. Greenwichin palatsi, tunnetummin Placentia, oli Tudorien kuninkaallinen palatsi Thamesin rannalla. Humphrey, Gloucesterin herttua, rakennutti sen 1430-luvulla nimellä Bella Court, ja Margareta Anjoulainen antoi sille nimen Placentia. Henrik VII rakennutti palatsin uudelleen 1498–1504. Täällä syntyivät Henrik VIII (1491), Maria I (1516) ja Elisabet I (1533), ja Henrik VIII meni täällä naimisiin Anna Clevesiläisen kanssa 1540. Sisällissodassa palatsi rapistui ja toimi keksitehtaana ja sotavankileirinä.

### British Museum (lontoo, pala 2)

- avain: `d7f74e1bf3416bff577805c5e286ffb8`
- tapa: sellaisenaan (korjattu_teksti)
- tiedostot: `js/packs/nahtavyysjutut.js`
- lopullinen teksti:

> Alussa kävijän piti hakea pääsylippua etukäteen. Kokoelmat kasvoivat niin, että vanha kartano purettiin, ja Robert Smirke rakensi tilalle nykyisen kreikkalaistyylisen pylväsjulkisivun 1823–1852.

### Albert Memorial (lontoo, pala 1)

- avain: `6a9f0e6a7194b40c63da727634800c85`
- tapa: sellaisenaan (korjattu_teksti)
- tiedostot: `js/packs/nahtavyysjutut.js`
- lopullinen teksti:

> Albert Memorial. Prinssi Albert kuoli 1861 vain 42-vuotiaana. Kuningatar Viktoria pukeutui suruasuun loppuelämäkseen, ja Kensington Gardensiin pystytettiin George Gilbert Scottin suunnittelema goottilainen muistomerkki. Kullattu Albert istuu katoksen alla ja pitää sylissään maailmannäyttelyn luetteloa.

### Victoria Memorial (lontoo, pala 2)

- avain: `a0880efe8e5c7bb5b681139a7cef94c6`
- tapa: sellaisenaan (korjattu_teksti)
- tiedostot: `js/packs/nahtavyysjutut.js`
- lopullinen teksti:

> Muistomerkki paljastettiin 1911. Kuningas Yrjö V teki kuvanveistäjän ritariksi samana päivänä. Samalla The Mallista tehtiin leveä juhlakulkutie Admiralty Archista palatsille.

### Westminster Bridge (lontoo, pala 1)

- avain: `d1662307873c5c5ad35f5d35b7621ff5`
- tapa: sellaisenaan (korjattu_teksti)
- tiedostot: `js/packs/nahtavyysjutut.js`
- lopullinen teksti:

> Westminster Bridge. Vuosisatoja Lontoon keskustan ainoa silta oli London Bridge, ja Westminsterissä joen yli soudettiin. Venemiehet elivät kyydityksestä, ja he vastustivat uutta siltaa kiivaasti. Ensimmäinen Westminster Bridge avattiin silti 1750.

### Westminsterin palatsi (lontoo, pala 1)

- avain: `96c94af8e34252daa39f852f59c438d9`
- tapa: sellaisenaan (korjattu_teksti)
- tiedostot: `js/packs/nahtavyysjutut.js`
- lopullinen teksti:

> Westminsterin palatsi. Kuninkaat asuivat Westminsterissä jo ennen normannien valloitusta, ja palatsin vanhin osa, Westminster Hall, valmistui 1099. Parlamentti kokoontui vanhan palatsin saleissa ja kappeleissa: alahuone istui Pyhän Stefanuksen kappelissa, jonka seinämaalaukset oli peitetty puupaneeleilla.

### hahmotelma-old-tolbooth (GBR, pala 1)

- avain: `b9aaf9b369969cf069dc8ae9e6f9445e`
- tapa: korjattu_teksti + seulonnan ehdotus (laajennuksen luona)
- tiedostot: `js/packs/monumentit-eurooppa.js`
- lopullinen teksti:

> Old Tolbooth. Old Tolbooth oli Edinburghin High Streetillä St Gilesin katedraalin luoteiskulmassa seissyt raatihuone ja vankila. Kuningas Robert II myönsi paikasta peruskirjan 1386. Parlamentti kokoontui siellä jo 1438, ja Maria Stuart määräsi 1560-luvun alussa rakennuksen korvattavaksi uudella. Parlamentti muutti omaan taloonsa 1639, ja rakennuksesta tuli ennen kaikkea vankila; vuodesta 1785 teloitukset toimitettiin sen laajennuksen luona.

### cheapside (lontoo, pala 2)

- avain: `d6a0f6e5fa8d3b043cb1574d4977bf8b`
- tapa: KK:n osio D / seulonnan ehdotus
- tiedostot: `js/packs/fokusvirta-lontoo.js`, `js/packs/nahtavyysjutut.js`
- lopullinen teksti:

> Kivet tulivat ympäri maailmaa: smaragdi Kolumbiasta, topaasi Brasiliasta, timantti Intiasta, lapislatsuli Afganistanista, turkoosi Persiasta, helmet Bahrainista. Oudoin esine on kellonkuori, joka oli koverrettu yhdestä suuresta kolumbialaisesta smaragdista ja jonka sisään oli sovitettu noin vuoden 1600 sveitsiläinen kellokoneisto. Yksi pieni sinettikivi kertoo, milloin laatikko pantiin maahan: siinä on Staffordin viscountin vaakuna, ja arvonimen hän sai vasta marraskuussa 1640. Kellarin päällä ollut talo paloi Lontoon suurpalossa syyskuussa 1666. Jossain noiden kahden vuosiluvun välissä joku kaivoi laatikon lattiaansa eikä koskaan palannut hakemaan sitä.

### Cheapsiden kätkö (lontoo, pala 1)

- avain: `3977097a0bf672a250baa2a1a8005bd2`
- tapa: KK:n osio D / seulonnan ehdotus
- tiedostot: `js/packs/fokusvirta-lontoo.js`, `js/packs/nahtavyysjutut.js`
- lopullinen teksti:

> Cheapsiden kätkö. Isoisäsi sääntö sai Lontoossa todisteen — vain nelisenkymmentä vuotta hänen käyntinsä jälkeen. Vuonna 1912 työmiehet hakkasivat hakulla kellarin lattiaa osoitteessa 30–32 Cheapside, Friday Streetin kulmassa, ja lattian alta tuli puinen laatikko. Sen sisällä oli yli neljäsataa korukappaletta: sormuksia, rintaneuloja, ketjuja, hajuvesipulloja ja kameoita. Kivet tulivat ympäri maailmaa: smaragdi Kolumbiasta, topaasi Brasiliasta, timantti Intiasta, lapislatsuli Afganistanista, turkoosi Persiasta, helmet Bahrainista. Oudoin esine on kellonkuori, joka oli koverrettu yhdestä suuresta kolumbialaisesta smaragdista ja jonka sisään oli sovitettu noin vuoden 1600 sveitsiläinen kellokoneisto. Yksi pieni sinettikivi kertoo, milloin laatikko pantiin maahan: siinä on Staffordin viscountin vaakuna, ja arvonimen hän sai vasta marraskuussa 1640. Kellarin päällä ollut talo paloi Lontoon suurpalossa syyskuussa 1666. Jossain noiden kahden vuosiluvun välissä joku kaivoi laatikon lattiaansa eikä koskaan palannut hakemaan sitä.

### Albert Memorial (lontoo, pala 3)

- avain: `d8b841a8d0a2a04c51677ad22cbfcbcb`
- tapa: KK:n osio D / seulonnan ehdotus
- tiedostot: `js/packs/nahtavyysjutut.js`
- lopullinen teksti:

> Kullattu patsas seisoi noin kahdeksankymmentä vuotta mustaksi maalattuna. Tarinan mukaan syynä olivat ensimmäisen maailmansodan saksalaiset ilmalaivat, mutta maali on vanhempaa: ilmansaasteet olivat jo pilanneet kullan. Kulta palautettiin vasta korjauksessa, joka valmistui 1998.

### hahmotelma-whitehall (GBR, pala 1)

- avain: `b541e8d6ac8c1a39f9f517b1fcb6162a`
- tapa: KK:n osio D / seulonnan ehdotus
- tiedostot: `js/packs/monumentit-eurooppa.js`
- lopullinen teksti:

> Whitehallin palatsi. Whitehallin palatsi oli Englannin kuninkaiden pääasunto Lontoossa vuodesta 1530 vuoteen 1698. Henrik VIII otti paikan haltuunsa 1530, kun kardinaali Wolsey oli menettänyt asemansa. Palatsissa oli yli 1 500 huonetta, ja se peitti suurimmillaan noin yhdeksän hehtaaria. Se oli aikansa Euroopan suurimpia palatseja. Juhlasali Banqueting House valmistui 1622 Inigo Jonesin suunnittelemana, ja sen edessä mestattiin Kaarle I vuonna 1649. Tammikuun 4. päivänä 1698 palvelija ripusti märkää pyykkiä hiilipannun viereen, ja syttynyt tuli tuhosi lähes kaikki asuin- ja hallintorakennukset.

### hahmotelma-whitehall (GBR, pala 2)

- avain: `72f549975f101d0dc480c09d277a3ed2`
- tapa: KK:n osio D / seulonnan ehdotus
- tiedostot: `js/packs/monumentit-eurooppa.js`
- lopullinen teksti:

> Banqueting House säilyi, ja palatsin osia on yhä valtionhallinnon Cabinet Officen rakennuksen sisällä. Palatsia ei koskaan rakennettu uudelleen.

### Globe 1599 (lontoo, pala 1)

- avain: `f50593e474ff1fde68a6c30662d7ca0a`
- tapa: KK:n osio D / seulonnan ehdotus
- tiedostot: `js/packs/historian-hetket.js`, `js/packs/kulttuuri-kategoriat.js`, `js/packs/nahtavyysjutut.js`
- lopullinen teksti:

> Globe 1599. Pihalla ei ole koskaan hiljaista. Penniyleisö seisoo katsomon keskellä taivasalla, syö pähkinöitä, juo olutta ja huutaa näyttelijöille, ja näyttämön reunalla seisova poika, joka esittää Caesarin vaimoa, tietää, että hänen on puhuttava sen yli. Southwarkissa Thamesin etelärannalla on syyskuu 1599. Globe on rakennettu samana vuonna puusta, joka purettiin talvella Shoreditchin vanhasta The Theatre -näyttämöstä, kun vuokraisäntä yritti pitää rakennuksen itsellään; Burbagen veljekset omistavat siitä puolet ja William Shakespeare kahdeksasosan. Katsojia mahtuu noin 3 000. Baselilainen Thomas Platter kirjoittaa 21. syyskuuta nähneensä joen etelärannan olkikattoisessa talossa Julius Caesarin ja lopuksi tanssin; talo on lähes varmasti Globe, ja tieto on vanhimpia sen esityksistä. Naisia ei näyttämöllä ole — Portian ja Calpurnian roolit esittävät äänenmurroksen kynnyksellä olevat pojat. Teatteri palaa 29. kesäkuuta 1613, kun tykki sytyttää olkikaton kesken Henrik kahdeksannen -näytelmän; ainoa vahinko on mies, jonka palavat housut sammutetaan oluella.

### shakespeare-globe-1599 (GBR, pala 2)

- avain: `5b6c3e2f53670809938a3ac74ca36bdf`
- tapa: KK:n osio D / seulonnan ehdotus
- tiedostot: `js/packs/historian-hetket.js`, `js/packs/kulttuuri-kategoriat.js`, `js/packs/nahtavyysjutut.js`
- lopullinen teksti:

> Katsojia mahtuu noin 3 000. Baselilainen Thomas Platter kirjoittaa 21. syyskuuta nähneensä joen etelärannan olkikattoisessa talossa Julius Caesarin ja lopuksi tanssin; talo on lähes varmasti Globe, ja tieto on vanhimpia sen esityksistä. Naisia ei näyttämöllä ole — Portian ja Calpurnian roolit esittävät äänenmurroksen kynnyksellä olevat pojat. Teatteri palaa 29. kesäkuuta 1613, kun tykki sytyttää olkikaton kesken Henrik kahdeksannen -näytelmän; ainoa vahinko on mies, jonka palavat housut sammutetaan oluella.

### Palo 1666 (lontoo, pala 1)

- avain: `661e3203a3f2ef497cb2901877ad6536`
- tapa: KK:n osio D / seulonnan ehdotus
- tiedostot: `js/packs/historian-hetket.js`, `js/packs/kulttuuri-kategoriat.js`, `js/packs/nahtavyysjutut.js`
- lopullinen teksti:

> Palo 1666. Kädet pitävät kiinni soittimen kannesta, koska se on ainoa, mitä veneeseen mahtui. Thamesilla on sunnuntai 2. syyskuuta 1666. Laivaston virkamies Samuel Pepys katselee tulta joelta ja kertoo päiväkirjassaan ihmisistä, jotka jäivät koteihinsa, kunnes tuli ylsi heihin, ja pakenivat sitten veneisiin. Tulipalo alkoi yöllä Thomas Farrinerin leipomosta Pudding Lanella; talon piika, joka ei uskaltanut kiivetä ikkunasta naapurin katolle, oli ensimmäinen kuollut. Pormestari Thomas Bloodworth ei purattanut taloja tulen tieltä, ja itätuuli levitti tulta: kesä oli ollut kuiva, ja puukaupungin kadut olivat kapeita. Pepys itse kaivaa parmesaanijuustonsa ja viininsä puutarhaan maahan. Tiistaina tuli tavoittaa Pyhän Paavalin katedraalin, jonka korjaustelineet syttyvät; lyijykatto sulaa ja valuu kaduille, ja kirjakauppiaiden kryptaan varastoimat kirjat palavat. Tiistain ja keskiviikon välisenä yönä tuuli laantuu. Palo tuhosi noin 13 200 taloa ja 87 kirkkoa, mutta kirjattuja kuolleita on vain kourallinen — luku, jota epäillään yhä.

