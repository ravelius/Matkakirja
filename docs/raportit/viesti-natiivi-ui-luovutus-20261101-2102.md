# Natiivi-UI: luovutus 1.11.2026 klo 21.02 (piirroskartta vain suorana + piirroslinssi)

Edellinen: viesti-natiivi-ui-luovutus-20261101-2015.md (nimikyltit c9c18d5f4; sen KESKEN-kohdat yhdistyivät tähän erään).
Syy: konteksti pehmeällä rajalla (Raamattu 7.37).

## Erä: omistajan päätös 1.11. klo 20.31 (PR 5893) + PT:n lisäykset 20.4x
"Piirros saa näkyä vain kun kartta suorassa ja pohjoiseen. Muuten näkyy striimi kartta ja suorista nappi."
"Suora" = Suorista-napin kulma: kallistus 31,8° + pohjoinen (PT:n korjaus 20.4x; 0° antaisi 18 % liian korkeat tornit).

Haara proto **natiivi-ui/piirros-nimiot-216** (worktree /Users/Shared/Claude/wt/proto-natiivi-ui-piirros-nimiot), uusin **aa50ebaca**
(sis. nimikyltit c9c18d5f4 ja niiden pohjan, juna 216 -runko 12e66804b).
- 774b9e7ab: PiirrosKerros kulmaraja 3°/12° → 0,25°/1°; Haivytys (Suorista-nappi) vain kulmasta, ei korkeudesta.
  PalloKierto.PiirrosKulma: ajo Pariisiin ulkopuolelta (alle 60 km) päättyy 31,8°:een ja pohjoiseen, myös saapumisnäkymä
  (`ajo.kallistukseen ??= 0`); kaupungin sisäiset ajot säilyttävät pelaajan kulman.
- 3eb16133e: piirroslinssi: piirroksen näkyessä kuvakulma 50° → 9° (PalloKierto.PiirrosKuvakulma) ja silmä × tan25°/tan(kapea/2),
  smoothstep PiirrosKerros.Nakyvyyden tahdissa; leikkaustasot × kerroin.
- aa50ebaca: linssi kameran fieldOfView:ssä (ei projektiomatriisia): Cesiumin LOD, PalloKierto.Sade (kosketussäteet) ja
  LiikeLaattojen varjokamera lukevat oikean kulman. Korkeudesta lasketut näkymät lukevat **PalloKierto.LogiikanFov(kamera)**
  (perus 50° linssin aikana): PalloKierto (PuoliKulma, MinKorkeus, AstettaPikselille, saapumisnäkymä, Projisoi), KarttaKerrokset,
  Nimikerros, Aurinko (usva), Varitaso (taso), NostoKerros (näkyvä leveys), Nappula.Mitat, PiirrosKerros.RuudunMpp.
  UUSI SÄÄNTÖ koodille: kartan kameran fieldOfView ei ole aina 50°; korkeus + kulma -laskuissa käytä LogiikanFov:ia.

Todisteet (yhteinen-iPad13, JU:n vuoro): proto-3d/lokit/todistus-piirros-suora-aa50ebaca-20261101-2057/ (OK, 0 poikkeusta);
kk/ 1–5 (5 = G rinnalla). Lähin taso vastaa KS:n kallistus-koonnin kuvaa 4 (G).

## KESKEN
- Kuvat lähetetty KK:lle 21.0x → **omistajan OK → merge-pyyntö NS:lle (local_99130238) junaan 216: natiivi-ui/piirros-nimiot-216
  aa50ebaca.** TF 216 odottaa tätä. Omistajan kommentit → korjaukset samaan haaraan.
- Piirroksen reuna välitasolla (kuvat/5-reuna-valitaso.png): piirroksen ulkopuolella vain kadunnimet, ei rakennuspohjia.
  Ilmoitettu PT:lle; KS arvioi (ei estä).
- Ei testattu: kahden sormen kierto/kallistus linssin aikana (vedon ankkurointi ruudun reunalla laskee 50°-mallilla →
  pieni lipsuma mahdollinen). Linssit (Linssit/-kansio) lukevat fieldOfView:tä suoraan; Pariisin piirroksen päällä avattu linssi tarkistamatta.

## Opit
- proto-3d/tyokalut/simu-lukko.sh ei ole suoritettava: aja `zsh …/simu-lukko.sh kaari natiivi-ui yhteinen-iPad13 -- <skripti>`.
- Suorista-napilla ei ole tekstiä: skenaariossa `tap-teksti mk-suoristaNappi` / `nakyy 6 mk-suoristaNappi`.
- Kuvien raaka-kopiot: kuvat/raaka/<nimi>.png (ei .kiertamaton) = ilman selitekaistaa KK:lle.
