# Linnanrakentajan luovutus 10.10.2026 yö (Olavinlinna v46m–v46q, ND tekselitaso)

Edellinen: `viesti-linnanrakentaja-luovutus-20261009-yo.md`. Haara koodille: `linnanrakentaja-linna-v45e` (worktree
`/Users/Shared/Claude/wt/linnanrakentaja-linna-v45e`, pohja v45d; v45d-worktree poistettu).

## Olavinlinna (kaikki peilissä, Siirtoseppä kytkee junaan 174)

| versio | paketti | blender | sisältö |
|---|---|---|---|
| v46m | 5bbb1b3e82e4e02a | 87d5fc55cbd371e6 | v25-kuori (1499), tekoälyseinät 1–5 sävytettyinä, ranta-1499 v2b, `ulkokuori/asu.json` → asu "1499" (rakenna.mjs) |
| v46n | fa56743af10242ac | 68caa2ba0747d2b4 | + 1499-katot (s6 v4s, paanu/lauta) |
| v46o | 815c41b4b0258f2a | f95e081c58cab245 | + osat.json `tila` (huoneen äänet) |
| v46p | a1bf8d02670338a8 | c1f59f31d8742e3e | + sinisävyn neutralointi, kupari/katot tervaksi, sininen esine kiveksi |
| v46q | 4c01b13e623e0be1 | 0fc378f98508f9a4 | + tornien 1790-l. korotukset ja kartiot pois, kiviharja muurisakaroin (E16) |

- Kuorikansio `_valmiit/olavinlinna-ulkokuori-v25/` (LAHDE.md ajan tasalla); `olavinlinna-blender-v44/ulkokuori` → siihen. v46p:n
  kuoritiedostot `linna-laatu/ulkokuori-v25-koe/tornit-1499/v46p-talteen/`.
- Peiliajo: vie-blender.sh (scratchpad vie46m.zsh = source ~/.zshrc + `--lahde olavinlinna-blender-v44`) → commit blender.json v45e:hen →
  `gh workflow run vie-dioraama.yml --ref linnanrakentaja-linna-v45e -f rakennus=olavinlinna -f kuiva=false -f osoitin=false` → hash lokista.
  CI kopioi vain json/glb/png/jpg/astcm (.txt kaatoi 781/782).
- Uudet työkalut `_valmiit/kaupunkipinnat-v1/lahde/`: kuori_savytys.py (tekoälyseinä valokuvan sävyyn, oranssit, valokuva-alue,
  keltaiset paneelit kiveksi), kuori_hamara_siirto.py (hämärä albedosuhteella, ei leivontaa), kuori_neutraali.py (sininen varjopuoli),
  kuori_1499_savyt.py (kupari/katot tervaksi, siniset esineet), kuori_tornit_1499.py (tornien leikkaus + harja + lattia, laatta),
  kuori_laatta.py (kivilaatta atlaksen vapaaseen 96 px:n neliöön), kuori_projisoi.py --min-kulma.
- Kavely: ranta1499.py ajettu v25-kuorta vasten, kavely.py MARKYYS ranta-1499 0,15, TILA-kentät; siirra_ranta_v25.py; detalji.py
  KARHEUS_MIN kallio 0,8 (materiaalit/kallio-karheus*).
- **Auki PT:llä:** Kijlin torni (1600-l., kokonaan) ja Pyhän Eerikin torni (puuttuu) – a/b/c-kysymys lähetetty. 225°:n punatiili = 1790-l.
  (PT: leikkaus jos korotus, muuten harmaakivi) – tarkista Siirtosepän v46q-arkista, onko jäljellä (bastionit piilotetaan ranta-1499-leikkauksilla).
- Kappalaisen tartu.paikka kirjan reunaan (pieni, jonossa).

## Notre-Dame: tekselitason projisointi (PT: KYLLÄ, korjauslista)

