# "Yhdistä kolme" -aarretehtävä: Lontoon sisältö (SK 13.11.2026, KK:n tehtävä 3)

Taulukko, EI pelidataa. Malli: yhdista-kolme-pariisi-20261112.md, osa A (rakennus ↔ rakennusaika).
Lähteet: en-Wikipedia (WebFetch 13.11.2026) ja Lontoon 1873-taulukko (docs/raportit/lontoon-maamerkit-vuosi-1873-20261113.md, V-rivit). Mitään ei ladattu peliin, kuvia ei haettu.
Koodimallit: SK:n luenta esikatselun puusta `proto-3d/Matkakirja-proto-esikatselu/Assets/Matkakirja/Kartta/OhjelmaKohteet.cs` (kohdelista: Albert Memorial, Big Ben, British Museum, Buckingham, Cutty Sark, Kensington, Lontoon Tower, Natural History Museum, Old Royal Naval College, Queen's House, Royal Albert Hall, Royal Observatory, St Paul's, Tower Bridge, Trafalgar Square, Victoria Memorial, Westminster Abbey, Westminster Bridge, Westminsterin palatsi; ei Lontoon silmää). Mallin kunto/tyyli: PK vahvistaa kehyksen puussa.

## A. Rakennus ↔ rakennusaika (3 kolmikkoa)

Lapun muoto, ehdotus kuten Pariisissa: vuosiväli ("1696–1712"), ei pelkkää loppuvuotta. Kolmikot ovat erillisiä: yksikään rakennus ei toistu. Tyyli erottuu katsomalla.

| Kolmikko | Rakennus | Lappu | Tyyli (mistä ikä näkyy) | Lähde | Var. |
|---|---|---|---|---|---|
| 1 | Lontoon Tower | n. 1078–1100 | normannilainen kivilinna, paksut muurit | en-Wikipedia "Tower of London": työ alkoi 1078, valmis viimeistään 1100 | V |
| 1 | Pyhän Paavalin katedraali | 1675–1710 | barokki, kupoli | en-Wikipedia "St Paul's Cathedral": 1675 alku, infolaatikko 1710 (julistettu valmiiksi 25.12.1711) | V |
| 1 | Tower Bridge | 1886–1894 | viktoriaaninen siltatorni, teräsrunko kiven alla | en-Wikipedia "Tower Bridge": työ alkoi 22.4.1886, avattu 30.6.1894 | V |
| 2 | Westminster Abbey | n. 1245–1269 | goottilainen, kaarikoristeet | en-Wikipedia "Westminster Abbey": alku 6.7.1245, nykyinen kirkko vihitty 13.10.1269 (länsitornit 1740-luvulla) | V (lappu ARVIO, ks. huomio 1) |
| 2 | Queen's House | 1616–1635 | palladiolainen, valkoinen, klassinen | en-Wikipedia "Queen's House": 1616 alku, tauko 1618–1629, valmis 1635 | V |
| 2 | Royal Albert Hall | 1867–1871 | punatiilinen pyöreä sali, kupoli | en-Wikipedia "Royal Albert Hall": peruskivi 20.5.1867, avattu 29.3.1871 | V |
| 3 | Old Royal Naval College | 1696–1712 | barokkikaksoiskupolit, symmetrinen | en-Wikipedia "Old Royal Naval College": rakennukset 1696–1712 | V (pelin juttu sanoo 1696–1751, ks. huomio 2) |
| 3 | British Museum | 1823–1852 | uuskreikkalainen pylväsjulkisivu | en-Wikipedia "British Museum": työ alkoi 1823, Smirken suunnitelma valmis 1852 | V |
| 3 | Victoria Memorial | 1906–1924 | valkoinen marmori, kullattu Voitto | en-Wikipedia "Victoria Memorial, London": rakennettu 1906–1924, paljastettu 16.5.1911 | V |

Kolmikko 1: ajanjaksot keskiaika / 1600–1700 / 1800–1900, kaikki kolme koodimallilla; väli (edellisen loppu → seuraavan alku) 575 ja 176 vuotta. Kolmikko 2: väli 347 ja 232 vuotta. Kolmikko 3 on lähimpänä toisiaan (1712 → 1823 → 1906, väli 111 ja 54 vuotta); Pariisin kolmikko 3 (1836 → 1875 → 1969, väli 39 ja 55 vuotta) oli samaa luokkaa ja KK hyväksyi sen.

## Huomiot

1. **Westminster Abbey**: pelin juttu antaa `aika: '1245–1745'` (länsitornit 1745). Se menisi päällekkäin Queen's Housen (1616–1635) kanssa, joten ehdotan lapuksi "n. 1245–1269" (kirkko vihitty 1269; en-Wikipedia: tornit 1740-luvulla ilman tarkkaa vuotta). KK valitsee: joko "n. 1245–1269" tai Abbey pois ja tilalle jokin toinen keskiaikainen (muita keskiaikaisia koodimallilla ei ole).
2. **Old Royal Naval College**: pelin `aika` on 1696–1751, en-Wikipedia sanoo "built between 1696 and 1712" (Painted Hall 1707–1726, kappeli 1789). Lapuksi 1696–1712, ellei KK halua pelin lukua.
3. **St Paul's**: valmistumisvuosi on lähteissä 1708 (huippukivi), 1710 (infolaatikko) ja 1711 (julistettu valmiiksi). Lappu "1675–1710" noudattaa pelin juttua ja infolaatikkoa.
4. **Tower Bridge**: kaikkien kolmen kolmikon sisällä aikakaudet eroavat; Tower Bridge on Tower of Londonin vieressä, joten pari "keskiaika ↔ viktoriaaninen" on myös kartalla helposti nähtävissä.
5. **Mallit**: jos jollain kolmikon rakennuksella ei ole koodimallia kehyksen puussa, korvaaja samalta aikajänteeltä (keskiaika / 1600–1700 / 1800–1900). Varalla: Queen's House ↔ Kensingtonin palatsi (1689; mutta valmistumisväli puuttuu lähteistä), Palace of Westminster 1840–1870 (infolaatikko 1840–1876), Natural History Museum 1873–1881, Elizabeth Tower 1843–1859.
6. **Ei käytetty**: Lontoon silmä (2000) ja Tate Modern (1947–1963 / 2000), koska niillä ei ole koodimallia (Lontoon silmällä ei kohdelistassa; Tate Modern ei 3D-kyltillä). Modernin kolmikon (2000-luku) lisäys vaatisi mallit.
7. Kuvia ei tarvita tässä erässä: kolmikot käyttävät pelin omia 3D-malleja.
