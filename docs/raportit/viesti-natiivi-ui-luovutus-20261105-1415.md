# Natiivi-UI: luovutus 5.11.2026 klo 14.15 (konteksti 30 %)

Korvaa -1350:n. Proto: /Users/Shared/Claude/wt/proto-natiivi-ui-nousu-pieni, haara natiivi-ui/pariisi-lento-219, kärki 9fd4cfdc8, ei committaamatonta. Vain paikallinen (ei origin-etäpäätä).
Sääntö 2.214: näkyvä Pariisin askel → Macin kuva (polku + yksi rivi) KK:lle local_d5f31591-21fa-4cb0-bab3-bcd3435d075a, kopio PT:lle. Ei selitekaistaa, ei iPadia, Mac-ajot JU:n vuorolla.

## Omistajan ja KK:n sanat, jotka odottavat
- Omistaja 13.46: Louvren ja Riemukaaren kuvat kelpaavat; järjestys Eiffel, Riemukaari, Sacré-Cœur, Notre-Dame, Louvre. Viety mediaan (HTTP 200).
- KK 14.0x: "Col de la Chapelle 55" pois Pariisin kartalta. Korjaukset 1 ja 2 hyvä. Seuraava kuva viidellä kuvalla (lähetetty 14.15, vastaus avoin; KK:n vastaus voi tulla tästä sessiosta).
- KK:lle avoin kysymys: PARIISI-nimen alla tumma soikio (TraileriLiike.UusiVarjo) näkyy vaalealla kartalla. Vanha pohja, ei muutettu (4.1). KK päättää.

## Tehty tällä vuorolla
- f46d3029e: suurennoksessa merkintä kuvan alla (`SaapumisKuvat.LisaaLahderivi`, `KuvanLahde`), Louvren ja Riemukaaren datarivit (`AloituslennonRivit`), `ui saapumiskuva <tiedosto>|pois`.
- cf9eaa640: edellisen kaupungin matkakirja pois keskustan zoomauksen alussa (`PeliNakymat.TyhjennaMatkakirja`, koskee kaikkia zoomaavia saapumisia); aloituslennon kuvien alla ei himmennystä (`TraileriTausta.Alku(avoin, himmennys)`); Esikatselu.cs `BatchPaneeli`.
- 62d00acfc: piirroskartan näkyessä ei huippujen nimiä (Nimikerros, koskee myös Lontoota). AJAMATTA.
- 9fd4cfdc8: isoisän kuvien (Introesitys) aikana ei himmennystä aloituslennolla. AJAMATTA.

## Mitä nähtiin (cf9eaa640; kääntyi, ei error CS)
lokit/esikatselu-20261105-140514 (Lontoo → Pariisi), -140022 (uusi peli), -141049 (raketti). Täysikokoisina a10, m01, raketti-lahella ja Pulun rajaus, muut koostekuvina.
- Viisi kuvaa nousee oikeassa järjestyksessä omilta paikoiltaan; Lontoon korttia ei näy; kartta ei tummu niiden aikana. a12–a15 tummuu vielä (9fd4cfdc8 korjaa).
- Merkit oikein: BatchPaneeli toimii, loki "ruudun kulma paneelissa (1376, 1032)". ESIKATSELU_PISTEKERROIN=0.465 tekee nimistä laitteen kokoiset.
- m01: "Havainnekuva" Louvren alla. Merkinnän sijaitessa ruskealla kartalla ei tarkistettu.
- Pulun kehys kultainen Tuileries'ssä (_tyo/natiivi-ui/aloituslento-219/pulu-kehys-b11-rajaus.jpg); loitonnus tulee paluun jälkeen. Log "elävä: odottaa 65 s" on kulunut aika, ei jäljellä oleva.
- Raketti: kyltti näkyy, teksti "ISS" ilman hintaa. Meri on ruutuinen raketin kuvassa, ilmeisesti Macin tasot (ei tarkistettu).
- Testikytkin `uusi-peli 5 pariisi saapuminen`: Pulun kuva EI noussut 120 s:ssa (PUUTE), ja kartta loitontui. Syy selvittämättä; tavallisella matkalla nousee. Lontoon aloitusintro ei päättynyt 180 s:ssa sk-matkassa (PUUTE), ajo jatkui silti.
- Ei tarkistettu: liike, ääni, "noin 2 s", katukuvien ja nostojen merkintä (niillä ei ole riviä haussa: KuvaLoki "ei riviä datassa"), kysyä PT:ltä, tarvitaanko.

## Seuraavaksi, järjestyksessä
1. **JU:n vuoro:** aja3.zsh (`zsh /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/aloituslento-219/aja3.zsh`, 9fd4cfdc8, sk-matka) ajetaan JU:n viestillä ESIKATSELU NYT. Skriptissä ei PROTO_LINJA-riviä: oletus 2; jos JU antaa L1:n, lisää `export PROTO_LINJA=1`. Kuittaa JU:lle (local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd), koska tämän session viimeinen viesti sanoi nollauksen. Katso a12–a15 ja nimen poisto, sitten kuva KK:lle ja kopio PT:lle.
2. **NS:n kierto** (local_0f7f169f-2ceb-43d2-8fb4-223dda2c0870): natiiviseppa/pariisi-kierto-219 7e11c0b29; NS ajoi 14.00 d4f1fe9db. **Saapumisesityksen Ohita kytkemättä, NUI:n tehtävä** (`KiertoHiivu(lyhinTie: true)`). Haaroja ei ole yhdistetty.
3. Työkalu: Esikatselu.cs-muutos hyötyy kaikkia rooleja; vie mainiin/proton päähaaraan Pariisin mukana tai erikseen JU:n kautta. PT tietää.

## Huomiot
- Lippu SEIS (omistaja 12.17). Oletus 2 s (Pulun kuva) on oma, omistajan sanaa ei ole.
- Faktat: louvre.fr (pyramidi 29.3.1989), Wikipedia (Riemukaari 1806–1836; virallisen sivuston historiasivu ei auennut).
- Ei auki olevia ajoja.

## Lisäys 14.2x (viestit luovutuksen jälkeen; nämä voittavat edellä olevan)
- Haara viety: natiivi-backup peili/proto/natiivi-ui/pariisi-lento-219 = 9fd4cfdc8 (PT:n käsky). Vie uudet commitit samoin.
- KK: viisi kuvaa, Pulun kehys ja raketin kyltti kelpaavat kuvina. Soikio pysyy (hyväksytty pohja). Seuraava kuva, kun tummuminen ja nimen poisto on ajettu; LIIKE RUUTUSARJANA KK:lle yhdessä NS:n kierron kanssa, kun se on samassa rungossa.
- PT: kolme kohtaa ok. Testikytkimen puuttuvaa Pulun kuvaa ei korjata erikseen.
- JU: aja3 jonossa. Uusi NUI kuittaa JU:lle "NUI valmis", muuten linja menee muille. Vahvista linja ennen ajoa.
- NS (6655127dd, natiiviseppa/pariisi-kierto-219): kierto 38 s zoomauksen alusta, 10,4°/s, loppuu itsestään; KiertoHiivu() on ilman parametreja, joten kohta 2 kytketään tällä kutsulla (Saapumistraileri.Ohita ja Saapumisesityksen Ohita). Luento alkaa Mac-ajossa noin 25,5 s zoomauksen alusta (traileri alkaa zoomauksen 4 s:n kohdalla NS:n tiedon mukaan, isoisän kuva 21,5 s trailerin alusta); NS:lle kerrottu.
