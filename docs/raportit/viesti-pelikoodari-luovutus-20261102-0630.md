# Pelikoodari: luovutus 2.11.2026 klo 06.30 (konteksti 29 %, pehmeä raja) – juna 218

Edellinen: -20261102-0538 (PR 5940). Tilaus (PT ~05.50): tausta v97 → v98 → SHA NS:lle; koko juoksun tarkistustallenne rungolla
218 (+ v98) ja KK:n bugilista proto-3d/lokit/bugit-juoksu-217-20261102/RAPORTTI.md kohdat 1–15; kamerakohdat itse, mallikohdat
rivinä PT:lle (→ LAV). Pysyvä kuittaus: bugilistan korjaukset junaan 218, kun tallenne tarkistettu ja lähetetty PT:lle → SHA NS:lle.

## Valmista
- **acd2750ae** TaustaKansio kielletty-tausta-v98 (JU vei 05.41) → NS:n rungossa **3431485b8**.
- **ccc8eeda0** (haara pelikoodari/kamera4-218, 3431485b8:n päällä) kohta 4: lähtölaskennassa kamera on jo pelikamera (avausW = 1),
  mutta katse käytti avauksen jousta (AvausKatseJousiS 0,3 s, AvausKaantoMax 60 °/s) eikä keisari kuvassa -rajausta (RajaaKuvaan):
  keisarin käännös risteyksessä juuri ennen ohjauksen siirtoa jätti Puyin kuvan ulkopuolelle 0,45 s ja siirrossa kamera heilahti
  ~200 °/s. Nyt avauksen jousi vain avausW < 1 ja RajaaKuvaan aina kun avausW ≥ 1 (JuoksuV4Maailma.cs ~2273/2279). Tasolla 1
  (oletus) laskenta osuu kaarron aikaan (w < 1) → ennallaan. Varmistettu tallenteella 218e. SHA lähetetty NS:lle 06.2x (testit NS).
- Tulokset PT:lle 06.2x: taulukko proto-3d/_tyo/pelikoodari/korjaus-218/bugit-218d/RAPORTTI.md (kuvat samassa kansiossa).
  LAV-rivit PT:lle: 3 (holvitunnelin sisäpinta ilman tekstuuria/valoa; kameran rata aukossa 3,0–4,0 m, laki 5,4 m), 8 (luiska
  1.54–1.57 valkoinen), 14 (pisteviiva muurin ja sokkelin saumassa).

## Tallenteet (Unity-esikatselu JU:n vuorolla, aja-sk.zsh; vuoro vapautettu 06.25)
- 218d: korjaus-218/20261102-054421-218d.mp4, haara pelikoodari/tallenne-218d = 00fc2a38a (tallenne-218c + acd2750ae), sk-218d.txt
  = omistajan 217-skenaario (TASO 0: alkulento + juoksu maaliin, 173 s).
- 218e: korjaus-218/20261102-061058-218e.mp4, haara pelikoodari/tallenne-218e = 0d663c939 (218d + ccc8eeda0), sk-218e.txt.
- Työkalut (scratchpad, kopioi tarvittaessa): arkki.py (kuva-arkki aikaleimoin), kelt.py (Puyin näkyvyys ruuduittain, POISSA),
  rata.py (alkulennon splinin kopio). Mittari korjaus-218/punainen.py.
- Videoaika ↔ lokit: video 0 = tallenteen peliaika 212,76 s; avauksen kello ≈ video + 2,8 s (Tahti); ohjauksen jälkeen
  kameraväli-rivin t = s.Aika ≈ video − 25,1 s.

## Seuraava (PK:n oma)
- **Kohta 2 toistuu satunnaisesti**: botin siemen vaihtuu ajoittain (218d 1097281515, 218e 1098785422). 218e 1.44,6–1.45,2 kamera
  ristikko-ovessa, Puyi pois 0,5 s. Molemmissa ajoissa "kamera rakennusmassassa" portilla x 81,5, z −516…−499 (Puyi katon alla,
  ala 4,8 m, kamera 5,1–5,6 m, huippu 10,6–14,8 m; s 344–352) → kamera nousee katon alapinnan yläpuolelle portin sisällä.
  Tarkista KattoHaivytys/portin profiili tälle portille (vrt. B2 Longzongmen) ja tunnelikorkeus. Tallenne JU:n vuorolla.
- **Sitten kohta 3 (PT 06.3x, pysyvä kuittaus, tallenne PT:lle → SHA NS:lle)**: LAV:n mukaan a-meridiaaniportin holvissa näkyy
  LOD1 (ei leivottua valoa), koska JuoksuSokkeloMaailma.Palatsi.cs:1146 valitsee LODin Puyin etäisyydestä, ja alkulennossa kamera
  on holvissa kaukana Puyista. Korjaus: alkulennon ajan (AvausT ≥ 0, maailman osuus) LOD kameran etäisyydestä. Varmista 218d-
  skenaariolla (taso 0), 0.09,4–0.10,9.
- ccc8eeda0 on NS:n rungossa 51efa85e7 (testit 2223/790/585, tarkista 0).
- Kohta 1 lieventynyt (haalea raita 0,07 s), kohta 10 vain `avaus nyt` -uudelleenkäynnistyksessä tasolla 0 → ei kiire.
- Worktreet: wt/proto-pelikoodari-korjaus-217 (kamera4-218), wt/proto-pelikoodari-kivi-216 (tallenne-218e),
  wt/proto-pelikoodari-kansiot-218 ja -peitto-218 (vanhat, voi poistaa).
