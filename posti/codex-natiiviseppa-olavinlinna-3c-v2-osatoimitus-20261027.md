# Codex → Natiiviseppä/PT: Olavinlinna 3c V2, pakokallio valmis; komero ja liitokset avoinna

Tiedostot kansiossa `posti/olavinlinna-muurikaytava-geometria-20261027/`.

Toimitetaan vain pakokallion pako-v2.glb (#1152) sekä V2:n diagnoosi- ja yhteiskoordinaattikuvat. Komeron V2-ehdokasta ei toimiteta pelimalliksi: tiili-/saumavaatimus ei vielä läpäise QA:ta. #1151, #1153 ja #1154 jäävät avoimiksi alla yksilöidyistä syistä. Alkuperäinen 404e7ccd1-toimitus, kaikki lähdemallit ja aiempi tavoitehavainnekuva säilyvät. Kuvagenerointeja tässä korjauksessa 0.

## Pakokallio (#1152)

Kalliolla on Poly Haven Lichen Rock / Rico Cilliers, CC0 1.0: värikartta, normaalikartta ja karheuskartta. Toisto noin 3 m, hillitty harmahtava värikerroin. Tekstuuri antaa luonnonkiven rakenteen ja jäkälälaikut. Kallion alla näkyvät suorakulmaiset tasot ovat lähdemallin järvivesi (-vesi / flowing_lake_water), eivät apupintoja tai laitureita. Veden siniharmaa materiaali selventää niiden tarkoituksen; lähdeveden kulmikas geometria säilyy. Muoto/182 kolmiota ja kaikki 16 merkkiä tarkistettu ennen/jälkeen samoiksi. Tekninen tarkistin 0 virhettä, 12 498 628 tavua. Kallion ja veden lopullisen rajauksen/valaistuksen arviointi kuuluu koko vastaanottajan ympäristöön.

## Komeron täyttötiilet (#1151 ja #1153)

Nykyisessä hyväksytyssä verkossa tiilijako on 0,285 × 0,100 m, pystysauma 0,008 m ja vaakasauma 0,010 m. Näkyvän solidin otsapinnan nimelliskoko on 0,277 × 0,090 m; kuuden irtotiilen otsapinta 0,282365 × 0,0868541 m. Pystysauma alittaa uuden 1–1,5 cm tavoitteen. Saumaurat on leikattu pintaverkkoon ilman uran pohjaa peittäviä laastipintoja: pelkkä sivupintojen vaalentaminen jättää näkyviin tumman sisäontelon. Nykyisen verkon säännöllisyys ei myöskään muutu käsinlyödyksi materiaalin väriä muuttamalla.

Kuvassa qa-v2/komero-candidate-NOT-ACCEPTED.png näkyvät samaan koordinaatistoon tuodut täyttö, kuusi alkuperäistä irtotiiltä ja käytävän seinä. Se on avoimen puutteen diagnoosi, ei hyväksytty V2. Värierot ja mustat saumat ovat vielä liian ilmeisiä. Keskeneräinen GLB säilyy paikallisesti, sitä ei ole tässä toimituksessa.

Ehdotettu rajattu korjaus: rakentaa uudelleen vain komero_tiilitatto-pintaverkon tiilijako ja laastin sulkevat pinnat irtotiilen koon sekä 10–15 mm sauman mukaan; säilyttää komeron ulkomitat, merkit, irtotiilien paikat ja piilotettavan verkon nimi. Natiiviseppä/PT: vahvistakaa tämä rakenteellisen pintaverkon muutos tai toimittakaa vastaava korjattu lähdeverkko. Nykyinen lähde rajaa korjauksen pintoihin ja pitää geometrian ennallaan, joten en merkitse tätä vaatimusta valmiiksi värityksen perusteella.

## Neljän osan liittyminen (#1154)

assembly-all-parts.png ei ole levitetty esitys. Kaikki neljä osaa ovat lähteen yhteisissä maailman koordinaateissa, ilman esittelysiirtoja. Muuri ja harja koskettavat; komero sekä pako jäävät erilleen. Mitatut pienimmät vertex–pinta-etäisyydet:

| Pari | Etäisyys |
| --- | ---: |
| muurikäytävä–harja | 0 m |
| muurikäytävä–komero | 11,631 m |
| harja–komero | 10,627 m |
| komero–pako | 10,476 m |
| muurikäytävä–pako | 16,618 m |
| harja–pako | 17,977 m |

Nämä ovat osapintojen etäisyyksiä, eivät todistetun kulkureittiliitoksen saumamittauksia. Muuri–harja-parissa 23 kolmiokontaktia, mikä ei yksin osoita yli sentin syvyistä päällekkäisyyttä. Osien välejä ei voi merkitä hyväksytyiksi eikä pelivirheiksi ilman vastaanottajan ulkokuorta ja yhdistävää kiipeily-/kulkumallia. Natiiviseppä/PT/Lavastaja: toimittakaa ajantasainen kokonaisasettelu tai yksilöikää näiden osien tarkoitetut vastinpinnat ja väliin tulevat rakenteet. Niiden perusteella liitoskohdat voidaan mitata ja korjata siirtämättä mielivaltaisesti jo hyväksyttyjä merkkejä tai keksimättä uusia linnan osia.

Tämä on osatoimitus. V2-vastaanottokuittausta, omistajahyväksyntää, peli-integraatiota ja julkaisua ei ole varmennettu. Ei R2-siirtoa, main-mergeä, versionnostoa tai pelijulkaisua.
