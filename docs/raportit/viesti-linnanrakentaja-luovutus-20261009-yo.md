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

## Lisäys 9.10. klo 20.3x (PT: Olavinlinnan 1499-katot jonoon seinien jälkeen)

- `kuori_ohje.py` sai kattonäkymän (seinä 6, `katsoo='alas'`): katot ylhäältä, oikea = itä ja ylös = pohjoinen, 42,5 px/m, kohde |n_z|
  välillä 0,35–0,985 ja y > 6. Ohjeet ovat kansiossa `olavinlinna-codex-ohje-v25/seina6`.
- Kohdemaski on siivottu: avaus 1,5 m, yli 15 m²:n osat ja reunat palautettu raakamaskista (raakamaski on `maskit/*_raaka.png`).
  Tulos: 1 688 m², 5 osaa (tornit, palatsi, pitkä katto, gallerian katto). Muurien harjat on rajattu pois.
- Karttaseppä on saanut paanu- ja lautakehotteen ja kiellon (metalli, vihreä, kupari). Projisointi tehdään `kuori_projisoi.py`:llä kuten
  seinille.

## Lisäys 9.10. klo 21 (PT: voudin kumarrus liian syvä)

- Vouti v4b: `ele_kumarrus` 60 %:iin (lantio → pää 30°). Peilissä Olavinlinna v46k `035562fc890cd285` (blender e94eefb2d2a22fe6).
- Uusi worktree `wt/linnanrakentaja-linna-v45c` (pohja v45b, haara pushattu 7db694814). Poista se, kun Siirtoseppä on kytkenyt.
- faceit-vouti on ennallaan (peli käyttää mh-voutia). Siirtoseppä kertoo, jos sitä tarvitaan.

## SEURAAVA TYÖ: Notre-Damen MUOTOKORJAUS (PT 9.10. klo 21, omistaja: "tuleeko ND:stä hyvä")

PT:n uusi järjestys: ND:n muoto korjataan ensin, sitten uudet ohjauskuvat (`ortho_ohje.py` + `ortho_merkinnat.py` +
`tekoaly_syotteet.py`), ja lopuksi Karttaseppä generoi tunnisteella v3. Ennen pintoja PT:lle vertailukuva (Commons-valokuva | malli)
samasta kulmasta: etelä, pohjoinen, länsi, apsis ja ylhäältä.
- Karttaseppä on ohittanut ND:n jäljellä olevat v2-näkymät. `nd_etela_v2` jää vertailuksi.
- Tarkkuus: lähikuva (omistaja haluaa kameran todella lähelle).
- Kumarrus-vienti on tehty (v46k).

Diagnoosi 9.10.:
1. Viitekuva: `nd-etela/01-Paris-Notre-Dame-cathedral-south-facade-20170527-02` (CC BY 2.0). Vertailu: `scratchpad nd_etela_kuva_malli.jpg`.
   Lähdekoodi: `notre-dame-v1/lahde/notre_dame.py` (730 riviä).
2. **Eteläinen ruusuikkuna ei näy.** `ruusut()` (r. 353) sijoittaa ⌀ 12,8 m:n ruusun z = 24 kohtaan `harjan_akseli(P(79))`:n päihin s0/s1.
   - Ortokuvassa ja renderissä päädyssä näkyy kolme suippoikkunaa (`ikkunat()`), mutta ruusua ei.
   - Ruusu on todennäköisesti päätyseinän takana (P(79):n harja-akselin pää ≠ päätyjulkisivun taso), ja ikkunat peittävät sen.
   - Korjaus: ruusu päätyseinän pintaan, poikkilaivan päätyjen ikkunat pois sen alta. Ruusun alle lasigalleria (claire-voie) ja ylle
     pääty, jossa pieni ruusu tai kolmiosyvennys, ja päädyn pinaakkelit. Pohjoispääty samoin.
3. **Laivan tukikaaret puuttuvat.** `tukikaaret()` (r. 382) tekee vain chevetin ja poikkilaivan kaaret. Laivan molemmille sivuille
   tarvitaan kaksoistukikaaret sivulaivojen yli pilareista ylemmän laivan seinään, joka välissä (kuvassa noin 7 per sivu).
4. **Alaseinät ovat tyhjät.** Sivukappelien suippoikkunat ja tukipilarit puuttuvat (`ikkunat()` vain ylälaivassa).
5. **Länsitornit ovat yksinkertaistetut, ja pyramidikatto on väärin.** Oikeissa torneissa on tasakatto ja kaide.
   - Kummankin tornin julkisivulla on kaksi korkeaa kellotapulin aukkoa ja kimeerien galleria.
   - Länsijulkisivulla on kuninkaiden galleria ja kolme portaalia (`julkisivu()`, r. 452).
   - Länsiruusu on jo koodissa (z 27, r 4,8). Tarkista, näkyykö se.
