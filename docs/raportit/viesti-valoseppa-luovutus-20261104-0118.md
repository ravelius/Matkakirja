# Valosepän luovutus 4.11.2026 klo 01.18

Syy: konteksti yli 25 %, luonteva tauko (k22 valmis). Edellinen: viesti-valoseppa-luovutus-20261104-0052.md (työkalut, polut, Tila-osio vanhentunut SHA:n osalta). Loki: /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md.

## Tila
- **k22 = 73a87a30c** (linssiseppa2/pariisi-k17, natiivi-backup, wt /Users/Shared/Claude/wt/proto-linssiseppa2-koko17, p22, 611/611). = k21 804d491d1 + KK 00.58 kohdat 5–6. Ei laitteella, ei Unityssä. Lue ensin _tyo/linssiseppa2/pariisi-tyyli/k22/TULOS.md. Parit k22/v3/pari-gdn.jpg, pari-sl.jpg, porras-3x.jpg.
- Laiteajoa ei ole JU:lla: lisäpalojen muisti ja kulu JU:n vuorolla PT:n kautta; k22/ajo.zsh valmiina, ei ajettu.
- NS tekee etäisyyshäivytyksen samaan tiedostoon (ElavaKoealue): sovi NS:n kanssa, k22:ssa ElavaKoealue ei muuttunut.

## Seuraavaksi
1. Odota PT/KK:n kanta k21:een, k22:een ja kattosävyyn. Täyttöä ei aloiteta ennen hyväksyntää; laikkujen ja pystyraitojen korjaukset (k21/TULOS.md loppu) vasta KK:n jälkeen.
2. Auki k22:sta: talojen sävyrajat ovat yhä 1,6 m:n ruudukossa (Savy ilman pehmennystä); Grand Palais'n reunan porras laitekuvasta; asemahallin ja katosten vaalea pinta on lisäykseni, KK arvioi.

## Työkalut (k21-luovutuksen lisäksi)
k22/aja-rata.zsh <tunnus> (Gare du Nord, Est, Saint-Lazare), k22/aja-merkit.zsh <tunnus> (ND, Tour, GP), k22/aja.zsh <tunnus> 17 15 13 (keskusta), k22/tyokalut/parit.py, rata-data.py, raivaus-txt.py. Raivaus paikallisajoon ELAVA_RAIVAUS=k22/raivaus.txt; päivitä, jos raivaus_versio muuttuu (nyt 2c5cbb). Uusi versio omaan kansioon k23/; p-versio nousee.

## LISÄYS: PT 01.05 (ohittaa Seuraavaksi-kohdan 1; viesti tuli k22:n jälkeen, kohdat 5–6 on jo tehty k22:ssa)
KK:n päätökset: /Users/Shared/Claude/proto-3d/lokit/kk-peli-a94d8e7fb-20261103/KORJAUSLISTA.md, viimeinen osio. Ulkonäkö ohjaa, ei mittari. Tee k22:n päälle järjestyksessä:
1. Sävyjen levitys pois, harmaavioletti pois, katon piirros ~0,55, rajaviiva ~0,45.
2. Enintään 2 riviä kadusta + pihat.
3. Keksitty iso katto vain alueelle, jossa ei ole datan taloja.
4. Isot katot L 217–220, musteviiva + sisäviiva.
5. #ecd6b0 takaisin, kerma saa nousta.
iPad-ajo peruttu, kunnes pari on lähellä; vuoro pyydetään PT:ltä. Suihkulähde ei nyt.
Reuna: laske, että paino on 1,00 koko Pariisissa ja molemmissa metsissä (Vincennesin itäreuna, Boulognen länsireuna), ja kerro tulos PT:lle.

## LISÄYS 01.25: ohittaa yllä olevan SHA:n ja järjestyksen (PT 01.07, 01.08, 01.16; JU k20)
- **k23 = cebe65c4b** (pariisi-k17, natiivi-backup, p23, 611/611). Lue ensin _tyo/linssiseppa2/pariisi-tyyli/k23/TULOS.md. KK 01.04: 1, 4, 5 tehty; **SEURAAVAKSI 2 (enintään 2 riviä + pihat) ja 3 (keksitty iso katto vain ilman datan taloja)**, sitten vaaleus parista katsoen ja pystyviiva 2,3071 (hypoteesi TULOS.md:ssä: palakohtainen avain TeeTalotuksessa). Uusi versio k24/.
- Reunan lasku tehty ja viety PT:lle (k22/tyokalut/reuna-lasku.py): 1,00 Pariisissa ja metsissä, Vincennes tunnistettu sijainnista.
- iPad-ajo: pyydä vuoro PT:ltä, kun pari on lähellä. Ehto täyttyy: piirtokulu tiedostoon (elava-kulu.txt; Unity-käännös ei vielä todistettu). k20-kuvat lokit/julkaisija-k20-iso-8d1a79394/, muisti 3537/4080, KK:n saumahuomiot KORJAUSLISTA.md viimeinen osio; samat komennot TULOS.md:ssä sk:hon.
- Etäisyyshäivytys on NS:n: sovi ElavaKoealue.cs:stä; k22 ja k23 eivät muuta sitä. Suihkulähde ei nyt. Kohdat 5–6 ovat jo k22:ssa; sävyrajat yhä ruudukossa, koska niitä ei kysytty.
- Korjaa seuraavassa commitissa: ElavaTyyli.cs:n kommentti "noin 3 m reunasta" on väärin; IsoSisaviivaRuutua 3 = noin 5 m (TULOS.md oikein).
