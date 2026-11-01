# PT:n luovutus 1.11.2026 klo 16.15

Edellinen: viesti-fable-luovutus-20261101-1345.md (säännöt voimassa). Osoitteet: /Users/Shared/Claude/osoitekirja.md.
Viestit send_message id:llä. Syy: konteksti 26 %. `date` ennen aikaleimoja.

## OMISTAJAN PÄÄTÖKSET 13.45 JÄLKEEN (lokissa PR 5856, 5861)
- 13.54: Pariisin keskusta "Ei, tavallinen tarkkuus" → ei 0,5 m/px -keskustaa; lähitaso ~1 m/px, sama myöhemmin muille kaupungeille.
  ND 0,5 m/px -koepala (Codex c21035113) vain vertailu.
- 15.02: valon kuvat SUORAAN omistajalle: VS lähettää jokaisen kuva-ajon koonnin SendUserFilella (proactive, render, keskeneräisetkin,
  suomenkielinen kuvateksti); polku + rivi PT:lle, PT tarkistaa jälkikäteen. (Omistajan kysymys oli "nopeammin kuin simun kautta".)
- 14.4x (KK lupasi, PT kuittasi): VS:n ja LAV:n pitkät Unity-/Blender-ajot Monitorilla, joka ilmoittaa myös kuoleman.
- 14.0x idea: näköalalinssi (horisontti 3D, omat avoimet aineistot, ei azimutin koodia) → työlistassa "myöhemmin".

## PT:N PÄÄTÖKSET (lokissa PR 5871)
- Leivottu valo + elävät varjot juoksun OLETUKSEKSI junaan 216 (vertailuvalo jää QA-kytkimeksi, kivi siinä 0,58). Syy: koonti 154506
  ajettiin vertailuvalossa → valkoiset lattiat. Hinta-ms ja 2 ms -raja PERUTTU (omistaja 31.10. 18.31: hieno ensin).
- Pysyvä taustaeditori EI käyttöön (säästö 10–45 s); VS:n odotusehto (29fbc5ecf) ja useampi kohta per ajo käyttöön.

## JUNA 216 (runko 65ceff743 NS:llä: VS aurinko 45°/318° + varjo-216 + NS Taihemen-varjo 814844b18 + PK kivi a1de2563d + 60 fps 70861ee16)
1. VALO: NS vie runkoon VS 89280ca51 (leivottu oletukseksi) + PK cc8b5ad92 (ehdollinen kivikerroin); päällekkäin → VS oletuksessa, PK
   kivessä; NS: testit + 02-kuva oletusvalossa → PT+VS. Sitten VS: 8 kohdan koonti leivotussa valossa → omistaja + PT, sitten simukuva 03
   (varjojen laitetarkistus). Varjojen tila: 03 muurin varjo näkyy (814844b18); 06:n siipivarjot toimivat (v06b), pelikuvaan ei osu,
   koska Wumenin U-piha leveämpi kuin havainteessa → LAV:n jonossa (PR 5870). Jäljellä VS:n jonossa: läikät 03/04, ilmakuva 07 usva +
   taivassauma. Marmorisuonitus kivessä → LAV havaintona.
   TARKISTA koonti: lattiat eivät ylivalottuneet, heittovarjot näkyvät.
2. PORTTI (kaari): PK:n mukaan auki olevan tunnelin sisus vertailuvalossa; leivotussa tumma. VS:n suukuvat (151221) eivät näytä kaarta, mutta
   eri kulma → PK tarkistaa omasta kulmastaan uudessa tallenteessa, kun leivottu valo rungossa. PK odottaa myös LAV:n rakennukset-v92.
3. PARIISI (KS): lähitaso rengas 1 (12 palaa) HYVÄKSYTTY (vääntö + liitos.py, 21/23 saumaa ei erotu, kulmat 1,24/1,31 hyväksytty;
   Invalidit 377 px ja Garnier 376 px hyväksytty liioitteluna). Rengas 2 (20 palaa) Codexilla 55969ea33. Tapa: Codex yksi otto per pala,
   ei ankkuri-iterointia; KS vääntää + leikkaa; uusinta vain sisältövirheeseen. Pari PT:lle per rengas. PorrastettuPelissa true vasta
   kun koko lähitaso valmis.
4. 60 FPS: kuitattu ja rungossa; ≥ 20 ms -jaksot 84 → 96: NS mittaa uudelleen uudella rungolla, rivi syystä jos pysyy.

## MUUT
- Asemataulu: junat.json Juna 216 -rivit päivitetty 16.1x asti; tyolista: valorivi (14.3x) ja näköalalinssi lisätty. Skriptit
  scratchpad/pt-taulu.py (rivi=…), pt-valo.py, pt-idea.py.
- Postilaatikon monitori: viimeisin 55969ea33. Viritä uudelleen.
- Muistiin: pitkat-ajot-monitorilla.md; kuvapari-sääntöön VS-poikkeus.

## Säännöt, jotka opin
- Tarkista kuvan valotila (vertailu 0 / oletus) ennen kuin julistat taantuman.
- Älä esitä omaa ehdotusta KK:lle päätöksenä (striimikartan tarkkuus: korjattu heti).
- Lue omistajan aiemmat linjaukset (loki) ennen kynnysarvojen asettamista (2 ms -raja oli ristiriidassa 31.10. linjan kanssa).
