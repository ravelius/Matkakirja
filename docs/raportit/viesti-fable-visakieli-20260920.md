# Viesti Fablelle: visakieli ja kuvaselitteiden siivous valmis

19.9.2026, Sonnet-sisältösessio "Matkakirja Sonnet nostot", haara `sonnet-visakieli`
(pohja origin/main 39f1a2ee, v1965). Versiota ei nostettu, PR:ää ei avattu, Raamattuun ei koskettu.

**Tulos: 199 visaa 20 maassa auditoitu, 123 visaa kirjoitettu uusiksi, 89 kuvatekstiä (selite/lyhyt) siivottu lähdeviittauksista. Muutokset koskevat VAIN `visa`-kenttiä sekä kuvien `lyhyt`- ja `selite`-merkkijonoja** (vertailu origin/mainiin pakettien tuonnilla: 0 muutosta muissa kentissä, kaikki paketit latautuvat).

## Säännöt ja koneellinen tarkistus

Uusi työkalu `tools/tarkista-visakieli.mjs [ISO ...]` (koko aineisto ilman argumentteja; poistumiskoodi 1, jos kovia virheitä):

| Kova sääntö (pitää olla 0) | Ennen | Jälkeen |
| --- | ---: | ---: |
| kysymys ≤ 95 merkkiä | 13 visaa | 0 |
| vaihtoehto ≤ 40 merkkiä | 71 visaa | 0 |
| ei "-malla/-mällä" vaihtoehdoissa | 2 | 0 |
| oikea ei selvästi pisin (pisin JA > 1,6 × lyhin) | 20 | 0 |
| 4 vaihtoehtoa, oikea 0–3 | – | 199/199 |

Kovia virheitä (visaa, jossa vähintään yksi kova sääntö rikkoutui) ennen: 90 visaa, jälkeen 0; yksittäisten sääntöjen luvut ovat ensimmäisen auditin karkeita lukuja. Pehmeitä varoituksia (> 5 sanaa, fakta useampi virke, vaihtoehto toistaa kysymyksen sanoja) 73 → 3; jäljelle jääneet kolme ovat vääriä hälytyksiä: skripti laskee päivämäärän ("26. elokuuta") virkkeen loppupisteeksi (IRL knock, HRV sinj, BGR kaliakra). Tekstin rikkova rakenne poistui: `fakta` on yksi virke, kysymys mahtuu kahdelle riville (~90 merkkiä), vaihtoehdot ovat lyhyitä nimikkeitä tai lausekkeita (1–5 sanaa), ei kysymyksen toistoa.

Kuvateksteissä ei ole enää lähdeviittauksia lukijalle ("Commonsin kuvauksen mukaan", "Kuvauksen mukaan", "Kuvan otsikko", "Tiedoston nimessä", "Kuvaajan/infotaulun mukaan", "Kuvan kuvaus:"): viittaus poistettu, fakta säilytetty. Selite-skripti (karkea, etsii sanoja kuten "mukaan") näyttää vielä 7 osumaa, jotka ovat faktan osia eivätkä lähdeviittauksia (esim. "piirustusten mukaan", "nimetty Kaarle X Kustaan mukaan", "1800-luvun kuvaus" kuvan iästä).

## Maittain

| Maa | visoja | korjattu | kuvatekstejä korjattu | huomio |
| --- | ---: | ---: | ---: | --- |
| FRA | 10 | 6 | 2 | |
| ESP | 10 | 5 | 7 | |
| ITA | 10 | 7 | 7 | Chianti, Val d'Orcia, Alba: pelkät viittauslauseet poistettu |
| DEU | 10 | 5 | 11 | |
| PRT | 10 | 9 | 17 | |
| GRC | 10 | 7 | 3 | Lavrion fakta vaihdettu tekstin mukaiseksi (vanha väite ei ollut tekstissä) |
| AUT | 10 | 8 | 6 | |
| NLD | 9 | 4 | 7 | |
| BEL | 9 | 6 | 3 | |
| POL | 10 | 5 | 5 | |
| CZE | 10 | 7 | 1 | |
| HUN | 10 | 9 | 3 | |
| DNK | 10 | 10 | 0 | selitteet siivottu jo v1965 |
| SWE | 10 | 9 | 0 | selitteet siivottu jo v1965 |
| FIN | 10 | 9 | 0 | selitteet siivottu jo v1965 |
| IRL | 10 | 5 | 2 | Powerscourtin selite: "Irlannin korkein" pois (teksti: toiseksi korkein); Valentian kysymys kirjoitettu uusiksi |
| HRV | 10 | 2 | 5 | |
| BGR | 10 | 1 | 10 | Stara Zagoran vaihtoehdot: turkkilaisen ajan nimiä (Islimye, Eski Zagra, Kazanlık, Yeni Zagra) |
| ROU | 10 | 8 | 0 | |
| SVK | 10 | 1 | 0 | visat kirjoitettu jo uuden säännön mukaan |
| **Yhteensä** | **199** | **123** | **89** | |

(LUX-haaran visat ja selitteet on kirjoitettu alusta asti uuden säännön mukaan; LUX ei ole vielä mainissa.)

## Poikkeamat ja huomiot

1. **Vaihtoehtojen sisältö**: väärät vaihtoehdot on kirjoitettu tyyliltään ja pituudeltaan oikean kaltaisiksi; oikea vastaus löytyy edelleen noston `teksti`-kentästä (agentit lukivat tekstin ennen muokkausta), ja `oikea`-indeksien jakauma on tasainen.
2. **Uudet faktat**: `fakta`-lauseet on lyhennetty yhteen virkkeeseen ja vanhoista faktoista; kaksi kirjoitettu hieman uusiksi, koska vanha toisti vastauksen (ROU slanic, horezu). HRV karlovacin fakta ("Kaupungin arkkitehti oli Matija Gambon.") on en-artikkelista, ei noston tekstistä; jätetty ennalleen.
3. **Rivitys**: uudelleenkirjoitetut merkkijonot ovat osin yhdellä pitkällä rivillä (`+`-jatkot poistuneet); toiminnallisesti ei vaikutusta, testeissä ei rivipituusrajaa.
4. **Kuvatekstit, joita ei muutettu**: kuvassa itsessään näkyvät tekstit (postikorttien ja kylttien sanat), kuvan rajaukseen liittyvä metatieto ("kuvasta on rajattu alareuna pois", "Korkearesoluutioinen") ja kuvan iän kuvaukset. Ne eivät ole lähdeviittauksia; poistan halutessasi.
5. **Testit**: `node --test tests/*.test.mjs` # tests 3707, # pass 3694, # fail 0, # skipped 13; `node tools/tarkista-kaksoisavaimet.mjs`: ei kaksoisavaimia.

## Mitä jäi tekemättä

- Peliä ei avattu selaimessa (visalaatikon ulkoasu on Opus 1:n osuus; tämä erä muutti vain tekstejä).
- Visojen sisältöä ei tarkistettu toisella lukijalla; pistokoe suositeltava (ehdotan otosta 10 visaa maittain).
- Työkalua ei ole kytketty testeihin (`tests/`), koska sääntöä ei ole vielä kirjattu testiksi; ehdotan lisättäväksi jos haluat sen vartioksi (esim. `tests/nostovisa-kieli.test.mjs` kutsuu tarkistinta).
