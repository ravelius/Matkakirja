# Viesti Fablelle: puhelimen tekstit piiloon, Liiku neliöksi, luennan huntu

Opus-työagentti 14.9.2026. Haara `claude/bold-ride-vow4ki-iphone-tekstit`.
Kaikki luvut on MITATTU Chromiumilla (`/opt/pw-browsers/chromium`)
iPhone-emulaatiolla 390 × 844 ja 844 × 390 sekä työpöydällä 1400 × 900.

## 1. Nykytila ennen muutosta (mitattu)

| kohde | 390 × 844 | 844 × 390 | 1400 × 900 |
| --- | --- | --- | --- |
| matkakirjakortti (`.fact-card`) | 340 × 195 @ (14, 70) = 87 % leveydestä | 340 × 244 @ (16, 16) = 63 % korkeudesta | 340 × 258 @ (16, 73) |
| isoisän merkintä (`#fact-text`) | näkyvissä, peittää kuvan | näkyvissä, peittää kuvan | näkyvissä |
| kuva (`.fokusvirta-luentakuva`) | kartalla, pieni pino | kartalla, pieni pino | kartalla |
| Liiku (`.monitoimi-nappi`) | 113 × 44 @ (139, 741), keskellä | 113 × 44 @ (366, 282) | 113 × 44 @ (644, 792) |
| Liikun väri | `linear-gradient(rgb(234,184,78), rgb(208,144,36))`, teksti `rgb(44,30,7)` | sama | sama |
| Liikun näkyvyys luennassa | näkyi koko ajan | näkyi | näkyi |

Pulun puhekupla: **`FOKUSVIRTA_KORTIT = false`** (js/fokusvirta.js:288), joten
korttivirran omaa kuplaa (`.fokusvirta-kupla`) ei synny lainkaan — pulun
saapumisrepliikki tulee pollon kuplapinoon (`.pollo-kuplapino-kehys`,
`.pollo-vihje`). Piilotus kohdistuu siis siihen.

Luennan tila luetaan `js/luenta.js`:n `puhujaAanessa()`-funktiosta. Se on
ainoa yhteinen piste, jonka läpi sekä isoisän luenta että Livian repliikki
kulkevat; luenta- tai äänilogiikkaan **ei koskettu** — vahti vain lukee.

## 2. Puhelimella isoisän ja pulun tekstit piiloon

Puhelintunnistus: **`(max-width: 699px), (max-height: 520px)`**, sama
merkkijono js:ssä (`js/ui.js` `PUHELIN_KYSELY`) ja css:ssä. Molemmat rajat
olivat pelissä jo käytössä; ei käyttäjäagentin haistelua. Mitattu: 390 × 844
→ leveysraja osuu, 844 × 390 → korkeusraja osuu, 1400 × 900 → kumpikaan ei.

- **Isoisän teksti**: matkakirjakortti jää puhelimella pelin OMAAN
  lappumuotoonsa (`.fact-card.pieni`, olemassa oleva mekanismi vuodelta
  4.8.2026). Mitattu jälkeen: 183 × 24 @ (14, 70) pystyssä ja 205 × 27 @
  (16, 16) vaakasuunnassa — merkinnän teksti ei näy.
  **Teksti ei ole poissa**: lappu on painike, ja napautus avaa merkinnän
  (mitattu: `factPieni` false, teksti näkyy).
- **Pulun puhekupla**: `.pollo-kuplapino-kehys` on `display: none`
  puhelimella. Työpöydällä ennallaan (vastakoe savukkeessa).
- **Kuva ja kuvateksti näkyvät** molemmissa suunnissa (mitattu).
- **Kaiutin jäi lapulle** tarkoituksella: se on sekä mykistyskytkin että
  luennan merkki (luku 5). Ilman erillistä sääntöä lappu olisi leikannut sen
  pois.

## 3. Liiku: neliösymboli vasemmassa alanurkassa

Omistajan tarkennus 14.9.2026 korvasi aiemman A/B-kokeilun.

- Neliö **44 × 44** css-px, ruudun vasemmassa alanurkassa: mitattu
  x = 10 kaikissa kolmessa koossa (pysty y = 773/844, vaaka y = 319/390,
  työpöytä y = 829/900). Turva-alueet mukana (`env(safe-area-inset-*)`).
- **Ei värikorostusta**: pergamentti `rgba(244,231,202,0.92)`, muste
  `#46331f`, 1 px reunus `rgba(70,51,31,0.45)`. Kultaista liukuväriä ei ole.
  Kontrasti mustetta pergamentilla **9,7 : 1** (vaadittu ≥ 4,5;
  vanha kulta oli 7,3 : 1).
