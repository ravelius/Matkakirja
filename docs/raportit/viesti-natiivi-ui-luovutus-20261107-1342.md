# Natiivi-UI: luovutus 7.11.2026 (kontekstiraja 28 %, kolme ajoa jonossa JU:lla)

Itsenäinen: korvaa kaikki aiemmat. PT local_5df52e10-10e4-4b72-9554-0049db300dfe, JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7, KS local_740947d7-aa79-4b1e-948e-1b7dfc734364, Postivahti local_afae44f0-722b-4541-a3b8-30ca4f76543b. Viestit send_messagella id:llä, PT:lle enintään 3 riviä.
Proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto, etäpää natiivi-backup. Työkopio /Users/Shared/Claude/wt/proto-natiivi-ui-lahto-vahvistus, nyt haaralla natiivi-ui/kartan-elama. Kääntö: sh Peli-testit/unity-tarkistus.sh; pohjavahti: python3 -I tyokalut/pohjavahti.py. Ajoja ei tehdä itse: vuoro JU:lta.

## Jonossa JU:lla L2:lla (JU kertoo valmiit tälle id:lle)
1. Kartan elämä 2, 9ec3c10fb, sk-kartan-elama-2.txt, lokit/natiivi-ui-kartan-elama-2-9ec3c10fb. Kohta 4 korjauksen jälkeen, vanha aineisto.
2. Kyltti-selvitys 1, c50be596d (haara natiivi-ui/kyltti-selvitys, juna 220 + mittaus, EI junaan), sk-kyltti-selvitys-1.txt, lokit/nui-kyltti-selvitys-1-c50be596d.
3. Kartan elämä 3, 488a0de09, sk-kartan-elama-3.txt, lokit/natiivi-ui-kartan-elama-3-488a0de09. Kohta 5 ja KS:n aineisto.
Skenaariot kansiossa proto-3d/_tyo/natiivi-ui. Kolmatta pyydettiin ennen kuin toisen tai ensimmäisen tuloksia oli: jos ajo 2 paljastaa vian, sen korjaus kuuluu ennen ajoa 3.

## Junan mittarit: valmis ja junassa
051fc0e01 on junassa (f86137fb4:n historiassa, PT 7.11.). Käännös 0 virhettä, pohjavahti ok. Junaan jäi tarkoituksella: Saapumistrailerin iskulauserivi (skenaariot odottavat sitä), "kylkivaihdot vedossa" (löydös 106), KylttiMuistiVersio-laskuri ilman lukijaa.

## Kadonneiden aarteiden oma kyltti: rivi PT:lle lähetetty
Junassa 220, viimeinen muutos d75e66a12 (omistajan pyöreä kuva 21.07, tumma tähtikyltti 7551a76cc, Peilisalin torni b4cf1f86d). Viimeinen commit on merkitty "ajamatta", napautusta ei tarkistettu; valmis-rivi vasta junan kuvista.

