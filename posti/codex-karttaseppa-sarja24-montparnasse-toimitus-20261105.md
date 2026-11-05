# Codex → Karttaseppä: Montparnasse #2094, sarja 24 (5.11.2026)

Kahdeksan tilattua kokonaista kutsua on tehty, eikä uusia ottoja ole aloitettu. Kaikki kahdeksan tuotantokuvaa ovat muuttamattomia native RGB 1536×1024 -kuvia. **QA FAIL: diagnostinen arviointierä, ei hyväksytty Tripo-syöte.**

Toimitus: `posti/codex-karttaseppa-sarja24-montparnasse-20261105/`, commit `8d7c6401c3d6d8685e787de490afdb5863db2e2d`. Kaikki 18 tiedostoa (16 240 450 tavua) on luettu Gitistä takaisin ja SHA256-varmennettu. `SHA256SUMS`, `arkki.jpg`, lähteet, promptit, `QA.json`, `huomiot.md` ja kolme QA-kuvaa mukana. Paikallinen arkki: `/Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-sarja-20261105/_review-sarja-24/montparnasse/arkki.jpg`.

## Mitattu tulos
- Etelä / pohjoinen: 274 / 274 px, vastakkaisten leveysero 0 %. Itä / länsi: 187 / 176 px, ero 6,06 % → yli 5 %.
- Leveys/korkeus suhteessa oikean rakennuksen 62×39×210 m -mittoihin: etelä +10,35 %, pohjoinen +10,35 %, itä +19,87 %, länsi +12,82 %. Torni on liian leveä.
- Päälistan korkeus samalta maaviivalta: 816 / 816 / 814 / 816 px; vaihtelu 0,25 % → hyväksytty. Maaviivojen ero vain 1 px.
- Pyöristetyn katon suorista keskiosista arvioitu viistoproxy noin 52,5° / 56,9° (epävarmuus noin ±8°), ei kalibroitu 65° pohjamittaus. Täsmällistä 180° vastakulmaa ei voi vahvistaa lähes symmetrisestä tornista.
- Yläkuva on suoraan ylhäältä, mutta bbox (672,401)–(861,609) ei täsmää lähdejalanjälkeen (668,408)–(869,616).
- Maapohjan jalanjäljessä 898 / 19 900 nurmenväristä pikseliä (4,51 %), länsiluoteisella pitkällä reunalla. Kiveys on hieman oikealle siirtynyt. Polkunäytteet noin 9–10 m; akselisuuntainen mittaus ±2 px. Ei pystyrakenteita. Vastaanottaja liimaa vain maskin sisäosan.

Korkeus 210 m on tarkistettu operaattorilta ja Pariisin kaupungilta. Suunta tarkistettu rautatieasema/Jardin Atlantique- ja hautausmaa-maamerkeistä sekä etelälounaan valokuvasta (#2116); IGN-ortokuvaa ei oletettu pohjoisylös. `oikea.jpg`: Steven Strehl, CC BY-SA 3.0; alin jalusta on osin kaupunkikattojen peitossa, joten sisäänkäyntiä tarkastettiin erillisillä CC-valokuvilla. IGN 2018 Licence Ouverte -yläkuva toimii katon muodon lähteenä, ei rakennuskorkeuden mittauksena.

Tornin tunnistettava pyöristetty massa, tumma lasi ja helikopterikansi säilyvät. Tiheä kerrosjako on yksinkertaistettu, eikä 59 kerroksen tarkkaa lukumäärää väitetä varmennetuksi. Antennit, pienet kattoasennukset ja viereinen kauppakeskus jätetty pois.

Omistajahyväksyntä, Tripo-lupa, peliasennus ja julkaisu ovat erillisiä ja tämän erän osalta avoimia. Kuvaa ei lähetetty Tripo-sessiolle. En tee automaattista uutta kierrosta.
