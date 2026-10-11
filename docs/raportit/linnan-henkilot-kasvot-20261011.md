# Olavinlinnan henkilöt ja kasvot: luettelo ja ehdotus (Linnanrakentajan apuagentti 11.10.2026 klo 16.5x)

Omistajan palaute: hahmot näyttävät samalta (kokki = soutaja) eivätkä näytä suomalaisilta. Tässä on luettelo ja ehdotus,
**ei vielä mallinnusta**. Tarkistetut lähteet: `_valmiit/olavinlinna-blender-v44/hahmot/` (glb-otsakkeet luettu), `linna-hahmot/`
(v1/LAHTEET.md, paa-v1/LUEMINUT.md, metahuman-v1/LAHTEET.md), `tools/dioraama/blender/hahmot_era1.sh`, soutajan
kasvot-v1/eleet-v1 LAHTEET.md, `kavely/merkit.json`, repliikkimanifestit (v5, läpi-v2, soutaja-v2), `aanipankki-v1/kartta-olavinlinna.json`,
`olavinlinna-repliikit-m-v1/kasikirjoitus.md`, botin loki 16.30 ja faktapohja (origin/main `docs/raportit/faktapohja-olavinlinna-1500.md`).

## 1. Miksi kaikki näyttävät samalta (mitattu glb:istä)

- **Kaikilla kymmenellä miehellä on sama pää**: Quaterniuksen UBC `Superhero_Male` (verkko `Sphere.005_Retopology.001`, 1 555 kärkeä,
  16 ARKit-muotoa; soutajan FACEIT 52 -versiossa 1 483 kärkeä). Iho on aina `T_Superhero_Male_Dark` 512² (pelissä kirkastettu
  1,35·p^0,8, vallitseva sävy noin sRGB 238/174/131 eli oranssinruskea). Kädet ovat `T_Regular_Male_Dark`. UBC:n vaaleampi
  `T_Superhero_Male_Ligh` on lähteissä, mutta sitä ei käytetä.
- **Silmät ovat kaikilla ruskeat** (`T_Eye_Brown`). Kulmakarvat, tukka ja parta ovat samaa `T_Hair_1`-kuvaa, joka on värjätty
  keskiruskeaksi (hiusvari 0,40–0,50, pelissä noin 80/62/45). Ainoa poikkeus on kappalaisen harmaa.
- Hiusmalleja on vain kaksi (Hair_Buzzed, huppu), ja partoja on yksi (Hair_Beard: muotoiltu, tumma, "sankarimainen").
  Hahmot eroavat käytännössä vain asultaan.
- **Apulainen** on ainoa nainen: UBC `Superhero_Female` + `T_Superhero_Female_Dark_BaseColor`, ruskeat silmät, huppu.
- **Vouti**: paketissa on myös `vouti-1500-mh.glb` (Epic MetaHuman -pää, kalju, ei kulmia eikä ripsiä). Natiivi
  (`DioraamaSovitin.HahmonLahde`) korvaa sillä faceit-glb:n, kun se on paketissa. **MetaHuman ei ole PD/CC** (Epicin lisenssi,
  omistajan lupa 9.10.).

Ryhmät, joilla on sama pää ja samat hius- ja partaverkot (vain hiusvärin sävy eroaa):

| Ryhmä | Hahmot | Pää ja karvat |
|---|---|---|
| A: parta + lyhyt tukka | **soutaja, kokki** (verkot identtiset: 363/329/298/231 kärkeä), vouti-faceit | Superhero_Male + Hair_Beard + Hair_Buzzed |
| B: huppu + parta | vartija, portinvartija, talonpoika | Superhero_Male + Hair_Beard + huppu |
| C: lyhyt tukka, ei partaa | kirjuri (= aitan hoitaja), kappalainen (harmaa) | Superhero_Male + Hair_Buzzed (kärkimäärät samat) |
| D: huppu + lyhyt tukka, ei partaa | renki, vesipoika (kärkimäärät samat) | Superhero_Male + Hair_Buzzed + huppu |
| E | apulainen | Superhero_Female + kulmat + huppu |

Merkkien käyttö (merkit.json; botin loki: "vartijat 20"):

