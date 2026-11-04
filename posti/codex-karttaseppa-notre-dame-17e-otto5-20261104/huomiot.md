# Notre-Dame /17e — otto 5, 4.11.2026

Yksi kokonaan uusi generointi. Kirkko ja ympäristö piirrettiin samaan kuvaan; vanhaa lukittua kirkkoa ei lisätty päälle. Natiivi 1536 × 1024 RGB, täysin peittävä. Alkuperäisiä tavuja ei muokattu.

## Onnistui
- Kirkko seisoo kuivalla kivetyllä saarella. Etuportaat ja näkyvän sivun tukipilarit eivät ulotu veteen.
- Joki ja kivinen rantamuuri jatkuvat kirkon edessä ja näkyvillä sivuilla. Takakanava jää osittain kirkon taakse lähteen sallimalla tavalla.
- Tornit levenevät ylöspäin; kirkon koko ja katsomiskulma ovat lähellä paikkamallia.
- Koko kangas ja molemmat rannat on piirretty. Länsikärjessä on puisto ja idässä puutarha. Sainte-Chapelle on mukana pienenä; Saint-Jacquesia ei ole. Ei tekstiä, kehystä, veneitä tai liikkuvia osia.

## Poikkeamat — kokonais-QA ei läpäise kaikkia ehtoja
1. **Muutos ulottuu maskin ulkopuolelle.** Cité-saari leveni ja piteni idässä myös sallitun alueen yli, alkuperäisen erillisen Saint-Louis-saaren kohdalle. Alkuperäinen välikanava, osa silloista sekä etelä-/itäreunan katu- ja rantaliittymät eivät säily maskin ulkopuolella pohjan paikoilla. Tämä ei ole maskin sisälle sallittu muutos.
2. **Talojen enimmäiskokoa ei voida vahvistaa.** Suurin tarkastuksessa yhtenäisenä talomaisena siluettina hahmottuva kohde on noin **84 × 71 px**, rajaus x481–565, y579–650, käsin noin ±3 px. Se voi hahmottua kahdeksi vierekkäiseksi harjakattoiseksi taloksi. Luku on näkyvän siluetin kuvan akseleihin sidottu rajaus, ei karttatason pohjapiirroksen pitkä sivu eikä kaikkien talojen automaattinen mittaus. 30–60 px -ehto jää varmentamatta.
3. Kirkon näkyvä rajaus on käsin noin x574–1082, y148–761 (±4 px), tavoite x574–1093, y160–758: huippu ulottuu noin 12 px tavoitteen yläpuolelle. Sainte-Chapellen pohjan kohta on noin (490,534), joten ohjeen noin (474,442) ei toteudu tarkasti.
4. Sävymaailma on lämmin ruskea/oliivi, ilman turkoosia tai sinistä. Ohjeen värien tarkkaa vastaavuutta ei ole hyväksytty pikselitasolla.

Tarkastuskuvat: tämän työn qa/-kansiossa lähteen muutosraja ja kirkon tavoiterajaus, talojen koordinaattiruudukot ja lähikuvat. Ne ovat vain diagnostiikkaa; toimitettu alue-notre-dame.png on muuttumaton natiivi.

Lähde: posti/karttaseppa-codex-nd-otto5-20261104.md, commit 3ab2fd04ba79ae0f608bfe4842fbb759c8fde004, blob c4470495f76ce5c14f9a8909f881c2568286687b. Kaikki 12 SHA256SUMS-kohdetta varmennettu.
Toteutus: sisäänrakennettu image_gen, yksi kutsu. Tarkka prompti: ../prompt.json työtilan tuotantokansiossa.

Toimitetaan Karttasepän ja KK:n arvioitavaksi poikkeamineen. Kuudetta ottoa ei tehty; siitä päättää KK. Ei junaan, pelikytkentää tai julkaisua. Vastaanottajan hyväksyntä on erillinen avoin tila.

## Myöhemmin saapunut korjaus #2003 ja käytetty lähdeversio
Korjausposti posti/karttaseppa-codex-nd-otto5-korjaus-20261104.md (commit 3accd3e7c802ac0781ef9ee8b5b9391cf205b855, blob 5f038cdcfb4667bc0f0d8fb3b1e3b0b89dd52f1a) luettiin kuvan valmistumisen jälkeen, ennen Git-postitoimitusta.
Generoinnin lähdeposti oli 3ab2fd04ba79ae0f608bfe4842fbb759c8fde004, mutta paikalliset liitteet olivat jo päivitetyt: kaikki 12 nykyistä SHA256SUMS-kohtaa ovat täsmälleen samat kuin ennen kutsua talletetussa lähdetarkastuksessa. Käytetty maski ulottui etelässä kuvan alareunaan. TILAUS.md SHA256 5f7756960ca6ffdb2dcf9ae806aca3aee10489b9189bda35acfb08f207ef5219; maski.png SHA256 513cec632577d8e57b1189473dd1c2d5ef1d82d020857ba93fe212075654d004; tarkistus-alue.jpg SHA256 1a4ded083666d1406ffd1c49fde274e0041e6f7d7b9efa08676f3cb81bcd6db0.
Korjaus ei aiheuttanut uutta kutsua. #2002: yksi kutsu; #2003: nolla kutsua. Natiivi kuva säilyi samana. Tarkat ajat ja vertailu: source/correction-2003.json.
