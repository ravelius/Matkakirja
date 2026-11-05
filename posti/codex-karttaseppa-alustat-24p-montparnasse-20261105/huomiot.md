# montparnasse — 24p alusta #2152, 5.11.2026

Uusin jatkotilaus: posti/karttaseppa-codex-alustat-24p-jatko-20261105.md, commit f2182102d5144e0c319de44ac5d3813006d72725, blob 2fa160585ae9beac3e354fc03d5dff1b5da0515e. Kolme lähdeversiota luettu; kaksi aiempaa säilytetty historiana. Riemukaaren pelikuvahyväksyntä vapautti tämän jatkon. TILAUS-24p:n vanha Eiffel/Grand Palais-poissulku on korvattu uusimmalla postilla.

Yksi ImageGen-kutsu ja yksi kokonaan uusi natiivikuva, ei uusintoja. Vain maapohja, ei 3D-mallin tai rakennuskuvien muutoksia. RGB 1536 × 1024, pohjoinen ylhäällä. V7-lähdekartat ja SHA256-manifesti varmennettu.

## Tulos ja poikkeamat
Montparnassen koko sallittu alue on yhtenäistä kiveystä myös tulevan tornin alla. Sinisen jalanjäljen suorakulmiota, rakennusta tai puutarhaa ei jää pohjaan. Koillis–lounainen katu, pohjoisen kaarre, lännestä tuleva liittymä ja kaakkoon jatkuva bulevardi ovat paikoillaan ja liittyvät silmämääräisesti ulkopuoliseen karttaan. Itäisen kolmion vanha kattotahra on poistunut. Asema ja hautausmaa maskin ulkopuolella säilyvät pikselilleen. Kiveyksen kuvio näkyy vaaleana pintana; pienet rasterisauman sävy-/viivaerot on tarkistettava pelissä, täydellistä saumattomuutta kaikilla zoomtasoilla ei väitetä. Valokuvat tukevat kovapintaista kaupunkiympäristöä mutta eivät varmista jokaisen suurennetun pelialueen maanpinnan yksityiskohtaa.

Kokonais-QA: PASS tämän 2D-pohjan tarkistuksissa. Pelissä saumattomuutta, vastaanottajan/omistajan hyväksyntää, runtime-kytkentää tai julkaisua ei väitetä.

## Häviötön ulkoreunakooste
Natiivi muutti maskin ulkopuolelta 1516767 pikseliä. Omistajan aiemman häviöttömän reunakopioinnin luvan ja koneellisen maskikoostamisen työohjeen nojalla palautettiin vain mustan maskin ulkopuoli alkuperäisestä pyyhitty.png:stä. Ulkopuolella 0 muuttunutta pikseliä / 1516870; valkoisen maskin sisällä 0 muuttunutta pikseliä / 55994 natiiviin verrattuna. Ei sisäosan piirtämistä, skaalausta, värisovitusta, sulautusta tai inpaint-korjausta. Ulkopuolen täsmällisyys ei yksin todista sisäpuolisten katuviivojen saumattomuutta.

Natiivi SHA256 `f725f079e2a0b5a9a9939f3724a06316d633a2a899767486c61cb6a99eb7c134`; toimituskooste `c1a8d41775d6fd6c1e8bae6fe998e4f55296f308c247ccc2c1f99817ee7cd739`. Natiivi säilyy originals-kansiossa, vanhat kuvat ennallaan. Kehote/viitteet `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/alustat-24p-jatko-2149-2155-20261105/montparnasse/prompts/pohja-uusi.json`, QA `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/alustat-24p-jatko-2149-2155-20261105/montparnasse/qa/`, koostamiskoodi `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/alustat-24p-jatko-2149-2155-20261105/workflow.py`. Sisäänrakennettu image_gen, ei maksullista varareittiä. Mahdollisesta seuraavasta otosta viestitään Karttasepälle ennen käynnistystä.
