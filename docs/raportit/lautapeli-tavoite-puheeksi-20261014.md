# Lautapelien tavoite puheeksi: Tavli ja Mylly (Sisältökirjuri 14.10.2026, LUONNOS)

Tilaus: PT (omistaja 00.3x: "tavlissa pitäisi selittää ääneen mitä pelissä yritetään tehdä"). Sama ääni kuin Lautapelien puheopastuksessa (opas-v1, William). Ei ammattisanoja. JSON: `proto-3d/_tyo/sisaltokirjuri/lautapeli-tavoite-20261014/lautapeli-tavoite.json`.

## Tavli (Portes) (tavli-tavoite, 28 sanaa, ~12 s)

Tavlissa kuljetat kaikki nappulasi laudan ympäri kotialueellesi ja poistat ne laudalta. Se, joka saa omansa ensin pois, voittaa. Vastustajan yksinäisen nappulan voi lyödä, mutta kaksi nappulaa sulkee pisteen.

Tuki: Pelikoodarin säännöt Tavli.cs ja SK:n tarkistus docs/raportit/lautapelit-opastus-tarkistus-20261012.md: koti a0–a5 / a18–a23, poisto vasta kun kaikki 15 kotona, lyönti vain yksinäisen, ≥ 2 sulkee.

## Mylly (mylly-tavoite, 28 sanaa, ~12 s)

Myllyssä yrität saada kolme omaa nappulaa samalle viivalle. Jokaisesta myllystä saat poistaa yhden vastustajan nappulan. Voitat, kun vastustajalle jää vain kaksi nappulaa tai hän ei pääse enää siirtämään.

Tuki: Mylly.cs ja SK:n tarkistus: mylly poistaa vastustajan nappulan, häviö alle 3 nappulalla (käsi + lauta) tai kun siirtoja ei ole; tasapeli 100 puolisiirron jälkeen on jätetty pois tavoitepuheesta (sääntökortissa).

## Mylly tarkistettu
Myllyn tavoitetta ei kerrota ääneen nykyisessä opas-v1:ssä (14 vinkkiä: asetus, mylly-tulossa, poisto, suojattu, siirto, lento, vastustaja-lentää; tavoite vain sääntökortissa tekstinä), joten sama lisäys myös sinne.

Käyttö: soita alussa kerran (ennen ensimmäistä vinkkiä), tunnukset `tavli-tavoite` ja `mylly-tavoite` kansioon `aanet/pelit/opas-v1/` (kuten muut) ja lisäys `opas.json`iin; NUI kytkee Lautapeliopas.cs:ään.
