# Karttauudistus erä 7: aarre vihreänä pisteenä (pallo)

*(Opus-työsessio → Fable, 13.9.2026. Haara
`claude/karttauudistus-era7-aarrepiste`, origin/mainista (v1846).
Versiota EI nostettu, dist/ ei mukana. Lähteet: tehtävänanto,
`docs/raportit/karttauudistus-suunnitelma-pallo-20260913.md` luvut 1.3,
3.0 ja 3.6, `docs/raportit/karttauudistus-suunnitelma-20260913.md` luvut
1.8 ja 5.2–5.4, `docs/raportit/viesti-fable-karttauudistus-era6-20260913.md`
luku 3 (laskurin nimi ja muoto), Raamattu "Kaupungit" KARTTAUUDISTUS +
PAATOKSET 1–5 ja "Aarteet ja eteneminen".)*

## Lyhyesti

Aarretehtävä on nyt kartalla vihreänä pisteenä **alusta asti**. Ennen
kahta ratkaistua nostotehtävää se on näkyvissä mutta **lukittu**:
himmeä, tuikkeeton, ja napautus kertoo pulun kuplassa *"Ratkaise kaksi
kysymystä kartalta."* Kun `game.nostotehtavatRatkaistu >= 2` (erän 6
laskuri), piste syttyy vihreäksi ja napautus vie laattakysymykseen
kuten ennenkin. Vanha avaaja (lehden AARTEEN AVAUS -kysymys tai
Livialle ostettu pulla) säilyy **TAI-ehtona**, joten kesken oleva peli
ei jumitu. Ensimmäisessä kaupungissa, jossa lukittu piste on kartalla,
pulu kertoo ohjeen kerran per tallennus.

Savuke `savuke-aarrepiste.mjs` on **13/13 vihreä** vastakokeineen.
Portit: `npm test` 3295/0, kaksoisavaimet, niputus, savukkeet,
build-standalone.

## 1. Mitä tehtiin

| Tiedosto | Muutos |
| --- | --- |
| `js/fokusvirta.js` | `NOSTOTEHTAVIA_AARREPISTEESEEN = 2`, `fokusAarrepisteAuki`, `AARREPISTEEN_LUKKOLAPPU` / `_LUKKOVIESTI` / `_OHJE`, `fokusvirtaAarrepisteLukko`, `fokusvirtaAarrepisteOhje`; `fokusvirtaKohtaamispiste` palauttaa `lukittu`-kentän; `fokusvirtaKohtaaminenPisteessa` ei enää vaadi avattua aarretta |
| `js/fokuspiste.js` | `avaaFokuspiste` torjuu lukitun pisteen ja näyttää lukkoviestin; `fokuspisteKuvio(g, { lukittu })`; piirto ja avain tuntevat lukon; pulun ohjekutsu `paivitaFokuspiste`istä |
| `js/pallolauta/nostot.js` | pisteen datum kantaa `lukittu`; uusi `asetteleFokuspiste(el, d)` päivittää luokan ja lapun ilman uutta elementtiä; pulun ohjekutsu myös pallon ladonnasta |
| `js/game.js` | uusi tallennuskenttä `aarrepisteOhjeNahty` + `merkitseAarrepisteOhje()`, `toJSON`/`fromJSON` |
| `css/fokusvirta.css` | `.fokuspiste-lukittu`: himmennys, tuike pois, harmaanseepia sävy |
| `tools/savukkeet/savuke-aarrepiste.mjs` + README | uusi savuke, 13 vartiota + vastakoe |
| `tests/pallonimet.test.mjs` | yksi vartija uuteen `fokuspisteKuvio`-allekirjoitukseen |

**Ei koskettu** (tehtävänannon kielto): `js/pollo.js`, `js/livia-*.js`,
`js/lehti.js`, `js/fokusmitat.js`, `js/pallolaatat.js`,
`js/laattapyramidi.js`, `js/ui.js`, `js/rules.js`,
`js/pallolauta/siirto.js`, `js/kaupunkinosto.js`. Aarrekysymystä,
laatan palkkiota eikä lehtipalkintoketjua ei muutettu avausehdon
ulkopuolelta.

## 2. Miten ehdot yhdistyvät (TAI) — pyydetty kirjaus

