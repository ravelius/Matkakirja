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
- Nostoja yhteensä: 1198
- Visoja yhteensä: 260 (21.7% kaikista)
- Ihme (kadonnut kohde): 8, rappeutunut (pari): 11, olemassa: 1179
- Kuvallisia: 1198, joista havainnekuvaksi tulkittuja: 0
- Ilman kuvaa: 0
- Maita joissa visaosuus alle 1/3: 28

### Maat joissa visaosuus alle 1/3

- BIH Bosnia ja Hertsegovina: 0/16 (0%)
- CHE Sveitsi: 0/16 (0%)
- GBR Britannia: 0/13 (0%)
- ISL Islanti: 0/17 (0%)
- NOR Norja: 0/12 (0%)
- RUS Venäjä: 0/16 (0%)
- TUR Turkki: 0/28 (0%)
- UKR Ukraina: 0/13 (0%)
- GRC Kreikka: 10/64 (15.6%)
- EST Viro: 8/42 (19%)
- DEU Saksa: 10/50 (20%)
- LVA Latvia: 7/35 (20%)
- LTU Liettua: 7/34 (20.6%)
- ITA Italia: 10/48 (20.8%)
- FIN Suomi: 10/46 (21.7%)
- SWE Ruotsi: 10/46 (21.7%)
- BGR Bulgaria: 10/45 (22.2%)
- HRV Kroatia: 10/45 (22.2%)
- ROU Romania: 10/45 (22.2%)
- AUT Itävalta: 10/44 (22.7%)
- CZE Tšekki: 10/44 (22.7%)
- DNK Tanska: 10/43 (23.3%)
- ESP Espanja: 10/43 (23.3%)
- HUN Unkari: 10/42 (23.8%)
- NLD Alankomaat: 10/42 (23.8%)
- PRT Portugali: 10/42 (23.8%)
- POL Puola: 10/40 (25%)
- IRL Irlanti: 10/39 (25.6%)

## Taulukko per maa

Tyypit-sarakkeen järjestys: vuori / saari / järvi / joki / meri / historia / kulttuuri / ruoka / kauppa / tekniikka / merenkulku / muut. Ihme-sarakkeen
järjestys: ihme / rappeutunut / olemassa.

