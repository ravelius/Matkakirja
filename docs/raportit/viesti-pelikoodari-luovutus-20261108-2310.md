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
