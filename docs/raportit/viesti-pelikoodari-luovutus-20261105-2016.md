# Pelikoodari: luovutus 5.11.2026 klo 20.16 (konteksti noin 32 %): ympärikäännös korjattu testeillä, leijuvien koristeiden syy löytyi, ruskea omena nähty, rikkoutuminen yhä näkemättä

Täydentää -1950:tä, -1925:tä, -1858:aa, -1822:ta ja -1744:ää; niiden avoimet kohdat pätevät, ellei tässä muuta sanota. Proto-worktree `/Users/Shared/Claude/wt/proto-pelikoodari-tarkastelu`, haara `pelikoodari/tarkastelu-219`, kärki `cc5e1e9bc`, pushattu natiivi-backupiin. Ei ajoa käynnissä, L1 ilmoitettu JU:lle vapaaksi (360 s, 5 kuvaa). Ei junaan. **Taso 1 on yhä pääasia.** Kotikansio päivitetty mainiin (`01619a266`).

7.47: tässä sessiossa luettu periaatteet, 7.4, 7.23–7.25, 9.1–9.3, 9.5, 10.5 ja 12.9–12.10. Luvut 2, 4 ja 6 vain otteina (2.9, 2.177 alku, 2.201, 2.209; 4.1; luvun 6 kohtien alut): lue seuraavalla aloituksella tarpeen mukaan.

## 0. PT:n varmistus 20.1x
1. **`93cc59596` junaan 219:** vain se yksi rivi, `7de953bc9` (`pelikoodari/eunukki-peili-219`), on JU:lla. Luovutus -1950 kertoo JU:n kirjanneen sen; junahaarasta en nähnyt sitä refeistäni. **Sanoin PT:lle, että JU varmistaa ennen nollausta. Pyyntöä ei lähetetty JU:lle: tarkista.**
2. **`omena-mata-v3` ei junaan ilman PT:n lupaa;** lupa vasta KK:n hyväksymästä lähikuvasta. Älä vie `73f708b88`:aa tai `1bf2fa8d6`:ta tason 1 mukana ennen sitä.

## 1. Ympärikäännös, `37a9a4f71` (testit, ei nähty pelissä kierron aikana)
- **Vika toistui testissä:** väli keisariin 0,10 m, korkeus 1,2 m. Syy kuten -1706: jälki katkeaa, ja kamera lentää keisarin läpi.
- **Korjaus `JuoksuKulkuKamera.cs`:** kun kamera on alle 60° kulkusuunnasta (`KiertoAlku`), se kiertää keisarin sivun kautta noin 0,7 s:ssa (laskettu, ei mitattu), ja normaali sääntö jatkaa 120°:sta. Säde `max(2 m, 0,6 × etäisyys)`, ahtaassa pienenee 0,9 m:iin. Sivu sinne, missä on enemmän tilaa. Katse pysyy keisarissa kierron aikana.
- **Testit:** `YmparikaannosEiKayKeisarinLapiAukiolla` ja `...Kujalla`, Juoksu 199/199 tällä korjauksella. Unity-tarkistus 0 virhettä. Testi vaatii aukiolla ≥ 1,5 m ja kujalla ≥ 0,8 m, y ≥ 1,9 m.
- **Pelistä ei todistettu:** `y1-kierto` ja `y2-kierto` (ajo 200909) otettiin vasta noin 1,5 s käännöksen jälkeen (aika 52,5 → 54,0), koska kuvan otto vie peliaikaa. Keisari on kuvassa ja ehjä, mutta kuva ei kerro itse kierrosta. Kahden `kaanna 1`:n tulos ei myöskään ollut puhdas ympärikäännös: `paikka`-rivin suunta (1, 0), kun ennen oli (0, -1). **Pelkkä kuva ei tätä näytä; katso tason näyttöajossa, älä tee omaa ajoa (10.5).** Jos KK haluaa todistuksen, tiheä lokirivi on halvempi kuin kuvat.
- **Liikevahti ok** (`-1822` kohta 4 pois): perustellut `// liikepoikkeus:`-merkinnät neljälle riville. `tarkista.sh`:ta ei ajettu kokonaan, vain `liikevahti.py`.
- **Havainto y1:stä, ei selvitetty:** takaa-ajaja on noin 2 m keisarista, vaikka `paikka` sanoo 18 m takana (sama silmukkailmiö kuin -1925 kohta 2). y2:ssa vasemmalla iso ruskea pilari kameran vieressä.

