# Nippu 2 / Nikosia — raportti 12.8.2026

*Nippu 2 julkaistaan kaupunki kerrallaan eikä yhtenä isona eränä, koska
omistaja seuraa etenemistä Työhuoneen Tilanne-välilehdeltä. Doha oli
pilotti (v587); tämä on toinen.*

## Mitä valmistui

Nikosian kaupunkilehti kokonaan: kohdekartta, kansisivu, yksi aihesivu
minitehtävineen, kuusi nähtävyysjuttua ja säätiedot.

Kirjoitustyö tehtiin seitsemällä rinnakkaisella kirjoittaja-agentilla ja
tarkistus kolmella Sonnet-agentilla (kuvat, faktat, päällekkäisyys).

## Rajaus, joka koski koko kaupunkia

Nikosia on jaettu kaupunki. Lehti ei käsittele jakoa: peli ei kerro
nykykonflikteista, joten kohteet kuvataan kulttuurikohteina omalla
historiallaan. Kirjoittajille annettiin tämä ehdottomana rajauksena, ja
yksi tarkistusagentti luki koko aineiston pelkästään tätä vasten.

Kaksi historiallista mainintaa jätettiin tarkoituksella sisään, koska ne
ovat vanhoja tapahtumia eivätkä nykypolitiikkaa — sama linja kuin
muualla pelissä (historialliset taistelut saa näyttää):

- Omeryen hamamin juttu kertoo, että paikalla ollut 1300-luvun kirkko
  hajosi Nikosian piirityksessä 1570;
- Faneromenin kirkon pihalla on mausoleumi vuonna 1821 teloitettujen
  kirkonmiesten muistoksi.

Kumpikin on rakennuksen oma historia, ei kannanotto. **Jos linja on
toinen, tämä on se kohta, joka muutetaan** — siksi se on kirjattu tähän
eikä päätetty hiljaa.

## Karttalöydös, joka koski koko kartastoa

Lehti piirtää kohdekartan vasempaan alakulmaan mittakaavajanan
(`ui.js`, `.kartta-mittajana`). Jana on siellä aina, eikä sitä voi
siirtää kaupungin takia. Masqatia valmistellessa kävi ilmi, että Omanin
vanhin hindutemppeli — kartan ainoa eteläinen kohde — osui tarkalleen
janan päälle: numeroympyrä peitti sekä janan että sen tekstin. Sama vika
oli aiemmin Kööpenhaminassa (Tivolin ympyrä), ja siitä oli varoitus
piirtotyökalun kommentissa, mutta varoitus vaati silmätarkistuksen.

**Nyt se on mitta eikä muistisääntö.** `tools/tarkista-karttapisteet.mjs`
tarkistaa vesiosumien lisäksi, osuuko numeroympyrä janan tai sen tekstin
päälle. Mitat on mitattu selaimesta (390 px:n näytöllä kartan kotelo on
360 px, ympyrä 24 × 24 px, teksti 10 px korkea) eikä arvattu, ja
tarkistus tehdään puhelinleveydellä, koska kapein näyttö on pahin tapaus.

Koko kartaston ajo (41 kohdekarttaa) löysi kolme osumaa:

| Kartta | Kohde | Tila |
|---|---|---|
| Masqat | Motishwar Mandir | korjattu: rajaus lännemmäs, ympyrä 23 % → 36 % |
| Kuwait | Sadu House | korjattu: eteläreuna alemmas, ympyrä irti tekstistä |
| Pietari | Mariinski-teatteri | **jätetty ennalleen, ks. alla** |

Pietarin osuma on yhden pikselin verran janan tekstin yläreunaa ja
näkyy tuskin lainkaan. Kartta on jo julkaistu, ja rajauksen muuttaminen
tarkoittaisi uuden Overpass-ajon ja uuden kuvan jo hyväksyttyyn
kaupunkiin. Se ei ole tämän session tehtävä eikä tämän nipun aihe, joten
se on tässä kirjattuna eikä korjattuna — **Fablelle päätettäväksi,
korjataanko se erikseen.**

Odessan Privozin tori ilmoittautui ensin neljäntenä osumana, mutta se
oli työkalun oma vika: tekstin leveys oli kiinteä luku, ja "1 km" on
kapeampi kuin "500 m". Leveys lasketaan nyt merkkimäärästä, ja työkalun
tulos vastaa selainmittausta kaikissa neljässä tapauksessa.

