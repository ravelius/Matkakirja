# Natiivi-UI: luovutus 2.11.2026 klo 15.37 (yhteiskäännös todistettu, B a–e tehty)

Edellinen: viesti-natiivi-ui-luovutus-20261102-1505.md (PR 6001). Syy: konteksti pehmeällä rajalla (Raamattu 7.37).

## Tehty (proto-git)
- **Yhteiskäännös ca51acb76** (liiku-palautus-218 + omistaja-1437-218 + saapuminen-keskustaan-218), asennettu F7513985 15.09.
  Todistusajot (iPad 11 simu, kaikki OK, poikkeukset 0):
  - palautus-1437 ennen e61f72c0b / jälkeen: proto-3d/lokit/todistus-palautus1437-{ennen-e61f72c0b-20261102-1520,jalkeen-ca51acb76-20261102-1513}
    → Liiku vanha tekstiasu ✓, käytyjen hehku pois ✓.
  - saapuminen (regex korjattu "saapui pariisi"): todistus-saapuminen2-{ennen-e61f72c0b-20261102-1531,jalkeen-ca51acb76-20261102-1528}
    → zoomaus FRA 1,1 km (48,857, 2,351), "zoomaus keskustaan valmis … traileri vasta nyt" ennen ensimmäistä Saapumistraileria ✓;
    video saapuminen.mp4 (traileri ja introkuvat kevyesti himmennetyn kartan päällä). Ennen-ajossa traileri heti.
  - iPad-logo (aloituslogo-1437.txt, 0,5 ja 1,2 s): simun uudelleenkäynnistys näyttää heti valikon → logoa EI saatu kuvaan, ei testattu.
  - Parit: proto-3d/lokit/parit-natiivi-ui-218-20261102/ (parit.py scratchpadissa: ennen | jälkeen).
  - PT:lle viesti 15.3x (parit + video, kysytty kuittaus → mergepyynnöt NS:lle Liiku ensin). JU:lle VUORO VAPAA.
- **B a–e** haarassa natiivi-ui/piirros-nostot-218 **c94645ac3** (wt/proto-natiivi-ui-piirros-nostot), tarkista.sh 0 virhettä, EI simutestattu:
  a) Kohdenostot.Kuvapisteet lukee piirros-<kaupunki>.json; Ruudulla: Lat = OmaLat + (kuva − OmaLat) × PiirrosKerros.Nakyvyys;
     kaksoset (SamaPaikkaM) näkyvät vain kun Nakyvyys > 0,5. Kohdenostot.Ratkaisu(id).
  b) NostotKartalla.Hae: kohdeKyltti = kohdenosto && PiirrosTila → kyltti, ruutu MiniRuutu, oma symboli Hidden.
  c) AsetaLajimerkki: Symboli(s, omaPiirros:false) kehyksessä mk-nosto-merkki__tahti, --kadonnut-padding; kadonneilla ★.
  d) Yhdessa: piirroksella laji ≠ rakennus/aukio/luonto vasta kyltinMittakaava ≥ PorrasMittakaava 0,6 (laskenta siirretty ennen Yhdessa).
  e) KyltinKylki: ratkaisu "kyltti" → "ala2" (NimionLaatikko: alaPv + h + 3); PiirrosKyljet Orsay-pari ja Halles poistettu.
  Pariisin lajit (maakartat.js): rakennus, aukio, luonto, henkilo, esine, taide, ilmio; Kuvamerkit-taulussa ei näitä → merkki tulee
  kategoriasta tai minimerkistä (tarkista kuvasta, voi olla pelkkä piste).

## SEURAAJAN JONO
1. **PT:n kuittaus** saapumis- ja palautusparista → mergepyynnöt NS:lle: ensin natiivi-ui/liiku-palautus-218 (47067b095), sitten
   omistaja-1437-218 (eb9ad99fc) ja saapuminen-keskustaan-218 (58f0974db). Jos PT haluaa logon todisteen: oikea iPad tai simulla
   kylmäkäynnistys (sovellus poistettu muistista) heti kuvaan.
2. **B kuvapari**: käännösvuoro JU:lta (EI pienen iPadin käännökseen), haara piirros-nostot-218 c94645ac3 runkoon 3a22dbaf2+;
   skenaario proto-3d/tyokalut/natiivi-ui-ajot/piirros-nostot-b.txt (kaukaa / lähellä / Halles, `ui kohdenostot` lokiin: lajimerkki-
   tyyppi näkyy). Ennen = runko. Tarkista: 38/38 kohdetta piirroksella, ★-kyltit Orsayn museon alla, porrastus. Kuvapari PT:lle → omistajalle.
3. PELIT-välilehden 4 Codex-minikuvaa (tilaus f670c1140, ei toimitettu 15.37): menevät B:n edelle, kun tulevat.

Worktreet: wt/proto-natiivi-ui-saapuminen, wt/proto-natiivi-ui-piirros-nostot, wt/proto-natiivi-ui-1437, wt/proto-natiivi-ui-liiku-palautus,
wt/proto-natiivi-ui-kiinni (mergetty, poistettavissa).
