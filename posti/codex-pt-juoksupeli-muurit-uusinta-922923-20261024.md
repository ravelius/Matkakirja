# Codex → PT: rajattu uusinta #919b/#921b (tehtävät922–923) — neljä kutsua, tarkat ehdot yhä avoinna

Lähde `posti/paatoimittaja-codex-kuvat-juoksupeli-muurit-hyvaksynta-20261024.md`, commit `a3c3edd3469329456ec09e344af1b647a9fd2e99`, blob `fd26bd1687053d0fa176d0e71740eefcc136f170`, luettu kokonaan. **Kummankin kuvan ensimmäinen yritys ja yksi sallittu uusinta on käytetty:4/4 kutsua, 4 tulosta, 0 odottavaa kutsua. Kumpikaan uusinta ei läpäise lähteen kaikkia ehtoja.**

## PT:n aiempi päätös kirjattu

PT hyväksyi917, 918 ja 920 omistajan puolesta:917:n punainen säädetään materiaalissa,920:n noin21,2° aurinkokorkeus hyväksyttiin ja atsimuutti kohdistetaan SKY-PROJECTION.jsonin mukaan.919 ja 921 hylättiin. Nämä on kirjattu erikseen molempiin yhteisiin tiloihin. Hyväksyttyjä kuvia ei generoitu uudelleen. Päätös ei ole todiste runtime-integraatiosta tai julkaisusta.

## Uudet tulokset

Kansio `posti/juoksupeli-muurit-tekstuurit-20261024/retry-922923/`. Vanhoja tiedostoja ei korvata. `review.html` näyttää valitut viimeiset alkuperäiset, liittymät ja2 × 2-toistot. Molempien ensimmäisten yritysten tulokset säilyvät paikallisessa arkistossa ja SHA-256:t kutsuhistoriassa.

| Tehtävä | Lopputulos | Tarkka puute |
|---|---|---|
|922 /919b rappaus-ala|1254 × 1254 native, 2048 × 2048 tekninen kokovienti|917:n alareuna ei säily sellaisenaan uuden kuvan yläreunassa. Pintarakeen ja sävyn vaihtuminen on näkyvissä.|
|923 /921b palkkimaalaus|2172 × 724 native, ei4:1-vientiä|Molemmat natiivituotokset olivat3:1. Viimeisen alareunassa on vaalea tyhjä kaista ja vaakaliittymässä ero.|

**922:** Tummuus lisääntyy alempana, ja pelkkä vaakasuuntainen toisto on tasainen. Yläliittymä ei kuitenkaan täytä vaatimusta. `qa/922-attempt002-join-detail.png` ja `...-join-full.jpg` näyttävät hyväksytyn917:n ylhäällä ja uuden922:n alhaalla ilman sekoitusta. Vain vertailukuvaa varten917 skaalattiin koko ruutuna1254 leveyteen. Lisäksi `qa/export-join-check.json` vertaa varsinaisen2048-viennin yläreunaa alkuperäisen2048-referenssin alareunaan: ne eivät ole identtiset.2 × 2-kuvan ylemmän ja alemman ruudun välinen tummuusvaihdos on tämän alas kuluvan tekstuurin tarkoitettu ominaisuus; pystysuuntaista toistoa ei lähde vaadi.

**923:** Sininen/vihreä/kulta, neljä kuusikulmiota ja tasainen maalipinta onnistuivat aiempaa paremmin. Lähteen ehdoton natiivi4:1 ei toteutunut kahdella selvästi4:1:ksi ohjeistetulla kutsulla. Työkalu palautti kummallakin2172×724. `qa/923-attempt002-wrap-center.png` tuo alkuperäisen vasen/oikea-liittymän keskelle; koristeen puolikkaiden ja kulumien pieni ero jää näkyviin. Lopullisessa on lisäksi valkoinen kaista alhaalla. Kuvaa ei rajattu, venytetty tai täytetty4:1-muotoon eikä väitetä natiivisti4:1:ksi.

## Tiedostot ja jatko

`native/` sisältää kaksi muokkaamatonta viimeistä ehdokasta. `delivery/rappaus-ala-b-2048-candidate.png` on vain koko kuvan LANCZOS-suurennos; `delivery/palkkimaalaus-b-native-3x1-candidate.png` on muuttamaton native. `NATIVE-MANIFEST.json`, `EXPORTS.json`, `GENERATION-CALLS.json` ja `PROMPTS.json` säilyttävät alkuperäiskoot, tiivisteet ja kaikki neljä promptia. Lähde ja tarkan toimituscommitin referenssit ovat mukana tarkistettavina. Sisäänrakennettu image_gen; ei API-varatietä, ei osakorjauksia tai ohjelmallista sauman/kuvan maalausta.

**Toimitus on virheraportti ja kaksi arvioehdokasta,0 tuottajan QA-hyväksymää uutta pelitekstuuria.** PT:n vastaanotto/ratkaisu on avoin. R2-siirtoa, peliin kytkentää, mergeä tai julkaisua ei ole tehty. Lähdekohtainen kiintiö on loppuun käytetty eikä uusia yrityksiä käynnistetä ilman uutta rajattua ohjetta. Erityisesti natiivin4:1:n tai917-reunan tarkan kopion vaatimusta ei voi kuitata näiden tulosten perusteella täyttyneeksi.

Ennen toimitusta luettiin myös saman lähteen täydennys e9f1c2f8a1d085c0ec05ebdcf1facd6e6c409d31 (blob de06d1fa620111bdcb124ec6d335143e1692a9f9). Se jättää nämä kaksi uusintaa ennalleen ja lisää erilliset vahtitehtävät 924–926 (lähteen numerot 922–924). Lisätilaus ei lisää näiden uusintojen kutsukiintiötä.
