# Viesti Fablelle: astro-äänen väite 3 — juurisyy ja mittarin korjaus (19.9.2026)

Opus-agentti, haara `claude/bold-ride-vow4ki-astro-aani-mittari`.
Erä alkoi klo 10.09, päättyi klo 10.35 Suomen aikaa.

## Lyhyesti

Väite 3 (*"kohteen ja kuvan vaihto ei luo uutta soitinta eikä nollaa
feidiä"*) ei häilynyt äänen takia. **Pelissä ei ole vikaa** — humina
pysyi joka ajossa samana oliona samalla `startedAt`-hetkellä.
Häilynnän aiheutti MITTARI: se laski sivun kaikki `createBufferSource`-
kutsut, ja kohteenvaihdon ~2,7 sekunnin ikkunaan osui hitaassa ajossa
lyhyt lähde muualta pelistä. Mittari mittaa nyt sitä mitä väite
tarkoittaa. `js/`-puuhun ei koskettu.

## 1. Juurisyy

**VARMA osa.** Kaatuneissa CI-ajoissa (35423483607, 35425678571,
35427542597) `lahteitaEnnen` oli 7 ja `jalkeen` 8, `kuvia` 4 ja humina
soi tasolla 0,26 = tavoite. Samassa ajossa vastakoe *"pitkiä soittimia
on täsmälleen yksi (humina)"* oli VIHREÄ. Kahdeksas lähde ei siis ollut
humina eikä musiikki, vaan **lyhyt (< 60 s) kertalähde muualta
sivulta**, joka syntyi vaihdon ikkunassa. Väite kaatui asiaan, jota se
ei väitä.

**MITATTU osa (uusi kirjanpito).** Laajensin savukkeen vahtia niin,
että jokaisesta lähteestä tallentuu myös puskurin kesto, luontihetki ja
luontipaikan pino. Kahdessa rinnakkaisessa puhelinajossa (kuorma,
portit 8860 ja 8861) sivun **jokainen** lyhyt lähde tuli samaa reittiä:

| puskuri | pino |
|---|---|
| 1,20 s | `Sound.playSlice` (js/sound.js:1263) ← `paper` (js/sound.js:1527) |
| 1,20 s | `Sound.playSlice` ← `kupla` (js/sound.js:1547) |
| 0,55 s ja 0,28 s ×4 | `Sound.playSlice` ← `REAL_PLAYERS.<computed>` (js/sound.js:1612) = `PULUN_TEHOSTEET` |
| 84 s | `kaynnista` (js/linssit/satelliitti-aani.js:278) — humina, ainoa pitkä |

Eli kaikki lyhyet ovat **Livian avaussarjan kupla- ja pulutehosteita**
(`js/livia.js` `LIVIAN_TEHOSTEET` ja `soitaLivianTehoste`, kuplaäänet
`paper`/`kupla`). Sarja etenee ketjutetuilla ajastimilla
(`js/livia.js` `seuraavaRepliikki` → `setTimeout(…, KUPLIEN_VALI)`,
jonka päälle tulee kunkin repliikin lukuaika), joten se ei ole sidottu
mihinkään kiinteään hetkeen: **kuormassa ketju valuu eteenpäin**.
Nopeassa ajossa sarjan viimeinen ääni kuultiin AudioContextin ajassa
8,4 s ja väitteen 3 ikkuna alkoi vasta 14,5 s — ikkuna oli tyhjä.
Hitaassa CI-ajossa ketjun viimeinen ääni ehtii ikkunaan, ja laskuri
näyttää 7 → 8.

**EPÄVARMA osa.** En saanut 7 → 8:aa toistettua kahdella yrityksellä
(kaksi rinnakkaista puhelinajoa: molemmat 12/12, `lyhyita: 0`), joten
kahdeksannen lähteen **täsmällinen** kutsupaikka jää päättelyksi
koodista ja pinoista. Mekanismi (lyhyt `playSlice`-lähde ajastetusta
UI-äänestä osuu ikkunaan) on varma; se, että juuri Livian avaussarja on
se ajastin, on hyvin todennäköinen mutta ei mitattu. Ratkaisun kannalta
ero ei ole tärkeä: mittari ei enää välitä siitä, kuka lyhyen lähteen
teki — se kirjaa sen pinoineen lokiin.

Kaksi ehdokasta on mittauksella **suljettu pois**: pelin syntetisoitu
äänimaisema (`js/sound.js` `scheduleAmbienceEvent`, 8–30 s:n
satunnaisväli) ei ole tässä näkymässä päällä lainkaan — yhtään
`ambienceBed`-lähdettä ei synny — eikä `js/puhe.js` tai
`js/linssit/viritin.js` luo tässä ajossa yhtään lähdettä.

## 2. Muutokset (vain `tools/savukkeet/savuke-astro-aani.mjs`)

1. **Väite 3 mittaa huminasoitinta, ei sivun kaikkia lähteitä.**
   Verrataan nyt kolmea asiaa ennen ja jälkeen vaihdon: pitkien
   silmukoitujen lähteiden määrä (≥ 60 s puskuri) on 1 ja sama,
   `pitkat.at(-1).solmu` on **täsmälleen sama olio**, ja sen
   `startedAt` ei ole muuttunut. Tämä on sama todistustapa kuin
   väitteessä 2. Humina-tason ja kuvien vaihtumisen tarkistukset
   säilyivät ennallaan.
2. **Lyhyet lähteet kirjataan, eivät kaada.** Jos vaihdon ikkunassa
   syntyi muita lähteitä, savuke tulostaa
   `INFO: vaihdon ikkunassa syntyi N muuta lähdettä (ei kaada
   väitettä): […]` ja listaa kunkin keston, puskurin ja pinon.
3. **Kirjanpito laajennettu:** jokaisesta lähteestä tallentuu nyt myös
   `puskuri` (kesto luettuna solmusta, joten myös aloittamaton lähde
   paljastaa pituutensa), `luotu` (AudioContextin aika) ja `pino`
   (`new Error().stack` kolme ensimmäistä riviä).
4. **`PORTTI`-ympäristömuuttuja** (oletus 8759, kuten ennen), jotta
   kaksi ajoa mahtuu samalle koneelle rinnakkain. Sama käytäntö kuin
   muissa savukkeissa; `aja-sarja.mjs` antaa portin valmiiksi.

Pelikoodiin ei tarvinnut koskea: `js/linssit/satelliitti-aani.js` on
ennallaan.

## 3. Mittaustulokset

| ajo | näkymä | tulos |
|---|---|---|
| kuorma A (portti 8860, rinnan B:n kanssa) | puhelin 390 px | **12/12**, `lyhyita: 0`, `kaikkiLahteita [7, 7]` |
| kuorma B (portti 8861, rinnan A:n kanssa) | puhelin 390 px | **12/12**, `lyhyita: 0`, `kaikkiLahteita [7, 7]` |
| varsinainen ajo (portti 8870, yksin) | työpöytä + puhelin | **24/24** |

Väite 3 varsinaisessa ajossa (puhelin):
`{"huminaEnnen":{"pitkia":1,"alkoi":10.8027},"huminaJalkeen":
{"pitkia":1,"alkoi":10.8027,"samaSoitin":true,"lyhyita":0},
"startSailyi":true,"kuvia":4,"kaikkiLahteita":[7,7]}`

Ympäristö: `SAVUKE_CHROMIUM_LIPUT="--disable-features=AudioServiceOutOfProcess"`
(sarjat.jsonin rivi), Node 22.23.2, Playwright Chromium 1234, Mac Studio.

`node --test tests/*.test.mjs`: **# pass 3650, # fail 0**, skipped 13
(3663 testiä, 79 s).

## 4. Mitä EI tehty

Ei PR:ää, ei versionostoa, ei Raamattu-muutoksia (tehtävänannon mukaan).
Häilyvää ei ajettu uudestaan kuin kerran (Raamattu, TARKENNUS 3 kohta 7).

## 5. Ehdotus Fablelle

Sama vika on todennäköisesti muissakin äänisavukkeissa, jotka vertaavat
`createBufferSource`-kokonaislukua ennen/jälkeen. Jos sellaisia on,
sama korjaus (vertaa soitinoliota ja `startedAt`ia, kirjaa muut lokiin)
poistaa niistä saman häilynnän.
