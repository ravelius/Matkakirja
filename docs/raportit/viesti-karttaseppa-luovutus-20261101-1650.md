# Karttaseppä: luovutus 1.11.2026 klo 16.50 (KS local_740947d7)
Edellinen: viesti-karttaseppa-luovutus-20261101-1515.md (käsitelty). Syy: kontekstivahti 25 %.
C = `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-pohja/codex-pseudo3d/`, L = `C/lahitaso-20261101/`. Jokaisessa kansiossa MUISTIO.md.
Postilaatikko: `C/postilaatikko-tyokalut/kuittaa.sh <md> <polku> <viesti>` (vaihda S= omaan scratchpadiin, rivi 4); kansiotilaus postita2.sh.
Codexin vahti: odotusskripti, joka fetchaa origin/claude/postilaatikko minuutin välein ja päättyy ei-"Karttaseppä"-commitiin (Bash run_in_background).

## TEHTY (15.15–16.50)
- **Rengas 1 HYVÄKSYTTY (PT 16.10).** Uusinta renkaan 2 tavalla 045e9ed8e (ohje ilman G-kaistaa + viite-<n>.png), r06c08 = otto 003
  (f8f85ebf7), jatko 4111a5ae4 (yksi otto per pala, ei ankkureita), 11 palaa 6dd026d5e. Lopullinen `L/rengas1-uusinta/koottu-rengas1.png`
  (G-origo 1195,715). Kamerassa 23/23 hyväksytty (21 alle 1,3; G–r06c11 1,24, G–r09c11 1,31 PT:n luvalla). Invalidit 377 / Garnier 376 px
  kelpaavat (PT). Panthéonin kupoli POIKKEUKSELLA (pala voittaa G:n sisäosassa, PT 16.1x).
- **Uudet työkalut L:ssä:** vaanto.py (laikku-NCC → JÄYKKÄ siirto + jäännöskenttä, vaimennus 700 px; reunaan jää tyhjä alfakaista, jonka
  seuraava rengas täyttää; tulostaa venymän ja kallistuksen); liitos.py: SYVYYS 128 (pohjan sisäosa pikselilleen), kulmaleikkaus
  (Dijkstra), VAANTO=1, POIKKEUS, HAIVYTYS, OMISTAJAT (kamera-saumat.py); ohjeet.py: VIITE=1, VALMIS=<koottu>:gx,gy, ERA.
  Kokoamisskriptit L/kokoa-r1u.sh ja L/kokoa-r2.sh (polut sisällä; scratchpadin polut vaihdettava).
- **Rengas 2 (20)** tilattu 55969ea33 (korvaa 17a389d40), tullut 4f4a7501b (SHA 20/20), koottu `L/rengas2/koottu-rengas2.png`
  (7511 × 4599, G-origo 2390,1430). Kamerassa 38/39 alle 1,3 (r05c08–r05c09 1,43). Riemukaari 202 px kelpaa.

## AVOIN (järjestyksessä)
1. **LISÄYS 17.0x – PT HYVÄKSYI renkaan 2** (Riemukaari 202 px ok). Uusinnat Codexille **d8051f83a** (yksi otto kumpaankin):
   r06c07 (Eiffelin yläosa ja kärki jatkavat r07c07:n tornia, keskilinja x ≈ 420) ja r05c09 (sauma r05c08:n kanssa 1,43;
   HAIVYTYS 20 antoi 1,46, ei apua). Viitteet koottu ilman näitä kahta: L/kokoa-r2-ilman2.sh (koottu-r2i2). Toimitus
   `_review-era2-20261101/pariisi-lahi-<nimi>-uusinta.png`. Kun tulee: SHA → korvaa kokoa-r2.sh:ssa r06c07/r05c09 uusinnoilla →
   tarvittaessa POIKKEUS="r06c07:<tornin alue>" (ettei r05c07 tai rengas 1 leikkaa tornia) → kamera → pari PT:lle → rengas 2 valmis.
2. Kun uusinnat koottu ja PT kuittaa → rengas 3 (ohjeet.py ERA=era3 VALI=v2 VIITE=1 VALMIS=L/rengas2/koottu-rengas2.png:2390,1430;
   palat suunnitelma.py:stä; renkaat 3–6 PT:n luvalla).
3. G-alue näkyy koosteessa hieman haaleampana kuin renkaat (vanha G:n sävy) → mainitse PT:lle, kun rengas 2 kuitataan.
4. tee-tasot.py ja NS-LISTA (luovutus 13.43 kohta 3) ennallaan; siivottavissa L:n kokeilukoostot ja *.ennen-*.py.
