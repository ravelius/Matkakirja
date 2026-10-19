# Natiivi-UI: luovutus 19.10.2026 klo 20.50 (Postivahti: kova raja 37 %)

Natiivi-UI (Opus) → seuraava Natiivi-UI-sessio. Korvaa -1740:n (sen "Opit" yhä voimassa). Id:t /Users/Shared/Claude/osoitekirja.md
(PT local_8d8ebf72-…, JU local_24e63224-…, SK local_b9ca71c7-…, NS local_fcc10552-…). Simu VAIN JU:n SIMU NYT -viestistä; ajon jälkeen
SIMU VAPAA JU:lle. Udidit: iPhone 123B4B25-36B7-4A76-B677-905621CD8F5A, iPad F7513985-C8BC-4E97-8D29-9C9BD420E962.
Skriptit: SP=/private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-natiivi-ui/be0b3271-7275-4871-a066-0f3e2ff0600e/scratchpad
(ketju6.sh <tila> <kaannos-sha>: palsta | jalki | aarnin-kolme | aarrevideo | b3; skenaariot palsta-haku.txt, varjostinjalki.txt;
vierityskehykset.py = videon kehysvälit → vierityksen p50/p95; parit2.py = kuvaparimalli). EI KÄYNNISSÄ OLEVIA AJOJA eikä omia käännöksiä.

## JONO (JU:n L1:llä yhdellä linjalla, kuorma > 100; JU ilmoittaa KÄÄNNETTY + SIMU NYT)
1. **natiivi-ui/palsta-haku 03deb7b16** (pohja juna-206 6cc7033b1; SEURAAVA juna 207) → _tyo/julkaisija/juna206-palsta-haku-app.
   Sisältö: a29a93414 aarrekortti (Kuvasuurennos.Palsta) yläpalkin + hakunapin alle kuten sivukortti (Pohja.NostokortinPaikka), kuva
   madaltuu niin että kehys mahtuu (PT 20.4x: pitkä kortti peitti hakunapin) + 03deb7b16 SK:n tekstit cbf820922 (#5012 Sheba "tarun
   mukaan", Kongo "Recifessä Brasiliassa", Raiatea maro ʻura suomennettu). SIMU NYT → `zsh SP/ketju6.sh palsta <kaannos>` (iPhone + iPad,
   4 korttia). Tarkista täysikokoisina: kortin yläreuna hakunapin alla, koko teksti näkyy, iPadin kuva ei liian matala. Kuvaparit
   ennen/jälkeen PT:lle (ennen: todistus-aarnin-kolme2-iphone-20261019-2036/kuvat/ak-eurooppa|ak-lahi-ita, iPad:
   todistus-valikko-jatko2-ipad-20261019-1819/kuvat/vc-aarre-auki) + tuore lukija (Sonnet) 3 uudesta tekstistä → PT ≤ 3 riviä → NS.
2. **natiivi-ui/varjostimet d316b7387** (pohja juna-204 6451b7f8d; juna 206/207 PT:n kuittaamana) → _tyo/julkaisija/juna204-varjostimet-app.
   Varjostinten esilämmitys (PT 19.0x): Varjostinesilammitys.cs (GraphicsStateCollection; peli-komento `varjostimet jalki aloita|tallenna`,
   aloitusverhon jälkeen WarmUp-työ buildin kokoelmasta StreamingAssets/varjostimet-metal.graphicsstate). SIMU NYT → `zsh SP/ketju6.sh jalki
   <kaannos>` (iPad: jälki Cupolasta + kohdevalikosta, kopioi tiedoston SP/varjostimet-metal.graphicsstate). Sitten: kopioi tiedosto
   haaraan Assets/StreamingAssets/varjostimet-metal.graphicsstate (+ .meta DefaultImporter, uusi guid), LAHDE.txt-rivi, commit → 2. käännös
   JU:lta → simu B3-skenaariolla (SP/b3-vieritys-ipad.txt, kevyt kuorma) → lokista "varjostimet: esilämmitys valmis" + Cupolan avauksen
   pisin kehys (nyt 1,2 s kevyellä, tavoite selvästi alle) → PT. Huom: jäljen ja lämmityksen sopivuus laitteelle (simun Metal) on oletus.

