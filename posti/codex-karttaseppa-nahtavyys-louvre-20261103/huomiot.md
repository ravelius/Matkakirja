# louvre — tilaus #1955, yksi otto

Lähdecommit f678232811fad2adac0ec3dbbcb9dbd7b937d350, blob 7395e6a66cf087902d46794404eeff4e6827dc0d. Nykyinen TILAUS.md ja kaikki manifestiliitteet luettu ja SHA256-varmennettu. 1 ImageGen-kutsu / 1 uusi kuva. Vanhat kuvat säilyvät; ei uusintaa eikä osittaista jälkimuokkausta.

PNG: 1536 × 1024 RGBA. Alkuperäiset generoidut tavut säilytetty. SHA256 bb56e6a82adcd2ed2663e988ca6be4788e4f247461363cc7f64bb4410205f777.

Mitat natiivin kuvan alfasta (alpha>=128): **822 × 570 px**, alareuna **y=931**, keskilinja x=767.0. Tavoite 684 × 492 px ±5 %, alareuna y=880, x=768. Mittaus on näkyvän peittävän alueen rajaus, ei rakennuksen semanttinen segmentointi. Koko toleranssissa: False.

Alfa min/max [0, 254]; täysin läpinäkyviä 1271665, täysin peittäviä 0, osittaisia 301199. Rajaus eri alfakynnyksillä: {"1": [0, 0, 1518, 1008], "16": [356, 361, 1179, 932], "128": [356, 362, 1178, 932], "250": [358, 367, 1176, 930]}. Täsmällisen 0/255-ehdon mahdolliset puutteet eivät ole korjattu toimituskuvaan. Alfarajauksen ja mahdollisen sävy-/kokosovituksen vastaanottaja voi tarkistaa koodikoostamisessaan.

Visuaalinen tarkistus: Palatsin pitkä etusiipi, avoin sisäpiha, selkeä pääpyramidi ja korostetut mansardipaviljongit toteutuvat. Sisäpihan kiveys kuuluu tilaukseen; ulkopuolista maastoa, ihmisiä, puita tai kulkuneuvoja ei havaittu. Harmaat katot ja lämmin kivimuste ovat yhtenäiset ND k4:n kanssa. Kokonaisuus on kuitenkin tavoitetta suurempi ja alempana. Etusiiven alareunan kulma on silmämääräisesti noin 14 astetta oikealle alaspäin, kun ohje oli noin 25 astetta. Alpha>=16:n ja >=128:n rajaukset ovat lähellä toisiaan, mutta alpha1:ssa on laajoja hyvin heikkoja jäänteitä ja sisäalfa jää254:ään. Koko-/kulma-/alfa-poikkeamat vaativat vastaanottajan arviota.

**Oma kokonais-QA: EI TÄYSIN LÄPÄISSYT; poikkeamat yllä.** Toimitus on yhden sallitun oton arviointitoimitus. Vastaanottajan hyväksyntää, korjattua artefaktia, KK:n käyttöpäätöstä, runtime-integraatiota tai julkaisua ei väitetä valmiiksi.

Alkuperäinen kuva, QA-taustayhdistelmät ja täysi ImageGen-kehote: /Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/pariisi-nahtavyydet-1955-1964-20261103/louvre
