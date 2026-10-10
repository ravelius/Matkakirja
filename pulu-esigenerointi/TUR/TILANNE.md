# TUR tilanne (10.10.2026)

- Vaihe 0 esto: lataa-data.sh antaa 404 (media.matkakirja.app/sisalto/1/v625/kokoelmat/karttavalot.json ei löydy; v626, latest.json ym. myös 404). valmistele.mjs tuotti 0 kohtaa.
- Kiertotie: kokoelmat rakennetaan paikallisesti repon lähteistä `node tools/vienti/vie-sisalto.mjs --ulos <kansio>` ja kopioidaan kansioon pulu-esigenerointi/data/. Ajo käynnissä.
- Ei-ajettu vielä: vaihe 1, vaihe 2, paketti.

Päivitys: vaihe 0 onnistui paikallisella viennillä (kokoelmat + js/packs/*-tur.json kopioitu kansioon data/): 29 kohtaa, 6 erää. Vaihe 1 käynnissä.