| Malli | Kertaa | Merkit |
|---|---|---|
| **vartija-1500** | **10** | partio:piha, partio:muurikaytava, seisoo:harja-vartija, seisoo:ranta-vartija, partio:ranta, istuu:tyrma-vartija, istuu:linnavaki-1 ja -3, istuu:torkkuva-vartija, partio:portaat |
| talonpoika-1500 | 3 | seisoo:harja-talonpoika, istuu:linnavaki-2 ja -4 |
| renki-1500 | 3 | partio:renki (laituri), istuu:noppa-1 ja -2 |
| muut | 1 kukin | kokki (keittiö), apulainen (linnantupa), vouti (sali), kirjuri (seisoo:aitan-hoitaja), portinvartija (vesiportti); soutaja veneessä (soutu.json) |

Kappalainen ja vesipoika tulevat kohtausten kautta (kappeli; piha ja tyrmän pako 2).

## 2. Henkilöt: kuka puhuu, missä ja ehdotettu ulkonäkö

Ääni = äänipankin v1 hahmo (ikä on äänen ikä, ja ulkonäkö sovitetaan siihen). Ulkonäössä noudatetaan koko taulukossa samaa linjaa:
vaalea viileä iho, vaaleat tai vaaleanruskeat hiukset, vaalea tai ruskea parta tai sänki (ei mustaa eikä muotoiltua partaa), siniset tai
harmaat silmät sekä leveähköt poskipäät ja pyöreähkö kasvon ala-osa. Silmien ja hiusten värit on jaettu niin, ettei kahdella
lähikasvolla ole samaa yhdistelmää.

| # | Henkilö | Rooli / paikka | Puhuu? (ääni, repliikit) | Nykyinen pää, kuka jakaa | Ehdotettu ulkonäkö |
|---|---|---|---|---|---|
| 1 | **Soutaja** | Vene, laituri, pako (huoneet 1–2, 10) | Kyllä: mies-55 karhea tuulinen; v5 2 + soutaja-v2 6 + pako 2 | A: sama kuin kokki (FACEIT 52 -versio olemassa) | Mies 55. Tuulen ahavoittama punakka iho, rypyt silmäkulmissa. Harmaantuva vaaleanruskea tukka, lyhyt ja sekainen. **Harmaantuva vaalea lyhyt täysparta**, epätasainen reuna. Harmaansiniset silmät. Leveät poskipäät, leveä matala nenänselkä, kapeat huulet, syvät otsarypyt |
| 2 | **Kokki** | Keittiö G 102, pikkupiha (huone 3) | Kyllä: mies-45 äänekäs komentaja; 6 | A: = soutaja | Mies 45. **Pyöreät täyteläiset kasvot**, pieni kaksoisleuka, tulisijan punoittamat posket ja nenä. Punertavan vaalea tukka lyhyeksi leikattuna myssyn alla. **Ei täyspartaa: viikset ja parin päivän sänki** (erottaa soutajasta). Vaaleansiniset silmät, paksut kulmat |
| 3 | **Vartija A (päävartija)** | Piha, portaat, tyrmä (torkku), muurikäytävä | Kyllä: mies-45 jämäkkä karhea; v5 14 + läpi-v2 14 + 4 | B: vartija (10 merkkiä) | Mies 45. Kulmikas leveä leuka, raskas kulmaharjanne, pieni arpi kulmassa. Tuhkanruskea lyhyt parta, ohimoilla harmaata. Harmaat syvällä olevat silmät, leveä kaula |
| 4 | **Vartija B (vartija2)** | Ranta (soihtu, köysi), pako, harja | Kyllä: mies-30 letkeä pelimies; 2–3 | B: = vartija | Mies 30. Kapeammat kasvot ja vino virne. Pellavanvaaleaa tukkaa hupun reunasta. **Vain sänki ja ohuet vaaleat viikset.** Siniset silmät, pisamia nenällä |
| 5 | **Portinvartija** | Laiturin juuri, vesiportti (huone 2) | Kyllä: mies-35 puhelias; 5 | B: = vartija, talonpoika | Mies 35. Pitkähköt kasvot, leveä suu, naururypyt. Vaaleanruskea leukaparta ja viikset (posket ajellut). Vihreänharmaat silmät, punertavat posket, hieman kyömy nenä |
| 6 | **Vouti** | Voudin sali (kiista), kappeli (epäily, ote) | Kyllä: mies-50 jämäkkä hajamielinen; kiista V1–V3 + 2 | MetaHuman-pää (kalju), varalla A | Mies 50, säätyläinen. Ryhdikäs, kapeahko nenä, raskaat silmäluomet. Tuhkanvaalea harmaantuva tukka korvanlehtien tasolle. **Siistitty mutta luonnollinen lyhyt täysparta**, vaalea ja harmaantuva. Harmaat silmät. Korvaa MetaHuman-pään (ks. kohta 5) |
| 7 | **Aitan hoitaja** (malli kirjuri-1500) | Voudin sali, luettelo käsissä | Kyllä: mies-55 tarkka rauhallinen; kiista H1–H2 | C: = kappalainen | Mies 55. **Laiha ja kapeakasvoinen**, korkeat poskipäät, ohuet huulet. Ajeltu, kevyt harmaa sänki. Harvenevat vaalean harmaat hiukset, korkea otsa. Vaaleat tuuheat kulmat, vaaleanharmaat silmät |
| 8 | **Kappalainen** | Kappeli (huone 5) | Kyllä: mies-60 syvä juhlallinen; 3 | C: = hoitaja | Mies 60–65. **Ajeltu, ei partaa.** Valkoiset hiukset; päälaen tonsuuri on mahdollinen [TULKINTA: repon faktapohjassa kappalaisen arkiasu on EI LÖYDETTY]. Riippuvat posket, syvät nenä-suu-uurteet, iso nenä. Vaaleansiniset vetiset silmät |
| 9 | **Apulainen** | Linnantupa, sali (huone 6) | Kyllä: nainen-30 nopea touhukas; 3 | E: ainoa nainen | Nainen 30. Leveät poskipäät, pyöreä leuka, pisamia, punakat posket. **Pellavanruskea palmikko pääliinan alla** (faktapohja: naisella pääliina neuloin kiinnitettynä). Siniset silmät, vaaleat kulmat |
| 10 | **Vesipoika** | Piha ja keittiö, tyrmän pako 2 | Kyllä: mies-18 reipas nuorukainen; 2 | D: = renki | Poika 14–16 (korkeus 1,45 m). **Pyöreät lapsenomaiset kasvot**, lyhyempi kasvo ja suhteessa isompi pää. Ei partaa. Lähes valkoinen pellavatukka sekaisin. Siniset silmät, pisamat |
| 11 | **Renki** | Laituri (säkit), palatsi (noppapeli) | Kuunnelma (noppa); webissä mies-25 reipas avulias | D: = vesipoika | Mies 25. Kapeat kasvot, nenä hieman vino. Vaaleanruskea tukka, nuoren miehen harva vaalea parta. Harmaansiniset silmät |
| 12 | **Talonpoika** | Muurinharja (seisoo), palatsin pöytä | Natiivissa ei; webissä mies-70 lempeä muistelija | B: = vartija | Mies 65–70. Pitkä epäsiisti harmaa parta, harmaat hiukset. Ahavoitunut ryppyinen iho, haalistuneet siniset silmät, painunut nenänselkä |

