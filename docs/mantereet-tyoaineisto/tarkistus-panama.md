# Panamá-faktapohjan tarkistus

Tarkistettu 6.9.2026 en-Wikipedian raakatekstistä (`action=raw`,
`NODE_USE_ENV_PROXY=1`, uusinnat kasvavalla viiveellä 429-vastausten
varalta) seuraavista artikkeleista: **Panama City**, Panamá Viejo,
Casco Viejo (Panama), History of Panama, Panama Canal, Panama Canal
Railway, Panama hat, Biomuseo, Ancon Hill, Balboa (Panama),
Metropolitan Cathedral of Panama City ja Palacio de las Garzas.
Koordinaatit haettiin `action=query&prop=coordinates`- ja
`list=geosearch`-rajapinnoista suoraan, ei faktapohjan taulukosta, ja
kohteiden väliset etäisyydet laskettiin uudelleen omalla laskennalla.

**MENETELMÄPOIKKEAMA, JOKA ON SANOTTAVA ÄÄNEEN.** Työmalli
(docs/tyolista-opukselle.md, "Työmalli") vaatii, että tarkistaja on eri
agentti kuin kokoaja ja kirjoittaja. Tässä istunnossa ei ollut
käytettävissä Agent-työkalua aliagenttien käynnistämiseen (istunto on
itse aliagentti eikä voi delegoida edelleen), joten tarkistuksen teki
sama agentti kuin kirjoituksen — mutta faktat luettiin lähteistä ENNEN
kirjoittamista ja riippumatta faktapohjan omista sitaateista.
Riippumattomuus on siis menetelmällinen (lähde luettiin uudelleen), ei
organisatorinen. Fablen kannattaa tilata Sonnet-tarkistus jälkikäteen,
jos rooliero halutaan täyteen mittaansa.

**Yleisarvio: faktapohja on huolellinen ja poikkeuksellisen hyvin
lähteistetty. Löysin yhden selvän ylilyönnin (O2:n otsikko), yhden
lähteen omaa varausta ohittavan väitteen (mannerten välinen rautatie)
ja yhden kirjoittamattoman lähderistiriidan (Casco Viejon
perustamisvuosi 1671 vai 1673).** Kaikki tarkistetut vuosiluvut (1519,
1520, 1671, 1673, 1828, 1848, 1850, 1855, 1881, 1889, 1903, 1904, 1906,
1914, 1997, 1999, 2003, 2012, 2014) osoittautuivat riippumattomasti
oikeiksi.

---

## A. VIRHE — O2:n otsikko: rautatie EI maksanut itseään takaisin ennen valmistumistaan

**Väite (O2, otsikko):** "Rautatie joka **maksoi itsensä takaisin**
ennen kuin se valmistui".

**Ongelma:** Lähde (Panama Canal Railway, Construction) sanoo: "By the
time the line was officially completed and the first revenue train ran
over the full length of its grade on January 28, 1855, **more than
one-third** of its $8 million cost had already been paid for from fares
and freight tariffs." Kolmasosa, ei koko hinta. Otsikko on
faktapohjan oma tiivistys, ja se on määrällisesti väärä.

**Suositus:** "Rautatie, joka maksoi kolmasosansa jo ennen
valmistumistaan" — sama yllätys, oikea luku. Itse nostotekstissä
väitettä ei ole, joten korjaus koskee vain otsikkoa.

---

## B. VIRHE — O2: "maailman ensimmäinen mannerten välinen rautatie" ohittaa lähteen oman varauksen

**Väite (O2, proosa ja lähteet):** "maailman ensimmäinen mannerten
välinen rautatie" / "Rata oli maailman ensimmäinen mannerten välinen
(transcontinental) rautatie."

