# Tuotantopohja: esirenderöity video

*(Projektiseppä 19.10.2026, PT:n tilaus; läpikäyntikorjaus PT 20.10.2026 klo 23.5x. Raamattu 4.21 ESIRENDERÖITY VIDEO, KUKA TEKEE ja
VIDEO VALMIINA ENNEN HETKEÄ (omistaja 19.10.2026 klo 17.25–17.29 ja 18.25), 2.19 LÖYTÖHETKI VIDEONA, 2.105 LENTO VIDEONA ja SAVU
VIDEOSSA (18.29), 2.159 UNI VIDEONA, 9.11 SIMU HARVOIN, 10.1–10.2 julkaisu. Tähän on koottu omistajan päätökset 18.25, 18.29, 18.55 ja
19.03 (loki `docs/raamattu-loki/paatokset-2026-10.md`), Codexin tilaukset (posti 4e62c3b21 ja 34f60ff35), Natiivi-UI:n löytövideo
(proto 35ce21076, 304b84312), Työkalusepän videotallennin (fb01ad493, 924891faa), Valosepän video-laatutaso (247367757) ja
`codex-3d-toimitus.md`. Pohja ei tee uusia sääntöjä. Jos tämä ja Raamattu ovat ristiriidassa, Raamattu voittaa. Pohjan muutokset
hyväksyy PT.)*

**MUUTOS 19.10.2026 klo 18.25 ja 18.29 (omistaja, Raamattu 4.21 KUKA TEKEE ja 2.105 SAVU VIDEOSSA):** raketti, valas ja uni kuvataan pelin omasta Unity-kohtauksesta kuva kerrallaan täydellä laadulla (Claude: oma video-laatutaso, savun puhelinrajat pois, oma kuva kerrallaan -tallennin). Codexin Blender-kulku koskee enää vain aarteen löytöhetkeä, koska sitä ei ole pelissä 3D-kohtauksena. Codexin rakettikokeilu 665–667/670 on pysäytetty (posti 34f60ff35). Pohja on siksi jaettu kahdeksi kuluksi: **A PELISTÄ KUVATTU** (luku 3) ja **B CODEX BLENDER** (luku 4). Myöhempää päätöstä, joka kumoaisi kulun B, ei ole (loki tarkistettu 20.10.2026 klo 23.5x; 20.10. linja "pelissä jo oleva kohtaus kuvataan pelistä" on sama kuin 18.25).

**Tavoitteen muoto (Raamattu 4.21, omistaja 19.10.2026 klo 15.32):** ennen työtä tavoite määritellään yhtä selvästi kuin grafiikassa havainnekuvalla. KULKU A (raketti, valas, uni): ruutu nykyisestä pelistä samasta kohdasta (Macin Unity-esikatselu iPhonen ruutukoossa), koska video näyttää samalta kuin peli mutta sulavammalta ja tarkemmalta, sekä kuvakäsikirjoitus (luku 5); savulle lyhyt kuvaus (luku 3.2). KULKU B (aarre): hyväksytty mallikuva, jonka valoon ja materiaaleihin videon ruutua verrataan. Molemmissa ÄÄNI mallinäyte ja lyhyt kuvaus, jos videolla on ääniraita (9.11), ja KÄYTTÖLIITTYMÄ kuvakaappaus, johon videon päälle tulevat tekstit, mittarit ja havainnekuva-merkintä on piirretty. Omistajalle tuodaan vain uudet asiat ja makuvalinnat (esim. ensimmäinen kokeilu); muut tavoitteet hyväksyy PT.

**Napit, tyylit ja toimintalogiikka (omistaja 20.10.2026 klo 22.58 ja 23.25; Raamattu 2.70, 2.201 ja kohta 2 UI-POHJAT):** pohja ei kuvaa omia nappeja, värejä eikä sisään- ja ulostuloa. Kaikki videon ympärillä olevat osat (Ohita, Jatka, ☰, ⚙, tekstityskaistale, äänitasot, kortit) tulevat tyylikirjasta (`tools/tyylikirja.mjs`, `tyylikirja/`) ja yhteisistä osista. Käytä ensin yhteistä osaa; uusi osa tehdään yhteiseksi kaikille, ja puuttuva pohja kysytään PT:ltä.

