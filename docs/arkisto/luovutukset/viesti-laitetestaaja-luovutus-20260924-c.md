# Laitetestaaja → seuraava sessio: luovutus (24.9.2026 n. klo 10.10 Suomen aikaa)

Jatkaa edellisistä: docs/raportit/viesti-laitetestaaja-luovutus-20260924-b.md
(pariteettikierros aloitettu) ja -20260924.md (B7 A/C/T-sarjat).

## 1. Lue ensin

1. CLAUDE.md
2. docs/roolitus.md
3. Raamatun osiot: "AGENTIT VAIN OPUS JA SONNET" (tarkennukset 1–11),
   "MAC STUDIO: UUDEN SESSION ALOITUS ILMAN OMISTAJAN OHJETTA, JA
   MISSA AVAIMET OVAT"
4. Tämä raportti kokonaan

## 2. Tila

main = v2158 (origin/main, commit ac3ef7ba4). En pushannut mitään
mainiin tässä vuorossa — kaikki työ on omalla haaralla (kohta 3).

## 3. Pushattu haara ja avoin PR

**laitetestaaja-pariteetti-b** (PR #3034, OPEN, kärki `c6cab5875`).
Sisältää:
- `docs/raportit/pariteetti-natiivi-20260924.md` — koko pariteetti-
  kierroksen tulos, **41 riviä + 12b/21b/21c, kaikki 43 näkymää
  verrattu**. Yhteenveto taulukon lopussa (rivi "Yhteenveto per
  näkymä"): 25 PASS, 5 hyväksytty/korjattu, 7 ero/jonossa, 2 ei-
  vertailukelpoista (mittaustapa), 3 odottaa uusintaa.
- `docs/raportit/b7-kuulokoe-tulos-20260924.md` — kohta 3 (mannerlento)
  löydös: `koetila mannerlento` toimii nyt, mutta `rivi i` -komento
  epäonnistuu `PeliOhjain.AvaaMannerlennot()`:n puuttuvan
  `riviValittu`-käsittelijän takia. Korjaus haarassa
  `pelikoodari/mannerlento-rivi`, merge-pyynnössä Natiivisepällä
  (24.9.2026 iltapäivällä).
- `tools/pariteetti-web-lehti.mjs` — oma web-kuvatyökalu (Chromium
  --use-angle=metal, window.matkakirja.ui-konsoli suoraan). Käytetty
  vain erän 1 alussa; erät 2–4 käyttivät Pelikoodarin
  `tools/pariteettikuvat.mjs`:ää (PR #3038, eri haara, ei tässä PR:ssä).

**EI vielä mergetty mihinkään.** Seuraavan session pitää tarkistaa
onko PR #3034 mergetty ennen jatkoa (jos on, jatka uudesta haarasta
origin/mainista).

## 4. Kesken — tee nämä ensin

1. **Pariteettikierroksen 3 avointa kohtaa** (docs/raportit/
   pariteetti-natiivi-20260924.md, rivit 12b/23/41), lähetetty
   Natiivi-UI:lle 24.9. klo n. 10.05: matkakirjakortti-kiinni ei näy
   natiivissa, linssin selite tarvitsee uusintakuvan, maatiedot-linssi
   tyhjä molemmilla puolin (odottaa Pelikoodarin työkalukorjausta,
   PR #3038). Tarkista onko Natiivi-UI vastannut, päivitä taulukko.
2. **Rivi 1 (etusivu)**: uusittava oikealla mittaustavalla — mittaa
   `.intro-juliste`/`avaus-kesken`-luokan poistuminen "Aloita
   seikkailu" -napin PAINALLUKSESTA, ei sivun latauksesta (Pelikoodari
   24.9.2026: tarkoituksellinen käytös 6.9. tilauksesta, ei bugi).
3. **Rivi 6/7 (lehden nostot/loppu)**: ei-vertailukelpoisia
   mittaustavan takia — uusittava kiinteällä ankkurilla (esim. saman
   otsikkotekstin kohdalla) pikselimäärän sijaan.
4. **B7 kohta 3 (mannerlento)**: kun `pelikoodari/mannerlento-rivi`
   on mergetty masteriin ja asennettu simulaattoriin, aja
   `docs/raportit/b7-kuulokoe-tulos-20260924.md`:n sekvenssi loppuun
   (peli-komento.txt: `uusi-peli 1 lissabon` → `odota-tila Kartta` →
   `koetila mannerlento` → `mannerlennot` → `rivi <n>`) ja mittaa
   ääni Documents/peli-tila.json:n `musiikki.kanavat[].aika`-kentästä.
   Vaihda ääni Mac Studio-kaiuttimiin ajaksi, palauta jälkeen
   (SwitchAudioSource, ks. kohta Ympäristö).
5. **Kohta 4 (jalan-raita/laiva)** ja **kohta 9 (tausta/takaisin)**
   B7-kuulokokeesta: ei vielä testattu.
6. **Kohta 11 (sanelu)** ja **kohta 12 (äänettömyys/Bluetooth)**:
   vaativat fyysisen iPadin — omistajan listalla, ei simulaattorilla.

## 5. Odottaa omistajan päätöstä

Ei tässä vuorossa uusia — kaikki avoimet kohdat ovat teknisiä
jatkotoimia (ks. yllä), ei linjauskysymyksiä.

## 6. Voimassa olevat työtavat (viittaukset, ei kopioita)

- Raamattu: "AGENTIT VAIN OPUS JA SONNET" (agenttisäännöt),
  "MAC STUDIO: UUDEN SESSION ALOITUS" (avaimet, ympäristö).
- docs/roolitus.md: työnjako ja julkaisusäännöt.
- **Tässä vuorossa opittua liitetään Raamattuun VAIN jos Fable
  vahvistaa sen pysyväksi säännöksi** — en itse kirjoittanut Raamattuun.

## 7. Ympäristö

- Työkansio: `/Users/Shared/Claude/Matkakirja-laitetestaaja` (git
  worktree, haara `laitetestaaja-pariteetti-b`).
- iOS-simulaattorit: iPhone 18 Pro (UDID `1572C658-6455-4E55-8C05-
  3F88CB3C32F6`), iPad Pro 11" M5 (UDID `503000D1-34AC-4C42-BDF8-
  7E36753A87CD`). Build tällä hetkellä `3b107c0` molemmissa (asensi
  Natiiviseppä). Simulator.app-GUI puuttuu → kaikki simctl/devicectl-
  kiertotietä (kuvakaappaus `xcrun simctl io <udid> screenshot`,
  komennot `ui-komento.txt`/`peli-komento.txt` app-kontin
  Documents-kansioon).
- **Ääni**: `SwitchAudioSource -s "Mac Studio-kaiuttimet"` ennen
  kuulokoetta, `-s "Scarlett Solo USB"` jälkeen (oma oletus). Scarlett
  Solo USB EI tue ohjelmallista mykistystä AppleScriptilla (`get
  volume settings` palauttaa "missing value") — jos joku muu tarvitsee
  hiljaisen simulaattorin, vaihda ensin Mac Studio-kaiuttimiin ja
  mykistä vasta sitten. **TARKISTA session alussa onko ääni yhä
  Mac Studio-kaiuttimissa mykistettynä** — Linssiseppä lainasi
  simulaattoria klo 10.1x testiin enkä ehtinyt palauttaa ääntä ennen
  luovutusta (odottaa Linssisepän "simulaattori pois" -viestiä).
- Kuvakansiot (ei repossa, jaettu Mac-polku):
  `/Users/Shared/Claude/proto-3d/lokit/pariteetti-20260924/`
  (natiivikuvat, `natiivi-<näkymä>-<iphone|ipad>.jpg`) ja
  `/Users/Shared/Claude/proto-3d/lokit/pariteetti-web-2026-09-24/`
  (Pelikoodarin web-kuvat, `<näkymä>-<koko>.png` + `yhteenveto.json`).
- Avaimet: ei tarvittu tässä vuorossa uusia — ks. Raamattu "MISSA
  AVAIMET OVAT" jos tarvitset.

## 8. Avoimet velat ja opetukset

**Velat:**
1. Rivi 31 (linssi: vesistöt) raportoin ensin väärinpäin — luin neljä
   kuvaa rinnakkain yhdessä työkalukutsussa ja sekoitin tulosten
   järjestyksen. Fable huomasi ja korjasin. **Opetus: kun luet 3+
   kuvaa samassa työkalukutsussa vertailua varten, tarkista aina
   epäselvät/yllättävät tulokset YHDELLÄ erillisellä lukukerralla
   ennen kuin kirjaat löydöksen — älä luota rinnakkaisluvun
   tuloslistan järjestykseen sokeasti.**
2. `docs/raportit/b7-kuulokoe-tulos-20260924.md` rivi "Kohta 3":
   korjausehdotus (`riviValittu`-kutsu) on kirjattu mutta EI
   testattu — vasta mergen jälkeen tiedetään korjaako se ongelman.
3. Rivi 5 (aihesivun otsikkotypografia, web iso/keskitetty vs.
   natiivi pieni/vasen+viiva): ei vielä kenenkään korjausjonossa,
   pelkkä havainto. Pitäisikö kirjata Pelikoodarille/Natiivi-UI:lle?

**Opetukset:**
- Native-puolen `ui`/`peli`-komennot vaativat usein AKTIIVISEN
  pelitilan (`uusi-peli`/`ui aloita <kaupunki>`) ennen kuin dialogit
  näkyvät — pelkkä `?dev=<kaupunki>`-pikatie (kehittaja-pikatie.js)
  EI riitä kaikille komennoille (matkakirja, noppa, sähke, laukku
  epäonnistuivat aluksi juuri tästä syystä, korjaantuivat kun
  Natiivi-UI käytti `uusi-peli 5 marseille`).
- Kaksi eri natiivin testikomentojärjestelmää: `ui-komento.txt`
  (UiKomennot.cs, UI-näkymät ilman peliä) ja `peli-komento.txt`
  (PeliKomennot.cs, pelisilmukan komennot kuten `koetila`/`rivi`) EIVÄT
  jaa tilaa keskenään — komento väärästä tiedostosta ei näy toisen
  puolen tilassa (esim. `sulje-lehti` peli-komennosta ei sulkenut
  ui-komennolla avattua lehteä).
- `kuvaa.sh`-tyylinen simctl-kuvakaappaus (screenshot + sips-resize)
  on luotettavampi kuin tämän session `iOS Simulator` -työkalun oma
  `screenshot`/`inspect`, koska Simulator.app-GUI puuttuu täältä —
  `inspect`/`screenshot` -toiminnot epäonnistuivat suoraan
  ("captureFailed"), mutta `tap`-toiminto toimi silti sokkona.
- Playwright-pohjaiset web-kuvatyökalut (omani ja Pelikoodarin)
  voivat merkitä näkymän `ok:true` vaikka linssi/kortti ei
  todellisuudessa avautunut — DOM-ehto ei aina takaa visuaalista
  sisältöä. Älä luota pelkkään yhteenveto.json:iin, katso kuva.

## 9. Aloitusviesti uudelle sessiolle

```
Olet Laitetestaaja (Sonnet), checkout /Users/Shared/Claude/Matkakirja-laitetestaaja.
git fetch origin && git checkout laitetestaaja-pariteetti-b && git reset --hard origin/laitetestaaja-pariteetti-b
(jos PR #3034 on mergetty mainiin: git fetch origin main && git checkout -B laitetestaaja origin/main sen sijaan)

Lue: CLAUDE.md, docs/roolitus.md, Raamatun "AGENTIT VAIN OPUS JA SONNET"
ja "MAC STUDIO: UUDEN SESSION ALOITUS", ja tämä raportti kokonaan:
docs/raportit/viesti-laitetestaaja-luovutus-20260924-c.md

Olet iOS-simulaattorin ainoa käyttäjä (iPhone 18 Pro + iPad Pro 11",
UDID:t raportissa) — tarkista ensin ääni (kohta 7 Ympäristö: saattaa
olla yhä mykistetty Mac Studio-kaiuttimissa Linssisepän testin
jäljiltä, palauta Scarlett Solo USB:hen jos vapaa).

Sitovat säännöt: agentit vain Opus/Sonnet (enintään 3 rinnakkain),
kysymykset omistajalle AskUserQuestion-korttina, Fablen käskyt
sitovia ilman omistajan lupaa Raamatun sisällä.

ENSIMMÄINEN TEHTÄVÄ: tarkista onko Natiivi-UI vastannut kolmeen
avoimeen pyyntöön (rivit 12b/23/41, kohta 4 raportissa) ja päivitä
docs/raportit/pariteetti-natiivi-20260924.md sen mukaan. Sen jälkeen
jatka B7 kohta 3:sta (mannerlento) jos pelikoodari/mannerlento-rivi
on mergetty — muuten kohta 4/9 (ks. raportin kohta 4).

Vastaa suomeksi, tiiviisti.
```
