# Kadonnut ihme -> kadonnut aarre: osumalista (16.11.2026)

Tila: LUONNOS KK:lle. Vain luettelo, mitään ei ole muutettu.
Peruste: OMISTAJAN PÄÄTÖS 16.11.2026 klo 22.47: "Pidetään kadonnut aarre. Ja muutetaan se kaikkialle esim kadonnut ihme tilalle."
Pohja: origin/main 1918b17766. Pelin nimeen "unohdettu aarre" ei kosketa. Muita ihme-sanoja (seitsemän ihmettä, ihmeellinen, ihmeen kaupalla) ei muuteta.

## Tärkein löydös

Kategoria "kadonnut ihme" EI esiinny yhdessäkään pelin kerrontatekstissä (kaupunkilehdet, nähtävyysjutut, skandaalit, historian hetket, fokusvirrat, fokuskohteet, hahmotelmat, maastokohteet, Pulun vastaukset). Se elää vain kolmessa paikassa:

1. UI-merkkijonoissa (kategorian nimi, kartan selite, kortin ylärivi, havainnekuvan tietoikkuna): ryhmä B, NUI:n ja webin UI.
2. Yhdessä esittelylauseessa (projektisivu): ryhmä A.
3. Koodin tunnisteissa, kommenteissa, testeissä ja docs-tiedostoissa: ryhmä C, ei muuteta.

