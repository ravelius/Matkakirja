# Euroopan aarrepelit — inventaario ja arvio

**Päiväys:** 4.9.2026 · **Tekijä:** Opus (sisältökatselmus) · **Tilaus:** omistaja,
sanatarkasti *"Mieti samalla onko Euroopan aarre pelit riittävän hyvät ja vaihtelevat"*.

Kohde: kaikki Euroopan laudan tehtävät, joilla pelaaja avaa aarteen tai etenee.
Lähteet: Raamatun osiot Perustuslaki, Fokusmoodi, Aarteet ja eteneminen, Tutki
kätkö -pelit; koodi `js/game.js`, `js/fokusvirta.js`, `js/fokustehtavat.js`,
`js/visa.js`; data `js/packs/fokusvirta-*.js` (39 kpl), `tarinakaari.js`,
`europe-questions.js`, `europe-kulttuuri.js`, `europe-puzzles.js`,
`kulttuuri-kategoriat.js`. Luvut on laskettu koodista, ei silmämääräisesti.

---

## 1. Yhteenveto yhdellä silmäyksellä

Euroopassa on **45 kaupunkia**, joista 39:llä on täysi fokusvirta. Niissä on
yhteensä **357 käsin kirjoitettua tehtävää** (+ 215 kysymyksen laattapankki).
Sisällön määrä ja tekstin laatu ovat hyvät. **Mekaniikkojen määrä ei ole.**

| Pelityyppi | Vuorovaikutus | Kpl Euroopassa | Missä |
|---|---|---|---|
| Täkyvisa (fokusvirta) | monivalinta, 3 vaiht. | 118 | 39 kaupunkia, 3 kpl/kaupunki |
| AARTEEN AVAUS (lehtitehtävä) | monivalinta, 3 vaiht. | 38 | lehden sivu 2 |
| JULISTE (lehtitehtävä) | monivalinta, 3 vaiht. | 39 | lehden sivu 3 |
| Kulttuurivisa | monivalinta, 4 vaiht. | 43 | saapumiskortti / lehti |
| Lehden aihesivun minitehtävä | monivalinta, 3–4 vaiht. | 70 | kulttuuri-kategoriat |
| Kohtaamisen aarrekysymys (kaari) | monivalinta, 4 vaiht. + tiimalasi | 41 | laatta / vihreä piste |
| Laattavisan kysymyspankki | monivalinta, 4 vaiht. | 215 (43 × 5) | varalla, ks. §6 |
| **Isoisän piirrospulma** | SVG-luonnos + laskeminen | **6** | rooma, ateena, dubrovnik, venetsia, pariisi, islanti |
| **Pöllön sähketehtävä** | hakemistovalinta + vuosiluku + vapaa teksti | **2** | tukholma, sofia |

**Erillisiä vuorovaikutusmekaniikkoja on kolme (3):** monivalinta, piirrospulma,
sähketehtävä. Monivalinnan osuus on **349 / 357 = 97,8 %** kaikista tehtävistä.
Pakollisella aarrepolulla (yksi täky → AARTEEN AVAUS → kohtaaminen) mekaniikka on
**100 % monivalinta** kaikissa 39 kaupungissa — sähkekaupunkeja lukuun ottamatta.

---

## 2. Jakauma maittain

Sarakkeet: täkyvisa · aarteen avaus · juliste · kulttuurivisa · lehden minitehtävä ·
kohtaaminen · sähke · piirrospulma · yhteensä.

