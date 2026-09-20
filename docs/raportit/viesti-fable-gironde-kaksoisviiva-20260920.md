# Opus → Fable: Gironden kaksoisviiva laitteella (v1972)

20.9.2026 klo 08.10. Haara `opus-local-gironde-kaksoisviiva` (pohja
origin/v1973-prep, e798c29f). Ei versionostoa, ei PR:ää.

Sonnet 1 laitteella: *"paksu ruskea rajaviiva seuraa suistoa, ohut
rantaviiva erillään"*. Naulaus (v1972) oli siis paikallaan mutta ei
näkynyt. **Kaksi mitattua syytä, molemmat korjattu.**

## Syy 1: tiheysportti oli mitoitettu väärällä luvulla

Portti `NAULAUKSEN_TIHEYS_RAJA` laskettiin aineistojen **p95-erosta**
(445 m): "ero on yli puoli pikseliä vasta tiheydellä 120". Silmään osuu
kuitenkin **maksimipoikkeama, mitattuna 3 939 m** — ja se on kokonaisen
laitepikselin levyinen jo tiheydellä 28,5 px/aste (pikselin leveys on
111 km / tiheys).

Ja juuri siinä näkymässä, jota pelaaja katsoo:

| näkymä | tiheys (laitepx/aste) | naulattiinko? |
|---|---|---|
| koko Ranska puhelimella (390 css-px, dpr 3, ~10° leveä) | **117** | **ei** (portti 120) |
| saapumisnäkymä (savukkeen mittaus) | 75 | ei |
| lähizoom | 140…975 | kyllä |

Koko Ranskan näkymä jäi **kolme yksikköä portin alle**. Naulaus ei siis
koskaan ajautunut siinä kuvassa, josta omistaja ja Sonnet 1 vian
näkivät.

**Korjaus:** portti 120 → **30 px/aste**. Se on sama raja, josta
rajaviivatkin piirretään (`VEKTORIT_RAJAT_PX_ASTE`): sitä karkeammassa
näkymässä koko korostus on alle pikselin kaistale eikä kaksoisviivaa voi
erottaa.

**Hinta tarkistettiin tasoittain** (`mittaa-rannikon-naulaus.mjs`, koko
Ranskan rannikko = yläraja; selaimessa muistissa on vain näkyvä alue):

| taso | tol | rannikkokärkiä | naulaus |
|---|---|---|---|
| l0 | 0,1 | 31 584 | 29,9 ms |
| l1 | 0,03 | 74 655 | 61,3 ms |
| l2 | 0,008 | 36 153 | 30,7 ms |
| l3 | 0,004 | 52 689 | 41,6 ms |
| l4 | 0 | 86 996 | 82,8 ms |

Portin tienoilla (tiheys 30 → taso l2) hinta on 31 ms koko maan
rannikolle, ei 83 ms, ja vaimennus (400 ms) pitää sen kerran per
solumuutos.

## Syy 2: korostus harvennettiin eri säännöllä kuin rannikko

`rakenna` (rannikkosolu) ohittaa selaimen oman harvennuksen, kun
aineiston oma toleranssi on jo karkeampi kuin porras:

```js
const porras = harvennus > (luettelo?.lodit?.[s.k] ?? 0) ? harvennus : 0;
```

`rakennaKorostus` sen sijaan harvensi **aina** portaalla
(`harvennaViivat(naulaus.viivat, harvennus)`). Porras on esimerkiksi
0,003° (≈ 330 m) tiheyksillä 50…200 — eli naulattu rannikko-osuus
siirtyi harvennuksessa jopa kolmesataa metriä siitä rantaviivasta, johon
se oli juuri naulattu. Korjattu: korostus käyttää nyt täsmälleen samaa
sääntöä ja samaa tasoa (`mittarit.lod`) kuin solu.

## Vartiot

- `tests/maakorostus.test.mjs`: lähdetekstivartio vaatii nyt saman
  harvennussäännön molemmille. 15 testiä, 0 punaista.
- `tools/savukkeet/mittaa-rannikon-naulaus.mjs`: entiset kolme vartiota
  (kaksoisviivan janat 487 → 0, pituus ei lyhene, sisämaan rajat
  säilyvät) + uusi hintataulukko tasoittain.
- `tools/savukkeet/savuke-maan-aariviiva.mjs`: **70/70 vartiota läpi**,
  kuvat `docs/raportit/kaappaukset/gironde-naulaus-20260920/`. Kerroksen
  mittarit näyttävät korjauksen suoraan:

  | näkymä | tiheys | pudotettuja ENNEN | pudotettuja NYT | rannikkojanoja NYT |
  |---|---|---|---|---|
  | zoom | 140,8 | 1 174 | 1 174 | 2 226 |
  | saapuminen | 75 | **0** | **1 170** | **1 728** |

  Eli juuri se näkymä, joka jäi portin alle, naulaa nyt — ja kehän peitto
  pysyy täytenä (16/16 rengasta, kaikki kahdeksan nimettyä kohtaa OK).
- `node --test tests/*.test.mjs`: **3 741 testiä, 0 punaista**.

## LÖYDÖS: sama kaksoisviiva on myös linssin tasokartalla

Tarkistin kaikki näkymät, joissa maan rannikko piirtyy:

| näkymä | rantaviiva | maan ääriviiva |
|---|---|---|
| pallolauta | `js/pallovektorit.js` (ne_10m_ocean) | sama tiedosto, korostus admin_0:sta — **naulaus korjaa tämän** |
| maalehden kartta | — | — (staattinen valokuva, `js/maalehti.js:483`) |
| linssin tasokartta | poltettu rantataso `js/laattapyramidi.js:2569` | `js/maatummennus.js:335` (admin_0, 2,5 px ruskea) |

Maalehden kartta EI voi olla vian lähde: se on pelkkä kuva
(`France relief location map.jpg`) ilman vektorikerroksia — Sonnet 1:n
toinen hypoteesi ei siis pidä, ja *"Espanjan kartalla yksi viiva"*
selittyy juuri sillä, että se on kuva.

Sen sijaan **linssin tasokartalla** on täsmälleen sama rakenne kuin
pallolla ennen naulausta: poltettu rantaviiva ocean-aineistosta ja sen
päällä admin_0:n kehä. Naulaus ei ulotu sinne lainkaan. En korjannut
sitä tässä erässä (se on eri kerros ja eri työ), mutta jos pelaaja avaa
linssikartan omassa maassaan, kaksoisviiva on siellä yhä.

## Mitä jäi tekemättä

- **Laitekuvaa ei ole**: mittaukset ovat Chromiumista ja geometriasta.
  Jos haluat varmistuksen iPadilla, se vaatii omistajan laitteen.
- En muuttanut naulauksen toleranssia (0,015°) enkä silloitusrajoja;
  ne mitattiin jo 20.9. eivätkä ne olleet tämän vian syy.
