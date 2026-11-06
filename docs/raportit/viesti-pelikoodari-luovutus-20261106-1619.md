# Pelikoodari: luovutus 6.11.2026 klo 16.19: renkaat luonnoksen mukaan nähty pelistä, kuvat KK:lla

Täydentää -1533:a; sen kohdat 2.3 ja 2.4 sekä OPIT pätevät, -1130:n kohdat 2.2 ja 2.4 samoin. Kohdat 2.1, 2.2 ja 2.5 on korvattu tässä. Proto-worktree `/Users/Shared/Claude/wt/proto-pelikoodari-tarkastelu`, haara `pelikoodari/tarkastelu-219`, kärki `8dfc13aaf`, b8, puhdas, ei pushattu. Ei junaan. **Taso 1 on yhä pääasia.** Ei ajoa käynnissä; L2 vapautettu JU:lle.

Lukulista: luku 2 kohdat 2.0, 2.1–2.27, 2.59–2.71 ja 2.177:n alku, luku 4 kohdat 4.1–4.7, luku 6 kohdat 6.1–6.14 ja vastuukartan rivi. Remote päällä.

## 0. Lisäys 16.21, korvaa kohdan 2.1 ja proton kärjen
**OMISTAJAN PÄÄTÖS 16.20 (KK): renkaat kelpaavat ja menevät avoimeen junaan, kun iPhonen kohta on korjattu.** KK 16.20: iPhone 10 pt turva-alueen sisään, iPad ennallaan; ei omaa Mac-ajoa, iPhone-rajaus seuraavasta PK:n ajosta KK:lle; sitten SHA PT:lle junaan.
- **Tehty `71bca39a7` (proton kärki):** `PeukaloKeskiX` pitää ulkorenkaan (säde 70 pt) turva-alueella, pyyhkäisyosoitin samaan kohtaan. Laskettu siirto iPhonella 9,6 pt, iPadilla 0. `unity-tarkistus` 0 virhettä. **Ei nähty pelistä.**
- **Seuraavaksi:** seuraavan juoksupelin ajon iPhone-koossa (`iphone-vaaka`) rajaus KK:lle: ulkoreunan pitää olla noin 62 pt reunasta; mittaus kuten kohdassa 1. Mukaan kohdan 2.3 tarkistukset. Jos muuta ajoa ei ole tulossa, kysy KK:lta: juna odottaa tätä, eikä omaa ajoa ole lupaa tehdä.
- **Junaan KK:n kuittauksen jälkeen:** vanha `76840f429` ei junaan sellaisenaan (KK), mutta `8dfc13aaf` ja `71bca39a7` rakentuvat sen päälle: poimi kaikki kolme yhdeksi commitiksi ja anna tämä SHA PT:lle. `292afcef2` (yleishuuto) ei junaan (PT). Pohjavahti ennen merge-pyyntöä (4.1); samalla kohta 2.4.
- **Poiminta tarkistamatta:** haara on 98 omaa committia rungon (`d092f48cc`) edellä, joten koko haaraa ei yhdistetä. Edeltävä `81d3e839c` ei ole rungossa, joten kolmen commitin poiminta voi vaatia lisää; kokeile erillisessä worktreessa, aja `unity-tarkistus` ja kerro PT:lle, mitä tuli mukaan. PT: `292afcef2` ei mene junaan, koska sitä ei ole nähty pelistä.

## 0b. Lisäys 16.3x, korvaa proton kärjen ja poiminnan listan
**Omistaja 16.24 (KK): "vähennä vähän noiden ohjausrenkaiden opacityä, ovat liian hallitsevat".** Korvaa 16.20:n "kelpaavat näin" vain läpinäkyvyyden osalta; koko, paikka, nuolet ja piste pysyvät.
- **Tehty `225e80473` (proton kärki):** `.mk-peukalokohta--normaali .mk-peukalokohta__ohjain` peitto 0,76, eli viivat ja nuolet noin 70 %, varjo noin 19 %. `uss-tarkistus` ei antanut virheitä, `unity-tarkistusta` ei ajettu. **Ei nähty pelistä.**
- **Seuraavaksi:** JU:n jonossa (L2:lla KS:n ajo), ei aloitusta ennen "ESIKATSELU NYT". Sitten `/Users/Shared/Claude/proto-3d/_tyo/pelikoodari/vapaa-1/aja-w-molemmat.zsh` (sha päivitetty). Katso renkaat täysikoossa punaisella, harmaalla ja vaalealla pinnalla; mittaa iPhonen ulkoreuna, tavoite noin 62 pt. Kynnys `min(rgb) > 225` ei enää löydä viivaa 70 %:lla: laske se noin 190:een ja tarkista otos. Kuvat KK:lle ennen omistajaa, SHA PT:lle vasta KK:n sanan jälkeen.
- **Poiminta kokeiltu ilman worktreetä (`git merge-tree`):** pohjalla `julkaisija/runko-219-muisti` (`d092f48cc`) `76840f429` menee ristiriitaan tiedostossa `JuoksupeliNakyma.cs`. Viisi committia `81d3e839c`, `76840f429`, `8dfc13aaf`, `71bca39a7`, `225e80473` menevät tekstinä läpi, ja muutos koskee neljää tiedostoa. **Kääntymistä ei ole tarkistettu.** `81d3e839c`:n viestissä lukee "ei junaan" (3 riviä, `Uudestaan`): kerro PT:lle, että se tulee mukaan, ja aja `unity-tarkistus` poiminnasta.

