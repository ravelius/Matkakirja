# Natiiviseppä → Codex: Olavinlinna jatkuu, palatsin (huoneet 6–7) lopullinen geometria (PT 26.10.2026 klo 21.1x)

OMISTAJAN PÄÄTÖS 26.10. klo 21.09 (KK:n ja PT:n kautta, sanatarkasti): "Jos kodeksilla ei ole hommia, niin sille voi antaa Olavin
linnasta uusia tehtäviä niin paljon kuin mahdollista." Tauko (19.10. 17.05, `paatoimittaja-codex-olavinlinna-tauolle-20261019.md`)
purkautuu sinun osaltasi. **Järjestys: Pelikoodarin juoksupelitilaukset ensin**, Olavinlinna täytteenä, kun juoksupelistä ei ole
avointa työtä.

**Tilaus = jäädytetyn tilauksen e203239d0 jatko** (`paatoimittaja-codex-olavinlinna-6-10-geometria-20261019.md`), tässä vaiheessa
**vain ensimmäinen osa: palatsi (huoneet 6–7)**. Muut osat (kappeli-kävely, kirkkotorni-portaat, muurikäytävä, tyrmä E101) tilataan
vasta, kun PT on kuitannut palatsin.

- Lähtöaineisto: `/Users/Shared/Claude/proto-3d/_valmiit/olavinlinna-asettelu-6-10-v1/` — lue ensin `OHJE-CODEXILLE.md`; tähän osaan
  `asettelu-palatsi.glb` (logiikkamerkit omina solmuinaan), palatsin pohja- ja pystyleikkaukset, `asettelu.json`, `SHA256SUMS`.
  Jos tallensit tauon alkaessa keskeneräisen tilan, jatka siitä.
- Sisältö: seinät, holvit, portaat, ovet ja kiinteät rakenteet.
- **Sama koordinaatisto ilman siirtoa** (glTF x itä, y ylös, z etelä, metri, linnan origo), jotta merkit osuvat paikoilleen.
- Kulkualue ei kavennu; ovien aukot vähintään merkin kokoisia; reitit, partiot, piilot ja kamerat säilyvät. Mitat ja merkit ovat
  sitovia; huonejako on oletus.
- Aitous: **aito vuoden 1499 Olavinlinna** (Raamattu: Olavinlinna oikeana): luonnonkivi, kalkkilaasti ja -rappaus, puupalkit; ei
  myöhempiä ikkunoita eikä nykyvärejä. Tulkintaa saa olla vain siinä, mitä lähteet eivät kerro (merkitse LUEMINUT-tiedostoon, mikä on
  lähteestä ja mikä tulkintaa). Ulkokuori v25 on mittojen tausta.
- Toimitusmuoto: `docs/moduulit/tuotantopohjat/codex-3d-toimitus.md`; aja `node tools/codex-3d-tarkistus.mjs <kansio>` ennen
  toimitusta (paluuarvo 0). Tavoitekuva (havainnekuva) palatsista mukaan, merkintä "Havainnekuva. Tekoälyllä tuotettu, ei valokuva."
  tiedostonimeen ja metatietoon, ei kuvan päälle.
- Kuvat pysyvällä luvalla (7.15), **enintään 1 otto per kuva**.
- Toimitus: `posti/olavinlinna-palatsi-geometria-20261026/` + SHA256SUMS; vastaus
  `posti/natiiviseppa-codex-olavinlinna-palatsi-geometria-toimitus-20261026.md`. PT tarkistaa palatsin, Lavastaja kokoaa sen ja
  CC0-esineet kohtaukseksi. Ei main-mergeä, versionnostoa eikä julkaisua.
