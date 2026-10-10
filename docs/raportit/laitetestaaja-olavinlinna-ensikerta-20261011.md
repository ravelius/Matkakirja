# Laitetestaaja: Olavinlinnan ensikertalaisen läpipeluu, TF 180 (04c2af36), 11.10.2026

**Tulos: PÄÄSY LOPPUUN EI ONNISTUNUT.** Ensikertalaisen ohjein (vain napautukset ja vedot, ei ratkaisuja) pääsin
Pelit › Keskeneräiset › Olavinlinna → Pelaa → vene → laituri, mutta jäin kiinni 2–5 s ensimmäisestä liikkeestä (kolme kierrosta,
joka kerta) ja tyrmästä en päässyt pois yhdelläkään kierroksella (n. 10 min per kierros). Löydöksiä 12 (vikalista alla),
hyvää 8. Kuva-arkit: `docs/raportit/kuvat/laitetestaaja-olavinlinna-ensikerta-20261011/kuva-arkki-1.jpg` ja `-2.jpg`
(kuvissa kellonaika, joka on myös alla). Kaikki kuvat, loki ja ääni: `proto-3d/lokit/laitetestaaja-olavinlinna-ensikerta-20261011/`
(`kuvat/*.jpg`, `linssi-loki.txt`, `olavinlinna3-aani.mp3`, `muistiinpanot.md`).

## Ajo
- iPad Pro 13" -simulaattori `3622D89D` (T7-sarja), juna 1.1.180, `Data/Raw/kaannos.txt` = 04c2af36 (`proto-3d/lokit/juna-1.1.180-04c2af36`),
  Julkaisijan SIMULAATTORI NYT 00.22. Ajo 00.22–01.07 (11.10.).
- Kehittäjätila päällä (vain siksi Olavinlinna näkyy Keskeneräiset-listalla). Alareunassa näkyy koko ajan kehittäjäkonsoli ja
  punainen rivi "A multisampled texture being bound to a non-multisampled sampler … use Texture2DMS in the shader" (jokaisessa kuvassa).
- **Kone kuormassa koko ajan (load 53–528)** → fps/laatu/A-V ei mitata (toimintatesti). Pelin oma kehysloki: 59,3–59,8 fps pelatessa,
  yli 100 ms hitchit vain latauksessa (t=339–360 s, 5,1 s huippu) ja tyrmään siirtymässä (267 ms, t=575 s).
- Mac mykistetty: `aani mykistys` → "mykistys päällä (unity päällä, natiivi päällä)" (peli-loki 241,6 s). Ääntä ei laitettu kaiuttimiin.
- Ääni: 1. ja 2. kierroksella äänikaappaus EI tallentunut (oma virheeni: kirjoitin komennon `linssi kaappaa …` eikä `kaappaa …`;
  loki 332,09 "tuntematon linssi: kaappaa"). 3. kierroksella kaappaus onnistui (800 s, 00:52:40–01:06:00, `olavinlinna3.wav` 24 kHz stereo;
  natiivi-wav tyhjä eli Olavinlinna käyttää vain Unityn mikseriä). Muiden kierrosten äänestä on vain lokirivit.
- Ohjaus: oikeat HID-kosketukset (`simkosketus`); vaaka-UI:n kuvat käännetty automaattisesti.

## Aikajana (kuvat arkeissa)
| Kello | Tapahtuma |
|---|---|
| 00:28:16 | Olavinlinna napautettu (Pelit › Keskeneräiset). Latausruutu 2 min (kuormassa), sitten Pelaa- ja Historia-kortit |
| 00:30:42 | Pelaa → vene soutaa itse, 22 s, Fogg laiturille (peli: "ensimmäinen persoona, ei pelaajahahmoa") |
| 00:32:11 | Tatti ylös 2 s → vartija edessä → **kiinni** (loki 568–570 s: Partio→Etsintä→Kiinni 2 s) → tyrmä (muunnelma 1 avaimet ilmaraosta) |
| 00:32:14–00:38:00 | Tyrmä 1. kierros: mustaa, seinää, kamera seinän sisällä; kynttilä sytytetty vasta 00:37:52 (puuovi näkyy) |
| 00:40:40 | 2. avaus (linna suljettu → pystyasento → vaaka → avaus, ~100 s): peli suoraan laiturille, ei Pelaa-korttia/soutua |
| 00:43:06 | 2. kierros: kiinni 2 s liikkeestä; tyrmä muunnelma 2 (vesipojan ovi, "ovi raolleen" 1233 s) |
| 00:43:33–00:47:49 | Kynttilä heti; tyrmän holvihuone näkyy vasta peruuttamalla; puuovi lähellä mutta liike pysähtyy; ovi ei aukea |
| 00:48:15 | Vihje (☰) → ei mitään ruudulla |
| 00:48:58–00:51:13 | Linnan historia (135,8 s) katsottu: hyvä, ks. alla |
| 00:52:40 | 3. avaus + äänikaappaus; 00:55:02 kiinni 3 s liikkeestä; tyrmä muunnelma 3 (irtokivi); 01:06 kaappaus valmis |

