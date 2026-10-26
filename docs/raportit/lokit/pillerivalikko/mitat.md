# Pillerivalikko: mitat natiivia varten

Mitattu Chromiumilla (Google Chrome for Testing, Playwright) iPhone-koossa
393×852, komissio `166c1b69e` (branch `pelikoodari-pillerivalikko`).
Kaikki luvut ovat CSS-pikseleitä (device-independent pixels), samat kuin
natiivin point-yksiköt.

## Kuvat uusittu 29.9.2026 illalla, TOINEN KIERROS (omistajan jatkopyyntö)

Kaikki kuusi kuvaa ja kooste otettiin KOLMANNEN KERRAN. Ensimmäisellä
uusintakierroksella kartta jäi vielä mustaksi/tyhjäksi hiekkalaatikon
verkkokatkaisun takia — omistaja huomasi tämän ja osoitti mallia
(`tools/savukkeet/savuke-avauskortti.mjs`, `savuke-astro-taulu.mjs`).
Näiden kaava otettiin käyttöön: selain EI enää pääse itse
`media.matkakirja.app`iin (CORS), mutta NODE-PROSESSI pääsee — savuke
hakee ämpärikuvat/-laatat oikeasti Noden omalla `fetch`illä ja
relayoi ne selaimelle `route.fulfill()`illä sallivalla CORS-otsikolla.
Näin kartta, valokuvat ja pallon tekstuurit ovat OIKEITA, ei
paikallisia korvikkeita.

Reitti on myös pelin OMALLA API:lla suoraan `aloituskaupunki`-laudan
läpi: `game.actionPickStart(<kaupunki-jolla-on-links>, 0)` — sama
kutsu kuin `savuke-astro-taulu.mjs` käyttää — vie oikeasti
`maailmankartta`-laudalle (ei jää `maailma`-lähtölaudalle kuten
edellisellä kierroksella), jolloin KAIKKI linssit joilla on manner-
kohtainen data toimisivat oikein (Linssit-kuvassa näkyy silti vain
"Astronautin kamera": muut testiaineiston linssit eivät ole
pelaajalla omistuksessa tässä otoksessa, ei laudan rajoitus). Kutsu on
suora pelilogiikan funktio — EI avaa saapumiskorttia/-luentaa itse,
joten "vasta kun saapuminen on ohi" -vaatimus täyttyy ilman että
tarvitsee odottaa tai ohittaa mitään (varmuuden vuoksi silti
`dialog.close()` + jäännesiivous ennen kuvausta, ks. koodi).

Aarteet-näkymän sisältö on OIKEAA pelidataa `g.revealToken()`-kutsuilla
(sama API kuin `tools/savuke-mannerlento.mjs`): yksi tähtilaatta (Aarnin
luettelo), kaksi tavallista aarretta (Tavarat) ja kolme julistetta
(`game.julisteet`-taulu, sama Set jota `julisteVoitot()` lukee) —
KAIKKI OIKEALLA `maailmankartta`-laudalla, joten kuvat ja nimet ovat
oikeita eivätkä enää tarvitse FIN/SWE-maakoodikiertoa (edellisen
kierroksen kikka `maailma`-laudan rajoituksen takia). Aarteet-kuva
otettiin LISÄKSI esikatselu auki (1. napautus → kuva vasemmalla +
"Näytä"), kuten omistaja pyysi.

Kuvausskripti (`.scratch-shots/kuvaa-jalkeen2.mjs`, ei osa repoa):
`node .scratch-shots/kuvaa-jalkeen2.mjs <työkopio> <ulos> <etuliite>`.

## Ylärivi

