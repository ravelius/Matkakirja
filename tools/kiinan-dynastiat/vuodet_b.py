"""Kiinan dynastiat: avainvuodet 589, 669, 790, 950 ja 1100 (CC0, Karttaseppä 16.10.2026).

Käsin piirretyt kärkilistat (lon, lat), ankkurit kommenteissa. Aiempi alue voittaa (piirra.py), joten myöhemmän
naapurin rajaa saa vetää yli. Cliopatria (CC BY 4.0) vain vertailukuvana, ei geometrian lähde.
"""
# Uudet värit: lämmin perhe kiinalaisille valtioille, vaihteleva kirkkaus vierekkäisille (suunnitelma luku 3).
VARIT = {
    'sui': '#c25a2c',            # Sui = Tangin kirkas punaoranssi
    'myohempi-han': '#9a3e2c',   # 950 pohjoinen dynastia, tumma
    'etelan-tang': '#d0925c',    # vaalea oranssi
    'wuyue': '#84473a',          # tumma ruskea (naapurina vain vaalea Eteläinen Tang)
    'chu': '#8c3f2e',            # tumma punaruskea
    'etelan-han': '#c0623e',     # keskisävy
    'myohempi-shu': '#cf9466',   # vaalea
    'jingnan': '#b07050',        # keskisävy
    # Aukkojen täyttö (PT 16.10. ilta): ulkoiset ja ei-kiinalaiset naapurit viileillä (omistaja 16.10. 20.35)
    'turkit': '#61808f',         # Itäturkit 589: siniharmaa
    'turkit-lansi': '#7f98a5',   # Länsiturkit 589: sama perhe vaaleampana
    'uiguurit': '#3f8a84',       # Uiguurien kaganaatti 790: sinivihreä (naapurina violetti Tiibet)
    'dali': '#5f8f6a',           # Nanzhao 790 ja Dali 950–1142: viileä salvianvihreä (bai-kansan valtio, ei Kiinaa)
}
KOTISEUDUT = {}
KAUPUNGIT = {
    'Daxing': (108.94, 34.34),  # Sui-pääkaupunki Daxing = myöhempi Tangin Chang'an
    'Ötüken': (101.5, 47.6),  # Itäturkkien pyhä Ötükenin metsä Hangain vuorilla (likimääräinen leiripaikka)
    'Ordu-Baliq': (102.66, 47.43),  # Uiguurien pääkaupunki Orhonin varrella (Karabalgasun)
    'Yangjumie': (100.16, 25.69),  # Nanzhaon pääkaupunki 779 alkaen ja Dalin pääkaupunki (nykyinen Dali)
    'Jiangling': (112.19, 30.35),  # Jingnan
    'Hangzhou': (120.16, 30.27),  # Wuyue (Xifu); sama paikka kuin Songin Lin'an
    'Jinling': (118.78, 32.06),  # Eteläinen Tang (nykyinen Nanjing)
    'Changsha': (112.94, 28.23),  # Chu
    'Xingwang': (113.26, 23.13),  # Eteläinen Han (nykyinen Guangzhou)
}

# Yhteiset viivat (lon, lat).
_ETELARANNIKKO = [  # Itä-Kiinan meri ja Etelä-Kiinan meri pohjoisesta etelään (sama kuin -100 ja 1142)
    (122.8, 37.4), (122.5, 34.5), (123.0, 30.5), (121.5, 26.5), (118.8, 23.3),  # Shandongin kärki, Taiwanin salmi
    (116.0, 21.3), (112.5, 20.4), (111.6, 18.0), (109.5, 17.6),  # Leizhou, Hainan
]
_HIMALAJA = [(97.5, 28.2), (95.5, 28.2), (92.0, 27.8), (89.5, 28.0), (88.0, 27.9), (86.0, 28.0), (83.5, 29.2),
             (80.5, 30.5), (79.2, 32.3)]  # idästä länteen, sama harjalinja kuin 1760
