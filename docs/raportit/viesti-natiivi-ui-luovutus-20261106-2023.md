# Natiivi-UI: luovutus 6.11.2026 klo 20.23 (konteksti 26 %, pehmeä raja)

Itsenäinen: korvaa kaikki aiemmat luovutukset. Oma id local_43962c89-fc14-4098-9dd7-6153133ffcea. PT local_5df52e10-10e4-4b72-9554-0049db300dfe, JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7, KS local_740947d7-aa79-4b1e-948e-1b7dfc734364.
Ei omia ajoja käynnissä. Tulokset tulevat viestinä tähän id:hen. Tiedot levyllä: proto-3d/lokit/nui-tahtikyltit-20261106/tulos-nui.md (kyltit, lue kaksi viimeistä lukua) ja proto-3d/lokit/nui-ui-13dab1aac-toisto/tulos-nui.md (yhdistelmä, lue kolme viimeistä lukua). Proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto; oma worktree /Users/Shared/Claude/wt/proto-natiivi-ui-kyltit-219 on nyt haaralla natiivi-ui/tallenne-ui-kello.

## Odottaa
1. PT:n sana: poimitaanko 166378891 (natiivi-ui/tallenne-ui-kello, vain Esikatselu.cs) ajoon 31 KS:n kautta. Kysytty 20.22. Vastaus puuttuu luovutushetkellä: jos sana tulee, välitä se KS:lle.
2. JU: iPad-uusinta, tulos lokit/nui-piilo-palautus-1104d0994/ipad-2, NS:n tärinäajon ja jäähdytyksen jälkeen.
3. KS: ajo 31, kertoo lokikansion.

## 1. Yhdistelmä 1104d0994 (runko 603d4213a + 13dab1aac): ei junaan ennen iPad-tulosta
UI-sarja 14/15, vain D:n 3 riviä, yli 10 s:n vikaa 0; rinnakkaisia enintään 1, joten E:tä ei mitattu kovalla kuormalla. Palautus Mac täyttää ehdon (5 poistoa, 2 palautusta, 0 RenderTreeCompositor, Pulu kuvissa 2 ja 4 sama pikselilleen).
iPad-ajo 1 ei täyttänyt ehtoa: 4 poistoa, 0 palautusta; kuvat samat. Syy on PÄÄTTELYÄ: Livia vaihtui piilotuksen aikana, omistaja kirjoitti suotimen itse.
PT:n ehto uusinnalle, ei löysene: palautuksia > 0 iPadilla, 0 RenderTreeCompositor, suodin kuvassa. Skenaario lokit/nui-piilo-palautus/sk-ipad-livian-jalkeen.txt (odota 110). Tarkista, ettei rivien ui pois ja ui paalle välissä ole livia-rivejä. Katso kuvat 2 ja 4 täysikoossa; kamera on paikallaan, joten pikselivertailu toimii. Jos Livia tms. vaihtuu taas eikä palautuksia tule: rivi PT:lle, EI toista uusintaa. Tulos PT:lle 3 rivinä. Junaan vasta PT:n kuittauksella.

## 2. Kyltit: ei kuittausta eikä junaa ennen välkkeen näkemistä
PT: "ehto oli 30 vaihtoa nopeissa lennoissa, nyt 3, eikä oikeaa nopeutta nähty." Älä laske ehtoa. Luxembourgin 0,16 s:n paluu on MAHDOLLINEN VIKA, kunnes se on nähty. Ajo 30: vain 3 vaihtoa, Galerie ei osunut, häivytys tallenteessa 2 kuvaa 9:n sijaan.
Lista _tyo/karttaseppa/lisa-kyltti-valke-31.txt ajon 31 loppuun: 24 lentoa + kal, enintään 48 vaihtoa. Reitit on laskettu, ajamatta.
Kun tallenteet tulevat:
- Lokissa "tallenne: UI-kello peliajassa, paneeleja N/N". Mittaa kyltti31-kal:n häivytys: noin 9 kuvaa = toimii. Jos 2, tallenne ei näytä oikeaa nopeutta: kerro PT:lle, mitä se todistaa (vaihtojen ruudut ja kestot), älä laske ehtoa. Kirkkausmittaus: harmaa-alue x 600-666, y 993-1009 kuvista k-*.jpg.
- Laske kyltti-ui-rivit tallenteiden sisältä (kuva = ruutu - "alkaa"-rivin ruutu). Alle 30 = kerro PT:lle, tee lisälista KS:lle, ei omaa ajoa.
- Katso vaihdot täysikoon ruutusarjoina ja videona (zsh tyokalut/tallenne-video.sh <lokikansio> <nimi> <ulos.mp4>). tools/valahdys-yavg.py ei tunnista näin pientä kylttiä, joten sen 0 ei todista mitään.
- Tulos PT:lle: näkyykö välke. Ei väitettä "ei välkettä" lokin perusteella.
Kylttikorjaus b3cdf8d6b (natiivi-ui/kyltti-lepo) kulkee Y:n (karttaseppa/ajo-yhteinen-tasoitus) mukana. PT: Y on yhä koe, ei junavuoroa. 33ea85e3b jätetään pois, kun Y kootaan junaan.

