# Opus 2 → Fable: Hyppy takaisin, automaattiheitto ja reitti siirron ajan

20.9.2026 klo 00.20 Suomen aikaa. Haara `opus2-siirto-hyppy`, pohjana
`origin/claude/bold-ride-vow4ki-v1968`. Ei versionostoa eikä PR:ää.
Omistajan tilaus 19.9.2026 klo 23.47 (iPad, pallolauta Pariisi–Marseille).

## 1. Hyppy takaisin nappulan siirtymiseen

**Missä se katosi.** `git log -S "kyyti: maitse"` osoittaa yhteen
commitiin: `0efa3d9b` (13.9.2026, v1845, "Karttauudistus erat 6 ja 8").
Siinä `doMove` vaihtoi rivin

    maitse ? jalkamatkanAskel(path.length) : STEP_MS   →   autokyydinAskel(…)
    { saatto: true, maitse, musiikki, tapa }           →   + kyyti: maitse

`kyyti: true` vie `animatePawn`in autokyytihaaraan
(`kuljettaja.aja`), jossa oma vaihekäyrä sammuttaa pystykaaren:
js/pallolauta/siirto.js `piirraNappula` asettaa `nousu = 0`, jolloin
`hypynHuippu` ei tee mitään eikä varjo kutistu. Koreografia
(js/siirtokoreografia.js STEP_MS 190, HYPYN_TAUKO_MS 190, HYPYN_KAARI
0,34) oli koko ajan tallella, se vain ohitettiin.

**Korjaus.** `doMove` antaa nyt `kyyti: false`, joten maareitti kulkee
taas hyppyketjua: kamera edellä (saatto), nappula perässä, hyppy ja
190 ms:n tauko joka askeleella, naksahdus laskeutumiseen. Askeltahti on
sama porrastus kuin ennenkin (`autokyydinAskel` on `jalkamatkanAskel`
uudella nimellä). Bussin ilmainen kyyti (`kyyti: true`, js/ui.js doBus)
ajaa yhä autona, ja laiva, lento ja liikeherkkyys ovat ennallaan.

Mitattu pystysiirtymä siirrossa: **23,5 px** (oli 0,00 px).

## 2. Automaattinen nopanheitto

**Juurisyy.** v1950:n laivamatka-jumin korjaus (Raamattu: NOPPA JÄI
LIUKUUN) nostaa `renderActions`in roll-haarassa `this.liukuAuki = true`,
jotta noppanappi on napautettavissa. Mutta `automaattiheittoSallittu`
tulkitsee auki olevan liu'un merkiksi "pelaaja avasi jotain, matka
odottaa" ja palauttaa `false`. Portti sulkeutui siis joka kerta, kun
noppa oli vuorossa — eli täsmälleen silloin, kun automaatin piti heittää.
Pelisäännöt olivat kunnossa: `game.jatkaMatkaaItsestaan()` oli `true`.
Kyse ei siis ole asetuksesta, vaan käyttöliittymän portista.

**Korjaus.** Uusi merkki `ui.liukuNopalle` erottaa nopan oman liu'un
pelaajan avaamasta: se nousee vain roll-haarassa, nollautuu jokaisen
`renderActions`in alussa sekä `vaihdaLiuku`ssa ja `suljeLiuku`ssa. Portti
on nyt `polloAuki() || (liukuAuki && !liukuNopalle)`. Laivan jumikorjaus
säilyy sellaisenaan.

Mitattu: reitin varrella `jatkaa: true`, `sallittu: true`, ja noppa
heitettiin itsestään 750 ms:n tauon jälkeen ilman napautusta.

## 3. Reitti katosi siirtymän ajaksi

**Juurisyy.** `game.actionMove` siirtää pelaajan määränpäähän ENNEN kuin
nappula lähtee liikkeelle, joten `matkaSessioKesken` näki kesken
animaation jo kohdekaupungin, nollasi matkasession ja
`matkareittienValinta` palautti tyhjän avaimen. Kun matka päättyi reitin
varrelle, viivan piti pystyssä `kesken`-haara (nappula on `edge`illä) —
juuri siksi vika näkyi vain silloin, kun heitto riitti kertaheitolla
kaupunkiin, kuten omistaja kuvasi.

**Korjaus.** `ui.siirtoKaynnissa` (lähtöpaikka, lasketaan vasta kun
kuljettaja on laskenut nappulan perille) pitää session elossa, ja
`matkareittienValinta` lukee siirron ajan reitin lähtöpaikasta eikä
määränpäästä. Avain on siirron ajan vakio, joten vaiheen vaihtuminen ei
piirrä viivaa uudestaan kesken animaation. Sääntö on yhteinen
kummallekin laudalle; pallon reittikerros (js/pallolauta/reitit.js) vain
piirtää sen.

Mitattu: 195 näytettä siirron ajalta, joista **0 ilman reittiä**, ja
perillä reitti katoaa (0 reittiä).

## Vartiot

`tools/savukkeet/savuke-noppa-saapumisen-aikana.mjs` sai kolme uutta
väitettä. Ajoin sen Chromiumilla paikallisesti: **10/10 läpi**.

- 6. nappula hyppii siirrossa (pystysiirtymä > 0)
- 7. reitti näkyy koko siirron ajan eikä jää perille
- 8. reitin varrella noppa heitetään itsestään

**Vastakoe:** kun kaikki kolme korjausta peruttiin js/ui.js:stä ja sama
savuke ajettiin, tulos oli 7/10 ja juuri väitteet 6, 7 ja 8 kaatuivat
(pystysiirtymä 0,00 px; 0 näytettä reitillä; `sallittu: false`,
heittoa ei tullut). Vartiot mittaavat siis näitä korjauksia eivätkä
mitään muuta.

Muut vartiot:
- `savuke-nappula-liike`: 17/17 (autokyyti on yhä bussin animaatio, ja
  sen omat väitteet mittaavat `kuljettaja.aja`aa suoraan).
- `node --test tests/*.test.mjs`: 3709 / 0.

## Huomio

Savuke ajettiin paikallisesti vain Chromiumilla (yksi selain kerrallaan,
v1968:n CI ajossa). WebKit jäi CI:n ajettavaksi.
