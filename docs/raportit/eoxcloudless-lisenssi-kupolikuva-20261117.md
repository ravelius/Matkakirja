# Kupolikuvan satelliittimosaiikki: EOxCloudless, versio ja lisenssi (SK 17.11.2026, KK:lle; PT:n pyyntö, ennen App Storea)

Kysymys: esittelyn kupolikuva (Länsi-Eurooppa; `assets/apuraha/esittely.json` on nykyään iss-lahestyminen, kupolikuva on esittelysivun `hetki-avaruus-2.jpg`, natiivin kaappaus) ja natiivin Tietoja-rivi "EOxCloudless … (Contains modified Copernicus Sentinel data 2016 & 2017)". EOX:n lisenssisivu vaatii nyt kaupalliseen käyttöön maksullisen lisenssin. Tarvitaanko vaihto? Vain luku ja docs; kuvia tai koodia ei muutettu.

## Tulos
**Vaihtoa ei tarvita, jos pelin mosaiikki on EOX:n alkuperäinen 2016-tuote (kerran noudettu 24.9.2026 CC BY 4.0:n nojalla). Se on CC BY 4.0 eli sallii kaupallisen käytön nimeämisellä.** Nykyinen lisenssisivu koskee myöhempiä tuotteita eikä kumoa jo julkaistua CC BY -lupaa. Yksi asia on varmistamatta (kohta 3).

**OIKAISU 17.11.2026 (KK 12.29; Natiiviseppä vahvisti ämpärin `v2/laatat.json`:sta): kohdan 3 avoin kysymys on ratkennut.** Maailmansarja on EOX 2016 (CC BY 4.0). Kupolin Eurooppa (`s2-eurooppa`) EI ole EOX:n tuote vaan oma Copernicus Sentinel-2 L2A -mosaiikki 2022–2025. Sen lähderivi on siis "Contains modified Copernicus Sentinel data 2022–2025 (ESA)", ei EOX:n nimeäminen. Kohdan 4 suositus 2 pätee tähän muotoon: EOX-rivi ja CC BY 4.0 maailmansarjalle, Copernicus-rivi kupolin Euroopalle. Vaihtoa ei edelleenkään tarvita.

## 1. Mitä EOX itse sanoo (luettu 17.11.2026)
| Lähde | Sisältö |
|---|---|
| EOX 25.8.2017 "Sentinel-2 global cloudless mosaic" (https://eox.at/2017/08/sentinel-2-global-cloudless-mosaic) | "now licensed under a Creative Commons Attribution 4.0 International License"; "we dropped the Share-Alike clause". Aineisto toukokuu 2016–huhtikuu 2017. Vaadittu nimeäminen päättyy "Contains modified Copernicus Sentinel data 2016 & 2017". |
| EOX 3/2025 "Sentinel-2 cloudless 2024" (https://eox.at/2025/03/sentinel-2-cloudless-2024/) | 2016-versio ilmaiseksi CC BY 4.0; **2018–2024: CC BY-NC-SA 4.0**; kaupalliseen käyttöön oma maksullinen "EOX Commercial Attribution-RestrictedUse" -lisenssi. |
| EOX lisenssisivu (https://cloudless.eox.at/documentation/license) | Vain kaksi vaihtoehtoa: ei-kaupallinen CC BY-NC-SA 4.0 ja kaupallinen EOX-lisenssi. **Ei mainitse vuosia eikä CC BY 4.0:aa.** Nimeämismalli: "EOxCloudless https://cloudless.eox.at by EOX IT Services GmbH (Contains modified Copernicus Sentinel data "year")". Heinäkuun 2026 yhtenäinen nimeäminen; vanhaa ei tarvitse muuttaa. Sivu sanoo itse, että sitova teksti on `license-legal`-sivulla (se kuvaa vain kaupallisen lisenssin). |

Päätelmä: sivu on vain nykytuotteiden yhteenveto. 2016/2017-tuote on EOX:n omin sanoin CC BY 4.0, ja CC-lisenssi on peruuttamaton jo jaetulle aineistolle (CC BY 4.0 kohta 6b).

## 2. Mitä peli sanoo ja mitä siihen on päätetty
- Omistaja 24.9.2026 14.5x: noudetaan EOX Sentinel-2 cloudless **2016 (CC BY 4.0)** CC BY:n nojalla; 15.01: EOX:lle ei lähetetä viestiä (Raamattu-loki paatokset-2026-09.md r. 3975–3989). Kertanouto 9 162 laattaa; sarjat `s2/` ja `s2-alkup/`.
- Natiivin lähderivit (Karttaseppä/Natiiviseppä): KarttaKerrokset.cs:514–521 "CC BY 4.0: Contains modified Copernicus Sentinel data 2016, EOX IT Services"; Tietoja.cs:185 "EOxCloudless https://cloudless.eox.at … (… data 2016 & 2017)" (lähde: esittelysivun TULOS-kuvalahteet.md). "2016 & 2017" on EOX:n oma vuosimerkintä juuri tälle tuotteelle, joten vuodet täsmäävät.
- Ero: Tietoja-rivi käyttää uutta URL-muotoa (cloudless.eox.at) ja sanaa "EOxCloudless", kun 2017-tuotteen alkuperäinen nimeäminen on "Sentinel-2 cloudless – https://s2maps.eu by EOX IT Services GmbH …". Rivi ei mainitse lisenssiä. Kumpikin on harmiton; EOX:n heinäkuun 2026 yhtenäinen nimeäminen sallii nykymuodon.

## 3. Varmistamatta (RATKAISTU, ks. oikaisu ylhäällä)
Esittelysivun tutkija ei löytänyt suoraa lähdettä sille, onko **kupolikuvan Euroopan mosaiikki** (`linssit/astronautin-kamera/s2-eurooppa`, z6–z10, AstronauttiKerros.cs:429–435) EOX 2016 vai oma Copernicus Sentinel-2 L2A -mosaiikki (Earth Search, kesät 2022–2025; tools/kaukomaa/kuvauspaikat-v2.mjs:508). Tämä ei estä julkaisua: molemmat ovat kaupalliseen käyttöön sallittuja (EOX 2016 CC BY 4.0; Copernicus-data avointa). Se ratkaisee vain, mikä lähderivi on totta. **Natiiviseppä voi katsoa s2-eurooppa/v1:n tuotantolokista tai manifestista lähteen minuutissa.**

## 4. Suositus
1. Älä vaihda mosaiikkia; älä käytä EOX:n vuosia 2018–2024 (CC BY-NC-SA, ei kaupalliseen).
2. Lisää Tietoja-riville lisenssi: "… (CC BY 4.0)" ja halutessa EOX:n alkuperäinen nimeämismuoto; jos kupolikuva onkin oma Copernicus-mosaiikki, rivi on silloin "Contains modified Copernicus Sentinel data 2022–2025 (ESA)".
3. Talleta todisteeksi EOX:n 2017-ilmoitus ja 2025-artikkeli (Wayback) liitteeksi lähdetiedostoon, jos EOX joskus kiistäisi 2016-version CC BY -lisenssin.
4. Sivuhavainto: `tools/hae-satelliittikartat.mjs` hakee EOX:n WMS:stä tason **s2cloudless-2024** (CC BY-NC-SA 4.0, tiedoston oma kommentti "ilmainen ei-kaupalliseen käyttöön"). Mainissa ei ole sen tuottamia `*-satelliitti.jpg`-kuvia, joten ongelmaa ei nyt ole, mutta työkalua ei saa ajaa uudestaan ilman tason vaihtoa (2016) tai työkalun poistoa.
