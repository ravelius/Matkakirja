# Luentaerä 4 (oppaat + kaupunkilehdet) ja maalehtien jäännös, Äänittäjä 17.10.2026 klo 02.15

Lähde: Julkaisijan natiivivienti `proto-3d/_tyo/luennat-v1/nostoluennat-20261017-0200.jsonl` (9 318 palaa; juna 197 -runko).
Työ: `proto-3d/_tyo/luennat-laskelma-20261017/vienti-0200/` (muunna.py → virta.mjs → kuiva.py [laji,..] [erä] [--aja] → paketoi.py).

## Valmis
- Erä `era1`: oppaat 78 + kaupunkilehdet 179 = 257 luentaa, 141 923 mrk puhuttuna, 32 519 kr (0,229/mrk). Vienti ämpäriin: 258 tiedostoa, virheitä 0.
- Manifesti **v5** (kumulatiivinen, 8 154 palaa) → `aanet/luennat/v5/manifest.json` (200). Käytössä vain uusin; vaihto pelin asetukseen `osoitteet.luennat-manifesti` = Siirtoseppä.
- Kuluttu yhteensä: 272 581 + 141 923 = **414 504 mrk** omistajan 566 895 mrk:n kehyksestä; kehystä jäljellä 152 391 mrk.

## Natiivivientiä vasten (v4:n jälkeen)
nostot 4 062, kohtaamiset 88, nähtävyydet 1 371 täsmäävät kaikki v4:ään (0 puuttuu). Lajia "maan intro" ja "tiedeliite" ei vientilajeissa; maan lehti = `maa:XXX#k` (lehdet).

## Jäljellä: maalehdet (EI generoitu, ylittää kehyksen)
- 1 087 uniikkia `maa:`-lehtipalaa, **475 488 mrk** puhuttuna (~109 k kr). Kehyksen jäännös 152 391 mrk riittäisi n. kolmannekseen.
- Ylitys vaatii KK:n suoran "OMISTAJAN PÄÄTÖS klo …" -rivin (kehyksen kasvatus tai osajoukko). Aja: `EI_MAA` pois, `kuiva.py lehdet era5 --aja` (RAJA=<mrk> ympäristöstä).
- Vanhan replikan arvio (lehdet EU 132 k) oli liian pieni: todellinen EU-lehtien tarve oli 590 k.
- i-kortin faktat (134 kpl, 13 415 mrk) edelleen ehdolliset Natiivi-UI:n vahvistukselle.
