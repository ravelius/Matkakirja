# Natiivi-UI: luovutus 17.10.2026 klo 12.00 (Postivahti: kova raja 36 %)

Natiivi-UI (Opus) → seuraava Natiivi-UI-sessio. Korvaa -0930:n jonon. Aiempien luovutusten "Opit" (-0930, -0625, -0320, -0140 ja -0105) ovat yhä voimassa.
Viestit lähetetään send_messagella session id:llä (osoitteet: /Users/Shared/Claude/osoitekirja.md). PT:lle enintään 3 riviä.
Proto-worktreet: /Users/Shared/Claude/wt/proto-natiivi-ui-*. Ajot: /Users/Shared/Claude/proto-3d/tyokalut/natiivi-ui-ajot/ (ajo-*.zsh, sk-*.txt, ketjut-20261016/*).
Simua käytetään VAIN Julkaisijan SIMU NYT -viestistä, ja SIMU VAPAA lähetetään perään. Uusi käännösodottaja ilmoitetaan Julkaisijalle ETUKÄTEEN.

## TILA 12.00
- **Uni v2 PERUTTU** (PT 10.3x, omistaja 10.37): unen v3 suunnitellaan KK:ssa. Haara natiivi-ui/uni-v2 0079acc76 jää tekniikan pohjaksi. Tuotantoa ei tehdä ennen PT:n kautta tulevaa suunnitelmaa.
- **Kokeet → KESKENERÄISET** 663953c51 (natiivi-ui/kokeet-linsseihin-200): Peking siirtyi Kehittäjä-paneelista linssivalikon KESKENERÄISET-osioon, ja Olavinlinnan kaksoisrivi poistui (Olavinlinna on Pelit › KESKENERÄISET -osiossa).
  - Kuvapari OK: proto-3d/lokit/pari-kokeet-keskeneraiset-200-20261017.png → PT → KK.
- **Museon esikatselu** 2d4ed9e36 (LS:n löydös) on todennettu simulla ja jo junassa 200 (ed7c34c52).
- **KEHYS-KÄÄRÖ + Kiinan palkki**, haara natiivi-ui/kaaro-rajat-200, kärki **471163876** (junan 200 päällä):
  - 152969190: rullat linssin ylärivin alle ja filminauhan yläpuolelle (KehysKaaro.AsetaRajat). 11.28-simussa rullat jäivät ylärivin ja nauhan alle.
  - VAIHDOS (34dbeb288, c2a052bfa) tehtiin omistajan 11.46 päätöksellä, mutta omistaja kumosi sen klo 11.55. Se on peruttu revertillä (7405176f3, f41525d5d). **Älä yhdistä c2a052bfa:ta.**
  - bfe52e6e9: tyylikirjan KEHYS-KÄÄRÖ "sijainti" = rajat (web-PR #4803, CI vihreä, odottaa mergeä).
  - 471163876: Kiinan palkin otsikkorivi = päädynastia typografialla otsikko 21 pt, pysyvä (nimikyltti Pida). Linssin nimi pois palkista, sinetti kartalla ennallaan (omistaja 11.55, PT hyväksyi 12.3x).
  - Käännös: odottaja L2:ssa (nohup ketjut-20261016/kaaro-rajat-200-kaannos.zsh 471163876 → _tyo/natiivi-ui/kaaro-rajat-200-app), PK:n fft-meren jälkeen. Julkaisija tietää (iPhone ~5 min).
- **Karttaseppä:** valopisteiden merkki = kartan nimiö pääkaupunkityylillä (PT hyväksyi). KS tekee sen. KehysKaaro.Ruudulla-lippu poistettiin, ja KS tietää tämän.
- **Kamerapöytä + SEURAA** a07ce043a (juna 200): ennallaan -0930:n mukaan. Se odottaa KS:n ja PK:n korjauksia. App _tyo/natiivi-ui/kamerapoyta-200-app säilytetään.

## ENSIN
1. Kun kaaro-rajat-200-app on KÄÄNNETTY (`tail -1 _tyo/natiivi-ui/kaaro-rajat-200-app/kaannos.out`), odota Julkaisijan SIMU NYT. Aja sitten
   `zsh /Users/Shared/Claude/proto-3d/tyokalut/natiivi-ui-ajot/ajo-kaaro-rajat-200.zsh /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/kaaro-rajat-200-app`
   (sk-kaaro-rajat-200.txt: R1 pysty, P1 Sui-vaihto, P2 nimi pysyy, R2 vaaka) ja lähetä SIMU VAPAA.
   Katso arkki itse: rullat näkyvissä, "Sui" isona palkissa, kello 589. Lähetä arkki PT:lle ennen junaa.
   Jos käännös kaatuu "VIKA luo":on, ketju yrittää uudelleen itse (6 kertaa).
2. Jos kuva on OK: SHA 471163876 PT:lle junaan 200 ja web-PR #4803 merge (CI vihreä; kaavan mukaan tai Julkaisijalle).
3. Kun PT pyytää: SEURAA-video (a07ce043a) ja kamerapöydän uusinta KS:n ja PK:n korjausten jälkeen (-0930:n kohta 3).

## Opit
- **Käännöksen vaihto vain odottajalle:** lue ensin `/tmp/matkakirja-kaannospalvelu-2.lukko/kuka`. Lukossa olevaa käännöstä ei tapeta, koska orpo Unity kaatoi VS:n valas-197:n klo 11.50 ja oman luo:n kahdesti. kaannos.outin "jonossa"-rivi voi olla vanhentunut.
- Skenaariossa `ui valikko kehittaja` jättää paneelin auki pillerin päälle. Sulje se ennen pillerikomentoja komennolla `ui valikko`. Paneelin loppuun pääsee vierittämällä paneelin sisältä: `veto 250 700 250 200`.
- PT:n viestit voivat olla ristiriitaisia (Postivahdin tiivistelmä): kysy omistajan sanatarkka viesti ennen kuin käännät suuntaa.
- Omistajan päätös voi kumoutua 10 minuutissa: tee iso uusi pinta omaan committiinsa, jotta revert on helppo.
