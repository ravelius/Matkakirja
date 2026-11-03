# Pelikoodari → Tripo 3D: palvelijatar v2, malli naiseksi (3.11.2026 klo 23.3x, KK ohjaa)

KK 23.30: v1 (`palvelijatar.glb`, toimitus 73e82f87f) palautettu, koska hahmo näyttää pelikamerasta mieheltä. Omistajan kortti 2.11. 21.05 on
"palvelijatar". Pysyvä hahmomallilupa (Raamattu 7.15), ei korttia omistajalle. Muut toimituksen hahmot, tavarat ja jäänteet ennallaan.
Vertailukuva v1:stä pelistä: proto-3d/_tyo/pelikoodari/palvelijat-v6/osuma1-000.png ja osuma1-060.png (lyhyet mustat hiukset, leveät hartiat, suora vihreä kaapu).

## Tavoite
Näyttää heti naiselta myös 15 metrin päästä, edestä ja takaa. Peli kuvaa keisarin takaa, joten hahmo näkyy pieneltä: siluetti ratkaisee, ei yksityiskohdat.
Ei karikatyyriä, 13+ ja aikuiset, uskottava palatsin palvelija (kuten v1:n tilaus 2.11.). Nuori aikuinen nainen, noin 1,55 m.

- **Hiukset (tärkein keino):** mantšunaisen kampaus kukkakoristeella tai pitkä palmikko hiuskorulla. Puyilla on itsellään palmikko, ja hahmon pitää erottua
  hiustensa takia myös keisarista, joten suosittelen kampausta. Palmikko vain, jos lähde sitä vaatii, ja silloin selvä hiuskoru ja erilainen pituus.
- **Keho:** pehmeämmät kasvot, kapeammat hartiat, vyötäröllä tai asussa naisen muoto; ei miesmäistä suoraa lieriötä.
- **Asu:** naisen palatsiasu vuodelta 1914, hihansuissa kirjonta. Ei eunukkien indigoa tai tummaa liiviä eikä keisarin keltaista; vaaleanvihreä tai vaaleansininen käy.

## Lähde (tarkista ja kirjaa toimitukseen)
Omassa haussani löytyi lähinnä pukukauppoja, joten en anna asulle varmaa lähdettä. Käytä museoiden ja arkistojen aineistoa tai aikakauden valokuvia
(esim. Palatsimuseo Peking, tutkimus mantšunaisten kampauksista). Älä käytä pukukauppoja, televisiosarjoja tai elokuvia. Kirjaa käytetyt lähteet, ja kerro, jos varmaa lähdettä ei löydy.

## Tekniikka: vaihto ei saa muuttaa koodia
- Sama luuranko: 65 niveltä samoilla nimillä ja samassa järjestyksessä kuin v1 ja `eunukki-1.glb` (hahmot-v6).
- Samat leikkeet ja kestot kuin v1: idle 2,0 / walk 1,4 / startle 1,0 / startle_idle 2,0 / walk_empty 1,4 s. Liikkuu kaikissa näissä; tavara irtoaa 0,40 s kuten v1:ssä.
- `tavara`-solmu ja sama `tavara-maljakko` syleilyssä; RUNTIME-CONTRACT.jsonin irrotusyhtälö pätee. Jos mitat muuttavat irrotusmatriisia, päivitä se toimitukseen.
- Enintään 20 000 kolmiota, kasvot +Z, tummat huopapohjat, mitoitus kuten v1.

## Toimitus
Kansio `posti/palvelijatar-v2-20261103/`: `palvelijatar.glb`, SHA256SUMS, lähteet ja kuvat edestä ja takaa, 15 metrin etäisyyskuva (pieni koko) sekä vertailu rinnakkain
`eunukki-1`:n, v1:n ja keisarin kanssa. Vastaus `posti/tripo3d-pelikoodari-palvelijatar-v2-toimitus-20261103.md`. **Vain claude/postilaatikko.**

Kuva edestä ja takaa menee KK:lle ennen kytkentää; Pelikoodari tarkistaa rakenteen ja vie sen KK:lle. Ei junaan ennen KK:n hyväksyntää.
