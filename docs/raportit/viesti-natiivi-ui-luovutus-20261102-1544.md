# Natiivi-UI: luovutus 2.11.2026 klo 15.44 (mergepyynnöt NS:llä, B odottaa käännösvuoroa)

Edellinen: viesti-natiivi-ui-luovutus-20261102-1537.md (PR 6004) – lue sen B-kuvaus (a–e) ja todistuspolut. Syy: konteksti pehmeällä rajalla.

## Tehty 15.37 jälkeen
- PT kysyi Liikusta ja logosta: Liiku = täsmälleen 11492e364:ää edeltänyt asu (Matkavalinta.cs ja Matkakirja.uss identtiset
  natiiviseppa/juna-217:n kanssa; 6305829dd-kuva parit-kansiossa). iPad-logo puoleen todistettu simctl-sarjakuvilla
  (proto-3d/lokit/logo-sarja-20261102/, scratchpad-skripti logo-sarja.zsh: `source simusarja.sh; U=$(mk_kaanna UDID)`, launch
  `--set "$MK_SIMSET"`, kuvat 0,3 s välein; todistusajo.sh:n kaynnista-uudelleen ei ehdi logoon).
- **PT KUITTASI kaikki kolme** → **mergepyynnöt NS:lle lähetetty 15.4x** (local_99130238): 1) liiku-palautus-218 47067b095,
  2) omistaja-1437-218 eb9ad99fc, 3) saapuminen-keskustaan-218 58f0974db.
- NS mittasi saapumisen Isolla iPadilla: zoomaus 6,9 s, 70 pitkää ruutua (PiirrosKerros.Purku, LataaKiire, Saapumistraileri);
  korjaus (esilataus + purku ≤ 1/ruutu) NS:n jonossa – ÄLÄ muuta näitä omassa haarassa. Pieni iPad odottaa sitäkin (PT).

## SEURAAJAN JONO
1. Seuraa NS:n mergeä (junan 218 runko natiiviseppa/juna-218); vastaa NS:n kysymyksiin.
2. **B kuvapari**: käännösvuoro pyydetty JU:lta 15.4x (jonossa). Kun "KÄÄNNÖS NYT linja N":
   `PROTO_LINJA=N PROTO_APP_KOPIO=/Users/Shared/Claude/proto-3d/app-jako/natiivi-ui-piirros-nostot-b proto-kaanna.sh natiivi-ui/piirros-nostot-218 F7513985-C8BC-4E97-8D29-9C9BD420E962`
   (proto-3d/tyokalut/; ajo taustalle). Sitten todistusajo.sh (wt/proto-natiivi-ui-saapuminen/tyokalut/todistusajo/) simu-lukko.sh kaarella,
   skenaario proto-3d/tyokalut/natiivi-ui-ajot/piirros-nostot-b.txt, jälkeen = uusi app, ennen = runko (app-jako/natiivi-ui-palautus-1437 käy).
   Parit: scratchpadin parit.py-malli (ennen | jälkeen). Kuvapari PT:lle → omistajalle, sitten VUORO VAPAA JU:lle.
**B:n TILA 15.56 (PT:n nollaus):** käännös linja 2 käynnissä (JU:n vuoro 15.52, loki proto-3d/lokit/kaannospalvelu/20261102-155254-natiivi-ui-piirros-nostot-218-l2.log, xcodebuild-vaihe; app → app-jako/natiivi-ui-piirros-nostot-b), haara puhdas c94645ac3 (pushattu natiivi-backup); todistusajo ja pari tekemättä, VUORO VAPAA JU:lle lähettämättä → seuraaja: tarkista lokin viimeinen rivi, aja todistus (jälkeen c94645ac3, ennen palautus-1437 ca51acb76), pari PT:lle, VUORO VAPAA.
3. PELIT-välilehden 4 Codex-minikuvaa (tilaus f670c1140): B:n edelle, kun tulevat.
