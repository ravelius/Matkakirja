# Riippumaton tarkistus: Pariisin 7 tarinapaikan data-luonnos (15.11.2026)

- **Kohde:** haara sk/pariisi-7-data, commit 654e3cdba6 (`js/packs/nahtavyysjutut.js` pariisi-lohkon 7 juttua, `data/aanitysjono.tsv` 20 riviä, tekijän raportti ja mediapyyntö).
- **Tarkistaja:** en kirjoittanut tekstejä enkä tehnyt hakukierroksia. Koodia en muokannut.
- **Pohja:** v3, hakukierros 3, hakukierros 4 ja PR 6781:n tarkistus (origin/main 90aac3d7db). Kierrosten KAKSI-tuloksiin luotin. Tekijän epävarmoiksi merkitsemät kohdat, kaikki 1873-virkkeet ja kuvat tarkistin itse.
- **Periaate:** WP = Wikipedia kaikkine kieliversioineen ja peileineen, ja se lasketaan yhdeksi lähteeksi. Ensikäden teksti ja yksi itsenäinen lähde riittävät kahdeksi.

**Itse luetut sivut (robots.txt tarkistettu ennen jokaista; User-Agent MatkakirjaResearch/1.0):**
- auditorium-lyon.com (/fr/1878-palais-du-trocadero)
- pavillonbaltard.fr/histoire
- herodote.net (31.8.1823)
- paris.fr: Paris Centren kaupungintalon sivu "À la mairie de Paris Centre, monter l'escalier d'honneur…"
- royalparks.org.uk (Great Exhibition 1851)
- fr.wikisource (*La Débâcle* osa 3 luku VIII ja *Le Ventre de Paris* luku I, action=render)
- fr-WP vain /wiki/-poluilla ("Palais du Trocadéro", "Grand Châtelet")
- commons.wikimedia.org: /wiki/File:-sivut ja Special:FilePath-esikatselut

**Estetyt, ei käytetty:**
- **lex.dk:** robots kieltää anthropic-ai:n.
- **historicengland.org.uk ja collections.vam.ac.uk:** robots kieltää ClaudeBotin. Ne näkyivät vain hakutuloksina, eikä niitä käytetty lähteinä.

En lukenut kiellettyjä sivustoja (musee-orsay, structurae, napoleon.org, universalis, pss-archi, Britannica). Hakuihin ei lähtenyt projektitietoa. Yhdelläkään sivulla ei ollut tekoälylle osoitettuja ohjeita.

## 1. Faktaväitteet

Merkinnät: k3 = hakukierros 3, k4 = hakukierros 4, t6781 = PR 6781:n tarkistus, itse = luin lähteen tällä kierroksella.

### Grand Châtelet

| väite | lähde 1 | lähde 2 | verdikti |
|---|---|---|---|
| Ludvig VI rakennutti kiveksi 1100-luvulla | paris.fr 2/2 (k3) | Desmaze 1863 + fr-WP | OK |
| muuri 1190, puolustustehtävä loppui, prévôtin oikeus ja poliisi | paris.fr 2/2 (k3) | POP PA00086112 + fr-WP | OK |
| Villon, Molière velkojen takia 1645 ja Cartouche 1721 vankiloissa | Larousse, herodote ja Desmaze (k3) | fr-WP luettelo "Villon (1448), Molière (1645), Cartouche (1721)" (itse) | OK. Villonilla ei ole vuotta, ja se on oikein (1448/1462 ERO). |
| **"Linnakkeen alakerrassa oli ruumishuone, ranskaksi morgue"** | Desmaze: "la basse-geôle ou morgue" (k3) | fr-WP: "sa basse geôle servait de première morgue" (itse) | **PEHMENNÄ.** Ruumishuone linnakkeessa ja sana morgue ovat kahden lähteen varassa. "Alakerta" on käännöstulkinta sanasta *basse geôle* ('alempi vankityrmä'), eikä kumpikaan lähde kerro kerrosta. en-WP sanoo "western side". t6781 jätti sijainnin pois hahmotelmasta. |
| purku alkoi 1802; paikalle Place du Châtelet | paris.fr (k3) | Desmaze + fr-WP | OK |
| 1873: teatteri seisoi aukion vieressä, Davioud 1860–1862 | paris.fr (k3) | chatelet.com (k3) | OK. Teatteri valmistui 1862 eikä palanut 1871, joten se seisoi 1873. |
| aika '1100-luku–1802' | – | – | OK (KK:n päätös) |

