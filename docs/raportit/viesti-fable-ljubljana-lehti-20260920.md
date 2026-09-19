# Viesti Fablelle: Ljubljanan täysi kaupunkilehti (erä 2)

20.9.2026, Sonnet-sessio "Sonnet 3", haara `sonnet3-ljubljana-era2` (pohja origin/v1970-prep 753b31f4, sisältää liuskakorjauksen).
Versiota ei nostettu, PR:ää ei avattu, Raamattuun ei koskettu, ämpäriin ei viety.

**Tulos:** `node --test tests/*.test.mjs` 3725 testiä, 3712 läpi, **0 kaatunutta**, 13 ohitettua. `tarkista-niputus` kunnossa (429 moduulia), `tarkista-kaksoisavaimet` ei kaksoisavaimia.
**Selain (Chromium, tämä haara):** Ljubljanan lehti-rivi avaa lehden (herokuvat, ennen–nyt, teksti), Turistiopas avautuu sisältöineen (Matkailijan Ljubljana), liuskassa on rivit "Ljubljana" + "Turistiopas" (ei tyhjää Nähtävyydet-riviä; kohdekartta tehdään omassa erässään).

## Sisältö (`KULTTUURI_KATEGORIAT.ljubljana`, Tampere/Bergen-malli, sama rakenne kuin Brysselissä)

| Sivu | Sisältö |
| --- | --- |
| `kaupunki` (etusivu) | johdanto; 3 kansikuvaa (Robban suihkulähde, Magistratin lasikattoinen piha, Prešerenin patsas); 3 avauskuvaa (näkymä linnalta, Nebotičnikilta, iltanäkymä; ei herokuvia); ennen–nyt: Prešernin aukio (postikortti 1925 PD ↔ nykykuva samasta suunnasta); Matkailijalle-opas (myyntikuva Ljubljanica-rantakahvilat retkiveneineen; kappale; 4 jaksoa Perille ja liikkeelle / Vanhakaupunki ja joki / Ruoka ja juoma / Ilta 6 kuvalla; parasta 5, hyvä tietää 4, paras aika, 4 kautta, 3 linkkiä: visitljubljana.com, fi.wikivoyage, lpp.si — kaikki 200); 3 nostoa: Ljubljanan linna, Lohikäärmesilta ja lohikäärme, Tivoli-puisto |
| `historia` | Emona; Primož Trubar (ensimmäiset sloveniankieliset kirjat 1550); Illyrian maakunnat 1809–13 ja Laibachin kongressi 1821; maanjäristys 1895 ja jälleenrakennus (Hribar); minitehtävä (oikea = 1, Ivan Hribar) |
| `rakennukset` ("Plečnikin ja Secessionin Ljubljana") | Tromostovje, NUK, Križanke, Miklošičeva-katu ja Nebotičnik; minitehtävä (oikea = 3, Nebotičnik) |
| `ruoka` (Ruoka ja juoma) | Kranjska klobasa (PGI 2015), potica (TSG 2021), Krainin mehiläinen ja hunaja, keskustori (Plečnik); minitehtävä (oikea = 2, PGI) |

Yhteensä 15 nostoa, 30 Commons-kuvaa; `saatiedot.js`-rivi `ljubljana` (Open-Meteon ERA5 1991–2020: keskilämpö, sade, ylin/alin työkalulla, luonnehdinta).

Tekstit omin sanoin en-Wikipediasta (Wikivoyage oppaan käytännön kohtiin, Miklošičeva-katu sl-Wikipediasta, koska en-artikkelia ei ole); agentit kirjasivat poikkeamat. Kuvatekstit ilman lähdeviittauksia lukijalle.

## Kuvat ja lisenssit

Kaikki 30 kuvaa tarkistettu jälkikäteen Commonsin extmetadatasta (lisenssi, tekijä, leveys): PD / CC0 / CC BY / CC BY-SA, kaikki ≥ 1200 px leveitä (yksikään poikkeus, ennen–nyt-postikortti 1461 px). Sama tiedosto ei esiinny kahdesti (yksi kaksoiskappale `Fruit stalls at Ljubljana Central Market 01.JPG` poistettiin oppaan Ruoka-jaksosta); europe-valokuvissa käytetyt kaksi kuvaa ja Košicen kuva jätettiin pois. Yksi kuva on pystykuva (Illyrian pylväs, historia-nosto 3); NUK-nostossa on lähikuva oven kahvasta (Pegasos), koska hyviä julkisivukuvia ei löytynyt.

## Huomioita

- Historia-noston otsikko kirjoitettiin muotoon "Ranskalaisten Illyria ja kongressi, …" (ei "Napoleonin …"): `tests/pollo.test.mjs` "kysymys, johon aineistossa ei ole vastausta, ei tuota linkkiä" kaatui, kun otsikko sisälsi sanan Napoleon (pulun haku löysi heikon osuman kysymykseen "Kuka oli Napoleon?").
- Nähtävyydet-rivi (kohdekartta) puuttuu liuskasta tarkoituksella; kohdekartat Brysselille, Ljubljanalle ja Košicelle tehdään myöhemmin omana eränä.
- Ei tehty: nähtävyysjutut, miniatyyrit, kohtaaminen, juliste, uutislähteet (resepti kohdat 19–28).
