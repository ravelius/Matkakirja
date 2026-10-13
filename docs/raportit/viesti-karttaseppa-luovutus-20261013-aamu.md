# Karttasepän luovutus 13.10.2026 aamu (konteksti täynnä)

Linjaukset ovat Raamatussa ja muistissa: `karttaseppa-tila-20261010-ilta.md` (päivän rivit) ja `ks-yoerat-oma-suositus-20261013.md`
(PT:n yöohje, oikeustarkistussääntö, 3D-sääntö, omistajan päätös 06.57).

## Käynnissä luovutushetkellä

- **Bryssel → Amsterdam → Krakova** ajossa peräkkäin (scratchpad `erat-10km.sh`, loki `erat-10km.log`; tulokset T7 `_tyo/karttaseppa/kaupunki-<id>-20261013/aja.log`).
  Valmistuttua jokaiselle: tarkistuskuva, maa-json:n lähdetiedot, vientipaketti, kippi-agentti, täydennys, toimitus LS1:lle (ks. alla "Kaupungin kaava").
- **Oslon ja Bergenin kippi-agentti** (Sonnet) kirjoittaa scratchpad `kippi/luonnos-{oslo,bergen}.json`. Maa ja puut ovat ämpärissä (Julkaisija 07.18).
  Oslo/Bergen-kansiossa LUEMINUT.md puuttuu vielä.

## Valmiit kaupunkipaketit (LS1:llä)

Lontoo, Praha, Wien, Rooma, Berliini, Kööpenhamina, Helsinki, Barcelona, Lissabon, Madrid, Marseille, Ljubljana, Granada, Budapest, Firenze, Edinburgh, Dublin
(+ Oslo ja Bergen ilman aukioita). Jokaisessa: maa ja puut ämpärissä (kartta/korkeus/v1, kartta/puut/v1), T7:llä kadut, yövalot, ikkunat, rakennukset,
vesi (pinta + maski), reitit (veneet, ratikat, lautat) ja kippi-aukiot + LAHTEET.md. LS1:n Paketit-rivit: (id, origo sallitut.js, 8000).

Oikeustarkistus: T7 `_tyo/karttaseppa/oikeustarkistus-20261013.md` (rivi per kaupunki; liite `-fop-uk-cz-at.md`). Omistaja 13.10. 06.57: "Ei tämä ole
kaupallista kuvaamista" → kulttuuriperintölakien kuvausrajoitukset eivät estä; tekijänoikeussääntö pysyy (suojatut ei omina 3D-malleina; 70 v, Espanja 80).

## Kaupungin kaava (T7 `/Volumes/T7 4TB/Matkakirja-karttaseppa/vesimaski/`)

1. `zsh kaupunkipaketti.sh <id> <lat> <lon> <geofabrik-polku> [oikea|vasen] [--meri]` (Mapterhornissa laserkeilattu DTM) tai `kaupunkipaketti-dsm.sh` (ei DTM:ää → GLO-30-arvio).
   Kattavuus: `proto-3d/_lahteet/mapterhorn/attribution-20261012.json`. Ei DTM:ää: Italia (paitsi pohjoiset alueet), Unkari, Irlanti, Kreikka.
2. Scratchpad `tarkistus-kaupunki.py <K> <id> "<lahde>" "<tarkkuus>" "<krediitti>"` → maa-json:n lähdetiedot + tarkistuskuva (katso silmin).
3. Vientipaketti `_valmiit/kaupunki-<id>-vienti-<pvm>/` (maa + puut, LAHTEET.md CHM-laattoineen `aja.log`:n "CHM-laatat"-riviltä) → `vie-paketti.sh --kuiva` → Julkaisijalle.
   ÄLÄ curlaa viemättömiä polkuja.
4. Kippi: Sonnet-agentti (prompti-malli: tämän session agentit; lähdesäännöt robots.txt:n mukaan, vain /wiki/-sivut) → `kippi-taydenna.py` → `kippi-kamera-ulos.py`
   → scratchpad `kamera-rakennus.py` (kaikki 4/4 vapaita) ja vesimaskitarkistus → `kippi-lahteet.py` → rivi oikeustarkistukseen → LUEMINUT.md → LS1:lle.
   Puuttuva monumentin koordinaatti: OSM-rakennuksesta/puistosta (merkitse kenttään).

## Jono (sallitut.js)

10 km: Bryssel, Amsterdam, Krakova (ajossa), Sevilla, Sofia, Bukarest, Tampere, Vilna, Valletta, Ateena (7 km), Košice, Luxemburg, Venetsia (3 km), Islanti (3 km), Sisilia (20 km), Kreeta (15 km).

## Muuta

- Vuoristokerros: PR #4537 mergetty (--naytetaso, --dem-normaalit, korostusvara.mjs); pilotti 6 vahvistettu (LS2). Koko ajo (~16 Gt) EI nyt (PT).
- Juna 186: proto `karttaseppa/mallinimet-pallot-186` 6a69acbec (erikoismallien nimet väistävät palloja) PT:llä.
- Worktreet: `wt/karttaseppa-linssiaineistot` ja `wt/karttaseppa-maasto-mapterhorn` poistettavissa (PR:t mergetty); `wt/karttaseppa-maasto-tasanaytteet` = aja-vuoristo.sh:n W;
  proto `wt/proto-karttaseppa-mallinimet`.
- Pääkaupungit: Codexin e04 yhä kesken (12.10. tilanne 1/93).
