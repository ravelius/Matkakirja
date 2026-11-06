# Karttaseppä: luovutus 6.11.2026 klo 15.29 (KS)
Syy: konteksti 31 %, luonteva tauko: ajo 18 katsottu ja jaettu, mikään ajo ei käynnissä. **Voittaa -1410:n ristiriidassa; lue -1410:n AUKI ja LOPPUTESTIT.** Kaikki kokeena, ei junaan, ei iPadia. W = /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219 (kärki 6e4be4fed). Y = /Users/Shared/Claude/wt/proto-karttaseppa-yhteinen (kärki e83a2d314, natiivi-backup karttaseppa/ajo-yhteinen-tasoitus). L = /Users/Shared/Claude/wt/proto-karttaseppa-lod (haara karttaseppa/codex-lod, sama kärki; poista, kun kokeen kohtalo on päätetty).

## ENSIN
1. Vahti Monitorilla: `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min, viritä uudelleen).
2. Odota KK:n vastausta KYSYMYS-riviin 15.2x: viedäänkö kevyiden mallien erot Codexille näin, vai katsooko KK ne ensin omistajan kanssa. Ei korjausta eikä Codex-tilausta ennen sanaa. PT kirjoittaa Codexin kuittaus 2:n KK:n sanan jälkeen. PT:llä on valtuus-rivi: omistajan poissa ollessa KK hyväksyy hänen aiempia sanojaan vasten; kysymykset KK:lle KYSYMYS-rivillä, ei "KK hyväksyi" ilman KK:n sanaa.

## KEVYET MALLIT (PT 15.03, omistajan pyyntö KK:n kautta; koe)
- **Toimitus:** posti/codex-pariisi-lod-toimituspari-20261106 (origin/claude/postilaatikko), ohje posti/codex-paatoimittaja-karttaseppa-pelikoodari-pariisi-lod-toimitus-20261106.md. Purettu _tyo/karttaseppa/codex-lod-20261106/saapunut. SHA:t täsmäävät. Portti `node tools/codex-3d-tarkistus.mjs` palautti 0; HUOM: LAHTEET puuttuu, tarkistettava käsin. Toimituksessa ei erillistä havainnekuvaa; vasemmalla Codexin vertailukuva (CPU-esikatselu), PT:lle kerrottu.
- **Kytkentä:** e83a2d314. Resources/NotreDameKoe/lod-20261106/{notre-dame,riemukaari}{,-normaali}.bytes. Komento `koemalli <nimi> <kansio> [r g b]` (Nahtavyysalue.KoeMalli, Komennot.cs); 0 0 0 = varjostimen oletussävy. Vanhat bytes ja oletus ennallaan, joten palautusta ei tarvita. Riemukaari on Codexin GLB tavulleen (SHA 9b2866f0). Notre-Dame on Codexin GLB (SHA 5e82845b) karttapaletilla muunnettuna: tasatulla sävyllä portti antoi 2,82 % yli rajan, muunnettu 19,94 % pikseleistä, verkko ja UV ennallaan.
- **Sävyt** (rungon mediaani nykyiseen, parametrina, ei tiedostossa): ND 1.124 1.10 0.816; RK 1.335 1.157 0.789. Riemukaari näyttää tasattuna oranssimmalta kuin nykyinen. Nykyisellä kertoimella 1.26 1.33 1.15 katto on harmaanvihreä, kuten hylätty v4.
- **Muut kohteet:** PT: Codex tekee kevyitä myös Grand Palais, Louvre, Opéra, Sacré-Cœur, Invalides, Panthéon, Sainte-Chapelle, Montparnasse (Eiffel ohitetaan). koemalli toimii koodin perusteella niillekin, kun kansiossa on samanniminen .bytes (ajamatta). Louvressa pyramidit ovat mallissa ja koodi käyttää Karjet-taulukkoa, tarkista erikseen.
- **Kuvien tulos (ajo 18):** suunta, koko ja paikka täsmäävät kummassakin. ND: edestä ja 45° selvästi terävämpi; takaa ja ylhäältä kaarituet ja kuorin muoto puuttuvat, iso litteä vihreä kattomassa, tumma läiskä, tornien katot tasaiset. RK: reliefit terävämmät, kohouma tallella; kaariaukkojen sisäpinnat harmaat, katossa ruudukko, tumma viiva reunan sisäpuolella. Normaalikartan vaikutusta ei erota näistä kuvista, ei todennettu.

## AJO 18 (lokit/karttaseppa-yhteinen-18-b8-e83a2d314; parit _tyo/karttaseppa/parit-yhteinen-18, tee-parit.py, tee-havainne.py)
Shader error 0, error CS 0, 24 kuvaa, 712 s. Ortokuvat codex-lod-20261106/ortho-nd.jpg ja ortho-rk.jpg.
- **+13-vaaleus ratkesi:** po2-la ja po2-ita (UI päällä) −13/−12/−9 RGB ajon 17 samoilta kameroilta (ui pois). ui pois vaalentaa koko kuvan; pelin tavallisen kuvan päällä on tummentava kerros, syy selvittämättä. VS:lle ja PT:lle kerrottu. Ajojen 15-17 ui pois -kuvat eivät kelpaa väreihin.
- **Pompidou ja Louvren pääty:** kuvat VS:llä, en katsonut.
- **Pont Neufin raita:** kartan oma tie, todennettu (rajaus-pont-neuf). PT kuittasi, pois jonosta.
- **Richard-Lenoirin vesi (rl-vesi), SEURAAVAAN AJOON (PT 15.3x):** tee tunnelisuodatus seuraavaan yhteiseen ajoon. OpenFreeMapin vesitaso; ElavaTyyli.cs:282 (water) ja :412 (waterway) eivät suodata tunneleita, :431 suodattaa vain liikenneväylät. Kumpi taso piirtää, ei todennettu (palaa ei haettu: robots.txt 403). Lisää `brunnel == "tunnel"` -ohitus ja katso sama kamera (komento aja 48.8600 2.3700 0.003 2, kallista 45, suunta 0). Piirtyvät laatat ovat välimuistissa, tarkista versio (Laattapalvelin.Elava.cs) ennen kuin päättelet tuloksen kuvasta.
- **Riemukaaren katon ääriviiva (PT 15.3x, mitattu ilman ajoa; katon-aariviiva.py, tasot.py, aariviiva-rk-ero.jpg):** uusi on ylhäältä kohtisuorassa suora suorakaide ±94 × ±50,5; nykyinen sama ilman kulmia, ero 159 yks² eli 0,8 % ja vain kulmissa. Korkeustasot samat 0,2 yks. sisällä (katto ±84 × ±40,5, attikan jalka ±88 × ±44,6, räystäs ±94 × ±50,55). Pelikuvan porras ei ole mallin ääriviivassa, vaan se näkyy tasojen perspektiivistä, kun katto sulautuu samanväriseen kiveykseen; päätelty mitoista, ei omaa kuvaa. Mallin ääriviivaan ei korjattavaa.

## AUKI -1410:stä edelleen
Koepaletti-komento pois W:stä, kun KK ei kumoa. Eiffel 85b VS:llä. Kärkilaskenta iPadilla mittaamatta (nyt kevyillä malleilla pienempi, VS).

## Oppi
Omat ortokuvat eivät todista katon osista, kun väri on sama: väitin kohouman kadonneeksi, Codexin vertailukuva osoitti sen olevan tallella. Tarkista vertailukuva ennen kuin kerrot puuttuvasta osasta. Aja tuontiportti ensimmäisenä, ennen kytkentää; tässä se ajettiin PT:n muistutuksesta, kytkennän jälkeen.

## LOPPUTESTIT (siirrä tämä osio jokaiseen uuteen luovutukseen)
Repon mainissa ei ole yhteistä lopputestilistaa (PT 01.5x). Tämä osio on lista, kunnes PT muuta sanoo.
1. Saapumislento laitteella (2.209, KK, kirjattu PT 01.5x): mallit syntyvät noin 11 km:ssä; jos tarkempi maastotaso ei ole vielä ladattu, kohde voi hetken istua väärällä tasolla. Vain laite näyttää.
