# Valosepän luovutus 7.11.2026. Itsenäinen: vanhoja ei tarvitse lukea

Syy: konteksti yli 30 %, luonteva tauko (film1 ajossa). Tili vvi@vvi.fi. Natiivirepo `/Users/Shared/Claude/proto-3d/Matkakirja-proto`, etä `natiivi-backup`, worktree k31 = `/Users/Shared/Claude/wt/proto-linssiseppa2-k31`. Levy 17 Gi: ei uusia worktreitä, käytä k31:tä. Kuvat vain JU:n vuorolla (`local_06f8c680-4618-42bd-a730-9b6a3e17e0b7`). Kansio `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/pallon-osat/`.

## 1. TYÖ NYT: PALLON OSAT PARIISIN KARTALLE (omistajan kortti 11.52, PT 12.1x)
Lue suunnitelma kokonaan: `/Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261107-pallon-elama-kartalle.md`.
Sinulle järjestyksessä: 1 filmiviimeistely, 2 terävöitys ja reunat, 3 pilvien varjot. Oma haara ja kytkimet, EI JUNAAN. Puolipilvinen päivä kiinni, taivas ei vaihdu, sumu ei vaihdu, kartan lepo säilyy. Ei Cesiumin tilausta vaativia osia. Mac-kuvat JU:n vuorolla suunnitelman näyttötavalla KK:lle (parit samasta kohdasta suoraan ylhäältä, 45°, 70°, 85° ja lähin taso; liikkeestä ruutusarja, ei videota omistajalle); sha ja rivi PT:lle kohta kerrallaan. Muisti lopuksi, ei nyt. Kerrottava kuvien kanssa: rae ei ehkä sovi paperityyliin, omistaja pyysi sen, siksi pari.

Haara `linssiseppa2/kartta-filmi`, k31, pohja juna-220 84deb0978 (kivet eivät mukana). Koodi `Assets/Matkakirja/Kartta/KarttaFilmi.cs`, `KarttaRaePassi.cs`, `Resources/KarttaRae.shader`, komento `karttafilmi 0|1|oletus|nolla|tila|(parametri arvo)`; parametrit rae, varjo, keski, savy, saturaatio, hehku, kynnys, vinjetti, terava. Oletuksena pois. Kääntötarkistus `sh Linssit-testit/unity-tarkistus.sh` 0 virhettä, `sh Kartta-testit/kaanna.sh PariisiKallistus` 21/21.

**A. Kohta 1, bf2c4902d: JU AJAA film1 L2:lla (alkoi 12.21), loki `lokit/linssiseppa2-film1-bf2c4902d`, skenaario `sk-film1.txt`, 19 kuvaa. JU kuittaa.** Luo vahti: jono `/Users/Shared/Claude/julkaisija-tyokalut/jono-20261103-ilta.txt`, grep film1. Katso kaikki kuvat ja tarkista:
- Nollatesti: `f1-nt-pois` ja `f1-nt-nolla` pitää olla pikselilleen samat (jälkikäsittely päällä, arvot nolla). Jos ei: oletusprofiilista (Assets/Settings/DefaultVolumeProfile, Valo/Perus) tulee jotain karttaan, korjaa ennen paria.
- Rae pysähtyy: `f1-lepo-1` ja `-2` samat; `pallo lepo` -rivit lokissa (skenaarion lopussa kerros auto): lepo ei saa muuttua filmin takia. Tämä testaa myös ElavaKerroksen KAAPPAUS/KERROS-polun.
- Liike `f1-liike-1..3`: rae vaihtuu, ei väitettä enempää. Tarkista, ehtikö kamera liikkua kuvien aikana.
- Hehku: kynnys 1,0 ei ehkä näy paperikartalla (arvot ≤ 1); `f1-lahin-kynnys08` vertailuna. Rae `f1-lahin-rae018` vertailuna.
- Lokista: "karttafilmi", "Shader error", Filmipinon sammutus ei koske tähän (varmistetaan joka kehys).
Arvot ovat kaupungin valokuvanäkymän: säädä kartan paperiin komennoilla, rakentamatta uutta. Parit KK:lle (Viesti KK:lle: `local_37f7c945-e1a0-4638-90b8-93c389a36fbe` vain kuvaparit tästä erästä suunnitelman mukaan; tarkista PT:n sanat "näyttötavalla KK:lle"), sha ja rivi PT:lle.

