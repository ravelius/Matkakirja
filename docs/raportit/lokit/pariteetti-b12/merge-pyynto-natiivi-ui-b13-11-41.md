# Merge-pyynnöt (Natiivi-UI 25.9.2026 klo 13.1x, build 13): rivit 11 ja 41

Testikäännös 7c959cd8 (juna/b13 75cd4c89 + alla olevat haarat), iPhone 17 FB234D08. Kumpikin haara menee sekä
masteria että juna/b13:a vasten ilman konflikteja (merge-tree), ja käännös onnistui. Kuvat ovat kansiossa `b13o/`.

## natiivi-ui/avauskaaro-11 2c46639c (Linssisepän rivi 11: keksintöjen ja ihmisen matkan aloituslaatikko)
- Aiemmin (b13k/b13l): repaleinen pergamentti, musta peite, kapiteelit, anfangi, kultainen Käynnistä ja lyhdyt.
- Tässä erässä korjattiin neljä asiaa webin kuvaa (b13-linssit/kuvat/11-iphone-web.jpg) vasten:
  1. Paperin sivusisennys on nyt 28/400, ja pystysisennys pysyy ennallaan. Repaleinen reuna oli b13n:ssä
     307 pt leveä, ja nyt se on 296 pt (web 295).
  2. Lyhtyjen valo lasketaan nyt paperin kokoisiksi tekstuureiksi, jotka on kerrottu paperin alfalla.
     Suorakaiteeseen rajattu valo näkyi repaleisen reunan ulkopuolella suorana laatikkona.
     Lepatus toimii kuten ennen.
  3. Otsikon riviväli on 1,41 em (web 33 pt, natiivissa 29,5). Paperi on nyt pystysuunnassa 172–700 pt
     (web 169–702).
  4. Pergamentin sävyliuku vaaleni keskeltä ja alhaalta. b13n oli 12–28 % webiä tummempi, ja nyt ero on ±5 %
     kahdeksassa mittauspisteessä. Leipätekstin rivit ovat samoilla korkeuksilla kuin webissä (24,7 pt:n välein).
- Kuvapari `b13o/kuvapari-b13-avaus11-iphone.jpg`: web | b13n | 7c959cd8 | ihmisen matkan aloitus
  (`ui linssi matka aloitus`: Ken Burns -tausta, paperi ja lyhdyt toimivat).
- Jäljelle jäävät pienet erot: otsikko on noin 7 pt webiä alempana. Webin kuvan Käynnistä-napissa on kaksoisrengas,
  mutta se on :focus-visible-outline eikä kosketuskäytön tila. Webin vuosiluvuissa on hieman kevyempi paino.

## natiivi-ui/maapilleri-41 1a374a68 (rivi 41)
- Maakyltti on webin .maa-pilleri: lippu ja NIMI yhdellä rivillä oikeassa yläkulmassa linssinappien vasemmalla puolella.
  1a374a68 piilottaa "Lue lehti" -rivin myös maan vaihtuessa. b13m:ssä se näkyi.
- Todennettu komennoilla `linssi maatiedot` + `ui linssi maa JPN`: `b13o/kuvapari-b13-maapilleri41-iphone.jpg` ja
  `-yla.jpg` (web | 7c959cd8).

## natiivi-ui/vaakunat-72 141f2e6a (löydös 72: lippukortin "Vaakunat ja tunnukset", klo 13.3x)
- Haara on juna/b13:n päällä. Testikäännös ce65cea9 (juna/b13 + haara), iPhone FB234D08, ja merge-tree antaa master- ja
  juna-ok.
