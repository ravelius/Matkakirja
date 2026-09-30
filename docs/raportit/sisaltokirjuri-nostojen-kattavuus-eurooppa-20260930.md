# Nostojen kattavuus Euroopassa — inventaario ja 30 ehdotettua lisäystä (30.9.2026)

Tilaus: Päätoimittaja 30.9. (Sisältökirjuri, Sonnet). **Vain ehdotus — ei sisältömuutoksia ennen hyväksyntää.**

## 1. Menetelmä

- Nostot = `keraaNostot` (tools/fokuskartta/nostot.mjs) -merkit, joiden `perhe === 'nosto'` (kartalla näkyvät
  maastokohteet, hahmotelmat, maalehtinostot, fokuskohteet + maakohtaiset lisäkerrokset). Luvut: 2 768 merkkiä,
  joista Euroopan maissa 41 maan ~1 700 nostoa.
- Sijoitus maakuntiin: merkin x,y → asteet (`laudaltaAsteiksi`) → pelin OMAT maakuntapolygonit
  (`/Users/Shared/Claude/pyramidi-poltto/krim-2026-09-30/maakunnat-2026-09-30a-25a/<ISO>.json+.bin`,
  Krim UKR:n alla; puraMaa/pisteAlueessa). Merimerkit (Pohjanmeri, Atlantti…) jäävät "ei aluetta".
- **Oletus:** kaupunkien sisäiset kohteet (Rooma, Venetsia, Firenze, Barcelona, Granada, Berliini, Lontoo,
  Varsova, Krakova, Amsterdam, Bukarest, Budapest, Wien, Tukholma, Oslo, Bergen…) kuuluvat pelin kaupunkeihin
  (map.cityCountry, kaupungin sisäiset kerrokset), eivät maakohtaisiin nostoihin. Siksi esim. Kolosseum,
  Sagrada Família, Brandenburgin portti ja Wawel EIVÄT ole ehdotuslistalla. Jos oletus on väärä, kerro.
- Ajettu 30.9. worktreessa origin/main @ bb724a8bf; skriptit scratchpadissa (voin liittää repoon).

## 2. Maakohtainen taulukko (Eurooppa, vähiten nostoja ensin)

| ISO | Maa | Nostoja | Pelin alueita | Alueita joilla 0 nostoa | Alueista katettu |
| --- | --- | ---: | ---: | ---: | ---: |
| ALB | Albania | 2 | 12 | 11 | 8 % |
| BLR | Valko-Venäjä | 2 | 7 | 5 | 29 % |
| MDA | Moldova | 2 | 39 | 37 | 5 % |
| MKD | Pohjois-Makedonia | 2 | 8 | 6 | 25 % |
| MNE | Montenegro | 2 | 21 | 19 | 10 % |
| SRB | Serbia | 2 | 24 | 22 | 8 % |
| LUX | Luxemburg | 17 | 3 | 1 | 67 % |
| MLT | Malta | 30 | 6 | 5 | 17 % |
| BEL | Belgia | 31 | 11 | 1 | 91 % |
| CYP | Kypros | 31 | 5 | 0 | 100 % |
| TUR | Turkki | 31 | 81 | 61 | 25 % |
| SVN | Slovenia | 32 | 12 | 0 | 100 % |
| ISL | Islanti | 33 | 9 | 1 | 89 % |
| SVK | Slovakia | 33 | 8 | 0 | 100 % |
| BIH | Bosnia ja Hertsegovina | 36 | 18 | 5 | 72 % |
| GBR | Britannia | 36 | 4 | 0 | 100 % |
| CHE | Sveitsi | 37 | 26 | 11 | 58 % |
| RUS | Venäjä | 38 | 84 | 59 | 30 % |
| NOR | Norja | 40 | 21 | 8 | 62 % |
| UKR | Ukraina | 40 | 27 | 9 | 67 % |
| LTU | Liettua | 42 | 10 | 0 | 100 % |
| LVA | Latvia | 42 | 5 | 0 | 100 % |
| EST | Viro | 46 | 15 | 1 | 93 % |
| HUN | Unkari | 47 | 20 | 3 | 85 % |
| IRL | Irlanti | 47 | 30 | 13 | 57 % |
| BGR | Bulgaria | 48 | 28 | 5 | 82 % |
| CZE | Tšekki | 49 | 14 | 1 | 93 % |
| DNK | Tanska | 49 | 5 | 0 | 100 % |
| POL | Puola | 49 | 16 | 2 | 88 % |
| ROU | Romania | 50 | 42 | 20 | 52 % |
| FIN | Suomi | 51 | 18 | 1 | 94 % |
| SWE | Ruotsi | 51 | 21 | 5 | 76 % |
| AUT | Itävalta | 52 | 9 | 1 | 89 % |
| HRV | Kroatia | 52 | 20 | 2 | 90 % |
| PRT | Portugali | 52 | 20 | 3 | 85 % |
| NLD | Alankomaat | 53 | 15 | 4 | 73 % |
| ESP | Espanja | 55 | 19 | 5 | 74 % |
| ITA | Italia | 56 | 20 | 3 | 85 % |
| DEU | Saksa | 60 | 16 | 3 | 81 % |
| GRC | Kreikka | 79 | 14 | 1 | 93 % |
| FRA | Ranska | 93 | 18 | 6 | 67 % |

