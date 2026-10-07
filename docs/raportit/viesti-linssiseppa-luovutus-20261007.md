# Linssisepän luovutus 7.10.2026 klo 05.4x

Rooli: Linssiseppä (Opus, high). Proto-worktree: `/Users/Shared/Claude/wt/proto-linssiseppa-astro-auto`, jonka haarat ovat paikallisia proto-gitissä.
Tarkistus jokaisessa haarassa: `Linssit-testit/kaanna.sh` ja `Linssit-testit/unity-tarkistus.sh`. COZY-haaroille `unity-tarkistus` ajetaan COZY-dll:n
kanssa: scratchpadin `kaanna-cozy.sh` → `MATKAKIRJA_KIRJASTOT=…/kirjastot-cozy`, ja DEF_YHT:hen lisätään `COZY_URP`.

## Juna 156: VIE-savu OK 05.33 (Natiivisepän runko 4055dc77, käännös 79d8ba7c)

Haara `linssiseppa/juna-156` **8faa57f56**, joka on Natiivisepän rungossa 4055dc77 sisältää:
- master BUILD 154
- `esilataus-156`: esilataus, latauskuva, Seuraava, pehmeät lennot, kierros-kenttä #4086 ja esikameran Googlen ehtorajat kommenttina
- `yovalot-154`: yövalot v5 sekä tiet_polut ja tiet-v2
- `giza-omat-mallit`: Gizan mekanismi, oletuksena pois
- `natiiviseppa/maasto-rako` 18a9e4d3

Todistus: `proto-3d/lokit/linssiseppa-juna156-todistus-20261007/TODISTUS.md`. VIE-savu tehtiin oikeilla napautuksilla: `linssiseppa-opas-vie156b-20261007/polku.log`.
- Viimeinen korjaus koskee Seuraava-nappia. Kierroksen ulkopuolella ja viimeisen kohteen jälkeen Seuraava jatkaa kaupungin kohdelistan näkemättömiin kohteisiin, ja kun lista on käyty, se lähettää workerille toiveen. Aiemmin worker vastasi "odota" ja opas jumittui.
- Opas löytyy taikalasit-napista → LINSSIT → "Elävä opas".

Kuittaukset:
- Päätoimittaja kuittasi lennot, esilatauksen ja yövalot v5. Yövaloja koskee ehto: iPadin muisti ja kehysaika mitataan, kun Wi-Fi toimii (fyysinen iPad 00008103, scratchpadin `ipad-yovalot.sh`).
- Eiffelin VIE-este on korjattu ja todennettu (`linssiseppa-eiffel2-20261007/kuvat/stillit-2x2.png`).
  - Juurisyy: Kerro lisää -oikotie (sama paikka alle 50 m) jätti valinnan tai Liikun arviokohteen katukehyksen (143 m) workerin oikealle kohteelle.
  - Lisäksi maa otetaan nyt kehän mediaanista (r 35–60 m) eikä keskipisteestä, joka osui torniin tai kattoon.
- Korkea kohde (≥ 60 m) mahtuu kokonaan kuvaan. Etäisyys lasketaan pystynäkökentästä, yläraja on 1 200 m, ja lähemmäs-vaihe ja dolly eivät mene pienintä mahtuvaa etäisyyttä lähemmäs. Eiffel kehystetään 854 m:stä; todennus: `linssiseppa-eiffel3-20261007/kuvat/stillit-2x2.png`.

## Juna 157 (valmis, odottaa junaa)