- Uusi `kaupunkipinnat-v1/lahde/projisoi_tekseli.py`: näkyvät kolmiot → Smart UV hitsatulla kopiolla (piilopinnat hide, pakkaus
  marginaali 0,0003), leivonnat (DIFFUSE väri, EMIT sijainti/normaali, AO), tekselikohtainen projektio (pikselintarkka syvyys, w⁴).
  lod0 valmis: `notre-dame-v1/tekoaly-v3-tekseli/` (4096, ~12 px/m, 13,9 M tekseliä, vara 50 %). Vertailu
  `notre-dame-v1/esikatselu/tekoaly-v3/v3_vs_tekseli_etela.jpg`.
- **PT:n korjauslista (seuraavaksi):** 1) näkymättömät tekselit saman materiaalin projisoitujen keskisävyyn / laajennus (kalkkikivi
  yhtenäiseksi), 2) pinaakkelien tummat läikät, 3) lyijykatot tasaisen harmaiksi (poikkilaivan ristikko, pääkaton viirut),
  4) lod1/lod2, 5) puut yhdeksi meshiksi per tyyppi (Cesium 557 Mt -kaatuminen), --portti, 6) vertailukuva pelikulma vs. valokuva
  (Sisältökirjurin nd-kl-referenssit), kulma + versio kuvaan → PT.
- Riddarholmen: Karttaseppä teki ohjauskuvat (_tyo/karttaseppa/ohje-riddarholmen/, malli rh), LR OK:si; projisoi_tekseli.py tarvitsee rh-tapauksen.

## NOLLAUS 10.10. klo 03.0x (PT, konteksti 71 %): TILA JA JATKO TÄSSÄ JÄRJESTYKSESSÄ

**Tehty tämän luovutuksen kirjoittamisen jälkeen (02.1x–03.0x):**
- ND tekselitaso korjattu (projisoi_tekseli.py): piilopinnat naapureihin (2 kierrosta hitsatulla kopiolla → sahakuvio pois),
  UV-kopio tahkovastaavuudella (KDTree), materiaalitunnisteen leivonta (MATID), näkymättömät tekselit materiaalinsa projisoituun
  keskisävyyn, valoisuus 0,75–1,3 × odotus, lyijy = projisoitu mediaani × alkuperäinen^0,2, rakennus yhdeksi meshiksi ja puut yhdeksi
  meshiksi (vientiportti). Ajo: `zsh _valmiit/notre-dame-v1/aja_tekseli_v3.zsh` (lod0 4096 / lod1 2048 / lod2 1024 + portti) → **PORTTI 0 virhettä**.
  Tiedostot `notre-dame-v1/tekoaly-v3-tekseli/nd_atlas_lod{0,1,2}.glb`. Blender-vertailu `esikatselu/tekoaly-v3/vertailu-peli-vs-valokuva-etela-v3-tekseli.jpg`
  (lahde/nd_vertailu_kuva01.py) – PT: EI omistajalle (liian valkoinen, yläosat vaaleammat, lyijy liian vaalea; omistajalle vain pelikuva).

**1) ND sävykalibrointi (ENSIN, pelikuva PT:lle ennen klo 07):** valokuvasta 01 (nd-kl-referenssit-20261009/kuvat/nd-etela/01-…jpg, 900 px:n
   koordinaatit) mitattu: aurinkoinen kivi (länsitorni) **203/192/176**, aurinkoinen kivi (poikkilaivan pääty) 158/150/135, varjoinen kivi
   (laivan tukipilarit) 121/119/91, lyijy (kuorin katto) 191/185/181, lyijy (laivan katto, kirkas taivas) 217/214/213. Atlaksen nykyiset
   keskisävyt: kalkkikivi 199/188/172 (projisoitu), lyijy 130/131/135, veistos 171/158/143, tumma 133/121/113.
   Tee projisoi_tekseli.py:hin `--kalibroi <json>`: (a) materiaalikohtainen korkeusnormalisointi (texel-P:n z 2 m:n lohkoissa → valoisuus
   globaaliin mediaaniin, kerroin 0,7–1,4) = yläosat ja alaosat yhtenäisiksi; (b) kanavakertoimet niin, että mediaani → tavoite (lämmin beige:
   valokuvan aurinko+varjo-keskiarvo sävyltään, valoisuus ~0,85 × nykyinen; lyijy tummemmaksi ~ 0,8 × valokuvan suhde, sinertävän harmaa).
   (c) **Oranssi ovilaatta** etelän poikkilaivan portaalissa keskellä alhaalla: tunnista materiaali (todennäk. alkuperäisen mallin puu/ovi
   MATID:ssä) → tumma puu ~70/50/38. Sitten aja_tekseli_v3.zsh (portti 0) → **luovuta glb:t LS2:lle** (testipaketti ilman osoitinta + pelikuva
   samasta eteläkulmasta PT:lle). Muista: omistajalle vain pelistä otettu kuva.