Huom: TUR ja RUS koskevat koko maata; pelin alueita on 81/84 (suurin osa Aasiassa) — vain Euroopan osan kattavuus
on tässä relevantti: TUR Euroopan provinssit Edirne/İstanbul/Çanakkale ovat katetut, Kırklareli ja Tekirdağ 0;
RUS:n Euroopan puolella nolla-nostoisia: Kaliningrad, Leningrad, Arkhangel'sk, Bryansk, Kursk, Belgorod,
Voronezh, Rostov, Krasnodar, Saratov, Volgograd, Kalmukia, Orjol, Lipetsk, Tambov, Penza, Ivanovo, Kirov,
Mordva, Tšuvassia, Mari El, Udmurtia, Komi, Nenetsia, Samara, Baškortostan, Ul'yanovsk, Tver', Orenburg.

## 3. Ohut kattavuus — löydökset

**A. Kuusi maata, joilla vain 2 nostoa** (ALB, BLR, MDA, MKD, MNE, SRB): tuoreet maat, joilla on nyt pitkä+pulu
mutta vain fokuslehden 2 nostoa; alueita 7–39 per maa, ≥ 70 % alueista nostottomia. Selvästi kattavuuden pohja.
**B. Suuret maat suhteessa merkittävyyteen:** GBR 36 (FRA 93, DEU 60, ITA 56, ESP 55): Britannia jää
selvästi jälkeen (esim. Tower, Westminster ovat kaupunkia, mutta Jurassic Coast, Canterbury, Loch Ness puuttuvat);
TUR (Eur.) 31 ja UKR 40 (Kiova-maailman luonnon- ja Karpaattikohteet vähissä); RUS Euroopan puoli ohut (38, 29 nollaa).
**C. Nolla-alueet isoissa maissa** (alueita joilla 0 nostoa): 
- **DEU**: Mecklenburg-Vorpommern, Bremen, Berlin
- **ESP**: Ceuta, Melilla, Murcia, Canary Is., Islas Baleares
- **ITA**: Friuli-Venezia Giulia, Molise, Calabria
- **POL**: Opole, Lubusz
- **ROU**: Satu Mare, Arad, Bihor, Timis, Mehedinti, Dolj, Calarasi, Teleorman, Olt, Botosani, Vaslui, Galati, Bistrita-Nasaud, Salaj, Gorj, Covasna, Vrancea, Braila, Ialomita, Bucharest
- **CHE**: Thurgau, Aargau, Basel-Landschaft, Solothurn, Jura, Genève, Zug, Nidwalden, Obwalden, Appenzell Ausserrhoden, Appenzell Innerrhoden
- **NOR**: Troms, Oslo, Buskerud, Aust-Agder, Vest-Agder, Rogaland, Svalbard, Bouvet Island
- **SWE**: Västerbotten, Jämtland, Värmland, Västernorrland, Blekinge
- **UKR**: Rivne, Zhytomyr, Chernivtsi, Vinnytsya, Sumy, Luhans'k, Donets'k, Sevastopol, Kirovohrad
- **IRL**: Leitrim, Cavan, Monaghan, Dublin, Dún Laoghaire–Rathdown, Fingal, Carlow, Laoighis, South Dublin, Westmeath, Longford, Roscommon, North Tipperary
- **BGR**: Yambol, Haskovo, Razgrad, Targovishte, Pazardzhik
- **NLD**: Zeeland, Bonaire, St. Eustatius, Saba
- **HUN**: Szabolcs-Szatmár-Bereg, Zala, Somogy
- **PRT**: Bragança, Madeira, Azores
- **HRV**: Medimurska, Bjelovarsko-bilogorska
- **GBR**: ei nollia
- **FRA**: Guyane française, Martinique, Guadeloupe, Réunion, Mayotte, Corse
- **GRC**: Ayion Oros
(Rannikko-/merikohteet jäävät "ei aluetta" -riville, joten muutama nolla voi olla näennäinen: esim. Rogaland/Preikestolen.)
**D. Löydös omasta työstäni:** RUS-sisältöpaketeista (#3659/#3661/#3662) puuttuu 7 Euroopan puolen aluetta,
joilla on heittomerkki avaimessa (oma parserini ohitti ne): **Arkhangel'sk, Astrakhan', Perm', Ryazan', Tver',
Ul'yanovsk, Yaroslavl'** (pitka+pulu). Ehdotan niille yhtä pientä RUS erä 4 -PR:ää (aloitan jos hyväksyt).
Kaikilla muilla Euroopan mailla pitka+pulu on täydellinen (tarkistettu tiedostosta).

## 4. Ehdotus: 30 tärkeintä lisäystä

Luokat = nostojen tyyppiluokat. Kuvalähde = Wikimedia Commons -luokka; tiedostokohtainen lisenssi tarkistetaan
API:sta ja kuva katsotaan silmillä (PD/CC BY/CC BY-SA), kuten löydös 158:ssa.

| # | Nimi | Maa / alue | Luokka | Miksi | Commons-kuvalähde |
| ---: | --- | --- | --- | --- | --- |
| 1 | Rozafan linna | ALB / Shkodër | historia | Balkanin tunnetuin taru (muuriin muurattu nainen); Albania 2 nostoa | Category:Rozafa Castle |
| 2 | Beratin vanhakaupunki | ALB / Berat | kulttuuri | UNESCO, "tuhannen ikkunan kaupunki" | Category:Berat |
| 3 | Valbonan laakso | ALB / Kukës | vuori | Albanian Alppien tunnetuin luonto | Category:Valbona Valley National Park |
| 4 | Mirin linna | BLR / Grodno | historia | UNESCO, goottilainen linnoitus | Category:Mir Castle |
| 5 | Njasvižin linna | BLR / Minsk | historia | UNESCO, Radziwiłł-suvun palatsi | Category:Nesvizh Castle |
| 6 | Belovežin metsä | BLR / Brest | vuori/luonto (muut) | Euroopan vanhin aarniometsä, visentit | Category:Belovezhskaya Pushcha |
| 7 | Sorokan linnoitus | MDA / Soroca | historia | Dnestrin pyöreä linnoitus | Category:Soroca Fortress |
| 8 | Mileștii Mici | MDA / Ialoveni | ruoka | maailman suurin viinikokoelma (Guinness 2005) | Category:Mileștii Mici |
| 9 | Ohridinjärvi | MKD / Southwestern | järvi | UNESCO, Euroopan vanhimpia järviä | Category:Lake Ohrid |
| 10 | Matka-kanjoni | MKD / Skopje | vuori | Skopjen lähiluonto, luolat | Category:Matka Canyon |
| 11 | Stobi | MKD / Vardar | historia | antiikin kaupunki, teatteri | Category:Stobi |
| 12 | Kotorinlahti | MNE / Kotor | meri | UNESCO, Euroopan eteläisin "fjordi" | Category:Bay of Kotor |
| 13 | Ostrogin luostari | MNE / Danilovgrad | kulttuuri | kallioseinään rakennettu pyhiinvaelluskohde | Category:Ostrog Monastery |
| 14 | Taran kanjoni ja Đurđevića Tara -silta | MNE / Žabljak | joki | Euroopan syvimpiä kanjoneita | Category:Tara Canyon |
| 15 | Belgradin linnoitus (Kalemegdan) | SRB / Belgrade | historia | Savan ja Tonavan yhtymäkohta | Category:Belgrade Fortress |
| 16 | Studenican luostari | SRB / Raška | kulttuuri | UNESCO, Nemanjić-dynastian perustama | Category:Studenica Monastery |
| 17 | Đavolja varoš (Pirunkaupunki) | SRB / Toplica | vuori (muut) | erikoiset kivipylväät | Category:Đavolja Varoš |
| 18 | Neuschwanstein | DEU / Bayern | historia | Saksan tunnetuin linna; puuttuu | Category:Neuschwanstein Castle |
| 19 | Loreley ja Ylä-Reinin laakso | DEU / Rheinland-Pfalz | joki | UNESCO, Reinin romanttinen rotko | Category:Loreley |
| 20 | Schwerinin linna | DEU / Mecklenburg-Vorpommern | historia | UNESCO; alue 0 nostoa | Category:Schwerin Castle |
| 21 | Jurassic Coast / Durdle Door | GBR / England | meri | UNESCO-luonnonkohde; Britannia ohut | Category:Durdle Door |
| 22 | Canterburyn katedraali | GBR / England | historia | UNESCO, Englannin kirkon keskus (Becket) | Category:Canterbury Cathedral |
| 23 | Aquileia | ITA / Friuli-Venezia Giulia | historia | UNESCO, basilikan mosaiikit; alue 0 nostoa | Category:Aquileia |
| 24 | Amalfin rannikko | ITA / Campania | meri | UNESCO, Italian ikonisin rannikko | Category:Amalfi Coast |
| 25 | Teide | ESP / Kanariansaaret | vuori | Espanjan korkein huippu; alue 0 nostoa | Category:Teide |
| 26 | Serra de Tramuntana | ESP / Baleaarit | vuori | UNESCO-kulttuurimaisema; alue 0 nostoa | Category:Serra de Tramuntana |
| 27 | Svalbardin siemenholvi | NOR / Svalbard | tekniikka | maailman siemenvarasto; alue 0 nostoa | Category:Svalbard Global Seed Vault |
| 28 | Selimiyen moskeija | TUR (Eur.) / Edirne | historia | Sinanin mestariteos, UNESCO | Category:Selimiye Mosque |
| 29 | Kuurinkynnäs | RUS / Kaliningrad | meri/luonto | UNESCO, 98 km hiekkaniemi; Kaliningrad 0 nostoa | Category:Curonian Spit |
| 30 | Tšernivtsin yliopisto | UKR / Chernivtsi | kulttuuri | UNESCO, Hugo Wolf -kokonaisuus; alue 0 nostoa | Category:Chernivtsi National University |

Perustelu jakaumalle: 17 lisäystä kuuden 2-nostoisen maan pohjaksi (2–3 per maa), 13 isoihin maihin ja
nollaalueisiin (kaupunkien sisäiset kohteet rajattu pois). Vaihtoehtoja varalle: Loch Ness/Urquhart (GBR),
Kırklareli Dupnisa-luola (TUR), Valaam (RUS), Karpaattien pyökkimetsät/Rakhiv (UKR), Amalfin sijaan Calabria/Tropea,
Murcia/Cartagena (ESP), Trollfjord (NOR).

## 5. Seuraavaksi (kun hyväksyt)

1. Sisältö: nostotekstit + visat + kuvat (Commons, lisenssi API:sta) erinä à 10, PR per erä junaan.
2. RUS erä 4: Arkhangel'sk, Astrakhan', Perm', Ryazan', Tver', Ul'yanovsk, Yaroslavl' (pitka+pulu).
