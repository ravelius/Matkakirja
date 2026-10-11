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
