# Olavinlinna: pelattavuusmalli (Thief-malli, ensimmäinen persoona)

*Päätoimittajan apuna (Opus) 7.10.2026 Siirtosepän, Linnanrakentajan ja Natiivi-UI:n 8.10. työtä varten. Pohjana
omistajan linjaukset 7.10. klo 18.5x–18.7x, ehdotus, kappelin käsikirjoitus E3, 31 repliikkiä, tietokerros,
faktapohja, Linnanrakentajan SEIKKAILU-TARKISTUS.md ja HUONE6-PALATSI.md, Siirtosepän arkkitehtuuri sekä koodi
haarassa `siirtoseppa/historia-fp` @ 0656eef6. Luonnos, ei kaanonia.*

**Merkinnät.** [V] kaksi lähdettä, [1L] yksi lähde, [A] arvio, TULKINTA = pelin ratkaisu ilman lähdettä, FIKTIO =
keksitty. **NYK** = arvo on jo koodissa tai datassa (luokka.vakio). **UUSI** = lisätään samaan luokkaan tai dataan, ei
rinnakkaista järjestelmää. **UUSI, vaatii luvan** = uusi äänitettävä repliikki. **P** = ensimmäinen pelattava pala
(huoneet 1–5), **M** = myöhemmin (6–10).

**Etusija ristiriidassa:** omistajan linjaus → tämä malli → kappelin käsikirjoitus (sen olan yli -kamerakohdat
korvataan kohdassa 7) → ehdotus.

## 1. Ydin

Thiefissä pelaaja ei taistele vaan katsoo, kuuntelee, odottaa ja liikkuu varjoissa, ja meillä sama silmukka toistuu
noin minuutin välein: **(1) katso ja kuuntele**, missä valo on, mihin lyhty osoittaa ja kenen askeleet kuuluvat;
**(2) valitse** seuraava varjo, piilo tai hiljainen pinta; **(3) odota** hetki, jolloin vartija kääntyy, riita alkaa
tai valo loittonee; **(4) liiku kyyryssä** varjosta varjoon; **(5) muuta ympäristöä** tarvittaessa puhaltamalla pieni
liekki sammuksiin tai heittämällä esine harhautukseksi; **(6) käsittele esinettä** omin hanskakäsin (poimi, avaa,
irrota, sytytä) ja vie arvoitusta askel eteenpäin; **(7) reagoi**, jos joku huomaa: "Hä?" ja sydämenlyönti varoittavat
aina ensin, ja ehdit pysähtyä, piiloutua tai juosta. Kiinnijäänti vie tyrmään, josta pääsee 30–45 sekunnissa takaisin.
Ruudulla ei ole mittareita eikä tekstiä: valo näkyy kuvan reunojen tummumisena, vaara hahmon eleenä ja sydämenä.

| Thief | Meillä |
|---|---|
| Valokivi (valomittari) | ei mittaria: kuvan reunat tummuvat pimeässä (NYK `SeikkailuNakyvyys`) |
| Vesinuoli sammuttaa soihdun | puhalla pieni liekki (kynttilä, päre); soihtu, tulisija ja hiilipannu eivät sammu |
| Meluava nuoli | heitetty nauris, kivi, kauha tai lautanen |
| Nuija ja miekka | ei aseita; irtipääsy otteesta (omistajan päätös 1) |
| Tiirikka | avaimet, irrotettavat kivet ja tiilet, arkun kilpilukko (käsin, Amnesian tapaan) |
| Saalis | huoneiden löydöt; tietokortit avautuvat käydyistä paikoista (NYK) |

## 2. Pelaaja

### 2.1 Liikkumistilat

Hiivintä ja kyykky ovat sama tila (NYK `Liiketapa.Hiipiminen`): liikkeessä hiivintä, paikallaan kyykky.

| Tila | Kosketus | Mac | Peliohjain | Nopeus m/s | Silmät m |
|---|---|---|---|---|---|
| Kävely | tappi 50–95 % tai napautus lattiaan | W A S D, nuolet | vasen sauva | ≤ 1,4 (NYK `Kavely.KavelyMs`) | 1,62 (NYK `SilmaY`) |
| Hiivintä | tappi 12–50 % (UUSI) | Ctrl tai C (NYK) | B (NYK) tai sauva 12–50 % (UUSI) | ≤ 0,9 (NYK `HiipiminenMs`) | 1,0 (NYK `KyykkySilmaY`) |
| Kyykky | hiivintä paikallaan | sama | sama | 0 | 1,0 |
| Juoksu | tappi yli 95 % (NYK) | Shift (NYK) | vasen sauvanappi (NYK) | ≤ 3,2 (NYK `JuoksuMs`) | 1,62 |

- Kiihdytys 8 m/s² ja jarrutus 12 m/s² (NYK): kävelyvauhti 0,18 s:ssa; silmät kyyryyn 0,28 s:ssa (NYK); ei pään
  keinuntaa. Jahtaaja kulkee 2,2 m/s (NYK `Vartija.KiireMs`): juoksija pääsee aina karkuun, mutta juoksu kuuluu.
- **Automaattinen hiivintä (UUSI):** napautuskävely hiipii, kun lähin hahmo on alle 10 m:n päässä tai epäilee. Se
  korvaa kosketuksella kyykkynapin.

### 2.2 Äänekkyys pintojen mukaan

Kuulosäde = matka, jolta hahmo kuulee askeleen. NYK kivellä: kävely 2,5 m, juoksu 6 m, hiivintä ei kuulu
(`SeikkailuVartijat.KavelyKuuluuM`, `JuoksuKuuluuM`). Muut pinnat UUSI taulukkona samaan luokkaan.

| Pinta | Hiivintä | Kävely | Juoksu | Missä (P) | Askelääni |
|---|---|---|---|---|---|
| Kivi, kallio | 0 | 2,5 | 6 | portti, piha, tornit, kappeli | `askel-kivi` (valmis) |
| Kiviporras | 0 | 2,5 | 6 | kierreporras, muuriportaat | `askel-porras-1/-2` (valmis) |
| Puu (lankku, hirsi) | 1,0 | 3,5 | 8 | laituri, vene, keittiön lattia [1L] | `askel-puu` (valmis) |
| Olki, heinä | 0 | 1,5 | 4 | tyrmä, keittiön olkikasa | UUSI |
| Sora, rantakivikko | 0,5 | 3,0 | 7 | ranta, portin edusta | UUSI |
| Matala vesi, lätäkkö | 2,0 | 5,0 | 10 | ranta, vesisankojen lätäkkö | UUSI |

- **Data (UUSI):** `osat.json`iin `pinta` per osa (oletus) ja merkit `pinta:<laji>-N` (paikka, koko) poikkeuksille.
- **Muut äänet:** heitetyn esineen osuma 12 m (NYK `SeikkailuEsineet.KuuluuM`). UUSI esinekohtainen `aani_m`:
  nauris 8, kivi, kauha ja lautanen 12, savipurkki rikkoutuu 14, patapino kaatuu 16. Puhallus 1 m. Ovi hitaasti 0,
  nopeasti 4 m. Koputus ja luukku 6 m (voudille "tavallinen ääni", NYK).
- **Seinät (UUSI):** ääni kuuluu omassa osassa täysin ja naapuriosaan portaalin kautta puolella säteellä, muualle ei.
  Osat, naapurit ja portaalit ovat jo datassa (NYK `osat.json`).

### 2.3 Näkyvyys valoisuudesta

Valoisuus 0–1 pelaajan kohdalla (NYK `SeikkailuVartijat.PelaajanValoisuus`): lähin palava liekki (`DioraamaLiekit`,
perusvalo 0,25, säde 2,5–6 m) tai kynttilähuoneessa `Kynttilat.Valoisuus` (perusvalo 0,08, tilan kynttilä 5 m, oma
3,5 m). Sama luku ohjaa hahmojen näköä ja kuvan reunoja. Näköulottuma (NYK `Vartija.NakoVoima`) =
10 m × (0,35 + 0,65 × valoisuus), kyyryssä × 0,7.

