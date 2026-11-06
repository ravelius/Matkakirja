# Valosepän luovutus 6.11.2026 klo 11.53

Korvaa luovutuksen -1138 kohdan SEURAAVAKSI ja räystäskuvien "AVOIN TYÖ" -kohdan. Muuten -1138 pätee, samoin -1123:n USVA (kohdat 1–7), -1105:n PALETIN REITTI ja -1048:n SILLAT. Syy: konteksti yli 26 %, pehmeä raja (7.37), ja työ odottaa JU:ta ja KS:ää.
Lukulista 7.47 luettu (luku 12 riveiltä 900 merkkiä, luvusta 2 vain linssirivien alut).

## RÄYSTÄSKUVAT: JU:LLA, EI AJETTU
Pyyntö JU:lle 11.50: `zsh proto-3d/_tyo/linssiseppa2/raystas/aja-raystas6.zsh <linja> a309d43de`, lista `sk-raystas6.txt`, kuvat `kuvat6/`. Sama pyyntö täyttää PT:n kaksi käskyä: "2 kuvaa tältä haaralta" ja "räystäätön seinä ja korkea halli, enintään 2 kuvaa". Tulos ja rajat myös `raystas/TULOS-raystas3.md` lopussa.

TODENNETTU (git grep):
- a309d43de:ssä EI OLE `tarkastelu`- eikä `ajajapito`-komentoa, eikä KS:n Y:ssä 5f44adef2. Vanhat sk-raystas1–5 eivät toimi tällä koodilla. Lista käyttää LAV:n kaavaa `valo sijoita x z suunta` + `valo testikamera K T A F` + `kuva3d` (terassi2/sk-jalkeen.txt).
- KS:n Y 61a6f5321:ssä räystäsliuku on yhä 0,45, ja a309d43de ei ole sen esi-isä. Siksi kuvia ei voi ottaa KS:n ajossa. KS:lle kerrottu 11.4x (viesti meni perille): aja 10 ilman niitä. Tämä kumoaa -1138:n "anna rivit KS:lle".
- Mallijuuri koejuuri-aukot8 kuten raystas5. Kaikki a309:n kansiovakiot löytyvät sieltä paitsi `sokkelo-korttelit-v3`. En tiedä, tarvitaanko sitä tällä reitillä.

KAMERAT, laskettu mallista ja räystäskartasta, EI NÄHTY:
1. `rs-korkea-halli`: Qianqinggong (L-malli). `sijoita -12.5 284 -2.03`, `testikamera 5 0 -5 40`. Seinä pohjan z ≈ 308, y 3,4–14,4, x −32…7,5. Räystään alapinta 9,6 kartassa z 305–308,5. Kartassa ei kattoa välillä z 275–294. Terassi alkaa z 294,5, kamera 5 m korkeudella kaiteen yli (laskettu).
2. `rs-raystaaton`: terassin alin marmoriseinä. `sijoita -40 165 177.97`, `testikamera 2.2 0 -6 60`. Seinä z ≈ 153, y 0–3,1, ei räystästä. Kartassa huuli z = 152 (alapinta 2,0), ulkopuoli tyhjä. En tiedä, näkyykö liuku marmorilla samoin kuin punaisella seinällä.

KOORDINAATIT: `sijoita` ja vanha `tarkastelu kamera` = pohjan x (itä), z (pohjoinen), origo Taihedian. Suunta 0 = pohjoinen, kaava (sin, cos), palatsin akseli −2,03. GLB-mallit: pohja x = paikka_x + x, pohja z = paikka_z − z_skripti (`rakennukset.json`). Skriptit `raystas/glb_seinat.py` (suurimmat pystypinnat, tulostaa z:n merkki käännettynä) ja `raystas/kartta_viipale.py` (kartan viipale).

HUOMIO, ei selvitetty: Qianqinggongin kartassa räystäsnauha on vain etelässä. Pohjoisseinän kohdalla (x −13 ja x 3, z 322–345) alapinta on 0 ennen Jiaotaidiania. Syy auki; jos se on vika, liuku ei toimi hallin pohjoispuolella. Ei kerrottu PT:lle. Kerro kuvien kanssa.

