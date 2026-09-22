# Meren kuviot eivät ole samat kahdella tasolla (v2106, omistajan tarkennus)

Karttaseppä 22.9.2026. Omistaja klo 15.50: vesiviivoitus säilyy (*"ne ovat
hienoja, kokeillaan saada ne vain toimimaan"*), ja vika ei ole vain viivojen
kohdalla vaan **koko meren alueella zoomatessa**.

## Mittaus: sama maa-ala kahdella tasolla

Vedokset samasta alueesta (Lioninlahti, tuotannon resepti) tasoilla z5 ja z6.
Karkeampi skaalattiin z6:n mittaan ja kuvat jaettiin matala- ja
korkeataajuiseen osaan (9 × 9 keskiarvo). Pearsonin korrelaatio:

| Kerros | patina kevyt (tuotanto) | patina ei |
| --- | --- | --- |
| matalataajuus (meren sävy, syvyys) | **0,96** | 0,99 |
| korkeataajuus (rae, kuitu, vesiviivat) | **0,14** | 0,49 |
| rakeen rms (z5 / z6) | 8,9 / 9,2 | 6,0 / 5,8 |

Sisältö on siis sama tasolta toiselle, mutta **hieno kuvio on käytännössä
korreloimaton**. Kun peli ristihäivyttää z:n ja z+1:n, se sekoittaa kaksi
riippumatonta rakeisuuskenttää — ja se näkyy likana koko merellä, ei vain
viivojen kohdalla. Patina tuottaa suuremman osan: ilman sitä korrelaatio on
0,49, sen kanssa 0,14.

Kaappaussarjat samalta maa-alalta z5 → z8:
`docs/raportit/kuvat/merikuviot-rannikko-z5-z8-20260922.jpg` (rannikko) ja
`…-avomeri-…jpg` (avomeri). Rannikkosarjassa näkee suoraan, että
vesiviivat ovat **eri paikassa ja eri määrä** joka tasolla.

## Juurisyy: painojälki on mitoitettu paperipikseleinä, ei laudan yksiköinä

`tools/fokuskartta/maailmapiirto.js` (osio P/S, rivi ~710) kertoo säännön:
pyramidi antaa `paperiS: 1`, jolloin **jokainen painojälki on joka tasolla
saman levyinen** ja vain maasto tarkentuu. Se on oikea päätös leveydelle —
mutta samalla se sitoo kuvion PAIKAN laatan omaan ruudukkoon:

- `maailmapiirto.js`: kuitu `gx/(52·P)`, rae `gx/(1,7·P)`, laikku
  `gx/(260·P)`, maaston kudos `gx/(26·P)` ja `gx/(7·P)`, pigmentti
  `gx/(2,1·P)`, laikutus `gx/(95·P)`.
- `patina.mjs` (VESIVIIVOITUS): `aloitus`, `vali`, `kasvu`, `paksuus`,
  `huojuntaSkaala`, `rosoSkaala` — kaikki × `sp`.

Koska P on sama luku joka tasolla, sama maantieteellinen piste osuu eri
kohtaan kohinakenttää eri tasoilla. Vertailukohta samassa koodissa: meren
vyöhykkeiden kohina korjattiin 21.9.2026 laudan yksiköihin
(`--syvyyskohina lauta`) — ja juuri siksi matalataajuus korreloi 0,96.
Muuta ei ole korjattu.

## Korjausehdotus

**1. Vesiviivat laudan yksiköihin, paksuus ruudulla vakioksi, karkealla
tasolla harvempi.** `aloitus`, `vali`, `kasvu`, `huojuntaSkaala` ja
`rosoSkaala` lasketaan laudan yksiköissä (× px/yksikkö kyseisellä tasolla),
jolloin viiva *k* on joka tasolla samalla maantieteellisellä etäisyydellä
rannasta ja huojunta on sama kuvio. `paksuus` ja `voima` jäävät
paperipikseleihin, jolloin viiva on ruudulla yhtä paksu joka tasolla.
Koska maantieteellinen viivaväli puolittuu ruudulla joka tasolla
karkeampaan mentäessä, viivoja **harvennetaan**: piirretään vain joka
toinen (tai neljäs), kun paikallinen viivaväli alittaa ~3 px. Näin karkea
taso on harvempi eikä tummempi, ja ristihäivytyksessä jäljelle jäävät
viivat osuvat päällekkäin.

**2. Paperin rae: valinta, joka kuuluu omistajalle.** Kohinakenttä ei voi
olla yhtä aikaa maailmaan sidottu JA ruudulla samankokoinen — jompikumpi
joustaa. Vaihtoehdot:
   - (a) rae laudan yksiköihin: kuvio täsmää tasojen välillä, mutta rae
     kasvaa syvälle zoomatessa (karkealla tasolla hieno, z8:lla karkea);
   - (b) hieno rae pois poltosta ja ruutuavaruuden kerroksena peliin
     (Pelikoodari): paperintuntu säilyy vakiona eikä välky lainkaan;
   - (c) nykyinen: rae paperivakiona, välkkyy tasonvaihdossa.
   Suositus: (b) hienoimmalle rakeelle ja (a) isoille laikuille — patinan
   osuus liasta on mitattu suurimmaksi (0,49 → 0,14).

**3. Isobaatit jäävät ennalleen** — ne ovat jo laudan yksiköissä.

## Mitä tässä EI ole tutkittu

Mipmapit, kerman maski ja kerrosten ristihäivytyksen ajoitus ovat pelin
puolella (Pelikoodarin kohta B). Tämän mittauksen perusteella crossfade ei
ole vika vaan paljastaja: se sekoittaa kaksi kuviota, jotka poltto on
tehnyt erilaisiksi. Havainnot jaettu Pelikoodarille 22.9.

## Toisto

```
node tools/generoi-laattapyramidi.mjs <ulos> --tasot 5 --alue 3.0,41.0,7.5,43.5 \
  --data <gshhs> --korkeuspalat <palat> --joet-pohjaan --vesiviivoitus tumma \
  --syvyyskayrat 200,1000,3000 --syvyyskohina lauta \
  --resepti-json '{"syvyys":{"litistys":0.8}}' --rannikon-harvennus 0.004 \
  --laatu 0.9 --patina kevyt
```
Sama tasolle 6, sitten z5-laatan 20/9 neljännes (256..512, 256..512)
skaalataan 512:een ja verrataan z6-laattaan 41/19.
