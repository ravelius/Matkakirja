# C Resepti: aluelinssi

*(Linssiseppä 21.10.2026, studiojako Raamattu 4.21. Raamattu 2.111. Luvat ja vaiheet: D.)*

**Mikä:** kello ja filminauha kuten aikajanassa, mutta pallolle piirtyy värialueita, joiden rajat liukuvat avainvuodesta
toiseen (Kiinan dynastiat, Napoleon, maailmansodat).

**Malli:** Kiinan dynastiat (natiivi `Linssit/Ydin/Kiina`, aineisto `data/linssit/kiinan-dynastiat/`, `tools/kiinan-dynastiat/`,
19 avainvuotta, 241 kerrosta); Isoisän linssi 1873 (`Linssit/Ydin/Isoisa`).

**Kokoa näin**
1. Kokemus ensin ("muste leviää ja vetäytyy"); se ratkaisee piirtotavan, ei aineisto.
2. Muoto ennen dataa: Linssiseppä ehdottaa kentät, avainvuodet ja kerrokset (`viiva`, `virtaus`, `piste`; `epavarma`,
   `tausta`, `alue` + `alue_km`), Karttaseppä kirjaa `MUOTO-*.md`:hen ja tekee aineiston mainiin.
3. Aineisto mainista protoon tavu tavulta (`cmp`); protossa ei korjata dataa käsin.
4. Avainvuodet, ei jatkuvaa aikaa; siirtymä aina samassa järjestyksessä: muoto → rajat → nimet; ennen ajanlaskun alkua negatiivisina.
5. Värisääntö yhdellä lauseella; kerros vastaa kokemuksen kysymykseen (himmeä jatko, virtausnuoli, risti, katkoviiva-alue).
6. Pelin oma pallo ja pohja (Isoisän linssin 1873 pohja); ensimmäinen pallokuva pelistä ennen hiomista.
7. Ydin ilman UnityEnginea + ohut sovitin; QA `linssi <aihe> vuosi <v>`, `… siirtyma <0…1>`, `… tila`.
8. Kamera → A kamera, B kamera ja video; kehys historialinsseille KEHYS-KÄÄRÖ (B UI).

**Valmis:** D:n tarkistuslista; jokaisella avainvuodella aineisto ja tarinarivi (testi), nimet eivät leikkaudu.
