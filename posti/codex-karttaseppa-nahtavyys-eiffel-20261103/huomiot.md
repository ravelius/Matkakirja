# eiffel — tilaus #1959, yksi otto

Lähdecommit f678232811fad2adac0ec3dbbcb9dbd7b937d350, blob 78282e4162a8ddaa5559c25d8686a5c310855d9d. Nykyinen TILAUS.md ja kaikki manifestiliitteet luettu ja SHA256-varmennettu. 1 ImageGen-kutsu / 1 uusi kuva. Vanhat kuvat säilyvät; ei uusintaa eikä osittaista jälkimuokkausta.

PNG: 1536 × 1024 RGBA. Alkuperäiset generoidut tavut säilytetty. SHA256 442ec3ac87491372c4969f772b70baf80f9a19c32aea37d1f572727997a74539.

Mitat natiivin kuvan alfasta (alpha>=128): **383 × 646 px**, alareuna **y=883**, keskilinja x=766.5. Tavoite 300 × 624 px ±5 %, alareuna y=880, x=768. Mittaus on näkyvän peittävän alueen rajaus, ei rakennuksen semanttinen segmentointi. Koko toleranssissa: False.

Alfa min/max [0, 254]; täysin läpinäkyviä 1486644, täysin peittäviä 0, osittaisia 86220. Rajaus eri alfakynnyksillä: {"1": [33, 69, 1504, 1000], "16": [575, 237, 958, 884], "128": [575, 238, 958, 884], "250": [576, 247, 957, 882]}. Täsmällisen 0/255-ehdon mahdolliset puutteet eivät ole korjattu toimituskuvaan. Alfarajauksen ja mahdollisen sävy-/kokosovituksen vastaanottaja voi tarkistaa koodikoostamisessaan.

Visuaalinen tarkistus: Eiffel tunnistuu nelijalkaisesta rakenteesta, suurista alakaarten aukoista, kolmesta tasosta ja ruskeasta ristikkoraudasta. Suuret alakaaret ja keskiosan suuret aukot ovat sinisellä QA-taustalla läpinäkyviä. Yläosan tiheässä ristikossa on ruskeaa täyttöä; kaikkien yli 12 px aukkojen täydellistä läpinäkyvyyttä ei ole varmennettu segmentoinnilla. Ei ympäristöä, maavarjoa, tekstiä tai näkyvää haloa sinisellä QA-taustalla. Rakennuksen leveys 383 px ylittää 300 px tavoitteen; korkeus 646 px on 624 px tavoitteen 5 prosentin sisällä. Alareuna 883 on 3 px alempana kuin ohje. Tarkka 60 asteen projektio ei ole mitattu. Mittakaava/alfasovitus jää Karttasepälle.

**Oma kokonais-QA: EI TÄYSIN LÄPÄISSYT; poikkeamat yllä.** Toimitus on yhden sallitun oton arviointitoimitus. Vastaanottajan hyväksyntää, korjattua artefaktia, KK:n käyttöpäätöstä, runtime-integraatiota tai julkaisua ei väitetä valmiiksi.

Alkuperäinen kuva, QA-taustayhdistelmät ja täysi ImageGen-kehote: /Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/pariisi-nahtavyydet-1955-1964-20261103/eiffel
