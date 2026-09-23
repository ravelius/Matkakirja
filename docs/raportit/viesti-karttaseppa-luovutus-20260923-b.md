# Karttasepän luovutus 23.9.2026 b (sessio 6 → seuraava)

Rooli-worktree `/Users/Shared/Claude/Matkakirja-karttaseppa` haarassa
`karttaseppa-tyo-20260922` (EI mergetä). Erät VAIN
`sh /Users/Shared/Claude/Matkakirja-fable/tools/uusi-worktree.sh karttaseppa <aihe> [pohja]`
→ `/Users/Shared/Claude/wt/karttaseppa-<aihe>`; poisto mergen jälkeen `--poista`.
Commit `-c user.name=ravelius -c user.email=sami@valokuvaamoklik.fi`.
Testit/savukkeet: `ln -s /Users/Shared/Claude/Matkakirja-fable/node_modules node_modules`
ajon ajaksi (poista ennen committia), `PLAYWRIGHT_JS=/Users/Shared/Claude/Matkakirja-fable/node_modules/playwright/index.js`.
Mainissa 3 punaista, jotka eivät ole meidän: `tools/arabia/trim-narration.test.mjs`.

**Linjaus 23.9. (omistaja, loki):** natiiviin (Unity + Cesium) mahdollisimman pian,
web ylläpitoon. Kallistus vaihe 2 ja poltettujen nostojen pallokytkentä
KESKEYTETTY (valmiit erät saavat mainiin koelipun takana). Laattapoltot JATKUVAT.

## Tämän session erät (kaikki pushattu, Julkaisijan jonossa)

| Haara | Commit | Sisältö |
| --- | --- | --- |
| `karttaseppa-rajaviiva-naulaus` | 5c5d49103 | Korostuskehän naulaus: työsäikeen pyyntölaskuri NaN → vastaukset hylättiin v1990:stä asti. Säikeen portti 300 → 100. |
| `karttaseppa-tasonvaihto-syvyys` | ebe9a9027 | Tasonvaihdon salmiakit + sumeat laikut = sama syvyystaistelu: vanha z ja entinen tuki samalla −6:lla. Porrastus z−1 −6, z−2 −4, z−3 −2, muut −1. Savuke `tools/savukkeet/mittaa-tasonvaihto-salmiakit.mjs` (main 86/85 → 0/0). |
| `karttaseppa-kallistus-kytkin` | b71fb668c | Valikko Kartta → "Kallistus" (pysyvä 22°, `?kallistuskulma=30`, `?koe=kallistuspysyva`). pinnanPiste/kohdistaAnkkuri kallistetulle kameralle. |
| `karttaseppa-gao` | 69d6091cf | Gao 16,27 N 0,05 W: `tools/vanha-maailma.mjs` TARKAT_PAIKAT + maailmankartta.js-rivi. |
| `karttaseppa-harvennus-haive` | d76821d45 | Patina `vesiviivoitus.harvennus = 'haive'` (reseptin valinta, oletus vanha); `--resepti-json` yhdistetään sisäkkäin. Vedos `docs/raportit/kuvat/harvennus-haive-20260923/`. |
| `karttaseppa-poltetut-nostot` | 1a14dae23 | ESP LUKITUT_MAAT + maakohtainen ankkuri poltossa (ESP silti estetty: täkypooli vaihtuu kaupungeittain); `--nostot-ilman-nimioita` → `nostotasot[ISO].nimiot:false`; koe `?koe=poltetutnostot` + valikon kytkin (pallo: vain nimi elävänä, piste laatasta). Vaikutukseton ennen vaiheen 2 polttoa. |
| `karttaseppa-natiivi-laatat` | 3b7481ec6 | `docs/raportit/natiivi-laattaosoitteet-20260923.md` (3D-selvittäjälle kerrottu). |
| `karttaseppa-maasto` | b180808e8 | DEM → quantized-mesh -työkalu (alla). |
| `karttaseppa-ablaatio-zoomi` | (vanha) | Talteen pushattu vanhan ablaatio-worktreen WIP, worktree poistettu. |