- Lippuikkuna.cs ja Matkakirja.uss: skeeman lipputarina.tunnukset (paketissa jo valmiina) näytetään webin js/liput.js:n
  mukaisesti.
  - Otsikko "Vaakunat ja tunnukset" on Kone lihava 12,8 px.
  - Rivillä on vasemmalla 67 pt:n (4,2rem) kuva, ja oikealla nimi (Kone 12,8) ja selite (Luku 13,3).
  - Napautus näyttää pelkän vaakunan isona (64 %, enintään 208 pt) ja selitteen paperilla sen alla. Vaakuna kasvaa
    0,55:stä, muu kortti häivyttyy ja tarkennettu vieritetään näkyviin. Uusi napautus tai napautus muualle palauttaa
    näkymän.
  - Versiolippujen tarkennus on yhteinen, joten korttia kohti on yksi tarkennettu kerrallaan kuten webissä.
- Selitteen väri on läpinäkymätön (57, 53, 47), koska webin rgba(33,29,24,0.88) vaaleni UITK:ssa. Mitattuna tumma sävy
  on nyt sama kuin webissä (57, 53, 47).
- Kuvapari `b13o/kuvapari-b13-vaakunat72-iphone.jpg`: web (b13f) | natiivi | tarkennettu.

## natiivi-ui/mittajana-63 04d684b9 (löydös 63: kohdekartan mittakaavajana, build 14, klo 13.4x)
- Haara on juna/b13:n (e1c71a6c) päällä. Testikäännös 06e09795, iPhone FB234D08, ja merge-tree antaa master- ja juna-ok.
- Kohdekartat.cs laskee janan webin maakartat.js:n mittakaava()-funktion mukaan. Pituus valitaan sarjasta 50 m – 50 km,
  ja tavoite on neljäsosa ydinrajauksen leveydestä. Osuus lasketaan koko piirretystä kuvasta, ja kilometrit
  rajauksen keskileveydellä. Laea-kartoille janaa ei piirretä.
- KohdekarttaNakyma: jana on lavan lapsi, joten se skaalautuu zoomin mukana. Se sijoittuu ydinalueen vasempaan
  alakulmaan (3,2 % / 5 %). Kohdekartta.uss: webin .kartta-mittajana (reunat ja vaalea kaista) sekä
  -teksti (Kone, vaalea pohja).
- Bukarest: "500 m", leveys 21,6 % kartasta kuten webissä. Kuvat `b13o/kuvapari-b13-mittajana63-iphone.jpg`
  (web b13i | natiivi) ja `-lahi.jpg`.

## natiivi-ui/linssipuhelin-k3 38dbb491 (Linssisepän kierros 3, rivit 13 ja 30/31; build 14, klo 14.0x)
- Haara on juna/b13:n (686c1634) päällä. Testikäännös d26c2810, iPhone FB234D08, ja merge-tree antaa master- ja juna-ok.
- 439a16aa (rivi 13): ihmisen matkan virtanapit ovat piilossa esityksen ajan, kun näyttö on enintään 600 pt leveä
  (web css/ihmisen-tutkimus.css PUHELIN). Tutkimusvaiheessa napit näkyvät omalla rivillään kuten ennenkin. Palkki
  madaltuu esityksen ajaksi 25 pt.
- 38dbb491 (rivit 30/31): kutistettu selitteen nimilappu (web .linssi-selite.pieni, top 0,5 rem) on samalla
  rivillä yläkulman napeista vasemmalla (✕:n vasen reuna + 8 pt, pystyssä ✕:n keskellä). Se seuraa ✕:n leveyttä
  tekstin sulaessa. Auki oleva selite on nappirivin alla kuten ennenkin. iPadin leveä kartta (vasen alakulma) ei muutu.
- ✕ on omistajan löydös 32 (natiivin oma lisäys), eikä sitä ole webissä.
- Kuvat `b13o/kuvapari-b13-linssipuhelin-k3-iphone.jpg`. Ylärivi: web | ennen | jälkeen | selite auki. Alarivi: web |
  ennen | esitys jälkeen | tutkimusvaihe.
- Rivien 13 ja 40 aikajanapalkin otsikko ("IHMISEN MATKA") on löydöksen 74 mukainen, ja se odottaa Fablen linjausta.

