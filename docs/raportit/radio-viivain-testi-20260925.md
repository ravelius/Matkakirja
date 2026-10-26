# Maailmanradion viivain: aamukierroksen testi (Linssiseppä, 25.9.2026)

Build: `juna/b12` @ 9e78641 (proto-kaanna.sh), iPhone 18 Pro -simulaattori
(1572C658). Ääni ulos AirPod Max -kuulokkeilla koko testin ajan (ei
Mac Studio -kaiuttimia).

## 1. Viivaimen veto sormella — EI SAATU TOIMIMAAN AUTOMAATIOLLA

Testasin kahdella eri simulaattorin syöttötavalla, molemmat tarkasti
lasketuilla koordinaateilla (viivaimen keskikohta laskettu ruudun-
kaappauksesta, kalibroitu tarkasti: rivi y≈819 pt, asemat x 43–363 pt
402 pt:n leveydellä):

- `touch_path` (7–5 pistettä, 150–300 ms väli, kokonaiskesto 0,6–1,2 s):
  viivaimen neula PYSYI TÄYSIN PAIKALLAAN Pariisissa koko liikeradan
  ajan — ei mitään reaktiota. Kuva 2.
- `swipe` (0,8 s, sama matka): sama tulos, neula ei liikkunut lainkaan.

