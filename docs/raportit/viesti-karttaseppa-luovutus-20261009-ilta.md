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
