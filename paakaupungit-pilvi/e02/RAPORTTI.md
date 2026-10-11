# RAPORTTI e02 — Eurooppa 2: Alppimaat, minivaltiot ja Islanti

## 1. Yleistä

- Erä e02, haara `paakaupungit-e02-pilvi`. Kaupungit: bern, vaduz, monaco, andorralavella, sanmarino, reykjavik.
- Alku 2026-10-10 21:59 UTC (vaihe 0), loppu 2026-10-11 00:29 UTC. Kesto noin 2 h 30 min.
- Agenttiajoja 30 (6 kaupunkia × vaiheet A–E, kaikki Sonnet, effort low, enintään 2 rinnakkain, B-vaihe aina yksi kerrallaan, D aina eri agentti kuin A ja C). Agenttien tokenit yhteensä noin 4,11 milj. (Agent-työkalun ilmoittamat):

| Vaihe | Tokenit noin |
|---|---|
| A faktapohja | 852 000 |
| B kuvat | 960 000 |
| C kirjoitus | 800 000 |
| D tarkistus | 983 000 |
| E korjaus | 513 000 |
| Yhteensä | 4 108 000 |

- Sää: Open-Meteo-rivit saatiin kaikille kuudelle (`saa.json`), mutta kaikkien kaupunkien sadearvot ovat epäilyttäviä (ks. luku 5).

## 2. Kaupunkikohtainen taulukko

Intro = `artikkeli.intro` mrk. Nostoja = kansi 4 + teemasivu 4. Kuvia = tarkistimen laskema valittujen kuvien määrä. Hylätyt = kuvat.md:n HYLÄTYT-lista (noin). D = VÄÄRIN/EPÄVARMA, kaikki korjattu vaiheessa E. Tarkistin = `tarkista e02 <id> --verkko`.

| id | intro | nostoja | kohteita/juttuja | kuvia (valittu/hylätty) | kysymykset/tiedot | säärivi | D: VÄÄRIN/EPÄVARMA → korjattu | tarkistin virheet/varoitukset |
|---|---|---|---|---|---|---|---|---|
| bern | 1083 | 8 | 6/6 | 24 / ~22 | 5/3 | kyllä | 4/12 → kyllä | 0/0 |
| vaduz | 865 | 8 | 5/5 | 21 / ~11 | 5/3 | kyllä | 9/8 → kyllä | 0/1 |
| monaco | 1098 | 8 | 7/7 | 23 / ~12 | 5/3 | kyllä | 10/20 → kyllä | 0/3 |
| andorralavella | 1076 | 8 | 6/6 | 24 / ~7 | 5/3 | kyllä | 6/14 → kyllä (2 EPÄVARMAA jätetty Päätoimittajalle) | 0/0 |
| sanmarino | 896 | 8 | 7/7 | 23 / ~7 | 5/3 | kyllä | 10/16 → kyllä | 0/0 |
| reykjavik | 1004 | 8 | 7/7 | 23 / ~16 | 5/3 | kyllä | 11/12 → kyllä | 0/1 |

Kaikissa: kansi + 1 teemasivu (bern ja reykjavik kuvataide, vaduz, andorralavella ja sanmarino historia, monaco tiede). Ennen–nyt-paria ei ole yhdelläkään (isoisän aikaista PD-vedosta ≥ 1200 px ei löytynyt). Hylättyjen määrät on laskettu kuvat.md:stä summittain.

## 3. Korjaamatta jätetyt varoitukset (tarkistus-kone.txt)

- vaduz: kohteita 5 (pohjataso 6), ks. luku 4.
- monaco (3 kpl): "pyöreä luku 100 000" kansinostossa 3 (lähde: 4 100 000 frangia, tarkka luku), teemanostossa T2 ja Valtamerimuseo-jutussa ("100 000 tonnia" La Turbien kiveä). Luku on Valtamerimuseon en-Wikipedia-artikkelissa; tekstit on muotoiltu "lähteen mukaan". Tonnin laji (tonni vs. lyhyt tonni) on lähteessä epäselvä.
- reykjavik: Viðey-juttu, "noin kaksi miljoonaa vuotta sitten" (lähteen mukainen "noin", ilmaistu varauksella).

Koneajossa 6 kaupunkia: 0 virhettä, 5 varoitusta.

## 4. Poisjätetyt aiheet ja alle 6 kohteen perustelut

- Vaduz, 5 kohdetta: hallitusrakennus (Regierungsgebäude, Q2137745), Punainen talo, Engländerbau ja raatihuone mainitaan vain fi-lähteessä ilman koordinaatteja; Wikidata ei vastannut. Kunstmuseumin koordinaatti (47.13944, 9.52250) tarkistettiin D-vaiheessa OK:ksi.
- Bern: orjakauppa, Gurlitt-perintö, Internationaalit ja nykypolitiikka jätetty pois; Nydeggbrücke ja Marzilibahn eivät ole rakennus/aukio/luonto-kohteita; Käfigturm-, Kornhaus- ja Rosengarten-lähteitä ei saatu, joten luontokohdetta ei ole. Goldene Handfeste 1218 ja Niklaus Manuel jätettiin lähderistiriitojen vuoksi.
- Monaco: Mentonin ja Roquebrunen osuuden luvut ovat lähteissä ristiriitaiset (95 % / 80 %), joten luku jätettiin pois. Ei kasinon tai veroparatiisin nykykiistoja. Salle Garnier on noin 70 m kasinosta (numeroympyrät voivat peittyä; kohde voidaan pudottaa).
- Andorra: Plaça del Poble ja Barri Antic eivät ole omina kohteinaan (ei en-Wikipedia-artikkelia). Verotus- ja veroparatiisikiistat pois.
- San Marino: ennen–nyt-pari jätetty pois (Cassarinin vedoksen vuosi epävarma).
- Reykjavík: Islanti-aluelehden ja maalehden aiheet pois.
- Kaikki: nykypolitiikka, nykysota, isoisän äänellä kirjoitetut tiedot ja tarinakaanon (Päätoimittajan osuus).

