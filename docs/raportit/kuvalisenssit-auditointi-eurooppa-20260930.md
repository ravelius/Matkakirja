# Kuvalisenssien auditointi — Euroopan nosto- ja maakuntakuvat (30.9.2026)

Tilaus: Päätoimittaja 30.9.2026 (Sisältökirjuri, Sonnet). Tämä on raportti puutteista maittain; korjaukset tulevat sen jälkeen erinä junaan.

## 1. Laajuus ja menetelmä

- **Kuvat:** kaikki Euroopan maiden (41) nosto- ja maakuntakuvat pelin datassa: js/packs/maastokohteet-*, hahmotelma-*, fokuskohteet-*, maalehtinostot-*, maakunnat-luonnehdinnat.js. Yhteensä **3 694 kuvaviitettä**, joista 246 on pelin omia havainnekuvia (ei Commons-lisenssiä) ja **3 448 Commons-kuvaa** (3 405 uniikkia tiedostoa).
- **Todennus verkosta:** jokaisen Commons-tiedoston lisenssi, tekijä ja koko haettu Commonsin rajapinnasta (extmetadata, imageinfo) ja verrattu pelin dataan. Hostatun kuvan (media.matkakirja.app) mitat luettiin ja verrattiin Commonsin alkuperäiseen (rajausten tunnistus).
- **Pelin oma vartija** (tools/kuvatekijat.mjs, tests/kuvatekijat.test.mjs) vaatii jo tekijän, lisenssin ja lähderivin tekstinä; tämä auditointi tarkistaa lisäksi, että URL:t ovat datassa, linkit renderöityvät (js/tekijakortti.js taytaLahderivi käyttää kentät lahdeUrl ja lisenssiUrl) ja että muokkaukset on merkitty.
- Ei muutettu yhtään kuvaa.

## 2. Yhteenveto

| Tarkistus | Tulos |
| --- | --- |
| Lisenssi kelvollinen (PD / CC0 / CC BY / CC BY-SA) Commonsissa | **3 445 / 3 448 OK.** Ei yhtään NC/ND-, GFDL- tai muuta lisenssiä. Jakauma (uniikkeja tiedostoja): CC BY-SA 2 401 (+ maakohtaiset 3.0/4.0-variantit), CC BY 429, CC0 182, PD 294. |
| Datan lisenssi = Commonsin lisenssi (suku ja versio) | **Täsmää kaikissa 3 445:ssä** — ei yhtäkään ristiriitaa |
| Tekijä datassa | **3 447 / 3 448.** Puuttuu 1: ITA fokuskohteet-ita.js[8] (PD, Commons: "Jeanne boleyn"). ~50 riviä "tuntematon"/käyttäjätunnus vs. oikea nimi: vaaraton |
| Lähde-URL (Commons-sivu) datassa | **3 245 / 3 448.** Puuttuu 203 (kaikki tiedosto-nimellä olevat, ei URL:ia → pelissä ei Commons-linkkiä) |
| Lisenssi-URL datassa | **3 229 / 3 448.** Puuttuu 219 (lisenssi ei linkkinä pelissä; teksti kuitenkin näkyy) |
| Lähde-URL toimii | **3 445 / 3 448.** 3 rikkinäistä (kirjoitusvirhe / koodaamaton merkki), ks. §4 |
| BY/BY-SA-kuva rajattu ilman muokkausmerkintää | **8 kuvaa** (GRC 4, PRT 3, NLD 1); 17 rajattua kuvaa on PD/CC0 (ei merkintävaatimusta) |

## 3. Maittain

Sarakkeet: kuvia = Commons-kuvia; BY-SA = niistä CC BY-SA; rikki = rikkinäinen lähde-URL; lis.URL- / lähdeURL- = puuttuva lisenssi- / lähde-URL datassa; rajattu = CC BY/BY-SA-kuvaa, joka on rajattu ilman muokkausmerkintää.

