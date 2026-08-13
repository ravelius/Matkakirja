# Tabriz — raportti 13.8.2026

*Nipun 2 kahdestoista kaupunki. Doha v587, Nikosia v592, Kuwait v594,
Masqat v597, Bagdad v598, İzmir v599, Ankara v600, Aleppo v603,
Damaskos v604, Luxor v608, Riad v612.*

## Mitä valmistui

Tabrizin kaupunkilehti kokonaan: kohdekartta, kansisivu, aihesivu
`luonto` ("Luonto ja talvi") minitehtävineen, säätiedot ja kuusi
nähtävyysjuttua — Tabrizin basaari, Perustuslakitalo, Arg, Saat-torni,
Azerbaidžanin museo ja Sininen moskeija.

Kartta oli piirretty ja committoitu jo edellisessä vuorossa. Rajaus on
38,070–38,085 / 46,286–46,304, ja kohteet jakautuvat kartalla kahteen
ryhmään: basaari ja perustuslakitalo pohjoisessa, muut neljä samalla
itä–länsi-linjalla etelässä. Riadin opetus otettiin käyttöön ennen
piirtämistä: jokaisen kuuden kohteen englanninkielinen artikkeli
tarkistettiin `action=raw`-haulla ensin, ja kaikilla on sellainen.

## Faktatarkistus: 43 väitettä, 43 oikein

Tarkistin haki jokaisen lähteen raakawikitekstinä — ei tiivistelmiä,
koska Aleppossa summaajaan nojannut tarkistus antoi vielä väärän
hälytyksen. Kaikki 43 väitettä täsmäsivät kirjaimellisesti: Argin
holvimitat (30,5 × 48 metriä, laki yli 45,7 metrissä), Sinisen
moskeijan valmistuminen lokakuussa 1465, vuoden 1780 järistyksen
magnitudi 7,4 ja uhriarvioiden hajonta 40 000–200 000, Saat-tornin
30,5 metriä ja 1934.

Kaksi kohtaa, jossa lähde on itse epäselvä, on kerrottu avoimesti eikä
piilotettu: Saat-tornin kaupunginmuseon aloitusvuodeksi Wikipedia antaa
rinnakkain "2000-luvun alku" ja "2007", ja juttu sanoo saman.

Kirjoittaja korjasi yhden tehtävänantoni virheen: väitin museossa
olevan kerrosjaon (ala-, keski- ja yläkerta). Lähde puhuu **kolmesta
salista**, ei kerroksista, eikä kerrosjakoa ole englanninkielisessä
Wikipediassa lainkaan. Juttu käyttää sanaa sali.

Yksi termi jäi pois, koska sitä ei ole: **"dalan"** basaarin osan
nimenä ei löydy englanninkielisestä Wikipediasta millään haulla, vaikka
tehtävänantoni sen mainitsi. Kirjoittaja tarkisti `Timcheh`-,
`Bazaar`- ja `Iranian architecture` -artikkelit ja jätti sanan pois.

## Rajaus: kolme poistoa

1. **Sininen moskeija:** "Uudelleenrakennus alkoi 1973 eikä ollut 2025
   valmis." Poistettu jälkiosa. Yli viisikymmentä vuotta kestänyt,
   yhä keskeneräinen hanke ilman lähteen antamaa syytä kysyy väistämättä
   nykyhallinnosta, vaikkei ketään nimetä. Virke päättyy nyt
   aloitusvuoteen.
2. **Saat-torni:** "Huipun kupoli uusittiin 2008: hopeanvärisen tilalle
   tuli khakinvärinen lasikuitukupoli." Poistettu kokonaan. Väite on
   lähteessä sanatarkasti, mutta lähde ei kerro **miksi** kupoli
   uusittiin, ja talon sääntö on, että jokaisen korjausmaininnan syy
   näkyy.
3. **Basaari:** "Suojeltua aluetta on noin 29 hehtaaria ja sen
   ympärillä noin 75 hehtaarin suojavyöhyke" → "Aluetta on noin 29
   hehtaaria." Luvut ovat Unescon nimeämisasiakirjan ydin- ja
   puskurivyöhyke, eli sama fakta kuin maalehdelle varattu
   Unesco-status numeroiksi puettuna; `middleeast-questions.js` sanoo
   sen jo suoraan.

El Golin kaksi nimeä (Shah Goli = kuninkaan lampi, El Goli = kansan
järvi) kerrotaan pelkkine merkityksineen ilman nimenvaihdon poliittista
taustaa. Se oli oikea ratkaisu ja säilytettiin.

## Kuvatarkistuksen löytö: vesileima aihesivulla

24 kuvasta 23 meni läpi. Yksi ei, ja se oli aihesivun lumikuva
`Snowfall in Tabriz 3 (Mehr, 2025).jpg`. Latasin sen ja katsoin:
kuvan vasempaan alaneljännekseen on painettu iso vesileima **MEHR NEWS
AGENCY** ja kuvaajan nimi. Lisenssi on aito CC BY 4.0 ja kuva on oikeaa
kaupunkia, mutta uutistoimiston vesileima on juuri se, mitä
kuvatarkistuksen kuuluu pysäyttää. Kaikki kaksikymmentäkahdeksan
Commonsissa olevaa saman sarjan kuvaa ovat samalla tavalla merkittyjä,
joten koko sarja putosi.