**Vartijoiden jako:** vartijan ääniä on kaksi (mies-45 ja mies-30), joten puhuvat vartijapaikat jaetaan kasvoille A ja B paikan
mukaan (Pelikoodari päättää, kumman ääni kussakin paikassa soi). Palatsin syövät vartijat (linnavaki-1 ja -3) siirtyvät taustakasvoille.
Silloin samaa kasvoa ei näe kahdessa paikassa yhtä aikaa.

## 3. Taustaväki: kuusi kasvoa (palatsin sali, linnantupa, piha, keittiö)

Taustakasvoilla ei ole repliikkejä, joten 16 ARKit-muotoa riittää (räpäytys, pureskelu, hymy). Asut otetaan nykyisistä
(vartija, talonpoika, renki; naisille Female_Peasant + pääliina).

| Tunnus | Sukupuoli, ikä | Hiukset | Parta | Silmät | Piirteet | Ehdotettu paikka |
|---|---|---|---|---|---|---|
| T1 | Mies ~35 | Tuhkanvaalea, lyhyt | Punertavanruskea lyhyt täysparta | Harmaat | Leveät kasvot, paksu niska | linnavaki-1 (vartijan asu) |
| T2 | Mies ~22 | Vaalea, otsalle valuva | Sänki | Siniset | Kapeat kasvot, ulkonevat korvat | linnavaki-3 (vartijan asu) |
| T3 | Mies ~50 | Harveneva, kalju päälaki, harmaanruskea reuna | Harmaantuva ruskea leukaparta | Harmaansiniset | Raskas leuka, punakka nenä | linnavaki-2, noppa-1 |
| T4 | **Nainen ~45** | Vaaleanruskea, nuttura pääliinan alla | – | Harmaat | Pyöreät punakat kasvot, naururypyt | Keittiö: leipoja (partio:keittio-2 nyt tyhjä) |
| T5 | **Nainen ~20** | Pellavanvaalea palmikko, liina | – | Siniset | Pisamat, leveät poskipäät | Linnantupa: tarjoilu tai piha: vedenkanto |
| T6 | Mies ~40 | Vaaleanruskea, polkka | Viikset ja leukaparta | Vihreänharmaat | Kyömynenä, pitkä kasvo | linnavaki-4, noppa-2 |

