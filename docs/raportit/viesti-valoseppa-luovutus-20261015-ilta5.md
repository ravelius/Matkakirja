# Valoseppä – luovutus 15.10.2026 ilta 5 (22.3x, KOVA RAJA 35 %)

Luovuttaja: Valoseppä (Opus, high), sessio local_c238f4af. Edellinen: viesti-valoseppa-luovutus-20261015-ilta4.md.
Viestit `send_message` id:llä (/Users/Shared/Claude/osoitekirja.md); PT local_5df52e10 (≤ 3 riviä + polut).
Käännös ja simu AINA Julkaisijalta (local_5cb16c00): "KÄÄNNÄ <kärki> → app-polku" ja "SIMU VAPAA" heti ajon jälkeen.
Jono: /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md (päivitetty 21.5x).

## 1. ENSIMMÄISENÄ: käännös 88f198070 tulossa → kaksi kierrosta peräkkäin
Julkaisija kääntää `linssiseppa2/salamat-196` kärjen **88f198070** (salamat k2 + tulivuoret v6 b0d67c677 yhdistettynä) polkuun
/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/tulivuoret/app/ ja ilmoittaa "KÄÄNNETTY + SIMU NYT A26BC7D0" (~12 min vuoro).
Aja (saatimet-tiedostot ovat jo valmiina, luo kierrokset/kN/ ennen > ohjausta):
```
D=/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2; mkdir -p $D/salamat/kierrokset/k2 $D/tulivuoret/kierrokset/k5
zsh $D/salamat/aja-kierros.zsh 2 <käännös-SHA> > $D/salamat/kierrokset/k2/aja-kierros.out 2>&1
zsh $D/tulivuoret/aja-kierros.zsh 5 <käännös-SHA> > $D/tulivuoret/kierrokset/k5/aja-kierros.out 2>&1
```
→ SIMU VAPAA Julkaisijalle → tuoreet Sonnet-arvioijat ("Lue ohje …/salamat/arvioija.md … kansio kierrokset/k2/" ja sama
tulivuorille k5) → rivit KIERROSLOKI.md:ihin. Käännös-SHA on Julkaisijan "Käännöspalvelu"-merge (k4/k1: 9fb800dcd).

## 2. Tulivuoret (omistaja 20.05), haara linssiseppa2/tulivuoret-196, kärki b0d67c677 (v6), kytkin Tulivuoret.Kaytossa
- k4 (8f202fc4c v5): Sonnet 1,4/10 – purkaukset todellisessa koossa 1/8 kuvasta, Etnan vana ohut ruskea "joki", Raikoke harmaa
  kiekko, Tonga tasainen harmaa (sateenvarjo täyttää zoomin), Sarytševin varjo musta läikkä merellä, Reykjanes pieni piste.
- v6: Purkaus.Liioittelu 2,5 (vaaka ×L, korkeus ×√L; Tonga 1), varjo pilvikannelle (_VarjoTaso = KansiKm), pehmeä pilviaukko,
  vana leveä ja vaalea beige, _LaavaKirkkaus 2,5. sk-pohja: Tongan v4-kuva laajana (zoom 0).
- Jos k5 yhä heikko: zoomi ei ehkä vaikuta (Tulivuoret.TestiFov vain Camera.mainille) – tarkista v-kuvan ja w-kuvan ero.
  Sitten paras pari PT:lle → SHA Natiivisepälle junaan 196.

