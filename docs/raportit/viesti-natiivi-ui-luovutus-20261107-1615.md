# Natiivi-UI: luovutus 7.11.2026 (konteksti yli 30 %, yksi ajo jonossa JU:lla)

Itsenäinen: korvaa kaikki aiemmat. PT local_5df52e10-10e4-4b72-9554-0049db300dfe, JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7, KS local_740947d7-aa79-4b1e-948e-1b7dfc734364, Postivahti local_afae44f0-722b-4541-a3b8-30ca4f76543b. Viestit send_messagella id:llä, PT:lle enintään 3 riviä.
Proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto, etäpää natiivi-backup. Työkopio /Users/Shared/Claude/wt/proto-natiivi-ui-lahto-vahvistus, haara natiivi-ui/kartan-elama. Kääntö: sh Peli-testit/unity-tarkistus.sh (ei tarkista varjostimia); pohjavahti: python3 -I tyokalut/pohjavahti.py. Ajoja ei tehdä itse: vuoro JU:lta. Skenaariot ja raportit: /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui. Lokit: /Users/Shared/Claude/proto-3d/lokit.

## Heti: puut, PT:n sana 16.1x
PT: "korjaa väri, koko ja nimet, kaksi yritystä, sitten kuvat minulle". Yritys 1 on 531ccfd34, ajamatta, JU:n jonossa L2:lla: sk-kartan-elama-6.txt, lokit/natiivi-ui-kartan-elama-6-531ccfd34, 8 kuvaa ilman tallennetta. Luo vahti lokin riville "valmis N s".
Muutos: koko 1,4, latvusväri oliivi (`_PuuSavy` varjostimessa KaupunkiPuu, oletus 0 ei koske kaupunkinäkymää), nimien kohdalta puut pois karkealla ruutumaskilla (KartanElama.Puut.cs). Kuvissa A = oletus, B = koko 1,0 ja vaaleampi. Komennot `ui kartanelama puukoko n`, `puuvari r g b a`.
Katso: väri kartan rinnalla, ovatko enää möhkäleitä, Bois, peittävätkö nimiä (a/b-tuileries70: Kunnialegioonan museo; a/b-seine-lahi: Saint-Germain, Cluny), `nimiltä N` tila-rivillä. Varjostinmuutosta ei ole käännetty Unityssä ennen ajoa. Maskin kuluja lennossa ei ole mitattu.
Kuvat PT:lle. Toinen yritys, jos ensimmäinen ei kelpaa; kolmatta ei ilman PT:n sanaa.

## Seuraavaksi: iso iPad -ajo elämä-kokeelle
PT: kun puut kelpaavat tai raja tulee. Vuoro JU:lta (iso iPad tyhjeni 15.53, ajot vasta JU:n palautuksen jälkeen). Tarkista: tallenteen pelkkä elämäkerros ilman karttaa, sujuvuus ja muisti. Älä oleta kaappausvirhettä ennen sitä. Skenaarion loppuun odotus viimeisen `komento kartta muisti`-rivin jälkeen: ajossa 5 se jäi pois.

## Kartan elämä, tila (omistaja 11.52 ja 15.20; koe, ei junaan ilman korttia)
Raportti raportti-kartan-elama-5-20261107.md, kuvat ajo5-kuvat/. Veneet ja liput jäävät. Linnut jäävät, ei muutoksia ilman omistajan sanaa: ne peittävät Place de la Républiquen nimeä, kuva k45-merkit.png menee PT:ltä KK:lle. Linnut eivät kulje nimien väistöstä.
Autot 1 % leveydestä kuitattu (PT). Autoja 1187. Elämä väistää nimet ruutulaatikoilla (KartanElama.Nimet.cs). Raitiovaunun lähikuva PT:llä; kamera ei pääse alle 1679 m:n, ja kaikki kuvat ovat siltä korkeudelta, joten `aja`-kaari ei muuta kuvaa alle sen.
Auki: 912 ms kehys levossa ajossa 5; kuvien 0–156 ja 814–822 pelkkä kerros; puiden muisti; lisenssit ennen julkaisua (OSM ODbL, WorldCover ja Meta/WRI CC BY 4.0). KERROTTAVA ennen päätöstä: 5.11. 14.51 ja 14.55 laiva Seinellä pois; 11.52 on uudempi ja kortissa oli veneet.
Suunnitelma: /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261107-pallon-elama-kartalle.md. VS tekee kohdat 1–3, älä koske Filmipinoon.

