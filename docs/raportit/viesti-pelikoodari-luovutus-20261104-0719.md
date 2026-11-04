# Pelikoodari: luovutus 4.11.2026 klo 07.19 – koerunko eec900eb3 JU:lla, vertailu ja kolme tarkistusta odottavat

Korvaa -0651:n. Muu -0626:sta voimassa (muuri LAV:n juurella, ohitusajon kohdat). Syy: pehmeä raja 25 % (7.37). Ei omia taustaketjuja. Polut kansiossa /Users/Shared/Claude/proto-3d/. Kaikki tulokset: `lokit/pk-muistipiikki-219/TULOS.md`, loppu. **Merkitse jokaiseen tulokseen runko** (PT). wt/proto-pelikoodari-juna-koe on haaralla juna-218-koe2-uudestaan. Haarat paikallisia.

## Rungot (Matkakirja-proto)
- **eec900eb3** `pelikoodari/juna-218-koe2`: PT kuittasi 07.07. = 7b7aa64da + 9d02ae999 + otsikko-219 + 6aed10e25 + liikevahti + lokit pois. 826/826, tarkista.sh ok.
- **08b6eee65** `-koe2-ovi` = eec + lähitaso, koe, ei runkoon ennen kuvaa (KK).
- **be28de835** `-koe2-uudestaan` = eec + Uudestaan-painike alkulennolla. Runkoon PT:n kuittauksella. Ei ajettu.
- Vanhentuneet, ei ajeta: b01464793, c3ba9742c, 7b7aa64da:n ajot, e89efadad.

## Kun JU ilmoittaa
1. **REITTI AJETTU eec900eb3 ja 08b6eee65:** `_tyo/pelikoodari/peitto-reitti/<runko>/`. KK:n mittari: Puyi näkyy koko ylityksen eikä leikkaudu lähitasoon; ei ruudun täyttävää pintaa; ontto sisus ratkaistaan ruuduista. Ovi-ylitysten (ys 2,9–3,3 s ja 4,6–4,8 s) ruudut vierekkäin PT:lle ja KK:lle. Leikkausreuna viaksi → KK:lle ennen TF:ää. Katso eec:stä myös uudelleenaloituksen taivas (349:llä 1,22 s) ja musta aukko alla.
2. **UUDESTAAN AJETTU be28de835:** `_tyo/pelikoodari/uudestaan-nappi/loki.txt`, LentoAlkaa 2. Tulos PT:lle ja KK:lle.
3. **Oleskelu ja juoksu eec900eb3 (iPad):** `lokit/pk-muistipiikki-219/oleskelu-eec900eb3-*`, `lokit/pk-lod-korjaus/juoksu-eec900eb3-*`. Raja 4080 Mt. Hyväksytään vain, jos s ei muutu ja kuvat ovat salissa (mittaa-oleskelu.zsh:n korjaus ei vielä testattu). Lennon muisti uusinnassa mittaamatta, tarvittaessa uusi ajo be28:lla.

## Avoinna
- **Musta aukko maassa** `peitto-reitti/musta-kiila-1383.jpg` (349e, alkulennon loppu, kuvat 1353–1623). PT:lle ja KK:lle kerrottu. Syy tutkimatta. Jos toistuu eec:ssä, kamera- ja koordinaattitiedot LAV:lle PT:n kautta.
- **LAV:n puusiirto** runkoon vasta koejuuren valmistuessa (PT 07.07). Junaan v15 + siirto; v16 (2ca2f17b7) myöhemmin uudella tarkistuksella.
- **KK:lle kerrottu:** alkulennon otsikko ei lopullinen.
- **LAV:n lattia:** vastattu. LAV: geometria sama v94:ssä ja v124:ssä, ulkonäköä ei verrattu; kuvapari vain PT:n pyynnöstä.

## Muistiinpanot
- `tarkista.sh` päivittää tyylikirjan kopion (3 tiedostoa): palauta `git restore`, ei committiin runkoon.
- PT:lle enintään 3 riviä, viestit send_messagella id:llä. Tilin KK-id osoitekirjasta (local_d5f31591).

## Lisäys 07.2x (PT 07.18)
- **Junan koerunko on be28de835** (PT kuittasi). **Lähitason koe on 32100a96f** (`-koe2-ovi` = be28 + lähitaso), 827/827, tarkista.sh läpi. Korvaa 08b6eee65:n: lue kohdan 1 vertailu `eec900eb3 | 32100a96f`. uudestaan-nappi be28:lla.
- **Musta aukko on uusi:** samasta kamerasta (125,62; 2,37; -811,40) 13 ajoa 3.11. 01.15–08.45 musta 0 % (viimeinen cf40ca767: tausta-v114, osasarja-v6), 349e8f8db 46,7 % (tausta-v115, osasarja-v8). 217:n tallenteessa 1.11. (esikatselu-20261101-232407, kuvat 200–300) ei aukkoa; itse TF:ää ei ajettu. Epäily v115 tai osasarja-v8, ei todistettu. Vertailu LAV:lla suoraan (PT 07.18). Eec:n ajosta rivi PT:lle.
- **Kun eec:n reitti valmistuu:** sama kamerakuva `peitto-reitti/eec900eb3/` tallenteesta `lokit/esikatselu-*/av/` (ks. kansio.txt), rivi PT:lle.

## Lisäys ennen nollausta: KK:n ja JU:n viestit (LUE, ei toisteta)
**KK:**
1. Musta aukko on junan este, jos se on rungossa. Tarkista sama paikka be28de835:ssä ja TF 217:ssä, sitten syy. Korjaa puuttuva maa, älä piilota aukkoa kameralla. Kuva samasta kohdasta ennen ja jälkeen KK:lle.
2. Uudestaan: suunta on 2.177:n mukainen. Aja tarkistusajo ja mittaa lennon muisti uusintajuoksussa iPadilla. Kosketuksen ohitus mukaan ajoon. 40 × Uudestaan ajetaan lentoineen rungon todistuksessa.
3. Sali: "Puyi näkyy" riittää. Katon poistohetki jää auki (2.177: samalla hetkellä, kun keisari menee sisään): todista ajosta, jossa katto on kuvassa ennen ovea, tai lokista.
4. Sukellus: ok.
KK odottaa lähitason kuvia, mutta nimesi rungon 08b6eee65: **kerro KK:lle, että vertailu on eec900eb3 | 32100a96f.**

**JU:**
- iPad-koerunko on PT:n käskyllä be28de835; tulokset sillä shalla.
- JU lisäsi muistiajon `pk-mittaa-uusinta-nappi.zsh` (mittaa-uudestaan-mallilla; avaus 1, `uudestaan nappi` 6 x 60 s, alku ja maali pois). **Tarkista reitti ennen yhd5:n loppua, korjaa jos väärä.** Ei sisällä kosketuksen ohitusta eikä KK:n 40 ×:ää: tilaa ne erikseen.
- Mac-ketju: eec900eb3 käynnissä, sitten 32100a96f, sitten uudestaan-nappi be28de835.
