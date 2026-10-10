# Linssisepän luovutus 10.10.2026 klo 21.xx (nollaus PT:n käskystä, konteksti 50 %)

Proto-haarat ovat paikallisia (sama git /Users/Shared/Claude/proto-3d/Matkakirja-proto, ei pushia). Simu-, käännös- ja
laitevuorot vain Julkaisijalta. Käännös: `PROTO_APP_KOPIO=<lokit/linssiseppa-app/<nimi>> proto-kaanna.sh <haara>`.
Todistusajot nyt Natiivisepän versiolla (odottaa komentotiedoston kuittauksen, 80d418513, juna 180):
`/Users/Shared/Claude/wt/proto-natiiviseppa-tyokalut/tyokalut/todistusajo/todistusajo.sh` (--doc, aani-alku/-loppu mukana).
Ajoskriptit ja skenaariot: `proto-3d/tyokalut/linssiseppa-ajot/` (simuvuoro-*.zsh, sk-*.txt).

## Worktreet (omat)
- `wt/proto-linssiseppa-taidemuseo` — linssiseppa/museo-varjot-180 (9106d012f)
- `wt/proto-linssiseppa-kaupunkiaanet` — linssiseppa/pariisi-kippi-180 (KESKEN, ks. alla)
- `wt/proto-linssiseppa-intro` — nyt linssiseppa/saumaton-pakattu-180 (ec837bba5); intro-luenta-180 87f1dd8a0 samassa gitissä
- `wt/proto-linssiseppa-puut` — linssiseppa/kaupunkipuut-181 (Opus-agentti aloitti 20.5x; tila ks. alla)

## Kuitattu tänään illalla (juna 180)
- **museo-varjot-180 9106d012f**: LR:n NL-sali v2f (sali-v2, Julkaisija vei ämpäriin), veistokset 34, huoneet.json graf-kabinetti,
  lattiaheijastus (peilikamera, Fresnel-pohja 0,25, mip karheus²·2; QA `museo heijastus 0|1|voima <x>|tila`). PT kuittasi
  EHDOLLA: iPad Pro 13 -muistimittaus Natiivisepän muistiportissa ennen vientiä (swap 19 Gt → yön uudelleenkäynnistyksen jälkeen).
  SHA lähetetty Natiivisepälle "muistiajo ennen vientiä". Kuvapari: lokit/todistus-museo-heijastus-180-20261010-1915/kuvapari-heijastus.jpg.
- **intro-luenta-180 87f1dd8a0** (PT välitti Natiivisepälle): (a) KIIRE: nykyintro ei pidä luentatilaa C1–C5:n ajan
  (Luentakuvasarja.IntroOhita; 179:ssä nappula ja kohteet katosivat), (b) omistaja 20.0x "Uusi korvaa vanhan": Pariisissa vain
  uusi esittely, isoisän luenta pois (PeliOhjain.SaapumisluentoPois), esittely suoraan saapumisesta (Saapumisesitys.AloitaUusiEsittely),
  kehittäjätilassa joka saapumisella, pelaajilla kerran. QA `ui saapumisintro 0|1`. Videot äänen kanssa:
  lokit/todistus-esittely-pariisi-180-klikkaus-20261010-2015/esittely-{1,2}-aani.mp4, -saapuminen-20261010-2012/saapuminen-aani.mp4.
- **Louvre**: Pelikoodarin worker valmiinPaikka + esittely-v1f tuotannossa (pyramidi 48.86098/2.33585, koko 25, korkeus 22,
  katse 112) → pyramidi keskellä (lokit/todistus-kulmat-louvre-v1f-20261010-2033/louvre-v1f-arkki.png). PT: korjattu.

## Junaan 181
- **saumaton-pakattu-180 ec837bba5**: pakattuna ladatun klipin GetData-lokispämmi pois (laiva.lautta/moottorivene). PT: juna 181.

## PÄIVITYS 21.4x (nollaus PT:n käskystä)
- **f65ed2a39 KUITATTU junaan 180** (PT 21.4x, kuittaus Natiivisepälle). **Linjaus 2 (99459eca5) → juna 181**: jatka -l2:sta
  (kaatuvat kohdat alla).
