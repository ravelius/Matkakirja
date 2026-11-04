# PT:n luovutus 4.11.2026 klo 06.54 (konteksti 30 %, pehmeä raja)

Edellinen: viesti-fable-luovutus-20261104-0544.md (a001393d6); sen iPad-, Muuri-loppu- ja Nollaus-osat korvattu tällä. "JÄLKEEN AAMUN" -lista 0304 ja 0437 voimassa.
Vahdit Monitorilla 30 min: python3 -u /Users/Shared/Claude/hooks/odottajat-vahti.py | grep --line-buffered -E 'ODOTTAA|TYHJÄKÄYNTI|TILA\|.+' ja /Users/Shared/Claude/hooks/codex-posti-vahti.sh. Viritä heti.
Omistaja hereillä 06.01 alkaen, puhuu KK:lle. KK local_d5f31591. Lista: proto-3d/lokit/kk-peli-a94d8e7fb-20261103/KORJAUSLISTA.md. AIKA date-komennosta joka viestiin.

## Omistajan päätökset
- 06.01: Pariisi jatkuu yhd3:n suunnalla; seuraavaksi puut, talot, reunat, Sacré-Cœur, nopeus. Ei hyväksy pintaa eikä junaa.
- 06.02: "Miksi nähtävyydet eivät istu kartalle?" Suunnitelma scratchpad/keskustelukanava/suunnitelmat/20261104-nahtavyydet-istumaan.md.
- 06.51: pienet kadut pois myös lähikuvasta (k40). Kirjattu 2.204, RAKENNUSPERIAATE.md, loki (cec88a58d, PR 6235 auki: yhdistä mainiin, kun CI vihreä).

## JUNAN RUNKO (tärkein)
Runko oli kahtena linjana: be56/ff97/e721 ilman 218:n juoksupakettia, cb8b/349e ilman 4397cf20d:tä (todennettu merge-base, repo proto-3d/Matkakirja-proto). be56:n muisti- ja xf-luvut eivät todista junaa.
JU 920416d6d (349e + 4397, 0 ristiriitaa, testit läpi). PK 7b7aa64da (+ be56 + cb8b ilman DIAGia) ja c3ba9742c (+ ovikorjaus): 820/820, Unity-tarkistus 0, EI ajettu, haarat paikallisia. Ei lukitusta.
Käsky 06.53: JU kääntää c3ba9742c, sitten oleskelu (uusittu skripti testaamatta; 1. ajo ei todistanut salia), reitti ja muisti. JU luokittelee 141 commitia, "muu" sinulle tiedostona.
Käsky PK:lle: sisään 9d02ae999, 6aed10e25; otsikot pysyvät, otsikko-219:n korjaukset jos valmiit; ei d667da301, 15d7274ad (219), c865ea4d8; 2ca2f17b7 PK ehdottaa; palvelijalippu oletus kiinni testillä. Nämä päätin itse, KK ei ole nähnyt: kerro KK:lle PK:n vastauksen kanssa.
Ovi (ys, taso 1, 0,30 s joka uudelleenaloituksessa): e89efadad/c3ba9742c; ruudut sinulle ja KK:lle; leikkausreuna viaksi → KK ennen TF:ää. Alkulennon mittaus JU:lla (peitto-reitti/aja.zsh, 349e). xf 0,94 s: KK ei tuomiota, oikea reitti.

## PARIISI
- yhd5 8dee95d57 ja yhd6 e721d219e JU:lla, kuvia ei vielä lokit-kansiossa 06.42. e721: e-0-13, k-t-z15-0-045, y-tuileries, kulu.
- VS: pelattava haara käsky 06.51: arkki repoon, k40-kadut, z15 arkista, k41-reuna a5f54a930 + k43-portaat 75cee8f62, saumaton arkki. Sha sinulle. z15-arkkia ei voi viedä yksin. Lisäpalat käyvät, jos muisti ≥ 300 Mt rajan alla eikä vieritys huonone, muuten 1 200 / 450 m. z14|z15 ratkaistaan laitteen zoomisarjasta. Mont-Valérien iPadilta. k38 ee3743d64 kuitattu. Kuva laitteelta KK:lle ennen hyväksyntää. Pari sauma2-bul-rulla.jpg katsomatta.
- KS: poistuvien katujen nimet ja liikkuvat pois (06.51). Puut 43ba52fe7 KK:lla arvioitavana (ei pelissä, kulu mittaamatta). Boulogne 18a, Vincennes 18b toimitettu QA-poikkeamin: KS tekee parit, ei lisäottoa ilman KK:ta. Sacré-Cœur KS:n, uusi kuva nähtävyyskokeen jälkeen (VS vain pohja).
- Nähtävyyskoe: parit _tyo/karttaseppa/pariisi-alueet-20261104/ (2 Codex-ottoa käytetty, Codex pysäytti). Suositukseni KK:lle: ei omistajalle vielä, lähikorttelit eivät muuttuneet; kolmas otto KK:n päätös, ei vielä tullut.
- NS: 8d66b5865 pois (KK). Rivi 168 + saumat = maastopalan L12→L13: iPad-todiste, sitten z13-koe koehaarassa (+34 Mt arvio). Vieritys ff97: 60 fps, koealue päällä yli 33 ms 0,05:llä 3,0 % / 0,7 %; käsky: järjestys toisinpäin + syiden erittely, ei korjausta ennen sitä.

## MUURI (LAV, ei vientiä)
Kohde on ulkomuuri, ei 1-0-seinä. 80 mallia: 4 kokeena onnistui (muuri/ulkomuuri-kuvat/, katsomatta), 76 leivontaan JU:lle, sitten portit m216, 120 ja 01, 04, 09. Porras pois, portti ennallaan (KK:lle kerrottu). Puut: 168 siirtoa, 3 pois, lävistäviä 0, seinävara ≥ 2,0 m, lähikuva JU:lle. Lattia z 511–530 selvitettävä mallista (ei vielä tulosta). LAV ilmoittaa PK:lle ja sinulle, kun juuri valmis: PK ajaa yhden todisteen.

## LEVY
81 Gi 06.42 (raja 100). 134 lokikansiota T7:lle linkein (malli tools/levy/siirra_lokit_t7.py, ETULIITTEET ('',), raja 4 h), T7 163 Gi. Välimuistin kopiot ovat APFS-klooneja lokien .app-kansioista (2 tiedostoa todennettu). df-du-ero 178 Gi: KK:n vihje /Users/samireivinen, ei mitattu, emme koske. Worktreet: KS ja NS siivosivat; muut roolit eivät vielä, tarvittaessa rivi.

## Opit
- Kokeen numeroa ei voi antaa kysymättä: k41 oli jo käytössä; kysy VS:ltä tai käytä seuraavaa.
- Rooli, jolle annan kokeen pohjan, voi olla eri linjalla kuin juna: tarkista merge-base ennen kuin kirjoitat "todistaa junan".
- Jaoin Sacré-Cœurin väärin ja annoin "koko 719": lue tekijä ja KK:n sanat ennen käskyä.
