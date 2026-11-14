# Rooman ja Wienin nimilistaehdotus (Valoseppä 15.11.2026 klo 02.xx; luovutuksen kohta 3, malli ehdotus-listat-lontoo.md)

Periaate (KK 23.25): harvinaiset tyypit vain nimilistalta. Koeajo: tyypitys.py otteet-63/<k> (koko ote 16 × 16 km; talojen aluetta, taulu-uusi.json raja,
ei Roomalle eikä Wienille vielä ole → etäisyys keskipisteestä sarakkeessa). Sovitus samalla koodilla (palatsin_sovitus). Rivit eivät ole vielä tyypitys.py:ssä;
koeskripti: koe-rooma-wien.py (T.NIMILISTAT[k] = ehdotus, 'odottaa'). Pelissä ei vielä ole Rooman eikä Wienin koodimalleja (tulos/ikonit.json), joten
ikonileikkaus ei ohita mitään: ikoniehdokkaat on rajattava listalla (alla).

## RAJAT ENNEN LISTAA (KK päättää)
1. KIRKOT, ROOMA: sääntö tyypittää 678 kohdetta, 434 malliin (suuri 19, basilika 99, leveä 117, keski 132, pieni 233). Mallit ovat pohjoisia (länsitorni + neula).
   Rooman kirkot ovat julkisivu + kupoli (+ erillinen kampanile); esim. Chiesa del Gesù, Sant'Andrea della Valle ja Sant'Agnese in Agone saisivat länsitornin
   ja neulan. EHDOTUS: Roomaan ei kirkkoja säännöllä, ennen kuin on "julkisivukirkko" (torniton pääty + kupoli) tai oletushuippu tasakatto; kupolikirkot nimilistalla.
2. IKONIEHDOKKAAT (älä tyypitä; tulevat koodimalleiksi tai jäävät perustaloiksi): Rooma: San Pietro (venytys ei sovi jo nyt), Pantheon (temppeli, ei mallia),
   Altare della Patria, Colosseo. Wien: Stephansdom (nyt kirkko-suuri MALLIIN), Hofburg (ei listalla), Schönbrunn (ei listalla), Karlskirche (keskeinen pohja),
   Belvedere (ks. palatsit). Stephansdom on poistettava säännön tuloksesta (käsikorjaus ei_sovi), jos Wien viedään ennen ikonia.
3. SEINÄVÄRI: KS:n paletissa (katot.py PERHEET) ei ole 'rooma' eikä 'wien' -perhettä. Palatsit tarvitsevat sävyn: Rooma okra / terrakotta-rappaus,
   Wien Schönbrunnin keltainen ja vaalea rappaus. Pyyntö KS:lle vasta, kun lista hyväksytty.
4. KATTO: molemmissa 'attika' (Rooman palatsin raskas räystäslista ja matala tiilikatto; Wienin Ringstraße-rakennukset kaiteella). Mansardi ei kummassakaan.

## ASEMAT: ei ehdotusta
Rooma: Termini (727 × 36 m pohja = vain 1950-luvun julkisivurakennus; laituri­katokset eivät kaarihallia), Ostiense, Tiburtina: ei kaarihallia.
Wien: Hauptbahnhof (2014, timanttikatto), Westbahnhof (1951, suora halli), Praterstern: moderneja. Kaarihallimalli olisi väärä → perustaloiksi.

## PYLVÄSTEMPPELI: ei ehdotusta
Rooma: Pantheon on ikoni (portiikki + kupoli). Tempio di Adriano (Piazza di Pietra) on rakennuksen kylkeen upotettu pylväsrivi; malli kiertäisi pylväät ympäri.
Wien: Parlamentti on pylväsportiikki + siivet → palatsina (alla). Theseustempel on pieni (alle 600 m²).

