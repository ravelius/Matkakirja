# Monrovia — riippumaton vaihe D

**Tila: osittainen tarkistusraportti, keskeneräinen sisältöluonnos. Ei valmis kaupunki/C/E/F/erä, pelikytkentä tai julkaisu.** Tarkastaja ei osallistunut Monrovian A:han tai C:hen. Kaupungin kuusi lähtötiedostoa, sisalto.json mukaan lukien, säilyvät muuttumattomina; vain tämä tarkistus.md lisätään.

**VÄÄRIN 1, EPÄVARMA 1.** R1 on suomenkielinen maanjohdos kahdessa ruokatekstikentässä; R2 on K3:n asiakirjoja samoiksi tulkitseva muotoilu. E:n kolme kokonaisen kentän korvausta alla. Kahdeksan aiemmin tunnettua kuvavajetta ovat erikseen todellisia konevirheitä; niitä ei lasketa uusiksi tekstilöydöiksi tai peitetä.

**Omat alkuperäiset paikallinen ja sallittu verkkotarkistus: 8 virhettä, 0 varoitusta, 14 kuvaa; kummankin exit 1.** Kaikki 14 valittua kuvaa katsottu itse, myös N4:n vastaranta ja N6:n koko 1975 näkymä Ramsarin alkuperäistä 2006 karttaa vasten. Kuvien rajatut roolit läpäisevät tämän D-katselun; se ei täytä puuttuvia kahdeksaa roolia.

## Menetelmä ja lukitut syötteet

Luettu soveltuvat AGENTS.md/CODEX.md/PILVIOHJE (4/5/7/8D/8E/13/LISÄSÄÄNTÖ), koko sitova lehtityöresepti, kaupunkilehden mitat/kuvarajat ja spec-mantereet; Monrovian faktapohja.md, kuvat.md, sisalto.json, kirjoitusmuistiinpanot-C.md sekä lähdekanavapoikkeus. A:n/B:n/C:n väitteitä verrattiin itse alkuperäissivuihin, niitä ei hyväksytty tarkistamattomina.

Oma NAS-aineisto `sessio-72-20261011/valiaikainen/monrovia-D/`: 34 alkuperäistä sivua/tietuetta, lisäksi 14 alkuperäistä Commons-File-sivua, jokaisen valitun esikatselun muuttumaton kopio ja oma havainto. Sallittu_haku.py tarkisti robotsit ja ohjaukset; kiellettyjä API-/w/-polkuja ei käytetty. WP/WD-raakakopiot/lähdehashit lahteet.json:ssa, File-revisiot/tekijät/lisenssit/mitat kuvametadata.json:ssa ja katselut.json:ssa. Tarkistimien lokit ja alkuperäisten syötteiden manifesti säilyvät. Lyhyt NAS-I/O-viive ratkesi; molemmat tarkistimet ja kokonaiset TIFF-katselut valmistuivat. Fi-Libanon ja Monrovian ilmastotaulukko katsottiin lisäksi tavallisten web-sivujen kautta, sama lähde kuin oma tallennettu HTML.

PDF-ohjetta käytettiin read-only-lukemiseen. Oma Ramsar MAP.pdf renderöitiin ja katsottiin. LIPO 2016 LAW.pdf:n 113 sivua ladattiin; relevantit määritelmät ja §9.1/9.2/9.14/9.20/9.34 luettiin tekstinä. Lain omat sivurenderit eivät valmistuneet fontti-/I/O-viiveessä, joten vain nämä omat viisi prosessia keskeytettiin. B:n vastaavat sivukuvat 10/33/35/42 kopioitiin ja katsottiin itse; niiden PDF vastaa omaa LIPO-PDF:ää tavuntarkasti. Kyse ei ole väitteestä kaikkien 113 sivun lukemisesta.

N3/N6:n alkuperäiset 6589×4358 TIFFit ladattiin. Koko kehys katsottiin esikatselun lisäksi; PNG-katselu säilyttää koko alkuperäisen kuva-alan ja pikselit eikä ole uusi valinta tai rajaus. N4/H1/H2/C3/N5 katsottiin myös alkuperäisistä JPEG-kuvista. Mitään valittua kuvatiedostoa tai kuvan aihetta ei muutettu. Ei uusia ehdokkaita, Git-operaatioita, uusia agentteja, pelitiedostoja, generointia tai julkaisua. TMPDIR/pycache ja kaikki väliaineisto NASilla.

Tarkistimen SHA-256: `78c2150e6510ffcd51f05a44898316122f6d98100abd6dc51666de706fd1467c`; sama alkuperäinen tarkistin kuin C:ssä. Sisalto.json:n lähtöhash: `82afb820c5fc6091f3d415c20520e3e1bfc96e0d302df27f05e1f7062856e7da`.

## R1/R2 — sanatarkat kokonaisen kentän korvaukset E:lle

| Kohta | JSON-polku / väite | Itse tarkistettu lähde ja peruste | Tila | Korvaus |
| --- | --- | --- | --- | --- |
| R1 | `kaupunkilehti[0].nostot[3].teksti` ja `kaupunkilehti[0].matkailijalle.artikkeli.jaksot[3].teksti`: lebanonilaista/lebanonilaisia | Suomen maan nimi on Libanon (fi-Wikipedia Libanon, rev 24264905); maanjohdos libanonilainen. Englannin Lebanese ei muuta suomen maantieteellistä nimeä. Ruokafaktat Monrovian Wikivoyage Eat/Self-catering -osioissa säilyvät. | VÄÄRIN | Kaksi koko kentän korvausta alla, vain lebanonilais- → libanonilais-. |
| R2 | `kaupunkilehti[0].nostot[2].teksti`: ”oikeustalo käsitteli asiakirjoja, ja museossa niistä tuli…” | Liberian National Museum / History ja Museum layout (rev 1370379603) osoittaa rakennuksen käytön sekä museon asiakirjat, mutta ei näiden samojen oikeustalon asiakirjojen siirtoa kokoelmaan. Muotoilu voidaan lukea konkreettiseksi aineistoketjuksi. | EPÄVARMA | Koko kentän korvaus alla säilyttää rinnastuksen ja poistaa toteen näyttämättömän saman-aineiston tulkinnan. |

R1 on yksi kielivirhe kahdessa kentässä, R2 yksi epävarma väite. Tarkan siirtoketjun puuttuminen ei tarkoita, että museossa ei olisi asiakirjoja; sitä tukee alkuperäislähde. R2 ei muuta rakennuksen alkuperäistä nimeä, ikää, käyttöhistoriaa tai museon tehtävää.

`kaupunkilehti[0].nostot[3].teksti`: **518 → 518 merkkiä**. Nostotekstin 400–600 merkin raja säilyy.

```json
"Monrovian ruokapaikkojen kirjoon kuuluu liberialaisen ruoan lisäksi libanonilaista ja muuta kansainvälistä tarjontaa. Cook shops -nimellä tunnetuissa paikoissa tarjoillaan liberialaista ruokaa, kuten riisiä ja mausteisia kastikkeita. Kaupungin ruokakuvauksissa mainitaan myös libanonilaisia voileipiä ja falafelia. Hedelmiä ja kasviksia myydään kaupunkikaupoissa, ja Sinkorin suunnalla on kuvattu tuoreen kalan myyntiä. Satamakaupungin ruokailu löytyy sekä pienistä arkipaikoista että kansainvälisen keittiön pöydistä."
```

