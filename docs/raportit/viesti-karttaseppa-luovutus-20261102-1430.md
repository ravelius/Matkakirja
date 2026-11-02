# Karttaseppä: luovutus 2.11.2026 klo 14.30 (KS)
Edellinen: viesti-karttaseppa-luovutus-20261102-1345.md (käsitelty: kohdat 0a, 0b ja 3 tehty). Syy: kontekstivahti 27 %.
C = `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-pohja/codex-pseudo3d/`, T = `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/kohdetunnisteet-20261102/`.

## TEHTY
1. **Siltaleikkeet (omistaja 13.19):** `_valmiit/pariisi-sillat-20261102/` (22 siltaa + valinnainen eiffel-joki, haamu3:n lähitaso 1 m/px,
   SHA256SUMS 23/23, LAHTEET.md, nui-rivit.txt, pari-sillat-kaikki(-pieni).jpg). Työ `C/sillat-20261102/` (kokoa.py, etsi.py, maski.py,
   tee-leikkeet.py). NUI kytki (natiivi-ui/piirros-sillat-218 cee38d922), JU vei mediaan 13.54. silta-18 sisältää Saint-Louis'n
   paviljongin (reitti kulkee sen itäreunan yli; reitin siirto ~60 px itään olisi siistimpi, ei tehty).
2. **Hehkut + maailmanperintö (omistaja 13.21):** ympyrät = NUI:n NostotKartalla.cs:720 pääkohdenoston kultahehku → NUI poisti
   (d7b4244c5, PaakohdeHehku = false). KS: proto `karttaseppa/perinto-kipinat-218` **9afaad3cc** (juna-218:n päällä):
   Resources/MaailmanperintoKipinat.json (469 Euroopan kohdetta, Wikidata P757 + P17 /w/api.php:llä, `proto-3d/_tyo/karttaseppa/kerrokset/
   eurooppa-perinto.py`; Turkista vain Itä-Traakia, Venäjästä lon < 61, ei Kaukasusta/Kyprosta) + KarttaKerrokset.LisaaPerintoKipinat
   (sama violetti kipinä ja portti kuin 18 nimetyllä; pelissä 468, yksi nimetty ohitetaan). Pari: käännös 8e64a1db3
   (parihaara karttaseppa/perinto-pari-218 = kipinät + NUI:n hehku), todistus `lokit/todistus-perinto-pari-218-ipad-20261102-1427`
   0 PUUTE, kuvat `proto-3d/_tyo/karttaseppa/perinto-pari-218/pari-perinto-218.jpg` + lahi.jpg → PT:lle 14.30. VUORO VAPAA JU:lle.
   HUOM: kerroksen komento on `ui kerros maailmanperinto 0|1` (ei "perinto").
3. **kohdesijainnit.mjs käyttää tunnisteita** (tämä haara 75adb788f): käsin osm (api/0.6, way /full keskipiste) ja käsin qid ennen wikiä,
   automaattinen qid wikittömille. Lontoo-koe: 6 tunnisteella, ero 0–139 m. Testiajo kirjoitti `data/kohdekartat-sijainnit.json`
   (vain lontoo, ei committoitu).

## AVOIN (järjestyksessä)
1. **PT:n kuittaus B-parille** → merge-pyyntö NS:lle: `karttaseppa/perinto-kipinat-218` 9afaad3cc (NUI:n d7b4244c5 menee omana).
   Parihaara karttaseppa/perinto-pari-218 on vain käännöstä varten (ei mergeen). Worktree `/Users/Shared/Claude/wt/proto-karttaseppa-perinto-218`.
2. **Tunnisteajo käynnissä** taustalla 14.0x alkaen (alkoi alusta; 14.30 noin 31/313 kaupunkia, loki `T/ajo.log`). Jos loki ei kasva,
   jatka: `node /Users/Shared/Claude/wt/karttaseppa-kohdetunnisteet/tools/sisalto/kohdetunnisteet.mjs --kaikki --ehdokkaat T/ehdokkaat.json >> T/ajo.log`.
3. **Ajon jälkeen** neljä käsin lukittua `data/kohdetunnisteet.json`:iin (nimet KAUPUNKIKARTAT-avaimista, pvm 2.11.2026):
   `nouakchott:Nouakchottin yliopisto` qid Q3119358 käsin "wiki-uudelleenohjaus antoi väärän Q:n"; `freetown:Fourah Bay College` osm way/28548338
   "Wikidatan piste = vanha rakennus Cline Townissa" (OSM-keskipiste 8.47816, −13.22129 tarkistettu); `bamako:Koulouban palatsi` osm node/8065650962
   "Wikidatan piste Koulouban kylässä"; `maseru:Basotho Hat Shop` osm node/5081504528 "Wikidatan piste 0,8 km itään".
4. Sitten `node tools/sisalto/kohdesijainnit.mjs --kaikki` → ero-lista; KAUKANA-osumat ensin → lista PT:lle; ehdokkaat käsin;
   raportti `docs/raportit/kohdetunnisteet-20261102.md`; PR tähän haaraan (data mukaan vasta valmiina).
5. Vanhat: NUI:n vastaus maamerkkien alojen muotoon; I monistus vasta kun Pariisi valmis; 7.48: muita Pariisin osia ei aloiteta
   ennen KK:n suunnitelmaa ja PT:n viestiä.
