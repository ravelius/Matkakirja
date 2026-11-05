# Pelikoodari: luovutus 5.11.2026 klo 13.37: eunukit ja ulkoesineet kytketty, peliä ei vielä katsottu; seuraavaksi oma katselu JU:n vuorolla

Korvaa -1225:n tilan; sen kohdat 1 (linja), 2 (tehty), 3 (katsottu) ja 5 (rajoitukset) pätevät. Proto-worktree `/Users/Shared/Claude/wt/proto-pelikoodari-tarkastelu`, haara `pelikoodari/tarkastelu-219`, kärki `058f76e14` (pushattu natiivi-backupiin). Peli-testit 186/186, unity-tarkistus 0 virhettä. Ei iPad-ajoja, ei junaan mitään.

## 1. Tehty: 345cd5087 ja 058f76e14
**Eunukit edestä** (`JuoksuV4.Vapaa.cs`: `KarttaVartija`, `KarttaVartijat`):
- Kiinteä ruudukko 25 m. Ruudun osuus `EunukkiRuutuOsuus` (0,375) × `EunukkiKerroin`, ja tyhjää ruutua ei muisteta, koska osuus kasvaa matkan myötä. Malli ladataan piilossa ennakkoon 60 m:n säteellä; odottaja ei näy (`VartijaRaja` 0, omistaja 2.11. 07.09), joten luovutuksen -1225 huoli seisovista hahmoista ei toteudu.
- Kappale ottaa käytävältään (±5 m) enintään yhden: vain kahdella kaistalla, S ≥ 60 m, kappale yli 21 m. Kontakti ≥ 20 m kappaleen alusta (2,5 s:n näkyvyys myös vauhdilla 7,5 m/s); paikka X, Z siirtyy kontaktiin näkyvyyttä varten (`AlkuX`, `AlkuZ` säilyttävät ruudun paikan).
- Maailma: `VartijanPiste` ja `PaivitaPoistuvat` lukevat lattian kartalta.
- Oikealla kartalla botti (testi `EunukitOikeallaKartalla`): 3,6 lähtöä 4 minuutissa (1 652 m), ensimmäinen mediaani 93 s, ei seinän sisällä. Omistajan 12.13 "alussa todella vähän" täyttyy; säädä pelaten.

**Ulkoesineet** (`KarttaEsineet`, `JuoksuV4Maailma.Ulkoesineet.cs`: `EsineetPeliin`, `LuoUlkoesine`, `PaivitaUlkoesineet`):
- 109 paikkaa `Resources/JuoksuEsineet.json`:sta; `V4Este` lajia Vaisto, jolla on `Malli`. Este, kun kaistan linja kulkee alle 1 m:n päästä. Törmäys: `Rikko`, ehjä → rikki-malli, pöly. Rikottu pysyy rikki.
- **Reitille vasta, kun kaikki 4 mallia on ladattu** (`SokkeloEsineet`), joten ilman ämpärivientiä ei synny näkymättömiä esteitä, eikä peliin tule esineitä. Macilla ennen juoksua: `ui juoksupeli esinekoe juuri file:///Users/Shared/Claude/proto-3d/_tyo/pelikoodari/ulkoesineet-v1b/`. Ämpärivienti vasta luvalla (PK vahvistaa viittaukset).

## 2. Seuraavaksi, järjestyksessä
1. **Oma katselu Macilla:** pyydä vuoro JU:lta (ajo, sha, kesto); aja vasta "ESIKATSELU NYT" -viestin jälkeen. `ui juoksupeli vapaa 1`, esinekoe- ja ovikoe-juuret (ovien polku -1225 kohta 2), `ui juoksupeli v4`; skenaariopohja `_tyo/pelikoodari/vapaa-1/sk-a.txt`. Katso kaikki kuvat, Raamattu 9.5. Etsi erityisesti:
   - eunukin **ilmestyminen**: näkyviin kasvaa 0,4 s:ssa kappaleen päässä tai 14 m kontaktin takana. Kappale voi loppua seinään tai keskelle aukiota, joten se voi näyttää ilmestymiseltä tyhjästä (omistaja 20.10.: "mikään ei saa ilmestyä yhtäkkiä"). En ole nähnyt tätä. Jos näyttää huonolta, lähtö kulman takaa kartan avulla (suunnitelman "eunukit hakevat tiensä samalta kartalta").
   - eunukki juoksee esineen läpi, jos esine on samalla kaistalla (ei estetty).
   - esineen asento ja korkeus: `yaw` samoin kuin tarkastelussa; kehysten kiertoa ei tarkistettu.
   - -1225 kohdan 3 "ei katsottu" (kiinniotto, uupuminen, kortti, kynnysviesti, opetus) sekä tumma viiru ja puun runko kameran edessä.
2. **Sivulta tulevat eunukit:** eivät ole tehty. Raamattu 2.177 vaatii "edestä ja sivuilta". Vanha logiikka (`Puoli`, `Kattaa`) nojaa risteyksiin; kartalla kapean sivukujan tunnistus `VasenAuki`/`OikeaAuki`:sta.
3. **颐和轩:n ovi** omille portaille ja täytteet 绥寿殿, 益寿斋, 南库, 军机处, 浴德殿 (-1050 kohta 2).
4. **Rivi KK:lle,** kun taso on näytettävässä kunnossa tai tarvitset päätöksen. Yhden oven kamerakoe (D) vasta tason jälkeen.

## 3. Avoimet päätökset KK:lle tason rivin mukana
- Esineille ei ole luettelorivejä: rikkoutuessa ei huutoa eikä kuplaa, hinta `AarreRikko`. Tekstit ja äänet vaatisivat omistajan linjan; älä keksi.
- Ämpärivienti: ovet ja esineet vaativat luvan ennen kuin taso toimii muilla kuin Macilla.

## OPIT
Lue ensin, mitä pelaaja oikeasti näkee: -1225:n ruudukkoperustelu koski seisovia hahmoja, joita 2.11. jälkeen ei näy lainkaan. Ruudukko jäi silti, koska se antaa valmiin mallin ja ennakkotavan ilman uutta maailmakoodia. Testin pitää ajaa myös oikealla kartalla: avoin testikartta ei kerro kujien vaikutusta tahtiin.
