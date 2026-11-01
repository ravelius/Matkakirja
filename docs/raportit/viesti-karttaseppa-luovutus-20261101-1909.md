# Karttaseppä: luovutus 1.11.2026 klo 19.09 (KS local_740947d7)
Edellinen: viesti-karttaseppa-luovutus-20261101-1801.md (käsitelty). Syy: kontekstivahti 27 %.
C = `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-pohja/codex-pseudo3d/`, L = `C/lahitaso-20261101/`, T = `C/tasot-20261101/`.
Jokaisessa kansiossa MUISTIO.md (L:n MUISTIO kertoo koko päivän).

## OMISTAJAN PÄÄTÖS 18.22 (PT välitti)
Lähin taso VAIN keskustaan ja nähtävyyksien ympärille, muualla lähin zoom = välitaso; koskee kaikkia kaupunkeja.
Pariisissa käytetään valmiit 64 palaa + r03c10 = 65. Rengas 4 ja Bois-erät PERUTTU. 0,5 m/px -tarkkuusalueen 0,75 km:n
lähin zoom poistuu (PT hyväksyi; lähin koko lähitasolla 1,5 km). G:n uusintakysymys raukeaa, ellei raja näy pelissä.

## TEHTY (18.15–19.09)
- Codexille: tauko ec4e21b94 → peruutus + r03c10 619fbd1b9; Codex toimitti r03c10 7d001a8fa (SHA ok), kuitattu 34c017c02.
- r03c10 koottu: `L/kokoa-r4osa.sh` (PALAT=r03c10) → `L/lahitaso-65/koottu-65.png` (9901 × 6744, G-origo 3585,2860), sauma 0,71,
  Sacré-Cœur ehjä. LÄHITASO VALMIS 65 PALAA.
- Siirtymä lähi → väli pelin kameralla: `L/siirtyma.py` (REUNA, PISTEET, LEV); 1500 m ok, 630 m tarkkuushyppy (hyväksytty).
- Pelin tasot: `T/tee-tasot.py` uusittu (vali 12/12 koottu-v2, lahig = LAHI-kooste + maski piirretty osa × smoothstep 40 px,
  `alueet` = täysin peittävät suorakaiteet) → `kokoelma/G-tasot-64/` (54 tiedostoa). Vanha versio tee-tasot.ennen-64.py.
- Proto `karttaseppa/pariisi-tasot-216` 1fe11dd1b: PorrastettuPelissa true, LahinLeveysPaikassa liukuu 1,2 km:ssä,
  PalloKierto.NostaLahimpaan (pehmeä nousu 0,25 s), testi 4/4. **NS mergesi runkoon 216 (12e66804b); JU vei laatat 54/54
  18.33** (media.matkakirja.app/kohtaamiset/piirroskartta/pariisi/, pistokoe ok). NS-LISTA päivitetty (osio NYKYINEN).
- Poltettujen maamerkkien alat NUI:lle (PT: kyltit väistävät myös piirroksen maamerkkejä, esim. Grand Châtelet / Sainte-Chapelle):
  `T/ankkurit/maamerkit-rajaa.py` (vaihe 1 ruudukkorajaukset, vaihe 2 RAJAT=json → lat/lon + tarkistuskuva), 10 kohdetta
  lähi+väli-unionina → `T/ankkurit/pariisi-maamerkit-alat.{json,cs.txt}`, kuva `T/ankkurit/maamerkit-65/unioni/maamerkit-alat.jpg`.
  Muoto ehdotettu NUI:lle (local_43962c89): nimi → (p, e, l, i) kuten PiirrosPeitot. NUI ei ollut vielä vastannut muotoon.

## VIRHE (PT 18.4x) – KIRJATTU
Luovutuslisäys b09eb0ee3 (PR 5882) vei mainiin .claude/settings.local.json:n (esti kortit ja kuvat fable-checkoutissa).
EI korjata itse (KK hoitaa). Jatkossa git add vain poluilla, ei koskaan .claude/settings*.json; `git diff --cached --stat`
ennen committia. Muistissa: ei-settings-tiedostoja-committiin.md.

## AVOIN
1. NUI:n vastaus maamerkkien alojen muotoon (jos haluaa tasokohtaiset tai eri muodon, maamerkit-rajaa.py tekee).
2. Kun omistaja on katsonut Pariisin TF:ssä: palaute rajasta/siirtymästä (säädöt: REUNA tee-tasot.py:ssä, SiirtymaM ja
   NostaLahimpaan-aikavakio koodissa). G:n reunan kuva pelin kamerasta, jos PT pyytää.
3. Muut kaupungit samalla mallilla (keskusta + nähtävyydet; tyypillinen 10–15 palaa) vasta PT:n/omistajan tilauksella.
4. Siivottavissa: L:n kokeilukoosteet (*.ennen-*.py, kamera-saumat-r1*/r2*, omistajat-*.npy), siirtyma-r40/.
