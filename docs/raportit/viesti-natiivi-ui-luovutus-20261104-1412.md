# Natiivi-UI: luovutus 4.11.2026 klo 14.12 (konteksti noin 28 %)

Edellinen: viesti-natiivi-ui-luovutus-20261104-1356.md (siinä kääntö, raja, Avoin 2, iPad-ehto). Proto-repo: /Users/Shared/Claude/proto-3d/Matkakirja-proto.
Protossa ei ole origin-etäpäätä (vain natiivi-backup); haarat näkyvät kaikille samasta reposta.

## Tehty tässä vuorossa
**1. C1:n loitonnus selvitetty, EI korjattu.** PT:lle ja KK:lle viety 14.0x.
- Komento: `ElavaKartta.Odota` (Linssit/Unity/ElavaKartta.cs:1008). Lokissa "elävä: hiljaa … soi" ja `saapuminen: FRA Korkeuteen` samassa millisekunnissa (13:51:51.195).
- Tarkoituksellinen 26.9. alkaen (Raamattu 4.19: elävän kartan saapumiskohtaus), mutta `HiljaisuudenEste` (rivi 965) ei tunne nykyintroa. Laukeaa kesken esittelyn, kun traileri edeltää esittelyä.
- Ei 176c41f2d:stä eikä 7f64cd657:stä: sama 3.11. ajoissa (natiiviseppa-saapuminen-video-sim-60cdaeee0/konsoli-a.txt ja 7 muuta). Vertailuajo peruttu JU:lta. Haku: 8 ajoa kesken esittelyn, 148 vasta esittelyn jälkeen.
- Korjaus yksi rivi: `if (Introesitys.JokinKaynnissa) return "esittely";` HiljaisuudenEste-metodiin. **Odottaa KK:n/omistajan sanaa** (suositus: kamera pysyy Pariisissa, kunnes kuvat on nähty). Elävä-kohtaus loitontaa silti esittelyn ja luennan jälkeen; se on eri päätös, omistajalle kerrottava.
- C1:n "tyhjä paperi" on loitonnuksen välikuva (noin 1 s). C5 kunnossa (seepia, matkakirjasta ja takaisin). KK:lle kerrottu.

**2. Nousukuvat, proto `natiivi-ui/nousu-pieni-219` 3d7f5defb** (wt/proto-natiivi-ui-nousu-pieni, KK 13.56).
- TraileriTausta.NousuOsuus 0,59. TraileriLiike.NousuLepo palauttaa (paikka, kerroin): pisteen viereen 24 pt päähän, kokonaan ruudulle, alaraja 0,20 korkeudesta keskeltä; puoli, jolle kuva mahtuu suurimpana, tasan lähin. Kaupungin nimi siirtyy 0,27 korkeudesta alas (NousuNimiAlas).
- Laskettu 4:3-kuvalla: iPad pysty 59 % leveydestä ja 33 % korkeudesta (ala 20 %), vaaka 59 % ja 59 % (ala 35 %); keskellä olevan pisteen kuva vaakana 44 % ja 44 %. Sääntö simuloitu Pythonilla: ei ruudun yli, ei pisteen päälle. Loki kirjaa osuudet.
- iPhone vaaka: nimi voi jäädä kuvan alle noin 28 pt. Tiedossa, ei korjattu.
- **Unity ajamatta.** tarkista.sh ok. Ajo valmiina: `SIMU_MUISTIRAJA=16 zsh tyokalut/simu-lukko.sh kaari natiivi-ui yhteinen-iPad13 -- zsh /Users/Shared/Claude/proto-3d/lokit/nui-nousu-35-3d7f5defb-20261104/ajo.zsh`. Vuoro pyydetty JU:lta, ei vielä tullut. Tuottaa pysty- ja vaakakuvat (traileri1, c1, c2, c5, kukin myös -noussut) ja osuudet-*.txt.

