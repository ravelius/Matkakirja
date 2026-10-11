# Laitetestaaja: Olavinlinnan ensikertalaisen 5. kierros, yhdistetty 181j (v10, dbaebe31), 11.10.2026

**Tulos: C-PORTTI EI TÄYTY. Linnaan eteenpäin ei päästy (laituri → kiinniotto → tyrmä → laituri, 6 kierrosta 11 min), mutta tyrmästä pääsee nyt ulos OMALLA liikkeellä (todennettu 4/5 yrityksestä, nopein 9 s) ja kynttilä palaa heti, ja paluu laiturille on vapaa. Edelleen: kamera pujahtaa oviaukon karmien seinään, "ulos alle 60 s" ei ole mahdollista (lukko aukeaa 60 s:ssa muunnelmissa 1 ja 3), laiturilla kamera karkaa mustien lohkojen ulkopuolelle.** Vertailu v1 (TF 180), v4 (181d), v6 (181f) ja v8 (181h).

Ajo: iPad Pro 13" -simu `3622D89D` (T7), app `proto-3d/lokit/olavinlinna-yhdistetty-181j` (`kaannos.txt` = dbaebe31), Julkaisijan SIMULAATTORI NYT, ajo 06.36–07.02 (26 min, pelattu 19 min), rinnalla LS1 (load 17–21). Mac mykistetty (`aani mykistys` OK). Oikeat HID-kosketukset (tatti vasen alakulma, katse veto oikealla). Ääni: `viides1.wav` (1500 s, 24 kHz stereo, vain Unityn mikseri) + `viides1-aani.mp3`. **Video:** `viides-720.mp4` (19 min, 720p, ei ääntä). Kuva-arkki: `docs/raportit/kuvat/laitetestaaja-olavinlinna-viides-20261011/kuva-arkki.jpg`; kaikki ja lokit: `proto-3d/lokit/laitetestaaja-olavinlinna-viides-20261011/` (`kuvat/v10-*.png`, `linssi-loki-v10-kaikki.txt`, `aika-v10.txt`, video, ääni). Loki-aika = s pelin käynnistyksestä (0 = 06:36:38).

## Aikajana (loki-s)
| s | Tapahtuma |
|---|---|
| 40–75 | Olavinlinna 15 s:ssa (välimuisti), Pelaa → vene 22 s → laituri |
| 100–200 | Laituri, tatti ylös: Epäily 100 s, Paluu 111 s (palasi partioon), toinen Etsintä 135 s → Paluu 144 s; ei kiinniottoa paikallaan/hitaalla liikkeellä |
| 202,7 | Varoitus (2,0 s), mutta vartija ei pääse kiinni (Etsii → Epäily → Paluu 219 s) |
| 311,5 | Kiinni 1 (varoitus 309,5) → tyrmä 1, **"oma kynttilä sytytetty" 314 s** |
| 374 / 444 | Lukko aukesi (60 s) / **ulos 130 s** (oma liike) |
| 468 | Kiinni 2 → tyrmä 2 (vesipoika, ovi raolleen 18 s) |
| 713 | **ulos 243 s** (kamera jumissa oven pilarissa, löysin 4. yrityksellä) |
| 720 / 723 | Kiinni 3 (varoitus 718,6) → tyrmä 3 (irtokivi); lukko 783; **ulos 89 s** (oma liike) |
| 818 / 821 | Kiinni 4 → tyrmä 1; lukko 881; **ulos 84 s** (oma liike) |
| 938 / 941 | Kiinni 5 → tyrmä 2; ovi auki 947; **ulos 9 s** (oma liike) |
| 958 / 961 | Kiinni 6 → tyrmä 3; lukko 1021; **ei ulos** ~25 yrityksen (2 min) jälkeen |