| Kohde | Sijainti (x, y) | Koko (w × h) | Huom |
|---|---|---|---|
| `.topbar` (koko ylärivi) | 0, 0 | 393 × 53 | Sisältää `env(safe-area-inset-top)`-pehmusteen |
| Logo (`#brand-btn`, `.brand-kuva`) | 7, 12 | 115 × 28 | Kuvasuhde 4,09:1 (720×176 px -tiedosto); `height: 1.75rem` (28 px) puhelimella |
| Pilleri (`#turn-pill`) | 203, 0 | 186 × 52 | Korkeus = koko ylärivin korkeus (52/53 px); fonttikoko 12,48 px (0,78rem) |

**Logo ja pilleri ovat samaa korkeutta** (28 px logokuva vs. 52 px koko
pillerin rivi — pillerin OMA sisältökorkeus, pehmusteineen, on lähempänä
logon 28 px:ää; ks. huomio alla).

> HUOM logon ja pillerin korkeussuhteesta: pillerin `.turn-pill`-elementti
> venyy koko ylärivin korkuiseksi (`align-items: center` ylärivillä), mutta
> sen *sisältö* (raha + päivä, 2 riviä) on n. 28–30 px korkea — sama kuin
> logo. Jos natiivissa mitataan vain näkyvä teksti/kuva-alue, luvut
> täsmäävät; jos mitataan koko kosketusalue, pilleri on korkeampi (52 px)
> koska se kattaa koko ylärivin.

## Pillerivalikko (`#paavalikko`)

| Kohde | Arvo | Huom |
|---|---|---|
| Leveys | `min(23rem, 100vw − 1,6rem)` → **367 px** @ 393 px:n ruudulla | Kiinteä kaikilla kolmella "kasvolla" (pää, Linssit, Aarteet) — ei skaalaudu sisällön mukaan |
| Sijainti | x = 26, y = 57 | Ankkuroitu `.topbar`-elementin oikeaan sisäreunaan (`right: 0`), `top: calc(100% + 0,35rem)` |
| Enimmäiskorkeus | `calc(100dvh − 5,6rem)` | Vierittyy sisäisesti ylivuodossa (`overflow-y: auto`) |
| Rivin korkeus (nappi) | **44 px** | `.paavalikko button` -perusrivi ja `--pilleri-rivi-korkeus: 44px` (kokoelmarivit) |
| Otsikkorivin fonttikoko | 11,52 px (0,72rem) | `.kokoelma-otsikko`, kapiteelit, harmaa |
| Reunapehmuste | 0,3rem (4,8 px) | `.paavalikko { padding: 0.3rem }` |

## Linssit-/Aarteet-näkymän ruudukko (`.kokoelma-runko`) — KORJATTU 29.9.2026 illalla

**MUUTOS:** ruudukko on YKSISARAKKEINEN oletuksena (lista vie koko
paneelin leveyden), ja kaksisarakkeiseksi (esikatselu + lista) VASTA
kun jokin rivi on esikatseltu. Ennen tätä korjausta `grid-template-
columns` varasi tilan esikatselusarakkeelle AINA, vaikka
`.kokoelma-esikatselu` oli `hidden` (piilotettu lapsi ei poista
CSS Gridin TRACKIA) — Aarteet-rivit olivat siksi vain n. 150 px
leveitä ja nimet katkesivat, vaikka paneelin oikea puoli oli tyhjä.
Ratkaisu: `js/kokoelmanakyma.js` lisää luokan `.kokoelma-esikatselu-auki`
runkoon vain kun jokin rivi on esikatseltu; CSS antaa kaksisarakkeisen
`grid-template-columns`-arvon vain silloin.