**3. Lippu, proto `natiivi-ui/kartan-kaanto-219` 99eb9931e** (wt/proto-natiivi-ui-kaanto, KK 13.57).
- Juova oli lipun oma varjo. Striimikartalla nyt 0,2 × korkeus, Karttaesineet.VarjoSavy ja VarjoPeitto, ei kankaan varjoa.
- Paikka: Lippukulma.KiertoSadePt + Kartuscha.LipunYmpyra: koillisin paikka ympyrässä saapumisnäkymän keskeltä. Tabletilla pienempi kahdesta asennosta (302 pt), iPhone 103 pt. Lippu ja tanko ennallaan. Kaikki maat.
- Lippukulma-testit 10/10 (`sh Linssit-testit/kaanna.sh Lippukulma`, ei zsh): FRA 300 km, NOR 279 km, HRV 150 km, LUX 17 km keskeltä. Unity ajamatta. PT:lle viety.
- Rajaus: paikka lasketaan kerran maata kohti pelaajan kaupungin saapumisnäkymästä; kapealla ruudulla keskipisteen pituus riippuu kaupungista.
- Mac-kuvissa lippu on selvästi suurempi kuin simussa (z13-000: yli 24 % korkeudesta, simu noin 7 %), syy lienee batch-ruutu; todista myös simulla.

## SEURAAJAN JONO
1. **Nousukuvien ajo JU:n vuorolla**, katso kuvat, ja seuraava kuva KK:lle (local_d5f31591-21fa-4cb0-bab3-bcd3435d075a): traileri 1, c1, c2, c5, yksi vaaka, yksi juuri noussut; ei videota; kerro kummankin asennon osuus leveydestä ja korkeudesta. Älä leikkaa loitonnusta pois: jos sana ei ole tullut, c2–c5 näkyvät Ranskan näkymässä, kerro se viestissä.
2. **KK:n sana loitonnuksesta** → yksi rivi HiljaisuudenEste-metodiin, samaan haaraan.
3. **Lipun Mac-kuvat PT:lle JU:n vuorolla:** _tyo/natiivi-ui/kartan-kaanto/sk-lippu2.txt (Ranska) ja sk-lippu2-nor.txt (Norja). Tarkista Norjan keskipiste ja korkeus lokista (`saapuminen: NOR`) ja vaihda aja-rivi, oslo-tunnus varmistamatta. Maamerkit `symbolit maamerkit 1` mukana; niiden kääntö on yhä todistamatta. KS:lle tieto 99eb9931e:stä (yhdistelmähaara).
4. **iPad (kääntö) ja vanhat kohdat:** 13.56-luovutuksen kohdat 4 ja 5 ennallaan.

## LISÄYS 14.2x: PT:n korjaus, KORVAA kohdan 1 väitteet "sama 3.11." ja "vertailuajo peruttu" sekä jonon kohdan 2 pohjan
**"Sama jo 3.11." oli väärin.** Vanhan rungon ajoa, jossa elävä laukeaa kesken C1:n, ei löytynyt. Ajot natiiviseppa-saapuminen-video-sim-* ja cb1b5d9fc laukeavat vasta C2:n jälkeen, 36–243 s:n kohdalla. PT:lle ja KK:lle korjattu.
- Mekanismi on todistettu vain ajoista 801c1a8ee (esikatselu-20261104-132058) ja 176c41f2d: `liiku: esiin (kerronta ohi)` tulee 0,8 s C1:n jälkeen, jolloin "kortti auki" poistuu, 0,6 s:n päästä elävä soi ja kamera loitontaa.
- Kymmenessä puheellisessa 3.11. ajossa "kortti auki" pysyy koko C1:n, esim. natiiviseppa-paluu-pariisi-c9ab58e88-20261103-1543.
- Syy auki: nousu-haara (diff 7f64cd657..176c41f2d koskee vain UI/Pulu-tiedostoja) tai runko c9ab58e88..7f64cd657. Selvitä `Matkavalinta.cs:114`:n kutsuja ja mikä kerronnan lopettaa.

**JONO, korvaa kohdat 1–3 järjestyksellä:**
1. **Vertailuajo palautettu, ajetaan ensin:** `SIMU_MUISTIRAJA=16 zsh tyokalut/simu-lukko.sh kaari natiivi-ui yhteinen-iPad13 -- zsh /Users/Shared/Claude/proto-3d/lokit/nui-vertailu-7f64cd657-20261104/ajo.zsh` (JU:lta pyydetty). Tulos yhdellä rivillä PT:lle: laukeaako elävä ennen C2:ta. Laukeaa → runko, haarukoi c9ab58e88..7f64cd657. Ei laukea → oma haara.
2. Nousukuvien ajo ja kuva KK:lle kuten kohta 1 yllä.
3. **Lippu 99eb9931e PT kuitannut.** Mac-kuvat Ranskasta ja Norjasta PT:lle JA KK:lle JU:n vuorolla. KS:lle kerrottu sha (yhdistelmä 60c1e5614 ei sisällä sitä).
4. Yhden rivin korjaus (este "esittely") odottaa edelleen KK:n sanaa. Sen jälkeen ajossa pitää näkyä, että C1 pysyy kaupungissa.

