# Päätoimittajan luovutus 16.10.2026 klo 22.0x (konteksti 30 %; tili vvi@vvi.fi)

PT local_5df52e10-10e4-4b72-9554-0049db300dfe, KK local_dfa7296a-d3d3-41ef-a2b1-dbc42a652589. Id:t /Users/Shared/Claude/osoitekirja.md. Asemataulu https://claude.ai/artifact/Qo5w6Wk4JSYRwYbyf2fJrm; paikallinen talo/junat.json ajan tasalla 22.0x (scratchpad/asemataulu/data/talo/).

## 0. Heti aluksi
RC päälle, odottajavahti-Monitor, get_usage self. Tämä luovutus on PR #4730:ssä (haara fable-museo-ikortti: Raamattu + loki museon i-kortti 21.51 ja muotokuvarivi 21.54) → Julkaisija mergeää vihreänä; worktree fable-museo-ikortti pois mergen jälkeen (`tools/uusi-worktree.sh --poista fable-museo-ikortti`). Jäänne: wt/fable-luovutus-20261016-aamu2 (git-poisto tehty, .DS_Store jäi, Finder auki) – Postivahdin työtilatarkistus.

## 1. LEVY HÄTÄ (tärkein)
Data 16 Gi (raja 20). Syy EI tiedostot: macOS-swap 59 Gt; codex-prosessi (ChatGPT Codex, pid 39025, 8 h 48 min) 53 Gt muistia + omistajan Evoto 10 Gt ja Capture One 9 Gt. Omistajan toimi pyydetty KK:lle 22.0x (Codexin uudelleenkäynnistys tehtävän jälkeen). Postivahdille: 1 käännös + 1 simu kerrallaan kunnes > 22 Gi, Blender vain ilman käännöstä. T7 99 % (55 Gt vapaana) → arkistointi T7:lle ei enää ratkaise. Muisti levyn-notkahdus-on-swap.

## 2. Juna 197 (NS-runko 4b6ef2395 vihreä)
Kuitattu: savu k7, varjopuoli 32c2ee110, 7 pääkaupunkia, Louvre k53 → osoitin v6k21 (omistaja 20.44 "Kyllä, junaan 197"; Julkaisijan lukituslista uusin-4 → v6k21).
Odottaa VAIN: museo-nimi (NUI). Omistaja 21.38 EI hyväksynyt: "Millä pohjalla tuo grafiikka ja kuvakabinetti tulee? Siirrä i nappi kehyksen ulkopuolelle". NUI 693f265ed: i-nappi seinälle nimen viereen; uusi kuvapari Grafiikka- ja valokuvakabinetin kortista lasipohjalla + Laivamalli i-napilla, iPhone + iPad → PT tarkistaa (SAMA sali/kulma molemmissa puolissa!) → KK → vasta omistajan ok:n jälkeen SHA NS:lle. NS:lle sanottu: ei NUI:n SHA:ta ilman PT:n ok:ta.
Pehmeä auto zoom/kävely EI 197:ään (20.54: ei väliaikaista paikallista korjausta) → juna 198 liikepohjalla. Prahan historiaosiot v3 ämpärissä: 197 jos kytkentä ehtii, muuten 198.
Lukitus ja TF vain "OMISTAJA PYYSI JULKAISUA".

