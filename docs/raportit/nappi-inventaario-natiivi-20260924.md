# Nappi-inventaario: web vs. natiivi (24.9.2026)

Fablen tilaus (Raamattu: TÄYSI TOIMINTOPARITEETTI) — jokainen webin nappi/
toiminto riveinä: web / natiivi / tila. Web-lähde: tuotanto
matkakirja.app + `js/ui.js` (ja `js/main.js`, `js/lehti.js`, `js/sahke.js`,
`js/pollo.js`, `js/maalehti.js`, `js/linssit/*.js`) — koottu koneellisella
haulla 24.9.2026. Natiivi-sarake perustuu tämän session ja aiempien
pariteettikierrosten (`pariteetti-natiivi-20260924.md`, rivit 1-41)
laitetestaukseen; rivit joita ei ole testattu tänään on merkitty EI
TARKISTETTU sen sijaan että arvattaisiin.

Tila-sarakkeen arvot: **SAMA** (todennettu vastaava), **ERI** (toimii,
mutta eroaa), **PUUTTUU** (web-toiminto ei löydy natiivista),
**EI TARKISTETTU** (ei testattu tässä kierroksessa).

**PÄIVITYS (Raamattu 9ebc5784c, "WEB ON MALLI, MITATTUNA", omistaja
24.9.2026 klo 15.5x, sitova):** uusi sarake "Mitattu webistä
(px/zoomikynnys)" lisätty jälkikäteen. Lähes kaikki tämän kierroksen
SAMA-merkinnät ovat SILMÄMÄÄRÄISIÄ rakennevertailuja, EIVÄT mitattuja
web–natiivi-kuvapareja säännön vaatimalla tavalla. Yksi rivi
(maalehden kansi, osio 6) mitattiin jälkikäteen pikseleinä ja paljasti
aiemmin huomaamattoman palstoituseron. Jatkossa jokainen näkymä on
mitattava (tools/pariteetti-web-kuva.mjs / pariteetti-web-lehti.mjs)
ENNEN hyväksyntää — muistista tai rakennekuvasta arvaaminen ei riitä.

## 1. Etusivu / portti

| Web-nappi/toiminto | Natiivi | Tila | Mitattu webistä (px/zoomikynnys) |
|---|---|---|---|
| "Aloita seikkailu" (tuore tallennus) | Sama nappi, sama teksti | SAMA | EI (rakennevertailu, ei pikselimitattu) |
| "Jatka matkaa" / "Uusi matka" (olemassa oleva tallennus) | Molemmat napit olemassa | SAMA | EI (rakennevertailu, ei pikselimitattu) |
| Äänipainike ("Laita äänet päälle") | Sama, `mk-aloitus__aloita`-tyyppinen nappi | SAMA | EI (rakennevertailu, ei pikselimitattu) |
| "Valitse aloituskaupunki" + kaupunkivalinta pallolta | Natiivissa "Uusi matka" vie suoraan Lontoo-zoomiin ja kaupunkivalintaan pallolta (NATIIVIN ALOITUSKAAVA, ei web-tyylistä erillistä painike-askelta) | ERI (tarkoituksellinen, oma kaava) | EI (rakennevertailu, ei pikselimitattu) |
| "Oppiminen on hauskaa" -linkki (periaatteet-dialogi) | Näkyy tekstinä portilla, ei testattu avautuuko dialogi | EI TARKISTETTU | EI (rakennevertailu, ei pikselimitattu) |
| Avausteksti (INTRO_TEXT + intro-puhe) alapalkissa Lontoo-pallon päällä | Vahvistettu PASS tänään: kartta näkyy taustalla, teksti alapalkissa, EI erillistä ruutua ilman karttaa | SAMA | EI (rakennevertailu, ei pikselimitattu) |

## 2. Kartta

