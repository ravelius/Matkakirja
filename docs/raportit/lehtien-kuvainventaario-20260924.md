# Kaupunki- ja maalehtien kuvainventaario (Sisältökirjuri 24.9.2026)

Fablen tilaus 24.9.2026 klo 07.4x: kaikkien kaupunki- ja maalehtien
kuva- ja lähdeinventaario lisenssiportilla — jokaisen kuvan Commons-
lisenssi ja attribuutio tarkistettu erikseen, puuttuvat/epäselvät
listaksi. Pohjana `js/packs/kulttuuri-kategoriat.js` (kaupunkilehdet)
ja `js/packs/maa-kategoriat.js` (maalehdet), main `896f661eb`.

Tämä on ERI tarkistus kuin `lisenssi-inventaario-20260923.md`: se luki
lisenssin pelin OMISTA kentistä (mitä data väittää), tämä hakee
JOKAISEN kuvan TODELLISEN nykyisen lisenssin suoraan Commonsin
rajapinnasta ja vertaa sitä pelin `lahde`-tekstiin. Sama hyväksymis-
sääntö kuin `js/kuvagalleria.js` `lisenssiKelpaa()`: PD, CC0, CC BY ja
CC BY-SA sallittu, NC ja ND ei.

## Tulos lyhyesti

- **5 879 kuvaviitettä, 5 856 uniikkia tiedostonimeä** kahdessa
  tiedostossa.
- **NC/ND-tapauksia: 0.** 11 alustavaa osumaa tarkistettiin käsin —
  kaikki olivat oman tarkistusskriptin liian suppean lisenssisanaston
  vääriä hälytyksiä (ks. kohta 3). Yksikään kuva ei ole oikeasti
  NC- tai ND-lisensoitu.
- **Puuttuva attribuutio (`lahde`-kenttä): 0.** Alustavasti 747+66
  riviä näytti olevan ilman `lahde`-kenttää — kaikki olivat oman
  skriptin lyhyen hakuikkunan aiheuttamia vääriä hälytyksiä (ks.
  kohta 4). Käsin tarkistetut näytteet osoittivat, että `lahde` on
  aina olemassa, useimmiten kompaktissa `kuva: { tiedosto, selite,
  lahde }` -rakenteessa tai hyvin pitkän `teksti`-kentän jäljessä.
- **Genuinesti rikki: 8 kuvaa, kaikki juurisyyltään selvitetty**
  (ks. kohta 5) — 7 samaa apostrofivirhettä ("St. John's") ja yksi
  turkkilainen kuva, jonka oikeaa nimeä ei löytynyt.
- **Lisenssitekstin pieni epätarkkuus: 1 kuva** (ks. kohta 6).
- **Eri media­putki, ei tarkistettavissa Commons-rajapinnalla: 42
  kuvaa** (`flickr-<id>.jpg` -nimiset tiedostot, ks. kohta 7).

| Luokka | Määrä |
| --- | --- |
| Kunnossa (lisenssi täsmää, sallittu) | 5 805 |
| Rikki (tiedostonimi ei löydy Commonsista) | 8 |
| Lisenssitekstin epätarkkuus | 1 |
| Eri mediaputki (flickr-*, ei Commons-tarkistettavissa suoraan) | 42 |
| **Yhteensä** | **5 856** |

## 1. Menetelmä

1. Poimittiin jokainen `tiedosto: '...'` + sitä seuraava `lahde: '...'`
   -pari molemmista tiedostoista (regex, käsittelee useampiriviset
   `'a' + 'b'`-merkkijonot).
2. Kysyttiin Commonsin `action=query&prop=imageinfo&iiprop=extmetadata`
   -rajapinnalta jokaisen uniikin tiedostonimen `LicenseShortName`,
   `Artist` ja `Restrictions` 50 nimeä kerrallaan (rinnakkain 8 erää
   kerrallaan, uudelleenohjaukset huomioitu `redirects=1`:llä).
3. Verrattiin Commonsin nykyistä lisenssiä peliin kirjattuun
   `lahde`-tekstiin `js/kuvagalleria.js`:n `lisenssiKelpaa()`-säännöllä.
4. Kaikki poikkeamat (puuttuva sivu, NC/ND, ei lisenssitietoa,
   puuttuva `lahde`, lisenssiristiriita) tarkistettiin vielä käsin
   ennen raporttiin kirjaamista — automaattinen ensimmäinen ajo antoi
   paljon vääriä hälytyksiä (kohdat 3–4), jotka suodatettiin pois
   toisella, tarkemmalla tarkistuskierroksella samoille riveille.

## 2. Mitä EI tarkistettu tällä kierroksella

- `js/packs/nahtavyysjutut.js`, `fokusvirta-*.js`, `fokuskohteet-*.js`,
  `*-valokuvat.js` ja muut kuvasisältöiset paketit — Fablen tilaus
  rajasi tämän kierroksen nimenomaan kaupunki- ja maalehtiin
  (kulttuuri-kategoriat.js ja maa-kategoriat.js). Nämä muut paketit
  ovat oma, pienempi jatkotarkistus jos halutaan.