## 4. Naiset linnan arjessa: lähdeperuste (repon faktapohja, ei verkkohakua)

- **Linnan palkkalistoilla oli naisväkeä:** Hämeenlinnan kokonaisväki 1559 oli 202 henkeä, joista **9 naisväkeä**
  (faktapohja 1.2, Ailio 1916, VA 3869). **"Fatabuurinhoitaja ynnä leipoja" olivat naisväkeä** (faktapohja 2.3, AIL, 1L).
  Karjakartanon väkeä oli 20 (sukupuolta ei mainita).
- **Varaus:** luvut ovat Hämeenlinnasta ja 60 vuotta peliaikaa myöhemmältä ajalta. Olavinlinnan väkeä 1495–1510 ei tunneta
  (EI LÖYDETTY), ja faktapohjassa lukee: "vesipoika, vaimot ja lapset eivät näy lähteissä". Taso on siis analogia (B), ei Olavinlinnan lähde.
- **Johtopäätös:** nainen sopii perustellusti **keittiöön leipojaksi** (T4) ja **varastoaitan tai linnantuvan työhön** (apulainen, T5).
  Pihalla vedenkanto tai karjatyö on tulkinta [TULKINTA]. Pyykinpesusta repossa ei ole lähdettä, joten sitä ei esitetä.
- **Asu:** alusmekko (kjortel), päällysmekko (kopa), pääliina neuloin kiinnitettynä ja irtohihat (faktapohja, Turun arkeologia S16).
  Savossa mainitaan hame 1549 (S3). Esiliina 1500-luvun Savossa: EI LÖYDETTY.
- **Huomio:** AIL:n mukaan fatabuurinhoitaja oli nainen, mutta pelin aitan hoitajalla on jo miesääni (mies-55, kiista äänitetty).
  Hänet pidetään miehenä, koska uusi äänitys vaatisi omistajan luvan. Jos kiista äänitetään joskus uudelleen, naishoitaja olisi lähteiden mukainen.
- Naisille sopivat nimet (jos tarvitaan): Marketta, Kaisa/Katri, Kirsti, Pirkko, Valpuri; patronyymi esimerkiksi Pekantytär (faktapohja 3).

## 5. Toteutustapa nykyisestä putkesta (vain CC0 ja oma työ, ei tunnettujen henkilöiden kasvoja)

**Periaate:** sama UBC-topologia (mies 1 555 ja nainen 1 644 kärkeä) säilyy. Yksilöllisyys syntyy viidestä kerroksesta, jotka kaikki
ovat skriptattavia ja toistettavia:

1. **Muoto: oma kasvomuotokirjasto** (uusi `kasvomuoto.py`). Kertatyönä veistetään Blenderissä UBC-päähän noin 14 muotoavainta:
   poskipäiden leveys, leuan leveys ja pituus, nenän pituus, leveys ja selkä, kulmaharjanne, silmien väli, silmäluomen raskaus,
   huulten paksuus, kasvon pituus, poskien täyteläisyys, ikä (riippuvat posket ja leuka, ohimokuopat), nuoruus (lyhyempi kasvo,
   isompi pää) ja kevyt epäsymmetria. Jokainen henkilö on painovektori (esimerkiksi soutaja: poskipäät +0,6, ikä 0,5, nenä leveä +0,4).
   Muoto leivotaan neutraaliksi ennen Faceitia. **Faceitin 41 maamerkkiä** (`faceit_paa.py`, mitattu UBC-päästä) siirretään samalla
   muodonmuutoksella, joten uutta mittausta ei tarvita, kun muutokset ovat ±1,5 cm:n luokkaa. Sen jälkeen ajetaan nykyinen
   `hahmo_paa.py` → `faceit_paa.py` → `faceit_leivo52.py` (soutajan `aja.sh`, kaikki korjaukset mukana: suun sisus, kulmat
   ihon pintaan, painot 100 % Head).
   *Ei käytetä* skannauksia, valokuvasovitusta eikä tekoälygenerointia. MakeHumanin tai MPFB2:n CC0-kohdemuodot sopisivat
   viitteeksi vain, jos lisenssi tarkistetaan erikseen. Suositus: oma veisto.
