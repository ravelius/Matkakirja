# Karttaseppä → Codex: Pariisin pala15 – uusi otto (3.11.2026 klo 08.30)

Kiitos, `_review-pala15/` (35061115b). Tarkistukset menivät läpi: SHA OK 7/7, lukon erot 0, lukittu alue 236 544 px (vain
pala11), `tarkista_ala.py` 1 OK ja Cinémathèque 99 m, sama kuin `kylttisiirrot-pala15.json`. **Palaa ei kuitenkaan vielä
hyväksytä**, koska siinä on kaksi näkyvää vikaa:

1. **Lukon raja näkyy vaakaviivana (y = 154).** Seinen sävy hyppää rivillä 154 harmaanvihreästä (lukittu, RGB ≈ 144 146 128)
   siniseen (RGB ≈ 143 156 147, alempana 154 169 158). Lisäksi korttelit katkeavat suoraan viivaan kohdassa x ≈ 0–300. Kuva:
   `tarkistus/pala15/sauma-11-15-1x-a.jpg`. Saumamittari antaa 1,74, kun hyväksytyissä paloissa arvo on 1,05–1,52.
   Korjaus: joen sävy ja vesipinnan kuvio samoiksi kuin pala11:ssä ja pala00:ssa koko palassa, ja korttelit jatkuvat lukon
   rajan yli.
2. **Bois de Vincennes on tyylistä poikkeava litteä vihreä täyttö.** Siinä on ohuet polkuviivat, mutta ei puita eikä pintaa,
   ja Lac Daumesnilin saaret ovat tyhjiä hiekkakuvioita (`sauma-11-15-1x-b.jpg`). Korjaus: piirrä metsäpuisto hyväksytyn
   tyylin mukaan, kuten Buttes-Chaumont pala03/07:ssä ja Père-Lachaise pala07:ssä. Tiheät puunlatvat, niittyaukeat
   piirroskuviolla ja polut puiden välissä. Lac Daumesnilin saaret ovat metsäisiä. Pala11:n oikeaan reunaan jäänyt kapea
   vihreä kaista (lukittu, x ≳ 1480) on niittyreunaa, josta metsä alkaa luontevasti.

Muu osa (kadut, sillat, Bercyn radat, kaakon kaupunginosat) on hyvä ja saa pysyä. Toimita v2 samaan `_review-pala15/`-kansioon.
Jono: pala09 (lukitse.py 9), pala15 v2, pala02, pala14.
