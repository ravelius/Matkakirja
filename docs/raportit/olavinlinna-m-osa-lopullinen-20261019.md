# Olavinlinna: M-osan tekstit lopulliseksi (Sisältökirjuri 19.10.2026)

Tilaus: Päätoimittaja 19.10. (valmiiksi-lista rivi 26). **Vain tekstit, ääniä ei generoida** ennen omistajan lupaa. Lähteet: `ehdotus-olavinlinna-seikkailu.md`, `pelattavuusmalli-olavinlinna.md` (3.6, 4, 5), `olavinlinna-repliikit-puuttuvat-20261009.md`, `olavinlinna-tietokerros-kortit.md` + `-lahdetarkistus.md`, proto `Tekstit/olavinlinna.fi.json` ja `PuuttuvatAanetTestit`/`MVihjeet.cs`. Valmis avainpaketti: `docs/raportit/olavinlinna-m-osa-avaimet-20261019.json`.

## 1. Löydös ja yhteenveto

- **M-osan repliikkipooli on tekstinä valmis: 26 kpl** (16 uutta muurikäytävän/kellon/tyrmän repliikkiä, jotka hyväksyttiin jo 9.10., + 10 jo taulussa olevaa M-osan repliikkiä, joista 2 on voudin valinnaista). Pelattavuusmallin arvio "~30 + 2" syntyi ennen tarkennusta; kaikille mallin 3.6 ja 4.1 vaiheille on repliikki. Lisäksi **4 valinnaista varalla** (toiston välttämiseen), yhteensä enintään 30.
- **16 uutta repliikkiä puuttuu vielä Tekstit/olavinlinna.fi.json-taulusta** (koodi tuntee vain äänitunnisteet). Ne ovat avainpaketissa muodossa `olavinlinna.repliikki.<id>`; Projektiseppä/Pelikoodari liittää ne tauluun, jotta käännettävyys toimii.
- **Kortit 7–12 ovat lopullisia** (kortit 7, 10 ja 12 päivitetty; 8, 9 ja 11 ennallaan; ks. kohta 3). **Vihjetekstit** on kirjoitettu huoneille 2–10 × 3 tasoa (kohta 4).

## 2. M-osan repliikit (lopullinen lista)

### 2.1 Uudet 16 (ääntä ei ole; vaatii omistajan luvan; hyväksytty tekstinä 9.10.)

| id | huone ja tilanne | teksti | merkkiä |
|---|---|---|---|
| `muuri-vartija-rauha-1` | 7 muurikäytävä, vaihe 0 Rauha | Kylmä yö. Aamuun on vielä pitkä. | 32 |
| `muuri-vartija-rauha-2` | 7, vaihe 0 Rauha (odotus) | Kaikki hiljaista, kuten aina. | 29 |
| `muuri-vartija-epaily-1` | 7, vaihe 1 Epäily | Mitä tuo oli? Kuuluiko tuolta jotain? | 37 |
| `muuri-vartija-epaily-2` | 7, vaihe 1 Epäily (vaihtoehto) | Hetkinen… liikkuiko tuolla joku? | 32 |
| `muuri-vartija-etsinta-1` | 7, vaihe 2 Tutkii | Käyn katsomassa tuon aukon. | 27 |
| `muuri-vartija-etsinta-2` | 7, vaihe 3 Etsii | Tulehan esiin. Ei täällä ole minne piiloutua. | 45 |
| `muuri-vartija-halytys-1` | 7–8, vaihe 4 Hälytys | Kello soimaan! Linnassa on tunkeilija! | 38 |
| `muuri-vartija-halytys-2` | 7, vaihe 4 (jahti) | Täällä hän on! Pysäytä hänet! | 29 |
| `muuri-vartija-kiinni-1` | 7, vaihe 5 Kiinniotto | Seis! Muurilla ei kuljeta öisin. | 32 |
| `muuri-vartija-paluu-1` | 7, paluu rauhaan | Tuulta vain. Tämä vanha muuri valittaa. | 39 |
| `muuri-vartija-paluu-2` | 7, paluu rauhaan (vaihtoehto) | Taas ne varikset. Takaisin kierrokselle. | 40 |
| `kello-vartija-halytys-1` | 10 pako, hälytyskello | Kello soi! Kaikki ylös muureille! | 33 |
| `tyrma-vartija-vienti-1` | tyrmä, kiinniotto | Tuossa on oljet. Täällä on aikaa miettiä. | 41 |
| `tyrma-vesipoika-1` | tyrmä, pako 2 (vesipojan ovi) | Vettä sinulle. Ovi taisi jäädä auki. | 36 |
| `tyrma-vartija-kolina-1` | tyrmä, pako 2–3 (kova ääni) | Mitä siellä taas kolisee… | 25 |
| `tyrma-vartija-rotat-1` | tyrmä, pako 2 (torkkuva vartija) | Rottia vain. Kellari on täynnä niitä. | 37 |

