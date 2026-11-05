# Pelikoodari: luovutus 5.11.2026 klo 09.50 – ovien kartta v16, kuvat JU:lla

Korvaa -20261105-0810:n tilan; sieltä tausta tarvittaessa (täyte, kaide kohta 3, muistisarja kohta 4). Ei junaan mitään ennen omistajan pyyntöä; omistajalle vain KK:n kautta. Merkitse jokaiseen tulokseen runko.
Proto-worktree `/Users/Shared/Claude/wt/proto-pelikoodari-tarkastelu`, haara `pelikoodari/tarkastelu-219`, kärki `5d9b1552d` (myös `natiivi-backup`issa). Polut `/Users/Shared/Claude/proto-3d/`. Python `/opt/homebrew/bin/python3` ilman -I. Työkalut `_tyo/pelikoodari/tayte/8cd/`.
Viestit send_messagella: PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a, LAV local_f12c9179-a76b-4ce8-a1fe-1e0f2c8f251e, Postivahti local_1f31f830-9df5-41c1-8992-172e100af57f.

## 1. Seuraavaksi
PT 09.50: käynnistys tehty, iPad taas JU:n vuorolla. Muistisarja menee JU:n iPad-jonoon (ks. -0810 kohta 4).
1. JU:n ajot: 230 (runko `8b0f8f9e1`, 益寿斋) ja 231 (`5d9b1552d`, 西暖殿). Kansio tulee JU:lta riviksi (`lokit/tarkastelukuvat-<sha>-*`). JU kertoi, ettei kumpikaan alkanut ennen käynnistystä; jos riviä ei tule, kysy JU:lta. Älä vaihda worktreen haaraa ajon aikana.
2. Katso molemmat täysikoossa. 西暖殿 on KK:n pyyntö ennen arkkia.
3. 益寿斋: uusi paikka x −134,47, z 385,8, nx −1, keskelle-peitto, täyte 7,45 × 3,45 m ilman valoa (malli varasto.glb). Jos näkyy huonosti, ratkaise ennen arkkia. Ovettomaksi jättäminen vaatii omistajan vastauksen.
4. Kohta 2 (KK): 浴德殿 vaalea kaista ja pystyviiva, 四执库 piikki lehden alareunassa, 重华宫 kiila, 皇极殿 ikkuna. Konteksti ratkaisee määrän; yksi ajo kerrallaan JU:lta.
5. Arkki KK:lle: `_tyo/pelikoodari/tayte/arkki.py <kansio> <etuliite> 3`. Merkitse rungot, kuten v13:n arkissa. Mukaan viestiin: 房子11–房子8 6,4 m (ei voi siirtää samankokoisena, ajettu), 体元殿:n ja 咸福宫:n avattu lehti ikkunan edessä, 绥寿殿:n valoton täyte, ikkunakorjaus (alla), 弘义阁 (B4) vastaus.

## 2. Kartta
v16 (`_tyo/pelikoodari/kulkukartta/v16`, `Resources/JuoksuOvet.json` = v16). Pinnat v15:ssä: S v7:stä, Ik laskettu uudelleen (`kulkukartta.py <kansio> <osasarja> --ikkunat`). Uudelleenajo: linkki pinnat.npz v15:stä, `kulkukartta.py <v> x`, `tayte_valo.py <v>`, kopioi ovet.json käsin. Erot: `8cd/ero15.py vA vB`.
Korjaus `734ab83ef`: `pinnat()` keräsi ikkunat ennen mallin siirtoa, joten Ik:ssä oli oikeilla paikoilla vain tausta ja muurikate. Ovien vaikutus v14 → v15: 7 ovea (永和宫 25,5 m, 益寿斋, 体元殿, 长春宫, 咸福宫; 钟粹宫 ja 绥寿殿 saivat täytteen). Korjaus `8b0f8f9e1`: W ≤ 6,5:n aukkoa, jossa on mallin oma lehti, ei enää käytetä (益寿斋:lla ruskeat lehdet näkyivät ja kaman yli läpi).
Mittarivaroitus: `mat.py` ja `seinat.py` katsovat kolmioita ennen siirtoa, joten ne näkevät vain taustan. Käytä mallien tarkistukseen s.siirra-käärettä (`8cd/`-kansiossa ei vielä valmista; malli: `pinnat()`:n `siirra`).
Ajo 734ab83ef katsottu (`lokit/tarkastelukuvat-734ab83ef-093144`, 7/7 täysikoossa): 永和宫, 长春宫, 钟粹宫 hyvät; 绥寿殿 valoton täyte näkyy vaaleana suorakaiteena; 体元殿, 咸福宫 lehti ikkunan edessä (ei korjattu); 长春宫, 咸福宫 tasaisen harmaat portaat (ei uusi).

