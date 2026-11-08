# Pelikoodari: luovutus 08.11.2026 klo 22.55

Korvaa kaikki aiemmat. Nollaus kontekstivahdista (pehmeä raja 25 %). Vanhat opit: `git show f0e5a3173:docs/raportit/viesti-pelikoodari-luovutus-20261108-0230.md` kohta 2.
Etävarasto natiivi-backup (proto-3d/Matkakirja-proto). Pelikoodarin checkout on haarassa koti/Matkakirja-pelikoodari: älä vaihda haaraa, luovutukset omaan haaraan worktreellä.
Edellinen luovutus (FPV, glb-esihaku, 1c–1e, taustat): `git show 403d1553e:docs/raportit/viesti-pelikoodari-luovutus-20261108-2240.md` – sen kohdat 0 ja 2 ennallaan, 1c/1d/1e alla.

## 1. Juoksupeli, haara pelikoodari/juoksu-223 (työpuu /Users/Shared/Claude/wt/proto-pelikoodari-juoksu, pushattu natiivi-backup)
Omistajan sanat: Matkakirja-fable docs/raportit/kaappaukset/omistaja-20261108/2223-pyynnot.md (+ "1f PÄÄTETTY" lopussa) ja 2240-pyynnot.md.

### 1g VALMIS a7004996e (raportoitu PT:lle ja KK:lle 22.5x) – PUUTTUU Mac-toisto ja kuvat KK:lle (JU:n vuoro)
Syy: vapaan maailman kappale kulki tarkasti pääilmansuuntaan, palatsin seinät 2,3° vinossa → seinän vieressä suora linja hipaisi kylkeä 5–7 m:n
päässä, kappale päättyi "seinän eteen" ja keisari odotti, vaikka kiveys jatkui (oikealla kartalla 400/400 sivuhipaisusta pysähtyi).
Korjaus JuoksuV4.Vapaa.cs: SivuseinanOhi (vino ≤ 5° tai sivuaskel 20°/≤ 1,5 m ulokkeen ohi) + EteenAuki (SuoraanAuki kappaleen lopussa).
Seinä edessä koko leveydeltä pysäyttää ennallaan (22.38). Testit SivuseinanViertaJuokseePysahtymatta, UlokkeenOhiSivuaskeleella,
OikeallaKartallaSivuseinaEiPysayta (398/400). 874/874, unity-tarkistus 0.
Huom: kujilla on 1 m:n ulokkeita (2×2 ruutua, kulkukartan ruutu 0,5 m) – sivuaskel kiertää ne. Mac-ajo: juokse avauksesta pohjoiseen ja
seinien viertä; kuvat KK:lle (local_37f7c945), rivi PT:lle.

### 1f TEKEMÄTTÄ – OMISTAJAN PÄÄTÖS 22.4x kortilla "Heti ovelta (Suositus)": keisari kääntyy ovelta suoraan avoimelle kujalle (oikealle =
pohjoiseen, JuoksuAvaus.SeinaKaanto) ja juoksee; huuto ja kameran kierto juoksun aikana; ohjaus pelaajalle heti, EI 3-2-1. Seinillä odotus pysyy.
Nykytila (TF 223): JuoksuAvaus.PorttiAikajana: keisari juoksee 9,5 m (HuoneS = SeinaS) vastaseinälle ja seisoo → SeinaTauko 0,7 → vilkaisu →
huuto → kurkistus + lähikuva → kaarto 2,6 s → 3-2-1 → OhjausPelaajalle; JuoksupeliNakyma.cs ~1269 itseLahto kääntää keisarin vasta ohjauksessa.
Suunnitelma (luettu, ei koodattu):
1. Sääntö: JuoksuV4Reitti uusi `AlkuKaanto` (LuoVapaaTaso asettaa = JuoksuAvaus.SeinaKaanto). JuoksuV4.cs SokkeloRisteys (~rivi 2283):
   jos k == 0 && Reitti.LahtoOvelta && Kaannokset == 0 && AlkuKaanto ≠ 0 && Auki(AlkuKaanto) → valinta = AlkuKaanto (ei Pysahdy).
   AjajaOdottaaEnsiKaantoa vapautuu käännöksessä (pitoa ohjaa nakyman TakaaAjajatLiikkeelle).
2. JuoksuAvaus (Portilta): PuyinMatka EI pysähdy SeinaS:ään; PuyinPaikka s > SeinaS jatkuu Kehys-suuntaan (pohjoinen). Tarkista testillä, että
   ennuste vastaa sääntöä (käännöksen geometria: KarttaJatka + kaistat; myös hidastaako käännös).
3. PorttiAikajana: kaanto = SeinaT; KiertaaPaikalleen = kaanto; PuyiKatsooTaakse kaanto+0,3; PuyiHuutaa +0,2; EunukkiKurkistaa huuto+0,3;
   KaartoS (PorttiKaartoS) lyhyemmäksi ~1,6 s; OhjausPelaajalle = KameraPaikalla; TakaaAjajat +0,2; EunukitHuutavat ennallaan (huudot jatkuvat
   ohjauksen jälkeen, nakyma ~925). Laskenta3/2/1 pois tason 1 aikajanasta – Hetki() heittää puuttuvasta: tarkista käyttäjät
   (JuoksuAvausJuliste.cs 134–136 vain switch, ok). SeinaTauko pois käytöstä.
4. Kamera: MaailmaPaino Portilta = 1 → ennusterata. Juoksun aikana parempi todellinen keisari: MaailmaPaino 1 → 0 käännöksen jälkeen (kuten
   keskeltä-alussa KaartoAlku, 1,5 s), kun yaw on kääntynyt (DroneNosto.PuyiKaantoS). LuoSeinaAvaimet: (Luovutus 9/2,4/0,3) → huuto (4,6/1,5/0,8)
   → KameraPaikalla (PeliKameraTaakse, PeliKameraYlos, 0). KurkistusKuva → 0 tasolla 1 (lähikuva veisi kameran sivuun ohjauksen aikana; JuoksuV4Maailma
   2410). Vilkaisu: oikean olan yli (+70°) pohjoiseen juostessa (kamera kaakossa).
5. JuoksupeliNakyma ~1269 itseLahto pois (käännös on säännössä). JuoksuV4Maailma.AvausSeinaYaw palauttaa null itsestään (ei Odottaa).
6. Matkaa: pohjoiseen vain ~13 m (S 22,8) ennen ensimmäistä seinää → ohjaus viimeistään ~2,4 s käännöksestä, muuten keisari odottaa siellä.
7. Testit muuttuvat uuteen päätökseen: JuoksuKulkuKarttaTestit OvestaVastaseinalleEiKaannyItsestaan, TakaaAjajaLahteeOveltaVasta…,
   SeinanOikeaPyyhkaisyEiTuoHetiVasemmanOpetusta, ItseLahtoJattaaKaantoOhjeenPelaajalle (rivit ~499–590) + JuoksuAvausTestit (Taso1…, SeinaT,
   DroneEiLennaMinkaanLapi). Opetus: KoneKaantaa(s) pitää ohjeen pelaajan ensimmäiseen omaan käännökseen – kutsu ohjauksen alussa, jos
   Kaannokset == 1 alkukäännöksestä.
8. Ennen muuta muutosta (kuin yllä) kerro KK:lle. Mac-kuvat/video (iPhone + iPad) KK:lle ennen junaa.

### 1c VALMIS 9f2e57b71 (ei vielä PT:lle): kallistus 0,5 °/(m/s²), raja 10°; tarvitsee Mac-kuvat/videon PT:lle.
### 1d, 1e ennallaan (ks. 403d1553e kohta 1).
