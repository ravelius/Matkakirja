# Karttasepän luovutus 26.9.2026 ilta (sessio 12 → 13)

Rooli-worktree `/Users/Shared/Claude/Matkakirja-karttaseppa`, haara `karttaseppa-tyo-20260922` (EI mergetä).
Edellinen luovutus `viesti-karttaseppa-luovutus-20260926.md`. Erät tehdään `tools/uusi-worktree.sh karttaseppa <aihe>`,
poisto `--poista` (jos kansio jää: `git ls-remote` ja `rm -rf`). Commit `-c user.name=ravelius -c user.email=sami@valokuvaamoklik.fi`.

## KÄYNNISSÄ: Z10-KETJU, POLTTOVAHTI v3 (18.08 alkaen 8 ydintä)

Ketju on irrotettu istunnosta (nohup, stdin /dev/null), joten nollaus ei pysäytä sitä.
- **Ketju:** `/Users/Shared/Claude/pyramidi-poltto/ketju-z10-v3.sh`, loki `ketju-z10-v3.out` samassa kansiossa. Lokiin tulevat vahdin käynnistys-, pysäytys- ja ydinrivit.
  1. **Kaupungit ±1° + 14 fokusmaata:** ajokansio `ajo-20260926s/`, polttoskripti `aja-yo.sh`, loki `aja-z10-vahti.out`. Laattoja 36 337 (z10 27 991 + z9 8 346), 419 shardia, valmiina 68 klo 18.14. Tahti on 8 ytimellä noin 2 shardia/min, joten valmis arviolta klo 21–22.
  2. **Maakuntamaat (138):** ajokansio `ajo-20260927m/`, polttoskripti `aja.sh`, loki `aja-vahti.out`. Laattoja 270 344 z10 + 71 568 z9. Alkaa automaattisesti ensimmäisen perään samalla v3-vahdilla (sillä on oma katto, joka alkaa 99:stä).
- **Kohde:** versio `julisteet/pyramidi/2026-09-26s-pohja/`. z0–z8 kopioitiin pohjasta 26, z9–z10 tulevat poltosta. Tuotannon osoittimia EI vaihdeta.
- **Koodi:** worktree `/Users/Shared/Claude/wt/karttaseppa-syva-monialue`, PR #3325 (pidossa polton loppuun). Siinä on nyt myös commit **b37cbf19d** (pushattu 18.14): rinnakkaisuus tiedostosta, `POLTTO_YTIMET_TIEDOSTO`.

### Polttovahti v3 (`pyramidi-poltto/polttovahti-v3.sh`, Fablen päätökset 17.2x ja 17.5x)
- **Ei käännösväistöä.** Käännösilmoituksiin ei tarvitse toimia.
- **Ytimet tiedostosta `ajo-20260926s/ytimet.txt`:** jokainen shardi lukee rajan ennen alkuaan (mkdir-paikat `lokit/paikat/`). xargs ajetaan ylärajalla 16. Käynnissä olevat shardit ajetaan loppuun, uudet odottavat. **Ytimien vaihto ilman killiä:** `echo 6 > …/ajo-20260926s/ytimet.txt`. Vahti kirjoittaa tiedostoon 20 sekunnin välein arvon min(kellonajan ytimet, KATTO), joten käsin kirjoitettu arvo pysyy voimassa vain, jos se on sama. Pysyvään muutokseen ketju on käynnistettävä uudelleen env-muuttujalla `KATTO=6`.
- **Kellonaika:** 12 klo 07–22, 16 klo 22–07. **KATTO** laskee 4:llä jokaisessa painepysäytyksessä (alaraja 4), eikä se nouse takaisin.
- **Pysäytys** (kill koko ryhmälle): muistipaine warn/critical, swap kasvaa ajon aikana yli 6 Gt tai levy < 70 Gt. **Jatko:** 5 min peräkkäin paine normaali ja levy ≥ 75 Gt. Valmiit shardit ohitetaan.
- **Muisti:** yksi Z10-shardi vie noin 4 Gt. 8 rinnakkain vie noin 33 Gt, ja paine pysyy normaalina. 12 tai 16 rinnakkain yhdessä simulaattoreiden ja käännösten kanssa nosti paineen warniin 1–2 minuutissa (17.12–18.04, 7 pysäytystä). Swapia on käytössä noin 19,5/20 Gt pysyvästi (macOS ei tyhjennä sitä).
- **OPPI:** käännökset eivät pysäyttäneet vanhaa vahtia, vaan muistipaine. Lue vahdin syyrivi ennen kuin syytät käännöksiä.
- **OPPI:** omistajan etäpäätteestä käynnistetty ketju kaatui klo 17.52 (`OSError: Bad file descriptor`, python ilman stdiniä). v3 ohjaa nyt `< /dev/null`.

