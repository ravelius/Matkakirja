# Nostoinventaario Euroopasta — 2026-09-21 (korjattu)

Sisältökirjuri (Sonnet), Fablen tilaus: omistaja ottaa Euroopan maiden
kaikki nostot takaisin työlistalle (tarkistus: noin joka kolmannessa
tietovisa; havainnekuvia lisää Codexilta huomenna). Ei sisältömuutoksia
tässä erässä — pelkkä laskenta, työkalu `tools/nostoinventaario.mjs`.

**KORJATTU 20.9.2026 ILTA** täsmäytyksen jälkeen Pelikoodarin (opus)
koodista lasketun FRA-luvun kanssa. Kaksi virhettä ensimmäisessä
versiossa: (1) "visa" luettiin väärästä kentästä (`kysymykset`-
taulukko, joka on pöllö-chatin ehdotuskysymyksiä — ei tietovisa) oikean
`nosto.visa`-kentän sijaan (sama muoto kuin lehden tehtävä:
`{kysymys, vaihtoehdot, oikea, fakta?}`, tarkistettu suoraan
js/fokusnosto.js `nostonVisa`-funktion ehdolla); (2)
`maalehtinostot-<iso>.js` vie sekä käsitellyn että raakadatan, ja
kaikkien exporttien läpikäynti laski osan nostoista kahdesti.
Täsmäytyksen jälkeen tämä työkalu antaa FRA:lle täsmälleen
Pelikoodarin luvut: 64 nostoa, 16 visaa (25 %). Vanha raportti (51 %
FRA:lle, 94 % kaikille) oli virheellinen — tämä korvaa sen kokonaan.

## Menetelmä ja rajaus

Luvut tulevat kunkin maan ISO-päätteisistä paketeista
(`maastokohteet-<iso>.js`, `hahmotelma-<iso>.js`,
`maalehtinostot-<iso>.js`, `fokuskohteet-<iso>.js`) — VAIN kunkin
tiedoston KANONINEN export (esim. `MAASTOKOHTEET_FRA`), ei muita
saman tiedoston vientejä. `nakyvat-kaupungit-<iso>.js` (kaupunki-
kortit, oma korttityyppi) ja jaettu `elaintakyt.js` (oma "perhe")
EIVÄT kuulu tähän joukkoon — pudotettu tässä korjauksessa, koska
Pelikoodarin ryhmittely ei sisältänyt niitä eikä peli käsittele niitä
"nostoina" visan tai tyyppijakauman kannalta. EI SISÄLLÄ myöskään
täky-, syvennys-, skandaali- ja historian hetki -kerroksia
(dynaamisesti koottuja lisäkerroksia, js/fokusnosto.js ja
sisarpaketit) — luvut ovat siis ALARAJA kartalla näkyvien merkkien
kokonaismäärälle, ei koko `keraaNostot`-tulos
(tools/fokuskartta/nostot.mjs).

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
`nahtavyysjutut.js` — joista YKSIKÄÄN ei kuulu tämän raportin
nostojoukkoon (ks. yllä). "Havainnekuvia"-sarake alla kertoo siis
vain, kuinka moni skannattujen neljän paketin (maastokohteet-,
hahmotelma-, maalehtinostot-, fokuskohteet-) OMISTA kuvista täyttää
tuon lahde-ehdon — se ei kata mainittuja neljää muuta pakettia.

Tyyppiluokat normalisoitu Fablen 12 luokkaan lähdekentistä
`tyyppi`/`kategoria`/`symLaji`/`laji`; tunnistamaton arvo → muut.

**Ihme / rappeutunut / olemassa -sarake** (omistajan linjaus, Raamattu
"HAVAINNEKUVAT NOSTOISSA") ei ole PÄÄTELTY tekstistä (avainsanahaku
olisi epäluotettava) vaan luettu suoraan olemassa olevasta
`ihme`-kentästä, jota koodi jo käyttää (js/fokuskohteet-gbr.js,
-grc.js ym.): nosto jolla on `ihme: { kadonnut: true, ... }` on
kokonaan kadonnut kohde (kortilla vain havainnekuva) → **ihme**; nosto
jolla on `ihme: { kadonnut: false, ... }` on rappeutunut/muuttunut
paikka, jolla on sekä nykykuva että kulta-ajan havainnekuva →
**rappeutunut**; nosto ilman `ihme`-kenttää → **olemassa** (tavallinen
nosto, havainnekuva vain jos tuo selvästi lisäarvoa). Tämä kattaa vain
neljä skannattua pakettia — `kulttuuri-kategoriat.js` ja
`nahtavyysjutut.js` saattavat sisältää lisää `ihme`-nostoja tämän
ulkopuolella.

