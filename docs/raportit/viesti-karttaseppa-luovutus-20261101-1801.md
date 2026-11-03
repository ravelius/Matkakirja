# Karttaseppä: luovutus 1.11.2026 klo 18.01 (KS local_740947d7)
Edellinen: viesti-karttaseppa-luovutus-20261101-1650.md (käsitelty, 985424e6d). Syy: kontekstivahti 25 %.
C = `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-pohja/codex-pseudo3d/`, L = `C/lahitaso-20261101/`. Jokaisessa kansiossa MUISTIO.md.
Postitus: `C/postilaatikko-tyokalut/postita3.sh` (vaihda S= omaan scratchpadiin, era3 → eraN). Codexin vahti: skripti, joka
fetchaa origin/claude/postilaatikko minuutin välein ja päättyy ensimmäiseen ei-"Karttaseppä"-committiin (Bash run_in_background).

## TEHTY (16.52–18.01)
- **Rengas 2 KUITATTU (PT 17.1x).** Uusinnat fb08610df: r05c09 käytössä (sauma 1,43 → 0,96). r06c07-uusinnan pitkä Eiffel EI
  käytössä (akseli 75 px sivussa): r07c07:n oma torni suojattu tornin muotoisella POIKKEUKSELLA (kokoa-r2b.sh). 39/39.
  G:n sävy sovitettu (g-savy.py, liukuma 300 px, G:n ulkopuoli pikselilleen) → LOPULLINEN `L/rengas2/koottu-rengas2-s.png`.
- **Rengas 3 KUITATTU (PT 18.0x).** Codex ae7e4b8fa (28, SHA 28/28). `L/kokoa-r3.sh` → `L/rengas3/koottu-rengas3.png`
  (9901 × 6029, G-origo 3585,2145), 55/55 alle 1,3. liitos.py: SYVPALA (palakohtainen syvyys; tässä r10c06 ja r04c12 256) ja
  REUNA=1 (kehyksen reuna liukuu pohjaan) korjasivat kaksi kovaa reunaa (vanha: liitos.ennen-reuna.py). Sacré-Cœur ~335 px.
- **Rengas 4 (32 palaa kaupungin reunaan) Codexille bddbd4686** (ohjeet.py ERA=era4 VALI=v2 VIITE=1
  VALMIS=L/rengas3/koottu-rengas3.png:3585,2145; Sacré-Cœurin yläosa r03c10; kulmat ilman kaupunkia pois). Toimitus
  `/Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-lahitaso/_review-era4-20261101/`.
- **G:n utuisuus (PT pyysi korjausta koosteessa):** g-terava.py (kaistavahvistukset, KROMA). Mitattuna G on jo renkaiden
  tasolla (terävyys, kirkkaus, kylläisyys); vahvakin käsittely muuttaa vähän (rengas3/g-terava-pari.jpg). Syy sisältö: G:ssä
  harvat puut ja leveät valkoiset kadut (rengas3/g-raja-1to1.jpg). Vietiin PT:lle 18.01: korjaus vaatisi G:n 4 palan uusinnan
  (uudet otot = PT/omistaja). Koostetta EI muutettu.

## AVOIN (järjestyksessä)
1. **Rengas 4 Codexilta (bddbd4686)** → SHA → kokoa: kopioi kokoa-r3.sh → kokoa-r4.sh (pohja rengas3/koottu-rengas3.png
   3585,2145; palat myötäpäivään r03c06 … r04c05; SYVPALA tyhjäksi aluksi) → kamera-saumat → yli 1,3: profiloi raja (ero vs
   vertailu) ja kokeile SYVPALA=<pala>:256 vain sille palalle → Sacré-Cœurin jatkuvuus erikseen → pari välitaso | lähitaso PT:lle.
2. **G:n utuisuus – PT PÄÄTTI (18.0x):** kuitattu sisällöksi, EI uusintaa nyt (1:1-rajalla lievä tyyliero, näkyy lähinnä
   koko kaupungin yleiskuvassa). Kun KOKO lähitaso on valmis: kuva pelin kamerasta G:n reunalta (lähi- ja välietäisyys) PT:lle;
   jos raja erottuu pelissä, G:n 4 palaa uusitaan silloin renkaiden tyyliin.
3. Seuraavat erät suunnitelman mukaan: Bois de Boulogne (27), Bois de Vincennes (21), renkaat 5+ (suunnitelma.py) PT:n luvalla.
4. tee-tasot.py ja NS-LISTA (luovutus 13.43 kohta 3) ennallaan; L:n kokeilukoosteet (*.ennen-*.py, kamera-saumat-r2*/r1*) siivottavissa.
