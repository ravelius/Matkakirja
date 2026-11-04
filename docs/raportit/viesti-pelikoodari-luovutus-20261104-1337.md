# Pelikoodari: luovutus 4.11.2026 – oven sääntö koodissa, kuva JU:n vuorolla

Täydentää -1320:n (lue sen linjaukset, kartan rakenne ja muistiinpanot). Syy: konteksti 25 % (7.37). Polut kansiossa /Users/Shared/Claude/proto-3d/. **Merkitse jokaiseen tulokseen runko.**

## KK 13.2x (sitova)
**Ovet:** sääntö: aukko tai portaat etusivulla → ovi sinne, jalustan tasolle portaiden päähän; muuten etusivun keskelle. (a) mallin oma avoin aukko: sama ovi aukkoon, takana hämärä, ei läpinäkymää (KK kertoo omistajalle kuvan kanssa). (b) hämärä, ei täysmusta. (c) 33 näkyvää rakennusta: ovi kulkualueelle näkyvälle sivulle, vaikka kynnystä ei ole. (d) oikea malli Codex #2024 ja Tripo erikseen, laatikko kelpaa.
**Seuraava kuva KK:lle:** pelikamera, Puyi 3–6 m oven edessä, samat viisi (yongshou, chuxiu, yikun, qianqing, kunning) + viisi arvottua; kamera kuljettavasta pisteestä. Muisti iPadilla JU:n vuorolla.
**Laatat:** m15 on mallin oma taso; liian matala kate on kartassa estetty (tehty). Vino, V-seinämät ja liuskat LAV:lle PT:n kautta (rivi PT:lle lähetetty 13.3x), en korjaa. Kolme pistettä kierrokseen (tehty). m15-yläkuvassa portaat näyttävät viivoilta: **katso kierroksen väärin kierretyt -mittarista**.
**Esineet:** neljä mallia KK ok, `_tyo/codex/juoksupeli-ulkoesineet-20261104/mallit-v1/`. Kytke tasolle 1 ovien ja osan C rinnalle. Pelikuva KK:lle → omistajalle (LUVATTU). **Katso pelikuvasta:** muisti (1024² + 1024² + 512² joka mallissa, marginaali pieni: pienennä pelissä ilman uutta ottoa), ruukun sisäreunan harmaa kaari, puun oksat, koko keisariin nähden. Rikki on yksi malli ilman erillisiä sirpaleita.

