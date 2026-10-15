# Linssisepän luovutus 15.10.2026 klo 22.12 (KOVA RAJA 35 %, Postivahti)

Proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto (paikalliset haarat, ei pushia), worktree /Users/Shared/Claude/wt/proto-linssiseppa-yotaivas
(jätetty haaralle linssiseppa/yotaivas-196). Ajot proto-3d/tyokalut/linssiseppa-ajot/ (Julkaisija antaa käännöksen ja lipun `simu-<nimi>.nyt`).
Tarkistus `zsh tyokalut/tarkista.sh` worktreessa; linssitestit `sh Linssit-testit/kaanna.sh <osa>`. Viestit AINA send_message id:llä
(/Users/Shared/Claude/osoitekirja.md): PT local_5df52e10-10e4-4b72-9554-0049db300dfe (≤ 3 riviä), Julkaisija local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914,
NUI local_44392b3c-86ee-4873-9d76-82f9aaa6b832, NS local_674b9ec4-e2f3-48e9-a810-a129f20a4f03, Valoseppä local_c238f4af-ae73-44e7-81f1-92848acd9217,
SK local_72d15713-eb20-402b-95f7-87bdaaf91b74, Siirtoseppä local_86d0c984-aeeb-430d-bc85-3112f27b9437. Simu iPad 00CF62C2. Ei testejä junaan.
Commons-haut: /w/api.php kuvaavalla User-Agentilla, peräkkäin (Raamattu VERKKOLÄHTEET); lisenssi mallineista (PD-USGov-NASA[-AP]).

## 1. KESKEN: REVONTULISKANNERIN SIMUAJO (KÄYNNISTÄ UUDELLEEN HETI – taustaskripti kuolee nollauksessa)
Julkaisijan jonossa käännös linssiseppa/kuvat-196d = 74b431a93 (kuvat-196c + revontulet-skanneri-196) → _tyo/linssiseppa/kuvat-196d-app,
lippu simu-kuvat196d.nyt (Julkaisijan arvio 22.30–22.50). Käynnistä (run_in_background):
  zsh proto-3d/tyokalut/linssiseppa-ajot/ajo-revontuliskanneri196d.zsh > …/ajo-revontuliskanneri196d.log 2>&1   (odottaa lippua)
Jos lippu on jo olemassa, ajo alkaa heti. Lopuksi SIMU VAPAA Julkaisijalle. Skenaario sk-revontuliskanneri-196d.txt:
- R1 revontulten nimi kirkkaimman verhon kohdalla (taivasskanneri 1, revontulet uudet1 kp8, taivas lappi), R2 skanneri taivas-revontulet
  (SK:n tekstit + ISS-45-kuva). → kuvat PT:lle. KYTKIN POIS kunnes omistaja on nähnyt (PT 22.0x).
- P1/P0 Black Marble -pari Bangkokista SAMALTA ETÄISYYDELTÄ (PT 22.0x: edellinen pari 279 vs 507 km): koosta
  `python3 -I proto-3d/tyokalut/linssiseppa-ajot/koosta_pari.py <ulos.png> <versio> P0:… P1:…` → PT (omistajan pari).

## 2. VALMIIT TÄNÄÄN (tämä vuoro)
- Kuvasarja f (3dfe0967c): PT hyväksyi omistajalle nimet-paalla-vs-pois + skannerin-taivastila (_valmiit/iss-yotaivas-196f-20261015).
- KupoliNimet.Valittu 855422e2a (Siirtosepän rajapinta: valitun paikan nimi 0,024-koolla täydellä alfalla, muut 0,3; testikomento
  astro kyyti valittu <nimi>|pois). Siirtoseppä cherry-pickasi KupoliNimet-osan omaan haaraansa (70883ee13), yhdistyy puhtaasti.
- Black Marble -korjaus ce4492460 (4 tiilipaikkaa, naapurit reunan lähellä, `maailmavalot pois` vapauttaa). Simu 5bdf5fd99 0 virhettä,
  PT kuittasi → NS:LLE JUNAAN 196: linssiseppa/yotaivas-196 kärki ce4492460 (sis. 8686dcbf1, 855422e2a; korvaa dd7fc0b3f:n).
  Kuvat _valmiit/iss-yovalot-maailma-196c-20261015.
- KOHOKOHTAKORTIT 9/9 ÄMPÄRISSÄ (200 OK), NUI:lle ilmoitettu: revontulet + kiinan-muuri (simukaappaus c248e093d,
  _valmiit/iss-kohokohdat-kortit-20261015) ja 7 NASA PD -kuvaa Commonsista (_valmiit/iss-kohokohdat-kortit2-vienti-20261015, LAHTEET.md:
  Gerstin ESA-hurrikaani hylätty → Ed Lun Isabel; tulivuoreen alkuperäinen Sarychev_Volcano.jpg, ei CC BY-SA -muokkausta).
- Revontulet taivasskanneriin: haara linssiseppa/revontulet-skanneri-196 (31ff02299 koodi, c846d5e90 SK:n tekstit #4666 + kuva
  taivas/kuvat/25420ce5ef8cbf41.png ämpärissä). Sisältää linssiseppa2/revontulet-196:n (Havainto). TaivasKohteet 6/6, unity-tarkistus 0.
  Kytkimen AstronauttiKerros.TaivasSkanneri takana (oletus pois). EI vielä NS:lle – ensin simukuva PT:lle (kohta 1).
- Valosepän löydös `revontulet iss` (päivä, ei soikiota) → korjattu Valosepällä 8d7f26d05.

## 3. AVOIMET
- EUROOPAN LINNAT -linssi: PT antoi 21.2x, ESTETTY (omistaja 12.10. "työlistalla myöhemmin, EI aloiteta" + Olavinlinna tauolla 13.10.,
  ei uusia sivuprojekteja). Ilmoitettu PT:lle; älä aloita ilman omistajan päätöstä.
- Pulun kesäyön opetuslause SK:lla omistajan hyväksyttävänä → kytkentä TaivasKohteet.AsemaVarjossaYlla.
- Kun omistaja kuittaa skannerin taivastilan → AstronauttiKerros.TaivasSkanneri = true (oletus) ja uusi sha NS:lle.
- Black Marblen tiilikierto kelauksessa: kohteesta toiseen siirryttäessä ladataan monta 4096²-tiiltä (~21 Mt GPU / tiili, loki 196c);
  harkitse latausta vasta, kun kelaus on pysähtynyt, jos NS/laitetesti näkee piikkejä.
- tools/gpu-vapaa.sh ja .claude/settings.local.json* checkoutissa eivät ole minun (älä committaa).

## ALOITUSVIESTI SEURAAJALLE
Olet Linssiseppä (Opus, high). Lue CLAUDE.md ja tämä luovutus (git show <sha>:docs/raportit/viesti-linssiseppa-luovutus-20261015-2212.md).
Ensin kohta 1: käynnistä revontuliskannerin taustaskripti heti (odottaa Julkaisijan lippua simu-kuvat196d.nyt), sitten kuvat PT:lle.
