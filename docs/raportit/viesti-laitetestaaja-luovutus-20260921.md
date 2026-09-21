# Laitetestaaja → seuraava Laitetestaaja-sessio: luovutus

21.9.2026 n. klo 19.50 Suomen aikaa. Fablen pyynnöstä (konteksti 70 %),
omistaja nollaa session tämän jälkeen. Uusi sessio jatkaa tästä. Tämä
raportti KORVAA saman nimen aiemman version (07.10, ennen tämän
istunnon työtä).

## Mitä ehdittiin tässä istunnossa (kronologisesti)

1. **Sulavuusmittaus (iPad)**: pitkä juurisyyselvitys — nimiöt/nostot
   eivät syntyneet DOM:iin esisiemennetyllä tallenteella, sitten
   CORS-este (tekstuurilla ei `access-control-allow-origin`-otsaketta),
   lopulta Pelikoodarin `tools/laitepalvelin.mjs`-proxy korjasi sen.
   Tulos: panorointi 0 px mediaani/p95, zoomi (kamera-ajolla)
   p95 0,33 px — täsmäsi Macin vertailulukuun. Raportit:
   `docs/raportit/laitemittaus-sulavuus-20260921.md`,
   `-e2.md`, `-tulos.md` (kaikki haarassa `laitetestaaja`).
2. **iPhone-vertailu + kierros 22 v2004** (Mac-uudelleenkäynnistyksen
   jälkeen): heilunta panoroidessa — ei havaittu millään laitteella.
   Meren vilkkuminen zoomatessa — löysin todennäköisen syyn: koon
   liukuvuus (`koko.osuus`) putoaa 0,80:stä 0:aan syvässä
   zoomausvaiheessa, toistuen identtisesti iPhonella JA työpöydällä.
   Nostojen näkyvyys z6: hyvä työpöydällä (kuvin vahvistettu), iPhonella
   epävarma (kuvakaappaukset näyttivät samalta zoomivaiheiden välillä —
   ei ehditty varmistaa onko kyse aidosta piirto-ongelmasta).
   Raportti: `docs/raportit/laitekierros-v2004-iphone-vertailu.md`.
3. **GL-nimiöt vs CSS2D (v2014, `?glnimiot=0` vs oletus)** — KESKEN,
   ks. alla.

## GL-nimiöt-vertailu: tila kesken

