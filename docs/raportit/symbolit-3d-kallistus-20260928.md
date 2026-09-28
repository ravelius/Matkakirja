# 3D-symbolit takaisin, isommiksi ja kallistettuna esineiksi (Linssiseppä 28.9.2026)

*Omistajan päätökset Päätoimittajan kautta: 17.3x erikoismallit myös ylhäältä; 17.4x "palauta 3d symbolit vielä mutta tee
niistä isompia. nyt kaikki 3d mallit pienenevät kun niitä menee lähemmäksi silloin kun kartta on kallistettuna. pitäisi mennä
päinvastoin" ja "jos erikoissymboli on kohdekaupungissa, se pitää siirtää hieman sen viereen".*

**Toteutus:** proto-haara `linssiseppa/symbolit-3d-luonnollinen` **0ff66cfc** (pohja master BUILD 37 + symbolit-2d 5ac726fd,
jonka kytkin jää ja oletus kääntyy). Kartta-testit 383/383 (6 uutta), unity-tarkistus 0 virhettä. Laitekuvat: laiteajo cl10
(käännös 66c67ba1, iPhone, 0 poikkeusta), kansio `proto-3d/lokit/linssiseppa-laite-20260928-cl10/`:
`koonti-lahestyminen-55.png` (ennen | jälkeen kertoimilla 1,5 / 2,5 / 4 / 6, kallistus 55°, Rooma),
`lahestyminen-rinnakkain.mp4` (9 s, sujuva lähestyminen 1,5 → 6), `pari-ylhaalta.png` (Český Krumlov ylhäältä),
`pari-visby-ylhaalta.png`, `pari-visby-kallistettu.png`, `pari-rooma-ylhaalta.png` ja `pari-rooma-kallistettu.png`.

**Havainnot laitteelta (Natiivi-UI:n nimiöt, ei tämän erän muutos):** kallistettuna Visbyn malli peittää osan naapurin
nimestä (Vimmerby), ja ison erikoismallin oma nimiö voi jäädä piiloon, jos sen kaikki kyljet ovat tukossa (Český Krumlov
ylhäältä; sama sääntö 1.0.37:ssä kallistettuna). Nostojen nimiöiden pitäisi väistää erikoismallia kalusteena.

## 1. Vian syy

Malli pidettiin **vakiokokoisena ruudulla omalla etäisyydellään**. Kallistetussa kartassa lähestyttäessä maasto kasvoi ruudulla
kertoimen mukana (4,8 × kertoimilla 1,25 → 6), mutta malli vain 1,8 ×. Malli siis kutistui maisemaan nähden, ja kaukana
horisontissa olevat mallit olivat yhtä isoja kuin edessä olevat, joten perspektiivi toimi väärin päin.

## 2. Uusi kokolaki

| | ylhäältä (kallistus 0°) | kallistettuna (25° ja yli, pehmeä siirtymä 0 → 25°) |
|---|---|---|
| Kategoriasymboli, kerroin 1,25 | 40 pt (ennen 30) | 40 pt |
| kerroin 2,5 | 55 pt (ennen 41) | 75 pt |
| kerroin 4 | 65 pt (ennen 48) | 109 pt |
| kerroin 6 | 73 pt (ennen 54) | 148 pt (iPhonella katto 117 pt) |
| Kasvu kertoimen potenssina | ~0,37 (ennallaan) | ~0,82 (oikea esine = 1) |
| Lähempänä / kauempana katsepistettä | sama koko | oikea perspektiivi, rajat 0,4–2 × |

- **Isommiksi:** kaikki 3D-mallit × 1,35 (`symbolit iso`). Erikoismalli pysyy noin 1,1 × symbolia (81 pt kertoimella 6 ylhäältä).
- **Katto:** 0,3 × ruudun lyhyempi sivu (iPhone 117 pt, iPad 11" 250 pt). Katto ei koskaan pienennä ylhäältä-kokoa.
- **Tasot 2–3** noudattavat samaa lakia omalla kynnyksellään (2,5).
- **Natiivi-UI:n merkin ruutu ja peitto** lukevat mallin oman koon (`Symbolimallit.LeveysPt`), joten oma nimiö asettuu
  lähellä olevan ison mallin viereen.

## 3. Erikoismallit ylhäältä

Erikoismallit piirtyvät nyt myös pystysuorasta kamerasta liioitellulla perspektiivillä (ennen vain kallistuksesta 25°).
A/B `symbolit erikoisylhaalta 0|1`.

## 4. Erikoismalli kaupungin viereen

- **Mikä on kaupungissa:** kaupungin maamerkki (Colosseum → Rooma, Brandenburgin portti → Berliini), kaupunkinosto itse
  (Visby) tai erikoismalli enintään 3 km:n päässä kaupunkipisteestä (KaupunkiMerkit).
- **Siirto:** kiinteä sivusuunta **ruudun vasemmalle**. Kaupungin nimiö on oletuksena oikealla ja väistää mallia kalusteena.
  Mallin lähin reuna on 12 pt pisteen keskeltä, eikä liioiteltu perspektiivi kallista mallia kaupungin päälle.
- **Visby:** kaupunkimerkki jää näkyviin, ja malli piirtyy sen vasemmalle puolelle.
- **Ei kaupunkimerkkiä natiivikartassa:** Trondheim (Nidaros), Salzburg (Hohensalzburg), Český Krumlov ja Brugge.
  Natiivin kaupungit.json sisältää vain suurimmat kaupungit (esim. Norja: Oslo, Bergen, Tromssa), joten näissä ei ole
  peitettävää pistettä. Sääntö lukee dataa, joten se koskee niitä heti, kun kaupunkimerkki lisätään.
- A/B `symbolit sivuun 0|1`.

## 5. A/B samasta käännöksestä

- **1.0.37:** `symbolit iso 1`, `symbolit luonnollinen 0`, `symbolit sivuun 0`, `symbolit erikoisylhaalta 0`.
- **Säätimet:** `symbolit kasvu <x>` (lisäkasvu, oletus 0,45) ja `symbolit katto <osuus>`.
- **2D-merkit:** `symbolit kategoriat3d 0` (omistajan 17.2x kytkin, nyt oletus 3D).
