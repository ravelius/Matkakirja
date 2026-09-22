# Piirtokoe-taulukko: Macin Safari, v2125 (22.9.2026)

Laitetestaaja, Mac Studio, oikea Safari (ei Playwright). Peli mainista
(470031e60, "Piirtokoe-valikko ja kehysprofiilin kytkin", #2845).
Työkalu: `tools/mittaus/piirtokoe-mittaus.mjs` — käyttää pelin
sisäänrakennettua synteettistä vetoa (`window.__kehysprofiili.veto()`,
dispatchaa PointerEventit itse), koska CGEvent ei liikuta karttaa tässä
ympäristössä (ks. `tools/mac/aikajana-mittaus.md`). Kamera: Marseille,
`pointOfView({ lat: 46.5, lng: 2.5, altitude: 0.2 })`. Veto: 80 px/s,
suunta [1, 0.3], 10 s. Neljä koetta samalla Safari-instanssilla
(peruskäynnistys jokaisen välissä, jotta yksi selainprosessi ei kanna
edellisen kokeen jäännöskuormaa).

## Kehysmäärä-anomalia (22.9.2026 aiempi ajo) — juurisyy löydetty ja korjattu

Edellisen session neljä mittausta (`piirtokoe-mac-safari-2026-09-22.jsonl`)
saivat kaikki saman ~47 kehyksen otoksen `kesto`-parametrista (10 000 ms)
riippumatta. Syy: kaikki neljä URL:ia sisälsivät `koe=profiili`-lipun.
Se asentaa `js/pallolauta/profiilinaytto.js`:n rullaavan ruutunäytön
(`luoProfiilinaytto`, PR #2844/#2845), joka kutsuu `__kehysprofiili
.lopeta()` ja heti perään `.aloita()` uudestaan **3000 ms:n välein**
(`PROFIILIN_JAKSO_MS`) — samaan globaaliin `tila`-muuttujaan, jota myös
tämän työkalun oma `veto()`-kutsu käyttää sisäisesti aloita()/lopeta()-
parillaan. Kumpikin (ruutunäyttö ja oma mittaus) omistaa `tila`n
vuorotellen: kun `veto()` lopulta kutsuu `lopeta()`a, se saa ruutunäytön
SENHETKISEN ~3 s:n jakson kehykset, ei omaa 10 s:n vetoaan. Kaksi
rinnakkaista `aloita()`/`lopeta()`-syklistä samalla singletonilla
kilpailevat aina, kun `profiili`-lippu on päällä samalla sivulla kuin
oma mittaus.

**Korjaus** (`tools/mittaus/piirtokoe-mittaus.mjs`): pudotettu
`profiili`-lippu URL:eista. `asennaKehysprofiili()` (`lauta.js`)
asentuu jo millä tahansa `koe=`-arvolla (`piirtokokeet().size` riittää,
ei erillistä `profiili`-ehtoa), joten normaalikokeelle riittää
merkityksetön placeholder-lippu `koe=mittaus`. Tulos: 589–600 kehystä
per koe (oikea 10 s:n otos ~59 Hz:llä) aiemman ~47:n sijaan.

**Pelikoodarille** (Fablen välitettäväksi): jos ruutunäyttö
(`?koe=profiili`) ja oma `__kehysprofiili.veto()`-mittaus halutaan joskus
yhdessä samalle sivulle, `luoProfiilinaytto` tarvitsee oman
mittausikkunansa erilliseen tilaan (ei jaettua singletonia) — nyt ne
eivät voi olla päällä yhtä aikaa ilman että jompikumpi mittaus vääristyy.

## Tulokset (korjattu, `docs/raportit/data/piirtokoe-mac-safari-2026-09-22-korjattu.jsonl`)

| koe | kehyksiä | dt p50/p95/max (ms) | yli20ms % | js/render/varattu ka (ms) | puskuri/uniform/glVienti/jakoja ka | tasaisuus: vaihtelu/ka % · pysähdyksiä |
| --- | --- | --- | --- | --- | --- | --- |
| normaali | 599 | 17 / 19 / 39 | 3,2 | 2,53 / 0,96 / 1,26 | 68,8 / 1736 / 1 / 68,7 | 14,3 % · 1 |
| eipuskuri | 600 | 17 / 18 / 37 | 3,0 | 2,24 / 0,80 / 1,30 | 87,0 / 1738 / 1 / 63,3 | 14,2 % · 0 |
| dpr15 | 600 | 17 / 19 / 31 | 2,8 | 2,39 / 0,90 / 1,32 | 71,0 / 1722 / 1 / 61,9 | 11,4 % · 0 |
| eivienti | 589 | 17 / 20 / **130** | 4,9 | 2,47 / 0,86 / 1,33 | 110,8 / 1680 / 1 / 61,5 | **27,9 %** · 0 |

("vaihtelu/ka" = kameran ruutusiirtymän hajonta/keskiarvo per kehys —
Google Earth -tasainen liike = pieni luku; "pysähdyksiä" = kehyksiä,
joissa siirtymä < 0,25 px vaikka sormi liikkui.)

**KORJAUS (Pelikoodari 22.9.2026, Fablen välittämä): "puskuri/uniform/
glVienti/jakoja ka" -sarake yllä on VIRHEELLINEN, älä käytä.**
Puskurikirjoitukset (ja samasta lähteestä luetut uniformit/glVienti/
jakoja, `js/pallolauta/kehysprofiili.js` `lue()`) ovat LATAUKSESTA
ASTI kumulatiivisia laskureita, ei per-kehys-arvoja. Työkalun `ka()`
laski näiden RAAKOJEN (kasvavien) lukemien keskiarvon koko 10 s:n
otoksesta — sama luokan virhe kuin `profiili`-lipun singleton-
anomalia yllä, mutta laskennassa mittauksen sijaan. Oikea tapa (kuten
`js/pallolauta/profiilinaytto.js`:n `profiiliTahti()` `kasvu()`) on
jakson KASVU (viimeinen − ensimmäinen), puskurikirjoituksille ja
uniformeille lisäksi jaettuna kehysmäärällä. Pelikoodarin arvio oikeasta
suuruusluokasta WebKitissä: normaali ~0,07 puskurikirjoitusta/kehys,
eipuskuri 0. **Yllä oleva taulukko EI siis tue alla olevaa "eipuskuri EI
vähennä" -päätelmää** — se perustui virheelliseen laskuun.

Työkalu korjattu (`kasvu`/`kasvuPerKehys`, korvaa `ka()`:n näille
neljälle kentälle; `glVientejaKa` nimetty `glVienteja`ksi, koska
Pelikoodarin/profiilinaytto.js:n käytäntö on jättää se jakamatta
kehysmäärällä — harvinainen tapahtuma, ei jatkuva nopeus). Neljää koetta
EI ajettu vielä uudestaan korjatulla laskennalla (ei kiireellistä);
tässä raportissa olevat puskuri/uniform/glVienti/jakoja-luvut ovat
vanhentuneita eikä niitä pidä siteerata.

## Tulkinta ja varaukset

- **Median-dt on 17 ms (~59 Hz) kaikissa neljässä** — Mac Studion GPU:lla
  ei ole tässä testissä (maltillinen pan, ei zoomia) juuri lainkaan
  kuormaa yhdelläkään lipulla. Nolla-tulos ei kumoa lippujen hyötyä
  iPhonella: Mac Studio on tarkoitushakuisesti paljon vahvempi kuin
  kohdelaite, joten tämä mittaus todistaa vain, ettei mikään lipuista
  RIKO piirtoa Macilla — ei sitä, auttavatko ne iPhonella.
- **eivienti on selvästi epätasaisin**: dtMax 130 ms (yksittäinen piikki,
  muilla ≤ 39 ms) ja tasaisuuden vaihtelu 27,9 % (muilla 11–14 %) —
  yksi pitkä nykäys 10 s:n vedossa. Koska "eivienti" oletettavasti
  poistaa jonkin GL-viennin, piikki voi olla siirtynyt kertaluonteinen
  kustannus (esim. tekstuuripäivitys ilman normaalia vientireittiä)
  eikä jatkuva ongelma — n=1 piikki 589 kehyksestä, ei riitä johtopäätökseen
  yksin, mutta poikkeaa muista selvästi.
- ~~eipuskuri EI vähennä puskurikirjoituksia~~ **VEDETTY POIS**: tämä
  päätelmä perustui yllä kuvattuun laskuvirheeseen (raaka keskiarvo
  kumulatiivisesta laskurista). Oikea vertailu vaatii uuden ajon
  korjatulla työkalulla.
- **dpr15 on lievästi tasaisin** (vaihtelu 11,4 %, matalin dtMax 31 ms),
  mutta ero muihin on pieni eikä yksittäisen ajon perusteella varma.
- Yksi mittaus (`dpr15`, ensimmäinen yritys) jäi jumiin eikä koskaan
  palauttanut tulosta ~150 s:n odotuksen jälkeen; toisella yrityksellä
  (tuore Safari-käynnistys) se onnistui normaalisti 600 kehyksellä.
  Työkaluun lisättiin virheiden raportointi palvelimelle
  (`laheta({ virhe, virhePino })` `catch`-haarassa) tämän varalta, mutta
  jumi ei toistunut, joten syytä ei saatu kiinni — jos toistuu, virhe
  näkyy nyt jsonl:ssä ilman Web Inspectoria.

## Johtopäätös

Ei mitattavaa haittaa millään neljästä lipusta Macin Safarilla tässä
skenaariossa; ainoa erottuva löydös on `eivienti`-lipun yksi 130 ms:n
piikki ja korkeampi tasaisuuden vaihtelu, joka kannattaa tarkistaa myös
iPhonella (missä marginaali on paljon pienempi) ennen kuin lippua
suositellaan oletukseksi. Suurin arvo tästä kierroksesta oli
kehysprofiilin ja profiilinäytön singleton-konfliktin löytäminen ja
korjaaminen — ilman sitä kaikki neljä lukua olisivat olleet
mittausvälineen omaa kohinaa, ei pelin käyttäytymistä.
