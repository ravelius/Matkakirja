"""Väestöpinnan hetket: armeijat, reitit ja lyönnit (Karttaseppä 17.10.2026). Kaikki luvut ARVIOITA (arvio = True).

Aika `t` on hetken oma 0–1 (video: keräys → marssi → lyönti → hajoaminen → toipuminen); Pelikoodari ajaa liikepohjan käyrillä.
Reitit [lon, lat] ovat tunnettujen paikkojen kautta (kerrokset_data, Wikipedia: Battle of Red Cliffs), tarkkuus ~20 km.
"""

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
}

LAHTEET = ('Armeijoiden koot: Sisältökirjurin tietopohja docs/kohtaukset/kiinan-dynastiat/punaiset-kalliot-luvut.md (96692a25f; '
           'Sanguozhi, de Crespigny Wikipedian kautta); reitit tunnetuista paikoista (kerrokset_data.py). Kaikki luvut arvioita '
           '(pelissä "noin"); jälkeen-luvut ovat kuvan mittasuhteita, eivät tappiolukuja.')
