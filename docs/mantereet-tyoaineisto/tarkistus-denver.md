# Denver-faktapohjan tarkistus

Tarkistettu **6.9.2026** en-Wikipedian raakatekstistä
(`index.php?action=raw`, `NODE_USE_ENV_PROXY=1`, uusinnat kasvavalla
viiveellä) ja laajennusrajapinnasta (`action=query&prop=extracts`).
Tarkistus on **menetelmällisesti erillinen vaihe**: lähteet luettiin
uudelleen alkuperäisistä latauksista eikä faktapohjan omiin
sitaatteihin luotettu. Väitteet haettiin `grep -o` -täsmähaulla
sanatarkkoina merkkijonoina, jotta lainaus ei voi liukua.

Luetut artikkelit: **Denver**, **History of Denver**, **Kansas
Pacific Railway**, **Pike's Peak gold rush**, **Red Rocks
Amphitheatre**, **Colorado State Capitol**, **Arapaho**,
**Cheyenne**, Denver Art Museum, Molly Brown House, Denver Botanic
Gardens, Coors Field, Brown Palace Hotel (Denver), Daniels & Fisher
Tower, Denver Performing Arts Complex, Cathedral Basilica of the
Immaculate Conception (Denver), Larimer Square, Confluence Park,
Denver Public Library, Denver Civic Center, Front Range.
Koordinaatit haettiin itse (`prop=coordinates&redirects=1`) ja
etäisyydet laskettiin itse koordinaattieroista.

**Yleisarvio: faktapohja kelpaa kirjoituksen pohjaksi kahden
korjauksen jälkeen.** Numerot, päivämäärät ja koordinaatit täsmäsivät
lähteisiin poikkeuksellisen tarkasti. Yksi selvä asiavirhe (kohta A)
ja yksi lähdeviite-epätarkkuus (kohta B) on korjattava ennen
kirjoittamista; loput ovat tarkennuksia ja lisäyksiä.

---

## A. ASIAVIRHE (pakollinen korjaus) — arapahojen nykyiset yhteisöt

**Faktapohjan väite (K1):** "arapahoja on nykyisin **kolmessa**
tunnustetussa yhteisössä — Northern Arapaho Tribe (Wind Riverin
reservaatti, Wyoming) sekä Cheyenne and Arapaho Tribes (Oklahoma)."

**Lähde ("Arapaho", johdanto), sanatarkasti:** *"Since 1878, the
Northern Arapaho have lived with the Eastern Shoshone on the Wind
River Reservation in Wyoming and are federally recognized as the
Northern Arapaho Tribe of the Wind River Reservation. The Southern
Arapaho live with the Southern Cheyenne in Oklahoma. Together, their
members are enrolled as the federally recognized Cheyenne and
Arapaho Tribes."*

**Ongelma:** liittovaltion tunnustamia yhteisöjä on **kaksi**, ei
kolme — ja faktapohjan oma luettelo nimeääkin vain kaksi. Luku
"kolmessa" on siis ristiriidassa oman luettelonsa kanssa.

**Korjaus:** "kahdessa liittovaltion tunnustamassa yhteisössä".
Lisäksi lähde antaa täsmällisen alkuvuoden 1878 ja mainitsee, että
Northern Arapaho asuu Wind Riverin reservaatissa yhdessä itäisten
shoshonien kanssa — molemmat kannattaa ottaa mukaan.

---

## B. LÄHDEVIITE-EPÄTARKKUUS (korjattava) — kultalöydön ajankohta

**Faktapohjan väite (K1):** "Marraskuussa 1858 löydetty kulta toi
ryntäyksen…" ja (K2) "Kesällä 1858 Pikes Peakin kultaryntäyksen
aikaan…"

**Lähteet ovat eri mieltä:**
- "Denver" (History): *"the discovery in November 1858 of gold in the
  Rocky Mountains in Colorado … brought on a gold rush"*.
