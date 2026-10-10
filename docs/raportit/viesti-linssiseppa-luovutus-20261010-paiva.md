# Linssiseppä: luovutus 10.10. päivä (PT:n nollaus 10.1x, Postivahti 50 %)

Rooli: Linssiseppä (Opus, high). Proto-worktreet (haarat paikallisia, ei pushia):
- `wt/proto-linssiseppa-taidemuseo`: **taidemuseo**, haara `linssiseppa/taidemuseo-176` (juna-176-pohja 72099e128).
- `wt/proto-linssiseppa-kaupunkiaanet`: DTM ja LS-äänet Unity 6.7 -pohjalla (a4c6539e5).
- `wt/proto-linssiseppa-astro-auto`: todistusajo (`aani-alku`/`aani-loppu` ei-blokkaava kaappaus, `--doc`), commit d9a611bd0.

Simu 00CF62C2 (T7). Simu- ja käännösvuorot aina Julkaisijalta. Skriptit `proto-3d/tyokalut/linssiseppa-ajot/`.

## Avoimet SHA:t ja vuorot (odottavat Julkaisijaa, arvio ~11.00)

- **K1** `linssiseppa/taidemuseo-176` **283c052cb** + NUI:n kortti `natiivi-ui/museo-esittely-176` 3866e70d9 (merge puhdas, unity 0)
  → `PROTO_APP_KOPIO=…/linssiseppa-app/museo-176`.
- **K2** `linssiseppa/maa-dtm-175-u67` 29be895b8 + `linssiseppa/ls-aanet-175-u67` **883522fb7** (tilakomento) → `…/linssiseppa-app/u67b-175`.
- **Simu ~30 min:** `simuvuoro-museo.zsh <K1-SHA> <K2-SHA>`. Ajot: `sk-museo-176` (kuva-arkki), `sk-ls-aanet-174c`
  (korkea tuuli + `aanimaisema tila`) ja `sk-puut-sillat-dtm` kolmella appilla (kulmat korjattu: `opas kamera` katse =
  ELLIPSOIDIKORKEUS, kallistus PYSTYSTÄ; katse 0 oli 78 m maan alla → 09.4x-kuvissa pelkkää taivasta).
- Vertailukuvat: `proto-3d/tyokalut/linssiseppa-ajot/kolmikko.py <nimi> <otsikko> <ulos> <kansio:teksti>×3` (zsh: `${A}:` eikä `$A:`).

## Maanpinta (juna 175)

- Löydös: 08baea921:ssä IGN-maanpinnasta puuttuvat sillat → autot Seineen ~9 m (59 kärkeä); DSM:llä 178 kärkeä latvoissa.
- Korjaus KatuLiikenne.TieKorkeus (varmat kärjet |DSM−DTM| < 1,5 m, muut lähempänä tien jatketta, lyhty sillalla = jatke):
  6.7-pohjalla `maa-dtm-175-u67` **29be895b8** (L1296, unity 0). Vanhat 6.3-haarat (08baea921, 2b45e4b45) EIVÄT mene junaan.
- Kuittauspyyntö PT:lle vasta puut/sillat-kolmikon (oikeat kulmat) jälkeen.

## LS-äänet (juna 175)

- `ls-aanet-175-u67` b59f82584 → **883522fb7** (korvaa 54ad76401:n). Kellokoneisto OK (174b: 14 naksahdusta kk-vaihdoissa,
  huippu −8,5 dBFS). Korkea tuuli EI todennettu: 2 km:n kaappaus −38,3 LUFS (matala −17,6). Seuraava ajo kirjaa
  `aanimaisema tila` (korkeus, korkea osuus, kerrosten tasot/lähteet) 0,7/1,5/2,1 km:ssä → vika tai kuittaus.

## TAIDEMUSEO, SALI-lava (PT 09.5x; omistaja: "se on tärkeämpi projekti")

Tila (283c052cb, MuseoTestit 8/8, L1306, unity 0, pohja- ja kielivahti ok):
- **Ydin `Linssit/Ydin/Museo/`**: MuseoData (sali.json + teokset.json; ripustus todellisessa koossa, liian iso pienennetään;
  Sali.LueTeos = yhteinen skeema Sisältökirjurin kanssa), MuseoGeometria (väliaikaishalli osista, aukot, pielet, seinänauhat;
  kehyspursotus cm-profiileista), MuseoKierros (LR:n reitti, pysähdys vain ripustetulle paikalle, Catmull–Rom-kävely 1,1 m/s,
  tauko/seuraava/edellinen/siirry, vapaa kulku seinärajoin, katsottu teos), MuseoValo (lx → kuva-arvo lukitulla EV100,
  Kelvin, keilan voimakkuus).
