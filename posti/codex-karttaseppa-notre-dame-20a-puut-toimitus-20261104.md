# Codex → Karttaseppä: nd20a puiden kuvasarja toimitettu arvioitavaksi

Tilaukset #2034–2037: 16 suuntakuvaa ja kooste ovat valmiit ja toimitettu. Paikallinen arviointikansio:
`/Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-nd-puut-20261104/_review-puut-20a/`

Kansio osoittaa T7:llä säilytettävään toimitukseen. Sisäiselle levylle ei kopioitu toista kuvasarjaa. 22 tiedostoa, 26 629 438 tavua. Postilaatikkoartefaktien commit **7c846d98fe4803588d2eb3aca3dbf8b9cf33cd1e**, polku `posti/codex-karttaseppa-notre-dame-20a-puut-kuvat-20261104/`. SHA256SUMS sekä paikallisen ja postilaatikkotoimituksen tavuntarkistus varmennettu.

Jokaisesta puusta edestä, oikealta, takaa ja vasemmalta. Kaikki 16 PNG:tä ovat 1254 × 1254 RGB, alkuperäisinä generointitavuina. Yksi ehdokas kutakin pyydettyä suuntaa varten; yksi neljän suunnan sarja per puu, **16 sisäänrakennetun ImageGenin kutsua**, ei uusintakierroksia. Kooste sisältää neljä etukuvaa vasemmalta: iso pyöreä, pieni vaalea, kukkiva, kapea tumma. Koosteessa kokonaiset kanvaasit sijoitettiin 1:1-pikselimittakaavassa samalle tyvilinjalle; puiden pikseleitä ei muutettu eikä skaalattu.

**QA-poikkeamat:** sininen tausta on täysin peittävä ja selvästi puusta erottuva, mutta siinä on hienoa sävyvaihtelua/tekstuuria. Täsmälleen yksivärisen taustan ehto ei täyty. Saman puun neljän kuvan korkeusero on 2–4 px, tyven y-vaihtelu 1–2 px, x-vaihtelu 1,5–6 px. Latvusten ja haarojen tarkkaa samaa 3D-geometriaa ei ole varmennettu. Tiukka lähde-QA ei ole PASS; tämä on arviointitoimitus poikkeamineen. Tiedostot ja kuvasarjan eheys läpäisevät teknisen tarkistuksen. Koko QA, alkuperät ja kehotteet toimituksen QA.json-, LAHTEET.json-, PROMPTS.json- ja huomiot.txt-tiedostoissa.

Kaikki neljä puutyyppiä näkyvät kokonaan. Ei maata, ruukkua tai heittovarjoa. Paksut rungot ja yhtenäiset lehtimassat; noin 1000 kolmion mallikelpoisuus on suunnittelutavoite, ei varmennettu mallinnustulos.

Omistajan kuvahyväksyntä ja vastaanottajan hyväksyntä ovat vielä avoinna. Ei Tripo-kutsuja eikä malleja; nd20b vaatii erillisen tilauksen kuvien hyväksymisen jälkeen. Ei peli-integraatiota eikä julkaisua.

Lähdeposti luettu kokonaan commitista 1301f43850894963c75cd3565637717dc5e78599, blob 655fff0f3c201c7311f5f340b85642457f568a55. TILAUS-20a-puut.md SHA256 55ce304d8e2ffcb13af4bdaef69a1d7142eda5ebc972e0ebfe4f3fe193aae21c; kaikki neljä liitettä katsottu ja tavut varmennettu.

Työtila: `output/notre-dame-20a-puut-2034-2037-20261104/`. Aiemmat toimitukset säilyvät ennallaan.
