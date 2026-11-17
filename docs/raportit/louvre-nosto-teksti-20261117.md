# Louvre + Mona Lisan varkaus 1911: nosto uudella tavalla (SK-apulainen 17.11.2026)

Pohja: suunnitelma 20261117-nostot-tarinoiksi.md luvut 1–6 ja 8; malli `docs/raportit/tuileries-koe-teksti-20261117.md`. Tehtävä: Pariisin nostojen erä 1, paikka 3 (Louvre-nähtävyys ja Mona Lisan varkaus yhden merkin alle). Tuileries'n palatsin tarinaa ei toisteta: se on oma nostonsa Louvren pihalla; tässä tarina on Mona Lisan varkaus ja sen käänne.

**Tila:** teksti kirjoitettu puhtaalta pöydältä (luokka C), faktat kahdesta itse avatusta lähteestä, `npm test` vihreä (5 935 läpi, 0 kaatunutta). Riippumatonta tarkistajaa ei ole käytetty; KK lukee ennen ääntä.

## 1. Tarina (data: `js/packs/fokuskohteet-fra.js`, id `louvre`)

**Otsikko** (35 merkkiä): Mona Lisa 1911 — taulu, joka katosi

| # | Osa / ääni | Teksti | Merkkejä | Kuva |
|---|---|---|---:|---|
| 0a | nimi / kertoja | Louvre. | 7 | – |
| 0b | esittely / kertoja | Isoisäsi kulki tästä ohi matkallaan. | 36 | – |
| 1 | koukku / isoisä | Pariisi, 1873. Kävelin tänään pitkin Louvren julkisivua ja yritin laskea ikkunat. Menetin laskun kolmesti. | 106 | julkisivu |
| 2 | tapahtuma | Lähes neljäkymmentä vuotta myöhemmin, maanantaina elokuussa, Louvre oli suljettu. Valkoiseen työtakkiin pukeutunut mies nosti Mona Lisan seinältä ja jätti kehyksen portaikkoon. Lukitun oven avasi hänelle putkimies, ja taulu lähti ulos. | 235 | varkaus; lisäkuva maalaus kohdassa "Mona Lisan" |
| 3 | tapahtuma | Kukaan ei huomannut mitään ennen seuraavaa päivää. Silloin maalari tuli kopioimaan taulua ja löysi tyhjän seinän. Poliisi pidätti runoilija Guillaume Apollinairen, ja Pablo Picasso joutui epäillyksi. Ihmiset jonottivat katsomaan tyhjää seinää. | 243 | tyhjä seinä |
| 4 | käänne | Varas oli Louvressa työskennellyt lasittaja Vincenzo Peruggia. Poliisi oli kuulustellut häntä ja uskonut hänen selityksensä. Taulu odotti laatikossa yli kaksi vuotta. Sitten hän tarjosi sitä firenzeläiselle taidekauppiaalle, joka hälytti poliisin. Peruggia väitti vieneensä sen takaisin Italiaan, vaikka Leonardo oli itse tuonut taulun Ranskaan. | 345 | peruggia |
| 5 | tänään | Mona Lisa palasi Louvreen, ja varkaus teki siitä entistä kuuluisamman. Nykyään se on Louvren ensimmäisessä kerroksessa. Sen edessä on jono, ja taulua vartioidaan tarkasti. | 171 | jono (nykyvalokuva) |

