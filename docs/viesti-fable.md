# Opus 14 → Fable: kuvatekstiurakan erä 4 (maa-kategoriat.js)

## Tilanne

| Erä | Kohde | Ylityksiä | Tila |
| --- | --- | --- | --- |
| 4a | maa-kategoriat.js nostot, Eurooppa + Lähi-itä | 100 → **0** | **PR #1048 auki (v689)**, haara `-e4a` |
| 4b | maa-kategoriat.js nostot, Aasia | 105 → **0** | **PR auki (v690)**, haara `-e4b` |

Erän 4 jälkeen **koko repon ylitykset ovat 0** (oli 205). Urakka on
tällä valmis.

## Mitä tehtiin

205 nostoselitettä yli 260 merkin rajan → 0. Keskipituus 320 → 226
merkkiä, pisin 631 → 260. Karsittu aines oli valtaosin
sommittelukuvailua: ilmansuunnat, etuala ja tausta, kuvakulmat, taivas
ja pilvet, ohikulkijat, väripilkut.

**Lahde-kenttiin, alt-teksteihin, tiedosto-kenttiin ja kaanoniin ei ole
koskettu. Uusia faktoja ei ole lisätty.**

## Leipätekstisiirrot: 0 — ja miksi

Kirjoitusvaiheessa tuli kaksi siirtoa, mutta **molemmat peruttiin
tarkastuksessa** ja tieto palautettiin selitteeseen. Kirjaan syyn, koska
se on linjauskysymys sinulle:

1. **YEM/historia/1** *(Viisi pylvästä, yksi maan alla)* — virke
   metallikiiloista pylväiden juurella. Siirto ei ollut sanatarkka
   ("Jokaisen juurelle" → "Jokaisen **pylvään** juurelle"), ja mikä
   pahempaa: leipäteksti kertoo juuri ennen loppuaan, ettei pylväitä
   ollutkaan viisi vaan kuusi ja kuudes oli maan alla. Loppuun
   liitettynä virke luetaan kaikkia kuutta koskevaksi — myös sitä, jonka
   juurella ei ole kiilaa. Tieto mahtui takaisin selitteeseen (221 mrk).
2. **GBR/musiikki/2** *(Kellot soivat lukuja, ei sävelmää)* — virke
   valajan nimestä Mears kellojen olkapäässä. Leipäteksti käsittelee
   englantilaista kellonsoittoa yleisesti ja päättyy peal-matematiikkaan,
   joten loppuun liitettynä virke luetaan yleisväitteeksi eikä näitä
   kelloja koskevaksi. Tieto mahtui takaisin selitteeseen (259 mrk).

**Havainto linjaukseen:** siirto leipätekstin loppuun toimii, kun
leipäteksti päättyy samaan kohteeseen, mutta ei silloin, kun se päättyy
yleistykseen tai laajempaan joukkoon — siirretty virke perii silloin
väärän tarkoitteen. Näissä kahdessa oli parempi tiivistää selitettä
muualta ja pitää tieto kuvan vieressä. Jos haluat siirrot ehdottomiksi,
se on helppo muuttaa erikseen.

## Laatuvarmistus kahdessa vaiheessa

**Kirjoitus:** 12 rinnakkaista toimittajaa maaryhmittäin (selvärajainen
erä, sama resepti — roolituksen kustannuskurin sallima parvi).

**Tarkastus:** 7 erillistä tarkastajaa, jotka eivät kirjoittaneet
tekstejä. Jokainen kohde käytiin läpi yksitellen, ei otantaa. Löydöksiä
**46**, joista vakavia 4. Kaikki 46 korjattiin.

- *kadonnut-tieto* 30 — pääosa löydöksistä. Aitoa asiatietoa
  (materiaaleja, freskokohtauksia, lajituntomerkkejä, työvälineitä) oli
  karsittu sommittelun varjolla. Palautettu selitteisiin; tilaa oli.
- *vaara-merkitys* 7, *muoto* 4, *keksitty-fakta* 4, *leipateksti* 1.
- Keksityt faktat olivat kaikki lieviä ja samaa lajia: tiivistys oli
  korvannut sommittelumääreen uudella tilaväitteellä ("oikealla kohoaa"
  → "kohoaa rakennuksen yläpuolelle"). **Yhtään uutta vuosilukua,
  mittaa, lukumäärää, nimeä tai lajinimeä ei syntynyt** — neljä
  tarkastajaa ajoi tämän vielä sanatason diffillä.

Vakavat neljä: YEM/historia/1 (siirto, 2 löydöstä), JPN/kuvataide/1
(luettelo summautui viiteen, vaikka ihmisiä on neljä), CYP/muinaisuus/2
(selite lupasi kaksi kohtausta mutta kuvasi vain toisen).

**Kone:** `tools/kuvateksti-tarkista-e4.mjs` (uusi) mittaa pituudet ja
virkemäärät, varmistaa ettei leipäteksti muutu muuten kuin lisäyksellä,
ja listaa uudessa selitteessä esiintyvät numerot ja erisnimet, joita ei
ole vanhassa aineistossa. Lopputilassa **0 virhettä**; kuusi sanaa
nousi tarkistettavaksi ja kaikki olivat joko virkkeen aloittavia
tavallisia sanoja tai taivutusmuotoja.

## Työkalut

Korjaus tehtiin id-pohjaisesti: `tools/kuvateksti-poimi-e4.mjs` antaa
kullekin kohteelle vakaan id:n (`MAA/kategoria/#n`),
`tools/kuvateksti-kokoa-e4.mjs` hakee vanhan tekstin aina id:llä, ja
`tools/kuvateksti-kohdista.mjs` (Opus 12) kohdistaa vanhan tekstin
perusteella. Todensin ennen ajoa, että kohdistajan edestakainen ajo
palauttaa maa-kategoriat.js:n kaikki **2 182** selite- ja teksti-kenttää
identtisinä, ja että jokainen 205 kohteen vanha arvo esiintyy tiedostossa
**täsmälleen kerran** — väärään kenttään osuminen oli siis poissuljettu.

## Portit

Molemmat PR:t: testit **# pass 704, # fail 0**; ei kaksoisavaimia;
dist tuoreen mainin (v688) päältä (4a 10 498 kt, 4b 10 505 kt);
savuke-lehtiasettelu **10/10**, savuke-maaselain **6/6**.

**Versionumerot:** 4a on v689 ja 4b **v690**. `uusi-versio.mjs` antoi
4b:lle myös 689, koska 4a ei ollut vielä mainissa — nostin 4b:n käsin
690:een, jotta et joudu renumeroimaan. Jos main ehtii liikkua ennen
mergejä, numerot on ajettava uusiksi.

**Merge-järjestys: #1048 (4a) ensin, sitten 4b.** Molemmat koskevat
maa-kategoriat.js:ää mutta eri maiden lohkoihin, joten sisältö ei mene
päällekkäin; versiotiedostot (sw.js, js/main.js, js/muutokset.js) sen
sijaan törmäävät. Todensin paikallisesti, että haarojen yhdistelmä
vie koko repon ylitykset nollaan.

## Sinulle päätettäväksi

1. Yllä oleva siirtolinjaus (leipätekstin loppu vs. selite).
2. En avannut kuvia, vaan luotin vanhaan selitteeseen lähteenä — työ oli
   tiivistystä, ei uudelleenkuvausta. Jos haluat selitteiden
   silmätarkistuksen kuvia vasten, se on oma erillinen kierroksensa.
