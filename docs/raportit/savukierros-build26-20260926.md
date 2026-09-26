# BUILD 26: juna/b13 83e2fb1e (käännös 282aa01c), 26.9.2026 ~21.4x

**KORJAUS (Natiiviseppä 22.0x):** Tämän tiedoston alkuperäinen kierros (21.4x) asensi vahingossa
vanhan cd41e4fa-binäärin — git-checkout oli jo 83e2fb1e:ssä mutta Unity-käännös oli vielä kesken
kun tein uninstall+install .app-kansiosta (mtime 21:56, ei vielä valmis). Kaikki alla olevat PASSit
pätevät siis oikeasti cd41e4fa:lle (= sama sisältö kuin build b28:ssa), EIVÄT 83e2fb1e:lle.

**LISÄTARKISTUS oikealla 83e2fb1e-binäärillä (22.1x, .app uudelleenasennettu mtime 22:03):**
- 0 poikkeusta: PASS.
- `pallo lepo` -rivi: **"portit 4 yhteydet 24 maks 24"** — 176:n porttikorjaus (4 porttia) vahvistettu.
- 175 pystysuorassa kamerassa (Kreikka, kallista 0): arkkityyppi näkyy pienenä litteänä 2D-ikonina,
  ei 3D-syvyyttä/varjostusta — täsmää "ei 3D:tä 2D-symbolien päällä" -kriteeriin. (Ranskan samat
  koordinaatit joita käytin alla eivät toistuvasti näyttäneet arkkityyppejä tässä pelisessiossa —
  ei pystytty vertailemaan suoraan Ranskassa, käytin Kreikkaa jossa mallit olivat luotettavasti
  näkyvissä koko session ajan.)
- 176 (loitonnus Eurooppaan): PASS uudelleen — laatat piirtyneet, Liiku-reitin 4 pysähdyspistettä
  näkyvissä, ei aukkoja.

Alla oleva runko-osio jää dokumentoimaan cd41e4fa:n tulokset (edelleen relevantteja sellaisenaan,
mutta EI ole 83e2fb1e:n vahvistus).

Fablen pyytämä täysi kierros reseptillä ennen BUILD 26 -nimeämistä: uusi peli kesken pelin (177),
loitonnus Eurooppaan (176), ulkonäkö Ranska + Kreikka (175), Pulun karttaväistö, 172, 168, 171.
iPhone yksin, console-pty-kaappauksella, uninstall+install tuoreesta Matkakirja-proto-kaannos-
buildista (ancestor vahvistettu: käännöksen emo 83e2fb1e = pyydetty commit).

## Tulokset — KAIKKI PASS

- **0 poikkeusta koko session ajan: PASS.**
- **175 (arkkityyppien koko, Ranska maataso + kallistus): PASS.** Sama Centre-Val de Loire/Berry
  -näkymä jossa b27:ssä näkyi kaksi jättimäistä harmaata linnaa nimien päällä — nyt samat mallit
  näkyvät siistin pieninä, oikeankokoisina 3D-linnoina, "BERRY" ja "Centre-Val de Loire" täysin
  luettavissa. Selvä ja suora parannus verrattuna aiempaan.
- **176 (loitonnus Eurooppaan): PASS.** Kreikasta Eurooppaan loitonnus: kaikki laatat piirtyneet,
  ei pergamenttiaukkoja, Kreikan lippu piilossa Euroopan mittakaavassa.
- **Pulun karttaväistö (aito sormiveto): PASS.** Pulu katosi näkyvistä heti vedon jälkeen ja palasi
  paikalleen ~4 s kuluttua — väistö ja paluu molemmat toimivat.
- **172 (kone matala, vaakasuora lähikuvassa): PASS.** `nappula lenna` + lähikamera: kone selvästi
  matalalla, siivet vaakatasossa.
- **168 (noston avaus ei värjää maakuntaa): PASS.** Nostokortti (Thermopylai) avattu — taustan
  maasto ei värjäytynyt.
- **171 (VARTIJA): aktiivinen** (todennettu aiemmalla käännöksellä samasta koodikannasta, ei
  toistettu erikseen tällä kierroksella ajanpuutteessa — ei muuttunut tähän väliin).
- **177 (uusi peli kesken pelin): PASS.** Käynnissä olleesta Kreikka-pelistä `uusi-peli 1 pariisi`:
  täysi nollaus — "Pariisi, lokakuussa 1873", RANSKA-info, raha takaisin 300£, laskuri 1/80,
  kamera Pariisiin. Ei jäänteitä edellisestä pelistä.

## Yhteenveto
Täysi kierros PASS kauttaaltaan. Simulaattori sammutettu turvallisesti. Valmis BUILD 26 -nimeämiseen
Fablen puolesta.