**Ongelma:** Artikkelin oma johdanto sanoo päinvastaisen varauksen
ääneen: rataa kutsuttiin avattaessa **inter-oceanic railroad**
-nimellä, ja "it was **later also described by some** as representing a
'transcontinental' railroad, **despite traversing only the narrow
isthmus** connecting the North and South American continents". Wikipedia
siis nimenomaan sanoo, että transcontinental-nimitys on jälkikäteinen
ja kiistanalainen. Faktapohja esittää sen varauksettomana tosiasiana ja
vieläpä ensimmäisyytenä maailmassa, mitä lähde ei väitä lainkaan.

**Suositus:** Käytä avaamishetken omaa nimeä: **valtamerten välinen
rautatie** — se on lähteen oma sana, se on täsmällinen, ja se on lehden
kannalta jopa parempi (Atlantilta Tyynellemerelle on koko tarinan
ydin). Transcontinental-nimityksen voi jättää kokonaan pois; jos se
otetaan mukaan, on sanottava, että nimitys on myöhempi ja kiistelty.

---

## C. RISTIRIITA, JOTA FAKTAPOHJA EI HUOMANNUT — Casco Viejo: 1671 vai 1673?

Kolme artikkelia antavat kolme eri muotoilua samalle asialle:

- **"Casco Viejo, Panama"** (johdanto ja History): "Completed and
  settled in 1673 … founded on January 21, 1673"; rakennustyöt aloitti
  Antonio Fernández de Córdoba 1672.
- **"Panama City"** (Casco Viejo -osio): "**Built and settled in 1671**
  after the destruction of Panama Viejo".
- **"Panama City"** (History): "The city was rebuilt **in 1673** in a
  new location approximately 5 mi (8 km) southwest of the original
  city."

Saman artikkelin sisällä on siis kaksi eri vuotta. Faktapohja käyttää
1673:a (oikein, koska se on tarkempi ja päivämäärällinen), muttei
mainitse ristiriitaa lainkaan.

**Suositus:** Käytä 1673:a ja 21. tammikuuta. Ristiriita kannattaa
kirjata lehden lohkokommenttiin, koska se on juuri sitä lajia, josta
resepti käskee sanoa, kumpi lähde valittiin ja miksi.

---

## D. Kolme kohtaa, jotka lähde sanoo hieman eri tavalla

1. **K2, kaupungin uusi paikka.** Faktapohjan proosa sanoo "noin
   kahdeksan kilometrin päähän **lännemmäs**"; lähde sanoo
   "approximately 5 mi (8 km) **southwest**", ja faktapohjan oma
   lähdeluettelo sanoo oikein "lounaaseen". Korjaa proosa lounaaksi.
   (Panamá Viejon oma artikkeli sanoo epämääräisemmin "a few kilometres
   to the west" — 8 km lounaaseen on tarkempi ja päivämäärällisen
   lähteen mukainen, joten se voittaa.)
2. **K2, tulipalon sytyttäjä.** Faktapohja: "joko puolustajat itse tai
   Morganin miehet sytyttivät kaupungin tuleen". Panamá Viejon
   artikkeli asettaa vaihtoehdot toisin: "Either Morgan and his army
   started a fire … **or the Captain General Emanuel Gonzalez Revilla
   ordered the explosion of the gunpowder magazines**", ja päättää:
   aikalaiskertomukset "strongly support the story that it was burned by
   its inhabitants". Casco Viejon artikkeli taas väittää suoraan, että
   kuvernööri Juan Perez de Guzmán poltatti kaupungin — mutta tuo virke
   kantaa Wikipedian oman `{{fact}}`-merkinnän. Faktapohjan
   "molemmat syyttivät toisiaan" on siis oikeansuuntainen tiivistys,
   mutta ruutitornien räjäytys on parempi ja lähteen oma yksityiskohta.
3. **K4, hattujen vienti.** Faktapohja: "hattuja vietiin Yhdysvaltoihin
   220 000 kappaletta vuodessa **Panaman kautta**". Lähde: "export of
   woven straw hats **from Ecuador/Panama** to the United States also
   increased to 220,000 per year by 1850." Reittiä ei sanota. Kirjoita
   "Ecuadorista ja Panamasta".

