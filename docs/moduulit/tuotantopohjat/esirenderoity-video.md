# Tuotantopohja: esirenderöity video

*(Projektiseppä 19.10.2026, PT:n tilaus. Raamattu 4.21 ESIRENDERÖITY VIDEO ja VIDEO VALMIINA ENNEN HETKEÄ (omistaja 19.10.2026
klo 17.25–17.29), 2.19 LÖYTÖHETKI VIDEONA, 2.105 LENTO VIDEONA, 2.159 UNI VIDEONA. Tähän on koottu Codexin tilaukset
(posti 4e62c3b21 ja 5d4f8bfea), Natiivi-UI:n löytövideon kytkentä (304b84312) ja `codex-3d-toimitus.md`; uusia sääntöjä ei ole.
Jos tämä ja Raamattu ovat ristiriidassa, Raamattu voittaa. Pohjan muutokset hyväksyy PT.)*

**MUUTOS 19.10.2026 klo 18.25 ja 18.29 (omistaja, Raamattu 4.21 KUKA TEKEE ja 2.105 SAVU VIDEOSSA):** raketti, valas ja uni kuvataan pelin omasta Unity-kohtauksesta kuva kerrallaan täydellä laadulla (Claude: oma video-laatutaso, savun puhelinrajat pois, Unity Recorder tai oma tallennin). Tämän pohjan Codex/Blender-kulku koskee enää vain aarteen löytöhetkeä. Codexin rakettikokeilu 665–667/670 pysäytetty (posti 34f60ff35).

**Tavoitteen muoto (Raamattu 4.21, omistaja 19.10.2026 klo 15.32):** ennen tilausta tavoite määritellään yhtä selvästi kuin grafiikassa havainnekuvalla. Tässä putkessa: GRAFIIKKA havainnekuva tai mallikuva (aarre: hyväksytty mallikuva, jonka valoon ja materiaaleihin videon ruutua verrataan); KAMERA kuvakäsikirjoitus (raketti, uni: kohtaukset aikaleimoineen, esim. "0–3 s sytytys ja pölypilvi, kamera alustan tasolla"); ÄÄNI mallinäyte ja lyhyt kuvaus, jos videolla on ääniraita (9.11); KÄYTTÖLIITTYMÄ kuvakaappaus, johon videon päälle tulevat tekstit, mittarit ja havainnekuva-merkintä on piirretty. Tavoite liitetään Codexin tilaukseen. Omistajalle tuodaan vain uudet asiat ja makuvalinnat (esim. ensimmäinen kokeilu); muut tavoitteet hyväksyy PT.

Pohja kattaa kohtaukset, joissa ei tarvita vuorovaikutusta ja joissa laatu ratkaisee: aarteen löytöhetki, raketin lento ja
isoisän uni (Raamattu 4.21). Järjestys: Kolme veljestä → raketti → uni; raketti alkaa vasta, kun aarrevideo toimii pelissä.
Pohja ei kata 3D-mallien tekoa (`codex-3d-toimitus.md`) eikä kertojan tekstiä ja ääntä (`kertojan-teksti-ja-aani.md`).

## 1. Tuotantoputki ja roolit

```
PT: tavoite (havainnekuva / kuvakäsikirjoitus) + tilaus Codexille postilaatikkoon
  → Codex: Blender + Cycles pelin omista malleista → KEVYT ESIKATSELU heti → PT
  → PT (ja ensimmäisellä kerralla omistaja): esikatselu hyväksytty
  → Codex: TÄYSI LAATU öisin / kuorman salliessa → toimituskansio + posti
  → vastaanotto (luku 4): koneelliset tarkistukset + täysikokoiset ruudut + silmukka
  → ämpäri (vie-paketti.sh) → Natiivi-UI: pelikytkentä (luku 5) → simutodisteet → juna
```

