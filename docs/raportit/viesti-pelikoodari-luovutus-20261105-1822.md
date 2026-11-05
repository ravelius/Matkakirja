# Pelikoodari: luovutus 5.11.2026 klo 18.22 (konteksti yli 30 %): boordien väreily poistui, sininen laikku boordi-3:ssa auki

Korvaa -1752:n kohdat 0–3 ja täydentää -1744:ää, jonka muut kohdat pätevät edelleen (kohdan 3 järjestys: 2–5 yhä tekemättä). Proto-worktree `/Users/Shared/Claude/wt/proto-pelikoodari-tarkastelu`, haara `pelikoodari/tarkastelu-219`, kärki `f25ccb55a`, pushattu natiivi-backupiin. Ei junaan. Ei ajoa käynnissä, L2 ilmoitettu JU:lle vapaaksi 18.21.

## 0. Sääntö uutena: omistajan päätös 17.58 (Raamattu 10.5)
Jokainen Mac-ajo ratkaisee yhden kysymyksen. Pyynnössä JU:lle on rivi "mitä tämä ratkaisee" ja enintään noin 5 kuvaa; enempi perustellaan. Ei verrokkia, jos vanha kuva kelpaa. Korjaukset samaan ajoon. Ei ajoa, jos testi tai loki riittää. JU palautti 80 kuvan pyynnön, joten lista on nyt 20 kuvaa, yksi pisteeltä.

## 1. Tila
- **Lista:** `tyokalut/koekuvat-tarkastelu-20.txt`, 20 kuvaa; uusinta `tyokalut/koekuvat-tarkastelu-boordi.txt`, 7 kuvaa. Ajo: `zsh tyokalut/tarkastelu_kuvat.sh <SHA> <lista>`; `TARKASTELU_VERTAA=<kansio>` lisää vertailun yhteenvetoon. Ajomalli: `PROTO_LINJA` JU:lta, skripti tiedostossa, Bash `run_in_background`.
- **Lähtötaso** `lokit/tarkastelukuvat-c6670f9df-180215` (20 kuvaa, 216 s), **uusinta** `lokit/tarkastelukuvat-f25ccb55a-181814` (7 kuvaa, 190 s; `arkki.jpg`, `rajaukset.jpg`).
- **Syy, mitattu kolmesta taustapalasta** (`kielletty-tausta-v115`, `V4_palatsi_friisi` vs `V4_red`): sama taso alle 2 mm 38 %, alle 2 cm edessä 23 %, vähintään 2 cm edessä 36 %, seinän sisällä 2,5 %.
- **Korjaus** `f25ccb55a`: `JuoksuMaailma.shader` `Offset [_SyvyysEtu], [_SyvyysEtu]` vain Forward-passissa; `JuoksuV4Maailma.cs` `boordit`-joukko (`V4_palatsi_friisi`, `V4_palkkivyo`, `V4_teal`) → `_SyvyysEtu` −1.
- **Tulos:** boordi-1 0,074 → 0,005, boordi-2 0,062 → 0,002, sahalaidat ja viirut poissa rajauksista. havainne-02 0,0083 ja havainne-04 0,0190 ennallaan. Vain Macilla.
- **Todistus 2:** `tarkastelu piilota p-kujaportti-3` (37 pintaa): takapinta 0,010 → 0,125, väärin kierretty 0 → 0,024, tyhjä 0. KK:lle viety.
- **Todistus 1** täyttyi lähtötasossa; pisteet valittiin väreilyluvuista, nauha näkyi vasta kuvista.

