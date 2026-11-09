# Pelikoodari: luovutus 09.11.2026 klo 12.33

Korvaa kaikki aiemmat. Nollaus kontekstivahdista (pehmeä raja 25 %, 31 %). Edellinen: `git show a970d8394:docs/raportit/viesti-pelikoodari-luovutus-20261109-1145.md`.
Työpuu /Users/Shared/Claude/wt/proto-pelikoodari-juoksu (remote natiivi-backup), haaralla pelikoodari/juoksu-1d (5ed43b793, pushattu).
KÄYNNISSÄ: JU:n 1d-ajot (pyydetty 12.2x) – Postivahti: älä nollaa ennen kuin ajot ovat valmiit, tai nollaa ja uusi PK katsoo kuvat.

## 1. VALMIIT tällä vuorolla
- Lontoon pallo ja Tower: m2 iPhone + iPad katsottu, PT kuittasi 12.4x (jo junassa 223); työlistan rivi valmis. Maanpinta a7ad5fc24 jää haaralle.
  Huomiot PT:lle (ei PK:n): pysäkkilistan otsikko M-napin päällä → PT antoi NUI:lle; automaattiajon ion-varadata = valkoiset talot.
- FPV-nopeus 366 737 km/h: syy NopeusMaanYllaKmh (5a7b64bba) = maailman vaakanopeus ilman jakoa Skaalalla (9 333). PT 12.3x: EI korjausta
  ennen omistajan päätöstä (KK:lla, suositus dronen oma ~36 km/h = jaa Skaalalla). Päätöksen jälkeen 1 rivi + testi FpvLentomalli.cs:ään.
  Huom: NS muutti Leijuntakaasu 0,25 → 0,5 haarassa natiiviseppa/fpv-kamerakulma 95b65cbe4 (tiedoksi).
- 1c (alkulennon kallistus) junassa 8aa9ece3e; kuvat lokit/pk-1c-kallistus-1ceb5e35e/ (videoista poimittu), PT kuittasi 12.5x → KK.
- 1f kumoutui omistajan 08.32 suunnalla, 1g junassa 9ed478f0c. Kulkukartta 10e9b6c4a junassa (PT).
- KS:n Lontoon oikea koko -koe (karttaseppa/lontoo-oikea-koko 46b4525f3) ei törmää; jos se jatkuu, pallo ja Tower-kyltti katsotaan PT:n pyynnöstä.

## 2. TYÖN ALLA: 1d alkulennon varjot kauempaa (omistaja 8.11. 22.32; PT:n juoksupelilista)
- 5ed43b793 haarassa pelikoodari/juoksu-1d (junan 223 kärki 734ed685d + 1d): avauslennon ajan (AvausT ≥ 0) varjomatka = 200 + 3 × kameran
  korkeus, enintään 800 m, HeittoK samassa suhteessa; häive/lähikaskadi skaalautuvat (Valopohja.PeliVarjoMatka). Maassa 200 m → ei hyppyä.
  QA `ui juoksupeli valo alkuvarjo 0|1` / `alkuvarjo K MAX`. unity-tarkistus sh 0 virhettä. Ei testiä (Unity-puoli).
- JU-ajot pyydetty: sk-1d-alkuvarjo-0.txt / -1.txt (proto-3d/_tyo/pelikoodari/juoksu-223/) → lokit/pk-1d-alkuvarjo0-5ed43b793 ja
  pk-1d-alkuvarjo1-5ed43b793 (iPhone vaaka, kuvat a-4s…a-20s + juoksu.mp4, valo-tilarivit lokissa).
- TEE: vertaa parit (1:ssä rakennusten varjot näkyvät jo korkealta; ei varjojen pomppua ohjauksen siirrossa; katso kehysaika jos lokissa).
  Kelpaa → kuvaparit PT:lle (polut + 1 rivi), PT päättää junasta. Vika → säädä AlkuVarjoKerroin/Max (QA-komennolla ensin).

## 3. TYÖN ALLA: huudot kala-altaalle ja granaattiomenapuulle (PT 12.35, OMISTAJA 12.32 "äänet hyvät", 8 ottoa hyväksytty)
- Avaimet (tekstit.fi.json juoksupeli.rikkoutuva.{kala-allas,kukkaruukku}.huuto.1–4), testit (JuoksuV4Testit rivi ~193) ja yhteenveto
  OVAT JO junassa 223. Puuttuu vain äänet: lisää 8 riviä PuyiHuudot.Kaikki-taulukkoon (Assets/Matkakirja/Peli/Juoksupeli/PuyiHuudot.cs,
  muoto (polku Juuren alla, teksti, kesto s); tekstin pitää täsmätä huutoon, jotta Valitse löytää sen).
- Kysytty NUI:lta 12.33 (local_4b84cd90): ämpäripolku ja kestot. Odota vastaus; tiedostoja ei löytynyt paikallisesti.
- Kun valmis: testit (Peli-testit), unity-tarkistus sh, haara → PT, sitten junaan 223. Suunnitelma: Matkakirja-fable/scratchpad/keskustelukanava/
  suunnitelmat/20261107-huudot-kala-allas-granaattiomenapuu.md.

## 4. Seuraavaksi
- 1e alkulennon värinä (ei aloitettu): tallenne + kehysajat Mac-esikatselussa JU:n vuorolla, syy (valo siirto, _JuoksuKuvaBias, räystäs), tulos KK:lle.
- Työlista: "Juoksupeli: keisari odottaa seinällä pyyhkäisyä" (1c valmis, 1d/1e auki) – päivitä tilanne kun 1d kuitattu.

## LISÄYS 12.4x – NUI vastasi (kohta 3)
- Otot wav-muodossa (ElevenLabs v4 turbo, speed 1.2): /Users/Shared/Claude/proto-3d/_tyo/juoksupeli-huudot-kala-allas-ruukku-20261107/ulos/
  01-kala-allas-1 … 04-kala-allas-4, 05-kukkaruukku-1 … 08-kukkaruukku-4 (tekstit tee_lista.py samassa kansiossa = tekstit.fi.json:n huudot).
- TEE: muunna mp3:ksi kuten aiemmat (vrt. puyi-rikkoutuminen-v4/huudot/), kansio esim. juoksupeli/puyi-ulkoesineet-v1/huudot/, mittaa kestot
  (ffprobe), lisää 8 riviä PuyiHuudot.Kaikki-taulukkoon; ämpäriin vienti JU:n kautta (kysy JU:lta tapa, kuten aiemmat huudot).

## LISÄYS 12.5x – kohta 3 VALMIS
- 82c26c097 natiivi-backup pelikoodari/juoksu-huudot-ulkoesineet (734ed685d + 1): PuyiHuudot erä 4 (V5 = puyi-ulkoesineet-v1/huudot/, NUI:n
  kestot), testi Era4UlkoesineidenHuudot, 51 huutoa; 879/879. PT:lle ilmoitettu. Ämpärivienti NUI → JU (JU ilmoittaa PK:lle) → sitten junaan.
