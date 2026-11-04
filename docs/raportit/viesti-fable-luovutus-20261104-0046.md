# PT:n luovutus 4.11.2026 klo 00.46 (konteksti 30 %, pehmeä raja)

Edellinen: viesti-fable-luovutus-20261103-2345.md (af837070e); sen yö-ohje voimassa, muu korvattu tällä. Tallenne: /Users/Shared/Claude/keskustelut/Paatoimittaja-2026-11-03-klo-2349-0044.md.
Vahdit Monitorilla 30 min: python3 -u /Users/Shared/Claude/hooks/odottajat-vahti.py | grep ODOTTAA|TYHJÄKÄYNTI|TILA\|.+ ja /Users/Shared/Claude/hooks/codex-posti-vahti.sh. Viritä heti.
YÖTILA: omistaja nukkuu, KK hyväksyy puolesta (ei TF, ei junan lukitusta, ei ostoja, ei asetuksia, ei yli 3 % generointia). Kuvat PT:n kautta KK:lle. Pariisi kokonaan aamuksi (omistaja 22.31). Sitova lista: /Users/Shared/Claude/proto-3d/lokit/kk-peli-a94d8e7fb-20261103/KORJAUSLISTA.md.

## ENSIN
KK:n kanta y-laajin-löydökseen (viesti 00.45): koko Pariisi on suorakaide, terävä reuna mäkikarttaa vasten (lokit/julkaisija-yhdistelma-iso-f1fb45f10/y-laajin.png). Suositukseni: häivytys VS:lle k21:een + KS tarkistaa rajauksen. VS:ltä pyydetty selvitys. Saumat 2,2961 ja 2,3071: katsoin vain koontikoossa; täysikoko KK:lla.

## PARIISIN TILA
- NS: yhdistelmä f1fb45f10 (Kartta-testit 607/607) iso iPad valmis 00.44, muisti 3417/4080. Sillat, Riemukaari, nappula, vene, nimet ok koontikoossa. EI junaan: puut ja VS odottavat KK:ta. NS:ltä pyydetty täysikokoinen tarkistus.
- JU:n iPad-jono: k20 8d1a79394 ajossa (alkoi 00.44, sk-k20.txt; saumat, f, kulu, muisti; täyttö ei) → muistipiikki 9f8d2d13f + sali → Tripo → otsikko 6aed10e25 (+ vaaka) → palvelijat v8 e8336e228 (runko 9006f47c1, esikatselu) → v125.
- VS: k21 työn alla uudella VS:llä (luovutus c1e549f23): KK 00.16 + 00.20: kermakorttelit taloiksi, iso vaalea katto vain yksi rakennus ≤ puoli korttelia, tummat lohkot pois (tummin #85684a; syy auki), hautausmaa puistojen oliiviin, Z13, katujen leveys mitattava 2029:stä (KK oikaisi: 2029:n kadut noin 2× leveämmät; k20:n × 0,85 on väärään suuntaan). Oma kansio k21. Pari KK:lle minun kauttani, kun mittari täyttyy. KÄYTTÖÖN EI TÄYTTÖÄ.
- KS: puut KK 00.41 + 00.45 (lista viimeiset osiot). Ensin puun väri: vanha puukuva × 0,93 (ei tumma; KK:n 118/102/62 oli väärä, oikea noin 150/126/76), kuvan leveys 41–58 m, muodollisiin puutarhoihin tasaväliset rivit, muualle pienet ryhmät, kadulle yksi rivi. Boulognen väylät ja aukot jäävät. Louvre k3: suunta ok, nurmen pilkkureuna ja laikun loppu korjataan. Sacré-Cœur k4 EI: kaari kirkon ympäri (0,7 leveyttä sivuille, takana ristin korkeudelle), latvus 0,13, tumma pohja pois, kerma-aukio pois; kivetty aukio Codexilta yhtenä kuvana 2029-sc:n mallista. Seuraava pari + Luxembourg KK:lle PT:n kautta ennen NS:ää. Tasot NS:llä: Sacré-Cœur a6d6a8852c93 vain nurmen väriin, ei junaan.
- Kaikki KK:n "ei NS:lle" pätee, kunnes KK hyväksyy puun.

## MUUT AUKI
1. MUISTI = JULKAISURISKI: oikea reitti 4073 Mt, sali ≥ 4146 ja 4286 (raja 4080, kehityskäännös; NUI TULOS: proto-3d/lokit/nui-lahizoom-20261103/iso-vianhaku-4397cf20d/TULOS.md). Päätökseni: ei läpäisty, paketti (7f0ccc451 + 9d02ae999) seis. PK:n 9f8d2d13f (arvio 3800–3900, ei mitattu; lataus +6 s; vipu malloc_zone_pressure_relief). NUI ajaa salin savun samalla sha:lla; KK:n aamulistalla. Release ratkaisee.
2. PK: v8 jonossa, KK päättää kantamaan maljakon värin (yhä tumma, sirpaleet siniset): vie v8-kuvien kanssa. Ensiruutu 6aed10e25 hyväksytty. iPad vaaka puuttuu, B5 odottaa. Roolit eivät viesti KK:lle suoraan; PK:lle kerrottu.
3. Tripo: palvelijatar v2 työkuva, odottaa JU:n ALKAA-riviä; lopputoimitus + KK:n etu/taka ennen kytkentää.
4. LAV: v125 SHA256SUMS 53d8e8fec5c5, ei viety; esikatselu file://-juurella riittää nyt, iso iPad ennen junaa (KK:n parin jälkeen). Koodi ei viittaa v125:een ennen KK:ta. Koeajo: 5d, alkulento, Wumen (13 −412 −2.03), lattian varjot, sokkeli. Holvin kuvakohta auki. Esipiha v124 hyväksytty junaan. Baoding-lod1 404 ei ole vika; lod0 kaukana mittaamatta.
5. Levy 64 Gi (oli 70).
6. Työlistan hook pyytää tilanteita; päivitetty tähän mennessä 12 riviä "odottaa Pariisia".

## Opit
- Nollauksen tiimoilta jonossa olleet viestit voivat hukkua: lähetä avoin päätös uudelleen uudelle sessiolle (KS 00.13, KK puupari).
- Aloitus/luovutus viittaa sha:han; myöhempi lisäys jää muuten näkemättä (JU 629dc8d28).
- Tarkista sha:n sisältö git:llä ennen varoitusta (159acdf0c-varoitukseni oli turha).
