"""KIINAN DYNASTIAT -LINSSI: OMAT RAJAT (Karttaseppä 16.10.2026, CC0).

Jokainen alue on käsin piirretty kärkilista (lon, lat), ankkuroitu maastoon ja tunnettuihin paikkoihin (kommentit).
Rannikko tulee Natural Earthin maasta (PD): merelle ulottuvat kärjet leikataan maan reunaan. Naapurit vähennetään
järjestyksessä (aiempi alue voittaa), joten yhteistä rajaa ei tarvitse piirtää kahdesti.
Cliopatria (CC BY 4.0) on vain vertailukuvan katkoviiva, ei geometrian lähde.
"""
import os, sys

# Värit (suunnitelma luku 3).
VARIT = {
    'qin': '#4a3a32', 'han': '#a8432f', 'jin-etela': '#b4603c', 'tang': '#c25a2c', 'song': '#b86a4a', 'ming': '#9e2f36',
    'wei': '#8f4a34', 'shu': '#b5714d', 'wu': '#c98a5a',
    'xiongnu': '#5f7b69', 'xianbei': '#3f7f7a', 'tiibet': '#6b4f86', 'liao': '#3d6595', 'xia': '#2f8f95',
    'jurchen': '#4d6c8c', 'mongol': '#34406f', 'qing': '#41709c',  # omistaja 16.10. 20.35: viileä sininen, Jinin (jurchen) sukulaisväri
}

# Kotiseudut (suunnitelma luku 4): näkyvät vinoviivoin aina, kun kansa on kartalla.
KOTISEUDUT = {
    'xiongnu': [(101, 44), (103, 48.5), (108, 50), (114, 48.5), (113, 44.5), (111, 42.3), (107, 41.6), (104, 42.2)],  # Mongolian ylänkö
    'xianbei': [(111.0, 39.8), (113.5, 39.5), (114.8, 40.5), (114.0, 41.8), (111.5, 41.6)],  # Dai ja Pingcheng (Datong)
    'tiibet': [(88.5, 29.0), (91.0, 28.6), (93.5, 29.0), (93.5, 30.5), (90.5, 30.8), (88.5, 30.0)],  # Yarlung ja Lhasa
    'liao': [(116.5, 42.5), (119.5, 42.0), (122, 43), (121.5, 45), (118.5, 45.5), (116.5, 44.5)],  # Xar Moron, Shangjing
    'xia': [(104.5, 37.5), (106.0, 36.8), (107.5, 37.5), (107.8, 39.5), (106.5, 40.3), (105.0, 39.8)],  # Ningxia ja Ordos
    'jurchen': [(124.5, 44.0), (127.5, 43.8), (130.0, 45.0), (129.5, 47.0), (127.0, 47.5), (124.8, 46.5)],  # Songhua, Huining
    'mongol': [(102, 46), (104, 48.5), (108, 49.5), (112, 48.8), (113, 47), (108, 46.5), (104, 45.5)],  # Onon, Kerulen, Karakorum
    'qing': [(121.8, 41.2), (124.0, 40.6), (126.5, 41.3), (128.0, 42.5), (127.5, 44.5), (125.0, 45.0), (122.5, 43.5)],  # Hetu Ala, Mukden
}

# Pääkaupungit (oma CC0-taulukko tekstifaktoista).
KAUPUNGIT = {
    'Xianyang': (108.71, 34.33), "Chang'an": (108.94, 34.34), 'Luoyang': (112.45, 34.62), 'Jiankang': (118.78, 32.06),
    'Kaifeng': (114.31, 34.80), 'Lin\'an': (120.16, 30.27), 'Dadu': (116.39, 39.91), 'Nanjing': (118.78, 32.06),
    'Peking': (116.39, 39.91), 'Shangjing (Jin)': (126.97, 45.51), 'Zhongdu': (116.35, 39.87), 'Xingqing': (106.23, 38.47),
    'Pingcheng': (113.30, 40.08), 'Lhasa': (91.13, 29.65), 'Shangjing (Liao)': (119.18, 43.95), 'Karakorum': (102.83, 47.20),
    'Mukden': (123.43, 41.80), 'Chengdu': (104.07, 30.66), 'Jianye': (118.78, 32.06), 'Xiongnun hovi': (104.0, 47.0),
}