- Yhteensä 1 143 merkkiä (katto 1 200), noin 100 s. Puheessa kaksi tarkkaa vuotta (1873 isoisällä, 1911 otsikossa). Nimettyjä ihmisiä kolme (Apollinaire, Picasso, Peruggia). Pisin virke 13 sanaa. Alku (nimi + esittely) 43 merkkiä.
- **Vuosirivit (3):** 1911 taulu varastetaan (jakso 2, kohta "elokuussa") · 1913 varas jää kiinni (jakso 4, kohta "Sitten hän tarjosi") · 1914 taulu palaa Louvreen (jakso 5, kohta "palasi Louvreen"). Vuosi 1913 ja 1914 ovat vain ruudulla, jaksot kertovat tapahtumat.
- **Isoisän lause** on fiktiota (oma kokemus): ainoa väite on, että Louvren julkisivu on pitkä ja siinä on paljon ikkunoita. Ei keksittyä kuukautta. Esittely "kulki tästä ohi" tukeutuu päiväkirjakaanoniin (takyt-pariisi täky 8: isoisä käveli Louvren ohi 1873).
- **Kysymys (yksi, säilyy skandaalin visasta):** Missä kaupungissa Mona Lisa löytyi yli kaksi vuotta varkauden jälkeen? · Milanossa · **Firenzessä** · Roomassa. Vastaus on jaksossa 4; kuvateksteissä ja vuosiriveissä sitä ei ole (testi vartioi).
- **Pulun kysymykset (3, vastauksia ei kirjoitettu):** Miten Mona Lisa pääsi ulos Louvresta kenenkään huomaamatta? · Miksi Mona Lisa palasi Louvreen kuuluisampana kuin lähti? · Miksi Peruggia luuli Mona Lisan kuuluvan Italialle? (kaksi ensimmäistä ovat skandaalin entiset, kolmas uusi).

## 2. Lähdetaulukko (avattu 17.11.2026; Wikipedia ei ole lähde)

Lähteet: **S1** Musée du Louvre, "From the Mona Lisa to The Wedding Feast at Cana" (louvre.fr/en/explore/the-palace/from-the-mona-lisa-to-the-wedding-feast-at-cana) · **S2** Sortiraparis 20.10.2025 (sortiraparis.com/en/what-to-visit-in-paris/history-heritage/articles/257946-…) · **S3** Europeana, "Did Picasso steal the Mona Lisa?" 19.12.2022 (europeana.eu/en/blog/did-picasso-steal-the-mona-lisa) · **S4** CrimeReads 12.1.2021 (crimereads.com/the-mona-lisa-wasnt-really-that-famous-until-it-was-stolen-in-1911/) · **S5** Washington Post / Spokesman-Review 20.10.2019 (spokesman.com/stories/2019/oct/20/how-the-1911-theft-of-the-mona-lisa-made-it-the-wo…) · **S6** The Art Bog (theartbog.com/?p=29905).

| # | Väite | Lähteet | Tila |
|---|---|---|---|
| 1 | Varkaus maanantaina 21.8.; museo suljettu maanantaisin | S3, S4, S5 | OK |
| 2 | Valkoinen työtakki | S2, S4, S5, S6 | OK |
| 3 | Kehys (ja lasikotelo) jäi portaikkoon | S2, S4, S5 | OK |
| 4 | Putkimies avasi lukitun oven | S4, S5 (S6 "some accounts") | OK |
| 5 | Ei huomattu ennen seuraavaa päivää; maalari tuli kopioimaan/piirtämään ja löysi tyhjän seinän | S2, S3, S4, S5 | OK |
| 6 | Apollinaire pidätettiin; Picasso epäiltiin | S2, S3, S4, S5, S6 | OK (ei kestoa: lähteet 4–7 vrk) |
| 7 | Ihmiset kävivät katsomassa tyhjää seinää | S4, S5 | OK |
| 8 | Varas Peruggia, italialainen, Louvressa työskennellyt lasittaja | S1, S2, S3, S4, S5, S6 | OK |
| 9 | Poliisi oli kuulustellut häntä ja uskoi selityksen | S2, S5 | OK |
| 10 | Taulu laatikossa yli kaksi vuotta | S1 (yli kaksi vuotta kadoksissa), S4, S5, S6 (laatikko) | OK; paikkaa ei sanota (S6 väittää hänen lähteneen Pariisista 1911, S2 ja S4 pitävät taulua Pariisin asunnossa) |
| 11 | Tarjosi firenzeläiselle taidekauppiaalle, joka hälytti poliisin | S1 (italialainen kauppias hälytti viranomaiset), S2, S3, S6 | OK |
| 12 | Peruggia väitti vieneensä taulun takaisin Italiaan (isänmaallisuus) | S2, S5, S6 | OK |
| 13 | Leonardo itse toi taulun Ranskaan, kuningas sai sen häneltä | S1, S5, S6 | OK; vuosia (1516 / 1518) ei sanota, lähteet eroavat |
| 14 | Taulu palasi Louvreen 1914; varkaus teki siitä kuuluisamman | S1 (kuuluisuus), S2 (4.1.1914), S6 (tammikuu 1914), S5 | OK |
| 15 | Nykyään ensimmäisessä kerroksessa (Denon-siipi), jono, tarkka vartiointi | S1, S2, S3 | OK |
| 16 | Vuosi 1913 (jää kiinni) | S2 (10.12.), S6 (11.12.), S3 ("marraskuu"); päivä ei sanota | OK vuosi |