`kaupunkilehti[0].matkailijalle.artikkeli.jaksot[3].teksti`: **359 → 359 merkkiä**. Opasjakson pituus ja neljä virkettä säilyvät.

```json
"Cook shops -ruokapaikoissa tarjotaan liberialaista ruokaa, kuten riisiä ja mausteisia kastikkeita. Kaupungista on dokumentoitu myös libanonilaista ja muuta kansainvälistä ruokaa. Kasvikset, hedelmät ja kala kuuluvat kaupunkikaupan ruokatarjontaan. Kysy päivän tarjonta paikasta ja varaudu käteismaksuun, sillä kortin tai automaatin toimivuutta ei voi olettaa."
```

`kaupunkilehti[0].nostot[2].teksti`: **498 → 502 merkkiä**. Nostotekstin 400–600 merkin raja säilyy.

```json
"Liberian kansallismuseo toimii Monroviassa vanhassa Supreme Court -oikeustalossa. Rakennus kuuluu 1800-luvun kaupunkiin, museolaitos myöhempään aikaan. Museon aineistoon kuuluu asiakirjoja, karttoja, valokuvia, huonekaluja ja arkisia käyttöesineitä. Sen tehtävä on säilyttää ja esitellä Liberian kulttuurista ja historiasta kertovia aineistoja. Rakennuksen käytön muutos tarjoaa yhteyden kahdenlaiseen muistiin: oikeustalo käsitteli asiakirjoja, ja museo säilyttää asiakirjoja osana Liberian historiaa."
```

## Koko sisällön lähde- ja kielitarkistus

| JSON-polku / osa | Tarkistettu sisältö ja ajallinen raja | Oma alkuperäislähde (artikkeli + osio) | Tila |
| --- | --- | --- | --- |
| `kaupunki`, intro1, kansijohdanto | Monrovia/Liberia/LBR, Atlantti, Mesurado ja Cape Mesurado, Bushrod pohjoisessa, Broad Street ja Waterside | S1 Geography/Neighborhoods; S7 johdanto; WD1 | OK. Pallo WD:n kaupunkipiste, ei lentoaseman sääasema. |
| intro2, yleinen historia | 1800-luvun alun uudisasutus jo kalastuksen/viljelyn/kaupan käyttämällä alueella; James Monroe; 1873 jo kaupunki, vanha oikeustalo/kirkko/lehdet/college | S1 Etymology/History; S2 19th century; S3/S4/S12/S13 | OK. Ei tyhjästä maasta alkava kertomus tai keksitty isoisän käynti. |
| intro3, K1, N6 | Mangrove, sedimentin pidättäminen, rantaviivan vakautus, lintujen ravinnonhaku sekä kalat/äyriäiset ja elinkeinot | S9 RSIS-kuvaus ja RIS.pdf 2006 §§12/14/18/23–24 | OK. Ekologinen tausta, ei uusi lajilaskenta, lajimäärä tai tämänhetkinen hoitotilanne. |
| `artikkeli.teksti`1 ja K2 | Vanhan keskustan Broad Street, Waterside sen pohjoispuolella, sisä/ulkomarkkina ja käytävät, käytetyt vaatteet/kodintavarat ja tuontitavarakaupat | S1 Neighborhoods; S14 Buy/Self-catering | OK. Ei varma torin nimietymologia, nykyhinta, maailman suurin tori tai kuvan kojun tavaran arvaus. K2-kuvavaje säilyy. |
| `artikkeli.teksti`2, H1–H3 | Varhaiset toimitustekstit, Augustus Washingtonin daguerreotypiat, collegen kirjat/tiilet/puutavara | S12 koko artikkeli; S11 Move to Liberia/Political career; S13 History | OK. Ei alkuperäiseksi väitettyä kuvan painolaitetta tai Washingtonin kameraa. |
| `artikkeli.teksti`3, N4/N5 | Bushrodin Atlantti/Saint Paul/Mesurado/Stockton Creek; West Pointin kalastusasuinalue 1900-luvulla | S7 johdanto/History; S8 johdanto/History | OK. Saari ja niemeke eivät sama paikka. Nykyistä Freeportia tai asuinalueen rajoja ei siirretä 1873:een. |
| K3 ja N1 | Museo vanhassa Supreme Court -talossa, laitos myöhempi; kokoelmien asiakirjat/kartat/valokuvat/huonekalut/käyttöesineet; aiemmat paikat ja käynnin nykytilan tarkistus | S3 History/Museum layout; S2 1862-merkintä | Faktat OK, K3:n samojen asiakirjojen tulkinta R2. Tarkkaa1862-vuosilukua ei julkaista yhdestä lähdeketjusta. Museon synty/muutto/uudelleenavaus eri vaiheita. |
| K4, O4 ja ruokailu-Parasta | Cook shops, riisi/mausteiset kastikkeet, libanonilaiset ja muut kansainväliset ruokapaikat, falafel ja Sinkorin kalatarjonta | S14 Eat/Self-catering | Faktat OK, kieli R1. Nimettyä tämän päivän ravintolaa, hintaa tai aukioloa ei luvata; Berliini/Nepal selvästi yleiskuvat. |
| Matkailijalle-kappale, opasnosto, O1 | Päiväkäynti, sovittu kuljetus, Roberts International Airport ROB Harbelin suunnalla, sadevara/tieolot, pimeäajo ja moottoripyörätaksit | S17 johdanto/infolaatikko; T1 Protecting yourself/Road travel | OK. Kuva Cookies Townin Monrovia–Kakata-tiellä, ei todistettu Roberts-kuljetusreitti. |
| O2 ja Parasta1–3 | Broad Street/Waterside, rakennusten käytöt, Bushrod eri kuin Mamba Point/Sinkor; pääsy tarkistettava | S1 Neighborhoods; S3/S4; T1 Crime | OK. Museon/kirkon/collegen myöhempi osa ja tekijäketju erillinen kuvaportti. |
| O3 ja Parasta4 | Providence Island, Mesuradon luontopaikka, paikallinen pääsy, voimakkaat virtaukset ja rantojen rajat | S5 johdanto; S6 Description; S9; T1 Swimming and water safety | OK. Ei satamaan/kosteikolle luvattua reittiä tai turvallista uimista; pakollinen kolmas opaskuva puuttuu. |
| O5 ja `saatiedot.luonnehdinta` | Robertsin seudun noin 25–28 °C, touko–lokakuu runsain sadejakso, syyskuu sateisin, alku/loppuvuosi kuivempia mutta sataa | S1 Climate-taulukko; valmis saa.json | OK: 48/48 kuukausilukua ja kausi/lähde täsmäävät, aseman edustavuus näkyy tekstissä. |
| Parasta5, Hyvä tietää1–4 | Ruokailu; sovittu kuljetus/yö/syrjäiset rannat, käteinen/kortit/automaatit, omat asiakirjat/rokotustodistus/neuvonta/vakuutus, vesi ja pääsy | S14; T1 Money/Crime/Transport/Swimming; T2 Entry requirements; T3 Health | OK. FCDO nimetty työaineistossa, UK-kansalaisrajoja ei siirretä Suomen kansalaisen täsmällisiksi ehdoiksi tai UM-luokaksi. |
| historiasivun johdanto, H1 | Liberia Herald, Force varhaisessa vaiheessa, Russwurm toimitustyössä ja Freedom’s Journal; varhaiset toimitustekstit museossa | S12 koko artikkeli; S3 Museum layout; S2 19th century | OK. Artikkelin perustaja-/vuosiristiriitaa ei muuteta varmaksi päiväksi, levikiksi tai nykyiseksi julkaisulupaukseksi. |
| H2 | Washingtonin Monrovian studio, daguerreotypia, kauppiaat/laitosten edustajat, huolellinen asettelu, ACS:n tilaama mielikuva; myöhempi sokeriruokotyö | S11 Move to Liberia ja Political career | OK. Muotokuvat eivät kaupungin väestön läpileikkaus; aktiivista studiota 1873 tai isoisän tapaamista ei väitetä. |
| H3 | Liberia College 1800-luvulla, yhdysvaltalainen tuki, kirjat/tiilet/puutavara, retoriikka/latina, valtuutus/vihkiminen/luokkien alku eri vaiheita | S13 History; S2 1863-merkintä | OK. Opetus oli ennen 1873; vanha laitos ei nykykampuksen rakennusten ikätodistus. |
| H4, N2 | Vanha 1839-lähteen pyhäkkö vuosisatatasolla, Hilary Teage, historiallisten asiakirjojen hyväksyminen; viereinen suurempi modernistinen pyhäkkö 1900-luvun jälkipuolella | S4 History/Preservation | OK. Seurakunnan synty ja rakennus eri vaiheita,1839/1976 eivät kuviteltu sama talo. Nykykäynti/kuvaoikeus erillinen. |
| `kohdekartta.esittely`, N1/N2 | Historialliset rakennuspaikat ja luonnonpaikat, 1873-kehys | S2/S3/S4/S5/S7/S8/S9 | Teksti OK. Kahden rakennuksen kuvat puuttuvat; niitä ei korvata myöhemmillä teoksilla. |
| N3 Providence Island | Mesurado/Stockton Creek, nimetDozoa/Darzoe/Perseverance, dokumentoitu mangrove/kaivo/puu/laiturijälki, myöhemmät majat, UNESCO-ehdotuslista | S5 History; S6 Description/State Party -raja; WD4 | OK. Ei hyväksytty maailmanperintöasema, puun/kaivon tarkka ikä tai alkuperäiseksi väitetty rekonstruktiomaja. |
| N4 Bushrod | Dei-yhteisöjen vanha käyttö, Bushrod Washington eikä Augustus; Vai/New Kru/Logan/Clara Town, nykyinen Freeport | S7 johdanto/History; S11 henkilön nimi | OK. 1878 Vaitown-havaintoa ei suoraan taaksepäin 1873; yleinen vanha yhteisö-/vesipaikka, ei nykyterminaali aikamatkakohteeksi. Kuvapaikka alla. |
| N5 West Point | Nimetyllä niemekkeellä asuinalue, Watersiden luoteispuoli, kalastus/pienkauppa/palvelutyö, rantaeroosio ja 1900-luvun synty | S1 Neighborhoods; S8 History/johdanto | OK. Ei väestö-/pinta-alalukua, kurjuuskatsetta, tautitarinaa tai nimettyä niemenkärkisijaintia. |
| N6 Mesurado | Luontopaikka, dokumentoitu keruu/teollinen kuormitus; myöhempi Ramsar-status, ei valmista vierailureittiä | S9 RSIS ja RIS.pdf §§23–24 | OK. 2006 dokumentti ei tämän päivän hoito-/saastetilanne tai lajilupaus. Kuvassa1975 maisema, ei 2006 päätös. |

