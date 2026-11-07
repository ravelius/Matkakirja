# Pelikoodari: luovutus 07.11.2026 klo 15.12

Korvaa kaikki aiemmat. Nollaus kontekstin pehmeästä rajasta. Vanhat työkalut: `git show 3852590e7:docs/raportit/viesti-pelikoodari-luovutus-20261107-1303.md` kohdat 1 ja 4.

## 1. Avoinna: Lontoo-nimi on junan 220 ehto (omistaja 12.50, PT 7.11.)
Kokemus (PT): nimi ei hyppää ruudun yli, vaan häipyy. Sama koskee kaikkia suurkaupunkeja, joten Pariisi on tarkistettava.

**Ajo i12 on JU:lla (pyydetty 15.1x), sha `08ca315a4`**, haara `pelikoodari/lontoo-pallo-tower`, työpuu `/Users/Shared/Claude/wt/proto-pelikoodari-kortti`. Skenaario `_tyo/pelikoodari/lontoo/sk-i12.txt`, lokit `lokit/pelikoodari-lontoo-i12-08ca315a4`, 11 kuvaa. EI sisällä nimen korjausta: tämä on mittaus ennen korjausta.
- `i12-ele-1…8`: 51.506, lon -0.11 → -0.10 → -0.09 → -0.085 → -0.08 → -0.0754 → -0.09 → -0.11. Joka pysähdyksessä `nimet etsi Lontoo,Wellington Arch,Mornington Crescent`: syyt lokista.
- `i12-hinta-1` ja `-2`: pallon luota korkeudella 0.02 ja 0.008. KK haluaa hintakyltin näkyviin kuvaan: tarkista, ettei se osu Imperial War Museumin nimeen. `KaupunkiPallot.cs` rivi noin 756: kyltti näkyy vain Portti-ehdolla, joten kuva ei välttämättä näytä sitä. Jos ei näy, sano se.

**Mitä tiedetään (i11, `lokit/pelikoodari-lontoo-i11-30c33d5b9/unity.log`, `nimet etsi`):**
kaukaa-45: paikka 15 ladottu, 0–14 hylätty "nähtävyys" tai "pelikaupunki", 16–17 "taso", 18 "ruudun reuna". kaukaa-tb: 15 "ruudun reuna", 16 ladottu. Paikat: `Merkittavat.Siirto`: 15 ja 16 ovat samalla x-akselilla, 8 riviä keskipisteen ala- ja yläpuolella, joten vaihto kulkee ruudun yli. Lähipaikat ovat kiinni nähtävyyksissä, joten vain kaukopaikat jäävät.
Omat väitteeni olivat väärin: `708e68f62` / `9bc1118a1` / `bda125e21` ei auta. KK:n todiste: i11-kaukaa-45 vs i11-kaukaa-tb. **Nämä eivät junaan** (PT perui sanansa), samoin haarat `pelikoodari/lontoo-juna` ja `lontoo-juna-2`.

**Korjausehdotus, ei tehty, ei kokeiltu** (`Nimikerros.cs` rivi noin 1590, järjestys ja `paras`-valinta sen jälkeen; ei ole vielä luettu kokonaan): kaupungilla muisti kaukopaikasta, jolla nimi näkyi. Kun se hylätään, muuta kaukopaikkaa ei valita, vaan nimi häipyy ja palaa samaan paikkaan. Lähipaikka saa aina voittaa (KK 5.11. 15.30). Muisti nollautuu tason vaihtuessa. Tarkista i12:n ele-kuvista, sopiiko tämä: kuvat 6 ja 8 ovat tärkeimmät, paluu saa tuoda nimen samaan paikkaan. Sama kamera antaa silloin eri tuloksen reitistä riippuen: kerro se KK:lle. Pariisin kuva samasta eleestä ennen junaa. Puhdas funktio testiin `Kartta-testit`, jos saa irti.

**Wellington ja Mornington (KK, PT: mitataan), syy auki:** kaukaa-45: Wellington näkyy i7–i9, puuttuu i10–i11; Mornington näkyy vain i7:ssä. kaukaa-45-2: Wellington puuttuu i7–i10 kaikissa; Mornington näkyy kaikissa. i9→i10: junan kärki vaihtui, pallo siirtyi, Towerin sivu, nelikulmio pois. Mittaus: i12 etsi-rivit. Älä väitä syytä ennen niitä.

## 2. Pallo ja Tower: odottaa KK:ta
Haara `pelikoodari/lontoo-pallo-tower` (`08ca315a4`; 3 committia kärjen `c6715510f` päällä, yhdistyy tuoreempaankin kärkeen). Sisältö on sama kuin ajossa i11 (`30c33d5b9`) miinus nimen 2 riviä. Kuvat i10 (Tower, palatsi) ja i11 (pallo) katsottu, pari KK:lla, KK näyttää omistajalle. **Ei junaan ennen KK:n vastausta parista ja Cenotaphista** (PT); pallon paikka tulee KK:lta PT:lle. Puute: i11-kaukaa-tb pallo osittain The Cenotaph -nimen päällä. Junavuoro PT:ltä, vie erikseen.

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
