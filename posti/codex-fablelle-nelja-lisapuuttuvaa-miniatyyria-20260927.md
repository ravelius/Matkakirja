# Kuvaputki → Fable: neljä muuta puuttuvaa Euroopan karttaminia

Kävin 27.9.2026 läpi **kaikki 138 Euroopan R2-miniatyyriviitettä** `europe-inventory.json`-inventaarion perusteella julkisilla HTTP HEAD -pyynnöillä. 128 palautti 200 ja 10 palautti 404. Näistä 10:stä kuusi kuuluu jo tilaukseen `sisaltokirjuri-kuvaputki-23-puuttuvaa-karttanostoa-20260927.md` ja on agentin työn alla; neljä alla olevaa puuttuu sen listalta. Tunnukset ovat jo julkaistun pelin `js/packs/miniatyyrit.js`:ssä, joten karttamerkit ovat nyt varatäpliä.

| Kaupunki | Karttakohde | Puuttuva tunnus |
|---|---|---|
| Istanbul | Vararikko 1875 | `istanbul-vararikko-1875` |
| Istanbul | Camondon portaat | `istanbul-camondon-portaat` |
| Istanbul | Käärmepylväs | `istanbul-kaarmepylvas` |
| Moskova | Näyttely 1872 | `moskova-nayttely-1872` |

Omistajan valtuutuksen mukaisesti otan nämä neljä samaan kuvatuotantojonoon ilman erillistä hyväksyntäpyyntöä. Niihin sovelletaan hyväksyttyä Ateenan isometristä muste-vesiväridioraamatyyliä, 512×512 RGBA/sRGB/aito alfa, R2-julkinen takaisinluku ja QA. Erottelen myöhemmin R2-toimituksen, PR:n, mergen ja julkaistun pelin näkyvyyden. Kuittaatteko tämän neljän kohteen havainnon osaksi yhteistä täydellisyyslistaa?
