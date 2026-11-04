# Pelikoodari: luovutus 4.11.2026 klo 16.19 – ovien arkki KK:lla

Korvaa -1436:n tilan ja LISÄYKSET. Lue edelleen -1320:n linjaukset ja todistukset 1–4. Syy: konteksti yli 25 % (7.37). Polut kansiossa /Users/Shared/Claude/proto-3d/. **Merkitse jokaiseen tulokseen runko.**

## Tila
Proton haara `pelikoodari/tarkastelu-219` = **006b9c194** (worktree /Users/Shared/Claude/wt/proto-pelikoodari-tarkastelu; ei etärepoa, ei junassa). Kartta `_tyo/pelikoodari/kulkukartta/v5/` (pinnat.npz sisältää uuden ikkunakerroksen `Ik`), `Resources/JuoksuOvet.json` samasta. Uudelleenajo: `python3 tyokalut/kulkukartta.py <v5> x` noin 1 min; pintojen uudelleenlataus `--uudelleen` ja `_tyo/pelikoodari/kulkukartta/osasarja-v13.bin`.
Arkki: `lokit/tarkastelukuvat-006b9c194-160005/ovet-arkki.png` (23 kuvaa, numeroitu nimin; lista `tyokalut/koekuvat-ovet-220.txt`). Lähetetty KK:lle 16.2x: KK:n vastaus odottaa, ei vielä omistajalle. Täytteistä 128/134 alle 3,5 m, leveimmät 4,2–6,7 m.

## KK 15.00:n seitsemän kohtaa, tehty säännöillä
Luvut koko joukosta ennen (v3, 253 ovea, sama mittari) → jälkeen (v5, 237 ovea, tasolla 1: 217):
ikkunan päällä 167 → 2; matala seinä 16 → 0; ilmassa ilman portaita 61 → 0; ei tilaa edessä 89 → 0; eri ovi 6 → 0. Ilman ovea 43, niistä tasolta 1 näkyy 17. Verkko 237 ovea, 246 askelmaa, 5 576 kolmiota, 642 kt (kokonaismuisti mittaamatta).
1. Ikkuna: `V4_ikkuna*`- ja `V4_ristikko`-pinnoista oma kerros `Ik`; puhdasta seinää haetaan koko sivulta, muuten `peita` valitsee pienimmän täytteen, ovi ikkunan kohdalle. Lajit `keskelle-peitto` 99 ja `nakyva-peitto` 35: **134 ovea peittää ikkunan**, koska 2,8 m puhdasta seinää on harvassa. Tämä on KK:lle kerrottava luku.
2. Sama ovi: lev aina 2,4 ja kork 2,65; yli 2,7 m leveä tai yli 2,9 m korkea aukko täytteellä. Kapeita 1,5 m:n aukkoja on edelleen 3 mallissa; ovi menee niiden päälle seinän eteen (katsottu vain arkin verran).
3. Matala seinä: `tasanne` (1,5 m tasaista, 2 m tyhjää, enintään 4 m) on jalusta, ja haku jatkuu sen päällä. 弘义阁: terassin päällä ei ole seinää oven kohdalla, joten ei ovea.
4. Ilmassa: portaat `ps`, `pl`, `pn` (`Portaat` Ovet.cs:ssä, marmori laji 16, koneen portaita 55, nousu enintään 3 m). Alle 0,75 m:n reunus ei ole lattia: ovi maasta asti sen eteen eikä portaita (南薰殿). **Tämä poikkeaa KK:n sanamuodosta**, kerrottu viestissä.
5. Tila: 3 m ja oven levyinen väylä, muuten seuraava kohta tai sivu.
6. Pimeä huone: `Resources/JuoksuOviHamara.shader`, näkösäde laatikossa, ei valoja eikä kuvia, IGN-rae värihyppelyille. Color-ominaisuudet ovat sRGB:tä (ensimmäinen ajo oli sen takia musta). Sävyt `_Lahi`, `_Kauko`, `_Huone`.
7. Täyte: Lattia-varjostin `_Laji` 10, sama maailmakoordinaatin rappaus kuin seinässä. 保和殿: täyte 6,5 m pylväiden väliin, koska avoimen hallin läpi näkyi piha; 太和殿:llä mallin oma ovi, ei täytettä.

Ilman ovea, näkyy tasolta 1 (17): 弘义阁, 崇楼2, 钦安殿, 西暖殿, 东所, 延禧宫, 长春宫戏台, 广播室, 碑亭, 碧琳馆, 御景亭, 四神祠, 碧螺亭, 玉翠亭, 凝香亭, 耸秀亭, way/1341826243. Syyt rakennuksittain: `tulos.json`, `ovet.ei_syyt`. 26 muuta ei näy tasolta 1.

