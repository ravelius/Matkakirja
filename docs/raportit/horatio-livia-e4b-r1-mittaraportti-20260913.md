# Horatio + Livia E4b R1 – mittaraportti

- Revisio: `eu-hl-e4b-20260913-r2-approved1`
- Julkaistu lähtörevisio: `079284e1cf09f650ed7e5f3d54f54c4e3da933b1`
- Tila: hyväksytty ja sisältöjäädytetty; audioajo vain RC/animaatiovetäjälle
- Mittatapa: Unicode-merkit ja välilyönnein erotetut sanat; parissa ei lasketa erotinmerkkiä.

## Mitat

| Kaupunki | Lähtö H | Hyväksytty H | Lähtö L | Hyväksytty L | Lähtö pari | Hyväksytty pari | Tulos |
|---|---:|---:|---:|---:|---:|---:|---|
| Bergen | 310/40 | 168/21 | 111/13 | 166/21 | 421/53 | 334/42 | alittaa |
| Oslo | 332/43 | 183/23 | 107/15 | 166/24 | 439/58 | 349/47 | alittaa |
| Kööpenhamina | 342/46 | 190/26 | 109/13 | 162/22 | 451/59 | 352/48 | alittaa |
| Islanti | 357/46 | 194/22 | 107/14 | 156/20 | 464/60 | 350/42 | alittaa |

Muoto on tarkoituksella kaupunkikohtainen: Bergenissä lokki kastelee sateelta suojautuneen Pulun, Oslossa ihmiset yllättävät samalla kattoreitillä, Kööpenhaminassa musiikki houkuttelee kahteen tanssiaskeleeseen ja Islannissa lämmin lepo vaihtuu nopeasti uuteen lentointoon. Kahvia, automaattista pullaa tai kaikille toistuvaa rakennetta ei käytetä.

## Exact ElevenLabs v3 -TTS ja cue-ankkurit

Tagit ovat ääniohjeita eivätkä kuulu näkyvään tekstiin. Tagien poistaminen palauttaa lukukopion tekstin täsmälleen.

### Bergen

**Horatio TTS**

> [curious] Bergenin Bryggenissä kauppias nosti kuivatun turskan kuin hopeaharkon. [mischievously] Sade rummutti kattoa; kala pysyi kuivana, minä en. [softly] Kaupungin arvojärjestys selvisi ilman tulkkia.

**Livia TTS**

> [brightly] Bryggen on nyt maailmanperintöä. [curious] Suojasin kirjeen räystään alla sateelta, kun viereinen lokki ravisteli vedet päälleni. [mischievously] Kirje säilyi kuivana. Minä vaihdoin räystästä.

| Cue-ID | Puhuja | Ankkuri | Tarkoitus | Voima |
|---|---|---|---|---:|
| `bergen.r1` | H | `kuin hopeaharkon` | huvittuu | 0.45 |
| `bergen.r3` | H | `kala pysyi kuivana` | huvittuu | 0.55 |
| `bergen.r4` | H | `ilman tulkkia` | myotailee | 0.40 |
| `bergen.livia.c1` | L | `nyt maailmanperintöä` | vakavoituu | 0.35 |
| `bergen.livia.c2` | L | `viereinen lokki ravisteli` | hammastyy | 0.35 |
| `bergen.livia.c3` | L | `Minä vaihdoin räystästä` | huvittuu | 0.40 |

### Oslo

**Horatio TTS**

> [curious] Christianian vuonolla lankut lähtivät maailmalle siisteinä pinoina. Kivitalojen sanottiin kasvavan puusta. [softly] Poimin vedestä lastun; se tuoksui yhä metsältä, vaikka matka oli jo alkanut.

**Livia TTS**

> [brightly] Nimi on Oslo, ja oopperan katolla kävellään. [surprised] Hämmästyin, kun ihmiset nousivat samalle katolle kuin minä. [warmly] Kerrankin rakennus oli yhtä hyvä reitti jaloille ja siiville.

| Cue-ID | Puhuja | Ankkuri | Tarkoitus | Voima |
|---|---|---|---|---:|
| `oslo.r1` | H | `siisteinä pinoina` | huvittuu | 0.40 |
| `oslo.r3` | H | `Poimin vedestä lastun` | myotailee | 0.30 |
| `oslo.r4` | H | `tuoksui yhä metsältä` | vakavoituu | 0.45 |
| `oslo.livia.c1` | L | `Nimi on Oslo` | myotailee | 0.35 |
| `oslo.livia.c2` | L | `ihmiset nousivat samalle katolle` | hammentynyt | 0.35 |
| `oslo.livia.c3` | L | `jaloille ja siiville` | huvittuu | 0.40 |

