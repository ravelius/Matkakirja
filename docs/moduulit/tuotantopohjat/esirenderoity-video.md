# Tuotantopohja: esirenderöity video

*(Projektiseppä 19.10.2026, PT:n tilaus. Raamattu 4.21 ESIRENDERÖITY VIDEO, KUKA TEKEE ja VIDEO VALMIINA ENNEN HETKEÄ (omistaja
19.10.2026 klo 17.25–17.29 ja 18.25), 2.19 LÖYTÖHETKI VIDEONA, 2.105 LENTO VIDEONA ja SAVU VIDEOSSA (18.29), 2.159 UNI VIDEONA.
Tähän on koottu omistajan päätökset 18.25 ja 18.29 (KK:n tavoitekuvaus), Codexin tilaukset (posti 4e62c3b21 ja 34f60ff35),
Natiivi-UI:n löytövideon kytkentä (304b84312) ja `codex-3d-toimitus.md`; uusia sääntöjä ei ole. Jos tämä ja Raamattu ovat
ristiriidassa, Raamattu voittaa. Pohjan muutokset hyväksyy PT.)*

**MUUTOS 19.10.2026 klo 18.25 ja 18.29 (omistaja, Raamattu 4.21 KUKA TEKEE ja 2.105 SAVU VIDEOSSA):** raketti, valas ja uni kuvataan pelin omasta Unity-kohtauksesta kuva kerrallaan täydellä laadulla (Claude: oma video-laatutaso, savun puhelinrajat pois, Unity Recorder tai oma tallennin). Codexin Blender-kulku koskee enää vain aarteen löytöhetkeä. Codexin rakettikokeilu 665–667/670 pysäytetty (posti 34f60ff35). Pohja on siksi jaettu kahdeksi kuluksi: **A PELISTÄ KUVATTU** (luku 3) ja **B CODEX BLENDER** (luku 4).

**Tavoitteen muoto (Raamattu 4.21, omistaja 19.10.2026 klo 15.32):** ennen työtä tavoite määritellään yhtä selvästi kuin grafiikassa havainnekuvalla. Tässä putkessa: KULKU A (raketti, valas, uni) pelikuva nykyisestä pelistä simusta, koska video näyttää samalta kuin peli mutta sulavammalta ja tarkemmalta, sekä kuvakäsikirjoitus (luku 5); savulle lyhyt kuvaus (luku 3.2). KULKU B (aarre) hyväksytty mallikuva, jonka valoon ja materiaaleihin videon ruutua verrataan. Molemmissa ÄÄNI mallinäyte ja lyhyt kuvaus, jos videolla on ääniraita (9.11), ja KÄYTTÖLIITTYMÄ kuvakaappaus, johon videon päälle tulevat tekstit, mittarit ja havainnekuva-merkintä on piirretty. Omistajalle tuodaan vain uudet asiat ja makuvalinnat (esim. ensimmäinen kokeilu); muut tavoitteet hyväksyy PT.

Pohja kattaa kohtaukset, joissa ei tarvita vuorovaikutusta ja joissa laatu ratkaisee: aarteen löytöhetki, raketin lento ja
isoisän uni (Raamattu 4.21). Järjestys: Kolme veljestä → raketti → uni; raketti alkaa vasta, kun aarrevideo toimii pelissä.
Pohja ei kata 3D-mallien tekoa (`codex-3d-toimitus.md`) eikä kertojan tekstiä ja ääntä (`kertojan-teksti-ja-aani.md`).

## 1. Kaksi kulkua ja roolit

