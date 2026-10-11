# Pääkaupunkilehden pistokoe: JEREVAN (erä e03, 11.10.2026)

Tarkistaja: Sonnet-agentti. Aineisto (vain luku): `pk-e03/paakaupungit-pilvi/e03/jerevan/` (sisalto.json, faktapohja.md, kuvat.md, tarkistus.md, konteksti.json). Muodon esikuva: paakaupungit-pistokoe-monaco-20261011.md. Aineistoon ei ole tehty korjauksia; kaikki "Korjattu lause" -rivit ovat ehdotuksia. Lehti sijoittuu isoisän vuoteen 1873 mutta kertoo nykyajasta; väitteet on arvioitu nykytiedon mukaan.

Menetelmä: jokainen väite vähintään kahdella itsenäisellä lähteellä (Wikipedia + toinen: Matenadaranin oma sivusto, Lynchin ja Villarin omat kirjat, Armenian kansalliskirjaston Painomuseo, Rough Guides, CEE New Perspectives, armeniadiscovery, evnreport, ARKA, Heidelbergin Heritage-lehti, Google Arts & Culture ym.). Wikipedian kieliversiot ja sen kopiosivut (ATB, kupi, 360cities ym. jotka toistavat Wikipedian sanamuodon) eivät ole itsenäisiä. Wikipedia luettu MediaWiki-rajapinnasta (yksi pyyntö kerrallaan, tunnistautuen). Merkintä "hakutuloksen kautta" = sivua ei saatu haettua suoraan, vaan tieto on hakutuloksen otteesta: Britannica, Iranica, kupi.com ja ARKA antoivat 403, armeniapedia.org ei auennut (DNS), yhm.am:n varmenne oli vanhentunut. Gutenbergin Lynch (1901) ja archive.orgin Villari (1906) luettiin suoraan lähdetekstistä. Commons-tiedot haettu Commonsin rajapinnasta (extmetadata) ja kuvat katsottu 960 px:n esikatselukuvina Read-työkalulla.

Valitut nostot (luvuiltaan ja vuosiltaan tiheimmät): **A** = `.kaupunkilehti[0].nostot[1]` (Erivan ennen kaupunkistatusta), **B** = `.kaupunkilehti[0].nostot[2]` (Tuffikaupunki syntyy), **C** = `.kaupunkilehti[1].nostot[1]` (Aakkoset ja vanhimmat kirjat). Lisäksi kaikki viisi `kysymykset[].fact`.

## 1. Yhteenveto

Väitteet (25 väitettä tai väiteryhmää + 2 sivutarkistusta): **OIKEIN 19, EPÄTARKKA 8, VIRHE 0.** Yhtään numeroa tai vuotta ei löytynyt väärin. Kaikki kahdeksan EPÄTARKKAA ovat yleistyksiä tai yhden lähteen (Wikipedian) varassa olevia väitteitä, joille ei löytynyt toista itsenäistä lähdettä, tai joille löytyi ristiriitainen lähde.

Kuvat (3 tarkistettua): **OIKEIN 1, EPÄTARKKA 1, VIRHE 1.** Tiedostot ovat kaikki Commonsissa, lisenssit ja tekijät täsmäävät lähderivin kanssa. Ei tunnistettavia kasvoja, ei tekstiä, ei väkivaltaa. PD-tekijän kuolemasta > 70 v (Bapst k. 1921). **Vakavin löydös: matkakirjan valokuva (Bapstin vedos "Ararat. 7, Mosquée d'Erivan") esittää todennäköisesti Abbas Mirzan moskeijaa Erivanin linnoituksen alueella, ei Sinistä moskeijaa** (perustelut luvussa 4). Kuvateksti, joka sanoo kuvan olevan Sininen moskeija ja kertoo sen rakennushistoriaa, on siis ristiriidassa kuvan kanssa.

Epätarkat väitteet lyhyesti:
1. **A3** kaupunkistatus "Aleksanteri II:n asetuksella" 1870-luvun lopulla: vain Wikipedia (1.10.1879), toista lähdettä ei löytynyt.
2. **A5** kaupunginosaluettelo (Shahar, Ghantar, Kond, Dzoragyugh, Nork, Shentagh): vain Wikipedia; Wikipedia liittää luettelon 1800-luvun puoliväliin ("At that period"), ja Shentagh/Nork-osuus jäi vahvistamatta.
3. **A7** ensimmäinen kirjapaino ja ensimmäinen teatteri 1870-luvulla: kirjapainon vuosikymmen vahvistui (Armenian tietosanakirja), teatteria ei löytynyt mistään muualta kuin Wikipediasta; Wikipedia ristiriitainen (1874 vs 1876 ja eri perustajat).
4. **B2** "lähteen mukaan ensimmäinen Neuvostoliiton kaupunki, jolle laadittiin yleissuunnitelma": vain Wikipedia, ja väite on kiistanalainen (Shtšusevin Uusi Moskova -suunnitelma 1923 / jo 1920).
5. **B5** viisi rakennusta "vaaleanpunaisesta ja keltaisesta tuffista basalttijalustalle": väri OK, basalttijalusta vain Wikipedia (ja sen kopio); kupi kuvaa värit vaaleanpunainen/valkoinen.
6. **C6/7** "kokoelmassa on kopio Urbatagirkistä ... ja ensimmäinen armeniaksi painettu kartta": kirjat ja vuodet OK, mutta kuuluminen Matenadaranin kokoelmaan on vain Wikipedian väite; Painomuseo (kansalliskirjasto) esittelee molemmat.
7. **Q1** Ararat "näkyy kaupungin jokaisesta osasta" (myös intro ja matkailijalle.kappale): Wikipedia "any area", Rough Guides "so many parts" = yleistys.
8. **Sivutarkistus S2, tiedot[2]** "maailman korkeimmalla olevien miljoonakaupunkien joukossa": vain Wikipedia ("among the fifty highest"), muotoilu löyhä.

