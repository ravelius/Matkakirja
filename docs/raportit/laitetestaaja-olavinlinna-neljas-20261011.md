# Laitetestaaja: Olavinlinnan ensikertalaisen 4. kierros, yhdistetty 181h (v8, 653b7ce3), 11.10.2026

**Tulos: tyrmästä pääsee ulos vain pelin omalla ajastimella, ei pelaajan toimesta (muunnelmat 1 ja 2 noin 80–95 s, muunnelma 3 vasta 445 s). Linnaan eteenpäin ei päästy. Vihjekipinä NÄKYY nyt ruudulla (ensimmäistä kertaa), Hälytys-silmukka on korjattu, ja "Jatketaanko?" -dialogin napit löytyvät UI-puusta. Tyrmän oviaukko ei ole läpikuljettava: kamera jää oven pilariin seinän sisään.** Vertailu 1. ajoon (v1, TF 180), uusintaan (v4, 181d) ja 3. kierrokseen (v6, 181f).

Ajo: iPad Pro 13" -simu `3622D89D` (T7), app `proto-3d/lokit/olavinlinna-yhdistetty-181h` (`kaannos.txt` = 653b7ce3), Julkaisijan SIMULAATTORI NYT, ajo 05.30–05.57 (27 min), kuormaa ei mitattu (1 muu simu käynnissä). Mac mykistetty (`aani mykistys` OK). Ääni: `neljas1.wav` (1500 s, 05:31:45–05:56:45, 24 kHz stereo; `neljas1-aani.mp3`), vain Unityn mikseri (natiivi-wav tyhjä). Kuva-arkki: `docs/raportit/kuvat/laitetestaaja-olavinlinna-neljas-20261011/kuva-arkki.jpg`; kaikki kuvat, lokit ja aikataulukko: `proto-3d/lokit/laitetestaaja-olavinlinna-neljas-20261011/` (`kuvat/v8-*.png`, `linssi-loki-v8-kaikki.txt`, `aika-v8.txt`). Loki-aika = sekuntia pelin käynnistyksestä (05:30:44 = 0).

## Aikajana
| Kello (loki-s) | Tapahtuma |
|---|---|
| 05:32 (65) | Olavinlinna avautui 15 s:ssa (välimuisti); Pelaa → vene 22 s → laituri |
| 05:33 (128–176) | Laituri: vihje 2 (kipinä), vartijan riita, tatti ylös → Epäily 152 s → varoitus 173,2 → Hälytys 175,2 → Kiinni 176,1 |
| 05:33–05:35 (178–260) | Tyrmä muunnelma 1 (avaimet ilmaraosta): lukko aukesi 238,6 → **"tyrmästä ulos 82 s:ssa"** (260,4) |
| 05:35–05:36 (260–325) | Paluu: vene, kamera lukittu järvelle ~50 s, sitten laituri (riita 272/325 s) |
| 05:37–05:40 (342–444) | Kiinni 346 s (Epäily→kiinni 4 s); tyrmä muunnelma 2 (vesipojan ovi): "ovi työnnetty auki" 433,9 → **ulos 95 s:ssa** (444,1) |
| 05:41–05:43 (476–567) | Laituri paikallaan 53 s: **ei Epäilyä**; liikkeestä Etsintä 563,8 → varoitus 564,8 → Kiinni 567,9 |
| 05:41–05:47 (570–1015) | Tyrmä muunnelma 3 (irtokivi): lukko aukesi 630,4; **ei poistumista, kunnes "ulos 445 s:ssa" (1015,6)** |
| 05:47–05:48 (1015–1090) | Kiinni 3 s kuluttua paluusta; tyrmä 4 (muunnelma 1): lukko 1087 |
| 05:49–05:51 | Sulje linna → kartta; uudelleenavaus → "Jatketaanko?" → Jatka → vene 15 s:ssa; Sulje linna |

## Vertailu a–e (v1 → v4 → v6 → nyt v8)

