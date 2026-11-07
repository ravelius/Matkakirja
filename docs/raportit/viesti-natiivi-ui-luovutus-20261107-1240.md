# Natiivi-UI: luovutus 7.11.2026 (kontekstiraja 26 %, kartan elämä odottaa JU:n ajoa)

Itsenäinen: korvaa kaikki aiemmat. PT local_5df52e10-10e4-4b72-9554-0049db300dfe, KK local_37f7c945-e1a0-4638-90b8-93c389a36fbe, JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7, Postivahti local_afae44f0-722b-4541-a3b8-30ca4f76543b. Viestit send_messagella id:llä, PT:lle enintään 3 riviä.
Proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto, etäpää natiivi-backup. Kääntö: sh Peli-testit/unity-tarkistus.sh, pohjavahti: python3 -I tyokalut/pohjavahti.py.
Työkopio: worktree /Users/Shared/Claude/wt/proto-natiivi-ui-lahto-vahvistus, haara natiivi-ui/kartan-elama, HEAD fc153914a (pohja juna 220, 84deb0978), pushattu.

## TYÖ JATKAJALLE: kartan elämä, kohdat 4 ja 5 (PT 12.2x)
Lue kokonaan: /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261107-pallon-elama-kartalle.md (sanat, aiemmat päätökset, lepo-riski).
Omistaja 11.52: "kokeillaan heti ennen junaa", ilman Cesiumin kuukausitilausta, puolipilvinen päivä, muisti vasta lopuksi. Oma haara ja kytkimet, ei junaan ilman omistajan korttia. VS tekee kohdat 1–3: älä koske Filmipinoon. KS tuo aineiston koordinaatit. Mac-kuvat JU:n vuorolla KK:lle, sha ja rivi PT:lle kohta kerrallaan.
KERROTTAVA kuvien kanssa (suunnitelmasta): 5.11. 14.51 ja 14.55 laiva Seinellä pois, "mitään pieniä malleja ei saa jäädä"; 11.52 on uudempi ja kortissa oli veneet, mutta sano se omistajalle ennen päätöstä.

### Kohta 4, savu ja liput: koodi valmis, kuvat odottavat
fc153914a kääntyy (0 virhettä), pohjavahti ok. Peliä ei ole ajettu, joten yhtään väitettä ei ole todistettu.
JU ajaa, L2, pid 19600, koko ipad, raja 20 min, jonossa VS film1:n, NS mac-3:n ja PK jalkojen jälkeen. Kansio lokit/natiivi-ui-kartan-elama-1-fc153914a, skenaario proto-3d/_tyo/natiivi-ui/sk-kartan-elama-1.txt. JU kertoo, kun valmis; älä aja itse.
Kuvat: parit pois/paalla: i00, i45, i70, i85, ilahi (Invalidit 48.8522 2.31), k45, k70 (keskusta 48.8612 2.3509); s1–s3 ruutusarja ja `komento pallo lepo` ennen ja jälkeen.
Katso kuvista ja lokista: rivi "kartan elämä: rakennettu" (mitta), `ui kartanelama tila` (näkyvät määrät, nolla = maa ei tiedossa tai paikka ei Pariisissa), näkyykö lippu ja savu lainkaan, mittakaava, värit paperia vasten, nimien ja mallien järjestys, lipun nykiminen, lepo (ElavaKerros "kartan elämä").
Rakenne: Assets/Matkakirja/Linssit/Unity/KartanElama.cs: oletus pois, `ui kartanelama 1|0|savu 0|1|liput 0|1|koko n|tila`. Juuri georeferenssin lapsi kuten Nahtavyysalue (ankkuri 90 m, akselit itä, ylös, pohjoinen); maa MaanPinta.Hae, kaarevuus mukana; tuuli 240° 4 m/s; valo KoriValaistus (50°, harmaus 0,45); koko korkeus/250 välillä 2–10; valinta näkymän keskipisteestä (kierto.leveys, pituus); piilossa kaupunkinäkymässä ja museossa; aineisto taustasäikeellä; Elava-kerros + ElavaKerros.Animoi. ElavaSavuLiput sai Koko, SavuJonoPakko, LippuJonoPakko (pallolla oletukset ennallaan). Jonot: lippu ja tanko 3077, savu 3085; kartan piirros kulkee ZTest Always, joten oletusjonoilla kohde jäisi sen alle.
Arvaukset, jotka kuvat ratkaisevat: koko, jonot, valon värit (Laki, Horisontti), ankkurin ja tileen ero. Riskit: TrueOrigin-georeferenssi pyöristää noin 0,5 m (lippu voi sahata; ei mitattu), tanko voi jäädä alle pikselin, ElavaKohde ei tunne oman kartan usvaa muuten kuin MixFogilla.

### Kohta 5, veneet, lokit, kyyhkyt, autot, raitiovaunut: EI aloitettu
Aloita vasta, kun kohdan 4 kuvat on katsottu, koska käyttää samaa ankkuria ja liioittelua. ElavaKaupunki.Avaa on sidottu CesiumKaupunki.Avattuun ja k.Georef, k.Vesi, k.TaivasAla; maa OpasSovitin.OmaMaa (NaN ilman opasta). Korvaa MaanPinnalla. Veden korkeus 84–89 m vs kartta 90 m. Muut pallot EI (28.10. 09.18). Lue suunnitelma.

