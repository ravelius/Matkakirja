# Valosepän luovutus 7.11.2026 klo 20.52. Itsenäinen: vanhoja ei tarvitse lukea

Syy: konteksti 30 % (pehmeä raja), luonteva tauko: odotus JU:n Mac-ajoa. Tili vvi@vvi.fi. Natiivirepo `/Users/Shared/Claude/proto-3d/Matkakirja-proto`, etä `natiivi-backup`, worktree k31 = `/Users/Shared/Claude/wt/proto-linssiseppa2-k31`, haarassa `linssiseppa2/taivas-hyppy-j220` (puhdas, kärki d9207ccc2, pushattu). Ainoa oma worktree. Kuvat vain JU:n vuorolla (`local_06f8c680-4618-42bd-a730-9b6a3e17e0b7`). Kansio `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/pallon-osat/`; kaikki mittaukset `film3-tulos.md`, loppuosa. Skriptit scratchpadissa katoavat. Jono `/Users/Shared/Claude/julkaisija-tyokalut/jono-20261103-ilta.txt`.

## AUKI: NAPPULA PIILOON USVAN TAAKSE (ainoa aktiivinen)
**OMISTAJAN PÄÄTÖS 20.49** (kortti "Saako pelinappula näkyä taivaalla, kun se on usvan takana?"): **"Ei, piiloon".** PT:n tavoite: nappula häipyy usvan taakse kuten rakennukset ja palaa, kun sen paikan maa tulee näkyviin; 22 km on usvan takana (16 km), ei horisonttiehtoa, sama usvan arvo kuin maalla nappulan paikassa, sulava vaihto, ei hyppyä; ZTest Always maastoa ja rakennuksia vasten ei muutu; lähellä nappula pysyy kirkkaana.
- **Juna:** 73c744f37 + 72e257a0b ehtivät junaan 20.51 (`julkaisija/juna-220` = 72e257a0b), PT:lle kerrottu. Siksi junassa nappula näkyy taivaalla, kunnes piilotus tulee ERILLISELLÄ vuorolla.
- **Piilotus d9207ccc2** (`linssiseppa2/taivas-hyppy-j220`, ei junassa, unity-tarkistus 0 virhettä, EI VIELÄ AJETTU): `Nappula.cs` UsvaPaivita: `_Nakyvyys` = 1 - `kierto.JalanUsva(Lat, Lon, jalkaM)`, kone 1; alle 0,5 ei väistöä (`RuutuVaisto.NappulaNakyy`). `Nappula.shader` kertoo alfan.
- **Seuraava:** JU ajaa Macilla `sk-nappula-piilo.txt` kahdesti (d9207ccc2, verrokki 72e257a0b), kansiot `lokit/linssiseppa2-nappula-piilo-<sha>`, jonorivi `VS nappula-piilo`. Katso: np-22km piilossa; np-18km, -16km, -14km, -11km, -7km ja np-lasku1, -lasku2 paluu sulavasti; np-kaupunki45, -kaupunki70, -keskusta, -maa, -maa60, -eurooppa: nappula ei katoa turhaan. Korjaa, jos JalanUsva häivyttää väärin.
- **Sitten:** sano JU:lle iPad-ajo: `vs-vyo-eikons` samalla sk-vyo-ipadilla, d9207ccc2 ja 72e257a0b (2+2 kuten aiemmin), hinta rivillä. Tulos PT:lle: pari samasta rajauksesta täysikoossa, kuva nappulan paluusta, kaupunki- ja maanäkymä, hinta; PT:n jälkeen KK:lle. Junaan vain PT:n sanalla.
- Pidä .appit 72e257a0b ja 73c744f37 ja lokit tallessa PT:n sanaan asti; 901e4004b:n poisto jätetty JU:lle.

