# Natiivi-UI: luovutus 9.11.2026 klo 13.10 (kontekstivahti 26 %; korvaa -1245:n)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, NS local_0f7f169f-2ceb-43d2-8fb4-223dda2c0870,
PK local_d3bb1f78-e2ea-4089-8bae-d106bb1f9ff7. Kuvat ensin PT:lle (3 riviä: mitä, sha, arkin polku).
Arkki: python3 -I <scratchpad>/arkki.py ulos.jpg sarakkeet otsikko kuva1 nimi1 … (kopio
/private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-natiivi-ui/1bc73057-62ff-4b74-a5f3-0ed4b3ef4dbf/scratchpad/arkki.py).
Odotusvahti: bash <sama scratchpad>/vahti.sh (Monitor 30 min; ohittaa valmiit; seuraa nui-palkki-aina-*, nui-versiorivi-*, opas-m, p-5a).
Tarkistus `sh Linssit-testit/unity-tarkistus.sh`, `python3 -I tyokalut/pohjavahti.py`. zsh:n grep = ugrep → /usr/bin/grep tai git grep.
Esikatselun koot: iphone, iphone-vaaka, ipad, ipad-pysty (tyokalut/esikatselu.sh).

## 1. PALKKI AINA NÄKYVISSÄ (OMISTAJA 12.45 kortti "Kyllä (Suositus)"; KK suunnitelmat/20261109-palkki-aina-nakyvissa.md osat 1–4)
- TEHTY osat 1–3: natiivi-backup natiivi-ui/palkki-aina f5aca4541 (= paikkapalkki ef151b8fa + Pinnaus.cs, Nostokortti.cs, Nostoselain.cs;
  tarkistus 0, pohjavahti ok). Worktree /Users/Shared/Claude/wt/proto-natiivi-ui-palkki-aina.
  - Pinnaus: Kohde.AinaNakyvissa (nostot), PalkkiAuki/AvattuAlle; palkin napautus = PalkkiPainettu (auki → Pienenna, muuten Palauta);
    Palauta pitää palkin (AvaaAlle, kuva väistyy); Vaihda ei piilota palkkia; Irrota sulkee myös palkin alle avatun (KK 5); NaytaPalkki ei
    ponnahda uudelleen jo näkyvää. Testit `ui pinnaus napauta-otsikko|napauta-nimi|napauta-nimi-ala|napauta-seuraava` (UiKomennot.Napauta).
  - Nostokortti: PinNakyvissa → PalkinAlle (kortti palkin alle, KAPEA 45 % katto), ✕ pois palkin alla, PaivitaPin → Pystypaikka;
    nuoli auki ollessa: uusi nosto kiinnittyy (VaihdaPin) ja luetaan (lukija.Paina).
  - Nostoselain.AsetaPalkinAlla: kortin oma ‹ NOSTOT ▾ › ja AUTO piiloon palkin alla.
- OSA 1 SYY AVOIN: Unityn Clickable pysäyttää painalluksen (StopImmediatePropagation, UnityCsReference), joten sisäkkäinen nimi-nappi ei
  laukaise palkin Palautusta suoraan. Todennäköisin: sormi osui nimen ohi palkkiin (palkki = Palauta). Uudessa mallissa palkin napautus
  avaa/sulkee noston tarkoituksella; sk:n `napauta-nimi-ala` (14 pt ohi) näyttää lokissa, mihin ohinapautus osuu.
- JU AJAA: sk proto-3d/_tyo/natiivi-ui/sk-palkki-aina-1.txt (a-1…a-7) koot iphone, ipad, iphone-vaaka, ipad-pysty →
  lokit/nui-palkki-aina-1-<koko>-f5aca4541. SEURAAVAKSI: katso kuvat (a-2 nosto palkin alla, palkki pysyy; a-3 seuraava; a-4 valikko
  palkin alle; a-7 Ranskan valikko) ja lokin "alla True"/"nostovalikko auki" → arkki PT:lle → (PT) KK → omistaja ennen junaa (osa 4).
  Riskit: hakunappi piiloon kortin ajaksi voi siirtää palkkia (Asettele); iPhone pysty palkin + kortin mahtuminen.

## 2. VERSIORIVI 4ab1852b2 (natiivi-backup natiivi-ui/versiorivi, junan 223 päällä) – Mac-kuvat PT:llä
- Arkki proto-3d/lokit/nui-versiorivi-iphone-4ab1852b2/arkki-versiorivi-4ab1852b2.jpg: "v0.1.0" ilman koottu/commit/kehittäjä. Build (223)
  ja koontiaika näkyvät vain laitekäännöksessä. Odota PT:n kuittausta → junaan.

## 3. PAIKKAPALKKI p-5a ef151b8fa – NS:llä
- JU-ajo nui-paikkapalkki-p5a-iphone-ef151b8fa: yhä sumea beige; kuva t 2.5–3.3 s = 100–500 km (Vichy), esilataus kattaa ≤ 107 km,
  muisti +52 Mt. Arkki samassa kansiossa arkki-p5a-ef151b8fa.jpg → NS + PT 12.53. Kun NS korjaa: yhdistä paikkapalkkiin JA palkki-aina-
  haaraan, sk-paikkapalkki-p5a iphone → jos terävä, sk-paikkapalkki-1 kolmella koolla → PT → KK.

## 4. OPAS-M 6ce1efd49 – iphone katsottu, ipad JU:lla
- nui-opas-m-iphone-6ce1efd49: pysäkkilista M-napin alla (m2-saapui), arkki arkki-opas-m-iphone.jpg (Cesium-laatat valkoisina Macilla,
  ei tämän työn asia). Odota ipad → yksi rivi PT:lle molemmista.

## 5. FPV-HUD b57df8ec6 ja huudot: ennallaan (-1245:n kohdat 3 ja 5); odota PT/KK.

## Muuta
- Vanhat worktreet poistettavissa: wt/proto-natiivi-ui-nostovalikko-juna223, wt/proto-natiivi-ui-nostovalikko, wt/natiivi-ui-luovutus-1221.