Muu suomi, nimitaivutukset, viittaussuhteet, kappaleet ja kuvatekstit luettu. R1:n Libanon-muodon lisäksi ei todettu varsinaista kielivirhettä. Kertojan kirjalliset rinnastukset pidetään erillään aineistoketjun faktaväitteestä (R2). Ei julkaistua väestö- tai pinta-alalukua, suhteetonta superlatiivia, keksittyä aistimusta, isoisän repliikkiä/ostos-/henkilötapaamista, nykypoliittista lehtitarinaa tai maalehden aiheen uusintaa. Providence Islandin olemassa olevaa rantautumisnostoa ei toisteta historia-teemasivuksi.

## Viisi kysymystä, kolme tietoa ja yksi minitehtävä

| Polku | Oikea vastaus / tekstivastaavuus | Oma lähde ja vihjeraja | D |
| --- | --- | --- | --- |
| `kysymykset[0]` | Liberia; intro1 | S1 johdanto. Länsi-Afrikan rannikkovihje ei sano Liberiaa ja sopii myös useampaan väärään maahan. | OK |
| `[1]` | Atlantti; intro1, maantiede/kohteet | S1 Geography. Vihje Afrikan länsipuolelle ei vastaussanaa. | OK |
| `[2]` | Oikeustalo; K3 ja N1 | S3 History. Lakiasioiden vihje ohjaa mutta ei sano oikeustaloa; vaihtoehdot rakennustyyppejä. | OK |
| `[3]` | Daguerreotypia; H2 | S11 Move to Liberia.1800-luvun muotokuvat eivät nimeä menetelmää; oikea ei selvästi pisin. | OK |
| `[4]` | Eri vuosisadat; H4 ja N2 | S4 History. Historiallinen pieni tila/myöhempi laajempi vihje ei sano vuosisatoja tai vuosia. | OK |
| `tiedot[0]` | Vesi/niemimaa/saari, Bushrod eri paikka | S1 Geography/Neighborhoods ja S7 johdanto | OK |
| `tiedot[1]` | Oikeustalo ennen museolaitosta | S3 History ja S2 | OK |
| `tiedot[2]` | Vanha ja modernistinen pyhäkkö rinnakkain | S4 History | OK |
| `kaupunkilehti[1].tehtava` | Kirjat, tiilet, puutavara; vastaus H3:ssa | S13 History. Fakti ei H3:n virke sanatarkasti; ei sama kysymys kuin visa 5 tai museokysymys. | OK |

Kaikki correct/oikea-arvot 0 vastaavat oikeaa vaihtoehtoa. Tasot 1/1/2/2/3, viisi kysymystä ja kolme tietoa ilman isoisää. Oikea vastaus ei selvästi pisin missään; ei useampaa oikeaa vaihtoehtoa. Faktit löytyvät lopullisen nykytekstin sivuilta ja alkuperäislähteistä. Minitehtävän vastaus löytyy omalta historiasivulta, ei pelkästään ulkoisesta Wikipediasta.

## Kuusi karttapaikkaa omista WP/WD-tietueista

