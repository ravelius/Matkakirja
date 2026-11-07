# Natiivi-UI: luovutus 7.11.2026 (konteksti yli 25 %, kaksi ajoa jonossa JU:lla)

Itsenäinen: korvaa kaikki aiemmat. PT local_5df52e10-10e4-4b72-9554-0049db300dfe, JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7, KS local_740947d7-aa79-4b1e-948e-1b7dfc734364, Postivahti local_afae44f0-722b-4541-a3b8-30ca4f76543b. Viestit send_messagella id:llä, PT:lle enintään 3 riviä.
Proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto, etäpää natiivi-backup. Työkopio /Users/Shared/Claude/wt/proto-natiivi-ui-lahto-vahvistus, nyt haaralla natiivi-ui/kartan-elama. Kääntö: sh Peli-testit/unity-tarkistus.sh; pohjavahti: python3 -I tyokalut/pohjavahti.py. Ajoja ei tehdä itse: vuoro JU:lta. Luo vahti: lokikansion loki.txt:n rivi "valmis N s" näkyy jo ennen JU:n viestiä.

## Jonossa JU:lla L2:lla (JU kertoo valmiit tälle id:lle)
1. Kyltti-korjaus 1, 053f58aff (haara natiivi-ui/kyltti-korjaus-mittaus = korjaus + syy-mittari, EI junaan), sk-kyltti-korjaus-1.txt, lokit/nui-kyltti-korjaus-1-053f58aff. 7 kuvaa + tallenne liike.
2. Kartan elämä 4, 2390b7186 (haara natiivi-ui/kartan-elama, koe), sk-kartan-elama-4.txt, lokit/natiivi-ui-kartan-elama-4-2390b7186. 14 kuvaa + tallenne liike.
Skenaariot kansiossa proto-3d/_tyo/natiivi-ui. PT tietää kohdan 5 tuloksen ja kyltit, mutta ei vielä kohtaa 6: se kuuluu ajon 4 kuvien viestiin.

## Kyltit: korjaus odottaa kuvia, kuuluu ennen junaa
Korjaus 9566323b2 (haara natiivi-ui/kyltti-korjaus, junan 2410473bb päällä): Sainte-Chapelle ja Louvre mallin alle kuten muut (KylttiSivu pois, Nahtavyysalue.cs), LiikeOdotus 1,5 s (MalliKyltit.cs). Käännös 0, pohjavahti ok. Ajamatta. Raportti: proto-3d/_tyo/natiivi-ui/raportti-kartan-elama-1-20261107.md, loppuosa.
Selvityksen tulos (lokit/nui-kyltti-selvitys-1-c50be596d): Sainte-Chapelle "jalanjälki Louvre" 2 pt:n osumalla, ja sivut veivät nimet ristiin. Sacré-Cœur 0,4 s: esiin 0,74 ja 0,56 s kahden mallin välissä; 1,5 s ei vilahda. Päätelty lokiriveistä. Tallenteet liike ja liike15 ovat kansiossa, ei katsottu.
Katso ajosta: `kyltti syy` -rivit, k-koko-45/-70/-85, k-louvre-45/-85, k-chapelle-45/-85, tallenne kuvina. Hyväksyntäehto: 85°:ssa kumpikaan nimi ei näytä toisen rakennuksen nimeltä. Riski: Louvren keskikohta jää ruudun ulkopuolelle ja kyltti puuttuu, vaikka Louvre näkyy. Tunnettu ja jätetty: Opéra vilahtaa 0,54 s ruudun reunan yli (ei mallin takaa).
Hyvä tulos: junapyyntö PT:lle 9566323b2, EI 053f58aff. Tieto: omistaja hyväksyi tumman tähtikyltin 5.11. 15.59.

## Kartan elämä (omistaja 11.52, koe, ei junaan ilman korttia)
Suunnitelma: /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261107-pallon-elama-kartalle.md. VS tekee kohdat 1–3, älä koske Filmipinoon. KS:n ARVIO: proto-3d/_tyo/karttaseppa/pallon-aineisto-20261107/ARVIO.md.
Raportit samassa kansiossa kuin skenaariot: raportti-kartan-elama-2-20261107.md ja -3-20261107.md. Ajo 3 katsottu ja kerrottu PT:lle: veneet vedessä, autot ja raitiovaunut kaduilla, liikkuvat; linnut rumia lähellä, savu vaisu, elämäkerros piirtyy nimien päälle (ElavaKamera kuvan päälle, joten jono ei auta; ei korjattu). Kuvien kerrottavat omistajalle ovat raportissa 3, ja rivi on PT:llä.
Kohta 6, 2390b7186: KartanElama.Puut.cs, aineisto Resources/Elava/puut-pariisi-kartta.bytes, varjostin KaupunkiPuu (vain kaukokortti), pääkameran kerros, enintään 70 000 lähimmästä alkaen, kaukoraja max(2500 m, 4 × korkeus), koko 2,5 (arvaus). Kytkimet `ui kartanelama puut 0|1`, `puukoko n`. Ei ajettu: kaikki väittämät auki.
Katso ajosta 4: näkyvätkö puut lainkaan (jono 3077, valo, Ilmakeha.hlsl voi värjätä), tyvi kartalla, koko ja väri palikkapuihin verrattuna, puut nimien päällä, sahaus (georeferenssi 0,5 m), `ui kartanelama tila`, kehysajat, muisti. Tallenne liike: liikkeen sujuvuus ajosta 3 jäi todistamatta. Levossa `kuva` voi ottaa ElavaKameran (k70-paalla, s1, s2 ajossa 3): pelkkä kerros, ei peli.
Avoimet: kaksi siivekästä hahmoa ilman selitystä (ajo 2 k70-pois, ajo 3 champs-lahi pois-kuvassa suuret harmaat kartan linnut). Savuavia-luku sisältää poistetut. Koot arvauksia. Ei ääniä, ei muita palloja, ei vanan vesipintaa, ei autojen varjoa. Lisenssit ennen julkaisua: OSM ODbL, WorldCover ja Meta/WRI CC BY 4.0. KS: älä muunna koordinaatteja 111132:lla (5 m 8 km:ssä).
KERROTTAVA kuvien kanssa: 5.11. 14.51 ja 14.55 laiva Seinellä pois, "mitään pieniä malleja ei saa jäädä"; 11.52 on uudempi ja kortissa oli veneet, mutta sano se ennen päätöstä. Sama koskee lippuja. Harmaat ja UNESCOn liput jäävät pois.

