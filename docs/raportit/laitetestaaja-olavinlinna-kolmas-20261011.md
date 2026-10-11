# Laitetestaaja: Olavinlinnan ensikertalaisen 3. kierros, yhdistetty 181f (v6, f1041376), 11.10.2026

**Tulos: tyrmästä pääsee nyt ulos, mutta ei pelaajan toimesta: peli palauttaa pelaajan itse laiturille "77 s:ssa". Loppuun asti (keittiö, kappeli…) ei edelleenkään päästy.** Laiturille palattuani vartija meni Hälytys-tilaan, jossa kameran pannaus lakkasi toimimasta ja kamera jäi tuijottamaan järvelle. Vertailu 1. ajoon (v1, TF 180) ja 2. ajoon (v4, 181d).

Ajo: iPad Pro 13" -simu `3622D89D` (T7), app `proto-3d/lokit/olavinlinna-yhdistetty-181f` (`kaannos.txt` = f1041376), Julkaisijan SIMULAATTORI NYT, ajo 04.03–04.30. Mac mykistetty (`aani mykistys` OK). Ääni: `kolmas1.wav` (1200 s, 04:09:00–04:29:00, 24 kHz stereo; `kolmas1-aani.mp3` lokikansiossa). Kone ei kuormassa (load 34–50), mutta fps/lataus ei mitattu. Kuva-arkki: `docs/raportit/kuvat/laitetestaaja-olavinlinna-kolmas-20261011/kuva-arkki.jpg`; kaikki kuvat ja lokit `proto-3d/lokit/laitetestaaja-olavinlinna-kolmas-20261011/` (`kuvat/w-*.jpg`, `linssi-loki-v6-kaikki.txt`, `aika-v6.txt`).

## Aikajana
| Kello | Tapahtuma |
|---|---|
| 04:09:06 | Olavinlinna (Pelit › Keskeneräiset), Pelaa 04:09:36, laituri 04:09:58 |
| 04:10:19–04:10:35 | Tatti ylös 4 × 2 s: kamera päätyy katsomaan lattiaa (w-04-2…4) |
| 04:10:49–04:10:51 | Loki: Epäily 451 s (jo 13 s laiturille tulosta, liikkumatta) → "varoittaa (2,0 s, mittari 0,96)" 494,2 s → Kiinni 496,2 s |
| 04:10:55–04:12:25 | Tyrmä muunnelma 1; kynttilä 526 s; "lukko aukesi, ovi auki" 558 s |
| 04:12:30 | Loki: **"tyrmästä ulos 77 s:ssa → KIINNI (vesiportti), pelaaja tarkistuspisteeseen"** (575,4 s) – peli siirtää pelaajan laiturille |
| 04:12:45–04:13:50 | Vartija Etsintä → varoittaa → Hälytys (592 s); jäin hälytykseen |
| 04:15:11–04:26:46 | Linna kiinni ja avattu uudelleen: avaus jäi "Jatketaanko siitä, mihin jäit?" -dialogiin |
| 04:27:00 | Jatka → peli alkaa veneestä uudelleen ("jatko tallennuksesta") |
| 04:28:00–04:28:55 | Laituri: Epäily 1541 s, varoitus 1555,5 s |

## Vertailu a–e (v1 → v4 → v6)

