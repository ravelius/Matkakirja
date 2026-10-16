"""Kiinan dynastiat -linssin lisäkerrokset (Karttaseppä 17.10.2026; omistajan päätös 01.25 PT:n kautta): omat piirrokset (CC0)
julkisista paikkakoordinaateista, [lon, lat]. Tarkkuus on pallon mittakaavassa (~10–30 km); reitit kulkevat tunnettujen
asemapaikkojen kautta. Muoto: data/linssit/kiinan-dynastiat/MUOTO-KERROKSET.md. Vie: kerrokset.py.
"""

# --- muurit (rakennus- ja käyttöaika) ---------------------------------------------------------------------------------
MUURIT = [
    dict(avain='qin', nimi='Qinin muuri', alku=-214, loppu=-206, osat=[[
        (103.86, 35.38), (104.6, 35.9), (106.3, 36.0), (107.1, 37.0), (108.6, 38.6), (109.9, 40.0), (110.0, 40.8),
        (111.7, 41.1), (113.0, 41.3), (114.9, 41.4), (116.6, 41.6), (118.9, 42.0), (120.6, 42.1), (122.3, 42.0),
        (123.2, 41.4), (124.5, 40.6)]]),
    dict(avain='han', nimi='Hanin muuri', alku=-121, loppu=220, osat=[
        [(93.86, 40.35), (95.8, 40.4), (97.0, 40.2), (98.5, 39.9), (100.45, 39.1), (101.6, 38.6), (102.64, 38.1),
         (103.4, 37.4), (103.83, 36.3)],
        [(103.86, 35.38), (104.6, 35.9), (106.3, 36.0), (107.1, 37.0), (108.6, 38.6), (109.9, 40.0), (110.0, 40.8),
         (111.7, 41.1), (113.0, 41.3), (114.9, 41.4), (116.6, 41.6), (118.9, 42.0), (120.6, 42.1), (122.3, 42.0),
         (123.2, 41.4), (124.5, 40.6)]]),
    dict(avain='qi-sui', nimi='Pohjois-Qin ja Suin muuri', alku=552, loppu=618, osat=[[
        (111.1, 38.1), (111.5, 39.4), (112.4, 39.9), (113.3, 40.2), (114.2, 40.6), (114.9, 40.85), (116.07, 40.29),
        (117.15, 40.69), (118.3, 40.4), (119.75, 40.0)]]),
    dict(avain='ming', nimi='Mingin muuri', alku=1368, loppu=1644, osat=[
        [(98.22, 39.80), (99.8, 39.4), (101.1, 38.8), (101.97, 38.25), (102.9, 37.7), (104.1, 37.2), (105.2, 37.6),
         (105.9, 38.3), (106.3, 38.6), (107.4, 37.8), (107.6, 37.6), (108.8, 37.6), (109.7, 38.3), (110.5, 38.8),
         (111.07, 39.03), (111.5, 39.4), (112.4, 39.9), (113.3, 40.3), (114.9, 40.85), (116.0, 40.36), (116.57, 40.43),
         (117.15, 40.69), (118.3, 40.4), (119.75, 40.0), (119.79, 39.97)],
        [(119.75, 40.0), (120.6, 40.9), (121.1, 41.6), (122.4, 42.2), (123.6, 42.6), (124.0, 42.5), (124.1, 41.9),
         (124.4, 41.0), (124.4, 40.1)]]),
]

# --- Keltainen joki: yhteinen yläjuoksu Huayuankouhun asti, sitten kolme alajuoksua -------------------------------------
_YLA = [(103.8, 36.06), (104.6, 36.6), (105.2, 37.5), (106.3, 38.5), (106.8, 39.65), (107.4, 40.75), (108.6, 40.8),
        (110.0, 40.55), (111.2, 40.25), (111.15, 39.38), (110.9, 38.4), (110.7, 37.45), (110.5, 36.5), (110.6, 35.65),
        (110.25, 34.6), (111.2, 34.8), (112.4, 34.85), (113.6, 34.95)]
