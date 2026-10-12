# Laitetestaaja: Olavinlinnan uusinta (11 osaa + jatkokoe), v48l / 9e6e2349c, 12.10.2026

**Tulos: EI LÄPI. 11 osasta 2 etenee osittain (ampumakäytävä, keittiö), 9 ei etene; korjaus "aloitussuunta ≥ 4 m" näkyy vain komerossa ja pakossa (katse nyt sisään linnaan), mutta kamera on silti seinässä. Jatka toimii (tott-kammio: kamera irtosi seinästä 4 askeleessa), mutta tallennus siirtyy vain tapahtumista ("tallennettu …") eikä aloituskomennosta: Jatka vei keittiön sijaan komeroon, ja tuoreella asennuksella Jatkaa ei tarjottu.**

Ajo: kaksi simua rinnakkain Julkaisijan SIMU NYT:llä, 08.04–08.37 (A `3622D89D` iPad Pro 13", B `864EAA12` iPad Air 13" M4; B alkoi 08.10, kun Siirtosepän simu vapautui). App `proto-3d/lokit/olavinlinna-auto-1012-0744` (käännös 9e6e2349c = linnahaara 681b5d212 + paketti v48l, MH v3). Kone kuormassa (load 250 → 20–70). Mac mykistetty, oikeat HID-kosketukset, kehittäjätila, Pelit › Keskeneräiset › Olavinlinna › Pelaa → laituri, sitten `poikki seikkailu aloitus <kohta>` + 8 askelta eteen + kuva. Appi ei pudonnut, konsolissa ei Exception-rivejä.

Kuva-arkit: `docs/raportit/kuvat/laitetestaaja-olavinlinna-uusinta-20261012/` (`kuva-arkki-A.jpg`, `kuva-arkki-B.jpg` (järjestys alla), `jatkokoe-tott-kammio.jpg`, `jatkokoe-keittio-komero.jpg`, `kierre-kirkkotorni.jpg`, `kierre-muuriportaat.jpg`). Kaikki kuvat, lokiotteet, `linssi-loki-kaikki.txt` ja videot (`A/kierros9-720.mp4` 32 min, `B/kierros9-720.mp4` 26 min; raakavideo katkesi ~08.36): `proto-3d/lokit/laitetestaaja-olavinlinna-uusinta-20261012/{A,B}/`. Arkkien rivijärjestys (kolme kuvaa/osa: askeleet 1, 4, 8): A = kirkkotorni, ampumakaytava, muurikaytava, tott-kammio, muuriportaat, tyrma; B = sisapihat, paluu, keittio, komero, pako.

## 1) 11 osaa (aloitus + 8 askelta eteen)
| Sim | Osa | 8. kierros → nyt | Havainto |
|---|---|---|---|
| A | kirkkotorni | EI → EI | Seinä täyttää ruudun, 8 samaa kuvaa; loki "vapaus 1,0 m, vapain suunta −6°, näkymä 3,0 m, ensiaskel päättyy seinään" (ahtaassa kohdassa ei 4 m:ä). Kierrekoe (3 askelta + käännös oikealle + 4 askelta): seinä edelleen, käännös vain vaihtaa seinän kulmaa. |
| A | ampumakaytava | EI → OSITTAIN | Askeleet 1–7 seinää, 8. kuvassa seinä avautuu ja kapea käytävä + hahmo näkyvät (kamera irtosi viimeisellä askeleella). Loki: vapaus 0,45 m, "ensiaskel päättyy seinään". |
| A | muurikaytava | EI → EI | Seinä kaikissa kuvissa (vapaus 0,45 m; aloitussuunta −103° "ensiaskel ok" mutta ei etene). |
| A | tott-kammio | EI → EI | Seinä; loki 63° "vapain suunta, näkymä 4,3 m, ensiaskel päättyy seinään". (Jatkokokeessa liikkuu, ks. alla.) |
| A | muuriportaat | EI → EI | Pyöreä huone 1. kuvassa, sitten sininen seinä; käännös oikealle (kierrekoe) näyttää oven + hahmon lähellä, mutta 4 askelta eteen = seinä. |
| A | tyrma | EI → EI | Aloitus kiinniotolla tyrmään, vaalea kiviseinä täyttää ruudun kaikissa 8 kuvassa. |
| B | sisapihat | EI → EI | Kamera padan luona (1. kuva: tuli, tarjotin, pata; 4–8: pata täyttää ruudun). Ei mustaa. |
| B | paluu | EI → EI | Sama kuin sisäpihat: pata. |
| B | keittio | EI → OSITTAIN | Aloitus ruskean seinän/laudan vieressä, 4. askeleella näkyy kaareva käytävä ja ikkuna (kamera liikkui), 8. kuvassa tumma seinä. |
| B | komero | EI → EI | **Katse nyt sisään linnaan (94°, korjattu)**, mutta kamera seinässä, 8 samaa kuvaa. |
| B | pako | EI → EI | Katse sisään (94°, korjattu), mutta kamera seinässä, 8 samaa kuvaa. |

