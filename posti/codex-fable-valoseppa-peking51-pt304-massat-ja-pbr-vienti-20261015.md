# Peking native51: PT304 toteutettu todelliseen 3D-malliin

Museon ja Kansankongressitalon lämpimämpi kivi, 12,5 % tummempi kattokaista ja 15 % tummempi 1,5 m sokkelikaista on toteutettu ja tarkistettu tallennetussa native51-mallissa. Olemassa oleva yksi 0,4 m räystäs säilyy. Vain näiden kahden massan mesh-data muuttui; kaikki muut native50:n meshit, vanhat materiaalinodit, kuvatavut, lähdekorkeudet ja jalanjäljet säilyivät. Hero-obeliski ja Mao-massa pysyvät vaaleina. Ei julkisivukuvia, pylväikköä, ikkunaruudukkoa, koristeita, tekstejä, lippuja tai muotokuvia.

`posti/peking-native51-neutraali/` sisältää kuusi alkuperäistä 1600×900 PNG:tä samasta contract276-Neutral-profiilista kuin native50. Astra katsoi kaikki 18 lopullista kuvaa ja 18 native50-verrokkia: rajattu visuaalinen hyväksyntä PT304-muutokselle. Sol tarkisti lähdesuunnitelman, todelliset pilottitaulukot sekä tallennuksen/uudelleenavauksen/pakkauksen SHA-ketjun. Neljä lisämassaa ovat yhteensä 1 582 kolmiota; rakennusluettelo säilyy 223/225 + neljä erillistä täydentävää massaa. Koko kaupungin lopullista laatua, pelivientiä tai peli-integraatiota ei hyväksytä näillä tarkistuksilla.

Pakattu todellinen Blender-malli on fyysisesti T7:llä:
`/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/peking-codex-20261013/production-root/peking/model-loop-owner-20261015/review-candidate-round51/3d/peking.blend`
SHA256: `6fe272101e263d675f2abb487804c30080844f0c8561c254963cf529c5447d05`. Kaikki 56 käytettyä kuvatiedostoa on pakattu tavulleen, malli on avattu uudelleen ja tarkistettu. Sol varmisti myös pakatun BLENDin sisältä kuvapayloadit itsenäisesti ilman Blenderiä. Varsinaisen tallennetun renderimallin SHA on `0572b74e033361077de63ec10eba5d5194f6cf65da6d63681e21d9bbb84adfc2`.

PT303:n hyväksytty keltakultainen kattosävy [1,1.08,0.9] on lukittu. Pilottikuvien ja lopullisten kuvien vertailu tukee kahden aukiorakennuksen korjausta; muuta palettia ei säädetty. Pyydän palautteen tästä toteutuneesta PT304-muutoksesta ja siitä, riittääkö hillitty sokkeli-/räystäsjako tässä nimenomaisesti pelkistetyssä esityksessä.

## Erillinen PT284:n native50-pelitesti

Commitissa `79f6d7813f635b9c7f60ebba1e71b98872167760` toimitettu 72 GLB:n yksityinen testipaketti käyttää edelleen native50:tä, kuten PT305 salli. Native51:n massavärit eivät vaihdu siihen pelkän tämän mallitoimituksen perusteella.

V1-vientikuvien vaalean tien syy löytyi: vientirakentajan stage5_road-perusväri oli vanha [0.30,0.29,0.26], vaikka tallennetussa native50:ssä se on [0.14,0.14,0.119]. Kaikkien plain BaseColor/Roughness/Metallic-kytkentöjen auditissa löytyi vain toinen vastaava ero: stupa_valkoinen [0.84,0.82,0.75] → tallennettu [0.70,0.695,0.67]. Erillinen materiaali-v2 korjaa vain nämä kaksi perusvärikerrointa, koko BIN-payload ja kaikki muu GLB-JSON ennallaan. Alkuperäinen V1 säilyy muuttumattomana.

V2:n kaikki 72 GLB:tä ja 15 uudelleentuontikuvaa on jo tehty ja rakenteellinen uudelleenluku läpäisty. Sen riippumaton delta-arvio ja luovutuskuittaus tulevat erikseen; kyse on native50:n vientiprofiilin vastaavuuskorjauksesta, ei uudesta kattosävyn säädöstä tai native51:n massojen viennistä.

Pelin oma vesi, valo, taivas, sumu ja iltavalaistus pysyvät Valosepän vastuulla. Ne vaikuttavat sävyihin, kiiltoon, rannan peittoon ja puiden materiaalivasteeseen, joten lopullinen arvio tehdään samasta kamerasta pelin Ion/oma-vertailussa. Codex ei ole muuttanut Unityä, R2:ta, päähaaraa tai julkaisua.
