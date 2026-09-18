# Poltto ilman välitilaa: yksi ajo ja paikalliset lähdelaatat

Opus-kehitysagentti Fablelle 18.9.2026. Haara
`claude/bold-ride-vow4ki-poltto-yksi-ajo`. Ei PR:ää, ei versionnostoa,
ei vientiä ämpäriin — mittaus tehtiin vain lukemalla.

Tausta: Raamattu, AGENTIT TARKENNUS 10 kohta 20 (omistaja 18.9.2026).
Tänään nostotaso ja pallon Mercator-sarja poltettiin erikseen, ja
`julisteet/pyramidi/pyramidi.json` vietiin ENNEN pallon sarjaa — pelin
pallo oli sumea 1 h 15 min, koska lepokerroksen versiovahti
(`js/pallolaatat.js` `lepokerroksenKerrokset`) vaatii, että pallon
`laatat.json`:in `nostot` on sama kuin luettelon `nostotaso.versio`.

## 1. Yksi ajo, luettelo vasta lopuksi

Uusi tila `tools/polta-paikallisesti.sh --nostot-ja-pallo` (funktio
`polta_nostot_ja_pallo`). Vaatii uuden `--nostoversio` ja
`--pallotunniste`. Järjestys:

1. **Nostotason shardit** (`nosto-z5-z7`, `nosto-z8`) uuteen
   versiopolkuun ja vienti ämpäriin. Polku on uusi, joten kukaan ei
   lue sitä vielä — vienti on pelille näkymätön.
2. **Yhdistetty luettelo PAIKALLISESTI**: `kokoa_luettelo` +
   `tools/yhdista-nostoluettelo.mjs` →
   `<ulos>/luettelo/pyramidi-yhdistetty.json`. Ei vientiä.
   Eheystarkistus ajetaan tässä kohdassa nostoshardeille.
3. **Pallon shardit**, jotka lukevat luettelon levyltä
   (`tee-pallolaatat --luettelo <polku>`) ja lähdelaatat levyltä
   (`--lahde <kansio>`). Pallon `laatat.json` viedään vasta, kun
   kaikki osat ovat ämpärissä (tämä oli jo `polta_pallo`:n vaihe 3).
4. **VASTA NYT luettelo ämpäriin** (`vie_luettelo <polku>`, lyhyt
   välimuisti `max-age=300`).

Ämpärin tila on siis joka hetki ehjä: vanha luettelo + vanha pallo,
tai uusi + uusi. Lopuksi tulostuu MUISTA-rivi (`js/pallo.js`
`PALLO_LAATTATUNNISTE` ja versio julkaistava).

Muut muutokset samassa: `--sarjat nostot` (pelkkä nostotaso z5–z8,
ilman pohjaa ja viivoja), `vie_luettelo` ottaa polun argumenttina,
`polta_pallo` välittää `--pallo-luettelo` ja `--pallon-lahde`
lapsiprosesseille, ja `--vain-luettelo`-ajo käyttää samaa paikallista
luetteloa (muuten pallon `laatat.json` olisi saanut vanhan
nostoversion). `--siivoa` ohitetaan yhden ajon tilassa, koska juuri
poltetut nostolaatat ovat pallon lähde.

Vanhat tilat (`--sarjat z8|kaikki|z0-z7|pallo`, `--vain-pallo`,
`--vain <shardi>`, `--koe`) toimivat ennallaan; uudet liput ovat
valinnaisia.

## 2. Lähdelaatat paikallisesti

`tools/tee-pallolaatat.mjs`:

- `--luettelo <polku>` — luettelo paikallisesta tiedostosta ämpärin
  URL:n sijaan.
- `--lahde <kansio>` — lähdelaatat levyltä. Kansion rakenne on sama
  kuin ämpärissä `julisteet/pyramidi/` alla
  (`<versio>/z6/12/34.webp`, `<nostoversio>/nostot/z7/…`).
- Kansio on **totuus, ei välimuisti**: puuttuva tiedosto = ämpärin 404
  (läpinäkyvä kerros, umpimeri pohjassa). Verkkoon ei palata, koska
  hiljainen paluu tekisi vajaasta synkronoinnista näkymättömän.
- `varmistaLahde()` tarkistaa ENNEN ensimmäistä laattaa, että jokainen
  tarvittava kerros/taso-kansio on olemassa, ja kaatuu selkeällä
  viestillä jos ei ole (testattu: `--max 7` vajaalla kansiolla → exit 1
  ja lista puuttuvista poluista).
- Edistymisrivi kertoo nyt myös `levyltä N, verkosta N`.

`polta-paikallisesti.sh`:n `kokoa_lahde` kokoaa kansion
`<ulos>/lahde`: pohja- ja viivataso (ja ranta vain jos `--pallon-ranta`)
synkronoidaan ämpäristä kerran tasoittain (`aws_viritys`-rinnakkaisuus,
`--cli-connect-timeout`), ja nostotaso kopioidaan suoraan juuri
poltettujen shardien työkansioista. Tarvittava kaista on z(min−1)…
z(max−1), koska pallon taso Z lukee pyramidin tasoa `max(0, Z−1)`.
`--noutovali` menettää merkityksensä paikallisluvussa.
`--ei-pallon-lahdetta` palauttaa vanhan verkkoluvun.