| Valoisuus | Esimerkki | Näkee seisovan | Näkee kyyryssä | Kuvan reunat |
|---|---|---|---|---|
| 0–0,2 | pimeä nurkka, sammutettu kappeli | 3,5–4,8 m | 2,5–3,4 m | täysin tummat |
| 0,25 | yövalo liekkien ulkopuolella | 5,1 m | 3,6 m | lähes tummat |
| 0,4 | soihdun valopiirin reuna | 6,1 m | 4,3 m | puoliksi |
| 0,6 | soihdun tai tulisijan valossa | 7,4 m | 5,2 m | auki |
| 1,0 | liekin vieressä, oma kynttilä kädessä | 10 m | 7,0 m | auki |

- **Havainnon nopeus (NYK):** mittari kasvaa 0,2–0,85 sekunnissa läheisyyden ja katseen keskeisyyden mukaan, epäily
  alkaa 0,3:sta ja kiinni 1,0:ssa, ja mittari laskee 0,25/s, kun hahmo ei näe.
- **Liikekerroin (UUSI, Thief):** ulottuma × 0,8 paikallaan, × 1,0 kävellen, × 1,25 juosten. Pysähdy, niin sulaudut.
- **Kuvan reunat (NYK `SeikkailuNakyvyys`):** auki valoisuudesta 0,6, täysin tummat 0,2:sta, muutos 1,2 s, tummuus
  enintään 0,42 ja hieman viileä sävy. Pelaaja oppii ilman tekstiä: **täysin tummat reunat = sinut nähdään vasta alle
  5 metristä, kyyryssä alle 3,5 metristä.**
- **Oma kynttilä (UUSI):** palava kynttilä kädessä pitää valoisuuden vähintään 0,9:ssä. Kyyryssä liekki suojataan
  kämmenellä (NYK käsileike `suojaus`): valoisuus vähintään 0,45 ja valopiiri 3,5 → 1,75 m. Kynttilä paljastaa kantajansa.
- **Hahmon valo (UUSI):** lyhdyn kantaja valaisee pelaajan, valoisuus vähintään 1 − etäisyys / 4 m; kappalaisen lyhty
  2,5 m (NYK), soihtu 6 m. Lyhdyn 60°:n keila näyttää, minne hahmo katsoo. Soihdut ovat TULKINTA (tervasoihtua ei
  löytynyt lähteistä).

### 2.4 Kädet ja kannetut esineet

- Kantokohta kameran edessä oikealla (NYK `SeikkailuPelaaja.Kasi`, 0,2 / −0,3 / 0,45 m silmistä). Kädessä yksi esine,
  pienet (liuskekivi, avaimet, pikari) laukkuun.
- Kädet näkyvät vain toiminnan ajan ja kantaessa: tummat viitan hihat ja hanskat, ei ihoa (Linnanrakentajan kadet-v1).
  NYK eleet poiminnasta nousuun laiturille sekä kanto_idle ja suojaus; UUSI eleet puhallus, pressun nosto, oven avaus,
  avain lukkoon, tarjottimen kanto, reunalle nousu, köysi, pukeutuminen (M) ja arkun kilpien kääntö (M).
- **Valitsin (UUSI):** toiminto kohdistuu lähimpään esineeseen katseen suunnassa (±30°) 1,2 m:n säteellä (NYK
  `PoimintaM`), ei pelkän etäisyyden mukaan.

| Esine | Mistä | Arvot |
|---|---|---|
| Talikynttilä | tarjotin (3–4) | säde 3,5 m (NYK `Kynttilat.OmaValoM`), suojattuna 1,75 m (UUSI); sytytys liekistä ≤ 1,2 m, sammuu luukun edessä ja portaikossa (NYK) |
| Nauris, kivi, kauha, lautanen, savipurkki | keittiö, ranta | NYK 7 m/s eteen + 3,5 m/s ylös ≈ 7 m tasaisella, lento noin 1 s; UUSI: katseen pystykulma mukaan, kantama 3–9 m |
| Leipäveitsi | tarjotin (4) | työkalu (saumat, tiilet, köysi), 3 raapaisua per kivi (NYK); ei koskaan ihmisiin: toiminto ei tarjoa sitä |
| Tarjotin | keittiö (3) | kulkulupa huoneessa 4; molemmat kädet varattu; hahmot eivät epäile, kun et juokse etkä kyyristele |
| Avainrengas, köysikieppi | voudin pöytä (6), muurinharja (8) | avaimet laukkuun; köysi noin 15 m (pudotus 10–12 m [A]) |
| Kalkki, pateeni, liuskekivi | kappelin syvennys (5) | ei heitetä (NYK `Laske`) |

### 2.5 Piiloutuminen

- **Piilo (NYK):** `piilo:`-merkki, säde 0,7 m (`SeikkailuVartijat.PiiloM`). Tyyppi `kyykky` suojaa vain kyyryssä
  (pöydän alla, tynnyrien takana, alttarin varjo), `seisova` aina (uunin vieressä, kaari-oven syvennys,
  ampuma-aukkokomero 0,7 × 1,6 m). Piilossa hahmo ei näe pelaajaa lainkaan, ja katse kääntyy vapaasti.
- **Varjo:** valoisuus alle 0,2 ja kyyry = näkyy vain alle 3,4 m:stä, paikallaan alle 2,7 m:stä.
- **Nähty piiloon meno (UUSI):** jos hahmon mittari on vähintään 0,6 ja näkölinja vapaa, kun pelaaja menee piiloon,
  piilo ei suojaa: hahmo tutkii piilon (3.3) ja ottaa kiinni varoituksen jälkeen, ellei pelaaja lähde.

### 2.6 Kiipeäminen ja ryömintä

- **Matala reuna enintään 1,2 m:** ensimmäisessä persoonassa kamerapolkuna kuten nousu laiturille (NYK v44j),
  hanskakädet reunalla, 1,0–1,5 s.
- **Ulkoseinä (8), köysilasku ja uinti (10), ryömintä (tyrmä):** takakuva (kohta 7), merkit `kiipea:<id>` (NYK).
- **Kiipeilyn ohjaus (UUSI):** liike vie otteelta seuraavalle (0,6 s per ote), ei hyppyä. Tuulenpuuska varoittaa 1,5 s
  (tuuli voimistuu, viitta lepattaa): pysy paikallaan 2 s. Liike puuskassa → ote lipsuu mutta pitää; toinen lipsahdus
  peräkkäin → kuva himmenee 0,4 s ennen putoamista ja peli palaa kiipeilyn alkuun. Ei putoamiskuvaa, ei kuolemaa.

## 3. Vartijat ja muut hahmot

### 3.1 Näkökenttä ja hahmoprofiilit

- NYK `Vartija`: kartio 110° (±55°), 10 m täydessä valossa (2.3), näkölinja silmistä (1,6 m) rintaan (1,2 m); alle
  2 m:stä aistii myös selän takaa hitaammin (× 0,35). Kääntyy 160°/s, partioi 1,2 m/s, odottaa pisteissä `odota_s`.
- **Profiilit (UUSI parametrit samaan `Vartija`-luokkaan; `partio:`-merkkiin kentät `henkilo` ja `profiili`):**