## Kirjaukset a–f
Kuvat arkeissa; tarkka kuva = tiedoston nimi `kuvat/<nimi>.jpg` kansiossa `proto-3d/lokit/…`.

### a) Jumi tai epäselvä hetki yli 20 s
1. **Kiinnijäänti ilman varoitusta** (kaikki 3 kierrosta): laiturilla ensimmäinen eteenpäin-liike (2–2,5 s tatti ylös tai vinoon) vie suoraan
   vartijalle; Etsintä→Kiinni 1,4–2 s (loki 568→570, 1223→1225, 1937→1939 s). Ruudulla ei näy vartijan näkökenttää, mittaria eikä kehotetta;
   vartija on aina samassa kohdassa edessä (05-laituri-a, 06-tatti-ylos, 28-a, 46-2).
2. **Tyrmän alku ~5 min (00:32–00:37, 1. kierros)**: kamera katsoo kiviseinää nurkasta; katseen käännös on rajattu (30-1…6: viisi vetoa ei käännä
   yli ~40°, 14-kierros-*: vedot eivät liikuta kameraa); ilman kynttilää kaikki lähes musta. En tiennyt, mitä tehdä.
3. **Käsikuvake ilman selitystä**: oikean alakulman käsi/liekki-kuvake on kynttilän sytytys (loki 714,8 "SytytaOma"); vasta se tekee tyrmästä
   näkyvän (22-b puuovi, 29-kynttila). Ei tekstiä eikä kehotusta. Napautus mihin tahansa 3D-näkymään sammuttaa/sytyttää sen (16-keskitap, 37-ovi-tap)
   – tahaton, ei selitystä.
4. **Peruutus paljastaa huoneen**: 2. kierroksella tyrmän holvihuone (31-taakse, 32-taakse-*) näkyy vasta kun tatti vedetään alas; tatti ylös vie
   takaisin seinää vasten. Ensikertalainen painaa "eteen".
5. **Liike pysähtyy**: 35-alas-1…4 neljä peräkkäistä kuvaa identtiset; 34-eteen-1…4 identtiset; kamera kulkee vain muutaman sekunnin matkan.
   Puuovi tulee lähelle (36-vasen-*) mutta ei aukea, vaikka loki sanoo "vesipoika jätti oven raolleen" (1233 s) ja "lukko aukesi" (633 s, 1. kierros).
   **Pakoa ei saatu tehtyä 10 min yrityksellä millään kolmesta muunnelmasta** (avaimet ilmaraosta, vesipojan ovi, irtokivi).
6. **Vihje ei näy**: ☰ › Vihje (00:36:19, 00:48:15): loki "vihje 3 (pyyntö) → Liekki", ruudulla 7 s ei muutu mikään (18-vihje-*, 38-vihje-*).
   Myös automaattiset vihjeet ("vihje 2 (jumi/tyrmä 20 s)") eivät näy ruudulla.
7. **Linnan sulkemisen jälkeen peli palaa pystyasentoon** (25b, 42-kartta); vaaka piti asettaa uudelleen (`ui kierto vaaka`). Voi olla simulaattorin
   asento-ominaisuus; laitteella tarkistettava.

