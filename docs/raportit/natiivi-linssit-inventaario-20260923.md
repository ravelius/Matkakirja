# Natiivin linssit: inventaario ja porttaussuunnitelma

*Linssiseppä 23.9.2026, päivitetty illalla omistajan päätösten jälkeen
(docs/raportit/natiivi-ajantasaisuus-20260923.md: A7, A8/B6/C9, B8, B9, B10, B18).
Pohjana webin js/linssit/* (main 497765175), Siirtosepän natiivi-siirtosuunnitelma ja
Natiivisepän RAJAPINTA.md (proto-3d).*

## Tiivistelmä

- Natiiviin tulee **9 linssiä**: topografia, ihmisen matka, astronautin kamera, keksinnöt,
  vesistöt, vertailu, maatiedot, **maailmanradio** (omistaja 23.9. klo 20.2x: RADIO MYÖS
  NATIIVIIN) ja **isoisän linssi 1873**. Karttapallo ei ole natiivissa linssi, koska pallo on
  koko peli.
- Linssit piirretään vain pallolle; vanhaa tasokarttaa ei porteta.
- **Linssit eivät saa olla kaikki auki** (A7): omistus ja tietäjäpisterajat kuten webissä,
  kaikki auki vain kehittäjätilassa. Hankintalogiikka (kauppa, hiomassa, aarteen kylkiäinen,
  optikon hyvitys) on Pelikoodarin (B8); linssien puolella on kynnystaulu ja omistuskoukku.
- Seitsemän peninkulman linssi (B9) avaa kaikki linssit: sama koukku kuin kehittäjätila.

## Linssit ja tila

| # | Linssi | Web | Natiivi | Tila (proto-3d master) |
|---|---|---|---|---|
| 1 | Topografia | topografia.js ym. (~2500) | Reliefisarja rasterina pohjan tilalle (Cesium, {reverseY}) | **= web iPadilla 24.9.** (värit, maasto; FOV 50° kuten web) |
| 2 | Ihmisen matka | 14 tiedostoa + aikajana (~19 000) | Esitysmoottori, virrat, vanat, valot, kertojan ääni aikaleimoin, tutkimusvaihe, muisti, tiedeliite, aikaselain, lamppujen napautus | **= web iPadilla 24.9.** (kontakti 01fb5ec). Tutkimusvaihe, muisti (PlayerPrefs, webin avain) ja tiedeliite masterissa; testikomento `ihminen tutkimus` |
| 3 | Astronautin kamera | 7 tiedostoa (~10 600) | Reliefi, pilvikuori, tähdet, ISS, 64 kohdetta, avaruuden tausta ja ilmakehän hehku | Valmis, iPad OK. Kylläisyys 0,8/1,0 kytkimen takana (omistaja päättää TestFlightissa; vaimea sarja Karttasepältä) |
| 4 | Keksinnöt | keksinnot.js + aikajana | Pysäkkiajo, valot, tummennus, pysäkkiluennat, tiedeliite, lamppujen napautus, pelaajan X-toive | **= web iPadilla 24.9.**: tummennus (lineaarinen tila, eksponentti 1,75 → 48–54 vs web 49), valojen hehku, reiän peilaus, paalun reikä, pistekerroin Round(dpi/163). Puuttuu: reiän kulku hypyssä |
| 5 | Vesistöt | vesistot.js (700) | Topografia + joet, järvet (Tasavari), nimet | **= web** (värit webin vakioista). Webin pallolla joet z-taistelevat (pätkittäiset): Fable 24.9.: natiivi pitää yhtenäisen uoman, web korjataan bugina |
| 6 | Vertailu | vertailu.js, js/vertailu.js, maakayrat.js | Maatila (Natiiviseppä), valinnat, laput, Vertaa | **= web iPadilla 24.9.** (MaaKartta: 1 px reuna, täyttö lineaarisena; maarajat webin muodoin skeema 1.29). Maakäyrät (B18): data paketissa v17+, geometria Ydin/Maat/Maakayrat (= web, 550 osaa), Natiivi-UI piirtää |
| 7 | Maatiedot | maatiedot.js | Maatila, kaksivaiheinen valinta, maalehti | **= web iPadilla 24.9.** |
| 8 | **Maailmanradio** | radio.js (2215), radiosoitin.js (1248), viritin.js (1209), pistenaytto.js (1430), packs/radiot.js (115 maata) | Karttatila: yksi kaupunki per maa play-nappina, viritys 2,6 s kolmessa vaiheessa, tasatehoinen ristihäivytys, aidot viritysäänet; omistajan hybridimalli (sallittu soitetaan, linkki → aseman sivu, kielletty → vara-äänite) | **= web iPadilla 24.9.** (3b0c253): ▶-napit, soiva punaisena, ei nimiä eikä nappulaa; luokat, tauko, näyttörivit, omistajalukko |
| 9 | **Isoisän linssi 1873** | haara karttaseppa-isoisan-linssi (erä 1, a65b2eef2): isoisa-1873.js, valtiot-1873.js, rajat-1873.json | Erä 1: rajat 1873 pallolle (viivat), nimet 1873 nimiöinä, nykyrajat piiloon. Erä 2: Horation reitti katkoviivana, retroasu (seepia, tumma muste). Valokuvat, äänet ja media myöhemmin | **Erä 1 valmis, iPad OK 23.9.** (proto isoisa-1873): 185 rajaa, 133 nimeä, GPL-aineisto ämpärissä matkakirja/linssit/isoisa-1873/20260921/ (LICENSE, lähteet). Nykyrajat pois rajattomalla pohjasarjalla (Fable 23.9.: webin rajanpiilotuksen vastine), kun Karttaseppä saa sen valmiiksi. **Erä 2 puuttuu: ei webissä, odottaa omistajaa** (Fable 23.9. klo 22.4x) |

## Omistus ja kynnykset (A7, C9)

Web (js/linssit/omistus.js, main): omistus = passin leimat ∪ pelaajan lista ∪ perusvarusteet;
kehittäjätila antaa kaikki toimivat linssit. Tietäjäpistekynnykset [400, 800, 1400, 2200]
antavat kukin seuraavan omistamattoman `manner: null` -linssin rekisterijärjestyksessä,
eli ihmisen matka, keksinnöt, radio, astronautin kamera.

**Natiivi omistajan päätöksellä:**

| Kynnys | Linssi |
|---|---|
| 400 tp | ihmisen matka |
| 800 tp | keksinnöt |
| 1400 tp | maailmanradio **ja** topografia (topografia pysyy samalla kynnyksellä) |
| 2200 tp | astronautin kamera |
| — | vertailu, maatiedot, vesistöt: kehittäjätila (webissä sama) ja myöhemmin kauppa (B8) |
| lahja | isoisän linssi 1873: tarinan lahja isoisän matkakirjan mukana, ei aarre (loki 21.9. klo 14.59) |

Toteutus: `Linssirekisteri.Avauskynnykset` ja `Saatavilla`-koukku (proto-3d). Pelikoodari
kytkee tallennuksen, passin, kaupan ja hyvityksen; seitsemän peninkulman linssi ja
kehittäjätila avaavat kaikki.

## Lisäosat (B18)

| Osa | Web | Natiivi |
|---|---|---|
| Keksintöjen tiedeliite | js/tiedeliite.js (909) | Natiivi-UI (koukku KeksinnotKerros.PysakkiKasittelija); linssi antaa pysäkin |
| Vertailun maakäyrät | js/maakayrat.js (773), data maakayrat.json (lataaMaakayrat) | Natiivi-UI piirtää (VertailuLinssi.VertailuPyydetty); käyrädata pakettiin (Siirtoseppä) |
| Minipulun kysymyskortti | Natiivi-UI (merge-pyynnössä) | — |

## Muille

| Tarve | Kenelle | Tila |
|---|---|---|
| Omistuksen tallennus ja Linssirekisteri.Omistaa-koukku | Pelikoodari | Koukku masterissa; kehittäjätila: sisäinen build päällä, App Store (MATKAKIRJA_APPSTORE) pois |
| Radiotilan napautus- ja luentakoukut, pelaajan kaupunki | Pelikoodari | Tulossa (pelikoodari/linssikytkennat) |
| Radion AVPlayer-liitännäinen | Linssiseppä (tehty), Natiiviseppä kääntää | Merge-pyynnössä |
| Radioasemat luokkineen ja lisenssit | Siirtoseppä | Kokoelma radiot.json tulossa |
| Kartuschan radio-merkki, radiosoittimen kotelo ja pistenäyttö | Natiivi-UI | Koukut lähetetty |
| saturate(0.8) -reliefisarja | Karttaseppä | Valmis (pallo-k08), kytketty |
| Kynnysten kytkin KOKEET-valikkoon | Natiivi-UI | Tulossa |

## Päivitys 23.9.2026 yö (Linssiseppä)

- Radio: ensimmäinen lähetys soi iPadilla (master 5dd794d, v18): RaBe, ByteFM, Radio Helsinki ja http-ATS-koe
  lukittuvat ~2,6 s. Korjaus: AVPlayer automaticallyWaitsToMinimizeStalling oletukseen (854a44c). Tauko ja
  webin näyttörivit tehty (943be95).
- Astronautin reliefi: oletus webin 0,8, täysväri vain KOKEET-kytkimellä (Fable 23.9.; 558d0b0).
- Sitova sääntö (omistaja 23.9. klo 22.3x): linsseihin ei mitään, mitä webissä ei ole, ilman Fablen/omistajan
  lupaa. Puuttuvat tästä syystä: isoisä 1873 erä 2.

## Päivitys 24.9.2026 (Linssiseppä)

- Kaikki linssit verrattu webiin samoin siirroin (Linssit-testit/kontakti-web.mjs + laitetesti.sh
  kontakti|maat|radiokontakti; kuvat proto-3d/lokit/kontakti-20260924-*, maat-*, radio-*).
- Radio: laite, näyttö, kamera ja soiva asema = web. Kartan ▶-napit (webin radiotila: vain radion napit,
  ei kaupunkien nimiä eikä nappulaa): LS:n data ja kytkin masterissa (RadioLinssi.Napit, OmatNapit,
  LinssiOhjain.Ruutupiste), Natiivi-UI piirtää.
- Nappi-inventaarion LS-rivi "Kartan valot (napautus)" tehty (valojen-napautus).
- Pohjakartan ero (natiivi 23a-reliefi, webin pergamentti) hyväksytty: sama laattasarja tulee webiin #2957:llä.
- Regressiokierros master 3b0c253 (kaikki 9 linssiä, radio mukana): proto-3d/lokit/linssit-regressio-20260924/RAPORTTI.md.
  Kaikki = web paitsi hyväksytyt (pohjakartta, vesistöjen uoma) ja astronautin ISS-kamera (ei vertailukelpoinen).
  Avoimet: ihmisen matkan "Kertomus päättyi" -kortti (Natiivi-UI, ei webissä), keksintöjen reiän kulku hypyssä (LS).

