# Nostoinventaario Euroopasta — 2026-09-20

Sisältökirjuri (Sonnet), Fablen tilaus: omistaja ottaa Euroopan maiden
kaikki nostot takaisin työlistalle (tarkistus: noin joka kolmannessa
tietovisa; havainnekuvia lisää Codexilta huomenna). Ei sisältömuutoksia
tässä erässä — pelkkä laskenta, työkalu `tools/nostoinventaario.mjs`.

## Menetelmä ja rajaus

Luvut tulevat kunkin maan ISO-päätteisistä paketeista
(`maastokohteet-<iso>.js`, `hahmotelma-<iso>.js`,
`maalehtinostot-<iso>.js`, `nakyvat-kaupungit-<iso>.js`,
`fokuskohteet-<iso>.js`) sekä jaetusta `elaintakyt.js`:stä (yksi
eläintäky per maa). **EI SISÄLLÄ** täky-, syvennys-, skandaali- ja
historian hetki -kerroksia (dynaamisesti koottuja lisäkerroksia,
js/fokusnosto.js ja sisarpaketit) — luvut ovat siis ALARAJA kartalla
näkyvien merkkien kokonaismäärälle, ei koko `keraaNostot`-tulos
(tools/fokuskartta/nostot.mjs), joka laski koko Euroopalle
huomattavasti enemmän merkkejä mukaan lukien nuo lisäkerrokset.
Rajaus tehtiin, jotta "nostoja yhteensä" ja visa/kuva-osuudet
laskettaisiin SAMASTA joukosta eikä sekoitettaisi kahta eri lähdettä.

**Havainnekuvan (generoitu-lippu) kenttä EI ole boolean eikä täysin
yhtenäinen, mutta merkintätapa ON yhtenäinen siellä missä sitä
käytetään.** Koko repossa ei ole yhtään boolean-kenttää "generoitu" —
sana esiintyy datassa vain kommenteissa. `/karttanostot/`-R2-polku
EI ole luotettava merkki: se on pelkkä säilytyskansio, jota käyttävät
sekä aidot Commons-valokuvat (esim. `hahmotelma-*.js`:n
`kuva.lahde: 'Valokuva: <tekijä>, Wikimedia Commons (CC ...)'`) että
oikeat tekoälykuvat — tämä oli tämän työkalun ensimmäisen version
virhe, korjattu ennen julkaisua. OIKEA merkki on `lahde`-kentän
(joko `kuva.lahde` tai noston omalla ylätasolla, skeemasta
riippuen) TÄSMÄLLINEN ALKU **"Tekoälyllä tuotettu havainnekuva."** —
käytössä johdonmukaisesti neljässä paketissa: `elaintakyt.js`,
`kulttuuri-kategoriat.js`, `maa-kategoriat.js`,
`nahtavyysjutut.js`. Muissa (esim. maastokohteet-, hahmotelma- ja
maalehtinostot-paketit) havainnekuvia ei tämän tarkistuksen mukaan
ole lainkaan — kaikki niiden kuvat ovat aitoja Commons-valokuvia.
**Tämän erän skanni EI kata** `kulttuuri-kategoriat.js`:ää (kaupungin
nostot, avain on kaupunki-id eikä ISO) eikä `nahtavyysjutut.js`:ää,
vaikka molemmissa käytetään havainnekuvia — niiden liittäminen
maakohtaiseen tauluun vaatisi kaupunki→maa-yhdistämisen, mikä olisi
kasvattanut tämän "pienen" erän laajuutta. `ELAINTAKYT`:n
tekoälykuvat näyttävät koskevan vain Euroopan ulkopuolisia maita
(Intia, Japani, Etelä-Afrikka, Chile, Uusi-Seelanti ym. pistokoe) —
siksi Euroopan oma eläintäky-sarake on 0 tekoälykuvaa, ei virhe.

Tyyppiluokat normalisoitu Fablen 12 luokkaan lähdekentistä
`tyyppi`/`kategoria`/`symLaji`/`laji`; tunnistamaton arvo → muut.

## Yhteenveto

- Maita: 43
- Nostoja yhteensä: 1253
- Visoja yhteensä: 1174 (93.7% kaikista)
- Kuvallisia: 1010, joista havainnekuvaksi tulkittuja: 0
- Ilman kuvaa: 243
- Maita joissa visaosuus alle 1/3: 0

### Maat joissa visaosuus alle 1/3

(ei yhtään)

## Taulukko per maa

