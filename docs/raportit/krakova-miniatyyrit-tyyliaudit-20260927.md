# Krakovan nähtävyysminiatyyrien tyyliaudit (27.9.2026)

Krakovan kaikki seitsemän karttaminia luettiin julkisista R2-osoitteista ja tarkistettiin koko kaupungin [ennen/jälkeen-kontaktiarkissa](kuvat/krakova-miniatyyrit-ennen-jalkeen-20260927.jpg). Viisi rakennus- ja linnoituskohdetta ovat eristettyjä, viistosta ylhäältä kuvattuja muste-vesiväridioraamoja hillityin beigein, seepian ja oliivin sävyin. Wawelin lohikäärme on erillinen tarinahahmo, jota tyyliuudistuksen päätöksen mukaan ei muuteta. Kazimierzin nykyinen kuva esittää yhtä rakennusta kokonaisen kaupunginosan sijaan: tämä on sisältöosuvuuden huomio Fablelle, ei tyylipoikkeama. Kaikki nykyiset kuvat säilyvät.

| Kohde | Lähde | Visuaalinen päätös |
| --- | --- | --- |
| Wawel | R2, 512×512 PNG | säilytä |
| Barbakaani | R2, 1024×1024 PNG | säilytä |
| Collegium Maius | R2, 1024×1024 PNG | säilytä |
| Mariankirkko | R2, 1024×1024 PNG | säilytä |
| Wawelin linna | R2, 1024×1024 PNG | säilytä |
| Wawelin lohikäärme | R2, 1024×1024 PNG | säilytä tarinahahmona |
| Kazimierz | R2, 1024×1024 PNG | säilytä, sisältörajaus Fablelle |

Jokainen julkinen GET palautti HTTP 200, PNG-MIME:n ja pelin originille CORS-luvan. Kaikissa tiedostoissa on sRGB-ICC, aito alfa, neljä täysin läpinäkyvää kulmaa eikä reunaan osuvaa näkyvää siluettia. Tavujen SHA-256, alfa, täyttö ja reunamittaus ovat työtilan `output/style-audit-europe-20260927/krakova/qa.json`-tiedostossa; vanhojen R2-tiedostojen kopiot säilyvät siellä. Uusia kuvia, R2-objekteja tai pelin kuvalinkkien muutoksia ei tehty.