## C-portin tarkistus
| Kohta | Tulos |
|---|---|
| Loppuun asti | **EI**: linnaan ei päästy; laiturilla Etsintä alkaa 3 s paluusta ja kiinniotto tulee 7–9 s liikkeestä (24 s hitaalla), 6 kiinniottoa. |
| Ei kiinniottoa ilman varoitusta | **OSITTAIN**: varoitus (2,0 s, ääni "epäily-3" + sydän) joka kerta (6/6), mutta vartija ei näy kuvassa varoitushetkellä (v10-14 kamera laiturin ulkopuolella) eikä ole lyhtyä/merkkiä; 2 s on liian lyhyt reagoida. |
| Tyrmä 1/2/3: ulos omalla liikkeellä < 60 s | **EI** muunnelmissa 1 ja 3 (lukko aukeaa lokin mukaan 60 s:ssa, ulos 84–89 s, ensiyrityksellä 130 s); **KYLLÄ** muunnelmassa 2 (9 s, ovi auki 6 s:ssa), mutta 1. kerralla 243 s (kamera karmissa). Muunnelma 3 toisella kerralla ei onnistunut. Oven vihje 20 s välein: **KYLLÄ** (lokissa 20 s välein, kipinä näkyy v10-54, v10-77). |
| Ei mustia ruutuja, kynttilä jo ensimmäisellä käynnillä | **KYLLÄ** tyrmässä (v10-24, "oma kynttilä sytytetty" 314 s, ei mustaa tyrmässä). **EI** laiturilla: suuret täysmustat lohkot (v10-05, v10-12, v10-21) kun kamera lentää eteenpäin. |
| Ei kameraa seinän sisällä | **EI**: oviaukon karmit/pilari upottavat kameran (v10-30, 47, 50, 60, 76, 97, 99-c), kirkas keltainen kattolevy päällekkäin (v10-60, 77); laiturilla kamera ulos reunasta (v10-08–12). |
| Ei vieraita kylttejä | **KYLLÄ**: vain "Tyrmä" ruudun yläreunassa (v10-24, v10-44). |
| Paluuveneessä katse vapaa | **KYLLÄ**: paluu on laiturille (ei veneeseen), kamera kääntyy (v10-42 → 43 → 44). |

## Uudet tarkistukset
- **Syvyystarkkuus/välkkyminen (lähitaso 0,05 m):** laiturilta 4 peräkkäistä kuvaa 0,4 s välein (v10-02, tarkka pikseliero 8 × 8 -ruudukoissa): kaukaiset muurit, torni, järvi ja metsä muuttuvat < 0,5/255 (keskiarvo), ei välkettä; vain liikkuvat hahmot (4–15) ja liekki (4–6). Kaukana järvi ja vuoret katsottuna v10-08, 09, 10, 22: pinnat vakaita, ei z-taistelua. Videossa kaukomaisema myös vakaa. **EI HAVAITTU välkettä.** Ainoa mahdollinen artefakti: lähikäyttäytyminen oviaukon pilareissa (kirkas kattolevy + karmi leikkaavat toisiaan, v10-60, v10-77): pinnat menevät päällekkäin, ei kuitenkaan välky.
- **Laiturin äänipohja paikallaan:** −32…−35 dB (t = 100–120 s: −32/−34, 210–290 s: −33…−35); tavoite −31 dB → **3 dB hiljaisempi kuin tavoite** (v8: −36, tuskin parantunut). Aaltoja en voi erottaa RMS:stä, ei kuunneltu.
- **"Fogg" laiturilla:** kuvissa laiturilla seisoo valkopaitainen miespuolinen hahmo veneen vieressä (v10-02, v10-22), samanlainen kuin v8:n "Fogg" (v8-07). Pelaajalla on 1. persoonan musta hanska (kynttilä kädessä tyrmässä, v10-24 ym.; laiturilla käsi v10-93). Näin ollen laiturin valkopaitainen hahmo on **NPC** (todennäköisesti renki/soutaja, lokissa hahmot `soutaja`, `renki`), ei pelaaja; 1. persoona ei rikkoudu. En voi varmistaa nimeä lokista.

## Vertailu a–e (v1 → v4 → v6 → v8 → nyt v10)

