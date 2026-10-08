# Avaruuskävely (EVA) natiivissa: pariteettimalli webille (Linssiseppä 2, 2.10.2026)
Lähde: proto `linssiseppa2/cupola-ketju-3` (= juna 116:n sisältö), M = Assets/Matkakirja. HUOM: Linssisepän `linssiseppa/ei-seurantaa`
(omistaja 2.10. 10.4x) muuttaa kulun: lähtö Ikkunasta (Cupola) ja Sisään-paluu Ikkunaan (nyt Seurantaan) — tarkista Linssiseppä 1:ltä.

## Tärkein
Natiivissa EI ole GLB:itä avaruuskävelyyn: Pulun EVA-asu, robottikäsi, jalkatuki, ilmalukko, kaide ja käsine ovat 2D-PNG-kerroksia
(Codex); ISS-näkymä on pallon laattarenderöinti silmä ISS:n kohdalla. Ei lisenssitekstejä (Codexin omaa taidetta, ElevenLabs-äänet).

## 1) Kulku
- Taulun rivi (M/UI/Linssit/AstronautinNakyma.cs:67): "Avaruuskävely" — selite "Ulos kaiteelle katsomaan auringonnousua"; rivi heti "ISS:n sisälle"
  -rivin jälkeen (PulunTauluNakyma.cs:257), näkyy kun kyyti on auki.
- Sallitut tilat (AstronauttiLinssi.cs:417): kyydissä ja tila ≠ Kauko (Seuranta, Ikkuna, Kohde); ei kesken avausta/kuvaa.
- Tilakone (M/Linssit/Ydin/Iss/Avaruuskavely.cs:16): Ei → Ilmalukko → Ulos → Koysi → Auringonnousu → Pulu → Kuva → Vertailu → Takaisin → Ei.
  Napautus etenee vaiheissa Ilmalukko, Koysi, Pulu, Kuva, Vertailu. Ohjeet: "Napauta: avaa luukku" / "kiinnitä köysi" / "ota kuva" / "takaisin sisään".
- Kestot (s): UlosS 4, PuluS 9,5, TakaisinS (SisaanS) 2, EnnenS 4, JalkeenS 3, NousuVaraS 2; auringonnousu ×24 Pulu-vaiheessa (9,5 s ≈ 4 min),
  Kuva-vaiheesta 1×; nousun haku 2 kierrosta, askel 10 s, tarkkuus 0,5 s; kelaus ≤ 5 s.
- Muut siirtymät (IssKyyti.cs:351): KyytiinS 2,5 (+1,5), IkkunaanS 1,2, KaukoonS 2,0, KohteeseenS 1,2.
- Ilmalukko (AvaruuskavelyNakyma.cs): LuukkuS 1,2, LukkoPoisAlku 1,0, LukkoPoisS 1,0, EtualaAlku 1,2, EtualaS 1,8, EtualanLiuku 0,28.
- ✕/linssin sulku: suoraan pois (kavely.Lopeta). Vertailu: ruutukaappaus + lähin NASA-astronauttikuva (LahinKohde).

## 2) Kamera ja liike
- Ulkona-kamera (IssKyyti.cs:204): silmä ISS:n alapisteessä 420 km, katse alas 30°, kenttä 70°, sivulle 90°, suunta auringon suuntaan.
- 2D-kerrokset kameran päällä (AvaruuskavelyNakyma.cs): kangas iPhone 1290×2796 / iPad 2732×2048 cover; järjestys rakenne, paneeli, kaide,
  köysi, käsine irti/kiinni, visiiri, valo-rakenne/-kaide/-käsine; ilmalukossa luukku/kehys/valo; luukku aukeaa 108° (iPhone) / 105° (iPad)
  vaakapuristuksena saranan ympäri. Kävelyssä Pulu ei näy (käsine + visiiri, Pulu äänenä).
- Pulu EVA-asussa Cupolassa (M/UI/Livia/LiviaKuva.cs): ikkunan oikeassa alakulmassa (Pulu.IkkunanTakana, IssKyytiNakyma.cs:419);
  robottikäsi: sommitelma −75, järjestys varsi → reunavalo (Maan valo) → perus, kasvovalo, lamput, maavalo → robotin turvaköysi → pidikkeet;
  keinunta ±2° / 6 s pisteen (113, 300) ympäri, puhe pysäyttää, vähennetty liike nollaa; varsi ei liiku. Ei eleitä (lepoasento).

## 3) Kuvat (kaikki appissa)
- M/UI/Resources/LiviaEva/: perus, kasvovalo, kyparalamput, maavalo, turvakoysi (304×608), robotin-varsi ja -reunavalo (304×1600),
  robotin-turvakoysi (304×800, viety uudelleen: webin 304×608-PNG katkaisee lenkin), robotin-pidikkeet (304×608). Web: assets/livia/livia-eva-*-2x.png.
- M/UI/Resources/KavelyKerrokset/{iphone,ipad}/*.png + rajaukset M/UI/Linssit/KavelyKerrokset.Rajaukset.cs (tuonti tyokalut/kavely_kerrokset.py).
- Codexin haarat: codex-pulu-avaruuskavely e09b4467, codex-pulu-robottikasi b557f749.

## 4) Valot
- EvaValo (M/Linssit/Ydin/Iss/EvaValo.cs): m = clamp((maavalo − 0,15)/0,85); kasvo = 1 − 0,65·s; lamput = 1 − 0,75·s; maa = 0,1 + 0,9·m
  (s = aurinkoisuus). Web vastaa: js/linssit/pulu-eva-valo.js.
- CupolanValo (IssKyyti.cs:305): Aurinkoisuus = Pehmea((ylos − raja)/0,02 + 0,5), raja = −√(1 − (R/(R+h))²) (420 km: −0,35);
  Maavalo = 0,15 + 0,85·Pehmea((ylos + 0,15)/0,45); päivitys 500 ms (Pulu.cs:193).
- Kävelyn etuala (Avaruuskavely.cs:149): ReunaValo = aurinkoisuus·(0,2 + 0,8·clamp(1 − valoisuus/0,05)); metalli tint lerp(0,28, 1, aurinko).

## 5) Äänet ja repliikit
- M/Linssit/Resources/KavelyAanet/*.wav: ilmalukko-paine (Ilmalukko), ilmalukko-luukku (Ulos), karabiini (Koysi→Auringonnousu), suljin (Vertailu),
  hengitys-silmukka (Ulos…Vertailu, 0,35 × tehoste), pulu-1/2/3. Quindar 2525 Hz 0,25 s (−12 dBFS) ennen repliikkiä (+0,1 s).
- Repliikit (Avaruuskavely.cs:50, tagit ElevenLabsille): luukku / nousu / kuva (tekstit tiedostossa). Pulun puhe OLETUKSENA POIS
  (AvaruuskavelyNakyma.PuluPuhuu = false, omistaja 29.9.); kupla ilman tageja (IlmanTageja).

## Tiedostot
Avaruuskavely.cs (tilakone, repliikit, valo), IssKyyti.cs (tilat, ajat, kamerat, CupolanValo), EvaValo.cs, AstronauttiLinssi.cs (AloitaKavely),
AvaruuskavelyNakyma.cs (kerrokset, äänet, vertailu), KavelyKerrokset.Rajaukset.cs, AstronautinNakyma.cs + PulunTauluNakyma.cs (taulu),
LiviaKuva.cs + Pulu.cs (asu, robottikäsi), LinssiOhjain.cs:1543 (astro eva / astro kavely), testit Linssit-testit/Testit/AvaruuskavelyTestit.cs.
