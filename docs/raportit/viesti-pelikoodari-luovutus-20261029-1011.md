# Pelikoodari: luovutus 29.10.2026 klo 10.11 (PT: viikkoraja 97 %, tauko 2.11. klo 03 asti)

Seuraava Pelikoodari jatkaa tästä. Muisti: pelikoodari-tila-20261018-aamu.md (UUSIN). Edellinen luovutus -20261029-0939.
Proto-haarat ovat peilissä natiivi-backup peili/proto/pelikoodari/<haara> (drone-214 9636c167c, rikotut-214 ecc57878d, pk7-214 20c32559f).
Lokien kameratiivistys: `python3 -I /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/parkour-20261027/kamerarivit.py <konsoli-stdout.log>`.

## Valmista
- KUJA 05 JUNASSA 214: pk7-214 20c32559f + LR v65 (JU vei ämpäriin 09.46), runko natiiviseppa/juna-214 = 890ee26e8 (NS, testit vihreät).
  drone-214 ja rikotut-214 sopivat uuteen runkoon ilman ristiriitoja (merge-tree).
- NIMET: rikotut-214 ecc57878d = omistajan 08.55 lista (KK:n sanatarkka lista, 14/14 yksiselitteisesti; 7 muuttui: Cloisonné, Kello,
  Sinivalkoinen maljakko, Keltainen maljakko, Turkoosi ruukku, Teeastiat, Rubiinilasit). NUI:lle kerrottu.
- DRONE j d7c7e5402 ajettu (lokit/todistus-drone214j-d7c7e5402-20261029-0939): U-käännöksen portti t-portti-120 ≤ 3,2 m/s, 2. portti
  2,3–2,8 m/s; PT hyväksyi 4 m/s:n rajan U-käännöksellä. Sonnet: ei hyppyjä/väläyksiä/jähmettymiä, MUTTA 119,1 s katto poksahti
  (katon piilotus kynnyksellä hetkessä) → PT: korjaa ennen junaa.
- DRONE k b495e4a7f ajettu (…drone214k-b495e4a7f-20261029-0958): nostot OK, MUTTA mittari "KATTO/SEINÄ KATOSI" 46 (j: 0) – reitin 2,9 m:n
  ennakko piilotti avointen hallien kattoja keisarin ollessa 5–7 m ulkona.
- DRONE l 9636c167c (JU:lla käännös + simu, skriptit parkour-20261027/kaanna|aja-drone214l-9636c167c.zsh, video 145 s):
  KattoHaivytys.EnnakkoRaja – vain läpikulkukatot (portit, avoimet hallit) häipyvät ennakosta, kun ennakkopiste on katon omalla rajalla ja
  Puyi ≤ 1,5 m sen ulkopuolella; talot kynnykseltä; häivytys 0,2 s (JuoksuSokkeloMaailma.PalatsiKattoS/PalatsiKattoEnnakko).
  Testi PalatsinKattoHaipyyEnnenKynnysta. Peli 764/764, unity 0.
- HARMAA LATTIA (j 117,7–121,8 s) = t-portti-120:n V4_marmori-yläpinta 512 m² (peli antaa marmorin, 13 m:stä tasaisen harmaa) →
  LR nimesi tunnelin/terassin vaakapinnan V4_lattiaksi (120, m15, m216) rakennukset-v122 → v66:ssa kielletty-rakennukset-v50.
- PORTTIOVET 05/02: ovet olivat mallissa staattista geometriaa (vain p-kujaportti-3:lla saranasolmut) → LR korjasi mallissa v121,
  koodimuutosta ei tarvita. (Kääntösuunta koodissa: Osamallit.cs PaivitaOvet, mallin paikallinen ±Z.)
- CODEX: tilaus 5 uutta muistokuvaa postilaatikko b340dd473 (posliinimaljakko, lakkarasia, jadeastia, kello, kääretaulu: kuvassa eri
  esine kuin pelimalli; 768×1024, ei soikiota; KK 09.57). Toimitus KK:lle, peliin vasta omistajan valinnan jälkeen.

## Odottaa
- JU: drone l -ajo. Tarkista: `grep -c "KATTO/SEINÄ KATOSI"` = 0 (tai vain ≤ 2,2 m), nostot kuten j/k (t ≈ 70–77 ≤ 4 m/s, t ≈ 87–96
  ~2,5 m/s), video t-portti-120:n katto häipyy (videoaika ≈ t + 44 s). Sitten Sonnet tarkistaa videon → PT → KK → juna 214 omana eränä.
  Jos raja estää agentin: tarkista itse ffmpegillä muutama kuva noston kohdalta.
- LR: v66 (tausta v106 = koko kuja 05, rakennukset v121 ovet + v122 lattiat = kielletty-rakennukset-v50) KK:n OK:lla. Sitten
  juuri-pk7-v66 (kopioi juuri-pk7-v65 -RP, vaihda tausta ja rakennukset), TaustaKansio/RakennusKansio pk7-214:ään juna-214 890ee26e8:n
  päälle, uusi pari → PT → KK → JU.
- Codex: 5 muistokuvaa → KK.

## Jatko keskeytyksestä
- Taustaajoja ei ole (JU ajaa drone l:n). Worktreet puhtaat: wt/proto-pelikoodari-kaapu-213 (drone-214 9636c167c),
  wt/proto-pelikoodari-rikotut-214 (ecc57878d), wt/proto-pelikoodari-pk7-214 (20c32559f).
- SendMessage-raja täynnä → viestit varakanavalla mcp__ccd_session_mgmt__send_message.
- Peli-testit: `bash Peli-testit/kaanna.sh` (ei zsh: sanojen jako). Postilaatikkoon ilman worktreetä: scratchpadin posti-commit-malli
  (GIT_INDEX_FILE + commit-tree; zsh:ssä `${C}:refs`, ei `$C:refs`).

## LISÄYS (PK 29.10. ~10.30): drone l ajettu, mittarin syy löytyi → drone m 284cfe49e (ei simua ennen viikkorajan nollausta)
- l (lokit/todistus-drone214l-9636c167c-20261029-1010): nostot OK (t-portti-120 ≤ 3,3 m/s, 2. portti ≤ 2,8 m/s), "ladattu 283, puuttuu 0",
  MUTTA mittari KATOSI yhä 46 samoissa kohdissa kuin k. Syy EI ollut ennakko: Puyi on hallin/portin sisällä, ja katon osa palaa
  (Linjalla päättyy → Haivytetty pois) häivytyksellä 0,2 s; ensimmäiset 0,1 s Peitto < 0,5 → mittari laski. KestoS 0:lla paluu oli heti 1.
- m 284cfe49e (drone-214, peilissä): mittari ohittaa katon, jonka Haivytetty = false (palaamassa). unity 0. EnnakkoRaja 1,5 m (l) jää.
- Seuraavaksi (viikkorajan nollauksen jälkeen): käännä + aja m (kopioi kaanna|aja-drone214l-9636c167c.zsh ja simu-drone214l.txt
  → 284cfe49e/drone214m), tarkista KATOSI 0 ja nostot kuten l, sitten video Sonnetille (katto häipyy t-portti-120:llä, videoaika ≈ t + 44 s)
  → PT → KK → juna 214 omana eränä.
