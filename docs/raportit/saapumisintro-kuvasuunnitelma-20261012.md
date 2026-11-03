# Euroopan kaupunkien saapumisintron kahdeksan kuvaa: suunnitelma ja Codex-ohjemalli

Sisältökirjuri 12.10.2026 (PT:n tilaus omistajan pyynnöstä). **Mitään ei ole tilattu**; omistaja hyväksyy määrän ensin. Lähteet: `js/packs/kulttuuri-kategoriat.js` (origin/main, kaupunki-lohkon `avauskuvat` ja `kansikuvat`, `lahde`), `docs/raportit/aanet-eurooppa-inventaario-20261011.md` (nopea intro), Raamattu (ALOITUSKAUPUNKI JA KAUPUNGIN INTRO, SOITTOSÄÄNTÖ).

Kuvamalli kaupunkia kohden (8): **1–3** nykyiset herokuvat · **4** arki ja ihmiset · **5** vesi tai luonto · **6** paikallinen yksityiskohta lähikuvana · **7** ilta ja valot · **8** sama näkymä vuonna 1873 tarkkana havainnekuvana (siirtymä isoisän maailmaan). Uusia kuvia siis **5 per kaupunki**.

## 1. Mitkä kaupungit ovat mukana

"Saapumisintro" on pelissä kaksiosainen: (a) kaupungin nopea intro-kappale `musa-kaupunki-<id>-nopea-lyria-v2` (Raamattu: tehdään kaikille Euroopan kaupungeille), (b) aloituskaupunkien 18 s kuvaintro (William + nopea kappale + avauskuvat 3 s välein). Rajaus tässä suunnitelmassa: kaupungit, joilla on nopea intro (ääni-inventaario 11.10.).

| Ryhmä | Kaupunkeja | Kolme ensimmäistä havainnekuvia |
|---|---|---|
| A. Aloituskaupungit (täysi kuvaintro): Ateena, Pariisi, Tukholma | 3 | 3 / 3 |
| B. Muut, joilla nopea intro | 42 | 42 / 42 |
| **A + B yhteensä** | **45** | **45 / 45** (lähde-kenttä "Matkakirjan havainnekuva") |
| C. Ei vielä nopeaa introa: Bryssel, Kassa, Ljubljana, Luxemburg, Valletta | 5 | 0 / 5 (Commons-valokuvia) |
| D. Pääkaupunkipisteet ilman nopeaa introa (15 valtiota: ALB, AND, BLR, CHE, HRV, ISL, LIE, MCO, MDA, MKD, MNE, SMR, SRB, SVK, VAT) | 15 | 0 / 15 (Commons-valokuvia; Vatikaanilla ei kategoriaa) |

**B-ryhmä (42):** Amsterdam, Barcelona, Bergen, Berliini, Budapest, Bukarest, Oslo, Dublin, Dubrovnik, Edinburgh, Firenze, Granada, Alpit, Helsinki, Kiova, Istanbul, Krakova, Kreeta, Kööpenhamina, Lissabon, Lontoo, Madrid, Marseille, Moskova, Odessa, Sisilia, Pietari, Praha, Tallinna, Islanti, Riika, Rooma, Lappi, Sarajevo, Sevilla, Sofia, Tampere, Tromssa, Varsova, Venetsia, Vilna, Wien.

Huomiot:

- Tarkistus koski kunkin kaupungin kolmea ensimmäistä avauskuvaa; ne ovat kaikilla 45:llä havainnekuvia. Kuvia 4+ on lohkoissa vaihtelevasti: 23 kaupungilla on jo ≥ 6 avauskuvaa (Amsterdam, Ateena, Barcelona, Bergen, Berliini, Oslo, Dublin, Edinburgh, Firenze, Helsinki, Istanbul, Krakova, Kööpenhamina, Lissabon, Madrid, Moskova, Pietari, Tallinna, Riika, Rooma, Sevilla, Tukholma, Varsova), 22:lla 3–5. Osa lisäkuvista on Commons-valokuvia (Tukholmassa kaksi); ne eivät korvaa uusia havainnekuvia, mutta niiden aiheet on otettava huomioon, ettei samaa toisteta.
- **Pariisilla on vain 4 avauskuvaa**, vaikka aloituskaupungin intro käyttää kuutta: Pariisi on junalle 183 selvästi kriittisin (kuvat 4–5 ensin).
- Aluekokonaisuuksia (Alpit, Kreeta, Sisilia, Islanti, Lappi, Tromssa) kohdellaan kuten kaupunkeja, mutta "sama näkymä 1873" vaatii niille yhden täsmällisen paikan (esim. Tromsø: satama; Kreeta: Chania/Heraklion), valitaan kaupunkikohtaisessa tutkimuksessa.
- Kiova, Odessa, Moskova: kuvissa ei sotaa eikä sotilaita (13+); 1873-kuva on tavallinen kaupunkinäkymä.

## 2. Kuvien kokonaismäärä

| Laajuus | Uusia kuvia |
|---|---|
| Pilotti A (Ateena, Pariisi, Tukholma) | 3 × 5 = **15** |
| B (42 kaupunkia) | 42 × 5 = **210** |
| **A + B (kaupungit, joilla nopea intro)** | **225** (valmiissa joukossa 45 × 8 = 360 kuvaa, joista 135 nykyisiä herokuvia) |
| C + D (20 kohdetta ilman introa; kaikki kahdeksan uutta, koska ensimmäiset kolmekaan eivät ole havainnekuvia) | 20 × 8 = 160 (**ei suositella ennen kuin intro-musiikki on olemassa**) |
| Koko Eurooppa yhteensä | 385 |

Codex tuottaa yhden generointikutsun per kuva (aiemmat toimitukset), joten 225 kuvaa = noin 225 kutsua; poisjättöjä tulee (aiemmissa erissä n. puolet kohdista jäi pois aikakausi- tai tekstiongelmien vuoksi), joten varaa 1,3-kertainen määrä aiheita.

**Suositus:** (1) hyväksytään pilotti A, 15 kuvaa → silmäys → mahdolliset ohjeen korjaukset; (2) B kolmessa aallossa (14 kaupunkia/aalto = 70 kuvaa) Raamatun mukaisessa Eurooppa-järjestyksessä; (3) C ja D vasta kun nopea intro on tehty.

Työmäärä Sisältökirjurille: kaupunkikohtainen tutkimus (8. kuvan 1873-faktat kahdella lähteellä, tarinakaaren mukaan: faktat tosia, kaksi lähdettä) ≈ 1 sivu/kaupunki; A tänään, B-aallon 14 kaupunkia noin kaksi vuoroa.

## 3. Yhteiset säännöt (kaikkiin tilauksiin; sama kuin aiemmat Codex-tilaukset)

