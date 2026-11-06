# Natiivi-UI: luovutus 6.11.2026 klo 09.15 (konteksti 26 %, 7.37)

Täydentää -0859:ää (haara natiivi-ui/luovutus-20261106-0859, lisäyksineen) ja -0750:tä: tausta voimassa, tämä korvaa järjestyksen. Lukulista 7.47 luettu tällä vuorolla; uusi vuoro lukee sen itse.

## Tila
Worktree /Users/Shared/Claude/wt/proto-natiivi-ui-vesinimi, haara natiivi-ui/kyltti-usva-219, kärki 1ec00e883. Peili natiivi-backup peili/proto/natiivi-ui/kyltti-usva-219.
Erillinen haara natiivi-ui/alapiste-219, 8c3f3931f (1ec00e883:n päällä), peili samalla nimellä.
Kaikki KÄÄNTÄMÄTTÄ Unityssä, ei omaa ajoa, ei junaan. Kartta-testit 662/662 kärjessä 1ec00e883. 8c3f3931f:llä ei ole omaa testiajoa: se muuttaa vain PalloKierto.cs:ää, jota testit eivät käännä.

## Tehty
1. f473d4d86 Orsayn kyltti: polku oli NostotKartalla (m.KylttiUsva, PeitaMallienAlta), ei MalliKyltit. Sama sääntö kuin 106521496: täysi tai poissa, raja 0,5 / paluu 0,7. Merkillä ei ollut opasiteetin USS-siirtymää, joten kyltille lisätty 0,22 s siirtymä koodista, muille merkeille ei (niiden usva muuttuu joka kehys). Sivuvaikutus: pyöreä kuva (rivi "m.Kuva != null && m.KylttiUsva < 0.05") häipyy nyt rajalla 0,5 eikä noin 0,05, myös kyltittömällä kuvalla. KK 07.42:n "häipyy kyltin mukana" pysyy. Ei kuvaa vielä, älä väitä korjatuksi.
2. 1ec00e883 lokirivi. Hae: grep "MATKAKIRJA karsinta" unity.log. Rivi: aika, elävät ennen → jälkeen, raja km alapisteestä, alapisteen ja kameran alla olevan pisteen leveys ja ero km, katse km kameran alta, lähin karsittu km katseesta, usvan loppu m, karsituista ruudulla, niistä usvan edessä (enintään 8 nimeä), yhteenveto (palanneet, viive mediaani ja suurin, poissa nyt). Seuratut nimet (Rue Jacob, Rue de Buci, Quai Voltaire, Belleville, Ménilmontant, 11. arrondissementti, Faubourg Saint-Antoine) saavat oman rivin karsittaessa ja palatessa. Yhteenveto myös "nimet laske" -rivillä. Vain editorissa ja batchissa, enintään 300 riviä. Huom: Karsi säästää rivit, joilla on tmp (piirretyt), joten "ruudulla" tarkoittaa ruudun alueella olevaa, ei piirrettyä.

## Löydös: alapiste on 21 km väärässä (MITATTU OSIN)
PalloKierto.AlapisteenSuunta palautti normalisoidun ECEF:n (geosentrinen), mutta rivien suunnat ovat geodeettisia. Pariisissa ero 0,19° = 21,2 km etelään (laskettu).
Lokista (lokit/karttaseppa-yhteinen-4-0b4d74011/unity.log rivit 4332–4335, 4426–4429): ruudulla ladotuilla Rue Jacobilla, Rue de Bucilla, Quai Voltairella, Belleville, Ménilmontantilla "suunta 0.19–0.21°", kun taas Rue des Noues de Seine, Avenue de Seine ja Rue de Seine "0.03–0.04°". Yhteensopiva, koska 0,20° ≈ 22 km.
Koodin mukaan (EI MITATTU, 9.1): Karsi säästää alapistettä lähimmät, eli karsii ensin Pariisin omia nimiä pohjoisesta; ElavaNimetLahelta pyytää paloja saman pisteen alta, joten kaukaa tulevat nimet täyttävät katon. Tämä selittäisi kierteen, jota -0859 oletti johtuvan katon koosta tai 45°:sta. Sama kaava voi selittää 27.10:n Lontoon "Lewisham–Tooting" ja Jyväskylän havainnot, ei tarkistettu.
Koko maailmaa koskeva: kaikki Lähelta-palat, "säde"-suodatus ja karsinta siirtyvät. Päiväntasaajalla ei eroa, 45° leveydellä suurin.
8c3f3931f korjaa tämän, eikä ole kärjessä, koska lupaus oli mitata ensin. Kommentti koodissa sanoo syy-yhteyden suoraan: se on oletus, kunnes rivi sen näyttää.

## SEURAAVAKSI
1. Pyydetty KS:ltä seuraavaan yhteiseen ajoon (ajo 5 Y b160104b7 on jo JU:lla, ei sinne): 1ec00e883, ja saman ajon perään 8c3f3931f, jos vuoro riittää. Suositus PT:lle lähetetty. Jos vain yksi ajo: 8c3f3931f (sisältää 1ec00e883:n) ja vertailu 0b4d74011:n kuviin.
2. Ajosta katso: grep karsinta, ero km (ilman korjausta noin 21, korjauksella noin 0), karsituista usvan edessä (pitäisi pudota), seurattujen paluuviive; samat kamerat kuin -0859 kohta 3; ruutuaika (Lado 8–13 ms ennen). Vasta sitten päätös: riittääkö tämä, vai tarvitaanko katseen kohta tai katon muutos.
3. Kuvat: co-45, co-ob, ss-talot, nd-raja (Opéra), p-con ja p-con-2 (Orsay): poissa tai täysi. Liikkeestä ei voi todistaa kuvilla.

## Selvitetty
Harmaa nappula Sainte-Chapellen takana (-0859): KS 09.1x: pelaajan nappula, KK kuittasi 08.4x, ei vika. KS vertasi paikan laskemalla, ei rajannut. "3200 → 3000" oli KS:n mukaan harva näyte: suoraa pudotusta ei tapahtunut.

## Yhä avoinna (-0859, -0750)
Tuileries'n kuva Louvren kulmassa (KK kelpuutti kokeena); kyltti RANSKA-otsikon ja Liiku-napin alla ei kuvassa; aaripisteet 38 × kärkimäärä ja KS:n Sovita/Lisays-kysymys katsomatta; Metroasema haalea sc-80:ssä tutkimatta. Mittarin viat: ei nyt.