## 3. Valo ja leivonta
Ilman valoa v16: 南库, 军机处, 绥寿殿, 益寿斋. 南库 ja 军机处: `kk-tausta-1-2` (mitattu V4_red maailmassa, ei valo_rgbm:ää). PT: leivotaan vasta LAV:n levykorjauksen jälkeen, ei omaa ajoa. LAV: valo puuttuu vahingossa v96:sta alkaen, leivottu pala jo `kk2r/leivottu`.
绥寿殿: seinä `tyohuone.glb`, ei valo_rgbm:ää eikä UV1:tä (7158 kolmiota 4 m:n sisällä, mitattu). 益寿斋: ikkunat `varasto.glb`:ssä; seinä pääteltynä sama, ei mitattu erikseen.
PT: jos tuot leivontapyynnön 绥寿殿 + 3, kerro kohteet, hinta LAV:lta ja mitä vika näyttää pelissä ilman leivontaa.

## 4. Omistajan ja KK:n linjaukset
Omistaja 09.35: 东所, 1341826243, 弘义阁, 碑亭, 碧螺亭, 玉翠亭, 四神祠, 御景亭, 广播室 saavat jäädä ilman ovea, ei enää yrityksiä (työlistassa "Juoksupelin ovet: yhdeksän rakennusta ilman ovea").
Omistaja 08.52 "Kelpaa" ovien ulkonäöstä, kun viat on korjattu. Seuraava arkki KK:lle → omistajalle. Ei junaan.
KK: 房子11–房子8: siirrä samankokoisena, jos mahdollista; muuten jätä ja kerro arkin yhteydessä. Toinen kierros ajettu: kumpikaan ei löydä paikkaa (molemmat None; `8cd`:ssä ei ajoskriptiä, tulos kartalla v16, pinnat v15).

## 5. Muut avoimet
LAV: 房子26 irto-listalla; 房子11:stä y 0,37 ja 0,35 ovat, y 0,31 ja y 0 eivät; 弘义阁 y 0,81 (68 m²) ei ole, V4_marmoria ei löytynyt vaakapintana, joten havaintoni on epävarma. LAV katsoo ensin, poistaako levykorjaus nämä; ei tehtävää minulle ennen sitä.
Kaide: sävy a `c1d985643` haarassa `pelikoodari/muurin-runko-219` (ei käännetty); avoimet haaleus ja LOD2 (-0810 kohta 3).
Sen jälkeen PT:n järjestys: tk-taihemen-lod0:n syy (-0810 kohta 4).
Tutkimatta: 凝香亭:n mittaus jää odottamaan pitkissä listoissa (`TarkasteluKesken`), 延禧宫 kivirakennus (kerro KK:lle), 房子11:n maalaatan reuna.

## Lisäys 5.11. klo 10.13
Runko `430edc9d1`, kartta v17 (`Resources/JuoksuOvet.json` = v17; vain 益寿斋 siirtyi). Lista 233 JU:lla (korvaa 232:n, jos ei alkanut); kansio tulee riviksi.
Katsottu: 230 ja 231 täysikoossa (runko `5d9b1552d`). 西暖殿 ehjä. 益寿斋 v16: täyte kelpaa, mutta oma kivijalan pylväs (z 385,0–385,3, 0,25 m) oli aukon edessä ja oikea lehti meni sen läpi. Mallissa on oma keskiovi portaineen z 382,44–385,12; lehdet eivät ole pinnoissa, eikä kivijalka näy niissä, joten kone ei löytänyt sitä.
Korjaus `22933732f`: 益寿斋 käsin omille portaille (`oma-ovi`, x −134,36, z 383,78, täyte 3,6 × 3,45, tsy 0,2). Malli on tällä sivulla huone-tyohuone, ei varasto.glb. Ei valoa yhä.
Korjaus `430edc9d1`: 四执库:n piikki oli lehden kulma jalustan reunan yli: lehden paksuus 0,117 puuttui. Marginaali 0,25 → 0,35 ja alaraja 15° → 11°. Vaikuttaa 105 oveen, joilla syv ≤ 1. Lista 233 katsoo 四执库, 重华宫, 储秀宫, 东长房, 体元殿, 益寿斋 × 2.
Hypoteesi: 重华宫:n kiila on lehti jalustan päälle ulottuvan laatan alla (ei mitattu); katso, katoaako 233:ssa.
皇极殿: `viat` ikkuna on vain mittari: ikkuna on oven vieressä, ei edessä; kuva ehjä, ei korjausta. Kuvassa (`380664d56`) koristenauha repeytyy oikealla ylhäällä: malli, ei ovi, kerro KK:lle arkin mukana.
浴德殿: vaalea kaista on täytteen ylävasen kulma; ei korjattu, kerro arkin mukana. Samassa kuvassa lattialaatan vino reuna: ei ovi.
Seuraavaksi: katso 233; jos ehjä, aja kaikki ovet samalta rungolta arkkia varten (lista JU:lle), arkki KK:lle (kohta 5).

