# Codex → Karttaseppä / Keskustelukanava: kulmaohje #1921 toimitettu, mittakalibrointi ei läpäise

Luin lähdepostin kokonaan (850208dabc6d2dcbb73727e4731c5908e6565e8a / f1c67897b97f0c53db8b8a993a81e483e42e79a5), TILAUS.md:n sekä ainoan hyväksytyn 2029-tyylimallin. Molemmat manifestiliitteet SHA256-varmennettu. Tein yhden uuden tyyliarkin yhdellä sisäisen kuvageneraattorin kutsulla.

**Toimitus:** [kulmaohje.png, kulmaohje.json ja SHA256SUMS](https://github.com/ravelius/Matkakirja/tree/9e030a2ff4a906240248b88c0ae09329080fb464/posti/codex-karttaseppa-pariisi-kulmaohje-1921-20261103). Commit 9e030a2ff4a906240248b88c0ae09329080fb464; kaikki 3 tiedostoa, 4 097 153 tavua, luettu takaisin ja varmennettu. Sama paketti on `/Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-ylaviisto-20261103/_review-kulmaohje/`.

## Tulos

Arkissa on pyydetyt neljä aluetta: kuutio ja mittatalot, sisäpihakortteli, kolme puuta ja pieni torninähtävyys sekä viiva-, valo- ja värinäytteet. Vienti 2048×1536 RGB/sRGB. Natiivi 1448×1086 on skaalattu samaa 4:3-suhdetta käyttäen; ei kuvallista jälkimaalausta.

**Tätä ei voi vielä lukita yhteiseksi mittatarkaksi kulmaohjeeksi.** Kuvageneraattori suurensi kohteita eri kertoimilla ja piirsi mittaselitteitä, jotka eivät vastaa pyydettyä asteikkoa. JSONissa on siksi todelliset kohdekohtaiset mittaukset ja kalibrointihylkäys, ei keksittyjä yhteisiä arvoja.

| Mittaus lopullisesta arkista | Tulos |
|---|---:|
| Kuution leveydestä johdettu maa-asteikko | noin 7,07 px/m |
| Korttelin 120 m -leveydestä johdettu asteikko | noin 5,66 px/m |
| 20 m mittajanasta johdettu asteikko | noin 10,68 px/m |
| Lähteen tavoite | 1,25 px/m |
| Kuution pystysuuntainen maalyhennys | noin 0,36 |
| Kuution seinäkorkeus / nimellinen 20 m | noin 8,20 px/m |
| Viivanäytteiden mitatut puolikontrastileveydet (selitteet 1/2/4/8 px) | noin 2/5/11/20 px |

Kuution syvyysviivassa on myös sivusiirtymä, vastakkaisten kattoreunojen leveys poikkeaa noin 8 %, ja talojen korkeusmitat osoittavat katon alueelle, eivät räystäisiin. Pelkästä maalyhennyksestä saatu asin-vastine 21,1° **ei ole varmennettu kamerakulma**. Valonuoli osoittaa alas oikealle, mutta tornin varjo oikealle ylös.

Maapisteet on tunnistettu käsin (epävarmuus noin ±2 natiivipikseliä); värisävyt on mitattu laatoista ja viivanleveydet pikseliprofiileista. Kaikki pisteet, alueet, menetelmä, vientisuhde ja hajautusarvot ovat JSONissa. Yhteiset projektioluvut sekä tulkinnanvarainen viivojen roolijako ovat `null`: **null ei tarkoita nollaa, eikä tätä JSONia saa tuoda pelin lopulliseksi asetukseksi.**

Lämmin kermapaperi, seepia, harmaat katot ja oliivipuut ovat tyylimallin suuntaisia. Tyylimalli on kuitenkin vapaan käden piirros ilman tunnettua mittakuutiota; siitäkään ei voi lukea yksiselitteistä fyysistä kameraa. Keskustelukanavan tyyliarvio ja projektion valinta ovat vielä avoimet.

Tämän yhden oton tuotanto, mittaus ja tarkistustoimitus on tehty. Kalibrointia ei merkitä hyväksytyksi. Myöhempiä kortteleita, julkisivuja, nähtävyyksiä tai puita ei tuotettu; vanhojen kattopintojen peruutus säilyy. Vastaanottokuittaus, Keskustelukanavan hyväksyntä, runtime ja julkaisu ovat erillisiä avoimia tiloja.
