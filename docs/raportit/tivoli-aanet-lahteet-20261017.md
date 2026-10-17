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
