# Valosepän luovutus 4.11.2026 klo 06.13

Syy: konteksti 26 % (pehmeä raja, Raamattu 7.37). Edellinen: viesti-valoseppa-luovutus-20261104-0537.md (lue Työkalut ja kohta 4). Loki: /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md. Tulokset: _tyo/linssiseppa2/pariisi-tyyli/k38/TULOS.md, k39/TULOS.md, k36/TULOS.md.

## SITOO: omistaja 06.01, PT 06.08
Pariisi jatkuu yhd3:n suunnalla; pinta ja juna eivät hyväksyttyjä. Seuraavaksi puut, talot, reunat, Sacré-Cœur ja nopeus. **VS:lle talot, reunat ja Sacré-Cœur.** Joki vasta Pariisin jälkeen.
Kysytty PT:ltä 06.08: mikä VS:n osa Sacré-Cœurissa on (metsä ja kuva ovat KS:n k8). Oletus, jos ei vastausta: katso yhd5:n y-montmartre, korjaa vain pohja kuvan ympärillä.

## Tila (haarat natiivi-backup, wt /Users/Shared/Claude/wt/proto-linssiseppa2-k30, nyt haarassa pariisi-k39-koe; ei junaan)
- **k38 6217915a0** (pariisi-k38, p38, 614/614): Austerlitzin halli z14–15, reunaviiva, vain nimetty halli. PT kuittasi 05.46 seuraavaan yhdistelmään; z13-arvio KK:lle PT:n kautta. Ei laitteella. Sisältää k37 + kiilan.
- **k39 399cd0b79** (pariisi-k39-koe, k38:n päällä): KOE z16–17 Codexin arkeista. EI pelattava (arkki vain k39/pinnat-kopiossa), EI yhdistelmään. Ei vielä lähetetty KK:lle arvioitavaksi; pari k39/pari-z17.jpg, rivi PT:lle lähtee tämän luovutuksen kanssa.
- **yhd5 8dee95d57** (JU; yhd4 + Sacré-Cœur k8 + ND-kiila + k37 + KS Plantes v5): kuvia ei vielä 06.12; JU: lokit/julkaisija-yhd5-iso-8dee95d57, mvt-palat k36/mvt-laite. Lisäksi `elavakartta pariisi 1` alussa (KS): vertaa sen mukaan. Oma taustavahti kuolee nollauksessa: odota JU:n riviä tai tarkista kansio.

## Seuraavaksi
1. **yhd5-kuvat täysikokoisina:** k35 Z16 (y-tuileries, z16-sentier), École militaire (y-eiffel, ecole-*; palat: python3 -I k36/pisteet.py <data> nimi:x,y), Jussieu, Pitié, Luxembourg, Petit Palais, Montmartre, JdP, r-0-21 + paluu. **Kohdista Louvren etelälaita ja Cité iPad-rajauksiin** (PT 06.0x; syyt k36/TULOS.md) ja ehdota korjaus. Rivi PT:lle.
2. **Talot, z ≤ 15:** mitattu 06.10 (k39/profiili.py): katon väri ja L etäisyytenä kadusta ovat 2029:n tasolla (d 1–9 px), joten säätö ei auta. Ero on rakenteessa: talorivit eivät seuraa katuja, kerma 14,1 | 2029 18,4; laaja k-laaja on z13-pala 2,9× suurennettuna (terävyys 33,7 | 60). KK 02.22: rivit katujen suuntaan odottivat arkkeja, ja arkit KK 02.55 koskevat vain z16–17:ää, joten z ≤ 15 tarvitsee KK:n linjan. TeeTalotuksessa on jo lähin katusegmentti pikselille, jos rivit tehdään. Materiaali on kiertämätön ja suunnaltaan sekava: pelkkä kierto ei tee rivejä.
3. **Talot, z16–17 (KK 02.55/1–3):** k39 näyttää suunnan, päävika: minor-kadut leikkaavat taloja, kerma 24–25 | 14,3. Seuraava koe: minor pois tai vain arkin kujat, talo katkeaa kadun reunaan. Sitten saumaton arkki (k28/tee-materiaali.py-tapa), arkki kaupunginosittain, muisti laitteelta, tasoraja z15 | z16. Ei uusia ottoja ennen karttakoetta.
4. **Reunat:** länsiraja ReunaM 1200 → noin 2400 tai loivempi käyrä, muisti mitattava (sovittu NS:n kanssa; muoto ennen leveyttä); vesirajan portaat (k33/portaat-z15-6x.jpg); Louvren etelälaita ja Cité kohdasta 1. NS tekee rivin 168 ja suoran häivytyksen: tarkista NS:n haara ennen kuin kosket häivytykseen.
5. Edellisen luovutuksen kohdat: KS:n kiilapari vain pyydettäessä; yhdistelmä vain PT:n käskystä. Joki Pariisin jälkeen; PK:n tausta muuri-koe/TULOS.md ja silta/ajo/ (z132 joki 100,97,91, lattia 198,188,176; `valo joki 0` poistaa myös uoman; _Uoma 1 fresnel -hypoteesi ei testattu).
6. Muita lista-avoimia: k32 (sora), raiteet z ≤ 14, kadut hieman keltaiset (yhd2/15).

## Työkalut
k38/aja.zsh <wt> <ulos> <z> [alue] (k23:n raivaus, sama kuin k36-z15.jpg:n pohja; HUOM aja-oma ilman oikeaa jsonia ajaa ilman raivausta, ja se näyttää erona Citéllä ja Les Hallesissa). k39/aja.zsh <wt> <arkki> <ulos> <z> <alue>, k39/parit.py, k39/koe-patch.py, k39/profiili.py. Arkit _tyo/codex/pariisi-materiaali-20261104/, KK:n kohdat lista rivit 408–413. Data: k22/data-lisa (7 palaa), k23/data-paikka (z13 + 4 z14-palaa).

## LISÄYS 06.15 (SITOO, ohittaa ylemmän)
- **k38 nyt ee3743d64** (p38b, 614/614; KK, PT 06.09): hallin viiva peitto 0,5, pari k38/pari-z15-3x-05.jpg katsottu. Seuraavaan yhdistelmään; z13 EI muutu (KK). k39 on yhä vanhan k38:n päällä.
- **Louvren etelälaitaa ei hiota nyt** (PT 06.09): KS:n ja Codexin nähtävyyskoe (ND, Louvre) korvaa osin. Kohdasta 1 ja 4 pois; Cité ja École yhä katsotaan.
- **Sacré-Cœur on KS:n** (PT 06.1x, jako oli PT:n virhe): VS:lle vain pohja kuvan ympärillä, kun yhd5:n y-montmartre näkyy.
- Talot ja reunat kuten kohdissa 2–4; ei uutta yhdistelmää ilman käskyä.