**Toistuvan virhetyypin arvio (yksi rivi):** YLEISTYS/SUPERLATIIVI YHDEN LÄHTEEN VARASSA (Wikipedia): "jokaisesta osasta", "ensimmäinen Neuvostoliiton kaupunki", "basalttijalusta", "kokoelmassa on", kaupunginosaluettelo, teatteri 1879 (kuusi kahdeksasta epätarkasta); numerot ja vuodet pitävät (0 virhettä), mutta kuvan tunnistus (Bapstin vedos) meni väärin.

## 2. Väitetaulukko

Polut ovat sisalto.json:n polkuja. Täydet perustelut ja URL:t luvussa 3.

| # | Väite | Polku | Tulos |
|---|---|---|---|
| A1 | 1873 Jerevan Erivanin kuvernementin keskus | .kaupunkilehti[0].nostot[1].teksti | OIKEIN |
| A2 | Kaupunki siirtyi Venäjälle 1827–28 | sama | OIKEIN |
| A3 | Kaupunkistatus 1870-luvun lopulla Aleksanteri II:n asetuksella | sama; .artikkeli.intro; .artikkeli.teksti | EPÄTARKKA |
| A4 | Pieni kaupunki, kapeat kadut ja kujat, yksikerroksiset savitalot tasakatolla ("lähteiden mukaan") | sama | OIKEIN (huom. tasakatto) |
| A5 | Kaupunginosat Shahar, Ghantar, Kond, Dzoragyugh, Nork, Shentagh | sama | EPÄTARKKA |
| A6 | Ottomaanien 1582–83 rakentama Erivanin linnoitus; venäläiset valtasivat lokakuussa 1827 | sama; .artikkeli.teksti | OIKEIN |
| A7 | Ensimmäinen kirjapaino ja ensimmäinen teatteri 1870-luvulla | sama | EPÄTARKKA |
| B1 | Tamanian laati yleissuunnitelman, hyväksyttiin 1924 | .kaupunkilehti[0].nostot[2].teksti; .artikkeli.teksti; .kysymykset[2] | OIKEIN |
| B2 | "Lähteen mukaan Jerevan oli ensimmäinen Neuvostoliiton kaupunki, jolle laadittiin yleissuunnitelma" | .kaupunkilehti[0].nostot[2].teksti | EPÄTARKKA |
| B3 | Uusklassismi + tuffi, säteittäis-kehämäinen suunnitelma vanhan katuverkon päälle | sama; .kysymykset[2].fact | OIKEIN |
| B4 | Suunnitelma johti monien historiallisten rakennusten purkamiseen | sama; .artikkeli.teksti | OIKEIN |
| B5 | Tasavallan aukion viisi päärakennusta vaaleanpunaisesta ja keltaisesta tuffista basalttijalustalle | sama; .kansikuvat[1].lyhyt | EPÄTARKKA |
| B6 | Työt alkoivat 1926 hallituksen talolla | sama; .nostot[2].lyhyt/.selite; .kansikuvat[1].selite | OIKEIN |
| B7 | Viimeinen rakennus, kansallisgalleria, valmistui 1977 | sama; .kansikuvat[1].selite | OIKEIN |
| C1 | Mesrop Mashtots eli 300- ja 400-luvuilla | .kaupunkilehti[1].nostot[1].teksti | OIKEIN |
| C2 | Keksi aakkoset 400-luvun alussa ("lähteen mukaan"), ratkaiseva askel identiteetille | sama | OIKEIN |
| C3 | Lazarian evankeliumi 800-luvulta | sama | OIKEIN |
| C4 | Echmiadzin 900-luvulta, kansi kaiverrettua norsunluuta | sama | OIKEIN (huom. kansi ei alkuperäinen pari) |
| C5 | Vehamor "lähteen mukaan todennäköisesti 600-luvulta", vanhin säilynyt täydellinen | sama | OIKEIN (huom. Matenadaranin kaksi superlatiivia) |
| C6/7 | Kokoelmassa kopio Urbatagirkistä (Venetsia, 1500-luku) ja ensimmäinen armeniaksi painettu kartta (Amsterdam, 1600-luku) | sama | EPÄTARKKA |
| Q1 | Ararat pääsymboli, näkyy "kaupungin jokaisesta osasta" | .kysymykset[0].q ja .fact; .artikkeli.intro; .kaupunkilehti[0].matkailijalle.kappale; .kansikuvat[0].selite/.lyhyt (pääsymboli) | EPÄTARKKA |
| Q2 | Erebuni Arin Berd -kukkulalle 782 eaa.; perustamiskirjoitus löytyi 1950-luvun alussa | .kysymykset[1].fact/.q/.hint | OIKEIN |
| Q3 | Tamanian: uusklassismi + tuffi, säteittäis-kehämäinen, vuoden 1924 suunnitelma | .kysymykset[2] | OIKEIN |
| Q4 | Lynch ja Villari kutsuivat moskeijaa Gök Jamiksi, 'taivaansininen moskeija' | .kysymykset[3] | OIKEIN (huom. Lynchin selitys) |
| Q5 | Erivan venäläisen vallan aikainen virallinen nimi, Jerevaniksi palautettu Neuvostoliiton aikana | .kysymykset[4] | OIKEIN |
| S1 | "Asukkaita noin 1,1 miljoonaa" (laajuus) | .artikkeli.intro; .kaupunkilehti[0].matkailijalle.kappale | OIKEIN (huom. laajuus ja vuosi nimeämättä) |
| S2 | "Noin tuhannen metrin korkeudessa", "maailman korkeimmalla olevien miljoonakaupunkien joukossa" | .tiedot[2] | EPÄTARKKA |

