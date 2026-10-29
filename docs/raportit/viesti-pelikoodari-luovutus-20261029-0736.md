# Pelikoodari: luovutus 29.10.2026 klo 07.36

Seuraava Pelikoodari jatkaa tästä. Muisti: pelikoodari-tila-20261018-aamu.md (UUSIN). Edellinen luovutus -20261029-0705 (PR 5532).

## Valmista
- Porttiovet 65° ovat jo junassa 214 (NS f47850642), eikä niistä tarvita merge-pyyntöä.
- PALATSIN POHJA pk7 (KS e8a5b232, PT vahvisti, LR:n v119-linjat): proto pelikoodari/pk7-214 84fcae875 = juna-214 72952b7fe + PalatsiTiedosto
  kk-pohja-v1d-pk7 + Taso1ReittiTyokalu pk7. Peli 761/761, tarkista 0. Rata: verkko kulkee 3 kaistalla t-porttiaukon (−249,2; 425,19) läpi,
  kaaret ≥ 4,5 m. Botti juoksee portilta kujan 05 läpi ilman kompastuksia ja kiinniottoa, ja kujalla on 0 estettä. pk6-214 EI mene junaan (PT).
  JUNAAN VAIN NIPPUNA: LR:n v64-paketti (t-portin aukko + kuja 02:n levennys; v63 jää väliin, PT) + uusi pk8 (KS tekee LR:n kuja 02 -linjoista;
  omistaja 07.26: kuja 02 levennetään; ensimmäinen pk8 15dba3d3 PERUTTU) + JU:n ämpärivienti (kk-pohja + LR:n kansiot).
- DRONE c (KK 29.10. korjaus 1): proto pelikoodari/drone-214 b40395e25 = ea52d4a50 + ennakoiva hidas nosto. Kameran tulevien paikkojen
  korkeustarve 4 s eteenpäin, nousu ja lasku enintään 2,5 m/s (DroneNosto.VaatiiNopeus/VaatiiEnnakkoS/VaatiiLaskuS 1,6), testi mukana.
  Peli 762/762, tarkista 0. Syy: Meridiaaniportin tunneli (katto 9–10 m). Raamattu 2.177 kieltää porttien alta lentämisen, joten
  "pelaajan korkeudella ohi" vaatii omistajan poikkeuksen. Kerrottu PT:lle (KK:n kortti, jos halutaan).

## Odottaa
- JU:lta pyydetty 07.35: L1 kaanna-drone214c-b40395e25.zsh → simu aja-drone214c-b40395e25.zsh (parkour-20261027/, simu-drone214c.txt:
  AVAUS PÄÄLLÄ kuten pelissä, video 105 s). KK:n korjaus 2 (alku: 205 °/s:n kääntö ja 6 s:n lasku 72°:sta) johtui b-ajon `avaus 0`:sta
  (juoksu alkoi työhuoneesta ilman avausta). Tarkista c-videon alku. Jos vika jää, pehmennä kääntöä alussa (KameranKaanto: viiveKatto
  huoneessa 18°). Huoneesta ei voi lähteä matalalta (2.177: ei oviaukon alta). Sitten vaakavideo KK:lle (Sonnet tarkistaa ensin).
- Simupari pk2 | pk7 uudelleen: kuja05-pk6-20261029/aja-pk6-7e9c8473c.zsh (1. ajossa pk2-video jäi aloitusruutuun; nyt odotetaan
  kamerarata t). Sonnetin havainto 1. ajon pk7:stä: lähtö umpinurkassa ja kamera ylittää seinän äkillisesti 13,5 s (lähdön paikka
  -250.3,436 on QA-lähtö, ei pelin). Muuten Puyi portin läpi ja kujaa pitkin, ei seinän läpi. Pari → KK.
- v64:n tultua: esto v13 (PalatsiEstoLeivonta: PALATSI_SISAAN uusi pk8, TAUSTA v64, RAKENNUKSET) → ratatarkistus kuja-39:ään ja kujan 02
  läpi (TilapainenKuja05Tarkistus.cs kansiossa _tyo/pelikoodari/kuja05-pk6-20261029/: kopioi Peli-testit/Testit/:iin, MK_JUURI/MK_POHJA/
  MK_ALKU, `sh kaanna.sh Kuja05Rata`, poista. HUOM: t-portin ohi -tarkistus vertaa kierrettyä pistettä, joten katso osat-rivi) →
  pk7-214:ään PalatsiTiedosto pk8 + TaustaKansio/MuurikateTiedosto/RakennusKansio/AvoimetKansio/EstoTiedosto → simu + pari KK:lle.

