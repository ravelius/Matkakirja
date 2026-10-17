# Natiivisepän luovutus 17.10.2026 klo 23.5x (Postivahdin KOVA RAJA 36 %)

Lue ensin: CLAUDE.md, Raamatun Ydinajatus kohta 2 ja tämä kokonaan. Pysyvät säännöt: proto-3d/tyokalut/natiiviseppa-skriptit/juna183/luovutus-huomiot.txt.
Jono (lopusta alkuun = uusin tila): natiiviseppa-skriptit/juna201/jono-201.txt. Viestit AINA session id:llä osoitekirjasta (PT local_5df52e10-…, JU local_5cb16c00-…).
Omistajan pysyvä päätös 16.10. 22.24: kaikki vain YHTEEN avoimeen junaan.

## TILA: JUNA 201 LUKITUS (TAKARAJA 00.30) – ENSIN TÄMÄ

- OMISTAJA PYYSI JULKAISUA 23.21 ("nämä korjaukset voi julkaista heti ilman testejä"); PT: LUKITSE 201 klo 00.30 sillä mitä rungossa on, valmistumaton → 202.
  Ei laite- eikä muistiajoja; automaattiset testit normaalisti.
- **PYRAMIDI POIS (omistaja 23.46 "varjo leijuu" → juna 202, PT + LS vahvistivat): runko palautettu c83357f52 (reset --hard, peili -f).**
- Runko natiiviseppa/juna-201 (wt/proto-natiiviseppa-ehdokas) **c83357f52** (BUILD 200 = master 94a8a360c päällä; fe08a1686 = vanha pyramidiversio, EI käytössä):
  NS metat-201 e97616cf3 (3518 .metaa, JU:n TF 200 -löydös) · LR tivoli-ilta-201 adee63344 · LS louvre-alut 133e7c00e (cherry-pick 9b7af01f3) ·
  NS kokoruutu-lepo 86064a98f · LS monalisa-201 f7952e7b3 · KS kohdekaupunkipallot-201 440325942 · LS pyramidiketju 22ce38984 (PT: KETJU, a9d86b242..).
  Pyramidiyhdistyksessä ristiriita KaupunkiPalloKuva.Askel: yhdistetty KS:n KuvaKameraPois + LS:n esi→Kuva-blit, Piirra-silmukkaan museoKuva/louvreKuva (fe08a1686).
- Testit **c83357f52 vihreät** (Linssit 2015, Peli 592, Kartta 508, tarkista 0, peili 0) = lukitusrunko, ellei PT kuittaa lisää (NUI fef47c0aa) → silloin testit201.sh uudelleen.
  Mona Lisa f7952e7b3 pysyy; LS:n kuvat m0–m2 ennen TF-latausta: vika → TF seis ja commit pois.
- Odottaa PT:n kuittausta simun jälkeen: NUI maakunnan Lue lisää fef47c0aa. Mona Lisan kuvat ~00.25 (LS-seuraaja): vika → commit pois ja Mona Lisa -virke pois muutoslokista.
  EI MUKAAN: NUI kehysnappien häivytys, ISS-hammasratas.
- Muutosloki: juna201/muutosloki-201.txt = PT:n teksti ilman pyramidia (235 mrk, raja 280); PR https://github.com/ravelius/Matkakirja/pull/4831 (dc6870263) odottaa PT:n kuittausta → JU mergeää = M.
  Worktree wt/natiiviseppa-muutosloki-201 (mergen jälkeen tools/uusi-worktree.sh --poista natiiviseppa-muutosloki-201).
- Lukitusehto R2: opas/pallokierros-v13/koopenhamina.json (LR:n paketti h, JU vie). Tarkista ennen lukitusta.
- LUKITUS: build201-viesti.txt täytetty (omistajan 23.21 sanatarkasti). ~00.25 JU:lle "KÄÄNNÖS NYT" (JU pysäyttää muut odottajat) →
  `nohup zsh …/juna201/lukitse201-ajo.sh <runko> > proto-3d/lokit/natiiviseppa-lukitse201-ajo.txt 2>&1 &` (ensimmäinen vapaa linja; app → lokit/natiiviseppa-app-201-lukitus-sim).
  KÄÄNNETTY → `cd /Users/Shared/Claude/proto-3d/Matkakirja-proto && zsh …/juna201/lukitse201-b.sh <runko> "<KÄÄNNETTY-rivi>" "ohitettu (omistaja 23.21 ilman testejä)" "<testirivi>"`
  (master tarkistetaan = 94a8a360c, juna/b29; peilipush voi kilpailla → ls-remote, juna/b29-peilit erikseen) → BUILD 201 -sha JU:lle (TF iOS) + PT:lle.
  Mac: JU:n TF NYT → `nohup zsh …/juna201/mac201.sh <runko>` (PROTO_LINJA=1 jos L1 vapaa, JU:n luvalla) → TF-ajo → JU + PT. TF:stä rivi PT:lle (tf201-ketju.log on JU:n).