| Profiili | Näkö | Kulma | Kuulee | Jahtaa | Kiinniotto | Erityistä |
|---|---|---|---|---|---|---|
| vartija (piha, portaat, muurikäytävä) | 10 m | ±55° | kyllä | 2,2 m/s | ottaa | lyhty tai soihtu, keihäs |
| portinvartija (2) | 10 m; riidassa 4 m | ±55°; riidassa ±35° | kyllä | 2,2 m/s | tarttuu (irtipääsy) | omat `portinvartija-*`-repliikit |
| kokki (3) | 6 m | ±45° | kyllä | ei | ei: huutaa `kokki-halytys-6`, pihan vartija tulee | kääntyy kolahdukseen 6 s |
| apulainen (3, 6) | 5 m | ±45° | ei | ei | ei; huoneessa 6 tunnistaa alle 2 m:stä | – |
| torkkuva vartija (4, 6, 7) | torkkuessa 0; syödessä 10 m vain katsejaksoissa | ±55° | kävely kivellä 2,5 m herättää | 2,2 m/s, nousee 1,5 s | ottaa | istuu muuriportaiden juurella; syö jaksoissa (pää alas 6 s, katse 3 s) |
| renki, vesipoika | ei havaitse | – | – | – | ei koskaan | rengin vartalo katkaisee näkölinjan |
| kappalainen, vouti (5) | käsikirjoitus (NYK `SeikkailuKappeli`, `VoudinKierros`) | | | | | |

### 3.2 Kuulo

- NYK: hahmo kuulee äänen, jos etäisyys on enintään äänen kuulosäde (`Aanilahde`); säteet ja seinäsääntö kohdassa 2.2.
- Kuultu ääni vie suoraan vaiheeseen 2 Tutkii (NYK ääni → `Etsinta`), ellei hahmo jo näe pelaajaa.
- Kappelin vouti kuulee tavallisen äänen vain vaarahetkellä ja kovan aina (NYK `VoudinKierros`).

### 3.3 Epäilyn vaiheet

| Vaihe | Koodissa | Alkaa | Hahmo tekee | Kesto | Seuraava |
|---|---|---|---|---|---|
| 0 Rauha | `Partio` | oletus | kulkee reittiä, odottaa pisteissä | – | 1 tai 2 |
| 1 Epäily | `Epaily` | mittari ≥ 0,3 | pysähtyy, kääntyy, nostaa lyhdyn | kunnes ei näe 2 s (NYK) | mittari < 0,05 → Paluu, muuten 2 |
| 2 Tutkii | `Etsinta` | ääni tai epäily raukeaa | kävelee 2,2 m/s paikalle, katselee ympärilleen | 6 s paikalla (NYK) | 3, jos mittari kävi ≥ 0,6, muuten Paluu |
| 3 Etsii | UUSI alitila | tutkinnan jälkeen | käy 2 lähintä piiloa tai varjoa ≤ 6 m, tökkii keihäällä | 15 s | Paluu + valppaus |
| 4 Hälytys | UUSI | mittari 1,0, pelaaja yli 1,2 m | jahtaa 2,2 m/s; huutaa, kun näkö on katkennut 3 s | jahti ≤ 20 s | 3 → Paluu + valppaus |
| 5 Kiinniotto | `Kiinni` | mittari 1,0, ≤ 1,2 m ja varoitus annettu (3.4) | ote olasta | – | tyrmä (kohta 4) |
| Paluu | `Paluu` | vaihe päättyy | lähimpään partiopisteeseen | – | 0 |

- **Valppaus 60 s (UUSI arvot):** epäilyraja 0,3 → 0,2, näkö 10 → 12 m, mittarin lasku 0,25 → 0,15/s, partion odotus
  −1 s. Alkaa vaiheiden 3–4 jälkeen ja tyrmästä palatessa. Kappelin vouti: kierros × 0,7 (NYK).

### 3.4 Varoitus aina ennen kiinniottoa

- **Sääntö (UUSI, testattava):** kiinni vasta, kun hahmo on ollut vaiheissa 1–4 vähintään 1,5 s, on antanut selvän
  merkin (repliikki tai ele: lyhty nousee, pää kääntyy) ja sydän on lyönyt vähintään 1 s.
- **Sydän (NYK ääni `sydan`):** alkaa, kun jonkin hahmon mittari on ≥ 0,6 tai hahmo jahtaa tai etsii alle 4 m:n
  päässä. Tempo 70 → 120 lyöntiä minuutissa mittarin 0,6 → 1,0 mukaan, loppuu 2 s vaaran jälkeen.
- Kappelissa varoitukset tulevat käsikirjoituksesta (NYK): voudin pysähdys 3 s ja laskeutuminen 6 s, kappalaisen
  valo oven alla 6 s.
- **Irtipääsy (omistajan päätös 1):** otteen jälkeen 1,0 s:n ikkuna; toiminto → kiertyy irti (hanskakäsi vetää hihan
  vapaaksi), hahmo horjahtaa askeleen ja pelaaja saa 3 s etumatkan. Kerran per hahmo 60 sekunnissa.

### 3.5 Hälytyksen leviäminen

- Huuto (vaihe 4) kuuluu 20 m samassa tai naapuriosassa: enintään kaksi muuta vartijaa tulee paikalle (vaihe 2),
  muut ovat valppaita 60 s. Kokin ja kappalaisen huutoon lähin vartija tulee 4–5 s:ssa (NYK käsikirjoitus).
- Hälytyskello (huone 10): kaikki vartijat valppaita loppuun asti.

### 3.6 Huudahdukset vaiheittain

Kaikki valmiita (manifest `repliikit-v1`, 31 kpl), ellei toisin merkitä. Yksi puhuja kerrallaan, tauko 4 s, sama
repliikki ei peräkkäin (NYK).

| Vaihe | Vartija | Muut |
|---|---|---|
| 0 Rauha | `vartija-torkku-1`, `vartija-tarjotin-1` (rooli) | `vesipoika-1`, valmiit kohtaukset |
| 1 Epäily | `vartija-epaily-1` "Hä?", `-2` "Kuka siellä?", `-3` (kuuli) | `portinvartija-epaily-3`, `kokki-epaily-5`, `kokki-epaily-3` (tarjotin) |
| 2 Tutkii | `vartija-etsinta-1` | `kokki-harhautus-1`, `-2` |
| 3 Etsii | `vartija-etsinta-2`, `-3` | – |
| 4 Hälytys | `vartija-valpas-1` (sama kuin tyrmän jälkeen) | `kokki-halytys-6`, `kappalainen-3` |
| 5 Kiinniotto | `vartija-kiinni-1`, `-2` | `portinvartija-tarttuu-4` |
| Paluu | `vartija-paluu-1`, `-2`, `-3` (pihan vartija) | `portinvartija-paluu-5`, `kokki-paluu-4` |

- **Ensimmäiseen palaan ei tarvita uusia repliikkejä.** Valinnaiset (UUSI, vaatii luvan): voudin epäily ja ote
  kappelissa, 2 kpl (käsikirjoituksen PUUTTUU).
- **M-osa (UUSI, vaatii luvan), arvio noin 30** kuten ehdotuksessa: apulainen 3 ("Kuka sinä olet?"), vartijat noin 15
  (muurikäytävä, "Kello soimaan!"), voudin ja aitan hoitajan kiista (yksi otto noin 30 s), soutaja 2, tyrmä 4.

## 4. Kiinnijäänti, tyrmä ja paluu

### 4.1 Kulku

| Aika | Mitä tapahtuu |
|---|---|
| 0,0 s | Ote olasta: hahmon käsi kuvan alareunassa, nytkähdys enintään 3° (ei tärinää), `vartija-kiinni-1`. |
| 0,0–1,0 s | Irtipääsyn ikkuna (jos omistaja hyväksyy, 3.4). |
| 1,0–2,5 s | Kuva himmenee; `vartija-kiinni-2`, jos sallittu (kappelissa vain `kappalainen-3`:n jälkeen, NYK). |
| 2,5 s → | Tyrmä: itäsiiven holvikellari E 101, 6,3–7,5 × 5,2–5,9 m [1L], tyrmäkäyttö FIKTIO. Istut oljilla (silmät 1,0 m), valoa vain raoista (valoisuus 0,15). Ensimmäisessä palassa ei puhetta (PT 7.10.). |
| 30–45 s | Äänetön pako (muunnelmat alla). |
| loppu | Viimeisin tarkistuspiste, armoaika 4 s (NYK `ArmoS`), valppaus 60 s, kerran `vartija-valpas-1`. |