## Masqatin rajaus — kaksi yritystä, ja miksi jälkimmäinen voitti

Janan väistämiseen kokeiltiin ensin eteläreunan siirtoa alemmas. Se
toimi mittana mutta ei kuvana: kuvan alalaitaan tuli puolen kilometrin
kaista tyhjää wadia, ja vanhakaupunki valui ylänurkkaan. Toinen yritys
siirsi länsireunaa, jolloin temppeli siirtyi sivusuunnassa janan ohi
ilman että pystysuunnan rajaus löystyi. Molemmat kuvat piirrettiin ja
katsottiin; jälkimmäinen jäi voimaan.

## Mitä tarkistus löysi

Kolme Sonnet-agenttia luki aineiston eri silmin. **Faktatarkistus ei
löytänyt yhtään virhettä** — noin 50 väitettä tarkistettiin ulkoisesta
lähteestä kahdeksasta Wikipedia-artikkelista. Kuvien lisenssit, koot,
tekijämerkinnät ja "ei pelissä ennestään" -ehto olivat kaikki kunnossa
kaikissa 22 viittauksessa. Löydökset koskivat siis sisältöä, eivät
tekniikkaa — ja yksikään niistä ei olisi näkynyt testeissä:

1. **Kansinosto toisti nähtävyysjutun.** Kannen toinen nosto kertoi
   Kyproksen museosta samat asiat kuin saman kaupungin nähtävyysjuttu:
   perustaminen 1882 vetoomuksesta, Cesnolan yli 35 000 esinettä,
   rakennus 1908–1924, neljätoista salia. Pelaaja olisi lukenut saman
   jutun kahdesti. Sama vika oli Dohassa nipun pilotissa. Nosto
   kirjoitettiin kokonaan uusiksi Bedestenistä.
2. **Sama kuva kahdesti samassa kaupungissa.**
   `Lefkosia-faneromeni-church.jpg` oli sekä Faneromenin
   nähtävyysjutussa että kannessa. Kansikuva vaihdettiin.
3. **Uusi nosto toi mukanaan uuden päällekkäisyyden**, ja se huomattiin
   vasta liittämisvaiheessa: Selimiyen juttu päättyi sivulauseeseen,
   joka kertoi Bedestenistä täsmälleen samat kolme asiaa kuin uusi
   nosto (aloitti kirkkona, 1573 kangaskauppa, nykyään kulttuurikeskus).
   Sivulause poistettiin Selimiyen jutusta, ja aihe jäi nostolle.
4. **Liput jäivät selitteistä pois.** Kuudessa kuvassa näkyy Kreikan,
   Kyproksen tai ortodoksikirkon lippu, eikä yksikään selite maininnut
   niitä. Katsoin kolme vahvinta tapausta itse, ja tarkistin oli
   liioitellut kahdessa: arkkipiispan palatsin kolme lipputankoa ovat
   kuvan laidassa ja huomaamattomampia kuin kadun liikennekartiot.
   Kaksi tapausta oli aitoja. Mausoleumikuvassa ortodoksikirkon
   keltainen lippu liehuu kahden aiheen välissä — kuva jäi, koska se
   kuvaa kappaletta hyvin, mutta selite kertoo nyt lipusta.
   Kaupunginteatterin kansikuvassa oli iso tapahtumamainosbanneri ja
   "NO PARKING" -kylttejä, joita selite ei maininnut; se vaihdettiin.
5. **Pedieos-joen uoman siirto vuonna 1567** viittaa venetsialaisten
   muurihankkeeseen, joka on varattu aihe. Virke muotoiltiin ilman
   vuosilukua ja syy-yhteyttä.

Lisäksi Omeryen hamamin juttu oli 1 423 merkkiä eli mallin ylärajan
yli; se lyhennettiin 1 383:een.

## Mitat

