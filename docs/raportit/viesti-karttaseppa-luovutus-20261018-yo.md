# Karttasepän luovutus 18.10.2026 klo 00.3x (PT/Postivahti: ei uusia töitä)

Linjaukset: Raamattu + muisti `karttaseppa-tila-*`. VIESTIT aina `send_message` session id:llä tiedostosta
`/Users/Shared/Claude/osoitekirja.md`, PT:lle ≤ 3 riviä. Edellinen luovutus: `viesti-karttaseppa-luovutus-20261017-yo.md`
(Kiinan 250-kokeen historia, työtapa, skriptipolut). Käännökset ja simut VAIN Julkaisijan jonon kautta
(KÄÄNNÖSPYYNTÖ → KÄÄNNETTY → SIMU NYT → SIMU VAPAA). Ruudut täysikokoisina ennen PT:tä; liike < 1 min pätkänä (patka.zsh).

## 1. TEHTY: kehittäjätilan kohdekaupunkipallot (omistaja 22.52, juna 201)

- Haara proto `karttaseppa/kohdekaupunkipallot-201` (wt `/Users/Shared/Claude/wt/proto-karttaseppa-pallot-201`, pohja juna-201 310541004),
  peili `peili/proto/karttaseppa/kohdekaupunkipallot-201`. **440325942 = junaan 201 (PT hyväksyi 00.1x).**
- 8532d6e7b (kipsipallot testaajille) PERUTTU samassa haarassa: omistajalla Kehittaja päällä (23.14), PT: ei testaajille.
- Korjaus: KaupunkiPalloMitat.KuvaKameraPois — pallokuvan kamera sammuu vasta piirrettyjen ruutujen jälkeen (levossa piirretään vain joka n:s
  ruutu); KaupunkiPalloKuva.Piirra joka rakennuksessa; kadonnut RenderTexture uudelleen; lokiriville kuvien tila. Testi KuvaKameraOdottaaPiirrettyaRuutua.
- Simu A/B (käännös a429be677 vs. TF 200 -koodi 8ce15e84d): molemmat näyttivät pallot → vika EI toistunut simussa; pari todistaa vain
  haitattomuuden. VARMISTUS TF 201:ssä omistajan laitteella. Kuvat `proto-3d/lokit/todistus-kohdekaupungit-201-{uusi-20261018-0008,vanha-20261018-0011}/kuvat/`,
  skenaario + ajot `_tyo/karttaseppa/kohdekaupungit-201/` (ab.zsh).
- PT:n löydös: Alsacen harmaa läikkä = Ranskan lipun varjo (Lipputanko), ei toimea. KK:n kysymys: hunnulla valmiit pallot muissa maissa
  täysikokoisia (KokoMaassa pienentää vain ilman huntua / himmeät) — muutos yhdellä ehdolla, jos halutaan (juna 202).
- JOS TF 201:ssä pallot puuttuvat yhä: jäljelle jää kipsikuvan polku (Harmaaksi + _Savy) tai lista; pyydä omistajalta tieto, näkyykö Tukholman
  värillinen pallo, ja harkitse NS:n laite-release.sh-ajoa iPadilla 00008103 (kehittäjälippu komennolla, kartta levossa).

## 2. KESKEN: Kiinan 250-taistelukoe v5 (omistaja 19.59, linja 2)

- Käännös 270832938 ⊇ 0bf177c8b (`_tyo/karttaseppa/kiina-taistelu-250-v5-app`, kaannos.out kirjoitettu). SIMU NYT 00.32, ajo käynnistyi 00.34
  taustalla (`kiina-koko-linssi/odota-taistelu-250-v5.out` → `ajo-taistelu-250-v5.out`). AJOA EI TAPETTU.
- Seuraaja: tarkista `ajo-taistelu-250-v5.out` (rivi "AJO kiina-taistelu-250-v5"), sitten heti **SIMU VAPAA Julkaisijalle** (jos ei jo kuitattu:
  `xcrun simctl --set "/Volumes/T7 4TB/Simulaattorit/Sarja" list devices booted` tyhjä) → `yhdista-video.zsh <todistuskansio>` → 1:1-ruudut
  13–36 s (`crop=800:600:500:250`) → jos ok `patka.zsh <kansio> 12 26` → PT 3 riviä.
- **LISÄYS 00.39: ajo VALMIS ja SIMU VAPAA kuitattu JU:lle.** Todistus `proto-3d/lokit/todistus-kiina-taistelu-250-v5-20261018-0034/`
  (PUUTE kaannos.txt = käännöspalvelun merge-sha 270832938 ⊇ 0bf177c8b, ok). Seuraaja: `yhdista-video.zsh` tähän kansioon → ruudut → pätkä → PT.
- **LISÄYS 01.05: v5 TARKISTETTU.** Video yhdistetty, ruudut `ruudut-v5/r01–r08.png`, pätkä `patka-omistajalle.mp4` (12–38 s) → PT 01.05.
  Ok: ei mustia reikiä, Wei/Wu eri värit, erillään iskussa, X + harmaa aaltorengas, kartta tasaiseksi. Puute: kummut pehmeitä läikkiä,
  ei selviä kukkuloita (matala kontrasti). ODOTTAA PT:n päätöstä: v6 (kontrasti/varjostus) vai pätkä omistajalle sellaisenaan.
- Tarkista v5:ssä: kummut värillisinä kukkuloina (ei mustia reikiä), Wu ja Wei eri väreissä, erillään lyönnissä, aaltorengas näkyvä mutta ei musta.
  Hyväksynnän jälkeen Changping, Fei-joki, Yamen, Shanhai.

## 3. Avoimet (ennallaan)

- Main-data hyväksynnän jälkeen: ITÄTURKIT 589 44,3 N; NURGAN 1421 45,5/129,5; ETELÄINEN TANG 950 kahdelle riville; nykyinen-kiina.json nimiö;
  kiina-puherivit.json (main `data/linssit/kiinan-dynastiat/`).
- Paikallinen `.claude/settings.local.json` muutettu (ei omani, ei commitoida).
