# Natiivisepän luovutus 28.10.2026 klo 13.10 (juna 213 runko f98dac3ce)

Vain voimassa oleva tila. Historia: /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna213/jono-213.txt (loppu = uusin).
Id:t: /Users/Shared/Claude/osoitekirja.md. PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a,
JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, KS local_7b57e35a-3a8e-4943-aba1-c960b9eb4671.

## TILA
- **Juna 213 runko natiiviseppa/juna-213 = f98dac3ce** (wt/proto-natiiviseppa-ehdokas, puhdas; peili natiivi-backup
  peili/proto/natiiviseppa/juna-213). Testit VIHREÄT 2213/761/567, tarkista 0. Edellisen luovutuksen (0b470602d) päälle:
  KS kohteet-puoleen 646f3027d → 32bbe0d01 (omistaja 11.51), oma adcb187d2 → f687a1708 (KK 11.5x), KS raja-ohennus
  916dc5cb8 → f98dac3ce (omistaja 12.35).
- Ehdokas-wt:ssä oli vieras Tyylikirja-muutos (10.52, vanha web-lähde) → talteen lokit/natiiviseppa-ehdokas-tyylikirja-1052.patch, palautettu.
- **Pieni iPad (iPad Pro 11):** asennettu 11.56 runko 32bbe0d01 (KK:lle ilmoitettu). SEURAAVA ASENNUS (OMISTAJAN PÄÄTÖS 13.01):
  vasta kun KAIKKI ovat vihreässä rungossa: raja-ohennus (✓), KS kohdemerkin väistö 5c7384369 (omistajan OK, KK välittää; KS tekee
  limittäin-version), KS merkittävyysporrastus, NUI + SK nähtävyysnostot striimikartalle. Valmiiksipiirto mukaan, jos rungossa.
  Komento: `zsh juna213/pieni-ipad.sh <runko-sha9>`; KK:lle yksi rivi (runko + mitä mukana).
- JULKAISUEHDOT ennen lukitusta (ennallaan, ks. 1010-luovutus): taivas/tausta/muurikate ämpäriin (JU), hehku-ehto, muistiajo (LT).

## STRIIMIKARTTA NOPEAMMAKSI (OMISTAJAN PÄÄTÖS 09.54)
- Haara natiiviseppa/piirto-rinn-213 (wt/proto-natiiviseppa-mvt-jako, peili peili/proto/natiiviseppa/piirto-rinn-213):
  d440c12be piirto 2–4 rinnakkain + adcb187d2 näkyvät palat ensin verkossa (RUNGOSSA) → af4c1866a valmiiksipiirto
  (EsilataaElava piirtää ElavaEsilataus.Valmiiksi z11–z16 ~150 palaa ennen dataa, tausta, ei kuumana) → **93416b0e5** komento
  `elavakartta esilataa lat lon [data]`. Testit 2213/761/568, tarkista 0.
- Mittaukset (Iso iPad vaaka): lataus-ab3-20261028-1125 adcb187d2 8,3 → 7,8 s; **lataus-ab6-20261028-1250 valmiiksipiirto
  9,3 → 5,5 s** (kaupunkinäkymä ensin, sitten keskusta), muisti fp-huippu ei kasvanut (3178–3223 vs 3172–3340 Mt).
  lataus-ab4 (kaupunki <id> ei lennä) ja lataus-ab5 (aloitusnäkymästä suoraan) eivät kuvaa peliä.
- **ODOTTAA KK:ta: 93416b0e5 runkoon** (kysytty 13.05). Kun OK: `git -C wt/proto-natiiviseppa-ehdokas merge --no-ff 93416b0e5`,
  testit, peili, rivi PT:lle.
- Jäljellä oleva aika: Cesium pyytää valmiiksipiirron alueen ulkopuoleltakin (uusia 126–174 palaa); Z15/Z16-säteen laajennus
  mahdollinen jatko (kaksinkertainen piirtoaika).

## JATKOKOMENNOT (MAC-UUDELLEENKÄYNNISTYS, Raamattu 12.9)
- Ei pitkiä taustaajoja käynnissä 13.10. Mittaus uudelleen: `zsh juna213/lataus-ab6.sh lataus-ab7-<pvm>` UUSILLA kaupungeilla
  (käydyt listattu lataus-ab3/-ab6.sh:ssa). Laiteäpit lokit/natiiviseppa-app-210-{vverkko,vvalmis2,runko-0b470602d,runko-32bbe0d01}-laite.
- lataus213.sh: pid konsolista (ei 400 s odotusta), KAUPUNKI-/ENNEN-env, muisti-tarkka.log talteen.
- Merge-testit: `EI_PEILIA=1 nice -n 15 zsh juna210/testit210-rinn.sh <wt>` (RuutusyyTestit.AjanottoKirjaa voi kaatua kuormassa; yksin 10/10).
- Cronit (session omat, luo uudelleen): postilaatikkovahti "17,47 * * * *", Unity-beeta "4 9 * * *".
