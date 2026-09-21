# Sulavuusmittaus (kartan sulavuus) — este, ei tulosta

21.9.2026 n. klo 12.40 Suomen aikaa. Laitetestaaja (uusi Mac-käyttäjätili).
Omistajan sitova päätös 21.9.: "kartan sulavuus ensin, kierros 22 vasta
tämän jälkeen" — tämä on se yritys. **Ei saatu mitattua kummallakaan
laitteella**: este on toistettavissa ja kuvattu alla, jotta Pelikoodari/
Karttaseppä voi korjata sen ennen seuraavaa yritystä.

## Mitä yritin

Mittari (`matkakirja.ui.pallolauta.sulavuus.aloita()`/`.yhteenveto()`,
haara `pelikoodari-nimiot-sulavat`) ei ole vielä mainissa, joten sitä ei
voi ajaa tuotanto-URLista. Kokeilin kahta reittiä lokaalilla http-
palvelimella (Python, `:8791`) tämän haaran koodilla, iPad Pro 11" (M5)
-simulaattorilla (lupa saatu AskUserQuestion-kortilla):

1. **Esisiemennetty tallenne** (sama tekniikka kuin
   `tools/savukkeet/savuke-nimiot-sulavat.mjs`: `new Game({...phase:
   'action', start:'marseille'})`, `tokens.delete('marseille')`,
   tallenne `localStorage`iin, `?lauta=pallo`, `saavu({kesto:0})`,
   odotus "lepo"-tilaan `kamera.nakyvaAlue().skaala` vakaa +
   `nostot.sovittelunTulos().lukossa===false`). **Tulos toistui
   identtisenä joka ajolla**: `ui.game.phase==='action'`,
   `cityOf()==='marseille'`, `kamera` ja `nostot.sovittelunTulos()`
   näyttävät järkeviltä (`lappuja:64, jaljella:0, piilotettu:10,
   lukossa:false`) — MUTTA `.pallolauta-nosto`- ja `.pallolauta-nimi`-
   elementtejä ei ole DOM:ssa YHTÄÄN, ei edes budjetin lattialla
   (`NIMIEN_VAHIN=6`, ei koskaan nolla). Kokeilin `ui.aloitettu=true`,
   toista pehmeää `saavu({kesto:250})`-ajoa, `ohitaSaapumisluenta()`-
   kutsua, Service Workerin/cachen täyttä poistoa — sama tulos joka
   kerta. En löytänyt juurisyytä: joko `nimet.lado()`/nostojen
   ladontasilmukka ei koskaan ehdi ajaa toista kertaa kotelon oikealla
   koolla, tai jokin muu `ui`-tilan bitti (en osaa vielä nimetä mitä)
   jää tästä pikakäynnistyksestä puuttumaan verrattuna oikeaan
   pelikulkuun.
2. **Oikea pelikulku (kosketuksin)**: "Aloita seikkailu" ja saapumisen
   "Ohita"-nappi reagoivat OIKEIN oikealla kosketuksella (siis
   simulaattorin kosketusinjektio TOIMII isoihinkin nappeihin tällä
   kertaa — ei pelkkä pieni "Liiku"-tyyppinen vika). Sen jälkeen ruutu
   kuitenkin jäi pysyvästi jumiin: Marseillen matkapäiväkirjakortti ja
   tumma "RANSKA / France" -tausta pysyivät ruudulla muuttumattomina
   sekä vedon (pan) että nipistyksen (pinch) jälkeen — sama ilmiö kuin
   `laitekierros-22-20260921.md`:n "satunnaiset valokuvakortit
   peittävät lähes joka napautuksen kartalla".

En ehtinyt/löytänyt keinoa erottaa, ovatko nämä sama vika vai kaksi eri
vikaa. iPhone 18 Pro -vertailua ei aloitettu, koska este on
todennäköisesti laiteriippumaton (sama koodi, sama este molemmilla
poluilla) — ei kannata kuluttaa toista simulaattorikierrosta ennen kuin
tie mittariin on auki.

## Pyyntö Pelikoodarille / Karttasepälle

Tarvitaan JOKO (a) dev-only pikatie, joka vie suoraan toimivaan
pallolautaan nimiöineen ilman saapumissekvenssiä (esim.
`?lauta=pallo&dev=marseille` joka tekee saman kuin
`tools/savukkeet/savuke-nimiot-sulavat.mjs`, mutta MYÖS ajaa
`nimet`/`nostot`-ladonnan uudelleen kotelon lopullisella koolla), TAI
(b) selvitys siitä miksi esisiemennetty `action`-vaiheen tallenne ei
koskaan tuota `.pallolauta-nimi`/`.pallolauta-nosto`-elementtejä vaikka
`nostot.sovittelunTulos()` näyttää järkevältä. Testasin täsmälleen
savuke-skriptin sekvenssin selaimen puolella (ei siis pelkkää
laiskuutta omasta koodistani) — koodi on tallessa tämän raportin
committiin asti (poistin sen työhakemistosta, koska en committoinut
sitä: tilapäinen `js/laitetestaaja-harness.js` + yksi `<script>`-rivi
`index.html`:ään, molemmat helppo rakentaa uudelleen tästä raportista).

## Ympäristö

- Uusi Mac-käyttäjätili, worktree `/Users/samireivinen/Matkakirja-sonnet`
  (haara `laitetestaaja`, origin/v1973-prep pohjana uusille erille).
- iPad-lupa (ja iPhone 18 Pro -lupa varmuuden vuoksi) saatu
  AskUserQuestion-kortilla tässä sessiossa 21.9. n. klo 12.30.
- Simulaattori: iPad Pro 11" (M5), UDID
  `503000D1-34AC-4C42-BDF8-7E36753A87CD` — käynnistetty ja sammutettu
  tässä sessiossa, ilmoitettu Julkaisijalle molemmat kerrat.
- Lokaali http-palvelin (`python3 -m http.server 8791`) pysäytetty
  session lopussa.

## Seuraavaksi

1. Pelikoodari/Karttaseppä: yllä oleva este ensin (kirjaa haaralle
   `pelikoodari-nimiot-sulavat` tai uuteen).
2. Kun tie mittariin on auki: iPad + iPhone -vertailu Marseillessa
   (panorointi 2 s, zoomi 1,5 s), raportti Fablelle ja suoraan
   Karttasepälle/Pelikoodarille.
3. Sen jälkeen kierros 22 loppuun (löytämisen sumu v1988, kartuschan
   tap-through, uusi pyramidi) — ks. `docs/raportit/viesti-
   laitetestaaja-luovutus-20260921-siirto.md`.
