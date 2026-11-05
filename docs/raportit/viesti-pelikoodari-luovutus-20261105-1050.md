# Pelikoodari: luovutus 5.11.2026 klo 10.50: arkki v18 KK:lla, KK:n neljä selvitystä auki

Korvaa -20261105-0950:n tilan; sieltä tausta tarvittaessa (`git log` lisäyksistä; täyte, valo, kaide). Ei junaan mitään ennen omistajan pyyntöä; omistajalle vain KK:n kautta. Merkitse jokaiseen tulokseen runko.
Proto-worktree `/Users/Shared/Claude/wt/proto-pelikoodari-tarkastelu`, haara `pelikoodari/tarkastelu-219`, kärki `35b16efa9` (myös `natiivi-backup`issa). Polut `/Users/Shared/Claude/proto-3d/`. Python `/opt/homebrew/bin/python3` ilman -I. Työkalut `_tyo/pelikoodari/tayte/8cd/`.
Viestit send_messagella: PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a, LAV local_f12c9179-a76b-4ce8-a1fe-1e0f2c8f251e, Postivahti local_1f31f830-9df5-41c1-8992-172e100af57f.

## 1. Seuraavaksi: KK 10.47 (syy ja laajuus ensin)
Rajausarkit kopioitu: `_tyo/pelikoodari/tayte/8cd/ovet-f1b-rajaus-a.jpg` ja `-b.jpg`. Täysikoko: `lokit/tarkastelukuvat-f1be6b358-103126`. KK vie arkin omistajalle vikoineen. Seuraava arkki vasta omistajan vastauksen jälkeen.
1. **Raidallinen maa:** venyneeltä näyttävä raidallinen pinta pihoilla, noin 10/49 kuvassa: 东长房, 凝香亭, 吉云楼, 四执库, 如意馆, 平房22, 慧曜楼, 敬胜斋, 房子6, 竹香馆. 竹香馆:ssa suorakaide laatoituksen päällä ja reunassa katkoviiva (rajaus-a, kuva 1). Selvitä mikä malliosa ja näkyykö sama TF 217:ssä; jos kuuluu LAV:n irto-osiin, vie LAV:lle.
2. **Ohuet vaaleat piikit maassa:** 雨花阁 ja 中正殿 (pitkä viiva laattojen yli), 上书房 (sirpale keisarin vieressä); rajaus-a, kuvat 2–4. Sama syy?
3. **Kiilat:** 永和宫 tasainen harmaa kiila ilman pintaa kivijalan kulmassa (rajaus-a, kuva 5); 长春宫戏台 iso kiila laatoituksessa (rajaus-b, kuva 12). Kuuluvatko irto-listaan (`linnanrakentaja/muuri/irto/lista.csv`)? 耸秀亭:n kiila ja kivikaista samasta syystä tarkistettava.
4. **颐和轩 kahdet portaat:** mallin omat vaaleat vievät ikkunaseinään, oven omat harmaat vieressä (rajaus-b, kuva 8; vrt. 太极殿). Pitäisikö ovi olla mallin portailla? Oma-ovi-reitti: `kulkukartta.py` (`oma=True`) tai käsin kuten 益寿斋 (`22933732f`).
Tulos KK:lle riviksi, ei uutta arkkia. TF 217:n runko oletuksena `natiiviseppa/runko-217-tf` (077e1601e), TF 218 `a5323cf4e`.

## 2. Tila
Kartta v18 (`_tyo/pelikoodari/kulkukartta/v18`, `Resources/JuoksuOvet.json` = v18). Uudelleenajo: `kulkukartta.py`, sitten `tyokalut/ovi_y.py` (y kolmioista), sitten `tayte_valo.py`; 益寿斋 (`oma-ovi`) jää ovi_y:stä pois.
Arkki `_tyo/pelikoodari/tayte/8cd/arkki-f1b-{1,2,3,4}.png` (49 ovea, `f1be6b358`). Lisäkuvat 咸福宫, 耸秀亭: `lokit/tarkastelukuvat-35b16efa9-104305` (sama koodi). KK:lle kerrottu: arkki 51/51, ovet ehjät.
Täysikoossa katsottu: lista 234 (13) ja 上书房, 颐和轩, 丽景轩, 房子7, 公共厕所, 绥寿殿, 长春宫戏台, 咸福宫, 耸秀亭. Muut arkkina.
KK:lle kerrottu jäävän ennalleen: 房子11–房子8 6,4 m; 体元殿, 咸福宫 lehti ikkunan edessä; ilman valoa 绥寿殿 (vaalea laikka), 益寿斋, 南库, 军机处; 浴德殿 kaista; 长春宫, 咸福宫 harmaat portaat; 丽景轩 puu 2 m edessä ja 2,5 m sivussa; 绥寿殿 mallin puuovi vieressä; 皇极殿 nauha; 房子26 laatta; 延禧宫 kivirakennus; 弘义阁 B4 (LAV katsoo levykorjauksen jälkeen).
Omistaja 09.35: 9 ovetonta saa jäädä (työlistassa). Ovien ulkonäkö "Kelpaa" (08.52), kun viat korjattu.