- **FOTOREALISTINEN havainnekuva:** valokuvan näköinen, luonnollinen valo, vaimeat värit, ei HDR:ää eikä elokuvamaista ylikylläisyyttä.
- **Ei tekstiä, logoja, kylttejä, vesileimaa eikä kehystä.** Ihmiset vain pieninä, kaukaa tai selin; **ei tunnistettavia kasvoja eikä todellisten henkilöiden näköisiä hahmoja.** Ei verta eikä väkivaltaa (13+).
- **Ei suojattuja teoksia:** vain kohteita, joiden tekijä on kuollut yli 70 vuotta sitten, tai antiikin/anonyymeja; ei elävien tai < 70 v sitten kuolleiden arkkitehtien, taiteilijoiden tai valosuunnittelijoiden töitä, ei museokokoelmien esineiden jäljennöksiä, ei valaistusesityksiä (esim. Eiffel-tornin kimallus).
- **AIKA-sääntö:** kuvat 4–7 ovat nykyaikaa (vain estetiikka vanha); kuva 8 on vuosi 1873 ilman myöhempiä rakennuksia.
- **Merkintä:** PNG `Description`/`Source` "Havainnekuva. Tekoälyllä tuotettu, ei valokuva."; kuvateksti päättyy sanaan "Havainnekuva."
- PNG 1536 × 1024 (3:2), sRGB, läpinäkymätön; tiedosto `<kaupunki>-<nro>-<aihe>.png`. R2 `julisteet/saapumisintro/<kaupunki>/<pvm>/`, manifesti `posti/kuvatoimitus-saapumisintro-<kaupunki>-<pvm>.json` (url, r2Key, sha256, mitat, generationPrompt, viitteet), kuittaus `posti/codex-fable-saapumisintro-<kaupunki>-<pvm>.md`. Ei main-mergeä, versionnostoa eikä julkaisua Codexilta. Jos kohta ei onnistu turvallisesti, jätetään tekemättä ja kerrotaan syy.
- **Kuva 8 (1873):** ei yhtäkään rakennusta, katua, ajoneuvoa tai valoa, jota ei vuonna 1873 ollut; ajan vaatteet ja kulkuneuvot (hevosvaunut, höyry- ja purjealukset); kaikki ihmiset selin tai kaukana. Kunkin kuvan "1873-tarkistus" -rivi kertoo, mitä pitää olla ja mitä ei saa olla.
- **Omistajan palaute pilotista (12.10. klo 16.5x, sitova): "1800 luvun kuvat pitää olla mustavalkoisia. ruokakuvat ovat kaikki huonoja. ne ovat liian aseteltuja ja samanlaisia keskenään."** (a) Kaikki 1800-luvun kuvat (kuva 8 ja muut vuosisadalle sijoittuvat) ovat **mustavalkoisia**: puhdas harmaasävy, aikakauden valokuvan tuntu (pehmeä kontrasti, hienoinen rakeisuus, kevyt reunojen tummuus), ei sepiaa. (b) **RUOKAKUVAT POIS (omistaja 12.10. klo 17.4x, kumoaa kaikki aiemmat ruokalinjat):** "ruokakuvat eivät toimi, jätetään ne pois introsta ja korvataan jollain muulla elämän makuisella kuvalla jossa on ilta ja ihmisiä juhlimassa. voi olla myös päivänäkymä missä joku iloinen tapahtuma ja paljon ihmisiä. joku ihminen saisi olla etualalla. pitää olla muodikkaat vaatteet ja nuoria ihmisiä. ihmiset vain sen näköisiä mitä kantaväestö on". Kuva 6 on kaikissa kaupungeissa **elämän makuinen kuva**: joko ilta, jossa nuoria ihmisiä juhlii, tai päivä, jossa on iloinen tapahtuma ja paljon ihmisiä; **yksi ihminen etualalla**, nuoria ihmisiä nykyajan muodikkaissa vaatteissa, ihmiset kaupungin tyypillisen väestön näköisiä (keksittyjä, ei todellisten henkilöiden näköisiä); ei tekstiä/logoja; ei muistomerkkejä Kreikan kuvissa. Pilotin uusinnat tilattu: `posti/sisaltokirjuri-codex-saapumisintro-palaute-20261012.md` (04dd31aa2, korjaus 2: 1106174af). Loput kuvat tilataan vasta, kun omistaja on hyväksynyt uusitun pilotin.

---

## 4. Kuvakohtaiset Codex-ohjeet: Pariisi, Tukholma, Ateena (luonnos, EI tilattu)

Kuvat 1–3 ovat nykyiset herokuvat; ohjeet koskevat kuvia 4–8.

### PARIISI (nykyiset herot: Invalidit, Eiffel-torni, Notre-Dame; avauskuvia myös Sacré-Cœur)

**4 / arki ja ihmiset — Rue Mouffetardin markkinakatu.**
Mitä kuvataan: Latinalaiskorttelin kapea markkinakatu aamupäivällä, kojut täynnä hedelmiä, juustoja ja kukkia; ihmisiä selin ja kaukana, ostoskoreja, pyöräilijä. Kulma: vaakakuva, silmänkorkeudelta kadun suuntaisesti, kadun viettävä perspektiivi. Valo: pehmeä aamupäivä. Ei saa näkyä: tekstiä, kylttejä, hintalappuja, kasvoja, nykybrändejä, suojattua katutaidetta.

