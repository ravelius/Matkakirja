# Laitetestaaja → seuraava Laitetestaaja-sessio: luovutus (22.9.2026 ilta)

Konteksti 73 %, Fablen pyynnöstä luovutus nyt, ennen Piirtokoe-raportin
viimeistelyä. Kirjoitettu roolihaarassa (`laitetestaaja`,
/Users/samireivinen/Matkakirja-laitetestaaja) — EI pushata mainiin, EI
PR:ää tästä committista.

## Tila lyhyesti

- Mac-mittaus v2106, seuraamisvirhe (aito hiiri, kamera vs osoitin),
  interpolointikorjauksen A/B (32/32 FAIL), Pelikoodarin syöteloki-
  integraatio, viiden syötetavan (interp/vanha/ennakko/jousi/touch)
  itsetestaus — kaikki raportoitu Fablelle jo aiemmin tänään, ei
  avoimia kysymyksiä niistä.
- **PR #2846** (tools/mac/aikajana-mittaus.md, Julkaisijalle) on auki,
  ei vielä mergetty — tarkista tila ensimmäisenä
  (`gh pr view 2846 --repo ravelius/Matkakirja`).
- **PR #2814 ja #2829** (tools/mittaus/seuraamisvirhe-palvelin.mjs +
  korjaukset) ovat MERGETTYJÄ mainiin — pysyvä työkalu on siis
  käytettävissä suoraan `main`-haarasta.

## CGEvent-löydös (tärkeä, säästää seuraavalta sessiolta aikaa)

**CGEvent-veto (leftMouseDown/Dragged/Up) EI liikuta karttaa** tässä
ympäristössä, TODISTETTU DATALLA (ei vain silmämääräisesti — ensimmäinen
"toimii"-havaintoni osoittautui myöhemmin harhaksi, ks. tools/mac/
aikajana-mittaus.md "Todettu tässä sessiossa" -osio):

- Klikkaus ja hover TOIMIVAT CGEventillä (napit reagoivat, tooltipit
  ilmestyvät).
- Veto (mousedown+dragged+mouseup), myös hitaalla mouseMoved-esisarjalla
  ennen mousedownia (Fablen ehdotus), tuottaa NOLLA pointerdown/move/up-
  tapahtumaa pelin puolella (todennettu `ui.pallonSyote.loki`:lla ja
  passiivisella pointer-kuuntelulla) — ei siis toimi aidon vedon
  korvikkeena.
- **Käytännön seuraus:** aito seurantavirhemittaus (kamera vs. osoitin)
  vaatii aina omistajan/Fablen oikean käden. Piirtokoe-tyyppiset
  mittaukset (jotka käyttävät pelin OMAA sisäänrakennettua synteettistä
  vetoa `__kehysprofiili.veto()`) EIVÄT tätä ongelmaa kärsi, koska veto
  dispatchaa PointerEventit itse — ei tarvitse CGEventiä lainkaan.

## Aikajana-ohjeen käyttö (tools/mac/aikajana-mittaus.md)

Web Inspectorin avaus ja aikajanatallennuksen aloitus/lopetus onnistuvat
KOKONAAN Kehitys-valikon komennoilla System Eventsillä (ei CGEvent-
koordinaattiklikkausta):

```bash
osascript -e 'tell application "Safari" to activate
delay 0.3
tell application "System Events"
  tell process "Safari"
    click menu item "Aloita aikajanatallennus" of menu 1 of menu bar item "Kehitys" of menu bar 1
  end tell
end tell'
```

Avaa Web Inspectorin, siirtyy Aikajanat-välilehdelle JA käynnistää
tallennuksen yhdellä komennolla. Sama `"Lopeta aikajanatallennus"`
lopettaa. Vain kaksi pientä kontrollia (Kehykset-alavälilehti,
Näyttökuvat-aikajanan pois-kytkentä) jäivät CGEventille tavoittamattomiin
— ihminen klikkaa ne, katso ohjeesta tarkat sijainnit.

## KESKEN: Piirtokoe-taulukko Macin Safarilla — DATA JO KERÄTTY, RAPORTTI PUUTTUU