Yhteenveto: 0 läpi, 2 osittain, 9 ei etene. Aloitussuunnan korjaus ei vielä vapauta kameraa: kirkkotornissa paras suunta on vain 3,0 m, muissa "ensiaskel päättyy seinään" tai kamera on seinässä (vapaus 0,45–1,0 m).

## 2) Jatkokoe (`poikki seikkailu aloitus <kohta>` → 10 s → ☰ › Sulje linna → Pelit › Keskeneräiset › Olavinlinna)
| Kohta | Jatka tarjolla? | Loki | Kävely (4 askelta) |
|---|---|---|---|
| tott-kammio (A) | **Kyllä** ("Jatketaanko siitä, mihin jäit?" › Aloita alusta / Jatka) | "pelattava pala käynnistyy (jatko tallennuksesta)" + "**jatko tallennuksesta kohtaan tott-kammio**", tarkistuspiste kirkkotorni-portaat, kulunut 4 s | **Liikkuu**: askel 1 seinä, 2–3 irtoaa seinästä (pyöreä huone), 4 holvikäytävä + "Tyrmä"-kyltti (`jatkokoe-tott-kammio.jpg`). Aloituksessa samalla paikalla kamera ei liikkunut 8 askeleessa. |
| keittio (B), tallennus olemassa | Kyllä | "jatko tallennuksesta kohtaan **komero**" (ei keittiö) | Seinä, 4 samaa kuvaa (`jatkokoe-keittio-komero.jpg`). |
| keittio (B), tuore asennus | **Ei**: Olavinlinna-napautus avasi pelin suoraan laiturille ilman korttia | – | – |
| komero (B) | Kyllä (sama ajo kuin keittiö) | "jatko tallennuksesta kohtaan komero", "jatko: komero (tiilet 63, kilvet 45/45, arkku auki)" | Seinä (`jatkokoe-keittio-komero.jpg`). |

Päätelmä tallennuksesta: tallennus kirjoitetaan **tapahtumista** ("tallennettu (nosto tarjotin)", "tallennettu (alttari kalkki/pateeni/liuskekivi)"), ei aloituskomennosta: tott-kammion aloitus laukaisi "nosto tarjotin" -tallennuksen (761,78 s), joten jatko meni sinne; keittiön aloituksella ei ole tallennustapahtumaa, joten jatko vei aiempaan komero-tallennukseen (alttarin esineet), ja tuoreella asennuksella tallennusta ei ole lainkaan eikä Jatkaa tarjota. Keittiön Jatka-polkua ei siis voitu todentaa; se vaatii tallennustapahtuman keittiössä (esim. oikea pelaaminen tai aloituskomento joka kirjoittaa tallennuksen).

## Löydökset (tärkeysjärjestyksessä)
1. **Kamera seinässä aloituksesta yhä 9/11 osassa** (kirkkotorni, muurikäytävä, tott-kammio, muuriportaat, tyrmä, komero, pako seinä; sisäpihat, paluu pata) · v9-arkit · Siirtoseppä/Linnanrakentaja. Aloitussuunnan korjaus (≥ 4 m) ei auta, jos aloituspaikassa on vapautta 0,45–1,0 m.
2. **Jatka-polussa kamera irtoaa seinästä (tott-kammio), aloituspolussa ei** samassa pisteessä · jatkokoe-tott-kammio.jpg · Siirtoseppä: vertaa jatkon ja aloituksen kameran/pelaajan sijoitusta.
3. **Tallennus ei kirjoitu aloituskomennosta**: keittiön Jatka vei komeroon, tuoreella asennuksella Jatka puuttuu · loki 664–671 s (B) · Siirtoseppä.
4. **Ampumakäytävä ja keittiö etenevät viimeisillä askelilla** (ampumakäytävä 8. kuva, keittiö 4. kuva) · v9-arkit.
5. Ennallaan: sisäpihat ja paluu padan luona; komero ja pako seinässä (mutta katse nyt sisään).

## Rajaukset
- Ääntä ei mitattu; koko läpipeluuta ei ajettu; kierrekoe vain kirkkotornille ja muuriportaille (3 askelta + käännös oikealle + 4 askelta).
- B-simun ensimmäinen jatko-ajo jäi roikkumaan skriptivirheeseen (ajo 08.25–08.31), toistettu käsin; tulokset yllä.
- Raakavideot toistuivat kokonaan (A 32 min, B 26 min, 7–9 Gt); 720p-pakkaus tehty.

Ei korjattu mitään (PT:n ohje).
