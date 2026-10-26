# Merge-pyynnöt (Natiivi-UI 25.9.2026 klo 04.1x): pariteetti #18 ja löydös 50 vaihe 2 (UI-osa)

Testit: unity-tarkistus 0 virhettä, uss ok. Testikäännös 0f44e75 (nostot-nimet + valikko-18) → iPhone FB234D08.

## natiivi-ui/valikko-18 da30a74 (juna/b12:n päällä) — #18
- .mk-paavalikko leveys 320 → 244,6: web .paavalikko on sisältönsä levyinen, tuotannosta mitattu 244,6 (iPad 834 ja
  iPhone 402, napit 217 × 44, täyte 13,6/12,8/11,2). Natiivin Retkikunta ja Kokeet rivittyvät samaan leveyteen.
- Kuvapari: kuvapari-b12-valikko18-iphone.jpg (web 245, natiivi 243).

## natiivi-ui/nostot-nimet f3b0e3e (juna/b12 27d3a31:n päällä, sisältää nimikerros-50:n) — löydös 50 vaihe 2
- NostotKartalla.Sovita: Nimikerros.Laatikot (ruutupikselit → paneeli) kiinteänä musteena, joka estää kaikkia nimiöitä
  (web nostot.sovittele({ nimet })). Taso 1 ei häivy muiden nimiöiden tieltä, vain nimien ja reunan: ensimmäinen
  reunan sisällä oleva nimistä vapaa kylki, muuten nimiö häipyy ja ikoni jää (sovittelu.js sääntö 4).
- LaatikotMuuttuivat → uusi sovittelu levossa.
- Kuvapari: kuvapari-b12-nostot-nimet-iphone.jpg (web b12s | natiivi; natiivissa ei vielä saapuminen 5e07416).
