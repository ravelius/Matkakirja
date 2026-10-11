# Laitetestaaja: Olavinlinnan ensikertalaisen 6. kierros, yhdistetty 181k (v11, e3c5dd17b), 11.10.2026

**Tulos: ENSIMMÄINEN KERTA KUN LINNAAN PÄÄSTIIN: porttikäytävä → pikkupiha → keittiö-alue (~860–1075 s lokissa) ja ☰ › Linnan historia (2 min 16 s) + "Jatketaanko?" toimivat. Kiinniotto varoittaa nyt 3 s ja katse kääntyy vartijaan (loki), turva-aika 60 s tyrmästä palatessa toimii, kynttilä palaa heti. Mutta: oviaukon karmi upottaa kameran seinään edelleen, tyrmä 3 (irtokivi) ja 1 ovat yli 60 s (176 s ja 553 s), keittiö on täysin musta ja linnan sisällä vartijat vievät pelaajan takaisin tyrmään 3 kertaa 22 min:ssa.** Vertailu v10:een (5. kierros) sekä v1/v4/v6/v8:aan.

Ajo: iPad Pro 13" -simu `3622D89D` (T7), app `proto-3d/lokit/olavinlinna-yhdistetty-181k` (`kaannos.txt` = e3c5dd17), Julkaisijan SIMULAATTORI NYT, ajo 07.51–08.18 (27 min, pelattu 25 min). Mac mykistetty (`aani mykistys` OK). Oikeat HID-kosketukset. Ääni: `kuudes1.wav` (1500 s, 24 kHz stereo, vain Unityn mikseri; `kaappaa 1500 v11` lähetetty linssi-komentona). Video: `kuudes-720.mp4` (25 min, 720p, ei ääntä). Kuva-arkki: `docs/raportit/kuvat/laitetestaaja-olavinlinna-kuudes-20261011/kuva-arkki.jpg`; kaikki kuvat, lokit, ääni ja video: `proto-3d/lokit/laitetestaaja-olavinlinna-kuudes-20261011/` (`kuvat/v11-*.png`, `linssi-loki-v11-kaikki.txt`, `aika-v11.txt`). Loki-aika = s pelin käynnistyksestä (0 = 07:51:1x).

## Aikajana (loki-s)
| s | Tapahtuma |
|---|---|
| 62–77 | Olavinlinna, Pelaa → vene → laituri (vihje 2 "laituri" 77 s) |
| 95–217 | Laituri: Epäily 95,8 / 107 / 143 s → Paluu (3 kertaa, ei kiinniottoa kun seisoin tai käänsin) |
| 223,1 | **Varoitus 3,0 s, "katse varoittajaan (112°)"** → Kiinni 226,1 |
| 228,6 | Tyrmä 1 (avaimet ilmaraosta), **oma kynttilä palaa heti**; lukko 45 s (273,6) |
| 781,1 | Tyrmästä ulos **553 s** (vihjeet 20 s välein, ei ulospääsyä omalla liikkeellä), sitten "vapautus, turva 60 s" |
| 781–868 | Laituri turvassa: vartija Epäily/Paluu, ei kiinniottoa 87 s; **kävelin laiturilta porttikäytävään (858 s), pikkupihalle (868 s)** |
| 872,5 | Varoitus 3,0 s (kirkkotorni-portaat) → Hälytys → Kiinni 878 s |
| 880–913 | Tyrmä 2 (vesipojan ovi): ovi auki 886 s; **ulos 32 s** omalla liikkeellä (+ turva 60 s) |
| 913–1071 | Laituri → portti → pikkupiha → **keittiö-G102** (vartija "Etsintä/Paluu", kokki-repliikit 985/995 s) |
| 1072 | Varoitus 3,0 s, katse -127° → Kiinni 1076,7 (kirkkotorni-portaat) |
| 1079–1255 | Tyrmä 3 (irtokivi): lukko 45 s (1124), **ulos 176 s** |
| 1270–1430 | ☰ › Linnan historia 135,8 s; päättyi itsestään |
| 1454 | Paluu pelaajalle: varoitus 3 s, kiinni 1457 s (tyrmä 1) |
| 1520 | Sulje linna → kartta; uudelleenavaus → **"Jatketaanko?"** (napit ja Jatka toimivat) |

