# Raportti 10 (Valoseppä 15.11.2026 klo 06.3x): KK 06.15 sanat 1–3

## 1. poisOsm KS:lle (KYLLÄ)
- tulos/poisOsm-ks-20261115/{pariisi,lontoo}.json = vienti-<k>.json 'poisOsm' (P 271, L 429) + .bytes-sha (f5344dd0…, 91949e66…). Lähetetty KS:lle 06.2x.
- HUOM Saint-Lazare: läpi pistävät katot ovat NAAPURITALOJA, eivät aseman omaa taloa. Hallit piirretään ympäröivään suorakaiteeseen
  249 × 247 m (61 330 m²); OSM-pohja (way/727994377) on vino viisikulmio 45 940 m². Kuva: lokit/valoseppa-tyyppimallit4-koonti/saint-lazare-pohja-vs-hallit.png
  (lazare.py). Koko Pariisi: ylitys.py → tulos/ylitys-pariisi.json (116/271 merkissä talolähteen taloja suorakaiteen alla ≥ 20 m²; suurimmat
  Saint-Lazare 3 208, Austerlitz 2 388, way/63197091 1 328, Gare de Lyon 1 324, Saint-Ignace 1 280, Palais Royal 924).
- Vaihtoehdot KK:lle: A naapurit poisOsm:iin (ei suositella), B hallit pohjan sisään hallikohtaisin pituuksin (sisa.py: Saint-Lazare 158/178/206/222 m,
  5. halli pois), C sisäsuorakaide 158 × 212 m. Odottaa KK:n sanaa.

## 2. Osien irrotus (KYLLÄ)
- Osakirjasto (Kartta/OhjelmaKohdeOsat.cs; työkalussa lahde/): OsaKupoli(…, int sivuja = 32, int k = 9), OsaRumpu(…, int sivuja = 32);
  uudet OsaTorni(…, Vari tasakatto), OsaTukipilarit, OsaKellotaulu(…, Vari taulu, reuna, viisari). Tyyppimalleista pois TyKupoli, TyRumpu,
  TyTorni, TyTukipilarit, TyKello (värit tulevat kutsujalta: TyKatto, TyTaulu, TyRauta, TyViisari). OsaHuippu jäi OsaTorniin (sivuja 4/8/0).
- Tiiviste ennen → jälkeen (Luonnos.dll tiiviste tulos/mallirivit.tsv): 43 parametritonta verkkometodia (kaikki ikonit, myös Invalides ja Panthéon,
  jotka käyttävät OsaKupolia/OsaRumpua) + 48 pelin MK01-mallirivia: 91/91 SHA-256 tavulleen samat; 28 luonnos-OBJ:ia tavulleen samat.
  Tiedostot: tulos/tiiviste-irrotus-ennen.tsv, tulos/tiiviste-irrotus-jalkeen.tsv. Työkalu: irrota.py.

## 3. Leivonta EI vielä
- Ensin Saint-Lazaren pelikuva poisOsm:n (ja KK:n A/B/C-sanan) jälkeen. Leivonta on yksinajo eikä mene Pariisin iPad-erän edelle.