- **Symboli on pelin oma kompassi-viivaikoni** (`iconButton('kompassi')`) —
  uutta ikonia ei piirretty.
- **Ei osu pulun nappiin**: päällekkäisyys 0 kaikissa kolmessa koossa
  (pulu on 390 px:n ruudulla x 300…348, neliö x 10…54).
- Nappi irrotettiin alapalkista `position: fixed` -asemointiin, koska
  alapalkki on vaakasuunnassa keskitetty 560 px:n paneeli (mitattu 844 × 390:
  palkki x 142…702) — rivin alussakin nappi jäi 148 px irti reunasta.
  Matkustusliuku ei muuttunut: se on absoluuttinen oman rivinsä sisällä ja
  piilottaa monitoiminapin avautuessaan.

**Aarteen löytyessä** nappi laajenee: symboli jää vasempaan reunaan
(x pysyy 10) ja sana "LIIKU" tulee oikealle — mitattu leveys 44 → 107 px.
`LIIKU_LAAJENNUS_MS = 6000` jälkeen se kutistuu takaisin 44 px:n neliöksi
(mitattu). Kytkentä on `playTokenReveal`-metodin lopussa, samassa kohdassa
jossa laukku jo heilahtaa aarteesta (`onAarre(type)`) — uutta tilaa ei keksitty.

**Maapaneeli**: napilla on `z-index: 6`, joten se jää paneelin päälle. Peliin
jäi ennallaan aiempi sääntö, joka piilottaa Liikun kokonaan maataulun ajaksi
(`body.maataulu-auki`, 13.9.2026) — siihen ei koskettu.

## 4. Liiku piiloon luennan ajaksi

`js/ui.js` `kaynnistaLuentavahti()` kysyy 200 ms:n välein
`puhujaAanessa()` ja kirjoittaa bodyn luokkaan `luenta-aanessa`; css
piilottaa napin `display: none` -säännöllä (ei opacity — piilossa olevaa
nappia ei voi napauttaa). Kaksi turvaa:

1. **Välirauha 1300 ms** puheenvuorojen välissä (isoisän luenta 900 ms +
   varmuus), jottei nappi välähdä Horation ja Livian väliin.
2. **Varaventtiili 30 s**: jos vuoro jää roikkumaan, nappi tulee näkyviin
   joka tapauksessa. Umpikujaa ei synny.

Mitattu: luennan aikana `display: none`, luennan jälkeen ~1,2 s kuluttua
takaisin `flex`. Mykistettynä (`asetaLuentaKytkin(false)`) kukaan ei ole
äänessä, joten nappi näkyy heti (mitattu).

Matkan varrella löytyi ja korjattiin oma vikani: vahdin ajastinkahva
nollattiin konstruktorissa käynnistyksen JÄLKEEN, jolloin kahva katosi ja
kaksi vahtia kilpaili samasta luokasta (luokka välkkyi 400 ms:n välein).

## 5. Luennan huntu ja kaupunkietusivun huntu

- **Luennan huntu** (`css/fokusvirta.css`): kartan oma jälkielementti
  `body.luenta-huntu .map-pane::after`, `rgba(30,22,12,0.42)` +
  `backdrop-filter: blur(3.5px)`, `z-index: 4`. Isoisän kuva on z-index 5,
  joten kuva, kuvateksti ja pulun pakka jäävät terävinä hunnun päälle ja vain
  kartta pehmenee. Huntu nousee vain kun kertoja puhuu JA kuva on ruudulla;
  mitattu pois heti luennan jälkeen (vastakoe).
- **Kaupunkietusivu** (`dialog.dialog.arkki.tiivis-lehtiarkki::backdrop`):
  sama sumennus 3,5 px, mutta VAALENTAVA pergamenttipeite
  `rgba(245,230,200,0.35)`. Ennen: `rgba(14,9,4,0.34)` + blur(6px). Mitattu
  pikselikirkkaus: uusi huntu on vaaleampi sekä luennan huntua että
  tavallista dialogipeitettä (`rgba(14,9,4,0.72)`).
- **Suodattimet ovat staattisia** — ei siirtymää eikä animaatiota
  backdrop-filterille (iOS-sääntö, tests/rules.test.mjs). Vain peitteen
  opacity liukuu. Molemmille on `@supports not`-varasääntö ilman sumennusta.
- Lehden sisältöön ei koskettu, vain taustakerrokseen.

## 6. Kaiutin sykkii luennan merkiksi

