# Pelikoodari: luovutus 2.11.2026 klo 17.15 – juna 218

Edellinen: -20261102-1517 (7e8657ba5): sen jono ja huomiot ovat voimassa, ellei alla toisin. Syy: konteksti pehmeällä rajalla.
Proto-worktree /Users/Shared/Claude/wt/proto-pelikoodari-tausta-v99, haara pelikoodari/kapea-reitti-218 (commitit paikallisia,
ei originia), kärki **6f8d7b6ab** (42dcf0b68 + pystylatauskuva). Salirunko pelikoodari/sali-218b = **fc611d0bd** (kärki + pelikoodari/piirtajat-218, luotu
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
**KÄYNNISSÄ sali-218b/ketju4.zsh** (taustalla, tämän session prosessi): ty, cc, xf → taso 1 A+B (taso1a2, taso1b2, b9b9c5c58+) →
cx, yk, ys (v111; lokit aja-cx2.ulos jne.). Siivoaa kunkin ajon ruutukansion videon jälkeen. Tila: `cat sali-218b/aja-*.ulos`.
Valmistuu arviolta ~20.20. Vanhat taso1-a/-b (15.49/16.03) VIALLISIA, älä lähetä.
Jos ajot kuolivat nollauksessa: aja puuttuvat samoilla skripteillä taustalla (Monitorilla) ja rivi PT:lle.
Salien alku/maali = LAV:n rakennukset-reitti S-N:n päät (paikka_pohja + pisteet[0]/[-1] x,z): sk-<koodi>.txt.

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
