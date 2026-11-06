# Pelikoodari: luovutus 6.11.2026 klo 07.34: kamera väistää ovilehteä, pysähdys kunnossa, liike näkemättä

Täydentää -0716:ta; sen kohta 2 on tässä korvattu, muut pätevät. Proto-worktree `/Users/Shared/Claude/wt/proto-pelikoodari-tarkastelu`, haara `pelikoodari/tarkastelu-219`, kärki `38c75624c`. Ei junaan. **Taso 1 on yhä pääasia.**

Raamatusta ei luettu lukulistaa tässä sessiossa, vain luovutukset. Seuraaja: lue lukulista ensin.

## 1. Tehty
- **Syy:** `337fc3cdc` lisäsi lehdet `OviLehtiJanalla`-väistöön, joka siirtää vanhaa kameraa (`kPaikka`). Tason 1 kuvan määrää `JuoksuKulkuKamera` (`JuoksuV4Maailma.cs`, `vapaaKameraPaino` → 1), joka ei tiennyt lehdistä. Myös `paikka`-rivin "kamera" oli vanha kamera, joten -0716:n kamerakoordinaatit eivät ole kuvan kameran.
- **Peruutus:** `97c083bc5` poistaa `337fc3cdc`:n.
- **Korjaus `38c75624c`:** `JuoksuKulkuKartta.OviLehtiVaisto` siirtää kameran tavoitetta oven normaalin suuntaan. Vara 1,6 m oven tasosta (lehti ulottuu 0,4 m), täysi väistö 3,4 m oven keskeltä seinän suuntaan, pehmeä reuna 1,5 m. Kartan 245 ovea, siirrot lasketaan yhteen, kuljettavuus tarkistetaan (`LehdenEteen`). Loki: "kamera väistää ovilehteä"; `paikka`-riville "kuvan kamera pohja … lehtisiirto".
- **Testit:** 867/867 ennen lokimuutosta (neljä uutta väistötestiä, sivuliike testissä alle 6 m/s). Lokimuutoksen jälkeen `unity-tarkistus` 0 virhettä, testejä ei ajettu uudelleen.

## 2. Ajo `lokit/esikatselu-20261106-072617` (416 s, 2 kuvaa, L2, lukko vapautettu JU:lle)
404: 5 tiedostoa, samat kuin -0716:ssa.
- Väistö osui: lokissa 0,6 m kohdassa (-186,5; 422,8), s 120,6. `t1`: kuvan kamera (-188,1; 422,0), y 2,4, lehtisiirto 1,5. `t3`: (-188,0; 421,9), lehtisiirto 1,0.
- `t1`: keisari näkyy heti kokonaan. Lähin lehti vie oikeasta reunasta noin 13–24 % leveydestä (arvio kuvasta). Ennen: `t1` peitti keisarin kokonaan, `t3` noin 30 %. `t1` ja `t3` lähes samat, eli kamera ei enää liu'u pysähdyksen jälkeen.
- **Katsottu 2000 px:n kuvina; täysikoossa vain ikkunan rajaus.** Ikkunan raidat 2000 px:n kuvassa olivat näytön pienennöksen tuotetta, täysikoossa puhdas. Lehden musta merkki noin (1640; 1150, 2000 px) ja läikät -0716:n kohdasta 1 tarkistamatta täysikoossa.

## 3. Auki
1. **Liike ei nähty.** Ajo näyttää vain pysähdyksen. Väistö voi näyttää nykäykseltä, kun keisari juoksee seinän vierestä oven ohi. Katso seuraavassa ajossa, jossa juostaan oven ohi lähellä seinää; ei omaa ajoa vain tätä varten, ellei PT pyydä.
2. **Vara 1,6 m on laskettu kuvakentästä,** yksi ovi katsottu. Ahtaalla kujalla väistö rajautuu kuljettavaan.
3. `ovi-v1` puuttuu yhä mediasta; ilman `ovikoe juuri` -komentoa näkyy laatikkolehti (-0716 kohta 3).
4. `sk-t.txt`:n otsikko päivitetty tähän kysymykseen.

## 4. LAV:lle vastattu 6.11. (aukkolista, kartta v19)
Kartta tuntee osasarjan koodin mukaan. Neljässä kohdassa pelaajan puoli on sama kuin täytteen `no`: (-251,8; -126,9) +z, (-157,1; 456,3) −z, (54,8; 451,2) −x, (154,7; 419,8) +x. Kahta ensimmäistä ei voi kartan perusteella sanoa turhiksi: niiden ja muurin väliin jää kuljettava kaista noin 1 m ja 0,8 m. Ei tarkistettu pelikuvista. Tiedot: `JuoksuKulku.bytes`, `koejuuri-aukot5-taytteet.json`. Odottaa LAV:n jatkoa.

## OPIT
- Ennen kuin korjaat kameraa, katso, mikä koodi kirjoittaa lopullisen asennon: vanha kamera ajaa yhä taustalla, ja sen väistöt ja lokirivit näyttävät toimivilta.
- Pienennetyn kuvan raidat voivat olla näytön tuotetta: rajaa täysikoossa ennen kuin kirjaat vian.
