# Natiivin ajantasaisuustarkastus Raamattua vasten (23.9.2026)

*Tarkastaja: Opus-agentti (Fablen tilaus, loki 23.9. klo 20.13). Lähteet: js/tyohuone-raamattu.js,
docs/raamattu-loki/paatokset-2026-09.md (23.9. kohdat), siirtosuunnitelma (PR #2948, haara
siirtoseppa-natiivi-suunnitelma), natiivi-ui-erot-webiin-20260923.md (haara natiivi-ui-tyo-20260923),
natiivi-linssit-inventaario-20260923.md, proto-git `master` 760f9d8 + haarat, /Users/Shared/Claude/natiivi-peli
608aa47 ja koepaketti /Users/Shared/Claude/sisalto-koe/v14 (skeema 1.12). Koodista luettiin otsikkokommentit ja
tunnisteet, ei koko koodia. Testejä ei ajettu.*

Polut ovat proto-gitin kansion `Assets/Matkakirja/` alla, ellei toisin mainita.

**Huom.:** Omistaja kumosi 23.9. klo 20.2x kohdan "radiot vain webissä" (loki: "RADIO MYÖS NATIIVIIN"),
mutta Raamatun NATIIVI-kohdassa lukee yhä vanha muoto. Tässä raportissa uusi linjaus voittaa.

## A) Vanhentunutta natiivissa