Yhteensä 552 merkkiä. Jokainen alle 45 merkkiä (ääni 1,5–3 s).

### 2.2 Jo taulussa olevat M-osan repliikit (teksti ennallaan)

| id | huone ja tilanne | teksti | merkkiä |
|---|---|---|---|
| `apulainen-kuka-1` | 6 Linnantupa, apulainen tunnistaa Foggin | Kuka sinä olet? | 15 |
| `apulainen-kuka-2` | 6, sama (vaihtoehto) | Kenen väkeä olet? | 17 |
| `apulainen-kuka-3` | 6, sama (vaihtoehto) | En tunne sinua. | 15 |
| `soutaja-pako-v2-1` | 10 pako, soutaja | Tänne! Äkkiä, veneeseen! | 24 |
| `soutaja-pako-v2-2` | 10 pako, soutaja (kun arkku löytyi) | Löysit sen! Soudetaan, ennen kuin he huomaavat. | 47 |
| `vartija-kello-1` | 10 pako, vartija kellolla | Kello soimaan! Varas! | 21 |
| `vartija-kiipeilija-1` | 8 ulkoseinä, vartija näkee kiipeilijän | Tuolla valossa! Kiinni! | 23 |
| `vartija-kurkistus-1` | 8 ulkoseinä, vartija kuulee putoavan tiilen | Mikä siellä putoilee? | 21 |
| `vouti-epaily-1` | 5 kappeli, voudin valinnainen (kappalaiselle) | Isä? Vieläkö valvotte? | 22 |
| `vouti-ote-1` | 5 kappeli, voudin valinnainen (kiinniotto) | Kas, varas kappelissa! | 22 |

Äänen tila (valmis / puuttuu) on Pelikoodarin manifestien asia (`repliikit-v4`: 13 M-osan repliikkiä on arvioitu jo tehdyksi); tässä vain teksti.

### 2.3 Valinnaiset varalla (UUSI ehdotus, ei pakollinen)

Perustelu: vaiheissa 0–1 on vain kaksi vaihtoehtoa, ja sama repliikki ei saa toistua peräkkäin (3.6); kolmas poistaa toiston pitkissä jumeissa.

| id | huone ja tilanne | teksti | merkkiä |
|---|---|---|---|
| `muuri-vartija-rauha-3` | 7, vaihe 0 Rauha (kolmas, toiston välttö) | Sumu nousee järveltä. Pian sarastaa. | 36 |
| `muuri-vartija-epaily-3` | 7, vaihe 1 Epäily (kolmas) | Oliko tuo askel… vai tuulta? | 28 |
| `kello-vartija-halytys-2` | 10 pako, hälytyskello (toinen) | Hälytys! Kaikki muurille, miehet! | 33 |
| `tyrma-vartija-vienti-2` | tyrmä, kiinniotto (toinen) | Kylmä paikka. Aamulla vouti päättää. | 36 |

