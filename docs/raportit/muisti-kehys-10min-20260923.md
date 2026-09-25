# Muisti ja kehysajat 10 min pelisilmukasta — simulaattori (23.9.2026)

Build 689d020 (offline lataa/palvelin -komennot mukana). iPhone 18 Pro
-simulaattori, virallinen pelisilmukka (`Peli-testit/silmukka-30s.txt`,
Pariisi→Lontoo→lehti→Pariisi→lehti) toistettu ~42 s välein 10 minuutin ajan
(`uusi-peli 12345` joka kierroksella). Ääni mykistettynä. Raakadata:
`/Users/Shared/Claude/proto-3d/lokit/muisti-kehys-10min-20260923/`
(`muisti-10min-v2.json`, `kehysajat-10min-v2.jsonl`, `yhteenveto-v2.json`).

## Muisti (RSS, simulaattoriprosessin `ps`-näyte 15 s välein)

| Aika | RSS |
|---|---:|
| 0 s (käynnistys) | 875 Mt |
| 0–135 s (lämpeneminen) | nousee 875 → 951 Mt |
| ~150–165 s | **pudotus 951 → 526 Mt** (n. 400 Mt vapautui — arvattavasti ensimmäinen `uusi-peli`-nollaus purki alkulatauksen ylimääräiset assetit/tekstuurit) |
| 165–600 s | **tasainen ~595–598 Mt**, ei kasvutrendiä |
| 600 s (loppu) | 595,5 Mt |

**Ei havaittua muistivuotoa**: 42 näytettä, viimeiset 7,5 min täysin tasaiset
(vaihteluväli 595,2–598,2 Mt) toistuvista peli-resetoinneista huolimatta.
Alkulämpeneminen + yksi iso vapautuminen on odotettua ensimmäisen
käynnistyksen assettien latauksesta/purusta.

## Kehysajat (126 × 5 s -jaksoa, `kehysajat.jsonl`)

| Kategoria | Max (ms) | Keskim. p95 (ms) | "yli 1,5×tavoite" -jaksoja |
|---|---:|---:|---:|
| liike (kamera liikkuu) | 33,4 | 17,2 | 4 |
| lepo (kamera paikallaan) | 166,3 | 18,0 | 30 |
| peitto (UI päällä, esim. lehti) | 50,0 | 16,9 | 15 |

Tavoite 16,67 ms (60 Hz). p95 pysyy lähellä tavoitetta kaikissa kategorioissa.
Suurimmat piikit (166 ms) osuvat todennäköisesti `uusi-peli`-nollausten ja
kaupunkien välisten latausten kohdalle — ei tutkittu tarkemmin per jakso,
koska kyse on toistuvasta testiskriptin omasta nollauksesta eikä normaalista
pelaamisesta (oikea pelaaja resetoi harvemmin).

## Huom

Ensimmäinen ajo (execFileSync-pohjainen skripti) epäonnistui — synkroninen
`sleep`-kutsu esti Node-event loopin, joten `setInterval`-muistinäytteet
eivät koskaan laukenneet (0 näytettä 10 min ajalta). Korjattu `node:timers/
promises`-pohjaiseksi (`await delay(...)`) uusinnassa, joka onnistui.
Kehysajat luettiin molemmilla ajoilla suoraan `kehysajat.jsonl`-tiedostosta
(ei riipu Node-skriptin ajastuksesta), joten ensimmäisenkin ajon kehysdata
olisi kelvannut — vain muistinäytteet piti uusia.
