# #2261: ae77525c3-lähdegeometrian korjausankkurit

Vain paikallisten lähteiden luku ja tämän muistion kirjoitus. Ei Blender-ajoa, renderiä, mallimuutosta, sovitushakua tai generointia. Auktoriteetti: sources-2249/SAATE.md ja grand-chatelet-massa-kolmiot.txt; lähde-JSON work/guide-v4/committed-pariisi.json. RAW-SHA256 ed365ffd736f134f9da7824cb211e245b386badd251e3b0ce883fa74e74ef8b9, commit ae77525c30ffbbb31d215f29df9049e937f58aa2.

## Koordinaatit ja indeksit

Ellei erikseen mainita, luvut ovat RAW(x,y,z): x itäkaakkoon, y ylös, z pohjoiskoilliseen. Blender=(RAWx,RAWz,RAWy), virallinen GLB=(RAWx,RAWy,-RAWz). Metrit ja alkuperäinen origo, ei rajalaatikkokeskitystä. Alla K-indeksit nollapohjaisia ja rajat mukana. parts-2253:n source_face viittaa näihin; source_face=-1 on johdannaisen saumakansi, ei alkuperäinen lähdepinta. OBJ:n facejärjestys=K+1.

## 1. Läpikäytävän todellinen poistotilavuus

Aukko on kolmen suippokaariprofiilin pystysuuntainen sisus, joka pursotetaan RAW-z-suunnassa. Älä tee vain julkisivusyvennystä tai pelkkää kapeaa suorakaideaukkoa. Profiin kuuluu maan tasoon laskeva pystysivu kummassakin reunassa ja alla oleva pohjasulku; profiilin sisus on poistettava massasta.

| Alue | RAW-z | RAW-x, leveys | Kannan y / laen y | Lähteen K-pinnat | A-JSON:n paikalliset kolmiorivit |
|---|---|---|---|---|---|
| Eteläinen jatko | 3…21,9 | -3,75…0,15; **3,90 m** | 3,6 / 6,3 | 208–265 | 202–259 |
| Keskikäytävä | 21,8…29,5 | -3,8…0,2; **4,00 m** | 3,6 / 6,3 | 56–145 | 50–139 |
| Pohjoinen kaarisyvennys | 29,5…31 | -4,6…1,0; **5,60 m** | 3,2 / 6,5 | 146–207 | 140–201 |

Akseli x=-1,8. Kahden ensimmäisen tilavuuden päällekkäisyys z21,8…21,9 on tarkoituksellinen. Koko katettu osuus z3…31 =28 m. Pohjoisen syvennyksen syvyys1,5 m. Käytävä jatkuu etelässä avoimena kujana rakennusosien välissä. Huomaa: nimellisesti4 m käytävä kapenee lähteen eteläisessä laskentaosassa3,90 m:iin, ei täysin identtinen profiili koko matkalla.

Kaari on lähdegeneraattorissa kaksi ympyräkaarta: puoli=(x1-x0)/2, nousu=laki-kanta, r=(puoli²+nousu²)/(2*puoli), phi=atan2(nousu,r-puoli). Vasemmalle puoliskolle i=0…6: angle=pi-phi*i/6, x=x0+r+r*cos(angle), y=kanta+r*sin(angle); päätepisteet pakotettu (x0,kanta) ja(-1,8,laki). Oikea puoli peilattu akselin ympäri. Täsmällisimpään leikkuriin käytä alla suoraan RAW-facesta poimittua pisteketjua; sulje se pohjapisteiden välillä. Lista sisältää vain kaaren, lisää sivuiksi (x0,0) ja(x1,0).

eteläinen kaariprofiili `(x,y)`:
```json
[[-3.75, 3.6], [-3.688404, 4.1887207], [-3.506284, 4.7519426], [-3.211528, 5.26527], [-2.816903, 5.7064705], [-2.339501, 6.0564327], [-1.8, 6.3], [-1.260499, 6.0564327], [-0.7830968, 5.7064705], [-0.38847184, 5.26527], [-0.093715906, 4.7519426], [0.08840418, 4.1887207], [0.1500001, 3.6]]
```

keski kaariprofiili `(x,y)`:
```json
[[-3.8, 3.6], [-3.7365031, 4.195322], [-3.548869, 4.763859], [-3.2455401, 5.28003], [-2.8401644, 5.72061], [-2.350981, 6.065777], [-1.8, 6.3], [-1.2490189, 6.065777], [-0.7598355, 5.72061], [-0.35445976, 5.28003], [-0.05113101, 4.763859], [0.13650322, 4.195322], [0.20000005, 3.6]]
```

