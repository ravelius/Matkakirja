# Pelikoodari: luovutus 09.11.2026 klo 09.22

Korvaa kaikki aiemmat. Nollaus kontekstivahdista (pehmeä raja 25 %). Edellinen: `git show 4f1eaf8ca:docs/raportit/viesti-pelikoodari-luovutus-20261109-0746.md`
(sen kohdat 2–3 ennallaan; kohta 1 d2 ja lisäykset käsitelty alla).
Työpuu /Users/Shared/Claude/wt/proto-pelikoodari-juoksu, NYT haaralla pelikoodari/juoksu-223-suunta (natiivi-backup), kärki 84521ba9b.

## 1. OMISTAJAN PÄÄTÖS 08.32 (TF 223:n suunta + 3-2-1) – KOODI VALMIS, MAC-AJO JU:LLA
- Pohja junan 223 kärki 4e972eeed (JU oli jo palauttanut 1f:n ja d2:n). Commitit: 9d03ff5d5 (1f uudelleen), ebdb588f9 (d2 0cc5 uudelleen),
  84521ba9b (suunta vasemmalle + 3-2-1 + `ui juoksupeli kuvasuhde laite`). 877/877, unity-tarkistus 0.
- Mitä: SeinaKaanto = −1 (vasemmalle = etelään kuja-75:tä kohti kameraa, JuoksuV4Reitti.AlkuKaanto, ei pysähdystä). Kamera: LuoSeinaAvaimet pois →
  ennen 2.11. ollut rata (edessä kasvokuvassa, kaari repliikin lopusta taakse, PorttiKaartoS 6,4 s, MaailmaPaino kuten keskeltä-alussa).
  Aikajana: ovi 28,7, eunukki 29,03, käännös 29,5, huuto 30,0 (vilkaisu vasemman olan yli), kaari 32,7, 3-2-1 38,1/39,1/40,1, ohjaus 41,1 s.
  Eunukin kasvot kuvassa (malli): iPhone pysty 5,4 s, iPad vaaka 6,0 s. Ammattimittaus: kääntö ≤ 51 °/s, suunnanvaihdot 1.
- Jätetty pois: ovikuvan rajaus 451519f87/4c1d100a2 (tehty kamerasta poispäin juoksevalle keisarille). Kurkistuksen lähikuva pois (KurkistusLahikuva false).
- Oikea kartta: ennuste vastaa sääntöä 0,06 m; keisari ohjauksessa (−136,7; 362,4); ensimmäinen kääntöohje (KaantoOikea) risteyksessä (−136,8; 367,7)
  heti ohjauksen alussa – katso videosta, tuntuuko luontevalta (vaihtoehto: ohjaus/laskenta hieman aiemmin).
- JU:lle pyydetty 09.2x: sk /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/juoksu-223/sk-suunta-vasemmalle.txt, koot iphone, iphone-vaaka, ipad →
  lokit/pk-suunta-<koko>-84521ba9b. PT:lle 3 riviä 09.2x.
- TEE: kun JU kertoo ajon valmistuneen: katso c, d1–d3 (keisari kasvot kameraan, eunukki ovella takana), g1–g2 (kaari), h-3 (kamera takana),
  e/e2 + video (ei hyppyjä, ei seinää kuvassa). Kelpaa → kuvat ja video ENSIN PT:lle (3 riviä + polku), PT:n luvalla KK:lle
  (local_37f7c945-e1a0-4638-90b8-93c389a36fbe). Hyväksynnän jälkeen PT vie junaan 223 (haara pelikoodari/juoksu-223-suunta, 3 committia).
  Ei kelpaa → syy lokin "avaus:"-riveistä ja kuvista, korjaa, uusi ajo.

## 2. Kattokaistale (PT 08.3x) – EI ALOITETTU
- Edellisen luovutuksen LISÄYS 08.3x ennallaan: `ui juoksupeli mika x y` sk-d2-ovikuva.txt:n pohjalta (kuvasuhde laite) → JU-ajo; malli/LOD → PT
  Lavastajalle, karsinta/häivytys → PK itse. HUOM: uusi suunta muuttaa kuvakulmat; kaistale voi näkyä eri kohdassa – tee sk uuden haaran päälle.