### Temple-torni

| väite | lähde 1 | lähde 2 | verdikti |
|---|---|---|---|
| keskiaika, Grosse Tour, ritarikunta lakkautettiin mutta torni jäi | Viollet-le-Duc (k3) | fr-WP | OK |
| 13.8.1792; Ludvig XVI tammikuussa 1793; Ludvig XVII kuoli 1795 kymmenvuotiaana | Cléry ja parcoursrevolution (k3) | Larousse + fr-WP | OK |
| pyhiinvaellukset, Napoleon alkoi purkaa 1808 | parcoursrevolution (k3) | paris.fr + fr-WP | OK |
| 1873: "tornia ei ollut ollut yli kuuteenkymmeneen vuoteen" | 1808 → 1873 = 65 v. (purku valmis 1810 → 63 v.) | – | OK aritmeettisesti, kieli kankea (ks. korvaus) |
| Square du Temple avattu 1857 | paris.fr (v2) | fr-WP (v2) | OK |
| **1873: "Sen paikalla oli puisto, Square du Temple"** | paris.fr (kaupungintalon sivu): "entre 1864 et 1867" ja "de 1240 à 1808 s'élevait à l'emplacement de la mairie la tour du Temple" (itse) | en-WP "List of town halls": 1864–1867, 2 rue Eugène-Spuller; fr-WP: tornin paikalla kaupungintalon pohjoiskulma ja puiston aita (t6781) | **KORJAA (virhe).** Kaupungintalo valmistui 1867 tornin paikalle, joten 1873 tornin paikalla seisoi uusi kaupungintalo eikä puisto. Puisto oli sen vieressä. Sama ristiriita kuin t6781:ssä, joka korjasi hahmotelman muotoon "Tornin paikan vieressä on Square du Temple". |
| tornin paikka on nykyään kaupungintalon kohdalla, Rue Eugène-Spuller | parcoursrevolution (k3) | paris.fr (itse) + fr-WP | OK |
| aika 'keskiaika–1808' | – | – | OK (KK) |

### Palais d'Orsay

| väite | lähde 1 | lähde 2 | verdikti |
|---|---|---|---|
| Napoleon 1810, valmis noin 30 vuoden päästä | conseil-etat.fr (k3, t6781) | fr-WP | OK |
| valtioneuvosto ja tilintarkastustuomioistuin; Chassériaun freskot portaikossa | conseil-etat.fr | Joconde 000PE000431 + fr-WP | OK |
| kommunardit toukokuussa 1871 | conseil-etat.fr ja Leniaud | fr-WP | OK |
| **Zola, La Débâcle: "jättimäinen kivikuutio, jossa oli kaksi kerrosta pylväskäytäviä ja josta liekit syöksyivät"** | ensikäden teksti, fr.wikisource osa 3 luku VIII (itse): "le palais du Conseil d'État … le cube de pierre géant aux deux étages de portiques, vomissant des flammes" | fr-WP siteeraa samaa (v1/v2) | OK. Käännös on uskollinen. Zola puhuu Conseil d'État'n palatsista, siis Palais d'Orsaysta. Tekstissä ei ole lainausmerkkejä, joten kyse on referaatista eikä sanatarkasta lainauksesta, ja se on oikein. |
| rauniot lähes 30 vuotta; fragmentit Louvressa | Joconde (k3) | fr-WP | OK |
| 1873: "rauniot olivat jokirannalla" | palo 1871 (kolme lähdettä) | purku ja rakennus 1898 alkaen (POP + fr-WP) | OK (johdettu) |
| myyty rautatieyhtiölle; asema 1898–1900; museo 1986 | Leniaud ja POP PA00088689 (k3) | fr-WP | OK |
| aika '1810–1898' | – | – | OK |

