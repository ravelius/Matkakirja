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