## C-portin tarkistus (PT:n lista)
| Kohta | Tulos |
|---|---|
| Linnaan ja niin pitkälle kuin pääsee | **KYLLÄ**: laituri → porttikäytävä → pikkupiha → keittiö-alue. Kappelia ja keittiön sisätiloja ei nähty: keittiö oli täysin musta (v11-36–38, 41 mustaa kuvaa). |
| Turva-aika ~60 s ja helpotus | **KYLLÄ**: "vapautus, turva 60 s" jokaisen tyrmästä palaamisen jälkeen (781, 912, 1255 s); 87 s turvassa (781–868 s) kunnes vartija varoitti. "Kiinnijäänti N. kerran (helpotus)" lokissa. |
| Varoitus 3 s, katse kääntyy vartijaan | **LOKISSA KYLLÄ**: "katse varoittajaan (112° / −127° / −42°)", varoitus "3,0 s" 4/4. Ruudulla katseen käännöstä en ehtinyt kuvata (3 s välein); vartija ei ollut kuvassa varoitus- ja kiinnioton hetkellä (kamera laituri/muuri), joten **visuaalinen osoitus puuttuu edelleen / ei todennettu**. Kosketus keskeyttää: en testannut. |
| Karmit/oviaukot ilman seinäkuvaa | **EI**: kamera menee edelleen oven karmiin ja ruutu täyttyy kirkkaasta kattolevystä + seinästä (v11-20, 21-c/d, 22-c, 24, 25, 26-*, 33-*, 41, 42, 43, 44, 45). Peruutus + käännös tuo huoneen takaisin. |
| Kaikki tyrmämuunnelmat omalla teolla < 60 s | **OSITTAIN**: muunnelma 2: **32 s** (OK). Muunnelma 1: ulos 553 s ja 1. käynti > 3 min (EI); muunnelma 3: ulos 176 s (EI). Lukko 45 s (lokissa), vihje 10 s: vihje näkyy **20 s välein** lokissa (ei 10 s). Avaimet astumalla: ei havaittu (avaimet näkyvät lattialla, v11-21-a, v11-27-d, mutta niihin ei menty). |
| Laiturin äänipohja ~−31 dB | **−33…−34 dB** (150–190 s, 810–850 s, 940–960 s capture-sekunnit); v10: −34 → **ENNALLAAN (2–3 dB hiljaisempi kuin tavoite)**. |
| Tyrmän harvat tapahtumat | Tyrmä: **−29…−30 dB tasainen** 230–750 s ja 1090–1250 s (v10 −30, v8 −30). Harva tapahtuma-asiat (avainnippu, vihje) kuuluvat vain piikkeinä. **ENNALLAAN.** |
| Mustat lohkot laiturilla / mustat laatikot tyrmässä | Tiedossa (LR), kirjattu: laiturin mustat lohkot täyttävät ruudun (v11-03-3, v11-31-1, v11-36-5/6), tyrmän lattian mustat suorakulmiot näkyvät (v11-19-2, v11-22-a). |

## Vertailu v10 → v11 (a–e)

### a) Jumi / epäselvä hetki
- **Kiinniotto/varoitus:** v10 2 s → **v11 3 s + katse varoittajaan** (loki). Varoitus tulee vain kun liikkuu; paikallaan Epäily → Paluu (6/6). **KORJATTU OSITTAIN (visuaalisuus ei todennettu).**
- **Peli ei etene (v10 vika 1):** **KORJATTU**: turva 60 s tyrmästä palatessa antaa 87 s ja pääsin linnaan. Mutta linnan sisällä vartijat (kirkkotorni-portaat, vesiportti) vievät kiinni 3 kertaa 20 min:ssa (872 s, 1072 s, 1454 s) → peli ei etene keittiön ohi.
- **Pako omalla liikkeellä:** v10 4/5; **v11: 1/3 < 60 s (muunnelma 2, 32 s), 2/3 > 60 s (176, 553 s) ja ennen 1. käynnillä muunnelma 1 ei onnistunut.** **EI PARANTUNUT**; lukko nyt 45 s (muunnelma 1 ja 3) mutta kamera karmiin ei auta.
- **"Tyrmästä ulos N s" = KIINNI → tarkistuspiste** (lokiriveillä peräkkäin) eli ulospääsy tulkitaan kiinniotoksi ja pelaaja siirretään laiturille: ei koe etenemistä. **UUSI HUOM.**
- **Historia:** päättyy itse 135,8 s, mutta palaa pelaajaan ilman vaiheiden palautusta: vartija kiinnittää pelaajan 24 s palattua (1454–1457 s). **UUSI VIKA.**
- **Jatketaanko?** napit löytyvät puusta, Jatka → vene 15 s. Lontoon luentopaneeli näkyy himmennettynä dialogin takana (v11-49). **ENNALLAAN.**
- **Vihje:** kipinä näkyy (v11-19-2 ja v11-20-a: hehkuva pallo lattialla/seinällä). **ENNALLAAN (hyvä).**
- Pelaajan kynttilä-kuvake: napautus sammuttaa kynttilän (loki 1049,85 "SammutaOma") ja syttyy uudelleen (1068,8); sammuneena ruutu täysin musta (v11-39-a). **ENNALLAAN.**