### a) Jumi / epäselvä hetki
- **Kiinnijäänti ilman varoitusta:** v1 2–5 s; v4 ja v6 varoitus 2,0 s; **v8: varoitus 2,0 s kuten ennen, mutta uusi piirre: paikallaan seisova pelaaja ei saa Epäilyä (53 s, v8-42…44), liikkeestä Epäily/Etsintä alkaa (v6: Epäily 13 s paikallaan)**. Varoituksesta kiinniottoon 2,2–3,0 s (4 kertaa); Epäilystä kiinni 4–24 s. Varoituksen hetkellä vartija näkyy ja kääntyy pelaajaan (v8-46), mutta ruudulla ei lyhtyä, merkkiä eikä tekstiä, ja kamera on seinän sisällä (ks. c). **KORJATTU OSITTAIN (vartija näkyy varoitushetkellä; muu visuaalinen puuttuu).**
- **Tyrmän pako:** v1/v4 ei onnistunut, v6 automaattinen 77 s. **v8: muunnelma 1 ulos 82 s (lukko 60 s → ikkuna 22 s), muunnelma 2 ulos 95 s ("ovi työnnetty auki" 10 s ennen), muunnelma 3: ei ulospääsyä 445 s (7,4 min), vaikka "lukko aukesi" 630 s.** Pelaajan omalla liikkeellä ei saatu pakoa: muunnelmassa 1 ovi löytyi ruudulle (v8-21, ylhäällä) vasta ~50 s kohdalla, ja ajastin ehti ensin. Muunnelmassa 3 oviaukko on kaksi mustaa karmia; kamera menee väliin ja jää seinän sisään (v8-49, 50, 54, 59, 63 identtiset: tatti ei liikuta). **ENNALLAAN (automaatti); UUSI VIKA: muunnelma 3 pitkä jumi, ei selitystä.**
- **Hälytys-tila lukitsee pannauksen ja silmukoi (v6): KORJATTU.** Hälytys kestää 0,2–1,0 s ja päättyy Kiinniin joka kerta (4/4); ei Halytys↔Etsii-silmukkaa (0 riviä lokissa).
- **Vihje:** v1/v4/v6 ei näkynyt ruudulla. **v8: kipinä näkyy** hehkuvana pallona (v8-16-pan1, v8-67-vihje-b/d, v8-71: kolme palloa seinää pitkin), sekä automaattisessa (tyrmä 20 s) että ☰ › Vihje -pyynnössä. Näkyy vain kun kamera osoittaa oikeaan suuntaan; pallo oli ruudulla paikallaan 1,5 s välein otetuissa kuvissa (ei havaittavaa lentoa). **KORJATTU.**
- **Uusi paluu: kamera lukittu ~50 s** Kiinni-tyrmä-paluun jälkeen: veneessä kamera tuijottaa järvelle, tatti ja veto eivät vaikuta (v8-24/25 identtiset), ei selitystä. Voi olla tarkoitettu paluusouduksi (kuten alkusoutu 22 s), mutta 50 s on pitkä. **UUSI, tarkistettava.**
- **"Jatketaanko siitä, mihin jäit?" -dialogi:** napit **Alusta / Jatka löytyvät nyt `ui puu`ssa** (v6: ei). "Alusta" epäselvä edelleen; Lontoon luentopaneeli näkyy himmennettynä dialogin takana (v8-74). Jatka → vene 15 s. **KORJATTU OSITTAIN.**
- **Sulje linna:** kartta palaa pystyasentoon (vaaka pitää asettaa uudelleen). **ENNALLAAN.**
- **"Tyrmä"-tunniste** ruudun ylälaidassa kiinniotossa (v8-11): ennallaan, hyvä.

### b) Musta / pimeä
- **Laituri:** valoisa ja luettava (v8-07, v8-42). **ENNALLAAN (hyvä).** Eteenpäin kävellessä kamera kulkee laiturin viereiselle kiviselle kumpupinnalle ja siniselle/mustalle täytepinnalle (v8-09, v8-10, v8-28): **mustat täytepinnat ENNALLAAN.**
- **Tyrmä ilman kynttilää:** lähes musta (v8-11); kynttilän kanssa näkyy hyvin (v8-14, v8-48). Kynttilä oli ensimmäisellä käynnillä sammuksissa, myöhemmillä päällä (tila säilyy). **ENNALLAAN.**
- **Tyrmän lattian mustat matot/levyt:** suuret täysmustat suorakulmiot (v8-61, v8-67) ja mustat oviaukot. **ENNALLAAN.**
- Mustia sauvasiluetteja (v4) ei havaittu. **KORJATTU?** (sama arvio kuin v6).
- Holvin vaalea kattolevy: katto näkyy kauniina holvina (v8-48, v8-57), ei lentävää levyä. **KORJATTU?**
- Ylivalottunut pilari oviaukon välissä (v8-54/59: valkokeltainen kivi). **UUSI (pieni).**

