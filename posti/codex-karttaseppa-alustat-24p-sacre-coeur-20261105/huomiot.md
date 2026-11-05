# sacre-coeur — 24p alusta #2153, 5.11.2026

Uusin jatkotilaus: posti/karttaseppa-codex-alustat-24p-jatko-20261105.md, commit f2182102d5144e0c319de44ac5d3813006d72725, blob 2fa160585ae9beac3e354fc03d5dff1b5da0515e. Kolme lähdeversiota luettu; kaksi aiempaa säilytetty historiana. Riemukaaren pelikuvahyväksyntä vapautti tämän jatkon. TILAUS-24p:n vanha Eiffel/Grand Palais-poissulku on korvattu uusimmalla postilla.

Yksi ImageGen-kutsu ja yksi kokonaan uusi natiivikuva, ei uusintoja. Vain maapohja, ei 3D-mallin tai rakennuskuvien muutoksia. RGB 1536 × 1024, pohjoinen ylhäällä. V7-lähdekartat ja SHA256-manifesti varmennettu.

## Tulos ja poikkeamat
Sacré-Cœurin viisi rungossa näkyvää viheraluetta, eteläisen puiston länsipuolinen kulkureitti ja ympäröiville kaduille johtavat reitit ovat mukana. Koko maa jatkuu myös tulevan kirkon alla; rakennusta, jalanjäljen suorakulmiota tai pystyrakenteita ei ole. Poikkeama: generaattori pyöristi nurmien ääriviivoja ja pidensi eteläistä suurta nurmialuetta etelään noin 20–25 px lähderunkoon verrattuna. Myös pienimpien viheralueiden muodot yksinkertaistuivat. Siksi vaatimus nurmien muodon täsmällisestä säilymisestä ei läpäise QA:ta. Luoteessa maskin leikkaus säilyttää ulkopuolisen vanhan vihreän sävyn, ja uuden nurmen rajalle jää sävyero. Kaikki ulkopuoliset pikselit ovat silti alkuperäiset. Toimitetaan tämä yksi otto poikkeamineen Karttasepän arvioon; pelisaumoja tai uutta ottoa ei ole hyväksytty.

Kokonais-QA: EI TÄYSIN PASS; yllä olevat poikkeamat arvioon. Pelissä saumattomuutta, vastaanottajan/omistajan hyväksyntää, runtime-kytkentää tai julkaisua ei väitetä.

## Häviötön ulkoreunakooste
Natiivi muutti maskin ulkopuolelta 1399794 pikseliä. Omistajan aiemman häviöttömän reunakopioinnin luvan ja koneellisen maskikoostamisen työohjeen nojalla palautettiin vain mustan maskin ulkopuoli alkuperäisestä pyyhitty.png:stä. Ulkopuolella 0 muuttunutta pikseliä / 1399813; valkoisen maskin sisällä 0 muuttunutta pikseliä / 173051 natiiviin verrattuna. Ei sisäosan piirtämistä, skaalausta, värisovitusta, sulautusta tai inpaint-korjausta. Ulkopuolen täsmällisyys ei yksin todista sisäpuolisten katuviivojen saumattomuutta.

Natiivi SHA256 `ec26172d29549a541d6ae2d3a5c1fea895b2ebce1bb289f8fa317114b05d5c73`; toimituskooste `2f84f48f4f021b1fdc39157d53105f518afb1855486718bbd4f60c32e3379441`. Natiivi säilyy originals-kansiossa, vanhat kuvat ennallaan. Kehote/viitteet `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/alustat-24p-jatko-2149-2155-20261105/sacre-coeur/prompts/pohja-uusi.json`, QA `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/alustat-24p-jatko-2149-2155-20261105/sacre-coeur/qa/`, koostamiskoodi `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/alustat-24p-jatko-2149-2155-20261105/workflow.py`. Sisäänrakennettu image_gen, ei maksullista varareittiä. Mahdollisesta seuraavasta otosta viestitään Karttasepälle ennen käynnistystä.
