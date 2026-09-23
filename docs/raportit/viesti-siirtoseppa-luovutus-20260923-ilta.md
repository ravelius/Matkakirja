# Luovutus: Siirtoseppä, 23.9.2026 iltapäivä (Suomen aika, EEST)

Luovuttaja on Siirtoseppä (tili B). Kirjoitettu klo 14.25 Fablen ohjeen
mukaan: odotan 3D-selvittäjän palautetta sisältöpaketista. Jos se viipyy
yli tunnin, tämä raportti on voimassa ja uusi tehtävä tulee Fablelta.
Edellinen luovutus: `viesti-siirtoseppa-luovutus-20260923.md` (aamu).

## Lue ensin

1. `CLAUDE.md` (agentit vain Opus tai Sonnet).
2. Raamatun (`js/tyohuone-raamattu.js`) Ydinajatus kohta 2 "TYÖTAPA JA
   SESSIOT", vain se osio.
3. Tämä raportti. Tarvittaessa:
   - `docs/raportit/sisallon-siirtoputki-20260923.md`, osa 5 (yhteinen
     sisältölähde), päivitetty vastaamaan toteutusta
   - `docs/raportit/herokuvien-viitteet-20260923-varmistus.md`
   - `docs/raportit/kaupunkien-latlon-20260923.md`

## Tila

Siirtoseppä ei nosta versionumeroa. Poikkeus on #2918, joka muuttaa
lähderiviä, joten Julkaisija nostaa sen version.

**Tuotannossa:** sisältöpaketti `https://media.matkakirja.app/sisalto/1/uusin.json`,
versio v1 (23.9. klo 13.57). CI vie uuden version jokaisesta main-mergestä
(`.github/workflows/vie-sisalto.yml`), mutta vain silloin, kun sisältö
muuttuu.

| PR | Sisältö | Tila |
|---|---|---|
| #2913 | peilaus lukee js/linssit, 8 Commons-nimeä korjattu (32 kuvaa ämpäriin) | **OPEN**, Julkaisijalta kysytty |
| #2916 | peilausajon 357 turhaa 404:ää pois (fokuspohjien webp, julisteet, hetket) | **OPEN** |
| #2918 | herojen pohjaviitteet lähderivillä (60 heroa, 240 viitettä), viiteloki `tools/hero-viiteloki.tsv`, varmistus 60/60 (`tools/varmista-hero-viitteet.mjs`) | OPEN, nostaa version |
| #2922 | 163 kaupungin lat/lon-ehdotukset + vartion fi-sivutarkistus | mergetty |
| #2927 | Sisältökirjuri kirjasi 163 pallopistettä (266/266) | OPEN (Sisältökirjurin) |
| #2925 | sisältöpaketti ämpäriin, skeema 1.1 (kaupungeille maa2, tyyppi), osa 5 mainiin | mergetty |
| #2929 | vie-sisalto.yml:n ensiajon korjaus (bash -e) | mergetty |
| #2932 | `tools/vienti/lisenssit.mjs`: yksi NC/ND-laskuri kaikelle medialle (23 nimettyä, lista vain lyhenee) | OPEN, **pinottu #2898:n päälle** (base `pelikoodari-aanilisenssit`) |
| #2933 | ämpärin aukot viikoittain issueen (`amparin-aukot.yml`), Commons-429 korjattu | OPEN |

## Pushatut haarat

- Kaikki yllä olevat haarat: `siirtoseppa-<aihe>`. Worktreet ovat
  kansiossa `/Users/Shared/Claude/wt/`. Mergetyt voi poistaa komennolla
  `tools/uusi-worktree.sh --poista siirtoseppa-<aihe>`.
- `siirtoseppa-luovutus`: luovutukset, haaraa ei mergetä.

## Kesken: tee nämä ensin

1. **3D-selvittäjän palaute sisältöpaketista.** Se tulee napahatun ja
   laitemittauksen jälkeen. Sen perusteella alkaa **osa 2: 125
   funktiota datasta tunnisteiksi** (raportin osa 5.4, arvio 2–3
   sessiota, yhdessä Pelikoodarin kanssa). Aloita vasta palautteen ja
   Fablen luvan jälkeen.
2. **#2932 odottaa #2898:aa.** Kun #2898 mergetään, #2932:n base vaihtuu
   mainiin. Jos konflikti syntyy, rebasetta mainin päälle. Tarkistin
   käyttää `js/lisenssi.js`:ää, joka tulee #2898:ssa.
3. **Sisältökirjurille lähetetty (Fablen pyyntö):** 5 viitettä ilman
   lisenssiä. Ne ovat Trevi-noston ääni `fokusvirrat.js`:ssä, Lindesnesin
   kaksi kuvaa ja topografialinssin kaksi kuvaa. Kun ne on kirjattu,
   komennon `node tools/vienti/lisenssit.mjs` pitää näyttää tuntematon 0.
4. **Kun #2913 ja #2916 on mergetty,** tarkista, että peilausajo on
   vihreä ja että `node tools/vienti/tarkista-media.mjs --kaikki` antaa 0
   aukkoa. Viikkoajo tekee saman maanantaisin.

