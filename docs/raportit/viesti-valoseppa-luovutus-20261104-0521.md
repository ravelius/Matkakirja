# Valosepän luovutus 4.11.2026

Syy: konteksti yli pehmeän rajan, tauko JU:n ajoa odottaessa. Edellinen: viesti-valoseppa-luovutus-20261104-0502.md (a6c, k33-kansion työkalut). Loki: /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md. Tulokset: _tyo/linssiseppa2/pariisi-tyyli/k36/TULOS.md. Lista: lokit/kk-peli-a94d8e7fb-20261103/KORJAUSLISTA.md, osio k36 (lue kokonaan).

## Tila
- **k36 26b4a139a** (linssiseppa2/pariisi-k36, natiivi-backup, wt /Users/Shared/Claude/wt/proto-linssiseppa2-k30, p36c, 614/614) = k35 57591bff9 + isot katot ≥ 8 000 m² vain Luxembourg, Palais-Royal, Petit Palais + laitosten sisäpihat eivät aukioita (irrotettava ad63286ab). KK 05.20: seuraavaan iPad-ajoon, ei aamun kuvaan, ei junaan, pinta ei hyväksytty. Paikallinen Z13–16 katsottu, laite ei.
- **JU:n jonossa** k36/sk-k36.txt (11 kuvaa, iPad, yksi ajo myös k35 Z16:lle ja École militairelle). pariisi.json ei muuttunut, samat 28 kuvaa. JU kopioi lisäksi pelin välimuistista elava/mvt/14/8296/5636.pbf ja 5637.pbf → k36/mvt-laite/. Ei hakuja verkosta (PT 04.15).
- a6c11c1d2 on yhä KK:n aamun kuva. Uutta yhdistelmää ei ilman PT:n käskyä.

## Seuraavaksi
1. Kun JU:n kuvat tulevat: katso täysikokoisina (y-tuileries, z16-sentier: juovat; y-eiffel, ecole-*: École militaire; jussieu, pitie; luxembourg, Petit Palais y-plantes/kartta). Palat k36/mvt-laite: `python3 -I k36/pisteet.py <data> nimi:x,y` kertoo, mikä tekee École militairen vaaleaksi (kuvakoordinaatit paikallisen Z15:n origosta 16594,11270). Rivi PT:lle.
2. Seuraava kierros, ei este (KK 05.20/3): Austerlitzin reunaviiva z ≤ 15, halli sulaa koilliskulmassa katuun; vaalea tulee ratapihan avoimesta (avoinM, landuse railway), ei isosta katosta. Harjaviivat vain, jos näkyvät.
3. Listan kohta 6 z16–17-materiaalikokeeseen, ei nyt: kapeat suikaleet täytössä Pitién kappelin ympärillä, 2500–4500 m²:n katot.
4. Edellisen luovutuksen kohdat 2–5 yhä auki (ND:n kermakiila ja Louvren etelälaita KS:lla; raiteet, k32, länsiraja; portaat; 0,004:n kuvat). KS ei ole vastannut jakoehdotukseeni 05.0x; en koskenut KS:n alueeseen.

## Työkalut (k36/)
pisteet.py (mitä MVT:ssä on pisteessä), sk-k36.txt, k35-z*.jpg ja k36-z*.jpg parien pohjana. Vertailu vanhaan: tilapäinen `git worktree add --detach` wt-kansioon + `sh <wt>/Kartta-testit/kaanna.sh ElavaKoe`; ELAVA_PINNAT pidä k30-wt:stä. Data: k22/data-lisa (Z15–16), k23/data-paikka (Z13). Palaa 8296 ei ole koneella, joten paikallisessa kuvassa lon < 2,3071 on mustaa.
