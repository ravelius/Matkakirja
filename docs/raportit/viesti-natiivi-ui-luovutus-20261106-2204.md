# Natiivi-UI: luovutus 6.11.2026 klo 22.04 (konteksti 31 %, pehmeä raja)

Itsenäinen: korvaa kaikki aiemmat luovutukset. Oma id local_43962c89-fc14-4098-9dd7-6153133ffcea. PT local_5df52e10-10e4-4b72-9554-0049db300dfe, JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7, KS local_740947d7-aa79-4b1e-948e-1b7dfc734364, NS local_99130238-aa54-4a29-bcc9-7a023584944b.
Ei omia ajoja käynnissä. Tulokset tulevat viestinä tähän id:hen. Proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto, etäpää natiivi-backup (ei origin). Oma worktree /Users/Shared/Claude/wt/proto-natiivi-ui-kyltit-219, nyt haaralla natiivi-ui/kyltti-merkki-hyppy. Tiedot levyllä: proto-3d/lokit/nui-tahtikyltit-20261106/tulos-nui.md, kolme viimeistä lukua.

## Odottaa
1. JU: aloituslennon Mac-ajo, haara natiivi-ui/aloituslento-kuvat-219 356eb0101, skenaario proto-3d/_tyo/natiivi-ui/sk-aloituslento-kuvat.txt, 9 kuvaa, tulos lokit/nui-aloituslento-kuvat-356eb0101.
2. KS: ajo 33, jossa f4ad1b95b ja lista _tyo/karttaseppa/lisa-kyltti-valke-33.txt. KS kertoo lokikansion.
3. JU: junarivi 1104d0994:lle menee JU:lta PT:lle; ei toimia minulta.

## 1. Aloituslento (Pariisi-listan kohta 10): kokeena, ei junaan, Mac-kuva
PT: uusina Louvre ja Riemukaari, kolme muuta nykyisillä kuvilla, järjestys Eiffel, Riemukaari, Sacré-Cœur, Notre-Dame, Louvre. Haara on 1104d0994 + natiiviseppa/pariisi-aloitus-219 (388742104) + natiivi-ui/pariisi-lento-219 (b0bc70e7b), ei ristiriitoja, tarkistus 0 virhettä; Editor-kansio ei mukana tarkistuksessa. Kuvat ovat mediassa tavulleen Codexin toimitus, koodi oli tehty 5.11. mutta ei ole rungossa.
Kun ajo valmis:
- Lähetä lokikansio HETI NS:lle: se katsoo siitä intron kallistuksen ja PARIISI-nimen tummennuksen, ettei tarvita erillistä ajoa. NS:n Liiku 43a2fa300 pysyy erillään ja poimiutuu haaraan ilman ristiriitaa.
- Katso kuvat lento-1...lento-9 täysikoossa: viisi oikeaa kuvaa oikeassa järjestyksessä, nousu oikeasta kohteesta, kuvat 8 ja 9 merkintä kuvan alla.
- MAHDOLLINEN RISKI, ei todennettu: skenaario aloittaa uuden pelin Pariisista (uusi-peli 5 pariisi saapuminen), joten ajo voi kulkea aloittavan pelaajan reittiä. Tarkista lokista, kumpi; jos kuvat eivät nouse, oleta-rivit kertovat. Skenaarion oleta-ehto on "traileri kuva N sisään".
- Tulos PT:lle 3 rivinä. Uudet kuvat ovat jo KK:n tilaamia; KK ja omistaja näkevät kokonaisuuden PT:n kautta. Ei junaan.

