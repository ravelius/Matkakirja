# Luovutus: Sisältökirjuri — 24.9.2026 yö, klo 23.4x

Konteksti 70 %, Fablen käskystä luovutus ja nollaus. Edellinen luovutus:
`docs/raportit/viesti-sisaltokirjuri-luovutus-20260924-f.md`. Tämä vuoro teki
kuvatilausluonnoksen (hyväksytty, viety postilaatikkoon), siivosi 13
`sisaltokirjuri-*`-worktreeta ja toteutti Linssikatalogin uudistuksen vaihe 1
kokonaan Fablen suoralla ohjauksella (usea täsmennyskierros saman vuoron
aikana).

## 1. Lue ensin

1. `CLAUDE.md`, `docs/roolitus.md`, Raamatun "TYÖTAPA JA SESSIOT"
2. `docs/raportit/linssikatalogi-uudistus-suunnitelma-20260924.md` (Fablen
   alkuperäinen suunnitelma, haara `claude/bold-ride-vow4ki`)
3. `docs/linssikatalogi.md` (Fablen kirjoittama, moottoreittain järjestetty)
4. Tämä raportti kokonaan

## 2. Tila

### Linssikatalogi (pääerä)

Haara `sisaltokirjuri-linssikatalogi`, PR **[TÄYTÄ PR-NUMERO TÄHÄN ENNEN
PUSHAA — avattu tämän vuoron lopussa]**. Sisältö:

- Uusi visuaalinen esittelysivu (`linssikatalogi.html`): kuusi moottorikorttia
  (aikajana/alue/virta/data/esitys/pohjakartta, Fablen kuvausteksteillä),
  "Pelissä nyt" (data-vetoinen `pelissa:true`-kenttä, 9 linssiä X1–X7+B1+C7),
  "Seuraavat"-kehitysjono (jarjestys-kenttä), korttiruudukko jaettuna
  seitsemään moottorilohkoon (mukaan lukien "muu" = leikkilinssit Y1–Y6 +
  osa X-sarjasta), aikajanapalkki 1873-merkkipaalulla, suodattimet
  (tila+jonossa, manner, aikaväli, teksti), tiekartta-kanban (5 saraketta),
  esitys- ja tulostustila.
- Data ulkoistettu `linssikatalogi-data.js`:ään (Fablen agentin tuottama,
  165 linssiä, haarasta `claude/bold-ride-vow4ki` commit `f0aae0fac` — HAETTU
  VAIN TIEDOSTOTASOLLA `git checkout <haara> -- linssikatalogi-data.js
  docs/linssikatalogi.md`, EI täyttä rebasea, koska bold-ride-vow4ki on 1892
  committia ahead/83 behind mainista eikä sovi PR:n pohjaksi sellaisenaan).
- Kuvaputken erä 1 (29 linssiä, `posti/kuvatoimitus-linssikatalogi-era1-20260924.json`)
  kytketty: `linssikatalogi.html`:ssä oma `ERA1_KUVATEKSTIT`-hakutaulu (id →
  havainnekuvan kuvateksti + CC-kuvan tekijä/nimi/vuosi/lisenssi/lähde),
  koska `linssikatalogi-data.js`:n `kuvat`-kenttä on Fablen skeemassa pelkkä
  URL-pari (`{havainne, cc}`) ilman kuvatekstejä. **En muokannut
  linssikatalogi-data.js:n muotoa** — pidin sen Fablen omistamana ja
  koskemattomana, kuvatekstit ovat erillinen kerros. `<img>`-elementeillä
  `onerror="this.remove()"`, joten puuttuva kuva (136/165 vielä ilman) putoaa
  siististi ikonipaikkamerkkiin.
- Kuvakaappaukset: `docs/raportit/kaappaukset/linssikatalogi-uudistus-20260924/`
  (tyopoyta, tyopoyta-katalogi, tyopoyta-yo, puhelin 393px, esitystila).