## natiivi-ui/linssi-ipad-k3c ee811ea4 (Linssisepän kierros 3c, rivit 31 iPad ja 39; build 14, klo 14.2x)
- Haara on juna/b13:n (4887c521) päällä. Testikäännös 3268e300, iPhone FB234D08, ja merge-tree antaa master- ja
  juna-ok.
- 99d7a480 (rivi 39): vertailun alapalkki on webin .vertailu-palkki eli kelluva pilleri keskellä sisältönsä levyisenä
  (left 50 %, translate −50 %, max-width 96 %). Reunasta reunaan ulottuva palkki peitti maan nimen.
- ee811ea4 (rivi 31, iPad): kerroksellinen linssi (ei radio) kutistaa auki olevan päiväkirjan lapuksi, ja linssin
  sulkeutuessa päiväkirja palaa auki (web piirraLinssiSelite). Päiväkirja palautetaan vain, jos se oli auki linssin
  syttyessä, joten puhelimen lappu pysyy lappuna.
- Kuvat `b13o/kuvapari-b13-linssi-k3c-iphone.jpg`: päiväkirja auki | vesistöt (lappu) | linssi pois (auki) |
  vertailu (pilleri).
- Rivi 13 iPad (Tauko 17 pt oikeammalla): natiivissa ei ole webin pyöristettyä karttakehystä, ja aikajanan palkki on
  yläpalkin paikalla reunasta reunaan. Linssiseppä kirjaa tämän poikkeamaksi.

## natiivi-ui/avaruus-96 af0b998b (löydös 96: avaruuslinssin pulu ja minipulun chat; Linssiseppä vetää, build 14, klo 14.3x)
- Haara on juna/b13:n (0eaef772) päällä. Testikäännös 144281e2, iPhone FB234D08, ja merge-tree antaa master- ja
  juna-ok.
- 8b681dc6: astronautin pallonäkymässä ison pulun napautus ei avaa pääkeskustelua (web linssiEstaaChatin, UiNakymat).
  Kuvanäkymässä keskustelu on minipulun kortissa.