### a) Jumi / epäselvä hetki
- **Kiinnijäänti ilman varoitusta:** v1 2–5 s liikkeestä; v4 Epäily+varoitus; **v6: ennallaan kuin v4** – Epäily 13 s laiturille tulosta (liikkumatta), varoitus 2,0 s ennen kiinniottoa, ääni ("epäily-3", "varuste-01"). Ruudulla ei näkynyt varoitusta, lyhtyä eikä puhe-elettä: kun liikuin eteenpäin, kamera kääntyi katsomaan lattiaa (w-04-3, w-19-8), joten vartijaa ei nähnyt juuri varoitushetkellä. **Osittain korjattu / varoituksen visuaalisuutta ei saatu todennettua.**
- **Tyrmän pako:** v1 ja v4 ei onnistunut; **v6: pako tapahtuu automaattisesti** ("tyrmästä ulos 77 s:ssa", oven "lukko aukesi" jo 60 s). Pelaajan oma yritys ei tuottanut mitään: tatti ylös/alas/oikea/vasen liikutti kameraa (kamera nyt huoneen sisällä ja lähtönurkasta pois: w-06-b, w-08-b), mutta ovea ei löytynyt, ja peli teki palautuksen itse. **KORJATTU OSITTAIN** (ei jumi, mutta ei pelaajan toimi; pelaaja ei tiedä miksi päätyi laiturille: ei ilmoitusta).
- **Hälytys-tila (UUSI VIKA):** palauttamisen jälkeen vartija meni Etsintä → Hälytys (mittari 1,00), jolloin **kameran pannaus ei vaikuta** (8 pannausta, kuvat identtiset, w-13-*; tatti liikutti kameraa hieman) ja kamera jäi katsomaan järvelle. Lokissa `Halytys → Etsii → Halytys` 20 ms välein 20 s välein (611,98 / 632,00 / 652,01 / 672,01 s) – silmukka. Pelaajalla ei ole tietä ulos hälytyksestä (6 min).
- **Vihje:** ei testattu uudelleen; lokirivit "kipinä lentää" ovat mukana (vihje 2 laituri 448,7 s, vihje 2 jumi 498,7 s) mutta ruudulla ei näkynyt mitään kuvissa. **ENNALLAAN (a).**
- **UUSI: "Jatketaanko siitä, mihin jäit?" -dialogi** linnan uudelleenavauksessa (w-17-nyt): painikkeet **"Alusta"** ja "Jatka". "Alusta" on epäselvä ("Aloita alusta"/"Alusta alusta"?), ja `ui puu` ei listaa dialogin nappeja (tap-teksti "Aloita"/"Jatka" löytyi vasta toisella yrityksellä). Kartalla dialogin takana näkyy Lontoon luentopaneeli ja karttamerkit: ruutu oli 5 min tässä tilassa.
- **"Tyrmä"-tunniste** (UUSI v4:stä) näkyy yhä kiinnijäännin jälkeen.

### b) Musta / pimeä
- **Laituri:** valoisa ja luettava (w-03, w-19-1…3): **PARANTUNUT (v4:stä), sama.**
- **Tyrmä ilman kynttilää:** lähes musta (w-06-a); koko ruutu ei musta. **ENNALLAAN.** Tyrmä kynttilän kanssa näkyy hyvin: avainnippu lattialla, juutti/allas (w-06-b, w-08-b).
- **Mustat sauvasiluetit (v4):** ei havaittu v6:n kuvissa. **KORJATTU?** (näin vain kamerasta nurkassa/seinien sisällä; tarkistettava kun kamera on huoneessa.)
- Laiturin oikealla lattia/vesi: mustat täytepinnat ennallaan (w-03 oikea reuna).

### c) Kamera seinän sisällä / läpi
- **Tyrmän lähtönurkan jumi (v4): KORJATTU** – kamera liikkuu nyt huoneessa (w-06-b → w-08-b → w-09-*).
- **UUSI/ENNALLAAN:** w-09-a…d näyttää kameran seinien yläpuolella/sisällä (seinien takapuolet, vaaleita levyjä); w-10-alas/w-11-nyt: kamera lentää laiturin yli ja vene/Fogg ylhäältä (kamera ei pysy pelaajan silmissä). Laiturilla liike eteenpäin kallistaa kameran katsomaan lattiaa (w-04-3, w-19-8) – toistuu joka kerta.
- **Hahmokapseli:** Fogg näkyy laiturilla takaa (w-03) ja ylhäältä (w-11-nyt) – "ei pelaajahahmoa" lokissa mutta kuvassa hahmo on.

### d) Väärä teksti / kyltti
- Huonekylttejä ei näkynyt missään (laituri, tyrmä, historia ei testattu tällä kierroksella): **pysyy KORJATTUNA.**
- **UUSI:** karttanäkymässä dialogin takana Lontoon luentopaneeli (teksti "Lontoo, joulukuussa 1873…") näkyy täysin, vaikka pelaaja on linnassa (w-17-nyt) – häiritsevä.
- Dialogin napin teksti "Alusta" (ks. a).
- Repliikeille ei tekstitystä – ennallaan.