## 3. Näkymätön Liiku kyltin esteenä: 99b556890 (natiivi-ui/kyltti-nakymaton-liiku)
PT kuittasi: poiminta Y:hyn ajoon 31 KS:n kautta, ei junaan. Ajon 28 kuvan 1 puuttuva Liiku ei ollut vika: nappi on piilossa kerronnan ajan. Käännöstarkistus 0 virhettä, ajamatta.
Todennus ajosta 31: KS lisäsi (pyysin) kuvan kyltti-kerronta. Odotus: kuva ennen riviä "ui liiku: esiin", Bastilji näkyy Liikun kohdalla, esteissä ei Liikua, Bastilji piiloon vasta esiin-rivin jälkeen. Kuva esiin-rivin jälkeen = ajo ei todista.

## Odottaa, aloittamatta
Tappien lasku vaakapuhelimelle: vasta, kun UI-sarja on yhdistetty.

## Havainnot, ei korjattu
- Piilossa olevaan elementtiin kirjoitettu suodin jää voimaan näkyviin asti (PiiloVartija OnPoistettu); haittaa ei mitattu.
- Livian ohjeteksti on terävä sumean kartan päällä nostokortin ollessa auki; onko tarkoitus, ei selvitetty.
- Macin ajossa UI 15:n ja 20:n suotimet jäivät poistetuiksi; palautus näkyville nähty vain UI 12:lle ja 35:lle.
- Katujen nimet eroavat samalla kameralla samassa ajossa. Syytä ei mitattu.
- E: yli 10 s:n vian syy tuntematon, tuli ainakin kahdesti.
- NS, ei työtä: kyltit liikkuvat iPadilla portaittain (Mathf.Round). PT: ei korjata nyt.
- Temple (PT): jätetään näin. Les Halles: kyltti näkyy ajoissa 20 ja 29, ei ajossa 26; edellinen tila ratkaisee.
- Suurennuslasin napissa haalea neliö pallon kuvissa. Lopeta kierros ja Linssit lähes samassa paikassa. F:n ansa: Saapumiskortti, Latauspalkki, KaupunkiKortti, Ponnahdus, ei tarkistettu.
- Yhä avoinna: iPadin karsinnan kesto ennen seuraavaa TF:ää; aaripisteet 38 × kärkimäärä; Metroasema haalea sc-80:ssä; Tuileries'n kuva Louvren kulmassa; yksinäisten pyöreiden kuvien kohteet.

## Opit
- zsh: `$R:Assets` on muunnin, ja se kaatoi komennon taas: kirjoita "${R}:polku". `echo ====` kaatuu.
- unity-tarkistus.sh ei käännä Editor-kansiota: Esikatselu.cs-muutoksen "0 virhettä" ei todista mitään. Käännä uusi osa erikseen csc:llä tai odota ajoa.
- Paneelin kello: BaseVisualElementPanel.TimeSinceStartupFunc (sisäinen, TimeFunction palauttaa double). Luettu DLL:stä reflektiolla (mono + csc, Resources/Scripting).
- Tallenteessa kyltti 1 kuva = 0,02 s peliaikaa; ajon 28 ruudut eivät olleet samaa mittaa, joten ajon 28 kestoja ei voi verrata suoraan.
- Rajaa grep tiedostoihin. Lue lokin luvut, ei vain VIKA-rivejä. Testin MATKAKIRJA-rivit ovat tiedostossa <varauksen loki>.unity.log.

## Ei todennettu
Välke oikeassa nopeudessa. 99b556890 ja 166378891 ajossa. Koko Esikatselu.cs:n käännös 166378891:n kanssa. Lentolistan reitit. Palautushaara iPadilla. Oikea iOS-laite. Mylly ja Shakki lautapelikokeen skenaariolla.

## Muuta
Etäyhteys vain KK:lla: älä kytke. Hookin työlistarivit (Pariisi, Juoksupeli, Nimet häipyvät, Vaaleat kyltit, Palatsin sisätilat) eivät tunnistu omikseni, en päivittänyt.
