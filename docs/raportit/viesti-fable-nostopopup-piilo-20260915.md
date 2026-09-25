# Nostopopupin aikana lappu ja Liiku piiloon (15.9.2026)

Omistajan päätös 15.9.2026 (Raamattu, haara `claude/bold-ride-vow4ki`,
"KARTTAUUDISTUKSEN PAATOKSET 26"): Psilorítis-kaappaus näytti
matkakirjan kutistetun lapun ("Ateena, elokuussa 1873" + kaiutin) ja
Liiku-symbolinapin jäävän kohdekortin PÄÄLLE, vaikka niiden pitäisi
piiloutua nostopopupin ajaksi ja palata sen sulkeuduttua.

## Mitä tehtiin

1. **Yhtenäinen lippu `body.nosto-popup-auki`.** Ei löytynyt yhtenäistä
   olemassa olevaa lippua, joten se lisättiin popupien omiin
   avaus/sulkukohtiin:
   - `js/fokuskohteet.js` `avaaFokuskohde` (lisää) / `suljeFokuskohde`
     (poistaa) — kattaa `.fokuskohde-popup`:n (esim. Psilorítis).
   - `js/kaupunkinosto.js` `avaaKortti` (lisää) / `suljeKaupunkipopup`
     (poistaa) — kattaa `.kaupunkipopup`:n, siis SEKÄ kaupungin ison
     popupin (Lyon-tyyppinen kaupunkikortti) ETTÄ vanhan
     turisti-info-välipopupin (samaa runkoa käyttävä `avaaKortti`).
   - **Turisti-info EI tarvinnut muutosta.** 14.9.2026 tehdyn
     linjauksen jälkeen turisti-info-merkki avaa suoraan
     `#nahtavyys-dialog`in `showModal()`-metodilla — se elää selaimen
     top layer -kerroksessa ja peittää lapun ja Liikun jo
     z-indexistä riippumatta (ks. `js/ui.js` `suurennosIsanta`-
     kommentti). Tarkistettu koodista, ei vaadi omaa lippua.

2. **CSS (`css/styles.css`, rivit ~27042–27074).**
   - Liiku: `body.nosto-popup-auki .toimintorivi .monitoimi-nappi { display: none; }`
     — sama mekanismi kuin linssien Liiku-piilossa (`body.aikajana-paalla` ym.).
   - Lappu: `body.nosto-popup-auki .fact-card { visibility: hidden; pointer-events: none; }`.
     **`display: none` EI toiminut** kutistetulle lapulle: mobiilin
     media-lohko asettaa kutistetulle lapulle
     `body[data-mode] .fact-card.pieni { display: grid; … }`, jonka
     täsmällisyys (3 luokkaa/tunnistetta) voittaa kahden luokan
     säännön lähdejärjestyksestä riippumatta — mitattu savukkeella,
     `display` jäi `grid`iksi. `visibility: hidden` ei kilpaile
     `display`-arvon kanssa, ja `pointer-events: none` varmistaa
     etteivät napautukset osu näkymättömään lappuun.

3. **Pulu-hahmo omistajan kuvassa.** Kysymyskorttien päällä näkyvä
   pulu EI ole kelluva `.pollo-nappi`, vaan Psilorítis-kortin OMA
   "Kysy pululta" -kuvake (`js/fokusnosto.js`, `css/fokusnosto.css`
   rivi 314: "VALMIIT KYSYMYKSET PULULLE"). Se kuuluu popupiin, joten
   sitä ei kosketa — omistajan ohjeen mukaisesti jätetty.

## Vartio

Lisätty `tools/savukkeet/savuke-iphone-tekstit.mjs`:ään uusi osio
(390 px ja 1400 px), joka:
- avaa fokuskohde-popupin (Ateenan maan ensimmäinen kohde, ajossa
  Thessaloniki) ja tarkistaa lipun, lapun (`visibility: hidden`) ja
  Liikun (`display: none`);
- sulkee popupin ja tarkistaa palautumisen (vastakoe);
- VASTAKOE JUURISYYLLE: avaa popupin, poistaa lipun käsin — lappu ja
  Liiku näkyvät, vaikka kortti on auki (todistaa piilon riippuvan
  juuri lipusta, ei jostain muusta säännöstä);
- toistaa saman `js/kaupunkinosto.js`:n `avaaKaupunkipopup`/
  `suljeKaupunkipopup`-parille (Ateenan omalla kaupunkikortilla, sama
  runko kuin Lyonilla).

Ajo: `NODE_USE_ENV_PROXY=1 PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers node tools/savukkeet/savuke-iphone-tekstit.mjs`
→ **55/55 vartiota läpi**.

## Muut testit

- `node --test tests/rules.test.mjs tests/dokumentit.test.mjs` — läpi.
- `node --test tests/aikajana.test.mjs tests/kortin-veto.test.mjs tests/nostokuva.test.mjs tests/pallonimet.test.mjs tests/lukijanappi.test.mjs tests/nostokortti-media.test.mjs`
  (kohdetestit, jotka viittaavat `avaaFokuskohde`/`suljeFokuskohde`/
  `kaupunkipopup`-koodiin) — kaikki 163 läpi.

## Mittaukset (390×844 ja 1400×900, Kreikassa)

Mitattu savukkeen sisällä (ks. yllä) molemmilla ruuduilla:

| Tila | Lappu (`.fact-card` visibility) | Liiku (`.monitoimi-nappi` display) |
|---|---|---|
| Fokuskohde-popup AUKI (Thessaloniki) | `hidden` | `none` |
| Fokuskohde-popup SULJETTU | palautuu (ei `hidden`) | palautuu (ei `none`) |
| VASTAKOE — popup auki, lippu poistettu käsin | näkyy (ei `hidden`) — **punainen kontrolli toimii** | näkyy (ei `none`) |
| Kaupunkipopup AUKI (Ateenan kaupunkikortti) | `hidden` | `none` |
| Kaupunkipopup SULJETTU | palautuu | palautuu |

Kuvakaappaus (390 px, Psilorítis-tyyppinen fokuskohde-popup auki
Ateenan pelitallenteessa; ks. `docs/raportit/kuvat/`):
`docs/raportit/kuvat/nostopopup-piilo-390-20260915.jpg` (~28 kt).
Kuvassa näkyy: kohdekortti auki, EI vasemman yläkulman lappua, EI
alareunan Liiku-nappia.

Turisti-infoa ei kuvattu erikseen — se on tarkistettu koodista
(`showModal`/top layer, ks. yllä) ja on koodillisesti eri mekanismi,
joka ei tarvinnut korjausta.

## Ei tehty (rajauksen mukaisesti)

- Ei versionostoa, ei mergeä, ei Raamattua.
- Ei koskettu `js/pallolauta/nostot.js`:ää tai
  `js/linssit/ihmisen-matka-esitys.js`:ää (toiset agentit).
- Pulu-hahmoa ei muutettu (kuuluu popupiin).

## PR

Haara: `claude/bold-ride-vow4ki-nostopopup-piilo` → `main`.
Otsikko: "Nostopopupin aikana Matkakirja-lappu ja Liiku piiloon".
