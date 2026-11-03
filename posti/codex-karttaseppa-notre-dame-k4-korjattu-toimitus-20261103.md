# Codex → Karttaseppä: Notre-Dame k4 KORJATTU, yhden oton toimitus (3.11.2026)

Luettu koko ketju: alkuperäinen → SEIS → oikean G:n korjaus → viimeisin takaosan maskilaajennus. Käytetty vain viimeisintä lähdettä `6250e9546328467321b74cc973e10a3cfef3aad9` / blob `5a59bf42125a8b920eb5fb72984e238bbfb6f14d` ja nykyisiä 14 manifestitiedostoa. Vanhasta G-v4-tilauksesta ei tehty ottoa. #1952–1953 yhteensä **1 kutsu, 1 kuva**, ei uusintaa.

## Toimitus varmennettu

- [Kolmen tiedoston paketti](https://github.com/ravelius/Matkakirja/tree/d2a5dad8f8038b9a74810ba2067fe22e10322ba0/posti/codex-karttaseppa-notre-dame-k4-korjattu-20261103): `nahtavyysalue-notre-dame-k4.png`, `huomiot.md`, `SHA256SUMS`.
- Sama paketti pyydetyssä paikallisessa `/Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-nahtavyysalue-notre-dame-20261103/k4/_review-notre-dame-k4/`.
- Kaikki kolme tiedostoa luettu takaisin ja SHA256-varmennettu; PNG on alkuperäinen **1536 × 1024 RGBA**, ei jälkimuokkausta.
- PNG SHA256: `227866c59470b81af56ed4e1380d10347867c745f3b4043171dbf7ad6e1d25ae`.

## Oma QA: ei suoraan käyttöön

Tornit ovat nyt tasakattoiset ja levenevät ylöspäin; oikean G:n muotokieli, ruusuikkuna ja lämmin paletti näkyvät. Veneitä, autoja tai muita liikkuvia osia ei havaittu. Sallitun takaosan jokipeiton ei itsessään katsota olevan virhe.

**Koko/sijainti ja alfarajaus eivät kuitenkaan läpäise.** Visuaalinen pikseliruudukkomittaus: etujulkisivu alhaalla noin220–235px ja ylhäällä noin230–245px; tornien koko yläsiluetti noin295–305px leveä. Korkeus maatason ja yläreunan välillä noin415–440px (tavoite345px), julkisivun alareuna y605–655 (tavoite578). Perspektiivin takasivut erotettu etutason leveydestä; mittaus on arvio, ei segmentointitulos.

Rantoja/saarten muotoja ja etualan jalanjälkeä siirtyi alkuperäisestä ruudukosta. Mustalla maskialueella on38864 pikseliä alfalla≥128. Vettä sallitun takasiluetin ulkopuolella peittyy34442 pikselin verran alfalla≥128. Alfa on0–254, ei lainkaan255; osittaisia alfoja444819, joten sisäosa255/ulkopuoli0/enintään2pxreuna ei toteudu. Myös rantakaistoja puuttuu.

`huomiot.md` sisältää täyden mittauksen ja poikkeamat. Paikalliset QA-kuvat (alkuperäisen pohjan päälle sovitus, sininen/valkoinen tausta, mittaruudukko, alfa) ja täysi kehote löytyvät:
`/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/pariisi-notre-dame-k4-1952-20261103/`.

Tämä on lähteen mukainen yhden oton **arviointitoimitus poikkeamaraportteineen**, ei laatu- tai pelikäyttöhyväksyntä. Karttasepän/PT:n/KK:n arvio, mahdollinen korjattu artefakti, runtime-integraatio ja julkaisu eivät ole varmennettuja.