## Jatko keskeytyksestä
- Taustaajoja ei ole. L1 ja simu kuitattu JU:lle vapaiksi. Proto-worktree wt/proto-pelikoodari-kaapu-213 on haaralla drone-214 (puhdas).

## LISÄYS 07.4x (PT)
- Kuja 02 jää ennalleen (peli jo +4,9 %, tavoitteen sisällä), joten pk8:aa EI tule. pk7-214 odottaa vain LR:n v64:ää (= yksikerros-v103 t-porttiaukolla).
  Kun v64 tulee: esto v13 v64:n taustasta, ratatarkistus kuja-39:ään pk7:llä, kansiovakiot pk7-214:ään, simu ja pari KK:lle. PalatsiTiedosto pysyy pk7:nä.
- JU ajaa itse dronen c (L1) sekä simut a (pari pk2 | pk7) ja b (drone c). Tulokset ovat kansioissa lokit/todistus-pk7b-* ja todistus-drone214c-*.

## LISÄYS 07.5x: v64-ratatarkistus = VIKA (seuraava PK jatkaa tästä)
- LR v64 (_valmiit/juoksupeli-kk-lavastaja-v64-vienti-20261029, 1bfef18a OK) + pk7 + ESTO v13 leivottu: _tyo/pelikoodari/kuja05-pk6-20261029/
  palatsi-esto-v13/esto.bin (23 laattaa, 51 törmäysmallia, 141 451 ruutua; u-jingshan-törmäysmalli ilman meshiä ohitettu → pk7-214 0fa9bc499).
- Tulos tulos-pk7-v64.txt (juuri-v64/ = symlinkit testin odottamilla nimillä → v49/v64/esto v13): botti portilta kujan 05 läpi ilman
  kompastuksia/kiinniottoa, MUTTA pääkaista kulkee kujalla 40b itämuurin päällä: (−248,2; 390,5) → (−248,7; 405,7) → (−249,3; 421,0),
  itämuuri ks-pk7/kuja05-ita (−248,68; 403,4) → (−247,05; 424,3), paksuus 0,8. Rasteri (rasteri-kuja40b.txt, sama v12:lla ja v13:lla):
  z 405: itäreunan este x −246,5…−246 (ei −248,6:ssa), z 410: −247,5…−247 → uusi itämuuri puuttuu rasterista tai on siirtynyt itään.
  Selvitä JuoksuPalatsiVerkko: pohjan muurien rasterointi (miksi ks-pk7-muuri ei estä), korjaa → testi → tarkistus uudelleen → PT:lle OK.

## LISÄYS 07.55: JU:n ajot valmiit (L1 ja simu vapaat)
- DRONE c (lokit/todistus-drone214c-b40395e25-20261029-0746): KORJAUS EI TEHONNUT porttiin, sillä t 74,9–77,0 nopeus on yhä 12,6–15,9 m/s
  (nostot 5,2–7,9 m). Todennäköinen syy: portin alla nosto tulee räystäshaarasta (JuoksuV4Maailma: `if (!float.IsNegativeInfinity(raystas)
  && !tunnelissa && !avoinSali) kohde.y = Max(kohde.y, raystas + YhtKattoVara)`), ei KameraVaatii-haarasta, jota b40395e25 pehmensi →
  sama ennakko ja enintään 2,5 m/s myös räystäsnostolle (SisakatonRaystas reitillä edessä). Suorat: mediaani 7 cm (b: 3 cm). Alku
  (avaus päällä): kamerarata-rivejä ei t < 7 s → katso video. EI KK:lle ennen korjausta.
- PARI pk2|pk7 (todistus-pk7b-7e9c8473c-20261029-0737): kamerarata-rivejä 0 → `ui juoksupeli kamerarata 1` + `oleta-uusi … kamerarata t`
  ei toimi QA-lähdössä taso 0:lla → käytä odotusehtona esim. `oleta-uusi 120 juoksupeli avaus: OhjausPelaajalle` (vertailu.sh-mallin
  mukaan) ja tarkista videot Sonnetilla ennen KK:ta.
