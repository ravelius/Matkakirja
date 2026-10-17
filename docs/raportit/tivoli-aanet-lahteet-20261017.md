# Tivoli-äänet: lähdelista ja kuunteluesitys (Äänittäjä 17.10.2026, vaihe 7)

Luonnos, ei vientiä eikä kytkentää (tivoli-suunnitelma luku 4, vaihe 7). Kansio `/Users/Shared/Claude/proto-3d/_valmiit/tivoli-v1/`:
- `kuuntelu/index.html` — kuuntelusivu (suositus + vara per paikka, tasot LUFS/huippu, Freesound-linkit); `kuuntelu/<freesound-id>.mp3` esikuuntelut.
- `lahteet-luonnos.js` / `.json` — 7 paikkasidonnaista lähdettä (id, laite, lat/lon, kuvaus, valinnat suositus + vara, lisenssi, tekijä, linkki); `LAHTEET.md`; `haku/` (lokit).
- Freesound API / Actions (aanihaku.yml), vain CC0 ja CC BY; 15 hakua. Oma kirjasto (Soundly/Sonniss) ei tässä, koska PT:n rajaus oli CC0/CC BY.

| Laite / kerros | Suositus | Vara |
|---|---|---|
| Rutschebanen (kolina) | 513923 Linnanmäen vuoristorata, YleArkisto CC BY | 205968 Efteling, klankbeeld CC BY |
| Dæmonen | 438677 Roller Coaster Roar, craigsmith CC0 | 336855 TROY, borQue CC BY |
| Kirkaisut (Himmelskibet, Gyldne Tårn) | 406824 funfair France screaming, barkenov CC0 | 438420 women screaming, craigsmith CC0 |
| Väkijoukko | 396439 Liseberg chatter, gis_sweden CC0 | 520134 Fantasilandia, sonidistapo CC BY |
| Kaukainen soittokunta | 187538 street band brass quartet, organicmanpl CC0 | 194334 Chiado brass band, sonosferapt CC BY |
| Karusellin urut | 126661 carnival merry-go-round, alienistcog CC0 | 510259 Manège Vogue des Marrons, Naïma CC0 |
| Järvi / puisto | 192092 City park summer evening, klankbeeld CC BY | 175273 city pond ducks, mdsn CC0 |

Puutteet: Himmelskibetille ja Gyldne Tårnille ei löytynyt omaa ääntä (vain yleinen funfair-kirkuna); Freesoundin haku on konjunktiivinen, joten pitkät hakulauseet palauttivat 0 → lyhyet 1–2 sanan haut. Esikuuntelut ovat mp3-hq; lopullinen tiedosto tasoitetaan valinnan jälkeen (−30 LUFS maisema kertojan alle). Kuuntelematta minun puolestani (valinta on kuuntelupäätös).

## Päivitys: tasoitus ja vienti (PT:n kuittaus, ei kytkentää)
- Suositukset käyttöön; Himmelskibet = syntetisoitu tuulen suhina + kaukainen kirkuna (406824), Gyldne Tårn = pudotuksen kirkaisu (438420, 6 s yksittäinen).
- Ämpäri: `https://media.matkakirja.app/aanet/tivoli-v1/manifest.json` (200; 8 ääntä: tivoli-rutschebanen-kolina, -daemonen, -himmelskibet, -gyldne-torn-pudotus, -vakijoukko, -soittokunta-kaukainen, -karusellin-urut, -jarvi-puisto). Manifestissa paikka, lat/lon, kantama_m, silmukka, taso. Taso −30 LUFS (soittokunta −34, torni −24), huippu −9,3…−19 dBFS. Ääniportti läpi, 10 tiedostoa, virheitä 0.
- CC BY -nimeämiset: `nimeamiset-ehdotus.json` paketissa (YleArkisto 513923, klankbeeld 192092) → kytkijä lisää `data/aanilahteet.json`:iin kytkettäessä. Paketti `_valmiit/tivoli-v1-vienti-20261017/`, työ `_tyo/tivoli-aanet-20261017/tee.py`.

- **manifest-v2.json** (PT/LR 17.10.): karusellin urut → 55.67318 / 12.56807 (Svingkarrusellen); `https://media.matkakirja.app/aanet/tivoli-v1/manifest-v2.json` korvaa manifest.json:n (ämpäri ei ylikirjoita).
