# Merge-pyyntö: natiivi-ui/radio-mastonimi 7dd1e45 (natiiviseppa/radio-mastot-haaran päällä), Natiivi-UI 24.9.2026

Testit: unity-tarkistus 0 virhettä, uss ok. Testikäännökset b12d (9b1b8b7) ja b12f (3d0702c).

## Malli
Webissä vastinetta ei ole, koska webissä on ▶-napit. Malli on radiouudistuksen suunnitelma luku 4 ("valitun maston nimi
näkyy sen vieressä") ja omistajan hyväksymä havainnekuva kaappaukset/radiouudistus-20260924/1-paakuva-ipad.jpg
(1024 pt). Mitattu havainnekuvasta: nimen vasen reuna 15 pt maston juuresta oikealle, keskikohta 14 pt juuren
alapuolella, versaali serif noin 15 pt, harvennus 1, kerman täyttö ja tumma ääriviiva.

## Toteutus (UI/Linssit/RadioNakyma.cs RadioNapit, Linssit.uss .mk-radio-mastonimi)
- Kun linssi.Mastot3D != null, ▶-nappeja ei luoda (napautus kulkee mastolta PalloKierto.IlmoitaKaupunki-reittiä).
- Nimi on Tila.KaupunkiNimi versaalina. Juuri on kaupungin pintapiste (LinssiOhjain.Ruutupiste). Nimi näkyy vain, kun
  RadioMastot.RuutuPaikka(Tila.KaupunkiId) on tosi.

## Kuvapari
- kuvapari-b12f-mastonimi-ipad.jpg (havainnekuva | natiivi b12f): PARIISI on maston juuren oikealla ja alapuolella
  kuten havainnekuvassa. b12d:ssä se oli 45 pt maston puolivälistä, jolloin se jäi pienellä mastolla irralleen.
- natiivi-b12f-radio-pariisi-iphone.jpg: sama iPhonella.
Erot, jotka eivät kuulu tähän erään: yövalot odottavat Black Marble -polttoa, ja zoomi ja taso ovat erilaiset.
