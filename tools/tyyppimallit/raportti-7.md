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

## KK 01.10: venytyksen ulkopuolelle jäävien 10 suurinta (tulos/venytys-ulkona-top10.txt)
    pariisi: venytyksen ulkopuolella 41 kirkkoa; 10 suurinta (ala m², pohja pituus × leveys m, sivusuhde, lähin koko ja venytys x/z)
      (nimetön)	relation/1068013	2211	64 × 37	1.73	suuri	x 0.57, z 0.75
      Église Saint-Séverin	way/19740659	1828	53 × 39	1.36	levea	x 1.56, z 1.85
      Église Saint-Ferdinand des Ternes	way/84325824	1775	59 × 42	1.41	suuri	x 0.53, z 0.86
      Église Sainte-Jeanne-de-Chantal	way/87959071	1691	64 × 42	1.52	suuri	x 0.58, z 0.86
      Église Saint-Louis-en-l'Île	way/55314295	1675	56 × 37	1.52	levea	x 1.64, z 1.74
      Église Saint-Jacques-le-Majeur	way/83236772	1646	57 × 31	1.85	keski	x 0.94, z 1.62
      Église Saint-Bernard-de-La-Chapelle	way/78005074	1589	66 × 31	2.12	keski	x 1.08, z 1.64
      Église Sainte-Odile	way/84324632	1498	99 × 22	4.55	keski	x 1.62, z 1.14
      Église Notre-Dame de la Gare	way/79084116	1363	55 × 38	1.43	levea	x 1.61, z 1.82
      Église Saint-Justin	way/62089113	1315	45 × 35	1.27	levea	x 1.31, z 1.67
    lontoo: venytyksen ulkopuolella 34 kirkkoa; 10 suurinta (ala m², pohja pituus × leveys m, sivusuhde, lähin koko ja venytys x/z)
      St Mary and St Michael Church	way/52128420	1838	57 × 42	1.36	suuri	x 0.52, z 0.86
      St James's	way/160404637	1589	61 × 32	1.9	keski	x 1.00, z 1.69
      Former Church of St Columba	way/305035318	1469	47 × 34	1.39	levea	x 1.37, z 1.60
      Second Church of Christ, Scientist, London	way/113119046	1457	56 × 36	1.55	levea	x 1.64, z 1.71
      Church of Saint Peter	way/38118477	1317	55 × 32	1.73	levea	x 1.61, z 1.50
      St. Augustine's	way/76236566	1273	55 × 33	1.69	levea	x 1.63, z 1.56
      St Pancras Church	way/51517078	1248	53 × 37	1.43	levea	x 1.57, z 1.78
      St Alfege Church	way/158230794	1189	52 × 39	1.31	levea	x 1.51, z 1.88
      Grove Chapel	way/86678082	276	19 × 14	1.32	pieni	x 0.60, z 1.20
      St Pauls United Reformed Church	way/79107411	238	18 × 14	1.34	pieni	x 0.57, z 1.13
- Viidennen muodon koe (vain laskettu, ei mallia): 58 × 38 m (myös 55 × 36 ja 60 × 40) toisi mukaan P 17/41, L 8/34; loput ovat pieniä kappeleita (alle 20 m) tai hyvin pitkiä ja kapeita.

## KK 01.13: Lontoo (asemat vientiin, katto ja portiikki, arkki lontoo-1.jpg)
- Asemat hyväksytty: Paddington 3, St Pancras 2 (2. kierroksen ehdokas: yksi Barlow-halli + tiilijulkisivu), King's Cross 2 (lista), Liverpool Street 2. L 405 → 409.
- Palatsi katto "mansardi" | "attika" (TyyppiPalatsiPiha; MK01 tyyppi 6 c = 1 attika): attikalla siivet ja paviljongit päättyvät räystäslistaan ja kaiteeseen,
  tasakatto; 495 kolmiota (mansardi 1 359). Rivikohtaisesti: attika kaikille paitsi County Hall ja Old Admiralty (oikeasti korkeat katot → mansardi).
  St James's pois listalta. Palatsit odottavat yhä ('odottaa').
- Pylvästemppeli portiikki (MK01 tyyppi 5 c = 1; TyPortiikkitemppeli): 8 pylvästä vain etupäädyssä (−x, käännetään länteen kuten kirkon torni),
  kolmiopääty, runko pohjan reunassa ikkunoin; 225 kolmiota. Pieni muutos (~30 riviä). Royal Exchange odottaa.
- Pariisin vienti tavulleen ennallaan (c = 0). Arkki: lontoo-kuva.py (Blender, Luonnos.dll malli-tila = MK01-rivi) + arkki-lontoo.py.
- Natiivi 2. commit (katso git log valoseppa/tyyppimallit-peliin). Kartta 854/854, Linssit 2340/2340, unity-tarkistus 0. EI JUNAAN.
