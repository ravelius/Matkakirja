# Viesti Fablelle — Astronautin kameran valokuvanäkymä uusiksi 2 (kohdat 1–7 + LISÄYS 3)

**Opus-työagentti, 16.9.2026.** Haara
`claude/bold-ride-vow4ki-astro-valokuva2`, pohjana `origin/main`
(v1917). Toimeksianto: Raamatun osio **ASTRONAUTIN KAMERA:
VALOKUVANÄKYMÄ UUSIKSI 2**, kohdat 1–7 (valokuvanäkymä ja yläpalkki).
Pallonäkymän ISS ja auringon sivuvalo (kohdat 11–13) ovat toisella
agentilla; en koskenut `js/linssit/satelliitti-avaruus.js`:ään.

**Lyhyesti:** valokuvanäkymän pinnat on nyt **kiinnitetty ruutuun, ei
kuvaelementtiin**. Se on koko erän juurikorjaus: 15.9. mitattiin
napit ja pienoiskuvat *kuvan* piirtoalueen reunaan
(`--satelliitti-kuva-marginaali-x/-y`), ja juuri siksi ne kelluivat
iPadilla keskellä ruutua, kun kuva ei kattanut koko alaa. Mittauskoneisto
on poistettu kokonaan; kulmat ovat kiinteitä sisennyksiä siitä
laatikosta, joka alkaa yläpalkin mitatusta alareunasta.

---

## 1. Mitä muuttui

| # | Tilaus | Toteutus |
|---|--------|----------|
| 1 | i-nappi pois, nimi + selite kuvan päällä vasemmassa yläkulmassa | `.satelliitti-selite` (otsikkorivi `kohde — seutu` + otoksen kuvateksti), `left: 12px; top: 10px` ruudusta, kuultava tumma pohja |
| 2 | Lisätiedot väkäsen taakse | `.satelliitti-lisatiedot` (Aineisto, Kuvausaika, Paikka, Kuvaustapa, Kuvatunnus, Lisenssi, Lähde, Kuvakirjasto) piilossa; väkänen selitteen oikeassa alakulmassa avaa ne **saman laatikon sisään** ja kääntyy ylös |
| 3 | Selitetekstin napautus kelaa | `.satelliitti-selite-runko` kelautuu `max-height`-siirtymällä **250 ms**; otsikkorivi on rungon ULKOPUOLELLA, joten se jää aina näkyviin. Väkäsen napautus pysäyttää kuplinnan eikä siis kelaa tekstiä |
| 4 | Yläpalkin X → hampurilainen | `.satelliittipalkki-hampurilainen` (kolme viivaa); valikko aukeaa napin alle, kohdat **"Äänet pois/päällä"** ja **"Poistu linssistä"** (sama toiminto kuin entinen ✕) |
| 5 | Kuvan ✕ ruudun oikeaan yläkulmaan, harmaana | `.satelliitti-kulma` `right: 12px; top: 10px`; nappi pyöreä (999px) ja **puhtaan harmaa**: teksti `rgb(224,224,224)`, tausta `rgba(130,130,130,.42)`, reuna `rgb(170,170,170)` — jokaisessa r = g = b |
| 6 | Pienoiskuvat kelluvat vasempaan alakulmaan | `.satelliitti-nauha` `left: 12px; bottom: 12px + safe-area`; `max-width: 50%`, eli **oikea alakulma jää vapaaksi minipululle** (Codexin työ) |
| 7 | Yläpalkki: pilleri pois, kaksirivinen nimi + ikoni | Pilleri ja i-nappi poistettu koodista ja tyylistä; palkissa on `ikoni + ASTRONAUTIN / KAMERA` vasemmassa reunassa, NASA-rivi ja hampurilainen. Ikoni on **sama merkkijono kuin matkalaukussa** (uusi vakio `LINSSIN_IKONI`, jota myös `LINSSI.ikoni` lukee) |

**NASA-rivi säilyi**: se näkyy kartalla ilman kuvaa ja väistyy kuvan
ajaksi (`nimeaKohde` kertoo palkille enää vain, onko kuva auki).

**Äänikytkin**: linssillä ei ole vielä omaa ääntä (avaruusambienssi on
tilattu Codexilta), joten kytkin **tallentaa valinnan** samalla kaavalla
kuin musiikkivalitsin: `localStorage`, avain `matkakirja-linssiaani`,
oletus päällä, luku try/catchin takana. Tuleva taustaääni lukee sen
käynnistyessään (`linssiAaniPaalla()`).

---

## 2. Mitatut luvut (savuke, selite auki)

Palkin alareuna on `palkinAla`; selite ja ✕ alkavat siitä.