### a) Jumi / epäselvä hetki
- **Kiinnijäänti ilman varoitusta:** v1 ei varoitusta; v4/v6/v8 2,0 s; **v10: 2,0 s kuten ennen (6/6), nyt myös Paluu/Etsii-kierroksia (Epäily 100 s, 135 s, 203 s eivät johtaneet kiinniottoon)**. **ENNALLAAN (varoitus näkymätön).**
- **Tyrmän pako:** v1/v4 ei; v6 automaatti 77 s; v8 82/95/445 s (ajastin?); **v10: oma liike toimii** (84, 89, 130 ja 9 s; 243 s kun kamera karmissa; yksi epäonnistui 2 min). Lokirivi "tyrmästä ulos N s:ssa" vaihtelee 9–243 s, eli ei kiinteä ajastin. **KORJATTU OSITTAIN** (pako onnistuu, ei kaikissa yrityksissä, aikaisintaan 60 s).
- **Hälytys-silmukka (v6):** ei lukitse; Hälytys 0,2–1 s → Kiinni (4/4). **KORJATTU (pysyy).**
- **Vihje:** kipinä näkyy (v10-17, v10-54, v10-67 ym.). Laiturilla "vihje 2 (laituri)" 242 s: kipinä seinän lohkon vieressä (v10-17); auttaa suuntaamaan mutta ei ole selvä, minne. **KORJATTU (v8:sta), pysyy.**
- **Paluu:** v8: vene, kamera lukittu 50 s; **v10: paluu laiturille, katse vapaa. KORJATTU.** Mutta paluussa Etsintä alkaa 3 s:ssa (815,5, 952,9) ja ensimmäinen liike vie kiinni 7–9 s:ssa → silmukka. **UUSI (peli ei etene).**
- **"Jatketaanko?" -dialogi, Sulje linna:** ei testattu tällä kierroksella.

### b) Musta / pimeä
- **Laituri:** valoisa (v10-02, v10-22). **ENNALLAAN (hyvä).** Eteenpäin vedettäessä kamera menee laiturin ulkopuolelle ja täysmustat laatikot täyttävät ruudun (v10-05: puolet ruudusta musta; v10-12, v10-21: mustat sivut + musta kulmapilari) **ENNALLAAN/YHÄ VIKA**; vesi ja kivikumpu näkyvät, mutta kumpuun (harmaa) ja täytepintoihin (sininen) ei ole lisäystä.
- **Tyrmä:** **KORJATTU**: kynttilä palaa heti, ei mustia ruutuja huoneessa; lattian mustat suorakulmiot (v10-34, v10-58: tummat matot/levyt) ovat yhä, mutta luettavissa matoiksi. Oviaukko tummaa (v10-34 vasemmalla musta aukko).
- **Pimennys** (1 s) oviaukon läpi kuljettaessa (v10-40/90-d): ok.

### c) Kamera seinän sisällä / läpi
- **Tyrmän lähtö:** muunnelma 1/3: huoneessa, ei nurkassa (v10-24, v10-65); muunnelma 2: näkyvä huone ja ovi (v10-48). **KORJATTU.**
- **Oviaukko/karmit:** **ENNALLAAN/UUSI**: eteenpäin ovelle mentäessä kamera menee karmin tai pilarin sisään ja ruutu täyttyy seinästä + kirkkaasta kattolevystä (v10-30, 47, 50, 60, 76, 97, 99-c). Kameraa ei saa irti ilman peruutusta; peruutuksella+käännöksellä ovi löytyy (v10-34, v10-58, v10-99-a). Ei kaikkina yrityksinä (tyrmä 3 viimeisellä kerralla 25 yritystä ei onnistunut).
- **Laituri:** kamera lentää reunan yli (v10-08–12). **ENNALLAAN.**
- **Kiinniotto:** v10-14: kamera laiturin ulkopuolella kivikumpua vasten, vartijaa ei näy. **ENNALLAAN.**

### d) Väärä teksti / kyltti
- Huonekylttejä ei, ei vieraita kylttejä: **KORJATTU pysyy.** "Tyrmä"-tunniste ok. Kynttilä-kuvake (oik. alakulma) ilman tekstiä: **ENNALLAAN.** Repliikeille ei tekstitystä: **ENNALLAAN.**

