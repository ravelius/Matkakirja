# Notre-Dame /17c, otto 3 — tehtävä #2000

Lähde posti/karttaseppa-codex-nd-otto3-20261104.md, commit 33260e7af69780ac07cc12ca03297e6163720335, blob fe902965b94ddb44d9e9c53c77af6f262c9fa6ea. Uusi lähde avasi vain Notre-Damen yhden uuden oton; Louvre ja vanhat toimitukset pysyvät ennallaan. Koko posti, TILAUS.md ja 11 manifestitiedostoa luettu, kuvat katsottu ja SHA256-varmennettu.

Yksi kokonaan uusi sisäänrakennetun image_gen-työkalun kutsu. Natiivi PNG 1536 × 1024 **RGB**. Koko kuva on peittävä; maskin sisällä 0 läpikuultavaa pikseliä. **Tässä tilauksessa alfa=maski ei ole vaatimus.** Karttaseppä leikkaa kuvan lähteen maskilla.
SHA256 b789881e2604a2d0b2d9ad6b7ff680cd9ac199d0c4e55716cc9a728cf35b86d9.
Alkuperäiset tavut säilytetty; ei värikorjausta, maskin jälkikorjausta, osittaista editointia tai lisäottoa.

## Mitä siirtyi tai poistui
- Pohjan pohjoisrannan pienet talorivit korvattiin suuremmilla suorakaide- ja U-kortteleilla sekä avoimilla puupihoilla.
- Cité-saaren sisäosan pieniä taloja yhdistettiin suuriksi kortteleiksi; niistä osa peittyy myöhemmin lukitun katedraalin alle.
- Katedraalin eteläreunan pohjan pienet hajanaiset talot ja vaalea tyhjä kiila korvattiin pitkällä uudella talorivillä, kivetyksellä ja puutarhalla. Talorivin näkyminen kirkon alla on virhe, ei hyväksytty ratkaisu.
- Saaren kärkeen muodostettiin selkeämpi puutarha ja kivinen rantareuna. Kuvan keskellä on kaakkoon suuntautuva maavarjo, mutta lukittu katedraali peittää siitä suuren osan.

## Tarkistus
Uudessa natiivissa pohjan pienipiirteisiä talorivejä on korvattu selvästi kookkaammilla yksinkertaisilla umpi-/U-kortteleilla, isoilla kattoaloilla ja pihoilla. Katedraali puuttuu natiivista, kuten pyydettiin. Muuttumattomalla lukitulla katedraalilla ja alkuperäisellä maskilla tehty paikallinen QA-koeyhdistelmä osoittaa kuitenkin, että uusi eteläinen talorivi jää näkyviin katedraalin portaiden alle: rakennus näyttää seisovan toisen julkisivun päällä. Tämä ei ole pyydetty kapea kivikehä.

Natiivin RGB-ero alkuperäiseen pohjaan samalla ruudukolla:
- Maskin sisällä 386543 px, kaikki muuttuneet; vähintään yhden RGB-kanavan ero yli16 on 302270 px eli 78.2 %. Keskimääräinen absoluuttinen kanavaero 37.944.
- Maskin näkyvässä osassa, lukitun rakennuksen alpha>=128-alue pois lukien: 166498 px, yli16 ero 76.0 %.
Nämä ovat pikselieroja, eivät semanttista korttelisegmentointia. Lähteen 31 % korttelimittaria ei voi suoraan verrata näihin. Kuvallisesti näkyvä korttelien uudelleenpiirtäminen on tarkistettu erikseen.

## Avoimet virheet
- Katedraalin etujalan alle jää uudesta talorivistä ikkunallinen julkisivu; kapea kivikehä ei toteudu oikein. Koeyhdistelmässä näkyvä sijainti noin x640–875, y635–690.
- Maskin reunalla uudet suurikokoiset talot kohtaavat vanhan pienipiirteisen kartan. Sauma ja mittakaavasiirtymä vaativat Karttasepän arviota; tarkkaa katu-/rantageometrian jatkuvuutta ei ole varmennettu.
- RGB-muutosluvut osoittavat laajan pikselimuutoksen, mutta eivät ole semanttinen korttelimittaus eivätkä suoraan verrannollisia lähteen mainitsemaan 31 %:iin.

**Kokonais-QA: EI LÄPÄISTY**, vaikka peittävyys ja korttelien uudelleenpiirtämisen suunta onnistuivat. Natiivi toimitetaan yhden valtuutetun oton arviointikuvana. Neljättä ottoa ei tehdä; KK päättää mahdollisesta uudesta tilauksesta.

QA-koeyhdistelmä (ei toimituskuva eikä peli-integraatio): alkuperäinen pohja + natiivi kuva alkuperäisellä maskilla + muuttumaton lukittu katedraali. Vain tarkastusta varten tehty; toimitus-PNG:n tavuja ei muutettu.
- Yhdistelmä: /Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/pariisi-notre-dame-2000-20261104/notre-dame-otto3/qa/masked-context-with-locked-building.jpg
- Jalan lähikuva: /Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/pariisi-notre-dame-2000-20261104/notre-dame-otto3/qa/ground-contact-detail.jpg
- Täysi kehote: /Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/pariisi-notre-dame-2000-20261104/notre-dame-otto3/prompt.json
Lukitun rakennuksen SHA256 edelleen 3614d0a6d3ebed0109ec98d6097d22149144f9698eea22fd0aa8d596aa1ea488. Vastaanottajan/KK:n hyväksyntä, Karttasepän koostaminen, pelikytkentä ja julkaisu ovat erillisiä, avoimia tiloja. Ei junaan.
