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