### Seuranta, pysäytys ja jatko
- **Seuranta:**
  - `cat /Users/Shared/Claude/pyramidi-poltto/ketju-z10-v3.out`
  - `ls <ajokansio>/lokit/*.valmis | wc -l`
  - `tail -3 <ajokansio>/<loki>`
  - `sysctl -n kern.memorystatus_vm_pressure_level` (1 = normaali)
  - Ämpäri: `aws s3 ls s3://$AMPARI/julisteet/pyramidi/2026-09-26s-pohja/z10/ --recursive --summarize`. Bashissa aja muodossa `zsh -c 'source ~/.zshrc; …'`.
- **Pysäytys:** `pkill -TERM -f 'ketju-z10-v3.sh|polttovahti-v3.sh|ajo-20260926s/aja-yo.sh|syva-20260926s'`. Maakuntavaiheessa vaihda kaksi viimeistä kuvioon `ajo-20260927m/aja.sh|syva-20260927m`. **Huom:** automaattitilan luokitin esti minulta kill-komennot ("Interfere With Workloads"), ja omistaja ajoi ne. Jos pysäytys tarvitaan, anna komento omistajalle Fablen kautta.
- **Jatko tai uudelleenkäynnistys:** `cd /Users/Shared/Claude/pyramidi-poltto && nohup zsh ketju-z10-v3.sh < /dev/null > ketju-z10-v3.out 2>&1 & disown`. Jos ensimmäinen osa on valmis, aja vain maakuntarivi `polttovahti-v3.sh`:llä (kaava ketjun 2. rivillä).
- **Vanhat versiot:** `polttovahti.sh` (v1, clang-väistö) ja `polttovahti-v2.sh`, samoin `ketju-z10.sh` ja `ketju-z10-v2.sh`, jäävät historiaksi. Älä käynnistä niitä.

**ENSIMMÄISEN OSAN JÄLKEEN** (`ketju-z10-v3.out`: "1. poltto … koodi 0"):
1. Laattamäärät ämpärissä (z10 27 991, z9 8 346).
2. Kuvapari GRC Z10 Fablelle: z8-neljännes suurennettuna vs z10-mosaiikki, esim. Ateena z10 744–745 × 326–327.
3. Rivi Fablelle ja Julkaisijalle: laattamäärä, koko, aika, virheet.

**KETJUN LOPUKSI:**
1. Luettelo koko listasta: `ajo-20260927m/syva-laatat-kaikki.json`, `--vain-luettelo`, tasot 0–10.
2. Luettelo koekansioon `julisteet/pyramidi/koe/2026-09-26s/pyramidi.json` (ei tuotantoon).
3. Rivi Fablelle ja Julkaisijalle (Julkaisija vapauttaa Mac-CI:n ja 04-TF:n).
4. #3325 junaan (sisältää nyt b37cbf19d:n).

## PR-TILAT 18.14

- #3280 delta (--kuiva, aineistotiiviste): MERGED
- #3315 elävien polut (sarja `-26b`): MERGED
- #3316 maamaski maittain (157): MERGED
- #3321 lippuankkurit (161): MERGED
- #3326 nimiot-elavat vaadiAika: MERGED
- #3325 syvä sarja + rinnakkaisuus tiedostosta: OPEN, pidossa polton loppuun
- Aiemmin mergetty: #3305 reitit1873 erä 2, #3312 astro-pallo + Versailles, #3322 Z10-raportti

**Opit:**
- Delta vaatii saman aineiston: luettelo kantaa aineistotiivisteen.
- NAS:n mtime on S3:n alkuperäinen, joten saapumisaika näkyy ctimesta. `._`-tiedostot pois laskuista.

## AVOIMET

- **NAS-siirto KESKEN:** `ajo-20260926` (jäljellä 4,5 Gt) ja `ajo-20260924-e28-syva` (3,6 Gt), rsync ei ole käynnissä. Aja uudelleen `--remove-source-files` kaavalla `pyramidi-poltto/nas-ajo-20260925.sh` kohteeseen `…/Matkakirja-arkisto/poltot/pyramidi/`. Aja se vasta, kun muistipaine sallii (rsync on kevyt).
- **GSHHS-binääri:** `/Users/samireivinen/pyramidi-poltto/gshhs/gshhs_f.b` ei ole luettavissa (600). Käytä `gshhs-data/ne_10m_ocean.geojson`.
- **Vanhat PR:t:** #3102 #3105 #3108 #3117 ennallaan.