- "Pike's Peak gold rush": ryntäys *"began in July 1858"*, ja
  **ensimmäinen merkittävä kultalöytö Kalliovuorten alueella oli
  Green Russellin ryhmän löytö heinäkuun ensimmäisellä viikolla
  1858** Little Dry Creekin suulla (nykyisen Englewoodin alueella,
  Denverin esikaupungissa). Löytö oli noin 20 troy-unssia (620 g),
  silloiselta arvoltaan noin 380 dollaria, ja *Kansas City Journal of
  Commerce* julisti sen 26.8.1858 otsikolla "THE NEW ELDORADO!! GOLD
  IN KANSAS!!". Ryntäykseen osallistui arviolta **100 000**
  kullanetsijää, ja se kesti suunnilleen Coloradon territorion
  perustamiseen 28.2.1861 asti.

**Ongelma:** faktapohja käyttää molempia päivämääriä eri nostoissa
selittämättä eroa. Yleisartikkeli on karkeampi; erikoisartikkeli on
tarkempi ja antaa löydölle päivämäärän, paikan ja määrän.

**Korjaus (ennakkotapaus v925/v932: tarkempi lähde voittaa):**
käytä heinäkuuta 1858 ja Green Russellin löytöä, ja jos marraskuu
1858 mainitaan, kerro se yleisartikkelin karkeampana muotoiluna.
Suositeltava lisäys nostoon K2: Russellin ryhmän 20 unssia ja
sanomalehden otsikko ovat elävää ja tarkistettua aineistoa.

---

## C. Tarkennus — Denverin perustamispäivä