## 2. Seuraavaksi, järjestyksessä
1. **Sininen laikku:** `boordi-3` (`rajaukset.jpg`, oikea rajaus): sininen friisilaikku räystään ruskeassa alapinnassa. Vanhaa kuvaa samasta kulmasta ei ole, joten ei tiedetä, onko se `Offset`-säännön sivuvaikutus (kaltevuuskerroin kasvaa vinossa katseessa) vai vanha vika. Selvitä ensin geometriasta, onko friisi räystään takana lähellä. Jos on, kokeile `Offset 0, -1` tai pienempää kerrointa. Älä sano KK:lle korjausta valmiiksi ennen tätä.
2. **Marmorikaiteet (KK:n B):** vareily-4 0,033 ja laatta-m15 0,028; tumma viiva ja ohut raidoitus. Selvitä syy kuten boordeissa, uusinta vain muutamaan pisteeseen.
3. **muuri ja portti:** siirretty listalle (`muuri -340,1; 119,9`, `portti 13,19; -392`), ei vielä ajettu. Mukaan seuraavaan koko listan ajoon. Alkuperäinen `muuri` (-368,6; 120,1) on `JuoksuKierros.json`:ssa kuljettava, mutta kuvassa oli pelkkää takapintaa: kuuluu kartan tarkistukseen.
4. **Sali (KK):** `takapinta`-pisteen sali (-163,6; 320,5) on kartassa kuljettava, vaikka keisari pysähtyy kynnykselle (omistaja 4.11. 12.48). Korjaa kartta tason 1 työssä.
5. **Ilmakuva (KK:n C, myöhemmin):** vaaleanpunaiset liuskat Meridiaaniportin edessä ja vallihaudan reunalla, sileä kirkkaankeltainen katto Taihedianin länsipuolella. Syy ei tiedossa; rivi KK:lle, jos selviää. Ei ajoa tämän takia.
6. **Massassa:** `Massassa` lukee vain peittokarttaa, `SarjatPeittoon = false`, joten sarjamallit puuttuvat. `KameraMassassa` käyttää samaa. Tämä on poikkeuskartoituksen ehdotus 1; ei muutettu. Ei varmistettu, että juuri muuri on sarjamalli.

## 3. Katselu `fb9811afd` (`lokit/esikatselu-20261105-174557`, arkeista; ei täysikokoisina paitsi e23, e26, e27, e28)
- **Kiinniotto laukeaa** (repliikki, kehote, rimpuilu), mutta k02:ssa eunukin selkä peittää keisarin kokonaan.
- **Rikkoutumista ei nähty:** `tormaa` koskee vain väistöesteitä, tilarivillä `esteet 0/0`. Tarvitsee toisen tavan laukaista.
- **Jahtikorjaus todentamatta:** 0 `eunukki jahtiin` -riviä, vaikka eunukkeja näkyy e23, e26, e28. `r.Kartta`:n määrittelyä ei löytynyt, joten auki, jäikö jahti tapahtumatta vai onko ehto aina epätosi. Selvitä lokilla ennen uutta ajoa (10.5).
- **Ovilehdet:** e27:ssä kuva kokonaan ovilehden ja ristikon peitossa, e23:ssa ja e32:ssa noin kolmannes. Enemmän kuin -1744:n "yksi jäänne".
- e39–e42: keisari paikallaan seinää vasten (s kasvaa, paikka ei); oletettavasti -1602:n seinäodotus, ei varmistettu.

## 4. Muuta
- `tarkista.sh` palauttaa 1 liikevahdin takia: `JuoksuKulkuKamera.cs` 1 > 0 ja `JuoksuV4Maailma.cs` 3 > 0. Käännöksessä 0 virhettä. En lisännyt liikettä, ja ensimmäistä tiedostoa en muuttanut, mutta vahtia ei ajettu ilman muutoksiani: käy läpi ennen junaa.
- `tarkista.sh` muuttaa `Tyylikirja.uss`:n, `Tyylikirja.cs`:n ja `tyylikirja/tyylikirja.json`:n: generoitu sivutuote, palautin `git restore`lla.
- 7.47: luvut 2, 4, 6 ja 12 lukematta tässä sessiossa. Lue seuraavalla aloituksella (2 on 162 kt: vain fokusmoodi ja linssit).
- Kierroksen vanha `Laatat`-tieto ja `Havainne`-paikat ovat `JuoksuTarkastelu.cs`:ssä; lista on kopio niistä.

## OPIT
- Geometria mitataan ennen kuvapyyntöä: GLB:t saa ämpäristä, ja friisin väli seinään selvisi ilman ajoa. Paketin palat `kielletty-tausta-v115/tausta.json`, kolmion etäisyys `V4_red`:iin säteellä pinnan normaalin suuntaan.
- Lukeman nimeä ei oteta kuvauksesta: `takapinta` 1,00 ei tarkoittanut reikää vaan kameraa seinän takana. Katso kuva ennen tulkintaa.
- 20 pistettä tarkoitti 20 kuvaa, ei 80: pienin tulkinta omistajan sanoista ensin.