**5 / vesi tai luonto — Seine ja Pont Royal kesäaamuna.**
Mitä kuvataan: Seinen vaaleat kivilaiturit, rannan puurivi, Pont Royal -silta ja tyyni vesi, yksi turistivene kaukana. Kulma: vaakakuva, Seinen rantatieltä (quai) hieman korotetusta kulmasta kohti siltaa, kapea näkymä Tuileries-puutarhan suuntaan; kuvan aikaa käytetään kuvassa 8. Ei saa näkyä: Louvren lasipyramidia, Eiffel-tornia, tekstiä, kasvoja, vesilintujen ruokintaa tms. hälyä.

**6 / paikallinen yksityiskohta lähikuvana — patonki ja voisarvet.** *(HYLÄTTY: ruokakuvat pois; uusi kuva 6 = ilta Canal Saint-Martinin rannalla, nuoria juhlimassa, yksi nuori etualalla.)*
Mitä kuvataan: tuore patonki, kaksi voisarvea ja kuppi kahvia paperipussin vieressä vanhalla puutiskillä leipomossa; ei ihmisiä. Kulma: lähikuva viistosti ylhäältä, vaakakuva. Ei saa näkyä: tekstiä, leipomon nimeä, hintoja, logoja.

**7 / ilta ja kaupungin valot — Pont Neuf ja Seinen ranta sinisellä hetkellä.**
Mitä kuvataan: Pont Neufin kaaret ja vanhat kopiot-katulyhdyt (lämmin valo), Seinen peilikuva, kauempana vene lämpimin valoin. Kulma: vaakakuva, Île de la Citén kärjestä (Square du Vert-Galant). Ei saa näkyä: Eiffel-tornin valoshow'ta, mainos- ja kauppavaloja, tekstiä, kasvoja.

**8 / sama näkymä 1873 — Pont Royal ja Tuileries-palatsin rauniot.**
Mitä kuvataan: sama Seine-näkymä kuin kuvassa 5, mutta vuonna 1873: Tuileries-palatsin mustuneet rauniot oikealla rannalla, Seinellä höyryveneitä ja proomuja, rannalla hevosvaunuja ja ajan vaatteisiin pukeutuneita ihmisiä kaukaa ja selin; Pont Royal -silta paikallaan. Valo: pehmeä aamupäivä, hieman savuinen kaupungin ilma.
1873-tarkistus: **on** Tuileries-palatsin rauniot (palatsi poltettiin 23.5.1871, rauniot purettiin vasta 1882–1883); **ei ole** Eiffel-tornia (1889), Sacré-Cœuria (peruskivi laskettiin 16.6.1875) eikä autoja tai sähkövaloja. Varmistetut lähteet (kaksi kutakin): Tuileries Palace (Wikipedia) + National Gallery NG6346 (rauniot purettiin 12/1882–9/1883); Sacré-Cœur: OSV News/RTÉ (peruskivi 16.6.1875). Kuvateksti-ehdotus: "Seinen ranta Pont Royalin luona vuonna 1873, kun Tuileries-palatsin rauniot vielä seisoivat. Havainnekuva."

### TUKHOLMA (nykyiset herot: kuninkaanlinna, kaupungintalo, Riddarholmenin kirkko; avauskuvia myös Gamla stan)

**4 / arki ja ihmiset — Stortorget Gamla stanissa.**
Mitä kuvataan: Vanhankaupungin tori värikkäine kapeine julkisivuineen, kahvilan pöytiä ulkona, ihmisiä selin ja kaukana, kaksi pyörää seinää vasten. Kulma: vaakakuva, torin laidalta silmänkorkeudelta, sivusta Börshuset taustalla. Ei saa näkyä: Nobel-museon opasteita, tekstiä, kylttejä, kasvoja.

