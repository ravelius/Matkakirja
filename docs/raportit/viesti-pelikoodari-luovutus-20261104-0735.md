# Pelikoodari: luovutus 4.11.2026 klo 07.35 – musta maa rajausajoilla, koerungon ajot JU:lla

Korvaa -0719:n, paitsi sen "Muistiinpanot". Syy: pehmeä raja 26 % (7.37). Ei omia taustaketjuja. Polut kansiossa /Users/Shared/Claude/proto-3d/. Tulokset: `lokit/pk-muistipiikki-219/TULOS.md`, loppu. **Merkitse jokaiseen tulokseen runko** (PT).

## Rungot (Matkakirja-proto, haarat paikallisia; wt/proto-pelikoodari-juna-koe)
- **be28de835** `pelikoodari/juna-218-koe2-uudestaan`: junan koerunko (PT kuittasi) = eec900eb3 + Uudestaan-painike.
- **32100a96f** `-koe2-ovi`: be28 + lähitaso, koe, ei runkoon ennen kuvaa (KK). Worktree on tällä haaralla.
- **eec900eb3**: vertailun toinen puoli.
- Vanhentuneet, ei ajeta: 08b6eee65, b01464793, c3ba9742c, e89efadad.

## Musta maa alkulennolla (junan este, jos on rungossa; KK)
- **Todettu:** eec900eb3:ssa ja 349e8f8db:ssä, musta enintään 45 % kuvasta, tasan 0,0,0 (`lokit/esikatselu-20261104-071522/av`, k-001383.jpg ja k-001100.jpg). `uu`- ja `sa`-tallenteissa 0 %, mutta niiden kamera ei katso samoille pihoille.
- **LAV:** lattiakolmiot samat, ei dataa korjattavaksi. Lavastajan vertailu on tässä vaiheessa valmis.
- **Aiempi väite "musta on uusi" oli vino:** 31 ehjää ajoa (34 tallennetta) 1.–3.11. ajettiin QA:lla `palatsi kopiot 1`, jota oikea peli ei käytä. Otos 900 ensimmäisestä ruudusta, `scratchpad/lennot.py`-mittaus on kirjattu TULOS.md:hen. Kaksi mustaa ajoa vapauttivat kopiot, ja niissä on myös osasarja-v8 ja tausta-v115: **kopioita ja paketteja ei ole erotettu.** TF 217 ei ole suljettu pois (kopiot vapautetaan oikeassa pelissä 21.10. alkaen, d5775d5ed, maan täyte mukana).
- **Epäily, ei todiste:** maan täyte (`JuoksuSokkeloMaailma.Palatsi.cs`, verkko ilman UV:ita, 1725 suorakulmiota) vapautetaan muiden mukana (`Keraa(maanTayte)`), ja puuttuvat kanavat voivat tulla mustina. Ei ajettu. Laitetta ei ole katsottu.
- **Ajot pyydetty JU:lta** `_tyo/pelikoodari/musta-lento/aja.zsh`, ehdotus eec900eb3:n jälkeen ennen 32100a96f:ää (JU ei ole vielä vahvistanut). Tulos `musta-lento/<nimi>/kansio.txt`, rivi "MUSTA AJETTU":
  - `be28de835 kopiot "palatsi kopiot 1"`: musta pois → kopiot syynä; musta jää → paketti tai koodi.
  - `be28de835 tayte "palatsi tayte 0"`: näyttää, onko musta täytteen pinta.
  - `7ddd353e8 tf217`: 217:n runko ilman kopioita; vastaa KK:n kysymykseen 217:stä Macilla, itse TF ei ajossa.
- **Seuraavaksi:** mittaa mustan osuus (k-*.jpg, pikselit ≤ 4). Jos täyte: korjaus pieni (täyte pois vapautuksesta tai kanavat verkkoon), koehaara be28:sta, ajo, kuva samasta kohdasta ennen ja jälkeen KK:lle ja PT:lle. Korjaa puuttuva maa, älä piilota aukkoa kameralla (KK). Laitteelta yksi kuva lennon aikana (noin 8 s lennon alusta), tilaa JU:lta rajauksen jälkeen.

