# Karttaseppä → Codex: Pariisin pala05 – korjauspyyntö (3.11.2026 klo 07.59)

Kiitos, `_review-pala05/` (84af32a9c). Tarkistukset menivät läpi, mutta **pala05 ei vielä ole hyväksytty**:
koekokoamisessa näkyy kaksi saumavikaa lukitun pala06:n rajalla. Uusi otto pala05:stä, sitten jatketaan järjestyksessä (09).

## Kunnossa (säilytä)
- SHA256SUMS OK, 8/8 tiedostoa. Lukittujen pikselien erot ovat 0.
- `tarkista_ala.py`: 16 kohdetta OK, 7 välillä 60–140 m (Élysée 117, Jeu de Paume 111, Carrousel 103, Chaillot 88,
  Palais Bourbon 87, Concorde 68, Sainte-Clotilde 68). Lista on sama kuin `kylttisiirrot-pala05.json`. Yli 140 m ei ole
  yhtään. Tuileries jää mittaamatta, ja se hyväksytään puistoyksityiskohtana.

## Korjattavat (pala05:n koordinaatit, lukko alkaa x = 1306)
1. **Seine ei seuraa runkoa ennen saumaa.** Rungossa (`palat/pala05/runko.png`) joki laskee kaakkoon. Rajalla x = 1306
   se on suunnilleen kohdassa y ≈ 890–980, ja lukittu pala06 jatkaa siitä. Piirroksessa joki kulkee kohdalla x ≈ 1000–1306
   lähes vaakasuorassa kohdassa y ≈ 730–860. Siksi rajalla vesi vaihtuu suoraan kortteleiksi (pala05:n puoli
   y ≈ 900–1020) ja joki osuu Orsayn rakennukseen (y ≈ 820–860). Korjaus: vedä joki, rantakadut ja sillat rungon mukaan niin,
   että vesi ja rannat kohtaavat lukitun pala06:n reunan katkeamatta. Kuvat: `tarkistus/pala05/runko-vs-pala05-seine.jpg`
   (runko 05|06 vasemmalla, piirros 05|06 oikealla) ja `tarkistus/pala05/sauma-seine-lahi.jpg`.
2. **Saint-Lazare ja sen puisto katkeavat suoraan rajaan** kohdassa y ≈ 150–480 (`SAUMA-HUOMIO.md` oli oikeassa). Kokoaminen ei
   voi peittää tätä, koska pala05 on lukitun alueen kohdalla jo pikselilleen pala06. Korjaus: piirrä asema ja puut
   valmiiksi rajan länsipuolelle niin, että itäpääty tai katon pää päättyy viimeistelynä noin kohtaan x ≈ 1290 tai sen
   länsipuolelle ja kortteli liittyy pala06:n tavallisiin kortteleihin. Kohteen paikka pysyy 140 m rajan sisällä (nyt 0 m).
   Kuva: `tarkistus/pala05/sauma-saint-lazare-lahi.jpg`.

Muu osa 05|06-rajasta (y ≈ 0–150 ja 480–800) jatkuu hyvin (`tarkistus/pala05/sauma-05-06.jpg`). Pala06:ta ja pala10:tä ei
muuteta. Lähetä uusi otto samaan `_review-pala05/`-kansioon uusine SHA-summineen ja kylttisiirtoineen.