| Web-nappi/toiminto | Natiivi | Tila | Mitattu webistä (px/zoomikynnys) |
|---|---|---|---|
| "Liiku" (monitoimi-nappi, avaa kulkutapaliuskan) | Sama, testattu tänään (läpinäkyvä/aktiivinen molemmat, B7-1) | SAMA | EI (rakennevertailu, ei pikselimitattu) |
| Kulkutapaliuska: Liftaus/Bussilla/Laivalla/Lentäen | Sama liuska alarivillä (peukalo/bussi/laiva/lento), testattu tänään | SAMA | EI (rakennevertailu, ei pikselimitattu) |
| "Heitä noppa" | Sama, testattu tänään ("Noppa 4" -kortti nopanheiton jälkeen) | SAMA | EI (rakennevertailu, ei pikselimitattu) |
| Nopanheiton jälkeiset kohteet: web = renkaat kartalla, ei listaa | **KORJATTU JA VAHVISTETTU (testi/b9-ui ae76378, iPhone 17 + iPad).** Listakortti poistettu, natiivi näyttää nyt PELKÄT renkaat tavoitettavissa olevilla kaupungeilla + pöllön valintavihjeen ("Napauta korostettua kohdetta kartalla, niin matka jatkuu.") — sama kuin web. | SAMA (korjattu) | **KYLLÄ** (kuvapari `noppa-kartalle-web-20260924/natiivi-valintavihje-iphone.png` vs. web-kuva samasta kansiosta) |
| "Tutki" (tutkinta-nappi) | Testattu (`peli:tutki`, build 10, iPhone): avaa kohtaamiskortin ("Ateena · kohtaaminen · yritys 1/2", muotokuva, "Aloita peli" -nappi) | SAMA | EI (rakennevertailu, ei pikselimitattu) |
| Maiden lehdet -nappi (maailmanradio-nappi vastine) | Karttaselite/linssit-valikossa vastaava toiminto olemassa | EI TARKISTETTU tarkka vastaavuus | EI (rakennevertailu, ei pikselimitattu) |
| Top-bar: logo/lähteet-nappi | Ei vastaavaa löydetty natiivin yläpalkista tässä kierroksessa | EI TARKISTETTU | EI (rakennevertailu, ei pikselimitattu) |
| Top-bar: raha/päivä-pilleri (avaa laukun) | Sama pilleri "300£ 1/80", avaa laukun | SAMA | EI (rakennevertailu, ei pikselimitattu) |
| Top-bar: ☰-hampurilainen | Sama, mutta natiivissa AVAA LINSSIT-listan (ei suoraan asetuksia) — build 8:ssa listan yläosaan lisätty kaksi pikarivistöä (Kertoja/Musiikki/Äänimaisema + Uusi peli/Muut/Kehittäjä) | SAMA (rakenne), parannettu tänään | EI (rakennevertailu, ei pikselimitattu) |
| Faktakortti: kaiutin-vaimennus | Ei testattu erikseen tässä kierroksessa | EI TARKISTETTU | EI (rakennevertailu, ei pikselimitattu) |

## 3. Laukku (bag/inventory)

| Web-nappi/toiminto | Natiivi | Tila | Mitattu webistä (px/zoomikynnys) |
|---|---|---|---|
| Laukku avautuu raha-pilleristä | Sama, testattu (rivi 20/32 pariteetti-doc, PASS tilaerolla selitettynä); **uudelleenvahvistettu oikealla kosketuksella** (iPhone 18 Pro, build 10) ja **mitattu** web-kuvaparilla (`openPassport()` vs. rahapilleri-napautus) — sama MATKA/Sijainti/Kukkaro/Untuvikko-rakenne, sama VARUSTEET-ruudukko (glasses+5 linssikuvaketta samassa järjestyksessä). Kuvapari `web-laukku-iphone.jpg` / vastaava natiivikuva. | SAMA | **KYLLÄ** (kuvapari) |
| "Matkan tilastot" -laajennin | Sama tieto näkyy (Sijainti/Kukkaro/Untuvikko + tilastot); **oikealla kosketuksella laajennettuna näkyy myös Avatut aarteet/Käydyt kaupungit/maat, Aarnin luettelo ja Julisteet-rivi** | SAMA | EI (rakennevertailu, ei pikselimitattu) |
| Julisterivi (poster-galleria) | **OIKEALLA KOSKETUKSELLA vahvistettu** (iPhone 18 Pro, build 10, master f02376b): laukku → Matkan tilastot → "JULISTEET 114/114 »" -rivi napautettuna avaa saman ruudukon (Moskova/Lontoo/Pariisi/Rooma/Wien/Ateena/...) | SAMA | EI (rakennevertailu, ei pikselimitattu) |
| Aarnin luettelo -infonappi | Näkyy laukun "Matkan tilastot" -laajennettuna näkymänä ("AARNIN LUETTELO ⓘ Kateissa 7") oikealla kosketuksella — itse (i)-kuvakkeen napautus ei osunut tällä kierroksella (pieni kohde) | EI TARKISTETTU (info-popupin sisältö), mutta rivi näkyy oikein | EI (rakennevertailu, ei pikselimitattu) |
| Varusteet (linssi-ruudukko) | Sama ruudukko, harmaat/ei-vielä-löydetyt linssit näkyvät erikseen (rivi 32) | SAMA | EI (rakennevertailu, ei pikselimitattu) |
| "Aktivoi"/"Ota pois" (linssin aktivointi) | Ei testattu erikseen tässä kierroksessa | EI TARKISTETTU | EI (rakennevertailu, ei pikselimitattu) |