Avausehto on **kaksi avainta samaan lukkoon**, ei yksi:

```js
export function fokusAarrepisteAuki(ui, city) {
  if (fokusAarreAvattu(ui, city)) return true;              // VANHA
  const ratkaistu = Number(ui?.game?.nostotehtavatRatkaistu); // UUSI
  return Number.isFinite(ratkaistu) && ratkaistu >= 2;
}
```

- **UUSI:** kaksi ratkaistua NOSTON minikysymystä koko matkalla.
  Laskuri on **globaali** (erän 6 päätös), ei kaupunkikohtainen:
  omistajan sana on *"kaksi mita tahansa mini tehtavaa"*, ja
  kaupunkikohtainen laskuri lukitsisi pelaajan kaupunkiin, jossa
  nostoja ei satu olemaan kahta. **Tämä ratkaisee suunnitelman luvun
  3.6 ja erän 6 raportin luvun 3 ristiriidan** (suunnitelma puhui
  kaupunkikohtaisesta laskurista) — Raamatun sanamuoto voitti.
- **VANHA:** `fokusAarreAvattu` = lehden aarteen avaava kysymys
  oikein TAI Livialle ostettu pulla. Tämä ei poistu, jotta tallennus,
  jossa aarre avattiin ennen lehden kautta mutta laskuri on 0, pysyy
  auki (savukkeen vartio 5).

Kumpi tahansa riittää, kumpikaan ei sammuta toista. Lehtitehtävät
eivät kasvata laskuria (`kirjaaNostotehtava` kutsutaan vain
js/fokusnosto.js:n nostovisasta), joten vanhat lehtivastaukset eivät
täytä uutta ehtoa vahingossa.

### Sivutuote: umpikuja purkautui

Vanha `fokusvirtaKohtaaminenPisteessa` päättyi riviin
`fokusAarreAvattu(ui, city) || !fokusAarreVastattu(ui, city)` — piste
**katosi kokonaan**, jos kaikkiin kaupungin aarteen avaajiin oli
vastattu väärin. Nyt piste jää kartalle lukittuna ja aukeaa kahdesta
nostotehtävästä, joten erillistä umpikujan estoa ei enää tarvita.
Lehden oma alanappi (js/ui.js `tehtavaNapinTila`) on ennallaan eikä lue
tätä funktiota — tarkistettu koko repon haulla.

## 3. Lukitun pisteen pinta

- **Merkki on sama, kolme eroa** (css/fokusvirta.css
  `.fokuspiste-lukittu`): tuike sammuu, väri harmaantuu seepiaan päin,
  läpinäkyvyys putoaa. Ei uutta symbolia — pelaajan on tunnistettava
  sama piste ennen ja jälkeen. Ei suodattimia (js/fokuskartta.js sääntö
  3): pelkkä `fill` ja `opacity`.
- **Ruudunlukija:** lappu on lukittuna
  `"<paikka>: ratkaise kaksi kysymystä kartalta"`, auettuaan
  `"<paikka>: tapaa paikallinen"` (tai sähkekaupungissa
  `"lue pöllön sähke"`).
- **Napautus:** `avaaFokuspiste` (yksi portti molemmille laudoille)
  soittaa saman napautusäänen, näyttää lukkoviestin ja palauttaa
  `false` — kohtaaminen ei avaudu.
- **Liiku-nappi ei kysy pisteeltä mitään:** matkan voi jatkaa ilman
  aarretta, kuten omistaja pyysi. Erän 8 koodiin ei koskettu.

## 4. Pulun ohje (tehtävänannon sanamuoto)

Teksti on omistajan oma lause Raamatusta:

> Löytämällä kartalta kaksi kysymystä ja vastaamalla niihin oikein saat
> vihjeen aarteen sijainnista.

- **Rajapinta:** olemassa oleva julkinen `polloVihje(teksti)`
  (js/pollo.js). **Pulun tiedostoihin ei koskettu** — js/fokusvirta.js
  toi funktion mukaan jo olemassa olevaan `./pollo.js`-tuontiin.
- **Kertalippu on tallennuksessa** (`game.aarrepisteOhjeNahty`), ei
  localStoragessa: ohje kertoo pelin säännön TÄLLE pelille, joten uusi
  peli samalla selaimella saa sen uudestaan.
