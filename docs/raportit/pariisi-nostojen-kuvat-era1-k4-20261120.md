# K-4 erä 1: Pariisin 13 jaksollisen noston kuvat (SK 20.11.2026, KK:n päätös 09.40)

Haara `sk/k4-era1-kuvat` (pohjana sk/l5-nostotekstit-era1 + origin/main K-3), draft-PR, EI mainiin ennen KK:n sanaa. Kuvia ei ole ladattu ämpäriin: vientikuvat ovat kansiossa `/Users/Shared/Claude/luovutukset/sk-k4-era1/_ampari/` (osoitteet `https://media.matkakirja.app/kuvat/<nimi>.jpg`, hahmotelmien ihmekuva `…/kohtaamiset/ihmeet/<nimi>-3x2.jpg`), ja ne pitää viedä ämpäriin ennen kuin PR yhdistetään (JU/PT).

**Korjauskierros KK:n päätöksellä 20.11. 11.42** (aito kuva ensin; pääaihe häivyttämättömällä keskialueella 75 % × 75 %; esirajaus sharpilla sallittu, tulos ≥ 1200 × 800, lähderiviin "rajattu"): Eiffel J1–2 Neurdein 1888 aitona (Codex-tilaus pois), Garnier J3 Hauger-kaiverrus esirajattuna (Codex-tilaus pois) ja J1 piirtosali esirajattu oman ovaalinsa sisään, Lavoisier J1:n havainnekuva pois (piirros kattaa J1–2), Curie J1:n korvaava kuva tilauslistalle, Pasteur J2–3 ja Eiffel J3 mitattu (ks. luku 4). Luvut alla ovat korjauksen jälkeen.

## 1. M2: rikkeet ennen | nyt (13 noston osalta)

- **Ennen** (origin/main, lähtöluettelo): 13 nostoa rikkoo; liikaa 5, tekijä 13, lisenssi 13, mitat 13, havainnekuvan lähderivi 6.
- **Nyt:** 2 nostoa rikkoo, kumpikin `vajaa` ja odottaa Codex-kuvia: **sainte-chapelle** (1 kuva, 3 tilattu) ja **curie-1898** (2 kuvaa, 3 tilattu). Eiffel on nyt 3 kuvaa + 1 tilattu (Lustig), joten se ei enää riko. Louvre on 3 kuvaa + 1 tilattu: 3 kuvaa riittää, joten ne eivät rikko.
- Lähtöluettelo päivitetty (`docs/raportit/pariisin-nostokuvat-rikkeet-lahto-20261120.json`): 46 → 35 rikkovaa nostoa. Huom. B:n (4 kadonnutta) `vajaa` kasvoi, koska KK:n päätöksellä 10.44 niiden nähtävyysjuttukopiot poistuivat (kuvat tulevat K-4:n myöhemmässä erässä); `tools/sisalto/nostokuvien-tarkistus.mjs` lukee B:n nyt hahmotelmasta (`B_HAHMOTELMA`): PK:n tiedoston muutos, ilmoitettu KK:lle.
- Testit: tasalaatu, noston-jaksot, noston-kuvat, noston-tekstisaannot, kuvatekijat, lisenssit vihreät. Tuileries'n kaksi testiä päivitetty uusiin kuviin (4 kuvaa).

## 2. Kuvien tila nostoittain

| Nosto | Pidetään | Haettu | Tilattu | Kuvia datassa |
|---|---:|---:|---:|---:|
| tuileries | 3 | 1 | 0 | 4 |
| louvre | 2 | 1 | 1 | 3 |
| bastilji | 3 | 1 | 0 | 4 |
| eiffel-torni | 0 | 3 | 1 | 3 |
| sainte-chapelle | 1 | 0 | 3 | 1 |
| curie-1898 | 1 | 1 | 3 | 2 |
| lumiere-1895 | 0 | 4 | 0 | 4 |
| lavoisier-1780 | 0 | 3 | 0 | 3 |
| pasteur-1862 | 0 | 4 | 0 | 4 |
| palais-garnier | 0 | 4 | 0 | 4 |
| palais-orsay | 1 | 3 | 0 | 4 |
| palais-industrie | 3 | 1 | 0 | 4 |
| les-halles | 3 | 1 | 0 | 4 |
| **yhteensä** | 17 | 27 | 8 | 44 |

## 3. M-rivit

- **M1 silmin:** luku 5 (jakso | kertoja sanoo | kuva | laji | lähde, tekijä, lisenssi, linkki | tila, nostoittain) ja 13 kontaktiarkkia `docs/raportit/k4-era1-kontaktiarkit/<nosto>.jpg` (soikea reuna beigellä pohjalla, 1000 px leveä; tilattu kuva = tyhjä laatta).
- **M2:** luku 1.
- **M3:** jokaisen haetun kuvan lisenssi ja tekijä luettu Commonsin rajapinnasta `tools/hae-commons.mjs`-työkalulla (pyynnöt peräkkäin, ei virheitä), kuva katsottu silmin, rajattujen lähderivi päättyy "rajattu"; linkit luvussa 5.
- **M4:** Codexin tilauslista omana tiedostonaan: `docs/raportit/pariisi-nostojen-kuvat-era1-codex-tilauslista-20261120.md` (8 kuvaa, pohja täytettynä; KOKO-rivi lisätty; Curien korvaava vajakuva lisätty, Eiffel J1–2 ja Garnier J3 poistettu). Tilauksia ei ole lähetetty (K-5).
- **M5:** viimeinen kuva on valokuva niissä nostoissa, joissa kuvia on; havainnekuvan lähderivi alkaa "Tekoälyllä tuotettu havainnekuva" ja laji-kenttä on jokaisella kuvalla (tasalaatutesti). Eiffel, Sainte-Chapelle ja Curie odottavat tilausta, ja niiden viimeinen kuva on valokuva jo nyt (Eiffel: Tour Montparnassen näköalapaikka; Sainte-Chapelle: yläkappelin ikkunat; Curie: muistolaatta).

## 4. Avoimet kohdat KK:lle (ei tekstimuutoksia omin päin)

1. **Ämpäri:** 44 uutta 1200 × 800 -kuvaa pitää viedä ämpäriin (`_ampari/`, myös 2048 px:n versiot suurennoksiin) ennen kuin PR yhdistetään. Hahmotelmien (Orsay, Industrie, Les Halles) ihmekuva korvattiin 3:2-rajauksella (`kohtaamiset/ihmeet/…-3x2.jpg`), jotta noston kuvalista on 4 eikä 5; Tuileries'n ja Bastiljin `ihme.osoite` ja jakson 1 kuva ovat samat: `kohtaamiset/ihmeet/ihme-<id>-loistoaika-v2-3x2.jpg`. Kartan ihmekortin kuva muuttuu siis 3:2-versioksi.
2. **Tilatut jaksot jäivät ilman kuvaa**, kunnes Codex-kuvat tulevat (Eiffel J4, Sainte-Chapelle J1–4 paitsi J5, Curie J1 (nykyinen havainnekuva pidetään kunnes korvaava tulee), J2–4, Louvre J2–3). Vanhat hylätyt kuvat eivät ole nostossa (kasvot lähikuvana, kehys, liian pieni); ne eivät poistu palvelimelta.
3. **Visat:** yksikään kuvateksti ei paljasta vastausta. Lavoisierin J1 Codex-kuva poistettu (KK 11.42); Tuileries'n purkukuva hyväksytty (kertoja sanoo saman jaksossa 3). Visasääntö (KK 11.42): kuva saa näyttää sen, minkä kertoja samassa jaksossa sanoo; ei ennen sitä, eikä kuvatekstissä koskaan.
4. **Heikot kohdat (korjauskierroksen jälkeen):** Les Hallesin purkukuva (1971; lisenssi CC BY-SA 4.0 rajapinnasta) · Les Hallesin torimummon kasvot puolilähikuvana · Lumièren J1 bulevardikuvan tekijä ja vuosi eivät ole Commonsissa · Lavoisier J4: seinässä haalea museokirjoitus · Industrien portti on julkisivun lähikuva · Orsayn Liébert-kuvan päädyt häipyvät (KK hyväksyi nämä 11.42). **Uudet mitat:** Eiffel J1–2 Neurdein: torni 9–80 % kuvan korkeudesta, huipun ylin kohta n. 3 prosenttiyksikköä häivytyksen puolella (lähteessä ei ole lisää ilmaa; muuten jalat ja sivut häivyttämättömällä alueella). Eiffel J3: lähteessä ei ilmaa lisää yläpuolella, jää ennalleen (torni 5–70 %). **Pasteur J2–3 pullokuva:** 3:2-rajaus täyttää lähteen koko leveyden (3840 px), joten --keski oikealle ei auta; mitat 1200 × 800 -kuvassa: pallo x 63–87 %, y 54–97 % (jalusta soikean häivytyksen puolella). Muuttamatta jätetty; ainoa keino olisi taustan laajennus (ei pelkkää rajausta) tai toinen kuva: KK päättää.
5. **Jaksot ilman omaa kuvaa:** Lumièren J4–5 (jono, laatta), Pasteurin Pouchet ja jäätikkö (varakuva Bissonin Chamonix 1860, PD, ladattu), Garnierin murhayritys 1858, Berlioz'n juhla (Industrie J3), Philippe Augusten 1183 ja Forum des Halles (Les Halles J1, J5).
6. **Työkalut:** `tools/hae-commons.mjs lataa` kirjoittaa oletuksena repon sisään ja lyhentää nimet 60 merkkiin; `node_modules` puuttuu checkoutista (sharp ajettiin Matkakirja-fablen asennuksesta).

## 5. Kuvat nostoittain (jakso | kertoja sanoo | kuva | laji | lähde | tila)

### tuileries: kuvatyö (K-4 erä 1)

#### Kuvat

| Jakso | Kertoja sanoo | Kuva | Laji | Lähde, tekijä, lisenssi, linkki | Tila |
|---|---|---|---|---|---|
| 1 | Tuileries'n palatsi oli Ranskan hallitsijoiden koti Pariisissa, ennen kuin se poltettiin ja myytiin kivinä. Kuningatar Katariina de Medici aloitti sen rakentamisen Louvren viereen vuonna 1564, ja palatsi seisoi yli kolmesataa vuotta. | loisto: Tuileries'n palatsi loistoaikanaan (tuileries-loisto.jpg) | havainnekuva | Tekoälyllä tuotettu havainnekuva; Matkakirjan havainnekuva. Faktat: Musée du Louvre, rajattu; tekijä Matkakirja (tekoälyllä tuotettu havainnekuva); Matkakirjan oma; https://media.matkakirja.app/kohtaamiset/ihmeet/ihme-tuileries-loistoaika-v2.jpg | pidetään |
| 2 | Toukokuussa 1871 Pariisin kommuuni oli kukistumassa. Sen kannattajat sytyttivät Tuileries'n palatsin. Tuli paloi yli kaksi vuorokautta ja poltti talon sisältä tyhjäksi. | palo: Tuileries palaa, toukokuu 1871 (tuileries-palo.jpg) | havainnekuva | Tekoälyllä tuotettu havainnekuva; rakennusreferenssit Achille Quinet PH14096 ja Godefroy PH83415, Paris Musées / Carnavalet, CC0, rajattu; tekijä Matkakirja (tekoälyllä tuotettu havainnekuva); referenssit Quinet ja Godefroy; Matkakirjan oma; referenssit CC0; https://media.matkakirja.app/kuvat/tuileries-palo-1871.jpg | pidetään |
| 3-4 | Palon jälkeen kivimuurit jäivät pystyyn, vaikka katto ja sisustus olivat poissa. Poltettu kaupungintalo rakennettiin uudelleen, Tuileries'ta ei. Rauniot seisoivat katottomina yli kymmenen vuotta. Vuonna 1882 kolmas tasavalta päätti purkaa raunion, ja purku valmistui 1883. Purkuyrittäjä myi kiviä ja marmoria, ja suuresta erästä rakennettiin linna Korsikalle. | purku: Palatsin purku ja kivien myynti (tuileries-purku.jpg) | havainnekuva | Tekoälyllä tuotettu havainnekuva; rakennusreferenssit Godefroy PH83415 ja PH20009, Paris Musées / Carnavalet, CC0, rajattu; tekijä Matkakirja (tekoälyllä tuotettu havainnekuva); referenssit Godefroy; Matkakirjan oma; referenssit CC0; https://media.matkakirja.app/kuvat/tuileries-purku-1880-luku-b3.jpg | pidetään |
| 5 | Palatsin paikalla on nyt avointa tilaa Louvren ja puutarhan välissä. Yksi sen paloista seisoo yhä Pariisissa: keskipaviljongin päätykolmio on puistossa nimeltä Square Georges Cain. | paatykolmio: Palatsin päätykolmio Square Georges Cainissa (tuileries-paatykolmio.jpg) | valokuva | Guilhem Vellut, Wikimedia Commons (CC BY 2.0), rajattu; tekijä Guilhem Vellut; CC BY 2.0; https://commons.wikimedia.org/wiki/File:Square_George_Cain_@_Paris_(31001134101).jpg | haettu |

