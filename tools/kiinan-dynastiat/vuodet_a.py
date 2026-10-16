"""Kiinan dynastiat: avainvuodet 200 eaa, 140, 250, 440 ja 500 (CC0, Karttaseppä 16.10.2026).

Omat käsin piirretyt rajat; ankkurit kommenteissa. Pysyvät viivat (Nanling, Shun länsireuna, Annamin vuoret, Qilian,
Hexi, Yin-vuoret, Qinling) on otettu valmiista vuosista -221 ja -100, jotta liukuma pysyy rauhallisena.
Cliopatria (CC BY 4.0) vain vertailukuvana.
"""

# Etelän dynastiat: sama lämmin ruosteenpunainen perhe kuin jin-etela (#b4603c), hieman eri sävyt.
VARIT = {'liu-song': '#b0573a', 'qi-etela': '#c06f4a'}
KOTISEUDUT = {}
KAUPUNGIT = {'Xiongnun hovi|-200': (111.5, 42.3)}  # Shiji 110: hovi Dain ja Yunzhongin kohdalla, Yinshanin pohjoispuolella

# Yhteiset viivat (lon, lat).
_ETELA_LANSI = [  # Shun ja Yunnanin länsireuna etelästä pohjoiseen (Han 100 eaa + Yongchang 69 jaa.)
    (103.0, 22.5), (101.6, 22.9), (100.3, 23.2), (99.0, 23.8), (98.0, 24.3),  # Ailao, Yongchangin eteläreuna
    (97.9, 25.3), (98.6, 26.5), (99.4, 27.4),  # Gaoligong, Nujiang
    (100.6, 27.6), (102.0, 28.6), (102.3, 30.2), (102.9, 32.0),  # Yuexi, Daxue-vuoret, Minin laakso
]
_RANNIKKO_ETELA = [  # meri Jangtsen suulta Tonkininlahdelle; Taiwan ja Hainan jäävät ulos
    (123.0, 30.0), (121.5, 26.5), (118.8, 23.3), (116.0, 21.3), (112.5, 20.9), (111.0, 20.5),  # Taiwanin salmi
    (110.5, 20.18), (109.6, 20.15),  # Qiongzhoun salmi (Hainan hylätty 46 eaa.)
    (108.3, 19.6), (107.6, 18.0),  # Tonkininlahti Hainanin länsipuolella
]
_HEXI = [  # Qilianin juuri ja Hexi-käytävä idästä länteen, Yumen, takaisin pohjoisreunaa itään (Han 100 eaa.)
    (101.3, 36.0), (100.8, 36.8), (101.0, 37.6),  # Huangzhong (Xining) mukana, Qinghai-järvi ei
    (99.0, 38.4), (96.8, 39.4), (94.0, 39.7), (93.4, 40.0), (93.6, 40.6),  # Dunhuang, Yumen-sola
    (95.8, 40.6), (98.4, 40.2), (99.8, 40.6),  # Shulen ja Heijoen pohjoisreuna
]
_YIN = [  # pohjoisraja Juyanista Liaoxiin: Gaoque, Yin-vuoret, Yunzhong, Shanggu, Yanin muuri
    (100.5, 42.1), (101.3, 41.9), (102.3, 40.0), (104.2, 39.6), (106.2, 40.8), (108.2, 41.2),
    (110.5, 41.3), (112.5, 41.3), (115.0, 41.5), (117.5, 41.8), (120.0, 42.4), (122.5, 42.6),
]
_KOREA = [  # Xuantu (Fushun 107 jaa.), Liaodong ja Lelang Luoteis-Koreassa; Goguryeo ja Dongye ulkona
    (124.3, 42.3), (124.8, 41.3), (125.3, 40.5),  # Goguryeon (Jian) länsipuoli, Yalun alajuoksu
    (126.3, 40.0), (127.1, 39.5), (127.4, 38.5), (127.0, 37.6),  # Chongchon, Nangnim-vuorten länsirinne, Han-joki
    (125.8, 37.1), (124.0, 35.0),  # meri: Keltainenmeri Korean ja Shandongin välissä
]
_TARIM_140 = [  # Länsialueiden päällikkö (zhangshi, Liuzhong): löyhä yliherruus pohjoisella reitillä Aksusta Hamiin
    (80.0, 41.0), (81.0, 42.0), (84.0, 42.3), (86.5, 42.5), (88.0, 43.3), (90.0, 43.3), (93.0, 43.4), (94.6, 43.0),
    (94.8, 42.2), (94.0, 41.2), (93.6, 40.6), (92.0, 40.1),  # Kum-tag, Yumen; Lop Nor
    (90.0, 40.0), (88.0, 40.3), (85.0, 40.8), (82.5, 40.6), (80.5, 40.3),  # Tarim-joki: eteläreitti ulkona
]
_TARIM_250 = [  # Wein Länsialueiden päällikkö Loulanissa ja Gaochangin varuskunta: itäinen Tarim
    (85.5, 42.0), (86.5, 42.5), (88.0, 43.3), (90.0, 43.3), (93.0, 43.4), (94.6, 43.0),  # Karashahr, Turfan, Hami
    (94.8, 42.2), (94.0, 41.2), (93.6, 40.6), (92.0, 40.1),  # Yumen; Lop Nor
    (90.0, 39.6), (88.5, 39.8), (87.0, 40.6), (85.8, 41.3),  # Loulan, Tarim-joen alajuoksu
]
_TARIM = [  # (vanha laaja rajaus, ei käytössä) Tarimin allas Kašgarista Lop Noriin
    (75.5, 39.5), (76.5, 40.8), (78.5, 41.6), (81.0, 42.0), (84.0, 42.3),  # Tianshanin etelärinne: Aksu, Kucha
    (86.5, 42.5), (88.0, 43.3), (90.0, 43.3), (93.0, 43.4), (94.6, 43.0),  # Bogda: Turfan (Liuzhong), Hami
    (94.8, 42.2), (94.0, 41.2), (93.6, 40.6), (92.0, 40.1),  # Kum-tag; liittyy Yumeniin, Lop Nor (Loulan)
    (90.0, 39.3), (88.0, 38.6), (85.0, 37.4), (82.5, 36.9), (80.0, 36.7),  # Altyn-tag ja Kunlunin juuri: Niya, Khotan
    (78.0, 37.0), (76.5, 37.8), (75.5, 38.6),  # Karghalik, Yarkand, Pamirin juuri
]
_RAJA_440 = [  # Songin ja Wein raja 440 idästä länteen (Wei valloitti Luoyangin, Hulaon ja Huatain 423)
    (119.0, 38.3), (118.2, 37.9),  # Keltaisen joen (Itä-Hanin uoma) suu Bohaihin
    (117.5, 37.6), (116.7, 37.2), (116.0, 36.5), (115.3, 35.8),  # joki rajana: Pingyuan, Dong'e
    (115.5, 35.1), (115.2, 34.5),  # Huatai Weille; Suiyang (Shangqiu) Songille
    (114.6, 34.1), (113.8, 33.8), (112.9, 33.9),  # Kaifeng (Chenliu), Hulao ja Luoyang Weille; raja ~34° P (faktatarkistus 16.10.)
    (111.7, 34.0), (110.7, 33.6),  # Funiu-vuoret, Wuguan
    (109.5, 33.6), (108.5, 33.7), (107.4, 33.8),  # Qinlingin harja: Guanzhong Weille, Hanzhong Songille
]
_RAJA_500 = [  # Qin ja Wein raja 500 idästä länteen: Huai-joen tienoo
    (120.6, 34.8), (119.3, 34.6),  # meri; Haizhou (Lianyungang) etelälle
    (118.8, 33.8), (118.0, 33.2), (117.3, 32.75),  # Huaiyin ja Zhongli Qille; Xiapi ja Suyu Weille
    (116.6, 32.2), (115.6, 32.2), (114.6, 32.3),  # Shouchun (500) Weille; Yiyang (Xinyang) Qille vuoteen 504
    (113.4, 32.5), (112.7, 32.25), (112.0, 32.25),  # Xinye ja Wancheng Weille (498), Xiangyang Qille
    (111.3, 32.5), (110.5, 33.0), (110.0, 33.4),  # Wudang; Shangyong Qille, Shangluo Weille
    (109.0, 33.6), (108.5, 33.7), (107.4, 33.8),  # Qinlingin harja: Hanzhong Qille
]
_ETELA_SONG_QI = [  # etelän dynastioiden länsi- ja eteläraja Qinlingilta Jangtsen suulle
    (106.6, 33.5), (105.6, 32.6), (104.2, 32.3), (103.2, 32.3),  # Chouchi (Wudu, Yinping) ulkona
    *_ETELA_LANSI[::-1],  # Ningzhou (Cuan-suku) nimellisesti etelän
    (104.0, 20.6), (105.6, 18.3), (106.4, 17.8),  # Jiaozhou ja Jiude; Linyi Hoành Sơnin eteläpuolella
    (107.3, 17.8), (107.6, 18.4), (108.3, 19.6), (109.6, 20.15), (110.5, 20.18),  # meri, Hainan ulkona
    (111.0, 20.5), (112.5, 20.9), (116.0, 21.3), (118.8, 23.3), (121.5, 26.5), (123.0, 30.0),
]
_WEI_POHJOINEN = [  # Pohjois-Wein pohjoisraja Liao-joelta Dunhuangiin ja Qilianin juurta takaisin (440 ja 500)
    (122.0, 40.9), (122.2, 41.6), (121.4, 42.3), (120.0, 42.2),  # Liao-joki: Liaodong Goguryeolla; Longcheng (436)
    (118.5, 42.0), (117.0, 41.6), (115.5, 41.6),  # Kumo Xi ja kitaanit pohjoisessa; Huaihuang
    (113.6, 41.6), (112.0, 41.7), (110.0, 41.6), (108.0, 41.4),  # kuusi varuskuntaa: Rouxuan, Wuchuan, Huaishuo, Woye
    (106.5, 41.0), (105.0, 40.2), (103.5, 39.6),  # Langshan, Alxa
    (101.2, 40.4), (99.8, 40.4), (98.4, 40.2), (95.8, 40.6), (93.6, 40.6),  # Hexin pohjoisreuna (Pohjoinen Liang 439)
    (93.4, 40.0), (94.0, 39.7), (96.8, 39.4), (99.0, 38.4), (101.4, 37.4),  # Dunhuang, Qilianin juuri; Tuyuhun etelässä
]