**5 / vesi tai luonto — Djurgårdenin kanava.**
Mitä kuvataan: Djurgårdsbrunnskanalen syksyisenä aamuna, soutuvene ja kanootti vedessä, puiset huvilat ja vanhat tammet rannalla, lehtiä veden pinnalla. Kulma: vaakakuva, kanavan penkereeltä veden tasolta. Ei saa näkyä: Vasa-museota ja muita uudisrakennuksia, tekstiä, kasvoja.

**6 / paikallinen yksityiskohta lähikuvana — Dalahäst.**
Mitä kuvataan: käsinmaalattu punainen Dalahäst (puinen Taalainmaan hevonen) kultakoristein männyn lankkupöydällä, vieressä valkoinen kahvikuppi ja kardemummapulla. Kulma: lähikuva sivusta, pieni terävyysalue. Ei saa näkyä: tekstiä, valmistajan leimoja, tunnistettavia henkilöitä, kehystä.

**7 / ilta ja kaupungin valot — Strömmen ja Gamla stan sinisellä hetkellä.**
Mitä kuvataan: Skeppsholmenin rannalta katsottuna Strömmenin vesi, Gamla stanin vanhat julkisivut ja Riddarholmenin rautatorni lämmin-ikkunavaloin, yksi saaristolaiva valoin. Kulma: vaakakuva, Skeppsholmenin länsirannalta, sama paikka kuin kuvassa 8. Ei saa näkyä: Grand Hôtelia ja Blasieholmenin rakennuksia (rajaa pois: katse pitää suunnata Gamla stanin ja kuninkaanlinnan suuntaan), mainosvaloja, tekstiä.

**8 / sama näkymä 1873 — Strömmen Skeppsholmenin rannalta.**
Mitä kuvataan: sama paikka kuin kuvassa 7, mutta vuonna 1873, päivänvalossa: Strömmenillä höyrylaivoja, purjealuksia ja soutuveneitä, Gamla stanin tiiviit julkisivut, kuninkaanlinnan massiivinen kylki ja Riddarholmenin kirkon rautatorni (1846); rannassa laatikoita ja tynnyreitä, ajan vaatteita kaukaa ja selin.
1873-tarkistus: **on** kuninkaanlinna (käyttöön 1754), Riddarholmenin valurautatorni (rakennettu 1830-luvun lopun tulipalon/salaman jälkeen, 1840-luvulle mennessä), höyrylaivaliikenne; **ei ole** kaupungintaloa (1923), moottoriajoneuvoja, sähkövaloja eikä valmista Grand Hôtelia (rakennettiin 1872–1874; vihittiin 14.6.1874, vuonna 1873 työmaana: rajaa Blasieholmen pois kuvasta). Varmistetut lähteet: Grand Hôtel (Wikipedia + grandhotel.se: rakennus 1872–1874, avajaiset 14.–15.6.1874); Stadshuset 1923 (Wikipedia/Östberg) ja linna 1754 (Wikipedia + kungligaslotten.se). **Huom. PT:lle:** repon Riddarholmen-herotekstin "valurautatorni 1846" ei täsmää lähteisiin (kirkko-Wikipedia: torni 1838–40, 1835 tuhon jälkeen) — tarkista selite. Nordiska museet jätetty pois listasta (ei varmistettu). Kuvateksti-ehdotus: "Strömmen ja Gamla stan vuonna 1873, ennen kaupungintaloa ja autoja. Havainnekuva."

### ATEENA (nykyiset herot: Akropoliin kallio, Parthenon, Zeuksen temppeli; avauskuvia myös Panathinaiko, Hefaistoksen temppeli)

**4 / arki ja ihmiset — Plakan kahvila- ja tavernakatu.**
Mitä kuvataan: Plakan kapea kuja, ulkopöydät, bougainvillea-köynnös valkoisella seinällä, muutama ihminen selin tai kaukana (kahvi- ja tavernapöytiä), Akropoliin kallio kapean kujan päässä. Kulma: vaakakuva, kujan suuntaisesti silmänkorkeudelta. Ei saa näkyä: ravintolakylttejä, ruokalistoja, tekstiä, kasvoja, katutaidetta, Anafiotikan yöllistä rakentamista (aihe jo toimitettu 8.10.).