2. **Iho:** pohjaksi käyttämätön `T_Superhero_Male_Ligh`. Sävy siirretään viileämmäksi ja vaaleammaksi (kohde pelissä noin
   230/190/170, nyt 238/174/131) ja kirkkausnosto kalibroidaan pelikuvasta. Yksilölliset kerrokset lisätään maskeilla: punakkuus
   (posket, nenä, korvat), pisamat, sänki (parran alue harmaaksi tai vaaleanruskeaksi), ikä ja rypyt normaalikarttaan (pään normaali
   palautetaan, 1024²) sekä arpi. **Käsien `T_Regular_Male_Dark` vaihdetaan samaan sävyyn.** Lähikasvoille 1024² ja taustalle 512², ASTC 6×6.
3. **Silmät:** `T_Eye_Brown`-kuvan iiris värjätään viideksi muunnelmaksi (sininen, vaaleansininen, harmaansininen, harmaa,
   vihreänharmaa), joita hahmot jakavat.
4. **Hiukset ja parta:** UBC:n mallit Buzzed, SimpleParted, Long, Buns ja BuzzedFemale (Long ja SimpleParted eivät nyt ole käytössä)
   sekä uudet värit: pellava, tuhkanvaalea, vaaleanruskea, punertavan vaalea, harmaa ja valkoinen. Kulmakarvat saavat oman vaaleamman
   sävyn (nyt samaa tummaa). **Hair_Beard leikataan muunnelmiksi:** lyhyt täysparta, leukaparta ja viikset, pelkät viikset, pitkä
   vanhuksen parta (venytys) sekä sänki ilman verkkoa (vain ihokuvaan). Reunoihin lisätään epäsäännöllisyyttä, jotta "muotoiltu" ilme häviää.
5. **Kytkentä peliin:** uudet henkilötunnukset (esimerkiksi `vartija-a`, `vartija-b`, `linnavaki-t1…t6`, `leipoja-t4`) lisätään
   `js/dioraama/pankit/henkilot.js`- ja `hahmot-skin.json`-tiedostoihin. `rakenna.mjs` antaa jo `hahmot/<id>-faceit.glb`:n.
   Merkit.json-tiedoston `henkilo`-kentät vaihdetaan. Tämä on Pelikoodarin ja Siirtosepän työ ja vaatii pelikuvatarkistuksen.
   Muisti: jokainen uusi glb on noin 3–4 Mt (asu ja leikkeet toistuvat). 12 + 6 hahmoa on noin 60–70 Mt glb:tä ja ASTC-kuvia noin 15–25 Mt.
   Myöhemmin pään voisi ladata erillisenä glb:nä samaan asuun, mutta se vaatisi natiivimuutoksen.
6. **Voudin MetaHuman-pää** korvataan UBC-pohjaisella yksilöllisellä päällä (PD/CC-sääntö, ja nykyisestä puuttuvat hiukset ja kulmat).
   Pään poisto paketista on PT:n päätös.

**Lisenssit:** Quaternius UBC, asut ja UAL ovat CC0. Veistetyt muodot, iho-, silmä- ja karvamuunnelmat ovat omaa työtä.
Faceit on omistajan lisensoima työkalu (leivotut muodot ovat omaa tuotantoa, lisäosa ei mene repoon). Iho-detaljiin saa käyttää
tarvittaessa Poly Havenin CC0-kuvia. Generointia ei käytetä.

**Työmääräarvio (agenttityötä; konetta käytetään vain Faceit- ja esikatseluajoihin):**

| Osa | Arvio |
|---|---|
| Kertatyö: muotokirjasto (14 muotoa), `kasvomuoto.py`, iho-, silmä- ja partatyökalut, kalibrointi yhdellä pelikuvalla | 1–1,5 päivää |
| Puhuva tai lähikasvo (FACEIT 52, 1024²): parametrit 0,5 h, ajo noin 15–20 min, tarkistusarkki ja korjaus 1 h, kokoonpano (asu, leikkeet, PBR, ASTC) 0,5 h | **2–3 h per kasvo**, 12 kasvoa noin 3–4 päivää |
| Taustakasvo (16 muotoa, 512²) | noin 1 h per kasvo, 6 kasvoa noin 1 päivä |
| Datakytkentä (henkilot.js, merkit.json) ja pelikuvatarkistus (Pelikoodari tai Siirtoseppä) | 0,5 päivää |
| **Yhteensä** | **noin 6 työpäivää**. Järjestysehdotus: soutaja ja kokki ensin (omistajan esimerkki), sitten vartijat A ja B, vouti, apulainen ja loput |
