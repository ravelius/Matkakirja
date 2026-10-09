# Linnanrakentajan luovutus 9.10.2026 iltayö (tekoälypinnat, vouti v4, KL v3c, Riddarholmen v2c)

Edellinen luovutus: `viesti-linnanrakentaja-luovutus-20261009-ilta.md`. Aloitusviesti on ajan tasalla.

## Valmiit tänään (PT:n kuittaamat)

- **MetaHuman-vouti v4** on peilissä `52825516ed687fd3` (blender af2f13bfbff521a7, haara linnanrakentaja-linna-v45b 5b1c57031).
  - Tiedostot: `hahmot/vouti-1500-mh.glb` + 11 astcm, uusina niminä. `faceit` jäi pakettiin, koska `mh_vouti.py` lukee siitä asun.
  - Huppu: kallistus 4°, kapeampi, etureuna taakse. Olkasuojan yläosa seuraa 60 % `clavicle_l`:ää.
  - Siirtoseppä todensi pelissä ja kytkee junaan 173. v45b-worktree on poistettu, ja haara on originissa.
- **KL v3c** on kansiossa `kuninkaanlinna-v1/glb` ja v3b kansiossa `glb-v3b/`.
  - Risaliitin AO on korjattu: isot hiekkakivipinnat 2 m:n ruudukkoon, ja kauko-AO:sta on pois seinänsuuntaiset säteet.
  - Katon saumat kulkevat lappeen suuntaan.
  - LS2 teki v6h:n, ja omistaja hyväksyi sen peliin.
- **Riddarholmen v2c**: tornin tiili on sävytetty valokuvan mukaan (tekstuuri 222/148/94). PT kuittasi. Vienti v6i:n mukana.

## Kesken: tekoälypinnat (PT:n järjestys: ND → KL → Olavinlinna)

1. **Karttaseppä ajaa ComfyUI:n.** Yöajo on `tekoalypinnat/aja-yo*.log`, ja tulokset tulevat polkuun
   `/Volumes/T7 4TB/Matkakirja-karttaseppa/tekoalypinnat/tulokset/<nd|kl>_<näkymä>_v2.png`.
   - Valmiina ovat `nd_etela_v2` ja `kl_etela_v2`.
   - ND:n katot, pohjoinen, lansi, apsis ja spiira ajetaan KL:n jälkeen. Katot kaatui aiemmin puuttuvaan `ikkunat.png`:hen, ja se on
     korjattu.
   - **Älä aja ComfyUI:ta rinnakkain.**
2. **Kun ND:n kaikki näkymät ovat valmiit:**
   1. Aja `zsh _valmiit/kaupunkipinnat-v1/lahde/tekoaly_koko.zsh nd v2 <ulos>` (takaisin, kohdistus, projektio lod0–2, maa mukana).
   2. Tarkista renderöimällä (malli: `scratchpad nd_render.py`, kamerat etelä vino ja lähi).
   3. Vie uuteen versiokansioon: ND v10.
   4. Pyydä LS2:lta pelikuva valokuvan rinnalle (v6i, yhdessä KL:n ja Riddarholmen v2c:n kanssa).
   5. Vertailu PT:lle.
3. **KL:** Karttaseppä tekee G3-jälkikäsittelyn (`kokoa.py`).
   - Rappaus 226,219,201 → 153/146/131, paneelit lukitaan, ja kupari erotellaan `pohja.png`:n vihreästä.
   - v2:ssa tumma sokkeli ja hiekkakivi tasoittuivat vaaleaksi, joten lukitus tarvitaan.
   - Lopuksi `tekoaly_koko.zsh kl <tunniste>`.
4. **Olavinlinna:**
   - Seinä 1:n syöksytorvi on tasoitettu kuoreen `linna-laatu/ulkokuori-v25-koe/` (3 LOD-tasoa, ei viety). Ohjeet:
     `olavinlinna-codex-ohje-v25/seina1/tekoaly/`, ja putki on pyyhitty reunoista.
   - Seinien 2–5 syötteet ovat kansioissa `olavinlinna-codex-ohje/seina<n>/tekoaly/`.
   - Atlakseen projisointi: Blenderissä `kuori_projisoi.py -- <seinä> <kehyskuva RGBA> <ulos-atlas.jpg>` (8k).
   - Vienti tehdään myöhemmin: uusi kuori + atlas → ASTC (8k, 4k, 2k + hämärä) → uusi Olavinlinna-paketti.
   - Seinän 2 keltainen rapattu rakennus odottaa PT:n päätöstä.

