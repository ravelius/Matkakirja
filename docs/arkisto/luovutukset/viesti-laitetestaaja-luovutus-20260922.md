# Laitetestaaja → seuraava Laitetestaaja-sessio: luovutus

22.9.2026 n. klo 14.45 Suomen aikaa. Fablen pyynnöstä (konteksti 71 %).
Kirjoitettu väliaikaisessa worktreessä `/Users/koodaus/wt-laitetestaaja-
luovutus` (haara `laitetestaaja-luovutus-20260922`, origin/mainista) —
EI rooli-worktreen (`/Users/samireivinen/Matkakirja-sonnet`) haarassa.
Kaikki tämän session tulosraportit ovat haarassa `laitetestaaja`
(push'ttu, ei mergetty mainiin): grep `docs/raportit/` -kansiosta
päivämäärällä 20260922, tai `git log origin/laitetestaaja`.

## Mittaustavat (opittu tässä sessiossa)

1. **iOS-simulaattori laitepalvelimen kautta** (pääreitti): lainaa
   `tools/laitepalvelin.mjs` (Pelikoodarin haara
   `pelikoodari-laitepalvelin`), EI committoida, poistetaan session
   lopussa. `node tools/laitepalvelin.mjs --portti 8791`, sitten
   `xcrun simctl openurl <UDID> "http://127.0.0.1:8791/index.html?..."`.
   `?lauta=pallo&dev=<kaupunki>` ohittaa saapumissekvenssin
   (js/kehittaja-pikatie.js) — nopein reitti pallolaudalle, mutta EI
   käy kohtaamisten/fokusvirran testaukseen (ks. Košice-kohta alla).
2. **Ei JS-konsolia laitteeseen** tässä sessiossa (ei Web Inspector
   -yhteyttä simulaattoriin eikä xctrace-oikeutta, ks. alla) — tulokset
   luetaan TILAPÄISELLÄ inline-harnessilla: `js/laitetestaaja-
   ablaatio.js` (oma nimi, EI committoida) + yksi `<script>`-rivi
   `index.html`:ään ennen `</body>`, joka kirjoittaa tuloksen näkyväksi
   `<pre>`-ylikerrokseksi sivulle; luetaan `xcrun simctl io <UDID>
   screenshot`illa. Poista MOLEMMAT (`git checkout -- index.html`,
   `rm js/laitetestaaja-ablaatio.js`) ennen haaranvaihtoa tai session
   lopussa.
3. **Sivun sisäiset mittarit** (kaikki main-branchilla, asentuvat kun
   `?kerrokset=` tai `?koe=` on osoitteessa):
   `window.__kehysprofiili` — `aloita()/lopeta()/teksti()/tiivista()`
   (kehysaika + pääsäikeen jako rAF-kutsut vs. tyyli/asettelu/maalaus)
   ja `veto({kesto,nopeusPx,suunta})/vetoTeksti()` (tasaisuusmittari:
   px/ms-vaihtelu, pysähdykset). `js/pallolauta/kehysprofiili.js`.
4. **Kuormatarkkailu välttämätön**: `uptime` ennen jokaista mittausta.
   Kuorma EI laske pelkästä Julkaisijan savukesarjan tauosta — osa
   siitä oli Spotlight/`mdworker_shared`-indeksointia (`ps -Ao
   pid,pcpu,comm -r`). Sovi Julkaisijan kanssa "mittausikkuna alkaa /
   päättyy" -protokolla (max 15 min, Fablen sääntö 22.9.) ENNEN
   simulaattorin käynnistystä.
5. **Playwright-mittaus Macilla (headed, ei headless)**: uusi skripti
   `tools/savukkeet/laitetestaaja-mittaa-desktop.mjs` (EI committoitu,
   poistettu — kirjoita uudelleen tarvittaessa Pelikoodarin
   `tools/savukkeet/mittaa-tasaisuus.mjs`-mallista). Ero Pelikoodarin
   skriptiin: työpöytäkoko 1280×800 (ei mobiiliemulointia), sekä
   WebKit että Chromium valittavissa (`MOOTTORI=webkit|chromium`),
   `headless:false`. `PLAYWRIGHT_JS=/Users/samireivinen/Matkakirja-
   fable/node_modules/playwright/index.js` (oma worktree ei sisällä
   node_modulesia; Fablen tai muun checkoutin node_modules kelpaa
   read-only-viittauksena). Ajaa `__kehysprofiili.veto()` ja zoomi-
   tweenin, tulostaa konsoliin + JSON `/tmp/matkakirja-kaappaukset/`.
6. **Web Inspector fyysiseen iPhoneen — TOIMII nyt Safari Technology
   Preview'lla** (Fable/omistaja selvittivät: Safari 26.6.2 ei nähnyt
   iOS 27.0 -laitetta versioerosta; STP toimii). GUI-skriptit
   `tools/mac/safari-kehitys-iphone.applescript` ym. (Fablen kirjoit-
   tamat, katso myös uudempi `tools/mac/LUEMINUT-iphone-inspector.md`
   jos Fable on ehtinyt sen kirjoittaa). Export-nappi jäi harmaaksi
   viimeksi (epäily: puhelimen automaattilukitus katkaisee viennin
   ennen Stop-painallusta — kokeile Automaattinen lukitus pois).