Tyypit-sarakkeen järjestys: vuori / saari / järvi / joki / meri / historia / kulttuuri / ruoka / kauppa / tekniikka / merenkulku / muut.

| ISO | Maa | Nostoja | Tyypit | Visoja (osuus) | Ilman kuvaa | Kuvia | Havainnekuvia | Kartuschan rivejä |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ALB | Albania | 0 | 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 | 0 (0%) | 0 | 0 | 0 | 0 |
| AND | Andorra | 0 | 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 | 0 (0%) | 0 | 0 | 0 | 0 |
| AUT | Itävalta | 45 | 5 / 0 / 5 / 3 / 0 / 13 / 11 / 1 / 3 / 2 / 0 / 2 | 44 (97.8%) | 1 | 44 | 0 | 6 |
| BEL | Belgia | 26 | 1 / 0 / 0 / 2 / 1 / 7 / 8 / 2 / 1 / 4 / 0 / 0 | 26 (100%) | 0 | 26 | 0 | 5 |
| BGR | Bulgaria | 46 | 13 / 0 / 0 / 1 / 3 / 12 / 10 / 2 / 1 / 0 / 2 / 2 | 44 (95.7%) | 18 | 28 | 0 | 2 |
| BIH | Bosnia ja Hertsegovina | 17 | 4 / 0 / 0 / 2 / 1 / 3 / 5 / 0 / 0 / 0 / 0 / 2 | 16 (94.1%) | 12 | 5 | 0 | 2 |
| BLR | Valko-Venäjä | 0 | 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 | 0 (0%) | 0 | 0 | 0 | 0 |
| CHE | Sveitsi | 17 | 3 / 0 / 0 / 3 / 0 / 2 / 1 / 1 / 1 / 3 / 0 / 3 | 16 (94.1%) | 1 | 16 | 0 | 5 |
| CYP | Kypros | 23 | 3 / 0 / 0 / 1 / 2 / 9 / 6 / 1 / 0 / 0 / 0 / 1 | 22 (95.7%) | 0 | 23 | 0 | 5 |
| CZE | Tšekki | 45 | 7 / 0 / 3 / 3 / 0 / 11 / 7 / 4 / 3 / 4 / 1 / 2 | 44 (97.8%) | 1 | 44 | 0 | 6 |
| DEU | Saksa | 51 | 6 / 3 / 2 / 5 / 3 / 12 / 10 / 2 / 3 / 4 / 0 / 1 | 50 (98%) | 22 | 29 | 0 | 11 |
| DNK | Tanska | 44 | 5 / 3 / 0 / 0 / 2 / 13 / 8 / 1 / 4 / 2 / 3 / 3 | 43 (97.7%) | 1 | 43 | 0 | 4 |
| ESP | Espanja | 44 | 7 / 0 / 1 / 2 / 2 / 14 / 6 / 4 / 1 / 6 / 0 / 1 | 43 (97.7%) | 1 | 43 | 0 | 8 |
| EST | Viro | 43 | 2 / 2 / 3 / 3 / 3 / 12 / 7 / 0 / 1 / 5 / 1 / 4 | 42 (97.7%) | 1 | 42 | 0 | 2 |
| FIN | Suomi | 47 | 5 / 1 / 1 / 4 / 3 / 13 / 8 / 0 / 2 / 6 / 2 / 2 | 46 (97.9%) | 1 | 46 | 0 | 3 |
| FRA | Ranska | 90 | 6 / 0 / 0 / 3 / 5 / 15 / 16 / 2 / 0 / 3 / 2 / 38 | 46 (51.1%) | 39 | 51 | 0 | 8 |
| GBR | Britannia | 14 | 2 / 0 / 0 / 1 / 2 / 4 / 1 / 0 / 0 / 3 / 0 / 1 | 13 (92.9%) | 4 | 10 | 0 | 15 |
| GRC | Kreikka | 65 | 9 / 4 / 2 / 3 / 4 / 17 / 14 / 2 / 2 / 4 / 0 / 4 | 62 (95.4%) | 36 | 29 | 0 | 6 |
| HRV | Kroatia | 46 | 5 / 8 / 3 / 4 / 1 / 12 / 10 / 0 / 0 / 0 / 2 / 1 | 45 (97.8%) | 20 | 26 | 0 | 3 |
| HUN | Unkari | 43 | 6 / 0 / 4 / 4 / 0 / 11 / 13 / 3 / 1 / 0 / 0 / 1 | 42 (97.7%) | 18 | 25 | 0 | 6 |
| IRL | Irlanti | 40 | 7 / 1 / 2 / 2 / 3 / 13 / 5 / 0 / 1 / 2 / 2 / 2 | 39 (97.5%) | 1 | 39 | 0 | 6 |
| ISL | Islanti | 18 | 3 / 1 / 0 / 2 / 2 / 3 / 1 / 0 / 0 / 1 / 1 / 4 | 17 (94.4%) | 1 | 17 | 0 | 4 |
| ITA | Italia | 49 | 7 / 3 / 2 / 1 / 4 / 12 / 10 / 3 / 2 / 3 / 0 / 2 | 48 (98%) | 17 | 32 | 0 | 8 |
| LTU | Liettua | 35 | 2 / 1 / 4 / 1 / 1 / 10 / 14 / 0 / 0 / 0 / 0 / 2 | 34 (97.1%) | 1 | 34 | 0 | 3 |
| LUX | Luxemburg | 15 | 0 / 0 / 0 / 0 / 0 / 9 / 3 / 2 / 0 / 1 / 0 / 0 | 15 (100%) | 0 | 15 | 0 | 5 |
| LVA | Latvia | 36 | 1 / 0 / 1 / 1 / 2 / 10 / 8 / 3 / 1 / 1 / 3 / 5 | 35 (97.2%) | 1 | 35 | 0 | 3 |
| MDA | Moldova | 0 | 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 | 0 (0%) | 0 | 0 | 0 | 0 |
| MKD | Pohjois-Makedonia | 0 | 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 | 0 (0%) | 0 | 0 | 0 | 0 |
| MLT | Malta | 11 | 1 / 1 / 0 / 0 / 0 / 7 / 1 / 0 / 0 / 0 / 1 / 0 | 11 (100%) | 0 | 11 | 0 | 5 |
| MNE | Montenegro | 0 | 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 | 0 (0%) | 0 | 0 | 0 | 0 |
| NLD | Alankomaat | 43 | 1 / 4 / 2 / 1 / 1 / 11 / 13 / 2 / 1 / 6 / 0 / 1 | 42 (97.7%) | 1 | 42 | 0 | 6 |
| NOR | Norja | 13 | 1 / 0 / 0 / 1 / 2 / 3 / 2 / 0 / 0 / 2 / 1 / 1 | 12 (92.3%) | 1 | 12 | 0 | 5 |
| POL | Puola | 41 | 4 / 1 / 1 / 4 / 2 / 10 / 11 / 1 / 3 / 3 / 0 / 1 | 40 (97.6%) | 2 | 39 | 0 | 3 |
| PRT | Portugali | 43 | 3 / 1 / 1 / 2 / 3 / 18 / 8 / 1 / 1 / 3 / 1 / 1 | 42 (97.7%) | 1 | 42 | 0 | 6 |
| ROU | Romania | 46 | 7 / 0 / 2 / 4 / 1 / 11 / 11 / 1 / 0 / 6 / 0 / 3 | 44 (95.7%) | 14 | 32 | 0 | 2 |
| RUS | Venäjä | 17 | 2 / 0 / 0 / 2 / 4 / 4 / 3 / 0 / 0 / 1 / 0 / 1 | 16 (94.1%) | 1 | 16 | 0 | 3 |
| SRB | Serbia | 0 | 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 | 0 (0%) | 0 | 0 | 0 | 0 |
| SVK | Slovakia | 26 | 4 / 0 / 1 / 0 / 0 / 12 / 6 / 1 / 1 / 1 / 0 / 0 | 26 (100%) | 0 | 26 | 0 | 5 |
| SVN | Slovenia | 24 | 4 / 0 / 2 / 1 / 0 / 7 / 4 / 2 / 0 / 4 / 0 / 0 | 24 (100%) | 0 | 24 | 0 | 5 |
| SWE | Ruotsi | 47 | 5 / 2 / 1 / 2 / 4 / 11 / 9 / 2 / 3 / 6 / 1 / 1 | 46 (97.9%) | 1 | 46 | 0 | 8 |
| TUR | Turkki | 29 | 3 / 0 / 1 / 2 / 3 / 7 / 7 / 0 / 1 / 0 / 0 / 5 | 26 (89.7%) | 24 | 5 | 0 | 7 |
| UKR | Ukraina | 14 | 1 / 0 / 0 / 2 / 2 / 4 / 2 / 0 / 0 / 2 / 0 / 1 | 13 (92.9%) | 1 | 13 | 0 | 3 |
| XKX | Kosovo | 0 | 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 | 0 (0%) | 0 | 0 | 0 | 0 |
