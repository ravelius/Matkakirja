# Laitekierros 20b — v1983 tuotanto

20.9.2026 n. klo 23.17–23.25. Testattu matkakirja.app (tuotanto, v1983
vahvistettu `git show origin/main:js/main.js`). **Menetelmä sekoitettu**:
alkuosa (nimiöt) iPhone 18 Pro -simulaattorilla oikeasti, loppuosa
(liftauksen himmeä verkko, kohdekortin lähderivi) Playwright/WebKit
paikallista palvelinta vasten, koska "Liiku"-tyyppiset napit eivät
edelleenkään reagoi simulaattorin synteettiseen kosketukseen (sama
tunnettu työkalurajoite, ks. aiemmat raportit). Kaappaukset
`docs/raportit/kaappaukset/laitekierros-20b-20260920/`.

## 1) Kohdemaan nimiöt elävinä — kyllä, selvästi parempi

Vahvistettu sekä simulaattorilla että Playwrightilla: isot
kaupunkinimet (MARSEILLE, Toulouse, Bordeaux, Lyon, Strasbourg, Nizza,
Nancy…) näkyvät nyt selvästi kartalla zoomatussa Ranskan näkymässä —
ennen v1983:a näitä ei näkynyt samalla tasolla.

## 2) Välimeri irti rannasta — enimmäkseen kyllä

`valimeri-simulaattori.png`: "VÄLIMERI"-teksti alkaa juuri rantaviivan
kohdalta ja jatkuu selvästi meren puolelle — suurin osa tekstistä on
harmaan merialueen päällä, ei maan päällä. En pitäisi tätä enää maahan
kiinni roikkuvana, mutta teksti EI ole kokonaan irti rannasta — sana
alkaa suunnilleen rantaviivalta. Rajatapaus, ei mielestäni enää vika.

## 3) Camarguen hevoset -nimiö JA "ei limittyviä nimiöitä" — EI TOTEUTUNUT (vakavuus 2)

**"Camarguen hevoset" ja "Camarguenvarsa" -nimiöt piirtyvät suoraan
päällekkäin**, molemmat lukukelvottomiksi asti. Vahvistettu
KAHDESTI RIIPPUMATTOMASTI: iPhone-simulaattorilla tuotantoa vasten
(`camargue-limittyvat-nimiot-simulaattori.png`) ja Playwright/WebKitillä
paikallista palvelinta vasten samalta alueelta molemmissa kaappauksissa
(`1-marseille-saapuminen.png`, `1b-kartta-puhtaana.png`). Tämä ei siis
ole laitteen tai työkalun oikku vaan toistuva sijoitteluvika kahden
lähekkäisen Camargue-nimiön välillä.

## 4) Liftauksen himmeä reittiverkko — TOIMII, näyttää hyvältä

`6-zoomattu-ulos.png` (pallonäkymä liftauksen aikana, Marseille):
koko laudan reittiverkko piirtyy himmeänä harmaana viivastona koko
maapallon päälle, ja pelaajan kantaman kaaret erottuvat siitä selvästi
kirkkaampana/värillisenä nippuna Ranskan kohdalla. Rendaus on ehjä, ei
repeytyneitä viivoja tai puuttuvia paloja tässä kaappauksessa.

**Sujuvuutta (fps) en pystynyt arvioimaan silmämääräisesti**: en
saanut panorointia/zoomausta toimimaan liftausnäkymässä
simulaattorilla (sama "Liiku"-tyyppinen kosketusongelma ulottui myös
tähän), ja Playwright-kaappaus on staattinen kuva. Jos tarvitsette
sujuvuusarvion, se vaatisi joko oikean laitteen (odottaa yhä
omistajan simulaattorilupaa) tai laitemittarin (`?mittari=1`, näin
UI:ssakin — "Laitemittari on pois — kytke päälle mitataksesi kartan
sujuvuutta").

## 5) Kohdekortin lähderivi pois — KORJATTU v1983:ssa ✓

Uusintatesti samalla menetelmällä kuin kierros 20:n löydös (Pic du
Midi de Bigorre -kortti, Playwright): v1982:ssa lähdeviite
("en-Wikipedia … tarkistettu …") näkyi kortin lopussa, **v1983:ssa
sitä ei enää ole** — kortin teksti päättyy nyt kuvaukseen ilman
Wikipedia-viitettä. Vahvistettu ohjelmallisesti (DOM-teksti ei
sisällä "lähde:"/"tarkistettu"-kuviota).

## Yhteenveto

| Kohta | Tulos |
| --- | --- |
| Nimiöt elävinä | OK |
| Välimeri irti rannasta | Rajatapaus, hyväksyttävä |
| Camarguen hevoset / ei limittyviä nimiöitä | **EI TOTEUTUNUT** — kaksi nimiötä limittyy (vakavuus 2) |
| Himmeä reittiverkko | OK, näyttää oikein |
| Liftauksen sujuvuus | Ei mitattavissa tällä kierroksella |
| Lähderivi pois | **KORJATTU** ✓ |
