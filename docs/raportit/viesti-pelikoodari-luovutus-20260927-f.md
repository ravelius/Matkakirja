# Pelikoodarin luovutus 27.9.2026 klo 23.58 (-f, tilinvaihto)

Jatkoa luovutukselle `-e` (21.0x). Omistaja 23.58: **VAIN striimiluenta (puhetagit) julkaisuun, muut työt tauolla**,
sitten tilinvaihto. Fable = local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc (session id:llä), roolit NIMELLÄ.
Tarkista PR:t: `gh pr list --author @me --state all --limit 20`.

## 1. JULKAISUUN NYT (tue kysyttäessä)

| Mikä | Missä | Tila |
|---|---|---|
| **Web + worker: puhetagit** | PR #3513 (v2349, 6b4ad2ec3 + versio) | Julkaisijan junaan. **Järjestys: web ensin, sitten pollo-worker** (vanha välimuistin pelikoodi näyttäisi tagit). Worker `suodataPuhetagit` (tools/pollo/rajat.js): sallitut `[pause] [long-pause] [sigh] [laugh] <fast>…</fast>`, muut ja parittomat kääreet pois, OpenAI-polulle kaikki pois, säilöavain suodatetusta. Pulun kehotteen `PUHETAGIKEHOTE` selaimelle aina, natiiville vain `puhetagit: 1` -kentällä (vanhat TF-versiot eivät näe tageja). Näyttö: js/puhetagit.js `poistaPuhetagit`. Web-luenta ennallaan (kappaleet omina paloinaan, reunahiljaisuus trimmataan, välit 0,45/0,95 s). |
| **Natiivi: luentakorjaus** | proto `pelikoodari/esihaku-jarjestys` fb67281f | Merge-pyyntö Natiivisepälle (1.0.33-kärki). Otsikko ei jää yksin 1. palaksi (tauko 3 166 → 16–117 ms), pala soi aina loppuun, virhe → uusinta, esihaku jonossa, "puhe palat" -loki. Mitattu A2FD9C9F. |
| **Natiivi: puhetagit** | proto `pelikoodari/puhetagit` 9fac9748 (esihaku-jarjestyksen PÄÄLLÄ → mergetään sen jälkeen) | Kappalejako `[pause]`, väliotsikon edelle `[long-pause]`, ei otsikon perään; tagi vain pyyntöön (Lukijaaani.PyyntoPalat), lohko `kertoja-t1`; PuluChat näyttö tagiton (Nakyva → PoistaPuhetagit, striimin keskeneräinen tagi piiloon), puhe tagillinen (Puhuttava), pyyntöön `puhetagit: 1`. Peli-testit 342/342, unity 0. **Mittaamatta laitteella/simulaattorissa** (yötauko) — mittaa nosto, jossa on 2+ kappaletta, ≤ 5 000 mrk/vrk. |

Merge-pyynnöt: `/Users/Shared/Claude/proto-3d/lokit/merge-pyynto-pelikoodari-maisemakompressori.md` (kaksi viimeistä merkintää).

## 2. TAUOLLA (omistaja 23.58), jatketaan kun Fable antaa luvan