**2) v46q:n harjat tornin kivipinnalla:** aja_tornit.zsh muutettu (lähde s4 nykyinen = tornin valokuvapinta kohdemaskilla, sävy 0,75 × mediaani,
   pohjana v46p-talteen/). **Ajo VALMIS 02.4x** (`tornit-1499/aja_tornit.log`: Kijl 16,5, laatta nyt 112 px kohdassa 2992/1712, lähde s4-valokuva) – (jos lokissa ei olisi
   "TORNIT KOKO VALMIS", aja uudelleen. Sitten tarkistus (scratchpad ol_lahi.py -malli: kamera tornin harjalle), `tornit-1499/kokoa_v46q.zsh`
   (kopioi glb:t + 8k:t v25-kansioon, 4k/2k + ASTC), MUUTOKSET v46r, vie-blender.sh → commit v45e → peiliajo → Siirtoseppä + PT 8 suuntaa.
**3) a) Kijlin torni kulmatorniksi (PT KYLLÄ, TULKINTA):** kuori_tornit_1499.py:ssä jo leikkaus 20,5 → **16,5** (kehämuuri ympärillä ~14,2 m;
   mittaus scratchpad kijl_tutki.py) – tulee samassa ajossa kuin 2). Tarkista renderillä.
**4) b) Pyhän Eerikin torni:** faktapohja r. 17/246/298 (SE-kulma, purettu osin 1714, jäljellä alin kerros). Etsi paikka ja perusmitat
   (halkaisija, korkeus suhteessa muihin) faktapohjasta/vanhoista piirroksista (Opas 1923, Aspelin 1875); jos riittää → yksinkertainen
   rekonstruktio (TULKINTA), muuten kirjaa syy. Tarkista samalla, että 1600-l. bastionit ovat pelin 1499-asussa piilossa (renderissä näkyvät
   180°/225°/270°; ranta-1499-leikkaukset).
**5) Esittelyn 1499-asu junaan 175** Siirtosepän kanssa (v46q/v46r kytkentä).
**6) Riddarholmen:** Karttasepän ohjauskuvat (_tyo/karttaseppa/ohje-riddarholmen/, diff ortho_ohje.diff) – LR antoi OK:n 02.0x; v1 valmis 02.17,
   v2 (tumma tiili, valurautaspiira) ~02.55. Projisoi projisoi_tekseli.py:llä (lisää malli rh: JUURI riddarholmen-v1, GLB glb-v2b lod*, OHJE
   Karttasepän codex-ohje) – Karttaseppä kertoo kumpi tulos.

## TEHTY 10.10. 02.4x–04.0x (nollauksen jälkeen, Linnanrakentaja Opus high)

- **ND:** projisoi_tekseli.py `--kalibroi <json>` (korkeusnormalisointi 2 m, materiaalin mediaani → tavoite, ryhmät, `valoisuus`-tila
  väärän väriselle tekoälypinnalle, oranssi ovilaatta → tumma puu 70/50/38) ja `--maa-v8` (parvis: lahde/parvis_v8.py → tekstuurit/maa_v8.jpg
  + maa_parvis_maski.png, OSM-parvis robustiin tasoon, kuoppa (−115,5, −4,8) täytetty). Vienti `export_vertex_color='MATERIAL'` (maan COLOR_0).
  Versiot: tekoaly-v3-kalib (valokuva: kivi 170/163/141), **tekoaly-v3b** (pelikuva: kivi 189/174/160, PT/LS2 5a71ed10f → omistajalle
  aamulla), **tekoaly-v3c** (= v3b + parvis v8) LS2:lla 03.5x. Ajo `zsh notre-dame-v1/aja_tekseli_v3.zsh` (O = tekoaly-v3c, kalibrointi_v3.json;
  v3a-arvot kalibrointi_v3a.json). Auki: parviksen lounaiskulman jyrkkä reuna laiturille (+1,1 → −6,8 m) — LS2:n v3c-tarkistus.
