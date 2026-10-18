"""Väestöpinnan hetket: armeijat, reitit ja lyönnit (Karttaseppä 17.10.2026). Kaikki luvut ARVIOITA (arvio = True).

Aika `t` on hetken oma 0–1 (video: keräys → marssi → lyönti → hajoaminen → toipuminen); Pelikoodari ajaa liikepohjan käyrillä.
Reitit [lon, lat] ovat tunnettujen paikkojen kautta (kerrokset_data, Wikipedia: Battle of Red Cliffs), tarkkuus ~20 km.
"""

# Songin hovin ja laivaston yhteinen reitti Yamenille (Yamen 1279; lineaarinen kuukausiskaala, t 0,10 = helmikuu 1276, 0,48 = kesä 1278)
_SONG_REITTI = [
    dict(t=0.10, lon=120.17, lat=30.25, paikka="Lin'an (Hangzhou) antautuu 4.2.1276"),
    dict(t=0.12, lon=120.65, lat=28.02, paikka='Wenzhou'),
    dict(t=0.16, lon=119.30, lat=26.08, paikka='Fuzhou (Duanzong kruunataan kesäkuu 1276)'),
    dict(t=0.23, lon=118.68, lat=24.87, paikka='Quanzhou (joulukuu 1276)'),
    dict(t=0.26, lon=116.62, lat=23.66, paikka='Chaozhou (1277)'),
    dict(t=0.30, lon=117.07, lat=23.43, paikka="Nan'ao-saari (1277)"),
    dict(t=0.34, lon=114.19, lat=22.33, paikka='Kowloon / Qianwan (1277)'),
    dict(t=0.39, lon=113.67, lat=22.82, paikka='Xiushan (Humen, joulukuu 1277; heikko)'),
    dict(t=0.40, lon=113.50, lat=22.15, paikka="Jing'ao (myrsky; heikko, ±30 km)"),
    dict(t=0.44, lon=110.60, lat=21.05, paikka='Naozhou (1278; sijainti kiistelty, vaihtoehto Lantau)'),
    dict(t=0.48, lon=113.08, lat=22.27, paikka='Yashan / Yamen (kesä 1278)'),
]

