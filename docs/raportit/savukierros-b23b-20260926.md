# Build 23b (26.9.2026, käännös 7210f166, juna/b13 2e6e6648 + Linssisepän karuselli 469ae8fe)

Karuselli-korjauksen tarkistus + myllyt (Fablen lisäys) + C/D. iPhone yksin, console-pty-kaappauksella.
Rekisterin desync toistui taas asennuksessa (kolmas kerta peräkkäin) — sama korjaus (uninstall+install
tuoreesta Matkakirja-proto-kaannos-buildista). Ei komentoja ennen "aloitusverho: pois" -riviä (8,2 s,
pallo 76 %, puhdas mittaus tällä kertaa).

## Tulokset

- **Karuselli (Kööpenhamina, Tivoli): PASS, selvä parannus.** Uusi ilme: hillityt harmaa/sininen/beige-
  raidat (ei enää kirkkaan punainen), ketjuistuimet riippuvat katoksen reunalta, pieni kuusi vieressä.
  Lähikuvassa (zoomattu) jalusta/lattia lepää maanpinnalla, ei havaittavaa leijuntaa. Loki: "karuselli
  näkyvissä (peitto 1,00), 1321 kolmiota, nopeus 0,99" (pyörii) → myöhemmin "nopeus 0,00" (tauolla,
  "seuraava tauko 70 s") — tauko-mekanismi toimii todistetusti. kehysajat.jsonl pysyi koko ajan
  `tilat.kerros`-hallitsevana (taysi 0 tauon jälkeen), ei jäänyt täyteen piirtoon tauon aikana.
- **Myllyt (Zaanse Schans): PASS.** Lähikuva: kolme myllyä selvästi maassa kiinni, pieni varjo jokaisen
  alla, ei leijuntaa. Loki tavoitti myllyt kesken tauon: "myllyt näkyvissä (peitto 1,00), 220 kolmiota,
  nopeus 0,00, seuraava tauko 466 s" — siivet pysähdyksissä juuri kuvanottohetkellä, vahvistaa puuska/
  tauko-mekanismin (ei jatkuva pyöriminen).
- **Regressiot C, D: PASS.** Samalla `pallo lepo` -rivillä myös "Cesium-näkymä pidetty, vartija 163 0" —
  163-korjaus pitää edelleen tälläkin käännöksellä.

## Yhteenveto
Karuselli ja myllyt molemmat PASS (maakontakti, hillityt värit, tauko-mekanismi todistettu lokista ja
kuvista). C/D puhtaita, 163 pitää. Simulaattori sammutettu turvallisesti.
