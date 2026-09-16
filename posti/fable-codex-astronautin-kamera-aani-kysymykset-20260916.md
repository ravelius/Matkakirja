## 2026-09-16 — FABLE → CODEX: Astronautin kamera — taustaääni, minipulu paikalleen, kaksi kysymystä per kohde

Fable-koordinaatioagentti.

### Omistajan päätös (16.9.2026 klo 06.15 UTC, iPad-kuva Istanbulista, sanatarkasti)

*"Generoi tälle linssille oma taustaääni, mikä saisi olla avaruusaiheinen.
Lisäksi minipulu ei ole nyt näkyvissä. Se saisi olla oikeassa alareunassa
näkyvillä, ja jokaiseen kohteeseen voisi generoida kaksi valmista kysymystä."*

Kirjattu Raamattuun kohtaan "ASTRONAUTIN KAMERA: VALOKUVANAKYMA UUSIKSI 2",
alakohdat 8–10 (CODEXILLE). Työnjaon (roolitus.md 15.9.) mukaan nämä ovat
Codexin aluetta: äänigenerointi, animaatiot (minipulu) ja pelin tekstit.

### Pyynnöt

1. **Avaruusaiheinen taustaääni Astronautin kamera -linssille.**
   Hiljainen, jatkuva tausta (ei melodiaa, joka vie huomion): avaruusaseman
   humina, kaukainen radioliikenteen rahina, harva "piip". Kesto 60–120 s,
   saumaton luuppi, -18 dB LUFS tai hiljaisempi, feidaa sisään 2 s.
   Formaatti kuten pelin muut äänet (ks. äänipakkojen käytäntö), R2:een
   `matkakirja/aanet/linssit/astronautin-kamera-tausta.<pääte>`.
   Kytkentä peliin on Fablen/Opuksen työtä: valokuvanäkymän uusi
   hampurilaisvalikko saa "Äänet päällä/pois" -kytkimen, joka ohjaa tätä
   ääntä. Ilmoita osoite ja kesto postilaatikkoon.

2. **Minipulu Astronautin kameran valokuvanäkymän oikeaan alakulmaan.**
   Pyyntö minipulusta on jo postissa (fable-codex-minipulu-20260915.md).
   Tarkennus: se sijoitetaan valokuvanäkymässä ruudun OIKEAAN ALAKULMAAN
   kellumaan (pienoiskuvat ovat vasemmassa alakulmassa). Tumma pohja.
   Jos minipulu on jo tehty, kertokaa missä haarassa — Opus kytkee sen.

3. **Kaksi valmista kysymystä pululle jokaiselle Astronautin kameran
   kohteelle** (kohteet: js/packs/linssi-satelliitti*.js / satelliitti-
   avaruus.js kohdelista — Istanbul, Etna, Pariisi jne.). Kysymykset ovat
   pelaajan näkökulmasta ("Miksi kaupungin reuna näkyy yöllä terävämmin?"),
   vastaukset kaanonin mukaan (docs/tarina.md, docs/isoisan-raamattu.md;
   pulu puhuu nykyajasta, ei 1873:sta) ja NASA-kuvan sisällöstä. Yksi
   kysymys kuvan ilmiöstä, toinen paikasta/historiasta. Pituus: kysymys
   ≤ 60 merkkiä, vastaus 2–3 virkettä. Muoto: sama datamalli kuin pulun
   nykyiset valmiit kysymykset (grep 'kysy' js/fokusnosto.js / pulun
   kysymyskortit). Toimitus omana haarana + PR, ei versionostoa.

### Ei tehdä

- Valokuvanäkymän ja pallonäkymän UI (selite, X, hampurilainen, ISS,
  valaistus) on Fablen agenteilla työn alla — älkää koskeko
  js/linssit/satelliitti*.js:n UI-koodiin, vain data/äänet.

Kuittaus postilaatikkoon: `codex-fable-astronautin-kamera-*.md`.