Faktapohja on tunnistanut oikein, että "Denver"-artikkelin
leipätekstissä on `{{contradictory inline}}`-merkintä: leipäteksti
sanoo 22.11.1858, merkintä kertoo tietolaatikon sanovan 17.11.1858.
Tarkistin merkinnän olemassaolon raakatekstistä — se on siellä
sanatarkasti (*"reason=Infobox says city was founded on November
17"*). **Faktapohjan ratkaisu ("marraskuussa 1858") on oikea.**

---

## D. Vahvistetut luvut (täsmähaku raakatekstistä, kaikki OK)

| Väite | Lähde | Tulos |
|---|---|---|
| "around 3,100 hours of sunshine per year" | Denver, Climate | ✔ sanatarkka |
| korkeusvaihtelu 5 130–5 690 jalkaa | Denver, Geography | ✔ sanatarkka |
| keskusta n. 12 mailia Kalliovuorten juurelta | Denver, Geography | ✔ sanatarkka |
| heinäkuun keskimääräinen ylin 89,9 °F | Denver, Climate | ✔ sanatarkka |
| joulukuun keskimääräinen ylin 44 °F | Denver, Climate | ✔ sanatarkka |
| 90 °F saavutetaan 38 päivänä vuodessa | Denver, Climate | ✔ sanatarkka |
| lumi 53,5 tuumaa (1981–2010) | Denver, Climate | ✔ sanatarkka |
| lumen ikkuna 17.10.–27.4. | Denver, Climate | ✔ sanatarkka |
| ennätykset −29 °F 9.1.1875 ja 105 °F 28.6.2018 | Denver, Climate | ✔ sanatarkka |
| kolme kalleinta raekuuroa 11.7.1990, 20.7.2009, 8.5.2017 | Denver, Climate | ✔ sanatarkka |
| City Park 314 eekkeriä | Denver, Parks | ✔ sanatarkka |
| Denver Pacific perustettu 19.11.1867 | History of Denver | ✔ |
| 900 000 eekkerin maalahjoitus | History of Denver | ✔ |
| rakennustyöt alkoivat 18.5.1868 | History of Denver | ✔ |
| ensimmäinen juna Cheyennestä 24.6.1870 | History of Denver | ✔ |
| Kansas Pacific elokuussa 1870 | History of Denver | ✔ |
| Comanche Crossing / Strasburg 15.8.1870 | Kansas Pacific Railway | ✔ |
| sata uutta asukasta päivässä 1870-luvulla | History of Denver | ✔ |
| väkiluku 4 759 (1870) → yli 35 000 (1880) | History of Denver | ✔ |
| 1 067 kävijää ja 13 000 000 naulaa rahtia ensimmäisenä kuukautena | History of Denver | ✔ |
| Fort Laramie 1851, Fort Wise 18.2.1861, yli 90 % maista | Denver, History | ✔ |
| territorion pääkaupunki 9.12.1867 | Denver, History | ✔ |
| Colorado unioniin 1.8.1876, pääkaupunki vahvistettiin 1881 | Denver, History | ✔ |
| osavaltiotalo avattiin marraskuussa 1894, Elijah E. Myers | Colorado State Capitol | ✔ |
| Red Rocks 9 525 paikkaa, Ship Rock / Creation Rock / Stage Rock | Red Rocks Amphitheatre | ✔ |
| Denver osti alueen 1927 hintaan 54 133 dollaria | Red Rocks Amphitheatre | ✔ |
| amfiteatteri vihittiin 15.6.1941, Helen Jepson | Red Rocks Amphitheatre | ✔ |
| Fountain-muodostuma, Laramide-orogenia, hapettuneet mineraalit | Red Rocks Amphitheatre | ✔ |
| vuoristopuistoja noin 14 000 eekkeriä | Denver, Parks | ✔ |
| Winter Park 67 mailia länteen | Denver, Parks | ✔ |
| puistot kasteltiin city ditchin South Platte -vedellä | Denver, Parks | ✔ |
| Park Score 2022: 18. paras, 89 % kymmenen minuutin päässä | Denver, Parks | ✔ |
| virallinen sääasema lentokentällä ~20 mailia keskustasta | Denver, Climate | ✔ |
| 50,2 °F vs. 53,0 °F ja kiista mittauspaikasta | Denver, Climate | ✔ |

---

## E. Koordinaatit ja etäisyydet (tarkistettu itse)

Kaikki kahdeksan kohdekartan koordinaattia haettiin uudelleen
`prop=coordinates`-rajapinnasta ja täsmäsivät faktapohjan lukuihin
viidennen desimaalin tarkkuudella. Etäisyydet laskettiin itse
(asteet × 111,32 km; pituusasteille cos(39,74°) ≈ 0,769):

- Coors Field ↔ Daniels & Fisherin torni: **866 m**
- Daniels & Fisherin torni ↔ esittävän taiteen keskus: **471 m**
  (pienin väli)
- Esittävän taiteen keskus ↔ Brown Palace: **880 m**
- Brown Palace ↔ katedraalibasilika: **623 m**
- Katedraalibasilika ↔ Molly Brownin talo: **327 m**
- Katedraalibasilika ↔ taidemuseo: **721 m**
- Taidemuseo ↔ Molly Brownin talo: **739 m**
- Molly Brownin talo ↔ kasvitieteellinen puutarha: **1 703 m**

**200 metrin sääntö ei pudota yhtään kohdetta.** Faktapohjan
pudotusperustelut tarkistettiin ja ne pitävät: Denver Public Library
on 190 m ja Byers–Evans House 137 m taidemuseosta, Denver Civic
Center 251 m. Larimer Square on 373 m Daniels & Fisherin tornista —
sen pudotusperuste on kuitenkin ensisijaisesti aihetoisto (Larimerin
valtaus = nosto K2), ei etäisyys.

**Rajaus** pohjoinen 39,7600 / etelä 39,7280 / länsi −105,0030 / itä
−104,9550 kattaa kaikki kahdeksan pistettä reilulla marginaalilla;
laskin koon: **3,56 × 4,11 km.**

---

## F. Puuttuvat koordinaatit — huomio kirjoittajalle

`prop=coordinates` EI palauttanut koordinaatteja artikkeleille
"Denver Union Station" eikä "Colorado State Capitol" (rajapinta
vastasi molempiin, mutta koordinaattikenttää ei ollut haetussa
vastauksessa). Molemmat on joka tapauksessa pudotettu kartalta
aihesyistä, joten tällä ei ole vaikutusta. **Colorado State Capitol
-artikkelin raakatekstissä koordinaatit kuitenkin ovat**
(`{{coord|39.7392321|-104.9848677|…}}`) — jos osavaltiotalo joskus
halutaan kartalle, luku on tuo.

---

## G. Pilarien ja spec-mantereet.md:n tarkistus

1. **Pilari 1 / alkuperäiskansat.** Nosto K1 on rakennettu oikein:
   kansat ennen kaupunkia, sopimusten kiista lähteen omalla
   sanamuodolla, ja nykypäivä. **Lisäysvaatimus:** kansojen omat
   nimet on syytä kertoa — arapahojen autonyymi on *Hinono'eino* /
   *Inun-ina* ("meidän ihmisemme" tai "meidän lajimme ihmiset"), ja
   tšeijennit ovat *Tsétsėhéstȧhese*. Lähde: "Arapaho" ja "Cheyenne"
   (johdanto). Tämä on spec-mantereet.md:n linjaus 1
   ("kansan oma nimi ja oma ääni ennen siirtomaanimiä") eikä sitä saa
   ohittaa.
2. **Sand Creek.** Faktapohjan ohje (yksi neutraali virke, ei
   yksityiskohtia, ei uhrilukua) on Raamatun pilarin 4 mukainen.
   Tarkistin lähteen sanamuodon: "Denver"-artikkeli käyttää sanaa
   *"brutal"* — sitä ei toisteta, koska adjektiivi ei ole tosiasia
   vaan arvio.
3. **Poisjätöt.** Rocky Flats, Ku Klux Klan, Soapy Smithin
   korruptio ja vuoden 1972 olympiapäätös on perustellusti jätetty
   pois. Hyväksyn.
4. **Kultakupoli-varoitus (faktapohjan kohta 6) on aiheellinen.**
   Luin "Colorado State Capitol" -artikkelin läpi: siinä ei ole
   väitettä lehtikullan yhteydestä kultaryntäykseen. `js/packs/
   northamerica-valokuvat.js`:n vanha kuvateksti ei ole
   Wikipedia-katetta. **Älä toista.**
5. **Minitehtävä.** Ehdotettu kysymys (Red Rocksin punaisen värin
   syy) ei osu yhteenkään viidestä visakysymyksestä. Vastaus
   "hapettuneet mineraalit" on lähteessä sanatarkasti ja se on
   samalla sivulla nostossa L3. **Hyväksytty.**

---

## H. Kirjoittajan muistilista (tarkistuksen tuottamat sitovat ohjeet)

1. Arapahot: **kaksi** liittovaltion tunnustamaa yhteisöä, Wind
   River yhdessä itäisten shoshonien kanssa vuodesta 1878.
2. Kultalöytö: **heinäkuu 1858**, Green Russellin ryhmä, noin 20
   troy-unssia Little Dry Creekin suulla; arviolta 100 000
   kullanetsijää. Marraskuu 1858 on yleisartikkelin karkeampi luku.
3. Perustaminen: **"marraskuussa 1858"**, ei tarkkaa päivää.
4. Rautatie: **molemmat** päivämäärät (24.6.1870 Cheyenne,
   elokuu 1870 Kansas; kiskojen liitos Strasburgissa 15.8.1870).
5. Osavaltiotaloa **ei ollut** 1873; mailin merkki on nykypäivää.
6. Korkeusharjoittelun happifysiologiaa **ei kirjoiteta**
   Wikipedia-katteisena.
7. Kupolin lehtikulta–kultaryntäys-yhteyttä **ei toisteta**.
8. Kansojen omat nimet mukaan (Hinono'eino, Tsétsėhéstȧhese).
9. Säärivi jää pois (Open-Meteo 429); oppaan sääjakso sanoo
   lähteensä ääneen.
