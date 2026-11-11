# Natiivi-UI: luovutus 11.11.2026 klo 21.55 (kontekstivahti 27 %; jatkaa -2135:tä cf362e98c ja -2115:tä 205f530a6)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a,
Postivahti local_1f31f830-9df5-41c1-8992-172e100af57f, NS local_0f7f169f-2ceb-43d2-8fb4-223dda2c0870.
Worktreet ja tarkistukset kuten -2115 (junan haara /Users/Shared/Claude/wt/nui-a-kortti = natiivi-ui/intro-nimet-kortti, pulun haara
/Users/Shared/Claude/wt/proto-nui-pallo = natiivi-ui/intro-nimet; `sh Peli-testit/unity-tarkistus.sh </dev/null`). /Users/Shared/Claude/wt/nui-sk-vienti POISTETTU.
Työkalut (UUSI): /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/tyokalut/rajaa.py (trailerikuvan rajaus lokin "traileri kuva N nousee … lepo x,y, koko WxH"
-riveistä; `OUT=<kansio> python3 -I rajaa.py <ajokansio> x 1:a1-kuva1.png 2:a2-kuva2.png …`; toimii vain ASETTUNEESTA kuvasta) ja arkki.py
(tallenteen ruutuarkki: `python3 -I arkki.py <ajokansio>/b-lontoo <alku> <loppu> <askel> <ulos.png>`; ruudut k-NNNNNN.jpg, 50 kuvaa / peli-s).

## TEHTY 21.38–21.55
1. OHJAUSSAUVAT: KK 21.41 "nykyinen riittää" (työ C 59f3dcbb6 on jo 224.82:ssa: Ø 80 pt, ala 1,3, nopeudet kolmanneksen alas). KK merkitsee rivin. EI TYÖTÄ.
2. intro-nimet-3 (bfaafec8c) KATSOTTU: rivi keskellä ja kontrasti ok (rajaukset scratchpadissa, ei lähetetty), MUTTA piilotus koko kirjainlennon ajan vei
   nimen: Eiffel täydessä koossa ~0,4 s (a-pariisi ruudut 810–830), Tower Bridge 0 s. KORJAUS 12492f694 (pulku 2b5baa75e): rivi piiloon vain, kun
   lentävä kirjain osuu sen päälle (Saapumistraileri.TarkistaKirjainOsumat, 30 ms välein; USS mk-traileri__kuvanimi--peitossa; lokirivit
   "rivi N piiloon, kirjain osuu" / "nimirivit näkyviin (lennon aikana piiloon N kertaa)"). KK 21.4x: oikea linja.
3. OMISTAJAN PÄÄTÖS 21.53 (KK:n kortti): muut kaupungit "3 kuvaa, Pariisin tahti". TOTEUTETTU 165addc72 (pulku d745a4f61): nousu-polku käyttää
   aina NousukuvaLiike-käyrää (KuvaNouseeKierrossa/KuvaPalaaKierrossa), vuoro 2,86 s, paluu kasvun jälkeen; kesto = (n−1)·vuoro + 2,1 + 0,9 s
   (Lontoo ≈ 8,7 s); kirjaimet ulos viimeisen paluun aikana; PysahdysNousuMs poistettu. Pariisi (lento-polku) ennallaan. Käännös 0 virhettä.
   KK:n EHDOT tarkistettava ajosta: (1) nimirivi lähes täydessä koossa ≥ ~1,1 s JOKA kuvassa, myös 1.; (2) iskulauseen puhe + isoisän luennan alku
   ilman päällekkäisyyttä ja ilman yli ~2 s taukoa (luento alkaa trailerin päättyessä: "traileri päättyi" → "peli: luento"); (3) Ohita kuten ennen;
   (4) vanha ajastus poissa (tehty).
4. pulu-rajaus-2 (ec3aaa575) KATSOTTU ja KK + PT:lle lähetetty: p1 pyöreä kultakehys, p3 pieni pyöreä kuva Parc André-Citroënissa (maakartussi
   peittää alaosan tässä kulmassa, ei vika). Kuvat lokit/nui-pulu-rajaus-2-ec3aaa575/{p1-nousee-1000,rajaus-p3-kartalla,rajaus-p3-suurennos}.png.
5. NS:lle vastattu: NUI:n haarat eivät koske KaupunkiPallot.cs/NostotKartalla.cs (NS:n kaupunkitaulu cfe3324a3 menee sellaisenaan).
6. KK:lle lähetetty intron vuorojen tosiasiat (21.4x) → omistajan päätös 21.53 (yllä).

## JU:N JONO (järjestys)
1. intro-nimet-4 (12492f694) → lokit/nui-intro-nimet-4-12492f694 — KÄYNNISSÄ 21.5x. Pariisin vertailu (Lontoo vielä vanhalla tahdilla).
   Katso: a1–a5 + a1b (kirjaimet ulos: Eiffelin nimi näkyy?) + lokin "rivi N piiloon" -rivit.
2. intro-nimet-5 (165addc72; sk-intro-nimet-5.txt) → lokit/nui-intro-nimet-5-165addc72 — JU:lle lähetetty 21.55 (-4:n perään). TÄMÄ ON KK:N NÄYTTÖ:
   Pariisi a0, a1–a5 rajaukset (rajaa.py) + Lontoo b0 (kirjaimet lennossa), b1, b2, b2b rajaukset asettuneesta + b-lontoo.mp4 + lokista kokonaiskesto
   ("traileri päättyi … (N s)") ja luennan alku ("peli: luento") + mittaa tallenteesta (arkki.py) jokaisen kuvan nimen näkyvyys lähes täydessä koossa
   (≥ 1,1 s). KK:n sanalla PT:lle "JUNAAN 165addc72 (intro-nimet-kortti)" + taitto (alla). Huom: oleta "lontoo uusi esittely" EI tule lokiin → -5 odottaa
   suoraan "traileri kuva 1 sisään". Pulun kuva -oleta aikakatkaisee (a8–a10 vain suuntaa antavia).
3. taitto-1 (ec3aaa575) → lokit/nui-taitto-1-ec3aaa575: ks. -2135 kohta 3 (ehdot 1–5 täysikokoisista rajauksista; näyttö t1–t3 + t5 (+t6, t7) KK:lle).
4. petit-palais-5 (a0c49d779) → ks. -2135 kohta 4 ("merkkejä 26", "Petit Palais esitellään", "ui lukija: aloita pala").
5. vakioajo (210c842ad) Pariisi + Lontoo → JU lähettää arkit KK:lle ja PT:lle; NUI katsoo "VAKIO PUUTE" -rivit ja korjaa (Pariisissa 14 kohdetta).
JU 21.4x: NS:n palkki-5 (1. kärki) voi mennä väliin.

## SEURAAVA
Jono yllä → sitten D (aarrekysymys, suunnitelmat/20261111-aarrekysymys-saapuessa.md + -2053:n KK:n päätökset). Ohjaussauvat EI enää jonossa.
