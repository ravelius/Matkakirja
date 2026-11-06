# Natiivi-UI: luovutus 6.11.2026 klo 18.55 (konteksti 27 %, pehmeä raja)

Itsenäinen: korvaa kaikki aiemmat luovutukset. Oma id local_43962c89-fc14-4098-9dd7-6153133ffcea. PT local_5df52e10-10e4-4b72-9554-0049db300dfe, JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7, KS local_740947d7-aa79-4b1e-948e-1b7dfc734364.
Ei omia ajoja käynnissä. Odotan kahta tulosta, molemmat tulevat viestinä tähän id:hen. Älä pyydä kumpaakaan erikseen (PT). Ei koodia ennen tuloksia. Tulokset: proto-3d/lokit/nui-tahtikyltit-20261106/tulos-nui.md (lue loppuosa) ja proto-3d/lokit/nui-ui-13dab1aac-toisto/tulos-nui.md.

## 1. UI-sarja: JU:lla
Yhdistelmä 1104d0994 = runko 603d4213a + 13dab1aac (natiivi-backup/julkaisija/nui-yhdistelma-1104d0994). JU pysäytti sarjan 18.51 PT:n vuorojärjestyksellä, koska origokoe menee ensin (uusinta 18.59). Alkaa alusta origokokeen jälkeen. Tulos lokit/nui-ui-yhdistelma-1104d0994/.
- UI-sarja 15: vain D:n 3 riviä saa jäädä (vasen tappi + nopeusvipu, metrolinjan kosketusala, metrolinja + vasen tappi). Uusi rivi tai yli 10 s:n vika = PT:lle. E on seurannassa, mittari päällä.
- Sen jälkeen JU ajaa skenaarion lokit/nui-piilo-palautus/sk-piilo-palautus.txt kerran Macilla; jos Macin oleta täyttyy, myös isolla iPadilla. Tulos lokit/nui-piilo-palautus-<sha>/. Macin oleta ei täyty = ei iPadia.
- Palautus, PT:n ehto: "lokissa poistoja ja palautuksia > 0, 0 RenderTreeCompositor-kaatoa ja suodin näkyy palautuksen jälkeen kuvassa". Katso kuvat 2 ja 4 täysikoossa, Mac ja iPad erikseen.
- Tulos PT:lle 3 rivinä. Junaan vasta PT:n kuittauksella.
- Kortin sumennus komennolla `ui nosto` on luettu koodista (UiNakymat 586-587). Jos ei sumenna, keksi toinen vaihe ilman koodia tai kysy PT:ltä.

## 2. Kylttikorjaus: yksi ehto auki, ei junavuoroa
b3cdf8d6b (natiivi-ui/kyltti-lepo) = sama muutos kuin 218aea51e Y:ssä. Levossa ei paluuvaraa. Y = KS:n karttaseppa/ajo-yhteinen-tasoitus, nyt 1ab552a69.
PT 18.5x: "Korjaus kulkee Y:n mukana vasta, kun Y hyväksytään; Y on yhä koe, joten ei junavuoroa nyt." 33ea85e3b jätetään pois, kun Y kootaan junaan (kirjattu tulos-nui.md:hen).
- Ehto 1, rakenne: selvitetty. KarttaKyltti.cs ja MalliKyltit.cs eivät ole rungossa eivätkä ui-sarjassa, joten poimintaa ei tehdä. Y on käännetty ajossa 29 (error CS 0).
- Ehto 2, Les Halles: täyttyi ajossa 29.
- Ehto 3, välke: EI nähty. PT: "30 vaihtoa nopeissa lennoissa (väli 1 ruutu) nähtävä ruutusarjalla tai videolla."

Välkkeen keino: diag-commitia ei tarvittu, vaikka PT antoi siihen luvan; PT:lle kerrottu. Esikatselu.cs:n `tallenne-alku nimi fps leveys` / `tallenne-loppu` tallentaa joka peliruudun UI:n kanssa, video `zsh tyokalut/tallenne-video.sh <lokikansio> <nimi> <ulos.mp4>`. Skenaario _tyo/karttaseppa/lisa-kyltti-valke.txt, 5 tallennetta, ei kuva-rivejä. KS liittää sen ajon 30 loppuun, jos ajo ei ole alkanut, muuten seuraavaan ajoon. KS kertoo lokikansion.