7. **xctrace EI TOIMI simulaattorin WebContent-prosessiin**, edes
   Developer Tools -luvalla (Järjestelmäasetukset → Tietosuoja →
   Kehittäjätyökalut, annettu Terminalille 22.9.): `--attach <PID>`
   epäonnistuu aina "Cannot find process for provided pid" vaikka `ps
   -p` vahvistaa prosessin elossa — todennäköisesti Applen oma
   hiekkalaatikoitu WebContentExtension.appex ei salli task_for_pid-
   kiinnittymistä ilman get-task-allow-oikeutta. Testattu Terminal-
   työkalun (`mcp__terminal__run_in_terminal`) kautta erikseen (toimi
   tavalliseen zsh-prosessiin, ei WebContentiin) — luovuttu.
8. **`simctl screenshot`/`recordVideo` EIVÄT NÄE lepopiirron
   strobovälkettä** (todettu tänään): molemmat kulkevat oletettavasti
   eri sommittelupolkua kuin näytön oma skannaus. Pelikoodari ehdotti
   juuri ennen luovutusta VAIHTOEHTOA, EI VIELÄ KOKEILTU: `macOS:n oma
   screencapture -R<x,y,w,h>` Simulator-ikkunan alueelta sarjana (esim.
   12× 70 ms välein) ja PNG-kokojen vertailu — Playwrightin WebKit-
   kaappaus (macOS-puolen sommittelija) näki välkkeen selvästi
   (24,0× kokoero levossa vanhassa koodissa, 1,00× uudessa), joten
   sama pitäisi toimia `screencapture`-reitillä Simulatorin omaan
   ikkunaan. Simulator-ikkunan sijainti/koko: `osascript -e 'tell app
   "System Events" to get position of window 1 of process
   "Simulator"'` ja `get size of window 1 of process "Simulator"`.
9. **iOS-simulaattorin kaksisormi-injektio (pinch-zoom) ei toimi**
   (tunnettu rajoite, dokumentoitu useasti aiemmin) — zoomi testataan
   aina `pointOfView`-tweenillä, ei oikealla nipistyksellä.
10. **`mcp__Claude_Code_iOS_Simulator__control`-työkalun `screenshot`/
    `open_url`/`inspect` ovat ajoittain rikki heti boot/erase-
    jälkeen** ("captureFailed" / "Cannot find process") — korjaantuu
    yleensä `detach`+`attach`-parilla. `xcrun simctl openurl`/`io
    screenshot` suoraan Bashista on luotettavampi varareitti.