**Jätetty pois (yksi lähde tai ei palvele juonta):** Louvre suljettiin viikoksi (S4, S6 tukevat, mutta S6 on heikko; ei puheessa) · 28 tuntia / 26 tuntia ennen huomaamista (lähteet eroavat) · sormenjälki ja Bertillon · palkkio 25 000 / 40 000 frangia (lähteet eroavat) · tuomio vuosi ja 15 päivää, lyhennetty seitsemään kuukauteen · Kafka katsomassa tyhjää seinää · komeroon piiloutuminen vs. aamulla sisään (lähteet eroavat) · "ei mahtunut työtakin alle" (vanhan kortin väite, S2 ja S5 sanovat päinvastaista; ei puheessa) · Louvren historia (linnoitus, 1793, pyramidi 1989): vanhan nähtävyyskortin faktat jäivät pois, koska tarina ei tarvitse niitä · Salle des États ja lasikotelo (S1 yksin).

**Avoimet lähdekohdat:** ei yhtään väitettä, jolla olisi vain yksi lähde. Heikoimmat: S6 (Art Bog) tukee riviä 13 S5:n ja S1:n rinnalla; rivi 4 nojaa S4:ään ja S5:een.

## 3. Kuvat (6; kaikki jo olemassa, ei uusia generoituja; lisenssit luettu Commonsista 17.11.2026)

| Avain | Jakso | Kuva | Laji | Lähde ja lisenssi | Kuvateksti |
|---|---|---|---|---|---|
| julkisivu | 1 | `Paris 1er Louvre Colonnade 559.jpg` (jo nähtävyyskortissa) | valokuva | GFreihalter, CC BY-SA 4.0 | Louvren itäjulkisivu |
| varkaus | 2 | ämpäri `kohtaamiset/kuvajono/skandaali-mona-lisan-varkaus-1911-photo-v1.jpg` (jo pelissä) | havainnekuva | Matkakirjan havainnekuva, lähderivi muotoiltu "Tekoälyllä tuotettu havainnekuva." | Peruggia kantaa taulun ulos Louvresta |
| monalisa | 2, kohta "Mona Lisan" | `Leonardo da Vinci - Mona Lisa (Louvre, Paris).jpg` | maalaus | Leonardo da Vinci, public domain | Leonardo da Vincin Mona Lisa |
| tyhja-seina | 3 | `Mona Lisa stolen-1911.jpg` (Salon Carrén tyhjä paikka, neljä rautatappia) | valokuva | tuntematon kuvaaja 1911, public domain | Tyhjä seinä Louvressa, elokuu 1911 |
| peruggia | 4 | `Vincenzo Perugia.jpg` (Pariisin poliisin kortti 25.1.1909) | valokuva | tuntematon tekijä, public domain | Vincenzo Peruggian poliisikortti |
| jono | 5 | `Crowd in front of the Mona Lisa 1.jpg` | valokuva (nykyvalokuva) | Amaury Laporte, CC BY 2.0 | Jono Mona Lisan edessä Louvressa |

