# Karttasepän luovutus 21.9.2026 (siirto /Users/Shared/Matkakirja/)

Omistajan päätös: kehitys siirtyy Macin toiselle käyttäjälle. Kaikki on
pushattu; työhakemisto puhdas. Uusi sessio jatkaa tästä (lue lisäksi
docs/raportit/viesti-karttaseppa-luovutus-20260921.md: työkalut, polut, poltot).

## Haarat (kaikki origin/v1973-prep-pohjaisia, pushattu)

| haara | commit | tila |
|---|---|---|
| `karttaseppa-atlaslehti` | aec5b595 | Atlaslehti-vedos (Stieler 1875 No. 33, `?atlas=1`), HYVÄKSYTTY vedoksena, EI mergeä vielä; kuvat ämpärissä `matkakirja/linssit/atlaslehti-stieler33-ranska-{8192,4096}-20260921.webp`; raportti docs/raportit/atlas-vedos-20260921.md, kaava tools/atlaslehti/ |
| `karttaseppa-isoisan-linssi` | a65b2eef | Isoisän linssi 1873 erä 1 KESKEN (rajat + nimet pallolla toimivat); tila docs/raportit/isoisa-1873-era1.md; jatketaan Fablen sanasta |
| `karttaseppa-sulavuus` | E1 f909d2fd + tämä luovutus | Sulavuus E1 VALMIS ja hyväksytty (Julkaisijalle); E2 aloitettu vain mittarin osalta (alla) |
| `karttaseppa-gshhs-rantaviiva`, `karttaseppa-v1984-liftauszoomi` | ks. edellinen luovutus | julkaistu/odottaa Julkaisijaa |

## Sulavuus (omistajan prioriteetti "KARTAN SULAVUUS ENSIN")

- Diagnoosi ja eräjako hyväksytty (Fable, loki): E1 pitkät tehtävät pois
  (VALMIS: docs/raportit/sulavuus-e1-20260921.md), E2 tason vaihto ilman
  paljasta pohjaa + ennakko liikesuuntaan, E3 zoom Google Earthin malliin
  (kohti osoitinta/sormia, rullan liuku vaimennettuna, nipistys ilman
  askelia — OrbitControlsin dolly korvataan omalla), E4 kamera → nimiöt
  -rajapinta Pelikoodarin kanssa (ehdotus lähetetty hänelle 21.9.).
- Mittari: `tools/savukkeet/mittaa-sulavuus.mjs` (GPU-headless
  `--use-angle=metal`, oikea syöte; NAKYMA=puhelin|tyopoyta KURISTUS=4
  PROFIILI=1). Kuvat docs/raportit/kaappaukset/sulavuus-20260921/.
- E2:n keskeneräinen osa tässä commitissa: js/pallolaatat.js `suorita`
  laskee `mittarit.peittoOsuus` / `peittoTaso` (näytepisteistä, monessako
  on täysin häivytetty laatta scenessä) ja mittari kirjaa ne
  (`pohjaNakyy`, `peittoMin`). Mittarin ajossa kentät tulivat vielä
  `undefined` — tarkista ensin, miksi (lukeeko `lauta.lepokerros()` saman
  kerroksen; ajetaanko lohko). Vaaraton tuotannossa (vain mittarikentät).
- E2:n havainnot: desktop-panoroinnissa kohdemaan reunalla z6 → z5
  (pyramidi maittain syvä), nipistyksessä 33–66 kehystä ilman nykyisen
  tason laattaa (vanha taso peittää, karkeana); cmd+rulla työpöydällä
  4×:llä pitkiä tehtäviä [107,73,61,52,51] — tutkimatta (todennäköisesti
  laattojen valmistelu tasonvaihdossa z6↔z7, budjetti 4 ms päästää yhden
  laatan/kehys ~11 ms).
- Laitetestaajan iPad-luku vertailuksi ei ole vielä tullut.

## Jono (Fablen tilaukset)

1. Maakuntavedos FRA + DEU: kun Sisältökirjurin js/packs/nykyalueet.js ja
   assets/data/nykyalueet-fra-deu.json ovat valmiit, polta koelaatat
   paikallisesti poltto-koe-20260920:n kaavalla (z6–z8, nimet
   harvennettuina kapiteeleina, aluerajat ohuina himmeinä viivoina),
   kaappaukset 390 ja 1400 Ranska + Saksa →
   docs/raportit/kaappaukset/maakuntavedos-<pvm>/. Ei tuotantoon.
   Nimiötason tuotantopoltossa muuttuu vain 4 riviä (Hannover, Oldenburg,
   Braunschweig, Anhalt → 1873); pysyvä-luokan kulttuurialueet jäävät.
2. Isoisän linssi erä 1 jatko (kaappaukset uusilla kokoluokilla,
   Sisältökirjurin nimitarkistus js/packs/valtiot-1873.js, pelin merkit
   linssin ajaksi — Fablen päätös), erä 2 reitti + retroasu.
3. Poltot: ei avoimia. Polttovuoro sovitaan Julkaisijan kanssa suoraan
   (ei PR-CI:tä polton aikana). Mahdollinen rajaton viivataso
   (--eirajat) isoisän linssille vasta vedospäätöksen jälkeen.

## Ympäristö uudessa käyttäjässä

- Aineistot ja poltot olivat `~/pyramidi-poltto/` (gshhs-data, ne-data,
  korkeuspalat, ajo-20260921, rajat-1873/ = historical-basemaps
  world_1878.geojson + valtiot-1878-raaka.json, atlas/ ei luotu — atlaksen
  skanni oli scratchissa; kaava tools/atlaslehti/README.md hakee sen
  uudestaan Commonsista). Siirrä tai kopioi kansio uudelle käyttäjälle;
  ämpärin avaimet ~/.zshrc (AMPARI, PAATE, AWS_*), aws-asetukset.conf.
- PLAYWRIGHT_JS ja PW_CHROMIUM: ks. edellinen luovutus; Chromiumin GPU
  headlessissä vaatii `--use-angle=metal` (muistiinpano gpu-headless-metal).
- Commit-identiteetti: `git -c user.name=ravelius -c user.email=sami@valokuvaamoklik.fi commit`.
