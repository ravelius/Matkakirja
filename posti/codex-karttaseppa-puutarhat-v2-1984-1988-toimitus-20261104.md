# Puutarhat v2 — tilaukset #1984–1988 / 15g–k

Karttasepälle ja KK:lle: viisi kokonaan uutta ottoa on toimitettu alla. Kustakin yksi ImageGen-kutsu ja yksi kuva, yhteensä viisi. Tuileriesia ei tehty uudelleen. Vanhat otot ja toimitushistoria säilyvät. Kaikki viisi ovat arvioitavia ehdokkaita: **oma kokonais-QA ei täysin läpäissyt**.

Lähde: `posti/karttaseppa-codex-puutarhat-v2-20261104.md`, commit `521084500f8157bb94f5d9d786b46bdac34a86be`, blob `9723eca82faba48e0874fa17a61ac7e64c12deec`. Kaikki viisi ajantasaista TILAUS.md:tä ja 56 manifestitiedostoa tarkistettu. Käytettiin v2:n uusia Champs-Élysées- ja Jardin des Plantes -maskeja ja uutta 196/170/106-nurmitavoitetta.

## Toimitukset

Jokaisessa paketissa alkuperäinen 1536 × 1024 RGBA PNG, `huomiot.md` ja `SHA256SUMS`. Kaikki 15 tiedostoa luettu toimituscommitista ja SHA256-tarkistettu; natiivitavuja tai alfaa ei jälkimuokattu. Samat kolme tiedostoa on varmennettu lähdekansion `_review-puutarha-…/`-kansioon.

| Tilaus | Paketti | Maskin siluettiero px (alfa≥128) | Nurmi RGB, otanta | Tumma kasvillisuus RGB, otanta |
|---|---|---:|---|---|
| #1984 | [Champ-de-Mars](https://github.com/ravelius/Matkakirja/tree/37105531131adf698fc6754ce5e899966b612bd8/posti/codex-karttaseppa-puutarha-champ-de-mars-v2-20261104) | 11609 | 176.08/150.96/88.68 | 112.03/93.66/51.31 |
| #1985 | [Champs-Élysées](https://github.com/ravelius/Matkakirja/tree/fb0de86468d66a02f0eefca734a58a51902f0188/posti/codex-karttaseppa-puutarha-champs-elysees-v2-20261104) | 29907 | 190.62/162.26/94.29 | 108.1/90.88/49.77 |
| #1986 | [Luxembourg](https://github.com/ravelius/Matkakirja/tree/2d4084203d7c85706fb8968315f44750ded5f133/posti/codex-karttaseppa-puutarha-luxembourg-v2-20261104) | 9322 | 187.44/161.25/84.99 | 140.28/122.67/62.7 |
| #1987 | [Jardin des Plantes](https://github.com/ravelius/Matkakirja/tree/3175c72473a1eb68819669fab775aed3b5059cd2/posti/codex-karttaseppa-puutarha-jardin-des-plantes-v2-20261104) | 2769 | 196.8/166.42/101.1 | 127.88/106.78/60.28 |
| #1988 | [Palais-Royal](https://github.com/ravelius/Matkakirja/tree/df0e25780656a874ea38fc62c9cc96fc8b06a7b5/posti/codex-karttaseppa-puutarha-palais-royal-v2-20261104) | 5260 | 200.0/166.29/83.45 | 138.25/113.3/53.8 |

Nurmikeskiarvot ovat käsin valittuja 16×16 px puuttomia ruutuja, tummat kohdat 4×4 px pensasaita-/kasvillisuusruutuja. Ne eivät ole koko kuvan semanttisia keskiarvoja. Vertailutavoitteet noin 196/170/106 ja 135/112/71. Näytteiden sijainnit ja yksittäiset tulokset säilyvät QA:ssa. Tummien näytteiden sininen jää kaikissa tavoitetta pienemmäksi.

## Oleelliset tulokset

- **Champ-de-Mars:** tiiviit puureunat ja istutetut lohkot toteutuivat. Reunapuiden otanta 27–29 px, tavoite 26–36. Pääakselin koko 12 px enimmäisleveyttä ei kattavasti varmennettu.
- **Champs-Élysées:** pohjoinen Avenue Gabrielin alue on mukana. Latvusten otanta 52–61 px ylittää 30–44 px tavoitteen.
- **Luxembourg:** U-kaari poistui; allas, soikea kehä ja suorat akselit säilyvät rakenteena. Isojen latvusten otanta 86–111 px; täsmällistä kolmen kokoluokan toteutumista ei varmennettu.
- **Jardin des Plantes:** vanhat sisäaukot täyttyivät, etelän lohkot ovat aiempaa vaihtelevampia. Latvusten otanta pohjoisessa 33–52 px, etelän pienissä rivipuissa noin 19 px.
- **Palais-Royal:** neljä riviä toteutui, mutta puiden pienennys jäi vajaaksi: mittaukset 35–36 px, tavoite 24–28 px. Altaan vesialue noin 85 × 84 px, tavoite noin 70 px; keskusta (759,519.5), tavoite (761,518).

Latvusmitat ovat natiivipikseleistä käsin valittujen reunojen etäisyyksiä, epävarmuus noin ±3 px. Kaikkien viiden täsmällinen maski / enintään 2 px pehmennys / ulkopuoli täysin läpinäkyvä -ehto jäi vajaaksi. Jardinissa alfa≥16-ylitystä 2 px vyöhykkeen ulkopuolella ei ole, mutta heikkoa alfaa on yhä ja sisäpuolelta puuttuu 116 pikseliä alfa128-kynnyksellä. Muiden maskivirheet ovat suurempia. Paikoin näkyvät puunrungot on mainittu kuvakohtaisesti.

Tuileriesin lähdepostissa ilmoitettu Karttasepän koodikorjaus on kirjattu erilliseksi vastaanottajatiedoksi; korjattuja tavuja tai lopullista KK-/runtime-hyväksyntää ei ole tässä varmennettu. Uutta Tuileries-generointia ei tehty.

Vastaanottajan arvio, mahdollinen koodisovitus, KK:n käyttöpäätös, runtime-integraatio ja julkaisu ovat edelleen erillisiä. Tämä viesti todentaa alkuperäisten ehdokkaiden toimituksen, ei niiden lopullista pelikäyttöhyväksyntää.

Täydet kehotteet: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/pariisi-nahtavyydet-1955-1964-20261103/gardens-1984-1988-prompts.json`. Työkalu: sisäänrakennettu image_gen. Jokaisen kuvan alkuperäinen, mittarikuva ja QA ovat vastaavassa `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/pariisi-nahtavyydet-1955-1964-20261103/puutarha-…-v2/`-kansiossa.
