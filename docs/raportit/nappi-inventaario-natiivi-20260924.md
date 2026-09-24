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
| "Tutki" (tutkinta-nappi) | Ei testattu tässä kierroksessa | EI TARKISTETTU | EI (rakennevertailu, ei pikselimitattu) |
| Maiden lehdet -nappi (maailmanradio-nappi vastine) | Karttaselite/linssit-valikossa vastaava toiminto olemassa | EI TARKISTETTU tarkka vastaavuus | EI (rakennevertailu, ei pikselimitattu) |
| Top-bar: logo/lähteet-nappi | Ei vastaavaa löydetty natiivin yläpalkista tässä kierroksessa | EI TARKISTETTU | EI (rakennevertailu, ei pikselimitattu) |
| Top-bar: raha/päivä-pilleri (avaa laukun) | Sama pilleri "300£ 1/80", avaa laukun | SAMA | EI (rakennevertailu, ei pikselimitattu) |
| Top-bar: ☰-hampurilainen | Sama, mutta natiivissa AVAA LINSSIT-listan (ei suoraan asetuksia) — build 8:ssa listan yläosaan lisätty kaksi pikarivistöä (Kertoja/Musiikki/Äänimaisema + Uusi peli/Muut/Kehittäjä) | SAMA (rakenne), parannettu tänään | EI (rakennevertailu, ei pikselimitattu) |
| Faktakortti: kaiutin-vaimennus | Ei testattu erikseen tässä kierroksessa | EI TARKISTETTU | EI (rakennevertailu, ei pikselimitattu) |

## 3. Laukku (bag/inventory)

| Web-nappi/toiminto | Natiivi | Tila | Mitattu webistä (px/zoomikynnys) |
|---|---|---|---|
| Laukku avautuu raha-pilleristä | Sama, testattu (rivi 20/32 pariteetti-doc, PASS tilaerolla selitettynä) | SAMA | EI (rakennevertailu, ei pikselimitattu) |
| "Matkan tilastot" -laajennin | Sama tieto näkyy (Sijainti/Kukkaro/Untuvikko + tilastot) | SAMA | EI (rakennevertailu, ei pikselimitattu) |
| Julisterivi (poster-galleria) | Ei testattu erikseen | EI TARKISTETTU | EI (rakennevertailu, ei pikselimitattu) |
| Aarnin luettelo -infonappi | Ei testattu erikseen | EI TARKISTETTU | EI (rakennevertailu, ei pikselimitattu) |
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
| "Mitä uutta" / versiotieto | Ei testattu erikseen | EI TARKISTETTU | EI (rakennevertailu, ei pikselimitattu) |
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
| Sisällys-paneelin sulkeminen / "Takaisin" | Ei testattu erikseen tänään | EI TARKISTETTU | EI (rakennevertailu, ei pikselimitattu) |
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
| Vertailulinssi | Ei testattu tässä kierroksessa | EI TARKISTETTU | EI (rakennevertailu, ei pikselimitattu) |
| Maatiedot-linssi | Aiemmin molemmat tyhjiä (rivi 41, työkaluvika epäilty) — ei uusittu | EI TARKISTETTU | EI (rakennevertailu, ei pikselimitattu) |
| Linssin selite (per-linssi kuvauskortti) | Sama, uusittu ja vahvistettu (rivi 12/12b) | SAMA | EI (rakennevertailu, ei pikselimitattu) |

## 8. Kysymys/kortit

| Web-nappi/toiminto | Natiivi | Tila | Mitattu webistä (px/zoomikynnys) |
|---|---|---|---|
| Vastausvaihtoehdot A-D | Sama pyöristetty rivilista kirjainmerkein (rivi 16, PASS) | SAMA | EI (rakennevertailu, ei pikselimitattu) |
| "50:50" | Sama nappi näkyy kortilla | SAMA | EI (rakennevertailu, ei pikselimitattu) |
| "Vihje" | Sama nappi näkyy kortilla | SAMA | EI (rakennevertailu, ei pikselimitattu) |
| "Jatka" | Testattu epäsuorasti kysymysvirrassa | SAMA | EI (rakennevertailu, ei pikselimitattu) |
| "Aloita peli" | Ei testattu erikseen | EI TARKISTETTU | EI (rakennevertailu, ei pikselimitattu) |
| Kohtaamisen muotokuva → suurennos | Ei testattu erikseen | EI TARKISTETTU | EI (rakennevertailu, ei pikselimitattu) |
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
| Ehdotuskysymykset (chip-rivit) | Ei testattu erikseen | EI TARKISTETTU | EI (rakennevertailu, ei pikselimitattu) |

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
