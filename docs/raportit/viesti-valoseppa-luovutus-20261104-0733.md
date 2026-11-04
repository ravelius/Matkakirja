# Valosepän luovutus 4.11.2026 klo 07.33

Syy: konteksti 30 % (pehmeä raja, Raamattu 7.37). Edellinen: viesti-valoseppa-luovutus-20261104-0654.md (lue Opit ja Työkalut; sen kohta 1 odottaa, kohta 2 tehty, kohta 3 osin tehty). Loki: /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md. Tulokset _tyo/linssiseppa2/pariisi-tyyli/: k45/TULOS.md, k45/yhd5/TULOS.md, k44/TULOS.md.

## Tila (haarat natiivi-backup, wt /Users/Shared/Claude/wt/proto-linssiseppa2-k30, nyt haarassa pariisi-k45-koe, puhdas; ei junaan)
- **k44 e97f26bcc** (pariisi-k44, p44): seuraavan yhdistelmän VS-osa, ei hyväksytty pinta. Yhdistelmä vain PT:n käskystä.
- **k45 3df4b748d** (pariisi-k45-koe, k44:n päällä, p45, 617/617, pushattu natiivi-backupiin; ei yhdistelmään ilman käskyä): KK 06.24/7. Kapeat kävelyalueet pois aukioista (2A/P < 8 m, 139/589, 7,2 % alasta), puiston reuna liukuva z16–17 (ElavaMaski.Liukuva, sigma 4 m), aukiolle kiveys ja reuna z16–17 (AukionPinta, väliaikainen koodilla tehty). PT:lle lähetetty 07.1x, kuittausta ei vielä. Kermalaikut EIVÄT poistuneet; oikea pinta olisi Codexin aukioarkki KS:n kautta, jos KK haluaa. Kulu ilman luotettavaa lukua (kuorma 30), mitattava laitteelta.
- **yhd5 8dee95d57** katsottu ja rivi PT:lle 07.32, k45/yhd5/TULOS.md. Suoria saumoja ei katsotuissa kuvissa; rivi 168 ei todistettu tällä ajolla. Katsomatta y-eiffel, ecole-lahi; osa vain puolikkaana (lista TULOS.md:ssä).
- **Uusi löydös, syy mittaamatta:** sumeat suorakulmaiset lohkot ruudun reunoilla z16-zoomissa (jussieu-z16 neljä kulmaa, z16-sentier kulma + vasen reuna; ei austerlitz, pitie, ecole). Näyttää vaihtumattomalta z ≤ 15:n palalta 60 s:n odotuksen jälkeen. PT:llä; ei omistajaa nimetty. Paluulla vain nimet eroavat (KS).
- yhd6 e721d219e JU:n ketjussa, tulos menee PT:lle.

## Seuraavaksi
1. **Kun PT käskee: yhdistelmä k44:n (tai k45:n, PT päättää) päälle, laitteelta kuva KK:lle ennen hyväksyntää, muisti ja vieritys.** k41:n ehto: muistihuippu vähintään 300 Mt rajan alla, ruutuaika ei huonone reunalla; muuten reuna 1 200 / 450 m. Kuvat 0,13, 0,08, 0,05 täysikoossa. z14 | z15 zoomisarjasta. Mukaan: onko reunan sumea lohko yhä, ja k45:n kulu.
2. **Pienet kohdat jäljellä:** talo katkeaa kadun reunaan, arkki kaupunginosittain, z17:n Seinen rantaporras, saaren kärki z15|z16. Vaaleat porrasreunaiset rakennukset (k45/yhd5/TULOS.md kohta 5): tarkista laiteajosta, koska k44:ssä z16 tulee arkista. Poistuvien katujen nimet ja liikkuvat: KS.
3. **Vyön puistot:** läikän korjaus näyttää muut rajan ulkopuoliset puistot tavallisena karttana (Mont-Valérien): katso laitteelta.
4. Vanhat: joki Pariisin jälkeen; k32 sora; raiteet z ≤ 14; kadut hieman keltaiset (yhd2/15).

## Opit
- Kohde pikselistä: k45/kohde.py (MVT-kohteet z17-kuvan pisteessä), k45/leveys.py (kävelyalueiden 2A/P). Kaksoisviivat, suorakulmio ja kermalaikut olivat kaikki transportation/pedestrian-monikulmioita.
- Yksi reunan sumean lohkon haku ei toiminut automaattisesti (k45/yhd5/lohkot.py löytää myös veden ja puut); katso kulmat kuvasta (kulmat-z16.jpg).
- Paikallisten ajojen ms/pala ei kelpaa vertailuun, kun koneen kuorma on 30: sama koodi 159 ja 340.
- Etäpää on natiivi-backup, ei origin.

## Työkalut
Kuten edellisessä; k38/aja.zsh <wt> <ulos> <z> <alue> (k44:n ja k45:n arkki tulee työpuun pinnoista). Parit k45/parit.py. Testit: sh Kartta-testit/kaanna.sh (617) tai osa nimestä.