## 4. ☰-valikko

| Web-nappi/toiminto | Natiivi | Tila | Mitattu webistä (px/zoomikynnys) |
|---|---|---|---|
| ÄÄNET: Kertoja/Musiikki/Äänimaisema | Sama kolmirivinen lohko, nyt pikarivistönä listan yläosassa (build 8) | SAMA | EI (rakennevertailu, ei pikselimitattu) |
| KARTTA: "Pieni liike" | Sama, todennettu PÄÄLLÄ-tilassa (rivi 18) | SAMA | EI (rakennevertailu, ei pikselimitattu) |
| KARTTA: kehittäjän rivit (Kallistus, Syötekoe, Kerrokset, jne.) | Natiivissa vastaava KOKEET-osio kehittäjätilassa; rivi 18 huomautti tästä jo aiemmin — kehittäjärivit eivät kuulu pelaajan valikkoon kummallakaan puolella | SAMA (molemmat kehittäjärajattuja) | EI (rakennevertailu, ei pikselimitattu) |
| "uusi peli" (vahvistusdialogi + palautus porttiin) | Sama, PASS tänään (SHA 24c9194 ja f6de924): vahvistuskysely, palautus aloitusporttiin | SAMA | EI (rakennevertailu, ei pikselimitattu) |
| "ehdota sisältöä" / palautelomake | Ei testattu erikseen | EI TARKISTETTU | EI (rakennevertailu, ei pikselimitattu) |
| RETKIKUNTA-osio (sähke-toiminnot) | Natiivissa oma "Sähke"-toiminto (ks. osio 10), löytyi ☰-valikosta aiemmalla kierroksella | SAMA rakenteeltaan | EI (rakennevertailu, ei pikselimitattu) |
| "Mitä uutta" / versiotieto | **KORJAUS**: alun perin merkitty SAMA, mutta web-lähteestä (js/main.js) löytyy vain APP_VERSION-numero + "Peli päivittyi" -minimi-ilmoitus (`ui mitauutta paivittyi`), EI täyttä muutoslokia. Natiivi näyttää build 10:llä kokonaisen, moniriviesen muutoslokin (sisältö 66, v1.0.0-rivit selityksineen per build) — natiivi on selvästi rikkaampi kuin web. | ERI (natiivi rikkaampi) | EI (rakennevertailu, ei pikselimitattu) |
| Kehittäjän hammasratasvalikko | Natiivissa vastaava KOKEET-valikko, molemmat kehittäjärajattuja — ei App Storeen | SAMA (molemmat piilossa tuotannossa) | EI (rakennevertailu, ei pikselimitattu) |

## 5. Asetukset

