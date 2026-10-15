# ISS-yötaivas: skannerin taivaskohteet ja Pulun kesäyölause (Sisältökirjuri 15.10.2026)

Pyyntö: proto-3d/_tyo/linssiseppa/yotaivas-tekstipyynto-20261015.md (omistajan päätös 18.10; PT 15.10.). Koodi: proto linssiseppa/yotaivas-196, TaivasKohteet.cs.

## A. Skannerin taivaskohteet (20 kpl)
- `docs/kohtaukset/iss-yotaivas/taivas-faktat.json` → kopioi avaimet kohtaan IssSkanneri/faktat.json "faktat" (`taivas-<tunnus>`, ≤ 60 merkkiä).
- `docs/kohtaukset/iss-yotaivas/taivas-data.json` → IssSkanneri/data.json "rivit" (2–4 riviä, arvo ≤ 24 merkkiä). Kuulle ja planeetoille ETÄISYYS = "laskettu". Tuhaterotin on tavallinen väli kuten nykyisessä data.json:ssa.
- Tunnukset: kuu, merkurius, venus, mars, jupiter, saturnus, sirius, pohjantahti, vega, arcturus, betelgeuze, capella, otava, orion, kalevanmiekka, seulaset, linnunrata, andromeda, orioninsumu, magellan.
- Tarkistus: kirjoittaja-Sonnet (taivas-lahteet-kirjoittaja.md) + riippumaton Sonnet-tarkistaja, joka ei lukenut kirjoittajan lähteitä (taivas-tarkistus.json): 89 OK, 7 korjausta (kaikki tehty), 0 poistoa.
- Korjaukset tarkistuksen jälkeen: Venus PYÖRÄHDYS 243 vrk (ei "päivän pituus"); Betelgeuze himmeni talvella 2019–2020, etäisyys n. 550–700 vv; Orion PÄÄTÄHTIÄ 7; Kalevanmiekka-kortilla OSANA Väinämöisen viikate; Orionin sumu "lähin massiivisten tähtien syntyalue".

### Kansanomaiset nimet (päätökset)
- Vahvistuneet kahdesta suomalaisesta lähteestä: Kointähti/Iltatähti (Venus), Pohjannaula (Pohjantähti), Seitsentähtinen ja Patoverkko (Otava), Kalevan miekka (Orionin vyö), Väinämöisen viikate (laajempi kuvio, vyö on sen osa), Seulaset, Tie Lintukotoon (Linnunrata; molemmat lähteet fi-Wikipediaa, heikompi).
- **Taivaannaula EI vahvistunut** kummastakaan lähteestä → korttiin on Pohjannaula. KK:n ehdotus ei kelpaa sellaisenaan.
- **Kalevanmiekka-tunnus** tarkoittaa suomalaisten lähteiden mukaan Orionin vyötä (kolme tähteä), ei miekka-aluetta. Miekka-alue = Orionin sumu (oma kohde `orioninsumu`). Jos halutaan miekka-alue, tunnus `kalevanmiekka` pitäisi osoittaa sumun suuntaan; kerro Sisältökirjurille.
- Sirius-kansannimet (Koirantähti, Kalevan tähti) vain yhdessä lähteessä → pois.
- Seulaset-nimen selitys "seulan reiät" on kansanomainen tulkinta; kortilla vain lause "nimetty seulan pohjan reikien mukaan" (tarkistaja OK, muotoilu voi pehmentyä "kansan mukaan" jos tilaa).

### Lukuvalinnat (lähteiden hajonta)
Betelgeuze 550–700 vv, Orionin sumu 1 300–1 500 vv (KK:n 1 340 ei löytynyt lähteestä), Suuri Magellanin pilvi n. 160 000 vv (NASA, en.wikipedia; fi-wikipedian 179 000 vanhentunut), Seulaset n. 440 vv, Pohjantähti n. 430 vv. Jätetty pois ristiriitaisina: Kuun muutamat arvot, Andromedan koko ja törmäysaika, Vegan pyörimisaika, Olympus Mons.

### Kuvat (11, Hubble/ESO/NASA)
Vientikansio Julkaisijalle ja Linssisepälle: `proto-3d/_valmiit/iss-yotaivas-kuvat-vienti-20261015/` (kuvat/<hash>.jpg, taivas-kuvat.json, LAHTEET.md, SHA256SUMS). Kohteet: linnunrata, andromeda (vaihdettu 15.10. CC0-kuvaan, koska heic0512d:n PD-merkintä oli epävarma: © R. Gendler), orioninsumu, magellan, seulaset, orion, betelgeuze, kuu, jupiter, saturnus, mars. Lisenssit PD / CC0 / CC BY 4.0 (ESO: tekijä mainittava). Heikot: orion (kapea kaista antennien yllä), kuu (koottu visualisaatio), mars (rakeinen). Pohjantähdelle, Siriukselle, Vegalle, Arcturukselle, Capellalle, Otavalle, Merkurius ja Venus ei kuvaa (ohje).

## B. Pulun kesäyön opetuslause
Äänisivun Tekstit → Odottaa hyväksyntääsi, osio "Pulu: kesäyön opetuslause" (tunnukset `pulu-kesayo-opetus`, valinnainen `pulu-kesayo-maapallo`; tekstit aanisivu-sivusto/tekstit/). Ei ääntä ennen omistajan hyväksyntää.

> Suomen yllä kesäyö ei ole pimeä: aurinko ei painu horisontin alle tarpeeksi syvälle, joten asema pysyy auringonpaisteessa eikä tähtiä näy. Varjoon asema pääsee vasta, kun aurinko on maasta katsoen noin 20 astetta horisontin alla. Tähdet näkyvät Suomen yllä syksystä kevääseen.

> Asemalta katsottuna maapallo peittää noin kolmanneksen taivaasta, kun maasta horisontti peittää puolet.

Faktat (riippumaton tarkistus OK): keskiyön Aurinko Helsingissä −6,4° kesäpäivänseisauksena, −10…−11° heinäkuun lopussa; aseman (420 km) varjoraja 20,3°; Maa peittää 32,7 % taivaasta; astronominen yö Helsingissä noin 22.–23.8.–20.–21.4.