## 3. Muistimittaukset seis (omistaja 10.38)
Uusia muistiajoja ei tehdä, ennen kuin ensimmäinen taso on valmis tai julkaisua valmistellaan; ovimallin ja esineiden muisti mitataan silloin, kevennys tarvittaessa silloin (työlistassa "Juoksupelin muistimittaukset odottavat tasoa"). `muisti-ovet/sarja-wifi.zsh` valmis, EI AJETA nyt.
Luvut myöhempää varten, `lokit/pelikoodari-muisti-lahtotaso-*`: iPad ilman wifiä noin 09.49–10.3x, joten 8/9 lentoa ilman verkkoa (noin 640 latausvirhettä: esilataus, luettelot, mikseri, äänet, isoisa.json, kartan palat). Vain d9c s3 verkossa. Huiput: d9c 3823, 3823, verkossa 3987 (+164 Mt, yksi mittaus); 789 4127 (VIKA, 1 lento), 3943, 3963; 314 3825, 3933, 3814. Ei todisteeksi. Aiempien 789 4122–4130 ja d9c 4003–4009:n verkkoa ei tarkistettu. Mittaa silloin verkossa ja tarkista `Cannot resolve destination host`.
Korjaa samalla `lahtotaso.zsh`: `odota_lento` odottaa turhaan 240 s VIKAn jälkeen, `laheta` ei uusi lähetystä.

## 4. 404:t (PT:lle kerrottu, ei kiirettä)
`kielletty-c2-v34/a3-baoding-lod1.glb`, `a5-marmorikaide-pylvas-lod1.glb`, `kielletty-osasarja-v8/pursotukset.glb`: valinnaisia hakuja, puuttuvat myös 217:stä ja 218:sta. LOD1 puuttuu → LOD0 kaikilla etäisyyksillä (A5 3247 kolmiota × 499 Meridiaaniportin LOD0:n mukana); pursotukset → pelin omat (977). Ei kuvavarmistusta.

## 5. Muut avoimet
- Työkaluvika, ei korjattu: `ovikuvat.py`:n PUUT lukee taustan puut.json:n (3574), kartta ja peli `kielletty-lahipuut-v15`:n (4931). Vain kameravalinta.
- `TarkasteluKesken`: mittaus jää odottamaan pitkissä listoissa (tällä kertaa 咸福宫, 耸秀亭; yksinään ajo onnistuu). Syy auki: lodHaivytettavat tai OsasarjaAtlasKesken.
- Kaide: sävy a `c1d985643` haarassa `pelikoodari/muurin-runko-219` (ei käännetty); haaleus ja LOD2 auki (-0810 kohta 3).
- PT:n järjestys sen jälkeen: tk-taihemen-lod0:n syy (-0810 kohta 4).
- Leivonta: 南库, 军机处 LAV:n levykorjauksen ajossa. 绥寿殿 + 3: jos pyyntö, kerro kohteet, LAV:n hinta ja näkyvä vika.
- Tutkimatta: 房子11:n maalaatan reuna; LAV: 房子26, 房子11 y 0,37 ja 0,35 irto-listalla, y 0,31 ja y 0 eivät.

## OPIT
Tarkista laiteajon verkko konsolista, ennen kuin vertaat lukuja, ja erota 404 verkkovirheestä, ennen kuin syytät wifiä. Puuhavainnossa lue sama lista kuin peli. Viesti voi ohittaa toisen: KK:n rivit tulevat jonosta myöhässä, lue aika ennen kuin toistat tehdyn.