### Palais de l'Industrie

| väite | lähde 1 | lähde 2 | verdikti |
|---|---|---|---|
| ensimmäinen pariisilainen maailmannäyttely 1855; lasi- ja rautahalli Champs-Élysées'llä; Viel ja Barrault; avattiin toukokuussa 1855 | herodote ja CCA (k3) | fr-WP | OK |
| **"Toisin kuin Lontoon Kristallipalatsi, halli jäi paikalleen"** | Kristallipalatsin siirto: royalparks.org.uk "transported, pane by pane to the area in South London…", "reopened in 1854" (itse) | en-WP "The Crystal Palace" (siirto Sydenhamiin 1852–1854); Industrie seisoi paikallaan 1890-luvulle (paris.fr + fr-WP, k3) | OK. Vertailun molemmat puolet ovat kahden lähteen varassa. Matkakirjan Albert Memorial -juttu kertoo saman siirron. |
| Salon pidettiin siellä | Larousse (k3) | fr-WP | OK |
| sähkönäyttely 1881 | Heap 1884 (k3) | fr-WP | OK |
| 1873: "halli oli vielä käytössä" | Salon siellä 1857–1897 (fr-WP) | sähkönäyttely 1881 (Heap) näyttää hallin olleen käytössä 1873:n jälkeenkin; Larousse | OK (johdettu) |
| purettiin 1890-luvun lopulla Grand Palais'n tieltä | paris.fr Grand Palais (k3, t6781) | fr-WP 1896 | OK |
| aika '1855–1890-luvun loppu' | – | – | OK |

### Trocadéron palatsi

| väite | lähde 1 | lähde 2 | verdikti |
|---|---|---|---|
| nimi Cádizin Trocadero-linnakkeesta, jonka ranskalaiset valtasivat 1823 | herodote.net: "Le 31 août 1823, le fort du Trocadéro, qui défend le port de Cadix, est enlevé" (itse) + Auditorium de Lyon: nimi "pour commémorer la victoire … devant ce fort espagnol" (itse) | fr-WP: nimi Cádizin linnakkeesta, 31.8.1823 (itse) | OK |
| 1811 palatsi Rooman kuninkaalle, vain maanrakennustöitä | Auditorium de Lyon: "1811 … palais fastueux", "seuls quelques travaux de terrassement" (itse) | fr-WP "En février 1811" (itse) | OK |
| 1876–1878, kaksi korkeaa tornia, kaksi kaarevaa siipeä, yli 4 000 paikkaa | 1880 teos (t6781) | WP; Auditorium 5 000 (itse) | OK |
| **"Salin akustiikka oli huono"** | Auditorium de Lyon: "L'acoustique de la salle des fêtes se révèle désastreuse pour les autres formes de musique que l'orgue" (itse) | fr-WP "la mauvaise acoustique de sa grande salle" (itse) | OK. Auditorium sanoo saman kuin teksti: huono muulle musiikille kuin uruille, ja virkkeen "mutta urut" -rakenne sopii tähän. |
| Cavaillé-Collin urut vihittiin elokuussa 1878 | Auditorium de Lyon "inauguré le 7 août 1878" (itse) | fr-WP "8 août 1878" (itse) | OK (kuukausi täsmää, päivä ERO) |
| sali ja tornit purettiin 1935; siivet ja yhtä leveä galleria Chaillot'ssa | Livre d'or 1937 ja Cité (v3) | POP + WP | OK |
| 1873: "kukkulan paikalla oli tasoitettu aukio" | Auditorium: "Napoléon III entreprend de nouveaux travaux de nivellement" vuoden 1867 näyttelyä varten (itse) | fr-WP: "arasement et nivellement", place du Roi-de-Rome 1869 (itse) | OK. Molemmat ajoitukset (1867/1869) ovat ennen vuotta 1873. |
| aika '1876–1935' | – | – | OK |

### Galerie des Machines

