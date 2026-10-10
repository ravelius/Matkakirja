# Linnanrakentajan luovutus 10.10.2026 ilta (nollaus 52 %, 17.5x)

Edellinen ja yksityiskohdat: `viesti-linnanrakentaja-luovutus-20261010-iltapaiva.md` (lue loppuosiot "JATKO 15.3x–15.5x", "JATKO 15.5x–17.1x" ja
"SEURAAVA TEHTÄVÄ: ND v5c"). Haara `linnanrakentaja-tyo-20260929`. Ei taustaajoja, ei worktreetä auki.

## Tila
- **Museon varjot = NL-sali v2e VALMIS** (ei kesken): `_valmiit/taidemuseo-alankomaat-v2e`, ennen/jälkeen e023031a2, LS1:lle ilmoitettu
  (kytkee; LS1:n veistokset.json (6) ja m2-v1/v2-ripustus eroavat v2e:n sali.json:sta → LS1 käyttää v2e:n sali.json:ia). Leivonta
  `taidemuseo-runko/lahde/leivo_sali.py -- . --lod L --teokset lahde/teokset-ls1-691969c66.json --patsaat --ao 0.6 --ao-voima 0.5`
  (~3 min/LOD), tarkistuskuva `atlas_kuva.py` (ATLAS_LX=900). Jos LS1 muuttaa ripustusta/kehyksiä → leivo uudelleen ja jäädytä v2f.
- **ND**: v5b (v6k14) menee junaan (omistaja 17.4x "paljon parempi, mutta..."). **SEURAAVA: ND v5c** — elementtikohtainen rekisteröinti
  mallin reunakarttaan + rajaus omalle pinnalle + portaaleille tarkempi lähde + uusi reunaportti (≤ 2 px, venytys ≤ 2×); suunnitelma
  iltapäivän luovutuksen lopussa (48f93fb81). Tiedostot: notre-dame-v1/lahde/kuva_lansi_kohdista.py, kalibrointi_v5b.json,
  aja_tekseli_v5b.zsh, kaupunkipinnat-v1/lahde/{projisoi_tekseli.py, kivi_portti.py}.
- **Olavinlinna v47b** kytketty (Siirtoseppä c3091ed82); odottaa vain Siirtosepän rannan kuvaparia. Vientihaarat v45f-ketjusta (v45h), EI mainista.
- **Peking**: v3 malli kunnossa (LS2-pari 10.10.); tumma Jinshui = Karttasepän vesipinta, LS2 mittaa ja vie PT:lle/Karttasepälle. Ei avointa minulle.

## JATKO 17.5x–18.5x (nollauksen jälkeen, sama sessio)
- **NL-sali v2f VALMIS ja LS1 kytkenyt** (linssiseppa/museo-varjot-180 5f0cbd6a0): `_valmiit/taidemuseo-alankomaat-v2f`, kuva 83a0be2ce.
  Kehykset pois Cycles-varjostajista ja AO:sta → KEHYSVARJO (leivo_sali.py: seinän paikka-/normaalikartta EMIT-leivontana, pehmeä varjo
  kohdevalon suuntaan, KV_* vakiot). Ripustus yhteiseen `taidemuseo-runko/lahde/kehykset.py`; tarkistus teokset paikallaan `ripustus_kuva.py`.
  m2-v1/v2 = RP-P-OB-444/602 (LS1). Vanha: leivo_sali_v2e.py, sali-v2e.json.
- **ND v5c VALMIS → LS2 pelikuvapariin** (kuva 1d5befa85): `notre-dame-v1/lahde/kuva_lansi_kohdista_v5c.py` + `elementit.py` (sisäkkäiset muodot
  mallissa/kuvassa: portaalit 3, ruusutason ikkunaparit 2) + `reunaportti_nd.py` (vuoto v1 0,8–1,8 → v5c ≤ 0,06). Kivi ×0,96
  (kalibrointi_v5c.json), aja_tekseli_v5c.zsh → tekoaly-v5c/. Kaikki portit läpi. Python-venv: /Users/Shared/Claude/proto-3d/_tyo/venv-rembg.
  Ei tehty: tornien lanseetit, portaaleille tarkempi lähde (Commons-alkuperäinen 4315 × 6470).
- **Peking v4** (LS2 18.4x): kulta_katto × 0,77/0,82/0,82, laatat uudelleen, glb-v3 talteen; LS2 paketoi ja mittaa. Pihat = Karttasepän maa (välitetty).
- Karttasepän puut (_tyo/karttaseppa/puut-20261010/peli/*.bytes) — kytkentä Siirtosepälle/LS2:lle, ei minulle.
SEURAAVAKSI: LS2:n v5c-pari → PT → omistaja; LS2:n Peking-mittaus.