## Lisäys 9.10. klo 20 (PT: seinän 2 keltainen rakennus pois 1499-kuoresta)

- Seinän 2 julkisivu (kehys x 1480–3140, y 1760–3560) on tasoitettu kuoreen `ulkokuori-v25-koe`
  (`kuori_tasoita.py --taso-alue --molemmat --pois 1980 2320 2900 3480`, kaariportti jätetty). Merkitty TULKINNAKSI, koska Siirtosepän
  mukaan historialla ei ole tähän lähdettä.
- Ohjeet v25: `olavinlinna-codex-ohje-v25/seina1` ja `seina2`. Reunoista on pyyhitty syöksytorvi (s1) ja julkisivun sisäreunat
  (s2). **Jos tekoaly_syotteet.py ajetaan uudelleen, pyyhinnät on tehtävä uudestaan** (koodi on kamera.json:n "huom"-kentässä).
- Karttaseppä on saanut seinän 2 kehotteen ja kiellon.
- **Vienti:** 1499-kuori (v25) ja nykyasu (v24, drone-loppukuva) tarvitsevat pelissä kumpikin oman tiedostonsa. Sovi Siirtosepän kanssa,
  miten peli valitsee kuoren.

## Työkalut (`_valmiit/kaupunkipinnat-v1/lahde/`)

- **`tekoaly_syotteet.py <näkymä> [--pxm 25 --ulos <kansio>]`** tuottaa:
  - syvyys16, reunat (geometria), ikkunat (aina olemassa), luokat, maski, pohja ja kamera.json
- **`tekoaly_palat.py`**: 1024²-palat, limitys 192, img2img. Denoise 0,5 oli liian matala, ja Karttaseppä ajaa 0,7.
- **`tekoaly_takaisin.py <näkymä> <tulos> <tunniste> [--syote <kansio>] [--vertaa kuva nimi]`**: RGBA täyteen kehykseen ja reunamittaus.
  Canny-mittari on heikko pehmeillä kuvilla, joten katso kuvat itse.
- **`projisoi.py`**:
  - `--lahde tekoaly` lukee uusimman `kohdistetut/*_tekoaly_*`-kuvan.
  - `--lod 1|2` käyttää samaa atlasta (näkyvyystoleranssi 1,5 m, UV rajattu suorakaiteeseen).
  - Maa on oletuksena mukana (`--ei-maata` poistaa sen).
- **`kuori_tasoita.py`**: ulokkeen tasoitus glb:ssä paikallaan, jatkuva kuvaus ja normaalit. **`kuori_projisoi.py`**: atlakseen vienti.
- **`kuninkaanlinna.py`**:
  - `KL_LODIT=""` ja `KL_ESI` ohjaavat ajoa ja esikatselukansiota.
  - `KL_SYVYYS`: syvyyskuvat esikatselukameroista.
  - `KL_MATERIAALI`: materiaali-ID + ikkunamaski (Workbench, tarkat sRGB-värit, lähitaso 20 m).
- **`syvyys.leivo`** lisäasetukset: `kauko_min_cos`, `kauko_naytteet` ja `ruudukko_isot`.

## Opit

- Tekoälyn ortokuva osuu malliin ilman vääntöä, koska ohjaus tulee samasta kehyksestä. Rajoite on resoluutio (1 Mpx = 8 px/m).
- Kaukainen AO: seinänsuuntaiset säteet ja harvat kärjet tuottavat läiskiä. Ruudukko + säteiden kulmaraja korjaa.
- Workbench-maskeissa 0,1 m:n lähitaso aiheuttaa z-taistelua kaukaa, joten käytä 20 m:ä.
- Fotogrammetrian kuoressa kolmioiden kiertosuunta on sekalainen, joten n·v-testi ei kerro takapinnoista mitään.
- Kevennetyt LOD-tasot eivät läpäise lod0:n syvyyskuvan 0,25 m:n näkyvyystestiä, joten LOD-tasoille käytetään löysempää toleranssia.
