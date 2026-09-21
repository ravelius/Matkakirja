# Kartuscha-erä B: BIH/UKR/RUS/ISL — yhteenveto (2026-09-21)

Fablen tilaus, sama resepti kuin 20.-21.9. BGR/EST/ROU/LTU/LVA-erä
(`git show fcb1504c`). Neljä maata ketjutettiin peräkkäin (ei
rinnakkain) origin/v1973-prep-kärjestä, koska kaikki muokkaavat samaa
tiedostoa `js/packs/maa-kategoriat.js` — mergevaroitus (counts-
laskurit) ei koske tätä erää, koska jokainen maa on oma avaimensa
samassa objektissa eikä jaettu laskuri.

| maa | haara | commit | uudet aiheet | nostoja | aiheet+menovinkit yhteensä |
|---|---|---|---|---:|---:|
| BIH | sisalto-kartuscha-bih | 1ae02cb3 (origin/main) | historia, ruoka, kulttuuri | 13 | 5 |
| UKR | sisalto-kartuscha-ukr | a6dcba7c | historia, kulttuuri | 9 | 5 |
| RUS | sisalto-kartuscha-rus | cd43ea4b5 | historia, ruoka | 8 | 5 |
| ISL | sisalto-kartuscha-isl | 32a4456f8 | historia | 5 | 5 |

Kaikki neljä maata ovat nyt samassa 5-aiheen mitassa (4 sisältöaihetta
+ menovinkit) kuin muut "täydessä mitassa" olevat Euroopan maat.

Testit jokaisessa haarassa erikseen: `node --test tests/*.test.mjs`
0 fail (BIH 3837, UKR 3780, RUS 3780, ISL 3780 pass — nostot-suhteessa
kunkin oman haaran mukaiset erot johtuvat siitä, missä vaiheessa
v1973-prep oli kun haara luotiin, ei virheistä). `tools/tarkista-
kaksoisavaimet.mjs` puhdas kaikissa.

## Sisältöhavaintoja

- Jokainen agentti tarkisti ensin olemassa olevan sisällön
  (fokuskohteet-<iso>.js, hahmotelma-<iso>.js, kaupunkilehdet) eikä
  toistanut samoja kohteita/faktoja uusissa maalehden nostoissa.
- RUS ja UKR valitsivat tietoisesti eri ruoka-aiheita (RUS ei käyttänyt
  borssia, koska UKR:n ruoka-aihe kattaa sen).
- UKR jätti pois vahvistamattoman "kobzari-kongressin joukkoteloitus"
  -legendan bandura-nostosta, koska historioitsijat pitävät sitä
  suurelta osin vahvistamattomana — vain dokumentoidut vainot mainittu.
- ISL:n Perustuslaki 1874 -nosto on suora 1873-kytkös isoisän matkaan
  (Kristian IX:n tuhatvuotisjuhla, sama vuosi kuin isoisän aikakausi).

## Avoin: BIH-haaran pohja

BIH-agentti epäili kesken työn välitettyä ohjetta vaihtaa pohjaksi
v1973-prep ja piti alkuperäisen origin/main-pohjan — Fable hyväksyi
tämän jälkikäteen ("main-pohjainen haara kelpaa... Julkaisija
rebasettaa tarvittaessa"). UKR/RUS/ISL ovat kaikki suoraan
origin/v1973-prep-pohjaisia.

## Merge-jono Julkaisijalle

Neljä itsenäistä haaraa, ei rinnakkaisia counts-konflikteja
odotettavissa (eri avaimet samassa objektissa). Suositus: mergetä
missä tahansa järjestyksessä, testata yhdistetty haara lopuksi.