Kaikki Commons-kuvat tulevat peliin nykyisellä `tiedosto`-reitillä (Commons-osoite); ämpärikopioita ei ole tehty. **Puuttuvia kuvia ei ole.** Huomiot KK:lle: (a) `Vincenzo Perugia.jpg`:n tiedostossa on skannauksen Corbis-tekijänoikeusmerkintä (2002), vaikka Commons merkitsee kuvan public domainiksi; varakuva `Vincenzo peruggia.jpg` (PD, tuntematon). (b) `Mona Lisa stolen-1911.jpg`:n Exif mainitsee The Scotsman -lehden; Commons: public domain. Tekijätarkistus `node tools/tarkista-tekijat.mjs` ei ole ajettu (verkko-ohjelma); aja ennen julkaisua.

## 4. Ääntämislista ja puheteksti

Äänittäjälle: **Apollinaire** (Guillaume Apollinairen), **Picasso**, **Peruggia** (Vincenzo Peruggia), **Louvre/Louvren/Louvressa/Louvreen**, **Leonardo**. Äänitysjonoon lisätty 6 riviä (`node tools/aanitysjono/tarkista.mjs --lisaa`; rivejä ei ajettu). `aanikansio` ja jaksojen `aanite` lisätään dataan, kun Äänittäjä on äänittänyt; siihen asti jaksot kuuluvat suoratoistona.

## 5. Yhdistäminen yhdeksi merkiksi

| Mikä | Toimi |
|---|---|
| Kartan piste `Louvre` (maakartat.js, kaupunki pariisi) | `nosto: 'skandaali-mona-lisan-varkaus-1911'` → `nosto: 'louvre'` (1 rivi + kommentti) |
| Skandaali `mona-lisan-varkaus-1911` (skandaalit.js, FRA) | poistettu; FRA:ssa jäi 2 skandaalia (kiintiö 2–3 pitää) |
| Nähtävyysjuttu `Louvre` (nahtavyysjutut.js, pariisi) | poistettu (34 riviä); pyramidi- ja 1793-faktat jäivät pois, kuten Tuileries'n kopio |
| Testi `skandaalit.test.mjs` | skandaalien määrä 254 → 253 (yksi rivi) |

**Mitä jäi:** Pulun vanhat vastausavaimet `skandaali:mona-lisan-varkaus-1911` (`pulu-esigenerointi/SKANDAALIT/…`) ja `tests/fixtures/noston-vuodet-puuttuvat.txt`-rivi: eivät kaadu, mutta osoittavat nyt poistettuun tunnukseen; uusi kohde `louvre` tarvitsee omat Pulun vastaukset (kolme kysymystä, vastauksia ei kirjoitettu tässä). Kuvatiedosto ämpärissä säilyy. Louvren miniatyyripiirros (`miniatyyrit.js`) ja kohdekartan sijaintirivi säilyvät.

**Maakartat.js:ssä kosketetut rivit:** vain Louvre-pisteen `nosto`-rivi (PR 7088 on jo mainissa ja pohja on origin/main).

## 6. Rajoitus: muoto vaatii fokuskohteen

`jaksot` luetaan vain fokus-, maasto- ja hahmotelmakohteista (testi ja natiivi). Louvrella ei ollut kohdetta, joten sille luotiin uusi fokuskohde `louvre` (`fokuskohteet-fra.js`, laudat laskettu `johda-maastokohteet.mjs`-funktiolla ja validoitu Tuileries'n riviin). Samalla tavalla tehtynä nähtävyys, jolla ei ole kohdetta, toimii datan ja testien tasolla; **laitteella en ole ajanut sitä**: en tiedä, miten natiivi piirtää uuden kohteen pääkartalla (kaupungin kohdalla oleva kohde karsiutuu kohdekartalle `karsiKaupunkikartanNostot`-säännöllä) ja avautuuko nosto jaksoesityksenä. NUI:n ruutukatsaus tarvitaan ennen kuin KK päättää muiden nähtävyyksien (Eiffel, Trevi, St Paul) samasta tavasta.
