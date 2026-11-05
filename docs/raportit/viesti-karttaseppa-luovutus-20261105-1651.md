# Karttaseppä: luovutus 5.11.2026 klo 16.51 (KS)
Syy: konteksti 25 % (7.37), työ odottaa JU:ta. **Lue tämä, sitten -1628 (haara karttaseppa/luovutus-20261105-1628) ja -1623.** Tämä voittaa ristiriidassa. W = /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219, haara karttaseppa/nahtavyydet-219, etäpää natiivi-backup, kärki **f8b35f66d**. Python /opt/homebrew/opt/python@3.14/bin/python3.

## Omistajan linja
16.41 (PT:n välittämä): "jää ennalleen ja edelleen keskitytään vain pariisin 3d rakennuksiin". Eiffel ja sarjan seitsemän ensin, sitten niiden kyltit; Tuileries-siirto ja muu vain, jos ei viivytä niitä.

## ENSIN
1. Remote päälle. Vahti Monitorilla: `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh a85fae8fb` (käsitelty 764de92d6 tilassa).
2. **Eiffel:** JU ajaa f8b35f66d, skripti _tyo/karttaseppa/sk-pariisi-eiffel.txt, tulos lokit/julkaisija-pariisi-eiffel-f8b35f66d. Käännösvirhe tulee suoraan KS:lle. Katso täysikoossa: pohjan paikka (kiveysneliö tornin alla), Suunta 134,1, kirkkaus (Savy on oletus, Louvrella tarvittiin), varjon koko, kyltin korkeus (Qid Q243) ja antenni. Sitten kuva KK:lle, kopio PT:lle (2.214). KK:lle on luvattu kuva heti katsottuna.
3. **Grand Palais:** katso alla. Vie otto 2:n tilaus Codexille.
4. **ND:n tornit:** katso alla, PT odottaa paria Eiffelin jälkeen.

## Eiffel
Otto 2 raakaversio (97 184 kolmiota, 6,8 Mt), posti 24c8367f6, kuittaus 9828087a2. Leveydet hyväksytty: oikea.jpg antaa tasanteille noin 0,68 ja 0,36 pohjasta, malli 0,65 ja 0,39; tilaukseni 0,52 ja 0,32 olivat väärät. Asennus _tyo/karttaseppa/eiffel-asennus (asenna.py, lisaa-koodiin.py). Pohja = 24b pohja-uusi.png + maski alfana, 1,1 m/px, tarkistuskuva pohja-kartalla.jpg siisti. Tripon muut seitsemän vasta omistajan arkin jälkeen.

## Grand Palais (posti 764de92d6): otto 1 ei kelpaa Tripolle, Codexin hylkäys on oikea
Katsoin arkin ja oikea.jpg:n. Viat: katto-osat vaihtelevat kuvasta toiseen (lounas kolme vartta, koillinen neljä), koillinen ei ole vastakulma, etelä ja pohjoinen eri levyiset (11,7 %), viistot 34° eikä 65°. Kupoli on matala ja torni puuttuu: oikea.jpg:ssä kupolin päällä on selvä korkea kärki lippuineen, se on tunnistettavin osa, eikä sitä saa jättää pois. Codexin ohitus "campanile pois" on väärä.
Suunta: taulukon 89° on väärä, jalanjälki (pitkä sivu lähes pohjois-etelä) on oikea, Codex toimi oikein. Korjaa kohteet-pariisi.json ja TILAUS-24-sarja rivi ennen asennusta, peli.py ottaa Suunnan sieltä. Vahvista rak.py:llä; muiden kuuden suunta tarkistettava samalla.
Syy lähteessä: yksi puiden takaa otettu valokuva ei kerro pohjaa. Otto 2:een: pohjakaava (OSM building:part tai yläkuva) ja koko rakennuksen valokuvat Commonsista (lupa pysyvä, CC BY-SA kelpaa), kärki mukaan, sama mittakaava neljään sivuun. Codexin kuvilla pysyvä lupa; Codex odottaa lähdepostia. Muut kuusi tulevat erikseen, vahti ilmoittaa. KK:lle kerrottu.

## ND:n tornit (NS:n havainto, PT 16.4x)
Vahvistettu mallista: _tyo/karttaseppa/eiffel-asennus/mallin-leveys.py notre-dame.bytes: x-leveys 212 keskellä, 239 tornien yläpäässä (+13 %), z 168 vakio. Tornit myös korkeat: leveys/korkeus noin 2,2, oikea noin 1,6. Ehdotin PT:lle kärkien suoristusta ilman Tripoa (x kohti keskilinjaa y:n funktiona, y > 310) ja paria kuvina; korkeuteen ei kosketa ilman sanaa.

## Kylttiajo 5263cacb5 (katsottu, KK:lla, NUI:lla)
Museo: kyltti ja malli avaavat, todistettu. Katukuva suurenee, mutta on sumea (NUI:lle). **Vrain-Lucas ei todistettu:** "ei merkkiä" ja kuvat samat, vaikka zoom 0.001; näkymä ei näytä lähimmältä zoomilta. Portti NostotKartalla rivi 527 (kyltinMittakaava < 0,6). Sijainti 48.8573 2.3372 on kuvan keskellä. Epäily: kamera ei mene lähimmälle (MinKorkeusPaikassa) tai mittakaava ei nouse Macin ajossa. Odottaa 3D:n jälkeen; KK:lle kerrottu auki. Ranskan tasolla pyramidimerkki ei erotu, pelinappula päällä.
JU: kylttiajoa ei ole jonossa; pyydä uusi Eiffelin tuloksen jälkeen, jos tarvitaan (2.215: Eiffelin kyltti näkyy Eiffel-ajossa).

## Opit
- Tarkista tilauksen luvut oikeasta kuvasta ennen kuin vertaat niihin: Tripo pysähtyi syystä, joka oli tilauksessani.
- Valokuva puiden takaa ei riitä pohjaksi; yhden kuvakulman lähde tuottaa eri rakennuksen joka kuvaan.