**Pakomuunnelmat vuorotellen:**
1. **Pulu tuo avaimet:** Pulu lentää ilmaraosta avainnippu nokassa ja pudottaa sen olkiin 2 m:n päähän. Poimi →
   avaa ovi (kädet, `avain-lukko`) → käytävä → himmennys.
2. **Vesipojan ovi:** askeleet, sanko kolahtaa, ovi jää raolleen. Käytävässä torkkuu vartija: hiivi ohi. Tyrmän
   alueella et voi jäädä uudelleen kiinni; kova ääni saa vartijan vain mutisemaan.
3. **Irtokivi:** koputa seinää (ontto, `koputus-ontto`) → irrota kivi kolmella vedolla → ryömi aukosta (takakuva 5–8 s).

- Jos pelaaja ei tee mitään 20 s, Pulu antaa tason 2 vihjeen. Tyrmässä ei voi epäonnistua; 60 s:n jälkeen Pulu avaa
  oven itse (aikaraja on testattava vikasieto).
- Tila palautuu tarkistuspisteen tallennuksesta: esineet, avatut ovet ja arvoitusvaiheet kuten tarkistuspisteessä.

### 4.2 Anteeksianto

- 2. kiinnijäänti samassa huoneessa: huoneen hahmojen näkö −15 % ja epäilyraja 0,4 (UUSI, näkymätön helpotus).
- 3. kiinnijäänti: Pulu antaa tason 2 vihjeen heti tarkistuspisteessä. Helpotus päättyy, kun huone vaihtuu.

### 4.3 Tarkistuspisteet ja tallennus

- **Automaattinen tallennus (V6, NYK suunnitelma):** `persistentDataPath/seikkailu-olavinlinna.json` tapahtumista,
  ei ajastettuna: portaalin ylitys uuteen osaan (kynnys), arvoitusvaihe valmis, avainesine otettu (tarjotin, kynttilä,
  avaimet, köysi), löytö, paluu tyrmästä. Sisältö: tarkistuspiste, kädessä ja laukussa olevat, avatut ovet,
  arvoitusvaiheet, vihjetasot, kiinnijäämiset huoneittain, kulunut aika ja datan versio.
- **Jatka:** viimeisin tarkistuspiste ilman saapumista, armoaika 4 s. Tuntematon tunniste ohitetaan (NYK suunnitelma).

| Huone | Tarkistuspisteet |
|---|---|
| 1 | – (alku, ohitettava) |
| 2 | T2a ohjaus alkaa (`nousu:laituri`) |
| 3 | T3a pikkupiha (`ovi:porttikaytava-T102-loppu`), T3b keittiön ovi (`ovi:keittio-piha`), T3c tarjotin otettu |
| 4 | T4a Kirkkotornin ovi (`ovi:kirkkotorni-piha`), T4b Tott-kammio (`ovi:tott-kammio`) |
| 5 | T5a kaari-oven kynnys, T5b pimeä kappeli (NYK) |
| 6–10 | T6a muuriportaiden alapää, T6b naamio, T6c avaimet; T7a ampumakäytävä, T7b muurikäytävän ovi; T8a köysi, T8b kiipeilyn puoliväli; T9a komeron kynnys; T10a köysilaskun alku |

## 5. Vihjeet

| Taso | Pulu tekee (ilman sanoja) | Esimerkki kappelista |
|---|---|---|
| 1 Katse | lentää olalta näkyviin enintään 1,5 m eteen, katsoo kohdetta 3 s ja kujertaa kohteen suunnasta (`pulu-kujerrus`) | katsoo alttariseinää |
| 2 Lento | lentää kohteeseen ja istuu 10 s tai kunnes olet 1,5 m:n päässä | istuu kilpien alla |
| 3 Näyttö | nokkaisee oikeaa kohtaa (`pulu-nokka`) tai nostaa oikean esineen | nokkii saumaa |

- **Pyydettäessä:** Pulun reunakuvan napautus (NYK pohja) nostaa tasoa heti, enintään 3 (sitten taso 3 toistuu).
  Napautusten väli vähintään 10 s.
- **Itsestään:** taso 2, kun edistystä (uusi osa, arvoitusvaihe tai avainesine) ei ole tullut 180 s:iin, kerran
  jumia kohden; tyrmässä 20 s. Taso nollautuu edistyksestä.
- **Pulu ei vihjaa itsestään** vaarassa (hahmo vaiheissa 1–5 alle 15 m:ssä tai sydän lyö), keskustelun aikana, uuden
  huoneen ensimmäisellä minuutilla eikä kauko- ja takakuvissa. Vaarassa Pulu painautuu huppuun (reunakuvan olemassa
  oleva ele; jos sopivaa ei ole, Natiivi-UI kysyy Päätoimittajalta) ja pyydettäessä vain katsoo.
- Pulu istuu olalla näkymättä; maailmassa se näkyy vain vihjeissä ja tapahtumissa.

| Huone | Tason 3 kohde |
|---|---|
| 1 | – (ei ohjausta) |
| 2 | tynnyri riidan alkaessa, sitten portti |
| 3 | nauriskori → riippuvat padat → tarjotin |
| 4 | vartija (tarjotin kädessä); portaissa ampuma-aukkokomero |
| 5 | käsikirjoituksen vihjetaulukko (NYK) |
| 6 | seinän varjo → naulakko (esiliina) → kulho → avainrengas |
| 7 | ampuma-aukkokomero → muurikäytävän ovi → aukkojen välinen varjo |
| 8 | köysikieppi → sakara → seuraava ote |
| 9 | tiilen sauma → liuskekivi laukussa → arkun kilvet |
| 10 | köysi kramppiin → vesiraja → vene |

## 6. Ohjaus laitteittain

| Toiminto | iPad ja iPhone (vaaka) | Mac | Peliohjain |
|---|---|---|---|
| Kävele kohteeseen | napauta lattiaa (UUSI): reitti kävelyverkkoa pitkin 1,4 m/s, hiipii vaaran lähellä (2.1) | vasen napsautus lattiaan (UUSI) | – |
| Liiku tarkasti | vasen TAPPI (NYK) | W A S D, nuolet (NYK) | vasen sauva (NYK) |
| Hiivi, kyykky | tapin kallistus 12–50 % (UUSI) | Ctrl tai C (NYK) | B (NYK pito; UUSI: painallus vaihtaa) |
| Juokse | tappi reunaan yli 95 % (NYK) | Shift (NYK) | vasen sauvanappi (NYK) |
| Katso | oikea veto koko oikealla puoliskolla (olemassa oleva veto-pohja; 0,30°/pt vaaka, 0,22°/pt pysty, ei liukumaa) | hiiri, kursori lukittuna (NYK 0,12°/px) | oikea sauva (NYK 140°/s) |
| Toiminto: poimi, heitä, laske, sytytä, puhalla, koputa, irrota, avaa | toimintonappi (NYK OHJAUSNAPPI-pohja) tai napautus esineeseen alle 1,2 m:n päässä (UUSI) | E (NYK) tai napsautus esineeseen | X (NYK) |
| Käsittele käsin: ovi, arkun kilvet | veto esineestä alkaen (UUSI) | vasen pohjassa + hiiri | X pohjassa + oikea sauva |
| Pulun vihje | reunakuvan napautus (NYK) | P tai napsautus reunakuvaan (UUSI) | Y (UUSI) |
| Ohita välikohtaus | napautus (NYK) | välilyönti | A |