## Tila
Proton haara `pelikoodari/tarkastelu-219` = **9e697f69f** (worktree /Users/Shared/Claude/wt/proto-pelikoodari-tarkastelu; ei etärepoa). Kumpaakaan committia ei ole vielä käännetty: **käännösvirheet näkyvät vasta esikatselussa.**
- **220983d61:** `kulkukartta.py` ovet() = kävely ulkoa sisään näyte kerrallaan: aukko (seinä molemmin puolin, avoin aukko täytetään koko leveydeltä), portaat, keskelle, näkyvä sivu. Kartta `_tyo/pelikoodari/kulkukartta/v2/`. 259 ovea (keskelle 209, näkyvä 33, aukko 11, portaat 4, aukko-iso 2), tasolla 1: 221. Ilman ovea 27, joista näkyy tasolta 1 yksi: way/1341826243 (3 × 3 m, Room of Bamboo Fragrance). Matala kate alle 2,6 m estetty tason 1 kartassa (1 267 m² koko kartalla), taso 1 386 120 m². `esineet.json`: 112 paikkaa, aukion laidalla 60 m:n välein (kolmioita paljon, jos kaikki piirretään: osassa C näkyvyysraja).
- **Ovet.cs:** rivikohtainen `lev`, `kork`; hämärä (0,20; 0,16; 0,13); lehti enintään 1,2 × 3,2 m. `tarkastelu keisari x z yaw | pois`. `JuoksuV4Maailma.Ulkoesineet.cs`: `esinekoe juuri url | rivi x z | koe | pois`, näkyy tarkastelussa; ArkiHahmot hyväksyy täyden osoitteen. Törmäys ja rikkoutuminen osassa C. Ämpärin polku `ulkoesineet-v1/` ei vielä viety (`media-vienti-muuttaa-julkaistua`).
- **Kuvat:** `tyokalut/ovikuvat.py` tekee listan; `tyokalut/koekuvat-ovet-esineet-219.txt` (10 ovea + 8 esinekuvaa; esineet file://-polusta). Mitat matalan kameran 5,4 / 3,4 m, kunnes osan C käyrä on tehty.
- **9e697f69f:** kierroksen pisteet `Resources/JuoksuKierros.json` (1 597 pistettä, 20 m:n ruudut), vanhat solmut ja rakennuspisteet pois, laatat kiinteinä.

## Avoinna oleva pyyntö
JU:lta pyydetty 13.3x ESIKATSELU NYT -vuoroa ajolle (JU ajaa tai antaa vuoron):
`zsh /Users/Shared/Claude/wt/proto-pelikoodari-tarkastelu/tyokalut/tarkastelu_kuvat.sh 220983d61 /Users/Shared/Claude/wt/proto-pelikoodari-tarkastelu/tyokalut/koekuvat-ovet-esineet-219.txt "ovikoe koe"`
Tulos `lokit/tarkastelukuvat-220983d61-*/`.

## Tekemättä, järjestyksessä
1. Katso kuvat. **Tarkista erityisesti:** qianqing ja kunning saivat 6,5 × 6 m:n täytteen (aukko-laji): jos kuvassa näkyy iso tumma laatta suljetun ristikon edessä, sääntöön raja (leveä aukko → tavallinen ovi seinän tasoon); yikun ja ovipaneeli (ero noin 0,6 m); onko hämärä sopiva vai reikä; 井 ja muut pienet rakennukset (kerro KK:lle, jos ovi näyttää väärältä). Korjaa, sitten arkki KK:lle ovet ja esineet erikseen.
2. Muisti iPadilla JU:n vuorolla: ovet + esineet, ei `palatsi kopiot 1`, vertailu ka 4000, huippu 4068 (c4a5bfafb), raja 4080. Lähtötaso ilman niitä ensin.
3. Koko kierros kahdesti JU:n vuorolla (9e697f69f): väärin kierretyt -mittari, m15; sitten todistukset 1–4 (-1320).
4. Osa C, Testinäkymän rivi, unity-tarkistuksen CS0152-selvitys: kuten -1320. Esineiden törmäys ja rikkoutuminen osaan C.

## LISÄYS 13.47: ensimmäinen ajo tehty, korjaukset d81857c4b ajamatta
Ajo 9e697f69f (kääntyi): `lokit/tarkastelukuvat-9e697f69f-133804/`, esineet-arkki.png, ovet-arkki-luonnos.png. **Esineet lähetetty KK:lle**: kaari näkyy, oksat ohuet, koko hyvä, mallit varjostamattomia ja kirkkaita (tarjosin sävyn säätöä, KK päättää); muisti mittaamatta.
Ovet: yongshou, chuxiu ja yikun ovat aukossa portaiden päässä; hämärä toimii. KK:lle ei vielä: kerroin, että kolme korjausta on tulossa.
Korjattu **d81857c4b** (haaran kärki, ajamatta): keskelle, portaat ja näkyvä sivu: matala este ei ole seinä, ovi sen päälle varsinaisen seinän eteen (zhai, leshou); portaat koko kävelystä; kuvien kamera ja keisari kartan korkeudelta (`keisari x z yaw y`, `kamera … abs`), koska terassilla MaanPinta on maa ja qianqing ja kunning kuvautuivat terassin alta. Kartta v2 ja lista `tyokalut/koekuvat-ovet-esineet-219.txt` päivitetty. 259 ovea: keskelle 207, näkyvä 32, aukko 11, portaat 7, aukko-iso 2; tasolla 1: 220.
**Seuraavaksi:** JU:lta pyydetty uusi vuoro. Ajo (PROTO_LINJA JU:n vuorosta):
`PROTO_LINJA=<n> zsh /Users/Shared/Claude/wt/proto-pelikoodari-tarkastelu/tyokalut/tarkastelu_kuvat.sh d81857c4b /Users/Shared/Claude/wt/proto-pelikoodari-tarkastelu/tyokalut/koekuvat-ovet-esineet-219.txt "ovikoe koe"`; lopuksi rivi JU:lle (linja vapaa). Katso: qianqing ja kunning (6,5 × 6 m:n täyte: jos näyttää isolta laatalta, leveälle aukolle tavallinen ovi seinän tasoon), zhai, leshou, keisari näkyy kaikissa. Arkki KK:lle. Sitten kohdat 2–4 yllä.

## LISÄYS 13.48: KK 13.4x esineistä, kärki da29a4288 ajamatta
KK: esineet eivät vielä omistajalle. Esineet samaan valaistuun varjostimeen kuin maailman 3D-esineet, normaalikartta käytössä; tehty `JuoksuV4Maailma.Ulkoesineet.cs` (Matkakirja/Juoksupeli/Maailma, JUOKSU_NORMAALI, _NormaaliY +1; ArkiHahmot palautettu ennalleen). **Tarkista kuvasta, ettei normaalikartan Y ole käänteinen** ja että varjopuoli näkyy. Väri arvioidaan vasta sen jälkeen; sävyä vain jos perusteltua. **Uusi arkki samoista kulmista KK:lle.** KK:n mukaan kelpaavat: koko, oksat (ei paksunnusta), koneen paikat, rikki-mallien vaihto. Harmaa kaari: KK tilaa Tripolta korjauksen mallit-v1b:hen, en paikkaa; vaihda ruukku, kun se tulee, älä odota sitä. KK odottaa myös ovikuvaa.
Ajossa runkona **da29a4288** (ei d81857c4b): sama ajokomento kuin edellä, `tarkastelu_kuvat.sh da29a4288`.

## LISÄYS 13.59: ajo da29a4288 tehty ja kerrottu KK:lle
Kansio `lokit/tarkastelukuvat-da29a4288-135410/` (ovet-arkki.png, esineet-arkki.png), lähetetty KK:lle; linja 1 vapautettu JU:lle. Esineet: varjostin toimii, normaali ei näytä käänteiseltä; väri KK:lla.
**Tee seuraavaksi (ellei KK sano muuta):** (1) yli 4 m:n avoin aukko: tavallinen ovi ja ympärille seinän värinen täyte, ei läpinäkymää (qianqing, kunning; nyt 6,5 × 6 m:n tumma laatta; Ovet.cs:ään oma pinta tai `lev` + `tayte`). (2) Leshou way/40629276: portaat oikealla jäivät tunnistamatta, selvitä (etusivun pisin sivu? kavele alkaa -3 m?); ovi on jalustalla y 1,75, kynnykselle ei pääse. (3) Suishou way/40631805: näkyvän sivun ovi jalustan kulmalla näyttää irralliselta. (4) ovikuvat.py: keisari painuu portaisiin (kynnys + d osuu portaisiin; valitse lattia ylimmän askelman mukaan tai tasainen kohta). Sitten uusi arkki KK:lle JU:n vuorolla; muisti ja kierros kuten kohdat 2–3.
Tarkista viestit: KK:n vastaus suositukseen (1) ja mallit-v1b.
