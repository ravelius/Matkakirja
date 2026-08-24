# Christchurch — faktantarkistus

Riippumaton tarkistus faktapohjalle `faktapohja-christchurch.md`. Lähteet
tarkistettu **24.8.2026** en-Wikipediasta (`action=raw`,
`NODE_USE_ENV_PROXY=1`; yksi peräkkäinen hakujono, kasvava viive
429-vastauksilla — muutama haku Commonsin kategoriahakuun osui 429:ään ja
onnistui uusintayrityksellä). Faktapohjan omia lähdeviitteitä ei ole
hyväksytty sellaisenaan — jokainen väite on haettu uudelleen alkuperäisistä
artikkeleista: "Christchurch", "2010 Canterbury earthquake", "2011
Christchurch earthquake", "Christ Church Cathedral, Christchurch",
"Cardboard Cathedral", "Ngāi Tahu Claims Settlement Act 1998", "Ngāi Tahu",
"Canterbury Association", "Hagley Park, Christchurch", "Christchurch
Botanic Gardens", "Avon River / Ōtākaro", "Riccarton, New Zealand",
"Southern Alps", "Canterbury Plains", "Canterbury Region" sekä
kohdekarttarivien artikkelit (Cathedral Square, Victoria Square, New
Regent Street, Christchurch Art Gallery, Canterbury Museum). Lisäksi
`js/packs/oceania-questions.js`:n `christchurch`-visa ja -faktarivit
luettu suoraan koodista, ja 18 Commons-kategoriaa tarkistettu olemassa
oleviksi `action=query`-kutsulla.

**Yleisarvio ensin:** faktapohja on numerotarkkuudeltaan poikkeuksellisen
hyvä. Riippumaton tarkistus vahvisti sanasta sanaan mm. kaikki
tarkistetut koordinaatit (9/9, etäisyyslaskelmatkin täsmäsivät), Ngāi
Tahun 1998-sopimuksen luvut ja vuodet, katedraalin koko rakennus- ja
korjaushistorian vuosiluvut, ilmastoluvut, pyöräilytilastot ja
merkkimäärät. Kolme todellista, konkreettista virhettä löytyi kuitenkin —
yksi niistä osuu koko koosteen painavimpaan yksittäiseen nostoon
(helmikuun 2011 järistys) ja sisältää sekä väärän luvun että sisäisen
ristiriidan oman faktalistan kanssa.

---

## 1. VIRHE: H2-noston otsikko väittää järistyksen kestäneen "kolmetoista sekuntia" — lähde sanoo noin kymmenen

**H2-noston otsikko:** *"Kolmetoista sekuntia joka muutti kaiken"*
(historia-sivu, helmikuun 2011 järistys).

En-Wikipedia "2011 Christchurch earthquake" sanoo täsmällisesti: *"While
the initial quake only lasted for approximately 10 seconds, the damage
was severe because of the location and shallowness of the earthquake's
focus in relation to Christchurch..."* — eli **noin 10 sekuntia**, ei 13.
Lukua "13" ei löydy myöskään faktapohjan omasta H2:n Faktat-listasta:
siellä ei mainita kestoa lainkaan, joten otsikon numero on jäänyt kokonaan
faktakurin ulkopuolelle (resepti vaatii JOKAisen tekstiin menevän
väitteen tarkistuksen lähteestä). Tämä on koosteen painavimman yksittäisen
nykytapahtuman (H2) ensimmäinen asia, jonka lukija näkee otsikkona.

**Korjaus:** vaihda otsikon luku "kolmetoista" → "kymmenen", tai jos
kirjoittaja haluaa säilyttää otsikon iskevyyden ilman tarkkaa lukua,
korvaa se ilman numeroa (esim. "Kymmenen sekuntia joka muutti kaiken").
Lähde: en-Wikipedia "2011 Christchurch earthquake".

---

## 2. VIRHE: H2-noston leipäteksti väittää järistyksen osuneen "keskikaupungin alle" — se osui lähelle, ei alle

**H2-noston pull-quote:** *"Tiistaina 22. helmikuuta 2011 kello 12.51
keskikaupungin alle vain viiden kilometrin syvyyteen osunut 6,3
magnitudin järistys..."*