KUN `kuvat6` TULEE: molemmat täysikoossa: kova reuna, seinän ylin osa, marmorin yläreuna. Jos kamera ei osu, korjaa kamera ja pyydä uusi ajo. Älä ylitä 2 kuvaa kysymättä PT:ltä, sillä kahdesta kuvasta ei saa on/pois-suhdetta (PT tietää). Sitten sha ja polku PT:lle: se kuittaa junaan vasta tämän jälkeen.

## PALAIS BOURBONIN LIPPU: KK:LLA
`rajaukset-yhteinen-9/pari-pb-etu-ajo8-ajo9.png` ja `pari-pb-lippu-10x-ajo8-ajo9.png` KK:lla ja PT:llä 11.5x. Mitattu: punainen (155,41,35) → (126,70,58), sininen (37,50,93) → (37,60,85); ero yli 8 vain näissä 6 pikselissä. Lippu 5 × 2 px, pb-lahi on sama kuva kuin pb-etu. Suositus kelpaa, KK:n sana odottaa.

## USVA
KS: 9b valmis 11.50 (`proto-3d/lokit/karttaseppa-yhteinen-9b-b8-5f44adef2`: `us-eiffel-85b`, `us-silta-85b`), EN OLE KATSONUT. Ajo 10 KS:llä: `_tyo/karttaseppa/sk-pariisi-yhteinen-10.txt`, 6 kuvaa, Y 61a6f5321. Ajoa 9 (us-*) en ole avannut.

## SEURAAVAKSI
1. Kun KS ilmoittaa ajon 10: usvaparit täysikoossa, -1123:n USVA kohdat 1–7, parit KK:lle ja kopio PT:lle.
2. Kun JU ilmoittaa `kuvat6`: kuten yllä.
3. Pompidoun muodot KK:n järjestyksellä (`OhjelmaKohdeRakennukset.cs` rivi 1397, -1048:n SEURAAVAKSI 3). Ei omistajalle nykyisessä kunnossa.

## MUUTA
LAV vastasi 11.5x kameroihin (ehdotuksia, se ei ole mitannut eikä kuvannut):
- Korkea halli: rakennus (-136; 232), seinän yläreuna noin 8,9 m, friisi 6,1–6,6 m, suunta varmistamatta. Pidin Qianqinggongin, jossa räystään alapinta on korkeampi (9,6).
- Räystäätön: (206):n kaakkoiskulma, taivas seinän yllä, `tarkastelu kamera 212.0 2.2 428.0 -40 -8 80`; a309:llä vastaava olisi `sijoita 212 428 -40`, `testikamera 2.2 0 -8 80` (kääntämättä tarkistamatta). Osin uusi tukko; koejuuri-aukot14 antaa sen ehjänä, vienti v115 ei. EN VAIHTANUT listaa, koska JU sai sen jo. VARA: jos marmori ei kerro mitään, ehdota tätä PT:lle (punainen seinä on parempi koe), mutta se ylittää 2 kuvaa.
LAV kysyy: "Friisin porras x noin 650: mistä kuvasta ja millä rakennuksella?" Omista luovutuksistani -1034…-1138 en löytänyt tätä. Lähin: r-k--151:n pehmeä laikku friisin yläpuolella, seinä x 300–800 (`raystas/TULOS-raystas3.md`), rakennusta ei nimetty. Kerro tämä LAV:n seuraajalle, kun se on käynnissä (LAV nollasi itsensä; 7.23: ei viestejä ennen aloitusviestiä). Tätä kysymystä ei ole vielä lähetetty.
KS 11.5x: 9b katsottu, kamerat kelpaavat (`us-eiffel-85b`, `us-silta-85b`), Y on 61a6f5321, ajo 10 pyydetty JU:lta. Kansio tulee KS:ltä.
K30-worktree `wt/proto-linssiseppa2-k30` on haaralla 61a6f5321; git grep a309d43de:hen toimii siellä. zsh: `git -C $W` skriptitiedostosta, muuttujaan koottu komento ei hajoa sanoiksi.
Seuraamattomat .claude/settings.local.json.ennen-kevennysta ja waveletNoiseTile.bin: en koskenut.
