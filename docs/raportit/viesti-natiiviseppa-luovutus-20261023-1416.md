# Natiivisepän luovutus 23.10.2026 klo 14.16 (KOVA RAJA; juna 210 auki, runko 560dd9cd8 vihreä)

Vain voimassa oleva tila. Historia: proto-3d/tyokalut/natiiviseppa-skriptit/juna210/jono-210.txt (loppu = uusin).
Pysyvät säännöt: juna183/luovutus-huomiot.txt. Tekotapa: docs/tuotanto/tekotavat/julkaisu.md luku 3 (#5183). Id:t osoitekirjasta / PT:ltä.
Tili vvi (23.10.); PT local_5df52e10-10e4-4b72-9554-0049db300dfe, LT local_88cfd2dd-bbf9-406c-8f11-4f9740508e26.

## TILA
- **Juna 210 runko natiiviseppa/juna-210 = 560dd9cd8** (wt/proto-natiiviseppa-ehdokas, peili natiivi-backup). VIHREÄ 2209/716/527, laiteäppi
  lokit/natiiviseppa-app-210-runko-560dd9cd8-laite. LT koko kierros VIHREÄ (GPU A 10,29 / J 10,91 / JA 10,27 / JB 9,68; nykäykset 0; kylmä 0/5).
  PT 13.5x: tämä on junan 210 runko, tulevat erät sen päälle.
- Rungossa: BUILD 209 e51c33e0f + PK rikottavat-210 da5883ffb, muistokuplat 4c7b5351b, lohikäärme-v3 10b2b80dc, yhtenaiset-210 49396daaf;
  VS rijks-paivanvalo-210 b6fdf796d, juoksu-210 9b06795e2 + juoksu-210-j 01ac4de68 (8a38c9e3f peruttu: J-regressio, LT rajasi);
  NUI ui-periaatteet-210 6f8455f1a; NS ruutusyy-210 a43c23abc (pitkän ruudun "| syyt:", nykäysvahdin SYYT-rivi).
- **KÄYNNISSÄ luovutushetkellä:** mittauskäännös a320e3bb8 (= natiiviseppa/ruutusyy-mittaus, EI junaan) ketju210 → asentaa sen iPadiin
  automaattisesti (~14.20). Seuraavan: asenna iPadiin junan runko takaisin: `PAKOTA=1 zsh juna210/asenna210.sh 560dd9cd8` (LT:n VAPAA:lla).

## JULKAISU (OMISTAJA PYYSI 13.39, PT): TF 210 kun grafiikkaparannukset mukana; EI TF:ää ennen PT:n lupaa (kuvapari + lennon video → omistaja)
Kokoa sitä mukaa kuin tekijä ilmoittaa valmiiksi (haarat olemassa, ei vielä valmis-viestiä): NUI logo-210 (logo, Takaisin pois, symbolit),
PK alkulento-210 (keisari-logo, alkulento/tekstit/3-2-1), Lavastaja väreily + suikaleet + sokkeli-k1b-210 (media kielletty-rakennukset-v13 ja
kielletty-tausta-v19 ämpärissä 14.08), VS grafiikka-210 + varjot, Äänittäjän kohahdus. Kokoaminen: merge --no-ff runkoon → testit210-odota.sh
+ ketju210.sh <sha9> (komennot jonossa) → LT. Lukitus juna210/lukitse210-*.sh (juna/b38), muutosloki-210.txt kirjoitettava.

## SAAPUMISLENTO (vanha vika, ei estä TF:ää; PT: jatka vain selvällä syyllä, junan kokoaminen ensin)
- 560dd9cd8: 13 ruutua > 20 ms (suurin 132). Syymerkinnät: merkityt kartan järjestelmät 0–2 ms; Update 60–108 ms ja PreLateUpdate 42–74 ms
  merkitsemätöntä, varaukset 23–86 Mt/ruutu, GC 2–3×; EarlyUpdate 55–67 ms ja "ulkona" 34–41 ms → PT:n arvio: lataus/tekstuurien siirto.
- Mittaushaara natiiviseppa/ruutusyy-mittaus a320e3bb8 (ruutusyy-210 4fd4fdbe8): pelisilmukan alivaiheet ("| vaiheet: Update.ScriptRun…"),
  varaukset kt, Esilataajan haut, UiKerros JokaRuutu/pääsäie, NostoKerroksen osat (LT: NostoKerros 41 ms / 15 Mt yhdessä ruudussa).
  Jos jatketaan: LT ajaa saapumislennon a320e3bb8:lla → alivaiheet nimeävät EarlyUpdate/Update-työn. EI junaan (PT 14.1x).
  Rivit: proto-3d/_tyo/linssiseppa2/varjot-koko/kierros210d/ ja kierros210e-saapumis/.

## MUUTA
- Levy: siivottu 209-välikäännökset (15 Gi) ja 210-välikäännökset; säilytä bccb18d32 + 560dd9cd8. Matkakirja-fable/.git uusi 5,9 Gt pack 12.59 (ei NS).
- julkaisu.md luku 3 mainissa (#5183).
- Viestiraja: SendMessage pysähtyy 10 viestin jälkeen → mcp__ccd_session_mgmt__send_message (ToolSearch).
