# Karttasepän luovutus 26.10.2026 klo 13.4x (Postivahti: kova raja 42 %)

Lue ensin CLAUDE.md, tuotannonohjauksen osio 0 (`git show origin/main:docs/tuotanto/tuotannonohjaus.md`) ja
`node tools/raamattu-luku.mjs 7.47` (Karttaseppä: luvut 2 ja 6). Edellinen luovutus: 82aa7c56d (`viesti-karttaseppa-luovutus-20261026b.md`).
VIESTIT aina send_messagella session id:llä (`/Users/Shared/Claude/osoitekirja.md`), PT:lle ≤ 3 riviä. Käännökset ja simut
vain Julkaisijan jonon kautta (KÄÄNNÖSPYYNTÖ → KÄÄNNETTY → SIMU NYT → SIMU VAPAA). KAIKKI KÄÄNNÖKSET b6:lla (PT 13.2x):
b5-pohjainen käännös palauttaa L1/L2:n Libraryn b5:lle (~30 min).

## Tila: proto-haara `karttaseppa/elava-kartta`, kärki 6f3102236 (b6, peilissä, PT kuitannut)
wt `/Users/Shared/Claude/wt/proto-karttaseppa-elava-kartta`; peili:
`git push natiivi-backup karttaseppa/elava-kartta:refs/heads/peili/proto/karttaseppa/elava-kartta`.
Tarkistus: `zsh tyokalut/tarkista.sh` (palauta sen jälkeen `git checkout -- Assets/Matkakirja/UI/Resources/MatkakirjaUI/Tyylikirja.uss
Assets/Matkakirja/UI/Tyylikirja.cs tyylikirja/tyylikirja.json`), `Kartta-testit/kaanna.sh` 546/546, `Linssit-testit/kaanna.sh` 2213/2213.

Tänään tämän luovutuksen aikana (kaikki 6f3102236:ssa):
- d3130bafc rinnevalo Z12+ → todennettu simussa (lokit/todistus-elava-vertailu-20261026-1203/-1206), PT kuittasi; parit
  `proto-3d/_tyo/karttaseppa/elava-kartta-20261025/pari-rinnevalo-*.png`, `pari-thames-peli.png`, `tarkistus-rinnevalo-20261026.md`.
- 5dd6d352d ESILATAUS: vahvistetun kohteen (taso ≤ TamaKaupunki) ympäristön OpenMapTiles-palat z11–z14 (~180, ElavaEsilataus.cs)
  levylle saapumislaattojen jälkeen, yksi kerrallaan, odottaa Kiireinen/Esilataaja.Seis; jatkuu perillä, uusi kohde keskeyttää.
  Lokirivi "MATKAKIRJA elävä kartta: esilataus <kaupunki> N palaa (haettu, levyllä, puuttui) s". EI VIELÄ TODENNETTU pelissä.
- aae00fc87 kuumana yksi piirto kerrallaan.
- 409320f8c merge pelikoodari/sarja-pysty c19d4a826 (VS:n yhtenäinen sarja, arkit 9–10).
- b4767cf6c Karttaesineet.Oletus = true (sarja päällä, käynnistyksessä seepia), galleria palauttaa oletuksen; Zaanse Schansin
  vanhat myllyt (ElavatElementit/MyllyGeometria) poistettu (omistaja 12.44).
- 4e234eb3b elävät elementit sarjaan (ElavatSarja.cs): karuselli, gondoli (yksi), London Eye, höyrylaiva (ei savua); Symbolimalli-
  varjostin, koko Karttaesineet.Mitta, Pysty, sarjan maavarjo; liike säilyy. Maavarjon sävy pelin alussa (KarttaesineGalleria
  .AlustaMaaVarjo; ennen vain galleriassa → C-polun ja elävien maavarjot puuttuivat pelistä).
- fb9f73994 tasankojen VARJOSTINkorostus (61188e673) PERUTTU: maastoverkko yleiskuvassa isoja kolmioita → tahkolohkoja.
- 0e2db759d merge b6-runko 9460c52c6.
- 6f3102236 Symbolimallit.Paalla = Karttaesineet.Oletus (PT 13.3x: uusin omistajan sana voittaa 29.9.) + Symbolimallit.Sarjassa:
  vain erikoismallit Sarja-verkolla, kategoriasymbolit ja sarjan arkkityypit 3D:nä; muut 2D (OnMalli false → ei molempia).
  Meren koristeet (MeriKoristeet, MeriMalli) ennallaan – eivät olleet PT:n listalla.

