# RAPORTTI e01 — Eurooppa 1: Balkan ja Itä-Eurooppa

## 1. Yleistä
- Erä e01, haara `paakaupungit-e01-pilvi`. Alku 2026-10-10 19:32 UTC, loppu 2026-10-11 00:37 UTC, kesto noin 5 h 5 min.
- Kaupungit: zagreb, belgrad, tirana, skopje, podgorica, chisinau, minsk, bratislava. Kaikilla vaiheet A–F tehty.
- Agenttiajoja 40 (8 kaupunkia × A, B, C, D, E; kaikki Sonnet, effort low; enintään 2 rinnakkain, B yksi kerrallaan, D eri agentti kuin A ja C). Lisäksi 3 jatko-ohjeviestiä kuva-agentille.
- Tokenit yhteensä noin 5,65 milj. (Agent-työkalun ilmoittamat). Vaiheittain noin: A 1,31 milj. · B 1,20 milj. · C 1,05 milj. · D 1,43 milj. · E 0,66 milj.
- Tarkistin `tarkista e01 --verkko` (tarkistus-kone.txt): 8 kaupunkia, 0 virhettä, 17 varoitusta.

## 2. Taulukko per kaupunki
| id | intro mrk | nostoja | kohteita/juttuja | kuvia (valittu/hylätty*) | kysymykset/tiedot | säärivi | D: VÄÄRIN/EPÄVARMA → korjattu | tarkistin: virheet/varoitukset |
|---|---|---|---|---|---|---|---|---|
| zagreb | 996 | 8 | 5/5 | 21 / ≥4 | 5/3 | kyllä | 10/14 → kyllä | 0/1 |
| belgrad | 1088 | 8 | 8/8 | 27 / ≥12 | 5/3 | kyllä | 7/10 → kyllä | 0/2 |
| tirana | 1008 | 8 | 8/8 | 26 / ≥8 | 5/3 | kyllä | 9/14 → kyllä | 0/5 |
| skopje | 1096 | 8 | 7/7 | 24 / ≥6 | 5/3 | kyllä | 6/18 → kyllä | 0/0 |
| podgorica | 792 | 8 | 6/6 | 23 / ≥14 | 5/3 | kyllä | 6/19 → kyllä | 0/3 |
| chisinau | 962 | 8 | 7/7 | 25 / ≥10 | 5/3 | kyllä | 8/8 → kyllä | 0/0 |
| minsk | 1031 | 8 | 7/7 | 25 / ≥17 | 5/3 | kyllä | 8/13 → kyllä | 0/6 |
| bratislava | 925 | 8 | 7/7 | 25 / ≥16 | 5/3 | kyllä | 4/11 → kyllä | 0/0 |

*Hylättyjen määrä on kuvat.md:n HYLÄTYT-osion rivimäärä (suuntaa antava).
Nostoja 8 = kansi 4 + teemasivu 4. Kuvat sisältävät ei-lukijan näkyviä kuvia vain kerran per tiedosto. Säädata Open-Meteosta (saa.json) kaikille.

## 3. Korjaamatta jätetyt varoitukset
- zagreb: kohteita 5 (pohjataso 6) — ks. kohta 4.
- belgrad (2), tirana (3): Commonsin lisenssi on maakohtainen portti ("CC BY-SA 3.0 rs", "CC BY 3.0 pl"); lähderivillä kansainvälinen muoto. Päätoimittaja päättää, hyväksytäänkö lähderivin muoto vai vaihdetaanko kuvat.
- tirana (2): kansi nosto 4 -kuvatekstissä lähdeviittaus lukijalle; yksi pyöreä suuruusluokka (lähteestä).
- podgorica (3), minsk (6): pyöreät luvut (esim. 10 000, 50 000, 300 000, 770 000, 30 000) — kaikki lähteestä "noin"-muodossa; vaiheet D/E eivät löytäneet tarkempaa lukua.