## Yhteenveto

- Maita: 43
- Nostoja yhteensä: 1336
- Visoja yhteensä: 294 (22% kaikista)
- Ihme (kadonnut kohde): 8, rappeutunut (pari): 41, olemassa: 1287
- Kuvallisia: 1138, joista havainnekuvaksi tulkittuja: 0
- Ilman kuvaa: 198
- Maita joissa visaosuus alle 1/3: 31

### Maat joissa visaosuus alle 1/3

- TUR Turkki: 1/30 (3.3%)
- GRC Kreikka: 10/66 (15.2%)
- BIH Bosnia ja Hertsegovina: 5/30 (16.7%)
- ISL Islanti: 5/30 (16.7%)
- CHE Sveitsi: 5/29 (17.2%)
- EST Viro: 8/43 (18.6%)
- NOR Norja: 6/32 (18.8%)
- RUS Venäjä: 6/31 (19.4%)
- UKR Ukraina: 6/31 (19.4%)
- LVA Latvia: 7/36 (19.4%)
- DEU Saksa: 10/51 (19.6%)
- GBR Britannia: 6/30 (20%)
- LTU Liettua: 7/35 (20%)
- ITA Italia: 10/48 (20.8%)
- FIN Suomi: 10/47 (21.3%)
- HRV Kroatia: 10/47 (21.3%)
- ROU Romania: 10/47 (21.3%)
- BGR Bulgaria: 10/46 (21.7%)
- SWE Ruotsi: 10/46 (21.7%)
- CZE Tšekki: 10/45 (22.2%)
- AUT Itävalta: 10/44 (22.7%)
- ESP Espanja: 10/44 (22.7%)
- DNK Tanska: 10/43 (23.3%)
- HUN Unkari: 10/43 (23.3%)
- PRT Portugali: 10/43 (23.3%)
- NLD Alankomaat: 10/42 (23.8%)
- POL Puola: 10/42 (23.8%)
- FRA Ranska: 16/65 (24.6%)
- IRL Irlanti: 10/40 (25%)
- SVN Slovenia: 8/26 (30.8%)
- SVK Slovakia: 9/28 (32.1%)

## Taulukko per maa

Tyypit-sarakkeen järjestys: vuori / saari / järvi / joki / meri / historia / kulttuuri / ruoka / kauppa / tekniikka / merenkulku / muut. Ihme-sarakkeen
järjestys: ihme / rappeutunut / olemassa.