**Koko työ ideasta junaan (omistaja 20.10.2026 klo 22.53, Raamattu 4.21):** pohja kattaa työn ideasta junaan. Työ alkaa tavoitekuvasta. Uusissa asioissa (ensimmäinen video kustakin kulusta ja makuvalinnat) omistaja näkee tavoitekuvan ja valmiin rinnakkain KK:n kautta ennen junaa; muut valmiit hyväksyy PT samalla rinnakkaisnäkymällä (4.21: "muut tavoitteet hyväksyy Päätoimittaja").

**Yöajo (omistaja 19.10.2026 klo 18.55 ja 19.03, Raamattu 4.21 "pitkät renderöinnit öisin"):** omistajan sanoin "tehdään kaikki muutkin videot vasta yöllä". Kaikki videoiden renderöinti, myös kokeilut ja esikatselut, tehdään yöllä ja vain, kun kone on muuten vapaa: juna ja sovitut yön työt menevät edelle (19.03: "ei aloiteta … videoiden renderöintejä jos se hidastaa"). Päivällä tehdään vain kohtauksen, laatutason ja kytkennän koodi.

**Julkaisu:** valmis video menee avoimeen junaan. Lukitus ja TestFlight tehdään vain omistajan pyynnöstä (Raamattu 10.1–10.2).

Pohja kattaa kohtaukset, joissa ei tarvita vuorovaikutusta ja joissa laatu ratkaisee: aarteen löytöhetki, raketin lento ja
isoisän uni (Raamattu 4.21). Järjestys: Kolme veljestä → raketti → uni; raketti alkaa vasta, kun aarrevideo toimii pelissä.
Pohja ei kata 3D-mallien tekoa (`codex-3d-toimitus.md`) eikä kertojan tekstiä ja ääntä (`kertojan-teksti-ja-aani.md`).

## 1. Kaksi kulkua ja roolit

| | A PELISTÄ KUVATTU | B CODEX BLENDER |
|---|---|---|
| Kohtaukset | raketti (koko lento ja lyhyt versio), valas, uni | vain aarteen löytöhetki (3D-kohtausta ei ole pelissä) |
| Kuva syntyy | pelin omasta Unity-kohtauksesta: sama kamera-ajo, mallit, valot ja savu kuin pelissä | Blender + Cycles Tripo-mallista (Kolme veljestä: Tripo tasan 3) |
| Tekijä | raketti ja valas: Valoseppä (omistaja 18.25, video-laatutaso 247367757); tallennin: Työkaluseppä (`Videotallennin.cs`); uni: PT nimeää, kun uni otetaan työhön | Codex PT:n tilauksesta |
| Renderöi | Mac yöllä, kuva kerrallaan täydellä laadulla, kiinteä ruutunopeus | Codexin kone yöllä |
| Vastaanotto ja kytkentä | Natiivi-UI (Raamattu 4.21: "vastaanottaja Natiivi-UI") | Natiivi-UI |
| Ääniraita | Äänittäjä kokoaa (4.21), Natiivi-UI liittää | sama |

Molemmat kulut päätyvät samaan muotoon (luku 2), samaan vastaanottoon (luku 6) ja samaan pelikytkentään (luku 7).

**Tila 20.10.2026 (proto-3d, git):** pääkäännöksessä (BUILD 208, aa1b21b8a) ei ole vielä videokoodia. `AarreVideo.cs` on haarassa
`natiivi-ui/aarrevideo` (35ce21076, 304b84312, 73cbdc576) väliaikaisella testivideolla; `Videotallennin.cs` ja `tyokalut/video-kokoa.sh`
ovat haarassa `tyokaluseppa/videotallennin`; raketin video-laatutaso on haarassa `linssiseppa2/raketti-video-204`. Kolme veljestä
-videota ja rakettikokeilua ei ole vielä hyväksytty.

## 2. Yhteinen videomuoto (A ja B)

1. **Kaksi versiota:** **PYSTY (päätapa)** iPhone-rajauksella 1179×2556 tai sen suhteessa, ja **VAAKA** iPadille. Peli täyttää
   ruudun rajaamalla (cover), joten tärkeä sisältö pidetään kuvan keskialueella. Poikkeus vain tehtävän omalla rivillä
   (17.32-kokeilu: vain pysty, omistaja katsoo puhelimella).
