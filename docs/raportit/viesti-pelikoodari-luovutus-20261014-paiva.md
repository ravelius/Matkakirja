# Pelikoodarin luovutus 14.10.2026 päivä (nollaus, PT: konteksti 68 %)

Rooli Pelikoodari (Opus, high), checkout /Users/Shared/Claude/Matkakirja-pelikoodari, proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto
(haarat pelikoodari/<aihe>, worktreet /Users/Shared/Claude/wt/proto-pelikoodari-*, push remoteen natiivi-backup).

## Lue ensin
- CLAUDE.md, Raamatun Ydinajatus kohta 2, tämä raportti kokonaan.
- **Osoitekirja /Users/Shared/Claude/osoitekirja.md** (omistaja 14.10. 10.4x): viestit AINA `mcp__ccd_session_mgmt__send_message`
  session id:llä. PT = local_74630a27-8c1b-4ac3-9143-538efab8cbcd (vanha local_593b89a1 = omistajan Keskustelukanava, ei roolien
  viestejä). Viestit PT:lle ≤ 3 riviä (mitä, sha, kuvan polku). Nollaus: luovutus + push → Postivahdille "LUOVUTUS VALMIS <sha>".
- Linssiseppä 2 on nyt **Valoseppä** (sama id local_fc4fcc54…): valo, ilmakehä, materiaalit, avaruuskohtaukset.

## Tila
- main: ei omia julkaisuja tässä vuorossa. #4573 (pääkaupungit e04–e14 + 49 pidempää kohdekarttaesittelyä, 388285085) MERGETTY.
- Juna 189 lukittu ja TF:ssä. Junaan 190 PT:n kuittaamina NS:lle (local_bf20055b…) lähetetty:
  | haara (proto) | sha | sisältö |
  |---|---|---|
  | pelikoodari/suikale-190 | 41763f287 | omistajan suikalebugi: pilvikuori, tähtitaivas ja havaintopisteet seuraavat origon muutosta (MaanKehys.cs) |
  | pelikoodari/cupola-pinta-190 | a00fd0507 | Cupolasta poistuttaessa reliefi {reverseY}-osoitteella (tilkut ja navan kiekko) |
  Molemmat juna-190:n fecbb3c7e:n päällä, riippumattomat.

## Pushatut haarat (proto, natiivi-backup)
- **pelikoodari/iss-kupoli-190 @ 505651fa9**: ISS-kohdevalikon logiikka (KupolinValinta.cs, Ylilennot.SeuraavaEhdoin, solmukierto
  havainnolliseen rataan, LennaValinnalla/LennaOmaanValinnalla/KupoliLive, KohdevalikkoPyydetty, valikko myös perillä, yö = aurinkoaikaa
  20–04), testikomennot `linssi raketti valikko <kohde> [kausi] [vrk]`, `linssi raketti live`, `linssi raketti laattakoe [kamerat|tonaisu|uusi]`,
  suikale- ja pintakorjaus. HUOM: sisältää LS2:n kevyen pallon 98d4de0f3 (kuittaamaton) → EI kokonaisena junaan; valikko yhdessä NUI:n UI:n kanssa.
  Linssit-testit 1761/1761.
- **pelikoodari/telakointi-190 @ 1858f8f53**: omat 8c23686aa (Cupolan repliikin katto ei telakoinnissa) + a44a47c4b (siivous 2 kehystä
  mustan alla) + Valosepän telakointikorjaus (fast-forward, telakointi10 todistettu). PT kuittaa telakoinnin videosta.

## Kesken — tee nämä ensin
1. **Telakointivideo PT:lle**: ketju scratchpadissa ajossa luovutushetkellä (KÄÄNNÖS L1 + SIMU Julkaisijalta, 1858f8f53):
   tulos /Users/Shared/Claude/proto-3d/lokit/pk-kupoli-v2-20261014/ketju-telakointi8.tulos, video telakointi8/telakointi-aanella.mp4.
   Jos edellinen sessio ei ehtinyt: tarkista lokista "vaihe Telakointi", "kupoli valmis, raita jatkuu" (vasta Cupolan valmistuttua), tee
   kuva-arkki 38–58 s (ffmpeg fps=1 tile=5x4) ja lähetä PT:lle; asema ja kapseli pitää näkyä valaistuina telakoinnissa. SIMU VAPAA Julkaisijalle.