**B. Kohta 2, f9f4eb9fe (pushattu, ei ajettu): `karttafilmi terava <0..1>`,** KaupunkiTerava-varjostin omana passina ennen raetta; kuumana pois. Seuraava ajo film2 kohdan 1 jälkeen samoista kohdista (terava 0,5 ja arvio). Tarkista STP: renderScale ja MSAA tulevat Laatutasosta/Ruudunpaivityksestä (Ultra MSAA 4), joten niitä ei kosketa, ellei kuva näytä tarvetta. Sumu EI.

**C. Kohta 3 pilvien varjot, aloittamatta. PT 12.2x: kyllä, VAIN pilvien varjot; ilmaperspektiivi jää pois usvan takia, kirjaa se KK:n kuvarivillä. Syvyyskuvan hinta (muisti ja piirto) raporttiin koodista luettuna, koska kartta on jo muistirajalla; mittaus lopuksi. EHTO: 2 s:n askel ei saa estää PallonLepoa, ja lepo on näytettävä (`pallo lepo` -rivit lokista).** Shader Graphia ei tarvita, jos koko ruudun passi syvyyskuvasta. Suunnitelma: passi ennen jälkikäsittelyä, sekä pääkameralle että ElavaKameralle (OnKartanKamera), askel kartan piirtotahdissa: PAIKALLAAN piirtää joka 20. kehys 10 fps:llä eli 2 s välein, joten varjo etenee ilman lisäpiirtoa. Ei Animoi-rekisteröintiä. Kaupungin koodi `Linssit/Unity/KaupunkiIlmakeha.cs` on Assembly-CSharpissa, Kartta ei näe sitä; kopioi kaava (VarjoVoima 0,45, PilviJaksoM 30000), Pilvisyys 0,45, ei kuuroa eikä sadetta. Taivas ei vaihdu.

## 2. MUUT ODOTUKSET
Kivet: PT 12.1x: dc4b1c69c EI ole junassa ennen iPad-ajoa julkaistulla koodilla (LAV seina-ipad JU:lla, seinän rungon katoaminen); JU peruu poiminnan (tehty e4ed1c5e6). Jos vika tulee kivistä, omistaja saa uuden kortin. Sinulle ei toimia.
kivisivu14 valmis ja kuitattu: iso iPad, huippu 4582 Mt vs. 4602 (-20), raja 4080 ylittyi, vapaa pienin 537; luvut `_tyo/linssiseppa2/kivisivu/MITTAUS.md`. Sininen suorakaide botti-4:ssä LAV:lla.
Usva 02516c056: kuuluu KS:n koko Pariisin kuvauksiin (omistaja 12.09), ei omaa ajoa. Yhteinen-49 on JU:n jonossa (12.12). Kun kuva on katsottu: 2 riviä PT:lle. Vertailukuva KK:n scratchpad/keskustelukanava/kuvat/usva-12-16/usva-12-vasen-16-oikea-1000.jpg.
KS:n kuittauspyynnöt (_ValoMuoto, Jousi-rajat) tehty. Neliöselvitys peruttu, muisti ei minulle, tumma kolmio LAV, rappaus 2e1d2b87d PT:llä.

## TEKNIIKKA
Numpy, cv2 `/Users/Shared/Claude/proto-3d/_tyo/venv-rembg/bin/python -I`; PIL `/opt/homebrew/bin/python3`. `sh`, ei zsh: kaanna.sh ja unity-tarkistus.sh. zsh: `$C:A` on muunnin, käytä `${C}`; `===` kaatuu; `git grep` älä aja koko jonokansioon. Kuvat 2732×2048 png: pienennä sips -Z 1500 scratchpadiin ennen katsomista. **Ei pkill -f:ää: tapot vain omilla PID:illä (rikoin tämän 12.1x kuviolla yhteinen-49.*julkaisija-tyokalut, JU:n ajo säilyi; kuvio kerrottu PT:lle, JU voi tarkistaa).** Ajokuvaus JU:lle: ESIKATSELU_PISTEKERROIN=0.465, kooksi ipad. Seuraamattomat `.claude/settings.local.json.ennen-kevennysta` ja `waveletNoiseTile.bin`: ei koskettu. Kotihaara jäljessä: luovutus plumbingilla origin/main-pohjalta.