### Odottaa PT:n sanaa
Kysyin 12.3x: junassa 220 on yhä mittaririvit "MATKAKIRJA kyltti malli:" ja "kyltti reuna:" (MalliKyltit.cs, 2 kpl), merge-ohje aa2567df7:ssä käskee poistaa. Tee PT:n sanalla omana committina JU:lle. PT:lle kerrottu myös tähtikylttien tila: uusin ajo nui-kyltti-malli-4-3d92da39e, koodi junassa; 3d92da39e:n kuvia ei katsottu tällä sessiolla, omistajan korttia en löytänyt; Sacré-Cœurin kyltti vilahtaa lennossa, Sainte-Chapellen puuttuu 85°:ssa, ei selvitetty.

## Valmista
- Pallon napit, Poistun näkyvyys ja lähtökysymys: junassa 220 kuutena committina + 95c540690 (84deb0978). Omistaja 12.22 tumma valikko "Kelpaa"; työlista kirjattu, PT:lle kerrottu. Oikea sormi, oikea iPhone ja laukaisun nousu todistamatta; napautus tarkistetaan junan käännöksestä (PT: ei uusintaa y 561:llä). Raportti: proto-3d/_tyo/natiivi-ui/raportti-lahtokysymys-ipad5-20261107.md, muut raportti-pallonapit-20261107.md. Jos KK tuo omistajan huomion lasista, korjaa sen mukaan.

## Kahdeksan huutoa, otot KK:lla: odottaa omistajaa
Kansio proto-3d/_tyo/juoksupeli-huudot-kala-allas-ruukku-20261107 (tee.py, kuuntele.py, video.py, ulos/*.wav raakana PCM:nä). Video KK:lla: /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/videot-20261107/huudot-kala-allas-kukkaruukku-otot.mp4. Suunnitelma: saman kansion suunnitelmat/20261107-huudot-kala-allas-granaattiomenapuu.md.
Kavya bA58y3FqVI6b6gTNh0oT, eleven_v4_turbo, style 0, speed 1.2, fi, pcm_44100. Uusinta vain KK:n sanalla, hyväksyntä vain rivillä "OMISTAJAN PÄÄTÖS klo …". Tee.py ei aja olemassa olevaa uudelleen: uusinta uudella tiedostolla ja vain siitä otosta.
Hyväksynnän ja PT:n sanan jälkeen: tasoitus PCM:nä (true peak enintään −1 dBTP, Raamattu 5.10), mp3 kerran, ääniportti (proto-3d/tyokalut/aaniportti.py, 5.11), polut PK:lle. Avain juoksupeli.rikkoutuva.kala-allas.huuto.1–4 ja kukkaruukku.huuto.1–4. Ei vientiä ennen sitä. Ei jälkisäätöjä puheeseen (5.7). Malli: PuyiHuudot.cs.

## Avoinna aiemmasta
Lupaus: jos omistaja päättää PK:n Taso läpi -kortin muunnelmasta (JuoksuLoppukortti.AsetaNosto, pelikoodari/tarkastelu-219, 4aa9ec365), NUI lisää sen pohjiin ja tyylikirjaan (Raamattu 4.1).

## Opit
- Junavuoropyyntö: tarkista `git cherry <juna> <haara> <pohja>`. Luovutuksen 4 commitin lista olisi jättänyt lähtökysymyksen oman koodin pois; kaikki 6 tarvittiin.
- Uusi väri tiedoston Assets/Matkakirja/UI alla: myös johdettu new Color32 punaa pohjavahdin. Vakio Tyylikirjaan, aja pohjavahti ennen junapyyntöä.
- `oleta 8 ... ei auki` PUUTE voi olla aito: `ui napauta` lokittaa osuman. Kortin napit y 542–580 iPadilla (ei nyt x 722–791, Lähde x 801–872); keskikohta 561.
- Kartta: georeferenssi on TrueOrigin eikä liiku; asettele paikalliseen kehykseen kuten Nahtavyysalue. Kartta-kansio on oma asmdef, joten Linssit/Unity-koodi näkee sen mutta ei päinvastoin; komennot `ui ...` kautta.
- Esikatselu: Matkakirja-proton esikatselu.sh on vanha; proto-kaannos-linja1-sisa/tyokalut/esikatselu.sh PROTO_LINJA=2, koko ipad tai iphone-vaaka. Vuoro aina JU:lta. `linssi opas kaupunkitila` vaatii ensin `odota 30`. Ajurissa ei `oleta-uusi`; `oleta` katsoo vain rivin jälkeen tulleita; kuva = `komento kuva X` + `odota 3`.
- Pelaajana-testi: `ui pelaaja 1` + tarkistus `kehittäjälle maksuton ei`.
- Zsh: `echo =====` kaataa komennon; git grep ilman --include-lippuja. Turvatarkistus estää `rm -f $S/*`: älä kierrä.