#### Perustelut

- Tarina on 5 jaksoa, 4 kuvaa: kuva 3-4 jatkuu rauniojaksosta purkujaksoon (suunnitelman mukaan).
- Kolme ensimmäistä pidetään suunnitelman mukaan; ne näyttävät, mitä kertoja sanoo (palatsi loistossaan, palo 1871, purku ja kivien myynti). Alkuperäiset haettu paikallisesta sovelluksen välimuistista (media.matkakirja.app-kuvien kopiot), ei verkosta.
- Viimeinen kuva on aito valokuva paikasta nykyään: päätykolmio puistossa. Valittu Vellutin kuva, koska siinä päätykolmio näkyy kokonaisena, taustalla taivas ja ilma; Marais'n entinen kuva oli lähikuva kellotaulusta, jossa numerot täyttävät kuvan (tekstiä kuvassa) eikä päätykolmio hahmotu.

#### Hylätty

- Georges-cain-05 (Marais, CC BY-SA 3.0, nykykuva datassa): lähikuva kellosta, ei kokonaisuutta, 'LEPAUTE AN 6' ja numerot kuvassa.
- Georges-cain-04 (Marais): päätykolmio täyttää leveyden reunasta reunaan 3:2-rajauksessa, rakennus taustalla; Vellut-kuva rajautuu paremmin.
- Carnavalet ABCC568(1)-(6) (CC0): lähikuvia museorekisterin tyyliin, ei puistoympäristöä.
- Georges-cain-00/02/06/07/08/10: muita veistoksia ja kylttejä, eivät palatsin päätykolmio.
- Vanhat pidettävät, jotka putoavat: rauniot1871 (pahvikehys), raunio1873, punta (yli 4 kuvaa) - suunnitelman mukaan.

#### Avoimet kysymykset KK:lle

1. VISA: 'Mitä Tuileries'n palatsista jäi pystyyn palon jälkeen?' vastaus 'Kivimuurit'. Kuva 3-4 (purku) näyttää pystyssä seisovat kivimuurit, ja jakson 3 teksti sanoo sen itse. Ristiriita visasäännön kanssa (vastaus ei saa näkyä kuvassa) riippuu siitä, missä kohdassa visa kysytään; en muuttanut mitään. Jos visa kysytään jakson 3 jälkeen, ratkaisu on KK:n.
2. Jakso 3 sanoo 'rauniot seisoivat katottomina yli kymmenen vuotta', kuva 3-4 on purkutyömaa (vaunu, nostin). Kuva sopii jaksoon 4 täydellisesti ja jaksoon 3 löyhästi. Aito rauniovalokuva jaksolle 3 vaatisi viidennen kuvan (raja 4).
3. Loisto-kuvassa palatsin vasen pääty ja äiti-tytär häipyvät soikiossa; pääjulkisivu pysyy. Kuvan koko ei salli sivusiirtoa (jo 3:2).
4. Päätykolmio on leveä (90 % kuvan leveydestä); päät häipyvät osin, keskusta ei. Lähdekuvan sommittelu ei salli kapeampaa pääaihetta ilman ahtaampaa rajausta.
5. Jakso 5 puhuu myös avoimesta tilasta Louvren ja puutarhan välissä; kuva näyttää vain päätykolmion (viimeisen kuvan sääntö: valokuva paikasta nykyään). Ei muuta avointa tila -kuvaa.


### louvre: kuvatyö (K-4 erä 1)

#### Kuvat

| Jakso | Kertoja sanoo | Kuva | Laji | Lähde, tekijä, lisenssi, linkki | Tila |
|---|---|---|---|---|---|
| 1 | Louvre oli ennen kuninkaiden palatsi, ja museoksi se avattiin vuonna 1793. Yli sata vuotta myöhemmin sen seinältä varastettiin Mona Lisa. | julkisivu: Louvren itäjulkisivu (louvre-julkisivu.jpg) | valokuva | GFreihalter, Wikimedia Commons (CC BY-SA 4.0), rajattu; tekijä GFreihalter; CC BY-SA 4.0; https://commons.wikimedia.org/wiki/File:Paris_1er_Louvre_Colonnade_559.jpg | pidetään |
| 2-3 | Maanantaina elokuussa 1911 Louvre oli suljettu. Valkoiseen työtakkiin pukeutunut mies nosti Mona Lisan seinältä, ja lukitun oven avasi hänelle putkimies. Kukaan ei huomannut mitään ennen seuraavaa päivää. Silloin maalari tuli kopioimaan taulua ja löysi tyhjän seinän. Poliisi pidätti runoilija Guillaume Apollinairen, ja Pablo Picasso joutui epäillyksi. | varkaus: Mona Lisan paikka tyhjenee, elokuu 1911 (ei kuvaa) | havainnekuva | Tekoälyllä tuotettu havainnekuva; faktat: Musée du Louvre (The theft of the century), Mona Lisa stolen-1911.jpg (PD); tekijä Matkakirja (tilattu Codex-havainnekuva); Matkakirjan oma; (tilaus, ks. TILAUKSET.md) | tilattu |
| 4 | Varas oli Louvressa työskennellyt lasittaja Vincenzo Peruggia, jonka poliisi oli jo kuulustellut. Taulu odotti laatikossa yli kaksi vuotta, kunnes hän tarjosi sitä vuonna 1913 firenzeläiselle taidekauppiaalle, joka hälytti poliisin. Peruggia väitti vieneensä taulun takaisin Italiaan. | uffizi1913: Mona Lisa löydön jälkeen, 1913 (louvre-uffizi1913.jpg) | valokuva | Tuntematon kuvaaja, 1913, Wikimedia Commons (public domain), rajattu; tekijä Tuntematon kuvaaja; Public domain; https://commons.wikimedia.org/wiki/File:Monalisa_uffizi_1913.jpg | haettu |
| 5 | Mona Lisa palasi Louvreen vuonna 1914, ja varkaus teki siitä entistä kuuluisamman. Nykyään se on Louvren ensimmäisessä kerroksessa. Sen edessä on jono, ja taulua vartioidaan tarkasti. | jono: Jono Mona Lisan edessä Louvressa (louvre-jono.jpg) | valokuva | Amaury Laporte, Wikimedia Commons (CC BY 2.0), rajattu; tekijä Amaury Laporte; CC BY 2.0; https://commons.wikimedia.org/wiki/File:Crowd_in_front_of_the_Mona_Lisa_1.jpg | pidetään |

#### Perustelut

- Tarina on 5 jaksoa, 4 kuvaa: yksi kuva (tilattava) kattaa jaksot 2 ja 3.
- Jakso 1: julkisivu näyttää paikan, jonka kertoja nimeää (kuninkaiden palatsi, myöhemmin museo). Viimeinen kuva on nykyvalokuva Louvresta (jono taulun edessä) ja jakso 5 sanoo juuri sen.
- Jakso 4: Firenzen löytö on kuvattu aidolla 1913 valokuvalla (Mona Lisa tarkastettavana). Kuvateksti ei nimeä paikkaa (visan vastaus). Kuvassa ei ole Peruggiaa; jakso kertoo hänestä, mutta aitoa kuvaa hänen kiinnijäämisestään ei vapaasti löytynyt (Roger-Viollet/Excelsior-kuvat ovat sanomalehtiliuskoja tai tekstillisiä).
- Jaksot 2-3: ei vapaata riittävän suurta kuvaa; ainoa 1911-tyhjäseinäkuva (Mona Lisa stolen-1911.jpg) on 640 x 887, rajaus 640 px leveä, alle 1200. Siksi Codex-tilaus.

#### Hylätty

- Nykyinen varkaus-kuva (havainnekuva, Peruggian kasvot lähikuvana).
- peruggia (poliisikortti): käsinkirjoitus ja lomake, kuvassa vasen profiili häipyy.
- tyhja-seina (Mona Lisa stolen-1911.jpg): 640 px, alle 1200 rajauksen jälkeen.
- monalisa-maalaus (lisäkuva): ylimääräinen, ei kuuluisi rajaan 4.
- 'Mona Lisa is recovered 2 / 3' (980 x 552): alle 1200, 3:ssa vesileima; 'Vincenzio Peruggia stealing Mona Lisa' / Excelsior-lehtiliuskat: tekstiä, valkoinen tausta, kollaasi.
- 'Stealing Mona Lisa' (La Domenica del Corriere): 798 x 1114.

#### Avoimet kysymykset KK:lle

1. Tilauskuva jaksoille 2-3: jakso 2 (varkaus, mies valkotakissa) ja jakso 3 (tyhjä seinä, maalari, Apollinaire/Picasso) jakavat yhden kuvan. Pohja kuvaa varkaushetken aamun Salon Carréssa, tyhjä paikka seinällä näkyvissä. Jos halutaan erilliset kuvat, kuvia tulisi 5 (yli rajan 4).
2. Jakso 4 kertoo Peruggiasta, kuva näyttää taulun löydön jälkeen ilman häntä. Kuvan lyhyt teksti ei nimeä paikkaa; jakso nimeää Firenzen ja kuvassa oleva sisustus on Uffizin.
3. Visa kysyy kaupunkia (Firenze): Commonsin kuvaus 'Uffizi Gallery, Florence' ei tule peliin; vain lyhyt ja lähderivi tulevat. Lähderiville ei ole kirjoitettu paikkaa.
4. Jono-kuvassa taulua ei näy, vain katsojat ja sali. Jakson 5 teksti sanoo 'sen edessä on jono', joten kuva täsmää.
5. Julkisivu: kolonnadi (itäjulkisivu) häipyy reunoilta, koska rakennus on leveä; 3:2-rajaus ei salli kapeampaa kuvaa tästä lähdekuvasta.


### bastilji: kuvatyö (K-4 erä 1)

#### Kuvat

