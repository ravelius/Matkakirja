# PT:n luovutus 1.11.2026 klo 10.15

Edellinen: viesti-fable-luovutus-20261101-0735.md. Osoitteet: /Users/Shared/Claude/osoitekirja.md. Viestit aina send_message id:llä.
Omistaja hereillä (palasi 08.07): yölupa päättynyt. Kellonaika: `date` ennen aikaleimoja.

## OMISTAJAN PÄÄTÖKSET TÄNÄÄN (kaikki lokissa, PR:t 5829, 5830, 5832, 5833, 5834)
- 08.07 + 08.1x: nykyinen Pariisi hylätty, yön kooste-97-hyväksyntä kumottu. Pääkohteet G:n kokoon (Louvre ×1,4, Notre-Dame ×2, Sainte-Chapelle ×1,25).
- 08.5x: Codex piirtää KOKO Pariisin G:n mukaan porrastetusti (laaja → tarkemmat palat rajauksesta), saumat limittäin; merkit ja nimet
  ankkuroidaan piirroksen kohteisiin. Lukitun pohjan reitti (kooste-97, yleistetty ohjekuva, 0,5 m/px) pois.
- 09.5x: G:n alue 2×2 tarkempana (Codex fad33f1bd) = Pariisin lähin taso, "Kyllä". KK:n lisäys: sävy G:n mukaan.
- 09.4x: levytila: turhat poistoon, säilytettävä NAS:lle (/Volumes/NAS-Homes/koodaus, 5,6 Ti vapaana), epävarma NAS:lle.
  PT:n linja: Clauden agentit eivät tee pysyviä poistoja; PT kokoaa poistolistan + yksirivisen komennon omistajalle (TOIMI TARVITAAN).
- 10.1x: simulaattorien yösiivous (vain sammutetut, vain PRBPosterExtensionDataStore; 266/423 Gt T7-sarjassa).

## JUNA 216 (runko 27aba116d NS:llä; testit vihreät). Ei lukitusta eikä TF:ää ennen omistajan hyväksyntää uudesta Pariisista.
1. PARIISI (KS): laaja G-yläkuva v1 (3cf603ec3) tyyliltään hyvä, mutta keskusta eri asettelussa + pystyvenytys → v2 tilattu
   (postilaatikko 934c6ef7e: sävytetty 2×2 liitetään G-alueeseen, ääriviiva kaupunkimaskista). Kun tulee: KS:n pari + saumalähikuva
   → PT tarkistaa → KK omistajalle. Sitten välitaso (~3–4 m/px) erinä; nimiöankkurit NS:lle (NS varoitettu).
   Nykyiset 0,5 m -palat (ead9e4835/57ad0a1c4) jäävät runkoon välivaiheena. Tuileries'n palatsin nimiö jää (omistaja 31.10.).
2. VALO (VS): b5 oletuksena todennettu ja PT kuittasi pelikuvasta (d1415715d, k06z20) → NS vie runkoon (8 committia); odota NS:n sha.
3. LEIVONTA (LAV): v4 + LIMA seisoi levyrajassa 08.25–; levy nyt 96 Gi → jatkuu itsestään (leivonta-v4-odota.zsh). Jonossa kaiteeton-v6,
   muurikate-v37. Paketti: PT tarkistaa SHA → JU ämpäriin (samassa viestissä) → PK kytkee → NS runkoon.
4. REITTI (PK): tallenteen koeajo OK (3d05d3640). V4-paketin tultua aja-tallenne.zsh → video PT → KK. PK odottaa tietoa viennistä.

## LEVY
- Klo 10.14 sisäinen 96 Gi, T7 ~129 Gi. Tehty: siirra_t7 (26 Gt), siirra_lokit_t7, roolien mergetyt worktreet pois (~25 Gt).
- Kartoitus (Sonnet-agentti, vain lukeva) kirjoittaa /Users/Shared/Claude/_levy/kartoitus-20261101.md (POISTO/NAS/EPÄVARMA/PIDÄ,
  sisäinen + T7/koodaus + T7/Simulaattorit). Sen pohjalta: NAS-siirrot (PT itse, linkillä tai ilman) ja poistolista omistajalle KK:n kautta.
- JU tekee yösiivouksen (skripti → kokeilu yhdellä simulla → launchd + asennusrivi omistajalle) ja selvittää vanhan sarjan
  T7/Simulaattorit/Devices (~94 Gt, 6.10.) käytön → poistolistaan, jos ei käytössä.
- KK:n tavoite 12.19: käynnistyslevyllä ≥ 100 Gi.

## Säännöt, jotka opin
- Koepari omistajalle vain samalla rajauksella ja mittakaavalla kuin malli (G); muuten ei vertailukelpoinen.
- Monitorin uudelleenviritys: lue prev ls-remotesta, ei kovakoodattuna.
- PR:n auto-merge ei ole sallittu repossa: `gh pr merge --squash` suoraan.

## LISÄYS 10.3x
- Laaja v2 (6bd1ed940) tullut, KS kuittasi (658fa8eb1). PT päätti: laajaan EI liitetä lähitasoa (näkyi suorakulmiona); Codexin oma
  G-alue jää, zoomissa ristihäivytys lähitasoon. KS tekee omistajan parin ilman liitosta → PT → KK, sitten välitason erien suunnitelma PT:lle.
- VS: räystäskartta puhtaana haarana db48220d1 (27aba116d päällä) NS:llä; täyttöpeitto p4 tulee vastaavana haarana (PT sanoi kyllä).
- Omistaja 10.1x: "Tarkista sinä läpi koko sinulaattorien käyttötapa…" → KK tekee läpikäynnin ja suosituksen; muita simumuutoksia
  (paitsi JU:n yösiivous) EI ennen omistajan päätöstä → kartoituksen simu-osuus vain tiedoksi KK:lle, ei poistolistaan vielä.
  Työlistaan rivi lisätty (vastuu KK).
