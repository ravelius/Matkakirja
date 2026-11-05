# Valosepän luovutus 6.11.2026 klo 00.25

Korvaa luovutuksen -2356. Syy nollaukseen: konteksti pehmeällä rajalla.

## TILA
Koodi e7c639217, haara `linssiseppa2/ohjelmakohteet`, viety natiivi-backupiin (ei origin), worktree /Users/Shared/Claude/wt/proto-linssiseppa2-k30. Ei junaan. Geometriatestit läpi; Unityssä EI käännetty eikä ajettu. OhjelmaKohteet.cs ei ole testikäännöksessä.
JU:lta pyydetty vuoro 00.2x (viesti Julkaisijalle): e7c639217, `sk-madeleine.txt`, 7 kuvaa.

Tehty KK:n 23.56 kohdat:
1. SILLAN PÄÄ: `Rakentaja.Lasku`, asemat `LaskuAsema`. Joen ulkopuolella kansi laskee kartan pintaan ja kapenee kadun levyiseksi (`LaskuKapea`), kärjen väri `KatuKartta` 0x92866D (mitattu s-et:stä, 159,142,110). Pituudet `a/laskut.py`: 3,5 × kansi joen reunasta kärkeen, talo tiellä lyhentää, vähintään 2,5 × kansi; rivit `LaskuA/LaskuB` sillat-taulu.txt:ssä. Pont Neuf ja Pont Alexandre III omilla pituuksillaan. Varjo: `VarjonRajat` jättää alle 2 m:n kärjet pois.
   OMA RATKAISU, kerro KK:lle: Pont Neufin varret ovat saarella 39–55 m:n päässä toisistaan. Kaksi laskua olisi tehnyt väliin kuopan, joten yhdysosa kulkee saaren yli kannen tasossa (14 m). Syntyy 14 m:n seinät saarelle; katso p-pn ja p-pn2. Jos näyttää huonolta: `PontNeufVarsi.Yhdysosa` pois ja laskut saaren päihin.
   Ei tarkistettu: lyhyimmät laskut (Marie +x, Tournelle, Notre-Dame +x, Archevêché +x) voivat mennä kartan talon päälle tai olla jyrkkiä.
2. NIMI: sillat jonoon 2994, sama tapa kuin talot 30e34cc9e; Nimikerros 2995 piirtyy päälle. Varjo 2993, koska varjon materiaali piirtyy syvyydestä välittämättä (lue Symbolimalli-materiaalin ZTest varmuudeksi, jos varjo näyttää väärältä). Hôtel de Ville ja Madeleine jäivät jonoon 3080. Ei nähty.
3. KAIDE: Pont Neufista puuttui kaiteen sisäpinta (kaide ja pään kaide); tummien pisteiden arvioitu syy on valaisematon tausta. Puolikuiden sahalaita on oikea muoto. Ei nähty.
Pont au Double: ei selvitetty.

MADELEINE (`OhjelmaKohdeRakennukset.cs`, uusi, .meta mukana; kohde listassa): viitekuvat katsottu. Mittaristiriita ratkaistu: 129 m sisältää portaat (etu 13 m, taka 14 m), runko 102 m. Madeleine-0:sta koroke 6 m + harja 30 m = 36 m kadulta, joten OSM 36 ja fr.wp 30 ovat molemmat oikein. 52 pylvästä, väli 5,37 m. Offline-kuvat a/oma/madeleine-k12-340.png ja -k45-300.png näyttävät oikealta temppeliltä; suuri katto on tasainen harmaa.

## SEURAAVAKSI
1. Odota JU:n ESIKATSELU NYT ja linjaa. Aja taustalla: `PROTO_LINJA=<linja> ESIKATSELU_PISTEKERROIN=0.465 zsh /Users/Shared/Claude/wt/proto-linssiseppa2-k30/tyokalut/esikatselu.sh e7c639217 /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/ohjelmakohteet/sk-madeleine.txt`. Heti lopuksi JU:lle LUKKO VAPAA, linja, kesto, kuvamäärä. Jos Unity ei käännä, syy on OhjelmaKohteet.cs (`Jono`, `VarjonRajat`) tai uusi tiedosto.
2. Katso kuvat täysikoossa: m-etu, m-sivu, p-et (nimi kokonaan?), p-pn, p-pn2, p-con, p-pa3. `grep "pitkä ruutu" unity.log`: bdc211ab8 todistetaan tästä (ennen 63 ja 59 ms, "luotu" 2 kertaa). Nyt 23 verkkoa.
3. Kuvat KK:lle (Madeleinen hyväksyntä, sillan päät, yhdysosa), kopio PT:lle.
4. Sitten Palais Bourbon (relation/1019368, jäsenet haettava `lisaTiet`), Pompidou, Tour Saint-Jacques, Saint-Eustache, Saint-Sulpice. Ensin kuvat: `python3 -I a/hae-viite.py listaa <kohde>`, `hae <kohde> <i> ...`. Mitat -2340, kohta AINEISTO OSALLE A. Rakentaja: `OhjelmaKohdeRakennukset.cs`; testit ja kuva `sh aja-geometria.sh`, `python3 esikatsele.py obj <tulos> <nimi> 45 300 1100`.
Sillat ohjelmassa: OhjelmaKohdeSillat.cs kirjoitetaan `a/tee-sillat-cs.py`:llä, muokkaa sitä. Muut siltojen yksityiskohdat vasta rakennusten jälkeen (-2340 kohta 5).

## MUUTA
Seuraamattomat .claude/settings.local.json.ennen-kevennysta ja waveletNoiseTile.bin: en koskenut. Työlistahookin Pariisi-rivit eivät ole Valosepän.
