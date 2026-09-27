# Karttasepän luovutus 27.9.2026 klo 11.3x (sessio 14 → 15, tilinvaihto)

Rooli-worktree `/Users/Shared/Claude/Matkakirja-karttaseppa`, haara `karttaseppa-tyo-20260922` (EI mergetä).
Edellinen luovutus on `viesti-karttaseppa-luovutus-20260927.md`, ja siinä ovat Z10-ketju, polttovahti v4 ja merikohdat.
Commitit: `-c user.name=ravelius -c user.email=sami@valokuvaamoklik.fi`.

## TÄNÄ YÖNÄ: NATIIVIN PALLON Z10 KAUPUNGEILLE (ajastettu, käynnissä ilman sessiota)

- **Skripti:** `/Users/Shared/Claude/pyramidi-poltto/pallo-z10-20260927/aja.sh` (PID 72301, PPID 1, nohup, stdin
  /dev/null). Se odottaa klo 22.00 ja polttaa sitten 64 osaa, 8 rinnakkain, **vain levylle** kansioon
  `pallo-z10-20260927/ulos/10/`.
- **Lokit:** `aja.out` on yhteenveto (`ALKU`, `POLTTO koodi k, laattoja n/13856`), ja `poltto.log` on osien tuloste.
- **Mitä poltetaan:** kaikki 266 pelin kaupunkia (sisältöpaketti v51, `kaupungit.json`) ±1°. Mukaan tulevat vain
  Mercator-laatat, joiden alla pyramidin z9 (versio 2026-09-26s-pohja) on poltettu. Yhteensä 13 856 laattaa.
  Liput ovat reseptin 2026-09-26 pallon liput (`--suodatin laatikko --jpeg-laatu 90 --jpeg-444`) lisättynä sarjan
  lipuilla ilman viivoja ja rantaa (`--tunniste 20260926`).
- **Koodi:** PR #3393 (`tools/tee-pallolaatat.mjs --kaupungit`, `--lahdelaatat`), worktree
  `/Users/Shared/Claude/wt/karttaseppa-pallo-z10`. Poltto ajaa tästä worktreestä, joten ÄLÄ poista sitä ennen
  kuin poltto on valmis.
- **Laattalista Siirtosepälle** (offline.json, PR #3395) on jo toimitettu tiedostona
  `pallo-z10-20260927/pallo-z10.json`, muodossa `{ sarja, laatat: ["x/y"] }`, 13 856 laattaa. Polton jälkeen
  tarkista, että poltetut laatat vastaavat listaa, ja kerro Siirtosepälle tulos.
- **Tarkistus polton jälkeen:**
  ```
  cat /Users/Shared/Claude/pyramidi-poltto/pallo-z10-20260927/aja.out
  cd /Users/Shared/Claude/pyramidi-poltto/pallo-z10-20260927 && node -e 'const fs=require("fs");const l=new Set(require("./pallo-z10.json").laatat);let n=0,v=0;for(const x of fs.readdirSync("ulos/10"))for(const y of fs.readdirSync("ulos/10/"+x)){n++;if(!l.has(x+"/"+y.replace(".jpg","")))v++}console.log("poltettu",n,"listan ulkopuolella",v)'
  ```

### VIENTI ODOTTAA OMISTAJAN HYVÄKSYNTÄÄ (ei kiertoteitä, ei Julkaisijaa)
Automaattitilan luokitin esti viennin tuotannon pallosarjaan ("Cloud Storage Mass Delete"). Omistajan päätös klo 11.1x
Fablen ja Siirtosepän kautta oli, että hän hyväksyy viennin itse Karttasepän sessiossa illalla. Aja komento VASTA,
kun omistaja on kirjoittanut hyväksynnän tähän sessioon ja laattamäärä on 13 856:
```
zsh -c 'source ~/.zshrc >/dev/null 2>&1; aws s3 sync /Users/Shared/Claude/pyramidi-poltto/pallo-z10-20260927/ulos/10 s3://$AMPARI/julisteet/pallo/laatat/2026-09-26-pohja-20260926/10 --endpoint-url $PAATE --exclude "*" --include "*.jpg" --content-type image/jpeg --cache-control "public, max-age=31536000, immutable" --no-progress --only-show-errors && echo VIETY'
```
- Komento ei poista mitään, eikä sarjan `laatat.json` muutu (max pysyy 9:ssä). Web ei siis pyydä harvaa Z10:tä, ja
  natiivi lukee Z10-alueet offline.jsonista.
- Tarkistus: `aws s3 ls …/2026-09-26-pohja-20260926/10/ --recursive | grep -c '\.jpg$'` antaa 13 856.
- Viennin jälkeen ilmoita Siirtosepälle, Fablelle ja Julkaisijalle.

## Z10 TUOTANNOSSA (webin pyramidi)
- Pyramidi-osoitin on `2026-09-26s-pohja`, tasot 0–10. Se vaihdettiin klo 09.47, kun #3376 ja #3371 olivat
  mainissa.
- `pohja.kopio = { versio: "2026-09-26-pohja", tasot: [0..8] }` pitää pallon lepokerroksen päällä (#3376).
- **Varmuuskopiot** (`julisteet/pyramidi/`):
  - `pyramidi-20260927-0947.json` ja `-0732.json`: pohja 26, eli palautus ennen Z10:tä
  - `pyramidi-20260927-0801.json`: s-pohja ilman kopio-kenttää
  - palautus tehdään työnkulun syötteellä `palauta`
- **Näytteet:** `pyramidi-poltto/kuvat/z10-tuotanto-8-maata-20260927.png` (tuotannon CDN:stä) ja
  `z10-nayte-8-maata-20260927.png`.
- **Vanhojen sarjojen siivous** (Julkaisijalle kerrottu):
  - pidä 26s-pohja ja 26-pohja
  - vapaat: 21-, 22- ja 22c-pohja sekä 23a-pohja (jos palautusta ei tarvita)
  - harkittava: 25-pohja (koe/2026-09-25 ja varmuuskopio 0856)
  - pallokansiot ovat eri asia: natiivi viittaa niistä 25- ja 26-pohjaan sekä 23a…rajaton-kansioon.

## AVOIMET
- **Polttoskriptin koodi 1 ilman kaatunutta shardia (osa 2):** todennäköisesti `lue_edistys`-funktion
  `echo "$tehty $kaikki"` kirjoittaa suljettuun putkeen (13 × Broken pipe lokissa). Pieni korjauserä on tekemättä.
- **Merikohdat (#3352 mainissa):** muut maanosat tehdään, kun Fable tilaa.
- **Kreikan lippuankkuri:** poikkeus [22.4, 39.6] tehdään vain Fablen päätöksellä.
- **PR:t:** #3393 on auki (pallo-Z10-työkalu). Vanhat #3102, #3105, #3108 ja #3117 ovat ennallaan.
