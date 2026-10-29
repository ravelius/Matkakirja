# Natiivisepän luovutus 28.10.2026 klo 22.10 (KOVA RAJA 40 %; juna 213 runko b8a92d661)

Vain voimassa oleva tila. Historia: /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna213/jono-213.txt (loppu = uusin).
Id:t: /Users/Shared/Claude/osoitekirja.md. PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a,
JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, KS local_7b57e35a-3a8e-4943-aba1-c960b9eb4671.

## TILA
- **Juna 213 runko natiiviseppa/juna-213 = b8a92d661** (wt/proto-natiiviseppa-ehdokas; peili natiivi-backup peili/proto/natiiviseppa/juna-213).
  Testit: katso lokit/testit-runko-b8a92d661.log (ajossa 22.0x; edellinen a7b9b71d4 VIHREÄ 2217/761/573, tarkista 0).
  Sisältö 1650-luovutuksen ca099a266:n päälle: PK liito d5ec0c2f4 + vartija f912dd6ad, KS porrastus f5ea99f7f + väistö 752794a22
  (omistaja 21.40), KS suomeksi-213 98b9bace8 + 457d05f98 (vain suomenkieliset merkittävät, leirit pois; omistaja 21.56).
- **TF 213:** a7b9b71d4 PERUTTU (englanninkieliset nimet). **SEURAAVA TYÖ:** kun b8a92d661 vihreä → JU:lle täysi SHA
  (`git -C /Users/Shared/Claude/wt/proto-natiiviseppa-ehdokas rev-parse HEAD`), muutosloki 4be927ee4 / PR 5480 ennallaan, kopio PT:lle.
  Ulkoinen jakelu pidossa (PT). Jos testit punaiset: korjaa/ilmoita KS:lle, ei vientiä.
- **Pieni iPad:** omistaja kotona → versio TF:n kautta (KK 21.5x); seuraava langaton asennus studiokäynnillä
  (`zsh juna213/pieni-odota.sh <sha9>` odottaa laitteen 60 min ja asentaa).
- **Juna 214 -jono:** NUI esikatselu-kerroin-213 b48ecd7f8 (PT 20.5x) → uuteen runkoon, kun 213 on viety; SHA NUI:lle.
- R2: varmistettu lista lokit/r2-dioraama-varmistettu-20261028.tsv PT:llä (158 hashia, 225,9 GB); ei poistoja ilman PT:tä.

## JATKOKOMENNOT (MAC-UUDELLEENKÄYNNISTYS, Raamattu 12.9)
- Taustalla vain testiajo (b8a92d661); keskeytyessä aja uudelleen:
  `EI_PEILIA=1 nice -n 15 zsh juna210/testit210-rinn.sh /Users/Shared/Claude/wt/proto-natiiviseppa-ehdokas`.
- Cronit (session omat, luo uudelleen): postilaatikkovahti "17,47 * * * *", Unity-beeta "4 9 * * *".
- Työtapa ja mittausskriptit: viesti-natiiviseppa-luovutus-20261028-1650.md.