## Kun JU ilmoittaa
1. **REITTI AJETTU eec900eb3 ja 32100a96f:** `_tyo/pelikoodari/peitto-reitti/<runko>/`. KK:n mittari: Puyi näkyy koko ylityksen eikä leikkaudu lähitasoon; ei ruudun täyttävää pintaa; ontto sisus ratkaistaan ruuduista. Ovi-ylitysten (ys 2,9–3,3 s ja 4,6–4,8 s) ruudut vierekkäin PT:lle ja KK:lle (KK:lle kerrottu, että vertailu on eec900eb3 | 32100a96f). Leikkausreuna viaksi → KK:lle ennen TF:ää. Katso eec:stä myös uudelleenaloituksen taivas (349:llä 1,22 s). Kierrosluvut `kesto-*.txt`.
2. **UUDESTAAN AJETTU be28de835:** `_tyo/pelikoodari/uudestaan-nappi/loki.txt`. Odotus LentoAlkaa 4, ohitettu 1 (kolmannessa), neljäs lento kokonainen. Sk päivitetty: Ohita-nappi `ui juoksuohita paina`; oikea kosketus jää todistamatta, koska ajo painaa nappia komennolla. Tulos PT:lle ja KK:lle.
3. **KATTO AJETTU be28de835:** `_tyo/pelikoodari/katto-sali/loki.txt`, raportti 0,2 s välein, p = peitto, e = etäisyys reunasta. Koodista: avoin halli häipyy 0,2 s:ssa alkaen 0,3 m ennen reunaa, ja 1,8 m ennen, kun reitti vie sisään; suljettu sali vasta 1,2 m reunan sisäpuolella. Selvitä juhlasalin laji ja toteutunut hetki kynnyksellä suhteessa sääntöön 2.177 (samalla hetkellä, kun keisari menee sisään). Raportti leikkaa 24 katon jälkeen; jos halli puuttuu, kerro se. Tulos KK:lle.
4. **UUSINTA-NAPPI VALMIS be28de835:** `lokit/pk-muistipiikki-219/uusinta-nappi-be28de835-1/`, raja 4080 Mt; `ui-loki.txt`:ssä "käynnissä noin 20 s" joka kierroksella todistaa lennon. KK:n 40 × on JU:n jonolokissa, odottaa rungon shaa: `pk-mittaa-uusinta-nappi.zsh <runko> 40 40`, noin 43 min. Skripti on `/Users/Shared/Claude/julkaisija-tyokalut/`; reitti tarkistettu.
5. **Oleskelu ja juoksu be28de835 (iPad):** `lokit/pk-muistipiikki-219/oleskelu-be28de835-*`, `lokit/pk-lod-korjaus/juoksu-be28de835-*`. Raja 4080 Mt. Hyväksytään vain, jos s ei muutu ja kuvat ovat salissa (mittaa-oleskelu.zsh:n korjaus ei vielä testattu). Oleskelu oli käynnissä 07.33.

## Avoinna
- **LAV:n puusiirto** runkoon vasta koejuuren valmistuessa (PT 07.07). Junaan v15 + siirto; v16 (2ca2f17b7) myöhemmin uudella tarkistuksella.
- **KK:lle kerrottu:** alkulennon otsikko ei lopullinen. KK:n kohta 4 (sukellus) ok.

## Muistiinpanot
- `tarkista.sh` päivittää tyylikirjan kopion (3 tiedostoa): palauta `git restore`, ei committiin runkoon.
- PT:lle enintään 3 riviä, viestit send_messagella id:llä. Tilin KK-id osoitekirjasta (local_d5f31591).
- zsh ei pilko muuttujaa sanoiksi, ja `${(P)x}` sai komentotarkistuksen estämään koko rivin; vertailut skriptitiedostoon.

## Lisäys: PT 07.3x (LUE, ei toisteta)
- Aukko on junan este. Tutki syy ensin. Kun johtolanka pitää, kerro samalla rivillä PT:lle, voiko sama näkyä julkaistussa 217:ssä. 217:n koodilla ajettava `7ddd353e8 tf217` on jo pyydetty (kopiot vapautetaan).
- **Älä korjaa pitämällä kaikkia kopioita muistissa:** raja 4080 Mt koskee rungon todistusta. Pelkän maan täytteen kopion pitäminen (3450 kolmiota) ei ole tämä, mutta kerro se PT:lle ja mittaa muisti, jos korjaus on se.