| | A PELISTÄ KUVATTU | B CODEX BLENDER |
|---|---|---|
| Kohtaukset | raketti (koko lento ja lyhyt versio), valas, uni | vain aarteen löytöhetki (ei vielä pelissä) |
| Kuva syntyy | pelin omasta Unity-kohtauksesta: sama kamera-ajo, mallit, valot ja savu kuin pelissä | Blender + Cycles Tripo-mallista (Kolme veljestä: Tripo tasan 3) |
| Tekijä | Claude: kohtaus ja video-laatutaso Valoseppä tai Pelikoodari (PT nimeää; 17.32-kokeilu Valoseppä), tallennin Työkaluseppä | Codex PT:n tilauksesta |
| Renderöi | Mac, kuva kerrallaan täydellä laadulla, kiinteä ruutunopeus | Codexin kone |
| Vastaanotto ja kytkentä | Natiivi-UI (PT 19.10.2026) | Natiivi-UI (PT 19.10.2026) |
| Ääniraita | Äänittäjä kokoaa, Natiivi-UI liittää (PT 19.10.2026) | sama |

Molemmat kulut päätyvät samaan muotoon (luku 2), samaan vastaanottoon (luku 6) ja samaan pelikytkentään (luku 7).

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
   Natiivi-UI liittää sen videoon vastaanotossa (PT 19.10.2026).
5. **Kuorma:** renderöinti ei saa hidastaa junan Unity-käännöksiä. **Ensin kevyt esikatselu** tai lyhyt kokeilu, **täysi laatu
   öisin** tai kuorman salliessa (4.21: pitkät renderöinnit öisin).
6. **Nimet ja kansio:** `<nimi>-pysty.mp4` ja `<nimi>-vaaka.mp4` (aarre: `aarre-<manner>-pysty.mp4`, ämpärissä `videot/aarteet/`).
   Toimituskansio kuten `codex-3d-toimitus.md` luku 5: `<aihe>-v<N>/` (uusi versio = uusi kansio), `SHA256SUMS` kattaa jokaisen
   videon ja ruudun, `LAHTEET.md` (mallit, työkalut, lisenssit), `ruudut/` (täysikokoiset PNG:t).

## 3. KULKU A: pelistä kuvattu (raketti, valas, uni)

```
PT: tekijän nimeäminen + tavoite (pelikuva simusta + kuvakäsikirjoitus)
  → Valoseppä / Pelikoodari: kohtaus Unityssä samana kuin pelissä + video-laatutaso (3.2)
  → Työkaluseppä: tallennin (Unity Recorder tai oma kuva kerrallaan -tallennin, 3.1)
  → Mac renderöi kuva kerrallaan kiinteällä ruutunopeudella → HEVC 10-bit (luku 2)
  → vertailu nykyiseen peliin simusta → PT → KK katsoo → omistaja (kokeilu)
  → vastaanotto (luku 6) → ämpäri (vie-paketti.sh) → Natiivi-UI: pelikytkentä (luku 7) → simutodisteet → juna
```

### 3.1 Tallennin

- Mac renderöi kuvan kerrallaan täydellä laadulla kiinteällä ruutunopeudella, esimerkiksi Unity Recorderilla; video ei siis riipu
  reaaliaikaisesta ruutunopeudesta eikä koneen kuormasta.
- Unity Recorder (ilmainen Unityn paketti, ei osto) puuttuu projektin `Packages/manifest.json`-tiedostosta, joten se lisätään tai
  korvataan omalla kuva kerrallaan -tallentimella (Työkaluseppä).
- Pysty ja vaaka kuvataan samasta kamera-ajosta; tallennin kirjoittaa kuvat, ja ne koodataan luvun 2 muotoon.

### 3.2 Video-laatutaso (omistaja 18.29: "Pelin savu täysillä")

- Videoajolle oma laatutaso, joka **ei koske puhelinpeliä**. Resoluutio, reunanpehmennys, savu ja vesi saavat olla raskaampia
  kuin puhelimen reaaliajassa.
- **Savu:** `RakettiSavu.cs`:n iPad-kuorman hiukkasrajat pois, hiukkasia moninkertaisesti, jolloin savu on paksua ja yhtenäistä
  eikä yksittäisiä läiskiä näy; flipbook-savukuvat suurempia ja tarkempia; liike-epäterävyys ja pehmeät reunat. Liekki valaisee
  savua sisältä ja aurinko sivulta, kuten pelissä nyt.
