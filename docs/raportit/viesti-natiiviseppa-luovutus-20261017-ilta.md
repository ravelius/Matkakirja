# Natiivisepän luovutus 17.10.2026 klo 21.5x (Postivahdin KOVA RAJA 37 %)

Lue ensin: CLAUDE.md, Raamatun Ydinajatus kohta 2 ja tämä kokonaan. Pysyvät säännöt: proto-3d/tyokalut/natiiviseppa-skriptit/juna183/luovutus-huomiot.txt.
Jono (lopusta alkuun = uusin tila): natiiviseppa-skriptit/juna200/jono-200.txt. Viestit AINA session id:llä osoitekirjasta (PT local_5df52e10-…, JU local_5cb16c00-…).
Omistajan pysyvä päätös 16.10. 22.24: kaikki vain YHTEEN avoimeen junaan.

## TILA: JUNA 200 LUKITUS KESKEN (ENSIN TÄMÄ)

- OMISTAJA PYYSI JULKAISUA 21.43 ("Kohta voisi julkaista", "Ei testejä"); PT: LUKITSE 200 rungosta **ed0654c54** (natiiviseppa/juna-200, wt/proto-natiiviseppa-ehdokas).
  Testit ed0654c54 vihreät 21.44 (Linssit 2013, Peli 592, Kartta 501, tarkista 0). Ei laite- eikä muistiajoja (muistiajo-200.txt = OHITETTU, JU).
- **M = 795a0d97a** (muutosloki 1.1 (200), #4822 mergetty; teksti juna200/muutosloki-200.txt, PT kuittasi). JU tietää M:n.
- Lukitusehdot R2:ssa ja tarkistettu (200): omat mallit **v6k26** (JU vaihtoi uusin-4 → v6k26), taidemuseon kertoja manifest-200, kaupunkimaisema-v3.
- **Lukituskäännös käynnissä L2:lla, alkoi 21.52.24** (JU:n KÄÄNNÖS NYT): lukitse200-ajo.sh → lukitse200-a.sh ed0654c54, app → lokit/natiiviseppa-app-200-lukitus-sim.
  Loki: lokit/kaannospalvelu/20261017-215224-ed0654c54-l2.log (viimeinen rivi "KÄÄNNETTY …" tai "VIKA …"). Jos prosessi kuoli nollauksessa (pgrep -fl "proto-kaanna.sh ed0654c54" tyhjä
  eikä KÄÄNNETTY-riviä): pyydä JU:lta KÄÄNNÖS NYT ja aja `zsh …/juna200/lukitse200-ajo.sh ed0654c54` run_in_backgroundilla.
- KÄÄNNETTY-rivin jälkeen: `cd /Users/Shared/Claude/proto-3d/Matkakirja-proto && zsh …/juna200/lukitse200-b.sh ed0654c54 "<KÄÄNNETTY-rivi>" "ohitettu (omistaja 21.43 Ei testejä)" "Linssit 2013, Peli 592, Kartta 501"`
  (build200-viesti.txt täytetty; master tarkistetaan = 6339b1aec; juna/b28). Peilipush voi kilpailla → ls-remote, juna/b28-peilit erikseen.
  → BUILD 200 -sha JU:lle (TF iOS) + PT:lle. Sitten Mac: `zsh …/juna200/mac200.sh ed0654c54` JU:n TF NYT:llä → TF-ajo, tulos JU + PT.

## JUNA 200 SISÄLTÖ (kaikki PT:n kuittaamia; first-parent 6339b1aec..ed0654c54)
PK valoisa-kohde, antimeridiaani, S2 v2g, latauskuvan esilataus, Kööpenhamina v12 (Tivoli), FFT-meri (oletus päällä), intro-muisti (iPad M1 kaatuminen), lcd-siirretty, cupola-ohita, Cupola-suoja 0,8;
NUI museo-esikatselu, kokeet linsseihin, kaaro-rajat, ISS-kamerapöytä, ISS-ohjauspöytä; VS aamukaista, huntu, k72 lasi, vesipeili, k82 yövalo, k83 hehku;
LS veistokset + testikorjaus, Nike/Venus, Louvren avaus (orsay) + Louvre auki (PariisiMuseoAuki = true); SS historia-paikat, kaupunkimaisema-v3.
EIVÄT junassa: PK koopenhamina-v8 ed50dceeb (peruttu), NUI laitenapit v2 (10bd4db1e, 030c06621), LS kartan pyramidi bc1748db0 (omistaja hylkäsi), keskeneräiset → 201.

## MUUTA TÄNÄÄN
- laite-sha.sh: editori nyt ProjectVersionista (unity-polku.sh), PROTO_LAITE_KOPIO valitsee T7-kopion (b5-Library: proto-natiiviseppa-unity-b5).
- todistusajo.sh kuva(): ui-puu.json-odotus 8 s + edellinen suunta (JU: vaaka-iPad-kuvat merkittiin Portrait) → a7823bad4 tyokalut-wt:ssä, peilattu. Ei vielä ajettu vaaka-iPadilla.
- Poistettu omat wt: proto-natiiviseppa-juna197 (pika-199, haara tallessa) ja natiiviseppa-muutosloki-198 (#4788). Uusi wt/natiiviseppa-muutosloki-200 (#4822 mergetty → voi poistaa: tools/uusi-worktree.sh --poista natiiviseppa-muutosloki-200).
- Unity-beetaseuranta CronCreate oli istuntokohtainen → luo uudelleen "4 9 * * *" (unity-julkaisut.py).

## OPITUT 17.10.
- ÄLÄ yhdistä runkoon testiajon aikana (testit kääntävät työpuusta): yhdistin kerran kesken ajon → ajo pysäytettiin ja uusittiin.
- Roolin "PT kuittasi" -väite vahvistetaan PT:ltä, ellei PT ole itse nimennyt samaa sha:ta; PT:n etukäteiskuittaus ("VS tuo sha:n") riittää, kun sha on nimetyn erän jatko.
- Haarassa olevat peruutetut commitit (revert) ok, kun nettodiff ei sisällä kiellettyä (grep diffistä).
- Semanttinen testiristiriita kahden kuitatun erän välillä (LS:n testi vs. LR:n Nike/Venus): testin omistaja korjaa runkoa vasten, NS yhdistää korjauksen.

## TYÖTILAT
wt/proto-natiiviseppa-ehdokas (natiiviseppa/juna-200 ed0654c54 – lukitus), wt/proto-natiiviseppa-tyokalut (YHTEINEN, ei poisteta), wt/proto-natiiviseppa-unity-b5 ja -unity67 (T7),
wt/natiiviseppa-muutosloki-200 (mergetty). Appit: lokit/natiiviseppa-app-199-lukitus-sim, lokit/natiiviseppa-mac-tf-199 (+ 200 tulossa → 199-kopiot pois varmistuksen jälkeen).
