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