VUODET = {
    -221: {
        'otsikko': '221 eaa', 'paakaupungit': ['Xianyang'],
        'alueet': [
            ('Qin', 'qin', 'kiina', [
                (125.0, 41.5), (124.5, 39.8),  # Liaodong, Yalun suu
                (122.5, 37.5), (123.5, 33.0), (123.0, 29.5),  # meri: Shandong, Jangtsen suu, Zhejiang
                (121.8, 28.3), (119.6, 28.1), (118.3, 28.0), (117.0, 27.5),  # Minyuen (Fujian) raja Wuyi-vuorilla
                (115.5, 26.4), (113.6, 25.5), (111.6, 25.3), (110.0, 25.8),  # Nanling: Chu ei vielä Lingnanissa
                (109.0, 27.2), (108.0, 28.5), (106.0, 28.2), (104.5, 28.6), (103.0, 29.0),  # Länsi-Hunan, Ba ja Shu
                (102.6, 30.2), (103.0, 31.8), (104.0, 33.2), (103.7, 34.6),  # Shun länsireuna, Longxi
                (104.2, 35.8), (105.2, 36.6), (106.6, 37.3),  # Lintaon muuri koilliseen
                (108.5, 37.9), (110.2, 39.0), (111.0, 40.3), (111.8, 40.9),  # Ordos on vielä aron väen; Yunzhong
                (113.5, 41.2), (116.0, 41.3), (118.5, 41.8), (121.0, 42.3), (123.5, 42.3),  # Zhaon ja Yanin muurit
            ]),
            ('Xiongnut', 'xiongnu', 'ulkoinen', [
                (101.0, 40.5), (100.0, 44.5), (102.5, 48.5), (107.5, 50.0), (113.0, 49.0), (115.0, 46.0),
                (114.0, 42.5), (111.8, 40.9), (110.2, 39.0), (108.5, 37.9), (106.6, 37.3), (104.5, 38.5),
            ]),
        ],
    },
    -100: {
        'otsikko': '100 eaa', 'paakaupungit': ["Chang'an", 'Xiongnun hovi'],
        'alueet': [
            ('Han', 'han', 'kiina', [
                (128.3, 41.6), (127.6, 39.6), (127.3, 37.8), (126.0, 37.2),  # Xuantu ja Lelang (108 eaa), raja Han-joella
                (124.6, 35.5), (123.5, 30.0), (121.5, 26.5), (118.8, 23.3),  # meri; Taiwanin salmi
                (116.0, 21.3), (112.5, 20.4), (111.6, 18.0), (109.5, 17.6), (108.6, 17.0),  # Hainanin ympäri
                (108.8, 16.0), (107.2, 16.2), (105.6, 18.5), (104.0, 20.6),  # Rinan (n. 16° P), Annamin vuoret
                (103.0, 22.5), (101.6, 22.9), (100.9, 24.0), (100.0, 25.6),  # Yizhou (Dian) 109 eaa, Erhai
                (100.6, 27.6), (102.0, 28.6), (102.3, 30.2), (102.9, 32.0), (103.5, 34.0),  # Yuexi, Shun länsireuna
                (102.6, 35.9), (101.4, 37.4), (99.0, 38.4), (96.8, 39.4), (94.0, 39.7),  # Qilianin juuri, Hexi (121 eaa)
                (93.4, 40.0), (91.5, 40.1), (91.5, 40.5), (93.6, 40.6),  # Yumen ja Yang-solat, vartiotornit kohti Lop Noria
                (95.8, 40.6), (98.4, 40.2), (99.8, 40.6), (100.5, 42.1), (101.3, 41.9), (102.3, 40.0),  # Juyan
                (104.2, 39.6), (106.2, 40.8), (108.2, 41.2), (110.5, 41.3), (112.5, 41.3),  # Shuofang, Wuyuan, Yunzhong
                (115.0, 41.5), (117.5, 41.8), (120.0, 42.4), (122.5, 42.6), (125.5, 42.4), (127.0, 42.2),
            ]),
            ('Xiongnut', 'xiongnu', 'ulkoinen', [
                (79.0, 41.2), (82.0, 44.5), (86.5, 48.5), (91.5, 51.0), (99.0, 52.0), (107.0, 52.0), (114.5, 50.5),
                (119.0, 48.5), (119.5, 45.0), (117.5, 43.0), (115.0, 41.5), (110.5, 41.3), (104.2, 39.6),
                (100.5, 42.1), (95.8, 40.6), (89.0, 42.5), (84.0, 42.0),  # Turfan ja Tarimin pohjoisreuna (Tongpu)
            ]),
        ],
    },
    1142: {
        'otsikko': '1142', 'paakaupungit': ["Lin'an", 'Shangjing (Jin)', 'Xingqing', 'Yangjumie'],
        'alueet': [
            ('Eteläinen Song', 'song', 'kiina', [
                (103.4, 34.0), (105.5, 34.3), (106.9, 34.2),  # Dasan-sola
                (108.5, 33.7), (110.5, 33.3), (111.6, 32.9), (113.0, 32.6), (114.5, 32.4),  # Qinling, Xiangyang Songille
                (116.0, 32.6), (117.5, 32.9), (118.6, 33.2), (119.6, 33.7), (120.8, 34.0),  # Huai-joki (Shaoxingin rauha)
                (122.8, 30.5), (121.5, 26.5), (118.8, 23.3), (116.0, 21.3), (112.5, 20.4),  # meri, Taiwanin salmi
                (111.6, 18.0), (109.5, 17.6), (108.3, 18.3), (108.0, 21.4),  # Hainan; Mong Cai
                (107.0, 22.0), (106.6, 22.5), (105.6, 23.1), (104.8, 24.4),  # Đại Việt -raja
                (105.2, 26.4), (104.5, 28.0), (103.2, 28.5), (102.3, 29.4),  # Dalin raja, Dadu-joki
                (102.0, 30.6), (102.6, 32.1), (103.0, 33.3),
            ]),
            ('Länsi-Xia', 'xia', 'ulkoinen', [
                (92.8, 40.4), (95.5, 41.6), (97.5, 42.1), (100.5, 42.6), (104.0, 42.2), (107.0, 41.7), (108.6, 41.1),
                (110.4, 39.5), (110.3, 38.0), (109.0, 37.3), (107.5, 36.5), (106.4, 35.9), (105.2, 35.9),
                (103.8, 36.2), (102.4, 36.7), (101.0, 37.5), (99.0, 38.3), (96.6, 39.2), (94.0, 39.6),
            ]),
            ('Jin', 'jurchen', 'ulkoinen', [
                (108.6, 41.1), (110.2, 42.6), (113.0, 44.2), (116.0, 45.8), (119.2, 47.6), (121.2, 49.8),  # Jinin muuri
                (124.0, 50.6), (127.5, 50.2), (130.6, 48.6), (134.6, 48.4), (138.5, 47.5),  # Amur, Ussuri
                (136.0, 44.5), (131.5, 42.6), (130.5, 42.3),  # Japaninmeri; Tumen
                (128.2, 42.0), (126.0, 41.2), (124.4, 40.0),  # Goryeon raja Yalulla
                (123.2, 38.5), (123.2, 36.5), (121.0, 34.4),  # Liaodongin ja Shandongin edustan meri
                (120.0, 33.0), (114.5, 31.5), (110.5, 32.5), (106.9, 33.5), (103.0, 33.4),  # Song-raja (Song vähennetään ensin)
                (102.4, 36.7), (105.2, 35.9), (107.5, 36.5), (110.3, 38.0), (110.4, 39.5),  # Xia-raja
            ]),
            ('Dali', 'dali', 'ulkoinen', []),  # kärjet vuodet_b.DALI (täytetään alla, sama monikulmio kuin 950 ja 1100)
        ],
    },
    1760: {
        'otsikko': '1760', 'paakaupungit': ['Peking', 'Mukden'],
        'alueet': [
            ('Tiibet', 'qing', 'protektoraatti', [  # Qingin protektoraatti (ambanit Lhasassa 1727/1751); Kham ja Amdo maakuntina
                (78.8, 34.3), (80.5, 35.4), (84.0, 35.6), (88.0, 35.4), (91.0, 34.0), (93.0, 33.4), (95.5, 32.8),
                (97.5, 31.0), (98.8, 30.0), (98.6, 28.3), (97.5, 28.2), (95.5, 28.2), (92.0, 27.8), (89.5, 28.0),
                (88.0, 27.9), (86.0, 28.0), (83.5, 29.2), (80.5, 30.5), (79.2, 32.3),
            ]),
            ('Mongolia', 'qing', 'protektoraatti', [  # Ulko-Mongolia (Khalkha 1691, Uliastain kenraali) ja Tannu Uriankhai
                (87.8, 49.2), (89.0, 50.5), (92.0, 51.5), (98.0, 52.5), (102.0, 51.7), (106.4, 50.3), (110.0, 49.9),
                (116.7, 49.85), (115.6, 48.2), (117.8, 47.9), (119.7, 47.2), (119.9, 46.7),  # Hulunbuir jää Heilongjiangille
                (118.0, 46.7), (116.6, 46.3), (115.6, 45.4), (113.6, 44.75), (111.9, 43.7), (110.4, 42.8),  # Gobi: Sisä-Mongolian raja
                (108.0, 42.4), (105.0, 41.6), (103.0, 42.1), (100.0, 42.6), (96.4, 42.7),  # Alxa ja Hexi Qingin maakuntia
                (95.3, 44.2), (93.5, 44.9), (91.0, 45.3), (90.7, 46.5), (88.9, 48.0),  # Khovd; Dzungaria (Ili 1759) sotilashallinnossa
            ]),
            ('Qing', 'qing', 'ulkoinen', [
                (141.0, 53.5), (138.0, 55.0), (135.0, 55.3), (127.0, 55.8), (121.5, 53.3),  # Uda, Stanovoi (Nertšinsk 1689)
                (117.5, 49.8), (116.0, 50.0), (110.0, 49.9), (106.4, 50.3), (102.0, 51.7),  # Argun, Kjahta (1727)
                (98.0, 52.5), (92.0, 51.5), (89.0, 50.5), (87.5, 49.2),  # Sajanit, Tuva, Altai
                (83.0, 49.0), (80.0, 48.0), (76.0, 46.6), (74.5, 44.0), (73.5, 40.5),  # Tarbagatai, Ili (1759), Kašgar
                (73.8, 39.0), (74.8, 37.0), (77.0, 35.6), (79.0, 33.0), (79.2, 32.3),  # Pamir, Karakorum, Länsi-Tiibet
                (80.5, 30.5), (83.5, 29.2), (86.0, 28.0), (88.0, 27.9), (89.5, 28.0), (92.0, 27.8),  # Himalaja
                (95.5, 28.2), (97.5, 28.2), (98.5, 26.0), (98.0, 24.0), (99.5, 22.2), (101.5, 21.2),  # Burman raja
                (102.5, 22.3), (104.0, 22.8), (106.5, 22.5), (108.0, 21.5),  # Đại Việt
                (108.0, 18.0), (110.5, 17.5), (114.0, 21.0), (121.0, 21.5), (122.5, 22.0),  # Hainan, Taiwan
                (122.5, 25.5), (123.0, 30.0), (124.5, 37.0), (124.3, 39.9),  # meri, Yalun suu
                (126.5, 41.5), (128.3, 42.0), (130.5, 42.4),  # Joseonin raja: Yalu, Paektu, Tumen
                (133.0, 42.0), (138.5, 46.0), (142.5, 50.0), (143.8, 54.0),  # Primorje ja Sahalin
            ]),
        ],
    },
}


# Osamoduulit (vuodet_*.py): kukin määrittää VUODET ja tarvittaessa uudet VARIT, KOTISEUDUT ja KAUPUNGIT.
import importlib, glob as _glob
for _p in sorted(_glob.glob(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'vuodet_*.py'))):
    try:
        _m = importlib.import_module(os.path.basename(_p)[:-3])
    except Exception as _e:
        print('VAROITUS: osamoduuli ohitettu', os.path.basename(_p), _e, file=sys.stderr); continue
    for _nimi in ('VARIT', 'KOTISEUDUT', 'KAUPUNGIT', 'VUODET'):
        globals()[_nimi].update(getattr(_m, _nimi, {}))
    if hasattr(_m, 'DALI'):  # 1142:n Dali samoista kärjistä kuin 950 ja 1100
        VUODET[1142]['alueet'] = [(n, a, t, _m.DALI if a == 'dali' else k) for n, a, t, k in VUODET[1142]['alueet']]