2. **Pakkaus:** HEVC 10-bit (Main 10), MP4, kevyt rakeisuus (ei raitoja pimeään, välke pysyy puhtaana); noin 5–10 Mt /
   versio, **ehdoton yläraja 30 MiB**. Applen soittimille MP4:n HEVC-tunniste `hvc1` (ffmpeg `-tag:v hvc1`).
3. **Ei tekstejä videoon:** ei tekstityksiä, mittareita, logoja eikä havainnekuva-merkintää; ne tulevat käyttöliittymästä
   videon ajan mukaan (Raamattu 4.21).
4. **Ääni:** puhe ja musiikki ääniraidalla (4.21). Kuva toimitetaan ilman ääntä, ellei tehtävä muuta sano; kokeiluissa ei ääntä.
   Ääniraidan kokoaa Äänittäjä videon ajan mukaan (kertoja, Pulu, radio, musiikki; ääniportti ja sokkokuuntelu 5.27), ja
   Natiivi-UI liittää sen videoon vastaanotossa.
5. **Kuorma ja ajoitus:** renderöinti vain yöllä ja vain, kun kone on muuten vapaa (Yöajo yllä); se ei saa hidastaa junan
   Unity-käännöksiä. Ensin lyhyt kokeilu tai kevyt esikatselu, täysi laatu vasta sen jälkeen, kumpikin yöllä.
6. **Nimet ja kansio:** `<nimi>-pysty.mp4` ja `<nimi>-vaaka.mp4` (aarre: `aarre-<manner>-pysty.mp4`, ämpärissä `videot/aarteet/`).
   Toimituskansio kuten `codex-3d-toimitus.md` luku 5: `<aihe>-v<N>/` (uusi versio = uusi kansio), `SHA256SUMS` kattaa jokaisen
   videon ja ruudun, `LAHTEET.md` (mallit, työkalut, lisenssit), `ruudut/` (täysikokoiset PNG:t).

## 3. KULKU A: pelistä kuvattu (raketti, valas, uni)

```
PT: tekijän nimeäminen + tavoite (pelin ruutu Macin Unity-esikatselusta + kuvakäsikirjoitus)
  → päivällä Valoseppä: kohtaus Unityssä samana kuin pelissä + video-laatutaso (3.2)
  → yöllä Mac renderöi Videotallentimella kuva kerrallaan (3.1) → video-kokoa.sh → HEVC 10-bit (luku 2)
  → rinnakkain pelin ruudun kanssa → PT → uusissa asioissa KK → omistaja
  → vastaanotto (luku 6) → ämpäri (vie-paketti.sh) → Natiivi-UI: pelikytkentä (luku 7) → avoin juna
```

### 3.1 Tallennin

- Tallennin on Työkalusepän `Assets/Matkakirja/Kartta/Videotallennin.cs` (fb01ad493, 924891faa). Unity Recorderia ei käytetä:
  se toimii vain editorissa, ja oma tallennin toimii missä tahansa ajossa ilman uutta pakettia manifestiin.
- Kiinteä ruutunopeus (`Time.captureDeltaTime`), joten video ei riipu reaaliaikaisesta ruutunopeudesta eikä koneen kuormasta.
  Jokainen kuva on alikuvien keskiarvo (aito liike-epäterävyys, pehmeät reunat). Käyttöliittymä ei tule videoon.
- Käyttö: peli-komento `video aloita <nimi> [fps] [LxK] [kesto s] [alinäytteet]`, `video lopeta`, `video tila`; valmiina lokiin
  `MATKAKIRJA video: valmis <kansio> <ruutuja>`. Koonti `tyokalut/video-kokoa.sh <kuvakansio>` tekee HEVC 10-bit -videon alle
  30 MiB; viimeinen rivi `VIDEO OK …` tai `VIKA: …`.
- Ajoalusta: Macin Unity-editorin play-tila tai Mac-sovellus. Tallennin toimii myös iPhone-simulaattorissa (`video-kokoa.sh --simu`);
  se on silloin renderöintiä eikä testausta, ja sekin ajetaan yöllä.
- Pysty ja vaaka kuvataan samasta kamera-ajosta.

### 3.2 Video-laatutaso (omistaja 18.29: "Pelin savu täysillä")

- Videoajolle oma laatutaso, joka **ei koske puhelinpeliä** (Valoseppä 247367757: `linssi raketti videolaatu 1|0`). Resoluutio,
  reunanpehmennys, savu ja vesi saavat olla raskaampia kuin puhelimen reaaliajassa.