### e) Ääni (`kolmas1.wav`, kello = pelikello; RMS 10 s jaksoissa)
- **Laituri:** −24…−29 dB, tapahtumat kuuluvat (soutaja 424/431 s, epäily 451 s) – hyvä, ei toistoja.
- **Tyrmän äänipohja: PARANTUNUT.** Tyrmä 04:11–04:12 (509–579 s): tasainen **−31 dB** (v1/v4: −42 dB) → ~11 dB voimakkaampi, "tyrmän ääniympäristö päällä" 499,9 s. Pohja on edelleen tasainen ilman tapahtumia 70 s.
- **Hälytys-tila: tasainen −28 dB** 590–680 s ("syke nopea (hälytys)", jatkuva sydänsilmukka; ei vaihtelua, ei puheita).
- **UUSI HUOM: täydellinen hiljaisuus (−inf dB, digitaalinen nolla) 829–1449 s = 10 min** kun linna oli suljettu ja kartta + "Jatketaanko?" -dialogi näkyvissä; v4:ssä vastaava jakso oli −46…−49 dB vain 30 s. Tarkista, onko kartan ääni (taustamusiikki) pois päältä dialogin ajan vai kaappaus tyhjä (Mac mykistetty).
- Epäily-repliikki (5,2 s) soi kahdesti per kierros (451 s ja varoituksessa 494 s) – sama klippi; varoitus ei vielä kerro suuntaa.

## Hyvää
1. Tyrmä ei jumita nurkkaan; kamera liikkuu huoneessa (kynttilän valossa avainnippu ja allas selvästi nähtävissä).
2. Tyrmän ääni selvästi voimakkaampi (−31 dB).
3. Peli palauttaa pelaajan itse tarkistuspisteeseen (ei pysyvää jumia tyrmässä).
4. Jatka-ominaisuus ("jatko tallennuksesta") toimii: peli käynnistyy veneestä.
5. Laituri valoisa, Fogg ja vartijat näkyvät; nimikylttejä ei ole.

## Vikalista PT:lle (jäljellä)
1. **Hälytys-tila lukitsee pannauksen ja jää silmukkaan** (Halytys↔Etsii 20 ms / 20 s) · w-12-*, w-13-* · Siirtoseppä.
2. **Pelaaja palautetaan tyrmästä laiturille ilman selitystä**; oven löytämiseen ei ole ohjetta · loki 575,4 s, w-10-alas · Siirtoseppä + NUI (ilmoitus).
3. **Laiturilla eteenpäin kävely kallistaa kameran lattiaan**; vartijaa ei näe varoituksen hetkellä (lyhty/puhe-ele ei näy) · w-04-3, w-19-8 · Siirtoseppä (kamera) / Pelikoodari.
4. **Kamera lentää seinien yli/sisään tyrmässä ja veneen yli laiturilla** · w-09-a…d, w-10-alas, w-11-nyt · Siirtoseppä.
5. **"Jatketaanko?" -dialogi: nappi "Alusta" epäselvä, napit eivät `ui puu`ssa, Lontoon luentopaneeli näkyy dialogin takana, 5 min jumi automaatiolle** · w-17-nyt · Natiivi-UI.
6. **Karttanäkymän/dialogin 10 min täysi hiljaisuus (−inf dB)** · `kolmas1.wav` 829–1449 s · Natiivi-UI/Pelikoodari (tarkista).
7. **Vihje ei näy ruudulla** (lokissa "kipinä lentää") · lokirivit 448,7/498,7 s · Pelikoodari.
8. **Tyrmä ilman kynttilää lähes musta; kynttilä-kuvake ilman selitystä** · w-06-a · Linnanrakentaja/NUI.

## Ei testattu / rajaukset
- Pelaajan oma pako ei ole mahdollista pelkillä kosketuksilla: yhdelläkään tyrmäkäynnillä en löytänyt ovea tai ulospääsyä, pako oli pelin automatiikka (77 s). Tarkistettava, onko tämä tarkoitettu ("pelaajan ulospääsy").
- Historiaa, keittiötä, kappelia ja kolmatta tyrmämuunnelmaa ei testattu tällä kierroksella.
- Ääntä ei kuunneltu (Mac mykistetty); analyysi RMS-tasoista ja lokiriveistä.
- Tatin ohjaus: vasen alakulma; katse: veto oikealla; ei komentotiedostoja liikkeeseen.

Ei korjattu mitään (PT:n ohje).