6. **Spiiran juuri ja patsaat ovat ohuet** (`spiira()`, r. 400). Apostolipatsaat on tehty, mutta niistä puuttuu mittakaava, ja spiiran
   juuren kehä ja pinaakkelit ovat ohuet.
7. Kuoren kaaret ovat jo olemassa. Tarkista niiden mittakaava valokuvaa vasten.
- Järjestys: 2 (ruusut) → 5 (tornit, länsi) → 3 (laivan tukikaaret) → 4 (kappeli-ikkunat) → 6 (spiira).
- Joka vaiheen jälkeen ortho- ja perspektiivivertailu valokuvaan samasta kulmasta (`nd_render.py`-mallilla). Pidä kolmioiden budjetti
  silmällä (lod0, lod1 ja lod2).

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

## Lisäys 9.10. klo 21.3x: ND:n muotokorjaus, vaiheet 2–6 tehty (lähde v10, ei vielä vientiä)

Lähde on `notre-dame-v1/lahde/notre_dame.py` (v10). v9 on tallessa kansioissa `lahde-v9-ennen-muotoa/` ja `glb-v9/`.
Pikaesikatselu: `Blender -b --factory-startup -P lahde/notre_dame.py -- --nopea` (6 s, Workbench, ei maata, puita eikä AO:ta).
- `ND_ULOS=<etuliite>` ja `ND_NAKYMAT=etela,kuva01,...` ohjaavat ajoa, ja näkymät ovat `lahde/nd_nopea.py`:ssä: ortot sekä
  kuva01, lansi_p, lahi_laiva, lahi_kuori, lahi_poikki ja lahi_spiira.
- v9-vertailukuvat: `lahde-v9-ennen-muotoa/notre_dame_v9_nopea.py -- --nopea`. Vertailuarkit: `esikatselu/muotokorjaus/vaihe*.jpg`.

Mitä tehtiin:
- **Vaihe 2, ruusut:** OSM 79:n päät ovat 2 m julkisivun (osa 6) sisällä. `_poikki()` laskee julkisivutason, ja `poikkipaadyt()` +
  `_poikki_alaosa()` tekevät julkisivuun nämä:
  - ruusu ⌀ 12,9 m neliökehyksessä
  - lasigalleria (9 lansettia)
  - portaali ja wimperg
  - päätykolmio 33,4–47 m (pikkuruusu ja krabbit)
  - kulmapinaakkelit 55 m
  Osan 6 ikkunat on ohitettu päädyissä.
- **Vaihe 5, tornit:** osien 7 ja 8 pyramidit on poistettu. `tornin_aukot()` tekee joka sivulle 2 kelloaukkoa (47–63,5 m, 3
  arkivolttia, säleet ja keskipylväs) sekä sivuille lansetit 30–39 m. Huipulla on tasakatto 69 m, kaide ja kulmapinaakkelit 73 m.
  Länsijulkisivun tornien osissa on sokeakaari, kaksoislansetti ja okulus.
- **Vaihe 3, tukikaaret:** syy oli se, että osa 47 (25 m) peitti kaaret.
  - Osa 47 on nyt 21 m (KORVAUS), ja `tribuunin_katot()` tekee pulpettikaton 21 → 24 m.
  - OSM-kaaret kulkevat 27 → 31,8 m, ja tukipilari 9–27 m ja pinaakkeli tulevat vain sinne, missä OSM:n 30 m:n pilariosaa ei ole.
  - `KAARIPAAT` estää kuorin kaksoiskaaret.
  - Ylälaivan ikkunat ovat 24,5–31 m.
- **Vaihe 4, alaseinät:** `alaseinat()` tekee kappeli-ikkunat (osa 3, 2,2–7,6 m) ja tribüünin ikkunat (osa 47, 13–18,4 m). Ne
  puuttuvat poikkilaivasta, torneista ja sakaristosta.
- **Vaihe 6, spiira:** lyhdyt ovat umpinaiset seinät tummine aukkoineen. Neulan tyvi on r 2,05, tyvellä on pinaakkelikehä 66–72,5 m,
  krabbit ovat isommat ja apostolit 3,4 m jalustoilla.
- **Kolmiot lod0** (ilman maata ja puita): 64 k → 84 k.

Seuraavaksi:
1. Täysi ajo (lod0–2 + AO) → `glb/`, kun muisti sallii (vapaata vähintään 20 Gt ja swap alle 2 Gt).
2. `codex-ohje` → `codex-ohje-v9/` ja uudet ohjauskuvat (`ortho_ohje.py nd`, `ortho_merkinnat.py`, `tekoaly_syotteet.py`).
3. Karttaseppä generoi tunnisteella v3.
