# Natiivi-UI: luovutus 1.11.2026 klo 21.35 (reunan regressio korjattu + katunimet pois piirroksen näkyessä)

Edellinen: viesti-natiivi-ui-luovutus-20261101-2102.md (sis. LISÄYS 21.1x). Syy: konteksti pehmeällä rajalla (Raamattu 7.37).

## Erä: haara proto natiivi-ui/piirros-nimiot-216, uusin **0891d2df0**
Worktree /Users/Shared/Claude/wt/proto-natiivi-ui-piirros-nimiot. Sisältää aa50ebaca:n (piirroslinssi) ja nimikyltit c9c18d5f4.
- 2f14194f5: REUNAN TYHJÄ PAPERI = horisonttiusva (KS sama diagnoosi). Unityn lineaarinen sumu mitataan todellisesta silmästä, joka
  linssissä on ~5,9× kauempana → koko maapohja usvan väriin. Aurinko: fogStart/End + PalloKierto.LinssiLisaM (silmän lisäetäisyys);
  SilmanKorkeusM linssin aikana PalloKierto.LinssiSilmanKorkeusM:stä (ilmakehä).
- a2f14064e: Nimikerroksen kameran alapiste loogisesta silmästä (PalloKierto.AlapisteenSuunta; KS:n sivuhavainto: todellinen
  silmä ~15 km etelässä) – elävien nimien palat, säderaja ja karsinta.
- 0891d2df0: piirroksen näkyessä (PiirrosKerros.Nakyvyys > 0,5) ei katunimiä (elava-katu); KK 21.3x / omistajan "raja ja siirtymä
  luontevaksi". Kaupunginosat, kaupungit, joet ja puistot jäävät.
UUSI SÄÄNTÖ koodille (jatke aa50ebaca:n LogiikanFov-säännölle): kameran PAIKASTA lasketut asiat (sumu, alapiste, korkeus) lukevat
linssin aikana PalloKierto.LinssiLisaM / LinssiSilmanKorkeusM / AlapisteenSuunta.

Todistus (yhteinen-iPad13): proto-3d/lokit/todistus-piirros-suora-0891d2df0-20261101-2131/ (OK, 0 poikkeusta); kk/ 1 lähin,
2 välitaso, 3 reuna (striimi näkyy, ei katunimiä), 4 G rinnalla (G-puolisko otettu aa50ebaca-ajon koonnista x 0–1398;
koontiskripti oli scratchpadissa: raa'at kuvat + G-rinnakkain 1000 px korkeina, 16 px rako).
Edelliset vaiheet: todistus-piirros-suora-2f14194f5-20261101-2114, -a2f14064e-20261101-2121.

## KESKEN
- Kuvat KK:lla 21.3x → **omistajan OK → merge-pyyntö NS:lle (local_99130238) junaan 216: natiivi-ui/piirros-nimiot-216 0891d2df0.**
  TF 216 odottaa tätä. PT kuittasi reunan (21.2x). Omistajan kommentit → korjaukset samaan haaraan.
- Reunan pehmeä liuku on poltettu piirroksen maskeihin (-maski.jpg, KS:n aineisto); leveämpi liuku = maskien uusi poltto (KS),
  varjostimen mip-sumennus antaisi vaalean sädekehän. Värihyppy (kirkas piirros ↔ seepia, Seine sininen ↔ harmaa): KS sävyttää
  laatat hillitymmiksi (omistaja 21.1x), ei NUI:n koodia.
- PT: "Metroasema" (Abbesses'n Guimard-sisäänkäynti) jää ennalleen.
- Ei testattu: kahden sormen kierto/kallistus linssin aikana; linssi (Linssit/) Pariisin piirroksen päällä.
- KS:n jälkihuomio: Horisonttiusva.RuutuRajaY (UI-merkkien usvaraja) lasketaan 50°:n logiikkaprojektiolla, ei kapealla; 31,8°:ssa
  usva heikko, jätetty.

## Opit
- Todistusajo: kopioi scratchpadin kaanna-*.zsh -malli (proto-kaanna.sh PROTO_APP_KOPIO=… + todistusajo.sh --nyt), aja
  `SIMU_MUISTIRAJA=16 zsh proto-3d/tyokalut/simu-lukko.sh kaari natiivi-ui yhteinen-iPad13 -- zsh <skripti>` taustalla (~8 min).
- Curl error 23/42 -virherivit = keskeytetyt lataukset, eivät virheitä.
