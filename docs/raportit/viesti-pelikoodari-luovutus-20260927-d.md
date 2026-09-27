# Pelikoodarin luovutus 27.9.2026 klo 16.2x (-d, kontekstin nollaus Fablen käskystä)

Jatkoa luovutukselle `-tilinvaihto`. Tarkista PR:t: `gh pr list --author @me --state all --limit 25`.
SendMessage Claude Desktop -reitillä (session id) on rajoitettu ~10 viestiin omistajan vuoroa kohden; roolisessioiden
NIMILLÄ (esim. `Julkaisija (Opus)`, `Natiiviseppä (Opus)`, `Natiivi-UI (Opus)`) viestit menivät perille. Fablelle meni
raja täyteen → kaikki Fablelle tarkoitettu on myös tiedostossa `docs/raportit/posti-pelikoodari-20260927.md` (pushattu).

## 1. WEB — tila 16.17

| PR | Sisältö | Tila |
|---|---|---|
| #3399 | pelikatalogi.html + Pelisuunnitelmat-välilehti, Pelistreak-kortti hyväksytyn mukaiseksi | mainissa |
| #3400 | savuke-astro-pallo pistemäärä datasta (64 → 189) | mainissa |
| #3401 | pelistreak + armopäivä (1 väliin jäänyt päivä / 7 pv ikkuna, ei palkkiota) | mainissa |
| #3404 | hotfix naytaStriimiaani (oma #3388:n jäänne) | mainissa |
| #3406 | avauskortin kevennys (kutsu lähellä, osiot ohuina) | mainissa |
| #3414 | pelikatalogin data + testi korttierille (main oli punaisella #3412:n jälkeen) | mainissa |
| #3415 | havainnekuva-sana: #3418:n jälkeen jääneet 33 lähderiviä + 31 kuvatekstiä + sanastotesti | mainissa |
| **#3422** | **luenta kuuluu aina pyynnöstä** (omistaja 15.5x): lukijasta mykistysportti pois, Äänimaisema ei vaienna luentaa | **auki, junaan** |
| **#3421** | **elämäpalkki** (rahattomuus): 8 punaista neliötä, heti yläreunassa, väistää kalusteiden alle, napautus → miniselite; yläpalkissa "£0 2 vrk" | **luonnos, omistajan kortti** |
| **#3410** | **projektisivusto** projekti.html (Tilanne, Linssit, Pelit, Kartta, Sisältö, iOS; noindex; vanhat katalogisivut ohjaavat) | **luonnos, omistajan kortti** |

- #3421 kuvat: `proto-3d/lokit/rahattomuuspalkki/kuvapari-rahattomuus-16-{393x852,834x1194}.png` (A oletus | B miniselite | C väistö).
  Lähetetty omistajalle ja postiin. Mitat Natiivi-UI:lle lähetetty (natiivi tehdään kortin jälkeen).
- #3422: päätin itse, että myös AUTOMAATTINEN luenta soi äänimaisema pois -tilassa (sitä ohjaa kertojakytkin), koska
  "Äänimaisema mykistää vain musiikin ja tehosteet". Linssiluennan pysäytys äänikytkimestä jäi ennalleen. Jos omistaja
  tarkoitti vain kaiuttimen painallusta, palauta portti automaattiselle luennalle.