v2125 on mainissa (470031e60, "Piirtokoe-valikko ja kehysprofiilin
kytkin", #2845). Liput: `normaali`=`?koe=profiili`,
`eipuskuri`=`?koe=profiili,eipuskuri`, `dpr15`=`?koe=profiili,dpr15`,
`eivienti`=`?koe=profiili,eivienti` — kehysprofiili vaatii AINA
`profiili`-lipun asentuakseen (piirtokoe-lippu yksin ei riitä).

**Ehdin ajaa kaikki neljä mittausta** uudella työkalulla
`tools/mittaus/piirtokoe-mittaus.mjs` (kirjoitettu tässä sessiossa,
COMMITOITU TÄHÄN samaan luovutukseen — tiedosto ja raakadata ovat nyt
tässä haarassa: `tools/mittaus/piirtokoe-mittaus.mjs` ja
`docs/raportit/data/piirtokoe-mac-safari-2026-09-22.jsonl`, ei tarvitse
hakea worktreestä). Käyttää pelin OMAA sisäänrakennettua
`window.__kehysprofiili.veto()`-synteettistä vetoa (EI CGEventiä, EI
Playwrightia — avataan `open -a Safari <url>` oikeaan Macin Safariin,
veto ajaa itsestään sivulla).

**AVOIN ONGELMA ennen raportin kirjoittamista:** kaikissa neljässä
mittauksessa kertyi vain ~47 kehystä 10 s:n `kesto`-parametrilla (pitäisi
olla ~250-300 kehystä 30-40 fps:llä). Tarkistin, että `${KESTO}`-
templaatti korvautuu oikein palvelun tuottamassa HTML:ssä (`curl` näytti
`kesto: 10000` oikein) — syy on siis JOKO `__kehysprofiili.veto()`:n
omassa toteutuksessa (mahdollisesti aloita()/lopeta()-parin kesto ei
noudata `kesto`-parametria odotetulla tavalla, tai `dt`-arvot 33-49 ms
ovat todellisia MUTTA ~47 kehystä vastaisi silloin vain ~1,5-2 s, ei 10 s)
TAI jossain omassa laskentavirheessäni. **Selvitä tämä ENNEN taulukon
kirjoittamista** — muuten p50/p95/max-luvut voivat perustua liian lyhyeen
otokseen. Lue `js/pallolauta/kehysprofiili.js`:n `veto()`-funktio
(rivit ~159-196) tarkkaan; epäilykseni on, että `kesto`-parametri ohjaa
vain SIIRTYMÄN kestoa (synteettisen sormen liikettä), ei kehysprofiilin
`aloita()/lopeta()`-ikkunaa erikseen — jos näin on, 47 kehystä 10 s:n
`nopeusPx`-vedolla saattaa silti olla oikein JOS kartta pysähtyy kesken
(pysähdyksiä=0 datassa, joten tuskin) TAI dt-arvot ovat harhaanjohtavia
(33-49 ms per kehys on hidas, mutta ei selitä kehysmäärää).

**Raakadata (4 riviä) päätuloksineen, jos haluat vain kirjoittaa raportin
tällä varauksella:**

| koe | kehyksiä | dt p50/p95/max (ms) | yli20ms % | js/render/varattu ka (ms) | puskuri/uniform/glVienti/jakoja ka |
| --- | --- | --- | --- | --- | --- |
| normaali | 47 | 33 / 35 / 38 | 100 | 2,72 / 1,15 / 1,70 | 53,1 / 1480 / 1 / 112,2 |
| eipuskuri | 47 | 33 / 37 / 44 | 98 | 4,36 / 1,66 / 1,34 | 7,0 / 1384 / 1 / 106,2 |
| dpr15 | 46 | 34 / 46 / 46 | 89 | 2,63 / 0,96 / 1,35 | 53,3 / 1534 / 1 / 110,7 |
| eivienti | 47 | 33 / 36 / 49 | 96 | 3,09 / 1,19 / 2,00 | 47,6 / 1516 / 1 / 101,2 |

Silmämäärin: `eipuskuri` pudottaa puskurikirjoitukset 53→7 (odotetusti,
se on juuri sen tarkoitus) mutta js-aika NOUSEE 2,72→4,36 ms — outoa,
tarkista onko tämä kohina (n=47 on pieni otos) vai todellinen kompensaatio
toisaalla. `dpr15` ei näytä selvää parannusta dt:ssä, mikä olisi
yllättävää jos 1,5 dpr todella vähentää täyttöä neljäsosaan — VAHVISTAA
epäilyä, että otos on liian lyhyt/kohinainen luotettavaan johtopäätökseen.

**Seuraavan session tehtävä:**
1. Selvitä kehysmäärä-anomalia (`js/pallolauta/kehysprofiili.js` veto()).
2. Jos tarpeen, korjaa `tools/mittaus/piirtokoe-mittaus.mjs` (kopioi
   worktreestä, committoi omaan haaraasi) ja aja neljä mittausta
   uudestaan pidemmällä/oikealla otoksella.
3. Kirjoita `docs/raportit/piirtokoe-mac-safari-20260922.md` taulukkona.
4. Fablelle enintään 8 riviä.
5. Committoi omaan haaraasi (ei mainiin, ei PR:ää tästä raportista ellei
   Fable erikseen pyydä).

## Ympäristö

- Rooli-worktree: `/Users/samireivinen/Matkakirja-laitetestaaja`
  (haara `laitetestaaja`, EI mergetä).
- Aputyökalut Bashista käytettävissä `/tmp/laitetestaaja-tyokalut/`
  (klikkaa, vedaa — CGEvent-apuohjelmat; huom yllä oleva löydös vedon
  osalta) — EI säily rebootin yli, käännä uudestaan tarvittaessa
  `swiftc -O tools/mac/klikkaa.swift -o /tmp/klikkaa` (haara v1973-prep,
  ei mainissa).
- Avoimet worktreet siivottavaksi kun ei enää tarvita: katso
  `git worktree list` — useita `wt-laitetestaaja-*`-hakemistoja
  `/Users/koodaus/`:ssa tästä sessiosta, mm. piirtokoe-main (SISÄLTÄÄ
  committoimattoman piirtokoe-mittaus.mjs:n ja jsonl-datan — KOPIOI
  NÄMÄ TALTEEN ENNEN POISTOA).
