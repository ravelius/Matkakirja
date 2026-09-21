# Laitetestaaja → seuraava Laitetestaaja-sessio: luovutus

21.9.2026 n. klo 07.10 Suomen aikaa. Edellinen luovutus:
`docs/raportit/viesti-fable-luovutus-20260920.md` (osio
"Laitetarkistukset", Sonnet 1:lle). Tämä sessio ("Laitetestaaja",
UUSI SESSIOSETTI 20.9.2026 klo 18.01, ks. Raamattu-loki) ajoi
kierrokset 19, 19b, 20, 20b, 21 ja 21b.

## Lue ensin

1. `CLAUDE.md`, `docs/roolitus.md`
2. `docs/raamattu-loki/paatokset-2026-09-13--09-20.md` — hae
   "UUSI SESSIOSETTI" (roolit ja worktreet), "TUPLASAAPUMINEN"
   (Berliini↔Rooma-luentavika, ei toistunut millään menetelmällä
   tähän mennessä).
3. Tämä raportti kokonaan ennen työn aloitusta.

## Tila

- Tuotanto: **v1985** (`bd024453`, "GSHHG-rantaviiva, nostotasot,
  huntu liikkeen ajan").
- Tässä vuorossa julkaistut versiot (Julkaisijan tekemät, en itse
  julkaissut mitään):

  | Versio | Sisältö |
  | --- | --- |
  | v1980–v1983 | joet, nimiöt, nostokortti-karuselli, kohdemaan nimiöt elävinä, himmeä reittiverkko, lähderivin poisto |
  | v1985 | GSHHG-rantaviiva, nostotasot, huntu liikkeen ajan |

## Pushatut raportit (haara `laitetestaaja`, origin/v1973-prep pohjalta)

Kaikki committoitu ja pushattu, ei avoimia PR:iä (en tee mergejä):

- `docs/raportit/laitekierros-19-20260920.md` — hitchhike-kaaret,
  saapumisen piilot OK; joet-löydös oli jo tiedossa
- `docs/raportit/laitekierros-19-nostotyypit-20260920.md` — 11/11
  nostotyyppiä kontaktiarkkina
- `docs/raportit/laitekierros-19b-20260920.md` — WebKit-korvike
  (iPad-lupa jumissa), tuplasaapuminen ei toistunut, Ihmisen matkan
  kuvat latautuivat
- `docs/raportit/laitekierros-20-20260920.md` — v1982: nimiöt OK,
  karuselli OK, Gironde OK, **lähderivi EI poistunut** (silloin)
- `docs/raportit/laitekierros-20b-20260920.md` — v1983: **Camarguen
  hevoset/Camarguenvarsa-nimiöt limittyvät** (vahvistettu kahdesti),
  lähderivi korjattu, himmeä reittiverkko OK
- `docs/raportit/laitekierros-21-20260921.md` (+ kierros 21b samassa
  tiedostossa) — v1985: joet/meri/nimiöt/nostotaso-1 OK, kaupunkiliuska
  OK, suurennos avautuu oikein; huntu pitkällä siirrolla ja
  ESP/DEU-zoomi jäivät kesken (ks. alla)

## Kesken — tee nämä ensin

1. **Huntu pitkällä siirrolla (lento).** Ei saatu testattua
   Playwrightilla: saapumisnäkymän satunnaiset sisältökortit (vanha
   valokuva, Livia-keskusteluikkuna, saapumistraileri) peittävät
   Liiku-napin eivätkä sulkeudu luotettavasti ohjelmallisesti. Suora
   `game.actionFly()` ei laukaise oikeaa lento-animaatiota (sama kuin
   kierros 19b:n tuplasaapumis-jäljitys). **Jatka mieluiten oikealla
   simulaattorilla**, ei Playwrightilla — jos iPad-lupa on nyt
   kunnossa (ks. Odottaa omistajan päätöstä), kokeile ensin sitä.
2. **ESP/DEU yksi zoomitaso + laattojen nostotaso/meri.** Sama este
   kuin yllä (saapumiskortti ei sulkeutunut ohjelmallisesti). Vain
   saapumisnäkymä vahvistettu kummastakin maasta.
3. **Karttasepän himmeät kaaret -fps-mittaus** (haara
   `karttaseppa-himmeat-kaaret`, ei vielä julkaistu). Siirretty
   Pelikoodarille: "Liiku"-nappi ei reagoi simulaattorin
   synteettiseen kosketukseen tällä haaralla, VAIKKA Playwrightin
   oikea kosketussimulaatio läpäisee saman napin samalla
   koordinaatilla ja tallenteella — johtopäätös oli, että vika on
   simulaattorityökalun kosketusinjektiossa, ei pelin koodissa.
   Odota Pelikoodarin/Karttasepän vastausta ennen jatkoa.
4. **Nostotaso 3** (näkyy vasta lähizoomilla) — en löytänyt yhtään
   esimerkkiä millään laitteella tähän mennessä. Voi olla, ettei
   pinsettizoomi tällä työkalulla yllä riittävän lähelle, tai
   ettei testatuilla alueilla (Marseille, Carcassonne) ole
   kolmostason nostoja lainkaan. Kokeile toista aluetta.
5. **Suurennoksen selausnuoli** (‹/› suurennetun kuvan sisällä) —
   napautus rekisteröityi mutta laskuri ("1/3") ei näyttänyt
   edenneen kaappauksessa. Epäselvää, oliko kyse kuvan vaihdon
   ajoituksesta vai samasta "kuollut nappi" -ilmiöstä.
6. **Pariisin kaupunkiliuska** — Marseillella toimii varmasti
   (kartta-canvasin kaupunkinimen napautus, ei DOM-nappi), Pariisissa
   en saanut sitä auki (osui aina viereiseen nostoon tai
   päiväkirjatekstiin, koska kartta on tiheä siellä). Ei syytä
   epäillä bugia, mutta ei myöskään suoraan vahvistettu.

## Odottaa omistajan päätöstä / tarkistettavaa

- **iPad-simulaattorin lupa.** Session aikana iPad Pro 11" (M5)
  ilmestyi käynnistettynä ilman että minä käynnistin sitä — mahdollisesti
  omistaja myönsi "Let Claude use it" -luvan tämän kierroksen aikana.
  En vahvistanut tätä erikseen. **Tarkista ensimmäiseksi**: kokeile
  `attach` iPadille ilman lupavirhettä. Jos toimii, aja kierros 19b
  uudelleen oikealla iPadOS-Safarilla (ei WebKit-korvikkeella) ja
  vahvista tuplasaapuminen + Ihmisen matkan kuvat siellä — Fable
  pyysi tätä alunperin.

## Voimassa olevat työtavat (viittaukset, ei kopioita)

- `docs/roolitus.md`: rooli "Sonnet — tarkastaja: QA ja mekaaniset
  työt", viestintäsäännöt (raportti tiedostoon + polku viestinä,
  ei AskUserQuestionia, ei mergejä).
