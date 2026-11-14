# Lontoon tarinapaikat: hakukierros 6 (Snow, 221B, Wilton's, FA 1863, Baird, sähkötin) – 15.11.2026

Tila: vain docs, ei koodimuutoksia eikä committia. Pohja: lontoo-9-toiset-lahteet-20261114.md, -valinta- ja -dataluonnos-20261114.md sekä lehtitekstit js/packs/maa-kategoriat.js (221B r. 2962–2980, Snow r. 3401–3418, Wilton's r. 3626–3638, FA r. 3664–3680).

Sääntö: luku, päivä, mitta ja "kuka teki mitä" vaativat kaksi itsenäistä lähdettä (ensikäden teksti ja yksi itsenäinen lähde riittää). Wikipedia lasketaan korkeintaan yhdeksi lähteeksi. Lainaukset ovat lyhyitä, ja sivunumerot ovat kirjan omia (archive.org-tekstin sivuotsikoista).

## Robots ja pääsy (tarkistettu 15.11. ennen hakuja)
- SALLITTU, KÄYTETTY: archive.org (/advancedsearch.php, /metadata, /download), gutenberg.org (/cache/epub/), en.wikisource.org (/wiki/), british-history.ac.uk (Old and New London), wiltons.org.uk, sherlock-holmes.co.uk, sherlock-holmes.org.uk, johnsnowsociety.org, thefa.com (robots.txt rajoittaa vain nimettyjä botteja, ei `*`:ää eikä meitä).
- EI SAATU: Science Museum Group /objects/co8067247 antoi nyt 403:n (CloudFront "Request blocked"). Sitä ei kierretty, ja Bairdin /people/-sivu jäi avaamatta. museumslondon.org/museum/90 antoi 500:n. englandfootball.com-historiasivua ei löytynyt (404), joten käytin FA:n omaa thefa.com-sivua. MSU:n Snow-arkistolla ei ole robots.txt:tä, mutta sitä ei tarvittu.
- OMA VIRHE: tein Wikisourceen kaksi pyyntöä polkuun /w/index.php?action=raw ennen kuin luin sen robots-rivin (`Disallow: /w/`). Kumpikaan ei tuottanut käyttökelpoista tekstiä (toinen palautti vain mallinekuoren, toinen 404:n), eikä niitä käytetä lähteenä. Kaikki myöhemmät haut menivät polkuun /wiki/.
- Ohjeita: yksikään avattu sivu ei sisältänyt minulle osoitettuja ohjeita. Huomio: sherlock-holmes.co.uk/about-the-museum/ -sivun tekstissä on irrallinen roskalinkki (traditionrolex.com). Se ei ole ohje, mutta sivu on siltä osin siistimätön.

## Lähdeluettelo (lyhenteet)
- **Snow 1855** = John Snow, *On the Mode of Communication of Cholera*, 2. painos 1855 (ensikäden). https://archive.org/details/b28985266
- **Komitea 1855** = *Report on the Cholera Outbreak in the Parish of St. James, Westminster, during the Autumn of 1854* (Cholera Inquiry Committee 1855; mukana Whiteheadin ja Yorkin omat raportit; ensikäden, Snow'sta riippumaton tutkimus). https://archive.org/details/b21780778
- **Walford** = Walford, *Old and New London* 1878, osat 4 ja 5, British History Online. https://www.british-history.ac.uk/old-new-london/vol4/pp235-246 · .../vol4/pp406-441 · .../vol5/pp254-262
- **DNB** = Dictionary of National Biography (Wikisource): Snow, John; Cooke, William Fothergill. https://en.wikisource.org/wiki/Snow,_John_(DNB00) · https://en.wikisource.org/wiki/Cooke,_William_Fothergill_(DNB00)
- **EB1911** = Encyclopaedia Britannica 1911 (Wikisource): Cholera; Football; Wheatstone, Sir Charles.
- **JSS** = John Snow Society, etusivu. https://johnsnowsociety.org/
- **Scarlet** = Conan Doyle, *A Study in Scarlet* (Gutenberg 244). https://www.gutenberg.org/cache/epub/244/pg244.txt
- **SHM** = Sherlock Holmes Museum, About. https://www.sherlock-holmes.co.uk/about-the-museum/
- **Wilton's** = https://wiltons.org.uk/heritage/history/
- **Alcock 1906** = C. W. Alcock, *Football: The Association Game* (Alcock oli FA:n sihteeri 1870–95). https://archive.org/details/footballassocia00alcogoog
- **FA** = The FA, The History of The FA. https://www.thefa.com/about-football-association/who-we-are/history
- **Moseley 1930** = Moseley ja Barton Chapple, *Television To-day and To-morrow* (1930). Kirja on Bairdin lähipiiristä ("upon whose work this book is founded"), joten se ei ole Bairdista riippumaton. Se lainaa The Timesin juttua 28.1.1926. https://archive.org/details/televisiontodayt0000sydn
- **Larner 1928** = E. T. Larner, *Practical Television* (1928). https://archive.org/details/practicaltelevis0000etla
- **Dunlap 1932** = Orrin E. Dunlap, *The Outlook for Television* (1932, yhdysvaltalainen). https://archive.org/details/outlookfortelevi00dunlrich
- **Munro 1891** = John Munro, *Heroes of the Telegraph* (1891). https://archive.org/details/heroesoftelegrap00munr
- **Cooke–Wheatstone 1856** = *The Electric Telegraph: Was it invented by Professor Wheatstone?* (1856). Kokoomassa ovat molempien osapuolten kiistakirjoitukset (Cooken puoli ja Wheatstonen puolustajan "First Pamphlet"). Osapuolet ovat vastakkain, joten kun molemmat sanovat saman, se on vahva näyttö. https://archive.org/details/electrictelegrap01cook
- **Head 1849** = F. B. Head, *Stokers and Pokers* (1849). https://archive.org/details/stokerspokersorl00headrich

---

## 1. John Snow ja Broad Streetin pumppu 1854

| Väite | Tulos | Lähteet |
|---|---|---|
| Epidemia alkoi elokuun lopulla 1854 (to 31.8.) | KAKSI LÄHDETTÄ täyttyy | Snow 1855 s. 39: "I considered, therefore, that the outbreak commenced on the Thursday" (31.8.); Komitea 1855: "in the afternoon of the 31st August, 31 fatal …" |
| Kuolleita "satoja" | KAKSI LÄHDETTÄ täyttyy | Snow 1855 s. 49, taulukko "Total … 616"; Komitea 1855 antaa eri rajauksilla 501, 576 ja 636 kuollutta. Tarkkaa lukua EI kirjoiteta, koska lähteet eroavat. |
| Snow tutki kuolemat talo talolta paikan päällä | KAKSI (sisältö), sanamuoto pehmennettävä | Snow 1855 s. 39: "On proceeding to the spot, I found that nearly all the deaths…"; Komitea 1855 s. 79 viittaa Snow'n selvityksiin. "Ovelta ovelle" on tulkinta; parempi on "kävi paikan päällä läpi kuolleiden talot". |
| Kartalla jokainen kuollut on musta merkki talon kohdalla | YKSI LÄHDE (ensikäden) + itse kartta | Snow 1855 s. 45–46: "shown in the map by a black line in the situation of the house". Kartta itse (Commons PD) näyttää saman, mutta kartta ja teksti ovat samaa lähdettä. Sanaa "palkki" voi käyttää kuvauksena. |
| Kuolemat kasautuivat yhden pumpun ympärille | KAKSI LÄHDETTÄ täyttyy | Snow 1855 s. 39 (yllä); Komitea 1855 s. 79: "at any point decidedly nearer to another pump the mortality … ceased" |
| Kahva irrotettiin 8.9.1854 | KAKSI LÄHDETTÄ täyttyy | Snow 1855 s. 40: "the handle of the pump was removed on the following day" (7.9. kokouksen jälkeen); Whitehead, Komitea 1855 s. 153: "The pump handle was taken off on Friday, September 8th." |
| Epidemia oli jo laantumassa, kun kahva irrotettiin | KAKSI LÄHDETTÄ täyttyy | Snow 1855 s. 51: "the attacks had so far diminished before the use of the water was stopped"; Whitehead s. 153: "by that time the epidemic had evidently subsided" |
| Panimon yli 70 työntekijää ei sairastunut; panimolla oma kaivo | KAKSI (varauksin) | Snow 1855 s. 42: "above seventy workmen … none of them had suffered"; "a deep well in the brewery". Komitea 1855 s. 78–79: "70 men, employed at the Brewery … escaped Cholera". Komitea mainitsee, että Snow huomasi asian ensin, mutta esittää sen omana tuloksenaan. Huom: Snow'n mukaan miehet joivat mallasjuomaa eivätkä ehkä vettä lainkaan; panimon kaivo on Snow'n tieto. |
| Likakaivo vuoti pumpun kaivoon | KAKSI LÄHDETTÄ täyttyy | York, Komitea 1855 s. 173: "constant percolation … from the drains into the well"; Walford (vol4 pp235-246): "overflowing of cess-pools into a well". Walford antaa vuodeksi virheellisesti 1853, joten häntä ei käytetä vuoden lähteenä. |
| Etäisyys "vajaa metri" | YKSI LÄHDE (ensikäden mittaus) | York, Komitea 1855 s. 173: "only a space of 2 feet 8 inches" (≈ 0,81 m). Toista itsenäistä mittausta ei löytynyt. Mitta pois tai muotoon "aivan kaivon vieressä". |
| Snow ei uskonut hajun (effluvia) levittävän tautia | KAKSI LÄHDETTÄ täyttyy | Snow 1855 sisällysluettelo: "Cholera not communicated by means of effluvia"; JSS: "his theory on the transmission of the cholera 'poison' in water supplies" |
| Bakteeri viljeltiin "vasta vuonna 1884" | EI TÄYTY (ristiriita) | EB1911 Cholera: "a micro-organism identified by Koch in 1883". Vuodelle 1884 ei löytynyt lähdettä tällä kierroksella. Ehdotus: "vasta 1880-luvulla". |
| Snow kuoli 16.6.1858 | KAKSI LÄHDETTÄ täyttyy | DNB: "Snow died unmarried on 16 June 1858"; JSS: "He died in London on 16 June 1858" |
| Farr hyväksyi veden roolin 1866 | EI LÖYTYNYT | Ei haettu tarkemmin; jo poistettu valintatekstistä. |
| Pumpun kopio ja John Snow -pubi nykyään | EI LÖYTYNYT tällä kierroksella | Vain Wikipedia/Commons (aiempi tieto). |

**Suositus: KIRJOITETTAVISSA NYT.** Ydinväitteet (alku elokuun lopussa, satoja kuolleita, kartta, pumppu, kahva 8.9., panimo, likakaivo) täyttävät säännön ensikäden tekstillä ja itsenäisellä komitearaportilla. Muutokset lehtitekstiin:
- "kiersi ovelta ovelle" → "kävi läpi kuolleiden talot".
- "vajaa metri" pois.
- "1884" → "1880-luvulla".
- Lisää halutessa: "epidemia oli jo laantumassa, kun kahva irrotettiin" (Snow ja Whitehead).

## 2. 221B Baker Street

| Väite | Tulos | Lähteet |
|---|---|---|
| Doyle antoi Holmesille osoitteen 221B Baker Street | KAKSI (ensikäden + museo) | Scarlet, luku 1: "inspected the rooms at No. 221B, Baker Street"; SHM: "situated at 221B Baker Street". |
| 1880-luvulla Baker Street oli nykyistä lyhyempi | KAKSI LÄHDETTÄ täyttyy (rajaus) | Walford vol4 pp406-441: Baker Street "runs into the Marylebone Road"; vol5 pp254-262: Marylebone Roadin pohjoispuolella oli erillinen "Upper Baker Street". Lisäksi Wikipedia (aiempi tieto: numerot loppuivat 85:een). Walford ei kerro talonumeroita, joten "numerot loppuivat alle sataan" jää Wikipedian varaan [1L]. |
| Kadun pidennys ja uudelleennumerointi 1930-luvulla | YKSI LÄHDE | Vain Wikipedia. |
| Numerot 219–229 osuivat Abbey Nationalin pääkonttoriin | YKSI LÄHDE | Vain Wikipedia. |
| Holmesille tuli kirjeitä, yhtiö palkkasi vastaajan | YKSI LÄHDE | Vain Wikipedia. Sherlock Holmes Societyn sivuilta ei löytynyt. |
| Museo avattiin 1990 | KAKSI LÄHDETTÄ täyttyy | SHM: "opened its iconic front door in 1990"; Museums London (aiempi kierros; nyt 500-virhe). |
| Museon talo on numeroiden 237 ja 241 välissä; Westminsterin lupa | YKSI LÄHDE | Vain Wikipedia. SHM kertoo vain, että talo on vuodelta 1815. |

**Suositus: SOFTATTAVA.** Fiktiivinen osoite ja lyhyempi katu täyttävät säännön. Kirjeet ja Abbey National ovat jutun koukku, mutta jäävät yhden lähteen varaan. Kaksi vaihtoehtoa KK:lle:
- (a) Kirjoitetaan: "Doylen aikaan Baker Street päättyi Marylebone Roadiin, ja pohjoispuolen jatke oli Upper Baker Street, joten osoitetta ei ollut. Myöhemmin katu yhdistettiin ja numeroitiin uudelleen." Kirjeet ja Abbey National pois tai muotoon "kerrotaan, että…". Museo 1990 säilyy. Lukuja 237/241 ja Westminsterin lupaa ei mainita.
- (b) Jos kirjetarina on KK:lle jutun ydin, se jää yhden lähteen varaan, ja säännön mukaan tarina vaihdetaan varalistalta.
- Suositan (a):ta.

## 3. Wilton's Music Hall

| Väite | Tulos | Lähteet |
|---|---|---|
| John Wilton rakensi uuden music hallin 1859 pubin (Mahogany Bar) taakse | YKSI LÄHDE (laitoksen oma) | Wilton's: "He then replaced it with his 'Magnificent New Music Hall' in 1859"; pubi "known as The Mahogany Bar". Ainoa toinen lähde on Wikipedia, ja aiemman tarkistuksen mukaan se on lähes samaa tekstiä (ei itsenäinen). |
| Kristallikruunu: noin 300 kaasuliekkiä, 27 000 kristallia | YKSI LÄHDE | Vain Wikipedia (Building News 1859). Building Newsin vuoden 1859 vuosikertaa ei löytynyt archive.orgista. Wilton's sanoo vain "chandeliers". |
| Tulipalo 1877, uudelleenrakennus 1878 | YKSI LÄHDE | Wilton's: "In 1877 a serious fire in the hall left just the four walls…" |
| Metodistien lähetysasema 1888–1956 | YKSI LÄHDE | Wilton's: "In 1888 Wilton's was bought by the East London Methodist Mission"; "the Mission closed in 1956" |
| Lumppuvarasto ja LCC:n purkusuunnitelmat 1960-luvun alussa | YKSI LÄHDE | Wilton's: "used for several years by a rag sorting warehouse"; "early 1960s … plans for demolition" |
| Yleisökokous 1964 pelasti talon (Earl ja Betjeman) | YKSI LÄHDE | Wilton's: "public meeting held in 1964 … Wilton's was spared". Huom: Wilton's nimeää kampanjan johtajiksi John Earlin ja John Betjemanin. Milligan tuli mukaan myöhemmin (BBC-elokuva 1970), joten luonnoksen "Milligan mukana kampanjassa 1964" on epätarkka. |
| Suojelu Grade II* vuonna 1971 | YKSI LÄHDE (+ WP) | Wilton's: "grade 2* listed in 1971". Historic England on estetty. |
| "Harvinainen säilynyt music hall" (superlatiivin kaltainen) | EI LÖYTYNYT kahta | |
| Old and New London (1878) | EI LÖYTYNYT | Ratcliff Highwayn ja Towerin lähiön luvuissa ei mainita Wilton'sia. |

**Suositus: VAIHDETTAVA VARALISTALLE (tai KK:n poikkeuspäätös).** Kaikki väitteet, myös ydin (sali 1859, pelastettu purulta), ovat vain laitoksen omalla sivulla ja siitä riippuvaisessa Wikipediassa. Säännön mukaan tämä on yksi lähde. Jos KK hyväksyy laitoksen oman historiasivun ja Wikipedian kahdeksi, kirjoitettavissa ovat vuosi 1859, metodistit 1888–1956, lumppuvarasto, purkusuunnitelmat, kokous 1964 ja suojelu 1971. Kruunun luvut eivät ole kirjoitettavissa missään tapauksessa. Lehtiteksti (r. 3629–3633) on nykyisellään varovainen, joten se voi jäädä, jos lehden kynnys on toinen kuin tarinapaikan.

## 4. Football Association 1863 (Freemasons' Tavern, Great Queen Street)

| Väite | Tulos | Lähteet |
|---|---|---|
| FA perustettiin Freemasons' Tavernissa 26.10.1863 | KAKSI LÄHDETTÄ täyttyy (kolme) | Alcock 1906 s. 2: "a meeting held at the Freemasons' Tavern on October 26, 1863"; FA: "formed there on 26 October 1863, a Monday evening"; EB1911 Football: "26th of October 1863 at the Freemasons' Tavern" |
| Taverna oli Great Queen Streetillä | KAKSI LÄHDETTÄ täyttyy | FA: "Freemasons' Tavern in Great Queen Street"; Survey of London (aiempi kierros). |
| Maanantai-ilta | KAKSI (ensikäden laskenta + FA) | FA: "a Monday evening"; 26.10.1863 oli maanantai (kalenterista tarkistettu). |
| Noin 12 seuraa paikalla, 11 liittyi | KAKSI (varauksin) | FA: "a dozen London and suburban clubs" ja "the eleven who signed up"; Alcock 1906 s. 2–3 luettelee 11 edustettua seuraa (FA lisää Charterhousen). "Noin kaksitoista" on kunnossa. |
| Siihen asti koulut ja seurat pelasivat omilla säännöillään | KAKSI LÄHDETTÄ täyttyy | Alcock 1906 s. 1–2: "the schools had special codes of their own"; FA (sama ajatus). |
| Kiistakohta oli hacking, jota Blackheath halusi | KAKSI LÄHDETTÄ täyttyy | FA: "The sticking point was 'hacking' … which Blackheath FC wanted to keep"; Alcock 1906 s. 9: "The question of 'hacking' was the rock…" |
| Säännöt hyväksyttiin 8.12.1863 ilman hackingia | KAKSI (EB1911 eri mieltä) | Alcock 1906 s. 10: "held at the Freemasons' Tavern on December 8, 1863"; FA: "finally approved at the sixth meeting, on 8 December, and there would be no hacking". EB1911 sanoo, että säännöt "officially" hyväksyttiin 1.12. (sama kokoussarja, eri tulkinta). |
| Blackheath erosi | KAKSI LÄHDETTÄ täyttyy | Alcock 1906 s. 10: "The withdrawal of the Blackheath club … December 8, 1863"; EB1911: "withdrew and formed the Rugby Union" |
| Pallolla juokseminen kiellettiin (lehden "kantokielto") | YKSI LÄHDE + vivahde | Alcock 1906 s. 10: koodi "had disallowed running with the ball". FA mainitsee käsipelin (koppi, "fair catch") sallituksi, joten "pallon kantaminen kiellettiin" on oikein vain muodossa "pallolla juokseminen". Toista lähdettä ei löytynyt. Sana "Kantokielto" lehtitekstissä (r. 3672) on yhden lähteen varassa ja liian jyrkkä. |
| Rugbyseurat perustivat oman liittonsa 1871 | KAKSI LÄHDETTÄ täyttyy | EB1911 Football: "In the year 1871 the English Rugby Union was founded in London"; Wikipedia. |
| Paikalla on nykyään Grand Connaught Rooms | KAKSI (rajaus) | FA: gaala 2013 "at the Grand Connaught Rooms … back on the exact site"; Survey of London: tavernan rakennus purettiin ja uusi valmistui 1866, nimi Connaught Rooms 1910. Siis "tavernan paikalla", ei "tavernassa". |
| Seinässä FA:n laatta | EI LÖYTYNYT (Open Plaques on estetty) | Vain Commons-kuva. |

**Suositus: KIRJOITETTAVISSA NYT.** Valintadokumentin teksti kestää kokonaan, kun:
- laatta mainitaan vain, jos Commons-kuva käy lähteeksi; muuten se jätetään pois.
- Lehtitekstissä r. 3669–3673 "pallon kantaminen … jäivät pois" → "pallolla juokseminen ja säären potkiminen jäivät pois", ja virke "Kantokielto erotti … muutamassa viikossa" pois tai pehmeäksi.

## 5. John Logie Baird, Frith Street 22, 1926

| Väite | Tulos | Lähteet |
|---|---|---|
| Esitys tammikuussa 1926 Royal Institutionin jäsenille | KAKSI LÄHDETTÄ täyttyy | Moseley 1930 (luku "First Demonstration of Television"): "a demonstration to some forty members of the Royal Institution"; Larner 1928 (n. s. 131): "in January 1926, he demonstrated true television to members of the Royal Institution" |
| Päivä 26.1.1926 | KAKSI (ensikäden + WP), Moseleyn kanssa ristiriita | The Times 28.1.1926 (lainattu Moseleyssa): "…in Frith Street, Soho, on Tuesday saw a demonstration". Tiistai oli 26.1.1926 (tarkistettu). Moseley itse kirjoittaa "On 27th January, 1926", mikä on hänen virheensä. Wikipedia antaa 26.1. |
| Paikka Frith Street, Soho, "yläkerran huone" | KAKSI (ensikäden + WP) | Times (Moseleyssa): "a laboratory in an upper room in Frith Street, Soho". Talonumero 22 löytyy vain Wikipediasta [1L]. |
| The Times kirjoitti 28.1. | KAKSI (Times-teksti + WP) | Moseley 1930: "The Times of 28th January, 1926". |
| Kuva kulki huoneesta toiseen | KAKSI | Times (Moseleyssa): "then on a portable receiver in another room"; Moseley: "between one room and another". |
| "Langattomasti" | EI LÖYTYNYT | Times-lainaus ei sano langattomasta. Sana pois. |
| Ensimmäinen todellisten televisiokuvien esitys (superlatiivi) | KAKSI, mutta molemmat brittiläisiä ja Bairdia tukevia | Moseley: "this was the first time in history that actual television had been demonstrated" (kirja on Bairdin lähipiiristä); Larner 1928: "the first demonstration of true television ever given". Ehdotus: "jota pidetään ensimmäisenä". |
| Kokeissa käytettiin vatsastapuhujan nuken päätä | KAKSI LÄHDETTÄ täyttyy | Times (Moseleyssa): "the head of a ventriloquist's doll was manipulated"; Dunlap 1932 ("Introducing Stokie Bill"): "the head of a ventriloquist's dummy" |
| Nuken nimi Stooky Bill | KAKSI | Dunlap 1932: "Stokie Bill" (kirjoitusasu vaihtelee); Wikipedia ja SMG (aiempi tieto). |
| Nukke siksi, että valot olivat liian kuumia ihmiselle | YKSI LÄHDE / softattava | Dunlap 1932: "intensely brilliant illumination, which caused considerable discomfort to the person being televised". Dunlap ei sano, että nukke valittiin tästä syystä. Ehdotus: "kirkkaat lamput olivat ihmiselle tukalia". |
| Nipkow keksi kiekon 1884 | KAKSI LÄHDETTÄ täyttyy | Dunlap 1932 ("Back in 1884"): "He introduced the device in 1884"; Wikipedia. |
| Baird syntyi 1888 | EI LÖYTYNYT tällä kierroksella | Vain Wikipedia. Science Museum Groupin henkilösivu oli 403-eston takana. |
| Talossa nykyään Bar Italia | YKSI LÄHDE | Vain Wikipedia. |

**Suositus: SOFTATTAVA, kirjoitettavissa.** Ydin täyttää säännön: tammikuu 1926, Royal Institution, Frith Street, nuken pää, Times 28.1. Muutokset:
- "langattomasti" pois.
- "ensimmäinen" → "pidetään ensimmäisenä".
- Nuken syy pehmeäksi.
- "22" ja Bar Italia pois tai muotoon "talossa, jossa nykyään on kahvila", jos toinen lähde löytyy.
- Syntymävuosi 1888 tarvitsee toisen lähteen (esim. DNB-täydennysosa tai EB-myöhäispainos). Muuten virke "Baird syntyi vasta 1888" pois tai muotoon "Baird ei ollut vielä syntynyt".

## 6. Sähkötin: Cooke ja Wheatstone, Euston–Camden 1837 / Great Western 1839

| Väite | Tulos | Lähteet |
|---|---|---|
| Cooke ja Wheatstone sopivat yhteistyöstä toukokuussa 1837 | KAKSI LÄHDETTÄ täyttyy (kolme) | Cooke–Wheatstone 1856 (Wheatstonen puoli, s. ~150): "the partnership was formed in May 1837"; Munro 1891 s. 32: "In May they agreed to join their forces"; DNB Cooke: "duly entered into in May 1837". Huom: virallinen kumppanuussopimus on päivätty 19.11.1837 (Munro), ja Cooke sanoo "In November 1837 our partnership arrangements". |
| Yhteinen patentti 1837 | KAKSI LÄHDETTÄ täyttyy | Cooke–Wheatstone 1856 s. 1: "an English patent was granted to William Fothergill Cooke and Charles Wheatstone, on the 12th June, 1837"; EB1911 Wheatstone: "a patent … in their joint names in 1837" |
| Patentti kesäkuussa 1837 | KAKSI (vastapuolet samaa mieltä) | Cooke (12.6.1837) ja Wheatstonen puolustaja, First Pamphlet s. 11: "the Patent of Wheatstone was taken out in the preceding June". DNB sanoo "samassa kuussa kuin kumppanuus" (toukokuu), mikä on vähemmistökanta. |
| Koe Eustonin ja Camden Townin välillä Lontoon ja Birminghamin radalla | KAKSI LÄHDETTÄ täyttyy | Cooke–Wheatstone 1856 s. 5: "an experimental telegraph to Camden Town … London and Birmingham Railway"; Munro 1891 s. 32: "between the Euston terminus and Camden Town"; DNB Cooke (London and Birmingham mainittu). |
| Koe heinäkuussa 1837 | KAKSI LÄHDETTÄ täyttyy | Munro 1891 s. 32: "on July 25, 1837"; First Pamphlet s. 11: "the same month [July 1837] in which Wheatstone put his own contrivance to the test" |
| Tarkka päivä 25.7.1837 | YKSI LÄHDE | Vain Munro. Ehdotus: "heinäkuussa 1837". |
| Wheatstone Eustonissa, Cooke Camden Townissa | YKSI LÄHDE | Munro 1891 s. 33: "Mr. Cooke was in charge at Camden Town … Wheatstone sat … near the booking-office at Euston" |
| Viisi neulaa | KAKSI LÄHDETTÄ täyttyy | Munro 1891 s. 32: "five-needle telegraph"; DNB Cooke: "with five needles and five line wires the expense was too great" |
| Rinne Camdenista Eustoniin oli jyrkkä | KAKSI (rajaus) | Head 1849 s. 45: veturiton juna "would have descended the incline from Camden Station" pelkällä painovoimalla; Wikipedia. |
| Junat vedettiin rinnettä ylös köydellä, ja koneistolle piti välittää käsky | EI LÖYTYNYT toista lähdettä | Mikään avattu lähde ei mainitse köysivetoa. Head 1849 kertoo, että Euston ja Camden viestivät paineilmaputkella ja sähkötin oli silloin "at present inoperative". |
| Rautatieyhtiö suhtautui välinpitämättömästi | YKSI LÄHDE | Munro 1891 s. 33: "the directors … treated the 'new-fangled' invention with indifference" |
| GWR otti sähköttimen käyttöön Paddingtonista | KAKSI LÄHDETTÄ täyttyy | Munro 1891 s. 33: "favoured by the Great Western Railway … from the Paddington terminus"; Cooke–Wheatstone 1856 s. 92: "on the Great Western, from Paddington to Slough"; DNB Cooke (GWR mainittu). |
| Väli Paddington–West Drayton ja vuosi 1839 | YKSI LÄHDE | Munro 1891 s. 33: "In July, 1839 … to West Drayton station, a distance of thirteen miles". Vuosi 1838 tai 1839 jää auki. |
| Cooke ja Wheatstone olivat elossa 1873 | OSIN | EB1911 Wheatstone: Cooke "(1806–1879)". Wheatstonen kuolinvuotta ei tarkistettu kahdesta lähteestä. |

**Suositus: SOFTATTAVA, kirjoitettavissa.**
- Säilyvät: yhteistyö toukokuussa 1837, yhteinen patentti kesäkuussa 1837, koe Eustonin ja Camden Townin välillä heinäkuussa 1837, viisi neulaa, GWR otti laitteen myöhemmin käyttöön Paddingtonista.
- Muutettavat: "heinäkuun 25. päivänä" → "heinäkuussa 1837"; "vedettiin johdot, ja kaksi miestä pystyi puhumaan" → "kokeiltiin neulasähkötintä".
- Pois: köysiveto ja käsky koneistolle (ei toista lähdettä), "välinpitämättömästi" (vain Munro) ja West Drayton (vain Munro). Vaihtoehtoisesti nämä voi kertoa Munron kertomana.
- Varoitus: Munro käyttää radasta nimeä "London and North Western Railway", joka on anakronismi (vuonna 1837 rata oli London and Birmingham Railway). Käytä nimeä London and Birmingham.

---

## Yhteenveto KK:lle
| Tarina | Suositus |
|---|---|
| Snow 1854 | KIRJOITETTAVISSA NYT (pienet korjaukset: ovelta ovelle, vajaa metri, 1884) |
| FA 1863 | KIRJOITETTAVISSA NYT (lehden "kantokielto" → "pallolla juokseminen"; laatta vain Commons-lähteellä) |
| Baird 1926 | SOFTATTAVA (langattomasti pois, "pidetään ensimmäisenä", 22/Bar Italia/1888 avoimia) |
| Sähkötin 1837 | SOFTATTAVA (heinäkuu 1837, köysiveto ja West Drayton pois) |
| 221B | SOFTATTAVA (fiktiivinen osoite ja lyhyempi katu kantavat; kirje- ja Abbey National -tarina vain Wikipediassa) |
| Wilton's | VAIHDETTAVA varalistalle, ellei KK hyväksy laitoksen omaa sivua ja Wikipediaa kahdeksi. Kruunun luvut pois joka tapauksessa. |

Varalistalta ei haettu tällä kierroksella. Jos Wilton's vaihdetaan, Kristallipalatsi tai Rosetta ovat todennäköisesti parhaiten lähteistettävissä archive.org-aikalaiskirjoilla, mutta sitä ei ole tarkistettu.
