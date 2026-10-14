# Codex-tilaus (LUONNOS): Petřínin näkötornin havainnekuvat

Tila: HYVÄKSYTTY ja lähetetty 14.10.2026 (Päätoimittaja). Liitteet tässä postissa nimillä petrin-*. Tavoiteluupin ohje: ks. posti codex-peking-tavoiteluuppi-20261014.md kohta 2 (havainnekuvat sisäisiä, PT hyväksyy ennen mallikierroksia). Lähettäjä: Valoseppä -> Päätoimittaja (PT) hyväksyy ja vie Codex-postilaatikkoon (haara claude/postilaatikko).

## Tehtävä

Tuota **5 fotorealistista havainnekuvaa** Prahan Petřínin näkötornista (Petřínská rozhledna, Wikidata Q12256) täsmälleen oheisista kuvakulmista (kulmat.json). Kuvia käytetään vain 3D-mallin ja havainnekuvien vertailuun (tavoiteluuppi): malli piirretään samoista kulmista ja verrataan kuvaan, joten **kulmien, mittasuhteiden ja kameran korkeuden pitää täsmätä**, ei taiteellinen vapaus.

## Tornin kuvaus (lyhyesti, tarkat luvut faktat.md)

- Kahdeksankulmainen niitattu teräsristikkotorni 1891 (Eiffel-tornin pienempi, vapaa mukaelma, ei neliö- vaan kahdeksankulmapohja, ei neljää suurta jalkaa). Runko ~60 m, mastoineen ~71 m (arvio).
- Juurella kahdeksankulmainen kermanvalkoinen sisäänkäyntihalli (punaiset infotaulut, vihreät lyhdyt, koristeelliset teräskaaret), hallin harmaa kattopinta jonka läpi jalat nousevat.
- Alagalleria ~20 m: avoin kahdeksankulmainen parveke lattiaristikkokaiteineen, yllä lasitettu rengas. Ylätasanne 55 m: lasitettu kahdeksankulmainen lyhty harmaalla katolla, päällä ristikkoantennimasto.
- Väri: vaalea sinertävänharmaa teräs; ei kultausta tai kirkkaita värejä; keskellä kapea kahdeksankulmainen tuubi ja kaksi kierreporrasta.
- Mittakaava: torni ~60 m, halli ~22 m leveä (litteiden kylkien väli).

## Kuvakulmat (kulmat.json)

Atsimuutti = suunta tornin keskustasta kameraan (asteina pohjoisesta myötäpäivään); kamera katsoo siis tornia kohti. Kameran korkeus maan pinnasta (tornin juuren tasolta). FOV = pystysuuntainen.

| Kuva | Atsimuutti | Etäisyys | Kameran korkeus | Kallistus | FOV (pysty) | Huom. |
|---|---|---|---|---|---|---|
| K1 pallokierros | 200 deg (SSW) | 200 m | 90 m | -14,8 deg (alas) | 45 deg | pelin pallokierroksen tyyppinen korkea näkymä |
| K2 maantaso, sisäänkäynti | 190 deg (S) | 55 m | 1,7 m | +24,9 deg | 70 deg | koko torni, voimakas perspektiivi |
| K3 maantaso, länsi | 270 deg (W) | 110 m | 1,7 m | +15,7 deg | 45 deg | profiili |
| K4 maantaso, pohjoinen | 5 deg (N) | 100 m | 1,7 m | +16,9 deg | 45 deg | takapuoli |
| K5 korkea vino | 100 deg (E) | 130 m | 150 m | -40,2 deg | 40 deg | juurihallin kattopinta ja parveke ylhäältä |

Kuvasuhde 3:2 vaaka (K1, K3, K4, K5), K2 mielellään 2:3 pysty. Torni näkyy KOKONAAN (jalat maassa, masto kuvassa) jokaisessa kuvassa, ei leikattuna. Kuvaa saa tehdä kahtena tasona: ensin ilman puita tornin edessä, sitten kevyellä lehtipuukehyksellä sivuilla.

## Liitteet (tähän kansioon)

1. `pohjakartta.png` (+ .svg): OSM-rakennusrajaus, metrimittakaava, pohjoisnuoli; K1-K5 merkitty. Käytä tornin pohjan muodon ja ympäristön asettelun tarkistukseen.
2. `leikkaus.png` (+ .svg): sivuleikkaus korkeuksineen; **punainen/tähti = arvioitu**, ne saa tulkita valokuvien mukaan.
3. `kuvat/petrin-1-sisaankaynti.jpg` ... `petrin-5-ylhaalta.jpg` (Commons, CC0 / CC BY / CC BY-SA; lisenssit ja kuvaussuunnat LAHTEET.md). Käytä VAIN muodon, rakenteen ja värin referenssinä; älä kopioi kuvien taustoja, ihmisiä tai sommittelua.
4. `kulmat.json`: kameratiedot koneluettavana.

## Rajaukset

- **Kuviin merkintä "havainnekuva"** pieneen kulmaan (pelin käytäntö).
- **Ei Googlen 3D-laattoja eikä Google Earth/Street View -kuvia** lähteenä tai taustana.
- **Ei suojattuja teoksia**: ei tunnistettavia veistoksia, mainoksia, tavaramerkkejä tai teoskuvia (tornin kellarin Cimrman-museo ym. pois), ei oikeita ihmisiä.
- **Tausta neutraali**: puisto, lehtipuita, nurmikkoa, yksinkertaisia soraisia polkuja, pehmeä pilvinen tai kirkas taivas; **muita rakennuksia ei piirretä tarkasti** (Nälkämuuri, kappelit, Peililabyrintti, kirkko voi näkyä vain kaukaa sumeana tai jättää pois). Prahan vanhakaupunki ei saa näkyä taustalla K5:ssä tarkkana.
- Valo: päivänvalo, matala-keskipäivän aurinko, ei dramaattista iltaa; ei yötä, ei valaistusta; kausi kevät-kesä (lehdet vihreät).
- Ei tekstiä kuvissa lukuun ottamatta "havainnekuva"-merkintää; ei ihmisiä tai korkeintaan pieniä siluetteja K1:ssä ja K3:ssa.

## Tarkistus (vastaanottaja)

- Tornin korkeus/leveys-suhde: kokonaiskorkeus ~71 m, halli 22 m leveä (suhde ~3,2:1); alagalleria ~20 m (28 % tornin korkeudesta), ylätasanne 55 m (77 %).
- Palauta PNG/JPG nimillä `petrin-K1.png` ... `petrin-K5.png`, vähintään 2400 px pitkä sivu, sekä lyhyt kuittaus kustakin kuvasta, mikä sai poiketa kulmasta.

## Lähteet

faktat.md (luvut ja lähteet), LAHTEET.md (kuvalisenssit), osm.json (OpenStreetMap contributors, ODbL).