## Tämän päivän tulokset (haara `laitetestaaja`, kaikki pushattu)

- **GL-nappula musta** GL-oletustilassa (CSS2D näytti oikein) —
  KORJATTU samana päivänä Pelikoodarin toimesta.
- **iPhone-ablaatiotikas** (6 porrasta, Ranska+Camargue): porras 3 jo
  jankkaa, porras 4 pahin — real device eroaa headless-mittauksesta.
- **Liikevara-korjaus**: Camargue porras 4 pan käytännössä korjautui
  (38/79→4/209 janktavaa kehystä). Ranska zoomi jäi ongelmaksi.
- **Zoomi-piirtokokeet + valmistelu-väistö**: perus voitti vanhan
  tahdin 4/4 parissa (~23 % p95-pudotus), mutta jäljelle jäi
  tyyli/asettelu/maalaus (16–26 ms) — real device -löydös, jota Mac ei
  erottanut kohinasta.
- **Kierros 3 (eiliike/laattakevennys)**: ei selvää signaalia,
  supistettu otanta (kuormapiikki, mittausikkuna jaettiin).
- **Kohtaamiset-savukkeet**: Košice EI avautunut (fokusvirta-kosice.js
  puuttui kohtaaminen/kohtaamispiste-kentät) → juurisyy raportoitu
  Sisältökirjurille → korjattu C7:ssä (1a32dae8a) → uudelleentestattu:
  Košice, Bryssel, Ljubljana, Luxemburg kaikki VIHREITÄ (avautuvat).
- **Tasaisuusmittari + dpr2-koe**: perustaso paljasti px/ms-vaihtelu
  112 % vaikka dt p95 vain 23 ms — todennäköinen selitys omistajan
  "nykimis"-kokemukselle, jota kehysaika ei yksin näytä. dpr2 (2
  paria): ei johdonmukaista voittajaa.
- **Lepopiirto-strobovälke (pelikoodari-lepopiirto-webkit)**:
  simulaattorin automaattikaappaus (screenshot+recordVideo) ei nähnyt
  MITÄÄN eroa uuden/vanhan välillä — metodologinen rajoite, EI todiste
  kumpaankaan suuntaan (ks. kohta 8 yllä). `__piirto.tila()`: 32,3 fps
  levossa, syy "pakko" (Pelikoodarin oma WebKit-mittaus antoi 15,5 fps
  ja pelkkää "hidas"-syytä — JOKIN kutsuu `tarvitaan()` ~32×/s minun
  sessiossani, EI selvitetty mikä, Pelikoodari pyysi pinojäljitystä).

## Kesken: Mac-mittaus v2106 (WebKit+Chromium, työpöytä 1280×800)

Ehdin kolme neljästä yhdistelmästä (headed Playwright,
`tools/savukkeet/mittaa-tasaisuus.mjs`-pohjainen oma skripti, EI
committoitu — kirjoita uudelleen tarvittaessa, malli kohdassa 5
yllä), perus = `?koe=mittaus`, vertailu `?koe=syotevanha`:

| moottori | koe | px/ms-vaihtelu | pysähdyksiä | zoomi p95/max (ms) |
| --- | --- | --- | --- | --- |
| Chromium | perus | 7 % | 0/178 | 19,9 / 38,5 |
| Chromium | syotevanha | 35 % | 0/178 | 19,9 / 38,7 |
| WebKit | perus | **42 %** | 0/178 | **29,0 / 126,0** (>50: 2) |
| WebKit | syotevanha | **EI AJETTU** | | |

**Kiinnostavin löydös: WebKit perus (42 % vaihtelu) on selvästi
huonompi kuin Chromiumin syotevanha (35 %)** — syöteputken korjaus
auttaa Chromiumilla isosti, mutta WebKitillä (= oikea laite) jää
silti pahempi vaihtelu kuin Chromiumin VANHALLA koodilla. WebKitin
zoomissa myös 2 kehystä >50 ms (Chromiumilla 0). Tämä sopii yhteen
sen kanssa, että real-device-mittaukset (iPhone) ovat toistuvasti
löytäneet ongelmia joita Mac/Chromium ei näytä.

