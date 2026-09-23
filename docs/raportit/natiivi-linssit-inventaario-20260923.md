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
| 1 | Topografia | topografia.js ym. (~2500) | Reliefisarja rasterina pohjan tilalle (Cesium, {reverseY}) | Valmis, iPad OK |
| 2 | Ihmisen matka | 14 tiedostoa + aikajana (~19 000) | Esitysmoottori, virrat, vanat, valot, kertojan ääni aikaleimoin | Valmis; tutkimusvaihe ja muisti puuttuvat. iPad: vanat, kertoja; hyppy- ja äänikorjaukset 23.9. |
| 3 | Astronautin kamera | 7 tiedostoa (~10 600) | Reliefi, pilvikuori, tähdet, ISS, 64 kohdetta, avaruuden tausta ja ilmakehän hehku | Valmis, iPad OK. Kylläisyys 0,8/1,0 kytkimen takana (omistaja päättää TestFlightissa; vaimea sarja Karttasepältä) |
| 4 | Keksinnöt | keksinnot.js + aikajana | Pysäkkiajo, valot, tummennus, pysäkkiluennat | Valmis, iPad OK. Puuttuu: reiän kulku hypyssä, tiedeliite (B18) |
| 5 | Vesistöt | vesistot.js (700) | Topografia + joet, järvet (Tasavari), nimet | Valmis, iPad OK |
| 6 | Vertailu | vertailu.js, js/vertailu.js, maakayrat.js | Maatila (Natiiviseppä), valinnat, laput, Vertaa | Valmis, iPad OK. Maakäyrät (B18): Natiivi-UI piirtää, data puuttuu (ks. alla) |
| 7 | Maatiedot | maatiedot.js | Maatila, kaksivaiheinen valinta, maalehti | Valmis, iPad OK |
| 8 | **Maailmanradio** | radio.js (2215), radiosoitin.js (1248), viritin.js (1209), pistenaytto.js (1430), packs/radiot.js (183, ~50 asemaa) | Karttatila: kaupungit play-nappeina, yksi striimi kerrallaan, viritysääni (kohina) vähimmäisajan, asema kerrallaan; soitinkotelo ja pistenäyttö UI:ssa | **Ei aloitettu.** Tarvitsee: striimisoitin (iOS AVPlayer -liitännäinen: Icecast mp3/aac ja yksi HLS), asemat paketissa, lisenssit (Siirtoseppä), kartuschan radio-merkki ja soitin (Natiivi-UI) |
| 9 | **Isoisän linssi 1873** | haara karttaseppa-isoisan-linssi (erä 1 kesken, tauolla 21.9.): isoisa-1873.js, valtiot-1873.js, rajat-1873.json.gz | Erä 1: rajat 1873 pallolle (viivat), nimet 1873 nimiöinä, nykyrajat piiloon. Erä 2: Horation reitti katkoviivana, retroasu (seepia, tumma muste). Valokuvat, äänet ja media myöhemmin | **Ei aloitettu.** Odottaa webin erää 1 ja lisenssipäätöstä: raja-aineisto on GPL-3.0 (historical-basemaps) — käykö maksulliseen appiin? |

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

| Tarve | Kenelle |
|---|---|
| Kehittäjätilan lippu natiivissa (kaikki linssit auki) ja omistuksen tallennus | Pelikoodari |
| Radion striimisoitin (AVPlayer-liitännäinen) | Linssiseppä ehdottaa tekevänsä; Natiiviseppä kääntää |
| Radioasemat ja lisenssit maksulliseen appiin | Siirtoseppä |
| Kartuschan radio-merkki, radiosoittimen kotelo ja pistenäyttö | Natiivi-UI |
| saturate(0.8) -reliefisarja | Karttaseppä |
| Isoisän linssin raja-aineiston lisenssi (GPL-3.0) | Fable / omistaja |
