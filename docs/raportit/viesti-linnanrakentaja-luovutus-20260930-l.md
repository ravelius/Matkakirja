# Linnanrakentajan luovutus 30.9.2026 klo 23.0x (-l): kuori v16b ja v17 viety, vaihe 4 tehty

Rooli: **Linnanrakentaja (Opus, high)**. Edellinen `…-20260930-k.md` (säännöt pätevät). Olavinlinna on koko tiimin
ykköstyö. Omistajan laatulinja: älä pudota laatua; kevennys vain iPhone 15 Pro tai heikompi.

## Junassa (Julkaisija, älä pushaa näihin)
- **#3724** kuori v16b (romusiivous 26 aluetta + vaihe 4: tavoitekuvan taivas, 28 ulkosoihtua, 4k-valo × 8k-albedo),
  blender.json **7c470d2e110344eb** (Päätoimittaja vei). #3717 suljettu (sama sisältö).
- **#3732** kuori v17 (kaakon muurin juuri omalla UV:lla, kuori_tayte.py), blender.json **147050746c3ff9a9** (viety),
  kirjasto.json. Merge #3724:n jälkeen. **Osoitin v17:ään vasta Siirtosepän puhtaan asennuksen kuittauksella.**
- **#3726** kertojan laiturijakson vanhat kamera-arvot pois. **#3727** keittiön mikseriotot (Pelikoodari).
- Aiemmat: #3702 (äänet), #3714 (massa-äänitila).

## Putki (kaikki tools/dioraama/blender/)
- `kuori_putki.sh <ulos>`: OBJ → siivous → LOD → ESRGAN 8k → hämärä (--tavoite --albedo --tasoita) → ikkunat → ASTC
  → maski, noin 9 min. Tulos: `<ulos>/ulkokuori/`. Vaihto: vanha `olavinlinna-blender/ulkokuori` → `ulkokuori-vNN`,
  uusi tilalle, senaatti-alkup + hybridi/sarjat + LAHDE.md mukaan, sitten `vie-blender.sh --kuiva`.
- Siivouksen ALUEET: `(nimi, monikulmio, korkeus, ryhmä[, maa])`. Tavat: poista / jata / paikkaa / tayta.
- Esikatselu (valaisematon, kuten pelissä): scratchpadin `valaisematon.py` (kamerat romu-*, vene-portti).
- Varmuuskopiot: `ulkokuori-v15` (nyt pelissä) ja `ulkokuori-v16b`. Poista, kun osoitin on v17:ssä.

## Avoimet
1. Hämärän kaakon juurelle jäi muutama ohut tumma varjopiikki (rako), ja itämuurin harjan vasempaan alakulmaan pieni
   sileä kohta.
2. Epävarmat romukohteet jätetty (Päätoimittaja: koillisen kansi ja teräspylväät jäävät).
3. Codex E (julkisivu) ei ole saapunut. Vahti päättyy noin klo 23. Tarkista posti/codex-linnanrakentaja-olavinlinna-julkisivu-20260930.md.
4. Ikkunamaskin pisteiden siivous (ikkunat eivät osu kaikkiin aukkoihin), kallion toisto 3,5 m (Siirtoseppä
   lähettää laiturikuvan), kirjaston loput (tarrat, hamara-esiasetus, vesi, vie-kirjasto.sh).