## 5. Kevyen pisteen (paakaupungit.js) havainnot ja muut huomiot Päätoimittajalle

- **Reykjavík, kevyt piste:** "Dómkirkjan (… 1790-luvulta)" on virhe. En-Wikipedian mukaan ensimmäinen kirkko rakennettiin 1787 ja purettiin 1847; nykyisen rakennuksen vuotta ei anneta.
- **Suojattu kuvamotiivi (Reykjavík):** kevyen pisteen kuvauksessa Hallgrímskirkja ja Harpa on merkitty "ei kuvamotiivina: suojattu". Sisällössä niiden kuvia on kohdejutuissa, kansikuvassa 3 (Harpa) ja matkailijalle-kuvassa (Hallgrímskirkja, pilvinen taivas). Päätoimittaja päättää, koskeeko merkintä näitä.
- **Sadearvot:** `saa.json`-sadesummat näyttävät kaikilla kaupungeilla epäilyttäviltä (esim. Vaduz 1 724 mm vs. noin 900 mm Wikipediassa; Reykjavík noin 1 480 mm; Andorra helmikuu 13 mm / kesäkuu 139 mm). `saatiedot` on kopioitu sellaisenaan ja luonnehdinnat kirjoitettu varovasti ("suuntaa-antavia"). Syy on todennäköisesti Open-Meteo-haun tulkinta tai mittausjakso; tarkista `tools/hae-saaperusdata.mjs` ennen integrointia.
- **Wiki-avaimet:** monaco `kaupunki.wiki` = "Principality of Monaco" (en-uudelleenohjaus; "Monaco (kaupunki)" ja "Monaco-Ville" eivät kelvanneet). sanmarino `San Marino (kaupunki)` läpäisi tarkistimen. Päätoimittaja vahvistaa Monacon avaimen.
- **Kuvat:** Monacon N3 Mentonin kartta on tekijätön (lähderivi Gallica/BnF, PD). Andorran T1-karttalehden Artist-kenttä on sekava. Bernin valokuva (karhukuoppa-vedos) sisältää vedoksen oman painetun otsikon. San Marinon Lincolnin kirje (T4) sisältää käsinkirjoitettua tekstiä kuvassa. Reykjavíkin matkailijalle-kuva on pilvinen, ja Reykjavíkin ainoa ennen-vedos on 1880-luvulta (ei 1873).
- **Koordinaatit:** San Marinon basilikan ja Palazzo Pubblicon Wikipedia-koordinaatit ovat noin 5 m päässä toisistaan; basilikan piste kannattaa tarkistaa Wikidatasta (Q810102). Monacon Jardin Exotique korjattu Wikivoyagen pisteeseen 43.73151, 7.41378. Viðey: rajat.ita laajennettu −21.8300:aan.
- **Jagger (Monaco):** lähteet antavat tapaukselle 1873 (kasinoartikkeli) ja noin 1881 (Jaggerin artikkeli); yhteys isoisän matkavuoteen poistettiin.
- **Lentoasemat:** bern Bern-Belp (BRN), monaco Nice Côte d'Azur (NCE), andorralavella Andorra–La Seu d'Urgell (LEU), sanmarino Rimini–San Marino (Federico Fellini; IATA-koodia ei luettu lähteestä), reykjavik Keflavík (KEF), vaduz ei lentokenttää (lähin Zürich, koodi ei luettu lähteestä).
- **Matkustusturvallisuus:** um.fi vastasi 403 eikä Wikivoyagea/um.fi:tä voitu lukea kattavasti, joten oppaissa ei ole viranomaisviittauksia.
- **Muu:** Pont de la Margineda (silta) on Andorran kartalla tyyppiä rakennus; San Marinon Montale- ja Cesta-rakennusajat ovat lähteissä ristiriitaiset ja ne on kirjoitettu varauksin; Andorran Halévy-noston kuva on Sant Esteven sisätila; Andorran valokuvan `vuosi` on arvio "2010-luku".
- **Sivuhuomio:** kaksi Commons-rajapinnan 429-virhettä hidasti B-vaiheita; ensimmäinen koko erän `tarkista --verkko` -ajo päättyi koodiin 2 (tyhjä tuloste), ja ajo toimi kun kaupunkien id:t annettiin komennossa.

## 6. Avoimet kysymykset Päätoimittajalle

1. Koskeeko "ei kuvamotiivina: suojattu" (Hallgrímskirkja, Harpa) myös kansi-, nosto- ja matkailijalle-kuvia?
2. Kelpaako Monacon wiki-avaimeksi "Principality of Monaco", vai valitaanko oma?
3. Kelpaavatko Bernin karhukuoppa-vedos (painettu otsikko) ja Monacon tekijätön Mentonin kartta?
4. Saako Reykjavíkin ennen–nyt-pariksi 1880-luvun vedoksen (ei isoisän vuodelta)?
5. Tarkistetaanko `saa.json`-sadearvot ennen integrointia?
