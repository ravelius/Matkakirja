# Pelikoodari: luovutus 29.10.2026 klo 14.45 (konteksti ~35 %, pehmeä raja)

Seuraava Pelikoodari jatkaa tästä. Muisti: pelikoodari-tila-20261018-aamu.md (UUSIN). Edellinen luovutus -20261029-1331 (PR 5589).
Proto-haarat peilissä natiivi-backup peili/proto/pelikoodari/<haara> (kivikoko-214 9c0477cb6, drone-214 8289a55fe, rikotut-214 c71caf75d, pk7-214 20c32559f).

## Valmista
- DRONE n 8289a55fe: simu (lokit/todistus-drone214n-8289a55fe-20261029-1334): katosi 0, glb 283/0, väläyksiä 0, ei > 20 ms ruutuja;
  avauksen kääntö enint. 51 °/s, noston nopeus enint. ~2,7 m/s (U-portti 3,3). Sonnet + oma katsonta OK (arkit
  _tyo/pelikoodari/parkour-20261027/tarkistus-drone214n/). PT ja KK KELPAA 13.5x → JUNASSA 214 (NS: f9dddf7df). Ei tehtävää.
- LISÄYKSET 70–71 (omistaja 11.02 "lattialaatoista pitää tehdä samalla tavalla isompia ja erikokoisia kuin havainnekuvissa.
  reunakivet pitää olla matalampia, leveämpiä ja pidempia, kuten havainnekuvissa." ja 11.04 "myös kivet seinällä ovat nyt liian
  korkeita."), PK:n osuus: proto pelikoodari/kivikoko-214 9c0477cb6 (juna-214 f9945e9ce + lippu k22, QA `valo k22 0|1`):
  V4_lattia (laji 2, k16) kujilla rivi 0,6 m ja laatat 0,67–1,33 m (aukio ennallaan); V4_sokkeli/V4_jalkakivi (laji 11) rivi 7,6 cm,
  kivet 0,26–0,38 m (KiviKerros); ReunusRaja 1,4/0,4. Peli 764/764, unity 0, Metal 442/0 + pipeline 434 ok.
  PT 14.4x: EI JUNAAN NYT – päättää käytöstä muualla juoksupelissä, kun kujien parit ovat valmiit.

## Opittua (tärkeä)
- Kujien lattia, kivijalka ja reuna LR:n juurissa (v134p) ovat V4_kujakivi_* (Codexin kujakivet), jotka piirtää VS:n _KujaKivi
  (linssiseppa2/seinat-211, 13 committia 8885a9f54 asti; LR:n REF 46c0add3c sisältää sen). juna-214:ssä sitä EI ole → valkoinen
  varapinta (pari 144114: lattia 247 vs havainne 204). k22 ei koske kujakiviin; kujien kivikoko = LR:n UV (LKU/LKV) tai Codex.
  PT: kujien kivikoko LR:lle UV:lla, seinat-211 junaan 214 yhdessä LR v66:n kanssa.
- juna-214 lataa pohjan kk-pohja-v1d-pk7 ämpäristä (Polku, ei MALLIT) → 404 havainne-editorissa → "loputon sokkelo", kamera väärässä
  paikassa. Korjaus: ESIKOM="ui juoksupeli palatsi url file:///Users/Shared/Claude/proto-3d/_tyo/karttaseppa/kk-pohja-pk7/kk-pohja-v1d-pk7/pohja.json".
- tyokalut/metal-tarkistus.sh oletuskansiolla Temp/metal-tarkistus ei tarkista mitään (Unity tyhjentää Temp/:n, skripti palauttaa 0):
  anna ulos-kansio, esim. `zsh tyokalut/metal-tarkistus.sh /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/metal-<aihe>`. (Työkalun
  korjaus = erillinen työ, ei tehty.)

## Odottaa
- LR v66 (ei vielä _valmiit): sitten juuri-pk7-v66, TaustaKansio/RakennusKansio pk7-214:ään juna-214:n päälle (+ seinat-211:n
  kujakivet PT:n päätöksen mukaan junaan), läpikulku 05 (reunukset kavensivat kujaa ~0,5 m/puoli), pari → PT → KK → JU.
- PT:n päätös kivikoko-214:n käytöstä.

## Jatko keskeytyksestä
- Taustaajoja ei ole. Worktree wt/proto-pelikoodari-kaapu-213 on haaralla pelikoodari/kivikoko-214 (puhdas, ei upstreamia).
