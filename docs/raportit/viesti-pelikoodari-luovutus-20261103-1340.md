# Pelikoodari: luovutus 3.11.2026 klo 13.40 – juna 218

Edellinen: -20261103-1330 (6a12be51e + ffa09fc61) – voimassa, ellei alla toisin. Syy: konteksti (hook 25 %).
Testit: bash Peli-testit/kaanna.sh (EI zsh) 804/804.

## KK:N JÄRJESTYS (KK 13.3x, paketti 218ac katsottu; 218ac on parempi pohja kuin 218z, PT päättää junasta)
Aja vain korjattu sali; koko sarja kerran lopuksi; KK:lle korjattu sali kerrallaan (video + 1 s arkki), tunnetut viat ensin.
1. KAIKKI VALTAISTUINSALIT (yk cx tj ty xf cc ys): Puyi KOROKKEELLA kasvot kameraan koko kierron ja Maali-kortin ajan, kortti ei peitä
   (cc 9 s: Puyi lattialla korokkeen ja pöydän edessä; cc 15,9 s kortti peitti, vain jalat näkyivät). Todista cc:llä.
2. ys 7 s kamera seinässä; 10–11 s maalattu seinä ja lipas edessä, 11 s Puyi ei näy.
3. tj 4 s ristikkoseinä koko kuvassa; 8 s maalattu seinäke ylhäältä; 10 s kamera kaukana ylhäällä.
4. ty 12 s kamera Puyin päällä (pää täyttää kuvan); 13 s korkealla ja kaukana.
5. cx 4 s ja th 4 s paviljongin ristikkoseinä (sama paikka, yksi korjaus).
6. xf 6 s punainen pilari Puyin edessä.
7. Taso 1: "Pyyhkäise oikealla peukalolla vasemmalle…" ruudulla ~28–70 s → vain ensimmäisen käännöksen alla.
KK:n kysymys (vastaa KK:lle PT:n kautta): alkulennossa portin jälkeen kamera katsoo ~1,5 s pelkkää taivasta (6,5–8 s); tarkoituksellista?

## Tehty 13.23–13.40
- **ys-218ad (3fb09b3a9, katon raja) EI korjannut ys:ää**: video sali-218ad/20261103-132058-ys-v3.mp4, arkki sali-218ad/arkki-ys.jpg.
  6,6–7,2 s kamera ristikkoseinässä / katon reunassa (kamera y 3,46 vakio, x 114→111, z −727,7 = läpikulun katto?), 10,2–11,6 s
  maalattu seinä + keltainen lipas koko kuvassa, 12,4–13,2 s punainen seinä. "katon raja" laukesi vain kerran (97,3, 6,51, −716,1).
  Syy: peittokartta (1 m ruudut, ala/huippu) ei näe ristikkoseiniä eikä ruoteita (massassa 0) → mikään suoja ei laukea.
  Pidetään ys-218ad pohjana (ei haittaa; 10 s Puyi näkyy paremmin). Seuraava ajatus: ristikkoseinät/ruoteet peittokarttaan TAI
  läpikulun katon (3,46) aikana kamera Puyin polulle (KameraPolku) sivusiirron sijaan.
- **cx/tj 4 s analyysi** (5 fps sali-218ac): cx: kamera laskee 5,2 → 2,5 m paviljongin (avoin tyohuone) maalatun katon alle, Puyi
  poistuu sivuovesta, kamera jää ristikkoseinän taakse (näkölinja, ei massa); sitten 3,3 m sivuhyppy (kamera.txt rivit 269–323).
  tj: kamera y 4,0–4,24 (katon alapinnan tasolla) palkkiin ja ristikkoon (rivit 263–299). Molemmat samaa luokkaa kuin ys.