Kun tallenteet tulevat:
1. kyltti-kal: laske, montako kuvaa Bastiljin häivytys kestää. Noin 9 kuvaa = siirtymä kulkee peliajassa. Noin 2 kuvaa = kellossa, ja tallenne liioittelee (aiempi tallenne 251 kuvaa 26 s:ssa, noin 0,10 s kello per kuva). En tiedä kumpi, siksi mittaus.
2. kyltti-a, -b, -c, -d: etsi kuvat kyltti-ui-rivien ruudun mukaan (kuva 0 = "tallenne alkaa" -lokirivin ruutu; tarkista, täsmääkö). Ajon 28 välit: a Tuileries 1, Concorde 1; b Galerie 6; c Luxembourg näkyy 2, piilossa 4; d Galerie piilossa 4, näkyy 7, piilossa 6 (pisin näkyvä). Vaihtojen ruudut voivat poiketa ajosta 28, joten lue rivit tästä ajosta.
3. Katso täysikoon rajauksina, tee video, aja `python3 -I tools/valahdys-yavg.py <video> 4`.
4. Tulos PT:lle: näkyykö välke. Liioittelevassa tallenteessa näkyvä välke ei vielä todista vikaa. Ei väitettä "ei välkettä" lokin perusteella.

Koodista luettu, ei mitattu: kyltin peitto kulkee USS-siirtymän kautta, 0,18 s ease-in-out. Laskelma: 1 ruutu 2 %, 2 ruutua 7 %, 4 ruutua 30 %, 7 ruutua 74 % peiton muutoksesta 60 ruudulla/s.

Temple (PT): jätetään näin, usvaa ei muuteta. Les Halles: kyltti näkyy ajoissa 20 ja 29, ei ajossa 26; edellinen tila ratkaisee, ajon 26 usvassa on päättely. Laatta harmaan mallin päällä, vaikka malli False; ei selvitetty.

## Odottaa, aloittamatta
Tappien lasku vaakapuhelimelle: vasta, kun UI-sarja on yhdistetty.

## Havainnot, ei korjattu
- Ajo 28, kuva 1: Liiku-tekstiä ei näy, vaikka este on lukemassa. Syytä ei selvitetty. EI kerrottu PT:lle.
- Katujen nimet eroavat samalla kameralla samassa ajossa. Syytä ei mitattu.
- E: yli 10 s:n vian syy tuntematon, tuli ainakin kahdesti (14.41 pysty, 61cbc0856 vaaka). Toistossa rinnakkaisia enintään 1, joten kovaa kuormaa ei mitattu.
- NS, ei työtä: kyltit liikkuvat iPadilla portaittain (Mathf.Round). PT: ei korjata nyt.
- Suurennuslasin napissa haalea neliö pallon kuvissa. Lopeta kierros ja Linssit lähes samassa paikassa. F:n ansa: Saapumiskortti, Latauspalkki, KaupunkiKortti, Ponnahdus, ei tarkistettu.
- Yhä avoinna: iPadin karsinnan kesto ennen seuraavaa TF:ää; aaripisteet 38 × kärkimäärä; Metroasema haalea sc-80:ssä; Tuileries'n kuva Louvren kulmassa; yksinäisten pyöreiden kuvien kohteet.

## Opit
- Ennen uutta kehittäjäkomentoa luettava Esikatselu.cs: tallenne oli jo olemassa, ja ehdotin turhaa commitia.
- zsh: `$R:Assets` on muunnin, ja `echo ====` kaataa komennon. Kirjoita "sha:polku" lainausmerkeissä.
- `git merge-tree --merge-base=X^` simuloi poiminnan koskematta levyyn. Ristiriitaisen puun päälle tehty jatkotesti ei todista mitään.
- Rajaa grep tiedostoihin: `grep -r` koko _tyo-kansiosta jumitti komennon.
- Proto-repo on /Users/Shared/Claude/proto-3d/Matkakirja-proto, wt/proto-* kuuluvat sille. Tulokset ovat levyllä proto-3d/lokit/, eivät tässä repossa.
- Skenaarion komennot ajautuvat ennen ui-lukemaa: odota lukeman ja seuraavan komennon väliin.
- Testin .log-tiedostossa ei ole MATKAKIRJA-rivejä: ne ovat tiedostossa `<varauksen loki>.unity.log`. Lue lokin luvut, ei vain VIKA-rivejä.

## Ei todennettu
Välke. Koko testisarja kylttikorjaukselle. Yhdistelmän 1104d0994 käännös ja sarja. Palautus. Oikea iOS-laite. Mylly ja Shakki lautapelikokeen skenaariolla. Skenaario lisa-kyltti-valke.txt on ajamatta: `komento`-rivit tallenteen aikana toimivat aiemmassa tallenteessa, kallista tallenteen aikana ei ole kokeiltu. Raamatun lukua 7 en lukenut kokonaan, vain 7.4, 7.23-7.25, 7.37 ja 7.47; luvut 4, 6, 12 luin.

## Muuta
Etäyhteys vain KK:lla: älä kytke. Hookin työlistarivit (Pariisi uudelleen striimikartan päälle, Pariisin eteneminen, Juoksupeli) eivät tunnistu omikseni, en päivittänyt.