## SEURAAVAKSI (PT 13.4x, järjestys)
1. SARJAN SIMUVUORO: JU kääntää 6f3102236 → `_tyo/karttaseppa/elava-kartta-sarja-app` (L1, b6). KÄÄNNETTY → kirjoita
   `<app>/kaannos.out` rivi "KÄÄNNETTY 6f3102236 …" jos puuttuu. SIMU NYT 00CF62C2 (ei PK:n 39644E75) → kaksi ajoa:
   `SK=sk-sarja.txt ERA=sarja zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/elava-kartta-20261025/ajo-elava.zsh <app>`
   ja `SK=sk-elava-esilataus.txt ERA=elava-esilataus …` → SIMU VAPAA.
   - sk-sarja: Eurooppa, Lontoo, Kööpenhamina, Venetsia, Alankomaat, Kinderdijk + video `sarja-alankomaat` + `peli ruutu`
     (fps ja lämpö lokiin; PT:n ehto 3: ei välkettä, hyppyjä eikä fps-pudotusta). Tarkista video ruutu ruudulta
     (`python3 -I tools/valahdys-yavg.py <video> 4` pelirepossa) ja kuvat 1:1. PT:n ehdot: vain sarjan tunnusmerkit, ei 2D+3D samassa.
   - sk-elava-esilataus: Thames (vertaa todistus-elava-vertailu-20261026-1206 V1), Pariisi, Matterhorn, Amalfi lähin (omistaja
     12.37 "Sama tarkkuus ja ulkoasu koko kartalle."), Tanska T1/T2, siirtymävideo `elava-tarkennus-thames`, matka Amsterdamiin
     → grep konsoli-stdout.log "elävä kartta: esilataus".
   Kuvat PT:lle (Alankomaat + yleiskuva + koko kartta), 3 riviä.
2. ESILATAUSRIVIN todennus (yllä). Vaihtoehto: PT:n äppi `lokit/natiiviseppa-app-210-211-9460c52c6-laite` on LAITEkäännös
   (iphoneos), ei asennu simuun.
3. SIIRTYMÄVIDEO Z11–Z12 (omistaja 12.44 "tuleeko uuden kartan siirtymisestä pehmeä?"): elävä kerros tulee tasoittain
   (ElavaTyyli.Peitto: Z11 0,5, Z12 1) ilman ristihäivytystä. Katso video; jos porras näkyy, vaihtoehto: peitto useammalle
   tasolle (Z11 0,33 / Z12 0,67 / Z13 1) tai karkeiden viivojen häivytyksen hystereesi. Video PT:lle.
4. TASANGOT (PT hyväksyi kokeen ja ajon 13.4x): generaattorissa c71643abb (web-haara `karttaseppa-tasangot`, wt
   `/Users/Shared/Claude/wt/karttaseppa-tasangot`; reliefi.tasanko, oletus pois). Koe `proto-3d/_tyo/karttaseppa/elava-kartta-20261025/
   tasangot-koe.mjs` (GLO-90, NAS) ja `tasangot-koe-tanska-relief.png`; arvot { kerroin: 4, k0: 0.02, pohjaM: 1500 }, Alpit ero 0,04.
   Tee: uusi resepti tools/polttoresepti.mjs:iin (kopio 2026-09-25 + `--reliefi-koe` JSON {"tasanko":{…}} lämpimän päälle; tarkista,
   että lämmin oletus säilyy) + tests/peruskartta-resepti.test.mjs → pohja-ajo Z5–Z10 (`tools/polta-paikallisesti.sh --resepti …`)
   + pallosarja + ämpäri (pysyvä lupa 6.9). EHTO (PT): nice 15, vasta kun Mac joutilas ≥ 10 min, ei ikkunoita; taustalle.
   Sitten pelikuvapari Tanskasta (sk-tasangot.txt, ENNEN = d3130bafc-äppi lokit/todistus-tasanko-ennen-20261026-1317).
5. Tripo-vertailu myöhemmin (PT tuo kortin).

## Avoimet
- Gondolin sarjassa ei ole Rialtoa eikä kanavaa (yksi tunnusmerkki); jos PT haluaa sillan, ElavatSarja.Gondoli.
- Galleria (`ui galleria nyt`) ei rakenna elävien elementtien sarjaa uudelleen kytkimen vaihtuessa (Start lukee kerran).
- Symbolimallit.ArkkityyppiKartoitus nimisääntö `molen` osuu Smolenskiin ja Molen puistoon (ei näy: Mylly ei ole sarjassa).
- Paikallinen `.claude/settings.local.json` roolikansiossa muutettu (ei omani, ei commitoida).
