# Viesti Fablelle: Brysselin täysi kaupunkilehti (erä 2)

20.9.2026, Sonnet-sessio "Sonnet 3", haara `sonnet3-bryssel-era2` (pohja origin/v1970-prep 93265734, sisältää Ljubljanan ja Košicen).
Versiota ei nostettu, PR:ää ei avattu, Raamattuun ei koskettu, ämpäriin ei viety.

**Tulos:** `node --test tests/*.test.mjs` 3725 testiä, 3712 läpi, **0 kaatunutta**, 13 ohitettua. `tarkista-niputus`: kunnossa (429 moduulia). `tarkista-kaksoisavaimet`: ei kaksoisavaimia.

## Mitä tehtiin

`js/packs/kulttuuri-kategoriat.js`: `KULTTUURI_KATEGORIAT.bryssel` (Tampere/Bergen-mallin mukainen, `docs/moduulit/kaupunkilehti.md`), 4 sivua, 15 nostoa, 31 Commons-kuvaa:

| Sivu | Sisältö |
| --- | --- |
| `kaupunki` (etusivu) | johdanto, 3 kansikuvaa (Cinquantenaire-kaari CC0, Koekelbergin basilika, Sablonin Notre-Dame), 3 avauskuvaa (lentokuva PD, kattonäkymä, Mont des Arts -puutarha; ei herokuvia), **ennen–nyt** (Place Royale, postikortti noin 1904 PD ↔ nykykuva), Matkailijalle-opas (myyntikuva Grand-Placen Brabantin herttuoiden talo; kappale; 4 jaksoa Perille ja liikkeelle / Grand-Place / Ruoka ja juoma / Ilta 7 kuvalla; parasta 5, hyvä tietää 4, paras aika, 4 kautta, 3 linkkiä), 3 nostoa (Manneken Pis, Kuninkaanpalatsi, Mont des Arts) |
| `historia` | 4 nostoa: Grand-Placen pommitus 1695, kapina 1830 (La muette de Portici), Sennen kattaminen 1867–71 ja Anspachin bulevardit, Richmondin herttuattaren tanssiaiset 1815; minitehtävä (oikea = 1) |
| `rakennukset` | 4 nostoa: Palais de Justice, Galeries Royales Saint-Hubert, Hôtel Tassel (Horta), Atomium; minitehtävä (oikea = 3) |
| `ruoka` (Ruoka ja juoma) | 4 nostoa: praliini/Neuhaus, Brysselin vohveli, lambic ja gueuze, ranskanperunat ja frituur; minitehtävä (oikea = 2) |

`js/packs/saatiedot.js`: rivi `bryssel` (Open-Meteon ERA5-arkisto 1991–2020, lat 50,85 / lon 4,35): keskilämpö, sade, ylin/alin (työkalulla), luonnehdinta. Sään lähde on oletus (Open-Meteo ERA5), joten `lahde`-kenttää ei tarvita.
`tools/hae-saanormaalit.mjs`: pieni korjaus — yhdellä kaupungilla (`--vain bryssel`) Open-Meteo palauttaa olion eikä taulukkoa, ja työkalu kaatui "vastauksessa ? paikkaa"; nyt olio kääritään taulukoksi.

Tekstit: omin sanoin en-Wikipediasta (Wikivoyage oppaan käytännön kohtiin), 420–620 merkkiä, ei väitteitä joita artikkeli ei tue (agentit kirjasivat poikkeamat). Kuvatekstit ilman lähdeviittauksia lukijalle; `lyhyt` ≤100 merkkiä ja päättyy pisteeseen.

## Kuvat ja lisenssit (tarkistettu Commonsin extmetadatasta 20.9.2026 jälkeenpäin koko 31 kuvalle)

Kaikki ovat PD / CC0 / CC BY / CC BY-SA, tekijä luettu rajapinnasta, jokainen kuva katsottu silmin esikatseluna. Sama tiedosto ei esiinny kahdesti; Manneken Pis DSCF4467 ja Grand-Place-panoraama (jo europe-valokuvissa ja fokusvirrassa) jätettiin pois.
**Poikkeus:** `historia`-nostossa 4 (Richmondin tanssiaiset) kuva on Hillingfordin maalaus "Summoned to Waterloo" **960 px leveä** (PD; suurempaa versiota ei löytynyt) — alle 1200 px:n rajan (`tools/kirjoita-kategoriat.mjs` hylkäisi sen). Vaihda, jos haluat tiukan säännön; muut 30 kuvaa ovat ≥1200 px.
Ennen–nyt-kuvan vuosi on "noin 1904" Commonsin tiedostonimen mukaan (tekijä tuntematon, PD).

## Ääniraita ja radio

**Radio ei puutu:** `RADIOT.BEL` = VRT Radio 1 (`https://icecast.vrtcdn.be/radio1-high.mp3`) on jo mainissa Bryssel-pilotista, joten sitä ei tehty uudelleen. **Brysselin äänet** (Horatio-saapumisotto ja Livian äänitetty kupla) EIVÄT kuuluneet tähän erään: ne vaativat ElevenLabs-tuotannon ja luentakopiota/mittaraportin (`tools/apply-horatio-livia-batch.mjs`-putki, erät e1–e6), ja Macin ympäristössä ei näy äänipalvelun avainta — nimetyt poikkeukset (`AANETTOMAT`, `ILMAN_SAAPUMISOTTOA`) pysyvät ennallaan. Kanoninen matkakirjateksti on jo kirjoitettu, joten äänierä voidaan ajaa Opuksen/Fablen toimesta.

## Ei tehty (ei kuulunut lehden minimiin)

Kohdekartta, nähtävyysjutut (6), miniatyyrit, kohtaaminen, juliste/iskulause, uutislähteet — resepti kohdat 19–28; kerro jos haluat jonkin niistä seuraavaksi.

## Fablen huomioon

- Lehti on rakenteeltaan Tampereen tasoa (3 aihesivua + etusivu); Lontoon 9 aihetta ei tavoiteltu.
- `nostot-kartalla`-räikkä ei muuttunut (Bryssel ei lisää nostoja kaupungin kohdalle tässä erässä).
- Mont des Arts on sekä avauskuvana (yleisnäkymä) että nostona (eri tiedosto, Alex Sirac vs. FrDr).
