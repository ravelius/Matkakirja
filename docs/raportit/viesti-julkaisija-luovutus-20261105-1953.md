# Julkaisija: luovutus 5.11.2026 klo 19.53

Rooli: Julkaisija (JU). Korvaa -1906:n ALOITA-osan; sen TAPA ja -1812:n SITOVAT LINJAT, VIRHEET ja OPIT ovat voimassa (haarat julkaisija-luovutus-1906 ja julkaisija-luovutus-20261105-1812). T = /Users/Shared/Claude/julkaisija-tyokalut, jonoloki T/jono-20261103-ilta.txt.

## ALOITA TÄSTÄ
1. KESKEN: rivi PT:lle "montako puuttuu nyt" (PT 19.3x). PR 6305 (15 intron nimeä) on yhdistetty 6966f71d7, sisältövienti 42076415074 oli käynnissä 19.52, ja jonossa oli 73b38a521:n vienti 42076751423. Eheysvartija lähtee viennin onnistuttua. Lue /Users/Shared/Claude/proto-3d/lokit/eheysvartija/VIKA.txt (tuore aika) tai aja `gh workflow run eheysvartija.yml --ref main`. Odotus 0: 20 aarrekuvaa viety 19.34 ja 15 nimeä korjattu. Jos 404 jää aarrekuviin, epäile CDN:n 404-välimuistia (julkinen URL ?t=-parametrilla, muisti ampari-cdn-404-valimuisti). Oma vahti kuolee nollauksessa.
2. KESKEN: L2 NS william-intro fcba229ca (kansio natiiviseppa-william-fcba229ca). Valmistuttua polku NS:lle; AJETTU-rivi on T/natiiviseppa-william-fcba229ca.log. NS sai jo lauseet2:n (PUUTE 1).
3. Tarkista `ps` ja lukot, käynnistä lukkovahti Monitorina (zsh T/lukkovahti.zsh, 30 min, uudelleen vanhentuessa). Valovahti pid 90769 käynnissä. Kerro PT:lle "JONO TYHJÄ: Julkaisija", kun 1 ja 2 ovat ohi.

## OMISTAJA 19.26 (KK)
Pieni iPad on kotona: ei asennusta pienelle eikä uutta rungon asennusta. TF vasta, kun Pariisi on valmis. Mac-ajot ennallaan.

## TEHTY 19.08–19.52 (kaikki rc 0)
KS Grand Palais d5d2b9169 (202 s, 5) ja lähi 0906b3c15 (179 s, 4). LAV lattia19 L2 (220 s, 3). NS haivytys 520cae03f (83 s, 3), napit d1867a55a (3), aani fcba229ca (74 s, 2), lauseet2 fcba229ca (1, PUUTE 1). NUI b34cec7ed (134 s, 2), 690f5e141 (3), 84a2f3d83 (132 s, 2). PK ajoi itse 73f708b88 (399 s, 22) ja f5e0c664a (505 s, 4 + 2). Kuvia en katsonut, paitsi kohdat alla.
- Eheysvartija: EPERM, koska lokit/eheysvartija oli linkki T7:lle ja runner ei pääse sinne. Nyt oikea kansio sisäisellä levyllä; vanha linkki nimellä eheysvartija-t7-linkki-20261103. Ei koodimuutosta. Yöllinen siirto ohittaa alle 5 Mt:n kansiot, joten se ei palaa T7:lle.
- 35 puuttuvaa: 20 aarrekuvaa ei ollut koskaan viety; 15 intron nimeä väärin. PR 6305: katsoin 15 kuvaa 1000 px:nä, kaikki vastasivat tekstiä. Aarrekuvat: PT:n sana ja PK:n vahvistus, paketti aarrekuvat-paikallis-10-vienti-20261105, viety 20, oli jo 0, virheitä 0.
- VS:n opas-valilauseet-vienti-20261105: viety 230, oli jo 1 (kieli.json), virheitä 0, 412:ta 0.
- Levy (PT): 86 yli vrk lokikansiota = 0,03 Gi, jäivät paikoilleen PT:n sanalla. 23 _tyo/codex-kansiota T7:lle linkillä, 2,45 Gi (T/tyo-t7-aja-20261105.json), venvit jäivät. 19.48 vapaana 104 Gi. wt-taulu T/wt-koot-20261105.txt PT:llä; PT käskee roolit siivoamaan, JU ei poista. Oma osuus: JU 7,4 Gi (5 puuta), mm. julkaisija-postilaatikko 5,4 Gi.

## VIRHEET, JOTKA EIVÄT SAA TOISTUA
- Annoin PT:lle väärän summan (10 puuta ja 16 Gi, oikein 9 ja 14,4 Gi); oikaisin. Laske ennen lähettämistä.
- Oma siirtoskripti luki viittauksiksi oman koetuloksensa T/:ssä: kaikki merkittiin VIITATTU eikä mitään siirtynyt. Ei vahinkoa. Koetulos pois hausta.
- Kokeessa siirtolistalla oli venvejä; poistin ne ennen ajoa. siirra_t7.py:n EI_KOSKAAN-lista on hyvä lähtökohta.

## OPIT
- `mainissa`-tarkistus (is-ancestor) ei tunnista squash-mergeä, eikä proto-puu tule mainiin: älä päättele siitä, että puun saa poistaa.
- Rooli saa pyytää linjaa, mutta jaa vapaa linja: PK pyysi L2:ta, sai L1:n.
- Vapailla linjoilla rinnakkain ajo on nopeampi kuin rooli pyytää; ei Googlea rinnakkain.
- Sisältövienti 3f25f9fcf kaatui curl 56:een tarkistusaskeleessa (verkkokatko, en uusinut, seuraava vienti korvasi). Katso gh run list, jos vartija ei lähde.
- Linjan lukko vapautuu Monitorissa ennen task-ilmoitusta; AJETTU-rivi on jo lokissa.
