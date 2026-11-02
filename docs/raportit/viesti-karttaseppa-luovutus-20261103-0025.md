# Karttaseppä: luovutus 3.11.2026 klo 00.25 (KS)
Edellinen: viesti-karttaseppa-luovutus-20261102-2210.md (fbccc7568; käsitelty: AVOIN 1 tunnisteajo valmis, AVOIN 3 B ja D valmiit, AVOIN 2 jatkuu alla).
Syy: kontekstivahti 26 %. P = `/Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-valmis-runko-20261102/` (LUE.md = työtapa),
T = `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/kohdetunnisteet-20261102/`, posti-worktree `/Users/Shared/Claude/wt/karttaseppa-postilaatikko`.

## TEHTY
1. **B + D (omistaja 2.11. 21.42, KK:n suunnitelma 20261102-nostot-ja-zoomaus-kaikkiin): PR 6047 MAINISSA (0579bb1c3), skeema 1.68.**
   - `data/kaupunkikeskustat.json` (`tools/sisalto/kaupunkikeskustat.mjs --vienti <paketti> --valimuisti <kansio>`): 55 keskipistettä
     OSM-tarkistettuna (Overpass, peilit vuorotellen; välimuisti `proto-3d/_tyo/karttaseppa/keskipisteet-20261102/overpass-v2/`).
     13 poikkeamaa ratkaistu KASIN-taulussa lähteineen; Pariisi = kioski 48.857, 2.351. Alueet alpit, lappi, islanti, kreeta, sisilia
     (PT 22.2x): rajaus nostojen + kohdekartan ulkorajasta + 10 % (≥ 5 km). Vienti `kaupungit.keskusta {lat, lon}` ja `kaupungit.alue
     {p, e, l, i}` (NUI:n muoto, NUI sai SHA:n).
   - `data/nostopaikat.json` (D, Sonnet-parvi; aineisto `proto-3d/_tyo/karttaseppa/nostopaikat-20261102/` ehdokkaat + tulos-1..3):
     53 alle 300 m kaupungin pisteestä olevaa nostoa → 10 siirtoa lähteineen, 5 viuhkaan (`karttavalot.viuhka: true`), loput jo omilla
     paikoillaan (KS:n hylkäämät siirrot perusteluineen: Paço da Ribeira, Kreml, Kustaa III:n ooppera, Erzsébet-silta, Bern 1905).
     `tools/sisalto/tarkista-nostopaikat.mjs --vienti <paketti>`: alueella, ei vedessä, ei 25 m päällekkäin → 0 poikkeamaa.
2. **Tunnisteajo valmis 2.11. 22.57** (T/ajo.log, viimeinen islanti). Neljä käsilukkoa (`tapa: 'käsin'`) lisätty
   `wt/karttaseppa-kohdetunnisteet/data/kohdetunnisteet.json`:iin (610 tunnistetta; tiedosto vielä committaamatta).
3. Codexin posti 67a53bb14 luettu: palojen 1–15 generointeja ei vielä tehty, pala06:n ohjaus valmisteltu. Ei toimenpiteitä.

## AVOIN (järjestyksessä)
1. **Kohdesijainnit-ajo irrallisena** (pid `T/sijainnit.pid`, loki `T/sijainnit-ajo.log`, käynnistetty 00.22, ~30 min; uudelleen
   `zsh T/kaynnista-sijainnit.zsh`). Valmis = pid poissa ja lokin viimeinen rivi ei virhe → tulos `data/kohdekartat-sijainnit.json`
   worktreessä wt/karttaseppa-kohdetunnisteet. Sitten luovutuksen 1430 AVOIN 4: ero-lista, KAUKANA-osumat ensin → lista PT:lle
   (≤ 3 riviä, yksityiskohdat tiedostoon), ehdokkaat (`T/ehdokkaat.json`) käsin, raportti `docs/raportit/kohdetunnisteet-20261102.md`,
   commit (data/kohdetunnisteet.json + data/kohdekartat-sijainnit.json + raportti) ja PR haarasta karttaseppa-kohdetunnisteet
   (rebase origin/main ensin; haara 91ccdbf70).
2. **Pariisin palat 1–15** kuten edellisessä luovutuksessa (AVOIN 2): seuraa Codexin postia (`git log origin/claude/postilaatikko`,
   "Codex → Karttaseppä") ja `P/_review-palaNN/`; tarkistus `tarkista_ala.py`, kylttisiirrot, kokoaminen, tasot, TasoVersio, siltaleikkeet,
   Seinen venereitti NUI:lle, koottu kaupunki KK:lle + PT.
3. **G (KS + NUI):** kun kaupungin piirros valmistuu, merkintä piirroskaupungiksi yhdellä rivillä (Pariisin suunnitelman osa I).
   NUI:n E (nostot kaikkiin) käyttää 1.68-kenttiä; vastaa NUI:n kysymyksiin keskipisteistä/viuhkasta.
4. Vanhat: NUI:n vastaus maamerkkien alojen muotoon; 7.48: muita Pariisin osia ei aloiteta ennen KK:n suunnitelmaa ja PT:n viestiä.

## Opit
- Overpass `out tags` ei anna solmun koordinaatteja (käytä `out;`). overpass-api.de antoi 502:ta tunteja: kierrä peilejä alusta asti.
- Keskustan tuntumassa oleva nosto ei ole automaattisesti paikaton: 53:sta 31 oli jo oikealla paikallaan.