## 2. Kyltit: ei kuittausta ennen ajoa 33. Ehto 30 vaihtoa, ei löysene
Ajo 31 (lokit/karttaseppa-yhteinen-31-b8-08f5ea7bf): nopeus oikea (kyltti31-kal häivytys 9 kuvaa, kirkkaus 74 → 193), mutta vain 5 kyltti-ui-riviä tallenteiden sisällä. Syy: laskemani reitit jäivät esteestä; Luxembourg ei osunut. Viidessä vaihdossa ei edestakaista vilkkumista.
Korjaus f4ad1b95b (natiivi-ui/kyltti-merkki-hyppy, kääntyy, ajamatta): AsetaKuvanPaikka pitää kuvan häipyvän kyltin vieressä. Vika oli: merkki hyppäsi 1 kuvassa noin 60 px (kal 49→50, g-ranska-12-p 69→70). Ajossa 33 todennettava molemmat samalla kertaa:
- Laske rivit ruutunumeroilla, EI loki-rivivälillä: kuva = ruutu - "alkaa"-rivin ruutu, tallenteen koko. Regex: nimessä on välilyöntejä (Galerie des Machines), (.+?) ei \S+; sama virhe antoi ensin väärän nollan.
- Merkin hyppy: sama vaihto kuva kuvalta täysikoossa; merkin pitää pysyä kyltin kyljessä koko häivytyksen.
- Luxembourgin 0,16 s:n paluu on yhä MAHDOLLINEN VIKA, kunnes se on nähty. Alle 30 riviä = kerro PT:lle, tee uusi lista KS:lle, ei omaa ajoa.
- Reittien arvio: pituuspiirillä noin 53000-64500 px/aste korkeudella 0,004, Liiku noin x 660-726, y yli 950. Lista on ajamatta.
- Kuvasarja-arkit edellisestä: lokit/nui-tahtikyltit-20261106/ajo31/.
Ajo 32 oli jo käynnissä, joten lista -32 ei ole käytössä; -33 korvaa sen.

99b556890 on TODISTETTU ajosta 31 (kerronta ennen esiin-riviä, unity.log 2624 < 2866; Bastilji Liikun kohdalla, ensimmäinen piilotus 2969). PT: ei junaan kyltti-kuittauksen rivistä; pyydä erikseen, jos se on kylteistä erillinen. Ei vielä selvitetty eikä pyydetty. 166378891 toimi (UI-kello 19/19, 25 tallennetta), yhä ei junaan.

## 3. Yhdistelmä 1104d0994: PT kuittasi junaan
Haara julkaisija/nui-yhdistelma-1104d0994 natiivi-backupissa, JU:lla. 166378891 ei mukana. E (yli 10 s:n vika) seurannassa, kovaa kuormaa ei mitattu. PT: kuvan 3 sumea kartta ei estä, "ui pois" on testikomento ja nostokortti oli auki; ei selvitystä nyt.

## 4. Invalidit (PT, mc-eiffel-85-koe)
Kerrottu PT:lle PÄÄTTELYNÄ: kyltin piste on kompleksin mallilla, ei kupolilla (noin 120 px kupolista pohjoiseen), ja UI-kerros piirtyy etualan katon päälle 85°:n kulmassa. Ei mitattu. Pyysin KS:ltä ajoon 33 "ui kohdenostot kyltti Invalidit" ja kuvan; KS ei ole vahvistanut. Vahvista rivistä, jos tuli. Ei omaa ajoa.

## Odottaa, aloittamatta
Tappien lasku vaakapuhelimelle: vasta, kun UI-sarja on yhdistetty.

## Havainnot, ei korjattu
- Piilossa olevaan elementtiin kirjoitettu suodin jää voimaan näkyviin asti (PiiloVartija OnPoistettu); haittaa ei mitattu.
- Livian ohjeteksti on terävä sumean kartan päällä nostokortin ollessa auki; onko tarkoitus, ei selvitetty.
- Katujen nimet eroavat samalla kameralla samassa ajossa (myös iPadin ipad-2:n kuvat 2 ja 4). Syytä ei mitattu.
- E: yli 10 s:n vian syy tuntematon.
- NS, ei työtä: kyltit liikkuvat iPadilla portaittain (Mathf.Round). PT: ei korjata nyt.
- Temple (PT): jätetään näin. Les Halles: kyltti näkyy ajoissa 20 ja 29, ei ajossa 26.
- Suurennuslasin napissa haalea neliö pallon kuvissa. Lopeta kierros ja Linssit lähes samassa paikassa. F:n ansa: Saapumiskortti, Latauspalkki, KaupunkiKortti, Ponnahdus, ei tarkistettu.
- Yhä avoinna: iPadin karsinnan kesto ennen seuraavaa TF:ää; aaripisteet 38 × kärkimäärä; Metroasema haalea sc-80:ssä; Tuileries'n kuva Louvren kulmassa; yksinäisten pyöreiden kuvien kohteet.

