# Codex → Karttaseppä / Fable / PT: aloituskartan vihjeet — Giza ensimmäisenä palautteelle (#306)

Luin tilauksen 4 / lisäyksen 3 koko lähteen `40845b421428210cd59e0c1a546f02bf3d8e24ea`, `posti/karttaseppa-codex-aloituskartan-vihjeet-20261015.md`, blob `9460ba03bfc9f5a5c88ee0542a2be5f920993e2e`, ja katsoin ennen generointia kaikki neljä saman commitin WebP-tyyliviitettä. `assets/kartat/miniatyyrit/LUEMINUT.md` puuttuu tästä commitista; sen sisältöä ei keksitty. Lähdeviitteiden tarkat tavut ja SHA:t ovat mukana.

**Ensimmäinen uusi kuva Giza on toimitettu palautetta varten. Tämä on 1/5 uutta kuvaa; koko tilausta tai lopullista yhdeksän kuvan vertailua ei merkitä valmiiksi.** Omistajan yksi kuva kerrallaan -palautevaihe säilyy; muita neljää ei aloitettu.

- [giza-pyramidit.webp](aloituskartan-vihjeet-20261015/giza-pyramidit.webp): toimitusmuunnos **1024 × 1024 RGBA WebP**, aito läpinäkyvä tausta, häviötön WebP.
- [Muuttamaton sisäisen työkalun PNG-natiivi](aloituskartan-vihjeet-20261015/native/giza-pyramidit-v1-native.png): **1254 × 1254 RGBA**, ei suurennettu eikä rajattu.
- [Giza + neljä alkuperäistä, viiden kuvan VÄLIvertailu](aloituskartan-vihjeet-20261015/vertailu-ensimmainen-5kuvaa.png).
- [Läpinäkyvyyden vaalea/tumma QA](aloituskartan-vihjeet-20261015/qa/giza/alpha-vaalea-tumma-QA.png), [natiivi ja muunnos erikseen/tavutiedot](aloituskartan-vihjeet-20261015/qa/giza/native-and-export-readback.json), [QA](aloituskartan-vihjeet-20261015/qa/giza/QA-FI.md).

Yksi kokonaan uusi sisäisen kuvatoiminnon generointi: kolme pyramidia ja pieni tyylitelty sfinksi, vaalea kerma/okra, seepiaviiva, akvarellipienoismalli. Ei API:a tai CLI:tä eikä fotorealistista pääkaupunkituotantoa. Kaikki kärjet ja sfinksi ovat mukana, ei tekstiä, vesileimaa tai kehystä. Aito alpha luettiin tiedostosta ja katsottiin vaalealla sekä tummalla taustalla; pieni alpha1/255-lähdekohina on säilytetty ja dokumentoitu. Ei taustan poistamista tai maalaavaa osakorjausta.

1254 × 1254-natiivin koko kangas pienennettiin kerran 1024 × 1024-kokoon alpha-esikertoimellisella Lanczos-menetelmällä ja tallennettiin häviöttömänä RGBA WebP:nä. Dekoodatut pikselit vastaavat muunnoksen RGBA-pikseleitä. **1024-versiota ei väitetä työkalun natiiviksi.** Neljä alkuperäistä pienoismallia säilyivät muuttumattomina; vertailuarkki käyttää vain niiden esikatseluita.

**Pyydän ensimmäisen Gizan palautteen ennen seuraavaa kuvaa.** Marrakech #307, Sahara #308, Samarkand #309, Grönlanti #310 ja lopullinen yhdeksän kuvan arkki #311 odottavat. Ei automaattisia uusintoja eikä muiden vanhojen palautetaukojen purkua. Louvren #302:n toimituksen jälkeinen pysähdys säilyy.

Tämä on postitse toimitettu arviointiehdokas. PT hyväksyy ja Karttaseppä siirtää hyväksytyt assetteihin/vihjedataan; tähän sessioon ei sisälly peli-integraatiota, R2:ta, main-yhdistämistä tai julkaisua. [Toimitusmanifesti](aloituskartan-vihjeet-20261015/delivery-packet.json).
