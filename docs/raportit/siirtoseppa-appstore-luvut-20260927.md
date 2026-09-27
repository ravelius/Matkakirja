# App Store -luvut: lataukset ja päivitykset (Siirtoseppä, 27.9.2026)

Fablen tilaus 27.9. Luvut on mitattu tuotannon sisältöpaketeista v233–v243 ja ämpäristä. Siirto tarkoittaa
gzip-pakattua latausta, jonka iOS pyytää oletuksena. Taustat: `siirtoseppa-eurooppa-eheys-20260927.md` ja
`siirtoseppa-maasto-offline-ehdotus-20260927.md`.

## Ensilataus (uusi asennus)

| Osa | Koko |
|---|---:|
| Sisältöpaketti (v243) | 26,0 Mt siirtona (132 Mt purettuna) |
| josta buildin mukana tuleva tilannekuva | 3,5 Mt |
| **Verkosta ensikäynnistyksessä** | **noin 22 Mt** |
| Maailman karttapohja (rasteri z0–z5 ja maasto z0–z6), haetaan näytettäessä | 19 Mt |
| Sovelluksen binääri | TestFlight / Natiiviseppä |

## Sisältöpäivitys (taustapäivitys)

Natiivi lataa uudesta versiosta vain tiedostot, joiden sha256 on muuttunut, sekä hakemiston.

| Vienti | Muuttuneet tiedostot | Siirto |
|---|---:|---:|
| v238 → v239 (koodi) | 2 | 0,15 Mt |
| v239 → v240 (muutosloki) | 2 | 0,07 Mt |
| v240 → v241 (Flickr-kuvat ämpäriin) | 11 | 3,8 Mt |
| v241 → v242 (koodi) | 2 | 0,15 Mt |
| v242 → v243 (sisältö) | 12 | 5,5 Mt |

Jokaiseen päivitykseen tulee lisäksi hakemisto, noin 0,1 Mt.

**Tyypillinen päivitys on noin 0,3 Mt, ja sisältömuutos on enintään noin 6 Mt.** Isoista päivityksistä suurin osa on
kokonaistiedostoja, jotka ladataan uudelleen pienestäkin muutoksesta: `kokoelmat/kaupunkilehdet.json` 2,1 Mt,
`media.json` 1,4 Mt sekä moduulit.

## Euroopan offline-lataus (natiivi 1.0.32+, skeemat 1.52–1.54)

| Osa | Siirto |
|---|---:|
| Rasteri z6–z9 ja Z10 kaupunkien ympärillä | noin 63 Mt |
| Maasto koko maasta z10:een ja z11–z12 50 km:n säteellä kaupungeista (1.53) | noin 100–120 Mt |
| Media (1.54): kuvat pienennettyinä (1024 px, JPEG 75) ja ämpärissä olevat puheet, enintään 100 Mt maata kohden | 1 143 Mt |
| **Eurooppa yhteensä (38 maata, `tavuja.offline`)** | **noin 1,3 Gt** |

Esimerkkejä: Tanska 35 Mt, Kroatia 37 Mt, Espanja 106 Mt (suurin). Kaikkien maiden offline-lataus on 3,46 Gt.
Musiikki, äänimaisemat ja tehosteet eivät kuulu offline-lataukseen, ja alkuperäiskokoiset kuvat haetaan verkosta,
kun iso kuva avataan. Ennen skeemoja 1.52–1.54 Euroopan offline-lataus oli noin 3,2 Gt, ja natiivi ei käyttänyt
siitä kuvia eikä puhetta offline-tilassa.

Tavoite (Fable 27.9.) oli noin 1,2 Gt tai alle. Jos kuvat pienennetään kokoon 960 px ja JPEG-laatuun 70 (otoksessa
−21 %), Eurooppa putoaa noin 1,1 Gt:hen. Luvut tarkennetaan 1.0.32:n päästä päähän -testissä (Tanska, Kroatia).

## Jono App Store -julkaisun jälkeen (Fable 27.9.: ei nyt)

- Kokonaistiedostojen pilkkominen, jotta sisältöpäivitys olisi alle 1 Mt:
  - `kaupunkilehdet.json` kaupungeittain; tiedostot `kokoelmat/kaupunkilehdet/<id>.json` ovat jo paketissa, joten
    natiivin pitää lakata lukemasta kokonaistiedostoa
  - `media.json` kokoelmittain tai maittain

  Molemmat vaativat Natiivisepän muutoksen ja skeemanoston.
