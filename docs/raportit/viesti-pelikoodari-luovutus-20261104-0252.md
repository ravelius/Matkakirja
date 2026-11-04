# Pelikoodari: luovutus 4.11.2026 klo 02.52 – palkisto ja taivas be5632bdb, Mac-todistus JU:lla

Edellinen: -20261104-0205 (c31d839c5), voimassa ellei alla toisin. Syy: pehmeä raja 25 % (7.37). Ei omia taustaketjuja. Kuvat PT:lle, PT vie KK:lle. Tulokset: proto-3d/lokit/pk-muistipiikki-219/TULOS.md (osio "Palkisto ja taivas be5632bdb").

## Muisti ja kamera (junaa estävä)
- **be5632bdb** (pelikoodari/muistipiikki-219, wt/proto-pelikoodari-muisti; 0d688683a:n päällä): palkistoraja (JuoksuSokkeloMaailma.PalkistonAla, käyttö JuoksuV4Maailma "SALIN KATTO RAJAA" -kohdassa) ja latauskuva Uudestaan-komennossa (JuoksupeliNakyma.PeitaUudelleenaloitus). Unity 0 virhettä, 794/794. EI AJETTU.
- **JU:n jonossa L1:llä Wumen i:n jälkeen:** `_tyo/pelikoodari/kamera-219-be56/aja.zsh 1`. 16 uudestaan-kohtaa, kuvat 1, 2 ja 4 s; loki kamera-*.txt (nyt myös "peitto päälle", "latauskuva pois", "salin katto").
- **Kun JU ilmoittaa, katso (PT 02.27 sitova, 8/8 ei vain 1 s:n kohdalta):**
  1. b1-4s ja b8-4s: palkisto ei täytä ruutua ja Puyi näkyy. Lokista kamera noin 3,46 m varastossa; jos 3,9, raja ei toteutunut (tarkista PalkistonAla ja palkistoRyhma). Kuvataso muualla: juhlasalin kuvat eivät saa huonontua (raja 3,85 m).
  2. Latauskuva ei saa peittää palkistovikaa: katso "latauskuva pois" -aika suhteessa 2,85–4,12 s:n kohtaan. Jos peitto on pois vasta sen jälkeen, juoksun aika on sama (askel odottaa), joten kuva on otettava myöhemmin kuin 4 s; lisää kuva ja aja uudelleen.
  3. Ensimmäinen kuva peiton jälkeen on oikea, a/b 1 s:n kuvissa ei pelkkää taivasta, esinekortti ei näy peiton päällä eikä palaa sen jälkeen (a7, a8).
  4. Seinän ylitys hallista ulos ennallaan (b-sarjan kuvat 4 s:n jälkeen eivät sitä kata: katso massassa-rivit ja tarvittaessa lisää kuva).
- **Sitten:** rivi PT:lle tuloksesta. Jos hyvä: rivi JU:lle ja lopullinen sha iPad-sarjaan `julkaisija-tyokalut/pk-0d68-laite.zsh` (S1=0d688683a, päivitä; prosessi ei käynnissä, käännös ei valmistunut tällä shalla), Pariisin (etusija) jälkeen; sali 1+2 kuvilla ja 40 x uudestaan. Tarkista muistihuippu (peitto, roskienkeruu kuvan alla) ja peiton kesto iPadilla. Jos korjaantuminen ei tule pienellä muutoksella: rivi PT:lle.
- Palkki on 3,96 m mallista avoimet-v53; pelin v52:ta ei ole levyllä, samuutta ei ole varmistettu. Pelin mallit ovat mediassa.

## TF 217
Rivi PT:llä (KK:n aamulista): koodin mukaan sama palkistovika, ei mitattu.

## Palvelijat v10
Katsottu, HUOMIOT.md ja kuvat PT:llä (02.52): `_tyo/pelikoodari/palvelijat-v10/`. Odottaa KK:n kantaa lätäkön väriin (179/206/239, tavoite 150/185/225). Kengän reuna listalla. Palvelijatar v2: edellisen luovutuksen mukaan JU:n kuvausjakso Pariisin jälkeen.

## Muut
Ennallaan -0205 ja -0142. Komento: Peli-testit/unity-tarkistus.sh (sh), Peli-testit/kaanna.sh (bash).

Tila: odottaa JU:n kamera-be56-ajoa ja KK:n kantaa v10:een.

## Lisäys 02.59: KK 02.55 palvelijat v11 (korvaa "Palvelijat v10" -osion)
- KK hyväksyi: sirpaleiden muoto ja erillisyys, ämpärin sisus. Ei vielä: lätäkkö ("liukas vesilätäkkö", väri 150/185/225, ei tarrareunaa, pilviheijastus hillitympi), sirpaleiden kuvio ehjän maljakon mukaan. Kengän rosoinen reuna saa jäädä listalle.
- **v11 52831ac12** (pelikoodari/arkihahmot-218), kuvarunko **b4a516989** (palvelijat-kuva-218). Vain varjostimia (Marka, Sirpale, Hahmo); ei ajettu eikä varjostinkääntöä ole todistettu. JU:n jonossa kamera-be56:n jälkeen: `_tyo/pelikoodari/palvelijat-v11/aja.zsh`, kuvat v11/vesi ja v11/malja.
- **Katso ja tuo KK:lle PT:n kautta sama juoksukuva ja lähikuva kuin v10:ssä** (vesi-090, vesi-160, malja2-090, rajaukset kuten palvelijat-v10/):
  1. Mittaa lätäkön sisus PNG:stä keskeltä (v10: 179/206/239; tavoite 150/185/225; _Sisus arvioitu laskemalla, voi vaatia säätöä). Ulkoreuna häipyy, ei rengasta, ei katkeamaa verkon reunaan (lyhin säde 0,92; märkä kivi rajattu 0,9:ään). Pilvi ei soikioina.
  2. Kengän viirut (vesi-160, oikea kenkä, täysikoossa): syy on PÄÄTELTY, ei todennettu (kenkä maan tasossa, lätäkkö piirtyi päälle; toinen mahdollisuus: reikä kengän verkossa, silloin _Cull 0 ArkiHahmot-materiaaleille). Jono: kivi 2000, Marka 2001, Hahmo 2002.
  3. **Hahmo-jono muuttui kaikille hahmoille (myös Puyi, vartijat):** tarkista, ettei mikään muutu: Puyi ja palvelijat kuvissa ehjät, lätäkkö näkyy kiven päällä kaikkialla (jos lattia piirtyy myöhemmin, lätäkkö katoaa).
  4. Sirpaleet: pieniä oksia valkoisella (malja2-090); juoksuetäisyydellä kuvio saa haaleta, ei saa välkkyä.
- **Palvelijatar v2:** kuvat edestä ja takaa KK:lle ennen kytkentää; JU:lle pyydetty Pariisin jälkeen (ALKAA-rivi; tarkistukset -0003 kohta 4). KK haluaa kuvat, kun Pariisi on päästänyt ajovuoron.

Tila: odottaa JU:n ajoja kamera-be56 ja palvelijat-v11, sen jälkeen palvelijatar v2.
