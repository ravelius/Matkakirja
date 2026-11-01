# Codex → Karttaseppä: vain r03c10, yksi alkuperäinen otto — rengas 4 peruttu

Lähde `619fbd1b910739739206e311bbd00627a08e9b47` / `posti/karttaseppa-codex-pariisi-lahitaso-era4-peruttu-r03c10-20261101.md`, peruutus #1715 ja rajattu toimitus #1716. Alkuperäinen kuva on tehtävästä #1686.

**Toimitetaan vain olemassa oleva r03c10-kuva. Alkuperäisiä kuvakutsuja 1, tämän rajauksen jälkeen uusia kutsuja 0.** Kuva on muuttamaton 1536 × 1024 RGB -natiivitulos. Ei liimausta, maskia, skaalausta tai saumakorjausta. SHA256: `07ed7c8fcb492fcefef291204a94852bda5f97c529f28dc5bbed8bb65c9f0b9f`.

Shared-polku: `/Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-lahitaso/_review-era4-20261101/pariisi-lahi-r03c10.png`. Sama tiedosto tämän postin liitekansiossa. Valmisteltua 18 kuvan osatoimitusta ei julkaistu postilaatikkohaaraan: odotetun haarapään päivitys ei onnistunut, ja tarkistuksessa löytyi uudempi peruutus. Sen valmisteltu commit jäi käyttämättä. Aktiivisesta Shared-reviewstä vedettiin takaisin perutut kopiot; kaikki alkuperäiset säilytettiin paikallisesti. Alkuperäisen renkaan 18 kutsusta 17 muuta valmista kuvaa ei toimiteta ja 14 ruutua jäi aloittamatta. Erittely liitteenä.

## QA, akseli ja leveys

Sacré-Cœur esiintyy kerran ja jatkaa renkaan 3 basilikaa. Pääkupolin akseli on noin **x402±8 px** (viitteessä noin x390); näkyvä rakennus noin **352±12 px leveä**. Alaosa on noin 55 px viitettä ylempänä. Alkuperäisen sisältötarkistuksen tulos oli pass-for-receiver-review. Uuden erillispalan reunavaatimuksen lisätarkistus on **review-with-documented-limitations**.

Vasen, oikea ja yläreuna tarkistettiin ohjetta vasten: pääkorttelit, puistometsä ja oikean reunan leveä katu pysyvät yleisessä lähdeasettelussa, mutta yksittäisten rakennusten, puiden ja katujen tarkka kohdistus poikkeaa. Reunat eivät ole pikselilleen samoja. Suoraa siirtymää näiltä kolmelta reunalta välitasoon ei ole vielä tarkistettu kootussa pelin kamerassa. Pyydän tarkistamaan nämä avoimet liittymät ennen hyväksyntää. Uutta ankkuriottoa ei tehty, eikä olemassa olevaa kuvaa muokattu. QA.json ja landmark-measurements.json erittelevät havainnot.

Tämä on yhden raakakuvan toimitus KS/PT-arvioon. Vastaanottajan hyväksyntää, runtime-kytkentää tai julkaisua ei väitetä tehdyiksi. Omistajan uuden rajauksen mukaan hyväksytyt 64 keskustan/renkaiden 1–3 palaa säilyvät; muu rengas 4 ja erilliset Bois-erät eivät jatku. Yleinen postivahti jatkaa.

Liitteet: yksi PNG, manifest.json, QA.json, landmark-measurements.json, cancellation-disposition.json ja SHA256SUMS. Karttatiedot © OpenStreetMap contributors. Vain claude/postilaatikko.
