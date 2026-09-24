# Teosto ja Gramex: radiolähetysten soittaminen maksullisessa pelissä (taustamuistio)

*Siirtoseppä 23.9.2026, Fablen tilaus. Ei yhteydenottoja; kysymykset
lähetetään vasta omistajan luvalla. Tämä ei ole oikeudellinen arvio, vaan
kysymyslista.*

## Tilanne

- Natiivi iOS-peli (maksullinen) soittaa 115 maan radiolähetystä suoraan
  asemien omilta palvelimilta (`kokoelmat/radiot`, skeema 1.16). Peli ei
  tallenna, välimuista eikä muokkaa lähetystä. Nimi ja linkki asemalle
  näytetään.
- Lähetyksissä soi musiikkia. Aseman oma lupa (lupakirjeet) koskee aseman
  omaa oikeutta lähetykseensä. Se ei välttämättä kata musiikin tekijöiden
  (sävel ja sanat) eikä esittäjien ja tuottajien (äänitteet) oikeuksia
  uudessa käyttöyhteydessä.
- Web-versio on ilmainen. Kysymys koskee ensisijaisesti maksullista
  sovellusta.

## Keneltä kysytään

- **Teosto** edustaa säveltäjiä, sanoittajia, sovittajia ja kustantajia
  (musiikkiteosten esitys- ja välitysoikeudet Suomessa).
- **Gramex** edustaa esittäviä taiteilijoita ja äänitteiden tuottajia
  (äänitteiden käyttö: lähettäminen ja välittäminen yleisölle).
- Molemmat vastaavat Suomesta käsin. Ulkomaisten asemien lähetysten osalta
  pyydetään tieto siitä, kattaako suomalainen lupa käytön vai tarvitaanko
  lupa myös asemien maiden järjestöiltä.

## Mitä kysytään (sama kysymyslista molemmille)

1. Onko se, että sovellus soittaa kolmannen osapuolen julkista suoraa
   radiolähetystä muuttamattomana suoraan aseman palvelimelta,
   luvanvaraista välittämistä tai yleisölle saattamista, vai rinnastuuko
   se linkittämiseen (aseman oma soitin)?
2. Muuttaako maksullisuus asiaa? Sovellus myydään kertamaksulla tai
   lisäosana, eikä radion ympärillä ole mainontaa.
3. Jos lupa tarvitaan, mikä sopimus tai tariffi sopii (esim. verkkoradio,
   sovellukset tai taustamusiikki), millä perusteella maksu määräytyy
   (käyttäjät, kuuntelutunnit, kiinteä) ja kattaako se ulkomaiset asemat?
4. Riittääkö ilmoitus, jos asema on antanut kirjallisen luvan striiminsä
   käyttöön?
5. Mitä raportointia sopimus edellyttäisi (kuunneltujen asemien
   lokitus)?

## Mitä meillä on valmiina vastauksiin

- asemalista ja striimiosoitteet (`tools/vienti/radioluokat.json`,
  `radiokorvaavat.json`)
- tekninen kuvaus: suora toisto ilman välityspalvelinta, ei tallennusta
- lupakirjeen tila ([radio-luvat-mallikirje-20260923.md](radio-luvat-mallikirje-20260923.md))

## Päätettävää omistajalle

- Kysytäänkö ennen lupakirjeiden lähettämistä vai samaan aikaan?
  Ehdotus: samaan aikaan, koska vastaukset ovat toisistaan riippumattomia.
- Jos järjestöt vaativat tariffin: pidetäänkö radio maksullisessa
  sovelluksessa vai vain ilmaisessa webissä?
