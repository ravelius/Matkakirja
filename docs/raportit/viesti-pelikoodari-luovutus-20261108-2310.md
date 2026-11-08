# Pelikoodari: luovutus 08.11.2026 klo 23.10

Korvaa kaikki aiemmat. Nollaus kontekstivahdista (pehmeä raja 25 %). Vanhat opit: `git show f0e5a3173:docs/raportit/viesti-pelikoodari-luovutus-20261108-0230.md` kohta 2.
Etävarasto natiivi-backup (proto-3d/Matkakirja-proto). Pelikoodarin checkout on haarassa koti/Matkakirja-pelikoodari: älä vaihda haaraa, luovutukset omaan haaraan worktreellä.
Edellinen: `git show f0b94809a:docs/raportit/viesti-pelikoodari-luovutus-20261108-2255.md` (1g:n syy ja korjaus; 1f:n suunnitelma) ja sen viittaama 403d1553e (kohdat 0 ja 2 ennallaan, 1d/1e).

## 1. Juoksupeli, haara pelikoodari/juoksu-223 (työpuu /Users/Shared/Claude/wt/proto-pelikoodari-juoksu, pushattu natiivi-backup, kärki ac4bff77a)
Omistajan sanat: Matkakirja-fable docs/raportit/kaappaukset/omistaja-20261108/2223-pyynnot.md (+ "1f PÄÄTETTY") ja 2240-pyynnot.md.

### 1f VALMIS ac4bff77a (raportoitu PT:lle, KK:lle ja JU:lle 23.10)
OMISTAJAN PÄÄTÖS 22.4x "Heti ovelta (Suositus)". Toteutus:
- Sääntö: JuoksuV4Reitti.AlkuKaanto (= JuoksuAvaus.SeinaKaanto, LuoVapaa asettaa, kun LahtoOvelta); JuoksuV4.cs SokkeloRisteys: k == 0 && Kaannokset == 0
  && LahtoOvelta && Auki(AlkuKaanto) → käännös, tapahtuma "alkukaanto". AjajaOdottaaEnsiKaantoa => Kaannokset <= alkuKaannokset (pito pelaajan
  ensimmäiseen omaan käännökseen = kujan seuraava seinä, ~13 m, S 22,8).
- JuoksuAvaus: PuyinMatka ei pysähdy; PuyinPaikka jatkuu Kehys-suuntaan SeinaS:n jälkeen; Maailma-splinin loppu Kehys-suuntaan.
  PorttiAikajana: käännös SeinaT 29,54 → vilkaisu +0,3 (KaantoVilkaisuS, oikean olan yli, pito VilkaisuPitoS 1,0 huudosta) → huuto +0,2 →
  kamera taakse Luovutuksesta (29,95) PorttiKaartoS 1,7 s → OhjausPelaajalle = KameraPaikalla 31,65 (2,1 s käännöksestä), TakaaAjajat +0,2;
  Laskenta3/2/1 pois tasolta 1; EunukitHuutavat 32,8 (ohjauksen jälkeen, avauksen kello jatkuu huutoihin). LuoSeinaAvaimet: (Luovutus, 9, 2,4, 0,3)
  → pelikamera. MaailmaPaino tasolla 1 yhä 1 (ennuste = sääntö 0,04 m oikealla kartalla). KurkistusKuva pois (KurkistusLahikuva = false).
- JuoksupeliNakyma itseLahto jäi varaväyläksi (vain jos kuja oli tukossa). JuoksuV4Maailma.AvausSeinaYaw palauttaa null itsestään.
- Testit: OveltaKaantyyItseKujalleKutenAvausEnnustaa, Taso1OveltaHetiKujalle (korvasi Taso1PortiltaNopeaKaartoJaLaskenta), AlkukaantoJattaaKaantoOhjeenPelaajalle,
  TakaaAjajaLahteeOveltaVastaPelaajanEnsimmaisestaKaannoksesta, SeinanPyyhkaisyEiTuoHetiVastakkaistaOpetusta (OvestaVastaseinalleEiKaannyItsestaan poistettu).
  874/874, unity-tarkistus 0. Ammattimittaus taso 1: kääntö ≤ 8 °/s, vaihdot 3 (raja 3).