Kuusi nähtävyysjuttua 1 269–1 402 merkkiä, kansisivu kolmella
kansikuvalla ja kolmella nostolla, aihesivu `arki` kolmella nostolla ja
minitehtävällä. Kuvia 23, joista yksikään ei ole pelissä ennestään eikä
toistu kaupungin sisällä. `npm test` 573/0, `tarkista-kaksoisavaimet`
puhdas, `tarkista-aihetoisto` ei nosta yhtään Nikosia-paria.
Selaintarkistus 390 px: lehti kaksi liuskaa, sää näkyy mastossa
(elokuussa 30°, sadetta 3 mm), nähtävyyspopup selaa kohteita 5/6 ja
kuvia 1/2.

## Havainto, joka ei ole tämän työn vika mutta joka kannattaa tietää

Tehtävänannon rajaus oli, ettei lehti käsittele kaupungin jakoa, ja
lehti ei käsittele sitä. **Saapumissivun yläosassa se kuitenkin lukee
silti**, koska peli hakee sinne Wikipedian tiivistelmän elävänä: teksti
on nyt "Nikosia on Kyproksen pääkaupunki ja maailman viimeinen jaettu
pääkaupunki. Kaupungin läpi kulkee puskurivyöhyke…". Sama koskee
Nikosian kulttuurivisaa ja `asia-valokuvat.js`:n kuvatekstiä, jotka
ovat repossa ennestään. Rajaus koskee siis vain sitä osaa sivusta,
jonka tämä työ kirjoitti — **jos linjan on tarkoitus kattaa koko sivu,
se on oma työnsä eikä ratkea lehtitekstiä muokkaamalla.**

## Jonossa

- **Kuwait** — kohdekartta piirretty ja tarkistettu, sisältö
  kirjoitusvaiheessa. Neljä kuudesta karttakohteesta on jo
  KWT-maalehdessä (tornit, suurmoskeija, Mubarakiyan tori kahdesti),
  joten jokainen kirjoittaja sai oman kieltolistansa ja eri kulman.
- **Masqat** — kohdekartta ja säätiedot valmiina, sisältötyö seuraavana.
  Masqat on Persianlahden kaupungeista poikkeus: OMN-maalehti kertoo
  Bahlasta ja Jabreenista muttei kaupungin omista kohteista, joten
  aihepiiri on lähes kokonaan vapaa.
- **Bagdad** — siirretty odottamaan. Overpass palauttaa Rusafan
  rajauksesta vain runsaat 400 elementtiä (vertailun vuoksi Doha 2 387),
  joten kartan puolikas jää tyhjäksi paperiksi. Kyse ei ole rajauksesta
  vaan OSM-aineiston kattavuudesta, joten se ei korjaannu yrittämällä
  uudelleen.
- **Mekka ja Medina** — ei aloitettu eikä valmisteltu. Pyhät kaupungit
  tehdään vain omistajan erillisellä päätöksellä.

## Fablelle / omistajalle

1. **Pietarin mittakaavajana** (yllä): korjataanko erikseen vai
   jätetäänkö?
2. **Nikosian kaksi historiallista mainintaa** (yllä): jäävätkö?
3. Nipun 1 avoin kysymys on yhä auki: päällekkäisissä tapauksissa
   siirretäänkö maalehden juttu pois ja annetaan aihe kaupunkilehdelle
   (a), vai jätetäänkö molemmat ja kirjoitetaan eri näkökulmista (b)?
   Doha, Nikosia ja Kuwait on tehty linjalla (b).
4. **Uuden kansikuvan Commons-tiedostonimi** on "A house with a palm
   tree in the Arab Quarter, North Nicosia, Cyprus.jpg". Nimi sisältää
   sanan "North Nicosia", vaikka selite ei ota kantaa sijaintiin.
   Tiedostonimi ei näy pelaajalle missään — `alt`-teksti tulee aina
   selitteestä (ui.js) — mutta se on repossa. Kuva itse on neutraali
   katunäkymä. Jätin sen, koska nimen vaihtaminen ei ole mahdollista:
   se on Commonsin tiedostonimi, jolla kuva haetaan.
5. **Service workerin SHELL-lista**: vain kuuden ensimmäisen kaupungin
   karttakuvat ovat listassa, ja sen jälkeen tulleet 32 eivät. Uudet
   kaupungit noudattavat nykykäytäntöä eli jäävät pois. Jos lista on
   tarkoitus pitää ajan tasalla, se on oma työnsä.
