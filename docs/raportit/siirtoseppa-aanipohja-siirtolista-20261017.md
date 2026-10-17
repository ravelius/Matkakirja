# Äänipohjan siirtolista valmis (Siirtoseppä 17.10.2026 klo 03.1x)

Haara **siirtoseppa/siirto-198-1** proto-repossa (worktree /Users/Shared/Claude/wt/proto-siirtoseppa-aanipohja), kärki **0bfc62868**,
pohjana äänivahti fdfb5f6dd. Linssit-testit 1935/1935, unity-tarkistus 0, tyokalut/tarkista.sh 0. Siirtolista 32 → 0.

## Mitä tehtiin

- Kaikki linssien, pelien ja kartan omat AudioSourcet luodaan nyt äänipohjan kautta (AaniPohja.Lahde / SeikkailuKuulija.Pohja /
  ElavaAaniPankki.UusiLahde / AaniPohja.VanhaLahde). Uutta lähdettä pohjan ohi ei voi lisätä (AanipohjaTestit kaatuu).
- Pohjan apurit (AanipohjaVahti.Pohja, perustelu koodissa): SaumatonSilmukka (kaksoset peilaavat ohjauslähdettä), AaniKaappaus
  (tahdistusmerkki), ydinäänet Aanisoitin, Puhe ja UI/Aanet (ryhmätasolla, Katkaisija hoitaa) sekä PeliKomennot ("aani sini" -kontrolli).
  Ydinäänet ja testisini olivat oletukseni PT:n kysymykseen; PT voi kumota (rivit takaisin listalle).

## Tasot

Tavoite oli, ettei mikään taso muutu. Kolme tapaa sen mukaan, miten vanha koodi laski tason:

1. **Mikseri pohjaan** (LuentaSoitin, EsityksenAani, SeikkailuLoppumusiikki, SeikkailuSade, VeneAanet, SeikkailuTyrmaAanet,
   IhmisenMatka2Maisema, RadioAanet, SeikkailuHistoria, Kappeli, Kupoli, seikkailun 3D-lähteet, Shakki): koodi antaa vain oman tasonsa,
   pohja kertoo saman Kerroin(ryhmä, tunnus) kuin vanha koodi. Puhe-ryhmän perustaso 0,9 kumotaan Tasossa, kun vanha taso oli 1,0.
2. **OmaKerroin** (ElavaAaniPankki, ElavaKaupunki, KaupunkiAanimaisemaSoitin, PalloKori, Paljastus, Avaruuskävely, Pallokisa,
   DioraamaAanet, PalloAanimaisemaSoitin): kutsuja laskee tason mikserin ja väistön kanssa kuten ennen, pohja ei kerro uudelleen.
3. **VanhaLahde + AsetaTaso/LueTaso** (OpasSovitin, RakettiAanet, Ajattelijat, PuluRealtime): koodi käsittelee AudioSourcea suoraan
   (PlayScheduled, timeSamples, PlayOneShot), volume-sijoitukset korvattu AsetaTaso-kutsuilla.

Uutta (tarkoituksella, aanipohja.md:n mukaan): Äänimaisema-kytkin mykistää nyt myös lähteet, jotka eivät sitä ennen kysyneet
(esim. loppumusiikki, laivat, radio, shakki), ja puhe-ryhmän lähteet seuraavat Kertoja-kytkintä. Pohjan väistö (Puhe soi) on päällä
lähteissä, joissa koodi ei jo väistä samaa puhetta (esim. sade, laivat, radio, aarremusiikki, seikkailun tehosteet ja askeleet);
OmaKerroin- ja VanhaLahde-lähteissä se on pois. Loppumusiikki väistää lisäksi linnan puhetta kuten ennen.

## Pohjaan lisätty (Linssit/Unity/AaniPohja.cs)

- `PohjaLahde.OmaKerroin`, `AaniPohja.VanhaLahde`, `AsetaTaso`, `LueTaso` (siirtymävaihe).
- `PohjaLahde.Tauko/Jatka`: näkymän vaihdossa pohjan silmukat pausella ja jatkavat kartalla (kuten vanhat NakymanHaivyttimessä);
  ilman tätä siirretyt silmukat olisivat jääneet hiljaisiksi.
- Uusi klippi peruu kesken olevan pysäytyshäivytyksen (vanha koodi voi soittaa Playllä heti näkymän vaihdon jälkeen).
- docs/moduulit/aanipohja.md (PT:n PR #4727) ei vielä kerro näistä; PT päättää lisäyksestä.

## Mitä puuttuu

- **Laitemittaus**: kaikki on tarkistettu kääntäjällä ja testeillä, ei vielä laitteella. Ehdotan yhtä simuajoa, jossa 100 ms:n
  verhokäyrä ennen (fdfb5f6dd) ja jälkeen (0bfc62868): Olavinlinnan seikkailu (sade, askeleet, repliikit, tyrmä), pallon kaupunki
  (Tukholma: kerrokset, laivat, lokit), radio, raketti + kupoli, museo (verrokki). Tarvitsee Julkaisijan KÄÄNNÖS NYT + SIMU NYT.
- NS ei saa yhdistää haaraa junaan ennen PT:n kuittausta mittauksesta.
