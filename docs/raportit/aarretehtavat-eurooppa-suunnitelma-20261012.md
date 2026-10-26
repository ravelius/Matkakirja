# Aarretehtävät kaikkiin Euroopan kaupunkeihin: suunnitelma (ei sisältöä vielä)

Sisältökirjuri 12.10.2026 (PT:n tilaus; omistaja 12.10. klo 11.2x: "aarretehtävät voi ottaa käyttöön ja voit ideoida niitä kaikkiin kaupunkeihin"). **VAIN EUROOPPA.** Tämä on suunnitelma PT:n hyväksyttäväksi; tehtäväsisältöä ei ole kirjoitettu (paitsi pilotin kolme kaupunkia, `aarretehtavat-kokeilu-20261012.json`). Lähteet: moottori `Assets/Matkakirja/Peli/Aarretehtavat.cs` (Pelikoodari), kaupunkilista `aanet-eurooppa-inventaario-20261011.md`, 3D-lista `tools/pollo/sallitut.js` (37 kaupunkia), kohdekartat `js/packs/maakartat.js` KAUPUNKIKARTAT, maat `js/packs/europe-countries.js`, kaanon `docs/tarina.md`.

## 1. Yhteenveto

| | |
|---|---|
| Kaupunkeja (kaupunkilehti tai saapumisintro) | **64** (50 pelilaudan kaupunkia/aluetta + 14 pääkaupunkipistettä; Vatikaanivaltiolla ei ole lehteä, joten pois) |
| Maita | **44** |
| Joista hyvän 3D:n kaupunkeja (Katso ja löydä sallittu) | 37 |
| Saapumisintro (nopea intro) | 45 |
| Tehtäviä yhteensä | **114** (pelilaudan 50 kaupunkia × 2 + pääkaupunkipisteet 14 × 1); valmiina pilotissa 6, uusia **108** |
| Lajit | 4 nykyistä + 2 moottorin lisäystä, jotka kattavat 3 uutta lajia (luku 3) |
| Palkkiot yhteensä (oletushinnoin) | noin 8 500 £; erillisiä bonuksia ei tehdä (luku 6) |

## 2. Kaupunkilista ja tehtävät

Jokaiselle pelilaudan kaupungille **kaksi** tehtävää: **a = löytötehtävä** (Katso ja löydä hyvän 3D:n kaupungeissa; muualla Etsi kartalta; kaupungeille ilman kohdekarttaa Valinta) ja **b = toinen laji** (kierrätetty tasaisesti lajien kesken). Pääkaupunkipisteille (ei introa, ei kaaria) **yksi** tehtävä. * = ehdollinen: Kuuntele vaatii olemassa olevan matkakirjaluennan (`puhe-fokus-matkakirja-<id>`, fokusvirtapakin `matkakirja.aanite`), Vanha kartta vaatii PD-karttakuvan Commonsista; jos ei löydy, vaihdetaan Aikajanaan. 3D-sarake = `sallitut-3d` (Kööpenhamina mukana). Pilottikaupungit (Ateena, Pariisi, Tukholma) on jo kirjoitettu.