**EI TEHTY**: WebKit+syotevanha (neljäs rivi, vertailu puuttuu).
GPU molemmilla: "ANGLE (Apple, ANGLE Metal Renderer: Apple M4 Max)"
Chromiumilla, "Apple GPU" WebKitillä.

## Avoimet pyynnöt (priorisoi tässä järjestyksessä)

1. **Mac-mittaus loppuun**: WebKit+syotevanha (neljäs rivi yllä),
   sitten raportti Fablelle+Pelikoodarille (mikä osuus tökkimisestä on
   syöteputkea vs. pitkiä kehyksiä — WebKit-luvut viittaavat siihen,
   että osa on kumpaakin, ei pelkkä syöteputki).
2. **iPhone-mittaus viileä/lämmin**: Fable sopii omistajan kanssa
   milloin puhelin kytketään — LÄHETÄ FABLELLE YKSI RIVI "puhelin
   kytkettäväksi: <mitä pitää tehdä>" JA ODOTA KUITTAUSTA ennen ajoa
   (Fablen sääntö 22.9. iltapäivä). Ranska z6 + Camargue z8, viileä heti
   latauksen jälkeen ja 5 min jatkuvan pelaamisen jälkeen — 5 min
   pelaamisen tarvitsee omistajan kädet, en voi tehdä sitä itse.
3. **Lepopiirron laitetodennus**: kun Pelikoodari ilmoittaa haaran
   valmiiksi — KOKEILE ENSIN `screencapture -R` Simulator-ikkunaan
   (kohta 8 yllä) ennen kuin pyydät omistajan silmää. LÄHETÄ FABLELLE
   RIVI JA ODOTA KUITTAUSTA jos tarvitset omistajan puhelinta/silmää.
   Selvitä myös `tarvitaan()`-kutsujen lähde (Pelikoodarin pyytämä
   pinojäljitys, ks. yllä) — tämä on Mac/simulaattori-työtä, ei vaadi
   omistajaa.
4. **Esilatauksen laiteohje** (#2768, Karttaseppä) — ei vielä aloitettu
   tässä sessiossa, tarkista onko yhä ajankohtainen.

## Mittausikkunasäännöt (Fable, 22.9.2026)

Ilmoita Julkaisijalle "mittausikkuna alkaa" (max 15 min) ENNEN
simulaattorin/Mac-mittauksen käynnistystä jos mittaus on kuorma-
herkkä (tarkka fps/aika, ei pelkkä toiminnallinen savuke); Julkaisija
pysäyttää savukkeet-mac-ajot ja dispatchit ajaksi. Ilmoita "päättyy"
heti valmiiksi. Fyysisen iPhonen käyttö: PYYDÄ AINA FABLEN KAUTTA, ei
omistajalta suoraan — yksi rivi + odota kuittaus.

## Mitä uusi sessio tekee ensin

1. Lue tämä, CLAUDE.md, Raamatun Ydinajatus kohta 2, lokin viimeiset
   otsikot.
2. `cd /Users/samireivinen/Matkakirja-sonnet && git fetch origin &&
   git checkout laitetestaaja && git pull` — kaikki tämän session
   raportit ovat siellä (7 committia, 22.9.2026).
3. Tarkista onko `pelikoodari-lepopiirto-webkit` tai muu kesken oleva
   haara edennyt (`git log --oneline -5 origin/pelikoodari-*`).
4. Aloita avoimet pyynnöt -listasta järjestyksessä.
5. Poista tämä väliaikainen worktree kun PR on mergetty tai ei enää
   tarvita: `git worktree remove /Users/koodaus/wt-laitetestaaja-
   luovutus` (EI tästä sessiosta — toinen sessio tai omistaja).
