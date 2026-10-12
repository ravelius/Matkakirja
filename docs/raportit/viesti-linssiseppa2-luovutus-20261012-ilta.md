# Linssiseppä 2 – luovutus 12.10.2026 klo 19.2x (Suomen aika), tilinvaihto (PT 19.3x)

Luovuttaja: Linssiseppä 2 (Opus, high). Vastaanottaja: Linssiseppä 2 uudella tilillä. Edellinen luovutus:
viesti-linssiseppa2-luovutus-20261011-yo.md.

## Lue ensin
1. `CLAUDE.md` (agentit vain Opus/Sonnet, VAIN EUROOPPA, AIKA).
2. Raamattu (`js/tyohuone-raamattu.js`): Ydinajatus kohta 2 "TYÖTAPA JA SESSIOT" sekä "MAC STUDIO: UUDEN SESSION ALOITUS ILMAN
   OMISTAJAN OHJETTA, JA MISSA AVAIMET OVAT".
3. Tämä raportti, KESKEN ylhäältä alas.

## Tila
- main = 260978ec7 (PT:n luovutus #4515). Junat: 183 TF:ssä (raketti 0821f6c07 mukana). Juna 184 kertyy; julkaisu vain omistajan pyynnöstä.
- Käännös- ja simuvuorot jakaa Julkaisija: KÄÄNNÖS NYT / SIMU NYT ja lopuksi LUKKO VAPAA / SIMU VAPAA. Jonoon ei mennä ilman NYT-viestiä.
- OMA iPad-simulaattori: **linssiseppa2-iPad13 A26BC7D0-7E43-4274-8BE6-97E3F14CF3A4**. D61642C8 on Natiivisepän laite. Skriptini
  käyttivät sitä vahingossa, ja se kaatoi klo 17.20 ja 18.22 ajot; kaikki _tyo/linssiseppa2-skriptit on vaihdettu.

## Pushatut haarat (proto-repo, natiivi-backup-peili) ja worktreet
| Haara | Worktree | Kärki | Sisältö | Tila |
|---|---|---|---|---|
| linssiseppa2/raketti-184b | wt/proto-linssiseppa2-muisti | **d502a7e5d** | raketti + Olavinlinnan torni kartta-nappeina, vihreät visanostot, Pilvikuori-korjaus, raketin karttamalli v2, **Cesium-istuntokorjaus** | käännös linja 1 ja simu käynnissä 19.13 (ketju alla) |
| linssiseppa2/keittio-koehuone | wt/proto-linssiseppa2-koehuone | bc8f47acc | keittiön koehuone (LR v3b, emissio, liuku-kävely) | v8b PT:llä; v8c otto samassa ketjussa |
| linssiseppa2/vuoristo-pilotti-184 | wt/proto-linssiseppa2-vuoristo | a92eae413 | maasto url + lapsi/vanhempi-vara + lahinleveys | pilotti-3 ajamatta (KS:n data valmis) |
Poistettu 12.10.: wt abc, museo, taidehalli, taytto, vesi (puhtaita, peilissä).

## KESKEN – tee nämä ensin
1. **184c-ketju** `proto-3d/_tyo/linssiseppa2/istunnot/ketju-184c.zsh` (linja 1, loki `lokit/linssiseppa2-ketju-184c.log`). Ketju ajaa
   järjestyksessä:
   - käännöksen d502a7e5d (app `lokit/linssiseppa2-app-184c`);
   - `sk-istunnot.txt`;
   - raketin `sk-raketti-kartta.txt` (uusi);
   - keittiö v8c `koehuone/sk-koehuone12.txt` (app koehuone12).
   Kun valmis:
   - Ilmoita Julkaisijalle LUKKO VAPAA ja SIMU VAPAA.
   - **Istunnot:** tarkista lokista seuraavat rivit:
     - `kaupunki: data Ion` (automaattiajo);
     - `Google-istunto 1`;
     - `Google-tileset lepoon` ja `levosta` (istuntoja yhä 1);
     - `opas testi429` → vara;
     - `Google-koetus 1` (vain endpoint);
     - `kaupunki istunnot`.
     Varmista myös, ettei lepo näy pallolla. Kuvat i1–i4 ja rivi PT:lle (PT kuittaa).
   - **Raketti v2:** kuvat k1 (Eurooppa), k3 hintalappu (odota 0.3) ja k6 tornin kortti (odota 9), parit `pari-taysi.py`:llä PT:lle.
     Aiemmat 6 kuvaa: `lokit/linssiseppa2-184-kartta-5a919f585/`.
   - **Keittiö v8c:**
     - ei hahmoja (`linssi linssi kerros Hahmo 0`);
     - reitti hyllyiltä ikkunaan ja loppu tulisijalle;
     - tarkista liike (`liike-tarkistus.py`), 3 s arkki ja transpose=2 1440×1080 äänellä → PT.
     - PT 19.1x: ei hahmoja kameran eteen, loppu tulisijaan tai kuunsäteeseen, hahmot joko LR:n MH (v48s ~20.45) tai ei ollenkaan.
2. **Keittiön liekit** (LR 19.0x): vartaan alla liekit vaaleat, lähes valkosiniset. LR ehdottaa:
   - pohja syvä oranssi ~#E0661E, keskellä keltainen, vain ytimen kärki vaalea;
   - tai liekin kirkkaus −0,5 EV tulipesällä.
   Tämä on DioraamaLiekit-puoli (minun), haara keittio-koehuone.
3. **Vuoristo pilotti-3** (KS): `vuoristo/ketju-vuoristo.zsh` (a92eae413, skenaario jo pilotti-3) KÄÄNNÖS NYT -viestillä → kuvat PT:lle ja KS:lle.
4. **Cesium-korjauksen jatko:** museoajo NS:ltä (muisti ≤ 2,57 Gt iPadilla) sen jälkeen, kun LS1:n lähestyminen (1d8838490) on yhdistetty.
   LS1 lisää ketjuihinsa `linssi kaupunki google 1`.

## Cesium-istuntokorjaus (PT:n kiireellinen, LS1 katselmoi ja hyväksyi)
Ion laskee Google-istunnoksi jokaisen root-tilesetin pyynnön. Ennen korjausta yksi avaus maksoi usein 3 istuntoa: LuoTileset 16·k →
KaupunkiKuva.Avattu 16 → muistikatto 16·k, eli kaksi RecreateTilesetiä. Lisäksi 429-koetus haki Googlen rootin minuutin välein.
Korjaus (CesiumKaupunki.cs):
- EnnenAktivointia ja SseLukittu: asetukset ennen aktivointia.
- Lepo (suspendUpdate, kerros 15). Vapautus: dioraama, museo (MuseoAuki), lowMemory, alle 1,2 Gt vapaata ja datan vaihto.
- Automaattiajo: Kartta/Testiajo.cs (komentotiedosto luettu) tai simu/editori → ion-vara.
- 401/403 → loppuajo varalla; koetus vain ionin endpointiin.
- Komennot: `linssi kaupunki google 1|0|auto`, `linssi kaupunki istunnot`, `linssi kaupunki lepo pois`.
Arvio PT:lle:
- pelaajan ajo ~7 → 1 istunto;
- todistusajo 2–3 → 0 istuntoa.

## Odottaa omistajan päätöstä
- **Googlen oma reitti (Map Tiles suoraan) ODOTTAA** (omistaja 19.3x): toteutetaan vasta, kun kiintiö käy vähiin. Arvio ~1 pv:
  - X-Ios-Bundle-Identifier Laattapalvelin-välityksen kautta, koska Cesium 1.25.1 ei lisää tilesetin otsakkeita;
  - Macille API-rajaus ja päiväkiintiö;
  - omistajalle laskutustili ja Map Tiles -ehdot.
- Juna 184:n kuittaukset: raketti ja torni sekä vihreät visanostot (PT katsoo kuvat), keittiö (otto v8c).

## Voimassa olevat työtavat (muuttunut tässä vuorossa)
- Omistajan kuvat täysikokoisina (pari-taysi.py) ja liike tarkistettu ennen videota. VAATII TOIMIA → Asemataulu (talo/toimi-linssiseppa2).
- Kuorma: odota, että 1 min kuorma on alle 100, ennen simua (skripteissä). Levy: proto-kaanna vaatii ≥ 25 Gt, ja Julkaisija pyytää ≥ 27 Gt.

## Ympäristö
Kaikki _tyo/linssiseppa2:ssa: pari-taysi.py, liike-tarkistus.py, raketti/, koehuone/, vuoristo/, istunnot/. Avaimet Raamatun Mac Studio -osion
mukaan (ei arvoja tänne).

## Velat ja opetukset
1. Raketin karttakuvake: v2 (LR iss-raketti-kartta-v2) on mukana, mutta iPad-kuva puuttuu.
2. Tornin ja raketin kuvien peilaus: houkuttimien väistö kääntää ne; harmiton.
- OPETUS: tarkista simulaattorin nimi ennen kuin otat UDID:n vanhasta skriptistä (`simusarja.sh` + `simctl list`).
- OPETUS: Cesium-asetin aktiivisella tilesetillä = RecreateTileset = uusi root-pyyntö. Aseta kaikki ennen SetActivea.
- OPETUS: oman build-ketjun pysäytyksen jälkeen siivoa kopio skriptin trapin tavoin (reset, clean, burst_jit_palauta, lukko pois).

## Aloitusviesti uudelle sessiolle
Katso `docs/raportit/viesti-linssiseppa2-aloitus.md` (päivitetty samassa commitissa).
