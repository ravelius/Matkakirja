# Petit Palais: kohdekartan juttuteksti (Pariisi), SK 11.11.2026

Tilaus: PT (KK 20.21). Muoto kuten Pariisin muilla kohteilla (js/packs/nahtavyysjutut.js, pariisi-lohko, esim. 'Grand Palais'): `aika`, `teksti` (3 kappaletta, `\n\n`), `kuvat`, `lahde: 'Wikipedia'`. Avain täsmälleen kohteen nimi kartalla (tarkista NUI:lta: "Petit Palais"). Teksti on oma tiivis suomenkielinen kooste, ei käännös.

## Valmis lohko (liitettävä pariisi-lohkoon Grand Palais'n jälkeen)

```js
    'Petit Palais': {
      aika: '1897–1900',
      teksti: 'Petit Palais rakennettiin vuoden 1900 maailmannäyttelyyn '
          + 'Champs-Élysées’n tuntumaan, Grand Palais’ta vastapäätä. '
          + 'Arkkitehti Charles Girault aloitti työn 10. lokakuuta 1897, ja '
          + 'rakennus valmistui huhtikuussa 1900. Toisin kuin monet '
          + 'näyttelyn rakennukset, sen oli alusta asti tarkoitus jäädä '
          + 'pysyväksi taidemuseoksi.'
        + '\n\n'
        + 'Vuonna 1902 siitä tuli Pariisin kaupungin kuvataidemuseo. Samana '
          + 'vuonna museolle tuli Dutuitin veljesten lahjoittama keskiajan ja '
          + 'renessanssin teosten kokoelma. Julkisivun päätyä koristaa '
          + 'Jean Antoine Injalbertin veistämä Pariisi muusien ympäröimänä.'
        + '\n\n'
        + 'Rakennuksen keskellä on puoliympyrän muotoinen pylväskäytävä, '
          + 'joka avautuu puutarhaan. Sen pylväät ovat vaaleanpunaista '
          + 'Vosgesien graniittia, ja koristeissa on kullattua pronssia. '
          + 'Koristemaalaukset ja -veistokset valmistuivat vasta vuosina '
          + '1903–1925, ja rakennus on ollut suojeltu historiallinen '
          + 'monumentti vuodesta 1975.',
      kuvat: [
        {
          tiedosto: 'Petit Palais, Paris 8th 003.JPG',
          lyhyt: 'Petit Palais valmistui huhtikuussa 1900 maailmannäyttelyn rakennukseksi.',
          selite: 'Petit Palais rakennettiin vuoden 1900 maailmannäyttelyyn ja '
            + 'on sittemmin toiminut Pariisin kaupungin kuvataidemuseona.',
          lahde: 'Moonik, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
```

## KK:n hyväksyntä 20.26 ja korjaukset tehty
Hyväksytty kahdella korjauksella (tuntumaan / partitiivi; viimeinen kappale kahdeksi virkkeeksi): tehty yllä. Introrivi "Petit Palais · 1900". Teksti luetaan kertojan äänellä: PT tilaa äänityksen. Kuva: Commons "Petit Palais, Paris 8th 003.JPG", julkisivu, tekijä Moonik, CC BY-SA 3.0, 3046×2096 (Commonsin kuvauksen mukaan julkisivukuva; SK ei ole nähnyt kuvaa silmin, koska ei ladattu: KK/NUI katsoo ennen käyttöä).

## Lähteet (2, luettu 11.11.2026)

1. [Wikipedia: Petit Palais](https://en.wikipedia.org/wiki/Petit_Palais): arkkitehti Girault; rakennus 10.10.1897–huhtikuu 1900; tarkoitus pysyväksi museoksi; 1902 Palais des Beaux-Arts de la Ville de Paris; Dutuit-kokoelma; puoliympyrän muotoinen pylväskäytävä, vaaleanpunainen Vosgesien graniitti ja kullattu pronssi; Injalbertin tympanon (Pariisi muusien ympäröimänä); monument historique 1975.
2. [Petit Palais, L'histoire du Petit Palais (virallinen)](https://www.petitpalais.paris.fr/explorer/le-petit-palais/lhistoire-du-petit-palais): arkkitehti Girault; maailmannäyttelyrakennus; 1902 museoksi (Palais des Beaux-Arts de la Ville de Paris); Dutuitin veljesten lahjoitus tuli museolle 1902; koristemaalaukset ja -veistokset 1903–1925; péristyle avautuu puutarhaan. Lisäksi [Paris Musées -kokoelmasivu](https://www.parismuseescollections.paris.fr/en/the-petit-palais) (hakutuloksesta: rakennettu 1900 näyttelyyn, museoksi 1902).

## Päätettävää KK:lle

- **Kuvat:** `kuvat` jätetty tyhjäksi; Commons-kuvaa ei ole valittu (valitaan ja tarkistetaan erikseen, jos KK haluaa; muut jutut käyttävät 1–3 kuvaa). NUI voi käyttää kohteen nykyistä esittelykuvaa.
- **Ääneen:** nahtavyysjutut ovat pop-up-luettavia tekstejä; äänitystä en tiedä. Jos tämä luetaan ääneen, Äänittäjä saa tekstin vasta KK:n kuittauksen jälkeen. Tekstissä ei ole vaikeita nimiä: Girault, Injalbert, Dutuit, Vosges.
- **aika-kenttä:** "1897–1900" kuten Grand Palais'lla (rakennusaika alle 3 v; vuosirajasäännön mukaan ("≤12 v = valmistumisvuosi") kuvien päälle tulevalla rivillä olisi "Petit Palais · 1900").
- **Avoin (ei tekstissä):** arkkitehtikilpailun vuosi (Wikipedia 1894, Paris Musées 1896): jätetty pois. Ilmaista sisäänpääsyä ei ole todennettu: jätetty pois.
