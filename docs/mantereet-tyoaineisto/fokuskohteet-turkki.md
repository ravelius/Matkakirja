# Turkin fokusnäkymän karttakohteet — faktapohja

Tila: luonnos, ei viety koodiin. Kaikki tiedot koottu 25.8.2026.
Rakenne noudattaa `fokuskohteet-kreikka.md`:tä.

Tausta (js/tyohuone-raamattu.js, osio "Fokusmoodi", kohdat
KOHDEKOROSTUS/ETENEMINEN): pelilaatan (Istanbul) lisäksi fokusnäkymän
kartalla näkyy muita kaupunkeja, jokia, järviä ja vuoria; aarteen
löydyttyä niitä voi klikata, jolloin kartta korostaa juuri sen
kohteen niukalla taustalla ja avaa pienen pop-up-tietoruudun.
Tämä dokumentti on faktapohja niille pop-up-teksteille — ei
lopullista pelitekstiä eikä UI-suunnitelmaa.

Omistajan lupa 25.8.2026 (Raamattu, SEURAAVAT FOKUSMAAT): Istanbul
tehdään yhtä valmiiksi kuin Kreikka.

## Tarkistustapa

- **Koordinaatit:** en-Wikipedian MediaWiki-rajapinnasta
  (`action=query&prop=coordinates&coprop=type|name|dim`,
  `redirects=1`), haettu 25.8.2026 curlilla. Rajapinta vastasi
  ajoittain 429:llä (Wikimedian kiintiörajoitus); kaikki koordinaatit
  saatiin lopulta läpi kasvavalla uusintaviiveellä (4 s → 8 s →
  12 s...). EI yhtään koordinaattia muistista. `dim`-arvo on merkitty
  jokaisen kohdalle, koska se kertoo, kuinka laajaa aluetta piste
  edustaa (1000 = tarkka piste, 800000 = koko meri).
- **Popup-faktat:** en-Wikipedian artikkeleista, `action=query&
  prop=extracts&explaintext=1`. Jokaisen nostetun faktan kohdalla alla
  on merkitty artikkeli JA mihin kohtaan artikkelia se nojaa
  (johdanto / nimetty alaotsikko).
- **Suomenkieliset nimet:** tarkistettu fi-Wikipediasta
  (`action=query&titles=...&redirects=1`) hakemalla ehdokasotsikko ja
  seuraamalla uudelleenohjaus perille asti. Kaksi nimeä osoittautui
  eri muotoon kuin oletin — merkitty kohteittain.
- **Commons-kuvat:** tiedostonimet on haettu Commonsin
  hakurajapinnasta (`list=search`, `srnamespace=6`) ja jokaisen
  olemassaolo, koko, lisenssi, tekijä ja Restrictions-kenttä
  varmennettu `imageinfo`-rajapinnasta. **EI arvattuja
  tiedostonimiä.** Yksi hakutulos (Pamukkale, Giorgio Galeotti
  6.10.2025 nro 01) kantoi `restr=personality` — se on jätetty pois.
- **Kuvia EI ole katsottu silmin.** Silmätarkistus tehtävä ennen
  julkaisua, erityisesti tunnistettavien etualan ihmisten varalta
  (sama käytäntö kuin herokuvissa).

Vertailuksi pelilaatta **Istanbul: 41,01361°N, 28,955°E**
(en-Wikipedia "Istanbul", coprop type=adm2nd, dim=30000) — ei oma
kohde tässä listassa vaan laatta itse.

---

## Kohteet

### 1. Troija

- **Nimi:** Troija (fi-Wikipedia, ei uudelleenohjausta). Paikallinen:
  Truva / Troya; antiikin kreikaksi Τροία (Troía) ja Ἴλιον (Ílion),
  josta *Ilias*. Kaivauskumpu on nimeltään Hisarlık.
- **Tyyppi:** muu (arkeologinen kohde).
- **Koordinaatit:** 39,9575°N, 26,23889°E — en-Wikipedia "Troy"
  (dim=1000).
- **Popup-teksti (n. 430 merkkiä) — TÄRKEIN 1873-KOHDE:**

  > Kaupungin sijainti oli kadonnut vuosisadoiksi, kunnes
  > englantilaissyntyinen Frank Calvert kaivoi Hisarlıkin kummulla
  > vuodesta 1865 ja tunnisti paikan oikein. Heinrich Schliemann
  > jatkoi siitä: kaivauskaudet 1871–1873 paljastivat yhdeksän
  > päällekkäistä kaupunkia, ja viimeisenä kaivauspäivänä kesäkuussa
  > 1873 hän löysi kullan, jota kutsui Priamoksen aarteeksi. Isoisän
  > matkan aikana Troija oli maailman kuumin kaivaus.

