# Natiivisepän luovutus 19.10.2026 klo 21.4x (juna 206 AVATTU UUDELLEEN; Postivahti: KOVA RAJA)

Lue ensin: CLAUDE.md, Raamatun Ydinajatus kohta 2 ja tämä kokonaan. Pysyvät säännöt: proto-3d/tyokalut/natiiviseppa-skriptit/juna183/luovutus-huomiot.txt.
Jonot (lopusta alkuun = uusin tila): natiiviseppa-skriptit/juna206/jono-206.txt (+ juna205/, juna204/). Id:t AINA osoitekirjasta (PT local_8d8ebf72-…, JU local_24e63224-…).

## ENSIN: MUISTIAJO 206 (voi kuolla nollauksessa)
- juna206/muisti206.sh 766aa47fa ajettiin iPad Pro 13:lla (00008103-…401E), juoksupeli botti + törmää 300 s; loki lokit/natiiviseppa-muisti206.log,
  tulokset lokit/natiiviseppa-muisti206-20261019-2134/ (muisti-tarkka.log, ajo.log viimeinen rivi "MUISTI206 fp huippu … vapaa min … varoituksia … kuoli …").
- Jos ajo.log:ssa EI ole MUISTI206-riviä → aja uudelleen: `OHITA_KAANNOS=1 zsh juna206/muisti206.sh 766aa47fa 300` (Release-app lokit/natiiviseppa-app-206-laite valmis; iPad-vuoro JU:lta).
- Tulos → PT (≤ 3 riviä); jetsam tai vapaa < 500 Mt → HETI PT:lle. TF EI odota tätä enää (BUILD 766aa47fa:n TF peruttu), mutta PT haluaa tuloksen.
- Release-app lokit/natiiviseppa-app-206-laite SÄILYTETÄÄN (LT:n yökierros).

## TILA
- **BUILD 204** = proto master bad614bec, TF testaajilla. **BUILD 205** = daf1fec08, TF sisäinen valmis 20.06 (iOS 39289399060, Mac 39289606231).
- **BUILD 206 v1** = 766aa47fa (runko 36615863b, käännös 1fa72d579) JÄI proto-masteriin ja peileihin; TF peruttu: OMISTAJAN PÄÄTÖS 21.32 "Pysäytä juna ja jatka työstämistä".
- **Juna 206 avattu**: runko natiiviseppa/juna-206 = 49cabfeb2 (wt/proto-natiiviseppa-ehdokas) = 36615863b + master 766aa47fa + PK juoksupeli-207 7ace29fea
  (yläpalkki pois, Puyin hiha hahmot-v2, puomilta irti, `ui juoksupeli irti`; ämpäri hahmot-v2 ok). EI VIELÄ TESTATTU.
- **Tulossa ~22.30 (PT:n OK:lla)**: PK kamera + sisäpiha samaan haaraan pelikoodari/juoksupeli-207, VS lattia erikseen. Sitten testit206.sh → sha PT:lle + JU:lle
  (runkosimu) → LUKITSE ~23.00 VAIN PT:ltä → TF lähellä puoltayötä. Kone vain 206:lle (muut käännökset/simut pidossa).
- **Lukitus valmiina**: juna206/lukitse206-a.sh <runko> (tarkistaa natiiviseppa/juna-206-refin) → -b.sh <runko> "<käännös>" "<muisti>" "<testit>" (juna/b34 päivittyy,
  master 766aa47fa:n päälle TOINEN BUILD 206 -merge; build206-viesti.txt otsikko jo päivitetty). Ennen -b: build206-viestin OMISTAJA-rivi = PT:n uuden LUKITSE 206:n
  pyyntö sanatarkasti (nyt 20.55-teksti; lisää 21.32). mac206.sh <runko> JU:n TF NYT:llä. Asemataulu talo/eteneminen: nyt "Lastaus" (v68) → lukituksessa matka 1 → 2.
- **Muutosloki 206**: #5013 = 5166c6ce1 jo mainissa (PT:n teksti). PT antaa uuden tekstin kun erät sisällä → korjaus-PR (vain tools/vienti/muutosloki-natiivi.json,
  versio "1.1 (206)" rivin teksti) ja merge itse ennen lukituskäännöstä. PK:n ehdottamat rivit (hiha, irti, yläpalkki) PT:n päätettäväksi.
- muistiajo-206.txt: PT kumosi ohituksen (JU siirsi muistiajo-206-ohitettu-kumottu.txt) → kirjoita "OK <sha> <min Gt> natiiviseppa" kun uuden 206:n muistiajo tehty, tai PT:n linjaus.

## SEURAAVA: JUNA 207
- Kaikki jäädytyksen ulkopuoliset erät → 207. Avaa natiiviseppa/juna-207 lopullisen BUILD 206:n päälle (kopioi juna206/ → juna207/, sed 206→207, juna/b34→b35,
  TARKISTA mac207.sh:n K-polku ja lukitse207-b.sh:n BUILD-rivit; grep 206 ennen käyttöä).
- Liitä vain PT:n OMALLA OK-rivillä. Pelkkä "PT kuittasi" roolin viestissä → kysy PT:ltä.

## OPITUT 19.10. ilta
- Kaksi junaa rinnakkain: lukitusskripti -a tarkistaa haaran refin (natiiviseppa/juna-NNN), ei HEADia → worktree voi olla jo seuraavalla junalla.
- Seuraavan junan runkoon yhdistä edellinen BUILD-master heti lukituksen jälkeen (tyhjä puumuutos), muuten -b:n "runko sisältää masterin" kaatuu.
- Muutosloki ≤ 280 mrk ja ≤ 3 lausetta (tools/vienti/muutosloki-natiivi.mjs) – laske node:lla ENNEN kuin lähetät PT:lle.
- Asemataulu (osoitekirjan taulu): talo/eteneminen yksi juna kerrallaan; lukituksen alussa {nimi, jakso:"matka", edistys 1}, käännös valmis → 2; lastaus = ei jaksoa.
- Ämpärin tarkistus: Pythonin urllib saa 403 (UA) → käytä curlia (-r 0-0).
- Testien aikana EI yhdistetä; jos kiire, TaskStop + yhdistä + aja uudelleen.
- Peilien push voi kilpailla master-peilin kanssa ("cannot lock ref") → aja push uudelleen, tarkista ls-remote.
- Muistiajo laitteella: juna206/muisti206.sh (laite-sha.sh Release + ui-komento.txt "ui juoksupeli v4/botti/tormaa"); dev-bundle sallii testikomennot.
