# Pelikoodarin luovutus 16.10.2026 yö (KOVA RAJA 36 %, Postivahti, klo 23.27)

Rooli Pelikoodari (Opus, high), checkout /Users/Shared/Claude/Matkakirja-pelikoodari (haara pelikoodari-luovutus-20261014-paiva), proto-git
/Users/Shared/Claude/proto-3d/Matkakirja-proto (haarat pelikoodari/<aihe>, worktreet /Users/Shared/Claude/wt/proto-pelikoodari-*, peili
natiivi-backup peili/proto/<haara>). Edellinen luovutus -20261016-ilta: tehty (liikepohja, museo, Praha).

## Lue ensin
- CLAUDE.md, Raamatun Ydinajatus kohta 2, tämä raportti, docs/moduulit/yhteiset-pohjat.md.
- Viestit `send_message` session id:llä (/Users/Shared/Claude/osoitekirja.md): PT local_5df52e10-10e4-4b72-9554-0049db300dfe,
  JU local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914, NS local_674b9ec4-e2f3-48e9-a810-a129f20a4f03, NUI local_44392b3c-86ee-4873-9d76-82f9aaa6b832,
  Postivahti local_a24c43c0-8094-4141-b734-90b9555f5044.
- OMISTAJA 22.24 (pysyvä): "juna 198" = juna 197 (kaikki yhteen junaan). OMISTAJA PYYSI JULKAISUA 22.45; lukitus ~01.45.
- Testit proto-worktreen juuressa: `sh Linssit-testit/kaanna.sh`, `zsh tyokalut/tarkista.sh` (unity + pohja-/liike-/kielivahti).
  Oma simu iPhone 96044270-92AA-4BD3-BE2D-772C8495AB19 (JU antaa SIMU NYT, palauta SIMU VAPAA). Python-muokkaus: shutil.copymode ennen
  os.replace (tarkista.sh menetti +x:n tänään → JU:n käännös kaatui).

## JUNAN 197 KÄRKI: pelikoodari/intro-tasainen-197 **abc4accff** (peilattu), ⊃ kaikki alla
1. **ENSIMMÄISENÄ: intron mittaus + video → PT** (PT 23.06, omistaja: "miksi intron kuvien vieritys puolelta toiselle tökkii vieläkin?").
   JU kääntää abc4accff:n (L2-jonossa seuraavana, lukossa 99cff2b9a 23.19) → _tyo/pelikoodari/intro-tasainen-197-app; JU vahvistaa SHA:n
   KÄÄNNETTY-viestissä. Aja: `APP=/Users/Shared/Claude/proto-3d/_tyo/pelikoodari/intro-tasainen-197-app/Matkakirja3D.app ERA=intro-tasainen-197
   HAARA=abc4accff SHA=<käännös> UDID=96044270-92AA-4BD3-BE2D-772C8495AB19 zsh /Users/Shared/Claude/proto-3d/tyokalut/pelikoodari-ajot/ajo-museo-pehmea-197.zsh`
   (skenaario alkaa uusi-peli pariisi → Pariisin nykyintro 5 kuvaa, sitten museo). Vertaa konsoli-stdout.login "kehysajat"-rivejä intron
   ajalta (t ≈ 15–50 s, tila "peitto") ENNEN-ajoon proto-3d/lokit/todistus-museo-pehmea-197-20261016-2233 (myös -liikepohja-198-20261016-2310):
   ennen gpuMs 15–16, ruutuväli p50 19,5 / p99 33 ms, 1. kuvan alussa liike p95 967 ms. Uusi lokirivi "tausta sumennettu N/M kerrosta".
   Jos gpuMs ei laske selvästi: sumennettuja kerroksia on yhä liikaa → seuraava askel: alemmat kerrokset kertakuvaksi (ei suodinta joka
   ruudussa) – kysy PT:ltä, UI-pohja (NUI). Video + 1 rivi tuloksesta PT:lle; PT: abc4accff NS:lle, kun KK on hyväksynyt intron videon.
   Syy (lähetetty PT:lle): UITK:n blur-suodin jokaisessa alemmassa UI-kerroksessa (oma paneeli, koko ruudun sumennus joka ruudulla) +
   liike seinäkellosta. Korjaus f596cae43: sumennus vain piirtyviin kerroksiin (TraileriTausta.Nakyvaa), TraileriLiike-kello max 1/30 s/ruutu,
   Bezier = Liikepohja.LiikeKayra. NUI:lle kerrottu (sen tiedostot).
