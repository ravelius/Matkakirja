# Linssisepän luovutus 18.10.2026 klo 14.05 (Postivahti: KOVA RAJA 37 %)

Edellinen: viesti-linssiseppa-luovutus-20261018-1046.md. Id:t /Users/Shared/Claude/osoitekirja.md (PT local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc,
JU local_1325b8e8-c39c-49f0-9ba2-7cabd4f44629, NS local_04e2850b-d63c-481d-be73-c7d784a7cbcb, Postivahti local_63227b57-d045-4b93-ab52-cddc04e3b90f).
PT 14.0x: Mona Lisa -kävely JUNAAN 203 (NS revertoi kävelyn junasta 202). EI ENÄÄ AJOJA TÄNÄÄN (viikko 95 %).

## 0. KÄYNNISSÄ LUOVUTUSHETKELLÄ
- Käännös 202h (1d9d29c76, L1, alkoi 14.02, lukko "linssiseppa/museo-valahdys-202 14:02") valmistuu ~14.15. Ajo
  proto-3d/tyokalut/linssiseppa-ajot/ajo-alku202h.zsh jää sen jälkeen odottamaan lippua simu-alku202h.nyt. JU:lle sanottu 14.04:
  simuvuoro PERUTTU, lippuun ei kosketa. Edellinen Linssiseppä lopettaa odottavan ajon (kill ajo-alku202h.zsh -prosessi), kun
  "KÄÄNNÖS LOPPU" on ajo-alku202h.log:ssa, ja kirjaa sen Postivahdille. Jos et näe tätä tehtynä: pgrep -fl ajo-alku202h → kill (EI kesken käännöksen).

## 1. MONA LISA -KÄVELY (haara linssiseppa/museo-valahdys-202, worktree /Users/Shared/Claude/wt/proto-linssiseppa-pyramidi, kärki 1d9d29c76)
Simuajot proto-3d/lokit/todistus-alku202-{b,c,d,e,g}-iphone-20261018-* (sk-alku202-iphone.txt; video alku.mp4):
- b 1042 (005a4856): salin 3D seisoi sivun jälkeen ~3 s ja hyppäsi 7,37 s puoliväliin. Logiikka tasainen (testi: askel ≤ 2,2 cm / ruutu).
- c31ca5e4c kävely vain piirtyvällä kuvalla → c 1220 (load 176): odotti 12,8 s, mutta näytönohjain ~4,5 s jäljessä → hyppy 9,83 s.
- 4f4adfd31 portti AsyncGPUReadback-kuittauksesta (MuseoNayttamo.GpuValmisAika) → d 1256: koko kävely näkyy, 1,3 m nykäys patsaan
  latauksen 0,9 s:n ruudussa.
- e700eccd2 vakaa lähtö + pitkä ruutu (> 70 ms) pysäyttää kellon → e 1314: 3D:n palatessa 0,7 s ennen sivua piirretty kuva → nykäys.
- bdffb21f9 valinta tyhjentää salin kuvan mustaksi (TyhjennaKuva), musta kalvo kunnes kävely lähtee;
  f239197a3 musta < 0,5 s (VakaaS 0,25 + häivytys 0,22; PT 13.2x), kuittaus vain piirretystä kuvasta.
- g 1355 (6fb4ab88, kone kuormaton): ALKU PUHDAS (musta ~0,4 s pehmeästi, ei vanhaa kuvaa, kävely 11 s näkyvissä), MUTTA 8,55 s
  (kävelyä ~3,8 s) yksi ~3 m hyppy tasaisilla ruuduilla (max 21 ms; perspektiivi = siirtymä, ei FOV). Kuvat samassa kansiossa:
  hyppy-855-ruudut-511-514.png, alku-musta-haivytys.png.
- Poissuljettu logiikkatestillä (MuseoKierroksenAlkuTestit-tyyliin, väliaikainen ZZDiag poistettu): kuvasuhde 9/19,5 ja 965/2098,
  KehysIrrotusM 0,08, AutoZoom pois, kuvasuhteen vaihto kesken kävelyn (MuseoKierros.cs:1542 vaihtaa päätepisteen + Mittaa(), mutta
  ei MittaaKaarteet – tällä suoralla reitillä ei hyppyä; muuten epäilyttävä kohta).

## 2. SEURAAVA ERÄ (junaan 203, PT:n luvalla ajot)
1. KAMERALOKI: 1d9d29c76 lisää vahdin MuseoSovitin.VahdiKamerahyppy: "museo: KAMERAHYPPY X m (a) → (b), vaihe aika/kesto, dt,
   tauko, osoitus, ovi, saapumisia" kun siirtymä > 0,3 m / ruutu. Aja sk-alku202-iphone.txt (käännös 202h on valmiina
   _tyo/linssiseppa/juna202h-app, kun se valmistuu; ajo: ajo-alku202h.zsh:n simu-osa).
   - Jos KAMERAHYPPY-rivi tulee: syy on pelin kamerassa → rivin tiedoista (VaiheenAika, osoitus/ovi) kohta koodiin.
   - Jos ei tule mutta video hyppää: kuva ruudulla jää jälkeen (UITK / RenderTexture / simulaattorin esitys) → selvitä laitteella.
2. Kun puhdas: video PT:lle → KK → NS (junaan 203).

## 3. MUUTA TÄNÄÄN
- e3155833b (wt/proto-linssiseppa-kierrokset195, linssiseppa/hefaistos-195): todistusajon kuvamerkintä omalle raidalle kuvan alle
  (omistaja 12.14 PT:n kautta, Raamattu #4872). Todistusajo ajetaan tästä worktreesta – älä poista.
- Worktreet: poistettu proto-linssiseppa-orsay (pyramidi v2.4 korvattu 1f7fa6ce8:lla) ja linssiseppa-posti (pushattu; tyhjä kansio
  .DS_Store jäi). Jäävät: pyramidi, kierrokset195, monalisa, tuotantopohja-linssi (PR #4771 auki).
- Omat appit _tyo/linssiseppa: juna202e-app, juna202g-app (+ juna202h-app tulossa); b, c, d, f ja alku202 roskakorissa.
- tools/gpu-vapaa.sh ja .claude/settings.local.json* eivät ole minun.

## ALOITUSVIESTI SEURAAJALLE
Olet Linssiseppä (Opus, high). Lue CLAUDE.md ja tämä luovutus. Tarkista kohta 0 (ajo-alku202h odottaa lippua → kill, jos elossa).
Tänään ei ajoja (PT). Seuraava erä: kameraloki-simu Mona Lisalle (kohta 2) vasta PT:n luvalla; muuten jono tyhjä → rivi PT:lle.
