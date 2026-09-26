# Karttasepän luovutus 26.9.2026 iltapäivä (sessio 11 → 12)

Rooli-worktree `/Users/Shared/Claude/Matkakirja-karttaseppa`, haara `karttaseppa-tyo-20260922` (EI mergetä).
Edellinen luovutus `viesti-karttaseppa-luovutus-20260926.md`. Erät tehdään `tools/uusi-worktree.sh karttaseppa <aihe>`,
poisto `--poista` (jos kansio jää: `git ls-remote` ja `rm -rf`). Commit `-c user.name=ravelius -c user.email=sami@valokuvaamoklik.fi`.

## KÄYNNISSÄ: Z10-KETJU (omistaja 16.3x, 16 ydintä myös päivällä)

Ketju on irrotettu istunnosta (os.setsid + nohup), joten nollaus ei pysäytä sitä.
- **Ketju:** `/Users/Shared/Claude/pyramidi-poltto/ketju-z10.sh`, loki `/Users/Shared/Claude/pyramidi-poltto/ketju-z10.out`.
  1. **Kaupungit ±1° + 14 fokusmaata:** ajokansio `ajo-20260926s/`, polttoskripti `aja-yo.sh`, loki `aja-z10-vahti.out`. Laattoja 36 337 (z10 27 991 + z9 8 346), 419 shardia, valmiina 53 klo 17.00.
  2. **Maakuntamaat (138):** ajokansio `ajo-20260927m/`, polttoskripti `aja.sh`, loki `aja-vahti.out`. Laattoja 270 344 z10 + 71 568 z9 (ensimmäisen ajon laatat vähennetty), arvio 11–13 h. Alkaa automaattisesti ensimmäisen perään.
- **Kohde:** uusi versio `julisteet/pyramidi/2026-09-26s-pohja/`. z0–z8 kopioitiin palvelinkopiona pohjasta 26 (92 968/92 968, 0 eroa), z9–z10 tulevat poltosta. Tuotannon osoittimia EI vaihdeta.
- **Koodi:** worktree `/Users/Shared/Claude/wt/karttaseppa-syva-monialue`, PR #3325 (`--syva-laatat`, `tools/tee-syva-laatat.mjs`, resepti syvälle sarjalle, tyhjät kaistat pois). Julkaisija pitää PR:n pidossa polton loppuun. Merge ja worktreen poisto polton jälkeen.
- **Polttovahti** `/Users/Shared/Claude/pyramidi-poltto/polttovahti.sh` (Fablen ehdot 16.4x):
  - Pysäytys: clang käynnissä, muistipaine warn/critical, swap kasvaa ajon aikana yli 6 Gt tai levy < 70 Gt.
  - Jatko: 5 min peräkkäin ilman clangia, paine normaali ja levy ≥ 75 Gt.
  - Absoluuttista swap-rajaa ei ole, koska macOS ei pienennä käytettyä swapia.
  - Poltto ajetaan omassa prosessiryhmässään. Valmiit shardit ohitetaan uusinnassa, kesken jääneet poltetaan uudestaan.
- **Seuranta:**
  - `tail /Users/Shared/Claude/pyramidi-poltto/ketju-z10.out` (käynnistys- ja pysäytysrivit).
  - `ls <ajokansio>/lokit/*.valmis | wc -l`.
  - Ämpäri: `aws s3 ls s3://$AMPARI/julisteet/pyramidi/2026-09-26s-pohja/z10/ --recursive --summarize` (Bashissa `zsh -c 'source ~/.zshrc; …'`).
- **Pysäytys käsin:** `pkill -f pyramidi-poltto/ketju-z10.sh; pkill -f pyramidi-poltto/polttovahti.sh`, sitten `kill -TERM -$(ps -o pgid= -p $(cat <ajokansio>/aja.pid))`.
- **Jatko käsin:** `nohup python3 -c 'import os,sys; os.setsid(); os.execvp(sys.argv[1], sys.argv[1:])' zsh /Users/Shared/Claude/pyramidi-poltto/ketju-z10.sh > …/ketju-z10.out 2>&1 < /dev/null & disown`.
- **Käännösilmoitukset:** Natiiviseppä, Natiivi-UI ja Linssiseppä ilmoittavat käännöksistä. Vahti väistää ne itse, eikä ilmoituksiin tarvitse toimia. Tiheät käännökset hukkaavat kesken olleet shardit. Jos tahti jatkuu, pyydä niputtamaan.

**ENSIMMÄISEN OSAN JÄLKEEN** (`ketju-z10.out`: "1. poltto … koodi 0"):
1. Laattamäärät ämpärissä (z10 27 991, z9 8 346).
2. Kuvapari GRC Z10 Fablelle: z8-neljännes suurennettuna vs z10-mosaiikki, esim. Ateena z10 744–745 × 326–327 (malli päivän koepoltosta).
3. Rivi Fablelle ja Julkaisijalle: laattamäärä, koko, aika, virheet.

**KETJUN LOPUKSI:**
1. Luettelo koko listasta: `ajo-20260927m/syva-laatat-kaikki.json`, `--vain-luettelo`, tasot 0–10.
2. Luettelo koekansioon `julisteet/pyramidi/koe/2026-09-26s/pyramidi.json` (ei tuotantoon).
3. Rivi Fablelle ja Julkaisijalle (Julkaisija vapauttaa Mac-CI:n ja 04-TF:n).
4. #3325 junaan.

## PÄIVÄN VALMIIT (mergetty tai junassa)

- #3305 reitit1873 erä 2
- #3312 astro-pallo 43/47b + Versailles 8b
- #3315 elävien polut (käytä sarjaa `-26b`)
- #3316 maamaski maittain (157)
- #3321 lippuankkurit (161, tuotannossa 1.x v169)
- #3280 delta: --kuiva ja aineistotiiviste
- #3322 Z10-raportti
- #3326 nimiot-elavat vaadiAika

**Opit:**
- Delta vaatii saman aineiston. GLO-30-ruutuja saapui polttojen välissä, ja luettelo kantaa nyt aineistotiivisteen.
- NAS:n mtime on S3:n alkuperäinen, joten saapumisaika näkyy ctimesta. `._`-tiedostot pois laskuista.

## AVOIMET

- **NAS-siirto:** `ajo-20260926` (8,7 Gt) ja `ajo-20260924-e28-syva` (3,6 Gt) rsyncillä `…/Matkakirja-arkisto/poltot/pyramidi/`. Käynnistetty 14.59 istunnon taustalla, voi katketa nollauksessa. Tarkista `du -sh /Users/Shared/Claude/pyramidi-poltto/ajo-2026092*` ja aja uudelleen sama rsync (`--remove-source-files`, kaava `nas-ajo-20260925.sh`).
- **GSHHS-binääri:** `/Users/samireivinen/pyramidi-poltto/gshhs/gshhs_f.b` ei ole luettavissa (600). Luettavissa on `gshhs-data/ne_10m_ocean.geojson` (maarenkaat). SOEST ei vastaa.
- **Vanhat PR:t:** #3102 #3105 #3108 #3117 ennallaan.
