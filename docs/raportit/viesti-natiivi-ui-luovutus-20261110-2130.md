# Natiivi-UI: luovutus 10.11.2026 klo 21.30 (kontekstivahti 25 %; korvaa -1945:n)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, KS local_7b57e35a-3a8e-4943-aba1-c960b9eb4671.
Natiivin haarat natiivi-backup-remotessa, worktree /Users/Shared/Claude/wt/proto-nui-nimizoom (nyt haaralla natiivi-ui/tarinamerkki-koe, puhdas).
Unity `sh Peli-testit/unity-tarkistus.sh`. Mac-esikatselu JU:n vuorolla (pyyntö JU:lle viestinä: sk, sha, koko, 0.465, lokikansio).
Juna 224: kärki 3c214599d = 224.40 (tapit); KS:n junahaara 599b0150d = 224.42 pt-ok (sis. 0f0f950a6 = jättinimisuojaus 2592bf839 + kontrasti f4ddf1655 + KS:n LuoOsat-kestävyys).

## VALMIIT TÄNÄÄN (älä toista)
- Tavoitepalkki 308cd1d16 linkissä 224.39 (PT:lle kerrottu; osoitekirjan mukaan roolit eivät viesti KK:lle).
- Tapit samalle korkeudelle c3e1e6741: Mac pysty y 930 / vaaka y 554 ✓, linkissä 224.40. Kuva _tyo/natiivi-ui/tapit-korkeus-1-pari-c3e1e6741.png.
- Kontrasti kirja + Liiku f4ddf1655: Mac-pari ✓, PT "selvä parannus"; mukana 224.42:ssa (ei erillistä lippua). Kuva _tyo/natiivi-ui/kontrasti-1-pari-kirja-liiku.png.
- Jättinimet pysty-2 (04a986a1b) Macilla EI toistu (taso 14–15, rivit 11–13 piilossa) = laitteen oma vika; JU:n om1853-vertailu sama.
- PT:n työlistakysely (10 riviä): kaikki linkissä (224.15–224.28, kaksi jo junasta 220) – vastattu.

## AUKI
1. HUOMENNA: iso iPad 0f0f950a6 (KS:n yhdistelmä; JU ajaa, PT: "iPad-pari isolla iPadilla huomenna"): grep "esteet ohitettu|estevirheitä|
   nähtävyyslataus|Exception", nimet + ND + kirja/Liiku-rajaus (sama rajaus ennen/jälkeen) → PT (+ KS:lle loki). Laitekäännös valmis
   lokit/julkaisija-laite-218-0f0f950a6.
2. TARINAMERKIT (KK:n suunnitelma Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261110-kartan-kohteet-kolme-lajia.md osa 5; PT 21.1x):
   - Koodi natiivi-backup natiivi-ui/tarinamerkki-koe 2bdd4d55f (juna 224 3c214599d + 3; EI junaan): PiirrosKerros.Tarinamerkit.cs = tähden
     3D-reitti, komento `tarinamerkit kuva <png> | lisaa <tunnus> <lat> <lon> | tyhjenna | hehku 0|1 | koko <k> | tila`; tähti voittaa < 80 m.
   - Kierros 1 (e59888f0b, tiimalasi/huutomerkki/raunio pelin nostokuvakkeista) → PT → KK → omistaja 21.12 "Keksi lisää", 21.27
     "Pitää olla yksinkertainen jotta toimii". Tähti voittaa ✓ (lokit/nui-tarinamerkki-2-2bdd4d55f, kuva _tyo/natiivi-ui/tarinamerkki-2-bastilji-ennen-jalkeen.png).
   - PT 21.3x: KUVAT VAIN CODEXILTA (Raamattu 7.15), EI omia siluetteja. Omat koesiluetit _tyo/natiivi-ui/tarinamerkki-koe/siluetti-*.png
     ja sk-tarinamerkki-3.txt = PERUTTU, älä käytä (JU:lle peruttu; jos JU ajoi, lokit/nui-tarinamerkki-3-* ei käytetä).
   - Codex-tilaus origin/claude/postilaatikko posti/natiivi-ui-codex-tarinamerkit-tilaus-20261110.md (768184522 + täydennys 68ec4c560 + 3a45ca513):
     5 yksinkertaista seepiasiluettia tarina-kirja/-taskukello/-sulka/-lyhty/-tiimalasi, RGBA 256², toimitus _review-tarinamerkit-20261110/.
   - TEE kun toimitus tulee (git fetch origin claude/postilaatikko; grep tarinamerkit-20261110): tarkista täysikokoisina → kopioi
     _tyo/natiivi-ui/tarinamerkki-koe/ → sk kuten sk-tarinamerkki-1.txt (sama kohta: kallista 35, suunta 0, aja 48.8455 2.3540 0.017 3) + yksi kuva
     kauempaa (aja … 0.04) ilman hehkua (`tarinamerkit hehku 0`) → JU → kuvapari PT:lle. Selitteet KUVAN ULKOPUOLELLE omalle raidalle, 1 rivi per merkki
     (historian-hetket.js): vasen Panthéonin luona Pasteur 1862 "Rue d'Ulm 1862 — liemi, joka pysyy kirkkaana"; oikea Curie 1898 "Pariisi 1898 —
     tonni malmia, kymmenesosagramma radiumia"; itä Lavoisier 1780 "Arsenaali 1780 — mitään ei katoa, kaikki punnitaan"; Bastilji 1789 ei merkkiä (tähti voittaa).
   - Väri sepia (PT: ei VS:lle nyt). Kuvakyltti merkin alle vasta valinnan jälkeen.

## JONO
1 (huomenna), 2 (Codexin toimituksen jälkeen). Muuta ei; jos molemmat odottavat → rivi PT:lle "JONO TYHJÄ: Natiivi-UI". Avoin (vain pyydettäessä): kuvakyltin reunarajaus.