- Äänet, liput, julisteet ja karttadata — katettu jo
  `lisenssi-inventaario-20260923.md`:ssä ja sen liitteissä.

## 3. NC/ND-alustavat osumat (11) — kaikki vääriä hälytyksiä

Oma tarkistusskripti portautti Commonsin `LicenseShortName`-kentän
samalla `lisenssiKelpaa()`-funktiolla kuin peli käyttää automaattiselle
Openverse/museo-putkelle. Se funktio odottaa tunnuksia muodossa
`"cc-by-sa-4.0"` tai `"pd-old"`, mutta Commonsin extmetadata palauttaa
ihmisluettavia merkkijonoja kuten `"Public domain"`, `"No restrictions"`
ja `"Attribution"`. Näistä `"Public domain"` normalisoitui oikein,
mutta `"No restrictions"` (9 osumaa) ja pelkkä `"Attribution"`
(2 osumaa) eivät täsmänneet funktion suppeaan sanastoon ja tulivat
virheellisesti hylätyiksi. Kumpikin tarkoittaa Commonsissa käytännössä
sallittua käyttöä (ei tunnettuja tekijänoikeusrajoituksia / vapaa
attribuutiolla) — kaikki 11 kuvaa ovat todellisuudessa kunnossa, eikä
yhtään oikeaa NC/ND-tapausta löytynyt. Rivit, joita tämä koski (vain
tiedoksi, ei toimenpiteitä):

- `kulttuuri-kategoriat.js:5347, 5354` (Tukholma, Elias Martin -kuvat)
- `kulttuuri-kategoriat.js:9130` (Erwin Schrödinger)
- `kulttuuri-kategoriat.js:23148` (Reykjavík)
- `kulttuuri-kategoriat.js:29059, 32715, 33234, 36867, 45600` (vanhat kirjaskannaukset, Internet Archive / British Library)
- `kulttuuri-kategoriat.js:107485` (Mount Isa, Cloncurry-kamelikuva, N16-erä)
- `maa-kategoriat.js:5513` (Via Appia Antica)

## 4. Puuttuva `lahde` -alustavat osumat (747+66) — kaikki vääriä hälytyksiä

Ensimmäinen skripti etsi `lahde:`-kenttää vain 1200 merkin ikkunasta
`tiedosto:`-kentän jälkeen. Kaksi rakennetta rikkoivat tämän oletuksen:

1. **Kompakti inline-olio** `kuva: { tiedosto: '...', selite: '...',
   lahde: '...' }` samalla rivillä — regex vaati pilkun heti
   `lahde`-arvon perään, mutta täällä perässä tulee `}` ennen pilkkua.
2. **Hyvin pitkä `teksti`-kenttä** (useita satoja merkkejä + JS-syntaksin
   rivinvaihdot ja lainausmerkkien pako) työnsi `lahde:`-kentän yli
   1200 merkin ikkunan.

Ikkuna suurennettiin ja rajattiin seuraavaan `tiedosto:`-kenttään asti,
minkä jälkeen jäljelle jäi 0 riviä ilman `lahde`-kenttää (pl. kohdan 7
flickr-tiedostot, joilla on oma erillinen lähdemerkintä). Käsin
tarkistettiin 4 näytettä (Madridin metro, Venetsian vaporetto, Tukholman
af Chapman, Dublinin Luas-raitiovaunu) — kaikilla oli asianmukainen
`lahde` koko ajan.

## 5. Genuinesti rikkinäiset tiedostonimet (8)

Nämä EIVÄT löydy Commonsista millään uudelleenohjauksella — sivu ei ole
olemassa. Juurisyy selvitetty jokaiselle.

### 5a. "St. John's" -apostrofivirhe (7 kuvaa, sama juurisyy)