## Junan mittarit ja kyltti: junassa
051fc0e01 junassa. Kadonneiden aarteiden oma kyltti d75e66a12 junassa 220, viimeinen commit "ajamatta", napautus tarkistamatta; valmis-rivi vasta junan kuvista.

## Kahdeksan huutoa, otot KK:lla: odottaa omistajaa
Kansio proto-3d/_tyo/juoksupeli-huudot-kala-allas-ruukku-20261107 (tee.py, kuuntele.py, video.py, ulos/*.wav raakana PCM:nä). Video KK:lla: /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/videot-20261107/huudot-kala-allas-kukkaruukku-otot.mp4. Suunnitelma: saman kansion suunnitelmat/20261107-huudot-kala-allas-granaattiomenapuu.md.
Kavya bA58y3FqVI6b6gTNh0oT, eleven_v4_turbo, style 0, speed 1.2, fi, pcm_44100. Uusinta vain KK:n sanalla, hyväksyntä vain rivillä "OMISTAJAN PÄÄTÖS klo …". Tee.py ei aja olemassa olevaa uudelleen: uusinta uudella tiedostolla ja vain siitä otosta.
Hyväksynnän ja PT:n sanan jälkeen: tasoitus PCM:nä (true peak enintään −1 dBTP, Raamattu 5.10), mp3 kerran, ääniportti (proto-3d/tyokalut/aaniportti.py, 5.11), polut PK:lle. Avain juoksupeli.rikkoutuva.kala-allas.huuto.1–4 ja kukkaruukku.huuto.1–4. Ei vientiä ennen sitä. Ei jälkisäätöjä puheeseen (5.7). Malli: PuyiHuudot.cs.

## Valmista, ei toimia
Pallon napit, Poistun näkyvyys, lähtökysymys: junassa 220. Omistaja 12.22 tumma valikko "Kelpaa". Oikea sormi, oikea iPhone ja laukaisun nousu todistamatta; napautus tarkistetaan junan käännöksestä. Jos KK tuo omistajan huomion lasista, korjaa sen mukaan. Raportit proto-3d/_tyo/natiivi-ui/raportti-lahtokysymys-ipad5-20261107.md ja raportti-pallonapit-20261107.md.

## Avoinna aiemmasta
Jos omistaja päättää PK:n Taso läpi -kortin muunnelmasta (JuoksuLoppukortti.AsetaNosto, pelikoodari/tarkastelu-219, 4aa9ec365), NUI lisää sen pohjiin ja tyylikirjaan (Raamattu 4.1).

## Opit
- Kuvaparin eroa kannattaa katsoa kynnyksellä > 4 ja vahvistettuna; python3 numpyn kanssa ilman -I:tä, skripti scratchpadiin.
- Git-haku luettelee vain omat haarat: `git diff juna...haara` 60 tuoreimmalle haaralle ja grep; skenaariot erikseen _tyo-kansiosta.
- Junavuoropyyntö: `git cherry <juna> <haara> <pohja>`. Uusi väri Assets/Matkakirja/UI alla: vakio Tyylikirjaan, pohjavahti ennen junapyyntöä.
- `oleta 8 ... ei auki` PUUTE voi olla aito: `ui napauta` lokittaa osuman. Kortin napit y 542–580 iPadilla.
- Kartta: georeferenssi on TrueOrigin; asettele paikalliseen kehykseen kuten Nahtavyysalue. Kartta-kansio on oma asmdef: Linssit/Unity näkee sen, ei päinvastoin; komennot `ui ...` kautta.
- Esikatselu: proto-kaannos-linja1-sisa/tyokalut/esikatselu.sh PROTO_LINJA=2, koko ipad tai iphone-vaaka. `linssi opas kaupunkitila` vaatii ensin `odota 30`. `oleta` katsoo vain rivin jälkeen tulleita; kuva = `komento kuva X` + `odota 3`.
- Pelaajana-testi: `ui pelaaja 1` + tarkistus `kehittäjälle maksuton ei`.
- Zsh: `echo =====` kaataa komennon ja `$J:A` tulkitaan muunnokseksi, joten kirjoita `${J}:polku`. `git rev-parse` yhdelle nimelle kerrallaan --shortilla. Turvatarkistus estää `rm -f $S/*`: älä kierrä.
