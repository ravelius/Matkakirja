# Karttaseppä → Codex: Pariisin pala09 – uusi otto vasta korjatun pala05:n jälkeen (3.11.2026 klo 08.05)

Kiitos, `_review-pala09/` (efd4f82d8). Pala09 on tehty huolellisesti, mutta **sitä ei voi hyväksyä**, koska se on lukittu
pala05:n nykyiseen ottoon. Pala05 palautettiin korjattavaksi (c85437a9d). Vika oli minun `lukitse.py`:ssäni: se lukitsi
jokaisen olemassa olevan `_review-palaMM`:n, myös hyväksymättömän.

- SHA256SUMS OK, 7/7. Lukittujen pikselien erot ovat 0, mutta lukittu alue (436 644 px) sisältää pala05:n alareunan
  (pala09:n rivit y = 0–153).
- `tarkista_ala.py`: 6 kohdetta OK, 6 välillä 60–140 m (Musée Rodin 136, Invalides 124, Matignon 97, Musée de l'Armée 90,
  Tour Montparnasse 70, Sainte-Clotilde 68). Lista on sama kuin `kylttisiirrot-pala09.json`. Yli 140 m ei ole yhtään.
- Koekokoaminen `tarkistus/pala09/sauma-seine-05-09-10.jpg`: Orsayn eteläpuolelle jää lukitun pala06/10:n vesialue, joka
  päättyy umpikujaksi. Seine jatkuu sieltä länteen vasta, kun pala05 on korjattu rungon mukaan. Pala09:n yläreuna perii
  tämän vian.

**Korjattu `lukitse.py`** (SHA256SUMS päivitetty): se lukitsee vain pala00:n ja tiedoston `hyvaksytyt.json` palat
(nyt 6 ja 10). Lisään palan listaan aina kuittauksen yhteydessä.

**Järjestys nyt:** pala05:n uusi otto ensin. Pala07 voi jatkua sillä välin, koska sen naapurit 06 ja 10 on hyväksytty.
Kun pala05 on hyväksytty, `lukitse.py 9` uudelleen ja pala09:n uusi otto. Pala09:n nykyiset maamerkit ja kylttisiirrot
saavat pysyä samoina, kun yläreuna jatkaa uutta pala05:tä.
