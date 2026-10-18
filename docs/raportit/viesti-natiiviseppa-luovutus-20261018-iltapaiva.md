# Natiivisepän luovutus 18.10.2026 klo 14.10 (Postivahti: KOVA RAJA 35 %)

Lue ensin: CLAUDE.md, Raamatun Ydinajatus kohta 2 ja tämä kokonaan. Pysyvät säännöt: proto-3d/tyokalut/natiiviseppa-skriptit/juna183/luovutus-huomiot.txt.
Jono (lopusta alkuun = uusin tila): natiiviseppa-skriptit/juna202/jono-202.txt. Viestit AINA session id:llä (PT local_cf5b4eca-…, JU local_1325b8e8-…, NUI local_e9fdc695-…).

## TILA: JUNA 202 – OMISTAJA PYYSI JULKAISUA 13.32 (valmis tänään, lukitus ≤ viikkokäyttö 98 %)
- **Runko natiiviseppa/juna-202 = 267e602d2** (wt/proto-natiiviseppa-ehdokas) VIHREÄ 14.08: Linssit 2085, Peli 608, Kartta 508, tarkista 0, peili 0. PT kuittasi.
- Mukana (2ba609861..): KS Kiina v13; LS välähdys + ”…”; NUI kehysnapit + aloituslogo (Aloitusverhon oma, splash pois dc682cda3); LR yksi kehys, galleria,
  kehysmuoto v5, pienoismallit 03247ac40 (Grimeton, Big Ben); SS äänikartat; PK puheavaimet + ISS-pöytä 6 (EI 6af527f3b) + kuvateksti (todistusraportti.py = VS:n
  master cef176edc, master yhdistetty runkoon → runko→master puhdas); LS hehkut pois/Olavinlinna/Lontoo + KS kohdepisteet v1+v2 (cherry-pick, ilman Mona Lisaa);
  VS sininen maa 3fad81c08; LR yhdistetty-202 03e465087 (Louvren kehykset v10 + pilotti: salit, valo, vartija, ihmiset, koodilla rakennettu Pulu; = dff3222cf).
- **Mona Lisa 4b5d670de REVERTOITU** (267e602d2; PT: 202g ei puhdas → juna 203). Pulu ei ole Tripo (MuseoPulu.cs, koodilla rakennettu) → jää, PT:lle kerrottu 14.1x.
- **ODOTTAA: NUI aloituslogo-korjaus-202 kärki 2b944e920** (LaunchScreen-logo + Plugins/iOS/MatkakirjaKaynnistysPeite.mm; Rakennus tarkistettu ok, yhdistyy
  puhtaasti). Yhdistä vasta simutodiste + KK + PT:n kuittaus → testit202.sh → **YKSI junakäännös** (PT: kiintiö) → NUI logo + LR Big Benin ankkuri samasta.
- **Muutosloki-PR #4875** (wt/natiiviseppa-muutosloki-202, haara natiiviseppa-muutosloki-202, 5e5dd2886, 276 mrk, PT kuittasi aiemman). Lisää logo heti, kun
  yhdistetty; PT halusi myös kaupunkiäänet (Lontoo, Praha, Ateena) jos mahtuu. Päivitys: scratchpad-tyyli → python json-muokkaus + validaattori (tarkistaMuutosloki).
- **LUKITUS valmiina**: juna202/lukitse202-ajo.sh → -a.sh (käännös) → -b.sh <runko> "<käännös>" "<muisti>" "<testit>" (juna/b30, pohja = master hetkellä, first-parent
  2ba609861..runko), mac202.sh. Ennen -b: täytä build202-viesti.txt:n "TÄYTÄ LUKITSE" (omistajan pyyntö sanatarkasti PT:n LUKITSE 202 -viestistä) ja
  muutosloki-202.txt (= #4875:n teksti). LUKITSE 202 vain PT:n viestistä. monalisa-revertti.sh tehty (ei enää tarpeen).

## LEVY
- unity67 + unity-b5 ovat symlinkkejä T7:lle (0 sisälevyltä, laite-sha käyttää) – ei poisteta. unity67:n muutokset talteen 6b84dcb56 (natiiviseppa/unity67-talteen-20261018).
- Siirretty T7 _siirretyt/: omat lokit (3,0 G), tyhjä kokoruutu-201. wt/proto-natiiviseppa-tyokalut YHTEINEN.

## OPITUT 18.10. iltapäivä
- PT:n "kokonaisena" voi sisältää pidätetyn commitin (Mona Lisa LR:n haaran pohjassa) → tarkista is-ancestor pidätetyille ennen yhdistystä.
- Ristiriidan ratkaisu: ÄLÄ `checkout --ours` (vie koko tiedoston); `checkout -m` → merkit ours/theirs → korjaa vain hunk; tarkista merkit ennen `git add` (&&, ei ;).
- Kuvateksti kuvan ulkopuolelle (omistaja 12.14, #4872): parikuva.py korjattu (raita kuvien yläpuolella).
- Unity-beetaseuranta CronCreate "4 9 * * *" istuntokohtainen → luo uudelleen.
