# Natiivi-UI: luovutus 2.11.2026 klo 22.43 (saapuminen kaikkiin: A, F ja alueet valmiina; E selvitetty, aloittamatta)

Edellinen: viesti-natiivi-ui-luovutus-20261102-2205.md (sen jono 1–3 ennallaan, ks. alla). Syy: konteksti pehmeällä rajalla (25 %).
Tehtävä: PT 22.1x OMISTAJAN PYYNTÖ 21.42, suunnitelma
`/Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261102-nostot-ja-zoomaus-kaikkiin.md` (osat A, F, E).

## Tehty
- Haara **natiivi-ui/zoomaus-kaikkiin-218** (pohja juna-218 9be37e4f2), worktree `/Users/Shared/Claude/wt/proto-natiivi-ui-zoomaus-kaikkiin`,
  peili natiivi-backup `peili/proto/natiivi-ui/zoomaus-kaikkiin-218`. tarkista.sh 0 virhettä, simulla ajamatta (PT: simuajo videon yhteydessä riittää).
- **9822b4807 A + F:** `PeliOhjain.Keskusta.cs` `SaapumisZoomaus(kaupunki)`: jokainen Euroopan kaupunki (verkon Manner == "europe")
  zoomaa keskustaan `PalloKierto.AjaKeskustaan` → `MinKorkeusPaikassa` (piirros tai elävän kartan lähin taso). Traileri ja nykyintro
  avoimella taustalla samalla ehdolla (Saapumistraileri.cs:147, Saapumisesitys.cs:532). F: aloituslento → yleisnäkymä (Saavu ilman
  maan laatikkoa tai välikortin alla) → `YleisnakymaS` 0,8 s → zoomaus keskustaan → aloitusintro (`YleisnakymastaKeskustaan`).
- **93ac209c8 alueet (PT 22.4x):** Alpit, Lappi, Islanti, Kreeta ja Sisilia rajataan kokonaisina (`PalloKierto.AjaAlueelle`).
  Sisältöpaketista luetaan `kaupungit.keskusta {lat, lon}` ja `kaupungit.alue {p, e, l, i}` (Sopimukset.Kaupunki, SisaltoTuonti).
  Varat ennen KS:n dataa: Pariisi 48.857, 2.351; saaret maarajojen pienimmästä renkaasta (`Saapumisrajaus.SaarenLaatikko`);
  Alpit (48,0 / 44,0 / 5,5 / 16,0) ja Lappi (70,1 / 65,6 / 20,5 / 29,7) karkeina maantieteellisinä rajoina.
- **KS:n kanssa sovittu (B):** KS lisää kentät kaupungit.jsoniin (lähde data/kaupunkikeskustat.json, PR ~22.50). Alueille `keskusta: null`
  ja `alue: {p, e, l, i}` (nostojen ja kohteiden ulkoraja + marginaali), Lappi mukaan. KS ilmoittaa SHA:n.

## SEURAAJAN JONO
1. **E (PT 22.4x: aloita heti, ei odoteta D:tä):** kaupungin sisäiset nostot omille paikoilleen kaupunkiin zoomatessa. Selvitys:
   - Karttavalot, jotka ovat 12 km:n säteellä kaupungista, piilottaa `NostoSaannot.DatanSyy` → `KaupunginSisainen` (NostoKerros.cs:479,
     portti `Portti` Paivita-silmukassa, NostoKerros.cs ~624). `paakartalla=false` (kohdekartan pisteeseen siirretyt nostot, lat/lon =
     kohdekartan piste) ohitetaan jo jäsennyksessä (NostoKerros.cs:376).
   - Kohdekartan **kohteet** (nähtävyydet) näkyvät jo `UI/Kohdenostot.cs`:n kautta lähikartalla (`Kohdenostot.Lahella`: elävä taso ≥
     ElavaTyyli.Ensimmainen − 0,6 ja Kohteet-kytkin), samassa listassa NostotKartalla.cs:926 (`Yhdessa(k.Naytettavat, kohteet)`).
     Kohteen napautus avaa nähtävyysjutun, paitsi kadonneilla (hahmotelma-…) noston → kadonneen ihmeen valoa ei saa piirtää toista kertaa.
   - Ehdotettu toteutus: NostoKerrokseen `Func<bool> KaupunkiLahella` (UI asettaa Kohdenostot.Lahella-tyyppisen portin) ja
     paakartalla=false mukaan lipulla `VainKaupungissa`. Kaupungin sisäinen tai VainKaupungissa näkyy vain portin ollessa auki ja,
     jos se on ≥ 300 m kaupungin pisteestä (paikattomat pysyvät piilossa, kunnes tulee D). Porrastus: tarinat, hetket, skandaalit ja
     kadonneet ihmeet vasta syvemmällä (esim. Ensimmainen + 1, hystereesi), nähtävyydet (Kohdenostot) jo portilla.
     Lajimerkit ja viuhka nykyisillä NostotKartalla-merkeillä (UI-POHJAT). Pariisin PiirrosKyljet/PiirrosPeitot (NostotKartalla.cs:345–364)
     koskevat vain kohdenostoja, ennallaan. Diagnoosi `nostot tila [ISO3]` (NostoKerros.Kuvaus) näyttää syyt.
   - Kuvat Lontoosta, Roomasta, Wienistä ja Vallettasta KK:lle ennen junaa (PT).
2. KS:n B-PR: tarkista, että kentät jäsentyvät (`keskusta`, `alue`); varataulut (`AlueetVara`, `KeskipisteetVara`) voi jättää varaksi.
3. Video iPadilta (Lontoo, Bratislava, Pariisi; zoomaus, traileri, nostojen esiintulo), kun A–F samassa rungossa → KK ensin, kopio PT.
   Ennen sitä mergepyyntö NS:lle (zoomaus-kaikkiin-218) PT:n kuittauksella.
4. Edellisen luovutuksen jono: animaatiokuvien ämpärivienti PT:n luvalla JU:n kautta; KS:n joen keskiviiva → veneiden reitti;
   Codexin uusi vana-otto.
