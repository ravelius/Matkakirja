# Lavastajan luovutus 6.11.2026 22.0x — LUE KOKONAAN, riittää yksin

A = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/aukot. Loki: muuri/KORJAUS.md, loppu. EI LEIVONTAA, KARTTAA, VIENTIÄ EIKÄ LEVYT7:ÄÄ ilman PT:n sanaa (PT:n LOPETUSEHTO).

## Tila
Kielletyn kaupungin taustapalojen korjaus. koejuuri-levyt6 (katot-v125/) leipomaton, kuvat A/kuvat-levyt6 (JU, L2, 21.59), parit levyt5 | levyt6 A/kuvat-pari-levyt6 (13 + rajaus-*, arkki-1/2). Rivi lähetetty PT:lle 22.0x. Seuraavaksi PT:n leivontapäätös ja PK:n kävely uudella kartalla ennen vientiä.

## Levyt6 = levyt5 - jaanteet6.json
- Rakennus: tee_levyt5a.py (jäännös y 0,1-0,7, jaanteet5.json) -> tee_levyt5b.py (täyte ilman näkymätöntä, tayte-pois.npz, nakyvyys.py) -> tee_levyt6.py -> tee_levyt6t.py (T-jako). ÄLÄ aja tee_levyt6.py:n T-vaihetta: silmukka pyöri 1 h 44 min, tapoin oman pidin; korjaa ensin tai tee vain geometria.
- Poistettu 2 675 m2: y 0,7-1,3 1 181 (lattia alla 0,0, A:n 2 kolmiota jätetty), irtonaiset 106, marmori 1 388. Tilalle 1 458 m2. Kapea kolmio leikattu x <= 325. Muuttuvat palat 20/20.
- Täyte: 1 069 m2 ei kosketa tasoa 1 eikä näy -> pois; niistä 712 m2 avoin taivaalle.

## Kuvissa
- Korjaantui: saha, harmaa marmori (taytto-112-229), A-kiila.
- Ei korjaantunut, syy auki: B-koko2:n reunakivi ja yläpinnan palat; jäännös 3:n (237; -112) pisteviivat, tumma kiila, vaalea reuna (T-jako ei ollut syy). 325 T-reunaa jäljellä, syy mittaamatta.
- Täysikoossa katsottu vain rajaukset; muut pienennettyinä, ennen hyväksyntää täysikoossa.

## Apuvälineet
maailma_talteen.py (koko maailma npz, osasarja-v8.bin), kamerat5.py (kameraehdokkaat säteillä), parit6.py. numpy/scipy: /opt/homebrew/bin/python3 ilman -I:tä.

## Opetukset
Kuiva-ajo mitattuna ensin myös jälkivaiheille; yhden palan aika ennen koko ajoa. Näkyvyys säteellä koko maailmaa vasten, ei vain taustaa. Jätetty päällekkäisyys tuottaa z-taistelun leivonnan jälkeen.
