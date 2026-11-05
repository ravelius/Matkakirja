# Riemukaari #2097 — lähteet

Tarkistettu 5.11.2026. TILAUS-24 ja 24d luettu kokonaan; kuusi relevanttia liitteen SHA256:ta täsmää (source/verification.json). #2107 vapauttaa tämän kohteen, #2115 sallii rinnakkaistyön. Suunta idästä myötäpäivään115°; jalanjälki.png määrää pelin sijainnin ja kierron.

## Varmennetut mitat ja poikkeama lähdetilauksesta

Centre des monuments nationaux / Conservatoire National des Données3D: https://doi.org/10.34969/CND3D/2936267.d.2026 (tuore lähdesivu 5.11.). Rakennus49,54m korkea,44,82m leveä,22,21m syvä. Clichyn kaupungin Pavillon Vendôme -opas vahvistaa samat mitat ja pääaukon29,19m korkeuden /14,62m leveyden; sivuaukko18,68×8,44m: https://www.clichy-tourisme.fr/wp-content/uploads/2018/09/Kapla-Livret-p%C3%A9da-A5_Web.pdf s.8/PDF, painetut16–17. France.fr:n kansallinen matkailuvirasto tukee pyöristettyä50×45×22m: https://www.france.fr/fr/article/arc-de-triomphe/ .

Tilauksen51×28m poikkeaa näistä rungon mitoista; en väitä sen olevan varmennettu rakennusmitta. Promptissa runko44,82×22,21×49,54m ja pääaukko29,19×14,62m. Pelipaikan188×103m verhokäyrä säilyy. QA näyttää myös tilauksen51×28/50m vaihtoehtoisen vertailun. Puolustusministeriön Chemins de mémoire hakutulos ilmoitti pääaukon20,50m korkeaksi; se poikkeaa kaupungin oppaasta29,19m eikä valokuvan korkeasta aukosta tuettua29m arvoa muuteta tuon yksittäisen ristiriidan perusteella.

## Ilmakuva, pohjan ja katon mittari

ilmakuva-1900.jpg, Wikimedia Commons File:Aerial view of the Arc de Triomphe, Paris, France, ca.1900.jpg. Tuntematon kuvaaja, noin1900, State Library Victoria H92.350/467. Public domain/PD-old, Commonsin Public Domain Mark. https://commons.wikimedia.org/wiki/File:Aerial_view_of_the_Arc_de_Triomphe,_Paris,_France,_ca._1900.jpg . Alkuperäinen4337×3087, ladattu muuttamatta. Koko yksinkertainen suorakaiderunko ja kattotasanne näkyvät; kuva on viisto ilmakuva eikä ortokuva. Tätä ei esitetä survey-mittauksena. Kuva tukee katon osia ja pohjan rakennetta; koordinaattiruudukon antaa Karttasepän PNG.

## Koko rakennuksen valokuva ja värit

oikea.jpg on muuttamaton Wikimedia1280px-esikatselu: Jiuguang Wang,21.10.2010, CC BY-SA2.0. https://commons.wikimedia.org/wiki/File:Arc_de_Triomphe,_Paris_21_October_2010.jpg . Lisenssi https://creativecommons.org/licenses/by-sa/2.0/ . Commonsin alkuperäislataus palautti429; palvelu pyysi käyttämään sallittuja esikatselukokoja, joten käytetty palvelun1280×967-kuvaa. Ei paikallista kuvamuokkausta. Lähteen yleisö, liikenne, puut ja maisema eivät kuulu tuotantokuviin.

## Käyttämättömät tukihavainnot

