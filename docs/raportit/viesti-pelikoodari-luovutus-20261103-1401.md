# Pelikoodari: luovutus 3.11.2026 klo 14.01 – juna 218

Edellinen: -20261103-1340 (9e72a341a, sis. lisäys 13.5x) – voimassa, ellei alla toisin. Syy: konteksti (hook 25 %).
Testit: bash Peli-testit/kaanna.sh (EI zsh) 805/805; tyokalut/tarkista.sh 0 virhettä.
(Huom: viesteissäni LAV:lle mainittu "14.2x/14.3x" oli arvio; oikea kello oli ~13.55–14.00.)

## Tehty 13.45–14.01
- **Polkukamera, kun kamera on jo seinän takana (6a8628c67, haara pelikoodari/polku-218af, wt /Users/Shared/Claude/wt/proto-pelikoodari-ys-218)**.
  Syy ys 218ad -videosta (ruudut 6,0/6,6/7,0/7,4 s): keisari kääntyy varaston SIVUOVESTA ulos, jousella jäljessä tuleva kamera oikaisee
  kulman ja jää sivuseinän ristikon taakse; unity.logissa "polkukamera alkaa" 0 kertaa koko ajossa (Tukossa tarkisti vain tavoitteen
  `kohde`, joka oven linjalla oli vapaa). Muutos JuoksuV4Maailma.cs (polkukameran lohko ~r. 1840): katon alla (lapikulkuPolku) myös
  kPaikka tarkistetaan (`kameraTukossa`), tukossa → polkuhaku. Uusi syyloki `polkutukos kamera|tavoite t … (x, z) huippu ala massa,
  polku N m|ei` kerran sekunnissa. ty 11–13 s (218ac) on samaa luokkaa: keisari kääntyy oviaukosta (152, −750), kamera hyppii 3,3 m
  suojan vedoissa (kamera.txt 11,98 / 12,46 / 13,78 s).
- **Alkulennon katse ei taivaalle (995d5d1cb, sama haara)** = KK:n kysymyksen vastaus (PT:lle lähetetty 13.5x): ei tarkoituksellinen;
  JuoksuAvaus.KatsePiste katsoi rataa 3 s edellä, joka nousee portin jälkeen 4 → 38–42 m Taihemenin katon yli. Kohde enintään kameran
  korkeudelle (Maailma(t).y). Testi JuoksuAvausTestit.KatseEiNouseKameranYlle.
- **Ajo JU:lle**: zsh /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/sali-218af/ketju-af.zsh ys tj cx ty xf taso1b
  (runko polku-218af 995d5d1cb = opetus-218ae + yllä olevat; sk3:t = 218ae:n korokesijoitukset). JU kuittasi ensin vain "ys tj cx"
  ja nollautuu → lista vahvistettu JU:lle 14.0x; JU:n luovutus #6154 mainitsee "ys tj cx ty xf" – TARKISTA, että taso1b on mukana.
  ketju-ae (opetus-218ae ca981fc31: taso1b cc) ajetaan ennen af:ää; opetus-218ae-haara palautettu ca981fc31:een (vahinkosiirto korjattu).
- **LAV: osasarja-v12 kytketty cce530a1b** (pelikoodari/kapea-reitti-218, 1ea2a61e9:n päällä, wt proto-pelikoodari-tausta-v99):
  OsasarjaKansio "kielletty-osasarja-v12/" (SHA256SUMS 4383e8de2a2c), esto-v38, editoripari, EI junaan ennen PT:n arviota. Media 200 (LAV + tarkistettu).
- **LAV rivi 52 k4 (xf-sali −147.6 420.5) vastattu**: geometria rakennukset-v119 xf-xianfugong-lod0/1/2.glb; kulku vain -tormays.glb →
  leivottu esto; peittokartta lod-verkoista. Pyysin: älä paksunna xf:n pääoven keskipylvästä; ilmoita, jos koroke/valtaistuin siirtyy.

## SEURAAVA
1. ketju-ae:n tulokset (sali-218ae: taso1b ohje kerran, cc kortti Puyin alla + korokkeella) → KK:lle PT:n kautta (video + 1 s arkki
   ffmpeg fps=1,scale=300:-1,tile=6x4).
2. ketju-af:n tulokset: ys 6–8 s, tj 4/8/10 s, cx 4 s, ty 11–13 s, xf 6 s, taso1b alkulento 6,5–8 s. Lue huom-*.txt:stä
   "polkutukos"/"polkukamera": jos polkua ei löydy (polku ei), tukoksen ruutu kertoo syyn (oviaukon ruutu huippu > 2 ja ala < 2,5 →
   oviaukko näyttää seinältä; korjaus Tukossa-näytteisiin: oviaukko (KatonAlapinta ≥ OviMinYla) vapaaksi).
3. xf 6 s: pääoven keskipylväs keisarin ja kameran välissä (kamera suoraan takana, polku pylvään vieressä) – jos af ei korjaa,
   sivusiirto pylvään ohi (KameraSivuSuoja) kun PelaajaPiilossa ja este ohut.
4. Kun kaikki korjattu: koko sarja kerran → taulukko → PT + KK-paketti.
5. Codex-toimitukset odottavat (ei vielä 14.0x): posti/codex-pelikoodari-juoksupeli-elokuvatekstit-20261103/ (kytkentä ks. ed. luovutus)
   ja posti/codex-pelikoodari-viimeinen-keisari-havainnekuvat-20261103/ (kuittaus täysikokoisena, sitten PT:lle).
6. Checkout /Users/Shared/Claude/Matkakirja-pelikoodari: luovutushaara koti/pelikoodari-20261103-1401.