Seuraus: sisältödataan (data/*.json, js/packs/*) ei tarvitse tehdä yhtään tekstimuutosta, eikä yksikään äänitetty kappale osu. Uudelleenäänitystä ei tarvita.

## Menetelmä

1. `git grep` lauseosumille (kadonn* ihm*, ihm* kadonn*, myös riville katkenneet kommenttisanaparit) koko repo, docs mukaan lukien.
2. Oma skannaus, joka yhdistää rivinvaihdon ja merkkijonoyhdistelmän yli katkenneet sanaparit (`' +` jne.). Löysi 4 monirivistä osumaa (js/fokuskohteet.js:1334 ja 4935, js/packs/fokuskohteet-grc.js:1192, tests/karttavalot-ihmeet.test.mjs:6), kaikki kommentteja.
3. Kaikki `ihme*`-sanamuodot repon koodista ja datasta, luokiteltu merkityksen mukaan (kategoria vs. muu merkitys).
4. Natiivin sisältövienti (`node tools/vienti/vie-sisalto.mjs --ulos <tmp>`, 930 tiedostoa): kaikkien kokoelmien merkkijonot skannattu, ja `kappaleet()` tools/aanitysjono/tarkista.mjs:stä antoi koko luettavan aineiston (12130 kappaletta, kaikki maanosat). Siitä haettiin kategoriasanat ja jokainen `ihme*`-sana.

Huomio: pelkkä `kadonne\w*\s+ihm` ei löydä muotoa "kadonnut ihme" (kadonnut ei ala kadonne). Muotoa "kadonnut ihme" on koodikommenteissa runsaasti (esim. js/packs/miniatyyrit.js 44 riviä).

## Yhteenveto lukuina

| Ryhmä | Mitä | Määrä |
|---|---|---|
| A | Pelaajalle näkyvä virke | 1 virke (1 lähde + sen generoitu kopio) |
| B | UI-teksti | 10 merkkijonoa, 5 tiedostoa, 2 muutosryhmää (kategorian nimi ja havainnekuvan tietoikkuna) |
| C | Tunniste, kommentti, testi, docs | noin 295 osumaa (209 koodi, testit ja työkalut; 86 docs ja asemataulun data) |
| D | Epäselvä, KK päättää | 3 kohtaa |
| Äänitetyt kappaleet, joihin muutos osuu | | 0 |

## A. Pelaajalle näkyvä teksti (virke)

| tiedosto:rivi | kaupunki/paketti | koko virke (sanatarkasti) | ehdotettu korvaava virke | ÄÄNITETTY? |
|---|---|---|---|---|
| projekti-data.js:44 (GENEROITU; lähde docs/tilannekatsaus.md:48-50, ajo `node tools/tee-projekti-data.mjs`) | projektisivu (projekti.html), ei pelipaketti | "Jokaisesta kaupungista ja jo yli sadasta maasta on oma lehti, joka on kirjoitettu vuoden 1873 matkakirjan hengessä mutta nykytiedon varassa: historiaa, historian hetkiä, kadonneita ihmeitä, kulttuuria ja arkea." (virke jatkuu: "Kartalla nostot johdattavat nähtävyyksiin ja tarinoihin, ..." ei muutu) | "Jokaisesta kaupungista ja jo yli sadasta maasta on oma lehti, joka on kirjoitettu vuoden 1873 matkakirjan hengessä mutta nykytiedon varassa: historiaa, historian hetkiä, kadonneita aarteita, kulttuuria ja arkea." | ei luettava |

Muutos tehdään lähteeseen docs/tilannekatsaus.md ja generoitu projekti-data.js ajetaan uusiksi (tests/projekti.test.mjs lukee tilannekatsauksen).

Ei muita A-rivejä. Kerrontatekstien `ihme*`-osumat ovat kaikki muussa merkityksessä (ks. kohta "Ei muuteta, varmistus").

## B. UI-teksti (NUI ja webin UI; listataan omana ryhmänään)

### B1. Kategorian nimi ja sivun/osion otsikko

Yksi lähde ohjaa kaikkea: `KARTTAVALO_AIHEET` (js/karttavalot.js:121). Sen `nimi` näkyy: kartan selitteessä (title-attribuutti, koko nimi), kaupunkilehden osiohakemistossa ja nostolistan/kaupunkiliuskan otsikkona (js/nostokategoriat.js lukee nimen suoraan tästä, `aiheenNimi`), ja pallolaudan nostojen aihelaskureissa. Natiivin "Kartta"-välilehden kytkin "Kadonneet ihmeet" (docs/moduulit/kaupungit.md:87) on natiivin oma, ei tässä repossa.

| tiedosto:rivi | konteksti | nykyinen teksti | ehdotus |
|---|---|---|---|
| js/karttavalot.js:121 | KARTTAVALO_AIHEET `{ aihe: 'ihmeet', nimi, symboli: 'ihme' }`: lehden osio, kartan suodatin, nostolistan otsikko | "Kadonneet ihmeet" | "Kadonneet aarteet" |
| js/karttaselite.js:125 | selitepaneelin lyhyt nimi (omistaja 22.9.2026: paneeli mahdollisimman kapea) | "Ihmeet" | "Aarteet" (RISKI: ks. D1; vaihtoehto "Kadonneet") |
| js/fokusnosto-symbolit.js:1435 | kortin ylärivin luokkanimi (`ihme:` tyyppitaulussa) | "Kadonneet ihmeet" | "Kadonneet aarteet" |
| js/nahtavyydet.js:1166 | kohdekartan selite vasemmassa yläkulmassa tähden vieressä (näkyy kun ikkunassa on ihmekohde) | "Matkakirjan ihme" | "Matkakirjan aarre" tai "Kadonnut aarre" (KK valitsee, sama kategoria) |

Tunnisteet `aihe: 'ihmeet'`, `kategoria: 'ihme'`, `symboli: 'ihme'` ovat avaimia: 103 kohdetta natiivin viennissä (kokoelmat/karttavalot.json) kantaa `"aihe":"ihmeet"`. Ei muuteta (ryhmä C). NUI: varmista, että natiivi hakee näkyvän nimen aiheen avaimesta eikä kovakoodaa sitä.

### B2. Havainnekuvan tietoikkuna ("Mihin ihmeen kuva perustuu?")

Tiedosto js/havainnekuva.js, tekstivariantti `ihme` (kadonneen kohteen loistoajan rekonstruktio). Ikkuna on webin UI-teksti; virkkeet ovat tietoikkunan sisältöä, ei kerrontaa, joten luokitus B. Ei äänitetty eikä luettava.

| tiedosto:rivi | nykyinen teksti | ehdotus |
|---|---|---|
| js/havainnekuva.js:136 | otsikko "Mihin ihmeen kuva perustuu?" | "Mihin aarteen kuva perustuu?" |
| js/havainnekuva.js:138-141 | "Kadonneesta ihmeestä ei ole valokuvaa — kohde on tuhoutunut tai muuttunut kauan ennen kameroita. Siksi Matkakirja rakentaa ihmeen loistoajan asun havainnekuvana: pohjana ovat arkeologiset löydöt, aikalaiskuvaukset ja tutkijoiden rekonstruktiot, joita täydennetään useilla kuva- ja tekstilähteillä." | "Kadonneesta aarteesta ei ole valokuvaa: kohde on tuhoutunut tai muuttunut kauan ennen kameroita. Siksi Matkakirja rakentaa aarteen loistoajan asun havainnekuvana: pohjana ovat arkeologiset löydöt, aikalaiskuvaukset ja tutkijoiden rekonstruktiot, joita täydennetään useilla kuva- ja tekstilähteillä." (ajatusviiva pois) |
| js/havainnekuva.js:146-148 | "... Jokainen kuva käy ihmisen tarkistuksen läpi, mutta varmuudella ihmeen ulkonäköä ei tiedä kukaan." | "... Jokainen kuva käy ihmisen tarkistuksen läpi, mutta varmuudella aarteen ulkonäköä ei tiedä kukaan." |
| js/havainnekuva.js:260 ja 343 | painikkeen title-attribuutti "Mihin ihmeen kuva perustuu?" | "Mihin aarteen kuva perustuu?" |

Samassa PR:ssä on päivitettävä kovakoodatut tarkistukset (ryhmä C, mutta rikkoutuvat muuten):
- tools/savukkeet/savuke-kuvaputki.mjs:249, 251, 261 (otsikko ja lause "Kadonneesta ihmeestä ei ole valokuvaa")
- tools/savukkeet/savuke-havainnekuva.mjs:333, 365, 378, 408 (otsikko)
- tools/savukkeet/savuke-nahtavyysihme.mjs:307 (`merkit.selite === 'Matkakirjan ihme'`)

Havainnekuvan variantin avain `'ihme'` ja funktio `kohteenIhmekuva` ovat tunnisteita (C).

## C. Tunnisteet, kommentit, testit, docs (ei muuteta tai vain tarkistettava)

Ei ehdoteta uudelleennimeämistä. Ryhmittely:

| ryhmä | mitä | osumia | huomio |
|---|---|---|---|
| C1 | JS-tunnisteet ja datakentät: `maanKadonneetIhmeet` (js/fokuskohteet.js:1346, js/pallolauta/nostot.js:57, 3931, tests/karttavalot-ihmeet.test.mjs), kenttä `ihme.kadonnut` (js/fokuskohteet.js:5191, 5228, js/nahtavyydet.js:2270, tests/fokusvirta.test.mjs, tests/ihme-kuvana.test.mjs), `ihmekuva`, `matkakirjanIhme`, `piirraIhmenauha`, CSS-luokat `fokuskohde-ihmenauha`, `kartta-ihmeselite`, kansio `assets/kartat/ihmeet/`, tiedostonimet `ihme-*.webp/jpg`, avain `'ihmeet'` js/media.js:459, 473 | noin 60 | URL:t ja tiedostonimet osoittavat R2:een (media.matkakirja.app/kohtaamiset/ihmeet/...): nimeä ei saa vaihtaa |
| C2 | Koodikommentit "kadonnut ihme" / "kadonneet ihmeet": js/packs/miniatyyrit.js (44 riviä, `// kadonnut ihme (31.10.2026)`), js/packs/maakartat.js (52), js/fokuskohteet.js (18), js/pallolauta/nostot.js (8), js/karttavalot.js (5), js/fokusnosto-symbolit.js (3), js/packs/monumentit-eurooppa.js, js/packs/nahtavyysjutut.js (4), js/packs/fokuskohteet-*.js, js/lehtiosiot-kuvat.js:37, js/kadonneet-kerroskuvat.js:2, js/muutokset.js, css/styles.css:26340, sw.js:724, README.md:175 | noin 140 | ei näy pelaajalle; voi päivittää myöhemmin kommenttikorjauksena |
| C3 | Testit ja työkalut: tests/karttavalot-ihmeet.test.mjs (15), tests/fokusvirta.test.mjs (17), tests/asemataulu-tyolista-komento.test.mjs (4, työlistan otsikko "Kadonneet ihmeet" on fixture), tests/ihme-kuvana.test.mjs, tests/nostoladonta.test.mjs, tools/piirra-kaupunkikartta.mjs (5), tools/savukkeet/*, tools/vienti/lahteet.mjs:76, skeemasopimus.mjs:58, vie-sisalto.mjs:276, tools/vienti/karttavalot.mjs:247, tools/build-standalone.mjs:245, tools/piirrostasaus.json:33 | 31 (lause) + muut | testien nimet ja kommentit eivät riko mitään; savukkeiden UI-vertailut ks. B2 |
| C4 | Työhuoneen tilannelogi js/tyohuone-tilanne.js (32 riviä sanoja ihme/ihmeet), js/tyohuone-kehitys-data.js | 32 | kehittäjän lokiteksti, historiaa |
| C5 | docs: docs/raamattu (9 osumaa, 5 tiedostoa: aiheet/aika-ja-ulkoasu.md rivit 3, 8, 16; aiheet/isoisa-ja-tarina.md 10, 13; aiheet/kartan-merkit-ja-nimet.md 11, 13; aiheet/lehti-ja-nostot.md 6; paatokset/2026-11.md 19), docs/raamattu-loki (22), docs/raportit (39), docs/moduulit (kaupungit.md 80, 87, 91; karttapallo.md 68, 219), docs/tilannekatsaus.md:49, docs/pulu-reaktiot.md:414 (reaktiotunniste `lehti.aihe.ihme`), docs/arkisto, tools/asemataulu/data/talo/*.json (9) | 86 | Raamattuun kirjaus tehdään KK:n kautta (kortit lehti-ja-nostot, kartan-merkit-ja-nimet, aika-ja-ulkoasu, isoisa-ja-tarina); loki ja raportit ovat historiaa |

## D. Epäselvät, KK päättää

| # | tiedosto:rivi | teksti | miksi epäselvä | ehdotus |
|---|---|---|---|---|
| D1 | js/fokuskohteet.js:4993 (`KOHDE_IHMENAUHA`) | kuvan kulmanauha "✦ Unohdettu aarre ✦" kaikilla ihmekuvilla, kadonneilla ja säilyneillä (omistaja 28.8.2026: "Unohdettu aarre, kaytetaan sita kaikkiin") | Nauha on jo "aarre", mutta se on pelin nimi, johon ei kosketa. Se on silti kategorian tunnusmerkki kuvassa. Samaan kokonaisuuteen kuuluu riski: "aarre" on jo pelin sana (unohdettu aarre löytynyt, paikallisaarteet, aarretehtävä, "Aarteet" js/natiivi.js:228) | pidä nauha ennallaan; KK ratkaisee, tarvitseeko kategorian nimi ("Kadonneet aarteet") erottua pelin aarteista. Lyhyt rivin "Aarteet" (B1) on kapein kohta |
| D2 | js/packs/fokuskohteet-irq.js:69 | `nappi: 'Ihme, jota ei ole koskaan löydetty'` (Babylonin riippuvat puutarhat) | Voi tarkoittaa sekä seitsemän ihmeen ihmettä että kadonnutta ihmettä; kortti on kadonnut ihme | jätä (seitsemän ihmettä -merkitys); jos halutaan: "Aarre, jota ei ole koskaan löydetty" |
| D3 | js/muutokset.js (31 riviä: 254, 267, 274, 278, 1078, 1108, 1182, 1215, 1276, 1316, 1320, 1333, 1350, 1351, 1371, 1372, 1378, 1390, 1398, 1403, 1407, 1411, 1416, 1421, 1424, 1429, 1438, 1449, 1459, 1461, 1464) | webin päivitysloki, esim. "Antiikin kadonneet ihmeet fokuskohteiksi" (1464), "Matkakirjan ihmeet: nykyaikakuvat, tahtisymboli, Koe ihme" (1449) | Pelaaja voi lukea lokin versionumeroa napauttamalla, mutta tiedoston sääntö on "Vanhat rivit eivät muutu, loki on historia" | jätä ennalleen |

## Ei muuteta, varmistus (ei hukata aikaa)

Nämä `ihme*`-osumat ovat muussa merkityksessä, eivät kategoriaa. Luettavassa aineistossa niitä on 43 kappaleessa (kaikki 0 muutosta):
- Maailman ihmeet: "antiikin seitsemästä ihmeestä" (EGY faroksen-majakka #1, gizan-suuri-pyramidi #2; GRC olympia #1, rodoksen-kolossi #2; IRQ babylonin-puutarhat #2; TUR efesos #1, pergamonin-alttari #2; losangeles Kaupungintalo #2; HRV osijek #1; lalibela Biete Giyorgis #1; ROU corvin #1; AGO morrodemoco #2). Huom: nämä virkkeet kuuluvat kadonneiden kohteiden korteille ja ovat luettavia, mutta omistajan ohje on jättää seitsemän ihmettä ennalleen.
- Ihme muussa merkityksessä: "ihmeen kaupalla", "Mikä ihmeen ...", "ihmettelee", "ihmeellinen", "ihmelapsi", "ihmevuosi", "ihmekuva" (Neitsyt Marian ihmekuva, vilna Aamuportti #2, ainoa sana jonka kategoriahaku nosti esiin, väärä positiivinen), "ihmeitä tekevä" (Mariazell, Kazan, Ta' Pinu, Jasna Góra, Aglona).
- Erisnimi: "Ihmeiden talo" (Sansibar, sansibar/nahtavyysjutut Sulttaanin palatsi #1; js/packs/maa-kategoriat.js:42785, 42961; js/packs/kulttuuri-kategoriat.js:102228 ja 102274), "Ihmeiden Herra" (Lima, Las Nazarenasin pyhäkkö #1 ja #2), "Ihmeiden ranta" (Labrador, kulttuuri-kategoriat.js:120861).
- linssikatalogi-data.js:85 "Arkkitehtuurin ihmeet" (linssin nimi), "Foren seitsemän ihmettä" (Pulun Q&A, maakunnat-pulu.js:1375), "Belogradchikin luonnon seitsemän uuden ihmeen" (1905).
- Muut "kadonnut X" -kategoriat ovat eri sana ja jäävät: "Kadonneet monumentit" (muutokset.js:618), "Kadonneet maat" (skandaalit.js:10401), "Kadonnut kirjasto".

## Äänitystila

Menetelmä: sama aineisto kuin pelin luenta (`kappaleet()` tools/aanitysjono/tarkista.mjs:stä natiivin viennistä): 12130 luettavaa kappaletta, kaikki maanosat. Kategoriahaku (kadonn* ihm*, Matkakirjan ihme, Koe ihme, ihmenauha, ihmeet) antoi 1 osuman, ja se on väärä positiivinen (ihmekuva = ihmeitä tekevä Marian kuva, vilna Aamuportti #2). Äänitysmanifestia (MANIFESTI-vakion URL) ei tarvinnut verrata, koska yksikään osuva kappale ei muutu.

| paketti | muutoksen osuvia luettavia kappaleita | äänitettyjä niistä |
|---|---|---|
| nahtavyysjutut | 0 | 0 |
| skandaalit | 0 | 0 |
| historianHetket | 0 | 0 |
| elaintayt | 0 | 0 |
| fokusvirta-takyt | 0 | 0 |
| fokuskohteet | 0 | 0 |
| hahmotelma | 0 | 0 |
| maastokohteet | 0 | 0 |
| kaupunkilehdet, maalehdet | 0 | 0 |
| Yhteensä | 0 | 0 |

A:n yksi virke (projektisivu) ja B:n UI-tekstit eivät ole luettavia. Uudelleenäänitystä ei tarvita, joten KK:n sanaa ei tarvita. Jos KK myöhemmin haluaisi muuttaa myös "seitsemän ihmettä" -virkkeet (ei nyt, omistajan ohje on jättää ne), niitä on yllä lueteltu noin 12 luettavaa kappaletta ja niiden äänitystilaa EI SELVITETTY (manifestia ei verrattu). Vain Eurooppa äänitetään (tarkista.mjs oletus), joten ainakin EGY, IRQ, AGO, Lalibela, TUR:n Efesos ja Los Angeles eivät ole Euroopassa.

## Yhteenveto KK:lle

- A 1, B 10 merkkijonoa (5 tiedostoa), C noin 295, D 3.
- Äänitettyjä kappaleita, joihin muutos osuu: 0. Uudelleenäänitystä ei tarvita.
- Sisältödataan (data, js/packs) ei tule tekstimuutoksia. Koko muutos on pieni koodimuutos:
  1. js/karttavalot.js:121, js/fokusnosto-symbolit.js:1435, js/karttaselite.js:125 (kategorian nimi),
  2. js/nahtavyydet.js:1166 (kartan selite),
  3. js/havainnekuva.js (tietoikkuna, 6 kohtaa) ja samassa PR:ssä savukkeiden vertailut (savuke-kuvaputki, savuke-havainnekuva, savuke-nahtavyysihme),
  4. docs/tilannekatsaus.md:48-50 + projekti-data.js uudelleengenerointi.
- Natiivi (NUI): "Kadonneet ihmeet" -kytkin Kartta-välilehdellä ja kategorian nimi lehden osiossa; nimen pitää tulla aiheen avaimesta (`ihmeet`, 103 kohdetta viennissä), ei kovakoodattuna.
- Riski: "aarre" on jo pelin sana. Lyhyt nimi "Aarteet" kapeassa selitepaneelissa sekoittuu pelin aarteisiin ja paikallisaarteisiin. Kuvan nauha on jo "Unohdettu aarre" (D1).

Suositeltu järjestys:
1. KK päättää D1 (nauha ja lyhyt selitenimi) ja B1:n nimiehdotukset.
2. Web: yksi PR (B1 + B2 + savukkeet + A), pieni, ei datamuutoksia.
3. NUI: natiivin kytkin ja kategorianimi samaan junaan.
4. Raamattu: KK kirjaa päätöksen korteille (lehti-ja-nostot, kartan-merkit-ja-nimet, aika-ja-ulkoasu, isoisa-ja-tarina). Docs-loki ja raportit jäävät historiaksi.
5. Koodikommentit (C2) voi siivota myöhemmin, ei kiireellinen.

## Seuraavat askeleet

1. KK vahvistaa D1, D2, D3 ja B1:n sanamuodot ("Kadonneet aarteet", "Matkakirjan aarre" vai "Kadonnut aarre").
2. SK tekee B- ja A-muutokset yhtenä pienenä PR:nä (ei datapakettien koskemista), ajaa `node tools/tee-projekti-data.mjs`, testit ja savukkeet.
3. NUI saa B1-rivit ja ohjeen: nimi aiheen avaimesta.
4. KK kirjaa päätöksen Raamattuun (5 korttia yllä).
5. Mitään ei muuteta ennen KK:n sanaa.
