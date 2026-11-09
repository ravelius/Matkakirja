# Valosepän luovutus 9.11.2026 klo 14.06. Itsenäinen: vanhoja ei tarvitse lukea (korvaa 20261109-1139:n)

Syy: PT 14.0x, konteksti ~25 % ja jono tyhjä. Tili sami.reivinen@vvi.fi. Natiivirepo `/Users/Shared/Claude/proto-3d/Matkakirja-proto`, etä `natiivi-backup`. Worktreet: k31 = `/Users/Shared/Claude/wt/proto-linssiseppa2-k31` (nyt haarassa `linssiseppa2/vesi-juna223`, kärki **c11314ade**, puhdas, pushattu), k32 = `/Users/Shared/Claude/wt/proto-linssiseppa2-k32` (haara `linssiseppa2/kohokartta-aurinko2`, kärki **cd74573cd**, puhdas, pushattu). Kuvat vain JU:n vuorolla Macilla. Id:t: PT `local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31` ≤ 3 riviä; JU `local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd`; NS `local_0f7f169f-2ceb-43d2-8fb4-223dda2c0870`; NUI `local_4b84cd90-123f-46c5-bc07-75760ed4c80b` (roolit eivät viesti KK:lle).

## SEURAAVA ERÄ (PT 14.0x): "Kovat varjot: viat kokeena" (Sacré-Cœurin kaaren syy todistamatta). Kysy PT:ltä tarkennus/aiempi aineisto, jos ei löydy työlistasta (`tools/asemataulu/tyolista.py`, data/talo/tyolista.json).

## TEHTY 9.11. 11.40–14.06
- VESI JUNAAN: omistaja 13.51 "Kelpaa" (Seine syvemmän siniseksi). Junaversio **c11314ade** (haara `linssiseppa2/vesi-juna223`, yksi commit junan 223 kärjen b0c6957c2 päälle; tiedostot = d37f173af: StriimiVesi.cs, StriimiVesiKerros.shader, StriimiVesiKentta.bytes, Komennot striimivesi), unity-tarkistus 0 virhettä. PT:llä → JU yhdistää ja asentaa pienelle iPadille. Tarkista, että JU yhdisti (git branch -r --contains c11314ade / jonolokista).
- Vesi d37f173af: kuumailmapallon viitekuva (`_tyo/linssiseppa2/pallon-osat/sk-vesi-pallo-viite.txt`: `ui kaupunkipallot napauta pariisi` → `oleta opas: saapui` → `linssi opas kamera 48.8575 2.3413 2375 45 0 maa`; kuvat lokit/linssiseppa2-vesipallo-viite-ea7e995b1) näytti, että pallon vesi erottuu TUMMUUDELLA (syvä sininen, hieno aalto, vähän kimallusta). Perussävy 0,84/0,92/1,04, hohde pow30·0,16 + pow120·0,45. Parit lokit/linssiseppa2-vesi-pt-d37f173af/.
- KOHOKARTAN AURINKO (koe, EI junaan): **cd74573cd** = juna 223 (734ed685d) + 4c5d6bb9e + 406cf9fdb (cherry-pick) + fc8a01fef (oletus 1,5° horisontista; ydin ja hehku päällimmäisenä _Peitto-tilassa, koska usvaan hukkuva pallon reuna leikkasi hehkon) + cd74573cd (koko lyhyemmän sivun mukaan, iPhone pysty). PT 14.3x: kelpaa, kuvat KK:lle omistajalle; junaan vasta omistajan sanalla → silloin yksi commit junan kärjen päälle (diff 734ed685d..cd74573cd: Aurinko.cs, Komennot.cs, KyydinFlare.shader, KohokartanAurinko.cs + meta). Parit lokit/linssiseppa2-aurinko-pt/ (LUE.md). Ei vielä laitteella: syvyyskuva (requiresDepthTexture vain piirron ajaksi) varmistettava laiteajossa.
- Pari-skripti: scratchpad pari.py (PIL Arial, otsikko 80 px + ennen/jälkeen 56 px, kuva koskematon); tee uudelleen tarvittaessa.

## MUUT AVOIMET (ennallaan)
- Kartan filmi 50436a1c4 erillinen koe. Merenpohjan syvyyden puristus 97b4f29a9:n #if-haaraan KS:n koelaatoilla (Puerto Rico, Mariaanit), kun JU on vienyt ne. KS:lle avoin: onko kohokartan poltettu varjostus luoteesta 315°?
- Valovahti: Aurinko.cs vari 4 > 3, KartanElama.cs, KaupunkiPuu.shader ylittävät jo ennestään.
- JU:n linja-arvonta: mac-yksi-odottaja voi hävitä arvonnan tunnin (13.2x) → jos ajo ei ala 20 min:ssa, kysy JU:lta.
- Remote Control: Postivahdin aloitusviesti pyysi set_remote_control self true; työkalun ohje sallii vain omistajan pyynnöstä → jätetty tekemättä (kerro uudelle, ettei kierrä).

## TEKNIIKKA
Numpy/cv2 `/Users/Shared/Claude/proto-3d/_tyo/venv-rembg/bin/python -I`; PIL `/opt/homebrew/bin/python3 -I`. `sh Linssit-testit/unity-tarkistus.sh` worktreessä (~2 min; varjostimet kääntyvät vasta ajossa). Muokkaukset python-skriptillä (.tmp + os.replace + copymode). Kuvat iPad 2752×2064, iPhone 1206×2622. iPhone-ajot: `ui kamerasuhde laite` (juna 223:ssa). Luovutus plumbingilla edellisen luovutushaaran päälle.