| Paikka ja nykyinen piste | Oma alkuperäinen WP/WD | Poikkeama ja merkitys | D |
| --- | --- | --- | --- |
| Museo 6.31580/−10.80400 | S3 en-WP rev 1370379603 geo 6.3158/−10.804 | WD2 Q1345859:6.31685/−10.80394 noin117m eri paikka. Käytetään rakennusartikkelin omaa pistettä, ei keskiarvoa tai tarkasta WD-formaatista pääteltyä ovea. | OK |
| Providence Baptist 6.31680/−10.80440 | S4 rev 1362529639 ja WD3 Q140606260 P625 sama, precision0.0001 | Kirkkopaikan piste, ei vanhan pyhäkön erillisen sisäänkäynnin mittaus tai modernin naapurin tunnistus. | OK |
| Providence Island 6.32000/−10.80200 | S5 rev 1334620530 ja WD4 Q27459317 preferred P625 sama, precision0.001 | Normal-rank6.319758/−10.801259 ja6.32/−10.8023 luettu, ei keskiarvo. File-sivunQ56293255 ohjaa samaanQ27459317-tietueeseen, ei eri maa/saari. | OK |
| Bushrod 6.35750/−10.78556 | S7 rev 1369793439 geo6°21′27″N10°47′8″W | WD5 Q2093421:lon−10.783333… noin246m eri saaren aluepiste. S7:n suora sekuntimuunnos/pyöristys säilyy; ei Freeport-laituri. | OK |
| West Point 6.32730/−10.80640 | S8 rev 1379601140 ja WD6 Q1449164 P625 sama | Nimetty asuinalue niemekkeellä, ei tarkka kärki tai uimapaikka. | OK |
| Kosteikko 6.30000/−10.75000 | S10 fr-WP rev 238205104 nimenomainen Mesurado-rivi6°18′N10°45′W, S9 RSIS sama aluekoordinaatti | WD7:n koko Mesuradojoen piste ei jokisuu/kosteikon piste. RIS2006 §8 kertoo laajan alueen rajat6°19′–6°16′N/10°48′–10°42′W, ei retkipaikka. | OK |

Pallon 6.3106/−10.8047 pyöristys vastaa WD1 Q3748:n6.310555…/−10.804722…:a. Se ei ilmastohavaintoaseman sijainti. Kaikki kuusi kohdepistettä ovat nykyisen kehyksen sisällä: marginaalit 566.5/522.2/787.8/300.6/300.9/300.6m. Kaksi historiallista rakennuspaikkaa ja neljä luonto-/rannikkopaikkaa, ei modernia taidetta, henkilöä tai esinettä karttapisteenä.

Pistemarginaali ei varmista laajan Bushrodin tai Mesurado-kosteikon **koko alueen** näkyvyyttä: lähteiden kuvaamat alueet ovat pistettä suurempia, ja Mac-kartan rantaviiva-/taittovarmennus jää myöhempään vaiheeseen. Tässä ei väitetä renderöityä karttaa tai sisäänkäyntejä tarkistetuiksi. Karttapisteitä ei muuteta tämän vuoksi kuvasta arvaamalla.

## N4/N6 — taustarantojen nimenomainen paikannus

N4:n **West Point etualalla / Bushrod taustalla** on hyväksytty vain tähän koko näkymään. Oma alkuperäinen 1600×1200 kuva näyttää keskustasta pohjois-/luoteissuuntaan katsotun rantaniemekkeen, Mesuradon vesialueen ja sen takaisen rakennetun saaren rannan. Vertailupisteet ovat S1:n West Point Watersiden luoteispuolella, S7:n Bushrod pohjoisessa ja Mesurado saaren etelän vetenä sekä N5:n nimenomaisesti West Pointiksi ja Ducorin katolta kuvatuksi tunnistettu toinen näkymä. RSIS2006 kartan pohjoisnuoli, jokisuun/niemen ja vastarannan vesimuoto sekä koordinaattiruutu tukevat samaa etuala–vastaranta-järjestystä. Kartta ei anna yksittäisen talon/laiturin identiteettiä. N4:n kuvateksti sanoo jo yleisesti joen takaisen kaupunkirannan, eikä etualaa nimitetä Bushrodiksi. Pääkohdetta tai nimeä ei muuteta West Pointiksi.

N6:n File-Description sanoo erikseen **Providence Island in the Mesurado river. Swamps in the background.** Koko1975 TIFF-näkymässä saaren osa on vasemmalla etualalla, kaupungin kattoja alhaalla, suuri joki keskellä ja laajempi kosteikkokasvillisuus taustalla. Se ei ole vain Providence Islandin lähikuva. Kartan Mesuradojoen alajuoksun pohjois-/itäpuolinen mangrove- ja vesistömuoto sekä S9/RIS:n rajattu alue sopivat taustan maisemaan; N3:n kokosaari toimii saman jokinäkymän toisena vertailuna. Tässä tunnistetaan kosteikon historiallinen **alueympäristö**, ei julisteta jokaisen 1975 kasvinosan olevan 2006 suojelualueen sisällä. Kuvatekstin nykyinen taustan-kosteikon taso on oikea. N6:n kohdetta ei vaihdeta File-nimestä Providence Islandiksi tai pääkoordinaattia joen yleispisteeksi.

Kartta on EPA GIS Sectionin 3.4.2006 tuottama 1:60 000 aluekartta. Legendassa mangrove, urban area, island, major road ja **Mesurado proposed boundary**; luettu proposed-sana, ei valmis1975 suojelupäätös. RIS on 18.4.2006. S9:n Most recent RIS information: 2006 säilyy lähteen rajana. N3/N6:n 1975 ajoitus ei tämän päivän palvelu-, hoito-, lajisto-, raja- tai Ramsar-statuskuva. Taustan pääkohteen tunnistus ja kuvan laatu eivät ratkaise uuden retkireitin tai lähikasvon lupaa.

## Kaikki 14 valittua kuvaa — oma katselu

Jokaisesta oma muuttumaton esikatselu sekä File-sivu. **O** = myös alkuperäisen/natiivin kokonaisen kuva-alan katselu (TIFFin koko PNG-katselu N3/N6). Kaikki 14 eri tiedostoa ja leveys≥ 1200 px; lain lähdeketju ja kuvan valokuvaoikeus erotettu kuvatun kohteen oikeuksista. Kaikilla nykyisillä lyhyillä kuvateksteillä≤ 100 merkkiä ja piste, pitkät yhden virkkeen selitteitä.

