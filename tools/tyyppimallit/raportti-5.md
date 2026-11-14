# Työkalu 2: budjetti (KK 14.11. 23.59), Valoseppä 15.11.

Ei laiteajoa. Laskettu: mallit `Luonnos.dll budjetti` (oma/Luonnos.cs, rakentaa jokaisen muunnelman nykyisellä Tyyppimallit.cs:llä) ja perustalot
koko kaupungista KS:n tee_palat.py:llä (ac9bfb50a, taulu-uusi.json) kahdesti: nyt ja poistot-<k>.json rivin poisOsm:ssa. Erotus = poistettujen
perustalojen tarkka osuus. Ajot: budjetti-aja.zsh (taulu tulos/budjetti-taulu-pois.json); luvut tulos/budjetti-mallit.tsv, `python3 -I budjetti.py kooste`.

## TÄRKEIN HAVAINTO: vain osa merkeistä on pelin talojen alueella
- Pariisi 421 → alueella 300. 23 on kaupunkitaulun rajan ulkopuolella, 98 kirkkoa puuttuu talolähteestä kokonaan (natiiviseppa/pariisi-talot; esim. Fontenay-sous-Bois).
- Lontoo 892 → alueella 446. 440 on rajan ulkopuolella (otteet-63 kattaa isomman alueen kuin talopalat), 6 ei lähteessä.
- Alueen ulkopuolella perustaloja ei piirretä, joten malli seisoisi tyhjällä maalla. Ehdotus: vienti vain alueelta (tulos/budjetti-alueella-<k>.json).
  KK päättää.

## (a) Kolmiot ja tavut (alueella)
| | Pariisi | Lontoo |
|---|---|---|
| Perustalot nyt, koko kaupunki | 7 864 645 kolmiota, 14,5 M kärkeä, 422 Mt, 219 palaa | 7 246 218, 9,9 M, 308 Mt, 242 palaa |
| Poistuvat perustalot | 300 taloa: 69 785 kolmiota, 126 499 kärkeä, 3,87 Mt | 446: 25 076 kolmiota, 45 993 kärkeä, 1,40 Mt |
| Mallit, jokainen oma kopio | 57 161 kolmiota, 171 483 kärkeä, 7,20 Mt | 49 156, 147 468, 6,19 Mt |
| Kolmioiden muutos | −12 624 (−0,16 %) | +24 080 (+0,33 %) |
| Mallit jaettuna (b) | 21 verkkoa, 19 417 kolmiota, 2,45 Mt + 300 × 64 t | 3 verkkoa, 836 kolmiota, 0,11 Mt + 446 × 64 t |
| Tavujen muutos jaettuna | −1,4 Mt | −1,3 Mt |

- Kolmiot per malli: kirkko pieni 75, keski 126, suuri 635, kupolikirkko 1 350, pylvästemppeli (attika) 818, palatsit 483–1 347, asemat 704–1 424.
- Tavut: perustalo 24 t / kärki + 4 t / indeksi (tee_palat.py). Malli kuten OhjelmaKohteet.cs:n verkko (rivi 1177): sijainti + normaali + Color (float4)
  = 40 t / kärki + 2 t / indeksi, eikä kärkiä jaeta (3 kärkeä / kolmio). Color32 (4 t) toisi mallit 28 t:iin / kärki.
- Kaikki kaikkiaan: kolmiot pysyvät ennallaan (alle 0,5 %), muisti pienenee, jos verkot jaetaan.
- Koko kaupunki (421 / 892 ilman rajausta): 69 449 / 95 407 kolmiota.

## (b) Ehdotus: yhteinen verkko ja instansointi
- Kirkot (pieni, keski, suuri), kupolikirkko ja pylvästemppeli: yksi verkko tyyppiä kohden; jokaiselle merkille instanssin matriisi (paikka, akseli,
  mittakaava x / z pohjasta tai luonnollinen tasainen). Graphics.RenderMeshInstanced, yksi kutsu verkkoa kohden (raja 1 023 / kutsu riittää).
- Palatsit ja asemat ovat parametrisia ja jokainen käytetään kerran, joten instansointi ei auta. Ne leivotaan latauksessa yhdeksi staattiseksi
  verkoksi (Pariisi 16 verkkoa, noin 16 000 kolmiota, 1 piirtokutsu).
- Piirtokutsut: Lontoo 3, Pariisi 5 + 1 = 6 (+ varjokierros saman verran). Perustalojen palat ovat vertailuna 219 / 242 palaa.
- Näkyvyys: instanssi näkyy, kun sen talopala näkyy (instanssit ryhmitellään paloittain latauksessa). Näin malli ei näy, kun ympäröivät talot
  eivät näy, eikä toista etäisyysrajaa tarvita. CPU:lla 300–446 pistettä ruudussa on halpa.
- Huom. epätasainen mittakaava: normaalit tarvitsevat käänteismatriisin (URP:n instansointi hoitaa sen unity_WorldToObjectilla).
  Venytys pohja-sovituksessa on suuri: kirkkojen x 0,31–1,86 ja z 0,25–2,45 (mediaani noin 0,7 / 1,1). Ääripäissä torni ja ikkunat vääristyvät.
  KK katsoo, rajataanko (esim. 0,6–1,6, muuten ei sovi).

## (c) Vienti peliin (kuten puut, 7c618a16e)
- Tiedosto Resources/Elava/merkit-<id>-kartta.bytes, ladataan aktiivisen kaupungin (TaloAlue) mukaan kuten puut: KartanElama.Puut.cs
  `PuuRuudukko.KarttaResurssi(id)`, puuttuva tiedosto = ei malleja, kaupungin vaihtuessa edellinen puretaan; purku taustasäikeessä.
- Sisältö: otsake "MK01", malleja N, merkkejä M. Mallitaulu: tyyppi (u8) + enintään 4 parametria (f32), esim. piha L W julkisivu avoin,
  asema halleja L W. Verkko rakennetaan latauksessa koodista (Tyyppimallit.cs pelin OhjelmaKohdeGeometriaan), joten tiedostossa ei ole verkkoja.
- Merkki 24 t: x, z f32 (m kaupunkitaulun origosta kuten puut), maa i16 (MAA1 0,25 m; y = KorkeusKerroin.Sovita(maa + MaaLisays) − ankkuri −
  kaarevuus kuten puut), malli u16, akseli u16 (länsipään kääntö mukana), sx, sz u16 (×0,001), täyte. Pariisi 300 × 24 = 7,2 kt, Lontoo 10,7 kt.
- Perustalojen poisto: samat osm-id:t kaupunkitaulun riville poisOsm (tee_palat.py rivi 166, KS:n kone). Tämä budjetti ajoi sen jo tällä tavalla.
  Tiedosto ja poisOsm syntyvät samasta listasta, joten ne pysyvät yhdessä.
- Tekijä: tyypitys.py → vie.py (uusi) → .bytes; maa samalla tavalla kuin tee_elava_kartta.py (maasto.py z12).
- Pelikoodi (lataus, instansointi, Tyyppimallit.cs peliin) on junatyötä: KK:n sana ja NUI:n tai Karttasepän kaista.

## KK PÄÄTTÄÄ
1. Vienti vain talojen alueelta (300 / 446) vai koko otteesta?
2. Venytyksen raja pohja-sovitukseen?
3. Jatketaanko (c):tä: vie.py + tiedosto ensin työkalussa, pelikoodi kenelle?