**Perustelu kosketukselle:** napautuskävely on kuin osoittaisi paikkaa, joten aikuinen ei-pelaaja pärjää ilman kahden
peukalon yhteispeliä (vrt. Myst). Tappi jää tarkkaan hiivintään, ja veto kääntää katsetta kuin kuvaa selaisi.
Kyykkynappia ei tarvita. Kaikki pohjat ovat olemassa; oikea TAPPI jää testikytkimeksi.

**Käsittely käsin (Amnesian tapaan, ilman kauhua):** napautus avaa oven hitaasti ja hiljaa (1,5 s). Veto antaa
hallinnan: hidas veto (alle 30°/s) on hiljainen, nopea narahtaa (4 m). Ensimmäisen palan nykyiset napautukset
(luukku, kivet) jäävät ennalleen.

**Pahoinvointi:**
- Näkökenttä 62° pystysuunnassa (NYK `FpFov`): vaakasuunnassa noin 82° iPadilla, 94° Macilla, 105° iPhonella.
- Ei pään keinuntaa eikä tärinää (NYK). Kiihdytys 0,18 s (NYK): lyhyt kiihdytys rasittaa vähemmän kuin pitkä liuku.
  Portaissa kameran korkeus pehmennetään 0,1 s:n viiveellä (UUSI).
- Napautuskävely ei käännä katsetta. Kamera kääntyy itsestään vain tapahtuman jälkeen, enintään 10° ja hitaasti
  (vähintään 0,8 s), eikä jos pelaaja on ohjannut viimeisen sekunnin aikana (UUSI; korvaa käsikirjoituksen 15°).
  Pimeässä reunojen tummuminen vähentää myös ääreisnäön liikettä.

## 7. Kamera

- **Pääsääntö:** ensimmäinen persoona (NYK): silmät 1,62 m, kyyryssä 1,0 m, ei vartaloa eikä peilikuvaa, kädet vain
  toiminnoissa. Kasvot eivät näy koskaan.
- **Takakuva (toissijainen):** huppu ja peittävät vaatteet (Linnanrakentajan Fogg-asu v2). Kamera 2,5 m takana ja
  0,4 m pään yläpuolella, kiertää enintään ±60° selän takana. Siirtymä silmistä ja takaisin 0,6 s.
- **Kaukokuva:** hahmo alle 10 % kuvan korkeudesta, mieluiten lintuperspektiivistä Pulun lentona; ohitettavissa.

| Kohta | Laji | Kesto | Mitä näkyy |
|---|---|---|---|
| 1 alku | kaukokuva K1 | 8–12 s | Pulu lentää Kyrönsalmen yli: vene pienenä hämärässä, tornit; sitten silmät pressun alle |
| 5 loppu (P) | kaukokuva K2 | NYK suunnitelma | holvin läpi yötaivaalle → drone nykyiseen linnaan → Kellotornin kaari |
| 7 alku | kaukokuva K3 | 5 s | Pulu lentää aukosta: muurikäytävä ja Kellotorni soihtujen valossa |
| 8 ulkoseinä | takakuva | 2–3 min | kiipeily otteelta otteelle |
| 10 köysilasku, uinti | takakuva | 30–45 s | laskeutuminen kalliolle, uinti veneelle |
| 10 sukellus | kaukokuva K4 | 4 s | sukellus salmeen kallion juurelta |
| 10 loppu | kaukokuva K5 | 10–15 s | virta vie veneen sumuun → drone |
| tyrmä, muunnelma 3 | takakuva | 5–8 s | ryömintä irtokiven aukosta |

**Kappelin käsikirjoitus ensimmäisessä persoonassa (korvaa olan yli -kohdat):**
1. "Kamera rajaa kohtauksen kaaren läpi" ja "nousee portaikon yläpäähän" → pelaaja katsoo itse syvennyksestä; voudin
   hehku näkyy portaikon seinällä.
2. "Kamera nojaa liekkiin, laskeutuu liekin tasolle, siirtyy lähemmäs, kohdistaa tai seuraa lähikuvassa" ja "molemmat
   kilvet ruudussa" → ei pakotettuja siirtoja: liekki kantokohdassa, kädet ja ääni kertovat, ja kohokuvat näkyvät,
   kun pelaaja tuo liekin alle metrin päähän.
3. "Kamera kääntyy hiukan ovea kohti" (kappalaisen paluu) → valo oven alla, askeleet ja sydän riittävät; käännös vain
   kohdan 6 säännöllä. Keskusteluissa ei puolilähikuvaa (NYK "ei lähileikkausta").

## 8. Huoneet

| Huone | Pääteko | Hahmot ja reitit | Piilot | Harhautus | Arvoitus, mekanismi | Min | Tark. | Kamera |
|---|---|---|---|---|---|---|---|---|
| 1 Veneyö | katso, nouse laiturille | soutaja, renki | pressu | – | – | 1 | – | K1 |
| 2 Laituri, portti | pihalle näkymättä | portinvartija, riita, renki laituri ↔ portti | tynnyrit, säkit, rengin selkä | kivi | riidan ikkuna | 2 | T2a | – |
| 3 Piha, keittiö | ota tarjotin | kokki, apulainen, vesipoika, pihan vartija | pöydän alla, tynnyrit, uuni | nauris patoihin, patapino | tarjotin = kulkulupa | 2,5 | T3a–c | – |
| 4 Kirkkotorni | vartijan ohi ylös | torkkuva vartija, vastaantulija | porraskomero | – | rooli tai hiivintä | 1,5 | T4a–b | – |
| 5 Kappeli | valoarvoitus | kappalainen, vouti | syvennys, alttarin varjo | puhallus | kilvet, veto, koputus, saumat | 3,5 | T5a–b | K2 |
| 6 Linnantupa, sali | ohitus, naamio, avaimet | syövä vartija, linnaväki, apulainen, vouti, hoitaja | seinän varjo, penkit, ikkunasyvennys | – | ohitus selän takaa, naamio, taskuvarkaus | 3,5 | T6a–c | – |
| 7 Ampuma- ja muurikäytävä | muurikäytävälle | kirjuri ja renki, lyhtyvartija | komerot, aukkojen välit | kivi aukosta | avain oveen | 2 | T7a–b | K3 |
| 8 Muurinharja, ulkoseinä | köysi, kiipeily | vartija ja talonpoika, lyhty yllä | jähmettyminen | – | otteet, puuskat | 3 | T8a–b | takakuva |
| 9 Komero | komero ja arkku auki | vartija yllä | – | – | tiilet, kilvet | 2 | T9a | – |
| 10 Pako | alas ja veneelle | kello, 2 vartijaa, soutaja | – | – | köysilasku, ajoitus | 1,5 | T10a | takakuva, K4, K5 |

### 8.1 Säätöarvot huoneille 1–5 (nykyinen pala v44k)

**1 Veneyö.** Reitti NYK `vene:alku → muuri → portti → laituri`, 45–60 s, ohitus napautuksella; `soutaja-1` 56 %:ssa
ja `soutaja-2` 88 %:ssa matkasta (NYK `DioraamaSovitin`). UUSI: K1 alkuun, sitten silmät pressun alla 0,7 m vedestä
(ehdotus 2.2; nyt perässä 1,2 m), katse ±40° vaaka ja −10…+35° pysty. Lopuksi pressun nosto (kädet) ja nousu
laiturille kamerapolkuna (NYK v44j).