| Web-nappi/toiminto | Natiivi | Tila | Mitattu webistä (px/zoomikynnys) |
|---|---|---|---|
| Äänenvoimakkuusliu'ut (Äänitehosteet/Pulun ääni/Lukija/Taustamusiikki/Taustaäänet) | Kaikki samat 5 liukua samassa järjestyksessä, samat oletusarvot (rivi 14, PASS) | SAMA | EI (rakennevertailu, ei pikselimitattu) |
| Lukijaäänen persoona/nopeus-dialogi (vain kehittäjätila webissä) | Ei testattu, kehittäjärajattu molemmilla | EI TARKISTETTU | EI (rakennevertailu, ei pikselimitattu) |
| Offline-lataukset | **Web: ei löytynyt vastaavaa UI-nappia** (vain automaattinen laattaesilataus, ei käyttäjän valitsemaa latauspainiketta). Natiivissa OMA "LATAA OFFLINE-KÄYTTÖÖN" -lohko asetusten alla (mantereittain, koot Gt/Mt) — Raamatussa nimetty hyväksytty natiivin lisäominaisuus. | HYVÄKSYTTY POIKKEAMA | EI (rakennevertailu, ei pikselimitattu) |

## 6. Lehdet (kaupunki- ja maalehdet)

| Web-nappi/toiminto | Natiivi | Tila | Mitattu webistä (px/zoomikynnys) |
|---|---|---|---|
| Edellinen/Seuraava-sivunappi | Sama, testattu useaan otteeseen tänään (esim. Ateena/Marseille aihesivut) | SAMA | EI (rakennevertailu, ei pikselimitattu) |
| Sisällys-nappi (alapalkki + ylä-hampurilainen pitkällä sivulla) | Sisällys korjattu ja vahvistettu (rivi 8, PASS): korttilista kuvineen, samat otsikot | SAMA | EI (rakennevertailu, ei pikselimitattu) |
| Sisällys-paneelin sulkeminen / "Takaisin" | **OIKEALLA KOSKETUKSELLA vahvistettu** (iPhone 18 Pro, build 10): "← Palaa kartalle" -nappi sulkee sisällyksen JA koko lehden, palaa suoraan kartalle. X-kuvake ylhäällä ei reagoinut napautukseen tällä kierroksella (pieni kohde, ei toistettu). **MITATTU**: web-kuvapari (`avaaSisallysvalikko()`) näyttää saman korttilistan (Etusivu/Ateena pintaa syvemmältä/Arki ja tavat/Historia/Historian hetki/Menovinkit) ja saman "← Palaa kartalle" -napin. Kuvapari `web-sisallys-iphone.jpg` / vastaava natiivikuva. | SAMA ("Palaa kartalle"), EI TARKISTETTU (X-kuvake) | **KYLLÄ** (kuvapari) |
| Maalehti-liite-linkki (kaupunkilehden viimeiseltä sivulta) | Ei testattu erikseen tänään, `ui maalehti <ISO>` -komento toimii suoraan | EI TARKISTETTU polku lehdestä | EI (rakennevertailu, ei pikselimitattu) |
| Maalehden kansi: PERUSTIEDOT-lohko + kartta, iPad-leveys | **MITATTU, VAHVISTETTU ERO.** Web (834×1194, `maalehti-kansi-834x1194.png`): kaksipalstainen, PERUSTIEDOT vasemmalla ≈601 px (36 %), kartta oikealla ≈685 px (41 %), rinnakkain. Natiivi (iPad, `9-maalehti.png`): yksipalstainen pino, kartta koko leveydeltä ≈1571 px (94 %) ylhäällä, PERUSTIEDOT koko leveydeltä alla — sama asettelu kuin iPhonella, ei mukaudu iPadin leveyteen. | ERI (mitattu) | **KYLLÄ** (px mitattu molemmista, ks. pariteetti-natiivi-20260924.md rivi 9) |
| Saapumisdialogi: "Lue lisää" / "Lue lisää maasta" | Ei testattu erikseen | EI TARKISTETTU | EI (rakennevertailu, ei pikselimitattu) |
| Saapumisdialogi: kuvakaruselli (edellinen/seuraava) | Testattu epäsuorasti (lehden kansikuva-galleria "1/7" toimii, nuolinapit näkyvät) | SAMA | EI (rakennevertailu, ei pikselimitattu) |
| Kulttuurivisan vastausvaihtoehdot saapumisessa | Testattu yleistä kysymyskorttia (rivi 16, PASS rakenteeltaan) | SAMA (yleinen kysymyskortti) | EI (rakennevertailu, ei pikselimitattu) |
| Uutiset: "Käännä"-nappi + uutisrivit | Ei testattu erikseen | EI TARKISTETTU | EI (rakennevertailu, ei pikselimitattu) |
| Aihesivun otsikkotypografia (iso/keskitetty/kaksirivinen, ☰+🔊 vieressä) | **KORJATTU JA VAHVISTETTU tänään** (oli ERI, nyt SAMA f6de924:llä) | SAMA (korjattu) | EI (rakennevertailu, ei pikselimitattu) |
| Aihesivun kuvateksti (vain lähderivi, ei ylimääräistä lausetta) | **KORJATTU** (Natiivi-UI, build 8 -jonossa): sama kenttä kuin webissä | SAMA (korjattu, ei vielä julkaistu) | EI (rakennevertailu, ei pikselimitattu) |

