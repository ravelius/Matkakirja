# Natiivisepän luovutus 28.10.2026 klo 03.55 (konteksti 31 %; juna 213 runko f047065df)

Vain voimassa oleva tila. Historia: /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna213/jono-213.txt (loppu = uusin).
Id:t: /Users/Shared/Claude/osoitekirja.md. PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd,
PK local_d3bb1f78-e2ea-4089-8bae-d106bb1f9ff7, VS local_5ebb0658-96f6-434d-8a38-b122eb53032f, LR local_f12c9179-a76b-4ce8-a1fe-1e0f2c8f251e,
NUI local_4b84cd90-123f-46c5-bc07-75760ed4c80b, KS local_7b57e35a-3a8e-4943-aba1-c960b9eb4671.

## TILA
- **Juna 213 runko natiiviseppa/juna-213 = f047065df** (wt/proto-natiiviseppa-ehdokas, puhdas; peili natiivi-backup
  peili/proto/natiiviseppa/juna-213 = f047065df). Testit VIHREÄT 2213/761/566, tarkista 0; METAL 442/0, PIPELINE 434/0 (7b4e4361d, viimeinen shader-muutos).
  Sisältö 80b1ea539:n päälle (vanhat ks. edellinen luovutus 8cda08fdf) + tämän vuoron:
  LR tausta-v62-213 5ca3e2d4b (TaustaKansio v62, muurikate v19-pohja), NUI maakunta-lisenssi-213 e53794fd9,
  oma 5f80444a5 (`poikki seikkailu odotus <s>`, oletus 60 s), KS rannat-213 8e40bcefc (järvirannat, lähizoom Z16, vesi yhdeksi sävyksi),
  KS perinto-213 22c5aa508 → e67c0ce23 → e1cdd1fd3 (maailmanperintö hehkuvina, Valopiste.shader; Nimikerros-ristiriita rantojen kanssa ratkaistu
  molemmat säilyttäen), oma f047065df (SeikkailuEsineet.AstcSaatavilla: file://-juuren ASTC-sivutiedostot ilman manifestia).
- **213:n JULKAISUEHDOT** (ämpäriin JU:n kautta ennen TF:ää): taivas-paiva-codex-v2/, tausta-v62 (eb30ccc2f8fb), muurikate-v19 (6afb0652f35f).
- **EI VIELÄ JUNAAN:** VS esineet-metalli-213 33acd68dd (DioraamaGlb metallic/roughness + DioraamaValaistu metalli; PT 01.2x: metallituki ennen
  J4:n KK-kuvaa) – odottaa LR:n J4-paria KK:lle; vaatii METALin.
- Ei lukitusta ennen PT:n/omistajan pyyntöä.

## J4 (Codexin aarre, arkun hopeasisältö) – LR vetää
- Codex J3/J4 review-v2 (0cba769bd): tekninen OK (SHA 17/17, työkalu 0), kuittaus posti ee4e944f3. Havainnot: J4 kannun kahvan venymä, sävyt.
- LR sovitti J4:n arkkuun (_tyo/linnanrakentaja/olavinlinna-j4/, skaala 0,97) ja paikallinen kavely-juuri kavely-j4/.
- **Komeron esikatselu**: /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-ajot/sk-komero-j4.txt
  (`PROTO_LINJA=2 zsh tyokalut/esikatselu.sh <haara> <sk> ipad --batch`, ~6 min; paras kuva j4g-ylhaalta-y81). Kuvat ajo 7:
  /Users/Shared/Claude/proto-3d/lokit/esikatselu-20261028-005705/. Opit: `oleta` jakaa ehdon |:stä (ei sulkuja), oleta < 600 s (edistysvahti),
  `tap-teksti` ei toimi editorissa, käynnistys välillä jumittuu ("linna ei auki") → aja uudelleen.
- LR tekee J4:n -4x4.astcm ja -normaali-4x4.astcm (astc-mip.swift 4) kavely-j4:ään; f047065df lukee ne file://-juuresta.

## AVOIMET
- Codex-hahmot kokki + portinvartija: puhekoe Unityssä (keittiövalo, 6 säätimen ohjain) + LR:n MetaHuman-vertailu → palaute Codexille.
- Postilaatikko: viimeisin tarkistettu 0a248af29 (28.10. 03.11); kujakivet/viitta/pinnat = Pelikoodari/LR.

## TYÖTAPA (ennallaan, ks. 8cda08fdf) + lisäykset
- Merge-testit: `EI_PEILIA=1 nice -n 15 zsh juna210/testit210-rinn.sh <wt>`; shader-muutoksissa + metal-tarkistus.sh; peili käsin juna-213:een.
- Punainen tekijän koodissa → reset edelliseen vihreään (peili ei muuttunut), tekijä korjaa (näin KS rannat 925e647d2 → 8e40bcefc).
- Testiskriptin vanhat Linssit-N.log-tiedostot (OSAT=6) voivat näkyä FAIL-rivinä → tarkista osien määrä.
- Cronit (session omat): Unity-beeta "4 9 * * *", postilaatikkovahti "17,47 * * * *".
- Levy: -ehdokas (runko) ja -tyokalut ÄLÄ POISTA; DerivedData Unity-iPhone 7 G on JU:n.
