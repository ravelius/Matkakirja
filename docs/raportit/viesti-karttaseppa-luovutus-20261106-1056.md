# Karttaseppä: luovutus 6.11.2026 klo 10.56 (KS)
Syy: konteksti 25 %, luonteva tauko: paletti v2 ja työkalu on tehty ja pushattu. **Voittaa -1040:n ristiriidassa; siitä pätevät AJO 7, SEURAAVAAN YHTEISEEN AJOON ja LOPPUTESTIT.** Kaikki kokeena, ei junaan, ei iPadia. W = /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219 (karttaseppa/nahtavyydet-219, kärki 470b2b436, natiivi-backup). Y = /Users/Shared/Claude/wt/proto-karttaseppa-yhteinen (kärki 9f5e3e105, ei ajoa pyydetty). Viestit: ListAgents ja nimi + [ref]; pelkkä nimi ei mene perille.

## ENSIN
Vahti Monitorilla: `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min, viritä uudelleen).

## KARTTAPALETTI: JATKA TÄSTÄ
Lue suunnitelma: /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261106-karttapaletti.md. PT:n käskyn teksti -1040:ssä.
**Tehty (W 470b2b436, itsetesti ok, Unityä ei ajettu):**
- `tyylikirja/tyylikirja.json` "karttapaletti" v2: perus, tunnistus, saanto. Vanhat nimet (tiili, okra ...) säilyvät, koska KaupunkiPallo ja KarttaSeepia käyttävät niitä.
- `tyokalut/karttapaletti.py`: `tarkista` (portti), `muunna`, `vari`, `itsetesti`. Luvut näytteestä paletti-naytte.py, mutta sävykartta on tehty jatkuvaksi; näytteessä sektorien rajoilla oli hyppyjä. Vaalein 0,96 on oma lisäys, näytteessä sitä ei ollut.
- VS:lle rajat lähetetty 10.5x, VS tuo sha:n.

**Seuraavat työt:**
1. **Tyylikirja mainiin:** tyylikirja.json on AINOA LÄHDE main-repossa. Sama lohko PR:llä main-repoon: skripti /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/karttapaletti-v2/paletti-v2-lohko.py (vaihtaa vain karttapaletti-lohkon, koska json.dump muotoilisi koko tiedoston uudelleen). Main-repossa sama: `python3 paletti-v2-lohko.py tyylikirja/tyylikirja.json`, eikä `node tools/tyylikirja.mjs`:ää tarvita, koska lohko ei generoi muuttujia (tarkista).
2. **Kohteet:** aja `muunna` mallit, joiden portti ei mene läpi. Savy tiedostosta Nahtavyysalue.cs: oletus (1,75 1,85 1,6) notre-dame, eiffel, grand-palais, opera, invalides, montparnasse; 1,26 1,33 1,15 louvre, riemukaari, pantheon, sacre-coeur; 1,2 1,35 1,3 sainte-chapelle; puut 0,68 0,62 0,56 ja haalistus 0,35.
   Portti ei mennyt läpi: **opera 4,05 %, invalides 0,91 %, sacre-coeur 0,49 %, notre-dame ja sainte-chapelle** (uusin mitta ilman Savya tai Savyllä alla). Läpi: louvre, eiffel, grand-palais, riemukaari, pantheon, montparnasse, puu-1. Pohjat tarkistamatta työkalulla (`--ei-valoa`); albedomitan mukaan vain invalides-pohja 2,55 % yli 0,10.
   Notre-Dame 6,70 % ja Sainte-Chapelle 5,92 %: ylitys tulee lähes kokonaan tummista pikseleistä (L alle 0,26), jotka sääntö nostaa musteen tasolle. Suunnitelman riski: ikkunoiden ja katon yksityiskohdat voivat latistua, **katso kuvasta**.
   Opéra: muunnos meni läpi 0,18 %:lla (JPEG-kohina, siksi sallittu osuus 0,2 %). Koemuunnos on scratchpadissa, ei repossa.
3. **Versiokansio:** ei vanhan päälle. Ehdotus: uusi kansio Resources/ -alle vain muuttuville malleille. Pari samasta ajosta: pieni komento koepohja-komennon mallilla (Komennot.cs:800, Nahtavyysalue.KoePohja:499): lukee GLB:n kuvan uudesta kansiosta ja vaihtaa `m.Aine`:n _MainTex:n. Oletus ennallaan, kunnes KK sanoo. Mallit ovat Resourcesissa, eivät mediassa, joten mediavientiä ei tule.
4. **Ajo:** yksi yhteinen Mac-ajo JU:lta, ei omaa. Pari nykyinen | paletti samalta kameralta KK:lle: Opéra, Invalidit, Notre-Dame, Sacré-Cœur, Pompidou (VS). Omia lähikameroita Opéralle ja Invalideille ei ollut viime ajoissa, joten laske ne. Mukaan: W f743d99ad, runko ce65ccfe4, VS 838527412 (3 kuvaa sk-sillat-sauma.txt, kansio VS:lle) ja VS:n palettireitti, NS:n v10 jos ehtii.
5. **Portti pakolliseksi** vasta Pariisin jälkeen (suunnitelma, kohta 4).

**Mittaus, joka muuttaa kuvaa (kerro KK:lle ja PT:lle pareissa):** ajo 7:n kuvissa vain Pompidou ylittää selvästi (punainen C 0,199, sininen noin 0,12). Malleista Opéran kulta on selvin (C p99 0,124). Puut ylittävät rajan vain tiedostossa, eivät näytöllä, siksi raja lasketaan varjostimen läpi. Työkalun valo on arvio auringon puolelta (`saanto.valo`): tarkista parista, että mitta vastaa ruutua. OhjelmaKohde-varjostimen laskua en tarkistanut, VS:lle kerrottu.
**Raamattu 4.40 ja 3d-maamerkki kohta 35:** PT päivittää. Omistajan kortti siniseen pyramidiin: suunnitelma pitää sitä auki, PT:n viesti ratkaisee "säilyvät haalistettuina", pyramidin väri #739dc0 on jo rajan sisällä, ei muutosta.

## FORUM JA NS
Forumin litteä ruskea alue = Canopée way/630511331 (building=roof) puuttuu NS:n paloista; kartan building-taso peittää 99 % sen muodosta (mvt14-pala 5.11., ei ajon oma). Kartan muutosta ei tarvita, jos katto tulee paloihin. NS suosittelee v10:een vain kattoa; perui 6 palan poiston, koska ne ovat myös kartan rakennuksia ja jättäisivät litteän jäljen. KK päättää, NS tuo sha:n. **Pidä palat-v9 ajoissa siihen asti.** 48 muuta isoa building=roof-kohdetta: tarkistamatta.

## ODOTTAA VASTAUSTA
KK 10.5x, ajo 7 näytetty omistajalle viat kerrottuina: rantarivin 11 puuta jäävät; Palais-Royal'n aukio ja 2 puuta jäävät, ellei omistaja sano muuta (isompi puu peittää keskioven, kerrottu); **Tuileries'n itäpään nurmiraita on KS:n korjattava** (Louvren pohjakuvan reuna, ei aloitettu); f743d99ad seuraavaan ajoon. **Omistaja 10.47: mallit ja puut samaan pikseleittäiseen usvaan: kysy PT:ltä tekijä ennen kuin kosket usvaan lisää** (f743d99ad on jo tehty ja KK:n mukaan ajoon). Auki KK:lla: kattokortti v4/v6, Forum. NS: sha. VS: palettireitin sha. Concorden vedestä VS kuittasi "ei korjattavaa"; co-yla:n Louvren puuttuminen on W f743d99ad:n todistettavana seuraavassa ajossa.

## Oppi
Mittaa ensin, onko ongelmaa: suunnitelma oletti monen kohteen ylittävän rajan, mutta ruudulla selvä ylitys oli yksi kohde. json.dump tyylikirjaan muotoilee koko tiedoston uudelleen: vaihda vain lohko tekstinä ja katso git diff --stat.

## LOPPUTESTIT (siirrä tämä osio jokaiseen uuteen luovutukseen)
Repon mainissa ei ole yhteistä lopputestilistaa (PT 01.5x). Tämä osio on lista, kunnes PT muuta sanoo.
1. Saapumislento laitteella (2.209, KK, kirjattu PT 01.5x): mallit syntyvät noin 11 km:ssä; jos tarkempi maastotaso ei ole vielä ladattu, kohde voi hetken istua väärällä tasolla. Vain laite näyttää.
