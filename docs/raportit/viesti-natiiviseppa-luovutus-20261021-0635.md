# Natiivisepän luovutus 21.10.2026 klo 06.35 (BUILD 208 TF:ssä; juna 209 auki, runko 4c8a8211f vihreä)

Vain voimassa oleva tila. Historia: proto-3d/tyokalut/natiiviseppa-skriptit/juna209/jono-209.txt (loppu = uusin).
Pysyvät säännöt: proto-3d/tyokalut/natiiviseppa-skriptit/juna183/luovutus-huomiot.txt. Id:t AINA osoitekirjasta.

## TILA
- **BUILD 208 = proto master aa1b21b8a** (TF iOS 39470886279 + Mac 39468883657, JU; muutosloki main 1d9a06c94).
- **JUNA 209 auki**: runko natiiviseppa/juna-209 (wt/proto-natiiviseppa-ehdokas) = **4c8a8211f** VIHREÄ (2208/700/518, tarkista 0), peilissä;
  laite + simu lokit/natiiviseppa-app-209-runko-4c8a8211f-{laite,sim}. Muutoslista juna209/muutokset-209.txt (päivitä: git log --first-parent aa1b21b8a..).
  Sisältää mm. PK nakoisyys-209 d266d1881 (muistikevennys 951e747ef), PK lento-wasd 9f7205708, NUI yhteiset-kortit 5e750e23f, LS museo-lento 6e34aa71f +
  kehys-lento dca483cec, LS orsay-rodin 3d0d45163, Lavastaja Louvre-hahmot/Nike/penkit/Suudelma 865c60e2d, VS kulta v5 + pihalaatat,
  tyokaluseppa esikatselu 335bbfbd4, NS verho-ruutuvahti 03933a662 + radio-pakattu f5cd08ee0 + testiajat f308b81b4.
- **Mittaukset 209**: muistiajo 5e4663bba huippu 3428 Mt / vapaa min 1691 / 0 varoitusta (208: 3300/1819); raketti Andøya 8d292ac8e 4333 Mt / 786 / 3 var.
  (nousun laattabudjetti → Karttaseppä, tavoite ≤ 3,5 Gt, sitten NS uusinta: juna209/muisti209-raketti.sh <nimi> <app-kansio>).
- LUKITSE 209 vain PT:n "OMISTAJA PYYSI JULKAISUA"; build209-viesti.txt TÄYTÄ LUKITSE; muutosloki-209.txt puuttuu.
- iPad Pro 13: LT:n käytössä (5e4663bba tai uudempi). AINA kysy LT:ltä VAPAA ja odota vastaus ennen iPadia (21.10. 01.36 virhe).

## TYÖNKULKU (yö 21.10.)
- Kierros: scratchpad-skripti kierros209.sh (kopio alla) = testit209-odota.sh (→ testit209-rinn.sh OSAT=6, ~2 min) ‖ ketju209.sh → laite209 → proto-kaanna.sh
  simu (PROTO_APP_KOPIO=…-sim). Uusi erä kesken testien: pysäytä VAIN ehdokas-cwd:n prosessit (älä pkill -f LinssiTestit.dll – osuu muiden ajoihin),
  merge --no-ff, push peiliin, uusi kierros. Jos laitekäännös jo käynnissä: pkill laite209.sh/laite-sha.sh <sha> + Unity T7-kopiosta + kuollut lukko pois.
- proto-kaanna.sh: yksi masterin sisältävä haara → checkout kärkeen (ei merge-committia) → kaannos.txt = rungon SHA.
- Ristiriita samasta korjauksesta kahdelta tekijältä: git checkout --theirs <tiedosto> + tarkista diff (RadioAanet 21.10.).
- Levy: omat lokit/natiiviseppa-app-* pois heti, kun uudempi runko on jaettu; ÄLÄ poista kaannospalvelu/juna.log, juna-tauko, *.txt.
- Hitain testi: KappelinArvoitusTestit.SatunnaisetTekosarjatEivatJumita 53 s (Olavinlinna, ei omistajaa) – MATKAKIRJA_TESTIAJAT=25 näyttää hitaimmat.

## kierros209.sh (scratchpad, katoaa – luo uudelleen tarvittaessa)
R=sha; testit209-odota.sh > lokit/natiiviseppa-testit209-$R.log & ( ketju209.sh $R > …ketju209-$R.log && PROTO_APP_KOPIO=lokit/natiiviseppa-app-209-runko-$R-sim
proto-kaanna.sh $R > …sim209-$R.log ) & ; [MAC=1: testien jälkeen PROTO_LINJA=2 juna186/mac186.sh $R 209 – EI TF:ää ilman omistajaa]; wait.