**Torjuntasavu e2d89273 OK 06.29** (raportoitu Julkaisijalle ja Päätoimittajalle; ajoon käytettiin oikeita napautuksia; loki `proto-3d/lokit/linssiseppa-torjunta157-20261007/`):
- "vie minut Tallinnaan": kertojan laatikkoon tulee torjuntateksti, eikä lentoa tule.
- "vie minut Varsovaan": kaupunki vaihtuu ja siirtymälento alkaa.
- Natiivi torjuu vain sallitun alueen ulkopuoliset. Jos toive "Venetsiaan" kieltäytyy, kyse on workerin vastauksesta, jonka korjaa Pelikoodari.
- Avoin havainto, joka ei estä VIE:tä: Varsovan tumma neliö on reikä yhden tiilen kohdalla. Google palautti tiilelle 404 (9 kpl), ja Cesium käsittelee epäonnistuneen tiilen tyhjänä, joten forbidHoles ei auta. Virhe on näkynyt vain tässä ajossa, 1/188 lokikansiosta. Seuraavaksi toistoajo (Varsova kahdesti). Jos reikä toistuu, Google-tileset luodaan uudelleen kerran kaupunkia kohden, kun natiivilokissa on tiilien 404. Cesiumin lokirivit sisältävät Googlen avaimen; poistin sen omista lokeista.

`linssiseppa/sallitut-157` 4af2338e0 (sisältää juna-156:n 8faa57f56 ja NykyinenKaupunkiId:n Siirtosepän äänimaisemalle; NUI:n versio natiivi-ui/sallitut-157b eb6f860f) (omistaja 7.10. 00.4x, vain sallitut kaupungit):
- OpasSallitut lukee listan /opas/aineistot-vastauksen kentästä `sallitut`, ja viimeisin lista säilyy levyllä.
- Pelaajan kohde sallitun alueen ulkopuolella torjutaan siltalauseella `ei-sallittu`. Jos ääni ei soi, NUI:n TorjuntaTeksti näyttää tekstin.
- Vapaa lento pysähtyy pehmeästi alueen reunaan.

NUI:n osa on `natiivi-ui/sallitut-157` 0f770be2. LS2:n lista on tiedostossa `proto-3d/lokit/linssiseppa2-3d-kattavuus/sallitut-3d.json`: 36 sallittua ja 5 RAJA-kaupunkia, joista RAJA torjutaan (Päätoimittaja). Pelikoodari tarjoilee listan ja generoi `ei-sallittu`-lauseet; Päätoimittaja hyväksyy tekstin. Haaraan on jo mergetty juna-156 8faa57f56. Siirtosepän aanimaisema-haaran kanssa ristiriita on samassa kohdassa, ratkaisu 7d00ec3c.

## Juna 158 (valmis, odottaa simuvuoroa)

`linssiseppa/kaupunki-kohde-158` **eebfb3eee** (käännös 87dd0b6d5), joka on sallitut-157:n päällä. Workerin muoto on litteä: kohde_nimi, kohde_lat ja kohde_lon. Alikenttä "kohde" rikkoisi TF 156/157 -appit, koska ne ottavat sen nimen kaupungin nimeksi. Worker #4107 on pidossa, kunnes muoto on todennettu vanhalla e2d89273-appilla. Testit 784/784, unity-tarkistus 0 virhettä.
- d4bda0f5f, worker #4107: toiminnossa kaupunki + kohde { nimi, lat, lon } siirto vie suoraan kohteeseen (`OpasSilmukka.VaihdaPaikkaKohteeseen`). Jos kohde on toisessa kaupungissa tai siltä puuttuu sijainti, laskeudutaan yleiskuvaan. Samalla korjattu jäsennys: kaupungin nimi luetaan toiminnosta eikä kohteesta.
- 7f62abb8c, Päätoimittajan käsky: `LokiSuodatin` (Unity) ja `LokiPeitto` (Ydin) peittävät avainparametrien arvot muotoon *** kaikista Debug.Log-riveistä, Cesiumin natiivit rivit mukaan lukien.
- **Simussa OK 07.09** (haaran kärki 80160d265, BUILD 157 master mergetty, käännös da2490985, `proto-3d/lokit/linssiseppa-k158-20261007/`):
  - Pariisista toive basilikaan → siirto suoraan kohteeseen; worker #4107 on julki.
  - Lokissa 21 riviä key=***, AIza-avaimia 0.
