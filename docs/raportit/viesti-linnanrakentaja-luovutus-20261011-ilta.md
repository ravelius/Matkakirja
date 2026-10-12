# Linnanrakentajan luovutus 11.10.2026 ilta (16.1x, nollaus: konteksti 68 %, 5 h kiintiö 73 %)

Edellinen: `viesti-linnanrakentaja-luovutus-20261011-iltapaiva.md` (JATKO-osiot 13.2x–16.xx). Haara `linnanrakentaja-tyo-20260929`.
Vientihaara worktreessä `/Users/Shared/Claude/wt/linnanrakentaja-linna-v45k`. Edellisen session scratchpad (vientilokit):
`/private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-linnanrakentaja/d510e6ef-c6ed-457b-9ef0-f24ea4097091/scratchpad/`.

## 1. TAUSTALLA NYT (perl setsid, peräkkäin; tarkista lokit)
`vie_v47r.log` → `vie_v47s.log` → `vie_v47t.log` (scratchpad yllä; skriptit kopioitu `olavinlinna-kavely-v1/lahde/tyokalut-lr/vie-v47/`).
Jokainen odottaa edellisen `KAIKKI VALMIS` -rivin. Kun v47t on valmis: **lähetä Siirtosepälle v47r/s/t-tunnukset yhtenä viestinä**
(hän kiinnittää vain viimeisimmän) — `grep -E "TULOS" vie_v47t.log` (1499 + NYKY PALA) ja `== Valmis` (blender-tunnus).
- v47q VIETY ja lähetetty: 1499 6619d8a1d8fdc525 (5843ae9faf23540b), NYKY 1bad2c78cf1adf4f.
- v47r: ulkoalueen kiila (x −10,8…−7,9, z 2,8…6) pois kävelystä + rajaseinä (kuori_kavely.py).
- v47s: muurinharjan länsipäähän päätyseinä (s 18,85), kävely leikattu näkyvien pintojen alta < 1,9 m (paikallinen korkeus).
- v47t: tilat/kappeli.glb (VAIN 1499) ilman poikkileikkauksen kansipintaa (478 kolm., tyokalut-lr/tila_kansi_pois.py); nyky-paketin
  tilat/ muutetaan omaksi kansioksi (linkit + oma kappeli.glb kansineen). Siirtosepän päätös 11.10.
Jos jokin ketju kaatuu: lue loki, korjaa, aja vie-skripti uudelleen (perl setsid, ks. muisti pitkät ajot).

## 2. OLAVINLINNA: JUMIKORJAUSTEN TILA (Siirtosepän botti)
- Juurisyy ja yleiskorjaus: kavely.py `kavely_seinista()` leikkaa kävelystä kaikkien osien törmäyslaatikoiden (Osa.laatikko, palatsin
  lt()) ja pystytahkojen (Osa.quad) pohjapiirrot kapselin korkeudella sekä näkyvien pintojen alta (< 1,9 m). Natiivi lisäsi
  NavMeshiin pystytahkot Not Walkable (9c7c77a4f). Kapseli: r 0,30, h 1,75, step 0,35, slope 40°, skin 0,03 (vapaata ≥ 0,66 m).
- Korjattu mallissa: 16 (kierreportaan ovet 45°), 19/42/72 (risteys), 61/68/70 (tott-kammion lattia ja seinät), kiipeily + komero
  (v47o, botti 3/3 läpi), harjan putoaminen (v47s), piste 77 (v47t), ulkoalueen kiila (v47r). Reittitesti 2→94: 90/93 (puuttuvat
  tikkaat ja kiipeily, ennallaan).
- AUKI: muuriportaan juuren silmä 1,22 m (−18,1; 3,8; −18,5) — mallissa ei näkyvää pintaa < 2,34 m; Siirtoseppä lisää SilmaVaraan
  lähteen lokin (epäilee jaettua tilaa) → odota hänen havaintonsa. Botin uusinta v47q:lla ja sen jälkeen v47t:llä → uudet mallikohdat
  ensin (PT). Laitetestaajan 8. kierrosta ei vielä ollut.
