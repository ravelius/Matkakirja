# Pelikoodari: luovutus 11.11.2026 klo 12.30 (konteksti 25 %, Raamattu 7.37)

Edellinen: viesti-pelikoodari-luovutus-20261111-1155.md (5103b272a). TÄMÄ KORVAA SEN JONON. Linjat ennallaan: PT 11.09 juoksupelin
peruskorjaus (ei uusia ominaisuuksia ilman KK:n määrittelyä). UUSI (omistaja 12.15–12.22, Raamattu 12.26.5): isolla iPadilla ajetaan VAIN
KK:n nimeämä valmis kokonaisuus ennen versiota; kaikki muu Macilla. Älä tilaa iPad-ajoja.

## TEHTY tällä vuorolla
- KAMERALAITE PALA 1 HYVÄKSYTTY (KK 12.21): 7355d8ab3, haara kameralaite/pala-1, wt /Users/Shared/Claude/wt/proto-pelikoodari-kameralaite.
  T11 sidottu lakiin (1,371 / w × v ± 5 %), T12 pysähdyksen ohitus (0,2974 s × v), T03 tulostaa rullan aikavakion vaihdon hypyn
  (1,47 °/s² nopeudet annettuina, ei korjata: KK katsoo palan 3 tallenteesta). Linssitestit 2300/2300. EI junaan (rinnalle).
- TAUSTA v133c + KULKUKARTTA: a0eaa2d8b, haara pelikoodari/tausta-v133, wt /Users/Shared/Claude/wt/proto-pelikoodari-v133 (korvaa 4376b6bad).
  Kuja x −145…−125, z −325…−317 takaisin (LAV: lattia oli V4_ikkunakehyksenä), piha +3185 m² (v133b), taso 1 385403 > v132, ovet 246
  (testirivi 801 → 246, 碧螺亭 kuitattu). 漱芳斋:n ovi eteläseinällä (−97,69; 490,03): −Z ON ETELÄ (午门 z −404, 神武门 +557, pohjan "S"
  = (0, −1)); PT ja LAV kuittasivat 12.2x, syy commitissa. Peli 912/912, unity 0 (uusinta NUI:n 12.26 pkillin jälkeen).
  Lokit proto-3d/_tyo/pelikoodari/kulkukartta/v133b.log ja v133c.log; mittausskriptit v133b/mittaus/ (laatikko.py, pinnat_ero.py).
  Sha JU:lle ja PT:lle lähetetty; MR vasta PT:n pt-ok:lla (PT pyytää itse).
- Mac-kuvat pyydetty JU:lta: zsh tyokalut/tarkastelu_kuvat.sh a0eaa2d8b tyokalut/koekuvat-ovi-shufangzhai.txt (3 kuvaa) → JU kertoo polun.

## JONO
1. **KAMERALAITE PALA 2** (seurantaohjaaja + kytkin UusiKamera): tehtävänanto /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/
   suunnitelmat/20261111-kameralaite-pala2-tehtavananto.md — LUE KOKONAAN (linja 8 kohtaa sitova, rajaus sitova, 13 testiä). Haara
   kameralaite/pala-2 LUOTU 7355d8ab3:sta samaan wt:hen (proto-pelikoodari-kameralaite), ei vielä committeja.
   KYSYMYKSET lähetetty KK:lle 12.3x (odota vastausta ennen toteutusta; vastaus tulee tähän sessioon):
   (1) S_enn rivillä 1052 vain kytkin päällä? (2) korkeusrajan ikkuna s_kam − a … pelaaja + 4 m eteen (±a antaa vain 0,4 s varoitusta →
   testi 9 kaatuisi); (3) katseen ennakko = 1 m aina + v̂ × (KatseEdessa(ahtaus) − 1) / 6; (4) Leikkaa ruudun lopulliseen asentoon, Fov-tavoite
   = kuvaKentta (vw 1); (5) tavoitteen y = ikkunan lattioiden kolmiokeskiarvo + H. Totesin: ohjaaja askeltaa sisäisesti 1/120 s;
   s_kam:n vauhti voi käydä negatiivisena pysähdyksessä → mitataan testillä 2, ei rajata ilman KK:ta.
   Ensimmäinen työ palassa 2: T12:n nousuehto (KK 12.21): laske toisella kierroksella kuten paluu (ensin thuippu, sitten min(e − ed)
   väliltä pysähdys…thuippu); nyt ehto on tyhjä.
   Luettu valmiiksi: JuoksuKulkuKamera.cs (ahtaus = min SeinaEtR keisari / +4 m edessä / kamera; alueet 3,5–8 m, 2,4–9 m, katse 1–6 m;
   AhdasM 1,5, AvaraM 8, Sulava), kytkentä JuoksuV4Maailma.cs 2697–2730 (vapaaOhjaa-ehto = "pelin aikana"; reitin kehys z käännetty:
   vapaaKamera.Seuraa(jalat.x, jalat.y, −jalat.z …)), rivi 1052 = var p = U(r.PisteKaarella(s.S, s.Sivu, out var kaariSuunta)),
   jäännös JuoksupeliNakyma.cs kertyma (rivit 1359–1396).
2. JU:n Mac-kuvat 漱芳斋:n ovesta → katso, rivi PT:lle (pt-ok-päätös PT:llä).
3. LAV:n aja-a2.zsh (JU) → vertaa m1-varmistus-kuviin kuten V-ajossa.
4. B1 (bcf32314c) junaan vain PT:n päätöksellä.

Ei agentteja käynnissä. Ei uusia lupia.
