# Pelikoodari: luovutus 4.11.2026 klo 17.17 – ovikorjaukset KK:lla, muistiajo JU:lla

Korvaa -1619:n tilan ja LISÄYKSEN. Lue edelleen -1320:n linjaukset ja todistukset 1–4. Syy: konteksti 30 % (7.37). Polut kansiossa /Users/Shared/Claude/proto-3d/. **Merkitse jokaiseen tulokseen runko.**

## Linjaukset
- **Omistaja 16.25** (kortti "Kelpaako ovien sijoitus näin, kun nämä viat korjataan?"): Kelpaa. Jatka samalla säännöllä. Ei junaan.
- **KK 16.2x** (suunnitelma `Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261104-juoksupeli-vapaa-maailma.md`, viimeinen osio): ikkunan peitto 134 ovella ja alle 0,75 m:n kivijalka ilman portaita: kyllä. Omia kuvia ei tarvita ennen ovimallia, ellet halua. Tarkastelun listalle: ikkunoiden L-muotoinen ristikko (重华宫, 四执库, 翊坤宫, 平房9: varjo vai pinta?), ei tutkittu.
- Koti-haara yhdistetty origin/mainiin 16.3x (PT); Raamatun 2.177 luettu.

## Tila
Proton haara `pelikoodari/tarkastelu-219` = **974f95213** (worktree /Users/Shared/Claude/wt/proto-pelikoodari-tarkastelu; ei etärepoa, ei junassa). Kartta `_tyo/pelikoodari/kulkukartta/v6/`, `Resources/JuoksuOvet.json` ja `JuoksuEsineet.json` samasta. Uudelleenajo: `python3 tyokalut/kulkukartta.py <v6> x [--vertaa <v5>/ovet.json]` noin 1 min. Kuvat `lokit/tarkastelukuvat-974f95213-163646/ovet-arkki.png` (18), lista `tyokalut/koekuvat-ovet-221.txt`. Lähetetty KK:lle 17.15: vastaus odottaa.
Luvut v6: 237 ovea, tasolla 1: 214, koneen portaita 55, ilman ovea 43, niistä näkyy tasolta 1: 17. Mittarit v5 uudella mittarilla → v6: seinän pää 3 → 0, kulma 4 → 0, puu 31 → 0, ei tilaa 13 → 0, ikkuna 2 → 1 (皇极殿, portaiden ovi, matala ikkuna noin 5 cm oven reunan yli). 41 ovea siirtyi; uudet 崇楼2, 长春宫戏台, 碧琳馆; pois 房子11, 如意馆, 房子6.

## Tehty KK:n viidestä
1. Kehys: palat poissa 四执库:n ja 重华宫:n täysikokoisista kuvista. Syy väärin kierretty täyte (`Kierra`, Ovet.cs; kierto tarkistetaan normaalia vasten kaikille laatoille).
2. Puut: `rungot()` puut.json:sta (säde 0,027 × korkeus, vähintään 0,2 m), pinnoiksi −3…10 m ajon aikana, ei välimuistiin. `PUU_EDESSA` 6 m. **Osa C:ssä `PuuVerkko = null`:** nyt peli jättää vanhoille kaistoille osuvat lähipuut piirtämättä, ja ne olisivat näkymättömiä esteitä.
3. Seinän pää: `reuna`, `REUNA_MIN` 0,5 m, syvyys oven seinän tasolla; `kulma`; lehti lyhenee (`syv`).
4. Ovettomat: `terassi` (yli 2 m syvä tasanne: ovi ilman portaita, 体仁阁, 崇楼1–4) ja `etusivu` muille sivuille. Kapeammat portaat kokeiltu, eivät tuoneet yhtään, poistettu. `ei_syyt.avoin` = osuus pohjan sisäpisteistä ilman seinää. Avoimet mittarilla: 碧螺亭, 玉翠亭, 凝香亭, 耸秀亭, 碑亭 (kuvista ei tarkistettu). 御景亭 ei avoin (0,0).

