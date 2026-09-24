# Seuraamisvirhe A/B: Pelikoodarin interpolointikorjaus (22.9.2026)

Haara `pelikoodari-syote-interpolointi` (df20f3546, "Osoittimen paikka
kehyksen hetkellä"), todennettu `tools/mittaus/seuraamisvirhe-palvelin.mjs`:llä
(PR #2814, mainissa) omistajan aidoilla vedoilla, samalla koneen tilalla,
peräkkäin: Safari A, Safari B, Chrome A, Chrome B (8 kierrosta/osoite).

- **A (uusi)**: `?lauta=pallo&koe=mittaus` — osoittimen näytteet aikaleimoin
  (`getCoalescedEvents`), kehyksen alun paikka interpoloidaan lineaarisesti
  hetkelle "nyt − viive" (viive = mitattu kehysväli, enintään 1 kehys).
- **B (vanha)**: `?lauta=pallo&koe=mittaus,interpvanha` — v2097:n käytös.

## Tulokset (8 kierroksen keskiarvo per ryhmä)

| ryhmä | p10 ka. (min-max) | p50 ka. | p90 ka. (min-max) | pysähdys-% |
| --- | --- | --- | --- | --- |
| Safari A | 0,13 (0,00-0,33) | 0,83 | 4,08 (1,31-7,68) | 6 % |
| Safari B | 0,06 (0,00-0,26) | 0,75 | 4,69 (0,14-13,08) | 11 % |
| Chrome A | 0,17 (0,00-0,64) | 0,96 | 8,19 (1,14-21,90) | 9 % |
| Chrome B | 0,15 (0,00-0,71) | 1,14 | 8,95 (0,84-20,59) | 10 % |

**PASS/FAIL hyväksymisrajaa vasten (p10 > 0,7 JA p90 < 1,4): KAIKKI 32/32
KIERROSTA FAIL**, sekä A että B, molemmilla selaimilla (täysi lista
`--tarkista`-ajosta alla).

## Tulkinta

A on lievästi B:tä parempi useimmissa mittareissa (pysähdys-% Safarissa 6 %
vs 11 %, p90 molemmilla selaimilla pienempi), mutta ero on PIENI verrattuna
etäisyyteen hyväksymisrajasta — p10 pysyy 0,06-0,17:ssä molemmilla
versioilla, kun raja on 0,7. Tämä täsmää Pelikoodarin oman varoituksen
kanssa (ei nähnyt eroa omalla harnessillaan): korjaus ei tässä mittauksessa
riitä läpäisemään rajaa, vaikka suunta on oikea.

**Alku10-havainto (kaikki neljä ryhmää, sekä A että B):** ensimmäinen
kehys pointerdown-hetkestä on lähes aina pysähdys (camD≈0 vaikka
osoitin on jo liikkunut 4-18 px). Tämä toistuu identtisesti sekä
vanhassa että uudessa polussa — vaikuttaa yhden kehyksen väistämättömältä
käynnistysviiveeltä (kamera ei voi reagoida ennen ensimmäistä rAF:ia
pointerdown'in jälkeen) eikä korjattavalta interpoloinnilla. Muutaman
kehyksen jälkeen (Chrome B kierros 6: suhde vakiintuu 0,98-0,99:ään) osa
kierroksista näyttää hyvän seurannan — ongelma on siis harvempien mutta
suurten poikkeamien (p90 4-22) hallitsemattomuus, ei jatkuva huono seuranta.

**Puuttuva data:** Pelikoodari mainitsi `ui.pallonSyote`-laskurit
(interpolointeja/ekstrapolointeja/viiveMs), joita tämä ajo EI kerännyt —
harnessi ei lukenut niitä. Jos tarkempi syy (kuinka usein ekstrapoloitiin)
tarvitaan, `seuraamisvirhe-palvelin.mjs`:n harnessiin pitäisi lisätä nämä
kentät `laheta()`-kutsuun ja ajaa uudestaan.

## Tarkistusajon täysi tuloste

```
$ node tools/mittaus/seuraamisvirhe-palvelin.mjs --tarkista docs/raportit/data/seuraamisvirhe-interp-20260922.jsonl
32/32 kierrosta EI täytä hyväksymisrajaa (p10 > 0,7, p90 < 1,4).
```

Raakadata: `docs/raportit/data/seuraamisvirhe-interp-20260922.jsonl` (32
riviä: Safari A 1-8, Safari B 9-16, Chrome A 17-24, Chrome B 25-32,
aikaleimoista varmistettu järjestys).
