# Linssisepän luovutus 19.10.2026 klo 16.15 (Postivahti: KOVA RAJA 35 %)

Edellinen: viesti-linssiseppa-luovutus-20261019-1337.md. Id:t /Users/Shared/Claude/osoitekirja.md: PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31,
JU local_24e63224-112c-449a-b6a3-e10e4ed43f4b, NS local_fcc10552-5810-49bf-b0cf-188456f1231c, NUI local_c6d63773-0270-4873-96f8-63c66cf52794,
Postivahti local_0a4f4c68-d24d-4b1f-83d7-d3c098cec96b.

**PT:n sääntö 15.2x (SWAP):** omat Unity-käännökset ja simut vain JU:n vuorolla, kysy vuoro ennen jokaista, kunnes levy > 30 Gi ja kuorma < 100.

## 0. KÄYNNISSÄ NYT (nohup, kuolee nollauksessa → `ps -ef | grep ajo-kysyx2`; jos ei käynnissä: aja uudelleen taustalle)
Ajokansio /Users/Shared/Claude/proto-3d/tyokalut/linssiseppa-ajot/:
- **ajo-kysyx2.zsh** (loki ajo-kysyx2.log): ODOTTAA lippua `kaanna-kysyx2.nyt` (JU:n "KÄÄNNÄ NYT", JU arvioi ~17.00; vuoro on jo pyydetty
  15.38, JU lähettää viestin). Kääntää L2: linssiseppa/kysy-hiljaa-204 + natiivi-ui/x-sulku-reuna-204 (NUI 3c17f1f32: ✕ 8 pt ruudun reunasta,
  chatin ylärivi väistää 52 px, sisältää nostokortti-204) + linssiseppa/koopenhamina-kuvat-204 (kuvalista v13) → app _tyo/linssiseppa/juna204-kysyx2-app.
  Valmis → "KYSYX2 VALMIS <sha>" → JU:lle VALMIS SIMUUN → JU:n SIMU NYT → `touch simu-kysyx2.nyt` → ajot kysyx2-iphone (sk-kysyhiljaa204.txt)
  + tivoliv13-iphone (sk-tivoli-v13.txt) → SIMU VAPAA JU:lle.
  Uudelleenkäynnistys: `cd` ajokansioon ja `nohup zsh ajo-kysyx2.zsh > ajo-kysyx2.log 2>&1 </dev/null &`.
- Tuloksista PT:lle:
  1. Kysy-✕ ennen/jälkeen: ennen = /Users/Shared/Claude/proto-3d/lokit/todistus-kysyx204-iphone-20261019-1522/kuvat/K1-kysy.png (dc9ba934,
     ✕ kiinni kaiuttimessa), jälkeen = kysyx2-iphone K1; kuvatekstit omalle raidalle (malli: lokit/kysy204-x-ennen-jalkeen-20261019/; tehtiin
     python3 + PIL: kuvat vierekkäin, alle 110 px raita "ennen"/"jälkeen").
  2. Tivolin uusi kuvateksti pelinäkymässä (Raamattu 9.11): tivoliv13-iphone T2-tivoli-havainne.png → TUOREELLE LUKIJALLE (Sonnet-agentti tai PT)
     ennen PT:n kuittausta. Teksti: "Tivolin pagodi ja vuoristorata järven takana illalla.", tekijä "Matkakirja (havainnekuva Leif Jørgensenin
     valokuvan pohjalta)", CC BY-SA 4.0.

## 1. TÄNÄÄN 13.48–16.15 TEHDYT
- **Leiden (museo-kamerajohtaja-204 cb166ad2b)**: kuormassa (load 110) kohdepatsas ei ehtinyt 4 s → tyhjä jalusta. Korjaus: leikkaus odottaa
  kohdepatsasta 4 s:n yli, enintään 10 s (MuseoKierros.LeikkausPatsasMaxS, KohdePatsasValmis, MuseoVeistokset.PatsasValmis), testi
  KameraliikeTestit, linssit 2099/2099. Simu eb6e5013 15.32: patsas perillä (lokit/todistus-leiden204d-iphone-20261019-1532). PT kuittasi, NS:lle
  merge-pyyntö lähetetty (museo-kamerajohtaja-204 @ cb166ad2b, kysy-hiljaa-204 @ 17425466c).
- **Kysy+✕ (kysy-hiljaa-204 + x-sulku 62003a0b7) dc9ba934**: iPhone + iPad OK; PT:n löydös: iPhonella ✕ kiinni chatin kaiuttimessa → NUI korjasi
  (aa19d8ec7 → 3c17f1f32), uusinta kohta 0.
- **Kööpenhaminan kippi**: havainnekuvat näkyvät kortissa (Nyhavn 4/4, lokit/todistus-kippihav204e-iphone-20261019-1506), PT OK. PT 15.2x:
  k8 Tivoli (ylikylläinen) → omistajan hyväksymä Tivoli v2 t1-ilta (Codex e554bd7f0, CC BY-SA -pohja Leif Jørgensen): kuvalista v13
  (koopenhamina-kuvat-204 ba13ebaf9), vienti _valmiit/koopenhamina-havainnekuvat-k8-vienti-20261019, JU vei ämpäriin 15.09, PT hyväksyi,
  NS:lle merge-pyyntö (ba13ebaf9). Ennen/jälkeen: lokit/kippi-k8-tivoli-ennen-jalkeen-20261019/.
- **Tuotantopohja uusi-linssi** #4974 mergetty (PT), #4771 suljettu; worktreet poistettu.
- **Levy**: ~2,5 Gi omia vanhoja todistuslokeja + Peking-appit + vanhat appit pois. Omat appit nyt: juna204-leidenc-app (+ tuleva juna204-kysyx2-app).
- Skenaario-opit (pohjan luku 7, virheet 9–12): kuvakortti avataan `ui opasvalikko suurenna` (ei `linssi opas …`), kokoruutu suljetaan
  alasvedolla (`ui sulje` ei sulje), himmeät napit: 1. napautus herättää.

## 2. SEURAAVA ERÄ
1. Kohta 0 (Kysy-✕ ennen/jälkeen + Tivolin teksti tuoreelle lukijalle) → PT → NS: kysy-hiljaa-204 (ja NUI vie x-sulku-reuna-204:n itse).
2. Muuten jono tyhjä → rivi PT:lle "JONO TYHJÄ: Linssiseppä". Kamerajohtajan (c)-siirrot VS/KS/PK ovat niiden omia töitä.

## 3. WORKTREET (/Users/Shared/Claude/wt)
proto-linssiseppa-museokamera (museo-kamerajohtaja-204), proto-linssiseppa-kamerajohtaja (kamerajohtaja-204), proto-linssiseppa-kippikuvat
(koopenhamina-kuvat-204), proto-linssiseppa-kysy8 (kysy-hiljaa-204), proto-linssiseppa-kierrokset195 (todistusajo.sh – älä poista). Poista
merge-vahvistuksen jälkeen (`tools/uusi-worktree.sh --poista <nimi>`). tools/gpu-vapaa.sh ja .claude/settings.local.json* eivät ole minun.

## ALOITUSVIESTI SEURAAJALLE
Olet Linssiseppä (Opus, high). Lue CLAUDE.md ja tämä luovutus. ENSIN kohta 0: `ps -ef | grep ajo-kysyx2` – jos ei käynnissä, käynnistä taustalle;
odota JU:n KÄÄNNÄ NYT → `touch /Users/Shared/Claude/proto-3d/tyokalut/linssiseppa-ajot/kaanna-kysyx2.nyt`; simun jälkeen ennen/jälkeen PT:lle.
