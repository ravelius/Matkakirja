# Laitetestaaja: Olavinlinnan 7. kierros, osat aloituskohdista (v12, olavinlinna-auto-1011-1009, 6d5756c0), 11.10.2026

**Tulos osittain: C-PORTTI EI TÄYTY. 7 botin hyväksymästä osasta oikeilla kosketuksilla etenevät vain porttikäytävä (14 s) ja laiturilta portille (25 s); sisäpihat, muuriportaat, tyrmä ja paluu jäävät seinään tai mustaan, ampumakäytävä liikkuu mutta on lähes musta. Koko läpipeluuta EI ajettu (PT:n ohje: vasta kun kaikki osat läpi). Keittiön sisätila näkyy nyt (pata, tuli, kokki), mutta väärien kylttien kanssa; nimikyltit ovat palanneet (6 laiturilla, Keittiö-kyltti myös tyrmässä).**

Ajo: iPad Pro 13" -simu `3622D89D` (T7), app `proto-3d/lokit/olavinlinna-auto-1011-1009` (`kaannos.txt` = 6d5756c0, sama käännös kuin Siirtosepän botilla), Julkaisijan SIMULAATTORI NYT, ajo 10.31–11.05 (34 min). **Kone kuormassa (load 100–258)**: linnan avaus kesti 207–345 s, ja **appi putosi kerran SpringBoardiin** aloituskohdan "laituri valmis" jälkeen (10:37:4x; ei kaatumisraporttia, `DiagnosticReports` vain simun pohjaprosesseja; uudelleenkäynnistys → aloitus alusta). Mac mykistetty (`aani mykistys` OK). Oikeat HID-kosketukset (tatti vasen alakulma, katse veto oikealla). Aloituskohdat komennolla `poikki seikkailu aloitus <kohta>` (`linssi-komento.txt`); osat laituri, porttikaytava, sisapihat, muuriportaat, ampumakaytava, tyrma, paluu. Ääni: `seitsemas1.wav` (1500 s, 24 kHz stereo, vain Unityn mikseri) + `seitsemas1-aani.mp3`; video `seitsemas-720.mp4` **VAIN ALKU 16 min (10:31–10:47: kartta, appin pudotus, uudelleenkäynnistys, linnan lataus)**: tallenne rikkoutui 2,8 Gt kohdalla (`recordVideo`, alkuperäinen 33 min, loppuosa ei purettavissa: "partial file"), osien testaus 10:49–10:58 ei ole videolla; todisteena kuva-arkki ja `kuvat/`. Kuva-arkki: `docs/raportit/kuvat/laitetestaaja-olavinlinna-seitsemas-20261011/kuva-arkki.jpg`; kaikki kuvat, lokit, ääni ja video: `proto-3d/lokit/laitetestaaja-olavinlinna-seitsemas-20261011/` (`kuvat/v12-*.png`, `linssi-loki-v12-kaikki.txt`, `aika-v12.txt`). Loki-aika = s pelin käynnistyksestä (0 = 10:39:3x); äänen aika = loki − 21 s.

## Osat (aloituskohdasta, ensikertalaisen kävely)
| Osa | Aloitus | Ensikertalaisella etenee? | Kuvat |
|---|---|---|---|
| laituri | OK (valmis 4–6 s; 1. yritys ei: "linna ei auki" kun Pelaa ei ollut painettu) | **OSITTAIN**: 4 askelta + pieni käännös vie portin aukolle ja vartijan taakse (25 s, v12-13-4); suoraan eteenpäin etenee kivikon reunaan ja pysähtyy (6 samaa kuvaa, v12-16-3, v12-23-*); portin jälkeen kamera menee pilarin/seinän sisään (v12-14, v12-19, v12-21). Tarkistuspiste vaihtuu kerran sekunnissa 4 kertaa seinän vierellä (loki 648,45–649,53: vesiportti ↔ porttikaytava-T102 ↔ ranta-1499). | v12-13…23 |
| porttikaytava | OK | **LÄPI** 14 s: käytävä + portaat etenevät, "tarkistuspiste porttikaytava-T102 → pikkupiha" 872,0 s; vartija lyhdyn kanssa näkyy pikkupihalla (v12-24-3). Pikkupihan jälkeen kamera menee seinään (v12-24-4/5). | v12-24 |
| sisapihat | OK | **EI**: aloituksessa kamera lähellä vesiastiaa/seinää, ruutu muuttuu ruskeaksi lähes mustaksi mutta ei etene; vesi-astian takana avautuu keittiön sisätila (v12-26-c) vasta peruuttamalla 2 askelta ja kääntymällä. | v12-25, v12-26 |
| muuriportaat | OK | **EI**: pyöreä huone (torni) näkyy aluksi (v12-27-1), sitten seinä täyttää ruudun; askeleet 3–6 identtiset. | v12-27 |
| ampumakaytava | OK | **OSITTAIN**: etenee ja avautuu keskushalli, jossa vouti + hoitaja pöydän ääressä (v12-28-2/3), mutta alku ja kupu **lähes mustat** (v12-28-1, 4). | v12-28 |
| tyrma | OK (kiinniotto → tyrmä, kynttilä palaa heti 1015,8 s) | **EI**: ensimmäinen eteenpäin-askel vie kameran seinään (v12-29-2…3, v12-30-c…e, v12-31-*, ruutu täynnä kiveä); peruutus ei auta (4 askelta, v12-31-a…e). Ovi aukesi lokissa 45 s:ssa (1060,84), omalla liikkeellä ei ehditty ovelle. | v12-29…31 |
| paluu | OK (KIINNI → turva 60 s, 1116,28) | **EI**: aloitus keittiössä, kokki + takka näkyvät (v12-32-a), ensimmäinen askel vie kameran padan sisään (ruskea/musta ruutu, v12-32-2…4). | v12-32 |