**Ei uusia repliikkejä** kirjurille, talonpojalle, voudille/aitan hoitajalle (kiista) eikä Linnantuvan noppapelille: ne ovat valmiita monipuhujaottoja (valmiit äänet).

**Sävytarkistus:** ei väkivaltaa, ei anakronismeja ("kello" = hälytyskello; lyhty, keihäs, oljet), ei viittauksia Foggiin, isoisään tai nimettyihin henkilöihin, sukupuolineutraali, vartijat ihmisiä työssään.

## 3. Tietokerroksen kortit 7–12 (lopulliset)

Numerointi `olavinlinna-tietokerros-kortit.md`:n mukaan (7–11 koko linnan kortit, 12 "Mikä oli keksittyä?"). Avaimet ovat ennallaan (`olavinlinna.tietokortti.<id>.teksti`); päivitettävät: **perustaminen-ja-tott (7), vaakunalaatat-ja-komerot (10), mika-oli-keksittya (12)**.

| # | id | muutos ja syy | sanoja |
|---|---|---|---|
| 7 | `perustaminen-ja-tott` | valmistumisvirke korjattu: vanha "esilinna … 1400-luvun loppuun mennessä" oli sisäisesti ristiriitainen (1480-luku on 1400-lukua); nyt päälinna 1480-luvulla ja rakentaminen jatkui 1490-luvulle (Kyppi, en.wikipedia) | 49 |
| 8 | `hyokkays-1495` | ei muutosta (V: Savon historia, fi/en.wikipedia) | 44 |
| 9 | `vuosi-1499-ja-bielke` | ei muutosta (Gunilla Bese V; Bielken käskynhaltijuus 1499 ja elokuun 1499 rajapyykit 1L, en.wikipedia — merkitty varmuudessa) | 56 |
| 10 | `vaakunalaatat-ja-komerot` | "Erään tutkimuksen mukaan" poistettu: komerot vahvistettiin Härö 1997 -lähteestä 7.10. (lähdetarkistus T1/T2); lisätty "Komeron tarkoitusta ei tiedetä"; "amfiboliittiliuske" → "liuske" (kuuntelijalle selkeämpi) | 57 |
| 11 | `aarnivalkea-kansanuskossa` | ei muutosta (V: Yle, fi.wikipedia); viimeinen virke on pelin oma kytkentä | 47 |
| 12 | `mika-oli-keksittya` | lisätty M-osan tulkinnat: voudin sali ja muurinharjan puolustuskäytävä (ehdotuksen FIKTIO/TULKINTA-lista); komerot pidetään totena (T1 vahvistettu) | 65 |

**7. perustaminen-ja-tott**

Linnan perusti vuonna 1475 tanskalaissyntyinen ritari Erik Akselinpoika Tott. Hän oli Viipurin linnan käskynhaltija ja vastasi itärajasta. Linnan nimi oli Pyhän Olavin linna. Hänen puolisonsa Elin Kustaantytär oli Sturen sukua. Tott kuoli vuonna 1481, ja hänen veljensä Lauri jatkoi Viipurissa. Kolmitorninen päälinna valmistui 1480-luvulla, ja rakentaminen jatkui vielä 1490-luvulle.

**8. hyokkays-1495**

Sota Ruotsin ja Moskovan suuriruhtinaskunnan välillä toi hyökkääjät linnalle vuonna 1495. Linnan voutina oli Pietari Kylliäinen. Hän puolusti linnaa linnaväen ja talonpoikaisen nostoväen turvin. Hyökkäys torjuttiin ilman suuria tappioita. Vuonna 1496 linnaa piiritettiin uudelleen, mutta se kesti. Kylliäinen teki myös oman vastahyökkäyksensä rajan taakse.

**9. vuosi-1499-ja-bielke**

Kesällä 1499 linnalla oli uusi herra. Erik Turesson Bielke sai Viipurin ja Olavinlinnan käskynhaltijuuden ja vastasi koko itärajasta. Syksyllä 1499 venäläiset katkaisivat välirauhan ja hyökkäsivät linnan edustalle, ja seuraavana vuonna he yrittivät asettaa rajapyykkejä niin, että linna jäisi Venäjän puolelle. Bielken puoliso oli Gunilla Bese. Miehensä kuoltua vuonna 1511 hän hoiti Viipurin linnaa itse kaksi vuotta.

