# Viesti Fablelle: astro-pallon liuku, kohdepiste ja kehyksen TRANSFORM-mittaus (17.9.2026)

Opus-agentti, haara `claude/bold-ride-vow4ki-mac-liuku` origin/mainin
päältä. Aikakatto 45 min. Muutokset ovat VAIN kahdessa savukkeessa —
pelikoodiin (js/, css/) ei koskettu, joten **versionostoa ei tarvita**.

## Yhteenveto (Mac Studio, Chrome for Testing 1234, yksi ajo per savuke)

| Savuke | Ennen | Jälkeen |
| --- | --- | --- |
| savuke-astro-pallo (tyopoyta + puhelin) | 100/102 | **101/102** |
| savuke-ihmisen-kehys (390px) | 10/11 | **11/11** |

`node --test tests/*.test.mjs`: **# pass 3572, # fail 0** (3585 testiä,
13 ohitettua).

## 1. "pyöriminen loppuu, kun pelaaja tarttuu palloon" — KORJATTU

**Pelikoodi on kunnossa.** `js/pallo.js` vaimentaa liu'un
AIKASIDONNAISESTI: `vaimennus = Math.exp(-VAUHTI_KITKA * dt)`, jossa dt
on millisekunteina (`Math.min(50, nyt - edellinen)`). Kehysluku ei siis
muuta liu'un kestoa — tuntuma iPhonella on sama 60 ja 120 hertsillä.
Peliin ei koskettu.

**Juurisyy on savukkeen kiinteä 2 s.** Liu'un PITUUS riippuu
alkunopeudesta, ja se syntyy vedon näytevälistä: `pointermove`-parin
väli on `dt = Math.max(1, aika - vauhti.aika)`, ja Playwrightin
`mouse.move` lähtee Macilla peräkkäisinä millisekunteina. Astetta/ms on
siis moninkertainen kontin hitaaseen vetoon verrattuna, ja matka
kynnykseen (0,0006 °/ms) on logaritminen — kymmenkertainen alkunopeus =
noin 820 ms lisää liukua.

Mitatut luvut korjatusta savukkeesta (kehysluku **73 fps**):

| Näkymä | liuku loppui (`vauhti.raf` = 0) | pallo levossa | jäännös 2 s:ssa |
| --- | --- | --- | --- |
| tyopoyta | 1 684 ms | 2 299 ms | **0,000°** |
| puhelin | 2 105 ms | 2 680 ms | **0,000°** |

Molemmat ylittävät vanhan 2 000 ms:n odotuksen — juuri siksi mittari
luki liu'un loppuhäntää (0,088–0,161° / 2 s).

**Korjaus (vain savuke):** kiinteän `waitForTimeout(2000)` tilalle
tilan odotus — `vauhti.raf` on nolla JA pituuspiiri on pysynyt 300 ms:n
ikkunassa hitaampana kuin väitteen oma raja (0,05° / 2 s skaalattuna
ikkunaan). Katto 20 s. Ehto on sama 60 ja 120 hertsillä. Väitteeseen
lisättiin `lepo.rauhoittui !== null`, eli rauhoittumatta jäänyt pallo on
punainen — väite ei siis löystynyt, vaan tiukkeni.

Sekä väite että sen VASTAKOE ovat nyt vihreitä molemmissa näkymissä.

## 2. "kohdepiste on yhä klikattavissa" — MITTAUS TILAPOHJAISEKSI, tyopoyta yhä punainen

Väite mittaa, että varjokalvo on merkkikerroksen ALLA ja
`pointer-events: none`, eli napautus menee kalvon läpi ja avaa
kohteen katselun.

**Korjaus:** kiinteä `waitForTimeout(2500)` napautuksen jälkeen
korvattiin `waitForFunction`illa (katto 30 s), joka odottaa katselun
DOMiin. Juuri tuo kiinteä odotus selittää Actions-ajon 35228371442
(6 savuketta rinnakkain Macilla) tyhjän `jälkeen []`. Lisäksi väitteen
viestiin kirjataan osumadiagnoosi (`elementFromPoint`, kalvon
`pointer-events`).

