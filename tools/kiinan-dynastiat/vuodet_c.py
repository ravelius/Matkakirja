"""Kiinan dynastiat: avainvuodet 1280, 1421, 1644, 1873 ja 1912 (CC0, Karttaseppä 16.10.2026).

Omat käsin piirretyt kärjet tekstifaktoista ja maastosta; Cliopatria (CC BY 4.0) vain vertailukuvana.
Järjestys vuoden sisällä: aiempi alue voittaa (protektoraatit ja pienet alueet ensin, suuri alue lopuksi).
"""

# Uudet värit: tasavalta tilapäinen neutraali, kapinalliset 1644 lämpimin harmain.
VARIT = {
    'tasavalta': '#8a7560',
    'shun': '#8e8075',   # Li Zichengin Shun
    'daxi': '#a8968a',   # Zhang Xianzhong (Daxi julistettiin marraskuussa 1644)
}
KOTISEUDUT = {}
KAUPUNGIT = {}

# Yhteiset pysyvät reunat (samat kuin rajat.py:n 1760:ssä, jotta liukuma pysyy rauhallisena).
_HIMALAJA = [(79.2, 32.3), (80.5, 30.5), (83.5, 29.2), (86.0, 28.0), (88.0, 27.9), (89.5, 28.0), (92.0, 27.8),
             (95.5, 28.2), (97.5, 28.2)]
_BURMA_VIET = [(98.5, 26.0), (98.0, 24.0), (99.5, 22.2), (101.5, 21.2), (102.5, 22.3), (104.0, 22.8),
               (106.5, 22.5), (108.0, 21.5)]  # Burman raja, Sipsongpanna, Đại Việt -raja Mong Caihin
_ETELARANTA = [(108.0, 18.0), (110.5, 17.5), (114.0, 21.0)]  # Hainanin ympäri
_TIIBET_1760 = [  # Ü-Tsang ja Ngari; Kham ja Amdo kuuluvat 1760 ja 1873 maakuntiin
    (78.8, 34.3), (80.5, 35.4), (84.0, 35.6), (88.0, 35.4), (91.0, 34.0), (93.0, 33.4), (95.5, 32.8),
    (97.5, 31.0), (98.8, 30.0), (98.6, 28.3)] + _HIMALAJA[::-1][1:]
_MONGOLIA_1760 = [  # Ulko-Mongolia (Khalkha), Khovd ja Tannu Uriankhai
    (87.8, 49.2), (89.0, 50.5), (92.0, 51.5), (98.0, 52.5), (102.0, 51.7), (106.4, 50.3), (110.0, 49.9),
    (116.7, 49.85), (115.6, 48.2), (117.8, 47.9), (119.7, 47.2), (119.9, 46.7),
    (118.0, 46.7), (116.6, 46.3), (115.6, 45.4), (113.6, 44.75), (111.9, 43.7), (110.4, 42.8),  # Gobi
    (108.0, 42.4), (105.0, 41.6), (103.0, 42.1), (100.0, 42.6), (96.4, 42.7),
    (95.3, 44.2), (93.5, 44.9), (91.0, 45.3), (90.7, 46.5), (88.9, 48.0)]
# Venäjän raja Aigunin (1858) ja Pekingin (1860) sopimusten jälkeen: Argun, Amur, Ussuri, Khanka, Tumen.
_MONGOLIA_1912 = _MONGOLIA_1760[:8] + [  # Hulunbuir (barga) karkotti kiinalaiset 1912 ja liittyi Bogd-kaaniin
    (117.8, 49.8), (119.3, 51.2), (120.2, 52.5), (121.5, 53.3), (122.0, 52.0), (121.5, 50.5), (121.0, 48.5),
    (120.5, 47.3)] + _MONGOLIA_1760[11:]
