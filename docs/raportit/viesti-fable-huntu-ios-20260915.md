# Huntu vain kartalle: luentakuva terävänä myös iOS:llä

*(Opus-työsessio, 15.9.2026. Haara `claude/bold-ride-vow4ki-huntu-ios`.
Ei versionostoa, ei mergeä, ei Raamattua. Työskennelty erillisessä
worktreessä `/home/user/wt-huntu-ios`. Omistajan vikailmoitus, iPhone /
iOS Safari: **luennan huntu sumentaa myös isoisän ison luentakuvan** —
Ateenan saapumisluenta, kartta JA kuva sumeita, otsikkorivi, pulu ja
napit teräviä.)*

## 1. Juurisyy yhdellä lauseella

`.map-pane` ei luonut pinontayhteyttä (`position: relative` +
`z-index: auto`), joten luennan huntu `.map-pane::after { z-index: 4 }`
karkasi `.app`-pinoon ja päätyi siellä saman pinon sisarelementiksi ison
luentapäällyksen (`.fokusvirta-isokuva`, `.stage`:n lapsi, `z-index: 3`)
kanssa — ja 4 > 3, eli huntu maalautui kuvan PÄÄLLE ja sumensi sen.

## 2. Vika toistui Chromiumilla — se ei ollutkaan selainero

Tehtävänannon lähtöoletus oli, että Chromium ei toista vikaa ja kyse on
WebKitin ja Chromiumin erosta backdrop-filterin tulkinnassa. **Mitattu:
niin ei ole.** Kun mittaus tehdään samalla ruutukoolla kuin omistajan
kuvakaappaus (390 × 844, puhelinasettelu, jossa `.rail` on
`position: absolute`), Chromium sumentaa ison luentakuvan täsmälleen
samalla tavalla:

| Ruutu 390 × 844 | isokuvan Laplacian-varianssi, huntu päällä | huntu pois | muutos |
| --- | --- | --- | --- |
| Ateena, ENNEN | 1,4 | 1083,5 | **−99,87 %** |
| Dubrovnik, ENNEN | 1,2 | 552,8 | **−99,78 %** |

Aiempi tarkka kuvakaappaus
(`docs/raportit/kuvat/huntu-korjaus-390-jalkeen-20260915.jpg`) ei
kumonnut tätä: se on otettu ennen ison kuvan nousua tai leveämmällä
asettelulla. Vika on siis puhtaasti rakenteellinen, ei selainkohtainen —
ja siksi sen korjaus on rakenteellinen eikä selainehtoinen.

## 3. Pinoamisrakenne ennen ja jälkeen (mitattu Chromiumilla 390 × 844)

`.app` on `position: fixed` eli lähin pinontayhteys. `.stage` on
`position: relative`, `z-index: auto` — ei omaa pinoa. Sen lapset
luennan aikana:

| Elementti | position | z-index | luo pinon ENNEN | luo pinon JÄLKEEN |
| --- | --- | --- | --- | --- |
| `section.map-pane` | relative | auto | **— (ei luo!)** | **`isolation`** |
| `.map-pane::after` (huntu) | absolute | 4 | — (perii isännän pinon) | — (nyt map-panen sisällä) |
| `aside.rail` (matkakirjakortti) | absolute | 4 | `z-index:4` | `z-index:4` |
| `div.fokusvirta-isokuva` | fixed | 3 | `position:fixed+z-index:3` | `position:fixed+z-index:3` |

**ENNEN** — yksi pino (`.app`): `map-pane (auto)` → `isokuva (3)` →
`huntu (4)` = `rail (4)`. Huntu on isokuvan yläpuolella → kuva sumenee.

**JÄLKEEN** — kaksi pinoa: `.app`-pinossa `map-pane (auto, eristetty)` →
`isokuva (3)` → `rail (4)`; ja `map-panen` OMASSA pinossa kartta →
`huntu (4)` → pieni luentakuva (5) → fokuskortti (6). Huntu ei pääse enää
ulos karttaruudusta millään selaimella.

## 4. Korjaus

`css/styles.css`, `.map-pane`:

```css
  overflow: hidden;
  isolation: isolate;   /* ← ainoa toiminnallinen rivi */
```

Yksi ominaisuus, ei yhtään uutta solmua, ei js-muutosta, ei
selainehtoja, ei kosketusta `backdrop-filterin` animointikieltoon
(iOS-sääntö `tests/rules.test.mjs` pitää edelleen: suodatin on
staattinen, vain opacity liukuu).

Miksi juuri `isolation: isolate` eikä eksplisiittiset z-luvut jokaiselle
kuvakerrokselle: `.map-panella` on jo `overflow: hidden`, joten mikään
sen sisältö ei voi maalautua ruudun ulkopuolelle — eristys ei siis muuta
mitään näkyvää ruudun sisällä, se vain lakkaa vuotamasta ruudun omia
z-lukuja ulos. Vaihtoehto (b), huntu omaksi solmuksi, olisi vaatinut
uuden elementin ja sen elinkaaren vahtimisen js:ssä; vaihtoehto
"z-luku jokaiselle päällyskerrokselle" olisi pitänyt toistaa joka
kerralla, kun uusi päällys lisätään. `isolation` korjaa syyn.

## 5. Mittaukset korjauksen jälkeen