| # | Ominaisuus | Missä | Mikä Raamatun kohta kumoaa | Suositus | Omistaja |
|---|---|---|---|---|---|
| A1 | **Rosvon kaksintaistelu, pelilogiikka** | `Peli/Kaksintaistelu.cs` (324 r.), `Sopimukset.cs` (`Vaihe.Kaksintaistelu`), `Pelitila.cs` (`KaksintaisteluOdottaa`, `AvoinKaksintaistelu`, tallennuskenttä), `Kysely.cs` ja `Kaupat.cs` (koukut), `Matka.cs` (duelArmed), `Scripts/Peli/KysymysApu.cs` (`KysymysLaji.Kaksintaistelu`, "Kohtaa ryöstäjä"), `PeliKomennot.cs` ("rosvo"), Peli-testit (kaksintaistelujalki.json, KaksintaisteluTestit.cs, silmukka-rosvo.txt). **Yhä masterissa.** Korjaus on haarassa `pelikoodari/rosvo-pois` (2a6982f "wip", ei mergetty). UI-puoli on jo poistettu (f077068 masterissa). | Aarteet ja eteneminen: rosvolaatat POISTETTU. Poistetut ideat (25.8.). NATIIVI-kohta (esimerkki kuolleesta polusta). | Poista. Vie `rosvo-pois` valmiiksi ja mergeä. | Pelikoodari (merge: Natiiviseppä) |
| A2 | **Laattatyyppi `robber`** | `Peli/Laatat.cs` (`Laattatyypit.Ryostaja`), `UI/LaattaIkoni.cs` (hattu ja naamio), `UI/KysymysEsimerkki.cs` ("Laatan alla odotti ryöstäjä!"), `KysymysApu.cs` ("Ryöstäjä"). Paketissa `laatat.json` types.robber (määrä 0). | Kuten A1: laatan alta löytyy aina aarre. | Poista tyyppi, ikoni ja tekstit. Poista myös paketin tyyppi. | Pelikoodari, Natiivi-UI, Siirtoseppä |
| A3 | **Moninpelivoitto ja tekoälypelaaja** | `Peli/Voitto.cs` (web checkWin: ensimmäinen pääaarre ja paluu aloituskaupunkiin, "vain moninpelissä"), `Pelitila.Voittaja`, `Pelaaja.Botti` (web isBot/ai.js), `Kysely`/`Matka` botti-haarat. Paketissa `saannot.BOT_SKILL` ja `moduulit/js/ai.json`. | Pelin kulku: "LOPPU: seitsemäs pääaarre", yksinpeli ja vapaa vaellus. Kaanonissa ei ole vastustajaa. Moninpeli on vain sähke ja retkikunta. | Poista Voitto.cs ja Botti. Huipennus on jo `KaikkiAarteetLoytyi` (Natiivi-UI). | Pelikoodari |
| A4 | **WKWebView-lehdet** (käyttökohteet alla) | 1) `Assets/Plugins/iOS/MatkakirjaLehti.mm` (WKWebView-liitännäinen). 2) `Scripts/Peli/LehtiKuori.cs` (ILehti, avaa `matkakirja.app/index.html?lehti=`). 3) `Peli/LehtiOsoite.cs` ja Peli-testit/LehtiOsoiteTestit. 4) `Peli/Sopimukset.cs` `ILehti`. 5) `Editor/LehtiKuoriXcode.cs` (linkittää WebKit.frameworkin). 6) `Editor/Rakennus.cs` (luo LehtiKuori-olion kohtaukseen). 7) `Scripts/Peli/PeliOhjain.cs`: kaupunkilehti avautuu saapuessa `lehti.Avaa`, `LueMaalehti` (kutsujat `UI/Kartuscha.cs` ja `UI/Linssit/MaidenNakyma.cs`), `LehdenTeko`-silta (actionKulttuuri, actionMinitehtava, kirjaaNostotehtava, merkitseAarrepisteOhje, actionPullaVinkki, actionPullaOstos). 8) Syöte-esto: `SyoteLukko.cs` (näkymäpeitto), `Kartta/PalloKierto.cs` (peittokysely), `UI/UiNakymat.cs:153`. 9) Paketissa `web/lehti.json`, `skeema/web-nakyma.schema.json`, manifestin `webNakymat`. 10) Kopio `natiivi-peli/Unity/` (LehtiKuori.cs, MatkakirjaLehti.mm, LehtiKuoriXcode.cs, README-lehti.md). Webissä kuorisivu PR #2942. | NATIIVI-kohta, VAIN AJANTASAISTA (20.1x): "ei WKWebView-lehtiä", lehdet natiivisti UI Toolkitilla paketin datasta. | Poista kohdat 1–6 ja 9–10, kun natiivilehti (B1) toimii. Säilytä `LehdenTeko`-teot suorina kutsuina natiivilehdeltä. Näkymäpeitto yleiseksi (Natiiviseppä teki jo, loki 20.15). | Pelikoodari (kuori pois), Natiivi-UI (uusi lehti), Siirtoseppä (web/lehti.json) |
| A5 | **Rinnakkainen vanha kopio** `/Users/Shared/Claude/natiivi-peli` (608aa47) | Osat B ja C: pelilogiikan varhainen kopio ja WKWebView-kuori. Proto-git on nyt totuus. | NATIIVI-kohta: ei kuorta. Yksi totuus = paketti ja kultaiset jäljet. | Arkistoi tai poista, ettei sitä luulla lähteeksi. | Pelikoodari |
| A6 | **"Tutki kaupunkia" -nappi** | `UI/KaupunkiKortti.cs` (suurennuslasirivi), `UI/Matkavalinta.cs`, `Scripts/Peli/NakymaSopimukset.cs`, `PeliApu.cs` ("Tutki"), `Matka.Tutki`, `PeliKomennot` "tutki" | Pelin kulku: fokusmoodin annostelu korvaa vanhan Tutki-napin. Kaupungit (13.9., P6): ETSI AARRE -NAPPI POISTETTU. Aarteeseen mennään kartan vihreästä pisteestä, ja kysymys on kohtaamiskortissa. | Muuta: nappi pois, tilalle fokuspiste ja kohtaamiskortti (B3). Teko `Matka.Tutki` voi jäädä sisäiseksi. | Natiivi-UI, Pelikoodari |
| A7 | **Kaikki linssit auki oletuksena** | `Linssit/Ydin/Linssirekisteri.cs`: `Saatavilla = _ => true` | Karttalinssit: linssit aukeavat pelin aikana (osa kaupasta, osa matkalla). Tietäjäpisterajat. Loki 21.9.: hiomassa-linssit. | Muuta: kytke omistus (tp-rajat, kauppa, aarrelinssit). Kaikki auki vain kehittäjätilassa. | Pelikoodari, Linssiseppä |
| A8 | **Radio rajattu pois** | `Linssirekisteri.cs` (kommentti ja taulu: radion 1400 tp:n kynnys annettu topografialle), `UI/Kartuscha.cs` ("Ei radiota"), linssi-inventaario ("Natiiviin tulee 7"), siirtosuunnitelma ("radiot pois") | Loki 23.9. klo 20.2x (sitova): RADIO MYÖS NATIIVIIN. Kumoaa kohdan "radiot vain webissä". Karttalinssit/Kaupungit: kartuschan radio-merkki (20.9.). | Muuta: radio takaisin suunnitelmaan (B6). Kynnystaulu Fablen päätettäväksi (C). | Linssiseppä, Natiivi-UI |
| A9 | **Tähti-ikoni ja -nimistö näkyvissä** | `UI/LaattaIkoni.cs` (`star` = viisisakarainen tähti), `UI/Matkalaukku.cs` esimerkkidata (`Tyyppi = "star"`). Tunniste `star`, `STAR_PRIZE` ja `XP_STAR` Laatat.cs:ssä ja Kokemus.cs:ssä. | Aarteet: PÄÄAARRE on entinen tähtimekaniikka. Pääaarteen paljastus on tumma, ja kartalla ei ole "aarremerkkiä, tähteä eikä vinoneliötä" (28.8./8.9.). | Muuta näkyvät kohdat: pääaarteen kuva ja tumma paljastus, ei tähteä. Datatunnisteen `star` voi pitää yhteensopivuuden takia. | Natiivi-UI |
| A10 | **Siirtosuunnitelman vanhentuneet rivit** | `docs/raportit/natiivi-siirtosuunnitelma-20260923.md` (vain haarassa): kaksintaistelu (12 h, vaihe 1), ryöstäjä revealTokenissa, botti ja BOT_SKILL, tapahtumakortti (vaihe 1), radio "pois"/vaihe 3, lehtikuori WKWebView, pöllö aarteena, "vanha tasokartta linssikarttana (harkittava)" | Kuten A1–A4 ja A8. VANHA_KARTTA_KAYTOSSA=false (7.9.). Pöllö on aarre -mekaniikka on TAUOLLA (24.8.). | Päivitä ennen kuin sessiot jakavat töitä sen mukaan. | Siirtoseppä / Fable |
| A11 | **Paketin kuolleet kokoelmat** | `kokoelmat/kaksintaistelut.json` (42), `saannot` DUEL_PRIZE ja BOT_SKILL, `moduulit/js/ai.json` | Kuten A1 ja A3 | Poista natiivin vientilistasta. | Siirtoseppä |