- **Kompassi + kierroshyppy TODENNETTU** NUI:n yhdistetyllä 6c9d434df:llä simulla 00CF62C2 (Julkaisijan NYT 21.37, SIMU VAPAA
  21.42): kompassi korin vasemmalla reunalla, keinuu korin mukana; `opas hyppy 5` → 1 → 5 Riemukaari → kierros jatkuu. 0 poikkeusta.
  Todistus: proto-3d/lokit/todistus-kompassi-hyppy-180-20261010-2138/ (skenaario linssiseppa-ajot/sk-kompassi-hyppy-yhdistetty-180.txt,
  simuvuoro-kompassi-hyppy.zsh). Löydös NUI:lle (PT välitti): metrolinjalla Louvren nimen alla Notre-Damen alaotsikko.
- Ansa: todistusajon kuvien merkintäkaista peittää kompassin (vasen alakulma) → katso kuvat/raaka/.

## KESKEN: pariisi-kippi-180 (juna 180, PT:n KIPPIKORJAUKSET)
- 50204e0f2: kompassi korin solmun lapsena vasemmalla nahkareunuksen päällä (keinuu korin mukana) + OpasSovitin.KierrosKohteeseen(i)
  NUI:n metrolinjalle (QA `opas hyppy <i>`; NUI kytkee natiivi-ui/kippi-pariisi-180).
- f65ed2a39 (Opus-agentti): pallo ei pysähdy (saapuminen suoraan kiertoon ~7 s, spiraali loppuun ~⅓ kuvan korkeudesta,
  tangenttilähtö, kaarenpituusprofiili kaikille pallolennoille). L1315.
- PT 20.5x LINJAUS 2 (agentti teki/tekee yhteen committiin f65ed2a39:n päälle): kertoja 3–6 s ennen saapumista (ei 15–21 s),
  pallo kiertää koko kertomuksen ja lähtee sen loppuessa, yli ~10 s lento lyhennetään pehmeällä kiihdytyksellä, kierto ≥ 3°/s aina.
  → EI VIHREÄ: WIP-commit **linssiseppa/pariisi-kippi-180-l2 99459eca5** (f65ed2a39:n päällä): kertoja 5 s ennen, lento
  0,35·√matka 12,5–22 s, kierto ≥ 3°/s tulokaaren suuntaan. Kaatuu: kääntö > 10°/s (Venetsia 19,3, Bryssel 11,1, Firenze 10,7),
  Tukholman kokonaiskierto 94° > 90°, EsilatausNopeanLennonRadalta (esilataus ei huomioi pidennettyä lentoa); 3°/s ei näy heti
  ~18 %:ssa (kehys kohteen sivulla/edessä); koko sarjaa ei ajettu. JATKA TÄSTÄ (wt kaupunkiaanet on nyt -l2-haaralla).
- KÄÄNNÖS: omistaja 21.3x → ei omaa LS1-käännöstä; NUI:n yhdistetty käännös natiivi-ui/yhdistetty-180 (pohja 6c9d434df) sisältää
  50204e0f2 mutta EI f65ed2a39:ää (ei ehtinyt). .app: proto-3d/lokit/natiivi-ui-app-yhdistetty-180 → kompassi + hyppy simulla
  00CF62C2 rinnakkain NUI:n kanssa. f65ed2a39 (vihreä) tarjottu PT:lle kuittaukseen → SHA Natiivisepälle PT:n kuittauksella.
