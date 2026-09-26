# Omistajan TestFlight-tarkistuslista iPadilla dev-komennoilla (24.9.2026)

Natiiviseppä, iPad Pro 11" (M5), proto-master 7706efd (= Build/testflight-4, 1.0.0 (4)).
Lista: docs/raportit/omistajan-testflight-lista-20260924.md (kirjoitettu build 3:lle).
Kuvat tässä kansiossa (numero = listan kohta).

| # | Kohta | Tulos |
|---|---|---|
| 2 | Portti | ok (tallennus olemassa → "Jatka matkaa" / "Uusi matka") |
| 3 | Avausteksti | EI NÄKYNYT automaatiossa (`ui aloita` ohittaa valinnan → LentoKirjoitus ei käynnisty); tarkista oikealla napautuksella |
| 4 | Aloituskaupunki | nyt pallovalinta (19 kultapistettä), ei 14 kaupungin ruudukkoa → listan teksti vanhentunut |
| 4b | Aloituslento | ok: DC-3, savujana, pilvet, aurinko, laskun kierto (03-aloituslento-ui-polku.jpg) |
| 5 | Matkavalinta | ok (Bussi/Lento/Liftaus/Laiva hintoineen) |
| 6–7 | Saapuminen + kaupunkilehti | **VIKA korjattu**: lehti ilman tyylejä (Lehti.uss puuttuva }, merge 7ab5311) → 524f0e9, TF4 viety uudelleen; sisällys (☰) toimii |
| 8 | Maan oma lehti | ok, mutta otsikossa "GRC" eikä "Kreikka" (ehkä vain testikomennon ISO) → Natiivi-UI |
| 9 | Kysymys | ok (visa, aika, vihje, 50:50) |
| 10 | Aarteen paljastus | ok (pääaarre, leima) |
| 11–13 | Linssit | keksinnöt avautuu ja kaari käy; radio-kuori jää auki `ui sulje`:n yli (tarkoituksellinen soitin?) |
| 14 | Offline | nyt maanosittain / "Kaikki" (omistajan päätös) → listan teksti vanhentunut |
| 15 | Huipennus | ok |
| 16 | Radio | radiokuori ON jo tässä buildissa (lista sanoo "ei vielä mitään") |
| 17 | Sulavuus | lennot max 16,5 ms alussa, muuten 8,3 ms (120 Hz); kuvakaappaukset aiheuttavat 25–40 ms |

Muut havainnot: saapumisen matkakirjakortti ("Ateena, elokuussa 1873" + Ohita) jää auki muiden näkymien
alle koko ajan, kunnes Ohita painetaan (tarkoituksellista?).