## ODOTTAA
- **natiivi-ui/aarrevideo 73cbdc576** (juna-205:n päällä, e21b468a1 + skenaarion korjaus): koodi PT:n kuittaama, MUTTA ei junaan väliaikaisella
  testivideolla (omistajan linjaus). Codexin Blender-video renderöidään yöllä 02–06 (KK/PT) → aamulla: video samoilla nimillä
  StreamingAssets/mukana/aarre-europe-pysty|vaaka.mp4, LAHDE-rivi (väliaikainen-teksti pois), käännös → simu
  tyokalut/todistusajo/skenaariot/aarrevideo.txt (iPhone pysty + vaaka; ei mustia reunoja) → PT → NS (juna 207). Huom NS:lle: LAHDE.txt
  konfliktoi aarnin-kolmen kanssa (molemmat lisäävät v2-rivien perään; säilytä molemmat).
- **natiivi-ui/uni-smaragdi-204 51f326738**: Mantan smaragdin unikuva kytketty (Codex 57463fc24, pehmeät reunat unikuva.py, El Dorado
  pois). Uni pysyy Kaytossa=false; ei simua tehty (simu `ui aloitus uni`). PT tietää; kytke junaan PT:n pyynnöstä.

## VALMIIT TÄNÄÄN (PT kuittasi)
- valikko-jatko-204 9eb354a3a + laskuri 93c3461b3 ("4 / 7") → juna 204 (NS mergesi). B3-iPad: vieritys 60 fps jo ennen korjausta
  (kevyt ajo todistus-b3-vieritys-ipad3-20261019-1907: videon kehysvälit p50 16,7 / p95 35 ms); 04d8dc98d junassa, vaaraton.
- aarnin-kolme b8fdc5e4e (Kongo/Manta/Raiatea + Montezuman rivikuvakkeen flex-shrink) + a1333d407 (SK #5009 + #4997) → juna 206 rungossa.
- RETKIKUNTA-otsikko (yhteinen mk-pudotus__otsikko) ja "sähköttää" jätetään (PT 20.0x).

## Worktreet (proto, /Users/Shared/Claude/wt/proto-natiivi-ui-…)
palsta-haku, varjostimet, aarrevideo, uni-smaragdi-204, aarnin-kolme (mergetty 206:een → poista kun 206 lukittu: `git -C
/Users/Shared/Claude/proto-3d/Matkakirja-proto worktree remove …`). Proto-repon päähaara on master; junat natiiviseppa/juna-20N.

## Opit
- **Vierityksen fps mitataan todistusvideon kehysväleistä** (SP/vierityskehykset.py), ei "kehysajat"-rivien 5 s p50:stä (lepo hallitsee);
  fps-ehdot kevyellä kuormalla (todistusajo kirjaa "KUORMA, ei fps" kun load > 16). Muistissa vieritys-mitataan-videon-kehysvaleista.md.
- **Cupolan avausjumi = Unityn laiska Metal-varjostinkäännös** (pino SubProgram::Compile → CreateGpuProgram → MTLCompiler); simulla
  skaalautuu kuormaan (load 7 → 1 s, 19 → 25 s).
- Natiivin aarnin-luettelo.fi.json synkataan SK:n main-tiedostosta docs/raportit/aarnin-luettelo-tekstit-20261019.json (nimi/kuvaus/historia).
- todistusajon `oleta` on grep -E ui-komennon vastausriviin "→ =…": kirjoita hakulause vastausmuodon mukaan.
- Merge juna-runkoon: proto-repossa ei ole mainia; JU:n "main-runko" = uusin natiiviseppa/juna-20N.