- (Vanha suunnitelma, jos oma käännös sallitaan: `PROTO_APP_KOPIO=…/linssiseppa-app/pariisi-kippi-180 proto-kaanna.sh
  linssiseppa/pariisi-kippi-180`) → `zsh proto-3d/tyokalut/linssiseppa-ajot/simuvuoro-kippi.zsh <käännös-SHA>` (päivitä --haara
  uuteen kärkeen!) → videot kansioon todistus-kippi-video-180-* (louvre/concorde/riemukaari.mp4 + aani/*.wav) → mux:
  `ffmpeg -i X.mp4 -itsoffset 1.6 -i aani/X.wav -map 0:v -map 1:a -c:v copy -af loudnorm=I=-18:TP=-1.5 -c:a aac -b:a 160k -ar 48000 X-aani.mp4`
  (natiivikaappauksen wav on tyhjä 4 kt → käytä Unity-kaappausta) → PT → omistaja → SHA Natiivisepälle PT:n kuittauksella.

## VALMIS, todentamatta: kaupunkipuut (juna 181, PT KYLLÄ 18.5x)
- **linssiseppa/kaupunkipuut-181 ef020d7a7** (wt/proto-linssiseppa-puut; Opus-agentti; L1350, unity 0, VARJOSTIN KÄÄNTÄMÄTTÄ):
  Ydin/Elava/PuuRuudukko.cs (jäsennys, ruudut, kartio, LOD), Unity/KaupunkiPuut.cs, Varjostimet/KaupunkiPuu.shader,
  KaupunkiPuutTestit (6), tyokalut/kaupunki_puut_paketti.py; ElavaKaupunki.AsetaValo julkinen, OpasSovitin.MaanpintaLadattu/
  OmaMaanpintaDtm, LinssiOhjain QA, OpasValikko krediitti (OSM ODbL + Meta/WRI CC BY 4.0).
- Data ämpärissä: kartta/puut/v1/ (Karttasepän vienti 18.54, SHA täsmää _valmiit/kaupunkipuut-v1-vienti-20261010:een; Julkaisija 21.1x)
  — ei vientitarvetta.
- Muisti ~3,5 Mt (2,75 km säde; 70 k puuta × 16 t GPU 1,1 Mt; ei tekstuureja). Lähi < 400 m latvus + runko, kauko < 2,5 km latvus.
- Tuplapuut: PEITTO (kameraan kääntyvä latvuskortti 1,2 × latvus, siirretty säteen verran kameraa kohti); Googlen laattoihin ei
  kosketa. Riski: möykyn alaosa katutasolla → säädä `opas puut peitto 1.3` tai rivi PT:lle.
- QA: `opas puut 0|1|tila|lahi N|kauko N|peitto N`.
- PT:n ehdot ennen kuittausta: kuvaparit Pariisi + Tukholma katutasolta ja pallosta, iPad Pro 13 -muistimittaus, LISÄÄ MUISTIA -arvio
  (~3,5 Mt → Natiivisepälle).

## Huomiot
- Natiivikaappauksen (aani-alku → <nimi>-natiivi.wav) tiedosto jää 4 kt:ksi simulla; Unity-kaappaus (<nimi>.wav, 24 kHz) toimii.
- Todistusajon "uusi-peli <kaupunki>" Pariisissa ei soita luentaa (aloituslento) → intro alkaa heti saapuessa.
- Pelin kaupunki-id:t: "lyon" ei ole pelin kaupunki (maailmahyppy), "marseille" on.
- Kortti 2. käynnillä supistettuna (sama merkintä) — PT: ei muutosta.

## PÄIVITYS 22.5x (nollauksen 2 jälkeinen työ)
- **Linjaus 2 KUITATTU junaan 181: eca61364a** (linssiseppa/pariisi-kippi-180-l2, f65ed2a39:n päällä; L1315). Korjaukset: lyhyen lennon
  kaarenpituuteen katseen kääntö (Venetsia 19 °/s → ≤ 10), esilatauksen avaimeen suunta + KaantoPidennys, KohdekaariSpiraali-raja 120°
  (PT hyväksyi). Auki: kierto ei näy heti ~18 %:ssa → katsotaan junan 181 videosta. SHA lähetetty Natiivisepälle.
- **KIIRE pakka 180 KUITATTU: 7c4fa279c** (linssiseppa/esittely-pakka-180, NUI:n 81a694496:n päällä, korvaa sen junassa 180): maailmahypyn
  viivästynyt PaikanPuheVaiennettu ohitti juuri alkaneen uuden esittelyn (esittelyNro-vartija). Todistus lokit/todistus-pakka-180-lontoo-
  {iphone-2221 (ennen), iphone-2238, ipad-2241}. Skenaario linssiseppa-ajot/sk-pakka-180-lontoo.txt. HUOM: todistusajon `maara
  mk-kuvakortti` antaa 0, vaikka pakka näkyy kuvassa (häivytys/tarkka määrä) → älä käytä; NUI:n uusi-peli 5 pariisi tarkistaa intron jälkeen.
- **PALLOKOMPASSI (omistaja 21.5x, juna 181): 89e2d373a** (linssiseppa/pallokompassi-181, eca61364a:n päällä, wt kaupunkiaanet). Oma
  Blender-malli proto-3d/_valmiit/ilmapallo-v1/pallokompassi (lahde/pallokompassi.py + asteikko.py; asteikko luetaan ohjausviivalta,
  merkintä H kortin kulmassa H+180°), ämpärissä kartta/ilmapallo/v2/pallokompassi.glb (Julkaisija vei). PalloKori.AsetaKompassinPaikka nostaa
  tolpan varassa ja siirtää sisään, kunnes kaulus ≥ 3,5 % alareunasta. TODENTAMATTA: testikäännös linssiseppa/testi-181-kompassi-puut
  c8ae74c84 (+ kaupunkipuut ef020d7a7) Julkaisijan jonossa → `zsh linssiseppa-ajot/simuvuoro-pallokompassi.zsh <SHA> <app-kansio>`
  (uusi + vanha 6c9d434df iPad 00CF62C2 / iPhone D0D2CD1E, sk-pallokompassi-181.txt; lisäksi sk-puut-181.txt) → kuvapari nykyinen | uusi
  (merkinnät kuvaan) PT:lle ennen kuittausta. Simuajossa ehto: enintään 1 muu simu käynnissä (Julkaisija; ks. simuvuoro-pakka-180.zsh odota_simu).
- **Kipin Soundly-äänet (juna 182)**: Pelikoodarin paketti aanet/pallo-soundly-v2/ (37 + tuuli-tasainen-01; _valmiit/pallo-soundly-v2-vienti-20261010).
  Kytkentä Opus-agentilla haarassa linssiseppa/soundly-kippi-182 (wt intro, pohja eca61364a) — tarkista agentin commit ja testit.

## PÄIVITYS 00.0x (11.10.) — JONO PT:n järjestyksessä
1. **KIIRE Pariisin saapumisesitys (omistaja 23.5x, TF 180, juna 181)**: musiikki alkaa samalla hetkellä kuin isoisän "Pariisi"
   + iskulause (ero ≤ 0,2 s aaltomuodosta), lisäkuvat putkeen trailerin 3 aloituskuvan jälkeen. Juurisyy (agentin analyysi):
   musiikki lähtee paikan vaihtuessa (Aanikoukut/AaniTila; 4 s nousu, puheen alla 25 %), esittely alkaa vasta trailerin jälkeen +
   C1 7,74 s → ~8–9 s tyhjää. Korjaus Opus-agentilla haarassa **linssiseppa/esitys-musiikki-181** (wt intro, pohja 7c4fa279c):
   tarkista commit + testit → käännös → äänellinen simuajo (skenaario linssiseppa-ajot/sk-saapumisesitys-toisto.txt,
   simuvuoro-esitys-toisto.zsh <SHA> <app>) → mittausrivi PT:lle (musiikin alku vs. "Pariisi"-sanan alku aaltomuodosta; kuva 3 → C1 väli).
   TOISTO TF 180 -koodilla TEHTY: lokit/todistus-esitys-toisto-iphone-20261010-2357 (esitys.mp4 + esitys.wav Unity-kaappaus 24 kHz; loki: kappale
   soi jo 8,79 s esittelyn alkaessa, C1 7,8 s esittelystä) = "ennen".
   **KORJAUS VALMIS e38a38dee** (agentti; Peli-testit 474/474, Linssit 1356/1356, tarkista 0; EI laitteella): Pariisin nopea kappale ladataan
   tauolla ja käynnistyy trailerin puheen alkaessa (nousu 150 ms, vaimennus puheen alla 0,6), uusi kuvalista C1 heti trailerin kuvien
   jälkeen, C2 13,5 / C3 19,4 / C4 25,2 / C5 31,0 s, esittelyn kello kappaleen kohdasta. Mittausrivit "MATKAKIRJA ui saapuminen: puhe alkaa
   <t>" / "musiikki alkaa <t>" (≤ 0,2 s), "traileri kuva 1–3 sisään", "traileri kuvat ohi", "nykyintro kuva c1 … (kello …)".
   SEURAAVAKSI: käännös (`PROTO_APP_KOPIO=/Users/Shared/Claude/proto-3d/lokit/linssiseppa-app/esitys-musiikki-181 proto-kaanna.sh
   linssiseppa/esitys-musiikki-181`, pyydetty Julkaisijalta 00.2x) → `zsh linssiseppa-ajot/simuvuoro-esitys-toisto.zsh <SHA>
   <app>/Matkakirja3D.app` → mittaus: lokirivit + aaltomuoto (esitys.wav: musiikin alku vs. "Pariisi"-sanan alku, ffmpeg/numpy) + video
   ruutu ruudulta (kuva 3 ulos → C1 sisään) → ennen/jälkeen-rivi PT:lle. Auki: maasaapumisella kappale latautuu samassa ruudussa kuin
   traileri → mahdollinen viive näkyy lokista; vaimennus 0,6 ja kolmen tahdin kuvaväli kuunneltava.
2. **SAMA ERÄ (PT 00.1x): pysähdykset + Notre-Dame + Concorde.** Omistaja TF 180: "Kippi pysähtyy vieläkin välillä liiaksi paikalleen."
   → koko Pariisin kierros simulla TF 180 -koodilla (app lokit/linssiseppa-app/esittely-pakka-180 = juna 180 + 7c4fa279c; huom. TF 180:ssä on
   f65ed2a39 mutta EI linjaus 2:ta eca61364a, joka on juna 181:ssä) ja pallon nopeus 0,1 s välein (QA-lokirivi tarvitaan, jos ei ole):
   lista kohdista, joissa nopeus < 10 % matkanopeudesta yli 1 s (kohde, kesto, syy: puheen odotus / kuvien lataus / kaaren loppu).
   Korjaus: pallo jatkaa kaarta hitaasti myös puheen ja kuvien aikana, ei koskaan seisahdu. Todiste PT:lle: nopeuskäyrä ennen/jälkeen
   (jälkeen = eca61364a + korjaus) + pysähdyslista. Linssit-testien PalloKaupungitTestit "seisahdus s" -sarake on hyvä lähtökohta
   (ajaa Ydintä ilman laattoja; simussa lisänä laattojen/puheen odotus).
   **Notre-Dame + Concorde (omistaja 00.0x / 00.1x, kippi)** (omistaja 00.0x / 00.1x, kippi)**: CONCORDEN AUKIO kierretään yhä liian kaukaa (kuvakaappaus /Users/koodaus/.claude/uploads/ef36e2b2-9f8a-43f8-b67f-32272c66f1d4/627ee082-image.png): kierto selvästi lähemmäs ja matalammaksi, obeliski + suihkulähteet täyttävät kuvan keskiosan (juna 180:n etäisyyskorjaus ei riittänyt). Notre-Dame: pysähdyksessä kamera laskeutuu nopeammin ja kaartaa länsijulkisivun (tornit, portaalit) eteen.
   Opas-datana jos mahdollista (katse_suunta/katse_kaari, osoitinvaihto), muuten juna 181. Todiste: kuva-arkki laskeutumisesta + kaaresta ja ajat → PT.
3. **Pallokompassi**: testikäännös cb9dc2ed4 (app lokit/linssiseppa-app/testi-181, sis. kompassi + puut + soundly). Uusi iPad-ajo OK
   (lokit/todistus-pallokompassi-uusi-ipad-20261010-2353: kompassi kokonaan näkyvissä). Loput: `zsh linssiseppa-ajot/simuvuoro-pallokompassi-ajo.zsh
   cb9dc2ed4 /Users/Shared/Claude/proto-3d/lokit/linssiseppa-app/testi-181` (poista ensin jo ajettu uusi-ipad-rivi) → kuvapari nykyinen | uusi PT:lle.
4. Kaupunkipuut + Soundly samasta käännöksestä (sk-puut-181, sk-soundly-182 sisältyvät -ajo.zsh:iin).
