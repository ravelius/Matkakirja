# Pelikoodari: luovutus 2.11.2026 klo 04.05 – juna 218

Edellinen: -20261102-0340. Tilaus (PT 03.4x): kamera kapeissa muurikuluissa / muuriportti, sitten bugi 10 oikeassa pelissä, bugin 13 kääntö; lisäksi bugi 12 (PT 03.5x).
Juna 217 lukittu (NS: runko 60bd5c356, sis. 22de5be30). Junan 217 runkoon ei koskettu.

## SELVITYS: osasarja ei ollut syy (luovutuksen 0340 "SELVITÄ ENSIN" tehty)
- Muurin läpi kulku on porttirakennuksessa Puyi x 115 → 101, z −561 (bugit 1–2, video 1.11–1.13), ei kohdassa (85, −541).
  Täysin punaiset raakaruudut: taso1c (osasarja-peitto POIS) 2963–2967 ja taso1d (PÄÄLLÄ) 4195–4201; kameraloki ajoissa sama
  ("portin alla … alapinta 7,3 m", kamera 4,1–5 m). Junan 217 "oletus pois" perustui virhepäätelmään; osasarjan kehys = piirron kehys.
- Esikatselu 2.11. 03.56 (JU:n vuoro, lokit proto-3d/lokit/esikatselu-20261102-035601): peittopisteet (117…110, −561,5): huippu 9,7–10,6,
  ala 7,7 jo PERUSKARTASSA (LOD2 ja LOD1), eikä yksikään instanssisarja (C3, A3/A5, osasarja, C1 g-taihedian) osu pisteisiin.
  → kuvassa aukon yläpuolinen muuri alkaa ~4 m:stä, mutta kartan lähde (palatsiOsat LOD1/LOD2) sanoo aukon olevan 7,7 m.
  SEURAAVA ASKEL: vertaa portin osan (todennäk. p-kujaportti-N; selvitä nimi pisteestä) LOD0 ja LOD1 aukon yläreunaa. Jos LOD1 on
  väärä → LAV:lle mallivika tai RakennaPeitto(0) porttiosille (LOD0 näistä osista karttaan).
- Kujapisteet (80/84, −537): huippu 0, ei sarjaa → koordinaatit eivät osuneet muureihin; valitse uudet raakaruuduista.

## Valmista (proto-git, EI vielä NS:lle)
- f8a5e05e3 (haara pelikoodari/peitto-218, worktree wt/proto-pelikoodari-peitto-218, 22de5be30:n päällä): kaikki instanssisarjat
  peittokarttaan Viimeistele-kutsusta, lisäykset jonossa; QA `palatsi sarjat-peitto 0|1` (oletus POIS, vanha alias osasarja-peitto) ja
  `palatsi peittopiste x z` (loki per sarja + LOD2/LOD1-kartta). Käännöstarkistus 0 virhettä. Kytkin pois → ei vaikutusta peliin;
  NS:lle vasta kun portti korjattu tai PT pyytää diagnostiikan runkoon.
- Huom: C2-kaiteet ja useimmat C1-räystäät "ei luettavia verkkoja" (meshit jo vapautettu) → eivät tule karttaan; korjaa, jos tarvitaan.

## Kesken / jonossa
- TALLENNE: tämän haaran tyokalut/esikatselu.sh ei tue odota-peli/tallenne-alku (ohitettu editorissa) eikä tallenne-video.sh ole
  haarassa; tallennukset vain haarasta pelikoodari/tallenne-217 (wt/proto-pelikoodari-kivi-216) → merge sinne tai cherry-pick f8a5e05e3.
  Skenaariot valmiina: proto-3d/_tyo/pelikoodari/peitto-218/sk-peitto.txt ja sk-alku.txt (bugi 10), ajo aja-sk.zsh <sk> <nimi>.
- Bugi 10: alkuperäisessä videossa tallenne-alku oli ENNEN avaus nyt -komentoa → todennäköisesti tallenteen artefakti; sk-alku.txt
  (tallenne heti v4-avauksesta) ajamatta tallennetuella haaralla.
- Bugi 13 kääntö: kääntö-arvo laskee pehmeästi 50 → 5 (t 35,6–38,7), mutta ohjauksen siirron jälkeen 0,5 s:ssa kenttä 30 → 39 ja
  korkeus 2,7 → 4,6 m (taso1d-loki rivit ~4130–4140) → todennäköinen "nykäys"; tarkista ruuduittain ja pehmennä avauksen loppu.
- Bugi 12 (PT): hyppyesteen paikkamalli JuoksuV4Maailma.cs:~3015 jää näkyviin; taso1d-lokissa kaikki "estemalli v2 … paikalleen"
  → lataus EI epäonnistu; epäily: este luodaan ennen mallien latausta eikä paikkamallia vaihdeta. Selvitä vaihtokohta.
