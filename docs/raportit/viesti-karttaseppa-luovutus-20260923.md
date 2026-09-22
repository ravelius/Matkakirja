# Karttasepän luovutus 23.9.2026 (sessio 4 → sessio 5)

Rooli-worktree `/Users/samireivinen/Matkakirja-karttaseppa` haarassa
`karttaseppa-tyo-20260922` (EI mergetä — mergetyn haaran worktree katoaa).
Erät tehdään omissa worktreissä `/Users/koodaus/wt-karttaseppa-<aihe>`
origin/mainista. Commit `-c user.name=ravelius -c user.email=sami@valokuvaamoklik.fi`.
Savukkeet: `PLAYWRIGHT_JS=/Users/samireivinen/Matkakirja-fable/node_modules/playwright/index.js`,
`NODE_USE_ENV_PROXY=1`; node_modules symlinkki worktreehen vain ajon ajaksi
(poista ennen committia; `git stash push -u` vie symlinkin mukanaan →
käytä `git stash push -- <polku>`).

## Tila

- **#2868 → tuotannossa v2136** (#2869): kaksi palstaa kaikkiin nostoihin.
- **#2871 Julkaisijalla → v2137**: lehtipalstat kaikkiin pidempiin nostoihin.
- **Pohjapoltto 2026-09-22c tuotannossa v2116** (vesiviivat laudan yksiköissä,
  laikut maailmaan, hieno rae ennallaan). Ajokansio
  `/Users/koodaus/pyramidi-poltto/ajo-20260922c`; edellinen luettelo talteen
  `ajo-20260922c/ampari-luettelo-edellinen.json`. Palautus: osoitin
  `2026-09-22-pohja`/`20260922a` + tuo luettelo takaisin ämpäriin.
- #2830 (tasonvaihtomittaus poltolla 22c, raportti) — tarkista onko mainissa.

## Nostopalstat (#2868, v2136) — mekanismi ja vartijat

Omistaja 22.9. klo 23.06: *"Kaikkiin nostoihin kaksi palstaa. Ja niin että
ensin Kuva avautuu isona ja kun klikkaa niin sitten kuva pienenee ja tulee
teksti palsta mukaan oikealle."*

- `js/nostokuva.js`: `nostoPalstoiksi(kotelo, kehys)` jakaa valmiin pinon
  nostokortin muotoon — kuvaa edeltävät lapset (ylärivi, otsikko) ylös, kuvan
  sisältävä lapsi (galleria nuolineen, kuvateksti mukana)
  `.fokusnosto-kuvapalsta`an, loput `.fokusnosto-tekstipalsta`an. Solmu
  siirretään, ei kopioida (sama `<img>`, ei uudelleenlatausta).
- ≥ `NOSTOKUVA_LEVEA_RAJA` (1100 px): vaihe 1 = ISO kuva (ennen palstan
  levyinen), vaihe 2 = kuva pienenee palstaansa FLIP-liikkeellä
  (`kutistaNakyvasti`, `NOSTOKUVA_KUTISTUS_MS` 260, reduced motion ilman
  liikettä), kortti ≤ 1100 px ja keskitetään. Alle rajan mitään ei muuteta.
- Kaikki kuusi kutsujaa pyytävät `kaksipalstaTaitto: true` (fokusnosto,
  fokuskohteet, skandaalit, elaintaky, historian-hetket, syvennys).
- `css/nostokuva.css`: palstasääntö `.nostokuva-kortti`-luokalla (kaikki kuoret).
- **11.9. "kuva ei liiku" pätee nyt vain alle 1100 px:n ruuduilla.** iPad
  vaaka (1194) saa palstat.
- Vartijat: `tests/nostokuva-kortit.test.mjs` (jokainen tyyppi 1194/1400/1920
  px, pino 834 px, lähde- ja CSS-vartija, `nostoPalstoiksi` kohdekortin
  pinolla); `tools/mittaa-nostopalstat.mjs` WebKit 52/52;
  `tools/mittaa-nostokuva.mjs` rajattu alle 1100 px:iin.

## Lehtipalstat (#2871 → v2137) — mekanismi ja vartijat

Omistaja 22.9. klo 23.48 (iPad pystyssä): *"Kaksi erilaista. Tuo kaksi
palstaa näyttää paremmalta kaiken kaikkiaan myös muuten. Voisi tehdä kaikkiin
pidempiin ainakin."*

- Pituus JS:ssä: `js/ui-apurit.js` `onPitkaNostoteksti` (≥ 600 merkkiä tai
  ≥ 2 KIRJOITTAJAN kappaletta; automaattista puolitusta ei lasketa) ja
  `lehtipalstaKotelo` (kääre `.lehtipalsta-kotelo`, luokka `.lehtipalsta`).