| ISO | Maa | kuvia | BY-SA | rikki | lis.URL- | lähdeURL- | rajattu |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| ALB | Albania | 16 | 12 | 0 | 2 | 1 | 0 |
| AUT | Itävalta | 109 | 83 | 0 | 0 | 0 | 0 |
| BEL | Belgia | 77 | 53 | 0 | 0 | 0 | 0 |
| BGR | Bulgaria | 113 | 85 | 0 | 24 | 20 | 0 |
| BIH | Bosnia ja Hertsegovina | 66 | 45 | 0 | 13 | 13 | 0 |
| BLR | Valko-Venäjä | 10 | 10 | 0 | 0 | 0 | 0 |
| CHE | Sveitsi | 92 | 78 | 0 | 0 | 0 | 0 |
| CYP | Kypros | 52 | 44 | 0 | 1 | 1 | 0 |
| CZE | Tšekki | 98 | 76 | 0 | 2 | 0 | 0 |
| DEU | Saksa | 117 | 89 | 0 | 21 | 21 | 0 |
| DNK | Tanska | 111 | 71 | 0 | 0 | 0 | 0 |
| ESP | Espanja | 115 | 86 | 0 | 0 | 0 | 0 |
| EST | Viro | 105 | 84 | 0 | 0 | 0 | 0 |
| FIN | Suomi | 116 | 69 | 0 | 0 | 0 | 0 |
| FRA | Ranska | 140 | 84 | 0 | 18 | 18 | 0 |
| GBR | Britannia | 61 | 37 | 0 | 1 | 1 | 0 |
| GRC | Kreikka | 133 | 101 | 1 | 35 | 34 | 4 |
| HRV | Kroatia | 104 | 80 | 0 | 19 | 19 | 0 |
| HUN | Unkari | 95 | 72 | 0 | 19 | 17 | 0 |
| IRL | Irlanti | 108 | 84 | 1 | 0 | 0 | 0 |
| ISL | Islanti | 67 | 42 | 0 | 0 | 0 | 0 |
| ITA | Italia | 113 | 77 | 0 | 16 | 16 | 0 |
| LTU | Liettua | 96 | 72 | 0 | 0 | 0 | 0 |
| LUX | Luxemburg | 44 | 35 | 0 | 0 | 0 | 0 |
| LVA | Latvia | 94 | 80 | 0 | 0 | 0 | 0 |
| MDA | Moldova | 42 | 30 | 0 | 1 | 1 | 0 |
| MKD | Pohjois-Makedonia | 12 | 8 | 0 | 1 | 1 | 0 |
| MLT | Malta | 60 | 51 | 1 | 1 | 1 | 0 |
| MNE | Montenegro | 25 | 19 | 0 | 1 | 1 | 0 |
| NLD | Alankomaat | 109 | 75 | 0 | 1 | 0 | 1 |
| NOR | Norja | 80 | 55 | 0 | 2 | 0 | 0 |
| POL | Puola | 99 | 78 | 0 | 0 | 0 | 0 |
| PRT | Portugali | 112 | 89 | 0 | 1 | 0 | 3 |
| ROU | Romania | 155 | 106 | 0 | 13 | 13 | 0 |
| RUS | Venäjä | 55 | 37 | 0 | 0 | 0 | 0 |
| SRB | Serbia | 28 | 24 | 0 | 1 | 1 | 0 |
| SVK | Slovakia | 78 | 69 | 0 | 0 | 0 | 0 |
| SVN | Slovenia | 97 | 46 | 0 | 0 | 0 | 0 |
| SWE | Ruotsi | 129 | 99 | 0 | 2 | 0 | 0 |
| TUR | Turkki | 35 | 21 | 0 | 24 | 24 | 0 |
| UKR | Ukraina | 80 | 70 | 0 | 0 | 0 | 0 |

Kaikki puuttuvat URL:t ovat pelin **käsin kirjoitetuissa** paketeissa (fokuskohteet-* 177, maalehtinostot-* 18, hahmotelma-* 8, maakunnat 15, maastokohteet 1); kierroksen 1–2 uudet nostot (30+30) ovat täysin kunnossa. Rivikohtainen lista: docs/raportit/kuvalisenssit-liite-20260930.tsv.

## 4. Löydökset ja korjausehdotus

**A. Rikkinäiset lähde-URL:t (3, kriittinen datassa, lisenssi itsessään kunnossa)** — linkki ei aukea, koska datassa on kirjoitusvirhe tai koodaamaton merkki:
- GRC HAHMOTELMA_GRC[29] (Heraion): `Ναός της **Ξ**ρας` → oikea `Ναός της **Ή**ρας - Heras Temple.jpg` (CC BY-SA 4.0, GrigorisKoulouriotis).
- IRL HAHMOTELMA_IRL[17] (Loughcrew): tiedostonimessä `?` (`Cairns S(?) and T`) katkaisee URL:n → koodaus `%3F`.
- MLT HAHMOTELMA_MLT[22] (Wied il-Għasri): `Ğ` → oikea `Għ`.