## 4. Poisjätetyt aiheet ja kohteet
- Kaikki: nykypolitiikka, nykysota, vaalit, nimikiistat (Pohjois-Makedonia), kaupunkien nykyhallinto; isoisän äänellä kirjoitetut tiedot ja merkinnät (tarinakaanon).
- zagreb: Gradec–Kaptol-kilpailu ja Verinen silta (jo pelissä); Pyhän Markuksen kirkko ja Ban Jelačić -aukio pois kartalta kuvapulan vuoksi → 5 kohdetta.
- belgrad: Mosaiikin yksiköt, kävijämäärä ja Knez Mihailovan pinta-ala (ristiriidat); Vinča-nosto kuvitettu Belo Brdon paikan kuvalla.
- skopje: Skopje 2014, nimikiista, Scupin bussiyhteys (vanhenee), matkustusturvallisuus.
- podgorica: Petrovićin linna (ei kelvollista kuvaa) → 6 kohdetta; Doclea 3 km ytimen ulkopuolella, vain nostoissa.
- chisinau: Katedraalipuisto pois kartalta (ohut faktapohja) → 7 kohdetta; Transnistria-maininta; "Bessarabian keskus vuodesta 1873" (käytetty vain 1812).
- minsk: Pietarin ja Paavalin kirkko (5 faktaa), Itsenäisyydenaukio, getto, kaupungintalo, IVY-päämaja, lentoyhteydet pakotteiden vuoksi, kuvauskielto.
- bratislava: Kempelen-nimi ja linnan vesiputki; Mikaelin portti ja Sininen kirkko eri kulmalla kuin maalehden nostot.
- Alle 6 kohdetta: zagreb (5) — kuvapula (Pyhän Markuksen kirkolle ja Ban Jelačić -aukiolle ei kelvollista kuvaa); muut ≥ 6.

## 5. Kevyen pisteen (paakaupungit.js) ja muut huomiot Päätoimittajalle
- Kruunajaisten viimeinen kerta Bratislavassa oli lähteiden mukaan 1830, ei 1700-luvun loppu (konteksti.json / fokuskohde).
- Zagrebin fokuskohde väittää Zagrebin olleen 1873 Kroatia-Slavonian pääkaupunki — lähteistä ei vahvistettu.
- Belgradin kevyen pisteen "noin 66 ha" on jokivarsipuiston hankkeen ala, ei linnoituksen; säälukujen ero (saa.json vs Wikipedia: tammikuu 0,2 vs 1,9 °C) on kirjattu; Skadarlija on katu (ei aukio).
- Tiranan kevyen pisteen kuvauksessa ristiriitoja (pääkaupunkivuosi, "kolmannes kansasta").
- Chișinăun `wiki`-avain on "Chișinău" (konteksti.json:n ehdotus "Chișinău (Kišinjov)" ei ole Wikipediassa).
- Vanhan sillan (podgorica) ja Ribnican linnoituksen koordinaatit sekä Kokonozin moskeijan ja Tabakkien sillan (tirana) koordinaatit tarkistettava kartalta; Kivisen portin (zagreb) Wikidata-koordinaatti matalatarkkuuksinen.
- Sääluvut ovat saa.json:sta (Open-Meteo); tekstit sanovat "mallinnettujen kuukausinormaalien mukaan", ja ristiriidat Wikipedian ilmastotaulujen kanssa on kirjattu huomioihin.
- Minskin sumukuva on talvinen vaikka kuvateksti koskee syksyä/kevättä; tarkista.
- Zagrebin, Podgorican, Minskin ym. matkustusturvallisuus nojaa Wikivoyageen: um.fi esti haun (403) kaikissa kaupungeissa → Sisältökirjuri/Mac tarkistaa.
- Kuvatekijä "Unknown author Unknown author" muutamassa vanhassa kuvassa (skopje, minsk, bratislava) sellaisenaan Commonsin Artist-kentästä.
- Ennen–nyt-paria ei löytynyt yhdellekään kaupungille (PD-vedos ≥ 1200 px).
- Wikimedian 429-rajoitukset hidastivat kuvatyötä (B noin 20–45 min per kaupunki).

## 6. Avoimet kysymykset
1. Hyväksytäänkö lähderivien kansainväliset lisenssimuodot (CC BY-SA 3.0 vs "rs/pl") vai vaihdetaanko kuvat?
2. Zagreb 5 kohdetta vai lisätäänkö kuvat Pyhän Markuksen kirkolle ja Ban Jelačić -aukiolle Macilla?
3. Minskin Trinity Suburb jätettiin pois kohteista — tuleeko se kartalle aukiona?
4. Kevyiden pisteiden virheet (kohta 5) korjataan paakaupungit.js:ään ennen integrointia?
5. Pelikaupungiksi vai kevyen pisteen lehdeksi: Zagreb, Podgorica ja Bratislava ovat ≤60 lautayksikköä pelikaupungista.
