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
