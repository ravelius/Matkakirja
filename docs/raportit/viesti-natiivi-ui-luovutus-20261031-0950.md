# Natiivi-UI: luovutus 31.10.2026 klo 09.50 (kohdekartan piirrokset kesken: odottaa KS:n kokoelmaa ja vientiä)

Edellinen: viesti-natiivi-ui-luovutus-20261030-2038.md.

## Valmiit tänään (kaikki junassa 216, worktreet poistettu)
- Ihmetähti piirroksen näkyvän yläreunan keskelle (web PR 5701): b216a5c10 → runko 607c42392. KK OK.
- Kevyempi ja pienempi ihmetähti (web PR 5702, 12 px, viiva 0,9, kulta 0,88, varjo 20 %): 5def5841b → runko 02304e9c7, omistaja OK 09.14.
- Tuileries-natiivipari (simu, juna 216 02304e9c7) KK:lle: _tyo/natiivi-ui/tuileries-pari/N1-tuileries-bastilji-lahi.png.
- Huom: Macin editoriesikatselu ei pura WebP:tä (vain Bastilji näkyy); WebP-piirrokset vaativat simun (_tyo/natiivi-ui/ihmetahti/tulos.md).

## KESKEN: kohdekartan piirrokset (omistaja 09.27–09.34, PT; web PR 5704 KS:n haara karttaseppa-kohdekartta-kontrasti)
Proto-haara natiivi-ui/piirros-kontrasti-216, kärki 61b03729e (pohja juna-216 02304e9c7), peili natiivi-backup
peili/proto/natiivi-ui/piirros-kontrasti-216, worktree /Users/Shared/Claude/wt/proto-natiivi-ui-piirros-kontrasti. tarkista.sh 0.
- 2d904aa9e: piirros 40 → 36, hajautusväli 46 → 42; valinnan suurennus ja paluu tyylikirjan suurennusliikkeellä
  (450 ms, --tk-liike-suurennus-*, luokka --liike vain siirtymän ajan). PT: riittää (olemassa olevaan suurennukseen).
- 61b03729e: KarttaPiirros valinnaisesta sisältökokoelmasta "kohdekartanpiirrokset" (KOHDEKARTAN_PIIRROKSET, rakenne kuten
  miniatyyrit; puuttuva/lataamaton → alkuperäinen; striimikartta aina alkuperäinen); kevyt merkki 0,72/0,78 pois
  kohdekartalta; valitun kuva 200 % (−50 %…150 %) kuten webin .kohde-piirros.valittu.
- EI kontrastikoodia natiiviin (PT: kontrasti vain kuvatiedostoihin, omistaja 09.33; 18386ce10 poistettu).
- AVOIN: PR 5704 ei vie taulua sisältöpakettiin. Pyysin KS:ltä (09.4x) kokoelman tools/vienti/kokoelmat.mjs:iin + lehdet.mjs
  kuva.url-käsittelyn ja kokoelman nimen. Jos nimi ≠ "kohdekartanpiirrokset", vaihda Kohdekartat.cs KarttaPiirrosKokoelma.
- Seuraavaksi: KS:n vastaus → nimi kuntoon → kun PR 5704 mergetty + sisältö viety: käännä
  `zsh /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/piirros-kontrasti/ajo.zsh` (oma simu natiivi-ui-iPad11 F7513985…,
  PROTO_LINJA=2; skenaario N1 ilman valintaa + N2 Tuileries valittuna). Pari KK:lle: ennen
  lokit/todistus-tuileries-kevyt-216-20261031-0931/kuvat/N1-kohdekartta.png, jälkeen uusi N1 + N2 (suurennus).
  NS:lle merge-pyyntö VASTA omistajan/KK:n OK:n jälkeen.
- Välikuvat 2d904aa9e:lla (vanhat kuvat, ei 200 %): lokit/todistus-piirros-kontrasti-216-20261031-0945/.

## Opit
- "ui kohdekartta nayta <kaupunki> <tuntematon-tunnus>" avaa kokoruudun ilman valintaa (valitulta tähti piiloutuu).
- Natiivin valitun piirroksen kuva oli ennen 61b03729e:tä 100 % (web 200 %), joten kyltti osui liian alas.
