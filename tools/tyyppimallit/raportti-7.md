# Työkalu 2: kirkko-levea (KK 15.11. 00.28 kohdat 1–5), Valoseppä 15.11.

## Malli (kohta 2): oma/Tyyppimallit.cs TyyppiKirkkoLevea(paikka, torneja, huippu)
- Pohja 34 × 21 m (sivusuhde 1,62), korkeus 40 m. Keskilaiva 22,5 × 10 m räystäs 12, harja 18, viisisivuinen kuori; sivulaivat 2 × 5,5 m räystäs 7 m,
  pulpettikatto keskilaivan seinään 10 m:iin, yläikkunarivi (2 per sivu) pulpetin ja räystään väliin; 3 suippoikkunaa sivulaivaa kohti.
- Torni samoin parametrein kuin kirkko-keski (paikka, torneja, huippu; oletus länsi 1 neula), mittakaava laivan mukaan: 8 m, runko 25, kärki 40 (≈ 2,2 × harja).
- Kolmiot: 136 (keski 126); tornipari 194, risteys-pyramidi 116. kaanna.sh: kirkko-levea, kirkko-levea-lansi-2-neula, kirkko-levea-risteys-1-pyramidi.

## Tyypitys (kohdat 1–3): tyypitys.py
- MALLIMITAT ('kirkko', 'levea') = 34 × 21; venytysvalinta pieni | keski | levea | suuri (max |ln s|). Koko ei tule pinta-alasta, vain venytyksestä.
- Raja 0,6–1,6 kova (ennallaan). Uusi SOVITUS kirkko_min_pituus 20 m: lyhyempi kirkko ei sovi ("alle 20 m"), paitsi nimilista/käsikorjaus.

## Luvut talojen alueella (kohta 4b; vertailu scratchpadin vertaa.py:llä, ennen = raportti-6)
- Pariisi: mallissa 230 → 254 (+28 levea, −4 alle 20 m). Levea yhteensä 85 (vanhoista 57 vaihtoi koon). Yhä ei sovi kirkkoja: venytys 41,
  keskeinen pohja 20, luonnollinen 14, epäsäännöllinen 7, alle 20 m 4.
- Lontoo: 334 → 405 (+78 levea, −7 alle 20 m). Levea 230 (vanhoista 152). Ei sovi kirkkoja: keskeinen 49, venytys 34, luonnollinen 29, alle 20 m 7, epäs. 7, erillisiä 6.
- Mallissa sz > 1,3: P 49 (ennen 64), L 67 (129); sz > 1,45: P 26 (34), L 13 (64). sz > 1,3 jakautuu P levea 23 / keski 21 / pieni 5, L levea 34 / pieni 17 / keski 16.
- Arkki levea-1.jpg (venytys-levea.py Blenderillä + arkki-levea.py): sama 34 × 21 pohja keski venytettynä (x 0,56 z 1,11) | levea 1,0 | levea tornipari;
  levea x ja z 0,6 | 1,0 | 1,6. Huom. x 1,6 ja z 1,6 levittävät myös tornin (jaettu verkko venyy kokonaan, kuten keskessä).

## Vienti ja peli (kohta 5)
- vie.py: TYYPPI ('kirkko', 'levea') = 8, a b c kuten 2, jaettu (instanssi). P 254 merkkiä, 22 mallia, 6 656 t; L 405, 4 mallia, 9 848 t. poisOsm P 254, L 405.
- Natiivi valoseppa/tyyppimallit-peliin c8ee1a5de (pushattu natiivi-backup): TyyppiKirkkoLevea pelin kopioon, TyyppiMalli case 8, TyyppiJaettu 1–4 ja 8,
  MerkkiTiedosto tyyppi 1–8 (mitat vain 5–7), uudet .bytes, testit (tyyppi 8 kolmella tornilla; P 254 / L 405), komento `ui kartanelama merkit 1|0`
  KartanElama.Komennossa (ei UiKomennot-muutosta; tila myös `ui kartanelama` -rivillä). Kartta 854/854, Linssit 2340/2340, unity-tarkistus 0. EI JUNAAN.
