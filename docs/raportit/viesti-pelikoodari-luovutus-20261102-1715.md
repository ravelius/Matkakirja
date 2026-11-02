# Pelikoodari: luovutus 2.11.2026 klo 17.15 – juna 218

Edellinen: -20261102-1517 (7e8657ba5): sen jono ja huomiot ovat voimassa, ellei alla toisin. Syy: konteksti pehmeällä rajalla.
Proto-worktree /Users/Shared/Claude/wt/proto-pelikoodari-tausta-v99, haara pelikoodari/kapea-reitti-218 (commitit paikallisia,
ei originia), kärki **e53a17b0f** (v112 60e8b11aa + QA kaanna seina). Salirunko pelikoodari/sali-218b = **fc611d0bd** (kärki + pelikoodari/piirtajat-218, luotu
`git merge-tree --write-tree` + `commit-tree`, ei checkoutia; päivitä samoin, jos kärki muuttuu).

## Tehty tässä vuorossa (kaikki: SHA256SUMS täsmäsi, testit oikealla juurella 797/797, umpikujia 0 (+ sali 1), unity-tarkistus 0)
- 99244c2b6 体元殿 + 长春宫戏台 (rakennukset-v106, tausta-v106, esto-v31): solmut 1721 → 1657. Esto-v31 vain vapauttaa 24 ruutua,
  mutta sokkelo generoituu eri tavalla (kujia 95 → 150); ei suljettuja alueita. PT kuittasi.
- 7dcdc05d2 rakennukset-v107 (戏台:n jalusta kiveä). 54fac919c 长春宫 (rakennukset-v108, tausta-v107, esto-v32): 1671 solmua.
- 4520c653b 咸福宫 (rakennukset-v109, tausta-v108): 1680. 0e60a815a esto-v33 (tavulleen v32; PT pyysi, JU vei).
- 38347d50f rakennukset-v110 (ikkunakehysten hajakolmiot). 42dcf0b68 rakennukset-v111 (salien pinnat 8 salissa).
- **b9b9c5c58 VIKAKORJAUS tason 1 avaus**: keisari seisoo avauksessa vastaseinällä 9 s ja säännön abstrakti takaa-ajaja otti kiinni jo
  kurkistuksessa (t 31,2) ennen ohjausta (tallenteet 15.49/16.03). Nyt JuoksuV4Saanto.AjajaPidossa (JuoksupeliNakyma.AvausKesken asettaa
  kuten maailman TakaaAjajaPidossa). Pelin aikana seinällä kiinniotto ennallaan (opetuksen hidastus 0,25 → ~6 s aikaa). PT:lle kerrottu.
- Bugi 2 -pari 218q vs 218r (lahipuut-v15) PT:lle: **PT KUITTASI** (korjaus-218/218q-vs-218r-portti.png).
- Testijuuri (symlinkit _valmiit/:iin, kaikki versiot v105–v111):
  /private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-pelikoodari/ec80f6c4-f490-4fac-8d60-cee7a0701ca2/scratchpad/juuri-ty, ympäristö
  MK_JUURI=<juuri-ty> MK_POHJA=kk-pohja-v1d-pk8 MK_RAKENNUKSET=kielletty-rakennukset-v111 MK_TAUSTA=kielletty-tausta-v108
  MK_ESTO=palatsi-esto-v33 MK_OSAMALLIT=osamallit791-v10 MK_PUUT=kielletty-lahipuut-v15 ./kaanna.sh (Peli-testit/).
