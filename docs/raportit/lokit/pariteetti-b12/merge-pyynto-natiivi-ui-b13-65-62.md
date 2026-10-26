# Merge-pyynnöt (Natiivi-UI 25.9.2026 klo 06.3x, build 13): löydökset 65 ja 62

Testikäännös 6b550fd (saapuminen-ei-lehtea + valikko-65 + opas-62 + lehti-64 + radio-71, juna/b13) → iPad 503000D1
ja iPhone FB234D08. unity-tarkistus 0 virhettä.

## natiivi-ui/valikko-65 2def9e7 (juna/b13) — löydös 65 (omistaja, sitova)
- Linssivalitsin.Valikkona = true kaikilla laitteilla: ☰ avaa yhdistetyn valikon (äänikytkimet, Uusi peli / Muut /
  Kehittäjä, viiva, LINSSIT) myös iPadilla. Erillinen linssipaneeli ja silmälasinappi poistuvat.
- Retkikunta näkyy vain Muut-paneelin "Retkikunta"-napista omana osanaan (Paavalikko.Osa.Retkikunta). Nappi näkyy,
  kun SahkeNakyma on rakentanut osion.
- KOKEET pois pelaajalta. Maailma on KARTTA-ryhmässä Pieni liike -rivin alla (vain kehittäjätilassa). Astronautin
  reliefi, Linssien kynnykset, Raamattu, Kehittäjälehti ja Kehittäjäkoodi ovat Kehittäjä-osassa otsikolla KEHITTÄJÄ.
- Kuvapari: kuvapari-b13-valikko65-ipad-iphone.jpg (omistajan kuva | iPad ☰ | iPad Retkikunta | iPhone ☰).

## natiivi-ui/opas-62 602be6c (juna/b13) — löydös 62
- Lehti.uss: .mk-opas__pino > .mk-opas__palsta { flex-basis auto; flex-grow 0; flex-shrink 0 }. Sarakkeessa
  flex-basis 0 oli korkeus 0, joten "Milloin matkaan?" -laatikon kaudet piirtyivät seuraavan jakson päälle.
- Kuvapari: kuvapari-b13-opas62-ipad.jpg (omistajan kuva | korjattu, Bukarest iPad).