| väite | lähde 1 | lähde 2 | verdikti |
|---|---|---|---|
| Champ-de-Mars, sama kenttä kuin Eiffel-tornilla | Parville 1890 | en-WP | OK |
| 420 × 115 m, yli 40 m korkea, ei tukipilareita, 20 kolminivelistä kaarta | Parville (k3) | en-WP | OK |
| liikkuvat sillat | Parville (k3) | en-WP kuvateksti | OK |
| 1873: "hallia ei ollut" | rakennettu 1889 | – | OK |
| purettiin 1900-luvun alussa näkymän avaamiseksi | paris.fr 4/4 (k3) | en-WP | OK |
| aika '1889–1900-luvun alku' | – | – | OK (KK) |

### Les Hallesin hallit

| väite | lähde 1 | lähde 2 | verdikti |
|---|---|---|---|
| Baltardin kivihalli; Napoleon III ei pitänyt siitä ja vaati metallia | pavillonbaltard.fr: "l'Empereur Napoléon III n'aime pas le lourd pavillon de pierre", sitten rauta, valurauta ja lasi (itse) | WP (v1/v2) | OK |
| kymmenen paviljonkia 1850-luvulta 1870-luvun alkuun | pavillonbaltard.fr "dix pavillons … entre 1852 et 1870" (itse) | WP | OK |
| **Zola, Le Ventre de Paris (1873): "jättimäiseksi metallimahaksi, pulteilla ja niiteillä kokoon pantuksi, puusta, lasista ja valuraudasta"** | ensikäden teksti, fr.wikisource luku I (itse): "gigantesque ventre de métal, boulonné, rivé, fait de bois, de verre et de fonte" | WP (romaani 1873); Wikisourcen nimiö "Le Ventre de Paris (1873)" | OK. Lainausmerkeissä oleva käännös vastaa alkutekstiä sana sanalta. |
| 1873: "hallit olivat jo käytössä" | pavillonbaltard.fr: rakennettu 1852–1870 | WP | OK |
| Rungis 1969 | paris.fr 2/2 | fr-WP (pavillonbaltard.fr sanoo 1972, ERO) | OK (enemmistö) |
| purettiin 1970-luvun alussa; "reiäksi"; Nogent; Forum 1979 | paris.fr ja pavillonbaltard.fr (t6781) | fr-WP | OK |
| **"Nogentin paviljongissa soi nykyään Gaumont-Palacen urut"** | pavillonbaltard.fr: "Le célèbre Orgue Christie, installé aujourd'hui au Pavillon Baltard, a été conçu à l'origine pour le cinéma parisien …" ja "remonté entre 1978 et 1979" (itse) | fr-WP "Pavillon Baltard" (v1) | OK. Varaus: WebFetch-ote katkesi ennen elokuvateatterin nimeä. Jos KK haluaa varmuuden, katso sivulta, että lauseessa lukee "Gaumont-Palace". |
| aika '1850-luku–1970-luvun alku' | – | – | OK |

## 2. Ristiriidat PR 6781:n kanssa (main 90aac3d7db, monumentit-eurooppa.js)

| juttu | data sanoo | 6781 sanoo | tila |
|---|---|---|---|
| Temple | "1873 … Sen paikalla oli puisto, Square du Temple" | "Tornin paikan vieressä on nykyisin Square du Temple -puisto" (t6781: "osa on puistoa" ei vahvistu) | **RISTIRIITA**, korjaa (alla) |
| Châtelet | "alakerrassa oli ruumishuone" | "samoissa muureissa olivat vankila, tuomareiden salit ja kaupungin ruumishuone" (sijainti jätetty pois) | lievä; pehmennä (alla) |
| Châtelet | ei holvikäytävää, ei 1790:tä, ei hajua | 6781:ssä ne ovat | ei ristiriitaa (data on suppeampi) |
| Orsay | ei 1838:aa, ei 60 m²; Zola tekstissä | 6781 poisti Zolan lähderiviltä, koska Zola ei ole hahmotelman tekstissä | ei ristiriitaa |
| Industrie | 1890-luvun lopulla, vain Grand Palais, ei "vuosittain" | sama | ei ristiriitaa |
| Trocadéro | ei "ei tarkoitettu kestämään", ei mauri-bysanttilaista | sama | ei ristiriitaa |
| Galerie | ei sähköä, ei 15 000:ta, 1900-luvun alussa | sama | ei ristiriitaa |
| Halles | ei lempinimeä, 1970-luvun alussa, "reiäksi" | sama | ei ristiriitaa. Romaanin nimi on datassa ranskaksi (*Le Ventre de Paris*) ja hahmotelmassa suomeksi (Pariisin vatsa). Tyylivalinta KK:lle, ei virhe. |