- **6f8d7b6ab PYSTYLATAUSKUVA 3:4** (Codex #1765 4c0fe8ccd, hyväksytty, kuittaus postilaatikkoon f1b20ff0d): LatauskuvaPystyUrl →
  latauskuva-pysty-leveampi-20261102/latauskuva-pysty-34.png; pysty täyttää aina ruudun; otsikko/leima/palkki alkuperäisen keskiosan
  (x 156–1096) suorakulmioon (PystyKeskiX0/L). sali-218b EI sisällä tätä (ei tarvitse). PT:lle kerrottu.
- Worktreet pelikoodari-postilaatikko ja -luovutus-1455 poistettu (Postivahti/PT).

## KÄYNNISSÄ: JU:n ESIKATSELU NYT linja 1 (JU 15.4x; ilmoita JU:lle "ESIKATSELU VAPAA", kun kaikki alla on ajettu)
TILA 17.55: valmiit sali-218b/: 20261102-171916-th.mp4 ja 20261102-173316-tj.mp4 (v111); cx/yk/ys 16.28–17.19 ovat v110:llä (uusitaan).
Levyraja (aja-sk.zsh: < 30 Gi → LEVY) katkaisi ty/cc/xf ja taso 1 -uusinnan 17.49; omien ajojen ruutukansiot poistettu → 39 Gi.
**PT 17.5x: rakennukset-v112 (salien lattiat lämmin Stone tile) tulee LAV → JU.** ketju4 pysäytetty (ty kesken, lukko siivottu).
**KÄYNNISSÄ tallenne-218t/ketju5.zsh** (taustalla): taso 1 A+B (taso1a2, taso1b2) b9b9c5c58+:lla, ~18.45 asti → tarkista ja PT:lle.
**TEHTY 17.5x: rakennukset-v112 kytketty 60e8b11aa** (SHA 034076c69484, 797/797), sali-218b = **6f48431dc**.
**KÄYNNISSÄ sali-218b/ketju6.zsh** (odottaa ketju5:n): KAIKKI 8 salia v112:lla → videot `<aika>-<koodi>.mp4` (uusimmat), lokit
aja-<koodi>-v112.ulos; valmistuu arviolta ~21.15. Sitten 8 salia PT:lle ja JU:lle "ESIKATSELU VAPAA" (+ latauskuvat ennen sitä, jono 3).
th/tj v111 (17.19/17.33) vain toiminnan tarkistukseen; omistajalle v112:n tallenteet. Lopuksi JU:lle "ESIKATSELU VAPAA".
Vanhat taso1-a/-b (15.49/16.03) VIALLISIA, älä lähetä.
Jos ajot kuolivat nollauksessa: aja puuttuvat samoilla skripteillä taustalla (Monitorilla) ja rivi PT:lle.
Salien alku/maali = LAV:n rakennukset-reitti S-N:n päät (paikka_pohja + pisteet[0]/[-1] x,z): sk-<koodi>.txt.

## TILA 18.3x (taso 1 -uusinta ajettu)
- **taso1a2 OK** (tallenne-218t/20261102-175105-taso1a2.mp4, ohjaamaton): avaus loppuun asti, ohjaus 38,5 s, kiinniotto vasta sen jälkeen
  seinällä odottaessa → uupui 28 s. Lähetetty PT:lle 18.3x.
- **taso1b2 EPÄONNISTUI skenaarion ajoituksen takia** (20261102-180356-taso1b2.mp4, älä lähetä): `odota-peli 37` on Time.timea, mutta
  avauksen kello kulkee Tahti-kertoimella nopeammin → ohjaus siirtyi jo aiemmin ja keisari jäi kiinni ennen ensimmäistä `kaanna 1`:tä
  (lokissa kiinni rivillä 5388, kaanna 5396). **KORJATTU e53a17b0f**: QA `kaanna 1 seina` kääntää vain seinällä odottaessa;
  sk-taso1-b.txt silmukka 15 s:sta. **tallenne-218t/ketju7.zsh käynnissä**: odottaa ketju6:n, ajaa taso1b3 → tarkista, että käännös
  hyväksyttiin (unity.log `kaanna 1 seina → =juoksupeli`) ja keisari juoksee 60 s.
- **PT 18.4x: A kuitattu; PT vie KK:lle YHTENÄ PAKETTINA A + ohjattu B (taso1b3) + 8 salia (v112) → lähetä kaikki polut PT:lle kerralla.**

## Jono
1. **Tarkista ja lähetä**: taso1a2 (ohjaamaton: keisari ei saa jäädä kiinni ennen ohjausta 38,5 s; seinällä pidempään odottaessa
   kiinniotto on sallittu) ja taso1b2 (ohjattu: oikea käännös hyväksytään, juoksu 60 s) → PT:lle polut, PT välittää KK:lle (KK tarkistaa
   omistajan sanoja vasten ENNEN junaa). Arkki: `ffmpeg -i X -vf "fps=1/2,scale=320:-1,tile=6x4" -frames:v 1 arkki.jpg`.
2. **Salitallenteet 8 kpl** (储秀宫 cx, 翊坤宫 yk, 永寿宫 ys, 体和殿 th, 太极殿 tj, 体元殿 ty, 长春宫 cc, 咸福宫 xf) v111:llä → PT:lle.
3. **Latauskuvat omistajalle (PT näyttää)**: esikatselu linjalla 1 (JU:n NYT-vuoro, voi liittää samaan vuoroon ennen ESIKATSELU VAPAA)
   rungolla kapea-reitti-218 6f8d7b6ab: juoksupelin latausruutu iPad pysty, iPad vaaka ja iPhone pysty (kuva latauksen aikana, otsikko
   ja leima näkyvissä) → PT:lle polut. Tarkista: ei mustia reunoja, poika ja otsikko kokonaan.
4. Edellisen luovutuksen kohta 4 (eunukkikorjaus, eunukkimäärät 12.13, Taso1ReittiPortiltaAukiolle03-siivous, kamera-218/SEIS).
5. HUOMIO KK:lle (edellisestä): seinän opetus oikealle vie pohjoiseen p-kujaportille, poispäin maalista; vasen vaatisi kameran kaaren.

## TILA 20.05: 8 SALIA VALMIIT (v112, kaikki maalissa) – lähetä PT:lle yhdessä taso1a2:n ja taso1b3:n kanssa
/Users/Shared/Claude/proto-3d/_tyo/pelikoodari/sali-218b/: 20261102-182753-cx.mp4 (储秀宫), -184702-yk.mp4 (翊坤宫), -185946-ys.mp4 (永寿宫),
-191119-th.mp4 (体和殿), -192310-tj.mp4 (太极殿), -193416-ty.mp4 (体元殿), -194533-cc.mp4 (长春宫), -195649-xf.mp4 (咸福宫).
Taso1b3 (ketju7) ~20.30 → tarkista käännös → paketti PT:lle → latauskuvat (jono 3) → JU:lle "ESIKATSELU VAPAA".

## TILA 20.25: taso1b3 EI KELPAA (älä lähetä) – SEURAAJAN ENSIMMÄINEN TYÖ
- tallenne-218t/20261102-200558-taso1b3.mp4: `kaanna 1 seina` hyväksyttiin AVAUKSEN aikana (unity.log rivi 4393, ohjaus vasta 4942),
  koska keisari odottaa seinällä jo 29,5 s:sta → kääntyi ennen ohjausta, kamera kävi seinän/katon sisällä (~26 s videolla).
- KORJAUS (JuoksupeliNakyma.cs, case "kaanna"): `seina` vaatii myös, että avaus on ohi (avausT < 0f tai !m.TakaaAjajaPidossa), esim.
  `if (o.Length > 2 && o[2] == "seina" && (avausT >= 0f || !(saanto is V4Kierros ks && ks.S.Odottaa))) return "ei (ei seinällä)";`
  → tarkista.sh, commit, aja taso1b4 (tallenne-218t/ketju7.zsh mallina, nimi taso1b4) JU:n linjalla 1.
- HAVAINTO (selvitä samalla): botti 1:n ajossa "käänny vasemmalle" -ohje näkyi ~20 s suoralla kujalla – todennäköisesti botin
  käännökset eivät kuittaa opetusta (QA-artefakti), mutta varmista ettei ohje jää pelaajallekin päälle.
- Sitten paketti PT:lle: taso1a2 (175105) + taso1b4 + 8 salia (yllä) → latauskuvat (jono 3) → JU:lle "ESIKATSELU VAPAA".
