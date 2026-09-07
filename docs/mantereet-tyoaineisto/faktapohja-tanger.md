# Tanger — faktakoostaja, uusi kaupunkilehti

Lauta-id `africa`, kaupunki-id `tanger`, en-Wikipedia "Tangier".
Kaikki tiedot haettu en-Wikipedian raakatekstistä
(`index.php?action=raw`, `NODE_USE_ENV_PROXY=1`, uusinnat kasvavalla
viiveellä) **7.9.2026**. Mitat ja säännöt luettu tiedostoista
`tools/parvi/kaupunkilehti-ohje.md`,
`tools/parvi/agentin-yhteiset-saannot.md`,
`docs/aasia-tyoaineisto/lehtityo-resepti.md` (SITOVA),
`docs/moduulit/kaupunkilehti.md`,
`docs/mantereet-tyoaineisto/spec-mantereet.md` ja
`docs/tyolista-opukselle.md` (paketti O9, ETUSIVUKUVAN KAAVA,
kustannussääntö). Esikuvana `faktapohja-halifax.md` ja repon tuorein
lehtilohko (halifax, `js/packs/kulttuuri-kategoriat.js`).

Luetut lähdeartikkelit (en-Wikipedia, 7.9.2026): **"Tangier"**
(Names, History, Geography, Climate, Economy, Notable landmarks,
Transport, Culture), **"Tangier International Zone"**, **"Tingi"**,
**"Cape Spartel"**, **"Caves of Hercules"**, **"Grand Socco"**,
**"Petit Socco"**, **"American Legation, Tangier"**, **"Kasbah
Palace, Tangier"**, **"St Andrew's Church, Tangier"**, **"Grand
Mosque of Tangier"**, **"Hotel Continental (Tangier)"**, **"Gran
Teatro Cervantes"**, **"Café Hafa"**, **"Mendoub's Residence"**,
**"Ibn Battuta"**, **"Strait of Gibraltar"**, **"Tanger Med"**,
"Paul Bowles", "Mohamed Choukri", "Hassan I of Morocco".

## 0. Mitä repossa jo on (luettu ristiriitojen varalta)

- `js/packs/africa-artikkelit.js` avain **Tanger**: `intro` on vanhaa
  mallia (4 virkettä) ja `artikkeli` kolmiosainen Lue lisää -teksti.
  Resepti (21.8.2026) vaatii introksi 7–10 virkkeen etusivun
  leipätekstin, ~700–1100 mrk, 2–3 kappaletta, 1–3 boldausta →
  **intro kirjoitetaan uusiksi, `artikkeli` jätetään ennalleen.**
- `js/packs/africa-saapumiset.js` avain `tanger`: saapumisteksti on
  valmis (laiva kääntyy lahteen, valkoiset talot rinteessä, kahden
  meren ja kahden mantereen portti). **Ei kosketa** — omistajan
  linjaus 17.8.2026 kieltää matkakirjatekstit uusiin kohteisiin.
  1873-kehys viedään siksi lehden omaan nostoon, ei saapumiseen.
