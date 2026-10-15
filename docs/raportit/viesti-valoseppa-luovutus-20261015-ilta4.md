# Valoseppä – luovutus 15.10.2026 ilta 4 (21.0x, KOVA RAJA 36 %)

Luovuttaja: Valoseppä (Opus, high), sessio local_c238f4af. Edellinen: viesti-valoseppa-luovutus-20261015-ilta3.md.
Viestit `send_message` id:llä (/Users/Shared/Claude/osoitekirja.md); PT local_5df52e10 (≤ 3 riviä + polut).
Käännös ja simu AINA Julkaisijalta (local_5cb16c00): "KÄÄNNÄ <kärki> → app-polku" ja "SIMU VAPAA" heti ajon jälkeen.
Jono ja järjestys: /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md (päivitetty 20.3x).

## 1. ENSIMMÄISENÄ: Codexin Peking-toimitukset (PT 21.0x, ~45–70 min vastaamatta)
Postilaatikossa: 79f6d7813 (72 GLB:n lentotestipaketti), dcefd65ac (materiaali v2), 1c03a9996 (native51 museo / Great Hall -sävyt).
Vastaa Codexille (posti/valoseppa-codex-…md kuten 3edf63741) ja aja piilokaupunki-ajo haarasta `linssiseppa2/peking-testi-196`
(2c72c4935, ohje luovutuksessa -ilta2) → pari PT:lle. HUOM Peking on Raamatun keskityksessä tauolla (muisti: keskitys) – PT pyysi vastaamaan.

## 2. KESKEN: tulivuorenpurkaukset ISS-näkymään (omistaja 20.05 PT:n kautta), juna 196, kytkin Tulivuoret.Kaytossa (oletus pois)
Haara `linssiseppa2/tulivuoret-196` (proto, worktree /Users/Shared/Claude/wt/proto-linssiseppa2-tulivuoret), kärki **8f202fc4c** (v5).
Sisältää NUI:n nimet-196 (8fd68fde8) ja Siirtosepän ilmiölennon (6ff5b4d6e) + kohokohdat (578f99511, ui.fi.json-ristiriita ratkaistu).
- Käännös 8f202fc4c pyydetty Julkaisijalta (jonossa ~21.30) → app /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/tulivuoret/app/.
- Kierros: `zsh /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/tulivuoret/aja-kierros.zsh 4 <käännöksen SHA>` (luo ensin saatimet-k4.txt
  ja kierrokset/k4/ ENNEN `> kierrokset/k4/aja-kierros.out`). ~6 min. Tuore Sonnet: "Lue ohje …/tulivuoret/arvioija.md … kansio kierrokset/kN/".
  Rivi KIERROSLOKI.md:hen. Skenaario sk-pohja.txt: kukin purkaus → hetki → siirra → zoom (10–45°) HETI (asema liikkuu 7,7 km/s) → laaja.
- Kierrokset: k1 toimintatesti (kaikki 5 piirtyvät oikein), k2 0/10 (zoom ohi kohteesta, korjattu skenaariossa), k3 (8bbf293c2) purkaukset
  näkyvät mutta litteinä harmaina kiekkoina → v5 8f202fc4c: Sarytšev nuppipää + hattu päälle + pilviaukko 22 km, Raikoke pää 16 km,
  peittävät pylväs/sateenvarjo, kuohut 2×, jyrkempi valo, yhtenäisempi pilvikansi. k3 Sonnet 1,0/10: "litteä kiekko/decal, ei korkeutta; Reykjanesin hehku ei erotu; efektin pitää täyttää ~1/3 kuvasta" → jos v5 ei riitä, harkitse vinompaa katsetta (katse 25–30°, korkeus näkyy) ja suurempaa laavan kirkkautta (_LaavaKirkkaus 3).
- Rakenne: Tulivuoret.cs (Purkaukset-taulu, Rakentaja-mesh paikallisessa itä-ylös-pohjoinen-kehyksessä, Nayta(tunnus), Komento: tulivuori
  <tunnus>|hetki <tunnus>|vaihe <x>|zoom <°>|kaytossa 0|1|_Säädin=x|lista|tila), Tulivuori.shader (tyypit 0–7, varjo toisella aineella).
  Tunnukset sarytsev-2009, etna-2002, raikoke-2019, hunga-tonga-2022, reykjanes-2023; ajat tavoitekuvien EXIFistä = Karttasepän ilmiot.json.
- Valikko: Ilmioryhma "tulivuoret" (vain kuvalliset; Reykjanes pois, kunnes Sisältökirjuri löytää ISS-kuvan, pyydetty Fagradalsfjall 2021),
  ruutukuvat sarytsev, etna, raikoke, hunga-tonga (SK 8d81628ff, KOHTEET-erän pitää ehtiä natiividataan ennen kytkimen avaamista).
- Tavoitekuvat: …/tulivuoret/tavoitteet/ (LAHTEET.md; t5d CC0 vain viitteeksi). Seuraavat askeleet: k4 → säätimet k5 → paras pari PT:lle
  (kuvapari ennen omistajaa) → SHA Natiivisepälle junaan 196. Avoimet: Etnan vana leveämmäksi ja pidemmäksi, Tongan kuohut, Reykjanesin hehku.

## 3. Valmiit tässä vuorossa
- Revontulet v6 (k9 4/10, paras kierrokset/k9/pari1) kytkimen `Revontulet.Uudet` takana, oletus pois: haara linssiseppa2/revontulet-196
  **1cefa0f9b** → Natiiviseppä junaan 196 (PT kuittasi 20.3x). Testissä `revontulet uudet1` (lisätty revontulien sk-pohja.txt:hen).
- Aikavyöhykekorjaus (10 väärää, paikat.json) erotettu junaan 195: 7bca41c41 (linssiseppa2/aikavyohykkeet-195) → Natiiviseppä.

## 4. Jonossa (JONO.md): revontulet v7 tulivuorten jälkeen; sitten salamat ja keijut, pimennyksen varjo, Perseidit, hurrikaanin silmä
(omistaja 20.07, kukin oma erä, kytkimen taakse, Karttasepän hetket ilmiot.json:ssa, ryhmät NUI:n Ilmioryhmat-rajapinnalla, ehto
IssKohokohdat.Ehto(<nimi>, …): keijut, pimennys, tahdenlennot, hurrikaani).

## Työtilat
wt/proto-linssiseppa2-tulivuoret (tulivuoret-196), wt/proto-linssiseppa2-revontulet (revontulet-196, junassa 196 → poista lukituksen jälkeen),
wt/proto-linssiseppa2-aikavyohykkeet (aikavyohykkeet-195 → poista kun juna 195 lukittu), wt/proto-linssiseppa2-peking, wt/proto-linssiseppa2-savu.
