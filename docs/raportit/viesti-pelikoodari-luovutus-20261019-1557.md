# Pelikoodarin luovutus 19.10.2026 klo 15.57 (Postivahdin KOVA RAJA 37 %)

Edellinen: viesti-pelikoodari-luovutus-20261019-1431.md. Rooli: Pelikoodari (Opus, high). Proto-repo paikallinen (ei pushia).
KÄYNNISSÄ (JU, L1/L2, 1 käännös kerrallaan swapin takia): **käärö v2** fd9cc9409 kääntyy (~16.15 → _tyo/julkaisija/juoksupeli-kaaro-v2-204-app);
**kuvalähde** 5890ccd32 jonossa ~17.45 (→ kuvalahde-linkki-204-app). 204d VALMIS: 993c0df9b → a075e982c, app juoksupeli-huudot-204d-app.
Simujono JU:lla: NUI → VS → Lavastaja → **PK ~16.20 (204d)**. Ei omia simuja eikä ajoja käynnissä.

## ENSIN (järjestys)
1. **JU: "SIMU NYT" 204d** → `zsh /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/simu-204-huudot/aja-204d.zsh` (taustalle; skenaario
   sk-drone-204d-ipad.txt, kuplat 08/09/01). Tarkista täysikokoisina: (a) MUISTOKUPLAT NÄKYVÄT – 204c:ssä ne ohitettiin "ei kuvaa", vaikka
   kuvat olivat käännöksessä (resources.assets + Resources-kartta); 6fa494e4c antoi täydet tuontiasetukset (nPOTScale 0) + diagnoosirivin
   "muistokupla X ohitettu (ei kuvaa; … kansiossa N: nimi:tyyppi)". Jos yhä ohitetaan → lue rivi ja korjaa. (b) Drone (omistaja 14.07):
   pehmeä seuranta, jää jälkeen ja sivulle, kallistus kaarteessa – kRulla = −kaannos·0,25: jos kallistuu ULOSpäin, käännä merkki.
   (c) maailma osia 10/10 (sisapiha-v2). Ääni videoon: ffmpeg -itsoffset 2 (kuten 204c). → SIMU VAPAA JU:lle → PT:lle 3 riviä.
2. **Käärö v2 simu** (JU:n SIMU NYT): `zsh /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/simu-kaaro-v2/aja.zsh`. Omistajan kohta 4 (15.21,
   Raamattu 9.11): Codexin havainnekuva `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-kirjoitukset-20261019/
   scroll-tripo-v2/delivery/previews/kaaro-nakymat.png` (+ kaaro-revennyt.png) + pelikuva rinnakkain TÄYSIKOKOISINA + portti (tehty: KAIKKI OK)
   → PT. Tarkista: kirjoitus juoksijaa kohti (glTF +Z → Unity −Z = kohti), tasainen skaala ×1,30 (lev 3,0 m), liepeet heilahtavat
   juoksusuuntaan, palat lentävät eteen ja jäävät lattialle kirjoitus ylös.
3. **NS:lle merge-pyyntö junaan 204** simujen jälkeen: pelikoodari/juoksupeli-aanet-204 (kärki 993c0df9b tai korjaus) + käärö-haara
   pelikoodari/juoksupeli-kaaro-v2-204 (fd9cc9409, aanet-204:n päällä; voi mergetä vain sen). PT: juna odottaa omistajan korjauksia.
4. **Kuvalähde (BY-SA) simu** ~17.45: `zsh /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/simu-kuvalahde-204/aja.zsh` → PT:lle suurennoksen
   lähderivi + ☰ Lähteet täysikokoisina; vasta PT:n kuittauksen jälkeen merge-pyyntö NS:lle (NS tietää haarasta, yhdistää LS/NUI:n Kysy-✕:n kanssa).
5. PR https://github.com/ravelius/Matkakirja/pull/4977 (Pöllön indeksi Lontoo/Kööpenhamina historia-v2): vihreänä merge (JU) – tarkista CI.
6. Käärö v2.1 (Codexin repeämäreunat samoin nimin): kun PT kuittaa, uusi vienti (nimet ennallaan → JU ei ylikirjoita → tarvitaan kaaro-v21/-kansio
   ja KaaroKansio-vakio JuoksuV4Maailma.cs).
7. Mac WASD 4814ab2d1 omistajan paluuseen; PR ravelius/Matkakirja#4945 pidossa (ei mergeä ennen junan web-mergeä).
8. Avoimet rakennukset / katot pois (omistaja 14.07): odottaa Codexin pakettia (postilaatikko d5b6940d5).

## TEHTY TÄSSÄ SESSIOSSA
- Simu 204c (dd0135979) OK 0 poikkeusta: taulut pohjoispäädyssä, ei harmaata leijuntaa, huudot/efektit; video äänellä
  proto-3d/lokit/todistus-huudot204-ipad-20261019-1444/huudot-v4-botti-aanella.mp4. VIKA: kuplat eivät näkyneet (ks. ENSIN 1a).
- Muistokuplat pelissä 39 kuvaa (Resources/JuoksuV4/esineet/<id>.jpg 768×1024, täydet metat): erä A 12/12 (79bc1b807), D 12/12 (8d6de4a8f +
  67e525636), B 8 (13–18, 20, 22), C 6 (31, 32, 35, 36, 38, 39) – hashit Codexin MANIFESTeja vastaan. Uusinnassa: B 19/21/23–25, C 26–30/33/34/37.
- Käärö v2 (fd9cc9409): Rakenna → RakennaSolmut/RakennaSolmuittain (solmusuodatin, yhteiset tekstuurit); kaaro-v2/ ämpärissä (JU 14.44).
- sisapiha.glb portin rajaan: 1 721 → 26 primitiiviä materiaaleittain (proto-3d/_tyo/pelikoodari/sisapiha-yhdistys/yhdista_glb.py, vertaa_glb.py:
  ero 4,5e-6); JU ei ylikirjoita → sisapiha-v2.glb ämpärissä + JuoksuV4Maailma.Osat (993c0df9b). NS tietää.
- BY-SA-lähdelinkki (kuvalahde-linkki-204, juna-204:n päällä): OpasYksityiskohdat.Sivu (JSON "url", vain https), suurennoksen lähderivi
  LahdeUrl (mk-nosto__lahde--linkki), Lähteet-listaan sivu, OpasHistoria.KuvaPolku (Lontoo/Kööpenhamina v2), testikomennot kuvanosto bysa
  ja lahdelista; Linssit-testit OpasYksityiskohdat 7/7 + OpasHistoria 7/7.
- Levy: −3,5 Gi (202-appit, omat lokit ennen 19.10., wt iss-ohjaus-203). Uusi wt: proto-pelikoodari-kaaro-v2, proto-pelikoodari-kuvalahde-linkki,
  pelikoodari-historia-kuvat-v2 (PR #4977).
- unity-tarkistus 0 virhettä ja tarkista.sh rc 0 jokaisessa commitissa.
