# Damaskos — raportti 13.8.2026

*Nipun 2 yhdeksäs kaupunki. Doha v587, Nikosia v592, Kuwait v594,
Masqat v597, Bagdad v598, İzmir v599, Ankara v600, Aleppo v603.*

## Mitä valmistui

Damaskoksen kaupunkilehti kokonaan: kansisivu, aihesivu `arki` ("Arki ja
tavat") minitehtävineen ja kuusi nähtävyysjuttua — linnoitus, Umaijadien
moskeija, Hamidiyyan suuki, Khan As'ad Pasha, Itäportti ja Kisanin portti.
Kohdekartta oli commitoitu jo aiemmin.

Kaupunki kirjoitettiin rinnakkain Aleppon kanssa, ja se oli tarkoitus:
kaksi saman maan kaupunkia yhdellä kertaa paljastaa toistot heti eikä
vasta kuukausien päästä. Se myös maksoi — ks. viimeinen luku.

## Testi, jota en osannut odottaa

`npm test` kaatui heti Damaskoksen liittämisen jälkeen, eikä syy ollut
Damaskoksessa vaan pelin omassa vartijassa. `tests/pollo.test.mjs`
tarkistaa, ettei pelin sisäinen haku palauta **yhtään** linkkiä
kysymykseen *"Onko Syyriassa sotaa?"*. Kysymys pilkotaan hakusanoiksi
`syyriassa` ja `sotaa`, ja niin kauan kuin pelin teksteissä ei ole sanaa
"Syyriassa", osumia ei tule.

Khan As'ad Pashan juttu selitti ablaq-tekniikan lauseella *"Etelä-Syyriassa
mustaa basalttia ja valkoista kalkkikiveä on suunnilleen yhtä paljon"* — ja
yksi sanamuoto riitti avaamaan koko kysymyksen. Lause on nyt muodossa
"Syyrian eteläosassa", ja testi on jälleen vihreä.

Tämä on hyvä muistutus siitä, ettei rajaus ole pelkkää sisällön
kirjoittamista: peli tarkistaa myös, ettei aineistoon jää kahvaa, josta
lukija voisi vetää sen esiin. Vartija oli repossa ennestään; minä vain
törmäsin siihen ensimmäisenä.

## Rajaustarkistuksen löydöt

Rajaustarkistin luki kaikki kaksitoista tekstiä ja löysi kolme kohtaa,
joissa aikajana katkesi tai selittämätön muutos jäi roikkumaan:

1. **Hijaz-asema:** *"Rakennus on nykyään suojeltu."* Kirjoittaja oli
   jättänyt lähteen sota- ja sulkumaininnat pois, mutta tämä lause jäi —
   ja se herättää juuri kysymyksen, miksi asema on vain suojeltu.
   Lause poistettiin; nosto päättyy nyt aseman edessä olevaan veturiin.
2. **Kylpylöiden lukumäärä:** 77 (1100-luku) → 114 (1250) → 365
   (ottomaanit) → **60 (1800-luvun loppu)**. Viimeinen luku putosi ilman
   syytä. Se poistettiin; sarja päättyy nyt kolmeen kasvavaan lukuun.
3. **Ghouta:** aprikoosilevyn nosto kertoi lajikkeen kasvaneen
   "Ghoutan viljelyksillä". Ghouta on varattu aihe — se on
   kulttuurivisassa. Korvattiin ilmauksella "Damaskoksen ympäristön
   viljelyksillä".

Vuoden 1759 maanjäristys esiintyy kahdessa jutussa (linnoituksen kaksi
tornia, moskeijan pylväsrivi). Se jäi molempiin, koska syy on kummassakin
kirjoitettu näkyviin — sääntö kieltää selittämättömän katoamisen, ei
maanjäristystä.

## Kaksi asiaa, joita lähde ei tue

Faktatarkistin kävi 22 väitettä sanatarkoin lainauksin, ja kaksi jäi
vahvistamatta. Tarkistin molemmat itse raakawikitekstistä:

- **Jupiterin temppelin porttirakennelman korkeus.** Suukin juttu sanoi
  pylväiden ja kaaren kohoavan "noin kahdentoista metrin korkeuteen".
  *Temple of Jupiter, Damascus* -artikkelissa ei ole yhtään korkeuslukua
  — vain *"Part of the propylaeum at the western entrance of the temple
  still stands today"*. Luku poistettiin.
- **Suukin vuosi 1884.** Tämä sen sijaan **vahvistui**: *Old city of
  Damascus* sanoo sanatarkasti *"Al-Hamidiyah Souq, built (1780–1884)"*.
  Tarkistin ei ollut hakenut artikkelia, joten se merkitsi kohdan
  "en saanut tarkistettua" — oikea tapa raportoida, ja vastaus löytyi
  yhdellä haulla.

Erikseen kannattaa panna merkille, mitä kirjoittajat kieltäytyivät
tekemästä. Annoin linnoituksen tehtävänannossa väitteen, että muurien
sisällä olisi ollut kylpylä; englanninkielisessä artikkelissa ei esiinny
sanaa "bath" eikä "hammam" lainkaan, ja kirjoittaja kirjoitti tilalle
sen, minkä lähde antaa (Nur ad-Dinin moskeija ja suihkulähde). Khanin
tehtävänannossa pyysin kertomaan keskikupolin sortumisen maanjäristyksessä
— artikkelissa ei ole maanjäristystä, ei kupolin sortumista eikä vuotta
1759, ja kirjoittaja jätti koko aiheen pois. Kolmas korjasi aarrekammion
sijainnin pihan keskeltä pihan länsiosaan.

## Kuvat

22 kuvaa, kaikki PD/CC, kaikki reilusti yli 1200 pikseliä, yksikään ei ole
pelissä ennestään eikä toistu aineistossa. Kuvatarkistin latasi ja katsoi
jokaisen, suurensi kaksi epäselvää kohtaa (Bab Sharqin 1950-kuvan
kattopuurakenne osoittautui parvekkeen kannatukseksi, propylaion pylvästä
kiertävä lanka sähkölangaksi) eikä löytänyt yhtään raunio-, teline-,
työmaa- tai asehavaintoa.

Kansi nojaa vanhoihin kuviin: Bonfilsin 1800-luvun panoraama kattojen yli,
Rijksmuseumin albumikuva damaskoslaisen talon sisäpihasta ja nykyaikainen
näkymä Qasioun-vuorelle hedelmätarhojen takaa.

## Rinnakkaisuuden hinta

Aleppo ja Damaskos kirjoitettiin samaan aikaan, ja kolme toistoa syntyi
juuri siitä:

- **Ablaq selitettiin molemmissa khanjutuissa** lähes samoin sanoin.
  Selitys jäi Damaskokseen, jossa se on kokonaisen kappaleen aihe.
- **Kaksi porttijuttua toisti toisiaan** — sama seitsemän portin
  taivaankappaletaulukko, sama Bab al-Faraj kahdeksantena, sama Bab
  Sharqin kolmiaukkoisuus ja sama muurin 4,5 kilometriä. Taulukko jäi
  Itäportin juttuun, ja Kisanin portti avaa nyt oman aiheensa: portin
  nimen sai orja, ja porttien lukumäärästä lähteet ovat eri mieltä.
- **Tekkiye-nosto selitti ablaqin kolmannen kerran.** Termi jäi vain
  khanjuttuun; nosto kuvaa raidat sanomatta niiden nimeä.

Toistotutkan epäiltyjen parien määrä pysyi neljässätoista — Damaskos ei
tuonut yhtään uutta paria.

## Mitat

Kuusi nähtävyysjuttua 1 133–1 399 merkkiä, kaksi tai kolme kuvaa kussakin.
Kansisivu kolmella kansikuvalla ja kolmella nostolla (Azm-palatsi, Tekkiye
Süleymaniye, Hijaz-asema), aihesivu "Arki ja tavat" kolmella nostolla
(Beit Khalid al-Azem, Nur al-Dinin hammam, aprikoosilevy) ja
minitehtävällä.

`npm test` puhdas, `tarkista-kaksoisavaimet` puhdas,
`tarkista-karttapisteet` puhdas. Selaintarkistus 390 pikselin leveydellä:
kaksi liuskaa ja kaksi nähtävyyspopupia, kaikki kuvat latautuvat.

**Säätiedot puuttuvat** — Open-Meteon vuorokausikiintiö on yhä käytetty.

## Jonossa

Luxor, Riad, Sana, Aden, Salalah, Mosul, Tabriz, Teheran ja Isfahan — ja
Lähi-idän jälkeen Aasia. Mekka ja Medina odottavat yhä omistajan
erillistä päätöstä.

Luxorin kohdekartta vaatii ensin työkalumuutoksen: temppelialueet eivät
ole OpenStreetMapissa rakennuksia vaan `historic=ruins`- ja
`archaeological_site`-alueita, joita piirtotyökalu ei pyydä. Rajaus on jo
mitattu ja kirjattu, mutta karttaa ei julkaista ennen kuin työkalu osaa
piirtää ne.