## C-portin tarkistus
| Kohta | Tulos |
|---|---|
| Ei kiinniottoa ilman näkyvää varoitusta | **EI TODENNETTU/EI**: kiinniottoja tuli vain kehittäjän aloituksissa (2), varoituksia ei syntynyt (ei vartijan Etsintää minuun asti). Vartija huusi ("huusi, 2 tulee" 900,3 / 1127,8 s) mutta ei näkynyt kuvassa. |
| Tyrmästä < 60 s omalla liikkeellä | **EI** (lukko 45 s, mutta kamera seinässä heti; ~100 s yritys ei onnistunut). |
| Ei mustia huoneita/lohkoja | **EI**: sisäpihat ja paluu ruskeat/mustat, ampumakäytävä lähes musta, laiturilla sinimustat kiviröykkiöt. Tyrmä ja porttikäytävä ok. |
| Kamera ei seinän sisällä (myös karmit) | **EI**: portin jälkeen, sisäpihoilla, muuriportailla, tyrmässä ja paluussa (v12-14-3, 19, 21, 27, 30, 31, 32). |
| Ei vieraita nimikylttejä | **EI**: laiturilla 6 kylttiä (Kierreportaat, Muurinharja, Fatabuuri, Kappeli, Laituri, Keittiö; v12-15-a, v12-33), "Keittiö" myös tyrmässä (v12-29-1) ja "Laituri/Kierreportaat/Fatabuuri" keittiön sisällä (v12-26-c); kyltit pysyvät 100 s paikallaan. |

## Erikseen v12
- **Keittiön sisätila kävellessä:** **KYLLÄ osittain** (v12-26-c, v12-32-a): pata, tuli, pöytä, kokki, lamppuvalo, ruskea väritys; mutta aloituspaikka on padan/seinän sisässä ja liike vie kameran padan sisään; kyltit väärin (yllä). Loki: "keittio-G102: tila piirtää sisätilan, kävelyosa ulkokuoren" (206 s).
- **Kiinniotot linnassa (määrä ja kellonajat):** 0 pelaajan aiheuttamaa. Kehittäjän kiinniotot: 1014,3 s (tyrmä), 1116,3 s (paluu, "KIINNI (kirkkotorni-portaat)" + "vapautus, turva 60 s"). Vartijat: keittio-G102 Epäily→Hälytys 900,3 s ja 1127,8 s ("huusi, 2 tulee") ei kiinniottoa; kirkkotorni-portaat Etsii↔Epäily silmukka 955–962 s (4 vaihtoa 6 s:ssa).
- **Tyrmän vihje yhdestä lähteestä:** loki "vihje 2 (tyrmä 10/15 s)" 1028,8 / 1043,9 / 1058,9 s (15 s välein) + "vihje 2 (tyrma-ovi-auki)" 1060,8 s: **yksi lähde, mutta väli 15 s (ei 10)**; kipinä ei näkynyt ruudulla koska kamera oli seinässä.
- **Pisteet 8 (ramppi), 16 (sillat), 20 (kappelin ovi):** loki "kävelypaikat 4 (ramppi:porttikaytava-T102, silta:kierreporras-ala, silta:kierreporras-yla, silta:kappeli-porras)" 225 s; ramppi porttikäytävässä käveltiin (porttikaytava LÄPI, askelkuvat v12-24-1/2, nousu portaille), siltoja ja kappelin ovea EI saavutettu (osat eivät olleet hyväksyttyjen joukossa).
- **Laiturin äänitaso:** paikallaan **−33…−32 dB** (capture 1200–1490 s = loki 1221–1511) vs tavoite −31: **1 dB tavoitteen alla; v11 −33…−34, v10 −34 → pieni parannus, lähes tavoitteessa.** Tyrmän pohja **−30 dB tasainen** (capture 1010–1090 s), ennallaan.
- **Laiturin mustat lohkot:** ennallaan: sinimustat kiviröykkiöt laiturin sivuilla, "kivikko" jossa sininen lätäkkö (v12-15-a, v12-16-3, v12-33): ei täysmustia lohkoja kuten v11, **PARANTUNUT?** mutta sinisen kallion pinta näyttää tasaiselta mustansiniseltä.
- **Konsoli:** "NullReferenceException: Object reference not set to an instance of an object" punaisena heti aloituskohdan jälkeen ja laiturilla (v12-13, v12-15, v12-33): **UUSI**; "kaupunkilehdet.json epäonnistui: Request timeout" kartalla (v12-05, kuorma).
- **Appi putosi** SpringBoardiin aloituskohdan "laituri valmis" (338,95 s) jälkeen (kone load 150): **UUSI, epäselvä** (kuorma vai kaatuminen).