---

## E. Vahvistettu erityisen huolella

- **Perustaminen 15.8.1519 Pedro Arias de Ávilan (Pedrarias Dávilan)
  toimesta**, kaupunki lähtöpisteenä Perun valloitukselle ja kullan ja
  hopean kauttakulkupaikkana Espanjaan. Vahvistettu sekä johdannosta
  että History-osiosta. **Genovalaiset kauppiaat 1520**: "In 1520,
  Genoese merchants controlled the port and the commerce of the region,
  mainly for the slave trade, thanks to a concession given by the
  Spaniards, who had the Republic of Genoa as its main banking base."
  Sanatarkasti vahvistettu.
- **Morgan 28.1.1671, 1 400 miestä, yhdeksän päivän marssi.**
  Vahvistettu sanatarkasti Panamá Viejon History-osiosta. Lisäksi
  vahvistui faktapohjasta puuttuva luku: kaupungissa oli 1670 noin
  10 000 asukasta. Morganin oman raportin 400 espanjalaisuhria
  vahvistettu; Morgan pidätettiin mutta vapautettiin ja palkittiin,
  koska hän ei ollut tiennyt Madridin sopimuksesta (1670).
- **Kolme tulipaloa 1700-luvulla**, nykyisen ilmeen synty 1800-luvun
  lopulta 1900-luvun alkupuolelle, uusklassinen ja afro-antillilainen
  kerros raunioiden joukossa, ero Cartagenaan ja Quitoon. Vahvistettu
  sanatarkasti.
- **Unesco 1997 (Panamá Viejo), laajennus 2003 (Casco Viejo)**,
  perustelu "oldest continuously occupied European settlement in the
  Pacific coast of the Americas", kohteen virallinen nimi
  "Archaeological Site of Panamá Viejo and Historic District of
  Panamá". Vahvistettu. **Cinta Costera 3** (Martinelli, 2014) ja
  Unescon päätös 28.6.2012 olla lisäämättä kohdetta vaarassa olevien
  listalle: vahvistettu, joskin viimeksi mainittu kantaa artikkelissa
  `{{Citation needed}}`-merkinnän — se on hyvä tietää mutta ei estä
  käyttöä, koska väite on neutraali ja päivätty.
- **Casco Antiguon noin 800 rakennusta** ja **kansallisteatteri 1908**
  vahvistettu. Lisäksi vahvistui erinomainen, faktapohjasta puuttuva
  yksityiskohta: San Josén kirkon **kultainen alttari** on yksi harvoja
  Panamá Viejosta pelastettuja esineitä — se haudattiin mutaan
  piirityksen ajaksi ja salakuljetettiin sitten uuteen kaupunkiin.
- **Kannaksen ylitys ennen rautatietä:** uurrovene Chagres-jokea pitkin,
  viimeiset 20 mailia (32 km) muulilla vanhoja espanjalaisia polkuja,
  polut rapistuneet noin 50 vuoden hoitamattomuuden jäljiltä, matka
  neljästä kahdeksaan päivään, trooppiset taudit. Vahvistettu
  sanatarkasti (Panama Canal Railway).
- **Rautatie:** viimeinen kisko 27.1.1855 sateisena keskiyönä,
  valaanöljylamppujen valossa, pääinsinööri George M. Totten
  yhdeksän naulan lekalla; ensimmäinen juna mereltä merelle
  seuraavana päivänä; kustannus yli 8 miljoonaa dollaria eli
  kahdeksankertaisesti vuoden 1850 arvio; arvioidut kuolonuhrit
  5 000–10 000 (yhtiö ei pitänyt kirjaa); ranskalainen Compagnie
  Universelle du Canal Interocéanique osti enemmistöosuuden 1881.
  Kaikki vahvistettu. **HUOM:** vuoden 1852 kolera tappoi lähes koko
  Tottenin oman esikunnan, 51 henkeä — hyvä konkretia, jota
  faktapohjassa ei ole.
