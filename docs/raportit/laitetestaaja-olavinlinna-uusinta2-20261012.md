# Laitetestaaja: Olavinlinnan uusinta 2 (aloituspaikka siirtyy reittipaikkaan, v48m / b0a0243df), 12.10.2026

**Tulos: EI LÄPI, mutta ensimmäinen selvä edistys. 11 osasta 0 läpi, 4 etenee (keittiö, muuriportaat, kirkkotorni, ampumakäytävä), 7 ei etene (muurikäytävä, tott-kammio, tyrmä, sisäpihat, paluu: seinä tai pata; komero ja pako: ei reittiä kumpaankaan suuntaan).** Keittiö on paras: kamera lähtee keittiöstä käytävään ja etenee pilariin asti. Muuriportaissa kamera liikkuu puurakenteiden, kaaren ja oven ohi. Kirkkotornissa kamera ei enää ole seinässä, vaan pyöreässä huoneessa MetaHuman-munkki (kasvot, huppu) edessä. Pata sisäpihoilla/paluussa ja seinä muurikäytävässä/tott-kammiossa/tyrmässä ennallaan.

Ajo: kaksi simua rinnakkain Julkaisijan SIMU NYT:llä, 09.22–09.38 (A `3622D89D` iPad Pro 13", B `864EAA12` iPad Air 13" M4). App `proto-3d/lokit/olavinlinna-auto-1012-0900` (käännös b0a0243df = linnahaara 078b01dd7 + v48m: isojen esineiden ja patojen törmäys). Mac mykistetty, oikeat HID-kosketukset, kehittäjätila, Pelaa → laituri, sitten `poikki seikkailu aloitus <kohta>` + 8 askelta eteen + kuva; komerolle ja pakolle suuntakoe (3 askelta eteen, käännös vasemmalle + 3 askelta, 180° oikealle + 3 askelta). Appi ei pudonnut. Pieni ajovirhe: B:n peli ei käynnistynyt ensi yrityksellä (alkukomento hävisi kuormassa), toistettu käsin, ei vaikutusta tuloksiin.

Kuva-arkit: `docs/raportit/kuvat/laitetestaaja-olavinlinna-uusinta2-20261012/` (`kuva-arkki-A.jpg`: kirkkotorni, muurikaytava, tott-kammio, muuriportaat, tyrma, ampumakaytava; `kuva-arkki-B.jpg`: sisapihat, paluu, keittio; kolme kuvaa/osa = askeleet 1, 4, 8; `suunnat-komero.jpg`, `suunnat-pako.jpg`: 3 eteen / 3 vasen / 3 oikea). Kaikki kuvat, täydet lokiotteet (`logit10/loki-<osa>.txt`, `rivit-<osa>.txt`), `linssi-loki-kaikki.txt` ja videot: `proto-3d/lokit/laitetestaaja-olavinlinna-uusinta2-20261012/{A,B}/`.