## 3. YHTEISET POHJAT (omistaja 20.54 "Kyllä, kaikki yhtä aikaa"; Raamattu #4727 mergetty; docs/moduulit/yhteiset-pohjat.md)
- LIIKE: NUI:n tyylikirjaosa valmis (web #4728 mergetty d1ed1de52, liike.liikkeet kavely/liuku/suurennus/katseenKaanto/korttiAvaus/korttiSulku; natiivi a25eb9122 lasipohja-198, Tyylikirja.Liikkeet/Kayrat, Ponnahdus.Kaari). Avaimet = NUI:n ehdotus (PT päätti). Pelikoodari nollautuu (luovutus ebc8e2f1e): seuraaja tekee liikepohjan + museon korjaukset (hyppy zoomin alussa, zoom 0,45 s, kävelyn mutkat; analyysi 9b61757d8) juna-198 4b6ef2395:n päälle + 20.47 (ensin koko teos + nimi, sitten liuku). Video ennen/jälkeen → KK.
- ÄÄNI: Siirtoseppä, suunnitelma docs/moduulit/aanipohja.md (koodimikseri säilyy, AudioMixer vain tarvittaessa – PT hyväksyi), museo 1. käyttäjä, simuajo c4ca8207d jonossa, juna 198. Äänittäjä tasot myöhemmin.
- VALO: Valoseppä V0–V2 + Louvre 135° kohdedelta (ei EV) = linssiseppa2/valopohja cc4f1e595, 1943/1943, valovahti 1074. V1/V2-kuvat + video odottavat levyä > 26. Juna 198.
- Yksi yhteinen ennen/jälkeen-video museosta (liike + ääni + valo) omistajalle.

## 4. Juna 198 (natiiviseppa/juna-198 = 4b6ef2395, jono juna198/jono-198.txt)
Yhteiset pohjat; museon i-kortti (omistaja 21.51 "Kyllä, teksti ja puhe" + 21.54 "Pyöreä kuva yläriville"): NUI rakentaa kortin kehyksen yläpuolelle (pyöreä muotokuva + tekijä + elinvuodet, tiedot alla) ja ympyrän tekstin kehyksen alle; Sisältökirjuri muotokuvat (Commons PD) + lyhyet tiedot; kuvapari iPhone + iPad → KK. NUI: leveät teokset, lasipohjan 4 puuttujaa. Louvre 135°. Äänipohja.

## 5. Louvre-luuppi
LR k56 (md5 bd4080fb): kivi ×0,65 + Horlogen reliefitaustat tummiksi. PT päätti: 135° (Codex-vastaavuus) + kirkkaus VAIN albedolla, ei EV:tä (Valoseppä tietää). k56s kuvattu 22.0x: kirkkaus oikea (L2 137,120,107 vs Codex 126,110,91), mutta kivi harmaa/viileä → LR:lle k57 lämmin kullanruskea sävy (kirkkaus ennallaan) → Valosepän 135°-kuvaus → PT tarkistaa → yksi pari k57 vs Codex KK:lle.

## 6. Muut
- Kiinan dynastiat: v3 pallokuvat 22.0x (proto-3d/_valmiit/kiinan-dynastiat-pallo-20261016/v3/), LS 50ade51e8 → NS JUNA 198 (kehittäjälinssi). Taiwan-epäily oli PT:n virhe (lähikuvat 13/14: Taiwan on Qingissä) → Karttasepän korjaus peruttu. Seuraava erä filminauha + kello (UI NUI:lle). Peking V7 ei kippiin → Codex V8 (f8c315589).
- Juoksupeli j4 hyväksytty (aec1ba363), kuva KK:lle 22.0x. Rakentaminen vasta kun Codexin Peking valmis.
- Valas k1 (linssiseppa2/valas-197 11a815681) EI junaan; jatko Valosepällä (kamera, verhomainen kruunu, vaahto).
- Sisältökirjuri: äänisivun Tekstit päivitetty; Reykjanes ei löydy (#4729). Nyt museon muotokuvat ja tiedot.
- Äänittäjä: Prahan v3 valmis; ei esiäänitystä Bratislava/Tirana/Zagreb (lukija hashilla). Odottaa äänipohjan tasoja.
- Karttaseppä: jono tyhjä oikeutetusti (Euroopan muut pk 0/11 testissä, ei avata).

## 7. Nollaukset
Tänä iltana nollattu: Siirtoseppä, Linssiseppä, Asemataulu, Valoseppä. Pelikoodari luovutus ebc8e2f1e → nollaus seuraavana. NUI 39 % KOVA RAJA (nollaus Pelikoodarin jälkeen; NUI:lla kesken museo-nimen kuvapari + i-kortti).
