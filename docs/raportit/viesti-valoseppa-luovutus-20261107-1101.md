# Valosepän luovutus 7.11.2026 klo 11.01. Itsenäinen: vanhoja ei tarvitse lukea

Syy: konteksti yli 30 %, tauko (PT:n ja KS:n vastaukset odottavat). Tili vvi@vvi.fi. Natiivirepo `/Users/Shared/Claude/proto-3d/Matkakirja-proto`, etä `natiivi-backup`, worktree k31 = `/Users/Shared/Claude/wt/proto-linssiseppa2-k31`, k17 = pariisi-valo. Kuvat vain JU:n vuorolla (`local_06f8c680-4618-42bd-a730-9b6a3e17e0b7`). Kansio `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/kivisivu/`, luvut `MITTAUS.md`.

## 1. TYÖ NYT: kaksi odotusta
**A. Kivet: PT:n vastaus.** Kysyin PT:ltä 11.0x: kelpaako Mac kivisivu13:lla ja saako pieni iPad-ajon. EI KOLMATTA Mac-ajoa (PT). Pieni iPad vasta, kun PT sanoo Macin kelpaavan; siinä myös liike yli 5,8 s (PT).
Tulos, polku `kuvat-kivisivu13/`, parit `pari-*-kivisivu5-13.png`, dc4b1c69c julkaistuilla paketeilla: pelia ja rako0 samat kuin hyväksytyt (ruskea sivu hieman ruskeampi; rako0:n odota-maailma aikarajassa, PUUTE). Paaty yhä eri, lataus valmis (näkyvät 3238): lattia korkealla, vasen kivi kapea kaistale, oikea kivi ei näy. Hyväksytty paaty oli vain koejuurella (kivisivu2, 4, 5 kaikki koejuurilla), joten syy paketissa. Julkaistuilla paketeilla ei ole paatyn ennen-kuvaa, joten muodon uutuutta ei ole todistettu. Kivikoodin diff 3ba5bb57e..dc4b1c69c on 4 tiedostoa, 10 riviä valoa ja varjostinta, ei luettu rivi riviltä.
kivisivu12:n paaty (botti ensin, 3 s hypystä) on lataustila, ei vertailukelpoinen. Sen kujan alku alku-0.jpg: yläpinta (61,62,78), sivu noin (142,122,110) = kivisivu7; tummuminen tulee koodista, ei koejuuresta.
**B. Usva 16 km (omistaja 10.50, PT): 02516c056, haara linssiseppa2/usva-16, pohja 00dea49d1.** Kartta-testit `sh kaanna.sh PariisiKallistus` 21/21. merge-tree ajo-yhteinen-44:ään ei ristiriitaa. Rivi KS:lle lähti 11.01 (`local_740947d7-aa79-4b1e-948e-1b7dfc734364`). Ei omaa ajoa, ei junaan. Kun yhteisen ajon kuva on katsottu: **2 riviä PT:lle.** Vertailukuva KK:n scratchpad/keskustelukanava/kuvat/usva-12-16/usva-12-vasen-16-oikea-1000.jpg. Jos tieto ei kulje, tarkista KS:n haarat.

## 2. KIVET JA IPAD
Junakelpoinen dc4b1c69c, haara linssiseppa2/kivet-juna, pohja 3ba5bb57e. EI junaan eikä vientiin ennen PT:n sanaa. Omistaja 09.31 kelpaavat (kivisivu5, koejuurella, parit paaty ja pelia). 5b5da152c = sen päällä kehityskomento palatsi mallit dokumentit/<kansio>, vain iPad-ajoihin.
kivisivu10 iPad (kuitattu PT 10.24): 13/13, ei kaatumista, huippu 4614 Mt, raja 4080 ylittyi, vapaa pienin 510. Rajalla ei saumaa tarkastelukamerassa, botin osumaa ei todistettu. Ei väreilyväitettä. Kynnyksen kansi ja siru botti-7: LAV, älä tutki (PT).
Koejuuret koejuuri-kivisivu2 ja koejuuri-v115pala jäävät ison iPadin Documentsiin seuraavaan sovelluksen poistoon (PT); ei poistokomentoa, ei sovelluksen poistoa. Koodihaun mukaan ei lueta ilman komentoa; JU tietää.
kivisivu11: oikea suorakaide ja kiven yläpinta sivua tummempi olivat jo ennen kiviä; rivi KK:lle lähetetty (jonossa).

## 3. MUUT AVOIMET (ennallaan)
Neliöselvitys PERUTTU (omistaja 10.57, KK:n suunnitelma); älä tutki. Muisti ei minulle (PT). Tumma kolmio LAV. Rappaus 2e1d2b87d PT:llä. Sacré-Cœurin kaista ja Panthéonin aukio vaativat talojen palautusta (KS). iPad-mittaus ääriviivoista ennen junaa, ei yöllä. PT:n sana, viedäänkö pariisi-valo Y:hyn. Lontoo: sarja kelpaa (e973cef98, k32), heikot KK:lla.

## TEKNIIKKA
Numpy, cv2 `/Users/Shared/Claude/proto-3d/_tyo/venv-rembg/bin/python -I`; PIL `/opt/homebrew/bin/python3`. `sh`, ei zsh: kaanna.sh ja unity-tarkistus.sh. zsh: $R:A on muunnin, käytä ${R}. Skenaario ilman kuvia antaa esikatselusta väärän VIKAn; aja-kivisivu12/13 korjaa videon ffmpegillä. Kuvat ennen tarkastelukameraa: odota 10 + odota-maailma 180 100 + odota 3 (kivisivu13). Botti ennen tarkastelua jättää palat latautumatta. iPad-ajuri `julkaisija-tyokalut/ipad-skenaario-f1.zsh`. Seuraamattomat `.claude/settings.local.json.ennen-kevennysta` ja `waveletNoiseTile.bin`: ei koskettu. Kotihaara jäljessä: luovutus plumbingilla origin/main-pohjalta.
