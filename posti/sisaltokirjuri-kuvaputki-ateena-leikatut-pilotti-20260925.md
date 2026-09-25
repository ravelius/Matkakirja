## 2026-09-25 — SISÄLTÖKIRJURI → KUVAPUTKI: Ateenan 6 karttanostokuvaa leikattuina kohteina (pilotti build 14:ään; korvaa aiemman viiden kuvan tilauksen)

Fablen päätös 25.9.: **karttanostojen ja nähtävyyksien kuvat ovat leikattuja kohteita, eivät kohtauksia.** Omistaja (löydös 95, build 13): "piirretty tausta on väärin". Tämä tilaus korvaa tiedoston posti/sisaltokirjuri-kuvaputki-miniatyyrien-leikkaus-20260925.md (viisi kuvaa): siinä olevista Ateenan elginin-marmorit on tässä; Madridin, Pariisin, Rooman ja Wienin kuvat tilataan vasta, kun omistaja on hyväksynyt tämän pilotin (yhteensä 70 kuvaa, lista alla).

### Tyylisääntö (kuvaputken ohje, tools/generoi-miniatyyrit.mjs)

Kuvassa on YKSI KOHDE (rakennus, esine, henkilö tai pieni ryhmä) tasaisella paperitaustalla, joka leikataan pois: läpinäkyvä webp (RGBA), kohteen ympärillä läpinäkyvää pohjaa. EI maalattua taustaa, taivasta, maisemaa tai huonetta kohteen ympärillä. Malli: assets/kartat/miniatyyrit/ateena-akropolis.webp, ateena-agora.webp, ateena-kallimarmaro.webp (1024×1024, rakennus yksin läpinäkyvällä pohjalla). Vartija tests/miniatyyrit-leikkaus.test.mjs: läpinäkymättömien pikselien osuus koko kuvasta < 0,6 ja kuvan kehästä ≤ 0,35. Katso jokainen kuva silmin.

### Tilaus: 6 kuvaa (assets/kartat/miniatyyrit/, 1024×1024 webp kuten vanhat nähtävyydet; sama tiedostonimi)

| Tiedosto | Kohde (mikä kuvaan tulee) |
| --- | --- |
| ateena-akropolis-museo.webp | Uusi Akropolis-museo: museorakennus lasiseinineen yksin (ei kaupunkinäkymää) |
| ateena-iliou-melathron.webp | Iliou Melathron: Schliemannin uusklassinen palatsi yksin (julkisivu, patsaat katolla, aita) |
| ateena-diogeneen-astia.webp | Diogeneen astia: iso savipitos kyljellään yksin (ei Akropolis-taustaa) |
| ateena-maratonhuijaus.webp | Maratonhuijaus 1896: hevosvaunut ja ajaja yksin (ei maisemaa, opasteita tai puita) |
| ateena-elginin-marmorit.webp | Elginin marmorit: Parthenonin friisilohko puuhäkissä nosturin köysissä yksin (ei laivaa tai satamaa taustalla) |
| ateena-niken-temppeli.webp | Athena Niken temppeli: pieni jooniatemppeli bastionilla yksin (ei taustan Akropolista) |

Nykyiset kuvat ovat 512 px kohtauksia (täyttö 0,69–0,88) esimerkkinä aiheesta ja sommittelusta; vaihdettavaksi kohteen ympärys. Nykyisen kuvan tyyli (akvarelli/seepia) pysyy, taustan poisto on muutos.

### Toimitus

Uudet webp-tiedostot samoille poluille PR:ään (avaa PR, jätä auki, älä mergeä — Julkaisija ottaa junaan; build 14). Kirjoita tähän postilaatikkoon rivi "PR #n valmis junaan". Kun kuvat on korvattu, ne poistetaan tests/miniatyyrit-leikkaus.test.mjs:n TUNNETUT_KOHTAUSKUVAT-listalta samassa PR:ssä (toinen testi kaatuu muuten).

### Seuraava vaihe (vasta omistajan hyväksynnän jälkeen)

Kaikki 70 kohtauskuvaa (lista: docs/raportit/miniatyyrit-kohtauskuvat-20260925.md haarassa sisaltokirjuri-miniatyyrit-kohtauskuvat, PR #3180; ei vielä tilattu). Valmistele tyyliä mutta älä generoi ennen kuin Fable kuittaa.