| Maa | Kaupungit | Täky | Aarre | Jul | Kult | Mini | Kohta | Sähke | Pulma | Yht |
|---|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|
| AUT | wien | 3 | 1 | 1 | 1 | 3 | 1 | 0 | 0 | 10 |
| BGR | sofia | 4 | 1 | 1 | 1 | 3 | 1 | **1** | 0 | 12 |
| BIH | sarajevo | 3 | 1 | 1 | 1 | 1 | 1 | 0 | 0 | 8 |
| CHE | alpit | 0 | 0 | 0 | 1 | 1 | 1 | 0 | 0 | **3** |
| CZE | praha | 3 | 1 | 1 | 1 | 2 | 1 | 0 | 0 | 9 |
| DEU | berliini | 3 | 1 | 1 | 1 | 2 | 1 | 0 | 0 | 9 |
| DNK | kobenhavn | 3 | 1 | 1 | 1 | 2 | 1 | 0 | 0 | 9 |
| ESP | barcelona, madrid, sevilla, granada | 12 | 4 | 4 | 3 | 9 | 3 | 0 | 0 | 35 |
| EST | tallinna | 3 | 1 | 1 | 1 | 1 | 1 | 0 | 0 | 8 |
| FIN | helsinki, lappi, tampere | 6 | 2 | 2 | 3 | 3 | 2 | 0 | 0 | 18 |
| FRA | pariisi, marseille | 6 | 2 | 2 | 2 | 3 | 2 | 0 | **1** | 18 |
| GBR | edinburgh, lontoo | 6 | 2 | 2 | 2 | 3 | 2 | 0 | 0 | 17 |
| GRC | ateena, kreeta | 3 | 1 | 1 | 2 | 3 | 2 | 0 | **1** | 13 |
| HRV | dubrovnik | 3 | 1 | 1 | 1 | 1 | 1 | 0 | **1** | 9 |
| HUN | budapest | 3 | 1 | 1 | 1 | 1 | 1 | 0 | 0 | 8 |
| IRL | dublin | 3 | 1 | 1 | 1 | 2 | 1 | 0 | 0 | 9 |
| ISL | islanti | 0 | 0 | 0 | 1 | 1 | 1 | 0 | **1** | **4** |
| ITA | firenze, rooma, sisilia, venetsia | 9 | 3 | 3 | 4 | 7 | 3 | 0 | **2** | 31 |
| LTU | vilna | 3 | 1 | 1 | 1 | 1 | 1 | 0 | 0 | 8 |
| LVA | riika | 3 | 1 | 1 | 1 | 1 | 1 | 0 | 0 | 8 |
| NLD | amsterdam | 3 | 1 | 1 | 1 | 1 | 1 | 0 | 0 | 8 |
| NOR | bergen, oslo, tromssa | 6 | 2 | 2 | 2 | 5 | 2 | 0 | 0 | 19 |
| POL | varsova, krakova | 6 | 2 | 2 | 2 | 3 | 2 | 0 | 0 | 17 |
| PRT | lissabon | 3 | 1 | 1 | 1 | 3 | 1 | 0 | 0 | 10 |
| ROU | bukarest | 3 | 1 | 1 | 1 | 1 | 1 | 0 | 0 | 8 |
| RUS | moskova, pietari | 6 | **1** | 2 | 2 | 3 | 2 | 0 | 0 | 16 |
| SWE | tukholma | 3 | 1 | 1 | 1 | 1 | 1 | **1** | 0 | 9 |
| TUR | istanbul | 3 | 1 | 1 | 1 | 1 | 1 | 0 | 0 | 8 |
| UKR | kiova, odessa | 6 | 2 | 2 | 2 | 2 | 2 | 0 | 0 | 16 |
| **Yht** | 45 kaupunkia | **118** | **38** | **39** | **43** | **70** | **41** | **2** | **6** | **357** |

Havaintoja taulukosta:

- **Kuusi kaupunkia on fokusvirran ulkopuolella:** alpit, lappi, tromssa, kreeta,
  sisilia, islanti — vain kulttuurivisa, yksi lehtitehtävä ja kohtaaminen.
- **Pietarilta puuttuu AARTEEN AVAUS -tehtävä** (`fokusvirta-pietari.js`
  `lehtitehtavat` sisältää vain julisteen). Venäjä on ainoa maa, jossa vihreä
  kohtaamispiste ei siis synny lehden kautta.
- Espanja ja Italia ovat 3–4 kertaa muita maita raskaammat (35 ja 31 tehtävää) —
  vaihtelu on määrässä, ei muodossa.