## PALATSIT, ROOMA (palatsi-piha, attika; julkisivu käsin, 'arvio' = tarkistamaton)
| ehdotus | OSM | ala m² | pohja m | piha | avoin | julkisivu | km | huom. |
|---|---|---|---|---|---|---|---|---|
| Palazzo Farnese | relation/22289 | 4 737 | 77 × 61 | umpi | | koillinen (Piazza Farnese) | 0,2 | paras: kuutio, sisäpiha |
| Palazzo della Cancelleria | relation/1709797 | 4 320 | 82 × 75 | umpi | +x? | pohjoinen, arvio | 0,1 | sovitus avasi sivun: tarkista |
| Palazzo Spada | relation/2916876 | 4 247 | 81 × 72 | umpi | | koillinen, arvio | 0,2 | |
| Palazzo Braschi | relation/1709796 | 2 827 | 65 × 57 | umpi | | länsi, arvio | 0,2 | |
| Palazzo Madama | relation/76432 | 5 776 | 94 × 89 | umpi | | länsi (Corso del Rinascimento) | 0,4 | senaatti |
| Palazzo Corsini | relation/1283512 | 4 915 | 107 × 49 | umpi | | itä (Via della Lungara), arvio | 0,5 | |
| Palazzo Altemps | relation/537813 | 3 888 | 69 × 65 | umpi | | etelä, arvio | 0,6 | |
| Palazzo Venezia | way/140186882 | 4 890 | 122 × 76 | umpi | | itä (Piazza Venezia) | 0,7 | linnamainen, torni ei näy |
| Palazzo Doria Pamphilj | relation/1707363 | 14 011 | 149 × 106 | umpi | | itä (Via del Corso) | 0,8 | rajattu 24 m |
| Palazzo Chigi | relation/325553 | 3 665 | 71 × 54 | umpi | | itä (Via del Corso) | 0,9 | |
| Palazzo Montecitorio | relation/2766788 | 11 334 | 128 × 101 | umpi | | etelä (Piazza di Montecitorio) | 0,9 | |
| Palazzo Senatorio | relation/1691910 | 3 075 | 69 × 48 | umpi | | luode (Campidoglio) | 1,0 | kellotorni ei näy |
| Palazzo di Giustizia | relation/325578 | 26 496 | 170 × 159 | umpi | | itä (Tiber), arvio | 1,0 | 1890-l., iso |
| Palazzo della Consulta | relation/2737120 | 3 322 | 74 × 59 | umpi | | länsi (Piazza del Quirinale), arvio | 1,3 | |
| Palazzo di Propaganda Fide | relation/37216 | 4 970 | 110 × 62 | umpi | | etelä (Piazza di Spagna), arvio | 1,3 | |
| Palazzo Koch | relation/2766758 | 11 211 | 126 × 111 | umpi | | koillinen (Via Nazionale), arvio | 1,4 | Banca d'Italia |
| Palazzo Barberini | relation/2716050 | 6 812 | 107 × 93 | U | −x | länsi, arvio | 1,7 | U avautuu julkisivun puolelle: oikein |
| Palazzo del Viminale | relation/11153 | 15 645 | 169 × 132 | umpi | | länsi, arvio | 1,8 | |
| Palazzo Massimo alle Terme | relation/2705998 | 3 021 | 75 × 45 | umpi | | etelä, arvio | 2,3 | |
| Palazzo delle Finanze | relation/325549 | 28 495 | 303 × 120 | U | −z | pohjoinen, arvio | 2,4 | iso; avoin sivu epävarma |
HARKITTAVA: Palazzo del Quirinale (271 × 181, rajattu 144 m: Manica Lunga -siipi ei mahdu suorakaiteeseen), Villa Medici (42 × 59, rajattu 20 m; kaksi tornia ei näy).
EI listalle: EUR-alueen 1930-l. palatsit (Civiltà Italiana, Congressi, Esposizioni …: modernismi), Palazzo FAO, Palazzo dello Sport, Vatikaanin rakennukset (oma valtio).