- **Olavinlinna v46r** (paketti 81f779158a59076d, blender 71874b61aa0074f5, v45e 6dad4410f): harjat Kijlin tornin omalla kivellä
  (tornit-1499/laatta_kijl_seina.png; torni_uv.py + torni_laatta.py), Kijl 16,5 m, tornien ruskeat tiililaikut harmaaksi (kuori_tornit_harmaa.py).
  **v46s** (paketti 8b0bdf3bad55c8df, blender da175024726ccfa3, v45e d9ff3b565): **Pyhän Eerikin torni** raunion päälle (kuoresta mitattu
  −1,45/−18,23, Ø 11,7, harja −0,4 → z 20,0 TULKINTA; kuori_tornit_1499.py UUDET), laatta 140/134/126. Siirtoseppä kytki (esittely-1499
  2210b802d, juna 175), 8 suunnan arkki Julkaisijan vuorolla ~04.1x–04.3x. Blender-tarkistukset tornit-1499/esikatselu/.
- **Riddarholmen v3** (riddarholmen-v1/tekoaly-v3-tekseli, portti 0, LS2:lla): Karttasepän v3-pinnat → codex-ohje kopioitu
  riddarholmen-v1/codex-ohje, `tekoaly_koko.zsh rh v3 - pelkka-kohdistus`, aja_tekseli_v3.zsh, kalibrointi_v3.json (tiili 214/140/98).
- Karttaseppä: pp ja co OK:ttu (ajossa).

## TEHTY 04.0x–04.3x

- **ND v3c pelissä OK** (LS2 8a85f5207): piikki poissa, ei L-läiskää, reunat siistit; parvis Googlen ympäristöä vaaleampi (avoin huomio).
- **Olavinlinna v46t** (paketti 6a9023165fa72a12, blender 4098d0028038d474, v45e f512a47d5): Paksu bastioni pois 1499-asusta (PT KYLLÄ):
  olavinlinna-kavely-v1/lahde/ranta1499.py + 2 leikkausta (b1499-paksu-bastioni*, vuodesta 1791 kavely.py VUODET), ruudukko x −86…86 / z −14…68;
  kavely.py → v25-tyo2, ranta-1499 + osat/merkit PAIKATTU blender-v44/kavely:hin (v25-tyo3, leivo_kavely --pohja 0,3), vanhat v46s-talteen/.
  HUOM: koko osat.json:ia EI saa korvata kavely.py:n tuotoksella (valoatlas-kentät, ulkoalue, piilo:tupa-tynnyrit puuttuvat siitä).
- **Préfecture pp v1** (prefektuuri-v1/tekoaly-v1-tekseli, kalibrointi_v1.json kuten ND v3b, aja_tekseli_v1.zsh), **Riddarholmen v3b**
  (tiili 150/76/60, LS2/PT: v3 oli oranssi; tekoaly-v3b-tekseli), **Concorde co v2** (vain obeliski, kulta valoisuustilassa, aukion muut osat
  yhdeksi meshiksi — alkuperäinen glb kaatui porttiin; concorde-v2/tekoaly-v2-tekseli) — kaikki portti 0, LS2:lla pelikuviin.
- projisoi_tekseli.py tukee nyt nd/kl/rh/pp/co; tekoaly_koko.zsh `<malli> <tunniste> - pelkka-kohdistus`.

## TEHTY 04.4x–05.0x

- **Olavinlinnan v46t-syötteet Karttasepälle** (PT 04.4x): `olavinlinna-codex-ohje-v46t/seina7–11` (kuori_ohje.py SEINAT 7–11, kuori_merkinnat.py,
  tekoaly_syotteet.py 1 Mpx + `tekoaly-pala` 25 px/m). Valinta: scratchpadin ranking.py (|Laplace| 15 px v46t-atlaksesta, 8 × 8 m ruudut,
  leikkaukset ja laattapinnat pois). Seinä 5 (v46m) yhä heikoin 12,3 → v2 Karttasepän jonossa. Tulokset `olavinlinna_s<n>_v1.png` →
  takaisin + kohdistus + kuori_projisoi.py (kuten s1–s5) → v46u.
