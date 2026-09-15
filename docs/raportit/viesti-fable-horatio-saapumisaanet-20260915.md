# Horatio-saapumisäänet Eurooppaan — toimitus Fablelle 15.9.2026

## Omistajan päätös ja toimitus

Omistaja kuunteli Ateena–Sofia–Istanbul-kokeen ja pyysi ensin:
> Kokeile tehdä pelkästään isoisän äänellä. Siinä paras että generaattori tekee itse tauon

Hyväksyntä:
> Nyt hyvä. Tee kaikkiin ja vie peliin

**45/45 alkuperäistä äänitettä ovat valmiit ja varmennettu mediapalvelusta.**
42 uutta ottoa; Ateenan, Sofian ja Istanbulin kolme hyväksyttyä ottoa käytetään
tavulleen uudelleen. Ei uusia ottoja tai uudelleenkoodausta hyväksytyille piloteille.

- Data: `js/packs/saapumispuheet.js` — `SAAPUMISPUHEET[city.id]` sisältää `url`,
  `duration`, `text`, `name`, `slogan`, `sha256`, `singleTake: true`.
- Kuitit ja koko provenienssi: `docs/raportit/horatio-saapumisaanet-eurooppa-20260915.json`.
- Testi: `node --test tests/saapumispuhe-aineisto.test.mjs`.
- Horation ääni `Sz0tRTEpybtDJ9ru2kgD`, ElevenLabs v3 / stability 0.5 /
  mp3_44100_192 / ei jälkikäsittelyä.
- Puhe: `kaupunginnimi + ".\n" + nykyinen iskulause + "."`, yhdessä API-otossa.
  Ei tunnetageja, lisäsanoja, Pulu-ääntä eikä erikseen leikattua tai ajastettua
  taukoa nimen ja iskulauseen välissä.
- Pelin nykyiset nimet ja sloganit on lukittu pohjaan `ee4650fbeb7c4fe7ac0f2cd8eac1c387d8807e55`.
  `lappi` käyttää kanonista näkyvää nimeä **Rovaniemi**; `kobenhavn` **Kööpenhamina**.
- Muut maanosat, matkakirjan pitkät Horatio/Livia-puheet, kuvat ja eleet eivät muutu.

## Varmennus

Kaikki 45: HTTP 200, alkuperäisen ja uudelleen ladatun MP3:n SHA-256 täsmää,
MP3 purkautuu ilman virhettä, syötteen sanat ja ääniasetukset vastaavat tilausta.
Selaimen todellinen GET Origin=https://matkakirja.app palauttaa CORS-otsakkeen;
HEAD ei tässä palvelussa sisällä CORS-otsaketta.

Kestot 3.239–5.642 s,
yhteensä 189.544 s. Kuitin `duration` ja paikallisen
ffproben `measuredDuration` eroavat kolmessa tiedostossa noin 0,051 s
(alkuperäiset tavut täsmäävät; dekooderin viiveen käsittely). Älä leikkaa puhetta
kellon perusteella: luota soittimen luonnolliseen `ended`-tapahtumaan.

Tämä on tekninen varmennus ja tilaussyötteen tarkastus. Omistajan kuunteluhyväksyntä
koskee kolmea pilottia ja niiden toteutustavan laajennusta, ei väitettä että kaikki
42 uutta ottoa olisi erikseen kuunneltu. Aiemmat äänitteet säilyvät.

## Fablen kytkentä ja julkaisu (omistajan uusi tilaus)

15.9. työnjaon mukaan Codex toimittaa äänet ja manifestin; Fable kytkee ja julkaisee.
Tässä haarassa **ei ole vielä trailerin runtime-kytkentää eikä versionostoa**.

1. Kytke yksi `SAAPUMISPUHEET[city.id].url` saapumistrailerin nimen/iskulauseen
   näkymään. Nykyisessä main-pohjassa `js/saapumistraileri.js` ei soita tätä puhetta.
   Säilytä iskulauseen näkyvä teksti ennallaan. Älä soita vanhaa erillistä Pulu-slogania.
2. Käytä olemassa olevaa kertojan luentakytkintä, äänentasoa ja iOS:n
   WebAudio-vahvistinketjua. Taustamusiikin väistö ja paluu kuuluvat samaan elinkaareen.
   Ei ääntä, kun kertoja/luenta on pois tai muu puhe estää.
3. Yksi soitto per traileritunnus — nimen rAF- ja 50 ms varakutsut eivät saa
   käynnistää kahta puhetta. Esilataus saa olla maksuton.
4. Ohitus, kaupungin vaihto, trailerin poisto ja taustalle siirtyminen
   katkaisevat/siivoavat puheen. Hylätty autoplay tai puuttuva ääni ei jumita peliä.
   Näkymään palatessa ei myöhäistä haamupuhetta.
5. Seuraava matkakirjan luenta ei saa alkaa saapumisäänen päälle. Luonnollisessa
   kulussa odota puheen loppu; ohituksessa pysäytä se ennen jatkoa. Jos traileri
   on ääntä lyhyempi, sovita loppu niin että viimeistä sanaa ei katkaista.
6. Pulu pysyy nykyisen trailerilogiikan mukaisesti poissa; saapumispuhe ei
   käynnistä Livian puhe-eleitä tai chattia.
7. Päivitä Raamatun vanha kahden lukijan saapumislinjaus tähän omistajan päätökseen:
   isoisä lukee nimen ja nykyisen iskulauseen yhtenä ottona, luonnollinen tauko.
   Tämä korvaa vain saapumisäänen vanhan Horatio→Pulu-mallin, ei Pulun kaupunkipuheita.
8. Tee oma kytkentä-PR, versionosto, CI ja julkaisu. Ilmoita versionumero ja
   kytkentäcommit Codexille; Codex varmentaa julkaistun version.

Hyväksymiskoe: Ateena (uudelleen käytetty pilotti), Rooma, Kööpenhamina,
Rovaniemi ja pisin otto. Normaali saapuminen, mykistys, ohitus keskeltä,
nopea kaupunkivaihto, hylätty play(), mobiili/työpöytä sekä seuraavan
matkakirjaluennan odotus. Vähintään yksi oikea iOS/Safari-toisto.