- Leveys CSS:ssä: `css/styles.css` container query tekstin omasta leveydestä
  (≥ 600 px) → kaksi palstaa, anfangi, palstaväli 1,4 rem. Kotelo on oma
  elementtinsä, koska container-type tuo layout-rajauksen.
- Mitattu: iPad pysty tekstikotelo 712 px → 2; ≥ 1100 px tekstipalsta 498 px
  → 1 (kaksi palstaa olisi alle 35 merkkiä rivillä); puhelin 330 → 1.
- Kohdekortti, eläintäky, hetki, syvennys, maalehden nosto. Lööppi (skandaali,
  lööppitaittoinen nosto) ennallaan `.looppi-leipa`-palstoillaan.
- Vartijat: `tests/lehtipalstat.test.mjs`; `tools/mittaa-lehtipalstat.mjs`
  WebKit 25/25.

## Avoimet karttatyöt (odottavat omistajaa)

1. **Meren lika zoomissa on LAATASSA**, ei häiveessä/kermassa/mipmapeissa
   (kertomuslukolla sama näkymä z7/z8: A−B rannikko 5,68, C−(A+B)/2 0,60;
   `?koe=kangasaina` ei muuta). Poltto 22c ei pienentänyt A−B:tä (5,68 → 5,95):
   viivat ovat nyt oikeassa paikassa, mutta ne ovat pieni osa hienorakennetta.
   Raportit `docs/raportit/tasonvaihto-mittaus-20260922.md`,
   `merikuviot-tasoissa-20260922.md`, `vesiviivat-laudan-yksikoihin-20260922.md`.
2. **Harvennetut viivat vaimeina eikä pois:** harvennus puree z6:lla (askel 2)
   ja z5:llä (4). Jos tuntumatesti näyttää likaa karkeilla tasoilla: mittaa
   z6→z7 ja z5→z6 (`tools/savukkeet/mittaa-tasonvaihto.mjs`) ja kokeile
   vedoksella vaimeaa häivytystä (`tools/patina.mjs` `VV_VAHIN_VALI_PX`).
3. **Paperirae jäissä:** poltettu rae on vain ~3 % laatan meren
   hienorakenteesta, joten Pelikoodarin ruutuavaruuden rakekerros ei korjaisi
   likaa. Lippu `--paperirae ruutu` on olemassa (#2817), ei käytössä.
4. **Kartta 22c ja nostotason poltto** odottavat omistajan kantaa (tuntumatesti).
5. **Isobaattivektorit** odottavat omistajan päätöstä (viikon työ).
6. Nimiöversio h (CHE-siirrot) valmiina `ajo-20260922/nimiot-poltto-5.json`,
   ajetaan omana eränään.

## Opit

- z5↔z6-korrelaatio (skaalattu) ei kelpaa edistymismittariksi: resamplaus
  antaa sille katon alle 1. Käytä kertomuslukko-mittausta.
- Vesiviivoituspassi peittää isobaattien musteen (`--syvyyskayrapeitto` 0 ja
  1 → sama laatta, kun `tumma` on päällä).
- Playwright kokeilee VIIMEKSI rekisteröityä reittiä ensin.
- Minidom-testeissä `parentElement`/`nextSibling` puuttuvat → käytä
  `parentNode`/`childNodes`.

## Worktreet

| Polku | Haara | Tila |
| --- | --- | --- |
| `/Users/samireivinen/Matkakirja-karttaseppa` | `karttaseppa-tyo-20260922` | rooli, EI mergetä |
| `/Users/koodaus/wt-karttaseppa-lehtipalstat` | `karttaseppa-lehtipalstat` | #2871 auki — älä poista ennen mergeä |
| `/Users/koodaus/wt-karttaseppa-nostopalstat` | `karttaseppa-nostopalstat` | mergetty (v2136), siivottavissa |
| `/Users/koodaus/Matkakirja-karttaseppa-pr` | `karttaseppa-mittaus-22c` | #2830, erätyöhön |
| `/Users/koodaus/Matkakirja-poltto-22c` | `karttaseppa-poltto-22c` | polttoworktree, siivottavissa |
| `/Users/koodaus/Matkakirja-main-ref` | detached | vertailu, siivottavissa |
| `/Users/koodaus/Matkakirja-karttaseppa-ablaatio` | `karttaseppa-ablaatio-zoomi` | mittaus, vanha |

## Uusi sessio tekee ensin

1. `git fetch origin`; tarkista #2871 (v2137) ja #2830 mainissa.
2. Odota omistajan tuntumatestiä kartasta 22c ennen uusia karttatöitä.
3. Muistio: `karttaseppa-tila-20260922-ilta` (auto-memory).