- **Tavoite savulle:** savu vyöryy alustalta paksuna pilvenä, kiertyy ja leviää. Lähikuvassa ei saa näkyä litteitä kortteja eikä
  toistuvia kuvioita. Kaikki muu näyttää samalta kuin pelissä.
- **Valas, roiske ja meri** saavat myös täydet asetukset.
- **Blender-savu liitettynä** samalla kamera-ajolla vain omistajan uudella päätöksellä: jos savu ei kokeilussa näytä aidolta,
  KK tuo omistajalle seuraavan askeleen. Sitä ei tehdä ilman päätöstä.

### 3.3 Kokeilu ensin, sitten koko video

1. **17.32-kokeilu pelistä:** 10 s laukaisu (sytytys, pölypilvi, irtoaminen ja nousu, taivas tummuu) ja 3 s valaan hyppy
   (hyppy, hetki ilmassa, sulava loiskahdus ja roiske). Vain pysty, ei ääntä, alle 30 MiB. Toimitukseen pätkät ja vertailu
   nykyiseen peliin simusta. Kulku PT → KK katsoo → omistaja.
2. **Koko lento** alustalta Cupolaan (ensimmäinen 60–90 s, myöhemmillä lennoilla videon lyhyt versio, Ohita aina; 2.105) vasta,
   kun omistaja on nähnyt kokeilun. Lopussa häivytys elävään Cupola-näkymään.
3. **Uni** pelin omasta unikohtauksesta (unikuvat, liike ja häivytykset), kun teksti, kertoja ja kuvat ovat valmiit (2.159).
4. Codexin rakettikokeilua ei jatketa: esikatselu ja kohtaukset jäävät talteen (posti 34f60ff35).

## 4. KULKU B: Codex Blender (vain aarteen löytöhetki)

Tilaus kirjoitetaan postilaatikkoon numeroituna listana kuten 4e62c3b21. Jokaisessa tilauksessa:

1. **Tausta ja omistajan sanat:** päätöksen kellonaika ja sanatarkka lainaus, Raamatun kohta (4.21 + 2.19).
2. **Tavoite:** hyväksytty mallikuva liitteenä (tavoitteen muoto).
3. **Lähde:** hyväksytty Tripo-malli (Kolme veljestä: Tripo tasan 3). **Ei uusia Tripo-generointeja ilman omistajan lupaa**
   (määrä kortille PT:n kautta).
4. **Renderöinti:** Blender + Cycles, oikeat materiaalit (spinellin taittuminen, timantin dispersio ja säkenöinti, helmiäiskiilto,
   kulta heijastaa kynttilänvaloa); kynttilänvalossa pehmeät varjot ja hillitty syväterävyys.
5. **Saumaton silmukka:** aarre kääntyy hitaasti yhden kierroksen noin 8–10 sekunnissa; ensimmäinen ja viimeinen ruutu jatkuvat
   ilman nykäystä.
6. **Muoto:** luku 2 (pysty ja vaaka, HEVC 10-bit, alle 30 MiB, ei tekstejä, ei ääntä).
7. **Kuorma:** kevyt esikatselu (pieni resoluutio, vähän näytteitä) heti, täysi laatu öisin tai kuorman salliessa.
8. **Toimitus PT:lle:** esikatselu ensin; sitten molemmat versiot ja kuvaparit täysikokoisina (mallikuva vs. videon ruutu, pysty ja
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
   - **A:** videon ruutu ja nykyisen pelin ruutu simusta rinnakkain samasta kohdasta: sama kuvakulma, valot ja tunnelma. Savun
     lähikuvassa ei litteitä kortteja eikä toistuvia kuvioita.
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
4. **Hylätty:** yksi viesti PT:lle (mikä kohta, ruudun polku); PT välittää tekijälle (A: Claude-rooli, B: Codex). Hylätty ei mene
   ämpäriin eikä junaan.

## 7. Pelikytkentä (Natiivi-UI, A ja B)

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
  muutaman sekunnin jälkeen silmukan päälle) sekä havainnekuva-merkintä (kuvaraidan Havainnekuva-tyyli; vain kulku B) ajoitetaan
  soittimen aikaan (`VideoPlayer.time`), ei omaan ajastimeen, jotta ne pysyvät tahdissa myös, jos alku viivästyy. Ajat
  kuvakäsikirjoituksesta.
