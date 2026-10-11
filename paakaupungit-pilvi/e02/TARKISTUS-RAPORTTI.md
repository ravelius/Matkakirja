# e02 lukujen, laajuuksien ja kuvatekstien tarkistus (pilvi)

Alku 2026-10-11 01:42 UTC, loppu 2026-10-11 02:55 UTC (date). Agenttiajoja 12 (sonnet; L ×4, K ×4, E ×4), tokeneita yhteensä noin 1,70 milj. Ei Opusta. Koneajo: `tarkistus-kone.txt` (kaupunki kerrallaan, Commons antoi 429 koko erän ajossa).

| kaupunki | lukuja tarkistettu | OK | korjattu | pyöristetty | poistettu | laajuus nimetty | kuvatekstejä korjattu | kuvia vaihdettu | tarkistin virheet/varoitukset |
|---|---|---|---|---|---|---|---|---|---|
| bern | 128 | 67 | 5 | 34 | 22 | 2 | 1 | 0 | 0 / 3 |
| vaduz | 79 | 55 | 1 | 13 | 10 | 16 | 1 | 0 | 0 / 2 |
| sanmarino | 111 | 80 | 7 | 10 | 14 | 14 | 2 | 0 | 0 / 0 |
| reykjavik | 103 | 73 | 11 | 11 | 8 | 17 | 1 | 0 | 0 / 1 |
| monaco | — (vain säärivi) | | | | | | 0 | 0 | 0 / 0 |
| andorralavella | — (vain säärivi) | | | | | | 0 | 0 | 0 / 0 |

Täydet rivikohtaiset muutokset (JSON-polku, ennen → jälkeen, kaksi lähdettä) ovat kaupunkikohtaisissa `luvut.md`- ja `kuvatekstit.md`-tiedostoissa; ne on sovellettu sisalto.json:iin sellaisenaan.

## Muutokset kaupungeittain (olennaisimmat)
- **bern**: Totentanz-ikkunan tekijä (Manuelin 1516–1519 on seinämaalaus, ei ikkuna); kupolin korkeus "noin 60 m" (de-Wikipedia, 64 m ei vahvistunut); sivualttareita 43 → 25 (de); aseman matkustajaluku ja laajennuksen valmistuminen 2029 → 2031; Bundesplatzin laatat Valser Gneis, ei graniittia; asukasluku nimetty kunnan luvuksi (146 867 Statistik Stadt Bern, de-Wikipedia 138 562 kapeammalla määritelmällä); Liittopalatsin kuvateksti kertoo ulkokupolista (ei mosaiikista).
- **vaduz**: katedraalin rakennusvuosi 1874 → 1869–1873 (de-Wikipedia, HLS; 1874 oli kappelin purku); "keskiaikaisten perustusten päälle" → "vanhan kappelin viereen"; asukasluku noin 6 100 (Vaduzin kunta); Rein-raja noin 27 km; poistettu Goethe 1788, Hohenems 1637, Florinus, seremonia 12.12.1997, kaksi muuta; museon perustaminen "1800-luvun lopulla"; kansikuva 3 -teksti ei väitä jokea näkyviin.
- **sanmarino**: Borgian miehitys (isän kuolemaan asti, ei "kuusi kuukautta"); Marinuksen saapuminen 200-luvulla; Monte Titano 739 m; Rimini → Adrianmeren rannikko noin 10–13 km; poistettu Cestan "yli 1 550 asetta", Montale 1278, Guaita 1481, Garibaldin "250 seuraajaa", "tarkistus 1872", bussilinjat; kahden kuvan selite korjattu (Cassarini, c1855-piirros). Yksi lyhentynyt nosto täydennettiin kahdella lähteistetyllä faktapohjan lauseella (Anita Garibaldi, Lincoln).
- **reykjavik**: aurinko ei laske yli *kuutta* astetta 20.5.–24.7. (ei viittä, 3 kohtaa); kauppa vapautui 1850-luvun puolivälissä; Perlanin säiliö noin 4 milj. l; Hallgrímskirkjan 29 kelloa = kellopeli; Dómkirkja vihitty 1796; Harpan rahoituspäätös 2009; Perlan-selite korjattu; lukijan tekstistä poistettu lähdemaininta ("Hagstofa Íslands"); ilmastolause "yli 20 asteen" → "ylin lämpötila keskimäärin 13–15 astetta" (saatiedot).
- **monaco**: säärivi täsmää saa.json:iin; poistettu lause "yli 30 asteen helteet ovat harvinaisia jatkuvan merituulen vuoksi" (30 ei ole saatiedoissa, syy–seuraus päättelyä). Muut tekstit Sisältökirjurin korjaamat, ei muutoksia.
- **andorralavella**: säärivi ja ilmastoluvut täsmäävät, ei muutoksia.

## Korjaamatta jätetyt varoitukset
- bern intro 1124 mrk (tavoite ≤1100); teemasivu kuvataide nosto 2 (354 mrk) ja 3 (436 mrk) alle 440: poistetut, lähteettömät luvut lyhensivät tekstejä; pidentäminen vaatisi uutta lähteistettyä sisältöä eikä kuulunut tarkistukseen. Alle 350 olisi virhe; 354 ei ole.
- vaduz historia nosto 2 (419 mrk, alle 440) sama syy; kohteita 5 (pohjataso 6): perustelu jo TILANNE.md:ssä (lähteissä vain 5 koordinaatilla).
- reykjavik Perlan-nähtävyys "pyöreä suuruusluokka": "noin neljä miljoonaa litraa / noin 4 000 m³" perustuu perlan.is-lähteeseen ja luvut.md:n korvaukseen; toista lähdettä ei ole.

## Heikot kohdat
- bern: karhu sinetissä 1220-luvulta (toinen lähde heikko, 1224); "alle kaksi tuntia junalla" yleistietoa; Liittopalatsilla ei en-koordinaattia.
- sanmarino: UNESCO- ja statistica.sm-sivut eivät avautuneet; asukasluku 4 158 citypopulation.de:stä; köysiradan "alle 200 m" ja "15 min välein" nojaavat saman wikiperheen artikkeleihin; "lunta yli 400–500 m" vain en-Wikipediassa (ilmastoluku-ulkoinen, ei muutettu).
- vaduz/reykjavik: asukasluvun toinen lähde johdettu samasta tilastosta.

## Avoimet kysymykset Päätoimittajalle
1. Reykjavik: auringonpaistetunnit "noin 1 400" vs. en-Wikipedian proosa "noin 1 300" (taulukossa 1 368); jätetty ennalleen.
2. Bernin ja Vaduzin lyhyet teemasivunostot (alle 440 mrk): halutaanko pidentää uudella lähteistetyllä sisällöllä?
3. Bern: valokuva-kuvan fotokromissa on pieni painettu otsikkoteksti alareunassa (kuvat.md jättää Päätoimittajalle).
4. Bern "Karhu sinetissä 1220-luvulta": hyväksytäänkö heikko toinen lähde vai muutetaan "1200-luvulla"?
5. Vaduz kansikuva 2 (Vaduz Liechtenstein 13.jpg): kuvassa pääosin lasinen kauppatalo, linna vain pieni; jätetty, vaihdetaanko?
