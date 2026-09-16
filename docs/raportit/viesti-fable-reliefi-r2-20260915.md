# Reliefikuvat vaihdettu R2-osoitteisiin (15.9.2026)

Sonnet-kehitysagentti, haara `claude/bold-ride-vow4ki-reliefi-r2`.

## Tausta

Astronautin kameran topografiakuvat renderöitiin uudelleen 1′-korkeus-
datasta omistajan Macilla ja ladattiin Cloudflare R2:een. Tehtävä: vaihda
peli käyttämään uusia R2-osoitteita ja poistaa vanhat, pienemmät
tiedostot repossa — mediaa ei säilytetä repossa.

Uudet osoitteet (HEAD 200 tarkistettu ennen työtä):
- litteä reliefi: `https://media.matkakirja.app/matkakirja/linssit/topografia-20260915.webp`
  (11 643 678 tavua, 10800×4859)
- pallokuva: `https://media.matkakirja.app/matkakirja/linssit/topografia-pallo-20260915.webp`
  (786 304 tavua, 4096×2048)

## Muutokset

1. **`js/packs/linssi-topografia-kuva.js`** — `TOPOGRAFIA_KUVA.kuva` ja
   `TOPOGRAFIA_PALLOKUVA` osoittavat nyt R2:een. `leveysPx`/`korkeusPx`
   päivitetty vastaamaan uutta litteää kuvaa (10800×4859, oli 3600×1620).
   Otsikkokommentit päivitetty kertomaan, että kuva asuu R2:ssa eikä
   repossa.
2. **`js/linssit/satelliitti-avaruus.js`** — `RELIEFIN_OSOITE` osoittaa
   R2:n pallokuvaan. `RELIEFIN_LEVEYS`/`RELIEFIN_KORKEUS` (4096×2048)
   olivat jo oikein — uusi pallokuva on samaa kokoa. `crossOrigin =
   'anonymous'` oli jo paikallaan (tarvitaan, koska kuva piirretään
   canvasille tekstuuriksi; R2-ämpärissä on CORS-sääntö).
3. **`js/linssit/topografia.js`** — huomattu, ettei tehtävälistassa
   mainittu paikallinen `PALLOKUVA`-vakio (pallolaudan `pallolle()`-
   kahva) osoittanut samaan tiedostoon; päivitetty samaan R2-osoitteeseen
   ettei se rikkoutuisi kahden vakion välillä.
4. **`sw.js`** — poistettu `./assets/linssit/topografia.webp` ja
   `./assets/linssit/topografia-pallo.webp` SHELL-esilatauslistalta;
   `varuste-topografia.jpg` säilytetty. `media.matkakirja.app`-reititys
   tarkistettu (`medianIsanta`): uusi polkuetuliite
   `/matkakirja/linssit/...` ei osu olemassa olevaan kuvavälimuisti-
   ehtoon (`/^\/(kuvat|liput|kohtaamiset)\//`), joten näitä kuvia ei
   erikseen välimuistiteta SW:ssä — SAMA KÄYTÖS kuin jo pelissä olevalla
   `IHMISEN_MATKA_ESINEJUURI`-kuvajuurella (`/linssit/ihmisen-matka/...`),
   joka ei osu siihenkään. Kuvat toimivat normaalisti selaimen omasta
   HTTP-välimuistista offline-tuen puuttuessa juuri niin kuin nykyinen
   ihmisen-matka-aineisto. En laajentanut SW:n reititystä, koska mikään
   tehtävässä ei pyytänyt sitä ja precedent oli jo olemassa — Fablelle/
   omistajalle harkittavaksi, halutaanko nämä isot (11,6 Mt / 786 kt)
   kuvat myös offline-välimuistiin (silloin `MEDIAA`/kuvalähde-ehtoa
   pitäisi laajentaa `/matkakirja/`-etuliitteeseen).
