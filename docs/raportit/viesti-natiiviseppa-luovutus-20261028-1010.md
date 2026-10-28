# Natiivisepän luovutus 28.10.2026 klo 10.35 (konteksti 36 %; juna 213 runko 6dae4a62b)

Vain voimassa oleva tila. Historia: /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna213/jono-213.txt (loppu = uusin).
Id:t: /Users/Shared/Claude/osoitekirja.md. PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a,
JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, KS local_7b57e35a-3a8e-4943-aba1-c960b9eb4671.

## TILA
- **Juna 213 runko natiiviseppa/juna-213 = 6dae4a62b** (wt/proto-natiiviseppa-ehdokas, puhdas; peili natiivi-backup
  peili/proto/natiiviseppa/juna-213). Testit VIHREÄT 2213/761/566, tarkista 0. Edellisen luovutuksen (22b23ab46) päälle:
  KS perinto-violetti d8728903d → 634e122e9, perinto-kipina a884e7824 → 05f939e5d (omistaja 08.38 "Kelpaa"),
  suorituskyky a0d9d7503 (nimet liukuvat, omistaja 09.54) → 2b3c09bcd, perinto-kipina e34d24247 (nimien väli, vaakatekstit)
  → fb0ad7367, kohteet-puoleen eb3487b0e (kohdemerkkien lukitus, Louvre 0,7) → 6dae4a62b.
- **ODOTTAA KK:n PARIKUITTAUSTA (PT 10.2x):** NUI kartta-kytkimet-213 b81c08ef2 (sis. KS d89dd614e); merge puhdas 2b3c09bcd:n
  päälle (kokeiltu, peruttu). Kuittauksen jälkeen merge + testit + rivi PT:lle (web PR 5420 samaan aikaan).
- **JULKAISUEHDOT ennen lukitusta/TF:ää:** taivas-paiva-codex-v2/, tausta-v62, muurikate-v19 ämpäriin (JU);
  HEHKU: KS:n nimien välin lyhennys (30719e325 tms.) runkoon + KK:n 2×-kuittaus, muuten perintöhehku pois (PT 08.4x);
  muistiajo lukitusehdokkaalle (LT: e53794fd9 footprint 4483/4856 Mt, vapaata min 635 Mt).
- EI VIELÄ JUNAAN: VS esineet-metalli-213 33acd68dd (odottaa LR:n J4-paria, vaatii METALin).
- **Pieni iPad (iPad Pro 11):** omistaja 09.0x: asennus VASTA KK:n luvalla, kun KS:n 1) perintönimet pienemmiksi + tekstit
  vaakasuoraan + nimen väli ja 2) kohdemerkkien lukitus + Louvre kapeammaksi ovat rungossa KK:n kuittaamina.
  KS:n molemmat erät ovat NYT rungossa (6dae4a62b); KK:lta kysytty 10.3x lupaa + viedäänkö 0f5c8fc52 mukaan.
  Komento: `zsh juna213/pieni-ipad.sh <runko-sha9>` (L1-käännös JU:lta + asennus, PAKOTA=1). Raportti KK:lle: SHA + mitä kartassa.

## KESKEN: STRIIMIKARTTA NOPEAMMAKSI (OMISTAJAN PÄÄTÖS 09.54, PT: toteuttaja NS)
- Haara natiiviseppa/mvt-jako-213 = **0f5c8fc52** (wt/proto-natiiviseppa-mvt-jako, pohja 05f939e5d, peili
  peili/proto/natiiviseppa/mvt-jako-213). Testit 2213/761/567, tarkista 0. Kuva tavutarkasti sama (Macin koe).
  Sisältö: MVT-haun yhdistäminen + purettu pala jaettuna (KS:n 0b41c30ff-pohja, LRU 6), Z15/Z16 renkaiden karsinta,
  tyhjät maskit ohitetaan. Mac: Z16-pala 113–119 → 66–84 ms (Lontoo), 87 → 45 ms (Jyväskylä).
- MITATTU (lokit/lataus-ab-20261028-1011/, Iso iPad vaaka, käymättömät kaupungit): ennen Turku 11 s / Oulu 10 s, jälkeen
  Lahti 9 s / Kuopio 7 s (15 → 20–25 palaa/s, −25 %; tavoite −50 % ei täyttynyt). Raportoitu KK:lle 10.3x.
- Lisänopeus: piirto on pullonkaula (elavaPiirto 2 rinnakkain; Mac Z16 66–84 ms/pala). Seuraava askel: rinnakkaisuus 2 → 3–4,
  kun Lampo ei ole kuuma (elavaKuumana säilyy), mittaa lataus-ab.sh uusilla kaupungeilla (käydyt: Turku, Oulu, Lahti, Kuopio,
  Tampere, Jyväskylä, Lontoo). Lataus213-vaihe odottaa konsolin aikakatkaisun 400 s (lopeta-terminate ei osu) → korjaa pid-haku.
- Vierityksen jälkeen-mittaus (KS:n pyyntö): rungon äppi (sis. a0d9d7503) `laite210.sh <runko> runko-<sha>` ja vieritys213.sh
  APP_B = se, APP_A = v213 (634e122e9). Tee samalla käännöksellä kuin pienen iPadin versio.
- Raportti KK:lle (ennen|jälkeen, aika uudessa paikassa), SHA PT:lle; merge runkoon vasta KK:n kuittauksella.
- KS tekee rinnalla nimikerroksen liukumisen (karttaseppa/suorituskyky-213); NS ei koske Nimikerros.cs/ElavaNimet.cs:ään.
  Vierityksen ennen|jälkeen samalla skriptillä: `vieritys213.sh` (APP_A/APP_B rivit skriptin alussa).

## MITTAUKSET 28.10. (Iso iPad vaaka)
- Vieritys lokit/vieritys213-20261028-0906/yhteenveto.txt: 212 → 213 ei parantunut (JKL uusi 52 → 42 fps, LON 35 → 39);
  syy Nimikerros-allokaatiot (0,2–1,5 Gt/ajo) + GC, Update/EarlyUpdate nimeämättä.
- Lataus lokit/lataus213-20261028-0927/: uusi paikka 10 s, levyltä 4 s. OpenFreeMap 40–90 ms, maxzoom 14.

## TYÖTAPA (ennallaan, ks. 22b23ab46) + lisäykset
- Merge-testit: `EI_PEILIA=1 nice -n 15 zsh juna210/testit210-rinn.sh <wt>`; peili käsin juna-213:een.
- Laiteäpit: `LAITE_KOPIO="/Volumes/T7 4TB/koodaus/proto-natiiviseppa-unity-b6" zsh juna210/laite210.sh <sha> <nimi>`
  → lokit/natiiviseppa-app-210-<nimi>-laite (v212 = 80b1ea539, v213 = 634e122e9 valmiina).
- Iso iPad AINA VAAKA (omistaja 08.59): `ui kierto vaaka` käynnistyksen jälkeen (muisti iso-ipad-vaaka-asennossa).
- 12.9: EI POISTOJA oman checkoutin ulkopuolelta (lokit/.app-kopiot yösiivoukselle) – poistin aamulla omat 210–212-äpit, ei enää.
- Cronit (session omat, luo uudelleen): postilaatikkovahti "17,47 * * * *" (viimeksi 5658e3dfb), Unity-beeta "4 9 * * *" (b6 uusin).
- MAC-UUDELLEENKÄYNNISTYS: taustaajot jatkuvat yllä olevilla komennoilla (ketju-mvt.sh, pieni-ipad.sh), valmiit äpit ohitetaan.
