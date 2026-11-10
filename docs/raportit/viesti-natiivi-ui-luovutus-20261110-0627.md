# Natiivi-UI: luovutus 10.11.2026 klo 06.27 (kontekstivahti 25 %; korvaa -20261110-0250:n)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, NS (Natiiviseppä) id osoitekirjasta.
Natiivirepo /Users/Shared/Claude/proto-3d/Matkakirja-proto (remote natiivi-backup), oma worktree /Users/Shared/Claude/wt/proto-nui-hetki
(vapaa, haara natiivi-ui/pulu-kupla-translate = juna-224 77b1641de). Tarkistus `sh Linssit-testit/unity-tarkistus.sh`, testit `sh Linssit-testit/kaanna.sh`.
Skenaariot /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/, lokit /Users/Shared/Claude/proto-3d/lokit/. Mac-esikatselu vain JU:n vuorolla (pyyntö JU:lle).

## 1. TEHTY (kaikki junassa 224; -0250:n kohdat 1–3 tehty, ÄLÄ TOISTA)
- Nostopalkki fcac5c135; hetki/skandaali/syvennys-Pulu; Pulun valmiit v5 → v6 (b74bdcd31; v6 ämpärissä; versio PuluValmiitLataus.Versio,
  kehittäjän juuri `ui pulu valmiit juuri file:///…/v6/|pois`).
- Pulun kuplan avaussiirtymä (997fcfaff: mk-auki vasta 1. GeometryChangedEventin jälkeen, PuluKuplat.AvaaSiirtymalla) + kuplamitta-koekuplan
  hyppy (77b1641de). Mittaus `ui pulu kuplamitta`; ruudut tallenteella: `tallenne-alku x 50 1206` + `odota-peli 2.5` (ui-komento luetaan
  1 s PELIAJAN välein; lyhyt tallenne loppuu ennen komentoa). Raportit lokit/nui-kupla-avaus-2/-3.
- Versiorivi 4ab1852b2 laitekuvalla valmis (PT 04.4x), lokit/nui-valikko-versiorivi-ipad-77b1641de.

## 2. SEURAAVA ERÄ (PT 06.4x, Kaupungit-kärki, omistajan pyyntö 06.23) — ALOITTAMATTA
Omistajan kuvat (iPhone, Pariisi): docs/raportit/kaappaukset/omistaja-20261110/0623-kierto-1…3.png (Matkakirja-repo, origin/main). Aarteen 3D-tähti:
(a) Tähti on nyt UI-kuva maapisteen yllä +34 px → liukuu kierrossa ja piirtyy rakennusten päälle. Tee 3D-taulu (billboard) kohteen paikalle
    syvyystestillä: peittyy, kun rakennus on edessä.
(b) Alussa valkoinen neliö, kunnes 72 tähtiruutua latautuvat → esilataa ruudut Pariisiin tultaessa.
NS lähettää havaintonsa ja tiedostot (odota/lue viesti). Oma haara juna-224:n kärjen päälle (natiivi-ui/aarre-tahti-3d). Mac-pari kierrosta
(sama kohta, Notre-Damen edessä/takana) PT:lle. NS tekee samaan aikaan kiertopisteen: ÄLÄ KOSKE KameraTappiin.
Lähtökohtia (grep, ei vielä luettu): NostotKartalla.cs, LaattaIkoni.cs ("star" → kohtaamiset/aarteet/aarre-maailma-star.jpg).

## 3. Muuta
- Jono kohdan 2 jälkeen tyhjä → rivi PT:lle "JONO TYHJÄ: Natiivi-UI".
