# Mac-mittaus v2106 loppuun: WebKit + syotevanha (Laitetestaaja 22.9.2026)

Jatkoa docs/raportit/viesti-laitetestaaja-luovutus-20260922.md (haara
laitetestaaja-luovutus-20260922, e13eb455a) kohtaan "Kesken: Mac-mittaus
v2106". Puuttunut neljäs yhdistelmä (WebKit+syotevanha) ajettu, ja kaikki
neljä ajettu uudelleen SAMALLA harnessilla suoraan vertailukelpoisuuden
vuoksi (edellisen session skripti ei ollut committoitu eikä säilynyt).

## Menetelmä (poikkeaa edellisestä ajosta — ks. huomio alla)

Uusi, ei-committoitu skripti `mittaa-tasaisuus-desktop.mjs` mallinnettu
`tools/savukkeet/mittaa-tasaisuus.mjs`:stä (Pelikoodari): työpöytäkoko
1280×800, deviceScaleFactor 2, **hiiri** (ei kosketus/mobiiliemulointi),
headed (`headless:false`), moottori valittavissa (WEBKIT/CHROMIUM). Ajaa
per toisto: `__kehysprofiili.veto()` (3 s panorointi, 80 px/s) ja
`pointOfView`-zoomitween (800 ms) `__kehysprofiili.aloita/lopeta`-parilla.
3 toistoa/yhdistelmä, samalla Mac Studiolla, `?lauta=pallo&koe=<lippu>`.

**Ero edelliseen ajoon:** edellinen (kesken jäänyt) ajo käytti mobiili-
emuloitua kosketuspolkua (390×844, dpr 3, `hasTouch`); tämä ajo käyttää
hiirtä työpöytäkoossa, koska alkuperäistä skriptiä ei ollut tallessa.
Absoluuttiset prosentit eivät siksi ole suoraan vertailukelpoisia
edellisen raportin lukuihin — vain tämän ajon SISÄINEN vertailu
(moottori × lippu, sama harness) on luotettava.

**Kuormahuomio:** mittausikkuna sovittu Julkaisijan kanssa (savukkeet-mac
tauolle), mutta `uptime` pysyi n. 50 koko ajon ajan — muut interaktiiviset
sessiot (Karttaseppä) ajoivat samaan aikaan omia työkujaan, mihin
Julkaisijan savuketauko ei vaikuta. Tulokset ovat siksi kohinaisempia
kuin ihannetilanteessa (näkyy erityisesti WebKit/mittaus-toiston 1
poikkeamana 88 %, ks. taulukko).

## Tulokset (3 toistoa/yhdistelmä, keskiarvo)

| moottori | koe | px/ms-vaihtelu (ka) | yksittäiset toistot | pysähdyksiä | zoomi p95/max (ms) |
| --- | --- | --- | --- | --- | --- |
| Chromium | mittaus (uusi) | 18 % | 7, 6, 41 | 0,0/178 | 17,7 / 19,4 |
| Chromium | syotevanha | 20 % | 17, 24, 19 | 0,0/178 | 18,5 / 19,8 |
| WebKit | mittaus (uusi) | **48 %** | 88, 33, 23 | 0,3/178 | 20,0 / 21,0 |
| WebKit | syotevanha | **55 %** | 68, 51, 47 | 0,3/177 | 19,3 / 20,3 |

GPU: Chromium "ANGLE (Apple, ANGLE Metal Renderer: Apple M4 Max)",
WebKit "Apple GPU" (molemmat todennettu ajon konsolilokista).

## Tulkinta: kumpi osuus tökkimisestä on syöteputkea, kumpi pitkiä kehyksiä

- **Pitkät kehykset eivät selitä WebKitin huonompaa tulosta.** Zoomi-
  tweenin kehysajat (p95/max ~19–21 ms molemmilla moottoreilla ja
  molemmilla lipuilla) ovat lähellä toisiaan — ei 50 ms:n ylityksiä
  kummassakaan. Jos ongelma olisi pitkät piirtokehykset, se näkyisi
  täällä; ei näy.
- **px/ms-vaihtelu (syöteputken oire) on se, missä WebKit eroaa
  Chromiumista selvästi**: WebKit 48–55 % vs Chromium 18–20 %, siis n.
  2,5–3× suurempi vaihtelu samalla dt:llä. Tämä sopii yhteen
  sulavuuskatsauksen kohdan 13 kanssa (kamera kirjoitetaan joka
  tapahtumasta, ei kerran kehyksessä per rAF) — WebKitin tapahtuma-
  silmukka + Playwrightin hiiritapahtumien ajoitus altistaa tälle
  Chromiumia enemmän, mikä osuu yhteen sen kanssa, että real-device-
  löydökset (iPhone) ovat toistuvasti pahempia kuin Mac/Chromium.
- **`koe=mittaus`-korjaus (uusi syöteputki) ei tässä ajossa erotu
  kohinasta kummallakaan moottorilla**: Chromium 18 % vs 20 %,
  WebKit 48 % vs 55 % — suunta on oikea (uusi ≤ vanha molemmilla),
  mutta ero on pienempi kuin yksittäisten toistojen hajonta
  (WebKit/mittaus 23–88 %). Kuormahuomion mukaisesti tämä ajo EI ole
  puhdas näyttö korjauksen vaikutuksesta millään moottorilla — vain
  suunta on samaa mieltä sen kanssa, että korjaus auttaa.
- **Johtopäätös Pelikoodarille:** tämän ajon perusteella WebKitin
  (= oikean laitteen) huonompi tasaisuus ei selity pitkillä
  render-kehyksillä (zoomi p95/max ok) vaan syöteputken vaihtelulla —
  sama syy kuin Chromiumilla, vain voimakkaampana. Sulavuuskatsauksen
  kohta 13 (syöte kerran kehyksessä rAF:ssa) on siis oikea korjaus
  molemmille, mutta sen suuruusluokan mittaaminen luotettavasti Macilla
  vaatii joko hiljaisemman ikkunan (muut sessiot pois) tai laitteella
  mittaamisen (iPhone, seuraava avoin pyyntö).

## Skripti (ei committoitu — kirjoita uudelleen mallista)

`tools/savukkeet/mittaa-tasaisuus.mjs` + työpöytämuutokset: viewport
`{width:1280,height:800}`, `deviceScaleFactor:2`, ei `isMobile`/`hasTouch`,
`MOOTTORI` valitsee `pw.webkit`/`pw.chromium` (webkit: ei `--use-angle`-
lippuja), `pointerType:'mouse'` `veto()`-kutsussa, zoomi-osio lisätty
erikseen `pointOfView(pov, 800)` + `aloita/lopeta`. Tallenna
`/tmp/matkakirja-kaappaukset/tasaisuus-desktop/<moottori>-<koe>.json`.

## Seuraava avoin pyyntö

iPhone-mittaus viileä/lämmin — pyyntö lähetetty Fablelle (osoite
`https://matkakirja.app/?lauta=pallo&dev=marseille&koe=mittaus`), odotan
kuittausta ennen ajoa.
