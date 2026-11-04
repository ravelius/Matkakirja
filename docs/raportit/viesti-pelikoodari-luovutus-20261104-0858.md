# Pelikoodari: luovutus 4.11.2026 klo 08.58 – iPad c4a ok, muistikoe ja viivat auki, ovikamera KK:lla

Korvaa -0825:n, paitsi sen taulukko ja "AVOIN" (syy miksi uv1). Syy: pehmeä raja 26 % (7.37). Ei omia taustaketjuja. Polut kansiossa /Users/Shared/Claude/proto-3d/. Tulokset: `lokit/pk-muistipiikki-219/TULOS.md`, lue 08.27 alkaen. **Merkitse jokaiseen tulokseen runko.** Ids: PT local_8d8ebf72, KK local_d5f31591, JU local_2a7d6c96, LAV local_f12c9179.

## Rungot (wt/proto-pelikoodari-juna-koe, nyt haaralla `-koe2-kanavat-gc`, puhdas)
- **c4a5bfafb** `-koe2-kanavat`: PT:n koerunko. **35b001311** `-kanavat-ovi`: + ovikamera (lähitaso).
- **1af126155** `-koe2-kanavat-gc`: c4a + GC ja UnloadUnusedAssets kerran ennen lämmitystä (`VapautaEnnenLammitysta`), 826/826, tarkista.sh läpi. PT: koe, ei runkoon ilman lukuja.

## Todettu
- **c4a iPad, lento + uudestaan** (`lokit/julkaisija-lento-c4a5bfafb`): musta 0,0 % 16/16, tumma vyö = varjo. Muisti 4068/4080: yksi näyte ensimmäisessä aloituksessa; uusinta n. 3740.
- **Mitätön, älä käytä:** `oleskelu-c4a5bfafb-1-mitaton-0838`, `juoksu-c4a5bfafb-1-mitaton-0839`, `julkaisija-lento-c4a5bfafb-vika-0837`, rivi "pk-koe-laite AJETTU 08.26".
- **Reitti 35b (Mac):** musta av 0,3 % (numeron 3 reunus ja hiukset), uu ja sa 0,0 %. Peitot samat kuin eec. Parit `_tyo/pelikoodari/peitto-reitti/pari-lento-loppu.jpg`, `pari-lahitaso-uu.jpg` (ylärivi eec, alarivi 35b; kuvan numero = 2 + 50 t eec, 33 + 50 t 35b).
- **Ovikameran vika:** 2,80 ja 2,84 s seinä katkeaa, ontto sisus ja irrallinen palanen; Puyi näkyy. Yksi kierros katsottu. KK:lle kerrottu, odottaa päätöstä; ei junaan ilman sitä.

## Odottaa
1. **KK:** ovikamera. PT:lle kerrottu.
2. **JU:** sali, xf ja 40 × c4a:lla; mittaa musta iPadin kuvista (`musta_png`-tapa: kaikki kanavat <= 4). Juoksu `musta-lento/juoksu-c4a5bfafb/`, Uudestaan-nappi ja katto c4a:lla, 7ddd iPad-kuva: tulokset PT:lle ja KK:lle kuten -0825.
3. **JU, sarjan jälkeen:** `lokit/julkaisija-lento-1af126155`, sama lento + uudestaan, muisti-tarkka.log haettava (pyydetty 08.5x). Vertaa c4a: huippu ja rakenne (be28 ja be56 vertailuna, ks. TULOS 08.50); hidastuminen lokista "vapautus ennen lämmitystä … ms", Unityn "Unloading … Total" ja lento-1:n aika. Tulos PT:lle.

## Viivat (PT: minulle, ilman omaa iPad-ajoa; rivi KK:lle ja PT:lle, kun syy selviää)
- Ei kanavista eikä täytteestä: tahti0b, c4a ja eec näyttävät, 7ddd ei.
- LAV kumosi v90 → v115:n. Atlaksen raidat z −399 eivät täsmää muodoltaan (`musta-lento/viivat-atlas.png`, `lattiakartta.py`, aja /opt/homebrew/bin/python3 ilman -I:tä). Puuttuva-haara ca610fd07 poissa.
- **Seuraavaksi:** `ui juoksupeli mika x y` viivan pikselillä JU:n Mac-vuorolla nimeää piirtäjän (lyhyt skripti, viivat näkyvät tahti0b:n av-kuvissa 460–500, sk `peitto-reitti/sk-reitti.txt` mallina). Ehdokas todistamatta: paketin kappale, koska viivat kulkevat ovilehtien ja kaiteen kanssa. KK:lle on sanottu vain, että viivat eivät johdu korjauksesta.

## Muistiinpanot
- `tarkista.sh` ajetaan zsh:lla ja päivittää tyylikirjan kopion: palauta `git restore` kolmelle tiedostolle.
- date ennen jokaista aikaleimaa; tällä vuorolla kirjoitin kahdesti väärän ja korjasin.
