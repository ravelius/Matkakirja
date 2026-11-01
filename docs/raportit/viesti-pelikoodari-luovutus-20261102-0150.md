# Pelikoodari: luovutus 2.11.2026 klo 01.50 (konteksti 28 %, pehmeä raja) – KIIRE: TF 217 odottaa

Edellinen: -20261101-2330 (lue sen LÖYDÖKSET ja haarat). Muistin tila: pelikoodari-tila-20261018-aamu.md.
Tilaus (PT 01.2x, omistajan yölupa 23.29, loki PR 5920): taso 1 oletukseksi, eunukit harvemmiksi + tehtävä, 3-2-1, bugilistan
PK-kohdat 1–4, 10, 12, 13 + sivunykäys 0.39–0.47 → SHA NS:lle (local_99130238) runkoon 217 ja UUSI TALLENNE (UI mukana) PT:lle.
Bugilista: /Users/Shared/Claude/proto-3d/lokit/bugit-juoksu-217-20261102/RAPORTTI.md (video oli TASO 0 = "entinen juoksu").

## Valmista (proto-git, haara pelikoodari/korjaus-217, worktree /Users/Shared/Claude/wt/proto-pelikoodari-korjaus-217)
**00f3be98e** (35fe715be:n päällä):
1. Taso 1 oletukseksi: `JuoksuTaso.Nykyinen = Taso1` (lähtö työhuoneen ovesta kujalle, opetus, kurkistaja). Testiajuri asettaa
   jokaiselle testille tason null (vanhat testit = entinen juoksu); uusi testi OletuksenaTaso1.
2. Taso 1:n LÄHDÖN SIVUHYPPY 3,3 m (t 1,9 s, kujalle tultaessa; oikea vika, testi Taso1PuyiEiHyppaaSivulle): juhlasalin rinnakkainen
   reitti 2,6 m sivussa kosketti oven osan päätä 0,1 m → profiilin pää 2,6 m sivuun. JuoksuPalatsiVerkko.Profiili: < 0,5 m:n osuma,
   joka jatkuu pään ohi suuntaan, johon solmusta ei pääse (SuoraanAuki), ei ole profiili. Vanha ja v92/v91-data: 0 hyppyä.
3. Eunukit harvemmiksi (JuoksuV4.cs Sisalto): sivulta 40 → 20 %, edestä 25 → 15 % (yht. 65 → 35 %), peili 40 → 20 %,
   täydennys 0,5 → 0,25. Testi EunukitNakyvat…: testipalatsin sivulähtö 4 siemenen summasta.
4. Odottavat eunukit näkyvät vasta 70 m:stä (oma soluluokka VartijaLuokka, kasvu 20 m; ennen 120 m → aukiolla kymmeniä seisojia).
   QA `ui juoksupeli kauko vartija <m>`.
5. TEHTÄVÄ: ohitettu eunukki (väistetty tai "ei nähty") JAHTAA: kääntyy Puyin ohitettua ja juoksee perään väistökaistaa 0,7 × Puyin
   nopeudella, jää kameran taakse (JuoksuV4Maailma.PaivitaVartijat, jahti-sanakirja). Takaa-ajaja ennallaan.
Testit: Peli-testit `sh kaanna.sh Juoksu` 145/145 (MK_PALATSI_DATA-kopio v92/v91/esto v23: scratchpad, ks. alla). unity-tarkistus 0 virhettä.
tarkista.sh: paluu 0 (kaikki vahdit, kameratesti, kielivahti ok).

## Kesken (järjestys)
1. DIAGNOSTIIKKA taso1b käynnissä (ajo odotti vapaata konetta, toinen esikatselu 01.32): _tyo/pelikoodari/tallenne-217/aja-taso1b.ulos,
   skenaario sk-taso1b.txt (EI taso-komentoa = oletus), haara pelikoodari/tallenne-217 = merge 00f3be98e (e5f2bf50c). Katso video:
   lähtö ovesta, 3-2-1 näkyy (Laskenta3/2/1 PorttiAikajanassa, UI 7ddd353e8), eunukit, kamera. JOS kunnossa → tämä on PT:n tallenne
   (lähetä PT:lle, ei KK:lle yöllä) ja SHA 00f3be98e (+ jatkot) NS:lle runkoon 217.
2. KAMERA (bugit 1, 2, 4): taso 0 -videon lokissa EI yhtään "kamera rakennusmassassa"/"näkölinja peitossa" → peittokartta ei tunne
   seiniä, joiden sisällä kamera oli (kameraväli t 66–80: huippu 0,0, massassa 0, muurikuja 1,0, kamera 3,9 m). Epäily: peittokartta
   (LOD2/v92-mallit) kapeampi kuin piirretty seinä. Tarkista ensin taso1b-videosta, toistuuko taso 1:n reitillä.
3. 13 (25° nykäys 0.47) ja omistajan sivunykäys 0.39–0.47 olivat TASO 0:n videossa (avauksen jälkeen, ei ohjauksen luovutus: taso 0:n
   ohjaus ~t 41). Taso 1:n lähdön sivuhyppy korjattu (kohta 2); katso taso1b, onko nykäyksiä.
4. 10 sininen alku = Kamera.backgroundColor (0,78; 0,84; 0,90) ennen maailmaa (cullingMask 0) – todennäköisesti `avaus nyt` -uudelleen-
   käynnistys tallenteessa; tarkista taso1b:n alku.
5. 12 oliivinharmaa palkki maassa (1.10, kuva 11_…): tasainen laatikko poikki kujan ilman tekstuuria – kynnys/esteen paikkamalli? Ei
   paikannettu (JuoksuV4Maailma: grep ei löytänyt kynnyksen mallia). `ui juoksupeli mika x y` samasta kohdasta.
6. Bugilistan 3 (alkulento portin läpi) koskee vain tasoa 0 (taso 1:ssä ei lentoa).

## Huom
- Testidata v92/v91: scratchpad-symlinkit (MK_PALATSI_DATA, nimet vanhoilla v12/v17/v9-nimillä). Pysyvä kopio kannattaa tehdä
  _tyo/pelikoodari/:hin, jos tarvitset; oletusdata juoksu-210/data (vanha) ei näytä tason 1 hyppyä.
- Haaroja EI pushata (proto-git ilman originia). korjaus-217 = NS:n runkoon.