- **Savu:** `RakettiSavu.cs`:n iPad-kuorman hiukkasrajat pois, hiukkasia moninkertaisesti, jolloin savu on paksua ja yhtenäistä
  eikä yksittäisiä läiskiä näy; flipbook-savukuvat suurempia ja tarkempia; liike-epäterävyys ja pehmeät reunat. Liekki valaisee
  savua sisältä ja aurinko sivulta, kuten pelissä nyt.
- **Tavoite savulle:** savu vyöryy alustalta paksuna pilvenä, kiertyy ja leviää. Lähikuvassa ei saa näkyä litteitä kortteja eikä
  toistuvia kuvioita. Kaikki muu näyttää samalta kuin pelissä.
- **Valas, roiske ja meri** saavat myös täydet asetukset.
- **Blender-savu liitettynä** samalla kamera-ajolla vain omistajan uudella päätöksellä (18.29). Sitä ei tehdä eikä ehdoteta ilman
  syytä; ks. "Omistajalle myöhemmin".

### 3.3 Kokeilu ensin, sitten koko video

1. **17.32-kokeilu pelistä:** 10 s laukaisu (sytytys, pölypilvi, irtoaminen ja nousu, taivas tummuu) ja 3 s valaan hyppy
   (hyppy, hetki ilmassa, sulava loiskahdus ja roiske). Vain pysty, ei ääntä, alle 30 MiB. **Ajoitus:** koodi päivällä,
   renderöinti ensimmäisenä vapaana yönä (18.55); PT katsoo aamulla, ja KK näyttää kokeilun omistajalle seuraavana päivänä
   rinnakkain pelin ruudun kanssa samasta kohdasta. Toimitukseen pätkät ja rinnakkaiset ruudut.
2. **Koko lento** alustalta Cupolaan (ensimmäinen 60–90 s, myöhemmillä lennoilla videon lyhyt versio; ohitus yhteisellä
   Ohita-osalla, 2.105) vasta, kun omistaja on hyväksynyt kokeilun. Lopussa häivytys elävään Cupola-näkymään.
3. **Uni** pelin omasta unikohtauksesta (unikuvat, liike ja häivytykset), kun teksti, kertoja ja kuvat ovat valmiit (2.159).
   Unen uudistus odottaa omistajan uutta suuntaa (omistaja 19.10.: "Se ei tunnu ollenkaan unelta"; KK tuo suunnan myöhemmin),
   joten univideota ei aloiteta ennen sitä.
4. Codexin rakettikokeilua ei jatketa: esikatselu ja kohtaukset jäävät talteen (posti 34f60ff35).

## 4. KULKU B: Codex Blender (vain aarteen löytöhetki)

Tilaus kirjoitetaan postilaatikkoon numeroituna listana kuten 4e62c3b21. Jokaisessa tilauksessa:

1. **Tausta ja omistajan sanat:** päätöksen kellonaika ja sanatarkka lainaus, Raamatun kohta (4.21 + 2.19).
2. **Tavoite:** hyväksytty mallikuva liitteenä (tavoitteen muoto).
3. **Lähde ja lupa:** hyväksytty Tripo-malli. Tripoa käytetään vain omistajan hyväksymä määrä (Kolme veljestä: tasan 3).
   Uusinta on uusi otto, ja uusi otto tarvitsee uuden kortin omistajalta PT:n ja KK:n kautta, vaikka luvasta olisi jäänyt käyttämättä.
4. **Renderöinti:** Blender + Cycles, oikeat materiaalit (spinellin taittuminen, timantin dispersio ja säkenöinti, helmiäiskiilto,
   kulta heijastaa kynttilänvaloa); kynttilänvalossa pehmeät varjot ja hillitty syväterävyys.
5. **Saumaton silmukka:** aarre kääntyy hitaasti yhden kierroksen noin 8–10 sekunnissa; ensimmäinen ja viimeinen ruutu jatkuvat
   ilman nykäystä.
6. **Muoto:** luku 2 (pysty ja vaaka, HEVC 10-bit, alle 30 MiB, ei tekstejä, ei ääntä).
7. **Ajoitus:** kevyt esikatselu (pieni resoluutio, vähän näytteitä) ja sen jälkeen täysi laatu, molemmat yöllä (omistaja 18.55).
8. **Toimitus PT:lle:** esikatselu ensin; sitten molemmat versiot ja kuvaparit täysikokoisina (mallikuva ja videon ruutu, pysty ja
   vaaka). Blender-tiedosto ja renderöintiasetukset talteen (`blender/`), jotta muut aarteet tehdään samalla kaavalla.