## 7. Linssit

| Web-nappi/toiminto | Natiivi | Tila | Mitattu webistä (px/zoomikynnys) |
|---|---|---|---|
| Linssivalitsin (lista + kuvaukset) | Sama, testattu tänään sekä iPhonella että iPadilla | SAMA | EI (rakennevertailu, ei pikselimitattu) |
| Topografialinssi | **KORJAUS: rivi 30:n aiempi PASS oli väärä** — kuvassa LINSSIT-lista oli yhä auki, itse linssi ei koskaan avautunut iPadilla (kosketus ei rekisteröitynyt). EI vielä uudelleentestattu oikealla kosketuksella. | EI TARKISTETTU (peruttu) | EI (linssi ei ollut edes auki) |
| Isoisän linssi 1873 | Listassa näkyy, ei testattu sisältöä tänään | EI TARKISTETTU | EI (rakennevertailu, ei pikselimitattu) |
| Vesistölinssi | Sama jokiviivat, testattu useaan otteeseen (rivi 31, PASS + tämän kierroksen web-korjaus vahvistettu) | SAMA | EI (rakennevertailu, ei pikselimitattu) |
| Keksintölinssi (karuselli) | Sama pallo+vuosi+Tauko-rakenne (rivi 11/40); web ja natiivi pysähtyvät eri vuoteen (odotettua) | SAMA (rakenne) | EI (rakennevertailu, ei pikselimitattu) |
| Ihmisen matka -linssi | **OTSIKKOBUGI KORJATTU JA VAHVISTETTU OIKEALLA KOSKETUKSELLA (build 8, f6de924).** Aiempi epäily: KEKSINNÖT-otsikko jäisi näkyviin linssin vaihdossa. Testattu aidosti: avattiin Keksintölinssi (peli käynnissä), avattiin linssivalitsin PÄÄLLE (ei komennolla), napautettiin "Ihmisen matka" -riviä, sitten "Käynnistä". Otsikko vaihtui oikein "IHMISEN MATKA / 300 000 v. sitten" — EI jäänyt lukemaan "KEKSINNÖT EUROOPASSA". | SAMA (korjattu, vahvistettu kosketuksella) | EI (rakennevertailu natiivin sisäinen, ei web-kuvaparia tälle täsmävaiheelle) |
| Astronautin kamera | Ei testattu tässä kierroksessa | EI TARKISTETTU | EI (rakennevertailu, ei pikselimitattu) |
| Maailmanradio (viritin) | Sama retro-dial, sama asemaverkosto, todennettu AITO VU-mittari (epäsymmetrinen neula) tänään | SAMA | EI (rakennevertailu, ei pikselimitattu) |
| Vertailulinssi | **MITATTU**: web (`aktivoiLinssi('vertailu')`) ja natiivi (`ui linssi vertailu`) näyttävät molemmat samat valintachipit (esim. Suomi) + "Vertaa"-napin samassa kohdassa ruutua. Kuvapari `web-linssi-vertailu-iphone.jpg` / `natiivi-linssi-vertailu-iphone.jpg`. | SAMA | **KYLLÄ** (kuvapari samasta tilasta) |
| Maatiedot-linssi | **PÄIVITYS**: testattu uudelleen (`ui linssi maa`, build 10) — nyt näkyy sisältöä (🇮🇹 ITALIA + "Lue lehti ›"), EI enää tyhjä kuten aiemmin rivillä 41 raportoitiin. Näkymä oli kuitenkin sekoittunut auki jääneen vertailulinssin kanssa (Italia/Japani-chipit näkyivät samalla), joten en vahvista puhdasta ulkoasua — Linssisepän kannattaa tarkistaa oikealla kosketuksella. | EI TARKISTETTU (puhdas näkymä), mutta EI ENÄÄ TYHJÄ | EI (rakennevertailu, ei pikselimitattu) |
| Linssin selite (per-linssi kuvauskortti) | Sama, uusittu ja vahvistettu (rivi 12/12b) | SAMA | EI (rakennevertailu, ei pikselimitattu) |