### b) Musta / pimeä
- **Tyrmä:** kynttilä palaa heti (228,6 s) ja huone näkyy (v11-19-2, v11-22-a). **PYSYY KORJATTUNA.**
- **Keittiö-alue ja linnan sisäpihat:** **täysin mustat** (v11-36-5,6; v11-37-a,b; v11-38-1…6; v11-39-a): ruudulla vain kynttilän liekki ja käsi; seinät/lattia eivät näy, vaikka pelaajan kynttilä palaa. **UUSI VIKA (kriittinen: estää keittiön tutkimisen).**
- **Laituri:** valoisa; mustat lohkot täyttävät puolet ruudusta kun kamera kääntyy muurin suuntaan (v11-03-3, v11-31-1, v11-36-1) – tiedossa. **ENNALLAAN.**

### c) Kamera seinän sisällä / läpi
- **Karmit:** ks. C-portti: **ENNALLAAN**. Tyrmä 3: kamera aloittaa huoneessa mutta eteenpäin menee seinään (v11-41-c/d, 43-a/b). Peruutus 4–5 askelta palauttaa huoneen; ovi näkyy oviaukkona mutta kamera ei mene läpi omalla liikkeellä.
- **Ovi oikealla = käännä oikealle:** pannauksen suunta on käänteinen (veto vasemmalle = katse oikealle); ensikertalaisen on vaikea tietää.
- **Pelaajan käsi:** 1. persoonan käsi + kynttilä (oma) – **sääntö ok**; NPC:t (renki/soutaja valkopaita, kokki, vartijat) kuvassa.
- **Laiturilta linnaan kamera kulkee muurin sisään** (v11-32, 33: seinät läpinäkyviä, oikealla lohko). **ENNALLAAN.**

### d) Väärä teksti / kyltti
- Ei huonekylttejä; "Tyrmä"-tunniste ruudun ylälaidassa (v11-41-a), **uusi: tietokortit** "3 Perustamistaulu", "4 Keittiö" 1072 s (tekstikortit, ei kuvissa). **ENNALLAAN/OK.**
- **Kehittäjäkonsoli** (punainen virheteksti) täyttää alakulman linnan sisällä: "Cannot get data on compressed samples for audio clip 'Tehoste:varuste-04'… set DecompressOnLoad" (toistuu, v11-37-a konsoli-zoom). **UUSI (rikkoo äänen: Tehoste:varuste-04 ei soi; vaikuttaa vain varoituksen varusteääneen).**
- Historian tekstitys alareunassa menee dev-konsolin alle (v11-47-a): vain kehittäjätila.

### e) Ääni (`kuudes1.wav`, capture-s, RMS 10 s)
- **Laituri paikallaan:** −33…−34 dB (150–190, 810–850, 940–960) vs tavoite −31: **3 dB liian hiljainen; v10 −34: ENNALLAAN.**
- **Tyrmä:** −29…−30 tasainen (230–750 s = 8,7 min; 1090–1250). Tapahtumien piikit −19…−25 dB (varoitus ja kiinniotto 210, 760–790, 860–870, 980–1060 s). **ENNALLAAN.**
- **Linnan sisällä (porttikäytävä, pikkupiha, keittiö):** −24…−18 dB 760–800 ja 960–1070 s: kuuluu askel, kauha (loki "keittio-07"), kokki-repliikit. **UUSI: hyvä.**
- **Historia:** −20…−21 dB tasainen 1280–1400 s, päättyy −25. **HYVÄ**.
- **Ei −inf-jaksoa**: karttavaiheessa ei tallennettu (kaappaus päättyi 1500 s).
- "epaily-3" kahdesti Epäilyssä ja varoituksessa (95,8 s ja 107 s): **ENNALLAAN**.