- **ND v3d** (`tekoaly-v3d`, `aja_tekseli_v3d.zsh`, MAA_V8=maa_v8b.jpg, parvis_v8.py 168,160,150 226): parviksen sävy Googlen ympäristöön;
  EI vientiä ennen omistajan kyllä-vastausta (PT). LS2 tekee parin.

## TEHTY 04.5x–05.2x

- **Eiffel-torni v1** (PT hyväksyi 04.5x; `_valmiit/eiffel-v1`: lahde/hae.py, lahde/eiffel.py, eiffel_kuva.py, LAHTEET.md, leikkaus_latlon.json):
  proseduraalinen ristikko, YKSI mesh + YKSI materiaali per LOD (COLOR_0), lod0 102 k / lod1 28 k / lod2 0,5 k, portti 0. LS2 teki testipaketin;
  Natiiviseppä kuittaa kolmiot. PT:n ehdot: ennen/jälkeen-pari pysähdyksestä 14 (kamera tornista ~879 m suuntaan 67°, kallistus 64°), ei
  yövalaistusta, osoitinta ei vaihdeta ennen omistajan korttia. Väri arvio (106/86/70 → 128/106/86) → säätö LS2:n pelikuvasta.
- **Olavinlinna v46u** (atlas-v46u/: aja_v46u.zsh, aja_v46u_s5.zsh, kokoa_v46u.zsh): s5 v3b + s7–s10 kuoreen; kuori_savytys.py `--neutraali`,
  min-kulma 0,6; s11 pois. HUOM aja_tornit.zsh lähtee v46p-talteen-atlaksesta → aja v46u-skriptit sen jälkeen.

## TEHTY 05.3x–06.2x

- **Olavinlinna v46v** (paketti cb8c8110742e5cba, blender fcd02e01b928b7bd, v45e 6186da589; Siirtoseppä junaan 175 v46u:n tilalle):
  `atlas-v46u/aja_v46v.zsh` (JONO: nro kansio tulos kulmaraja [valokuva-alue]; R = atlas-v46u/kt → T7-tulokset, polussa välilyönti!)
  + `kokoa_v46v.zsh`. s5 = v1 + 0,4 × (v3b − v1) (atlas-v46u/tulokset/olavinlinna_s5_v3c.png), tornit kulmaraja 0,8; s11 v2t, torni
  `--valokuva 0.79,0,1,1`; kalliokaistat s12/14/16 v1s (kuori_ohje.py SEINAT 12–16; s13/s15 eivät ole kalliota). Ennen/jälkeen v46v/.
- Seuraavat kalliot: ranking_kallio.py (scratchpad-malli: ranking.py + z −6,8…2,5) → (−11,8 −27,7), (−3,4 28,2) jne.

## TEHTY 06.2x–07.0x

- **Tukholman kaupungintalo v1** (PT hyväksyi 06.2x; samat ehdot kuin Eiffel + LS1:n julkisivuvalo omaan malliin pelin jälkeen):
  `_valmiit/stadshuset-v1` (lahde/hae.py, osat.py, stadshuset.py, stadshuset_kuva.py, LAHTEET.md, leikkaus_latlon.json); OSM-osat
  kattomuotoineen, pohjoissiipi booleanilla relaatiosta, päätornin lyhty + kruunut TULKINTA. lod0 6,8 k, portti 0. Karttaseppä tekee
  ohjauskuvat (malli sh, kansio codex-ohje-sh, näkymät + torni) → tekoälypinnat → `tekoaly_koko.zsh sh v1 - pelkka-kohdistus` →
  projisoi_tekseli.py sh (+ kalibrointi kuten RH v3b, tiili 150/76/60) → LS2 pari pysähdyksestä 15, Natiiviseppä kolmiot, LS1 yövalo.
- Kallion mattaus odottaa 175-arkkia (PT).