ParisPlaceEtoile.jpg, Gérard Janot,26.9.2004, CCBYSA3.0 (https://commons.wikimedia.org/wiki/File:ParisPlaceEtoile.jpg); Arcotriunfo.jpg,Cyberkaos,CCBYSA3.0 (https://commons.wikimedia.org/wiki/File:Arcotriunfo.jpg). Kaukana näkyvä rakennus oli liian pieni yksityiskohtien lähteeksi; näitä ei käytetty tuotantoviitteinä. Commonsimageinfo-raakametadata tallessa lähdekansiossa.

## Tyyli ja tekotapa

Sarja24d GrandPalais2-viistokuva vain piirrosjäljen ja tasaisen valon tukena, ei Riemukaaren muotona. Muste/ohutvesiväri, oikea lämmin vaalea kalkkikivi, neutraali vaaleanharmaa tausta. Korkeat tunnistettavat kaaret, yksinkertaistetut suuret veistosryhmät; nimet/kaiverrusteksti/pienetkattopiikit poistetaan. Kaikki tuotanto-PNG:t tallennetaan imagegenin muuttamattomina natiiveina. SHA256SUMS yksilöi toimituksen. Ei Tripoa ennen omistajan arviota.

## Ilmansuuntien lisävarmistus #2116 ennen sivukuvia

Karttasepän ilmansuuntakorjaus luettu kokonaan lähteestä intake-20261105-1553.json, commit ae84ac494024640ab4c13491a6686a6053391cf1. Kolme ensimmäistä kuvaa oli jo tehty; niitä ei uusita. Riemukaaren suorakaide180°symmetrinen, reliefien puolikohtaisuutta ei päätellä vanhan ilmavalokuvan ylälaidasta. Pohjoinen on Karttasepän ruudukossa ylhäällä.

Kaksi paikkatarkistusta:1) pyyhitty.png:n pitkä leveä puistokaistoilla reunustettu länsi–lounaslinja on Avenue Foch, joka erottaa kartan vasemman puolen itäpuolesta; pääkaaren akseli kulkee sen pohjoispuolelta Avenue de la Grande-Arméen WNW-suunnasta Champs-Élysées'n ESE-suuntaan.2) NNE–SSW-sivulinja kulkee Wagramin pohjoispuolelta Kléberin eteläpuolelle; CMN:n virallinen veistosopas nimeää kapeat sivut Wagram/north ja Kléber/south. Pyyhitty.png:n/tarvittavan jalanjäljen pitkä akseli onNNE–SSW (115°idästämyötäpäivään=25°pohjoisakselista); tästä seuraa leveiden julkisivujen normaaliESE/WNW. CMN:n lähde: https://www.paris-arc-de-triomphe.fr/en/content/download/9883720/file/EN%20Learning%20Resource%20-%20The%20Sculpted%20Decorations.pdf?inLanguage=eng-GB&version=7 .

Nimeäminen: etelä=Kléber/SSW,kapea22,21m; pohjoinen=Wagram/NNE,kapea22,21m; itä=Champs-Élysées/ESE,leveä44,82m; länsi=Grande-Armée/WNW,leveä44,82m. Sivukuva suoraan kyseistä julkisivua vasten. Ensimmäisen viiston promptissa mainittiin kaakkoinenleveäjulkisivuSWkameralle; geometrinenristiriita raportoidaan eikä suuntaa varmisteta tuon sanamuodon nojalla.

## Lähdehakutavan uusi linjaus #2118

PT:n5.11.iltaohje luettu kokonaan intake-20261105-1558.json: Commonsin /w/api.php-haku lopetettu, myösimageinfo. Ennen tämän ohjeen saapumista tehtiin yksi categorymembers-kysely (Arc de Triomphe de l'Étoile from above), neljän tiedoston imageinfo metadata/url/size ja Wang2010-kuvan yksi1280thumbnail-URL-kysely. Tarkat tiedostonimet yllä. Näistä tehty yhteiseen työnjohtoon kohdekohtainen ilmoitus; pääsessio kuittaa postitse. Linjauksen jälkeen ei uusia APIkutsuja eikä uusia Commons-hakuja. Jo paikallisesti varmennetut1900PD- ja2010CCBYSA-kuvat käytetty. Mahdollisessa myöhemmässähaussa robots.txt luetaan ensin erilliselläkomennolla ja vain sen sallimat/wiki/File:- ja kuvapolut kelpaavat.
