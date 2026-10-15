# Codex → Fable/PT: Petřín #272–#273 — 10 mallikierrosta täynnä, paras M09 ja viimeisin M10 palautteelle

K5-maskin v2 hyväksyntä on kirjattu erilleen mallihyväksynnästä. M01 säilyy hyväksyttynä välivaiheena. Jatkoin M02:sta lähteen `d76d2504ef01584adf5ed6fd7a8b820c77df3840` mukaisesti; **10 kokonaiskierroksen raja on nyt täynnä (M01 mukaan lukien). Pysähdyin, M11:tä ei ole aloitettu.**

Toimitan [parhaan M09-version vertailun](petrin-malliluuppi-273/M09/qa/petrin-M09-comparison-sheet.png) ja [todellisen mallin](petrin-malliluuppi-273/M09/petrin-M09.blend), lisäksi [viimeisimmän M10-vertailun](petrin-malliluuppi-273/M10/qa/petrin-M10-comparison-sheet.png) ja [mallin](petrin-malliluuppi-273/M10/petrin-M10.blend). Kummallakin on viisi natiivia renderiä ja tarkat kamerat sekä geometria-/maski-/SHA-näytöt omissa kansioissaan.

| Versio | K1 (85 %) | K2 (90 %) | K3 (90 %) | K4 (90 %) | K5 (90 %) | Keskiarvo |
|---|---:|---:|---:|---:|---:|---:|
| M01 | 69,41 | 88,01 | 86,87 | 87,44 | 71,57 | 80,66 |
| M09 | 83,63 | 91,55 | 89,13 | 89,36 | 86,25 | 87,98 |
| M10 | 83,77 | 91,87 | 89,23 | 89,50 | 86,21 | 88,11 |

**Vain K2 läpäisee; koko malli ei ole lopullinen eikä hyväksytty.** M09 on paras ennalta kirjatulla kriteerillä, joka maksimoi heikoimman raja-arvoon suhteutetun IoU:n. M10:n keskiarvo on suurempi ja K5 vain 0,040 prosenttiyksikköä M09:ää pienempi; siksi molemmat ovat mukana.

[Kierrosloki](petrin-malliluuppi-273/loop-journal.json), [täysi raportti ja kameramuutokset](petrin-malliluuppi-273/README-FI.md), [erillinen loppuarvio](petrin-malliluuppi-273/final-independent-review.json), [50 natiivinäkymän numeerinen uusintatarkistus](petrin-malliluuppi-273/final-numerical-verification.json), [tavutiedot](petrin-malliluuppi-273/delivery-packet.json). M02–M08:n mallit, kamerat, luvut ja vertailuarkit ovat `history/`-kansiossa. M01 ja vanhat tavoitekuvat/maskit ovat ennallaan.

Jalat/halli kapenivat, näkyvä vaalea kiekko poistui, mastoa lyhennettiin epävarman korkeusarvion puitteissa, ristikkoa ja kierreportaita sekä hallin aukkoja/kaaria tarkennettiin ja yläkopin vaaleaa vyötä pienennettiin. Kamerasovitus ja geometriamuutokset on erotettu lokissa. **58,7/20/51 m sitovat korkeudet säilyvät kaikissa kymmenessä tallennetusta mallista tarkastetussa versiossa.** Generoitujen tavoitteiden tasannevirheitä ei kopioitu niihin.

Jäljellä: alatasanteen kuvatason paikka ja tuenta, jalkojen/kaarten liitokset, yläkopin panelointi/masto, joissain pinnoissa vihertävä valaistus ja K5-jalustan ääriviiva. Sitova materiaali-ΔE pysyy `null`; raportin pikselisävyero on diagnostiikkaa. K5:n maapiste on arvio ja K4:n pohjoisdetaljit varmentamaton rekonstruktio.

Uusia AI-kuvia 0. Ei R2-vientiä, peli-integraatiota, main-yhdistämistä tai julkaisua. Pekingin/Pulun aineistoon ei koskettu. **Odotan PT:n palautetta tämän rajatun luupin jälkeen.**
