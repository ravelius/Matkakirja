# Pelikoodari: luovutus 29.10.2026 klo 08.58

Seuraava Pelikoodari jatkaa tästä. Muisti: pelikoodari-tila-20261018-aamu.md (UUSIN). Edellinen luovutus -20261029-0813 (PR 5547/5548).

## Valmista
- DRONE e (proto pelikoodari/drone-214 d4a91813d), dronen alku (omistaja 07.57):
  - Avauksessa katseen jousi on 0,3 s ja kääntö enintään 90 °/s (DroneNosto.AvausKaantoMax). Ennen kurkistuksen sisään ja ulos -käännöt
    menivät ~90° alle 0,5 s:ssa.
  - Kapea kuja alle 3,6 m, jonka muurit ovat vähintään 3 m, lasketaan nyt muurikujaksi. Tason 1 lähtökujalla seinät ovat 3,3–3,8 m,
    joten 4 metrin raja ei täyttynyt. Siksi kulma oli 45° ja kamera 5 m:ssä 12 s.
  - Kameraväli-rivillä on kääntö °/s ja muurit v/o.
- DRONE f (44b1e8c32 = e + loppu): d ei tehonnut. Ajossa todistus-drone214d-8e36fbac5-20261029-0823 portilla t-portti-120 korkeus nousi
  2,2 → 14 m 2 s:ssa. Syy: sokkelon reitti jatkuu vasta risteyksessä (suoraan v0 z444), ja portti on risteyksen takana, joten ennakko
  näki sen ~1 s ennen. Nyt JuoksuV4Saanto.PisteetEdessa antaa reitin loputtua risteyksen avoimet ehdokaskujat, ja räystäs- ja
  korkeustarpeen ennakko käy ne kaikki läpi. Testi EnnakkoRisteyksenYli. Peli 763/763, unity 0.
- RIKOTUT ESINEET (omistaja 08.21/08.23, vain rikotut):
  - Esineitä on 14: 12 väistöä (RikkoMallit), lautaspöytä ja kääretaulu. Muistokuva puuttuu cloisonne- ja kaaretaulu-esineiltä.
  - Codex-tilaus 2c7c71eda (posti/pelikoodari-codex-rikotut-esinekuvat-tilaus-20261029.md): A on 14 png:tä ilman taustaa pelin
    ehjistä malleista, B on 2 muistokuvaa. Vastaanotto on PK:lla, ja kuvat menevät Resources-polkuun JuoksuV4/rikotut/<id>.
  - Logiikka on haarassa pelikoodari/rikotut-214 bd3c93c3c (wt/proto-pelikoodari-rikotut-214, juna-214 72952b7fe:n päällä):
    JuoksuV4Saanto.RikotutEsineet → JuoksuTulos.RikotutEsineet (esine, kpl), lokissa rikotut [id kpl]. Peli 761/761, unity 0.
  - NUI:lle on kerrottu (galleria-lasi + mk-nosto, avaus loppukortin Kokoelma-napista). SK kirjoittaa avaimet .historia
    (2–3 virkettä) sekä rikotut.otsikko ja .kpl tiedostoon /Users/Shared/Claude/proto-3d/_tyo/sisaltokirjuri/rikotut-historia-20261029.json
    → TEHTY 543a4fa0a: 17 avainta tekstit.fi.json:issa (kellon fakta PT:n korjauksella), JuoksuEsine.Historia ja
    JuoksuEsineet.RikotutOtsikko/RikotutKpl luetaan, Peli 761/761, unity 0. NUI:lle kerrottu.

- DRONE e AJETTU (lokit/todistus-drone214e-d4a91813d-20261029-0833): kääntö enintään 88 °/s (ennen ~200) OK. Lähtökujalla väli
  3,3–4,3 m, joten kujakamera syttyi ja sammui ja korkeus heilui 2,7–5,0 m → DRONE g 5e926cd11 (= f + KapeaKujaM 3,6 → 4,6).
- PARI pk2|pk7v64 AJETTU (lokit/todistus-pk7v64-cd7cbbdcb-20261029-0818, Sonnet): rata puhdas (aukko ja kuja keskeltä,
  0 kompastusta/kiinniottoa, piiloruutuja 24 → 7). Video-s 24,0–25,2 kujan lattiassa marmori ja katukivetys päällekkäin, välkkyy
  (LR:n v64-malli, PT:lle 08.55). Videossa peliä vain 6 s (18,7 s kansikuvaa). Kuvat:
  /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/kuja05-pk6-20261029/pari-v64-kuvat/.

## Odottaa
- JU: drone g (kaanna|aja-drone214g-5e926cd11.zsh; f korvattu, ellei f jo simussa). Tarkista lokista: alku t 8–20 kuja ~1,00
  tasaisesti ja korkeus ilman 2,7↔5 m -heiluntaa; loppu t-portti-120 t ≈ 70–77, korkeuden nousu ≤ 2,5 m/s ja rnosto > 0 jo
  t ≈ 70. Sitten Sonnet tarkistaa videon → PT → KK → juna 214 omana eränä (vain kamera).
- JU: pari pk7v64b (kuja05-pk6-20261029/aja-pk7v64b-cd7cbbdcb.zsh, 45 s) → Sonnet → PT (KK:lle ei viestitä suoraan). Lattiavika
  odottaa PT:n/LR:n päätöstä. Kun KK kuittaa → ilmoita suoraan JU:lle (local_2a7d6c96), joka vie cd7cbbdcb NS:lle junaan 214.
- Codexin esinekuvat → peliin (JuoksuV4/rikotut/<id>.png, rikotut-214) ja NUI:n näkymä rikotut-214:n päälle.

## Jatko keskeytyksestä
- Taustaajoja ei ole. Worktreet: wt/proto-pelikoodari-kaapu-213 (drone-214, puhdas), wt/proto-pelikoodari-rikotut-214 (puhdas),
  wt/proto-pelikoodari-pk7-214 (puhdas).

## LISÄYS 09.05
- rikotut-214 16e04df4b: UI-tekstit ovat NUI:n ui.fi.json:issa (ui.juoksupeli.rikotut.otsikko, .nimi-kpl), joten juoksupeli.rikotut.*
  poistettiin. JuoksuEsine.HistoriaTaiTeksti on lisätty. Peli 761/761, unity 0. NUI:n näkymä on haarassa natiivi-ui/rikotut-214 (c2cb0af2c,
  yhteenveto aukeaa ennen loppukorttia); NUI:ta pyydetty rebasettamaan 16e04df4b:n päälle.
- PT 09.0x: lattian z-fighting LR:lle (v64 → v65). Koordinaatit on lähetetty LR:lle: p-kujaportti S-N, s 23,7–31, pelin kehyksessä
  (239,6; −804,5). Nippu junaan vasta v65:n ja pidemmän parin jälkeen. Drone g OK JU:lle (PT).
- Viestiraja täynnä → muut viestit varakanavalla mcp__ccd_session_mgmt__send_message.
