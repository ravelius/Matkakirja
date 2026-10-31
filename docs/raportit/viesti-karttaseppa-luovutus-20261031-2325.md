# Karttaseppä: luovutus 31.10.2026 klo 23.25 (uusi tili, KS local_740947d7)
Edellinen luovutus: viesti-karttaseppa-luovutus-20261031-2210.md (PR 5752). Sen kohdat 4–6 (natiivikerros, web,
valmis-ehto) ovat ennallaan. Luovutus tehdään kontekstirajan vuoksi (31 % > 25 %).

## 1. PARIISI: TEKOTAPA VAIHTUI (OMISTAJA 23.09). Seuraavana Codexin pseudo-3D-koe
Omistajan sanat: "Osaisiko codex tehdä ilman liioittelua ensin peruskartan pseudo 3d:nä jonka päälle karikatyyrit laitetaan.
Olisiko parempi näin?" PT: ensin koe kahdella palalla, ja v6 jää varalle. Koko kaupunkia ei tehdä.
- **Tilaus Codexille** claude/postilaatikko **fd46407fe** (ensimmäinen versio c05c208f9):
  `posti/karttaseppa-codex-pariisi-pseudo3d-koe-20261031.md` ja kansio `…-20261031/`, jossa ovat v6-ohjekuvat r3-c4/r3-c5
  (3072 × 2048, 1 m/px, vain geometria), G-referenssi, `osuudet.py` ja SHA256SUMS.
  Pyydetty `pariisi-pseudo3d-r3-c4.png` ja `-r3-c5.png`, 3072 × 2048, yhteinen reuna 128 px (c4 x 2944–3071 = c5 x 0–127).
- **TOIMITUS SAAPUI (Postivahti 23.3x): claude/postilaatikko 929cef880** (pseudo-3D-koepalat + Codexin saumamittaus). Tarkistus
  on seuraavan Karttasepän ensimmäinen työ (alla oleva lista); edellinen sessio ei ehtinyt kontekstirajan vuoksi.
- **Kun Codex toimittaa:**
  1. saumatesti reunakaistalla (vertailu kuten ohjekuvissa: |ero| > 8 osuus);
  2. katujen, Seinen ja reunan pysyvyys ohjekuvaa vasten (sallittu enintään 3 px);
  3. osuudet.py G:tä vasten;
  4. maamerkit, puut ja elämä päälle (renderoi-g6.py:n sprite-koodi tai kokoa-g.py);
  5. kuvapari PT:lle, PT vie KK:lle G:n rinnalle.
  Jos kadut, Seine ja reunat pysyvät, koko kaupunki tehdään näin. Muuten Codex maalaa talot ja puut erillisinä, ja koodi asettaa ne.
- Palaruudukko: tulos/manifest.json `palat` (res 1: 1536 × 1024, limitys 64). Ohjekuvat ovat res 2:lla: r3-c4 rajaus
  8832 3840 11904 5888 ja r3-c5 11776 3840 14848 5888.

## 2. OMAT RENDERÖINNIT v3–v6 (varalla), kansio proto-3d/_tyo/karttaseppa/pariisi-pohja/
Kaikki ajetaan ilman -I:tä (numpy ja scipy ovat käyttäjän site-packagesissa), noin 15 s/pala. Kuvaparit ovat `koepala/r3-c4-g*-vs-G.jpg`.
- v3 `renderoi-g3.py`: korttelit (sulkeminen) ja talot globaalin 20 m siemenruudukon Voronoina. Saumaton: kaikki
  satunnaisuus `arpa()` maastokohdasta, kohina ja maski globaaleja. Saumatesti limittäisillä rajauksilla = 0 eroa.
- v4 `renderoi-g4.py`: Codexin puut ja elämä spriteinä (df248de3a, puretut `proto-3d/_tyo/codex/pariisi-spritet/`),
  sisäpihat, leveämmät kadut.
- v5 `renderoi-g5.py`: mansardin etulape, ×1,4. `G_VAIN_TALOT=1` = vain geometria.
- v6 `renderoi-g6.py` (paras, PT): G:n mediaanivärit, harmaa sinkki, ohut muste, viisto pursotus (VINO 0,35),
  ×2,0, mansardi 0,30, erilliset puut. Osuudet G → v6: seinä 27–30 → 18 %, katto 8–12 → 12,6 %, puu 9–14 → 9,3 %,
  muste 4 → 11 %. Seinä jää vajaaksi, koska G:n viisto näkymä näyttää kaksi seinää (PT hyväksyi selityksen).
  Parametrit: G6_KORKEUS, G6_MANSARDI, G6_VINO, G6_PUU. Maamerkit vain `G_SPRITET=<kansio>`-muuttujalla.
- renderoi-g-laatat.py ja kokoa-g.py osoittavat g3:een (laatat-g3-x2). Vaihda ne, jos koko kaupunki tehdään omalla renderöinnillä.

## 3. 60 FPS KOE D: AJETTU, EI HYÖTYÄ
iPad 23.11–23.18, äppi lokit/natiiviseppa-app-216-ks-fps-d (51415e442), lokit `lokit/karttaseppa-fps-ipad-20261031-2311`.
Liikekehykset > 25 ms: yhteensä 3 % (A+B+C 4 %). UnityWebRequestUpdate-piikit 9 → 6, ja max 72 → 42 ms, mikä on vaihtelun sisällä.
Tyhjiä laattoja ei ole vetojen kuvasarjoissa (arkki kuvasarjat-arkki.jpg). Suositus PT:lle: D ei junaan. NS:ää pyydetty
palauttamaan juna 216:n runko iPadiin; tarkista, että se on tehty.

## 4. ÄMPÄRI (JU:n kysymys, PR 5767)
- `julisteet/maasto/2026-09-24-maailma`: EI poisteta ennen kuin offline.mjs (layer + url), tee-maasto `--vanhempi` ja
  vie-rajakorkeudet on vaihdettu 2026-10-29-maailmaan. **Avoin pieni PR Karttasepälle.**
- `julisteet/pyramidi/2026-09-26s-pohja`: poisto sallittu (vain erat[85]-historiassa; pohja = 2026-09-30-pohja).
- **SELVITETTÄVÄ:** elävä pyramidi.json `rantataso.versio = 2026-09-30-ranta`, mutta JU:n mukaan kansiota ei ole ämpärissä.
  Tarkista, hakeeko web rantalaatat sieltä ja ovatko ne rikki tuotannossa (laattaUrl, taso.ranta).