**2 Laituri ja portti.** Ohjaus alkaa `nousu:laituri` (NYK); laituri puuta, ranta soraa. Portinvartija (UUSI, paikka
Linnanrakentajan jonossa) lyhdyn kanssa portilla. Riita `soutaja-2` → `portinvartija-riita-1` → `-2` avaa 12 s:n
ikkunan (näkö 4 m, ±35°, selin porttiin) → `portinvartija-paluu-5` → valmis Laituri-kohtaus. Renki (UUSI
`partio:renki-N`) kantaa säkkejä laituri ↔ portti 25 s:n kierroksin; hänen takanaan 1–2 m on liikkuva piilo. Piilot
(UUSI): 2 tynnyriä ja säkkipino (kyykky). Reitin vesiportin bastioni (1602–03) on anakronismi; korjaus on
Linnanrakentajan jonossa eikä estä huomista.

**3 Pikkupiha ja keittiö.** Kokki (UUSI profiili NYK reitille `partio:keittio-1` ↔ `-2`, 5,1 m, odotukset 4 ja 3 s,
malli kokki-1500; kohtauksen paikallaan oleva kokki piiloon kuten kappelissa): tulisijan valo 6 m pitää kokin
ympäristön valoisana (0,6–0,7). Pihan vartija (NYK `partio:piha-1` ↔ `-2`, 4,7 m,
odotukset 5 ja 3 s) kiertää hiilipannun (valo 2 m, UUSI) ja Kirkkotornin oven välillä. Lattia puuta [1L]: kävely
kuuluu 3,5 m. Heitettävät NYK `savipurkki`, `kauha`, `nauris`, `lautanen`; UUSI `patapino`
(kaadettava, 16 m) ja `tarjotin` (leipä, olutkannu, talikynttilä, leipäveitsi). Kolahdus → kokki tutkii 6 s (NYK
`KokkiKuuleeKolahduksen`) = tarjottimen ikkuna. Piilot NYK: pöydän alla, tynnyrien takana, uunin vieressä.

**4 Kirkkotorni ja portaat.** Tarjotin kädessä kukaan ei epäile kävelijää. Tott-kammiossa muuriportaiden juurella
istuu torkkuva vartija (UUSI merkki, profiili torkku; vrt. Olaus Magnuksen tarina nukkuvasta vartijasta, LEGENDA).
Tarjottimen kanssa hän herää eväisiin: `vartija-tarjotin-1`, ottaa leivän ja oluen (hänen kätensä näkyvät), osoittaa
ylös ja jää syömään portaiden juurelle (käsikirjoitus E3; paluu huoneessa 6). Käteen jää palava kynttilä, veitsi
laukkuun. Ilman tarjotinta hiivi ohi (`vartija-torkku-1`). Portaissa vastaantulija (UUSI
`partio:portaat-N`): valo kasvaa kaarevalla seinällä 3 s ennen häntä → astu ampuma-aukkokomeroon (UUSI seisova
piilo). Tott-kammion eteläovelta vain Linnantuvan vaimea hälinä (PT 7.10.).

**5 Kappeli** (NYK E3a–d, arvot ennallaan): voudin kierros 40 s, vaarahetki 5 s, pysähdys 3 s, laskeutuminen 6 s;
kappalainen palaa raapaisusta tai 100 s:n kuluttua 6 s:n varoituksella; saumat näkyvät, kun kynttilä on enintään
0,9 m:n (asetettu) tai 0,5 m:n (kädessä) päässä; 4 kiveä × 3 raapaisua. Uutta vain suojatun kynttilän 1,75 m ja
kameramuutokset (kohta 7).

### 8.2 Huoneet 6–10 vaiheittain (M)

**6 Linnantupa ja voudin sali.** Kaari-ovelta kuljetaan samoja muurinsisäisiä portaita alas, joita noustiin
huoneessa 4, Tott-kammioon ja sen eteläovesta Linnantupaan (ovi [V: L2, L15]; ei uutta salakäytävää). Palatsi
itäsiivessä [V]; Linnantupa Tott-kammion tasolla, noin 6,5 × 17 m [A]; voudin sali (nyk. Kuninkaansali, TULKINTA)
noin 4 m ylempänä, tynnyriholvi [V], ikkunasyvennyksessä vaakunalaatta [1L] (HUONE6-PALATSI.md).
1. Portaat alas. Viimeisellä käänteellä kuuluu syöminen ja takan rätinä, ja varjo liikkuu seinällä: huoneen 4
   vartija istuu portaiden juurella selin portaisiin (tarjotinreitillä syö, hiivintäreitillä torkkuu; 3.1).
2. Ohitus selän takaa: hän syö jaksoissa, pää alas 6 s ja juoma ja katse sivulle 3 s (UUSI ele). Takan hiillos
   valaisee kammion keskiosaa (valoisuus 0,4–0,5, TULKINTA), seinän vierus jää pimeäksi (0,2). Puhalla tai suojaa
   kynttilä portaissa ja hiivi seinän vierustaa pää alas -jaksoissa noin 5 m Linnantuvan ovelle.
3. Naulakko Tott-kammiossa Linnantuvan oven vieressä, varjossa (UUSI merkki): esiliina ja myssy, pukeutuminen 2 s
   pää alas -jaksossa. Viitta jää naulaan, ja kädet näkyvät palvelijan hihoissa (FIKTIO).
4. Naamiossa kävelet Linnantupaan: vartija ei epäile palvelijaa. Linnaväki syö ja pelaa noppaa (valmis
   Keskushalli-kohtaus), apulainen tarjoilee. Ota keittokulho pöydältä; juoksu tai kyyry herättää epäilyn.
5. Portaat saliin (noin 20 askelmaa, paikka [A]). Kulho voudin pöytään: vouti syö, ja hänen ja aitan hoitajan kiista
   puuttuvasta kalkista alkaa (UUSI, vaatii luvan, noin 30 s).
6. Kiistan aikana vouti kääntyy kahdesti 6 s:ksi hoitajan luetteloon: ota avainrengas pöydältä. Sitten takaisin
   Tott-kammioon (huone 7).
Väärin: vartija näkee ennen naamiota → vaiheet 1–5 (istuva nousee 1,5 s ennen jahtia) · pukeutuminen hänen
katsoessaan → vaihe 1 · apulainen alle 2 m:ssä yli 2 s → "Kuka sinä olet?" (UUSI) ja vaihe 2 · avaimet voudin
katsoessa → ote ranteesta → irtipääsy tai tyrmä · kulho ilman naamiota → apulainen ottaa sen ja epäilee.

**7 Ampumakäytävä ja muurikäytävä** (korvaa ehdotuksen "Kellotornin kierreportaat": piirroksissa Kellotornissa ei
ole kierreporrasta, ja torniin tultiin muurikäytävältä [A]). Kappelin ampumakäytävä, pohjoismuurin käytävä ja
Kellotornin kehäkäytävä ovat noin +96,5:n tasolla [A], ja Kirkkotornista johtaa pohjoismuurin 4-aukkoinen käytävä
Kellotornin kehäkäytävään [1L, opas 1923] (SEIKKAILU-TARKISTUS.md).
1. Portaiden juurella vartija torkkuu nyt vatsa täynnä: kävele naamiossa tai hiivi ohi. Muuriportaat ylös kappelin
   ohi; kirjuri ja renki tulevat vastaan (valmis Kierreportaat-kohtaus): odota ampuma-aukkokomerossa.
2. K3 (5 s). Ampumakäytävä kappelin yllä: 8 aukkoa, kuunvaloa aukoista.
3. Muurikäytävän ovi on yöllä lukossa (TULKINTA): avainrengas; hidas avaus hiljaa, nopea narahtaa (4 m).
4. Pohjoismuurin käytävä: vartija lyhdyn kanssa edestakaisin 30 s:n kierroksin. Aukot ovat valoa ja välit varjoa:
   odota kyyryssä aukkojen välissä ja liiku, kun lyhty kääntyy. Hätävara: kivi aukosta pihalle → hän kurkistaa 6 s.
