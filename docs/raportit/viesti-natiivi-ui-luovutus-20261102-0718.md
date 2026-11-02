# Natiivi-UI: luovutus 2.11.2026 klo 07.18 (Pariisin piirros 0°, omistaja hyväksyi 07.18)

Edellinen: viesti-natiivi-ui-luovutus-20261101-2135.md (sen 0891d2df0 omistaja hyväksyi 21.35, NS otti runkoon). Syy: konteksti pehmeällä rajalla (Raamattu 7.37).

## Erä valmis: haara proto natiivi-ui/piirros-suora-218, uusin **7455c79ea** (pohja natiiviseppa/juna-218 aa44b92a8)
Worktree /Users/Shared/Claude/wt/proto-natiivi-ui-piirros-suora. Omistaja hyväksyi 2.11. 07.18, PT lähetti NS:lle junaan 218. EI AVOINTA TYÖTÄ.
- 76687c420: omistaja 2.11. 06.49 "Pariisin uusi kartta pitäisi näkyä kun kartta on ilman kallistusta" (korvaa 31,8° + 9° linssin).
  PiirrosKerros.Kallistus = 0; kuva levitetään G:n mittasuhteessa: PiirroksenLat(lat) = 48.859 + (lat − 48.859)·0,85
  (manifest Y = −0,85 N, KS vahvisti). Tasot-vakiot, laatat ja TasoVersio ennallaan (ei uusia laattoja). Rajat/tasot luetaan
  KuvanLat:lla. PiirrosLinssi pois suoraan ylhäältä (PiirrosKerros.LinssinNakyvyys = 0, kun kallistus < 1°). Testi PiirrosSuoraanYlhaalta.
- 7455c79ea: nimet ja nostot piirroksen kohtiin Nakyvyys-painolla (PT 07.0x): PalloKierto.RuutuPiste → PiirrosKerros.NakyvaLat
  (nostot, poltetut alat, PiirrosPeitot, kortit); Nimikerros Paikka.siirto × piirrosPaino; NostoKerros herätetään häivytyksessä.
  KS:n rajat-0.txt / maamerkit-alat-0.json EIVÄT ole käytössä (siirtyisivät kahdesti).
Todistus: proto-3d/lokit/todistus-piirros-0-7455c79ea-20261102-0709/ (kk/: G vs piirros, piirros vs striimi keskusta ja Montmartre,
selitteet.txt). Pitkiä ruutuja 184 = PUUTE (simun kuorma, pidempi skenaario; A-ajo 139).

## Huomiot seuraajalle
- Hyppy striimiin kallistettaessa: piirros 15 % origoa kohti (Montmartre ~0,5 km etelämpänä kuin striimi). Vaihtoehto
  (ei tehty): pystyskaala 0,85 kameran projektioon, mutta monet kerrokset laskevat oman projektionsa fov:sta (KaupunkiMerkit,
  Lipputanko, Reitit, ElavaKerros kopioi fov:n) → liian riskialtis.
- Ei testattu: kahden sormen kierto/kallistus; KaupunkiMerkit (kaupunkipisteet) eivät siirry (Pariisi-piste ~40 m).
- Todistusajon malli: scratchpadin kaanna-*.zsh (proto-kaanna.sh PROTO_APP_KOPIO=… + todistusajo.sh --nyt), ajo
  `SIMU_MUISTIRAJA=16 nice -n 15 zsh proto-3d/tyokalut/simu-lukko.sh kaari natiivi-ui yhteinen-iPad13 -- zsh <skripti>` taustalla (~8 min).
