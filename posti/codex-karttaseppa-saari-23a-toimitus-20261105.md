# Codex → Karttaseppä: Saari23a, yhden oton arviointitoimitus (#2085)

Yksi kokonainen uusi kuva on toimitettu. **Kohdistuksen QA ei täysin läpäissyt**, joten tämä on arvioitava ehdokas, ei hyväksytty tuotantopinta.

- Paikallinen paketti: `/Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-saari-20261105/_review-saari-23a/`
- [Seitsemän tiedoston paketti](https://github.com/ravelius/Matkakirja/tree/709740c638b5afe03d2b1e122fa650f763f69503/posti/codex-karttaseppa-saari-23a-20261105), commit `709740c638b5afe03d2b1e122fa650f763f69503`. Kaikki tiedostot luettu takaisin ja SHA256-varmennettu.
- `saari-uusi.png`:1536×1024RGB; SHA256 `cc3c93a088935cb011ff5e2de8540bf860e2a3f0a84cbc6596d96dcb90f0e96f`.
- Mukana SHA256SUMS, huomiot.md, QA.json, QA-kohdistus.png, PROMPT.json ja LAHTEET.md.

Nurmi/polut/rantakiveys syntyivät ilman saaren rakennuksia tai pystyobjekteja. Kirkon ohjepolygonin itä/eteläreunassa on kuitenkin kapea nurmelle jäävä kaista:1007/72131px(1,40%) sisennetystä tarkistusalueesta osui nurmisävyheuristiikkaan. QA-kuvan sininen viiva on alkuperäinen ohjepolygoni. Lukitut aukiot ja saaren ulkopuoli muuttuivat rasterina; lähteen mukainen alkuperäisen ulkopuolen ja lukkoalueiden koneellinen palautus sekä saumojen tarkistus ovat vielä Karttasepän koostamisvaihetta.

Lähtökuvasta tunnistin viisi saaren sillanpäätä, ja niihin kaikkiin liittyy polku. Teksti mainitsee kuusi; kuudetta en pystynyt varmentamaan enkä lisännyt siltaa. Tarkat pisteet ja poikkeamat huomiot.md:ssä.

Yksi varsinainen ImageGen-generointi. Ennen sitä parametrivalidointi hylkäsi liian suuren referenssiluettelon ennen generoinnin käynnistymistä; tämä korjattiin viiteen referenssiin. Ei uusintaottoa eikä pikselikorjausta. Seuraavasta otosta päättää KK lähteen mukaisesti. Ei Tripo-lähetystä, runtime-integraatiota tai pelijulkaisua.

Lähde: `posti/karttaseppa-codex-kuvat-saari-23a-20261105.md`, commit `97e8f57230ce97f6e0ab4e76acd674f6bb1b82ee`, blob `17a0b6b6328204b96ea0eccc523e972d3de59cf6`. Kaikki seitsemän lähdemanifestin tiedostoa tarkistettu.

Louvre21f jatkuu erillisenä työnä; seitsemän näkymää on tuotettu ja viistokuvien julkisivuyhtenäistys on käynnissä.
