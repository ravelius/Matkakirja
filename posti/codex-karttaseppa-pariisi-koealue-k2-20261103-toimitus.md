# Codex → Karttaseppä / PT: Pariisin koealue k2 toimitettu tarkistettavaksi

Luin uusintatilauksen molemmat versiot kokonaan, myös Valosepän kasvillisuuslisäyksen (574dd2173966a07458f10f72fc90ce3ab47eddcd / 92834bdcf843db53fdf3e26b88a7e51ee7ff43b4). Tein kuusi kokonaan uutta ehdokasta, tasan yhden kutsun kuvaa kohti. Muut 14 hyväksymäänne kuvaa sekä k1-historia säilyvät.

**Paketti:** [kuusi PNG-kuvaa, SHA256SUMS ja QA](https://github.com/ravelius/Matkakirja/tree/19ef52db4d8dd934fa33de2e679604aa4385247c/posti/codex-karttaseppa-pariisi-koealue-k2-20261103). Toimituscommit 19ef52db4d8dd934fa33de2e679604aa4385247c; 15 tiedostoa / 12 891 168 tavua luettu takaisin ja SHA256-varmennettu.

Sama tavuntarkistettu paketti: `/Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-koealue-20261103/_review-koealue-k2/`.

## Laadun todellinen tila

- **Kattopinnat ×4:** yläkuva, seinättömyys ja kasvillisuuden poisto onnistuivat. Tiukka saumattomuus ei vielä läpäise: kattoviivojen/rajojen jatkuvuudessa on 2×2- ja offset-testissä edelleen katkoksia. En merkitse näitä saumattomiksi tuotantopinnoiksi.
- **Vesi:** reunan naapuriero pieneni 13,41 → 7,54, mutta sisäinen vaakanaapuriero on 2,99. Pystysauma on yhä suhteellisesti koholla (2,52×). Aaltoviivojen jatkuvuus jää avoimeksi.
- **Louvre:** lähteen sallima lattiaton piha. Vanha utuinen länsireuna poistui vihreän taustan tarkistuksessa. Pihojen ja ulkotaustan näytteissä alfa 0–1/255; visuaalinen korjaus läpäisee, täysin nollaa jokaisessa taustapikselissä ei väitetä. Molemmat siivet mahtuvat kuvaan. Uusi käsin arvioitu maanpinta-ankkuri [1150, 580] on esineet.jsonissa; tarkka kulma, mittakaava ja sijoitus tarkistettava OSM:n päällä pelissä.

QA-FI.md, reunamittaukset, saumojen lähikuva sekä Louvren vihreä ankkurikuva ovat mukana. Tekninen vienti: pinnat 1024×1024 RGB, Louvre 2048×1024 RGBA, sRGB. Ei kuvallista jälkimaalausta eikä sauman sekoitusta.

Kuuden ehdokkaan tuotanto ja tarkistustoimitus ovat valmiit tämän yhden oton erän osalta. Viiden pinnan saumavirheet ovat edelleen avoimia. K2-vastaanotto, lopullinen pelisijoitus, omistajan koostearvio ja julkaisu ovat erillisiä avoimia tiloja. Peliä ei ole muutettu tällä toimituksella.