---

## 3. Mikä toistuu liikaa

1. **Kolmen vaihtoehdon monivalinta.** 195 fokusvirtavisaa (täky + lehtitehtävä)
   ovat kaikki tismalleen sama kortti: kysymys, kolme lipuketta, fakta. Pelaaja
   näkee saman muodon 5–8 kertaa yhdessä kaupungissa ja ~200 kertaa Euroopan
   läpi. Tämä on selvin yksittäinen ongelma.
2. **Aarteen avaus on kaksi peräkkäistä monivalintaa.** AARTEEN AVAUS sytyttää
   pisteen → piste avaa kohtaamiskysymyksen → aarre. Kaksi porttia, sama lukko.
3. **"Mitä X tarkoittaa / kuinka monta / mikä näistä" -kysymystyyppi.** Etenkin
   kohtaamiskysymyksissä (41 kpl) sanamuoto on usein sanakirjakysymys tai
   lukumäärä, ei päättely.
4. **Palkkiorakenne on aina sama** (50 puntaa oikeasta). Mikään tehtävä ei
   riskeeraa, ajoita tai palkitse eri tavalla — paitsi kohtaamisen tiimalasi ja
   kahden yrityksen sääntö, jotka ovat pelin ainoa jännitteen lähde.

---

## 4. Missä laatu on heikoin

Nämä on poimittu lukemalla kaikki 41 kohtaamiskysymystä ja 38 aarteen avausta.
Sisältö on keskimäärin hyvää; alla ovat poikkeukset, jotka kannattaa korjata.

**A. Kysymys sisältää vastauksen.**
`granada`: *"**Punertava** linnoitus Alhambra kohoaa Granadan yllä. Mitä sen nimi
tarkoittaa?"* → oikea vastaus *"Punaista — arabiaksi al-hamra"*. Vastaus luetaan
kysymyksen ensimmäisestä sanasta. Korjattavissa yhdellä sanavalinnalla.

**B. Puhdas arvaus, ei ratkaistavissa ruudulta.** Perustuslaki ja Raamatun
"Tutki kätkö -pelit" sanovat: *"pelin on auettava siitä mitä ruudulla näkyy — ei
ulkoa opettelua."* Nämä eivät aukea:
- `odessa`: *"Montako askelmaa Odessan jättiläisportaikossa on?"*
- `helsinki`: *"Suomenlinna rakennettiin usealle saarelle. Kuinka monelle?"*
- `vilna` (aarteen avaus): *"Miltä vuodelta tähtitorni on?"*
- `krakova` (aarteen avaus): *"Kuinka monta obwarzanek-rinkeliä menee päivässä?"*
Lukukysymys on hyvä vasta, kun sen voi päätellä tai kun mekaniikka on liukusäädin
("lämpenee/kylmenee"), ei neljä lukua.

**C. Liian helppo 13+ -kohderyhmälle.**
- `kreeta`: minotauros — puoliksi mies, puoliksi *härkä* / leijona / käärme / kotka.
- `kobenhavn`: *"Mikä näistä on H. C. Andersenin satu?"* — Pieni merenneito /
  Punahilkka / Tuhkimo / Hannu ja Kerttu. Harhautukset ovat kaikki Grimm/Perrault.
- `bukarest`: *"Mitä bucurie tarkoittaa?"* — ilo / koti / lammas / aamunkoitto.

**D. Faktakysymys ilman tarinaa ja ilman isoisää.** `lappi`: *"Mikä revontulet
tieteen mukaan sytyttää?"* — oppikirjan kysymys, jossa ei ole 1873:a, päiväkirjaa
eikä paikkaa; `alpit` ja `islanti` ovat samaa sarjaa. Nämä ovat juuri ne
kaupungit, joilta puuttuu fokusvirta.

**E. Ohuimmat maat.** Sveitsi (3 tehtävää), Islanti (4), Kreeta ja Sisilia
(1 tehtävä + kohtaaminen). Aarre avautuu niissä käytännössä yhdellä
monivalinnalla.