_VIETNAM_DALI = [  # 1142:n Song-raja: Đại Việt ja Dali (Yunnan jää ulos), idästä länteen ja pohjoiseen
    (108.3, 18.3), (108.0, 21.4), (107.0, 22.0), (106.6, 22.5), (105.6, 23.1),  # Mong Cai, Lạng Sơn
    (104.8, 24.4), (105.2, 26.4), (104.5, 28.0), (103.2, 28.5),  # Länsi-Guangxi, Guizhoun länsiosa, Jinsha
]
_XIA_ETELA = [  # Song/Jin–Xia-raja (rajat.py 1142) idästä länteen
    (110.4, 39.5), (110.3, 38.0), (109.0, 37.3), (107.5, 36.5), (106.4, 35.9), (105.2, 35.9), (103.8, 36.2),
]
_LIAO_KOILLINEN = [  # Liaon (ja 1142 Jinin) pohjois- ja itäreuna: muuri, Amur, Ussuri, Japaninmeri, Yalu
    (124.0, 50.6), (127.5, 50.2), (130.6, 48.6), (134.6, 48.4), (138.5, 47.5),
    (136.0, 44.5), (131.5, 42.6), (130.5, 42.3), (128.2, 42.0), (126.0, 41.2), (124.4, 40.0),
    (123.2, 38.5), (121.0, 38.3),  # Liaodongin kärjen ohi Bohaille
]
DALI = [  # Nanzhao (790) ja Dali (950, 1100, 1142): Yunnan; kiinalaiset ja Tiibet piirretään ensin ja voittavat
    (97.6, 28.0), (99.5, 27.8), (100.6, 27.9), (101.5, 28.4),  # Jinsha-joen mutka, Lijiang; Tiibet pohjoisessa
    (102.3, 28.8), (103.4, 28.4), (104.3, 27.3), (104.6, 26.0),  # Jianchang (Xichang), Wumeng, Qujing
    (104.5, 24.5), (104.0, 23.3), (103.0, 22.4),  # Itä-Yunnan; Punaisen joen yläjuoksu
    (102.0, 21.6), (101.0, 21.3), (100.0, 21.6), (99.0, 22.1),  # Xishuangbanna (Yinsheng)
    (98.4, 23.3), (97.6, 24.3), (97.3, 25.6), (97.6, 27.0),  # Lancang–Salween; Yongchang ja Irrawaddyn yläjuoksu
]

