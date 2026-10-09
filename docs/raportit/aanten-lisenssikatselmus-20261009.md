# Äänten lisenssikatselmus: natiivipeli (Pelikoodari 9.10.2026 klo 04.xx)

PT:n tilaus. Katselmus kattaa kaikki äänet, joita natiivi soittaa:

- natiivin master, BUILD 168
- junat 169–171, joiden äänipaketit ovat jo ämpärissä
- sisältöpaketin kenttä-äänitykset (js/aani-ehdokkaat.js)

Jokaiselta äänelle tarkistettiin neljä asiaa: lähde, lisenssi, löytyykö ääni omasta ämpäristä (media.matkakirja.app) ja onko CC BY -nimeäminen
Lähteet › Äänet -näkymässä (data/aanilahteet.json → natiivin `UI/Resources/Lahteet/aanilahteet.json`).

**Työkalut:**

- `_tyo/aani-qa/lisenssikatselmus.py`: ämpärin manifestit ja AaniTaulut.cs
- `scratchpad ae/kaytossa.mjs + aporee.py`: sisältöpaketti, Freesound-API ja archive.orgin metadata-API (robots sallii)
- Sonnet-agentti: repoon pakattujen 59 äänen lähteet commit-historiasta ja LAHTEET-tiedostoista

## Yhteenveto

- **Ei yhtään NC- tai ND-ääntä käytössä.** Edellisen katselmuksen kolme NC-ääntä (723081, 848927, 411996) ovat enää vain
  aani-ehdokkaat.js:n POISTETUT-listassa.
- **Ei ulkoisia CDN-osoitteita ajossa.** Koodissa on 33 cdn.freesound.org- ja 4 archive.org-osoitetta, mutta AaniOsoite.Url ohjaa jokaisen
  omaan peiliin `aanet/freesound-<id>.mp3` tai `aanet/aporee-<tunniste>.<pääte>`. Alkuperäinen osoite on vain varareitti.
  Kaikki 118 sisältöpaketin peiliä ja kaikki 125 manifestien ääntä vastaavat 200.
- **PUUTE, korjattu tässä PR:ssä:** 19 CC BY -ääneltä puuttui nimeäminen sekä mainista että natiivista. aanilahteet.json kasvaa
  54 → 73 nimeämiseen.
  - Pulun tehosteet: 6
  - kaupunkiäänimaisema aanimaisema-v2: 7
  - Ihmisen matka v2: 6

  Natiivi-UI kopioi tiedoston junaan.
- **Muut korjattavat** ovat dokumentaatiota, eivät lisenssiongelmia. Ne ovat lopussa.

## Ryhmittäin