Muut aarteet vasta, kun omistaja on hyväksynyt Kolme veljestä -kokeilun (2.19).

## 5. Kuvakäsikirjoitus (raketti ja uni)

Pitkissä videoissa (raketti 60–90 s ja lyhyt versio, uni) tavoite on kuvakäsikirjoitus: rivi per kohtaus, aikaleima, mitä näkyy,
ja mitä käyttöliittymä näyttää samaan aikaan (tekstitys, mittari T+, kertojan repliikki). Kamera-ajo on pelin oma (kulku A), joten
käsikirjoitus kirjaa pelin nykyisen ajon kohdat ja ajat eikä keksi uusia kuvakulmia. Samasta taulukosta tulevat UI-tekstien ajat
(luku 7), joten aikaleimat ovat videon aikaa. Raketin sisältö: Raamattu 2.105 (pölypilvi, meri, valaan sulava hyppy ja
loiskahdus, lopussa häivytys elävään Cupola-näkymään). Unen sisältö: Raamattu 2.159.

## 6. Vastaanotto (Natiivi-UI, A ja B)

1. **Koneelliset tarkistukset** jokaiselle versiolle:
   ```
   ffprobe -v error -select_streams v:0 -show_entries stream=codec_name,codec_tag_string,profile,pix_fmt,width,height,duration -of default=nw=1 <video>.mp4
   ```
   Odotus: `codec_name=hevc`, `codec_tag_string=hvc1`, `profile=Main 10`, `pix_fmt=yuv420p10le`, pysty `width < height`,
   vaaka `width > height`, kesto tehtävän mukaan. Koko `stat -f %z <video>.mp4` alle 31 457 280 tavua (30 MiB). `shasum -a 256 -c SHA256SUMS` täsmää.
2. **Täysikokoiset ruudut:** alusta, keskeltä ja lopusta (esim. `ffmpeg -ss 4 -i <video>.mp4 -frames:v 1 keski.png`), avataan
   täysikokoisina eikä pienestä esikatselusta (Raamattu 9.11, muisti pt-kuvan-tarkistus-taysikokoisena). Kuvateksti omalla
   raidallaan kuvan ylä- tai alapuolella, ei kuvan päällä. Katso raidat pimeässä, tekstien ja logojen puuttuminen, keskialueen rajaus.
   - **A:** videon ruutu ja pelin ruutu samasta kohdasta rinnakkain (pelin ruutu Macin Unity-esikatselusta iPhonen ruutukoossa,
     ei simusta): sama kuvakulma, valot ja tunnelma. Savun lähikuvassa ei litteitä kortteja eikä toistuvia kuvioita.
   - **B:** mallikuva ja videon ruutu rinnakkain, pysty ja vaaka; materiaalit (taittuminen, kiilto).
3. **Saumaton silmukka** (aarre ja muut silmukat): ensimmäinen ja viimeinen ruutu talteen ja niiden ero verrataan kahden
   peräkkäisen ruudun eroon:
   ```
   ffmpeg -v error -i <video>.mp4 -vf "select=lt(n\,2)" -fps_mode passthrough eka%d.png
   ffmpeg -v error -sseof -0.5 -i <video>.mp4 -update 1 vika.png
   ffmpeg -i eka1.png -i eka2.png -lavfi ssim -f null -
   ffmpeg -i vika.png -i eka1.png -lavfi ssim -f null -
   ```
   Saumassa (vika → eka1) SSIM on samaa luokkaa kuin peräkkäisillä ruuduilla (eka1 → eka2); selvästi pienempi arvo = nykäys.
   Lisäksi silmukka katsotaan pelissä kahdesti ympäri (luku 7).
4. **Rinnakkaisnäkymä:** hyväksytty pari (tavoitekuva ja valmis) PT:lle; uusissa asioissa PT antaa sen KK:lle omistajan nähtäväksi
   ennen junaa.
5. **Hylätty:** yksi viesti PT:lle (mikä kohta, ruudun polku); PT välittää tekijälle (A: Claude-rooli, B: Codex). Hylätty ei mene
   ämpäriin eikä junaan.

## 7. Pelikytkentä (Natiivi-UI, A ja B)