- **Lippu kuluu vasta kun kupla näkyy** (sama oppi kuin
  `fokusvirtaLehtivinkki`): jos pulun nappi on piilossa, ohje kuuluu
  yhä ensi kerralle.
- **"Ensimmäinen kaupunki" = ensimmäinen kaupunki, jossa lukittu piste
  on kartalla.** Ohje lähtee siitä, missä pisteen tila lasketaan
  (js/fokuspiste.js `paivitaFokuspiste` ja js/pallolauta/nostot.js
  `keraa`), joten se osuu itsestään oikeaan hetkeen eikä tarvitse omaa
  saapumiskoukkua. Viive 2,5 s, jotta saapuminen ehtii rauhoittua.

## 5. Savuke (PAKOLLINEN) — vihreä ja punainen ajo

`tools/savukkeet/savuke-aarrepiste.mjs`, ruutu 390 × 844,
deviceScaleFactor 2, `?lauta=pallo`, Pariisi.

### Vihreä ajo (koodi sellaisenaan)

```
INFO  Pariisin kohtaamispiste: Quai de Montebellon kirjalaatikot (5911.6, 1439.8)
INFO  vanhan tallennuksen avain: maailmankartta:pariisi:fokus:aarre
OK    0. data: kohtaamispiste ja lehden aarteen avaava tehtävä ovat olemassa
OK    pallolauta aukesi (0 tehtävää)
INFO  0 tehtävää: piste true, lukittu true, pallolla true (lukko true), kartalla false
INFO  lukitun pisteen lappu: "Quai de Montebellon kirjalaatikot: ratkaise kaksi kysymystä kartalta"
OK    1. 0 tehtävää: piste on kartalla mutta lukossa
INFO  pulun ohje (lippu tallennuksessa oli false): "Löytämällä kartalta kaksi kysymystä ja vastaamalla niihin oikein saat vihjeen aarteen sijainnista." — lippu true
OK    6a. pulu kertoo ohjeen kerran ja lippu kääntyy
INFO  lukitun pisteen napautus: avasi false, kortti false, kupla "Ratkaise kaksi kysymystä kartalta."
OK    2. lukitun pisteen napautus ei avaa kohtaamista vaan kertoo lukosta
OK    pallolauta aukesi (1 tehtävä)
INFO  1 tehtävä: laskuri 1, lukittu true, auki false
OK    3. yksi tehtävä ei sytytä pistettä (VASTAKOE)
OK    pallolauta aukesi (2 tehtävää)
INFO  2 tehtävää: laskuri 2, lukittu false, auki true, pallolla true (lukko false)
INFO  auenneen pisteen lappu: "Quai de Montebellon kirjalaatikot: tapaa paikallinen"
INFO  auenneen pisteen napautus: avasi true, kortti true
OK    4. kaksi tehtävää sytyttää pisteen ja napautus avaa kohtaamisen
OK    pallolauta aukesi (vanha tallennus)
INFO  vanha tallennus: laskuri 0, lukittu false, auki true
OK    5. vanha tallennus: lehden kautta avattu aarre pysyy auki laskurin ollessa 0
OK    pallolauta aukesi (ohje nähty)
INFO  ohje jo nähty: kupla ""
OK    6b. nähty ohje ei tule toista kertaa

13/13 läpi
```

`kartalla false` on odotettu: tasokartta ei ole käytössä
(js/ui-apurit.js `VANHA_KARTTA_KAYTOSSA = false`), joten merkki
piirtyy vain pallon kerrokseen.

### Punainen ajo (VASTAKOE: ehto riisuttu)

Muutos: `fokusAarrepisteAuki`sta poistettiin kynnys, eli funktio
palautti `true` heti kun laskuri oli **yli nollan**
(`ratkaistu >= 1`). Muuta ei koskettu.

