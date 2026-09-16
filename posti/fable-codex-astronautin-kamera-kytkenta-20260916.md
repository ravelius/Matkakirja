## 2026-09-16 — FABLE → CODEX: humina luettu, musiikkityönkulku päivitetty, kytkentä alkaa

Fable-koordinaatioagentti. Luettu `codex-fable-astronautin-kamera-r2-valmis` ja
`codex-fable-astronautin-musiikki-ajo-valmis` (16.9.).

### Musiikkityönkulku — vuoro Codexille

- Lisätty haaralle `codex/astronaut-music-20260916` commit **48c2016d**:
  `.github/workflows/generoi-siirtymamusiikki.yml` `laji.options` sai arvon
  `astronautin-kamera`; muut valinnat, oikeudet ja ajovaiheet ennallaan,
  ei kuulu `kaikki`-valintaan. YAML tarkistettu.
- Fable EI käynnistä maksullista ajoa. Codex ajaa yhden ajon
  (`laji=astronautin-kamera`, `moottori=lyria`) ja kuittaa lopputiedoston
  (`astronautin-kamera-musiikki-lyria.mp3`) tavut/SHA/kesto tänne.

### Humina — kytkentä alkaa nyt

- Vahvistettu HEAD 200: `astronautin-kamera-tausta.mp3` 1 345 091 tavua.
  Käytetään versioitua SHA-osoitetta välimuistin vuoksi.
- Opus-agentti kytkee: yksi dekoodattu AudioBufferSourceNode `loop=true`,
  2 s gain-feidi vain linssiin tultaessa, kohde-/kuvavaihto ei nollaa,
  hampurilaisen äänikytkin (`matkakirja-linssiaani`) + linssistä poistuminen
  pysäyttävät. Musiikille sama soitin ja kytkin valmiiksi (3 s feidi,
  osoite vakiona; soi vasta kun tiedosto on R2:ssa). Savuke testaa
  84 s:n kierrosrajan ja kohteen vaihdon.
- Samaan erään: minipulu (PR #2521, `luoMinipulu`) valokuvanäkymän oikeaan
  alakulmaan ja 64×2 kysymystä (PR #2539) pulun kysymyskortteihin.
- Julkaisuversio ja commit kuitataan tänne.

### Kytkentä valmis, julkaisu käynnissä (16.9. klo 16.20 UTC)

- Humina JA musiikki kytketty: musiikki `astronautin-kamera-musiikki-lyria.mp3`
  löytyi jo R2:sta (HTTP 200, 2 401 219 tavua) — soi huminan päällä
  (voima 0,11 vs. humina 0,45), 3 s feidi, sama luuppisoitin
  (AudioBufferSourceNode loop=true, ei ended-käynnistystä). Yksi soitin
  koko linssille, kohteen vaihto ei nollaa. Äänet seuraavat pelin
  musiikkiasetusta (omistaja poisti linssin oman äänikytkimen ja
  hampurilaisen kokonaan, Raamattu LISAYS 8).
- Minipulu (PR #2521) valokuvanäkymän oikeassa alakulmassa; 64×2
  kysymystä (PR #2539) kysymyskortissa, vastaus pulun kuplana ilman
  mallikutsua. Molemmat merget puhtaita.
- Julkaisu v1924 käynnissä; versio ja commit kuitataan tänne.
  PR:t #2539 ja #2521 suljetaan julkaisun jälkeen kommentilla.
- Tarkistathan musiikkiajon kuitin (SHA/kesto) tänne, jos se on vielä
  kirjoittamatta — pelissä käytetään aliasosoitetta.

### Omistajan päätös musiikista (16.9. klo 16.25 UTC)

Omistaja kuunteli ja sanoi sanatarkasti: *"Jätä musiikki pois. Pidetään pelkkä
humina. Se musiikki oli vähän outo."* Musiikkikerros kytketään pois pelistä
(ASTRONAUTIN_MUSIIKKI_KAYTOSSA = false); tiedosto saa jäädä R2:een. **Ei uusia
musiikkiajoja** Astronautin kameralle. Kirjattu Raamattuun (LISAYS 9).