| Jakso | Kertoja sanoo | Kuva | Laji | Lähde, tekijä, lisenssi, linkki | Tila |
|---|---|---|---|---|---|
| 1 | Bastilji rakennettiin 1300-luvun lopulla vartioimaan Pariisin itäistä porttia, ja siinä oli kahdeksan tornia. Myöhemmin siitä tuli valtionvankila. Kuningas saattoi lähettää sinne ihmisen kirjeellä, ilman oikeudenkäyntiä, ja linnasta tuli mielivallan symboli. | loisto: Bastilji loistoaikanaan (bastilji-loisto.jpg) | havainnekuva | Tekoälyllä tuotettu havainnekuva; Matkakirjan havainnekuva. Faktat: Musée Carnavalet, La Bastille au XVIIIe siècle, rajattu; tekijä Matkakirja (tekoälyllä tuotettu havainnekuva); Matkakirjan oma; https://media.matkakirja.app/kohtaamiset/ihmeet/ihme-bastilji-loistoaika-v2.jpg | pidetään |
| 2 | Heinäkuun 14. päivänä 1789 pariisilaisilla oli Invalidien sotilaskodista otettuja aseita mutta ei ruutia, ja ruutia uskottiin olevan Bastiljissa. Vankeja oli vain seitsemän. Silti väkijoukko valtasi linnan, ja kuvernööri surmattiin. | valtaus: Bastiljin valtaus 14. heinäkuuta 1789 (bastilji-valtaus.jpg) | maalaus | Jean-Baptiste Lallemand 1789, Musée Carnavalet, Wikimedia Commons (PD), rajattu; tekijä Jean-Baptiste Lallemand; Public domain; https://commons.wikimedia.org/wiki/File:Jean-Baptiste_Lallemand_-_La_prise_de_la_Bastille,_le_14_juillet_1789_-_P1718_-_Mus%C3%A9e_Carnavalet.jpg | pidetään |
| 3 | Purku alkoi jo samana iltana. Työmaata johti Palloy, jonka työpajassa kivistä veistettiin pienoismalleja ja muistoesineitä. Osa kivistä päätyi Pariisin siltoihin, ja muutamassa vuodessa linnasta ei jäänyt pystyyn mitään. | purku: Bastiljin purku, Hubert Robertin maalaus (bastilji-purku.jpg) | maalaus | Hubert Robert 1789, Wikimedia Commons (PD), rajattu; tekijä Hubert Robert; Public domain; https://commons.wikimedia.org/wiki/File:The_Bastille_in_the_first_days_of_its_demolition,_by_Hubert_Robert.jpg | pidetään |
| 4 | Linnan paikalla on nyt aukio. Aukion pylväs muistuttaa vuoden 1830 vallankumouksesta, ei 1789:stä. Tornin pohjakiviä on koottu Henri-Galli-puistoon, ja metroaseman laiturilla näkyy pala vallihaudan muuria. | nyt: Place de la Bastille ja heinäkuun pylväs nykyään (bastilji-nyt.jpg) | valokuva | Guillaume Flament, Wikimedia Commons (CC BY-SA 4.0), rajattu; tekijä Guillaume Flament; CC BY-SA 4.0; https://commons.wikimedia.org/wiki/File:Place_de_la_Bastille,_avril_2021.jpg | haettu |

#### Perustelut

- 4 jaksoa, 4 kuvaa, yksi per jakso. Jakso 1 linnan koko (kahdeksan tornia): loisto-havainnekuva. Jakso 2 valtaus: Lallemandin maalaus. Jakso 3 purku: Hubert Robertin maalaus. Jakso 4: aito nykykuva aukiosta ja pylväästä.
- Järjestys on aikajärjestys: havainnekuva, maalaus, maalaus, valokuva (sääntö 12). Ei värjäystä eikä muokkausta; vain rajaus.
- Kaikki kolme pidettyä kuvaa ovat suunnitelman mukaiset; originaalit haettu uudelleen: maalaukset Commonsista (hae-commons.mjs lataa), loisto sovelluksen välimuistin kopiosta.

#### Hylätty

- pylvas1860 (pahvikehys, seepia), silvestre (museonumerot ja käsinkirjoitus), portti (ylimääräinen, havainnekuva) - suunnitelman mukaan pois.
- metro (Bastille Metro 2, Shihchuan, CC BY-SA 2.0): kuvan keskellä opastaulun teksti 'Vestiges de la Bastille' ja kuvatekstit; vaikka jakso mainitsee metron muurin, sääntö hylkää tekstin kuvassa.
- Muut Colonne de Juillet -kuvat: pystykuvia (pylväs huipusta jalustaan 3:2-rajaukseen ei mahdu) tai tilaa vailla; Place de la Bastille depuis l'Opéra (Flament, 6000 x 4000) oli toiseksi paras mutta liikennettä ja valtava ajoneuvomäärä edessä; Place de la Bastille (TheMarcusChance) harmaa taivas.

#### Avoimet kysymykset KK:lle

1. Jakso 4 mainitsee myös Henri-Galli-puiston tornin pohjakivet ja metron muurin; kuva näyttää vain aukion ja pylvään. 'Viimeinen kuva = aito valokuva paikasta nykyään' toteutuu, mutta kaksi kolmesta jakson asiasta jää ilman kuvaa. Jos metron muuri halutaan, kuva Bastille Metro 2 menisi rajaukseen: 2048 x 1536, rajaus 2048 x 1365 (riittää), mutta kuvassa on teksti.
2. Visan vastaus ('Valtauspäivän iltana') ei näy kuvassa eikä kuvatekstissä. Maalausten lähderivillä on vuosi 1789 (kuvan tekijän vuosi), ja purku-kuvan nimi Commonsissa kertoo 'first days of demolition'; lähderivi ei sisällä sitä, mutta jos lähderivi näytetään pelaajalle ennen visaa, vuosi 1789 ei silti paljasta vastausta.
3. Valtaus-kuvassa linnan vasen torni häipyy reunassa; muuten pääaihe (linna, nostosilta, taistelijat) säilyy.


### eiffel-torni: kuvatyö (K-4 erä 1)

#### Kuvat

| Jakso | Kertoja sanoo | Kuva | Laji | Lähde, tekijä, lisenssi, linkki | Tila |
|---|---|---|---|---|---|
| 1-2 | Eiffel-torni rakennettiin seisomaan vain kaksikymmentä vuotta, ja kerran huijari myi sen romuksi. Ennen tornia paikalla oli Champ de Mars, sotilaiden harjoituskenttä. / Vuonna 1887 kentälle alettiin koota rautatornia maailmannäyttelyä varten. Työmiehet niittasivat tuhansia osia yhteen yhä korkeammalla. Moni pariisilainen vastusti tornia, mutta vuonna 1889 se oli valmis. | rakenteilla: Eiffel-torni rakenteilla 1888 (eiffel-torni-rakenteilla.jpg) | valokuva | Neurdein, 1888, Wikimedia Commons (public domain), rajattu; https://commons.wikimedia.org/wiki/File:Paris,_Tour_Eiffel_by_Neurdein,_1888.jpg | haettu |
| 3 | Kaksikymmentä vuotta kului, mutta kukaan ei purkanut tornia. Sen huipulla oli radioantenni, ja armeijalle siitä oli niin paljon hyötyä, että torni sai jäädä. | nayttely1889: Eiffel-torni ja Champ de Mars näyttelyssä 1889 (eiffel-torni-nayttely1889.jpg) | valokuva | Tuntematon valokuvaaja, Wikimedia Commons (Public domain), rajattu; https://commons.wikimedia.org/wiki/File:Eiffel_Tower_and_Champ_de_Mars_seen_from_Trocad%C3%A9ro_Palace,_Paris_Exposition,_1889.jpg | haettu |
| 4 | Vuonna 1925 huijari Victor Lustig luki lehdestä, että tornin kunnossapito on kallista. Väärennetyin virkapaperein hän esiintyi ministeriön apulaisjohtajana ja myi muka tornin romukauppiaalle. Kauppias häpesi eikä ilmoittanut poliisille, joten Lustig palasi ja yritti uudestaan. | lustig: Huijari ja romukauppiaat hotellin salongissa (ei kuvaa) | havainnekuva | Matkakirjan oma (tilaus, ks. TILAUKSET.md 2) | tilattu |
| 5 | Torni seisoo yhä. Vanha harjoituskenttä on nykyään puisto sen jalalla, ja ensimmäisen kerroksen alle on kirjoitettu kullatuin kirjaimin 72 ranskalaisen tiedemiehen ja insinöörin nimeä. | nykyinen: Eiffel-torni ja Champ de Mars ylhäältä katsottuna (eiffel-torni-nykyinen.jpg) | valokuva | Carlos Delgado, Wikimedia Commons (CC BY-SA 3.0), rajattu; https://commons.wikimedia.org/wiki/File:Tour_Eiffel,_%C3%89cole_militaire,_Champ-de-Mars,_Palais_de_Chaillot,_La_D%C3%A9fense_-_01.jpg | haettu |

Yhteensä: 3 haettu, 1 tilattu, 0 pidetään (KK 20.11. 11.42: jakson 1–2 tilaus poistui, aito Neurdein 1888).

#### Perustelut

- 5 jaksoa, 4 kuvaa: yksi kuva (jakso 1-2) kattaa avauksen (Champ de Mars) ja rakentamisen.
- Jakso 5: valokuva Tour Montparnassen näköalapaikalta; torni kokonaan, ja sen jalalla näkyy Champ de Marsin puisto, jonka jakso mainitsee. Tämä oli ainoa löytämäni vapaa vaakakuva, jossa torni on kokonaan ja korkeus on 60 % kuvasta. Mitta: torni 9-69 % kuvan korkeudesta, keskellä vaakasuunnassa; sijainti on noin 11 prosenttiyksikköä tavoitetta ylempänä, koska lähdekuva on jo 3:2 eikä ylhäältä voi rajata lisää ilmaa. Antennin kärki on yläreunan häivytyksessä.
- Jakso 3: ei vapaata vaakakuvaa 1900-luvun alusta, jossa torni on kokonaan (LoC:n photochromit ovat pystykuvia tai tornin huippu leikkautuu). Valittu 1889 Trocadéron näkymä (sepia): torni kokonaan, Champ de Mars ja näyttelyalue taustalla. Mitta: torni 5-70 % kuvan korkeudesta, huippu osin yläreunan häivytyksessä.
- Jakso 1-2 (KK 20.11. 11.42): Neurdein 1888 aitona (lähde 1600 x 1282, rajaus 1600 x 1067 ylärivistä; torni 9–80 % kuvan korkeudesta, jalat ja sivut häivyttämättömällä alueella, huipun ylin kohta 9 %:ssa eli n. 3 prosenttiyksikköä häivytyksen puolella; lähteessä ei ole lisää ilmaa yläpuolella). Jakso 4: tilaus (Lustig, ei valokuvaa).

#### Hylätty

