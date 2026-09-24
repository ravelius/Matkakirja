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

## 1. Etusivu / portti

| Web-nappi/toiminto | Natiivi | Tila |
|---|---|---|
| "Aloita seikkailu" (tuore tallennus) | Sama nappi, sama teksti | SAMA |
| "Jatka matkaa" / "Uusi matka" (olemassa oleva tallennus) | Molemmat napit olemassa | SAMA |
| Äänipainike ("Laita äänet päälle") | Sama, `mk-aloitus__aloita`-tyyppinen nappi | SAMA |
| "Valitse aloituskaupunki" + kaupunkivalinta pallolta | Natiivissa "Uusi matka" vie suoraan Lontoo-zoomiin ja kaupunkivalintaan pallolta (NATIIVIN ALOITUSKAAVA, ei web-tyylistä erillistä painike-askelta) | ERI (tarkoituksellinen, oma kaava) |
| "Oppiminen on hauskaa" -linkki (periaatteet-dialogi) | Näkyy tekstinä portilla, ei testattu avautuuko dialogi | EI TARKISTETTU |
| Avausteksti (INTRO_TEXT + intro-puhe) alapalkissa Lontoo-pallon päällä | Vahvistettu PASS tänään: kartta näkyy taustalla, teksti alapalkissa, EI erillistä ruutua ilman karttaa | SAMA |

## 2. Kartta

| Web-nappi/toiminto | Natiivi | Tila |
|---|---|---|
| "Liiku" (monitoimi-nappi, avaa kulkutapaliuskan) | Sama, testattu tänään (läpinäkyvä/aktiivinen molemmat, B7-1) | SAMA |
| Kulkutapaliuska: Liftaus/Bussilla/Laivalla/Lentäen | Sama liuska alarivillä (peukalo/bussi/laiva/lento), testattu tänään | SAMA |
| "Heitä noppa" | Sama, testattu tänään ("Noppa 4" -kortti nopanheiton jälkeen) | SAMA |
| Nopanheiton jälkeiset kohteet: web = renkaat kartalla, ei listaa | **Natiivi näyttää LISTAKORTIN renkaiden LISÄKSI** ("valitse kohde listasta TAI kartalta") — todennettu tänään, vahvistettu Pelikoodarin kanssa aidoksi eroksi | ERI |
| "Tutki" (tutkinta-nappi) | Ei testattu tässä kierroksessa | EI TARKISTETTU |
| Maiden lehdet -nappi (maailmanradio-nappi vastine) | Karttaselite/linssit-valikossa vastaava toiminto olemassa | EI TARKISTETTU tarkka vastaavuus |
| Top-bar: logo/lähteet-nappi | Ei vastaavaa löydetty natiivin yläpalkista tässä kierroksessa | EI TARKISTETTU |
| Top-bar: raha/päivä-pilleri (avaa laukun) | Sama pilleri "300£ 1/80", avaa laukun | SAMA |
| Top-bar: ☰-hampurilainen | Sama, mutta natiivissa AVAA LINSSIT-listan (ei suoraan asetuksia) — build 8:ssa listan yläosaan lisätty kaksi pikarivistöä (Kertoja/Musiikki/Äänimaisema + Uusi peli/Muut/Kehittäjä) | SAMA (rakenne), parannettu tänään |
| Faktakortti: kaiutin-vaimennus | Ei testattu erikseen tässä kierroksessa | EI TARKISTETTU |

## 3. Laukku (bag/inventory)

| Web-nappi/toiminto | Natiivi | Tila |
|---|---|---|
| Laukku avautuu raha-pilleristä | Sama, testattu (rivi 20/32 pariteetti-doc, PASS tilaerolla selitettynä) | SAMA |
| "Matkan tilastot" -laajennin | Sama tieto näkyy (Sijainti/Kukkaro/Untuvikko + tilastot) | SAMA |
| Julisterivi (poster-galleria) | Ei testattu erikseen | EI TARKISTETTU |
| Aarnin luettelo -infonappi | Ei testattu erikseen | EI TARKISTETTU |
| Varusteet (linssi-ruudukko) | Sama ruudukko, harmaat/ei-vielä-löydetyt linssit näkyvät erikseen (rivi 32) | SAMA |
| "Aktivoi"/"Ota pois" (linssin aktivointi) | Ei testattu erikseen tässä kierroksessa | EI TARKISTETTU |