### e) Ääni (`viides1.wav`, capture-s, RMS 10 s)
- **Laituri:** −20…−29 dB tapahtumissa, paikallaan −32…−35 dB. v8: −36. **VÄHÄN PARANTUNUT, tavoitteesta (−31) 3 dB.**
- **Tyrmän äänipohja:** −29…−30 dB tasainen (v6 −31, v8 −30, v1/v4 −42): **ENNALLAAN v8:aan nähden**; tyrmä 3 (irtokivi) yli 100 s tasaista −30 dB ilman tapahtumia.
- **Hälytys/kiinniotto:** piikit −18…−20 dB (t = 920–940 s), kuulee. Ei jaksoa silmukkaa.
- **Epäily-repliikki** "epaily-3" soi sekä Epäilyssä että varoituksessa. **ENNALLAAN.**
- Ei −inf-jaksoja (kartalla ei oltu).

## Hyvää
1. Tyrmästä pääsee ulos omalla liikkeellä (4/5), kynttilä palaa heti, "Tyrmä"-tunniste.
2. Vihjekipinä näkyy ja johdattaa oviaukolle; oven vihje 20 s välein.
3. Paluu laiturille, katse vapaa; Hälytys ei lukitse.
4. Laituri valoisa; ei vieraita kylttejä; kaukomaisema (järvi, linna, metsä) vakaa, ei välkettä.
5. Historia/avaus: Olavinlinna avautuu 15 s:ssa.

## Vikalista PT:lle (tärkeysjärjestyksessä)
1. **Peli ei etene: laituri→kiinniotto→tyrmä-silmukka.** Etsintä alkaa 3 s paluusta, kiinni 7–9 s liikkeestä (6 kiinniottoa / 11 min); linnaan ei päästy; "helpotus" ei näy tässä · loki 815,5 / 952,9, 720,7, 818,8 · Siirtoseppä.
2. **Oviaukon karmit/pilari upottavat kameran seinään** (kirkas keltainen kattolevy + seinä täyttää ruudun), kaikissa muunnelmissa; pako: 9–243 s, tyrmä 3 viimeisellä kerralla ei onnistunut 25 yrityksellä · v10-30, 47, 50, 60, 76, 97, 99-c · Siirtoseppä / Linnanrakentaja (karmin törmäys).
3. **"Tyrmästä ulos alle 60 s" mahdoton muunnelmissa 1 ja 3 (lukko 60 s)**; ulos 84–89 s · loki 374/444, 783/811, 881/905 · Siirtoseppä (jos portti on < 60 s, lukon aikaa lyhennettävä).
4. **Laiturilla eteenpäin kamera lentää reunan yli ja täysmustat lohkot täyttävät ruudun** · v10-05, 12, 21 · Siirtoseppä + Linnanrakentaja.
5. **Varoitus: 2,0 s, vartija ei näy, ei lyhtyä; epäily-3 kahdesti** · v10-14, 64, 65 · Siirtoseppä + NUI.
6. **Laiturin äänipohja −34 dB (tavoite −31)** · `viides1.wav` 100–120 s, 210–290 s · Siirtoseppä (ääni).
7. **Tyrmän ääni −30 dB tasainen (tyrmä 3 > 100 s ilman tapahtumia)** · `viides1.wav` 510–600 s · Siirtoseppä (ääni).
8. **Lattian mustat suorakulmiot tyrmässä; kynttilä-kuvake ilman selitystä; ei tekstitystä repliikeille** · v10-34, 58, 61 · Linnanrakentaja / NUI.

## Ei testattu / rajaukset
- Linnaan eteenpäin (keittiö, kappeli) ei päästy; historiaa, ☰-valikkoa ja "Jatketaanko?" -dialogia ei testattu.
- Pakoajat: pelaajan liike ja tuloksena oleva rivi "ulos N s:ssa"; en voi sulkea pois pelin omaa ajastinta (vaihteleva 9–243 s puhuu sen puolesta, että ei ole kiinteä).
- Ääntä ei kuunneltu (Mac mykistetty), vain RMS-analyysi; kartan natiiviääntä ei tallennettu.
- Kone: LS1 samanaikaisesti (load 17–21), fps ei mitattu.

Ei korjattu mitään (PT:n ohje).