VUODET = {
    589: {
        'otsikko': '589', 'paakaupungit': ['Daxing', 'Ötüken'],
        'alueet': [
            ('Sui', 'sui', 'kiina', [  # Chen kukistui 589 alussa; Lingnan (rouva Xian) alistui saman vuoden lopulla
                (121.8, 42.6), (122.3, 41.6), (122.1, 40.9),  # Liao-joki: itäpuoli Goguryeolle
                (121.2, 40.3), (120.6, 38.7),  # Liaodonginlahti ja Bohain salmi (Liaodong ei Suille)
            ] + _ETELARANNIKKO + _VIETNAM_DALI[:5] + [  # Hainan mukana; Punaisen joen suisto Varhaisella Lýllä
                (104.8, 24.4), (105.2, 26.4), (104.4, 27.6),  # Guizhoun jimi-alueet, Wumeng
                (103.4, 27.4), (102.6, 26.6), (101.8, 27.2),  # Jinsha; Yuexi (Xichang) Suin komentokunta
                (101.9, 28.6), (102.3, 29.6), (102.6, 31.0),  # Yazhou, Min-joen yläjuoksu
                (102.8, 32.3), (103.0, 33.3), (102.7, 34.4),  # Songzhou, Dangchang
                (102.3, 35.4), (102.2, 36.4), (102.6, 37.1),  # Taozhou, Hezhou; Tuyuhun lännessä
                (101.6, 37.6), (100.5, 38.3), (98.5, 39.0), (96.5, 39.6), (94.5, 39.7), (93.0, 40.2),  # Qilianin juuri
                (93.6, 40.6), (95.8, 40.7), (98.4, 40.3), (99.8, 40.8),  # Yumen, Guazhou, Jiuquan
                (102.3, 39.6), (104.2, 39.4), (105.8, 39.5), (106.9, 40.6),  # Alxan aavikon reuna, Helan
                (108.2, 41.2), (110.5, 41.0), (111.5, 40.4),  # Keltaisen joen mutka: Fengzhou ja Shengzhou
                (112.5, 40.6), (113.5, 41.0), (115.5, 41.0), (117.5, 41.2), (119.0, 41.8), (120.5, 42.3),  # muuri, Yingzhou
            ]),
            ('Itäturkit', 'turkit', 'ulkoinen', [  # kaganaatti jakautui 583; Shabolüe alistui Suin vasalliksi 584, Dulan kagaani 588–599
                (92.5, 44.0), (91.0, 45.5), (90.0, 48.0), (89.0, 50.0),  # Barkol; Altai erottaa Länsiturkeista
                (92.5, 51.2), (97.0, 52.0), (102.0, 52.3), (106.0, 52.8),  # Tannu-Ola, Sajanit, Baikalin länsipuoli
                (110.0, 51.8), (114.5, 50.5), (118.0, 50.0), (120.5, 48.0),  # Selenga, Onon, Hulunbuir
                (121.0, 45.5), (121.8, 43.5), (121.8, 42.6),  # Hinggan; kitaanit ja xit turkkien piirissä
                (120.5, 41.8), (117.0, 40.5), (113.0, 40.0), (110.0, 40.2),  # Sui voittaa muurin eteläpuolella
                (106.0, 40.0), (102.0, 39.8), (98.0, 40.6), (95.5, 41.2), (93.5, 42.5),  # Alxa ja Yiwu (Hami)
            ]),
            ('Länsiturkit', 'turkit-lansi', 'ulkoinen', [  # Tardu; Tarimin kaupunkivaltiot (Gaochang ym.) veronmaksajia, ei piirretä
                (92.0, 43.3), (91.0, 45.5), (90.0, 48.0), (87.5, 49.5),  # Itäturkit voittavat Altailla
                (85.0, 50.5), (80.0, 50.0), (75.0, 49.0), (70.0, 47.0),  # Irtyš, Kazakstanin aro
                (66.0, 44.5), (64.0, 42.0), (66.5, 40.0), (70.0, 39.5),  # Syrdarja, Sogdiana; Fergana
                (73.5, 39.5), (76.0, 40.5), (78.5, 41.5), (81.0, 42.0),  # Alai, Tianshanin harja
                (84.0, 42.6), (87.0, 43.0), (89.5, 43.0),  # Karashahr ja Turfan (Gaochang) etelään
            ]),
        ],
    },
    669: {
        'otsikko': '669', 'paakaupungit': ["Chang'an", 'Lhasa'],
        'alueet': [
            ('Tang', 'tang', 'kiina', [  # suoraan hallitut prefektuurit
                (121.8, 42.8), (122.3, 41.6), (122.1, 40.9), (121.2, 40.3), (120.6, 38.7),  # Liao-joki, Yingzhou
            ] + _ETELARANNIKKO + [
                (108.0, 17.8), (106.4, 18.0), (105.0, 19.5), (104.0, 20.8),  # Jiaozhoun piiri, Hoành Sơn (Champa)
                (103.2, 22.4), (102.6, 23.6), (101.8, 24.6), (101.0, 25.3),  # Itä-Yunnan: Rongzhou ja Yaozhou (664)
                (101.0, 26.0), (101.6, 26.6), (102.0, 27.8), (101.8, 28.8),  # Erhai ei Tangille; Suizhou (Xichang)
                (102.2, 29.8), (102.5, 31.0), (102.6, 32.3), (102.8, 33.4),  # Yazhou, Maozhou, Songzhou
                (102.2, 34.5), (101.9, 35.4), (101.4, 36.4), (101.6, 37.4),  # Taozhou, Kuozhou, Shanzhou; Riyue-vuori
                (100.5, 38.3), (98.5, 39.0), (96.5, 39.6), (94.5, 39.7), (93.0, 40.2),  # Hexi Shazhouhun asti
                (91.0, 41.6), (88.4, 42.5), (87.3, 43.4), (87.2, 44.5),  # Xizhou (Turfan) 640, Tingzhou (Beiting)
                (89.5, 45.0), (91.5, 44.0), (94.5, 43.6), (95.8, 42.4),  # Barkol, Yizhou (Hami)
                (97.8, 41.0), (99.8, 40.7), (101.5, 40.6), (103.0, 39.4),  # Hexin pohjoisreuna, Juyan
                (104.5, 39.3), (105.8, 39.4), (106.7, 40.5), (108.2, 41.1),  # Alxa, Helan, Fengzhou
                (110.0, 41.0), (111.3, 40.5), (112.5, 40.8), (114.5, 41.1),  # Shengzhou; Chanyu (Hohhot) protektoraattia
                (116.5, 41.2), (118.5, 41.8), (120.5, 42.5),  # Yanin vuoret, Yingzhoun pohjoispuoli
            ]),
            ('Anxi', 'tang', 'protektoraatti', [  # Neljä varuskuntaa (648/658) ja Länsi-turkkien protektoraatit 657
                (72.0, 40.8), (71.6, 42.2), (72.8, 43.4), (74.0, 44.8),  # Ferganan reuna, Talas, Suyab
                (76.5, 45.3), (79.0, 46.0), (80.5, 45.6), (83.0, 47.0),  # Balhašin etelärannat, Alakol, Tarbagatai
                (85.5, 47.6), (88.0, 48.0), (90.5, 46.5), (91.6, 45.0),  # Altai
                (93.0, 43.5), (93.2, 41.0), (92.5, 39.9),  # Tangin käytävä voittaa; Lop Nor ja Shanshan Anxille
                (91.5, 38.9), (88.5, 38.0), (85.5, 37.0), (82.5, 36.2), (79.5, 36.0),  # Kunlunin ja Altyn Taghin harja
                (77.0, 36.2), (75.2, 37.0), (74.2, 38.5), (73.3, 39.5), (72.5, 40.0),  # Taškurgan, Pamir, Kašgar
            ]),
            ('Andong', 'tang', 'protektoraatti', [  # Goguryeo kukistui 668: protektoraatti Pjongjangissa
                (121.5, 43.5), (124.0, 45.0), (126.5, 45.3), (128.5, 44.5),  # Fuyu, Mohe-rajamaa
                (130.5, 43.5), (131.0, 42.5), (130.2, 41.5), (129.0, 40.5),  # Tumen, Koillis-Korean rannikko
                (128.0, 39.5), (127.6, 38.6), (126.8, 38.1), (126.0, 37.6),  # Wonsan; Silla Imjinin eteläpuolella
                (125.0, 37.5), (124.0, 38.5), (121.0, 38.4),  # Keltainenmeri, Liaodongin kärki
                (121.0, 40.3), (122.0, 41.0), (122.3, 41.6), (122.6, 42.3),  # Liao-joki (Tang voittaa lännessä)
            ]),
            ('Anbei', 'tang', 'protektoraatti', [  # Hanhai nimettiin Anbeiksi 669; Mongolian ylänkö
                (90.0, 50.5), (93.0, 51.5), (98.0, 52.0), (103.0, 52.0),  # Altai, Sajanit
                (107.0, 52.5), (110.0, 51.5), (114.0, 50.5), (117.5, 49.8),  # Baikalin eteläpuoli, Kerulen
                (119.5, 48.0), (119.0, 45.5), (117.5, 43.0), (115.5, 42.3),  # Hinggan; kitaanit jäävät ulos
                (113.0, 40.8), (111.5, 40.3), (109.0, 40.8), (106.5, 39.8),  # Chanyu Yinshanilla (Tang voittaa etelässä)
                (104.0, 38.8), (101.0, 40.4), (98.0, 40.8), (95.5, 42.0),  # Alxa ja Gobin reuna Hexin pohjoispuolella
                (93.0, 43.3), (88.0, 46.5), (88.0, 49.0),  # Barkol; Anxi voittaa Altailla
            ]),
            ('Tiibetin valtakunta', 'tiibet', 'ulkoinen', [  # Zhangzhung (n. 644) ja Tuyuhun (663) liitetty
                (78.2, 33.0), (78.0, 34.8), (79.0, 36.0), (82.0, 36.4), (84.5, 37.2),  # Ladakhin reuna, Aksai Chin, Kunlun
                (87.5, 38.4), (90.5, 39.2), (93.0, 39.8), (95.0, 39.9),  # Altyn Tagh (Anxi voittaa pohjoisessa)
                (97.5, 39.4), (99.5, 38.8), (101.0, 37.8), (102.0, 37.0),  # Qilian ja Kukunor (Tang voittaa Hexissä)
                (102.0, 36.0), (102.4, 35.0), (103.0, 33.6), (102.9, 32.3),  # Amdo: Bailan ja Dangxiang Tangin rajaan
                (102.8, 31.0), (102.5, 29.8), (102.0, 28.8), (101.0, 28.0), (99.6, 27.8),  # Kham; Erhai ei vielä Tiibetille
            ] + _HIMALAJA),
        ],
    },
    790: {
        'otsikko': '790', 'paakaupungit': ["Chang'an", 'Lhasa', 'Ordu-Baliq', 'Yangjumie'],
        'alueet': [
            ('Tang', 'tang', 'kiina', [  # An Lushanin kapinan (755–763) jälkeen; Hebein sotilaskuvernöörit nimellisesti Tangin
                (106.0, 37.5), (106.1, 38.5), (106.6, 39.6), (106.9, 40.5),  # Lingzhou (Shuofang), Helanin itäpuoli
                (107.6, 41.3), (109.5, 41.5), (111.0, 41.3),  # Tiande ja Shouxiang-linnat (708), Zhenwu
                (112.5, 41.0), (114.0, 40.9), (115.5, 40.8), (117.0, 40.8), (118.5, 40.4), (119.8, 40.0),  # Yuguan
                (120.0, 39.0), (121.0, 38.3),  # Bohai; Liaodong ei enää Tangille (Balhae)
            ] + _ETELARANNIKKO + [
                (108.0, 17.8), (106.4, 18.0), (105.0, 19.5), (104.0, 20.8), (103.2, 22.4),  # Annanin protektoraatti
                (103.8, 23.2), (105.0, 24.0), (105.0, 26.0), (104.5, 27.8), (103.2, 28.5),  # Nanzhao lännessä (ei piirretä)
                (102.4, 29.4), (102.9, 30.4), (103.4, 31.5), (103.9, 32.2),  # Lizhou, Yazhou; Maozhou Tangille
                (104.3, 32.8), (105.0, 33.2), (105.6, 33.6), (105.9, 34.0),  # Longzhou, Wenzhou; Chengzhou Tiibetille
                (106.1, 34.6), (106.5, 35.2), (106.8, 35.4), (107.0, 36.2),  # Qingshuin rauha 783: Long- ja Jingzhou
                (106.6, 36.9), (106.2, 37.4),  # Huanzhou ja Yanzhou
            ]),
            ('Tiibetin valtakunta', 'tiibet', 'ulkoinen', [  # Hexi (Shazhou 786), Longyou, Tarim; Beiting kaatui 790
                (73.5, 39.5), (74.5, 37.0), (75.5, 35.5), (77.5, 34.5), (78.6, 33.0),  # Pamir, Baltistan, Ladakh
            ] + _HIMALAJA[::-1] + [
                (98.6, 27.5), (99.6, 27.3), (100.8, 28.3),  # Nanzhaon pohjoisraja (Shenchuanin rautasilta)
                (102.2, 29.5), (102.9, 30.4), (103.4, 31.5), (103.9, 32.2),  # Dadu-joki; Tang voittaa idässä
                (104.3, 32.8), (105.0, 33.2), (105.6, 33.6), (105.9, 34.0),
                (106.1, 34.6), (106.5, 35.2), (106.8, 35.4), (107.0, 36.2),  # Yuanzhou (Guyuan) ja Qinzhou Tiibetille
                (106.6, 36.9), (106.2, 37.4), (106.0, 37.5),
                (105.4, 38.4), (104.2, 39.5), (102.0, 40.0), (101.0, 41.0),  # Liangzhou, Ganzhou, Juyanin aavikko
                (98.5, 40.6), (96.0, 41.0), (95.5, 42.5), (94.5, 43.6),  # Guazhou; Yizhou (Hami) 781
                (91.5, 44.5), (89.5, 45.0), (87.0, 44.6),  # Beiting (Jimsar) ja Luntai
                (86.0, 43.5), (83.5, 42.8), (80.5, 42.3), (78.0, 41.3),  # Tianshanin harja: Karashahr, Kucha, Aksu
                (76.0, 40.8), (74.5, 40.3),  # Torugart, Kašgar
            ]),
            ('Uiguurien kaganaatti', 'uiguurit', 'ulkoinen', [  # 744–840; Tangin liittolainen, menetti Beitingin Tiibetille 790
                (86.0, 45.5), (86.5, 47.8), (89.0, 49.5), (92.0, 51.0),  # Dzungarian pohjoisosa, Musta Irtyš, Altai
                (97.0, 52.0), (102.0, 52.5), (104.0, 52.0), (108.5, 52.5),  # Sajanit, Hövsgöl, Baikal
                (112.0, 51.5), (116.5, 50.5), (119.5, 49.5), (120.5, 47.0),  # Selenga, Onon, Hulunbuir, Hinggan
                (119.0, 45.0), (117.5, 43.5), (116.0, 42.0), (114.0, 41.3),  # kitaanit ja xit (uiguurien vasalleja) idässä
                (112.0, 40.8), (109.0, 41.0), (106.5, 40.6),  # Tang voittaa muurilla
                (104.5, 40.5), (101.0, 41.5), (97.0, 42.0), (95.0, 43.0),  # Tiibet voittaa Hexissä ja Hamissa
                (91.0, 44.8), (88.0, 45.0),  # Tiibetin Beiting etelässä
            ]),
            ('Nanzhao', 'dali', 'ulkoinen', DALI),  # Yi Mouxun, Tiibetin liittolainen vuoteen 794; Xichang Nanzhaolle
        ],
    },
    950: {
        'otsikko': '950', 'paakaupungit': ['Kaifeng', 'Shangjing (Liao)', 'Jinling', 'Hangzhou', 'Changsha', 'Xingwang',
                                            'Chengdu', 'Jiangling', 'Yangjumie'],
        'alueet': [
            ('Myöhempi Han', 'myohempi-han', 'kiina', [  # 947–951; Pohjoinen Han erosi vasta 951
                (106.0, 38.6), (107.6, 38.4), (108.8, 38.6), (109.8, 39.0),  # Lingzhou; Dingnan (Xiazhou) nimellisesti
                (110.8, 39.5), (111.2, 39.7), (111.9, 39.3), (112.6, 39.0),  # Fuzhou (Fugu); Shuozhou Liaolle
                (113.3, 39.0), (114.0, 39.1), (114.8, 39.05), (115.3, 39.5),  # Yanmen ja Daizhou Hanille; Weizhou Liaolle
                (115.75, 39.35), (115.7, 38.7), (115.8, 38.25), (116.4, 38.1),  # Yizhou Hanille; Mo ja Ying (Hejian) Liaolle
                (116.6, 38.4), (116.9, 38.75), (117.9, 38.75),  # Cangzhou Hanille
                (120.5, 38.3), (122.8, 37.4), (121.0, 35.2), (119.6, 35.0),  # Bohai, Shandong
                (118.9, 34.5), (118.4, 33.7), (117.5, 33.1), (116.5, 32.7),  # Haizhou ja Huainan Eteläinen Tangille
                (115.5, 32.5), (114.6, 32.2), (114.4, 31.6), (114.0, 30.9),  # Huai-joki, Guangzhou; Dabie-vuoret
                (113.4, 30.5), (112.8, 30.9), (112.0, 31.3), (111.2, 31.3),  # Anzhou ja Fuzhou Hanille; Jingnan etelässä
                (110.4, 31.6), (109.5, 32.2), (108.6, 32.6), (108.0, 33.7),  # Fangzhou, Jinzhou (Ankang)
                (107.0, 34.2), (106.4, 34.5), (105.9, 34.9), (105.4, 35.2),  # Qinling; Feng- ja Qinzhou Shulle (947)
                (105.8, 35.8), (105.9, 36.5), (105.6, 37.4),  # Weizhou (Pingliang), Yuanzhou
            ]),
            ('Jingnan', 'jingnan', 'kiina', [  # Gao-suvun Nanping: Jiangling, Xiazhou (Yichang), Guizhou (Zigui)
                (110.2, 31.6), (113.5, 31.6), (113.3, 30.3), (113.0, 29.85),  # pohjoisreuna Hanin rajaan
                (112.0, 29.9), (111.3, 30.2), (110.6, 30.4), (110.1, 30.9),  # Jangtse; Badong ja Wushan (Shu)
            ]),
            ('Wuyue', 'wuyue', 'kiina', [  # Qian-suku, pääkaupunki Hangzhou; Fuzhou 947
                (121.3, 31.9), (120.6, 31.65), (119.95, 31.45), (119.6, 31.05),  # Suzhou Wuyuelle, Changzhou Tangille
                (119.4, 30.55), (118.85, 30.15), (118.6, 29.9), (118.4, 29.3),  # Taihun länsipuoli, Tianmu, She ja Muzhou
                (118.2, 28.8), (118.6, 28.3), (118.9, 27.8), (119.0, 27.3),  # Quzhou; Xianxian sola, Jianzhou Tangille
                (118.6, 26.6), (118.8, 26.0), (119.0, 25.6), (119.5, 25.4),  # Fuzhoun prefektuuri; Putian Qingyuanille
                (120.5, 26.5), (122.5, 29.5), (122.5, 31.0),  # meri, Zhoushan
            ]),
            ('Eteläinen Tang', 'etelan-tang', 'kiina', [  # Jinling; Huainan, Jiangxi ja Min (945), Qingyuan nimellisesti
                (120.3, 35.3), (116.0, 33.0), (114.0, 32.6), (114.2, 31.2),  # pohjoinen Hanin alle (Han voittaa)
                (113.2, 30.7), (112.9, 30.0), (113.3, 29.9), (113.6, 29.3),  # Ezhou ja Mianzhou; Yuezhou Chulle
                (114.0, 28.6), (113.9, 28.2), (113.9, 27.3), (113.8, 26.4),  # Luoxiao- ja Wugong-vuoret
                (113.9, 25.8), (114.3, 25.3), (115.0, 24.9), (115.6, 24.85),  # Dayun sola, Qianzhou
                (116.2, 24.6), (116.9, 24.2), (117.2, 23.7),  # Tingzhou ja Zhangzhou; Chaozhou Eteläinen Hanille
                (117.5, 23.3), (119.5, 25.0), (119.3, 26.0), (119.5, 28.5),  # meri; Wuyue voittaa idässä
                (119.8, 30.5), (120.5, 31.5), (121.2, 32.0), (121.9, 32.0), (121.2, 33.5),  # Tongzhou Tangille
            ]),
            ('Chu', 'chu', 'kiina', [  # Ma-suku, Changsha; sisällissodassa 950, Eteläinen Tang valtasi 951
                (110.2, 30.6), (113.0, 30.4), (114.4, 29.5), (114.3, 25.6),  # Jingnan ja Eteläinen Tang voittavat
                (113.6, 25.35), (112.5, 25.1), (111.6, 25.0), (110.9, 24.8),  # Nanling; Hezhou (948) Eteläinen Hanille
                (110.0, 24.6), (109.4, 24.2), (108.6, 24.3), (107.7, 24.6),  # Guilin, Liuzhou, Yizhou Chulle
                (108.2, 25.5), (108.5, 26.5), (108.8, 27.6), (109.2, 28.5),  # Länsi-Hunanin vuoret; Xizhou (Peng)
                (109.4, 29.4), (109.8, 30.0),  # Shizhou (Enshi) Shulle
            ]),
            ('Eteläinen Han', 'etelan-han', 'kiina', [  # Liu-suku, Xingwang (Guangzhou); Hainan
                (117.6, 23.5), (117.3, 24.6), (116.0, 25.3), (114.0, 25.7),  # Eteläinen Tang ja Chu voittavat pohjoisessa
                (112.0, 25.6), (110.0, 25.3), (108.0, 24.9), (107.0, 24.7),
                (106.0, 24.0), (105.6, 23.1), (106.6, 22.5), (107.0, 22.0), (108.0, 21.4),  # Ngô-dynastian Vietnam (938)
                (108.3, 18.3), (109.5, 17.6), (111.6, 18.0), (112.5, 20.4), (116.0, 21.3),
            ]),
            ('Myöhempi Shu', 'myohempi-shu', 'kiina', [  # Meng-suku, Chengdu; Hanzhong ja Qin–Feng 947
                (105.4, 35.3), (106.5, 35.3), (108.5, 34.0), (109.8, 32.8),  # Han voittaa pohjoisessa
                (110.6, 31.0), (110.0, 30.0), (108.6, 27.9), (107.5, 27.4),  # Kuizhou; Chu voittaa idässä
                (106.5, 27.9), (105.4, 28.0), (104.0, 28.3), (103.0, 28.6),  # Luzhou, Rongzhou (Yibin)
                (102.5, 29.5), (102.8, 31.0), (103.4, 31.6), (103.5, 32.5),  # Lizhou, Yazhou; tiibetiläiset heimot
                (104.0, 33.8), (104.3, 34.4), (104.6, 35.2),  # Jiezhou (Wudu), Qinzhoun länsiraja
            ]),
            ('Liao', 'liao', 'ulkoinen', [  # kitaanit; 16 prefektuuria 938, Dongdan (Balhae) 926
                (108.5, 41.3), (105.5, 43.0), (104.5, 46.0), (106.0, 48.6), (109.0, 49.3),  # Yinshan, Gobi, Orhon 924
                (113.5, 49.8), (117.5, 50.0), (119.5, 50.5),  # Hulunbuir
                (124.0, 50.0), (127.5, 49.5), (130.5, 48.0), (133.5, 47.8), (136.0, 46.5),  # Nen, Songhua, Ussuri
                (135.5, 44.5), (131.5, 42.6), (130.5, 42.3), (128.2, 42.0), (126.0, 41.2), (124.4, 40.0),  # Yalu
                (123.2, 38.5), (121.0, 38.3), (119.0, 38.8), (118.3, 38.7),  # Bohai
                (117.2, 37.9), (115.3, 38.0), (113.5, 38.6), (112.0, 38.9), (111.3, 39.4),  # Han voittaa etelässä
                (110.6, 40.0), (109.5, 40.6),  # Shengzhou (Togtoh), Keltaisen joen pohjoisranta
            ]),
            ('Dali', 'dali', 'ulkoinen', DALI),  # Duan Siping perusti 937 (Yangjumie)
        ],
    },
    1100: {
        'otsikko': '1100', 'paakaupungit': ['Kaifeng', 'Shangjing (Liao)', 'Xingqing', 'Yangjumie'],
        'alueet': [
            ('Pohjoinen Song', 'song', 'kiina', [
                (102.6, 34.2), (102.4, 35.0), (102.6, 35.8), (103.2, 36.4),  # Xihe-piiri 1072: Tao-, He- ja Lanzhou
            ] + _XIA_ETELA[::-1] + [  # Xia-raja kuten 1142; Tsongkha (Xining): Song miehitti 1099, paikallinen hallinto 1100, liitettiin 1103
                (111.2, 39.6), (111.8, 39.25), (112.5, 39.1), (113.0, 39.25),  # Fuzhou ja Linzhou; Yanmen Songille
                (113.8, 39.35), (114.5, 39.1), (115.0, 39.15), (115.5, 39.0),  # Daizhou; Yizhou Liaolle (986)
                (116.0, 39.1), (116.6, 39.15), (117.2, 39.1), (117.9, 38.95),  # Baigou- ja Juma-joki (Shanyuan 1005)
                (120.5, 38.3),
            ] + _ETELARANNIKKO + [
                (108.3, 18.3), (108.0, 21.4), (107.0, 22.0), (106.6, 22.5), (105.6, 23.1),  # Đại Việt (sama kuin 1142)
                (104.8, 24.4), (105.2, 26.4), (104.5, 28.0), (103.2, 28.5), (102.3, 29.4),  # Dali
                (102.0, 30.6), (102.6, 32.1), (103.0, 33.3),
            ]),
            ('Länsi-Xia', 'xia', 'ulkoinen', [  # sama monikulmio kuin 1142 (Xia-rajat pysyivät)
                (92.8, 40.4), (95.5, 41.6), (97.5, 42.1), (100.5, 42.6), (104.0, 42.2), (107.0, 41.7), (108.6, 41.1),
                (110.4, 39.5), (110.3, 38.0), (109.0, 37.3), (107.5, 36.5), (106.4, 35.9), (105.2, 35.9),
                (103.8, 36.2), (102.4, 36.7), (101.0, 37.5), (99.0, 38.3), (96.6, 39.2), (94.0, 39.6),
            ]),
            ('Liao', 'liao', 'ulkoinen', [  # viisi pääkaupunkia; Zhenzhou (Kedun) Orhonilla 1004
                (104.5, 42.6), (102.5, 44.5), (102.0, 46.5), (102.8, 48.6),  # Gobi-Altai, Kedun
                (105.5, 49.6), (109.5, 49.8), (114.0, 50.0), (119.5, 50.8),  # Tuul, Kerulen, Hulunbuir
            ] + _LIAO_KOILLINEN + [  # sama itäreuna kuin Jinillä 1142 (liukuu suoraan)
                (119.0, 38.8), (117.5, 38.5), (115.0, 38.6), (112.5, 38.6), (111.0, 39.2),  # Song voittaa etelässä
                (110.6, 39.6), (109.4, 40.6), (107.5, 41.8),  # Dongsheng ja Tiande; Xia voittaa lännessä
            ]),
            ('Dali', 'dali', 'ulkoinen', DALI),  # Duan-suku; Gao-suvun valtionhoitajat (1094–1096 välikausi Dazhong)
        ],
    },
}