## LISÄYS 2, 14.5x: KORVAA JONON, tämä on voimassa
**C1:** KK:n sana 14.52 tuli: korjaus tehty, proto `natiivi-ui/nousu-pieni-219` **9d2b17f31** (HiljaisuudenEste: este "esittely"), Unity ajamatta. Vertailu 7f64cd657 ilman haaran muutoksia: elävä soi 8,6 s:n jälkeen kesken C1:n, joten nousu-haara ei ole syy (lokit/nui-vertailu-7f64cd657-20261104/konsoli.txt; PT:lle viety). Syy on rungossa c9ab58e88..7f64cd657 tai ajotavassa, haarukoimatta. Kerronta loppuu 0,7 s C1:n jälkeen ("liiku: esiin"), selvitä `Matkavalinta.cs:114`:n kutsuja.

**Nousukuvat pysty kuvattu (3d7f5defb):** lokit/nui-nousu-35-3d7f5defb-20261104/pysty-*.png: kuva pisteen vieressä, 59 % leveydestä, 30–33 % korkeudesta. **vaaka-*.png EIVÄT OLE VAAKAKUVIA** (kääntökomento hylättiin kahdesti; samat kuin pysty), älä lähetä. Korjattu muoto on ui-komento.txt-rivi `ui kierto vaaka`, ajamatta. -noussut-kuvat osuvat kesken nousun; siirrä kuvat.py:ssä 0,75 s tarvittaessa. Kirjaimet lentävät hetken kuvan vierestä; lopullista nimeä alarivillä en nähnyt, katso se videosta.

**JONO:**
1. JU:n vuoro (JU antoi 14.3x kolmen ajon vuoron, kaksi käytetty; pyydä tarvittaessa uudelleen): `SIMU_MUISTIRAJA=16 zsh /Users/Shared/Claude/proto-3d/tyokalut/simu-lukko.sh kaari natiivi-ui yhteinen-iPad13 -- zsh /Users/Shared/Claude/proto-3d/lokit/nui-nousu-35-9d2b17f31-20261104/ajo.zsh`. Todiste PT:lle: elävä ei laukea kesken C1:n eikä `FRA Korkeuteen` -riviä tule C1:n jälkeen. Vaaka: tarkista konsolista, ettei "tuntematon komento", ja kuvan koko 2752×2064.
2. Sen jälkeen kuva KK:lle (traileri 1, c1, c2, c5, yksi vaaka, yksi juuri noussut, osuudet molemmista asennoista).
3. Mac 99eb9931e: sk-lippu2.txt + sk-lippu2-nor.txt, kuvat PT:lle ja KK:lle. Rivi JU:lle, kun lukko ja L2 vapaat.
4. Haarukoi C1:n syy, jos PT pyytää.

**Levy:** vanhat nui-*/app-kopiot siirretty T7:lle (/Volumes/T7 4TB/Claude-arkisto/nui-appit-20261104, 6,3 Gt, JU:n pyynnöstä). Kahdeksan puhdasta, rungossa olevaa omaa worktreetä poistettu (1437, animaatiot2, elava-kartta, halli, karttaui-porras, keisari, keisari-nimi, kiinni; haarat tallella). Raja 25 Gt.

## LISÄYS 3 (PT 15.0x): C1:n syy kirjattu, ei haarukointia
Syy (todennäköinen, ajolla todistamatta): 693cf437f (3.11. 15.47, Saapumisesitys.cs) vei C1–C4:n pois matkakirjakortista, joten kortti ei ilmeisesti enää pidä "kortti auki" -estettä esittelyn ajan. "Kerronta ohi" on vain trailerin puheen loppu. PT: haarukointia ei ajeta (jonon kohta 4 pois); jos 9d2b17f31:n todistusajossa C1–C4 pysyvät kaupungissa, asia on selvä.