## 2. Leijuvat koristeet: syy on datassa, LAV:lla
- **Mitattu kolmioista (`koriste3.py`):** `kielletty-lahipuut-v15/koristeet.json` on `h-zhongyoumenin` kohdalla vanhan korkean mallin mitoissa: chiwen y 20,9 ja 15,9, dougong-rivi 13,46. Nykymallin (v194) huippu on 15,7 ja katon pinta 11,5. Kuvan koristeet ovat 1,9–2,8 m lähimmästä pinnasta.
- **Miksi suodatin päästää:** `KoristeKatolla` hyväksyy, jos peittokartan huippu on enintään 2,5 m koristeen alla. Dougong: 11,48 ≥ 10,96 mitattu. Sea-horse: mitattu huippu pisteessä 11,5 ei riitä, joten **selitys on päättely:** viereisen 1 m:n ruudun oma chiwen 15,7 ≥ 15,6. Ei luettu pelistä.
- **Sama vika `h-zhongzuomenissa` (peilipari):** 32/237 koristetta huipun yläpuolella, ei mitattu kolmioista. Muita rakennuksia ei tarkistettu: `koriste4.py` keskipisteen etäisyydellä oli liian kohiseva.
- **LAV:lle viety 20.0x,** viesti jonossa, ei kuittausta. Pyydetty uudet koristeet näille kahdelle ja tarkistus kaikille (~0,6 m pinnasta).
- **Näkyykö pelaajalle (KK:n kysymys), laskettu, ei nähty:** kameran kuvan yläreuna on kujalla noin 14° horisontin yläpuolella, aukiolla noin 1°. Dougong 13,46 m vaatii 2,4 m:n kamerasta yli 44 m:n välin, ja koristeet näkyvät vain 40 m:n sisällä. **Tavallisessa juoksussa ne eivät siis juuri osu kuvaan.** Avauslentoa ja kapeampaa avauskenttää (38–40°) ei laskettu. **Tätä ei ole vielä kerrottu KK:lle eikä LAV:lle.** Peliin ei tehty muutosta.

## 3. Ruskea omena: nähty, PT:llä
`_tyo/pelikoodari/vapaa-1/k-tarkastelu/omena.png` (ajo cc5e1e9bc): ruskea, kaksi tummaa laikkua, vihreä varsi, ei kullanvärinen. Katsottu 1100 px:nä, ei täysikoossa. Tarkastelutilassa `mata 0.9`. Hehkua ei arvioitu erikseen. Viety PT:lle KK:ta varten. Muutos `1bf2fa8d6` tummentaa vain pelissä, GLB ennallaan. **Odottaa KK:n arviota; PT:n ohje: tekstuurin muutos vain uudella nimellä hyväksytystä lähikuvasta.**

## 4. Rikkoutuminen: ajo meni ohi omasta virheestäni, ei peliviasta
- **Uusi QA `esinekoe tielle <malli> <x> <z>`** (`cc5e1e9bc`): esine seuraavan juoksun reitille. Toimi: `esine tielle kukkaruukku`, `ulkoesineet peliin, 109 kpl`.
- **Miksi ei osunut:** poistin `sk-l`:stä odotukset `kaanna 1 seina`n ja `botti 1`:n välistä, joten botti pyysi samalla hetkellä vasenta ja kumosi käännöksen (`kaanto oikea pyydetty`, heti perään `vasen`). Keisari lähti toiseen suuntaan, ja `r1`/`r2` ovat hyödyttömiä (`PUUTE oleta rikkomisreaktio`).
- **Valmis uusinta:** `_tyo/pelikoodari/vapaa-1/sk-m.txt`, 2 kuvaa, botti 0,8 s käännöksen jälkeen. **Ei pyydetty JU:lta, koska JU nollautuu.** Ajo: `cc5e1e9bc`, "mitä tämä ratkaisee: rikkoutuuko esine näkyvästi", noin 6 min. Malli `scratchpad/ajo-skl.sh`. **Ei ajettu, joten osuminen ei ole varma:** esine (-138,3; 438) on päätelty ajon 193848 reitistä (käännös pohjassa (-138,3; 432,4) suuntaan +z, seuraava käännös noin z 442).
- Kuvan otto vie peliaikaa, joten r2 on enemmän kuin 0,6 s r1:n jälkeen.

## 5. Seuraavaksi
1. `sk-m` JU:n vuorolla (kohta 4). Sen jälkeen rikkoutuminen KK:lle osana tasoa.
2. Tarkista kohta 0.1 JU:lta. Tarkista LAV:n vastaus (kohta 2) ja kerro laskettu näkyvyys PT:n kautta KK:lle.
3. -1858 kohdat 2 (pisteet: `V4_marmori`n UV0 tarkistamatta, ei ajoa), 4.4, 4.5.
4. -1744 kohdat 3.3 (kynnysviesti: vaatii keisarin odottamaan seinällä oven kohdalla) ja 3.5 (rivi KK:lle). Sivulta tuleva ei ole vieläkään näkynyt pelistä (testit `SivultaTuleva…` vihreät).
5. -1822 kohta 2.4 (Massassa, sali) yhä auki.

## 6. Työkalut
Scratchpad `/private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-pelikoodari/a89f8f7d-055f-4865-a5cc-5981937c429d/scratchpad/`: `koriste3.py` (koristeen väli pintaan, peittokartan huippu; aja `python3` ilman `-I`, koska numpy on käyttäjän paketeissa), `koriste4.py` (kohiseva seula), `tee-skl.py`, `tee-skm.py`, `ajo-skl.sh`, `vv/`. Koristeiden z on sama merkki kuin pelin maailman z, ei peilattu.

## OPIT
- Älä karsi käsikirjoitusta sokkona: "turhat" odotukset voivat olla ajoitus. Vanha `sk-k` toimi juuri niiden takia.
- Kuvan otto vie peliaikaa: alle sekunnin ilmiötä ei kuvata peräkkäisillä `kuva`-komennoilla. Käytä lokia tai testiä.
- Ennen pyyntöä laske, voiko kohde olla kuvassa: leijuvien koristeiden pelikamerakuva olisi ollut turha, kun kuvan yläreuna on horisontin tuntumassa.
