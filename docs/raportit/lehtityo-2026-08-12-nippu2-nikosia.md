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

*(täydennetään ennen julkaisua)*

## Mitat

*(täydennetään ennen julkaisua)*

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
4. **Service workerin SHELL-lista**: vain kuuden ensimmäisen kaupungin
   karttakuvat ovat listassa, ja sen jälkeen tulleet 32 eivät. Uudet
   kaupungit noudattavat nykykäytäntöä eli jäävät pois. Jos lista on
   tarkoitus pitää ajan tasalla, se on oma työnsä.