### c) Kamera seinän sisällä / läpi
- **Tyrmän lähtönurkka:** muunnelma 1 nurkassa mutta ovi löytyy ruudulle käännöllä (v8-21); muunnelma 2: kamera seinässä, **katseen käännös rajattu** (v8-35 ja v8-36 identtiset 800 px vetojen jälkeen), huone aukeaa vain peruuttamalla (v8-40; sama kuin v1); muunnelma 3: lähtö huoneessa (v8-48, **PARANTUNUT**), mutta ovi imaisee kameran seinän sisään (ks. a). **ENNALLAAN/OSITTAIN.**
- **Kiinniotossa kamera seinän sisällä** (v8-29: linnan seinän tekstuuri koko ruudulla, vartijan raaja oikeassa reunassa; sama kuin v8-46: seinät läpinäkyviä). **ENNALLAAN.**
- **Laiturilla eteenpäin:** kamera kallistuu alas ja ylittää laiturin reunan (v8-08…11). **ENNALLAAN.**
- **Hahmokapseli:** Fogg näkyy laiturilla (v8-07, oikea alakulma) ja kuvassa veneessä soutaja kameraa päin (v8-06). Omistajan sääntö on 1. persoona ilman näkyvää hahmoa. **ENNALLAAN (rikkoo sääntöä).**

### d) Väärä teksti / kyltti
- Huonekylttejä ei näkynyt (laituri, tyrmä): **KORJATTU pysyy.** Historiaa ei testattu tällä kierroksella.
- Dialogin "Alusta" epäselvä, Lontoo-paneeli dialogin takana. **ENNALLAAN.**
- Repliikeille ei tekstitystä (soutaja, vartija, vesipoika): **ENNALLAAN.**
- Kynttilä-kuvake (oikea alakulma, liekki) edelleen ilman tekstiä: **ENNALLAAN.**
- Vihjenappi ☰-valikossa selkeä (Vihje, Linnan historia, Äänet, Lähteet, Kuori, Sulje linna). Hyvä.

### e) Ääni (`neljas1.wav`; kello = kaappauksen sekunnit, RMS 10 s)
- **Laituri, tapahtumat:** −20…−30 dB (veneen saapuminen 40–60 s: −21; riidat/epäily piikit −19…−25). **Laituri paikallaan odottaessa: −36 dB tasaisena** (200–270 s, 380–490 s), eli 10 dB hiljaisempi kuin v6:n laituri. **ENNALLAAN/Hiljainen.**
- **Tyrmän äänipohja: −29…−30 dB tasainen** (muunnelma 1 130–190 s, muunnelma 2 300–360 s, muunnelma 3 510–955 s = 7,4 min). v1/v4 oli −42, v6 −31. **ENNALLAAN v6:een nähden; PARANTUNUT v1/v4:ään.** Muunnelman 3 7,4 min on tasainen −30 dB ilman tapahtumia (silmukka).
- **Hälytys:** ei erillistä jaksoa (0,2–1 s), syke kuuluu piikkinä (−19…−21 dB hetkellisesti).
- **Kartta suljetun linnan jälkeen:** −47 dB 100 s (1200–1300 s), sen jälkeen **täysi nolla (−inf) 190 s (1310–1500 s)**. v6: −inf 10 min. Tallenne on vain Unityn mikseri; natiivi-wav oli tyhjä ja Mac mykistetty, joten kartan natiiviääntä ei tallennettu. Todennäköisesti ei vika (kartan ääni natiivissa), mutta **todentamaton**: tarkistus vaatii natiivin kaappauksen kartalla. **ENNALLAAN / avoin kysymys.**
- **Kaksoistoisto:** "portinvartija-epaily-3" (5,2 s) soi varoituksessa 3/4 kertaa (173,2, 564,8, 1022,5 s) ja Epäilyssä 2/4 kertaa (152,68 ja 342,37 s). **ENNALLAAN** (suunnasta ei kerrota).

