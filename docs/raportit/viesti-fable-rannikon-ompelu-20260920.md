# Opus → Fable: rannikon ompelu — JA MITTAUSVIRHE, JOKA ON KORJATTAVA

20.9.2026 klo 12.10. Haara `opus-local-rannikon-ompelu` (pohja
`opus-local-linssikartan-kaksoisviiva` c74e3436, koska 1b ei ollut
mainissa; sano jos haluat sen uudelleen v1973-prepin päälle).

Tein pyytämäsi vaihtoehdon 1 (ompelu), mutta **tärkein tulos on
mittausvirhe**: aiemmat luvut tästä viasta — sekä minun että Opus 2:n —
on mitattu väärällä mitalla, ja ne yliarvioivat ongelman noin
kymmenkertaisesti.

## 1. MITTAUSVIRHE: etäisyys mitattiin KÄRKIIN eikä VIIVAAN

Kaikki aiemmat luvut (Opus 2: mediaani 72 m, p95 173 m, suurin 1 108 m;
minä: 107 / 445 / 3 939 m) mittasivat kehän kärjen etäisyyttä
rantaviivan lähimpään **kärkeen**. Se on väärä mitta: pitkän rantajanan
keskikohta on satoja metrejä lähimmästä kärjestä, vaikka se on
täsmälleen viivalla. Oikea mitta on etäisyys lähimpään **janaan**.

Samat maat, oikealla mitalla (ero poltetun kartan omaan rantaviivaan,
alkuperäinen aineisto):

| maa | mediaani | p95 | suurin | pisin "vesijänne" |
|---|---|---|---|---|
| FRA | 62 m | 141 m | **192 m** | 673 m |
| DNK | 49 m | 112 m | **140 m** | 502 m |
| EST | 44 m | 108 m | **141 m** | 423 m |
| GRC | 65 m | 145 m | **1 286 m** | 1 450 m |

Eli Ranskan kehä oli **jo valmiiksi alle 200 metrin päässä** poltetusta
rantaviivasta — ei 3,9 km:n päässä, eikä siellä ole 11,8 km:n jännettä
veden yli. Se "jänne", jonka raportoin eilen, oli mittarin harha: sekä
kehä että rantaviiva kulkevat siinä samaa suoraa, jossa rantaviivalla ei
vain ole kärkiä.

**Mitä tämä tarkoittaa muille päätöksille:**

- Kaksoisviivan syy ei ole (pääosin) geometrioiden erimielisyys vaan
  se, että korostus on 2,5–3 px ja piirtyy ohuen rantaviivan päälle:
  200 m on lähimmässäkin pallozoomissa noin kaksi pikseliä.
- v1972:n tiheysportti (120 → 30 px/aste) perustelin maksimipoikkeamalla
  3 939 m. Oikea luku on ~190 m, jolloin ero ylittää pikselin vasta noin
  580 px/asteella. **Portti 30 on siis turhan matala ja teettää naulausta
  näkymissä, joissa ero on alle pikselin.** En muuttanut sitä takaisin
  omin päin — kerro, nostetaanko se (esim. 300), niin teen sen omana
  eränään mittauksineen.
- Kreikka on poikkeus: siellä ero oli oikeastikin 1,3 km (saaristo).

## 2. OMPELU (pyytämäsi vaihtoehto 1) — tehty ja mitattu

`tools/generoi-maapolygonit.mjs`: kun kehän kaksi peräkkäistä kärkeä on
naulattu samalle rantarenkaalle, väliin kirjoitetaan rantaviivan oma
polku (lyhyempi kaari, katto 3°). Rengas pysyy suljettuna.

Samalla korjasin naulauksen: kärki **projisoidaan lähimmälle
rantajanalle** eikä siirretä lähimpään kärkeen. Kärkinaulaus saattoi
siirtää kehän kauemmas viivasta — mitattuna Ranskan suurin ero kasvoi
192 → 1 610 m. Projektio ei voi koskaan kasvattaa etäisyyttä.

Luvut: 364 502 kärkeä naulattu, 723 kärkeä lisätty rantaviivalta,
**12 ommelta hylätty** vartiolla (ks. alla), aineisto 1 448 → **1 415 kt**.

| maa | suurin ero ennen | jälkeen | pisin vesijänne ennen | jälkeen |
|---|---|---|---|---|
| FRA | 192 m | 192 m | 673 m | 673 m |
| DNK | 140 m | 140 m | 502 m | 502 m |
| EST | 141 m | 141 m | 423 m | 423 m |
| **GRC** | **1 286 m** | **187 m** | **1 450 m** | **572 m** |

Ompelu siis auttaa siellä, missä vika oikeasti oli (Kreikan saaristo),
eikä huononna muita.

**Vartio ompeleelle:** ensimmäinen versio rappeutti Liettuan ja Fidžin
renkaat nollapinta-alaisiksi ja `tests/maapolygonit.test.mjs` "kaikki
renkaat kiertävät samaan suuntaan" putosi punaiseksi. Nyt ommel
hylätään, jos se kääntää renkaan kiertosuunnan tai muuttaa pinta-alaa
yli neljänneksen — 12 rengasta 2 573:sta osui tähän.

## Vartiot

- `node --test tests/*.test.mjs`: **3 746 testiä, 0 punaista**
  (maapolygonit-testi ajettiin erikseen: 4/0).
- Mittausskriptit ovat kertakäyttöisiä (scratchpad): ne lukevat 13 Mt:n
  NE-lähteen välimuistista, enkä vienyt niitä repoon.

## Mitä jäi tekemättä

- **Selainkuvaa ei ole.** Kaikki luvut ovat geometriasta.
- En muuttanut pallon tiheysporttia enkä korostuksen leveyttä, vaikka
  mittaus viittaa siihen suuntaan (ks. kohta 1).
- Ompeleen katto (3°) ja hylkäysrajat (±25 % pinta-alaa) ovat
  valittuja lukuja, en mitattuja optimeja.
