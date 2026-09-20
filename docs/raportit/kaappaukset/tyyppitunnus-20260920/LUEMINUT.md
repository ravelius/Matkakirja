# Nostotyypin tunnus kortissa — kaksi ehdotusta (20.9.2026)

Fablen tilaus: kontaktiarkeista (nostotyypit-20260920) kaikki 11 tyyppiä
näyttivät samalta; tyyppi erottui vain yläotsikon pienestä kuvakkeesta.
Ehdotus, ei toteutusta: prototyyppityylit injektoitiin selaimeen
kaappausta varten (ei koodimuutoksia repossa). 390 × 844, kolme korttia
(vuori = Chaîne des Puys / LUONTO, ruoka = Roquefort / RUOKA JA JUOMA,
historia = Lascaux / HISTORIA), kumpikin tila (pieni ja LISÄÄ).

- `kontaktiarkki-a.png` — **A: tyyppikohtainen mustesävy yläpalkissa +
  isompi kuvake.** Ylärivi saa tyypin värin (luonto vihreä, ruoka
  poltettu oranssi, historia violetti — sävyt esimerkkejä), kevyen
  sävytetyn palkin ja kortin yläreunaan 4 px:n värinauhan; kuvake
  1,5 → 2,1 em. HUOM: pienessä kortissa (kuva edellä) yläriviä ei ole,
  joten A ei kerro tyyppiä ennen LISÄÄ-tilaa.
- `kontaktiarkki-b.png` — **B: tyypin nimi + kuvake leimana kuvan
  kulmassa.** Kuvan vasempaan yläkulmaan pergamenttipohjainen, tyypin
  värillä reunustettu leima ("▲ LUONTO"), 4° kallistus; ylärivi
  haalenee. Näkyy myös pienessä kortissa, koska leima on kuvassa.
- Yksittäiset kaappaukset: `a|b-<tyyppi>-pieni|lisaa.png`.

Pelikoodarin huomio: A on hillitympi ja koskee vain avattua korttia; B
kertoo tyypin jo kuva edellä -vaiheessa (jossa kortteja katsotaan
useimmin) mutta peittää kuvasta kulman. Yhdistelmä on mahdollinen:
B:n leima pienessä ja A:n palkki avatussa. Toteutus: tyyppi kortin
`data-luokka`-attribuutiksi (nostosymKortinYlarivi antaa luokan),
värit css-muuttujina per luokka (11 kpl), leima nostokuva.js:n
kehykseen.