Malli on aarteen löytövideo `Assets/Matkakirja/UI/AarreVideo.cs` (haara `natiivi-ui/aarrevideo`, 35ce21076 ja 304b84312; ei vielä
pääkäännöksessä). Uudet videot käyttävät samaa rakennetta eivätkä tee omaa soitinta (UI-POHJAT, Raamattu kohta 2: puuttuva pohja →
kysy PT:ltä).

- **Toisto:** Unityn VideoPlayer → RenderTexture → UI-elementin tausta (cover) olemassa olevan koko ruudun pohjan alimpana
  kerroksena; 3D lepää videon ajan (`Ruudunpaivitys.KokoSivu`). Versio näytön suunnan mukaan (pysty päätapa, vaaka), vaihto kesken
  toiston, jos laite kääntyy.
- **Esilataus levylle:** video ladataan kokonaan laitteelle pelin alussa (`Esilataa`, `persistentDataPath/videot`); buildin
  kopio `StreamingAssets/mukana` voittaa. Lataus on sama kaikilla verkoilla: ei verkkotyyppiehtoja eikä kokorajoja.
- **Prepare ennen hetkeä:** soitin puskuroidaan (`VideoPlayer.Prepare`) ennen kohtauksen alkua (aarre: visan auetessa,
  `Valmistele`; raketti: latauskuvan aikana), jotta toisto alkaa heti eikä pätki (omistaja 17.29). Valmisteltu soitin vapautetaan,
  jos hetkeä ei tullut (`Vapauta`). Muisti vai levy on NUI:n valinta; löytövideossa levy.
- **Alku itsestään:** raketin lento alkaa itsestään, kun video on valmis; käynnistysnappia ei ole (omistaja 17.26–17.28, 2.105).
- **Napit ja tekstit yhteisistä osista:** videon päälle ei tehdä omia nappeja, valikoita eikä tekstipohjia. Ohitus, jatko, ☰ ja ⚙
  sekä sisään- ja ulostulo ovat yhteisiä osia (2.70, 2.201); tekstitys näkyy yhteisellä tekstityskaistaleella, luettelon sivu ja
  diplomi aarteen löytöpohjalla (2.19) ja havainnekuva-merkintä kuvaraidan Havainnekuva-tyylillä (vain kulku B).
- **Ajoitus videon aikaan:** UI-tekstit ja mittarit (raketti: T+) ajoitetaan soittimen aikaan (`VideoPlayer.time`), ei omaan
  ajastimeen, jotta ne pysyvät tahdissa myös, jos alku viivästyy. Ajat kuvakäsikirjoituksesta.
- **Loppu:** silmukka jatkuu, kunnes pelaaja jatkaa yhteisellä jatkonapilla (aarre); raketissa häivytys elävään Cupola-näkymään.
- **Testaus (9.11 SIMU HARVOIN):** automaattiset tarkistukset aina. Simulaattoria käytetään vain ensimmäisessä videokytkennässä,
  koska videon toisto, esilataus ja muisti ovat uutta tekniikkaa: alku heti ilman mustaa välähdystä, kääntö vaihtaa version,
  silmukka kahdesti ympäri ilman nykäystä, tekstit ajallaan; kuvapari tai lyhyt video PT:lle. Seuraavat videot samalla rakenteella
  kulkevat automaattisten tarkistusten ja Macin Unity-esikatselun jälkeen avoimeen junaan, ja omistaja katsoo ne pelistä.
  Simukuvia otetaan lisäksi vain omistajan pyynnöstä. Laitekierros vain yöjunissa.

## 8. Valmiin työn tarkistuslista

