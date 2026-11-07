# Julkaisija: luovutus 7.11.2026 klo 22.43 (korvaa -2124:n; sen ja -2040/-1803/-1700/-1628:n OPIT, SÄÄNNÖT ja YÖN SÄÄNNÖT voimassa: git show 5385311a5:docs/raportit/viesti-julkaisija-luovutus-20261107-2124.md)

Rooli: JU. T = /Users/Shared/Claude/julkaisija-tyokalut, P = /Users/Shared/Claude/proto-3d, R = P/Matkakirja-proto, jonoloki T/jono-20261103-ilta.txt.

## ALOITA: Monitor jonolokiin (tail -n 0 -F, grep 'AJO |VIKA|runko takaisin|ALKOI|SEIS|JONOSSA|PERUTTU|KORJAUS|vahtikytkin|skripti loppui|sarja loppui', 30 min), sitten ps pideistä ja tail jonolokista: mitä jäi kuittaamatta. Kaikki on nohupilla.

## 1. TF 220 (OMISTAJA PYYSI JULKAISUA 22.23, PT): VALMIS 22.45
1.1 (220), juna-220 = 34f96f97b, run 42411165815 success, sisäinen ryhmä, kerrottu PT:lle (kertoo KK:lle). Muutosloki #6492 2fd5e6337.
AVOIN: Asemataulu hylkää juna.py lukitse ja tf: "Työn alla ei ole tyhjä" (177 kohtaa); PT:lle kerrottu. Kun PT sanoo: python3 -I tools/asemataulu/juna.py tf --juna 220 --aika "22.45".
iPhone-tarkistus junalla (85° → 45° Pariisin yllä, hyppy kamerassa; rivi PT:lle ja NS:lle) tekemättä.

## 2. iPad-jono: T/yo-jono2-20261107.zsh pid 72046
latausraja2 kuitattu; jarru-taso1 ajossa 22.43, AJETTU-rivi NS:lle (754644c26, T/ns-yksi-taso1/ajo.log, lokit/natiiviseppa-muisti-v-taso1, vahti päällä) → vaihe12 (10604363c, yksi kierros v1 y1 a1 b1, aikaraja 9000 s, T/ns-yksi-vaihe12/ajo.log; rivi VAHTI LAUENNUT = tulos; jos "PUUTE hae muistivahti-tulos.txt" toistuu, kerro NS:lle) → ASTC (581b9ad07, v1 a1 kv ka, T/ns-yksi-ASTC/ajo.log; vahti pois tarkoituksella) → "YO-JONO sarja loppui".
Kuittaus NS:lle joka ajosta erikseen: AJETTU- ja VALMIS-rivit, grep lokista, ei arviota. Lisäkierros tai -pari vain NS:n pyynnöstä (argumentti 2 tai 3). Lämpö: NS lukee itse lokeista, ei tarkisteta erikseen.
T/ns-yksi-ajo.zsh <nimi> <sha> <skripti> <aikaraja s>: lukko, kytkimet ja runko lopuksi. Valmis pohja lisäajoille.
Lisäys kesken jonon: T/*.zsh, jonka jono kutsuu, voi vaihtaa os.replacella (ajossa oleva pitää vanhan inoden). Pääjonon vaihto: kill -9 pääjono ja odottava vuoro, ajossa oleva lapsi jää; uusi pääjono odottaa lapsen pid:tä; muista Mac-odottajat (alla).

## 3. Mac-jono muistijonon jälkeen (odottavat pid 72046)
- NUI nimet-reuna 2c12b920a pid 72070 (T/nui-nimet-reuna-1.zsh): lokit/nui-nimet-reuna-1-2c12b920a, mp4 mukana. Ilmoitus NUI:lle (katsoo tallenteen).
- KS lähialue-1 b73f9232d pid 72089 (T/ks-lahialue1.zsh): lokit/karttaseppa-lahialue-1-b8-b73f9232d, 7 kuvaa. Kuittaus KS:lle, md5 ja samat kuvat nimeten.

## 4. Kuitattu tällä vuorolla
VS vyö 2+2; VS nappula-lasku-ipad d92 (SEIS 0/16), 72e peruttu, ipad-2 d92 pysäytetty VS:n sanalla 22.28 (9/16, 4204 Mt; omistaja 22.23 ei enää tarpeen; kuitattu); LAV s4e (17/17, 4755 Mt), s4e-ipad2 (0/16, vahti 22.01.32, huippu 4652, vapaa 467), s4e-ipad3 PERUTTU PT:n sanalla; NS mittari (huippu 4017, vahti-VIKA 0), latausraja v1 (SEIS 4080, 1. ajossa), V (5/5); PK Lontoo m1 (9+9; ennen-ajossa m1-green-70 = m1-loppu).

## 5. ODOTTAA SANAA
.appit lokit/julkaisija-laite-218-*: sana tilaajilta kuten -2124:ssä; lisää 63e5260e1, 754644c26, 10604363c, 581b9ad07 (NS). 10e9b6c4a vapaa LAV:n ajojen perumisen jälkeen, kysy LAV:lta tarvittaessa.
AAMU 8.11.: /Users/Shared/Claude/_levy/simu-yosiivous-20261108.log: ajo tapahtui ja "iPad-välimuisti" -rivi; rivi PT:lle.

## OPIT
- T/ipad-skenaario-eikons.zsh: VIKA-seis lisätty 22.1x (20 s välein muistivahti-tulos.txt, aika ajon alun jälkeen → lippu K/vahti-seis, skenaario seis, kääre hakee lokit). VAHTI_SEURAA=0 vahti pois -ajoissa. Testaamatta oikeassa ajossa; katso ensimmäinen vahti päällä -ajo.
- git archive unity-tarkistukseen: mukaan Peli-testit ProjectSettings Packages Assets/Matkakirja Assets/Plugins. Kartta-testit lisäksi Linssit-testit. Glob-polku, joka ei osu, kaataa archiven: setopt pipefail.
- Huippu vain riveiltä ^N (grep huippu osuu juoksupelin räystäsriviin). Skenaariorivit: sekä "kuva X" että "komento kuva X".
- Haara ei voi olla julkaisija/x: refs/heads/julkaisija on olemassa. Käytä julkaisija-x. Tarkista haara ennen committia.
- Vahti päällä: Pariisin ajot ylittävät 4080 Mt nyt helposti (4082, 4120, 4080); ajo menee 0 kuvaan. Sano tilaajalle ennen ajoa.

## Nollaus: tämä luovutus + "LUOVUTUS VALMIS <sha>" Postivahdille.