| Ruutu | Palkin ala | Selitteen vasen yläkulma | ✕ (oikea reuna, ylä) | Pienoiskuvat (vasen, ala) |
|-------|-----------|--------------------------|----------------------|---------------------------|
| 1400 × 900 | 68 | **x = 12, y = 78** | oikea 1388 (ikkuna 1400), y 78 | x = 12, ala 888 (ikkuna 900) |
| 390 × 844 | 65 | **x = 12, y = 75** | oikea 378 (ikkuna 390), y 75 | x = 12, ala 832 |
| iPad 1024 × 1366 | 72 | **x = 12, y = 82** | oikea 1012 (ikkuna 1024), y 82 | x = 12, ala 1354 |

Selitteen leveys: 560 px työpöydällä (= 40 % ruudusta, katto 46 %),
366 px puhelimella (= 100 % − 24 px), 471 px iPadilla.

**Kuva, joka ei kata koko ruutua** (kuva kutistettu 45 %:iin): kuva
1248 × 832 → 562 × 374 työpöydällä, ja selite (12, 78), ✕ (1388, 78) ja
pienoiskuvat (12, 888) **eivät liikkuneet pikseliäkään**. Sama iPadilla
ja puhelimella. Tämä on se vika, jonka omistaja näki.

---

## 3. Vartiot

**Uusi savuke** `tools/savukkeet/savuke-astro-valokuva.mjs`
(1400 × 900, 390 × 844, iPad 1024 × 1366) — **15/15 läpi jokaisessa**:
selitteen kulma ≤ 16 px, ✕ pyöreä ja harmaa oikeassa yläkulmassa palkin
alla, pienoiskuvat ≤ 16 px vasemmasta alakulmasta, kutistettu kuva ei
siirrä mitään, väkänen avaa lisätiedot kelaamatta selitettä, tekstin
napautus kelaa ja toinen avaa takaisin, hampurilaisen valikossa kaksi
kohtaa, i-nappia ja pilleriä ei ole DOMissa.

**Vastakokeet** (mittari ei voi mennä läpi vahingossa): lähtötila
mitataan ennen jokaista napautusta (lisätiedot piilossa, selite auki);
harmaustestin ajetaan myös linssin vihreällä `#5dffa8`, jonka sen on
hylättävä; kulmamitta ajetaan tahallaan väärällä reunalla. Kelaus- ja
avausväitteet odottavat **mitattavaa tulosta** (`waitForFunction`)
eivätkä kelloa — kuormitetussa kontissa kiinteä odotus mittasi
siirtymän puolivälistä.

**Sisarsavuke** `savuke-satelliittilinssi.mjs` päivitetty samaan
asetteluun: `NAKYMAT=tyopoyta` → **35/35 läpi** (aiemmin 34; yksi väite
jakautui kahdeksi, kun ✕:n ja selitteen mitat erotettiin).

**Yksikkötestit**: `tests/satelliitti.test.mjs` 49/49 (uusia:
hampurilainen ja kaksi valikkokohtaa, tunnus/ikoni, harmaa ✕, selite ja
väkänen, lisätiedot, ääniasetus). `node --test tests/satelliitti*.test.mjs
tests/rules.test.mjs tests/dokumentit.test.mjs` → **420/420, 0 fail**.
`node --check` puhdas.

---

## 4. Kuvat

- `docs/raportit/kuvat/astro-valokuva2-1400-20260916.jpg`
- `docs/raportit/kuvat/astro-valokuva2-390-20260916.jpg`
- `docs/raportit/kuvat/astro-valokuva2-ipad-20260916.jpg`

Kaikki kolme ovat valokuvanäkymä selite auki (Saharan silmä), alle
200 kt.

---

## 5. Mitä EI tehty

- Pallonäkymä (ISS, terävämpi topografia, auringon sivuvalo) — toinen
  agentti.
- Avaruusaiheinen taustaääni, minipulu oikeaan alakulmaan ja kaksi
  valmista kysymystä kohdetta kohti — Codexin postilaatikko. Nauhan
  `max-width: 50%` jättää oikean alakulman vapaaksi pululle.
- Ei versionostoa, ei PR:ää, ei Raamatun muokkausta.


---

# LISÄYS 3 — koko yläpalkki pois (sama haara, myöhemmin 16.9.2026)

Omistaja (sanatarkasti): *"Astronauttilinssistä voisi ottaa koko
yläpalkin pois, niin että oikeassa yläkulmassa on pelkkä hampurilainen
ja kaikki muut yläpalkin jutut pois, koska ne eivät tuo mitään lisää,
vievät vain tilaa."*

## 1. Mitä muuttui