HETKET = {
    208: dict(
        nimi='Punaiset kalliot', vuosi=208, rajat_vuosi=250,
        huom='Omistusvärit vuoden 250 rajoista (Wei = Cao Caon Han-hovi, Wu = Sun Quan; Shun alue oli 208 vielä Liu Zhangin ja '
             'Liu Biaon perillisten). Taistelupaikka kiistanalainen (kerrokset: taistelu.alue).',
        armeijat=[
            dict(avain='cao-cao', nimi='Cao Cao', dynastia='wei', miehia=200000, miehia_vali=[150000, 240000], arvio=True,
                 huom='Noin 150 000–240 000 (Zhou Yun puhe, Sanguozhi 54 Pei; de Crespigny ~230 000 huoltoineen); pohjoisia enintään '
                      '~150 000, Jingzhoun antautuneita enintään ~70 000–80 000. 800 000 on Cao Caon oma propagandaluku.',
                 # mistä miehet kerätään: alue (lon, lat, säde km) ja osuus
                 keraus=[dict(lon=114.0, lat=35.2, sade_km=260, osuus=0.65), dict(lon=112.2, lat=31.4, sade_km=150, osuus=0.35)],
                 reitti=[dict(t=0.10, lon=114.35, lat=36.30, paikka='Ye'), dict(t=0.18, lon=113.82, lat=34.03, paikka='Xuchang'),
                         dict(t=0.28, lon=112.15, lat=32.02, paikka='Xiangyang'), dict(t=0.36, lon=112.20, lat=30.35, paikka='Jiangling'),
                         dict(t=0.48, lon=113.50, lat=29.95, paikka='Wulin (leiri)')]),
            dict(avain='sun-liu', nimi='Sun Quan ja Liu Bei', dynastia='wu', miehia=45000, miehia_vali=[40000, 50000], arvio=True,
                 huom='Noin 40 000–50 000: Zhou Yu noin 30 000 (Sanguozhi 54), Liu Bei ja Liu Qi noin 10 000–20 000.',
                 keraus=[dict(lon=117.0, lat=30.4, sade_km=180, osuus=0.6), dict(lon=114.3, lat=30.5, sade_km=90, osuus=0.4)],
                 reitti=[dict(t=0.30, lon=115.98, lat=29.73, paikka='Chaisang'), dict(t=0.40, lon=114.27, lat=30.57, paikka='Xiakou'),
                         dict(t=0.48, lon=113.62, lat=29.87, paikka='Punainen kallio')]),
        ],
        lyonnit=[dict(t=0.55, lon=113.56, lat=29.91, voittaja='sun-liu', havio='cao-cao', voima=1.0,
                      huom='Tulilaivat polttavat Cao Caon kiinnitetyn laivaston; tauti ja vetäytyminen.')],
        jalkeen=[dict(armeija='cao-cao', t0=0.55, t1=0.80, miehia=90000, arvio=True, visuaalinen=True,
                      reitti=[dict(t=0.62, lon=112.90, lat=29.80, paikka='Huarongin tie'), dict(t=0.72, lon=112.20, lat=30.35, paikka='Jiangling'),
                              dict(t=0.80, lon=112.15, lat=32.02, paikka='Xiangyang')],
                      huom='Häviäjä valuu takaisin pinnaksi; tappiot (tulipalo, tauti, nälkä, pakomatka) madaltavat pintaa. Tappioista EI ole '
                           'lähteissä lukua: miehia on vain kuvan mittasuhde, ei esitetä lukuna.'),
                 dict(armeija='sun-liu', t0=0.55, t1=0.85, miehia=42000, arvio=True, visuaalinen=True,
                      reitti=[dict(t=0.70, lon=112.20, lat=30.35, paikka='Jiangling (piiritys)')],
                      huom='Voittajat etenevät Jianglingiin; joukot palaavat pinnaksi hitaasti.')],
        toipuminen=dict(t0=0.80, t1=1.0, huom='Maa toipuu hitaasti: keräysalueiden painuma palautuu, tappiot jäävät pois.'),
    ),
    -260: dict(
        nimi='Changping', vuosi=-260, rajat_vuosi=-221,
        huom='Omistusvärit linssin pysäkiltä -221 (Qin on yhdistänyt Kiinan). Taistelupaikka Changping (Gaoping, Shanxi) ~20 km epävarma. '
             'Shiji ei anna kummankaan armeijan vahvuutta: luvut ovat Wikipedian arvioita tai Shijin tappiolukujen johdannaisia '
             '(kiistelty).',
        armeijat=[
            dict(avain='qin-armeija', nimi='Qin (Wang He, sitten Bai Qi)', dynastia='qin', miehia=550000, miehia_vali=[250000, 600000],
                 arvio=True,
                 huom='Shiji ei anna vahvuutta. 550 000 = Wikipedia (en), ~600 000 zh-wiki; Li Zefen (1979) pitää lukuja liioiteltuina. '
                      'Alaraja 250 000 on mallinnusrajaus. Shiji: Qinin sotilaista kuoli "yli puolet". Henein kutsunta (yli 15-v) tuli '
                      'myöhään.',
                 keraus=[dict(lon=108.9, lat=34.4, sade_km=160, osuus=0.40), dict(lon=111.2, lat=35.1, sade_km=90, osuus=0.15),
                         dict(lon=113.0, lat=35.1, sade_km=70, osuus=0.20), dict(lon=105.5, lat=34.6, sade_km=150, osuus=0.15),
                         dict(lon=104.1, lat=30.7, sade_km=120, osuus=0.10)],
                 reitti=[dict(t=0.10, lon=108.72, lat=34.33, paikka='Xianyang'), dict(t=0.22, lon=110.87, lat=34.52, paikka='Hangu-sola'),
                         dict(t=0.30, lon=111.20, lat=35.15, paikka='Anyi (Hedong)'),
                         dict(t=0.38, lon=112.93, lat=35.09, paikka='Yewang (Henei)'),
                         dict(t=0.44, lon=112.85, lat=35.49, paikka='Taihang-tie'),
                         dict(t=0.48, lon=112.92, lat=35.75, paikka='Gaoping / Dan-joen itäranta (leiri)')]),
            dict(avain='zhao-armeija', nimi='Zhao (Lian Po, sitten Zhao '
                 'Kuo)', dynastia='zhao', miehia=450000, miehia_vali=[150000, 450000],
                 arvio=True,
                 huom='450 000 on nimellisluku: Shijin tappiosumma (450 000) ja 400 000 antautunutta; Shiji ei anna vahvuutta (kiistelty: '
                      'Bodde, '
                      'Lewis). Alaraja 150 000 on mallinnusrajaus. Keräysosuudet ovat arvioita; Shangdangin Han-varuskunta ~50 000 '
                      '(zh-wiki).',
                 keraus=[dict(lon=114.5, lat=36.6, sade_km=110, osuus=0.40), dict(lon=115.0, lat=38.0, sade_km=140, osuus=0.20),
                         dict(lon=112.5, lat=37.9, sade_km=100, osuus=0.20), dict(lon=113.1, lat=36.2, sade_km=60, osuus=0.12),
                         dict(lon=113.3, lat=39.8, sade_km=120, osuus=0.08)],
                 reitti=[dict(t=0.10, lon=114.48, lat=36.60, paikka='Handan'),
                     dict(t=0.24, lon=113.68, lat=36.57, paikka='Shexian / Gu-sola'),
                         dict(t=0.34, lon=113.12, lat=36.20, paikka='Shangdang (Changzhi)'),
                         dict(t=0.42, lon=112.95, lat=35.95, paikka='Dan-joen länsipuoli (Lian Pon linja)'),
                         dict(t=0.48, lon=112.92, lat=35.80, paikka='Changping (leiri)')]),
        ],
        lyonnit=[dict(t=0.55, lon=112.92, lat=35.80, voittaja='qin-armeija', havio='zhao-armeija', voima=1.0,
                      huom='Syys 260 eaa: Zhao Kuo ylittää Dan-joen, Bai Qi katkaisee takaosan (25 000) ja ratsut (5 000); saarto 46 '
                           'päivää, '
                           'Zhao Kuo kaatuu. Ensi yhteenotto (Gaopingin sola, 262 eaa) jätetty pois. Tappioluvut kiisteltyjä.')],
        jalkeen=[dict(armeija='zhao-armeija', t0=0.55, t1=0.80, miehia=240, arvio=True, visuaalinen=True,
                      reitti=[dict(t=0.55, lon=112.92, lat=35.80, paikka='Changping'),
                              dict(t=0.80, lon=112.89, lat=35.87, paikka='Yonglun kuoppa')],
                      huom='Shijin mukaan 400 000 antautui ja kaikki paitsi 240 nuorinta surmattiin (kiistelty; Yonglun kuoppa 1 todistaa '
                           'surmat, ei lukua). Ne 240 vapautettiin Zhaoon. Pinta ei palaa täyteen: miehia on vain kuvan mittasuhde.'),
                 dict(armeija='qin-armeija', t0=0.58, t1=0.85, miehia=250000, arvio=True, visuaalinen=True,
                      reitti=[dict(t=0.58, lon=112.92, lat=35.80, paikka='Changping'),
                              dict(t=0.72, lon=113.12, lat=36.20, paikka='Shangdang'),
                              dict(t=0.85, lon=114.48, lat=36.60, paikka='Handan (piiritys 259 eaa)')],
                      huom='Tauko talvella, Handanin hyökkäys alkaa heinäkuussa 259 eaa ja epäonnistuu (257 eaa). 250 000 on Wikipedian '
                           'johdettu arvio ("yli puolet kuoli", Shiji); ei tappioluku vaan kuvan mittasuhde.')],
        toipuminen=dict(t0=0.80, t1=1.0,
                        huom='Qin toipuu vuosikymmenessä ja yhdistää Kiinan 221 eaa. Zhaon miesvara ei toipunut täysin: Zhaon '
                             'keräysalueet '
                             'jäävät alemmas. Visuaalinen arvio.'),
        lahteet='Shiji 73, 81, 5 (Wikisource); Wikipedia: Battle of Changping, Bai Qi, Battle of Handan; zh-wiki 长平之战. '
                'Kaikki luvut arvioita.',
    ),
    383: dict(
        nimi='Fei-joki', vuosi=383, rajat_vuosi=440,
        huom='Omistusvärit linssin pysäkiltä 440 (Jin ja Entinen Qin ovat jo kadonneet, rajat eivät vastaa vuotta 383). Fein uoma on '
             'kadonnut (arvio Shouxian / Lu\'an). Perinneluvut (870 000 vs 80 000) ovat liioiteltuja; luvut ovat visuaalisia arvioita.',
        armeijat=[
            dict(avain='fu-rong-etujoukko', nimi='Fu Rongin etujoukko (Entinen Qin)', dynastia='entinen-qin', miehia=250000,
                 miehia_vali=[100000, 300000], arvio=True,
                 huom='250 000 lähtiessä (ZZTJ, Jin shu), 300 000 toisaalla. Alaraja 100 000: tutkijoiden (Diefenbach 2012) mukaan '
                      'mittakaava liioiteltu. Murong Chuin joukot sisältyvät (ei erillistä armeijaa).',
                 keraus=[dict(lon=108.95, lat=34.27, sade_km=160, osuus=0.55), dict(lon=112.45, lat=34.65, sade_km=140, osuus=0.20),
                         dict(lon=114.40, lat=36.30, sade_km=200, osuus=0.25)],
                 reitti=[dict(t=0.10, lon=108.95, lat=34.27, paikka="Chang'an"), dict(t=0.22, lon=112.45, lat=34.65, paikka='Luoyang'),
                         dict(t=0.33, lon=114.30, lat=33.80, paikka='Yingchuan-seutu'),
                         dict(t=0.42, lon=116.20, lat=32.65, paikka='Yingkou (±30 km)'),
                         dict(t=0.46, lon=116.78, lat=32.58, paikka='Shouyang / Shouchun')]),
            dict(avain='fu-jian-paajoukko', nimi='Fu Jianin pääjoukko (Entinen Qin)', dynastia='entinen-qin', miehia=200000,
                 miehia_vali=[50000, 600000], arvio=True,
                 huom='Perinne 600 000 jalka + 270 000 ratsu koko Qinille (kiistelty). 200 000 on visuaalinen valinta, EI lähdettä. '
                      'Fu Jian jätti pääjoukon Xiangchengiin ja kävi Shouyangissa ~8 000 ratsulla; Liangzhoun ja Sichuanin joukot '
                      'myöhästyivät.',
                 keraus=[dict(lon=108.95, lat=34.27, sade_km=170, osuus=0.50), dict(lon=112.45, lat=34.65, sade_km=140, osuus=0.20),
                         dict(lon=114.40, lat=36.30, sade_km=200, osuus=0.25), dict(lon=102.64, lat=37.93, sade_km=250, osuus=0.05)],
                 reitti=[dict(t=0.12, lon=108.95, lat=34.27, paikka="Chang'an"), dict(t=0.22, lon=112.45, lat=34.65, paikka='Luoyang'),
                         dict(t=0.38, lon=114.90, lat=33.45, paikka='Xiangcheng (±30 km)'),
                         dict(t=0.50, lon=116.78, lat=32.58, paikka='Shouyang')]),
            dict(avain='xie-beifu', nimi='Xie Shin ja Xie Xuanin Jin-armeija (Beifu)', dynastia='jin', miehia=80000,
                 miehia_vali=[8000, 80000], arvio=True,
                 huom='Perinne ~80 000 (ZZTJ 105, Jin shu). Alaraja 8 000: vain valiojoukko ylitti Fein (zh-wiki). Beifu koottiin '
                      'Jingkoun '
                      'ja Guangling alueella; Liu Laozhi johti 5 000:n valioiskua Luojianissa. Keräysosuudet arvioita.',
                 keraus=[dict(lon=119.45, lat=32.20, sade_km=45, osuus=0.40), dict(lon=119.40, lat=32.40, sade_km=50, osuus=0.35),
                         dict(lon=118.78, lat=32.05, sade_km=70, osuus=0.25)],
                 reitti=[dict(t=0.12, lon=118.78, lat=32.05, paikka='Jiankang'), dict(t=0.20, lon=119.40, lat=32.40, paikka='Guangling'),
                         dict(t=0.28, lon=119.02, lat=33.55, paikka='Huaiyin'),
                         dict(t=0.37, lon=117.55, lat=32.87, paikka='Huai-virta (reitti tulkittu)'),
                         dict(t=0.44, lon=117.00, lat=32.65, paikka='Luojian (±25 km)'),
                         dict(t=0.49, lon=116.90, lat=32.60, paikka='leiri Fein lähellä')]),
        ],
        lyonnit=[dict(t=0.52, lon=117.00, lat=32.65, voittaja='xie-beifu', havio='fu-rong-etujoukko', voima=0.35,
                      huom='Luojian: Liu Laozhi ~5 000 vs Liang Cheng ~50 000; Qinin tappio ~15 000 (ZZTJ, kiistelty). Ajoitus epävarma.'),
                 dict(t=0.57, lon=116.78, lat=32.58, voittaja='xie-beifu', havio='fu-rong-etujoukko', voima=1.0,
                      huom='Fei-joki (arvio): Qinin peräytyminen muuttui paoksi, Fu Rong kaatui. Mittakaava ja tappiot kiisteltyjä (870 '
                           '000 liioiteltu).'),
                 dict(t=0.58, lon=116.78, lat=32.58, voittaja='xie-beifu', havio='fu-jian-paajoukko', voima=0.7,
                      huom='Pääjoukko hajoaa etujoukon romahtaessa; Fu Jian haavoittui nuoleen. Luku ja kulku arvioita.')],
        jalkeen=[dict(armeija='fu-rong-etujoukko', t0=0.57, t1=0.80, miehia=100000, arvio=True, visuaalinen=True,
                      reitti=[dict(t=0.57, lon=116.78, lat=32.58, paikka='Fei-joki'),
                          dict(t=0.60, lon=116.60, lat=32.90, paikka='Qinggang'),
                              dict(t=0.68, lon=115.80, lat=33.40, paikka='Huai-joen pohjoispuoli'),
                              dict(t=0.80, lon=112.45, lat=34.65, paikka='Luoyang')],
                      huom='ZZTJ: "yli 100 000" kerääntyi Luoyangiin, Murong Chuin 30 000 ehjänä. Kuvan mittasuhde, ei tappioluku '
                           '(kiistelty).'),
                 dict(armeija='fu-jian-paajoukko', t0=0.57, t1=0.85, miehia=50000, arvio=True, visuaalinen=True,
                      reitti=[dict(t=0.57, lon=116.78, lat=32.58, paikka='Shouyang'),
                          dict(t=0.70, lon=114.90, lat=33.45, paikka='Xiangcheng'),
                              dict(t=0.80, lon=112.45, lat=34.65, paikka='Luoyang'),
                              dict(t=0.85, lon=108.95, lat=34.27, paikka="Chang'an (paluu, ei vahvistettu)")],
                      huom="Paluu Chang'aniin on vahvistamaton. Murong Chui kapinoi 384, Chang'an kaatui 385. Kuvan mittasuhde, ei "
                           "tappioluku."),
                 dict(armeija='xie-beifu', t0=0.57, t1=0.75, miehia=80000, arvio=True, visuaalinen=True,
                      reitti=[dict(t=0.57, lon=116.78, lat=32.58, paikka='Fei (voitto)'),
                          dict(t=0.60, lon=116.60, lat=32.90, paikka='Qinggang'),
                              dict(t=0.65, lon=116.78, lat=32.58, paikka='Shouyang'),
                              dict(t=0.75, lon=117.20, lat=34.27, paikka='Pengcheng-suunta (384; tulkinta)')],
                      huom='Jin työnsi Keltaisen joen eteläpuolelle (en-wiki). 384:n liikkeet tulkintaa; lyhyt työntyminen pohjoiseen, '
                           'sitten hajoaminen.')],
        toipuminen=dict(t0=0.80, t1=1.0,
                        huom='Väestövaikutuksesta ei ole lukuja. Lähteet kertovat vain Qinin hajoamisesta 384-385. Huai-alue ja '
                             'Pohjois-Kiinan '
                             'keräysalueet palaavat pinnaksi visuaalisesti.'),
        lahteet='Zizhi Tongjian 104-105, Jin shu 114 (Wikisource); Wikipedia: Battle of Fei River, Former Qin; Diefenbach 2012 (ZDMG '
             '162/2) '
                'tiivistelmä. Kaikki luvut arvioita.',
    ),
    1279: dict(
        nimi='Yamen', vuosi=1279, rajat_vuosi=1280,
        huom='Omistusvärit linssin pysäkiltä 1280 (Yuan hallitsee jo Etelä-Kiinaa). Taistelu 19.3.1279. Songin 200 000 sisältää hovin ja '
             'siviilit (kiistelty, ei primäärilähdettä); Yuanin vahvuus on huonoiten tunnettu. Kaikki luvut arvioita.',
        armeijat=[
            dict(avain='yuan-zhang', nimi='Yuanin laivasto (Zhang Hongfan)', dynastia='mongol', miehia=20000, miehia_vali=[20000, 35000],
                 arvio=True,
                 huom='Yuan shi 156: valitut upseerit ja ~20 000 miestä (lähtöjoukko, ei varmasti koko voima). Keräysosuudet ovat '
                      'päätelmiä; '
                      'WP-zh antaa 70 000+ (kiistelty).',
                 keraus=[dict(lon=115.0, lat=38.5, sade_km=250, osuus=0.30), dict(lon=119.4, lat=32.4, sade_km=200, osuus=0.45),
                         dict(lon=118.0, lat=25.0, sade_km=180, osuus=0.25)],
                 reitti=[dict(t=0.10, lon=119.42, lat=32.39, paikka='Yangzhou (1278)'),
                         dict(t=0.25, lon=117.65, lat=24.51, paikka='Zhangzhou'),
                         dict(t=0.40, lon=115.33, lat=22.99, paikka='Wupo-harju (Wen Tianxiang vangitaan joulukuu 1278)'),
                         dict(t=0.45, lon=116.60, lat=23.26, paikka='Chaoyang-satama'),
                         dict(t=0.46, lon=115.83, lat=22.76, paikka='Jiazimen'),
                         dict(t=0.48, lon=113.08, lat=22.27, paikka='Yashan (saapuu n. 27.2.1279)')]),
            dict(avain='yuan-li-heng', nimi='Li Hengin joukot (Yuan)', dynastia='mongol', miehia=20000, miehia_vali=[5000, 35000],
                 arvio=True,
                 huom='Yuan shi 129 ei anna joukkolukua (200 000 oli 1277 antautuneita, ei armeija). Luku on vaihteluvälin keskiarvo, '
                      'ei lähde. Keräysosuudet arvioita.',
                 keraus=[dict(lon=115.9, lat=28.7, sade_km=200, osuus=0.55), dict(lon=113.3, lat=23.4, sade_km=120, osuus=0.30),
                         dict(lon=105.0, lat=38.0, sade_km=400, osuus=0.15)],
                 reitti=[dict(t=0.10, lon=116.0, lat=29.7, paikka='Jiangzhou (Jiujiang)'),
                     dict(t=0.14, lon=114.93, lat=25.83, paikka='Ganzhou'),
                         dict(t=0.26, lon=113.40, lat=24.18, paikka='Yingde / Qingyuan'),
                         dict(t=0.44, lon=113.26, lat=23.13, paikka='Guangzhou (valtaus talvella 1278-79)'),
                         dict(t=0.48, lon=113.08, lat=22.27, paikka='Yashan (liittyy n. 7-11.3.1279)')]),
            dict(avain='song-laivasto', nimi='Songin laivasto (Zhang Shijie)', dynastia='song', miehia=50000, miehia_vali=[20000, 100000],
                 arvio=True,
                 huom='Song shi 451: sotilaita "muutama kymmenentuhatta"; alukset "yli tuhat" (kiistelty). Keräysosuudet ovat päätelmiä.',
                 keraus=[dict(lon=119.0, lat=26.0, sade_km=180, osuus=0.40), dict(lon=114.0, lat=22.9, sade_km=200, osuus=0.40),
                         dict(lon=120.2, lat=30.2, sade_km=150, osuus=0.20)],
                 reitti=_SONG_REITTI),
            dict(avain='song-hovi', nimi='Songin hovi ja siviilit', dynastia='song', miehia=150000, miehia_vali=[50000, 180000],
                 arvio=True, siviili=True,
                 huom='KIISTELTY: koko joukko "noin 200 000" (WP-en/zh, ei primäärilähdettä); tässä kokonaisluku miinus taistelijat. '
                      'Valtaosa virkamiehiä, perheitä ja palvelijoita.',
                 keraus=[dict(lon=120.2, lat=30.2, sade_km=150, osuus=0.30), dict(lon=118.8, lat=25.5, sade_km=180, osuus=0.30),
                         dict(lon=114.0, lat=22.9, sade_km=200, osuus=0.30), dict(lon=110.5, lat=21.5, sade_km=150, osuus=0.10)],
                 reitti=_SONG_REITTI),
        ],
        lyonnit=[dict(t=0.55, lon=113.08, lat=22.27, voittaja='yuan-zhang', havio='song-laivasto', voima=1.0,
                      huom='19.3.1279: Yuan katkaisi veden ja polttopuun, hyökkäsi ryhmissä (Zhang etelästä, Li Heng pohjoisesta, SS47). '
                           'Ketjutettu Song-linnake murtui. Kulku tiivistelmä (YS129 ja YS156 eroavat).'),
                 dict(t=0.56, lon=113.08, lat=22.27, voittaja='yuan-li-heng', havio='song-hovi', voima=0.8,
                      huom='Hovin alukset ja siviilit murskautuvat linnakkeen mukana. Keisari Bing hukkui Lu Xiufun sylissä. Luvut '
                           'kiisteltyjä.')],
        jalkeen=[dict(armeija='song-hovi', t0=0.55, t1=0.80, miehia=100000, arvio=True, visuaalinen=True,
                      reitti=[dict(t=0.55, lon=113.08, lat=22.27, paikka='Yashan'),
                              dict(t=0.80, lon=113.08, lat=22.27, paikka='pinta palautuu Guangdongin väestöön')],
                      huom='Song shi 47: "yli 100 000 ruumista" kellui (kiistelty, pyöreä luku). Visuaalinen mittasuhde, EI tappioluku.'),
                 dict(armeija='song-laivasto', t0=0.55, t1=0.78, miehia=1000, arvio=True, visuaalinen=True,
                      reitti=[dict(t=0.55, lon=113.08, lat=22.27, paikka='Yashan (Zhang Shijie katkaisee ankkurit)'),
                              dict(t=0.70, lon=112.2, lat=21.6, paikka='avomeri'),
                              dict(t=0.78, lon=111.82, lat=21.60, paikka='Hailing-saari (Zhang Shijie hukkuu; heikko)')],
                      huom='Song shi 451: pakeni yli kymmenellä aluksella, myrsky. Paikka ja päivä epävarmoja.'),
                 dict(armeija='yuan-zhang', t0=0.55, t1=0.80, miehia=20000, arvio=True, visuaalinen=True,
                      reitti=[dict(t=0.55, lon=113.08, lat=22.27, paikka='Yashan'),
                              dict(t=0.80, lon=113.26, lat=23.13, paikka='Guangzhou (oletus)')],
                      huom='Lähde ei kerro Yuan-joukkojen paluureittiä; oletus. Zhang Hongfan kuoli 1280.'),
                 dict(armeija='yuan-li-heng', t0=0.55, t1=0.80, miehia=20000, arvio=True, visuaalinen=True,
                      reitti=[dict(t=0.55, lon=113.08, lat=22.27, paikka='Yashan'),
                              dict(t=0.80, lon=113.26, lat=23.13, paikka='Guangzhou (oletus)')],
                      huom='Lähde ei kerro Li Hengin joukkojen jatkoa; oletus.')],
        toipuminen=dict(t0=0.80, t1=1.0,
                        huom='Song shi ja Yuan shi eivät anna väestölukuja. Pinta palautuu vain visuaalisesti; alueen väestömuutokselle '
                             'ei ole '
                             'lähdetukea.'),
        lahteet='Song shi 47, 451; Yuan shi 129, 156 (Wikisource); Wikipedia: Battle of Yamen, Mongol conquest of the Song dynasty. '
                'Kaikki luvut arvioita.',
    ),
    1644: dict(
        nimi='Shanhain sola', vuosi=1644, rajat_vuosi=1644,
        huom='Taistelu 27.5.1644. Armeijoiden koot kiisteltyjä (Qing-kronikoiden 200 000 on propagandaa). Wu Sangui on Ming-kenraali '
             'taisteluun asti ja siirtyy Qingin puolelle sen jälkeen. Tappioita ei tiedetä; luvut ovat arvioita.',
        armeijat=[
            dict(avain='li-zicheng', nimi='Li Zicheng (Shun)', dynastia='shun', miehia=80000, miehia_vali=[60000, 100000], arvio=True,
                 huom='60 000 yleisin luku (Wakeman Wikipedian kautta), vaihteluväli 60 000-100 000. Qing shi gaon 200 000 on '
                      'propagandaa; '
                      '"300 000" koskee koko kevään marssia.',
                 keraus=[dict(lon=108.95, lat=34.27, sade_km=250, osuus=0.45), dict(lon=112.55, lat=37.87, sade_km=200, osuus=0.25),
                         dict(lon=116.40, lat=39.90, sade_km=120, osuus=0.30)],
                 reitti=[dict(t=0.00, lon=108.95, lat=34.27, paikka="Xi'an (Shunin julistus 8.2.1644)"),
                         dict(t=0.09, lon=111.52, lat=36.09, paikka='Pingyang'), dict(t=0.18, lon=112.55, lat=37.87, paikka='Taiyuan'),
                         dict(t=0.24, lon=113.30, lat=40.09, paikka='Datong'), dict(t=0.29, lon=115.04, lat=40.60, paikka='Xuanfu'),
                         dict(t=0.33, lon=116.08, lat=40.28, paikka='Juyongguan'), dict(t=0.34, lon=116.23, lat=40.22, paikka='Changping'),
                         dict(t=0.35, lon=116.40, lat=39.90, paikka='Peking (24.4.)'),
                         dict(t=0.46, lon=116.40, lat=39.90, paikka='Peking (lähtö 18.5.)'),
                         dict(t=0.47, lon=116.66, lat=39.91, paikka='Tongzhou'),
                         dict(t=0.48, lon=118.16, lat=39.83, paikka='Fengrun'), dict(t=0.49, lon=118.88, lat=39.89, paikka='Yongping'),
                         dict(t=0.50, lon=119.68, lat=39.97, paikka='Sha-joki (leiri solan länsipuolella)')]),
            dict(avain='wu-sangui', nimi='Wu Sangui (Ming-kenraali)', dynastia='ming', miehia=50000, miehia_vali=[40000, 100000],
                 arvio=True,
                 huom='Vakituisia n. 40 000-50 000; 100 000 sisältää miliisin ja Liaodongin asukkaat, eivät taistelijoita. '
                      'Keräysosuudet arvioita. Siirtyy Qingin puolelle taistelun jälkeen.',
                 keraus=[dict(lon=120.72, lat=40.61, sade_km=100, osuus=0.60), dict(lon=121.13, lat=41.10, sade_km=90, osuus=0.20),
                         dict(lon=119.40, lat=39.90, sade_km=70, osuus=0.20)],
                 reitti=[dict(t=0.27, lon=120.72, lat=40.61, paikka='Ningyuan'),
                     dict(t=0.31, lon=119.77, lat=40.00, paikka='Shanhain sola'),
                         dict(t=0.36, lon=118.16, lat=39.83, paikka='Fengrun'),
                         dict(t=0.38, lon=119.77, lat=40.00, paikka='Shanhain sola'),
                         dict(t=0.43, lon=118.88, lat=39.89, paikka='Yongping'),
                         dict(t=0.46, lon=119.77, lat=40.00, paikka='Shanhain sola'),
                         dict(t=0.50, lon=119.77, lat=39.99, paikka='Shanhain sola (odottaa Qingiä)')]),
            dict(avain='dorgon', nimi='Dorgon (Qing, kahdeksan lippukuntaa)', dynastia='qing', miehia=80000, miehia_vali=[60000, 100000],
                 arvio=True,
                 huom='Qing shi gao ei anna lukua; Wikipedia 60 000, muut 90 000-100 000. Lippukuntien osuudet ja keräysosuudet ovat '
                      'arvioita, eivät lähteestä. Marssi Shengjingistä 14.5.-27.5.',
                 keraus=[dict(lon=123.43, lat=41.80, sade_km=180, osuus=0.60), dict(lon=123.17, lat=41.27, sade_km=100, osuus=0.20),
                         dict(lon=122.30, lat=43.60, sade_km=250, osuus=0.20)],
                 reitti=[dict(t=0.44, lon=123.43, lat=41.80, paikka='Shengjing (Shenyang)'),
                         dict(t=0.46, lon=122.00, lat=41.80, paikka='Wenghou (Liao-joen ylitys; ±40 km)'),
                         dict(t=0.47, lon=121.50, lat=41.40, paikka='Xilatala (±50 km)'),
                         dict(t=0.48, lon=120.86, lat=40.76, paikka='Lianshan'),
                         dict(t=0.49, lon=120.30, lat=40.35, paikka='Shahe-asema (±30 km)'),
                         dict(t=0.50, lon=119.80, lat=40.00, paikka='Shanhain sola')]),
        ],
        lyonnit=[dict(t=0.45, lon=119.30, lat=39.90, voittaja='wu-sangui', havio='li-zicheng', voima=0.3,
                      huom='5.-10.5.: Wu Sangui voittaa Li:n lähettämän Tang Tongin joukot Yongpingin tienoilla. Pieni selkkaus.'),
                 dict(t=0.53, lon=119.97, lat=40.10, voittaja='dorgon', havio='li-zicheng', voima=0.3,
                      huom='26.5.: Qing-ruhtinaat voittavat Tang Tongin Yipianshissa solan koillispuolella. Koordinaatti ±20 km.'),
                 dict(t=0.55, lon=119.77, lat=39.98, voittaja='dorgon', havio='li-zicheng', voima=1.0,
                      huom='27.5.1644: Wu pidättelee, hiekkamyrsky, Qing-ratsuväki iskee Li:n vasempaan sivustaan ja Shun-rintama '
                           'romahtaa '
                           '(Wu Sangui taistelee Qingin rinnalla). Tappioita ei tiedetä.')],
        jalkeen=[dict(armeija='li-zicheng', t0=0.55, t1=0.85, miehia=40000, arvio=True, visuaalinen=True,
                      reitti=[dict(t=0.55, lon=119.77, lat=39.98, paikka='Shanhain sola'),
                          dict(t=0.57, lon=118.88, lat=39.89, paikka='Yongping'),
                              dict(t=0.60, lon=116.40, lat=39.90, paikka='Peking (kruunaus 3.6., pako 4.6.)'),
                              dict(t=0.64, lon=115.00, lat=38.78, paikka='Qingdu'),
                              dict(t=0.68, lon=114.57, lat=38.15, paikka='Zhengding'),
                              dict(t=0.72, lon=113.80, lat=37.85, paikka='Guguan (±20 km)'),
                              dict(t=0.76, lon=112.55, lat=37.87, paikka='Taiyuan'),
                              dict(t=0.80, lon=111.52, lat=36.09, paikka='Pingyang'),
                              dict(t=0.85, lon=108.95, lat=34.27, paikka="Xi'an (ajoitus arvio)")],
                      huom='40 000 on VISUAALINEN paikkamerkki (selvinneiden osuus), ei lähde eikä tappioluku. Tappioita ei tiedetä.'),
                 dict(armeija='wu-sangui', t0=0.55, t1=0.62, miehia=50000, arvio=True, visuaalinen=True,
                      reitti=[dict(t=0.55, lon=119.77, lat=39.98, paikka='Shanhain sola'),
                          dict(t=0.56, lon=118.88, lat=39.89, paikka='Yongping'),
                              dict(t=0.58, lon=118.16, lat=39.83, paikka='Fengrun'),
                              dict(t=0.62, lon=116.66, lat=39.91, paikka='Tongzhou')],
                      huom='Wu Sangui siirtyy Qingin puolelle (hiukset ajeltiin 28.5.); joukot liittyvät Qingin pääarmeijaan. Qing shi '
                           'gao: '
                           '10 000 ratsua + 10 000 jalkaa Li:n takaa-ajoon. Tässä koko joukko, ei tappiota.'),
                 dict(armeija='dorgon', t0=0.55, t1=0.65, miehia=80000, arvio=True, visuaalinen=True,
                      reitti=[dict(t=0.55, lon=119.77, lat=39.98, paikka='Shanhain sola'),
                              dict(t=0.57, lon=118.50, lat=39.80, paikka='Xinhe-asema (±40 km)'),
                              dict(t=0.60, lon=116.66, lat=39.91, paikka='Tongzhou (5.6.)'),
                              dict(t=0.62, lon=116.40, lat=39.90, paikka='Peking (6.6.)')],
                      huom='Qingin pääarmeija etenee Pekingiin. Pieni takaa-ajoryhmä (Ajige, Tan Tai, Zhunta; noin 15 000, ei lähdettä) '
                           'jatkaa länteen Qingduun ja Zhengdingiin; tässä yhdistetty yhdeksi vaiheeksi.')],
        toipuminen=dict(t0=0.80, t1=1.0,
                        huom='Pohjois-Kiinan pinta toipuu: Qing hallitsee Pekingiä. Li:n valta romahtaa vasta 1645. Väestön lasku johtuu '
                             'osin '
                             'aiemmista sodista ja nälänhädästä, ei yksin tästä taistelusta.'),
        lahteet='Qing shi gao 218, 474; Ming shi 309 (Wikisource); Wikipedia: Battle of Shanhai Pass, Chronology of the Shunzhi reign; '
                'Wakeman 1985 Wikipedian kautta. Kaikki luvut arvioita.',
    ),
}