- **Unity**: MuseoSovitin (linssi "taidemuseo", kehittäjätila; komennot `museo tila|kierros|vapaa|seuraava|edellinen|tauko|
  siirry n|esittele|liiku|katse|valotus|kuvajuuri`), MuseoNayttamo (kerros 9, kuva MustaKerrokseen, Neutral + hehku 0,12 +
  vinjetti 0,1, 24 lähintä keilaa globaaleiksi), MuseoRakennus (halli, kattoikkunat, kehykset, passepartout, tekstitaulut,
  kuvat ämpäristä `media.matkakirja.app/taidemuseo/alankomaat/lahde/` 1024 px:iin mippeineen, paikkakuva varalla),
  varjostin `Resources/Varjostimet/MuseoValaistu.shader` (analyyttiset keilat, hajavalo, Blinn–Phong, kaksipuolinen).
- **UI**: MuseoTaulu (otsikko, ohjausnapit, kortti) + `SeikkailuTapit.MuseoKavely` + avaimet `ui.museo.*`. **NUI omistaa
  esittelykortin** (3866e70d9).
- **Teos-skeema NUI:lle (PT:n viesti)**: `Teos.Kuvateksti` (string, null = ei riviä; Sisältökirjurin `kuvateksti_fi`) ja
  `Teos.Havainnekuva` (bool, false = valokuva oikeasta teoksesta) — TEHTY 283c052cb:ssä; teokset.json kentät `kuvateksti`,
  `havainnekuva`; paketin `kuvateksti_fi`/`kuva.seina` luetaan suoraan.
- **Data**: `Resources/Museo/alankomaat/sali.json` (LR, 15 osaa, 54 teospaikkaa, 20 veistospaikkaa, reitti 15) ja
  `teokset.json` (20 Rijks-teosta: reitin 11 + 9 muuta, Sisältökirjurin kuvatekstit ja seinäkuvat).

Seuraavat vaiheet:
1. Kuva-arkki (K1) → katso itse (valotus `museo valotus x`, kulmat, kehykset, kortti) → kuittauspyyntö PT:lle.
2. **LR:n NL-sali v1 (c246f4eac)**: sali-lod0/lod1.glb + valoatlas (valot/sali.jpg + ASTC) korvaa väliaikaishallin; lataus
   dioraaman tapaan (DioraamaLevyvalimuisti/DioraamaAstc, hash-kiinnitys), valoatlas UV1:llä MuseoValaistu-varjostimeen
   (hajavalon tilalle), LOD1 kaukana; teokset/kehykset/keilat jäävät MuseoRakennukseen.
   LR 10.2x: VALMIS `proto-3d/_valmiit/taidemuseo-alankomaat-v1/` (LAHTEET.md): glb/sali-lod0.glb 13 k kolmiota / 18 materiaalia,
   lod1 7,8 k; yksi mesh, primitiivi per materiaali; TEXCOORD_0 toistotekstuuri (tekstuurit/koot.json), TEXCOORD_1 valoatlas;
   valot/sali-lod0.jpg 4096 + -4x4.astcm 22 Mt, lod1 2048 5,6 Mt. KOODAUS E_lx = näyte_lineaarinen × 1200 (150 lx = 0,125),
   mediaani ~295 lx; atlaksessa kattoikkunat, holvien ylävalo, keilat ilman teosta, kattokruunut, kabinettien täyttö.
   Muistiin luultavasti 6x6 tai 2k (pyydä LR:ltä). PT:n huomio: Kunniagalleria tumma → varmista teokset ~150 lx eikä seinä
   musta puhelimessa; kerro LR:lle, tarvitaanko atlakseen täyttöä. Veistosaula ja Leiden v2:ssa (patsaiden jälkeen).
3. Natiiviseppä: MuseoRuudut/MuseoTekstuurit (seinätaso ASTC 2048 + 512 px yksityiskohtaruudut, ≤ 160 Mt/sali); rajapinta
   annettu (Sali.Ripustukset, Kierros.Nykyinen/NykyinenTeos/Pysahdykset, MuseoRakennus.TeosMateriaalit). Atlasalue
   varjostimeen tarvittaessa.
4. Veistospaikat (LR: 20 kpl, GLB:t ajossa) – ei vielä toteutettu (reitin leiden-v1 on nyt kulkupiste).
5. Kertoja (luennat + aikaleimat) korvaa pysähdysajat; esittelyn ääni NUI:n KortinLukijalla.

## Opetukset

- `opas kamera lat lon etäisyys kallistus suuntima katse`: katse = ellipsoidikorkeus (Pariisin kadut ~78–82 m), kallistus pystystä.
- Kuvat.Hae ei lue file://-polkuja; museo käyttää UnityWebRequestTexturea + GPU-pienennystä.
- Proton UI-teksti → `ui.fi.json` + Kieli.T (kielivahti kaataa käännöksen); tarkista `zsh tyokalut/tarkista.sh` ennen pyyntöä.
- Nimet: `Asento` on jo Dioraamassa → museossa `MuseoAsento`.
