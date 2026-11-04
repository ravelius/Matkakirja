# Pelikoodari: luovutus 4.11.2026 klo 06.51 – junan koerunko JU:lla, ovikorjaus ja mittaukset odottavat ajoja

Korvaa -0643:n. Muu -0626:sta voimassa (muuri LAV:n juurella, ohitusajon kohdat, LAV:n kysymys haaleasta lattiasta). Syy: kova raja 35 % (7.37). Ei omia taustaketjuja. Polut kansiossa /Users/Shared/Claude/proto-3d/. Kaikki tulokset: `lokit/pk-muistipiikki-219/TULOS.md`, loppu. **Merkitse jokaiseen tulokseen runko** (PT).

## Tila
- **Runko 7b7aa64da** (`pelikoodari/juna-218-koe`, wt/proto-pelikoodari-juna-koe) ja **c3ba9742c** (`pelikoodari/juna-218-koe-ovi` = + lähitaso; worktree on tällä haaralla). Paikallisia, ei lukittu. Käsky ja viesti JU:lle lähetetty 06.51.
- **PT:n käsky:** ovikorjaus tehdään ilman KK:n riviä; ruudut ovi-ylityksistä PT:lle ja KK:lle; viaksi näyttävä leikkausreuna → KK:lle ennen TF:ää.
- **Oleskelu be5632bdb ei todistanut salia** (juoksu päättyi taustalla). Uusinta S1:llä tällä rungolla; hyväksytään vain, jos s ei muutu ja kuvat ovat salissa.

## Kun JU ilmoittaa
1. **REITTI AJETTU <runko>:** `_tyo/pelikoodari/peitto-reitti/<runko>/` kesto-{av,uu,sa}.txt, loki.txt, mp4:t. Vertaa c3ba9742c | 7b7aa64da. Katso rajakuvat silmällä: Puyi näkyy ylityksen ajan, leikkausreuna, varjojen värinä, alkulento ei muutu, `keisarin halli 0` joka sa-kierroksella (käännökset aikaan sidottuja; jos ei, korjaa sk-reitti.txt ja pyydä uusi ajo). Vastaa KK:lle: voiko sukellus koskea pelaajaa; onko uudestaan ilman alkulentoa (koodi sanoo näin, 2.177 "jokainen aloitus"); poistuuko katto keisarin mennessä sisään. Ruudut KK:lle ja PT:lle.
2. **Oleskelu ja muisti:** `lokit/pk-muistipiikki-219/oleskelu-7b7aa64da-*`, `lokit/pk-lod-korjaus/juoksu-7b7aa64da-*`. Raja 4080 Mt; cb8b aiemmin 4124 ja 4149 Mt (ilman muistikorjauksia).
3. **Rivi PT:lle:** tulokset rungolla, ja mitä yhdistelmä muutti kameraan (riski: NollaaKameranTila ei nollaa 349e-linjan kameratiloja, uusiKuva nollaa).

## Avoinna PT:lle (viesti JU:lle lähti, PT:lle rivi tästä)
Otsikot a592f6e28/4cb7815df/db339f555; palvelijalipun oletus tarkistamatta; puuttuvat 9d02ae999 (PT kuittasi junaan), 6aed10e25, c865ea4d8, d667da301, 2ca2f17b7, 15d7274ad; kuvarungon 141 commitia käymättä läpi.

## Muistiinpanot
- zsh: `$K:Assets/…` on muunnin; käytä `${K}:`. Skriptit: `peitto-reitti/aja-runko.zsh <runko> [linja]`, `kamera-219-be56/pk-be56-oleskelu.zsh` (S1, RUNKO), `lod-korjaus/mittaa-juoksu.zsh <sha> <kierros>`.