- **Tässä vuorossa vakiintunut, EI vielä Raamatussa** (harkitse
  kirjaamista, jos toistuu jatkossakin): simulaattorin tap/swipe/
  touch_path-toiminnot eivät luotettavasti aktivoi TIETTYJÄ pieniä
  DOM-nappeja (monitoimi-nappi "Liiku", kuvasarjan väkäset) — sama
  koordinaatti toimii Playwrightin oikealla kosketussimulaatiolla
  mutta ei simulaattorin omalla injektiolla. Muu kosketus (kartan
  nostomerkit, asetusrattaat, kaupunkinimet) toimii moitteetta
  molemmilla. Ei koodivika, vahvistettu kahteen kertaan.

## Ympäristö ja infra

- Kone: Mac Studio, työkansio `/Users/samireivinen/Matkakirja-sonnet`
  (worktree, haara `laitetestaaja` ← `origin/v1973-prep`). **Fablen
  checkoutiin `/Users/samireivinen/Matkakirja-fable` ei kosketa.**
- Simulaattorit: iPhone 18 Pro (UDID `283EDDD1-56DB-4B84-
  A148-5E842645957D`, ainoa jota itse käynnistin/sammutin tässä
  vuorossa). iPad Pro 11" M5 (UDID `6E6B5A9B-9281-4F88-8C10-
  B60D0D524642`) ilmestyi käynnistettynä kesken session — en
  sammuttanut, koska en itse käynnistänyt.
- **Yksi simulaattori kerrallaan, sammuta kierroksen jälkeen** — muistuta
  Julkaisijaa "simulaattori päällä/pois" -viesteillä joka kerta
  (perf-savukkeet flakkaavat kuormasta samalla koneella).
- **Uusi tekniikka, kannattaa säilyttää**: real-simulaattorin
  localStorage voi kirjoittaa suoraan `sqlite3`:lla (Python)
  tiedostoon `~/Library/Developer/CoreSimulator/Devices/<UDID>/data/
  Containers/Data/Application/<container>/Library/WebKit/
  com.apple.mobilesafari/WebsiteData/Default/<origin-hash>/<origin-
  hash>/LocalStorage/localstorage.sqlite3` (avain `matkakirja-save-
  v1`, arvo UTF-16LE-koodattu JSON, `PRAGMA wal_checkpoint(TRUNCATE)`
  ennen ja jälkeen). Löytää oikean origin-hashin uusimman
  muokkausajan/sisällön perusteella. Nopeuttaa pelin siirtämistä
  tiettyyn kaupunkiin huomattavasti verrattuna UI-navigointiin.
- En koskenut avaimiin (R2, GitHub Actions secrets) — en tarvinnut
  niitä lukevaan/mekaaniseen työhön.

## Avoimet velat ja opetukset

**Velat:**
1. Huntu pitkällä siirrolla — ei testattu (ks. Kesken 1).
2. ESP/DEU yksi zoomitaso + laatat/meri — ei testattu (ks. Kesken 2).
3. Nostotaso 3 — ei vahvistettu kumpaankaan suuntaan (ks. Kesken 4).
4. Suurennoksen selausnuoli — epävarma tulos (ks. Kesken 5).

**Opetukset:**
1. **Simulaattorin tap-koordinaatit ovat laitepisteinä, eivät
   kuvapikseleinä** — kaappaus on n. 2,289–3× suurempi (laitteesta
   riippuen). Jaa luetut pikselit tällä kertoimella ennen tap-kutsua.
2. **Simulaattorin "oletuskohdelaite" voi vaihtua hiljaa**, jos toinen
   sessio/omistaja käynnistää toisen laitteen samaan aikaan. Käytä
   AINA eksplisiittistä `device`-parametria tap/open_url/screenshot-
   kutsuissa, älä luota siihen että "viimeksi attachattu" pysyy.
3. **`actionFly()` tai muu suora pelilogiikkakutsu EI korvaa oikeaa
   UI-animaatiota** (lento, tuplasaapuminen) — testaa nämä aina
   oikean kosketuspolun kautta (Playwrightin `locator().tap()` tai
   oikea simulaattori), ei ohittamalla.
4. **Kun jokin kosketus ei toimi simulaattorilla mutta koodi vaikuttaa
   oikealta**, testaa SAMA kosketus Playwright/WebKitillä (oikealla
   `touchscreen.tap()`/`locator().tap()`-hit-testillä, ei pelkällä
   `.click()`-ohituksella) ennen kuin epäilet koodivikaa — usein kyse
   on nimenomaan simulaattorityökalun rajoitteesta (ks. "Liiku"-vika
   yllä).
5. Saapumisnäkymän satunnaiset sisältökortit (vanhat valokuvat,
   Livia-keskustelu, saapumistraileri) tekevät tuoreen tallenteen
   ohjelmallisesta automatisoinnista hauraan — laske aikaa niiden
   kesyttämiseen tai käytä valmiiksi pidemmälle edennyttä tallennetta.

## Aloitusviesti seuraavalle Laitetestaaja-sessiolle

```
Olet Laitetestaaja (Sonnet) — Matkakirjan iOS-simulaattori ja
laitekierrokset. Repo: ravelius/Matkakirja. Työkansio:
/Users/samireivinen/Matkakirja-sonnet (ÄLÄ koske
/Users/samireivinen/Matkakirja-fable:hen).

