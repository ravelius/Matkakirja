# Natiivisepän luovutus 12.10.2026 klo 19.2x (tilinvaihto, PT 19.3x)

Lue ensin: CLAUDE.md, Raamatun Ydinajatus kohta 2 ja tämä kokonaan. Lisähuomiot ja työkaluohjeet:
/Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna183/luovutus-huomiot.txt (lue kokonaan) ja juna184/jono-184.txt.

## TILA

- **TF 183 valmis**: BUILD 183 = proto master 37083563e (merge juna/b13 7051f701b). iOS (Julkaisija, ajo 38245544819) ja Mac 1.1 (183)
  (ajo 38245905655). Beta-arvio hyväksytty 15.27. Sisältöpaketti v705 (de61051fe). Muistiportti A/B 182|183 OK.
- **Juna 184 kertyy**: runko natiiviseppa/juna-184 = f03911def (wt/proto-natiiviseppa-j175), BUILD 183:n päällä. OMISTAJA 15.0x:
  "tee kaikki junaan 184, kerron kun se julkaistaan" → kaikki kuitatut runkoon, testit ja muistimittaus valmiiksi, EI lukitusta, TF:ää
  eikä web-mergejä ennen kuin PT välittää sanatarkasti "OMISTAJA PYYSI JULKAISUA".
  Rungossa: Pelikoodari d3dea2004, 51fd69084, fdce53c2c, cd364de79, pallokisa 0e050ce92 → 7ed08d802 → 9d2567502 → 037029f84 (lipun takana,
  ⊃ NUI e4be60a18, 0c46f9776), kippi-soittolista 23e810949. Testit (873b9461c): L1532/P547/K481, tarkista 0. f03911def: Peli 547.

## AUKI (järjestyksessä)

1. **LT:n pallokisa-uusinta 2**: KÄÄNNÖS NYT pyydetty Julkaisijalta → `PROTO_APP_KOPIO=/Users/Shared/Claude/proto-3d/lokit/natiiviseppa-app-184-sim
   proto-kaanna.sh f03911def` → LUKKO VAPAA Julkaisijalle + app-polku LT:lle. (Edellinen 873b9461c → 3bdac8429 annettu LT:lle 18.37.)
2. **Kreikan piilotus (alue-184)**: natiiviseppa/alue-184 803526e1e (wt/proto-natiiviseppa-alue). SK:n lista #4521 (83 kohdetta, 12 korvaavaa
   CC BY -kuvaa, Ateenan miniatyyrit kuva:miniatyyrit/…, maamerkki:ateena) Resources/alueellisetpiilotukset.json:ssa; korvatun kuvan alle
   korvaavan tekijä. Uusintaparin simuajo käynnissä (juna184/alue-sim.sh, loki lokit/natiiviseppa-alue-sim3.log; GRC valmis 19.16, FIN tulossa)
   → täysikokoiset parit (kartta a-01, kortti a-02, kohdekartta a-03) JPEG 90 kuten lokit/kuvapari-kreikka-grc-fin-20261012/ → PT (ei omistajalle
   ennen PT:tä) → SIMU VAPAA Julkaisijalle. Ensimmäinen pari: kaikki Ateenan kansikuvat piilossa → tyhjä kehys → siksi korvaavat kuvat.
3. **Apurahasivu vain arvioijille + beta-linkki**: natiiviseppa/apuraha-184b 971b8d64d (wt/proto-natiiviseppa-apuraha) = NUI:n
   natiivi-ui/kehittaja-184 94c6095da + jakelukanava (iOS kuitti, Mac AppTransaction; Swift-plugari Macille kaanna.sh) + matkakirja://beta
   (apurahasivu piiloon, valmiit linssit ja testaajakoodi pois) + sovittu linssisääntö (Kehittajatila → kaikki; Testaajatila → Julkaistu;
   Valmiit ja omistus → Julkaistu = !Kesken). NUI ottaa 971b8d64d:n yhdistelmäkäännökseensä → app lokit/natiivi-ui-app-yhd184/Matkakirja3D.app →
   SIMU NYT → `zsh juna184/apuraha-sim.sh <app-polku>` (skenaario natiiviseppa-ajot/sk-apuraha.txt) → todiste PT:lle + kuittauspyyntö.
   Yhdistäminen runkoon PT:n kuittauksella (528ec19c0 on jo rungossa pallokisan kautta → mahdollinen ristiriita, ratkaise).
   Raatilinkki ja testaajatilan muutos ilman NUI-pohjaa PERUTTU (omistaja 17.4x lopullinen: vain beta-linkki).
4. **Web #4525** (matkakirja.app/beta → matkakirja://beta) ja #4508 (sähkekoodi) sekä worker #4509 (/retkikunta/eroa): junan 184
   lukitusmergeissä, ei ennen. Omistajalle linkki https://matkakirja.app/beta + yhden rivin ohje VASTA kun 184 on TF:ssä.
5. **Odottavat kuittausta (184)**: NUI d84cd1552, 57d0142cc + bf6d0f805, Olavinlinna-linnahaara (⊃ NUI 2f4d8ba89), LS2 raketti-184
   edeaff467 (SMAA, iPad-mittaus: reunat, ruutuaika, muisti, VÄRIT), LS1 lähestyminen 000654cba (LS1 mittasi 16.02).
6. **Unity-beetaseuranta** päivittäin klo 09 (unity-julkaisut.py; tyhjä tuloste = ei uutta). 12.10. ei uutta.

## OPITUT 12.10. (sitovia)

- **Muistiportti A/B-parina** samassa ajossa edellistä TF-appia vastaan (PT 11.3x); ei absoluuttirajaa (sama app 2671 → 2946 Mt eri laitetilassa).
  Työkalut: juna183/ketju183ab.sh (Pariisi, Olavinlinna+ISS, museo 182|183), museo-ab.sh. 184:lle: A = 183-app (lokit/natiiviseppa-app-183-laite).
- **iPad --console-käynnistys** epäonnistui perl setsid -irrotetusta ketjusta (CoreDeviceError 10002) → laiteajot Bashin run_in_background-
  taustatehtävänä; mittausskripteissä 5 × uusinta.
- **Worktreen poisto**: wt/proto-natiiviseppa-tyokalut on JAETTU todistusajon polku (~80 skriptiä, ALA-POISTA.md). Ennen minkään poistoa grep
  viittaukset koko proto-3d/tyokalut + _tyo -puusta. Poistin sen vahingossa 18.2x (LS1:n Lontoo-ajo ja Siirtosepän MH-ajo kärsivät), palautettu 18.43.
- **Kuvat omistajalle täysikokoisina** (omistaja 11.1x): natiivikoko tai pari natiivikorkeudella, JPEG 90, merkintä alareunassa; ei pienennettyjä arkkeja.
- **VAATII TOIMIA** (Raamattu #4489): omistajan toimia vaativa → ArtifactData talo/toimi-natiiviseppa (url claude.ai/artifact/Rq5ajPU4SraE2XKd7BYAix).
- **Asemataulu** talo/eteneminen: NS + Julkaisija päivittävät junan vaiheet 1–5 (get → update if_version). Nyt versio 15 (183 vaihe 4/5, Julkaisijan).
- Mac-käännös linjalla 2: `PROTO_LINJA=2 mac183.sh <BUILD>` (mac-kaanna.sh tukee linja 2:n lukkoa); TF: `gh workflow run proto3d-mac-testflight.yml -f build=<n> -f lataa=true`.
- Todistusajo: aani-loppu odottaa nyt kaappauksen loppuun + 60 s (3b5956329).