- #3410: haara `pelikoodari-projektisivu` (worktree `/Users/Shared/Claude/wt/pelikoodari-projektisivu`) on #3399:n vanhan
  version päällä + merge. ENNEN omistajan korttia: mergeä origin/main (pelikatalogi-kortit 11–20 #3412/#3414, havainnekuva),
  generoi `node tools/tee-pelikatalogi-data.mjs` ja `node tools/tee-projekti-data.mjs`, aja testit, ota uudet kuvat
  (`/Users/Shared/Claude/proto-3d/lokit/projektisivu/`). Avoimet kysymykset Fablelle (postissa): "117 peliä" vs data 116,
  Z10-laattojen "kahdessa kerroksessa", otsikot "Pelin omat mekaniikat"/"Ideat", tilannekatsauksen "Euroopan ulkopuolelle"
  (ristiriidassa VAIN EUROOPPA 13.5x), `docs/` on Pagesissa julkisena.

## 2. NATIIVI (proto) — merge-pyynnöt Natiivisepällä (`proto-3d/lokit/merge-pyynto-pelikoodari-maisemakompressori.md` loppu)

| Haara | Kärki | Sisältö | Tila |
|---|---|---|---|
| `pelikoodari/talous-vaihe1` + `pelikoodari/pelistreak` | a79670c0 | talous, pelistreak, armopäivä, hintatasot 122 maata, streak ei kukkaroleimaksi | BUILD 30:ssä (Laitetestaaja PASS) |
| `pelikoodari/puhevirta-korjaus` | 2aec7015 | P1: palavirta (1. ääni 8 768 → 2 565 ms, mitattu A2FD9C9F) | BUILD 30:ssä |
| **`pelikoodari/luenta-aina`** | **f4ab9dc2** | luenta aina pyynnöstä (Lue/Soita/Esihae `pyynnosta`), `koetila raha/rahaton/loppukortti` | **1.0.31 merge-pyyntö** |

- Natiivi-UI:lle lähetetty: kaiutinkutsuihin `pyynnosta: true` (KortinLukija.cs:159/173/174, Lehtinakyma.cs:1674 + Esihae,
  Nahtavyysarkki.cs:607, SvgIkoni.cs:220, Mediarivi.cs:250). Tarkista, että se tuli 1.0.31:een.

## 3. JONO (Fable 16.1x)

1. Elämäpalkin kuvapari Fablelle (tehty postiin; varmista, että Fable sai — `docs/raportit/posti-pelikoodari-20260927.md`).
2. #3422 junaan (luenta aina pyynnöstä), natiivi f4ab9dc2 1.0.31:een.
3. Projektisivusto #3410: päivitys mainiin (ks. yllä) → kuvat Fablelle ennen julkaisua.
4. Havainnekuva-sana UI:ssa: web valmis (#3415 + Sisältökirjurin #3418); Natiivi-UI teki KysymysNakyma.cs (793576bd).
   Avoin Fablelle: säilytetäänkö lähderivin "Tekoälyllä tuotettu havainnekuva" (204 riviä).
5. Puhevirran/lukijan mittaus odottaa omistajan kehittäjäkoodia avaintiedostoon (`~/.matkakirja-avaimet-koodaus.zsh`,
   nyt vain XAI_API_KEY). Mittaus: `puhe lue <teksti>` + `puhe virta` + `aani mittaa` (komento lisätty 2aec7015).

## 4. OPIT

- **Älä aja paljasta `git stash`ia** (jaettu pino). Tein sen kerran; palautin omani SHA:lla (`git stash apply <sha>`)
  ja pudotin vain sen. Käytä WIP-committia.
- **Sumea vastaavuus (difflib) lyhyille riveille osuu väärin** ("kuvituksessa." → "kuluessa."). Tarkista aina diff
  riveittäin, kun palautat vanhan haaran muutoksia uuden mainin päälle.
- **Docs-PR, joka muuttaa `docs/pelikatalogi.md`:tä, vaatii `node tools/tee-pelikatalogi-data.mjs`** samassa PR:ssä, muuten
  main punastuu (kävi #3412:ssa).
- **Pariteettityökalun `nakyy`-todennuksella on minimikoko**: pienelle elementille käytä `ehto`-funktiota.
- **Käännöspalvelu voi raportoida "asennettu", vaikka sovellusta ei ole simulaattorissa** → `xcrun simctl install` käsin
  polusta `Matkakirja-proto-kaannos/Build/dd-sim/Build/Products/Release-iphonesimulator/Matkakirja3D.app`.
- **Unityn Debug.Log ei näy `simctl log stream`illa**; käytä `peli-loki.txt`:tä (komentojen tulokset) mittauksissa.

## 5. AKTIIVISET WORKTREET (poista mergen jälkeen `tools/uusi-worktree.sh pelikoodari <aihe> --poista`)

Web: `pelikoodari-rahattomuuspalkki` (#3421), `pelikoodari-projektisivu` (#3410), `pelikoodari-luenta-aina` (#3422);
mergetyt poistettavissa: `pelikatalogi`, `pelikatalogi-korjaus`, `astro-vastakoe`, `pelistreak`, `avauskortti-kevyt`,
`havainnekuva`. Proto: `proto-pelikoodari-luenta-aina`, `-puhevirta-korjaus`, `-pelistreak`, `-talous`, `-havainnekuva`.