- **Loppu:** silmukka jatkuu, kunnes pelaaja jatkaa (aarre); raketissa häivytys elävään Cupola-näkymään.
- **Simutodisteet:** alku heti ilman mustaa välähdystä, kääntö vaihtaa version, silmukka kahdesti ympäri ilman nykäystä, tekstit
  ajallaan; kuvapari tai lyhyt video PT:lle. Laitekierros vain yöjunissa (Raamattu 9.11).

## 8. Valmiin työn tarkistuslista

Yhteiset (A ja B):
- [ ] Tavoite määritelty (tavoitteen muoto) ja PT hyväksynyt; UI-kuvakaappaus videon päälle tulevista teksteistä.
- [ ] Kevyt esikatselu tai kokeilu nähty ennen täyttä laatua; täysi laatu renderöity öisin tai kuorman salliessa.
- [ ] Pysty ja vaaka (ellei tehtävä toisin sano): HEVC Main 10, `hvc1`, `yuv420p10le`, kumpikin alle 30 MiB, `SHA256SUMS` täsmää.
- [ ] Videossa ei tekstejä, mittareita, logoja eikä havainnekuva-merkintää.
- [ ] Täysikokoiset ruudut alusta, keskeltä ja lopusta; silmukoissa SSIM-vertailu ja katselu pelissä kahdesti ympäri.
- [ ] Pelissä: esilataus levylle, Prepare ennen hetkeä, toisto alkaa heti, versio vaihtuu käännöstä, UI-tekstit videon ajan mukaan.
- [ ] Simutodisteet PT:lle.
- [ ] Opit kirjattu tämän pohjan opit-osioon (luku 9).

Kulku A (pelistä kuvattu):
- [ ] Kohtaus on pelin oma: sama kamera-ajo, mallit, valot ja savu kuin pelissä; ei uusia kuvakulmia.
- [ ] Video-laatutaso ei muuta puhelinpeliä (puhelimen hiukkasrajat ja asetukset ennallaan).
- [ ] Kuva kerrallaan kiinteällä ruutunopeudella (Unity Recorder tai Työkalusepän tallennin).
- [ ] Videon ja nykyisen pelin ruudut rinnakkain simusta; savun lähikuvassa ei litteitä kortteja eikä toistuvia kuvioita.
- [ ] Koko lento vasta, kun omistaja on nähnyt 17.32-kokeilun; Blender-savu vain omistajan uudella päätöksellä.

Kulku B (Codex Blender, aarre):
- [ ] Tilauksessa luvun 4 kohdat 1–8; ei uusia Tripo-generointeja ilman omistajan lupaa.
- [ ] Mallikuva ja videon ruutu rinnakkain täysikokoisina, pysty ja vaaka.
- [ ] Blender-tiedosto ja renderöintiasetukset talteen seuraavia aarteita varten.

## 9. Opit ja retrospektiivi

*(Tyhjä. Ensimmäiset kirjattavat: Kolme veljestä -löytövideo (B) ja rakettivideon 17.32-kokeilu pelistä 10 s + 3 s (A), 19.10.2026.
Taustaksi: Codexin Blender-rakettiesikatselu 19.10. näytti alustan eri suunnasta kuin peli, koska kohtaus rakennettiin uudelleen;
siksi omistaja päätti 18.25, että pelissä jo olevat kohtaukset kuvataan pelistä.)*
