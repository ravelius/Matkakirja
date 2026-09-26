# Karttasepän luovutus 26.9.2026 aamu (sessio 10 → 11)

Rooli-worktree `/Users/Shared/Claude/Matkakirja-karttaseppa`, haara `karttaseppa-tyo-20260922` (EI mergetä;
ajan tasalle `git pull origin karttaseppa-tyo-20260922`). Erät `sh /Users/Shared/Claude/Matkakirja-fable/tools/uusi-worktree.sh
karttaseppa <aihe>` → `/Users/Shared/Claude/wt/`, poisto mergen jälkeen `--poista karttaseppa-<aihe>` (jos kansio jää,
`git ls-remote` ja `rm -rf`). Commit `-c user.name=ravelius -c user.email=sami@valokuvaamoklik.fi`. Edellinen:
`viesti-karttaseppa-luovutus-20260925-d.md`.

## Säännöt (lisäykset)

- Omistajalle kuvat: pysäytyskuvat PNG/JPG rajattuna, kuvapari VIEREKKÄIN ilman marginaaleja; video vain liikkeeseen.
- Worktreitä enintään 3 per rooli (Postivahti). Viikkokiintiö: työ jatkuu 98 %:iin (omistaja 26.9. 05.2x).
- Savukeajuri ilman näyttöä (konsoli toisella käyttäjällä): aja-sarja tunnistaa itse (#3243, muistiinpano savukeajuri-ilman-nayttoa).
- Lisenssi: CC BY-SA sallittu, kun johdettu aineisto samalla lisenssillä ja lisenssi lahde-kentässä + attribuutiossa (Fable 26.9.).

## TUOTANNOSSA / ÄMPÄRISSÄ (tarkistettu)

| Mitä | Polku `media.matkakirja.app/…` | Määrä / tila |
| --- | --- | --- |
| Peruskartta 2026-09-25 (osoitin 25.9. 19.00) | `julisteet/pyramidi/pyramidi.json` | tuotanto, ennallaan |
| Pallo 26-pohja (resepti 2026-09-26: meriliuku litistys 1 + kontrasti 1,35) | `julisteet/pallo/laatat/2026-09-26-pohja-20260926/` | 349 525 jpg TARKISTETTU 06.57, Natiivisepälle ilmoitettu (vaihto hänen) |
| Kermahuntu p060 26-pohjasta (omistajan valinta 128) | `julisteet/pallo/kerma/2026-09-26-p060/` | 34 216 webp + 28 json TARKISTETTU; natiivi käyttää (build 19) |
| Kerma vaihtoehdot (25-pohja) | `julisteet/pallo/kerma/2026-09-25-p060/`, `-p045/` | 33 948 + 28 json kumpikin |
| Maa–maa-rajat (127) | `julisteet/pallo/vektorit/maarajat-2026-09-26/maamaa.geojson` | salmet pois; natiivi käyttää (build 17). 25-versio vanha |
| Joet GEOGLOWS v2 (TDX-Hydro) CC BY-SA 4.0 | `julisteet/pallo/vektorit/joet-2026-09-26b/<ISO>.geojson` + `hakemisto.json` | 127 maata (puuttuu ISL GRL SGP MLT HKG SHN FJI VUT); Linssiseppä käyttää. Vanha `joet-2026-09-26/GRC.geojson` = sama sisältö, eri lahde-teksti |
| 1873 reitit | `julisteet/pallo/vektorit/reitit1873-2026-09-26/reitit1873.json` + repo `tools/vienti/reitit1873.json.gz` | 4 laivalinjaa + OHM-rautatiet (Siirtoseppä skeema 1.46) |
| Yövalot Black Marble Z0–Z6 | `julisteet/pallo/yovalot/2026-09-25/` | 5 461 (valmis 25.9.) |

Webin pohja 26 ÄMPÄRISSÄ: `julisteet/pyramidi/2026-09-26-pohja/` 92 968 webp (tarkistettu 06.32) + koeluettelo
`julisteet/pyramidi/koe/2026-09-26/pyramidi.json` (tuotannon luettelo + 26:n versio/patinaMuutos/pohja; väritasot 27,
nostot 25c, viivat/ranta 25, nimiöt 22g kannettu) → webin koe `?pyramidi=2026-09-26`. Tuotanto-osoitin ennallaan; vaihto
(osoitin `vaihda-pyramidi-osoitin.yml` + PALLO_LAATTAVERSIO) Fablen/Julkaisijan päätöksellä.
Paikallinen ajokansio `/Users/Shared/Claude/pyramidi-poltto/ajo-20260926/` PIDETÄÄN delta-polton ensimmäiseen ajoon
(`--delta-lahde-kansio …/lahde-levylta`), sitten NAS:iin (`nas-ajo-*.sh`-kaava).

## PÄIVÄN PÄÄTÖKSET (26.9. aamupäivä)

- Omistaja hyväksyi pohja 26:n natiiviin ja webiin (08.1x); Natiiviseppä vaihtoi (haara natiiviseppa/pohja-26), Julkaisija
  vaihtaa webin osoittimen (koe/2026-09-26 → pyramidi.json). Kermahuntu p060 natiivissa (build 19).
- Webin kuvapari Kreikka: `ajo-20260926/kuvapari/web-tuotanto-vs-26-kreikka.png`. Ero pieni, koska Egea matala
  (Egea −3,4, Kreetanmeri −6,2, Joonianmeri −12,5 luminanssia). Matalan meren kontrasti = mahdollinen resepti 27,
  VAIN omistajan pyynnöstä.
- Väritasot (tasoitus) EIVÄT vaadi uudelleenpolttoa: koe GRC meri alfa 0 (`2026-09-26m-tasoitus`, `koe/2026-09-26m`,
  haara `karttaseppa-tasoitus-meri` ilman PR:ää) antoi tavulleen saman näkymän — webi ei näytä harsoa meren päällä.
- `?pyramidi=`-lippu hyväksyy vain `YYYY-MM-DD[a-z]` (js/media.js pyramidiKoe); pallon kansio johdetaan nimestä.

## AVOIMET PR:t

#3278 salmet (maamaa) · #3280 delta-poltto LUONNOS (ensimmäinen ajo valvottuna päivällä; ämpärivaiheet ajamatta) ·
#3281 joet (Julkaisijan junaan, Fable) · #3102 #3105 #3108 #3117 vanhat. Mergetty 25.–26.9.: #3243 #3248 #3252 #3254 #3258 #3266.

## AVOIMET ASIAT

- OpenHistoricalMap (1873-rautatiet, CC0) lisätty `js/lahteet.js`:ään ja READMEen #3281:ssä (mergeä se).
- 1873-rautatiet: Ranskan pääradat (Pariisin säteet) puuttuvat OHM:stä (nykyaikainen start_date) → täydennys.
- Delta-poltto: arvio pyramidi meri 71 % / maa 34 % piirretään, pallo meri ~89 % / maa ~32 %. Ensimmäinen ajo valvottuna.
- Kermahuntu pitää polttaa uudelleen aina kun pohja vaihtuu (R−B-luokitus lukee pohjaa) → delta `maa`.
- astro-pallo-puhelin 43/47b, ±180°-sauma, web GRC/JPN-täyttö (vanhat, ks. 25-d).
- Worktreet nyt (2): `wt/karttaseppa-poltto-20260926` (26-poltto, pidä kunnes ajokansio NAS:issa), `-delta-poltto` (#3280).
  #3278 ja #3281 worktreet poistettu (haarat pushattu).