Tilalle tuli `Elgoli snow.JPG` (Faridb89, CC BY-SA 4.0, 2448 × 3264):
El Golin puisto lumen alla, kuvattuna terassien suunnasta alas
paviljonkia kohti. Kuva on Wiki Loves Monuments 2015 -aineistoa ja
otettu Tabrizissa 12.2.2015. Se on puhdas ja näyttää samalla ne
terassit, joista El Golin nosto kertoo.

*(Sivuhuomio: alkuperäisen kuvan `lahde` olisi joutunut korjattavaksi
joka tapauksessa. Sen `extmetadata` kantaa erillistä
`Attribution`-kenttää "Mehr News Agency" ja `AttributionRequired=true`,
jolloin lähteeksi kuuluu se eikä `Artist`-kentän kuvaajanimi.)*

## Kaksi selitettä, joissa laskin väärin

Molemmat löytyivät samalla tavalla: suurentamalla ja laskemalla.

- **Kultasepänrivin kuva:** selite puhui monikossa huivipäisistä
  naisista ja "pyöreästä sinilasisesta valaisimesta". Rajasin ja
  katsoin: selvästi erottuvia on yksi valkohuivinen nainen ja yksi
  mustaan chadoriin pukeutunut nainen, ja katon lamppu on tavallinen
  pyöreä valkoinen — sinistä hehkua tulee muualta.
- **Katukuva Taleghanin kadulta:** selite kertoi kahdesta
  huivipäisestä naisesta. Heitä on yksi, sinisessä huivissa; hänen
  vieressään on punapaitainen poika ja sinipaitainen mies.

Kummassakaan ei väitetty mitään, mitä kuvassa ei ole — kyse oli
lukumääristä — mutta selite on lupaus siitä, mitä näkövammainen
pelaaja kuulee, joten se korjattiin.

## Säätiedot ja yksi rehellisyyskysymys

Tabriz on lehtikaupungeista ainoa, jonka normaali menee pakkaselle:
tammikuu on ERA5:n mukaan −1,5 astetta.

Tässä tuli ongelma, jota ei ollut aiemmissa kaupungeissa. Aihesivun
teksti nojaa Wikipedian sääasematietoihin (vuoden keskilämpö 13,1 °C,
sadetta noin 260 mm), mutta lehden graafi piirtyy ERA5:stä, ja sen
ruutu ottaa mukaan ympäröivät vuoret: keskilämpö noin 11,4 astetta ja
sade 387 mm. Kaupunki on kahden vuoriston välisessä laaksossa, joten
ero on aito eikä korjattavissa koordinaatteja siirtämällä.

Ratkaisu oli kolmiosainen: aihesivun johdanto ei enää toista
vuosilukemia lainkaan vaan kertoo korkeuden (1 350–1 600 metriä) ja
laakson; lumipäivänosto sanoo nyt "sääaseman vuosien 1991–2020
keskiarvoissa", jolloin lukujen lähde erottuu graafin ERA5:stä; ja
`saatiedot.js`:ään jäi kommentti, joka kertoo eron ja sen syyn
seuraavalle lukijalle.

## Mitat

Kuusi nähtävyysjuttua 1 040–1 399 merkkiä, kaikissa 2–3 kuvaa.
Kansisivu kolmella kansikuvalla ja kolmella nostolla (runoilijoiden
mausoleumi, El Goli, Amir Nezamin talo), aihesivu "Luonto ja talvi"
kolmella nostolla (Sahand, Eynali, lumi) ja minitehtävällä Sahandin
kivilajista. Kuvia 24, joista yksikään ei ole pelissä ennestään.

`npm test` puhdas (641 läpi, 0 hylättyä), `tarkista-kaksoisavaimet`
puhdas, `tarkista-karttapisteet tabriz` puhdas (kaikki kuusi pistettä
maalla, ei päällekkäisyyksiä eikä mittakaavajanan peittoa),
`tarkista-aihetoisto` ei nosta yhtään Tabriz-paria (14 paria koko
pelissä, kaikki vanhoja). Selaintarkistus 390 pikselin leveydellä:
lehden kaikki kolme sivua ja kaksi nähtävyyspopupia, kaikki kuvat
latautuvat.

## Jonossa

Sana, Aden, Salalah, Mosul, Teheran ja Isfahan — ja Lähi-idän jälkeen
Aasia. Isfahan viimeisenä, koska sen maamerkit ovat IRN-maalehdessä.

**Sana, Aden ja Salalah odottavat yhä omistajan päätöstä.** Niistä
löytyy englanninkielisellä lähteellä 4, 3 ja 1 kohdetta, kun pelin
kaikilla 49 kartalla on kuusi tai seitsemän. Vaihtoehdot ovat: hyväksyä
pienempi kohdemäärä näille kolmelle, sallia muu lähde kuin
englanninkielinen Wikipedia, tai jättää kaupungit pois. Mosul on
lisäksi nykykonfliktin rajauksen alla.

Mekka ja Medina odottavat omistajan erillistä päätöstä.