- **Kannaksen ylittäjien määrä 1848–1869** (faktapohjasta puuttuu,
  mutta on 1873-kulman kannalta erinomainen): "about 375,000 people
  crossed the isthmus from the Atlantic to the Pacific, and 225,000 in
  the opposite direction. This traffic greatly increased the prosperity
  of the city during that period." (Panama City, History.)
- **Ranskan yritys:** kaivutyöt alkoivat 1.1.1881 Ferdinand de
  Lesseps'n johdolla; kuolonuhreja 1881–1889 yli 22 000, joista jopa
  5 000 ranskalaisia; konkurssi 1889 noin 287 miljoonan dollarin
  jälkeen; 800 000 pienisijoittajan säästöt menetettiin. Vahvistettu.
- **Yhdysvallat:** osti ranskalaisten kaluston, kaivannot ja Panama
  Railroadin 1904 40 miljoonalla dollarilla. Vahvistettu.
- **Sulkukanava:** Gatún-tekojärvi on 26 metriä merenpinnan
  yläpuolella (johdanto) ja Gatúnin sulut nostavat laivat noin 87
  jalan (26 m) korkeuteen (Layout). Miraflores on kaksivaiheinen ja sen
  kokonaislasku on 54 jalkaa (16 m) keskiveden aikaan. Kaikki
  vahvistettu — faktapohjan 26 metriä ja 54 jalkaa ovat oikein.
- **Avaaminen 15.8.1914 rahtilaiva SS Anconin kulkiessa läpi**,
  401 vuotta Balboan ylityksen jälkeen, Yhdysvaltain kustannus lähes
  500 miljoonaa dollaria. **Täysi panamalainen hallinta keskipäivällä
  31.12.1999**, jolloin Panama Canal Authority (ACP) otti kanavan
  hoitoonsa. Kaikki vahvistettu sanatarkasti.
- **Panama-hattu:** termi painetussa tekstissä 1828 (kaksi lähdettä,
  vanhin *Useful Hints to Travellers* 1828); Kalifornian kultaryntäys
  ja kannaksen ylittäjien auringonsuojan tarve; vienti 220 000 hattuun
  vuodessa vuoteen 1850 mennessä; Roosevelt kuvattuna hattu päässä
  kanavatyömaalla 1906. Vahvistettu.
- **Biomuseo:** Frank Gehryn suunnittelu, hänen ensimmäinen työnsä
  Latinalaisessa Amerikassa, suunnittelu alkoi 1999, museo avattiin
  **2.10.2014**, sijainti Amadorin aallonmurtajalla kanavan
  eteläsuulla. Vahvistettu.
- **Ilmasto:** Köppen Aw (trooppinen savanni), "a little drier than a
  tropical monsoon climate", noin 1 900 mm sadetta vuodessa, sadekausi
  toukokuusta marraskuuhun, kuiva kausi joulukuusta huhtikuuhun,
  lämpötila noin 27 °C ympäri vuoden, ITCZ pitää taivaan lähes
  jatkuvasti pilvisenä. Vahvistettu. Sääruudun (1991–2020) omat luvut:
  vuoden keskilämpö 27,2 °C, keskimääräinen ylin 32,1 °C ja alin
  22,3 °C, huhtikuu kuumin (ylin 33,4 °C), tammikuu viilein (alin
  21,4 °C), sademäärien kuukausisumma 1 959 mm, auringonpaiste 31 %
  (kesäkuu JA lokakuu) – 70 % (helmikuu). **Pieni tarkennus
  faktapohjaan:** minimi 31 % osuu kahdelle kuukaudelle, ei vain
  lokakuulle.
- **San Felipe (Casco Viejo) 1 258 asukasta 0,3 km²:llä**, tiheys
  4 089 as./km². Vahvistettu corregimiento-taulukosta.
