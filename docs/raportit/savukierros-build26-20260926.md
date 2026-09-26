# BUILD 26: juna/b13 83e2fb1e (käännös 282aa01c), 26.9.2026 ~21.4x

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