### b) Musta tai liian pimeä näkymä
- 06-tatti-ylos2 (00:32:14): **koko ruutu musta** 1 s tatin jälkeen; 16-tatti (00:35:53), 18-vihje (00:36:19): musta monikulmio täyttää ruudun.
- 05-laituri-a/b (00:31:33): laituri liian tumma, isoja täysmustia pintoja (pylväs, Keittiön nimikyltin takana, oikea yläkulma).
- 12-kaanny-*, 13-kasi-*, 14-kierros-* (00:34): tyrmässä litteitä täysmustia levyjä ja pitkä musta sauva/miekka-siluetti, joka jää mustaksi myös kynttilän valossa
  (puuttuva materiaali/valo?).
- 32-taakse-2, 35-*: holvihuoneen kuoppien/altaiden sisus musta; kynttilän valo yltää vain lähiseinään (29-kynttila, 47-kynttila).

### c) Kamera seinän sisällä tai läpi näkyvä tyhjä
- 06-tatti-oikea (00:32:20): kamera kiviseinän sisällä; 07-nyt: sama.
- 19-kaanny, 20-*, 21-*, 23-a/ovi, 24-* (00:36:39–00:38:37): tatti eteen kun katse on ylös → kamera lentää holvikaton läpi, näkyy holvin ulkopuoli,
  vinoja paneeleita ja mustia aukkoja (seinät yksipuolisia). Liike seuraa katsesuuntaa (lentokamera) eikä pysy lattiassa.
- 08-katse-*: lattialla mustia laatikkomaisia kappaleita; vaalea vinotaso kattona.

### d) Väärä tai turha teksti / nimikyltti
- **Linnan huoneiden nimikyltit tyrmässä**: "Keittiö" (09-taso2, 16-keskitap 00:35:48 – iso kyltti), "Laituri" (48-seina 00:56:06), "Fatabuuri"+"Laituri" (49-a). Nämä kuuluvat ulkoalueelle.
- **Historia, kivikausi** (39-historia-a/b, 00:49:16): linnan huoneiden kyltit (Kierreportaat, Fatabuuri, Kappeli, Laituri, Keittiö) leijuvat tyhjän saaren päällä.
- **Tekstitys tatin päällä**: historian otsikko "Kivikausi / Asukkaita Saimaan rannoilla" ja "1499 Erik Turesson Bielke linnan haltijaksi" osuvat liikuttimen (tatin) päälle
  (39-historia-b, 40-historia-1).
- Kehittäjäkonsoli ja punainen shader-virherivi joka kuvassa (kehittäjätila).
- Repliikeillä ei tekstitystä (soutaja, portinvartija, vartija, vesipoika – vain ääni), joten kuulematon pelaaja ei tiedä, mitä tapahtuu.

### e) Puuttuva tai outo ääni (3. kierroksen tallenne `olavinlinna3.wav`, 800 s; kello = pelikello)
- **Dock-vaihe 00:52:40–00:55:00**: taso −23…−37 dB RMS, puheet ja tehosteet kuuluvat (huippu −2,1 dB, keskiarvo −33,7 dB).
- **Tyrmä 00:55:10 → 01:06:00 (10,8 min): tasainen −42 dB RMS, ei yhtään tapahtumaa** (vain 80 s silmukka; ilmaraon "avainnippu", vesipoika, vartijan "rotat" -repliikit
  eivät tulleet tällä kierroksella). Pudotus ~15–20 dB heti kiinnijäännin (00:55:00) jälkeen → tyrmä tuntuu hiljaiselta, ei ohjaa pelaajaa.
- **Laiturin toistuva ääni**: "riita alkaa" toistuu 56 s välein (1857, 1913 s) ja soutajan repliikki soutaja-2 kolmesti 80 s aikana (1829, 1852, 1909 s) – näyttää silmukalta.
- 1. ja 2. kierroksen äänestä vain lokirivit (ks. Ajo); tyrmän repliikit olivat 1. ja 2. kierroksella tallentamatta.
- Ääni ei kerro, mistä vartija tulee (ei sijaintia/ei varoitusääntä ennen kiinnijääntiä, vain sydänääni 1 s ennen: loki 1938,16 "sydan-silmukka").