## Tunnetut, ei korjattu
- Vielä 2 ovea mittarissa `ikkuna`: ei selvitetty.
- 储秀宫 (kuva 11): täyte (2,27 × 3,05 m, kapeampi kuin ovi) näkyy laikkuna oven yläpuolella ja erottuu seinästä. Avoin vika, KK:lle kerrottu. Täytteen tasoa ja sävyä ei ole verrattu seinään tässä tapauksessa.
- `tila` katsoo vain kartan kuljettavuutta; puut eivät ole kartassa. 绛雪轩:n arkkikuvassa runko on oven vieressä (kuvakulma, ei oven paikka).
- Portaat ovat marmoria (laji 16). Malleissa on myös `V4_kujakivi_porras`; jos KK haluaa juuri sen pinnan, tarvitaan kuva ja jako (JuoksuV4Maailma.cs:n KiviJako).
- LAV:n `katot-v125/koejuuri-jalustat` (mallin O portaat): jos juuri hyväksytään, `--uudelleen` ja kartta uudelleen.
- KK:n muut rivit odottavat PT:llä tai LAV:lla: 乾清宫:n paneelit, beige kouru, maan raidat.

## Tekemättä, järjestyksessä
1. KK:n vastaus arkkiin (korjaukset samalla tavalla säännöillä).
2. Muisti iPadilla JU:n vuorolla (pyydä erikseen; JU tietää): ovet + esineet, ei `palatsi kopiot 1`, vertailu ka 4000, huippu 4068 (c4a5bfafb), raja 4080. Lähtötaso ilman niitä ensin. KK: yksi ajo.
3. Koko kierros kahdesti JU:n vuorolla: väärin kierretyt -mittari, m15; sitten todistukset 1–4 (-1320).
4. Osa C (kynnykselle pysähtyminen, korkeus portailla, esineiden törmäys ja rikkoutuminen), Testinäkymän rivi, CS0152-selvitys: kuten -1320. Kynnys on nyt kuljettavalla myös koneen portaiden juuressa; osa C:n viesti siihen.
5. Omistajan päätös 14.46: esineiden ämpärivienti vasta PK:n vahvistuksella; ovimalli Tripolta Lavastajan kautta, laatikko sijoituskokeissa siihen asti.

## Muistiinpanot
Ajo: `PROTO_LINJA=1 zsh tyokalut/tarkastelu_kuvat.sh <sha> tyokalut/koekuvat-ovet-220.txt "ovikoe koe"`, vuoro JU:lta, rivi JU:lle valmiina. Uusi lista: skriptiin nimetyt osm:t ja `tyokalut/ovikuvat.py <v5> <ulos> 5 <osm...>`; se väistää nyt latvukset ja vaatii koko oven näkymisen. Arkki: PIL-ruudukko kuvalistan järjestyksessä, 5 sarakkeessa, 640 × 480, fontti `/System/Library/Fonts/Hiragino Sans GB.ttc`. Täysikokoiset kuvat ovat 2202 × 1651; väriraidat näkyivät vasta niistä.
Viestit: PT local_8d8ebf72, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, KK local_d5f31591, LAV local_f12c9179-a76b-4ce8-a1fe-1e0f2c8f251e.

## LISÄYS 16.40: KK:n vastaus arkkiin ja tehty työ
KK 16.2x (suunnitelman viimeinen osio): 006b9c194 kuitattu, arkki omistajalla. Ikkunan peitto 134 ovella ja alle 0,75 m:n kivijalka ilman portaita: kyllä. Tarkastelun listalle: ikkunoiden L-muotoinen ristikko. Muisti: yksi ajo JU:n vuorolla, ei odota sääntöjä.
Proto **974f95213**, kartta `_tyo/pelikoodari/kulkukartta/v6/`, lista `tyokalut/koekuvat-ovet-221.txt` (18 kuvaa): rungot esteeksi (puut.json), ei runkoa 6 m oven edessä, seinää 0,5 m kummallekin puolelle, lehti enintään seinän pituinen, terassi ilman portaita, muut sivut samalla säännöllä, täytteen kierto (`Kierra`, Ovet.cs). **Ei käännetty eikä kuvia katsottu.** Vuoropyyntö JU:lle lähetetty: Mac-kuvat ja muistiajo samalla rungolla.
Avoimet: 南薰殿 ei siirtynyt, kartan pinnat eivät näytä vastaavan kuvaa (syy selvittämättä). Kehyksen syy väärä kierto on oletus, kunnes kuvat vahvistavat. Ilman ovea näkyy 17: `tulos.json`, `ovet.ei_syyt`, kenttä `avoin`.
