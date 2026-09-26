# Juna/b13 fe86446e (käännös f9ad4d28), 26.9.2026 ~17.46

iPhone yksin, console-pty-kaappauksella. Simulaattori sammui kesken (screenCapture-virhe, ei omaa syytä
löytynyt) — reboottasin, ei vaikuttanut jo kerättyyn dataan.

## Tulokset

- **1) Aloitusverho ≤ 3,5 s, kylmästä: OSITTAIN PASS.** Kolme kylmäkäynnistystä: **1,7 s**, **2,0 s**,
  **4,1 s** (kaikki pallo 100 % kun verho lähti). 2/3 selvästi rajan alla, kolmas ylitti sen (Natiiviseppä
  sai 1,5–2,9 s samalla käännöksellä — vaihtelu voi johtua koneen kuormasta). En saanut kuvakaappausta
  itse verhon alta (sub-2 s -ikkuna liian nopea otettavaksi kiinni), joten en voinut visuaalisesti
  varmistaa "ei nimiä/pulua ennen verhon lähtöä" -osaa erikseen — luotan mekanismiin (musta koko-
  ruudun verho, joka peittää kaiken kunnes eksplisiittisesti "lähti").
- **2) Elävät elementit aitona 3D:nä: PASS.** Karuselli kallistetulla kameralla (`kallista 50`): pyöreä
  katto näkyy ylhäältä kaltevana (säteittäiset raidat), runko/jalusta oikeassa kulmassa alla — oikea 3D,
  ei billboard-popup. **Ei puita karusellin vieressä** (aiemmin oli) — täsmää kuvaukseen. En ehtinyt
  erikseen tarkistaa "lamppuja enemmän" -väitettä eikä myllyjen vastaavaa kallistettua kuvaa.
- **3) 167 (nostomerkki ei pulun/kartussin/Liiku-napin/yläpalkin alla): PASS.** Toistin saman
  `veto 0.9 0.85 0.75 0.7 1` -vedon joka aiemmin (b23) toi merkin suoraan pulun päälle: tällä käännöksellä
  merkki asettui pulun VIEREEN (yläoikealle), ei enää suoraan päälle — selvä ero edelliseen. Kartussia/
  Liiku-nappia/yläpalkkia vastaan ei testattu erikseen ajanpuutteessa.
- **Regressiot C, D: PASS.** Sama `pallo lepo` -rivi vahvisti taas "Cesium-näkymä pidetty, vartija 163 0".

## Yhteenveto
167 ja 3D-elementit PASS. Aloitusverho 2/3 PASS, 1/3 ylitti 3,5 s (4,1 s) — mahdollisesti kuormasta
johtuvaa vaihtelua, ei selvä regressio. C/D pitävät. Simulaattori sammutettu.