2. **ISS-kohdevalikko yhteiseen arkkiin NUI:n kanssa** (PT): NUI:n UI natiivi-ui/iss-kohdevalikko-190 @ d600ff002 (IssKohdevalikko.cs,
   käyttää rajapintaani). Pyysin NUI:lta (local_33ba1387…) ui-testikomennon valikon nappeihin; kun se tulee: yhdistä NUI:n haara
   iss-kupoli-190:een, käännä, aja: Cupola → `linssi napauta x y` → valikko → Pariisi talvi yö → perillä → Bergen kesä päivä → LIVE →
   Oma sijainti; arkki + äänellinen video PT:lle. Junaa varten tee valikosta oma haara juna-190:n päälle ilman 98d4de0f3:ää.
   Huom: astronautin kohteissa ei ole Helsinkiä/Tukholmaa/Oslota (PT: ei lisätä, Oma sijainti -rivi riittää); pohjoisin valikossa Bergen 60,4°.
3. **Pulun kysymykset ISS:ssä** (PT:n jono, ei vielä aloitettu): kysy PT:ltä tarkennus ennen aloitusta.
4. **KS:n 44 pääkaupungin esittelyt**: KS piirtää haarassa karttaseppa-paakaupungit-kohdekartat-loput (30 Codexin kohteilla, 14:ltä
   puuttuu kohteet — KS kysyi linjausta PT:ltä). Kun rivit ovat maakartat.js:ssä: SK:n JSON
   /Users/Shared/Claude/proto-3d/_tyo/sisaltokirjuri/kaupunkikartat-esittelyt-20261014/kaikki-esittelyt-e04-e14.json, skriptit
   (kopioi pysyvään paikkaan ennen nollausta: ks. Työkalut) — korvaa olemassa oleva esittely tai lisää ennen `kohteet:`-listaa; tarkista
   node-tuonnilla, että teksti täsmää sanatarkasti; juna 190; iPad-kuva (kaupunkipopup, kaksi palstaa) PT:lle.
5. Simussa ajamatta: v2-kiihdytys, v2-nyt, IssAlbumi.Kohde.

## Työkalut
- proto-3d/_tyo/pelikoodari/iss-kupoli/: ajo-telakointi.sh, ajo-kupoli-valikko.sh (testikomennoilla), ajo-kupoli-poistu*.sh,
  ajo-kupoli-vertailu.sh / ajo-kupoli-pinta.sh (15 s -vertailu), kokoa-aani.py `<kansio> - <video.mp4>`. Kaikki alkavat
  `aani mykistys 1` (omistaja 10.5x: Macin kaiuttimista ei mitään). Ajoskriptit eivät ole suoritettavia → `/bin/zsh <skripti>`.
- Esittelyjen kytkentä: kytke_esittelyt.py (korvaa) ja lisaa_esittelyt.py (lisää ennen kohteet) ovat kopioina
  proto-3d/_tyo/pelikoodari/pk-kytkenta/esittelyt-20261014/.
- Käännös ilman simuvuoroa: `PROTO_APP_KOPIO=<kansio> proto-kaanna.sh <sha>` (ei UDID:tä), asennus myöhemmin `source simusarja.sh` +
  `xcrun simctl install`. Pitkät ketjut perl setsid -kaavalla.

## Opit
- Origon siirto (raketti) jättää kerran rakennetut georeferenssin avaruuden oliot väärään kehykseen → MaanKehys.Siirto/Keskus ja
  CesiumGeoreference.changed. Laattoihin ei kannata epäillä ennen kuin `laattakoe` (säteet) ja `laattakoe kamerat` (pallon kokoiset
  piirtäjät, keskukset) on ajettu.
- Cesiumin URL-pohjassa rivi on {reverseY} (XYZ); raaka {y} peilaa laatat. Käytä Rasteri.CesiumUrl.
- **preview_stop ei sulje selainvälilehteä**: pelisivu soi kaiuttimista (kahvilaääni 09.31–10.5x). Sulje tabs_close heti kuvan jälkeen.
- Cupolan raitarepliikin 8 s:n katto ei saa käydä 10 s:n telakoinnin aikana (OdotaCupolaa(kattoHeti: false)).

## Työtilat
Proto-worktreet: wt/proto-pelikoodari-kupoli (iss-kupoli-190), -telakointi (telakointi-190), -laukaisu (raketti-laukaisu-189, junassa 189),
-suikale (suikale-190), -cupolapinta (cupola-pinta-190). Simu pelikoodari-iPad13 39644E75. Lokit proto-3d/lokit/pk-kupoli-v2-20261014/
(raakavideot poistettu, 720p-kopiot jäljellä); pk-raketti-pallo-20261014 NAS:lla symlinkillä. Worktree pelikoodari-pk-esittelyt poistettu.