5. Kellotornin ovelta kuuluu vaimeana valmis Fatabuuri-kohtaus ("Kellotornin holviin ei tulla kuin avaimella"), joka
   vie ajatuksen torniin ja arkkuun ilman uutta puhetta.
Väärin: ovelle ilman avaimia → kahva kolahtaa (6 m) · aukon kuunvalossa lyhdyn kääntyessä → vaihe 1–2 · juoksu → 6 m.

**8 Muurinharja ja ulkoseinä.** Pohjoismuuri liittyy Kellotorniin itä- ja koillispuolella; kehää pitkin komerolle
noin 18–19 m [A]. Laattojen molemmin puolin rautakrampit [1L]; muut otteet (telinereiät, reunat) TULKINTA.
1. Tornin liitoksessa vartija ja talonpoika katsovat järvelle (valmis Muurinharja-kohtaus alkaa 8 m:stä).
2. Ota köysikieppi heidän takaansa kyyryssä; talonpoika kääntyy kerran 4 s:ksi kohti käytävää, pysy silloin varjossa.
3. Kiinnitä köysi sakaraan (kädet) ja nouse kaiteen yli: takakuva.
4. Noin 10 otetta tornin ympäri; kaksi tuulenpuuskaa (2.6).
5. Lyhty kulkee yläpuolella kerran: valopiiri kasvaa seinällä 2 s → jähmety 4 s.
6. Komeron kynnys (85 cm leveä): silmiin 0,6 s:ssa.
Väärin: liike puuskassa → ote lipsuu, toisella kerralla alkuun · liike lyhdyn valossa → vaihe 1; jatkuu 2 s →
hälytys → tyrmä (vartijat vetävät köydestä, ei näytetä, FIKTIO) · köysi heidän katsoessaan → vaihe 1–2.

**9 Komero, finaali.** Segmenttikaarinen komero 195 × 85 × 56 cm, tiilillä umpeen muurattu [1L, Härö 1997]; kynnys
mallissa y 14,8 (NYK `nakyma:kellotorni-kaari`); alla kallio 10–12 m [A].
1. Kuunvalo viistosti: tiilimuurauksen saumat näkyvät (sama sääntö kuin kappelissa).
2. Irrota tiilet veitsellä (6 tiiltä × 2 raapaisua, UUSI). Ensimmäinen putoaa aina kalliolle (14 m): yläpuolella
   vartija pysähtyy 3 s, jähmety.
3. Seuraavat tiilet vedolla: hidas veto laskee tiilen komeroon, nopea pudottaa.
4. Rautahelainen arkku (noin 60 × 45 × 40 cm [A], FIKTIO), kannessa kaksi kääntyvää kilpeä.
5. Liuskekivi laukusta käteen 2 s: kilvet kallistuvat toisiaan kohti.
6. Käännä kilvet vetämällä 45° toisiaan kohti (sallittu ±10°): loksahdus (`arkku-kansi`), kansi aukeaa.
7. Kuunvalo osuu hopeaan, välke. Löytö paikallisaarteen pohjalla (NYK `NaytaLoyto`). Pikari laukkuun, arkku jää.
Väärin: väärä asento → kolahdus (6 m), ei aukea, ei rangaistusta · toinen tiili putoaa 10 s:n sisällä → vartija
kurkistaa sakaran yli lyhty koholla 6 s: jähmety.

**10 Pako.** Komeron alla kallio, pudotus 10,3–12,5 m, vesi 14–22 m:n päässä, kallio 25–35° [A]: komerosta ei voi
hypätä veteen. Hälytyskello yhdessä tornissa [1L], pelissä Kellotorni (TULKINTA).
1. Kello soi (`kello`): välke näkyi muurille (FIKTIO). Kaikki vartijat valppaita.
2. Köysi kramppiin → köysilasku (takakuva). Lyhty pyyhkäisee seinää ylhäältä 2 s:n varoituksella: pysähdy.
3. Kalliolla ensimmäisessä persoonassa noin 15–20 m alas vesirajaan.
4. K4: sukellus salmeen.
5. Uinti veneelle 10–15 s (takakuva, virta kuljettaa). Soutaja ojentaa kätensä, ja hanskakätesi tarttuu siihen.
6. Vartija pitää veneen kiinnitysköydestä rannalla: katkaise köysi veitsellä tai töytäise hänen kätensä irti, jolloin
   hän istahtaa matalaan veteen vahingoittumatta (omistajan päätös 1).
7. K5: virta vie veneen sumuun → drone nykyiseen linnaan → tietokerros (NYK).
Väärin: lyhty osuu köysilaskussa → huuto ja 3 s viive, pako jatkuu · kalliolla yli 25 s kellon alusta → kaksi
vartijaa soihtuineen rannassa (lähestyvät näkyvästi koko ajan) → varoitus → kiinni → T10a.

## 9. Kokonaiskesto ja vaikeus

| Huone | 1 | 2 | 3 | 4 | 5 | P yht. | 6 | 7 | 8 | 9 | 10 | Koko |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Sujuva, min | 1 | 2 | 2,5 | 1,5 | 3,5 | 10,5 | 3,5 | 2 | 3 | 2 | 1,5 | 22,5 |
| Tutkiva, min | 1,5 | 3 | 4 | 2,5 | 5 | 16 | 5 | 3 | 4 | 3 | 2 | 33 |

- Kiinnijäänti lisää noin 1–1,5 min (tyrmä ja paluu tarkistuspisteeseen).
- Tavoite: aikuinen ei-pelaaja pelaa ensimmäisen palan ensimmäisellä kerralla 15–20 minuutissa enintään kolmella
  kiinnijäännillä; tottunut pelaaja 10–12 minuutissa, 0–1 kiinnijääntiä.
- Yksi vaikeustaso, ei valikkoa. Anteeksianto: juoksu on jahtaajaa nopeampi, vähintään kaksi piiloa per huone,
  varoitus aina (3.4), tyrmä ei epäonnistu, tarkistuspiste joka huoneen alussa, helpotus (4.2) ja Pulun vihjeet.
  Aikarajoja on kaksi (kappalaisen paluu 100 s, pako 25 s), ja molemmat näkyvät ja kuuluvat ennen kuin laukeavat.

## 10. Äänimaailma

- **Ei musiikkia hiiviskelyn aikana:** jännite tulee hiljaisuudesta, askelista ja sydämestä.
- **Valmiina** (CC0/PD, linna-aanet v1 ja aanet-e3-v1, NYK): askeleet `askel-kivi`, `askel-porras-1/-2`,
  `askel-puu`; ympäristöt (`jarvi-`, `laituri-laineet`, `linna-`, `muuri-tuuli`, `porras-kaiku`, `tippa`, huoneiden
  ambienssit, `laulu-kaukaa`, `kello`, `kello-kappeli`); tulet (`tulisija-`, `soihtu-`, `takka-`, `kynttila-ratina`);
  esineet (`pikari-1/-2` kolahduksena, `pata`, `vesisanko`, `ovi-puu`, `koysi-narina`, `keihas-kolahdus`,
  `arkku-kansi`, `avain-lukko`, `koputus-ontto/-umpi`, `raapaisu`, `kivi-*`, `puhallus`, `sammutin`, `luukku-*`,
  `lyhty-narina`, `liina-avaus`, `hopea-kilahdus`, `tuuli-rako`); vaara ja Pulu (`sydan`, `pulu-kujerrus`,
  `pulu-hammastys`, `pulu-nokka`).
