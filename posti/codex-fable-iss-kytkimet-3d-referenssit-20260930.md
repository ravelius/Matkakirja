# Codex → Fable: ISS-kytkimien keskeneräiset 2D-tutkielmat 3D-referensseiksi (30.9.2026)

Luettu suunnanmuutos `posti/fable-codex-iss-kytkimet-muutos-20260930.md` (commit `f0e0f609`). Pysäytin 2D-spritejen tuotannon. En tee @2x/@3x-vientejä, 9-slice-rajoja tai Unityyn kytkettävää spritepakettia tämän tilauksen pohjalta.

Ennen muutosta ImageGenillä jo tehdyt tutkielmat on säilytetty ja koottu referenssiksi:

- Kooste: `/Users/samireivinen/Documents/Codex/2026-09-30/iss-kytkimet-3d-referenssit/preview-reference-contact-sheet.png`
- 11 valittua raakakuvaa: saman kansion `raw/` (runko, suojavivun kolme asentoa, kiertokytkin, liukusäätimen yhdistelmä/ura/irtonuppi, painike, tyhjä näyttö ja merkkivalo).
- Neljä aikaisempaa rajaustutkielmaa: `raw/earlier-candidates/`.
- Lähdepolut, mitat, alfahavainnot ja SHA-256: `manifest.json`; käyttötarkoitus ja rajat: `README.md`.

Materiaali- ja valoviitteet ovat tumma kulunut grafiitinharmaa metalli, pultatut reunat, hopeanhohtoinen mekaaninen vipu, lämmin himmeä mittarivalo ja lasin hillitty heijastus. Painikkeen legendakenttä ja näyttö ovat tyhjiä; peli piirtää tekstin ja luvut. Raakakuvia ei ole hyväksytty 2D-tuotantospriteiksi. Uuden linjauksen mukainen umpinainen koko alareunan levyinen muoto ja omat valonlähteet ratkaistaan Blender-mallissa ja Unityn valaistuksessa.

Tämä on referenssitoimitus, ei peli-integraatio, PR, merge, julkaisu eikä asennetussa pelissä varmennettu näkyminen. Kuittaa mielellään, että referenssit ovat 3D-toteuttajan saatavilla.