## Osat (aloituspaikan "vapaus" ja reittipaikka-valinta lokista kunkin kuvan alla)
| Sim | Osa | Aiemmin → nyt | Havainto | Loki: vapaus / reittipaikka / suunta |
|---|---|---|---|---|
| A | kirkkotorni | EI → OSITTAIN | Pyöreä huone, MetaHuman-munkki (hupullinen, kasvot, parta) edessä; askel 8 hahmon selkä; kamera ei seinässä, mutta huoneen läpi ei päästy. | vapaus 1,0 m; reittipaikka 3 vaihtoehtoa (eteen 1,6 / 4,4 / 3,7) → reitti:pelaaja-16; suunta 23° (näkymä 7,8 m, "ensiaskel päättyy seinään") |
| A | muurikaytava | EI → EI | Seinä kaikissa kuvissa. | vapaus 0,45 m; reittipaikka 9 vaihtoehtoa (eteen 4,4–4,5, sivut 0,6) → aloituspaikka (ei parempaa); suunta −103° (ensiaskel ok) |
| A | tott-kammio | EI → EI | Seinä. | vapaus 1,6 m; reittipaikka 5 vaihtoehtoa (eteen 2,5–4,6) → aloituspaikka; suunta 63° (näkymä 4,3 m, "ensiaskel päättyy seinään") |
| A | muuriportaat | EI → ETENEE | Kuva 1 puurakenne/kaari, 4 puupalkit, kaari ja ovi, 8 puuovi + seinä; kamera liikkuu. | vapaus 0,50 m → siirto 0,6 m, vapaus 0,71 m; reittipaikka 6 vaihtoehtoa → reitti:pelaaja-47; suunta −158° (näkymä 4,4 m, ensiaskel ok) |
| A | tyrma | EI → EI | Tyrmä + puuovi 1. kuvassa, sitten seinä (4, 8). | aloitus sisäpihoilta kiinniotolla: vapaus 0,78 m → siirto 1,1 m, vapaus 1,59 m; reittipaikka sisapihat 3 vaihtoehtoa (eteen 4,5 / 4,1 / 2,5) → aloituspaikka |
| A | ampumakaytava | OSITTAIN → OSITTAIN | Kamera irti seinästä: kaareva seinä + sinertävä käytävä edessä; kuvat 1, 4, 8 samat (ei etene). | vapaus 0,45 m; reittipaikka 8 vaihtoehtoa (eteen 3,5–4,3, sivut 0,4–0,5) → reitti:pelaaja-77; suunta −19° (näkymä 4,8 m, "ensiaskel päättyy seinään") |
| B | sisapihat | EI → EI | Pata täyttää ruudun (1. kuvassa keittiö, tuli, pata), 4–8 pata. | vapaus 0,78 m → siirto 1,1 m, vapaus 1,59 m; reittipaikka 3 vaihtoehtoa → aloituspaikka; suunta 180° (näkymä 6,2 m, ensiaskel ok) |
| B | paluu | EI → EI | Sama kuin sisäpihat. | sama kuin sisäpihat |
| B | keittio | OSITTAIN → ETENEE | 1. kuva kaareva käytävä (kamera jo keittiön ulkopuolella), 4. syvemmällä, 8. pilari; paras tulos. | vapaus 0,70 m → siirto 1,5 m, vapaus 1,60 m (-18.44,-2.27,-12.76); reittipaikka 5 vaihtoehtoa → reitti:pelaaja-13; suunta −6° (näkymä 6,3 m, ensiaskel ok) |
| A | komero | EI → EI | Suuntakoe: eteen/vasen = seinä, 180° oikealle = ikkuna-aukko järvelle kuutamolle (ei sisään linnaan). | reittipaikka komero: 2 vaihtoehtoa (eteen 1,3 / 1,0) → aloituspaikka; suunta 94° (sisään linnaan, kiipeilyn loppu) |
| B | pako | EI → EI | Sama kuin komero: eteen/vasen seinä, 180° oikealle järvi. | reittipaikka pako: yksi vaihtoehto (eteen 0,9) → aloituspaikka; suunta 94° |

Yhteenveto: 0 läpi, 4 etenee (kirkkotorni, muuriportaat, ampumakäytävä, keittiö), 7 ei etene. Verrattuna uusintaan 1: keittiö (osittain → etenee), muuriportaat (ei → etenee), kirkkotorni (ei → osittain); ennallaan ampumakäytävä, muurikäytävä, tott-kammio, tyrmä, sisäpihat, paluu, komero, pako.

## Löydökset (tärkeysjärjestyksessä)
1. **Paras tulos keittiössä** (siirto 1,5 m + reitti:pelaaja-13): kamera irtoaa keittiöstä käytävään ja pilariin asti. Tämä valintatapa toimii; sama tarvitaan muille.
2. **Sisäpihat ja paluu (sama aloituspiste pikkupiha)**: reittipaikka valitsee aloituspaikan (siirto 1,1 m, vapaus 1,59 m), mutta kamera on silti padan vieressä ja pata täyttää ruudun askeleesta 2 alkaen. Pata (v48m törmäys) ei estä kameraa sen sisään/viereen · v10-sisapihat/paluu · Siirtoseppä.
3. **Muurikäytävä, tott-kammio, tyrmä: valinta jää aloituspaikkaan** ("→ aloituspaikka"), joten seinä pysyy; lokin "eteen 4,4–4,5 sivut 0,6" näyttää tilaa olevan, mutta kamera ei etene (sivutila 0,6 m < 1 m?) · v10-muurikaytava, tott-kammio, tyrma · Siirtoseppä.
4. **Komero ja pako: reittiä ei ole ennen järvinäkymää** (eteen 0,9–1,3 m); 180° oikealle ikkuna-aukko kuutamolle, ei sisään linnaan · suunnat-komero/pako.jpg · Siirtoseppä/Linnanrakentaja.
5. **Kirkkotorni: MetaHuman-munkki tukkii tilan** askelista 1–8 (kasvot hyvät, hahmo seisoo reitillä) · v10-kirkkotorni · Siirtoseppä (NPC-sijoitus).
6. Ampumakäytävä: kamera irti seinästä mutta ei etene (kaarevan seinän vieressä, sivutila 0,4–0,5 m).

## Rajaukset
- Ääntä ei mitattu; koko läpipeluuta ei ajettu; kierrekoe vain komerolle ja pakolle (suuntakoe), ei kirkkotornin kierreportaalle tällä kertaa.
- Jatkokoetta ei ajettu (ei pyydetty tällä kierroksella).
- Raakavideot A 15 min, B 16 min (720p-pakkaus `kierros10-720.mp4`).

Ei korjattu mitään (PT:n ohje).