## Poltot 23a — ODOTTAVAT (CI-vuoro + omistajan levyruuhkan loppu)

Fable hyväksyi: pohja uusiksi harvennus=haive, sitten nostotaso (ilman nimiä)
+ nimiöt + pallon sarja; julkaistaan yhdessä. **Älä aloita ennen kuin
(1) Julkaisija ilmoittaa #2928/#2937 käsitellyiksi ja CI:n vapaaksi ja
(2) Fable ilmoittaa levyruuhkan loppuneen.** Ilmoita Fablelle alku ja loppu yhdellä rivillä.

- Ajokansio `/Users/Shared/Claude/pyramidi-poltto/ajo-20260923a`
  (korkeuspalat siirretty tänne 22c:stä; 22c menee NAS:iin).
- Worktree `/Users/Shared/Claude/wt/karttaseppa-poltto-23a`: harvennus-haive
  + poltetut-nostot yhdistettynä (fa9b42345, ei pushattu, ÄLÄ poista).
- `zsh aja-1.sh` = pohja 2026-09-23a-pohja + viivat 2026-09-23a-viivat + ranta
  (113 shardia, ~75 min). `zsh aja-2.sh` = nostot 2026-09-23a-nostot
  `--nostot-ilman-nimioita` + nimiöt g + pallon sarja 20260923a (sama ajo-id,
  valmiit ohitetaan). `--lista` tarkistaa ilman ajoa.
- Polton jälkeen Julkaisijalle: `js/pallo.js` PALLO_LAATTAVERSIO
  `2026-09-23a-pohja`, PALLO_LAATTATUNNISTE `20260923a` (+ historiakommentti),
  `sw.js` LAATTAKANSIO, `tests/pallo.test.mjs` kovakoodattu '20260922c'.
  Luettelo ämpäriin vasta kun osoitin on mainissa. Tasonvaihtomittaus
  (`tools/savukkeet/mittaa-tasonvaihto.mjs`) ja salmiakkisavuke uusilla laatoilla.
- Polton aikana Julkaisija saa mergetä vain PR:iä, jotka eivät koske js/css/index.html/sw.js/tools/savukkeet.

## Natiivi: etusija 1 → 0 → 3 → 2 (Fable hyväksyi)

1. **Laattaosoitteet** — valmis (raportti yllä). Pääkerros = pallon sarja
   Web Mercator XYZ 256 px z0–8 `julisteet/pallo/laatat/<kansio>/{z}/{x}/{y}.jpg`.
   Ämpärissä ei CORS-otsaketta (natiivi ei tarvitse).
2. **Maalaudat** (`FOKUS_LAUTAPROJEKTIOT`, tasakulmaiset) — EI aloitettu:
   selvitä tarvitseeko natiivi niistä mitään; niillä ei ole omaa pyramidia.