## Kartan elämä (omistaja 11.52, koe, ei junaan ilman korttia)
Suunnitelma: /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261107-pallon-elama-kartalle.md. Raportti ajosta 1: proto-3d/_tyo/natiivi-ui/raportti-kartan-elama-1-20261107.md. VS tekee kohdat 1–3, älä koske Filmipinoon.
Ajo 1 (fc153914a) katsottu: liput toimivat. UNESCOn 205 tankoa teki kamman ja söi 80 paikkaa, 785/982 tangolta puuttui maa (harmaa kangas). Savu lähes näkymätön, näkyvin Pompidoun katolta. Mac GPU levossa 1,5–1,7 ms, mutta 10 fps muuttuu 30 fps:ksi; iPadin akkua ei mitattu.
9ec3c10fb: KartanElama.Karsi: vain maatiedolliset liput 40 m:n ruudukossa, Pompidoun putket pois 250 m:n säteellä origosta, savu vahva ja harmaa (arvaus, kuvat ratkaisevat). Savuavia-luku tila-rivillä sisältää poistetut.
488a0de09: KartanElama.Liikenne.cs: veneet, lokit, kyyhkyt, autot, raitiovaunut. Aineisto Resources/Elava/elava-pariisi-kartta.json (KS, sama muoto; koe, ei ämpärissä). Kytkimet `ui kartanelama veneet|linnut|autot 0|1`. Paikallinen y = lähteen y − 90; kadut ja kyyhkyt kaavasta −(x²+z²)/(2·6371000). Peliä ei ajettu, joten yhtään väitettä ei ole todistettu.
Koot arvauksia: vene enintään 50 m (joki noin 120 m), auto koko enintään 3, raitio 2, lintu 1,6 × koko; vana jonossa 3076 (ei testattu). Ei ääniä, ei muita palloja, ei vanan omaa vesipintaa, ei autojen varjoa.
Katso ajosta 3: kulkevatko veneet vedessä, sopivatko koot, liikkuvatko autot kaduilla, peittävätkö linnut nimiä, lepo ja `ui kartanelama tila`. KS:n varoitukset: savu voi leijua (piippua ei piirretä), vene voi kulkea Notre-Damen mallin läpi, 25 kattolippua voi jäädä irti, Montmartre ilman puita. 90 m on päätelty koodista. Lue KS:n ARVIO: proto-3d/_tyo/karttaseppa/pallon-aineisto-20261107/ARVIO.md.
KS: älä muunna koordinaatteja 111132:lla (5 m 8 km:ssä); keskipisteen valinnassa se ei haittaa.
Kohta 6, puut: ei aloitettu. Aineisto puut-pariisi-kartta.bytes samassa kansiossa (261 519 puuta), KaupunkiPuut.Maa kaavasta. PT 7.11.: aloita vasta, kun ajon 3 kuvat on katsottu; ei junaan ilman korttia.
Kuvat KK:lle vasta, kun ne on katsottu (ajo 3 tai 2); sha ja rivi PT:lle. KERROTTAVA kuvien kanssa: 5.11. 14.51 ja 14.55 laiva Seinellä pois, "mitään pieniä malleja ei saa jäädä"; 11.52 on uudempi ja kortissa oli veneet, mutta sano se ennen päätöstä. Sama koskee lippuja. Lisäksi: harmaat ja UNESCOn liput jäävät pois. Lisenssit Lähteet-näkymään ennen julkaisua (OSM ODbL, WorldCover ja Meta/WRI CC BY 4.0).

## Kyltit, PT:n selvitys
Ajosta katsotaan "kyltti syy:" -rivit, kuvat s1-koko-45 ja -85 ja lennot liike (odotus 0,4 s) ja liike15 (1,5 s).
Sacré-Cœur (päätelty lokeista, ei varmistettu): kaukainen kyltti palaa kahden mallin välissä MalliOdotuksen 0,4 s jälkeen ja piiloutuu 0,6–0,7 s:ssa. Loppurivi jää näkyviin. Korjausehdokas: pidempi paluuodotus lennossa (`ui kylttiodotus`, MalliKyltit.LiikeOdotus).
Sainte-Chapelle 85° (epäily): malli näkyy, mallitesti sallii, mutta Vapaa hylkää; Louvren kyltti on sivulla 1 jalanjäljen oikealla reunalla, joten todennäköinen este on Louvren jalanjälki. PT:n lisäys KS:n ajosta 49 (_tyo/karttaseppa/parit-yhteinen-49/kk/rajaus-louvre-85.jpg): Louvren kyltti Sainte-Chapellen juurella voi näyttää sen nimeltä. Korjaa samalla. Hyväksyntäehto: 85°:ssa kumpikaan nimi ei näytä toisen rakennuksen nimeltä.
Korjaus omalle haaralle junan päälle, mittaus c50be596d ei junaan. Tieto: omistaja hyväksyi tumman tähtikyltin 5.11. 15.59.

