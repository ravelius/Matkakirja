# Pelikoodari: lehden musta merkki ja läikät täysikoossa, 6.11.2026 klo 07.41

Täydentää luovutusta -0734 (PT:n lisäys: tarkistus ennen kuvaa KK:lle). Kuvat: `lokit/esikatselu-20261106-072617/`, `-070217/`. Täysikoko 2752 × 2064 px; koordinaatit täysikoon pikseleitä.

## 1. Läikät: pelin peukalokohdat, ei vika kuvassa. Löytyi oikea vika
- Läikät ovat pelin oma ohjain-UI: `Peukalokohta`, keskipisteet `PeukaloX = 0.14`, `PeukaloY = 0.7` (`JuoksupeliNakyma.cs`). Täsmää -0716:n kohtiin (275; 1050 ja 1720; 1050, 2000 px:n kuvassa). Väri lämpimän ruskea, omistajan päätös 21.10. Näkyvät ajossa -070217 molemmissa kuvissa.
- **Vika:** ajoissa -070906 ja -072617 niitä ei näy. Syy: `Uudestaan` lämmittää UI:n uudelleen (`LammitaUi(true)`, peitto 0,002), mutta paluu `LammitaUi(false)` ajetaan vain, kun `mOhjausT < 0`, eikä `Uudestaan` nollannut sitä. Lokit täsmäävät: -070217:ssä `avaus nyt 1` tuli ennen riviä "ohjaus pelaajalle" (rivi tuli jälkeen), kahdessa muussa rivin jälkeen, eikä toista riviä tullut.
- **Koskee oikeaa peliä, päätelty koodista, ei nähty pelaajan polulta:** toisesta juoksusta alkaen peukalokohdat ja opetuksen sykkivä kohta olisivat näkymättömiä. Samassa haarassa `JuoksuMaalisuunta.Lammita` jäisi päälle.
- **Korjaus `81d3e839c`** (proto `pelikoodari/tarkastelu-219`, ei junaan): `Uudestaan` asettaa `mOhjausT = -1f`. `unity-tarkistus` 0 virhettä, testit 867/867. **Ei katsottu pelistä.** Testi ei kata tätä näkymää. Seuraavassa ajossa, jossa on `avaus nyt`, peukalokohdat pitää näkyä kohdissa 14 % ja 86 % leveydestä, 70 % korkeudesta.
- Sivuvaikutus: mittarin ALKUNYKÄYS-luokittelu laskee nyt uudessa juoksussa uudesta ohjaushetkestä.
- Seuraus kuvalle: ajon -072617 kuvasta puuttuvat peukalokohdat, joten se ei täysin näytä pelin normaalia ruutua.

## 2. Lehden musta merkki: mallin vika, ei koodin eikä näytön tuote
- Täysin musta (0, 0, 0) kohta noin (2254; 1566), noin 357 lähes mustaa pikseliä, ristikon alakulmassa saranan puolella. Sama kohta lehdessä kuvissa `t1` ja `t3`; molemmat rajaukset katsottu täysikoossa.
- Mekanismi mallista: `ovi-lehti-*.glb`:n väritekstuurista 34,5 % on mustaa täytettä. Viidellä kolmiolla lehteä kohti on ainakin yksi kulma mustalla, ja kuudennella keskipiste mustalla; yhteensä 96 cm². Kohtaan sopii parhaiten kolmio (-0,128; 1,35; -0,039), 34 cm², 2 kulmaa mustalla. **Kolmion ja kuvan kohdan vastaavuutta ei ole todennettu kuvasta.**
- Molemmissa lehdissä sama tekstuuri, joten kaikissa 245 ovessa sama merkki peilattuna. Vasen lehti tässä kuvassa: ei näy tästä kulmasta.
- Lisäksi lähikuvassa ohuita katkoviivoja saumoissa (8× suurennoksessa, rajaus `merkki-8x`), todennäköisesti sama syy, ei todennettu. Samoin -0716:n "ohut musta rako" lienee samaa, ei tarkistettu.
- **Ei korjattu:** malli on Codexin. Suositus: musta täyte tekstuurissa korvataan viereisellä värillä (ovi-v1 uudelleen) ennen vientiä, koska `ovi-v1` puuttuu mediasta joka tapauksessa. Päätös PT:llä.

## 3. Kuva KK:lle
Tekniikan puolesta `t1` kelpaa näyttämään, että keisari näkyy heti, mutta merkki pitää mainita viestissä, koska se näkyy täysikoossa (ei leikata tunnettua vikaa). Suositus: odota seuraavaa ajoa, jossa peukalokohdat ovat mukana.