## Auki
- **Muistiajo:** JU kääntää 974f95213:n ja ajaa `_tyo/pelikoodari/muisti-ovet/lahtotaso.zsh`, sitten `ovet-esineet.zsh`. Skriptejä ei ole ajettu kertaakaan. Tulos `lokit/pelikoodari-muisti-*`; vertailu ka 4000, huippu 4068 (c4a5bfafb), raja 4080. Vie KK:lle. Rajoitus kerrottu: `PaivitaEsineKoe` kutsutaan vain tarkastelukamerasta, joten esineiden mallit latautuvat, mutta 110 kappaletta ei synny; luku on niiden osalta alaraja.
- **南薰殿:** lehti yhä irti seinästä, ovi ei siirtynyt. Kartta näkee seinän 0,12 m:ssä koko sivulla, kuvassa sitä ei ole. Syy selvittämättä; vihje: kartta lataa koejuuri-ulkomuurin, peli omat versionsa (Palatsi.cs). Ei varmistettu.
- **Täytteen sävy:** täyte/seinä 0,92 / 0,90 / 0,93 (重华宫, yksi kuva). Näkyy laikkuna oven yläpuolella. Korjaamatta (`ms` _BaseColor Ovet.cs); ei tiedetä, päteekö muilla.
- 长春宫戏台:n ja 崇楼2:n kuvat eivät näytä ovea (kamera); 崇楼2 käsin lisätty rivi.
- 绛雪轩: runko kuvassa portaiden vieressä, ei oven edessä.
- Vanhat ennallaan: LAV `koejuuri-jalustat`; 乾清宫:n paneelit, beige kouru, maan raidat PT:llä/LAV:lla.

## Tekemättä, järjestyksessä
1. KK:n vastaus arkkiin ja muistituloksen vienti.
2. Koko kierros kahdesti JU:n vuorolla: väärin kierretyt -mittari, m15; sitten todistukset 1–4 (-1320). Ovien kierto on nyt korjattu, joten keltaisen osuuden pitäisi laskea näissä kuvissa.
3. Osa C (kynnykselle pysähtyminen, korkeus portailla, esineiden törmäys ja rikkoutuminen; `terassi`-ovien luo ei pääse), Testinäkymän rivi, CS0152-selvitys: kuten -1320.
4. Omistajan päätös 14.46: esineiden ämpärivienti vasta PK:n vahvistuksella; ovimalli Tripolta Lavastajan kautta, laatikko sijoituskokeissa siihen asti.

## Muistiinpanot
Ajo: `PROTO_LINJA=<JU:n antama> zsh tyokalut/tarkastelu_kuvat.sh <sha> <lista> "ovikoe koe"`, kesti lukkoineen 37 min. Lista: `tyokalut/ovikuvat.py <v6> <ulos> 0 <osm...>` ei anna kameraa tasolta 1 tavoittamattomille terassille; rivi käsin. Arkki: PIL 5 saraketta, 640 × 480, Hiragino Sans GB. Pintakuvassa keltainen = väärin kierretty, ei kohde.
Levy: 16.5x siirretty T7:lle (`/Volumes/T7 4TB/koodaus/proto-arkisto/_tyo/pelikoodari`) symlinkein kaikki `_tyo/pelikoodari`-kansiot, joita on muokattu ennen 4.11. klo 9, ja kulkukartta v1–v4. Paikalla: v5, v6, muisti-ovet, ulkoesineet-v1b, musta-lento, muistipiikki-219.
Viestit: PT local_8d8ebf72, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, KK local_d5f31591, LAV local_f12c9179-a76b-4ce8-a1fe-1e0f2c8f251e, Postivahti local_1f31f830-9df5-41c1-8992-172e100af57f.

## LISÄYS 17.3x: KK 17.24 vastasi, tämä on seuraava työ
Koko teksti: suunnitelman (`Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261104-juoksupeli-vapaa-maailma.md`) viimeinen osio; lue se ensin. Korvaa "Tekemättä"-kohdan 1 ja ohittaa kohdat 2–3, kunnes arkki on KK:lla. Kehys ja puut kelpaavat. Ei vielä omistajalle, ei junaan.
Korjattavat: (1) 东长房: ovi räystään läpi, sääntö ja mittari kaikille 237 ovelle. (2) Täyte erottuu kaikissa peitto-ovissa. (3) 南薰殿: syy; mittaa pelistä, onko kummankin lehden takana oikea seinä. (4) 雨花阁: valkoinen viiva, vaaleampi hämärä. (5) Uudet kuvat: 长春宫戏台 (tumma taso, toisen oven lehtikö?) ja 崇楼2. (6) `avoin` ei todista paviljongin avoimuutta (ontto rakennus antaa saman 1,0): arkki 17 ovettomasta pelikameralla.
Ovimalli mallit-v1 kytketään laatikon tilalle: karmi tummemmaksi sävytyksellä, lehdille sama materiaali, instanssit, mittakaava samassa suhteessa. Muisti ja ruutuaika iPadilla JU:n vuorolla. Seuraava arkki uudella ovimallilla → KK. Muistiajo 974f95213 ei odota tätä.
