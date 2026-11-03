# Pelikoodari: luovutus 3.11.2026 klo 02.30 – juna 218

Edellinen: -20261103-0200 (85b2e29a8): sen jono ja huomiot ovat voimassa, ellei alla toisin. Syy: konteksti (paljon kuvia).
Proto-worktree /Users/Shared/Claude/wt/proto-pelikoodari-tausta-v99, haara pelikoodari/kapea-reitti-218 (commitit paikallisia),
kärki **e3579873d** (= 1b80e7201 + CS0136-korjaus: läpikulun katon muuttuja lkVaaka; 1b80e7201 ei kääntynyt Unityssä, 02.00 ajot
kaatuivat). Salirunko **pelikoodari/sali-218f = d2dbe76b5** (e3579873d + piirtajat-218 505fd53c1; merge-tree, ei worktreetä).
unity-tarkistus 0 virhettä.

## taso1b5 (JU 02.06–02.17, tallenne-218t/20261103-020600-taso1b5.mp4): PT kuittasi 02.5x
- Läpikulun katto toimii portin alla (3,4 → 2,5 m, ei sahausta). MUTTA KK:n 40,3–41,3 s:n vika on punainen umpimassa heti
  kujaportti-3:n takana reitin poikki (maailma x 126, z −841…−843; peitto "huippu 8.4 ala 0.5" 26.10. alkaen): keisari juoksee
  läpi, 15 ruutua punaista. Ei p-kujaportti-3 eikä avoin työhuone. Havainnot ja kuvat:
  /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/tallenne-218t/taso1b5-havainnot.md (+ *-kujaportti3-kooste*.jpg).
- PT antoi massan Lavastajalle etusijalla; LAV ilmoittaa PK:lle korjauksesta → aja taso1b6 (ketju-taso1b5.zsh, vaihda nimi ja
  runko LAV:n korjauksen sisältävään) ja tarkista z −836…−846 kamera.txt:stä + kuvat. Läpikulun katto (1b80e7201 + e3579873d)
  junaan vasta reittikorjauksen ja katsotun taso1-tallenteen jälkeen (PT 02.5x).

## Salit (sali-218b, runko sali-218f)
- Ensimmäinen ketju (yk cx th tj ty cc xf ys) JU:n L1:llä käynnissä 02.30; yk/cx/th valmiit 02.25.
- QA-VIKA löydetty: `hyppy-jos maali juoksupeli: maali [0-9]+ s` täsmää vasta loppukortin hetkellä (~6,5 s maalin jälkeen) →
  6 s maalin näköalaa (th: taivas/katot, yk: suoraan ylhäältä) ennen kierrosta. Korjattu 02.26 kaikkiin sk3-*.txt:iin ja
  tee-sk3.zsh:iin: `hyppy-jos maali juoksupeli: maali piste` (loki "juoksupeli: maali piste …" tulee maaliin tullessa).
  ty cc xf ys saavat korjauksen tässä ketjussa (tj alkoi 02.25, todennäköisesti vanhalla).
- leikkaa3.zsh: alku = hyppy + 1,3 s (uuden juoksun alussa kamera katsoo taivasta ~1,2 s).
- Pyydetty JU:lta 02.27: ketjun jälkeen `ketju8s.zsh yk cx th tj` uudelleen. JU ilmoittaa.
- Tarkistus (zsh-apu: lokit/esikatselu-*/unity.log; sk3:ssa ei kamera.txt:tä): uudestaan-rivin jälkeen ei "avaus: LentoAlkaa"
  (yk/cx/th OK), maali piste → kamerakierros < 1 s, kortti kierroksen päällä. Koosteet: ffmpeg fps=2/3 tile=6x4 (drawtext puuttuu).
- AVOIN PELIHAVAINTO (ei vielä korjattu, kerro KK:lle tallenteen yhteydessä): yk v3 6–9 s: keisari menee rakennuksen ovesta,
  kamera kulkee oven katon tiilten läpi ja ~0,8 s seinän sisällä (keisari piilossa). Linjaus "drone pysyy ylhäällä, ei oviaukkojen
  alta" (Raamattu 2.177) → katso KK:n palaute ennen korjausta. Muuten yk/cx/th: keisari näkyvissä, kortti valtaistuinkuvassa.
- Valmiit uusinnat → suoraan KK:lle (local_37f7c945), kopio PT:lle (PT 02.5x: "salit L1:ltä → KK:lle kuten sovittu").

## Jono
1. Salit: uusintojen tarkistus ja lähetys KK:lle; KK:n palaute → korjaa.
2. taso1b6 LAV:n massakorjauksen jälkeen (yllä).
3. Arkiset hahmot, kun Codexin paketti tulee postilaatikkoon (ei vielä 02.30). 4. VS:n juoksupelin sade. 5. Siivoukset.