**Ei ongelma, vaikka epäilin:** harhautusten pituus ei paljasta oikeaa vastausta.
Kohtaamiskysymyksistä 6/41 (15 %) ja fokusvisoista 60/195 (31 %) on sellaisia,
joissa oikea on pisin vaihtoehto — molemmat alle tai lähellä sattuman rajaa.
Datassa `oikea` on aina indeksi 0, mutta moottori sekoittaa järjestyksen
(`shuffledOrder`), joten pelaajalle se ei näy.

---

## 5. Parhaat esimerkit ja miksi

1. **Pöllön sähketehtävä (Tukholma / Vasa, Sofia / Varna).** Ainoa tehtävä, jossa
   vastaus *kaivetaan pelin omista aineistoista*: se rakennetaan maan
   kohdeluettelosta ja vuosiluvusta, ja rinnalla on vapaa tekstikenttä, jonka
   Livian lento vie arvioitavaksi. Yhdistää kaksi asiaa, käyttää karttaa ja
   lehteä, ja tarinallinen kuori (lennätin 1873, pöllö ja pulu) on pelin omaa
   kieltä. Tämä on se malli, jota kannattaa monistaa.
2. **Isoisän piirrospulmat**, erityisesti Stonin suola-altaat, Venetsian acqua
   alta ja Strokkurin kello. Ne *lasketaan* eikä muisteta, piirros arvotaan joka
   pelikerralla uudestaan (`EUROPE_GENERATORS`), ja luonnos on uskottavasti
   isoisän luonnoskirjasta. Ateenan pylväspulma on paras hybridi: isoisän piirros
   vs. neljä oikeaa valokuvaa.
