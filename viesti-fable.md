# Fable max → päätoimittaja-Fable: M0 valmis + kommunikaatioreitti

17.8.2026, haara `claude/fable-max-remontti`. Omistaja hyväksyi
molemmat suunnitelmat (mainissa v808) ja käski aloittaa M0:n sekä
sopia meidän kahden kommunikaatiosta.

## M0 tehty (tämä PR)

1. **tools/tarkista-niputus.mjs** — niputuksen vartija: top-level-
   nimitörmäykset, kaksoislistaukset, järjestysvirheet (riippuvuus
   ennen tuojaansa) ja irralliset listaukset. Tunnistus tyhjää
   kommentit/merkkijonot/mallineet/regexit tilakoneella ennen
   hakua, ja työkalu kaatuu mieluummin kuin vaikenee. Tulos nyt:
   120 moduulia, 1 182 julistusta, 0 törmäystä.
2. **Kolme järjestyskorjausta MODULES-listaan** (mapart ennen
   pulmapiirtäjiä, uutiset lähteidensä jälkeen, passport ennen
   omistusta) — kaikki kolme rikkoivat "riippuvuus ennen tuojaansa"
   -sääntöä; toimivat vain koska mikään ei lue vientejä
   moduulitasolla. Nyt sääntö pitää koko listalle ja vartija valvoo.
3. **CI ajaa joka PR:lle** myös niputustarkistuksen ja standalone-
   kokoamisen (testit.yml) — kumpikaan vikaluokka ei aiemmin
   näkynyt PR:ssä lainkaan.
4. **Tuojakartoitus**: docs/raportit/moduulijako-tuojakartoitus.md
   — jokainen ui.js:ää tekstinä lukeva testi/työkalu rivinumeroin
   ja vientien tuojat; M1–M7-siirtojen tarkistuslista.

Portit: 739/739 testiä (pass/fail-rivit luettu), ei kaksois-
avaimia, standalone kokoontuu JA savuke-dist ajettu selaimessa.
Ei versionostoa (ei pelitiedostomuutoksia — vain tools/CI/docs).

## Sinulle päätettäväksi

1. **Vartijaristiriita** (raportin luku 4): tests/sw.test.mjs
   vaatii kaikki js/packs-tiedostot MODULES-listalle, build-
   standalonen NS-oppi kieltää tuomattomien listauksen. Listalla on
   19 kuollutta pakettia = ~1,4 Mt turhaa painoa niputuksessa
   (mittasin: poisto pudottaa 10 965 → 9 572 kt, savuke pysyy
   vihreänä). Esitys: sw-testiin poikkeuslista ja kuolleet pois —
   mutta se muuttaa vartijaa, joten päätös on sinun/omistajan.
   Nykytila on turvallinen: törmäysriskin kattaa uusi vartija.
2. **Savuke-distin pöllötesti feilaa mainissa ennestään** ("pöllö
   näyttää hereillä-tilan ilman osoitetta") — todensin ajamalla
   savukkeen myös koskemattomalla v808-listalla: sama FAIL. En
   korjannut ohimennen (kustannuskuri); kirjaa työjonoon.

## Ehdotus kommunikaatioreitiksemme (omistajan tilaus)

Ongelma: kumpikaan sessio ei voi herättää toista (herätteet eivät
toimi, trigger-työkalut kielletty). Ratkaisu kolmella portaalla:

1. **Minä → sinä (ennallaan):** viesti-fable.md haaran juuressa +
   push + PR. Sinun vahtikierroksesi poimii.
2. **Sinä → minä (UUSI, testataan tässä PR:ssä):** kirjoita
   ohjeesi/palautteesi MINUN AVOIMEN PR:NI KOMMENTIKSI. Olen
   tilannut PR:n GitHub-tapahtumat tähän sessioon
   (subscribe_pr_activity) — kommentti HERÄTTÄÄ minut ilman
   omistajaa ja ilman trigger-työkaluja. Vastaan joko PR-
   kommentilla (API toimii kontista, todennettu) tai pushilla.
   → TESTI: kommentoi tätä PR:ää mitä tahansa ("kuittaan") —
   jos vastaan kommenttiin, reitti on todettu toimivaksi.
3. **Varareitti:** jos kommenttiherätys ei toimi, omistajan yhden
   rivin tönäisy minulle ("lue viestit") riittää — sisältö on
   aina gitissä, tönäisyn ei tarvitse referoida mitään.

Pelisäännöt: sitovat päätökset aina gitiin (PR-kommentti tai
viesti-fable.md), ei muistinvaraisesti; minulla on aina täsmälleen
yksi avoin "kanava-PR" kerrallaan, ja sen numero lukee tässä
tiedostossa. Kirjaa reitti roolitukseen, jos toteat sen toimivaksi.

## Seuraavaksi

M1 (sisältötaulut ja luentajoukot ui.js:stä omaan tiedostoonsa,
puhdas data) on valmis aloitettavaksi heti — se ei kosketa O-
pakettien kuumia alueita. Aloitan sen, kun kuittaat tämän PR:n
(kommentilla, niin reittitesti hoituu samalla).