## 4. ☰-valikko

| Web-nappi/toiminto | Natiivi | Tila |
|---|---|---|
| ÄÄNET: Kertoja/Musiikki/Äänimaisema | Sama kolmirivinen lohko, nyt pikarivistönä listan yläosassa (build 8) | SAMA |
| KARTTA: "Pieni liike" | Sama, todennettu PÄÄLLÄ-tilassa (rivi 18) | SAMA |
| KARTTA: kehittäjän rivit (Kallistus, Syötekoe, Kerrokset, jne.) | Natiivissa vastaava KOKEET-osio kehittäjätilassa; rivi 18 huomautti tästä jo aiemmin — kehittäjärivit eivät kuulu pelaajan valikkoon kummallakaan puolella | SAMA (molemmat kehittäjärajattuja) |
| "uusi peli" (vahvistusdialogi + palautus porttiin) | Sama, PASS tänään (SHA 24c9194 ja f6de924): vahvistuskysely, palautus aloitusporttiin | SAMA |
| "ehdota sisältöä" / palautelomake | Ei testattu erikseen | EI TARKISTETTU |
| RETKIKUNTA-osio (sähke-toiminnot) | Natiivissa oma "Sähke"-toiminto (ks. osio 10), löytyi ☰-valikosta aiemmalla kierroksella | SAMA rakenteeltaan |
| "Mitä uutta" / versiotieto | Ei testattu erikseen | EI TARKISTETTU |
| Kehittäjän hammasratasvalikko | Natiivissa vastaava KOKEET-valikko, molemmat kehittäjärajattuja — ei App Storeen | SAMA (molemmat piilossa tuotannossa) |

## 5. Asetukset

| Web-nappi/toiminto | Natiivi | Tila |
|---|---|---|
| Äänenvoimakkuusliu'ut (Äänitehosteet/Pulun ääni/Lukija/Taustamusiikki/Taustaäänet) | Kaikki samat 5 liukua samassa järjestyksessä, samat oletusarvot (rivi 14, PASS) | SAMA |
| Lukijaäänen persoona/nopeus-dialogi (vain kehittäjätila webissä) | Ei testattu, kehittäjärajattu molemmilla | EI TARKISTETTU |
| Offline-lataukset | **Web: ei löytynyt vastaavaa UI-nappia** (vain automaattinen laattaesilataus, ei käyttäjän valitsemaa latauspainiketta). Natiivissa OMA "LATAA OFFLINE-KÄYTTÖÖN" -lohko asetusten alla (mantereittain, koot Gt/Mt) — tämä on natiivin OMA lisäominaisuus, ei web-paritettava | PUUTTUU WEBISTÄ (natiivilla on enemmän) |

## 6. Lehdet (kaupunki- ja maalehdet)

| Web-nappi/toiminto | Natiivi | Tila |
|---|---|---|
| Edellinen/Seuraava-sivunappi | Sama, testattu useaan otteeseen tänään (esim. Ateena/Marseille aihesivut) | SAMA |
| Sisällys-nappi (alapalkki + ylä-hampurilainen pitkällä sivulla) | Sisällys korjattu ja vahvistettu (rivi 8, PASS): korttilista kuvineen, samat otsikot | SAMA |
| Sisällys-paneelin sulkeminen / "Takaisin" | Ei testattu erikseen tänään | EI TARKISTETTU |
| Maalehti-liite-linkki (kaupunkilehden viimeiseltä sivulta) | Ei testattu erikseen tänään, `ui maalehti <ISO>` -komento toimii suoraan | EI TARKISTETTU polku lehdestä |
| Saapumisdialogi: "Lue lisää" / "Lue lisää maasta" | Ei testattu erikseen | EI TARKISTETTU |
| Saapumisdialogi: kuvakaruselli (edellinen/seuraava) | Testattu epäsuorasti (lehden kansikuva-galleria "1/7" toimii, nuolinapit näkyvät) | SAMA |
| Kulttuurivisan vastausvaihtoehdot saapumisessa | Testattu yleistä kysymyskorttia (rivi 16, PASS rakenteeltaan) | SAMA (yleinen kysymyskortti) |
| Uutiset: "Käännä"-nappi + uutisrivit | Ei testattu erikseen | EI TARKISTETTU |
| Aihesivun otsikkotypografia (iso/keskitetty/kaksirivinen, ☰+🔊 vieressä) | **KORJATTU JA VAHVISTETTU tänään** (oli ERI, nyt SAMA f6de924:llä) | SAMA (korjattu) |
| Aihesivun kuvateksti (vain lähderivi, ei ylimääräistä lausetta) | **KORJATTU** (Natiivi-UI, build 8 -jonossa): sama kenttä kuin webissä | SAMA (korjattu, ei vielä julkaistu) |

