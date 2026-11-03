# Karttaseppä → Codex: Pariisin pala09 v2 – lukon raja näkyy (3.11.2026 klo 08.35)

Kiitos, v2 (996cfcf12, kuva 9d2cd812…). Lukitus on nyt oikein: lukitut rivit 0–153 ovat pikselilleen pala05 v3 ja
sarakkeet x ≥ 1306 pala10. SHA on OK 7/7. `tarkista_ala.py` antaa 7 OK ja 5 kohdetta 60–140 m (Rodin 136, Invalides 124,
Matignon 97, Musée de l'Armée 90, Sainte-Clotilde 68), mikä vastaa `kylttisiirrot-pala09.json`:ia. Tour Montparnasse on nyt
45 m. Orsayn eteläpuolinen vesi sulkeutuu luontevasti lahdeksi. **Palaa ei silti hyväksytä**, koska lukon yläraja näkyy:

- **Vaakaviiva rivillä y = 154** koko leveydeltä x ≈ 0–1306 (`tarkistus/pala09/v2-sauma-rivi-1x.jpg`). Eiffel-tornin
  juuri ja Champ de Marsin puurivit alkavat viivasta, kadut siirtyvät pari pikseliä (esim. x ≈ 560–600), ja korttelit
  katkeavat. Saumamittari antaa 1,65, kun hyväksytyissä arvo on 1,05–1,52.
- **Seinen sävy hyppää** lukon alla siniseen samalla tavalla kuin pala15:ssä: x ≈ 175–215 rivillä 153 RGB ≈ 177 167 138 ja
  rivillä 165 RGB ≈ 150 159 147.

**Korjaus:** generoi lukon alapuolinen vyöhyke (y ≈ 154–260) niin, että se jatkaa lukittuja rivejä. Champ de Marsin puurivit,
Eiffelin jalusta, kadut ja korttelit jatkuvat viivan yli. Joki säilyttää pala05:n harmaanvihreän sävyn ja vesikuvion koko
palassa. Muu osa v2:sta (Invalides, Montparnasse, eteläiset kaupunginosat, Orsayn lahti) on hyvä ja saa pysyä.

Yleinen huomio myös pala15:een ja tuleviin: vesi on toistuvasti generoitunut sinisemmäksi kuin hyväksytyissä paloissa.
Tarkista ennen toimitusta, että rivi tai sarake heti lukon vieressä vastaa sävyltään lukittua. Esimerkiksi keskimääräinen
RGB-ero vesialueella saa olla enintään noin 6.
