# Lavastajan luovutus 7.11.2026 01.22 — LUE KOKONAAN, riittää yksin (korvaa -0041)

A = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/aukot. Loki: muuri/KORJAUS.md, loppu. Tila PT 01.2x: lepo, ei uutta työtä yöllä, EI LEIVONTAA, KARTTAA, VIENTIÄ eikä uutta korjausyritystä ilman PT:n sanaa. Työ kuuluu juoksupeliin.

## Tehty ja kuitattu kokeena
- Terassin pääty (ajo 7x): terassin oma ehjä kulma C (-360,85; -17,34), paljastui korjauksesta, kolmio ei palaa. Koejuuri 7n jää.
- 1-1:n kivisivu: nähty z noin -261..-257 (sivu-260, -259, -257, kaikki täysikoossa). Kolo ennallaan, ei korjattu.
- Koko muuria EI saa sanoa korjatuksi: lod1/2, kolo ja laikku auki.

## Aamuun (PT vie rivin KK:lle)
1. Sävyraja ja pisteviiva: tulivat korjauksesta (7y|7n). Yritys 7o (tee_levyt7o.py, koejuuri-levyt7o) poisti ne paaty-lahista, mutta paaty-ylassa on uusi hiusviiva Q-R, tumma kiila Q:n kohdalla ja vaaleita laattoja. Syyt päätelty: kärjet pyöristetty 3-5 mm naapureista, C:n valo-UV. Parit A/kuvat-levyt7o/pari-*.png. Suositus: tarkat kärjet (N -362,2469; -17,6362, M -355,7472; -16,278, Q -362,7398; -15,475; P -360,5671; -25, R -350,003; -16,9377, mittaa55.py) + valo-UV KK:n koeleivonnalla. Vain PT:n sanalla.
2. Kiven alareunan rako: todellinen, koskee muitakin kiviä (rako 0 ei kaistaa; 1, 4, 10 cm vaalea pienkivikaista, leveys raon mukana; A/kuvat-levyt7o/ala-*.png). 2 883 pinnasta 75 % raja 5,1 cm, 90 % 13,4 cm (yläraja). Säde tämän kiven raosta ja rako4:stä: V4_lattia kiven takana. UV-tiheyttä ei mitattu. Rako10:n säde (kamera -199,85 0,46 15,37) ei osunut paketteihin: AUKI. Ei korjattu.

## Sivulöydökset, ei yötyötä
Sivu-259: seinässä kirkas pystyraita ja lovi alareunassa (noin 680-760; 490). Vanhat: irtolaatta tausta 3-1 (259; -80,9), kivijalan kansi venynyt peli-A:n seinässä, sahalaita ulkomuurin kivijalassa (kaista-lahella), laikku B, kiila ja raita (valokartta), PK:n kävely uudella kartalla ennen vientiä, lod1/2.

## Työkalut
Glb-tiedostoissa z on käännetty: säteissä z * -1 (mittaa56.py; mittaa55:n säteet eivät siksi osu). Maailma A/maailma-7k.npz + .json, osasarja-v8-z.npy, A/alareunat.npy (mittaa51). Ajo A/aja-levyt7o.zsh ja sk-levyt7o.txt mallina, sha 35140432d, vuoro JU:lta. numpy/scipy: /opt/homebrew/bin/python3 ilman -I:tä.