En-Wikipedia "2011 Christchurch earthquake" -artikkelin infobox ja
leipäteksti sanovat järistyksen episentrumin sijainneen **6,7 km
kaakkoon keskustasta** ("centred 6.7 km south-east of the central
business district"), ja en-Wikipedia "Christchurch" -pääartikkeli
täsmentää sijainnin olleen "closer to the city, near Lyttelton" — eli
lähempänä kuin syyskuun 2010 järistys, muttei suoraan keskustan alla.
(Artikkeli mainitsee erikseen, että juuri joulukuun 2010 jälkijäristys —
eri tapahtuma — osui "directly under the city centre".)

Tämä on myös **sisäinen ristiriita faktapohjan omaan Faktat-listaan
nähden**: H2:n Faktat-osio sanoo oikein "22.2.2011 kello 12.51
keskikaupungin **lähellä**, 5 km syvyydessä osunut järistys" — pull-quote
siis yliampuu omaa, oikein muotoiltua lähdeperustaansa.

**Korjaus:** vaihda pull-quotessa "keskikaupungin alle" → "keskikaupungin
lähelle" (tai vastaava), jotta leipäteksti täsmää sekä lähteeseen että
koosteen omaan faktalistaan. Lähde: en-Wikipedia "2011 Christchurch
earthquake", "Christchurch".

---

## 3. VIRHE: H2-nosto kutsuu 1 240 purkua "historiallisiksi rakennuksiksi" — luku kattaa kaikki purut, ei vain historiallisia

**H2-noston pull-quote:** *"Yli tuhat historiallista rakennusta purettiin
vuoteen 2015 mennessä..."* Faktat-listassa tarkennus: *"Helmikuuhun 2015
mennessä Neljän Avenuen sisällä oli tehty 1 240 purkua syyskuun 2010
järistyksen jälkeen."*

En-Wikipedia "2011 Christchurch earthquake" sanoo täsmälleen: *"As of
February 2015, there had been 1240 demolitions within the bounds of the
Four Avenues since the September 2010 earthquakes."* Lähde ei erittele,
montako näistä 1 240 purusta oli **historiallisia/heritage**-rakennuksia
— luku kattaa koko keskustan (Neljän Avenuen alue), kaikki rakennustyypit
mukaan lukien tavalliset liike- ja toimistorakennukset. Artikkeli
mainitsee erikseen ja yleisluontoisesti, että "many heritage buildings"
sai punaisia tarroja ja että suuri osa niistä purettiin, mutta ei anna
tälle lukua eikä sano, että valtaosa 1 240 purusta olisi ollut
historiallisia rakennuksia.

**Korjaus:** poista tai lievennä sana "historiallista" — esim. "Yli
tuhat rakennusta purettiin vuoteen 2015 mennessä, monet niistä
historiallisia" tms., tai kerro erikseen (jos kirjoittaja löytää tarkan
luvun), montako niistä oli nimenomaan heritage-listattuja. Lähde:
en-Wikipedia "2011 Christchurch earthquake".

---

## 4. HUOMIO: Jakson 2 väite Canterburyn tasangosta "maan laajimpana ja tärkeimpänä maatalousalueena" ei löydy suoraan lähteestä

Matkaoppaan Jakso 2:n Faktat-rivi: *"Canterburyn tasanko on
Uuden-Seelannin laajin tasanko... — en-Wikipedia 'Canterbury Plains'"*,
ja leipäteksti kutsuu sitä *"koko maan laajin ja tärkein
maatalousalue"*.

En-Wikipedia "Canterbury Plains" -artikkeli ei sano tasankoa maan
laajimmaksi eikä tärkeimmäksi maatalousalueeksi — se kuvaa vain
geologiaa ("suitable for moderately intensive livestock farming").
Tarkistin myös "Canterbury Region" ja "Christchurch" -artikkelit: niistä
löytyy vain, että Canterbury on maan suurin viljantuottaja (60,7 %
vehnästä, 51,1 % ohrasta, 43,7 % kaurasta, vuoden 2002 luvut) — mikä on
eri asia kuin "koko maan laajin ja tärkein maatalousalue" yleisesti.
Väite on todennäköisesti tosiasiallisesti oikea (Canterburyn tasanko
tunnetaan yleisesti NZ:n suurimpana yhtenäisenä tasankona), mutta sille
ei löytynyt tukea käytetyistä en-Wikipedia-artikkeleista faktakurin
edellyttämällä tavalla.

