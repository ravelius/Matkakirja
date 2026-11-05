# Lavastajan luovutus 3.11.2026 klo 19.05 (KONTEKSTI 26 %) — LUE TÄMÄ, ÄLÄ VANHOJA

Edellinen: viesti-lavastaja-luovutus-20261103-1628.md. Syy: kontekstiraja (7.37).
K = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/kielletty-rakennukset. Id:t (tämä tili): PT local_8d8ebf72-…, JU local_2a7d6c96-…,
PK local_d3bb1f78-… (osoitekirja tools/tyotavat/osoitekirja.md on vielä edellisen tilin id:illä → list_sessions).

## UUSI SITOVA LINJAUS (omistaja 18.45, PT)
Kielletyn kaupungin malli tehdään kerran yleiskäyttöiseksi (myöhempi elävä historiaosuus, kuten Olavinlinna): rakennukset, osat,
pinnat ja valo EIVÄT saa olla juoksupelin reittiin tai kameraan sidottuja. Reittikohtaiset leikkaukset ja esteet omaan kerrokseen.

## TEHTY tällä vuorolla
- Saumapari 02+03b+05 (97ef79bd6) → PT KUITTASI junaan 219 (havainne-editori-20261103-164451, sokkeli-02-ennen-jalkeen-2x.png).
- Pronssit 06: kulta ylikirkas → antiikkikulta. pronssit-esi/tyokalut/antiikkikulta_glb.py, tee-v121.zsh → rakennukset-v121
  (SHA256SUMS 17c1efbd92da). Kasettikatto: Codex 58403cd33 → kasetti-codex/, K/tyokalut/juhlasali_kasetit.py (KATTO_Y=4.69, x ±4,
  1 kuva = 1,75 m) → avoimet-v54 (6375a7be628e, avoimet-v54/paketti.zsh). JU vei molemmat (18.01/18.12), PK koekytki b62dc9106
  (pelikoodari/saumat-v1-219). Parit: proto-3d/lokit/lav-kulta-20261103/pari-*.png. PT KUITTASI junaan 218 (v121 + avoimet-v54).
- Koejuuri (pronssit-esi/juuri-kulta) EI toimi editorissa (pinnat väärin sidottu) → käytä aina JU-vienti + PK-koekytkentä.
- Editorin 06-kamerat: Qianqingmen "-9 178 0", Yangxinmen "-118.2 234 0" (228 = punainen lattia, hylätty), Ningshoumen "285.4 204 0".

## SEURAAVAKSI (PT 19.0x hyväksyi)
1. lahipuut-v16 YLEISKÄYTTÖISEKSI: puut.json (nyt v15, 4 935 puuta) havainteen latvuspeiton mukaan MYÖS juoksijan saavutettaville
   pihoille (PT:n 25.10. v5-sääntö "ei puita saavutettavilla pihoilla" KUMOTTU). Työkalut puut_pihat.py / puut_juostava.py /
   puut_saavutettava.py mainitaan puut.json:n "huom"-kentässä, sijaintia en löytänyt (etsi PK:n wt:stä tai _tyo/pelikoodari).
   Reittikerros erikseen (PK kytkee): vain runkojen poisto reittikaistoilta ±3 m (v4:n sääntö) + v13–v15:n kannatinrivipoistot
   (koristeet.json, LAHTEET v15). Parit 07 + 06 ennen/jälkeen JU:n vuorolla → PT.
2. Yangxinmenin yläpäädyn väri vaihteli ajojen välillä (pari-yangxinmen.png: punainen / vihreä friisi), todennäköisesti latausjärjestys;
   PT: tarkista seuraavalla vuorolla, ei estä.
3. LAV-erot kohta 5 muut osat (keltakatot taustassa) samassa yhteydessä; vallihauta ja Jingshan KS:lle.