```
OK    0. data: kohtaamispiste ja lehden aarteen avaava tehtävä ovat olemassa
OK    pallolauta aukesi (0 tehtävää)
OK    1. 0 tehtävää: piste on kartalla mutta lukossa
OK    6a. pulu kertoo ohjeen kerran ja lippu kääntyy
OK    2. lukitun pisteen napautus ei avaa kohtaamista vaan kertoo lukosta
OK    pallolauta aukesi (1 tehtävä)
INFO  1 tehtävä: laskuri 1, lukittu false, auki true
FAIL  3. yksi tehtävä ei sytytä pistettä (VASTAKOE) — {"kaupunki":"pariisi","sisalto":true,"lukitsee":true,"pisteessa":true,"onPiste":true,"lukittu":false,"teko":"tapaa paikallinen","auki":true,"laskuri":1,"pallolla":true,"palloLukossa":false,"palloKuvioLukossa":false,"palloLappu":"Quai de Montebellon kirjalaatikot: tapaa paikallinen","kartalla":false,"karttaLukossa":false}
OK    pallolauta aukesi (2 tehtävää)
OK    4. kaksi tehtävää sytyttää pisteen ja napautus avaa kohtaamisen
OK    pallolauta aukesi (vanha tallennus)
OK    5. vanha tallennus: lehden kautta avattu aarre pysyy auki laskurin ollessa 0
OK    pallolauta aukesi (ohje nähty)
OK    6b. nähty ohje ei tule toista kertaa

12/13 läpi
```

Vartio 3 punaisena todistaa, että kynnys on oikeasti kaksi eikä yksi —
savuke ei mittaa pelkkää "jotain tapahtuu".

### Kuvakaappaukset

`docs/raportit/kuvat/karttauudistus-7-piste-lukossa.png` ja
`karttauudistus-7-piste-auki.png` — sama 300 × 220 px:n rajaus pisteen
ympäriltä molemmissa, joten himmeän ja vihreän merkin voi verrata
suoraan. Molemmat 347 kt (katto 400 kt).

Kaappausta varten savuke piilottaa kaksi saapumisen kerrosta
(`.saapumistraileri`, `.fokusvirta-isokuva`) — ne peittävät kartan
kaupunkiin saavuttaessa. **Piilotus on vain esitystä varten:** vartiot
lukevat pisteen tilan koodista (`fokusvirtaKohtaamispiste`,
`fokusAarrepisteAuki`) ja merkin luokista, eivät kuvasta.

## 6. Portit

| Portti | Tulos |
| --- | --- |
| `npm test` | `# tests 3308`, `# pass 3295`, `# fail 0`, `# skipped 13` |
| `node tools/tarkista-kaksoisavaimet.mjs` | ei kaksoisavaimia |
| `node tools/tarkista-niputus.mjs` | 388 moduulia, ei törmäyksiä |
| `PLAYWRIGHT_BROWSERS_PATH=… node tools/tarkista-savukkeet.mjs` | ks. luku 7 |
| `node tools/build-standalone.mjs` | ok |
| `grep -rn '^<<<<<<<' js css tests tools` | tyhjä |

## 7. Fablelle (ei korjattu tässä erässä)

1. **Lukitun pisteen väri on koodarin arvaus, ei taiteellinen päätös.**
   Valitsin harmaanseepian (`#8a8470` / `#9a9482` / `#efe8d6`), joka
   istuu paletin paperiin. Jos omistaja haluaa toisen lukkoasun
   (esim. pelkkä ääriviiva tai katkoviivakehä), muutos on yksi CSS-lohko.
2. **Ohjeen sanamuoto on omistajan oma lause Raamatusta** — jos Fable
   haluaa kirjoittaa sen uudelleen, vakio on
   `AARREPISTEEN_OHJE` (js/fokusvirta.js) ja lukkoviesti
   `AARREPISTEEN_LUKKOVIESTI`. Kumpikin on yksi rivi.
3. **Piste ei vieläkään zoomaa mukana pallolla samalla säännöllä kuin
   tasokartalla** (js/pallolauta/nostot.js piirtää merkin ruutuvakiona).
   Ei tämän erän asia, mutta lukittuna merkki on himmeämpi ja siksi
   pienenä vaikeampi huomata; jos omistaja pelitestissä sanoo sen
   katoavan, katto on `NOSTON_MITTA`.
4. **Erän 6 raportin avoin asia on nyt ratkaistu** (luku 2): laskuri on
   globaali. Suunnitelman luvun 3.6 maininta kaupunkikohtaisesta
   laskurista on siis vanhentunut.
