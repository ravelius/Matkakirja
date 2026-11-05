# Valosepän luovutus 5.11.2026 klo 21.55

Korvaa luovutuksen -2127. Mitat ja lähteet -2057:ssä. Pariisin valokokeet yhä seis (-1934).

## OMISTAJAN PÄÄTÖS 21.49 (KK:n välittämä)
Kolme kohdetta jäävät Pariisiin oikeissa mitoissa; vain tärkeimmät nähtävyydet on liioiteltu, ja viat korjataan. Ei töitä Lontoosta. Älä skaalaa. Ei junaan.

KK:n tavoite: kohteet näyttävät kuuluvan kartalle eivätkä keskeneräisiltä. Kuvat KK:lle ennen omistajaa. Ennen sanaa "valmis" liike on katsottava itse, ettei välkyntää ole.

## TILA
Koodi 9bb7dabd7, haara `linssiseppa2/ohjelmakohteet`, natiivi-backup, worktree /Users/Shared/Claude/wt/proto-linssiseppa2-k30. Päällä Karttasepän df2c647bf (yhdistetty 92fa192ff). Geometriatestit läpi (Mitat ja Holvit), unity-tarkistus 0 virhettä ennen viimeistä värimuutosta (kannen reunakivi), valovahti 0 osumaa OhjelmaKohde.shaderissa. Koko Kartta-testejä ei ajettu tämän jälkeen. EI AJETTU Macilla: tehoa ei ole nähty.

Tehty:
- Pont Neufin tummat kiilat: holvit työntyivät rantamuurin läpi 4–7 m. Rajattu muurin sisään (`RantaX`, testi `PontNeufinHolvitPysyvatRantamuurinSisalla`).
- Mustat pisteet ja katkoviiva: alle pikselin levyiset lähes mustat lyhdyt ja käsijohteet. Pelti ja Valurauta keskitummiksi, Pont Alexandre III:n käsijohteen kultaraita pois.
- Pont Alexandre III:n kansi: rytmi kaistoittain, reunakivi ilman päällekkäisiä tasoja, lyhdyt 8,4 m välein ja suuremmat (noin 6 m, kultainen jalusta ja huippu, kolme palloa), päätyjen aukot SiltaTumma.
- Hôtel de Villen ikkunat: Lasi 0x76828E, jakopuut pois.
- Oletuksena kartalla: `OhjelmaKohteet.Paalla = true`, `ohjelmakohteet 0` ottaa pois.
- Valovärit: `Valopohja.NahtavyysValo`, kuten NotreDameKirkko.

Offline-esikatselu näytti hyvältä mutta ei kerro välkynnästä eikä rakeilusta.

## SEURAAVAKSI
1. JU:lle on pyydetty vuoro (21.55). Odota viestiä "ESIKATSELU NYT". Aja taustalla: `PROTO_LINJA=<JU:n linja> ESIKATSELU_PISTEKERROIN=0.465 zsh /Users/Shared/Claude/wt/proto-linssiseppa2-k30/tyokalut/esikatselu.sh 9bb7dabd7 /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/ohjelmakohteet/sk-korjaukset.txt`. Ilmoita JU:lle LUKKO VAPAA, kesto ja kuvamäärä heti, ennen kuvien katsomista.
2. Katso kuudesta kuvasta täysikokoiset rajaukset ×2 NEAREST. Skriptin kameran paikat ovat uudet, joten rajaa kuvan mukaan; vanha rajaa.py ei ole tallessa.
3. Liike: skriptissä on `tallenne-alku liike-pa3 15 1376`, `komento kierra 40`, `tallenne-loppu`. Tätä tallennetta ei ole koskaan ajettu kartalla: tarkista lokista, että ruudut syntyivät ja kamera liikkui. Jos ei, kerro se, älä sano valmiiksi. Katso ruudut peräkkäin julkisivun, kannen ja lyhtyjen välkkymisen varalta. Koske vain Pont Alexandre III:een, joten Hôtel de Villen ja Pont Neufin liikettä se ei kata; lisää ne samaan ajoon vain jos KK pyytää.
4. Mustat pinnat: kuvassa hdv-110 näkyy Notre-Dame. Karttasepän seuraaja kertoo myös tuloksensa (minun 9be47cc74, KS:n df2c647bf). Jos Notre-Dame, puut tai pyramidit ovat mustia, korjaa.
5. Tarkista myös Pont Neufin ja Pont Alexandre III:n päiden rantamuuri: kiilan poiston jälkeen näkyy 14 m:n ja 9 m:n vaalea seinä kadun päässä, koska kartan pinta on y = 0. Ei KK:n listalla; jos näyttää oudolta, kerro KK:lle, älä korjaa kysymättä.
6. Kuvat KK:lle (local_231e4bad-b9fe-41b8-8b45-02e35c45ebbe), rivi PT:lle: mitä, sha, polku. Kerro kuvista näkyvät viat, älä leikkaa niitä.

## KK:LLE KERROTTU
Pont Neufin nimi sillan alla ja Grand Palais'n peittämä sillan pää kuuluvat Karttasepälle (Nimikerros.cs, Nahtavyysalue.cs). En koske.

## MUUTA
- Vahtiosumat NotreDameKirkko.shaderissa korjattu 9be47cc74, KS otti ne. Komento.cs:n ja Nahtavyysalue.cs:n vari-osumat ovat KS:n.
- Lokin ArgumentOutOfRangeException noin minuutti ennen kohteita on Unity-editorin hakuindeksi (KK), ei selvitettävää.
- Ajon cffdccab9 kuvat: /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/ohjelmakohteet/kuvat/2213-cffdccab9/ ja lokit/esikatselu-20261105-213551. Omistaja on nähnyt ne.
- Seuraamattomat .claude/settings.local.json.ennen-kevennysta ja waveletNoiseTile.bin: en koskenut.