Omistajan päätös 21.9.2026 ilta: GL-nimiöt (WebGL-piirto CSS2D:n
sijaan, `js/pallonimiot-gl.js`) tuli tuotantoon OLETUKSENA v2014:ssä
(PR #2667). Julkaisija ilmoitti "glnimiot tuotannossa" ja Fable pyysi
vertailun: kaupunkinimien terävyys/paikka, CSS2D-siirtymän näkyvyys
ilmestyessä, kehysaika pan/zoom, muisti — iPadilla, iPhonella JA
Chromium-työpöydällä, samasta kohdasta (Ranska z6, Marseille z8),
oletustila vs. `?glnimiot=0`.

**Menetelmä**: Pelikoodarin `tools/laitepalvelin.mjs` lainattu
paikallisesti (EI committoitu — ei minun tiedostoni, ei vielä
mainissa). Tilapäinen apuskripti `js/laitetestaaja-harness7.js`
(EI committoitu): `?lauta=pallo&dev=marseille[&glnimiot=0]`,
`pointOfView` Ranska (46.5, 2.5, alt 0.035) ja Marseille (43.30, 5.37,
alt 0.012), `ui.pallolauta.sulavuus` + uusi `tila().kerros`/`sovitin`
(Pelikoodarin GL-diagnostiikka) + `performance.memory` (vain Chromium).

### iPad Pro 11" (M5) — VALMIS

| | GL (oletus) | CSS2D (`glnimiot=0`) |
| --- | --- | --- |
| Ranska z6 fps | 56,9 | 60,3 |
| Marseille z8 fps | 58,7 | 60 |
| nimia (Ranska/Marseille) | 0 / 1 | 0 / 1 |
| virheet | [] | [] |

Kuvakaappaukset Marseillesta (`/tmp/ipad-gl-marseille.png`,
`/tmp/ipad-css2d-marseille.png` — EI kansiossa, laitteen omassa
`/tmp`:ssä, hukkuvat jos ei siirretä) olivat **pikselintarkasti
samat** — ei havaittua terävyys- tai paikkaeroa. fps hieman matalampi
GL:llä (n. 2–3 kehystä/s), ei käytännön merkitystä.

### iPhone 18 Pro — VALMIS

| | GL (oletus) | CSS2D (`glnimiot=0`) |
| --- | --- | --- |
| Ranska z6 fps | 60,1 | 60,1 |
| Marseille z8 fps | 60 | 60 |
| nimia (Ranska/Marseille) | 0 / 0 | 0 / 0 |
| virheet | [] | [] |

Täysi 60 fps molemmissa tiloissa, ei eroa. `nimia: 0` molemmilla
paikoilla — puhelimen kapeampi kotelo (386 px) laskee nimibudjetin
tässä tarkassa pisteessä nollaan (sama ilmiö molemmilla
renderöintitavoilla, ei GL-spesifinen).

### Chromium-työpöytä — KESKEN, tärkeä opetus seuraavalle

**Ensimmäinen yritys epäonnistui**: Browser-paneelin välilehti ei
ollut edustalla (`tabs_select` puuttui), ja Chromium pysäyttää
`requestAnimationFrame`-silmukan TAUSTAVÄLILEHDELLÄ — sulavuusmittari
sai `kehyksia: 0, fps: 0` molemmista kohdista, vaikka `tila()`-luku
onnistui. **Opetus: fronttaa välilehti (`tabs_select`) ENNEN
navigointia ja pidä se edustalla koko mittauksen ajan.**

Sain kuitenkin GL-tilan muistilukeman ennen keskeytystä:
`performance.memory` (Chromium-spesifinen, ei toimi Safarissa/
WebKitissä lainkaan — iPadin ja iPhonen `muisti` oli aina `null`,
odotetusti): **usedMB 199, totalMB 251** (Marseille, GL-tila,
ensimmäinen — mahdollisesti epäluotettava koska sivu ei ollut
edustalla; toista mittaus puhtaalta pöydältä).

**Toinen yritys aloitettu** (`tabs_select` + uusi navigointi,
`&r=2`) mutta KESKEYTYI Fablen luovutuspyyntöön ennen tuloksen
lukemista. Selaimen välilehti `tab-2` (serverId
`preview-local_094eb3ef-bf16-4f26-a723-bb162ec63ec3`) saattaa olla
yhä auki Browser-paneelissa osoitteessa
`http://127.0.0.1:8791/index.html?lauta=pallo&dev=marseille&r=2` —
lokaali palvelin (laitepalvelin.mjs) on kuitenkin jo pysäytetty tässä
istunnossa, joten sivu ei enää lataudu ilman palvelimen uudelleenkäynnistystä.

### Seuraavalle sessiolle: GL-vertailun loppuunsaattaminen

1. Lainaa `tools/laitepalvelin.mjs` uudelleen Pelikoodarin haarasta
   `pelikoodari-laitepalvelin` (tarkista onko mergetty mainiin siihen
   mennessä — jos on, käytä suoraan).
2. Rakenna sama apuskripti kuin tässä raportissa kuvattu
   (`js/laitetestaaja-harness7.js` — sisältö kuvattu yllä, ei
   tallessa tiedostona, kirjoita uudelleen samalla logiikalla: pikatie
   → pointOfView Ranska/Marseille → `sulavuus.aloita/yhteenveto` +
   `tila()` + `performance.memory`, molemmilla `?glnimiot`-arvoilla).
3. **Chromiumissa: `tabs_select` ennen navigointia, pidä välilehti
   edustalla koko ajan** (opetus yllä) — muuten `kehyksia: 0`.
4. Kirjoita raportti `docs/raportit/laitekierros-glnimiot-<pvm>.md`
   (Fablen pyytämä nimi), sisällytä iPad+iPhone-taulukot tästä
   raportista + uusi työpöytämittaus, ja kuvakaappaukset (siirrä
   `/tmp`:stä `docs/raportit/kaappaukset/`-alle ennen committia, jos
   halutaan säilyttää — laitteen oma `/tmp` ei ole pysyvä).
5. Ilmoita Fablelle vain polku + kolme riviä (Fablen alkuperäinen
   ohje).

## Ääni

Mac Studion kaiuttimet olivat käytössä koko GL-mittauksen ajan
(`SwitchAudioSource -s "Mac Studio-kaiuttimet"`), **palautettu
Scarlett Solo USB:hen** tämän luovutuksen kirjoitushetkellä — ei
tarvetta palauttaa uudelleen seuraavassa sessiossa ellei uutta
kierrosta aloiteta.

## Simulaattorien ja ympäristön tila

- iPad Pro 11" (M5) ja iPhone 18 Pro: **sammutettu**, Julkaisijalle
  ilmoitettu joka kerta.
- `laitepalvelin.mjs`-prosessi: **pysäytetty**.
- Työkansio `/Users/samireivinen/Matkakirja-sonnet` (worktree, haara
  `laitetestaaja`), puhdas (`git status` tyhjä tämän committin
  jälkeen).
- Ei kosketa avaimiin.

## Kierros 22: vanhat kesken-kohdat (ennallaan, ei uutta tietoa)

Ks. `docs/raportit/laitekierros-22-20260921.md` "Kesken"-osio:
löytämisen sumu, kartuschan tap-through (satunnaiskortit peittävät
napautuksia), uusi pyramidi tarkemmin — ei ehditty tässä istunnossa.

## Aloitusviesti seuraavalle Laitetestaaja-sessiolle

```
Olet Laitetestaaja (Sonnet) — Matkakirjan iOS-simulaattori ja
laitekierrokset. Repo: ravelius/Matkakirja. Työkansio:
/Users/samireivinen/Matkakirja-sonnet.

git fetch origin && git checkout -B laitetestaaja origin/laitetestaaja

Lue: CLAUDE.md, docs/roolitus.md, TÄMÄ raportti kokonaan
(docs/raportit/viesti-laitetestaaja-luovutus-20260921.md).

Sitovat säännöt: agentteina vain Opus/Sonnet; ilmoita Julkaisijalle
"simulaattori päällä"/"pois" aina; yksi simulaattori kerrallaan; älä
mergee äläkä nosta versiota itse; Mac Studion kaiuttimet käyttöön
ennen jokaista simulaattorikierrosta (SwitchAudioSource -s "Mac
Studio-kaiuttimet"), palauta aiempi laite kierroksen lopuksi. Vastaa
suomeksi, tiiviisti.

ENSIMMÄINEN TEHTÄVÄ: saata loppuun GL-nimiöt-vertailu (ks. raportin
"GL-nimiöt-vertailu: tila kesken" -osio) — iPad ja iPhone ovat
valmiit, työpöytä/Chromium kesken. TÄRKEÄ OPETUS: fronttaa Browser-
paneelin välilehti (tabs_select) ENNEN navigointia, muuten
requestAnimationFrame pysähtyy taustavälilehdellä ja mittari antaa
0 kehystä. Raportti docs/raportit/laitekierros-glnimiot-<pvm>.md,
Fablelle vain polku + kolme riviä.
```
