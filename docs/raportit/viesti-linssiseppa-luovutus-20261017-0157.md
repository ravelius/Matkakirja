# Linssisepän luovutus 17.10.2026 klo 01.57 (KOVA RAJA 44 %, Postivahti)

Edellinen: viesti-linssiseppa-luovutus-20261016-2349.md (täydennykset 1–13 samassa tiedostossa; yksityiskohdat siellä).
Proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto (paikalliset haarat, ei pushia). Ajot proto-3d/tyokalut/linssiseppa-ajot/.
Testit `sh Linssit-testit/kaanna.sh [nimi] </dev/null` worktreessa, koko tarkistus `zsh tyokalut/tarkista.sh` (Unity-käännös + vahdit).
Viestit AINA send_message id:llä (/Users/Shared/Claude/osoitekirja.md): PT local_5df52e10-10e4-4b72-9554-0049db300dfe (≤ 3 riviä),
Julkaisija local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914 (KÄÄNNÖS NYT / SIMU NYT), KS local_eec7f158-d9f3-4b93-9368-c50935bd19ab,
NUI local_44392b3c-86ee-4873-9d76-82f9aaa6b832, SK local_72d15713-eb20-402b-95f7-87bdaaf91b74, Äänittäjä local_16ee69c8-b917-4dcd-9060-3542c5e03e67.
Taustaprosessit AINA `nohup zsh <skripti> > <loki> 2>&1 </dev/null &`. Yöllä 1 käännös + 1 simu Julkaisijan jonon kautta.

## 1. ENSIMMÄISEKSI: VAPAALENTO (JUNA 198) SIMULLE
Haara proto linssiseppa/vapaalento-197, kärki 9096ff5d2 (worktree wt/proto-linssiseppa-vapaalento). JUNA 197 LUKITTIIN ILMAN SITÄ → junaan 198.
- Simu 17.10. 01.01 (e66dc74de) HYLÄTTY: kaasuvipu 7cbf392fb kaatoi opaslinssin (OpasTapit staattinen alustusjärjestys) → korjaus 9096ff5d2.
- Museon maa -tarkistus OK (Pariisi kiinni, Amsterdamin merkki ja valitsin = Alankomaat): _valmiit/museomaa-197-20261017/.
- KÄÄNNETTY 01.55: 6661e487 (⊃ 9096ff5d2), app _tyo/linssiseppa/vapaalento-app. ajo-vapaalento197.zsh (pid 64620) ODOTTAA simu-vapaalento.nyt.
- Julkaisijan simujono 01.5x: Äänittäjä → PK erä C → MINÄ (iPhone BD64C8E4, ~20 min). Kun Julkaisija lähettää SIMU NYT:
  `touch /Users/Shared/Claude/proto-3d/tyokalut/linssiseppa-ajot/simu-vapaalento.nyt` → ajo vapaalento + museomaa → "SIMU ALAS" →
  SIMU VAPAA Julkaisijalle HETI → tarkista lokit/todistus-vapaalento197-iphone-*/tulokset.tsv (ei PUUTE/VIRHE, poikkeukset 0) →
  kuvat _valmiit/vapaalento-20261017/ → PT (3 riviä) → PT:n kuittauksella 9096ff5d2 NS:lle junaan 198.
  Jos odottaja puuttuu (`pgrep -fl ajo-vapaalento197`): käännös on valmis, aja simu suoraan todistusajo.sh:lla (komennot skriptin lopusta).
- Avoin löydös (välitetty NUI:lle PT:n kautta): museon lähestymisotsikko katkeaa "RIJKSMUSEU / M" iPhone pystyssä.

