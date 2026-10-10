# Linnanrakentajan luovutus 11.10.2026 yö (00.5x, nollaus 50 %)

Edellinen: `viesti-linnanrakentaja-luovutus-20261010-iltayo.md` (loppuosiot "JATKO 22.1x–22.3x" ja "JATKO 22.3x–22.6x" + jatkorivit = tämän jakson
yksityiskohdat). Haara `linnanrakentaja-tyo-20260929`. Ei taustaajoja. Worktree auki: `/Users/Shared/Claude/wt/linnanrakentaja-linna-v45k`
(Olavinlinnan vientihaara, pohja v45j; poista vasta kun v47f on kuitattu ja uusi vienti ei enää tarvitse sitä).
Python-kuvatyökalut: `/Users/Shared/Claude/proto-3d/_tyo/venv-rembg/bin/python -I`. KESKITYS (omistaja): Olavinlinna > kippi > taidemuseo > kartta.

## JONO (PT 00.5x)
1. **OLAVINLINNA v47f** odottaa Siirtosepän pelikuvaparia laiturilta ja portilta (samat kulmat kuin v47e:ssä:
   `proto-3d/lokit/todistus-olavinlinna-v47e-20261010-2333/pari/`). PT kuittaa kuvista. v47d on junassa 180, v47f menee junaan 181.
   - 1499 PALA b257fdf63e18f222 (blender d9e8157ba18d3b20), NYKY PALA 695db038346095af (blender e1c6c2cd18dee278), haara v45k b9aacdf04 / ca0821cf6.
   - Sisältö: (1) rantakivet v2b `_valmiit/olavinlinna-rantakivet-v2/` (lohkareet 4–7 lohkopintaa, särmät 32°, vedenalaiset pois 0,35 m:stä,
     märkä vyö 0,7 m, tummempi kivi, jalusta täysleveä; v2a tallessa glb-v2a/, v1 glb-v1/); (2) porttiaukon 1499-täyttö loivaksi rantakallioksi
     `olavinlinna-kavely-v1/lahde/ranta1499_portti.py` (0,3 m/m vedestä, enintään −5,6, Gauss σ 1 m, muurien helma 1,6 m; lähtö
     ranta1499_ennen_portti.json = v47d, v47e-versio ranta1499_v47e.json). Ajo: portti.py → kavely.py <tmp> → kopioi ranta-1499*.glb
     v44/kavely → `leivo_ranta_v25.zsh`. Rantakivet: Blender rantakivet.py <v41-kuori> glb → rantakivet_hamara.py → sips 1024 → astc-mip.swift,
     kopio molempien pakettien ymparisto/mallit/. Vienti: scratchpad-skripti vie_v47f.zsh (kaava = luovutuksen 20261010-iltayo v47d-kaava, haara v45k).
   - v47e HYLÄTTY: jalusta 0,8 × paljasti natiivin suorareunaisen vesilaatan, ja portin −6,0-tasanne päättyi metrin jyrkänteeseen.
   - Jos v47f:ssä yhä vikaa: laiturin laatta = natiivin vesimaskilaatta (Siirtosepän puoli), kivien muoto = rantakivet.py lohkare().
2. **Siirtosepän mallivirheet erinä** (läpipeluu; huoneet 3–10 tulevat kameralla erikseen): korjaa v47f:n päälle → v47g.
3. **ND v5g HYVÄKSYTTY** (PT 00.5x; LS2:n pelimittaus lyijykatto 161/162/162 vs IGN 159/164/165, aukio v5d:n tasolla).
   `notre-dame-v1/tekoaly-v5g/` (LAHTEET "v5g"). Pyysin LS2:ta pakkaamaan sen seuraavaan omat-mallit-vienti-pakettiin (LS2:n ketju:
   mallit.json v6k*, ktx2, tileset, helma; v6k15 viimeisin), Julkaisija vie vie-paketti.sh:lla. Jos LS2 pyytää minua tekemään paketin: malli
   `_valmiit/omat-mallit-vienti-20261010o/`. Osoitin vasta omistajan hyväksynnän jälkeen.
   - Myöhemmin (PT): julkisivun lämpö yksi pieni askel kohti oikean kuvan beigeä (kalkkikivi nyt 135/128/116; kiviportti hylkää jos pelin b/r < 0,85).
4. **Museo v2g** (`_valmiit/taidemuseo-alankomaat-v2g/`, LAHTEET "v2g") on LS2:lla: 11 tyhjää seinää täytetty, jalustat profiloitu + kivi_hiekka.jpg.
   LS2:n täysi läpipeluulista tulee junan 180 jälkeen. **RP-P-OB-612 ja RP-P-OB-616** (kertojan teokset) puuttuvat salista: ripusta vain jos
   LS2/PT pyytää (lahde/alankomaat.py, sopii='grafiikka' → esim. graf- tai m2-seinä; aja_tuotanto.zsh).
5. **Pariisin korttelit v2** (`_valmiit/pariisi-korttelit-v2/`) odottaa LS2:n paketointia ja pelikuvaa (Concorde: Palais Bourbonin portikko).

## Muuta tällä jaksolla
- Vertailuportti: `kaupunkipinnat-v1/lahde/vertaa_orto.py` --origo + --meta -siirtovirhe korjattu (vanha vertaa_orto_ennen_origo.py). Olavinlinna
  nyky -raportti PT:llä (json docs/raportit/kaappaukset/linnanrakentaja-olavinlinna-20261010/vertailuportti-v47e-nyky.json). VHR-orto vain sisäiseen.
- Ortoportti lukee ND:n katot ~20 %-yks. peliä tummemmiksi (v5g −19 % hylkää, peli kohdallaan) → katoissa pelimittaus ratkaisee.
- Levysiivous 7,6 Gi (vanhat scratchpadit; `olavinlinna-codex-ohje-v46t` → T7 `/Volumes/T7 4TB/Matkakirja-linnanrakentaja/_valmiit/` symlinkillä).
- taidemuseo-runko/lahde/sali_blender.py: jalustaprofiili (vanha sali_blender_v2f.py) koskee kaikkia saleja, joiden jalusta ≥ 0,45 m.
