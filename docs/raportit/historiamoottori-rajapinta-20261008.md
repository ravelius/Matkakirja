# Historiamoottori: mikä on yleistä ja mikä Olavinlinnaa (8.10.2026)

*Siirtoseppä (Opus 5.5) Päätoimittajan pyynnöstä. Valmistelu, ei refaktorointia: seuraavasta kohteesta päättää omistaja.
Tila: proto-haara `siirtoseppa/historia-m` @ 138fb8d70 = juna 167 (`siirtoseppa/historia-juna167` @ 06a79a48f), Olavinlinna 1–10
pelattavana. Koodi: noin 7 200 riviä `Assets/Matkakirja/Linssit/Ydin/Seikkailu/` (puhdas C#, testattava) ja
`Assets/Matkakirja/Linssit/Unity/Seikkailu*.cs` (Unity-sovittimet) + seikkailun orkestrointi `DioraamaSovitin.cs`:ssä.*

## 1. Tiivistelmä

- **Moottori on jo valtaosin yleinen.** Liikkuminen, vartijat, kuulo ja näkö, varoitus ennen kiinniottoa, tyrmä,
  tarkistuspisteet, tallennus, vihjeportaat, käsittely käsin, valot, äänet ja tietokerros toimivat Linnanrakentajan
  datamuodolla (`kavely/osat.json` + `merkit.json` + glb:t) eivätkä tunne Olavinlinnaa.
- **Olavinlinna-kohtaista on noin neljännes:** arvoitukset ja kohtaukset (kappeli, voudin sali, komero, pako), huonejako
  ja vihjekohteet, sekä joukko nimiä koodissa (osat `vesiportti`, `muurikaytava`; esineet `tarjotin`, `avainrengas`,
  `koysikieppi`; reitit `ranta`, `harja-*`).
- **Ehdotus:** irrota kohdesidonnaiset nimet ja huonekartat dataan (kohteen `seikkailu.json` + merkkien kentät) ja anna
  arvoituksille yhteinen rajapinta. Arvio **noin 25 h Siirtosepälle, 6 h LS2:lle, 2 h LS1:lle ja 2 h Linnanrakentajalle**, eli
  noin kolme työpäivää rinnakkain. Seuraava kohde itse (data, kohtaukset, arvoitukset) on tämän päälle oma työnsä.

## 2. Kerrokset

| Kerros | Missä | Kuka |
|---|---|---|
| Ydin (säännöt, ei Unityä) | `Ydin/Seikkailu/*.cs` | Siirtoseppä, LS2 (testit) |
| Unity-sovittimet | `Unity/Seikkailu*.cs` | Siirtoseppä |
| Orkestrointi (vene, pelaaja, kappeli, vartijat päälle) | `DioraamaSovitin.cs` (VenePaalle, LisaaPelaajahahmo, EsineetPaalle, KappeliPaalle, VartijatPaalle, JatkaTallennuksesta) | Siirtoseppä |
| Kävelydata | ämpäri `dioraama/<rakennus>/<hash>/kavely/` (osat, merkit, törmäys- ja navi-glb, esine-glb) | Linnanrakentaja |
| Kiinnitetty paketti | `PelattavaPala.Hash` / `Versio` (koodissa, ei `uusin.json`) | Siirtoseppä + LR |
| Äänet | `seikkailu/<rakennus>/aanet-e3-v1`, `aanet-fp-v1`, `aanet-fp-v2` (manifestit) | Pelikoodari |
| Repliikit | `seikkailu/<rakennus>/repliikit-v1` (manifest), tunnukset koodissa | Sisältökirjuri, Pelikoodari |
| Tietokerros | `seikkailu/<rakennus>/tietokerros-v1` | Pelikoodari |
| Testit ja simulaatio | `Linssit-testit/Testit` + kultaiset `olavinlinna-<Versio>-*` | LS2, LS1 |

## 3. Yleistä (kohdeneutraalia jo nyt)

| Osa | Luokat | Huom. |
|---|---|---|
| Kävely ja kamera | `Kavely`, `KavelyData`, `SeikkailuKavely`, `SeikkailuPelaaja` | 1. persoona, kyykky ja hiivintä, napautuskävely, portaiden pehmennys, takakuva, ote-kiipeily, ohjatut jaksot ja kaukokuvat (`Ohjattu`, `Kuva`). Kuorileikkaukset 32, `leikkaus:vain-<vuosi>*` etusijalla. |
| Pinnat ja kuulo | `Askelaani`, `Aanilahde` | 6 pintaa, seinäsääntö osista, korkeusraja 2,5 m, omat askeleet. |
| Näkyvyys | `SeikkailuNakyvyys`, `SeikkailuValot`, `Kynttilat` | Valoisuus liekeistä, kannetut valot (`lyhty`, `soihtu`), volumetrinen hehku. |
| Vartijat | `Vartija`, `VartijaProfiili`, `SeikkailuVartijat` | Vaiheet epäily → tutkii → etsii → hälytys, varoitus ennen kiinniottoa, valppaus, irtipääsy, huuto ja kutsu, kulkulupa (tarjotin, naamio), tunnistus, uppoutunut, kertakääntö, odottavat reitit. Profiilit (`vartija`, `portinvartija`, `kokki`, `apulainen`, `renki`, `torkku`, `linnavaki`) luetaan merkistä. |
| Harhautus | `SeikkailuEsineet` (heitto, kaato), `SeikkailuVartijat.Aani` | Esineen `aani_m` datasta. |
| Kiinnijäänti | `SeikkailuVartijat.Ote/Vie`, `Tyrma`, `SeikkailuTyrma` | Tyrmän kolme muunnelmaa; merkit `istuu:pelaaja-tyrma`, `ovi:tyrma*`, `ilmarako:tyrma`. Nimikonventio on yleinen. |
| Tarkistuspisteet | `SeikkailuVartijat` | Portaalit (osan vaihto) + turvallinen piilo; anteeksianto (helpotus). |
| Tallennus | `SeikkailuTallennus`, `SeikkailuTallentaja` | Muoto on yleinen (tarkistus, laukku, avatut ovet, arvoitus-avaimet, vihjetasot, kiinnijäämiset). |
| Vihjeportaat | `Vihjeet`, `SeikkailuVihjeet` | Tasot 1–3 ja jumiajastin ovat yleisiä. Kohteet: ks. luku 4. |
| Kontekstitoiminnot | `SeikkailuEsineet.Toiminto`, `SeikkailuKasittely`, `KasittelyVeto` | Verbit poimi, heitä, laske, aseta, irrota, kaada, pue, avaa, kiinnitä, kiipeä, raavi, käännä ja katkaise; käsittely käsin vedolla (NUI). |
| Yleiset mekaniikat | `MOsa` (`Kiipeily`, `Kilpilukko`, `Tiilet`, `LukittuOvi`) | Ote-kiipeily puuskineen ja lyhtyineen, kääntölukko, raaputtaen irrotettavat kappaleet, avainovet. |
| Äänet ja repliikit | `SeikkailuAanet`, `SeikkailuRepliikit` | Manifestit; `SoitaTaiVara`; mikseri (`Voima.Repliikit`, `Voima.Saa`). |
| Tietokerros | `Tietokerros`, `SeikkailuTietokerros` | Kortit huoneittain ja loppukortit. Huonejako: ks. luku 4. |
| Venesaapuminen | `Venesaapuminen`, `SeikkailuVene` | Reitti `vene:*`-merkeistä, nousu `nousu:<id>`. |

## 4. Olavinlinna-kohtaista

| Mitä | Missä | Miksi kohdesidonnainen |
|---|---|---|
| Kappelin valoarvoitus ja kohtaus (E3) | `SeikkailuKappeli`, `KappelinArvoitus`, `VoudinKierros`, `SeikkailuKynttilat` (saumat, luukku) | Käsikirjoitus E3; tila-id `kappeli`, merkit `ovi:kappeli-alku`, `reitti:kappalainen-*`, `reitti:vouti-*`. |
| Voudin sali | `SeikkailuSali`, `VoudinKiista` | `istuu:vouti`, `seisoo:aitan-hoitaja`, `esine:kulho-poydalle`, keittokulho. |
| Komero ja arkku | `SeikkailuKomero`, `Komero` | `tiili:komero-*`, `esine:arkku-komero` (kansi, kilpi-1/2). |
| Pako | `SeikkailuPako`, `Pako` | Vaiheketju kello → köysilasku → kallio → K4 → uinti → köysi → K5; merkit `koysi:krampi-komero`, `reitti:pako-*`, `kamera:K4/K5`, `vene:pako`. |
| Huonejako | `SeikkailuTietokerros.PaatteleHuone`, `MVihjeet` | Osa → huone 1–10 kovakoodattuna (`vesiportti` = 2, `palatsi` = 6, `muurikaytava` = 7/8 korkeuden mukaan …). |
| Vihjekohteet | `SeikkailuVihjeet` (1–5), `MVihjeet` (6–10) | Merkkinimet huoneittain. |
| Riidan ikkuna | `SeikkailuVartijat.Riita` | `portinvartija`, repliikit `soutaja-2`, `portinvartija-riita-*`, osat `vesiportti`/`ulkoalue`. |
| Erikoissäännöt nimillä | `SeikkailuVartijat` | `Odottavat` = {`ranta`, `seisoo-ranta-vartija`}, `NaamioEiKelpaaOsa` = `muurikaytava`, `Uppoutunut` = seisoo `harja*`. |
| Erikoisesineet nimillä | `SeikkailuEsineet` | `liinanyytti` (+ kalkki, pateeni, liuskekivi), `kirja`, `tarjotin`, `koysikieppi`, `avainrengas`, `arkku*`; `Alttari`. |
| Kokin kolahdus | `DioraamaSovitin.KokkiKuuleeKolahduksen` | Keittiön kokki-repliikki. |
| M-tilan avaimet | `MTila` | `m-kulho`, `m-koysi`, `m-tiilet`, `m-kilpi-*`, `m-arkku`, `m-kello`, `puettu:*`. |
| Orkestrointi | `DioraamaSovitin` | Vene → nousu → kappeli → vartijat; `KappeliPaalle` aina; kappelin loppu → huone 6 jos pako on datassa. |
| Kiinnitetty paketti | `PelattavaPala` | Yksi hash (Olavinlinna). |
| Repliikkitunnukset | eri luokat | `vartija-*`, `portinvartija-*`, `kokki-*`, `vouti-*`, `kiista-vouti-hoitaja` …; nimeämistapa (`<rooli>-<tilanne>-<n>`) on yleinen, sisältö ei. |

## 5. Ehdotus: mitä irrotetaan ja arvio

| # | Irrotus | Työ | Arvio |
|---|---|---|---|
| 1 | **Kohteen kuvaus `seikkailu.json`** (kävelykansioon LR:n viennissä): huoneet (osa → huone, korkeusrajat, nimet), aloitus (`vene` / `kävely` / `merkki`), lopun nousu (huone, kamera), naamion alueet, odottavat reitit, kokin tapaiset "kuulee kolahduksen" -roolit. | Lukija Ytimeen + testit, korvaa kovakoodatut kartat (`PaatteleHuone`, `NaamioEiKelpaaOsa`, `Odottavat`). | 4 h |
| 2 | **Merkkien kentät nimien sijaan:** `uppoutunut: true`, `laukkuun: true`, `kiinnitys: "koysi:sakara"`, `kannettava` / `puettava` (jo), `rooli: "riita"`. | `SeikkailuEsineet`/`SeikkailuVartijat` lukevat kentät; LR lisää kentät Olavinlinnan dataan samalla. | 3 h + LR 1 h |
| 3 | **Yhteinen arvoitusrajapinta** (`IArvoitus`: tunnus, `Teko`, `Vaihe`, `Valmis`, `Kirjoita`/`Lue`, vihjekohde vaiheelle): kappeli, sali, komero ja pako toteuttavat. `SeikkailuTallentaja` kerää kaikilta (`arvoitus:<id>`), ja `MTila` sulautuu siihen. | Ydin-rajapinta, neljä sovitusta, jatko tallennuksesta yleiseksi, LS2:n jumimalli rajapinnan päälle. | 6 h + LS2 3 h |
| 4 | **Vihjekohteet dataksi** (`vihje:<huone>-<vaihe>-N` merkit tai `seikkailu.json` huoneittain), arvoituksille rajapinnasta. | `SeikkailuVihjeet` + `MVihjeet` yhdeksi. | 2 h + LS2 1 h |
| 5 | **Kohtausikkunat yleisiksi** (riita, kiista, kurkistus = "hahmo kääntyy X s:ksi, näkö muuttuu, repliikkiketju"): yksi `Kohtausikkuna`-ydin datalla. | Riita ja kiista sen päälle. | 3 h |
| 6 | **Orkestrointi omaksi luokaksi** `SeikkailuOhjaaja` (pois `DioraamaSovitin`:sta): aloitus, pelaaja, osat päälle, loppu, jatko. | Siirto + savutesti automaattisesti (ajurit). | 4 h |
| 7 | **Kiinnitetty paketti kohteittain** (`PelattavaPala` rakennus → hash, versio). | Pieni. | 1 h |
| 8 | **Testit ja simulaatio kohteittain** (kultaiset `<rakennus>-<versio>-*`, ajurit parametrisiksi). | LS2 ja LS1. | LS2 2 h + LS1 2 h |
| 9 | **Dokumentti LR:lle:** kävelydatan sopimus (merkkilajit, kentät, nimikonventiot, `seikkailu.json`). | Siirtoseppä + LR. | 2 h + LR 1 h |

**Yhteensä:** Siirtoseppä noin 25 h, LS2 noin 6 h, LS1 noin 2 h, LR noin 2 h. Kriittinen polku on 3 → 4 → 6, noin kaksi
työpäivää; muut rinnakkain. Riski: Olavinlinnan kulku muuttuu refaktoroinnissa. Suoja: LS1:n läpipeluuajuri ja LS2:n
jumimalli ajetaan jokaisen vaiheen jälkeen (vain automaattiset testit).

## 6. Mitä seuraava kohde tarvitsee joka tapauksessa (irrotuksesta riippumatta)

- **LR:** kävelydata (osat, törmäys ja navi, merkit: `reitti:pelaaja-N`, `partio:*` profiileineen, `piilo:*`, `pinta:*`,
  esineet glb:nä), hahmot, tilat ja kiinnitettävä hash.
- **Käsikirjoitus ja pelattavuusmalli** (Päätoimittaja): huoneet, arvoitukset, kohtaukset, repliikit (luvalla).
- **Pelikoodari:** äänimanifesti (CC0/PD), tietokerros.
- **Siirtoseppä:** arvoitukset ja kohtaukset luokkina rajapinnan päälle, huonejako ja vihjeet dataan.
- **LS2/LS1:** huonesimulaatio, jumimalli ja läpipeluuajuri kultaisilla.

Arvio uudelle kohteelle irrotuksen jälkeen: koodi 2–4 päivää kohteen arvoitusten määrästä riippuen (Olavinlinnassa
neljä isoa arvoitusta ja kymmenen huonetta). Ilman irrotusta jokainen kohde kopioisi Olavinlinnan erikoisnimiä ja
huonekarttoja, ja virheet toistuisivat.