| Maa | Kaupunki | 3D | Intro | a | b |
|---|---|---|---|---|---|
| ALB | Tirana | – | – | Etsi kartalta | – |
| AND | Andorra la Vella | – | – | Etsi kartalta | – |
| AUT | Wien | ✓ | ✓ | Katso | Arvio |
| BEL | Bryssel | ✓ | – | Katso | Vanha kartta* |
| BGR | Sofia | ✓ | ✓ | Katso | Vanha kartta* |
| BIH | Sarajevo | – | ✓ | Etsi kartalta | Kuuntele* |
| BLR | Minsk | – | – | Etsi kartalta | – |
| CHE | Alpit | – | ✓ | Valinta | Salakirjoitus |
| CHE | Bern | – | – | Etsi kartalta | – |
| CZE | Praha | ✓ | ✓ | Katso | Arvio |
| DEU | Berliini | ✓ | ✓ | Katso | Salakirjoitus |
| DNK | Kööpenhamina | ✓ | ✓ | Katso | Aikajana |
| ESP | Barcelona | ✓ | ✓ | Katso | Arvio |
| ESP | Granada | ✓ | ✓ | Katso | Kuuntele* |
| ESP | Madrid | ✓ | ✓ | Katso | Aikajana |
| ESP | Sevilla | ✓ | ✓ | Katso | Salakirjoitus |
| EST | Tallinna | – | ✓ | Etsi kartalta | Kuuntele* |
| FIN | Helsinki | ✓ | ✓ | Katso | Vanha kartta* |
| FIN | Lappi | – | ✓ | Valinta | Arvio |
| FIN | Tampere | ✓ | ✓ | Katso | Aikajana |
| FRA | Marseille | ✓ | ✓ | Katso | Arvio |
| FRA | Pariisi (pilotti) | ✓ | ✓ | Katso | Arvio |
| GBR | Edinburgh | ✓ | ✓ | Katso | Aikajana |
| GBR | Lontoo | ✓ | ✓ | Katso | Salakirjoitus |
| GRC | Ateena (pilotti) | ✓ | ✓ | Katso | Aikajana |
| GRC | Kreeta | ✓ | ✓ | Katso | Vanha kartta* |
| HRV | Dubrovnik | – | ✓ | Etsi kartalta | Vanha kartta* |
| HRV | Zagreb | – | – | Etsi kartalta | – |
| HUN | Budapest | ✓ | ✓ | Katso | Aikajana |
| IRL | Dublin | ✓ | ✓ | Katso | Salakirjoitus |
| ISL | Islanti | ✓ | ✓ | Katso | Salakirjoitus |
| ISL | Reykjavík | – | – | Etsi kartalta | – |
| ITA | Firenze | ✓ | ✓ | Katso | Arvio |
| ITA | Rooma | ✓ | ✓ | Katso | Aikajana |
| ITA | Sisilia | ✓ | ✓ | Katso | Vanha kartta* |
| ITA | Venetsia | ✓ | ✓ | Katso | Vanha kartta* |
| LIE | Vaduz | – | – | Etsi kartalta | – |
| LTU | Vilna | ✓ | ✓ | Katso | Aikajana |
| LUX | Luxemburg | ✓ | – | Katso | Vanha kartta* |
| LVA | Riika | – | ✓ | Etsi kartalta | Vanha kartta* |
| MCO | Monaco | – | – | Etsi kartalta | – |
| MDA | Chișinău | – | – | Etsi kartalta | – |
| MKD | Skopje | – | – | Etsi kartalta | – |
| MLT | Valletta | ✓ | – | Katso | Aikajana |
| MNE | Podgorica | – | – | Etsi kartalta | – |
| NLD | Amsterdam | ✓ | ✓ | Katso | Aikajana |
| NOR | Bergen | ✓ | ✓ | Katso | Kuuntele* |
| NOR | Oslo | ✓ | ✓ | Katso | Kuuntele* |
| NOR | Tromssa | – | ✓ | Etsi kartalta | Arvio |
| POL | Krakova | ✓ | ✓ | Katso | Salakirjoitus |
| POL | Varsova | – | ✓ | Etsi kartalta | Salakirjoitus |
| PRT | Lissabon | ✓ | ✓ | Katso | Arvio |
| ROU | Bukarest | ✓ | ✓ | Katso | Arvio |
| RUS | Moskova | – | ✓ | Etsi kartalta | Kuuntele* |
| RUS | Pietari | – | ✓ | Etsi kartalta | Aikajana |
| SMR | San Marino | – | – | Etsi kartalta | – |
| SRB | Belgrad | – | – | Etsi kartalta | – |
| SVK | Bratislava | – | – | Etsi kartalta | – |
| SVK | Kassa | ✓ | – | Katso | Aikajana |
| SVN | Ljubljana | ✓ | – | Katso | Aikajana |
| SWE | Tukholma (pilotti) | ✓ | ✓ | Katso | Salakirjoitus |
| TUR | Istanbul | – | ✓ | Etsi kartalta | Kuuntele* |
| UKR | Kiova | – | ✓ | Etsi kartalta | Arvio |
| UKR | Odessa | – | ✓ | Etsi kartalta | Salakirjoitus |

Huom: 13 pelilaudan kaupunkia (Sarajevo, Tallinna, Dubrovnik, Riika, Tromssa, Varsova, Moskova, Pietari, Istanbul, Kiova, Odessa, Alpit, Lappi) ei ole hyvän 3D:n, joten niissä a = Etsi kartalta (Linssiseppä ei tunnista 3D-napautusta); myös kaikki 14 pääkaupunkipistettä käyttävät Etsi kartalta. Alpit ja Lappi eivät ole 3D:ssä eikä niillä ole kohdekarttaa: a = Valinta.

Henkilö: jokaisessa kaupungissa tehtävän antaa kaupungin oma kohtaamishahmo (kaari tai fokusvirta; pilotissa konservaattori Dafni, bukinisti Colette, lyhdynsytyttäjä Astrid). **Kukaan ei tunnista Horatiota** (tarina.md 7.9.). Puuttuvalle henkilölle kirjoitetaan arkinen paikallinen ammatti (ei historiallisia henkilöitä).

## 3. Lajit

Nykyiset (moottorissa): **Katso ja löydä**, **Aikajana**, **Arvio**, **Salakirjoitus**. Uudet 3 lajia, jotka vaativat moottoriin vain **kaksi uutta `TehtavaLaji`-arvoa** (Valinta ja Kartta):

