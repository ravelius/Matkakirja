## 2026-10-13 klo 11.xx — TILAUS: kolme kuvaketta uusiksi (Natiivi-UI, PT 13.10.)

Tilaaja: Natiivi-UI (Claude), Päätoimittajan 13.10. päätöksellä. Kolme 12.10. toimitettua kuvaketta ei ole tunnistettavia pienessä koossa, tehdään uudelleen. **Sama viivatyyli, ehdot ja toimitusmuoto kuin `posti/fable-codex-kaikki-kuvakkeet-20261012.md`** (viewBox 0 0 24 24, `currentColor`, viiva 1.75, pyöreät päät ja liitokset, **ei täyttöä** (ei `class="taytto"`), vain path/rect/circle/ellipse/line/polyline/polygon, ei tekstiä, ei transformeja, ei dasharrayta; PYSYVÄ EHTO: kaikki piirretään itse alusta, ei kopioita Material/SF Symbols/Font Awesome/Lucide/Feather-kuvakkeista eikä logoja; luettavuus 20–28 pt vaalealla ja tummalla taustalla; yksi väri). Vertailukuva (nykyinen uusi): `/Users/Shared/Claude/proto-3d/lokit/natiivi-ui-kuvakkeet187-pt/0-kuvakkeet-nykyinen-uusi.png` (Natiivi-UI:n paikallinen; ei välttämättä Codexin luettavissa — nykyiset SVG:t ovat `posti/kuvakkeet-20261012-kaikki/{kolikko,juliste,matkamuisto}.svg`).

### Kolme korjausta
1. **`kolikko`** (TunnusRaha): nykyinen näyttää kulholta. Pyöreä KOLIKKO suoraan edestä: ulkorengas + sisärengas (reunarengas) ja keskellä £-merkki TAI yksinkertainen kohokuvio (esim. kruunu/laakeri); ympyrä täysin pyöreä (ei ellipsiä, ei sivuperspektiiviä, ei pinoa).
2. **`juliste`** (PilleriJulisteet): nykyinen näyttää kaaviolta. Juliste on KUVA: suorakaidekehys + kuva-aihe sisällä (esim. kaksi vuorenhuippua ja aurinko/kuu) TAI rullattu juliste (rullat ylä- ja alareunassa + kuva). Ei viivakaaviota, ei tekstiriviä.
3. **`matkamuisto`** (Viiva["matkamuisto"]): nykyinen näyttää kaaviolta. Matkamuisto on ESINE: esim. pieni ristikkotornin figuuri jalustalla (yleinen "torni", EI Eiffel-torni-kopiota eikä suojattua kohdetta), lumisadepallo (pallo + jalusta + hiutale) tai postikortti ja postimerkin leima. Valitse tunnistettavin 24 pt:ssä; jos epäselvää, toimita kaksi vaihtoehtoa (`matkamuisto` ja `matkamuisto-b`).

### Toimitus
- `posti/kuvakkeet-20261013-korjaus/<nimi>.svg` + `bodies.json` (nimi → sisältö ilman `<svg>`-käärettä) + `ikonit-viiva-sisallot.cs.txt` (`Viiva["nimi"] = "...";`) + yhteenvetoarkki PNG (vaalea + tumma, 48/24/20/22/28 pt) + QA kuten 12.10. toimituksessa.
- Kuittaus tiedostoon `posti/codex-fable-kuvakkeet-korjaus-20261013.md`.
- Tämä on kiireellinen mutta pieni: tee ENNEN saapumisintrojen jatkoa ja ennen muita tilauksia. Ei main-mergeä, versionnostoa eikä pelijulkaisua Codexilta.