| Tilaus | Toteutus |
|--------|----------|
| Yläpalkki pois kokonaan (pallo- ja valokuvanäkymä) | `rakennaPalkki` → **`rakennaValikko`**: linssi ei rakenna palkkia lainkaan. Poistuivat linssin ikoni + kaksirivinen nimi ja NASA-rivi; koko `.satelliittipalkki*`-tyylisarja on poistettu CSS:stä. Matkakirjan oma palkki pysyy piilossa (`aikajana-palkki-auki`), eikä `--aikajana-palkki-korkeus`-muuttujaa enää kirjoiteta |
| Vain hampurilainen oikeassa yläkulmassa | `.satelliitti-valikkokehys` on `position: fixed`, `top: calc(10px + env(safe-area-inset-top))`, `right: calc(12px + env(safe-area-inset-right))`. Kehys menee **bodyyn**, ei karttaruutuun: karttaruudun transform tekisi siitä fixedin sisältävän lohkon |
| Selite ja harmaa ✕ ruudun yläreunaan | Molemmat lukevat samaa `--satelliitti-yla`-muuttujaa (10 px + turva-alue); selite myös `env(safe-area-inset-left)` |
| Kuva ja pallo saavat palkin tilan | `.satelliitti-katselu` alkaa nyt `top: 0`; palkin alareunan mittaus (`asemoiYlareuna`, `paivitaAsemointi`, ResizeObserver, orientationchange) **poistettu kokonaan** — mitattavaa ei ole |

**NASA-rivi** (aineiston lähde) ei kadonnut: aineisto ja lisenssi
luetaan valokuvan selitteen lisätiedoista (väkäsen takaa).

## 2. Mitattu päätös: ✕ on hampurilaisen VASEMMALLA puolella

Valikko aukeaa hampurilaisen **alle** (11 rem leveä, kaksi kohtaa), joten
✕ sen alapuolella jäisi auki olevan valikon peittoon juuri silloin, kun
valikkoa käytetään. Samalla rivillä vasemmalla ne eivät voi leikata
toisiaan: molemmat lukevat samaa `--satelliitti-nappi`-kokoa ja samaa
yläreunaa, ja ✕:n oikea reuna on napin leveyden + 10 px:n päässä.
Savuke mittaa sekä laatikoiden erillisyyden että sen, ettei **auki
oleva valikko** osu ✕:ään (`peittaaSulun: false`).

## 3. Mitatut luvut (selite auki, LISÄYS 3 jälkeen)

| Ruutu | Kortti | Selite | ✕ | Hampurilainen | Pienoiskuvat |
|-------|--------|--------|---|---------------|--------------|
| 1400 × 900 | 0, 0 – 1400 × 900 | 12, 10 | 1311–1344, 10 (34 × 34) | 1354–1388, 10 | 12, ala 888 |
| 390 × 844 | 0, 0 – 390 × 844 | 12, 10 (leveys 279) | 291–330, 10 (38 × 38) | 348–378, 10 | 12, ala 832 |
| iPad 1024 × 1366 | 0, 0 – 1024 × 1366 | 12, 10 (leveys 471) | 935–968, 10 (34 × 34) | 978–1012, 10 | 12, ala 1354 |

**Pyöreä on pyöreä:** pelin oma nappisääntö antaa kaikille napeille
44 px:n `min-height`in, ja se venytti kulmanapit soikeiksi (mitattu
390 × 844: ✕ oli 30 × 46 px). Kulmanapit nollaavat min-mitat ja
lukitsevat `aspect-ratio: 1`; kosketusalue säilyy kasvattamalla nappia
kapealla ruudulla (2,4 rem ≈ 38 px) eikä pienentämällä.

**Kapean ruudun selite** ei mene nappien alle: leveys on
`100 % − 24 px − 2 × nappi − 26 px` = 279 px (390 px:n ruudulla), ja
✕ alkaa vasta 291 px:stä.

## 4. Vartiot LISÄYS 3:n jälkeen

- `savuke-astro-valokuva.mjs`: **18/18 läpi** kaikissa kolmessa
  ruudussa (uudet väitteet: palkkia ei ole DOMissa ja kortti täyttää
  ruudun; ✕ ja hampurilainen eivät leikkaa; selite ei mene nappien
  alle; auki oleva valikko ei peitä ✕:ää).
- `savuke-satelliittilinssi.mjs NAKYMAT=tyopoyta`: **34/34 läpi**
  (väite 2 mittaa nyt palkin PUUTTUMISEN, kelluvan hampurilaisen
  paikan ja sen, että kartta saa koko ruudun korkeuden).
- `node --test tests/satelliitti*.test.mjs tests/rules.test.mjs
  tests/dokumentit.test.mjs`: **417/417, 0 fail**.

## 5. Pallonäkymä: EI muutoksia satelliitti-avaruus.js:ään

Pallon kotelon sovitus (`sovita`) ajetaan uudestaan jokaisesta kotelon
koon muutoksesta, joten palkin poistuminen kasvattaa koteloa ja avaus-
korkeus lasketaan automaattisesti uudelleen. Tiedostoon ei siis tarvinnut
koskea — merge astro-pallo-haaran kanssa on puhdas. (Tiedoston
kommentissa rivillä ~991 mainitaan yhä "linssin oma yläpalkki";
sen voi siivota se agentti, joka tiedostoa muokkaa.)

Kuvat kirjoitettu yli samoihin polkuihin (valokuvanäkymä selite auki,
ilman yläpalkkia).
