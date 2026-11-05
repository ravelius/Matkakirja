# invalides — 24p alusta #2151, 5.11.2026

Uusin jatkotilaus: posti/karttaseppa-codex-alustat-24p-jatko-20261105.md, commit f2182102d5144e0c319de44ac5d3813006d72725, blob 2fa160585ae9beac3e354fc03d5dff1b5da0515e. Kolme lähdeversiota luettu; kaksi aiempaa säilytetty historiana. Riemukaaren pelikuvahyväksyntä vapautti tämän jatkon. TILAUS-24p:n vanha Eiffel/Grand Palais-poissulku on korvattu uusimmalla postilla.

Yksi ImageGen-kutsu ja yksi kokonaan uusi natiivikuva, ei uusintoja. Vain maapohja, ei 3D-mallin tai rakennuskuvien muutoksia. RGB 1536 × 1024, pohjoinen ylhäällä. V7-lähdekartat ja SHA256-manifesti varmennettu.

## Tulos ja poikkeamat
Esplanadin kuusi nurmialuetta, suora keskikäytävä, kaksi poikittaista yhteyttä ja eteläinen puoliympyrä säilyvät tunnistettavina samoilla paikoilla. Alapuolinen maa jatkuu mallin alla ilman tyhjää jalanjälkisuorakulmiota. Ei rakennuksia tai pystyobjekteja. Poikkeamat: etuosan viuhkapuutarhan pintakuvio jäi hyvin vaaleaksi, ja alaoikean puutarhan hienompi rakenne yksinkertaistui muutamaksi suoraksi nurmikaistaksi. Kaikkien alempien puutarhamuotojen tarkkaa säilymistä ei kuitata PASSiksi. Itäinen poikkikatu liittyy ulkoverkkoon, mutta saumaton pikselitarkka katuviiva jää vastaanottajan arvioon. Maapinnan pesu on aiempaa elävämpi ja näkyy lähikatselussa omana pintanaan; ulkopuolen kartta on silti täysin alkuperäinen. Korvaa aiemman kokeilupohjan vasta vastaanottajan valinnalla, ei automaattista peliasennusta.

Kokonais-QA: EI TÄYSIN PASS; yllä olevat poikkeamat arvioon. Pelissä saumattomuutta, vastaanottajan/omistajan hyväksyntää, runtime-kytkentää tai julkaisua ei väitetä.

## Häviötön ulkoreunakooste
Natiivi muutti maskin ulkopuolelta 1274464 pikseliä. Omistajan aiemman häviöttömän reunakopioinnin luvan ja koneellisen maskikoostamisen työohjeen nojalla palautettiin vain mustan maskin ulkopuoli alkuperäisestä pyyhitty.png:stä. Ulkopuolella 0 muuttunutta pikseliä / 1274686; valkoisen maskin sisällä 0 muuttunutta pikseliä / 298178 natiiviin verrattuna. Ei sisäosan piirtämistä, skaalausta, värisovitusta, sulautusta tai inpaint-korjausta. Ulkopuolen täsmällisyys ei yksin todista sisäpuolisten katuviivojen saumattomuutta.

Natiivi SHA256 `d1f49a288ab42a006989913af3002c395bd8a9051e50367ed1164aa2d6b77bbc`; toimituskooste `17b1f73aaeb1131d3ee6855233076887211046492761bb9764240b8179423823`. Natiivi säilyy originals-kansiossa, vanhat kuvat ennallaan. Kehote/viitteet `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/alustat-24p-jatko-2149-2155-20261105/invalides/prompts/pohja-uusi.json`, QA `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/alustat-24p-jatko-2149-2155-20261105/invalides/qa/`, koostamiskoodi `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/alustat-24p-jatko-2149-2155-20261105/workflow.py`. Sisäänrakennettu image_gen, ei maksullista varareittiä. Mahdollisesta seuraavasta otosta viestitään Karttasepälle ennen käynnistystä.