2. **Historiaosiot omilla paikoillaan** (omistaja 23.16 "Miksi Louvren kohdalla puhutaan Pariisin perustamisesta esittelyssä?"):
   abc4accff. OpasHistoria.Paikat (32 osiota, 4 kaupunkia) + Paikalle; OpasSovitin soittaa pysähdyksen lopussa vain oman osion, esilataus
   kierroksen alussa ja lähdöissä. **PT hyväksyi kohdistuksen 23.2x** (Louvrelle ei osiota: Pariisin 8:sta yksikään ei kerro kuninkaiden
   Louvresta – tarkistettu). Testi HistoriaosioOmallaPaikallaan. Simussa tarkistamatta: lokirivi "opas: historiaosio <tunnus> pysähdyksen
   lopussa" Notre-Damella; "ei ehtinyt latautua" = esilataus myöhässä.
3. **Liikepohja + museo** c32cbb200 (pelikoodari/liikepohja-198): KK hyväksyi 23.18, NS:llä. Ennen/jälkeen-video PT:lle lähetetty
   (todistus-museo-pehmea-197-20261016-2233 vs todistus-liikepohja-198-20261016-2310). Tyylikirja liuku 1800 ms main #4735 (mergetty c045e5b5a).
   Liikepohja.cs (Ydin/Kamera), liikevahti (tyokalut/liikevahti.py, tyylikirja/liikevahti.json 226 tiedostoa / 1314 ohitusta, vain pienenee).
4. **Praha historia-v2** 88a386b12 (pelikoodari/praha-historia-198): JU vei opas/historia-v2/praha.json 22.38.

## Seuraavaksi (juna 198+)
- Muiden linssien ja pelien siirto liikepohjalle vuorollaan (liikevahdin lista; ensin ne, joihin muutenkin koskee).
- Webin tyylikirjan generaattori voisi tuottaa Liikepohja.cs:n arvot (nyt testi LiikepohjaTestit.ArvotTyylikirjasta valvoo).

## Avoimet / siivous
- Worktreet: proto-pelikoodari-intro-tasainen-197 (kärki), -liikepohja-198 ja -praha-historia-198 (⊂ kärki; poista kun NS yhdistänyt),
  -museo-pehmea-197 (vanhentunut analyysi, poista), -tmp-pohja (detached 61d665389, poista), -kori-varjo-197, -kori-koydet-197,
  -iss-revontulet-197 (poista kun junassa), -raketti-kamera-196; web /Users/Shared/Claude/wt/pelikoodari-liike-liuku-198 (PR mergetty, poista
  `tools/uusi-worktree.sh pelikoodari liike-liuku-198 --poista`).
- _tyo/pelikoodari: museo-pehmea-197-app ja liikepohja-198-app (poista vanhin kun intro-tasainen-197-app tulee; ≤ 2 .app),
  praha-historia-198/praha.json (viety).

## Aloitusviesti uudelle Pelikoodarille
"Olet Pelikoodari (Opus, high). Lue CLAUDE.md ja docs/raportit/viesti-pelikoodari-luovutus-20261016-yo.md (haara pelikoodari-luovutus-20261014-paiva).
Ensin intron mittaus + video abc4accff:n käännöksestä PT:lle (juna 197, lukitus ~01.45)."