| Kohde | Tila | Sijainti (x, y) | Koko (w × h) | Huom |
|---|---|---|---|---|
| Rivi (`.kokoelma-rivi`, listassa) | EI esikatselua | 39, 118 | **340 × 45** | Koko paneelin leveys (ennen: 143 px) |
| Rivin kuvake (`.kokoelma-rivi-kuvake`) | — | — | 30 × 30 | Pyöreä, `--pilleri-rivi-kuvake: 30px` |
| Rivin nimi (`.kokoelma-rivi-nimi`) | — | — | vaihtelee | Fonttikoko 13,76 px (0,86rem); rivittyy KAHDELLE riville ennen katkaisua (`-webkit-line-clamp: 2`, ennen: yksi rivi + `text-overflow: ellipsis`) |
| Rivi (esikatseltu, muuttunut toimintonapiksi) | Esikatselu auki | 192, 165 | 188 × 45 | Oikea sarake kapenee, kun vasen esikatselu vie tilaa |
| Esikatselukortti (`.kokoelma-esikatselu`) | Esikatselu auki | 39, 118 | 143 × 328 (korkeus vaihtelee) | Vasen sarake, `minmax(7.5rem, 42%)` leveä (ennallaan) |
| Esikatselukortin kuva (`.kokoelma-esikatselu-kuva`) | Esikatselu auki | 48, 127 | 125 × 125 (neliö) | `aspect-ratio: 1`, `object-fit: cover` |
| Esikatselukortin nimi (`.kokoelma-esikatselu-nimi`) | Esikatselu auki | 48, 257 | 125 × 34 | Fonttikoko 13,76 px |
| Esikatselukortin selite (`.kokoelma-esikatselu-selite`) | Esikatselu auki | 48, 297 | 125 × 90 (vaihtelee) | Fonttikoko 12,8 px (0,8rem) |
| Toimintonappi (`.kokoelma-toiminto`, "Aktivoi"/"Näytä"/"Ota pois") | Esikatselu auki | 48, 395 | 125 × 40 | `min-height: var(--pilleri-rivi-korkeus)` = 44 px |

**Sarakejako esikatselun ollessa auki:** ennallaan,
`grid-template-columns: minmax(7.5rem, 42%) minmax(0, 1fr)` (luokassa
`.kokoelma-runko.kokoelma-esikatselu-auki`). Ilman esikatselua:
`grid-template-columns: minmax(0, 1fr)` (yksi sarake).

**Otsikkorivi** (`.kokoelma-otsikko`, esim. "AARNIN LUETTELO 1 / 8")
pysyy nyt aina yhdellä rivillä: nimi typistyy `text-overflow: ellipsis`
-tyylillä ennemmin kuin rivittyy, laskuri (`.kokoelma-otsikko-luku`) ei
kutistu (`flex: 0 0 auto`) — ennen otsikko saattoi rivittyä kahdelle
riville kapeassa (~150 px) sarakkeessa.

## Täyden ruudun katselin (aarre/tavara)

`.aarre-suurennos-kuva`: `max-width: min(92vw, 720px)`, `max-height: 70vh`,
keskitetty flexillä. Sulkuympyrä (`.aarre-suurennos-sulje`) 40×40 px,
oikeassa yläkulmassa `top: calc(0.6rem + safe-area-inset-top)`.

## Animaatio

Avaus 220 ms, `cubic-bezier(0.22, 0.9, 0.24, 1)`, siirtymä + opacity;
sulku 200 ms, `cubic-bezier(0.4, 0, 1, 1)`. `prefers-reduced-motion:
reduce` poistaa liikkeen kokonaan (ks. js/pilleri-animaatio.js).

## iPad (834×1194) — vertailun vuoksi

| Kohde | Arvo |
|---|---|
| Logo | x=13, y=10, 130×32 |
| Pilleri | x=142…377 (logo ja hampurilaisen välissä, EI ruudun oikeassa laidassa) |
| Hampurilainen (`.valikko-kotelo`) | x=778, y=7, 44×36 |
| Pillerivalikon leveys | sama kaava, `min(23rem, 100vw−1,6rem)` → 368 px (rajoittava tekijä on 23rem, ei ruudun leveys) |

iPadilla asettelu säilyy näköjään ennallaan (omistajan vaatimus); vain
pillerin JA hampurilaisen avaama sisältö on uusi.