- **Ancón-kukkulan korkeus 199 metriä** (infobox). Vahvistettu; tätä
  lukua ei ole faktapohjassa, ja se on hyvä nostoon. Vahvistui myös,
  että Morganin tiedustelijat kiipesivät juuri Ancónille katsomaan
  kaupungin puolustusta 1671 ja että kukkula on nykyään suojeltu:
  siellä näkee laiskiaisia, valkokuonokoatteja, yhdeksänvyötäisiä
  vyötiäisiä ja Geoffroyn tamariineja.

---

## F. Kohdekartta: faktapohjan taulukko ei kelpaa sellaisenaan

Faktapohja myöntää itsekin, että kolme ensimmäistä kohdetta ovat "alle
200 metrin sisään toisistaan". Mittasin välit uudelleen rajapinnan
omista koordinaateista:

- Casco Viejo (8,9525 / −79,5350) ja Metropolitan Cathedral
  (8,9525 / −79,5352) — **22 metriä**.
- Panama Canal Museum (8,95194 / −79,53472) ja katedraali — **83
  metriä**.
- Palacio de las Garzas (8,953966 / −79,534364) ja katedraali — **187
  metriä**.
- Museum of History of Panama (8,9520441 / −79,534914) ja katedraali —
  **52 metriä**.

Casco Viejon ydin ei siis kanna kuin YHDEN kartan kohteen, koska koko
vanhakaupunki on 300 metriä leveä. Lisäksi Panamá Viejo (9,00556 /
−79,48583) on 5,4 kilometriä itään ja Miraflores (8,99679 / −79,59182)
6,4 kilometriä luoteeseen Casco Viejosta; molempien ottaminen samaan
ruutuun vaatisi lähes kymmenen kilometrin rajauksen, jonka keskellä
olisi enimmäkseen lahtea ja moottoritietä.

Tein geohaun (`list=geosearch`, 4 km) Casco Viejon ympäriltä ja
löysin riittävästi vaihtoehtoja tiiviin mutta väljästi jakautuvan
kartan tekemiseen. Kirjoittajan kannattaa rakentaa kartta Casco
Viejosta Ancónin kautta Balboan ja Amadorin suuntaan (noin 4,5 km
ruutu) ja jättää Panamá Viejo ja Miraflores kartan ulkopuolelle
kirjattuna perusteluna — molemmat ovat lehden omien nostojen aiheita
(K1 ja O4), joten ne eivät kuuluisi kartalle muutenkaan.

Käyttökelpoiset, yli 200 metrin päässä toisistaan olevat kohteet
(koordinaatit rajapinnasta 6.9.2026):

| Kohde | lat | lon |
|---|---|---|
| Palacio de las Garzas | 8.953966 | −79.534364 |
| Santa Ana | 8.9571006 | −79.5421148 |
| Way On -hautausmaa | 8.953333 | −79.546111 |
| Ancón-kukkula | 8.957278 | −79.549444 |
| Afroantillilainen museo | 8.963 | −79.5392 |
| Smithsonianin trooppinen tutkimuslaitos | 8.9624308 | −79.5525621 |
| Balboa | 8.95 | −79.566667 |
| Amerikkojen silta | 8.943056 | −79.565 |
| Biomuseo | 8.9325 | −79.5449 |
| Fort Amador | 8.938056 | −79.547778 |

---

## G. Commons-kategoriat: faktapohjan mittaukset pitävät, mutta yksi väite on liian jyrkkä

Faktapohja sanoo, että `Category:Panama Canal Museum`,
`Category:Parque Natural Metropolitano`, `Category:Coat of arms of
Panama City` ja `Category:Gatún Locks` "palauttivat missing eikä niille
löytynyt korvaajaa **tämän faktapohjan puitteissa**". Muotoilu on
rehellinen (se rajaa väitteen omaan hakuunsa), ja se on hyvä — mutta
kirjoittajan on syytä tietää, että Commonsin kategorianimet ovat tässä
kaupungissa poikkeuksellisen arvaamattomia: oikea Casco Viejon
kategoria on `Category:Historic District of Panamá`, ei mikään
espanjankielisistä muodoista. Sama varovaisuus on syytä ulottaa
kaikkiin arvattuihin nimiin: hae `list=search&srnamespace=14`, älä
arvaa.

