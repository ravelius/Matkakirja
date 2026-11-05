# pantheon — 24p alusta #2149, 5.11.2026

Uusin jatkotilaus: posti/karttaseppa-codex-alustat-24p-jatko-20261105.md, commit f2182102d5144e0c319de44ac5d3813006d72725, blob 2fa160585ae9beac3e354fc03d5dff1b5da0515e. Kolme lähdeversiota luettu; kaksi aiempaa säilytetty historiana. Riemukaaren pelikuvahyväksyntä vapautti tämän jatkon. TILAUS-24p:n vanha Eiffel/Grand Palais-poissulku on korvattu uusimmalla postilla.

Yksi ImageGen-kutsu ja yksi kokonaan uusi natiivikuva, ei uusintoja. Vain maapohja, ei 3D-mallin tai rakennuskuvien muutoksia. RGB 1536 × 1024, pohjoinen ylhäällä. V7-lähdekartat ja SHA256-manifesti varmennettu.

## Tulos ja poikkeamat
Koko v7-alue on yhtenäistä vaaleaa kiveystä myös mallin alla. Erillistä jalanjälkisuorakulmiota, rakennuksia, nurmisektoreita tai pystyobjekteja ei näy. Lännen ja idän kadut avautuvat samaan aukioon. Reunan tarkistus: lännen liittymässä näkyy pieni viivan taitos/päättymisero maskin kohdalla; tarkkaa kaikkien liittymien saumattomuutta ei kuitata PASSiksi. Kiveystekstuuri erottuu tyhjän alkuperäiskartan pinnasta, vaikka voimakasta värireunaa ei näy. Julkisivuvalokuva ei varmista laajan pelialueen kaikkien katujen/kivijaon maantieteellistä rakennetta. Kohde toimitetaan arvioon; vanhat rakennuskuvat ja 3D-malli ennallaan.

Kokonais-QA: EI TÄYSIN PASS; yllä olevat poikkeamat arvioon. Pelissä saumattomuutta, vastaanottajan/omistajan hyväksyntää, runtime-kytkentää tai julkaisua ei väitetä.

## Häviötön ulkoreunakooste
Natiivi muutti maskin ulkopuolelta 1418075 pikseliä. Omistajan aiemman häviöttömän reunakopioinnin luvan ja koneellisen maskikoostamisen työohjeen nojalla palautettiin vain mustan maskin ulkopuoli alkuperäisestä pyyhitty.png:stä. Ulkopuolella 0 muuttunutta pikseliä / 1418403; valkoisen maskin sisällä 0 muuttunutta pikseliä / 154461 natiiviin verrattuna. Ei sisäosan piirtämistä, skaalausta, värisovitusta, sulautusta tai inpaint-korjausta. Ulkopuolen täsmällisyys ei yksin todista sisäpuolisten katuviivojen saumattomuutta.

Natiivi SHA256 `9ffdcd32f609af885db546af29d4c94a26e93b1656a5bde41658a542034164b4`; toimituskooste `492a341d4a4d83278b237bc780eace6065de47c21c7d0f1c5b68a3a3c26bf328`. Natiivi säilyy originals-kansiossa, vanhat kuvat ennallaan. Kehote/viitteet `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/alustat-24p-jatko-2149-2155-20261105/pantheon/prompts/pohja-uusi.json`, QA `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/alustat-24p-jatko-2149-2155-20261105/pantheon/qa/`, koostamiskoodi `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/alustat-24p-jatko-2149-2155-20261105/workflow.py`. Sisäänrakennettu image_gen, ei maksullista varareittiä. Mahdollisesta seuraavasta otosta viestitään Karttasepälle ennen käynnistystä.
