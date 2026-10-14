# Linssiseppä 2 – luovutus 14.10.2026 aamu (07.2x Suomen aikaa), nollaus (PT: konteksti 83 %)

Luovuttaja: Linssiseppä 2 (Opus, high). Edellinen: viesti-linssiseppa-2-luovutus-20261014-0145.md, välitila viesti-linssiseppa-2-valitila-20261014-0322.md
(sen PÄIVITYS-osiot 03.22 → 06.3x kertovat yön kulun).

## Lue ensin
1. `CLAUDE.md` (agentit vain Opus/Sonnet, VAIN EUROOPPA, AIKA). 2. Raamattu Ydinajatus kohta 2 "TYÖTAPA JA SESSIOT". 3. Tämä raportti.
Julkaisija antoi yöllä luvan ottaa vapaan käännöslinjan ja oman simun (kun < 2 käynnissä) ilmoittaen; tarkista Julkaisijalta, onko lupa voimassa.

## ETUSIJA: TEOSVALOTUS (PT 14.10. 06.4x, omistajan sanatarkka palaute delfthdr2-kuvista: "Nuo ovat kumpikin ylivalottuneita")
Tavoite (PT): maalaus pelissä = lähdekuva (keskiluminanssi ±5 %, tummin 10 % tummana, sävy), kaikki museot (Alankomaat + Ranska).
Todiste: rivi lähdekuva | nykyinen 189 | korjattu per teos (Delft, Tyttö, Yövartio, Mona Lisa, Maitotyttö), iPad + iPhone. Junaan 189, jos ehtii.
Jako LS1:n kanssa (LS1 vahvisti 06.4x): LS2 = teoksen varjostin, sävykartoitus, mittaus; LS1 = salin valot, keilat, kehykset (ei koske teoksen
varjostimeen; f7679f89d:n _MuseoTeosValotus saa kumota/korvata).
- Haara `linssiseppa2/teosvalotus-189` **0eb5b720b** (pohja natiiviseppa/juna-189 4a2dc5d82; worktree /Users/Shared/Claude/wt/proto-linssiseppa2-koopenhamina).
  MuseoValaistu.shader: AgX-tilassa teoksen (_TeosKeski.w > 0) näytön arvo = kuva (lineaari) × _MuseoTeosKirkkaus (1) × salin himmennys,
  min 0,95 → käänteinen AgX × 2^−MuseoEV (keilat, haja, kiilto, lakka ja kankaan sävy eivät enää vaalenna). A/B `museo teoskirkkaus vanha|<k>`
  (vanha = juna 189:n valaistu polku), mittaus `museo teosruutu <id>` (kankaan nurkat ruudulla 0–1).
- Mittaustyökalu: /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/teosvalotus/teosvalotus.py <todistuskansio> <lähdekuvakansio> (PIL,
  lähdekuvat seina-jpg:t scratchpadissa; lataa uudelleen: https://media.matkakirja.app/taidemuseo/<maa>/lahde/kuvat/seina/<tiedosto>.jpg,
  curl tarvitsee -A "Mozilla/5.0 Matkakirja"). Tulostaa keskiluminanssin, p10:n ja sävyn ja rivi-PNG:t <todistus>/teosvalotus/.
- Ajot: teosvalo1 (f564bf97d) EI KELPAA: museon valintasivu (NUI 7ddead7c1) jäi kuvien eteen. teosvalo2 = sama käännös, skenaario valitsee
  salin (Yövartio-sali / Louvren klassikot) → _tyo/linssiseppa2/teosvalotus/sk-teosvalo2-*.txt, ketju-teosvalo2.zsh (ei käännöstä, app
  lokit/linssiseppa2-app-teosvalo1).
- TULOS teosvalo2 (lokit/todistus-teosvalo2-ipad-20261014-0714/teosvalotus/): MONA LISA iPad todistettu: 189 = +200 % keskiluminanssi (haalea),
  korjattu −4 %, sävy sama (r/g 1,40/1,39, g/b 2,52/2,57) → PT:lle lähetetty 07.3x. ALANKOMAAT EI MITATTU: iPadilla Rijksmuseumin lähestymisen
  kuvasarja (valokuvat julkisivusta) jäi ruudulle – "Astu sisään" ei vienyt sisään ennen teleporttia; iPhonella 'Yövartio-sali'/'Siirry
  näyttelyyn' puuttuivat ui-puusta. SEURAAVAKSI: korjaa skenaario (katso vanha toimiva sk-monalisa2-ipad.txt kansiossa
  _tyo/linssiseppa2/taidemuseo-ranska: odota-tila / oleta-rivit lähestymisen ohitukseen), aja teosvalo3 samalla appilla, mittaa, lähetä PT:lle
  rivit (Delft, Tyttö, Yövartio, Maitotyttö + Mona Lisa iPhone), sitten NS:lle 0eb5b720b junaan 189 PT:n kuittauksella. Jos jokin teos jää
  ±5 %:n ulkopuolelle, säädä MuseoNayttamo.TeosKirkkaus (globaali) tai teoskohtainen kerroin.
- Huom. mittauksessa: "museo teos <id>" teleporttaa katseluasentoon; kuva-ala ja vinjetti voivat vaikuttaa reunoihin (työkalu rajaa 6 %).

## TELAKOINTI (PT: LS2 + PK; PK kytkee, LS2 malli/kamera/valo)
- LS2 `linssiseppa2/telakointi-190` **a6b65f315** (Iss/Telakointi.cs, RakettiMalli.AsetaTelakointi/TelakointiPois/TelakoinninYovalo, NousunVaihe.Telakointi,
  testit TelakointiTestit). PK `pelikoodari/telakointi-190` kärki f7d398b4a (kertojaklippi iss-kupoli-v2.json, KentanKerroin kytketty 75d1db97a,
  origo ISS:lle ja palautus Cupolan mustan alle 1fea7e124). PK ajaa äänellisen telakointivideon PT:lle.
- Simut lokit/todistus-telakointi1–4: 10 s:n telakointi toimii päivällä ja yöllä (valonheittimet); telakointi4 (c225440ec = 75d1db97a)
  kuva-ala kapea → asema ja kapseli suurempina. AVOIN PK:lle: telakointi4:ssä yksi sininen kehys yhä ennen Cupolan mustaa (videon ~57 s, 1 fps).

## MUUT TÄNÄ YÖNÄ (valmiit)
- Raketti-paketti KUITATTU junaan 189: NS:lle ed26d18b1 (+ f3b8c7160 Avaruus: ilmakehän kuoret maan keskelle → Cupolan ilmakehän reuna, todistettu
  savu16). Kevyt pallo (PK V2) `linssiseppa2/kevyt-pallo-190` 98d4de0f3 (PK yhdisti iss-kupoli-190:een ja telakointiin).
- Valkoiset laatat Cupolassa (kevyt1 k00, Tyyni valtameri): ei toistunut; diagnoosihaara `linssiseppa2/valkoiset-laatat-diag` 9aa02540f (ei junaan).

## Ketjut ja lokit
_tyo/linssiseppa2/{raketti-savu, telakointi, kevyt-pallo, valkoiset, teosvalotus}/ketju-*.zsh (+ .log), skenaariot sk-*.txt.
Julkaisijalle aina LUKKO VAPAA / SIMU VAPAA. Taustalla ei jää ajoja luovutuksen jälkeen (tarkista: ps -ax | grep ketju-).