- **Tarvitaan (UUSI; ensin CC0/PD Freesoundista tai Commonsista, generointi vain omistajan luvalla):** askeleet
  oljella, soralla ja matalassa vedessä (4–6 varianttia, hiivintä = sama hiljempaa); viitan kahina, hanska esineeseen,
  köysi käsissä, uinti ja sukellus (ei hengitystä eikä ääntelyä); vartijan varusteet, kokin kauha, apulaisen luuta;
  nauris, savipurkin rikkoutuminen, patapinon kaatuminen, tiili kalliolle, kolikot ja hopea arkussa, sytytyksen
  leimahdus, tarjottimen kolina; elokuun yön linnut ja kaukainen koira.
- **Löytömerkki (UUSI, omistajan päätös 4):** 2–3 s, kanteleen 3–4 säveltä kalkin ja hopean löydössä. Kantele sopii
  linnaan myös Olaus Magnuksen kertomuksen vuoksi (LEGENDA: virralla kanteletta soittava neito).
- **Loppumusiikki (UUSI, omistajan päätös 4):** 60–90 s drone-näkymän alle samasta aiheesta.
- **Tasot** kuten linna-aanissa (silmukat −23 LUFS, kerta-äänten huippu −6 dBFS), repliikit −17,2 dB (NYK).

## 11. Automaattinen testattavuus

Ennen junaa vain automaattiset testit ja käännös (omistaja 7.10.): ei roolien omia käännöksiä, savuja eikä
iPad-mittauksia. Huonesimulaatio (UUSI) ajaa Ytimen luokat huoneen datalla (`merkit.json`: partiot, piilot, liekit,
esineet; seinät osien rajoista, näkölinja yksinkertaistettuna) ilman Unityä.

| Taso | Testi | Väittämä ja raja |
|---|---|---|
| Ydin (`Linssit-testit/Testit`) | valo, pimeä, selkä | valoisuus 1,0 edestä 5 m: epäily ≤ 0,6 s, ei kiinni ennen varoitusta; 0,1 kyyryssä 4 m: ei epäilyä 30 s:ssa; 3 m takana: ei havaintoa |
| Ydin | pinnat, vaiheet | 18 pinta × tila -arvoa (kivi, kävely 2,4 m → tutkii, 2,6 m → ei; eri osa ei kuule); vaiheiden kestot ±0,1 s; valppaus 60 s |
| Ydin | varoitus | 1 000 satunnaista ajoa siemenellä: 0 kiinniottoa ilman 1,5 s:n varoitusta ja merkkiä |
| Ydin | piilo, kynttilä, vihjeet, tallennus, tyrmä | nähty piiloon meno ei suojaa; suojaus 1,75 m; 180 s → taso 2 kerran, vaarassa ei; tallennus → palautus = sama tila; jokainen tyrmän muunnelma ≤ 45 s |
| Huonesimulaatio | varjoreitti | testiajuri hiipii `reitti:pelaaja-<huone>-N` -merkit: 0 kiinnijääntiä, aika ≤ 2 × sujuva |
| Huonesimulaatio | valoreitti | sama reitti kävellen soihdun alta: kiinni ≤ 10 s, varoitus ennen |
| Huonesimulaatio | harhautus | heitto 6 m:n päähän: lähin hahmo kääntyy ≤ 1 s, on paikalla ≤ 5 s |
| Huonesimulaatio | arvoitus ja jumi | kappelin vaiheet 1–11 → löytö; jokainen käsikirjoituksen väärä yritys → ei jumia; 180 s paikallaan → Pulu taso 2 kerran |
| Vain vianselvitys (ei ennen junaa/TF:ää, omistaja 7.10.) | lokiajo | simulaattorissa `poikki seikkailu botti <huone>` (UUSI) lokiväittämin: huoneet 1–5, tyrmä × 3, jatka tallennuksesta, kehysaika lokiin |
| Vain vianselvitys (ei ennen junaa/TF:ää) | kuva | takakuvan kulma selästä ≤ 60° joka kehyksessä; kaukokuvassa hahmo < 10 % kuvasta; seikkailussa ei näkyvää tekstiä paitsi löytö- ja tietokerrospohjissa |

## 12. Työjako huomiselle (8.10.)

Tavoite illan junaan: **ensimmäisen persoonan pala laituri → keittiö → kappeli pelattavana** (huoneet 1–5)
Thief-hiiviskelyllä ja tyrmällä. Huoneet 6–10 vain pohjatyönä.

| Vaihe | Siirtoseppä | Linnanrakentaja | Natiivi-UI |
|---|---|---|---|
| 1 aamupäivä | kallistusvyöhykkeet, napautuskävely, automaattinen hiivintä, valitsin, portaiden pehmennys, käännössääntö (2, 6) | kadet-v1 → v44l; pinnat (2.2); merkit: portinvartija, renki, tarjotin, patapino, torkkuva vartija, porraskomero, hiilipannu, `reitti:pelaaja-*` | oikea veto, oikea TAPPI testikytkimeksi; napautus maailmaan ja Pulun reunakuva kytketään Siirtosepän luokkiin |
| 2 iltapäivä | `Vartija`-lisäykset ja profiilit (kohta 3) | tyrmä E 101 karkeana: holvi, ovi, ilmarako, oljet, irtokivi | toimintonapin uudet tilat (puhalla, avaa, kaada, aseta, anna tarjotin) olemassa olevin kuvakkein |
| 3 alkuilta | kappelin muutokset (7), tyrmä (muunnelma 1), tarkistuspisteet portaaleista | huone 6 karkeana (HUONE6-PALATSI.md); Tott-kammioon naulakko Linnantuvan oven viereen ja takan hiillos | testi: seikkailussa ei näkyvää tekstiä |
| 4 ilta | V6 tallennus, vihjeportaat, huone 1 pressun alla + K1, tarjotin ja riidan ikkuna; testit → junakuittaus yhdellä rivillä | huoneet 7–8 (muurikäytävä, Kellotornin otteet) | – |

- **Sisältökirjuri:** repliikkien ja käsikirjoitusten sukupuolitarkistus ja englanninnettavuus (31 + kappeli;
  omistaja 18.6x); CC0-lista uusille tehosteille (kohta 10) LAHTEET-muodossa.
- **Pelikoodari:** äänimanifesti `seikkailu/olavinlinna/aanet-fp-v1` (kuten `aanet-e3-v1`) CC0-tehosteista, ei
  generointia.
- **Jos aika loppuu**, pois jäävät tässä järjestyksessä: K1, renki, portinvartija (huone 2 toimii nykyisellään) ja
  torkkuva vartija (silloin pihan vartija ottaa tarjottimen). Varoitussääntö, tyrmä, kappelin muutokset ja tallennus
  eivät jää pois.

## 13. Omistajan päätettävät

1. **Tappelun muoto.** Suositus: irtipääsy otteesta (1 s, kerran per vartija minuutissa) ja pakokohtauksessa köyden
   katkaisu tai yksi töytäisy matalaan veteen; ei lyöntejä eikä kompastuttamista.
2. **Kosketuksen oletusohjaus.** Suositus: napautuskävely, vasen tappi ja oikea veto ilman kyykkynappia (hiivintä
   tapin kallistuksesta ja itsestään vaaran lähellä).
3. **Toimintonapin kontekstikuvakkeet (käsi, kaari, liekki).** Suositus: kyllä; nappi kertoo ilman tekstiä, mitä tekee.
4. **Löytömerkki ja loppumusiikki.** Suositus: kanteleaihe (2–3 s löydössä, 60–90 s lopussa) PD/CC0-äänitteestä.
5. **Uudet repliikit.** Suositus: ensimmäiseen palaan ei uusia; M-osan noin 30 (+ 2 voudin valinnaista) pyydetään
   luvalla, kun M-osan käsikirjoitus on valmis.
6. **Reitin korjaus lähteiden mukaan (M).** Suositus: hyväksy. "Kellotornin kierreportaat" → muurikäytävä, ja pako
   köysilaskuna kalliolle eikä hyppynä veteen (Kellotornissa ei ole kierreporrasta, komeron alla on kallio).
