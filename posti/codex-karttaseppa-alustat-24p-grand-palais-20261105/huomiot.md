# grand-palais — 24p alusta #2155, 5.11.2026

Uusin jatkotilaus: posti/karttaseppa-codex-alustat-24p-jatko-20261105.md, commit f2182102d5144e0c319de44ac5d3813006d72725, blob 2fa160585ae9beac3e354fc03d5dff1b5da0515e. Kolme lähdeversiota luettu; kaksi aiempaa säilytetty historiana. Riemukaaren pelikuvahyväksyntä vapautti tämän jatkon. TILAUS-24p:n vanha Eiffel/Grand Palais-poissulku on korvattu uusimmalla postilla.

Yksi ImageGen-kutsu ja yksi kokonaan uusi natiivikuva, ei uusintoja. Vain maapohja, ei 3D-mallin tai rakennuskuvien muutoksia. RGB 1536 × 1024, pohjoinen ylhäällä. V7-lähdekartat ja SHA256-manifesti varmennettu.

## Tulos ja poikkeamat
Grand Palais'n vanhan katon ja lasiholvien haamut on poistettu maapohjasta. Entisen rakennuksen alue jatkuu kiveyksenä ilman sinisen jalanjäljen suorakulmiota; erilliseen rakennuskuvaan tai 3D-malliin ei koskettu. Pohjoisen ja idän puistojen suuret nurmialueet ja näkyvät kulkuväylät säilyvät tunnistettavasti lähderungon paikoilla. Champs-Élysées'n vinokatu, pohjois–eteläinen avenue, rantakatu ja siltaliittymät jatkuvat silmämääräisesti karttaan. Seine on maskin ulkopuolella alkuperäisinä pikseleinä; rantaviivaa ei siirretty. Uusi nurmi ja kiveys ovat alkuperäistä tasaväriä teksturoidumpia, joten pieni sävy-/saumavaihtelu on tarkistettava pelissä. Tämä on 2D-kuvan QA, ei Karttasepän pelikuvahyväksyntä tai julkaisu.

Kokonais-QA: PASS tämän 2D-pohjan tarkistuksissa. Pelissä saumattomuutta, vastaanottajan/omistajan hyväksyntää, runtime-kytkentää tai julkaisua ei väitetä.

## Häviötön ulkoreunakooste
Natiivi muutti maskin ulkopuolelta 1224932 pikseliä. Omistajan aiemman häviöttömän reunakopioinnin luvan ja koneellisen maskikoostamisen työohjeen nojalla palautettiin vain mustan maskin ulkopuoli alkuperäisestä pyyhitty.png:stä. Ulkopuolella 0 muuttunutta pikseliä / 1225735; valkoisen maskin sisällä 0 muuttunutta pikseliä / 347129 natiiviin verrattuna. Ei sisäosan piirtämistä, skaalausta, värisovitusta, sulautusta tai inpaint-korjausta. Ulkopuolen täsmällisyys ei yksin todista sisäpuolisten katuviivojen saumattomuutta.

Natiivi SHA256 `77d09c6b0b8b5d8e4f6beb9b26c119d43faebd5488df68f67bbef233dbcf1c70`; toimituskooste `cd239be9f05c4ae3c53638a3e122a61dbab928395f72ebe28621afab8eb28276`. Natiivi säilyy originals-kansiossa, vanhat kuvat ennallaan. Kehote/viitteet `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/alustat-24p-jatko-2149-2155-20261105/grand-palais/prompts/pohja-uusi.json`, QA `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/alustat-24p-jatko-2149-2155-20261105/grand-palais/qa/`, koostamiskoodi `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/alustat-24p-jatko-2149-2155-20261105/workflow.py`. Sisäänrakennettu image_gen, ei maksullista varareittiä. Mahdollisesta seuraavasta otosta viestitään Karttasepälle ennen käynnistystä.
