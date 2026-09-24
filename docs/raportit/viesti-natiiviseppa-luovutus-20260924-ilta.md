# Natiivisepän luovutus 24.9.2026 ilta, klo 15.54

Luovuttaja: Natiiviseppä (Opus 5.5, Macin käyttäjä koodaus). Syy: konteksti 70 % (Fable).
Edellinen: viesti-natiiviseppa-luovutus-20260924-c.md. Rooli: natiivin pääkehittäjä, proto-gitin master, Unity/iPad/simulaattori.

## Lue ensin

CLAUDE.md, Raamatun Ydinajatus kohta 2 ja NATIIVI PELI ETUSIJALLE (erityisesti uusi **WEB ON MALLI, MITATTUNA**,
omistaja 24.9. klo 15.5x, Raamattu 9ebc5784c), proto-3d/TYOTAPA.md, Assets/Matkakirja/RAJAPINTA.md.
Muisti: natiiviseppa-tila-20260924-iltapaiva.md ja web-on-malli-mitattuna.md.

## Tila

- **Proto-master 9a5618b = BUILD 9, Julkaisijan viennissä** (ajo 36000776943, -nographics). Unity KIINNI ja EI käännöksiä,
  ennen kuin Julkaisija ilmoittaa "vienti valmis/ohi" (ilmoitus tulee uudelle sessiolle). Build 8 = f6de924 (202609241220).
- Build 9 sisältää: noppa webin mukaan (pelikoodari/siirrot-kartalle 4d3fe7a + natiiviseppa/siirtokohteet 74aac4e, kuvapari PASS),
  Natiivi-UI 6d39af4 (päätasolukijat, valintavihje B), b9-korjaukset (kone terävä lennolla: ei kuvasumennusta lennossa +
  DoF 2,0×; huntu pois > 6000 km + zoomihäivytys), oma tileset-varjostin Shaders/Cesium/MatkakirjaTileset (Cesiumin kaavio +
  globaalit `_overlayAlfa_0/1/2`, generaattori Lahde~/tee_tileset.py, Materiaalit/Pallo.mat), maamerkit-paketti (Pelikoodari),
  esilataus-edistyminen (Pelikoodari).
- Build 8 sisälsi: DC-3 HD, lennon kartta (sileä pinta, Usvalevy-pilvimeri, reittikaari pois, punaiset renkaat), maamerkit
  Lontoo/Ateena, radio AVAudioEngine (VU), elokuvalento erät 2 (potkurikiekko), 3 (Filmipino; heijastusluotain POIS:
  teki koneesta mustan) ja 5 (siiven ohi).
- Huntu: Z3–Z4 on ämpärissä (Karttaseppä), mutta natiivi käyttää vain Z5+ (Varitaso.AlinKaytetty; Fable hyväksyi
  huntutestin: ei suorakulmioita). Vertailu: komento `vari alin 3`.

## MERGE-PORTTI: WEB ON MALLI, MITATTUNA

Käyttäjälle näkyvää UI:ta tai toimintaa EI mergetä ilman merge-pyynnössä olevia (1) web-kuvia tuotannosta samassa
pelitilassa (tools/pariteetti-web-kuva.mjs, 393×852 ja 834×1194), (2) webin koodista mitattuja arvoja ja (4) web–natiivi-
kuvaparia. Tekniset erät (laattapalvelin, esilataus, vienti, varjostimet) ja Raamatussa nimetyt poikkeamat (iPhone-asettelu,
☰-linssivalikko, sumennus, lennon pinta, maamerkit, elokuvalento, VU, offline, kehittäjätila) saa mergetä. Natiivikuvia
varten käännä tekijän haara testihaaraan (testi/…) ja asenna iPhone 17 FB234D08 + iPad 503000D1.

## Build 10 -jono (kaikki unity-tarkistus 0, EI vielä käännetty Unityssä)

1. **Saapumisnäkymä webin kaavalla** (Fable): webissä maa täyttää ruudun (maan laatikko + maapaneeli × 1,3 korkeuteen
   sovitettuna, js/pallolauta/kamera.js ~680–1240, js/saapumisasento.js), natiivissa kiinteä 18,6°. Opus-agentti aloitti
   worktreessä `/Users/Shared/Claude/wt/proto-natiiviseppa-saapuminen`, haara `natiiviseppa/saapumisnakyma` (pohja
   fokuspohja), mitat `proto-3d/lokit/pariteetti-saapuminen/mitat.md`. Agentti oli tämän session ali-agentti: tarkista
   haaran commitit ja mitat.md; jos kesken, jatka (Opus-agentti tai itse). Kuvapari: web noppa-kartalle-web-20260924/kartta-*.png.