| Vaihe | Rooli | Tulos |
|---|---|---|
| 0. Tavoite | PT | Havainnekuva tai kuvakäsikirjoitus + UI-kuvakaappaus (tavoitteen muoto) |
| 1. Tilaus | PT → Codex | Posti `posti/paatoimittaja-codex-<aihe>-<pvm>.md`, luvun 2 kohdat |
| 2. Esikatselu | Codex | Pieni resoluutio, vähän näytteitä, toimitetaan heti |
| 3. Täysi laatu | Codex | Pysty + vaaka, HEVC 10-bit, < 30 MiB / versio, renderöinti öisin |
| 4. Vastaanotto | Natiivi-UI (PT 19.10.2026; toistaa videon pelissä) | Luvun 4 tarkistukset läpi, kuvaparit PT:lle |
| 5. Kytkentä | Natiivi-UI | Esilataus, puskurointi, toisto, UI-tekstit videon ajan mukaan |

## 2. Codexin tilausmuoto

Tilaus kirjoitetaan postilaatikkoon numeroituna listana kuten 4e62c3b21 ja 5d4f8bfea. Jokaisessa tilauksessa:

1. **Tausta ja omistajan sanat:** päätöksen kellonaika ja sanatarkka lainaus, Raamatun kohta (4.21 + aiheen kohta).
2. **Tavoite:** havainnekuva tai kuvakäsikirjoitus liitteenä (tavoitteen muoto).
3. **Lähde:** pelin omat mallit Blenderiin polkuineen (esim. `proto-3d/_valmiit/iss-raketti-v3/lahde/raketti3.blend`) tai
   hyväksytty Tripo-malli. Liekki, savu, pöly, meri ja roiske Blenderin simulaatioilla. **Ei uusia Tripo-generointeja ilman
   omistajan lupaa** (määrä kortille PT:n kautta).
4. **Renderöinti:** Blender + Cycles, oikeat materiaalit (esim. spinellin taittuminen, timantin dispersio, helmiäiskiilto,
   kullan heijastus). Silmukaksi tarkoitettu video on **saumaton**: ensimmäinen ja viimeinen ruutu jatkuvat ilman nykäystä
   (aarre: yksi kierros noin 8–10 s).
5. **Kaksi versiota:** **PYSTY (päätapa)** iPhone-rajauksella 1179×2556 tai sen suhteessa, ja **VAAKA** iPadille. Peli täyttää
   ruudun rajaamalla (cover), joten tärkeä sisältö pidetään kuvan keskialueella. Poikkeus vain tilauksen omalla rivillä
   (rakettikokeilu 17.32: vain pysty, omistaja katsoo puhelimella).
6. **Pakkaus:** HEVC 10-bit (Main 10), MP4, kevyt rakeisuus (ei raitoja pimeään, välke pysyy puhtaana); noin 5–10 Mt /
   versio, **ehdoton yläraja 30 MiB**. Applen soittimille MP4:n HEVC-tunniste `hvc1` (ffmpeg `-tag:v hvc1`).
7. **Ei tekstejä videoon:** ei tekstityksiä, mittareita, logoja eikä havainnekuva-merkintää; ne tulevat käyttöliittymästä
   videon ajan mukaan (Raamattu 4.21).
8. **Ääni:** puhe ja musiikki ääniraidalla (4.21). Tilaus sanoo erikseen, onko videossa ääntä; kokeiluissa ei ääntä (5d4f8bfea). Ääniraidan kokoaa Äänittäjä videon ajan mukaan (kertoja, Pulu, radio, musiikki; ääniportti ja sokkokuuntelu 5.27), ja Natiivi-UI liittää sen videoon vastaanotossa (PT 19.10.2026); Codex toimittaa kuvan ilman ääntä, ellei tilaus muuta sano.
9. **Kuorma:** renderöinti ei saa hidastaa junan Unity-käännöksiä. **Ensin kevyt esikatselu** (pieni resoluutio, vähän näytteitä)
   heti, **täysi laatu öisin** tai kuorman salliessa.
10. **Toimitus PT:lle:** esikatselu ensin; sitten molemmat versiot ja 2–3 täysikokoista ruutua kummastakin (aarre: mallikuva vs.
    videon ruutu, pysty ja vaaka). Blender-tiedosto ja renderöintiasetukset talteen, jotta seuraavat tehdään samalla kaavalla.
    Pelin nykyisen version vertailupätkän ("ennen") tekee Claude-puoli simusta.

