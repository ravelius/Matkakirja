# Karttasepän luovutus 9.10.2026 ilta (noin 18.50, PT:n nollaus 71 %)

## 1. VALMIS 23.14: tekoälypintojen yöajo (T7)

**Tila 23.14:** kaikki ajettu, ja GPU on vapaa (ComfyUI PID 12915 joutilaana). Tulokset ovat LR:llä: KL v2 (5 näkymää), ND v3 (6 näkymää, LR:n muoto v10, ppm 26,75), Olavinlinnan seinät 1–5 v1 ja katot s6 v1 (palat). Katoissa tornien kartiot ovat harmaat ja liuskekiven näköiset, ja pitkässä katossa on täpliä. Uusintaehdotus on lähetetty LR:lle. Jatkoskriptit `aja-yo2…7.sh`. **Olavinlinnan katot (00.10):** v2 = paanukehote, v3 = tile 0,1/0,15 (pohjan peltikartiot periytyivät), v4 = LR maalasi koillisen kartion pohjaan, **v4s = lopullinen** (`savy2.py`: kylläisyys 0,5 ja kattojen keskiarvo 115/105/95, LR). Piippulaatikot ovat mallissa oikeita, ja ne saavat jäädä. Tauko Natiivisepän mittausikkunan ajaksi kesti 21.40–22.13 (STOP + STOP_NYT, jatko aja-yo7).

**PÄIVITYS 18.59: v1 pysäytetty, nyt ajossa `aja-yo2.sh` (tunniste v2).** LR:n palakokeen mukaan denoise 0,5 / tile 0,4 tuotti käytännössä suurennoksen, joten v2:ssa palat ajetaan denoise 0,7 / tile 0,28 / reunat 0,9 (`palat.py` = LR:n tekoaly_palat.py + `--tile-voima`/`--palakansio`, palat `palat-v2/`), ND:n koko-vaiheessa on lyijykehote ja kiellossa "dark bands, shadow under balcony". Vanha versio on `aja-nakymat-v1.py`. Pysäytys ilman killiä: `touch STOP_NYT` → pinta.py päättyy heti (koodi 3); `touch STOP` = tauko mallien välissä. aja-yo2 poistaa molemmat alussa. Loki sama (`ALKU v2` … `YÖAJO v2 VALMIS`).

- `aja-yo.sh` (PID 48086, setsid, PPID 1) odottaa, että LR:n ND-etelän palakoe (`tekoaly_palat.py`, PID 96175) ja kaikki `pinta.py`-ajot päättyvät. Sen jälkeen se ajaa
  `aja-nakymat.py`: **ND** etela, katot, pohjoinen, lansi, apsis, spiira → **KL** etela, ita, lansi, pohjoinen, katot (tunniste v1).
- Polut (kaikki T7:llä, `/Volumes/T7 4TB/Matkakirja-karttaseppa/tekoalypinnat/`):
  - loki `aja-yo.log`: "ALKU", "NÄKYMÄ VALMIS <malli> <näkymä> <polku> <s>", "VIRHE ND/KL", "YÖAJO VALMIS"
  - tulokset `tulokset/<nd|kl>_<näkymä>_v1.png` (kamera.json ulos_px, LR projisoi) ja `_koko_v1.png` (1 Mpx)
  - työkansiot `tyo/<nd|kl>_<näkymä>/{tekoaly,tekoaly-pala}` (kopio LR:n `_valmiit/<malli>-v1/codex-ohje/<näkymä>/`-syötteistä, palat täällä)
  - **tauko:** `touch …/tekoalypinnat/STOP` (pysähtyy mallien välissä). Jatkoa varten valmiit näkymät ohitetaan (koko-tiedosto ja palat jäävät talteen).
- ComfyUI-palvelin PID 12915 (127.0.0.1:8189, irrotettu). Sammutus vaatii killin → vain omistajan luvalla. LR ei aja rinnakkain.
- Arvio: noin 20 palaa × 80 s per iso näkymä, 11 näkymää, useita tunteja.

## 2. Tekoälyputki (omistaja hyväksyi kokeen; PT hyväksyi F:n ja G3:n)

