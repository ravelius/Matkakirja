# Natiivi-UI: luovutus 5.11.2026 klo 13.50 (konteksti 35 %, kova raja)

Edellinen: viesti-natiivi-ui-luovutus-20261105-1345.md (haara natiivi-ui/luovutus-20261105-1345): sen kuvahavainnot ja kohdat 3–4 ovat voimassa, muuten tämä korvaa sen.
Proto: /Users/Shared/Claude/wt/proto-natiivi-ui-nousu-pieni, haara natiivi-ui/pariisi-lento-219, kärki 8cc0a2c68, ei committaamatonta. Vain paikallinen (ei origin-etäpäätä).
Sääntö 2.214: näkyvä Pariisin askel → Macin kuva (polku + yksi rivi) KK:lle local_d5f31591-21fa-4cb0-bab3-bcd3435d075a, kopio PT:lle. Ei selitekaistaa, ei iPadia, Mac-ajot JU:n vuorolla.

## Omistajan ja PT:n sanat, jotka odottavat
- Omistaja 13.46 (KK, kortti): Louvren ja Riemukaaren uudet kuvat kelpaavat. Järjestys: Eiffel-torni, Riemukaari, Sacré-Cœur, Notre-Dame, Louvre. Vienti vain PT:n käskystä. Työlistalla "Pariisin aloituslento: Louvre ja Riemukaari kytketään".
- PT 13.4x: 1) testikytkin uudelle pelille, 2) Pulun kultakehys: loitontuuko kartta myös pelissä, 3) raketin kyltti kameralla raketin luo: näkymätön kyltti on vika, kunnes kuva näyttää sen. Tulokset 2.214:n reittiä.
- PT 13.5x: vienti on JU:lla (media julisteet/herokoe/), kuittaus tulee sinulle. Havainnekuva-merkintä (4.47) on NUI:n: datarivi kummallekin kuvalle samassa haarassa, ja tarkista, että merkintä näkyy, kun kuva avataan. Ei SK:n vuoroa.

## Tehty 8cc0a2c68 (kääntymättä, ei nähty ajossa)
- Testikytkin `uusi-peli 5 pariisi saapuminen` (`PeliKomennot`, `PeliOhjain.UusiPeliSaapuen`). Pelaajan alku ei muutu.
- Pulun kuva: loitonnus tulee oikeassa pelissä: `ElavaKartta.Odota` ajaa maan näkymään heti, kun hiljaista, ja este puuttui. Lisätty `HiljaisuudenEste` "Pulun kuva" (`SaapumisKuvat.PulunKuvaKesken`, aikaraja: paluu + 2 s). Oletus 2 s on oma, omistajan sanaa ei ole.
- Raketti: edellisen ajon koordinaatit olivat noin 25 km sivussa. Alusta on 69.10867, 15.58883 (`Nousu.AlustaLat/Lon`).

## Seuraavaksi, järjestyksessä
1. **JU:n vuoro:** JU lupasi L1:n ("ESIKATSELU NYT L1", ei L2). Älä aja ennen sitä. Jos viesti tuli jo, tarkista list_events JU:lta (local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd). Skripti: `zsh /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/aloituslento-219/aja2.zsh` (sk-suora.txt, sk-raketti.txt, PROTO_LINJA=1, koodi 8cc0a2c68). Jos teet kohdan 2 ensin, vaihda skriptin SHA ja kerro JU:lle.
2. **Havainnekuva-merkintä, tekemättä:** suunnitelma, kääntämättä.
   - Datarivi: `SaapumisKuvat.AloituslennonLahteet` tekee puuttuvasta kuvasta `new Kuvateksti { Tiedosto = ... }` ilman tekstejä. Lisää Louvrelle ja Riemukaarelle Lyhyt, Selite ja `Lahde = "Matkakirjan havainnekuva"` (sama sanamuoto kuin Eiffelillä, js/packs/fokusvirta-pariisi.js:240). Faktat tarkistettava ennen kirjoitusta.
   - Löydös: kartan pienen kuvan suurennoksessa (`SaapumisKuvat.Suurenna`) ei ole lähderiviä millään kuvalla, joten datarivi ei yksin näy. Tarvitaan rivi suurennokseen. `Pieni`-oliolla on vain osoite: hae lähde tiedostonimellä `Avauskuvat`ista ja edellä lisätyistä riveistä; `Nostokortti.OnHavainnekuva(lahde)` kertoo merkinnän, teksti `Kieli.T("ui.nosto.havainnekuva")`.
   - Pohja: `Kuvasuurennos` käyttää luokkaa `mk-suurennos__raitahavainne` (tumma pohja), kartan päällä `mk-nosto__lahde` (muste). `.mk-traileri__kuva` ei leikkaa lapsia USS:ssä (ei overflow-riviä), joten rivi voi olla kuvan lapsi kuvan alla (4.48: teksti kuvan ulkopuolella). Jos pohja ei sovi, kysy PT:ltä (4.1), älä tee omaa.
   - Testi: skenaario ei osaa avata kuvaa. Lisää `UiKomennot`-komento (`case "nousukoe"`, rivi 1555, on malli), joka kutsuu `Suurenna`-metodia tiedostonimellä, ja kuva sk-suora-skenaarion loppuun.
3. **Kuvat:** katso itse, täysikokoisina. Lähetä KK:lle ja kopio PT:lle: viiden kuvan sarja (jos vienti ehti; muuten sano, että kolme), Pulun kuva kartalla kehyksineen, raketti, avattu kuva merkinnällä. Vaikka Mac-ajon merkit kasautuvat vasempaan yläkulmaan (ks. -1345), sano se viestissä.
4. **PT:lle vastaus:** Pulun kehys ja raketti tulosrivillä.
5. **NS:n kierto** (local_0f7f169f-2ceb-43d2-8fb4-223dda2c0870, 13.4x): natiiviseppa/pariisi-kierto-219 7e11c0b29, pohja 99035b765, ei nähty pyörivän. Valmis-kutsu laskeutumisen lopussa (4 s), kierto jatkuu 38 s trailerin alla. `KiertoHiivu()` luennan alussa ja `KiertoHiivu(lyhinTie: true)` trailerin Ohitassa on kytketty; **Saapumisesityksen Ohita kytkemättä, NUI:n tehtävä**. NS muuttaa `Saapumistraileri.Ohita`-riviä, muuten ei osu tähän haaraan. Haaroja ei ole yhdistetty.

## Huomiot
- Mac-ajoissa L2 oli 13.3x; aja.zsh ajettu, tulokset -1345:ssä. aja2.zsh ei ole ajettu kertaakaan.
- Kääntymättä: 8cc0a2c68 todistuu vasta aja2:n ajossa (`error CS` lokista, ajo kertoo).
- Louvren ja Riemukaaren kuvat ovat proto-3d/_tyo/codex/pariisi-esittelykuvat-20261105/. Viennin sijainti: koodi hakee Eiffelin kansiosta (Replace tiedostonimellä); kartan paikat ovat jo esittelypaikat-vara.json:ssa.
- Lippu SEIS (omistaja 12.17). Kyltit: Kuumailmapallo ja Olavinlinna näkyvät, raketti auki.
- Ei auki olevia ajoja.