Toimituskansio kuten `codex-3d-toimitus.md` luku 5: `<aihe>-v<N>/` (uusi versio = uusi kansio), `SHA256SUMS` kattaa jokaisen
videon ja ruudun, `LAHTEET.md` (mallit, työkalut, lisenssit), `blender/` (tiedosto + asetukset), `ruudut/` (täysikokoiset PNG:t).
Nimet: `<nimi>-pysty.mp4` ja `<nimi>-vaaka.mp4` (aarre: `aarre-<manner>-pysty.mp4`, ämpärissä `videot/aarteet/`).

## 3. Kuvakäsikirjoitus (raketti ja uni)

Pitkissä videoissa (raketti noin 100 s, uni) tavoite on kuvakäsikirjoitus: rivi per kohtaus, aikaleima, kameran paikka ja liike,
mitä näkyy, ja mitä käyttöliittymä näyttää samaan aikaan (tekstitys, mittari T+, kertojan repliikki). Samasta taulukosta tulevat
UI-tekstien ajat (luku 5), joten aikaleimat ovat videon aikaa. Raketin sisältö: Raamattu 2.105 (pölypilvi, meri, valaan
sulava hyppy ja loiskahdus, lopussa häivytys elävään Cupola-näkymään). Unen sisältö: Raamattu 2.159 (unikuvat liikkuvat
hitaasti, aarteet häivytetään esiin aarrevideoiden malleista jos mahdollista).

## 4. Vastaanotto

1. **Koneelliset tarkistukset** jokaiselle versiolle:
   ```
   ffprobe -v error -select_streams v:0 -show_entries stream=codec_name,codec_tag_string,profile,pix_fmt,width,height,duration -of default=nw=1 <video>.mp4
   ```
   Odotus: `codec_name=hevc`, `codec_tag_string=hvc1`, `profile=Main 10`, `pix_fmt=yuv420p10le`, pysty `width < height`,
   vaaka `width > height`, kesto tilauksen mukaan. Koko `stat -f %z <video>.mp4` alle 31 457 280 tavua (30 MiB). `shasum -a 256 -c SHA256SUMS` täsmää.
2. **Täysikokoiset ruudut:** alusta, keskeltä ja lopusta (esim. `ffmpeg -ss 4 -i <video>.mp4 -frames:v 1 keski.png`), avataan
   täysikokoisina eikä pienestä esikatselusta (Raamattu 9.11, muisti pt-kuvan-tarkistus-taysikokoisena). Aarteessa mallikuva ja
   videon ruutu rinnakkain, pysty ja vaaka. Kuvateksti omalla raidallaan kuvan ylä- tai alapuolella, ei kuvan päällä. Katso
   materiaalit (taittuminen, kiilto), raidat pimeässä, tekstien ja logojen puuttuminen, keskialueen rajaus.
3. **Saumaton silmukka:** ensimmäinen ja viimeinen ruutu talteen ja niiden ero verrataan kahden peräkkäisen ruudun eroon:
   ```
   ffmpeg -v error -i <video>.mp4 -vf "select=lt(n\,2)" -fps_mode passthrough eka%d.png
   ffmpeg -v error -sseof -0.5 -i <video>.mp4 -update 1 vika.png
   ffmpeg -i eka1.png -i eka2.png -lavfi ssim -f null -
   ffmpeg -i vika.png -i eka1.png -lavfi ssim -f null -
   ```
   Saumassa (vika → eka1) SSIM on samaa luokkaa kuin peräkkäisillä ruuduilla (eka1 → eka2); selvästi pienempi arvo = nykäys.
   Lisäksi silmukka katsotaan pelissä kahdesti ympäri (luku 5).
4. **Hylätty:** yksi viesti PT:lle (mikä kohta, ruudun polku), PT välittää Codexille. Hylätty ei mene ämpäriin eikä junaan.

## 5. Pelikytkentä (Natiivi-UI)

Malli on aarteen löytövideo `Assets/Matkakirja/UI/AarreVideo.cs` (304b84312); uudet videot käyttävät samaa rakennetta eivätkä
tee omaa soitinta (UI-POHJAT, Raamattu kohta 2: puuttuva pohja → kysy PT:ltä).