- **#3516 karttalaatat (v2347, c92c61193)**: oikea juurisyy PALLOLLA (`js/pallolaatat.js` lataa(): pudonnut kerros → laatta koottiin ilman sitä ja merkittiin valmiiksi = pysyvä pergamenttiruutu; virhetila ei uusiutunut koskaan = tasojen sekamelska). Korjaus: pudonnut kerros → virhe, uusinta 1,5/4,5/13,5/20 s, visibilitychange/pageshow/online uusivat heti; myös tasokartan laattapyramidi.js-korjaus (tasokartta on pois käytöstä). Testit 3+3 uutta, pallolaatat 378/378. **TODISTE PUUTTUU**: `tools/savukkeet/savuke-laattaaukot.mjs` worktreessä `wt/pelikoodari-laatat-katoavat` (apuagentti muokkasi pallo-oletukseksi; COMMITTAAMATTA — tarkista `git status`, commit + push haaraan pelikoodari-laatta-uusinta). Ajo: JÄLKEEN `node tools/savukkeet/savuke-laattaaukot.mjs`, ENNEN `--juuri <origin/main-worktree>`. **AAMULLA polton jälkeen: WebKit-savukkeen ajo ennen/jälkeen → tulos Fablelle, sitten #3516 junaan.**
  **Natiivin varalaattaehdotus Natiivisepälle** (sama perhe): `Laattapalvelin` antaa Cesiumille pergamentin värisen varalaatan,
  kun pohjalaatta ei tule, eikä Cesium hae sitä uudelleen ennen häätöä → ehdotus: varalaatan saanut laatta kirjataan, ja se
  pakotetaan uudelleenhakuun (Cesiumin rasterilaatan päivitys) 8 s:n päästä sekä sovelluksen palatessa etualalle / verkon palatessa.
- **#3517 Olympia (v2348)**: Koe ihme -nappi pois, ihmekuva 1. isona, nykyinen valokuva pienenä tekstin kyljessä (kortti + nähtävyysikkuna). Kohdennetut testit 1288/1288, savukkeet päivitetty mutta AJAMATTA. Puuttuu: kuvapari Olympia + hahmotelma-kohde puhelin/iPad → Fable, speksi + kuvapari Natiivi-UI:lle (1.0.34). Worktree `wt/pelikoodari-ihme-kuvana`.
- **Luentakorjauksen välimuistiuusinta** (varmistus): `proto-3d/lokit/puhemittaus/nosto-uusinta.sh` (valmis .app `puhemittaus/korjaus/Matkakirja3D-fb67281f.app`).

## 3. TÄNÄÄN VALMIIT

#3438 tekijämerkinnät ja #3480 raha 400 £ mainissa (mainin v2340 päälle v2341/v2342); #3475 mainissa (juna #3488, Alonnisos-jatko #3490);
#3485 saavutettavuus C SULJETTU (omistaja hylkäsi); puhetagikooste omistajalle `proto-3d/lokit/puhetagit/` (LUE.md, kooste.mp3).

## 4. OPIT

- **`git reset --soft origin/main` vanhalla pohjalla kumoaa muiden tuoreet commitit** (#3517:n ensimmäinen versio poisti
  kulttuuri-kategoriat/historian-hetket — huomattiin diff-tilastosta ennen PR:ää). Oikein: patch omista tiedostoista → reset --hard origin/main → apply.
- Versiotörmäykset avoimien PR:ien kesken: `uusi-versio.mjs` katsoo vain mainia → aseta käsin seuraava vapaa (2347/2348/2349).
- **Tasokartta on pois käytöstä** (`VANHA_KARTTA_KAYTOSSA = false`): kartan laattaviat ovat pallolla (js/pallolaatat.js), ei laattapyramidi.js:n SVG:ssä.
- `node -e "import('./skripti.mjs')"` AJAA skriptin → puhetagikooste generoitui kahdesti (+1 817 mrk). Generointiskripteihin pakollinen `generoi`-argumentti.
- Natiivin puhemittaus: `puhe palat` -loki näyttää palakohtaisesti soi/kesto, levy/verkko ja workerin x-puhe-lahde.

## 5. AKTIIVISET WORKTREET

`wt/pelikoodari-ihme-kuvana` (#3517), `wt/pelikoodari-laatat-katoavat` (#3516, committaamaton savuke), `wt/proto-pelikoodari-esihaku-jarjestys`,
`wt/proto-pelikoodari-puhetagit` (proto: poista `git -C proto-3d/Matkakirja-proto worktree remove` mergen jälkeen).
`wt/pelikoodari-vanha-checkout` on symlinkki (Fable päättää).
