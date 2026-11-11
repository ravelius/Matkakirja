# Karttaseppä: KJ47b puistopuut v2, ennen b19f3b2ee | jälkeen ce7a3849c (11.11.2026 klo 20.3x)

Ajot: /Users/Shared/Claude/proto-3d/lokit/ks-kj47b-puut-{ennen-b19f3b2ee,jalkeen-ce7a3849c}: molemmat valmiit (833 s), 28/28 kuvaa, Shader-virheet 0.
Parit (ennen | jälkeen): /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/koodijuna/parit-kj47b/ym47b-*.jpg (28 kpl)
+ ym47b-40-champ-de-mars-orto.jpg (peli | IGN-orto, jossa OSM-puut punaisella ja valitut vihreällä).

## Kuvat
- Rivit ja akselit: Champ-de-Marsin keskiakseli, esplanadi ja viuhka ovat auki. Puut ovat rivinä kujilla. Rodinin puutarhassa ei ole 3D-puita.
  Katoilla ei ole puita. Puu-3:a ei enää näy.
- VIKA, Champ-de-Mars: puut loppuvat kentän puolivälissä (ym47b-40). Syy: Eiffelin rajaus lat0 48.8550, joten oikeat kujat
  École Militairelle asti jäivät pois. KORJATTU v3:ssa (alla).
- Varjoraja (30–35): lähin kevyt puu 45 / 97 / 152 / 202 / 254 m. Kaukaisten puiden varjot kutistuvat vähitellen (15 → 36 → 49 → 50 → 60 puuta).
  Liikkeessä otetussa kuvassa ei näy poksahdusta. Lähikuvat toimivat nyt lahizoomilla (20 = 40 m, 21 = ND:n puisto).

## Sävy (savy-kj47b.py, 3D-latvuksen sRGB-keskiarvo; maalattu puusto KJ47:stä noin 128 130 84)
| kuva | _Savy | 3D-latvus |
|---|---|---|
| 42 esplanadi | 1.25 1.2 1.1 (ce7a3849c) | 120 121 73 |
| 43 vaalea | 1.45 1.4 1.25 | 130 131 78 ← LÄHIN |
| 44 tumma | 1.05 1.0 0.95 | 109 111 68 |
Kuvissa 41–44 ei näy maalattua puustoa, koska ne on otettu liian läheltä. Vertailuarvo on siksi KJ47:n mittauksesta. Valittu 1.45 1.4 1.25.

## Luvut (PiirtoTilasto, 30 kehyksen keskiarvo; ennen → jälkeen)
| kohta | piirtokutsut | puukolmiot (näkyvät) | varattu / tekstuurit / gfx / verkot Mt |
|---|---|---|---|
| yleis-viisto 0.05 | 45 → 52 | 0 → 253 893 (kaikki) | 1474/392/1563/437 → 1497/397/1571/437 |
| yleis-ylhäältä | 47 → 56 | 0 → 253 893 | 1469/392/1901/439 → 1491/396/1904/439 |
| keski-viisto 0.015 | 27 → 28 | 0 → 197 250 | 1488/406/1926/460 → 1500/401/1919/460 |
| loppu | 21 → 21 | 0 → 67 738 | 1398/531/1965/277 → 1417/532/1965/277 |
- MUISTI: varattu muisti kasvaa 19–23 Mt (+1,5 %), ja verkot ja gfx pysyvät ennallaan. Ehto ≤ +5 % täyttyy.
- PIIRTOKUTSUT: +7…+9 yleisnäkymässä (+16…+19 %). Puukutsuja on 14: alue × verkko + varjot. Absoluuttinen määrä on pieni (alle 60).
- NÄKYVÄT KOLMIOT: EI VIELÄ VERTAILUKELPOINEN. Kummassakin ajossa "piirtäjät 0, 0 kpl", eli Renderer.isVisible oli tässä ajossa epätosi kaikilla.
  Korjaus: sama näkökartiotesti (Camera.main + cullingMask + bounds) kuin puuerillä, 872ad9249 (jälkeen) ja a6927dd47 (ennen).

## Korjaukset KJ47c:hen (karttaseppa/ymparistot 5f44f5325, natiivi-backup; 758/758, unity 0)
1. Mittari: näkyvät kolmiot näkökartiotestillä, 872ad9249 (ennen-käännös a6927dd47).
2. Champ-de-Mars koko pituudelta: tee-puut-v3.py, rajaus 48.8520..48.8612 / 2.2905..2.3055. Eiffelin puut 222 → 466 ja kaikki yhteensä 789 → 1033.
   Akseli on auki (556 OSM-puuta jää akselille). Tarkistuskuva orto/merkit-v3-eiffel.jpg. Puukolmioita tulee lisää noin 61 000.
3. Kevyiden sävy 1.45 1.4 1.25.
KJ47c (K/sk-mac-puut-kj47c.txt): yleisnäkymien kolmiot ennen → jälkeen, Champ-de-Mars ylhäältä ja viistosti sekä sävy kauempaa
siten, että maalattu katupuusto näkyy samassa kuvassa.
