# Natiivi-UI: luovutus 7.11.2026 klo 22.08 (Pariisi kohta 8 alussa, muistin vaihe 1 mittauksessa)

Itsenäinen: korvaa kaikki aiemmat. PT local_5df52e10-10e4-4b72-9554-0049db300dfe, JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7, NS local_99130238-aa54-4a29-bcc9-7a023584944b, KS local_740947d7-aa79-4b1e-948e-1b7dfc734364, Postivahti local_afae44f0-722b-4541-a3b8-30ca4f76543b. Viestit send_messagella id:llä, PT:lle enintään 3 riviä.
Proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto, etäpää natiivi-backup. Työkopio /Users/Shared/Claude/wt/proto-natiivi-ui-lahto-vahvistus, haara natiivi-ui/kartan-elama, kärki ebec14c89. Kääntö: sh Peli-testit/unity-tarkistus.sh (ei tarkista varjostimia); pohjavahti: python3 -I tyokalut/pohjavahti.py. Ajoja ei tehdä itse: vuoro JU:lta. Skenaariot ja raportit: /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui. Lokit: /Users/Shared/Claude/proto-3d/lokit.

## Heti: Pariisi-listan kohta 8, kyltit ja nimet liikkeessä
PT:n käsky 7.11. noin 22.0x: tarkista junan 220 tilanne, kirjaa auki jäävä, jatka suurimmasta näkyvästä viasta. Ei iPad-vuoroja; Mac-ajot JU:n vuorolla muistijonon jälkeen; ei junaan ilman PT:n sanaa. Nykytila rivillä PT:lle ennen isoa erää (rivi lähetetty 22.0x, sisältö alla olevassa tiedostossa).
Tarkistus tehty: _tyo/natiivi-ui/kohta8-auki-20261107.md (junassa, auki, seuraava askel). Korjausta ei ole aloitettu eikä tallenteita katsottu. Aloita tiedoston "Seuraava askel" -kohdasta: tallenteet lokit/nui-kyltti-korjaus-1-053f58aff/liike ja lokit/nui-nimi-tallenne-3, järjestys vahvistetaan kuvista.
Tuoreista haaroista lähde junan 220 kärjestä (2f64c2eee tarkistushetkellä); tarkista kärki ennen haaraa.

## Muistin vaihe 1: NS:n mittauksessa, vastaa jos NS kysyy
372a57866, natiivi-ui/muisti-vaihe1, etäpää natiivi-backup, pohja 72e257a0b, ei junaan. Raportti _tyo/natiivi-ui/raportti-muisti-vaihe1-20261107.md. Työkopio /Users/Shared/Claude/wt/proto-natiivi-ui-muisti. Kääntyy, ei ajettu. Verrokki Documents/muisti1-pois.txt ("pois" tai sanat vihjeet, opas, linssit). Sisältö: vihjeiden täysikokoiset kuvat pois (−22,9), oppaan latauskuva pois alle 150 km:ssä ja takaisin levossa yli 250 km:ssä (−28), linssien aineisto vain pyynnöstä (alle −59: maa-aineisto jää lipputangon takia). Kytkin ei kuulu junaan.

## Kartan elämä: lepo
OMISTAJAN PÄÄTÖS klo 19.02 (KK, PT): kartan elämä ei junaan 220, jää kokeeksi. Haara säilyy, ei ajoja eikä lisätyötä ilman PT:n sanaa. Tiedot alla.

## Varjostinselvitys, valmis: odottaa vain PT:n sanaa
PT:n pyyntö (omistaja 20.56), tulos PT:lle ja KK:lle 21.0x: _tyo/natiivi-ui/selvitys-ajossa-luodut-materiaalit-72e257a0b-20261107.md. Junan .appissa kaikki 157 omaa varjostinta; ElavaKohde ja ElavaLippu ilman instansoitua versiota (mitattu), mutta ne piirtyvät MeshRenderereinä eivätkä katoa; hinta mittaamatta. URP/Unlit ei ole .appissa, vain varana. Korjaus (kaksi Instanssi.mat:ia Resourcesiin) vain PT:n sanalla ja mittauksen jälkeen. Latausrajat 40/64 vs 20/20 ovat NS:llä, ei minulla.