2. **Nostotaso fokuspohjasta** `natiiviseppa/fokuspohja` 38e424d: NostoKerros lukee maat.json `fokuspohja.bbox` ja laskee
   webin lehdenOsuuden max(w, h). **Siirtosepän PR #3081 (skeemat 1.34 + 1.35) on luonnoksena "ÄLÄ MERGEÄ"**: 1.34:n
   maarajat (FRA bbox −62°) rikkoisivat buildien 8–9 nostot. Ilmoita Siirtosepälle vasta, kun build 10 on TestFlightissa.
   Huom: Linssisepän MaatAineisto käyttää yhä maarajojen bbox:ia kameran sovitukseen (hänen asiansa, Siirtoseppä kertoo).
3. **Lennon pinta satelliittiin** `natiiviseppa/satelliitti` 95226a1: sarjat ämpärissä
   `julisteet/pallo/satelliitti/2026-09-24/` (bmng = topo tumma meri, bmng-bathy = sininen meri, Z0–Z7; s2 = EOX sovitettu,
   s2-alkup = muuttamaton, Z8–Z11, kattavuus s2/laatat.json laatat8). Komento: `satelliitti 2026-09-24 <bmng|bmng-bathy>
   <s2|s2-alkup>`. Oletus on yhä sileä pinta (KarttaKerrokset.SatelliittiVersio = null). **Fable: topo vs bathy -vertailukuvat
   simulaattorista hänelle ennen oletuksen valintaa.** Kuvausskripti: edellisen session scratchpad
   `bf519524-…/scratchpad/satlento.sh` (MERI=… S2=… ./satlento.sh <kansio>; ota kopio). Meren sävyä voi laimentaa
   tileset-varjostimessa (Z7→Z8-sauma, EOX:n meri tumma).
4. **Natiivi-UI `natiivi-ui/nostot-web`** (0d2c89d: attribuutiot BMNG + EOX Tietoja-näkymään; c5e02b2 E10–E11:
   NostoKerros.Lahella; f7e8dea E3): Natiivi-UI pyytää testikäännöksen iPhone 17 + iPad kuvapareja varten, sitten merge-pyyntö.
   NostoKerros.cs muuttuu myös fokuspohja-haarassa → tarkista ristiriita.
5. Ehdotus: yksi testihaara `testi/b10` = master + 1 + 2 + 3 + 4 → asennus molempiin simuihin → satelliittivertailu Fablelle
   ja Natiivi-UI:n kuvaparit samasta asennuksesta → merget → build 10 -SHA Fablelle ja Julkaisijalle.

## Muut avoimet

- Radio AVAudioEngine testattu vain macOS:llä: iPad-laitetesti (ääni-istunto, keskeytykset, reitit) kun iPad vapaa.
- Elokuvalento erä 4 (savu/vanat/sumu/kimallus/pilvivarjot) tekemättä; heijastusluotain (Filmipino.heijastus) pois kunnes
  luotaimen piirto todennettu (musta kuutio simulaattorissa).
- Varjostinten esilämmitys (Linssiseppä: ensipiirto ~19 ms) tekemättä.
- Sileän pinnan laatat latautuivat matkalla lohkoina: Pelikoodarin esilataus (build 9) + usva; tarkista buildista 9.

## Työkalut ja opit

- Scratchpad-skriptit (edellinen sessio `…/bf519524-729e-4e68-893e-ac32517a6028/scratchpad/`): b9-master.sh (merget →
  tarkista → luo → sim → xcode-sim → asennus molempiin simuihin, keskeyttää luo/sim-virheeseen), b8lento.sh (lento-video +
  kehykset), huntutesti.sh (Espanja 7000 km → z5), satlento.sh. Kopioi omaan scratchpadiin.
- **Editor-kansio ei käänny unity-tarkistuksessa**: tarkista Rakennus.cs-ristiriitojen ratkaisut käsin (aaltosulkeiden
  määrä), muuten luo kaatuu (build 8: puuttuva `}`). Tarkista aina tulokset/luo.log ja sim.log "error CS" / "Aborting".
- Unityn iOS-projekti kääntää ilman Objective-C-poikkeuksia: ei `@try` .mm-tiedostoihin.
- Käännöksen jälkeen: `git checkout Assets/Matkakirja/Materiaalit/<muuttuneet vanhat>`, uudet .mat + .metat + kohtaus
  omaan committiin; työkopio aina puhtaaksi masteriksi ennen Julkaisijan vientiä.
