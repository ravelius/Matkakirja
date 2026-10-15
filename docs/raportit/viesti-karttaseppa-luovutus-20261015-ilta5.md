# Karttasepän luovutus 15.10.2026 klo 23.1x (PT: konteksti 31 %, ei uusia isoja eriä)

Linjaukset: Raamattu + muisti `karttaseppa-tila-*`. VIESTIT aina `send_message` session id:llä tiedostosta
`/Users/Shared/Claude/osoitekirja.md`, PT:lle ≤ 3 riviä. Edellinen luovutus: `viesti-karttaseppa-luovutus-20261015-ilta4.md` (030ffc87c).

## Aloitusviesti uudelle sessiolle

> Olet Karttaseppä (Opus, high). Aja git fetch origin, lue CLAUDE.md ja `git show <SHA>:docs/raportit/viesti-karttaseppa-luovutus-20261015-ilta5.md`
> KOKONAAN (haara karttaseppa-tyo-20260922). Viestit send_messagella id:llä (osoitekirja.md), PT:lle ≤ 3 riviä. JONO ON TYHJÄ: rivi PT:lle "JONO TYHJÄ: Karttaseppä".

## 1. Avoimet

Ei avoimia töitä eikä PR:iä. Worktreet: ei yhtään (kaikki poistettu). Jono tyhjä (PT 23.1x).

## 2. Tämän vuoron valmiit (kaikki kuitattu PT:lle)

| Erä | Toimitus |
|---|---|
| Web PR #4657 (aloituskartan 5 pienoismallia) | MERGETTY 6ae564a0c (PT:n lupa), worktree poistettu; myös vanha wt `karttaseppa-paakaupungit-pysakeiksi-193b` (mergetty #4612) poistettu |
| ISS-ilmiöt (edellisen luovutuksen avoin) | Siirtoseppä teki: `siirtoseppa/iss-ilmiot-196` 70883ee13 sisältää Valosepän tulivuoriajat + Florencen ARVIO-merkinnän |
| Mapterhorn / Kaikki maat -tila (PT) | Kehityskaupungit valmiit (Lontoo EA 1 m, Praha ČÚZK; Ateenalle ei avointa DEM:iä); Alpit/Norja odottaa matalaa vuoristonäkymää; Euroopan pääkaupungeilla kaikilla kohdekartta (106 pisteestä puuttuu vain LKA Kotte) |
| Kaupunkipaketit 11 uudelle pääkaupunkipysäkille (PT 21.2x) | maa ±8 km 4 m + puut 8 km, paketti `proto-3d/_valmiit/kaupunki-paakaupungit-11-vienti-20261015` (111 Mt, 44 tiedostoa), Julkaisija VIENYT 22.19 (44/44, CDN 200). Mapterhorn 1 m: Bern, Vaduz, Monaco, Bratislava; GLO-30-arvio: Podgorica, Tirana, Skopje, Chișinău, Belgrad, Zagreb, Minsk. OPAS_SALLITUT-listaan EI lisätä ilman omistajaa (PT) → paketit odottavat ämpärissä |
| ISS-minipallon pisteet (omistaja 22.40, NUI:n muoto) | natiivi `karttaseppa/minipallo-pisteet-196` 0e5565382 → NUI mergesi nimet-196:een (a67af930e). 383 pistettä: 197 pääkaupunkia (+ Jerusalem hallinnon paikkana) + 186 laudan kaupunkia, tarkeys 1–3 maan väkiluvusta (Wikidata P1082), 70 "kohde"-linkkiä kohdevalikkoon |
| Löydös → web PR #4675 | 11 junien 193/193b pääkaupunkipysäkiltä puuttui PALLON_KAUPUNKIPISTEET (Bratislava 81, Bern 78, Podgorica 75, Zagreb 23 km väärässä paikassa pallolaudalla). MERGETTY 97e32a8e1 (PT:n lupa), ei versionostoa |

## 3. Työkalut ja polut

- `T7 vesimaski/kaupunkipaketti-maapuut.sh <nimi> <lat> <lon> <mt|dsm> <geofabrik-alue>...` (vain maa + puut; rajakaupungille useampi alue → `puut-yhdista.py`).
- Ajo, krediitit, vienti ja varjokuvat: `T7 vesimaski/ajot/paakaupungit-20261015/` (`aja.sh`, `kaupungit.txt`, `krediitit.py`, `vienti-paakaupungit.py`, `varjo-*.jpg`).
- Mapterhorn z14 -kattavuuden tarkistus: GET (ei HEAD, User-Agent pakollinen, muuten 403) `tiles.mapterhorn.com/14/x/y.webp`; Balkan, Moldova ja Valko-Venäjä 404.
- ISS-pisteet: `proto-3d/_tyo/karttaseppa/iss-pienoispallo-20261015/kokoa-minipallo.mjs` (+ vanhempi `kokoa-pisteet.mjs` kaikki lajit).
- Natiivihaaran commit ilman checkoutia: tilapäinen `GIT_INDEX_FILE` + `read-tree` + `hash-object -w` + `update-index --cacheinfo` + `commit-tree` (Unity-.meta uudella guidilla).

## Muistiinpanot

- `/Users/Shared/Claude/proto-3d/_tyo` on symlinkki T7:lle (`/Volumes/T7 4TB/koodaus/proto-3d/_tyo`). T7 97 % täynnä (147 Gt vapaana 15.10.).
- Pelin Etelä-Sudanin koodi on SDS (ISO SSD) — huomioi Wikidata-hauissa.
- zsh: `git show "natiivi-ui/nimet-196:polku"` toimii, mutta `"$B:Assets…"` EI (`:A`-muokkain) → `"${B}:…"`.
