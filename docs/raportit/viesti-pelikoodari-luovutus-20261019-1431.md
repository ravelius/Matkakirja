# Pelikoodarin luovutus 19.10.2026 klo 14.31 (Postivahdin KOVA RAJA 36 %)

Edellinen: viesti-pelikoodari-luovutus-20261019-1240.md. Rooli: Pelikoodari (Opus, high). Proto-repo paikallinen (ei pushia).
KÄYNNISSÄ: JU:n käännökset L2:lla – **204c** (kärki d63d2464c → _tyo/julkaisija/juoksupeli-huudot-204c-app, arvio ~14.25–14.35) ja
**204d** (kärki 819beddd4 → juoksupeli-huudot-204d-app, ~15.00). Ei omia simuja eikä pitkiä ajoja käynnissä (pelikoodari-iPad13 sammutettu).

## Haara ja worktree
wt/proto-pelikoodari-juoksupeli-huudot-204 on nyt haarassa **pelikoodari/juoksupeli-aanet-204** (kärki 819beddd4), joka sisältää kaiken:
1da8a2fcb huudot erä 2 + leveä häivytys → 1642d27e6 kirjoitukset → 655940575 ääniefektit v1 → bb101adac v1.1 → 4668c2be5 taulut
pohjoispäätyyn → 785c7941c kupla ei ilman kuvaa → c0d9dd10b latauksen odotus + portin katon väistö → d63d2464c kuplakuvat (08 nuuskapullo,
09 kalakulho, v4 sivellin-1; kupla 3:4) → 819beddd4 drone-kamera. Haarat juoksupeli-huudot-204 (1da8a2fcb) ja juoksupeli-kirjoitukset-204
(1642d27e6) ovat sen alla – junaan 204 mergetään VAIN aanet-204.

## ENSIN (järjestys)
1. **JU: "SIMU NYT" 204c** → `zsh /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/simu-204-huudot/aja.zsh` (APP = 204c-app jo valmiiksi;
   skenaario sk-huudot-204-ipad.txt: kuvat 2 s välein, kuplat 7 nuuskapullo + 8 kalakulho, oletukset huuto/kirjoitukset 5/5/efekti/silmukka).
   Ääni videoon: `ffmpeg -i huudot-v4-botti.mp4 -itsoffset <aani-alku − video-alku, ~2> -i aani/huudot-v4.wav -map 0:v -map 1:a -c:v copy -c:a aac`.
   Tarkista täysikokoisina: taulut näkyvät pohjoispäädyssä oven vieressä (juhlasali ~3–6 s, työhuone pohjoiseen), kuplat oikeassa
   suhteessa, ei harmaata leijuntaa alussa (odottaa latausta), ei portin katon sisältä kuvaamista. → SIMU VAPAA JU:lle → PT:lle 3 riviä.
2. **JU: 204d** → sama aja.zsh, vaihda APP-rivin 204c → 204d (sed). Drone-video (omistaja 14.07: pehmeä seuranta, jää jälkeen ja sivulle,
   kallistuu kaarteissa, ulkona kauempana/korkeammalla, sisällä lähempänä, esteet ajoissa) → PT. Kallistuksen SUUNTA (kRulla = −kaannos·0,25)
   tarkistamatta: jos kallistuu ulospäin, käännä merkki. KK:n löydös 1 (kauempana alussa) PERUTTU omistajan toimesta; latauksen odotus jää.
3. **NS:lle merge-pyyntö junaan 204**: pelikoodari/juoksupeli-aanet-204 (kärki simun jälkeen), PT: juna odottaa omistajan korjauksia.
4. **Käärö v2** (PT 14.2x, ei kiire): suunnitelma valmiina /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/kaaro-v2/SUUNNITELMA.md
   (ehjä malli + tilanvaihto nyt, revenneet palat v2.1:ssä 90f1e6b67; v1:n kolmea kääröä ei kytketä; Rakenna tarvitsee solmusuodattimen).
5. **Avoimet rakennukset / katot pois** (omistaja 14.07): odottaa Codexin pakettia (postilaatikko d5b6940d5) → tuo peliin samana tuntina.
   KK:lle kerrottu 14.1x: v4-lattiat ja -pinnat tulevat samassa Codexin paketissa (aikataulu kysytty).
6. Mac WASD 4814ab2d1: siirretty omistajan paluuseen (12.49 omistaja toisella käyttäjällä; aja.zsh pysähtyy itse, joutilas < 300 s).
   PR ravelius/Matkakirja#4945 pidossa (vihreä, MERGEABLE), ei mergeä ennen junan web-mergeä.

## TEHTY TÄSSÄ SESSIOSSA
- Huudot erä 2: 17 Kavya-ottoa ämpäristä puyi-huudot-v2 (tekstit = ääni 17/17), PuyiHuudot 35 ääntä (Juuri juoksupeli/, OnAlku),
  O1 = sinivalkoinen-maljakko-ming v2, O2 = linnunhakki v2 (KK:n sidonta; linnunhäkin huuto.1–3 korvautuvat versiolla).
- Leveä häivytys: PT:n arkin alfaprofiili mitattu (vaalea/tumma) = smoothstep 0,45→1,0 ilman neliöintiä; kuvapari
  proto-3d/lokit/todistus-haivytys204-20261019/.
- Kirjoitukset: 4 taulua + Sanxin parikirjoitus ämpärissä maailma-v4/kirjoitukset/ (JU vei 13.06), pohjoispäädyn umpiosat (ovi 3,0 m, katto 3,58).
- Ääniefektit aanet-v1 (61) + v1.1 (7): JuoksuAanet (puhdas C#, JuoksuAanetTestit 6), näkymässä Tehosteet/Tausta-tasot.
- Simu cdd9bf062 13.49 OK 0 virhettä: proto-3d/lokit/todistus-huudot204-ipad-20261019-1349/ (video äänellä huudot-v4-botti-aanella.mp4 PT:llä).
- Peli-testit 643/643, tarkista.sh rc 0 jokaisessa commitissa.
