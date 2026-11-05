# PT:n luovutus 5.11.2026 klo 16.05 (konteksti 30 %)

Edellinen: viesti-fable-luovutus-20261105-1256.md (sen Opit ja roolien taustat voimassa; muu korvattu tällä).
Keskustelu: /Users/Shared/Claude/keskustelut/Paatoimittaja-2026-11-05-klo-1259-1559.md

## KIIRE: VIIKKOKÄYTTÖ
- 93 % klo 15.58, tahti noin 2,3 %/h: 96 % noin 17.15, 99 % noin 18.30. Nollaus 9.11. klo 03.00.
- 96 %:ssa valmistele tilinvaihto (docs/tilinvaihto.md). vvi@vvi.fi käytettävissä pe 6.11. 07.00 alkaen; tänään ainoa ehdokas päätili ja siihen KK:n kortti ennen 18.30. KK:lle kerrottu 15.58.
- 12.21: koodaustilillä 99 % = yksi rivi omistajalle, EI keventämistä eikä pysäytystä. Postivahti hälyttää 96 %:ssa. Tarkista, että Postivahti luki oikaisuni: 7.37 pätee ennallaan (ohjeeni "vain kovalla rajalla" peruttu).
- Levy 106 Gi (129 Gi klo 12.56), T7 331 Gi. NS:n T7 → NAS osa 2:n poistolupaa ei ole tullut; tarkista NS:n luovutuksesta.

## OMISTAJAN PÄÄTÖKSET 12.57–15.59 (Raamattu 2.210, 2.213, 2.214, 2.215 mainissa, paitsi 15.59 tässä PR:ssä)
- 12.57 Lontoon koe vasta Pariisin lisäkohteiden jälkeen (2.213). Työlistalla odottaa sarjaa.
- 13.24 kuvat heti: Pariisin näkyvä askel → Mac-kuva suoraan KK:lle, kopio PT:lle (2.214).
- 13.28 ja 14.04 pieni iPad päivittyy, kun lisää 3D-malleja on kartalla (vain asennus). 14.11 päivitetty 661377bbb:hen. SEURAAVA ERÄ: kallistus + vain uudet kohteet + kyltit + horisontin nimet kasassa; PT tai KK sanoo JU:lle.
- 13.46 Louvren ja Riemukaaren kuvat kelpaavat (viety 13.49, julisteet/herokoe/; TF 217 ei viittaa, TF 218:n tarkistus pyydetty JU:lta, ei vastausta). Maapohjat Codexilla. Kukkiva puu pois.
- 13.54 puistot kokonaan, Riemukaaresta koko aukio. KK hyväksyi alueet v7.
- 14.04 Louvren itäpäähän paviljonki. 14.40 Louvren malli piirroksista 21g.
- 14.27 mäkien varjostus häipyy kaupungin yllä. 14.29 kamera jää Pariisin ylle luennan jälkeen. 15.05 Liiku loitontaa Pariisin yllä. 15.18 aloituslento selvästi sivusta, PARIISI ilman tummennusta.
- 14.44 ja 14.55 kallistus 5°:n päähän vaakatasosta, kartta saa olla viiva, horisontti lähelle; nimet häipyvät horisontissa; vain uudet 3D-kohteet; vaaleat kyltit.
- 14.51–15.01 pienet kohteet (kaaret, vaaka, torni, pylväs, laiva) olivat 2D-merkkejä: kuva pois, napautus kylttiin, laiva pois. Kyltti näyttää noston nimen jo ennen löytämistä. Pyöreät valokuvamerkit jäävät. Pyramidi jää, kunnes uusi Louvre avaa museon.
- 14.57 ja 15.59 kadonneet aarteet jäävät leikattuina kuvina + tumma tähtikyltti; toisen rakennuksen paikalla vain kyltti.
- OMAT PÄÄTÖKSENI: kyltti korvaa kursiivisen nimen; portaat ja häivytys rajataan Pariisiin ennen lukitusta; tyhjä pohja laitteella loppumittauksessa; saumakorjaus kierrossa loppumittauksessa. 60°:n kierto (NS:n arvo) sulkee alle 20°:n varatavan pois.

## ROOLIT (roolien viestien mukaan, kuvia en ole itse katsonut)
- NS: aloitettu -1558 (ba9f049d1). Tyhjä pohja: koe 5282b9fc4 JU:lla, ajamatta. Liiku-loitonnus tekemättä? Tarkista. Intro 9bb4e3476: 60° ok; viat i07 (PARIISI osuu nimiin), n-1km-85 (Notre-Dame ei nouse, tornit levenevät ylöspäin). 85° ja horisontti koehaarassa; anna etäisyysarvo NUI:lle.
- NUI: natiivi-ui/kyltit-219 098cf05cd, kääntämättä ja ajamatta, JU:n jonossa (KK:n 15.35-lista, Pariisi-nimi, KS:n leikkeet). Auki kuumailmapallon kyltin peitto. YHDISTÄESSÄ lento-haaraan palautetaan KaytettyRaja() ja || Kiertaa.
- KS: aloitettu -1548 (00052878a). Louvre: kaksi Tripo-ottoa hylätty, otto 3 viistokuvasta käynnissä. Eiffel: otto 2 ei kelpaa, suositus KK:lla uusista etelä- ja viistokuvista. Muut seitsemän vasta KK:n katsottua. Auki: Peilisalin torni, kuvien koko keskitasolla, napautus todentamatta.
- VS: aloitettu f998e0726. Portaat rajattu 38abe520b, c430bcd40 sisältää sen. Alppien vertailu ja metsäkoe JU:n jonossa. Ei lukittu; lukittava versio on vertailtava.
- JU: vuorottelee juoksupelin ja Pariisin ajot. Ohjeeni 13.24 "Pariisi kärkeen" jätti PK:n odottamaan 14.33 alkaen; korvattu.
- PK: taso 1, oli nollautumassa (585981a41). Tarkista, että juoksupeli etenee: omistaja kysyi 15.05.
- LAV: aloitettu 283b53e18. Pohja yhd + aukio-1-1 kk2r:stä, ei friisin siirtoa; yksi 40 kuvan Mac-ajo Pariisin ajojen jälkeen, pari PT:lle. EI VIENTIÄ ennen PT:n sanaa ja PK:n vahvistusta, ettei julkaistu TF hae polkua.
- Asemataulu: oli nollautumassa 13.05. Tarkista, että taulu päivittyy.

## OPIT
- Tarkista jokainen rajaus koko kartan vaikutusta vasten: NUI (huiput), VS (varjostus, portaat) tekivät koko pelin muutoksen Pariisin takia. 2.209 ohjaa rajaamaan Pariisiin.
- Karttasepän nollauksessa päätös voi mennä ristiin: lähetä omistajan päätös Postivahdin kautta aloitusviestiin, jos rooli on nollautumassa, ja tarkista luovutus.
- Älä lupaa keventämistä: lue 12.21 ennen viestiä. Syyt merkitään arvauksiksi, jos niitä ei ole mitattu.
- Älä ohjaa yhtä projektia jonon kärkeen: juoksupeli jäi odottamaan.
- Luku, jota omistaja ei sanonut, merkitään tekijän arvoksi (60°).