pohjoinen kaariprofiili `(x,y)`:
```json
[[-4.6, 3.2], [-4.5084295, 3.9772735], [-4.2387333, 4.7119865], [-3.805678, 5.363909], [-3.2329762, 5.8973427], [-2.5519874, 6.2830806], [-1.8, 6.5], [-1.0480125, 6.2830806], [-0.3670237, 5.8973427], [0.20567799, 5.363909], [0.6387334, 4.7119865], [0.9084296, 3.9772735], [1.0, 3.2]]
```

Leikkurin z-/alapään pieni numeerinen ylivienti voi olla Booleanin tekninen varaus, mutta sitä ei pidä kirjata historialliseksi mitaksi. Lähteen aukon läpi ovat aiemmin kulkeneet kaikki kuusi koesädettä x=-3/-1,8/-0,5 ja y=2/3,5. Nyt sulkeutunut generoitu portti ei muuta näitä lähdeankkureita.

## 2. A:n oikeat kattopinnat ja räystäslinja

| Rakenne | Globaalit K-facet | A-JSON:n paikalliset kolmiorivit |
|---|---|---|
| N–S-porttisiiven katto | 355–367 | 270–282 |
| Itäosan kaksi E–W-harjaa kokonaisuudessaan | **368–431** | **283–346** |
| Porttirakennuksen E–W-katto | 432–441 | 347–356 |
| Matala etuosa, lapekatto9,5→12,5 m | 442–449 | 357–364 |

Itäosan kahden pääkaton varsinaiset lappeet ovat **K368–403**, pystyt pääty-/reunatäytöt **K404–431**. Näitä ei saa korvata koko reunaa laskevalla aumalla. K404–405 ovat eteläreunan matala korotuskaistale; itäreunan päätyketjut K406–418, länsi-/porttisiiven liittymän päätyketjut K419–431. Päätyketju voi olla vinon ulkoseinän suuntainen, ei koko ajan yhdessä x-vakiotasossa.

Pääkaton pohja RAW(x,z): [(0.2,-4),(26,-4.5),(25.4,16.5),(17,26.5),(-1.8,26.5),(-1.8,3),(0.2,3)]. Räystästason nimellisarvo15,5 m, harjat23,2 m, puolijänne7,9 m. Kahden harjan lähdepisteet:

- Eteläisempi E–W-harja z=3: x=-1,8…25,785713, y=23,2. Lähteen välipiste x=0,2 on samalla harjalla.
- Pohjoisempi E–W-harja z=18,6: x=-1,8…23,636, y=23,2. Välipisteet x=-1,1276596 ja11,352341 eivät tarkoita lisäharjoja.
- Jiiri z=10,8, korkeus noin15,597468 m; ei tasakatto.
- Pohjoislape päättyy kadun puolella **z=26,5, x=-1,8…17, y=15,5**: pohjoisjulkisivulle ei tähän päätykolmiota. Itäreuna on viistetty kohti tornia.
- Eteläinen leikattu raja [(0,2;-4),(26;-4,5)] ei osu matemaattiseen räystäslinjaan: kattopinnan alaraja y≈15,8898735…16,377216. Tämä on SAATTEEN eteläseinän15,9–16,4 m, ei virhe, eikä sitä pidä pakottaa15,5 m:iin.

Katon lähdefunktio ennen kolmiointia:
`height(z)=23.2-7.7*min(1,min(abs(z-3),abs(z-18.6))/7.9)`.
Katkaise se yllä olevaan epäsäännölliseen pohjaan ja käytä lähteen pystypäätyjä; älä lisää kartiota tai aumaa näihin päätyihin.

Porttirakennuksen pienempi E–W-harja: x=-6,4…2,8,z=26,4,y=23,2; sen pohja x[-6,4;2,8],z[21,8;31]. Lappeet K432–437, pystypäädyt K438–441. Pohjoisräystäs z31,y15,5, kattoikkuna tämän yläpuolella. N–S-porttisiiven oma harja x=-1,8,z3…26,4,y23,2; sen lappeet K355–361, reunatäytöt K362–367. Näiden ristiliittymä ei ole todiste itäosan aumakatosta.

## 3. C:n L ja SW-paviljonki: lähteestä päätettävä kätisyys

C:n länsihaaran alkuperäinen katto: JSON-osa8, **K315–323**. Luoteishaara: osa9, **K324–336**. C:n v3-johdannaisessa osa eteläisestä haarasta/päädystä on siirretty B:hen paviljongin alarungoksi ja etelätyngäksi; tätä ei saa palauttaa C:n vastakkaiseen päähän pelkän laatikkosovituksen avulla.

Alkuperäiset kattopohjat RAW(x,z):