---

## H. Sisältölinjaukset

- **Ei nykypolitiikkaa.** Vahvistin, että "Panama Canal" -artikkelin
  21st century -osio ja "History of Panama" -artikkelin Military
  dictatorship -osio sisältävät molemmat aineistoa, joka rikkoisi
  linjausta. Faktapohja on jättänyt ne pois oikein perustein.
  Sama koskee "Panama City" -artikkelin mainintoja rahanpesusta ja
  vuoden 1989 invaasiosta sekä El Chorrillon palamisesta.
- **Orjakauppa ja cimarronit** kerrotaan tapahtumina neutraalisti
  (pilari 4). Genovalaisten orjakauppakonsessio 1520 on kerrottava
  suoraan; se on kaupungin talouden perusfakta eikä sitä saa
  kaunistella pois.
- **Alkuperäiskansat.** Faktapohjan huomio 8 pitää paikkansa: Panama
  Cityn omalla alueella en-Wikipedia tarjoaa niukasti aineistoa
  elävästä alkuperäiskansakulttuurista. Pilarin 1 kannalta paras
  käytettävissä oleva aines on cimarroniyhteisöt (kohta H2) ja
  1582 sopimus — ne kuvaavat toimijuutta eivätkä uhriutta.

---

## Yhteenveto korjattavista kohdista

### PAKOLLISET KORJAUKSET

1. **[VIRHE] O2:n otsikko:** rautatie maksoi valmistuessaan takaisin
   yli kolmasosan, ei koko hintaansa. Ks. kohta A.
2. **[VIRHE] O2:** "maailman ensimmäinen mannerten välinen rautatie"
   ohittaa lähteen oman varauksen — käytä avaamishetken nimeä
   "valtamerten välinen rautatie". Ks. kohta B.
3. **[RISTIRIITA] K3:** Casco Viejon perustamisvuosi on lähteissä sekä
   1671 että 1673; käytä 1673:a (21.1.1673) ja kirjaa ero
   lohkokommenttiin. Ks. kohta C.
4. **[KARTTA] Osio 4:** neljä kohdetta on alle 200 metrin päässä
   toisistaan ja kaksi yli 5 km:n päässä ytimestä — käytä kohdan F
   taulukkoa. Ks. kohta F.

### MUOTOILUKORJAUKSET

5. K2: "lännemmäs" → "lounaaseen" (lähde: 5 mi / 8 km southwest).
6. K2: tulipalon toinen vaihtoehto on lähteessä ruutitornien
   räjäyttäminen, ei "Morganin miehet" — tarkenna tai jätä syyllinen
   auki lähteen omalla tavalla.
7. K4: "Panaman kautta" → "Ecuadorista ja Panamasta".
8. Osio 5: auringonpaisteen minimi 31 % osuu kesäkuulle JA lokakuulle.

---

## Kelpaako-tuomio

**KELPAA KORJAUSTEN JÄLKEEN.** Faktapohja on erittäin tarkka: 19
tarkistettua vuosilukua osui kaikki kohdalleen, ja sen omat
lähdeviittaukset ovat lähes poikkeuksetta sanatarkkoja. Kaksi
korjattavaa kohtaa (A ja B) ovat molemmat samassa nostossa O2 ja
molemmat samaa lajia: lähteen varauksellinen muotoilu on tiivistetty
varauksettomaksi ylistykseksi. Kohdekartan taulukko on ainoa, joka
vaatii oikeasti uudelleentekoa. Kirjoitusvaihe voi edetä, kun nämä on
otettu huomioon.