| ISO | Maa | Nostoja | Tyypit | Visoja (osuus) | Ihme/Rap./Ole. | Ilman kuvaa | Kuvia | Havainnekuvia | Kartuschan rivejä |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ALB | Albania | 0 | 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 | 0 (0%) | 0 / 0 / 0 | 0 | 0 | 0 | 0 |
| AND | Andorra | 0 | 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 | 0 (0%) | 0 / 0 / 0 | 0 | 0 | 0 | 0 |
| AUT | Itävalta | 44 | 5 / 0 / 5 / 3 / 0 / 13 / 11 / 1 / 3 / 2 / 0 / 1 | 10 (22.7%) | 0 / 0 / 44 | 0 | 44 | 0 | 6 |
| BEL | Belgia | 26 | 1 / 0 / 0 / 2 / 1 / 7 / 8 / 2 / 1 / 4 / 0 / 0 | 9 (34.6%) | 0 / 0 / 26 | 0 | 26 | 0 | 5 |
| BGR | Bulgaria | 45 | 13 / 0 / 0 / 1 / 3 / 12 / 10 / 2 / 1 / 0 / 2 / 1 | 10 (22.2%) | 0 / 0 / 45 | 0 | 45 | 0 | 5 |
| BIH | Bosnia ja Hertsegovina | 16 | 4 / 0 / 0 / 2 / 1 / 3 / 5 / 0 / 0 / 0 / 0 / 1 | 0 (0%) | 0 / 0 / 16 | 0 | 16 | 0 | 2 |
| BLR | Valko-Venäjä | 0 | 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 | 0 (0%) | 0 / 0 / 0 | 0 | 0 | 0 | 0 |
| CHE | Sveitsi | 16 | 3 / 0 / 0 / 3 / 0 / 2 / 1 / 1 / 1 / 3 / 0 / 2 | 0 (0%) | 0 / 0 / 16 | 0 | 16 | 0 | 5 |
| CYP | Kypros | 22 | 3 / 0 / 0 / 1 / 2 / 9 / 6 / 1 / 0 / 0 / 0 / 0 | 10 (45.5%) | 0 / 0 / 22 | 0 | 22 | 0 | 5 |
| CZE | Tšekki | 44 | 7 / 0 / 3 / 3 / 0 / 11 / 7 / 4 / 3 / 4 / 1 / 1 | 10 (22.7%) | 0 / 0 / 44 | 0 | 44 | 0 | 6 |
| DEU | Saksa | 50 | 6 / 3 / 2 / 5 / 3 / 12 / 10 / 2 / 3 / 4 / 0 / 0 | 10 (20%) | 0 / 0 / 50 | 0 | 50 | 0 | 11 |
| DNK | Tanska | 43 | 5 / 3 / 0 / 0 / 2 / 13 / 8 / 1 / 4 / 2 / 3 / 2 | 10 (23.3%) | 0 / 0 / 43 | 0 | 43 | 0 | 5 |
| ESP | Espanja | 43 | 7 / 0 / 1 / 2 / 2 / 14 / 6 / 4 / 1 / 6 / 0 / 0 | 10 (23.3%) | 0 / 0 / 43 | 0 | 43 | 0 | 8 |
| EST | Viro | 42 | 2 / 2 / 3 / 3 / 3 / 12 / 7 / 0 / 1 / 5 / 1 / 3 | 8 (19%) | 0 / 0 / 42 | 0 | 42 | 0 | 5 |
| FIN | Suomi | 46 | 5 / 1 / 1 / 4 / 3 / 13 / 8 / 0 / 2 / 6 / 2 / 1 | 10 (21.7%) | 0 / 0 / 46 | 0 | 46 | 0 | 5 |
| FRA | Ranska | 64 | 7 / 0 / 0 / 3 / 7 / 18 / 14 / 4 / 2 / 7 / 2 / 0 | 22 (34.4%) | 2 / 0 / 62 | 0 | 64 | 0 | 8 |
| GBR | Britannia | 13 | 2 / 0 / 0 / 1 / 2 / 4 / 1 / 0 / 0 / 3 / 0 / 0 | 0 (0%) | 2 / 1 / 10 | 0 | 13 | 0 | 15 |
| GRC | Kreikka | 64 | 9 / 4 / 2 / 3 / 4 / 17 / 14 / 2 / 2 / 4 / 0 / 3 | 10 (15.6%) | 1 / 6 / 57 | 0 | 64 | 0 | 6 |
| HRV | Kroatia | 45 | 5 / 8 / 3 / 4 / 1 / 12 / 10 / 0 / 0 / 0 / 2 / 0 | 10 (22.2%) | 0 / 0 / 45 | 0 | 45 | 0 | 5 |
| HUN | Unkari | 42 | 6 / 0 / 4 / 4 / 0 / 11 / 13 / 3 / 1 / 0 / 0 / 0 | 10 (23.8%) | 0 / 0 / 42 | 0 | 42 | 0 | 6 |
| IRL | Irlanti | 39 | 7 / 1 / 2 / 2 / 3 / 13 / 5 / 0 / 1 / 2 / 2 / 1 | 10 (25.6%) | 0 / 0 / 39 | 0 | 39 | 0 | 6 |
| ISL | Islanti | 17 | 3 / 1 / 0 / 2 / 2 / 3 / 1 / 0 / 0 / 1 / 1 / 3 | 0 (0%) | 0 / 0 / 17 | 0 | 17 | 0 | 4 |
| ITA | Italia | 48 | 7 / 3 / 2 / 1 / 4 / 12 / 10 / 3 / 2 / 3 / 0 / 1 | 10 (20.8%) | 0 / 2 / 46 | 0 | 48 | 0 | 8 |
| LTU | Liettua | 34 | 2 / 1 / 4 / 1 / 1 / 10 / 14 / 0 / 0 / 0 / 0 / 1 | 7 (20.6%) | 0 / 0 / 34 | 0 | 34 | 0 | 5 |
| LUX | Luxemburg | 15 | 0 / 0 / 0 / 0 / 0 / 9 / 3 / 2 / 0 / 1 / 0 / 0 | 6 (40%) | 0 / 0 / 15 | 0 | 15 | 0 | 5 |
| LVA | Latvia | 35 | 1 / 0 / 1 / 1 / 2 / 10 / 8 / 3 / 1 / 1 / 3 / 4 | 7 (20%) | 0 / 0 / 35 | 0 | 35 | 0 | 5 |
| MDA | Moldova | 0 | 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 | 0 (0%) | 0 / 0 / 0 | 0 | 0 | 0 | 0 |
| MKD | Pohjois-Makedonia | 0 | 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 | 0 (0%) | 0 / 0 / 0 | 0 | 0 | 0 | 0 |
| MLT | Malta | 11 | 1 / 1 / 0 / 0 / 0 / 7 / 1 / 0 / 0 / 0 / 1 / 0 | 4 (36.4%) | 0 / 0 / 11 | 0 | 11 | 0 | 5 |
| MNE | Montenegro | 0 | 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 | 0 (0%) | 0 / 0 / 0 | 0 | 0 | 0 | 0 |
| NLD | Alankomaat | 42 | 1 / 4 / 2 / 1 / 1 / 11 / 13 / 2 / 1 / 6 / 0 / 0 | 10 (23.8%) | 0 / 0 / 42 | 0 | 42 | 0 | 6 |
| NOR | Norja | 12 | 1 / 0 / 0 / 1 / 2 / 3 / 2 / 0 / 0 / 2 / 1 / 0 | 0 (0%) | 0 / 0 / 12 | 0 | 12 | 0 | 5 |
| POL | Puola | 40 | 4 / 1 / 1 / 4 / 2 / 10 / 11 / 1 / 3 / 3 / 0 / 0 | 10 (25%) | 0 / 0 / 40 | 0 | 40 | 0 | 5 |
| PRT | Portugali | 42 | 3 / 1 / 1 / 2 / 3 / 18 / 8 / 1 / 1 / 3 / 1 / 0 | 10 (23.8%) | 0 / 0 / 42 | 0 | 42 | 0 | 6 |
| ROU | Romania | 45 | 7 / 0 / 2 / 4 / 1 / 11 / 11 / 1 / 0 / 6 / 0 / 2 | 10 (22.2%) | 0 / 0 / 45 | 0 | 45 | 0 | 5 |
| RUS | Venäjä | 16 | 2 / 0 / 0 / 2 / 4 / 4 / 3 / 0 / 0 / 1 / 0 / 0 | 0 (0%) | 0 / 0 / 16 | 0 | 16 | 0 | 3 |
| SRB | Serbia | 0 | 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 | 0 (0%) | 0 / 0 / 0 | 0 | 0 | 0 | 0 |
| SVK | Slovakia | 26 | 4 / 0 / 1 / 0 / 0 / 12 / 6 / 1 / 1 / 1 / 0 / 0 | 9 (34.6%) | 0 / 0 / 26 | 0 | 26 | 0 | 5 |
| SVN | Slovenia | 24 | 4 / 0 / 2 / 1 / 0 / 7 / 4 / 2 / 0 / 4 / 0 / 0 | 8 (33.3%) | 0 / 0 / 24 | 0 | 24 | 0 | 5 |
| SWE | Ruotsi | 46 | 5 / 2 / 1 / 2 / 4 / 11 / 9 / 2 / 3 / 6 / 1 / 0 | 10 (21.7%) | 0 / 0 / 46 | 0 | 46 | 0 | 8 |
| TUR | Turkki | 28 | 3 / 0 / 1 / 2 / 3 / 7 / 7 / 0 / 1 / 0 / 0 / 4 | 0 (0%) | 3 / 2 / 23 | 0 | 28 | 0 | 7 |
| UKR | Ukraina | 13 | 1 / 0 / 0 / 2 / 2 / 4 / 2 / 0 / 0 / 2 / 0 / 0 | 0 (0%) | 0 / 0 / 13 | 0 | 13 | 0 | 3 |
| XKX | Kosovo | 0 | 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 | 0 (0%) | 0 / 0 / 0 | 0 | 0 | 0 | 0 |
