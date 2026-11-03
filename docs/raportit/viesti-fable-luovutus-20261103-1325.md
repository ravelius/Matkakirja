# PT:n luovutus 3.11.2026 klo 13.25

Edellinen: viesti-fable-luovutus-20261103-1050.md. Osoitteet: /Users/Shared/Claude/osoitekirja.md. Syy: konteksti 30 %.
Vahdit Monitorilla 30 min: /Users/Shared/Claude/hooks/codex-posti-vahti.sh ja odottajat-vahti.py (grep ODOTTAA|TYHJÄKÄYNTI; viritä uudelleen).
`date` ennen aikaleimoja. Työlista päivitetty 13.2x asti (tools/asemataulu/tyolista.py).

## OMISTAJAN PÄÄTÖKSET (KK:n kautta)
- 13.11 (kortti): saapumisnäkymän loppurajaus kohteiden mukaan – kuvat nousevat näkyviltä paikoiltaan eri puolilta kaupunkia
  (Lontoo ~2,5× laajempi); yläraja, sen yli kuva reunalta oikeasta suunnasta; piirroskaupungit ennallaan. NUI teki 8afe28dfa.
- 10.38 ennallaan: PIENEEN IPADIIN YKSI ASENNUS, kun kaikki valmista ja KK katsonut.
- PT:n päätös 12.59: saapumisen pikkukuvat vain lähizoomilla (Big Benin portti).

## PIENI IPAD (pääasia)
- JU:n yhdistelmä 0c103c3a9 (worktree /Users/Shared/Claude/wt/julkaisija-yhdistelma-218) = runko 1420265d7 + KS 7eebf233c
  (Big Ben lähellä, Pariisi v5 -tasot, 16 siltaa, lähin zoom 3,5 km, 19 kylttisiirtoa) + NUI 54897ab16 (reitit valitessa)
  + 8afe28dfa (loppurajaus) + NS 8e855c8d9 (Pariisin paluu terävä, SaapumisTerava odottaa piirrosta, z17-reunus 0).
- NUI-simu L1:llä 13.2x, NS:n kylmä Lontoo + paluu Pariisiin -simu L2:lla perään. PT tarkistaa → KK katsoo → PT antaa JU:lle
  "ASENNA pieni iPad". Tarkistettavaa: reitit valitessa (KK 12.59 EI OK aiemmin), kuvat eri puolilta (Lontoo), Pariisin paluu
  terävä ennen traileria, Lontoo kylmä (iPadilla terävä 2,6 s zoomauksesta).
- Iso iPad: runko 1420265d7 (12.16), roolit palauttavat sen.

## JUNA 218 (JU vie; uusi JU tarkistaa ettei mikään jäänyt)
- NS lahto-tulo-218: 9613f5ad7 + ca505e175 + 299b767f4 (lähtö ilman beigeä, KK ok).
- LAV osasarja-v9 (PK f8dd0bcaa). PK kameran sivusuoja 5238f873c + c50c8c5ee (218ac). 218z (eb2b057bc) jo junassa.
- Ei junaan: LAV v10 (reunakivi liian valkoinen → v11 tulossa), VS kontaktivarjo (k5 ed5dbfe9e mittauksessa: piha +4,4 ms k4:llä).

## ROOLIEN JONOT
- NUI (nollattu): simu → PT. NS (nollattu 13.1x): maxRenderTextureSize-rajaus, sitten striimikartan vieritys 60 fps iPadilla.
- KS: 58 kaupungin esittelypaikat (20/58) → PR. LAV: v11 reunakivi (harmaa laattakivi) + editoripari; Meridiaaniportti
  v119/c2-v35 JU:lla vietävänä (kaikki aukot auki, sokkeli 3,0 m).
- PK (nollaus Postivahdilla): ys-218ad-video 6–8 s → junaan jos ok. Tripo: vedenkantaja fill_right/fill_left sovittu (e158d35fe).
- VS: k5-mittaus JU:n vuorolla → PT.
- JU: nollaus kun lisäys pushattu (aloitusviestissä yhdistelmä + junakuittaukset).

## TILI
- vvi@vvi.fi viikko 89 % (13.13), ~1,6 %/h → 99 % ~19–20. Koodaustili: 99 %:ssa yksi rivi omistajalle (KK), ei keventämistä.
  Ehdokkaat: päätili (nollautui 2.11.) tai sami.reivinen@vvi.fi; omistaja valitsee. Ohje docs/tilinvaihto.md.