- Testit 0 fail (4281), `tarkista-kaksoisavaimet` puhdas, `build-standalone`
  ajettu, versio nostettu (v2209 hetkellä, tarkista `js/main.js` PR:n
  mergehetkellä — versio saattaa liikkua ennen mergeä).

### Muut tämän vuoron erät

- **Kuvatilausluonnos** (galleria+ennenNyt 59 kaupungille): hyväksytty
  Fablen toimesta, viety postilaatikkoon `posti/sisaltokirjuri-kuvaputki-galleria-ennennyt-20260924.md`
  (haara `claude/postilaatikko`, commit `847fcdc25`). Raportti mainiin: PR
  [#3106](https://github.com/ravelius/Matkakirja/pull/3106) (auki).
- **Levysiivous**: 13 `sisaltokirjuri-*`-worktreeta poistettu (kaikki
  pushattu ensin), vapautti 23→40 Gt.

## 3. Avoimet korjaukset — Pelikoodarin/Fablen tarkistettava

1. **"Muu"-moottorin väri ja ikoni ovat omia arvauksiani** (vihreä,
   palapelin pala -ikoni) — Fable ei antanut näille ohjetta, koska
   moottoritaulussa on vain kuusi korttia eikä "muu" ole niiden joukossa.
2. **Header-luvut "seuraavaksi" ja "pelissä nyt" laskentatapa muutettu
   kesken vuoron.** Alun perin "seuraavaksi" laski `jarjestys != null`
   (37), sitten `tila === 'seuraava'` tarkalleen (7, Fablen vihje "seuraava
   on 8" ei täsmännyt kumpaankaan), lopuksi normalisoitu `tilaAvain()`
   kaikille "seuraava (...)"-variaateille (27 — täsmää suodatinnapin
   lukuun). En löytänyt mitään jakoa joka antaisi tasan 8:n — **Fablen
   kannattaa tarkistaa tarkoittiko hän jotain muuta ryhmää**. "Pelissä nyt"
   -luku vaihdettiin `pelissa`-kentän summaksi (9), täsmää sen alla
   näkyvään korttimäärään.
3. **Kuvaputken erä 1b (23 linssiä lisää) tulee samaan
   `linssikatalogi/`-ämpäripolkuun.** Kun se saapuu postilaatikkoon: 1)
   lisää sen kuvatekstit `ERA1_KUVATEKSTIT`-tauluun
   `linssikatalogi.html`:ssä (sama muoto: `{h, c:{cap,tek,nimi,vuo,lis,url}}`
   per id, `c` puuttuu jos CC-kuvaa ei löytynyt), 2) kuvat itsessään
   toimivat automaattisesti heti kun `<id>-havainne.jpg` on ämpärissä (sivu
   yrittää ladata jokaiselle 165 linssille, `onerror` piilottaa puuttuvat).
   Ei tarvitse koskea `linssikatalogi-data.js`:ään.
4. **Kartta-osio (hehkuva maailmankartta, suunnitelman kohta 7) EI ole
   tässä vaiheessa** — alkuperäinen suunnitelma sijoitti sen vaiheeseen 3,
   eikä Fablen "Vaihe 1 nyt" -lista maininnut sitä.
5. Pelikoodarin ulkoasutarkistus ei ehtinyt ennen PR:n avaamista
   (omistaja odotti sivua) — tarkistus PR:ään.

## 4. Odottaa omistajan päätöstä

Ei suoraan omistajalle nousseita kysymyksiä — kaikki avoimet kohdat (3) ovat
Fablen/Pelikoodarin tarkistettavia, ei omistajapäätöksiä.

## 5. Voimassa olevat työtavat (ei muutoksia perussääntöihin)

- Kuvaputken kuvatekstien lisäystapa (kohta 3.3) on tämän vuoron uusi
  käytäntö, ei vielä kirjattu Raamattuun — jos toistuu useammin, harkitse
  erillistä `linssikatalogi-kuvatekstit.js`-tiedostoa datan sijaan sivun
  sisäisen vakion sijaan.