- **Toisto:** Unityn VideoPlayer → RenderTexture → UI-elementin tausta (cover) olemassa olevan koko ruudun pohjan alimpana
  kerroksena; 3D lepää videon ajan (`Ruudunpaivitys.KokoSivu`). Versio näytön suunnan mukaan (pysty päätapa, vaaka), vaihto kesken
  toiston, jos laite kääntyy.
- **Esilataus levylle:** video ladataan kokonaan laitteelle pelin alussa (`Esilataa`, `persistentDataPath/videot`); buildin
  kopio `StreamingAssets/mukana` voittaa. Lataus on sama kaikilla verkoilla: ei verkkotyyppiehtoja eikä kokorajoja.
- **Prepare ennen hetkeä:** soitin puskuroidaan (`VideoPlayer.Prepare`) ennen kohtauksen alkua (aarre: visan auetessa,
  `Valmistele`; raketti: latauskuvan aikana), jotta toisto alkaa heti eikä pätki (omistaja 17.29). Valmisteltu soitin vapautetaan,
  jos hetkeä ei tullut (`Vapauta`). Muisti vai levy on NUI:n valinta; löytövideossa levy.
- **Alku ilman nappia:** raketin lento alkaa itsestään, kun video on valmis; käynnistysnappia ei ole, latauskuvassa vain
  laukaisupaikan nimi (2.105).
- **UI-tekstit videon ajan mukaan:** tekstitys, mittarit (raketti: T+ kumpaankin reunaan), luettelon sivu ja diplomi (aarre:
  muutaman sekunnin jälkeen silmukan päälle) sekä havainnekuva-merkintä (kuvaraidan Havainnekuva-tyyli) ajoitetaan soittimen
  aikaan (`VideoPlayer.time`), ei omaan ajastimeen, jotta ne pysyvät tahdissa myös, jos alku viivästyy. Ajat kuvakäsikirjoituksesta.
- **Loppu:** silmukka jatkuu, kunnes pelaaja jatkaa (aarre); raketissa häivytys elävään Cupola-näkymään.
- **Simutodisteet:** alku heti ilman mustaa välähdystä, kääntö vaihtaa version, silmukka kahdesti ympäri ilman nykäystä, tekstit
  ajallaan; kuvapari tai lyhyt video PT:lle. Laitekierros vain yöjunissa (Raamattu 9.11).

## 6. Valmiin työn tarkistuslista

- [ ] Tavoite tilauksen liitteenä: havainnekuva tai kuvakäsikirjoitus aikaleimoineen + UI-kuvakaappaus; PT hyväksynyt.
- [ ] Tilauksessa luvun 2 kohdat 1–10; ei uusia Tripo-generointeja ilman omistajan lupaa.
- [ ] Kevyt esikatselu nähty ja hyväksytty ennen täyttä laatua; täysi laatu renderöity öisin tai kuorman salliessa.
- [ ] Pysty ja vaaka (ellei tilaus toisin sano): HEVC Main 10, `hvc1`, `yuv420p10le`, kumpikin alle 30 MiB, `SHA256SUMS` täsmää.
- [ ] Videossa ei tekstejä, mittareita, logoja eikä havainnekuva-merkintää.
- [ ] Täysikokoiset ruudut alusta, keskeltä ja lopusta; aarteessa mallikuva vs. videon ruutu, pysty ja vaaka rinnakkain.
- [ ] Saumaton silmukka: SSIM-vertailu ja katselu pelissä kahdesti ympäri.
- [ ] Pelissä: esilataus levylle, Prepare ennen hetkeä, toisto alkaa heti, versio vaihtuu käännöstä, UI-tekstit videon ajan mukaan.
- [ ] Simutodisteet PT:lle; Blender-tiedosto ja renderöintiasetukset talteen seuraavia varten.
- [ ] Opit kirjattu tämän pohjan opit-osioon (luku 7).

## 7. Opit ja retrospektiivi

*(Tyhjä. Ensimmäiset kirjattavat: Kolme veljestä -löytövideo ja rakettivideon kokeilu 10 s + 3 s, 19.10.2026.)*