## 7. Linssit

| Web-nappi/toiminto | Natiivi | Tila |
|---|---|---|
| Linssivalitsin (lista + kuvaukset) | Sama, testattu tänään sekä iPhonella että iPadilla | SAMA |
| Topografialinssi | Sama reliefiväritys, testattu (rivi 30, PASS) | SAMA |
| Isoisän linssi 1873 | Listassa näkyy, ei testattu sisältöä tänään | EI TARKISTETTU |
| Vesistölinssi | Sama jokiviivat, testattu useaan otteeseen (rivi 31, PASS + tämän kierroksen web-korjaus vahvistettu) | SAMA |
| Keksintölinssi (karuselli) | Sama pallo+vuosi+Tauko-rakenne (rivi 11/40); web ja natiivi pysähtyvät eri vuoteen (odotettua) | SAMA (rakenne) |
| Ihmisen matka -linssi | **ERI VAIHE testattu molemmilla puolilla** — web näyttää nyt aloituskortin, natiivissa aiemmin todettu otsikkobugi (KEKSINNÖT-otsikko jää näkyviin linssin vaihdossa); Pelikoodari lisää `linssi-ihmisen-matka-kaynnissa`-tilan vertailua varten | EI TARKISTETTU LOPULLISESTI (odottaa uutta web-vaihetta) |
| Astronautin kamera | Ei testattu tässä kierroksessa | EI TARKISTETTU |
| Maailmanradio (viritin) | Sama retro-dial, sama asemaverkosto, todennettu AITO VU-mittari (epäsymmetrinen neula) tänään | SAMA |
| Vertailulinssi | Ei testattu tässä kierroksessa | EI TARKISTETTU |
| Maatiedot-linssi | Aiemmin molemmat tyhjiä (rivi 41, työkaluvika epäilty) — ei uusittu | EI TARKISTETTU |
| Linssin selite (per-linssi kuvauskortti) | Sama, uusittu ja vahvistettu (rivi 12/12b) | SAMA |

## 8. Kysymys/kortit

| Web-nappi/toiminto | Natiivi | Tila |
|---|---|---|
| Vastausvaihtoehdot A-D | Sama pyöristetty rivilista kirjainmerkein (rivi 16, PASS) | SAMA |
| "50:50" | Sama nappi näkyy kortilla | SAMA |
| "Vihje" | Sama nappi näkyy kortilla | SAMA |
| "Jatka" | Testattu epäsuorasti kysymysvirrassa | SAMA |
| "Aloita peli" | Ei testattu erikseen | EI TARKISTETTU |
| Kohtaamisen muotokuva → suurennos | Ei testattu erikseen | EI TARKISTETTU |
| "Lisää" (nostokortti/skandaali/eläintäky/syvennys) | Sama nappi, testattu (rivit 25-28, PASS) | SAMA |
| Kaupunkikortti (lippu+maa, kuva, kuvateksti, leipäteksti, Lisää) | Sama rakenne, testattu tänään (Lyon/Ateena) | SAMA |

## 9. Noppa / siirtolista

| Web-nappi/toiminto | Natiivi | Tila |
|---|---|---|
| "Heitä noppa" | Sama, ks. osio 2 | SAMA |
| Kohdelista nopanheiton jälkeen | **Ks. osio 2 — natiivilla ylimääräinen listakortti** | ERI |
| Voittoruudun oma "Uusi peli" (ei kysy vahvistusta) | Ei testattu erikseen tässä kierroksessa | EI TARKISTETTU |