- Työkalut (pysyvät, `lahde/tyokalut-lr/`): seinakonfliktit.py (NavMesh-solmut seinän alla), kapselireitti.py (kapseli A→B),
  vali.py (navtesti kahden pisteen välille), fp_kuva.py (FP-kuva kuori + osat, LISA_GLB=tilat), kuori_sisalla.py, ylla.py,
  nakyva_lahella.py, jumit.py/navtesti.py. Kävelyosan muutoksen ketju: kavely.py → testikansio (v44/kavely + muuttuneet) → jumit
  2…94 ennen/jälkeen → vie-v47/*.zsh-mallin mukaan (leivo vain osat, joiden NÄKYVÄ glb muuttui).

## 3. JONO (PT:n järjestys)
1. Olavinlinna: v47r–t-tunnukset Siirtosepälle; botin/Laitetestaajan uudet mallikohdat ensin.
2. **Pariisin jatko** (`_valmiit/pariisi-korttelit-v3/`, LAHTEET.md v3c): v3c tehty 16.0x ja LS2:lla paketoitavana (Banque kermanvaalea +
   sinkinharmaa katto, vertailuportti läpi; Branly + ortodoksinen keskus mallissa; julkisivuvaihtelu). Odota LS2:n pelikuvat: jos
   Branlyn itälaikku tai Banquen sävy vielä poikkeaa, korjaa. v3d 16.1x (PT: ortodoksinen keskus = suojattu arkkitehtuuri, EI tunnistettavaa mallia): keskuksen 4 rakennusta neutraaleina 8 m:n
   suorakaidemassoina, kupolit ortosta peitetty — lähetetty LS2:lle v3c:n tilalle. ÄLÄ lisää kupoleita.
3. **Soutaja (junaan 183):** FACEIT 52 valmis (`_valmiit/olavinlinna-soutaja-kasvot-v1/`, Opus-agentti; pää 52, Eyes 8 eyeLook,
   painot 100 % Head kasvoille). Agentti (sama, jatkettavissa vain tässä sessiossa → uusi sessio: aja itse tai uusi agentti) korjasi
   viimeksi suun sisusta (ihonvärinen sisähuuli) ja parran sahalaitaista reunaa (PT: kuva lokit/todistus-soutaja-kasvot-20261011-1538/
   kasvot-video-8fps.png rivit 2 ja 4) — tarkista agentin tulos tiedostoista (LAHTEET.md, esikatselu/). Eleet valmiit:
   `_valmiit/olavinlinna-soutaja-eleet-v1/` (ele_puhe_istuen 8 s, ele_osoitus_portti 1,5 s; airot jäädytetty soutu-aikaan 1,45 s;
   LAHTEET.md). Viimeistely: `lahde/soutaja_yhdista.py tyo/eleet-leikkeet.glb <kasvot-v1>/glb/soutaja-1500.glb glb/soutaja-1500.glb`
   → linkki `olavinlinna-blender-v44/hahmot/soutaja-1500-faceit.glb` uuteen tiedostoon (nyt soutu-v1/glb/faceit) → vienti → haara + SHA
   Natiivisepälle (hän tekee ajonaikaisen puolen haarassa natiiviseppa/soutaja-kasvot; tarvitsee 52 muotoa + Eyes 8 eyeLook*).
4. ISS-raketti (LS2): v1.1 + glb-erillinen/ + karttaversio toimitettu (`_valmiit/iss-raketti-v1/`). Lähikuvan hionta myöhemmin; ei
   vientiä ennen LS2:n hyväksyntää (ämpäriin vain vie-paketti.sh).

## 4. LISÄYS 16.3x: soutajan kasvot VALMIIT (agentin tulos)
`_valmiit/olavinlinna-soutaja-kasvot-v1/glb/soutaja-1500-faceit52.glb` ja `glb/soutaja-1500.glb` (+ ele_soutu), aja.sh ajettu kokonaan:
suun sisus korjattu (ihonvärinen sisähuulen pala pois hahmo_paa.py:ssä, tumma suupussi ihon sisällä, 8 hammasta kaarella), muotojen
tiivistys (sparse) pois viennistä, parran alahuulen alla oleva sahalaita tasoitettu kaareksi (leuan kaistale säilyy). Muotoja: pää 52,
Eyes 8, suun sisus 31, Eyebrows 23, Hair_Beard 34, Hair_Buzzed 1; luut 65, leikkeet 12. Kuvat esikatselu/arkki-suu-parta.jpg,
suu-sisus-varikoe.png. Avoimet: parran irtoaminen ihosta jawOpenissa (≤ 3,8 mm), poskien parran ulkoreuna yhä sahalaitainen.
SEURAAVAKSI: yhdistä eleet (kohta 3: soutaja_yhdista.py tyo/eleet-leikkeet.glb → kasvot-v1/glb/soutaja-1500.glb) → hahmot-linkki → vienti → SHA NS:lle.

## JATKO 11.10. ilta (uusi sessio, scratchpad .../5ab64f62-6697-4edf-834c-735c7cfcf3d5/scratchpad/)
- v47r–t VIETY ja Siirtosepällä (v47t 1499 a8cae107607efe0a, NYKY 0cf47c992992ff69). v47v VIETY: 1499 4c53298feb288633 (blender
  1d210ae40bd87242), NYKY 010ff7e190873875 (blender 9ffc115357db22ce) = laituri (v47v-laituri: silta lankut, rantakivet v3, aukot matalalla
  muurilla PT:n kevennyksellä), keittiö (v47v-keittio: keittio-sisatila-raja + oven koristekivet pois) ja harjan reittipisteet 91/92 (v47w,
  olivat sakarakiven sisällä). Työkansiot olavinlinna-kavely-v1/v47v-laituri/ ja v47v-keittio/ (kytke.zsh, esikatselu/).
- v47u (soutaja FACEIT 52 + eleet peliin) PERUTTU: omistaja haluaa suomalaiset kasvot ja PT näyttää ne ennen peliä. Yhdistetty glb
  _valmiit/olavinlinna-soutaja-eleet-v1/glb/soutaja-1500.glb on valmis, mutta hahmot-linkki on ennallaan.
- Jumit (botti v47t ilman seiniä): 16, 19, 61, 64, 75 auki. Natiivin seinäsääntö kokeiltiin ja peruttiin (11/17). Oma Recast-emulointi
  tyokalut-lr/navseinat.py (EI_SEINIA=1, SEINAT=1) yhdistää 16/64/75 → odotetaan Siirtosepän NavMesh-dumppia + reittikulmia
  (pyydetty polkuun proto-3d/lokit/navmesh-v47t/). Jumi 19: kierreportaan juurella tasanne 3,4 koskee portaan kylkeen, jossa törmäys-
  askelmat 0,41–0,62 m (x −18,4…−18,65, z −18,0…−18,4); oikea sisäänkäynti z −18,8…−19,0 (askel 0,21).
- JONO (PT): jumit (juna 182) → MetaHuman-pilotti soutajalla (Opus-agentti käynnissä: _valmiit/linna-hahmot/metahuman-soutaja-v1/;
  kuvapari + video + muistiarvio PT:lle) → kasvoerä 183 (luettelo HYVÄKSYTTY: docs/raportit/linnan-henkilot-kasvot-20261011.md,
  10 puhujaa + 6 taustakasvoa, voudin MH pidetään).
- Muut jonossa: keittiön HDR-leivonta TOIMITETTU LS2:lle (_valmiit/olavinlinna-keittio-hdr-v1/). Karttasepän keittiön vertailuaineisto
  (T7 _tyo/karttaseppa/olavinlinna-keittio-vertailu-20261011/: kalkittu luonnonkivi #EADFD1, liuskekivilattia) ja Sisältökirjurin
  sisätilojen totuusraportti (PR #4417, korjauslista §6: kappeli kalkittu, soihdut pois, Kuninkaansali, Tott-kammio, ampuma-aukot,
  tyrmä, porttikäytävä, keittiön rappaus) → kysy PT:ltä järjestys. Pariisi v3c/v3d: odottaa LS2:n pelikuvia.

## JATKO 11.10. ~19.5x (UUDELLEENKÄYNNISTYS, PT)
- VIETY lisäksi: v47y (reitti:pelaaja-12 z 10,6 → 10,35, keittiön ovi laatikon ulkopuolelle): 1499 632ad9e11308fb3f; NYKY-vienti
  käynnissä irrotettuna (scratchpad/vie_v47y.log, skripti tyokalut-lr/vie-v47/vie_v47y.zsh) → tunnukset Siirtosepälle, kun KAIKKI VALMIS.
- KESKEN agentteina (kuolevat uudelleenkäynnistyksessä → aja uudelleen samalla tehtävällä):
  1) v47z kapeat kohdat (junan 183 jumit): A) 16 kierreportaan ramppi ulkoreuna RS − 0,1 → RS − 0,02 (sisin kaista 40–52° liian jyrkkä,
     kulkukelpoista 0,85 m); B) 75 ampumakäytävän rengas: paaovi-porras (K(165…187, RP 6,3)) sisäseinä seina 0,6 työntyy renkaaseen
     (0,71 m) → seina=0,4; C) 64/65 palatsin seinä (−16,37; −7,73)→(−15,37; −9,93) ja kierreportaan varren seinä (−16,63; −8,91)→
     (−18,8; −4,97) rako 0,73 m → ≥ 0,9. Ketju: kavely.py → olavinlinna-kavely-v1/v47z-tyo → jumit 2…94 → leivo muuttuneet näkyvät →
     kytke vain muuttuneet osat (EI vesiportti/ranta: v47v-laituri on glb-tasolla). Siirtosepän pyyntö 19.4x: kaistat ≥ 0,9 m.
  2) MetaHuman-pilotti soutajalla (_valmiit/linna-hahmot/metahuman-soutaja-v1/; Unreal kiinni lopuksi!) → kuvapari + puhevideo +
     muistiarvio PT:lle. Tarkista, jäikö Unreal auki (pgrep -x UnrealEditor) ja mitä kansioon ehti syntyä.
- Natiivi (Siirtoseppä): seinävariantti r 0,3 + solu 0,05 + korkeus 1,75 + minRegionArea 0,25 (7c84c88e1) testissä 16/19/61:lle;
  botin katse kulkusuuntaan (91/92, 12). Datan seinäleikkaus tyokalut-lr/kavely_tri_seinat.py HYLÄTTY (palatsin törmäysnormaalit
  sekaisin → katkoi reittejä); pielivara.py ja navseinat.py jäävät työkaluiksi.

## JATKO 11.10. ~22.xx (uudelleenkäynnistyksen jälkeen)
- VIETY: v47z (kaistat 16/75/64–65; 1499 012791c059e137ad, NYKY c3e5899fca16c540) → botti 12/17, 64/65 ja 75 korjautuivat.
  v48b (sis. v48a: keskushallin seinä pois palatsin käytävästä, reitti 12 z 10,9, keittiön Barrel_01 ×2 + codex-noki pois;
  1499 c0cac3ae6749b812, NYKY 570fadac5b0a09ab). v48a:n NYKY-vienti ei tuottanut tunnusta (vie-blender ohitti) → v48b korvaa.
- KESKEN (agentti, v47z-agentin jatko): v48c = jumit 16 (kierreportaan oven länsipielen pää (−21,29; −2,90): kävely jatkuu nolla-
  paksuisen seinälinjan ohi, E102 2,0 m > oviaukko 1,16 m), 55/61 (palatsin pielen pää (−18,71; −2,03)), 19 (portaan kylki 0,41–0,62 m).
  Ketju kavely.py → v48c-tyo → jumit → kytke_v48c.zsh (ajamatta) → vienti (vie-v47/vie_v48b.zsh-malli).
- MetaHuman-soutaja v1c (_valmiit/linna-hahmot/metahuman-soutaja-v1/): PT: suunta OK; NS kytki testihaaraan (natiiviseppa/soutaja-
  metahuman), muistiarvio ~26 Mt/hahmo (×10 ≈ +150–200 Mt), ilmeet toimivat; v1c korjasi tummat kasvot (normaalikartta DX→GL,
  ihon sävy, parta) → NS:n vertailuajo → PT → omistaja. Ei pakettiin ennen omistajaa.
- Keittiön HDR v2 (yö, kalkkiseinät, luotaimet, yo-albedo-8k) toimitettu LS2:lle (_valmiit/olavinlinna-keittio-hdr-v1/).
- Natiivi ei näytä yleisiä valo:-merkkejä (vain koodatut); näkyvät valot = tilat/*.glb:n liekki:/valo:-solmut.

## JATKO 12.10. ~02.xx (yö)
- VIETY: v48c (soutaja-MH + keittiön HDR: 1499 d346e7617d4e3553 / NYKY 63caeaeaef86cb74), v48d (jumit 19 + 55/61, MH-hahmot;
  161328b95757469f / ffe91b0e640479e5), v48e = 17/17-ehdokas (jumi 16: kierreportaan sisäänkäynti 45° → 60°, kavely.py rivi ~632;
  86fa5566a0939114 / 4876c22f12e09b1a). Kappalainen/aitan hoitaja MH POISSA v48e:stä (v1 ei junaan; hahmot/ennen-v48e/).
- OMISTAJA HYVÄKSYI MetaHumanin. Agentti tekee puhujat (linna-hahmot/metahuman-<id>-v1/, VALMIS-tiedosto). Paketointi:
  tyokalut-lr/mh_pakettiin.zsh <id> → hahmot/<id>-mh.glb + -mh-<i>-6x6.astcm. Valmiit (paketissa): soutaja v1d, portinvartija v1c,
  vartija v1c, vartija2 v1c (uusi henkilö: henkilot.js + hahmot-skin.json + olavinlinna.js lisaHenkilot, 24ce8745c; merkit ranta/harja),
  kokki v1c, vouti, apulainen v1b. Aitan hoitaja v1b valmis (ei paketissa) → v48f. Kappalainen v1b, vesipoika, renki kesken.
  Unreal: avaa hahmo kerrallaan ja sulje (PT: 64 Gt muistia 01.0x).
- v48f = aitan hoitaja v1b + kappalainen v1b (+ vesipoika, renki) junaan 183 jos ehtii ennen lukitusta, muuten 184.
- Jumiagentti (v48c-kavely.py-muutokset) jäi jumiin; kytkin itse: 16:n pielileikkaus V48C_16-lipun taakse (katkaisi 15→16).
- rakenna.mjs: tilan valoatlas.hdr (24dc95a94); vie-blender vie HDR-tiedostot.

## JATKO 12.10. ~06.xx
- VIETY: v48f (MH kappalainen/aitan hoitaja v1b), v48g (salin porraskanava 1,1 m), v48h (16: kierreportaan askelmat seinään asti,
  kavely.py rivi ~596), v48i (55/61: salin ala-oven holvi YT + 2,45; CC on 1,75 + skin 0,03 → ulottuma 1,81: KÄYTÄ KORK=1.83
  kapselireitti.py:ssä), v48j (86: muurinharja-tilan vanha seinä pois, tila_kaytava_pois.py ALUE+YMAX; MH v2 kaikille 11),
  v48k = 17/17-ehdokas (harja-0: soihdun tolpalle näkymätön törmäys, kierreportaat-tilan palat pois harjalta):
  1499 c58921fcb9d82780 / NYKY 0ed22c60646dbba2. Siirtoseppä: botti + pelikuvat.
- MH: kaikki 11 v2 (linna-hahmot/metahuman-<id>-v1/, yhteinen ketju metahuman-ketju/); paketointi mh_pakettiin.zsh <id>.
  NS:n materiaalikorjaus 64ec7994f (AlfaRaja + Cull MASK-korteille) junassa 183. Muisti v48d: +320 Mt / 9 MH, ei jetsameja.
- KESKEN: keittiön koehuone (agentti; _valmiit/olavinlinna-keittio-koehuone-v1/; KCD2-taso, vain CC0/CC BY/PD — omistajan lupa 12.10.),
  SK:n aineisto _tyo/sisaltokirjuri/vertailu/linnan-keittio-1499/, äänimaisema olavinlinna-keittio-aanimaisema-vienti-20261012.
  Koehuoneen leivonta pid 46922 TAUOTETTU (kill -STOP) Julkaisijan hiljaisen ikkunan ajaksi → jatka kill -CONT 46922.
- Jonossa: LS1:n museopilotin mallinnusapu (holvikatto, Cuypersin listat) linnatöiden jälkeen; MH-kevennys (sivuhahmojen tekstuurit 512).

## JATKO 12.10. ~10.5x
- SÄÄNTÖ (omistaja 12.10., Raamattu ASEMATAULU: VAATII TOIMIA, PR #4489): omistajan toimia vaativa kysymys/pyyntö heti Asemataululle:
  ArtifactData set url https://claude.ai/artifact/Rq5ajPU4SraE2XKd7BYAix, kokoelma "talo", doc_id "toimi-linnanrakentaja",
  data {rooli: "Linnanrakentaja", kysymys: "<yksi rivi>", ts: <ms>}; ei onnistu → Postivahdille "VAATII TOIMIA: Linnanrakentaja: …";
  hoidettu → get + delete if_version.
- VIETY: v48l (MH v3), v48m (isoille esineille törmäys, tyokalut-lr/esine_tormays.py: 1499 5b6233733a9496db / NYKY 9bb1bf514e5bd5f4),
  v48o = v48m + keittiön tulisijan ja padan törmäys (esine_tormays.py VAIN_LISA=1 LISA="osa:x0,x1,z0,z1,y0,y1:nimi"):
  1499 3e5e938d7957d540 / NYKY 33468a6d087b503f. Siirtoseppä: LT:n uusinta. Sali 72 = botin nopeus (Siirtoseppä korjaa).
- v48n (MH-kevennys, EI viety): tyokalut-lr/mh_kevenna.py (vain natiivin 32 ARKit-muotoa, harvat muodot, varakuvat 256 px):
  glb 101 → 44 Mt, lähikuvat pikselilleen samat. Tulokset _valmiit/olavinlinna-kavely-v1/v48n-tyo/, vienti scratchpad vie_v48n.zsh.
  → yhdistetään asujen kanssa v48p:hen (PT).
- KESKEN: OMISTAJAN PALAUTE 09.38 (apulaisen asu outo, kaikki vaatteet liian tiukkoja): agentti tekee 1500-luvun väljät asut
  (linna-hahmot/vaatteet-v1/; pilotti apulainen + soutaja → pilotti-arkki.jpg, sitten kaikki 11 → kaikki-arkki.jpg PT:lle ennen
  vientiä). Sen jälkeen mh_kevenna.py uusille glb:ille ja v48p (asut + kevennys). Tavoite juna 183.
- Keittiön koehuone v2 valmis ja LS2:lla (947d84827); päiväleivonta KESKEYTETTY (jatkokomennot koehuoneen LUEMINUT.md:n lopussa).
- SÄÄNTÖ (omistaja 12.10. 11.1x): omistajalle kuvat TÄYDELLÄ TARKKUUDELLA (yksittäinen pelikuva natiivikoossa tai pari nykyinen | uusi
  vierekkäin natiivikorkeudella, merkintä isona alareunaan, JPEG 90). Pienennetyt monen ruudun arkit vain PT:lle, täysikokoiset samalla.
- KESKEN 11.2x: raketti v2 (agentti; _valmiit/iss-raketti-v2/ raketti.py:stä, solmut/origot/LOD ennallaan LS2:n RakettiMallille).

## JATKO 12.10. ~14.5x
- VIETY: v48p (asut + kevennys; 1499 c09695d47f8023dc / NYKY d157042efd7826d8; Siirtoseppä: 11/11 latautuu, visemit, muisti ennallaan),
  v48q = v48p + vartijoiden rautahattu ja keihäs/hilpari (ase-luu, piilotus skaalalla istumaleikkeissä), portinvartijan avaimet,
  sileät kengät: 1499 d5afe736572c06bb / NYKY 5943527a63233fd8 → Siirtoseppä ottaa omistajan pelikuvat (11 paria v48o | v48q).
- Asut: linna-hahmot/vaatteet-v1/ (lahde/aja.py <id>, asut.py, vertailu.py; lähtö metahuman-<id>-v1/glb/). Paketointi + kevennys:
  scratchpad vie_v48q.zsh -malli (mh_kevenna.py → hahmot/, ASTC kopio, vanhat hahmot/ennen-v48q/). Jäljellä: vartijoiden
  risti-istunta (housut takin läpi ≤ 7 cm), apulaisen luutatyö hihansuu ~2 cm. Siivottava lopuksi: vaatteet-v1/tyo/ testikansiot.
- Raketti v2 (_valmiit/iss-raketti-v2/): syy sahalaitaan float-tarkkuus (origo maapallon keskellä); LS2 kytki origon siirron ja
  vaihe A:n (8d4d6a4cb, 1ee153c20). Vaihe B (tekstuurit) LS2:lla 184:ään PT:n päätöksellä.
- KESKEN: koehuone v3 (varraspaisti + padat, LS2:n pyyntö) ja sen jälkeen päiväleivonta (agentti).
- Agenttiohjeisiin aina: skriptit tiedostosta, ei rm, ei cd/&&-ketjuja (lupakyselyt pysäyttivät omistajan 11.00–11.27).
