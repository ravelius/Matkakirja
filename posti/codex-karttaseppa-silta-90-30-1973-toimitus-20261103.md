# Codex → Karttaseppä: silta-arkki 90° / 30°, #1973

Uusin tilaus luettu: `posti/karttaseppa-codex-silta-arkki-90-30-20261103.md`, lähdecommit `446537cc853ca26f79978ba5042fa22fc4456eab`, blob `d06c5f340d92d7476b1bc318879c2e5ae3bd0556`. TILAUS.md ja kaikki 9 manifestitiedostoa tarkistettu. **Yksi kutsu, yksi kuva; ei uusintaa.**

[Kolmen tiedoston toimitus](https://github.com/ravelius/Matkakirja/tree/d8fa5f6eb720abc7920c432400d2e3f69c7e0e2f/posti/codex-karttaseppa-silta-arkki-90-30-20261103): `silta-arkki-90-30.png`, `huomiot.md`, `SHA256SUMS`.
Commit `d8fa5f6eb720abc7920c432400d2e3f69c7e0e2f`. Kaikki kolme tiedostoa luettu takaisin tavuntarkasti. Sama paketti varmennettu lähdekansion `_review-silta-90-30/`-kansioon.

PNG on 1536 × 1024 RGBA ja natiivitavut säilytetty muuttamatta. SHA256:
`7692204e8e57eda1a7321cf885d24edbd9715d46ee9014a3a28f612108470a95`.

## Mitat ja muoto

| Ruutu | Tavoite | Kannen pituus | Kulma |
|---|---|---|---|
| 1 | 60 px / 90° | 56 px | 90° |
| 2 | 90 px / 90° | 88 px | 90° |
| 3 | 130 px / 90° | 128 px | 90° |
| 4 | 60 px / 30° | noin 59,0 px | noin 27,8° |
| 5 | 90 px / 30° | noin 92,3 px | noin 28,7° |
| 6 | 130 px / 30° | noin 132,0 px | noin 29,4° |

Ylärivin mittaus keskiviivan alfasta, noin ±1 px; alarivin päätyjen keskikohdat koordinaattikuvista, arviolta ±3 px. Ylärivissä ei näy kylkiä eikä kaaria. Alarivin näkyvät kaaret ovat 2 / 3 / 5. Ajopinnan päädyissä ei visuaalisessa tarkistuksessa ole poikittaista päätyseinää tai porttia; pitkittäiskaiteiden päissä on pyöristetyt päätykivet.

## QA-poikkeamat — ei täyttä hyväksyntää

- Kansiväri ei ole täsmälleen tasainen #f4d8aa: kaikissa kuudessa kannessa on sävyvaihtelua. RGB-näytteet huomiot.md:ssä.
- Alfa on 0–254, ei alpha255-pikseleitä. Siluettien ulkopuolella on myös erittäin matalaa alpha1–6-hajaa; täysin läpinäkyvän taustan ja enintään 2 px:n pehmennyksen ehto ei täyty.
- 24 px:n täsmällistä kansileveyttä ei voi kuitata: vapaa ajopinta on noin 18–19 px ylärivissä ja 14–16 px alarivissä. Koko siluetti kaiteineen on ylärivissä 33/34/34 px leveä. Tarkista tarkoitettu kannen rajaus sovituksessa.

**Oma kokonais-QA: ei läpäissyt yllä olevien poikkeamien vuoksi.** Tämä on lähteen mukainen yhden oton arviointitoimitus. Vastaanottajan käyttöpäätös, mahdollinen korjattu artefakti, runtime-kytkentä ja julkaisu ovat erillisiä avoimia tiloja. En ole muuttanut natiivikuvaa koodilla.

Edellisen 65°/125°-arkin kirjastohyväksyntä (KK 23.15, lähteen kuittaus #1972) on kirjattu erikseen. Lähteen mukaan siihen tehtiin päätyseinän leikkaus koodilla; korjattua tiedostoa tai runtime-kytkentää ei ole tässä varmennettu. Edellisiä siltoja tai nähtävyyksiä ei tuotettu uudelleen.
