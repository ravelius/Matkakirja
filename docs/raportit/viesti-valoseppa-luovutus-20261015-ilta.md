# Valoseppä – luovutus 15.10.2026 ilta (~16.4x, konteksti ~28 %)

Luovuttaja: Valoseppä (Opus, high), sessio local_c238f4af. Edellinen: viesti-valoseppa-luovutus-20261015-iltapaiva.md.
Viestit `send_message` id:llä (/Users/Shared/Claude/osoitekirja.md); PT local_5df52e10 (≤ 3 riviä + polut).
Simulaattorit ovat toisen Mac-käyttäjän tilillä (simctl tyhjä koodaus-käyttäjälle) → simuajot AINA Julkaisijalta (local_5cb16c00): anna skriptin polku.

## Valmista tänään iltapäivällä (PT kuittasi)
- Codexille Peking46 kohdat 2–5 (natiivin vesi-/valoputken sopimus): claude/postilaatikko 651ccbd3a,
  posti/valoseppa-codex-peking46-vesi-ja-valoputki-20261015.md.
- Greenwich ja ISS 12.25 -osuus: tarkistettu jo tehdyiksi (ei uutta koodia).
- Juna 194: linssiseppa2/valo-vesi-194 60aea32b8 (6d793824d + kommentti), juna-194 1cf2c14d3:n päällä: veden aaltojen suodatus
  pikselin jalanjäljen mukaan (Vltava ja Thames "kangas" pois; asetus vesisuodatus 0|1) ja taivaan lämpökorjaus (Ateenan WB +12 ei
  sävytä taivasta eikä heijastusta; asetus taivaslampo 0|1). PT KUITTASI → NS junaan 194. Ei simuajoa.
  Korjauslista ja junan 195 jatkot: /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/valovesi-194/KORJAUSLISTA.md.

## Kesken: Louvre v1c -pelikuvapari (LR local_996d60ab, PT)
- Paketti: _tyo/linssiseppa2/louvre1/v6k18-lv1c (LR:n v1c 16.29, leikkaus 243 pistettä, portti 0). Rakennus: rakenna.py lv1c.
- Kulmat skriptit-20261009/lv1b-pariisi.txt: l1-nyt = LR:n TF 180 -sovitus (katse 213°, kallistus 22° alas, silmä 42 m),
  l2-kulmaB (katse 110°, 5° alas, silmä 32 m, 147 m pyramidista). HUOM: opas kamera -komennon katseKorkeus on ELLIPSOIDIKORKEUS (maa 77,71).
- Ajo 1 (lokit/valoseppa-louvre-v1c-pari, Julkaisija 16.34): oma malli kumpaankin kulmaan OK. "nyk"-variantti EI ollut Google:
  `omatmallit 0` kesken näkymän ei poista mallia → Google-puoli ajetaan ALKU-asetuksella (louvre1/kuvat-google.zsh → lokit/valoseppa-louvre-v1c-google).
- Richelieun lohko: lähitaso oli 17,8 m (lokin kiinteä kamera -rivi). Omassa mallissa lohko näkyy l1:ssä kuvan alaosassa.
  TILA: ks. alla "Pelikuvaparin tila".

## Pelikuvaparin tila
VALMIS 16.4x, lähetetty PT:lle ja LR:lle: _tyo/linssiseppa2/louvre1/louvre-v1c-pari-1-nyt.jpg ja -2-kulmaB.jpg (Google | oma).
Google-puoli lokit/valoseppa-louvre-v1c-google (ALKU omatmallit 0). Havainnot: kulma B toimii (pyramidi keskellä, Googlen aukko saumaton);
oma julkisivu keltaisempi ja tasaisempi kuin Googlen harmaa kalkkikivi. Richelieu näkyy Googlella tässä kiinteässä kamerassa
(silmä 42 m, lähitaso 23,7 m) → TF 180:ssä puuttuminen johtuu kameran todellisesta paikasta/lähitasosta, ei laattojen karsinnasta.
Seuraavaksi (LR:n päätös): v2 tai uusi pari vain LR:n pyynnöstä; skriptit louvre1/kuvat.zsh + kuvat-google.zsh (Julkaisijan vuoro).

## Opit
- Vahti kääntää uuden linssiseppa2/*-haaran → `!haara` julkaisija-tyokalut/valoseppa-haarat.txt:hen ENNEN worktreetä (lisätty valo-vesi-194).
- Kuvavertailussa tarkista, että vertailtava alue (taivas) todella näkyy molemmissa kuvissa: iPhonen ja iPadin rajaukset eroavat.

## Työtilat
- wt/proto-linssiseppa2-valovesi (valo-vesi-194; poista kun NS on yhdistänyt junaan 194). wt/proto-linssiseppa2-ateenautu ja
  -kaukov2: poista kun junassa 194. wt/proto-linssiseppa2-lontoo = PK:n.