- af0b998b: webin .satelliitti-pulukulma on nyt sarake oikeassa alakulmassa, ja kortti on pulun yläpuolella 8 pt:n
  välein.
  - Kortin leveys on min(320, ruutu − 24) ja korkeus min(62 %, 500). Pienellä ruudulla (≤ 620 × 500) leveys on 280 ja
    virta enintään min(38 %, 240).
  - Minipulu on 84 pt, pienellä ruudulla 56 pt (LiviaKuva.MiniKorkeus). Se leijuu 5 s:n kierroksella 5 pt ja ±3°,
    pysähtyy kysymyksen ajaksi ja on paikallaan, kun Pieni liike on pois.
  - Rakenne.VapautaNappaimistonSulkeutuessa(kenttä): pilleri, ↑ ja ✕ osuvat näppäimistön jälkeen.
  - ↑ on pois käytöstä kysymyksen ajan, eikä uusi kysymys lähde kesken edellisen.
  - Virhetekstit ovat webistä sanatarkasti ("Pulu vastaa vielä edelliseen. Hetki vain." / "Pulu ei saanut
    kysymyksestä kiinni. Yritä hetken päästä uudelleen.").
- Striimausta ei tehty (Linssisepän kohta 5, ei kriittinen): natiivin chat antaa vastauksen kerralla.
- Kuvat `b13o/kuvapari-b13-avaruus96-iphone.jpg`: pallonäkymä ison pulun napautuksen jälkeen (ei chattia) | kortti
  auki | näppäimistön jälkeen | vastaus ↑:n napautuksesta.

## natiivi-ui/nimiolukko-106 4f79430d (löydös 106: noston nimiö hyppää panoroidessa; build 14, klo 14.5x)
- Haara on juna/b13 + pelikoodari/nosto-nimio (93, merge 7d9acc96) + 106. Molemmat muuttavat NostotKartalla.cs:ää, joten
  93 kulkee tässä mukana, ja haara korvaa erillisen 93-merge-pyynnön. Merge-tree antaa master- ja juna-ok.
- Natiivisepän patch (proto-3d/lokit/loydos106/nosto106.patch): lukot noston Id:llä. Ruudulla oleva lukittu nimiö
  kokeilee vain omaa kylkeään, ja tukossa se menee piiloon (web sovittelu.js sääntö 5). Hae antaa kyljen lukosta tai
  datasta, ei enää null → "oikea".
- Mittari: lokirivi "MATKAKIRJA nostot: kylkivaihdot vedossa N" jokaisen vedon jälkeen. Testikäännös 0cc3bada
  (iPhone, Ateena): 5 vetoa, joka kerta 0.
- Video `b13o/video-b13-nimiolukko106-iphone-pieni.mp4` (kaksi vetoa).

## Omistajan build 13 -löydökset: 86/87/97, 88, 91 ja 96b (build 14, klo 15.0x)
Testikäännös 519cbd43 = juna/b13 + kaikki neljä haaraa, iPhone FB234D08. Jokainen haara menee erikseen masteria ja
juna/b13:a vasten ilman konflikteja.

### natiivi-ui/matkakirja-86 c931ab2b (86, 87, 97 ja linssirivi 31 iPad)
- 86: fokus- ja aarremerkinnästä poistettiin tunnelmarivi ("Pölyä ja puhetta kullasta"), ja otsikko on "Ateena,
  elokuussa 1873". Data on ennallaan (Pelikoodarin selvitys).
- 87: lappu on luennon ajan "Ateena, elokuussa 1873 🔊" ja luennon jälkeen "Ateena 🔊". Ilman kertojaa vaihto tapahtuu,
  kun teksti on kirjoitettu loppuun. Lappu on tekstinsä levyinen kaikilla laitteilla.
- 97 (SÄÄNTÖ): automaattinen kutistus tapahtuu rivi kerrallaan, 20 pt 45 ms:n välein. Tämä koskee matkakirjakorttia
  (luenta, kartan liike, linssi) ja astronautin kuvanäkymän selitettä. Lyhenevä lapputeksti sulaa lopusta alkuun
  0,6 s:ssa. Astronautin kelattu nimilaatikko on tekstin kokoinen (web .satelliitti-selite-kiinni). Pieni liike pois:
  suoraan.
- Rivi 31 iPad: lapussa on kaiutin tekstin perässä tummana kuten webissä.
- Kuva `b13o/kuvapari-b13-matkakirja86-87-iphone.png` (luennon aikana | luennon jälkeen).

### natiivi-ui/ylapalkki-88 3aca5217 (88)
- Logo ja ☰ ovat sisemmällä: iPadin ja tavallisen palkin sivutäyte on 12,8 → 22 pt, ja iPhonen saaririvi 20 → 26 pt.
  Tämä on omistajan pyyntö (poikkeaa webistä).

### natiivi-ui/chat-91 02c9a50d (91)
- Pulun chat noudattaa webin värejä. Paneelissa on paperikohina (Kuviot.AsetaArkki, web --paper-noise multiply).
  Pillereissä on --pollo-paperi-2, --pollo-viiva ja --pollo-korostus #7a5514. Oma kysymys on koko levyinen lohko
  (web .pollo-kayttaja: #ece2c8, 8 px, Kone 13,6).
- Kuva `b13o/kuvapari-b13-chat91-iphone.jpg` (web | ennen | jälkeen).

### natiivi-ui/avaruus-96b fe98c37e (96, Linssisepän havainto a)
- Astronautin pallonäkymässä pulun napautus ei tee mitään, eikä se näytä myöskään piilotettua kaupunkirepliikkiä
  (web pollo.js avaa return). Pulu.NapautusEstetty asetetaan UiNakymissa.

## Omistajan löydökset 92, 103 ja 105 (build 14, klo 15.2x); testikäännös 122ec30a iPhone
- natiivi-ui/liuska-92 19e6dd53 (92): kaupunkiliuskan (kaupungin minivalikko) mitat ovat 1,4 × webin mitoista (USS
  .mk-liuska ja KaupunkiKortti.RivinKorkeus). Kuva `b13o/kuvapari-b13-liuska92-valikko103-iphone.png` (oikealla).
- natiivi-ui/kehittaja-103 1da2bfc7 (103): Maailma-kytkin on myös KEHITTÄJÄ-osassa (linssivalitsimen "Kehittäjä"), ja
  sama kytkin on KARTTA-ryhmässä. Kehittäjä-osaa ei kuvattu. Muutos on kahden rivin kaksoisnappi, joka jakaa tilan.
- natiivi-ui/maakunnat-105 6ef4985c (105, lista): vain nykyisen maan ryhmä näkyy. Muiden maiden ryhmät ovat piilossa,
  eikä toisen maan valintaa tai luonnehdintaa näytetä. Maalla ilman maakuntia näkyy pelkkä ilmoitus. Kuvapari
  `b13o/kuvapari-b13-maakunnat105-iphone.png` (ennen: muiden maiden ryhmät ja Grand Est | jälkeen: vain KREIKKA).

## Omistajan löydökset 81/82/83 ja 86/89 (build 14, klo 15.4x); testikäännös d266addf iPhone FB234D08
Molemmat haarat ovat juna/b13:n (ee886e6d) päällä ja kääntyvät yhdessä (proto-kaanna: KÄÄNNETTY d266addf).

### natiivi-ui/aloitus-81-83 2647976e (81, 82 yläpalkki, 83; Natiivisepän 84–85 kanssa)
- 81/82: aloitusnäytöllä (portti, avaus ja kaupungin valinta, Aloitusnakyma.AloitusAuki) Tilarivi-, Nostot- ja
  Matkavalinta-kerrokset ovat piilossa, joten ruskeaa yläpalkkia, logoa ja ☰:tä ei näy. Pulu jää esittelemään valintaa.
  Pisteet ja nimet (82:n toinen puoli) kuuluvat Natiivisepälle.
- 83: aloituslennon koko esitys (AloituslentoAlkoi → saapumiskortti) piilottaa kaikki lennon piilokerrokset, myös
  pulun. Aiemmin piilo alkoi vasta LennonVaihe.Nousussa, joten palkki ja pulu näkyivät zoomin ja mustan verhon ajan.
  Valinnan ja lennon välissä palkki ei välähdä (AukiMuuttui päivittää seuraavassa ruudussa).
- 83 Ohita-nappi: kehystetty paperinappi "Ohita ›" oikeassa alareunassa lennon kaistaleen yläpuolella, turva-alueen
  sisällä. Se kutsuu PeliOhjain.OhitaAloituslento (Natiiviseppä 4eed9c8f). Nappi näkyy AloituslentoAlkoi →
  saapumiskortti -välin. Web .flight-eteen on huomaamaton 0,3-nuoli; omistajan löydös voittaa. Testikomento
  `ui ohitalento`. Mustan verhon aikana (Mustaverho, UGUI-canvas UI:n päällä) nappi ei näy.
- Pelikoodarin havainto: lennon kaistale ("Kone nousee. Isoisän kirja aukeaa…") häipyy saapumiskortin noustessa tai
  ohituksessa (Aloitusnakyma.LentoPerilla). Se ei enää jää ruudun alareunaan laskeutumisen jälkeen.
- Video `b13o/video-b13-aloitus81-83-89-iphone.mp4`: portti → avaus → valinta → lento → paperi → Ateena. Video
  `b13o/video-b13-ohita83-iphone.mp4`: ohitus 3 s nousun jälkeen, ja paperi tulee heti. Kuvat
  `b13o/kuvat-b13-aloitus81-83-iphone.png` (valinta ilman palkkia | lento: Ohita ja kaistale).

### natiivi-ui/paikkarivi-89 951c4c93 (86/89, Pelikoodarin tiedostot PeliOhjain.cs ja PeliOhjain.Lykkays.cs)
- Juurisyy: peli näytti luennan alkaessa paikkarivin ilmoituksena (Tilarivi.Viesti): tumma laatikko "Ateena, elokuussa
  1873. Pölyä ja puhetta kullasta." Tämä oli matkakirjan "väärä väri" (89) ja 86:n "Pölyä ja puhetta kullasta". Web
  ei näytä ilmoitusta (aloitaLykattyLuenta vain soittaa). Ilmoitus on poistettu kolmesta kohdasta, ja paikkarivi on
  matkakirjan merkinnässä.
- Kuvapari `b13o/kuvapari-b13-paikkarivi89-iphone.png` (ennen: tumma laatikko lapun alla | jälkeen: vaalea lappu
  alusta asti).

## Omistajan löydökset 94, 112, 102 ja 90 (build 14 / 15, klo 16.2x); testikäännös 7b54d362 (kaikki neljä juna/b13:n päällä)
Web-kuvat ja mitat: `b13o/web/` (94a/94b, 102a–c, 90; `web-mitat-94-102-90.json`, iPhone 393 × 852 ja iPad 834 × 1194).

### natiivi-ui/kokoruutu-94 8798fc55 (94)
- Juurisyy: kokoruutunäkymän (Kohdekartan.AvaaKokoruutu) USS-tyylit puuttuivat kokonaan (luokat mk-kohdekartta-kokoruutu*).
  Näkymä aukesi tyylittömänä vasempaan yläkulmaan, eli nappi "ei toiminut". Lisätty webin mukaan (.kartta-suurennos):
  pohja #0b0805, kortti ilman taustaa keskellä (leveys koodista kuten ennen), rasti 32 pt paperinen neliö kortin oikeassa
  yläkulmassa, kohdenimet rivitettynä ja keskitettynä, Kone 12,5 lihava vaalea, lähderivi 9,6. Levitettynä luettelo
  ja lähde ovat piilossa.
- Pohjan napautus ei sulje (web: vain rasti, omistaja 21.8.2026). Aiemmin natiivi sulki.
- KOKORUUTU-pilleri: harvennus 1,3 → 12 (web 0.12em, em/100) ja lihava. "Ovaali" johtui liian tiiviistä tekstistä.
- Kuvaparit `b13o/kuvapari-b13-kokoruutu94-iphone.png` (web | natiivi, kokoruutu) ja
  `b13o/kuvapari-b13-kokoruutunappi94-iphone.png` (web | natiivi, arkki). Lihavoinnit (549f9142, 8798fc55) ovat
  iPhone-kuvien jälkeen, ja ne todennetaan iPadilla.
- Ei tässä erässä: webin kartan ✦-merkit (kohteet ilman piirrosta) puuttuvat natiivista.

### natiivi-ui/portti-112 51007795 (112, Fablen ulkoasupäätös)
- Portista on poistettu vaalea verho julisteen takaa (#f7edd8 0,86 → 0), joten etusivulennon kone ja punainen viiva
  näkyvät otsikon takana. Otsikko pysyy paikallaan ja koossaan.
- Tummennus webin .start-gate-kaavalla. UITK sekoittaa lineaarisesti, joten webin sRGB 0,28 / 0,6 → 0,45 / 0,8.
  Mitattu keskeltä: natiivi (170, 158, 132) ja web (153, 146, 130).
- Kuvat `b13o/kuvat-b13-portti112-iphone.png` (web | natiivi, viiva otsikon takana ×2).

### natiivi-ui/suurennos-102 1a71f32c (102)
- Kuvasuurennos.Tayteen (vain Nostokortti): webin avaaKohdeSuurennos-mitoitus (suurennoksenMitat tayteen). Kuva on 0,97 ×
  ruutu − kehyksen muu tila − 16, enintään 1,4 × luonnollinen leveys ja vähintään 140 pt / 28 % korkeudesta. Pohjan
  täyte on 8 pt. Web iPhone: kehys 365, kuva 345 × 230. Web iPad: kehys 793, kuva 773 × 516. Natiivi oli enintään 640 / 420.

### natiivi-ui/luentakuva-90 f640ade3 (90)
- Isoisän luentakuvat webin mitoin (.fokusvirta-luentakuva): leveys min(80 %, 352) ja korkeuskatto min(34 %, 240),
  tabletilla (700–1400 pt) × 1,5. iPad 528 pt (ennen 420 pt), iPhone 314 pt.

### iPad-todennus 7b54d362 (iPad Pro 11 503000D1, klo 16.3x)
- 102: `b13o/kuvapari-b13-suurennos102-ipad.png` (web | natiivi). Kuvasuurennos on lähes ruudun levyinen kuten webissä.
  Natiivissa 1. napautus avaa vaiheen 2 ja 2. napautus suurennoksen, kuten webissä.
- 90: `b13o/kuvat-b13-luentakuva90-ipad.png`. Luentakuva on noin 530 pt (web 528), ja matkakirjan kaiutin näkyy kortin rivillä.
- Linssisepän rivi 31 (iPad) on jo korjattu junan kärjellä (matkakirja-86): lappu on tekstin levyinen ja siinä on 🔊. Kuvapari
  `b13o/kuvapari-b13-rivi31-ipad.png` (web | natiivi). Ero: natiivi lyhentää tekstin muotoon "Marseille", kun merkintä on
  kirjoitettu ilman luentaa (puhe pois). Webissä se on "Marseille, syyskuussa 1873". Tätä ei muutettu (löydös 87:n tulkinta).

## natiivi-ui/minipulu-96c 8debbdf3 (96 b, Linssisepän havainto); testikäännös 8a911185 iPhone FB234D08
- Webin satelliitti.js ankkuroiVastaukseen/vapautaTila: pulun kuplan alle tulee tyhjä tila (odotuksen ajan vähintään
  virran maksimikorkeus). Kupla kelataan ylimmäksi asettelun jälkeen, joten käytetyt kysymyspillerit ja oma kysymys
  vierivät pois. Valmiin vastauksen jälkeen tila kutistuu pienimpään, jolla kuplan alku pysyy ylimpänä. Oma kysymys
  poistaa tilan ja kelaa pohjaan.
- Kuvat `b13o/kuvat-b13-minipulu96b-iphone.png` (pillerit | "…" ylimpänä | vastaus ylimpänä), testi `ui linssi kuva
  istanbul pulu` + pilleri.
- 95 (ImageIO-alfa): natiivissa ei ole vikaa. Ämpärin miniatyyreistä 6 rakennusleikkausta on 67–88 % läpinäkyviä.
  7 kohtauskuvassa tausta on kuvassa itsessään. Web näyttää ne samoin.

## Build 14 -löydökset 118 ja 114–116 (build 16, klo 17.5x); testikäännös 08260b0d iPhone FB234D08
Yhdistelmä: juna/b13 + natiivi-ui/intro-118 + pelikoodari/intro-118 + natiivi-ui/maakunnat-114-116.

### natiivi-ui/intro-118 b84c8a55 (118, Pelikoodarin pelikoodari/intro-118 kanssa)
- Aloita seikkailu / Uusi matka: portti, sumea pallo, etusivulento ja musiikki jatkuvat. Napit ja alalinkki häipyvät
  (0,4 s), ja "Heathrow, Lontoo…" sekä "Vintiltä löytyi isoisän matkalaukku…" kirjoittuvat samalle ruudulle julisteen
  ja portin lauseen alle (intro portin edessä, oma verho ja juliste piilossa, USS --portti). Loppuun tulee VALITSE
  ALOITUSKAUPUNKI. Valinta sammuttaa portin. Huipennuksen Uusi matka (NaytaAvaus) käyttää vanhaa omaa ruutua.
- SoitaIntro kutsutaan synkronisesti painalluksessa. Pelikoodarin mittaus: etusivun raita ja maisema jatkuvat ilman
  katkoa, musiikki väistää puhetta (lokit/loydos118-aani/mittaukset.txt). Avoin (Pelikoodari): puhe alkoi noin 4 s
  painalluksesta, eikä lokissa ollut "puhe: esiladattu" -riviä.
- Kuvat `b13o/kuvat-b14-intro118-iphone.png` (portti | kirjoittuu | valmis) ja video `b13o/video-b14-intro118-iphone.mp4`.

### natiivi-ui/maakunnat-114-116 c875cf31 (114, 115, 116)
- 114: näytettävän maan ryhmän alussa on rivi "Pois". Valittuna kartan korostus ja rajat poistuvat (Valittu null), ja
  luonnehdinta piiloutuu. Tila muistetaan (PlayerPrefs matkakirja-karttatyokalu-maakunnat-pois) ja on
  maasta riippumaton. Maakunnan valinta kumoaa sen. Natiivisepän 113 (oletusrajat kohdemaassa) kuuntelee
  `Maakunnat.PoisMuuttui` / `Maakunnat.Pois`.
- 115: mini-inforuudussa on pikkukuva 64 × 48 tekstin vasemmalla (datan kuvat[0].pikku tai .osoite; kaikilla 97:llä on
  nyt kuva). Napautus avaa kortin. Ilman kuvaa ruutu on ennallaan (esim. Kreikka: "Luonnehdinta tulossa").
- 116: ⊕ on poistettu, ja tekstin loppuun tuli "Lue lisää" (alleviivattu #7a5514). Koko teksti on napautettava ja avaa kortin.
- Kuvat `b13o/kuvat-b14-maakunnat114-116-iphone.png` (Pois valittuna | Wien: kuva + Lue lisää | kortti auki).

## natiivi-ui/ihmisen-matka-2 5d45d8b2 (Ihmisen matka II, UI-osa; linssiseppa/ihmisen-matka-2 f387c824:n päällä)
Käännöstarkistus KÄÄNNETTY 514db4f8 (vain haara). Ajoa simulaattorilla ei ole vielä tehty: Linssiseppä kääntää yhdistelmän
ja tekee videon. Mergetään yhdessä Linssisepän haaran kanssa hänen videonsa jälkeen.
- Tunniste IhmisenMatkaLinssi.OnIhmisenMatka(id): AikajanaNakyma.Kytke (Tila.Ihminen), LinssiUi (karttaselite ja
  pelin yläpalkki pois), UiNakymat (uusi peli nollaa myös "ihmisen-matka-2"-muistin).
- CC-nappi aikajanan ohjaimissa Tauon vasemmalla (saaririvillä Dynamic Islandin korkeudella; iPadilla sama rivi),
  näkyy vain kun IhmisenMatkaKerros.CcNappi. Napautus → AsetaTekstitys(!TekstitysPaalla), ja TekstitysMuuttui
  päivittää tilan (päällä kultainen #d9a13b). AsetaKertomusteksti portitettu TekstiNakyvissa(jakso, osa), jolloin
  ensimmäinen virke näkyy aina.
- Iso kuva: kun IhmisenMatkaKerros.KuvanAlue ≠ null, kertomuskuva menee alueeseen 3:2 contain keskelle eikä seuraa
  pistettä. Maski II on Valokeila.HaeKertomuskuva(osoite, versio2): 960 × 640, täysi peitto 70 %:iin, pehmeä reuna 1,0:aan.