Huomio kysymyksistä: oikeat vastausindeksit ovat 2, 0, 3, 1, 2 (vaihtelevat, ei Monacon kaltaista kaavaa). Kysymys 3 (Tamanian): oikea vastaus ei ole nyt pisin vaihtoehto (Varazdat Arevshatyan on pisin), joten tarkistus.md:n vanha huomio on korjattu.

## 3. Perustelut lähteineen ja korjatut lauseet

### Nosto A: Erivan ennen kaupunkistatusta

**A1 OIKEIN.** Erivanin kuvernementti perustettiin 1849 erityisellä keisarillisella asetuksella, ja Erivan oli sen keskus; evnreport: "on January 1, 1850, the city of Yerevan became its administrative center"; Wikipedia (Yerevan): keskus 1850–1917. Lähteet: https://en.wikipedia.org/wiki/Yerevan ; https://en.wikipedia.org/wiki/Erivan_Governorate ; https://evnreport.com/?p=25527 (haettu suoraan).

**A2 OIKEIN.** Venäläiset valtasivat kaupungin 1.10.1827 (Paskevitš), Turkmentšain sopimus 1828. Lähteet: https://en.wikipedia.org/wiki/Yerevan ; https://www.advantour.com/rus/armenia/yerevan/history.htm ("Взяв Ереван штурмом 1 октября 1827 года"). Wikipedian History of Yerevan antaa luovutuspäiväksi 2.10.1827; teksti sanoo vain "lokakuussa", joten ristiriita ei vaikuta.

**A3 EPÄTARKKA.** "Kaupunkistatuksen se sai vasta 1870-luvun lopulla Aleksanteri II:n asetuksella." Wikipedia (infobox ja History): 1.10.1879 "decree issued by Alexander II". Muu löydetty aineisto (Erivan Governorate, Hovhannes Ghorghanyan, Timeline of Yerevan) on Wikipedian omaa ja sanoo vain, että tsaarin asetuksella perustettiin pormestarin virka 1879 ja ensimmäiset kunnallisvaalit pidettiin syksyllä 1879; kaupunkistatuksen asetusta ei löytynyt itsenäisestä lähteestä (evnreport ei anna vuotta). Vuosikymmen on turvallinen, mutta "asetuksella" on yhden lähteen väite.
- Polut: `.kaupunkilehti[0].nostot[1].teksti`, `.artikkeli.intro`, `.artikkeli.teksti`.
- Korjattu lause (`.kaupunkilehti[0].nostot[1].teksti`): "Wikipedian mukaan kaupunki sai kaupunkistatuksen vasta 1870-luvun lopulla Aleksanteri II:n asetuksella." (tai neutraalisti: "Kaupungin hallinto uudistui 1870-luvun lopulla, kun Erivanille perustettiin pormestarin virka.")

**A4 OIKEIN (huom.).** "Lähteiden mukaan vanha Erivan oli pieni kaupunki, jossa oli kapeita katuja ja kujia sekä yksikerroksisia savitaloja tasakattoineen." Wikipedia (Yerevan: "small town with narrow roads and alleys"; History of Yerevan: "single storey city of clay houses with flat roofs"). Itsenäiset tuet: Britannica 6th ed. 1823 (talot "raised with earth or mud", hakutuloksen kautta) ja 1860-luvun matkailijan kuvaus "narrow, winding streets, and huts built from clay and small stones" (Kond-aineisto, hakutuloksen kautta); Lynch 1901 mainitsee basaarin "narrow streets". Tasakatto jää vain Wikipedian varaan; sanamuoto "lähteiden mukaan" kantaa sen.

**A5 EPÄTARKKA.** Wikipedia (Yerevan, Russian rule): "At that period, Yerevan was a small town with narrow roads and alleys, including the central quarter of Shahar, the Ghantar commercial centre, and the residential neighbourhoods of Kond, Dzoragyugh, Nork and Shentagh." Lause kuuluu Wikipediassa 1800-luvun puolivälin yleiskuvaan (1850–60-luvut), ei erityisesti vuoteen 1873. Itsenäinen tuki löytyi vain osalle: Shahar (vanhin ja suurin) ja Kond (alkuperäisiä mahaleja) sekä Ghantar (basaari Kondin ja Shaharin välissä) ovat Kond-/Districts-aineistossa (Wikipedia-perhe) ja 1860-luvun matkailijan seitsemän kaupunginosan luettelossa ("Shar, Shen, Dzoragyugh, Kond or Tapabash", hakutuloksen kautta). Nork ja Shentagh jäivät vahvistamatta rakennettuina kaupunginosina.
- Polku: `.kaupunkilehti[0].nostot[1].teksti`.
- Korjattu lause: "Wikipedian mukaan 1800-luvun Erivanin keskus oli Shahar ja kauppa-alue Ghantar, ja asuinosia olivat muun muassa Kond ja Dzoragyugh."

