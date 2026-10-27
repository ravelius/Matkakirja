# Pelikoodari: luovutus 27.10.2026 klo 18.05

Seuraava Pelikoodari jatkaa tästä. Muisti: pelikoodari-tila-20261018-aamu.md (UUSIN). Edellinen luovutus: 681613733 (-20261027-1623).

## Haara
- Proto `pelikoodari/c2-fg-212` (worktree /Users/Shared/Claude/wt/proto-pelikoodari-fpv-211, paikallinen proto-git, ei pushia), pää e6d252329,
  ei junassa. Ketju: 9b97dc324 C1 → 77f5abf6f kielletty-c2-v2 → dbf343a16 land_soft → 584397011 + e6d252329 käännetty ote.

## Tehty
- **C1-räystäät varmistettu kuvin**: v3 (esikatselu-20261027-164304, testikamera 12 m; sk-c1-lahelta.txt) ja LR:n C1 v4 juuri-v85m:llä
  (esikatselu-20261027-173252: Baohedian 324, Taihemen 284, Meridiaani 1136, kulmapaviljongit ok) → LR + PT kuitattu.
- **PT:n havainnot**: taivaan porrastus = peli → VS korjasi (seinat-211 a75966b7e). Kultakaton läikät tulevat A:n LOD0:n valo_rgbm-UV:stä
  (LR, uusi leivonta PT:n luvalla).
- **F-ristiriita**: LR kielletty-c2-v2 (v53-pohjainen kaiteeton F) kytketty 77f5abf6f. Juuri-v85m:ssä kansionimet ovat ennallaan
  (kielletty-c1-v3 → c1-v4, kielletty-c2-v2 → c2-v3), joten koodia ei tarvinnut muuttaa.
- **Codex rimpuilu v2 + kevyt alastulo** (KK 17.0x): koejuuri _tyo/pelikoodari/hahmot-v8-koe (LAHDE.txt; Puyi = land-soft-review-v1,
  ottajat = struggle-back-review-v2, SHA OK). land_soft hypyn loppuun (dbf343a16: 0,12 s ennen maata, 0,6 s).
- **Codexille** (claude/postilaatikko): b0f280394 vastaus IK:hon (ei runtime-IK:ta; 0,18 s lineaarinen häivytys; IK vasta, jos irtoaminen
  näkyy) ja portaisiin (askelnousu ≤ 0,20 m, askelma ≥ 0,15 m, ≤ 25°, jalkoja ei kohdisteta; vault_high ei tarpeen, esteet 0,5 m).
  0d4918f16: eunukin tyhjät kasvot (KK).
- **Repliikit (OMISTAJAN PÄÄTÖS 17.25: otot 4 ja 9)**: Äänittäjä vei ämpäriin hahmoaanet-v2/eunukki-sainpas-sinut.mp3 +
  keisari-paasta-irti.mp3. Molemmat ovat HTTP 200, ja koodin nimet ovat ennallaan.
- **OMISTAJAN PÄÄTÖS 17.48 käännetty ote** (e6d252329): JuoksuV4Maailma.KiinniKaanto = true. Otteen jälkeen (KiinniottoS) pari kiertyy
  180° ottajan pitopaikan ympäri KaantoS 0,5 s, keisari kasvot kameraan ja ottaja takana. Irti päästessä kierto palaa
  irtiOttajan ympäri. QA `ui juoksupeli kaanto 0|1`, `ui juoksupeli rimpuile` (napautus editorissa).
  JuoksuOpetus: ohje pois, kun Kiinni ≠ Ei ("Pyyhkäise…" peitti "Kiinni! Napauta nopeasti"). Opetustestit 2/2.
- **Videot KK:lle**: v3 rimpuiluvideo3-dbf343a16.mp4 (KK hylkäsi peiton takia) ja **v4 rimpuiluvideo4-e6d252329.mp4**
  (_tyo/pelikoodari/rimpuilu-ylakulma-20261027/; ruudut4/; simu-rimpuiluvideo4.txt). Ääni: wav −ss = videon ja kaappauksen
  alun ero ajo.logista (v4 1,0 s, v3 2,0 s), ilman -shortestia (apad + -t videon kesto).

## Odottaa / seuraavaksi
1. **KK:n/omistajan arvio v4:stä.** Avoimet havainnot: irtipäästössä 0,5 s:n kierto ottajan ympäri näyttää hypähdykseltä (vaihtoehto:
   käännös paikallaan + pidempi KaantoS). Toisen kiinnioton alussa "Pyyhkäise…" näkyy yhden ruudun ajan ennen otetta (ohje syttyy
   kirimisen aikana; harkitse ohjeen estoa, kun AjajaKirii > 0). Isot käsiliikkeet näyttävät paikoin suorilta sivuille (Codexin v2).
2. **LT A/B c2-rak** dbf343a16:n laiteappilla (JU: lokit/pk-c2fg-212-dbf-laite). LT kopioi kielletty-c2-v2:n
   Documents/juuri-v77m-kevyt/:iin. Tulos PT:lle ennen merge-pyyntöä.
3. Codexin vastaukset: eunukin kasvot (0d4918f16) ja tarvittaessa IK.
4. hahmot-v5…v8-koe EI ämpärissä (JU/PK ennen junaa). Repliikit ovat ämpärissä.

## Opit
- esikatselu: `valo jaady` pysäyttää myös juoksun → kuvasarja ei etene. Hypyn/alastulon tarkistus simuvideosta (tiheät ruudut ffmpeg fps=6 + tile).
- tyokalut/*.sh ajetaan `zsh <polku>` (suora ajo: permission denied).
- Testikamera (`valo testikamera <korkeus> <taakse> <alas> <fov>`, negatiivinen taakse = eteen, negatiivinen alas = ylös) + `valo sijoita x z suunta`
  = palatsin pohja-/glTF-kehyksen x, z (glTF-sijoitusten matriisin sarake 3 suoraan).
