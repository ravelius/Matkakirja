# Pelikoodari: luovutus 07.11.2026 klo 15.32

Korvaa kaikki aiemmat. Nollaus kontekstin rajasta. Vanhat työkalut: `git show 3852590e7:docs/raportit/viesti-pelikoodari-luovutus-20261107-1303.md` kohdat 1 ja 4.

## 1. Avoinna: Lontoo-nimi on junan 220 ehto (omistaja 12.50, PT 7.11.)
Kokemus (PT): nimi ei hyppää ruudun yli, vaan häipyy. Koskee kaikkia suurkaupunkeja: Pariisi tarkistettava ennen junaa. Ajo vain JU:n vuorolla, PT:n luvalla.

**Mitattu i12 `08ca315a4` (`lokit/pelikoodari-lontoo-i12-08ca315a4`, skenaario `_tyo/pelikoodari/lontoo/sk-i12.txt`, nimi-korjausta ei mukana), lat 51.506:** lon -0.11, -0.10, -0.09, -0.085: paikka 15. -0.08: paikka 12. -0.0754: paikka 16, kuva `i12-ele-6` Regent's Parkin puolella (KK:n oire). Paluu -0.09, -0.11: paikka 15 (`i12-ele-8`). Paluukuvissa lokissa kaksi "ladottu"-riviä 15 ja 16, kuvassa yksi. Hylkäyssyyt: paikat 0–14 "nähtävyys" tai "pelikaupunki", 15 "ruudun reuna" kun se ei mahdu. `Merkittavat.Siirto`: 15 ja 16 samalla x:llä, 8 riviä keskipisteen ala- ja yläpuolella. `708e68f62`, `9bc1118a1`, `bda125e21`, haarat `lontoo-juna` ja `lontoo-juna-2`: eivät auta, eivät junaan.

**Korjausehdotus, ei tehty eikä kokeiltu** (`Nimikerros.cs` rivi noin 1590 järjestys ja `paras`-valinta sen jälkeen, ei luettu kokonaan): kaupungilla muisti kaukopaikasta (>= `Merkittavat.Paikkoja`), jolla nimi näkyi. Kun se hylätään, toista kaukopaikkaa ei valita: nimi häipyy ja palaa samaan paikkaan. Lähipaikka saa aina voittaa (KK 5.11. 15.30), joten paikka 12 kohdassa -0.08 on vielä mietittävä: sekin on hyppy, katso `i12-ele-5` (ei vielä katsottu). Muisti nollautuu tason vaihtuessa. Sama kamera voi antaa eri tuloksen reitin mukaan: kerro KK:lle. Testi `Kartta-testit`, jos logiikka saa irti. Sitten ajo `sk-i12` uudella tunnuksella, Pariisin sama ele.

**Wellington ja Mornington:** i12 etsi: Wellington "ladonta" tai "nähtävyys"; Mornington "ladonta", kohdissa -0.09 ja -0.085 ladottu. Vaihtelee kameran mukaan. Yhteyttä muutoksiini ei todistettu; PT:lle kerrottu. Vertaa uudessa ajossa.

## 2. Tehty, junassa tai JU:lla
Pallo ja Tower `1ac096b26`, `dc02fc5ad`, `30c33d5b9`: omistaja 15.15 hyväksyi pallon paikan, PT antoi JU:lle yksittäisinä; tarkista, että tulivat kärkeen. Hintakyltti `i12-hinta-1` näkyy, ei osu Imperial War Museumin nimeen. Puute: i11-kaukaa-tb ja i12-ele-6: pallo osin The Cenotaph -nimen päällä; KK:lle kerrottu.

## Kulkukartan seinäkorjaus: AUKI, ei junassa
PT:lle kerrottu. `JuoksuKulku.bytes` muuttui 6.11. illan jälkeen vain jaloissa `a45afc9af`. Lavastaja 03.54: päätöksen jälkeen antaa minulle juuren nimen; en ole saanut. Työlistan "tason 1 kulkualue" liittyy tähän. Jos juuri tulee: lisää kerros olemassa olevaan tiedostoon, älä vie uudelleen (49 ruutua eroaa, ks. 1303 kohta 4).

## 3. Junan juoksuajosta (PT:n käsky), raportti PT:lle
Ovien kynnykset, esineet (`esineet.json` yhä bittikorkeudella) ja ruudukon kuva: rivi, jos joku siirtyi. Kala-altaan ja kukkaruukun kuplat (`2ba7617a1` + `067210c0f` junassa poimintana). Katot uudesta ajosta. Omistajan ruudukko: `ui juoksuloppu pois` ennen `maali`; jos rikottiin eikä ruudukko aukea, rivi PT:lle. Huudot NUI:lla ja KK:lla.

## 4. Tehty tällä vuorolla
Jalat `a45afc9af` junassa, pari PT:n kuittaama. Kartta-testien käännösvirhe `8d427f3b0` junassa (oma vanha virhe `cbfb96542`), 702/702. PT:lle tilat: juoksupeli, vapaa maailma + katot (junassa).

## 5. Opit
- Ajon sisäinen "paikka 15 sama molemmissa" ei todista korjausta, jos sama oli jo ennen muutosta: vertaa aina edelliseen ajoon. KK:n silmä kuvasta voitti lokirivin.
- Tasainen mittari ei riitä: `kyltti este` -rivi ei tullut, kun syy vaihtui saman nimiseen peittäjästä jalanjälkeen.
- Vinon mallin ympäryksen korvaaminen nelikulmiolla nosti Abbeyn palatsin katolle: Lontoon malleilla ei ole kolmiotestiä (`PeittaaTarkasti` palauttaa false, `malli == null`), ympärys peitti tämän. Tieto, jos joku koskee Vapaaseen.
- zsh: `$H:Assets` tulkitaan muokkaimeksi, käytä `"${H}:polku"`. Etäpää työpuissa on `natiivi-backup`, tässä checkoutissa `origin`.
- Exception 11 lokissa: Cesium ion -yhteys ja `ESIKATSELU POIKKEUS` Unityn editorin haussa, sama i7:stä asti.