5. `git rm assets/linssit/topografia.webp assets/linssit/topografia-pallo.webp`.
6. Repo-laajuinen grep ja päivitys:
   - `tests/pallolinssit.test.mjs`: testi tarkasti aiemmin paikallisen
     tiedoston olemassaolon ja koon (`existsSync`, `statSync`) — nyt
     tarkastaa R2-osoitevakion (regex, päivämäärä joustava `\d{8}`).
     Poistettu tarpeettomat `existsSync`/`statSync`-importit.
   - `tests/satelliitti-avaruus.test.mjs` ei vaatinut muutosta: se
     vertaa `RELIEFIN_OSOITE`:a `TOPOGRAFIA_PALLOKUVA`:an
     (equality-testi), ja molemmat osoittavat nyt samaan R2-osoitteeseen.
   - `docs/moduulit/karttapallo.md` ja `docs/moduulit/linssit.md`:
     polkumaininnat päivitetty R2-osoitteiksi (kuvakoko 4096×2048
     säilyi, tavumäärä päivitetty 431 kt → 768 kt).
   - `tools/build-standalone.mjs`: ei viittauksia topografiaan, ei
     muutoksia.
   - `tools/tee-reliefikartta.mjs` ja `tools/tee-pallotopografia.mjs`:
     EI muutettu — ne ovat paikallisia renderöinti/build-työkaluja,
     jotka kirjoittavat yhä paikalliseen `assets/linssit/`-polkuun
     ennen käsin tehtävää R2-latausta; tehtävä ei pyytänyt näiden
     muuttamista eikä se ollut tarpeen pelin toiminnalle.
   - `docs/raportit/*` (mm. `karttauudistus-suunnitelma-20260913.md`,
     `viesti-fable-reliefi-mac-ohje-20260915.md`) — EI muutettu:
     kertaraportteja/historiallisia ohjeviestejä, ei eläviä ohjeita.
   - `js/tyohuone-raamattu.js` — EI muutettu (Raamattu, vain Fable
     kirjoittaa).

## Testit

`NODE_USE_ENV_PROXY=1 node --test`:

- `tests/satelliitti.test.mjs`: **45/45 PASS**
- `tests/satelliitti-avaruus.test.mjs`: **34/34 PASS**
- `tests/pallolinssit.test.mjs`: **8/8 PASS**
- `tests/sw.test.mjs`: **23/23 PASS**

`node --check` puhtaana kaikille muutetuille js-tiedostoille
(`js/packs/linssi-topografia-kuva.js`, `js/linssit/satelliitti-avaruus.js`,
`js/linssit/topografia.js`, `sw.js`, `tests/pallolinssit.test.mjs`).

Koko `npm test` -sarjaa EI ajettu (tehtävän rajaus).

## Savukkeet

`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers NODE_USE_ENV_PROXY=1 node
tools/savukkeet/savuke-satelliittilinssi.mjs` (etualalla, yksi ajo,
timeout 600 s). Topografialinssille ei ole omaa savuketta
(`ls tools/savukkeet | grep -i topog` → tyhjä).

- **Työpöytä (@1400): 34/34 PASS**, kuten odotettu.
- iPad (834×1194): kaikki tarkistetut kohdat PASS.
- Puhelin (390×844): kaikki tarkistetut kohdat PASS.
- Puhelin vaaka (844×390): **1 FAIL** — "Sulje linssi palauttaa
  yläpalkin... täsmälleen": `topbarNakyvyys` jäi `"hidden"` vaikka
  linssi suljettiin. Tämä ei liity kuvaosoitteiden vaihtoon (yläpalkin
  näkyvyyslogiikkaa ei koskettu) — vaikuttaa esiolemassa olevalta
  vialta tässä katselukulmassa; ei tutkittu tarkemmin, koska rajattu
  tehtävän ulkopuolelle.
- iPad vaaka (1194×834) ja sitä myöhemmät katselukulmat: ajo jäi
  jumiin ja katkesi 600 s:n timeoutiin. Lokissa toistuvia
  `ssl_client_socket_impl.cc:902 handshake failed... net_error -202`
  -virheitä Chromiumin verkkopinosta (todennäköisesti NASA-kuva-
  ämpärin tai R2:n TLS-käsittely proxy-ympäristössä) — sivu jäi
  odottamaan verkkovastausta loputtomiin. Tämä vastaa tehtävän
  ennakkovaroitusta: "jos kuvan lataus R2:sta ei toimi Chromiumissa
  (proxy), kirjaa se raporttiin äläkä yritä kiertää." En yrittänyt
  kiertää; kirjaan tähän. Ensisijainen ja tehtävässä nimetty tarkistus
  (@1400, 34/34) läpäistiin täysin puhtaana.

## Yhteenveto

Kaikki koodimuutokset tehty, vanhat binäärit poistettu repossa, testit
ja `node --check` puhtaita, tärkein savuke (@1400) 34/34. Mahdollisia
jatkotoimia Fablelle/omistajalle: (1) harkita SW:n R2-kuvavälimuistin
laajentamista kattamaan `/matkakirja/`-etuliite, jos offline-tuki
näille isoille kuville halutaan; (2) puhelinvaaka-näkymän
topbar-näkyvyysvika (ei tähän tehtävään liittyvä); (3) Chromium/proxy
-TLS-ongelma isommissa savukeajoissa, joka esti muiden katselukulmien
loppuun asti ajamisen tässä kontissa.
