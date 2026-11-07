# Valosepän luovutus 7.11.2026 klo 19.41. Itsenäinen: vanhoja ei tarvitse lukea

Syy: konteksti 25 % (pehmeä raja), luonteva tauko: odotus JU:lla. Tili vvi@vvi.fi. Natiivirepo `/Users/Shared/Claude/proto-3d/Matkakirja-proto`, etä `natiivi-backup`, worktree k31 = `/Users/Shared/Claude/wt/proto-linssiseppa2-k31`, nyt haarassa `linssiseppa2/taivas-hyppy-j220` (puhdas). Ainoa oma worktree: levy on siivottu, ei uusia. Kuvat vain JU:n vuorolla (`local_06f8c680-4618-42bd-a730-9b6a3e17e0b7`). Kansio `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/pallon-osat/`; kaikki mittaukset `film3-tulos.md`. Skriptit scratchpadissa katoavat. Jono `/Users/Shared/Claude/julkaisija-tyokalut/jono-20261103-ilta.txt`, LUO VAHTI: grep `VS .*vyo`.

## AUKI: VYÖ-iPAD, PT 18.5x (ainoa aktiivinen työ)
PT: taivaan hypyn korjaus rungon 901e4004b päälle omaan haaraan, ei junahaaraan. **Yksi iPad-ajo JU:n vuorolla: 14-30 km:n vyön ruutuaika ja muisti, verrokkina 901e4004b, koska vyössä on kaksi koko ruudun tasoa. Tulos PT:lle kahdella rivillä; junavuoro vain PT:n sanalla.**
- Korjaus **73c744f37** (`linssiseppa2/taivas-hyppy-j220`, pushattu). Sama kuin 19eec2df0 (`linssiseppa2/taivas-hyppy`, rungon f873c938f päällä).
- Skenaario `sk-vyo-ipad.txt`: 22 km keskustasta (osuus noin 0,5), vahti päällä, 3 kertaa `kierra 360 20`, 2 kuvaa vyo-1, vyo-2.
- **Verrokki 901e4004b VALMIS 19.29:** `lokit/linssiseppa2-vyo-verrokki-901e4004b`, 2/2, huippu 4048 Mt, vahti-VIKA 0. Lukematta tarkemmin, kuvat katsomatta.
- **Korjaus 73c744f37 EI OLE AJANUT:** kaksi jonoon kirjattua ajoa (19.30, 19.37-19.40), kummassakin 3 kertaa `failed to launch`, CoreDevice 10002, POSIX 22. JU:n skripti kirjaa silti VALMIS-KUVAVAJE ja "huippu 4048": se on VERROKIN JÄÄMÄ, ei tulos. Varmista aina: `merkit.txt` ei tyhjä, kehysajat yli 0 tavua, `muisti-tarkka.log` ajalta ajon sisällä. Kansio `lokit/linssiseppa2-vyo-73c744f37`.
- Viestitin JU:lle: jos sama virhe uudelleen, JU lopettaa ja kertoo PT:lle ja VS:lle syyn, ei iPadin uudelleenkäynnistystä. Rivi `ipad-skenaario-f1.zsh`:ssä: "konsolikäynnistys heti asennuksen jälkeen antaa error 22"; 5 min lepo ja 90 s yritysväli eivät auttaneet. Sama virhe tuli verrokille 19.13, ja se toimi 19.23. Syy auki. Odota JU:n viestiä, älä tilaa kolmatta sokeasti.
- Luku, kun korjaus on ajanut: `kehysajat.jsonl` (liike p50/p95, lepo, gpuMs, 5 s:n jaksot), väli `komento kierra` -merkkien perusteella; muisti `muisti-tarkka.log` N-rivit: `N <ms alusta> fp ... gfx ... huippu`, ms:t ALKU-rivin kellosta. Vertaa samoista vaiheista kummassakin. Tarkista kuvasta, että taivas näkyy kummassakin (vyö, 70°).

## TULOKSET, JOTKA ON JO RAPORTOITU
- **Film11 iPad-muisti:** PT ja KK saivat 18.3x. 02a6cc1dd vahti pois (lupa käytetty): filmi ja varjot +288 Mt levossa, huippu 4409 kytkettäessä, kierto 4223 -> 4338, ei kaatumista. Verrokki 84deb0978: raja 4080 ylittyy myös ilman haaraa. Koe, ei junaan. Omistajan 18.00: 70°:n kaukainen varjo "Kelpaa" (02a6cc1dd).
- **Taivaan hyppy:** runko 30,16 -> korjaus enintään 0,96 per kehys, Mac Ultra, PT katsoi arkit 18.5x: liukuu ilman hyppyä. Syy: osuuden noustessa nollasta koko taso siirtyi kaukotasoon syvyystestillä, liuku katosi usvaan hukkuvan maan taakse. PT: e3a272f76 EI tämän päälle; hyppy on junan vika, taivas-syvyys erillinen koe.
- **Levy:** k17, k32, orsay-rodin, kierrokset195 poistettu; `kivisivu` ja `pariisi-tyyli` T7:llä, linkit tilalla. Runner ei pääse T7:lle: niitä käyttävä ajo vaatii kopion takaisin. T7:n `pariisi-tyyli/porras` on vanha arkisto, ei lähteestä.

## TILA MUUTEN
Pallon osat (omistaja 16.43; koe, ei junaan; junaan vain kortilla): `linssiseppa2/kartta-filmi`, kärki 02a6cc1dd. iPhone-tason (Mobile) pehmeneminen film2:sta yhä todistamatta. Taivas: `linssiseppa2/taivas-syvyys`, kärki e3a272f76 (koe). Kovat varjot jäävät junaan; varjojen muistiosuus junan yhteisajosta. Sacré-Cœurin kaari auki listalla, ei uutta työtä ennen kuvaa. Sivulöydös: `filmGrainTex` oli Mac-ajossa tyhjä; kaupungin ja lennon rae tarkistamatta.

## TEKNIIKKA
Numpy, cv2 `/Users/Shared/Claude/proto-3d/_tyo/venv-rembg/bin/python -I`; PIL `/opt/homebrew/bin/python3 -I`. `sh`, ei zsh. Tarkistus `sh Linssit-testit/unity-tarkistus.sh` k31:ssä. iPad: `odota 3` komentojen väliin, kuvat `komento kuva X`. Kuvat 2752×2064: pienennä, rae ja saumat täysikoossa. Tapot vain omilla PID:illä. Seuraamattomat `.claude/settings.local.json.ennen-kevennysta` ja `waveletNoiseTile.bin`: ei koskettu. Kotihaara jäljessä, ei ylikirjoiteta: luovutus plumbingilla origin/main-pohjalta.

## LISÄYS 19.42 (TÄMÄ KUMOAA YLEMMÄN, JOS RISTIRIITA)
JU 19.41: korjaus 6/6 ja verrokki 1/2 kaatuu `--console`-käynnistykseen, ilman konsolia sovellus nousee; .app kunnossa, syy auki. **Sanoin JU:lle: molemmat uudelleen ilman konsolia**, ettei konsoli vääristä ruutuaikaa: korjaus `lokit/linssiseppa2-vyo-73c744f37-eikons`, verrokki `lokit/linssiseppa2-vyo-verrokki-901e4004b-eikons`. Vertaa VAIN näitä keskenään, ei 19.29:n konsoliajoa. Konsolilokia ei tule; `taivas`- ja vahtitieto `muistivahti.log`:sta. Tarkista lokien ajat. Sitten kaksi riviä PT:lle.
