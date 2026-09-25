# Pelikoodarin luovutus 25.9.2026 ilta

Jatkoa luovutukselle `viesti-pelikoodari-luovutus-20260925-b.md`. Merge-pyynnöt ja todennukset ovat tiedoston
`/Users/Shared/Claude/proto-3d/lokit/merge-pyynto-pelikoodari-maisemakompressori.md` lopussa.

## 1. Liikkumisen pariteettilista: ERI/PUUTTUU 0
- Lista: `docs/raportit/liikkuminen-pariteetti-20260925.md`, luku 0 (99be024ff).
- A13 on korjattu: `pelikoodari/merkit-haivytys` a1eed0a5 on junassa. Videolla häivytys on lineaarinen 250 ms.
- C11 on SAMA, koska `pollo.huudahdus` poistettiin datasta 9.9.
- Videolla todennettu:
  - A3, A9, A11, B22 ja B23 (`lokit/liikkuminen-pariteetti/yhdistetty-693f323d/`)
  - D6 (`c-sarja/d6-maailma.png`)
- **EI todennettu, vika:** C16 (Livian paljastus), C10 ja C12 (pulun kommentti ja PuluCam luennan jälkeen) eivät näy.
  - A-ajo junalla f637a181 (`c16-uusinta/`): luenta alkaa heti Kartta-tilassa ilman lykkäystä.
  - Syy koodissa: `AloituslentoLoppui` kutsuu `AloituslentoPaattyi` → `Saapui` ENNEN `Perilla` → `AsetaLykkays`.
  - Natiivi-UI:n korjaus on haarassa `natiivi-ui/paljastus-c16b` 30db4207, ja siitä ajetaan B-ajo (tulos luvussa 5).
  - Hyvän tuloksen jälkeen merge-pyyntö lähetetään Natiivisepälle Natiivi-UI:n puolesta.

## 2. Omistajan build 13 -löydökset (`docs/raportit/omistajan-loydokset-b13-20260925.md` haarassa claude/bold-ride-vow4ki)
Kaikki alla olevat haarat ovat junassa (juna/b13 9f78c612 →).

