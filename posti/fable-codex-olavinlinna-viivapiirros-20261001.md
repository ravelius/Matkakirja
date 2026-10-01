# Päätoimittaja → Codex: Olavinlinnan viivapiirros, kaikki osat nimettyinä (omistajan tilaus 1.10.2026)

Omistaja 1.10.2026 klo 20.2x: "Saisiko codexilta viivapiirroksen missä olisi kaikki linnan osat nimettynä"

Kohde on pelin Olavinlinna (Savonlinna), sama linna kuin Poikkileikkaus-linssin dioraamassa. Linna piirretään
nykyisessä asussaan; dioraaman 1500-luvun aikakerros koskee vain ympäristöä.

## Mitä pyydetään

1. **Viivapiirros koko linnasta saarellaan** lintuperspektiivistä (aksonometrinen tai loiva viisto), niin että kaikki
   tornit, muurit ja pihat näkyvät. Tyyli on isoisän luonnoskirja: musteviiva, kevyt varjostus viivoin, ei värejä
   (enintään yksi seepia- tai mustesävy). Ei valokuvamaisuutta, koska omistaja pyysi nimenomaan viivapiirrosta.
2. **Kaikki osat nimettyinä suomeksi** ohuin viittausviivoin: tornit, muurit, bastionit, pihat (pääkastelli ja esilinna),
   portit, sillat ja laituri sekä tärkeimmät tilat.
   - Pelin omat nimet ovat etusijalla, ja ne pitää käyttää täsmälleen näin: Kellotornin fatabuuri, Kirkkotornin kappeli,
     Linnan keittiö, Keskushalli ja väentupa, Tornin kierreportaat (tulkinta), Laituri ja kavassit, Muurinharja,
     Vartiotupa (tulkinta). Lähde: `js/dioraama/rakennukset/olavinlinna/*.js` (otsikko-kentät).
   - Muiden osien nimet tarkistetaan julkisista virallisista lähteistä (Museovirasto / Kansallismuseo, Olavinlinna).
     Älä keksi nimiä. Jos nimi ei ole varma, merkitse se kysymysmerkillä ja listaa se vastausviestiin lähteineen.
3. **Toimitusmuodot:**
   - SVG, jossa nimet ovat tekstinä (`<text>`, fontti Courier Prime tai vastaava) omassa ryhmässään
     (`<g id="nimet">`), viivat omassa ryhmässään (`<g id="piirros">`) ja viittausviivat omassa ryhmässään
   - PNG 4096 px leveä läpinäkyvällä taustalla sekä versio pergamenttipohjalla (#f3e6d0)
4. **Vastausviestiin** taulukko: nimi · mikä osa on · lähde.

## Rajat

- Vain oma piirros, ei kolmannen osapuolen kuvia jäljiteltynä. Mittasuhteet saa tarkistaa julkisista kuvista ja pelin
  dioraamasta (Senaatti-kiinteistöjen fotogrammetria, CC BY 4.0).
- Ei versionostoa eikä PR:ää: toimita haaraan `codex-olavinlinna-viivapiirros` ja kerro postikansioon tiedostolla
  `codex-fable-olavinlinna-viivapiirros-<pvm>.md`.
- Käyttöpaikasta (Poikkileikkaus-linssin selite tai linnan infokortti) Päätoimittaja päättää omistajan kanssa
  toimituksen jälkeen.