- Asennus T7:llä (14 Gt): ComfyUI + venv (Python 3.14, PyTorch 2.14.1, MPS). Mallit: SDXL base 1.0 (RAIL++-M), xinsir ControlNet union promax (Apache-2.0), IP-Adapter plus ViT-H ja CLIP-ViT-H (Apache-2.0), fp16-VAE-korjaus (MIT). Vain safetensors. `LAHTEET.md`, `LUEMINUT.md` (komennot ja mittaustaulukot).
- Työkalut (T7 ja PR #4256 `tools/tekoalypinnat/`):
  - `pinta.py`: syvyys + reunat (+ viite) → kuva. Valinnat --tile, --pohja/--denoise (img2img), --reunat-loppu, --valaistus pilvinen (oletus). Välimuistit ja temp T7:lle.
  - `viivat.py`: puhdas viivaohjaus = syvyysreunat + ikkunoiden ääriviivat (LR:n `<nimi>_ikkunat.png`, muuten värintunnistus).
  - `savy.py`: kanavittainen kerroin lineaarisessa valossa materiaalimaskin mediaanista kohteeseen (KL rappaus 153/146/131, LS2:n valokuvamittaus).
  - `kokoa.py`: F (valokuva) + L (renderi pohjana, denoise 0,45, tile 0,6) → lukitut materiaalit L:stä tai renderistä, muu F:stä, sitten sävy materiaaleittain. `--siivous` 1 puhtailla maskeilla.
- Tulokset (KL perspektiivi, `_tyo/karttaseppa/tekoalypinnat-koe/`): G3 = ikkunat 99,5/99,0 % ±3 px, rappaus 153/146/131, siipikatot vihreät, paneelit renderistä, kiilto 0. PT:n kuvat `pt-*-G3.jpg`.
- **Kesken KL-ajon jälkeen:** jälkikäsittely luokat.png:llä (LR:n LUOKAT): seina 226,219,201 → savy 153/146/131. Paneeli 52,62,92 lukitaan pohjasta. Katto 138,154,160 sisältää sekä pellin että kuparin, joten kupari erotellaan pohja.png:n vihreästä (tai pyydä LR:ltä ortomateriaali-ID).
- **ND:** vertailu nykyinen | Codex | uusi (kulma ja versio kuvaan) PT:lle, kun LR on projisoinut ND:n. PT: julkisivut noin 25 px/m, katot sileäksi harmaaksi lyijyksi pystysaumoin, ei tummia raitoja.
- Jonon lopussa: Olavinlinnan seinä 1 (LR:n `olavinlinna-codex-ohje-v25/`, syöksytorvi poistettu), sitten viisi pahinta kohtaa 1499-asussa.

## 3. Ämpäriin viety tänään (Julkaisija)

- talvi/v1 (MGRS-ruututasaus, ei Iberiaa) 13.45. LS2 kytki junaan 173.
- vesi index-v4 (pienet altaat pois) 07.40, **index-v5** (40 km, Tukholma kauko2 48 m) 17.10. LS2 kytkee Natiivisepän ehdoilla.
- kaukomaa/v1 (S2-kesä z11–z13, Pariisi ja Tukholma) 17.23, **kaukomaa/yo-v1** (Black Marble × WorldCover) 18.03.
- **Julkaisijalla viennissä:** kaukomaa/v1p ja yo-v1p (LS2:n paikallinen tiling scheme, sisältö tavulleen sama). Kerro LS2:lle, kun ne ovat valmiit.

## 4. Muut tämän päivän toimitukset

- **KADUT (05.1x, LS1:lle):** `_tyo/karttaseppa/kadut-20261010/kadut-{pariisi(10 km),tukholma(15 km)}.json` (ajosuunnat, kaistat, nopeus, liittymät; oneway=-1 käännetty). Työkalu T7 `vesimaski/kadut.mjs`. Tukholman maanpinta: Lantmäteriet CC0, mutta vaatii Geotorget-tunnuksen (omistaja).
- **Olavinlinna 05.4x:** s11 v2 (pienet kivet) → **v2t** = sävy 100/101/101 (LR mittasi atlaksen naapurit). Kallio s12, s14 ja s16 v1 → **v1s** = sävy 110/104/96 (savy2, kylläisyys 0,7). s13 ja s15 ei kalliota. LR: s5 v3b ja s7–s10 atlaksessa v46u.
- **VESIVÄRI v2 (AJOSSA 05.3x →, ETA ~07.40, LS2:lle):** B11-pintaheijastus vähennetään pikseleittäin (LS2), BOA-offset päätetään veden B11:stä, 25 kuvaa/alue/kausi. Sameus = väli [SWIR-korjattu, BOA].
- **VESIVÄRI (AJOSSA 05.16 →, LS2:lle):** T7 `vesimaski/vesivari.mjs` (S2 L2A Earth Search, SCL 6, Seine 4, Mälaren 3, Saltsjön 3 ikkunaa, 2019–2025), loki `vesivari/ajo.log`. Valmistuttua `python3 -I vesivari-kaudet.py vesivari/vesivari-raaka.json <_tyo/karttaseppa/vesivari-20261010/vesivari-kaudet.json>`, jossa kaksoiskappaleiden BOA-offset korjataan. Kd490 KD2 ei ole luotettava sameassa vedessä, joten käytetään sameus_fnu:ta. Vienti ilmakeha/… tai vesi/… sovitaan LS2:n kanssa.

- **s5 v3/v3b (05.0x):** v3 (img2img 0,5) jäi yliteräväksi, joten **v3b suositeltu** (v1:n värit + v3:n luminanssin ylipäästö). LR valitsee.
- **PILVET (05.1x, LS2:lle):** `_tyo/karttaseppa/pilvet-kaudet-20261010/pilvet-kaudet.json`. METAR IEM 2016–2025 (Orly, Bromma): peitto, pohja, matala-osuus, paksuus (arvio) kaupunki × kausi. **ÄMPÄRISSÄ 04.58** (ilmakeha/pilvet-v1/, paksuus = ilmastollinen arvio LS2:n mukaan). Data T7 `pilvet-metar/`.

- **KORKEUS v1 ÄMPÄRISSÄ 04.40:** kartta/korkeus/v1/maa-pariisi{.json,-lahi.png} (4 m, LS1:n koodi maa-dtm-175). Tukholma odottaa PT:n päätöstä.
- **MAANPINTA (04.4x, LS1:lle):** `_tyo/karttaseppa/maa-20261010/` (LUEMINUT.md): Pariisi IGN MNT 2 m (+ kauko), Tukholma GLO ilman rakennuksia (pieni hyöty, Lantmäteriet tunnuksen jälkeen). Työkalu T7 `vesimaski/korkeus-maa.mjs`. pp v1 ja co v2 on projisoitu (LR, portti 0) ja ovat LS2:lla.

- **YÖVALOT VAIHE 2 (04.3x, LS1:lle):** `yovalot-20261010/yovalot-ikkunat-<id>.png` (LS1:n muoto: 1536², 8 m/px, R = osuus, G = K) + `yovalot-rakennukset-<id>.json`. Työkalut T7 `vesimaski/rakennusvalot.mjs` ja `.py`. LUEMINUT.md, vaihe 2.

- **RH v3 (03.2x):** `rh-v3.py`: julkisivut v2 + katot ja kupolit katot_v2:n patinalla + spiira spiira_v2:sta (värinsiirto luokan 7 ja z:n mukaan). LR projisoi tekselitasolla, ja glb:t ovat LS2:lla. LR:n havainto: tiili tuli tummaksi (84/48/46 vs valokuvan 234/173/124), joten pidä sävyt lähempänä valokuvaa.
- **PARIISI (04.3x):** ortho_ohje-kopioon lisätty mallit pp (Préfecture) ja co (vain obeliski), `codex-ohje-pp/` ja `codex-ohje-co/` (co tekoaly-pala 64 px/m). **pp v1** valmis (LR hyväksyi sävyt). **co v2** suositeltu (v1 oli pinkki ja sileä; v2: reunat 0,45/0,5, tile 0,15, kultainen pyramidion). LR projisoi.
- **VESI ALUENOSTO (03.1x, PT + LS2 e15f16e18):** `_tyo/karttaseppa/vesi-aluenosto-20261010/` (index-v6, tukholma5-*): Norrström yhteensä 2,0 m, Strömmen 1,5 m, smoothstep 120 m. LS2:n haara vesi-v6-174 c94c7c1b1 lukee v6:n. Kuvapari LS2:lta, ja vienti Julkaisijalle kuittauksen jälkeen (paketti tehdään silloin, LAHTEET pohjana v5).

- **RIDDARHOLMEN (PT 01.xx: B, LR:n OK):** ohjauskuvat `proto-3d/_tyo/karttaseppa/ohje-riddarholmen/` (ortho_ohje.py-kopio + malli rh, `ortho_ohje.diff`; merkinnät ja syötteet LR:n työkaluilla muuttamattomina). Tekoälypinnat `tulokset/rh_<näkymä>_v1/v2.png`. **v2 suositeltu** (tumma tiili). Spiira otetaan spiira_v2:sta ja katot sekä kupolit katot_v2:sta, koska julkisivuissa ne jäivät väärän värisiksi. Projisoinnin rh-tapaus (projisoi_tekseli.py, tekoaly_koko.zsh) on LR:llä. Valmis 02.50, /free tehty.
- **Olavinlinna s7–s11 v1 (04.50, LR:n v46t-syötteet) ja s5 v2:** `aja-olavinlinna.py` (s ≥ 7 = v46t, omat kehotteet). s5 v2 on yliterävä, joten LR:lle suositeltu v1 tai v3 (denoise 0,5). LR:n vastaus odottaa. 225°:n tiili kuuluu LR:n päätökseen.

- **YÖVALOT (PT 10.10. 00.2x, LS1:lle):** `proto-3d/_tyo/karttaseppa/yovalot-20261010/` (LUEMINUT.md). OSM-PBF → katuvalot, valaistut tiet ja sillat, kohteet, kentät ja rantavalot (heijastukseen), maa_m omasta korkeusmallista. Työkalut T7 `vesimaski/yovalot.mjs` ja `yovalot-rikasta.py`. Valmis 00.30. KL-, ND- ja Olavinlinna-pintoja ei tehdä (PT), ja KL:n sävyt odottavat omistajaa (LS2 v6j).

- **Kaukomaa (PT päätös B, 9.10. ilta):** S2-kaukomaata (v1p, yo-v1p) ei tuoda Googlen laattojen näkymään ("samassa näkymässä ei muuta karttaa"). Ämpärin kaukomaa-tiedostot jätettiin paikalleen, eikä niitä kytketä. Aluskerroksen täyte hoidetaan utu-taulukoilla.
- **ND ODOTTAA (PT 20.xx):** LR korjaa ND:n muodon, ja ohjauskuvat uusitaan. `tekoalypinnat/ODOTA_ND` saa aja-nakymat.py:n ohittamaan ND:n (aja-yo3 päättyi tyhjänä). Vanhat ND-työkopiot ovat kansiossa `tyo/_nd-vanhat-syotteet-20261009/`. Kun LR ilmoittaa: `rm ODOTA_ND` ja aja ND kaikki näkymät **tunnisteella v3** (nd_etela_koko_v2 on olemassa, joten v2 ohittaisi koko-vaiheen). nd_etela_v2 jää vertailuksi.
- **Yöajon jono 20.0x:** KL v2 → ND-loput v2 (aja-yo3) → Olavinlinnan seinät 1–5 (aja-yo4, `aja-olavinlinna.py`) → Olavinlinnan katot s6 palat (aja-yo5). Tulokset ovat LR:lle.

- **Utu (PT 18.5x):** `_valmiit/ilmakeha-aerosoli-v1-vienti-20261009` (8 settiä → `ilmakeha/aerosoli-v1/{pariisi,tukholma}/{kausi}/`, LS2:n polku) on Julkaisijalla viennissä. Julkaisija ilmoittaa LS2:lle, kun polku antaa 200.

- LR: Vasa-museon lähdepaketti (`_tyo/karttaseppa/vasamuseet/`, mastoja ei OSM:ssä).
- LS1: liput-<id>.json (lipputangot) ja kohteet-<id>.json:iin kirkot, kahvilat ja hallit (junaan 173).
- LS2: ilmakehätaulukot kaupungeittain ja vuodenajoittain AERONETista (`_tyo/karttaseppa/ilmakeha-aerosoli-20261009/`). LS2:n utu-A/B jonossa, vienti vasta hyväksynnän jälkeen.
- Kaukomaa v2 (vuodenajat) jätettiin tekemättä, koska pallossa ei ole vuodenaikaa (PT samaa mieltä).
- PR:t #3105 ja #3108 suljettu (vanhentuneet). PR #4256 (kaikki tämän päivän työkalut) on auki Julkaisijan junaan. Worktree on poistettu, ja haara on pushattu.

## 5. Odottaa muita

- Geotorget-tunnus (omistaja): tilaa Markhöjdmodell grid 1+ ja Laserdata skog (CC0) sekä Ortofoto vain, jos se on maksuton. Tunnukset `LM_GEOTORGET_USER/PASS` tiedostoon `~/.matkakirja-avaimet-koodaus.zsh`. Lataus STAC-rajapinnasta api.lantmateriet.se/stac-hojd/v1 ja stac-bild/v1.
- Notre-Damen LiDAR HD -pistepilveä ei pyydetä nyt (PT).