**Tarkistettu, ei löydöksiä:**
- Laattatyyppejä jalokivi, hevosenkenkä ja linssilaatta ei ole natiivissa. Tyyppi `empty` on vain pöllön korvaaman laatan sisäinen merkki, ja pöllö on oletuksena pois (tauolla, kuten kaanonissa).
- Vanhoja hahmoja (Eve, Kjell, Omar, Taras, Aslak, Andreas) ei löytynyt natiivin koodista eikä paketin kohtaamisista. Paketissa nimet esiintyvät vain oikeina henkilöinä tai kuvaajina, esimerkiksi Taras Ševtšenko ja Sof Omar -luola.
- "Afrikan tähteä" ei ole natiivissa. Paketissa esiintyy vain oikea Etelä-Afrikan tähti -timantti skandaaleissa.
- Kulkutavat (liftaus, bussi, laiva, lento), mannerlento, pullavinkki, 50:50 sekä aarteiden arvot (100–250 / 500–800 / 1000 / 2000) vastaavat kaanonia.

## B) Kaanonia, joka puuttuu natiivista

| # | Ominaisuus | Raamatun kohta | Kenelle |
|---|---|---|---|
| B1 | **Kaupunki- ja maalehdet natiivisti** (aiheosastot, nähtävyydet, opas, minitehtävät, kulttuurivisa, menovinkit, Maa numeroina, lukija, reaktiot) paketin datasta (kaupunkilehdet 195, maalehdet 119) | NATIIVI-kohta (20.1x), Maalehdet ja lukeminen | Natiivi-UI (Pelikoodari: teot ja lukija) |
| B2 | **Karttanostojen kortit**: täkynosto, kohdekortti, skandaali, syvennys, eläintäky, historian hetket, Matkakirjan ihmeet, nostokuva ja kaupunkiliuskan kategoriat | Fokusmoodi, Matkakirjan ihmeet, Kaupungit | Natiivi-UI (lokin mukaan seuraava erä) |
| B3 | **Vihreä fokuspiste aarteeseen, kysymys kohtaamiskortissa**, kahden yrityksen varmistus ("vain kaksi yritystä") | Kaupungit (P6, 13.9.), Fokusmoodi (26.8.) | Pelikoodari, Natiivi-UI |
| B4 | **Aarteen paljastus**: paikallisaarre koko ruudun pergamentilla ja faktalla, pääaarre tummana. Huudahdukset. | Aarteet ja eteneminen (28.8., 3.9.) | Natiivi-UI |
| B5 | **Sähketehtävä, retkikunta ja kaveriapu (25 p)**. Logiikassa on vain `actionKaveriapu`. | Fokusmoodi (29.8. SÄHKETEHTÄVÄ), Sanasto | Pelikoodari, Natiivi-UI |
| B6 | **Radio**: kartuschan radio-merkki (valo, viritysääni) ja maailmanradio-linssi. Lisenssit tarkistetaan maksulliseen appiin. | Loki 23.9. 20.2x, Kaupungit (KARTUSCHA 20.9.) | Linssiseppä, Natiivi-UI, Siirtoseppä (lisenssit) |
| B7 | **Musiikki ja äänet**: siirtymämusiikki (3 raitaa), kaupunkimusiikki, linssien omat raidat, äänimaisemat (musiikkikytkimestä riippumatta), UI- ja kysymystehosteet. Natiivin musiikin ja äänimaiseman säätimet eivät nyt tee mitään. | Äänet ja luennat, Karttalinssit (OMA MUSIIKKI) | Pelikoodari |
| B8 | **Linssien hankinta**: tp-rajat pelissä, varustekauppa (~1000 p), hiomassa-linssit ja optikon hyvitys 500 p, linssi ison aarteen kylkiäisenä | Aarteet (VARUSTEET), loki 21.9. (HIOMASSA-LINSSI) | Pelikoodari, Linssiseppä |
| B9 | **Seitsemän peninkulman linssi** (alle 80 päivän palkinto: vapaa siirtyminen, kaikki linssit auki) | Pelin kulku (80 PÄIVÄN PALKINTO) | Pelikoodari, Linssiseppä |
| B10 | **Isoisän linssi 1873** (rajat ja nimet 1873, Horation reitti). Web-erä 1 alkoi 21.9. Natiivin inventaariossa sitä ei ole. | Karttalinssit (21.9.), loki 21.9. | Linssiseppä |
| B11 | **Pulun eläväisyys**: puhe-eleiden ajoitus ja huulisynkka, luentareaktiot, lehtireaktiot, eleäänet | Tarina ja hahmot (Livia), Äänet ja luennat | Natiivi-UI |
| B12 | **Pieni liike kartalla** (pulu lentää, pilven varjo, kellonajan sävy). Natiivissa on vain kytkin. | Loki 21.9. (PIENI LIIKE, Fable hyväksyi) | Natiiviseppä, Natiivi-UI |
| B13 | **Ehdota sisältöä** hampurilaisessa ja chatissa | Lukijoiden ehdotukset | Natiivi-UI |
| B14 | **Passi ja leimat** (linssi-, hyvitys- ja matkaleimat) | Tarina (ASETELMA), loki 21.9. | Natiivi-UI, Pelikoodari |
| B15 | **Matkakirjakortin yksityiskohdat**: isoisän vanha valokuva, isoisän sitaatti kysymyksessä, kortti merellisimpään nurkkaan | Fokusmoodi, Kuvat ja lähteet | Natiivi-UI |
| B16 | **Liikkeen esitys**: liftauksen autokyytianimaatio ja näkyvä noppa (P1, P45) | Kaupungit (LIIKKUMINEN 13.–20.9.) | Natiiviseppä, Natiivi-UI |
| B17 | **Karttaselitteen laskurit ja maakuntien värjäys** pallolla | Kaupungit (KARTTASELITE) | Natiiviseppä |
| B18 | **Linssien lisäosat**: keksintöjen tiedeliite, vertailun maakäyrät, minipulun kysymyskortti (merge-pyynnössä) | Karttalinssit | Linssiseppä, Natiivi-UI |