- eebfb3eee: kaupungin vaihto unohtaa edellisen kohteen (`UnohdaEdellinenKohde`), joten kuvakortti ja nimilappu eivät jää uuteen kaupunkiin. Odotuksen uusintapyyntö käyttää yhä edellistä kohdetta. Simussa OK 07.3x (Pariisi → Krakova).
- Varsova: Päätoimittaja päätti (a): Varsova on poistettu sallituista (LS2:n json 37, Pelikoodarin #4109).
- (b) ei onnistunut: reikä tuli kaikilla etäisyyksillä 5 000–1 500 m, ja 404-tiiliä oli 38 (`linssiseppa-varsova-b-20261007`). **Jonossa: tarkistus 14.10.2026** (Päätoimittaja) yhdellä ajolla. Jos kahdella käynnillä ei tule 404:ää, Varsova palaa listalle (LS2 ja Pelikoodari palauttavat rivin). (c) ei nyt.

## Juna 159: kaupunkitila (omistaja 7.10. 08.3x, kaupunkiopas karttaelementtinä)

`linssiseppa/kaupunkitila-159` 1be5518db (kaupunki-kohde-158 eebfb3eee:n päällä). Testit 800/800, unity 0 virhettä; simutodennus odottaa vuoroa.
- `OpasSovitin.AvaaKaupunkitila(id)` avaa oppaan suoraan kaupunkiin ilman täkyjä. Komento: `opas kaupunkitila <id>`.
- Rajapinta: `Kaupunkitila`, `KaupunkitilaId` ja `KaupunkitilaVaihtui`. Natiivi-UI piilottaa aloitusvalinnan ja Vaihda kohde -rivin.
- Kaupunkitilassa silmukan sallittu alue on vain tämä kaupunki. Toinen kaupunki (valikko, "vie minut", #4107) torjutaan torjuntatekstillä.
- Linssiseppä 2:n karttaelementti käyttää rajapintoja `SallitutLista`, `SallitutVaihtui` ja `LataaSallitut()`; sallittujen haku on nyt staattinen.
- Tila päättyy oppaan Sulje-kutsussa, joten laaja Elävä opas toimii ennallaan.
- Linnanrakentaja tekee pallon mallin, ja Linssiseppä 2 tekee sille paikkamerkin.
- **Todennettu 09.0x** yhdistelmäkäännöksellä 7ec948289 (kaupunkipallo + Natiivi-UI + giza-valmis; loki `linssiseppa-kaupunkitila-20261007`):
  - Pallo → kaupunkitila Lontoo; Seuraava → kierros.
  - Näppäilty toive Pariisiin torjutaan.

## Giza (omistaja 7.10. 08.4x: "Egypti kokeeksi loppuun omilla malleilla")
- `linssiseppa/giza-valmis` c8564358b (kaupunkitila-159:n päällä):
  - CesiumOmatMallit hakee mallit R2:sta (`kartta/omat-mallit/uusin.json` → `giza-v1/mallit.json`).
  - Leikkaus on oletuksena päällä; testissä sen saa pois tiedostolla `omat-mallit/leikkaus-pois`.
  - Pöllö-pyyntöihin lisätään otsake `x-matkakirja-kokeilu: giza` vain kehityskäännöksissä (Pelikoodari #4116).
- Vientipaketti `proto-3d/_valmiit/omat-mallit-vienti-20261007`: kuiva-ajo OK. Julkaisija vie sen, kun sanon "vie" simutodennuksen jälkeen.
- Linssiseppä 2: Giza on sallitut-3d.json:ssa. Pelikoodari #4116: rivi sallituissa, 4 kohdetta ja kierros (vielä OPEN).
- Simuskripti: scratchpadin `ajo-giza.sh`. Se kuvaa yleiskuvan sekä Kheopsin ja Sfinksin lähikuvat leikkauksen kanssa ja ilman.
- **Simu 09.33** (käännös 8331af502, `linssiseppa-giza-20261007`): mallit ovat oikeassa paikassa ja koossa (kohdakkain Googlen pyramidien kanssa); Kheopsin "valkoisuus" on leikkausreikä.
  - Avoinna: valkoinen tausta reiän reunassa. Kaukaa reikä paisuu karkean maskin vuoksi; maski on tarkennettu (96ecd4efe).
  - Avoinna: Sfinksin aitaus on tumma, noin 10 m liian korkealla ja reiästä sivussa.
  - Linnanrakentaja tekee giza-v2:n tänään iltapäivällä (Olavinlinnan jälkeen): `<kohde>-helma.glb` (maapohjahelma 70 m, 1 m Googlen alla) ja Sfinksin korjauksen. Työkalu tukee helmaa (1914e10c4).
  - Vientiä EI vielä. Seuraavaksi: tileset v2 → simu → kuvat Päätoimittajalle → "vie" Julkaisijalle.

## Kuumailmapallon korinäkymä (omistaja 7.10. 09.1x, ei junaan ennen Päätoimittajan kuittausta)
- `linssiseppa/pallokori` b3601c81e (kaupunkitila-159:n päällä):
  - Ydin KoriLiike: keinunta ~1° / 5 s, jousi ≤ 2° kiihdytyksissä, köydet viiveellä; testit KoriLiikeTestit.
  - PalloKori: URP-overlay-kamera, kerros 16. Linnanrakentajan kori_nakyma.glb (_valmiit/ilmapallo-v1/kori, R2-polku `kartta/ilmapallo/v1/`, ei vielä viety) tai paikkamerkki.
  - Komennot: `opas kori 0|1` ja `opas kori aanet eleven|kirjasto`.
  - Lennot pallotilassa hitaammin lyhyillä väleillä (1,6×), pitkillä 1,15×.
- Äänet Resources/Aanet/Pallokori:
  - ElevenLabs: 4 ääntä, 120 krediittiä (katto 10 000).
  - Commons PD: liekki. Lähteet `proto-3d/_lahteet/pallokori-aanet/*/LAHTEET.md`.
  - Freesound odottaa omistajan uutta avainta (nykyinen 401).
  - Kaupungin äänimaisema seuraa korkeutta Siirtosepän `KaupunkiAanimaisemaSoitin.Kamera`-Funcilla (heijastus).
- Puuttuu: simuvideo natiivikaappauksella äänen kanssa (A/V mitattuna), stillit iPhonesta ja iPadista, ElevenLabs- ja kirjastoäänten vertailu.

## iPad-laitemittaus (Natiivisepän vuoro, Release 603cfd8a)
- `proto-3d/tyokalut/linssiseppa-ajot/ipad-ab.sh` (KYTKIN=yovalot|terava): ensin yövalot, sitten terävöitys. Tulokset rivinä Päätoimittajalle.

## Giza, aiempi vaihe (omistaja 6.10. 23.35)

- Googlen ehdot on tarkistettu: omat 3D-objektit ovat sallittuja, kun niitä ei ole johdettu Googlen tiilistä.
- Työkalu `tyokalut/omat_mallit_tileset.py` muuntaa Linnanrakentajan GLB:t (`_valmiit/giza-v1`) 3D Tilesiksi. Testiin tiedostot kopioidaan kansioon Documents/omat-mallit.
- Leikkauksen juurisyy on korjattu 72cc68be: materialKey "Clipping" asetetaan ajonaikaisesti. **Korjausta ei ole vielä todennettu simulla** (testitiedosto `leikkaus-paalle`). Leikkaus on oletuksena pois, kunnes Päätoimittaja näkee ennen/jälkeen-kuvan.
- Kheopsin LOD0:n pinnat näkyivät valkoisina leikkauskuvassa. Tarkista tämä Linnanrakentajan kanssa todennuksen jälkeen.
- Linnanrakentajalle on lähetetty kulmakorkeudet. Giza on tauolla omistajan palautteeseen asti.

## COZY (Päätoimittaja: vasta junan 156 jälkeen)

- `linssiseppa/cozy-kaupunki` a010dc9a + 44b590d7: KaupunkiSaa (`#if COZY_URP`, oletuksena pois, Documents/kaupunki-saa.txt) ja kevennys `tyokalut/cozy_kevenna.py`, jolla appi kasvaa +68 Mt.
- Siirtosepän `siirtoseppa/cozy-linna` 24eacd5a on tämän päällä.
- Koe on kirjattu (`linssiseppa-cozy-20261007`). Vaihtoehto A (taivas ja pilvet) toimii, mutta oletusprofiili ei kelpaa: tarvitaan pehmeät pilvet ja ilmaperspektiivi horisonttiin. Sumu (B) on liian tiheä ja pitää sitoa korkeuteen. Sade ei näkynyt (selvitä partikkelit).
- Kaupunkiprofiili: `linssiseppa/cozy-profiili` ffba56f81 (cozy-kaupunki + master).
  - Ilmaperspektiivi kirjoitetaan COZYn sumushaderin muuttujiin LateUpdatessa: utu kasvaa etäisyyden mukaan, ja näkyvyys asetetaan "utu"-arvolla km:nä.
  - Pilvityyli on soft. Sadepartikkelit siirretään kaupunkikameran kerrokselle.
  - Koeskripti on scratchpadin `ajo-cozy2.sh`; Julkaisija on jonottanut sen (~08.30).

## Muut

- Mac: `linssiseppa/mac-kaupunki` c3f2ff1c (MacLaatu CesiumKaupunkiin). Natiiviseppä on mitannut sen.
- Akropolis-kolmikon kulmavirhe johtui PalloKierron maaston raosta. Natiiviseppä teki MaastoRakoPois-kytkimen, ja kulma on todennettu identtiseksi.
- Simulaattorit 3A3E4671, D0D2CD1E ja 903C2B91 on tyhjennetty (erase) levyn vapauttamiseksi, ja ne ovat sammutettuina.

## TILANNE 10.50 (Macin uudelleenkäynnistys ~11.05)
- Yhdistelmä `linssiseppa/esitys-giza` 045374cab sisältää:
  - natiivi-ui/pariisi-esitys (metrolinja, Kysy-rivi, apuraha) ja pallokori
  - Giza (opas pinta, helmatuki) sekä siltalauseet v2 ja torjunta-aika
  - yhden esityksen + Kerro lisää (valmis teksti #4126)
- Käännös 0bf208e9a, appi `proto-3d/lokit/linssiseppa-app-esitys-0bf208e9a/`.
- Simuajot 10.46: Giza-pinta → `lokit/linssiseppa-gizapinta-20261007`; Pariisin stillit → `lokit/linssiseppa-esitys-20261007`. Jos ajo katkesi, aja uudelleen seuraavilla skripteillä:
  - `proto-3d/tyokalut/linssiseppa-ajot/ajo-pinta.sh` ja `ajo-esitys.sh`
  - ympäristö: S=<työkansio>, APP=<appi>
  - käynnistys: touch $S/sim-nyt-pinta ja $S/sim-nyt-esitys
  - ajo-pinta.sh kopioi giza-v2-tilesetin `$S/giza-v2-tiles`-kansiosta; pysyvä kopio on `proto-3d/_tyo/linssiseppa/`, joten kopioi se sieltä `$S`:ään ennen ajoa.
- Kesken:
  - Gizan pintakorkeudet Linnanrakentajalle (5 pistettä).
  - Pariisin stillit Päätoimittajalle (iPhone pysty ja vaaka, iPad).
  - iPad-laitemittaus (yövalot ja terävöitys ABAB, ipad-ab.sh) peruttiin uudelleenkäynnistyksen takia; uusi vuoro sovitaan Natiivisepältä.
  - Avaus ja opastus kytketään, kun #4126 on tuotannossa.
  - Yksityiskohtakuvat: kuvalista pilvestä klo ~11, NOSTOKORTTI-arvot NUI:lta (paperi #f5f0e2, reunus 1 pt rgba(70,51,31,.3), kulma 12 pt, sisäreuna 4 %).
- Junaan 160 kuitattu: `linssiseppa/siltalauseet-v2` 2db2d9d9d (ilmoitettu Natiivisepälle). Lisäksi `linssiseppa/torjunta-aika-160` b3cb1a53a odottaa todennusta ja stilliä.