## 8. Kysymys/kortit

| Web-nappi/toiminto | Natiivi | Tila | Mitattu webistä (px/zoomikynnys) |
|---|---|---|---|
| Vastausvaihtoehdot A-D | Sama pyöristetty rivilista kirjainmerkein (rivi 16, PASS) | SAMA | EI (rakennevertailu, ei pikselimitattu) |
| "50:50" | Sama nappi näkyy kortilla | SAMA | EI (rakennevertailu, ei pikselimitattu) |
| "Vihje" | Sama nappi näkyy kortilla | SAMA | EI (rakennevertailu, ei pikselimitattu) |
| "Jatka" | Testattu epäsuorasti kysymysvirrassa | SAMA | EI (rakennevertailu, ei pikselimitattu) |
| "Aloita peli" | Testattu (`peli:aloita`, build 10): vie tervehdyssivulta suoraan kysymykseen (A-D, tiimalasi-ajastin, 50:50-nappi) | SAMA | EI (rakennevertailu, ei pikselimitattu) |
| Kohtaamisen muotokuva → suurennos | Muotokuva näkyy pienenä (kysymyskortin vasen yläkulma), suurennosta ei testattu — ei tarkkaa napautuskoordinaattia tälle kierrokselle | EI TARKISTETTU (suurennos) | EI (rakennevertailu, ei pikselimitattu) |
| "Lisää" (nostokortti/skandaali/eläintäky/syvennys) | Sama nappi, testattu (rivit 25-28, PASS) | SAMA | EI (rakennevertailu, ei pikselimitattu) |
| Kaupunkikortti (lippu+maa, kuva, kuvateksti, leipäteksti, Lisää) | Sama rakenne, testattu tänään (Lyon/Ateena) | SAMA | EI (rakennevertailu, ei pikselimitattu) |

## 9. Noppa / siirtolista

| Web-nappi/toiminto | Natiivi | Tila | Mitattu webistä (px/zoomikynnys) |
|---|---|---|---|
| "Heitä noppa" | Sama, ks. osio 2 | SAMA | EI (rakennevertailu, ei pikselimitattu) |
| Kohdelista nopanheiton jälkeen | **Ks. osio 2 — natiivilla ylimääräinen listakortti** | ERI | EI (rakennevertailu, ei pikselimitattu) |
| Voittoruudun oma "Uusi peli" (ei kysy vahvistusta) | Ei testattu erikseen tässä kierroksessa | EI TARKISTETTU | EI (rakennevertailu, ei pikselimitattu) |

## 10. Sähke (retkikunta)