## 1. Tehty
- **OMISTAJAN PÄÄTÖS 16.05 (KK), `8dfc13aaf`:** ulkorengas (leveys 140 pt, viiva 7, keskilinja 133), varjo 11 pt, sisällä nykyinen 64 pt:n rengas. Vasemmalla piste 14 pt (varjo 18), oikealla neljä kulmanuolta luonnoksen mitoin (`Peukalokohta.Merkki`, `Nuolet`). Kaikki ryhmässä `mk-peukalokohta__ohjain`, joka näkyy vain normaalitilassa. Rimpuilu ennallaan. `unity-tarkistus` 0 virhettä, pohjavahti ok. `Peli-testit` ajettu `292afcef2`:ssa 867/867; renkaan jälkeen ei uudelleen, muutos on vain UI:ssa, jota testit eivät käännä.
- **KK 16.09:** vasen pysyy pisteenä, ei nuolia (spurtti toimii vain viitan kanssa). Omistajalle kerrotaan, etteivät renkaat näytä kaikkea ohjausta.
- **Ajot sk-w (L2, b8, Mac):** iPad `lokit/esikatselu-20261106-160909` (324 s), iPhone vaaka `lokit/esikatselu-20261106-161433` (259 s), `lokit` = `/Users/Shared/Claude/proto-3d/lokit`. Kuvat `w1-renkaat-alussa.png`, `w2-kaannoksen-jalkeen.png` katsottu; rajaukset täysikoossa `-161433/rajaus-renkaat-taysikoko-ipad-iphone.png`. Ajon poikkeus on Unityn QuickSearch (LAV:n havainto, pino tarkistettu), ei peli.
- **Mitattu iPhonesta:** 52 pt ruudun reunasta, turva-alue 62 pt, eli 10 pt sen ulkopuolella; noin 35 % ruudun korkeudesta. Viety KK:lle suosituksella pitää paikka. Kameran saareke arvioitu, ei kuvassa.
- **Rikkominen (PT:n sana), `292afcef2`:** luettelon ulkopuolinen esine (`kukkaruukku`, `kala-allas`) saa yleishuudon, ei kuplaa eikä loppukortin riviä (PT kuittasi). Syy tyhjään `huuto yleinen ""`:hen oli `JuoksuV4.cs:2221`. Testi laajennettu.
- **Runko yhdistetty:** `julkaisija/runko-219-muisti` (`6da8919c4`).
- **Ohjaus vahvistettu PT:lle koodista** (`JuoksupeliNakyma.cs:1455–1471`), PT korjaa 2.177:n. Oikea: sivulle käännös, ylös hyppy, alas liuku, napautus kaista. Vasen: napautus heitto eteen, ylös spurtti, alas heitto taakse.

## 2. Auki
1. **KK:n vastaus kuviin:** KK vie omistajalle. Jos renkaat siirretään turva-alueelle, muuta `PeukaloX` vain KK:n sanalla: sama arvo ohjaa myös pyyhkäisyosoitinta.
2. **Näkemättä:** häivytys liikkeessä, oikea laite, ensikertalaisen opetus (`opetus 0` ajoissa; opetuksessa ohjeen kohta on rimpuilun punainen syke ilman rengasta).
3. **Seuraavan juoksupelin ajon mukana, ei omaa ajoa:** kukkaruukun yleishuuto, ei kuplaa, ei loppukortin riviä (`sk-m.txt`:n `esinekoe tielle` osuu). Liike oven ohi (-1130 kohta 2.2).
4. **Junaan menossa:** webin OHJAINOPETUS-pohjan rivit (-1533 kohta 2.3) kuvaavat yhä hehkupistettä; lisää ulkorengas, piste ja nuolet samalla. Proton `tyylikirja.json` on generoitu kopio.
5. **Kartta:** odottaa LAV:n sanaa (-1533 kohta 2.4). LAV:n viimeisin luovutus 13.43, ei vientiä.
6. **Muut avoimet ennallaan:** 19 vinoreunaista katon alaa (-0004 kohta 4), lattian valkoiset katkoviivat, kaiteen raidoitus, omena (`omena-mata-v3` ei junaan ilman PT:n lupaa).

## 3. Työkalut
`/Users/Shared/Claude/proto-3d/_tyo/pelikoodari/vapaa-1/`: `sk-w.txt`, `aja-w.zsh <linja> <sha> [ipad|iphone-vaaka]`, `aja-w-molemmat.zsh` (sha ja linja kiinni). `esikatselu.sh`:n kolmas argumentti antaa ruudun.

## OPIT
- Lue ohjaus koodista ennen kuin selität ohjainkuvan: luonnos näytti vasemmalle vain napautuksen, koodissa vasen myös pyyhkäisee.
- Vanha `mk-peukalokohta__rengas`-läpinäkyvyys siirtyi ryhmälle: uudet osat eivät tarvitse omaa `normaali`-sääntöä.
- Mitatessa kynnys `min(rgb) > 225` löytää valkoisen viivan iPadin ja iPhonen kuvista; kerro kynnys luvun mukana.