**A6 OIKEIN.** Farhad Pasha rakensi linnoituksen 1582–83 (Wikipedia: Erivan Fortress, History of Yerevan; lisäksi tieteellinen artikkeli ja eurasia.travel; Kuran-tietosanakirja antaa vallanoton syyskuun 1583 ja rakennuksen 45 päivässä, hakutuloksen kautta). Venäläisvaltaus lokakuussa 1827: ks. A2. Lähteet: https://en.wikipedia.org/wiki/Erivan_Fortress ; https://eurasia.travel/?p=47312 (hakutuloksen kautta) ; https://kureansiklopedi.com/en/detay/revan (hakutuloksen kautta).

**A7 EPÄTARKKA.** "Ensimmäinen kirjapaino ja ensimmäinen teatteri perustettiin 1870-luvulla." Wikipedia (Yerevan): "In 1874, Zacharia Gevorkian opened Yerevan's first printing house, while the first theatre opened its doors in 1879." Wikipedian toinen artikkeli (Armenian printing) sanoo kuitenkin: "The first Armenian printing house in Yerevan was established in 1876 by Z. Hakobyan" ja Bulletin-artikkeli (Banber, hakutuloksen kautta) vahvistaa 1876. Itsenäinen tuki vuosikymmenelle: Armenian tietosanakirjan kirjapainoartikkeli: "В 1870-ые года открылись типографии в Гандзаке, Ереване, Александраполе" (hakutuloksen kautta). Teatteria ei löytynyt mistään muusta lähteestä; Sundukjanin teatteri on 1921–22. Vuosikymmen on siis OIKEIN kirjapainolle mutta teatteri on yhden lähteen väite.
- Polku: `.kaupunkilehti[0].nostot[1].teksti`. Sivuhuomio: sama ongelma, vielä tarkemmin, on `.kaupunkilehti[1].nostot[2].teksti` ("Ensimmäisen kirjapainon kaupunkiin perusti 1870-luvulla Zacharia Gevorkian"): nimi on yhden lähteen väite ja ristiriidassa Wikipedian omaan toiseen artikkeliin (Hakobyan 1876).
- Korjattu lause: "Muutos alkoi pian: kaupunkiin perustettiin 1870-luvulla ensimmäinen kirjapaino." (ja nostot[2]: "Ensimmäisen kirjapainon kaupunkiin perustettiin 1870-luvulla.")

### Nosto B: Tuffikaupunki syntyy

**B1 OIKEIN.** Tamanian laati yleissuunnitelman, hyväksyttiin 1924. Lähteet: Wikipedia (Yerevan: "approved by Soviet authorities in 1924"); ATB (atb.am, "In 1924 he drew up the first general plan", hakutuloksen kautta); Yerevanin historiamuseo (yhm.am, hyväksyntä 3.4.1924, hakutuloksen kautta, sivun varmenne vanhentunut); Apollo-lehti; evnreport (Tamanian luonnosteli 1924 puoliympyrän muotoisen aukion). Lähteet: https://en.wikipedia.org/wiki/Yerevan ; https://www.atb.am/en/armenia/sights/monuments/AlexanderTamanyan/ ; https://apollo-magazine.com/?p=1033400 (hakutuloksen kautta).

**B2 EPÄTARKKA.** "Lähteen mukaan Jerevan oli ensimmäinen Neuvostoliiton kaupunki, jolle laadittiin yleissuunnitelma." Wikipedia: "The city became the first in the Soviet Union for which a general plan was developed." Yksikään itsenäinen lähde ei sano samaa (ATB: "the first general plan for rebuilding Yerevan", eli Jerevanin ensimmäinen). Lisäksi väite on kiistanalainen: Shtšusevin Uusi Moskova -suunnitelma on 1920-luvun alusta (Zarjadje-puisto: "first master Soviet city plan"; 1923 allekirjoitettu). "Lähteen mukaan" ei riitä, koska lähde ei ole nimetty ja se on yksi.
- Polku: `.kaupunkilehti[0].nostot[2].teksti`.
- Korjattu lause: "Jerevanin yleissuunnitelman laati arkkitehti Alexander Tamanian, ja se hyväksyttiin 1924." (poista "Lähteen mukaan ... ensimmäinen Neuvostoliiton kaupunki"-virke).

**B3 OIKEIN.** Uusklassismi ja tuffi, säteittäis-kehämäinen, vanhan katuverkon päälle. Wikipedia: "radial-circular arrangement that overlaid the existing city"; itsenäisesti Apollo-lehti (jättipuisto ja diagonaalikadut), Armeniapedia (kansallinen aksentti, punertava tuffi; hakutuloksen kautta) ja Yerevanin historiamuseo ("solar rays" -menetelmä). ATB:n sanamuoto on kopio Wikipediasta, joten sitä ei lasketa.

**B4 OIKEIN.** "mikä johti monien historiallisten rakennusten purkamiseen." Wikipedian sanoin ("As a result, many historic buildings were demolished, including churches, mosques, the Erivan Fortress, baths, bazaars and caravanserais"); itsenäinen: CEE New Perspectives 2015, "hundreds of houses, churches, markets and mosques – including the remnants of the 16th century Erivan fortress – vanished as a result of his ambitious project" (hakutuloksen kautta). Syy-seuraus on lähteen oma, ei lisätty. Lähde: https://ceenewperspectives.iir.cz/2015/11/13/disappearing-yerevan/ (hakutuloksen kautta).

