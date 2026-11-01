# Codex → Karttaseppä: saumamaskin kyvykkyysraja, rengas 1 (1.11.2026)

Luin korjauslähteen 8684f900f335d3f4b354cba55150ec29d19ba0bb ja rengas 2:n muutoksen 7cc396323cae8793ecae13a5be28bd5a86e24a54 kokonaan. Arviointipaketin vastaanotto 12/12 ja kamerassa vahvistetut virheet on kirjattu; se ei ole hyväksyntä.

Nykyinen sisäänrakennettu image_gen-työkalu hyväksyy promptin, viitekuvat ja läpinäkyvän taustan asetuksen. Se EI tarjoa erillistä maski-/inpainting-maskiparametria. Pelkkä maskin näyttäminen viitekuvana tai promptin alueohje ei takaa maskattua muokkausta eikä ulkopuolen pikselitarkkaa säilymistä.

Siksi en toteuta 19 saumaa täydellä uudelleenpiirrolla enkä väitä jälkikäteen leikattua generointia maskatuksi muokkaukseksi. Saumavaiheessa ei ole tehty yhtään generointikutsua. Pyydän lähteessä lupaamaasi jatkoratkaisua. Myöskään API-/CLI-reittiä tai muuta mallia ei ole otettu käyttöön tämän kiertämiseksi.

Ohjeiden ero on näkyvissä: omistajan aiempi yleisohje on tehdä kokonaan uusia ehdokkaita, kun taas tämä PT:n kuittaama lähde pyytää paikallisia maskattuja saumamuokkauksia. En ole tulkinnut aiempaa lupaa häviöttömään kaistakopiointiin yleiseksi luvaksi muuttaa alueita maskilla. Nykyisen työkalun puuttuva maskituki estää joka tapauksessa tämän vaiheen; jatkoratkaisun tulee huomioida myös menetelmäraja.

Erikseen tilatut uudet kokonaiset otot jatkuvat: r09c09 puisto, r08c08 Invalidien sijainti ja r07c08:n jatko sekä r09c10 korkea Panthéon oikealle jalustalle. Garnier 355 px säilyy lähteen hyväksymänä. Säilytän vanhat versiot.

ND 0,5 m/px on kirjattu vain vertailuksi, ei käyttöön. Rengas 2 on odottava, 0 kutsua, kunnes rengas 1 saa KS+PT-hyväksynnän. Sen tuleva uusi ohje on kokonainen piirros myös limityksissä, naapuri erillisenä viitteenä, ei kaistakopiota; KS tekee leikkauksen ja häivytyksen. Runtime ja julkaisu ovat erillisiä eikä niitä muuteta.
