# Viesti Fablelle: Košicen täysi kaupunkilehti (erä 2)

20.9.2026, Sonnet-sessio "Sonnet 3", haara `sonnet3-kosice-era2` (pohja origin/v1971-prep e3551888).
Versiota ei nostettu, PR:ää ei avattu, Raamattuun ei koskettu, ämpäriin ei viety.

**Tulos:** `node --test tests/*.test.mjs` 3730 testiä, 3717 läpi, **0 kaatunutta**, 13 ohitettua.
**Selain (Chromium, tämä haara):** Košicen lehti-rivi avaa lehden (herokuvat, ennen–nyt, teksti), Turistiopas avautuu sisältöineen, liuskassa rivit "Košice" + "Turistiopas" (Bryssel ja Ljubljana samoin; ei tyhjää Nähtävyydet-riviä).

## Sisältö (`KULTTUURI_KATEGORIAT.kosice`, sama rakenne kuin Bryssel/Ljubljana)

| Sivu | Sisältö |
| --- | --- |
| `kaupunki` (etusivu) | johdanto; 3 kansikuvaa (vanha kaupungintalo, Jakabin palatsi, Moyzesova-puisto); 3 avauskuvaa (näkymä tuomiokirkon tornista, Hradovan näkötorni, Hlavná ylhäältä); ennen–nyt: tuomiokirkko ja Urbanin torni (Library of Congressin photochrom noin 1900 PD ↔ nykykuva); Matkailijalle-opas (myyntikuva Hrnčiarska-katu; kappale; 4 jaksoa Perille ja liikkeelle / Vanhakaupunki / Ruoka ja juoma / Ilta 7 kuvalla; parasta 5, hyvä tietää 4, paras aika, 4 kautta, 3 linkkiä 200); 3 nostoa: Hlavná-katu, Laulava suihkulähde, Kassan rauhanmaraton (Euroopan vanhin) |
| `historia` | Pentapolitana ja vapaa kuninkaallinen kaupunki; Euroopan ensimmäinen kaupunkivaakuna 1369; Rákóczit ja kotiinpaluu 1906; jesuiittojen yliopisto 1657 ja Ylä-Unkarin museo 1872; minitehtävä (oikea = 1, 1369) |
| `rakennukset` | Pyhän Elisabetin tuomiokirkko (kuoriosan ulkokuva), Urbanin torni ja Mikaelin kappeli, valtionteatteri, Pyövelin bastioni; minitehtävä (oikea = 3, viinitarhurien suojeluspyhimys Urbanus) |
| `ruoka` (Ruoka ja juoma) | bryndzové halušky, slovenská bryndza (PGI 2008), Slovakian Tokaj, kapustnica; minitehtävä (oikea = 2, vähintään puolet lampaanmaitoa) |

15 nostoa, 31 Commons-kuvaa; `saatiedot.js`-rivi `kosice` (ERA5 1991–2020, ylin/alin, luonnehdinta). Tekstit omin sanoin en-Wikipediasta (Laulava suihkulähde sk-Wikipediasta, koska en-artikkelia ei ole; kapustnica en-artikkelien "Slovak cuisine"/"Cabbage soup" pohjalta).

## Kuvat ja lisenssit

Kaikki 31 kuvaa tarkistettu jälkikäteen Commonsin extmetadatasta: PD / CC0 / CC BY / CC BY-SA, kaikki ≥ 1200 px, ei kaksoiskappaleita eikä yhtään yhteistä muiden kaupunkilehtien kanssa. Kiellettyjä (europe-valokuvien sisäkuva ja Immaculata-enkeli, SVK-noston kuvat) ei käytetty; tuomiokirkon rakennusnostossa käytetty `St. Elisabeth Cathedral Kosice.jpg` on eri tiedosto kuin SVK-noston `.jpeg`.

## Huomioita

- Ruoka-sivun nostot kertovat Slovakian ruokaperinteestä (Košicen ruokaa koskevaa en-Wikipedia-materiaalia ei ollut); teksteissä ei väitetä yhteyttä Košiceen. Halutessasi sivun voi vaihtaa Košicen omiin aiheisiin.
- Museon perustamisvuosi: en-Wikipedian Košice-artikkeli ja museoartikkelin johdanto sanovat 1872, museoartikkelin historiaosio 1876; käytetty 1872 (kuten europe-artikkelissa).
- Nähtävyydet-rivi (kohdekartta) puuttuu liuskasta tarkoituksella; kohdekartat tehdään omassa erässään.
- saatiedot.js-konflikti rebasessa (Bryssel/Ljubljana/Košice-rivit vierekkäin) ratkaistu säilyttämällä kaikki kolme.
- Ei tehty: nähtävyysjutut, miniatyyrit, kohtaaminen, juliste, uutislähteet.
