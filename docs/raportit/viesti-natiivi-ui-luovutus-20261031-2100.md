# Natiivi-UI: luovutus 31.10.2026 klo 21.00 (kaupunkikierros ja kohdekartta junaan 216; Suorista-nappi odottaa KS:n kerrosta)

Edellinen: viesti-natiivi-ui-luovutus-20261031-0950.md.

## Valmiit tänään (proto-3d, peilit natiivi-backup peili/proto/natiivi-ui/*)
- **Kohdekartan piirrokset** natiivi-ui/piirros-kontrasti-216 kärki **24426a0a0** → NS (junassa 216, PT kuittasi 24426a0a0:n parin):
  tasatut kuvat kokoelmasta kohdekartanPiirrokset, kova varjo 1 pt #2c2318 0,45 (siluetti AjattelijaVarjo pass 1), 36 px,
  ease-in-out-suurennus, kevyt merkki pois, väli 42, kiinteä kohde 15 % (kiintea), piirroskoot moduulista
  moduulit/js/packs/kohdekartan-piirroskoot.json (kääre exportit.KOHDEKARTAN_PIIRROSKOOT, puuttuva = 1).
- **Kaupunkikierros** natiivi-ui/kierros-vaaka-216 kärki **20a6e0311** → NS merge-pyyntö 17.4x (OMISTAJA HYVÄKSYI 17.34, KK):
  alanapit korin reunalla kaikilla laitteilla (EsitysAla), tekstityksen tumma tausta iPhone vaakana (Tekstityskaista.Tausta),
  kuvat päällekkäin turva-alueen oikeassa reunassa, metrolinja Kierrostila (ei otsikkoa, pysähdyksessä vain nimi yläreunaan,
  napautus avaa/sulkee, lähtö: laajenee ensin) ja SAMA KEVYT MOOTTORI kaikissa tiloissa (vain translate/scale/opacity,
  OpasMetrolinja), pysähdyksen kamera (Ydin PysahdysKatse, Raamattu 2.82: koko rakennus nappirivin ja ylä-UI:n välissä,
  silmä nousee tarvittaessa 15°:n katseeseen, laskeutuvalla lennolla ei vaakaa). Mittausloki "opas: pysähdyksen katse".
  Todistus lokit/todistus-kierros-vaaka-216-20261031-1719 (kk/: paketti ilman selitekaistaa).

## KESKEN
- **Suorista-nappi + kohdenostojen piirrosten himmennys** natiivi-ui/suorista-216 kärki **5f5890e66** (juna d41ae2a47 + 2):
  Matkakirja.Natiivi.PiirrosSuoristus { Func<float> Haivytys, Action Suorista, Func<float> Nakyvyys } – KS asettaa
  heijastuksella haarastaan karttaseppa/piirros-pariisi-216 (Matkakirja.Kartta.PiirrosKerros). Nappi: OHJAUSNAPPI kompassi
  Linssit-napin alla (Karttaselite), näkyy Haivytys > 0,5. NostotKartalla.PiirrostenPeitto: kohdenostopiirrokset 1 − Nakyvyys.
  Seuraavaksi: KS yhdistää ja ottaa simuparin (JU antoi KS:lle vuoron 21.0x) → PT OK → NS junaan 216. tarkista.sh 0.
- **Notre-Damen omat mallit** (LAV/NS): v6k28-pari PT:lle ja LAV:lle (todistus-nd-v6k28-juna216-20261031-2052): katot
  tummemmat, maa harmaampi mutta ei Googlen värinen; leikkaus yhä 127 solmua (NS:n v6k27 = 38 solmua toi Googlen työmaan esiin).

## Opit
- Todistusajon `tap x y` on simun PYSTYkehyksessä: vaaka (lx, ly) → tap (402 − ly, lx) iPhone 18 Prolla. `ui napauta` = paneelipisteet.
- Pysähdyksen tunnistus kierroksen silmukan vaiheesta (Silmukka.Vaihe != Lentaa), ei KierrosLahtee-ajastuksesta (1. lento ja hyppy
  eivät laukaise sitä).
- StyleLength-vertailu: asettamaton `right` on arvoltaan 0 → vertaa `!= new StyleLength(x)`, ei `.value.value`.
- Museon musta siirto vain `linssi museo lento 0` + `siirto musta` museon auettua (lentävä kamera on oletus).
- Kuvaparit PT:lle, KK:lle vain omistajan pyytämät ilman selitekaistaa (raaka/). Simu ilman kuormaa: odota-ja-aja.zsh (kuorma < 12).
- Oma simu natiivi-ui-iPhone18 A885020B (T7), luotu 31.10.; iPad natiivi-ui-iPad11 F7513985.
