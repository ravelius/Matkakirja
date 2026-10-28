# Natiivisepän luovutus 28.10.2026 klo 16.50 (konteksti 35 %; juna 213 runko ca099a266)

Vain voimassa oleva tila. Historia: /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna213/jono-213.txt (loppu = uusin).
Id:t: /Users/Shared/Claude/osoitekirja.md. PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a,
JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, KS local_7b57e35a-3a8e-4943-aba1-c960b9eb4671.

## TILA
- **Juna 213 runko natiiviseppa/juna-213 = ca099a266** (täysi SHA: `git -C wt/proto-natiiviseppa-ehdokas rev-parse HEAD`; puhdas;
  peili natiivi-backup peili/proto/natiiviseppa/juna-213). Testit VIHREÄT 2217/761/573, tarkista 0.
  Rungossa (1310-luovutuksen f98dac3ce:n päälle): valmiiksipiirto 93416b0e5 (KK), KS porrastus-koodi c59d611d3 + versaalinimet
  15f961913 + rakennukset d0c294363 ja f394caae4 (keveys oletuksena, e12; omistaja 16.12), NUI kohdenostot cc578c208 (16.12),
  KS väistö 054a73584 (omistaja 16.22; EI 5a1174abd/752794a22), PK kaapu 9b7a7f8f5 (KK 16.2x; JuoksuHahmo.shader → METAL JU:n käännöksessä).
- **TF 213 (OMISTAJAN PYYNTÖ 16.16 + PÄÄTÖS 16.20: ilman muistiajoa, automaattiset käännöstarkistukset ajetaan):** odottaa VAIN
  KS:n merkittävien porrastusta (pari 3 → KK → omistaja; KS:n merkittavat-213 3949e50f5..001dd5d54 tms., SHA KS:ltä). Kun OK:
  merge --no-ff, testit, peili → JU:lle täysi runko-SHA + muutosloki-PR https://github.com/ravelius/Matkakirja/pull/5480 (teksti 280 merkkiä;
  päivitä, jos porrastus muuttaa sisältöä), kopio PT:lle. JU on varannut L1:n.
- **Pieni iPad (OMISTAJAN PÄÄTÖS 13.01):** asennus vasta, kun raja ✓, väistö ✓, porrastus, nostot ✓ ovat vihreässä rungossa →
  käytännössä samalla rungolla kuin TF 213: `zsh juna213/pieni-ipad.sh <runko-sha9>`, KK:lle yksi rivi (runko + mitä mukana).

## MUUT
- R2 (JU/PT): varmistettu lista lokit/r2-dioraama-varmistettu-20261028.tsv (158 olavinlinna-hashia, 225,9 GB) PT:llä; ei poistoja ilman PT:tä.
- Striimikartta: valmiiksipiirto rungossa (Iso iPad lähizoom 9,3 → 5,5 s, lokit/lataus-ab6-20261028-1250). Jatkoidea: Z15/Z16-säteen laajennus.
- Mittausskriptit juna213/: lataus213.sh (KAUPUNKI/ENNEN-env, muisti-tarkka.log), lataus-ab3…ab6.sh (käydyt kaupungit listattu niissä).

## JATKOKOMENNOT (MAC-UUDELLEENKÄYNNISTYS, Raamattu 12.9)
- Ei pitkiä taustaajoja käynnissä 16.50.
- Merge-testit: `EI_PEILIA=1 nice -n 15 zsh juna210/testit210-rinn.sh /Users/Shared/Claude/wt/proto-natiiviseppa-ehdokas`
  (RuutusyyTestit.AjanottoKirjaa voi kaatua kuormassa; yksin 10/10). Peili: `git -C <wt> push natiivi-backup HEAD:refs/heads/peili/proto/natiiviseppa/juna-213`.
- Cronit (session omat, luo uudelleen): postilaatikkovahti "17,47 * * * *", Unity-beeta "4 9 * * *".
