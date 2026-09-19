# Testipeli, kierros 16b — Latvia, Liettua, Ranska, Norja, arvonimet (v1969, 20.9.2026 klo 1.15–1.47)

Laite: iPhone-simulaattori (iPhone 18 Pro, Safari, 390 px), tuotanto v1969,
maailma-kytkin päällä hyppyihin ja **pois lopuksi (vahvistettu ratasvalikosta)**,
äänet pois. Kaappaukset: `docs/raportit/kaappaukset/kierros16b-20260920/`.

## Yhteenveto

| Kohta | Tulos |
|---|---|
| Latvia/Riika: nostot | Toimii: Tukums, Ķemeri (kortti → LISÄÄ → kuvat) |
| Latvia: visa + rahavisan maksu | Ķemeri: oikea vastaus **+25 puntaa** (£25→£50, vihreä "Oikein! +25 puntaa…"). Tukumsissa ei visaa. Väärän vastauksen ja uudelleenavauksen (ei tuplamaksua) testi **jäi tekemättä**. |
| Liettua/Vilna: nostot | Toimii: Trakai, Puntukas, Kernavė, Rumšiškės, Dzūkijan kansallispuisto (kuvat + LISÄÄ). Alytus, Lituanica, Grūtas ei avattu. |
| Liettua: visat / maksu | **Ei visaa yhdessäkään avatussa Liettuan nostossa (5 kpl).** Rahavisan maksua Liettuassa ei siis voitu testata. |
| Ranskan maalehti + kartuscha | Toimii: kartuscha avautuu ⌃-nuolesta (RANSKA, France · tasavalta v. 1873, valtiomuoto, väkiluku, pinta-ala, demokratia, keskitulo, kielet; 7 luokkaa: Historia, Ruoka, Keksinnöt, Luonto, Urheilu, Arki, Menovinkit). Historia-lehti aukeaa (Lascaux, Bastille, lähdemerkinnät PD), sisällysluettelo + "Palaa kartalle" toimii. |
| Chartres LISÄÄ | Toimii: kaksi kuvaa (katedraali ilmasta, kuninkaallinen portaali 1850-luvun valokuvassa), leipäteksti, pulu-kysymykset. |
| Arvonimet (pulu "Kysy … pululta") | **11 nimeä 7 maassa/kohteessa, taulukko alla.** |
| CHE / ISL / TUR uudet kuvat | **Ei testattu** (aika). |
| NOR uudet kuvat | Borgundin sauvakirkko (pystykuva, tuore, kuvateksti ok) ja Saamelaiset (ei kuvaa). Muut Norjan nostot avaamatta. |

## Arvonimet (pulun "Kysy … pululta", yliviivattu nimi on tarkoituksellinen vitsi)

| # | Maa / kohde | Arvonimi |
|---|---|---|
| 1 | Astronautin kamera | Kuunvalon Kirjurilta |
| 2 | BEL Semois | Antwerpenin satamavalvojalta |
| 3 | LVA Tukums | Gaujan kansallispuiston erakolta |
| 4 | LVA Ķemeri | Turaidan linnan yövahdilta |
| 5 | LTU Trakain saarilinna | Pohjolan huuhkajalta |
| 6 | LTU Puntukas | Baltianmeren meripihkan kerääjältä |
| 7 | LTU Kernavė | Kalevalan pöllöltä |
| 8 | LTU Dzūkijan kansallispuisto | Trakain linnan vartijalta |
| 9 | LTU Rumšiškės | Pariisin salonkien pöllöltä |
| 10 | FRA Chartresin katedraali | Seinen rantakäytävän yövahdilta |
| 11 | NOR Saamelaiset | Filosofian maisteripöllöltä |

Huomio: nimet vaihtelevat nostoittain, mutta ne eivät aina sovi maahan
(esim. "Trakain linnan vartijalta" Dzūkijan luonnonpuistossa,
"Pariisin salonkien pöllöltä" Liettuan ulkoilmamuseossa,
"Kalevalan pöllöltä" Kernavėssa). Sääntö voi olla satunnainen — tarkoituksellinen?

## Löydökset

1. **Norja, Borgundin sauvakirkko: visa ei reagoi.** Kysymys "Miksi sauvakirkon
   puu on kestänyt lähes kahdeksansataa vuotta?" (kolme vaihtoehtoa, "Oikeasta
   vastauksesta saat 50 puntaa"). Napautin ensin väärää ("Puu keitettiin…") ja
   sitten oikeaa ("Tolpat ja seinälaudat eivät kosketa maata") — kummallakaan
   ei näkynyt palautetta (ei "Oikein!", ei virheilmoitusta) eikä rahapilleri
   liikkunut (£50 pysyi). Napautettu vaihtoehto jää vain tummemmaksi (sticky
   hover). Saman istunnon Ķemeri-visa toimi (+25), joten tap-menetelmä ei ole
   syy. Kuvat: `nor-borgund-3-visa.jpg`, `nor-borgund-4-vaarin.jpg`,
   `nor-borgund-6-oikein.jpg`. Lisäksi: samassa visa-napautuksessa Norjan
   kartuscha (NORJA-taulukko) ilmestyi kortin taakse — mahdollisesti
   napautus läpäisi kortin. Kannattaa tarkistaa koodista (visa-kortin
   pointer-eventit, Norja vs. Latvia; palkkio 50 vs. 25).
2. **Liettuassa ei ole visoja** (5 nostoa) — tarkoituksellista? Fablen pyytämä
   "rahavisan maksu Liettuassa" ei siis ole testattavissa ennen kuin visa lisätään.
3. **Kartuscha peittää pulun ja päällekkäisyys**: Ranskan kartuschassa pulu
   (Liiku-alue) osuu kielirivin päälle ("Salam alaikum … ranska" -rivin
   loppu jää pulun taakse). Norjan kartuschassa pulu on keskitulo/kielet-rivin
   oikealla laidalla. Kosmeettinen.
4. **Arvonimien vaihtelu**: ks. yllä, harkinnanvarainen.
5. Oslo-saapuminen: otsikkokortti sanoo "OSLO — Vuonon päässä, metsän
   reunalla" (valokuva Holmenkollenista), ylätunniste "Kristiania,
   heinäkuussa 1873" ja postikortti "Christiania, 1873". Otsikkokortin
   nimi- ja kirjoitusasu (Oslo / Kristiania / Christiania) vaihtelee kolmessa
   peräkkäisessä paikassa — tarkoituksellinenko?
6. Ratasvalikko: ääniliukusäätimet 100/100/90/35/100 %, "mittari POIS",
   "maailma PÄÄLLÄ→POIS" toimii; ei löydöksiä.

## Ei testattu tässä kierroksessa

- Väärän vastauksen käytös Latvian visassa (0 puntaa) ja uudelleenavaus ilman tuplamaksua.
- Liettuan rahavisan maksu (ei visaa).
- CHE / ISL / TUR uudet kuvat.
- Chartresin visa (pulu-kysymykset kyllä, rahavisaa ei nähty).
- Kierros 17 (v1970, viestin mukaan): ei aloitettu.

Aika: 1.15–1.47 (32 min). Kaappauksia 33 kpl.
