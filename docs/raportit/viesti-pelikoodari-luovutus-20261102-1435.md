# Pelikoodari: luovutus 2.11.2026 klo 14.35 – juna 218

Edellinen: -20261102-1400 (PR 5991, ac22929b3): lue sen kohdat 1 (KK:n 13.38-päätös ja löydökset), 3 (bugi 2) ja 4 (jono). Syy: konteksti
pehmeällä rajalla (26 %). Proto-worktree /Users/Shared/Claude/wt/proto-pelikoodari-tausta-v99, haara pelikoodari/kapea-reitti-218
(commitit paikallisia). Kotikansio päivitetty origin/mainiin (e12b8a7a3).

## Tehty tässä vuorossa
- **8c79ade80** 储秀宫 + 翊坤宫 kytketty: RakennusKansio kielletty-rakennukset-v102 (JU 14.24, c-v4 länsiseinä), TaustaKansio
  kielletty-tausta-v102, EstoTiedosto palatsi-esto-v27. Testit oikealla juurella 795/795: palatsi 1601 → 1634 solmua, umpikujia 0
  (+ Yangxindianin sali 1). Testijuuri (symlinkit _valmiit/:iin): scratchpad 6ab2ad3b…/scratchpad/juuri-yk; ympäristö
  MK_JUURI + MK_RAKENNUKSET=kielletty-rakennukset-v102 MK_TAUSTA=kielletty-tausta-v102 MK_ESTO=palatsi-esto-v27
  MK_OSAMALLIT=osamallit791-v10 MK_PUUT=kielletty-lahipuut-v13. Rivi PT:lle lähetetty.
- **7b8456f41** KK 13.38 kohdat 1–4: Autopilotti = false (JuoksupeliNakyma); JuoksuV4Saanto SEINÄN EDESSÄ: SokkeloRisteys
  (muuri edessä / umpikuja / rypäs ilman pyyntöä) ja KaannosSolmu (kulma ilman pyyntöä) → Pysahdy(o): S solmuun, odottaa, Nopeus 0,
  leike idle; Kaanna/Vaihda → PyydaOdottaessa (muurin puoli = seinäkosketus, umpikujassa sivu = ympäri); lähtö LahtoS 0,45 s;
  QA-botti OdotusSuunta. Testi SokkeloMuuriEdessaOdottaaPelaajaa + kulmatesti; 796/796, unity-tarkistus 0 virhettä.
- **Codex-tilaus** latauskuva pysty 3:4 (1254 × 1672, sivut jatketaan, keskusta ennallaan): postilaatikko 47438c330,
  posti/pelikoodari-codex-juoksupeli-latauskuva-pysty-leveampi-tilaus-20261102.md. Worktree /Users/Shared/Claude/wt/pelikoodari-postilaatikko.

## Jono (KK:n järjestys)
1. **Avaus (KK 13.38 kohta 5) ODOTTAA KK:N VASTAUSTA** (kysytty KK:lta 14.3x, ei vastausta luovutushetkellä): ehdotus = lento →
   ovet auki, keisari kujalle ja pysähtyy vastapäisen seinän eteen (uusi seinämekaniikka) → huuto olan yli ovelle → kamera kiertää
   taakse kujan suuntaan (pohjoisesta katse etelään) → 3-2-1 → pelaaja kääntää vasemmalle (opetus). Nyt avauksessa BottiAskel
   kääntää keisarin HuoneS 9,5 m:ssä (JuoksupeliNakyma AvausKesken-haara, BottiAskel) → poista avauksen botti, siirrä huuto/kaarto/
   laskenta (JuoksuAvaus.PorttiAikajana: katsoo = Kun(HuoneS + 2) → seinän eteen) ja pelikameran suunta odotuksen ajaksi kujaa pitkin.
2. **Dronelento takaisin tasolle 1**: JuoksuAvaus.AlkuT (Portilta → PuyiLahteeT − OviOdotusS) ja LuoMaailmaAvaimet Portilta-haara
   (l.Clear()) → lento vanhoilla avaimilla (yleiskuva → sukellus kuja-75:lle z 282…337) ja jatko kujaa pohjoiseen oven eteen
   (px0, e0.Ylos); "pidä lento ripeänä". Kommentit "RAAMATTU 2.177 … EI alkulentoa" pois (PT päivittää 2.177). Testit JuoksuAvausTestit.
3. **Latauskuva**: kun Codexin 3:4-kuva tulee, LatauskuvaPystyUrl uuteen ja NaytaLatauskuva-pystylle aina täyttö (cover, keskeltä):
   nyt `tayta` vain kun ruutu on kuvaa kapeampi → iPadilla contain + mustat reunat (omistajan kuva Matkakirja-fable/docs/raportit/
   kaappaukset/omistaja-20261102/1338-juoksu-latauskuva-mustat-reunat.png). Otsikon/leiman paikat ovat kuvan osuuksina → tarkista.
4. **Todistus KK:lle ja PT:lle**: tallenne taso 1:n alusta (dronelento → lähtö → 60 s ohjaamatonta ja ohjattua juoksua) + latauskuva
   pienen iPadin kokoisena pysty ja vaaka.
4b. **永寿宫 2b (LAV 14.4x, PT kuittasi 14.3x; JU vie):** kytke rakennukset-v103 (uusi ys-yongshougong, reitti S-N varaston
   etuliitoksen kulmasta takaliitoksen kulmaan), tausta-v103, palatsi-esto-v28 (korvaavat v102/v102/v27; kuten 8c79ade80, testijuuri
   juuri-yk + MK_*-muuttujat). LAV: etupihan puun kortit ovat reitin päällä → tarkista, että kaista avautuu niiden kohdalta
   (KaistaRungot / lahipuut). Mitat ja reitti: /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/sisatilat-2b/LUE.md.
   Kytke heti kun JU:n vienti on _valmiit/:ssa (KK:n tehtävien lomaan; pieni).
5. Salitallenne 储秀宫 ja 翊坤宫 (sk-sali.txt-mallilla, sali-218/aja-sali.zsh; uudet alku/maali reittien päistä) → PT.
6. Bugi 2 (dougong-intercolumn, edellisen luovutuksen kohta 3) → korjaus tai rivi LAV:lle; pari PT:lle.
7. Eunukkikorjaus, eunukkimäärät (12.13), Taso1ReittiPortiltaAukiolle03-siivous, kameratallenne (kamera-218/SEIS) JU:n vuorolla.

## Huomiot
- Hookin JUNARIVIT-varoitus (junat.json rivi 1 yli 110 merkkiä) on PT:n kirjaus, ei PK:n.
