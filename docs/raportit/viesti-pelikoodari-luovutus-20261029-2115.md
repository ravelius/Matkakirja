# Pelikoodari: luovutus 29.10.2026 klo 21.15 (konteksti 40 %)

Seuraava Pelikoodari jatkaa tästä. Muisti: pelikoodari-tila-20261018-aamu.md (UUSIN). Edellinen luovutus -20261029-1840 (PR 5610).
Natiivirepon haarat peilissä natiivi-backup peili/proto/pelikoodari/<haara>; worktree /Users/Shared/Claude/wt/proto-pelikoodari-pk7-214.

## ENSIMMÄISENÄ: Codex-tilaus TÄNÄ ILTANA (PT 21.1x, omistaja hyväksyi osasarjan 21.07)
PT:n sanat: "Lähetä TÄNÄ ILTANA Codexille YKSI tilaus kaikista juoksupelin ainutlaatuisista osista havainnekuvien rajauksin:
harjakoristeet ja harjaeläimet, kannatinryhmät, ristikko-ovet, palkkimaalaus, kaidepylväät ja sivupaviljongit (3D → Tripo 3D -sessio,
pinnat/kuvat → kuvat-sessio; pohja docs/moduulit/tuotantopohjat/codex-3d-toimitus.md, liike: kaikki liikkumattomia).
Rinnakkaiset tekijät lähettävät sinulle osalistansa: Natiivi-UI = Taihedianin halli (erolista 1, 2, 5), Karttaseppä = Meridiaaniportti 06;
yhdistä ne tilaukseen, älä odota yli tunnin. Anna molemmille palatsin juuren polku ja havainne-editorin ajo (03/03b ja 06).
Tilauksen polku PT:lle yhdellä rivillä."
- NUI:lle ja KS:lle EI VIELÄ lähetetty juuren polkua eikä ajo-ohjetta → lähetä heti (id:t osoitekirjasta):
  juuri /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/kuja05-pk6-20261029/juuri-pk7-v72/ ; ajo natiivirepon haarasta
  pelikoodari/osasarja-215: `REF=<SHA> RUNKO=natiiviseppa/juna-214 PALATSI=file://<juuri>/ ESIKOM="ui juoksupeli palatsi url file://<juuri>/kk-pohja-v1d-pk7/pohja.json" zsh tyokalut/havainne/editori.sh 03 03b 06`
  (ilman kohtia = kaikki 8 + koonti.png/koonti.txt + pinnat.txt).
- Erolista (aukion osat): Matkakirja-fable/scratchpad/keskustelukanava/erolista-aukio-03-03b-20261029.md.
- Havainnekuva 07 puuttuu levyltä: `git show origin/claude/postilaatikko:posti/juoksupeli-havainnekuvat-810-20261021/07-yleiskuva-ylhaalta.png > /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/havainne-810/07-yleiskuva-ylhaalta.png` (PT 21.2x).

## Valmista tänään (kaikki PT:n kuittaamia)
- LR v71 → pelikoodari/lr-v71 bb7989fb1, junaan 215 (NS:lle merge-pyyntö, JU:lle ämpäripyyntö; JU vie TF 214:n jälkeen).
- Aukio 03/03b: pelikoodari/aukio-k23-215 60488bf3e (JuoksuLattia: k23 myös aukiolla 1,4 ×, kivijalka 0,15 m kerroksina; Metal 444/0).
  Parit havainne-editori-20261029-203346; 03b:n paikka tarkoituksella eri (PT 25.10.), PT hyväksyi.