## Kahdeksan huutoa, otot KK:lla: odottaa omistajaa
Kansio proto-3d/_tyo/juoksupeli-huudot-kala-allas-ruukku-20261107 (tee.py, kuuntele.py, video.py, ulos/*.wav raakana PCM:nä). Video KK:lla: /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/videot-20261107/huudot-kala-allas-kukkaruukku-otot.mp4. Suunnitelma: saman kansion suunnitelmat/20261107-huudot-kala-allas-granaattiomenapuu.md.
Kavya bA58y3FqVI6b6gTNh0oT, eleven_v4_turbo, style 0, speed 1.2, fi, pcm_44100. Uusinta vain KK:n sanalla, hyväksyntä vain rivillä "OMISTAJAN PÄÄTÖS klo …". Tee.py ei aja olemassa olevaa uudelleen: uusinta uudella tiedostolla ja vain siitä otosta.
Hyväksynnän ja PT:n sanan jälkeen: tasoitus PCM:nä (true peak enintään −1 dBTP, Raamattu 5.10), mp3 kerran, ääniportti (proto-3d/tyokalut/aaniportti.py, 5.11), polut PK:lle. Avain juoksupeli.rikkoutuva.kala-allas.huuto.1–4 ja kukkaruukku.huuto.1–4. Ei vientiä ennen sitä. Ei jälkisäätöjä puheeseen (5.7). Malli: PuyiHuudot.cs.

## Valmista, ei toimia
Pallon napit, Poistun näkyvyys, lähtökysymys: junassa 220. Omistaja 12.22 tumma valikko "Kelpaa". Oikea sormi, oikea iPhone ja laukaisun nousu todistamatta; napautus tarkistetaan junan käännöksestä. Jos KK tuo omistajan huomion lasista, korjaa sen mukaan. Raportit proto-3d/_tyo/natiivi-ui/raportti-lahtokysymys-ipad5-20261107.md ja raportti-pallonapit-20261107.md.

## Avoinna aiemmasta
Jos omistaja päättää PK:n Taso läpi -kortin muunnelmasta (JuoksuLoppukortti.AsetaNosto, pelikoodari/tarkastelu-219, 4aa9ec365), NUI lisää sen pohjiin ja tyylikirjaan (Raamattu 4.1).

## Opit
- Ajon valmistuminen näkyy kansiosta ja lokin rivistä "valmis N s" jo ennen JU:n viestiä.
- Kuvaparin eron kynnys: > 24 näyttää vain kirkkaat; savu löytyi kynnyksellä > 4 (kuva vahvistettuna 16×).
- Git-haku luettelee vain omat haarat: `git diff juna...haara` 60 tuoreimmalle haaralle ja grep; skenaariot erikseen _tyo-kansiosta (`oleta`-rivit riippuvat lokiriveistä).
- Junavuoropyyntö: `git cherry <juna> <haara> <pohja>`. Uusi väri Assets/Matkakirja/UI alla: vakio Tyylikirjaan, pohjavahti ennen junapyyntöä.
- `oleta 8 ... ei auki` PUUTE voi olla aito: `ui napauta` lokittaa osuman. Kortin napit y 542–580 iPadilla.
- Kartta: georeferenssi on TrueOrigin; asettele paikalliseen kehykseen kuten Nahtavyysalue. Kartta-kansio on oma asmdef: Linssit/Unity näkee sen, ei päinvastoin; komennot `ui ...` kautta.
- Esikatselu: proto-kaannos-linja1-sisa/tyokalut/esikatselu.sh PROTO_LINJA=2, koko ipad tai iphone-vaaka. `linssi opas kaupunkitila` vaatii ensin `odota 30`. `oleta` katsoo vain rivin jälkeen tulleita; kuva = `komento kuva X` + `odota 3`.
- Pelaajana-testi: `ui pelaaja 1` + tarkistus `kehittäjälle maksuton ei`.
- Zsh: `echo =====` kaataa komennon ja `$J:A` tulkitaan muunnokseksi, joten kirjoita `${J}:polku`. Turvatarkistus estää `rm -f $S/*`: älä kierrä.
