# Karttaseppä: luovutus 5.11.2026 klo 16.51 (KS)
Syy: konteksti 25 % (7.37), työ odottaa JU:ta. **Lue tämä, sitten -1628 (haara karttaseppa/luovutus-20261105-1628) ja -1623.** Tämä voittaa ristiriidassa. W = /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219, haara karttaseppa/nahtavyydet-219, etäpää natiivi-backup, kärki **f8b35f66d**. Python /opt/homebrew/opt/python@3.14/bin/python3.

## Omistajan linja
16.41 (PT:n välittämä): "jää ennalleen ja edelleen keskitytään vain pariisin 3d rakennuksiin". Eiffel ja sarjan seitsemän ensin, sitten niiden kyltit; Tuileries-siirto ja muu vain, jos ei viivytä niitä.

## ENSIN
1. Remote päälle. Vahti Monitorilla: `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh a85fae8fb` (käsitelty 764de92d6 tilassa).
2. **Eiffel:** ajo f8b35f66d katsottu (lokit/julkaisija-pariisi-eiffel-f8b35f66d), kuvat KK:lla: paikka, kiveysneliö ja jalat oikein. Kuvat jäivät kauas, joten kyltti, ristikko ja väri ovat näkemättä. Lähikuvat JU:lla: sk-pariisi-eiffel-lahi.txt, tulos lokit/julkaisija-pariisi-eiffel-lahi-f8b35f66d. Katso täysikoossa: kyltti (Qid Q243), kirkkaus (torni valokuvaa vaaleampi ja harmaampi, Savy on oletus), varjo, antenni. Sitten kuva KK:lle, kopio PT:lle (2.214), ja JU:lle pienen iPadin asennus (2.214). Huomiot kauempaa: ND:n ja Louvren pohjat eivät häivy usvaan kuten kartta (eiffel-matala), ja eiffel-kaukaa-kuvassa ND:n kohdalla on punavalkoinen esine ja Eiffelin alueen vieressä suora vaalea reuna (x 920): selvitä.
3. **Grand Palais:** katso alla. Vie otto 2:n tilaus Codexille.

## Eiffel
Otto 2 raakaversio (97 184 kolmiota, 6,8 Mt), posti 24c8367f6, kuittaus 9828087a2. Leveydet hyväksytty: oikea.jpg antaa tasanteille noin 0,68 ja 0,36 pohjasta, malli 0,65 ja 0,39; tilaukseni 0,52 ja 0,32 olivat väärät. Asennus _tyo/karttaseppa/eiffel-asennus (asenna.py, lisaa-koodiin.py). Pohja = 24b pohja-uusi.png + maski alfana, 1,1 m/px, tarkistuskuva pohja-kartalla.jpg siisti. Tripon muut seitsemän vasta omistajan arkin jälkeen.

## Grand Palais (posti 764de92d6): otto 1 ei kelpaa Tripolle, Codexin hylkäys on oikea
Katsoin arkin ja oikea.jpg:n. Viat: katto-osat vaihtelevat kuvasta toiseen (lounas kolme vartta, koillinen neljä), koillinen ei ole vastakulma, etelä ja pohjoinen eri levyiset (11,7 %), viistot 34° eikä 65°. Kupoli on matala ja torni puuttuu: oikea.jpg:ssä kupolin päällä on selvä korkea kärki lippuineen, se on tunnistettavin osa, eikä sitä saa jättää pois. Codex jätti sen pois tilauksen katto-ohjeen mukaan (posti 51a0c244b): korjaa ohje, vika on tilauksessa.
Suunta: taulukon 89° on väärä, jalanjälki (pitkä sivu lähes pohjois-etelä) on oikea, Codex toimi oikein. Korjaa kohteet-pariisi.json ja TILAUS-24-sarja rivi ennen asennusta, peli.py ottaa Suunnan sieltä. Vahvista rak.py:llä; muiden kuuden suunta tarkistettava samalla.
Syy lähteessä: yksi puiden takaa otettu valokuva ei kerro pohjaa. Otto 2:een: pohjakaava (OSM building:part tai yläkuva) ja koko rakennuksen valokuvat Commonsista (lupa pysyvä, CC BY-SA kelpaa), kärki mukaan, sama mittakaava neljään sivuun. Codexin kuvilla pysyvä lupa; Codex odottaa lähdepostia. Muut kuusi tulevat erikseen, vahti ilmoittaa. KK:lle kerrottu.

## ND:n tornit: EI TEHDÄ (PT 16.5x, KK)
Leveneminen ja korkeus ovat omistajan pyytämää liioittelua, eivät vika. Malli ei muutu, suoristusta ei tilata eikä tehdä. Oppi: ennen kuin ehdotat mallin muutosta, hae päätös lokista.

## Lisäys 16.5x
Kärki on nyt **1c5c26667** (f8b35f66d + NUI:n Tuileries-korjaus 770bcedfc), etäpäässä. Lähikuva-ajo on f8b35f66d:stä, ja se riittää Eiffelille. Katukuvan sumeus tulee Macin ajosta (NUI: haku Screen-koossa 640×480), ei vika; KK:lle mainittu "sumea", kerro syy, kun viet seuraavan kuvan. Vastaus JU:n 16.5x riviin "vie kuva KK:lle ja PT:lle" on tehty.

## Kylttiajo 5263cacb5 (katsottu, KK:lla, NUI:lla)
Museo: kyltti ja malli avaavat, todistettu. Katukuva suurenee, mutta on sumea (NUI:lle). **Vrain-Lucas ei todistettu:** "ei merkkiä" ja kuvat samat, vaikka zoom 0.001; näkymä ei näytä lähimmältä zoomilta. Portti NostotKartalla rivi 527 (kyltinMittakaava < 0,6). Sijainti 48.8573 2.3372 on kuvan keskellä. Epäily: kamera ei mene lähimmälle (MinKorkeusPaikassa) tai mittakaava ei nouse Macin ajossa. Odottaa 3D:n jälkeen; KK:lle kerrottu auki. Ranskan tasolla pyramidimerkki ei erotu, pelinappula päällä.
JU: kylttiajoa ei ole jonossa; pyydä uusi Eiffelin tuloksen jälkeen, jos tarvitaan (2.215: Eiffelin kyltti näkyy Eiffel-ajossa).

## Opit
- Tarkista tilauksen luvut oikeasta kuvasta ennen kuin vertaat niihin: Tripo pysähtyi syystä, joka oli tilauksessani.
- Valokuva puiden takaa ei riitä pohjaksi; yhden kuvakulman lähde tuottaa eri rakennuksen joka kuvaan.
