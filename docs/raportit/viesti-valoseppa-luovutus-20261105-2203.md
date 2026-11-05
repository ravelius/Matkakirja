# Valosepän luovutus 5.11.2026 klo 22.03

Korvaa luovutuksen -2155 kohdat TILA ja SEURAAVAKSI. Lue -2155:stä OMISTAJAN PÄÄTÖS, tehdyt korjaukset ja MUUTA (git show e8785dc8c:docs/raportit/viesti-valoseppa-luovutus-20261105-2155.md).

## TILA
Koodi f2c1e8017, haara `linssiseppa2/ohjelmakohteet`, natiivi-backup, worktree /Users/Shared/Claude/wt/proto-linssiseppa2-k30. Ei junaan. Kuvia EI ole lähetetty KK:lle: ajon 9bb7dabd7 kuvat eivät kelpaa (alla). f2c1e8017:n varjostinmuutosta ei ole nähty ajossa; varjostinta ei käännetä unity-tarkistuksessa.

## AJO 9bb7dabd7 (L1, 224 s; lokit/esikatselu-20261105-215603; LUKKO VAPAA ilmoitettu JU:lle, viesti jonossa)
Näkyi:
- Pont Neufin tummat kiilat ovat poissa. Tilalla vaalea rantamuuri varren päässä; näyttää kelvolliselta.
- Pont Alexandre III: lyhdyt ja kannen rytmi näkyvät, kultaiset yksityiskohdat erottuvat.
- Kohteet tulivat näkyviin ilman komentoa.
- Notre-Dame, puut, Louvre: ei mustia pintoja kuvissa pn-0, pn-118, hdv-270 (minun 9be47cc74 toimii). Pyramidit näkyvät kuvassa pn-118 kunnossa.

Vielä vikana:
- Pont Alexandre III:n kaiteen vierellä mustia viivoja (pa3-94). Syy: syvyyslisäys veti kaiteen takana olevat ulkokoristeet sen eteen. Korjaus f2c1e8017: lisäys vain kameraan päin oleville pinnoille. Varmista uudesta ajosta. Pont Neufissa on yhä yksittäisiä tummia pikseleitä (pn-0); katso, poistiko sama korjaus nekin.

Ei arvioitu, omia skriptivirheitäni:
- Liike: `kierra 40` ilman kestoa heitti IndexOutOfRangeException (Komennot.Aja), joten kamera ei liikkunut koko tallenteessa. Skriptissä nyt `kierra 40 1`.
- Hôtel de Ville: tallenne-loppu jätti pelin ruuduksi 321×531, joten hdv-110 ja hdv-270 ovat loitolla ja rakeisia. Ikkunoista ei voi sanoa mitään. Tallenteet nyt skriptin lopussa. Kuvissa näkynyt kartan tyhjä kiila johtunee samasta ruudusta; jos se näkyy uudessa ajossa, kerro KS:lle.

Pont Alexandre III:n nimi on sillan päällä kuten Pont Neufin: KS:n asia, kerro KK:lle samalla, kun viet kuvat.

## SEURAAVAKSI
1. Pyydä JU:lta uusi vuoro (local_b4a7e82a-2522-437f-84ff-813401120931). Rivi: "Ratkaisee: poistuivatko mustat viivat ja ikkunat (f2c1e8017), ja välkkyykö liike; edellisen ajon liike ja Hôtel de Ville jäivät skriptivirheen takia näkemättä. 6 kuvaa ja kaksi tallennetta, noin 5 min, pistekerroin 0.465, sk-korjaukset.txt." Aja taustalla JU:n linjalla: `PROTO_LINJA=<linja> ESIKATSELU_PISTEKERROIN=0.465 zsh /Users/Shared/Claude/wt/proto-linssiseppa2-k30/tyokalut/esikatselu.sh f2c1e8017 /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/ohjelmakohteet/sk-korjaukset.txt`. Lopuksi JU:lle heti LUKKO VAPAA, kesto, kuvamäärä ja rivi, näkyykö "pistekerroin 0.465" lokissa. Ajokansio on ajon tulosteen viimeisellä rivillä, ei uusin kansio lokit/-hakemistossa.
2. Rajaukset täysikoosta ×2–×4 NEAREST. Kameran paikka vaihtelee: katso ensin pienennetty arkki kuudesta kuvasta, sitten rajaa kohde. Viime ajossa kohteet olivat kuvan keskellä noin (1365, 950).
3. Liike: ruudut k-NNNNNN.jpg kansioissa liike-pa3 ja liike-hdv-pn (kamera.txt: tarkista, että paikka TAI kierto muuttuu; viime ajossa kaikki rivit samat). Rajaa kohde peräkkäisistä ruuduista arkille ja katso. `odota-peli` on tässä skriptissä ensikäyttö, ja toinen tallenne alkaa pienestä ruudusta: jos jompikumpi epäonnistuu, kerro se. Älä sano valmiiksi ilman nähtyä liikettä.
4. Korjaa, mitä kuvista löytyy, ja tee korjaukset samaan ajoon. Kuvat KK:lle (local_231e4bad-b9fe-41b8-8b45-02e35c45ebbe), rivi PT:lle: mitä, sha, polku. Kerro näkyvät viat, älä leikkaa niitä.

## MUUTA
Tarkista, ehtiikö Karttasepän seuraaja kysyä mustien pintojen tuloksesta: tulos on yllä.
