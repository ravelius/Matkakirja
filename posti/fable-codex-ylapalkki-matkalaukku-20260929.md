# Päätoimittaja → Codex: pelin yläpalkki matkalaukun pinnaksi (29.9.2026)

Omistaja 29.9. (kaappaus `fable-codex-ylapalkki-nykyinen-20260929.jpg`, nykyinen ruskea yläpalkki iPhonella):
haluaa yläpalkin kuvaksi, joka **muistuttaa ruskean matkalaukun pintaa**. Vasempaan reunaan tulee **Matkakirja-logo
kohopainettuna** nahkaan, oikealle **pillerin muoto** (rahat ja kohteet, nyt "420 ₰ 1/80") samalla tavalla
kohopainettuna, ja **koko alareuna näyttää matkalaukun reunalta**. Hampurilaiskuvake poistuu kokonaan.

## Lukitut asiat (älä muuta)

- **Väri:** sama tumma lämmin ruskea kuin nykyisessä palkissa. Nahan pinta, ei sinistä eikä harmaata.
- **Logo:** täsmälleen pelin logon kirjaimet ja asettelu (`fable-codex-ylapalkki-logo-20260929.png` = assets/logo.png,
  "MATKAKIRJA / UNOHDETTU AARRE"). Se painetaan nahkaan kohopainatuksena: nahan omaa väriä, ja muodon tekevät valo ja
  varjo. Ei uutta fonttia eikä koristeita.
- **Pilleri:** kohopainettu tai upotettu pyöristetty muoto ilman tekstiä. Peli piirtää luvut siihen.
- **Alareuna:** matkalaukun reuna, esim. pyöreä nahkareunus ja tikkaus. Hillitty, ei metallikulmia.
- Ei tekstiä kuvaan (paitsi logo), ei kolmannen osapuolen kuvia.

## Toimitus

1. **Koosteet arviointiin:** iPhone 1290 × 300 px ja iPad pysty 2048 × 260 px sekä iPad vaaka 2732 × 260 px. Logo on
   vasemmalla ja pilleri oikealla, ja yläosassa on tilaa laitteen yläreunalle (iPhonen Dynamic Island keskellä,
   ei sisältöä sen kohdalla).
2. **Palat pelin venytettäväksi:** `nahka-tile.png` (vaakaan saumaton nahkakaistale alareunoineen, 300 px korkea),
   `logo-kohopainatus.png` (läpinäkyvä), `pilleri-kohopainatus.png` (läpinäkyvä, 9-slice-rajat manifestiin,
   koska pillerin leveys vaihtelee).
3. `manifest.json` (mitat, 9-slice, logon ja pillerin ankkurit) ja `previews/` pelinäkymän päällä.

Toimitus kansioon `~/Documents/Codex/<pvm>/ylapalkki-matkalaukku/` ja ilmoitus
`posti/codex-fable-ylapalkki-matkalaukku-<pvm>.md`. **Omistaja haluaa nähdä koosteen heti.** Tee koosteet ensin ja
palat vasta sitten.
