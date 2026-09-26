# Build 21, täydennys (26.9.2026, käännös 4b52b8f0)

Jatko edelliseen (943447211). Korjaus + 162.

## Korjaus: musiikki vaihe 2/3 EI ollutkaan FAIL

Pelikoodari selvitti: ratkaisu/epäonnistuminen-teemat eivät katkaise jo soivaa aihetta, ja edellisessä
testissäni sama pelisessio oli juuri soittanut `aani aihe loppu` -teemaa (69 s), joka peitti tulosaiheen.
Tuoreella pelillä Pelikoodarin ohjeiden mukaan (`aani aihe ratkaisu` → heti `aani mittaa 2`):
- **Ratkaisu: PASS** — musa-ratkaisu-lyria.mp3 soi (0,07).
- **Kohtaaminen (`aani tila kohtaaminen paalle`): PASS** — musa-kohtaaminen-lyria.mp3 soi.
- **Manner/tunnuskaupunki (`aani aihe kaupunki kairo`): PASS** — musa-saapuminen-lahi-ita-lyria.mp3 soi.

Kaikki kolme musiikki vaihe 2/3 -kohtaa ovat siis PASS, ei yhtäkään FAILia enää tässä osiossa.

## 162 (saapuminen luennan jälkeen, ääni pois): PASS silmämääräisesti

Ajoin oikean pelikulun (ei uusi-peli-oikotietä) äänet pois -tilassa: Uusi matka → Livia-tekstipuhekupla
(luento) näkyi kirjoitettuna → valinta Ateenaan → lento → uusi satelliittityylinen saapumiskohtaus
(reittiviiva + punainen rengas + kone laskeutumassa Ateenaan, selvästi hienompi kuin aiempi versio) →
siirtyi PELATTAVAAN karttaan muutamassa sekunnissa ilman että mikään kortti/kuvapakka jäi jumiin tielle.
En mitannut tarkkaa millisekuntia, mutta siirtymä vaikutti sujuvalta ja nopealta (ei havaittavaa viivettä
tai jumitusta), ja poikkeuksellisesti EI ilmestynyt heti blokkaavaa nostokorttia (toisin kuin aiemmissa
kierroksissa) — voi olla juuri tämä korjaus (kuvapakka lähtee heti).

## Ei ehditty edelleenkään

155 (tarkka 0,85-arvo), 156 (veto+katkoviiva+kytkin), 158 (pikkukuva), 160 (mustetäplät mallien alla — en
löytänyt Delfoi/Meteora-sijaintia ehtiäkseni), iPad-erät, kuvat-kiinteät, maanosakorjaus.

## Päivitetty yhteenveto
PASS: 157, 161, C, D, musiikki vaihe1+2+3 (3 kpl), 162 (silmämääräisesti). Ei enää yhtään vahvistettua
FAILia build 21:ssä. Testaamatta: 155 (tarkka arvo), 156, 158, 160, iPad-erät, kuvat-kiinteät,
maanosakorjaus. Simulaattori sammutettu.