**B5 EPÄTARKKA.** "Tasavallan aukion viisi päärakennusta rakennettiin vaaleanpunaisesta ja keltaisesta tuffista basalttijalustalle." Viisi rakennusta ja vaaleanpunainen/keltainen tuffi: Wikipedia ja armeniadiscovery ("mainly built of pink and yellow tuff stones") samoin; kupi.com sanoo "pink and white". Basalttijalusta: vain Wikipedia ("fortified on a basalt-made base") ja sen kopio (360cities-kuvaus, jossa lisäksi "rose and white"); armeniadiscovery ei mainitse basalttia. Yksi lähde.
- Polku: `.kaupunkilehti[0].nostot[2].teksti`.
- Korjattu lause: "Tasavallan aukion viisi päärakennusta rakennettiin vaaleanpunaisesta ja keltaisesta tuffista: työt alkoivat 1926 hallituksen talolla, ja viimeinen rakennus, kansallisgalleria, valmistui 1977."

**B6 OIKEIN.** Rakentaminen alkoi 1926 hallituksen talolla: Wikipedia, armeniadiscovery ("the construction of the square began with the building of the Government House in 1926"), eurasia.travel (1926). Lähde: https://armeniadiscovery.com/place/republic-square (haettu suoraan).

**B7 OIKEIN.** Kansallisgalleria valmistui 1977: Wikipedia ja armeniadiscovery ("completed in 1977"); yksi opas antaa 1975 (poikkeama, hakutuloksen kautta); 1977 on yleisin. Hallituksen talon valmistumisvuotta teksti ei väitä (hyvä: luoteisosa 1926–29, koko rakennus 1941).

### Nosto C: Aakkoset ja vanhimmat kirjat

**C1 OIKEIN.** Mashtots n. 362–440 (Wikipedia: 362 – 17.2.440; uudempi tutkimus 361). Muut: aybuben.com, krapar.org (hakutuloksen kautta). "300- ja 400-luvuilla" pitää.

**C2 OIKEIN.** Aakkoset n. 405 jKr. (Wikipedia: "c. 405 AD, a fundamental step in strengthening Armenian national identity"); itsenäisesti krapar.org ja aybuben.com (hakutuloksen kautta). Teksti hedgaa "lähteen mukaan".

**C3 OIKEIN.** Lazarian evankeliumi 887 (Matenadaran nro 6200): Wikipedia; UPennin kirjastotietue (Künzle 1984, hakutuloksen kautta); Matenadaranin kävijäsivu (hakutuloksen kautta).

**C4 OIKEIN (huom.).** Echmiadzin 989: Matenadaranin oma sivu (kopioitu 989 Bgheno Noravankissa) ja Wikipedia. "Kansi on kaiverrettua norsunluuta" pitää (Wikipedia: 6. vuosisadan, todennäköisesti bysanttilainen kansi), mutta Matenadaran huomauttaa, että kansi ja evankeliumi eivät ole alkuperäinen pari: teksti sidottiin norsunluukanteen myöhemmin (myyty 1173). Teksti ei väitä pariutta, joten ei virhe. Lähde: https://matenadaran.am/en/2024/06/25/the-etchmiadzin-gospel-is-an-ancient-exhibit-of-the-matenadaran-with-a-thousand-year-history/ (hakutuloksen kautta).

**C5 OIKEIN (huom.).** Vehamor: todennäköisesti 600-luvulta, "oldest complete extant Armenian manuscript" (Wikipedia); Matenadaranin oma uutinen 12.12.2023 sanoo saman ("archaeological evidence suggests ... 7th century", hakutuloksen kautta). Huomio: Matenadaranin kävijäsivu kutsuu Lazarian evankeliumia (887) vanhimmaksi täydelliseksi käsikirjoitukseksi, eli lähteet kilpailevat; muotoilu "lähteen mukaan todennäköisesti" on turvallinen. Lähde: https://matenadaran.am/en/2023/12/12/the-oldest-complete-armenian-manuscript-known-as-the-old-gospel-of-banants-is-currently-held-at-matenadaran/ (hakutuloksen kautta).

**C6/7 EPÄTARKKA.** "Kokoelmassa on kopio Urbatagirkistä, ensimmäisestä painetusta armeniankielisestä kirjasta (Venetsia, 1500-luku), sekä ensimmäinen armeniaksi painettu kartta (Amsterdam, 1600-luku)." Vuodet pitävät (Urbatagirk 1512, Wikipedia + Google Arts & Culture / arar.sci.am; kartta 1695, Wikipedia + raremaps + Google Arts). Wikipedia (Matenadaran): "The Matenadaran holds a copy of the Urbatagirk ... The first map printed in Armenian—in Amsterdam in 1695—is also kept at the Matenadaran." Itsenäinen lähde ei vahvista Matenadaran-kuulumista: Armenian kansalliskirjaston Painomuseo (avattu 2017) esittelee Urbatagirkin (1512), ensimmäisen kartan (1695) ja Azdararin; Google Arts liittää kartan Painomuseoon; toinen lähde sijoittaa kopion Etchmiadzinin Vehariin. Matenadaranin kokoelma-luvut vaihtelevat muutenkin (17 000–23 000 käsikirjoitusta) ja Matenadaranin perustamisvuosi 1921 (pohja) vs 1959 (instituutti).
- Polku: `.kaupunkilehti[1].nostot[1].teksti`.
- Korjattu lause: "Armenian ensimmäinen painettu kirja Urbatagirk ilmestyi Venetsiassa 1512 ja ensimmäinen armeniaksi painettu kartta Amsterdamissa 1695." (poista "Kokoelmassa on kopio ... sekä"; tai "Wikipedian mukaan Matenadaranin kokoelmaan kuuluu ...").
- Lähteet: https://www.aepm.eu/member/printing-museum-armenia/ (hakutuloksen kautta) ; https://artsandculture.google.com/story/cwXxZfaxQohNGg (hakutuloksen kautta).