_AMUR_USSURI = [
    (130.5, 42.4), (130.8, 42.7), (131.2, 43.2), (131.0, 44.1), (131.4, 44.8),  # Tumen ylös, Suifen
    (132.0, 45.0), (132.9, 45.3), (133.6, 46.0),  # Khankan poikki ja Song'acha Ussurille (Hutou)
    (134.0, 46.9), (134.3, 47.7), (134.7, 48.4),  # Ussuri Habarovskiin
    (133.0, 48.0), (132.5, 47.7), (131.0, 47.8), (130.2, 48.8), (129.3, 49.4), (127.5, 50.2),  # Amur: Tongjiang, Heihe
    (127.0, 50.9), (126.5, 51.9), (125.6, 53.1), (123.5, 53.5), (121.5, 53.3),  # Huma, Mohe, Shilkan suu
    (120.2, 52.5), (119.3, 51.2), (117.8, 49.8)]  # Argun

VUODET = {
    1280: {
        'otsikko': '1280', 'paakaupungit': ['Dadu'],
        'alueet': [
            ('Tiibet', 'mongol', 'protektoraatti', [  # Xuanzheng-virasto ja Sakya-hallinto: Ü-Tsang, Ngari, Kham ja Amdo
                (78.8, 34.3), (80.5, 35.4), (84.0, 35.6), (88.0, 35.4), (91.5, 35.6), (94.5, 35.6),  # Kunlun
                (97.5, 35.3), (99.5, 35.7), (101.2, 35.2), (102.4, 34.4),  # Amdo: Qinghai-järven eteläpuoli, Hezhoun virasto
                (102.8, 32.8), (102.3, 31.2), (101.8, 29.8), (101.0, 28.4),  # Songpan, Dartsedo: Khamin itäreuna
                (99.8, 28.0), (98.6, 28.3)] + _HIMALAJA[::-1][1:]),
            ('Yuan', 'mongol', 'ulkoinen', [
                (141.5, 53.2), (137.5, 54.3), (132.0, 54.2), (127.0, 53.8),  # Amurin suu (Nurgan), Uda, Zeya
                (121.5, 53.3), (116.5, 52.8), (110.0, 53.8), (106.5, 53.0), (104.0, 52.5),  # Shilka, Baikalin itä- ja etelärannat
                (98.0, 53.0), (92.0, 52.3), (89.0, 50.5),  # Sajanit ja Jenisein yläjuoksu (Lingbei), Altai
                (88.2, 48.5), (89.3, 46.5), (88.0, 44.8), (87.0, 43.6),  # Altai; Beshbaliq ja Qocho Yuanille, Kaidu lännessä
                (87.5, 42.2), (89.5, 41.7), (92.0, 40.8), (94.0, 40.4),  # Turfanin eteläreuna, Lop-aavikko, Shazhou (Dunhuang)
                (92.5, 39.0), (90.0, 37.6), (87.0, 36.2), (84.0, 35.6), (80.5, 35.4), (78.8, 34.3),  # Altyn Tagh, Tiibetin reuna
            ] + _HIMALAJA + [(98.5, 26.0), (97.7, 24.5), (98.2, 23.5), (99.3, 22.3), (100.8, 21.8),  # Dali 1253; Pagan ulkona
                (102.2, 22.4), (104.0, 22.8), (106.5, 22.5), (108.0, 21.5)] + _ETELARANTA + [
                (118.8, 23.3), (121.5, 26.5), (123.0, 30.0), (124.5, 37.0), (124.3, 39.9),  # Taiwan ulkona
                (124.6, 38.6), (125.8, 38.7), (126.8, 39.0), (127.4, 39.3), (128.2, 39.2),  # Dongnyeong ja Ssangseong (Pohjois-Korea)
                (129.8, 40.3), (131.0, 42.0), (133.0, 42.0), (138.5, 46.0), (140.5, 49.5), (141.2, 52.0),  # Primorje, Sahalin ulkona
            ]),
        ],
    },
    1421: {
        'otsikko': '1421', 'paakaupungit': ['Peking'],
        'alueet': [
            ('Ming', 'ming', 'kiina', [
                (124.3, 39.9), (125.0, 41.0), (124.6, 42.4), (123.4, 42.9), (122.0, 42.2),  # Liaodong: Yalu, Kaiyuan
                (120.6, 41.4), (119.4, 40.6), (117.6, 40.9), (117.0, 41.5),  # Liaoxi, Shanhaiguan, Miyun
                (116.9, 42.5), (115.4, 42.5), (114.8, 41.2),  # Kaipingin varuskunta (vetäytyi 1430)
                (113.6, 40.9), (112.0, 40.6), (111.0, 40.7), (110.0, 40.7), (108.0, 41.1),  # Datong, Keltaisen joen mutka (Hetao)
                (106.6, 40.4), (105.9, 39.2), (104.2, 38.9), (102.5, 39.0), (100.5, 39.4), (98.6, 40.0),  # Helan, Hexi
                (97.8, 39.6), (98.5, 38.8), (100.0, 37.8), (100.6, 36.9),  # Jiayuguan, Qilian, Xining
                (101.2, 35.7), (102.4, 34.4), (103.2, 33.0), (102.4, 31.2), (101.9, 29.6), (101.0, 28.1),  # Amdo ja Kham Mingin ulkopuolella
                (99.8, 27.7), (98.7, 27.6), (98.5, 26.0), (97.6, 24.8), (98.0, 24.0), (99.0, 22.3),  # Lijiang, Burman tusit
                (100.5, 21.5), (101.6, 21.3), (102.3, 22.3),  # Cheli (Sipsongpanna)
                (103.0, 21.2), (104.0, 20.3), (104.9, 19.2), (106.0, 17.9), (106.7, 16.8), (107.4, 16.0),  # Jiaozhi 1407–1427
                (108.3, 15.5), (109.8, 15.5), (110.5, 17.5), (114.0, 21.0),  # Champan raja Quảng Namissa; Hainan
                (118.8, 23.3), (121.5, 26.5), (123.0, 30.0), (124.5, 37.0),  # Taiwan ulkona
            ]),
            ('Hami', 'ming', 'protektoraatti', [  # Hamin vartiosto 1404 ja läntiset vartiostot (Shazhou, Chijin)
                (91.6, 42.6), (93.0, 43.6), (95.3, 43.3), (96.6, 42.1), (98.6, 40.0), (97.8, 39.6),
                (95.5, 39.2), (93.4, 39.6), (92.2, 40.5), (91.5, 41.7),
            ]),
            ('Nurgan', 'ming', 'protektoraatti', [  # Nurganin virasto 1409–1435 (Tyrin stele 1413), jurchen-vartiostot
                (122.6, 43.2), (124.6, 42.4), (125.6, 41.2), (126.5, 41.5), (128.2, 42.0), (130.5, 42.4),  # Yalu–Paektu–Tumen
                (131.0, 42.0), (133.0, 42.0), (138.5, 46.0), (140.5, 49.5), (141.2, 52.0), (141.5, 53.2),  # Japaninmeri
                (139.0, 53.8), (135.5, 53.4), (131.5, 52.3), (127.8, 51.0), (125.2, 50.2),  # Amurin pohjoisranta, Zeya
                (123.6, 48.6), (123.2, 46.2), (122.8, 44.5),  # Nen-joki: Uriankhai lännessä
            ]),
            ('Mongolit', 'mongol', 'ulkoinen', [  # Pohjoinen Yuan / itämongolit (Arughtai); oiraatit samassa värissä lännessä
                (87.8, 49.2), (89.0, 50.5), (92.0, 51.5), (98.0, 52.5), (102.0, 51.8), (106.5, 51.2), (111.0, 50.8),
                (116.0, 50.3), (119.5, 50.6), (121.6, 49.6), (123.6, 48.6), (123.2, 46.2), (122.8, 44.5), (123.5, 43.0),  # Khingan
                (122.0, 41.8), (120.2, 40.9), (117.5, 40.6), (116.2, 41.6), (114.0, 40.6), (111.0, 40.4),  # Mingin rajan yli
                (108.0, 40.8), (106.3, 40.0), (105.4, 38.9), (102.5, 38.8), (100.5, 39.2), (98.8, 39.9),  # Alxa
                (97.6, 40.6),  # Hamin vartiostot voittavat
                (96.4, 42.5), (94.5, 44.0), (91.0, 45.3), (90.6, 46.5), (88.9, 48.0),
            ]),
        ],
    },
    1644: {  # tilanne syyskuussa 1644: Qing Pekingissä 6.6. ja Shandongissa, Hongguang Nanjingissa 19.6., Zhang Chengdussa 9.9.
        'otsikko': '1644', 'paakaupungit': ['Mukden', 'Peking'],
        'alueet': [
            ('Qing', 'qing', 'ulkoinen', [
                (141.3, 53.4), (137.5, 54.0), (133.0, 53.2), (127.5, 53.6), (121.5, 53.3),  # Amur: daurit ja solonit (1639–40)
                (120.5, 51.5), (121.5, 50.0), (121.0, 48.5), (120.5, 47.3),  # Hinggan: Hulunbuir ei vahvistettu Qingille 1644
                (119.9, 46.7), (118.0, 46.7), (116.6, 46.3), (115.6, 45.4), (113.6, 44.75), (111.9, 43.7),  # Gobi: Khalkha ulkona
                (110.4, 42.8), (108.0, 42.3), (107.0, 41.4), (106.5, 40.3), (106.2, 39.0),  # Ordos (alistui 1636), Keltainen joki
                (107.6, 37.6), (109.7, 38.3), (110.6, 39.0), (111.5, 39.5),  # Mingin muuri: Dingbian, Yulin, Shenmu
                (112.5, 40.2), (113.6, 40.7), (114.3, 40.5),  # Datongin muuri; Shanxi vielä Shunilla
                (114.2, 39.3), (114.6, 38.3), (116.0, 38.3),  # Zhili: Taihang, Baoding
                (116.0, 36.0), (115.5, 34.8), (116.5, 34.6), (117.5, 34.5), (118.5, 34.8), (119.4, 35.1),  # Shandong Qingille
                (121.0, 35.0), (123.5, 36.5), (122.5, 39.0), (124.3, 39.9),  # meri, Liaodong
                (126.5, 41.5), (128.3, 42.0), (130.5, 42.4),  # Joseonin raja (vasalli 1637)
                (133.0, 42.0), (138.5, 46.0), (140.8, 50.0), (141.5, 52.5),  # Japaninmeri, Sahalin ulkona
            ]),
            ('Shun (Li Zicheng)', 'shun', 'kiina', [
                (97.8, 39.6), (98.6, 40.0), (100.5, 39.4), (102.5, 39.0), (104.2, 38.9), (105.9, 39.2),  # Hexi (1643)
                (106.5, 39.4), (107.8, 38.0), (109.7, 38.6), (110.8, 39.3), (111.6, 39.8),  # muuri: Qing voittaa
                (112.6, 40.5), (113.8, 41.0), (114.5, 40.8), (114.5, 39.3), (115.0, 38.6), (116.2, 38.6),
                (116.2, 38.0), (116.0, 36.0), (115.5, 34.8), (116.0, 34.0), (115.5, 32.5),  # Shandongin raja, Huai
                (114.5, 31.8), (113.0, 31.5), (111.5, 31.3), (110.0, 31.8),  # Xiangyang (Xiangjing 1643) Shunilla
                (108.0, 32.2), (106.0, 32.6), (104.5, 33.0), (103.5, 34.0), (102.4, 34.4),  # Daba, Hanzhong
                (101.2, 35.7), (100.6, 36.9), (100.0, 37.8), (98.5, 38.8),  # Xining, Qilian
            ]),
            ('Daxi (Zhang Xianzhong)', 'daxi', 'kiina', [  # Sichuanin allas: Chongqing 25.7., Chengdu 9.9.1644
                (110.4, 31.1), (109.8, 32.3), (108.4, 32.8), (106.5, 33.2), (105.0, 33.4),  # Daba: Shun voittaa (ei reikää Mingiin)
                (103.8, 33.6), (103.2, 31.5), (103.0, 30.5), (103.3, 29.5),  # Minin laakso, Chengdun tasanko
                (104.5, 28.8), (105.8, 28.6), (106.8, 29.2),  # Luzhou, Jangtse
                (107.8, 29.5), (108.8, 30.1), (110.0, 30.6),
            ]),
            ('Eteläinen Ming', 'ming', 'kiina', [
                (117.5, 34.5), (118.5, 34.8), (119.4, 35.1), (121.0, 35.0), (123.0, 35.0),  # Xuzhou Mingille, Shandong Qingin
                (123.0, 30.0), (121.5, 26.5), (118.8, 23.3)] + _ETELARANTA[::-1] + _BURMA_VIET[::-1] + [
                (98.7, 27.6), (99.8, 27.7), (101.0, 28.1), (101.9, 29.6), (102.4, 31.2), (103.2, 33.0),  # Yunnan, Länsi-Sichuan
                (103.8, 34.3), (106.0, 33.2), (110.0, 32.5), (113.0, 32.2), (115.0, 33.0),  # Shunin raja (Shun voittaa)
                (115.3, 34.5), (116.5, 34.6),
            ]),
        ],
    },
    1873: {
        'otsikko': '1873', 'paakaupungit': ['Peking'],
        'alueet': [
            ('Tiibet', 'qing', 'protektoraatti', _TIIBET_1760),  # ambanit Lhasassa kuten 1760
            ('Mongolia', 'qing', 'protektoraatti', _MONGOLIA_1760),
            ('Qing', 'qing', 'ulkoinen', _AMUR_USSURI + [
                (116.0, 50.0), (110.0, 49.9), (106.4, 50.3), (102.0, 51.7),  # Kjahta (1727)
                (98.0, 52.5), (92.0, 51.5), (89.0, 50.5), (87.5, 49.2),  # Sajanit, Tuva, Altai
                (86.0, 48.6), (85.5, 47.1), (83.0, 47.2), (82.3, 46.0), (82.6, 45.3),  # Tarbagatain sopimus 1864
                (83.8, 45.0), (85.0, 44.7),  # Ili Venäjän miehittämä 1871–1881
                (86.5, 44.9), (88.5, 44.7), (90.5, 44.2), (91.6, 43.3),  # Urumqi ja Turfan Yakub Begillä (1870)
                (91.6, 42.4), (92.2, 41.2), (93.0, 40.3), (92.0, 39.3),  # Hami ja Barkol Qingillä
                (90.0, 38.0), (87.5, 36.7), (85.0, 35.9), (84.0, 35.6), (80.5, 35.4), (78.8, 34.3),  # Kashgaria ulkona
            ] + _HIMALAJA + _BURMA_VIET + _ETELARANTA + [
                (121.0, 21.5), (122.5, 22.0), (122.5, 25.5), (123.0, 30.0), (124.5, 37.0), (124.3, 39.9),  # Taiwan Qingillä
                (126.5, 41.5), (128.3, 42.0),  # Joseonin raja
            ]),
        ],
    },
    1912: {  # Puyi luopui 12.2.1912; Yuan Shikai siirsi hallituksen Nanjingista Pekingiin maaliskuussa
        'otsikko': '1912', 'paakaupungit': ['Peking'],
        'alueet': [
            ('Tiibet', 'tiibet', 'ulkoinen', _TIIBET_1760),  # de facto itsenäinen: kiinalaisjoukot ulos 12.8.1912; tasavalta vaati
            ('Mongolia', 'mongol', 'ulkoinen', _MONGOLIA_1912),  # de facto itsenäinen: Bogd-kaani 29.12.1911; tasavalta vaati
            ('Kiinan tasavalta', 'tasavalta', 'kiina', _AMUR_USSURI + [
                (116.0, 50.0), (110.0, 49.9), (106.4, 50.3), (102.0, 51.7),
                (98.0, 52.5), (92.0, 51.5), (89.0, 50.5), (87.5, 49.2),
                (86.0, 48.6), (85.5, 47.1), (83.0, 47.2), (82.3, 46.0), (82.6, 45.3),  # Tarbagatai
                (80.5, 45.0), (80.2, 44.2), (80.6, 43.1), (80.2, 42.1),  # Ili palautettu (Pietari 1881), Khorgos
                (78.2, 41.2), (76.5, 40.6), (75.4, 40.5), (73.9, 39.6),  # Tian Shan, Torugart, Irkeštam
                (74.9, 38.4), (74.9, 37.2), (75.6, 36.8), (77.0, 35.6), (79.0, 33.0),  # Sarikol (Pamir Venäjälle 1892)
            ] + _HIMALAJA + _BURMA_VIET + _ETELARANTA + [
                (118.8, 23.3), (119.9, 25.0), (121.5, 26.5),  # Taiwan Japanille 1895
                (123.0, 30.0), (124.5, 37.0), (124.3, 39.9), (126.5, 41.5), (128.3, 42.0),  # Korea Japanin 1910
            ]),
        ],
    },
}