**10. vaakunalaatat-ja-komerot**

Linnan muureissa on poikkeuksellisen paljon vaakunalaattoja, kolmetoista, joista kolmessa vaakuna vielä erottuu. Ne veistettiin paikallisesta liuskeesta linnan työmaalla noin 1475–1483, ja kaikki tunnistetut laatat liittyvät Tottin sukuun. Kirkkotornin ulkomuurissa on Tottin vaakuna ja Kellotornissa Tottin ja Sturen liittovaakuna. Kummassakin tornissa on kahden laatan välissä komero, joka oli muurattu umpeen tiilillä. Tiilet poistettiin restauroinnissa. Komeron tarkoitusta ei tiedetä.

**11. aarnivalkea-kansanuskossa**

Aarnivalkea on kansanuskon liekki, joka paloi vanhan aarteen kätköpaikan päällä. Valoja uskottiin näkyvän erityisesti juhannusyönä. Aarteen kätköä, aarnihautaa, saattoivat vartioida henget tai eläimet. Juhannusyönä kukkivan sananjalan siemen teki etsijän näkymättömäksi aarteen vartijoille. Oikeasti sananjalka ei kuki lainkaan, koska se lisääntyy itiöillä. Aarnin luettelon nimikään ei ole sattumaa.

**12. mika-oli-keksittya**

Keksittyä oli paljon. Kappelin kalkin ja linnan hopean kätkeminen vuonna 1495 on fiktiota. Samoin keksittyjä ovat liuskekiven kuva, arkun kilpilukko, uuden herran inventaario ja voudin etsintä. Soutajan näkemä aarnivalkea, tarjotin, tyrmä kellarissa, kiipeilyreitti ja köysi ovat pelin keksintöjä, samoin voudin sali ja muurinharjan puolustuskäytävä. Pelin vouti on nimetön keksitty hahmo. Totta ovat vaakunalaatat, niiden väliset komerot ja kappeli. Fogg ja Pulu eivät tietenkään olleet paikalla.

Varmuudet säilyvät `olavinlinna-tietokerros-kortit.md`:ssä; 1L-kohdat: päälinnan valmistuminen (7), Bielken käskynhaltijuus ja rajapyykit (9). Kaikki kortit 42–75 sanaa; alkavat suomen sanalla (kertojan luettavissa).

## 4. Vihjetekstit (☰ › Vihje)

Vain valikkoon: pelinäkymässä ei tekstiä (Pulu vihjaa eleillä; omistajan linja 7.10.). Kolme tasoa kuten pelattavuusmalli 5: **1 Katse** (suunta), **2 Lento** (tekeminen), **3 Näyttö** (selkeä teko). Tason 3 kohteet vastaavat `MVihjeet.cs`:n merkkejä. Huone 1 (veneyö): ei vihjeitä (ei ohjausta). Vihje ei koskaan paljasta historiaa. Avaimet `olavinlinna.vihje.<huone>.<taso>`.

