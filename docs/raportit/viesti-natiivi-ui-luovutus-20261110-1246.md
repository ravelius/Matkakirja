# Natiivi-UI: luovutus 10.11.2026 klo 12.46 (kontekstivahti; korvaa -1222:n, jonka kohdat ovat yhä voimassa ellei alla toisin)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a.
Lue ensin -1222 (`git show 69367875f:docs/raportit/viesti-natiivi-ui-luovutus-20261110-1222.md`): Lehti+Info, valikon peitto, nostoluettelo-kaupungit-4 iPad, museo-ilmaisin.

## KARTAN KOHTEET OSA 4 (PT 12.2x) — TEHTY, PT kuittasi parin 13.0x OK
- Natiivi dca625ef8 natiivi-ui/kaupungin-luettelo-lajit (worktree /Users/Shared/Claude/wt/proto-nui-lajit): kaupungissa vain Nähtävyydet,
  Kadonneet ihmeet, Tarinapaikat (KaupunginKategoriat); Tarinapaikat = tarinakohteet, joilla kohteet[].tarinapaikka. Testikomento
  `ui kohdekartat juuri file:///…/kokoelmat/|pois` (data levyltä ennen vientiä).
- Tarinapaikan rivin korjaus 40a735533 (PT 13.0x): lento lähikatseluun (ei maiseman 24 km) ja perillä juttu auki (KaupunkiNosto.Avaa).
- Data 083410e11 Matkakirja-fable natiivi-ui/kartan-kohteet-osa4-data (origin; worktree /Users/Shared/Claude/wt/fable-nui-kohteet-osa4):
  tarinapaikka P8 + L5, kukko → Notre-Dame, 72 nimeä → Eiffel, Torni 1888 / romuraudaksi tornin länsi- ja itäjalalle, Vuosisadat ilman
  kaulanauhakuvaa. npm test 5705/0, skeemasopimus ennallaan. Paikallinen vienti /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/vienti-osa4.
  EI VIETY: PT 13.0x "data viedään vasta korjauksen ja ajon jälkeen" + PK:n viittausvahvistus. PR tekemättä (tee, kun PT sanoo).
- Ajo osa4-1 (lokit/nui-kohteet-osa4-1-mac-dca625ef8) katsottu: Pariisi 16/9/8, Kaupungit Pariisi 33 / Marseille 7 / Cayenne 2.
  Pari _tyo/natiivi-ui/kohteet-osa4-1-pariisi-valikko-ennen-jalkeen-tarinapaikat.png (+ -ennen-jalkeen.png koko ruutu) PT:llä.
- Lontoon 6 muuta tarinakohdetta: KK:n päätös, ei odoteta.

## AJOSSA JU:LLA — SEURAAVA ASKEL
- sk-klikattavat-2-pariisi-mac, 3e1bf8acb natiivi-ui/klikattavat-lajit (= lajit 40a735533 + klikattavat b1270220d, 3edc0a5e5; natiivi-backup),
  → lokit/nui-klikattavat-2-pariisi-mac-3e1bf8acb. Odotukset skenaarion otsakkeessa (_tyo/natiivi-ui/sk-klikattavat-2-pariisi-mac.txt):
  a-1/a-2 `ui klikattavat` KUOLLUT 0; b-1/b-2 tavallinen nosto palkkina; c-1 Torni 1888 juttu auki (loki "tarinapaikka perillä"), c-2 kamera
  tornin länsijalalla. Katso kuvat (sips -Z 1000), pari PT:lle. Huom: klikattavat-selvitys (_tyo/natiivi-ui/klikattavat-tavalliset-selvitys-20261110.md):
  kaupungin 3D-kartalle ei pidä nousta "vain lehteen" -aihepisteitä (osa 3); jos a-kuvissa niitä on, kerro PT:lle.
- Sitten PT:n sanalla: data 083410e11 PR:ksi ja vientiin (PK vahvistaa viittaukset), natiivi MR junaan vasta viennin jälkeen
  (ilman uutta dataa luettelo näyttää kaikki tarinakohteet, Pariisissa 17).

## SEURAAVA TYÖ (PT 13.0x, OMISTAJAN PYYNTÖ 12.45 KK:n kautta) — ALOITTAMATTA
"Otsikkovärit voisi parantaa. Näkyvät epäselvästi": kuva docs/raportit/kaappaukset/omistaja-20261110/valikko-otsikkovarit-epaselvat-1245.png
(Pelit-valikko, iPad 224.16). Tavoite: välilehtien LINSSIT/PELIT/KARTTA teksti ja ryhmäotsikot LAUTAPELIT/VIDEOPELIT/KESKENERÄISET luettavissa
yhdellä vilkaisulla; tumma teksti, pergamenttityyli ja välilehtien tunnusvärit pohjassa jäävät. Pari ennen | jälkeen täysikoossa KK:lle, PT:lle tieto.