- Worktree-siivous: `tools/uusi-worktree.sh --poista <nimi>` toimii, mutta
  jättää joskus `.DS_Store`-jäänteen jos hakemisto ei ollut täysin tyhjä —
  poista käsin ja aja uudelleen.

## 6. Ympäristö ja infra

- **Työkansio:** `/Users/Shared/Claude/Matkakirja-sisaltokirjuri`
  (pääkassa), erä-worktree `/Users/Shared/Claude/wt/sisaltokirjuri-linssikatalogi`.
- **node_modules ei periydy worktreehen** — tämä vuoro käytti symlinkkiä
  pääkassan `node_modules`-kansioon `npm ci`:n sijaan (Fablen levyhälytys-
  ohje 24.9. klo 21.5x). `git status` näyttää symlinkin `??`-rivinä koska
  `.gitignore`:n `node_modules/`-sääntö (kauttaviivalla) ei täsmää
  symlinkkiin — **tarkista aina `git status --short` ennen `git add`:ia
  ettei symlinkki päädy committiin.**
- **Chromium (Playwright), kuvakaappauksiin:**
  `~/Library/Caches/ms-playwright/chromium-1234/chrome-mac-arm64/
  Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`,
  `CHROMIUM`-ympäristömuuttujana.
- **Esikatselu ilman preview_start:** tämän session worktree ei ole
  ensisijaisen projektin polussa, joten `preview_start`/`.claude/launch.json`
  käynnisti palvelimen väärästä hakemistosta (pääkassasta, ei worktreesta).
  Toimiva kaava: `python3 -m http.server <portti> --bind 127.0.0.1`
  worktree-hakemistosta `run_in_background: true` -Bash-kutsulla, sitten
  `navigate` siihen porttiin.
- Koko testisarja (`node --test tests/*.test.mjs`) kesti tänä yönä
  13–15 min per ajo (jaettu Mac Studio, useita rinnakkaisia sessioita) —
  paljon hitaampi kuin päiväsajan ~100 s. Käytä `run_in_background` +
  `Monitor`, älä odota synkronisesti.
- Ei uusia rutiineja, ajastuksia tai trigger-id:itä perustettu.

## 7. Avoimet velat ja opetukset

### Velat

1. Kohta 3 (avoimet korjaukset) — Pelikoodarin/Fablen vahvistettava.
2. Kuvaputken erä 1b odottaa saapumista postilaatikkoon.
3. Kartta-osio (vaihe 3) tekemättä, ei aikataulutettu.
4. PR #3106 (kuvatilausluonnos-raportti) odottaa mergeä.

### Opetukset

- **Peer-viestien pyynnöt voivat muuttua kesken vuoron** — Fable täsmensi
  linssikatalogin skeemaa kolme kertaa saman vuoron aikana (viisi →
  kuusi moottoria, tyyppi→moottori-kenttien uudelleennimeäminen,
  `pelissa`-kentän lisäys). Kannattaa rakentaa data ulkoisena tiedostona
  heti alusta asti (kuten Fable itse ohjeisti) — se teki jokaisen
  täsmennyksen omaksumisesta halvempaa kuin jos data olisi ollut
  sivun sisällä kovakoodattuna.
- **`tila`-kentässä voi olla vapaamuotoisia variaatioita**
  ("seuraava (data)", "seuraava (esitys)") saman perustilan sisällä —
  aina kun tila-arvoa käytetään avaimena (suodatin, väri, ryhmittely),
  normalisoi ensin (`tilaAvain()`-funktio tässä sivussa).
- **Worktreen ulkopuolinen preview_start ei löydä oikeaa hakemistoa** —
  tarkista aina `curl`illa mistä palvelin oikeasti vastaa ennen kuin
  luottaa näyttöön; muuten voi katsoa vahingossa toisen session tiedostoja.

## 8. Aloitusviesti uudelle sessiolle

Katso `docs/raportit/viesti-sisaltokirjuri-aloitus.md` (päivitetty tämän
luovutuksen mukana).
