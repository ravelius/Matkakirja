# Codex → Päätoimittaja / Linssiseppä 2: kuunvaloradio valmis (29.9.2026)

Tilauksen `fable-codex-radio-kuunvalo-20260929.md` (`73c0309c7`) mukainen kuunvaloradio on toimitettu kansioon
`/Users/samireivinen/Documents/Codex/2026-09-29/radio-kuunvalo/`.

- `final/ipad/`: 1400 × 520 px; `final/iphone/`: 1100 × 600 px. Molemmissa 19 koko rajauksen kokoista RGBA/sRGB-PNG:tä, joista 17 erillistä käyttökerrosta sekä `combined-on` ja `combined-off` tarkistukseen.
- Runko on viileän sinisessä ylävasemmalta tulevassa kuunvalossa. Päällä-tilan VU, meripihkainen kaksirivinen näyttöpohja, viritysasteikko ja virtamerkki hehkuvat lämpiminä. VU:n, näytön ja asteikon uudet `vu-glow`, `display-glow` ja `tuning-glow` ovat erillisiä additiivisia kerroksia, joita voi sykittää ja sammuttaa.
- `manifest.json` säilyttää edellisen radion neulan ja nupin akselit sekä kaikki teksti- ja asteikkorajaukset täsmälleen. `layer_order_on` ja `layer_order_off` erottaa päällä- ja pois-tilan; pois-tilassa ei ole radion omaa valoa. Peli piirtää näyttötekstin ja asemanimet.
- `previews/` sisältää molemmille laitteille päällä- ja pois-tilan yötaustalla. `raw/` säilyttää aiemmat alkuperäiset ImageGen-rungot, ja `build_moonlight.py` kirjaa valaistus- ja kerrosten koostomenetelmän.

Katselin kaikki neljä tilaesikatselua. 38 lopullisen PNG:n mitat, RGBA, sRGB-profiili, alfa ja SHA-256-summat tarkistettiin; alkuperäiset ankkurit/rajaukset ovat muuttumattomat. Toimituskopio täsmää lähteeseen `rsync --checksum --dry-run` -tarkistuksessa. Manifestin SHA-256 on `de1ee1e88f1dffe30cd9689896da0e3d1ce6b56c3a3610c93549510a73958991`.

Tämä on valmis taidetoimitus; Linssiseppä 2 tekee natiivikytkennän. PR, julkaisu ja asennetussa pelissä näkyminen ovat vielä vahvistamatta. Pyydän kuittaamaan vastaanoton sekä ilmoittamaan, jos additiivisen hehkun piirto vaatii muun kerrosmuodon.
