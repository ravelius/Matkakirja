# Pääkaupunkien pistokoe e03 osa 2 + korjaukset: Amman, Beirut, Abu Dhabi, Manama (Sisältökirjuri 11.10.2026)

Menetelmä kuten osa 1 (`paakaupungit-pistokoe-e03a-20261011.md`): 3 nostoa + 5 kysymys-factia + laajuus, ≥ 2 itsenäistä lähdettä (PILVIOHJE luku 13 + Kypros-lisäsääntö), 3–5 kuvaa Commonsista. Kaupunkikohtaiset raportit: `docs/raportit/paakaupungit-pistokoe-e03b/`. **Korjaukset on tehty** haaraan `paakaupungit-e03-pilvi` (cdb797032) kaikille seitsemälle e03-kaupungille (osan 1 PT-päätökset mukana).

| Kaupunki | Väitteet OIKEIN / EPÄTARKKA / VIRHE | Kuvat OIKEIN / EPÄTARKKA / VIRHE |
|---|---|---|
| Amman | 20 / 4 / 0 | 2 / 1 / 0 |
| Beirut | 16 / 8 / 0 | 4 / 1 / 0 |
| Abu Dhabi | 21 / 4 / 0 | 3 / 1 / 0 |
| Manama | 18 / 9 / 2 | 2 / 1 / 0 |
| Osa 2 yhteensä | 75 / 25 / 2 | 11 / 4 / 0 |
| Osa 1 (Tbilisi, Jerevan, Baku) | 56 / 27 / 0 | 8 / 3 / 1 |
| e03 yhteensä | 131 / 52 / 2 | 19 / 7 / 1 |

Verrattuna e01+e02:een (78/46/7): virheitä selvästi vähemmän, EPÄTARKKA-osuus 28 % (e01+e02 35 %).

## Toistuva virhetyyppi

Yhden lähteen (Wikipedia) yleistys tai kiistanalainen perinnetieto varmana (Beirut 7/8, Manama, Amman 1 000 asukasta/mutatiili/pilarin kirjoitus), laajuus nimeämättä (Abu Dhabi: hallinnollinen alue ≠ saari; Amman: kuvernementti 4 007 526 ≠ kunta; Beirut: taajama vs. kaupunki), sekä kuvateksti joka kertoo muusta kuin kuvassa näkyvästä (Amman kansi, Abu Dhabi moskeijan koristeet, Manama Durand-kiven jäljennös). Virheet (Manama): "puusilta" (oikeasti pengertie) ja Durand-kivi "esillä" (alkuperäinen tuhoutui, museossa jäljennös).

## Tehdyt korjaukset (e03, 7 kaupunkia)

- **Säärivit** (korjattu työkalu `saa e03`, en-Wikipedian ilmastotaulukko): saatiedot + luonnehdinta kuudelle; **Beirut `saatiedot: null`** (taulukon otsikossa ei normaalikautta; sääjakso laadullinen ilman lukuja). Ilmastoluvut teksteissä vain saatiedoista, ei lähdemainintoja. Korjattu työkalu kopioitu haaraan (tyokalu.mjs + PILVIOHJE).
- **PT:n osa 1 -päätökset:** Jerevanin matkakirjan valokuva: Abbas Mirzan tunnistus ei vahvistunut toisesta lähteestä → kuva vaihdettu vapaaseen vanhaan Sinisen moskeijan kuvaan (Joseph de Baye 1898, BnF/Gallica, PD, "Mosquée Géhu"), rakennusvuosi 1765–66; Bakun kysymys 4 uusittu (Bibi-Heybat 1846, ei paljasta vastausta); Nobel 1873 vain Robert; EPÄTARKAT luku 13:n mukaan (laajuus nimetty, superlatiivit pois/pehmennetty).
- **Beirut:** College Hall -kuva (Matson, k. 1977, alle 70 v) vaihdettu CC BY-SA 2.0 -kuvaan (marviikad, 2014); Botevin kuvien lisenssi "CC BY 3.0 PL".
- **Pehmennetty / pois kun toista lähdettä ei löytynyt:** Manaman korallikivipenger ja kääntösilta (vain QDL-arkiston hakutulos; sanamuoto "pengertie 1900-luvun alkupuolella"), Jerevanin kaupunkistatus 1879 ja ensimmäinen teatteri, Tbilisin jugendin ajoitus ja käsikirjoitukset, Abu Dhabin "alle 250 m" ja "satojatuhansia".
- Tarkistin `--verkko`: Tbilisi 0/2, Jerevan 0/1, Baku 0/0, Amman 0/1, Beirut 0/3, Abu Dhabi 0/2, Manama 0/0 (virheet/varoitukset; varoitukset pyöreitä lukuja, kohteita 4 < 6 Abu Dhabissa, Beirutin saatiedot puuttuu ja kansi.johdanto).

## Huomiot PT:lle

- **robots.txt:** Beirutin pistokoeagentti haki kaksi sivua (citypopulation.de ja Flickr, jotka kieltävät Claude-User) ennen kuin tarkisti niiden robots.txt:n; tietoja ei käytetty todisteena (väestöluvut ja kolikon metalli vahvistettu muista lähteistä). Pilviohjeeseen: robots.txt ennen jokaista hakua.
- Kysymysten oikea vastaus on usein indeksi 0 (Tbilisi aina): tarkista sekoittaako peli vaihtoehdot ajon aikana.
- `js/packs/paakaupungit.js` rivi 12 (Tirana) "noin kolmannes kansasta" kytkennässä (e01).
- Ramallah seuraavaksi paikallisesti (omistajan kortti: neutraalisti), haara paakaupungit-e03b-ramallah.