`@keyframes fact-kaiutin-syke` (1,0 → 1,12, 1600 ms, ease-in-out, ∞) —
vain `transform: scale` ja `opacity`, **ei suodatinta**. Luokan
`kertoja-aanessa` asettaa sama vahti kuin luvussa 4, mutta ehdolla
`puhujaAanessa(PUHUJA_PULU)`, joka jättää pulun laskuista. Mitattu:

- Horation luennassa `animationName = fact-kaiutin-syke`, kesto 1,6 s.
- Luennan jälkeen `none` (vastakoe).
- Pulun repliikin aikana `none` — Livialle ei merkkiä, kuten tilattiin.
- Mykistettynä ääntä ei synny, joten merkkikään ei syki. Erillistä
  mykistysehtoa ei tarvittu.
- `prefers-reduced-motion: reduce` → ei animaatiota, pelkkä staattinen
  korostus (mitattu).

## 7. Portit

| portti | tulos |
| --- | --- |
| `npm test` | ks. alla |
| `tarkista-kaksoisavaimet` | ei kaksoisavaimia |
| `tarkista-niputus` | 387 moduulia, ei törmäyksiä |
| `tarkista-savukkeet` | 1659 ui-viittausta, kunnossa |
| `tools/savukkeet/savuke-iphone-tekstit.mjs` (uusi) | **33/33 vartiota läpi** |

Uusi savuke ajaa nykyisellä laudalla (ei `?lauta=kartta`). Jokaisella
säännöllä on vastakoe: työpöydällä tekstit ovat näkyvissä ja kuplapino
paikallaan, Liiku palaa luennan jälkeen, huntu häviää, kaiutin vaikenee ja
laajennettu nappi kutistuu takaisin.

## 8. Kuvat

`docs/raportit/kuvat/`:

- `iphone-tekstit-ennen-pysty.png`, `iphone-tekstit-ennen-vaaka.png` — ennen
- `iphone-tekstit-piilossa-pysty.png`, `iphone-tekstit-piilossa-vaaka.png` — jälkeen
- `iphone-tekstit-tyopoyta.png` — työpöytä ennallaan (vastakoe)
- `liiku-laaja-pysty.png` — aarteen jälkeinen laajennus
- `luennan-huntu-pysty.png`, `luennan-huntu-tyopoyta.png` — luennan huntu

**Kuvien rajoite**: konttiselain ei saa karttapalloa auki (WebGL), joten
kuvissa kartta on musta ja sen tilalla on pelin oma virheilmoitus. Kaikki
mitattavat pinnat — matkakirjan lappu, kuvateksti, Liiku-neliö — piirtyvät
silti oikein, ja kaikki luvut yllä on mitattu DOMista eikä kuvapikseleistä.
Ennen–jälkeen-pari kertoo silti olennaisen: ennen koko merkintäteksti ja
kullattu LIIKU-palkki, jälkeen yhden rivin lappu ja pieni mustesymboli.

## 9. AVOIN KYSYMYS OMISTAJALLE

**Äänettömällä puhelimella pulun repliikki jää kokonaan saamatta.**
Isoisän merkinnän saa esiin lappua napauttamalla, koska pelissä oli jo
valmis avausmekanismi. Pulun kuplilla ei ole vastaavaa omaa avaajaa:
kuplapinon "+"-palautusnappi ilmestyy vasta, kun kuplat on ensin suljettu,
eikä siis auta, jos kuplia ei koskaan näytetty. Vaihtoehdot, jos tämä
halutaan korjata:

1. Pulun napin napautus näyttää viimeisimmän repliikin (vaatii pollo.js:n
   logiikkaa — eri agentin alue).
2. Kuplat näkyvät puhelimella, mutta pienempinä ja lyhyemmän aikaa.
3. Jätetään näin: repliikki on ääntä, ja mykistetty pelaaja jää sitä paitsi.

Ehdotan vaihtoehtoa 1, mutta se on omistajan päätös.

## 10. Muutetut tiedostot

- `js/ui.js` — `PUHELIN_KYSELY`/`puhelinTila`, luentavahti,
  `laajennaLiiku`, `LIIKU_LAAJENNUS_MS`, lappu puhelimella
- `css/styles.css` — puhelinsäännöt, Liiku-neliö ja laajennus, kaiuttimen
  syke, kaupunkietusivun huntu
- `css/fokusvirta.css` — luennan huntu
- `tools/savukkeet/savuke-iphone-tekstit.mjs` — uusi savuke
- `docs/raportit/kuvat/` — 8 kuvaa

Ei versionostoa, ei mergeä, ei `dist/`, ei Raamattuun kirjoitusta.