**(i) Isokuvan terävyys** (Laplacian-varianssi kuvan sisuksesta, reunat
15 % pois; sama rajaus molemmissa kuvakaappauksissa):

| Ruutu 390 × 844 | huntu päällä | huntu pois | muutos | vaatimus |
| --- | --- | --- | --- | --- |
| Ateena, JÄLKEEN | 1083,46 | 1083,46 | **0,00 %** | ±2 % ✔ |
| Dubrovnik, JÄLKEEN | 552,77 | 552,77 | **0,00 %** | ±2 % ✔ |

**(ii) Kartan terävyys** (vastakoe: hunnun on yhä purtava karttaan):

| Ruutu 390 × 844 | huntu päällä | huntu pois | muutos |
| --- | --- | --- | --- |
| Ateena, JÄLKEEN | 848,95 | 2457,08 | **−65,45 %** ✔ |
| Dubrovnik, JÄLKEEN | 835,43 | 1636,26 | **−48,94 %** ✔ |
| (vertailu: Ateena ENNEN) | 848,94 | 2457,08 | −65,45 % |

Kartan luvut ovat ennen ja jälkeen käytännössä identtiset — huntu tekee
kartalle täsmälleen saman kuin ennenkin. Vain kuva vapautui.

**(iii) Osumatesti — raahaus ja napautukset eivät muutu.** 9 × 9 pisteen
hila `.map-panen` yli, `elementFromPoint` huntu päällä, eristys päällä
vs. pois: **0 / 81 eroa** kummassakin kaupungissa. `isolation` on
maalausjärjestyksen ominaisuus; se ei koske asetteluun eikä
osumatestaukseen, ja huntu on yhä `pointer-events: none`.

**(iv) Kuvakaappaus:**
`docs/raportit/kuvat/huntu-ios-390-20260915.jpg` (vasen = ENNEN, oikea =
JÄLKEEN; Ateena 390 × 844, huntu päällä molemmissa). Vasemmassa kuva ja
kuvateksti ovat sumun takana täsmälleen kuten omistajan iPhone-kuvassa;
oikeassa kuva ja kuvateksti ovat teräviä ja kartta yhä huntuinen.

## 6. Uusi vartio + vastakoe

`tools/savukkeet/savuke-luentakuvan-kerros.mjs`, kohta 6:

- **"ISO LUENTAKUVA EI SUMENE HUNNUN ALLA (±2 %)"** — mittaa kuvan alueen
  Laplacian-varianssin huntu päällä ja ilman samassa ajossa.
- **VASTAKOE: "ilman `.map-panen` eristystä kuva TODELLA sumenee"** —
  sama ajo, `mapPane.style.isolation = 'auto'`, vaatii varianssin
  romahtavan alle puoleen. Mitattu ajossa: **849,6 → 1,3**. Ilman
  vastakoetta mittari näyttäisi vihreää myös silloin, kun se ei mittaa
  mitään.

Savuke: **23/23** (aiemmin 20/20; kolme uutta väitettä).

## 7. Portit

| Portti | Tulos |
| --- | --- |
| `NODE_USE_ENV_PROXY=1 npm test` (sis. `rules.test`, `dokumentit.test`) | 3440 testiä, **pass 3427, fail 0** |
| `tarkista-kaksoisavaimet` | ei kaksoisavaimia ✔ |
| `tarkista-niputus` | 391 moduulia, ei törmäyksiä ✔ |
| `tarkista-savukkeet` | kunnossa ✔ |
| `savuke-luentakuvan-kerros` | **23/23** (oli 20/20) ✔ |
| `savuke-kaiutin-luentakuvat` | **41/41** ✔ |
| `savuke-iphone-tekstit` | **41/41** ✔ (sis. kaupunkietusivun huntuvartiot) |
| `savuke-linssivika` | **6/6** ✔ (linssin avaus ja sulku ennallaan) |

`savuke-kartta-tila` kaatuu (`ui.kartta.zoomaaPainikkeella is not a
function`) — **tarkistettu `git stash`illa, että se kaatuu samoin
puhtaassa mainissa (96e100df)**; ei liity tähän muutokseen.

## 8. Mitä omistajan pitää vahvistaa iPhonella

Playwrightin WebKit EI ole tässä ympäristössä asennettu
(`/opt/pw-browsers` sisältää vain chromiumin ja ffmpegin), joten
WebKit-mittausta ei voitu ajaa. Chromium-mittaus kuitenkin **toisti
vian ja osoitti korjauksen samalla ruutukoolla**, ja korjaus poistaa
selaineron mahdollisuuden kokonaan: huntu ei ole enää samassa pinossa
kuin kuva, joten mikään selain ei voi järjestää niitä väärinpäin.

Omistajan tarkistuslista iPhonella (Ateena ja Dubrovnik,
saapumisluenta):

1. Isoisän ISO luentakuva ja sen **kuvateksti ovat teräviä**.
2. **Kartta** kuvan takana on yhä tumma ja sumea.
3. Otsikkorivi, pulu ja napit teräviä kuten ennenkin.
4. Kun sarja päättyy ja pieni kuvapakka laskeutuu kartalle, **pakan
   napautus** suurentaa sen ja kartan raahaus pienentää sen kuten ennen.
5. Kaupungin etusivun oma (vaaleampi) huntu näyttää entiseltä.