## Hyvää
1. **Linnaan päästiin** (porttikäytävä, pikkupiha, keittiö-alue): ensimmäinen kerta.
2. Turva-aika 60 s tyrmästä palatessa; varoitus 3 s + katse vartijaan (lokissa).
3. Muunnelma 2 (vesipojan ovi) onnistuu omalla liikkeellä 32 s.
4. Historia (2 min 16 s) kaunis ja ääni vakaa; Jatketaanko? toimii.
5. Linnan äänet (askeleet, kauha, kokin repliikit) kuuluvat.
6. Pelaajan käsi + kynttilä 1. persoonassa.

## Vikalista PT:lle (tärkeysjärjestyksessä)
1. **Keittiö ja linnan sisäpihat täysin mustia** (vain kynttilän liekki ja käsi näkyvät) · v11-36-5/6, 37-a/b, 38-1…6, 39-a · Linnanrakentaja/Siirtoseppä (valot/materiaalit).
2. **Oviaukon karmi upottaa kameran seinään** (kattolevy+seinä täyttää ruudun); tyrmä 1 ja 3 > 60 s (553, 176 s); lukko 45 s ei auta · v11-20, 21, 24, 26, 41–45 · Siirtoseppä.
3. **Linnassa vartijat vievät pelaajan takaisin tyrmään 3 kertaa 20 min:ssa** (kirkkotorni-portaat 872 s, 1072 s; vesiportti 1454 s); keittiön ohi ei päästä; "ulos" = Kiinni · loki 872, 1072, 1454 · Siirtoseppä (vartija-AI).
4. **Historian jälkeen vartija kiinnittää pelaajan 24 s kuluttua** (pelaaja ei ehdi reagoida) · loki 1430–1457 s · Siirtoseppä.
5. **Konsoli: "Cannot get data on compressed samples for audio clip 'Tehoste:varuste-04'"** toistuu · v11-37-a · Pelikoodari (äänileikkeen load type).
6. **Varoituksen visuaalisuus ei todennettu** (katse kääntyy lokissa, vartijaa ei kuvassa), vihje 20 s (ei 10 s), avaimet astumalla ei havaittu · loki 223, 1072, 1453 · Siirtoseppä + NUI.
7. **Laiturin äänipohja −34 dB (tavoite −31); tyrmän ääni −30 dB tasainen 8,7 min** · `kuudes1.wav` 150–190, 230–750 s · Siirtoseppä (ääni).
8. **Laiturin mustat lohkot ja tyrmän lattian mustat suorakulmiot (tiedossa, LR)** · v11-03-3, 31-1, 19-2 · Linnanrakentaja.
9. **"Jatketaanko?" -dialogin takana Lontoon luentopaneeli; "Alusta" epäselvä; kynttilä-kuvake ilman selitystä** · v11-49 · Natiivi-UI.

## Ei testattu / rajaukset
- Kappelia ja keittiön sisätiloja ei nähty (keittiö musta); kosketuksella varoituksen keskeytys ja avaimet astumalla jäi testaamatta.
- Katseen käännöstä varoituksessa ei kuvattu (3 s välein 1 kuva); tulos lokista ("katse varoittajaan").
- Tyrmän pakoajat ovat kulloinkin pelaajan liike + peli; "ulos N s" voi sisältää ajastimen (176/553 s vs 32 s puhuu sen puolesta, ettei kiinteä).
- Ääntä ei kuunneltu (Mac mykistetty), vain RMS ja lokiriveillä; kartan natiiviääntä ei tallennettu.
- Kone: LS1/muut simut rinnalla (load ~20), fps ei mitattu.

Ei korjattu mitään (PT:n ohje).