| ryhmä | ääniä | lähde | lisenssit | ämpäri | CC BY nimetty |
|---|---|---|---|---|---|
| Sisältöpaketti: kaupunkien kenttä-äänitykset ja maisemakorit (aani-ehdokkaat.js → AaniTaulut) | 118 (52 Freesound, 66 radio aporee) | Freesound, archive.org (radio aporee) | 40 CC0, 42 PD-merkintä, 14 CC BY, 22 CC BY-SA 3.0 | peilit 118/118 = 200 | 36/36 ✓ |
| Olavinlinna e3-v3, fp-v1b, fp-v3, saa-v3 | 53 | Freesound, Kenney, OpenGameArt, Commons | kaikki CC0 tai PD (pakettien LAHTEET.md) | 200 | ei nimeämisvelvoitetta |
| Olavinlinna lapi-v1 (juna 171) | 8 | Freesound, Sonniss | 4 CC0, 3 CC BY 4.0, 1 Sonniss | 200 | 3/3 ✓ (#4248) |
| repliikit-v4, opas, luennat, Pulu, isoisä (puhe) | – | ElevenLabs TTS (oma tilaus) | oma | 200 | – |
| pallo-aanimaisema-v1 | 7 | Freesound | 4 CC0, 3 CC BY 4.0 | 200 | 3/3 ✓ |
| elävä kaupunki v1 (juna 170) | 9 | Sonniss, Freesound | 4 Sonniss, 2 CC0, 3 CC BY 4.0 | 200 | 3/3 ✓ (#4252) |
| Sonniss-tuulet v1 ja Sonniss v2 (169–171) | 6 | Sonniss GDC | rojaltivapaa, ei nimeämistä | 200 | – |
| kaupunkiäänimaisema aanimaisema-v2 (+ äänikartat, OSM ODbL) | 16 | Freesound | 8 CC0, 8 CC BY 4.0 | 200 | 1/8 → **8/8 tässä PR:ssä** |
| Ihmisen matka v2 | 15 | Freesound | 9 CC0, 6 CC BY 4.0 | 200 | 0/6 → **6/6 tässä PR:ssä** |
| Pulun tehosteet (aanet/tehosteet/pulu) | 16 | Freesound | 10 CC0, 5 CC BY 4.0, 1 CC BY 3.0 | 200 | 0/6 → **6/6 tässä PR:ssä** |
| Ukkonen 01–04 (pallo) | 4 | Commons "Storm thunderbolts.ogg" (pdsounds) | PD | 200 | – |
| Cupola: humina v2, ohjaamo v1 | 4 | oma synteesi ja Freesound | oma, CC0 | 200 | – |
| Cupolan EVA 38 -radio | 1 | NASA | PD, **pois käytöstä** (RadioKaytossa = false) | 200 | – |
| Astronautin kameran humina | 1 | ElevenLabs (Codex 16.9.) | oma | 200 | – |
| Repoon pakatut: StreamingAssets/mukana | 26 | ElevenLabs SFX 19, Freesound 4, ElevenLabs TTS 2, Lyria 1 | oma, CC0 | sovelluksessa | ei nimeämisvelvoitetta |
| Repoon pakatut: Pallokori, Kävely, Radio, Mylly, Tavli | 32 | ElevenLabs, Freesound, Kenney, Commons | oma, CC0, PD | sovelluksessa | ei nimeämisvelvoitetta |
| Repoon pakattu: Vefects-kynttilä | 1 | Unity Asset Store | Asset Store EULA (sallii sovelluksen sisällä) | sovelluksessa | – |

BY-SA 3.0 koskee vain ääntä itseään: jos sitä muokataan, muokattu ääni jaetaan samalla lisenssillä, eikä ehto leviä pelin koodiin.
Nimeäminen riittää, kun Lähteet-näkymässä on tekijä, lisenssi ja linkki.

## Tässä PR:ssä lisätyt 19 nimeämistä

| ryhmä | tunnus | Freesound | tekijä | lisenssi |
|---|---|---|---|---|
| Pulu | tomahdys-laskeutuminen | 632535 | joedeshon | CC BY 4.0 |
| Pulu | sekoilu-2 | 79671 | joedeshon | CC BY 4.0 |
| Pulu | ovi-lamahdys | 411789 | InspectorJ | CC BY 4.0 |
| Pulu | viuhahdus-lahto | 160757 | CosmicEmbers | CC BY 3.0 |
| Pulu | kirjain-suhina | 460473 | Vilkas_Sound | CC BY 4.0 |
| Pulu | pulla-puraisu | 412068 | InspectorJ | CC BY 4.0 |
| Ihmisen matka | savanni | 58233 | reinsamba | CC BY 4.0 |
| Ihmisen matka | jokilaakso | 328140 | KasperAugustTopp | CC BY 4.0 |
| Ihmisen matka | meren-ranta | 397358 | nsmusic | CC BY 4.0 |
| Ihmisen matka | vuoristotuuli | 437514 | fundamental_harmonics | CC BY 4.0 |
| Ihmisen matka | avomeri | 645968 | iainmccurdy | CC BY 4.0 |
| Ihmisen matka | rantalinnut | 355344 | klankbeeld | CC BY 4.0 |
| Äänimaisema | kello-01 | 268253 | alemarino | CC BY 4.0 |
| Äänimaisema | kirkko-01 | 109230 | inchadney | CC BY 4.0 |
| Äänimaisema | puisto-01 | 262691 | Toybox | CC BY 4.0 |
| Äänimaisema | raitiovaunu-01 | 155034 | Erbsland-Music | CC BY 4.0 |
| Äänimaisema | rautatie-01 | 169722 | Kyster | CC BY 4.0 |
| Äänimaisema | satama-01 | 133446 | inchadney | CC BY 4.0 |
| Äänimaisema | tori-01 | 815029 | klankbeeld | CC BY 4.0 |

Webin js/lahteet.js mainitsee Pulun tehosteet ja Ihmisen matkan ryhmärivinä ("tekijät manifestissa"). Natiivin Lähteet-näkymä
lukee kuitenkin vain aanilahteet.json:ia, joten nimet puuttuivat natiivista kokonaan.

## Muut korjattavat (eivät lisenssiongelmia)

1. **Natiivi-UI:** kopioi aanilahteet.json (73) Lähteisiin samaan junaan, jossa ovat 170:n äänet.
2. **LS1:** `Linssit/Resources/Aanet/Pallokori/eleven-korin-narina.wav` on 8.10. jälkeen Freesoundin 264306 "Floor Creak 1"
   (olliehahn12, CC0), mutta nimi ja PalloKori.cs:15:n kommentti sanovat ElevenLabs.
   - Ehdotus: nimeksi `kirjasto-korin-narina` ja lähde `_lahteet/pallokori-aanet/`-tiedostoon.
   - Kyse on vain dokumentaatiosta, ei nimeämisvelvoitteesta.
3. **Vefects-kynttilän ylläpitäjä (Siirtoseppä/LR):** `Assets/Vefects/LAHTEET.md` sanoo "tuotu sellaisinaan", vaikka silmukan
   saumaa muokattiin 8.10. (f059db199). EULA sallii muokkauksen, mutta tiedosto pitää päivittää.
4. **Avoimet tarkistukset omistajalle:** ehtoja ei ole luettu itse.
   - Google Lyrian ehdot (etusivun musiikki).
   - ElevenLabsin ehdot pallokorin koeäänille. Muut ElevenLabs-äänet on dokumentoitu maksulliselle tilille.