## Opit
- zsh: "$S:Assets" on muunnin ja kaatoi komennon taas: kirjoita "${S}:polku".
- unity-tarkistus.sh ei käännä Editor-kansiota: Esikatselu.cs-muutoksen "0 virhettä" ei todista mitään.
- Proto-repon etäpää on natiivi-backup; git fetch origin epäonnistuu siellä. Paikallinen master on vanha, älä vertaa siihen.
- Kylttirivit lasketaan ruutunumeroilla, nimissä välilyöntejä. Laita mittaus näkyviin ennen kuin kerrot nollan.
- Skenaarion oleta: "oleta <sekunnit> <teksti>".
- Rajaa grep tiedostoihin. Testin MATKAKIRJA-rivit ovat myös unity.logissa kuvakansiossa.

## Ei todennettu
Aloituslento tällä pohjalla. f4ad1b95b ajossa. Lista -33:n reitit. Välke 30 vaihdossa. Luxembourgin paluu. Invalidien kyltin piste. Oikea iOS-laite.

## Muuta
Etäyhteys vain KK:lla: älä kytke. Hookin työlistarivit (Nimet häipyvät, Vaaleat kyltit, Palatsin sisätilat) eivät tunnistu omikseni, en päivittänyt.

## Päivitys 22.1x: korvaa kohdan 1 odotukset ja kohdan "Odottaa" rivit 1-2
Aloituslennon ajo 356eb0101 on katsottu (tulos-nui.md, viimeinen luku), NS:lle lähetetty. Sacré-Cœur, Notre-Dame ja Louvre nousevat oikein. Louvre ja Riemukaari avautuvat täysikokoisina. EIFFEL JA RIEMUKAARI EIVÄT NÄKYNEET vuorollaan: Eiffelin rivi lokissa (4411) on kuvan 2 vuoron jälkeen, eli latautui vasta oman vuoronsa jälkeen; esilataus 0/5 katossa 1498 ms. Skenaario aloitti aloitusnäkymän kuvajonon ollessa kesken (kesken 21), joten syy on PÄÄTTELY. Oikean lennon jälkeistä tilannetta ei mitattu.
Uusinta pyydetty JU:lta: sama haara, _tyo/natiivi-ui/sk-aloituslento-kuvat-2.txt (45 s odotus ensin), tulos lokit/nui-aloituslento-kuvat-2. Odotus: viisi kuvaa kuvissa 1-5. Jos Eiffel ja Riemukaari puuttuvat yhä, se on vika: myöhässä latautuva kuva menettää vuoronsa; kerro PT:lle, korjaus vain PT:n sanalla. Tulos PT:lle 3 rivinä.
Merkintä Havainnekuva on kuvan alla mutta hyvin haalea kartan päällä: kerrottu PT:lle.
KS: ajo 33 tilattu JU:lta (Y 5ec6922a5, f4ad1b95b poimittu, lista -33 lopussa, kuva mc-eiffel-85-kyltti-invalidit). Lokikansio karttaseppa-yhteinen-33-b8-5ec6922a5 tulee KS:ltä.

## TÄRKEIN TEHTÄVÄ: PT 22.1x, tuli juuri ennen nollausta, ei aloitettu
PT katsoi lento-1-eiffel ja lento-7-kartalla: "loppu kelpaa, alku ei". Lento-1: pohja tyhjä ja sumea, terävä vino reuna vasemmalla, kuvassa Louvre ja Notre-Dame, ei Eiffel. Rikkoo KK:n 5.11. 15.12 rivin "ei tyhjää pohjaa saapuessa": karkeampi kartta pysyy, kunnes tarkka on valmis.
Ennen kuittausta selvitettävä MITTAAMALLA, EI PÄÄTTELEMÄLLÄ: 1) onko tyhjyys koeajon ensilatausta vai todellinen; 2) miksi Eiffelin ja Riemukaaren kuvat puuttuvat. Intron osalta sovi NS:n kanssa (NS sanoi, ettei koske näihin; kallistus ja PARIISI ovat kunnossa). Korjaus kokeena, kuva uudesta ajosta PT:lle.
Uusinta (45 s:n odotus, lokit/nui-aloituslento-kuvat-2) on ensimmäinen mittaus: se erottaa kuvajonon osuuden. Se EI vielä erota oikeaa saapumista, koska "uusi-peli ... saapuminen" ei lennä kaupunkiin, joten karkea kartta ja esilataus lennon aikana jäävät pois (natiiviseppa/saapuminen-karkea-219 on haarassa). Mittaa myös oikea lento kaupunkiin; katso, ettei reittiä oleteta. Kaikki edellä oleva "päättely" on juuri sitä, mitä PT ei hyväksy.
