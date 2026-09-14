# Kolme kirjattua vikaa + ensikehysdiagnostiikka (2026-09-14)

Tilaus: Fable — kirjatut mutta korjaamatta jääneet viat
(`docs/raportit/siirto-2026-09-14-fablelle.md`, kohta "Pienemmät, kirjatut
mutta korjaamatta"). Haara `claude/bold-ride-vow4ki-viat`.

**Lyhyt vastaus.** Vika 1 korjattiin toisessa PR:ssä (#2418) kesken tämän
erän — oma korjaukseni peruttiin, mutta toisto ja juurisyy ovat alla
mitattuina. Vika 3 toistui joka ajossa ja on korjattu (46 s → 5 s).
Vika 2 **ei toistunut 12 ajossa**, ja sen oletettu mekanismi mitattiin
mahdottomaksi — mutta vian 3 korjaus paransi juuri sen mittarit, jotka
alkuperäisessä havainnossa olivat marginaalilla. Vika 4 sai pyydetyn
diagnostiikan, ei korjausta.

Ympäristö: Chromium `/opt/pw-browsers/chromium-1194`, Playwright
`/opt/node22/lib/node_modules/playwright`, paikallinen staattinen palvelin
(`Cache-Control: max-age=600` kuten GitHub Pages). Ulkomaailma katkaistiin
`--host-resolver-rules`illa; `media.matkakirja.app` ohjattiin tarpeen mukaan
joko jumittuvaan sokettiin (yhteys aukeaa, vastausta ei tule) tai välittömään
404:ään. Mittausskriptit ovat raapustuskansiossa, eivät repossa; toistettava
vartio on savukkeena (`tools/savukkeet/savuke-rekisterointi.mjs`).

---

## Vika 1 — `game.autoTravel` ei nollaudu `actionCancelTravel`issa

**Korjattu PR:ssä #2418** (Fablen viesti kesken erän). Oma muutokseni
`js/game.js`:ään ja `tests/pallolauta.test.mjs`:ään **peruttiin** eikä ole
tässä PR:ssä. Toisto ja juurisyy jäävät silti kirjatuksi, koska ne mitattiin.

**Toisto** (Game + UI:n oikea `matkareittienValinta`, Murzuk, 3 bussikohdetta):

```
vuoron alku: phase roll  autoTravel true  bussikohteita 3
Liiku painettu, viuhkassa reittejä: 3
actionCancelTravel()   -> {ok:true}          phase action  autoTravel TRUE
actionTravel('land')   -> {ok:true}          phase roll    autoTravel TRUE
VIUHKA reittejä: 3 -> 0   | matkaSessio: murzuk -> null
```

**Juurisyy.** `actionCancelTravel` palautti vaiheen arvoon `action` mutta
jätti `autoTravel`-lipun päälle, eikä `actionTravel` kirjoita lippua. Siksi
pelaajan omin käsin valitsema matkustustapa näytti `js/ui.js`
`matkaSessioKesken`-ehdossa lepotilalta (`phase === 'roll' && !autoTravel`
oli epätosi), ja liu'un sulkeutuminen matkanapin painalluksessa luettiin
peruutukseksi: reittiviuhka katosi ja matkasessio päättyi kesken matkan.

**Vastakoe** ajettiin ennen perumista: lisätty testi meni läpi korjauksen
kanssa (`# pass 27 # fail 0`) ja kaatui ilman sitä (`# pass 26 # fail 1`).

---

## Vika 2 — offline-lataus heti aktivoitumisen jälkeen

**Ei toistunut. 12/12 ajoa onnistui ennen korjausta ja 12/12 jälkeen.**

Koe: jumittuva ämpäri (vain `audio/` roikkuu, muu media 404 heti — sama
asetelma kuin `tools/savukkeet/savuke-aanilataus.mjs`, jossa 1/6 havaittiin).
Odotetaan palvelutyöntekijän tilaa `activated` **statechange-tapahtumasta**
eikä kyselysilmukasta, siirrytään heti offline-tilaan ja ladataan sivu.

| erä | offline onnistui | ohjain valmiina aktivoitumishetkellä | `activate`-käsittelijän kesto | ohjaimeton ikkuna | offline-käynnistys |
|---|---|---|---|---|---|
| ennen A (6) | 6/6 | 6/6 | 0–8 ms | — | 2,76–5,22 s |
| ennen B (6) | 6/6 | 6/6 | 2–4 ms | — | 3,04–5,07 s |
| jälkeen A (6) | 6/6 | 6/6 | 2–3 ms | 1–3 ms | 1,48–1,68 s |
| jälkeen B (6) | 6/6 | 6/6 | 1–5 ms | 0–4 ms | 1,85–2,45 s |

**Juurisyy: oletettua mekanismia ei ole.** Alkuperäinen selitys oli, ettei
`clients.claim()` ehtinyt. Mitattuna se ei voi jäädä ehtimättä: `claim()` on
`activate`-käsittelijän `event.waitUntil`-ketjun sisällä (`sw.js` activate),
ja työntekijä saavuttaa tilan `activated` vasta kun tuo lupaus on ratkennut.
Mitattu rako tilasta `activated` ohjaimen vaihtoon oli **−1…0 ms kaikissa
24 ajossa**, ja koko `activate`-käsittelijä kesti 0–8 ms.

Vastakoe mekanismille: siemenettiin ennen latausta 15 vanhaa koria × 300
avainta, jotta `activate`n siivous olisi hidas. Ohjaimeton ikkuna
(`activating` → ohjain) oli silti **1–2 ms** kolmessa ajossa ja offline
onnistui 3/3. Välimuistin siivous ei siis kasvata ikkunaa mitattavasti.

**Muutos: ei muutosta `sw.js`:ään.** Välimuistien nimiin ei koskettu eikä
claim-järjestystä muutettu — mittaus ei anna sille perustetta, ja
tehtävänanto kielsi turhat muutokset.

**Mikä silti parani.** Vian 3 korjaus (alla) siirtää rekisteröinnin pois
`load`in takaa, ja se näkyy suoraan tämän kokeen luvuissa: aktivoituminen
15,5–21,6 s → **10,6–13,9 s** ja offline-käynnistys 2,8–5,2 s → **1,5–2,5 s**.
Alkuperäinen 1/6-havainto oli 10,0 s varaventtiilin rajalla; nyt sama
käynnistys on 4–7 kertaa kauempana siitä rajasta.

**Jäännös.** Yhtä kuudesta ei saatu toistumaan 24 ajossa, joten sen tarkkaa
laukaisijaa ei tiedetä. Vian 4 diagnostiikka (alla) tulostaa juuri ne kolme
lukua, jotka erottaisivat tapaukset, jos se toistuu rootilla.

---

## Vika 3 — jumittunut ämpäri viivästyttää `load`ia ja koko offline-tukea

**Toistui joka ajossa.** Koko `media.matkakirja.app` jumittuvaan sokettiin,
4 ajoa ennen ja 4 jälkeen, sekä 4 + 4 vastakoetta terveellä ämpärillä.

```
ENNEN,  ämpäri jumissa   peli 0,95–1,55 s   load 45,98–46,59 s   rekisteröinti 45,98–46,59 s
JÄLKEEN,ämpäri jumissa   peli 0,95–1,15 s   load ei tullut       rekisteröinti  4,89–5,04 s
ENNEN,  ämpäri terve     peli 1,19–1,38 s   load  1,31–1,51 s    rekisteröinti  1,31–1,51 s
JÄLKEEN,ämpäri terve     peli 1,18–1,34 s   load  1,28–1,47 s    rekisteröinti  1,28–1,47 s
```

**Juurisyy.** `load` odottaa sivun jokaista alipyyntöä, myös kuvia. Kun
ämpäri ottaa yhteyden vastaan muttei vastaa, pelin omat kuvapyynnöt jäävät
roikkumaan, ja `load` laukeaa vasta noin 46 sekunnin kohdalla. Koska
palvelutyöntekijä rekisteröitiin nimenomaan `load`issa (`js/main.js`), koko
offline-tuki odotti saman ajan.

**Muutos** (`js/main.js`, palvelutyöntekijän rekisteröinti): `load` jää yhä
ensisijaiseksi, mutta rinnalle tuli mitattu katto
`REKISTEROINNIN_KATTO_MS = 4000` ja kaksoisvahti, joka takaa yhden
rekisteröinnin. Lisäksi `document.readyState === 'complete'` rekisteröi heti.

**Miksi tämä eikä kuvapyyntöjen aikakatkaisu.** Kuvapyyntöjä syntyy
kymmenissä eri kohdissa (`js/media.js`, galleriat, liput, laatat), ja katko
jokaiseen olisi iso ja riskialtis muutos, joka voisi muuttaa pelaajan
näkymää (kuva katkeaa kesken). Tässä muuttuu yksi ehto yhdessä paikassa.
Pelaajan näkymä ei muutu: peli on näkyvissä 0,95–1,15 s jumittuneellakin
ämpärillä, ja terveessä tilanteessa rekisteröinti tapahtuu yhä `load`issa
(1,28–1,47 s) — katto ei ehdi laueta kertaakaan.

**Katon perustelu numeroina.** Terve `load` 1,31–1,51 s; katto 4,0 s on
noin kolminkertainen siihen nähden, ja jää selvästi `index.html`:n 10 s
varaventtiilin alle.

**Vastakoe.** Uusi savuke ajettiin korjaamattomalla `js/main.js`:llä:

```
korjattu:      5/5 vartiota läpi   (rekisteröinti 5137 ms, tila activated)
korjaamaton:   3/5 vartiota läpi   (rekisteröinti 0 ms — ei tullut, tila "-")
```

Uusi testi `tests/sw.test.mjs`:ssä ("palvelutyöntekijä rekisteröidään myös
ilman `load`-tapahtumaa") vahtii kattoa, sen kokoa, ajastusta ja
kaksoisvahtia: korjattuna `# pass 23 # fail 0`, korjaamattomana
`# pass 22 # fail 1`.

---

## Vika 4 — tyhjä ensikehys: diagnostiikka, ei korjausta

Oire ei toistunut aiemmassakaan mittauserässä
(`docs/raportit/viesti-fable-ensikehys-20260914.md`), joten korjausta ei
tehty. `js/main.js`:ään lisättiin pelin rakentamisen jälkeen 20 rivin
diagnostiikka: **vain `console.info`, ei UI:ta, ei verkkoa, ei tallennusta**,
ja koko lohko on `try`-kääreessä, ettei se voi kaataa käynnistystä.

Mitattu tulos kahdesta peräkkäisestä latauksesta:

```
{"versio":"2026-08-09.1866","ensimaalausMs":72,"moduulitValmiitMs":1187,
 "ohjain":false,"sw":"ei rekisteröintiä","korit":[]}
{"versio":"2026-08-09.1866","ensimaalausMs":120,"moduulitValmiitMs":1264,
 "ohjain":true,"sw":"activated",
 "korit":["matkakirja-2026-08-09.1866","matkakirja-aanet-v1",
          "matkakirja-pallolaatat-v1","matkakirja-wikikuvat-v1"]}
```

Kun oire toistuu, rivistä näkee kerralla: ehtikö ensimaalaus, kauanko
moduulit veivät, oliko palvelutyöntekijä ohjaksissa ja mitkä korit laitteella
olivat. Jos riviä **ei tule lainkaan**, käynnistys ei päässyt tänne asti —
sekin on tieto.

---

## Sivuhavainnot (ei korjattu, kirjattu)

1. **`sw.js`:n kuvahaaralla ei ole aikakatkaisua.** Palvelutyöntekijän oma
   `fetch(event.request.url, { mode: 'cors' })` ämpärin kuville (`sw.js`
   fetch-käsittelijä, `kuvalahde`) voi roikkua yhtä kauan kuin sivunkin
   pyynnöt. Äänten esilatauksessa katko on (`AANI_ESILATAUS_KATKO_MS`),
   kuvilla ei. Ei kuulunut tähän erään.
2. **Mittausartefakti, ei vika:** offline-latauksen alussa mitattiin
   37–128 ms "tyhjää kehystä" ennen kuin `index.html`:n rivisisäinen
   skripti ehti näyttää latausruudun. Se on mittarin herkkyys, ei oire.
3. Vian 1 korjaus tuli #2418:sta; en koskenut `js/game.js`:ään enkä
   `js/ui.js`:ään lainkaan tässä PR:ssä.

---

## Portit

```
npm test                               (ks. alla)
node tools/tarkista-kaksoisavaimet.mjs
node tools/tarkista-niputus.mjs
PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers node tools/tarkista-savukkeet.mjs
node tools/savukkeet/savuke-rekisterointi.mjs   5/5 vartiota läpi
```

Muutetut tiedostot: `js/main.js`, `tests/sw.test.mjs`,
`tools/savukkeet/savuke-rekisterointi.mjs` (uusi), tämä raportti.
Versiota EI nostettu, muutoslokia ei koskettu, Raamattuun ei kirjoitettu.