## Hyvää
1. Vihjekipinä näkyy ruudulla ja johdattaa (v8-16, v8-67, v8-71).
2. Hälytys-silmukka poissa; Hälytys päättyy aina Kiinniin.
3. Paikallaan seisova pelaaja ei joudu epäillyksi; laituri valoisa ja Fogg + vartijat näkyvät (v8-07, v8-42).
4. Tyrmä 3: lähtö huoneessa (ei nurkassa), huone ja holvi kauniita kynttilän valossa (v8-48, v8-57).
5. "Jatketaanko?" -napit nyt UI-puussa; Jatka toimii (vene 15 s). Linna avautuu 15 s:ssa.
6. "Tyrmä"-tunniste kiinniotossa.

## Vikalista PT:lle (jäljellä, tärkeysjärjestyksessä)
1. **Tyrmä, muunnelma 3 (irtokivi): ei poistumista 445 s (7,4 min), vain ajastin; oviaukko = kaksi mustaa karmia, joiden väliin kamera jää seinän sisään (tatti ei liikuta); lukko 630 s ei muuta mitään** · v8-49, 50, 54, 59, 63 · Siirtoseppä.
2. **Pelaajan oma pako ei onnistu missään muunnelmassa**: muunnelma 1: ovi löytyy ruudulle ~50 s, ajastin 82 s (ikkuna lukosta 22 s); muunnelma 2: kamera seinässä, katse rajattu, huone aukeaa vain peruuttamalla; automaattinen ulos 82/95/445 s ilman selitystä · v8-21, v8-35/36, v8-40 · Siirtoseppä.
3. **Kiinniotossa ja varoituksessa kamera on linnan seinän sisällä (seinät läpinäkyviä)**; varoituksessa vain vartijan malli, ei lyhtyä/merkkiä/tekstiä; Epäilystä kiinniottoon 4 s · v8-29, v8-46 · Siirtoseppä + NUI.
5. **Paluu: kamera lukittu ~50 s veneessä (järvelle), ei selitystä** · v8-24, 25, 26 · Siirtoseppä (tarkistettava, onko tarkoitus).
6. **Pelaajahahmo näkyy (Fogg laiturilla) vastoin 1. persoona -sääntöä** · v8-07 · Siirtoseppä.
7. **Laiturilta eteenpäin kävely vie kameran kivi-/täytepinnalle (mustat pinnat), kamera kallistuu alas** · v8-08…11 · Siirtoseppä + Linnanrakentaja.
8. **Tyrmän lattian suuret mustat suorakulmiot ja mustat oviaukot; ylivalottunut pilari** · v8-61, v8-54 · Linnanrakentaja (materiaalit).
9. **Tyrmän ääni −30 dB tasainen (7,4 min muunnelmassa 3); laituri paikallaan −36 dB; "epäily-3" kahdesti Epäilyssä+varoituksessa** · `neljas1.wav` · Siirtoseppä (ääni).
10. **Kynttilä-kuvake ilman selitystä; repliikeille ei tekstitystä; dialogin "Alusta" epäselvä + Lontoo-paneeli taustalla; Sulje linna → kartta pystyssä** · v8-74, v8-72 · Natiivi-UI.
11. Kartan ääni: Unity-tallenteessa −inf 190 s suljetun linnan jälkeen, ei todennettu (natiivi ei tallennettu) · Natiivi-UI/Pelikoodari (tarkista kaappauksella).

## Ei testattu / rajaukset
- Pääsyä linnaan (keittiö, kappeli…) ei saavutettu; vain laituri, kiinnijäänti, tyrmä (muunnelmat 1–3), valikko, dialogi, uudelleenavaus.
- Linnan historiaa ei testattu tällä kierroksella.
- Kone: 1 muu simu käynnissä, fps/lataus ei mitattu.
- Ääntä ei kuunneltu (Mac mykistetty); analyysi RMS-tasoista ja lokiriveistä. Kartan natiiviääntä ei tallennettu.
- Pelaajan ohjaus: tatti vasen alakulma, katse veto oikealla; oikeat HID-kosketukset.

Ei korjattu mitään (PT:n ohje).