**Uusi löydös, jää punaiseksi:** diagnoosi kertoo, että napautuspisteen
päällimmäinen elementti on **CANVAS** kummassakin näkymässä
(`kalvonTapahtumat: "none"` — kalvo ei siis ole este). Napautus menee
globe.gl:n omaan säteenjäljitykseen. Puhelimella piste oli 57 px
pallon keskiöstä ja katselu aukesi (`jälkeen [satelliitti-katselu]`);
työpöydällä lähin piste oli 139 px keskiöstä eikä säde osunut.
Kyse ei siis ole kalvosta eikä odotusajasta vaan siitä, miten merkin
DOM-laatikon keskipiste osuu 3D-pisteeseen kaukana keskiöstä. Se on oma
eränsä (savukkeen pistevalinta tai pelin osumasäde) — aikakaton takia
en korjannut sitä arvaamalla.

## 3. "390px: kehyksen paluu on TRANSFORM-liuku molemmille palkeille" — KORJATTU

**Juurisyy löytyi mittaamalla.** Lisäsin kierroksen tulokseen
`kohteet`-diagnoosin (löytyikö palkki, `display`, voimassa oleva
`transition-property` ja `-duration`). Punaisessa ajossa se luki:

```
saanto: "opacity", kesto: "2.6s"
```

eli voimassa EI ollut `css/linssikehys.css`:n
`transition: transform var(--kehys-liuku) …` vaan aikajanan oma
`transition: opacity var(--avaruuden-feidi, 2600ms)`
(`css/aikajana.css:2250`). Transform-siirtymää ei siis syntynyt
lainkaan — siitä tyhjä `kaynnissa: []`.

Syy: `js/linssit/ihmisen-matka-esitys.js` `paljastaKehys` purkaa
`kehys-liukuu`-luokan VASTA AJASTIMESTA
(`KEHYKSEN_LIUKU_MS + feidi + 100 ms` ≈ 2,7 s paluun alusta). Kun
näytesarjan katto nostettiin 80 → 200 (PR #2558), mittauskierros alkaa
juuri feidauksen päätyttyä — ajastin oli yhä kesken ja poisti luokan
kesken kierroksen 500 ms:n odotuksen, siis juuri ennen laukaisua.
Vastakoe (0 ms) ajetaan sekunteja myöhemmin, jolloin ajastin on jo
lauennut; siksi se pysyi vihreänä ja harhautti.

**Korjaus (vain savuke, kolme osaa):**

1. **Ohjaajan purku odotetaan loppuun:** luokka on poissa kolmella
   peräkkäisellä kehyksellä ennen kuin kierros aseistaa siirtymän.
2. **Varmistus ennen laukaisua:** molempien palkkien voimassa oleva
   `transition-property` sisältää `transform`; muuten luokka lisätään
   takaisin (katto 60 kehystä). `aseistuksia` kirjataan viestiin —
   korjatussa ajossa se oli **0**, eli kohta 1 riitti.
3. **Siirtymä napataan syntyhetkellä:** `transitionrun`/
   `transitionstart` -kuuntelijat asetetaan ENNEN luokan purkua ja
   lukevat elementin omat siirtymäoliot juuri silloin; rAF-silmukka
   (60 kehystä) jää varalle. Palkit haetaan lisäksi samalla
   valitsimella kuin CSS:ssä (`.aikajana .aikajana-ylarivi`).

PR #2558:n ikkunan pidennys (200 näytettä) säilyi koskemattomana.

Korjattu ajo:

```
kaynnissa: [{ylapalkki, transform, 10000}, {alapalkki, transform, 10000}]
kohteet:   saanto "transform, opacity", kesto "10s, 2.6s"
VASTAKOE (0 ms): kaynnissa [], saanto "transform, opacity", kesto "0s, 2.6s"
```

Väite ja sen vastakoe ovat molemmat vihreitä. Yhtään toleranssia ei
löysennetty.

## Oletukset

- Pelikoodiin ei kosketa: molemmat juurisyyt olivat savukkeissa
  (kiinteä kello vs. tila). Kohdan 3 juurisyy on pelin ajastin, mutta
  se on pelin OIKEA käytös — mittauksen on odotettava sitä, ei
  toisinpäin.
- Kohdan 2 työpöytäpunainen jätettiin korjaamatta: se on eri juuri
  (3D-säteen osuma kaukana keskiöstä) kuin tehtävänannon
  kuormahypoteesi, ja arvaava korjaus olisi vaatinut useamman
  mittauskierroksen kuin aikakatto salli.
- `sarjat.json`, Raamattu ja muut savukkeet ovat koskemattomia.
- Yksi kohdemittaus per savuke; kehys-savuke ajettiin kahdesti
  (ensimmäinen ajo oli diagnoosikierros, joka tuotti `kohteet`-luvun).