3. **Korkeusmalli** — Fable 23.9. myöhemmin: "älä aloita DEM-ketjua tässä
   sessiossa"; työkalu ja lataus ehtivät valmistua ennen sitä:
   - **Lähde:** Copernicus GLO-30 (AWS Open Data
     `https://copernicus-dem-30m.s3.amazonaws.com/<nimi>/<nimi>.tif`, COG,
     1°×1°, EGM2008). Lupa omistajalta korttina 23.9. Lähdemaininta pakollinen
     (tools/maasto/tee-maasto.mjs `LAHDEMAININTA`).
   - **Ladattu:** Ranska lon −6…9, lat 41…51: 155 ruutua, 4,8 Gt →
     `/Volumes/NAS-Homes/koodaus/Claude/Matkakirja-arkisto/dem/copernicus-glo30/`
     (+ `ranska-lista.txt`, `LUEMINUT.md`). NAS on 10 GbE: isot tiedostot
     suoraan NAS:iin, pienet laatat paikallisesti.
   - **Ketju (npm-paketteja EI tarvita,** koneella ei GDAL:ia eikä Dockeria):
     `tools/maasto/geotiff.mjs` (oma COG-lukija, Noden zlib) →
     `rtin.mjs` (RTIN, virheet tasoittain alhaalta ylös) →
     `quantized-mesh.mjs` (quantized-mesh-1.0 + octvertexnormals) →
     `tee-maasto.mjs` (GeographicTilingScheme TMS, virheraja 0,5 × Cesiumin
     77 067 m / 2^z, gzip, `--osa i/n`, `--luettelo` = layer.json). Testit
     `tests/maasto.test.mjs` 5/5.
   - **Tila:** koe z0–8 (`/Users/Shared/Claude/maasto-poltto/koe-0-8`) Cesium
     1.121:ssä oikein (Alpit). Täysi ajo z0–12 lopetettiin z10:n jälkeen
     (omistajan levyruuhka + nollaus): `/Users/Shared/Claude/maasto-poltto/2026-09-23a`
     on KESKEN (113 Mt, z0–z10, ei layer.jsonia) — aja uudelleen:
     `nice -n 15 node tools/maasto/tee-maasto.mjs --dem /Volumes/NAS-Homes/koodaus/Claude/Matkakirja-arkisto/dem/copernicus-glo30 --ulos /Users/Shared/Claude/maasto-poltto/2026-09-23a --tasot 0-12`
     ja sitten sama `--dem x --luettelo`. z10 5 796 laattaa 23 s; z12 arvio ~90 000
     laattaa, noin 10 min, ~0,5 Gt.
   - **Esikatselu:** paikallinen palvelin (gzip-otsake .terrain + kuvien välitys
     CORSin takia) + CesiumJS jsdelivrista; malli tämän session scratchpadissa
     ei säily — kirjoita uusi tarvittaessa (tools/maasto:iin kannattaa lisätä).
   - **Seuraavaksi:** vienti `aws s3 sync <ulos> s3://$AMPARI/julisteet/maasto/2026-09-23a`
     `--endpoint-url $PAATE` `--content-type application/vnd.quantized-mesh`
     `--content-encoding gzip` `--cache-control 'public, max-age=31536000, immutable'`
     (.terrain) ja layer.json erikseen (`application/json`, lyhyt välimuisti);
     avaimet `source ~/.zshrc`. Osoite 3D-selvittäjälle. Rajoitus: alueen
     ulkopuolella maa 0 m → porras Espanjan/Saksan/Italian rajalla.
     Myöhemmin pelattavat maat.
4. **Syvät tasot z9–z10 (Ranska)** — DEM ENSIN, koska 1′-reliefi ei tarkennu
   yli z8:n. Arvio: pyramidi z9 780 + z10 3 009 laattaa (~165 Mt), pallo
   Z9 484 + Z10 1 936 (~25 Mt), alle 30 min CI-taukoa. Reliefi Copernicuksesta.

## Muut avoimet

- Pelikoodarin haara `pelikoodari-kehittajasaatimet` siirtää kokeet
  ratasvalikon Mittaus-ryhmään samoilla elementti-id:illä (poltetut nostot
  -kytkin päätyy sinne automaattisesti).
- 3D-selvittäjä: napakaistan tumma rengas (~83–85° N) — proton kalotti
  riittää; sarjan navalle merisävy ilman käyriä, jos pyytää.
- ESP-nostoja ei polteta ennen kuin täkypoolin esto poistuu (`tools/fokuskartta/nostot.mjs maanTakyt`).

## Worktreet

| Polku | Tila |
| --- | --- |
| `/Users/Shared/Claude/Matkakirja-karttaseppa` | rooli, EI mergetä |
| `/Users/Shared/Claude/wt/karttaseppa-poltto-23a` | polttokoodi, ÄLÄ poista ennen polttoja |
| `…/wt/karttaseppa-{rajaviiva-naulaus,tasonvaihto-syvyys,kallistus-kytkin,gao,harvennus-haive,poltetut-nostot,natiivi-laatat,maasto}` | erät; Julkaisija poistaa mergen jälkeen |
