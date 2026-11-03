# Pelikoodari: luovutus 2.11.2026 klo 08.15 (konteksti 31 %) – juna 218

Edellinen: -20261102-0630 (PR 5942). Tilaus (PT 07.1x): 1) ETUSIJALLA eunukit (OMISTAJAN PÄÄTÖS 07.12: "Eunukit juoksevat aina kohti,
ne eivät ole koskaan pysähdyksissä ja niitä on yleensä vain yksi tai ei yhtään näkyvillä"), 2) bugi 2 ristikko-ovi, 3) bugi 3 alkulennon LOD.
Pysyvä kuittaus: tallenne PT:lle → SHA NS:lle. NS:n runko 024832f05 (sis. rakennukset-v94 7a6783ad6).

## Valmista (proto-git, haarat rakennukset-v94:n 7a6783ad6 päällä)
- **pelikoodari/eunukit-218 = 6b8e0b872 + f691d2e2d.** Odottajat piiloon (VartijaRaja 70 → 0; QA `kauko vartija <m>`); sokkelossa
  vartija näkyy vasta liikkeellä ja kasvaa näkyviin 0,4 s. Edestä tuleva lähtee 3,6 s ennen kontaktia (EdestaLahtoS) ja juoksee kohti
  (TuloNopeus 4, 2–9 m/s, enintään reitin päästä), varoitus juosten; sivukujan lähtö 3,5 s. Yksi kerrallaan (Vuoro, VuoroMinS 2,8 s,
  muuten pois). Näkyvyyssääntö odottaa, jos paikka ei vielä näy mutta ehtii. Keisari kääntyy pois → juokseva eunukki jatkaa risteyksen
  ohi (poistuvat) eikä katoa. f691d2e2d: kierretty sivueunukki jahtaa eikä seiso. Testi: enintään yksi liikkeellä. Juoksu 146/146
  (MK_JUURI palatsi 216: liikkeelle 4, ennen 5), unity-tarkistus 0.
- **pelikoodari/lod-alkulento-218 = a70ef8f41** (kohta 3): palatsin LOD KuvausKamerasta (kuvan todellinen kamera), ei KameraPaikasta
  (avauslennossa seurantakamera keisarin takana). JuoksuSokkeloMaailma.Palatsi.cs ~1178.
- Tallenteet (JU:n vuorolla, haara pelikoodari/tallenne-218f 56440d35f = tallenne-218e + 6b8e0b872 + a70ef8f41; ei vielä f691d2e2d):
  korjaus-218/20261102-073200-218f.mp4 (sk-218f, taso 1) ja 20261102-075318-218g.mp4 (sk-218g = 218e-skenaario, taso 0).
  Kuvat: korjaus-218/218f-*.png, 218g-*.png, 218d-…-vertailu.png. Lähetetty PT:lle 08.10; KUITTAUS AUKI → SHA:t NS:lle.

PT KUITTASI 08.2x: eunukit (f691d2e2d) ja kohta 3 (a70ef8f41) lähetetty NS:lle junaan 218.

## ENSIMMÄISENÄ (PT 08.2x, pysyvä kuittaus: tallenne PT:lle → SHA NS:lle)
- **Pariovet auki alkulennon ajaksi** (PT: KYLLÄ). 218g: alkulento lentää a-meridiaaniportin LOD0:n kiinni olevien pariovien läpi
  0.10,5–0.11 (LOD1:ssä ei ovia). Ovet: JuoksuSokkeloMaailma "pariovet ovi_V ovi_O (kiinni, aukeavat keisarin työntäminä)" (loki
  "palatsi v2: a-meridiaaniportti: pariovet"); avaa ne, kun AvausT ≥ 0 (alkulento), ja palauta kiinni ennen ohjausta vain, jos keisarin
  työntö on tarinan kohta (tarkista, ettei taso 0:n työntö katoa). Tallenne sk-218g-skenaariolla (taso 0) 0.09–0.12 JU:n vuorolla.

## Avoimet
- **Kohta 2 (ristikko-ovi) LAV:lla** (PT 07.5x): portti t-portti-120, pohjassa Puyi x ≈ −83,5, z 126 → 109; kamera (−83,7; 129…119)
  5,1–5,6 m, katon ala 4,8. Ristikko näkyy, vaikka katto on häivytetty → ristikko ei ole katto-solmussa. Vastattu LAV:lle (kuvat
  korjaus-218/bugi2-kuvat/). Tarkista LAV:n kansio tultua tallenteella (sk-218e-skenaario, 1.44).
- Havainto: 218e-lokissa musiikki käynnistyi uudelleen joka ruudulla (JuoksupeliNakyma.SoitaMusiikki, "alku"), luultavasti batchmoden
  AudioSource ei soi → ei laitteella. Ei korjattu.
- Työkalut: aja-sk.zsh <sk> <nimi> <haara> (worktree wt/proto-pelikoodari-kivi-216 = tallenne-218f); aja-218fg.zsh kaksi peräkkäin.
  Koordinaattimuunnos Unity → pohja: JuoksuPalatsi.Pohjaan(new P3(x, 0, −z)) (pk8, KanoninenKierto).
- Worktreet: peitto-218 = eunukit-218, kansiot-218 = lod-alkulento-218, kivi-216 = tallenne-218f, korjaus-217 = rakennukset-v94-218.