## Ääni (`seitsemas1.wav`, capture-s, RMS 10 s)
- 0–160 s: −35…−48 dB (kartta, linnan lataus); **170–260 s: −inf (90 s täysi hiljaisuus)**; 270–320 s: −31…−14 dB piikit; **330–530 s: −48 dB tasainen (200 s)**. Nämä jaksot osuvat linnan latausaikaan (lokissa 190–550 s; vene alkoi 564 s), joten hiljaisuus on latausruudun aikaista (kuorma), ei peliä: **sama ilmiö kuin v6:n 10 min −inf kartalla; kuormassa 90 s täysi nolla ja 200 s −48 dB latausruudun aikana.**
- 540–990 s: −33…−18 dB, osat (portti, pihat, ampumakäytävä, halli): tapahtumat kuuluvat.
- 1000–1090 s: tyrmä −29…−30 dB tasainen; 1200–1490 s: laituri paikallaan −32…−33 dB.

## Hyvää
1. Aloituskohdat toimivat (valmis 4–6 s) ja säästävät minuutteja; linna aukeaa kuormassakin.
2. Porttikäytävä etenee täysin (14 s), pikkupihalla vartija lyhdyn kanssa kauniisti valaistu.
3. Keittiön sisätila renderöityy (pata, tuli, kokki, pöytä).
4. Tyrmä: kynttilä palaa heti, vihje 15 s välein, lukko 45 s.
5. Laiturin äänipohja lähes −31 dB; tyrmä −30 dB.
6. Vouti + hoitaja keskushallissa (ampumakäytävä), hyvä tunnelma.

## Vikalista PT:lle (tärkeysjärjestyksessä)
1. **Kamera seinän sisällä ensimmäisestä askeleesta: tyrmä, paluu, sisäpihat, muuriportaat, portin jälkeinen seinäkuja** (peruutus ei auta) · v12-29–32, 25, 27, 19, 21 · Siirtoseppä/Linnanrakentaja (kameran törmäys, aloituspaikat).
2. **Aloituskohta paluu/sisäpihat keittiön padan sisässä; peruutus 2 askelta avaa keittiön, eteenpäin vie padan sisään** · v12-25, v12-32 · Siirtoseppä.
3. **Nimikyltit takaisin: 6 laiturilla, Keittiö tyrmässä, Laituri/Kierreportaat/Fatabuuri keittiössä** · v12-15-a, v12-29-1, v12-26-c · Siirtoseppä (kyltit).
4. **Mustat/ruskeat tilat: ampumakäytävä, sisäpihat, paluu** · v12-25, v12-28-1/4, v12-32-2…4 · Linnanrakentaja (valot).
5. **Laiturilta suoraan kivikkoon ja pysähtyy; portille vie vain pieni käännös; portin jälkeen seinäkuja** · v12-16-3, v12-23, v12-19 · Siirtoseppä (polku/kamera).
6. **Appi putosi aloituksen jälkeen kuormassa; NullReferenceException konsolissa** · 10:37:4x, v12-13 · Pelikoodari.
7. **Tarkistuspiste vaihtuu 4 kertaa 1 s:ssa portin seinällä** (vesiportti ↔ porttikaytava-T102 ↔ ranta-1499) · loki 648,45–649,53 · Pelikoodari.
8. **Ääni: latausruudun aikana 90 s täysi hiljaisuus ja 200 s −48 dB (kuormassa; ei peliä)** · `seitsemas1.wav` 170–260, 330–530 s · Natiivi-UI/Pelikoodari (latausruudun ääni).
9. **Vihje tyrmässä 15 s (ei 10 s); kipinä ei näy kun kamera seinässä** · loki 1028–1060 s · Siirtoseppä.

## Ei testattu / rajaukset
- Koko ensikertalaisen läpipeluuta (laituri → loppu) ei ajettu; osat keittiö, kirkkotorni, tott-kammio, kappeli, palatsi, sali, muurikäytävä, harja, komero, pako (botti EI LÄPI) jätettiin.
- Pisteet 16 (sillat) ja 20 (kappelin ovi), kappeli ja loppu: ei saavutettu. Kiinniotto pelaajan toimesta + varoitus: ei syntynyt (vartijat pysyivät Epäily/Paluu).
- Tyrmästä ulospääsy < 60 s omalla liikkeellä: kamera seinässä heti, ei pelaajan ohitusta.
- Kone kuormassa (load 100–258), fps/lataus ei mitattu; appi putosi kerran.
- Ääntä ei kuunneltu (Mac mykistetty), vain RMS ja lokirivit.

Ei korjattu mitään (PT:n ohje).
