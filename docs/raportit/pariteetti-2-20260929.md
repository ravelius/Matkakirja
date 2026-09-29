# Pariteettikatsaus 2 web vs natiivi, 29.9.2026 (Siirtoseppä)

Päätoimittajan tilaus 29.9. klo 17: katsauksen 1 (#3619, `pariteetti-20260929.md`) "Ei vertailtu" -näkymät BUILD 50:stä
(1.0.50) pysäytyskuvina sekä rivien 1–6 tila nyt. Sama muoto kuin #3619: suunta, vakavuus, korjaava rooli.

## Aineisto ja rajaus

- **Web:** tuotanto v2408 (https://matkakirja.app/), `tools/pariteettikuvat.mjs --kaupunki ateena`, iPhone 393 × 852 ja
  iPad 834 × 1194, 20 kuvaa. Viisi näkymää (kartuscha auki, matkan tiedot, valokuvakortti, avauskortti, lehden kansi
  loppuun) kuvattiin paikallisilla lisänäkymillä, joita ei committoitu.
  - Kuvat: `proto-3d/lokit/siirtoseppa-pariteetti2-20260929/web/`, kuvaparit samassa kansiossa `pari-*.jpg`.
- **Natiivi:** Laitetestaaja, BUILD 50 (fc26b44c), iPhone 1572C658, uusi peli, Ateena, päivä 1, PNG 1206 × 2622.
  - Kuvat: `proto-3d/lokit/laitetestaaja-pariteetti2-20260929/` (n01–n11). iPadia ei kuvattu.
- **Rajaus (Päätoimittaja 29.9.):** matkalaukku / matkan tilastot ja Asetukset-paneeli (äänentasot) jätettiin vertaamatta,
  koska omistaja muuttaa niiden asettelua (Natiivi-UI + Pelikoodari, seuraava juna). Rivit 1–3 kuitattu Natiivi-UI:n
  ilmoituksella ilman uutta tarkistusta.
- **Menetelmä:** Siirtoseppä vertasi jokaisen parin itse (ei vertailuagentteja). Sallitut erot: Raamattu (origin/main)
  ja katsauksen 1 `sallitut.md`.

## Rivien 1–6 tila (katsaus 1)

| # | Näkymä | Tila nyt | Todennus |
|---|---|---|---|
| 1 | Yläpalkin pilleri | **KORJATTU** natiivissa: "rahat / Päivä N, aika" | Natiivi-UI:n ilmoitus Päätoimittajalle, ei uutta tarkistusta; n10 kansiossa |
| 2 | Saapumisen valokuvakortti | **POISTUI:** löydös 138, omistajan linja (pelkkä kuva). Web seuraa nyt samaa (#3622) | web `x-valokuvakortti-*` |
| 3 | Ratas / Äänentasot | **KORJATTU:** äänentasot pillerivalikossa kuten web v2407; webin ratas vain kehittäjätilassa | Natiivi-UI:n ilmoitus; n04 kansiossa |
| 4 | WEB: Ohita kuvatekstin päällä | **KORJATTU** #3622 (kuvatekstipaperi pois, Ohita kuvan alla) | `rivit-4-6-web.jpg` |
| 5 | WEB: kaksi lappua päällekkäin | **KORJATTU** #3622 (`suljeMuutAvoimetLaput`) | Pelikoodarin savuke 15/15 |
| 6 | WEB iPad: Liiku Kreetanmeren päällä | **KORJATTU** #3627 (läpinäkyvä, Pulun reunaan) | `rivit-4-6-web.jpg` (iPad-kartta) |

## Uudet löydökset (ei sallittuja eroja)

| # | Näkymä | Ero | Suunta | Vakavuus | Korjaa | Kuvapari |
|---|---|---|---|---|---|---|
| 7 | Kaupunkilehden kansi | Webin kannessa ensimmäisen kappaleen jälkeen tulevat vielä 2. kappale ("Antiikin Ateenassa kehitettiin demokratia…"), Ennen/Nyt-pari ja LEHDEN OSIOT, ja vasta sitten Poistu/Seuraava. Natiivissa Poistu lehdestä / Seuraava näkyy heti 1. kappaleen alla. **Epävarma:** natiivin rivi voi olla kiinteä alapalkki, jonka alle loput vierivät. Tarkistettava vierittämällä. | natiivi eri? | keski | Natiivi-UI | pari-lehti.jpg (web kansi, web kansi lopussa, natiivi) |
| 8 | Kaupunkilehden herokuva | Webissä ‹ › -nuolet kuvan vasemmassa alakulmassa ja ei kehystä. Natiivissa ei nuolia (laskuri 1/7 on) ja kuvalla vaalea kehys. | natiivi eri | matala | Natiivi-UI | pari-lehti.jpg |
| 9 | Avauskortin nähtävyyskartta | Rakenne vastaa (hero, 2 lausetta, Lue kaupunkilehti, OSM-kartta, Turisti-info). Webin kartalla on lisäksi kolme pientä kultaista tähtimerkkiä (kevyemmät kohteet), natiivista ne puuttuvat. | natiivi puuttuu | matala | Natiivi-UI | pari-avauskortti.jpg |
| 10 | Karttaselite | Webissä selite avaa välilehdet NOSTOT / MAAKUNNAT (nostolajit ja määrät). Natiivissa Nostot-välilehti on pois ja selitenappi on maakuntakartan kytkin ("Napauta maakuntaa kartalla."). Laitetestaajan mukaan omistajan päätös 28.9. (`Karttaselite.MaakuntaKartta = true`), mutta Raamatusta tai lokista ei löytynyt kirjausta. | natiivi eri | keski | **Päätoimittaja** vahvistaa linjan; jos omistajan päätös → web seuraa (Pelikoodari) ja Raamattuun kirjaus | pari-selite.jpg |
| 11 | Aloituskaupungin valinta | Webissä päivänvalon pergamenttipallo ja neljä rengasta (Moskova, Istanbul, Ateena, Kairo). Natiivissa yöpallo Black Marble -valoineen koko Euroopassa, kello "02.30 / PÄIVÄ 1/80" oikeassa yläkulmassa ja vain Ateenan rengas (+6 h). Elävä kartta sallii yövalot vain käydyissä kaupungeissa, ei aloitusnäkymässä. **Epävarma:** muut renkaat voivat ilmestyä Livian esittelyn tahdissa (n07 ja n07b ovat samalta hetkeltä). | natiivi eri | keski | Natiivi-UI (+ Natiiviseppä, pallo) | pari-aloitus.jpg |
| 12 | Linssit-näkymä (sisältö) | Webissä rivi "Ei linssiä" ja otsikko KESKENERÄISET (Vesistö, Vertailu, Maiden tiedot), rivikuvakkeina havainnekuvat. Natiivissa ei "Ei linssiä" -riviä eikä keskeneräisten ryhmää, kuvakkeina viivapiirrokset, ja listalla Isoisän linssi 1873, jota webin kaikki omistettuina -tilassa ei ole. (Ihmisen matka II ja Maapallon vuosi ovat sallittuja.) Paneelin väri (web tumma, natiivi pergamentti) jätetty arvioimatta, koska pillerivalikon asettelu muuttuu. | natiivi eri | keski | Natiivi-UI; Isoisän linssi → Päätoimittaja (EI WEBISSÄ → KYSY) | pari-linssit.jpg |

Vastaavat hyvin: avauskortin rakenne ja mitat, kaupunkilehden ylätunniste, sää- ja Kreikka-liite-rivi, leipäteksti ja
anfangi, kartuschan otsikko, tunnusluvut, kielet ja kategorialinkit, linssin 1. napautus (esikatselu vasemmalle ja
rivi "Aktivoi").

## Tilanne 29.9. illalla (Päätoimittajan jako)

| # | Tila |
|---|---|
| 7 | Vahvistettu koodista: natiivin alapalkki oli kiinteä arkin pohjalla (Lehtinakyma.cs), kansi itse on täysi. Korjaus Siirtosepällä: napit sivun loppuun kuten web (proto `siirtoseppa/pariteetti-2`). |
| 8 | ‹ ›-nuolet: **sallittu**, omistajan löydös 34 (build 10, proto 6285b06b: kuvien selaus eleillä ilman nuolia). Pääkuvan kehys: korjaus Siirtosepällä (web border 0, kulma 4). |
| 9 | Tähdet ovat webin "Matkakirjan ihmeen tähti" (`.kohde-ihmetahti`, omistaja 2.9.2026). Korjaus Siirtosepällä: tähti natiivin kohdekarttaan fokuskohteiden `ihme`-kentästä. |
| 10 | **Sallittu:** omistajan päätös 28.9. (Natiivi-UI:n maakuntatila v2), Päätoimittaja kirjaa. |
| 11 | **Sallittu:** omistajan hyväksymä aloituslento v3f. Renkaat näkyvät kaikilla neljällä ennen valintaa; kuva oli otettu valinnan jälkeen. |
| 12 | Linssiseppä 2. |

## Sallitut (eivät vaadi korjausta)

- **Kartuschan maakuntalista pikkukuvineen ja NOSTOT 0/83 -rivi (natiivi):** ELÄVÄ KARTTA kohta 3, "pikkukuva
  kartussiin", vain natiivi.
- **Kartuscha on natiivissa korkeampi ja nousee keskemmälle:** seuraus yllä olevista lisäriveistä. Leveys ja vasen reuna
  vastaavat.
- **Paikkapilleri "Ateena" vs "Ateena, elokuussa 1873":** natiivin laajenemisanimaatio (katsaus 1).
- **Aloitusnäkymässä ei yläpalkkia natiivissa:** "Aloitusruutu: natiivi suoraan maapalloon".
- **Kaupunkilehden yläreunan väli natiivissa:** Dynamic Islandin turva-alue.

## Ei vertailtu

- Matkalaukku, matkan tilastot ja äänentasot: odottavat omistajan uutta asettelua (seuraava juna). Web-kuvat
  `x-matka*`, `valikko-*` ja natiivin n03, n04, n08, n08b ovat kansioissa valmiina.
- iPad: natiivista ei kuvattu.
- Linssi käynnissä: vain linssivalikko ja esikatselu verrattiin.

## Muut huomiot

- Natiivin n04: "Äänimaisema" katkeaa kahdelle riville ("Äänimaisem/a"). Laitetestaajan havainto, kuuluu Asetukset-paneelin
  uuteen asetteluun (Natiivi-UI).
- Webin `kaupunkilehti-kansi-alas`-näkymä ei enää todennu (`#arrival-media-kaupunki` 0 × 0), koska radio siirtyi
  lehdestä kartussiin (Raamattu, KAUPUNGIN AVAUSKORTTI). Työkalun näkymä on vanhentunut → Pelikoodari tai työkalun ylläpitäjä.
- Webin `ratas`-näkymä ei aukea ilman kehittäjätilaa (#3624: ratas vain kehittäjätilassa). Sama korjaustarve.
- `tools/pariteettikuvat-nakymat.mjs` ei sisällä näkymiä kartuscha auki, avauskortti, saapumisen valokuvakortti eikä matkan
  tiedot. Paikalliset lisäykset toimivat (kaava tallessa Siirtosepällä), ja ne kannattaa lisätä työkaluun, kun se
  seuraavan kerran päivitetään.
