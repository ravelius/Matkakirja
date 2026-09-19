# Opus → Fable: Astronautin kameran napalevy — tehtävän premissi ei päde, koodia ei muutettu (19.9.2026)

Erä `opus-local-napakansi`, Matkakirja Opus local (Mac Studio), 15.35–15.50 Suomen aikaa.
Pohja: `origin/claude/bold-ride-vow4ki-astro-napa-2` (lohko 47 ja erän 2
kommentti ovat vain siellä). Ei koodimuutoksia, ei versionostoa.

## Tulos lyhyesti

Päätöksen "napakansi 76°:een reliefin reunan sävyssä" perusteena oli,
että 4k-reliefin alfa häivytetään 70–76°:ssa ja alta paistaa generoitu
napajää (214,220,224). **Nykyisellä kuvalla näin ei ole:**

1. Linssi ajaa **koko pallon tilassa**. `diag`-lokissa (savuke-astro-pallo
   NAKYMAT=puhelin, tänään klo 15.07) `{"vaihe":"alku","lahde":"4096x2048",
   …,"kokoPallo":1}`. `js/linssit/satelliitti-avaruus.js`
   (ladonta, `if (kokoPallo) { … } else { … napaLiuku(…) }`) ajaa
   `napaLiuku`n eli `RELIEFIN_HAIVYTYS`-häivytyksen VAIN `else`-haarassa;
   `tests/satelliitti-avaruus.test.mjs:966` vartioi juuri tätä.
   `js/linssit/reliefikuva.js`: `RELIEFI_KOKO_PALLO = true` (16.9.2026).
2. Kuvassa on sisältö navalle asti. Näytteet ämpärin kuvasta
   `topografia-pallo-koko-4k-20260916.webp` (4096×2048, koko rivi):

   | Leveys | Keskisävy (R,G,B,alfa) | Yleisin sävylaatikko |
   | --- | --- | --- |
   | 66° | 154,174,155,255 | 160,176,144 (12 %) |
   | 70° | 182,202,215,255 | 208,208,208 (16 %) |
   | 74° | 189,208,224,255 | 176,208,224 (16 %) |
   | 76° | 201,215,226,255 | 192,208,224 (23 %) |
   | 80° | 197,210,222,255 | 176,192,208 (23 %) |
   | 85° | 182,198,217,255 | 176,192,208 (49 %) |
   | 88° | 182,197,217,255 | 176,192,208 (73 %) |
   | 89,5° | 180,195,215,255 | 176,192,208 (85 %) |

   Alfa on 255 kaikkialla, eikä sävy ole generoidun napajään
   (214,220,224).

## Mikä levy oikeasti on

**Reliefikuvaan poltettu merijää.** `tools/reliefivarit.mjs` `jaapaino`:
merellä jään osuus kasvaa 66°:sta 78°:een ja jää 72 %:iin
(`JAA.meri [66, 78]`, `meriKatto 0,72`, sävy `JAAN_VARI` 236,240,244).
Jäämeri on merta, joten sillä ei ole varjostettavaa topografiaa, ja 78°:n
jälkeen sävy on lähes vakio (88°:ssa 73 % ja 89,5°:ssa 85 % pikseleistä
samassa 16-yksikön laatikossa). Tuloksena on tasainen vaalea kiekko,
jonka reuna on jääsekoituksen liuku 70–78°. Luvut sopivat erän 2
mittaukseen: kiekko 95,9 ja kehä 92,3, sinisyys 12,4 ja 12,2. Kiekko ja
kehä ovat samaa merijäätä ja eroavat vain jään osuudelta.

## Miksi 76°:n kansi ei korjaisi sitä

- Kansi on yksivärinen. Se korvaisi merijään toisella tasaisella
  kiekolla, eikä syvyysasteikko, joka nyt näkyy 28 %:n läpi
  (keskiselänne, mannerjalusta), näkyisi enää lainkaan.
- 76–84°:n välissä on maata, joka nyt näkyy reliefinä: Huippuvuoret
  (77–81°), Frans Joosefin maa (80–82°), Severnaja Zemlja (78–81°),
  Pohjois-Grönlanti (jopa 83,6°) ja Ellesmere (76–83°). Kansi peittäisi
  ne.
- Kannen sävyä ei voi ottaa yhdestä reunasta. 76°:ssa rivin sävy
  vaihtelee (yleisin laatikko vain 23 %), joten mikä tahansa vakio
  erottuisi saumana jossain kohtaa kehää.

Siksi en toteuttanut päätöstä. Toteutus olisi 45 minuutissa tuottanut
mittarin mukaan vihreän tuloksen (sinisempi kiekko, levypikselit alle
10 %) mutta ruudulle huonomman navan.

## Vaihtoehdot, joilla levy oikeasti poistuu (Fablen päätös)

1. **Poltetaan reliefi uudelleen kevyemmällä merijäällä (suositus).**
   `tools/reliefivarit.mjs` `JAA.meriKatto` 0,72 → noin 0,35–0,45 ja/tai
   `JAA.meri` [66, 78] → [72, 84], ja sitten
   `node tools/tee-pallotopografia-koko.mjs --tunniste <uusi>` Macilla.
   Jäämeren syvyysasteikko (Nansenin ja Kanadan altaat, Lomonosovin
   selänne) näkyisi silloin jään läpi, ja kiekko muuttuisi
   tekstuuriksi. Samalla etelän meri-jää, jossa Etelämantereen
   rantaviiva on tärkein, pysyisi näkyvänä. Kyse on ämpärityöstä: uusi
   4k- ja 8k-kuva, vienti ampariin (Fable) ja tunnisteen vaihto
   `js/linssit/reliefikuva.js`:ään. `tests/satelliitti-avaruus.test.mjs`
   vartioi, että JAAN_VARI on sama molemmissa tiedostoissa; meriKatto
   ei ole sidottu. Polton kestoa en mitannut, ja 1′-korkeusruudukkoa ei
   löytynyt Macin välimuisteista.
2. **Linssin sisäinen napasävytys.** Linssi kertoo reliefin sävyn
   napakaistalla (esim. 74–90° multiply sinertävään) samalla tavalla
   kuin `valoLiuku`. Se ei vaadi uutta kuvaa, mutta tuo kiekkoon vain
   sävyn eikä tekstuuria, ja väri koskisi myös maata (Grönlanti,
   Huippuvuoret).
3. **Hyväksytään nykyinen.** Talvinen Jäämeri on astronautin kuvissa
   yhtenäistä valkeaa. Vika on silloin sävyssä, ei geometriassa, eikä
   sitä korjata.

## Mittarit

- Selainajoja ei tehty tässä erässä: koodia ei muutettu, ja tehtävän
  kohdemittaus (lohko 47) mittaisi hylättyä ratkaisua.
- `node --test tests/*.test.mjs`: ei ajettu (ei muutoksia pelikoodiin
  tai testeihin; vain tämä raportti).

## Jäi tekemättä

- Koko tehtävä odottaa päätöstä vaihtoehdosta 1, 2 tai 3.
- Omistajan kuvan tummansininen rengas: ei käsitelty. Erä 2 ei
  toistanut sitä Chromiumilla.
