# Codex → PT: ikkunaristikko ja kaksi ovea — vahtitehtävät 924–926

Lähde `posti/paatoimittaja-codex-kuvat-juoksupeli-muurit-hyvaksynta-20261024.md`, commit `e9f1c2f8a1d085c0ec05ebdcf1facd6e6c409d31`, blob `de06d1fa620111bdcb124ec6d335143e1692a9f9`, luettu kokonaan. Lähteen numerot **922/923/924** vastaavat tässä **vahtitehtäviä 924/925/926**. Aiemmat vahtitehtävät 922/923 olivat rappaus-ala-b ja palkkimaalaus-b, eivät nämä ovet.

**Portin ovilehti läpäisi tuottajan visuaalisen tarkistuksen. Ikkunaristikon pystysauma ja huoneoven kahvojen valo jäävät avoimiksi.** PT:n vastaanotto ja pelikäyttöpäätös ovat erillisiä.

## Tulos ja tarkistus

| Vahtitehtävä / lähdenumero | Valittu yritys | Native → kokovienti | Tila |
|---|---|---|---|
| 924 / 922 ikkunaristikko | 1 | 1254 × 1254 RGBA → 512 × 512 RGBA + alfa | Ei täysin saumaton pystysuunnassa; vain arvioehdokas. |
| 925 / 923 portin ovilehti | 2 | 887 × 1774 → 1024 × 2048 RGB | Tuottajan visuaalinen tarkistus läpäisty; 81 nastaa. |
| 926 / 924 huoneen puuovi | 2 | 887 × 1774 → 512 × 1024 RGB | Kahvoissa on yhä valmiiksi piirtynyttä valoa ja tummuutta; vain arvioehdokas. |

**Ikkunaristikko:** aukot ovat aidosti läpinäkyviä. Mukana on sekä RGBA-PNG että sen alfan suora harmaasävyinen kanavaerotus; maskia ei maalattu tai kynnystetty uudelleen. Puun alfa ei ole kaikkialla 255: natiivin ensimmäisen yrityksen puualueen mediaani on 251, joten lievää läpikuultavuutta on myös reunoja sisempänä. Tarkat vientiarvot ovat `qa/export-alpha-check.json`-tiedostossa. Ensimmäisen kuvan vasen/oikea reunamaskin poikkeama on noin 0,32 % ja ylä/ala noin 2,55 % vertailupisteistä (alfa > 127); pintasävyssä on pieni vaakasuora liittymä. Toisen yrityksen ylä/ala-maskipoikkeama kasvoi noin 43,14 %:iin ja kuvio katkeaa selvästi. Siksi ensimmäinen on ensisijainen arvioehdokas, toinen on mukana erikseen hylättynä vertailuna. Kumpaakaan ei merkitä täysin molempiin suuntiin saumattomaksi.

**Portin ovilehti:** ensimmäisessä oli 8 × 9 eli 72 nastaa sekä voimakkaasti valaistut nastat. Uusinnassa on tarkistettu **9 riviä, jokaisessa 9 nastaa, yhteensä 81**. Kultavärin yhtenäisten alueiden laskenta ja silmämääräinen tarkistus vastaavat toisiaan; `qa/925-attempt002-stud-count.png` numeroi kaikki kohdat vain QA-kuvassa. Alkuperäisessä ja toimitus-PNG:ssä ei ole numeroita. Nastoista poistui pallomainen valo-/varjoreliefi; ne ovat värikartassa tasaiset kultaiset kohdat. Lopullinen kohouma ja valaistus kuuluvat pelin materiaaliin/geometriaan. Tämä on visuaalinen tarkistus, ei fyysisesti mitattu albedo. Native on 887 × 1774, joten 1024 × 2048 on lievä suurennos, ei alkuperäinen generointiresoluutio.

**Huoneen puuovi:** suljettu punaruskea puuovi, suora etukamera ja kaksi kahvarengasta toteutuvat. Uusinnan kahvoissa on edelleen vaaleita reunoja ja tummia alapuolia; lähteen ”ei leivottua valoa” ei toteudu kokonaan. Näitä ei piilotettu jälkikäsittelyllä.

## Paketti, kutsut ja rajat

Kansio: `posti/juoksupeli-muurit-tekstuurit-20261024/architecture-924926/`. `review.html` avaa kolmen kohteen valitut kuvat, ristikon toistot ja nastalaskennan. `native/` sisältää kolme ensisijaista muuttamatonta kuvaa sekä ristikon hylätyn uusinnan. `delivery/` sisältää pyydetyt kolme kokovientiä ja ristikon alfakanavan. Kaikki aiemmat versiot säilyvät.

**Kuusi kokonaista generointia, kuusi tulosta:** yksi ensimmäinen ja yksi selkeän virheen perusteella tehty sallittu uusinta per kuva. 0 odottavaa kutsua, 0 jäljellä olevaa automaattista uusintaa. `GENERATION-CALLS.json` säilyttää kaikkien kuuden yrityksen ajat, syyt ja tiivisteet; `PROMPTS.json` kaikki promptit. Sisäänrakennettu image_gen. Ei API-varatietä, ei luovia pikselimuokkauksia, ei varjojen poistoa tai saumojen korjausta ohjelmallisesti. Vain koko kuvan LANCZOS-kokoviennit, alfan suora kanavaerotus ja QA-havainnekuvat.

810:n lähtökuja ja porttikäytävä katsottiin väri-/materiaalireferensseiksi. Niiden aurinkoa, perspektiiviä, tekstejä tai väärää 8 × 6 nastoitusta ei käytetty vaatimuksina. Hyväksyttyjä 917/918/920-kuvia ei uusittu, palkkivyö säilyy aiempana 921b-tilauksena ja konsolit kuuluvat Lavastajan geometriaan.

Tämä on **postitoimitus PT:n tarkistukseen: yksi tuottajan visuaalisen QA:n läpäissyt kuvapinta ja kaksi puutteellista arvioehdokasta**, lisäksi hylätyn ristikkouusinnan vertailutiedosto. R2-siirtoa, PT:n tai omistajan hyväksyntää tälle uudelle erälle, runtime-integraatiota, mergeä tai julkaisua ei väitetä. Tarkat avoimet ehdot on ilmoitettu; uusia yrityksiä varten tarvitaan uusi rajattu ohje.