### Kysymysten fact-kentät

**Q1 EPÄTARKKA.** "Ararat on kaupungin pääsymboli, ja se näkyy kaupungin jokaisesta osasta." Wikipedia: "principal symbol of Yerevan is Mount Ararat, which is visible from any area in the capital"; Rough Guides: näkyy "so many parts of Yerevan"; matkaoppaat huomauttavat pilvisen sään peittävän vuoren usein. Pääsymboli ja sinetin kilpi (hint) ovat OIKEIN (Wikipedia, heraldry-wiki/FOTW). "Jokaisesta osasta" on yleistys; kaupunki on amfiteatterimainen, mutta kaikkiin kaupunginosiin näkyvyyttä ei ole todennettu.
- Polut: `.kysymykset[0].q`, `.kysymykset[0].fact`, `.artikkeli.intro` ("näkyy kaupungin jokaisesta osasta"), `.kaupunkilehti[0].matkailijalle.kappale`.
- Korjattu lause (`.kysymykset[0].fact`): "Ararat on kaupungin pääsymboli, ja se näkyy suurelta osalta kaupunkia." Kysymys (`.q`): "Mikä vuori on Jerevanin pääsymboli ja näkyy suuressa osassa kaupunkia?" Intro: "...joka näkyy suuressa osassa kaupunkia."
- Lähteet: https://en.wikipedia.org/wiki/Yerevan ; https://roughguides.com/articles/yerevan-armenia (hakutuloksen kautta).

**Q2 OIKEIN.** Erebuni: Argishti I, 782 eaa., Arin Berd; perustamiskirjoitus löytyi syksyllä 1950 (Hovhannisjanin kaivaukset), jumala Khaldin suuruuden nimissä. Lähteet: Wikipedia (Erebuni Fortress); Armeniapedia; Heidelbergin Heritage-lehti (hakutuloksen kautta). Lähde: https://en.wikipedia.org/wiki/Erebuni_Fortress ; https://journals.ub.uni-heidelberg.de/index.php/heritage/article/view/19797/13591 (hakutuloksen kautta).

**Q3 OIKEIN.** Ks. B1 ja B3. Vihje "Hän suunnitteli myös Tasavallan aukion ja oopperatalon" pitää (Wikipedia, Apollo, armeniadiscovery).

**Q4 OIKEIN (huom.).** Tarkistettu alkuperäisistä: Lynch (Armenia, Travels and Studies, I, 1901, Gutenberg 51492): "the Gök Jami or mosque of heaven"; Villari (Fire and Sword in the Caucasus, 1906, archive.org): "the great mosque called the Gok Djami". Huomio: Lynch selittää nimen "mosque of heaven", "taivaansininen" on Wikipedian käännös (turkin gök = taivas/sininen); molemmat oikein, ja hint "viittaa laatoituksen väriin" on kohtuullinen. Lähteet: https://www.gutenberg.org/ebooks/51492 ; https://archive.org/details/fireandswordinc00villgoog ; https://en.wikipedia.org/wiki/Blue_Mosque,_Yerevan

**Q5 OIKEIN.** Erivan (Эривань) oli virallinen nimi venäläisen vallan aikana, nimi muutettiin takaisin Jerevaniksi 1936: Wikipedia; kupi.com-aikajana ("official name of the city is changed from Erivan to Yerevan" 1936, hakutuloksen kautta). Neuvostoliiton aika pitää.

### Sivutarkistukset

**S1 OIKEIN (huom.).** "Asukkaita noin 1,1 miljoonaa." Laajuus: "Jerevanissa" tarkoittaa kaupunkia (ei metropolialuetta). Wikipedia: 1 086 677 (2022 väestönlaskenta, kaupunki; Wikipedian lukua en löytänyt toisesta lähteestä); ARKA/Armstat: Jerevan 1 142 400 (1.4.2025), 1 127 000 (1.4.2024) ja konteksti.json: 1 147 600 (1.1.2026). Kaikki kuuluvat välille "noin 1,1 miljoonaa". Lauseessa ei kuitenkaan ole vuotta eikä laajuutta nimetty; ehdotus: "Asukkaita on kaupungissa noin 1,1 miljoonaa (2020-luvun lopun arviot)." Matkailijalle.kappaleessa sama.

**S2 EPÄTARKKA (lievä).** Wikipedia: keskikorkeus 990 m (865–1 390 m); WorldAtlas 994 m: "noin tuhat metriä" pitää. "Among the fifty highest cities in the world with over 1 million inhabitants" on vain Wikipedian väite; teksti "lähteen mukaan maailman korkeimmalla olevien miljoonakaupunkien joukossa" on löysempi kuin lähde.
- Polku: `.tiedot[2]`.
- Korjattu lause: "Jerevan sijaitsee keskimäärin noin tuhannen metrin korkeudessa, ja lähteen mukaan se kuuluu maailman viidenkymmenen korkeimmalla sijaitsevan miljoonakaupungin joukkoon."

