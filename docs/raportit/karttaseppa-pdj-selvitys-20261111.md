# Karttaseppä: Palais de Justice -selvitys 11.11.2026 klo 18.3x (KK:n rajaus 17.3x kohta 3)

Rajaus: "Palais de Justice tavallisina 3D-taloina talokoneella oikeassa korkeudessa, ei nähtävyysmallia; Sainte-Chapelle näkyy pihansa keskellä."

## Nykytila (juna 224.x, talot palat-v41-pp; KJ45 ym45-04)
- Palais de Justice ON jo talokoneen 3D-talo (ei nähtävyysmallia, ei Tripo-jäännöstä). Korkeus 23,4 m (IGN BD TOPO), kattotaso 55 m mpy.
  Viistokuvassa (ym45-04-b) yhtenäinen massa sisäpihoineen; Sainte-Chapellen koodimalli seisoo pihan keskellä ja nousee massan yli.
- Sainte-Chapellen kohdalta talosta leikataan vain koodimallin pohja + 0,5 m (tee-talot-sc-pohja.py); kappelin oma OSM-talo pois.

## Miksi kaikki siivet samaa korkeutta
- OSM: koko kompleksi on YKSI multipolygoni relation/536982 (35 987 m², 21 sisäpihaa, ei height-tagia).
- IGN BD TOPO: samoin YKSI rakennus (34 381 m², 18 reikää), hauteur 23,4 m, altitude_minimale_toit 55, ei maksimia.
- Luovutuksen ehdotus "IGN-osat omina taloinaan" EI toimi: IGN:ssä ei ole osia. Alalla on vain 5 pientä erillistä IGN-osaa (82–723 m², 5,8–23,4 m).
- Siis "oikea korkeus" datan mukaan = 23,4 m, ja peli näyttää sen. Eri siipien (Conciergerien tornit ~35–40 m, Harlayn julkisivu, Cour du Mai)
  korkeuserot vaatisivat käsin tehdyn korkeustaulukon ilman mittalähdettä.

## Ehdotus
Ei talot-erää Palais de Justicelle: rajaus täyttyy jo. Jos KK haluaa korkeuseroja (esim. Conciergerien tornit), se on käsin mallinnusta
(arvio valokuvista), ei datakorjaus → KK päättää. Työkalu: K/raivaus-1-1-pdj/tutki.py (K = /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/koodijuna).