| Web-nappi/toiminto | Natiivi | Tila | Mitattu webistä (px/zoomikynnys) |
|---|---|---|---|
| Nimimerkin arvonta / valinta | Näkyy ☰-valikon RETKIKUNTA-osiossa, ei täyttä toimintotestiä | SAMA (näkyvyys), EI TARKISTETTU (toiminta) | EI (rakennevertailu, ei pikselimitattu) |
| "Perusta retkikunta" | Sama nappi näkyy | SAMA (näkyvyys) | EI (rakennevertailu, ei pikselimitattu) |
| Liittymiskoodi + "Liity retkikuntaan" | Sama kenttä+nappi näkyy | SAMA (näkyvyys) | EI (rakennevertailu, ei pikselimitattu) |
| "Eroa retkikunnasta" | Ei testattu (ei aktiivista retkikuntaa) | EI TARKISTETTU | EI (rakennevertailu, ei pikselimitattu) |
| Sähkeen lähetys (mallipohjat) | Testattu erillinen sähketehtävä-kortti (rivi 21c, PASS, sanatarkka) | SAMA | EI (rakennevertailu, ei pikselimitattu) |
| Kaveriapu-kysymys (A/B/C/D) | Ei testattu erikseen | EI TARKISTETTU | EI (rakennevertailu, ei pikselimitattu) |
| Palautelomake (teksti+sähköposti) | Ei testattu | EI TARKISTETTU | EI (rakennevertailu, ei pikselimitattu) |

## 11. Pöllö/Livia-chat

| Web-nappi/toiminto | Natiivi | Tila | Mitattu webistä (px/zoomikynnys) |
|---|---|---|---|
| Pöllö/pulu-kupla (avaa/sulkee chatin) | Sama, testattu aiemmalla kierroksella (rivi 29, PASS rakenteeltaan) | SAMA | EI (rakennevertailu, ei pikselimitattu) |
| Tekstikenttä + lähetä | Sama nappirivi näkyy (näppäimistö-ikoni) | SAMA (näkyvyys) | EI (rakennevertailu, ei pikselimitattu) |
| Kaiutin-kytkin | Sama nappirivi näkyy | SAMA (näkyvyys) | EI (rakennevertailu, ei pikselimitattu) |
| Mikki-kytkin | Sama nappirivi näkyy | SAMA (näkyvyys) | EI (rakennevertailu, ei pikselimitattu) |
| Ehdotuskysymykset (chip-rivit) | **OIKEALLA KOSKETUKSELLA vahvistettu** (iPhone 18 Pro, build 10): kaksi ehdotuskysymystä näkyy kupla-alueen yläosassa ennen ensimmäistä viestiä (esim. "Kuka Heinrich Schliemann oikeasti oli..."), lisäksi "Näytä puhekuplat" / "Ehdota sisältöä" -napit chatin yläreunassa | SAMA | EI (rakennevertailu, ei pikselimitattu) |

## 12. Radio (kaupunki-/maalehden mediarivi)

| Web-nappi/toiminto | Natiivi | Tila | Mitattu webistä (px/zoomikynnys) |
|---|---|---|---|
| Live-radioasema-nappi (esim. "TRT Radyo 1") | Sama, testattu maalehdellä (rivi 36, PASS, eri asema mutta LIVE-nappi samassa paikassa) | SAMA | EI (rakennevertailu, ei pikselimitattu) |
| Vanha äänite -nappi ("Ennen"-sarake) | Ei testattu erikseen tässä kierroksessa | EI TARKISTETTU | EI (rakennevertailu, ei pikselimitattu) |

## Ei webissä, odottaa omistajaa

Raamatun kaava (EI WEBISSÄ → KYSY): natiivin ominaisuudet, joita web ei
tarjoa, listataan tässä eikä toteuteta ilman omistajan lupaa.

- ~~Nopanheiton jälkeinen listakortti~~ — **PÄÄTETTY (omistaja 24.9.
  klo 15.3x): lista pois, kohde valitaan kartalta kuten webissä**
  (Pelikoodari 4d3fe7a, korjaus build 9:ään). Ei enää odota.
- ~~Offline-lataukset -lohko asetuksissa~~ — **HYVÄKSYTTY POIKKEAMA**
  (Raamatussa nimetty natiivin oma lisäominaisuus). Ei enää odota.
- Peninkulmalinssi ja huipennusnäkymä — hyväksytty jo 23.9. (Raamattu).
- Maapallon tila -linssi — hyväksytty 24.9. (Raamattu), ensimmäinen
  vain-natiivi-ominaisuus.

## Yhteenveto