Tausta, nappulan väri (junassa):
- PT sai 20.47: ZTest Always on perintö luonnista (d1faea1d2, 23.9., ei perustelua), sen varaan rakennettu: omistaja 26.10. 15.32 (maanpintakorkeus), PT 26.10. 17.5x ("aina näkyvissä ja päällimmäisenä"). Paikka oikea: jalka pelaajan maailmapisteessä; PT vahvisti usvan rajaksi 16 km.
- Korjaus 72e257a0b: `Nappula.shader` jono Transparent+20 -> +70 (3070). Taivas 3049/3050, piirros enintään 3057, mäet ja kirkot 3078-3080, aarre 3090. Nappulan maavarjo seuraa (-4), mutta ei piirry. Pohja 73c744f37 (taivaan hypyn korjaus), pohjana 901e4004b.
- Syy todistettu (Mac, `lokit/linssiseppa2-nappula-syy-<sha>`, skenaario `sk-nappula-syy.txt`): rungon väri, 901e | 73c | 72e: taivas pois 144,85,72 | sama | sama; vain liuku 171,161,164 | sama | 142,84,73; perus 144,85,72 | 159,132,130 | 143,84,72. Mac-kulmassa verrokin nappula on kovan reunan alla, iPadilla reuna leikkaa sen.
- Hinta iPad (`lokit/linssiseppa2-vyo-<sha>-eikons[-2|-3]`), 72e | 73c, 2+2 ajoa: gpu 13,34-13,46 | 13,34-13,44 ms; huippu 3917-4016 | 3984-4022 Mt; p95 ka 17,51-17,89 | 17,26-17,36 ms, 72e kummassakin korkeampi; jono ei lisää piirtoa, pidän vaihteluna, ei todistettu.
- Parit: `nappula-ipad-pari-rajaus-72e257a0b-yla-73c744f37-ala.png`, `nappula-ipad-pari-koko-72e257a0b-vas-73c744f37-oik.png`, `nappula-mac-pari-72e257a0b-yla-73c744f37-ala.png`.
- Sivuhavainnot: 30 km:ssä nappulaa ei näy yhdelläkään rungolla, syy ei taivaassa, ei selvitetty. Merkit Piste +1, Kohdemerkki +2, Rengas, Valopiste jäävät taivaan alle, mutta niitä ei näkynyt reitillä taivasta vasten.

## ILMAN KONSOLIA
iPad-ajon `failed to launch` (error 22) kiersi JU:n `vs-vyo-eikons.zsh`, ei konsolikäynnistystä; syy avoin. `VIKA lähetys komento.txt` tarkoittaa, että lähetys raportoi virheen, mutta kierrot näkyivät silti kehysajoissa kummassakin tapauksessa: tarkista kehysajoista.

## TILA MUUTEN
Taivaan hyppy, film11 ja vyö-iPad raportoitu; hyppyä ei junaan ilman PT:n sanaa (sama haara kuin nappula). Pallon osat: `linssiseppa2/kartta-filmi` 02a6cc1dd, koe, junaan vain kortilla; iPhone-tason pehmeneminen film2:sta todistamatta. Taivas `linssiseppa2/taivas-syvyys` e3a272f76, koe, ei hypyn päälle. Kovat varjot junassa. Sacré-Cœurin kaari listalla, ei uutta työtä ennen kuvaa. Sivulöydös: `filmGrainTex` oli Mac-ajossa tyhjä; kaupungin ja lennon rae tarkistamatta. `kivisivu` ja `pariisi-tyyli` T7:llä, linkit tilalla; runner ei pääse T7:lle.

## TEKNIIKKA
Numpy, cv2 `/Users/Shared/Claude/proto-3d/_tyo/venv-rembg/bin/python -I`; PIL `/opt/homebrew/bin/python3 -I`. `sh`, ei zsh (zsh: `======` kaatuu). Tarkistus `sh Linssit-testit/unity-tarkistus.sh` k31:ssä. iPad: `odota 3` komentojen väliin, kuvat `komento kuva X`. Kuvat 2732×2048 tai Mac 2752×2064: pienennä, rae ja saumat täysikoossa. Kehysajat `t` ja muistin ms ovat ALKU-rivin kellosta. Tapot vain omilla PID:illä. Seuraamattomat `.claude/settings.local.json.ennen-kevennysta` ja `waveletNoiseTile.bin`: ei koskettu. Kotihaara jäljessä, ei ylikirjoiteta: luovutus plumbingilla origin/main-pohjalta. Luo vahti vain, kun JU:lla on ajo: grep `VS .*(nappula|vyo)`.
