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
- 10.55: simuajot valmiit.
  - Giza-pinta: korkeudet Linnanrakentajalla.
  - Helmakuvista puuttuivat mallit, koska tilesetin tyhjää ADD-juurta ei tarkennettu. Korjattu 994c2c7e9 (esitys-giza), ja uusi tileset on `proto-3d/_tyo/linssiseppa/giza-v2-tiles`.
  - Pariisin stillit `lokit/linssiseppa-esitys-20261007`: korin sovitus pystyruudulle ja metron nykyinen kohde korjattu a74031868. Vaakametron tyhjä laatikko on NUI:lla.
- Käynnistyksen jälkeen (uudelleenajot):
  - esitys-giza a74031868 → käännös → stillit (ajo-esitys.sh) ja Giza v2 (ajo-pinta.sh helmaosio, ilman pintaa).
  - iPad-laitemittaus (ipad-ab.sh).

## TILANNE 12.35 (uudelleenkäynnistyksen jälkeen)
- Pariisin omistajasarja (3f2363479) on toimitettu Päätoimittajalle: `lokit/linssiseppa-esitys-20261007/omistajalle/`.
  - Omistajan palaute 12.3x tehty esitys-gizaan: köydet pois iPhonen pystystä ja KierrosLahtee-tapahtuma. NUI teki metroanimaation (natiivi-ui/pariisi-esitys b657bb2d) ja ottaa stillit.
- Omistaja 12.4x: opastus vain 1. kuumailmapallokyydillä (PlayerPrefs `matkakirja-pallo-opastus-kuultu`) ja avaus ennen kierrosta → esitys-giza fbf816e34.
  - Testiskripti ajo-opastus.sh (Pariisi 1. → opastus, 2. → ei, nollaus → Praha → opastus), simuvuoro ~12.55.
- Yövalojen paikkakorjaus junaan 161: `linssiseppa/yovalot-paikka-161` 47622521f (BUILD 159 + cherry-pick).
  - Vika näkyi vain iPadin 1. ajossa (ensiasennus), toisella ajolla ei.
  - Toistoajo ajo-yo-toisto.sh (NIMI=159, APP=natiiviseppa-app-159vie-19ef80cc; sitten korjattu).
- torjunta-aika-160 jätetty pois (Päätoimittaja); haara säilyy.
- iPad-mittaukset valmiit: yövalot ≈ 0 ms (+1 Mt), terävöitys ≈ 0, yö/päivä 16,7 ms. Ensiajon 58 ms oli laitteen tila.
- Giza v2 (Sfinksi v2 + sävytetyt helmat), tileset `_tyo/linssiseppa/giza-v2-tiles`, ajo-helma.sh → simuvuoro ~13.0x.
  - Kaukaa (1,4–5 km) leikkausmaski on karkea ja sivussa; ratkaisu etäisyysrajalla vielä tekemättä.