- **Lähde:** en-Wikipedia "Troy", johdanto ("Until the 19th century,
  the city's location had been lost. The current site was excavated by
  Frank Calvert and Heinrich Schliemann from 1871") ja osiot "Frank
  Calvert" ("The next excavation at Hisarlık was conducted in 1865 by
  Frank Calvert, a man of English descent who owned a farm nearby.
  Calvert made extensive surveys of the site and correctly identified
  it with classical-era Ilion") ja "Heinrich Schliemann" ("In 1871–1873
  and 1878–1879, 1882 and 1890... he discovered the ruins of a series
  of ancient cities dating from the Bronze Age to the Roman period").
  Aarteen löytöpäivä 15.6.1873 on en-Wikipedia "Heinrich Schliemann"
  -artikkelista, joka on jo siteerattu `takyt-ateena.md`:n täyssä 10.
- **Varmuus:** VARMA. HUOM: älä väitä, että Troija II olisi Homeroksen
  Troija — Schliemann uskoi niin, mutta lähde toteaa sen olleen
  tuhat vuotta liian vanha. Dörpfeld ja Schliemann itse pitivät
  myöhemmin Troija VI:ta todennäköisempänä; Schliemann ei koskaan
  julkaissut sitä.
- **KREIKKA-JATKUMO (KESKEINEN):** Schliemann on jo pelissä kahdesti
  — `takyt-ateena.md` täky 10 (Iliou Melathron, Ateenan
  keskusta) ja `takynostot-kreikka.md` ehdokkaat 1–4 (valheet,
  Sofian korukuva 1873, kullan katoaminen Berliinistä, Frank
  Calvert). Troija on se paikka, josta kaikki tuo lähti. Kun pelaaja
  saapuu Kreikasta Turkkiin, sama tarina jatkuu toisessa maassa —
  ja nyt hän seisoo itse kaivauksella.
- **Commons:** **Legendary walls of Troy (8708672267).jpg**
  (4288×2848, CC BY 2.0, Jorge Láscar, 31.8.2012) tai
  **Walls of Troy (1).jpg** (1454×1090, CC BY-SA 3.0, CherryX, 2012).
  Aikalaishenkilökuva: **Heinrich Schliemann, half-length portrait,
  facing front LCCN96516246.tif** (3226×4096, public domain, Library
  of Congress, 1870).

### 2. Efesos

- **Nimi:** Efesos (fi-Wikipedia, ei uudelleenohjausta). Paikallinen:
  Efes; sijaitsee Selçukin kunnassa İzmirin maakunnassa.
- **Tyyppi:** muu (antiikin kaupunki, arkeologinen kohde).
- **Koordinaatit:** 37,94111°N, 27,34194°E — en-Wikipedia "Ephesus"
  (dim=1000).
- **Popup-teksti (n. 440 merkkiä):**

  > Efesos oli antiikin maailman kuuluisin pyhiinvaelluskohde:
  > Artemiin temppeli, yksi seitsemästä ihmeestä, valmistui täällä
  > noin 550 eaa. ja siinä oli yli sata 17-metristä marmoripylvästä.
  > Kaupungin teatteriin mahtui 24 000 katsojaa. Brittiläinen
  > arkkitehti John Turtle Wood etsi kadonnutta temppeliä British
  > Museumin rahoituksella vuodesta 1863 ja löysi sen kivijalan 1869
  > — kaivaukset olivat vielä käynnissä isoisän matkan aikaan.

- **Lähde:** en-Wikipedia "Ephesus", johdanto (Artemiin temppeli
  valmistui n. 550 eaa., yksi seitsemästä maailmanihmeestä; teatteriin
  mahtui 24 000; satama liettyi umpeen) · osio "Temple of Artemis"
  ("once stood 418' by 239' with over 100 marble pillars each 56'
  high... it is now represented only by one inconspicuous column,
  revealed during an archaeological excavation by the British Museum
  in the 1870s") · osio "Archaeological research" ("the history of
  archaeological research in Ephesus stretches back to 1863, when
  British architect John Turtle Wood, sponsored by the British Museum,
  began to search for the Artemision. In 1869 he discovered the
  pavement of the temple, but since further expected discoveries were
  not made the excavations stopped in 1874").
- **Varmuus:** VARMA. Mitat 418' × 239' ja 56' ovat lähteen omat
  jalkamitat; yllä ne on muunnettu (56 jalkaa ≈ 17 m) — **muunnos on
  minun, ei lähteen.** Jos tarkkuus on tärkeä, käytä jalkoja tai
  tarkista muunnos erikseen.
- **BRITTIKYTKÖS:** vahva. Isoisän maanmies kaivoi paikalla juuri
  1873, ja löydöt vietiin Lontooseen. Sama asetelma kuin
  Elgin/Parthenon `takynostot-kreikka.md`:ssä (ehdokas 5), mutta
  ilman ryöstökeskustelun painolastia: lähteen mukaan osa löydöistä
  vietiin Lontooseen ja osa Istanbulin arkeologiseen museoon.
- **Commons:** **Ephesus Celsus Library Façade.jpg** (9163×7100,
  CC BY-SA 3.0, Benh Lieu Song, 21.6.2010) tai **Ephesus - Celsus
  Library.jpg** (4280×2951, CC BY-SA 3.0, Bernard Gagnon, 2014).
  HUOM: Celsuksen kirjasto on Efesoksen tunnetuin näkymä, mutta se on
  eri rakennus kuin Artemiin temppeli, josta popup kertoo — valitse
  kuvateksti sen mukaan.

### 3. Kappadokia

- **Nimi:** Kappadokia (fi-Wikipedia, ei uudelleenohjausta).
  Paikallinen: Kapadokya.
- **Tyyppi:** muu (historiallinen alue). **HUOM:** ei kaupunki eikä
  yksittäinen kohde — koordinaatti edustaa aluetta.
- **Koordinaatit:** 38,61833°N, 34,86722°E — en-Wikipedia
  "Cappadocia" (dim=1000; huomaa, että dim on pieni vaikka kohde on
  laaja alue — piste on siis alueen keskusta, ei sen laajuus).
- **Popup-teksti (n. 420 merkkiä):**

  > Kappadokian maisema syntyi tulivuorista: Erciyesin, Hasanin ja
  > Göllüdağin purkaukset peittivät alueen paksuun tuhkakiveen, jota
  > tuuli ja vesi ovat sitten kuluttaneet miljoonien vuosien ajan
  > "keijunsavupiipuiksi". Pehmeään kiveen on kaiverrettu satoja
  > kirkkoja ja luostareita — ja kokonaisia maanalaisia kaupunkeja,
  > joissa on monikerroksisia puolustusjärjestelmiä: käytäviä
  > sulkevia pyöreitä kivipaasia ja aukkoja katossa.

- **Lähde:** en-Wikipedia "Cappadocia", johdanto ("characterized by
  fairy chimneys... hundreds of churches and monasteries (such as
  those of Göreme and Ihlara), as well as underground cities that were
  dug to offer protection during periods of persecution") · osio
  "Geology" ("The distinctive landscape of Cappadocia was formed
  through the erosion of thick volcanic deposits created by ancient
  eruptions of Mount Erciyes, Mount Hasan, and Göllüdağ") · osio
  "Underground cities" ("The underground cities have vast defence
  networks of traps throughout their many levels. These traps are very
  creative, including such devices as large round stones to block
  doors and holes in the ceiling through which the defenders may drop
  spears").
- **Varmuus:** VARMA. HUOM ikäsopivuus: lähde mainitsee myös keihäiden
  pudottamisen katon rei'istä — yllä oleva popup jättää sen pois ja
  puhuu vain "aukoista katossa". Fable päättää, otetaanko yksityiskohta
  mukaan; 13+ kestäisi sen, mutta se ei ole tarpeen.
- **Commons:** **Göreme Valley in Cappadocia edit1.jpg** (2200×1371,
  CC BY-SA 3.0, Brocken Inaglory, 2006) tai **Cappadocia Goreme hike
  red valley fairy chimneys 2.jpg** (4240×2832, CC BY-SA 4.0,
  Aquinoxmedia, 2024).

### 4. Pamukkale ja Hierapolis

- **Nimi:** Pamukkale (fi-Wikipedia, ei uudelleenohjausta) — turkiksi
  "puuvillalinna". Antiikin kaupunki terassien päällä: Hierapolis
  (fi-Wikipedia, ei uudelleenohjausta).
- **Tyyppi:** muu (luonnonmuodostuma + antiikin kaupunki).
- **Koordinaatit:** Pamukkale 37,92389°N, 29,12333°E (en-Wikipedia
  "Pamukkale", coprop type=**city**, dim=10000 — huomaa, että
  rajapinta luokittelee sen kaupungiksi, koska paikalla on myös
  nykyinen taajama). Hierapolis erikseen: 37,925°N, 29,12583°E
  (dim=1000). Ero on n. 250 metriä; kartalla ne ovat sama piste.
- **Popup-teksti (n. 445 merkkiä):**

  > Rinteen valkoiset terassit ovat travertiinia: 17 kuumaa lähdettä
  > (35–100 °C) tuo kalsiumkarbonaattia pintaan, hiilidioksidi
  > karkaa, ja kivi saostuu hyllyiksi. Muodostuma on noin 2 700 metriä
  > pitkä, 600 leveä ja 160 korkea. Sen päälle rakennettiin antiikin
  > Hierapolis, jonka pyhin paikka oli Pluton portti — luola, josta
  > nousi tukahduttavaa kaasua, ja jota pidettiin manalan ovena.

- **Lähde:** en-Wikipedia "Pamukkale", johdanto (travertiini,
  muodostuman mitat 2 700 × 600 × 160 m, Hierapolis rakennettu sen
  päälle, Unescon maailmanperintökohde 1988) ja osio "Geology"
  ("there are 17 hot springs with temperatures ranging from 35 °C to
  100 °C... When the water, supersaturated with calcium carbonate,
  reaches the surface, carbon dioxide de-gasses from it, and calcium
  carbonate is deposited") · en-Wikipedia "Hierapolis", osio
  "Ploutonion" ("a small cave just large enough for one person to
  enter through a fenced entrance, beyond which stairs go down and
  from which emerges suffocating carbon dioxide gas caused by
  subterranean geologic activity").
- **Varmuus:** VARMA — suoraan lähteissä.
- **Kytkös täkylistaan:** Pluton portin täysi tarina (papit myivät
  turisteille lintuja koekaniineiksi) on `takynostot-turkki.md`
  ehdokas 7 — popup mainitsee vain paikan, ei tarinaa, jotta täkynosto
  säilyy tuoreena.
- **Commons:** **The Travertine terraces of Pamukkale.jpg**
  (2048×1536, CC BY-SA 4.0, Slyronit, 2011) tai **TR Pamukkale White
  Terraces asv2020-02 img16.jpg** (7952×5304, **FAL** — vapaa
  lisenssi mutta ei CC; jos sääntö on tiukka PD/CC, käytä
  Slyronitin kuvaa). **HYLÄTTY:** "Travertine terraces - Pamukkale...
  October 6, 2025 01.jpg" kantoi `Restrictions: personality` — ei
  käyttöön.

### 5. Ankara

- **Nimi:** Ankara (fi-Wikipedia, ei uudelleenohjausta).
  Historiallisesti Ancyra ja **Angora** — 1873 kaupunki tunnettiin
  Euroopassa nimellä Angora.
- **Tyyppi:** kaupunki (Turkin nykyinen pääkaupunki).
- **Koordinaatit:** 39,92889°N, 32,85472°E — en-Wikipedia "Ankara"
  (dim=1000).
- **Popup-teksti (n. 435 merkkiä) — 1873-NÄKÖKULMA KESKEINEN:**

  > HUOM 1873: Ankara ei ollut pääkaupunki, vaan Angoran vilajetin
  > keskus — pääkaupunki oli Istanbul. Kelttiläiset galatalaiset
  > asettuivat kaupunkiin 278 eaa. ja tekivät siitä yhden pääleiristään;
  > keisari Augustus nosti sen 25 eaa. Galatian provinssin
  > pääkaupungiksi, ja hänen tekojensa virallinen luettelo hakattiin
  > marmoriin erään temppelin seiniin. Kaupungin nimi elää yhä
  > angorakanin, angoravuohen ja angorakissan nimissä.

  ("HUOM 1873:" on peliteksti/tunniste itse pop-upissa, ei koostajan
  merkintä — muotoiltavissa uudelleen, ks. sama ratkaisu Korintin
  kanavassa `fokuskohteet-kreikka.md`:ssä.)

- **Lähde:** en-Wikipedia "Ankara", johdanto ("Serving as the capital
  of the ancient Celtic state of Galatia (280–64 BC)... the Angora
  Vilayet (1867–1922)... Ankara became the new Turkish capital upon the
  establishment of the Republic on 29 October 1923") · osio "History"
  ("In 278 BC, the city, along with the rest of central Anatolia, was
  occupied by a Celtic group, the Galatians (Gauls), who were the first
  to make Ankara one of their main tribal centers, the headquarters of
  the Tectosages tribe" · "In 25 BC, Emperor Augustus raised it to the
  status of a polis and made it the capital city of the Roman province
  of Galatia. Ankara is famous for the Monumentum Ancyranum (Temple of
  Augustus and Rome) which contains the official record of the Acts of
  Augustus, known as the Res Gestae Divi Augusti, an inscription cut in
  marble on the walls of this temple") · johdanto ("The city gave its
  name to the Angora wool shorn from Angora rabbits, the long-haired
  Angora goat (the source of mohair), and the Angora cat").
- **Varmuus:** VARMA. HUOM pieni ristiriita lähteen sisällä:
  johdanto antaa Galatian valtiolle vuodet 280–64 eaa. mutta
  historiaosio sanoo kelttien miehittäneen kaupungin 278 eaa. Käytä
  278 eaa. (tarkempi, historiaosiosta) tai sano "270-luvulla eaa.".
- **ELÄINKYTKÖS:** angorakissa (Ankara kedisi) on yksi vanhimmista
  luonnollisista kissaroduista, kotoisin juuri Ankaran seudulta ja
  dokumentoitu jo 1600-luvulla (en-Wikipedia "Turkish Angora",
  johdanto). Tämä on kevyt, söpö lisä popupiin, jos halutaan
  eläinlinja jatkumaan Istanbulin kissoista.
- **Commons:** **Castillo de Ankara, Ankara, Turquía, 2024-10-03,
  DD 47.jpg** (6297×4198, CC BY-SA 4.0, Diego Delso, 2024) tai
  **View from the Ankara Castle (1).jpg** (4000×3000, CC BY 3.0 pl,
  Radosław Botev, 2024). Aikalaispanoraama: **A Panoramic View of
  Ankara from Ankara Castle (12984588473).jpg** (5538×938,
  "No restrictions", SALTOnline) — **tarkista lisenssimerkintä
  Commonsin sivulta**, koska "No restrictions" ei ole nimetty
  CC-lisenssi.

### 6. İzmir (Smyrna)

- **Nimi:** İzmir (fi-Wikipedia; "Izmir" ilman pistettä ohjautuu
  tänne). Antiikissa ja englanniksi noin vuoteen 1930 asti **Smyrna**
  — eli isoisän aikaan kaupunki oli briteille Smyrna, ei İzmir.
- **Tyyppi:** kaupunki.
- **Koordinaatit:** 38,42444°N, 27,13222°E — en-Wikipedia "İzmir"
  (dim=1000).
- **Popup-teksti (n. 430 merkkiä):**

  > Smyrna oli 1800-luvulla Ottomaanien vilkkain länsisatama ja
  > monikielinen kauppakaupunki: brittien arvion mukaan siellä asui
  > 1865 noin 180 000 ihmistä, joista 80 000 kreikkalaisia. Turkin
  > nykyalueen ensimmäinen rautatie lähti täältä — 130 kilometrin rata
  > Aydınille aloitettiin 1856 ja valmistui 1867. Vuonna 1867 kaupunki
  > sai vihdoin oman vilajettinsa. Isoisän aikaan se oli Istanbulin
  > jälkeen valtakunnan tärkein portti länteen.

- **Lähde:** en-Wikipedia "İzmir", johdanto (Smyrna-nimen käyttö
  englanniksi n. vuoteen 1930; yli 3 000 vuotta kaupunkihistoriaa;
  yksi Välimeren tärkeimmistä kauppakaupungeista) · osio "Ottoman
  era" ("The first railway lines to be built within the present-day
  territory of Turkey went from İzmir. A 130 km İzmir-Aydın railway was
  started in 1856 and finished in 1867, a year later than the
  Smyrna-Cassaba Railway, itself started in 1863. In 1865 the
  population was estimated by the British (Hyde Clarke) at 180,000 with
  minorities of 80,000 Greeks, 8,000 Armenians and 10,000 Jews... In
  1867, İzmir finally became the center of its own vilayet").
- **Varmuus:** VARMA. Väestöluku on lähteessä nimenomaan **brittiläisen
  Hyde Clarken arvio**, ei virallinen laskenta — sano "brittien
  arvion mukaan", kuten popupissa yllä.
- **IKÄSOPIVUUS JA HERKKYYS (TÄRKEÄ):** artikkeli käsittelee myös
  vuoden 1922 tapahtumia ja vuoden 1923 väestönvaihtoa, jotka ovat
  Kreikan ja Turkin suhteissa yhä hyvin herkkiä. **Popup-teksti on
  rajattu tarkoituksella 1800-luvulle.** Jos aihetta laajennetaan,
  se vaatii Fablen erillisen linjauksen — peli liikkuu Kreikasta
  Turkkiin ja käsittelee molempia kunnioittavasti.
- **Commons:** **İzmir Clock Tower, Konak Square.jpg** (1472×2048,
  CC BY-SA 4.0, Maurice Flesier, 2010) tai **Izmir Konak Square.jpg**
  (4262×1527, CC BY-SA 3.0, Ingo Mehling, 2011). **HUOM
  AJOITUSANSA:** Konakin kellotorni on vuodelta 1901 — sitä EI ollut
  olemassa 1873. Kuvatekstissä ei saa vihjata, että isoisä olisi
  nähnyt sen.

### 7. Bursa

- **Nimi:** Bursa (fi-Wikipedia, ei uudelleenohjausta). Antiikissa
  Prusa. Lempinimi Yeşil Bursa, "Vihreä Bursa".
- **Tyyppi:** kaupunki.
- **Koordinaatit:** 40,19722°N, 29,06222°E — en-Wikipedia "Bursa"
  (dim=1000).
- **Popup-teksti (n. 425 merkkiä):**

  > Bursa oli Ottomaanien ensimmäinen pääkaupunki: se vallattiin
  > bysanttilaisilta 1326 ja toimi pääkaupunkina 1335-luvulta
  > 1360-luvulle, kunnes hovi siirtyi Edirneen. Kaupunki oli jo
  > 500-luvulla kuuluisa silkkikankaistaan, ja ottomaaniaikana se
  > jakoi idän silkkiä — myös Ming-Kiinasta — Genovaan ja Firenzeen
  > asti. Yllä kohoaa Uludağ, jota antiikissa kutsuttiin Mysian
  > Olympokseksi.

- **Lähde:** en-Wikipedia "Bursa", johdanto ("The city became the
  capital of the Ottoman Empire (back then the Ottoman Beylik) from
  1335 until the 1360s"; "Mount Uludağ, known in classical antiquity as
  the Mysian Olympus or, alternatively, Bithynian Olympus") · osio
  "History" ("Already by the mid-6th century, Prusa was known as a
  famous silk textile manufacturing centre"; "Bursa became the capital
  city of the early Ottoman Empire following its capture from the
  Byzantines in 1326... After conquering Adrianople (later Edirne) in
  East Thrace, the Ottomans turned it into the new capital city in the
  1360s"; "Bursa was a hub of the Ottoman silk trade... became a place
  of distribution of silk and other commodities from the East,
  particularly Ming China, to the rest of the Mediterranean world,
  which included the Italian city-states, particularly Genoa and
  Florence").
- **Varmuus:** VARMA. HUOM lähteen sisäinen ero: valtaus 1326,
  pääkaupungiksi "from 1335" — nämä ovat eri vuosia eivätkä ristiriita,
  mutta älä sano "pääkaupunki 1326".
- **KREIKKA-JATKUMO:** Uludağ = Mysian Olympos. Pelissä on jo
  fokuskohde `olympos` (Kreikan Olympos, fokuskohteet-kreikka.md
  kohde 6) — antiikissa "Olympos"-nimisiä vuoria oli useita, ja tämä
  on hauska pieni oivallus pöllön suulle.
- **ELÄINKYTKÖS:** Bursan maakunnassa, Uluabat-järven rannalla, on
  Eskikaraağaçin haikarakylä ja Yaren-haikara — ks. `takyt-istanbul.md`
  täky 18. Jos Bursa nostetaan fokusvirtaan, haikaratarina on sen
  luonteva jatko.
- **Commons:** **Bursa Green Mosque West side in 2018 7794.jpg**
  (4928×3280, CC BY-SA 4.0, Dosseman, 2018) tai aikalaiskuva
  **The mausoleum and Yeşil Cami (Green Mosque) of Çelebi Sultan
  Mehmet (I) in Bursa between 1880 and 1893.jpg** (640×499, public
  domain, Abdullah frères, 1880–1893) — sama hovivalokuvaamo, joka
  kuvasi sulttaanit; ajallisesti lähellä isoisän matkaa.

### 8. Konya

- **Nimi:** Konya (fi-Wikipedia, ei uudelleenohjausta). Antiikissa
  Ikonion / Iconium; 1800-luvun englanninkielisissä matkakertomuksissa
  yleensä **Konia** tai **Koniah** — eli isoisä olisi kirjoittanut sen
  niin.
- **Tyyppi:** kaupunki.
- **Koordinaatit:** 37,87444°N, 32,49306°E — en-Wikipedia "Konya"
  (dim=1000).
- **Popup-teksti (n. 415 merkkiä):**

  > Konya oli Rum-seldžukkien sulttaanikunnan pääkaupunki, josta
  > hallittiin lähes koko Anatoliaa. Runoilija ja mystikko Rumi eli
  > täällä loppuelämänsä, ja vuonna 1273 hänen seuraajansa perustivat
  > mevlevi-veljeskunnan, joka tunnetaan pyörivinä dervisheinä.
  > Rumin turkoosikupolinen hauta on yhä kaupungin tärkein
  > nähtävyys. Kaupungin nimi juontaa todennäköisesti heettiläisestä
  > paikannimestä Ikkuwaniya.

- **Lähde:** en-Wikipedia "Konya", johdanto ("During antiquity and
  into Seljuk times it was known as Iconium. In 19th-century accounts
  of the city in English its name is usually spelt Konia or Koniah. In
  the late medieval period, Konya was the capital of the Seljuk Turks'
  Sultanate of Rum... Today it is the spiritual centre of the Mevlevi
  Order, famous for its Whirling Dervishes") · osio "Name" ("Konya is
  believed to correspond to the Late Bronze Age toponym Ikkuwaniya
  known from Hittite records") · osio "Culture" ("It was the final home
  of Rumi (Mevlana), whose turquoise-domed tomb in the city is its
  primary tourist attraction. In 1273, Rumi's followers established the
  Mevlevi Sufi order of Islam and became known as the Whirling
  Dervishes").
- **Varmuus:** VARMA. HUOM: nimen alkuperä on lähteessä varauksellinen
  ("is believed to correspond") — käytä sanaa "todennäköisesti".
  Kansanetymologia Medusan päästä ja Perseuksesta on lähteen mukaan
  "a folk etymology" — sitä ei pidä kertoa faktana.
- **Commons:** **Mevlana Müzesi 01.jpg** (4256×3011, CC BY-SA 3.0,
  Bernard Gagnon, 2014) tai **Konya Mevlana Museum Courtyard 094.jpg**
  (4080×6064, CC BY-SA 4.0, Dosseman, 2018).

### 9. Trabzon (Trapezunt)

- **Nimi:** Trabzon (fi-Wikipedia, ei uudelleenohjausta).
  Historiallisesti **Trapezunt** (Trebizond), kreikaksi Τραπεζοῦς
  (Trapezous) — nimi tulee sanasta *trapeza*, "pöytä", kaupungin
  pöytämäisen keskuskukkulan mukaan.
- **Tyyppi:** kaupunki (satama Mustanmeren rannalla).
- **Koordinaatit:** 41,005°N, 39,7225°E — en-Wikipedia "Trabzon"
  (dim=1000).
- **Popup-teksti (n. 440 merkkiä):**

  > Miletoksesta tulleet kreikkalaiset perustivat kaupungin 756 eaa.
  > Se oli ensimmäinen kreikkalainen kaupunki, jonka Ksenofonin
  > kymmenentuhannen palkkasoturin joukko tavoitti taistellessaan
  > tiensä ulos Persiasta. Neljännen ristiretken jälkeen 1204 siitä
  > tuli Trapezuntin keisarikunnan pääkaupunki — kaikkein pisimpään
  > säilynyt Bysantin seuraajavaltio, joka kaatui vasta 1461,
  > kahdeksan vuotta Konstantinopolin jälkeen. Marco Polo päätti
  > paluumatkansa tähän satamaan.

- **Lähde:** en-Wikipedia "Trabzon", johdanto ("the city was founded in
  756 BC as Trapezous by Greek colonists from Miletus... the city was
  the capital of the Empire of Trebizond, one of the successor states
  of the Byzantine Empire after the Fourth Crusade in 1204. In 1461, it
  came under Ottoman rule") · osio "Name" (τράπεζα = "table") · osio
  "Antiquity" ("When Xenophon and the Ten Thousand mercenaries were
  fighting their way out of Persia, the first Greek city they reached
  was Trebizond") · osio "Empire of Trebizond" ("it was the longest
  surviving of the Byzantine successor states... One of the most famous
  persons to have visited the city in this period was Marco Polo, who
  ended his overland return journey at the port of Trebizond") · "who
  also conquered Trebizond eight years later, in 1461".
- **Varmuus:** VARMA — suoraan lähteessä.
- **KREIKKA-JATKUMO:** Ksenofonin *Anabasis* ja Miletoksen
  siirtokunta — sama kreikkalainen siirtokuntaverkosto, joka
  perusti myös Byzantionin (ks. `takyt-istanbul.md` täky 15).
- **IKÄSOPIVUUS JA HERKKYYS:** artikkeli käsittelee myös
  pontoskreikkalaisten karkotusta 1923. Popup on rajattu
  tarkoituksella tätä aiemmaksi, samalla periaatteella kuin İzmir.
- **Commons:** **Hagia Sophia Trabzon.jpg** (3456×2304, CC BY-SA 3.0,
  İhsan Deniz Kılıçoğlu, 2010) — sama kuvaaja, jonka kuvia on jo
  pelissä (Üsküdar, Süleymaniye). Vaihtoehto **Panoramic view of the
  Hagia Sophia of Trabzon.jpg** (6703×2141, CC BY-SA 4.0,
  User:Balkanique, 2015).

### 10. Göbekli Tepe

- **Nimi:** Göbekli Tepe (fi-Wikipedia, ei uudelleenohjausta).
  Turkiksi "Vatsakukkula"; kurdiksi Girê Mirazan, "Toivekukkula".
- **Tyyppi:** muu (arkeologinen kohde, kivikausi).
- **Koordinaatit:** 37,22361°N, 38,92167°E — en-Wikipedia "Göbekli
  Tepe" (coprop type=**landmark**, dim=1000).
- **Popup-teksti (n. 430 merkkiä):**

  > Kukkulan huipulle rakennettiin suuria ympyränmuotoisia rakennelmia
  > T-kirjaimen muotoisine kivipylväineen noin 9500–8000 eaa. — ne
  > ovat maailman vanhimpia tunnettuja megaliitteja, tuhansia vuosia
  > vanhempia kuin savi, kirjoitus tai metalli. Pylväisiin on veistetty
  > villieläimiä sekä ihmismäisiä käsiä ja vaatteita. Kohde
  > huomattiin kartoituksessa 1963, mutta sen merkitys tajuttiin vasta
  > 1994. Vuoteen 2021 mennessä siitä oli kaivettu noin kymmenesosa.

- **Lähde:** en-Wikipedia "Göbekli Tepe", johdanto ("The settlement was
  inhabited from around 9500 BCE to at least 8000 BCE, during the
  Pre-Pottery Neolithic. It is known for its large circular structures
  that contain large stone pillars – among the world's oldest known
  megaliths. Many of these pillars are decorated with anthropomorphic
  details, clothing, and sculptural reliefs of wild animals") · "The
  site was first noted in a 1963 archaeological survey. German
  archaeologist Klaus Schmidt recognised its significance in 1994 and
  began excavations there the following year... Göbekli Tepe was
  designated a UNESCO World Heritage Site in 2018... As of 2021, around
  10% of the site has been excavated."
- **Varmuus:** VARMA yllä olevasta. **ÄLÄ VÄITÄ, ETTÄ PAIKKA
  HAUDATTIIN TARKOITUKSELLA.** Se on yleisin Göbekli Tepestä
  toistettu tarina, ja lähde toteaa hypoteesin **hylätyksi**:
  "Subsequent research led to a significant revision of Schmidt's
  chronology, including the abandonment of the hypothesis that the
  fill of the structures was brought from elsewhere." Älä myöskään
  sano "maailman ensimmäinen temppeli" varmana — lähde sanoo, että
  rakennusten tarkoitusta EI ole määritetty ja että "world's first
  temple" on populaari kuvaus.
- **Commons:** **Göbekli Tepe, Urfa.jpg** (4288×2848, CC BY-SA 3.0,
  Teomancimit, 2011) — laajalti käytetty yleiskuva; tai
  **The archaeological site of Göbekli Tepe - main excavation
  area.png** (1722×2269, CC BY 4.0, Saksan arkeologinen instituutti /
  E. Kücük, 2019).

### 11. Ararat

- **Nimi:** Ararat (fi-Wikipedia; **"Araratvuori" EI ole olemassa** —
  tarkistettu, sivu puuttuu). Virallisesti turkiksi Ağrı Dağı;
  armeniaksi Masis.
- **Tyyppi:** vuori (uinuva yhdistelmätulivuori, kaksi kartiota).
- **Koordinaatit:** 39,7019°N, 44,2983°E — en-Wikipedia "Mount
  Ararat" (coprop type=**mountain**, dim=10000).
- **Popup-teksti (n. 425 merkkiä):**

  > Suuri Ararat on Turkin korkein huippu, 5 137 metriä; sen vieressä
  > kohoaa Pieni Ararat, 3 896 metriä. Keskiajalta lähtien Euroopassa
  > vuori on samastettu Raamatun "Araratin vuoriin", joille Nooan arkin
  > kerrotaan laskeutuneen — vaikka kiistanalaista on, tarkoittaako
  > Genesis 8:4 juuri tätä vuorta. Ensimmäinen tunnettu nousu tehtiin
  > 1829: Friedrich Parrot, Khachatur Abovian ja neljä muuta.

- **Lähde:** en-Wikipedia "Mount Ararat", johdanto ("It consists of two
  major volcanic cones: Greater Ararat and Little Ararat. Greater
  Ararat is the highest peak in Turkey and the Armenian highlands with
  an elevation of 5,137 m; Little Ararat's elevation is 3,896 m. The
  first recorded efforts to reach Ararat's summit were made in the
  Middle Ages, and Friedrich Parrot, Khachatur Abovian, and four others
  made the first recorded ascent in 1829" · "the mountain has been
  called by the name Ararat since the Middle Ages, as it began to be
  identified with the 'mountains of Ararat' described in the Bible as
  the resting place of Noah's Ark, despite contention that Genesis 8:4
  does not refer specifically to a Mount Ararat").
  fi-Wikipedia "Ararat" (johdanto) antaa saman korkeuden ja lisää, että
  vuori oli viimeksi aktiivinen 1840.
- **Varmuus:** VARMA. Sanamuoto "ensimmäinen **tunnettu** nousu" on
  pakollinen — lähde puhuu ensimmäisestä kirjatusta noususta, ja
  keskiajalla on tehty yrityksiä. Sama varaus kuin Olympoksen
  Kakkalos-täkyssä (`takynostot-kreikka.md` ehdokas 12).
- **HERKKYYS:** vuori on Armenian kansallissymboli ja sen vaakunassa,
  vaikka se sijaitsee Turkin puolella rajaa. Lähde toteaa tämän itse.
  Popup mainitsee molemmat nimet (Ağrı Dağı, Masis) — se on tarkoitus.
  Rajakysymyksiä ei kommentoida.
- **Commons:** **00 2399 Mount Ararat, Turkey.jpg** (3300×2200,
  CC BY-SA 4.0, W. Bulach, 2006) tai **Ağrı Dağı (Mt. Ararat).jpg**
  (4764×3060, CC BY-SA 4.0, ender gürel, 2021). **VÄLTÄ**
  "Mount Ararat and the Yerevan skyline.jpg" — kuvattu Armenian
  puolelta, mikä ei sovi Turkin karttakohteeksi.

### 12. Vanjärvi

- **Nimi:** **Vanjärvi (Turkki)** — fi-Wikipedian artikkeliotsikko on
  täsmälleen tämä, sulkutarkenne mukaan lukien; "Van-järvi" ohjautuu
  sinne. Turkiksi Van Gölü.
- **Tyyppi:** järvi (suolainen sooda- eli natronjärvi, valuma-alue
  umpinainen).
- **Koordinaatit:** 38,63333°N, 42,81667°E — en-Wikipedia "Lake Van"
  (coprop type=**waterbody**, dim=10000).
- **Popup-teksti (n. 445 merkkiä):**

  > Vanjärvi on Turkin suurin järvi ja yksi maailman harvoista yli
  > 3 000 neliökilometrin umpijärvistä: tulivuorenpurkaus tukki sen
  > laskujoen esihistoriallisella ajalla. Vesi on niin emäksistä
  > (pH 9,7–9,8), ettei se yleensä jäädy talvellakaan. Pohjalta on
  > löydetty jopa 40 metriä korkeita mikrobialiittitorneja, joita
  > sinilevät ovat kasvattaneet. Pitkään järven ainoa tunnettu kala
  > oli inci kefali, helmisalakka.

- **Lähde:** en-Wikipedia "Lake Van", johdanto ("Lake Van... is the
  largest lake in Turkey... It is a saline soda lake... It is one of
  the world's few endorheic lakes... of size greater than 3,000 square
  kilometres... A volcanic eruption blocked its original outlet in
  prehistoric times... Despite the high altitude and winter averages
  below 0 °C, high salinity usually prevents it from freezing") · osio
  "Hydrology and chemistry" ("The lake water is strongly alkaline
  (pH 9.7–9.8)") · osio "Biology" ("Prior to 2018, the only fish known
  to live in the brackish water of Lake Van was Alburnus tarichi or
  Pearl Mullet (Turkish: inci kefali)... In 1991, researchers reported
  the discovery of 40 m (130 ft) tall microbialites in the lake").
- **Varmuus:** VARMA. HUOM sanamuoto "pitkään ainoa **tunnettu**
  kala" — vuonna 2018 löytyi uusi laji (*Oxynoemacheilus ercisianus*)
  mikrobialiitin sisältä.
- **ELÄINKYTKÖS (söpö):** järven seudulta on kotoisin harvinainen
  **vankissa**, jolla on lähteen mukaan "epätavallinen kiinnostus
  vettä kohtaan" (en-Wikipedia "Lake Van": "The region hosts the rare
  Van cat breed of cat, having – among other things – an unusual
  fascination with water"). Uiva kissa on erinomainen eläinnosto ja
  jatkaa Istanbulin kissalinjaa.
- **HAUSKA VARAUS:** järveen liittyy myös "Vanjärven hirviö"
  -legenda, josta ensimmäiset raportit ilmestyivät ottomaanilehdistössä
  jo 1889 (Saadet Gazetesi, numero 1323). Lähde toteaa suoraan, ettei
  siitä ole koskaan ollut todisteita — "Apart from some inconclusive
  amateur photographs and videos, there has never been any evidence of
  it." Jos hirviö otetaan mukaan, se on kerrottava tasan näin.
- **Commons:** **00 3385 Akdamar Island - Lake Van.jpg** (3300×2200,
  CC BY-SA 4.0, W. Bulach, 2006) tai **Van Lake View From Akdamar
  Island.jpg** (4608×3456, CC BY-SA 4.0, Airtag, 2020).

### 13. Mustameri

- **Nimi:** Mustameri (fi-Wikipedia, ei uudelleenohjausta).
  Turkiksi Karadeniz.
- **Tyyppi:** meri.
- **Koordinaatit:** 44°N, 35°E — en-Wikipedia "Black Sea"
  (coprop type=waterbody, **dim=800000**). **HUOM:** tämä on koko
  meren karkea keskipiste ja se osuu Turkin rannikon ulkopuolelle,
  Krimin suuntaan. Sama rajoitus kuin Egeanmerellä ja Joonianmerellä
  Kreikan listassa: sopii alueen nimeämiseen, EI täsmäklikkaukseen.
  Jos peli tarvitsee klikkauspisteen, se on valittava
  pelisuunnittelullisesti Turkin rannikon läheltä.
- **Popup-teksti (n. 425 merkkiä):**

  > Mustameri on maailman suurin meromiktinen vesialue: pinnalla
  > virtaa kevyt makea vesi ulos Bosporin kautta, pohjalla painuu
  > raskas suolainen vesi sisään, eivätkä kerrokset sekoitu. Siksi yli
  > 90 prosenttia meren syvästä vedestä on hapetonta. Juuri hapettomuus
  > on tehnyt siitä meriarkeologien unelman: puurunkoiset laivanhylyt
  > säilyvät pohjassa käytännössä lahoamatta.

- **Lähde:** en-Wikipedia "Black Sea", johdanto ("Denser, more saline
  water from the Aegean flows into the Black Sea underneath the less
  dense, fresher water that flows out of the Black Sea. This creates a
  significant and permanent layer of deep water that does not drain or
  mix and is therefore anoxic. This anoxic layer is responsible for the
  preservation of ancient shipwrecks which have been found in the Black
  Sea") · osio "Hydrology" ("The Black Sea is the world's largest body
  of water with a meromictic basin... over 90% of the deeper Black Sea
  volume is anoxic water") · osio "Marine archaeology" ("as a result of
  these characteristics the Black Sea has gained interest from the
  field of marine archaeology, as ancient shipwrecks in excellent
  states of preservation have been discovered, such as the Byzantine
  wreck Sinop D, located in the anoxic layer off the coast of Sinop,
  Turkey").
- **Varmuus:** VARMA — suoraan lähteessä.
- **AARREPELIKYTKÖS:** tämä on koko Turkin listan temaattisin kohde
  aarrepeliin: meri, jonka pohjassa aarteet eivät katoa. Sukua
  Antikytheran hylkytäylle (`takynostot-kreikka.md` ehdokas 6),
  mutta eri mekanismilla.
- **Commons:** **Black Sea Turkey Giresun.jpg** (1600×1200,
  CC BY-SA 4.0, Cardiodynia, 2020) tai **Samsun panorama Black Sea
  coast Turkey 2025.jpg** (2560×1920, CC BY-SA 4.0, Furkan Akkurt,
  2025) — molemmat Turkin rannikolta, mikä sopii kohteen sijaintiin
  paremmin kuin yleiset panoraamat.

### 14. Kızılırmak

- **Nimi:** Kızılırmak (fi-Wikipedia, ei uudelleenohjausta) — turkiksi
  "Punainen joki". Antiikissa **Halys** (Ἅλυς); heettiläisittäin
  Maraššantiya. **HUOM:** en-Wikipediassa pelkkä "Kızılırmak" on
  MONISELITESIVU; oikea artikkeli on "Kızılırmak River".
- **Tyyppi:** joki (Turkin pisin kokonaan maan sisällä virtaava joki,
  1 355 km).
- **Koordinaatit:** 41,73444°N, 35,95639°E — en-Wikipedia "Kızılırmak
  River" (dim=1000). **HUOM: tämä on joen SUU** Mustallamerellä
  Samsunin luoteispuolella, ei joen keskikohta. Artikkelin tekstistä
  saa myös lähteen (n. 39,8°N, 38,3°E) ja Halys-mutkan kääntöpisteen
  (n. 38,7°N, 34,8°E). Kartalla joki kannattaa piirtää viivana, ei
  pisteenä.
- **Popup-teksti (n. 440 merkkiä):**

  > Heettiläisille Maraššantiya oli valtakunnan länsiraja, ja
  > antiikissa Halys erotti Lyydian Persian valtakunnasta. Sen
  > rannalla käytiin 28. toukokuuta 585 eaa. "pimennyksen taistelu":
  > kesken taistelun aurinko pimeni, ja järkyttyneet osapuolet
  > solmivat rauhan siihen paikkaan. Kun Lyydian Kroisos vihdoin
  > ylitti joen 547 eaa. hyökätäkseen Kyyros Suurta vastaan, hän
  > hävisi — ja Persia ulottui Egeanmerelle asti.

- **Lähde:** en-Wikipedia "Kızılırmak River", johdanto ("historically
  known as the Halys River... is the longest river flowing entirely
  within Turkey... flows for a total of 1,355 kilometres") · osio
  "History" ("The Hittites called the river the Maraššantiya, and it
  formed the western boundary of Hatti, the core land of the Hittite
  empire... Until the Roman conquest of Anatolia the Halys River...
  served as a natural political boundary in central Asia Minor, first
  between the kingdom of Lydia and the Persian Empire... As the site of
  the Battle of Halys, or the Battle of the Eclipse, on May 28, 585 BC,
  the river formed the border between Lydia to the west and Media to
  the east until Croesus of Lydia crossed it to attack Cyrus the Great
  in 547 BC. He was defeated and Persia expanded to the Aegean Sea").
- **Varmuus:** VARMA kaikesta yllä olevasta. **EPÄVARMA / EI TÄSSÄ
  LÄHTEESSÄ:** kuuluisa tarina siitä, että Thales Miletoslainen
  ennusti pimennyksen, ja Delfoin oraakkelin vastaus Kroisokselle
  ("jos ylität Halysin, tuhoat suuren valtakunnan") EIVÄT kumpikaan
  löydy tästä artikkelista. Artikkeli mainitsee Thaleen vain siinä
  yhteydessä, että hänen kerrotaan käyttäneen varhaisia
  insinööritemppuja lyydialaisarmeijan siirtämiseksi joen yli. **Älä
  käytä pimennysennustusta tai oraakkelilausetta ilman uutta
  lähdettä** — vaikka ne olisivat kuinka houkuttelevia (oraakkeli
  sitoisi tämän suoraan Delfoin fokuskohteeseen).
- **Commons:** **Kızıl ırmak Bafra Samsun (64325689).jpeg**
  (2048×1360, CC BY 3.0, Sadi Sezgin, 2012) tai **Bafra kızılırmak
  bridge, kızılırmak delta.jpg** (4032×3024, CC BY-SA 4.0,
  Leyla kılınç, 2018).

---

## Yhteenveto: koordinaattitaulukko

| # | Kohde | Tyyppi | Koordinaatit | dim | Lähdeartikkeli |
|---|---|---|---|---|---|
| 1 | Troija | muu (arkeologinen) | 39,9575°N 26,23889°E | 1000 | Troy |
| 2 | Efesos | muu (arkeologinen) | 37,94111°N 27,34194°E | 1000 | Ephesus |
| 3 | Kappadokia | muu (alue) | 38,61833°N 34,86722°E | 1000 | Cappadocia |
| 4 | Pamukkale | muu (luonto + kaupunki) | 37,92389°N 29,12333°E | 10000 | Pamukkale |
| 5 | Ankara | kaupunki | 39,92889°N 32,85472°E | 1000 | Ankara |
| 6 | İzmir | kaupunki | 38,42444°N 27,13222°E | 1000 | İzmir |
| 7 | Bursa | kaupunki | 40,19722°N 29,06222°E | 1000 | Bursa |
| 8 | Konya | kaupunki | 37,87444°N 32,49306°E | 1000 | Konya |
| 9 | Trabzon | kaupunki | 41,005°N 39,7225°E | 1000 | Trabzon |
| 10 | Göbekli Tepe | muu (arkeologinen) | 37,22361°N 38,92167°E | 1000 | Göbekli Tepe |
| 11 | Ararat | vuori | 39,7019°N 44,2983°E | 10000 | Mount Ararat |
| 12 | Vanjärvi | järvi | 38,63333°N 42,81667°E | 10000 | Lake Van |
| 13 | Mustameri | meri | 44°N 35°E (yleispiste) | 800000 | Black Sea |
| 14 | Kızılırmak | joki | 41,73444°N 35,95639°E (SUU) | 1000 | Kızılırmak River |

(Pelilaatta Istanbul: 41,01361°N 28,955°E, dim=30000 — en-Wikipedia
"Istanbul". Ei oma kohde.)

**Tyyppijakauma:** 5 kaupunkia · 5 arkeologista/luonnonkohdetta ·
1 vuori · 1 järvi · 1 meri · 1 joki. Sama runko kuin Kreikan 14
kohteessa, mutta painopiste on siirretty vuorista arkeologiaan,
koska Turkin vahvin sisältö on kaivauksissa.

---

## Varalla / ei mukaan otettuja (koordinaatit tarkistettu)

Nämä kolme on haettu ja varmennettu, mutta jätetty 14 kohteen
rungon ulkopuolelle. Ne voi ottaa mukaan sellaisenaan, jos kohteita
halutaan lisää tai jokin yllä olevista pudotetaan.

- **Toros-vuoristo (Taurus):** 37°N, 33°E — en-Wikipedia "Taurus
  Mountains", coprop type=mountain, **dim=300000** (erittäin karkea
  piste; vuoristo ulottuu Eğirdir-järveltä Eufratin ja Tigriin
  yläjuoksulle). Vahvin sisältö: **Kilikian portti** (Gülekin sola),
  joka on ollut pääkulkureitti Anatolian ylätasangolta rannikolle
  antiikista asti. Korkein huippu Kızılkaya 3 771 m (Aladağlar).
  fi-Wikipediassa pelkkä "Toros" ei ole artikkeli — nimi on
  tarkistettava erikseen ennen käyttöä.
- **Marmaranmeri:** 40,66667°N, 28°E — en-Wikipedia "Sea of Marmara",
  type=waterbody, dim=150000. fi-nimi "Marmaranmeri" varmennettu.
  Jätetty pois, koska se on Istanbulin oma lähimeri ja siten
  käytännössä osa laatan maisemaa, ei erillinen "muualla maassa"
  -kohde. Jos merikohteita halutaan kaksi, tämä on luonteva pari
  Mustallemerelle (ja Bosporinsalmi yhdistää ne — ks.
  `takyt-istanbul.md` täky 14).
- **Nemrut Dağı:** 37,98056°N, 38,74083°E — en-Wikipedia "Mount
  Nemrut", type=mountain, dim=10000. Kuuluisat kolossaaliset
  jumalten päät hautakummun laella. **EI TARKISTETTU SISÄLLÖLTÄÄN**
  tässä erässä — vain koordinaatti haettu. Jos kohde otetaan, sen
  faktat on haettava erikseen.
- **Halikarnassos (Bodrum):** 37,03778°N, 27,42417°E — en-Wikipedia
  "Halicarnassus", type=landmark, dim=1000. Mausoleumi, toinen
  antiikin seitsemästä ihmeestä Turkin maaperällä, ja
  Herodotoksen kotikaupunki. **EI TARKISTETTU SISÄLLÖLTÄÄN** tässä
  erässä.

---

## Hylätyt / epävarmat

1. **Mustanmeren koordinaatti on karkea keskipiste** (44°N, 35°E,
   dim=800000) ja osuu Turkin rannikon ulkopuolelle. Sama ongelma
   kuin Egeanmerellä ja Joonianmerellä Kreikan listassa. Jos peli
   tarvitsee tarkan klikkauspisteen, se on valittava
   pelisuunnittelullisin perustein Turkin rannikolta (esim. Sinopin
   niemi tai Samsunin edusta), EI tästä faktapohjasta.

2. **Kızılırmakin koordinaatti on joen SUU**, ei joen keskikohta tai
   sen tunnetuin kohta. Joki on 1 355 km pitkä ja tekee laajan
   "Halys-mutkan"; jos se piirretään kartalle viivana, mutkan
   kääntöpiste (n. 38,7°N, 34,8°E) on visuaalisesti tärkeämpi kuin
   suu. Molemmat luvut ovat lähteessä.

3. **Kappadokian dim on 1000**, vaikka kyseessä on kokonainen
   historiallinen alue useassa maakunnassa. Piste ei siis kuvaa
   alueen laajuutta. Jos kartalla halutaan näyttää alue eikä pistettä,
   rajaus on piirrettävä muualta kuin tästä koordinaatista.

4. **Thales ja Kroisoksen oraakkelilause.** Molemmat ovat maailman
   tunnetuimpia Halys-tarinoita, ja oraakkelilause olisi ollut
   täydellinen silta Delfoin fokuskohteeseen. Kumpaakaan EI löydy
   en-Wikipedian "Kızılırmak River" -artikkelista siinä muodossa
   (pimennysennustus / "tuhoat suuren valtakunnan"). Hylätty tästä
   faktapohjasta; jos Fable haluaa ne, tarvitaan uusi tarkistus
   toisesta artikkelista (esim. "Battle of Halys" tai "Croesus").

5. **Göbekli Tepen tarkoituksellinen hautaaminen.** Hylätty
   kokonaan; lähde toteaa hypoteesin hylätyksi. Ks. kohde 10.

6. **İzmirin ja Trabzonin 1900-luvun tapahtumat** (1922 Smyrna,
   1923 väestönvaihto, pontoskreikkalaisten karkotus). Kaikki ovat
   artikkeleissa, ja kaikki on rajattu popup-teksteistä pois.
   Peli kulkee Kreikasta Turkkiin, ja molempien maiden käsittely on
   pidettävä kunnioittavana; nämä aiheet vaativat Fablen erillisen
   linjauksen, eivät pop-up-ruutua. Sama periaate kuin
   `fokuskohteet-kreikka.md`:n Ali-pasha- ja
   Taygetos-rajauksissa.

7. **Kolme kuvaehdokasta osoittautui ongelmallisiksi** ja on
   merkitty kohteittain, jotta väärä tiedosto ei siirry koodiin:
   Pamukkalen Galeotti-kuva nro 01 (`Restrictions: personality` —
   hylätty), Pamukkalen ja muurien A.Savin-kuvat sekä Tünelin
   A.Savin-kuvat (**FAL**, ei CC — vapaa lisenssi, mutta jos
   pelin sääntö on tiukka "PD/CC", nämä eivät kelpaa), ja SALTOnlinen
   Ankara- ja Konstantinuksen pylväs -kuvat (lisenssikenttä lukee
   "No restrictions" eikä nimettyä CC-lisenssiä — tarkistettava
   Commonsin sivulta).

8. **İzmirin Konakin kellotorni (1901) on ajoitusansa.** Se on
   kaupungin tunnetuin kuva-aihe, mutta se rakennettiin 28 vuotta
   isoisän matkan jälkeen. Kuvatekstissä ei saa vihjata, että hän
   olisi nähnyt sen.