LAHTEET = ('Armeijoiden koot: Sisältökirjurin tietopohja docs/kohtaukset/kiinan-dynastiat/punaiset-kalliot-luvut.md (96692a25f; '
           'Sanguozhi, de Crespigny Wikipedian kautta); reitit tunnetuista paikoista (kerrokset_data.py). Kaikki luvut arvioita '
           '(pelissä "noin"); jälkeen-luvut ovat kuvan mittasuhteita, eivät tappiolukuja. Taistelut -260, 383, 1279 ja 1644: '
           'taistelukohtaiset lähteet kunkin hetken lahteet-kentässä (vaestopinta-19/taistelut/*.md).')


# --- VÄESTÖ 19 PYSÄKILLE (KS 17.10.2026, omistaja 11.32: kaikki dynastiat; Sonnet-agentin tarkistus vaesto-alueittain.md) ---------
# Korvaa vaestopinta.py:ssä kerrokset_data.VAESTO/OSUUDET (väestöpisteiden kerros käyttää edelleen vanhoja). Ydin = VAESTO − sisältyvät reunat.
# Lähteet: Hanshu/Hou Hanshu, Sui shu, Song shi, Yuan shi, Ming shi ja Qingin laskennat Wikipedian (Demographic history of China) kautta;
# Cao Shuji, Ge Jianxiong, Durand, McEvedy & Jones Wikipedian kautta. Kaikki luvut arvioita.
VAESTO = [(-221, 25, True, 'han_l', 'Qin: 20–45 milj., heikko'), (-200, 18, True, 'han_l', 'Han-alku 15–18'),
          (-100, 35, True, 'han_l', 'Wudi, 32–37'), (140, 55, True, 'han_i', 'Hou Hanshu 140: 49,2 (rekisteri); arvio 55'),
          (250, 25, True, 'jako', ''), (440, 30, True, 'jako2', ''), (500, 38, True, 'jako2', ''),
          (589, 40, True, 'sui', 'Kaihuang 9: ~7 milj. kotitaloutta; Suin laskenta 609: 46,0'),
          (669, 50, True, 'tang', 'rekisteri 652–705 aliarvioi'), (790, 55, True, 'tang2', 'An Lushanin jälkeen'),
          (950, 45, True, 'song', ''), (1100, 100, True, 'song_p', 'Song shi 1100: 19,96 milj. kotitaloutta; arvio 100–123'),
          (1142, 90, True, 'song', ''), (1280, 75, True, 'yuan', 'Yuanin rekisteri 1290: 58,8; arvio 75'),
          (1421, 80, True, 'ming', 'Mingin rekisteri 1393: 60,5; arvio 65–90'),
          (1644, 150, True, 'qing_a', 'Cao Shuji 152,5'), (1760, 200, False, 'qing_b', 'Qingin laskenta 1762: 200,5'),
          (1873, 360, True, 'qing_c', 'Taipingin ja dunganin kapinan jälkeen'),
          (1912, 420, True, 'qing_d', 'Tasavallan laskenta 1912: 411,6')]