## Odottaa omistajan päätöstä

Ei mitään uutta. Juristia ei käytetä, ja attribuutio riittää (Fablen
kirjaus 23.9.).

## Avoimet muille rooleille (tiedoksi)

- **Karttaseppä:** Gaon laudan x/y on noin 374 km väärässä paikassa, ja
  Karttasepälle on ilmoitettu. Neljän kaupungin wiki-kenttä (Gao,
  Kamerun, Victoria-järvi, Murzuk) vaatii `tee-maailmankartta.mjs`:n ja
  NE_LAND-datan.
- **Pelikoodari:** 8 sisäistä taulua tarvitsee export-sanan, jotta vienti
  näkee ne (aamun luovutuksen kohta 6).
- **Omistaja:** 94 ChatGPT-heron viitteet ovat edelleen tuntemattomia.

## Voimassa olevat työtavat

Raamatun Ydinajatus kohta 2 ja `docs/roolitus.md`. Erä-worktreet tehdään
vain komennolla `tools/uusi-worktree.sh siirtoseppa <aihe>` polkuun
`/Users/Shared/Claude/wt/`. Roolikansion oma haara voi olla vanha, joten
aja skripti muodossa `git show origin/main:tools/uusi-worktree.sh > …`.

## Julkaisukaava

Oma haara origin/mainista (tai pinottuna toisen PR:n päälle, jos
riippuvuus sitä vaatii). Aja `node --test tests/*.test.mjs` (0 fail),
pushaa ja tee `gh pr create`. Julkaisijalle yksi rivi, Fablelle enintään
8 riviä. Julkaisija mergeää.

## Ympäristö ja infra

- Ämpäri: `https://media.matkakirja.app/`. R2-secretit ovat Actionsissa
  (`R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`,
  `R2_BUCKET`), ja paikallisesti avaimia ei tarvita.
- Ämpäriin kirjoittavat työnkulut ajetaan ubuntulla, ei Macilla.
- Commons: User-Agent ja vähintään 1,1 s väli. Wikidata SPARQL toimii
  ilman avainta.

## Velat ja opetukset

**Velat**

1. `tarkista-laudan-pisteet.mjs` palauttaa koodin 1 aina, koska alueet
   ylittävät 15 km:n rajan. Se ei siksi sovellu CI-porttiin sellaisenaan.
2. Lisenssitarkistin ei näe Commons-kuvien lisenssiä (210 viitettä
   luokassa `commons`). Viikkoajon voisi laajentaa lukemaan ämpärin
   `manifesti.json`:n lisenssikentän.
3. Sisältöpaketissa ei ole vielä sisältöversion näyttöä (työhuone tai
   natiivin tietoja-sivu).

**Opetukset**

- GitHub ajaa askeleet komennolla `bash -e`, eikä `set -uo pipefail`
  poista sitä. Siksi `x=$(aws …)` pitää kirjoittaa muodossa `if !` tai
  `|| true`, muuten askel kuolee hiljaa. Testi vartioi tätä nyt.
- Commonsin generator-kysely (`gcmlimit=60` + `iiurlwidth`) antaa
  imageinfon vain 50 sivulle tiedostonimen järjestyksessä. Ilman tämän
  tietämistä herojen uudelleenajo "erosi" 26 herolla.
- Commits pushattu PR:n mergen jälkeen samaan haaraan ei päädy mainiin.
  Siirtoputkiraportin osa 5 jäi siksi pois kahdeksi päiväksi. Tee aina
  uusi PR.
- Zsh laajentaa `$B:t` muodossa `:t`-modifioijaksi. Käytä `${B}`.

## Aloitusviesti

```
Olet Siirtoseppä (Opus), Matkakirja-pelin (suomenkielinen selainpeli, natiivi iOS-peli rinnalle) sisällön siirtoputken ja lisenssityökalujen sessio. Repo ravelius/Matkakirja, kansio /Users/Shared/Claude/Matkakirja-siirtoseppa.
1. git fetch origin; erä-worktreet: git show origin/main:tools/uusi-worktree.sh > /tmp/uw.sh && sh /tmp/uw.sh siirtoseppa <aihe>.
2. Lue: CLAUDE.md, Raamatun Ydinajatus kohta 2 (vain se), docs/raportit/viesti-siirtoseppa-luovutus-20260923-ilta.md (haara origin/siirtoseppa-luovutus).
3. Säännöt: ali-agentit vain Opus tai Sonnet; yksi erä = yksi haara; ei versionumeroa (Julkaisija mergeää); viestit Fablelle vain valmis erä / jumi / kysymys, enintään 8 riviä; kellonajat date-komennolla.
4. Ensimmäinen tehtävä: tarkista, onko 3D-selvittäjän pakettipalaute tullut. Jos on, kysy Fablelta lupa osaan 2 (funktiot tunnisteiksi). Jos ei, kysy Fablelta seuraava erä. Tarkista samalla #2932:n ja #2898:n tila (luovutuksen kohta 2).
5. Vastaa suomeksi, tiiviisti.
```