Yhteiset (A ja B):
- [ ] Tavoite määritelty (tavoitteen muoto) ja PT hyväksynyt; UI-kuvakaappaus videon päälle tulevista teksteistä.
- [ ] Kokeilu tai kevyt esikatselu nähty ennen täyttä laatua; kaikki renderöinti tehty yöllä koneen ollessa muuten vapaa.
- [ ] Pysty ja vaaka (ellei tehtävä toisin sano): HEVC Main 10, `hvc1`, `yuv420p10le`, kumpikin alle 30 MiB, `SHA256SUMS` täsmää.
- [ ] Videossa ei tekstejä, mittareita, logoja eikä havainnekuva-merkintää.
- [ ] Täysikokoiset ruudut alusta, keskeltä ja lopusta; silmukoissa SSIM-vertailu ja katselu pelissä kahdesti ympäri.
- [ ] Tavoitekuva ja valmis rinnakkain PT:llä; uusissa asioissa omistaja on nähnyt ne KK:n kautta ennen junaa.
- [ ] Pelissä: esilataus levylle, Prepare ennen hetkeä, toisto alkaa heti, versio vaihtuu käännöstä, UI-tekstit videon ajan mukaan.
- [ ] Napit, valikot, tekstitys ja sisään- ja ulostulo yhteisistä osista (2.70, 2.201); ei omia nappeja eikä värejä.
- [ ] Automaattiset tarkistukset vihreät; simulaattori vain ensimmäisessä videokytkennässä, omistajan pyytämissä kuvissa tai yöjunassa.
- [ ] Ääniraita Äänittäjältä (jos videossa on ääni), Natiivi-UI liittänyt sen.
- [ ] Valmis avoimessa junassa; lukitus ja TestFlight vain omistajan pyynnöstä.
- [ ] Opit kirjattu tämän pohjan opit-osioon (luku 9).

Kulku A (pelistä kuvattu):
- [ ] Kohtaus on pelin oma: sama kamera-ajo, mallit, valot ja savu kuin pelissä; ei uusia kuvakulmia.
- [ ] Video-laatutaso ei muuta puhelinpeliä (puhelimen hiukkasrajat ja asetukset ennallaan).
- [ ] Kuva kerrallaan kiinteällä ruutunopeudella Työkalusepän Videotallentimella ja `video-kokoa.sh`:lla.
- [ ] Videon ja pelin ruudut rinnakkain (pelin ruutu Macin Unity-esikatselusta); savun lähikuvassa ei litteitä kortteja eikä toistuvia kuvioita.
- [ ] Koko lento vasta, kun omistaja on hyväksynyt 17.32-kokeilun; Blender-savu vain omistajan uudella päätöksellä.

Kulku B (Codex Blender, aarre):
- [ ] Tilauksessa luvun 4 kohdat 1–8; Tripoa vain hyväksytty määrä, uusinta = uusi kortti.
- [ ] Mallikuva ja videon ruutu rinnakkain täysikokoisina, pysty ja vaaka.
- [ ] Blender-tiedosto ja renderöintiasetukset talteen seuraavia aarteita varten.

## Omistajalle myöhemmin (KK tuo kortilla näytteen kanssa, ei päätetä itse)

1. **17.32-kokeilun hyväksyntä:** 10 s laukaisu + 3 s valas pystynä rinnakkain pelin ruudun kanssa. Kortti vasta, kun kokeilu on
   renderöity yöllä ja PT on hyväksynyt sen. Koko lento alkaa vasta omistajan hyväksynnästä.
2. **Blender-savu liitettynä:** vain jos pelin savu täysillä ei kokeilussa näytä aidolta. Suositus: ei nyt; ensin katsotaan kokeilu.
3. **Kolme veljestä -kokeilu:** videon ruutu mallikuvaa vasten (pysty ja vaaka). Muut aarteet vasta omistajan hyväksynnästä (2.19).

## 9. Opit ja retrospektiivi

- **Kuvaa pelistä, älä rakenna kohtausta uudelleen (19.10.2026):** Codexin Blender-rakettiesikatselu näytti alustan eri suunnasta
  kuin peli, koska kohtaus rakennettiin uudelleen. Siksi omistaja päätti 18.25, että pelissä jo olevat kohtaukset kuvataan pelistä.
- **Videot yöllä (19.10.2026 klo 18.55 ja 19.03):** päivän renderöinnit kilpailivat junan ja juoksupelin kanssa; kaikki videot
  siirrettiin yöhön ja vain koneen ollessa muuten vapaa.
- **Tallennin ilman Unity Recorderia (Työkaluseppä 19.10.2026):** Recorder toimii vain editorissa; oma tallennin toimii kaikissa
  ajoissa. 16-bit PNG vie noin 10 Mt kuvaa kohti, joten oletus on 8-bit kohinalla (13 s × 60 kuvaa ≈ 3 Gt). Simulaattorille
  tarvittiin ReadPixels-varatie ja yhteensopiva syvyysmuoto (924891faa).
- Seuraavat kirjattavat: Kolme veljestä -löytövideo (B) ja rakettivideon 17.32-kokeilu (A).