1. **1873 vs. nyt** (Valinta + kuva): näytetään kaupungin 1873-havainnekuva (saapumisintron kuva 8, kun pilotti on hyväksytty) ja kysytään: "Mikä näistä ei vielä ollut paikalla 1873?" Kolme vaihtoehtoa, yksi oikea. Faktat ovat samoja, jotka on jo varmistettu kahdesta lähteestä kuvan 8 ohjeissa (esim. Pariisi: Eiffel-torni 1889 ei vielä, Tuileries-rauniot kyllä). Ei kuvaa → ei tehtävää: **vain kaupunkeihin, joissa intron kuva 8 on hyväksytty** (PT 12.10.); alkuun korkeintaan 3 pilottia, ja vasta kun omistaja on hyväksynyt kuvat.
2. **Kuuntele** (Valinta + ääni): soitetaan kaupungin olemassa oleva isoisän matkakirjaluenta (`puhe-fokus-matkakirja-<id>`, fokusvirtapakin `matkakirja.aanite`; Euroopan vanhat saapumisluennat eivät ole enää käytössä) ja kysytään yksi asia luennasta tai paikasta, jonka luennassa mainitaan. Ei uusia ääniä, ei generointia.
3. **Vanha kartta** (Kartta): PD-karttakuva (Commons, 1800-luku, esim. Baedeker tai kaupunkikartta); "Napauta kohtaa, jossa …" (tähtäin sallii toleranssin). Vain jos kaupungille löytyy vapaasti lisensoitu kartta; muuten Aikajana.

**Etsi kartalta** = sama Kartta-laji nykyaikaisella kohdekartalla (KAUPUNKIKARTAT, 60 Euroopan kaupungilla on kohteet nimillä ja koordinaateilla). Moottorimuutos: **Valinta** (kysymys + 3–4 vaihtoehtoa + oikea + valinnainen kuva tai ääni) ja **Kartta** (kuva tai kohdekartta + oikea piste + toleranssi). Pelikoodari tekee ne suunnitelman hyväksynnän jälkeen. Aikajana, Arvio ja Salakirjoitus toimivat sellaisinaan.

## 4. Maan aarrevihje (PT:n päätös 12.10.: nykyinen aarremekaniikka ei muutu)

Kanoni ja mekaniikka: Euroopan unohdettu aarre on **Kolme veljestä** (tarina.md); mysteeri on tuntematon kulkija; **paikallisaarteet ovat maan pari (pieni + iso)** (`js/packs/paikallisaarteet.js`) ja löytyvät **laudalta kuten nyt** (Raamattu, AARTEET). Tehtävät eivät muuta sitä eivätkä korvaa löytöä, vaan antavat **vihjeen**:

- Kun pelaaja on ratkaissut maan tehtävistä **3** (tai kaikki, jos maalla on vähemmän), isoisän merkintä paljastaa maan **ison paikallisaarteen kaupungin**, ja kaupunki **merkitään kartalle isoisän merkinnällä**. Ilman vihjettä iso aarre löytyy edelleen laudalta kuten nyt.
- **Vihje tulee kolmessa tasossa maan tehtävistä riippumatta järjestyksestä:** 1. tehtävä → ensimmäinen merkintärivi (arvoituksenomainen, ei kaupunkia), 2. tehtävä → toinen rivi (lähempi), 3. tehtävä → kolmas rivi, joka nimeää kaupungin. Datassa maa-arvoitus: `iso3`, `kaupunki`, `vihjeet[3]`; moottori laskee maan ratkaistut tehtävät. Maat, joilla on vain kaksi tehtävää (yksikaupunkimaa), saavat vihjeen kahdesta tehtävästä: 2. rivi nimeää kaupungin.
- Kaupunki on se, jonka legendaan iso aarre sopii (esim. Rudolf II:n kabinetti → Praha; Caravaggion varastettu maalaus → Palermo eli "Sisilia"; Ivalojoen kultahippu → Lappi; hansakauppiaan hopeakätkö → Tallinna; Wilhelm Tellin varsijousi → Alpit). Taru merkitään tarukseksi (ei esitetä löytönä).
- **Kolme veljestä pysyy pilotissa:** Ateenan, Pariisin ja Tukholman palat kokoavat Euroopan unohdetun aarteen jäljen; muut maat eivät lisää Kolme veljestä -paloja eivätkä paljasta kulkijan henkilöllisyyttä.
- **10 maalla** (ALB, AND, BLR, LIE, MCO, MDA, MKD, MNE, SMR, SRB; kaikki pääkaupunkipisteitä) ei ole vielä paikallisaarreparia (`paikallisaarteet.js`: 35 maata kirjoitettu, 44 tarvitaan). **Parit kirjoitetaan tekstinä samassa projektissa** (tosi fakta; legendat merkitään taruiksi; kuvat vain Commonsin PD/CC0/CC BY -kuvista; Codex vasta omistajan luvalla).

