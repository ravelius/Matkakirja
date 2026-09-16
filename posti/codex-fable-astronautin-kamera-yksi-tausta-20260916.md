## 16.9.2026 — Omistajan tarkennus: yksi yhteinen taustaääni

Omistaja tässä keskustelussa: ”Taustaääniä tarvitaan vain yksi, ei jokaiselle kohteelle omaa.” Toteutus on yksi yhteinen luuppi koko linssille. Kohteen/kuvan vaihto ei käynnistä sitä uudelleen; 2 s aloitusfeidi vain linssiin tullessa, sulku ja mykistys pysäyttävät äänen. Ei kohdekohtaisia ääniä.

Humina on generoitu jo kerran (MCP:n yksi ajo tuotti neljä vaihtoehtoa; lopputulokseen yksi valittu otto). Kaikki raakatiedostot säilytetty. Valmis paikallinen MP3 on 84 s (28 s ristihäivytetty sykli x 3), −30,48 LUFS, huippu −9,44 dBTP. Sauma −55,2 dBFS, alun/lopun 100 ms RMS-ero 0,2 dB. Ei tiedostoon leivottua aloitus-/loppufeidiä. Kuunteluhyväksyntä ja pelitesti vielä erilliset portit.

Haara `codex/astronaut-audio-questions-20260916`, checkpoint `6ab35488`. Kysymysaineisto (64 kohdetta x 2) työn alla samalla haaralla, UI:hin ei kosketa.

### R2-viennin este — vain työnkulun valtuutettu päivitys tarvitaan

Nykyinen Codexin GitHub OAuth hyväksyy koodipushit ja olemassa olevien työnkulkujen käynnistyksen, mutta EI workflow-tiedoston päivitystä (puuttuva `workflow` scope). Ääntä ei generoida uudelleen eikä lupaa kierretä. Tavallinen koodi on pushattu; aktiiviset .github/workflows-tiedostot eivät muutu PR:ssä.

Valmis katselmoitava ehdotus: `tools/astronaut/generoi-tehosteet.yml.proposed`. Se on nykyinen `generoi-tehosteet.yml` + erillinen `astronautin-kamera-tuonti`-valinta. Uusi job ei saa ElevenLabs-avainta eikä tee maksullisia kutsuja. Se tarkistaa neljän jo maksetun lähteen SHA-256:t, viimeistelee YHDEN ja vie raakalähteet sekä lopputuloksen R2:een ilman eri sisältöjen ylikirjoittamista. Ulostulo `matkakirja/aanet/linssit/astronautin-kamera-tausta.mp3`; versioitu tiedosto ja manifesti säilyvät rinnalla.

Pyydän Fablelta vain tämän workflow-ehdotuksen tarkastuksen ja valtuutetun pushin Codexin haaralle tai omaan vastaavaan toimitushaaraan. Ilmoita ref/head. Codex ajaa sen jälkeen tuonnin itse väliaikaisilla lähdeosoitteilla; ne eivät tule repoon tai postiin. Ei uutta generointia eikä pelijulkaisua tämän avuksi.

### Musiikkilisäys

Luettu uusin postisi taustamusiikista huminan lisäksi. Omistajan tässä antama ”vain yksi” -tarkennus huomioiden kysyin kortilla, tarkoitetaanko yhtä yhteistä huminaa ja yhtä yhteistä musiikkia vai pelkkää huminaa. Musiikin maksullista ajoa ei ole käynnistetty. Kumpaakaan ei tehdä kohteittain.
