# Louvre 21h — toimitushuomiot (5.11.2026)

**Tila: vastaanottajan tarkastukseen, mitoituspoikkeamat ja hylätty kevennys ilmoitettu. Ei peliin kytkentää eikä omistajan hyväksyntää tässä toimituksessa.**

**Suositeltu päämalli `louvre.glb` on neljännen oton ehjä raakamalli pelimittoihin skaalattuna.** Tripon 27 999 kolmion kevennys teki UV-railat ja pihan varjostuskolmioita; `louvre-kevyt-uv-virhe.glb` on mukana ainoastaan hylättynä vertailuna. Älä kytke sitä peliin. Raakamalli on 46 673 kolmiota, yhden materiaalin ja yhden primitiivin malli; se alittaa 100 000 kolmion ja 15 Mt:n rajat. Kevennystä siis kokeiltiin, mutta sen tulosta ei hyväksytty.

LIIKE: ei liikettä

Molemmat tiedostot ovat rakennusesineitä, eivät hahmoja.

## Muoto ja mitat

- U-piha ja länsipää avoimia. Itäsiipi yhdistää nyt keskipaviljongin molempiin kulmapaviljonkeihin.
- Itäkeskipaviljonki on korkein, katossa on tasainen huippu. Pihanpuoleinen suuri keskikaari on näkyvissä. Arkadit ovat geometrisia aukkoja: spot-raycastissa 12/20 pitkien siipien ja 6/10 itäsiiven linjaa läpäisee pinnan; muut linjat osuvat pilareihin/seiniin. Täysi topologiatodistus ei kuulu tähän tarkistukseen.
- Kolme pyramidia jäivät mukaan #2105:n sallitun poikkeuksen mukaisesti. Niitä ei poistettu vaurioittamalla pihaa.
- Akselit +Y ylös, +X itään, +Z etelään. Pivot pohjan keskipisteessä, minY=0; skaala sovellettu vertexdataan.
- Ulkomitat 860 × 360, korkein huippu 350. Vain positiivinen akselikohtainen skaala ja keskitys; lähdegeometriaa, UV:tä tai tekstuuritavuja ei korjattu/arvattu. Normaalit ja tangentit muunnettu asianmukaisesti.
- **Mitoituspoikkeamat:** kulmapaviljongit 267.3–269.5 (ohje noin295), pitkien siipien keskipaviljongit244.6 (noin240), itäkeskipaviljonki350.0 (350). Tavallisen siiven räystäskaistan mediaani114.7 (noin120), harjakaistan mediaani145.9 (noin160); jälkimmäiset ovat paikallisia vertexkaistan otoksia, eivät kattotasosovitusta. Karttaseppä arvioi nämä pelikulmassa ennen hyväksyntää.
- Takasivut ovat Tripon tulkintaa: ikkunoissa/julkisivuissa on pehmeyttä, itäkeskipaviljongin päätykoriste epäsymmetrinen. Kattolinja ja paviljonkirytmi säilyvät. #2105 sallii takasivun yksinkertaistumisen raportoituna.

## Tekniset luvut

| Versio | Kolmiot | Tavut | Primitiivit | Materiaalit | UV0-kolmiot | UV0:n 3D-ala | Osuus koko pinta-alasta |
|---|---:|---:|---:|---:|---:|---:|---:|
| raaka / päämalli | 46673 | 4531036 | 1 | 1 | 13 | 27.132322 | 0.001543% |
| kevyt / hylätty | 27999 | 3099712 | 1 | 1 | 26 | 2122.256131 | 0.121087% |

UV0-kriteeri: abs(2D-ristitulo) ≤ 1e-12. Alat ovat normalisoidun pelimallin yksiköissä. Raakaversiossa ei näy laajoja mustia UV-railaita. Kevennyksessä16 kolmion UV:t romahtivat pisteeseen (0,1); muut10 nolla-alaiset kolmiot ovat erillisiä kapeita tapauksia. Koko UV-raportit mukana. Kaikki materiaalit OPAQUE; ei luurankoa/animaatiota/Dracoa; kuvat upotettu ja enintään2048.

## Mustat pikselit ja kuvallinen tarkastus

Kuvat1100×1100; musta tarkoittaa kaikkiRGB<16. Saman CPU-rasteroinnin vertailu, ei Unity-runtime/valaistus-QA. Kaikki14 esikatselua on katsottu täysikoossa. Pelikulma- ja yläkuvat ilman kevyt-etuliitettä näyttävät suositeltua päämallia. Yksi tumma pikseli raakamallin koilliskuvassa ei muodosta näkyvää railoa.

| Kuva | Mustat pikselit |
|---|---:|
| esikatselu/raaka-etela.png | 0 |
| esikatselu/raaka-pohjoinen.png | 0 |
| esikatselu/raaka-ita.png | 0 |
| esikatselu/raaka-lansi.png | 0 |
| esikatselu/ylhaalta.png | 0 |
| esikatselu/pelikulma-lounas.png | 0 |
| esikatselu/pelikulma-koillinen.png | 1 |
| esikatselu/kevyt-etela.png | 708 |
| esikatselu/kevyt-pohjoinen.png | 0 |
| esikatselu/kevyt-ita.png | 0 |
| esikatselu/kevyt-lansi.png | 0 |
| esikatselu/kevyt-ylhaalta.png | 333 |
| esikatselu/kevyt-pelikulma-lounas.png | 1718 |
| esikatselu/kevyt-pelikulma-koillinen.png | 7 |

## Otokset ja kustannus

| Otto | Jobid | Tulos | Krediitit |
|---|---|---|---:|
| 1 | 53c3554b-eaf2-4818-bc1f-db7ec6fd91fe | REJECTED_COURTYARD_ROOFED | 50 |
| 2 | 0bf72e6a-e100-4b4b-9250-a253a4bd0320 | REJECTED_FACADE_ARCHES_MISSING_PAVILION_SHAPES_WRONG | 45 |
| 3 | 9f80f814-471b-44a0-89ec-0e0277054047 | REJECTED_EAST_CONNECTING_WING_MISSING | 45 |
| 4 | f244dd29-afb7-47a0-9b50-3a81326390ef | RAW_STRUCTURE_PASS_RETOPO_QA_PENDING | 50 |

Yhteensä190 krediittiä (neljä generointia à45 + kaksi kevennystä à5). Alkusaldo16305, viimeinen UI-saldo16115. Otto4 generointi vahvistettu2026-11-05T13:30:06.823055+00:00, valmistui2026-11-05T13:32:13.672329+00:00. Ei viidettä ottoa käynnistetty.

## Vastaanottajalle

Suosittelen ehjän `louvre.glb`-päämallin kokeilua kartalla. Pyydän Karttasepältä arviota ilmoitetuista korkeuspoikkeamista ja 46 673 kolmion käyttämisestä UV-rikkoisen kevennyksen sijasta. Tämä paketti ei väitä vastaanottoa, omistajan hyväksyntää tai integraatiota valmiiksi.
