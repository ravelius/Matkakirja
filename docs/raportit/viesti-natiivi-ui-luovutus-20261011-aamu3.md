# Natiivi-UI: luovutus 11.10.2026 aamu 3 (09.3x, PT:n nollaus 50 %)

Säännöt: viesti-natiivi-ui-luovutus-20261010-aamu.md. Edellinen: viesti-natiivi-ui-luovutus-20261011-aamu2.md.
Simut: iPhone 17 96044270-92AA-4BD3-BE2D-772C8495AB19 (T7-sarja), iPad F7513985-C8BC-4E97-8D29-9C9BD420E962. Käännös/simu vain
Julkaisijan NYT-viestillä; ilmoita "lukko vapaa" käännöksen ja "simu vapaa" ajon jälkeen. Ajot perl POSIX::setsid suoraan
`exec "zsh", skripti` (ei zsh -c). Todistusajo: /Users/Shared/Claude/wt/proto-natiiviseppa-tyokalut/tyokalut/todistusajo/todistusajo.sh.
Valmiit ajoskriptit ja skenaariot (kopioi omaan scratchpadiin): /private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-natiivi-ui/3b18fa1b-dac4-4eb6-9c76-45c245802b33/scratchpad
(kartussi-ajo.sh + sk-kartussi.txt, museo-simu.sh + sk-museo-ui.txt, pari3-ajo.sh). Huom: kaannos.txt on käännöspalvelun merge-SHA, ei haaran SHA.

## Kuitattu tänä aamuna (Natiivisepälle ilmoitettu)
- Juna 181: natiivi-ui/lippu-valimuisti **b39f3486b** (RANSKA□: välimuistinimeen jäi lippuUrl:n ?v=-kysely), natiivi-ui/taidemuseo-ui
  **2e409cc62** (todennettu 65435eea, todistus-museo-ui-pari-20261011.jpg), natiivi-ui/kartussi-aina-181 **faf1090bc** (⊃ 62925359e;
  OMISTAJA 09.1x: kartussi aina näkyvissä vasemmassa alareunassa, napautus → maakortti; maakortissa maakuntarivit pois, NOSTOT + MAAKUNNAT
  tilastorivipohjalla; kuvapari todistus-kartussi-pari-20261011.jpg). Sarakelinjaus **043409780** samassa haarassa → 181 jos ehti, muuten 182.
- HYLÄTTY: natiivi-ui/maakortti-pysakki 70b2d75ca (omistaja valitsi kartussin aina näkyviin).

## AVOIMET
1. **Museon ☰ + kertojan tekstitys, juna 182**: natiivi-ui/museo-tekstitys **79fbb7a35** (LS2:n linssiseppa2/museo-182 a30861c54 →
   98b470243 kaistale Ihmisen matkan kertomus-pohjalla → 79fbb7a35 ☰ Poistun tilalle: Tekstitys + Poistu linssistä, PT hyväksyi).
   LS2 ajaa arkin (puhelin pysty + iPad vaaka) PT:lle. Riski: pisin virke 234 merkkiä puhelin pystyssä voi nousta teoksen päälle
   (MuseoTaulu.AsetteleVirke) → jos LS2 raportoi, pienennä/rajaa kaistale. Testi: `ui museotekstitys`. Worktree wt/proto-natiivi-ui-museoteksti.
2. **Tyrmän kynttilä**: natiivi-ui/tyrma-kynttila **fa3252094** (palaa tyrmään tultaessa) Siirtosepän v10:ssä; natiivi-ui/kadet-oikealle
   **60265de6d** (kantoasento (0,30, −0,16, 0) m, ei peitä ovea) Julkaisijan v12/181l-listalla. Siirtoseppä säätää arvon simulla
   (`poikki kadet x y z`) ja kertoo hyvän arvon → vaihda SeikkailuPelaaja.KantoSiirto-oletus. Worktreet wt/proto-natiivi-ui-kynttila, -kadet.
3. **Web-pariteetti nostoriville**: omistajan tiivis maakortti (NOSTOT/MAAKUNNAT, ei maakuntarivejä) natiivissa faf1090bc → Pelikoodari tekee
   webin samaan malliin (PT kertoi); vastaa kysymyksiin natiivin mallista (Kartuscha.Muste.cs, Kartta.uss mk-kartuscha__muste).
4. **Pääkaupunkien lehti, juna 182**: natiivi-ui/paakaupunki-lehti **4cb6c437b** (masterin päällä; kartussin pääkaupunkirivin alle Avauskortin
   "Lue kaupunkilehti →", lehtinäkymä hakee kaupunkilehdet/<id>). Odottaa Pelikoodarin vientiä paketissa (kertoo version) → todennus simulla.
   HUOM: tehty masterin päälle ennen kartussi-aina-muutosta → rebase faf1090bc/juna-182:n päälle ennen junaa (Kartuscha.cs-ristiriita mahdollinen).
5. **Metrolinja (kippi), juna 182**: natiivi-ui/metrolinja-luettava **c448e8f2e** (0fb0ad5bf:n päällä), todennus seuraavassa kippi-käännöksessä.

## Muuta
- Olavinlinnan 5. kierroksen UI-löydökset eivät vaadi NUI:lta muutoksia (PT 07.1x). Varoituskyltti hylätty (PUHE ÄÄNENÄ).
- Appit levyllä: natiivi-ui-app-maakortti3, -museo, -kartussi, -metro-181, -sirut-181 → poista, kun juna 181 on TF:ssä.
- Worktreet (8): kynttila, kadet, maakortti (hylätty → poista), pklehti, metrolinja, museoteksti, kartussi, kartussi181. Poista kuitatut/hylätyt
  `git worktree remove` (proto; tools/uusi-worktree.sh on vain web-repolle), haarat jäävät.