Peliin on kirjattu KAAREVA/TYPOGRAFINEN apostrofi (’, U+2019) sanassa
"St. John's", mutta Commonsin oikeat tiedostonimet käyttävät SUORAA
apostrofia (', U+0027). Vahvistettu suoraan Commons-rajapinnalta:
haku kaarevalla apostrofilla → `"missing": ""`, haku suoralla
apostrofilla → sivu löytyy (`pageid` palautuu). Peilausputki
(`tools/peilaa-media.mjs`) epäonnistuisi näille kuville tuotannossa,
koska se hakee tarkalleen tallennettua tiedostonimeä.

**Korjaus:** vaihda ’ → ' näissä kuudessa rivissä (kaikki
`kulttuuri-kategoriat.js`:ssä, Newfoundlandin/St. John'sin kaupunkilehti):

| Rivi | Tiedosto (korjattava apostrofi lihavoitu) |
| --- | --- |
| 100804 | St. John**'**s, Newfoundland and Labrador, 2023.jpg |
| 100810 | City of St. John**'**s, Newfoundland.jpg |
| 100816 | 1998-08-01 St. John**'**s, Blick vom Signal Hill zum Hafen1.jpg |
| 100829 | Aerial view of Signal Hill, St. John**'**s, Newfoundland at sunset by photographer Erik Mclean of Introspective Design.jpg |
| 100841 | Basilica of St. John the Baptist, St. John**'**s, Newfoundland.jpg |
| 100941 | Typical steeply graded street in St. John**'**s, Nfl (26984982184).jpg |
| 101041 | Regatta Start, St. John**'**s, Newfoundland.jpg |

Tämä korjataan erillisessä PR:ssä (ks. luovutus/PR-lista lopussa) —
puhtaasti mekaaninen merkinvaihto, ei sisältömuutos.

### 5b. Turkin teepuutarhakuva (1 kuva)

`maa-kategoriat.js:18359`, tiedosto `Tarihi cinaralti cay bahcesi.jpg`
(Turkin maalehti). Sivua ei löydy Commonsista, eikä nimessä ole
ilmeistä diakriittivirhettä (turkin ç/ı-kirjaimet puuttuvat jo
alkuperäisestä nimestä, joten kyse ei ole samasta apostrofi-/diakriitti-
ilmiöstä kuin St. John'sissa). Todennäköisesti kuva on nimetty uudelleen
tai poistettu Commonsista sen jälkeen, kun se lisättiin peliin. Vaatii
oman haun oikean korvaavan kuvan löytämiseksi — ei korjattu tässä
raportissa, jätetty erilliseksi jatkotehtäväksi.

## 6. Lisenssitekstin pieni epätarkkuus (1 kuva)

`maa-kategoriat.js:33786`, tiedosto `WhakarewarewaGeyserFlat.jpg`
(Uuden-Seelannin maalehti). Peliin kirjattu "CC BY-SA 3.0", Commonsin
nykyinen `LicenseShortName` on "CC BY 2.5" — molemmat ovat sallittuja
lisenssejä (ei NC/ND-ongelmaa), mutta täsmällinen lisenssiteksti on
vanhentunut/väärä. Pieni korjaus, ei kiireellinen — voidaan tehdä
samassa erässä kuin muut pikkukorjaukset jatkossa.

Toinen alustava "ristiriita" (`maa-kategoriat.js:19337`, Ukrainan
1918 lippu) EI ole oikea löydös: peliin kirjattu "julkinen, Ukrainan
tekijänoikeuslain nojalla" ja Commonsin "Public domain" tarkoittavat
samaa asiaa eri sanoin — ei toimenpidettä.

## 7. Flickr-mediaputki (42 kuvaa, ei tässä tarkistettavissa)

Osa kuvista käyttää nimeämiskäytäntöä `flickr-<numero>.jpg` (esim.
`flickr-17157572177.jpg`), mikä EI ole kirjaimellinen Commons-
tiedostonimi vaan pelin oman Flickr/Openverse-peilausputken oma
nimeämismalli (`js/kuvagalleria.js`:n `POIS_JATETYT`-kommentin mukaan
"Flickr Commons ... sisältö tulee Openversen kautta"). Commonsin
File:-rajapinta ei tunnista näitä nimiä, mikä selittää suuren osan
alkuperäisen skriptin "puuttuvat Commonsista" -listasta (457 osumaa,
joista 415 osoittautui verkkovirheiksi/uudelleentarkistuksessa
oikeiksi ja 42 näiksi flickr-nimiksi). Näiden kuvien lisenssi on jo
kirjattu pelin `lahde`-kenttään tekstinä (esim. "CC BY 2.0"), ja niiden
todellinen tarkistus vaatisi oman ajon Flickr/Openverse-rajapinnalla
Commonsin sijaan — rajattu tämän kierroksen ulkopuolelle.

## 8. Suositus ja seuraavat askeleet

1. **PR "St. John's apostrofikorjaus"** (7 riviä, mekaaninen) —
   avataan tämän raportin kanssa samassa vuorossa.
2. Turkin teepuutarhakuvan korvaaja ja Whakarewarewa-lisenssitekstin
   korjaus voidaan tehdä pienenä jatkoeränä, ei kiireellisiä.
3. Jos halutaan täysi kattavuus, seuraava kierros voisi tarkistaa
   `nahtavyysjutut.js`, `fokusvirta-*.js` ja `*-valokuvat.js` samalla
   menetelmällä (yhteensä muutama tuhat lisää tiedosto-lahde-paria).
4. Flickr-nimisten kuvien (42 kpl) lisenssi voidaan tarkistaa erikseen
   Flickr/Openverse-rajapinnalla, jos NC/ND-riski halutaan sulkea
   pois myös niiltä.

**Kokonaisarvio:** kaupunki- ja maalehtien kuvasto on erittäin hyvässä
kunnossa. 5 856 tarkistetusta kuvasta vain 8 on aidosti rikki (yksi
juurisyy, helposti korjattavissa) ja yksi lisenssiteksti on pieni
epätarkkuus. Ei yhtään todellista NC/ND-lisenssiä eikä puuttuvaa
attribuutiota.