- OSASARJA (spesi Matkakirja-fable/scratchpad/keskustelukanava/osasarja-juoksupeli-20261029.md), haara pelikoodari/osasarja-215:
  882debb2e pariajo 8 kohtaa + koonti (tyokalut/havainne/editori.sh, koonti.py), pintatarkistus (palatsipinnat.py +
  tyylikirja/palatsi-pinnat.json), muoto tyokalut/osasarja/MUOTO.md + esimerkki-ladonta.json (f88ee94e7), puhdas ydin
  Peli/Juoksupeli/JuoksuOsasarja.cs; 511ca08dc Unity-puoli (JuoksuOsasarjaKokoaja.cs niputtaa → JuoksuSokkeloMaailma.Osasarja.cs,
  OsasarjaKansio tyhjä = pois, QA palatsi osasarja-kansio <k>). Splines ei ajossa (PT kuittasi 21.2x). Peli 770/770, unity 0.
- LR v72 → osasarja-215 527beacc0 (tausta-v72, rakennukset-v54, MuurikateC2Kansio kielletty-c2-v4; esto = v14 tavulleen),
  juuri juuri-pk7-v72. PT kuittasi v72:n junaan 215.

## Odottaa
- LR v73: Taihemenin pohjoismuurit pois (z −195…−174,5). Vastasin LR:lle: ei nojaa reittiin, bottiin eikä avaukseen; PK leipoo eston
  uudelleen v73:lla (PALATSI_SISAAN/TAUSTA/RAKENNUKSET/ESTO_ULOS … kaanna.sh PalatsiEstoLeivonta, cmp v14:ään; ero → uusi palatsi-esto-v15x
  ja EstoTiedosto-vakio).
- LR:n osasarjan esimerkkipaketti (kielletty-osasarja-v1) → QA `palatsi osasarja-kansio kielletty-osasarja-v1/` ESIKOMiin, 8 kohdan pariajo → PT.
- Pintatarkistus vika-tilaan: v72:ssa vielä vanhaa pikkutiiltä 128 tiedostossa (V4_stone 86, V4_sokkeli 36, _kansi 6) → LR:n korjattava
  kaikki ennen kuin tila "vika" (tyylikirja/palatsi-pinnat.json kielletyt.*.tila); kerro PT:lle.
- Junaan 215 NS:lle: osasarja-215 (sisältää lr-v71 + aukio-k23-215 + v72) PT:n kuittauksella; lr-v71 merge-pyyntö jo NS:llä.

## Opittua
- 03/03b sovitettu kamera: testikamera 3.0 6.88 10 45 (keisari 1,00, horisontti +0,01/0); editori.sh:ssa nyt kaikki sovitetut.
- Metal-tarkistus ilman omaa Libraryä: esikatselu-2-kopiossa linjan 2 lukolla (mkdir /tmp/matkakirja-kaannospalvelu-2.lukko,
  `zsh tyokalut/metal-tarkistus.sh <ulos>`, rmdir); kopio on viimeisimmän esikatselun REF:ssä. Skripti: _tyo/pelikoodari/kuja05-pk6-20261029/ (ks. muisti).
- 8 kohdan ajo kestää ~16 min → aja taustalla (run_in_background).

## Jatko keskeytyksestä
- Taustaajoja ei ole. Worktree proto-pelikoodari-pk7-214 haaralla pelikoodari/osasarja-215 (puhdas, 527beacc0).

## Lisäys 21.2x (saapuneet osalistat; juuri ja ajo-ohje annettu molemmille)
- NUI (Taihedianin halli): proto-3d/_tyo/natiivi-ui/halli-215/rajaukset/tilaus-taihedian.md + n-*.png. NUI:n KORJAUS: tilataan vain
  1 chiwen, 2 Taihedianin 10+1 harjaeläinriviä, 5 harjan pinta, 8 kultainen keskiovi; 3 kullankeltainen lasitiili vain, jos VS:llä ei ole.
  Kohdat 4, 6, 7 ovat jo juoksupinnat-v1:ssä (1067–1070).
- KS (Meridiaaniportti 06): proto-3d/_tyo/karttaseppa/portti06-215/codex-osat/OSAT.md (11 osaa, rajaukset havainne-06.png:n pikseleinä).
- Molemmille vastattu: juuri juuri-pk7-v72, REF 527beacc0. Kaikki osalistat ovat siis koossa, joten tilaus lähtee heti.