## 3. Kuvat

Kaikki seitsemän tiedostonimeä vastaavat mediapyyntöä merkki merkiltä (tarkistettu koneellisesti). Mikään kuvista ei ole vielä kuvamitat.json:ssa, kuten raportti kertoo. Luin jokaisen /wiki/File:-sivun Licensing-osion ja katsoin kuvan esikatselusta.

| juttu | lisenssi (File-sivu) | tekniikka ja aika (File-sivu) | kuvatekstin väitteet | verdikti |
|---|---|---|---|---|
| Châtelet | CC0 1.0 | "Eau-forte", Silvestre graveur, "Entre 1650 et 1660", Carnavalet G.283 | etsaus 1650–1660, tornit ja porttirakennus näkyvät, "puolitoista vuosisataa ennen purkua" (n. 145 v.) | OK |
| Temple | CC0 1.0 | "Aquatinte", Anonyme, Date Unknown | akvatinta; Grosse Tour neljine kulmatorneineen näkyy (soikea kehys) | OK. Pieni huomio: kuvassa näkyy myös oikealla kiinni oleva pienempi torni ("petite tour"), mutta selite ei väitä mitään sitä vastaan. |
| Orsay | CC0 1.0 | "Dessin", Constantin, "En 1892", merkintä "Ruines de la Cour des Comptes / Paris. 1892" | piirros 1892, kattoton sisäpiha (kuvassa raunioitunut sisätila ja avoin yläosa, kasvillisuutta), "yli kaksikymmentä vuotta" (21 v.) | OK. Kyseessä on vesiväripiirros, joten "piirros" pitää. |
| Industrie | PD-Art (tekijä k. 1889) + PD-US; lisäksi Metin CC0 | albumiinivedos, Baldus, "1850s–60s", Met | kaareva pääsisäänkäynti näkyy (kaari ja teksti PALAIS DE L'INDUSTRIE), aika 1850- tai 1860-luku | **PEHMENNÄ:** "Champs-Élysées'n puolella" ei näy kuvasta eikä File-sivulta. Väite on kirjoittamatta kahdesta lähteestä. Veistosryhmää ei nimetä, ja se on oikein (Robert = yksi lähde). |
| Trocadéro | PD-old-70 + PD-US | "engraving", Trichon 1878, Bitard *L'Exposition de Paris*, Brown University Library | kaiverrus; näkymä Place du Trocadéron puolelta (File-sivun kuvaus); kaksi tornia ja keskisali | OK. "Kaiverrus" vastaa Commonsin sanaa "engraving". Trichon oli puukaivertaja, joten aiempi "puupiirros" ei ollut väärin, mutta "kaiverrus" on varmempi. |
| Galerie | CC0 1.0 | platinavedos, Blancard, "Vers 1889" | koneosastot kaarevan lasikaton alla (näkyy; oikealla näkyy myös liikkuva silta) | OK |
| Halles | CC0 1.0 | albumiinivedos, Marville, "Entre 1865 et 1866"; kuvaus "pavillons sept et huit et construction du pavillon cinq" | "rakentaminen oli vielä kesken" | OK. File-sivu vahvistaa, että paviljonki 5 oli rakenteilla. Kuvassa näkyy myös paviljonki 8, joka siirrettiin Nogentiin, joten selitteeseen voisi halutessa lisätä sen (valinnainen). |

## 4. Rakenne

- **Nosto-ketju toimii.** Juttu liittyy pisteeseen **nimellä** (`NAHTAVYYSJUTUT[cityId][raaka.nimi]`, js/nahtavyydet.js 300–340), ei nosto-tunnuksella.
  - Kaikilla seitsemällä on maakartat.js:ssä (5314–5334) piste, jonka nimi on sama kuin jutun avain ja jonka `nosto` on sama kuin jutun `hahmotelma-…`.
  - Liuskan tunnus tulee pisteeltä (`raaka.nosto`), joten jutun `nosto`-kenttä on tarpeeton mutta yhtenevä.
  - `tests/nostot-kartalla.test.mjs`:n `nostonLahdeteksti` palauttaa `hahmotelma-`-etuliitteelle `null`, joten sanatarkkuusvertailua ei tehdä.
  - Lontoon Baird-mallista (c0b42ce9b2) poiketaan perustellusti: siellä tehtiin uusi täkynosto ja piste, täällä pisteet olivat jo olemassa.
  - Riski on vain se, että pisteen nimi ja jutun avain eriytyvät myöhemmin. Testiä, joka varmistaisi, että jokaisella pariisi-jutulla on samanniminen piste, en löytänyt. Tämä on ehdotus, ei este.
- **aika-kentät:** KK:n päätökset on toteutettu (Châtelet, Temple, Galerie). Orsay '1810–1898', Industrie '1855–1890-luvun loppu', Trocadéro '1876–1935' ja Halles '1850-luku–1970-luvun alku' ovat kahden lähteen mukaisia.
- **lahde-kentät:** kaikki ovat muotoa "Matkakirjan oma teksti · lähteinä … ja Wikipedia". Niissä ei ole sisäisiä merkintöjä eikä "en-Wikipedia"-muotoa. Kuvien lahde-kentät ovat muotoa "tekijä vuosi, kokoelma, Wikimedia Commons (lisenssi)", mikä on rikkaampi kuin Bairdin "Wikimedia Commons (PD)" mutta johdonmukainen.
- **Pituudet (sanoja):** Châtelet 88, Temple 81, Orsay 94, Industrie 59, Trocadéro 105, Galerie 65, Halles 102. Lontoon mediaani on 84 (vaihteluväli 34–139). Industrie ja Galerie jäävät lyhyiksi, koska yhden lähteen väitteet poistettiin. Pituus ei ole virhe.
- **Kieli ja sävy:** sopii 13-vuotiaalle. Huomiot:
  - Temple: "tornia ei ollut ollut" on kankea (korjataan alla samalla kertaa).
  - Trocadéro alkaa sanoilla "Nimi tulee…" ilman subjektia. Ehdotus: "Trocadéron nimi tulee Cádizin edustan Trocadero-linnakkeesta, …"
  - Galerie: "kantoivat tappeihin" on hieman outo. Ehdotus: "ja nojasivat alhaalta tappeihin" (valinnainen).
  - Châtelet sanoo "Isoisäsi matkavuonna 1873", muut "Isoisäsi vuonna 1873". Pieni epäyhtenäisyys, valinnainen.

## 5. Äänitysjono

`node tools/aanitysjono/tarkista.mjs` (vain luku): "ÄÄNITYSJONO: OK (puuttuvat 146 kaikki jonossa)", pariisi 33 puuttuvaa. Rivejä on 20 = 6 juttua × 3 kappaletta + Industrie 2 kappaletta, joten rivit vastaavat tekstejä. Jos alla olevat korjaukset tehdään (Châtelet kappale 1, Temple kappale 3, Trocadéro kappale 1 ja mahdollisesti Galerie kappale 1), niiden hash muuttuu. Aja silloin `--siivoa`/`--lisaa` uudelleen.

## Korvaavat tekstit (kaikki ei-OK)

**Temple-torni, teksti, kappale 3 (KORJAA):**
> Isoisäsi vuonna 1873 tornia ei ollut ollut yli kuuteenkymmeneen vuoteen. Sen paikalla oli puisto, Square du Temple, joka oli avattu 1857. Tornin paikka on nykyään kaupunginosan kaupungintalon kohdalla, Rue Eugène-Spullerilla.

→
> Isoisäsi vuonna 1873 torni oli purettu jo yli kuusikymmentä vuotta aiemmin. Sen paikalla seisoi uusi kaupunginosan kaupungintalo, ja vieressä oli puisto, Square du Temple, joka oli avattu 1857. Kaupungintalo on yhä paikallaan Rue Eugène-Spullerilla.

(Lähteet: kaupungintalo 1864–1867 tornin paikalle = paris.fr + WP; puisto 1857 = paris.fr + fr-WP; osoite = parcoursrevolution + paris.fr. Lahde-kenttään voi lisätä "Pariisin kaupungin … kaupungintalosivu"; nykyinen "Pariisin kaupungin vallankumousreitti ja puistosivut" kattaa sen jo lähes.)

**Grand Châtelet, teksti, kappale 1, viimeinen virke (PEHMENNÄ):**
> Linnakkeen alakerrassa oli ruumishuone, ranskaksi morgue.

→
> Linnakkeessa oli myös ruumishuone, ranskaksi morgue.

**Palais de l'Industrie, kuvan selite (PEHMENNÄ):**
> Palais de l'Industrien kaareva pääsisäänkäynti Champs-Élysées'n puolella Édouard Baldusin valokuvassa 1850- tai 1860-luvulta.

→
> Palais de l'Industrien kaareva pääsisäänkäynti Édouard Baldusin valokuvassa 1850- tai 1860-luvulta.

**Trocadéron palatsi, teksti, ensimmäinen sana (kieli, suositus):**
"Nimi tulee Cádizin edustan …" → "Trocadéron nimi tulee Cádizin edustan …"

**Galerie des Machines, teksti (kieli, valinnainen):**
"jotka nojasivat toisiinsa huipulta ja kantoivat tappeihin." → "jotka nojasivat toisiinsa huipulta ja alhaalta tappeihin."

## Yhteenveto

1. **Yksi asiavirhe:** Templen 1873-virke "Sen paikalla oli puisto, Square du Temple". paris.fr ja WP kertovat, että kaupungintalo rakennettiin 1864–1867 tornin paikalle, joten 1873 puisto oli tornin paikan vieressä. Sama ristiriita on PR 6781:n korjaamassa hahmotelmassa. Korvaava teksti on yllä.
2. **Tekijän epävarmat kohdat todentuivat:**
   - Kristallipalatsi-vertailu: royalparks.org.uk + WP.
   - Trocadéron huono akustiikka: Auditorium de Lyon "désastreuse" + fr-WP.
   - Gaumont-Palacen urut Nogentissa: pavillonbaltard.fr + WP.
   - Villon, Molière ja Cartouche: k3 + fr-WP.
   - Trocadéron 1823 ja 1811: herodote ja Auditorium + fr-WP.
   - Tasoitettu aukio: Auditorium + fr-WP.
3. **Zola-lainaukset tarkistettu Wikisourcesta:** *La Débâcle* -referaatti koskee "palais du Conseil d'État'ta" eli Palais d'Orsayta. *Le Ventre de Paris* -lainaus ("gigantesque ventre de métal, boulonné, rivé, fait de bois, de verre et de fonte") on käännetty sanatarkasti. Molemmat OK.
4. **Pehmennettävät:** Châtelet'n "alakerrassa" (lähteissä *basse geôle*, kerrosta ei kerrota) sekä Industrien kuvan "Champs-Élysées'n puolella" (ei lähdettä).
5. **1873-virkkeet:** kaikki muut pitävät (Châtelet'n teatteri, Orsayn rauniot, Industrie käytössä, Trocadéron aukio, Galerie ei ollut, Halles käytössä). Templen 65 vuotta on oikein, mutta virke on kirjoitettava uudelleen kohdan 1 takia.
6. **Kuvat:** seitsemän lisenssiä luettu (5 × CC0, Baldus PD-Art/CC0, Trichon PD-old-70). Tiedostonimet vastaavat mediapyyntöä. Tekniikat (etsaus, akvatinta, piirros, albumiinivedos, kaiverrus, valokuva) ja ajoitukset vastaavat File-sivuja.
7. **Rakenne ja äänitysjono:** nosto-ketju toimii nimellä. aika- ja lahde-kentät ovat kunnossa. Äänitysjono on OK (20 riviä), mutta se pitää ajaa uudelleen korjausten jälkeen.