## 10. Sähke (retkikunta)

| Web-nappi/toiminto | Natiivi | Tila |
|---|---|---|
| Nimimerkin arvonta / valinta | Näkyy ☰-valikon RETKIKUNTA-osiossa, ei täyttä toimintotestiä | SAMA (näkyvyys), EI TARKISTETTU (toiminta) |
| "Perusta retkikunta" | Sama nappi näkyy | SAMA (näkyvyys) |
| Liittymiskoodi + "Liity retkikuntaan" | Sama kenttä+nappi näkyy | SAMA (näkyvyys) |
| "Eroa retkikunnasta" | Ei testattu (ei aktiivista retkikuntaa) | EI TARKISTETTU |
| Sähkeen lähetys (mallipohjat) | Testattu erillinen sähketehtävä-kortti (rivi 21c, PASS, sanatarkka) | SAMA |
| Kaveriapu-kysymys (A/B/C/D) | Ei testattu erikseen | EI TARKISTETTU |
| Palautelomake (teksti+sähköposti) | Ei testattu | EI TARKISTETTU |

## 11. Pöllö/Livia-chat

| Web-nappi/toiminto | Natiivi | Tila |
|---|---|---|
| Pöllö/pulu-kupla (avaa/sulkee chatin) | Sama, testattu aiemmalla kierroksella (rivi 29, PASS rakenteeltaan) | SAMA |
| Tekstikenttä + lähetä | Sama nappirivi näkyy (näppäimistö-ikoni) | SAMA (näkyvyys) |
| Kaiutin-kytkin | Sama nappirivi näkyy | SAMA (näkyvyys) |
| Mikki-kytkin | Sama nappirivi näkyy | SAMA (näkyvyys) |
| Ehdotuskysymykset (chip-rivit) | Ei testattu erikseen | EI TARKISTETTU |

## 12. Radio (kaupunki-/maalehden mediarivi)

| Web-nappi/toiminto | Natiivi | Tila |
|---|---|---|
| Live-radioasema-nappi (esim. "TRT Radyo 1") | Sama, testattu maalehdellä (rivi 36, PASS, eri asema mutta LIVE-nappi samassa paikassa) | SAMA |
| Vanha äänite -nappi ("Ennen"-sarake) | Ei testattu erikseen tässä kierroksessa | EI TARKISTETTU |

## Ei webissä, odottaa omistajaa

Raamatun kaava (EI WEBISSÄ → KYSY): natiivin ominaisuudet, joita web ei
tarjoa, listataan tässä eikä toteuteta ilman omistajan lupaa.

- **Nopanheiton jälkeinen listakortti** (osiot 2 ja 9) — natiivi näyttää
  ylimääräisen listan renkaiden lisäksi, web vain renkaat. Omistaja
  päättää: poistetaanko natiivista vai pidetäänkö parannuksena.
- **Offline-lataukset -lohko asetuksissa** (osio 5) — kokonaan natiivin
  oma ominaisuus, webissä ei vastaavaa käyttäjän valitsemaa latausta.
- Peninkulmalinssi ja huipennusnäkymä — hyväksytty jo 23.9. (Raamattu).
- Maapallon tila -linssi — hyväksytty 24.9. (Raamattu), ensimmäinen
  vain-natiivi-ominaisuus.

## Yhteenveto

Yli puolet tarkistetuista riveistä SAMA. Kaksi vahvistettua ERI-riviä:
nopanheiton listakortti (osiot 2/9, odottaa omistajan päätöstä) ja
aloituskaava natiivin omalla tavalla toteutettuna (osio 1, tarkoituksellinen
ero, ei korjaustarvetta). Yksi PUUTTUU WEBISTÄ (offline-lataukset,
natiivin oma lisä). Suuri osa osioista 3, 5 (lukija-dialogi), 6 (osa),
7 (osa), 8 (osa), 10 (toiminta), 11 (toiminta) ja 12 (osa) jäi EI
TARKISTETTU -tilaan ajanpuutteen vuoksi tällä kierroksella — ei
tiedossa olevia bugeja, mutta ei myöskään positiivista vahvistusta.
