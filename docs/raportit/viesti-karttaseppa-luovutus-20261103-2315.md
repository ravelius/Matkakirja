# Karttaseppä: luovutus 3.11.2026 klo 23.15 (KS)
Edellinen: 33e069bb4:docs/raportit/viesti-karttaseppa-luovutus-20261103-2300.md (PR 6230 avoin; vain tausta, tämä korvaa sen AVOIN-listan). Syy: konteksti 25 % (7.37).
Y = `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-ylaviisto-20261103/` (python `/opt/homebrew/opt/python@3.14/bin/python3` ilman -I:tä),
R = `/Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-nahtavyydet-20261103/`. Codex-posti: wt/karttaseppa-postilaatikko, `git fetch origin claude/postilaatikko` + `git checkout --detach FETCH_HEAD`.
**Aja heti vahti:** `Monitor` komennolla `zsh Y/vahti.zsh` (ilmoittaa ensin kaikki jo tulleet toimitukset; käsiteltyjä ovat kaikki paitsi uusi Sainte-Chapelle). Taustaajot pid 65143 (tasankoketju) ja 68441 (esittelypaikkasilmukka).
Tilataulukko: Y/TILANNE-nahtavyydet.md (päivitä).

## TILA
| Kohde | Taso (Y/istuta-nahtavyys.py) | Tila |
|---|---|---|
| ND | k4 laiva kokonaan | KK hyväksyi sijoituksen; huippu v3 NS:n jonossa (ks. AVOIN 3) |
| Louvre | --skaala 0.91 --dx -60 --dy -30 | pelissä f5b3c3361 |
| Eiffel | --dx 30 --dy 30 | pelissä 9528c1d53 |
| Riemukaari | --skaala 0.71 | pelissä 9528c1d53 |
| Sacré-Cœur | --skaala 0.8 | pari PT:llä 23.00; KK:n vastaus odottaa |
| Opéra | --skaala 0.65 | pari PT:llä 23.00; KK:n vastaus odottaa |
| Grand Palais | --skaala 0.82 (EI automaattinen 0,64: G_BOX 71 px jättää tornit pois, G:n korkeus 87 px) | pari PT:llä 23.03 |
| Invalidit | --skaala 0.78 --dx -75 (kupoli oikealle pituuspiirille) | pari PT:llä 23.03; G:tä kapeampi |
| Panthéon | --skaala 0.75 | pari PT:llä 23.09; vesitestin 46 309 px on täytön vuoto (rakennus ~48,8504, ranta 48,8524) |
| Montparnasse | --skaala 0.82 | pari PT:llä 23.09 |
| Sainte-Chapelle | istuta-toimitetut.py osaa (G_BOX, ankkuri 48,8552 2,3450 arvio) | tilattu 3db298ebf, tilaus 13 |
| Sillat (6) | Y/leikkaa-silta-arkki.py → Y/tarkistus-sillat/ (sillat.json) | pari PT:llä 23.13 |

Hyväksytty taso + alue.json NS:lle suoraan (`<id>-taso.png`, `<id>-alue.json`). HdV, Oikeuspalatsi ja TSJ jäävät tavallisiksi kortteleiksi (NS poistaa Oikeuspalatsin vanhan kuvan, PT).
Kirjasto: `/Users/Shared/Claude/proto-3d/_kirjasto/kartta-osat/osakirjasto.py` (pitäjä KS; ohje skriptin alussa ja LUEMINUT.md).

## AVOIN (järjestyksessä)
1. **NS pyysi koko Pariisin `puut.json` + `esinepaikat.json`** (puut ja aukiot ovat nyt vain vanhalla koealueella; lupasin, polku NS:lle kun valmis). Generaattori `_tyo/karttaseppa/pariisi-koealue-20261103/esinepaikat.py` (rajaus W S E N rivillä 16, OSM-solut SOLUT rivillä 19, puut puut-20261010). Laajenna ElavaPariisi-rajaan 48,8150–48,9030, 2,2230–2,4710; kaikki solut `pariisi-pohja/osm/solu-*`; ulos uuteen kansioon, ei koealueen päälle.
2. **Nimet (PT:n 3):** natiivi-backup/karttaseppa/pariisi-nimet-219 c1832c0c2 NS:n 9528c1d53:n päällä (Pariisissa kadut + kaupunginosat × 0,65; pääkadut tasolta 15, tertiary 16, minor 17). EI käännetty täällä. JU:lle pyydetty ajo; odota kuvat, arvioi tiheys ja koko samasta kohdasta kuin esikatselu-20261103-225548/nd-keski.png, pari PT:lle. Kertoimet: ElavaNimet.Pisteet(luokka, pariisi), KadunRank, Tasot(luokka, rank, pariisi). Worktree wt/proto-karttaseppa-ruutu-218 on tällä haaralla.
3. **ND-hitunen (PT:n 5):** kaksi eri asiaa. (a) Huipun kärki irti: korjattu, Y/korjaa-nd-huippu.py → Y/tarkistus-nd-k4/laiva-kokonaan/nd-k4-laiva-kokonaan-savy-v3.png (Codexin alfa 228, kynnys 230), viesti NS:lle. (b) Tornin takana terävä vaalea kiekko (nd-keski.png ~1810, 545), HdV-kuvan alla: ND:n taso on siinä läpinäkyvä. Arvaus kaupunkimerkin levy, EI vahvistettu; NS:ltä kysytty. Katso seuraavasta kuvasta, kumpi PT:n hitunen oli.
4. KK:n vastaukset pareihin (Sacré-Cœur, Opéra, Grand Palais, Invalidit, Panthéon, Montparnasse, sillat, sitten Sainte-Chapelle) → hyväksytyt NS:lle; sillat kirjastoon (`lisaa --kopioi`, kattavuus yleinen), NS sijoittaa OSM:stä ja skaalaa (kannet yli tilauksen, pitkissä 6 kaarta).
5. **Korttelipinta:** VS hyväksyi jaon (838397956, LISÄYS): VS vie k5:n peliin, tekee julkisivureunan + musteen ja lähettää pelikuvan KS:lle säätöä varten (Y/kortteli-k5.py voima, muste). PT:n viestissä k5 → k11 kesken.
6. Taustaajot: tasankoketju (ketju.valmis / ketju.virhe; ranta-shardit etenevät) ja esittelypaikkasilmukka (ajo-muut.log 23.12: ok 123, Overpass 502 välillä, jatkaa). Jatkot: 2232-luovutuksen AVOIN 3 ja 19.40-luovutuksen AVOIN 4–5.
7. Vanhat: v7/v8 iso-pari (JU), pitkät ruudut.