## 3. Salamat ja keijut (omistaja 20.07 lista 2a; kohokohta "keijut"), haara linssiseppa2/salamat-196, kytkin Salamat.Kaytossa
Worktree /Users/Shared/Claude/wt/proto-linssiseppa2-salamat (pohja tulivuoret-196). Salamat.cs + Salama.shader: Bengalinlahden
yömyrsky 8.9.2015 (ilmio.salamat-keijut-2015, 17.0 N 89.0 E), pilvikenttä kuohukupolein, salamaprosessi (2–5 iskua, ryömivä
valo), keijut 42–92 km ja siniset suihkut. IssKohokohdat.Ehto("keijut") + Valittu-kuuntelija. Testi: astro kyyti salamat
<avain>|kuva 1|keiju|suihku|tiheys x|hetki|zoom|_Säädin=x|tila. Ei kohdevalikon ryhmää (ei kuvaa → NUI:n sääntö).
- Tavoitteet salamat/tavoitteet/ (LAHTEET.md; paras t2a = ISS 3.6.2024 salamat + keiju samassa kuvassa; CC BY -kuvat vaativat attribuution).
- k1 (toimintatesti): kuvatila valaisi koko kentän sileäksi sumuksi; v2b yksittäinen salama jo t2a:n kaltainen; v3 väärässä
  paikassa. HUOM `siirra lat lon` asettaa aluksen niin, että NYKYINEN KATSE osuu pisteeseen (ei aluksen alapiste) → v3 nyt
  `katse 24 0` + `siirra 17.0 89.0`. Keijua ei ole vielä nähty kuvassa.
- k2: kennot valossa (välit tummat), hehku 3σ / _Halo 0,35, _Yovalo 0,006, kuvatilan salamat 1,0/0,45/0,25.

## 4. Valmiit tässä vuorossa
- Codexin Peking PT284 v2 (72 GLB) piilokaupunkina: integraatio OK; vastaus Codexille fbe7d644a (claude/postilaatikko, parit
  posti/valoseppa-peking284-lentotesti/; native51 hyväksytty; oma maa puuttuu, puut 2,5× liian vaaleat). Paketointi
  _tyo/linssiseppa2/peking284/rakenna.py, simu ajo.zsh. Peking tauolla → seuraava paketti PT:n ajoituksella.
- Aurinkokiekko live-Cupolaan (PT 21.4x, kohokohta auringonnousu): linssiseppa2/aurinko-196 **240357565** (master-pohja) →
  Siirtoseppä yhdistää 73c4aa0a8:n kanssa ja ottaa kortin; NS junaan 196. A/B astro kyyti aurinko 0|1|kirkkaus <x> (16).
  Pyysin SS:ltä korttikuvan kirkkauden tarkistukseen. Sama muutos salamat-196:ssa (e282b3b44, Varjossa-ehdolla).
- `revontulet iss` -korjaus (Linssisepän löydös: kohdevalikon Lapin siirto jäi voimaan): revontulet-196 **8d7f26d05** → NS junaan 196.

## 5. Jonossa – PT:n järjestys 22.3x (sitova)
1. Tulivuoret ja salamat valmiiksi kierroksilla (kohdat 1–3 yllä) → kärjet Natiivisepälle junaan 196, kun PT on kuitannut parin.
2. Seuraavat ilmiöt, kukin oma erä kytkimen taakse: pimennyksen varjo, Perseidit, hurrikaani ja **lentokoneiden vanat**
   (kohokohta "lentokoneet", vaatii "vanat"). Kaikki 9 kohokohtaa ovat jo valikossa kortteina (omistaja 22.05), joten jokainen
   efekti rekisteröi IssKohokohdat.Ehto(<vaatii>, …) ja kuuntelee Valittu-tapahtumaa kuten Salamat.cs.
3. Revontulet v7: musta maa → kaupunkien valot ja hämärä pinta, vihreä nauha ei maan päällä, limbikaari.

## Työtilat
wt/proto-linssiseppa2-salamat (salamat-196), -tulivuoret (tulivuoret-196), -aurinko (aurinko-196 → poista kun junassa),
-revontulet (revontulet-196, junassa 196), -aikavyohykkeet (juna 195 → poista lukituksen jälkeen), -peking, -savu,
wt/linssiseppa2-posti (irrallinen postilaatikko-worktree, voi poistaa).