- `js/packs/africa-kulttuuri.js` avain `tanger`: litteät nostot
  (Matissen "La Fenêtre à Tanger", minttutee, gnawa-musiikki) ja
  **kulttuurivisa: "Kuka kuuluisa taidemaalari työskenteli
  Tangerissa talvina 1912–1913?" → Henri Matisse.** Kun kaupunki saa
  kategoriat, litteät nostot eivät enää näy, joten **Matisse on
  saatava kansisivun nostoihin** (kaupunkilehti.md: "Varmista, että
  visan opettava nosto on kategorioissa näkyvillä"). Minitehtävä EI
  saa kysyä Matissesta.
- `js/packs/africa-valokuvat.js` avain `tanger`: ennen–nyt-pari on jo
  tarkistettu (Grand Socco 1900-luvun alku / Tanger Bay nykyään) ja
  lisäkuvina satamanäkymä 2015 ja Cap Spartelin majakka 2015.
  **Ennen–nyt kopioidaan lehteen tiedostonimineen, vuosineen ja
  lähderiveineen; vain selitteet kirjoitetaan uudestaan yhdeksi
  virkkeeksi** (kaupunkilehti.md:n ohje). Lähdemuoto muutetaan
  lehden muotoon "Tekijä, Wikimedia Commons (LISENSSI)".
- `js/packs/maastokohteet-mar.js` ja `js/packs/skandaalit.js`:
  Marokon karttanostot on jo tehty — luettu, ei toisteta.
- `js/packs/maa-kategoriat.js` **MAR**: maalehden aiheet ovat
  Historia (Idris I, al-Qarawiyyin, kolmen kuninkaan taistelu,
  al-Mansur), Ruoka (argan, pastilla, ras el hanout, harira),
  Käsityö (Chouaran parkitsemo, zellij, Fèsin kello, Safin savi),
  Musiikki (al-Ala, malhun, Nass El Ghiwane, ahwash) ja Luonto
  (atlaksensetri, atlasleijona, Merja Zerga, Ouzoud).
  **Yksikään Tangerin nosto ei saa toistaa näitä.**

## 1. Perustiedot

- Tanger on kaupunki Marokon luoteiskulmassa, sekä Välimeren että
  Atlantin rannalla; Tanger-Tetouan-Al Hoceiman alueen ja
  Tanger-Assilahin prefektuurin pääkaupunki ("Tangier", johdanto).
- Keskusta on noin **14 mailia (n. 22 km) Cap Spartelista itään**,
  Gibraltarinsalmen eteläpuoliskolla, Tangerin lahden luoteispäässä
  kahden kukkulan välissä. Lahti oli historiallisesti Marokon
  rannikon paras luonnonsatama, kunnes laivojen koko kasvoi.
  Maasto nousee vähitellen, mikä tekee kaupungista amfiteatterin;
  kauppakortteli on keskellä. Läntisellä kukkulalla (fr *La
  Montagne*) on kasbah, itäinen kukkula on Cap Malabata.
  **Marshan on noin 1300 jaardin (n. 1,2 km) mittainen tasanko
  keskustasta länteen meren rantaa pitkin.** ("Tangier", Geography.)
- Väkiluku: **noin 850 000 (2014)**, kun se 32 vuotta aiemmin oli
  250 000 (1982). ("Tangier", Economy.)
- Kaupunki on Marokon toiseksi tärkein teollisuuskeskus Casablancan
  jälkeen; neljä teollisuuspuistoa, joista kahdella vapaa-alueen
  asema. (Economy.)

## 2. Nimi ja antiikki

- Karthagolainen nimi esiintyy muodoissa *tng*, *tngʾ*, *tyngʾ*,
  *ttgʾ*; kreikkalais-roomalaisissa lähteissä *Tenga*, *Tinga*,
  *Titga*. Vanha berberinimi on **Tingi**, joka liittyy sanaan
  *tingis*, "suo". Kreikkalaiset selittivät nimen myöhemmin
  **Tinjiksellä**, titaani Atlaksen tyttärellä. (Names.)
- Latinan *Tingis* → portugalin *Tânger*, espanjan *Tánger*,
  ranskan *Tanger*, englannin *Tangier*. Arabian ja tamazightin
  nimi on *Ṭanjah*. (Names.)
- Perustettu **foinikialaisena siirtokuntana, mahdollisesti jo
  1000-luvulla eKr. ja lähes varmasti 700-luvulla eKr.** Berberien
  haudoissa Tangerin ympärillä oli puunilaisia koruja 500-luvulla
  eKr. Karthagolaiset kehittivät sen tärkeäksi satamaksi 400-luvulla
  eKr. Kaupunki säilytti foinikialaiset perinteensä pitkään:
  mauretanialaiskuninkaiden pronssirahoissa oli puunilaista
  kirjoitusta, ja roomalaisajan rahoissa etupuolella Augustus ja
  Agrippa latinaksi mutta kääntöpuolella kanaanilainen jumala Baal.
  (History, Ancient.)
- Kreikkalainen legenda: **Tinjis, Atlaksen tytär ja Antaioksen
  leski, sai Herakleen kanssa pojan Syfaksin**, joka perusti sataman
  ja nimesi sen äitinsä mukaan. Antaioksen jättiläisluuranko ja
  hauta olivat antiikin matkailijoiden nähtävyyksiä. **Herkuleen
  luolat Cap Spartelilla ovat yhä.** (History, Ancient.)
- Quintus Sertorius otti Tingiksen haltuunsa muutamaksi vuodeksi
  70-luvulla eKr.; vapaakaupunki Bocchus II:n aikana 38 eKr.;
  kunnalliset oikeudet Augustukselta ja **roomalainen colonia
  Claudiuksen aikana, jolloin siitä tuli Mauretania Tingitanan
  provinssin pääkaupunki**. Diocletianuksen 291 uudistuksissa
  comesin ja praesesin istuinpaikka. (History, Ancient.)
- Vandaalit Gaisericin johdolla ylittivät salmen **429 jaa.**;
  Belisarios valtasi kaupungin takaisin Bysantille **533**.
  Kaupunki kaatui muslimien piiritykseen joskus **707–711**, ja
  Tangerissa toiminut Musa bin Nusayrin sijainen **Tariq ibn Zayid**
  aloitti Espanjan valloituksen. (History, Medieval.)
- **Ibn Battuta syntyi Tangerissa 1304 ja lähti kotoa 20-vuotiaana
  hajjille.** ("Tangier", Medieval; tarkennukset "Ibn Battuta".)

## 3. Portugali, Englanti ja alaouiitit

- Portugalilaiset epäonnistuivat 1437, 1458 ja 1464 mutta
  **miehittivät kaupungin vastarinnatta 28. elokuuta 1471**, kun
  varuskunta pakeni kuultuaan Asilahin valtauksesta. Päämoskeija
  muutettiin katedraaliksi. Wattasidit hyökkäsivät 1508, 1511 ja
  1515 tuloksetta.
- **Iberian valta päättyi 1661, kun Tanger annettiin Englannin
  Kaarle II:lle osana Katariina Braganzalaisen myötäjäisiä.**
  Amiraali Edward Montagun laivue saapui marraskuussa, ja
  **englantilaiset ottivat kaupungin täysin haltuunsa tammikuussa
  1662.** Kaarle kutsui sitä nimellä "a jewell of immense value in
  the royal diadem".
  *Ristiriita:* "Grand Mosque of Tangier" sanoo "In 1662 Tangier was
  passed to the English"; pääartikkeli erittelee luovutuksen 1661 ja
  haltuunoton tammikuussa 1662. **Lehteen kirjoitetaan tarkempi
  versio: sovittiin 1661, haltuunotto tammikuussa 1662.**
- Englantilaiset rakensivat sataman aallonmurtajan (mole): se maksoi
  **340 000 puntaa ja ylsi 1436 jalkaan** ennen tuhoamistaan.
  Kustannukset paisuivat tuhlauksesta ja petoksista; hyötyjien
  joukossa oli Samuel Pepys.
- **Sulttaani Moulay Ismailin piiritys 1678–1680 ei onnistunut**,
  mutta parlamentti kyllästyi kuluihin 1680. Lordi Dartmouthin
  joukot (Pepys mukana) tuhosivat kaupungin ja satamalaitteet viiden
  kuukauden ajan, ja **Marokko otti kaupungin haltuunsa
  7. helmikuuta 1684.** Väkiluku oli lopussa noin 700 siviiliä ja
  tuhannen miehen varuskunta.
- Ali ibn Abdallah ja hänen poikansa Ahmed ibn Ali hallitsivat
  kaupunkia vuoteen 1743 ja asuttivat sen uudelleen maaseudulta.
  Espanja hyökkäsi kaupunkiin 1790.

## 4. Diplomatian pääkaupunki ja isoisän matkavuosi 1873

- **1700-luvulta lähtien Tanger toimi Marokon diplomaattisena
  pääkaupunkina.** Yhdysvallat avasi ensimmäisen konsulaattinsa
  Tangerissa George Washingtonin presidenttikaudella. **Vuonna 1821
  sulttaani Moulay Slimane lahjoitti Yhdysvalloille kaupunkitalon**
  — siitä tuli Yhdysvaltain valtion ensimmäinen omistama kiinteistö
  ulkomailla. (Internationalisation; "American Legation, Tangier".)
- Britannia saartoi sataman 1828 merirosvouden takia. Ranska
  **pommitti Tangeria 6. elokuuta 1844** Joinvillen prinssin
  johdolla; linnoitukset vaurioituivat vähän ja englantilaiset
  insinöörit korjasivat ne myöhemmin.
- **Giuseppe Garibaldi asui Tangerissa maanpaossa vuodesta 1849**
  Rooman tasavallan kukistumisen jälkeen.
- Yhdysvaltain sisällissodan aikana sattui pieni selkkaus
  ("Tangier Difficulty"), kun Yhdysvaltain konsuli pidätytti kaksi
  konfederaation miestä; paikallinen eurooppalaisyhteisö vastusti.
  (Konsulaatin artikkeli ajoittaa vangitsemisen vuoteen 1862.)
- **1873-KEHYS.** "Tangier", Internationalisation: *"By the 1870s,
  it was the site of every foreign embassy and consul in Morocco but
  only held about 400 foreign residents out of a total population of
  around 20,000."* Isoisän matkavuonna Tanger oli siis pieni,
  parinkymmenentuhannen asukkaan satamakaupunki, jossa oli koko
  Marokon diplomaattikunta ja vain nelisensataa ulkomaista asukasta.
  Sulttaanina oli **Hassan I (1873–1894)**; hän yöpyi Tangerin
  kasbahin palatsissa 1889 ("Kasbah Palace, Tangier") ja lahjoitti
  1880 maan brittiyhteisölle kirkkoa varten ("St Andrew's Church").
  Satamalaitteet paranivat vasta **1907** (sisä- ja ulkomoolo), ja
  ensimmäinen marokkolainen sanomalehti *Lisan al-Maghrib*
  perustettiin Tangeriin **1905** sulttaani Abdelazizin käskystä.
- Ennen ensimmäistä maailmansotaa väkiluku oli noin **40 000**:
  puolet muslimeja, neljännes juutalaisia, neljännes eurooppalaisia
  kristittyjä; eurooppalaisista noin kolme neljäsosaa espanjalaisia
  käsityöläisiä ja työläisiä.

## 5. Kansainvälinen vyöhyke 1923–1956

- **Tangerin kansainvälinen vyöhyke luotiin Ranskan, Espanjan ja
  Britannian yhteishallintoon Pariisissa 18. joulukuuta 1923
  allekirjoitetulla sopimuksella.** Ratifioinnit vaihdettiin
  Pariisissa 14. toukokuuta 1924, ja sopimus rekisteröitiin
  Kansainliiton sopimussarjaan 13. syyskuuta 1924. Heinäkuun 1928
  pöytäkirja nosti Italian asemaa.
- **Pinta-ala 373 km²**; 1930-luvun puolivälissä noin **50 000
  asukasta: 30 000 muslimia, 12 000 juutalaista ja runsaat 8 000
  eurooppalaista.** Huipussaan 1940-luvulla kaupungissa oli 22 000
  juutalaista. Hyvin vapaa talous- ja verolainsäädäntö teki siitä
  veroparatiisin, jossa kaupankäynti oli täysin vapaata.
- Espanjan joukot miehittivät Tangerin **14. kesäkuuta 1940**, samana
  päivänä kun Pariisi antautui; alue palautettiin sotaa edeltäneeseen
  asemaansa **11. lokakuuta 1945**.
- Kansainvälinen asema teki kaupungista itsenäisyysliikkeen
  kokoontumispaikan: **kansallinen rintama perustettiin Tangerissa
  1951**. Suojelijavallat sopivat Rabatissa heinäkuussa 1952
  vyöhykkeen lakkauttamisesta, ja **Tanger liittyi muuhun Marokkoon
  1956**; luovutushetkellä kaupungissa oli noin 40 000 muslimia,
  31 000 kristittyä ja 15 000 juutalaista. Tangerin pöytäkirja
  allekirjoitettiin **29. lokakuuta 1956.**

## 6. Taide ja kirjallisuus

- **Eugène Delacroix** matkusti Marokkoon 1832 kreivi de Mornayn
  seurueessa. Hän palasi luonnoksiinsa loppuiäkseen; noin
  **80 öljymaalausta**, mm. *The Fanatics of Tangier* ja *Women of
  Algiers*, vaikuttivat Van Goghiin, Gauguiniin ja Picassoon.
  Cézanne kirjoitti valosta: *"All this luminous colour… it enters
  the eye like a glass of wine running into your gullet and it makes
  you drunk straight away."* (Culture.)
- **Henri Matisse** oleskeli Tangerissa useaan otteeseen ja majoittui
  aina Grand Hôtel Villa de Franceen. Hän kirjoitti: *"I have found
  landscapes in Morocco exactly as they are described in Delacroix's
  paintings."* Hänen kauttaan vaikutus jatkui mm. kalifornialaiseen
  Richard Diebenkorniin. **Matissen 1913 maalaus *Landscape Viewed
  from a Window* esittää Pyhän Andreaksen kirkkoa** ("St Andrew's
  Church, Tangier"). Repon oma kuvateksti ja visa ajoittavat
  oleskelun talviin **1912–1913**.
- Kaupungissa asuivat tai vierailivat George Orwell, **Paul
  Bowles**, Tennessee Williams, **William S. Burroughs**, Allen
  Ginsberg, Jack Kerouac, maalari Brion Gysin ja Rolling Stones.
- **Paul Bowles asui ja kirjoitti kaupungissa yli puoli
  vuosisataa.** Piiriin kuuluivat myös Jean Genet, **Mohamed
  Choukri** (Pohjois-Afrikan luetuimpia ja kiistellyimpiä
  kirjailijoita), Abdeslam Boulaich, Larbi Layachi, Mohammed Mrabet
  ja Ahmed Yacoubi. Choukrin **For Bread Alone** kirjoitettiin
  klassisella arabialla, ja englanninnos syntyi tiiviissä
  yhteistyössä Bowlesin kanssa, joka teki käännöksen ja kirjoitti
  esipuheen. Tennessee Williams luonnehti kirjaa: *"a true document
  of human desperation, shattering in its impact."*
- **Burroughs asui Tangerissa neljä vuotta ja kirjoitti siellä
  *Naked Lunchin*, jonka tapahtumapaikka Interzone viittaa
  kaupunkiin.**

## 7. Kohdekartan kahdeksan kohdetta (koordinaatit ja perustelut)

Koordinaatit en-Wikipedian `list=geosearch`-rajapinnasta 7.9.2026
(pyöristämättä). Pienin keskinäinen väli on 207 m
(suurmoskeija – Amerikan lähetystö); 200 metrin sääntö pitää.

| # | Kohde | lat | lon |
| --- | --- | --- | --- |
| 1 | Mendoubin residenssi | 35.791386 | −5.824858 |
| 2 | Café Hafa | 35.791500 | −5.821800 |
| 3 | Kasbahin palatsi | 35.788611 | −5.812778 |
| 4 | Hotelli Continental | 35.787500 | −5.809444 |
| 5 | Suurmoskeija | 35.785556 | −5.809444 |
| 6 | Pyhän Andreaksen kirkko | 35.784722 | −5.823056 |
| 7 | Amerikan lähetystö | 35.783980 | −5.810680 |
| 8 | Gran Teatro Cervantes | 35.782000 | −5.810700 |

**Pois jätetyt ja miksi.** *Petit Socco* on vain 158 m Amerikan
lähetystöstä, *Beit Yehudan synagoga* 68 m Petit Soccosta ja
*Immaculate Conceptionin kirkko* 156 m lähetystöstä — kaikki alle
200 metrin säännön; medina on liian tiheä useammalle merkille.
*Kasbahin moskeija* on 66 m kasbahin palatsista. *Ibn Battutan
hauta* on lehden oman noston aihe. *Cap Spartel* ja *Herkuleen
luolat* ovat 14–15 km keskustasta eivätkä mahdu ruutuun; ne
mainitaan matkaoppaassa. *Abdelhafidin palatsi* on 167 m Pyhän
Andreaksen kirkosta.

Kohteiden faktat (kaikki en-Wikipediasta 7.9.2026):

1. **Mendoubin residenssi** (Dar al-Mandub). Kansainvälisen
   vyöhykkeen hallinto kuului siirtomaavaltojen nimittämälle
   hallintomiehelle ja sulttaanin henkilökohtaiselle edustajalle,
   jota vuodesta 1923 kutsuttiin **mendoubiksi**. Mendoubin
   päätoimipaikka oli entisessä Saksan konsulaatissa
   (Mendoubia). **Residenssin rakennutti 1929 mendoub Mohammed
   Tazi.** Malcolm Forbes osti tontin **1970** ja teki siitä
   museon: **115 000 tinasotilasta**, joilla esitettiin historian
   taisteluita; puutarhassa 600 figuuria esitti kolmen kuninkaan
   taistelua. Museo suljettiin 1990-luvulla, ja 60 000 esinettä
   huutokaupattiin Christie'sillä joulukuussa 1997 yhteensä
   700 000 dollarilla. Marokon valtio osti kiinteistön, joka
   toimii nykyään virallisten vieraiden residenssinä eikä ole
   yleisölle avoin. Tontin koko 10 eekkeriä, osoite Mohammed
   Tazin katu Marshanissa.
2. **Café Hafa**. Avattu **1921**, sijaitsee kalliojyrkänteellä
   Tangerin lahden yllä; alkuperäinen sisustus ja monta
   terassitasoa, joilta näkyy Gibraltarinsalmi ja kaukana Espanjan
   Tarifa. Vieraisiin ovat kuuluneet mm. Beatles ja Rolling
   Stones. Laulaja-lauluntekijä Luis Eduardo Aute omisti kahvilalle
   kappaleen "Hafa Café" levyllään *Slowly*.
3. **Kasbahin palatsi** (Dar al-Makhzen). Rakennettu sulttaani
   Moulay Ismailin aikana 1700-luvun alussa **englantilaisten
   "Upper Castlen" raunioille**; rakennuttaja oli pasha Ahmad ben
   Ali al-Rifi. Kaupungin korkeimmalla kohdalla, kaksi sisäpihaa,
   puukatot, marmorisuihkulähteet ja arabeskit; päähovin
   marmorikapiteelit tuotiin todennäköisesti Italiasta.
   **Museona vuodesta 1922**, nimeltään Välimeren kulttuurien museo
   vuoden 2016 peruskorjauksen jälkeen. Antiikin museo entisessä
   keittiössä: löytöjä Lixuksesta, Cottasta ja Volubiliksesta sekä
   luonnollisen kokoinen karthagolainen hauta. Nykytaiteen tila
   avattiin loppuvuodesta 2021 entiseen vankilaan, joka oli
   käytössä 1970-luvun alkuun. **Sulttaani Hassan I yöpyi täällä
   1889.**
4. **Hotelli Continental**. Rakennettu **1870**, Tangerin
   vanhimpia hotelleja; perustajina Ben Dahanit, vanha
   tangerilainen juutalaissuku. 1800-luvun vieraskirjassa on mm.
   Edgar Degas ja Winston Churchill sekä beat-runoilijoita.
   Bernardo Bertoluccin *Suojaava taivas* kuvattiin osin täällä.
   Medinassa, osasta huoneita näkyy satamaan.
5. **Tangerin suurmoskeija**. Paikalla uskotaan olleen roomalainen
   Herkuleen temppeli ja 400-luvun kirkko. Perjantaimoskeija
   perustettiin marinidien aikana; **portugalilaiset muuttivat sen
   katedraaliksi 1471**, ja **Moulay Ismail määräsi sen takaisin
   moskeijaksi 1684** kuvernööri Ali ibn Abdallah Errifin kautta.
   Uusi moskeija oli karu, ja sulttaani **Moulay Slimane järkyttyi
   sen kunnosta nähdessään sen 1815** ja määräsi täydellisen
   uudelleenrakennuksen, joka valmistui **1817–18**; nykyinen muoto
   on siitä. Moskeijan lähellä olivat qadin talo, muwaqqitin eli
   ajanmäärittäjän talo (yhdistetty minareettiin ilmasillalla),
   vesisäiliö, maristan eli mielisairaala ja vainajien pesuhuone.
   Käännynnäisyys: moskeija on yhä käytössä eikä avoin
   ei-muslimeille. Kadun toisella puolella on 1800-luvun lopun
   suihkulähde, kunnostettu 1918 ja 2003. Hassan II laajensi
   moskeijaa 1962.
6. **Pyhän Andreaksen kirkko**. **Hassan I lahjoitti 1880 maan
   brittiyhteisölle**; ensimmäinen kirkko kävi pian ahtaaksi, uusi
   rakennus valmistui **1894** ja **vihittiin 1905**. Sisustus
   yhdistää tyylejä, erityisesti maurilaista; **kellotorni on
   minareetin muotoinen** ja katsoo viereiselle hautausmaalle.
   Muistolaatta **Emily Keenelle (1849–1944)**, Wazzanin sherifalle,
   joka toi kolerarokotteen Marokkoon. Hautausmaalla lepäävät mm.
   kirjailija ja diplomaatti **Walter Burton Harris (1866–1933)** ja
   Marokon armeijan komentaja **Sir Harry MacLean (1848–1920)**.
   Kirkko kuuluu Gibraltarin arkkidiakonaattiin.
7. **Amerikan lähetystö**. Perustettu **17. toukokuuta 1821**;
   sulttaani **Mohammed ben Abdallah oli tunnustanut Yhdysvaltain
   itsenäisyyden 20. joulukuuta 1777 ensimmäisenä valtiona**.
   Rakennus oli **Yhdysvaltain ensimmäinen ulkomailla omistama
   julkinen kiinteistö ja on ainoa U.S. National Historic Landmark
   ulkomailla**; se toimi diplomaattisena postina **140 vuotta** —
   pisimpään kuin mikään Yhdysvaltain rakennus ulkomailla.
   Toisessa maailmansodassa se toimi tiedustelun päämajana.
   Diplomaattinen pääkaupunki siirtyi Rabatiin 1956, minkä jälkeen
   rakennus rappeutui; **1976 amerikkalaiset perustivat yhdistyksen
   sen pelastamiseksi**. Nykyään TALIM: museo, tutkimuskirjasto ja
   kulttuurikeskus, jonka ohjelmaan kuuluu arabian
   lukutaitokursseja medinan naisille. Listattu National Register
   of Historic Placesiin 1981 ja National Historic Landmarkiksi
   seuraavana vuonna.
8. **Gran Teatro Cervantes**. Espanjalaisten rakentama teatteri,
   omistettu Miguel de Cervantesille. **Peruskivi laskettiin
   2. huhtikuuta 1911** juhlallisessa seremoniassa, ja rakennus
   **valmistui ja vihittiin 1913**. Rakennustyötä johtivat
   Esperanza Orellana ja hänen miehensä Manuel Peña, omistajana
   Antonio Gallego. **1400 paikkaa.**

## 8. Sää ja matkaopas

Säärivin tekee erillinen agentti (Open-Meteo). Oppaan sääjakso
kirjoitetaan en-Wikipedian sääruudusta ja se sanotaan ääneen.
Sääruudun asema: **Tangerin lentoasema 1961–1990, ääriarvot
1917–1963.**

- Ilmasto on välimerellinen (Köppen **Csa**); sateita enemmän kuin
  useimmissa Pohjois-Afrikan ja lähialueen Iberian osissa avoimen
  sijainnin takia. Vallitsevat tuulet puhaltavat mereltä. Kesät
  suhteellisen kuumia ja aurinkoisia, talvet sateisia ja leutoja.
  **Halla on harvinaista; uusi pakkasennätys −4,2 °C tammikuussa
  2005.**
- Vuoden keskilämpö **17,7 °C**, keskiylin 21,8 °C, keskialin
  13,6 °C. Tammikuun keskilämpö 12,5 °C, elokuun 23,9 °C.
- Sademäärä **735,9 mm vuodessa, 87,6 sadepäivää**; joulukuu
  129,3 mm, heinäkuu 2,1 mm. Aurinkoa **2960,7 tuntia vuodessa**.
- Liikenne: **Tanger-Villen asemalta radat Rabatiin, Casablancaan ja
  Marrakechiin sekä Fèsiin ja Oujdaan (ONCF).** Afrikan ensimmäinen
  suurnopeusjuna, Kenitra–Tanger-rata, vihittiin marraskuussa 2018;
  Casablancaan **2 h 10 min**. Ibn Batouta -lentoasema on 15 km
  lounaaseen. **Lauttoja päivittäin Tanger-Villestä Tarifaan ja
  Tanger-Medistä Algecirasiin**, kaksi lähtöä viikossa Gibraltariin.
- **Tanger Med** on 40 km kaupungin ulkopuolella; rakentaminen alkoi
  2004 ja satama avautui 2007. Sen liikenteestä **85 % on
  transhipmentiä** ja 15 % kotimaan tuontia ja vientiä.
- Medinan käsityö keskittyy nahkaan, puu- ja hopeatöihin,
  perinneasuihin ja marokkolaisiin jalkineisiin. Kaupunki on
  kuulu **mandariineista (tangerine)**, joita kasvatettiin medinan
  eteläpuolisissa tarhoissa mutta joita ei juuri viety maasta; jo
  1900 kulutus ylitti tuotannon.
- **Cap Spartel** ja **Herkuleen luolat**: majakka ja luolat
  kaupungin länsipuolella (omat artikkelit luettu; luolat ovat
  antiikin ajoista matkailijoiden kohde).

## 9. Minitehtävä ja visa

Kulttuurivisa kysyy Matissesta → **minitehtävä ei saa kysyä
maalareista.** Teemasivun tehtäväksi ehdotetaan Ibn Battutan
lähtöikää (20 vuotta) tai kansainvälisen vyöhykkeen päättymisvuotta
(1956); kummankin vastaus on samalla sivulla.

## 10. Sisältörajaukset

Ei nykypolitiikkaa eikä nykykonflikteja. Länsi-Saharan asemaa,
Marokon ja Espanjan nykysuhteita, siirtolaisuutta salmen yli eikä
salakuljetusta ei käsitellä. Uskonto historiallis-kulttuurisena
ilmiönä. Kansainvälisen vyöhykkeen vakoilu- ja huumemaine kerrotaan
vain siltä osin kuin se on kirjallisuushistoriaa.