Yli puolet tarkistetuista riveistä SAMA. Kaikki aiemmin avoimet erot on
nyt ratkaistu: nopanheiton listakortti KORJAUS BUILD 9:ään (omistaja
päätti 24.9. klo 15.3x, ei enää odota), offline-lataukset HYVÄKSYTTY
POIKKEAMA, aloituskaava natiivin omalla tavalla toteutettuna
(tarkoituksellinen, ei korjaustarvetta), maalehden palstoitus (osio 6)
VAHVISTETTU ERO reititetty Natiivi-UI:lle. Suuri osa osioista 3, 5
(lukija-dialogi), 6 (osa), 7 (osa), 8 (osa), 10 (toiminta), 11
(toiminta) ja 12 (osa) jäi EI TARKISTETTU -tilaan ajanpuutteen vuoksi
tällä kierroksella — ei tiedossa olevia bugeja, mutta ei myöskään
positiivista vahvistusta. Jatketaan build 8 -rivien (5/13/23) jälkeen,
mitat mukaan (WEB ON MALLI).

**PÄIVITYS (Laitetestaaja, build 10, 24.9. klo 19.4x):** seitsemän
EI TARKISTETTU -riviä käyty läpi dokumentoiduilla `ui`/`peli`-komennoilla
(ei koordinaattiarvauksia): Tutki-nappi, Aloita peli, Vertailulinssi,
Julisterivi ja Mitä uutta kaikki SAMA/toimivat. Maatiedot-linssi EI ENÄÄ
TYHJÄ (aiempi rivi 41 -havainto vanhentunut) — Linssisepälle tarkistus.
Kohtaamisen muotokuvan suurennos jäi auki (ei napautuskoordinaattia).
Astro-linssi EI Laitetestaajan alue (Linssisepän oma). Loput ~24 riviä
(laukun osa, lukija-dialogi, sisällyspaneelin sulku, saapumisdialogin
napit, sähkeen toiminta, pöllön ehdotukset, ym.) yhä EI TARKISTETTU —
osa vaatii oikean kosketuksen (ui napauta -koordinaatit epäluotettavia
tässä kierroksessa), osa jäi ajanpuutteen vuoksi.

**PÄIVITYS 2 (Laitetestaaja, build 10 f02376b, 24.9. klo 19.4x–20.0x,
oikea kosketus iPhone 18 Pro / 1572C658):** vielä 5 EI TARKISTETTU -riviä
vahvistettu OIKEALLA KOSKETUKSELLA (ei komentoriviä): Julisterivi,
Sisällys-paneelin "Palaa kartalle" -sulkeminen, Ehdotuskysymykset
(chip-rivit), Laukku raha-pilleristä ja Matkan tilastot -laajennin.
Aarnin luettelon (i)-kuvake ja Sisällyksen X-kuvake jäivät osumatta
(liian pieniä kohteita tälle kierrokselle). **Havainto**: iPhone 18 Pro
-simulaattori (1572C658) oli hetken myös toisen, ei-näkyvän session
("Matkakirja-3d-selvittaja", ilmeisesti eri Mac-käyttäjätunnus)
käytössä samaan aikaan (uninstall/install-silmukka satelliittikuvia
varten) — sovellus kaatui kerran kesken lennon. Ei enää ristiriitaa
tarkistushetkellä, mutta jaettua laitetta kannattaa käyttää varoen.
Web-kuvapareja ei ehditty ottaa näille riveille — mitat puuttuvat yhä
WEB ON MALLI -vaatimuksen mukaisesti.

**PÄIVITYS 3 (Laitetestaaja, 24.9. klo 20.1x–20.3x):** web-kuvaparit
otettu kolmelle riville (Vertailulinssi, Laukku+Varusteet, Sisällys+
"Palaa kartalle") — kaikki MITATTU/SAMA. Tutki-napin ja Julisterivin
web-vastineita ei saatu auki suoralla funktiokutsulla eikä synteettisellä
klikkauksella tässä kierroksessa (`avaaKohtaamistesti`/`avaaJulisteGalleria`
eivät reagoineet odotetusti) — natiivipuoli on silti vahvistettu
komennolla/kosketuksella, vain web-mitta puuttuu näiltä kahdelta.
