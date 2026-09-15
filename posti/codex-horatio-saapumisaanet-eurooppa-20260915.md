## 2026-09-15 — Codex: omistaja hyväksyi Horatio-saapumiset, 45 ääntä valmiina; kytke ja julkaise

**Omistajan uusi tilaus:** "Nyt hyvä. Tee kaikkiin ja vie peliin." Hän hyväksyi juuri
kolmen kaupungin (Ateena, Sofia, Istanbul) uuden kokeen, jossa **isoisä sanoo nimen
ja nykyisen iskulauseen yhtenä ottona**. Nimen ja iskulauseen välisen tauon tekee
ElevenLabs itse. Pulu ei puhu saapumisessa. Ei lisäsanoja tai tunnetageja.

Tämä koskee tätä uutta saapumiskokonaisuutta, **ei vanhan 10 äänen ilmaisupilotin
kuunteluhyväksyntää**. Matkakirjan pitkät Horatio/Livia-puheet eivät vaihdu.

### Valmis toimitus — omistajan pyytämä pelijulkaisu on sinun vaiheesi

- PR **https://github.com/ravelius/Matkakirja/pull/2535**
- Haara `codex/horatio-saapumiset-20260915`, commit `36235e3058eb2d7496779c1e6f67d444a14ea554`.
- Runtime-data `js/packs/saapumispuheet.js`: `SAAPUMISPUHEET[city.id]`.
- Manifesti tässä postilaatikossa: `posti/codex-horatio-saapumisaanet-eurooppa-20260915.json`.
  Sama sisältö PR:n `docs/raportit/horatio-saapumisaanet-eurooppa-20260915.json`.
  SHA-256 `c1ce48a71346ff72988287d716e178cd41f6db21667e583b8ace50eb93eda86d`.
- Kytkentäohjeet ja hyväksymiskokeet:
  `docs/raportit/viesti-fable-horatio-saapumisaanet-20260915.md`.

**42 uutta ääntä + 3 hyväksyttyä alkuperäistä pilottia = 45/45.** Kaikki MP3:t
R2:ssa muuttumattomissa osoitteissa. HTTP GET 200, CORS ja SHA-256-lukupalautus
sekä dekoodaus tarkistettu kaikille. Syötteet täsmäävät nykyisiin nimiin ja
iskulauseisiin. Horation Sz0tRTEpybtDJ9ru2kgD / eleven_v3 / Natural0.5 /
mp3_44100_192 / ei jälkikäsittelyä. Kestot 3,239–5,642 s.
Ateena/Sofia/Istanbul käytetään tavulleen uudelleen; ei turhaa uusintagenerointia.

Aineistotesti 4/4, kaksoisavaintarkistus ja standalone-build läpi. Ei mediaa
repoon, ei versionostoa, ei trailerin runtime- tai UI-muutoksia Codexilta.
PR:n täysi CI näkyy GitHubissa; tämä kuitti ei väitä peli-integraatiota tehdyksi.

### Pyydetty kytkentä nyt

1. Soita yksi saapumistiedosto kaupungin nimen/iskulauseen trailerissa.
2. Kertojan nykyinen luentakytkin, voimakkuus, iOS-vahvistin ja taustan väistö.
3. Ohitus/navigaatio/taustalle meno siivoaa soittimen; autoplay-virhe ei jumita.
4. Ei kaksoissoittoa rAF + varakutsu -reitillä, ei päällekkäisyyttä seuraavan
   matkakirjaluennan kanssa. Luonnollinen loppu ended-tapahtumasta, ei puheen leikkausta.
5. Päivitä Raamatun vanha kahden lukijan saapumislinjaus tähän omistajan päätökseen.
6. Kytkentä-PR, testit, versio ja julkaisu. Palauta kytkentäcommit/versionumero
   Codexille julkista readbackia ja todellista saapumisen tarkistusta varten.

En käynnistä lisää äänigenerointeja. Työnjakosi 15.9. mukaan käyttöliittymän
kytkentä, Raamattu ja julkaisu jäävät sinulle.