**5 / vesi tai luonto — Filopappou-kukkula ja Akropolis.**
Mitä kuvataan: Filopappou-kukkulan oliivipuita ja kalliorinteitä, polku ja pensaita, Akropolis ja Parthenon taustalla auringonlaskun lämpimässä valossa, kaupungin valkoiset talot alhaalla. Kulma: vaakakuva, kukkulan rinteeltä Akropoliille päin; sama suunta kuvaan 8. Ei saa näkyä: tekstiä, kasvoja, telineitä Parthenonin ympärillä, kylttejä.

**6 / paikallinen yksityiskohta lähikuvana — kreikkalainen kahvi.**
Mitä kuvataan: kuparinen briki ja pieni kahvikuppi vesilasin ja loukoumin (kreikkalaisen makeisen) vieressä marmorinpalaa muistuttavalla pöydällä; ei ihmisiä. Kulma: lähikuva viistosti ylhäältä. Ei saa näkyä: tekstiä, logoja, kahvilan nimeä.

**7 / ilta ja kaupungin valot — Akropolis iltavaloissa.**
Mitä kuvataan: Akropoliin kallio ja Parthenon lämpimästi valaistuina sinisenä hetkenä, alla kaupungin ikkunavaloja ja katuvaloja, yksi pieni Areiospagoksen kallion polku etualalla. Kulma: vaakakuva, Areiospagoksen kalliolta. Ei saa näkyä: mainosvaloja, ravintolakylttejä, tekstiä, kasvoja, valaistuksen yksityiskohtaisia suunnitelmia (neutraali lämmin valo).

**8 / sama näkymä 1873 — Akropolis Filopappoulta.**
Mitä kuvataan: sama näkymä kuin kuvassa 5, mutta 1873: pieni matalarakenteinen Ateena (nykyaikaiset kerrostalot puuttuvat), uusklassiset kaksikerroksiset talot ja punaiset tiilikatot Akropoliin juurella, Akropoliin Propylaian edessä keskiaikainen Frankkien torni, Parthenon ilman nykyisiä rakennustelineitä ja ennallistuksia, Nike-temppeli (jälleenrakennettu 1835–1836) paikallaan; etualalla kuiva rinne ja oliivipuita.
1873-tarkistus: **on** Frankkien torni (purettiin 1874–1875 Heinrich Schliemannin rahoituksella), uusklassinen Ateena; **ei ole** Zappeionia (peruskivi 20.1.1874, avattu 20.10.1888), nykyistä valkoista kerrostalokaupunkia eikä nykyaikaisia rakennustelineitä. Varmistetut lähteet: Frankish Tower (Wikipedia: purku 1875) + Sotheby's/Archaeological Society -kirje 4.7.1874 (purku 1874 tai 1875; torni seisoi 1873 molemmissa); Nike-temppelin jälleenrakennus 1835–1836 (Wikipedia + Emory-museo); Zappeion (Wikipedia + athensattica.com). Kuvateksti-ehdotus: "Akropolis vuonna 1873, kun Frankkien torni vielä seisoi Propylaian edessä. Havainnekuva."

---

## 5. Päätettävää omistajalle / PT:lle

1. Laajuus: pilotti A (15 kuvaa) vai A + B (225)? Suositus: pilotti ensin.
2. Kuvateksti-ehdotuksista tulee pelitekstiä: hyväksytäänkö kuvan 8 teksti "<paikka> vuonna 1873 … Havainnekuva." mallina?
3. Pariisin neljä avauskuvaa: kuvat 4–5 ovat intron kuuden kuvan pohja; tarvitaanko 6. kuva jo junaan 183?
4. Aluekokonaisuuksille (Alpit, Kreeta, Sisilia, Islanti, Lappi, Tromssa) yksi täsmällinen "sama näkymä 1873" -paikka kullekin: ehdotan kaupunkikohtaisessa tutkimuksessa.