## TILANNE 13.0x (tauko 13.45–15.00; jatka tästä)
- `linssiseppa/esitys-giza` 5a0478f55 on esityserä junaan 161 (Päätoimittajan kuittaus kesken).
  - Sisältää: kaupunkitila, pallokori (köydet pois iPhonen pystystä, KoriVasenKoysiNorm NUI:lle), metro-API ja KierrosLahtee, yksi esitys + Kerro lisää (#4126), Giza (opas pinta, helmatuki, kokeiluotsake), siltalauseet v2.
  - Lisäksi: avaus ja opastus kerran (todennettu simussa 12.51, `lokit/linssiseppa-opastus-20261007`).
  - Aloitus 12.5x: esikamera esilataa 1. kohteen lähikuvan latauskuvan aikana ja yleiskuva on 2,2 km. EI VIELÄ TODENNETTU: ajo-aloitus.sh (S, APP; touch $S/sim-nyt-aloitus), Ateena ja Pariisi kylmästä, ei tyhjiä laattoja.
  - NUI: natiivi-ui/pariisi-esitys (metrolinja köyden oikealle KoriVasenKoysiNorm:lla) yhdistetään ennen junaa.
- Junan 161 yövalot: `linssiseppa/yovalot-paikka-161` 47622521f, yhdistelmäkäännöksessä Natiiviseppä 074c95a3 + LS2 e16d100db (Julkaisija).
  - Toisto 159:llä ei toistanut vikaa (48_2, 1 lataus). Korjattu ajo puuttuu: ajo-yo-toisto.sh NIMI=korjattu APP=<yhdistelmä>.
- Giza: helmat sävytetty ja OK. Linnanrakentajalta odotetaan Sfinksin helmaa ja väriä (keho tumma) sekä helmoja 150 m (kaukoreikä). Sen jälkeen omat_mallit_tileset.py → `_tyo/linssiseppa/giza-v2-tiles` → ajo-helma.sh → pelikuvat Päätoimittajalle → "vie" Julkaisijalle (paketti omat-mallit-vienti-20261007 on päivitettävä v2:lla).
- Pelikoodari #4138 (kierros alkaa avauksen kohteesta) → todenna alku Roomassa, Lontoossa, Kööpenhaminassa ja Pariisissa.
- iPad-mittaukset valmiit (yövalot ≈ 0 ms, terävöitys ≈ 0, yö/päivä 16,7 ms). COZY 9dede53a5 odottaa simua (ei kiire).
- 12.5x lisäykset:
  - Giza v2b -laatat on generoitu Linnanrakentajan v2b-malleista: `_tyo/linssiseppa/giza-v2b-tiles`. Sfinksin väri on korjattu, kaikilla on 150 m helma, uusi sfinksi-helma. Seuraavaksi simu (ajo-helma.sh v2b-polulla) ja pelikuvat.
  - Junan 161 yhdistelmäappi af5922b95: `lokit/natiiviseppa-juna161-koe/Matkakirja3D.app`. Siitä tehdään yövalojen korjattu ajo.
  - Esitys-giza on Julkaisijan käännösjonossa NUI:n jälkeen. Simut ovat varattuina, joten ajot tehdään klo 15.00 jälkeen.
- 13.16 lisäykset:
  - Yövalot-161 korjattu ajo yhdistelmällä af5922b95 OK: 9/9 laattaa, keskus 48_2, 1 lataus (`lokit/linssiseppa-yotoisto-20261007/korjattu`). Ilmoitettu Julkaisijalle ja Päätoimittajalle; simu vapaa.
  - Esitys-gizan kärki on 3c54439e0: esittely_polut (#4141, Praha ja Wien esittely-v1b). Proto-repolla ei ole originia, Julkaisija kääntää paikallisen haaran.
  - Pelikoodarin #4142 korjaa /opas/liiku-kierroksen alkamaan avauksen kohteesta; natiiviin ei tarvita muutosta.
  - Klo 15:n jälkeen: käännös 3c54439e0 → ajo-aloitus.sh (Ateena, Pariisi) → Giza v2b (ajo-helma.sh) → kierroksen alut.
- 13.21 lisäykset:
  - NUI:n havainto: metrolinja katosi iPadilla ja vaakanäkymässä, koska LaskeVasenKoysi käytti maailman AABB:n kulmia. Korjattu 741625b8d:ssa: köyden akselia näytteistetään 17 pisteellä.
  - Esitys-giza KÄÄNNETTY cbd5ffad7 (kärki 741625b8d). Appi: `proto-3d/lokit/linssiseppa-app-esitys-741625b8d/Matkakirja3D.app`. Lukko vapautettu.
  - Klo 15:n jälkeen tällä appilla:
    - ajo-aloitus.sh: `S=<scratch> APP=<yllä> perl setsid zsh ajo-aloitus.sh`, sitten `touch $S/sim-nyt-aloitus` SIMU NYT -luvalla.
    - Giza v2b.
    - Kierroksen alut.
  - NUI kuvaa köysikohdan samalla appilla.
- 13.25:
  - Aloitusajo cbd5ffad7 OK: Ateena ja Pariisi kylmästä, laatat 99/100 % saapuessa, ei tyhjiä. Kuvat `lokit/linssiseppa-aloitus-20261007/kuvat`. Raportoitu Päätoimittajalle; simu vapaa.
  - NUI kuvaa köysikohdan omalla 5c3d45e6:lla 15.00 jälkeen.
  - Klo 15:n jälkeen: Giza v2b (ajo-helma.sh v2b-tiles) ja kierroksen alut (#4142 julki).
- 14.2x (tauko peruttu 13.47):
  - Pallon latauskuva (Päätoimittaja 13.5x, Codex #4143): haara `linssiseppa/pallo-latauskuva` 09a1c8bb1 (esitys-giza + kaukosääntö + latauskuva).
    - 1. simukierros: `lokit/linssiseppa-pallokuva-20261007`.
    - Korjattu: esilataus (iPadilla oli 2 s mustaa), iPhonen vaakarajaus ja kaksoisavaus.
    - Käännös ja simu on pyydetty uudelleen (ajo-pallokuva.sh). Kuvat Päätoimittajalle ennen kuittausta.
  - Giza v2b ajettu (`lokit/linssiseppa-gizav2b-20261007`):
    - Sfinksi on musta, koska LOD1/2-leivonnasta on 67–70 % mustaa pinta-alalla painotettuna (glb-musta-uv.py).
    - Helmat ovat liian vaaleat.
    - Linnanrakentaja korjaa nämä vasta, kun Päätoimittaja avaa Gizan uudelleen (omistaja: Olavinlinna ensin).
  - Kaukoreiät korjattu omalla puolella: esitys-giza 1abecc5ce, leikkaus pois yli 2,2 km:stä ja takaisin alle 1,8 km:ssä. Ei vielä todennettu simussa.
  - Kierroksen alut (#4138 + #4142) todennettu julkisesta Pöllöstä.
- 14.5x:
  - Latauskuva d229919a7 OK, raportoitu Päätoimittajalle kuittaukseen: `lokit/linssiseppa-pallokuva-20261007/omistajalle/latauskuva-kolme-nakymaa.png`. Haara pallo-latauskuva cc2d381ed.
  - Gizan kaukosääntö toimii (ei valkoisia reikiä). 2,5 km:stä Googlen Khefren näkyy osin.
  - UUSI: alkulento v3 (omistaja 14.5x via Päätoimittaja; ei yötä, kone näkyy alusta, ei nykäystä; video ja mittaus Päätoimittajalle; juna 162).
    - Haara `linssiseppa/alkulento-v3` 8be4e3831 = BUILD 160 + kehysloki (`lento v3 kehysloki 1`). Toistokäännös jonossa.
    - `linssiseppa/alkulento-v3-korjaus` eeb46378b: Paivanvalo `Pakota ?? false` ja kone radan alussa odotuksesta asti, nappula pois.
    - Nykäyksen syy selviää toistoajosta. Ehdokkaat: esikääntö, KaupunkiMerkit.ValitseKaupunki-ajo napautuksessa ja leikkauskehyksen muutokset (usva, reitit, LentoKarkeaSse).
    - Mittaus: `tyokalut/linssiseppa-ajot/mittaa-kehykset.py konsoli.log`.
- 15.1x:
  - Latauskuva v2 (vaakarajaus ja tumma liuku, iPad 1,4 ×): cc6176356, käännös ec7402278. Stillit `omistajalle/latauskuva-kolme-nakymaa-v2.png` lähetetty Päätoimittajalle kuittaukseen.
  - Alkulento-v3 8be4e3831 kääntyy junan 161 jälkeen, toistoajo savun jälkeen.
  - Korjaushaara alkulento-v3-korjaus c917ffd28: ei yötä, kone alusta, napautuksen kamera-ajo pois valinnassa.
