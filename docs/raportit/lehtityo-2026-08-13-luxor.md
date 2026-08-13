# Luxor — raportti 13.8.2026

*Nipun 2 kymmenes kaupunki. Doha v587, Nikosia v592, Kuwait v594,
Masqat v597, Bagdad v598, İzmir v599, Ankara v600, Aleppo v603,
Damaskos v604.*

## Mitä valmistui

Luxorin kaupunkilehti kokonaan: kohdekartta, kansisivu, aihesivu `arki`
("Arki ja kulkeminen") minitehtävineen, säätiedot ja kuusi
nähtävyysjuttua — Luxorin temppeli, Luxorin museo, sfinksikuja, Mutin
temppeli, Khonsun temppeli ja Karnakin suuri pylvässali.

## Kartta ei ollut rajausongelma vaan aineisto-ongelma

Luxorin kohdekartta ajettiin ensin kahdesti ja katsottiin, ja molemmilla
kerroilla tulos oli sama: kelvollinen katuverkko ja kohteiden kohdalla
tyhjää paperia. Kolmas ajo ei ollut kolmas rajaus vaan mittaus — ja syy
selvisi.

**Luxorin ja Karnakin temppelialueet eivät ole OpenStreetMapissa
rakennuksia.** Ne ovat `historic=ruins`- ja `historic=archaeological_site`
-alueita, eikä piirtotyökalu pyytänyt niitä lainkaan. Karnakin ulkomuuri
näkyi vain siksi, että se sattuu olemaan erillinen way-viiva.

Työkaluun lisättiin oma taso. Suljetut polut täytetään alueina ja avoimet
piirtyvät viivoina, ja ero luetaan geometriasta, koska OSM ei erottele
niitä merkinnöillä. Sävy on veden ja puiston välistä. Kartalla näkyvät
nyt Karnakin pihat ja salit, Mutin pyhä järvi hevosenkengän muotoisena ja
Luxorin temppelin rakenteet — ja neljä kuudesta kohteesta osuu
arkeologiselle alueelle eikä tyhjälle paperille.

Kokeilin muutosta myös Ateenaan: Akropolis ja molemmat agorat piirtyvät
hyvin ja hillitysti. **Palautin silti julkaistun Ateenan kartan
ennalleen** — vanhojen karttojen uusiminen on oma päätöksensä eikä kuulu
Luxorin julkaisuun. Jos se halutaan, työkalu on nyt valmis.

## Faktatarkistus: 106 väitettä, ei yhtään virhettä

Tämän erän tarkistin haki jokaisen artikkelin **raakawikitekstinä**
(`?action=raw`) eikä tiivistelmänä — suoraan Aleppon erän opetuksesta,
jossa tiivistelmästä tehty haku johti väärään päätelmään siitä, että
lainaus olisi keksitty. Se tarkisti 26 artikkelista 106 väitettä eikä
löytänyt yhtään virheellistä lukua.

Sen sijaan se vahvisti kuusi lähdehajontaa, jotka jutut kertovat
avoimesti sen sijaan että valitsisivat puolen hiljaa: obeliskin
poistovuosi (1831 vs. 1835), Amenhotep III:n patsaan korkeus (2,49 vs.
1,8 m), Sekhmet-patsaiden määrä (570 vs. 600), pylväiden korkeus (21 vs.
24 m), Ramses III:n hallitusvuodet ja pylvässalin pystyttäjä.

Kirjoittajat korjasivat myös kolme lukua omasta tehtävänannostani:
Luxorissa oli **yksi** obeliskipari eikä kaksi, ja siitä vain toinen
vietiin Pariisiin; patsaskätkö kaivettiin 1989 **Luxorin temppelin** eikä
Karnakin alta; ja museon Amenhotep III on kvartsiittipatsas eikä
graniittipää.

## Väärä vaikutelma, jonka tein itse

Kirjoitin sfinksikujan tehtävänantoon kiellon: *"ÄLÄ kirjoita kujan
kaivamisesta esiin 2000-luvulla."* Kielto oli väärä. Se oli
ylivarovaisuutta — kaivaus ja avaaminen eivät ole konflikti eivätkä
kuulu rajauksen piiriin — ja se tuotti juuri sen mitä rajaussääntö
yrittää estää: juttu päättyi vuoteen 1893 ja Georges Daressyn toteamukseen,
ettei kujaa voi kaivaa, **samalla kun jutun oma kuva näyttää täysin
kaivetun kujan.** Rajaustarkistin nosti tämän erän vakavimmaksi
löydöksekseen, ja se oli oikeassa.

Loppu kirjoitettiin uusiksi lähteen mukaan: ensimmäiset patsaat löytyivät
1949, koko linja kaivattiin 1984–2000, ja kuja avattiin kulkijoille
marraskuussa 2021.

## Obeliski oli jo pelissä — ja väärällä vuodella

Toistotutka nosti parin, jota en osannut odottaa: **Pariisin lehden
Concorden aukio** ja Luxorin temppeli kertoivat molemmat saman obeliskin
matkan. Pahempaa oli, että vuosiluvut eivät täsmänneet: Pariisin juttu
sanoi lahjoitusvuodeksi 1829, Luxorin juttu marraskuuta 1830.

Hain raakawikitekstin itse. *Luxor Obelisks* sanoo sanatarkasti:
*"In November 1830, Muhammad Ali Pasha … officially gave the Luxor
obelisks to France. In so doing he reversed a previous gift"* — eli 1829
viittaa aiempaan, peruttuun lahjoitukseen, ei tähän.