OSUUDET = {   # järjestys kuten ALUEET; summa 1 (taulukko luvussa b)
    'han_l': (.10, .30, .165, .20, .06, .08, .035, .005, .045, .01), 'han_i': (.03, .28, .165, .19, .025, .09, .095, .04, .065, .02),
    'jako': (.06, .20, .16, .14, .06, .10, .09, .05, .11, .03), 'jako2': (.07, .19, .17, .13, .08, .08, .08, .04, .12, .04),
    'sui': (.08, .21, .19, .15, .09, .06, .05, .03, .10, .04), 'tang': (.09, .17, .16, .12, .06, .09, .07, .05, .13, .06),
    'tang2': (.05, .11, .13, .10, .05, .11, .10, .08, .18, .09), 'song': (.03, .10, .08, .08, .05, .08, .12, .15, .20, .11),
    'song_p': (.05, .13, .09, .09, .06, .09, .10, .10, .19, .10), 'yuan': (.03, .07, .07, .06, .04, .035, .125, .16, .275, .135),
    'ming': (.04, .09, .07, .09, .07, .045, .10, .13, .28, .085), 'qing_a': (.045, .10, .09, .105, .06, .04, .15, .09, .21, .11),
    'qing_b': (.05, .105, .10, .11, .055, .06, .15, .085, .185, .10), 'qing_c': (.03, .125, .095, .12, .06, .125, .15, .07, .14, .085),
    'qing_d': (.035, .125, .10, .11, .05, .115, .145, .07, .155, .095),
}
REUNAT_LAHDE = 'arvio: Wikipedia (Population history of China, Han dynasty, Demographics of Taiwan, Manchuria), omat arviot; heikko luottamus'
_V = [-221, -200, -100, 140, 250, 440, 500, 589, 669, 790, 950, 1100, 1142, 1280, 1421, 1644, 1760, 1873, 1912]
def _d(*m): return dict(zip(_V, m))
REUNAT = [   # (nimi, lon, lat, hajonta_aste, {vuosi: milj.})   KAIKKI ARVIOITA
 ('Liaodong', 122.5, 41.2, 1.3, _d(.35,.30,.35,.80,.70,.80,.80,.60,.50,.50,1.0,1.6,1.5,.8,.9,.7,1.3,3.0,10.0)),
 ('Jilin–Heilongjiang', 126.5, 45.0, 2.8, _d(.2,.2,.2,.3,.3,.4,.5,.5,.5,1.0,1.2,1.8,2.0,1.0,.6,.8,1.2,2.5,8.0)),
 ('Yunnan–Guizhou', 104.5, 25.7, 2.2, _d(.8,.8,1.0,1.8,1.4,1.6,1.6,1.6,1.7,2.2,2.5,3.2,3.2,2.5,3.0,4.5,7.0,9.0,17.0)),
 ('Guangxi', 108.5, 23.6, 1.6, _d(.3,.3,.4,.7,.6,.7,.8,.8,1.0,1.1,1.3,2.0,2.0,1.5,2.0,3.0,5.0,7.5,9.0)),
 ('Gansu–Hexi–Ningxia–Qinghai', 102.8, 37.0, 2.6, _d(.3,.3,.6,.5,.5,.8,.8,.9,.7,.5,.7,1.8,1.8,1.0,1.2,2.0,5.0,6.0,7.0)),
 ('Ulko-Mongolia (aro)', 106.5, 47.0, 4.0, _d(1.0,1.4,1.4,.9,.6,.7,.7,.9,.9,1.0,.8,.8,.8,1.1,.7,.8,.7,.7,.65)),
 ('Sisä-Mongolia–Ordos', 110.5, 41.0, 2.4, _d(.5,.4,.7,.3,.3,.5,.5,.6,.5,.5,.6,.8,.8,.8,.5,.6,1.0,2.5,4.5)),
 ('Tiibet', 91.5, 30.5, 3.0, _d(.5,.5,.6,.6,.7,.8,.9,1.0,1.5,2.0,1.4,1.4,1.4,1.4,1.4,1.4,1.4,1.4,1.4)),
 ('Xinjiang–Tarim', 82.0, 40.8, 4.5, _d(.3,.3,.4,.5,.5,.5,.5,.6,.7,.7,.9,1.0,1.0,.8,.8,.9,.9,1.4,2.1)),
 ('Taiwan', 120.8, 23.7, 0.55, _d(*([.12] * 15 + [.15, .7, 2.2, 3.4]))),
]
# Alkaen mistä vuodesta reuna kuuluu kansalliseen VAESTO-lukuun (ydin = VAESTO − nämä); muut lisätään päälle.
REUNA_SISALTYY_VUODESTA = {'Liaodong': -221, 'Jilin–Heilongjiang': 1644, 'Yunnan–Guizhou': 1280, 'Guangxi': -221,
    'Gansu–Hexi–Ningxia–Qinghai': -221, 'Ulko-Mongolia (aro)': 9999, 'Sisä-Mongolia–Ordos': 1760,
    'Tiibet': 9999, 'Xinjiang–Tarim': 9999, 'Taiwan': 1760}