git fetch origin && git checkout -B laitetestaaja origin/laitetestaaja

Lue: CLAUDE.md, docs/roolitus.md,
docs/raportit/viesti-laitetestaaja-luovutus-20260921.md (tämä
raportti kokonaan), docs/raamattu-loki/paatokset-2026-09-13--09-20.md
(hae "UUSI SESSIOSETTI", "TUPLASAAPUMINEN").

Sitovat säännöt: agentteina vain Opus/Sonnet; raportoi Fablelle vain
gitillä (tiedosto + polku viestinä, ei AskUserQuestionia); ilmoita
Julkaisijalle "simulaattori päällä"/"pois" aina kun käynnistät tai
sammutat; yksi simulaattori kerrallaan; älä mergee äläkä nosta
versiota itse. Vastaa suomeksi, tiiviisti.

Ensimmäinen tehtävä: tarkista onko iPad-simulaattorin lupa nyt
kunnossa (ks. luovutuksen "Odottaa omistajan päätöstä"). Jos on, aja
kierros 19b uudelleen oikealla iPadOS-Safarilla (tuplasaapuminen +
Ihmisen matkan kuvat). Jos ei, jatka luovutuksen "Kesken"-listalta
tärkeysjärjestyksessä (huntu pitkällä siirrolla, ESP/DEU-zoomi).
```
