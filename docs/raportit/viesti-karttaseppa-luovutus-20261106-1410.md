# Karttaseppä: luovutus 6.11.2026 klo 14.10 (KS)
Syy: konteksti 25 %, luonteva tauko: ajot 16 ja 17 katsottu ja jaettu, mikään ajo ei käynnissä. **Voittaa -1308:n ristiriidassa.** Kaikki kokeena, ei junaan, ei iPadia. W = /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219 (kärki 6e4be4fed). Y = /Users/Shared/Claude/wt/proto-karttaseppa-yhteinen (kärki 1c376ecc5, natiivi-backup karttaseppa/ajo-yhteinen-tasoitus).

## ENSIN
1. Vahti Monitorilla: `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min, viritä uudelleen).
2. Ajo 18 odottaa: skenaario `_tyo/karttaseppa/sk-pariisi-yhteinen-18.txt` (5 kuvaa, VS:n Pompidou-kamerat ilman ui pois -komentoa) on valmis, EI tilattu. VS: "seuraavaan yhteiseen ajoon, ei omaa ajoa". Muuta ajettavaa ei ole. Tilaa vasta, kun joku pyytää yhteistä ajoa tai VS/PT sanoo, että se ajetaan yksinään. Lisää silloin uudet kuvat skenaarioon ja päivitä otsikon runko-sha.

## AJOT
- **Ajo 16 (lokit/karttaseppa-yhteinen-16-b8-897a461de, parit _tyo/karttaseppa/parit-yhteinen-16):** Y = b4dcbdeb3 + VS c3c1597ce. Eiffelin haamu pois 75°:ssa; VS kuittasi. Löytyi: ND:n portaalista näkyi takana oleva puu.
- **Ajo 17 (lokit/karttaseppa-yhteinen-17-b8-1c376ecc5, parit _tyo/karttaseppa/parit-yhteinen-17):** Y = + VS f26fed3af (Pompidou) + VS a9a0bfd89 (ND:n juuri peittävä). Shader error 0, error CS 0, 12/12. ND kuitattu (VS katsoi itse). Eiffel 75 ei palannut. VS hyväksyi Eiffel-tuloksen.
- **Eiffel 85b:** rivit ajoista 15, 16 ja 17 käytännössä samat (suurin ero 29). Torni näkyy taivasta tummempana. VS: erillinen kysymys KK:lle, ei este ajolle; VS:llä.
- **Puut:** kauko-85:ssä sulautuvat usvaan; nd-85:ssä yhä mallia selvästi tummemmat kuten ajossa 10. VS ei korjannut.

## AUKI
- **+13-vaaleus:** ajon 17 po-ita (ajo 16:een) ja po-la (ajo 15:een) koko kuva +13/+12/+9 RGB. Ilman ui pois -komentoa ajetut pr-pohjoinen ja nd-85 eivät vaalenneet. Epäily ui pois, EI todennettu. Muita neljää saman lohkon kuvaa ei mitattu. Ajo 18:n po2-la ja po2-ita ratkaisevat: vertaa ajon 17 samannimisiin po-la/po-ita:an (mittaa-vaaleus.py parit-yhteinen-17:ssä), kerro VS:lle. Jos ui pois vaalentaa, pelin tavallisen kuvan päällä on jokin tummentava kerros: voi kuulua PT:n ja KK:n tummuusasiaan.
- **Louvren pääty:** arvio po2-ita:sta (VS). Ajon 17 po-ita ei kelpaa väreihin.
- **Pompidou:** VS: po-sama ja po-sama-lahi pikselilleen samat (korkeus 0,0013 ja 0,003, kallistus 85), syy selvittämättä; siksi uudet kamerat. Pompidou-kuvat VS katsoo, KS ei katsonut. KK:n sana odottaa.
- **KK, parit lähetetty 12.1x:** kun KK ei kumoa, koepaletti-komento pois W:stä (Nahtavyysalue.KoePaletti, Komennot.cs:803), seuraavaan yhdistykseen.
- **VS:** kärkilaskenta tuplaantuu nähtävyyksillä (kaksi passia), iPadilla mittaamatta. Junaan ei ilman mittausta.

## MUUTA
- Parikuvien ja mittausten skriptit: parit-yhteinen-16/tee-parit.py, tee-rajaukset.py, parit-yhteinen-17/tee-parit.py, mittaa-vaaleus.py. Aja /opt/homebrew/bin/python3 ilman -I:tä (numpy ei löydy -I:llä). Kuvat ovat 2752 × 2064.
- sk-usva.txt:n vanhat kamerat us-eiffel-85 (Louvre peittää) ja us-silta-85 (ei siltoja) eivät kelpaa; käytä 85b-kameroita (sk-pariisi-yhteinen-10.txt, -17.txt). Ajossa 16 ne menivät hukkaan.
- POIKKEUS 1 kpl joka ajossa `ui sulje` -komennolla (ArgumentOutOfRangeException), JU tietää; ei pysäytä ajoa.
- JU:lle tilaus: UNITY b8, runko, skenaario, loki karttaseppa-yhteinen-NN-b8-<sha>. Kokeena, ei junaan, ei iPadia.

## Oppi
Toisen roolin kuvalistaa ei voi ajaa sokeasti: katso ensin, onko sama kuva ajettu aiemmin eri kameralla (85b-nimi kertoi korjatusta kamerasta). Vain parhaiten päivitetty skenaario kelpaa lähteeksi. Muutoksen vaikutus kannattaa katsoa myös sellaisista kuvista, joita ei pyydetty: ND:n vika löytyi vain, koska usva-listan muut kuvat otettiin mukaan.

## LOPPUTESTIT (siirrä tämä osio jokaiseen uuteen luovutukseen)
Repon mainissa ei ole yhteistä lopputestilistaa (PT 01.5x). Tämä osio on lista, kunnes PT muuta sanoo.
1. Saapumislento laitteella (2.209, KK, kirjattu PT 01.5x): mallit syntyvät noin 11 km:ssä; jos tarkempi maastotaso ei ole vielä ladattu, kohde voi hetken istua väärällä tasolla. Vain laite näyttää.
