# Karttaseppä: luovutus 2.11.2026 klo 08.53 (KS)
Edellinen: viesti-karttaseppa-luovutus-20261102-0836.md (käsitelty). Syy: kontekstivahti 26 %.
C = `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-pohja/codex-pseudo3d/`, CX = `/Users/Shared/Claude/proto-3d/_tyo/codex/`.
Koko kulku: `C/lahitaso-20261101/MUISTIO.md` (merkinnät 2.11. 08.40–08.53).

## TEHTY (08.36–08.53)
1. Putki varmistettu: koottu-65 → tee-tasot → pienennys → hillintä = kokoelma/G-tasot-66-hill pikselilleen (54/54 + tasot.json).
2. Kadonneet ihmeet (omistaja 08.42): nykyrakennuksen päällä olevat kylttiratkaisuun. Codexilta peruttu Orsay, Industrie,
   Trocadéro, Halles (postilaatikko 507e3de2e; Codex ei ollut aloittanut). Leikkeiksi 5: Grand Châtelet, Temple-torni,
   Tuileries'n palatsi, Galerie des Machines, Bastilji (Heinäkuun pylväs / Opéra Bastille eivät ole piirroksessa).
   Kylttiankkurit NUI:lle: `C/ihmeet-20261102/KYLTIT-NUI.md` (Orsayn taidemuseo, Grand Palais, Palais de Chaillot).
3. Pariisin 38 karttakohdetta piirroksen paikoille (omistaja 08.40–08.44, Raamattu 2.204): `C/kohteet-20261102/sijainnit.py`
   → `sijainnit.json` (lat_kuva/lon_kuva, ratkaisu piste|leike|kyltti, peruste) + `yleiskuva.jpg`; 26/38 siirtyi. NUI:lle.
4. Codex-tilaus turisti-info + lehtikioski (postilaatikko 1bbfff840): kaupunkineutraalit rakennukset (4×-master + Pariisi-leike),
   Pariisissa Place de l'Opéra Garnier'n edessä (`C/info-kioski-20261102/`, `CX/turistiinfo-lehtikioski/tilaus-20261102/`).
5. Seinen veneet: Codex 2b6230fa8 (SHA ok) liitetty vain jokialueelta (saumat 8/8 tarkistettu) → `C/veneet-20261102/koottu-66v.png`
   → kokoelma/G-tasot-67v-hill (11/54 muuttui) → `_valmiit/pariisi-tasot-veneet-20261102-vienti-20261102` (TasoVersio
   "veneet-20261102", SHA256SUMS). Veneet hillittyinä + reitti: `C/veneet-20261102/natiivi-veneet/` (NUI:lle). Pari PT:lle:
   `C/veneet-20261102/pari-seine-ennen-jalkeen.jpg`, `veneet-hillitty.jpg`. Kuittaus Codexille 257a3f691.

## AVOIN (järjestyksessä)
1. **Veneiden laatat VIETY** (JU 08.56: piirroskartta/pariisi/veneet-20261102/ 54/54, julkinen SHA ok). TasoVersion vaihto vain samassa junassa NUI:n liikkuvien veneiden kanssa.
2. **Ihmeet, kun Codex toimittaa** (`CX/pariisi-kadonneet-ihmeet/_review-20261102/`, 5 kohdetta): kartalla-<t>.png → PT (→ KK).
   Sijainti NUI:lle: kangas x = rajaus_x0 + vasen + leveys/2 (paikat.json), lat_kuva = 48.896857 − 0.071176·y/6744,
   lon = 2.272929 + 0.134148·x/9901; päivitä samalla sijainnit.json:n leike-rivit (alustavat). Leikkeet ämpäriin uuteen kansioon.
3. **Info + kioski, kun Codex toimittaa** (`CX/turistiinfo-lehtikioski/_review-20261102/`): PAIKKA VAIHDETTU Place de
   l'Hôtel de Villelle (PT 08.5x, omistaja 08.45: zoom päättyy keskustaan), muutosposti 3b537739e (Codex oli aloittanut 4757f6a5d
   juuri ennen; 4×-masterit ennallaan). kartalla-pariisi-hotel-de-ville.png → PT (→ KK); sijainti NUI:lle samalla kaavalla
   (`C/info-kioski-20261102/tilaus-hdv/paikat.json`, rajaus_x0 5292, rajaus_y0 3048; info 6030,3580, kioski 6190,3600).
4. **Forum des Halles: PT KYLLÄ (08.5x)** → uusi nykyinen kyltti 48.8625, 2.3450 ja kadonnut ★ alle; kirjattu KYLTIT-NUI.md:hen ja
   sijainnit.json:iin (ankkurikyltti). Wikidata-tunnus tarkistettava.
6. **NUI:n leikekerros valmis** (proto natiivi-ui/piirros-tahti-218 c4f9e16ba): PiirrosKerros.Leikkeet = {(tunnus, pohjoinen,
   etela, lansi, ita)} maanpinnan leveyksinä kuten Tasot; kuvat <kansio>/leikkeet-20261102/leike-<tunnus>.png (RGBA). Täytä
   rivit Codexin kulmista (kohta 2) ja lähetä NUI:lle; kyltit (★) tekee NUI:n seuraaja.
7. Info-paikka ratkaistu (kohta 3). Veneiden pari: PT kuittasi JU:lle 08.5x.
5. Vanhat: NUI:n vastaus maamerkkien alojen muotoon; muut kaupungit vasta tilauksesta.
Postilaatikon worktree: `/Users/Shared/Claude/wt/karttaseppa-postilaatikko-veneet` (claude/postilaatikko); poista, kun ihmeet ja
info/kioski kuitattu. Vahtiskripti (review-kansiot + posti) oli tämän session Monitorissa; käynnistä omasi.