- Länsihaara: [(-21.4,1.6),(-15.49,0.93),(-19.25,14.14),(-25.7,16.7)]; harja18,9 m, suunta z käännetty15,9°. Pitkittäinen suuntavektori **(-0,273959219;0,961741310)**.
- Luoteishaara: [(-25.7,16.7),(-19.25,14.14),(-6.35,21.85),(-6.35,28.25)]; harja18,9 m, suunta x käännetty30,83°. Suuntavektori **(0,858691674;0,512492545)**.
- Ulkopuolinen L-kulma on **(-25,7;16,7)**, sisäkulma **(-19,25;14,14)**. Pitkä luoteishaara kulkee niistä porttisiiven lähelle, kasvavan x:n ja z:n suuntaan.

Paviljonki B: **K337–354**, pohja [(-22.4,5.12),(-16.49,4.45),(-18.12,10.17),(-24.03,10.84)], räystäs20m/telttakärki26m. Sen pohjan keskipiste **(-20,26;7,645)**. Paviljonki on siis C:n länsihaaran eteläpäässä, EI pitkän luoteishaaran porttipäässä.

V3:n paviljonkiliitoksen tasainen poikkisauma:

- RAW(x,z) ulkoreuna **(-24,031258278;10,84)** ja pihareuna **(-18,119226006;10,17)**.
- Sauman keskipiste **(-21,075242142;10,505)**.
- Katon leikkausprofiilin huippu RAW **(-21,074178977;18,899998;10,504879513)**.
- Sauman pystykansi on johdannainen, `source_face=-1`, ei alkuperäinen arkkitehtuuridetalji. Paviljongin lähdepohjan ja jatkuvien seinälinjojen noin millimetrin pyöristysero ei oikeuta lisäsiirtoa.

C:n toinen, porttisiiven puoleinen pää: **x=-6,35,z21,85…28,25**. Johdannaisen erillinen itäsaumakansi sulkee vain z21,85…26,4 ja y0…15,5; loppu on alkuperäistä seinää. Tämä on porttisiiven A lähellä, vastakkainen pää kuin SW-liitos B:hen.

### Savupiippu toisena tunnistusankkurina

Alkuperäinen savupiippu **K656–665**; nykyisen C-triangles.json:n paikalliset kolmiorivit **87–96**. RAW-bbox **x[-10,2;-9],y[15,5;21],z[24,5;25,7]**. Bbox-keskipiste **(-9,6;18,25;25,1)**, huipun keskikohta **(-9,6;21;25,1)**. Blenderissä bboxX[-10,2;-9],Y[24,5;25,7],Z[15,5;21].

Piippu kuuluu **pitkän luoteishaaran portinpuoleiseen päähän**: se on3,25m länteen x=-6,35-päätytasosta ja0,975m pohjoiseen tämän sauman z24,125-keskipisteestä. Se on luoteishaaran harjasta noin1,995m pohjoiseen z-suunnassa sen kohdalla x=-9,6 (harja z≈23,105).

SW-liitossauman keskeltä piippuun RAW(x,z)-vektori **(+11,475242142;+14,595)**, vaakamatka **18,565969m**. Paviljonkipohjan keskeltä piippuun **(+10,66;+17,455)**, vaakamatka20,452692m. Tämä epäsymmetrinen järjestys ratkaisee lähteen kätisyyden: **paviljonki toisessa päässä, piippu pitkän haaran porttipäässä**. Sovita tunnistettu generoitu piippu ja paviljonkisauma tähän järjestykseen; älä valitse33°/214°-vaihtoehtoa pelkän RMS-luvun tai L:n näennäissymmetrian perusteella.

## Epävarmuudet ja toimivaltaraja

Lähdemassa määrittelee nämä korjausankkurit täsmällisesti, mutta SAATE merkitsee pihan rajat, siipisyvyydet, harjojen paikat ja paviljongin korkeuden historiallisiksi arvioiksi. Pihasiipien **5,5 m on syvyys**, räystäs15,5m, harja18,9m. NE-torni17/25m ei ole kokonaisuuden korkein: paviljonki26m.

Generoidun C:n korkein paikallinen kohouma ei automaattisesti ole tämä savupiippu; sen suorakulmainen pystyrunko ja sijainti pitkän haaran päässä pitää tunnistaa kuvasta/meshistä. Jos piippua tai paviljonkipäätä ei voida tunnistaa luotettavasti, suunta jää epävarmaksi. Tässä ei valittu uutta sovituskulmaa, siirretty mitään eikä ajettu uutta optimointia.

## Käytetyt paikalliset viitteet

- sources-2249/SAATE.md ja grand-chatelet-massa-kolmiot.txt.
- work/guide-v4/committed-pariisi.json: JSON-osat2–4,8–13,15–18,20.
- work/parts-2253/A-,B-,C-triangles.json: lähdeface-provenienssi; C:n erilliset seam_caps.
- work/parts-2253/split_parts.py ja revision3-seam-caps.md: vain johdannaisten leikkausrajat, ei historiallisena lisälähteenä.
- ae77525c3:n Rautalanka.cs/Porttiholvi luettu read-only git show -komennolla kaariprofiilin laskennan tarkistamiseksi.
