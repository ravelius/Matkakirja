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