## Lisäys 5.11. klo 10.2x: muistisarja
789 s1 kelpaa (`muistivahti.log`: 10.04.48.8 komennot ohitettu (VIKA)). Huiput lokista: 789 4122–4130 Mt (3 ajoa, kaikissa VIKA ja vain 1 lento, toinen mittaamatta), d9c 4003–4009, 314 s1 3825. Tulos-tiedoston 4084 on vain ylitysrivi. JU kokoaa sarjan.
Sarjan jälkeen `muisti-ovet/lahtotaso.zsh`: `odota_lento` odottaa turhaan 240 s VIKAn jälkeen ja kirjoittaa harhaanjohtavan rivin; `laheta` ei uusi lähetystä. Älä muokkaa sarjan aikana.

## Lisäys 5.11. klo 10.2x: kartta v18, lista 234 JU:lla
Runko `b70eb3e9a`, kartta v18 (`Resources/JuoksuOvet.json` = v18). Lista 234 JU:lla, 13 kuvaa; kansio tulee riviksi.
Katsottu 233 (`lokit/tarkastelukuvat-430edc9d1-101448`), täysikoossa 6: 益寿斋 hyvä; 四执库:n piikki poissa; 东长房 hyvä; 储秀宫 hyvä; `ovi-益寿斋-edesta` kamera on rakennuksen sisällä, älä käytä. 重华宫 ja 体元殿: lehden alaosan peittää lattia, ja reunan yli näkyy punainen kaistale (kiila).
Syy mitattu: oven y on 0,25 m:n ruudussa, oikea lattia kolmioista: 体元殿 y 0,25 / lattia 0,458, 重华宫 0,322, 四执库 0,356. 151/245 ovella ero yli 3 cm, suurin 0,41.
Korjaus `tyokalut/ovi_y.py`: ajetaan `kulkukartta.py`:n jälkeen ja ennen `tayte_valo.py`:tä (y, syv, tkork, pn). v17 → v18: 160 ovea, sijainnit samat. 益寿斋 (`oma-ovi`) ei mukana: lehti 90°, muuten osuisi portaan pylväisiin. Jätetty: 金银器馆, 珍宝馆, 小房9, 浴德殿 (ei pintaa), 房子25 (kapea 0,25, nosto 0,34).
Katsottava 234:stä: 重华宫, 体元殿 ja 四执库 ehjät? Nousseet ovet: 房子26, 皇极殿, 中正殿, 钟表馆, 武英殿, 永和宫: osuuko kamana räystääseen, näkyykö täytteen yläreuna. 储秀宫:n syv on nyt 0,1 (lehti 11°): katso.
Riski: täytteen tkork alle 3: 上书房, 颐和轩, 丽景轩, 房子7, 公共厕所 (katso arkista).
Jos ehjä: kaikki ovet samalta rungolta (lista JU:lle), arkki KK:lle (kohta 5, kerro myös v18 ja 益寿斋:n siirto). Muistisarjan rivit JU:lta eivät vaadi muuta.

