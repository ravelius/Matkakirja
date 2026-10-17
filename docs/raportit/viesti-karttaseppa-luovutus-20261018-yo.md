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
- **LISÄYS 01.2x: PT päätti v6** (kummut selviksi kukkuloiksi, kontrasti + varjo). v6 = 12193539c (rinnevalo suhteessa tasaiseen maahan
  varjostimessa _Ylos/_Vahvuus 1,6, valo 30°, kumpu ×0,9, heittovarjo valosta poispäin), tarkista.sh 0, peili pushattu.
  KÄÄNNÖSPYYNTÖ JU:lle → `_tyo/karttaseppa/kiina-taistelu-250-v6-app`; simu JU:n vuorolla junan 201 kuvien jälkeen.
  SIMU NYT → taustalle `zsh …/kiina-koko-linssi/odota-taistelu-250-v6.zsh > …/odota-taistelu-250-v6.out` → SIMU VAPAA → yhdista-video → ruudut → patka → PT.
  Tarkista v6:ssa: valoisa rinne vasen ylä, varjorinne + heittovarjo oikea ala (kukkula, ei kuoppa/rengas), Wu erottuu Wun alueesta.
- **LISÄYS 01.3x: v6 simu 01.26 (todistus-kiina-taistelu-250-v6-20261018-0126, SIMU VAPAA kuitattu 01.30)** → valo väärin päin:
  verkon kolmiot (a, etelä, itä) → normaalit alaspäin. **v7 = f1bc1d501** (varjostin kääntää normaalin ylös-puolelle), tarkista.sh 0,
  peili pushattu, KÄÄNNÖSPYYNTÖ JU:lle → `kiina-taistelu-250-v7-app`; skriptit `odota-/ajo-taistelu-250-v7.zsh` valmiina. Sama ketju kuin v6.
- **LISÄYS 01.45: v7 simu 01.39 VALMIS** (todistus-kiina-taistelu-250-v7-20261018-0139, SIMU VAPAA 01.44): kummut kukkuloina (valo vasen ylä,
  heittovarjo oikea ala), pätkä PT:lle 01.45. Kysytty: laki persikkainen → kirkastus 1,4 → 1,2? (varjostimen clamp-yläraja). Odottaa PT:tä.
- **JUNA 202 Reykjavík TEHTY 01.4x:** 571fe9877 (karttaseppa/reykjavik-202, wt proto-karttaseppa-reykjavik-202, pohja juna-201 73bca3b3a,
  peili pushattu): paakaupunki.islanti nimi → Reykjavík; generaattori kokoa-minipallo.mjs korjattu. PT:lle ilmoitettu.
- **LISÄYS 01.5x: Kiina v8 = 1931f3e55** (PT 01.44: kirkastus 1,4 → 1,2, sävy säilyy) JU:n käännösjonossa → `kiina-taistelu-250-v8-app`,
  skripti `ajo-taistelu-250-v8.zsh` (aja SUORAAN, ei odota-skriptiä: odota vaatii koko sarjan tyhjäksi; BD64C8E4 on LR:n). Ruudut r03 + r06
  täysikokoisina → jos laki valtion sävyssä: pätkä SUORAAN KK:lle (local_febfd152-…) omistajalle + rivi PT:lle (PT 01.44).
- **JUNA 202 Nuuk TEHTY 01.5x:** 37f37a530 (samassa karttaseppa/reykjavik-202) S2Maailma.Versio v2h; paketti `_valmiit/s2-indeksi-v2h-vienti-20261018`
  VIENTIPYYNTÖ JU:lla (oltava ämpärissä ennen TF 202). Generaattori `_tyo/karttaseppa/s2-nuuk-202/` + T7 `iss-s2-indeksi/v2h-gronlanti/`.
- Tarkista v5:ssä: kummut värillisinä kukkuloina (ei mustia reikiä), Wu ja Wei eri väreissä, erillään lyönnissä, aaltorengas näkyvä mutta ei musta.
  Hyväksynnän jälkeen Changping, Fei-joki, Yamen, Shanhai.

## 3. Avoimet (ennallaan)

- Main-data hyväksynnän jälkeen: ITÄTURKIT 589 44,3 N; NURGAN 1421 45,5/129,5; ETELÄINEN TANG 950 kahdelle riville; nykyinen-kiina.json nimiö;
  kiina-puherivit.json (main `data/linssit/kiinan-dynastiat/`).
- Paikallinen `.claude/settings.local.json` muutettu (ei omani, ei commitoida).