JOET = [
    dict(avain='huanghe-pohjoinen', nimi='Keltainen joki', alku=-602, loppu=1128, osat=[_YLA + [
        (114.4, 35.3), (115.0, 35.75), (115.15, 36.28), (115.3, 36.55), (115.7, 37.0), (116.0, 37.4), (116.4, 37.9),
        (116.85, 38.3), (117.3, 38.6), (117.6, 38.8)]]),
    dict(avain='huanghe-etela', nimi='Keltainen joki', alku=1128, loppu=1855, osat=[_YLA + [
        (114.35, 34.85), (115.0, 34.65), (115.6, 34.5), (116.35, 34.42), (117.2, 34.27), (117.8, 34.1), (118.3, 33.95),
        (119.1, 33.6), (119.7, 33.9), (120.3, 34.2)]]),
    dict(avain='huanghe-nyky', nimi='Keltainen joki', alku=1855, loppu=None, osat=[_YLA + [
        (114.3, 34.92), (114.8, 34.9), (115.1, 35.3), (115.9, 35.9), (116.5, 36.3), (117.0, 36.72), (117.6, 37.1),
        (118.0, 37.4), (118.25, 37.5), (118.7, 37.65), (119.1, 37.75)]]),
]

# --- Suuri kanava ------------------------------------------------------------------------------------------------------
_JIANGNAN = [(119.42, 32.39), (119.45, 32.2), (119.97, 31.81), (120.3, 31.57), (120.62, 31.3), (120.75, 30.75), (120.16, 30.27)]
KANAVAT = [
    dict(avain='sui', nimi='Suuri kanava', alku=605, loppu=1289, osat=[
        [(112.45, 34.62), (113.4, 34.8), (114.35, 34.8), (115.65, 34.42), (116.98, 33.64), (117.88, 33.48),
         (118.5, 33.0), (119.0, 32.7)] + _JIANGNAN,
        [(112.45, 34.62), (113.4, 35.0), (114.07, 35.4), (114.5, 36.6), (115.7, 36.85), (116.3, 37.45), (116.85, 38.3),
         (117.2, 39.1), (116.4, 39.9)],
        [(108.94, 34.26), (109.5, 34.45), (110.25, 34.6), (111.2, 34.8), (112.45, 34.62)]]),
    dict(avain='yuan', nimi='Suuri kanava', alku=1293, loppu=None, osat=[
        [(116.4, 39.9), (116.66, 39.9), (117.2, 39.13), (116.85, 38.3), (116.3, 37.45), (115.7, 36.85), (115.98, 36.45),
         (116.59, 35.41), (117.0, 34.75), (117.2, 34.27), (118.3, 33.95), (119.1, 33.6), (119.45, 32.78)] + _JIANGNAN]),
]