| Rooli ja tiedosto (oma File-lähde) | Alkuperäiskoko; tekijä / lisenssi; aika | Oma silmähavainto ja hyväksytty rajaus | D |
| --- | --- | --- | --- |
| C1 / [Liberia, Africa - panoramio (267).jpg](https://commons.wikimedia.org/wiki/File:Liberia,_Africa_-_panoramio_(267).jpg) | 4928×3264; blk24ga / CC BY 3.0; 2013 | Laaja kaupunkikudos, puita/palmuja, Atlantin ranta ja horisontti. Monet rakennukset maiseman osina, ei erillinen rakennus tai muistomerkki pääaiheena; ei luettavia kasvoja. | OK rajattuun rooliin |
| C2 / [Liberia, Africa - panoramio (265).jpg](https://commons.wikimedia.org/wiki/File:Liberia,_Africa_-_panoramio_(265).jpg) | 4928×3264; blk24ga / CC BY 3.0; 2013 | Mesuradojoen vesi jakaa kortteleita, kapea puustoinen saari ja laaja vihreä kosteikko taustalla, silta vasemmalla osana koko maisemaa. Ei erillisen sillan pääkuva tai retkipaikan todiste. | OK rajattuun rooliin |
| C3 **O** / [Liberia, Africa - panoramio (252).jpg](https://commons.wikimedia.org/wiki/File:Liberia,_Africa_-_panoramio_(252).jpg) | 4928×3264; blk24ga / CC BY 3.0; 2013 | Pitkä keskustan katulinja ja paljon rakennuksia, joki ja kosteikko taustalla; puusto etualalla. Alkuperäisestä näkyvät myös erottuvat rakennusjulkisivut, mutta koko kuva esittää laajaa katu-/kaupunkirakennetta. Ei nimetyn temppelin PD-väite tai luettavia kasvoja. | OK rajattuun rooliin |
| K1 / [Mangroves near Marshall, Liberia 2.jpg](https://commons.wikimedia.org/wiki/File:Mangroves_near_Marshall,_Liberia_2.jpg) | 1536×2048; (c) B. Phalan, some rights reserved (CC BY) / CC BY 4.0; 2013 | Mangroven tiheät vihreät lehdet ja haarautuvat juuret mutaisella maalla. Ei ihmisiä tai rakennettua taidetta. Marshall Liberiassa, yleinen mangrove; ei Monrovia/Mesurado, laji tai puiden ikä. | OK rajattuun rooliin |
| K4 / [20240815 Falafel Plate Restaurant The Hummusapiens Berlin anagoria.jpg](https://commons.wikimedia.org/wiki/File:20240815_Falafel_Plate_Restaurant_The_Hummusapiens_Berlin_anagoria.jpg) | 12000×8035; Anagoria / CC BY-SA 4.0; 2024 | Falafel-annos lautasella, hummusta/salaatin osia ja ruokaa. Ei kasvoja, mainospakkausta tai erillistä taideteosta. File-sivu Berlin: yleiskuva, ei paikallinen Monrovian ateria. | OK rajattuun rooliin |
| H1 **O** / [Colenso press.jpg](https://commons.wikimedia.org/wiki/File:Colenso_press.jpg) | 2592×1944; Kaihsu Tai / CC BY-SA 4.0; 2008 | Painopuristimen taso/vipu/ruuvi-/valurakenne, pieniä valukoristeita ja valmistajan merkintää; museohuoneen tavallisia huonekaluja, seinäke ja matto. Pääaihe tekninen menetelmälaite, koristeosat sivuosia. Paihian rekonstruktio, ei Heraldin kone tai todennettu alkuperäinen1800-luvun esine. | OK rajattuun rooliin |
| H2 **O** / [Susse Frères Daguerreotype camera 1839.jpg](https://commons.wikimedia.org/wiki/File:Susse_Fr%C3%A8res_Daguerreotype_camera_1839.jpg) | 1738×1385; Liudmila & Nelson / PD; 2010 | Tumma puinen laatikkokamera ja messinkinen objektiivi vaalealla taustalla. Esineen valmistajatunnisteet omissa pinnoissa, ei lisätty vesileima. Susse Frères Wienin Westlichtissä, ei Augustus Washingtonin kamera. | OK rajattuun rooliin |
| O1 / [Cookies Town, Monrovia - kakata highway; Montserrado.jpg](https://commons.wikimedia.org/wiki/File:Cookies_Town,_Monrovia_-_kakata_highway%3B_Montserrado.jpg) | 2735×3645; Bethel. Anthony Chisom / CC BY-SA 4.0; 2020 | Vihreän ulkoreunan ja asutuksen läpi mutkitteleva tie, pieniä ajoneuvoja ja talojen kattoja. Ei luettavia kasvoja tai rakennus pääteoksena. Cookies Town/Monrovia–Kakata-tie, ei Broad Street tai varma lentokenttäkuljetusreitti. | OK rajattuun rooliin |
| O4 / [Cooked Rice 2.jpg](https://commons.wikimedia.org/wiki/File:Cooked_Rice_2.jpg) | 3024×4032; Gaurav Dhwaj Khadka / CC BY-SA 4.0; 2022 | Keitettyä valkoista riisiä tavallisessa metallisessa astiassa, ei kasvoja, mainosta tai taideteosta. Nepal yleiskuva, ei Liberian resepti/Monrovian annos. | OK rajattuun rooliin |
| N3 **O** / [ASC Leiden - F. van der Kraaij Collection - 05 - 022 - A close up of Providence Island in full, in the Mesurado river - Monrovia, Mamba Point, Montserrado, Liberia, 1975.tif](https://commons.wikimedia.org/wiki/File:ASC_Leiden_-_F._van_der_Kraaij_Collection_-_05_-_022_-_A_close_up_of_Providence_Island_in_full,_in_the_Mesurado_river_-_Monrovia,_Mamba_Point,_Montserrado,_Liberia,_1975.tif) | 6589×4358; Fred van der Kraaij / CC BY-SA 4.0; 1975 | Kokonainen Providence Island joessa, puustoa ja avointa maata, rannan kaupungin kattoja ja saariyhteys/rakennuksia sivuosina. Vanhan filmin rakeisuus/pöly/jäljet eivät lisättyä leimaa.1975 historiallinen saari, ei1873/nykyinen käyntipalvelu tai puun ikä. | OK rajattuun rooliin |
| N4 **O** / [Bushrod Island, Monrovia, Liberia.JPG](https://commons.wikimedia.org/wiki/File:Bushrod_Island,_Monrovia,_Liberia.JPG) | 1600×1200; Rjruiziii / CC BY-SA 3.0; 2010 | Etualalla West Pointin tiivis rantaniemeke, Mesuradojoen vesi ja kauempana Bushrodin rakennettu vastaranta/satamaympäristö. Alkuperäinen1600×1200 vaalea, mutta rannansuunta ja vesien järjestys erottuvat. Ihmiset vain pisteitä; etualaa ei nimitetä Bushrodiksi. | OK rajattuun rooliin |
| N5 **O** / [An aerial view of the West Point area of Monrovia.jpg](https://commons.wikimedia.org/wiki/File:An_aerial_view_of_the_West_Point_area_of_Monrovia.jpg) | 4288×2848; Mark Fischer / CC BY-SA 2.0; 2014 | West Pointin niemeke, Atlantti ja Mesurado, tiiviitä kattoja/rantaviiva. Alkuperäisessä ihmiset pieniä pisteitä, ei luettavia kasvoja. Alareunan fyysinen katon mainospinta on sivuosassa; koko kuva ei ole mainos-/pakkauskuva eikä pinta lisätty vesileima. | OK rajattuun rooliin |
| N6 **O** / [ASC Leiden - F. van der Kraaij Collection - 05 - 021 - Providence Island in the Mesurado river - Monrovia, Mamba Point, Montserrado, Liberia, 1975.tif](https://commons.wikimedia.org/wiki/File:ASC_Leiden_-_F._van_der_Kraaij_Collection_-_05_-_021_-_Providence_Island_in_the_Mesurado_river_-_Monrovia,_Mamba_Point,_Montserrado,_Liberia,_1975.tif) | 6589×4358; Fred van der Kraaij / CC BY-SA 4.0; 1975 | Mesuradojoen laaja vesi, Providence Islandin osa vasemmalla etualalla, suurehko kosteikkokasvillisuuden alue taustalla ja kaupunkikattoja alhaalla. Koko1975 näkymä ja RSIS2006 kartta vastaavat alajuoksun ympäristöä. Ei nykylajisto, suojelupäätös tai tarkka käyntipiste. | OK rajattuun rooliin |
| PHOTO / [Liberia, Africa - panoramio (270).jpg](https://commons.wikimedia.org/wiki/File:Liberia,_Africa_-_panoramio_(270).jpg) | 4928×3264; blk24ga / CC BY 3.0; 2013 | Rantapuustoa ja palmuja, hiekkarannan kaistale, laaja meri ja pieniä aluksia kaukana. Ei kasvoja tai kuvateosta pääaiheena. Monrovian Atlantin luontoranta2013, ei ≤1900-valokuvavedos. | OK rajattuun rooliin |

### Teos-, paikka- ja krediittirajojen päätös

**Kansien C1/C2/C3** pääaiheet ovat laaja rannikkokaupunki, joki ja keskustan katulinja. C3:ssa erottuva pylväikköjulkisivu ja muut talot katsottiin alkuperäiskoossa; kuva ei ole yksittäisen temppelin/hotellin/rakennuksen pääkuva. C2:n silta on maiseman osa. Rajattu yleiskuvakäyttö läpäisee D:n, mutta tästä ei anneta nähtävän yksittäisen rakennuksen/sillan PD-todistusta, oikeutta irrottaa se uudeksi kohdekuvaksi tai yleistä kaupallista FOP-lupaa. Museon/kirkon/collegen kuvia ei lisätä näistä taustataloista.

**H1** kuvaa Paihian Haven of History -museorekonstruktiossa olevaa painopuristinta. File sanoo Colenson laitteen tyyliä, joten alkuperäistä 1800-luvun valmistus-/esinevuotta ei oleteta. Natiivissa näkyvät laitteen tavanomainen vipu/taso/valurakenne, pieniä valukoristeita/valmistajakilpi, tavalliset kalusteet/seinäkkeet ja maton kuviopinta taustalla. Pääaihe on tekninen menetelmälaite, ei erillisen kuvataiteen reproduktio; koriste- ja kalustepinnat ovat sivuosia. Teknisestä käyttöesineestä ei päätellä automaattisesti suojattua Liberian perinneteosta. Kuvausmaa Uusi-Seelanti, ei Liberia; Liberian lain perusteella ei anneta ulkomaiselle esineelle yleistä taidevapautta. Hyväksyntä koskee tätä yleistä mekanismikuvaa, ei yksittäisen uuden koristeen omaa kuvaa. Kuvateksti ei väitä Heraldin konetta.

**H2** on Wienin Westlicht-museon Susse Frères -laite. Laatikkorakenne/objektiivi ja laitteen valmistajatunnisteet, ei moderni muotokuva tai Washingtonin omaksi nimetty kamera. Kuvaajan nimenomainen PD-luopuminen näkyy File-sivulla, eikä PD päätelty pelkästä 1839-tiedostonimestä. Tarkka esinevuosi ei pelaajan selitteessä.

**N3/N6** luonnonvesi-/saari-/kosteikkomaisemassa sillat, rantatalot ja saaren rakennelmat ovat sivuosia. Vanha valokuva ei tee jokaista näkyvää rakennetta 1873:n alkuperäiseksi tai vapaaksi uudeksi pääteokseksi. Filmipöly, naarmut ja värin vanheneminen ovat alkuperäisen skannin ominaisuuksia, eivät lisätty vesileima/arkistoleima. Luontopaikkaa ei tulkita perinteiseksi taideteokseksi vain sen kulttuurihistorian vuoksi.

**N5** katsottiin myös 4288×2848 alkuperäisestä: ihmiset rannalla/kadulla pieniä eikä luettavaa kasvonpiirrejoukkoa. Alareunan katon olutmainospinta on fyysinen pieni sivuosa; laaja niemi/meri/kaupunkikuva ei ole mainos- tai pakkauskuva eikä mainosmerkintä kuvan päälle lisätty leima. N4:n ihmiset ovat vielä pienempiä pisteitä vaaleassa 1600×1200 kuvassa. C1/C2/C3/O1:n ihmiset enintään kaukaisia pisteitä; muissa ei kasvokuvaa. Kaikissa 14 katsottiin lisätyt merkinnät, mainos-/pakkausaihe ja kasvot, eikä tähän rajattuun joukkoon löytynyt hylättävää kuvaa.

**Yleiskuvien maat:** K1 Marshall Liberiassa (FileObject location6.134/−10.357 ja MAR); K4 Berlin falafel 2024; O4 Nepal riisi 2022. Ne eivät Monrovian oma kosteikko, ravintola tai resepti. O1 Cookies Town/Monrovia–Kakata ei kaupungin keskusta tai todistettu lentoasemareitti. PHOTO 2013 on nykyajan rannikkoluontokuva, ei ≤1900-vedos/ennen–nyt-pari. Vanha kuva ei täytä puuttuvaa tuoretta matkailijalle-pystyä tai kolmatta opaskuvaa.

**Fred van der Kraaij:** N3/N6:n alkuperäisillä File-sivuilla Photographer-taulurivi sisältää nimenomaisen `span.fn#creator`-nimen. Krediitti luettu siitä, ei CSS:stä, syntymä-/biodatasta tai uploaderin tunnuksesta. Revisiot 776026948/776026942, koko 6589×4358, CC BY-SA 4.0. `artistFieldSource`: Photographer table / Creator fn; not biography or uploader inference. Muut 12 tekijät näkyvistä Artist/Author-riveistä. Lähderivit täsmäävät B:n valittuihin sanatarkasti, myös B. Phalan -rivissä oleva(c)/CC-BY-muoto ja PHOTO:n lyhyt Commons-muoto; nimeä ei muutettu henkilöarvaukseksi.

**LIPO 2016:** §3.1:n arkkitehtuuriteos ei yksittäinen standardiosa; §9.1 edellyttää omaperäistä henkistä luomusta. §9.14(c) on ajankohtaistapahtumaraportoinnin rajoitus, ei yleinen kaupallinen FOP. §9.20:n suoja-aika ei museotalon tai kirkkoseurakunnan aloitusvuosi; omistajan70 vuoden kohderaja säilyy. §9.34:n perinteinen kulttuuri-ilmaisu ja sen satunnainen sisällyttäminen eivät yleinen kaikkien rakennusten FOP-poikkeus tai kaiken luonnon/ruoan/toiminnallisen esineen kielto. Tässä ei tehty uutta suojatun rakennuksen pääkuvaa tai oletettu nykyistä museon/kirkon/collegen osaa vapaaksi. Niiden B-portit jäävät edelleen auki.

## Sääasema ja mitat

Oma Monrovia-HTML rev 1379469768: **Climate data for Roberts International Airport,37 miles (60 km) east of Monrovia,Liberia(1991–2020)**. Se ei keskustan kadun mittaussarja. Taulukon viitteet DWD(average temperature and extremes only) ja Danish Meteorological Institute; niitä ei väitetä tässä kahdeksi erikseen luetuksi raakadataksi.

Oma ilmastopoiminta varmisti kaikki 48 kuukausiarvoa. Daily mean °F (°C) muuntui samoihin keskilämpöihin; Mean daily maximum/minimum eivät ennätysrivejä. Average rainfall inches (mm) on vesisade. Ensimmäisen yksikön muunnos ja alkuperäisen algoritmin pyöristys selittävät mm. tammikuu 1,0 in →25 mm, vaikka taulukon toisessa yksikössä 26 mm; toukokuu 16,4 in →417, marraskuu 7,5 in →191. Näitä ei korjata käsin tai yhdistellä toiseen asemaan.48 arvoa, lat/lon ja lähdeolio täsmälleen saa.json:ssa; numeerinen todiste numero-ja-mittatarkistus.json. Vuosirivin 4561 mm ja työkalun 4562 ero ei uusi virhe pelaajatekstiin, joka ei julkaise sitä täsmällisenä tilastona. Kausi 1991–2020 ja aseman seutu näkyvät oikein. Syyskuu 914 mm on sarjan suurin, keskilämpö 25,0–27,9 vastaa noin 25–28 °C.

| Osa | Oma mittaus |
| --- | --- |
| Intro / lue lisää |899/889 merkkiä, kummassakin 3 kappaletta; intro 9 virkettä ja 3 lihavointia. |
| Kansi |514/510/498/518 merkkiä; R2 jälkeen K3 502, R1 jälkeen K4 edelleen 518. |
| Historia |487/525/515/528 merkkiä. |
| Matkailijalle ja opas |5 virkettä, pysty puuttuu;5 jaksoa ja 2 kuvaa, O3 pakollinen puute O2/O5:n lisäksi; Parasta 5 ja Hyvä tietää 4. |
| Kuusi kohdetekstiä |926/913/968/911/890/923 merkkiä, kukin 3 kappaletta. |
| Quiz/tiedot/tehtävä |5/3/1, oikea ja vihje tarkistettu. |
| Kuvat/kartta/sää |14 eri kuvaa, alkuperäisleveys≥ 1200 px;6 lähdepistettä;48/48 sääarvoa, lähde ja kausi samat. |

## Alkuperäisten tarkistimien todelliset virheet

Paikallinen: `node paakaupungit-pilvi/tyokalu.mjs tarkista e04 monrovia`.

Sallittu verkko samasta NAS-kloonista: `node --import ../valiaikainen/lahdesovitus.mjs paakaupungit-pilvi/tyokalu.mjs tarkista e04 monrovia --verkko`.

Kumpikin oma ajo valmistui exit 1, sama tulos sanatarkasti:

```text
VIRHE monrovia: kansi nosto 2: tiedosto puuttuu
VIRHE monrovia: kansi nosto 3: tiedosto puuttuu
VIRHE monrovia: matkailijalle.kuva: tiedosto puuttuu
VIRHE monrovia: oppaassa yli kaksi kuvatonta jaksoa
VIRHE monrovia: teemasivu historia nosto 3: tiedosto puuttuu
VIRHE monrovia: teemasivu historia nosto 4: tiedosto puuttuu
VIRHE monrovia: juttu Kansallismuseon vanha oikeustalo: kuvia 1–3
VIRHE monrovia: juttu Providence Baptist Church, historiallinen pyhäkkö: kuvia 1–3
== monrovia: 8 virhettä, 0 varoitusta, 14 kuvaa
YHTEENSÄ 1 kaupunkia: 8 virhettä, 0 varoitusta
```

Kuvapuutteet K2/K3/H3/H4/pysty/N1/N2/O3. O2/O5 ovat kaksi sallittua kuvatonta opasjaksoa; O3 ei kolmas hyväksytty kuvattomuus. Ei tyhjää kuvaoliota laskennan kiertämiseksi. Commons-lisenssi-/tekijä-/leveys- tai wikiotsikkovirhettä ei omassa verkkotarkistuksessa saatu. Kuvavajeet säilyvät, vaikka E tekee kolme tekstikentän korvausta.

## Oma lähdehakemisto

34 lähdettä/tietuetta sekä14 File-sivua yllä. Alkuperäiset URL:t/raakakopiot/hashit/revisiot omassa D-aineistossa; yhteinen robots-/redirect-/hakuloki sallitut-haut.jsonl. Aiemmin estettyjä UNESCO-museo-PDF-, Library of Congress- tai Met-viitteitä ei väitetä luetuiksi. Saman WP-artikkelin kieliversiot/sitelinkit eivät kaksi riippumatonta historiallista vuosivarmennusta.

| Tunnus | Luettu alkuperäinen lähde | Oma revisio / lukuraja |
| --- | --- | --- |
| S1 | [Monrovia](https://en.wikipedia.org/wiki/Monrovia) | 1379469768 |
| S2 | [Timeline of Monrovia](https://en.wikipedia.org/wiki/Timeline_of_Monrovia) | 1356866611 |
| S3 | [Liberian National Museum](https://en.wikipedia.org/wiki/Liberian_National_Museum) | 1370379603 |
| S4 | [Providence Baptist Church](https://en.wikipedia.org/wiki/Providence_Baptist_Church) | 1362529639 |
| S5 | [Providence Island, Liberia](https://en.wikipedia.org/wiki/Providence_Island,_Liberia) | 1334620530 |
| S6 | [S6](https://whc.unesco.org/en/tentativelists/6247/) | alkuperäinen sivu, ei WP-revisiota |
| S7 | [Bushrod Island](https://en.wikipedia.org/wiki/Bushrod_Island) | 1369793439 |
| S8 | [West Point, Monrovia](https://en.wikipedia.org/wiki/West_Point,_Monrovia) | 1379601140 |
| S9 | [1631](https://rsis.ramsar.org/ris/1631) | alkuperäinen sivu, ei WP-revisiota |
| S10 | [Liste des sites Ramsar au Liberia](https://fr.wikipedia.org/wiki/Liste_des_sites_Ramsar_au_Liberia) | 238205104 |
| S11 | [Augustus Washington](https://en.wikipedia.org/wiki/Augustus_Washington) | 1369529796 |
| S12 | [Liberia Herald](https://en.wikipedia.org/wiki/Liberia_Herald) | 1312233099 |
| S13 | [University of Liberia](https://en.wikipedia.org/wiki/University_of_Liberia) | 1368507198 |
| S14 | [Monrovia](https://en.wikivoyage.org/wiki/Monrovia) | 5202978 |
| S15 | [Cape Mesurado](https://en.wikipedia.org/wiki/Cape_Mesurado) | 1362489448 |
| S16 | [lbr.htm](https://www.ibiblio.org/lighthouse/lbr.htm) | alkuperäinen sivu, ei WP-revisiota |
| S17 | [Roberts International Airport](https://en.wikipedia.org/wiki/Roberts_International_Airport) | 1363075065 |
| T1 | [safety-and-security](https://www.gov.uk/foreign-travel-advice/liberia/safety-and-security) | alkuperäinen sivu, ei WP-revisiota |
| T2 | [entry-requirements](https://www.gov.uk/foreign-travel-advice/liberia/entry-requirements) | alkuperäinen sivu, ei WP-revisiota |
| T3 | [health](https://www.gov.uk/foreign-travel-advice/liberia/health) | alkuperäinen sivu, ei WP-revisiota |
| WD1 | [Q3748.json](https://www.wikidata.org/wiki/Special:EntityData/Q3748.json) | 2537912119; labels/sitelinks/P31/P625 |
| WD2 | [Q1345859.json](https://www.wikidata.org/wiki/Special:EntityData/Q1345859.json) | 2515902712; labels/sitelinks/P31/P625 |
| WD3 | [Q140606260.json](https://www.wikidata.org/wiki/Special:EntityData/Q140606260.json) | 2525807681; labels/sitelinks/P31/P625 |
| WD4 | [Q27459317.json](https://www.wikidata.org/wiki/Special:EntityData/Q27459317.json) | 2399823438; labels/sitelinks/P31/P625 |
| WD5 | [Q2093421.json](https://www.wikidata.org/wiki/Special:EntityData/Q2093421.json) | 2515917845; labels/sitelinks/P31/P625 |
| WD6 | [Q1449164.json](https://www.wikidata.org/wiki/Special:EntityData/Q1449164.json) | 1840087668; labels/sitelinks/P31/P625 |
| WD7 | [Q1107151.json](https://www.wikidata.org/wiki/Special:EntityData/Q1107151.json) | 2516886321; labels/sitelinks/P31/P625 |
| WD8 | [Q1479922.json](https://www.wikidata.org/wiki/Special:EntityData/Q1479922.json) | 2426564441; labels/sitelinks/P31/P625 |
| LAW | [Liberia-IP-Law-2016.compressed.pdf](https://lipo.gov.lr/wp-content/uploads/2022/11/Liberia-IP-Law-2016.compressed.pdf) | alkuperäinen PDF; koko tiedosto säilyy |
| MAP | [LR1631map.pdf](https://rsis.ramsar.org/RISapp/files/45281184/pictures/LR1631map.pdf) | alkuperäinen PDF; koko tiedosto säilyy |
| MAR | [Marshall, Liberia](https://en.wikipedia.org/wiki/Marshall,_Liberia) | 1375657147 |
| RIS | [LR1631RIS.pdf](https://rsis.ramsar.org/RISapp/files/RISrep/LR1631RIS.pdf) | alkuperäinen PDF; koko tiedosto säilyy |
| WDIMG | [Q56293255.json](https://www.wikidata.org/wiki/Special:EntityData/Q56293255.json) | 2399823438; labels/sitelinks/P31/P625 |
| FILIB | [Libanon](https://fi.wikipedia.org/wiki/Libanon) | 24264905 |

## Korjattu ja jäljelle jäävät portit

**Korjattu:** D ei muokannut sisalto.jsonia, kuvat.md:tä, sääaineistoa tai C-muistiinpanoja. E toteuttaa R1:n kaksi ja R2:n yhden kokonaisen kentän korvauksen eri toimijana. R1 518/359 merkkiä pysyvät samoina, R2 498→502; tekstifaktat/lähteet/kuvat/sää säilyvät muuten. Kolme korvausta koneellisesti luettavassa korvaukset.json:ssa; ei automaattisesti tehty korjaus.

K2/K3/H3/H4/pysty/N1/N2/O3 ovat edelleen avoimia. Vanhan museon/kirkon/collegen historian perusteella ei hyväksytä myöhempiä rakennusosia tai kuvaa väärästä pyhäköstä. N4/N6:n pääkohteita, koordinaatteja tai kuvatekstejä ei vaihdeta arvaamalla. Paikkatunnistuksen rajat, laajojen alueiden koko karttakehys ja fyysiset käyntijärjestelyt säilyvät erillisinä.

Päätoimittajan viisi poikkeuskysymystä ovat avoinna: #74-kuvattomuus suhteessa nollavirheporttiin;70 vuoden teosraja suhteessa kaupalliseen FOP:iin; vanha luonnonpysty; alkuperäisen painotuotteen kuvateksti; saman paikan kuvat nostossa ja kohdejutussa. Niistä ei sovellettu hyväksymätöntä poikkeusta.

Vain tämä tarkistus.md uutena Monrovian kansioon. Kuuden lähtötiedoston hashit verrataan loppuvarmennus.json:ssa; sisalto.json tavuntarkasti ennallaan. Ei hyväksyttyä kaupungin/erän valmiutta, F-porttia, Sisältökirjurin hyväksyntää, pelikytkentää tai julkaisua.

## Korjattu — erillinen E1-toteutus 12.10.2026

Uusi korjaaja ei osallistunut Monrovian A/C/D-vaiheisiin. R1:n kaksi ruokatekstikenttää ja R2:n K3-teksti korvattiin **kokonaisina arvoina sanatarkasti** D-raportin JSON-lainauksista ja sen `korvaukset.json`:sta. Vain **3 JSON-arvoa** muuttui: K4:n nostoteksti 518→518 merkkiä, O4:n opasteksti 359→359 ja K3:n nostoteksti 498→502. Libanon-maanjohdos on libanonilais-muodossa molemmissa ruokakentissä. R2:n epävarma väite samojen oikeustalon asiakirjojen siirtämisestä museoon poistui; oikeustalon ja museon asiakirjat rinnastetaan yleisinä eri käyttöinä ilman toteen näyttämätöntä aineistoketjua.

Kaikki muu JSON säilyi: samat 14 kuvatiedostoa ja kuvateksti-/tekijärivit, karttapisteet ja sääluvut/lähde/kausi. B:n valinta-/provenance-/metadataraportit ja D:n dokumenttitodisteet säilyivät muuttumattomina. Uusia kuvia tai lähderooleja ei lisätty; tunnetut kahdeksan kuvapuutetta K2/K3/H3/H4/pysty/N1/N2/O3 jätettiin näkyviin. O2/O5:n sallittu kuvattomuus ei tee O3:sta hyväksyttyä poikkeusta.

Paikallinen ja omistajan hyväksymän lähdesovituksen kautta ajettu alkuperäinen --verkko-tarkistus antoivat kumpikin **8 virhettä, 0 varoitusta, 14 kuvaa**, exit 1. Tulos täsmää D:n kuvavirheisiin sanatarkasti:

```text
VIRHE monrovia: kansi nosto 2: tiedosto puuttuu
VIRHE monrovia: kansi nosto 3: tiedosto puuttuu
VIRHE monrovia: matkailijalle.kuva: tiedosto puuttuu
VIRHE monrovia: oppaassa yli kaksi kuvatonta jaksoa
VIRHE monrovia: teemasivu historia nosto 3: tiedosto puuttuu
VIRHE monrovia: teemasivu historia nosto 4: tiedosto puuttuu
VIRHE monrovia: juttu Kansallismuseon vanha oikeustalo: kuvia 1–3
VIRHE monrovia: juttu Providence Baptist Church, historiallinen pyhäkkö: kuvia 1–3
== monrovia: 8 virhettä, 0 varoitusta, 14 kuvaa
YHTEENSÄ 1 kaupunkia: 8 virhettä, 0 varoitusta
```

Uusia tekstin, skeeman, wikiotsikon, lisenssin, tekijäkrediitin tai leveyden konevirheitä ei tullut. Toinen E-kierros ei ollut tarpeen. Muuttumattoman tyokalu.mjs:n SHA-256 `78c2150e6510ffcd51f05a44898316122f6d98100abd6dc51666de706fd1467c`. Ennen/jälkeen-kopiot, kolmen arvon sanatarkkuus- ja säilymistodisteet sekä molempien tarkistimien kokonaiset lokit `valiaikainen/monrovia-E/`. Sisältö SHA-256 `dee363cbca5a4cc7208c00e86338b155366a8dd02cb46241a521ce65a3ae2d31`. Korjaukset tehty, mutta kaupunki ja C/E/F pysyvät keskeneräisinä kuvapuutteiden vuoksi. Ei uusia agentteja, Git-operaatioita, valmismerkintää, pelikytkentää tai julkaisua.
