# Linssipariteetti, kierros 4 (25.9.2026 ilta)

*Linssiseppä (Opus). Build 15 (master 6ab9d45c = juna/b13 c7091b7c, sama puu kuin TestFlight 1.0.15). Rivilista:
linssipariteetti-4-rivilista-20260925.md. Edellinen: linssipariteetti-3-20260925.md.*

## Yhteenveto

| Laite | Tulos | Avoimet |
|---|---|---|
| iPhone 402 × 874 | SAMA 1, ERI 10, VAIN NATIIVISSA 1 | 0 kierroksen 3 riveistä; rivi 42 odottaa päätöstä |
| iPhone vaaka 874 × 402 | SAMA 1, ERI 10, VAIN NATIIVISSA 1 | 0 (turva-alue ja ×, hyväksytty); rivi 42 odottaa päätöstä |
| iPad 11" 834 × 1210 | SAMA 1, ERI 10, VAIN NATIIVISSA 1 | yläpalkin pystysijainti (Natiivi-UI); rivi 42 odottaa päätöstä |

Pariteettiajo on nyt yksi simulaattori kerrallaan (linssiseppa-iPhone D0D2CD1E, linssiseppa-iPad11 903C2B91). Ajo odottaa
uuden pelin kerronnan loppua (13 s) ja linssin odotuspeitettä ennen kuvaa. Kuvat ja kontaktiarkit:
`proto-3d/lokit/pariteetti-ajo/b15-linssit-4/{iphone,iphone-vaaka,ipad11}/`.

## Muutokset kierrokseen 3 nähden

- **iPad 31 vesistöt:** Natiivi-UI:n korjaus (linssi-ipad-k3c) toimii. Merkintäkortti kutistuu linssin auetessa. Jäljellä on
  26 px: nimilappu ×:n vasemmalla puolella (löydös 32) ja Liiku turva-alueen yllä, eli hyväksytyt poikkeamat.
- **iPad ja iPhone 39 vertailu:** alapaneeli on keskitetty pilleri, ja kotimaa näkyy kehällä ja reliefillä (Natiiviseppä,
  kotimaa-korostus). Rivi on terävä. Sumeus kierroksen 3 lisäajoissa 3b–3f johtui uuden pelin kerronnan kuvasumennuksesta,
  jonka Natiiviseppä korjasi (linssi-kuvasumea), ja työkalu odottaa nyt kerronnan loppua.
- **iPad 12 selite:** mitattu ensimmäistä kertaa ilman odotuspeitettä: 33 px, josta × (löydös 32) ja yläpalkki (ks. alla).
- **Uudet rivit 42 ja 43** (Fablen päätös: taulu kattaa molempien puolten linssit):
  - 43 isoisän linssi 1873: VAIN-NATIIVISSA (webin rekisterissä ei ole).
  - 42 webin karttapallo verrattuna natiivin koko palloon: ERI, ks. avoin 1.

## Avoimet

1. **Rivi 42, karttapallo (päätös Fablelle):** webin Karttapallo on oma linssinsä. Se piilottaa pelin käyttöliittymän
   (Liiku, maan nimi, pulu, merkintäkortti), näyttää julisteen pallona, sulkeutuu ✕:llä ja sukeltaa napautuksella.
   Natiivin kartta on aina pallo, eli toiminto (pyöritä ja sukella) on kartan perustila, mutta ulkoasu eroaa, koska
   käyttöliittymä on näkyvissä.
   - Vaihtoehto a: poikkeama (natiivissa ei tarvita erillistä linssiä).
   - Vaihtoehto b: natiiviin kevyt Karttapallo-tila, jossa pelikerrokset piiloon, koko pallo ruudulle ja ✕ (webin kaava,
     ei uusi linssi).
2. **iPadin yläpalkin pystysijainti (Natiivi-UI):** raha ja päivä -pilleri on linssistä riippuen −27…+17 px webistä
   (rivi 12 −27, 39 +17, 41 +9). Rivi 39 on siksi 17,3 px, eli hiukan yli rajan.

## Hyväksytyt poikkeamat

Samat kuin kierroksella 3:
- iPhonen yläpalkki (löydös 74)
- pelkkä kaupungin nimi lapussa (löydös 73)
- ✕ (löydös 32)
- alareunan ja sivujen turva-alue
- radio (rivi 37)
- iPadin aikajanapalkki ilman karttakehystä (rivi 13, Natiivi-UI)