# --- reitit (osat ajassa; pysäkit vuosineen) ---------------------------------------------------------------------------
_HEXI = [(108.94, 34.26), (105.72, 34.58), (103.83, 36.06), (102.64, 37.93), (100.45, 38.93), (98.5, 39.75), (94.66, 40.14)]
REITIT = [
    dict(avain='silkkitie', nimi='Silkkitie', alku=-130, loppu=1450, osat=[
        dict(p=_HEXI),
        dict(p=[(94.66, 40.14), (93.5, 42.83), (89.18, 42.95), (86.15, 41.76), (82.96, 41.72), (80.26, 41.17), (75.99, 39.47)]),
        dict(p=[(94.66, 40.14), (88.97, 39.23), (85.53, 38.14), (82.69, 37.07), (79.92, 37.11), (77.24, 38.42), (75.99, 39.47)]),
        dict(p=[(75.99, 39.47), (73.9, 39.7), (72.8, 40.53), (71.78, 40.38), (69.6, 40.28), (66.96, 39.65), (64.42, 39.77),
                (61.84, 37.66), (60.0, 37.3)]),
        dict(p=[(75.99, 39.47), (75.23, 37.77), (73.0, 37.0), (70.58, 37.12), (66.9, 36.76), (63.0, 36.5), (60.0, 36.3)])],
        pysakit=[dict(nimi="Chang'an", lon=108.94, lat=34.26), dict(nimi='Dunhuang', lon=94.66, lat=40.14),
                 dict(nimi='Kashgar', lon=75.99, lat=39.47), dict(nimi='Samarkand', lon=66.96, lat=39.65)]),
    dict(avain='marco-polo', nimi='Marco Polo', alku=1271, loppu=1295, osat=[
        dict(alku=1271, loppu=1275, p=[(60.0, 36.6), (63.0, 36.7), (66.9, 36.76), (70.58, 37.12), (72.5, 37.0), (74.5, 37.5),
             (75.99, 39.47), (77.24, 38.42), (79.92, 37.11), (82.69, 37.07), (85.53, 38.14), (88.0, 39.0), (94.66, 40.14),
             (98.5, 39.75), (100.45, 38.93), (102.64, 37.93), (106.27, 38.47), (108.5, 40.4), (111.65, 40.82),
             (116.18, 42.36), (116.4, 39.9)]),
        dict(alku=1280, loppu=1287, p=[(116.4, 39.9), (115.97, 39.49), (112.55, 37.87), (110.25, 34.6), (108.94, 34.26),
             (106.6, 32.5), (104.07, 30.67), (102.3, 27.9), (100.23, 25.6)]),
        dict(alku=1282, loppu=1290, p=[(116.4, 39.9), (116.59, 35.41), (117.2, 34.27), (119.1, 33.6), (119.42, 32.39),
             (120.62, 31.3), (120.16, 30.27), (119.3, 26.08), (118.59, 24.91)]),
        dict(alku=1291, loppu=1295, p=[(118.59, 24.91), (116.5, 21.8), (112.0, 17.0), (109.4, 13.8), (108.5, 8.5),
             (105.5, 2.5), (103.9, 1.25), (101.0, 3.2), (98.5, 5.0), (97.2, 5.25), (95.4, 5.9), (88.0, 6.0), (80.22, 6.03),
             (77.5, 7.6), (76.2, 9.9), (75.78, 11.25), (73.5, 16.5), (72.6, 21.0), (68.0, 24.0), (63.5, 25.1), (60.0, 25.2)])],
        pysakit=[dict(nimi='Kashgar', lon=75.99, lat=39.47, vuosi=1273), dict(nimi='Shangdu', lon=116.18, lat=42.36, vuosi=1275),
                 dict(nimi='Khanbaliq', lon=116.4, lat=39.9, vuosi=1275), dict(nimi='Kinsai (Hangzhou)', lon=120.16, lat=30.27, vuosi=1285),
                 dict(nimi='Zaiton (Quanzhou)', lon=118.59, lat=24.91, vuosi=1291), dict(nimi='Sumatra', lon=97.2, lat=5.25, vuosi=1292)]),
    dict(avain='zheng-he', nimi='Zheng He', alku=1405, loppu=1433, osat=[
        dict(p=[(118.78, 32.06), (120.3, 31.9), (121.25, 31.6), (122.5, 30.5), (121.0, 27.5), (119.7, 25.9), (119.5, 24.0),
                (116.5, 21.5), (111.5, 17.5), (109.4, 13.8), (108.5, 8.5), (107.5, 3.0), (108.0, -3.5), (112.75, -6.9),
                (110.0, -5.5), (106.5, -4.5), (105.7, -2.5), (104.75, -2.6), (104.6, 0.8), (103.9, 1.25), (102.25, 2.19),
                (100.4, 3.8), (98.5, 5.0), (97.15, 5.15), (95.4, 5.9), (88.0, 6.0), (80.22, 6.03), (77.5, 7.6), (76.2, 9.9),
                (75.78, 11.25), (70.0, 15.0), (63.0, 21.0), (60.0, 23.0)])],
        pysakit=[dict(nimi='Nanjing', lon=118.78, lat=32.06, vuosi=1405), dict(nimi='Champa', lon=109.2, lat=13.78, vuosi=1405),
                 dict(nimi='Malakka', lon=102.25, lat=2.19, vuosi=1409), dict(nimi='Ceylon', lon=80.22, lat=6.03, vuosi=1410),
                 dict(nimi='Calicut', lon=75.78, lat=11.25, vuosi=1407)]),
]

# --- väestö: koko Kiina (milj.) avainvuosille ja 10 alueen osuudet aikakausittain (arvio) --------------------------------
ALUEET = [('Guanzhong', 108.9, 34.3), ('Keskinen tasanko', 113.9, 34.6), ('Hebei', 115.0, 38.2), ('Shandong', 117.6, 36.4),
          ('Shanxi', 112.5, 37.6), ('Sichuan', 104.5, 30.4), ('Hubei–Hunan', 112.6, 29.6), ('Jiangxi', 115.9, 28.0),
          ('Jiangnan', 120.0, 31.0), ('Fujian–Guangdong', 115.5, 24.3)]
