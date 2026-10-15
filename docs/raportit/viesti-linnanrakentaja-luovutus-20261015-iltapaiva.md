# Linnanrakentajan luovutus 15.10.2026 iltapäivä 16.1x (Linnanrakentaja, Opus high) – kova raja, PT + Postivahti pyysivät

Edellinen: `viesti-linnanrakentaja-luovutus-20261014-iltapaiva.md`. Viestit AINA id:llä osoitekirjasta `/Users/Shared/Claude/osoitekirja.md`
(tilinvaihto 15.10. 12.1x: PT local_5df52e10…, Postivahti local_a24c43c0…, Valoseppä local_c238f4af…). PT:lle ≤ 3 riviä.
OLAVINLINNA TAUOLLA. Nollaus: tämä luovutus + push → Postivahdille "LUOVUTUS VALMIS <sha>".

## 1. LOUVRE – OMISTAJAN PÄÄTÖS 16.05 (loki e7cc2b03c): siistiminen työn alle nyt, junaan 194 jos kuitattu ennen lukitusta
Kaikki: `/Users/Shared/Claude/proto-3d/_valmiit/louvre-v1/` (LUEMINUT.md = tila, SUUNNITELMA.md, LAHTEET.md, lahde/).
- PT hyväksyi v0:n ja käski v1:n (Napoleonin piha) + KAKSI LISÄPYYNTÖÄ: 1) pyramidiaukon reunan kiveys ja sävy saumattomaksi,
  2) ehdota kipin saapumiskulma, jossa palatsi täyttää kuvan ja aukko pienempi (vain kulma, Linssisepän opasdata). Pelikuvapari
  Googlea vasten ennen v2:ta (Cour Carrée).
- TEHTY (v1, ei vielä PT:lle): `lahde/louvre.py` + `lahde/louvre_osat.py` (rakennuspakki: oikeat aukot, kaarikäytävät, kaiteet,
  patsaat, mansardit, kupolit, LOD-tasot DET 2/1/0). Mitat LiDAR HD:sta (`lahde/kehys.py`, _tyo/linnanrakentaja/louvre/ndsm-kehys.*).
  Pein pyramidi + altaat + pienet pyramidit = Googlen aukko AUKKO (ortokuvasta mitattu altaiden reunakivi u −41,5…35,5 /
  v −37,5…39,5 + kielekkeet). Kiveyksen sävy albedosta #8A8377, katot #76756F. Seinät −7 m:iin, Cour Carrée +1,28 m.
- Vertailu: `esikatselu/v1-vertailu-saapuminen.jpg` (Google | oma v1 + Googlen pyramidi samasta kamerasta; kamera sovitettu
  pelikuvaan ortokuvan pisteillä `lahde/sovita3.py`: u 21,3 v 97,5 z 42 katse −103,4° palatsin kehyksessä, kallistus 22,2°, fov 47,6).
  Yhdistely `lahde/vertailu_yhdista.py` + `yhdista_v1.py` (scratchpad-polut sisällä → korjaa polut ennen ajoa).
  HUOM: pelikuvassa kameran alla oleva Richelieun lohko EI näy (syy auki: lähitaso/laattojen karsinta) → vertailussa
  LOUVRE_ILMAN_POHJOISTA=1. Valoseppä tarkistaa pelissä.
- KAMERAKULMAEHDOTUS (lisäpyyntö 2, `lahde/kulmat.py`): akselilta lännestä kohti Pavillon Sullya: katse 110° (kompassi), kallistus ~5°
  alas, silmä 32 m maasta, 147 m pyramidista (pyramidista suuntaan 290°): pyramidi keskellä Sullyn edessä (omistajan aiempi
  kippikorjaus "pyramidi keskellä" säilyy), aukko + pyramidi 7,6 % kuvasta (nyt 28,7 %). Vaihtoehto luoteesta (katse 137°, 8°, 40 m,
  140 m): 10,3 %. EI VIELÄ LÄHETETTY PT:lle → lähetä v1:n kanssa.
- LEIKKAUS valmis: `leikkaus_latlon.json` (CW kuten ND) + `_ccw.json`, yksi rengas 59 pistettä, nollaleveät sillat pyramidiaukkoon ja
  avoimeen Cour Lefueliin; tarkistus `esikatselu/leikkaus-tarkistus.png`. `kohde.json`: NGF 33,92 / ellipsoidi 77,71.
- VIENTI VALMIS 16.1x (`glb/louvre_lod0…2.glb`, loki `vienti-v1.log`): LOD0 148 k kolmiota 12,3 Mt, LOD1 52 k 5,0 Mt, LOD2 2,3 k 1,8 Mt
  (kaikki budjetissa; LOD1/LOD2: seinä yhtenä pintana + aukot laikkuina, LOD2 ilman ikkunoita). COLOR_0 = AO LOD0/LOD1.
- SEURAAVAT: 1) (vienti tehty) 2) v1-arkki + kamerakulma PT:lle (≤ 3 riviä) 3) glb + leikkaus + kohde.json Valosepälle pelikuvapariin
  (Google vs oma, sama saapumiskulma + ehdotettu kulma) 4) korjaukset parista 5) v2 Cour Carrée (Lescot, kolonnadi).
  Tiedossa olevat heikkoudet: kupolit kellomaisia hattuja, karyatidit/veistokset karkeita laatikoita, Rivolin länsisiipi ~3 m vinossa.

## 2. Valaan luuranko – VALMIS, Valosepällä
Proto-haara `linnanrakentaja/valas-luuranko-195` @ b55630222 (master BUILD 192:n päällä), worktree
`/Users/Shared/Claude/wt/proto-linnanrakentaja-valasluuranko` (poista kun Valoseppä on ottanut haaran:
`git -C /Users/Shared/Claude/proto-3d/Matkakirja-proto worktree remove …`). Iss.ValaanLuusto (6 niveltä, kulmat hypyn vaiheista),
RakettiValas.shader/cs; Linssit-testit 1839/1839, unity-tarkistus 0. Varjostinta ei käännetty Unityssä → vahdin kuvat Valosepältä.
Selitys `proto-3d/_valmiit/valas-v1/LUEMINUT.md` lopussa; arkki `esikatselu/valas-luuranko-arkki.jpg`.

## Opit
- Pelin kipin kamera lokista: "silmä X m maasta, Y m kohteesta", mutta suunta kannattaa sovittaa pelikuvasta (least_squares 6 param
  pyramidin + altaiden pisteillä); ortokuvan pisteillä, ei takaisinprojisoiduilla.
- Blenderin image.pixels (8-bit) = sRGB-arvoja → linearisoi ennen sävytyskertoimia.
- Cesiumin leikkaus = yksi rengas per kohde → reiät avaimenreikärenkaana (nollaleveä silta).
- Linssit-testit lukevat RakettiValas.cs:n lähdettä (ValaanValoTestit): signatuurimuutos → päivitä testin merkkijono.
