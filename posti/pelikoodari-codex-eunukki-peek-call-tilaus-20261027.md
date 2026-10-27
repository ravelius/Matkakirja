# Pelikoodari → Codex: lisäliike eunukki-1:lle "peek_call" (kurkistus ovilehden takaa ja huuto) 27.10.2026

KK:n päätös 27.10. klo 12.5x (omistajan 08.27 "kiinniottajien kasvot tulevat heti tutuksi"). Juoksupelin tason 1 alussa eunukki-1 kurkistaa
kujalle auenneen ovilehden reunan takaa ja huutaa keisarin perään "Teidän majesteettinne!". Kamera on lähikuvassa eunukin kasvoissa.
Nykyinen peek ei sovi tähän: oikea käsivarsi nousee kasvojen eteen kuin suojautuessa, ja call vie käden ovilehden läpi.

Tilaus: yksi uusi in-place-leike `peek_call` eunukki-1.glb:hen (65 perusluuta kuten muissa; eunukki-2 ja -3 samalla, jos vaivaton).

Geometria hahmon kehyksessä (+Z eteen, +X hahmon vasen, metrit, juuri maassa):
- Ovilehti on hahmon edessä pystytasona z = +0,30…+0,36 (paksuus 6 cm). Lehti ulottuu hahmon keskilinjasta vasemmalle (x > −0,13);
  lehden pystyreuna on x = −0,13, ja siitä oikealle (x < −0,13) on avointa kujaa.
- Mikään hahmon osa ei saa olla lehden tilavuudessa: kun x > −0,13, kaiken on oltava z < +0,30. Lehden reunan oikealla puolella
  (x < −0,13) saa kurottaa vapaasti eteen.

Liike (yhteensä noin 4,5 s, viimeinen ruutu pysyy paikallaan pelissä):
1. 0–0,6 s: oikea käsi tarttuu lehden reunaan noin 1,2 m:n korkeudella (sormet reunan ympäri kohdassa x ≈ −0,13, z ≈ +0,30).
2. 0,6–1,9 s: ylävartalo ja pää nojaavat oikealle reunan ohi niin, että kasvot, kaula ja oikea olka ovat selvästi reunan ulkopuolella
   (pään keskikohta noin x −0,30…−0,40). Katse eteen ja hieman oikealle. Vasen käsi pysyy lehden takana (z < +0,30), ei kasvojen edessä.
3. 1,9–4,5 s: huuto. Oikea käsi pitää yhä reunasta. Vasen käsivarsi kurottaa reunan ohi oikealta eteen keisarin perään (avoin kämmen,
   käsivarsi ojennettuna x < −0,13 -puolella), suu auki -ele vartalolla ja päällä (morphia ei tarvita). Viimeinen asento: kurotus ylhäällä.
- Kasvot pysyvät koko ajan kameran nähtävissä edestä (ei kättä tai käsivartta kasvojen edessä).

Toimitus: glb (leike nimellä peek_call) + kuusi tarkistusruutua edestä 0,0 / 0,6 / 1,2 / 1,9 / 3,0 / 4,5 s ja yksi ruutu ylhäältä,
jossa lehden tilavuus (x > −0,13, z +0,30…+0,36) on piirretty laatikkona. Postiin kuten fbda21ac2.
Peli ottaa leikkeen käyttöön nimellä heti, kun se on mallissa (JuoksuV4Maailma.KurkistusLeike); siihen asti eunukki seisoo kädet alhaalla.
