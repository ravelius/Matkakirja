# opera — 24p alusta #2150, 5.11.2026

Uusin jatkotilaus: posti/karttaseppa-codex-alustat-24p-jatko-20261105.md, commit f2182102d5144e0c319de44ac5d3813006d72725, blob 2fa160585ae9beac3e354fc03d5dff1b5da0515e. Kolme lähdeversiota luettu; kaksi aiempaa säilytetty historiana. Riemukaaren pelikuvahyväksyntä vapautti tämän jatkon. TILAUS-24p:n vanha Eiffel/Grand Palais-poissulku on korvattu uusimmalla postilla.

Yksi ImageGen-kutsu ja yksi kokonaan uusi natiivikuva, ei uusintoja. Vain maapohja, ei 3D-mallin tai rakennuskuvien muutoksia. RGB 1536 × 1024, pohjoinen ylhäällä. V7-lähdekartat ja SHA256-manifesti varmennettu.

## Tulos ja poikkeamat
Yhtenäinen kivipinta ulottuu koko alueelle ja mallin alle. Keskellä näkyvät viivat seuraavat lähtökartan julkista katu-/reunakivilinjaa, eivät sinisen jalanjälkisuorakulmion rajoja; eriväristä tyhjää mallipaikkaa ei ole. Pohjoisen poikittaiskatu, läntinen vinoyhteys ja etelän risteys säilyvät silmämääräisessä reunavertailussa jatkuvina, eikä selkeää ulkoreunan katkeamaa näy. Ei rakennuksia, ruohoaukioita, pystyobjekteja tai ohjemerkkejä. Kiveyksen yksityiskohtaisuus erottuu alkuperäisestä tasaisesta kartasta lähietäisyydeltä; pelissä toimivuus jää vastaanottajan tarkistettavaksi. Valokuva ei varmista kaikkia sivu-/pohjoisaukion kivisaumoja.

Kokonais-QA: PASS tämän 2D-pohjan tarkistuksissa. Pelissä saumattomuutta, vastaanottajan/omistajan hyväksyntää, runtime-kytkentää tai julkaisua ei väitetä.

## Häviötön ulkoreunakooste
Natiivi muutti maskin ulkopuolelta 1457889 pikseliä. Omistajan aiemman häviöttömän reunakopioinnin luvan ja koneellisen maskikoostamisen työohjeen nojalla palautettiin vain mustan maskin ulkopuoli alkuperäisestä pyyhitty.png:stä. Ulkopuolella 0 muuttunutta pikseliä / 1459811; valkoisen maskin sisällä 0 muuttunutta pikseliä / 113053 natiiviin verrattuna. Ei sisäosan piirtämistä, skaalausta, värisovitusta, sulautusta tai inpaint-korjausta. Ulkopuolen täsmällisyys ei yksin todista sisäpuolisten katuviivojen saumattomuutta.

Natiivi SHA256 `d296e4dafd4eb48d3f7ded310d10b46bb5501e9d5ee752aa89bd3d12a8fcd4ec`; toimituskooste `307edab84d3e1ff60d3d24f80fd81f0884a4c6a4babf6b7f760722eb861add49`. Natiivi säilyy originals-kansiossa, vanhat kuvat ennallaan. Kehote/viitteet `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/alustat-24p-jatko-2149-2155-20261105/opera/prompts/pohja-uusi.json`, QA `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/alustat-24p-jatko-2149-2155-20261105/opera/qa/`, koostamiskoodi `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/alustat-24p-jatko-2149-2155-20261105/workflow.py`. Sisäänrakennettu image_gen, ei maksullista varareittiä. Mahdollisesta seuraavasta otosta viestitään Karttasepälle ennen käynnistystä.
