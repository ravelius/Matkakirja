# Lavastajan luovutus 3.11.2026 klo 23.54 (KONTEKSTI 25 %) — LUE TÄMÄ, ÄLÄ VANHOJA

Edellinen: viesti-lavastaja-luovutus-20261103-2327.md (haara lavastaja/luovutus-20261103-2327). Id:t: osoitekirja. L = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja.
Omat python-skriptit: /opt/homebrew/bin/python3 ILMAN -I:tä.

## VALMIS
- Esipiha tausta-v124: KK hyväksyi junaan (PT 23.50). Vienti JU 23.33, runko 15d7274ad. Pari: L/yangxin-kivetys/pari-5-5d-v119-v124.jpg.

## SEURAAVA VERSIO (PT/KK 23.50): KATON IRTOPALAT, PÄÄDYT, SOKKELIN KYLKI
EI uutta laitekuvaa ennen Pariisin jonon loppua; tarkista omalla näkymällä. Pohja tausta-v124. Vapaa nimi: tausta ≥ v125 (tarkista media ja _valmiit).
Työkalut L/katot-v125/ (samalla vieressä tulokset):
- nakyma.py: ohjelmistonäkymä materiaaliväreillä, ei pelin valoa. Toistaa vian ilman peliä: 5d-tausta.png (kamera −100 7 244, suunta −92), ylha-136.png.
- paadyt.py, peitto.py (peitto.json): talokohtainen kattopeitto. 238 taloa, 103 alle 0,6. KARKEA: laskee suorakaiteesta, L-talot ja sisäpihat näyttävät vajailta. Älä pidä listaa vikalistana.
- laatikko.py, vinot.py, versiot.py: materiaalit laatikossa ja versioittain.
Mitä tiedetään:
- Vika on taustapaketissa eikä pelin piilotuksessa: näkyy samoin nakyma.py:ssä, joka lukee vain glb:t. Sama määrä jo v87:ssä (vanhin versio _valmiit:ssa), eli ei viime versioiden regressio.
- Taloista puuttuu kattolappeita: esim. −136 237 (x −155,8…−135,1, z 231,5…245,8, harja y ≈ 8,8) lod0:ssa V4_palatsi_katto vain 9 kolmiota laatikossa −146…−126 / 227…247.
- HYLÄTTY: "katto punaisella materiaalilla" (vinot.py: vinoja V4_red-kolmioita vain 6, ala 71 m²). Ne ovat vinoja seinäkolmioita, esim. tiili 1-3 ja 2-3; ne ovat oma vikansa, poista tai korjaa.
- Ei vielä selvillä: miksi lappeet puuttuvat, ja korjaako ne lappeen rakentaminen harjasta räystääseen (V4_gold-harja + friisin yläreuna) vai paremmasta lähteestä. Lod1/lod2 tarkistettava erikseen.
- Ehdotus järjestykseksi: sokkeli ensin (5d:n venynyt kylki, x ≈ −88…−100 muurin juuri; sokkelimateriaalin UV), sitten katot vain palatsin näkyviltä reiteiltä, ei koko 238:aa kerralla. Tausta on 100 tiedostoa, joten muuta vain kosketut ruudut.
- Pituussauma 5d:ssä (laattarivit eivät kohtaa keisarin kohdalla) EI ole PT:n listalla: älä tee ilman pyyntöä.

## ODOTTAA JU:LTA (Pariisin jälkeen, rungolla 15d7274ad)
- Havainne-editoriparit 01 ja 05: LAV-erot-2:n kohdat 4 (oviaskelman sininen kylki) ja 5 (sokkelin vinot viivat). 01-kuva on ajalta ennen osasarja-v12:ta.
- `ui juoksupeli mika` 5f:ssä (−115 215 −2.03): 0.27 0.10 kultainen hahmo seinän yläosassa, 0.75 0.95 vaalea laatta, 0.67 0.09 sininen laatikko. Hahmoa EI tunnistettu: ei 养心门:n pihaleijona (z 240,7, arvio karkea), ei läheinen harjakoriste (lion −101, y 14,7, z 236, 0,58 m). Etuliite on päätelty koodista (JuoksupeliNakyma.cs:1852).

## PIDOSSA
- Alkulennon keltainen tasainen katto: EI korjausta ennen korjauspyyntöä (edellinen luovutus). Skriptit L/yangxin-kivetys/keltainen*.py.
- Taihedianin marmori (peli 151/142/129, havainne 224/204/194, rajaukset eri kohdista) ja räystäsvyön sininen (ValoKohteet JuoksuPalatsiVyoSavy 0,15/0,55/2,4): PT: EI Valosepälle nyt, vie PT:lle Pariisin jälkeen. Tiedot L/seinat-erot-2/LAV-erot-2.md.
- Taihedianin lod1-räystäs ja sali 04: LAV-erot-2:n kohdat 3 ja 6, arvioimatta.
