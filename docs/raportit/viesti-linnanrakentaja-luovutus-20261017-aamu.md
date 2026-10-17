# Linnanrakentajan luovutus 17.10.2026 klo 07.45 (Linnanrakentaja, Opus) – konteksti 34 %, PT:n uusi erä

Edellinen: `viesti-linnanrakentaja-luovutus-20261016-yo.md`. Viestit AINA id:llä (`/Users/Shared/Claude/osoitekirja.md`): PT local_5df52e10…,
Valoseppä local_c238f4af…, NS local_674b9ec4…, SK local_72d15713…, Postivahti local_a24c43c0…. PT:lle ≤ 3 riviä, ABSOLUUTTISET polut.

## 1. SEURAAVAKSI
1. **PT:n erä 07.4x: museosalien tarkistus.** Kaikki pelissä olevat museosalit (Alankomaat, Ranska, muut): tyhjät jalustat, puuttuvat
   mallit tai varaversiot, 404 ämpärissä. Lista PT:lle (sali, kohde, puute, korjausehdotus vapaalla mallilla); korjaa itse ne, joihin löytyy
   CC0/CC BY -skannaus. Malli ja työkalut: alla kohta 2 (Nike/Venus). Ämpärin tarkistus: `curl -s -o /dev/null -w '%{http_code}'
   "https://media.matkakirja.app/<polku>?t=1"`; patsaan polut `taidemuseo/<maa>/astc-v1/patsaat/<id>/{malli.glb,vari.astcm}` ja varaversio
   `taidemuseo/<maa>/patsaat/glb/<id>.glb`. Pelin veistokset.json ja sali.json ovat NS:n/LS:n puolella (kysy polku NS:ltä); salien lähteet
   `proto-3d/_valmiit/taidemuseo-<maa>-v*/` (sali.json veistospaikat, `huom: "ei 3D-mallia"`). Tiedossa: Rodinin Kolme haamua -varaversio
   `patsaat/glb/rodin-kolme-haamua.glb` 404 (kääntäjä Linssiseppä 2 = Valoseppä; NS kysyi). Skannaushaku Sonnet-agentilla kuten
   `_tyo/linnanrakentaja/louvre-patsaat/haku-nike-venus-20261017.md`.
2. **Louvre k64 (yhteinen LR + Valoseppä) odottaa Valosepän paria** pyramidi-lasi-apilla → `_tyo/linssiseppa2/louvre1/lahi-L1-L3/k64vs/`.
   LUKITTU: luuppi-vienti **4b5182b4/064b26be/0d72f13f + Valosepän sävy 0,80×** (lähde = kierrokset/k65; kivi k63-arvot). ÄLÄ vie
   luuppi-vientiin mitään ennen kuin pari on PT:llä; seuraava yhteinen = k65. Työnjako (PT): LR geometria, VS kiven sävy ja materiaalit.
   PT 02.5x: seuraava pari KK:lle vasta kun ero näkyy ja pyramidin lasi näkyy (ei linnunrata-appia).
3. **Codexin pyramidikuvat** (a1ac41f9e, 9 kuvaa) eivät ole tulleet (`posti/louvre-pyramidi-20261016-vastaus/`); vastaanotto kuten
   edellisessä luovutuksessa.
4. **Koristelu jatkuu** (arvioijan nro 3: keskipaviljongin kapiteelit, ikkunapäädyt, kellon ympärysreliefi) – LOD0 247,5 k / 250 k →
   karsi ensin (esim. siipien takajulkisivujen DET, balusterit vielä harvemmiksi tai LOD0:n patsaiden n-kulmat).
5. **Nike + Venus junaan 199:** NS kytkee (veistokset.json sc-nike → louvre-ma-2369, gg-venus → louvre-ma-399, sali takaisin v2d).
   SK:lle krediittirivi lähetetty (Wenman CC BY pakollinen). PT pyysi simukuvan salista valoineen (NS).

## 2. TEHTY 23.4x–07.45
- **Louvre k60–k64** (kirjanpito `_valmiit/louvre-v1/VERTAILU.md`): k60 L3-jalusta oma vaalea `kalkki`, laatoitus harmaammaksi; k61–k62
  L2-sora (rae ×1,7, laikut ±8 %, tekstuuri aerial_asphalt → Poly Haven gravelly_sand CC0); k63 kaidepilarit + `maljakko()`,
  kattoikkunoiden `harjahahmo()`, kivi B +13 %; k64 balusterit 0,6 → 0,9 m, päätykolmiot Horlogen kaavalla (makaavat hahmot) kaikkiin
  päätypaviljonkeihin. Mittaus k61s/k63s: valaistu kivi R/B 1,55 → 1,47 (Codex ~1,38).
- **Tuotantopohja 3D-maamerkki** (PR #4759, 54d5dc03c): `docs/moduulit/tuotantopohjat/3d-maamerkki.md`, worktree poistettu.
- **Ranskan sali v2j** (NS:n pyyntö, lopulta ei viedä): `_valmiit/taidemuseo-ranska-v2/lahde/v2j_jalustat_pois.py` poistaa jalusta-
  kolmiot GLB:stä ja täyttää valokartan varjon (smoothstep); paketti `_valmiit/taidemuseo-ranska-v2j-vienti-20261017/`; ranska.py:n
  sc-nike/gg-venus kommentoitu (palauta, kun salia rakennetaan uudelleen); alkuperäiset `ennen-v2j/`.
- **Nike + Venus** (PT hyväksyi): Wenmanin Basel-valos (CC BY) ja SMK-valos (CC0) → NS:n `veisto_blender.py` (100 k), Nike marmoriksi
  ja +45° (`kierra.py`), varaversiot (`vara.py`); ämpärissä 07.24 (`_valmiit/taidemuseo-ranska-patsaat-nike-venus-vienti-20261017/`).
  Työkansio `_tyo/linnanrakentaja/louvre-patsaat/` (LAHTEET.md, esikatselu, haku).

## Opit
- Kahden roolin yhteinen vienti: YKSI päättää (sävy = VS) ja toinen kuittaa vain md5:n; ristiin menneet viestit heiluttivat k64:ää kolmesti.
  Turvallinen sääntö: md5 leivottavasta tiedostosta ratkaisee.
- Laikkuisuus ei aina tule kohinasta: mittaa pelikuvasta (toistokuvio) ennen säätöä.
- `tools/uusi-worktree.sh --poista <rooli>-<aihe>` – lippu ENSIN, muuten ei poista mitään.
- Sali-GLB on yksi mesh: yksittäistä osaa ei voi piilottaa koodissa; poisto GLB-indekseistä + valokartan täyttö toimii ilman leivontaa.
- Sketchfab-skannausten etupuoli vaihtelee: tarkista 8 suunnan siluetista ennen vientiä.
