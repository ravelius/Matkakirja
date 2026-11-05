# Saari23a — yksi otto, arviointitoimitus

Tehtävä #2085. Lähdeposti `karttaseppa-codex-kuvat-saari-23a-20261105.md`, commit97e8f57230ce97f6e0ab4e76acd674f6bb1b82ee, blob17a0b6b6328204b96ea0eccc523e972d3de59cf6. TILAUS-23a-saari.md ja kaikki7manifesttiedostoa SHA256-varmennettu.

**Yksi varsinainen sisäisen ImageGen-työkalun generointi, yksi uusi kokonainen kuva.** Ennen generointia yksi kutsu hylättiin parametrivalidoinnissa (enintään5referenssiä); siinä ei käynnistynyt generointia. Ei toista ottoa. `saari-uusi.png`1536×1024RGB, natiivitavut säilytetty, ei pikselikorjauksia/rajausta/skaalausta. SHA256 `cc3c93a088935cb011ff5e2de8540bf860e2a3f0a84cbc6596d96dcb90f0e96f`. Kehote PROMPT.json.

Puistopinnan sisältö onnistui: hillitty oliivinurmi, polut ja kapeahko yhtenäinen rantakiveys; ei saaren rakennuksia, puita, pensaita, pystyobjekteja, varjoja tai tekstiä. Kirkon keskiosa on tyhjää vaaleaa kiveystä.

**QA ei täysin läpäissyt kohdistusta:**
- Kirkon tyhjän kiveyksen reuna ei vastaa ohjepolygonia täysin. Sisennetyssä kirkkomaskissa1007/72131px(1,40%) osui nurmisävyheuristiikkaan, erityisesti etelä/itäreunassa. QA-kohdistus.png:n sininen viiva on ALKUPERÄINEN ohjepolygonin raja, ei toimituskuvan osa. Vastaanottajan on tarkistettava ettei kirkon alle jää nurmea.
- Viisi tunnistettavaa sillanpäätä lähtökuvassa, kaikissa ehdokkaassa liittymäpolku. Arvioidut lähdepisteet:216/293,182/347,598/394,731/439,462/637. Teksti mainitsee kuusi; kuudetta liittymää ei varmennettu eikä uutta siltaa keksitty.
- Aukioiden paikat ovat silmämääräisesti lähellä pohjaa ja kaksoisviiva säilyy. Lukittujen aukioiden rasteri muuttui:99,9872%pikseleistä eroaa ainakin yhdelläRGB-arvolla;3149/54667eroaa yli12kanava-arvon verran. Lähteen määräämä alkuperäisten lukkoalueiden takaisinliimaus ja saumojen tarkistus on Karttasepän koostamisvaihe, ei tässä tehty/valmiiksi väitetty.
- Myös saaren ulkopuolen rasteri muuttui(99,982%vähintään1RGB;154674/1311260yli12). Karttasepän saari.png-maskilla koostaminen pitää alkuperäisen ulkopuolen; tätä koostetta ei tässä tuotettu. Rannan täsmällistä pikselikohdistusta ei ole hyväksytty.

Kuva toimitetaan **yhden sallitun oton diagnoosiksi ja arvioitavaksi**, ei täysin QA-hyväksyttynä tuotantopintana. Karttaseppä tarkistaa täysikoossa ja vie KK:lle. Seuraavasta otosta päättää KK. Ei lähetetty Tripo-sessiolle, ei runtime-integraatiota tai julkaisua.
