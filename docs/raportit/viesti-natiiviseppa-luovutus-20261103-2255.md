# Natiivisepän luovutus 3.11.2026 klo 22.55 (konteksti 30 %, 7.37)

Vain voimassa oleva tila. Korvaa luovutuksen viesti-natiiviseppa-luovutus-20261103-2224.md. 1622-luovutuksen TILA-osio on yhä voimassa:
`git show afbe75860:docs/raportit/viesti-natiiviseppa-luovutus-20261103-1622.md`. Id:t: /Users/Shared/Claude/osoitekirja.md.
Cron Unity-beeta: luo uudelleen ("4 9 * * *", muisti unity67-paivitysseuranta). Omia taustaajoja ei ole.
EI testejä eikä Kartta-testejä, kun `pgrep -fl "[e]sikatselu.sh|[U]nity -batchmode"` näyttää ajon (JU pyysi erikseen 22.5x; hakasulut pois, muuten pgrep -f löytää oman komentonsa).

## YÖTYÖ (PT, omistaja 22.31 "Koita saada Pariisin kartta tehtyä kokonaan"; suunnitelma Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261103-pariisi-ylaviisto-ja-osakirjasto.md osio YÖ 3.–4.11. kohta 3)
Sijoitat hyväksytyt nähtävyysalueet peliin sitä mukaa kuin KS tuo ne (väliaikaiset kuvat pois kohde kerrallaan), raivaus alta; puut, sillat ja veneet samaan 60°-kulmaan. Pelikuvat JU:lta → PT → KK.

## TILA
- Haara natiiviseppa/koealue-elava-218, wt/proto-natiiviseppa-maskik4 (proto-repo, ei origin-etäpäätä), kärki **7cac734dd**:
  VS d64f74a56 + 5bfa0e684 (maskiraivaus) + ND k4 laiva kokonaan + puut 60° + junan runko 7f0ccc451 (veneet, linnut, pallo koealueella: PiirrosPohjana && !Koealue, Saapuu ilman ennakkoa) + 993075f27 (HdV, TSJ, Oikeuspalatsi k = 1, ND:n julkisivun edusta raivattu rantaan, RaivausVersio tiilivälimuistiin) + Louvre.
- JU:lle pyydetty 22.54 (viesti voi olla jonossa): vie isoisa-2029/esine/pariisi/louvre-alue-v1.png ämpäriin (kohtaamiset/piirroskartta/kartta-osat/) ja aja 7cac734dd 993075f27:n tilalle, jos se ei ole alkanut; sk /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/aluekuva-nd/sk-koealue-elava.txt; kuvat PT:lle. Jos ajo oli jo 993075f27, 7cac734dd vielä erikseen.
- Viety ämpäriin (JU kuittasi): notre-dame-alue-v2.png, puu-60-v1.png.
- AJAMATTA: Kartta-testit 993075f27:lle ja 7cac734dd:lle (4819cd07b: 603/603; väliin tullut C#: RaivausVersio). Aja ensimmäisessä välissä, tulos JU:lle. Unity-kääntö vasta JU:n ajossa; virheestä JU ilmoittaa.
- Koealue ja junan runko on yhdistetty vain tässä haarassa; VS:n linssiseppa2/pariisi-tyyli ja koko-ajot (135e03994) eivät sisällä tätä. Seuraava yhdistys VS:n kanssa.

## Päätökset (PT/KK)
- ND pysyy. HdV ja TSJ eivät siirry eivätkä liioitellu, jäävät ND:n taakse; Oikeuspalatsille ei liioittelua (KK 22.4x). HdV:n nurkka pilkistää ND:n harjan takaa: kerrottu PT:lle; jos KK haluaa, HdV:n kuva pois.
- Kirkko leikattu KS:n kuvasta; Codexin ympäristöä ei käytetä, siksi raivaus = kuvan alfa (ei tilausmaski, joka tyhjensi saaret).
- Sillat: KS + Codex tilaavat 60°-osat (kivisilta-arkki postilaatikossa 30c0fffac), sijoitat OSM:stä, kun tulevat; siihen asti katuviivat.
- Louvre (1079 × 743 m, skaala 0,83) ylittää koealueen rajan pohjoisessa ~300 m ja lännessä ~130 m: rajan takana talot eivät raivaudu ennen VS:n koko Pariisia. KS voi kasvattaa skaalaa G:tä kohti (pohjoisessa ei nähtävyysestettä), uusi taso → `osakirjasto.py korvaa` + aja työkalu.

## Työkalut (_tyo/natiiviseppa/esineet/, ei gitissä)
- Uusi aluekuva: 1) rajaa taso alfaan, koko 4:llä jaollinen (rajaus4), talleta alueet/; 2) `_kirjasto/kartta-osat/osakirjasto.py lisaa --id esine/pariisi/<x>-alue --laji esine --kattavuus pariisi --kaupunki pariisi --tyyli isoisa-2029 --tiedosto … --rooli NS --tila lopullinen --ankkuri <lev//2> <kork//2> --kopioi`; 3) kaupunki-pariisi-k4vt-alue.json: nähtävyydelle `"alue_kuva": {"alue": <alue>.json, "taso": <taso>.png, "osa": id[, "vesi": <vesi>.png]}` (vesi = edusta raivataan rantaan); 4) `python3 -I tee-esineet.py kaupunki-pariisi-k4vt-alue.json /Users/Shared/Claude/wt/proto-natiiviseppa-maskik4`; 5) raivaus-kuva.py <pariisi.json> "/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-pohja/osm/solu-*.json" <ulos.png>; 6) commit, JU: vienti + ajo.
- Sääntö: kuvat nähtävyysesineinä esinekerroksessa, ei C#-muutosta. Säännöt saannot-isoisa-2029-60.json (puut esine/puu-60).
- Tarkistuskuvat ja yksityiskohdat: /Users/Shared/Claude/proto-3d/lokit/natiiviseppa-maskiraivaus-20261103/ (ALUEKUVA-ND-K4.md on ajalta ennen KK:n päätöksiä).
- Havainto: ND-kuva 1,58 m/px, kolmasosa Louvren vanhan kuvan tarkkuudesta; katso lähizoomin terävyys JU:n kuvista.

## AVOIMET
1. Moni kaupunki: toiselle ElavaKoealueelle KoealueenRaivaus-kutsu Laattapalvelin.Awakeen (nyt vain ElavaPariisi.Alue).
2. Vanha jono: 354 ms PostLateUpdate → xctrace (JU:n laitevuoro); GC-haara vasta PT:n luvalla.
3. Hylätyt, älä yhdistä: natiiviseppa/kertoimet-takana-218 (53bcfffb5), abc7c5ae5, natiiviseppa/maskiraivaus-218, natiiviseppa/maskiraivaus-k4-218 (sisältyy koealue-elava-218:aan).

## TILA (worktreet)
- wt/proto-natiiviseppa-maskik4 (nykyinen), wt/proto-natiiviseppa-raivaus, -kertoimet, -koealue: älä poista.
- Worktreet natiiviseppa-luovutus-2015, -1905, -1845, -1708 ja -20261103-1622 saa poistaa mergen jälkeen.
