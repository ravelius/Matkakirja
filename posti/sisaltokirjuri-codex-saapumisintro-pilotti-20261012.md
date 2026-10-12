## 2026-10-12 — SISÄLTÖKIRJURI → CODEX: Saapumisintron pilotti, 15 fotorealistista havainnekuvaa (Pariisi, Tukholma, Ateena)

Omistajan lupa (PT:n välittämänä 12.10.2026 klo 10.4x): tilataan pilotti, **15 kuvaa** (5 per kaupunki: arki, vesi/luonto, paikallinen yksityiskohta, ilta, sama näkymä vuonna 1873). **VAIN EUROOPPA.** Generointimäärä enintään 15 (yksi per kuva, ei lisävariantteja). Jos jokin kohta ei onnistu turvallisesti tai aikakausi ei toteudu (kuva 8: tarkista, ettei kuvassa ole myöhempiä rakennuksia), jätä se tekemättä ja kerro syy kuten aiemmissa toimituksissa. Omistaja katsoo pilotin ennen loppuja kuvia, joten laatu ennen määrää.

Taustasuunnitelma: `docs/raportit/saapumisintro-kuvasuunnitelma-20261012.md` (PR #4488).

## Säännöt (samat kuin aiemmat Codex-tilaukset)

- **FOTOREALISTINEN havainnekuva:** valokuvan näköinen, luonnollinen valo, vaimeat värit, ei HDR:ää eikä elokuvamaista ylikylläisyyttä.
- **Ei tekstiä, logoja, kylttejä, vesileimaa eikä kehystä.** Ihmiset vain pieninä, kaukaa tai selin; **ei tunnistettavia kasvoja eikä todellisten henkilöiden näköisiä hahmoja.** Ei verta eikä väkivaltaa (13+).
- **Ei suojattuja teoksia:** vain kohteita, joiden tekijä on kuollut yli 70 vuotta sitten, tai antiikin/anonyymeja; ei elävien tai < 70 v sitten kuolleiden arkkitehtien, taiteilijoiden tai valosuunnittelijoiden töitä, ei museokokoelmien esineiden jäljennöksiä, ei valaistusesityksiä (esim. Eiffel-tornin kimallus).
- **AIKA-sääntö:** kuvat 4–7 ovat nykyaikaa (vain estetiikka vanha); kuva 8 on vuosi 1873 ilman myöhempiä rakennuksia.
- **Merkintä:** PNG `Description`/`Source` "Havainnekuva. Tekoälyllä tuotettu, ei valokuva."; kuvateksti päättyy sanaan "Havainnekuva."
- PNG 1536 × 1024 (3:2), sRGB, läpinäkymätön; tiedosto `<kaupunki>-<nro>-<aihe>.png`. R2 `julisteet/saapumisintro/<kaupunki>/<pvm>/`, manifesti `posti/kuvatoimitus-saapumisintro-<kaupunki>-<pvm>.json` (url, r2Key, sha256, mitat, generationPrompt, viitteet), kuittaus `posti/codex-fable-saapumisintro-<kaupunki>-<pvm>.md`. Ei main-mergeä, versionnostoa eikä julkaisua Codexilta. Jos kohta ei onnistu turvallisesti, jätetään tekemättä ja kerrotaan syy.
- **Kuva 8 (1873):** ei yhtäkään rakennusta, katua, ajoneuvoa tai valoa, jota ei vuonna 1873 ollut; ajan vaatteet ja kulkuneuvot (hevosvaunut, höyry- ja purjealukset); kaikki ihmiset selin tai kaukana. Kunkin kuvan "1873-tarkistus" -rivi kertoo, mitä pitää olla ja mitä ei saa olla.

---

## Kuvakohtaiset ohjeet: Pariisi, Tukholma, Ateena

Kuvat 1–3 ovat nykyiset herokuvat (älä toista niiden aiheita); tilaus koskee kuvia 4–8, yhteensä 5 per kaupunki.

### PARIISI (nykyiset herot: Invalidit, Eiffel-torni, Notre-Dame; avauskuvia myös Sacré-Cœur)

**4 / arki ja ihmiset — Rue Mouffetardin markkinakatu.**
Mitä kuvataan: Latinalaiskorttelin kapea markkinakatu aamupäivällä, kojut täynnä hedelmiä, juustoja ja kukkia; ihmisiä selin ja kaukana, ostoskoreja, pyöräilijä. Kulma: vaakakuva, silmänkorkeudelta kadun suuntaisesti, kadun viettävä perspektiivi. Valo: pehmeä aamupäivä. Ei saa näkyä: tekstiä, kylttejä, hintalappuja, kasvoja, nykybrändejä, suojattua katutaidetta.

**5 / vesi tai luonto — Seine ja Pont Royal kesäaamuna.**
Mitä kuvataan: Seinen vaaleat kivilaiturit, rannan puurivi, Pont Royal -silta ja tyyni vesi, yksi turistivene kaukana. Kulma: vaakakuva, Seinen rantatieltä (quai) hieman korotetusta kulmasta kohti siltaa, kapea näkymä Tuileries-puutarhan suuntaan; kuvan aikaa käytetään kuvassa 8. Ei saa näkyä: Louvren lasipyramidia, Eiffel-tornia, tekstiä, kasvoja, vesilintujen ruokintaa tms. hälyä.

**6 / paikallinen yksityiskohta lähikuvana — patonki ja voisarvet.**
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
1873-tarkistus: **on** kuninkaanlinna (käyttöön 1754), Riddarholmenin valurautatorni (rakennettu 1830-luvun lopun tulipalon/salaman jälkeen, 1840-luvulle mennessä), höyrylaivaliikenne; **ei ole** kaupungintaloa (1923), moottoriajoneuvoja, sähkövaloja eikä valmista Grand Hôtelia (rakennettiin 1872–1874; vihittiin 14.6.1874, vuonna 1873 työmaana: rajaa Blasieholmen pois kuvasta). Varmistetut lähteet: Grand Hôtel (Wikipedia + grandhotel.se: rakennus 1872–1874, avajaiset 14.–15.6.1874); Stadshuset 1923 (Wikipedia/Östberg) ja linna 1754 (Wikipedia + kungligaslotten.se). Kuvateksti-ehdotus: "Strömmen ja Gamla stan vuonna 1873, ennen kaupungintaloa ja autoja. Havainnekuva."

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
