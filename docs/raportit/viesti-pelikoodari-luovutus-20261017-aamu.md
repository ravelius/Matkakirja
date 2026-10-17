# Pelikoodarin luovutus 17.10.2026 aamu (KOVA RAJA 39 %, Postivahti, klo 08.08)

Rooli Pelikoodari (Opus, high), checkout /Users/Shared/Claude/Matkakirja-pelikoodari (haara pelikoodari-luovutus-20261014-paiva), proto-git
/Users/Shared/Claude/proto-3d/Matkakirja-proto (haarat pelikoodari/<aihe>, worktreet /Users/Shared/Claude/wt/proto-pelikoodari-*, peili
natiivi-backup peili/proto/<haara>). Edellinen luovutus -20261017-aamuyo (c83d1b643).

## Lue ensin
- CLAUDE.md, Raamatun Ydinajatus kohta 2, tämä raportti. Viestit `send_message` session id:llä (/Users/Shared/Claude/osoitekirja.md):
  PT local_5df52e10-…, JU local_5cb16c00-…, NS local_674b9ec4-…, NUI local_44392b3c-…, KS local_eec7f158-…, LS local_771b401b-…,
  Postivahti local_a24c43c0-….
- Simu iPhone 96044270-92AA-4BD3-BE2D-772C8495AB19 vain JU:n "SIMU NYT" -luvalla, "SIMU VAPAA" heti. JU:lle aina "ÄLÄ ASENNA, kopio _tyo:hon".
- ENNEN KÄÄNNÖSPYYNTÖÄ `zsh tyokalut/tarkista.sh` (ei pelkkä unity-tarkistus: valovahti kaatoi 05.21 yhden käännöksen).
- Ajot: /Users/Shared/Claude/proto-3d/tyokalut/pelikoodari-ajot/ajo-yhteis-198.zsh (ERA/SK/APP/SHA/HAARA ympäristöstä) ja ajo-yhteis-199.zsh.
  zsh: `git show "${B}:Assets/…"` (ei `$B:A…` – zsh-muunnin syö A:n).

## TEHTY TÄLLÄ VUOROLLA
**Juna 198 (KK hyväksyi raketin, vierityksen ja nimet; NS liittää):**
- pelikoodari/yhteis-198b **6e1e510c8** = juna-198 + B lukija 5bf6ea91e (KupoliAanet-ristiriita ratkaistu PohjaLahde.Lahde:n kautta) + raketin
  liuku e7b3498a4, ILMAN C:tä (560d8c709 ei toiminut: aineisto latautui kesken intron). Todisteet lokit/todistus-yhteis-198-20261017-0456.
**Juna 199 (yhteiskäännös 48ea3ea02 = käännös 5c0317ce6, simulla OK 07.23, lokit/todistus-yhteis-199-raketti-20261017-0723 + -intro-…-0726):**
- Raketin liuku pelikoodari/pulu-liuku-199: **b6059e204** (lähikuva tähtää narupaikkaan RakettiPulu.Tahtain → ei pyyhkäisyä), **1be93e930**
  + **ef222900e** (lanka vaalea köysi tummalla reunalla 6 px, valovahti ok). Video näytti liu'un kokonaan.
- Intro C v2 pelikoodari/intro-rauha-199 **592ecbef0** (aineisto odottaa Introesitys.JokinKaynnissa + kertojan loppuun, katto 120 s): simulla OK.
- I/O pois pääsäikeestä pelikoodari/levy-tausta-199 **010a431f2** (Kartta/Levytausta; KehysMittari, LampoMittari, AaniKaappaus, 4 Hae-korutiinia).
- SEURAA pelikoodari/seuraa-199 **a03177279** (IssEtsin.Seuraa + Lukitsee; testi). EI simulla (vaatii NUI:n kamerapöydän samaan käännökseen).
- Latauskuvan v2-pari pelikoodari/latauskuva-v2-199 **1615e484e** (omistaja 07.34 "Kyllä, junaan 199"), lähetetty NS:lle. Posti Codexille
  claude/postilaatikko 34ad9d068 (kuittaus) + 15e0a9f82 (hyväksytty ja kytketty).
**Kiinan väestöpinta (omistaja 07.36–07.37 kokeilu):** pelikoodari/kiina-armeijat **45927501f** (Ydin KiinaArmeijat: keräys, huiput, lyöntiaalto,
  toipuminen; testit). KS kytki sen itse kerrokseen karttaseppa/kiina-vaestopinta-199 941bb139b; oma sovitin ba6aad86d (kiina-kytkenta) EI käytössä.
**Peruttu:** pelikoodari/laukaisin-etsin e43d3b3ff (NUI teki saman dfa8e69a2:ssa) – PT:lle "PERU junasta 200" lähetetty.

## ENSIMMÄISENÄ
1. Kun PT ilmoittaa junan 199 lukituksesta / NS liittää: lähetä NUI:lle "a03177279 junassa" (NUI lisää rivin `IssEtsin.Seuraa = paalla`
   AsetaSeuraaan). Tarkista, että NS:llä on junan 199 erät (b6059e204/1be93e930/ef222900e, 592ecbef0, 010a431f2, a03177279, 1615e484e);
   PT välitti ne – jos ei, kysy PT:ltä.
2. Simuvideot junan 199 jälkeen PT:n ilmoituksella: latauskuvan v2 (raketin laukaisu, kuva näkyy), SEURAA (NUI:n kamerapöydän kanssa).
3. Kiinan 208-video ajaa KS:n seuraaja (KS:n luovutus 3c1129758); PK vain jos pyydetään.

## Kesken / huomiot
- Worktreet (poista mergen jälkeen `git -C proto worktree remove`): aineisto-rauha-198, intro-rauha-199, kiina-armeijat, kiina-kytkenta,
  latauskuva-v2-199, laukaisin (peruttu → voi poistaa), levy-tausta-199, lukija-nimi-198, pulu-liuku-199, raketti-telakointi-197, seuraa-199,
  vieritys-198, yhteis-198, yhteis-198b, yhteis-199.
- _tyo/pelikoodari: yhteis-198-app, yhteis-199-app (≤ 2).
- Intron mittauksen alun 1,0–1,15 s pysähdykset ovat uuden pelin latausta kovassa kuormassa ennen intron kuvia (ei C:n asia); seuraa laitteella.

## Aloitusviesti uudelle Pelikoodarille
"Olet Pelikoodari (Opus, high). Lue CLAUDE.md ja docs/raportit/viesti-pelikoodari-luovutus-20261017-aamu.md (haara
pelikoodari-luovutus-20261014-paiva). Ensin SEURAA-ilmoitus NUI:lle, kun juna 199 on lukittu; sitten PT:n simuvideot."