## Kyltit: valmis
9566323b2 PT:n luvalla junaan, JU poimii. Tunnettuja ilman korjausta (PT): vilahdukset lennossa 0,42–1,02 s, Sainte-Chapellen kyltti puuttuu Panthéonin takana. Yhteisajo näyttää iPadilla. Tuileries'n kyltti junassa, nähty levossa vain Macilla. Raportti raportti-kyltti-korjaus-1-20261107.md.

## Kahdeksan huutoa, otot KK:lla: odottaa omistajaa
Kansio proto-3d/_tyo/juoksupeli-huudot-kala-allas-ruukku-20261107 (tee.py, kuuntele.py, video.py, ulos/*.wav raakana PCM:nä). Video /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/videot-20261107/huudot-kala-allas-kukkaruukku-otot.mp4. Suunnitelma: saman kansion suunnitelmat/20261107-huudot-kala-allas-granaattiomenapuu.md.
Kavya bA58y3FqVI6b6gTNh0oT, eleven_v4_turbo, style 0, speed 1.2, fi, pcm_44100. Uusinta vain KK:n sanalla, hyväksyntä vain rivillä "OMISTAJAN PÄÄTÖS klo …". Tee.py ei aja olemassa olevaa uudelleen: uusinta uudella tiedostolla ja vain siitä otosta.
Hyväksynnän ja PT:n sanan jälkeen: tasoitus PCM:nä (true peak enintään −1 dBTP, Raamattu 5.10), mp3 kerran, ääniportti (proto-3d/tyokalut/aaniportti.py, 5.11), polut PK:lle. Avain juoksupeli.rikkoutuva.kala-allas.huuto.1–4 ja kukkaruukku.huuto.1–4. Ei vientiä ennen sitä. Ei jälkisäätöjä puheeseen (5.7). Malli: PuyiHuudot.cs.

## Junasta PT:lle kerrottu
Aloituslennosta ja introsta ei katsottua iPad-tulosta, vain Mac. Junassa, vaikka commiteissa lukee "ei junaan": 81db2de0e, 6d12054b0, ef23bbd63, 7ffd6ab5f. Pallon napit, Poistun näkyvyys, lähtökysymys junassa 220: oikea sormi, oikea iPhone ja laukaisun nousu todistamatta. Kadonneiden aarteiden kyltti d75e66a12: napautus tarkistamatta.

## Avoinna aiemmasta
Jos omistaja päättää PK:n Taso läpi -kortin muunnelmasta (JuoksuLoppukortti.AsetaNosto, pelikoodari/tarkastelu-219, 4aa9ec365), NUI lisää sen pohjiin ja tyylikirjaan (Raamattu 4.1).

## Opit
- Kuvaparin eroa kannattaa katsoa kynnyksellä > 4 ja vahvistettuna; python3 numpyn kanssa ilman -I:tä, skripti scratchpadiin. Tummien erojen laskenta ei erota autoja linnuista: merkitse ruudut kuvaan ja katso.
- Tallenteen `t` lokissa ei ole sama kuin peliaika: kohdista rivillä "esiin levossa".
- Git-haku luettelee vain omat haarat: `git diff juna...haara` 60 tuoreimmalle haaralle ja grep; skenaariot erikseen _tyo-kansiosta.
- Junavuoropyyntö: `git cherry <juna> <haara> <pohja>`. Uusi väri Assets/Matkakirja/UI alla: vakio Tyylikirjaan, pohjavahti ennen junapyyntöä.
- `oleta 8 ... ei auki` PUUTE voi olla aito: `ui napauta` lokittaa osuman.
- Kartta: georeferenssi on TrueOrigin; asettele paikalliseen kehykseen kuten Nahtavyysalue. Kartta-kansio on oma asmdef: Linssit/Unity näkee sen, ei päinvastoin; komennot `ui ...` kautta.
- Esikatselu: proto-kaannos-linja1-sisa/tyokalut/esikatselu.sh PROTO_LINJA=2, koko ipad tai iphone-vaaka. `oleta` katsoo vain rivin jälkeen tulleita; kuva = `komento kuva X` + `odota 3`. Levossa `pallo kerros pakota taysi` ennen kuvia, auto ennen lepomittausta.
- Zsh: `echo =====` kaataa komennon, `$J:A` tulkitaan muunnokseksi, ja tyhjä glob kaataa rivin. `git rev-parse` yhdelle nimelle kerrallaan --shortilla. Turvatarkistus estää `rm -f $S/*`: älä kierrä.
