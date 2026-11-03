# Natiivi-UI: luovutus 3.11.2026 klo 08.34 (saapumisen latausilmaisin + siirron nosto; odottaa JU:n käännösvuoroa)

Edellinen: viesti-natiivi-ui-luovutus-20261103-0723.md (kohta 1 tehty alla; kohdat 2–4 ennallaan). Syy: kontekstivahti 25 %.

## Tehty 07.23 jälkeen
- **Saapumisen latausilmaisin (omistaja 07.22/07.23):** proto-haara `natiivi-ui/saapumisilmaisin-valinta-218`
  (työpuu /Users/Shared/Claude/wt/proto-natiivi-ui-zoomaus-kaikkiin): 2d9ed2d93 → **3ff9b80e6** (pohja NS:n
  `natiiviseppa/esilataus-valinta-218` bf15af5a6, sisältää rungon 9a9515ea3). Uusi `UI/SaapumisOdotus.cs`, kytkentä UiNakymat
  (`SaapumisOdotus.Kytke(o)`), komento `ui saapumisodotus <kaupunki> [s] [arvo 0–1] | pois`.
  - NS:n rajapinta (sovittu): `PeliOhjain.SaapumisKarttaOdottaa(k, bool)`: zoomaus EI odota; true zoomauksen alussa, jos z17-lähinäkymä
    kesken, false parina (valmis / 30 s / uusi saapuminen). Palkki `Laattapalvelin.ValmiiksiEdistyminen(k)` 0–1, NaN = ei tiedossa.
  - Ilmaisin = olemassa oleva Latauspalkki + kaupungin nimi (mk-ajattelija__nimi) kartan alakeskellä, vasta 0,6 s jälkeen
    (`SaapumisOdotus.ViiveS`), pois falsella tai MatkaAlkoi. Kerros UiKerros.Tilarivi; traileri (kerros 45) peittää sen zoomauksen jälkeen.
  - Simu 2d9ed2d93 (kuvat proto-3d/lokit/nui-saapumisilmaisin-20261103/kuvat-2d9ed2d93/): nimi näkyi, PALKKI EI NÄKYNYT (ei teemaa →
    var(--tk-reunus) tyhjä) ja vaalea LCD-nimi hukkui karttaan → **3ff9b80e6**: tk-teema-paperi, ei LCD:tä eikä varjoa. EI vielä kuvattu.
- **Matkan beige (KK:n huomio videosta, PT 08.0x):** syy `Siirtokoreografia.Ennakkozoomi` min(nyt, askel) = webin "ei ulos lähikuvasta"
  → keskustan lähinäkymästä koko siirto lähikorkeudella. **fc424d7c3** (`natiivi-ui/siirron-nosto-218`, pinossa bf15af5a6 → 2d9ed2d93 →
  nosto): Ennakkozoomi(…, nosto) + `Nappula.NostoReitille = true` (false = web). Kartta-testit Siirtokoreografia 14/14, tarkista 0.
  NS kuittasi (Kartta-tiedostot hänen): ÄLÄ siirrä tätä haaraa; lisäkorjauksesta SHA NS:lle.
- NS tekee yhteisen kylmä Lontoo -videon KK:lle (haara natiiviseppa/loppubeige-218 fc424d7c3:sta + loppubeigen korjaus); NS:lle kerrottu
  3ff9b80e6 (merge tai A+B-käännös, muuten videossa näkymätön palkki).
- Kaikki peilattu natiivi-backup `peili/proto/natiivi-ui/<haara>`. Asemataulu: työlistarivi "Nostot ja saapumisen zoomaus…" päivitetty.

## Opit
- Simun "unknown to FrontBoard" käännöksen jälkeen: uninstall + install .app-kopiosta (`PROTO_APP_KOPIO`) ennen launchia (ajo2.zsh).
- Kartan päälle tuleva UI tarvitsee tk-teema-luokan (paperi), muuten var(--tk-…) on tyhjä.
- Komennot: `kuvaus.py <Documents> <askeleet>`; ui-komennot `ui:ui …`. Debug.Log-rivit eivät ole ui-loki.txt:ssä (vain komentojen vastaukset).

## SEURAAJAN JONO
1. **JU:n KÄÄNNÖS NYT -vuoro pyydetty (VS pim11 ensin).** Valmis skripti:
   `zsh /Users/Shared/Claude/proto-3d/tyokalut/simu-lukko.sh kaari NUI yhteinen-iPad13 -- zsh /Users/Shared/Claude/proto-3d/lokit/nui-saapumisilmaisin-20261103/ajo.zsh`
   (käännös 3ff9b80e6+fc424d7c3 → kaannos2.log, asennus, askeleet.txt: Rooma tavallinen | ilmaisin arvolla 0,4 | pois; Wien zoom).
   Run_in_background; lopuksi "VAPAA" JU:lle. Tarkista kuvat (palkki näkyy, nimi luettava) → kuvapari tavallinen | ilmaisin PT:lle
   (polku + 3 riviä). Jos palkki/nimi vielä huono → korjaa SaapumisOdotus.cs, uusi SHA NS:lle.
2. PT:n kuittauksen jälkeen mergepyyntö NS:lle (runkoon natiiviseppa/juna-218) yhdessä NS:n esilatauksen kanssa.
3. Video iPadilta (Lontoo, Bratislava, Pariisi), kun esilataus + ilmaisin + nosto rungossa → PT (KK PT:n kautta). NS:n yhteinen
   kylmä Lontoo -video voi kattaa osan; tarkista NS:ltä.
4. Veneet joen keskiviivaa pitkin: odottaa KS:n Seinen venereittiä (kuten 07.23-luovutuksessa kohta 3).
5. Vanha jono: animaatiokuvien ämpärivienti PT:n luvalla JU:n kautta; Codexin uusi vana-otto.
