# PT:n luovutus 3.11.2026 klo 22.15 (konteksti 30 %, pehmeä raja)

Edellinen: viesti-fable-luovutus-20261103-2027.md. Tili vvi@vvi.fi (KK local_d5f31591-…). Taulu https://claude.ai/artifact/R6VQFTUNq629zSzah719Uy. Id:t osoitekirjasta.
Vahdit Monitorilla 30 min (postilaatikko ls-remote, codex-posti-vahti.sh, odottajat-vahti.py | grep ODOTTAA|TYHJÄKÄYNTI|TILA), uudelleen joka päättymisellä.

## Tehty
- KAATUMINEN TODISTETTU: ea2d6912f sulku ✕:llä (vaiheet.txt 21.07.09) → huippu 3563 Mt, 0 varoitusta. KK:lle kerrottu.
- Juna 218 iso paketti nyt 4397cf20d (= ea2d6912f + elävä kartta 20b21efee + NUI salit 40ed9da3c); laiteajo JU:lla.
  Seuraavalle kierrokselle junalupa: NUI 723f738c0 (pohjakorjaukset). Juna 219: keltakatot-v1 valmis (v2 hylätty), pronssit 42/42 OK.
- Raamattu (kaikki mainissa): 2.204 rakennusperiaate 20.51 (PR 6214), ei veden päälle 21.29 (6219), oikea G-malli 22.09 (6225),
  takana oleva joki saa peittyä 22.14 (6226); 2.200 Puyin tarina ei itsestään juoksun aikana 21.48–22.05 (6224).
  KK:n väärä tulkinta "ohjainopetus pois" kirjattiin 6222 ja PERUTTIIN 6223:lla; PK:n haara c2eea58ea hylätty, JU ja Postivahti tietävät.
- Levy: siirra_t7 ajettu 21.31 (129 kohdetta, 45,7 G), vapaata silti vain 80 Gi.

## AUKI (järjestys)
1. Uusi kartta (KK suunnittelee): ND k4 SEIS (e18b31b15, väärä malli G-v4) → KS tilaa uudelleen oikealla G:llä (d0191a334, tornit levenevät ylöspäin, takana joki saa peittyä)
   → KS tarkistaa → PT → KK. A2-kortteli k4 koekäytössä: VS vie peliin, JU kolme zoomia 2029:ää vasten (sisäpihat?).
   NS: kertoimet eb1749604 (vesisääntö) yhdistetään väliaikaisena JU:n k6-kuvien jälkeen; seuraava versio takana-joki-säännöllä. Kuvat → KK.
   NUI: Pariisin pystysauma = Cesiumin rasteritaso geometrialaatoittain; A/B 3176be95f JU:lla.
2. PK: jalki v3 9d02ae999 (taso1b) ja palvelijat v5 JU:n jonossa → pelikuvapari PT:lle.
3. LAV: avoimet-v58 (kivetys Yangxinmenin esipihalle) kuitattu → pari 5/5d.
4. KS taustaajot kuolivat yhtä aikaa 21.54 (T7-linkki hetken katki), uudelleen käynnissä. Jos toistuu → selvitä yhteinen syy.
5. Alkuintro estetty (Ateena 2.135; Košice/Vilna generointi, omistajan kysymys 26.10. alkaen).

## Opit
- KK:n välittämä päätös voi peruuntua minuuteissa: ennen Raamattu-PR:ää varmista, ettei KK:lta tule tarkennusta (6222 → 6223).
- Peruutus pitää viedä myös luovutuksiin (PK 0A) ja JU:lle, muuten seuraava rooli toteuttaa sen.
- tyolista.py --juna: kohta ≤ 110 merkkiä eikä valmiin työn sanoja Työn alla -kohdassa; juna.py valmis vaatii kohdan tarkan tekstin.