## PALATSIT, WIEN (palatsi-piha, attika)
| ehdotus | OSM | ala m² | pohja m | piha | avoin | julkisivu | km | huom. |
|---|---|---|---|---|---|---|---|---|
| Winterpalais | relation/2509778 | 2 674 | 67 × 48 | umpi | | pohjoinen (Himmelpfortgasse), arvio | 0,3 | Prinz Eugen |
| Palais Esterházy | relation/1534837 | 3 641 | 83 × 59 | umpi | | länsi, arvio | 0,4 | |
| Palais Pallavicini | relation/1541444 | 1 868 | 47 × 44 | umpi | | länsi (Josefsplatz) | 0,4 | |
| Palais Modena | relation/3934518 | 4 446 | 77 × 76 | umpi | | pohjoinen, arvio | 0,6 | sisäministeriö |
| Palais Ferstel | relation/153359 | 2 974 | 93 × 66 | umpi | | länsi (Freyung), arvio | 0,6 | |
| Palais Harrach | relation/1527363 | 2 710 | 60 × 56 | umpi | | länsi (Freyung), arvio | 0,7 | |
| Stadtpalais Liechtenstein | relation/150055 | 2 840 | 58 × 56 | umpi | | pohjoinen, arvio | 0,8 | |
| Palais Hansen | relation/6528362 | 4 908 | 104 × 48 | umpi | | koillinen (Schottenring), arvio | 0,9 | |
| Börsegebäude | relation/29871 | 7 749 | 98 × 86 | umpi | | kaakko (Schottenring), arvio | 0,9 | PUNATIILI + kivi |
| Kunsthistorisches Museum | relation/20165 | 11 026 | 170 × 70 | umpi | | koillinen (Ring), arvio | 1,0 | keskikupoli ei näy |
| Naturhistorisches Museum | relation/11187 | 10 949 | 169 × 70 | umpi | | koillinen (Ring), arvio | 1,0 | KHM:n pari |
| Akademie der bildenden Künste | relation/65155 | 5 219 | 89 × 62 | umpi | | koillinen, arvio | 1,0 | |
| Parlament | relation/54286 | 14 855 | 154 × 105 | umpi | | itä (Ring) | 1,1 | pylväsportiikki ei näy (vrt. Bourbon) |
| Universität Wien | relation/1441683 | 20 410 | 163 × 137 | umpi | | itä (Ring) | 1,1 | |
| Palais Trautson | relation/57997 | 3 613 | 92 × 46 | umpi | | itä (Museumstraße), arvio | 1,3 | |
| Palais Liechtenstein (Gartenpalais) | way/158249818 | 2 928 | 74 × 43 | umpi | | länsi, arvio | 1,9 | |
| Palais Kinsky | relation/2458835 | 2 394 | 86 × 30 | ei | | länsi (Freyung) | 0,8 | |
| Palais Coburg | way/121542619 | 2 371 | 102 × 34 | ei | | pohjoinen, arvio | 0,4 | bastionin päällä |
HARKITTAVA: Palais Schwarzenberg (rajattu 70 + 26 m), Palais Rasumofsky (rajattu 30 m), Palais Auersperg (rajattu 20 m), Oberes ja Unteres Belvedere
(ikoniehdokas; Oberes 121 × 33 ilman pihaa, katon kuparikupolit eivät näy).
EI listalle: Hofburg ja Schönbrunn (ikonit), Rathaus ja Votivkirche (gotiikka), Staatsoper ja Burgtheater (oma muoto), noin 150 pientä palais'ta
(alle 2 000 m² tai kapeat kadunvarsitalot: perustaloina oikein).

## Seuraavaksi (KK:n sanalla)
Hyväksytyt rivit tyypitys.py:n NIMILISTAT['rooma'|'wien']:iin 'odottaa'-tilassa, kirkkojen ratkaisu (kohta 1), taulu-uusi.json-raja KS:ltä ja
seinäsävyt KS:ltä. Vienti (.bytes, poisOsm) vasta näiden jälkeen.
