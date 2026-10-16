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

## Päivitys 02.30: erä 5 (maalehtien osajoukko, PT:n pyyntö)
- Maat FRA, DEU, ITA, ESP, NLD, AUT, GRC (pääkaupunkikierrosten maat): 256 luentaa, 105 845 mrk, 23 890 kr. Vienti 257 tiedostoa, virheitä 0.
- Manifesti **v6** (kumulatiivinen, 8 410 palaa) → `aanet/luennat/v6/manifest.json` (200). Käytössä uusin; vaihto: Siirtoseppä.
- Kehys: 520 349 / 566 895 mrk. Luentoja yhteensä 1 255 + 256 = **1 511 (kattoa 1 505 ylitetty 6:lla)**: kuivan ajon määrä (246) oli arvio ennen v5-vertailua; mrk-raja piti, lukumäärän tarkistus puuttui ajosta. Ilmoitettu PT:lle.
- Jäljellä maalehdet 831 palaa / 369 643 mrk (32 maata + GBR 87 palaa): odottavat omistajan päätöstä kehyksen kasvatuksesta.

## Luovutuksen kirjaus (PT 02.3x): lukumäärän katto ajossa
`vienti-0200/kuiva.py --aja` vaatii nyt ympäristön `KATTO` (luentojen enimmäismäärä) ja pysähtyy ennen ylitystä: `VIETY + uusia <= KATTO`, VIETY oletus 1 511 (v6 jälkeen). Merkkiraja (`RAJA`) ennallaan. Ei uusia luentoja ennen omistajan päätöstä (PT 02.3x).
