# PT:n luovutus 9.11.2026 klo 10.05 (tilinvaihdon jälkeen; PT local_8d8ebf72)

Korvaa -20261109-0925:n JUNA-, SEURAAVA- ja AJOSSA-kohdat vain alla mainituilta osin; sen OPIT voimassa.
Viestit: mcp__ccd_session_mgmt__send_message id:llä (osoitekirja). Junarivit juna.py, työlista tyolista.py.

## TILINVAIHTO VALMIS (9.11. 09.5x–10.03)
Tili sami.reivinen@vvi.fi (org ddaee6a2, Ultra), viikko 0–1 % (nollautuu 16.11. klo 03). RAJA 99 % (omistaja 09.58 kortti) →
Postivahti hälyttää 96/99 %. Taulu R6VQFTUNq629zSzah719Uy (Asemataulu v19). 10 roolisessiota tyhjennetty + aloitettu, id:t osoitekirjassa
(PR 6510). RC vain KK. tilinvaihto-valmis 0, ohjeiden koe 10/10 (7.47 KAIKILLE + 4.48). Yösiivous: matkakirja-simu-yosiivous-2 (04.04).
Sisältökirjuri ja Äänittäjä: osoitekirjaan tämän tilin (levossa olevat) sessiot b9ca71c7 / 726ba209, ei tyhjennetty eikä aloitettu.
Kotikansiot: jäljessä olevissa (JU, KS, VS, posti, aanittaja, laitetestaaja, sisaltokirjuri) CLAUDE.md = main.

## JUNA 223 AUKI (ei julkaisua ennen omistajan pyyntöä), kärki 4e972eeed
Ennen TF:ää:
- PK suunta 84521ba9b: JU ajoi x3 (09.34–09.46), PT katsoi (ok omistajan sanoja vasten), viety KK:lle 10.0x omistajalle.
  OMISTAJA 10.03 Kelpaa (Suositus); ennen junaa PK korjaa: iPhone pystyn kierrossa pää ~1,1 s ruudun ulkopuolella, vaakaohjeen
  loppu ohjausympyrän alla, kattokaistale → Mac-ajo JU x3 → PT → JU poimii (viesti PK:lle 10.0x).
- Leijuva kattotiilikaistale (näkyy myös suuntakuvissa): PK e4a5b8af7 luotain, JU:lta sk-kattokaistale2 → lokit/pk-kaistale2-iphone-e4a5b8af7;
  tekijä (LAV mallivika / PK karsinta) PK:n tuloksesta.
- 1c kallistus omistajalle (KK).

## AJOSSA
- NUI paikkapalkki: d87530c60-ajossa Kartta.uss putosi (rebase) → korjaus 6125c9852 (natiivi-ui/paikkapalkki), JU:lla uusinta → PT katsoo.
- NS matkalento 5ca18c629 (Pariisi→Carcassonne 4,54 s, huippu 808 km); laskun viimeiset 0,3 s beigeä → PT antoi luvan AjoEnnakko
  myös matkalentoon; NS:ltä valmis-rivi + lasku-kuvat k250–265.
- VS: merenpohja 97b4f29a9 ja vesi 92f93a82f tehty 8.11.; JU:lta Mac-ajot vesikerros2 92f93a82f + kohokartta-ilmavalo (3 runkoa);
  posti ja filmiraekysymys: origin/linssiseppa2/luovutus-20261108-0855:docs/raportit/posti-valoseppa-20261108.md (kohta 7 PT:lle avoin).
- Asemataulu: työlista 119 työn alla (raja 15), moni VANHA 25–39 h, junat 56 h → seuraava PT siivoaa työlistan (tyolista.py valmis/tilanne).
- KS, LAV lepo. KK: nostojen 3D-suunnitelma omistajan kanssa (ei töitä ennen sitä).

## PAIKALLISET
PT:n checkout main (ff 15e6b0095); stashit peili-ennen-ff(2)-20261109 ovat vanhoja peilikopioita (peili.sh tekee uudet), saa jättää.
Peilin osoitteet.md/tyolista.json-erot paikallisesti (osoitteet: raja 99 %), commit seuraavan peili-PR:n mukana.

## OPIT
- tilinvaihto-valmis lukee PT:n paikallista checkoutia: ff origin/mainiin ennen tarkistusta (219 committia jäljessä → vääriä PUUTE-rivejä).
- Yösiivouksen taskId on varattu toisen tilin kansiosta → -2-pääte; ajastus on tilikohtainen.