- Nykyinen niittaus (Matkakirjan havainnekuva): kasvot lähikuvana, ei tornia kokonaan. Nykyinen "kauko"-kuva (1888, Matkakirjan hetki): torni 80 % korkeudesta, työmiehet lähikuvana.
- Nykyinen rakenteilla (Durandelle 1888, 1280 x 1628) ja photochrom1900 (1280 x 1810): pystykuvia, torni ei mahdu vaakarajaukseen.
- Nykyinen lustig (1024 x 683): alle 1200 px, reunamiehet häipyvät.
- Neurdein 1888: kaunis, mutta torni 73 % kuvan korkeudesta 3:2-rajauksessa. Rousselet 1888: sumea, torni täyttää kuvan. Stitched 1887-88: kollaasi, saumoja. Blancard 10.2.1888: pahvikehys. Féau/Tilly-piirros 1888: sanomalehden otsikko ja teksti, torni vasemmassa alareunassa. Carl Larsson -maalaus ja Chauvet-piirros: tornista vain osa / teksti ja signeeraus kuvassa. Meurisse 1914 (TSF-asema): negatiivin reuna, numerot kuvassa, torni leikkautuu.
- 1889 Neurdein-lähikuvat ja LoC photochromit: tornin huippu poissa.
- Ilmakuva 1889 (trialsanderrors, 1483 x 1005): torni 63 % korkeudesta, sijainti alhaalla (jalat 90 %), pystyraita kuvassa.
- Muita moderneja (Bir-Hakeim 2013, Champ de Mars 2012, Pont d'Iéna 2016): torni 56-90 % korkeudesta tai sivussa; Delgado 01 oli paras.

#### Avoimet kysymykset KK:lle

1. VISA: 'Miksi huijarin uhri ei ilmoittanut huijauksesta poliisille?' vastaus 'Hän häpesi'. Kuvatekstit eivät mainitse häpeää; Lustig-tilauksessa kielto "kauppiaiden häpeä".
2. Jakso 3: kuvan vuosi 1889, jakso puhuu 20 vuoden jälkeisestä ajasta ja antennista (kuvateksti "näyttelyssä 1889" kertoo kuvan, ei väitä muuta). Vaihtoehto: tilata Codex-kuva tornista noin 1914 antenneineen.
3. Yksi kuva tilattu (jakso 4, Lustig); vaatii Codex-ajon ennen vientiä. Jakson 4 tilauksesta puuttuu hotellisalongin viitekuva (Hôtel de Crillon; ei varmistettu).
4. Sivutuote: jakson 5 kuvassa Palais de Chaillotin siivet ovat taustalla pieninä; ei pääaihe.
5. Tornin mitat 60 %:iin eivät täyty kummassakaan haetussa kuvassa täsmälleen (kts. yllä); tarkempi mittaus vaatisi uuden kuvan.

### sainte-chapelle: kuvatyö (K-4 erä 1)

#### Kuvat

| Jakso | Kertoja sanoo | Kuva | Laji | Lähde, tekijä, lisenssi, linkki | Tila |
|---|---|---|---|---|---|
| 1 | Sainte-Chapelle on kappeli Cité-saaren palatsin pihalla. Kuningas Ludvig IX rakennutti sen säilyttämään Kristuksen orjantappurakruunua, ja se vihittiin vuonna 1248. Samassa palatsissa ratkaistiin kuningattaren kaulanauhajuttu. | piha: Sainte-Chapelle Cité-saaren palatsin pihalla (ei kuvaa) | havainnekuva | Matkakirjan oma (tilaus, TILAUKSET.md 1) | tilattu |
| 2-3 | 1770-luvulla jalokivikauppiaat tekivät timanttikaulanauhan. Marie Antoinette kieltäytyi ostamasta sitä, mutta huijari Jeanne de La Motte sai kardinaali de Rohanin uskomaan, että kuningatar halusi nauhan salaa. / Elokuussa 1784 kardinaali tapasi Versailles'n puistossa naisen, jonka hän luuli kuningattareksi. Alkuvuodesta 1785 hän sai nauhan kauppiailta ja luovutti sen Jeannelle. Kun kauppiaat pyysivät maksua, kuningatar vaati selvitystä, ja kardinaali pidätettiin. | kaulanauha: Yöllinen tapaaminen Versailles'n puistossa 1784 (ei kuvaa) | havainnekuva | Matkakirjan oma (TILAUKSET.md 2) | tilattu |
| 4 | Oikeudenkäynti pidettiin Pariisin parlamentissa. Toukokuussa 1786 kardinaali vapautettiin, ja Jeanne leimattiin varkaaksi ja vietiin vankilaan. Kuningattaren maine kärsi. | parlamentti: Pariisin parlamentin istuntosali 1786 (ei kuvaa) | havainnekuva | Matkakirjan oma (TILAUKSET.md 3) | tilattu |
| 5 | Sainte-Chapelle on yhä saman palatsin pihalla. Sen ikkunoissa on yli tuhat kohtausta, ja kappeliin mennään turvatarkastuksen kautta. | ikkunat: Yläkappelin lasimaalaukset (sainte-chapelle-ikkunat.jpg) | valokuva | Gerda Arendt, Wikimedia Commons (CC0), rajattu; https://commons.wikimedia.org/wiki/File:Sainte-Chapelle,_Paris,_upper_chapel_windows.jpg | pidetään |

Yhteensä: 1 pidetään, 0 haettu, 3 tilattu.

#### Perustelut

- 5 jaksoa, 4 kuvaa: jaksot 2-3 jakavat yhden kuvan (kaulanauhan juoni ja Versailles'n tapaaminen kuuluvat samaan hetkeen).
- Jakso 5 pidetään: ainoa nykyinen kuva, joka läpäisee säännöt; haettu uudelleen alkuperäisestä (4000 x 3000) ja rajattu. Se on sisäkuva: viimeisen kuvan "aito valokuva paikasta nykyään" täyttyy, mutta ulkoa ei ole.
- Jakso 1: vapaata vaakakuvaa, jossa kappeli on kokonaan keskimmäisessä 60 %:ssa, ei löytynyt; siksi tilaus. Jakson 4 oikeudenkäynnistä ei ole vapaata kuvaa.

#### Hylätty

- Nykyinen piha (Uoaei1, 1280 x 1920): pystykuva, torni leikkautuisi.
- Nykyinen nauha (Collier de la Reine, Breteuil): kollaasi (kaksi kuvaa vierekkäin); sama lähde 3443 x 2370 vaakana mutta saumaviiva keskellä.
- Nykyinen juoni (Matkakirjan havainnekuva): kardinaalin ja Jeannen kasvot puolilähikuvana, reunan oppipoika häipyy.
- Nykyinen rohan (Cardinal Rohan2): 289 x 432 px.
- Nykyinen viuhka (EV0120, CC0): valkoinen tausta; ei vastaa jaksoa 4. 
- Gerda Arendt "from street" (3758 x 2839): kappeli ulottuu kuvan yläreunaan ja on portin, liikenteen ja ihmisten takana. Vellut 5472 x 3648: kappeli leikkautuu alareunasta. Rijksmuseumin 1800-luvun stereokortit: kaksoiskuva ja pahvi.
- Haut "affair of the diamond necklace", "Grand'Chambre du Parlement" ja "Parlement de Paris": vain kirjoja ja arkistosivuja, ei käyttökelpoisia kuvia.

#### Avoimet kysymykset KK:lle

1. VISA: 'Kuka kaulanauhajutussa tuomittiin vankilaan?' vastaus Jeanne de La Motte. Kuvatekstit eivät kerro vankilasta; jakson 4 tilauksessa kielto "vanki, leimaus".
2. Kolme kuvaa tilattu: tilauksissa 1-3 viitekuvia ei ole varmistettu (puiston ja salin viitekuvat pitää hakea Commonsista ennen tilausta).
3. Jakson 5 kuva on yläkappelin sisäkuva (ikkunat täyttävät kuvan); häivytys kuluttaa ylä- ja alanurkkia, mutta aihe on yhtenäinen lasimaalausten seinä.
4. Ehdotus: jos ulkokuva halutaan aitona, kappelin vaakakuva vaatisi kuvaajalta kauempaa otetun kuvan (esim. Seinen yli); Commonsissa ei löytynyt.

### curie-1898: kuvatyö (K-4 erä 1)

#### Kuvat

| Jakso | Kertoja sanoo | Kuva | Laji | Lähde, tekijä, lisenssi, linkki | Tila |
|---|---|---|---|---|---|
| 1 | Curien vaja oli Pariisin fysiikan ja kemian koulun pihalla seissyt vaja, jossa Marie ja Pierre Curie eristivät radiumin. Se oli ennen ollut ruumiinavaussali. | vaja: Curien laboratorio oli pihavaja (curie-1898-vaja.jpg) | havainnekuva | Tekoälyllä tuotettu havainnekuva; Matkakirjan oma; https://media.matkakirja.app/kohtaamiset/historian-hetket/hetki-marie-curie-hangaari-1898-kauko-photo-v4.jpg | pidetään |
| 2-3 | Marie ja Pierre Curie tutkivat uraanimalmin sisältämää säteilyä. Heinäkuussa 1898 he ilmoittivat löytäneensä uuden alkuaineen. He nimesivät sen Marien kotimaan Puolan mukaan poloniumiksi. Joulukuussa he ilmoittivat toisen, radiumin. / Pelkkä ilmoitus ei riittänyt, vaan alkuaine piti saada puhtaana erilleen malmista. Vaja oli huonosti tuuletettu eikä pitänyt sadetta, ja malmia kului tonneittain. | radiumtyo: Marie ja Pierre Curie tutkivat malmin säteilyä 1898 (ei kuvaa) | havainnekuva | Matkakirjan oma (TILAUKSET.md 1) | tilattu |
| 4 | Työ vei yli kolme vuotta, ja vuonna 1902 heillä oli kymmenesosagramma puhdasta radiumkloridia. Iltaisin radium hohti pimeässä, ja Curiet ihailivat sitä. Marie sai fysiikan Nobelin vuonna 1903 Pierren ja Henri Becquerelin kanssa ja kemian Nobelin vuonna 1911 yksin. | hohto: Radium hohtaa pimeässä vajan hämärässä 1902 (ei kuvaa) | havainnekuva | Matkakirjan oma (TILAUKSET.md 2) | tilattu |
| 5 | Koulun seinässä on laatta, joka kertoo löydöstä. Marien myöhempi laboratorio on lähellä Curie-museona. | laatta: Laatta kertoo radiumin löydöstä koulun seinässä (curie-1898-laatta.jpg) | valokuva | Monceau from San Antonio, Wikimedia Commons (CC BY 2.0), rajattu; https://commons.wikimedia.org/wiki/File:Plaque_-_Location_de_d%C3%A9couvert_du_radium_-_rue_Pierre_Brossolette,_Paris_5.jpg | haettu |

Yhteensä: 1 pidetään, 1 haettu, 3 tilattu (KK 20.11. 11.42: jakson 1 havainnekuva pidetään toistaiseksi, korvaava kuva tilataan).

#### Perustelut

- 5 jaksoa, 4 kuvaa: jaksot 2-3 jakavat yhden kuvan (löytö ja työn vaikeus).
- Jakso 1: nykyinen vajakuva (Matkakirjan "kauko"; alkuperäinen 1536 x 1024, ei suurennettu) näyttää juuri vajan: lasikatto, malmisäkit, höyry, laitteet. Naisen kasvot ovat keskikuvana, ei lähikuvana. Sama kuva sopisi sisällöltään myös jaksoon 3; jaksoon 1 sijoitettu, koska muuta kuvaa vajasta ei ole.
- Jakso 5: laatta rajattu 3:2:een alkuperäisestä (4264 x 1529, ladattu 3840 leveänä). Teksti kuvassa on kuvan aihe; reunasta jää pois "ONT" ja laatan vasen kuvio. Parempaa aitoa kuvaa ei löytynyt vapaana: ESPCI-kuvat ovat kylttejä ja mosaiikkeja lähikuvana, Musée Curien puutarhan veistos jätetty pois (tekijänoikeus epäselvä).

#### Hylätty

- Nykyinen marie (Marie Curie noin 1898, 1440 x 2160 pystykuva): 3:2-rajauksessa kasvot lähikuvana ja pää yläreunassa.
- Nykyinen laboratorio (608 x 342) ja kuvateksti "ja Pierre": alle 1200 px, rakeinen.
- Wellcome "The Radium Institute, Paris" (CC BY 4.0, 3887 x 2866): 1920-luvun rakennus, ei vaja eikä nykykuva.
- ESPCI de Paris -julkisivu (LPLT, 2576 x 1932): kylttiteksti ja autot edessä.
- Musée Curie GFreihalter 758-761: puutarhan veistos (tekijänoikeus epäselvä) ja hanat.

#### Avoimet kysymykset KK:lle

1. VISA: 'Minkä alkuaineen Curiet nimesivät Marien kotimaan mukaan?' vastaus Polonium. Kuvatekstit eivät mainitse poloniumia; tilauksen 1 kielto "alkuaineiden nimet" lisätty. Jakso 1 kuvateksti ja jakso 5 mainitsevat radiumin (vastauksen vaihtoehto), mutta eivät ole vastaus.
2. Kolme kuvaa tilattu (1 korvaava vaja, 2-3, 4); viitekuvat vajasta ja hohdosta eivät ole varmistettuja. KK 11.42: jakson 1 havainnekuvassa naisen kasvot ovat keskikuvana; kuva pidetään, kunnes korvaava (henkilöt selin tai kaukana) tulee; tilauspohja TILAUKSET.md 3.
3. Jakso 5: laattakuvassa on tekstiä, ja nykykuvaksi se on heikko; vaihtoehto olisi tilata/kuvata ESPCI:n julkisivu.
4. Jakson 5 teksti mainitsee Curie-museon; sen vapaata julkisivukuvaa ei löytynyt.

### lumiere-1895: kuvatyö (K-4 erä 1)

#### Kuvat

| Jakso | Kertoja sanoo | Kuva | Laji | Lähde, tekijä, lisenssi, linkki | Tila |
|---|---|---|---|---|---|
| 1 | Grand Café oli kahvila Capucines-bulevardilla Pariisissa, ja sen kellarissa maksava yleisö katsoi Lumièren veljesten elokuvaa. | bulevardi: Capucines-bulevardi 1890-luvulla, Café de la Paix oikealla (lumiere-1895-bulevardi.jpg) | valokuva | Tuntematon valokuvaaja, Wikimedia Commons (Public domain), rajattu; https://commons.wikimedia.org/wiki/File:Paris1890s3.jpg | haettu |
| 2-3 | Lumièren veljekset patentoivat keksintönsä helmikuussa 1895. Laite oli kamera ja projektori yhdessä, ja sillä kuvattu filmi oli noin minuutin pituinen. / Joulukuun 28. päivänä 1895 Grand Cafén kellarisalissa pidettiin maksullinen näytös. Lippu maksoi frangin, ja illalla katsojia oli vain kolmisenkymmentä. Valkokankaalla Lumièren tehtaan portti Lyonissa aukesi, ja työläiset kävelivät ulos. | portti: Ruutu Lumièren tehtaan elokuvasta (lumiere-1895-portti.jpg) | valokuva | Louis Lumière (ruutu elokuvasta), Wikimedia Commons (Public domain), rajattu; https://commons.wikimedia.org/wiki/File:Sortieusinelumiere.jpg | haettu |
| 4 | Kutsuvieraiden joukossa oli taikuri Georges Méliès. Hän halusi ostaa laitteen, mutta Lumièret eivät myyneet sitä. Puhe levisi, ja kadulle syntyi jono. Méliès alkoi tehdä omia elokuviaan: ensimmäisen hän teki vuonna 1896 ja Matkan kuuhun vuonna 1902. | melies: Kohtaus Mélièsin elokuvasta Matka kuuhun, 1902 (lumiere-1895-melies.jpg) | valokuva | Georges Méliès, Wikimedia Commons (Public domain), rajattu; https://commons.wikimedia.org/wiki/File:M%C3%A9li%C3%A8s_Trip_to_the_Moon_planets_still.jpg | haettu |
| 5 | Grand Cafén paikalla on nykyään Hôtel Scribe. Sen ravintoloiden sisäänkäynnillä on laatta, joka kertoo näytöksestä. | scribe: Hôtel Scribe Capucines-bulevardilla nykyään (lumiere-1895-scribe.jpg) | valokuva | ScareCriterion12, Wikimedia Commons (CC BY-SA 4.0), rajattu; https://commons.wikimedia.org/wiki/File:14_Boulevard_des_Capucines_Sep_2017.jpg | haettu |

Yhteensä: 0 pidetään, 4 haettu, 0 tilattu.

#### Perustelut

- 5 jaksoa, 4 kuvaa: jaksot 2-3 jakavat yhden kuvan (tehtaan portti: noin minuutin filmi ja sen näytös). Aikajärjestys: 1890-luvun valokuva, filmiruutu, 1902 elokuvakuva, nykykuva.
- Jakso 1: bulevardi 1890-luvulla näyttää paikan (Capucines-bulevardi, Café de la Paix kulmassa). Grand Caféa itseään ei vapaana löytynyt.
- Jakso 2-3: ruutu Lumièren tehtaan elokuvasta (PD, 1760 x 1180, ei suurennettu) näyttää juuri sen, mitä valkokankaalla nähtiin.
- Jakso 4: Mélièsin Matka kuuhun -mainoskuva (PD, 2072 x 1498). Näyttää jakson viimeisen osan (1902) eikä jonoa.
- Jakso 5: Hôtel Scribe nykyään (CC BY-SA 4.0, 3840 x 2560), koko julkisivu keskellä. Viimeinen kuva on aito nykyvalokuva.
- Codex-tilausta ei tarvittu: kaikille jaksoille löytyi aito kuva. Commonsin luokkia selattiin hakusanoilla (Cinématographe Lumière, Hôtel Scribe, 14 boulevard des Capucines, Sortie de l'usine, Boulevard des Capucines 1890s).

#### Hylätty

- Nykyiset veljekset (691 x 930 pystykuva), juliste (Brispot, pystykuva, painettu teksti), melies (Mélièsin kasvot lähikuvana), laatta (teksti lähikuvana).
- Auzollen "Cinématographe Lumière" -juliste (6385 x 4877, PD): yleisö katsoo valkokangasta, mutta 3:2-rajaukseen jää otsikkoteksti.
- Mélièsin cannon still (2148 x 1566): tummat repeytyneet reunat ja pahvi.
- Clément-Mauricen 1897-kuva Boulevard des Capucines / Opéra (5238 x 4189, PD): sivuskannaus, kehys ja kuvateksti; paras 1890-luvun kuva Opérasta, mutta ei Grand Caféa.
- Cinématographe-laitekuvat: n°101 (seinäteksti kuvassa), Linili (museovitriini, kyltit ja juliste kuvassa), Victorgrigas ja Podzo di Borgo (pystykuvia).
- Plaque Lumière ja Plaque Lumière2 (Tangopaso, PD): laatan teksti kuvan aiheena; Plaque Lumière2 näyttää myös sisäänkäynnin, mutta teksti hallitsee kuvaa.
- Hôtel Scriben toinen kuva (ScareCriterion12, 4482 x 3052): julkisivu leveä, vasen kulma häipyy rajauksessa.

#### Avoimet kysymykset KK:lle

1. VISA: 'Paljonko lippu maksoi Grand Cafén näytökseen?' (oikea: yksi frangi). Kuvat ja kuvatekstit eivät mainitse hintaa eikä laatan teksti ole kuvassa. Vastaus on jakson 3 tekstissä, ei kuvissa.
2. Jakso 1 -kuva: tarkkaa kuvaajaa ja vuotta ei ole Commonsissa (kuvan nimi Paris1890s3). Kuvateksti väittää vain bulevardin ja Café de la Paixin (näkyy markiisissa); jos halutaan varmempi, kuvateksti voisi olla "Pariisin bulevardi 1890-luvulla".
3. Jakso 4: kuva ei näytä jonoa eikä Mélièsiä (teksti "Puhe levisi, ja kadulle syntyi jono"). Mélièsin Matka kuuhun -kuva sopii vain jakson loppuun. Vaihtoehto: tilata Codex-kuva jonosta Boulevard des Capucinesilla.
4. Jakso 5 mainitsee laatan; kuvassa ei ole laattaa (teksti kuvassa -sääntö). Laatan lähikuva (Plaque Lumière, PD) on saatavilla, jos teksti kuvassa sallitaan, kuten Curien laatta.
5. Jakson 2-3 filmiruudun versio (maaliskuu vs. joulukuu 1895) on epävarma.

### lavoisier-1780: kuvatyö (K-4 erä 1)

#### Kuvat

| Jakso | Kertoja sanoo | Kuva | Laji | Lähde, tekijä, lisenssi, linkki | Tila |
|---|---|---|---|---|---|
| 1-2 | Lavoisierin laboratorio oli Arsenaalin asunnon yhteydessä Pariisissa. Antoine Lavoisier johti Arsenaalissa ruudin valmistusta ja punnitsi laboratoriossaan kaiken ennen koetta ja sen jälkeen. Tuloksista hän päätteli, että ainetta on kokeen jälkeen yhtä paljon kuin ennen sitä. / Vuonna 1771 Lavoisier meni naimisiin Marie-Annen kanssa. Marie-Anne oppi englantia ja käänsi ulkomaisia tutkimuksia ranskaksi. Lavoisier huomasi kokeissaan, että palaessa aine yhtyy ilman osaan, jonka hän nimesi hapeksi. | koe: Lavoisierin koe laboratoriossa, 1700-luvun piirros (lavoisier-1780-koe.jpg) | piirros | Wellcome Collection, Wikimedia Commons (CC BY 4.0), rajattu; https://commons.wikimedia.org/wiki/File:%27Lavoisier_experimenting_in_his_laboratory_Wellcome_M0004489.jpg | haettu |
| 3 | Vuonna 1788 Jacques-Louis David maalasi Lavoisierista ja Marie-Annesta muotokuvan. Marie-Annen työ näkyi myös oppikirjassa: vuonna 1789 ilmestyneeseen Lavoisierin oppikirjaan hän piirsi laitteiden kuvat. | david: Davidin maalaus Lavoisierista ja Marie-Annesta 1788 (lavoisier-1780-david.jpg) | maalaus | Jacques-Louis David 1788, Wikimedia Commons (Public domain), rajattu; https://commons.wikimedia.org/wiki/File:David_-_Portrait_of_Monsieur_Lavoisier_and_His_Wife.jpg | haettu |
| 4 | Lavoisier oli kuulunut vanhan hallinnon veronkantajiin. Vallankumouksen tuomioistuin tuomitsi hänet kuolemaan, ja hänet mestattiin toukokuun 8. päivänä 1794. Lavoisierin laboratorion välineitä on nykyään Arts et Métiers -museossa Pariisissa. | valineet: Lavoisierin laboratorion välineitä Arts et Métiersissä (lavoisier-1780-valineet.jpg) | valokuva | Rama, Wikimedia Commons (CC BY-SA 2.0 fr), rajattu; https://commons.wikimedia.org/wiki/File:Labo-Lavoisier-IMG_0501.jpg | haettu |

Yhteensä: 0 pidetään, 3 haettu, 0 tilattu (KK 20.11. 11.42: J1-havainnekuva poistettu, piirros kattaa jaksot 1–2).

#### Perustelut

- 4 jaksoa, 3 kuvaa (jakso 1–2 yhteinen piirros). Järjestys: 1700-luvun piirros, maalaus, nykyvalokuva.
- Jakso 1: nykyinen havainnekuva (laboratorio) POIS KK:n päätöksellä 11.42: tunnettujen henkilöiden kasvot puolilähikuvana ja nainen piirtämässä vihjaisivat visan vastauksen ennen jaksoa 3. Jakson 1–2 kuvaksi tulee J2:n aikalaispiirros.
- Jakso 2: Wellcomen lavattu piirros laboratoriokokeesta (4150 x 2553), reunaviiva häipyy soikeaan reunaan.
- Jakso 3: Davidin kaksoismuotokuva isosta PD-versiosta (4390 x 5852); rajaus päät ja ylävartalot, keski 0,5 / 0,33.
- Jakso 4: Raman valokuva kaasumittareista CNAM:ssa (3072 x 2048, täsmälleen 3:2). Viimeinen kuva on aito nykyvalokuva.
- Codex-tilausta ei tarvittu. Commonsin luokat selattiin (Antoine-Laurent de Lavoisier; luokalla ei omia laboratoriokuvia).

#### Hylätty

- Nykyinen koe (Wellcome L0000145, 1642 x 1156): kuvateksti ja valkoinen reuna alareunassa jäisi rajaukseen.
- Nykyinen kaasumittarit (Edal Anton Lefterov, 1860 x 1123): museon seinäteksti 'Laboratoire de Lavoisier', ohjekyltit ja kaiteet; Raman kuva on tiiviimpi ja tekstiä on vähemmän.
- Rama CNAM-film69 (2150 x 999): tumma, violetti sävy, teksti keskellä.
- Wellcome M0004488 (halftone-rasteri, kehys), diorama M0005412 (tumma), Barrias'n patsas, Coimbran kaasumittari (väärä museo), Paulze Lavoisierin kaiverrukset oppikirjasta (Gallica/BnF, 15 levyä): kaiverrusten tekijänimi (Paulze Lavoisier) paljastaisi visan vastauksen lähderivillä, ja ne ovat laitepiirroksia ilman ihmisiä.

#### Avoimet kysymykset KK:lle

1. VISA: ratkaistu KK 11.42: J1:n havainnekuva poistettu. Kuvatekstit eivät mainitse käännöstä eikä piirtämistä. Visasääntö tarkentui: kuva saa näyttää sen, minkä kertoja samassa jaksossa sanoo, ei ennen sitä.
2. Jakso 4: kuvassa on haalea seinäkirjoitus 'Laboratoire de Lavoisier' osin peittyneenä (yläoikealla). Muuten valokuva on paras löytynyt; vaihtoehtona nykyinen kuva, jossa teksti näkyy kokonaan.
3. Jakso 3: maalaus esittää parin 1788, mutta kuvassa ei ole mestausta (jaksossa 4 mainitaan 1794); jakso 3 (muotokuva 1788) täsmää.
4. Jakso 2: jaksossa kerrotaan hapen nimeämisestä ja Marie-Annen kääntämisestä; kuva näyttää koelaitteita ja kirjoittavan naisen mutta ei hapen löytöä.

### pasteur-1862: kuvatyö (K-4 erä 1)

#### Kuvat

| Jakso | Kertoja sanoo | Kuva | Laji | Lähde, tekijä, lisenssi, linkki | Tila |
|---|---|---|---|---|---|
| 1 | Pasteurin laboratorio oli École normale supérieuren tiloissa rue d'Ulmilla Pariisissa. Louis Pasteur tuli kouluun vuonna 1857 tieteellisten opintojen johtajaksi. | piha: École normale supérieuren sisäpiha rue d'Ulmilla (pasteur-1862-piha.jpg) | valokuva | Jan Sokol, Wikimedia Commons (CC BY-SA 3.0), rajattu; https://commons.wikimedia.org/wiki/File:ENS_dvur.JPG | haettu |
| 2-3 | Pasteurin vastustaja Félix Pouchet uskoi, että elämä voi syntyä itsestään mätänevästä aineesta. Tiedeakatemia oli luvannut palkinnon sille, joka ratkaisee kiistan kokeilla. / Pasteur keitti lientä lasipulloissa, joiden kaula oli taivutettu joutsenen kaulan muotoon. Ilma pääsi pulloon, mutta pöly jäi mutkaan, ja liemi pysyi kirkkaana. Vuonna 1860 hän vei liemipulloja jopa Alppien jäätikölle, jossa ilmassa oli vain vähän pölyä. | pullo: Joutsenkaulapullo Pasteurin kokeista (pasteur-1862-pullo.jpg) | valokuva | Wellcome Collection, Wikimedia Commons (CC BY 4.0), rajattu; https://commons.wikimedia.org/wiki/File:Swan-necked_flask_used_by_Pasteur._Wellcome_M0012521.jpg | haettu |
| 4 | Pasteur voitti kiistan ja julkaisi tuloksensa 1860-luvun alussa. Hän osoitti myös, että käyminen on elävien mikrobien työtä. Viinin tauteja hän torjui kuumentamalla viiniä, ja keksinnölle haettiin patentti vuonna 1865. Menetelmää kutsutaan pastöroinniksi. | maalaus: Edelfeltin maalaus Pasteurista laboratoriossa 1885 (pasteur-1862-maalaus.jpg) | maalaus | Albert Edelfelt 1885, Wikimedia Commons (Public domain), rajattu; https://commons.wikimedia.org/wiki/File:Albert_Edelfelt_-_Louis_Pasteur_-_1885.jpg | haettu |
| 5 | Vuonna 1888 avattiin Institut Pasteur, joka kantaa hänen nimeään. École normale supérieure toimii yhä rue d'Ulmilla Latinalaiskorttelissa. | ens: École normale supérieuren sisäänkäynti rue d'Ulmilla (pasteur-1862-ens.jpg) | valokuva | Mbzt, Wikimedia Commons (CC BY 4.0), rajattu; https://commons.wikimedia.org/wiki/File:CF6477_Paris_5e_rue_Ulm_ENS_rwk.jpg | haettu |

Yhteensä: 0 pidetään, 4 haettu, 0 tilattu.

#### Perustelut

- 5 jaksoa, 4 kuvaa: jaksot 2-3 jakavat joutsenkaulapullon (Pouchetin kiista ja kokeet). Järjestys: nykyvalokuva ENS:stä, museoesine, 1885-maalaus, nykyvalokuva sisäänkäynnistä. Viimeinen kuva on aito nykyvalokuva.
- Jakso 1: ENS:n sisäpiha (1600 x 1200, ei suurennettu) korvaa Codex-pullot-kuvan, jossa Pasteurin kasvot olivat lähikuvana.
- Jakso 2-3: Wellcomen valokuva joutsenkaulapullosta (4040 x 2904). Jakso 4: Edelfeltin maalaus (pää ja pullo keskellä). Jakso 5: Mbztin kuva ENS:n sisäänkäynnistä (4000 x 2745).
- Codex-tilausta ei tarvittu (suunnitelma ehdotti kahta). Joutsenkaulapullot ja jäätikkömatka löytyivät aitoina Commons-kuvina (pullo, Bissonin veljesten 1860 Chamonix).

#### Hylätty

- Nykyinen pullot (Codex-havainnekuva, Pasteurin kasvot lähikuvana) ja pouchet (valkoinen tausta, signeeraus).
- Laboratoire Pasteur ENS (LPLT, 2048 x 1536): paras vastine "laboratorio ENS:ssä", mutta katukalusteet (liikennevalo, kyltit, pankki) täyttävät kuvan; laatta liian pieni.
- Labo de Pasteur ENS (LPLT, pystykuva 1944 x 2592).
- Wellcome 'Three flasks opened by Pasteur' (suorakaulaiset pullot, etiketit) ja pystykuvapullot (L0057230, M0012524).
- Bisson 1860 Vallée de Chamonix (PD, 2615 x 1951): kaunis, ei tekstiä, sopisi jaksoon 3 (jäätikkö 1860), mutta kuvia saa olla 4; varakuva, jos halutaan jäätikkökuva pullon tilalle.
- 'M. Pasteur dans son laboratoire CIPC0016' (Licence Ouverte; ei sallittu lisenssi).

#### Avoimet kysymykset KK:lle

1. VISA: 'Miksi joutsenkaulapullon liemi pysyi kirkkaana…' (oikea: lasin mutka pysäytti pölyn ja mikrobit). Kuvateksti 'Joutsenkaulapullo Pasteurin kokeista' ei kerro syytä; kuva näyttää pullon mutkan ja kirkkaan liemen, mutta ei selitä. Yksi riski: pullo kuvassa on jakson 3 aihe, ja visa tulee sen jälkeen; ok jos visa tulee vasta jakson jälkeen.
2. Jakso 2 (Pouchet, Tiedeakatemian palkinto) ja jakson 3 loppu (Alppien jäätikkö 1860) jäävät ilman omaa kuvaa; pullo kattaa vain pullokokeet.
3. Jakso 4 -kuva on 1885 (jakso kertoo 1860-luvusta ja 1865).
4. Jakson 5 teksti mainitsee Institut Pasteurin; kuva näyttää vain ENS:n.

5. (KK 20.11. 11.42, SK:n mittaus) Jakso 2-3: pullokuvan lähde (3840 x 2760) on jo kauttaaltaan käytössä: 3:2-rajaus täyttää koko leveyden, joten --keski oikealle ei muuta vaakasuuntaa. Mitta 1200 x 800 -kuvassa: pallo x 63–87 %, y 54–97 %; pallon oikea laita ja jalusta jäävät soikean häivytyksen puolelle (jalusta y 97 %). Ratkaisu vaatisi taustan laajennuksen (pääasia jäisi muokkaukseksi, ei rajaukseksi) tai toisen kuvan; jätetty ennalleen KK:n päätettäväksi.

### palais-garnier: kuvatyö (K-4 erä 1)

#### Kuvat

| Jakso | Kertoja sanoo | Kuva | Laji | Lähde, tekijä, lisenssi, linkki | Tila |
|---|---|---|---|---|---|
| 1 | Palais Garnier on Pariisin oopperatalo, jonka rakentamisen sai alkuun murhayritys. Vuonna 1858 keisari Napoleon III välttyi murhayritykseltä vanhan oopperan edessä. Sen jälkeen hän päätti rakennuttaa uuden. Kilpailuun tuli yli sata ehdotusta, ja voittajaksi valittiin nuori, tuntematon arkkitehti Charles Garnier. | piirtosali: Arkkitehdit Garnierin piirtosalissa (palais-garnier-piirtosali.jpg) | valokuva | Louis-Émile Durandelle, Metropolitan Museum of Art, Wikimedia Commons (CC0), esirajattu ja rajattu; https://commons.wikimedia.org/wiki/File:-Charles_Garnier_in_the_Drafting_Room_While_Designing_the_New_Paris_Opera-_MET_DP116738.jpg | haettu |
| 2 | Kun työmaalla kaivettiin perustuksia, maasta nousi pohjavettä. Garnier rakennutti kellariin vesitiiviin betonisäiliön. Vuonna 1870 alkanut sota ja Pariisin kommuuni pysäyttivät rakentamisen. | tyomaa: Palais Garnierin työmaa 1866 (palais-garnier-tyomaa.jpg) | valokuva | Delmaet & Durandelle 1866, Wikimedia Commons (CC0), rajattu; https://commons.wikimedia.org/wiki/File:Chantier_de_l%27_OPERA_-1866.jpg | haettu |
| 3 | Syksyllä 1873 vanha oopperatalo paloi. Palon jälkeen Garnierin työmaa sai jatkua, ja uusi talo valmistui alle kahdessa vuodessa. | palo: Vanhan oopperatalon palo rue Le Peletierillä (palais-garnier-palo.jpg) | piirros | Arthur Hauger (Le Monde illustré, 1873), Paris Musées / Musée Carnavalet, Wikimedia Commons (CC0), esirajattu ja rajattu; https://commons.wikimedia.org/wiki/File:Incendie_du_th%C3%A9%C3%A2tre_de_l%27Op%C3%A9ra,_vue_prise_rue_Le_Peletier._Paris_Mus%C3%A9es_20230613105245.jpg | haettu |
| 4 | Talo avattiin tammikuussa 1875, ja Garnier joutui maksamaan paikkansa avajaisissa itse. Nykyään talossa esitetään yhä balettia, ja katsomon katon on maalannut Marc Chagall vuonna 1964. | portaikko: Palais Garnierin pääportaikko (palais-garnier-portaikko.jpg) | valokuva | Pierre André Leclercq, Wikimedia Commons (CC BY-SA 4.0), rajattu; https://commons.wikimedia.org/wiki/File:Paris_l%27Op%C3%A9ra_Garnier_Le_grand_escalier.jpg | haettu |

Yhteensä: 0 pidetään, 4 haettu, 0 tilattu (KK 20.11. 11.42: palo aitona Hauger-kaiverruksena, piirtosali esirajattu oman ovaalinsa sisään).

#### Perustelut

- 4 jaksoa, 4 kuvaa, yksi per jakso. Järjestys: 1860-luvun piirtosalikuva, 1866 työmaa, palon kaiverrus, nykyvalokuva.
- Jakso 1: MET:n Durandelle-valokuva Garnierin piirtosalista (CC0), esirajattu oman ovaalinsa sisään (2650 x 1766 pikseliä 595,547; ei paperia, ei ovaalin reunaa; KK 11.42), sitten 3:2. Jakso 2: Delmaet & Durandellen työmaakuva 1866 (CC0, 3456 x 1944, rajaus oikeasta reunasta). Jakso 4: portaikko, ei Chagall-kattoa.
- Jakso 3 (KK 20.11. 11.42): Hauger-kaiverrus (ladattu 3840 x 2658) esirajattu sharpilla kuva-alan sisään (3240 x 2035 pikseliä 300,165: ei paperireunaa, ei kuvatekstiä, ei signeerausta), sitten 3:2 → 1200 x 800. Näyttää yöllä palavan vanhan talon, palomiehet ja katsojat; uutta Opéraa ei näy. Laji piirros (kaiverrus). Codex-tilaus poistui.
- Chagallin kattoa ei ole kuvissa pääaiheena eikä lainkaan.

#### Hylätty

- Nykyinen julkisivu (pystykuva 1280 x 1920, nykykuva historiajaksossa), tyomaa (pahvikehys), palo (700 x 487), portaikko (Benh Lieu Song, korvattu isommalla Leclercqin kuvalla).
- Façade principale / ouest (Chabe01, 5184 x 3456): julkisivu on leveä tai kuvassa bussit ja autot; 'façade principale 5' on lähikuva, jossa teksti 'Académie nationale de musique'.
- 1864 Vue générale (Delmaet & Durandelle, PD, 11390 x 8142): perustusvaihe, mutta paperireuna.
- Ancien Opéra -pienoismalli (Paris Musées, CC0): jalustan teksti ja studiotausta.
- Garnier-muotokuvat (Nadar, Carjat; pystykuvia).
- Romanon kuva Orsinin pommi-iskusta 1858 (1024 x 634): alle 1200 px.

#### Avoimet kysymykset KK:lle

1. VISA: 'Kuka taiteilija maalasi Palais Garnierin katsomon katon 1960-luvulla?' (Marc Chagall). Kuvatekstit ja kuvat eivät mainitse Chagallia eikä kattoa.
2. Jakso 1 kertoo murhayrityksestä 1858 ja arkkitehtikilpailusta; kuva näyttää Garnierin piirtosalin (kilpailun jälkeinen aika). Murhayrityksestä ei ole vapaata riittävän isoa kuvaa.
3. (Ratkaistu KK 11.42) Piirtosalikuvan oma ovaali on esirajattu pois.
4. Jakso 2 kertoo perustuksista ja pohjavedestä; kuva näyttää työmaan 1866 (perustusten jälkeen).
5. (Ratkaistu KK 11.42) Palo-kuva on nyt aito Hauger-kaiverrus; Codex-tilausta ei enää ole.

### palais-orsay: kuvatyö (K-4 erä 1)

#### Kuvat

| Jakso | Kertoja sanoo | Kuva | Laji | Lähde, tekijä, lisenssi, linkki | Tila |
|---|---|---|---|---|---|
| 1 | Palais d'Orsay oli hallintopalatsi Seinen rannalla Pariisissa. Sitä alettiin rakentaa 1800-luvun alussa Napoleonin aikana, ja se valmistui vasta noin kolmenkymmenen vuoden päästä. Siellä toimivat valtioneuvosto ja tilintarkastustuomioistuin. | loisto: Palais d'Orsay loistoaikanaan (palais-orsay-loisto.jpg) | havainnekuva | Tekoälyllä tuotettu havainnekuva; Matkakirjan havainnekuva. Faktat: conseil-etat.fr, rajattu; Matkakirja (tekoälyllä tuotettu havainnekuva); Matkakirjan oma; https://media.matkakirja.app/kohtaamiset/ihmeet/ihme-palais-orsay-loistoaika.jpg | pidetään |
| 2 | Tilintarkastustuomioistuimen portaikon seinille Théodore Chassériau maalasi freskot. Pariisin kommuunin aikana, toukokuussa 1871, palatsi paloi. Émile Zola kuvasi tulipaloa romaanissaan La Débâcle. | palo: Palais d'Orsayn rauniot toukokuussa 1871 (palais-orsay-palo.jpg) | valokuva | Alphonse Liébert 1871, Wikimedia Commons (Public domain), rajattu; Alphonse Liébert; Public domain; https://commons.wikimedia.org/wiki/File:Commune_de_Paris_Conseil_d'Etat.jpg | haettu |
| 3 | Tuli tuhosi freskoja. Rauniot jäivät keskelle Pariisia vuosikymmeniksi. Vuonna 1900 maailmannäyttelyä varten niiden paikalle rakennettiin rautatieasema. | rauniot: Palais d'Orsayn raunioitunut sisäpiha (palais-orsay-rauniot.jpg) | valokuva | J. Barry, Musée Carnavalet / Paris Musées, Wikimedia Commons (CC0), rajattu; J. Barry (Barry, André Paul Édouard Jean), Musée Carnavalet / Paris Musées; CC0; https://commons.wikimedia.org/wiki/File:La_Cour_des_comptes,_quai_d'Orsay,_Ruines_apr%C3%A8s_l'incendie_de_la_Commune_de_Paris_dans_la_nuit_du_23_au_24_mai_1871,_qua,_PH10411.jpg | haettu |
| 4 | Asemasta tuli Orsayn taidemuseo. Rakennus päätettiin vuonna 1977 muuttaa museoksi, ja museo avattiin yleisölle vuonna 1986. Se seisoo yhä Seinen rannalla, samalla paikalla kuin palatsi. | museo: Orsayn taidemuseo Seinen rannalla (palais-orsay-museo.jpg) | valokuva | Gordon Gartrell, Wikimedia Commons (CC BY-SA 2.0), rajattu; Gordon Gartrell; CC BY-SA 2.0; https://commons.wikimedia.org/wiki/File:Mus%C3%A9e_d'Orsay_view_from_the_Seine_river_(36038174520).jpg | haettu |

Yhteensä: 1 pidetään, 3 haettu, 0 tilattu.

#### Perustelut

- 4 jaksoa, 4 kuvaa, yksi per jakso. Järjestys: loistoajan havainnekuva (pidetään), palon jälkeinen palatsi 1871, rauniot vuosikymmeniä myöhemmin, museo nykyään.
- Kaksi uutta 1800-luvun valokuvaa (Liébert 1871, PD; Barry, CC0) täyttävät aiemmin tyhjän jakson 2 ja korvaavat pystykuvapiirroksen jaksossa 3. Codex-tilausta ei tarvittu.
- Jakso 4: Orsayn museopanoraama (3,45:1) korvattu Gartrellin 3:2-kuvalla (CC BY-SA 2.0). Rajapinnan mukaan lisenssi CC BY-SA 2.0; rajaus on muokkaus (kortti lisenssit-ja-lataukset 4).
- Pariisin kommuunin palon valokuvat otettiin palon jälkeen; itse paloa ei ole valokuvattu, joten jakso 2 näyttää tuloksen.

#### Hylätty

- Nykyinen museo (DXR-panoraama, 3,45:1) ja nykyinen rauniot (Constantinin piirros, pystykuva).
- Valecke PH15309 ja anonyymi PH13719 (Carnavalet, CC0): stereokortit, joissa pahvikehys ja kaksi rinnakkaista kuvaa.
- Rijksmuseumin RP-F-F09365: stereokortti pahvikehyksellä.
- Barry PH24941 (sisäosa pilarein): hyvä kuva, mutta sisätila ja teksti 'Cour des Comptes' alareunassa; Barry PH10411 sopi paremmin 'vuosikymmeniksi'.
- Andrieu (Conseil d'État, istuntosali, PD, 4610 x 3601), Franck (sama kuva albumipahvilla), La Tremblais (värilitografia kuvateksteineen), Rouard-maalaukset P499/P500: sopivia mutta tässä käyttämättömiä; Andrieu on varakuva jaksolle 2 tai 3, jos Liébert ei kelpaa (sisäkuva, ei Cour des Comptesia).
- Museokuvat: Dalbéra 1800 x 1200 (rakennus täyttää koko leveyden), Cheng-en Cheng (oikean pään puut ja lippu häipyvät, rakennus liian leveä), Gaylard ja Ninara (rakennus täyttää leveyden, vene edessä), DiscoA340 (kuva lasin läpi).

#### Visa

Kysymys: Kuka kirjailija kuvasi Palais d'Orsayn tulipaloa romaanissaan? Vastaus: Émile Zola. Kuvissa ei ole tekstiä eikä kuvateksteissä mainita Zolaa, romaania tai kirjailijaa. Kuvateksti jaksolle 2 mainitsee vain palon toukokuussa 1871.

#### Avoimet kysymykset KK:lle

1. Jakso 2 kertoo Chassériaun freskoista ja Zolasta; kuva näyttää vain palaneen palatsin (1871). Freskoista ei löytynyt vapaata riittävän isoa kuvaa; ei tekstimuutosta ehdotettu.
2. Jakso 1 ja 'loisto' (havainnekuva): vasemman reunan hahmot ja sisäänkäynti häipyvät osin; kuva pidetään suunnitelman mukaan.
3. Liébertin kuvassa julkisivu täyttää leveyden (päädyt häipyvät); vaihtoehto on Andrieun sisäkuva (varakuva).
4. Barry-kuvan tuotantoaika on 'après 24-05-1871'; kuvateksti ei väitä vuotta, joten 'vuosikymmeniksi' ei ristiriitaa.

### palais-industrie: kuvatyö (K-4 erä 1)

#### Kuvat

| Jakso | Kertoja sanoo | Kuva | Laji | Lähde, tekijä, lisenssi, linkki | Tila |
|---|---|---|---|---|---|
| 1 | Palais de l'Industrie oli Pariisin vuoden 1855 maailmannäyttelyä varten rakennettu suurhalli Champs-Élysées'n tuntumassa. Sen suunnitteluun osallistui insinööri Barrault, ja hallin paikalla seisoo nykyään Grand Palais. | portti: Palais de l'Industrien pääsisäänkäynti (palais-industrie-portti.jpg) | valokuva | Édouard Baldus, The Metropolitan Museum of Art, Wikimedia Commons (Public domain), rajattu; Édouard Baldus, The Metropolitan Museum of Art; Public domain; https://commons.wikimedia.org/wiki/File:Palais_de_l'Industrie_-_%C3%89douard_Baldus.jpg | pidetään |
| 2-3 | Hallin lasikatto oli rautarakenteen varassa, mutta rauta oli kätketty kivimuurien sisään. Päähalliin ei mahtunut kaikkia koneita, joten Seinen varteen rakennettiin niille erillinen galleria. Näyttelyn päätösjuhlassa hallissa soi noin tuhannen esittäjän musiikki, kun säveltäjä Berlioz johti kantaattinsa. | loisto: Palais de l'Industrie loistoaikanaan (palais-industrie-loisto.jpg) | havainnekuva | Tekoälyllä tuotettu havainnekuva; Matkakirjan havainnekuva. Faktat: napoleon.org, Arthur Chandlerin Paris 1855 -sivu, rajattu; Matkakirja (tekoälyllä tuotettu havainnekuva); Matkakirjan oma; https://media.matkakirja.app/kohtaamiset/ihmeet/ihme-palais-industrie-loistoaika.jpg | pidetään |
| 4 | Halli ei saanut jäädä. Se purettiin 1890-luvulla, jotta paikalle voitiin rakentaa uusi palatsi vuoden 1900 maailmannäyttelyä varten. | purku: Palais de l'Industrien purku 1897 (palais-industrie-purku.jpg) | valokuva | Anonyymi, Musée Carnavalet / Paris Musées 1897, Wikimedia Commons (CC0), rajattu; Anonyymi valokuvaaja, Musée Carnavalet / Paris Musées; CC0; https://commons.wikimedia.org/wiki/File:D%C3%A9molition_du_palais_de_l'Industrie,_8%C3%A8me_arrondissement,_Paris._PH9891.jpg | haettu |
| 5 | Paikalle rakennettiin lasikattoinen Grand Palais. Rakennus suljettiin kunnostukseen vuonna 2021. Kesällä 2024 sen lasikaton alla miekkailtiin Pariisin olympialaisissa, ja kunnostuksen jälkeen rakennus avattiin yleisölle uudelleen vuonna 2025. | grandpalais: Grand Palais Champs-Élysées'n tuntumassa (palais-industrie-grandpalais.jpg) | valokuva | Guilhem Vellut, Wikimedia Commons (CC BY 2.0), rajattu; Guilhem Vellut; CC BY 2.0; https://commons.wikimedia.org/wiki/File:Grand_Palais_%40_Paris_(34729073762).jpg | pidetään |

Yhteensä: 3 pidetään, 1 haettu, 0 tilattu.

#### Perustelut

- 5 jaksoa, 4 kuvaa. Jakso 1: pääportin 1850-luvun valokuva (hallin nimi näkyy julkisivussa). Jaksot 2-3 yhdessä: loistoajan sisäkuva (lasikatto, rautarunko; havainnekuva). Jakso 4: aito purkukuva syyskuulta 1897 (uusi, CC0). Jakso 5: Grand Palais nykyään.
- Suunnitelman AITO-ehdotus (Carnavalet-purkukuvat 1896-1897) varmistui: PH9891 on CC0 ja riittävän suuri. Codex-tilausta ei tarvittu.
- Baldus ja Vellut haettu uudelleen alkuperäisinä isompina (3739 ja 5472 px leveinä).

#### Hylätty

- Flickr-kuva 'Palais de l'Industrie demolition Feb 1900' (L'Illustration-sivun skannaus, paperireuna ja kuvateksti) ja SGAP G.31864 (neljän kuvan kollaasi albumipahvilla): kehys ja teksti.
- Carnavalet P326 (maalaus, pimeä, kuvassa P.326-lappu).
- Arnout G.31604 (värilitografia paperireunalla ja tekstillä).
- Vanha purku-kuvauksen mukainen 'portti' jaksossa 4: portti on 1850-luvulta, ei purkuvaihe.

#### Visa

Kysymys: Missä lajissa kilpailtiin Grand Palais'n lasikaton alla kesän 2024 olympialaisissa? Vastaus: miekkailussa. Grand Palais -kuvassa ei ole miekkailua, olympiasymboleja eikä viittausta lajiin; kuvateksti kertoo vain sijainnin.

#### Avoimet kysymykset KK:lle

1. Jakson 3 (Berlioz'n päätösjuhla, tuhat esittäjää) ja jakson 2 galleria Seinen varrella eivät ole kuvissa; sisäkuva kattaa jakson 2 lasikaton ja rautarungon.
2. Portti-kuva on julkisivun lähikuva: sivusiivet ja huipun veistos häipyvät osin. Jos halutaan koko julkisivu, ei löytynyt vapaata isoa kokonaiskuvaa (Arnout-litografia on paperireunainen).
3. Loistokuva on havainnekuva (n. 1873), jakso kertoo 1855-hallista; kuva sopii rakenteeltaan.

### les-halles: kuvatyö (K-4 erä 1)

#### Kuvat

| Jakso | Kertoja sanoo | Kuva | Laji | Lähde, tekijä, lisenssi, linkki | Tila |
|---|---|---|---|---|---|
| 1-2 | Les Hallesin hallit olivat Pariisin ruokatori, jonka historia ulottuu 1100-luvulle. Kuningas Philippe Auguste rakennutti sinne 1183 ensimmäiset katetut hallit. Arkkitehti Victor Baltard suunnitteli ensin kivihallin, mutta Napoleon III halusi metallia. Siksi paikalle rakennettiin 1850-luvulta alkaen kymmenen paviljonkia raudasta ja lasista. Niissä myytiin vihanneksia, kalaa ja lihaa. | marville: Baltardin paviljongit Marvillen valokuvassa 1865–1866 (les-halles-marville.jpg) | valokuva | Charles Marville 1865–1866, Musée Carnavalet / Paris Musées, Wikimedia Commons (CC0), rajattu; Charles Marville, Musée Carnavalet / Paris Musées; CC0; https://commons.wikimedia.org/wiki/File:Les_Halles_Centrales,_nouvelles_Halles_de_Baltard,_1er_arrondissement,_Paris._PH10089.jpg | pidetään |
| 3 | Émile Zola kutsui halleja Pariisin vatsaksi samannimisessä romaanissaan, joka ilmestyi 1873. Vuonna 1969 tukkukauppa muutti Rungisiin, ja hallit jäivät tyhjiksi. | loisto: Les Halles loistoaikanaan 1873 (les-halles-loisto.jpg) | havainnekuva | Tekoälyllä tuotettu havainnekuva; Matkakirjan havainnekuva (1873). Faktat: paris.fr, Baltard ja Callet (1862), pavillonbaltard.fr, rajattu; Matkakirja (tekoälyllä tuotettu havainnekuva); Matkakirjan oma; https://media.matkakirja.app/kohtaamiset/ihmeet/ihme-les-halles-loistoaika.jpg | pidetään |
| 4 | Hallit purettiin 1970-luvun alussa, vaikka moni vastusti purkua. Jäljelle jäi niin suuri kuoppa, että sitä kutsuttiin Les Hallesin reiäksi. | purku: Hallien aluetta puretaan 1971 (les-halles-purku.jpg) | valokuva | Lukeroman, Wikimedia Commons (CC BY-SA 4.0), rajattu; Lukeroman; CC BY-SA 4.0; https://commons.wikimedia.org/wiki/File:Destruction_of_Les_Halles_1971.jpg | haettu |
| 5 | Yksi paviljonki purettiin osiin ja pystytettiin uudelleen Nogent-sur-Marneen. Hallien paikalle avattiin vuonna 1979 Forum des Halles -ostoskeskus. | nogent: Baltardin paviljonki nykyään (les-halles-nogent.jpg) | valokuva | Chabe01, Wikimedia Commons (CC BY-SA 4.0), rajattu; Chabe01; CC BY-SA 4.0; https://commons.wikimedia.org/wiki/File:Pavillon_Baltard_Nogent_Marne_1.jpg | pidetään |

Yhteensä: 3 pidetään, 1 haettu, 0 tilattu.

#### Perustelut

- 5 jaksoa, 4 kuvaa. Jaksot 1-2: Marvillen 1865-1866 valokuva Baltardin paviljongeista (uusi, isompi lataus ilman vanhaa reunaa). Jakso 3: 1873-havainnekuva (Zola, 1873). Jakso 4: purku 1971. Jakso 5: paviljonki nykyään.
- Kolme neljästä on nykyisiä kuvia, jotka läpäisevät säännöt; kaikki haettu uudelleen alkuperäisistä. Codex-tilausta ei tarvittu.
- Purku-kuva oli pystykuva (1280 x 1910), joka ei kelvannut sellaisenaan; alkuperäinen on 4537 x 6770, ja vaakarajaus pystykuvan keskeltä (jättipihti ja työmies) on riittävän suuri (3840 x 2560).
- Les Hallesin purkukuvan (1971) lisenssi tarkistettu rajapinnasta: CC BY-SA 4.0, tekijä Lukeroman, 'Self-published work'. Muita vapaita 1970-luvun purkukuvia ei löytynyt (haut: 'Les Halles demolition', 'démolition Halles de Baltard 1971', luokat 'Historical images of Les Halles', 'Demolitions in Paris').

#### Hylätty

- Vanha marville-rajaus (1280 x 890, haalistunut reuna).
- Muut Commons-luokan Historical images of Les Halles -kuvat: Marvillen ja Clément Mauricen kuvat ovat 1860-1890-lukua (ei purkuvaihe); Hoffbauerin 1849-kuva, jakso 1 ei tarvinnut.

#### Visa

Kysymys: Minne yksi hallien paviljonki pystytettiin uudelleen? Vastaus: Nogent-sur-Marneen. Kuvateksti jaksolle 5 ('Baltardin paviljonki nykyään') ei mainitse paikkaa; kuvassa ei ole tekstiä. Jakson 5 teksti itse kertoo vastauksen ennen visaa (tekstin asia, ei kuvan).

#### Avoimet kysymykset KK:lle

1. Jakso 1 (1183, Philippe Auguste) ja jakso 3:n Rungis 1969 eivät ole kuvissa; jakso 1 jaettu Marvillen kuvan kanssa.
2. Jakso 5 mainitsee myös Forum des Halles 1979 -ostoskeskuksen; kuva näyttää vain paviljongin. Forum-kuvaa ei etsitty (Forum rakennettiin ja uudistettiin, vapaa kuva Canopéesta mahdollinen).
3. Purkukuvan 'own work' 1971 -väite on vain Commonsin tieto; jos halutaan varmempi, ei ole vaihtoehtoa.
4. Loisto-kuvassa (havainnekuva) keskellä torimummon kasvot puolilähikuvana: sääntö 'ei kasvoja lähikuvana tekoälykuvassa' rajalla; päätettävä, pidetäänkö (suunnitelma sanoi pidettäväksi).