OSUUDET = {   # järjestys kuten ALUEET; summa 1
    'han':   (.12, .25, .13, .17, .06, .07, .08, .03, .06, .03),
    'jako':  (.10, .17, .14, .14, .07, .09, .10, .05, .10, .04),
    'tang':  (.05, .12, .09, .10, .06, .13, .12, .12, .14, .07),
    'song':  (.03, .10, .08, .08, .05, .08, .12, .15, .20, .11),
    'qing':  (.04, .10, .09, .10, .05, .10, .15, .08, .17, .12),
}
# (vuosi, milj., arvio, aikakausi, huomautus)
VAESTO = [(-221, 20, True, 'han', ''), (-200, 18, True, 'han', ''), (-100, 35, True, 'han', ''),
          (140, 49.7, False, 'han', 'Hanin väestölaskenta 140'), (250, 25, True, 'jako', ''), (440, 30, True, 'jako', ''),
          (500, 32, True, 'jako', ''), (589, 46.0, False, 'jako', 'Suin väestölaskenta 609'), (669, 40, True, 'tang', ''),
          (790, 40, True, 'tang', ''), (950, 50, True, 'tang', ''), (1100, 100, True, 'song', 'Songin kotitalouslaskenta 1102'),
          (1142, 90, True, 'song', ''), (1280, 58.8, False, 'song', 'Yuanin väestölaskenta 1290'),
          (1421, 65, True, 'song', 'Mingin laskenta 1393: 60,5 milj.'), (1644, 120, True, 'qing', ''),
          (1760, 200, False, 'qing', 'Qingin väestölaskenta 1762'), (1873, 350, True, 'qing', 'Taipingin kapinan jälkeen'),
          (1912, 430, True, 'qing', '')]

# --- viisi ratkaisevaa taistelua -------------------------------------------------------------------------------------
TAISTELUT = [
    dict(avain='changping', nimi='Changping', vuosi=-260, lon=112.92, lat=35.80, epavarma=True, tausta=True, voittaja='qin', havio='zhao',
         seuraus='Qin murskaa Zhaon ja yhdistää Kiinan 221 eaa'),
    dict(avain='punainen-kallio', nimi='Punainen kallio', vuosi=208, lon=113.62, lat=29.87, epavarma=True, voittaja='wu', havio='wei',
         # paikka kiistanalainen: Jangtse Baqiun (Yueyang) koillispuolelta Wuhanin lounaispuolelle; piste = Chibin kaupungin
         # (ent. Puqi) muistomerkkipaikka, Cao Caon leiri Wulin vastarannalla (Honghu)
         alue=dict(viiva=[(113.15, 29.47), (113.37, 29.65), (113.62, 29.84), (113.92, 29.98), (114.12, 30.32)], sade_km=12),
         seuraus='Cao Caon tappio jakaa Kiinan kolmeksi kuningaskunnaksi'),
    dict(avain='fei-joki', nimi='Fei-joki', vuosi=383, lon=116.78, lat=32.58, epavarma=True, voittaja='jin', havio='entinen-qin',
         # Fei-joki (Dong Fei) laskee Huaihin Shouchunin (Shouxian) luona; joen 383 uoma ja taistelupaikka tuntematon
         alue=dict(viiva=[(116.70, 32.66), (116.78, 32.58), (116.86, 32.45)], sade_km=15),
         seuraus='Etelä pysyy omana valtionaan kahden vuosisadan ajan'),
    dict(avain='yamen', nimi='Yamen', vuosi=1279, lon=113.08, lat=22.27, voittaja='mongol', havio='song',
         seuraus='Songin viimeinen laivasto tuhoutuu (Lin\'an kaatui jo 1276) ja Yuan hallitsee koko Kiinaa'),
    dict(avain='shanhain-sola', nimi='Shanhain sola', vuosi=1644, lon=119.77, lat=39.98, voittaja='qing', havio='shun',
         seuraus='Mantšut pääsevät muurin läpi Pekingiin'),
]

# --- pääkaupunkien siirrot -------------------------------------------------------------------------------------------
_P = {"Chang'an": (108.94, 34.26), 'Luoyang': (112.45, 34.62), 'Jiankang': (118.78, 32.06), 'Pingcheng': (113.3, 40.08),
      'Kaifeng': (114.35, 34.8), "Lin'an": (120.16, 30.27), 'Karakorum': (102.83, 47.2), 'Dadu': (116.4, 39.9),
      'Nanjing': (118.78, 32.06), 'Peking': (116.4, 39.9), 'Mukden': (123.43, 41.8), 'Xianyang': (108.7, 34.33),
      'Daxing': (108.94, 34.26)}
SIIRROT = [('han', 25, "Chang'an", 'Luoyang'), ('jin', 317, 'Luoyang', 'Jiankang'), ('xianbei', 494, 'Pingcheng', 'Luoyang'),
           ('sui', 589, 'Jiankang', 'Daxing'), ('song', 1127, 'Kaifeng', "Lin'an"), ('mongol', 1272, 'Karakorum', 'Dadu'),
           ('ming', 1421, 'Nanjing', 'Peking'), ('qing', 1644, 'Mukden', 'Peking')]