VUODET = {
    -200: {
        'otsikko': '200 eaa', 'paakaupungit': ["Chang'an", 'Xiongnun hovi|-200'],
        'alueet': [
            # Han perii Qinin ytimen (kuningaskunnat Chu, Qi, Zhao, Yan, Changsha vasalleina). Nanyue ja Minyue
            # eivät ole Hanin: etelä- ja kaakkoisraja on Qinin 221 eaa. viiva (Nanling, Wuyi). Ordos menetetty.
            ('Han', 'han', 'kiina', [
                (125.0, 41.5), (124.5, 39.8),  # Yanin Liaodong; Wiman Joseonin raja Paesulla (Yalu)
                (122.5, 37.5), (123.5, 33.0), (123.0, 29.5),  # meri: Shandong, Jangtsen suu, Zhejiang
                (121.8, 28.3), (119.6, 28.1), (118.3, 28.0), (117.0, 27.5),  # Dongou ja Minyue ulkona (Wuyi)
                (115.5, 26.4), (113.6, 25.5), (111.6, 25.3), (110.0, 25.8),  # Nanling: Nanyue (Zhao Tuo) etelässä
                (109.0, 27.2), (108.0, 28.5), (106.0, 28.2), (104.5, 28.6), (103.0, 29.0),  # Changsha, Ba, Shu
                (102.6, 30.2), (103.0, 31.8), (104.0, 33.2), (103.7, 34.6),  # Shun länsireuna, Longxi
                (104.2, 35.8), (105.2, 36.6), (106.6, 37.3),  # Qin Zhaowangin muuri (Chaona, Xiao-sola)
                (108.5, 37.9), (110.2, 39.0), (111.0, 40.3), (111.8, 40.9),  # Ordoksen eteläreuna; Yunzhong Hanilla
                (113.5, 41.2), (116.0, 41.3), (118.5, 41.8), (121.0, 42.3), (123.5, 42.3),  # Dai, Yanin muurit
            ]),
            # Xiongnu: Modu yhdisti 209 eaa., kukisti Donghut idässä ja valtasi Ordoksen (Loufan, Baiyang).
            # Hexi on vielä Yuezhien (karkotettu n. 176 eaa.), joten käytävä jätetään tyhjäksi.
            ('Xiongnut', 'xiongnu', 'ulkoinen', [
                (123.5, 42.3), (122.5, 44.0), (121.5, 46.0), (120.0, 48.5),  # Donghujen maat: Xar Moron, Khingan
                (117.0, 50.0), (113.0, 50.5), (107.0, 52.0), (99.0, 52.0),  # Hulunbuir, Baikalin eteläpuoli
                (92.0, 50.8), (88.5, 49.0), (88.0, 46.0),  # Sajanit (Gekun, Dingling), Altai
                (89.5, 44.3), (92.5, 43.6), (94.5, 42.6),  # Itä-Tianshanin pohjoisrinne, Barkol, Hami
                (97.5, 42.3), (100.3, 42.0), (102.0, 40.8), (103.8, 39.3),  # Gobin etelälaita, Juyan, Badain Jaran
                (104.8, 38.0), (105.8, 37.5), (106.6, 37.3),  # Tenggerin itäreuna, Ningxia; Hexi jää Yuezheille
                (108.5, 37.9), (110.2, 39.0), (111.0, 40.3), (111.8, 40.9),  # Ordos (Han voittaa yhteisen rajan)
                (113.5, 41.2), (116.0, 41.3), (118.5, 41.8), (121.0, 42.3),
            ]),
        ],
    },
    140: {
        'otsikko': '140', 'paakaupungit': ['Luoyang'],
        'alueet': [
            # Itäinen Han: Hexi ja Juyan pysyvät, Hainan hylätty (46 eaa.), Yongchang (69) lännessä, Rinan n. 16° P.
            ('Itäinen Han', 'han', 'kiina', [
                *_KOREA,
                (123.5, 30.0),  # meri Jangtsen suulle
                *_RANNIKKO_ETELA,
                (108.8, 16.0), (107.2, 16.2), (105.6, 18.5), (104.0, 20.6),  # Rinan (Xianglin), Annamin vuoret
                *_ETELA_LANSI,
                (103.5, 34.0), (102.6, 35.6),  # Wudu ja Lintao; Qiangien vuoristo lännessä
                *_HEXI,
                *_YIN,
            ]),
            # Länsialueiden protektoraatti (Ban Yong, hallintoupseeri Liuzhongissa 123 alkaen).
            ('Länsialueet', 'han', 'protektoraatti', _TARIM_140),
            # Xianbeit levittäytyivät Mongolian ylängölle pohjoisten Xiongnujen hajottua (89–91 jaa.).
            ('Xianbeit', 'xianbei', 'ulkoinen', [
                (123.5, 42.4), (123.0, 44.5), (121.8, 46.5), (120.5, 48.5),  # Liao-joen yläjuoksu, Khingan
                (118.0, 50.0), (113.0, 50.5), (107.0, 52.0), (99.0, 52.0),  # Hulunbuir, Baikal
                (92.5, 50.5), (89.5, 49.0), (90.5, 46.5), (93.5, 45.0),  # Altai; Barkolin Xiongnu-jäänne ulkona
                (96.0, 43.8), (98.5, 42.6),  # Gobin Altai
                *_YIN,  # Han voittaa yhteisen rajan
            ]),
        ],
    },
    250: {
        'otsikko': '250', 'paakaupungit': ['Luoyang', 'Chengdu', 'Jianye'],
        'alueet': [
            # Shu Han: Sichuan, Hanzhong, Wudu ja Yinping (229), Nanzhong (225). Piirretään ensin, naapurit yli.
            ('Shu', 'shu', 'kiina', [
                (103.5, 34.2), (104.6, 34.1), (105.8, 34.0),  # Wudu ja Yinping Shulle; Tianshui ja Qishan Weille
                (106.8, 34.1), (107.4, 33.8), (108.3, 33.7),  # Dasan-sola, Qinlingin harja
                (108.4, 32.9), (108.6, 32.0), (109.5, 31.6), (110.1, 31.1),  # Hanzhongin itäpää; Daba; Wu-sola
                (109.9, 30.4), (109.2, 29.6), (108.9, 28.6), (108.5, 27.6),  # Fuling Shulle, Wulin Wulle (Wuling-vuoret)
                (108.3, 26.4), (107.6, 25.3), (106.3, 24.4), (105.5, 23.5), (104.5, 22.7),  # Zangke ja Xinggu; Yulin Wulle
                *_ETELA_LANSI,
                (103.3, 33.2),  # Minin vuoret
            ]),
            # Cao Wei: pohjoinen, Guanzhong, Longxi, Hexi, Liaodong (238), Lelang ja Daifang. Ordos menetetty (215).
            ('Wei', 'wei', 'kiina', [
                *_KOREA,
                (122.0, 32.9), (120.6, 32.8), (119.6, 32.6),  # Huain ja Jangtsen välinen autio raja
                (118.5, 32.45), (117.8, 31.8), (117.0, 31.5),  # Jianyen vastaranta Wulle; Hefei Weille, Ruxu Wulle
                (116.3, 31.2), (115.6, 31.1), (114.6, 31.0),  # Lujiang; Wan (Qianshan) Wulle; Dabie
                (114.3, 30.85), (113.4, 30.8), (112.6, 30.9),  # Xiakou ja Jiangling Wulle, Jiangxia (Shangchang) Weille
                (112.0, 30.9), (111.4, 31.1), (110.8, 31.3), (110.1, 31.1),  # Xiling Wulle; Fangling ja Shangyong Weille
                (109.5, 31.6), (108.6, 32.0), (108.4, 32.9), (108.3, 33.7),  # Shun raja (Shu voittaa)
                (107.4, 33.8), (106.8, 34.1), (105.8, 34.0), (104.6, 34.1), (103.5, 34.2),
                (102.6, 35.6),  # Lintao ja Didao Weille
                *_HEXI,
                (100.5, 42.1), (101.3, 41.9), (102.3, 40.0),  # Xihai-komentokunta Juyanissa
                (103.3, 38.7), (104.0, 37.3), (105.0, 36.8), (106.3, 36.6),  # Wuwein pohjoispuoli; Tufa-xianbeit ulkona
                (107.8, 36.4), (109.2, 36.9), (110.4, 37.5),  # Anding; Shangjun hylätty
                (111.2, 38.6), (112.3, 39.3), (113.2, 39.8),  # Xinxing, Yanmen (Guangwu)
                (114.5, 40.4), (115.6, 40.7), (117.2, 40.8), (118.8, 40.8),  # Dai, Shanggu, Yuyang, Youbeiping
                (120.0, 41.2), (121.5, 42.0), (122.8, 42.3),  # Liaoxi; Murong- ja Yuwen-xianbeit pohjoisessa
            ]),
            # Wei hallitsi Länsialueita väljästi (hallintoupseeri Loulanissa); jatkumo Hanin protektoraatista.
            ('Länsialueet', 'wei', 'protektoraatti', _TARIM_250),
            # Itäinen Wu: Jangtsen alajuoksu, Jingzhoun etelä (219), Jiaozhou; Linyi vei Xianglinin 192.
            ('Wu', 'wu', 'kiina', [
                (110.0, 32.0), (112.0, 31.8), (114.0, 31.8), (115.5, 31.8),  # yli Wein rajan (Wei voittaa)
                (117.0, 32.2), (118.5, 32.6), (120.0, 33.2), (121.5, 33.5),
                *_RANNIKKO_ETELA,
                (107.4, 17.1), (106.6, 17.1), (105.6, 18.3), (104.0, 20.6),  # Rinan n. 17° P, Annamin vuoret
                (103.0, 22.5), (103.5, 23.5), (106.0, 27.0), (108.0, 30.0), (109.0, 31.5),  # yli Shun rajan (Shu voittaa)
            ]),
            # Xianbei-heimot (Kebinengin liitto hajosi 235) Mongolian ylängöllä ja Ordoksessa: jatkumo 140 → 440.
            ('Xianbeit', 'xianbei', 'ulkoinen', [
                (124.5, 42.5), (123.0, 44.5), (121.8, 46.5), (120.0, 48.5),  # Khingan
                (116.0, 49.5), (110.0, 49.5), (104.0, 49.0), (99.0, 47.5),  # Kerulen, Orhon, Khangai
                (97.0, 45.0), (98.0, 43.0), (100.5, 42.1), (102.3, 40.0),  # Gobin Altai, Juyan (Wei voittaa)
                (103.3, 38.7), (104.0, 37.3), (105.0, 36.8), (106.3, 36.6),  # Wein pohjoisraja (Wei voittaa)
                (107.8, 36.4), (109.2, 36.9), (110.4, 37.5), (111.2, 38.6), (112.3, 39.3), (113.2, 39.8),
                (114.5, 40.4), (115.6, 40.7), (117.2, 40.8), (118.8, 40.8), (120.0, 41.2), (121.5, 42.0), (122.8, 42.3),
            ]),
        ],
    },
    440: {
        'otsikko': '440', 'paakaupungit': ['Jiankang', 'Pingcheng'],
        'alueet': [
            # Liu Song: Jangtsen ja Huain maat sekä Shandong (Qingzhou ja Yanzhou, menetetty vasta 466–469).
            # Wei sai Luoyangin, Hulaon ja Huatain 423; Song piti Hanzhongin, Sichuanin, Ningzhoun ja Jiaozhoun.
            ('Liu Song', 'liu-song', 'kiina', [
                *_RAJA_440,
                *_ETELA_SONG_QI,
                (122.8, 33.0), (123.0, 36.5), (123.2, 37.6), (121.6, 38.1),  # Shandongin edustan meri, Bohain salmi
            ]),
            # Pohjois-Wei (Tuoba-xianbeit) yhdisti pohjoisen 439 (Pohjoinen Liang, Hexi). Rouran pohjoisessa,
            # Goguryeo Liaodongissa, Tuyuhun Qinghaissa ja Chouchi Wudussa jätetään piirtämättä.
            ('Pohjois-Wei', 'xianbei', 'ulkoinen', [
                *_WEI_POHJOINEN[:14],  # Liao-joelta Alxaan
                (101.2, 40.4), (99.6, 40.0), (99.4, 38.6), (101.4, 37.4),  # Zhangye Weille; Jiuquan ja Dunhuang
                # vielä Juqu Wuhuin (Pohjoisen Liangin jäänne, 440–442), jätetään tyhjäksi
                (102.6, 36.2), (103.2, 35.4), (104.2, 34.7), (105.4, 34.4), (106.6, 34.2),  # Tuyuhunin ja Chouchin raja
                *_RAJA_440[::-1],  # Songin raja (Song voittaa)
                (120.2, 39.3), (121.3, 40.4),  # Bohai; Liaodongin niemimaa jää Goguryeolle
            ]),
        ],
    },
    500: {
        'otsikko': '500', 'paakaupungit': ['Jiankang', 'Luoyang'],
        'alueet': [
            # Etelän Qi: Shandong ja Huaibei menetetty 466–469, Nanyang ja Xinye 498, Shouchun tammikuussa 500.
            # Hanzhong on yhä etelän (Wei vei sen vasta 504), joten Wei ei vielä ulotu Sichuanin pohjoisreunaan.
            ('Etelän Qi', 'qi-etela', 'kiina', [
                *_RAJA_500,
                *_ETELA_SONG_QI,
                (122.8, 33.0), (121.5, 34.6),  # Keltainenmeri Jiangsun edustalla
            ]),
            ('Pohjois-Wei', 'xianbei', 'ulkoinen', [
                *_WEI_POHJOINEN,
                (102.6, 36.2), (103.2, 35.4), (104.2, 34.7), (105.4, 34.4), (106.6, 34.2),  # kuten 440
                *_RAJA_500[::-1],  # Qin raja (Qi voittaa)
                (123.0, 36.5), (123.2, 37.6), (121.6, 38.1), (120.3, 38.6),  # Shandong Weille; Bohain salmi
                (120.2, 39.3), (121.3, 40.4),
            ]),
        ],
    },
}
