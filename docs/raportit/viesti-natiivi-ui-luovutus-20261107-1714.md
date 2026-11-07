# Natiivi-UI: luovutus 7.11.2026 (konteksti yli rajan, ei ajoja jonossa)

Itsenäinen: korvaa kaikki aiemmat. PT local_5df52e10-10e4-4b72-9554-0049db300dfe, JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7, NS local_99130238-aa54-4a29-bcc9-7a023584944b, KS local_740947d7-aa79-4b1e-948e-1b7dfc734364, Postivahti local_afae44f0-722b-4541-a3b8-30ca4f76543b. Viestit send_messagella id:llä, PT:lle enintään 3 riviä.
Proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto, etäpää natiivi-backup. Työkopio /Users/Shared/Claude/wt/proto-natiivi-ui-lahto-vahvistus, haara natiivi-ui/kartan-elama, kärki 7fc20c516. Kääntö: sh Peli-testit/unity-tarkistus.sh (ei tarkista varjostimia); pohjavahti: python3 -I tyokalut/pohjavahti.py. Ajoja ei tehdä itse: vuoro JU:lta. Skenaariot ja raportit: /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui. Lokit: /Users/Shared/Claude/proto-3d/lokit.

## Heti: ei ajoja, odottaa muistipäätöstä
PT 17.1x: "Ei enempää ajoja tästä: tulos KK:lle minun kauttani, jatko on muistipäätös." Älä tilaa iPad-ajoa kartan elämälle ilman PT:n uutta sanaa. Jono tyhjä: rivi PT:lle "JONO TYHJÄ: Natiivi-UI".

## Kartan elämä, tila (koe, ei junaan ilman korttia)
Koodi 7fc20c516: puut oletuksena B (e6b1fb570, PT: koko 1,0, väri 0,26 0,27 0,10; katurivit erottuvat puina). Raitiovaunut pois (omistaja 16.43), kokeena `ui kartanelama raitiot 1`; ei ajettu laitteella päällä eikä kuvattu. Veneet, liput, autot 1 %, linnut ennallaan; linnut peittävät nimiä, omistajalle kerrottu, ei työtä ilman hänen sanaansa. Puut eivät peitä nimiä (ajo 6, Mac).
iPad-ajot, kaikki vahdin VIKAan (raja 4080 Mt), raportit raportti-kartan-elama-7-ipad-, -8-ipad-, -9-ipad-20261107.md:
- Ajo 7 (e6b1fb570, tyhjät välimuistit, ei elämää): lento 3845 → 4164 Mt.
- Ajo 8 pois (7fc20c516): lepo Pariisissa mediaani 3926 / huippu 3940, siirto huippu 4056, lento ilman kuvaa 4041, lento ja kuva 4084 = VIKA.
- Ajo 9 päällä (sama .app): siirron huippu 4091, VIKA 4088, 4 s komennosta. Ero ajoon 8 siirrossa +35 Mt, mediaani +41; yksi pari. Lepoa Pariisissa ei tullut, joten lisä lukemasta 3926 on mittaamatta. Rakennettu elämä ei erotu levossa ennen siirtoa.
Auki: elämäkerros levossa ja lennossa, sujuvuus, Seinen ohenevat rivit iPadilla, 912 ms kehys levossa ajossa 5, kuvat 0–156 ja 814–822, lisenssit ennen julkaisua (OSM ODbL, WorldCover ja Meta/WRI CC BY 4.0). Junaa koskeva +110 / +89 Mt:n ero ajon 7 ja b8:n (702f8b48d) välillä on auki; luvut NS:llä.
KERROTTAVA ennen päätöstä: 5.11. 14.51 ja 14.55 laiva Seinellä pois; 11.52 on uudempi ja kortissa oli veneet.
Suunnitelma: /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261107-pallon-elama-kartalle.md. VS tekee kohdat 1–3, älä koske Filmipinoon.
Skenaariot: sk-kartan-elama-8-ipad-pois.txt, -paalla.txt, -9-ipad-lepo.txt. Jos muistipäätös antaa uuden ajon, siirto on pakollinen ennen lepoa, ja kuvia ei oteta lennossa.

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
- iPad: fp heiluu levossa noin 140 Mt kahden tason välillä; vertaa tasoja huipulla, ei mediaanilla. muisti-tarkka.log: N on millisekunteja ALKU-kellosta.
- iPad-ajurissa ei ole tallennetta; ainoa lentotodiste on `komento kuva`, ja kuva lisää muistia levossa 60–90 Mt ja lennossa 20–40 Mt. VIKAssa vanha lepo-auto voi jäädä laitteelle: tarkista aika ja md5.
- `ui kartanelama 0` alussa jättää elämän rakentamatta. Muista tarkistaa tila-rivi, ennen kuin luet muistia elämän lukuna.
- Kuvaparin eroa kannattaa katsoa kynnyksellä > 4 ja vahvistettuna; python3 numpyn kanssa ilman -I:tä, skripti scratchpadiin. Tummien erojen laskenta ei erota autoja linnuista: merkitse ruudut kuvaan ja katso.
- Tallenteen `t` lokissa ei ole sama kuin peliaika: kohdista rivillä "esiin levossa".
- Git-haku luettelee vain omat haarat: `git diff juna...haara` 60 tuoreimmalle haaralle ja grep; skenaariot erikseen _tyo-kansiosta.
- Junavuoropyyntö: `git cherry <juna> <haara> <pohja>`. Uusi väri Assets/Matkakirja/UI alla: vakio Tyylikirjaan, pohjavahti ennen junapyyntöä.
- `oleta 8 ... ei auki` PUUTE voi olla aito: `ui napauta` lokittaa osuman.
- Kartta: georeferenssi on TrueOrigin; asettele paikalliseen kehykseen kuten Nahtavyysalue. Kartta-kansio on oma asmdef: Linssit/Unity näkee sen, ei päinvastoin; komennot `ui ...` kautta.
- Esikatselu: proto-kaannos-linja1-sisa/tyokalut/esikatselu.sh PROTO_LINJA=2, koko ipad tai iphone-vaaka. `oleta` katsoo vain rivin jälkeen tulleita; kuva = `komento kuva X` + `odota 3`. Levossa `pallo kerros pakota taysi` ennen kuvia, auto ennen lepomittausta.
- Zsh: `echo =====` kaataa komennon, `$J:A` tulkitaan muunnokseksi, ja tyhjä glob kaataa rivin (myös `--include=*.cs`: lainaa). `git rev-parse` yhdelle nimelle kerrallaan --shortilla. Turvatarkistus estää `rm -f $S/*`: älä kierrä.
- Levy: luovutus plumbingilla ilman worktreetä (read-tree + update-index + commit-tree + push).