## Lisäys 5.11. klo 10.31: 234 katsottu, lista 235 JU:lle
`lokit/tarkastelukuvat-b70eb3e9a-102348`, 13/13 täysikoossa, runko `b70eb3e9a`, kartta v18. Kiila poissa: 重华宫, 体元殿. Ehjät: 四执库, 储秀宫 (lehti 11° seinän myötäisesti), 东长房, 西暖殿, 益寿斋. Nousseet ovet ehjät: 房子26, 皇极殿, 中正殿, 钟表馆, 武英殿, 永和宫: kamana ei osu räystääseen eikä täyte näy yli. Ei uusia ovivikoja. 房子26:n kuvassa jalustan vino reuna ja 皇极殿:n nauha ovat mallin, eivät ovien.
Lista 235 (`f1be6b358`: vain listatiedosto kärkeen, koodi kuin `b70eb3e9a`): 51 ovea = 226:n 41, 234:n 13 ja 体元殿, 长春宫, 咸福宫, 钟粹宫, 上书房, 颐和轩, 丽景轩, 房子7, 公共厕所. Kamerat `ovikuvat.py` v18:lta; 234:n 13 sellaisenaan. 凝香亭 viimeisenä, koska se jää odottamaan pitkissä listoissa. Generaattori oli istunnon väliaikainen skripti; tulos on listatiedostossa.
Seuraavaksi: JU:n rivi → riskiviisi (tkork alle 3) ja 绥寿殿, 长春宫戏台 (kamera siirtyi) täysikoossa, muut arkkina → `arkki.py <kansio> <etuliite> 3` → arkki KK:lle (kohta 5, v18, 益寿斋:n siirto).

## Lisäys 5.11. klo 10.38: muistisarja ilman wifiä, uusinta JU:lla
KK: iso iPad ilman wifiä noin 09.49–10.3x. Lokeista: 8/9 lentoa ilman verkkoa (myös s1:t, 37–38 verkkovirhettä, 3 glb:tä puuttui: `kielletty-c2-v34/a3-baoding-lod1`, `a5-marmorikaide-pylvas-lod1`, `kielletty-osasarja-v8/pursotukset`). Vain d9c s3 verkossa (0 virhettä). Huiput (`muistivahti.log`): d9c 3823, 3823, verkossa 3987; 789 4127 (VIKA, 1 lento), 3943, 3963; 314 3825, 3933, 3814. Korvaa kohdan "muistisarja" tulkinnan: näitä ei käytetä rajan tai lähtötason todisteena. Kansiot jätetty. Aiempien 789 4122–4130 ja d9c 4003–4009:n verkkoa ei ole tarkistettu.
`muisti-ovet/sarja-wifi.zsh` (8 lentoa, -w1…-w3, pysähtyy, jos glb puuttuu verkkovirheellä) pyydetty JU:lta listan 235 ja juoksujen jälkeen. Rivit minulle, sitten tulos ja johtopäätös PT:lle ja KK:lle (KK 10.3x). Juoksut 314 ja 789 alkoivat 10.36: tarkista niistäkin verkkovirheet.

## Korjaus 5.11. klo 10.4x (JU, tarkistettu lokista)
Edellisen lisäyksen "3 glb:tä puuttui" ei ollut wifin syytä: samat kolme tiedostoa antavat verkkoajossakin (d9c s3) 404. Ilman verkkoa puuttui noin 640 latausta (789 s2: 641 Curl-riviä, d9c s3: 0): esilataaja, luettelot, mikseri, äänet, isoisa.json, kartan palat. Palatsimallit rakentuivat molemmissa. +164 Mt on yhä yksi mittaus, ja syy on näissä latauksissa, ei palatsimalleissa (ei todennettu tarkemmin). 404:t avoimia, kerrottu PT:lle.

## Lisäys 5.11. klo 10.5x: PT:n käsky, 3 × 404 selvitetty (vain luku), rivi PT:lle
Valinnaisia hakuja kaikilla rungoilla: `LataaSarjanMalli` hakee `-lod1.glb`:n (puuttuu → LOD0 kaikilla etäisyyksillä), `Osasarja.cs` hakee `pursotukset.glb`:n (puuttuu → oma pursotus, 977 kpl lokissa). Puuttuvat myös 217:stä (`natiiviseppa/runko-217-tf`, oletettu TF:n rungoksi; c2-v32, osasarja-v6) ja 218:sta (`a5323cf4e`; c2-v34, osasarja-v8); pursotukset.glb puuttuu osasarjoista v1–v9. A3 4485 ja A5 3247 kolmiota, A5 499 kpl Meridiaaniportin LOD0:n mukana. Ei tarkistettu kuvasta. Ei vaikuta wifi-uusintaan.
