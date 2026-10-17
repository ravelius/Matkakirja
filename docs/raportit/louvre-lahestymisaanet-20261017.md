# Louvren lähestymisäänet (Äänittäjä 17.10.2026, PT:n pyyntö juna 200)

Ei generointia, ei latauksia: koottu omista kirjastoista (Soundly Pro, Sonniss) taidehallin lähestymisen reseptillä (`proto-3d/_tyo/louvre-lahestyminen-20261017/tee.py`).
Raamatun järjestys Sonniss → Soundly → Freesound: omasta kirjastosta löytyi kaikki, joten Freesoundia ei tarvittu.

- `https://media.matkakirja.app/aanet/taidemuseo-louvre-v1/louvre-ulko-silmukka.mp3` — 60 s poolisilmukka (Cour Napoléon: aukio, kaukainen Rivolin liikenne, kellot, kyyhkyt, askeleet), −26,5 LUFS, huippu −10,4 dBFS, sauma ristihäivytetty.
- `…/louvre-sisaanmeno-12s.mp3` — 12 s: aukio → pyramidin aula (ylät vaimenevat) → ovi 6,9 s → Hall Napoléon (iso kaiuttu halli) → museosalin tausta nousee 8,5 s alkaen; −28,8 LUFS, huippu −11,7 dBFS. Samat tasot kuin taidehalli-v1 (−26,3 / −28,5).
- `…/manifest.json` (id, tiedosto, kesto, silmukka, taso, ovi_s). Ääniportti läpi, vienti 3 tiedostoa, virheitä 0, CDN 200. Lähteet ja lisenssit: paketin LAHTEET.md.
- Siirtoseppä: kirjoita avaimet `ranska/lahestyminen.json`-ulkoaanille samalla mallilla kuin `UlkoUrl`/`SisaanmenoUrl` (Amsterdamin vakiot MuseoSovitin.Lahestyminen.cs:62–63); tasot koodissa 0,5 × maisemaryhmä kuten Amsterdamissa.
- Kuuntelematta (kuuntelu ei ole portti); jos halutaan hioa, ensimmäinen kohde on oven kaiku (6,9 s).
