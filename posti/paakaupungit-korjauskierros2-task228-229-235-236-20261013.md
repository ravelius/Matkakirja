# Korjauskierros 2 — toimitusohje #228/#229/#235/#236

Kaikki 93 kaupungin C:tä on korjattu ja 11 lähdehaaraa pushattu. Manifestin sourceBranches antaa täydet commitit sekä jokaisen C:n ja sidecarin lopulliset SHA:t. Lopullisten tiedostojen tavut on verrattu pushettujen committien tiedostoihin. Vanhojen audittien SHA:t ovat ajankohdan snapshotteja; viimeinen C on sourceBranches- ja checks-final-aineistossa.

Yhteinen paikallistarkistus: 0 mekaanista löydöstä, 0 pituuspuutetta, 0 odottamatonta teksti/schema-virhettä. Tarkistin poistuu edelleen virhetilassa 1481 vanhan kuva-/karttaportin vuoksi: näitä ei korjata tällä kierroksella eikä pakettia kutsuta koko pelisisällön hyväksytyksi versioksi. Sisältökirjurin kevyt pistokoe ja PK/PT-kuittaus vaaditaan ennen kytkentää.

1028 nykyaktiivisen kuvasidonnan metadatavertailu läpäisty: samat assetID:t, native/export-SHA:t, URL/R2key, tekijä/lisenssi, omistajahyväksyntä ja alkuperäiset tekniset kuitit. Ei uusia generointeja, rasterimuokkauksia tai uusia chatteja. Kolme lähdemerkinnän esityssiistintää säilyttää rakenteisen tekijä/lisenssin. Tarkistus ei väitä kaikkien rasterien uutta binäärilukua tai uutta natiivi-QA:ta.

#229: Nouakchott JMA station 61442, 1991–2020: 12 keskilämpöä ja 12 sadelukua. Ylin/alin puuttuvat; ei arviointia. lat/lon ovat saman aseman schema-metadata. C ja lähde-saa.json vastaavat toisiaan; alkuperäinen ristiriitainen lähde säilytetty muuttumattomana arkistossa. Primary URL+SHA ovat manifestissa.

#235: Ruusukon Neitsyt Marian kirkko kaikissa nykyisen C:n ja aktiivisten kuvien nimikentissä. Ruusukransin-esiintymiä 0. Sama hyväksytty Asmara N1 palautettu oikeaan nimeen; alkuperäinen kuva ja tekijä/lisenssi säilyvät. Historiallisia audit-snapshotteja ei muuteta.

#236: Monrovia C1/C2/C3 jäävät tyhjiksi; exactGapReason on jokaiselle manifestissa. Valittujen Commons-kuvien 267/265/252 näkyvien rakennus-/teoskerrosten identiteetti/tekijä/suojastatus jäi aiemmassa QA:ssa selvittämättä. Aiemmin hyväksyttyä kansikuva-assettia tai kadonnutta kansisidontaa ei löydetty. Valitsematon 268 ei ole valmis hyväksytty toimitus. Hyväksytty laaja West Point N5 säilyy nykyisessä nähtävyysroolissa, koska saman kuvan kaksinkertainen käyttö kaupungissa ei ole sallittu. Tämä ei väitä Commonsin kaikkia vaihtoehtoja loppuun tutkituiksi.

Toimitus tehdään kanoniseen posti/codex-fable-paakaupungit.md:hen historian säilyttävällä uudella toimituskuittauksella sekä manifesti-JSONina. Ei Sites-julkaisua, main/pelikoodimuutoksia, mergeä eikä omistajan/Sisältökirjurin hyväksynnän keksimistä. Aloituskuitti 49341c40 säilyy aloituksena. Aiemmat task118-toimitukset ja kuvahyväksyntä säilyvät.