3. **Parhaat kohtaamiskysymykset** ovat niitä, joissa isoisän merkintä jättää
   aukon: Praha (*"keisarin ihmeet ovat hajallaan, mutta sali on yhä
   paikallaan — kuka kokoelman vei ja milloin?"*), Wien (*"pörssi kaatui
   kahdeksan päivää maailmannäyttelyn avajaisten jälkeen — minä päivänä?"*),
   Lontoo (sumun oikea syy), Berliini (kynällä löydetty planeetta). Näissä
   kysymys on isoisän havainnon jatke, ei tietokilpailu.
4. **Parhaat aarteen avaukset** ovat pieniä yllätyksiä, jotka kestävät aikuisen:
   Amsterdam (miksi Yövartiota leikattiin), Venetsia (gondoli on tahallaan vino),
   Barcelona (11 soittajaa, 12 soitinta), Dublin (Hamilton kaiversi kaavan
   sillan kiveen), Sarajevo (Jure Franko 1984). Näissä kysymys *on* fakta, ei
   fakta kysymyksen jälkeen.

---

## 6. Piilossa olevat ja kuolleet pelimuodot

Tämä selittää, miksi vaihtelua on vähemmän kuin Raamatun pelikatalogi lupaa.

- **Isoisän väittämä (totta/taru)** ja **tapahtumakortti**: Euroopan pakassa
  `claims` = 0 ja `events` = 0. Maailmankartan 16 väittämästä 12 on afrikkalaisia
  (Suez, Niger, Niili, Sahara…), joten Euroopassa muoto olisi väärästä maasta.
- **Valokuvakysymys, lippukysymys, isoisän väittämä, tapahtumakortti**: sekä
  saapumiskortti (`js/ui.js` rivi ~2616) että vihreä piste ja kohtaamiskortti
  (`js/fokusvirta.js` rivit 1765 ja 3043) kutsuvat `actionQuiz({ form: 'quiz' })`.
  Muotoarvonta `pickForm` ohitetaan siis aina, kun kaupungissa on kohtaaminen —
  eli koko Euroopassa. Muodot voivat aueta vain, jos kohtaaminen epäonnistuu
  kahdesti eikä laatta ole kääntynyt. Käytännössä pelaaja ei näe niitä koskaan.
- **Vaikea kysymys** (`hard: true`, +bonus): moottorissa on, mutta sille ei ole
  yhtään käyttöliittymän ovea — vain botti käyttää `actionQuiz()`-polkua.
- **Isoisän piirrospulma tulee vasta aarteen jälkeen.** `actionQuiz` tarkistaa
  `pendingPuzzle`-ehdon vasta kun kaari on null, ja kaari on olemassa kaikissa
  kuudessa pulmakaupungissa. Pulma on siis bonustehtävä, ei aarteen avaaja —
  paras mekaniikka on heikoimmalla paikalla.
- **Sofiassa ja Tukholmassa on sekä kohtaaminen että sähketehtävä**, vaikka
  Raamattu sanoo: *"Maassa jossa on sähketehtävä EI ole kohtaamista."* Vihreä
  piste avaa sähkeen, mutta saapumiskortin nappi avaa yhä kaaren kysymyksen.
- **Apukeinot eivät ulotu lehtitehtäviin.** Vihje (40 p), 50:50 (80 p) ja kysy
  kaverilta (25 p) toimivat vain `game.quiz`-kortilla. 50:50 vaatii lisäksi
  neljä vaihtoehtoa, joten se ei toimisi 3-vaihtoehtoisissa fokusvisoissa
  vaikka ne kytkettäisiin.

---

## 7. Arvio: ovatko pelit riittävän hyviä ja vaihtelevia?

**Laatu: kyllä, muutamaa poikkeusta lukuun ottamatta.** Tekstit ovat aikuiselle
kirjoitettuja, faktat tarkistettuja ja lähteistettyjä, ja parhaat kysymykset jäävät
aikuisellekin mieleen. Korjattavaa on §4:n A–D-listan verran, noin 8–10 kysymystä
357:stä.

**Vaihtelu: ei.** Kolme mekaniikkaa, joista kaksi on yhteensä kahdeksassa
tehtävässä (2,2 %). Pakollinen aarrepolku on kolme peräkkäistä monivalintaa
39 kaupungissa. Peli, jonka ydinsilmukka toistuu 45 kertaa, ei kestä yhtä
lukkoa — ja Raamattu on itse asettanut riman: *"ne ovat pelin ydinsilmukka …
joten niitä kehitetään mahdollisimman vaihteleviksi ja korkeatasoisiksi."*
Nykytila alittaa oman katalogin: 12 pelityyppiä on kirjattu, 3 on pelissä.

**Ero on korjattavissa halvalla,** koska suurin osa puuttuvasta on jo koodattu (§6)
tai sillä on valmis moottori (aikajana, kohdekartat, piirrospulmien generaattorit).

---

## 8. Kahdeksan ehdotusta

Järjestys on hyöty/työmäärä-suhteessa. Työmäärä: **XS** = tunteja, **S** = yksi
sessio, **M** = 2–3 sessiota, **L** = viikko.

| # | Ehdotus | Työmäärä | Pilotti |
|---|---|---|---|
| 1 | **Avaa jo koodatut muodot Euroopassa.** Kirjoita Euroopalle oma väittämäpankki (30 isoisän päiväkirjamerkintää, totta/taru) ja päästä väittämä, valokuvakysymys ja lippukysymys aarrepolulle: anna kaupungin datan nimetä muoto (`fokusvirta.aarremuoto`) sen sijaan että kaikki kutsut pakottaisivat `form: 'quiz'`. Kolme mekaniikkaa lisää ilman uutta pelilogiikkaa. | koodi XS, sisältö M | Amsterdam (väittämä: "kanavat jäätyivät niin että niillä luisteltiin"), Lissabon, Riika |
| 2 | **Sähketehtävä 2 → 12 maahan.** Mekaniikka, worker ja testit ovat valmiit; uusi kaupunki on yksi datalohko (`sahketehtava`) ja hakemistomaa. Poista samalla kaari-kysymys sähkekaupungeista Raamatun säännön mukaisesti. | koodi 0, sisältö S/kaupunki | Amsterdam (Yövartion mitat), Praha, Lissabon, Edinburgh, Riika |
| 3 | **Silmämitta- ja arviopeli liukusäätimellä.** Isoisän mittanauha: pelaaja vetää säädintä, peli sanoo "lämpenee / kylmenee", kolme yritystä. Korvaa §4 B:n arvauskysymykset oikealla mekaniikalla ja tekee lukumääristä hauskoja. | koodi S | Odessa (portaiden askelmat — sama kysymys, oikea muoto), Helsinki, Krakova |
| 4 | **Karttapulma: isoisän suuntaohje.** *"Torni joen itärannalla, kolmannen sillan kupeessa"* — pelaaja napauttaa kaupunkilehden kohdekartalta oikeaa pistettä. Kohdekartat ovat olemassa 14 kaupungissa (`maakartat.js`), joten piirtoa ei tarvitse tehdä. Tekee kartasta tehtävän eikä taustan. | koodi M | Venetsia, Amsterdam, Edinburgh, Pietari |
| 5 | **Piirrospulmat 6 → 15 ja aarrepolulle.** Käännä järjestys: pulmakaupungissa pulma on aarteen avaus ja kohtaaminen tulee sen jälkeen. Uusia pulmia laskettavista aiheista, samalla generaattorimallilla. | koodi S (kytkentä) + S/pulma | Bergen (hansan mitta- ja kalapainot), Tukholma (Slussenin pinnankorkeus), Riika |
| 6 | **Aikajanapeli: järjestä kolme.** `js/aikajana.js` on jo olemassa keksintölinssiä varten. Kolme isoisän luonnosta tai valokuvaa raahataan ikäjärjestykseen; vuosiluvut paljastuvat vasta lopuksi. | koodi M | Rooma (kerrostumat), Istanbul, Firenze, Krakova |
| 7 | **Kirjepulma: repeytynyt sana.** Isoisän kirjeestä puuttuu sana; neljästä vaihtoehdosta vain yksi sopii niin että faktat täsmäävät. Halvin uusi mekaniikka — pelkkää tekstiä, ei grafiikkaa — ja sopii pelin ytimeen (päiväkirja on keskusesine). | koodi XS, sisältö S | Vilna, Kööpenhamina, Dublin |
| 8 | **Paripeli kuva + nimi.** Kolme tarkistettua valokuvaa, kolme nimeä, yhdistä. Kuvat ja nimet ovat jo kaupunkilehdissä ja nähtävyysjutuissa. Ainoa mekaniikka, joka palkitsee lehden selaamisen suoraan. | koodi M | Firenze, Amsterdam, Wien |

**Ehdotusten ulkopuolella, tehtävä joka tapauksessa (§4):** korjaa Granadan
itsensä paljastava kysymys; kirjoita Kreetan, Kööpenhaminan ja Bukarestin
kohtaamiskysymykset uusiksi 13+ -tasoon; anna Lapin, Alppien ja Islannin
kysymyksille isoisä-kehys; lisää Pietarille puuttuva AARTEEN AVAUS -tehtävä;
poista kaksoisreitti Sofiasta ja Tukholmasta.

---

## 9. Suositus järjestykseksi

Ehdotukset 1 ja 2 tuottavat viisi mekaniikkaa lisää lähes ilman koodityötä ja
kannattaa tehdä ensin. 3 ja 7 ovat halvimmat uudet mekaniikat. 4 on tärkein pelin
hengelle: kartta on keskusesine, mutta tällä hetkellä yksikään Euroopan tehtävä ei
vaadi kartan katsomista. 5 korjaa sen, että pelin paras mekaniikka on nyt piilossa
aarteen takana.

Mitattava tavoite: **yksikään maa ei avaa aarrettaan kahdella peräkkäisellä
monivalinnalla**, ja **monivalinnan osuus Euroopan tehtävistä laskee alle 70 %:n**.