## 3. Mittaus (ei vientiä)

Kohdemittaus: pallon Mercator-tasot 0–5 = **1 365 laattaa**, sama
luettelo (ämpärin `pyramidi.json` 18.9.), `--nostot --ilman-rantaa`,
yksi prosessi, Mac Studio. Tulos kirjoitettiin vain scratchpadiin;
ämpäriin ei viety mitään.

| ajo | lähdelaatat | kesto | lähdelaattoja |
|---|---|---|---|
| paikallinen (`--lahde`) | 516 levyltä, 0 verkosta | **12 s** | 386 noudettu |
| verkko (`--noutovali 40`) | 0 levyltä, 772 verkosta | **41 s** | 386 noudettu |

3,4-kertainen ero — ja tämä on verkkoajon **paras** tapaus: yksi
prosessi 40 ms:n noutovälillä. Tuotannon 16 shardia ajavat 240 ms:n
noutovälillä (`YHTEISTAHTI_MS × rinnakkaiset`), eli kuusi kertaa
hitaammalla noutotahdilla; juuri siksi 18.9. ajo kesti 20 min alle
20 %:n CPU-käytöllä. Paikallisluvussa noutoväli ei vaikuta mihinkään,
joten koko sarjan (87 381 laattaa) pitäisi mennä selvästi alle
10 minuutin 16 shardilla — täysi mittaus vaatii avaimet ja vientiajon,
eikä sitä tehty tässä erässä.

Lähdekansio z0–z4 (pohja + viivat) on 524 laattaa / 13 Mt; koko sarjan
z0–z7 on suurempi, mutta se on kertakustannus ajoa kohti.

**Ristiintarkistus:** paikallisen ja verkkoajon 1 365 JPG-laattaa ovat
`diff -r`:llä **tavu tavulta identtiset**. Paikallinen luku ei siis
muuta lopputulosta.

## 4. Komento, jolla seuraava poltto ajetaan (tunniste h)

```
source ~/.zshrc                       # AMPARI, PAATE, AWS_*
export PATH=/opt/homebrew/opt/node@22/bin:$PATH
tools/polta-paikallisesti.sh --nostot-ja-pallo \
  --nostoversio 2026-09-19-nostot \
  --pallotunniste h \
  --pallo-osia 16 \
  --ulos ~/pyramidi-poltto
```

Yksi komento tekee kaiken: nostotaso ämpäriin, luettelo paikallisesti,
lähdelaatat levylle, pallon sarja ämpäriin, luettelo viimeisenä.
Ajon jälkeen `js/pallo.js` `PALLO_LAATTATUNNISTE = 'h'` ja versio
julkaisuun (docs/roolitus.md, Julkaisusäännöt). Edistyminen näkyy
tuttuun tapaan osoitteessa
`https://media.matkakirja.app/julisteet/poltto/<ajo-id>/edistyminen.json`.

Vain nopeutus ilman uutta tilaa:
`tools/polta-paikallisesti.sh --vain-pallo --pallotunniste h
--pallon-lahde <kansio>` (kansio on koottava itse) tai
`--pallo-luettelo <polku>`.

## 5. Riskit

1. **Vajaa lähdekansio näkyisi merenä.** Torjuttu `varmistaLahde()`:lla,
   joka vaatii jokaisen kerros/taso-kansion olemassaolon. Se ei
   kuitenkaan laske laattoja: jos synkronointi jää kesken kansion
   sisällä, yksittäisiä laattoja voi puuttua hiljaa. `aws s3 sync`
   palauttaa virhekoodin ja `set -e` kaataa ajon, joten tämä vaatisi
   onnistuneen mutta vajaan synkronoinnin. Jos epäilyttää:
   `--ei-pallon-lahdetta`.
2. **Levytila.** Lähdekansio z0–z7 + pallon shardit ovat gigatavuja.
   `--siivoa` on pakotettu pois yhden ajon tilassa (nostolaatat ovat
   lähde); lähdekansio jää `<ulos>/lahde`iin ajon jälkeen ja voi
   poistaa käsin.
3. **Nostoshardin kaatuminen** keskeyttää ajon ennen luettelon vientiä
   — ämpäriin on silloin jäänyt uuden nostoversion laattoja, jotka
   eivät ole kenenkään luettelossa. Harmittomia (sama logiikka kuin
   ennenkin: laatat saa viedä, luetteloa ei), ja uusinta samalla
   komennolla ohittaa valmiit shardit.
4. **Pallon ylikirjoitussuoja** toimii ennallaan: valmis
   `laatat.json` samassa tunnistekansiossa kaataa ajon ennen shardeja.
5. **Yhdistetyn luettelon vartio** (`yhdista-nostoluettelo.mjs`)
   sallii vain `nostotaso`- ja `erat`-kenttien muuttumisen; jos
   nostoajo muuttaisi muuta, ajo kaatuu ennen palloa.

## 6. Testit

- `node --test tests/*.test.mjs` → `# pass 3613`, `# fail 0`,
  `# skipped 13`.
- `bash -n tools/polta-paikallisesti.sh` → puhdas.
- `tests/pallo.test.mjs` (aws-kutsujen `--cli-connect-timeout`
  -laskenta) huomasi uudet synkronointikutsut oikein; kaikki kolme
  saivat aikakatkaisun.