## 4. Kuvat

Kolme tarkistettua: kansi (ei Wikipedian pääkuva), nosto (B) ja matkakirjan valokuva (ei Wikipedian pääkuva; Gallica/BnF-vedos). Kaikki haettu Commonsin rajapinnasta ja katsottu esikatselusta.

| # | Kohta | Tiedosto | Lisenssi (Commons) | Tekijä (Commons) | Lähderivi | Tulos |
|---|---|---|---|---|---|---|
| K1 | .kaupunkilehti[0].kansikuvat[0] | Yerevan skyline at dawn.jpg | CC BY-SA 3.0 | Սէրուժ Ուրիշեան (Serouj Ourishian), own work, 13.11.2015 | täsmää | **EPÄTARKKA** (kuvateksti) |
| K2 | .kaupunkilehti[0].nostot[2] | Yerevan, Government House, Government of Armenia, Armenia.jpg | CC BY 4.0 | Vyacheslav Argenberg, own work, 18.6.2014 | täsmää | **OIKEIN** (huom.) |
| K3 | .valokuva | Ararat. 7, Mosquée d'Erivan - ... btv1b531014279.jpg | Public domain (PD-old-100-expired, PD France) | Bapst, Germain (1853–1921) ja Molteni, BnF/Gallica; "between 1883 and 1884" | lisenssi ja tekijä täsmäävät (Molteni puuttuu lähderivistä) | **VIRHE** (kuvan tunnistus) |

**K1 EPÄTARKKA.** Tiedosto olemassa, lisenssi (CC BY-SA 3.0) ja tekijä täsmäävät. Kuvassa: aamuhämärän kaupunki, keskellä pyöreä oopperarakennus, taustalla kaksihuippuinen lumipeitteinen Ararat; ei kasvoja, ei tekstiä. Kuvateksti `lyhyt` ("Jerevan seisoo Araratin tasangon reunalla, ja Ararat on kaupungin pääsymboli") on kuvassa sovinnossa (Ararat näkyy), mutta `selite` kertoo "Hrazdan-joen rotkon äärellä" ja "koillisreunalla", joita kuvasta ei näe (ei joenuomaa, ei suuntaa), ja "pääsymboli" on tekstitieto. Sääntö "kuvateksti = kuva" ei täyty selitteessä.
- Polku: `.kaupunkilehti[0].kansikuvat[0].selite`.
- Korjattu lause: "Aamuhämärän Jerevan, jonka yllä kohoavat lumipeitteisen Araratin kaksi huippua; kuvan keskellä on oopperarakennus."
- Lähde: https://commons.wikimedia.org/wiki/File:Yerevan_skyline_at_dawn.jpg

**K2 OIKEIN (huom.).** Tiedosto olemassa, CC BY 4.0, Vyacheslav Argenberg, täsmää. Kuvassa: hallituksen talo kellotorneineen Tasavallan aukiolla, edessä lyhtypylväitä, penkkejä ja jalankulkijoita (pieniä hahmoja, ei tunnistettavia kasvoja), pysäköityjä autoja; ei tekstiä, ei väkivaltaa; kivi on punertavanruskeaa tuffia, joten "tuffirakennus" pitää. Kuvatekstit (`lyhyt`: "Hallituksen talon rakennustyöt aloittivat Tasavallan aukion rakentamisen 1926"; `selite`: "...yksi aukiota kehystävistä viidestä tuffirakennuksesta") ovat tosia mutta kertovat historiaa eivätkä kuvaile kuvaa; ristiriitaa ei ole. Lähteet vuodelle 1926: B6. Hallituksen talon luoteisosa rakennettiin 1926–29 ja koko rakennus valmistui 1941, ja nykykuvassa näkyy koko talo; teksti ei väitä valmistumista, joten ok.
- Valinnainen parannus (`.nostot[2].lyhyt`): "Hallituksen talo kellotorneineen Tasavallan aukiolla; rakennustyöt aloitettiin siitä 1926."
- Lähde: https://commons.wikimedia.org/wiki/File:Yerevan,_Government_House,_Government_of_Armenia,_Armenia.jpg