**B. Muokkausmerkintä rajatuille BY/BY-SA-kuville (8)** — hostattu kuva on rajattu (kuvasuhde poikkeaa Commonsin alkuperäisestä): GRC 4 (HAHMOTELMA_GRC[8].kuvat[0], [26].kuva, [26].kuvat[0], [27].kuva), PRT 3 (HAHMOTELMA_PRT[26].kuva ja .kuvat[1], [30].kuvat[0]), NLD Noord-Brabant (maakuntakuva). CC BY/BY-SA vaatii muutoksen merkitsemisen → lähderiville lisätään ", rajattu" (data, ei koodia). Kaikki muut hostatut kuvat ovat vain pienennettyjä (1 600–1 920 px), ja 3 hälytystä oli EXIF-kääntöä (ei rajausta).

**C. Puuttuva tekijä (1):** ITA fokuskohteet-ita.js[8]: PD-kuva, lähde "Wikimedia Commons (public domain)" → lisätään Commonsin tekijä.

**D. Puuttuvat URL:t datassa (203 lähde-URL, 219 lisenssi-URL):** johdetaan Commonsin tiedoista (sivu = File:-otsikko, lisenssi-URL = Commonsin LicenseUrl) ja lisätään riveille skriptillä; kuvia ei vaihdeta. Vaikutus: pelissä lähderivin "Wikimedia Commons" ja lisenssi tulevat linkeiksi.

**E. Pieni:** (i) FIN maastokohteet-fin.js 3 riviä, joilla lähdeteksti ei sisällä sanaa "Wikimedia Commons" → linkki ei renderöidy (lisätään sana). (ii) 160 riviä, joissa lisenssinimen kirjainkoko ("Public domain" vs "public domain") estää lisenssilinkin renderöinnin: PD ei vaadi linkkiä, ei vaikutusta lisenssiehtoihin (ei korjata ilman erillistä päätöstä; korjaus olisi taytaLahderivi-vertailun tekeminen kirjainkoosta riippumattomaksi, Pelikoodarin tiedosto).

**F. Tekoälyjohdannaiset ilman näkyvää viitekuvan attribuutiota (31 kuvaa, korjaus erä 3)** — 246 "omasta" havainnekuvasta 48 on johdettu Commons-valokuvista (datassa `tekija`, `lisenssi` ja `lahdeUrl` viitekuvalle), ja 31:llä viitekuvan tekijä ja CC BY / BY-SA / CC0 -lisenssi olivat vain datassa: pelaajalle näkyi pelkkä "Matkakirjan havainnekuva — lähdeperusteinen johdannainen". Pelillä on jo mekanismi (`viitteet: [{tekija, lisenssi, lisenssiUrl, sivu}]`, js/tekijakortti.js lisaaPohjaviitteet, käytössä kaupunkilehtien herokuvissa): lisätään kenttä, ja rivin perään tulee "Pohjana Wikimedia Commons -kuvat: Tekijä (CC BY-SA 3.0); havainnekuva CC BY-SA 4.0". Maat: CZE 4, FIN 6, FRA 3, NOR 3, POL 6, SWE 5, UKR 4. Ei koodimuutosta.

**G. Avoin kysymys (ei korjata ennen päätöstäsi):** FIN maastokohteet[0], [1], [3], [6] ("Matkakirjan oma havainnekuva", lisenssi "oma") mainitsevat Commons-tiedoston lähde-URL:ksi (Ridnitšohkka, Svedjehamn, Timber floating, Old Rauma). Jos tiedostoa on käytetty pohjakuvana (ei pelkkä paikkatieto), sama BY-SA-attribuutio kuin F:ssä tarvitaan; jos vain paikan viite, nykyinen merkintä riittää. EST 7 ja ISL 1 viittaavat matkailusivustojen URL:eihin (ei Commons), ei lisenssiongelmaa.

## 5. Päätökset / rajaukset

1. **Korjausjärjestys:** erä 1 = A + B + C + E(i) (PR #3681, junassa); erä 2 = D (203 lähde-URL + 180 lisenssi-URL, 12 pakettia); erä 3 = F (31 viitteet-kenttää). Kaikki datariviä, ei koodimuutosta.
2. **Ei kosketa:** 246 havainnekuvaa (oma tuotanto), Euroopan ulkopuoliset kuvat, muita kuin nosto/maakuntapaketteja (maa-artikkelit, kulttuuri-kategoriat, linssit).
3. **Kuvia ei vaihdeta.** Rikkinäisissä URL:issa korjataan vain osoite (kuva ja lisenssi ovat verkossa todennettu kunnossa).