- **opetus-218ae ca981fc31** (paikallinen haara proto-repossa, worktree /Users/Shared/Claude/wt/proto-pelikoodari-ys-218):
  JuoksuOpetus: ohi mennyt ohje ei palaa samassa juoksussa (kohta 7; ennen palasi joka risteykseen z 10…71); kohteeton (heitto)
  poistuu 4 s:n jälkeen; käännös/este pysyy kohteeseen asti. Esikatselu (vain tallenne): kamerakierroksen PIDOSSA (Maali-kortti) katse
  laskee 0,5 s:ssa 2 m (KierrosKatseAlas) → Puyi kuvan yläosaan, kortti hänen alapuolelleen (kohta 1, kortin osa). Testit 804/804.
  JU:lle pyydetty 13.39: zsh /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/sali-218ae/ketju-ae.zsh taso1b cc
- **Maalijakso, Puyin paikka (kohta 1)**: sk3:n `ui juoksupeli valo sijoita x z 180 lattia` laittaa Puyin 0,9 m sermin etureunan
  eteen salin LATTIALLE (edeltäjän kaava 03.10: z = sermi − 0,9, y = lattia) → korokkeen/pöydän eteen. Puyi y 0,5 (lattia) on oikein,
  paikka väärä. Korokkeen mallia en löytänyt (rakennukset-v119 cc = runko+katto; avoimet-v52 juhlasali ei ole se). **LAV:lta kysytty
  13.3x** per sali: korokkeen etureunan z, yläpinnan y, pöydän x/z-rajat, istuimen etureunan z (palatsin koordinaatit). Kun vastaus
  tulee: päivitä sali-218ae/sk3-<sali>.txt sijoita-rivit (z korokkeelle pöydän ja istuimen väliin tai pöydän sivuun, lattia = korokkeen
  yläpinta) ja kamerakierroksen y (= uusi lattia + 0,9); aja cc. Maassa() nostaa vain alle 0,8 m:n vaakapintaan, joten anna y suoraan.
  GLB-mittatyökalu: /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/sali-218ae/glbrajat.py (python3 -I glbrajat.py tiedosto.glb [nimisuodin]).
- **Kiinankieliset elokuvatekstit (KK + PT 13.28, omistaja 13.18/13.26)**: Codex-tilaus postilaatikossa **c96b3278f**
  (posti/pelikoodari-codex-juoksupeli-elokuvatekstit-kiina-20261103.md; toimitus kansioon
  posti/codex-pelikoodari-juoksupeli-elokuvatekstit-20261103/). Työlistan rivi "Juoksupelin elokuvalliset tekstit kiinaksi: latauskuva
  ja alkulento" päivitetty. Kytkentä kuvien tultua: JuoksupeliNakyma (OtsikkoUrl/VaakaOtsikko, latauskuvan otsikko yhdelle riville +
  kiina alle; hattu ei peitä) ja JuoksuAvausJuliste (KuvaPolku alkulento-otsikko-rivi1..3, RUUDUN KESKELLE, rivit nopeasti peräkkäin,
  lohko häipyy ~4 s; korvaa ylimmän kolmanneksen ja ~7 s). KK:lle ennen junaa: Codexin kuvat + pelikuvat latauskuvasta (iPad vaaka,
  iPad pysty, iPhone pysty) ja alkulennosta 0,5 s välein 0–6 s. Roolit eivät viesti KK:lle suoraan (osoitekirja) → PT:n kautta.

## SEURAAVA
1. JU:n ajo sali-218ae taso1b cc: taso1b – ohje vain ensimmäisen käännöksen alla; cc – kortti Puyin alapuolella pidossa (Puyi yhä
   lattialla, kunnes LAV:n mitat). Arkki: ffmpeg fps=1,scale=300:-1,tile=6x4.
2. LAV:n mitat → sk3-sijoitukset korokkeelle (kaikki 7 salia) → aja cc → KK:lle PT:n kautta.
3. ys/tj/cx: ristikko/ruoteet peittokarttaan tai polkukamera läpikulussa (ks. yllä), aja vain korjattu sali.
4. ty 12–13 s, xf 6 s.
5. Kun kaikki korjattu: koko sarja kerran → taulukko → PT + KK-paketti.
6. Checkout /Users/Shared/Claude/Matkakirja-pelikoodari: luovutushaara koti/pelikoodari-20261103-1340.