- PUUTTUU: Mac-toisto (iPhone + iPad) JU:lla, pyydetty 23.10 (1c + 1f + 1g yhdessä, kuvat KK:lle). Kun JU raportoi: katso kuvat; jos kamera
  hyppää ohjauksessa tai keisari karkaa kuvasta, tarkista JuoksuV4Maailma 2386–2403 (avauksen drone + W-sekoitus).
- Huom KK:lle kerrottu: opetus näyttää KaantoOikea heti ohjauksessa (keisari 2,5 m ennen seinää), oikea on auki siellä.

### 1g VALMIS a7004996e, 1c VALMIS 9f2e57b71 – kuvat puuttuvat (sama JU:n ajo).
### 1d varjot kauempaa, 1e värinä: ei aloitettu (ks. 403d1553e kohta 1). Seuraavat jonossa.

## 2. Muut (ennallaan)
Keisari c92dafe1f ja lataus ab113e0ac junassa 221; c (e59541a34) junassa 222. Lontoon maanpinta a7ad5fc24 kokeena. g-ajon kuolema (13:02:13) selvittämättä.

## LISÄYS 23.3x
- PT (Postivahdin kautta): 1g-skenaario JU:lle valmis: proto-3d/_tyo/pelikoodari/juoksu-223/sk-1g-sivuseina.txt (pari a7004996e vs 84a91d530;
  kujan päässä S 22,8 "kaanna -1 seina" → reitti seinän viertä länteen: korjauksella sivuaskel 20° + 30 m, ennen todennäköisesti pysähdys). Lähetetty JU:lle.
  JU:n oma sk-1f-1g-ju.txt (ac4bff77a) ei sisällä pyyhkäisyä → 1g ei toteudu siinä; JU:lle ohje lisätä "kaanna -1 seina" ja kuva d2-eunukki-ovella.
- KK 23.11: omistajan 27.10. 08.27 "eunukki kurkistaa heti, kasvot tutuiksi" pysyy ehtona. Vastasin: kasvot todennäköisesti pienet (kamera ~9 m keisarin
  takana, ovi 5–6 m kamerasta oikealla); ehdotus: kamera viipyy 0,5–0,8 s oven puolella ennen taakse tuloa. ODOTTAA KK:n päätöstä kuvan d2 jälkeen;
  toteutus JuoksuAvaus.LuoSeinaAvaimet (avain huudon kohdalle sivulle) + PorttiAikajana (paikalla myöhemmäksi), testi Taso1OveltaHetiKujalle (Kesto − seina ≤ 2,5).

## LISÄYS 23.2x (d2 tehty; korvaa yllä olevan "ODOTTAA KK:n päätöstä")
- KK 23.21 valitsi ensisijaisen ratkaisun: kurkistus heti, kun keisari on tullut ovesta. Toteutettu 0cc5ac36c (juoksu-223, pushattu natiivi-backup):
  JuoksuAvaus.KurkistusOvestaM = 1,0 → EunukkiKurkistaa 29,03 s (ennen huuto + 0,3 = 30,3 s). Kasvot kuvassa: iPhone pysty 0,64 s (ovi oikeassa
  reunassa), iPad vaaka 1,56 s (ennen 0 / ~0,3 s). Huuto ennallaan 32,8 s. Testi Taso1OveltaHetiKujalle mittaa (KameraKatse eriytetty). 874/874, unity 0.
- Viipymää (0,5–0,8 s oven puolella) EI tehty; se on KK:n vara, jos kuva d2 näyttää kasvot liian lyhyesti pystyssä.
- JU:lle 23.26 (jonossa): Mac-toisto kärjellä 0cc5ac36c + kuva d2-eunukki-ovella (iPhone pysty + iPad) → KK. KK:lle kerrottu 23.26.
- PUUTTUU: katso d2-kuva, kun JU raportoi (kasvot ovilehden reunalla näkyvissä ~0,3–0,6 s "eunukki kurkistaa" -lokirivin jälkeen).