| # | Haara | Tila |
|---|---|---|
| 93 | nosto-nimio 5e21527b (natiivi-ui/nimiolukko-106:n mukana) | Näkyvä nostonimiö ottaa osuman. Todennus build 14:ssä. |
| 100 | kartun-radio c13af0b3 | Voimakkuus asetetaan Avaa-kutsun jälkeen (natiivi `avaa:` aloittaa mykkänä). Kuulotodennus Laitetestaajan b14-kierroksella. |
| 101 | lehti-piirto 6ba8ada0 | Lehti ei ole näkymäpeitto, joten `renderFrameInterval` 4 ei enää hidasta koko UI:ta. Laitteella A/B (`lokit/loydos101-laite/`): lehti piirtyi ennen 30 fps:llä, nyt 120 fps:llä (p99 8,66 ms). |
| 104 | nosto-esilataus c50c572b | `NostoSisalto.Esilataa`: saapumismaan kokoelmat ja moduulit esiladataan 2 s saapumisen jälkeen (lokissa "esiladattu GRC"). |
| 109 | reitit-alku e4c75de4 | `Kytke` → `AloitaMatkareitit`: aloituskartan napautuksen naapurireitit eivät jää kartalle. Todennus aloituskartan napautuksella Laitetestaajan b14-kierroksella (tarkistuslista PR #3153). |

Muut:
- **86:** tekstin lähde (fokusvirta `paikkarivi`) on annettu Natiivi-UI:lle, joka korjaa sen asetuksella `Tunnelma = false`.
- **111** (reittiviiva): mitattu (`lokit/loydos111-reittiviiva/MITAT.md`).
  - Ydinviiva on sama, noin 2,5 px.
  - Natiivista puuttuu näkyvä varjo (web 4 px), ja musteen alfa on noin puolet webin arvosta. Epäilty syy on lineaarinen väriavaruus.
  - Mitat on annettu Natiivisepälle, joka korjaa.
- **112** (aloitusnäytön pallo, kone ja viiva): mitattu (`lokit/loydos112-etusivupallo/MITAT.md`), mitat on annettu Natiivisepälle.
- **Aloituslennon repliikki:** yksi repliikki kaikille kaupungeille. Puhetta on 7,46 s ja tiedosto on 9,90 s, joten se mahtuu 10 s:n lentoon. Tästä on ilmoitettu Fablelle.

## 3. Web
- #3170 (pariteettiajo ja Linssisepän korjaukset kierrokselle 3) on mergetty.
- #3188 (pariteettikuvat: `liiku`- ja `noppa`-näkymät piirtävät reitit `ui.vaihdaLiuku()`-kutsulla, koska aiemmin reittejä ei piirtynyt yhteenkään kuvaan) on Julkaisijalla.
- Worktree `wt/pelikoodari-liiku-nakyma` poistetaan mergen jälkeen.

## 4. Avoimet ja muille
- **Natiivi-UI (luovutus o):** lennon alapalkki "Kone nousee…" jää ruutuun laskeutumisen jälkeen (erä 81/83, `c-sarja/c-9…c-22`).
- **Natiiviseppä:**
  - pallon lepopiirto p95 25 ms isolla iPadilla (`loydos101-laite/A`)
  - peitto kamerakohtaiseksi, jos pallo halutaan säästää lehden alla
- **Radio-desync:** korjattu testikomentojen osalta (`pelikoodari/radio-tila`, junassa). `linssi pois` ja × käyttäytyvät samoin kuin webissä, joten korjausta ei tarvita (`lokit/linssi-pois-kamera/TULOS.md`).
- **Äänilinja (coreaudiod):** selvitetty. Ei toteuteta nyt, ja suodattimien ohitus hiljaisuudessa on pariteetin jälkeinen idea.

## 5. C16 B-ajon tulos: EI RATKAISTU, TESTI OLI VIRHEELLINEN (seuraava sessio aloittaa tästä)
- A (juna f637a181, `lokit/liikkuminen-pariteetti/c16-uusinta/`) ja B (juna + natiivi-ui/paljastus-c16b 30db4207 = f16170a7,
  `c16-uusinta-B/`) käyttäytyivät samoin: luenta soi heti Kartta-tilassa (peli-tilat k4/k5), eikä paljastuskuplia tullut.
- SYY TESTISSÄ: nollaus tehtiin komennolla `ui paljastus nollaa`, joka ei tee mitään ("ok"). Oikea komento on
  **`ui livia paljastus nollaa`**, ja tilan saa komennolla **`ui livia paljastus`** ("nähty/näkemättä, kesken"; UiKomennot.cs:951).
  Simulaattorin PlayerPrefs-arvo `matkakirja-livia-paljastus` oli 1, joten `EnsisaapumisenLykkays` (= !annettu && !Nahty) palautti
  epätoden, eikä lykkäys voinut alkaa kummassakaan ajossa. Myös c-sarjan `defaults delete` jäi epävarmaksi (plist oli ajon jälkeen 1).
- TEE: aja B uudelleen (skripti `c16-uusinta.sh` on scratchpadissa, joka katoaa, joten kirjoita se uudelleen):
  1. käännä juna/b13 + natiivi-ui/paljastus-c16b
  2. `ui livia paljastus nollaa` ja tarkista `ui livia paljastus` → näkemättä
  3. `puhe paalle`, `uusi-matka ateena`, ja kirjaa 2 s välein `tila kN` sekä `ui livia paljastus` ja ota kuvat
  4. Odotus: kaksi Livian kuplaa ennen luentaa (luenta lykätty), sen jälkeen luenta, 900 ms myöhemmin pulun kommentti (C12)
     ja PuluCam-kuvat (C10).
  5. Hyvän tuloksen jälkeen merge-pyyntö Natiivisepälle Natiivi-UI:n puolesta (Natiivi-UI pyysi).
- Koodihavainto pysyy: `AloituslentoLoppui` (PeliOhjain.Aloitus.cs) kutsuu `AloituslentoPaattyi` ennen `Perilla` → `AsetaLykkays`.
  C16b siirtää `Saapui`-kutsun seuraavaan ruutuun.

## 6. Opit (muistissa `pelikoodari-tila-20260925-iltapaiva.md`)
- **Simulaattorin "Launchd job spawn failed":** rekisteri osoittaa käännöspalvelun asennuksen jälkeen vanhaan pakettiin. Ratkaisu: kopioi uusin `Bundle/Application/*/Matkakirja3D.app`, käynnistä simulaattori ja aja `simctl install` (skriptit tekevät tämän).
- **Chatin ääneen luku:** vaatii PlayerPrefs-arvon `matkakirja-pollo-aani` = 1.
- **Oikea iPad:** mittaus tehdään kehysmittarilla (`kehysajat.jsonl`, luokat peitto, liike ja lepo) ja komentotiedostoilla (`devicectl copy to Documents/ui-komento.txt`).
- **Simulaattorivuorot:** Julkaisija antaa vuorot. Päivällä enintään 2 simulaattoria. Ilmoita aloitus ja lopetus myös Linssisepälle, kun se odottaa.