Molemmat korjattiin: Luxorin juttu luopui koko kuljetuskertomuksesta,
joka kuuluu Pariisin jutulle, ja pitää oman kulmansa (kaksi eri korkuista
obeliskia, jotka näyttivät tulijalle samanmittaisilta, koska matalampi
seisoi korkeammalla jalustalla). **Pariisin jutun vuosiluku vaihdettiin
muotoon "marraskuussa 1830".** Toistotutkan parimäärä palasi
kuudestatoista neljääntoista.

## Kuvat

23 kuvaa, kaikki PD/CC, kaikki ≥1200 px, yksikään ei ole pelissä
ennestään eikä toistu aineistossa. Kuvatarkistin latasi ja katsoi
jokaisen ja tarkisti erikseen, että kuva on oikeasta kohteesta — Karnakin
sisällä on useita temppeleitä ja kolme eri pässinpääkujaa, joten
sekaannus olisi ollut helppo.

Se nosti yhden riskitapauksen: Antonio Beaton pässinpääsfinksikuva on
Commonsissa luokassa "Karnak Western Processional Way" eikä Mutin
dromoksen luokassa. Tarkistin selitteen: se sanoo vain "Karnakin
pässinpäisistä sfinkseistä" eikä väitä tiettyä kujanpätkää, ja kuvat
näkyvät pelissä karusellina koko tekstin alla eivätkä kappaleiden
välissä, joten kappaleeseen sitoutumista ei tapahdu. Kuva jäi.

Yhden selitteen korjasin itse: pyhän järven kuvassa väitettiin olevan
"valkoisia katoksellisia penkkejä ja opastauluja". Suurensin kohdan —
kyseessä on rivi vaaleita suorakaiteen muotoisia levyjä ja pieni koju,
jonka seinä on verhoiltu palmunrungoilla. Selite kertoo nyt sen.

Kuvitus nojaa vahvasti 1850–1914-luvun valokuviin (Félix Teynard,
Antonio Beato, Francis Frith, Rijksmuseum, autokromilevy vuodelta 1914)
ja yhteen vuoden 1882 värilehteen. Se on tietoinen valinta ja sopii
pelin sävyyn, mutta rajaustarkistin huomautti aiheellisesti, että neljä
kuudesta jutusta jää kokonaan vanhan kuvaston varaan. Kansi ja aihesivu
tasapainottavat: niissä on nykykuvia rantakadulta, lautalta, vaunuista ja
kapearaiteiselta radalta.

## Karnakin neljä kohdetta

Neljä kuudesta kohteesta on Karnakin alueella, joten jutut kulmattiin
tarkoituksella eri suuntiin: sfinksikuja kulkemiseen ja Opet-juhlaan, Mut
veteen ja Sekhmet-patsassarjaan, Khonsu temppelin kaavaan ja pylvässali
valoon. Kaksi toistoa piti silti purkaa:

- **Mutin allas oli sanatarkasti sama kuin kohdekartan esittely**
  ("hevosenkengän muotoinen"). Esittely näkyy samalla sivulla, joten
  juttu muotoiltiin toisin.
- **Khonsu ja pylvässali kertoivat molemmat valon vähenemisestä.**
  Valoteema jäi pylvässalille, jonka koko kärki se on.

Pylvässalin juttu ei käytä lukua 134, koska kulttuurivisa käyttää sitä.
Se kertoo keskikäytävän kaksitoista pylvästä ja muut 122 — tarkkaavainen
lukija laskee summan, ja se on hyvä niin.

## Mitat

Kuusi nähtävyysjuttua 1 216–1 398 merkkiä, kaksi tai kolme kuvaa
kussakin. Kansisivu kolmella kansikuvalla ja kolmella nostolla (Abu
al-Haggagin moskeija, Winter Palace 1907, Karnakin pyhä järvi), aihesivu
"Arki ja kulkeminen" kolmella nostolla ja minitehtävällä.

**Säätiedot ovat mukana**, ja ne kertovat kaupungista enemmän kuin mikään
lause: ERA5:n normaaleissa Luxorissa sataa tammikuussa ja joulukuussa
yksi millimetri ja kymmenenä kuukautena kahdestatoista ei lainkaan.
Selaintarkistus näyttää kannessa rivin "elokuussa keskimäärin 33°,
sadetta 0 mm".

`npm test` puhdas, `tarkista-kaksoisavaimet` puhdas,
`tarkista-karttapisteet` puhdas (kaikki pisteet maalla, ei
mittakaavajanan eikä numeroympyröiden päällekkäisyyttä).

## Jonossa

Riad, Sana, Aden, Salalah, Mosul, Tabriz, Teheran ja Isfahan — ja
Lähi-idän jälkeen Aasia. Isfahan viimeisenä, koska sen maamerkit ovat
IRN-maalehdessä. Mekka ja Medina odottavat yhä omistajan erillistä
päätöstä.

Riadin maamerkkikoordinaatit on jo haettu ja kaksi rajausvaihtoehtoa
mitattu. Ongelma on kirjattu scratchpadiin: neljä kohdetta on 250 metrin
säteellä toisistaan ja Punainen palatsi 1,3 kilometriä pohjoisessa, eikä
yksi rajaus palvele molempia. Qasr al-Hukm ja Deeran aukio puuttuvat
OSM:stä nimettyinä, joten kuudes kohde vaatii päätöksen.
