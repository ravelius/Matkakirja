# Natiivi-UI: luovutus 3.11.2026 klo 01.15 (osa E valmis ja kuitattu; E-kuvat kesken: saapumiszoomaus ei näkynyt simulla)

Edellinen: viesti-natiivi-ui-luovutus-20261102-2243.md (sen jonon kohdat 3–4 ennallaan, ks. alla). Syy: konteksti pehmeällä rajalla (28 %).
Tehtävä: PT 22.1x OMISTAJAN PYYNTÖ 21.42, suunnitelma
`/Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261102-nostot-ja-zoomaus-kaikkiin.md` (osat A, F, E).

## Tehty
- Haara **natiivi-ui/zoomaus-kaikkiin-218** (worktree `/Users/Shared/Claude/wt/proto-natiivi-ui-zoomaus-kaikkiin`, peili natiivi-backup
  `peili/proto/natiivi-ui/zoomaus-kaikkiin-218`): 9822b4807 A+F, 93ac209c8 alueet, **3cc294637 E** (PT kuittasi), **17424e357 E + skeema 1.68**.
  tarkista.sh 0 virhettä, Kartta-testit NostoSaannot 21/21.
- **E (3cc294637):** `NostoSaannot.KaupunkiPortti` (elävä taso ≥ 12, sulkeutuu 11,6:ssa). Kaupungin sisäiset (KaupunginNimi/Sade) ja
  paakartalla:false-valot (oma lista `kaupungeissa`, ei nostoselaimeen) näkyvät portin ollessa auki, Euroopassa, eikä jo kohdenostona
  (`Kohdenostot.Linkitetty`: kohdekartan kohteen nostolinkit, myös kadonneet ihmeet; NostotKartalla asettaa `NostoKerros.Kohdenostona`).
  Nähtävyydet ennallaan Kohdenostoilla (≥ 10,4). Diagnoosi `nostot tila [ISO3]` näyttää portin, siirretyt ja syyt.
- **17424e357 (KS PR 6047, osa D, skeema 1.68):** `karttavalot.viuhka: true` → ei kartalla (natiivissa ei kaupunkimerkin viuhkaa: nosto on
  kaupunkikortin nostoissa; kerro PT:lle). Paketissa viuhka-kenttä = paikat tarkistettu → 300 m:n raja pois; vanhassa paketissa ennallaan.
  `kaupungit.keskusta/alue` luettiin jo 93ac209c8:ssa samassa muodossa. Sisältö v946 (skeema 1.68, main 8eac6b364).
- Käännös linja 2: KÄÄNNETTY 17424e357 → yhteinen-iPad13 (01.03). Simulla `simctl launch` kaatui "No such process": LaunchServices osoitti
  vanhaan bundlepolkuun (launchd_sim: access(…/3CD38663…/Matkakirja3D) errno 2). Korjaus: .app talteen, uninstall + install → käynnistyi.

## AVOIN: E-kuvat (Lontoo, Rooma, Wien, Valletta → KK) eivät onnistuneet
- `peli:uusi-peli 1 lontoo` → 25 s ja 45 s kuvissa **maan näkymä + aloitusintro, ei zoomausta keskustaan** (osa F ei toteutunut tällä
  reitillä). Kuvat ja lokit: `/Users/Shared/Claude/proto-3d/lokit/nui-e-kuvat-20261103/` (l25.png, l45.png, lontoo-pieni.png, peli-loki.txt).
  Selvitä ensin: kulkeeko komennon UusiPeli aloituslennon kautta PeliOhjain.cs:1746 (`SaapumisZoomaus` → `YleisnakymastaKeskustaan`),
  vai sijoittaako se pelaajan suoraan. Tarkista myös, palauttaako `SaapumisZoomaus("lontoo")` arvon (verkko ladattu? `Manner == "europe"`?).
- Unityn Debug.Log ei näy `log show`:ssa, eikä `simctl launch --stdout=<scratchpad>` luonut tiedostoa → kokeile `--console-pty` taustalla
  tai stdout-polkua T7:llä.
- `peli:matka rooma|wien|valletta lento` → "Sinne ei ole lentoa" Lontoosta. Kuvaa kukin kaupunki omana uutena pelinä
  (`peli:uusi-peli 1 <kaupunki>`) tai käytä reittiä, jolla lento on.
- Kuvausapu: `kuvaus.py <Documents> <askeleet>` (peli:/ui:/kartta:/odota:-rivit), sama kansio. Simu: `simu-lukko.sh varaa NUI yhteinen-iPad13`,
  vuoro JU:lta (KÄÄNNÖS NYT / SIMULAATTORI NYT), lopuksi vapauta + "VAPAA" JU:lle. Uudelleenkäännös ei tarpeen, jos 17424e357 on yhä asennettu.

## SEURAAJAN JONO
1. E-kuvien este (yllä) → kuvat KK:lle (PT: ennen junaa; kopio PT:lle). Jos zoomaus ei toimi uudessa pelissä, korjaa F ensin.
2. **Saapumisen odotus (PT 23.3x, KK 23.29):** NS:n haara `natiiviseppa/esilataus-218` 2cf83b7c3: tapahtuma
   `PeliOhjain.SaapumisKarttaOdottaa(k, alkaa)` → kytke OLEMASSA OLEVA latausilmaisin (näkyy vain odotuksen ajan, ei uutta UI:ta),
   kun NS:n haara on kuitattu runkoon. Sovi rajapinta NS:n kanssa (`Laattapalvelin.ValmiiksiKaupunki`).
3. Video iPadilta (Lontoo, Bratislava, Pariisi; zoomaus, traileri, nostojen esiintulo), kun A–F samassa rungossa → KK ensin, kopio PT.
   Ennen sitä mergepyyntö NS:lle (zoomaus-kaikkiin-218) PT:n kuittauksella.
4. Vanha jono: animaatiokuvien ämpärivienti PT:n luvalla JU:n kautta; KS:n joen keskiviiva → veneiden reitti; Codexin uusi vana-otto.
