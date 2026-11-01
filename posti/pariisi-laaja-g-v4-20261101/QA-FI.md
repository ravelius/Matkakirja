# Pariisin laaja G v4 — QA 1.11.2026

Lähde 9b2bd8ea7451e7d4d502147dc7244f8cdc8d473a, tilaus 1589. Valittu otto 7 kahdeksasta kokonaan uudesta ImageGen-generoinnista. Kaikki alkuperäiset ja hylätyt otot säilyvät. Natiivi 1536 × 1024 RGB PNG kopioitu tavumuuttumattomana: ei skaalausta, rajausta, värikorjausta tai paikkauksia lopulliseen kuvaan. Viivainkuvat ovat erillistä mittausaineistoa.

## Toimitus arvioon, mitat eivät ole kaikki täsmälleen tavoitteessa

Louvre on nyt pitkä palatsi: pohjoissiipi ja matala joenpuoleinen galleria ympäröivät pyramidipihaa pohjoisrannalla. Cité ja pieni Sainte-Chapelle säilyvät erillisinä. Kaupungin ääriviiva, Seinen pääreitti, sillat ja maamerkkien sijainnit seuraavat v3:a silmämääräisesti. Kuvassa ei ole näkyviä tekstejä, lintuja, lentokoneita tai valkoista suorakulmakehystä. Tavalliset korttelit ovat pieniä ja pääkohteet korostettuja.

| Kohde | Tavoite px | Mitattu noin px |
| --- | ---: | ---: |
| Louvre | 72 | 81 ± 4 |
| Eiffel-base | 42 | 43 ± 3 |
| Pantheon-building | 37 | 34 ± 3 |
| Arc-de-Triomphe | 15 | 20 ± 2 |

Louvren koko lasketaan palatsin rakennuksista ja siivistä, EI Rivolin talorivistä tai puutarhasta. Noin 81 px on tällä siluettirajauksella tavoitetta 72 px suurempi; myös itäpää ulottuu noin 767:ään lähteen 756:n sijaan. Riemukaari jää noin 20 px levyiseksi tavoitteen 15 px sijaan. Näitä eroja ei kirjata täsmämittojen hyväksynnäksi. Eiffel ja Panthéon ovat tavoitteen tuntumassa. Käsin luetun siluetin arvio on muutaman pikselin epävarma; myös varjot, peittyminen ja perspektiivi vaikeuttavat rajan tulkintaa. Karttasepän rajaus ja zoomvertailu tarvitaan lopulliseen arvioon.

## Vesi

V3:sta poimitun ja reunoilta kavennetun vesimaskin samoista kohdista mitattu v4-otanta: mediaani RGB (101, 176, 190). Tavoite (100, 170, 185). Samassa otannassa v3 oli RGB (14, 188, 239). Menetelmä on sama ennen/jälkeen, mutta EI sama alue/maski kuin Karttasepän v3-arvo (27, 172, 214); luvut eivät ole suoraan sen kanssa vertailukelpoisia. Vesi on nyt selvästi hillittyä sinivihreää. Pieni ero tavoitteen kanava-arvoihin säilyy.

## Valinta ja rajaukset

Ensimmäinen otto siirsi/korvasi saaren rakennuksia. Toinen oli hyvä kohdistuspohja. Otot 3–6 täydensivät palatsia mutta peittivät kappelin tai siirsivät rakennuksia; niitä ei toimiteta. Seitsemäs yhdisti kaksi palatsisiipeä ja säilytti kappelin. Kahdeksas kokeili Riemukaaren pienennystä mutta ei parantanut kokonaisvastaavuutta. Tarkkaa pikseli-identtistä rekisteröintiä tai kaikkien kohteiden identtisiä siluetteja ei väitetä.

Välitason erää 1586–1587 ei uusittu. Aiempi 370 px Louvre-mittaukseni oli virheellinen: Karttaseppä rajasi oikean palatsin x 1050–1300 eli noin 250 px. Virheeseen sisältyivät Rivolin talot. Oikaisu on mukana paketissa; alkuperäiset toimitustavut ja historia säilyvät.

Toimitus on Karttasepän G-paria, mittataulukkoa ja laajan ja välitason zoomvertailua varten. Vastaanottajan/omistajan hyväksyntä, runtime-integraatio ja julkaisu ovat erillisiä, vielä varmentamattomia tiloja. Vain claude/postilaatikko.
