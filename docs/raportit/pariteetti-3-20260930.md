# Pariteettikatsaus 3 web vs natiivi, 30.9.2026 (Natiivi-UI)

Päätoimittajan tilaus 30.9. klo 21.4x: päävirrat ilman linnaa ja Cupolaa, web malli. Sama muoto kuin `pariteetti-2-20260929.md`.

## Aineisto ja rajaus

- **Web:** tuotanto 30.9. klo 21.5x, `tools/pariteettikuvat.mjs --kaupunki ateena --koot 393x852` (nosto `--kaupunki marseille`,
  työkalun pont-du-gard). 14/15 kuvaa (`kaupunkilehti-kansi-alas` kaatui työkalussa). Uudet maalehdet (#3706) eivät ole vielä mainissa.
- **Natiivi:** 1.1 (79) (juna-1.1.79-0a7cd863; 1.1 (78) poistui siivouksessa), iPhone 17 FB234D08, puhdas asennus, Ateena,
  skripti `proto-3d/lokit/natiivi-ui-1035/skriptit/pariteetti3.sh`.
- **Kuvaparit** (web vasemmalla): `/Users/Shared/Claude/proto-3d/lokit/natiivi-ui-pariteetti3/parit/<näkymä>.png`.
- **Sallitut erot (ei listalla):** aloitusportin natiivin otsikko ja aloitusvalinnan yökartta (päätös 30.9. kohta 1), pillerivalikko
  webin täyspaneelin sijaan ja linssivalikon esikatselu (natiivi ensin), natiivin lisälinssit (Isoisän linssi 1873, Ihmisen matka II,
  Maapallon vuosi), yläpalkin muoto "1/80, aamu · 400 £" (omistaja 30.9.).

## Löydökset

| # | Näkymä | Ero | Suunta | Vakavuus | Korjaa | Kuvapari |
|---|---|---|---|---|---|---|
| 1 | Kartta saapumisen jälkeen | Webissä Ateenan kaupunkikuvamerkki ("Ateena") ja lähempi zoomi; natiivissa merkki puuttuu ja kartta on kauempana. **Epävarma:** natiivi kuvattiin `uusi-peli`-oikotiellä (pelaajan polulla `ui aloita ateena` merkki näkyi 20.1x-ajossa). | natiivi puuttuu? | keski | Natiivi-UI tarkistaa pelaajan polulta | kartta.png |
| 2 | Kaupunkilehden herokuva | Webissä ‹ › -nuolet kuvassa, natiivissa ei; natiivin kuvalla vaalea kehys (pariteetti-2 rivi 8, yhä auki). | natiivi eri | matala | Natiivi-UI | kaupunkilehti-kansi.png |
| 3 | Nostokortin juttu | Webissä ✕-sulkunappi oikeassa yläkulmassa ≡:n ja kaiuttimen vieressä; natiivissa ei (sulku ohinapautuksella). | natiivi puuttuu | matala | Natiivi-UI | nostokortti-juttu.png |
| 4 | Pulun chat | Web: esittely + "Ehdota sisältöä" -nappi, ei kysymysehdotuksia; natiivi: esittely + 2 kysymysehdotusta, ei Ehdota sisältöä -nappia. | eri | keski | **Päätoimittaja** linjaa (kumpi malli) | pollo.png |
| 5 | Topografialinssin selite | Webissä värien selite auki; natiivissa pelkkä "TOPOGRAFIALINSSI"-pilleri 8 s avauksesta. **Epävarma:** natiivin selite voi kutistua ajastimella (tarkistettava 2 s kohdalla). | natiivi eri? | matala | Natiivi-UI | linssi-selite.png |
| 6 | Maalehden aihesivu | **SULJETTU 1.10. (tarkistus3, ei eroa):** natiivin `ui lehti sivu N` laskee aihesivut ilman kantta (sivu 1 = ensimmäinen aihe), webin sivu 2 laskee kannen mukaan. Sivujärjestys sama: Ranskan Historia = luolamaalaukset molemmissa. Ei muutosta. | – | – | – | natiivi/t3-6-maalehti-historia.png, t3-6-maalehti-sivu1.png |
| 7 | Linssivalikko | Natiivissa keskeneräisten rivit ilman "(keskeneräinen)"-päätettä; muuten sallittuja eroja. | natiivi eri | matala | Natiivi-UI | laukku-linssit.png |
| 8 | Natiivi ilman web-paria | Radio kunnossa. Tietoja-kortin päällä pelikello 1.1 (79):ssä (korjaus 762fd9ad junassa 80). Apurahakortti: **SULJETTU 1.10. (tarkistus3, ei vikaa):** ajossa `ui sulje` sulki Tietoja-kortin lisäksi aloitusnäkymän, jonka sisällä apurahakortti on; aloitusportilla `ui apuraha auki` avaa kortin ja `loppuun` näyttää kuvarivin (pelaajan nappi on vain portilla). | – | – | Natiivi-UI | natiivi/tietoja-valinnassa.png, radio.png, t3-8-apurahakortti.png, t3-8-apurahakortti-loppu.png |

Kunnossa (ei eroa): kaupunkilehden aihesivu ja kansi muuten, maalehden kansi, nostokortti (kuva edellä).