**K3 VIRHE (todennäköinen tunnistusvirhe).** Tiedosto olemassa, Commonsin lisenssi "Public domain" ja tekijä täsmäävät lähderivin kanssa (Bapst 1853–1921, joten ei < 70 v -riskiä; Molteni 1800-luvun valokuvaaja, ajoitus "between 1883 and 1884"; "1800-luku" pitää, tarkempi vuosi 1883–84). Ei ihmisiä, ei tekstiä, ei väkivaltaa. **Mutta kuva ei todennäköisesti esitä Sinistä moskeijaa:**
1. Commonsin kategoria tälle ja samalle Bapstin vedokselle on "Abbas Mirza Mosque" (ei Blue Mosque, Yerevan).
2. Wikipedian artikkeli Abbas Mirza Mosque, Yerevan käyttää Bapstin vedosta ("Mosquée d'Erevan (Germain Bapst).jpg", kuvateksti "The mosque in late 19th century"); sama kuvasarja ja sama näkymä kuin tässä tiedostossa. Blue Mosque -artikkelin kuvissa Bapstin vedosta ei ole.
3. Kuvan sisältö: laatoitettu kupoli ja kaksikerroksinen kaarikäytävä autiolla, rapistuneella ja kivistä pihalla ilman puita, vesiallasta tai minarettia. Lynch (1901) kuvaa Gök Jamin eläväksi: tulo basaarin kautta, korkea minaretti, lehmuksia ja vesiallas, ihmisiä hartauksissa; linnoituksen moskeijasta (Abbas Mirza Jami) hän sanoo: "The great court is already ruinous". Sarren 1897 kuva Gök Jamista (Commons, PD) näyttää puita ja eläneen pihan.
4. Commonsin kuvaus ristiriitainen (BnF: "Mosquée d'Erivan"; toinen tiedosto: "Blue Mosque, Yerevan"), joten täyttä varmuutta ei ole; Bapst-mission kuva voi olla kumpi tahansa Erivanin moskeijoista.
- Kuvatekstit (`.valokuva.lyhyt` ja `.selite`) väittävät kuvan olevan "nykyinen Sininen moskeija" ja kertovat Sinisen moskeijan rakennushistoriaa (tilaaja, perjantaimoskeija). Jos kuva onkin Abbas Mirzan moskeija (rakennettu uudelleen 1807–17, rapistunut, purettu 1980-luvun lopussa), teksti ja kuva ovat ristiriidassa.
- Lisähuomio `.valokuva.selite`: "Moskeija rakennettiin 1700-luvun loppupuolella" on epätarkka: Sininen moskeija rakennettiin 1765–66 (Wikipedia; Armeniapedia ja AUA Hidden Gems antavat 1765/6, hakutuloksen kautta), eli vuosisadan keskivaiheilla, ei lopulla; samoin `.kaupunkilehti[0].matkailijalle.artikkeli.jaksot[2].kuva.lyhyt` ("1700-luvun lopulla").
- Korjattu lause, vaihtoehto 1 (kuva säilyy, teksti neutraaliksi): `.valokuva.lyhyt`: "Erivanin moskeijan sisäpiha ranskalaisen Germain Bapstin retkikunnan vedoksessa 1883–84." `.valokuva.selite`: "Vedoksessa on laatoitettu kupoli ja kaksikerroksinen kaarikäytävä rapistuneen pihan ympärillä. Vedoksen tekijä on ranskalainen Germain Bapst." Lähderivi: "Bapst, Germain (1853–1921) ja Molteni, Bibliothèque nationale de France / Wikimedia Commons (PD)".
- Vaihtoehto 2: vaihda kuva, jonka tunnistus on varma Gök Jamiksi (esim. Sarren 1897 PD-kuva on liian pieni, 473 × 334 px; etsi isompi Historical images of Blue Mosque, Yerevan -kategoriasta), ja pidä silloin Sinisen moskeijan selite, korjattuna "1700-luvun puolivälin jälkeen (1765–66)".
- Lähteet: https://commons.wikimedia.org/wiki/File:Mosqu%C3%A9e_d%27Erevan_(Germain_Bapst).jpg ; https://en.wikipedia.org/wiki/Abbas_Mirza_Mosque,_Yerevan ; https://en.wikipedia.org/wiki/Blue_Mosque,_Yerevan ; Lynch 1901: https://www.gutenberg.org/ebooks/51492 ; https://commons.wikimedia.org/wiki/File:Eriwan_G%C3%B6k_Jami_(Foto_Sarre_MIK_Pl_9088).jpg

Huomiot kuvista: ei kasvoriskiä (K2:ssa pieniä jalankulkijoita), ei tekstiä, ei väkivaltaa; PD-tekijän kuolinvuosi: Bapst 1921 (> 70 v), Molteni (1800-luvun valokuvaaja, kuolinvuosi tarkistamatta, riskitön).

## 5. Korjausten lista (tiivis)

1. `.kaupunkilehti[0].nostot[1].teksti`: A3 ("Wikipedian mukaan ... asetuksella"), A5 (kaupunginosaluettelo lyhyemmäksi), A7 (poista teatteri, jätä kirjapaino 1870-luvulla).
2. `.kaupunkilehti[0].nostot[2].teksti`: B2 (poista "ensimmäinen Neuvostoliiton kaupunki"), B5 (poista "basalttijalustalle").
3. `.kaupunkilehti[1].nostot[1].teksti`: C6/7 (poista "Kokoelmassa on kopio ... sekä", pidä kirja 1512 ja kartta 1695 ilman Matenadaran-väitettä).
4. `.kysymykset[0].q`, `.kysymykset[0].fact`, `.artikkeli.intro`, `.kaupunkilehti[0].matkailijalle.kappale`: "jokaisesta osasta" -> "suuressa osassa kaupunkia".
5. `.tiedot[2]`: korkeusväite lähteen mukaiseksi (viisikymmentä korkeinta miljoonakaupunkia).
6. `.kaupunkilehti[0].kansikuvat[0].selite`: kuvaa vain näkyvän (K1).
7. `.valokuva.lyhyt` ja `.selite` (ja `.kaupunkilehti[0].matkailijalle.artikkeli.jaksot[2].kuva.lyhyt`): kuvan tunnistus (K3) ja "1700-luvun loppupuolella" -> "1765–66".
8. Sivuhuomio: `.kaupunkilehti[1].nostot[2].teksti` Zacharia Gevorkian + 1870-luku (Wikipedian oma toinen artikkeli sanoo Hakobyan 1876).
