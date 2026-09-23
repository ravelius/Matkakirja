# Aloituskaupungin valinta pallolta: laitesavuke (23.9.2026 klo ~23.05)

Simulaattori iPhone 18 Pro, proto-master `e510cfd` (natiivi-ui/rivit22
`368e69d` mukana). Puhdas tila (`Documents/tallennus.json` poistettu,
uudelleenkäynnistys), oikea pelikulku napautuksin (ei testikomentoja —
`ui aloitus valinta` -eristetty koe antoi harhaanjohtavan tuloksen, koska
se ei odottanut `KarttaKerrokset`-alustusta; katso alla).

## Tulos: napautus AVAA VAHVISTUSKORTIN — täsmää tuoreimpaan koodiin, EI Fablen kuvaukseen

Napautettu Ateenan kultapistettä (yksi 19:stä lähtökaupungista) oikean
"Aloita seikkailu" → pelikulun kautta. Näytölle avautui kortti:
**"Ateena / Kreikka. Lennät Lontoosta tänne ja matka alkaa." [Valitse
toinen] [Aloita täältä]**. Kortti tulee `Aloitusnakyma.AloitaPallovalinta()`:sta
(rivi ~535: `v.Kysy(..., "Valitse toinen", "Aloita täältä", ...)`), EI
varakortista (`PakotaKortti` oli false, pallo oli siis aktiivinen).

**Tämä täsmää sanatarkasti tuoreimpaan committiin `368e69d`** ("Aloituskaava
(omistaja 23.9.2026): **portti → kartta + vahvistus → lento**",
Aloitusnakyma.cs:n oma kommenttirivi) — vahvistus on siis kirjattu
sitovaksi omistajan toimesta SAMANA päivänä. Tämä on ristiriidassa Fablen
kuvauksen kanssa ("napautus valitsee, eikä korttia"). En korjannut mitään
enkä olettanut kumpi on oikein — ilmoitan ristiriidan.

"Aloita täältä" -napautus toimi: peli käynnistyi (£300, Päivä 1), pelaaja
Ateenassa, reittiviiva näkyy Roomaan asti kartalla — lento/saapuminen siis
päätyy oikeaan tilaan.

**19 kultapistettä**: ei laskettu tarkasti tässä ajossa (kamera ei näytä
koko palloa yhdellä kertaa vahvistuskortin takaa) — jos tämä pitää vielä
todentaa erikseen, tarvitaan oma ajo kameran ollessa kauempana.

## Menetelmävirhe, opiksi seuraavalle

`ui aloitus valinta` (Aloitusnakyma.Testaa, eristetty UI-koe ilman peliä)
EI kelpaa tämän vahvistuksen testaamiseen: se antoi saman kortin, mutta
syy voi olla eri (KarttaKerrokset ei ehkä ole alustunut eristetyssä
kokeessa, jolloin `AloitaPallovalinta()` palauttaisi false joka
tapauksessa). Oikea peli oikealla napautuksella ("Aloita seikkailu" →
odota → napauta kultapistettä) on ainoa luotettava tapa.