| huone | taso 1 Katse | taso 2 Lento | taso 3 Näyttö |
|---|---|---|---|
| 2 Laituri ja portti | Portinvartija ja soutaja riitelevät. Vartija ei katso sivulle. | Hiivi säkkien ja tynnyrien varjossa portille. | Piiloudu tynnyrin taakse ja livahda portista, kun vartija kääntää selkänsä. |
| 3 Pikkupiha ja keittiö | Keittiössä kaikki katsovat patoja ja pöytää, ei ovea. | Heitä nauris riippuviin patoihin, niin kokki ja apulainen kääntyvät. | Kun kokki on kääntynyt, ota tarjotin pöydältä ja vie se Kirkkotornin vartijalle. |
| 4 Kirkkotorni ja portaat | Tornin oven vartija odottaa evästä. | Vie tarjotin vartijalle. Leipä ja olut riittävät hänelle. | Anna tarjotin vartijalle ja nouse portaita. Jos joku tulee vastaan, astu komeroon. |
| 5 Kappeli | Pimeässä vain oma kynttilä näyttää alttariseinän kilvet. | Katso kilpiä. Liekki kallistuu kohti yhtä kohtaa. | Koputa kilpien alta: kivi kuulostaa ontolta. Irrota kivet veitsellä. |
| 6 Linnantupa ja voudin sali | Palvelija kulkee linnassa huomaamatta. Tarvitset esiliinan ja myssyn. | Ota esiliina naulakosta ja keittokulho. Vie kulho voudin pöytään. | Kun vouti kääntyy kiistelemään, ota Kellotornin avain pöydältä. |
| 7 Muurikäytävä | Muurikäytävää partioi vartija. Valo kasvaa seinällä ennen häntä. | Odota komerossa, kunnes vartija on ohi. Mene sitten ovesta. | Kulje aukkojen välisessä varjossa harjalle vievien tikkaiden luo. |
| 8 Muurinharja ja ulkoseinä | Ulkoseinällä tuulee. Reunat ja rautakrampit näyttävät reitin. | Ota köysikieppi ja kiinnitä se sakaraan. Kiipeä otteesta toiseen. | Pysähdy kiinni seinään, kun lyhty kulkee yläpuolella. Jatka komeron kynnykselle. |
| 9 Komero | Komeron tiilet ovat irrallaan. Ensimmäinen putoaa järveen. | Katso laukun liuskekiveä: kaksi kilpeä kallistuu toisiaan kohti. | Käännä arkun kannen kilvet samaan asentoon kuin kivessä. Kansi aukeaa. |
| 10 Pako | Kello soi ja soihdut liikkuvat muureilla. Aikaa on vähän. | Kiinnitä köysi kramppiin ja laskeudu kalliota pitkin veteen. | Laskeudu rantaan ja juokse veneelle. Soutaja odottaa. |

**Huomio huoneelle 7:** teksti seuraa omistajan hyväksymää reittikorjausta (pelattavuusmalli 13.6: Kellotornin kierreportaat → muurikäytävä; pako köysilaskuna kalliolle). Huoneessa 5 vihje ei kerro, että kappalaisen paluussa pitäisi piiloutua: Pulu ei vihjaa vaarassa (malli 5).

## 5. Kytkennät Projektisepälle (Pelikoodarin ja Projektisepän päätettävä)

1. **Tekstitaulu:** liitä avainpaketin `avaimet` proto-repon `Assets/Matkakirja/Linssit/Resources/Tekstit/olavinlinna.fi.json`-tauluun. Uudet ryhmät: `olavinlinna.repliikki.*` (+20), `olavinlinna.vihje.*` (+27). Kortit 7–12: vain tekstit vaihtuvat. Testi `TauluKattaaDatanTekstit` (repliikit ≥ 40, tietokortit ≥ 30) pysyy vihreänä.
2. **Vihjeet:** `MVihjeet.cs` palauttaa jo huoneen ja tason 3 kohteen; ☰ › Vihje -valikko hakee tekstin avaimella `olavinlinna.vihje.<Huone>.<Taso>` (Huone 2–10; taso = nykyinen vihjetaso 1–3). Huoneet 2–5 tulevat `LaituriVihje.cs`/pystyleikkeen vihjeistä; sama avainmuoto.
3. **Repliikit:** äänitunnisteet eivät muutu; teksti taulusta avaimella `olavinlinna.repliikki.<id>` (käännettävyys, kuten PT 9.10.). Valinnaiset 4 vaativat koodikytkennän vasta jos otetaan käyttöön.
4. **Generointi:** 16 uutta + valinnaiset vasta omistajan luvalla; määrä luvalle: 16 (+4) repliikkiä, yhteensä noin 685 merkkiä.