## 2. KIINAN DYNASTIAT VALMIIKSI (OMISTAJA 01.25; PT kuittasi koodin 401f38ca7)
Haara proto linssiseppa/kiina-valmis-198 (worktree wt/proto-linssiseppa-kiinavalmis, fd8e3f769 + NUI kehys-kaaro-198), kärki 401f38ca7.
Tehty: musteen leviäminen/vetäytyminen vuodesta toiseen (KiinaSiirtyma + KiinaAlue _T/_Tila), Kings and Generals -liike kellon tahdissa
(Ohjaa), rajat ja nimet musteen jälkeen, KS:n 241 kerrosta (faf3badee, PR ravelius/Matkakirja#4764; muoto kuitattu; 241 on oikea määrä),
Minardin nuolet / väestö / taistelurististit / muuri himmeänä, pääkaupunkijälki (KS:n siirrot korvaavat suoran viivan, entiset renkaina),
SINETTI 25 leimaa (tyokalut/dynastia-sinetti, KiinaSinetti.shader, 13 vaihdosta), KÄÄRÖ (NUI 9365854c2, AikajanaNakyma 3 riviä; KK
hylkää → revert 401f38ca7). QA `linssi kiina siirtyma <0…1|pois>`. Kiina-testit 11/11, tarkista.sh 0 virhettä. EI KÄÄNNETTY.
SEURAAVAKSI: kun Julkaisija lähettää KÄÄNNÖS NYT (L2 NUI:n 198-erien jälkeen): `nohup zsh ajo-kiinavalmis.zsh > ajo-kiinavalmis.log …` →
SIMU NYT → `touch simu-kiinavalmis.nyt` (iPad 00CF62C2, sk-kiina-valmis-ipad.txt S0–S7) → kuvat _valmiit/kiina-valmis-20261017/ →
PT (polku) → KK hyväksyy puolesta → NS junaan 198. Tarkista kuvista: musterintama (S1/S2), sinetti (S3, S6), nuolet ja kerrokset (S6),
käärö (S0), nimet musteen jälkeen.

## 3. LOUVREN PARITEETTI (EI JUNAAN 197/198 ILMAN PT:N KUITTAUSTA)
Haara proto linssiseppa/louvre-pariteetti 4c8f93fd5 (vapaalento-197 9096ff5d2:n päällä, worktree wt/proto-linssiseppa-louvre;
uusien vapaalento-korjausten jälkeen `git rebase linssiseppa/vapaalento-197`): askeleet v3, Ranskan kohdat.json, houkutin lipun
takana, museon maa avauskohtainen (valitsin = Alankomaat). PariisiMuseoAuki=false pysyy, kunnes PT kuittaa pariteetin.
Simu sk-louvre-pariteetti-iphone.txt (L1–L5) vasta vapaalennon ja Kiinan jälkeen. Ranskan i-kortti on jo NUI:lla junassa 197.
Ympyröiden kertojaäänille ei ole muotoa (ehdotus Äänittäjälle: aanet/taidemuseo-kohdat/<maa>/<teos-id>-<n>.mp3 + kenttä "aani").

## 4. MUUT
- Seuraava juna: Pariisin houkutin on louvre-pariteetissa (064520a17); Peking V8 Codexilta odottaa.
- Levy: siivottu 17.10. 00.5x (peking360 pois, vanhat videot). _tyo/linssiseppa: vapaalento-app, kiinanauha-app (ajo-kiinavalmis kirjoittaa
  sen päälle), kerros-app.
- tools/gpu-vapaa.sh ja .claude/settings.local.json* eivät ole minun (älä committaa).

## ALOITUSVIESTI SEURAAJALLE
Olet Linssiseppä (Opus, high). Lue CLAUDE.md ja tämä luovutus (git show <sha>:docs/raportit/viesti-linssiseppa-luovutus-20261017-0157.md).
Ensin: `pgrep -fl ajo-vapaalento197; tail -2 /Users/Shared/Claude/proto-3d/tyokalut/linssiseppa-ajot/ajo-vapaalento197.log` → kohta 1
(odota Julkaisijan SIMU NYT), sitten kohta 2.