### f) Mikä oli hyvää
1. Latausruutu (03-lataus-1): kaunis iltarusko-kuva, nimi ja vuosiluku.
2. Pelaa/Historia-kortit selkeät (03-lataus-3); "Pelaa: kesäyö 1499" kertoo ajan.
3. Vene saapuu: soutuanimaatio ja linnan ensinäkymä hienoja (04-pelaa-*, 45-1), kyltit nimeävät paikat.
4. ☰-valikko selkeä: Vihje, Linnan historia, Äänet (Kertoja/Musiikki/Äänimaisema + Mikseri + Akustiikka), Lähteet, Kuori, Sulje linna (17-valikko, 41-aanet).
5. Kynttilän valo toimii ja on näyttävä (29-kynttila, 22-b puuovi).
6. Linnan historia (135,8 s) on upea ja päättyy itsestään; ⏭-ohitus ja otsikot toimivat (40-historia-*).
7. Kehysnopeus 59–60 fps koko ajan paitsi latauksessa.
8. Peli kirjaa tapahtumat selvästi (loki: vartijan tilat, tyrmän muunnelma, vihje) – vikojen jäljitys helppoa.

## Vikalista PT:lle (vika · kuva · todennäköinen rooli)
1. Vartija vie kiinni 2–5 s liikkeestä ilman varoitusta, aina samassa kohdassa · 05-laituri-a, 06-tatti-ylos, 28-a, 46-2 · Siirtoseppä (vartija-AI/aloituspaikka)
2. Tyrmän alku: kamera seinää vasten, katse rajattu, pako ei onnistu (10 min × 3 kierrosta), ovi ei aukea vaikka "ovi raolleen" · 30-*, 35-*, 36-* · Siirtoseppä (tyrmäkohtaus, ohjaus)
3. Kamera kulkee holvin/seinien läpi (lentokamera, yksipuoliset seinät) · 06-tatti-oikea, 19–24-* · Siirtoseppä (kamerakolisio) / Linnanrakentaja (seinien kaksipuolisuus)
4. Täysmustat pinnat ja koko ruudun musta · 06-tatti-ylos2, 12-kaanny-*, 16-tatti · Linnanrakentaja (materiaalit/valo), shader-virhe "Texture2DMS" konsolissa
5. Vihje ei näy ruudulla (☰ ja automaattiset) · 18-vihje-*, 38-vihje · Siirtoseppä + Natiivi-UI
6. Kynttilä-kuvake ilman selitystä; napautus maailmaan sammuttaa kynttilän; tyrmä käytännössä musta ilman sitä · 16-keskitap, 22-b · Natiivi-UI + Siirtoseppä
7. Huonekyltit väärissä tiloissa (tyrmä, kivikausi-historia) · 09-taso2, 48-seina, 49-a, 39-historia-b · Siirtoseppä
8. Historian tekstitys tatin päällä · 39-historia-b, 40-historia-1 · Natiivi-UI
9. Repliikeille ei tekstitystä · kaikki kierrokset (loki) · Natiivi-UI/Siirtoseppä
10. Tyrmän ääni −42 dB tasainen 10,8 min; laiturin riita/soutaja-repliikit silmukalla 56–80 s · `olavinlinna3.wav`, loki 1829–1925 s · Siirtoseppä (ääni)
11. Linnan sulkemisen jälkeen peli pystyasennossa (simulaattori?) · 25b, 42-kartta · Natiivi-UI (tarkistettava laitteella)
12. Latausaika ~2 min kuormassa (load 100–500) ja 2. avauksella ~100 s; hitchit 5 s latauksessa · kehysajat t=339–360 s · mittaa uudelleen kuormattomalla koneella

## Ei testattu / rajaukset
- Peliä ei saatu loppuun (pako tyrmästä, keittiö, kappeli…): vain laituri, kiinnijäänti, tyrmä ja ☰-valikko.
- Ääni: vain 3. kierros tallennettu; kuuntelematta (ei kaiuttimia, Mac mykistetty) – analyysi tasoista ja lokirivistä. Laitteella kuultava tarkistus puuttuu.
- Kone kuormassa → fps/lataus/A-V vain suuntaa antava. Simulaattori, ei fyysistä iPadia.
- Pelaajan ohjaus: tatti = vasen alakulma; katse = veto oikealla; en käyttänyt komentotiedostoja liikkeeseen (vain `kehittaja 1`, `ui kierto vaaka`, `aani mykistys`, äänikaappaus).

Ei korjattu mitään (PT:n ohje). SIMU VAPAA vasta karttakierroksen jälkeen.