## Kartan elämä, tila (koe, ei junaan ilman korttia)
Kärki ebec14c89 (pushattu): 7fc20c516 + KS:n pihapuukoe, `ui kartanelama puut koe 1|0` ja Resources/Elava/puut-pariisi-kartta-koe.bytes (omistaja 18.06, PT 18.08). Kääntyy, ei ajettu minun puoleltani; KS tilaa Mac-ajonsa itse.
Muut 11 NUI-worktreetä poistettu levysiivouksessa 17.4x, haarat tallella; jäljellä lahto-vahvistus ja aloitukset (likainen, 3 tiedostoa). kartan-kaanto-219 pushattu.
Ajo 10 (7fc20c516, vahti pois, raportti-kartan-elama-10-ipad-20261107.md): huippu 4273 klo 18.43.35; lepo 3875 / 4021; lento ilman kuvaa 4028; kierto ilman kuvaa 4174 ja yli rajan 4080 noin 4 s:sta alkaen, nousu noin +260 Mt, syy auki. Lepo 33 ms max 36, lento p50 21 ms max 35, kierto max 77. Puut oliivit, rivit puina, nimet vapaat, raitiovaunuja ei. Havainnot: kartan puut pensailta Louvren mallipuiden vieressä; bois70:n lähirivit makkaroina; seine-lahi on sama rajaus kuin lepo-auto (syy tutkimatta).
Koodi 7fc20c516: puut oletuksena B (e6b1fb570, PT: koko 1,0, väri 0,26 0,27 0,10; katurivit erottuvat puina). Raitiovaunut pois (omistaja 16.43), kokeena `ui kartanelama raitiot 1`; ei ajettu laitteella päällä eikä kuvattu. Veneet, liput, autot 1 %, linnut ennallaan; linnut peittävät nimiä, omistajalle kerrottu, ei työtä ilman hänen sanaansa. Puut eivät peitä nimiä (ajo 6, Mac).
iPad-ajot, kaikki vahdin VIKAan (raja 4080 Mt), raportit raportti-kartan-elama-7-ipad-, -8-ipad-, -9-ipad-20261107.md:
- Ajo 7 (e6b1fb570, tyhjät välimuistit, ei elämää): lento 3845 → 4164 Mt.
- Ajo 8 pois (7fc20c516): lepo Pariisissa mediaani 3926 / huippu 3940, siirto huippu 4056, lento ilman kuvaa 4041, lento ja kuva 4084 = VIKA.
- Ajo 9 päällä (sama .app): siirron huippu 4091, VIKA 4088, 4 s komennosta. Ero ajoon 8 siirrossa +35 Mt, mediaani +41; yksi pari. Lepoa Pariisissa ei tullut, joten lisä lukemasta 3926 on mittaamatta. Rakennettu elämä ei erotu levossa ennen siirtoa.
Auki: kierron muistinousu, kuvat 0–156 ja 814–822, lisenssit ennen julkaisua (OSM ODbL, WorldCover ja Meta/WRI CC BY 4.0). Junaa koskeva +110 / +89 Mt:n ero ajon 7 ja b8:n (702f8b48d) välillä on auki; luvut NS:llä.
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
- Varjostimen versiot voi mitata valmiista .appista: python3 -I _tyo/natiivi-ui/varjostin-purku.py <.app> <ulos.bin> purkaa paketit ja laskee instansoidun Metal-koodin merkit. Vertailuksi aina Maailma tai Symbolimalli. Ajossa luotu materiaali + multi_compile_instancing ilman .mat:ia = versio karsittu; vain RenderMeshInstanced kärsii näkyvästi.
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
- Zsh: `echo ==` kaataa koko komennon (kuten =====); proto-repon `$J:Assets...` tulkitaan muunnokseksi: kirjoita `"${J}:polku"`. Pitkät lokihaut proto-3d/lokit-kansiosta jumittavat (iso kansio): hae nimetystä kansiosta.
- Muistin kevennyksissä aineiston käyttäjät ovat muualla kuin valitsimessa: grep staattisista kentistä ja rekisteri.Hae ennen lykkäystä.