### Kööpenhamina

**Horatio TTS**

> [curious] Tivolissa vanha pari tanssi niin hitaasti, että orkesteri ehti edelle. [mischievously] He eivät lähteneet sen perään. Puiston lamput syttyivät ennen tähtiä. [softly] Olin tullut katsomaan huvituksia; muistin heidät.

**Livia TTS**

> [brightly] Tivoli huvittaa yhä. [mischievously] Orkesterin sävel sai minut laskeutumaan tanssilattian reunalle. Otin kaksi pientä askelta ja poistuin ennen kuin kukaan ehti pyytää kolmatta.

| Cue-ID | Puhuja | Ankkuri | Tarkoitus | Voima |
|---|---|---|---|---:|
| `kobenhavn.r1` | H | `orkesteri ehti edelle` | huvittuu | 0.45 |
| `kobenhavn.r2` | H | `lähteneet sen perään` | myotailee | 0.40 |
| `kobenhavn.r4` | H | `muistin heidät` | vakavoituu | 0.50 |
| `kobenhavn.livia.c1` | L | `Tivoli huvittaa yhä` | myotailee | 0.35 |
| `kobenhavn.livia.c2` | L | `laskeutumaan tanssilattian reunalle` | huvittuu | 0.40 |
| `kobenhavn.livia.c3` | L | `pyytää kolmatta` | myotailee | 0.45 |

Nykyisen packin lampiankkuri `kobenhavn.r3` jää ehdokkaasta pois: Tivolin virallisen historian mukaan nykyinen Tivoli-järvi luotiin vasta 1887, joten sitä ei sidota vuoden 1873 kohtaukseen.

### Islanti

**Horatio TTS**

> [curious] Reykjavikin ulkopuolella naiset pesivät pyykkiä kuumassa lähteessä. Annoin paitani pestäväksi. [mischievously] Maa teki ensi kerran palveluksen vaatimatta lapioimista. [softly] Kaulus puhdistui; käsitykseni saaresta ei.

**Livia TTS**

> [brightly] Reykjavíkin talot lämpenevät yhä maan voimalla. [softly] Löysin lämpimän räystään, lämmittelin varpaitani ja päätin levätä pitkään. [mischievously] Hetkeä myöhemmin olin jo ilmassa.

| Cue-ID | Puhuja | Ankkuri | Tarkoitus | Voima |
|---|---|---|---|---:|
| `islanti.r1` | H | `kuumassa lähteessä` | hammastyy | 0.40 |
| `islanti.r2` | H | `Annoin paitani pestäväksi` | myotailee | 0.30 |
| `islanti.r3` | H | `vaatimatta lapioimista` | huvittuu | 0.55 |
| `islanti.r5` | H | `käsitykseni saaresta ei` | huvittuu | 0.50 |
| `islanti.livia.c1` | L | `lämpenevät yhä maan voimalla` | hammastyy | 0.35 |
| `islanti.livia.c2` | L | `lämmittelin varpaitani` | myotailee | 0.35 |
| `islanti.livia.c3` | L | `jo ilmassa` | huvittuu | 0.40 |

## Lähde-SHA:t

| Kaupunki | Pack-polku | Blob-SHA lähtörevisiossa |
|---|---|---|
| Bergen | `js/packs/fokusvirta-bergen.js` | `8b6b244ef8e657db9c5d4b1e45cc98c4846060b5` |
| Oslo | `js/packs/fokusvirta-oslo.js` | `ae7bada01cd5a6589957a31abf2d3ed264ae26e9` |
| Kööpenhamina | `js/packs/fokusvirta-kobenhavn.js` | `6954983fd7ecfaf79da72303bfecd0403f4dbfa9` |
| Islanti | `js/packs/fokusvirta-islanti.js` | `65b2a1ebda26189403f7611a6eab11735ed7d8b4` |

## Viralliset faktalähteet ja tarkistus

