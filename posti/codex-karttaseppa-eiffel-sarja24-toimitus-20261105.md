# Codex → Karttaseppä / KK: Eiffel, sarja 24 – yksi kierros arvioitavaksi (5.11.2026)

**Toimitus on tarkistettu tavutasolla, mutta kuvasarja ei läpäise geometrian QA:ta. Ei vielä Tripo-syötteeksi.**

Tehtävä #2091, korjattu tilaus 25404bcf9e7fe1baa9cb81343c18dc1555f79814 ja Keskustelukanavan Eiffel-ensin-rajaus. Tehtiin seitsemän rakennuskuvaa ja yksi maapohja: yhteensä 8 kutsua, yksi per näkymä, ei uusintoja. Kaikki tuotanto-PNG:t ovat muuttamattomia natiiveja 1536 × 1024 RGB.

- Jaettu arviointikansio: /Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-sarja-20261105/_review-sarja-24/eiffel/
- Postitoimitus: posti/codex-karttaseppa-eiffel-sarja24-20261105/
- Commit: 88b81f1a5c75844d2bd29a168c3ef1adaab5f381
- 17 tiedostoa, 19 027 177 tavua. SHA256SUMS sekä jokaisen Git-blobin SHA256-lukukuittaus varmennettu.
- Mukana 8 PNG:tä, Commons-valokuva oikea.jpg lähde- ja lisenssitietoineen, QA.json, huomiot.md, PROMPTS.json ja kolme QA-vertailukuvaa.

## Korjausta tai päätöstä vaativat kohdat
1. Viistokuvat jäävät pyydettyä 60–75 asteen korkeaa kuvakulmaa matalammiksi ja niiden kulmat eroavat toisistaan.
2. Yläkuvan jalanjälki on liian suuri ja siirtynyt. Tasanteet ovat noin 45 astetta väärässä kierrossa suhteessa jalkojen neliöön.
3. Maapohjan kiveys ei kata koko lähteen jalanjälkeä. Maskin ulkopuoliset pikselit myös muuttuivat: natiivikuvaa ei saa käyttää kokonaisena kartan korvaamiseen. Lähteen mukainen maskin sisäosan koostaminen kuuluu vastaanottajalle.
4. Ristikon pienet yksityiskohdat vaihtelevat näkymien välillä. Vaakajulkisivujen mittakaava ja maaviiva ovat visuaalisesti yhtenäiset, mutta tarkkaa yhteistä 3D-geometriaa ei ole varmennettu.

Huomiot ja mittausmenetelmät ovat QA.json:ssa; sininen/punainen jalanjälkivertailu näyttää kiveyksen poikkeaman. Muodon vertailu tehtiin aidosta CC BY-SA 3.0 -valokuvasta, jonka alkuperäiset tavut varmennettiin.

**Pysähdyn Eiffelin tähän arviointitoimitukseen lähdeohjeen mukaisesti. Seuraavasta otosta päättää KK.** Muita seitsemää sarja 24:n kohdetta ei aloitettu. Ei suoraa Tripo-kuvatoimitusta, R2-latausta, runtime-kytkentää tai pelijulkaisua. Omistajan ja vastaanottajan hyväksyntä ovat avoinna.

Louvre 21g:n omistajahyväksyntä on luettu; sen kuvatyö on valmis, eikä siitä tehdä uutta ottoa. Tripo on erikseen kuitannut 21h-mallityön alkaneeksi.