**Sen sijaan suora NAPAUTUS (`tap`) millä tahansa kohdalla viivainta
hyppää VÄLITTÖMÄSTI kyseiseen kohtaan** ja lukittuu lähimpään asemaan
(todennettu: napautus Brysselin kohdalle → "radio: Viritys/Lukittuu...
→ Soi BEL URGENT.FM 105.3 / BRYSSEL" n. 0,3 s:ssa, ks. loki). Kuva 3.

**En pysty sanomaan, onko tämä oikea bugi vai simulaattorin synteettisen
kosketuksen rajoitus** — samat `touch_path`/`swipe`-työkalut toimivat
tässä samassa sessiossa moitteetta maalehden ScrollView-vieritykseen
(sisältö seurasi sormea, inertia toimi), joten työkalu OSAA tuottaa
UI Toolkitin tunnistaman jatkuvan vedon ainakin ScrollView'lle. Tämä
viittaa siihen, että viivaimen oma PointerMove-käsittely / pointerin
kaappaus (`CapturePointer`) ei ehkä toimi odotetusti — mutta tätä ei voi
varmistaa ilman oikeaa sormea oikealla laitteella tai koodin lukua
(en ehtinyt lukea drag-manipulaattorin toteutusta RadioNakyma.cs:stä
tarkasti tällä kierroksella).

**Seuraukset muille kohdille, joita en siis voinut testata oikealla
vedolla:**
- "Nauhan pitää seurata sormea 1:1" — EI VOITU VARMISTAA (nauha ei
  liikkunut ollenkaan vedossa).
- "Asemalla kuuluu lähetys, puolivälissä rahinaa, siirtymä liukuva" —
  EI VOITU VARMISTAA (napautus ei koskaan pysähdy puoliväliin, se
  hyppää suoraan ja lukittuu).
- Kamera EI liikkunut kummassakaan veto-yrityksessä (tarkistettu
  `tila`-komennolla juuri ennen ja jälkeen: kamera pysyi täsmälleen
  samana molemmilla kerroilla) — mutta koska itse veto ei tehnyt
  mitään, tämä ei todista kameralukon toimivan vedon aikana, vain
  ettei vedosta seurannut mitään havaittavaa sivuvaikutusta.

## 2. Irrotus asemien väliin → lukitus/ristihäivytys/kamera-ajo

Ei voitu testata oikealla vedolla (ks. yllä). Napautuksen kautta
havaittu ketju (Bryssel, tuore radio): `Viritys/Lukittuu` → `Soi`
kuluneella ajalla joka täsmää koodin `LukittuminenMs = 320`. Koodista
(RadioLinssi.cs) luetut vakiot täsmäävät pyynnön kuvaukseen:
`LukittuminenMs = 320` (~0,3 s), `LukituksenHaivytysS = 0.9` (0,9 s),
`Mastot.SulkuS = 0.8` (0,8 s sulku). Koodi näyttää siis TOTEUTTAVAN
pyydetyt ajat — ongelma on vain siinä, etten pystynyt laukaisemaan
oikeaa veto+irrotus-ketjua automaatiolla todentaakseni sen käytännössä.

## 3. `radiopinnat`-lokirivi — PASS

Rivi kirjautuu automaattisesti linssin avauduttua, ei vaadi erillistä
komentoa:

```
radiopinnat: radio-kotelo=1024x320 ASTC_6x6/Texture2D radio-kehys=128x128 ASTC_6x6/Texture2D
radio-lasi=512x128 ASTC_6x6/Texture2D radio-vu-levy=256x180 ASTC_6x6/Texture2D
radio-viivain=512x64 ASTC_6x6/Texture2D LoadAll(Radio)=6, pinnat True
```

## 4. Sulku — PASS, ei sumua/laikkuja (86ac64e vahvistettu)

`linssi pois` (HUOM: EI "linssi sulje" — se antaa virheen "tuntematon
linssi: sulje", väärä komento, korjasin kesken testin). Kamera-ajo
40°→0° tasan 0,8 s (`Mastot.SulkuS`). Ruudunkaappaukset 0,3 s / 0,8 s /
1,8 s sulun alusta: Pariisin pergamenttikartta on KAIKISSA terävä, ei
sumua eikä laikkuja missään vaiheessa. Kuvat 4–5.

## Kuvat

`docs/raportit/kaappaukset/radio-viivain-20260925/`:
1. avaus (radio auki, ei asemaa)
2. touch_path-veto ei liikuttanut neulaa
3. napautus hyppää suoraan Brysseliin
4. sulku 0,3 s (jo puhdas)
5. sulku 1,8 s (edelleen puhdas, ei sumua)

## PÄIVITYS: korjaus vahvistettu (linssiseppa/radio-veto @ b35566b)

Linssiseppä löysi juurisyyn (nimien `Clickable` kaappasi osoittimen ennen
asteikon omaa vetokäsittelijää) ja korjasi haarassa
`linssiseppa/radio-veto` (e8d0cbf, juna/b12:n päällä). Käänsin
`juna/b12+linssiseppa/radio-veto` (@ b35566b) omaan simulaattoriini ja
toistin TÄSMÄLLEEN saman `touch_path`-testin (samat koordinaatit,
y≈819 pt, 104 pt matka Pariisista):

- **Neula liikkui vedon mukana** Pariisista Kumasiin (2 asemaa taakse-
  päin vetosuuntaan nähden — nauha liikkuu fyysisesti sormen mukana,
  ei kursori, joten suunta on odotettu tälle skeuomorfiselle mallille).
- Ketju eteni oikein: `Viritys/Siirtyma` → `Viritys/Haku` →
  `Viritys/Lukittuu` → `Soi GHA Kumasi Info Radio Ghana`.
- **Napautus nimeen toimii yhä** — testattu LAGOS-nimen napautus, hyppäsi
  suoraan `NGA Lagos Metro FM 97.7`:ään osumakohdan (ei nimen
  Clickablen) kautta, kuten Linssiseppä pyysi tarkistamaan.

**Ajoitushuomio (ei varmistettu onko poikkeama):** koko ketju
Siirtymä→Soi kesti n. 2,6 s vapautuksesta (86,18 → 88,80 s peli-
kellossa), ja kamera-ajo Kumasin mastolle NÄYTTI käynnistyvän heti
`Siirtyma`-vaiheen alussa, ei vasta `Lukittuu`-vaiheen jälkeen kuten
pyynnön kuvaus antoi ymmärtää ("vasta sitten kamera lentää mastolle").
En tunne vaihekoneen tarkkaa suunnitelmaa, joten en väitä tätä bugiksi —
Linssisepän kannattaa tarkistaa lokiote (`docs/raportit/kaappaukset/
radio-viivain-20260925/` ei sisällä tätä lokia, mutta linssi-loki.txt-
ote on tässä raportissa yllä olevassa PÄIVITYS-kappaleessa mainitulla
aikavälillä 86,18–88,80).

En pystynyt mittaamaan 1:1-seurantaa kesken pidon: simulaattorin
`touch_path` on yksi suljettu alas→liike→ylös-kutsu, joten en näe
välitiloja kesken vedon — vain lopputuloksen. Kamera ei liikkunut
kummallakaan aiemmalla epäonnistuneella yrityksellä ennen korjausta,
eikä tälläkään kertaa ennen vapautusta (kamera-ajo alkoi vasta
vapautuksen jälkeen molemmilla kerroilla, mikä on oikein).

## PÄIVITYS 2: ajoituskorjaus vahvistettu (linssiseppa/radio-veto @ 263e831, a26b248)

Linssiseppä vahvisti kamera-ajon alkavan irrotuksessa suunnitelman
mukaisesti (ei bugi), mutta korjasi ketjun turhan Siirtymä-vaiheen pois
vedolla tehdyn siirtymän jäljiltä. Käänsin uudelleen
(`juna/b12+linssiseppa/radio-veto` @ 263e831) ja toistin saman
`touch_path`-testin:

- Ketju alkaa nyt SUORAAN `Viritys/Haku` (31,42 s) — **ei enää
  `Viritys/Siirtyma`-vaihetta ennen sitä.**
- `Viritys/Lukittuu` 32,62 s (+1,2 s Haun alusta, lähellä pyydettyä
  "noin 1 s").
- `Soi GHA Kumasi Info Radio Ghana` 32,96 s.
- Kamera-ajo alkaa 31,43 s, samaan aikaan Haun kanssa (irrotuksessa,
  ei kesken vedon) — vahvistettu suunnitelman mukaiseksi.

PASS.

## Seuraava askel

Pyydän Linssiseppää joko a) testaamaan vetoa oikealla sormella oikealla
laitteella (simulaattori riittää, kunhan kosketus on oikea eikä
automaatiota) sen selvittämiseksi onko tämä oikea bugi, tai b) antamaan
minulle tarkemman ohjeen synteettisen vedon tuottamiseksi tälle
nimenomaiselle kontrollille, jos joku muu sessio on onnistunut siinä
aiemmin. En löytänyt tälle linssille erillistä testikomentoa
(`Documents/linssi-komento.txt`:ssä ei ole veto-komentoa viivaimelle,
vain `radio taajuus <0-1>` joka asettaa arvon suoraan hyppäämättä läpi
UI:n kosketuskäsittelyä).