**Ei pakollinen korjaus**, mutta suositus: joko etsi tukeva lähde
(esim. maantiedeartikkeli, jossa "largest plain" mainitaan
eksplisiittisesti) tai lievennä väite muotoon, jonka nykyiset lähteet
kattavat (esim. pudota "laajin" ja säilytä vain maatalousmerkitys
viljantuotannon kautta).

---

## 5. HUOMIO: K2-noston kuvaus kāti māmoen "sulautumisesta" kāi tahuun on yksinkertaistus

K2-nosto: *"...1500-luvulla kāti māmoelle, joka puolestaan sulautui sata
vuotta myöhemmin kāi tahuun avioliittojen ja konfliktien kautta."*

En-Wikipedia "Christchurch" sanoo tarkasti: kāti māmoe valtasi alueen
n. 1500, kāi tahu saapui sata vuotta myöhemmin, ja **"the two [kāti
māmoe ja kāi tahu yhdessä] ultimately absorbed Waitaha"** — eli
lähdeteksti kertoo kāti māmoen JA kāi tahun yhdessä sulauttaneen
waitahan, ei sitä, että kāi tahu olisi myöhemmin sulauttanut kāti māmoen.
Kāti māmoen sulautuminen kāi tahuun avioliittojen kautta on kylläkin
dokumentoitu toisaalla (en-Wikipedia "Ngāi Tahu": *"most families who
descend from Ngāi Tahu also have Ngāti Māmoe and British ancestry"*),
joten väite ei ole väärä, mutta sen tarkka lähdeviittaus ("Christchurch")
ei suoraan tue juuri tätä muotoilua.

**Ei pakollinen korjaus** — asiasisältö on tuettavissa toisesta samassa
faktapohjassa jo käytetystä artikkelista ("Ngāi Tahu"), mutta
lähdeviite kannattaisi tarkentaa kattamaan molemmat artikkelit.

---

## 6. HUOMIO: Osio 8 väittää virheellisesti, ettei Eteläsaarta mainita faktapohjassa

Osio 8, kysymys 1: *"Eteläsaari ei mainita eksplisiittisesti tässä
faktapohjassa — kirjoittajan HUOMIOITAVA lisätä maininta 'Eteläsaaren
suurin kaupunki'..."*

Tämä ei pidä paikkaansa: matkaoppaan **Jakso 1** sanoo jo suoraan
*"Christchurch on Eteläsaaren suurin kaupunki..."* — maininta on siis jo
olemassa faktapohjassa, kirjoittajan ei tarvitse lisätä sitä erikseen.
Pieni sisäinen epätarkkuus koosteen omassa itsetarkistusosiossa, ei
vaikuta lehden sisältöön.

---

## Muuta tarkistettua (ei huomautettavaa)

- **Maanjäristysten päivämäärät, kellonajat, magnitudit ja uhriluvut:**
  4.9.2010 klo 4.35, M7,1, syvyys 10 km, 2 kuollutta / yli 1 700
  loukkaantunutta, vakuutuskorvaukset 2,75–3,5 mrd $ — kaikki täsmää
  "2010 Canterbury earthquake" -artikkeliin. Sisäinen ristiriita
  Christchurch-pääartikkelin ("no direct fatalities") ja dedikoidun
  artikkelin ("2 dead") välillä on oikein tunnistettu ja ratkaistu osiossa
  7 kohta 3. 22.2.2011 klo 12.51, 185 kuollutta, 400 000 tonnia silttiä,
  yli 8 000 kotia purettu/siirretty (viimeinen purku lokakuu 2021) —
  kaikki täsmää "2011 Christchurch earthquake" -artikkeliin. Magnitudi-
  ristiriita (6,2/6,1 infobox vs. 6,3 leipäteksti) on oikein tunnistettu
  osiossa 7 kohta 2.
- **Ngāi Tahun 1998-sopimus:** kuninkaallinen hyväksyntä 1.10.1998, maata
  1844–1864 yli 34,5 milj. eekkeriä 14 750 punnalla, 170 milj. dollarin
  taloudellinen hyvitys, kaitiaki-kulttuurihyvitys, anteeksipyyntö Jenny
  Shipleyltä marraskuussa 1998 Ōnukun maraella Akaroan lähellä, Te
  Rūnanga o Ngāi Tahu Addingtonissa — kaikki täsmää "Ngāi Tahu Claims
  Settlement Act 1998" ja "Ngāi Tahu" -artikkeleihin sanasta sanaan.
- **Katedraalin historia:** peruskivi 16.12.1864, rahapula-katko n. 8
  vuotta, Mountfort johtoon 1873, vihkiminen 1.11.1881, deconsecration
  9.11.2011, synodin äänestys 55 % 9.9.2017, kustannusarvio 104 milj.
  (2017) → 248 milj. (2024), mothballing elokuu 2024, Re:Opening-
  suunnitelma syyskuu 2025 → 2030 — kaikki täsmää "Christ Church
  Cathedral, Christchurch" -artikkeliin.
- **Pahvikatedraali:** Shigeru Ban + Warren and Mahoney, 96 pahviputkea,
  vihitty 15.8.2013, ~700 istumapaikkaa, suunniteltu 50 vuodeksi,
  "ensimmäinen merkittävä uudisrakennus jälleenrakennuksessa" — täsmää
  sanasta sanaan "Cardboard Cathedral" -artikkeliin. Te Kaha -stadion
  30 000 katsojaa, valmistui huhtikuu 2026 — täsmää.
- **1873-kulma (H3):** katedraalin rakennustyön uudelleenkäynnistys
  Mountfortin johdolla juuri 1873 on vahvistettu ja hyvin perusteltu.
- **Cyclopolis-nosto (K3):** lempinimi, Mark Twainin 1895-lainaus, 30 %
  kasvu 2016–2023, 3,6 milj. pyöräilijää, ~25 % maan pyöräilevistä
  työmatkalaisista, 100 km Major Cycle Route -tavoite — täsmää sanasta
  sanaan Christchurch-artikkelin Transport-osioon.
- **Kaupungin perustaminen (K1):** Canterbury-yhdistys 27.3.1848, First
  Four Ships joulukuu 1850 (Charlotte Jane 16.12. ensimmäisenä),
  kaupunkioikeudet 31.7.1856 (maan vanhin virallinen kaupunki),
  asukasluku 14 270 vuonna 1874 (täsmää johdannon "reilut 14 000" vuoden
  1873 tienoille) — kaikki täsmää.
- **Puutarhakaupunki (L1):** John Eldon Gorst / Garden City -nimitys,
  Hagley Park 164,6 ha varattu 1855 (infobox/leipätekstiristiriita 1856
  vs. 1855 oikein tunnistettu osiossa 7 kohta 4), Kasvitieteellinen
  puutarha 21 ha vuodelta 1863, kirsikkapuut Harper Avenuella Arbor Day
  1936 — täsmää sanasta sanaan.
- **Avon-joki (L2) ja punainen vyöhyke (L4):** Ōtākaro "leikkipaikka",
  "Shakespere"-suunnitelma, John Deansin uudelleennimeäminen 1848
  (Ayrshiren Avon), virallinen kaksikielinen nimi 1998, AvON-verkosto ja
  pormestari Bob Parkerin tuki, Gormley-patsaat syyskuu 2015 (yksi
  jokeen, toinen Arts Centrelle) — täsmää sanasta sanaan.
- **Riccarton Bush (L3):** Pūtaringamotu "katkaistu korva" (yksi kahdesta
  lähteen antamasta merkityksestä, oikein käytetty), yksi neljästä
  jäljellä olevasta kahikatea-metsän palasta, Deans-veljesten 1848-sopimus
  (22 ha), Riccarton Bush Act 1914 (6,4 ha, Harry Ell ja Leonard
  Cockayne), petoaita ja kiwin palautussuunnitelma — täsmää sanasta
  sanaan.
- **Eteläiset Alpit / Canterburyn tasanko (Jakso 2):** 500 km, Aoraki
  3 724 m, yli 3 000 jäätikköä, sademäärät 3 000/15 000/1 000 mm — täsmää
  "Southern Alps" -artikkeliin.
- **Antarktis-yhteys (Jakso 1):** portti vuodesta 1901 (Discovery-
  retkikunta Lytteltonista), yksi viidestä Antarctic gateway city
  -kaupungista, USA/NZ/Etelä-Korea/Italia-tukikohdat, TranzAlpine Main
  South/Midland-linjaa Otira-tunnelin kautta Greymouthiin — täsmää.
- **FESTA/Open Christchurch (Jakso 3):** Jessica Halliday, 2012–2018,
  jatkuu 2019 alkaen Open Christchurchina (Te Pūtahi) — täsmää sanasta
  sanaan.
- **Teollistuminen (Jakso 4):** Woolston/Addington, asukasluku ylitti
  100 000 vuonna 1919, valtion vuokra-asunnot Sydenhamiin 1900-luvun
  ensimmäisellä vuosikymmenellä + 1909 Addington Railway Workshopsin
  lähelle — täsmää sanasta sanaan.
- **Sää (Jakso 5):** Cfb, tammikuu 22,6 °C, heinäkuu 10,9 °C, pakkasöitä
  50/v lentokentällä (23/v keskustassa), lumi ~3 kertaa/v, nor'wester,
  inversiosavusumu, avotulet kielletty 2006 — täsmää sanasta sanaan.
- **Koordinaatit (pistokoe, 9/9):** Cathedral Square, Christ Church
  Cathedral, Victoria Square, New Regent Street, Cardboard Cathedral,
  Christchurch Art Gallery, Canterbury Museum, Hagley Park ja Riccarton
  Bush laskettiin uudelleen alkuperäisten infobox-koordinaattien
  (DMS→desimaali) pohjalta ja täsmäsivät taulukon lukuihin viiden
  desimaalin tarkkuudella. Myös yksi etäisyys/suuntalaskelma (New Regent
  Street, ~0,26 km koilliseen) laskettiin uudelleen ja täsmäsi.
- **Merkkimäärät (mitattu itse):** kaikki 12 nostoa 440–660 merkin
  sisällä (514–655) ja kaikki 3 johdantoa 154–232 merkin sisällä
  (204–228) — vastaa faktapohjan omia ilmoitettuja lukuja.
- **Visasääntö (`oceania-questions.js`, `christchurch`):** viiden
  kysymyksen vastaukset löytyvät nostoista/jaksoista ilman visan
  sanamuotojen toistoa (tarkistettu erikseen kysymys 2:n ja kysymys 4:n
  sanamuodot — kumpikaan ei toista visan fact-kentän ilmaisuja).
  `OCEANIA_FACTS.christchurch` (4 riviä) luettu koodista — ei
  sanatarkkaa päällekkäisyyttä nostoihin.
- **15.3.2019 moskeija-isku:** haettu koko faktapohja tapahtuman
  mahdollisten mainintojen varalta — ei viitteitä missään, vaikka
  itse en-Wikipedia-artikkeli "Christchurch" käsittelee tapahtumaa
  laajasti historiaosiossa. Poisjättö on siis tarkoituksellinen ja
  onnistunut, kuten tehtävänanto vaati.
- **Pilari 3 (kāi tahu elävänä kansana):** täyttyy — Te Rūnanga o Ngāi
  Tahu esitetään nykyisenä hallintoelimenä Addingtonissa, ei
  historian jäänteenä.
- **Pilari 4 (maanjäristykset toteavasti):** täyttyy — kaikki neljä
  historia-sivun nostoa (H1–H4) kertovat tapahtumat lukuina ja
  päivämäärinä ilman uhrien kärsimyksen kuvailua, ja painopiste on
  selvästi jälleenrakennuksessa (Pahvikatedraali, Te Kaha, punaisen
  vyöhykkeen puistohanke, pyöräteiden laajennus) ja nykyisessä
  kaupungissa.
- **Commons-kategoriat (18/19 olemassa):** kaikki tarkistetut kategoriat
  löytyivät Commonsista `action=query`-kutsulla paitsi
  `Category:Stay (Gormley sculpture)`, jota faktapohja **itse** ei
  väitäkään olemassa olevaksi (osio 5 toteaa sen puuttuvan ja kehottaa
  kirjoittajaa hakemaan erikseen) — Commons-haku vahvisti: kategoriaa ei
  ole, vain yksittäinen kuvatiedosto löytyy.

---

## Korjauslista kirjoittajalle

**PAKOLLISET KORJAUKSET (3 kohtaa):**

1. **H2-noston otsikko "Kolmetoista sekuntia joka muutti kaiken" — lähde
   sanoo n. 10 sekuntia, ei 13.** Vaihda lukuun kymmenen tai poista luku
   otsikosta. Lähde: en-Wikipedia "2011 Christchurch earthquake".
2. **H2-noston pull-quote sanoo järistyksen osuneen "keskikaupungin
   alle" — episentrumi oli 6,7 km kaakkoon keskustasta, ei alla.**
   Ristiriidassa myös koosteen omaan Faktat-riviin ("keskikaupungin
   lähellä"). Korjaa pull-quote sanaan "lähelle"/"lähellä". Lähde:
   en-Wikipedia "2011 Christchurch earthquake", "Christchurch".
3. **H2-nosto kutsuu 1 240 purkua "historiallisiksi rakennuksiksi" —
   lähdeluku kattaa kaikki Neljän Avenuen purut, ei vain heritage-
   rakennuksia.** Poista tai lievennä sana "historiallista". Lähde:
   en-Wikipedia "2011 Christchurch earthquake".

**HUOMIOT (ei pakollisia, mutta suositeltavia):**

4. Jakso 2:n väite Canterburyn tasangosta "maan laajimpana ja
   tärkeimpänä maatalousalueena" ei löydy suoraan käytetystä
   "Canterbury Plains" -lähteestä (eikä "Canterbury Region"- tai
   "Christchurch"-artikkeleista). Todennäköisesti asiallisesti oikein,
   mutta etsi tukevampi lähde tai lievennä muotoilua.
5. K2-noston kuvaus kāti māmoen "sulautumisesta" kāi tahuun on
   yksinkertaistus siitä, mitä lähdeartikkeli ("Christchurch") sanoo
   (se kertoo kāti māmoen JA kāi tahun yhdessä sulauttaneen waitahan).
   Asiasisältö on tuettavissa "Ngāi Tahu" -artikkelista — tarkenna
   lähdeviite kattamaan sekin.
6. Osio 8 väittää virheellisesti, ettei Eteläsaarta mainita
   eksplisiittisesti faktapohjassa — Jakso 1 mainitsee sen jo suoraan
   ("Eteläsaaren suurin kaupunki"). Ei vaikuta lehden sisältöön, vain
   koosteen oma sisäinen huomio on vanhentunut/virheellinen.

**Kaikki muu tarkistettu — maanjäristysten päivämäärät/magnitudit/
uhriluvut, Ngāi Tahu -sopimuksen luvut ja vuodet, katedraalin koko
historia, Pahvikatedraali, Te Kaha, Cyclopolis-tilastot, kaupungin
perustamishistoria, puutarhakaupunki, Avon-joki, Riccarton Bush,
Eteläiset Alpit, Antarktis-yhteys, FESTA/Open Christchurch,
teollistuminen, sää, koordinaatit (9/9), merkkimäärät, visasääntö,
moskeija-iskun poisjättö sekä pilarit 3 ja 4 — on VAHVISTETTU
alkuperäisistä en-Wikipedia-artikkeleista ja täsmää faktapohjaan.**

---

## Kelpaako-tuomio

**PALAUTETAAN KORJAUKSIN.** Faktapohja on erittäin huolellisesti
koottu — koordinaatit, merkkimäärät, Ngāi Tahu -sopimuksen luvut ja
katedraalin koko vuosikymmenien historia läpäisivät riippumattoman
tarkistuksen lähes virheettä, ja moskeija-iskun poisjättö sekä
maanjäristysten toteava, jälleenrakennuspainotteinen käsittely
(pilarit 3 ja 4) on esimerkillisesti toteutettu. Kolme todellista
virhettä löytyi kuitenkin, ja kaikki kolme osuvat samaan nostoon
(H2, helmikuun 2011 järistys) — koosteen faktisesti painavimpaan
yksittäiseen kohtaan: väärä kestoluku otsikossa, episentrumin sijainnin
liioittelu leipätekstissä (joka on ristiriidassa koosteen omaan
faktalistaan nähden) ja purkulukujen virheellinen luonnehdinta
"historiallisiksi". Kaikki kolme ovat nopeasti korjattavissa
sanavalintoja muuttamalla, eivätkä vaadi nostojen uudelleenkirjoittamista
tai uutta tiedonhakua.