| ISO | Maa | Nostoja | Tyypit | Visoja (osuus) | Ihme/Rap./Ole. | Ilman kuvaa | Kuvia | Havainnekuvia | Kartuschan rivejä |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ALB | Albania | 0 | 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 | 0 (0%) | 0 / 0 / 0 | 0 | 0 | 0 | 0 |
| AND | Andorra | 0 | 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 | 0 (0%) | 0 / 0 / 0 | 0 | 0 | 0 | 0 |
| AUT | Itävalta | 44 | 5 / 0 / 5 / 3 / 0 / 13 / 11 / 1 / 3 / 2 / 0 / 1 | 10 (22.7%) | 0 / 0 / 44 | 0 | 44 | 0 | 6 |
| BEL | Belgia | 27 | 1 / 0 / 0 / 2 / 1 / 8 / 8 / 2 / 1 / 4 / 0 / 0 | 9 (33.3%) | 0 / 1 / 26 | 0 | 27 | 0 | 5 |
| BGR | Bulgaria | 46 | 13 / 0 / 0 / 1 / 3 / 13 / 10 / 2 / 1 / 0 / 2 / 1 | 10 (21.7%) | 0 / 1 / 45 | 17 | 29 | 0 | 5 |
| BIH | Bosnia ja Hertsegovina | 30 | 7 / 0 / 1 / 2 / 1 / 7 / 7 / 2 / 0 / 2 / 0 / 1 | 5 (16.7%) | 0 / 0 / 30 | 12 | 18 | 0 | 2 |
| BLR | Valko-Venäjä | 0 | 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 | 0 (0%) | 0 / 0 / 0 | 0 | 0 | 0 | 0 |
| CHE | Sveitsi | 29 | 4 / 0 / 0 / 3 / 0 / 2 / 5 / 4 / 1 / 6 / 0 / 4 | 5 (17.2%) | 0 / 0 / 29 | 0 | 29 | 0 | 5 |
| CYP | Kypros | 22 | 3 / 0 / 0 / 1 / 2 / 9 / 6 / 1 / 0 / 0 / 0 / 0 | 10 (45.5%) | 0 / 0 / 22 | 0 | 22 | 0 | 5 |
| CZE | Tšekki | 45 | 7 / 0 / 3 / 3 / 0 / 12 / 7 / 4 / 3 / 4 / 1 / 1 | 10 (22.2%) | 0 / 1 / 44 | 0 | 45 | 0 | 6 |
| DEU | Saksa | 51 | 6 / 3 / 2 / 5 / 3 / 13 / 10 / 2 / 3 / 4 / 0 / 0 | 10 (19.6%) | 0 / 1 / 50 | 21 | 30 | 0 | 11 |
| DNK | Tanska | 43 | 5 / 3 / 0 / 0 / 2 / 13 / 8 / 1 / 4 / 2 / 3 / 2 | 10 (23.3%) | 0 / 0 / 43 | 0 | 43 | 0 | 5 |
| ESP | Espanja | 44 | 7 / 0 / 1 / 2 / 2 / 15 / 6 / 4 / 1 / 6 / 0 / 0 | 10 (22.7%) | 0 / 1 / 43 | 0 | 44 | 0 | 8 |
| EST | Viro | 43 | 2 / 2 / 3 / 3 / 3 / 13 / 7 / 0 / 1 / 5 / 1 / 3 | 8 (18.6%) | 0 / 1 / 42 | 0 | 43 | 0 | 5 |
| FIN | Suomi | 47 | 5 / 1 / 1 / 4 / 3 / 14 / 8 / 0 / 2 / 6 / 2 / 1 | 10 (21.3%) | 0 / 1 / 46 | 0 | 47 | 0 | 5 |
| FRA | Ranska | 65 | 6 / 0 / 0 / 3 / 5 / 16 / 9 / 2 / 0 / 3 / 2 / 19 | 16 (24.6%) | 2 / 1 / 62 | 20 | 45 | 0 | 8 |
| GBR | Britannia | 30 | 3 / 1 / 2 / 1 / 3 / 7 / 2 / 3 / 0 / 7 / 1 / 0 | 6 (20%) | 2 / 1 / 27 | 3 | 27 | 0 | 15 |
| GRC | Kreikka | 66 | 9 / 4 / 2 / 3 / 4 / 19 / 14 / 2 / 2 / 4 / 0 / 3 | 10 (15.2%) | 1 / 8 / 57 | 35 | 31 | 0 | 6 |
| HRV | Kroatia | 47 | 5 / 8 / 3 / 4 / 1 / 14 / 10 / 0 / 0 / 0 / 2 / 0 | 10 (21.3%) | 0 / 2 / 45 | 19 | 28 | 0 | 5 |
| HUN | Unkari | 43 | 6 / 0 / 4 / 4 / 0 / 12 / 13 / 3 / 1 / 0 / 0 / 0 | 10 (23.3%) | 0 / 1 / 42 | 17 | 26 | 0 | 6 |
| IRL | Irlanti | 40 | 7 / 1 / 2 / 2 / 3 / 14 / 5 / 0 / 1 / 2 / 2 / 1 | 10 (25%) | 0 / 1 / 39 | 0 | 40 | 0 | 6 |
| ISL | Islanti | 30 | 5 / 1 / 0 / 3 / 3 / 4 / 4 / 2 / 0 / 3 / 2 / 3 | 5 (16.7%) | 0 / 0 / 30 | 0 | 30 | 0 | 4 |
| ITA | Italia | 48 | 7 / 3 / 2 / 1 / 4 / 12 / 10 / 3 / 2 / 3 / 0 / 1 | 10 (20.8%) | 0 / 2 / 46 | 16 | 32 | 0 | 8 |
| LTU | Liettua | 35 | 2 / 1 / 4 / 1 / 1 / 11 / 14 / 0 / 0 / 0 / 0 / 1 | 7 (20%) | 0 / 1 / 34 | 0 | 35 | 0 | 5 |
| LUX | Luxemburg | 16 | 0 / 0 / 0 / 0 / 0 / 10 / 3 / 2 / 0 / 1 / 0 / 0 | 6 (37.5%) | 0 / 1 / 15 | 0 | 16 | 0 | 5 |
| LVA | Latvia | 36 | 1 / 0 / 1 / 1 / 2 / 11 / 8 / 3 / 1 / 1 / 3 / 4 | 7 (19.4%) | 0 / 1 / 35 | 0 | 36 | 0 | 5 |
| MDA | Moldova | 0 | 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 | 0 (0%) | 0 / 0 / 0 | 0 | 0 | 0 | 0 |
| MKD | Pohjois-Makedonia | 0 | 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 | 0 (0%) | 0 / 0 / 0 | 0 | 0 | 0 | 0 |
| MLT | Malta | 11 | 1 / 1 / 0 / 0 / 0 / 7 / 1 / 0 / 0 / 0 / 1 / 0 | 4 (36.4%) | 0 / 0 / 11 | 0 | 11 | 0 | 5 |
| MNE | Montenegro | 0 | 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 | 0 (0%) | 0 / 0 / 0 | 0 | 0 | 0 | 0 |
| NLD | Alankomaat | 42 | 1 / 4 / 2 / 1 / 1 / 11 / 13 / 2 / 1 / 6 / 0 / 0 | 10 (23.8%) | 0 / 0 / 42 | 0 | 42 | 0 | 6 |
| NOR | Norja | 32 | 3 / 1 / 0 / 1 / 5 / 6 / 4 / 3 / 0 / 6 / 2 / 1 | 6 (18.8%) | 0 / 2 / 30 | 0 | 32 | 0 | 5 |
| POL | Puola | 42 | 4 / 1 / 1 / 4 / 2 / 12 / 11 / 1 / 3 / 3 / 0 / 0 | 10 (23.8%) | 0 / 2 / 40 | 1 | 41 | 0 | 5 |
| PRT | Portugali | 43 | 3 / 1 / 1 / 2 / 3 / 19 / 8 / 1 / 1 / 3 / 1 / 0 | 10 (23.3%) | 0 / 1 / 42 | 0 | 43 | 0 | 6 |
| ROU | Romania | 47 | 7 / 0 / 2 / 4 / 1 / 13 / 11 / 1 / 0 / 6 / 0 / 2 | 10 (21.3%) | 0 / 2 / 45 | 13 | 34 | 0 | 5 |
| RUS | Venäjä | 31 | 2 / 0 / 1 / 2 / 4 / 9 / 7 / 3 / 0 / 3 / 0 / 0 | 6 (19.4%) | 0 / 1 / 30 | 0 | 31 | 0 | 3 |
| SRB | Serbia | 0 | 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 | 0 (0%) | 0 / 0 / 0 | 0 | 0 | 0 | 0 |
| SVK | Slovakia | 28 | 4 / 0 / 1 / 0 / 0 / 14 / 6 / 1 / 1 / 1 / 0 / 0 | 9 (32.1%) | 0 / 2 / 26 | 0 | 28 | 0 | 5 |
| SVN | Slovenia | 26 | 4 / 0 / 2 / 1 / 0 / 9 / 4 / 2 / 0 / 4 / 0 / 0 | 8 (30.8%) | 0 / 2 / 24 | 0 | 26 | 0 | 5 |
| SWE | Ruotsi | 46 | 5 / 2 / 1 / 2 / 4 / 11 / 9 / 2 / 3 / 6 / 1 / 0 | 10 (21.7%) | 0 / 0 / 46 | 0 | 46 | 0 | 8 |
| TUR | Turkki | 30 | 3 / 0 / 1 / 2 / 3 / 8 / 8 / 0 / 1 / 0 / 0 / 4 | 1 (3.3%) | 3 / 2 / 25 | 24 | 6 | 0 | 7 |
| UKR | Ukraina | 31 | 1 / 0 / 1 / 3 / 2 / 9 / 7 / 2 / 0 / 5 / 0 / 1 | 6 (19.4%) | 0 / 1 / 30 | 0 | 31 | 0 | 3 |
| XKX | Kosovo | 0 | 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 | 0 (0%) | 0 / 0 / 0 | 0 | 0 | 0 | 0 |