- PT:n pyyntö (pyramidi nyt pois → kuvissa vain kipsipallot): lukituskäännöksestä kuvapari Pariisista (pyramidi + kipsipallot kehittäjätilassa hunnulla | ilman) → `nohup zsh …/juna201/kartta201-simu.sh <runko>`;
  JU kirjoittaa iPad-simun UDID:n juna201/simu-kartta201.nyt (SIMU NYT). Kuvat todistus-pariisi-201-ipad-*/kuvat → PT; ei pidätä TF:ää, ellei selvä rikkoutuminen.

## AKKU: KOKO RUUDUN SIVU LEPUUTTAA 3D:N (PT 23.06, omistajan havainto Louvren aloituksessa)
- 86064a98f (natiiviseppa/kokoruutu-lepo-201, wt/proto-natiiviseppa-kokoruutu-201): KokoRuutuPaatos (Kartta, puhdas) + KokoSivuPeitto (UI: mk-opas-aloitus, peittää koko
  paneelin läpinäkymättömänä) → Ruudunpaivitys yhdessä paikassa: 3D-kamerat pois (pallo, ruutuun piirtävät, Nayttamo-kamerat: museon sali + heijastus), Cesium suspendUpdate
  (yhteinen Macin piilotilan kanssa, palauttaa vain itse pysäyttämänsä), taajuus lepää (Aktiivinen/pallo eivät pidä täyttä). ElavaKerros ei palauta pallon kameraa sivun alle.
  ☰-valikon sivu (☰:n alla) ei peitä koko ruutua → ei lepoa (tietoinen raja). Testit KokoRuutuPaatosTestit 7.
- Simutodistus iPad (bd262afd): lokit/todistus-kokosivu-201-ipad-b-20261017-2342: sivu → 2 museokameraa + pallo pois, 10 fps, sivu piirtyy oikein; valinta → 3D takaisin, 60 fps,
  sali piirtyy. PT:lle raportoitu.
- AVOIN: LampoMittari A (master 94a8a360c) | B (BUILD 201) iPad Pro 13:lla samasta näkymästä (fps, piirtoväli, lämpö, akku %/10 min), kun omistaja ei käytä laitetta.
  JU: laitekäännökset L1:lle PK:n esikatselun jälkeen, iPad-vuoro ~01.00 (JU vahvistaa). Työkalut: natiiviseppa-skriptit/laite-sha.sh <sha> <lokikansio> (PROTO_LAITE_KOPIO),
  asennus ja konsoli kuten juna182/ab67/ipad-ab-ajo.sh; skenaario: linssi museo lahestyminen pois + linssi taidemuseo, Valitse näyttely 10 min, `peli ruutu` ja lampo-rivit
  (MATKAKIRJA lampo, Documents/lampo.jsonl). Tulos rivinä PT:lle.

## MUUTA TÄNÄÄN
- BUILD 200 = 94a8a360c (juna/b28 ed0654c54): iOS TF valmis (JU), Mac TF 39062841407 success (sisäinen ryhmä; ulkoinen Mac-jako ei ole käytössä, PT:n päätös jos halutaan).
- Todistusajo: galleria-suunta korjattu 453628585 (tyokalut-wt; galleria piilottaa Valikot → paneeli 0×0 → suunta ruudun koosta).
- Proto-haarat: natiiviseppa/metat-201 (yhdistetty), linssiseppa/louvre-alut-201 (cherry-pick, yhdistetty).
- Unity-beetaseuranta CronCreate "4 9 * * *" tehty (istuntokohtainen → luo uudelleen).

## OPITUT 17.10. ILTA
- Lukituskäännös kuolee session nollauksessa, jos ajo on istunnon lapsi → aja nohupilla (JU).
- Skenaarion `linssi museo maa …` heti käynnistyksen jälkeen jäi kuittaamatta → odota 15 ennen linssikomentoja.
- Commit "yksin" voi riippua haaran aiemmista (22ce38984 säätää 736739247:n vakiota) → tarkista ennen cherry-pickiä ja kysy PT:ltä ketju.

## TYÖTILAT
wt/proto-natiiviseppa-ehdokas (natiiviseppa/juna-201), wt/proto-natiiviseppa-kokoruutu-201 (yhdistetty runkoon; poista BUILD 201:n jälkeen), wt/proto-natiiviseppa-metat-201
(yhdistetty; poista), wt/proto-natiiviseppa-tyokalut (YHTEINEN), wt/proto-natiiviseppa-unity-b5 ja -unity67 (T7), wt/natiiviseppa-muutosloki-201 (#4831).
Appit: lokit/natiiviseppa-app-200-lukitus-sim, lokit/natiiviseppa-mac-tf-200, lokit/natiiviseppa-app-kokosivu-201-sim (+ 201 tulossa → 200-kopiot pois varmistuksen jälkeen).
