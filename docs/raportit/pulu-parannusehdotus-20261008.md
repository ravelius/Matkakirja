# Pulun parannusehdotus (Pelikoodari 8.10.2026 klo 23.4x)

Päätoimittajan tilaama ehdotus. Tämä on vain raportti: mitään ei ole otettu käyttöön eikä puhetta ole generoitu.
Pohjana on siivottu JARJESTELMAKEHOTE, joka on PR #4239:ssä
([läpikäynti](pulu-taustaohje-lapikaynti-20261008.md)), ja natiivin PuluChat.Konteksti().

## 1. Pelin nykyinen sisältö: Pulu ei tunne peliään

Pulu ei tunne pelin uusia osia. Kehotteessa ei mainita linssejä, kuumailmapalloa, elävää opasta eikä Olavinlinnaa.
Konteksti kertoo vain:

- avoimen linssin nimen ("Näkymä: linssi auki: X")
- kaupungin, maan ja matkapäivän
- avoimen kortin tai lehden
- isoisän merkinnän

Jos pelaaja kysyy "mitä tässä pelissä voi tehdä?" tai "mikä tämä linssi on?", Pulu arvaa tai vastaa yleisesti.

**Ehdotus A (suositus): lyhyt kiinteä osio kehotteeseen.** Osio on noin 700 merkkiä, eli kehote kasvaa noin 4 %.
Siivouksessa säästettiin 24 %, joten tilaa on. Teksti noudattaa Raamatun linjauksia:

```
PELIN SISÄLTÖ (mitä pelaaja voi tehdä — kerro tästä, kun kysytään, äläkä lupaa muuta)
Kartta on nykyajan maailma vanhalla ilmeellä; matkaa ohjaa isoisän vuoden 1873 matkakirja ja Aarnin
luettelon aarteet. Kaupungeissa on kaupunkilehti ja maissa maalehti. Linssit avaavat maailmaa eri
kulmista: radio (asemat kaikista maista), ISS ja astronautin kamera, datalinssit, aikajanat (muun muassa
Ihmisen matka ja keksinnöt), ajattelijat sekä alue- ja virtalinssit (maapallon voimat: tuuli, pilvet).
Kuumailmapallolla lennetään 3D-maisemassa, ja elävä opas kiertää parhaiden 3D-kaupunkien kohteet.
Historialliset seikkailut pelataan maan tasalta; ensimmäinen on Olavinlinna vuonna 1499. Sinä et ole
mukana seikkailuissa etkä kerro niiden juonta tai ratkaisuja. Jos jotain ei ole tässä luettelossa, et
väitä, että se on pelissä.
```

Kaksi kohtaa PT:n tarkistettavaksi ennen käyttöönottoa:

- linssien tämänhetkinen nimilista natiivissa (keksinnöt, maapallon voimat)
- onko Pulu-chat avattavissa pallon tai oppaan aikana

Lisäksi "Pulu pois videopeleistä" pitää kirjata Raamattuun. Se puuttuu sieltä (läpikäynnin ristiriita 3).

**Ehdotus B (myöhemmin, natiivi): dynaaminen näkymärivi.** Natiivi lähettäisi "Näkymä: kuumailmapallo" tai
"Näkymä: elävä opas: <kaupunki>" samalla tavalla kuin astronautin kameran. Vanha worker ei kaadu
tuntemattomaan riviin. A riittää ensin, sillä B vaatii natiivimuutoksen ja junan.

## 2. Tunnetagit (omistaja 6.10. klo 08.51–08.57)

Omistaja totesi, että positiiviset tagit, naurut ja riemastumiset toimivat Pulun äänellä parhaiten, mutta pitkä
tasainen luenta kuluttaa korvia. Omistaja rajasi kaksi asiaa:

- ei muutoksia Pulun ääneen nyt
- striimiääni käsitellään myöhemmin

Siksi a on vain tekstiehdotus ja b odottaa omistajan päätöstä.

**a) Uuden maan saapumiskerronta (esigeneroidut repliikit), tekstiehdotus**

- Ensimmäiseen virkkeeseen tulee yksi positiivinen tagi ([excited] tai [laughs]) ja viimeiseen virkkeeseen yksi
  ([amused] tai [proud]). Keskelle ei tule tageja, koska tasainen keskiosa pysyy lyhyenä.
- Pituus on enintään 3–4 virkettä. Pidemmät osuudet siirretään Williamille tai tekstiksi (PT:n suositus 6.10.).
- [softly]- ja [whispers]-tageja ei käytetä (28.9. sääntö), eikä synkissä maissa tai aiheissa käytetä naurua.
- Ennen generointia testataan, mitkä tagit eleven_v4_turbo oikeasti toteuttaa Pulun äänellä.
  Testiin riittää yksi lyhyt otto omistajan luvalla, koska turbon tagituki voi poiketa v3:sta.
- Generointi tehdään vasta omistajan sanatarkalla luvalla määrästä (noin 0,067 krediittiä per merkki).

**b) Striimivastaukset (PUHETAGIKEHOTE), odottaa omistajaa**

- "Harvinainen mauste, enintään yksi" muutetaan muotoon "enintään kaksi". Toinen tagi on suositeltu
  alustuksen alkuun ([laugh] tai <fast>), kun aihe ei ole synkkä. Ydinvastaus pysyy ilman tageja.
- Kun ääni on päällä, ydinvastaukseen tulee pituuskatto, esimerkiksi enintään 4 virkettä. Katto edellyttää,
  että pyyntö kertoo äänen olevan päällä. Jos kenttää ei ole, vanha käytös säilyy.

## 3. Mitä pelaajat kysyvät: lokia ei ole

Worker ei tallenna pelaajien vapaita kysymyksiä eikä vastauksia. Tämä on tietoinen ratkaisu: osa käyttäjistä
on alaikäisiä, ja kysymykset voivat sisältää henkilötietoja. Tallessa on vain:

- laskurit (rajat)
- valmiiden ehdotuskysymysten vastausvälimuisti R2:ssa, jonka avaimena on tiiviste
- ehdotus- ja suuntalistat 6 tunnin ajan

Epäonnistuneita vastauksia ei siis voi analysoida. Jos omistaja haluaa tietoa, kevyin turvallinen vaihtoehto on
koostelaskuri ilman tekstiä. Se laskisi päivittäin näkymätyypin (kartta, linssi, lehti, kortti, astro),
kehyslajin sekä "en tiedä"- ja kieltäytymisvastausten määrän. Tämä on omistajan päätös (yksityisyys) eikä
kuulu tähän erään. Toinen vaihtoehto on testaajien TF-palaute ja natiivin "ehdota sisältöä" -nappi, joka on jo olemassa.

## Suositusjärjestys

1. Osio A kehotteeseen. Tämä on pieni ja turvallinen muutos, joka tarvitsee omistajan hyväksynnän kuten #4239.
2. Saapumiskerronnan tagiehdotus omistajalle esimerkkikoosteena: ensin yksi maa ja yksi otto luvalla.
3. Striimitagit ja koostelaskuri, kun omistaja palaa striimiääneen.