## C) Epävarmat (Fablen päätös)

| # | Kysymys | Tausta |
|---|---|---|
| C1 | **Tapahtumakortit**: poistetaanko `Peli/Tapahtumat.cs`, muoto `event` (paino 12), `KysymysLaji.Tapahtumakortti`, `PeliOhjain`-kytkentä ja `tapahtumat.json`? | Loki 20.09: "tapahtumakortit jäävät (vain AFRICA.events)". e78892f vei ne pois maailmankartalta (masterissa). Raamatun Tutki kätkö -listassa ei ole tapahtumaa, joten pelaaja ei koskaan näe koodia. Suositus: poista kuolleena polkuna. |
| C2 | **Raamattu on itse jäljessä**: 1) NATIIVI-kohdassa lukee "radiot vain webissä" (kumottu 20.2x). 2) Pelin kulku: "vain Ateena" (beta), vaikka natiivi ja web tarjoavat 14 lähtökaupunkia (`Aloitusnakyma.cs`). 3) Pelin kulku: "jalan/laiva/lento" (uudempi: liftaus, bussi, laiva, lento). 4) Pääaarteen paljastus: Aarnin diplomi (28.8.) vai "tumma, ei diplomi" (28.8. pelitestikierros)? | Natiivi seuraa kohdissa 2–3 uudempaa linjaa. Raamatun linjaus kannattaa päivittää, ettei tarkastus mene ristiin. |
| C3 | **Linssivalitsin kartalla** (`UI/Linssit/Linssivalitsin.cs`) vai "linssit kytketään vain matkalaukusta" (18.8.)? | Webissä on sekä laukun linssikotelo että taikalasinappi. Natiivin laukku on nyt masterissa. |
| C4 | **Kokeet-osio ja ratas-paneeli** (`UI/Paavalikko.cs` KOKEET, `UI/Aanentasot.cs`) näkyvät portittomasti | Loki 20.2x: kehittäjäsäätimet vain kehittäjätilassa (TestFlight, ei App Storessa). Portti puuttuu, tai sitä ei löytynyt. |
| C5 | **Vanhat mannerlaudat paketissa** (`moduulit/js/packs/` africa, asia, europe, istanbul, suomi, maailma, middleeast, northamerica, oceania ja southamerica `.json` sekä niiden `-questions`) | Pelin kulku: "Yksi lauta". Osa sisällöstä voi yhä syöttää maailmankarttaa. Siirtosepän tarkistettava, mitkä natiivi oikeasti lukee. |
| C6 | **`XP_NEW_BOARD`** (`Peli/Kokemus.cs` UusiLauta 50) | Useamman laudan jäänne. Toimii nyt ensimmäisen kaupungin bonuksena. Nimetäänkö uudelleen vai poistetaanko? |
| C7 | **Kaupunkilehti avautuu itsestään saapuessa** (`PeliOhjain`-virta) | Pelin kulku: saapumisesittely alkaa itsestään, muu aukeaa pelaajan valinnoista. Välissä on nyt kaupunkikortti. Varmistettava B1:n yhteydessä. |
| C8 | **`PeliOhjain.AloitusKaupunki = "pariisi"`** varaoletuksena | Kaanonin mukaan tarina alkaa Lontoosta (Heathrow). Aloitusvalinta on masterissa, joten oletus näkyy vain vikatilanteessa. |
| C9 | **Radion kynnys**: palautetaanko radio 1400 tp:n kynnykselle vai jääkö topografia sille? | Seuraus A8:sta ja B6:sta |

## D) Yhteenveto lukuina

| Mittari | Määrä |
|---|---|
| Vanhentunutta natiivissa (A) | 11 kohtaa. Niistä 3 on kuollutta pelilogiikkaa (A1–A3), 1 kuorikielto (A4, 10 käyttökohtaa) ja 7 muuta. |
| WKWebView-käyttökohtia | 10 (proto 8, paketti 1, natiivi-peli-kopio 1) |
| Kaksintaistelun jäänteitä masterissa | noin 12 tiedostoa (koodi 9, testit ja jäljet 4). Poisto on valmisteilla, ei mergetty. |
| Kaanonia puuttuu (B) | 18 kohtaa. Suurimmat: B1 lehdet, B2 nostokortit, B7 äänet, B8 linssien hankinta. |
| Epävarmat (C) | 9 |
| Omistajittain (A+B) | Natiivi-UI 18, Pelikoodari 14, Linssiseppä 7, Natiiviseppä 4, Siirtoseppä 5 (sama kohta voi kuulua usealle) |
| Tarkistettu ilman löydöksiä | poistetut laattatyypit (3), vanhat hahmot (6 nimeä), Afrikan tähti |