| Kaupunki | Väite | Tulos | Virallinen lähde |
|---|---|---|---|
| Bergen | Bryggen liittyi hansakauppaan ja kuivakalan kauppaan; kohde on maailmanperintöä. | OK | [UNESCO World Heritage Centre: Bryggen](https://whc.unesco.org/en/list/59) ja [Museum Vest: The King Cod](https://hanseatiskemuseum.museumvest.no/kongetorsk-engelsk) |
| Oslo | Christianian tärkeä elinkeinopohja oli puutavara; kaupungin nimi on nyt Oslo. | OK; “kivitalot kasvoivat puusta” on Horation kuvallinen tiivistys. | [Oslo Museum: Oslo fra middelalder til mangfold](https://www.oslomuseum.no/hva-skjer/oslove/fra-middelalder-til-mangfold/) ja [Oslo kommune: nimihuomautus](https://statistikkbanken.oslo.kommune.no/statbank/pxweb/en/db1/db1__Befolkning__Folkemengde/OK-BEF008.px/) |
| Oslo | Oopperatalon katto on kaikille avoin julkinen pinta, jolla kävellään. | OK; nykyhavainto voi muuttua tilapäisten käyttörajoitusten vuoksi. | [Den Norske Opera & Ballett: About the Oslo Opera House](https://www.operaen.no/en/about-us-oslo-operahouse/about-the-oslo-opera-house/) |
| Kööpenhamina | Tivoli avattiin 1843; musiikki ja valaistus kuuluvat sen historiaan ja puisto toimii yhä. | OK. | [Tivoli: The history of Tivoli Gardens](https://www.tivoli.dk/en/about-tivoli/the-history-of-tivoli-gardens), [Tivoli: About Tivoli](https://www.tivoli.dk/en/about-tivoli) ja [Tivoli: Illuminations](https://www.tivoli.dk/program/events/illuminationer-sit-2025) |
| Kööpenhamina | Tivolin nykyinen järvi sopisi vuoden 1873 kohtaukseen. | Ei: virallinen historia ajoittaa järven vuoteen 1887; yksityiskohta poistettiin. | [Tivoli: The history of Tivoli Gardens](https://www.tivoli.dk/en/about-tivoli/the-history-of-tivoli-gardens) |
| Islanti | Reykjavíkin naiset pesivät ennen pyykkiä Laugardalurin kuumissa lähteissä. | OK. | [Reykjavík City Museum: The Washerwomen's Walk](https://borgarsogusafn.is/en/exhibitions/the-washerwomen-s-walk-a-stroll-into-history) |
| Islanti | Reykjavíkin rakennuksia lämmitetään nykyisin geotermisellä kaukolämmöllä. | OK; “maan voimalla” on yleistajuinen tiivistys kuumasta vedestä, joka tulee geotermisistä kaivoista ja voimaloista. | [Veitur: District heating](https://www.veitur.is/en/f/district-heating) ja [Veitur: District heating system](https://www.veitur.is/en/dreifikerfi-heitt-vatn) |

## Kuva-inventaario

| Kaupunki | Horatio I1 | Horatio I2 / P2 | Pulu-cam | Päätös |
|---|---|---|---:|---|
| Bergen | `bergen-r20260909-paper-v4.jpg` (hyväksytty SHA-256 `8f941560edf447ee29ea7fb51dc50b7dbaaa95f8a0edb5e0f18541321153a26c`) | `bergen-r20260911-paper2-v1.jpg`, olemassa | 2 kuvaa | säilytä kaikki |
| Oslo | `oslo-r20260909-paper-v4.jpg` (hyväksytty SHA-256 `256890fd6fcbe4fdda283a028e93cd739d9c73406df7fac4fcee895365339349`) | `oslo-r20260911-paper2-v1.jpg`, olemassa | 2 kuvaa | säilytä kaikki |
| Kööpenhamina | `kobenhavn-r20260909-paper-v4.jpg` (hyväksytty SHA-256 `11402c573860ea6849049ddd0d2d041a594eaa3e7c3c8d05932bae0fb4fef452`) | `kobenhavn-r20260911-paper2-v1.jpg`, olemassa | 1 kuva | säilytä kaikki |
| Islanti | `islanti-r20260909-paper-v4.jpg` (hyväksytty SHA-256 `96ad99971a4ad7f243d4a725cc550c17e3ad315ae6c0f2bea1b2425177a69b20`) | `islanti-r20260911-paper2-v1.jpg`, olemassa | 1 kuva | säilytä kaikki |

P2-kuvia ei puutu yhdeltäkään E4b-kaupungilta. Tämä revisio ei muuta kuvien URL:eja, kuvatekstejä, lähteitä eikä hyväksyntätilaa.

## QA

- Neljä H/L-paria alittaa lähtöversion sekä merkki- että sanarajan.
- TTS-tagien poisto palauttaa näkyvät tekstit täsmälleen.
- Jokainen cue-ankkuri esiintyy täsmälleen kerran oman puhujansa näkyvässä tekstissä.
- Historiallisesti liian myöhäinen Tivoli-järvi on poistettu vuoden 1873 tekstistä.
- Packeja, testejä ja kuvia ei ole muutettu.
