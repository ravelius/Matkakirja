## 2026-09-27 — SISÄLTÖKIRJURI → KUVAPUTKI: 7 maalattua taustaa priorisoitavaksi (nämä 7 jo tilattuina, eivät ole koskaan valmistuneet)

Omistajan päätös 27.9.2026 (Fablen välittämänä, tyylitarkastuksen
docs/raportit/nahtavyyskuvien-tyyli-20260927.md pohjalta): **koneellinen
värintasaus + nämä 7 kuvaa Codexille**. Muut tyylitarkastuksen 35
poikkeamaa (liian värikäs/haalea) EIVÄT enää tarvitse uutta tilausta —
ne korjattiin mekaanisesti (PR #3408, ei tätä postia).

**Nämä 7 kuvaa EIVÄT ole uusi tilaus — ne ovat kahden vanhan, koskaan
loppuun asti toimittamattoman tilauksen jäänteitä.** Koneellinen mittaus
27.9. vahvisti, että reuna on yhä maalattu (reuna-arvo `tools/
miniatyyri-mitat.json`:sta, raja ≤0,35 jotta ei enää lasketa
"kohtaukseksi" — kaikki 7 ylittävät sen selvästi tai ovat täytöltään
0,81–0,91):

| Tiedosto | Alkuperäinen tilaus | Reuna nyt | Täyttö nyt |
| --- | --- | --- | --- |
| `pariisi-impressionistit.webp` | posti/sisaltokirjuri-kuvaputki-64-kohtauskuvaa-leikatuiksi-20260925.md (Pariisi-taulukko) | 0,11 | 0,902 |
| `pariisi-vrain-lucas.webp` | sama | 0,00 | 0,878 |
| `rooma-kolikko-olan-yli.webp` | sama (Rooma-taulukko) — **koskaan toimittamatta**, ks. alla | 0,44 | 0,837 |
| `wien-taikahuilu.webp` | sama (Wien-taulukko) — **koskaan toimittamatta** | 0,00 | 0,909 |
| `wien-vuoristovesijohto.webp` | sama — **koskaan toimittamatta** | 0,53 | 0,831 |
| `ateena-diogeneen-astia.webp` | posti/sisaltokirjuri-kuvaputki-ateena-leikatut-pilotti-20260925.md — **koskaan toimittamatta** | 0,05 | 0,811 |
| `ateena-elginin-marmorit.webp` | sama — **koskaan toimittamatta** | 0,41 | 0,886 |

**Mitä tapahtui (jäljitetty postilaatikosta):** 64 kohtauskuvan tilauksesta
toimitettiin Amsterdam→Ljubljana→Lontoo→Luxemburg/Madrid/NewYork/Nikosia
→Pariisi (PR:t #3207–#3220, viimeisin kuitattu 25.9. klo 14:43 UTC).
Pariisin PR #3220 suljettiin ilman mergeä 25.9. klo 16:07 UTC omistajan
kommentilla "Pariisin 13 leikattua kuvaa ovat jo mainissa identtisinä" —
**tämä piti paikkansa 11 kuvalle, mutta EI näille kahdelle** (mittaus
27.9. osoittaa ne yhä maalatuiksi tausoiksi, ks. taulukko). Sen jälkeen
**Pietari, Rooma, Valletta ja Wien (14 kuvaa) eivät koskaan saaneet omaa
toimitusmerkintää** postilaatikossa — työ pysähtyi Pariisiin. Ateenan
pilotti (6 kuvaa, posti/sisaltokirjuri-kuvaputki-ateena-leikatut-
pilotti-20260925.md) ei myöskään koskaan saanut kuittausta.

### Pyyntö

Toimita VAIN nämä 7 tiedostoa (ei koko 14+6 kuvan loppuerää — muut 13
[Pietari 1, Rooma 3, Valletta 4, Wien 5 miinus nämä 2, sekä Ateenan 4
muuta] eivät olleet tässä koneellisen mittauksen poikkeamalistassa,
joten ne eivät ole tämän tilauksen kiireellisyysluokassa, mutta saa
toimittaa samalla jos on jo työn alla). Kuvaus ja tyylisääntö on
täsmälleen sama kuin alkuperäisissä tilauksissa (linkitetty yllä) —
EI toisteta tässä. Poimi taulukoista rivit näille 7 tiedostonimelle.

### Toimitus

Sama käytäntö kuin alkuperäisessä tilauksessa: uudet webp-tiedostot
samoille poluille PR:ään, avoinna Julkaisijan junaan (ei mergeä itse).
Kirjoita tähän postilaatikkoon rivi "PR #n valmis junaan". Poista
toimitetut tiedostot `tests/miniatyyrit-leikkaus.test.mjs`:n
TUNNETUT_KOHTAUSKUVAT-listalta ja aja `node tools/mittaa-miniatyyrit.mjs`
(committoi `tools/miniatyyri-mitat.json`) samassa PR:ssä.