## 5. Faktojen tarkistus

- Kahden lähteen sääntö: jokainen väite (vihjelause, kohde, tiesitko, vuosiluku, määrä) varmistetaan **kahdesta itsenäisestä lähteestä**; epävarma jätetään pois tai ilmaistaan väli (kuten Arvio-lajissa). Lähteet kirjataan liitteeseen, kuten pilotin `aarretehtavat-kokeilu-faktat-20261012.md`.
- Menetelmä: Sonnet-agentit tarkistavat erän faktat itsenäisenä toisena kierroksena (kirjoittaja ≠ tarkistaja); yhdessä tehtävässä noin 3 väitettä, koko laajuudessa noin 340. Opus tai minä luen kielen ja tarinakaaren (Horatiota ei tunnisteta; ei elävien henkilöiden suojattuja teoksia; Commons-kuvat vain PD/CC0/CC BY).
- 1873-tehtävät (laji 1) käyttävät samoja faktoja kuin kuvan 8 ohje; ne on jo varmistettu kahdesta lähteestä pilotin kolmessa kaupungissa.

## 6. Palkkiot ja vaikeustaso

- **Palkkiot** (moottorin oletukset, talous 300: yksi tehtävä ≈ yksi kyyti tai bussi): Katso 60, Etsi kartalta 60, Valinta 60, Kuuntele 70, Aikajana 80, Vanha kartta 90, Arvio 100, Salakirjoitus 120; toinen yritys puolet. Oletushinnoin kaikki 114 tehtävää antavat noin 8 500 £, eli keskimäärin ~75 £ per tehtävä ja ~150 £ per kaupunki. **Erillisiä bonuksia ei tehdä** (PT 12.10.): vihje ja aarteen oma arvo (500–800 p) riittävät. Tehtäväpalkkiot oletuksin; Pelikoodari tarkistaa talouden tasapainon ennen kytkentää.
- **Vaikeustaso 13+ ja aikuiset (ei lastenpeli):** taso 1 = Katso, Etsi kartalta, Valinta, Kuuntele (kohde tai vastaus löytyy kaupungista tai luennasta); taso 2 = Aikajana, Arvio, Vanha kartta (vaatii tietoa tai päättelyä); taso 3 = Salakirjoitus, 1873 vs. nyt (vaatii huolellista lukua). Jokaisessa kaupungissa a = taso 1 ja b = taso 1–3. Väärä vastaus → vihje henkilön äänellä, toinen yritys; tiesitko-teksti ≤ 160 merkkiä.
- Ei tapaturmia, väkivaltaa tai poliittisesti arkoja kysymyksiä (Kiova, Odessa, Moskova, Minsk: vain kulttuuri- ja historia-aiheita 13+).

## 7. Erät

1. **Tämä suunnitelma** (docs-PR) → PT:n hyväksyntä.
2. **Mallierä, 5 kaupunkia** → PT tarkistaa: **Praha** (3D, yksikaupunkimaa, intro, luenta), **Rooma** (3D, monikaupunkimaa ITA 4), **Helsinki** (3D, kotimarkkina; FIN 3 kaupunkia), **Tallinna** (ei 3D, intro; Etsi kartalta), **Bern** (pääkaupunkipiste, ei introa; Etsi kartalta, yksi tehtävä). Kattaa 3D- ja ei-3D-polun, yksi- ja monikaupunkimaan, pääkaupunkipisteen. Mallierässä ei käytetä vielä uusia lajeja, jotka vaativat moottoria (ne kirjoitetaan sisältönä, mutta kytkentä odottaa Pelikoodaria).
3. **Loput erinä** (noin 10 kaupunkia/erä, 5–6 erää): ensin 3D-kaupungit (37), sitten ei-3D-kaupungit (13), lopuksi pääkaupunkipisteet (14).
4. Pelikoodari tekee moottorin uudet lajit vasta hyväksynnän jälkeen; Natiivi-UI näkymät; Linssiseppä 3D-tunnisteet (Katso).

## 8. PT:n päätökset 12.10. (kaikki hyväksytty)

1. 114 tehtävää: kyllä.
2. Maan aarrejälki muutettuna: vihje, ei mekaniikan muutosta (luku 4); 10 puuttuvan maan parit tekstinä.
3. Uudet lajit ja moottorin lisäykset (Valinta, Kartta): kyllä; 1873 vs. nyt vain hyväksytyn intron kuvan 8 kaupunkeihin.
4. Mallierä: Praha, Rooma, Helsinki, Tallinna, Bern: kyllä. Tuotos: `aarretehtavat-eurooppa-malli-20261012.json/.md` ja faktaliite.
5. Erillisiä bonuksia ei tehdä.
